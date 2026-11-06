'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { leagueLocation } from '@/lib/xstatsNav';
import FallbackImg from '@/components/FallbackImg';

const SEASON_ORDER = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];

interface StatsClientProps {
  leagues: any[];
  seasons: any[];
  // From ?year=&season= — ignored when they don't name a real season.
  requestedYear?: string;
  requestedSeason?: string;
  // From ?league= — the card to show as selected (set when a card is clicked).
  requestedLeague?: string;
}

export default function StatsClient({ leagues, seasons, ...fromServer }: StatsClientProps) {
  // Back navigation re-renders from the router cache, whose server props
  // predate the replaceState below — the live URL is the source of truth.
  const searchParams = useSearchParams();
  const requestedYear = searchParams.get('year') ?? fromServer.requestedYear;
  const requestedSeason = searchParams.get('season') ?? fromServer.requestedSeason;
  const requestedLeague = searchParams.get('league') ?? fromServer.requestedLeague;

  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    seasons.forEach(s => {
      const yr = (s.name || '').match(/\d{4}/)?.[0];
      if (yr) ySet.add(yr);
    });
    return Array.from(ySet).sort((a, b) => b.localeCompare(a));
  }, [seasons]);

  const seasonsForYear = (year: string) =>
    seasons
      .filter(s => (s.name || '').match(/\d{4}/)?.[0] === year)
      .map(s => ({ _id: s._id, label: (s.name as string).replace(/\d{4}/g, '').trim(), isDefault: s.isDefault }))
      .filter(s => s.label)
      .sort((a, b) => {
        const idxA = SEASON_ORDER.indexOf(a.label);
        const idxB = SEASON_ORDER.indexOf(b.label);
        // Descending — the latest season of the year shows first.
        if (idxA !== -1 && idxB !== -1) return idxB - idxA;
        return b.label.localeCompare(a.label);
      });

  const defaultSeasonLabelFor = (year: string) => {
    const yearSeasons = seasonsForYear(year);
    const def = yearSeasons.find(s => s.isDefault);
    return def?.label || yearSeasons[0]?.label || '';
  };

  // First visit: the current (default) season. Back from a league page: the
  // year/season the URL carries, as long as that season actually exists.
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    if (requestedYear && availableYears.includes(requestedYear)) return requestedYear;
    const def = seasons.find(s => s.isDefault);
    const defYear = (def?.name || '').match(/\d{4}/)?.[0];
    return defYear || availableYears[0] || '2026';
  });

  const [selectedSeason, setSelectedSeason] = useState<string>(() => {
    const requested = seasonsForYear(selectedYear).find(
      s => s.label.toLowerCase() === requestedSeason?.toLowerCase()
    );
    return requested?.label || defaultSeasonLabelFor(selectedYear);
  });

  const availableSeasons = useMemo(() => seasonsForYear(selectedYear), [seasons, selectedYear]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const season = defaultSeasonLabelFor(year);
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

  const selectedSeasonId = useMemo(() => {
    const obj = availableSeasons.find(s => s.label.toLowerCase() === selectedSeason.toLowerCase());
    return obj?._id || '';
  }, [availableSeasons, selectedSeason]);

  const leaderboardHref = selectedSeasonId
    ? `/xstats/leaderboard?season=${selectedSeasonId}`
    : '/xstats/leaderboard';

  const filteredLeagues = useMemo(() => {
    if (!selectedYear || !selectedSeason) return [];
    return leagues.filter(l => {
      const seasonName = l.season?.name || '';
      const yr = seasonName.match(/\d{4}/)?.[0] || '';
      const sz = seasonName.replace(/\d{4}/g, '').trim();
      return yr === selectedYear && sz.toLowerCase() === selectedSeason.toLowerCase();
    });
  }, [leagues, selectedYear, selectedSeason]);

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
          {filteredLeagues.map(league => {
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

        {filteredLeagues.length === 0 && (
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
