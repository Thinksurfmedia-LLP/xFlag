import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveSchedules, getLiveLeagues, getLiveOrganization, getLiveSeasons, getLiveVenues } from '@/lib/flagmag';
import { getGameRefSectionMap } from '@/lib/scheduleUtils';
import SchedulesClient from './SchedulesClient';

export const dynamic = 'force-dynamic';

export default async function Schedules() {
  const [rawGames, leagues, org, seasons, venues] = await Promise.all([getLiveSchedules(), getLiveLeagues(), getLiveOrganization(), getLiveSeasons(), getLiveVenues()]);
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
      <div className="breadcrumb-section">
            <div className="container">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li>schedules</li>
                </ul>
            </div>
        </div>

        <section className="inner-banner-section">
            <div className="image-area">
                <img src="/assets/images/about-banner.jpg" alt="" />
            </div>
            <div className="container">
                <h1>Schedules</h1>
            </div>
        </section>

        <SchedulesClient games={games} leagues={leagues} seasons={seasons} venues={venues} orgTimezone={orgTimezone} />

      <Footer />
    </div>
  );
}
