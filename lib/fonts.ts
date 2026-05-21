import { Fraunces, Geist, Geist_Mono } from 'next/font/google';

/**
 * Display — Fraunces
 * Editorial serif with variable axes. We pull `opsz` to optimize at large
 * sizes and `SOFT` to dial mood: hero moments stay sharp (SOFT 0), body
 * display moments warm slightly (SOFT 50–80) on the warm side.
 */
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
  preload: true,
});

/**
 * Body — Geist Sans
 * Quiet confidence. Excellent legibility on small mobile screens.
 */
export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

/**
 * Micro — Geist Mono
 * Captions, stat labels, metadata. Used sparingly — never for body copy.
 */
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});
