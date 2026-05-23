import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Tracking from "@/components/Tracking";
import StickyTopBar from "@/components/StickyTopBar";
import { PROJECT_NAME, PROJECT_TAGLINE, DOMAIN } from "@/lib/siteConfig";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono is only used in small chip/label widgets — skip the auto-preload so we
// don't ship 100KB of font for first paint that doesn't need it.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `${PROJECT_NAME} — ${PROJECT_TAGLINE}`,
  description: `${PROJECT_NAME}: ${PROJECT_TAGLINE}. Kickstarter launching July 7, 2026.`,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.png` },
  openGraph: {
    title: `${PROJECT_NAME} — ${PROJECT_TAGLINE}`,
    description: `${PROJECT_NAME}: ${PROJECT_TAGLINE}.`,
    url: `https://${DOMAIN}`,
    siteName: PROJECT_NAME,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-paper text-ink">
        <StickyTopBar />
        {children}
        <Tracking />
      </body>
    </html>
  );
}
