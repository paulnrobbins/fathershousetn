/**
 * Site navigation — single source of truth for all 9 pages.
 *
 * The 9 pages map to halves of the journey per the Phase 1 brief's IA:
 *   COLD   — pre-threshold, for the man before he's in
 *   WARM   — post-threshold, for those past the crossing or supporting it
 *   BRIDGE — neutral, accessible from both
 *
 * Newsletter is no longer a standalone nav item per Better-Solution Audit
 * recommendation #4 — it lives inline in the footer + Get Involved page.
 */

export type NavHalf = 'cold' | 'warm' | 'bridge';

export interface NavLink {
  label: string;
  href: string;
  half: NavHalf;
}

export const mainNavItems: NavLink[] = [
  { label: 'Home', href: '/', half: 'bridge' },
  { label: 'Future Applicants', href: '/future-applicants', half: 'cold' },
  { label: "FAQ's", href: '/faqs', half: 'cold' },
  { label: 'Testimonies', href: '/testimonies', half: 'warm' },
  { label: 'About Us', href: '/about-us', half: 'warm' },
  { label: 'Get Involved', href: '/get-involved', half: 'warm' },
  { label: 'Contact Us', href: '/contact-us', half: 'bridge' },
  { label: 'Donate Now', href: '/donate-now', half: 'warm' },
];

/**
 * Resolves the cold/warm/bridge theme for a given pathname.
 * Used by ThemeApplier to set <body data-theme="..."> on route change.
 *
 * Note: the home page returns 'bridge' here. Phase 3 will dynamically
 * transition the home <body> theme via scroll progress, overriding this
 * static value as the user crosses the threshold.
 */
export function getThemeForPath(pathname: string): NavHalf {
  // Strip trailing slash, default to root
  const clean = pathname.replace(/\/$/, '') || '/';

  // Exact match first
  const exact = mainNavItems.find((item) => item.href === clean);
  if (exact) return exact.half;

  // Prefix match for nested routes (none in Phase 2, future-proofing)
  const prefix = mainNavItems.find(
    (item) => item.href !== '/' && clean.startsWith(item.href + '/')
  );
  if (prefix) return prefix.half;

  return 'bridge';
}

/** The Donate Now item — surfaced separately in the Nav CTA. */
export const donateItem = mainNavItems.find((item) => item.href === '/donate-now')!;

/** Phone, email, and address — single source of truth. */
export const CONTACT = {
  phone: '(423) 285-5096',
  phoneTel: '+14232855096',
  email: 'fathershousetn@gmail.com',
  address: {
    line1: 'PO Box 7',
    line2: 'Evensville, TN 37332',
  },
} as const;

/**
 * External URLs — Zeffy donation + newsletter, etc.
 *
 * The donation URL below is a placeholder. In Phase 4b, replace with the
 * real Zeffy donate iframe URL surfaced from the existing /donate-now page
 * (Paul will provide the verified URL).
 */
export const EXTERNAL = {
  zeffyDonate:
    'https://www.zeffy.com/en-US/donation-form/donate-to-our-fathers-house',
  zeffyNewsletter:
    'https://www.zeffy.com/en-US/newsletter-form/sign-up-for-our-newsletter-559',
  rheaCountyArcgis:
    'https://www.arcgis.com/apps/dashboards/c38eb0eecf234b18aba47b6cd7614e8b',
} as const;

/**
 * Social media — surfaced in the Footer.
 * EDIT HERE: change a URL or add/remove a platform.
 */
export const SOCIAL = {
  youtube: 'https://www.youtube.com/@OurFathersHouseTN',
  facebook: 'https://www.facebook.com/profile.php?id=61566201818851',
} as const;
