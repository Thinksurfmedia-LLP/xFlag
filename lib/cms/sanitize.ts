// Shape-checks untrusted page data (admin PUT bodies, stored DB docs) against
// the page defaults. Anything with the wrong type falls back to the default,
// unknown keys are dropped, so a bad payload can never break a public page.

import type { RuleItem, RuleSection, Rulebook } from './pageTypes';

const MAX_STRING = 20_000;
const MAX_ITEMS = 500;
const FILENAME_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;

type Json = unknown;

function isRecord(value: Json): value is Record<string, Json> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: Json, fallback = ''): string {
  return typeof value === 'string' ? value.slice(0, MAX_STRING) : fallback;
}

// Blank entries (e.g. an empty paragraph or list line) are dropped.
function strArray(value: Json): string[] {
  return Array.isArray(value)
    ? value
        .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        .slice(0, MAX_ITEMS)
        .map(v => v.slice(0, MAX_STRING))
    : [];
}

function sanitizeRuleItem(value: Json): RuleItem | null {
  if (!isRecord(value)) return null;
  if (value.type === 'text') return { type: 'text', value: str(value.value) };
  if (value.type === 'list') {
    return { type: 'list', items: strArray(value.items), ordered: value.ordered === true, indent: value.indent === true };
  }
  if (value.type === 'table' && Array.isArray(value.rows)) {
    const rows = value.rows
      .filter((r): r is Json[] => Array.isArray(r))
      .slice(0, MAX_ITEMS)
      .map((r): [string, string] => [str(r[0]), str(r[1])]);
    return { type: 'table', rows };
  }
  return null;
}

function sanitizeRuleSection(value: Json): RuleSection | null {
  if (!isRecord(value)) return null;
  const content = Array.isArray(value.content)
    ? value.content.slice(0, MAX_ITEMS).map(sanitizeRuleItem).filter((b): b is RuleItem => b !== null)
    : [];
  const heading = str(value.heading);
  return heading ? { heading, content } : { content };
}

export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
}

// Rulebook filenames become PDF URLs, so they are normalised to a unique slug
// rather than rejected — a typo must never make a rulebook disappear.
function uniqueFilename(raw: Record<string, Json>, index: number, seen: Set<string>): string {
  const candidate = slugify(str(raw.filename)) || slugify(str(raw.title)) || `rulebook-${index + 1}`;
  let filename = FILENAME_RE.test(candidate) ? candidate : `rulebook-${index + 1}`;
  for (let n = 2; seen.has(filename); n++) filename = `${candidate}-${n}`;
  seen.add(filename);
  return filename;
}

export function sanitizeRulebooks(value: Json, fallback: Rulebook[]): Rulebook[] {
  if (!Array.isArray(value)) return fallback;
  const seen = new Set<string>();
  const result: Rulebook[] = [];
  for (const [index, raw] of value.slice(0, 50).entries()) {
    if (!isRecord(raw)) continue;
    const filename = uniqueFilename(raw, index, seen);
    const sections = Array.isArray(raw.sections)
      ? raw.sections.slice(0, MAX_ITEMS).map(sanitizeRuleSection).filter((s): s is RuleSection => s !== null)
      : [];
    result.push({ title: str(raw.title, filename), filename, sections });
  }
  return result;
}

// Generic: mirror the structure of `template`, taking values from `input`
// only where their type matches. Arrays of objects use the first template
// item as the shape for every element.
function sanitizeLike(template: Json, input: Json): Json {
  if (typeof template === 'string') return str(input, template);
  if (typeof template === 'boolean') return typeof input === 'boolean' ? input : template;
  if (typeof template === 'number') return typeof input === 'number' && Number.isFinite(input) ? input : template;
  if (Array.isArray(template)) {
    if (!Array.isArray(input)) return template;
    const itemTemplate = template[0];
    if (itemTemplate === undefined || typeof itemTemplate === 'string') return strArray(input);
    return input.slice(0, MAX_ITEMS).map(item => sanitizeLike(itemTemplate, item));
  }
  if (isRecord(template)) {
    const source = isRecord(input) ? input : {};
    const out: Record<string, Json> = {};
    for (const key of Object.keys(template)) {
      // Rulebook arrays hold a union type the generic walker can't express.
      // (The Rules page's *section* is also called "rulebooks" but is an object.)
      out[key] = key === 'rulebooks' && Array.isArray(template[key])
        ? sanitizeRulebooks(source[key], template[key] as Rulebook[])
        : sanitizeLike(template[key], source[key]);
    }
    return out;
  }
  return template;
}

export function sanitizePageData<T extends object>(defaults: T, input: unknown): T {
  return sanitizeLike(defaults, input) as T;
}
