import type { Metadata, Viewport } from "next";
import { fraunces, geistSans, geistMono } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Grain } from "@/components/ui/Grain";
import { Cursor } from "@/components/ui/Cursor";
import { ThemeApplier } from "@/components/ui/ThemeApplier";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fathershousetn.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Our Father's House — Christ-Centered Recovery in Rhea County, TN",
    template: "%s · Our Father's House",
  },
  description:
    "A Christ-centered recovery home for men released from jail in Rhea County, Tennessee. Welcome, dignity, hope made tangible, redemption made real.",
  applicationName: "Our Father's House",
  keywords: [
    "recovery home",
    "Christian recovery",
    "men's recovery",
    "Rhea County",
    "Tennessee",
    "Reformers Unanimous",
    "post-incarceration",
    "addiction recovery",
    "discipleship",
  ],
  openGraph: {
    title: "Our Father's House — From Prison to Purpose",
    description:
      "A Christ-centered recovery home for men in Rhea County, Tennessee. From prison to purpose.",
    url: SITE_URL,
    siteName: "Our Father's House",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Our Father's House — From prison to purpose. A Christ-centered recovery home in Rhea County, Tennessee.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Father's House — From Prison to Purpose",
    description: "A Christ-centered recovery home for men in Rhea County, Tennessee.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "nonprofit",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F12" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body data-theme="bridge" className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-brass focus:px-3 focus:py-2 focus:text-bg focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em]"
        >
          Skip to content
        </a>

        <LenisProvider>
          <ThemeApplier />
          <Cursor />
          <Grain />
          <Nav />
          <main id="main" className="relative z-[var(--z-content)]">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
