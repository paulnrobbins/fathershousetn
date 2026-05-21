"use client";

import Link from "next/link";
import { mainNavItems, SOCIAL } from "@/data/nav";

/**
 * Footer
 * Editorial layout — contact info upgraded from the original site's afterthought
 * footer to a real closing statement. Newsletter signup replaced with social
 * media links per Paul's request. Reduced-motion-friendly.
 */
export function Footer() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+14232855096";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "fathershousetn@gmail.com";
  const phoneDisplay = "(423) 285-5096";

  return (
    <footer className="relative border-t border-[var(--rule)] bg-bg text-fg">
      <div className="container-edge py-section">
        {/* Closing statement */}
        <div className="mb-16 max-w-3xl">
          <p className="micro-label micro-label--brass mb-6">501(c)(3) — Rhea County, Tennessee</p>
          <p className="font-display text-display-sm text-balance text-fg">
            From prison to purpose, by the grace of God and the support of His people.
          </p>
        </div>

        <div className="rule-h mb-16" aria-hidden="true" />

        {/* Three-column editorial grid */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-8">
          {/* Contact */}
          <div className="md:col-span-4">
            <p className="micro-label mb-5">Contact</p>
            <address className="not-italic space-y-1.5 text-base text-[var(--fg-muted)]">
              <p className="text-fg">Our Father&rsquo;s House Inc.</p>
              <p>PO Box 7</p>
              <p>Evensville, TN 37332</p>
              <p className="pt-3">
                <a href={`tel:${phone}`} className="link-brass">
                  {phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${email}`} className="link-brass break-all">
                  {email}
                </a>
              </p>
            </address>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="micro-label mb-5">Sitemap</p>
            <ul className="space-y-2.5">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-[var(--fg-muted)] transition-colors duration-300 hover:text-brass"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow — social media */}
          <div className="md:col-span-4">
            <p className="micro-label mb-5">Follow</p>
            <p className="mb-5 text-base text-[var(--fg-muted)]">
              Stories from the house, upcoming events, and ways to support our work.
            </p>
            {/* EDIT HERE: To change or add a social platform, edit
                the SOCIAL object in data/nav.ts. */}
            <ul className="space-y-3">
              <li>
                <a
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-brass font-mono inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
                  </svg>
                  <span>YouTube</span>
                  <span aria-hidden="true" className="ml-0.5">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-brass font-mono inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                  <span aria-hidden="true" className="ml-0.5">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-h mt-16 mb-8" aria-hidden="true" />

        {/* Copyright + meta */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--fg-quiet)]">
            © {new Date().getFullYear()} Our Father&rsquo;s House Inc. — All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--fg-quiet)]">
            All donations tax-deductible in full or part.
          </p>
        </div>
      </div>
    </footer>
  );
}
