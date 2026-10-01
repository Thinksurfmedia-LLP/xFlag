import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyToken } from '@/lib/auth';
import { PAGE_REGISTRY, isPageSlug } from '@/lib/cms/pageRegistry';
import { PAGE_DEFAULTS } from '@/lib/cms/pageDefaults';
import { readPageData, writePageData } from '@/lib/cms/pageStore';
import { sanitizePageData } from '@/lib/cms/sanitize';

const MAX_BODY_BYTES = 2 * 1024 * 1024;

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  if (!isPageSlug(slug)) {
    return NextResponse.json({ success: false, error: 'Unknown page' }, { status: 404 });
  }
  const data = await readPageData(slug);
  return NextResponse.json({ success: true, data });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  if (!isPageSlug(slug)) {
    return NextResponse.json({ success: false, error: 'Unknown page' }, { status: 404 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Content too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  const data = sanitizePageData(PAGE_DEFAULTS[slug], body);
  try {
    await writePageData(slug, data);
  } catch (err) {
    console.error(`Failed to save CMS page "${slug}":`, err);
    return NextResponse.json({ success: false, error: 'Failed to save changes.' }, { status: 500 });
  }

  revalidatePath(PAGE_REGISTRY[slug].publicPath);
  return NextResponse.json({ success: true, data });
}
