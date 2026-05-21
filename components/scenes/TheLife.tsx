'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '@/lib/gsap-context';
import { usePrefersReducedMotion } from '@/lib/motion';
import { EventCard } from '@/components/content/EventCard';
import { PhotoBillboard } from '@/components/content/PhotoBillboard';
import { getUpcomingEvents } from '@/data/events';
import { getFeaturedPhotos } from '@/data/photos';

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — Scene 06 · THE LIFE
 *
 * Mode 1 maintenance: change the strings below to update what reads
 * on the home page. Search for "EDIT HERE:" to jump between blocks.
 *
 * Events are sourced from `data/events.ts` (only future events, sorted
 * earliest first). Photos are sourced from `data/photos.ts` (only the
 * `featured: true` ones).
 *
 * Empty-state behavior:
 *   - 0 events  → events sub-section is hidden (no awkward empty grid)
 *   - 0 photos  → photo grid is hidden
 *   - 0 of each → the whole scene is hidden so we don't ship a header
 *                 with no body
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Scene 06 — THE LIFE (events + photo grid)
const SCENE_06 = {
  eyebrow: 'The Life',
  framing: 'The program is alive.',
  subFraming: 'See what God is doing.',
  eventsLabel: 'Upcoming',
  photosLabel: 'Recent',
};

/* ════════════════════════════════════════════════════════════════════
 * TheLife — Home Scene 06
 *
 * Lives AFTER the pinned hero. Two sub-sections:
 *
 *   Events: 3 upcoming event cards in a 3-up grid. Stagger-in on
 *           scroll. Sourced from `data/events.ts`.
 *
 *   Photos: 4–6 featured photos as a Pattern A — Billboard photo grid
 *           below the events. Photos use scroll-driven tilt on touch
 *           and hover-tilt on desktop (logic lives in PhotoBillboard).
 *
 * Reduced-motion: stagger-in is skipped; cards/photos arrive in their
 * final state without animation.
 * ══════════════════════════════════════════════════════════════════ */
export function TheLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const events = getUpcomingEvents().slice(0, 3);
  const photos = getFeaturedPhotos();

  useGsapContext(
    sectionRef,
    () => {
      if (prefersReducedMotion) return;
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Event card stagger
      const eventCards = sectionRef.current.querySelectorAll('.event-card');
      const eventsAnchor = sectionRef.current.querySelector('.life-events');
      if (eventCards.length && eventsAnchor) {
        gsap.from(eventCards, {
          opacity: 0,
          y: 40,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: eventsAnchor,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Photo grid stagger — quieter and slower than event cards
      const photoCards = sectionRef.current.querySelectorAll('.photo-billboard');
      const photosAnchor = sectionRef.current.querySelector('.life-photos');
      if (photoCards.length && photosAnchor) {
        gsap.from(photoCards, {
          opacity: 0,
          y: 30,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: photosAnchor,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    [prefersReducedMotion]
  );

  // If there's truly nothing to show, drop the whole scene rather than
  // render a header above empty grids. Rules-of-Hooks: this guard sits
  // AFTER the hook call so the hook count is stable across renders.
  if (events.length === 0 && photos.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      data-theme="warm"
      className="relative bg-bg py-section"
      aria-label="The life of the program — events and photos"
    >
      <div className="container-edge">
        {/* Section header */}
        <div>
          <h2
            className="font-display text-balance text-fg"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.75rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
            }}
          >
            {SCENE_06.framing}
          </h2>
          <p
            className="mt-6 max-w-xl text-balance text-body-xl"
            style={{ color: 'var(--fg-muted)' }}
          >
            {SCENE_06.subFraming}
          </p>
        </div>

        {/* Events sub-section */}
        {events.length > 0 && (
          <div className="life-events mt-16 md:mt-24">
            <div className="rule-h mb-10" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Photos sub-section */}
        {photos.length > 0 && (
          <div className="life-photos mt-24 md:mt-32">
            <div className="rule-h mb-10" />

            {/*
              Asymmetric photo grid. First photo is wide (col-span-7),
              second narrower (col-span-5), third wider, fourth narrower,
              etc. — keeps the eye moving diagonally per the brief's
              asymmetry principle. Falls back to single column on mobile.
            */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 md:grid-cols-12 md:gap-x-10">
              {photos.map((photo, i) => {
                // Pattern: wide-narrow-narrow-wide-wide-narrow…
                const pattern = i % 4;
                const colSpan =
                  pattern === 0 || pattern === 3
                    ? 'md:col-span-7'
                    : 'md:col-span-5';
                const offsetClass =
                  pattern === 1
                    ? 'md:col-start-8 md:translate-y-10'
                    : pattern === 3
                    ? 'md:col-start-6'
                    : '';

                return (
                  <div
                    key={photo.id}
                    className={`${colSpan} ${offsetClass}`}
                  >
                    <PhotoBillboard
                      photo={photo}
                      index={i}
                      aspect={pattern % 2 === 0 ? '4/3' : '3/2'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
