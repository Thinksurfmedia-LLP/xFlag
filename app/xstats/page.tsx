import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import PageIntro from '@/components/PageIntro';
import { readPageData } from '@/lib/cms/pageStore';
import { getLiveLeagues, getLiveSeasons } from '@/lib/flagmag';
import StatsClient from './StatsClient';

// Saves revalidate instantly; this only bounds how long a DB-outage
// fallback render can stay cached.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('xstats');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function Xstats({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [leagues, seasons, page, query] = await Promise.all([
    getLiveLeagues(),
    getLiveSeasons(),
    readPageData('xstats'),
    searchParams,
  ]);
  // The year/season picker keeps its selection in the URL, so coming back
  // from a league page restores the season the visitor was browsing.
  const year = typeof query.year === 'string' ? query.year : undefined;
  const season = typeof query.season === 'string' ? query.season : undefined;

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={page.banner} />
      <PageIntro intro={page.intro} />

        <StatsClient leagues={leagues} seasons={seasons} requestedYear={year} requestedSeason={season} />

      <Footer />
    </div>
  );
}
