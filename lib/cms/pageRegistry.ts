// Declarative description of every CMS-managed inner page. The admin editor
// renders its tabs and forms from this registry, so adding a section or field
// here (plus a default in pageDefaults.ts) is all the admin side needs.
// Client-safe: no server imports.

import type { PageSlug } from './pageTypes';

interface BaseField {
  key: string;
  label: string;
  help?: string;
}

export interface FieldDef extends BaseField {
  type: 'text' | 'textarea' | 'image' | 'paragraphs' | 'rulebooks';
}

export interface SectionDef {
  id: string;
  label: string;
  description?: string;
  canHide: boolean;
  fields: FieldDef[];
}

export interface PageDef {
  slug: PageSlug;
  label: string;
  publicPath: string;
  description: string;
  sections: SectionDef[];
}

const INLINE_HELP = 'Use **bold** for emphasis and [text](https://link) for links.';

const SEO_SECTION: SectionDef = {
  id: 'seo',
  label: 'SEO',
  description: 'Browser tab title and search-engine description.',
  canHide: false,
  fields: [
    { key: 'metaTitle', label: 'Meta title', type: 'text' },
    { key: 'metaDescription', label: 'Meta description', type: 'textarea' },
  ],
};

const BANNER_SECTION: SectionDef = {
  id: 'banner',
  label: 'Banner',
  description: 'Page title banner shown under the breadcrumb.',
  canHide: true,
  fields: [
    { key: 'title', label: 'Banner title', type: 'text' },
    { key: 'breadcrumbLabel', label: 'Breadcrumb label', type: 'text' },
    { key: 'image', label: 'Background image', type: 'image' },
  ],
};

const INTRO_SECTION: SectionDef = {
  id: 'intro',
  label: 'Intro Text',
  description: 'Optional text block shown above the main page content.',
  canHide: true,
  fields: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'paragraphs', label: 'Paragraphs', type: 'paragraphs', help: INLINE_HELP },
  ],
};

export const PAGE_REGISTRY: Record<PageSlug, PageDef> = {
  'about-us': {
    slug: 'about-us',
    label: 'About Us',
    publicPath: '/about-us',
    description: 'Manage the About Us page sections.',
    sections: [
      BANNER_SECTION,
      {
        id: 'content',
        label: 'Main Content',
        description: 'Intro text beside the image, followed by full-width text.',
        canHide: true,
        fields: [
          { key: 'introParagraphs', label: 'Paragraphs beside image', type: 'paragraphs', help: INLINE_HELP },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'bodyParagraphs', label: 'Full-width paragraphs', type: 'paragraphs', help: INLINE_HELP },
        ],
      },
      SEO_SECTION,
    ],
  },
  rules: {
    slug: 'rules',
    label: 'Rules & Policies',
    publicPath: '/rules',
    description: 'Manage the rulebooks. Each rulebook also generates its downloadable PDF.',
    sections: [
      BANNER_SECTION,
      INTRO_SECTION,
      {
        id: 'rulebooks',
        label: 'Rulebooks',
        description: 'Accordion of rulebooks. The PDF download is generated from the same content.',
        canHide: true,
        fields: [{ key: 'rulebooks', label: 'Rulebooks', type: 'rulebooks' }],
      },
      SEO_SECTION,
    ],
  },
  locations: {
    slug: 'locations',
    label: 'Locations',
    publicPath: '/locations',
    description: 'Locations are pulled live from FlagMag. Location photos are managed under Homepage → Locations.',
    sections: [
      BANNER_SECTION,
      INTRO_SECTION,
      {
        id: 'listing',
        label: 'Locations Grid',
        canHide: false,
        fields: [
          { key: 'heading', label: 'Heading (optional)', type: 'text' },
          { key: 'emptyText', label: 'Text when no locations', type: 'text' },
        ],
      },
      SEO_SECTION,
    ],
  },
  schedules: {
    slug: 'schedules',
    label: 'Schedules',
    publicPath: '/schedules',
    description: 'Schedules are pulled live from FlagMag.',
    sections: [BANNER_SECTION, INTRO_SECTION, SEO_SECTION],
  },
  xstats: {
    slug: 'xstats',
    label: 'XStats',
    publicPath: '/xstats',
    description: 'Stats are pulled live from FlagMag.',
    sections: [BANNER_SECTION, INTRO_SECTION, SEO_SECTION],
  },
  contact: {
    slug: 'contact',
    label: 'Contact',
    publicPath: '/contact-us',
    description: 'Manage the Contact Us page sections.',
    sections: [
      BANNER_SECTION,
      {
        id: 'contactInfo',
        label: 'Contact Info',
        canHide: true,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'phoneDisplay', label: 'Phone (as displayed)', type: 'text' },
          { key: 'phone', label: 'Phone (digits for dialing)', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
        ],
      },
      {
        id: 'form',
        label: 'Contact Form',
        canHide: true,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      SEO_SECTION,
    ],
  },
};

export const PAGE_SLUGS = Object.keys(PAGE_REGISTRY) as PageSlug[];

export function isPageSlug(value: string): value is PageSlug {
  return Object.prototype.hasOwnProperty.call(PAGE_REGISTRY, value);
}
