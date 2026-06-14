import { getLiveLeagues, getLiveSchedules } from '@/lib/flagmag';

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - diff);
  return d.toISOString().split('T')[0];
}

export default async function ResultsTicker() {
  const [leagues, allGames] = await Promise.all([
    getLiveLeagues(),
    getLiveSchedules(),
  ]);

  // Use leagues whose season has isDefault=true; fall back to the first season found
  const defaultLeagues = leagues.filter((l: any) => l.season?.isDefault === true);
  const targetLeagues = defaultLeagues.length > 0 ? defaultLeagues : leagues.slice(0, 1);
  const defaultLeagueIds = new Set(targetLeagues.map((l: any) => String(l._id)));

  // All games in those leagues (used for week-number computation)
  const defaultSeasonGames = allGames.filter(
    (g: any) => defaultLeagueIds.has(String(g.league))
  );

  // Build a weekNum map per league: gameId → weekNum
  const gameWeekMap = new Map<string, number>();
  for (const leagueId of defaultLeagueIds) {
    const leagueGames = defaultSeasonGames
      .filter((g: any) => String(g.league) === leagueId)
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const weekOrder = new Map<string, number>();
    let wn = 1;
    for (const g of leagueGames) {
      const ws = getWeekStart(new Date(g.date));
      if (!weekOrder.has(ws)) weekOrder.set(ws, wn++);
      gameWeekMap.set(String(g._id), weekOrder.get(ws)!);
    }
  }

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
