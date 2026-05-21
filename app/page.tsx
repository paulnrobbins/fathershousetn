import type { Metadata } from 'next';
import { Hero } from '@/components/scenes/Hero';
import { TheProof } from '@/components/scenes/TheProof';
import { TheLife } from '@/components/scenes/TheLife';
import { ThresholdCTA } from '@/components/scenes/ThresholdCTA';

export const metadata: Metadata = {
  title: "Our Father's House — From Prison to Purpose",
  description:
    'A Christ-centered recovery home for men released from jail in Rhea County, Tennessee. Welcome, dignity, hope made tangible, redemption made real.',
};

/**
 * Home — Phase 4b complete.
 *
 * Scroll score (Phase 1 brief, Section 4):
 *
 *   Hero          — Scenes 1–4. Pinned 400vh runway. The iron door
 *                   opens, brass intensity rises, palette transitions
 *                   cold → warm at progress 0.55. Owns the choreography.
 *   TheProof      — Scene 05. Testimony billboards (Pattern A). Past
 *                   the threshold, in the warm half.
 *   TheLife       — Scene 06. Upcoming events + photo grid (Pattern A
 *                   billboards). Warm.
 *   ThresholdCTA  — Scene 07. Final dual-path CTA. Magnetic hover.
 *                   Donate hover bumps --brass-intensity. Warm.
 *
 * Scenes 05–07 sit AFTER the pinned hero and run their own ScrollTrigger
 * choreography — explicitly allowed by the Phase 4b spec (the "no new
 * ScrollTriggers" discipline applies to the home runway only).
 *
 * Reduced-motion: each scene short-circuits its stagger and renders
 * its content in the final state. Hero exposes the same content via
 * its ReducedMotionStack below the static hero panel.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProof />
      <TheLife />
      <ThresholdCTA />
    </>
  );
}
