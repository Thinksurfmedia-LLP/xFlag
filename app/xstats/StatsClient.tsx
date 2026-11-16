'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { leagueLocation } from '@/lib/xstatsNav';
import {
  availableYears as yearsOf,
  defaultSeasonLabelFor,
  findSeasonOption,
  initialSeasonLabel,
  initialYear,
  seasonsForYear,
  type PickerSeason,
} from '@/lib/xstatsSeasons';
import { getLiveSeasonLeagues } from '@/lib/flagmag';
import FallbackImg from '@/components/FallbackImg';

interface StatsClientProps {
  // The leagues of `initialSeasonId` only — every league ever (~900) was too
  // slow to load up front. Other seasons are fetched when they're picked.
  initialLeagues: any[];
  initialSeasonId: string;
  seasons: PickerSeason[];
  // From ?year=&season= — ignored when they don't name a real season.
  requestedYear?: string;
  requestedSeason?: string;
  // From ?league= — the card to show as selected (set when a card is clicked).
  requestedLeague?: string;
}

export default function StatsClient({ initialLeagues, initialSeasonId, seasons, ...fromServer }: StatsClientProps) {
  // Back navigation re-renders from the router cache, whose server props
  // predate the replaceState below — the live URL is the source of truth.
  const searchParams = useSearchParams();
  const requestedYear = searchParams.get('year') ?? fromServer.requestedYear;
  const requestedSeason = searchParams.get('season') ?? fromServer.requestedSeason;
  const requestedLeague = searchParams.get('league') ?? fromServer.requestedLeague;

  const availableYears = useMemo(() => yearsOf(seasons), [seasons]);

  // First visit: the current (default) season. Back from a league page: the
  // year/season the URL carries, as long as that season actually exists.
  const [selectedYear, setSelectedYear] = useState<string>(() => initialYear(seasons, requestedYear));

  const [selectedSeason, setSelectedSeason] = useState<string>(() =>
    initialSeasonLabel(seasons, selectedYear, requestedSeason)
  );

  const availableSeasons = useMemo(() => seasonsForYear(seasons, selectedYear), [seasons, selectedYear]);

  // The highlighted card. Only one at a time; cleared when year/season change.
  const [selectedLeague, setSelectedLeague] = useState<string>(requestedLeague || '');

  // replaceState (not a navigation): the URL remembers the selection for the
  // back button without a server round trip or extra history entries.
  const rememberSelection = (year: string, season: string, league = '') => {
    const params = new URLSearchParams(window.location.search);
    params.set('year', year);
    params.set('season', season.toLowerCase());
    if (league) params.set('league', league);
    else params.delete('league');
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const selectYear = (year: string) => {
    const season = defaultSeasonLabelFor(seasons, year);
    setSelectedYear(year);
    setSelectedSeason(season);
    setSelectedLeague('');
    rememberSelection(year, season);
  };

  const selectSeason = (season: string) => {
    setSelectedSeason(season);
    setSelectedLeague('');
    rememberSelection(selectedYear, season);
  };

  // Runs before the <Link> navigates, so the card turns red immediately and
  // is still highlighted when the visitor comes back.
  const selectLeague = (slug: string) => {
    setSelectedLeague(slug);
    rememberSelection(selectedYear, selectedSeason, slug);
  };

  const selectedSeasonOption = useMemo(
    () => findSeasonOption(seasons, selectedYear, selectedSeason),
    [seasons, selectedYear, selectedSeason]
  );
  const selectedSeasonId = selectedSeasonOption?._id || '';

  const leaderboardHref = selectedSeasonId
    ? `/xstats/leaderboard?season=${selectedSeasonId}`
    : '/xstats/leaderboard';

  // Leagues per season id, filled as seasons are picked. Kept for the visit,
  // so going back to a season already seen is instant.
  const [leaguesBySeason, setLeaguesBySeason] = useState<Record<string, any[]>>(() =>
    initialSeasonId ? { [initialSeasonId]: initialLeagues } : {}
  );
  const requestedSeasons = useRef(new Set<string>(initialSeasonId ? [initialSeasonId] : []));

  useEffect(() => {
    if (!selectedSeasonId || requestedSeasons.current.has(selectedSeasonId)) return;
    requestedSeasons.current.add(selectedSeasonId);
    const seasonId = selectedSeasonId;
    getLiveSeasonLeagues(seasonId, Boolean(selectedSeasonOption?.isDefault))
      // A failed request shows "No leagues found", like a failed page load did.
      .catch(() => [])
      .then((list) => setLeaguesBySeason((prev) => ({ ...prev, [seasonId]: list })));
  }, [selectedSeasonId, selectedSeasonOption]);

  // undefined = that season's leagues are still loading.
  const filteredLeagues: any[] | undefined = selectedSeasonId ? leaguesBySeason[selectedSeasonId] : [];

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/league-placeholder.svg';
    if (url.startsWith('/api/')) return `${process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com'}${url}`;
    return url;
  };

  return (
    <section className="x-states-section">
      <div className="container">

        {/* YEARS */}
        <ul className="years-item">
          {availableYears.map(y => (
            <li key={y}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); selectYear(y); }}
                style={selectedYear === y ? { background: '#F13B26', color: '#fff' } : { background: '#231f20', color: '#fff' }}
              >
                {y}
              </a>
            </li>
          ))}
        </ul>

        {/* SEASONS */}
        <ul className="seasons-item">
          {availableSeasons.map(s => (
            <li key={s.label}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); selectSeason(s.label); }}
                style={selectedSeason === s.label ? { background: '#F13B26', color: '#fff' } : { background: '#231f20', color: '#fff' }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="design1">
          <Link href={leaderboardHref}>seasons Statistical Leaders <span>view</span></Link>
        </h3>

        {/* LEAGUES / LOCATIONS GRID */}
        <ul className="seasons-team-list">
          {(filteredLeagues || []).map(league => {
            const href = `/${selectedYear}/${selectedSeason.toLowerCase()}/${league.slug}`;
            const isSelected = selectedLeague === league.slug;
            const location = leagueLocation(league);
            return (
            <li key={league._id} className={isSelected ? 'active' : undefined}>
              <Link
                href={href}
                className="card-link"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => selectLeague(league.slug)}
              >
                <div className="lf">
                  <FallbackImg src={getLogoUrl(league.image)} fallback="/assets/images/league-placeholder.svg" alt="" />
                </div>
                <div className="rt">
                  <h5>{league.name}</h5>
                  {location && <span><i className="fas fa-location-dot" aria-hidden="true"></i> {location}</span>}
                </div>
              </Link>
            </li>
            );
          })}
        </ul>

        {filteredLeagues === undefined ? (
          <div role="status" className="text-center py-5 text-muted" style={{ marginBottom: '50px' }}>
            Loading leagues for {selectedSeason} {selectedYear}...
          </div>
        ) : filteredLeagues.length === 0 && (
          <div className="text-center py-5 text-muted" style={{ marginBottom: '50px' }}>
            No leagues found for {selectedSeason} {selectedYear}.
          </div>
        )}

        <div className="banner-area">
          <div className="mob">
            <img src="/assets/images/states-mob-img.jpg" alt="" />
          </div>
          <div className="content-area">
            <h2>Advanced Stats info</h2>
            <p>Join the advanced stats program comparing overall performances of players and teams.</p>
            <a href="#" className="btn btn-primary">subscribe now</a>
          </div>
        </div>

      </div>
    </section>
  );
}
