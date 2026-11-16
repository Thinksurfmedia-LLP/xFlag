import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import PageIntro from '@/components/PageIntro';
import { readPageData } from '@/lib/cms/pageStore';
import { getLiveSeasonLeagues, getLiveSeasons } from '@/lib/flagmag';
import { findSeasonOption, initialSeasonLabel, initialYear, type PickerSeason } from '@/lib/xstatsSeasons';
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
  const [seasons, page, query] = await Promise.all([
    getLiveSeasons() as Promise<PickerSeason[]>,
    readPageData('xstats'),
    searchParams,
  ]);
  // The year/season picker keeps its selection in the URL, so coming back
  // from a league page restores the season the visitor was browsing.
  const year = typeof query.year === 'string' ? query.year : undefined;
  const season = typeof query.season === 'string' ? query.season : undefined;
  const league = typeof query.league === 'string' ? query.league : undefined;

  // Only the leagues of the season the picker opens on (same rules as
  // StatsClient) — every league ever (~900, ~630KB) took ~6s per load.
  // Picking another season fetches that season's leagues from the browser.
  const openYear = initialYear(seasons, year);
  const openSeason = findSeasonOption(seasons, openYear, initialSeasonLabel(seasons, openYear, season));
  const initialSeasonId = openSeason ? String(openSeason._id) : '';
  const leagues = openSeason ? await getLiveSeasonLeagues(initialSeasonId, Boolean(openSeason.isDefault)) : [];

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={page.banner} />
      <PageIntro intro={page.intro} />

        <StatsClient initialLeagues={leagues} initialSeasonId={initialSeasonId} seasons={seasons} requestedYear={year} requestedSeason={season} requestedLeague={league} />

      <Footer />
    </div>
  );
}
