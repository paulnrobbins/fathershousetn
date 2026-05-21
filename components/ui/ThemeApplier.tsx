"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getThemeForPath } from "@/data/nav";

/**
 * ThemeApplier
 * Reads the current pathname and applies the corresponding cold/warm/bridge
 * theme to <body>. CSS variables in globals.css cascade from there.
 *
 * Phase 1 IA mapping (data/nav.ts):
 *  - COLD pages: Future Applicants, FAQs
 *  - WARM pages: Testimonies, Get Involved, About Us, Pictures & Video, Donate Now
 *  - BRIDGE: Home, Contact Us
 *
 * On the home page the theme is dynamically driven by scroll progress
 * (Phase 3) — this applier sets the initial state to "bridge" / cold.
 */
export function ThemeApplier() {
  const pathname = usePathname();

  useEffect(() => {
    const theme = getThemeForPath(pathname);
    document.body.dataset.theme = theme;
  }, [pathname]);

  return null;
}
