import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ZeffyEmbed } from '@/components/content/ZeffyEmbed';
import { CONTACT, EXTERNAL } from '@/data/nav';

export const metadata: Metadata = {
  title: 'Donate Now',
  description:
    "Give to Our Father's House. All donations are tax-deductible in full or part. Registered 501(c)(3) nonprofit.",
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /donate-now
 *
 * Mode 1 maintenance: the Zeffy embed URL lives in `data/nav.ts`
 * (EXTERNAL.zeffyDonate). Edit it there. Edit page-level copy below.
 *
 * Per Phase 1 lock there are NO impact tiers on this page — Zeffy
 * embeds directly. Tiers can be added in a future iteration once
 * treasurer-validated numbers are available.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Past the threshold · Donate now',
  index: '08',
  title: 'Give to the work.',
};

// EDIT HERE: Trust framing copy
const TRUST = {
  eyebrow: 'How it works',
  body: "We use Zeffy because Zeffy doesn't take a cut. 100% of what you give comes to the men. The optional tip on the donation form goes to Zeffy, not to us — you can adjust or remove it.",
};

export default function DonateNowPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
      />

      {/* ─── Zeffy donation iframe ─────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-12" />
        <p className="micro-label micro-label--brass mb-10">Donate</p>

        <ZeffyEmbed
          src={EXTERNAL.zeffyDonate}
          title="Donate to Our Father's House"
          variant="donate"
          height={1100}
        />
      </section>

      {/* ─── Trust + non-financial ways to give ────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
            <p className="micro-label micro-label--brass">{TRUST.eyebrow}</p>
          </div>
          <div className="md:col-span-9">
            <div className="mt-0 grid gap-6 sm:grid-cols-2">
              <div className="border border-hairline p-6">
                <p className="micro-label mb-3">By mail</p>
                <p
                  className="font-display text-fg"
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                </p>
                <p
                  className="font-mono mt-4 text-[0.625rem] uppercase leading-relaxed tracking-[0.22em]"
                  style={{ color: 'var(--fg-quiet)' }}
                >
                  Make checks payable to <br />
                  Our Father&rsquo;s House Inc.
                </p>
              </div>
              <div className="border border-hairline p-6">
                <p className="micro-label mb-3">Other ways to give</p>
                <ul className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  <li>
                    <Link href="/get-involved" className="link-brass">
                      Volunteer, mentor, host, hire — six ways in
                    </Link>
                  </li>
                  <li>
                    <Link href="/get-involved#newsletter" className="link-brass">
                      Sign up for the monthly newsletter
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="link-brass">
                      Talk to us about partnership
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 501(c)(3) line ────────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-8" />
        <p
          className="font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.22em]"
          style={{ color: 'var(--fg-muted)' }}
        >
          Our Father&rsquo;s House Inc. is a registered 501(c)(3) nonprofit
          based in Rhea County, Tennessee. EIN available on request. All
          donations are tax-deductible in full or part.
        </p>
      </section>
    </>
  );
}
