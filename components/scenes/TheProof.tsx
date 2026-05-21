'use client';

import { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '@/lib/gsap-context';
import { usePrefersReducedMotion } from '@/lib/motion';
import { TestimonyCard } from '@/components/content/TestimonyCard';
import { getFeaturedTestimonies } from '@/data/testimonies';

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — Scene 05 · THE PROOF
 *
 * Mode 1 maintenance: change the strings/links below to update what
 * reads on the home page. Search for "EDIT HERE:" in this file
 * to jump between the editable blocks.
 *
 * Featured testimonies are sourced from `data/testimonies.ts` —
 * toggle a testimony's `featured: true` flag there to surface it on
 * the home page. The home billboard shows the first 1–2 featured.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Scene 05 — THE PROOF (testimony billboards)
const SCENE_05 = {
  eyebrow: 'The Proof',
  framing: 'Testimonies',
  ctaLabel: 'Read all testimonies',
  ctaHref: '/testimonies',
};

/* ════════════════════════════════════════════════════════════════════
 * TheProof — Home Scene 05
 *
 * Lives AFTER the pinned hero, in the warm half (the page has already
 * transitioned cold→warm by the time the user scrolls here). Two
 * featured testimony billboards (Pattern A — Billboard) with stagger-
 * in-on-scroll choreography and a tail link to /testimonies.
 *
 * Note: this scene runs its own ScrollTrigger — explicitly allowed by
 * the Phase 4b spec (no new ScrollTriggers in the *home runway*; scenes
 * 05–07 sit outside the runway and own their own scroll behavior).
 *
 * Reduced-motion: stagger-in is skipped; cards render in their final
 * state without animation. The TestimonyCard's hover/cross-fade still
 * works because the @media reduced-motion rule in globals.css is
 * already zeroing transitions for all transitions globally — so the
 * card just toggles instantly.
 * ══════════════════════════════════════════════════════════════════ */
export function TheProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const featured = getFeaturedTestimonies().slice(0, 2);

  useGsapContext(
    sectionRef,
    () => {
      if (prefersReducedMotion) return;
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current.querySelectorAll('.testimony-card');
      if (!cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 60,
        rotation: '+=0.6', // amplify the natural tilt as they arrive
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    },
    [prefersReducedMotion]
  );

  // Don't render the section at all if no testimonies are flagged
  // featured. Rules-of-Hooks: this guard sits AFTER the hook call so
  // the hook count is stable across renders.
  if (featured.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      // The home palette transitions to warm via scroll progress in
      // Hero. We force-set the warm theme here as a defensive belt so
      // this section reads as warm even if the user lands deep-linked
      // or scrolls past the runway with reduced motion.
      data-theme="warm"
      className="relative bg-bg py-section"
      aria-label="Testimonies — proof of the work"
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
            {SCENE_05.framing}
          </h2>
        </div>

        {/* Billboards — generous negative space around them */}
        <div
          className={clsx(
            'mt-16 md:mt-24',
            // Asymmetric layout: first card occupies left columns, second
            // sits offset right and slightly lower to keep the eye moving
            'grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-10 md:gap-y-32'
          )}
        >
          {featured.map((t, i) => (
            <div
              key={t.id}
              className={clsx(
                i === 0
                  ? 'md:col-span-7'
                  : 'md:col-span-7 md:col-start-6 md:translate-y-12 lg:translate-y-16'
              )}
            >
              <TestimonyCard testimony={t} index={i} variant="home" />
            </div>
          ))}
        </div>

        {/* Tail link to full testimonies page */}
        <div className="mt-20 md:mt-24">
          <div className="rule-h mb-8" />
          <Link
            href={SCENE_05.ctaHref}
            className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
          >
            <span>{SCENE_05.ctaLabel}</span>
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
