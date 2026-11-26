'use server';

const BASE_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');
const API_URL = `${BASE_URL}/api`;

let rawOrgSlug = process.env.NEXT_PUBLIC_FLAGMAG_ORG_SLUG || 'xflagfootball';
if (rawOrgSlug.includes('/organizations/')) {
  rawOrgSlug = rawOrgSlug.split('/organizations/')[1].split('/')[0];
}
const ORG_SLUG = rawOrgSlug;

// 30-second data cache: keeps the flagmag API from being hammered on every
// page load, while ensuring schedule changes appear within ~30 seconds.
const CACHE = { next: { revalidate: 30 } } as const;

// Leaderboards/standings are edited live during games (a stat correction or a
// new play should show up immediately, not up to 30s late) — never cache these.
const LIVE_STATS_CACHE = { cache: 'no-store' } as const;

// Without an explicit timeout, a hung/unreachable FLAGMAG_API_URL (e.g. a
// misconfigured localhost URL in production) leaves fetch() pending forever,
// which stalls the whole RSC stream with no error surfaced anywhere.
// 15s, not shorter: flagmag's link to its database periodically stalls for
// up to ~9s on a single query, which a tighter limit turned into blank pages.
const FETCH_TIMEOUT_MS = 15000;
// Leaderboards are served from flagmag's per-league stats cache (~1s), but
// the first request for a league after flagmag restarts has to compute it
// from every play (~10s for the busiest leagues) — allow for that one case.
const STATS_FETCH_TIMEOUT_MS = 20000;
const withTimeout = (ms = FETCH_TIMEOUT_MS) => ({ signal: AbortSignal.timeout(ms) });

// `next build` pre-renders the static (ISR) pages, which call flagmag. When the
// API isn't running at build time (e.g. FLAGMAG_API_URL is a local dev server),
// every call fails with ECONNREFUSED and dumps a stack trace. That's expected:
// the pages are built empty and refill on their first revalidation (~30s).
// So during the build, report it once per worker instead; at runtime every
// failure is still logged in full.
const IS_BUILD_PHASE = process.env.NEXT_PHASE === 'phase-production-build';
let hasWarnedBuildUnreachable = false;

function getErrorCode(error: unknown): string | undefined {
  const cause = (error as { cause?: { code?: string } } | null)?.cause;
  return cause?.code;
}

function logFetchError(message: string, error: unknown): void {
  if (IS_BUILD_PHASE && getErrorCode(error) === 'ECONNREFUSED') {
    if (!hasWarnedBuildUnreachable) {
      hasWarnedBuildUnreachable = true;
      console.warn(
        `⚠ flagmag API unreachable at ${BASE_URL} during build — static pages are built without live data and will populate on first revalidation.`
      );
    }
    return;
  }
  console.error(message, error);
}

export async function getLiveVenues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/venues`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag venues:', error);
    return [];
  }
}

export async function getLiveOrganization() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    logFetchError('Failed to fetch flagmag organization:', error);
    return null;
  }
}

// Most recent completed games of the default season — the results ticker's
// whole need. Asking flagmag for just this slice (~20KB) instead of every
// game ever (~3MB) keeps it fast and small enough for Next's fetch cache,
// which skips responses over 2MB (so the full list is refetched every time).
export async function getLiveRecentResults(limit: number) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/games?season=default&status=completed&order=desc&limit=${limit}`,
      { ...CACHE, ...withTimeout() }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag recent results:', error);
    return [];
  }
}

// The full games list (every season, ~3MB+) is over Next's 2MB fetch-cache
// limit, so a revalidated response can never be stored — the cache keeps
// serving whatever smaller copy it held before the list grew past 2MB, and
// newly added games (e.g. a new week) never appear. Always fetch it fresh.
export async function getLiveSchedules() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/games`, { cache: 'no-store', ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag games:', error);
    return [];
  }
}

// One season's games (all statuses) for the Schedules page: `seasonId` is a
// Season id, or "default" for the current season. The full list above is
// ~20MB / ~25s from flagmag and blew the 15s timeout, leaving Schedules empty;
// one season is ~400KB — under Next's 2MB fetch-cache limit, so it can use
// the normal 30s cache and repeat visits don't wait on flagmag at all.
const SEASON_ID_PATTERN = /^[a-f0-9]{24}$/i;
export async function getLiveSeasonSchedules(seasonId: string) {
  const season = SEASON_ID_PATTERN.test(seasonId) ? seasonId : 'default';
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/games?season=${season}`,
      // A season not yet cached is a straight DB query on flagmag (~10s on its
      // slow Atlas link) — same allowance as the stats endpoints.
      { ...CACHE, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError(`Failed to fetch flagmag games for season ${season}:`, error);
    return [];
  }
}

// Only the current (default) season's games, all statuses. The full list
// above now includes every imported season back to 2008 (~20MB), which is
// far too much for the home page's 4 upcoming + 4 recent games and timed out.
export async function getLiveCurrentSeasonGames() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/games?season=default`, { cache: 'no-store', ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag current-season games:', error);
    return [];
  }
}

// Week grouping (name, boundaries, game membership) is computed once, server-side,
// by flagmag itself — this is the single source of truth every consumer must use
// instead of re-deriving week numbers from raw game dates, which drifts out of
// sync whenever schedules have gaps or reschedules.
export async function getLiveLeagueSchedule(leagueSlug: string) {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/schedule`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.weeks : [];
  } catch (error) {
    logFetchError(`Failed to fetch league schedule for ${leagueSlug}:`, error);
    return [];
  }
}

export async function getLiveLeagues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag leagues:', error);
    return [];
  }
}

// One league by slug — league pages need only their own league, and the full
// list (every season ever, ~600KB) can take longer than the fetch timeout.
// Still matched by slug here so a flagmag that ignores ?slug= works too.
export async function getLiveLeague(leagueSlug: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/leagues?slug=${encodeURIComponent(leagueSlug)}`,
      { ...CACHE, ...withTimeout() }
    );
    const data = await res.json();
    return data.success ? data.data.find((l: any) => l.slug === leagueSlug) || null : null;
  } catch (error) {
    logFetchError(`Failed to fetch flagmag league ${leagueSlug}:`, error);
    return null;
  }
}

// The default season's leagues — the results ticker's whole need. It renders
// in the Header on every page, so it must not pull every league ever.
export async function getLiveDefaultSeasonLeagues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues?season=default`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag default-season leagues:', error);
    return [];
  }
}

// One season's leagues (Schedules' league strip/dropdown, xstats' league
// cards). `isDefault` lets the current season share the small, already-warm
// `?season=default` request the results ticker makes on every page. Other
// seasons ask for `?season=<id>`, but flagmag currently honours only
// "default" there and answers anything else with every league ever (~900,
// ~630KB) — so the result is always narrowed to the season here, and the
// request shrinks by itself once flagmag supports season ids.
export async function getLiveSeasonLeagues(seasonId: string, isDefault = false) {
  if (!SEASON_ID_PATTERN.test(seasonId)) return [];
  const season = isDefault ? 'default' : seasonId;
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues?season=${season}`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data.filter((l: any) => String(l.season?._id) === seasonId) : [];
  } catch (error) {
    logFetchError(`Failed to fetch flagmag leagues for season ${seasonId}:`, error);
    return [];
  }
}

// Signup checkout only wants leagues currently open for registration —
// `showOnSignup` is an opt-in toggle organizers set per-league on flagmag,
// so this deliberately narrows past what the other league lookups return
// (e.g. the schedules page, which wants a season's leagues regardless of that flag).
export async function getLiveSignupLeagues() {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/leagues?type=active&showOnSignup=true`,
      { ...CACHE, ...withTimeout() }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag signup leagues:', error);
    return [];
  }
}

export async function getLiveLeagueLeaderboard(leagueSlug: string, statType: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/stats/computed?statType=${statType}`,
      { ...LIVE_STATS_CACHE, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    const data = await res.json();
    return data.players || [];
  } catch (error) {
    logFetchError(`Failed to fetch league leaderboard (${statType}):`, error);
    return [];
  }
}

export async function getLiveSeasonLeaderboard(seasonId: string, statType: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/seasons/leaderboard?seasons=${encodeURIComponent(seasonId)}&statType=${encodeURIComponent(statType)}`,
      { ...LIVE_STATS_CACHE, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    const data = await res.json();
    return data.players || [];
  } catch (error) {
    logFetchError(`Failed to fetch leaderboard (${statType}):`, error);
    return [];
  }
}

export async function getLiveSeasons() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/seasons`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    logFetchError('Failed to fetch flagmag seasons:', error);
    return [];
  }
}

export async function getLiveStandings(leagueSlug: string) {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/standings`, { ...LIVE_STATS_CACHE, ...withTimeout() });
    const data = await res.json();
    return data.divisionGroups || [];
  } catch (error) {
    logFetchError(`Failed to fetch standings for ${leagueSlug}:`, error);
    return [];
  }
}

// One game for the game stats page. Same 60s cache the page always used; the
// timeout and catch are what's new — without them a hung flagmag left the page
// loading forever and an unreachable one crashed it with a 500. null means
// "show Game not found" (unknown id, flagmag error or flagmag down alike).
export async function getLiveGame(gameId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/games/${encodeURIComponent(gameId)}`, { next: { revalidate: 60 }, ...withTimeout() });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    logFetchError(`Failed to fetch flagmag game ${gameId}:`, error);
    return null;
  }
}

// One stat table for one game, for one team (`team` empty = both teams).
// Computed from the game's plays, so it gets the stats allowance.
export async function getLiveGameStats(gameId: string, statType: string, team: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/games/${encodeURIComponent(gameId)}/stats/computed?team=${encodeURIComponent(team)}&statType=${encodeURIComponent(statType)}`,
      { next: { revalidate: 60 }, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.players || [];
  } catch (error) {
    logFetchError(`Failed to fetch game ${gameId} ${statType} stats:`, error);
    return [];
  }
}

// One league's stat table filtered to one team (`team` empty = every player),
// for the league's player-stats page. Unlike getLiveLeagueLeaderboard this
// keeps that page's 2-minute cache: it isn't the live leaderboard view.
export async function getLiveLeagueTeamStats(leagueSlug: string, statType: string, team: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/season/${encodeURIComponent(leagueSlug)}/stats/computed?team=${encodeURIComponent(team)}&statType=${encodeURIComponent(statType)}`,
      { next: { revalidate: 120 }, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.players || [];
  } catch (error) {
    logFetchError(`Failed to fetch ${leagueSlug} ${statType} stats:`, error);
    return [];
  }
}
