import { notFound } from 'next/navigation';
import PageEditor from '@/components/admin/PageEditor';
import { isPageSlug } from '@/lib/cms/pageRegistry';

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();
  return <PageEditor key={slug} slug={slug} />;
}
