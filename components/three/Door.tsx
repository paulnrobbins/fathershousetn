'use client';

import { useMemo, forwardRef } from 'react';
import * as THREE from 'three';
import { ironVertex, ironFragment } from './shaders';

/**
 * Iron material — single source of truth for the door's look.
 * Uniforms:
 *   uBrassIntensity: 0..~1.5, drives rim bloom (scroll-driven)
 *   uIronDark / uIronMid: base + highlight tones
 *   uBrass: the constant warm color leaking through
 */
function createIronMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: ironVertex,
    fragmentShader: ironFragment,
    side: THREE.DoubleSide, // door rotates to 110° — the camera sees the back face
    uniforms: {
      uBrassIntensity: { value: 0.4 },
      // Hex values from the brief, normalized to linear floats
      uIronDark: { value: new THREE.Color(0x18161a) },  // near-black bronze
      uIronMid:  { value: new THREE.Color(0x3a342e) },  // slightly warmer mid
      uBrass:    { value: new THREE.Color(0x87c5e2) },  // brass — the constant
    },
  });
}

interface DoorProps {
  /** Quality tier — 'high' for desktop, 'low' for mobile/low-power. */
  quality?: 'high' | 'low';
}

/**
 * Door
 *
 * The anchor object. A heavy iron door composed of:
 *   - Frame (top + two sides) — non-moving structural surround
 *   - Panel — single inset slab, the moving piece
 *   - Cross-bracing — two horizontal iron bars on the panel
 *   - Rivets — instanced spheres for tactile detail
 *   - Handle — torus on the swing edge
 *
 * The hinge is on the LEFT side of the panel. The exported ref points
 * to the hinge group so the parent (DoorScene) can rotate it directly
 * via useFrame — scroll progress maps 0..1 onto rotationY: 0.087rad
 * (5°) → 1.92rad (110°).
 *
 * All geometry is BoxGeometry / SphereGeometry / TorusGeometry — no
 * external GLB. Total tri count is well under 5,000 even at 'high'.
 */
export const Door = forwardRef<THREE.Group, DoorProps>(function Door(
  { quality = 'high' },
  hingeRef
) {
  // Single shared material instance for the whole door — saves draw calls.
  const ironMaterial = useMemo(() => createIronMaterial(), []);

  // Frame dimensions
  const FRAME_W = 4.2;
  const FRAME_H = 7.2;
  const FRAME_THICK = 0.4;
  const FRAME_DEPTH = 0.5;

  // Panel dimensions — slightly inset from frame opening
  const PANEL_W = 3.4;
  const PANEL_H = 6.6;
  const PANEL_DEPTH = 0.22;

  // Hinge axis — left edge of panel (panel pivots around its left side)
  const HINGE_X = -FRAME_W / 2 + FRAME_THICK / 2;

  // Rivets — grid count adjusts with quality
  const rivetCount = quality === 'high' ? { x: 4, y: 7 } : { x: 3, y: 5 };

  // Pre-compute rivet positions on the panel front face
  const rivetMatrices = useMemo(() => {
    const positions: [number, number, number][] = [];
    const padX = PANEL_W * 0.08;
    const padY = PANEL_H * 0.06;
    const usableW = PANEL_W - padX * 2;
    const usableH = PANEL_H - padY * 2;
    for (let i = 0; i < rivetCount.x; i++) {
      for (let j = 0; j < rivetCount.y; j++) {
        const x = -PANEL_W / 2 + padX + (usableW * i) / (rivetCount.x - 1);
        const y = -PANEL_H / 2 + padY + (usableH * j) / (rivetCount.y - 1);
        const z = PANEL_DEPTH / 2 + 0.04;
        positions.push([x, y, z]);
      }
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  return (
    <group>
      {/* ─── FRAME — non-moving ─────────────────────────────────── */}
      <group>
        {/* Top header */}
        <mesh
          position={[0, FRAME_H / 2 - FRAME_THICK / 2, 0]}
          material={ironMaterial}
        >
          <boxGeometry args={[FRAME_W, FRAME_THICK, FRAME_DEPTH]} />
        </mesh>
        {/* Left jamb */}
        <mesh
          position={[-FRAME_W / 2 + FRAME_THICK / 2, 0, 0]}
          material={ironMaterial}
        >
          <boxGeometry args={[FRAME_THICK, FRAME_H, FRAME_DEPTH]} />
        </mesh>
        {/* Right jamb */}
        <mesh
          position={[FRAME_W / 2 - FRAME_THICK / 2, 0, 0]}
          material={ironMaterial}
        >
          <boxGeometry args={[FRAME_THICK, FRAME_H, FRAME_DEPTH]} />
        </mesh>
      </group>

      {/* ─── HINGE GROUP — the swinging door (forwarded ref) ─────── */}
      <group ref={hingeRef} position={[HINGE_X, 0, 0]}>
        {/* The panel itself — offset right so its LEFT edge sits at the hinge */}
        <group position={[PANEL_W / 2, 0, 0]}>
          {/* Door panel slab */}
          <mesh material={ironMaterial}>
            <boxGeometry args={[PANEL_W, PANEL_H, PANEL_DEPTH]} />
          </mesh>

          {/* Cross-bracing — upper */}
          <mesh
            position={[0, PANEL_H / 2 - PANEL_H * 0.22, PANEL_DEPTH / 2 + 0.03]}
            material={ironMaterial}
          >
            <boxGeometry args={[PANEL_W * 0.92, 0.18, 0.06]} />
          </mesh>
          {/* Cross-bracing — lower */}
          <mesh
            position={[0, -PANEL_H / 2 + PANEL_H * 0.22, PANEL_DEPTH / 2 + 0.03]}
            material={ironMaterial}
          >
            <boxGeometry args={[PANEL_W * 0.92, 0.18, 0.06]} />
          </mesh>

          {/* Rivets — small spheres, grid pattern */}
          {rivetMatrices.map(([x, y, z], i) => (
            <mesh
              key={i}
              position={[x, y, z]}
              material={ironMaterial}
            >
              <sphereGeometry args={[0.06, quality === 'high' ? 12 : 8, quality === 'high' ? 8 : 6]} />
            </mesh>
          ))}

          {/* Handle — heavy iron ring on the swing edge */}
          <mesh
            position={[PANEL_W / 2 - 0.35, 0, PANEL_DEPTH / 2 + 0.08]}
            rotation={[Math.PI / 2, 0, 0]}
            material={ironMaterial}
          >
            <torusGeometry args={[0.18, 0.04, 12, 24]} />
          </mesh>
          {/* Handle backing plate */}
          <mesh
            position={[PANEL_W / 2 - 0.35, 0, PANEL_DEPTH / 2 + 0.015]}
            material={ironMaterial}
          >
            <boxGeometry args={[0.5, 0.5, 0.04]} />
          </mesh>
        </group>
      </group>
    </group>
  );
});
