import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getLiveLeagues } from '@/lib/flagmag';
import PlayerStatsClient from './PlayerStatsClient';

export default async function PlayerStatsPage({ 
  params,
  searchParams
}: { 
  params: { year: string; season: string; slug: string };
  searchParams: { team?: string };
}) {
  const { year, season, slug } = await params;
  const sParams = await searchParams;
  const teamName = sParams.team || 'All Players';

  const FLAGMAG_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');

  const fetchStats = async (type: string) => {
    try {
      const teamParam = teamName === 'All Players' ? '' : encodeURIComponent(teamName);
      const url = `${FLAGMAG_URL}/api/organizations/xflagfootball/season/${slug}/stats/computed?team=${teamParam}&statType=${type}`;
      const res = await fetch(url, { next: { revalidate: 120 } });
      if (!res.ok) return [];
      const data = await res.json();
      return data.players || [];
    } catch (e) {
      console.error(`Failed to fetch ${type} stats:`, e);
      return [];
    }
  };

  // Run leagues lookup and all four stat fetches in parallel
  const [leagues, passingStats, receivingStats, rushingStats, defensiveStats] = await Promise.all([
    getLiveLeagues(),
    fetchStats('passing'),
    fetchStats('receiving'),
    fetchStats('rushing'),
    fetchStats('defensive'),
  ]);

  const league = leagues.find((l: any) => l.slug === slug);
  const seasonName = league?.season?.name || 'Current Season';
  const leagueName = league?.name?.replace(seasonName, '').trim() || league?.name || 'League';

  const getPlayerPhoto = (url?: string) => {
    if (!url) return '/assets/images/player-placeholder.svg';
    if (url.startsWith('/api/')) return `${FLAGMAG_URL}${url}`;
    return url;
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="breadcrumb-section">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/xstats">xstats</Link></li>
            <li><Link href={`/${year}/${season}/${slug}`}>Point Table</Link></li>
            <li> Player Stats</li>
          </ul>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="image-area">
          <img src="/assets/images/about-banner.jpg" alt="Banner" />
        </div>
        <div className="container">
          <h1>xstats</h1>
        </div>
      </section>

      <section className="team-point-section section-padding">
        <div className="container-fluid">
          <div className="text-center">
            <h2><span>{seasonName}</span> {leagueName} - {teamName}</h2>
          </div>

          <PlayerStatsClient
            passing={passingStats}
            receiving={receivingStats}
            rushing={rushingStats}
            defensive={defensiveStats}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
