import { cache } from 'react';
import dbConnect from '@/lib/mongodb';
import { CmsContent } from '@/models/CmsContent';
import { PAGE_DEFAULTS } from './pageDefaults';
import { sanitizePageData } from './sanitize';
import type { PagesData, PageSlug } from './pageTypes';

const docType = (slug: PageSlug) => `page:${slug}`;

async function loadPageData<S extends PageSlug>(slug: S): Promise<PagesData[S]> {
  const defaults = PAGE_DEFAULTS[slug];
  try {
    await dbConnect();
    const doc = await CmsContent.findOne({ type: docType(slug) }).lean();
    return doc?.data ? sanitizePageData(defaults, doc.data) : defaults;
  } catch (err) {
    console.error(`Failed to read CMS page "${slug}" from DB:`, err);
    return defaults;
  }
}

// Deduped per request so generateMetadata and the page share one DB read.
export const readPageData = cache(loadPageData) as <S extends PageSlug>(slug: S) => Promise<PagesData[S]>;

export async function writePageData<S extends PageSlug>(slug: S, data: PagesData[S]): Promise<void> {
  await dbConnect();
  await CmsContent.findOneAndUpdate(
    { type: docType(slug) },
    { data },
    { upsert: true, new: true }
  );
}
