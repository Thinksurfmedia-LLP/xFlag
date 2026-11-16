// The /xstats year → season picker's selection rules, shared by the page
// (which preloads the leagues of the season the picker will open on) and
// StatsClient (which runs the picker) so both land on the same season.

const SEASON_ORDER = ['Winter', 'Spring', 'Summer', 'Fall', 'Holiday'];

export interface PickerSeason {
  _id: string;
  name?: string;
  isDefault?: boolean;
}

export interface SeasonOption {
  _id: string;
  label: string;
  isDefault?: boolean;
}

const yearOf = (name?: string) => (name || '').match(/\d{4}/)?.[0];

/** Every year some season is named after, newest first. */
export function availableYears(seasons: PickerSeason[]): string[] {
  const years = new Set<string>();
  seasons.forEach((s) => {
    const yr = yearOf(s.name);
    if (yr) years.add(yr);
  });
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}

/** The year's seasons as picker options ("Fall 2015" → "Fall"), latest in the year first. */
export function seasonsForYear(seasons: PickerSeason[], year: string): SeasonOption[] {
  return seasons
    .filter((s) => yearOf(s.name) === year)
    .map((s) => ({ _id: s._id, label: (s.name as string).replace(/\d{4}/g, '').trim(), isDefault: s.isDefault }))
    .filter((s) => s.label)
    .sort((a, b) => {
      const idxA = SEASON_ORDER.indexOf(a.label);
      const idxB = SEASON_ORDER.indexOf(b.label);
      // Descending — the latest season of the year shows first.
      if (idxA !== -1 && idxB !== -1) return idxB - idxA;
      return b.label.localeCompare(a.label);
    });
}

/** The season a year opens on: the default season if it's in that year, else the year's latest. */
export function defaultSeasonLabelFor(seasons: PickerSeason[], year: string): string {
  const yearSeasons = seasonsForYear(seasons, year);
  const def = yearSeasons.find((s) => s.isDefault);
  return def?.label || yearSeasons[0]?.label || '';
}

// First visit: the current (default) season. Back from a league page: the
// year/season the URL carries, as long as that season actually exists.
export function initialYear(seasons: PickerSeason[], requestedYear?: string): string {
  const years = availableYears(seasons);
  if (requestedYear && years.includes(requestedYear)) return requestedYear;
  const defYear = yearOf(seasons.find((s) => s.isDefault)?.name);
  return defYear || years[0] || '2026';
}

export function initialSeasonLabel(seasons: PickerSeason[], year: string, requestedSeason?: string): string {
  const requested = seasonsForYear(seasons, year).find(
    (s) => s.label.toLowerCase() === requestedSeason?.toLowerCase()
  );
  return requested?.label || defaultSeasonLabelFor(seasons, year);
}

/** The picker option for a year + season label, if there is one. */
export function findSeasonOption(seasons: PickerSeason[], year: string, label: string): SeasonOption | undefined {
  return seasonsForYear(seasons, year).find((s) => s.label.toLowerCase() === label.toLowerCase());
}
