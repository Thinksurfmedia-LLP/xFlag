// Homepage sections an admin can show or hide. `defaultVisible` matches what
// was live before visibility became editable, so nothing changes until saved.
// Client-safe: no server imports.

export const HOME_SECTIONS = [
  { id: 'hero', label: 'Hero Banners', defaultVisible: true },
  { id: 'success', label: 'Success in Numbers', defaultVisible: true },
  { id: 'games', label: 'Upcoming / Previous Games', defaultVisible: false },
  { id: 'strip', label: 'Strip Banner (Register Now)', defaultVisible: false },
  { id: 'highlights', label: 'Match Highlights', defaultVisible: false },
  { id: 'locations', label: 'Featured Locations', defaultVisible: true },
  { id: 'scoreboard', label: 'League Scoreboard', defaultVisible: false },
  { id: 'difference', label: 'The Difference We Deliver', defaultVisible: true },
  { id: 'differenceCta', label: 'Difference → "Read More" button', defaultVisible: false },
  { id: 'sponsors', label: 'Sponsors', defaultVisible: true },
  { id: 'sponsorsCta', label: 'Sponsors → "Want to Sponsor" button', defaultVisible: false },
  { id: 'news', label: 'League News and Updates (sample content)', defaultVisible: false },
  { id: 'testimonials', label: 'What Our Players Say', defaultVisible: false },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]['id'];

export type HomeVisibility = Partial<Record<HomeSectionId, boolean>>;

export function isHomeSectionVisible(visibility: HomeVisibility | undefined, id: HomeSectionId): boolean {
  const stored = visibility?.[id];
  if (typeof stored === 'boolean') return stored;
  return HOME_SECTIONS.find(s => s.id === id)?.defaultVisible ?? true;
}
