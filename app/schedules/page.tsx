import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import PageIntro from '@/components/PageIntro';
import { readPageData } from '@/lib/cms/pageStore';
import { getLiveSeasonSchedules, getLiveSeasonLeagues, getLiveDefaultSeasonLeagues, getLiveOrganization, getLiveSeasons, getLiveVenues } from '@/lib/flagmag';
import { getGameRefSectionMap } from '@/lib/scheduleUtils';
import SchedulesClient from './SchedulesClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('schedules');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

// The season to show: the one named by ?season=<id> if it exists, else the
// default season (else the newest, matching the picker's own fallback).
function pickSeason(seasons: any[], requested?: string) {
  return (
    (requested && seasons.find((s) => String(s._id) === requested)) ||
    seasons.find((s) => s.isDefault) ||
    seasons[0] ||
    null
  );
}

// That season's games and leagues only — every game ever (~20MB) and every
// league ever (~900) timed out. No seasons at all (flagmag down) keeps the
// old "default season" request so a partial outage still shows something.
async function loadSeason(season: any) {
  if (!season) return Promise.all([getLiveSeasonSchedules('default'), getLiveDefaultSeasonLeagues()]);
  const seasonId = String(season._id);
  return Promise.all([getLiveSeasonSchedules(seasonId), getLiveSeasonLeagues(seasonId, Boolean(season.isDefault))]);
}

// Enrich sectionName from Schedule docs directly (bypasses external API),
// reading only the schedules of the leagues these games belong to.
async function withSectionNames(rawGames: any[], orgSlug: string) {
  try {
    const leagueIds = rawGames.map((g: any) => String(g.league));
    const sectionMap = await getGameRefSectionMap(orgSlug, leagueIds);
    if (Object.keys(sectionMap).length === 0) return rawGames;
    return rawGames.map((g: any) => ({
      ...g,
      sectionName: sectionMap[String(g._id)] ?? g.sectionName ?? '',
    }));
  } catch (error) {
    // fall through — games keep whatever sectionName the API returned
    console.error('Failed to read schedule section names:', error);
    return rawGames;
  }
}

export default async function Schedules({ searchParams }: { searchParams: Promise<{ season?: string }> }) {
  // Only the season being viewed (?season=<id>, else the default season).
  // Picking another season navigates here again with the new id. The season
  // list is small (~12KB) and decides which season to load, so it goes first;
  // the rest doesn't depend on it and starts right away.
  const { season } = await searchParams;
  const rest = Promise.all([getLiveOrganization(), getLiveVenues(), readPageData('schedules')]);
  const seasons = await getLiveSeasons();
  const selectedSeason = pickSeason(seasons, season);
  const [[rawGames, leagues], [org, venues, page]] = await Promise.all([loadSeason(selectedSeason), rest]);
  const orgTimezone = org?.timezone || "America/Los_Angeles";

  let rawSlug = process.env.NEXT_PUBLIC_FLAGMAG_ORG_SLUG || 'xflagfootball';
  if (rawSlug.includes('/organizations/')) rawSlug = rawSlug.split('/organizations/')[1].split('/')[0];
  const games = await withSectionNames(rawGames, rawSlug);

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={page.banner} />
      <PageIntro intro={page.intro} />

        <SchedulesClient games={games} leagues={leagues} seasons={seasons} seasonId={selectedSeason ? String(selectedSeason._id) : ''} venues={venues} orgTimezone={orgTimezone} />

      <Footer />
    </div>
  );
}
