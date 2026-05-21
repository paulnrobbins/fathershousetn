import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { CONTACT } from '@/data/nav';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Call, email, or write to Our Father's House — for questions about the program, partnership, donations, or to apply.",
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /contact-us
 *
 * Mode 1 maintenance:
 *   - Edit phone, email, address in `data/nav.ts` (CONTACT export)
 *   - Edit page-level copy below
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Bridge · For everyone',
  index: '07',
  title: 'Talk with us.',
};

export default function ContactUsPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
      />

      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        <div className="grid gap-12 md:grid-cols-3 md:gap-x-10">
          {/* ─── Email ─────────────────────────────────────────────── */}
          <div>
            <p className="micro-label mb-4">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-brass font-display break-all text-fg"
              style={{
                fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {CONTACT.email}
            </a>
          </div>

          {/* ─── Phone ─────────────────────────────────────────────── */}
          <div>
            <p className="micro-label mb-4">Phone</p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="link-brass font-display text-fg"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {CONTACT.phone}
            </a>
          </div>

          {/* ─── Mail ──────────────────────────────────────────────── */}
          <div>
            <p className="micro-label mb-4">Mail</p>
            <address
              className="font-display not-italic text-fg"
              style={{
                fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Our Father&rsquo;s House Inc.
              <br />
              {CONTACT.address.line1}
              <br />
              {CONTACT.address.line2}
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
