/**
 * Upcoming events — replaces the Google Calendar embed on the
 * original site per Better-Solution Audit recommendation #1.
 *
 * EDITING:
 *   1. Add a new event by copying an existing entry and changing the fields.
 *   2. Remove past events manually (the home page also auto-hides them
 *      via the date filter in `getUpcomingEvents`, but tidying the file
 *      keeps it readable).
 *   3. Order: most-recent date first; the home page shows the next 3.
 *
 * Date format: ISO 8601 (YYYY-MM-DDTHH:mm) in local Eastern Time.
 * The site renders everything as ET (Rhea County, TN).
 *
 * CTAs: each event optionally carries a `cta` block with a `label` and
 * an `href`. If both are present, the event card renders that button.
 * If absent, the card shows date + title + location only — no CTA.
 * `href` can be any URL: external (https://…), email (mailto:…), or
 * internal anchor (#section-id).
 */

export interface FHEvent {
  id: string;
  title: string;
  /** ISO 8601 start datetime in local (Eastern) time. */
  start: string;
  /** ISO 8601 end datetime in local time. Optional. */
  end?: string;
  location: string;
  /** 1–3 sentences shown on listing pages. */
  shortDescription: string;
  /** Full event description shown on detail page. Supports paragraph breaks via \n\n. */
  longDescription?: string;
  /** Optional CTA. If present, renders as the event card's action button. */
  cta?: {
    label: string;
    /** External URL, mailto:, or internal #anchor. */
    href: string;
  };
}

// EDIT HERE: Events list. Past events auto-hide via getUpcomingEvents().
export const EVENTS: FHEvent[] = [
  {
    id: 'prayer-vigil-2026-05',
    title: '24 Hour Prayer Vigil',
    start: '2026-05-22T18:00',
    end: '2026-05-23T18:00',
    location: "Our Father's House — 165 Landfill Rd, Dayton, TN 37321",
    shortDescription:
      "Let's SATURATE this property with prayer and supplication for the Holy Spirit to work powerfully in the lives of the residents and staff. We will have group prayer meetings at the house at 6 pm Friday and 9 am and 5 pm Saturday. Please email fathershouseTN@gmail.com for more details.",
    cta: {
      label: 'Register for prayer vigil',
      href: 'https://www.signupgenius.com/go/10C044AA9A928A3F9C52-63905385-24hour?zlinkid=84a0c9af-9abd-43a1-a15e-1a243055bdea',
    },
  },
  {
    id: 'annual-banquet-2026',
    title: "2nd Annual Our Father's House Banquet",
    start: '2026-08-06T18:00',
    location: 'Latimer Student Center Dining Hall, Bryan College',
    shortDescription:
      'Join us in celebrating all the work the Lord has done over the year. Hear testimonies and see the vision God has given for us this coming year. If you want to attend the banquet, please email us at fathershousetn@gmail.com.',
    cta: {
      label: 'Email to RSVP',
      href: 'mailto:fathershousetn@gmail.com?subject=Annual%20Banquet%20RSVP',
    },
  },
];

/** Returns events whose start date is in the future, sorted ascending. */
export function getUpcomingEvents(now: Date = new Date()): FHEvent[] {
  return EVENTS.filter((e) => new Date(e.start) >= now).sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
}
