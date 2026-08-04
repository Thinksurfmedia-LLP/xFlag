import { getLiveLeagues, getLiveSchedules, getLiveLeagueSchedule } from '@/lib/flagmag';

export default async function ResultsTicker() {
  const [leagues, allGames] = await Promise.all([
    getLiveLeagues(),
    getLiveSchedules(),
  ]);

  // Use leagues whose season has isDefault=true; fall back to the first season found
  const defaultLeagues = leagues.filter((l: any) => l.season?.isDefault === true);
  const targetLeagues = defaultLeagues.length > 0 ? defaultLeagues : leagues.slice(0, 1);
  const defaultLeagueIds = new Set(targetLeagues.map((l: any) => String(l._id)));

  // All games in those leagues (used for the ticker's score line)
  const defaultSeasonGames = allGames.filter(
    (g: any) => defaultLeagueIds.has(String(g.league))
  );

  // Week numbers come from the admin-curated schedule (same source of truth as
  // the schedule pages) — never re-derived from raw game dates, which drifts
  // whenever a single admin week spans more than one calendar date.
  const gameWeekMap = new Map<string, number>();
  await Promise.all(
    targetLeagues.map(async (league: any) => {
      if (!league.slug) return;
      const weeks = await getLiveLeagueSchedule(league.slug);
      weeks.forEach((week: any) => {
        (week.games || []).forEach((g: any) => {
          gameWeekMap.set(String(g._id), week.weekNum);
        });
      });
    })
  );

  // Completed games only, most recent first
  const results = defaultSeasonGames
    .filter((g: any) => g.status === 'completed' && g.teamA?.name && g.teamB?.name)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);

  if (results.length === 0) return null;

  const duration = `${Math.max(results.length * 4, 20)}s`;

  return (
    <div className="results-ticker">
      <div className="ticker-label">Recent Results</div>
      <div className="ticker-viewport">
        <div className="ticker-track" style={{ animationDuration: duration }}>
          {[...results, ...results].map((game: any, i: number) => (
            <span key={i} className="ticker-item">
              <span className="ticker-week">W{gameWeekMap.get(String(game._id)) ?? 1}</span>
              <span className="ticker-team">{game.teamA.name}</span>
              <span className="ticker-score">{game.teamA.score ?? 0}</span>
              <span className="ticker-vs">VS.</span>
              <span className="ticker-team">{game.teamB.name}</span>
              <span className="ticker-score">{game.teamB.score ?? 0}</span>
              <span className="ticker-sep">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
