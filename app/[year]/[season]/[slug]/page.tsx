import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getLiveLeague, getLiveStandings, getLiveLeagueSchedule } from '@/lib/flagmag';
import { formatWinPct, seasonUrlParts, xstatsHref } from '@/lib/xstatsNav';
import GameRow from './GameRow';
import FallbackImg from '@/components/FallbackImg';

export const dynamic = 'force-dynamic';

export default async function GameStatsPage({ params }: { params: { year: string; season: string; slug: string } }) {
  const { year, season, slug } = await params;

  const [league, standings, weeks] = await Promise.all([
    getLiveLeague(slug),
    getLiveStandings(slug),
    getLiveLeagueSchedule(slug),
  ]);

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

  // The year/season in the URL are cosmetic (the slug picks the league), so a
  // stale or hand-edited URL would label one season's data with another's
  // name. Send it to the league's real season instead.
  const seasonParts = seasonUrlParts(league?.season?.name);
  if (seasonParts && (year !== seasonParts.year || decodeURIComponent(season).toLowerCase() !== seasonParts.season)) {
    redirect(`/${seasonParts.year}/${seasonParts.season}/${slug}`);
  }
  const backToXstats = xstatsHref(seasonParts, slug);

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href={backToXstats}>xstats</Link></li>
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
              standings.map((division: any, dIdx: number) => {
                // Teams that haven't played yet (0-0) stay off the table.
                const playedRows = division.rows.filter((row: any) => !(row.wins === 0 && row.losses === 0));
                return (
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
                          {playedRows.length === 0 && (
                            <tr><td colSpan={6} className="text-center">No games played yet.</td></tr>
                          )}
                          {playedRows.map((row: any, rIdx: number) => (
                            <tr key={rIdx}>
                              <td>
                                <Link href={`/${year}/${season}/${slug}/player-stats?team=${encodeURIComponent(row.name)}`}>
                                  <FallbackImg src={getLogoUrl(row.logo)} fallback="/assets/images/team-placeholder.svg" alt={row.name} /> <span>{row.seedNumber != null && <span style={{ opacity: 0.7 }}>#{row.seedNumber} </span>}{row.name}</span>
                                </Link>
                              </td>
                              <td>{row.wins}-{row.losses}</td>
                              <td>{formatWinPct(row.pct)}</td>
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
                );
              })
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
