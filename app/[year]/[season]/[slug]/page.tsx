import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagues, getLiveStandings, getLiveLeagueSchedule } from '@/lib/flagmag';
import GameRow from './GameRow';

export default async function GameStatsPage({ params }: { params: { year: string; season: string; slug: string } }) {
  const { year, season, slug } = await params;

  const [leagues, standings, weeks] = await Promise.all([
    getLiveLeagues(),
    getLiveStandings(slug),
    getLiveLeagueSchedule(slug),
  ]);

  const league = leagues.find((l: any) => l.slug === slug);

  // Create a quick lookup for Team W-L records from the standings data
  const teamRecords: Record<string, string> = {};
  standings.forEach((div: any) => {
    div.rows.forEach((row: any) => {
      teamRecords[row.name] = `${row.wins}-${row.losses}`;
    });
  });

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team-placeholder.svg';
    if (url.startsWith('/api/')) return `${(process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '')}${url}`;
    return url;
  };

  const seasonName = league?.season?.name || 'Current Season';
  const leagueName = league?.name?.replace(seasonName, '').trim() || league?.name || 'League';

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">xstats</Link></li>
            <li> Point Table</li>
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

      {/* Point Table Section */}
      <section className="team-point-section section-padding bg-light-gray">
        <div className="container-fluid">
          <div className="text-center">
            <h2><span>{seasonName}</span> {leagueName}</h2>
            <h3 className="design1"><Link href={`/${year}/${season}/${slug}/leaderboard`}>seasons Statistical Leaders <span>view</span></Link></h3>
          </div>

          <div className={`row g-2 ${standings.length === 1 ? 'justify-content-center' : ''}`}>
            {standings.length > 0 ? (
              standings.map((division: any, dIdx: number) => (
                <div className="col-lg-6" key={dIdx}>
                  <div className="division-table-area">
                    <div className="table-wrap">
                      {division.name && <h4>#{division.name}</h4>}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>TEAM</th>
                            <th>W-L</th>
                            <th>%</th>
                            <th>PF</th>
                            <th>PA</th>
                            <th>+/-</th>
                          </tr>
                        </thead>
                        <tbody>
                          {division.rows.map((row: any, rIdx: number) => (
                            <tr key={rIdx}>
                              <td>
                                <Link href={`/${year}/${season}/${slug}/player-stats?team=${encodeURIComponent(row.name)}`}>
                                  <img src={getLogoUrl(row.logo)} alt={row.name} /> <span>{row.name}</span>
                                </Link>
                              </td>
                              <td>{row.wins}-{row.losses}</td>
                              <td>{row.pct?.toFixed(2) || '0.00'}</td>
                              <td>{row.pf}</td>
                              <td>{row.pa}</td>
                              <td>{row.diff}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p>No standings data available for this league yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Games Table Section */}
      <section className="team-point-section section-padding game-table-section">
        <div className="container-fluid">
          <div className="text-center">
            <h2>Games</h2>
          </div>

          {weeks.length > 0 ? (
            <div className="row gx-3 gy-4 justify-content-center">
              {[...weeks].reverse().map((week: any) => (
                <div key={week.weekStart} className="col-xl-6">
                  <div className="division-table-area game-table">
                    <div className="table-wrap">
                      <h4>Week {week.weekNum}</h4>
                      <table className="table table-hover" style={{ fontSize: '13px' }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Pts</th>
                            <th>Team</th>
                            <th></th>
                            <th>Pts</th>
                            <th>Team</th>
                          </tr>
                        </thead>
                        <tbody>
                          {week.games.map((game: any) => (
                            <GameRow key={game._id} game={game} year={year} season={season} slug={slug} showDate={true} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-12 text-center py-5">
              <p>No games scheduled yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
