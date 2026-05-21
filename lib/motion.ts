'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true if the user prefers reduced motion. Reactive to changes.
 * Defaults to false on SSR.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}

/**
 * Conservative low-power detection for the mobile reduced-quality variant.
 * Returns true if the device is likely to struggle with the full 3D scene.
 *
 * Heuristic combines:
 *  - small viewport (likely mobile)
 *  - low device memory (when reported)
 *  - low hardware concurrency (CPU cores)
 */
export function useIsLowPowerDevice(): boolean {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const smallViewport = window.innerWidth < 768;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };

    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
    const lowCores =
      typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;

    setIsLowPower(smallViewport || lowMemory || lowCores);
  }, []);

  return isLowPower;
}

/**
 * Touch-device check. Used by the custom cursor (Phase 5) to opt out
 * on phones and tablets where a custom cursor makes no sense.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  return isTouch;
}
