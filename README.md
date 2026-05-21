# Our Father's House — Website

Christ-centered recovery home for men in Rhea County, Tennessee.
Production immersive 3D rebuild on Next.js 15 + React Three Fiber.

> **Live:** [www.fathershousetn.org](https://www.fathershousetn.org)
> **Direction:** Threshold Cinema — see Phase 1 brief.
> **Maintenance:** Mode 1 (hardcoded). Edits via VSCode + GitHub Desktop. See `MAINTENANCE.md`.

## Tech stack

- **Next.js 15** (App Router, React 19, TypeScript strict mode)
- **React Three Fiber 9** + **drei** for the iron-door 3D scene
- **GSAP** + **ScrollTrigger** for scroll choreography
- **Lenis** for smooth scrolling (auto-disabled on `prefers-reduced-motion`)
- **Tailwind CSS 3.4** for utility styling, with CSS variables for the theme system
- **Fraunces** (display) + **Geist** (body) + **Geist Mono** (micro) via `next/font/google`
- **Zeffy** for donation (iframe)
- **Vercel** for hosting; GoDaddy DNS → Vercel A/CNAME (see `DEPLOYMENT.md`)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Project map

```
app/                    Next.js App Router pages (home + 8 sub-pages)
  layout.tsx              Root layout, fonts, OG metadata, providers
  page.tsx                Home — Hero + TheProof + TheLife + ThresholdCTA
  globals.css             Design tokens + base type system + cursor activation
  not-found.tsx           Branded 404 (the door doesn't open here)
  about-us/page.tsx       /about-us
  contact-us/page.tsx     /contact-us
  donate-now/page.tsx     /donate-now
  faqs/page.tsx           /faqs
  future-applicants/page.tsx
  get-involved/page.tsx
  pictures-video/page.tsx
  testimonies/page.tsx

components/
  three/                  R3F primitives (Door, DustMotes, BrassSeam,
                          BackgroundGradient, SceneStage, shaders)
  scenes/                 Home page scene components
                          (Hero, TheProof, TheLife, ThresholdCTA)
  ui/                     Layout chrome (Nav, Footer, Grain, ThemeApplier,
                          PageHeader, Magnetic, Cursor)
  content/                Reusable content blocks (TestimonyCard, EventCard,
                          PhotoBillboard, FaqItem, ZeffyEmbed,
                          PhotoBillboard, FaqItem, ZeffyEmbed)

data/                   Editable content (Mode 1 maintenance)
  events.ts               Upcoming events
  testimonies.ts          Men's testimonies (first + last name, with consent)
  faqs.ts                 FAQs by category
  photos.ts               Photo gallery
  nav.ts                  Site nav, contact info, external URLs

lib/                    Providers + helpers
  fonts.ts                next/font config
  motion.ts               prefers-reduced-motion + low-power detection
  gsap-context.ts         scoped GSAP context hook
  lenis-provider.tsx      Lenis wired to GSAP ScrollTrigger

public/
  photos/                 Photo files (drop here, register in data/photos.ts)
  og.png                  Open Graph share image (1200×630)

DEPLOYMENT.md           Vercel deploy + GoDaddy DNS migration
MAINTENANCE.md          Recipe cookbook for every common edit
QUALITY-GATES.md        Phase 5 quality verification checklist
```

## Theme system

The site uses a **cold/warm palette split** with a brass constant threading through both halves — the gospel light. Each page declares its theme via `data-theme` on the body. The home page transitions cold → warm mid-scroll via a scroll-driven CSS variable rewrite.

| Hex         | Role                          |
|-------------|-------------------------------|
| `#0E0F12`   | Cold steel near-black         |
| `#F5EFE6`   | Warm parchment off-white      |
| `#C9A55B`   | Brass — the constant light    |
| `#2E2A26`   | Dark bronze (warm-side text)  |

Cold pages: Future Applicants, FAQs.
Warm pages: Testimonies, Get Involved, About Us, Pictures & Video, Donate Now.
Bridge: Home, Contact Us.

## Accessibility & motion

- Full content access for `prefers-reduced-motion` users — the home Hero exposes Scenes 02/03/04 as a stacked editorial column below the static hero panel.
- Scenes 05–07 short-circuit their stagger and render in their final state.
- The custom cursor is gated behind a `(hover: hover) and (pointer: fine)` media query, viewport ≥ 1024px, and `!prefers-reduced-motion`.
- Magnetic CTAs disable on touch + reduced-motion.
- The 3D scene has a low-quality variant for low-power devices: tighter DPR cap, no antialiasing, 40 dust motes instead of 140, fewer rivets on the door geometry.
- The brass-seam shader respects scroll progress on every scroll path; the seam never disappears.

## Editing content

Phase 5 ships **`MAINTENANCE.md`** with full editing recipes — every common edit from "add an event" to "swap the OG image" is documented step-by-step. Read that file before editing anything.

Quick orientation:
- All content is in `data/*.ts` files. Edit those.
- Every editable copy block in any page or scene is marked with a `// EDIT HERE:` comment. Search the project for `EDIT HERE` to jump between them in VSCode.

## Deployment

Phase 5 ships **`DEPLOYMENT.md`** with the full Vercel deploy + GoDaddy → Vercel DNS migration steps. Beginner-friendly; expect 60–90 minutes including DNS propagation.

## Environment variables

Create a `.env.local` file in the project root for local development. The same values must be set in Vercel's environment-variables panel before deploy.

```
NEXT_PUBLIC_SITE_URL=https://www.fathershousetn.org   # OG metadata canonical
NEXT_PUBLIC_CONTACT_EMAIL=fathershousetn@gmail.com    # Footer fallback (optional)
NEXT_PUBLIC_CONTACT_PHONE=+14232855096                # Footer fallback (optional)
```


## Quality gates

Phase 5 ships **`QUALITY-GATES.md`** with the verification checklist from the brief. Status of each gate is recorded there as of the most recent build.

---

*From prison to purpose.*
