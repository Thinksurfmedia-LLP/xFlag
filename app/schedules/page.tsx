import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerPageBanner from '@/components/InnerPageBanner';
import PageIntro from '@/components/PageIntro';
import { readPageData } from '@/lib/cms/pageStore';
import { getLiveSchedules, getLiveLeagues, getLiveOrganization, getLiveSeasons, getLiveVenues } from '@/lib/flagmag';
import { getGameRefSectionMap } from '@/lib/scheduleUtils';
import SchedulesClient from './SchedulesClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readPageData('schedules');
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function Schedules() {
  const [rawGames, leagues, org, seasons, venues, page] = await Promise.all([getLiveSchedules(), getLiveLeagues(), getLiveOrganization(), getLiveSeasons(), getLiveVenues(), readPageData('schedules')]);
  const orgTimezone = org?.timezone || "America/Los_Angeles";

  // Enrich sectionName from Schedule docs directly (bypasses external API)
  let rawSlug = process.env.NEXT_PUBLIC_FLAGMAG_ORG_SLUG || 'xflagfootball';
  if (rawSlug.includes('/organizations/')) rawSlug = rawSlug.split('/organizations/')[1].split('/')[0];
  const orgSlug = rawSlug;

  let games = rawGames;
  try {
    const sectionMap = await getGameRefSectionMap(orgSlug);
    if (Object.keys(sectionMap).length > 0) {
      games = rawGames.map((g: any) => ({
        ...g,
        sectionName: sectionMap[String(g._id)] ?? g.sectionName ?? '',
      }));
    }
  } catch {
    // fall through — games keep whatever sectionName the API returned
  }

  return (
    <div className="wrapper">
      <Header />
      <InnerPageBanner banner={page.banner} />
      <PageIntro intro={page.intro} />

        <SchedulesClient games={games} leagues={leagues} seasons={seasons} venues={venues} orgTimezone={orgTimezone} />

      <Footer />
    </div>
  );
}
