"use client";
import { useRouter } from "next/navigation";

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
      <td>{game.teamA?.score !== undefined ? game.teamA.score : '-'}</td>
      <td>
        <span>
          <img src={getLogoUrl(game.teamA?.logo)} alt={game.teamA?.name} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 4, verticalAlign: 'middle' }} />
          <span>{game.teamA?.name}</span>
        </span>
      </td>
      <td><span className="vs">vs</span></td>
      <td>{game.teamB?.score !== undefined ? game.teamB.score : '-'}</td>
      <td>
        <span>
          <img src={getLogoUrl(game.teamB?.logo)} alt={game.teamB?.name} style={{ width: 22, height: 22, objectFit: 'contain', marginRight: 4, verticalAlign: 'middle' }} />
          <span>{game.teamB?.name}</span>
        </span>
      </td>
    </tr>
  );
}
