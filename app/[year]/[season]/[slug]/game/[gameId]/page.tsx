import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

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
  const gameRes = await fetch(`${FLAGMAG_URL}/api/games/${gameId}`, { cache: 'no-store' });
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
      const res = await fetch(url, { cache: 'no-store' });
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
            <h2><span>{seasonName}</span> Game Statistical Leaders</h2>
          </div>

          <div className="states-table-main">

            {/* Passing Table */}
            <div className="table-wrap">
              <h4>Passing</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>atts</th>
                    <th>comp</th>
                    <th>%</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>INT</th>
                    <th>SACKS</th>
                    <th>RATING</th>
                  </tr>
                </thead> 
                <tbody>
                  {passingStats.length > 0 ? passingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.atts}</td>
                      <td>{p.comp}</td>
                      <td>{p.pct}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ints}</td>
                      <td>{p.sacks}</td>
                      <td>{p.rate}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={12} className="text-center">No passing stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Receiving Table */}
            <div className="table-wrap">
              <h4>Receiving</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>REC</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>Y/R</th>
                  </tr>
                </thead> 
                <tbody>
                  {receivingStats.length > 0 ? receivingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.receptions}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ypr}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={8} className="text-center">No receiving stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Rushing Table */}
            <div className="table-wrap">
              <h4>Rushing</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>PAT</th>
                    <th>Y/C</th>
                  </tr>
                </thead> 
                <tbody>
                  {rushingStats.length > 0 ? rushingStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.atts}</td>
                      <td>{p.yards}</td>
                      <td>{p.tds}</td>
                      <td>{p.pat}</td>
                      <td>{p.ypc}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={8} className="text-center">No rushing stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Defense Table */}
            <div className="table-wrap">
              <h4>Defense</h4>
              <table className="table states-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>team</th>
                    <th>INT</th>
                    <th>INT TD</th>
                    <th>DTD</th>
                    <th>DPAT</th>
                    <th>SCK</th>
                    <th>SAF</th>
                    <th>FP</th>
                  </tr>
                </thead> 
                <tbody>
                  {defenseStats.length > 0 ? defenseStats.map((p: any, i: number) => (
                    <tr key={p.playerId || i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={getPlayerPhoto(p.playerPhoto)} alt={p.playerName} style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} /> 
                        <Link href="#">{p.playerName} {p.jerseyNumber ? `(#${p.jerseyNumber})` : ''}</Link>
                      </td>
                      <td><Link href="#">{p.teamName}</Link></td>
                      <td>{p.dint}</td>
                      <td>{p.dintTD}</td>
                      <td>{p.dtd}</td>
                      <td>{p.dpat}</td>
                      <td>{p.dsacks}</td>
                      <td>{p.dsafety}</td>
                      <td>{p.flagPulls}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={10} className="text-center">No defensive stats available</td></tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
