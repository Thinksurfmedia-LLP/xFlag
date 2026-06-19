import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveSchedules, getLiveLeagues, getLiveOrganization, getLiveSeasons, getLiveVenues } from '@/lib/flagmag';
import SchedulesClient from './SchedulesClient';

export const dynamic = 'force-dynamic';

export default async function Schedules() {
  const [games, leagues, org, seasons, venues] = await Promise.all([getLiveSchedules(), getLiveLeagues(), getLiveOrganization(), getLiveSeasons(), getLiveVenues()]);
  const orgTimezone = org?.timezone || "America/Los_Angeles";

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
