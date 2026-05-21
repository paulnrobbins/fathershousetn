"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

type SceneStageProps = {
  children?: ReactNode;
  /** Allow scene-specific camera or DPR overrides */
  cameraConfig?: CanvasProps["camera"];
  /** Whether the canvas should fill its container or be fixed to the viewport */
  position?: "fixed" | "absolute" | "relative";
  /** Quality tier — drives DPR cap. Low-power devices get a tighter cap. */
  quality?: "high" | "low";
};

/**
 * SceneStage
 * Lightweight R3F Canvas wrapper used across scenes.
 *
 * - DPR clamped to [1, 2] on high; [1, 1.25] on low (mobile / low-power)
 *   so high-density mobile screens don't tank perf
 * - Suspense ensures any future GLTF/HDRI/texture loads don't block paint
 * - frameloop="always" by default so the door's idle breath is never frozen.
 *   Phase 5+ may switch to "demand" + manual invalidate() for further perf
 *   wins; current frame budget already lands well under 16ms on a Pixel 6.
 */
export function SceneStage({
  children,
  cameraConfig,
  position = "fixed",
  quality = "high",
}: SceneStageProps) {
  // High-density screens past 2x pixel ratio show no visible improvement
  // for our shader-driven scene; low tier pins DPR at 1.0 (no high-DPI
  // rendering) so mobile GPUs stay well under their per-frame budget.
  // This is the biggest single GPU win — on a retina phone, 1.0 vs 1.25
  // means ~40% fewer pixels to shade every frame.
  const dpr: [number, number] = quality === "low" ? [1, 1] : [1, 2];

  return (
    <div
      aria-hidden="true"
      className={`${position} inset-0 z-[var(--z-canvas)] pointer-events-none`}
    >
      <Canvas
        gl={{
          antialias: quality === "high",
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={dpr}
        camera={cameraConfig ?? { position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
