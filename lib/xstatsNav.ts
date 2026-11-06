// Shared Xstats navigation helpers: the /xstats picker, league pages and the
// leaderboards all address a season as `year` + lowercase season label
// (e.g. "Fall 2015" → { year: "2015", season: "fall" }), so they live here
// to keep every link that leads back to the picker in agreement.

export interface SeasonUrlParts {
  year: string;
  season: string;
}

/** Splits a season name like "Fall 2015" into its URL parts; null if it has no year. */
export function seasonUrlParts(seasonName?: string | null): SeasonUrlParts | null {
  const name = seasonName || '';
  const year = name.match(/\d{4}/)?.[0];
  const season = name.replace(/\d{4}/g, '').trim().toLowerCase();
  if (!year || !season) return null;
  return { year, season };
}

/** Link back to the /xstats picker with the given year/season (and league card) preselected. */
export function xstatsHref(parts: SeasonUrlParts | null, leagueSlug?: string): string {
  if (!parts) return '/xstats';
  const params = new URLSearchParams({ year: parts.year, season: parts.season });
  if (leagueSlug) params.set('league', leagueSlug);
  return `/xstats?${params.toString()}`;
}

/**
 * Winning percentage the way football standings print it: .750, 1.000, .000.
 * The standings API sends it on a 0–100 scale.
 */
export function formatWinPct(pctOutOf100?: number | null): string {
  const value = typeof pctOutOf100 === 'number' && Number.isFinite(pctOutOf100) ? pctOutOf100 / 100 : 0;
  return value.toFixed(3).replace(/^0(?=\.)/, '');
}

/** A league's display location: its main location, else its venue list, else nothing. */
export function leagueLocation(league: { location?: string; locations?: string[] }): string {
  const main = (league.location || '').trim();
  if (main) return main;
  return (league.locations || []).map(s => s.trim()).filter(Boolean).join(', ');
}
