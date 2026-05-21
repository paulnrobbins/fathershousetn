# MAINTENANCE.md

The recipe cookbook for editing **fathershousetn.org** after it goes live.

This site is built in **Mode 1 — Hardcoded**: edits happen by changing TypeScript files in VSCode and pushing to GitHub. There is no admin panel. The trade-off is that you have full control over the editorial voice and zero ongoing CMS cost — at the price of being comfortable with a code editor.

> **Once you are set up:** A typical content edit (change a date, fix a typo, add an event) takes 60–120 seconds. The site auto-redeploys in 2 minutes after you push.

If a recipe below is missing or unclear, that is a bug in this guide — flag it and we will add it.

---

## One-time setup

You only do this once, on each computer you want to edit from.

### 1. Install the tools

- **VSCode** — [code.visualstudio.com](https://code.visualstudio.com). The text editor.
- **GitHub Desktop** — [desktop.github.com](https://desktop.github.com). The "save and publish" button for code.

### 2. Get the project on your computer

1. Open GitHub Desktop. Sign in with the GitHub account that has access to the `fathers-house-tn` repository.
2. **File → Clone Repository → fathers-house-tn**.
3. Pick a folder location (e.g. `Documents/Code`).
4. Click **Clone**.

### 3. Open it in VSCode

In GitHub Desktop, click **Open in Visual Studio Code** at the top right.

### 4. Recommended VSCode extensions (optional but helpful)

Open the Extensions panel (the four-squares icon in the left sidebar) and install:

- **Prettier** — auto-formats files when you save. Less to think about.
- **Tailwind CSS IntelliSense** — autocomplete for the design system class names.
- **GitHub Pull Requests and Issues** — review history without leaving the editor.

You are now ready to make edits.

---

## How a typical edit works (the loop)

1. **Edit** the file in VSCode. Save (`Cmd+S` / `Ctrl+S`).
2. **Open GitHub Desktop**. Your change shows up in the left sidebar.
3. **Type a short summary** at the bottom-left (e.g. "Add Jonathan's testimony").
4. Click **Commit to main**.
5. Click **Push origin** at the top.
6. Wait ~2 minutes. Vercel auto-deploys. Refresh `www.fathershousetn.org`.

That's it. The same loop covers every recipe below.

> **Tip:** Cmd+Shift+F (Ctrl+Shift+F on Windows) opens project-wide search. Search for `EDIT HERE:` to jump between every editable copy block in the codebase.

---

## Recipes by content type

### A. Add a new upcoming event

**File:** `data/events.ts`

1. Open the file. You will see a list of events inside `EVENTS = [ ... ]`.
2. Copy an existing event entry (everything from `{` to `},`).
3. Paste it at the top of the list (or anywhere — the site sorts by date automatically).
4. Edit the fields:
   - `id`: a unique short slug, lowercase with dashes (e.g. `'banquet-fall-2026'`).
   - `title`: the event name as visitors see it.
   - `start`: the date in ISO format `YYYY-MM-DDTHH:mm` in **Eastern Time** (e.g. `'2026-09-12T18:00'`).
   - `end`: optional, same format as `start`.
   - `location`: text the visitor reads (e.g. `'Grace Bible Church, Dayton, TN'`).
   - `shortDescription`: 1–3 sentences shown on the home Scene 06 cards and the event listings.
   - `longDescription`: optional, longer text (currently unused — reserved for future detail pages).
   - `rsvpUrl`: optional. If present, the "Learn more" link opens this URL externally; otherwise it is a placeholder anchor.
5. Save → commit → push.

**Note:** The home page only shows the next **3 upcoming** events automatically — past events are filtered out. You do not need to delete past events; you can if you want a tidier file.

### B. Remove a past event

**File:** `data/events.ts`

1. Find the event entry (everything from `{` to `},`).
2. Delete those lines.
3. Save → commit → push.

You can also leave past events in the file forever — they are filtered out automatically and never appear on the site. Only do this for tidiness.

### C. Add or edit a testimony

**File:** `data/testimonies.ts`

The brief specified that testimonies use **first and last names** (with the man's consent). Do not anonymize unless the man asks for it.

1. Open the file.
2. Copy an existing entry, paste it as a new one in the list.
3. Edit:
   - `id`: unique short slug (e.g. `'jonathan-d-2024'`).
   - `name`: full first and last name.
   - `context`: optional, e.g. `'Class of 2024'` or `'Graduated June 2025'`.
   - `excerpt`: a short pull-quote (under 140 characters). This shows on the home Scene 05 billboard.
   - `full`: the full version of the testimony. Several paragraphs is fine. Shows on `/testimonies` and on hover-reveal of the home billboard.
   - `featured`: `true` to show on the home page; `false` (or remove the line) to only show on `/testimonies`.
4. Save → commit → push.

**Featured testimonies on home:** the home Scene 05 shows the **first 1–2** entries with `featured: true`, in order. To swap which testimonies appear on the home page, just change which entries have `featured: true`.

### D. Add or edit an FAQ

**File:** `data/faqs.ts`

1. Open the file.
2. Copy an existing entry, paste it in the position you want.
3. Edit:
   - `id`: unique short slug (e.g. `'how-long-is-program'`).
   - `question`: the question as a visitor would ask it.
   - `answer`: the answer. Plain prose, can be 1–5 sentences.
   - `category`: one of `'apply'` / `'program'` / `'support'` / `'general'`. The `/faqs` page groups by category in this order.
4. Save → commit → push.

### E. Add a photo to the gallery

**Two steps: drop the file, then list it.**

#### Step 1 — Add the image file

1. In VSCode's left sidebar, find the `public/photos/` folder.
2. Drag your image file into that folder. JPEGs around 1600×1200 px and under 300KB are ideal.

#### Step 2 — Register it in `data/photos.ts`

1. Open `data/photos.ts`.
2. Inside the `PHOTOS = [ ... ]` array, add an entry. The first time you do this you will need to **uncomment** the example entries (delete the `//` at the start of those lines) and edit them.
3. Each entry takes:
   - `id`: short slug (e.g. `'banquet-2025'`).
   - `src`: the path under `/public`, including the leading slash (e.g. `'/photos/banquet-2025.jpg'`).
   - `alt`: required. Describe what the photo shows ("the men praying in the kitchen", "the front of the house at sunset"). This is what blind visitors hear.
   - `caption`: optional. Geist Mono micro-text below the photo.
   - `featured`: `true` to show on the home Scene 06 grid. Aim for 4–6 featured photos.
4. Save → commit → push.

**Empty state:** if `PHOTOS` is empty, the home page hides the photo grid and `/pictures-video` shows a graceful "Media gallery coming soon" notice. The site never breaks.

### F. Add a video to /pictures-video

**File:** `app/pictures-video/page.tsx`

1. Find the `VIDEOS` array near the top (look for `// EDIT HERE: Videos`).
2. Uncomment the example entry by removing the `//` from each of those lines, then edit:
   - `id`: short slug.
   - `title`: the video title.
   - `url`: the YouTube or Vimeo URL.
   - `description`: optional one-line description.
3. Save → commit → push.

The video section only appears on the page if at least one entry exists.

### G. Edit any page's text

Every editable copy block is marked with `// EDIT HERE:` comments. To find them all:

1. In VSCode, press **Cmd+Shift+F** (Windows: **Ctrl+Shift+F**).
2. Search for `EDIT HERE`.
3. The results panel shows every editable block in the project, grouped by file.
4. Click the result to jump to it.
5. Edit the strings (the part between the quote marks `'...'`). **Do not** change the field names (the part before the colon, e.g. `headline:`).
6. Save → commit → push.

**Examples of edits this covers:**
- The hero headline ("From prison to purpose.") — `components/scenes/Hero.tsx`, look for `// EDIT HERE: Scene 02`. (The Phase 1 brief locked this as a sacred cow; change with care.)
- The "82% remain in recovery" stat — same file, `SCENE_04` block.
- About Us mission paragraph — `app/about-us/page.tsx`, look for `// EDIT HERE: Mission`.
- FAQ section labels (Applying / The program / Standing with us / General) — `app/faqs/page.tsx`.
- Six involvement paths on Get Involved — `app/get-involved/page.tsx`.
- Page headers on every sub-page (eyebrow + title + kicker) — top of each page file.

### H. Update the contact phone number, email, or address

**File:** `data/nav.ts`

This is the single source of truth for contact info. Find the `CONTACT` object near the top:

```
export const CONTACT = {
  phone: '(423) 285-5096',
  phoneTel: '+14232855096',     // tel: link version, no formatting
  email: 'fathershousetn@gmail.com',
  address: {
    line1: 'PO Box 7',
    line2: 'Evensville, TN 37332',
  },
} as const;
```

Edit, save, push. The change appears across the footer, contact page, future-applicants page, and donate page automatically.

> **Important:** Update **both** `phone` (display) and `phoneTel` (the format the OS dialer uses) if the number changes.

### I. Update the Zeffy donation or newsletter URL

**File:** `data/nav.ts`

```
export const EXTERNAL = {
  zeffyDonate: 'https://www.zeffy.com/...donate-form/...',
  zeffyNewsletter: 'https://www.zeffy.com/...newsletter-form/...',
  rheaCountyArcgis: '...',
} as const;
```

Replace the URL inside the quotes with your real Zeffy URL. The change applies to:
- the Donate Now page iframe (`/donate-now`)
- the home page Scene 07 "Sign up for the newsletter" link
- the Get Involved page newsletter section
- the Footer newsletter form

Save → commit → push.

### J. Re-order the navigation

**File:** `data/nav.ts`

The `mainNavItems` array controls the nav order on every page (header, footer, mobile menu). The order in the array is the order on the screen.

1. Cut a line. Paste it in the position you want.
2. Save → commit → push.

**Do not change** the `href` values or the `half: 'cold' | 'warm' | 'bridge'` field unless you also rename the matching folder under `app/`. The `half` value drives the page's color palette via the `ThemeApplier` — keep `cold` for pre-threshold pages, `warm` for past-threshold pages, `bridge` for neutral.

### K. Replace the OG share image

**File:** `public/og.png`

The OG image is what shows up when someone shares the site link on Facebook, iMessage, Twitter, Slack, etc. The current one is hand-composed in the project's Threshold Cinema palette.

To replace it:
1. Make a 1200×630 PNG of your new image.
2. Drag it into the `public/` folder, replacing `og.png`.
3. Save → commit → push.

After deploy, **clear the Facebook / Twitter cache** so the old image stops showing in previews:
- Facebook: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug) — paste the URL, click "Scrape Again".
- Twitter / X: paste the URL into a tweet preview; X re-fetches automatically.

### L. Add a new sub-page

This is more involved than other recipes. Skip it if you're not comfortable in code.

1. Inside `app/`, create a new folder named after the URL slug (e.g. `app/board-members/`).
2. Inside that folder, create a file named `page.tsx`.
3. Copy the contents of an existing `page.tsx` (e.g. `app/about-us/page.tsx`) as a starting template.
4. Change the `metadata` block at the top, the `HEADER` constants, and the page body.
5. Add an entry to `mainNavItems` in `data/nav.ts` with the right `half` value.
6. Save → commit → push.

The new page appears in the nav, the footer sitemap, and at the URL `/board-members`.

### M. Adjust the iron door's opening angle / brass intensity / scroll choreography

**Files:** `components/three/DoorScene.tsx` (3D timing), `components/scenes/Hero.tsx` (overlay timing)

This is the hardest thing to edit safely. The brief calls these "the choreography" and warns they are downstream of carefully tuned values. If you must change them:

- **Door angle range** — `DoorScene.tsx`, the `// ─── Door angle:` block. The range `0.087 → 1.92` radians is 5° → 110°. Change either bound to retime.
- **Brass intensity range** — same file, `// ─── Brass intensity:` block.
- **Scene-fade windows** — `Hero.tsx`, the four `smoothstep(p, ...)` calls in `onUpdate`. Each pair of numbers is the `[start, end]` of a fade window measured in scroll progress (0..1).

Always test on a real phone after a choreography edit. Reduced-motion users get the static stack regardless — that path does not need re-tuning.

### N. Test the site locally before pushing (optional)

Sometimes you want to see your change before it goes live. To run the site on your laptop:

1. Install [Node.js](https://nodejs.org) (LTS version). One-time only.
2. Open the project folder in VSCode.
3. Open VSCode's terminal: **Terminal → New Terminal**.
4. Run:
   ```
   npm install
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser. You'll see the site as it would appear after deploy.
6. When you're done, press **Ctrl+C** in the terminal to stop the dev server.

---

## Things to never do

- **Do not edit files inside `node_modules/`** — that folder is auto-generated. Anything you change will be overwritten next deploy.
- **Do not delete `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, or `tailwind.config.ts`** — these define the build. If they go away, the site cannot deploy.
- **Do not commit `.env.local`** — it has secrets (the Web3Forms key). The `.gitignore` should keep this from happening; double-check before committing if you ever add the file manually.
- **Do not change the color palette tokens in `app/globals.css`** without thinking it through. The two-color discipline plus brass constant is structural — the brief calls it out explicitly. If a marketing push wants a different colour, that is a redesign, not a content edit.
- **Do not commit half-finished edits** that break the build. Always run `npm run build` locally before pushing if you've made a structural change. If you only edited text, you're fine.

---

## When something is broken

1. **Find the bad commit.** GitHub Desktop's history (the **History** tab) shows every commit. Click recent ones to see exactly what changed.
2. **Roll back on Vercel** — see `DEPLOYMENT.md` § D4. This restores the live site to the previous deploy in seconds, while you figure out the fix at your leisure.
3. **Revert a commit locally** — in GitHub Desktop, right-click the bad commit in the History tab → **Revert this commit**. This creates a new commit that undoes the bad one. Push it. Vercel re-deploys back to working.
4. **Ask the original developer** — paste the GitHub commit URL and the error message into a new chat. Most issues are 30-second fixes for someone who knows the codebase.

---

## Where things live (the map)

```
app/                    Page routes — one file per URL
  page.tsx                /
  about-us/page.tsx       /about-us
  faqs/page.tsx           /faqs
  ...
  layout.tsx              site-wide layout (nav, footer, fonts)
  globals.css             design tokens (colors, fluid type scale)

components/
  scenes/                 The home-page scenes (Hero, TheProof, TheLife, ThresholdCTA)
  three/                  The iron door 3D scene primitives
  ui/                     Layout chrome (Nav, Footer, Cursor, Magnetic, Grain)
  content/                Reusable content blocks (TestimonyCard, EventCard, etc.)

data/                   The editable content layer
  events.ts               Upcoming events
  testimonies.ts          Testimonies
  faqs.ts                 FAQs
  photos.ts               Photo gallery entries
  nav.ts                  Site nav, contact info, external URLs

public/
  photos/                 Real photo files
  og.png                  Open Graph share image

DEPLOYMENT.md           This site's deploy guide.
MAINTENANCE.md          The file you are reading.
README.md               Tech stack overview.
```

---

## A few principles to keep editing easy

1. **Keep edits small.** One change per commit. "Add June banquet" and "Fix typo on About Us" are two commits, not one.
2. **Write commit messages as if a future you needs to find them.** "Update events" is bad; "Add June 2026 banquet event" is good.
3. **Trust the system.** The `// EDIT HERE:` comments are there so you do not have to memorize the structure. Search and edit; do not redesign.
4. **When the brief says a thing is locked, it is locked.** "From prison to purpose.", the 82% statistic, the 1,279.96 Rhea County stat, the Reformers Unanimous partnership language — these are sacred cows from the discovery. Change them only with intention.
5. **Test on a real phone.** Especially after layout edits. Mobile is the primary audience for this site.

---

*From prison to purpose. The site is yours.*
