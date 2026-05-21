'use client';

import { useEffect, useRef, type DependencyList, type RefObject } from 'react';
import { gsap } from 'gsap';

/**
 * useGsapContext
 *
 * Wraps GSAP's `gsap.context()` so scene-level animations get
 * auto-reverted on unmount or dependency change. Every Phase 4 scene
 * uses this; it's the canonical pattern for GSAP inside React.
 *
 * Usage:
 *   const ref = useRef<HTMLElement>(null);
 *   useGsapContext(ref, () => {
 *     gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1 });
 *     ScrollTrigger.create({ trigger: '.hero', ... });
 *   }, []);
 */
export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  setup: () => void,
  deps: DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    ctxRef.current = gsap.context(setup, scopeRef.current);
    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
