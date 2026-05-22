import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // OpenPaw palette — PawMe brand continuation (May 22 pivot).
        // Variable name `lime` retained for code-compat but value is PawMe green.
        paper: "#FFF8F0",          // warm PawMe cream (was #F5F1E8 ZippyScale)
        paperShadow: "#F4ECDE",    // tan-tinted card elevation (was #E8E2D2)
        ink: "#0E1E2E",            // PawMe navy (was #1A1B1F ZippyScale charcoal)
        inkMuted: "#4A5D75",       // muted navy-slate (was #6B6B70 grey)
        lime: "#04DA8D",           // PawMe brand green — primary accent (was #C8E94B lime)
        brandBlue: "#0085FF",      // PawMe secondary accent for code highlights + dual CTAs
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Eyebrow/mono caps
        "eyebrow": ["11px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        // Hero-scale fluid
        "hero": ["clamp(44px, 5.6vw, 80px)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(40px, 5.5vw, 72px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(32px, 4vw, 52px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(24px, 3vw, 36px)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      spacing: {
        section: "120px",
        sectionMobile: "80px",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        soft: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,27,31,0.06)",
        cardHover: "0 2px 8px rgba(26,27,31,0.08)",
      },
      maxWidth: {
        shell: "1240px",
      },
    },
  },
  plugins: [],
};
export default config;
