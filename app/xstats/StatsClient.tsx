'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StatsClient({ leagues, seasons }: { leagues: any[]; seasons: any[] }) {
  const router = useRouter();

  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    seasons.forEach(s => {
      const yr = (s.name || '').match(/\d{4}/)?.[0];
      if (yr) ySet.add(yr);
    });
    return Array.from(ySet).sort((a, b) => b.localeCompare(a));
  }, [seasons]);

  const initialYear = useMemo(() => {
    const def = seasons.find(s => s.isDefault);
    if (def) {
      const yr = (def.name || '').match(/\d{4}/)?.[0];
      if (yr) return yr;
    }
    return availableYears[0] || '2026';
  }, [seasons, availableYears]);

  const [selectedYear, setSelectedYear] = useState<string>(initialYear);

  const availableSeasons = useMemo(() => {
    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];
    return seasons
      .filter(s => (s.name || '').match(/\d{4}/)?.[0] === selectedYear)
      .map(s => ({ _id: s._id, label: (s.name as string).replace(/\d{4}/g, '').trim(), isDefault: s.isDefault }))
      .filter(s => s.label)
      .sort((a, b) => {
        const idxA = seasonOrder.indexOf(a.label);
        const idxB = seasonOrder.indexOf(b.label);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.label.localeCompare(b.label);
      });
  }, [seasons, selectedYear]);

  const getDefaultSeasonLabel = () => {
    const def = availableSeasons.find(s => s.isDefault);
    return def?.label || availableSeasons[0]?.label || '';
  };

  const [selectedSeason, setSelectedSeason] = useState<string>(getDefaultSeasonLabel);

  useEffect(() => {
    setSelectedSeason(getDefaultSeasonLabel());
  }, [selectedYear]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Link href={leaderboardHref}>seasons Statistical Leaders <span>view</span></Link>
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
