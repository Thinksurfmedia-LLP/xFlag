import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveSeasonLeaderboard, getLiveSeasons } from '@/lib/flagmag';
import LeaderboardClient from './LeaderboardClient';

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: { season?: string };
}) {
  const sParams = await searchParams;

  // Resolve the season: use query param or fall back to the default season
  let seasonId = sParams.season || '';
  let seasonName = '';

  const seasons = await getLiveSeasons();
  if (!seasonId && seasons.length > 0) {
    const def = seasons.find((s: any) => s.isDefault) || seasons[0];
    seasonId = def._id;
  }
  const seasonObj = seasons.find((s: any) => s._id === seasonId || String(s._id) === seasonId);
  seasonName = seasonObj?.name || 'Season';

  const [passingStats, receivingStats, rushingStats, defenseStats] = await Promise.all([
    getLiveSeasonLeaderboard(seasonId, 'passing'),
    getLiveSeasonLeaderboard(seasonId, 'receiving'),
    getLiveSeasonLeaderboard(seasonId, 'rushing'),
    getLiveSeasonLeaderboard(seasonId, 'defensive'),
  ]);

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">Xstats</Link></li>
            <li>Statistical Leaders</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="" />
        </div>
        <div className="container">
          <h1>Xstats</h1>
        </div>
      </section>

      <section className="team-point-section section-padding">
        <div className="container-fluid">
          <div className="text-center">
            <h2><span>{seasonName}</span> Statistical Leaders</h2>
          </div>

          <LeaderboardClient
            passingStats={passingStats}
            receivingStats={receivingStats}
            rushingStats={rushingStats}
            defenseStats={defenseStats}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
