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
        // Hero-scale fluid. Mobile floor tuned to 40px so the line break reads
        // punchier on 390px width without overflowing two-word combinations.
        "hero": ["clamp(40px, 9vw, 80px)", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
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
