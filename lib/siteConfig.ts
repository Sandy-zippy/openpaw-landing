// Central project config — change PROJECT_NAME on line 1 below to rename the
// whole site in one place. Everything user-visible should pull from here.

export const PROJECT_NAME = "OpenPaw";       // change this one line to rename
export const PROJECT_TAGLINE = "The open-source AI companion";
export const DOMAIN = "openpaw.io";           // TBD — placeholder
export const SUPPORT_EMAIL = "hi@openpaw.io"; // TBD — placeholder
export const KICKSTARTER_LAUNCH_DATE = "2026-07-07";
export const SHIP_DATE = "December 2026";
export const FUNDING_GOAL_USD = 1_000_000;

// Brand strings & socials (placeholders — TODO Sandy: confirm)
export const REPO_URL = "https://github.com/openpaw"; // TODO Sandy: confirm GitHub org
export const DISCORD_URL = "https://discord.gg/openpaw"; // TODO Sandy: confirm
export const FORUM_URL = "https://forum.openpaw.io"; // TODO Sandy: confirm
export const HACKSTER_URL = "https://hackster.io/openpaw"; // TODO Sandy: confirm
export const TWITTER_URL = "https://twitter.com/openpaw"; // TODO Sandy: confirm
export const INSTAGRAM_URL = "https://instagram.com/openpaw"; // TODO Sandy: confirm
export const KICKSTARTER_URL = "https://kickstarter.com/projects/openpaw"; // TODO Sandy: confirm
export const BUILT_BY = "Ayva Labs";
export const BUILT_LOCATION = "Hyderabad + remote";

// Stripe — TODO Sandy: decide reuse vs fresh post-build
export const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

// Tracking — leave as TODO for Sandy to decide reuse vs fresh
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""; // TODO Sandy: reuse 1957428058474676 from PawMe, or new pixel?
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""; // TODO Sandy: reuse wmeree76xu from PawMe, or new?
export const EVENTS_WEBHOOK_URL = process.env.NEXT_PUBLIC_EVENTS_WEBHOOK_URL ?? ""; // TODO Sandy: reuse pawme n8n webhook, or new endpoint?

// Pricing — locked May 22, 2026 pivot. Deposit hard-dropped from $5 → $1.
export const PRICING = {
  vipEarlyBird: 199,
  vipDeposit: 1,
  vipRemainder: 198,
  vipLimit: 500,
  vipClaimed: 247, // TODO Sandy: wire live count via API or daily snapshot
  kickstarterEarlyBird: 250,
  kickstarterLimit: 2000,
  retail: 399,
} as const;

// Shipping country list intentionally removed — Stripe Checkout collects
// shipping country/address on its hosted page so we don't need to gate on it.

// Roadmap milestones — single source for Section 6
export const ROADMAP = [
  { date: "May 2026", label: "Prototype v3", status: "done" as const, isHere: true },
  { date: "June 2026", label: "SDK public beta", status: "done" as const },
  { date: "July 2026", label: "Kickstarter launch", status: "half" as const },
  { date: "Aug 2026", label: "Manufacturing tooling", status: "todo" as const },
  { date: "Oct 2026", label: "Backer firmware preview", status: "todo" as const },
  { date: "Dec 2026", label: "Units ship", status: "todo" as const },
];

// Aggregate export for components that prefer a single `siteConfig` object,
// mirroring the shape pawme-landing's Tracking.tsx expects so the shim file
// can compile against the same surface.
export const siteConfig = {
  projectName: PROJECT_NAME,
  projectTagline: PROJECT_TAGLINE,
  domain: DOMAIN,
  supportEmail: SUPPORT_EMAIL,
  kickstarterLaunchDate: KICKSTARTER_LAUNCH_DATE,
  shipDate: SHIP_DATE,
  fundingGoalUsd: FUNDING_GOAL_USD,
  pricing: PRICING,
  roadmap: ROADMAP,
  repoUrl: REPO_URL,
  discordUrl: DISCORD_URL,
  forumUrl: FORUM_URL,
  hacksterUrl: HACKSTER_URL,
  twitterUrl: TWITTER_URL,
  instagramUrl: INSTAGRAM_URL,
  kickstarterUrl: KICKSTARTER_URL,
  builtBy: BUILT_BY,
  builtLocation: BUILT_LOCATION,
  stripePaymentLink: STRIPE_PAYMENT_LINK,
  eventsWebhookUrl: EVENTS_WEBHOOK_URL,
  tracking: {
    metaPixelId: META_PIXEL_ID,
    clarityProjectId: CLARITY_PROJECT_ID,
    gaMeasurementId: "" as string, // optional, not used yet
    eventsWebhookUrl: EVENTS_WEBHOOK_URL,
  },
} as const;
