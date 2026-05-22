# OpenPaw Landing

Static-export Next.js landing page for **OpenPaw** — the open-source pet companion robot. Kickstarter launches **July 7, 2026**.

## Why a fresh repo (not `pawme-landing`)?

On May 22, 2026 the project pivoted from the closed-source PawMe positioning to an **open-source** OpenPaw positioning. The live `pawmebot.com` site (built from `/Users/sandy/pawme-landing/`) is preserved as-is and remains read-only; this repo is a clean slate so the new narrative, brand, and Kickstarter funnel can ship without entangling the existing deploy.

## Stack

Mirrors `pawme-landing` for compatibility (Next.js 14.2.18, React 18.3.1, TypeScript 5, Tailwind 3.4, framer-motion 11). Static export (`output: 'export'`) so it ships to GitHub Pages or any static host.

## Scripts

```bash
npm run dev     # next dev -p 3040
npm run build   # next build -> out/
npm run start   # next start -p 3040
```

## Subpath vs root-domain builds

Set `NEXT_PUBLIC_BASE_PATH` at build time:
- `""` (empty) for root-domain serving (e.g. `openpaw.io`)
- `"/openpaw-landing"` for the github.io preview URL

## Central config

Edit `lib/siteConfig.ts` to rename the project, swap domain/email, or update pricing in one place.

## Tracking

Three env-var placeholders exist in `lib/siteConfig.ts` (Meta Pixel, Clarity, n8n events webhook). All three are currently empty — Sandy will decide reuse-vs-fresh before launch.
