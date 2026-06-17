'use server';

const BASE_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');
const API_URL = `${BASE_URL}/api`;

let rawOrgSlug = process.env.NEXT_PUBLIC_FLAGMAG_ORG_SLUG || 'xflagfootball';
if (rawOrgSlug.includes('/organizations/')) {
  rawOrgSlug = rawOrgSlug.split('/organizations/')[1].split('/')[0];
}
const ORG_SLUG = rawOrgSlug;

// 2-minute stale-while-revalidate: first request hits API and caches,
// subsequent requests within 120s are served from cache instantly.
const CACHE = { next: { revalidate: 120 } } as const;

export async function getLiveVenues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/venues`, CACHE);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag venues:', error);
    return [];
  }
}

export async function getLiveOrganization() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}`, CACHE);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Failed to fetch flagmag organization:', error);
    return null;
  }
}

export async function getLiveSchedules() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/games`, CACHE);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag games:', error);
    return [];
  }
}

export async function getLiveLeagues() {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/leagues`, CACHE);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag leagues:', error);
    return [];
  }
}

export async function getLiveLeagueLeaderboard(leagueSlug: string, statType: string) {
  try {
    const res = await fetch(
      `${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/stats/computed?statType=${statType}`,
      CACHE
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
      CACHE
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
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/seasons`, CACHE);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch flagmag seasons:', error);
    return [];
  }
}

export async function getLiveStandings(leagueSlug: string) {
  try {
    const res = await fetch(`${API_URL}/organizations/${ORG_SLUG}/season/${leagueSlug}/standings`, CACHE);
    const data = await res.json();
    return data.divisionGroups || [];
  } catch (error) {
    console.error(`Failed to fetch standings for ${leagueSlug}:`, error);
    return [];
  }
}
