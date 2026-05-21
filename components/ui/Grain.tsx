"use client";

/**
 * Grain
 * Site-wide subtle grain overlay per the brief's "Tactile Detail" pillar.
 * Uses an SVG fractal-noise filter rather than a raster — sharper, smaller bundle.
 *
 * Pointer-events: none. Always above content visually but never interactable.
 * Blend mode flips per theme so the grain reads correctly on both palettes.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.07] mix-blend-overlay [body[data-theme=warm]_&]:mix-blend-multiply [body[data-theme=warm]_&]:opacity-[0.05]"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
