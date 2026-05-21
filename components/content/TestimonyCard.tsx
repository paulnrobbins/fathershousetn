'use client';

import clsx from 'clsx';
import type { Testimony } from '@/data/testimonies';

/* ────────────────────────────────────────────────────────────────────
 * TestimonyCard — Pattern A Billboard
 *
 * Two variants:
 *
 *   - variant="home": compact billboard for Scene 05. Only the excerpt
 *     is shown — the home page links out to /testimonies for the full
 *     read. Tilted, oversized Fraunces pull-quote, brass quote glyphs.
 *
 *   - variant="page": full editorial card for /testimonies. The excerpt
 *     leads as a pull-quote; the full testimony renders as proper
 *     paragraphs below. No tilt, no hover state — built for long-form
 *     reading.
 *
 * The previous hover-reveal overlay was removed when real testimonies
 * (Jeremy Prather, etc.) proved too long to fit cleanly in a hover
 * card. Long-form content lives on the page; the home page is for the
 * pull-quote and the link.
 * ──────────────────────────────────────────────────────────────────── */

export interface TestimonyCardProps {
  testimony: Testimony;
  /** Card index (0, 1, 2…) — drives the alternating tilt direction on home. */
  index?: number;
  variant?: 'home' | 'page';
}

export function TestimonyCard({
  testimony,
  index = 0,
  variant = 'home',
}: TestimonyCardProps) {
  const tilt = variant === 'home' ? (index % 2 === 0 ? '-1.4deg' : '1.4deg') : '0deg';

  return (
    <article
      className={clsx(
        'testimony-card group relative isolate',
        variant === 'home'
          ? 'p-7 sm:p-10 md:p-14 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
          : 'p-7 sm:p-10 md:p-14 lg:p-16'
      )}
      style={{
        transform: variant === 'home' ? `rotate(${tilt})` : undefined,
        backgroundColor: 'rgb(var(--parchment))',
        color: 'rgb(var(--bronze))',
        boxShadow:
          '0 2px 1px rgb(var(--brass) / 0.08), 0 22px 50px -22px rgb(var(--steel) / 0.55)',
      }}
    >
      {/* Brass corner mark — editorial flourish, top-left */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-5 font-mono text-[0.625rem] uppercase tracking-[0.22em]"
        style={{ color: 'rgb(var(--brass))' }}
      >
        ‘ ’
      </span>

      {/* Excerpt — always visible. On home it's the whole show. On page
          it leads as a pull-quote above the full testimony. */}
      <blockquote>
        <p
          className="font-display text-balance"
          style={{
            fontSize:
              variant === 'page'
                ? 'clamp(1.5rem, 3vw, 2.25rem)'
                : 'clamp(1.5rem, 3.4vw, 2.5rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.022em',
            color: 'rgb(var(--bronze))',
            fontVariationSettings: "'opsz' 144, 'SOFT' 20",
          }}
        >
          <span aria-hidden="true" style={{ color: 'rgb(var(--brass))' }}>
            “
          </span>
          {testimony.excerpt}
          <span aria-hidden="true" style={{ color: 'rgb(var(--brass))' }}>
            ”
          </span>
        </p>
      </blockquote>

      {/* Full testimony — only on the /testimonies page variant.
          Splits on blank lines so paragraphs render as paragraphs. */}
      {variant === 'page' &&
        testimony.full &&
        testimony.full !== testimony.excerpt && (
          <div className="mt-10 space-y-5 border-t border-[rgb(var(--brass)/0.4)] pt-8">
            {testimony.full.split(/\n\n+/).map((para, i) => (
              <p
                key={i}
                className="text-pretty"
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.0625rem)',
                  lineHeight: 1.65,
                  color: 'rgb(var(--bronze) / 0.88)',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        )}

      {/* Attribution */}
      <footer
        className={clsx(
          'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-[rgb(var(--brass)/0.4)] pt-5',
          variant === 'page' && testimony.full ? 'mt-10' : 'mt-10'
        )}
      >
        <p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
          style={{ color: 'rgb(var(--bronze))' }}
        >
          {testimony.name}
          {testimony.context && (
            <>
              <span
                aria-hidden="true"
                className="mx-2"
                style={{ color: 'inherit', opacity: 0.5 }}
              >
                ·
              </span>
              <span style={{ color: 'rgb(var(--bronze) / 0.7)' }}>
                {testimony.context}
              </span>
            </>
          )}
        </p>
      </footer>
    </article>
  );
}
