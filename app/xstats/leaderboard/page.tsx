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
  const urlSeasonId = sParams.season || '';

  // When the season is already in the URL, fire all 5 fetches simultaneously.
  // When it isn't, we need seasons first to resolve the default, then fetch stats.
  let seasons: any[];
  let passingStats: any[], receivingStats: any[], rushingStats: any[], defenseStats: any[];

  if (urlSeasonId) {
    [seasons, passingStats, receivingStats, rushingStats, defenseStats] = await Promise.all([
      getLiveSeasons(),
      getLiveSeasonLeaderboard(urlSeasonId, 'passing'),
      getLiveSeasonLeaderboard(urlSeasonId, 'receiving'),
      getLiveSeasonLeaderboard(urlSeasonId, 'rushing'),
      getLiveSeasonLeaderboard(urlSeasonId, 'defensive'),
    ]);
  } else {
    seasons = await getLiveSeasons();
    const defaultSeason = seasons.find((s: any) => s.isDefault) || seasons[0];
    const defaultId = defaultSeason?._id || '';
    [passingStats, receivingStats, rushingStats, defenseStats] = await Promise.all([
      getLiveSeasonLeaderboard(defaultId, 'passing'),
      getLiveSeasonLeaderboard(defaultId, 'receiving'),
      getLiveSeasonLeaderboard(defaultId, 'rushing'),
      getLiveSeasonLeaderboard(defaultId, 'defensive'),
    ]);
  }

  const seasonId = urlSeasonId || seasons.find((s: any) => s.isDefault)?._id || seasons[0]?._id || '';
  const seasonObj = seasons.find((s: any) => s._id === seasonId || String(s._id) === seasonId);
  const seasonName = seasonObj?.name || 'Season';

  // The API returns rows in arbitrary (DB iteration) order, not ranked by any
  // stat. Sort by each table's real leaderboard metric BEFORE truncating to
  // the top 50, otherwise slice() keeps whatever rows happened to load first
  // and silently drops the actual leaders.
  const byDesc = (key: string) => (a: any, b: any) => (b[key] ?? 0) - (a[key] ?? 0);
  const topPassing = [...passingStats].sort(byDesc('yards')).slice(0, 50);
  const topReceiving = [...receivingStats].sort(byDesc('yards')).slice(0, 50);
  const topRushing = [...rushingStats].sort(byDesc('yards')).slice(0, 50);
  const topDefense = [...defenseStats].sort(byDesc('flagPulls')).slice(0, 50);

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
            passingStats={topPassing}
            receivingStats={topReceiving}
            rushingStats={topRushing}
            defenseStats={topDefense}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
