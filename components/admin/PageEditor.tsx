'use client';

import { useEffect, useMemo, useState } from 'react';
import { PAGE_REGISTRY, type FieldDef, type SectionDef } from '@/lib/cms/pageRegistry';
import type { PageSlug, Rulebook } from '@/lib/cms/pageTypes';
import ImageField from './ImageField';
import ParagraphsField from './ParagraphsField';
import RulebooksEditor from './RulebooksEditor';
import VisibilitySwitch from './VisibilitySwitch';

type SectionValue = Record<string, unknown> & { enabled: boolean };
type PageValue = Record<string, SectionValue>;
type Message = { type: 'success' | 'error'; text: string };

interface PageEditorProps {
  slug: PageSlug;
}

interface FieldEditorProps {
  field: FieldDef;
  value: unknown;
  uploadKey: string;
  onChange: (value: unknown) => void;
}

function FieldEditor({ field, value, uploadKey, onChange }: FieldEditorProps) {
  const id = `field-${uploadKey}`;
  let control: React.ReactNode;
  switch (field.type) {
    case 'text':
      control = <input id={id} className="cms-input" value={String(value ?? '')} onChange={e => onChange(e.target.value)} />;
      break;
    case 'textarea':
      control = <textarea id={id} className="cms-input" rows={3} value={String(value ?? '')} onChange={e => onChange(e.target.value)} />;
      break;
    case 'image':
      control = <ImageField value={String(value ?? '')} uploadKey={uploadKey} onChange={onChange} />;
      break;
    case 'paragraphs':
      control = <ParagraphsField value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} />;
      break;
    case 'rulebooks':
      control = <RulebooksEditor value={Array.isArray(value) ? (value as Rulebook[]) : []} onChange={onChange} />;
      break;
  }
  const labelFor = field.type === 'text' || field.type === 'textarea' ? id : undefined;
  return (
    <div className="cms-form-group">
      {field.type !== 'rulebooks' && <label htmlFor={labelFor}>{field.label}</label>}
      {field.help && <p className="cms-help">{field.help}</p>}
      {control}
    </div>
  );
}

interface SectionPanelProps {
  slug: PageSlug;
  section: SectionDef;
  value: SectionValue;
  onChange: (value: SectionValue) => void;
}

function SectionPanel({ slug, section, value, onChange }: SectionPanelProps) {
  return (
    <div className="cms-panel">
      <div className="cms-panel-header">
        <div>
          <h2>{section.label}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
        {section.canHide && (
          <VisibilitySwitch checked={value.enabled} onChange={enabled => onChange({ ...value, enabled })} />
        )}
      </div>
      <div className={`cms-panel-body${value.enabled ? '' : ' is-hidden'}`}>
        {section.fields.map(field => (
          <FieldEditor
            key={field.key}
            field={field}
            value={value[field.key]}
            uploadKey={`${slug}-${section.id}-${field.key}`}
            onChange={v => onChange({ ...value, [field.key]: v })}
          />
        ))}
      </div>
    </div>
  );
}

export default function PageEditor({ slug }: PageEditorProps) {
  const def = PAGE_REGISTRY[slug];
  const [data, setData] = useState<PageValue | null>(null);
  const [savedJson, setSavedJson] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState(def.sections[0].id);

  const isDirty = useMemo(() => data !== null && JSON.stringify(data) !== savedJson, [data, savedJson]);

  useEffect(() => {
    fetch(`/api/cms/pages/${slug}`)
      .then(r => r.json() as Promise<{ success: boolean; data?: PageValue; error?: string }>)
      .then(res => {
        if (res.success && res.data) {
          setData(res.data);
          setSavedJson(JSON.stringify(res.data));
        } else {
          setMessage({ type: 'error', text: res.error ?? 'Failed to load page content.' });
        }
      })
      .catch(() => setMessage({ type: 'error', text: 'Network error while loading page content.' }))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/cms/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as { success: boolean; data?: PageValue; error?: string };
      if (result.success && result.data) {
        setData(result.data);
        setSavedJson(JSON.stringify(result.data));
        setMessage({ type: 'success', text: `${def.label} saved — changes are live.` });
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Failed to save changes.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="cms-page-loading">Loading…</div>;

  const active = def.sections.find(s => s.id === activeTab) ?? def.sections[0];

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">{def.label}</h1>
          <p className="cms-page-desc">{def.description}</p>
        </div>
        <div className="cms-page-header-actions">
          <a className="cms-view-link" href={def.publicPath} target="_blank" rel="noopener noreferrer">View page ↗</a>
          <button className="cms-btn cms-btn-primary" onClick={handleSave} disabled={saving || !data || !isDirty}>
            {saving ? 'Saving…' : isDirty ? 'Save Changes' : 'Saved'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`cms-alert cms-alert-${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>
          <span className="cms-alert-icon">{message.type === 'success' ? '✓' : '⚠'}</span>
          {message.text}
        </div>
      )}

      {data && (
        <div className="cms-editor">
          <div className="cms-tabs" role="tablist" aria-label={`${def.label} sections`}>
            <div className="cms-editor-nav-title">SECTIONS</div>
            {def.sections.map(section => (
              <button
                key={section.id}
                type="button"
                role="tab"
                aria-selected={section.id === active.id}
                className={`cms-tab-btn${section.id === active.id ? ' active' : ''}`}
                onClick={() => setActiveTab(section.id)}
              >
                {section.label}
                {section.canHide && data[section.id] && !data[section.id].enabled && <span className="cms-tab-hidden-badge">Hidden</span>}
              </button>
            ))}
          </div>

          <div className="cms-editor-main">
          {data[active.id] && (
            <SectionPanel
              key={active.id}
              slug={slug}
              section={active}
              value={data[active.id]}
              onChange={v => setData({ ...data, [active.id]: v })}
            />
          )}
          </div>
        </div>
      )}
    </div>
  );
}
