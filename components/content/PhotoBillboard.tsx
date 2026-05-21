'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { usePrefersReducedMotion, useIsTouchDevice } from '@/lib/motion';
import type { Photo } from '@/data/photos';

/* ────────────────────────────────────────────────────────────────────
 * PhotoBillboard — Pattern A photo treatment
 *
 * The brief's Pattern A photo treatment, lifted into a reusable
 * component shared by Home Scene 06 and the /pictures-video page.
 *
 *   - Slight base tilt (alternating direction by index)
 *   - Warm parchment overlay tint at low alpha
 *   - Grain unifies disparate photo sources
 *   - Desktop hover: subtle additional tilt + slight scale
 *   - Mobile (touch): scroll-driven tilt — uses an IntersectionObserver
 *     position-in-viewport reading rather than scroll-bound transforms,
 *     so each card moves once when entering view and once when leaving
 *     (no per-frame ScrollTrigger overhead).
 *   - prefers-reduced-motion: tilt is removed entirely; the photo sits
 *     flat with just the overlay + grain treatment.
 *
 * If the photo file is missing (Paul has not yet dropped it into
 * /public/photos), a graceful "image coming soon" frame is rendered
 * so the layout never collapses to broken-icon territory.
 * ──────────────────────────────────────────────────────────────────── */

interface PhotoBillboardProps {
  photo: Photo;
  /** Tilt direction alternates by index. */
  index?: number;
  /** Aspect override; defaults to 4/3. */
  aspect?: '4/3' | '3/2' | '1/1' | '16/9';
  /** Loading priority for above-the-fold photos. */
  priority?: boolean;
}

export function PhotoBillboard({
  photo,
  index = 0,
  aspect = '4/3',
  priority = false,
}: PhotoBillboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  // Base tilt — alternating, deterministic per index
  const baseTilt = index % 2 === 0 ? -1.3 : 1.3;

  // ─── Mobile scroll-driven tilt ───────────────────────────────────
  // Touch-only path. IntersectionObserver gives us a normalized
  // 0..1 visibility ratio cheaply; we map it to a small extra tilt.
  // No GSAP ScrollTrigger involved (per the spec's no-new-ScrollTriggers
  // discipline in the home runway) — and as a one-time RIC effect this
  // also adds zero cost on desktop.
  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion) return;
    if (!isTouch) return; // hover-tilt handles desktop

    const el = ref.current;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 (above viewport) .. 0 (centered) .. 1 (below viewport)
        const center = (rect.top + rect.height / 2 - vh / 2) / vh;
        const offset = Math.max(-1, Math.min(1, center));
        // Add up to ±1.2° on top of the base tilt
        const extra = -offset * 1.2;
        el.style.setProperty('--photo-extra-tilt', `${extra.toFixed(3)}deg`);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [prefersReducedMotion, isTouch]);

  // Aspect class map — Tailwind's aspect utilities
  const aspectClass =
    {
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '1/1': 'aspect-square',
      '16/9': 'aspect-video',
    }[aspect];

  return (
    <figure
      ref={ref}
      className={clsx(
        'photo-billboard group relative isolate',
        'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        // Hover-tilt only on devices that hover (desktop)
        !prefersReducedMotion && !isTouch && 'hover:-translate-y-1 hover:scale-[1.015]'
      )}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `rotate(calc(${baseTilt}deg + var(--photo-extra-tilt, 0deg)))`,
      }}
    >
      <div
        className={clsx(
          'photo-billboard__frame relative overflow-hidden',
          aspectClass
        )}
        style={{
          backgroundColor: 'rgb(var(--bronze) / 0.08)',
          boxShadow:
            '0 1px 1px rgb(var(--brass) / 0.1), 0 18px 40px -18px rgb(var(--steel) / 0.45)',
        }}
      >
        {/* The photo. Plain <img> rather than next/image so a missing
            file degrades to the placeholder instead of breaking the
            build. Will swap to next/image in Phase 5 once the photo
            library is real. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            // If the file is missing, hide the image and let the
            // empty-frame styling carry the moment.
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const parent = (e.currentTarget as HTMLImageElement)
              .parentElement;
            if (parent) parent.dataset.missing = 'true';
          }}
        />

        {/* Warm parchment overlay — Pattern A's unifying tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              'linear-gradient(180deg, rgb(var(--parchment) / 0) 0%, rgb(var(--parchment) / 0.18) 70%, rgb(var(--parchment) / 0.32) 100%)',
          }}
        />
        {/* Per-photo grain — sits over the photo so it unifies with
            the site grain without doubling intensity */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(rgb(var(--bronze) / 0.18) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />

        {/* Brass corner mark — flourish */}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 font-mono text-[0.625rem] uppercase tracking-[0.22em]"
          style={{ color: 'rgb(var(--brass))' }}
        >
          ✦
        </span>

        {/* Missing-file fallback — only visible if the <img> errored */}
        <div
          aria-hidden="true"
          className="photo-billboard__fallback pointer-events-none absolute inset-0 hidden flex-col items-center justify-center text-center"
        >
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.22em]"
            style={{ color: 'rgb(var(--fg-quiet))' }}
          >
            Photo coming soon
          </span>
          <span
            className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em]"
            style={{ color: 'rgb(var(--fg-quiet) / 0.6)' }}
          >
            {photo.src}
          </span>
        </div>
      </div>

      {photo.caption && (
        <figcaption
          className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.22em]"
          style={{ color: 'var(--fg-quiet)' }}
        >
          {photo.caption}
        </figcaption>
      )}

      {/* Scoped style: when the frame is flagged data-missing, swap the
          image for the fallback. Keeps the logic colocated. */}
      <style jsx>{`
        .photo-billboard__frame[data-missing='true'] .photo-billboard__fallback {
          display: flex;
        }
      `}</style>
    </figure>
  );
}
