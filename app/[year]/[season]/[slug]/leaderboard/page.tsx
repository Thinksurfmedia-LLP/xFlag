import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagueLeaderboard, getLiveLeagues } from '@/lib/flagmag';
import LeaderboardClient from '@/app/xstats/leaderboard/LeaderboardClient';

export default async function LeagueLeaderboardPage({
  params,
}: {
  params: { year: string; season: string; slug: string };
}) {
  const { year, season, slug } = await params;

  const leagues = await getLiveLeagues();
  const league = leagues.find((l: any) => l.slug === slug);
  const seasonName = league?.season?.name || 'Current Season';
  const leagueName = league?.name || slug;

  const [passingStats, receivingStats, rushingStats, defenseStats] = await Promise.all([
    getLiveLeagueLeaderboard(slug, 'passing'),
    getLiveLeagueLeaderboard(slug, 'receiving'),
    getLiveLeagueLeaderboard(slug, 'rushing'),
    getLiveLeagueLeaderboard(slug, 'defensive'),
  ]);

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">Xstats</Link></li>
            <li><Link href={`/${year}/${season}/${slug}`}>Point Table</Link></li>
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
            <h2><span>{seasonName}</span> {leagueName} — Statistical Leaders</h2>
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
