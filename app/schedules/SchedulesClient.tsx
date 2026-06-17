'use client';

import { useState, useMemo, useEffect, useRef, Fragment } from 'react';

function formatTimeWithZone(timeStr: string, timezone: string = "America/Los_Angeles", gameDate?: Date | string | null): string {
  if (!timeStr || timeStr === 'TBD') return timeStr;
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const ampm = h < 12 ? "AM" : "PM";
  const h12 = h % 12 || 12;
  // Use the game's own date for DST-accurate abbreviation
  const refDate = gameDate ? new Date(gameDate) : new Date();
  let tzAbbr = "";
  try {
    tzAbbr = new Intl.DateTimeFormat("en-US", { timeZone: timezone, timeZoneName: "short" })
      .formatToParts(refDate)
      .find((p) => p.type === "timeZoneName")?.value || "";
  } catch { tzAbbr = ""; }
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}${tzAbbr ? ` ${tzAbbr}` : ""}`;
}

export default function SchedulesClient({ games, leagues, seasons, venues = [], orgTimezone = "America/Los_Angeles" }: { games: any[], leagues: any[], seasons: any[], venues?: any[], orgTimezone?: string }) {
  // Determine the default season (marked isDefault, else first season)
  const defaultSeasonId = (() => {
    const fromLeague = leagues.find((l: any) => l.season?.isDefault);
    if (fromLeague) return String(fromLeague.season._id);
    const fromSeasons = seasons.find((s: any) => s.isDefault);
    if (fromSeasons) return String(fromSeasons._id);
    return seasons.length > 0 ? String(seasons[0]._id) : '';
  })();

  const [selectedSeason, setSelectedSeason] = useState(defaultSeasonId);
  const [selectedState, setSelectedState] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const leagueStripRef = useRef<HTMLDivElement>(null);
  const scrollStrip = (dir: 'left' | 'right') => {
    if (leagueStripRef.current) leagueStripRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const handleSeasonChange = (seasonId: string) => {
    setSelectedSeason(seasonId);
    setSelectedState('');
    setSelectedLeague('');
    setSelectedTeam('');
    setSelectedWeek(1);
  };

  // Build venue lookup maps (exact match, lowercase+trimmed key)
  const venueExactMap = useMemo(() => {
    const stateMap = new Map<string, string>();
    const abbrMap = new Map<string, string>();
    venues.forEach((v: any) => {
      if (v.name) {
        const key = v.name.toLowerCase().trim();
        if (v.stateName) stateMap.set(key, v.stateName);
        if (v.stateAbbr) abbrMap.set(key, v.stateAbbr);
      }
    });
    return { stateMap, abbrMap };
  }, [venues]);

  // Resolve a location string to a stateName using exact then partial venue matching
  const resolveState = (location: string): string => {
    if (!location) return '';
    const loc = location.toLowerCase().trim();
    // 1. Exact match
    const exact = venueExactMap.stateMap.get(loc);
    if (exact) return exact;
    // 2. Partial match: game.location contains venue name, or venue name contains game.location
    for (const [venueName, stateName] of venueExactMap.stateMap) {
      if (loc.includes(venueName) || venueName.includes(loc)) return stateName;
    }
    return '';
  };

  const resolveStateAbbr = (location: string): string => {
    if (!location) return '';
    const loc = location.toLowerCase().trim();
    const exact = venueExactMap.abbrMap.get(loc);
    if (exact) return exact;
    for (const [venueName, abbr] of venueExactMap.abbrMap) {
      if (loc.includes(venueName) || venueName.includes(loc)) return abbr;
    }
    return '';
  };

  // Leagues that belong to the selected season (for the Leagues dropdown)
  const filteredLeagues = useMemo(() => {
    if (!selectedSeason) return leagues;
    return leagues.filter((l: any) => String(l.season?._id) === selectedSeason);
  }, [leagues, selectedSeason]);

  // Build set of league IDs for the selected season to filter games
  const leagueIdsForSeason = useMemo(() => {
    if (!selectedSeason) return null;
    return new Set(filteredLeagues.map((l: any) => String(l._id)));
  }, [filteredLeagues, selectedSeason]);

  // leagueId → league object map for fallback location lookup
  const leagueMap = useMemo(() => {
    const map = new Map<string, any>();
    leagues.forEach((l: any) => map.set(String(l._id), l));
    return map;
  }, [leagues]);

  // Resolve state for a game: try game.location first, then league.location as fallback
  const resolveGameState = (g: any): string => {
    const fromGame = resolveState(g.location);
    if (fromGame) return fromGame;
    const league = leagueMap.get(String(g.league));
    if (league?.location) return resolveState(league.location);
    if (Array.isArray(league?.locations) && league.locations[0]) return resolveState(league.locations[0]);
    return '';
  };

  // Games filtered by season only (used to derive available states/leagues for dropdowns)
  const gamesBySeason = useMemo(() => {
    return games.filter((g: any) =>
      leagueIdsForSeason ? leagueIdsForSeason.has(String(g.league)) : true
    );
  }, [games, leagueIdsForSeason]);

  // States that actually have games in the selected season
  const states = useMemo(() => {
    const seen = new Set<string>();
    const result: { name: string; abbr: string }[] = [];
    gamesBySeason.forEach((g: any) => {
      const stateName = resolveGameState(g);
      if (stateName && !seen.has(stateName)) {
        seen.add(stateName);
        const abbr = resolveStateAbbr(g.location) || stateName;
        result.push({ name: stateName, abbr });
      }
    });
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [gamesBySeason, venueExactMap, leagueMap]);

  // Teams available for the current season + state + league selection (before team filter)
  const teams = useMemo(() => {
    const seen = new Set<string>();
    games.forEach((g: any) => {
      if (leagueIdsForSeason && !leagueIdsForSeason.has(String(g.league))) return;
      if (selectedState && resolveGameState(g) !== selectedState) return;
      if (selectedLeague && g.league !== selectedLeague && g.leagueName !== selectedLeague) return;
      if (g.teamA?.name) seen.add(g.teamA.name);
      if (g.teamB?.name) seen.add(g.teamB.name);
    });
    return Array.from(seen).sort((a, b) => a.localeCompare(b));
  }, [games, leagueIdsForSeason, selectedState, selectedLeague, venueExactMap, leagueMap]);

  // Filter games based on season, state, league, team, and search
  const filteredGames = useMemo(() => {
    return games.filter((g: any) => {
      if (leagueIdsForSeason && !leagueIdsForSeason.has(String(g.league))) return false;
      if (selectedState && resolveGameState(g) !== selectedState) return false;
      if (selectedLeague && g.league !== selectedLeague && g.leagueName !== selectedLeague) return false;
      if (selectedTeam && g.teamA?.name !== selectedTeam && g.teamB?.name !== selectedTeam) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!g.teamA?.name?.toLowerCase().includes(q) && !g.teamB?.name?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [games, leagueIdsForSeason, selectedState, venueExactMap, leagueMap, selectedLeague, selectedTeam, searchQuery]);

  // Sort games by date and time
  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return (a.time || '').localeCompare(b.time || '');
    });
  }, [filteredGames]);

  // Group into weeks (7-day buckets from the earliest game)
  const { weeks, weekCount } = useMemo(() => {
    if (sortedGames.length === 0) return { weeks: new Map(), weekCount: 0 };
    const firstDate = new Date(sortedGames[0].date);
    firstDate.setHours(0, 0, 0, 0);
    const map = new Map<number, any[]>();
    sortedGames.forEach((g: any) => {
      const d = new Date(g.date);
      d.setHours(0, 0, 0, 0);
      const diff = Math.floor((d.getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekNum = diff + 1;
      if (!map.has(weekNum)) map.set(weekNum, []);
      map.get(weekNum)!.push(g);
    });
    return { weeks: map, weekCount: map.size };
  }, [sortedGames]);

  const weekGames = weeks.get(selectedWeek) || [];

  // Strip tabs = all leagues for the selected season (same source as dropdown)
  const leagueStripNames = useMemo(() => {
    return filteredLeagues.map((l: any) => l.name).filter(Boolean);
  }, [filteredLeagues]);

  // Games for the current week — filteredGames already handles the league filter via selectedLeague
  const currentViewGames = weekGames;

  // Group games by Exact Date + Time
  const gamesByDateTime = useMemo(() => {
    const map = new Map<string, any[]>();
    currentViewGames.forEach((g: any) => {
      const dateStr = new Date(g.date).toLocaleDateString('en-US', { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
      const timeStr = g.time || 'TBD';
      const key = `${timeStr}__${dateStr}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(g);
    });
    return Array.from(map.entries());
  }, [currentViewGames]);

  const weekNumbers = Array.from({ length: weekCount }, (_, i) => i + 1);

  return (
    <section className="schedules-section section-padding">
      <div className="container">

        {/* Top filter bar */}
        <div className="top-part" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center', justifyContent: 'flex-start' }}>
          {/* Season */}
          <select
            className="form-select schedule-filter-select"
            style={{ backgroundColor: '#231F20', color: '#fff', border: 'none', width: 'auto', minWidth: '160px', flex: '0 0 auto' }}
            value={selectedSeason}
            onChange={e => handleSeasonChange(e.target.value)}
          >
            {seasons.map((s: any) => (
              <option key={s._id} value={String(s._id)}>{s.name}</option>
            ))}
          </select>

          {/* States */}
          <select
            className="form-select schedule-filter-select"
            style={{ backgroundColor: '#231F20', color: '#fff', border: 'none', width: 'auto', minWidth: '140px', flex: '0 0 auto' }}
            value={selectedState}
            onChange={e => { setSelectedState(e.target.value); setSelectedLeague(''); setSelectedTeam(''); setSelectedWeek(1); }}
          >
            <option value="">All States</option>
            {states.map(s => (
              <option key={s.abbr} value={s.name}>{s.name}</option>
            ))}
          </select>

          {/* Leagues */}
          <select
            className="form-select schedule-filter-select"
            style={{ backgroundColor: '#231F20', color: '#fff', border: 'none', width: 'auto', minWidth: '150px', flex: '0 0 auto' }}
            value={selectedLeague}
            onChange={e => { setSelectedLeague(e.target.value); setSelectedTeam(''); setSelectedWeek(1); }}
          >
            <option value="">All Leagues</option>
            {filteredLeagues.map((l: any) => (
              <option key={l._id} value={l.name}>{l.name}</option>
            ))}
          </select>

          {/* Teams */}
          <select
            className="form-select schedule-filter-select"
            style={{ backgroundColor: '#231F20', color: '#fff', border: 'none', width: 'auto', minWidth: '140px', flex: '0 0 auto' }}
            value={selectedTeam}
            onChange={e => { setSelectedTeam(e.target.value); setSelectedWeek(1); }}
          >
            <option value="">All Teams</option>
            {teams.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Search box — temporarily hidden; uncomment to restore
          <div className="search-bar schedule-search-bar">
            <div className="input-group" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: 'none', boxShadow: 'none' }}
              />
              <button className="btn" type="button" style={{ background: 'transparent', border: 'none', color: '#888' }}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          */}
        </div>

        {/* Main body */}
        <div className="schedule-body" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>

          {/* LEFT — Week sidebar */}
          <div className="left-side" style={{ width: '200px', backgroundColor: '#000', padding: '20px 0', minHeight: '400px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {weekNumbers.length > 0 ? weekNumbers.map(w => (
                <li key={w} style={{ padding: '0 20px', marginBottom: '15px' }}>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); setSelectedWeek(w); }}
                    style={{
                      color: selectedWeek === w ? '#fff' : '#888',
                      fontWeight: selectedWeek === w ? 700 : 400,
                      textDecoration: 'none',
                      textTransform: 'capitalize',
                      fontSize: '15px',
                      display: 'block'
                    }}
                  >
                    Week {w}
                  </a>
                </li>
              )) : (
                <li style={{ padding: '0 20px' }}></li>
              )}
            </ul>
          </div>

          {/* RIGHT — Schedule table */}
          <div className="right-side" style={{ flex: 1, width: 'auto', minWidth: 0, padding: '20px' }}>
            
            {/* League strip tabs */}
            <div className="state-carousel-area" style={{ display: 'flex', gap: '5px', background: '#f5f5f5', padding: '5px', borderRadius: '4px', marginBottom: '20px', alignItems: 'center' }}>
              <button onClick={() => scrollStrip('left')} style={{ flexShrink: 0, border: 'none', background: '#666', color: '#fff', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>&lt;</button>
              <div ref={leagueStripRef} style={{ flex: 1, display: 'flex', gap: '4px', overflowX: 'auto', scrollbarWidth: 'none' } as React.CSSProperties}>
                {leagueStripNames.length > 0 ? leagueStripNames.map(name => (
                  <button
                    key={name}
                    onClick={() => { setSelectedLeague(selectedLeague === name ? '' : name); setSelectedTeam(''); setSelectedWeek(1); }}
                    style={{
                      flexShrink: 0,
                      border: 'none',
                      background: selectedLeague === name ? '#231F20' : 'transparent',
                      color: selectedLeague === name ? '#fff' : '#888',
                      fontWeight: selectedLeague === name ? 700 : 500,
                      padding: '8px 18px',
                      textTransform: 'uppercase',
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                  >
                    {name}
                  </button>
                )) : (
                  <div style={{ padding: '10px', color: '#888', fontSize: '13px', fontWeight: 600 }}>NO LEAGUES FOR WEEK {selectedWeek}</div>
                )}
              </div>
              <button onClick={() => scrollStrip('right')} style={{ flexShrink: 0, border: 'none', background: '#666', color: '#fff', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>&gt;</button>
            </div>

            {/* Table */}
            {gamesByDateTime.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', color: '#888', fontSize: '14px' }}>
                No games scheduled for {selectedLeague || 'this week'}.
              </div>
            ) : (() => {
              // Compute the maximum number of concurrent games across all time slots
              const maxFields = Math.max(...gamesByDateTime.map(([, sg]) => sg.length), 1);
              const fieldCols = Array.from({ length: maxFields }, (_, i) => i + 1);

              const getLogoUrl = (url?: string) => {
                if (!url) return '/assets/images/team-placeholder.svg';
                if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
                return url;
              };

              const renderGameCell = (game: any, fieldNum: number) => {
                if (!game) return <td key={fieldNum} data-title={`Field ${fieldNum}`}></td>;
                return (
                  <td key={fieldNum} data-title={`Field ${fieldNum}`}>
                    <div className="main">
                      <div className="a">
                        <img src={getLogoUrl(game.teamA?.logo)} alt="" />
                        <span>{game.teamA?.name || 'TBD'}</span>
                      </div>
                      <div className="b">
                        {game.status === 'completed'
                          ? <span style={{ fontWeight: 700, color: '#F13B26', fontSize: '14px', whiteSpace: 'nowrap' }}>
                              {game.teamA?.score ?? 0} - {game.teamB?.score ?? 0}
                            </span>
                          : <span className="vs">vs</span>}
                      </div>
                      <div className="a">
                        <img src={getLogoUrl(game.teamB?.logo)} alt="" />
                        <span>{game.teamB?.name || 'TBD'}</span>
                      </div>
                    </div>
                  </td>
                );
              };

              return (
                <div className="schedule-table-scroll" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' } as React.CSSProperties}>
                  <table className="table schedule-table" style={{ width: 'max-content', minWidth: '100%' }}>
                    <thead>
                      <tr>
                        <th>date/time</th>
                        {fieldCols.map(n => (
                          <th key={n}>field {n}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {gamesByDateTime.map(([dateTimeKey, slotGames]) => {
                        const [time, date] = dateTimeKey.split('__');
                        return (
                          <tr key={dateTimeKey}>
                            <td data-title="Date/Time">
                              <span>{date}</span>
                              <br />
                              <span>{formatTimeWithZone(time, orgTimezone, slotGames[0]?.date)}</span>
                            </td>
                            {fieldCols.map(n => renderGameCell(slotGames[n - 1], n))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}

          </div>
        </div>
      </div>
    </section>
  );
}
