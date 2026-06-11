'use client';

import { useState, useMemo } from 'react';

export default function StatsClient({ leagues }: { leagues: any[] }) {
  const years = [
    '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018',
    '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'
  ];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];

  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedSeason, setSelectedSeason] = useState<string>('Summer');

  // Filter leagues matching selected Year and Season
  const filteredLeagues = useMemo(() => {
    return leagues.filter(l => {
      const seasonName = l.season?.name || '';
      const yrMatch = seasonName.match(/\d{4}/)?.[0] || '';
      const szName = seasonName.replace(/\d{4}/g, '').trim();
      // Case-insensitive match for season
      return yrMatch === selectedYear && szName.toLowerCase() === selectedSeason.toLowerCase();
    });
  }, [leagues, selectedYear, selectedSeason]);

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team1.png';
    if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
    return url;
  };

  return (
    <section className="x-states-section">
      <div className="container">
        
        {/* YEARS */}
        <ul className="years-item">
          {years.map(y => (
            <li key={y}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setSelectedYear(y); }}
                style={selectedYear === y ? { background: '#231f20', color: '#fff' } : undefined}
              >
                {y}
              </a>
            </li>
          ))}
        </ul>

        {/* SEASONS */}
        <ul className="seasons-item">
          {seasons.map(s => (
            <li key={s}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setSelectedSeason(s); }}
                style={selectedSeason === s ? { background: '#F13B26', color: '#fff' } : undefined}
              >
                {s}
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
              onClick={() => window.location.href = `/organizations/xflagfootball/season/${league.slug}/game-stats`}
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
