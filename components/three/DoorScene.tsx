'use client';

import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Door } from './Door';
import { BackLight, SeamGlow } from './BrassSeam';
import { DustMotes } from './DustMotes';
import {
  backgroundVertex,
  backgroundFragment,
  ironVertex,
  ironFragment,
} from './shaders';

interface DoorSceneProps {
  /**
   * Ref whose `.current` is the scroll progress (0..1). Mutated externally
   * by the GSAP ScrollTrigger onUpdate callback in Hero. Read each frame
   * here and applied to door rotation, camera, and shader uniforms.
   */
  progressRef: RefObject<number>;
  /** Quality tier for the door geometry + particle count. */
  quality?: 'high' | 'low';
  /** When true, snap to a static state — used for prefers-reduced-motion. */
  reducedMotion?: boolean;
}

/* ────────────────────────────────────────────────────────────────────
 * Choreography map — scroll progress (0..1) to scene state.
 *
 * Tuned to the brief's 7-scene scroll score:
 *   p ≈ 0.00 → door at 5°,  intensity 0.4, cold
 *   p ≈ 0.20 → door at 15°, intensity 0.55, cold
 *   p ≈ 0.45 → door at 45°, intensity 0.85, cold (camera nudges forward)
 *   p ≈ 0.55 → THRESHOLD CROSSING — palette transitions cold → warm
 *   p ≈ 0.75 → door at 90°, intensity 1.3, warm
 *   p ≈ 1.00 → door at 110°, intensity 1.5, warm (door receding)
 *
 * Camera: subtle zoom-in (z 6 → 4.2) starting at p ≈ 0.4. The "passing
 * through" feeling comes from door + brass dominance, not from the
 * camera literally crossing the door's plane (which would frame poorly
 * for the content reading the screen during scroll).
 * ──────────────────────────────────────────────────────────────────── */

// Linear remap with clamp — primitive everyone needs.
function remap(p: number, p0: number, p1: number, v0: number, v1: number) {
  const t = Math.max(0, Math.min(1, (p - p0) / (p1 - p0)));
  return v0 + (v1 - v0) * t;
}

// Smooth easing curve — cubic ease-in-out.
function smoothstep(p: number, p0: number, p1: number) {
  const t = Math.max(0, Math.min(1, (p - p0) / (p1 - p0)));
  return t * t * (3 - 2 * t);
}

export function DoorScene({
  progressRef,
  quality = 'high',
  reducedMotion = false,
}: DoorSceneProps) {
  const hingeRef = useRef<THREE.Group>(null);
  const seamMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const dustMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const bgMaterialRef = useRef<THREE.ShaderMaterial>(null);
  // Iron material is owned by the Door component but exposed via the
  // hinge group. We cache a reference to all shader materials in the
  // door subtree on first frame for uniform updates.
  const ironMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);

  const { camera, size } = useThree();

  // Procedural background plane material — far behind everything.
  const bgMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: backgroundVertex,
        fragmentShader: backgroundFragment,
        uniforms: {
          uTransition: { value: 0 },
          uCold: { value: new THREE.Color(0x0e0f12) },  // steel
          uWarm: { value: new THREE.Color(0x6a4d24) },  // deep brass shadow
          uBrass: { value: new THREE.Color(0x87c5e2) }, // brass
        },
        depthWrite: false,
      }),
    []
  );

  // Stash bgMaterial ref for per-frame updates
  bgMaterialRef.current = bgMaterial;

  useFrame(() => {
    // Responsive camera distance — runs even on reduced-motion so the
    // door fits on portrait viewports regardless of scroll choreography.
    const aspect = size.width / size.height;
    const baseZ =
      aspect < 0.7
        ? 13.0            // very narrow phones
        : aspect < 0.95
          ? 11.0          // most phones
          : aspect < 1.3
            ? 8.5         // tablets / square-ish
            : 6.5;        // desktop landscape

    if (reducedMotion) {
      camera.position.z = baseZ;
      camera.lookAt(0, 0, 0);
      return;
    }

    const p = progressRef.current ?? 0;

    // ─── Door angle: 5° (0.087rad) → 110° (1.92rad), eased ────────
    const angleProgress = smoothstep(p, 0, 1);
    const angle = 0.087 + angleProgress * (1.92 - 0.087);
    if (hingeRef.current) {
      hingeRef.current.rotation.y = -angle; // negative = opens away from camera
    }

    // ─── Brass intensity: 0.4 → 1.5, accelerating past threshold ──
    // First half: gentle rise. Second half: rapid bloom.
    const intensity =
      p < 0.5
        ? 0.4 + smoothstep(p, 0, 0.5) * 0.4   // 0.4 → 0.8
        : 0.8 + smoothstep(p, 0.5, 1.0) * 0.7; // 0.8 → 1.5

    // ─── Background transition (cold → warm) ──────────────────────
    const bgTransition = smoothstep(p, 0.45, 0.85);
    bgMaterial.uniforms.uTransition.value = bgTransition;

    // ─── Iron rim brass (drives shader fresnel tint) ──────────────
    // Walk the hinge group's children once to find materials.
    if (ironMaterialsRef.current.length === 0 && hingeRef.current?.parent) {
      const seen = new Set<THREE.ShaderMaterial>();
      hingeRef.current.parent.traverse((obj) => {
        const m = (obj as THREE.Mesh).material as
          | THREE.ShaderMaterial
          | undefined;
        if (m && (m as unknown as { isShaderMaterial?: boolean }).isShaderMaterial) {
          if (m.uniforms && m.uniforms.uBrassIntensity) {
            seen.add(m);
          }
        }
      });
      ironMaterialsRef.current = Array.from(seen);
    }
    ironMaterialsRef.current.forEach((m) => {
      m.uniforms.uBrassIntensity.value = intensity;
    });

    // ─── Brass seam glow ──────────────────────────────────────────
    if (seamMaterialRef.current) {
      seamMaterialRef.current.uniforms.uIntensity.value = intensity * 1.1;
    }

    // ─── Dust motes visibility ────────────────────────────────────
    if (dustMaterialRef.current) {
      dustMaterialRef.current.uniforms.uIntensity.value =
        Math.min(intensity, 1.2);
    }

    // ─── Camera — scroll-driven zoom forward starting at p=0.4 ───
    // baseZ was computed at the top of useFrame (responsive to aspect).
    const camZ = baseZ - smoothstep(p, 0.4, 1.0) * 1.8;
    camera.position.z = camZ;
    camera.position.y = remap(p, 0.5, 1.0, 0, 0.4);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* ─── Procedural background plane — far behind everything ── */}
      <mesh position={[0, 0, -8]} material={bgMaterial}>
        <planeGeometry args={[40, 30]} />
      </mesh>

      {/* ─── Backlight plane (the warm world behind the door) ───── */}
      <BackLight />

      {/* ─── The door itself (hinge group exposed via ref) ──────── */}
      <Door ref={hingeRef} quality={quality} />

      {/* ─── Soft glow halo around the door ─────────────────────── */}
      <SeamGlow ref={seamMaterialRef} intensity={0.4} />

      {/* ─── Dust motes — quality-tiered count ──────────────────────
          [ART DIRECTION OVERRIDE — Paul, 2026-05]
          The Immersive 3D System's "Refined-with-restraint" tier for
          Father's House warns against ambient particles in the hero.
          Kept here deliberately because the motes function as the
          *physical demonstration* of the brass light beam — not
          decoration. Without them, the brass-light concept reads as
          flat color rather than illumination passing through a real
          atmosphere. The 80/20 rule still holds: motes are quiet
          (low alpha, slow drift) until brass intensity rises near
          the threshold. */}
      {quality === 'high' && (
        <DustMotes
          ref={dustMaterialRef}
          count={140}
          intensity={0.4}
          bounds={[5, 6, 2.5]}
        />
      )}

      {quality === 'low' && (
        <DustMotes
          ref={dustMaterialRef}
          count={20}
          intensity={0.4}
          bounds={[5, 6, 2.5]}
        />
      )}

      {/* ─── Subtle ambient fill — since shaders are unlit, this is
            unused by the iron material. Keeping for any future drei
            components that need it (Phase 4 may add).             */}
    </>
  );
}

// Pre-warm shader compilation on idle to avoid jank on first scroll.
// Three.js compiles shaders lazily; the first scroll tick can stutter.
// Calling renderer.compile() ahead of time eliminates that.
export function precompileDoorShaders(_renderer: THREE.WebGLRenderer) {
  // No-op for now — shaders compile on first frame which happens before
  // user can scroll meaningfully. If we observe jank in testing, we'll
  // wire up an explicit precompile here. Keeping the export for stability.
  void ironVertex;
  void ironFragment;
}
