# DEPLOYMENT.md

How to take **fathershousetn.org** live on Vercel and point your existing GoDaddy domain at it.

This guide is written for someone who has not deployed a Next.js site before. Every step is in plain language; if a sentence ever gets too technical, that is a bug in the guide — open an issue and we will fix it.

> **Estimated total time:** 60–90 minutes, including a 30–60 minute DNS propagation wait at the very end.

---

## What you need before you start

- A **GitHub** account ([github.com](https://github.com)) — free. Vercel deploys from GitHub.
- A **Vercel** account ([vercel.com](https://vercel.com)) — free at the Hobby tier, which is fine for this site.
- Access to the GoDaddy account that owns `fathershousetn.org`.
- The project zip from the most recent build, unpacked into a folder on your computer.
- (Optional but recommended) **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)) — a friendly app for pushing code to GitHub without using a terminal. Everything below works fine through the GitHub website too.

You will not need to install Node.js or run any commands locally to deploy. Vercel handles the build for you.

---

## Phase A — Get the code into GitHub

### A1. Create a private GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. **Repository name:** `fathers-house-tn`
3. **Description:** `Our Father's House — Christ-centered recovery home website`
4. **Visibility:** **Private** is the right default. (Public is fine too — there are no secrets in the repo.)
5. **Do NOT** check any of "Add a README", "Add .gitignore", or "Choose a license" — the project already has those.
6. Click **Create repository**.

You will land on a page that says "Quick setup". Keep it open; we will use it in step A3.

### A2. Put the project files into a folder on your computer

1. Unzip the latest project zip (`fathers-house-tn.zip`) somewhere you will not lose it. A good place is `Documents/Code/fathers-house-tn`.
2. Inside the unzipped folder you should see `package.json`, `app/`, `components/`, `data/`, `public/`, and so on. If the unzip put everything inside an extra folder like `fathers-house-tn/fathers-house-tn`, move the inner folder up one level so `package.json` sits at the top.

### A3. Push the code to GitHub

**Easy path — GitHub Desktop:**

1. Open GitHub Desktop. Sign in with your GitHub account if it asks.
2. Choose **File → Add Local Repository**, and pick the unzipped project folder.
3. GitHub Desktop will say "this isn't a Git repository — would you like to create one?" Click **Create a repository**.
4. In the dialog, the **Name** auto-fills as `fathers-house-tn`. Click **Create repository**.
5. Click **Publish repository** at the top.
6. **Uncheck** "Keep this code private" only if you want it public. Otherwise leave it checked.
7. Click **Publish repository** in the dialog. Done — your code is on GitHub.

**Web path (no apps to install):**

1. On the GitHub page from step A1, follow the section titled **"…or create a new repository on the command line"**. The commands look like:
   ```
   echo "# fathers-house-tn" >> README.md
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/fathers-house-tn.git
   git push -u origin main
   ```
   You will need Git installed (`git --version` to check). If that is too much, use GitHub Desktop above.

### A4. Verify

Refresh your repo page at `https://github.com/YOUR-USERNAME/fathers-house-tn`. You should see all the project files listed (`app`, `components`, `data`, `package.json`, etc.). If you only see a README, something went wrong — re-run step A3.

---

## Phase B — Deploy to Vercel

### B1. Connect Vercel to GitHub

1. Go to [vercel.com/new](https://vercel.com/new).
2. If you have not signed in yet, click **Continue with GitHub** and authorize Vercel.
3. On the **Import Git Repository** screen, find `fathers-house-tn` in the list. If you do not see it, click **Adjust GitHub App Permissions** and make sure Vercel has access to your account or to the specific repo.
4. Click **Import** next to `fathers-house-tn`.

### B2. Configure the project

Vercel will auto-detect this as a Next.js project. **Do not change** the Framework Preset, Build Command, or Output Directory — they are already correct.

Now add the environment variables. Click **Environment Variables** to expand the section, and add these entries one at a time. For each, pick **All Environments** unless noted:

| Name | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.fathershousetn.org` | Used in metadata (OG tags, canonical). |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | *(your key — see B3 below)* | Required for the contact form to send. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `fathershousetn@gmail.com` | Optional. Falls back to the value baked into the code. |
| `NEXT_PUBLIC_CONTACT_PHONE` | `+14232855096` | Optional. Same fallback behavior. |

### B3. Get a Web3Forms access key (for the contact form)

The contact form on `/contact-us` uses [Web3Forms](https://web3forms.com), a free relay that emails form submissions to a single address — no backend, no signup beyond your email.

1. Go to [web3forms.com](https://web3forms.com).
2. Enter `fathershousetn@gmail.com` in the "Get your Access Key" box.
3. Click **Create Access Key**. They send the key to that email.
4. Copy the key. Paste it as the value of `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel.

If you skip this step, the contact form will display a clear "needs setup" notice instead of a broken submit button — the rest of the site works fine without it.

### B4. Deploy

1. Click **Deploy** at the bottom of the Vercel page.
2. Wait 60–120 seconds. You will see a "Building" indicator, then "Ready", then a celebration screen.
3. Vercel gives you a temporary URL like `fathers-house-tn-XXXXXX.vercel.app`. Click it. The site should look exactly like local — animations, fonts, the iron door, everything.

**If the build fails:**
- Most commonly, an environment variable was misspelled. Compare against the table in B2 exactly.
- Click **View Build Logs** on Vercel and search the output for the word "error". The line above it usually tells you what went wrong.
- If you are stuck, the original developer (or whoever shipped your most recent zip) can read the build log and figure out the fix in a few minutes.

### B5. Verify the preview URL works end-to-end

Open the preview URL on **a real phone** as well as your laptop. Walk this checklist:

- [ ] Home page loads, the iron door appears, the brass seam glows.
- [ ] Scrolling animates through the four scenes (door opens, palette warms).
- [ ] Each of the 8 sub-pages opens from the nav.
- [ ] The footer Zeffy newsletter form loads.
- [ ] The Donate Now page Zeffy iframe loads.
- [ ] The contact form sends — try it once. Check the email inbox.
- [ ] Phone numbers click-to-call. Email links open the email app.

If anything is broken, **do not migrate the domain yet**. Fix the preview first.

---

## Phase C — Point fathershousetn.org at Vercel

This is the moment the live site changes. You can do this any time after Phase B is verified — there is no rush.

> **Pro tip:** Plan this for an evening or early morning when traffic is lowest. DNS propagation usually finishes in 30 minutes but can take up to 24 hours; during that window some visitors will still hit the old Google Sites version. That is normal.

### C1. Pre-lower the TTL on GoDaddy (recommended, optional)

If you do this **at least 24 hours before** the cutover, the DNS change in C3 will propagate faster (5–15 minutes instead of up to 24 hours). It is a no-op for users; it just tells the world "I might change my mind soon."

1. Sign in at [godaddy.com](https://godaddy.com).
2. Click your name (top right) → **My Products**.
3. Find `fathershousetn.org` and click **DNS** next to it (or click the domain → **Manage DNS**).
4. For every record currently pointing the domain at Google Sites (you will see records with type `A`, `AAAA`, `CNAME`), click the **edit pencil** and change **TTL** to **600 seconds** (10 minutes). Save each one.
5. Wait 24 hours. (Or skip this step entirely; it just means cutover takes longer.)

### C2. Add the domain in Vercel

1. In your Vercel project, click **Settings** → **Domains** in the left sidebar.
2. In the **Add** field, type `fathershousetn.org` and press **Add**.
3. Vercel will say "Set the following records on your DNS provider". Keep this tab open — you will copy values from it.
4. Click **Add** again and type `www.fathershousetn.org`. Vercel will mark one as the primary; pick whichever you prefer (the convention is `www`-prefixed for nonprofits, so set `www.fathershousetn.org` as primary and `fathershousetn.org` redirects to it).

Vercel will show you something like:

| For `fathershousetn.org` | Type: A      | Name: @   | Value: `76.76.21.21` |
| For `www.fathershousetn.org` | Type: CNAME  | Name: www | Value: `cname.vercel-dns.com` |

Exact values may differ — **always copy from the Vercel screen**, not from this guide.

### C3. Switch the records on GoDaddy

Back in the GoDaddy DNS panel from step C1:

1. **Remove** any existing records that conflict with the new ones. Specifically:
   - Any `A` record on `@` (the root domain) pointing at Google Sites IPs.
   - Any `CNAME` on `www` pointing at `ghs.googlehosted.com` or similar.
   - Any `AAAA` records on `@` (Google Sites' IPv6 addresses) — Vercel does not need these.
   - **Leave alone:** `MX` records (email), `TXT` records for verification, anything from email providers.
2. **Add** the records Vercel showed you in C2:
   - **Type:** `A`, **Name:** `@`, **Value:** `76.76.21.21` (whatever Vercel showed). **TTL:** 600 if you pre-lowered, otherwise 1 hour.
   - **Type:** `CNAME`, **Name:** `www`, **Value:** `cname.vercel-dns.com`. **TTL:** 600 or 1 hour.
3. Save changes.

### C4. Watch Vercel verify the domain

Go back to the Vercel **Domains** screen. Within a minute or so, the yellow "Invalid Configuration" or "Pending" indicator next to your domain will turn into a **green checkmark** with a padlock — that means DNS pointed correctly *and* Vercel has issued an HTTPS certificate for free. No action needed; just wait.

If 30 minutes pass without the green checkmark:
- Refresh the Vercel page.
- Use [whatsmydns.net](https://www.whatsmydns.net) and search for `fathershousetn.org` (type A) — you should see Vercel's IP propagating across regions. If you still see Google Sites IPs everywhere, the GoDaddy change did not save. Re-do step C3.

### C5. Final verification

Once the green checkmark is up:

- Open `https://www.fathershousetn.org` in a fresh browser window. You should see the new site.
- Open `https://fathershousetn.org` (no `www`). It should redirect to `www.fathershousetn.org`.
- Verify HTTPS — the URL bar shows a padlock, no warnings.
- Test the contact form one more time on the live domain.

You're live.

---

## Phase D — After launch

### D1. Future updates

Every time you push a commit to the `main` branch on GitHub, Vercel auto-deploys the new version within ~2 minutes. The pattern is:

1. Open the project folder in VSCode (or any editor).
2. Make an edit. (See `MAINTENANCE.md` for recipes.)
3. Save.
4. Open GitHub Desktop. The change shows up in the left sidebar.
5. Type a short summary at the bottom (e.g. "Add June banquet event").
6. Click **Commit to main**.
7. Click **Push origin** at the top.
8. Refresh `www.fathershousetn.org` in 2 minutes — your change is live.

### D2. Pull request previews (optional)

For larger changes you want to review before going live: in GitHub Desktop, choose **Branch → New Branch**, name it (e.g. `redesign-faqs`), commit your changes there instead of `main`, and push. Vercel will auto-build a preview URL for that branch — share it with someone for review, then merge to `main` when you are happy.

### D3. Where to look when something is wrong

| Problem | Where to look |
|---|---|
| The site is down | [vercel-status.com](https://www.vercel-status.com) — check Vercel's own uptime first. |
| The site loads but content is wrong | The latest deploy is probably mid-build. Check the **Deployments** tab in Vercel — wait for the green checkmark. |
| Contact form bounces | Web3Forms key may have rotated. Recheck B3. |
| Donate button shows error | Zeffy's iframe URL changed. See `MAINTENANCE.md` § "Updating Zeffy URLs". |
| Fonts look wrong on first load | Google Fonts is rate-limited or blocked. The site has system-font fallbacks; Vercel will recover on the next request. |

### D4. Rollback in 30 seconds

If a deploy goes bad and you need to revert:

1. Vercel → **Deployments**.
2. Find the last working deploy (the one with a checkmark from before things broke).
3. Click the three-dot menu → **Promote to Production**.

The site is back on the previous version within seconds. No DNS change needed.

---

## Optional: move DNS to Cloudflare

For better DNS performance and easier management later, you can move DNS hosting to [Cloudflare](https://cloudflare.com) (free). The domain stays registered at GoDaddy; only the DNS hosting moves. This is purely optional — GoDaddy DNS works fine.

If you want to do it:
1. Sign up at Cloudflare. Add `fathershousetn.org`.
2. Cloudflare will scan your existing DNS and copy your records. Verify they look correct (especially MX records for email — never miss those).
3. Cloudflare gives you two **nameservers** (e.g. `kim.ns.cloudflare.com`, `dave.ns.cloudflare.com`).
4. In GoDaddy → your domain → **Nameservers** → change to Custom and paste in the Cloudflare ones.
5. Wait up to 24 hours for the nameserver change to propagate. Cloudflare emails you when it is active.
6. From then on, you manage DNS at Cloudflare instead of GoDaddy. The same A and CNAME records to Vercel apply.

---

*From prison to purpose. Welcome to the live site.*
