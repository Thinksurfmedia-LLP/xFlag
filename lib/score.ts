type ScoredGame = {
  status?: string;
  teamA?: { score?: number | null };
  teamB?: { score?: number | null };
};

// flagmag stores a team's score as null until it first scores, so a team
// that was shut out in a finished game comes back as null, not 0. Show 0 for
// any game that has started; keep '-' only for games not played yet.
export function displayScore(game: ScoredGame, side: 'A' | 'B'): number | string {
  const score = side === 'A' ? game.teamA?.score : game.teamB?.score;
  if (typeof score === 'number') return score;
  return game.status === 'completed' || game.status === 'in_progress' ? 0 : '-';
}
