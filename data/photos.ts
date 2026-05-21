/**
 * Photos — single source of truth for the home Scene 06 photo grid
 * and the /pictures-video page.
 *
 * EDITING:
 *   1. Drop image files into `public/photos/`.
 *   2. Add an entry below for each photo. The `src` is the path
 *      relative to /public (e.g., "/photos/banquet-2024.jpg").
 *   3. `alt` is required for accessibility — describe what the photo
 *      shows (the men, the house, the event), not just "photo".
 *   4. `caption` is optional; appears as Geist Mono micro-copy under
 *      the billboard treatment when present.
 *   5. The `featured` flag controls whether it shows on the home grid
 *      (Scene 06). Aim for 4–6 featured photos. The full list lives
 *      on /pictures-video.
 *
 * If this list is empty, the home Scene 06 photo grid is hidden and
 * the /pictures-video page renders a graceful "coming soon" state —
 * the site stays presentable even without media on hand.
 *
 * Format suggestions (not enforced):
 *   - JPG, ~1600px wide, <300KB after compression
 *   - 4:3 or 3:2 aspect; the billboard treatment crops gracefully
 */

export interface Photo {
  id: string;
  /** Path relative to /public, e.g., "/photos/house-front.jpg" */
  src: string;
  /** Required for accessibility. Describe the subject, not the file. */
  alt: string;
  /** Optional Geist Mono caption shown beneath the billboard. */
  caption?: string;
  /** Show on the home Scene 06 grid. Aim for 4–6. */
  featured?: boolean;
}

// EDIT HERE: Add photos by copying the entry below.
// Drop image files in public/photos/ first.
export const PHOTOS: Photo[] = [
  {
    id: 'the-house',
    src: '/photos/the-house.jpg',
    alt: "Our Father's House — the navy blue house in Rhea County, Tennessee",
    caption: "Our Father\u2019s House \u00b7 Rhea County, Tennessee",
    featured: true,
  },
];

/** Photos featured on the home Scene 06 grid. */
export function getFeaturedPhotos(): Photo[] {
  return PHOTOS.filter((p) => p.featured);
}
