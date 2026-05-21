'use client';

import { useMemo, forwardRef } from 'react';
import * as THREE from 'three';
import { brassSeamVertex, brassSeamFragment } from './shaders';

/**
 * BrassSeam
 *
 * Two pieces — together they create the "warm light behind the door"
 * effect without any post-processing:
 *
 *   1. Backlight plane — a large brass-colored emissive plane positioned
 *      far behind the door. Visible through the door's gap and around its
 *      edges. As the door opens, more of this plane is revealed.
 *
 *   2. Glow halo — a smaller plane in FRONT of the door's swing edge,
 *      using a custom soft-falloff shader with additive blending. This
 *      adds the soft bloom that "leaks" past the door's edges, selling
 *      the brightness without requiring postprocessing bloom.
 *
 * Both react to uIntensity, which is driven by scroll progress in
 * DoorScene.
 */

interface BrassSeamProps {
  /** Initial intensity. Updated each frame from scroll progress. */
  intensity?: number;
}

/**
 * Backlight — a large flat plane behind everything, brass-emissive.
 * Just MeshBasicMaterial, no shader needed: it's pure color.
 */
export function BackLight() {
  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[24, 18]} />
      <meshBasicMaterial color={0x87c5e2} toneMapped={false} />
    </mesh>
  );
}

/**
 * SeamGlow — the bloom halo that wraps around the door's edges.
 * The ref points to the ShaderMaterial so DoorScene can mutate
 * uIntensity per frame without React re-rendering.
 */
export const SeamGlow = forwardRef<THREE.ShaderMaterial, BrassSeamProps>(
  function SeamGlow({ intensity = 0.4 }, ref) {
    const material = useMemo(
      () =>
        new THREE.ShaderMaterial({
          vertexShader: brassSeamVertex,
          fragmentShader: brassSeamFragment,
          uniforms: {
            uIntensity: { value: intensity },
            uColor: { value: new THREE.Color(0x87c5e2) },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    // Wire the imperative ref so callers can mutate uniforms each frame.
    if (typeof ref === 'function') ref(material);
    else if (ref) ref.current = material;

    return (
      <mesh position={[0, 0, 0.3]} material={material}>
        <planeGeometry args={[5.5, 8.5]} />
      </mesh>
    );
  }
);
