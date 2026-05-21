'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion, useIsTouchDevice } from '@/lib/motion';

/* ────────────────────────────────────────────────────────────────────
 * Magnetic
 *
 * Wraps a single child element and adds the small magnetic-pull effect
 * that lifts award-quality CTAs out of static buttons. Implementation
 * notes:
 *
 *   - Uses gsap.quickTo for cheap per-frame interpolation; no JS
 *     animation lib added beyond what Hero already imports
 *   - Disabled on touch devices (no hover) and on prefers-reduced-motion
 *   - Listens on a wider invisible "field" element so the pull starts
 *     before the cursor hits the button — the signature feel
 *
 * Usage:
 *   <Magnetic>
 *     <Link href="/donate-now" className="...">Donate</Link>
 *   </Magnetic>
 *
 * The wrapped child receives no extra props — it just sits inside the
 * field. Layout-wise, Magnetic renders as an inline-block so it doesn't
 * disrupt flex/grid layouts of CTA rows.
 * ──────────────────────────────────────────────────────────────────── */

interface MagneticProps {
  children: ReactNode;
  /** How far from the button the field starts pulling (px). */
  fieldRadius?: number;
  /** Maximum displacement at field edge (px). */
  strength?: number;
  /** Optional callback fired when the magnetic field is entered/left. */
  onActiveChange?: (active: boolean) => void;
  className?: string;
}

export function Magnetic({
  children,
  fieldRadius = 110,
  strength = 18,
  onActiveChange,
  className,
}: MagneticProps) {
  const fieldRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const field = fieldRef.current;
    const target = targetRef.current;
    if (!field || !target) return;
    if (prefersReducedMotion || isTouch) {
      // Reset any leftover transforms and skip wiring
      gsap.set(target, { x: 0, y: 0 });
      return;
    }

    const xTo = gsap.quickTo(target, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(target, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    });

    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxRadius = fieldRadius + Math.max(rect.width, rect.height) / 2;

      if (dist < maxRadius) {
        if (!active) {
          active = true;
          onActiveChange?.(true);
        }
        // Normalized falloff (1 at center → 0 at field edge)
        const falloff = 1 - dist / maxRadius;
        xTo(dx * 0.35 * falloff * (strength / 18));
        yTo(dy * 0.35 * falloff * (strength / 18));
      } else if (active) {
        active = false;
        onActiveChange?.(false);
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      if (active) {
        active = false;
        onActiveChange?.(false);
      }
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      onActiveChange?.(false);
    };
  }, [prefersReducedMotion, isTouch, fieldRadius, strength, onActiveChange]);

  return (
    <span ref={fieldRef} className={className} style={{ display: 'inline-block' }}>
      <span
        ref={targetRef}
        style={{
          display: 'inline-block',
          willChange: prefersReducedMotion ? undefined : 'transform',
        }}
      >
        {children}
      </span>
    </span>
  );
}
