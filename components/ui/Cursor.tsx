'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion, useIsTouchDevice } from '@/lib/motion';

/* ────────────────────────────────────────────────────────────────────
 * Cursor — Phase 5 polish
 *
 * A custom cursor lifted from award-winning Threshold-Cinema-adjacent
 * sites. It enacts two of the brief's principles:
 *
 *   (1) "the brass is the constant light" — the cursor is brass
 *   (2) "type as architecture" — the cursor lifts the editorial mode
 *
 * Behavior:
 *   - Two layers: a 6px brass dot (the precise pointer) + a 36px
 *     hairline ring that lerps softly behind it (the tail of a
 *     thrown rope). gsap.quickTo handles the lerp at 60fps.
 *   - On hover-over interactive elements (a, button, summary, role=
 *     button, [data-magnetic]), the ring scales up and the dot dims.
 *     Provides a tactile target reading without resorting to OS
 *     hover styles.
 *   - On mousedown, both layers shrink for the tap-feedback beat.
 *
 * Activation contract:
 *   The cursor is gated behind <body data-cursor="custom">. This
 *   component sets that attribute on mount when:
 *     - prefers-reduced-motion is FALSE
 *     - device has fine pointer + hover (not a touch device)
 *     - viewport is >= 1024px (don't override touch laptops)
 *   ...and unsets it on unmount or when any of those become true.
 *
 *   The opt-in is intentional. The brief says "Custom cursor + magnetic
 *   CTA" — both are Phase 5 polish, both off by default for
 *   accessibility, both enabled here for users who can use them.
 *
 * Cleanup: removes <body data-cursor>, kills tweens, nulls listeners.
 * ──────────────────────────────────────────────────────────────────── */

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  // ─── Decide whether to show the custom cursor ─────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const evaluate = () => {
      const wide = window.innerWidth >= 1024;
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setEnabled(wide && fine && !isTouch && !prefersReducedMotion);
    };
    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [isTouch, prefersReducedMotion]);

  // ─── Apply / remove the activation attribute on <body> ────────────
  useEffect(() => {
    if (enabled) {
      document.body.dataset.cursor = 'custom';
    } else {
      delete document.body.dataset.cursor;
    }
    return () => {
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  // ─── Wire the lerp + interactivity ────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Position dot at the actual cursor each frame (no smoothing — the
    // dot is the truth). The ring lerps softly behind via quickTo.
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const ringScale = gsap.quickTo(ring, 'scale', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const dotScale = gsap.quickTo(dot, 'scale', {
      duration: 0.25,
      ease: 'power3.out',
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isPressed = false;
    let isOverInteractive = false;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
      ringX(mouseX);
      ringY(mouseY);
    };

    const updateScale = () => {
      const ringTarget = isPressed ? 0.5 : isOverInteractive ? 1.7 : 1;
      const dotTarget = isPressed ? 0.6 : isOverInteractive ? 0.5 : 1;
      ringScale(ringTarget);
      dotScale(dotTarget);
    };

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      // Walk up to find an interactive ancestor — handles cases where
      // the user hovers an icon inside a <button> or a <span> inside <a>
      const hit = target.closest(
        'a, button, [role="button"], summary, label, input, textarea, select, [data-magnetic]'
      );
      return Boolean(hit);
    };

    const onOver = (e: PointerEvent) => {
      isOverInteractive = isInteractive(e.target);
      updateScale();
    };

    const onDown = () => {
      isPressed = true;
      updateScale();
    };
    const onUp = () => {
      isPressed = false;
      updateScale();
    };

    const onLeave = () => {
      // When pointer leaves the window entirely, hide
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    // Initial position centered + visible
    setDotX(mouseX);
    setDotY(mouseY);
    gsap.set(ring, { x: mouseX, y: mouseY });
    gsap.set([dot, ring], { opacity: 1 });

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="cursor-layer pointer-events-none fixed inset-0"
      style={{ zIndex: 'var(--z-cursor)' }}
    >
      <div
        ref={ringRef}
        className="cursor-ring absolute left-0 top-0"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          border: '1px solid rgb(var(--brass))',
          borderRadius: '9999px',
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot absolute left-0 top-0"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          backgroundColor: 'rgb(var(--brass))',
          borderRadius: '9999px',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
