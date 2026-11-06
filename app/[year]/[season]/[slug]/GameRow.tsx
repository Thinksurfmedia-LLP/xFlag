"use client";
import { useRouter } from "next/navigation";
import { displayScore } from "@/lib/score";
import FallbackImg from '@/components/FallbackImg';

export default function GameRow({ game, year, season, slug, showDate }: any) {
  const router = useRouter();
  const url = `/${year}/${season}/${slug}/game/${game._id}?team=${encodeURIComponent(game.teamA?.name || '')}`;

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team-placeholder.svg';
    if (url.startsWith('/api/')) return `${process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com'}${url}`;
    return url;
  };

  const dateLabel = (() => {
    const d = new Date(game.date);
    if (isNaN(d.getTime())) return game.date || '';
    return d.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' });
  })();

  return (
    <tr onClick={() => router.push(url)} style={{ cursor: 'pointer' }}>
      {showDate && <td style={{ color: '#f13b26', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>{dateLabel}</td>}
      <td>{displayScore(game, 'A')}</td>
      <td>
        <span>
          <FallbackImg src={getLogoUrl(game.teamA?.logo)} fallback="/assets/images/team-placeholder.svg" alt={game.teamA?.name} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 4, verticalAlign: 'middle' }} />
          <span>{game.teamA?.seedNumber != null && <span style={{ opacity: 0.7 }}>#{game.teamA.seedNumber} </span>}{game.teamA?.name}</span>
        </span>
      </td>
      <td><span className="vs">vs</span></td>
      <td>{displayScore(game, 'B')}</td>
      <td>
        <span>
          <FallbackImg src={getLogoUrl(game.teamB?.logo)} fallback="/assets/images/team-placeholder.svg" alt={game.teamB?.name} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 4, verticalAlign: 'middle' }} />
          <span>{game.teamB?.seedNumber != null && <span style={{ opacity: 0.7 }}>#{game.teamB.seedNumber} </span>}{game.teamB?.name}</span>
        </span>
      </td>
    </tr>
  );
}
