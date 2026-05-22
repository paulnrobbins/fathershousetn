'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '@/lib/gsap-context';
import { usePrefersReducedMotion } from '@/lib/motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { SOCIAL } from '@/data/nav';

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — Scene 07 · THE THRESHOLD FOR YOU
 *
 * Mode 1 maintenance: change the strings/links below to update what
 * reads on the home page. Search for "EDIT HERE:" to jump between
 * blocks.
 *
 * The structure mirrors Scene 02's two-paths invitation, but more
 * intimate — this is the act-now moment. Stand With Us has three
 * tiers of involvement:
 *   primary   — Donate (Zeffy)
 *   secondary — Newsletter (Zeffy newsletter form)
 *   tertiary  — Volunteer (/get-involved page)
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Scene 07 — THE THRESHOLD FOR YOU (final dual CTA)
const SCENE_07 = {
  eyebrow: 'The Threshold For You',
  headline: 'Your turn.',
  framing:
    'Need help? Click Apply Now below or Donate Now to help fund our mission.',
  applicant: {
    audience: 'For the man',
    label: 'Apply now',
    href: '/future-applicants',
    micro: 'Email or call us — we will walk you through the rest.',
  },
  partner: {
    audience: 'For the partner',
    primary: {
      label: 'Donate now',
      href: '/donate-now', // Internal Donate page hosts the Zeffy iframe
      micro: 'A one-time or recurring gift through Zeffy.',
    },
    secondary: {
      label: 'Follow on YouTube',
      href: SOCIAL.youtube,
      external: true,
    },
    tertiary: {
      label: 'Volunteer · partner · host',
      href: '/get-involved',
      external: false,
    },
  },
};

/* ════════════════════════════════════════════════════════════════════
 * ThresholdCTA — Home Scene 07
 *
 * The act-now moment. Sits at the bottom of the home page, inside the
 * warm half. Compositionally:
 *
 *   - A small intimate iron-door SVG icon mirrors the hero's anchor
 *     object — quietly, in brass and bronze, no full Canvas. Idle
 *     "breath" animation on the seam. Pauses on reduced-motion.
 *
 *   - Two CTA columns side-by-side on desktop, stacked on mobile.
 *     Each CTA sits inside a <Magnetic> wrapper for the small pull-on-
 *     approach effect (disabled on touch + reduced-motion).
 *
 *   - The donate CTA, on hover, ticks `--brass-intensity` up via a
 *     GSAP tween — the seam glows brighter. Releases back on leave.
 *
 *   - prefers-reduced-motion: door icon is static, no magnetic field,
 *     no brass bump. The CTA layout and content are identical so
 *     reduced-motion users get full functionality.
 * ══════════════════════════════════════════════════════════════════ */
export function ThresholdCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [donateHover, setDonateHover] = useState(false);

  // ─── Section fade-in on scroll (one-time, ScrollTrigger) ──────────
  useGsapContext(
    sectionRef,
    () => {
      if (prefersReducedMotion) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(sectionRef.current!.querySelectorAll('.threshold-fade'), {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    [prefersReducedMotion]
  );

  // ─── Brass intensity bump on donate hover ─────────────────────────
  // Tween --brass-intensity on the document root so the global brass
  // glow (footer rule, atmospheric tones) brightens with the gesture.
  // Lives in its own effect so toggling hover doesn't tear down or
  // restart the ScrollTrigger above.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    const tween = gsap.to(root, {
      '--brass-intensity': donateHover ? 1.4 : 1.1,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    return () => {
      tween.kill();
    };
  }, [donateHover, prefersReducedMotion]);

  // ─── CSS var lifecycle ────────────────────────────────────────────
  // When the user navigates AWAY from the home page (this component
  // unmounts), reset --brass-intensity so other pages aren't stuck
  // with a leftover bump from a final hover. The Hero owns the
  // home-page lifecycle for this var; this is the warm-side guard.
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--brass-intensity');
    };
  }, []);

  // Idle "breath" on the SVG seam — pure CSS keyframe, opt-in via class
  // gated by reduced-motion.

  return (
    <section
      ref={sectionRef}
      data-theme="warm"
      className="relative bg-bg pb-section pt-24 md:pt-32"
      aria-label="The threshold for you — final invitation"
    >
      <div className="container-edge">
        {/* Editorial composition — door icon left, content right */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
          {/* Iron door icon (small, intimate) */}
          <div className="threshold-fade md:col-span-3">
            <DoorIcon
              animate={!prefersReducedMotion}
              brighter={donateHover}
            />
          </div>

          {/* Headline + framing + CTAs */}
          <div className="md:col-span-9">
            <h2
              className="threshold-fade font-display text-balance text-fg"
              style={{
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
              }}
            >
              {SCENE_07.headline}
            </h2>

            <p
              className="threshold-fade mt-8 max-w-xl text-balance text-body-xl"
              style={{ color: 'var(--fg-muted)' }}
            >
              {SCENE_07.framing}
            </p>

            {/* Two-path CTA grid */}
            <div className="threshold-fade mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-10">
              {/* For the man */}
              <div>
                <Magnetic strength={20} fieldRadius={120}>
                  <Link
                    href={SCENE_07.applicant.href}
                    className={clsx(
                      'group/cta inline-flex items-center justify-between gap-4',
                      'px-7 py-5 min-w-[18rem]',
                      'border border-brass text-brass',
                      'font-mono text-[0.6875rem] uppercase tracking-[0.18em]',
                      'transition-all duration-300',
                      'hover:bg-brass hover:text-bg focus-visible:bg-brass focus-visible:text-bg'
                    )}
                  >
                    <span>{SCENE_07.applicant.label}</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      →
                    </span>
                  </Link>
                </Magnetic>
              </div>

              {/* For the partner — primary + secondary + tertiary */}
              <div>
                <Magnetic
                  strength={22}
                  fieldRadius={140}
                  onActiveChange={setDonateHover}
                >
                  <Link
                    href={SCENE_07.partner.primary.href}
                    className={clsx(
                      'group/cta inline-flex items-center justify-between gap-4',
                      'px-7 py-5 min-w-[18rem]',
                      'bg-brass text-bg border border-brass',
                      'font-mono text-[0.6875rem] uppercase tracking-[0.18em]',
                      'transition-all duration-300',
                      'hover:bg-transparent hover:text-brass focus-visible:bg-transparent focus-visible:text-brass'
                    )}
                    onMouseEnter={() => setDonateHover(true)}
                    onMouseLeave={() => setDonateHover(false)}
                    onFocus={() => setDonateHover(true)}
                    onBlur={() => setDonateHover(false)}
                  >
                    <span>{SCENE_07.partner.primary.label}</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      →
                    </span>
                  </Link>
                </Magnetic>

                {/* Secondary — Newsletter */}
                <div className="mt-8">
                  <a
                    href={SCENE_07.partner.secondary.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                  >
                    <span>{SCENE_07.partner.secondary.label}</span>
                    <span aria-hidden="true" className="ml-1">↗</span>
                  </a>
                </div>

                {/* Tertiary — Volunteer */}
                <div className="mt-3">
                  <Link
                    href={SCENE_07.partner.tertiary.href}
                    className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                  >
                    <span>{SCENE_07.partner.tertiary.label}</span>
                    <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * DoorIcon
 *
 * A small SVG rendition of the iron door — the same anchor object as
 * the hero, but tiny, personal, and presentational. Zero R3F overhead;
 * scales perfectly across viewport sizes via SVG scaling.
 *
 * Composition:
 *   - Outer iron frame (bronze stroke)
 *   - Inner panel slightly ajar (rotated -8° around its left edge)
 *   - Vertical brass seam where the panel meets the frame
 *   - Two horizontal cross-braces on the panel
 *   - A torus-ish handle disk on the swing edge
 *
 * `animate=true` enables an idle breath on the seam (CSS class).
 * `brighter=true` amps the seam opacity — used while donate is hovered.
 * ══════════════════════════════════════════════════════════════════ */

interface DoorIconProps {
  animate: boolean;
  brighter: boolean;
}

function DoorIcon({ animate, brighter }: DoorIconProps) {
  return (
    <svg
      viewBox="0 0 120 200"
      role="img"
      aria-label="A small iron door, slightly ajar, with a brass seam of light"
      className="block w-full max-w-[8rem] md:max-w-[10rem]"
      style={{ overflow: 'visible' }}
    >
      {/* Soft brass halo behind the seam */}
      <defs>
        <radialGradient id="door-icon-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(var(--brass))" stopOpacity="0.5" />
          <stop offset="60%" stopColor="rgb(var(--brass))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="rgb(var(--brass))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="60"
        cy="100"
        rx="55"
        ry="80"
        fill="url(#door-icon-halo)"
        opacity={brighter ? 0.95 : 0.6}
        style={{ transition: 'opacity 0.5s ease-out' }}
      />

      {/* Outer iron frame */}
      <rect
        x="10"
        y="14"
        width="100"
        height="172"
        fill="rgb(var(--bronze))"
        opacity="0.7"
      />
      <rect
        x="14"
        y="18"
        width="92"
        height="164"
        fill="rgb(var(--parchment))"
        opacity="1"
      />

      {/* Inner panel — rotated -8° around its hinge (left edge) so it
          reads as slightly ajar, mirroring the hero door. */}
      <g transform="rotate(-8 16 100)">
        <rect
          x="16"
          y="20"
          width="84"
          height="160"
          fill="rgb(var(--bronze))"
          opacity="0.85"
        />
        {/* Cross-braces */}
        <rect x="20" y="60" width="76" height="3" fill="rgb(var(--bronze))" opacity="0.55" />
        <rect x="20" y="138" width="76" height="3" fill="rgb(var(--bronze))" opacity="0.55" />
        {/* Inset highlight */}
        <rect
          x="20"
          y="24"
          width="76"
          height="152"
          fill="none"
          stroke="rgb(var(--bronze))"
          strokeWidth="0.5"
          opacity="0.35"
        />
        {/* Handle */}
        <circle cx="92" cy="100" r="2.4" fill="rgb(var(--brass))" />
      </g>

      {/* Brass seam — the light leaking through */}
      <rect
        x="14.5"
        y="20"
        width="1.6"
        height="160"
        fill="rgb(var(--brass))"
        opacity={brighter ? 1 : 0.85}
        style={{
          transition: 'opacity 0.5s ease-out',
          filter: `drop-shadow(0 0 ${brighter ? 6 : 3}px rgb(var(--brass)))`,
        }}
        className={animate ? 'door-icon-seam-breath' : undefined}
      />

      {/* Frame rivets — subtle */}
      {[26, 50, 90, 130, 154, 178].map((y) => (
        <circle
          key={`rivet-l-${y}`}
          cx="11.5"
          cy={y}
          r="0.9"
          fill="rgb(var(--bronze))"
          opacity="0.6"
        />
      ))}
      {[26, 50, 90, 130, 154, 178].map((y) => (
        <circle
          key={`rivet-r-${y}`}
          cx="108.5"
          cy={y}
          r="0.9"
          fill="rgb(var(--bronze))"
          opacity="0.6"
        />
      ))}

      <style>{`
        .door-icon-seam-breath {
          animation: door-icon-breath 4.5s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes door-icon-breath {
          0%, 100% { opacity: 0.78; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .door-icon-seam-breath { animation: none; }
        }
      `}</style>
    </svg>
  );
}
