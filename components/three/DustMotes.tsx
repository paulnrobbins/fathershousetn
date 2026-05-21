'use client';

import { useMemo, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { dustMotesVertex, dustMotesFragment } from './shaders';

interface DustMotesProps {
  /** Particle count — drop sharply on low-power devices. */
  count?: number;
  /** Initial intensity. Updated each frame from scroll progress. */
  intensity?: number;
  /** Box dimensions [width, height, depth] of the particle volume. */
  bounds?: [number, number, number];
}

/**
 * DustMotes
 *
 * Particle system that simulates dust caught in the brass light beam.
 * Visibility scales with brass intensity — when the light is dim, the
 * motes nearly disappear; when the door opens and brass fills the
 * scene, they twinkle visibly.
 *
 * Custom shader instead of drei's <Sparkles> because we need uniform
 * control over intensity (drei's Sparkles fires forget-and-fly).
 *
 * Performance:
 *   - One draw call (single Points object)
 *   - Vertex shader handles all motion (no per-frame attribute updates)
 *   - Fragment shader's soft-circle math is cheap (~5 ops)
 */
export const DustMotes = forwardRef<THREE.ShaderMaterial, DustMotesProps>(
  function DustMotes(
    { count = 140, intensity = 0.4, bounds = [6, 6, 3] },
    materialRef
  ) {
    const pointsRef = useRef<THREE.Points>(null);

    // Build geometry + per-particle attributes once.
    const { geometry, material } = useMemo(() => {
      const geo = new THREE.BufferGeometry();

      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);
      const speeds = new Float32Array(count);

      const [bw, bh, bd] = bounds;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * bw;
        positions[i * 3 + 1] = (Math.random() - 0.5) * bh;
        positions[i * 3 + 2] = (Math.random() - 0.5) * bd;
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 0.5 + Math.random() * 0.8;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
      geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: dustMotesVertex,
        fragmentShader: dustMotesFragment,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: intensity },
          uPixelRatio: {
            value: typeof window !== 'undefined'
              ? Math.min(window.devicePixelRatio, 2)
              : 1,
          },
          uSize: { value: 60 },
          uColor: { value: new THREE.Color(0xc9a55b) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      return { geometry: geo, material: mat };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    // Wire the imperative ref so DoorScene can update uIntensity per frame.
    if (typeof materialRef === 'function') materialRef(material);
    else if (materialRef) materialRef.current = material;

    useFrame((_, delta) => {
      material.uniforms.uTime.value += delta;
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
  }
);
