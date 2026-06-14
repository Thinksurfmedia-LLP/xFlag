'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StatsClient({ leagues, seasons }: { leagues: any[]; seasons: any[] }) {
  const router = useRouter();
  // Build available years from the seasons list (not leagues), newest first
  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    seasons.forEach(s => {
      const yr = (s.name || '').match(/\d{4}/)?.[0];
      if (yr) ySet.add(yr);
    });
    return Array.from(ySet).sort((a, b) => b.localeCompare(a));
  }, [seasons]);

  // Find the year that contains the default season, fallback to newest year
  const initialYear = useMemo(() => {
    const defaultSeason = seasons.find(s => s.isDefault);
    if (defaultSeason) {
      const yr = (defaultSeason.name || '').match(/\d{4}/)?.[0];
      if (yr) return yr;
    }
    return availableYears[0] || '2026';
  }, [seasons, availableYears]);

  const [selectedYear, setSelectedYear] = useState<string>(initialYear);

  // Build season buttons for the selected year from the seasons list
  const availableSeasons = useMemo(() => {
    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];
    return seasons
      .filter(s => (s.name || '').match(/\d{4}/)?.[0] === selectedYear)
      .map(s => ({ label: (s.name as string).replace(/\d{4}/g, '').trim(), isDefault: s.isDefault }))
      .filter(s => s.label)
      .sort((a, b) => {
        const idxA = seasonOrder.indexOf(a.label);
        const idxB = seasonOrder.indexOf(b.label);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.label.localeCompare(b.label);
      });
  }, [seasons, selectedYear]);

  // Default to the isDefault season for the selected year, otherwise first
  const initialSeason = useMemo(() => {
    const def = availableSeasons.find(s => s.isDefault);
    return def?.label || availableSeasons[0]?.label || '';
  }, [availableSeasons]);

  const [selectedSeason, setSelectedSeason] = useState<string>(initialSeason);

  // When the year changes, reset the season to the default for that year
  useEffect(() => {
    const def = availableSeasons.find(s => s.isDefault);
    setSelectedSeason(def?.label || availableSeasons[0]?.label || '');
  }, [selectedYear]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter leagues matching selected year + season
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
                onClick={(e) => { e.preventDefault(); setSelectedYear(y); }}
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
                onClick={(e) => { e.preventDefault(); setSelectedSeason(s.label); }}
                style={selectedSeason === s.label ? { background: '#F13B26', color: '#fff' } : { background: '#231f20', color: '#fff' }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="design1">
          <a href="#">seasons Statistical Leaders <span>view</span></a>
        </h3>

        {/* LEAGUES / LOCATIONS GRID */}
        <ul className="seasons-team-list">
          {filteredLeagues.map(league => (
            <li
              key={league._id}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/${selectedYear}/${selectedSeason.toLowerCase()}/${league.slug}`)}
            >
              <div className="lf">
                <img src={getLogoUrl(league.image)} alt={league.name} />
              </div>
              <div className="rt">
                <h5>{league.name}</h5>
                <span><i className="fas fa-location-dot"></i> {league.location || 'New York, NY'}</span>
              </div>
            </li>
          ))}
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
