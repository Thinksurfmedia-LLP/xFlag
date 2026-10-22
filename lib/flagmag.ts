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
const FETCH_TIMEOUT_MS = 8000;
// Leaderboards are served from flagmag's per-league stats cache (~1s), but
// the first request for a league after flagmag restarts has to compute it
// from every play (~10s for the busiest leagues) — allow for that one case.
const STATS_FETCH_TIMEOUT_MS = 20000;
const withTimeout = (ms = FETCH_TIMEOUT_MS) => ({ signal: AbortSignal.timeout(ms) });

export async function getLiveVenues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/venues`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag venues:', error);
    return [];
  }
}

export async function getLiveOrganization() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Failed to fetch flagmag organization:', error);
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
    console.error('Failed to fetch flagmag recent results:', error);
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
    console.error('Failed to fetch flagmag games:', error);
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
    console.error(`Failed to fetch league schedule for ${leagueSlug}:`, error);
    return [];
  }
}

export async function getLiveLeagues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag leagues:', error);
    return [];
  }
}

// Signup checkout only wants leagues currently open for registration —
// `showOnSignup` is an opt-in toggle organizers set per-league on flagmag,
// so this deliberately narrows past what getLiveLeagues() returns elsewhere
// (e.g. the schedules page, which wants every league regardless of that flag).
export async function getLiveSignupLeagues() {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/leagues?type=active&showOnSignup=true`,
      { ...CACHE, ...withTimeout() }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag signup leagues:', error);
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
    console.error(`Failed to fetch league leaderboard (${statType}):`, error);
    return [];
  }
}

export async function getLiveSeasonLeaderboard(seasonId: string, statType: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/seasons/leaderboard?seasons=${seasonId}&statType=${statType}`,
      { ...LIVE_STATS_CACHE, ...withTimeout(STATS_FETCH_TIMEOUT_MS) }
    );
    const data = await res.json();
    return data.players || [];
  } catch (error) {
    console.error(`Failed to fetch leaderboard (${statType}):`, error);
    return [];
  }
}

export async function getLiveSeasons() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/seasons`, { ...CACHE, ...withTimeout() });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag seasons:', error);
    return [];
  }
}

export async function getLiveStandings(leagueSlug: string) {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/standings`, { ...LIVE_STATS_CACHE, ...withTimeout() });
    const data = await res.json();
    return data.divisionGroups || [];
  } catch (error) {
    console.error(`Failed to fetch standings for ${leagueSlug}:`, error);
    return [];
  }
}
