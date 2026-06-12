"use client";
import { useRouter } from "next/navigation";

export default function GameRow({ game, year, season, slug }: any) {
  const router = useRouter();
  const url = `/${year}/${season}/${slug}/game/${game._id}?team=${encodeURIComponent(game.teamA?.name || '')}`;

  const getLogoUrl = (url?: string) => {
    if (!url) return '/assets/images/team1.png';
    if (url.startsWith('/api/')) return `https://flagmag.com${url}`;
    return url;
  };

  return (
    <tr 
      onClick={() => router.push(url)} 
      style={{ cursor: 'pointer' }}
    >
      <td>{game.teamA?.score !== undefined ? game.teamA.score : '-'}</td>
      <td>
        <img src={getLogoUrl(game.teamA?.logo)} alt={game.teamA?.name} /> {game.teamA?.name}
      </td>
      <td><span className="vs">vs</span></td>
      <td>{game.teamB?.score !== undefined ? game.teamB.score : '-'}</td>
      <td>
        <img src={getLogoUrl(game.teamB?.logo)} alt={game.teamB?.name} /> {game.teamB?.name}
      </td>
    </tr>
  );
}
