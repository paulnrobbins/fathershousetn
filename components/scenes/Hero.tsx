'use client';

import { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneStage } from '@/components/three/SceneStage';
import { DoorScene } from '@/components/three/DoorScene';
import { useGsapContext } from '@/lib/gsap-context';
import { usePrefersReducedMotion, useIsLowPowerDevice } from '@/lib/motion';
import { EXTERNAL } from '@/data/nav';

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — Scenes 02 · 03 · 04
 *
 * Mode 1 maintenance: change the strings/links below to update what
 * reads on the home page. Search for "EDIT HERE:" in this file
 * (Cmd+F / Ctrl+F in VSCode) to jump between the four editable blocks.
 *
 * The scroll choreography — door rotation, brass intensity, fade
 * windows, theme transition — is downstream of these constants. Only
 * touch the choreography (further down the file) if you know what
 * you're doing.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Scene 02 — THE INVITATION (mission framing + dual CTAs)
const SCENE_02 = {
  eyebrow: 'The Invitation',
  framing:
    'To welcome men released from jail, offering them a safe and supportive home where they can receive care, guidance, training, drug recovery and the gospel. Our goal is to prepare them to reenter the community as productive citizens, dedicated to living a life that honors God.',
  primaryCta: {
    label: 'Apply now',
    href: '/future-applicants',
    audience: 'For the man',
  },
  secondaryCta: {
    label: 'Donate now',
    href: '/donate-now',
    audience: 'For the partner',
  },
};

// EDIT HERE: Scene 03 — THE NEED (Rhea County drug-arrest data art)
const SCENE_03 = {
  eyebrow: 'The Need',
  context: 'Rhea County · 2021',
  statValue: '1,279.96',
  statLabel: 'Drug arrests per 100,000 residents',
  citation: {
    label: 'Source · Rhea County Arrest Dashboard · ArcGIS',
    href: EXTERNAL.rheaCountyArcgis,
  },
};

// EDIT HERE: Scene 04 — THE WAY (three pillars + 82% sub-figure)
const SCENE_04 = {
  eyebrow: 'The Way',
  framing: 'Christ-centered recovery, real life skills, and the gospel.',
  pillars: [
    {
      number: '01',
      name: 'Recovery',
      copy: 'A structured walk out of substance dependence — beside men who have walked it themselves.',
    },
    {
      number: '02',
      name: 'Discipleship',
      copy: 'Daily life with Christ — scripture, prayer, and accountability inside a brother-led house.',
    },
    {
      number: '03',
      name: 'Life Skills',
      copy: 'Work, finances, family — the practical disciplines that hold a free life in place.',
    },
  ],
  proof: {
    value: '82%',
    label:
      'of men completing the Reformers Unanimous program remain in recovery two years on.',
  },
};

/* ════════════════════════════════════════════════════════════════════
 * SCENE STYLE PRIMITIVES
 * ══════════════════════════════════════════════════════════════════ */

/**
 * CTA_BASE — shared layout/typography for both Scene 02 buttons.
 * CTA_OUTLINE + CTA_FILLED — both rendered as solid-navy buttons with
 *   white (parchment) text inside, per Paul's direction. The previous
 *   filled/outline distinction is collapsed into a single brand-button
 *   treatment because the new navy-on-parchment world doesn't need a
 *   secondary outline variant to read clearly.
 */
const CTA_BASE = clsx(
  'group/cta inline-flex items-center justify-between gap-3 px-5 py-3',
  'font-mono text-[0.6875rem] uppercase tracking-[0.18em]',
  'transition-all duration-300'
);

const CTA_OUTLINE = clsx(
  CTA_BASE,
  'bg-brass text-parchment border border-brass',
  'hover:opacity-85 focus-visible:opacity-85'
);

const CTA_FILLED = clsx(
  CTA_BASE,
  'bg-brass text-parchment border border-brass',
  'hover:opacity-85 focus-visible:opacity-85'
);

/* ════════════════════════════════════════════════════════════════════
 * Hero
 *
 * Scroll-pinned heart of the home page. Wires Scenes 1–4 of the
 * brief's scroll score: door opens, brass intensity rises, body theme
 * transitions cold → warm at progress 0.55.
 *
 * Architecture:
 *   - Section is 400vh tall (100vh on reduced-motion) — scroll runway
 *   - Inner sticky div pins to viewport during the runway
 *   - SceneStage (R3F Canvas) absolutely positioned within sticky parent
 *   - Overlay content blocks fade in/out per progress window
 *   - Progress lives in a ref (no React re-renders per scroll tick)
 *
 * Reduced-motion path:
 *   - The pinned scene compresses to a single static viewport showing
 *     Scene 1 (the door + the hero copy)
 *   - <ReducedMotionStack /> renders below the pinned section, exposing
 *     Scenes 02 · 03 · 04 as a stacked accessible column so users with
 *     prefers-reduced-motion still receive full content access per the
 *     brief's accessibility commitment
 *
 * Cleanup contract:
 *   - GSAP ScrollTrigger: lifecycled via useGsapContext (auto-reverted
 *     when this component unmounts)
 *   - CSS vars on documentElement: lifecycled via a dedicated useEffect
 *     so they reset to defaults when leaving the home page
 * ══════════════════════════════════════════════════════════════════ */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPower = useIsLowPowerDevice();
  const quality = isLowPower ? 'low' : 'high';

  // ─── ScrollTrigger lifecycle (GSAP-managed) ───────────────────
  useGsapContext(
    heroRef,
    () => {
      if (prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      const root = document.documentElement;

      ScrollTrigger.create({
        trigger: heroRef.current!,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          // Brass intensity — dual-rate: gentle 0–0.5, accelerated past
          const intensity =
            p < 0.5
              ? 0.4 + smoothstep(p, 0, 0.5) * 0.4   // 0.4 → 0.8
              : 0.8 + smoothstep(p, 0.5, 1.0) * 0.7; // 0.8 → 1.5
          root.style.setProperty('--brass-intensity', String(intensity));

          // Theme switch with hysteresis-style threshold (single value
          // is fine here because scrub is smooth)
          const next = p > 0.55 ? 'warm' : 'cold';
          if (document.body.dataset.theme !== next) {
            document.body.dataset.theme = next;
          }

          // Per-scene opacity windows
          root.style.setProperty(
            '--scene-1',
            String(1 - smoothstep(p, 0.10, 0.20))
          );
          root.style.setProperty(
            '--scene-2',
            String(
              smoothstep(p, 0.18, 0.26) *
                (1 - smoothstep(p, 0.40, 0.48))
            )
          );
          root.style.setProperty(
            '--scene-3',
            String(
              smoothstep(p, 0.48, 0.56) *
                (1 - smoothstep(p, 0.74, 0.82))
            )
          );
          root.style.setProperty(
            '--scene-4',
            String(smoothstep(p, 0.82, 0.92))
          );

          // Pointer-events flag per scene (string '1' or '0' read by CSS).
          // CSS-side: `pointer-events: var(--scene-1-events, none)`.
          root.style.setProperty(
            '--scene-1-events',
            p < 0.18 ? 'auto' : 'none'
          );
          root.style.setProperty(
            '--scene-2-events',
            p > 0.20 && p < 0.46 ? 'auto' : 'none'
          );
          root.style.setProperty(
            '--scene-3-events',
            p > 0.50 && p < 0.80 ? 'auto' : 'none'
          );
          root.style.setProperty(
            '--scene-4-events',
            p > 0.84 ? 'auto' : 'none'
          );
        },
      });

      // Initial paint — set all scene vars to their values at scroll
      // position 0 so the hero text is visible on page load instead of
      // waiting for the user to scroll before ScrollTrigger fires its
      // first onUpdate. Without this, scene-1 falls back to its
      // var-default of 0 and the eyebrow + mission line are invisible
      // until the first wheel/touch input.
      root.style.setProperty('--scene-1', '1');
      root.style.setProperty('--scene-2', '0');
      root.style.setProperty('--scene-3', '0');
      root.style.setProperty('--scene-4', '0');
      root.style.setProperty('--scene-1-events', 'auto');
      root.style.setProperty('--scene-2-events', 'none');
      root.style.setProperty('--scene-3-events', 'none');
      root.style.setProperty('--scene-4-events', 'none');
      root.style.setProperty('--brass-intensity', '0.4');
    },
    [prefersReducedMotion]
  );

  // ─── CSS var lifecycle (manual) ───────────────────────────────
  // Resets when the user navigates away from the home page so other
  // pages aren't bleeding leftover state from a partial scroll.
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.style.removeProperty('--brass-intensity');
      root.style.removeProperty('--scene-1');
      root.style.removeProperty('--scene-2');
      root.style.removeProperty('--scene-3');
      root.style.removeProperty('--scene-4');
      root.style.removeProperty('--scene-1-events');
      root.style.removeProperty('--scene-2-events');
      root.style.removeProperty('--scene-3-events');
      root.style.removeProperty('--scene-4-events');
    };
  }, []);

  // ─── Reduced-motion: snap to a sane static state ──────────────
  useEffect(() => {
    if (!prefersReducedMotion) return;
    const root = document.documentElement;
    root.style.setProperty('--brass-intensity', '0.6');
    root.style.setProperty('--scene-1', '1');
    root.style.setProperty('--scene-2', '0');
    root.style.setProperty('--scene-3', '0');
    root.style.setProperty('--scene-4', '0');
    root.style.setProperty('--scene-1-events', 'auto');
  }, [prefersReducedMotion]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative"
        style={{
          // Scroll runway. Reduced motion collapses to one viewport so
          // there's no dead 4-screen scroll region.
          // Same 300vh runway for desktop and mobile so all 4 scenes
          // get equal scroll dwell time. The previous mobile-only 200vh
          // compression caused scene 4 to get skipped on mobile Safari
          // when the URL bar showed/hid mid-scroll.
          height: prefersReducedMotion ? '100vh' : '300vh',
        }}
        aria-label="From prison to purpose — site introduction"
      >
        <div className="sticky top-0 h-hero w-full overflow-hidden">
          {/* 3D canvas — absolutely positioned within sticky parent so it
              unmounts naturally when Hero leaves the DOM */}
          <SceneStage position="absolute" quality={quality}>
            <DoorScene
              progressRef={progressRef}
              quality={quality}
              reducedMotion={prefersReducedMotion}
            />
          </SceneStage>

          {/* Overlay content layer */}
          <div className="container-edge relative z-10 flex h-full flex-col justify-end pb-20 md:pb-32">
            <SceneBlock cssVar="--scene-1" eyebrow="Welcome">
              <h1 className="font-display text-display-md text-balance text-fg">
                From prison to purpose.
              </h1>
              <p
                className="font-mono mt-12 text-[0.6875rem] uppercase tracking-[0.18em]"
                style={{ color: 'var(--fg-quiet)' }}
                aria-hidden="true"
              >
                ↓ Scroll
              </p>
            </SceneBlock>

            <SceneBlock cssVar="--scene-2" eyebrow={SCENE_02.eyebrow}>
              <Scene02Invitation />
            </SceneBlock>

            <SceneBlock cssVar="--scene-3" eyebrow={SCENE_03.eyebrow}>
              <Scene03TheNeed />
            </SceneBlock>

            <SceneBlock cssVar="--scene-4" eyebrow={SCENE_04.eyebrow}>
              <Scene04TheWay />
            </SceneBlock>
          </div>
        </div>
      </section>

      {/* Reduced-motion accessibility path. Renders Scenes 02·03·04 as
          a stacked editorial column below the static hero. Visible only
          when prefers-reduced-motion is active — normal users get the
          scroll-pinned choreography above. */}
      {prefersReducedMotion && <ReducedMotionStack />}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * SCENE CONTENT COMPONENTS
 *
 * Each scene's content is rendered through a small dedicated component
 * so the same JSX can be consumed by both the scroll-pinned SceneBlock
 * (above) and the ReducedMotionStack (below). Single source of truth
 * means Paul edits once and both code paths update.
 * ══════════════════════════════════════════════════════════════════ */

/* ─── Scene 02 — THE INVITATION ─────────────────────────────────── */
function Scene02Invitation() {
  return (
    <>
      <p
        className="font-display-soft text-balance"
        style={{
          fontSize: 'clamp(1.25rem, 3.4vw, 2.5rem)',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          maxWidth: '38rem',
        }}
      >
        {SCENE_02.framing}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
        <Link
          href={SCENE_02.primaryCta.href}
          className={clsx(CTA_OUTLINE, 'w-full sm:w-auto sm:min-w-[15rem]')}
        >
          <span>{SCENE_02.primaryCta.label}</span>
          <span aria-hidden="true" className="text-base leading-none">→</span>
        </Link>

        <Link
          href={SCENE_02.secondaryCta.href}
          className={clsx(CTA_FILLED, 'w-full sm:w-auto sm:min-w-[15rem]')}
        >
          <span>{SCENE_02.secondaryCta.label}</span>
          <span aria-hidden="true" className="text-base leading-none">→</span>
        </Link>
      </div>
    </>
  );
}

/* ─── Scene 03 — THE NEED ───────────────────────────────────────── */
function Scene03TheNeed() {
  return (
    <>
      <h2
        className="font-display text-balance text-fg"
        style={{
          fontSize: 'clamp(3.5rem, 11vw, 8rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
        }}
      >
        {SCENE_03.statValue}
      </h2>

      <p
        className="font-mono mt-3 text-[0.6875rem] uppercase tracking-[0.18em]"
        style={{ color: 'var(--fg-muted)' }}
      >
        {SCENE_03.statLabel}
      </p>

      <DotGrid />

      <a
        href={SCENE_03.citation.href}
        target="_blank"
        rel="noreferrer noopener"
        className="micro-label mt-5 inline-flex items-baseline gap-2 transition-colors duration-300 hover:text-brass focus-visible:text-brass"
      >
        <span>{SCENE_03.citation.label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}

/* ─── Scene 04 — THE WAY ────────────────────────────────────────── */
function Scene04TheWay() {
  return (
    <>
      <p
        className="font-display-soft text-balance"
        style={{
          fontSize: 'clamp(1.5rem, 3.6vw, 2.5rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'rgb(var(--parchment))',
          textShadow:
            '0 2px 14px rgb(14 15 18 / 0.85), 0 1px 3px rgb(14 15 18 / 0.95)',
          maxWidth: '46rem',
        }}
      >
        {SCENE_04.framing}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 md:mt-10 md:gap-10">
        {SCENE_04.pillars.map((pillar) => (
          <div key={pillar.number} className="flex flex-col">
            <h3
              className="font-display text-fg"
              style={{
                fontSize: 'clamp(1.5rem, 2.4vw, 1.875rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {pillar.name}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed text-balance"
              style={{ color: 'var(--fg-muted)' }}
            >
              {pillar.copy}
            </p>
          </div>
        ))}
      </div>

      {/* 82% sub-figure — by the numbers, not the hero of the scene */}
      <div className="rule-h mt-8 md:mt-10" />
      <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2 md:mt-6">
        <span
          className="font-display text-fg"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {SCENE_04.proof.value}
        </span>
        <p
          className="font-mono max-w-md text-[0.6875rem] uppercase tracking-[0.18em] leading-relaxed"
          style={{ color: 'var(--fg-muted)' }}
        >
          {SCENE_04.proof.label}
        </p>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * DOT GRID — Scene 03 data art
 *
 * 16 × 8 = 128 brass dots. Each dot ≈ 10 arrests (128 × 10 ≈ 1,280 ≈
 * the 1,279.96 stat). Each dot's opacity ties to --brass-intensity so
 * the field glows brighter as scroll progresses through the scene.
 *
 * Per-dot deterministic variance (0.7..1.0 multiplier) keeps the field
 * feeling alive without animation — no individual dot animation, no
 * additional ScrollTriggers. The parent SceneBlock's --scene-3 var
 * still drives the overall fade window.
 * ══════════════════════════════════════════════════════════════════ */
function DotGrid() {
  // Memoize the per-dot variance so we don't recompute 128 sin() calls
  // on every render. Deterministic — same dots glow brighter every
  // visit, which keeps the data-art feel stable.
  const dots = useMemo(() => {
    return Array.from({ length: 128 }, (_, i) => {
      const seed = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
      const frac = seed - Math.floor(seed); // 0..1
      const dotMul = 0.7 + frac * 0.3;       // 0.70..1.00
      return dotMul;
    });
  }, []);

  return (
    <div
      className="mt-6"
      role="img"
      aria-label="Grid of 128 dots, each representing approximately ten drug arrests in Rhea County in 2021"
    >
      <div
        className="dot-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, clamp(0.4375rem, 0.85vw, 0.625rem))',
          gap: 'clamp(0.3125rem, 0.7vw, 0.5rem)',
          width: 'fit-content',
        }}
        aria-hidden="true"
      >
        {dots.map((dotMul, i) => (
          <span
            key={i}
            className="block rounded-full bg-parchment"
            style={{
              aspectRatio: '1 / 1',
              // brass-intensity drives the glow; per-dot multiplier
              // adds quiet variance so the field looks alive
              opacity: `calc((0.35 + var(--brass-intensity, 0.4) * 0.5) * ${dotMul.toFixed(3)})`,
              transition: 'opacity 200ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * REDUCED-MOTION STACK
 *
 * Accessibility companion to the scroll-pinned hero. When the user
 * has `prefers-reduced-motion: reduce` set:
 *   - The scroll runway collapses to 100vh (Scene 1 only)
 *   - The CSS vars driving Scene 02·03·04 fade windows are pinned to 0
 *
 * That alone would hide all program content from reduced-motion users —
 * which violates the brief's accessibility commitment ("full content
 * access"). This component renders the same Scene 02·03·04 content as
 * a stacked editorial column below the static hero, ensuring nothing
 * is gated behind the choreography.
 *
 * Single source of truth: same SCENE_02·03·04 constants and same
 * Scene*Component renderers as the choreographed path above. Edit the
 * copy once at the top of this file and both paths update.
 * ══════════════════════════════════════════════════════════════════ */
function ReducedMotionStack() {
  return (
    <div
      className="reduced-motion-stack relative bg-bg"
      // Force cold theme tokens for the stacked path — without scroll
      // there is no theme transition, and Scene content was designed
      // to read against the cold palette.
      data-theme="cold"
    >
      <div className="container-edge py-section space-y-24 md:space-y-32">
        <ReducedMotionSection eyebrow={SCENE_02.eyebrow}>
          <Scene02Invitation />
        </ReducedMotionSection>

        <ReducedMotionSection eyebrow={SCENE_03.eyebrow}>
          <Scene03TheNeed />
        </ReducedMotionSection>

        <ReducedMotionSection eyebrow={SCENE_04.eyebrow}>
          <Scene04TheWay />
        </ReducedMotionSection>
      </div>
    </div>
  );
}

interface ReducedMotionSectionProps {
  eyebrow: string;
  children: React.ReactNode;
}

function ReducedMotionSection({ children }: ReducedMotionSectionProps) {
  return (
    <section>
      {children}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * HELPERS + SCENEBLOCK
 * ══════════════════════════════════════════════════════════════════ */

function smoothstep(p: number, p0: number, p1: number) {
  const t = Math.max(0, Math.min(1, (p - p0) / (p1 - p0)));
  return t * t * (3 - 2 * t);
}

interface SceneBlockProps {
  /** CSS variable name driving this block's opacity (e.g., "--scene-1"). */
  cssVar: string;
  eyebrow: string;
  children: React.ReactNode;
}

/**
 * SceneBlock — absolutely positioned overlay block. Opacity and
 * pointer-events are driven by paired CSS vars (set per-scroll-tick
 * by the Hero ScrollTrigger). When faded, pointer-events go to 'none'
 * so faded blocks don't capture clicks.
 *
 * Layout: pinned top + bottom so the block sits between the nav and
 * the bottom edge — content can't slide behind the nav on tall scenes.
 * `flex flex-col justify-end` keeps content bottom-anchored within the
 * available space (matches the original `bottom-20` look on short
 * scenes, while protecting the nav clearance on tall ones).
 *
 * Readability backdrop: a soft dark gradient sits behind every scene
 * block so headline text remains legible even when the 3D scene's
 * background gradient has fully warmed to brass-yellow on Scenes 03/04.
 * Faded in with the block via the same opacity var.
 */
function SceneBlock({ cssVar, eyebrow, children }: SceneBlockProps) {
  return (
    <div
      className="absolute inset-x-0 top-20 md:top-24 bottom-20 md:bottom-32 flex flex-col justify-end"
      style={{
        opacity: `var(${cssVar}, 0)`,
        pointerEvents: `var(${cssVar}-events, none)` as React.CSSProperties['pointerEvents'],
        // Force cold-side text colors regardless of body theme. Because
        // the body's data-theme transitions warm mid-scroll, scenes
        // sitting past the threshold would otherwise render bronze text
        // against our dark readability backdrop — invisible. Locking the
        // tokens here keeps the pinned hero readable end to end.
        ['--fg' as string]: 'var(--parchment)',
        ['--fg-muted' as string]: 'rgb(var(--parchment) / 0.78)',
        ['--fg-quiet' as string]: 'rgb(var(--parchment) / 0.48)',
        ['--rule' as string]: 'rgb(var(--parchment) / 0.18)',
        ['--rule-strong' as string]: 'rgb(var(--parchment) / 0.32)',
      }}
    >
      {/* Readability backdrop — soft dark layered overlay behind scene
          content. Scene 04 ("The Way") in particular has three pillar
          columns spread across the full width, so a centered radial
          isn't enough — we layer a near-full-width darkening over a
          radial center bloom. Especially important once the 3D scene's
          background has warmed to brass-yellow on Scenes 03/04. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(14 15 18 / 0.4) 0%, rgb(14 15 18 / 0.62) 30%, rgb(14 15 18 / 0.72) 70%, rgb(14 15 18 / 0.55) 100%), radial-gradient(ellipse at 30% 60%, rgb(14 15 18 / 0.45) 0%, rgb(14 15 18 / 0.15) 60%, rgb(14 15 18 / 0) 100%)',
        }}
      />
      <div className="container-edge relative">
        {children}
      </div>
    </div>
  );
}
