// Content shapes for the CMS-managed inner pages (About Us, Rules, ...).
// Every page is a map of section id -> section object; each section carries
// an `enabled` flag so admins can hide it without losing its content.

export type RuleItem =
  | { type: 'text'; value: string }
  | { type: 'list'; items: string[]; ordered?: boolean; indent?: boolean }
  | { type: 'table'; rows: [string, string][] };

export interface RuleSection {
  heading?: string;
  content: RuleItem[];
}

export interface Rulebook {
  title: string;
  filename: string; // slug used for the PDF download URL
  sections: RuleSection[];
}

export interface SectionBase {
  enabled: boolean;
}

export interface SeoSection extends SectionBase {
  metaTitle: string;
  metaDescription: string;
}

export interface BannerSection extends SectionBase {
  title: string;
  image: string;
  breadcrumbLabel: string;
}

export interface IntroSection extends SectionBase {
  heading: string;
  paragraphs: string[];
}

export interface AboutContentSection extends SectionBase {
  introParagraphs: string[];
  image: string;
  bodyParagraphs: string[];
}

export interface RulebooksSection extends SectionBase {
  rulebooks: Rulebook[];
}

export interface LocationsListingSection extends SectionBase {
  heading: string;
  emptyText: string;
}

export interface ContactInfoSection extends SectionBase {
  heading: string;
  phoneDisplay: string;
  phone: string;
  email: string;
}

export interface ContactFormSection extends SectionBase {
  heading: string;
  description: string;
}

export interface PagesData {
  'about-us': { seo: SeoSection; banner: BannerSection; content: AboutContentSection };
  rules: { seo: SeoSection; banner: BannerSection; intro: IntroSection; rulebooks: RulebooksSection };
  locations: { seo: SeoSection; banner: BannerSection; intro: IntroSection; listing: LocationsListingSection };
  schedules: { seo: SeoSection; banner: BannerSection; intro: IntroSection };
  xstats: { seo: SeoSection; banner: BannerSection; intro: IntroSection };
  contact: { seo: SeoSection; banner: BannerSection; contactInfo: ContactInfoSection; form: ContactFormSection };
}

export type PageSlug = keyof PagesData;
