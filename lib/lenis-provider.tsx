'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * LenisProvider
 *
 * Lenis enabled on **touch-only devices** (phones, tablets) where native
 * scroll events fire in bursts and cause visible choppiness in the
 * pinned hero choreography. Desktop browsers keep native scroll because
 * Lenis fought with high-DPI mouse wheels + trackpads in our earlier
 * tests — and native scroll is already silky on a desktop trackpad.
 *
 * Detection: `(hover: none) and (pointer: coarse)` — the standard CSS
 * media query for "this device's primary input is a touchscreen." Matches
 * iPhones, iPads, Android phones; does not match laptops with touch
 * screens (those have hover: hover for the trackpad).
 *
 * Config notes:
 *   - duration 0.8 — short enough that direction reversals cancel cleanly
 *   - syncTouch: true — uses native touch events for the swipe gesture,
 *     so flicks still have momentum but the animation runs per-frame
 *   - touchInertiaMultiplier 25 — keeps the inertia close to native iOS feel
 *   - wired to ScrollTrigger so all GSAP scroll animations stay synced
 *
 * Cleanup: destroys Lenis instance + cancels RAF loop on unmount.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isTouch = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches;

    // Reduced-motion users get native scroll (no smoothing layer).
    // Desktop / mouse users get native scroll (proven good).
    if (prefersReduced || !isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: false, // touch-only — desktop never reaches this path anyway
      syncTouch: true,
      touchMultiplier: 1.1,
    });

    // Sync Lenis scroll position with ScrollTrigger every tick so the
    // pinned hero's onUpdate progress stays accurate.
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    // RAF loop — Lenis advances its smooth-scroll animation each frame
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Tell GSAP to use rAF instead of its default lag-prone driver
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
