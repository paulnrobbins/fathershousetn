/**
 * Threshold Cinema — Custom GLSL shaders
 *
 * All shaders for the door scene live here as raw strings. Three.js
 * compiles them into ShaderMaterial / RawShaderMaterial instances at
 * mount time. Keeping them in a single file makes art-direction tweaks
 * fast (one file to scan) and avoids string-literal mess in components.
 *
 * Coordinate conventions:
 *   - Three.js: right-handed, +Y up, +Z toward camera
 *   - vPosition: object-local position passed from vertex to fragment
 *   - vNormal: world-space normal
 *   - All colors are linear (no gamma correction) — Three's tonemapping
 *     handles output. Values are 0..1 floats matching CSS hex / 255.
 *
 * Phase 3 ships these. Phase 5 may add post-processing bloom; for now
 * the brass glow is hand-rolled via additive planes for max perf.
 */

/* ────────────────────────────────────────────────────────────────────
 * IRON — heavy door panel + frame material.
 *
 * Procedural shader (no PBR lights) so the look is consistent across
 * devices and we skip the cost of MeshStandardMaterial + light passes.
 * Multi-octave value noise gives wear; fresnel rim picks up brass tint
 * driven by uBrassIntensity (rises with scroll progress).
 * ──────────────────────────────────────────────────────────────────── */

export const ironVertex = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const ironFragment = /* glsl */ `
  uniform float uBrassIntensity;
  uniform vec3 uIronDark;
  uniform vec3 uIronMid;
  uniform vec3 uBrass;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  // Cheap value noise — fast on mobile, characterful enough for wear.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // Multi-octave wear. Coordinates are object-local so wear rotates
    // with the door — feels physical, not painted on.
    vec2 wp = vPosition.xy;
    float wear = noise(wp * 8.0) * 0.55;
    wear     += noise(wp * 25.0) * 0.30;
    wear     += noise(wp * 80.0) * 0.15;
    wear      = clamp(wear, 0.0, 1.0);

    // Subtle vertical gradient — slight darkening at the bottom of the
    // door (imagined ambient light from above the frame).
    float vGrad = 1.0 - smoothstep(-3.5, 3.5, vPosition.y) * 0.18;

    // Fresnel rim — the door's edges pick up the brass world behind it.
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 1.8);

    // Base iron mix
    vec3 base = mix(uIronDark, uIronMid, wear);
    base *= vGrad;

    // Brass tint on rim, intensified by scroll progress
    base += uBrass * fresnel * 0.28 * (0.45 + uBrassIntensity * 0.7);

    gl_FragColor = vec4(base, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/* ────────────────────────────────────────────────────────────────────
 * BRASS SEAM — soft glow halo plane that sits in front of the door's
 * swing edge. Renders with additive blending so it bloomes over the
 * iron without dimming it. Intensity drives bloom radius.
 * ──────────────────────────────────────────────────────────────────── */

export const brassSeamVertex = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const brassSeamFragment = /* glsl */ `
  uniform float uIntensity;
  uniform vec3 uColor;

  varying vec2 vUv;

  void main() {
    // Re-center UV — (-0.5, 0.5) range, easier to work with.
    vec2 c = vUv - 0.5;

    // Horizontal falloff — narrow at center (the actual seam line),
    // soft fall off to the sides. Squared for steeper bloom curve.
    float hBand = 1.0 - smoothstep(0.0, 0.42, abs(c.x));
    hBand = pow(hBand, 1.6);

    // Vertical falloff — fades toward top and bottom edges.
    float vFade = 1.0 - smoothstep(0.0, 0.5, abs(c.y));

    float bloom = hBand * vFade * uIntensity;

    gl_FragColor = vec4(uColor, bloom);
  }
`;

/* ────────────────────────────────────────────────────────────────────
 * DUST MOTES — soft round particles for THREE.Points.
 *
 * Drei's <Sparkles> component is good but we want the motes to react
 * to brass intensity (visible only when the light catches them). This
 * gives us full control: brightness rises with intensity, particles
 * never look like square pixels, and a slight twinkle adds life.
 * ──────────────────────────────────────────────────────────────────── */

export const dustMotesVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute float aPhase;
  attribute float aSpeed;

  varying float vPhase;

  void main() {
    vec3 p = position;

    // Slow drift up + sin sway — feels like dust caught in a beam.
    p.y += sin(uTime * 0.4 * aSpeed + aPhase) * 0.15 + uTime * 0.05 * aSpeed;
    p.x += sin(uTime * 0.7 + aPhase * 2.0) * 0.08;

    // Wrap vertically so the column never empties out.
    p.y = mod(p.y + 3.0, 6.0) - 3.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuates with distance. Multiply by pixel ratio so retina
    // doesn't half the apparent size.
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z);

    vPhase = aPhase;
  }
`;

export const dustMotesFragment = /* glsl */ `
  uniform float uIntensity;
  uniform vec3 uColor;
  uniform float uTime;

  varying float vPhase;

  void main() {
    // Distance from center of point — gl_PointCoord is (0,0)..(1,1).
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);

    // Soft circular falloff so motes are round, not square.
    float alpha = smoothstep(0.5, 0.0, d);

    // Twinkle — slight breathing animation per particle phase.
    float twinkle = 0.7 + 0.3 * sin(uTime * 1.2 + vPhase * 6.28);

    // Visibility scales with brass intensity (dust visible in light).
    alpha *= uIntensity * twinkle;

    if (alpha < 0.005) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ────────────────────────────────────────────────────────────────────
 * BACKGROUND — full-bleed gradient plane behind the door scene.
 *
 * Procedural gradient: cold steel at top, warm brass at horizon, with
 * a soft transition driven by uTransition (scroll progress). This is
 * what fills the frame as the door opens — the "world on the other
 * side" without needing a skybox.
 * ──────────────────────────────────────────────────────────────────── */

export const backgroundVertex = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const backgroundFragment = /* glsl */ `
  uniform float uTransition;
  uniform vec3 uCold;
  uniform vec3 uWarm;
  uniform vec3 uBrass;

  varying vec2 vUv;

  void main() {
    // Vertical gradient — warm horizon, cooler sky/ceiling.
    float vGrad = smoothstep(0.0, 1.0, vUv.y);

    // The base transitions from full cold (uTransition=0) to a deep warm
    // brass-shadow (uTransition=1).
    vec3 sky = mix(uCold, uWarm * 0.7, uTransition);
    vec3 floor_ = mix(uCold * 1.4, uWarm, uTransition);

    vec3 col = mix(floor_, sky, vGrad);

    // Brass radial bloom at the center — the door's gap is roughly here.
    float dx = vUv.x - 0.5;
    float dy = vUv.y - 0.5;
    float r = sqrt(dx * dx + dy * dy);
    float bloom = (1.0 - smoothstep(0.0, 0.7, r)) * uTransition * 0.6;
    col += uBrass * bloom;

    gl_FragColor = vec4(col, 1.0);
  }
`;
