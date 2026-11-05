// Stat tables show "<name> (#<jersey>)". Players the legacy import could only
// identify by jersey were stored as "<Team> #<jersey> (<Season>)" (with a
// " (2)"-style suffix when that name was taken) — unique names FlagMag needs,
// but the season and second number just repeat what the table already says.
const IMPORT_PLACEHOLDER = /^(.+?) #(\d+) \([A-Za-z]+ \d{4}\)$/;
// The import's same-name counter ("Michael Harris (11)"): it keeps unlinked
// players distinct in FlagMag; in a table the Team column already does.
const DUPLICATE_COUNTER = / \(\d+\)$/;

/** Display label for a stat-table player cell. */
export function formatPlayerName(name: string | undefined, jerseyNumber?: string | number | null): string {
  const jersey = jerseyNumber != null && jerseyNumber !== '' ? String(jerseyNumber) : '';
  const base = (name || '').replace(DUPLICATE_COUNTER, '');
  const placeholder = base.match(IMPORT_PLACEHOLDER);
  if (placeholder) {
    const [, team, number] = placeholder;
    return `${team} (#${jersey || number})`;
  }
  return jersey ? `${base} (#${jersey})` : base;
}
