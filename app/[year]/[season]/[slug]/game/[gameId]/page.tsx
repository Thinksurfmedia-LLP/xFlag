import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import GameStatsClient from './GameStatsClient';

export default async function GameStatsPage({ 
  params,
  searchParams
}: { 
  params: { year: string; season: string; slug: string; gameId: string };
  searchParams: { team?: string };
}) {
  const { year, season, slug, gameId } = await params;
  const sParams = await searchParams;

  const FLAGMAG_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');

  // Fetch specific game details from FlagMag API
  const gameRes = await fetch(`${FLAGMAG_URL}/api/games/${gameId}`, { next: { revalidate: 60 } });
  if (!gameRes.ok) {
    return (
      <div className="wrapper">
        <Header />
        <section className="team-point-section section-padding text-center">
          <h2>Game not found</h2>
        </section>
        <Footer />
      </div>
    );
  }
  
  const gameData = await gameRes.json();
  const game = gameData.data;
  
  if (!game) {
    return (
      <div className="wrapper">
        <Header />
        <section className="team-point-section section-padding text-center">
          <h2>Game not found</h2>
        </section>
        <Footer />
      </div>
    );
  }

  const teamName = sParams.team || game.teamA.name;
  const seasonName = game.leagueName || 'Current Season';

  // Helper to fetch computed stats
  const fetchStats = async (type: string) => {
    try {
      const teamParam = teamName === 'all' ? '' : encodeURIComponent(teamName);
      const url = `${FLAGMAG_URL}/api/games/${gameId}/stats/computed?team=${teamParam}&statType=${type}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) return [];
      const data = await res.json();
      return data.players || [];
    } catch (e) {
      console.error(`Failed to fetch ${type} stats:`, e);
      return [];
    }
  };

  const [passingStats, receivingStats, rushingStats, defenseStats] = await Promise.all([
    fetchStats('passing'),
    fetchStats('receiving'),
    fetchStats('rushing'),
    fetchStats('defensive')
  ]);

  const getPlayerPhoto = (url?: string) => {
    if (!url) return '/assets/images/player-placeholder.svg';
    if (url.startsWith('/api/')) return `${FLAGMAG_URL}${url}`;
    return url;
  };

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team-placeholder.svg';
    if (url.startsWith('/api/')) return `${FLAGMAG_URL}${url}`;
    return url;
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">xstats</Link></li>
            <li><Link href={`/${year}/${season}/${slug}`}>Point Table</Link></li>
            <li> Game Stats</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="Banner" />
        </div>
        <div className="container">
          <h1>xstats</h1>
        </div>
      </section>

      <section className="team-point-section section-padding">
        <div className="container-fluid">
          
          <ul className="team-heading-nav">
            <li className={teamName === game.teamA.name ? 'active' : ''}>
              <Link href={`?team=${encodeURIComponent(game.teamA.name)}`}>
                <img src={getLogoUrl(game.teamA.logo)} alt={game.teamA.name} />
                {game.teamA.name} ({game.teamA.score !== undefined ? game.teamA.score : '-'})
              </Link>
            </li>
            <li className={teamName === game.teamB.name ? 'active' : ''}>
              <Link href={`?team=${encodeURIComponent(game.teamB.name)}`}>
                <img src={getLogoUrl(game.teamB.logo)} alt={game.teamB.name} />
                {game.teamB.name} ({game.teamB.score !== undefined ? game.teamB.score : '-'})
              </Link>
            </li>
          </ul>

          <div className="text-center">
            <h2>
              <Link href={`/${year}/${season}/${slug}/player-stats`} style={{ color: 'inherit', textDecoration: 'none' }}>
                Game Statistical <span style={{ color: '#fff', backgroundColor: '#F13B26', padding: '2px 10px', borderRadius: '4px' }}>Leaders</span>
              </Link>
            </h2>
          </div>

          <GameStatsClient
            passing={passingStats}
            receiving={receivingStats}
            rushing={rushingStats}
            defensive={defenseStats}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
