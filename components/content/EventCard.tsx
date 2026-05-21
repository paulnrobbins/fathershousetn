import Link from 'next/link';
import clsx from 'clsx';
import type { FHEvent } from '@/data/events';

/* ────────────────────────────────────────────────────────────────────
 * EventCard
 *
 * Editorial event card used on Home Scene 06 and on /get-involved.
 * Fields per Phase 1 brief: date · title · location. CTA optional —
 * only rendered when the event provides a `cta` block in data/events.ts.
 *
 *   - Date renders as an editorial stack (day / month·year / time).
 *   - Title is Fraunces.
 *   - Location is Geist Mono micro.
 *   - If `cta` is present, renders the action button. Detects mailto:
 *     and external https:// for the right link element + indicator
 *     glyph (→ internal, ↗ external/email).
 * ──────────────────────────────────────────────────────────────────── */

interface EventCardProps {
  event: FHEvent;
  /** Index for staggered animations (parent owns the actual stagger). */
  index?: number;
}

export function EventCard({ event }: EventCardProps) {
  const start = new Date(event.start);
  const month = start.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = start.toLocaleString('en-US', { day: '2-digit' });
  const year = start.getFullYear();
  const time = start.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  });

  const cta = event.cta;
  const isExternal = cta
    ? cta.href.startsWith('http') || cta.href.startsWith('mailto:')
    : false;

  return (
    <article
      className={clsx(
        'event-card group relative flex h-full flex-col',
        'border border-hairline',
        'p-6 sm:p-8 md:p-9',
        'transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:border-brass focus-within:border-brass'
      )}
      style={{ backgroundColor: 'rgb(var(--bg) / 0.4)' }}
    >
      {/* ─── Date stack ──────────────────────────────────────────── */}
      <div className="mb-6 flex items-baseline gap-3 border-b border-hairline pb-5">
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.25rem)',
            letterSpacing: '-0.03em',
            color: 'rgb(var(--accent))',
            fontVariationSettings: "'opsz' 144, 'SOFT' 0",
          }}
        >
          {day}
        </span>
        <div className="flex flex-col gap-1.5">
          <span
            className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
            style={{ color: 'var(--fg)' }}
          >
            {month}
            <span
              aria-hidden="true"
              className="mx-1.5"
              style={{ color: 'inherit', opacity: 0.5 }}
            >
              ·
            </span>
            {year}
          </span>
          <span
            className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
            style={{ color: 'var(--fg-muted)' }}
          >
            {time} ET
          </span>
        </div>
      </div>

      {/* ─── Title + description ─────────────────────────────────── */}
      <h3
        className="font-display-soft text-balance"
        style={{
          fontSize: 'clamp(1.375rem, 2.2vw, 1.75rem)',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
        }}
      >
        {event.title}
      </h3>

      <p
        className="mt-3 text-pretty text-sm leading-relaxed"
        style={{ color: 'var(--fg-muted)' }}
      >
        {event.shortDescription}
      </p>

      {/* ─── Location + CTA (CTA is optional — only renders if event.cta is set) ─── */}
      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-5 gap-y-3 pt-8">
        <p
          className="font-mono max-w-[18rem] text-[0.6875rem] uppercase tracking-[0.18em]"
          style={{ color: 'var(--fg-quiet)' }}
        >
          {event.location}
        </p>

        {cta && (
          isExternal ? (
            <a
              href={cta.href}
              target={cta.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={cta.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
              className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
            >
              <span>{cta.label}</span>
              <span aria-hidden="true" className="ml-1">↗</span>
            </a>
          ) : (
            <Link
              href={cta.href}
              className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
            >
              <span>{cta.label}</span>
              <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          )
        )}
      </div>
    </article>
  );
}
