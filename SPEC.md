# OpenPaw v1 Landing Page — Build Spec

**Version:** v1 (initial build)
**Status:** Locked for implementation
**Working name:** OpenPaw (single-source via `lib/siteConfig.ts`)
**Date:** 2026-05-22

---

## North Star

OpenPaw is an **open-source pet companion robot**. The page reads like Reachy Mini's Kickstarter (research-lab credibility, exposed hardware, clean technical diagrams) crossed with Playdate by Panic (warm flat color, isometric product hero, playful editorial copy, big confident type). Not a consumer SaaS landing page — a **hardware product story page** with developer credibility and pet warmth woven through.

Two audiences read this page side-by-side:
1. **The maker/dev** who saw it on Hacker News / Hackaday — wants hardware specs, code, license, repo.
2. **The pet owner** who saw it on Instagram — wants to see it interact with a dog, know it ships, know it's safe.

Every section serves both. Code sits next to warm pet B-roll. Specs sit next to a wagging tail.

---

## Section 1 — Hero (`HeroOpenPaw`)

**Purpose:** In one screen: open-source + pet companion robot + ships Dec 2026 + reserve VIP.

**Copy direction — 3 headline options:**
1. "The open-source robot that loves your pet back." / Sub: A 5-inch desktop companion with eyes, ears, and a brain you can rewrite. Ships December 2026. Reserve a unit for $5.
2. **(RECOMMENDED)** "Meet OpenPaw. The first open-source pet companion robot." / Sub: Hardware specs you can download. Firmware you can fork. A robot your dog actually likes.
3. "Your pet deserves better than a Wi-Fi camera." / Sub: OpenPaw is a 5-inch open-source robot built to live with your pet. Open hardware. Open firmware. Open community.

**Use option 2 by default.**

**Visual elements:**
- Single **large isometric hero render** of the OpenPaw robot on flat warm cream background. No drop shadow. No environment. Reference: Playdate by Panic homepage hero — one product, one color, breathing room. Front-three-quarter view, expressive face tilted toward visitor.
- Above-the-fold secondary: **looping 6-second silent video** of robot tracking a small dog. Muted, autoplay, loop. Reference: Reachy Mini Hugging Face product page.
- "Backed by [the open-source community]" partner row — placeholder logos at 40% opacity (only ship logos we can legitimately claim by launch).

**CTAs:**
- Primary: **Reserve VIP — $5 deposit** (opens `VIPGate` modal/section).
- Secondary ghost link: **View on GitHub** (anchor or new tab once repo live).

**Components:** `HeroOpenPaw`, `HeroRender`, `HeroLoopVideo`, `CTAPrimary`, `CTAGhost`, `PartnerStrip`, `ScrollHint`.

**Motion:** Two motions only — the looping product video + a 2px ScrollHint bob. Hero render is static. No parallax, no mouse-tilt, no particles.

---

## Section 2 — The Problem (`ProblemStrip`)

**Purpose:** Earn the right to be a robot. Frame why cameras + treat dispensers are insufficient and why the existing PawMe app is the digital layer that proves the physical layer is needed.

**Copy:**
- Headline: **"A camera watches. A robot belongs."**
- Three blocks, 2 sentences max each:
  1. **They live in the room with you.** A Wi-Fi camera films from a corner. A companion shares the space — moves, listens, responds.
  2. **Health doesn't wait for the vet visit.** OpenPaw runs on-device vision and audio. It notices the limp, the cough, the unusual silence at 3am.
  3. **The phone app is only half the answer.** We built the PawMe app (photo onboarding, vaccination scan, vet finder, AI symptom check) — and watched owners hit a ceiling. The ceiling is hardware.

**Visual:** Three-column desktop, vertical stack mobile. Each block paired with a **thin-line technical diagram** in single accent color, not stock icons. Reference: Mecha Comet feature icons — line-art, single weight, geometric. Center divider: quiet horizontal rule with a 4px lime dot.

**Components:** `ProblemStrip`, `ProblemBlock`, `LineDiagram` (svg, 1.5px stroke).

**Motion:** Enter-fade only.

---

## Section 3 — What OpenPaw Is (`ProductReveal`)

**Purpose:** Establish this is a real, photographable, shippable robot — not vapor. Show three angles. Confirm hardware AND open platform.

**Copy:**
- Eyebrow tag: `OPEN HARDWARE / OPEN FIRMWARE / OPEN COMMUNITY`
- Headline: **"A 5-inch desktop companion. Every byte of it is yours to rewrite."**
- Sub: OpenPaw is a fully assembled robot you can use out of the box — and a published hardware platform (BOM, STEP files, PCB schematics, firmware source) you can fork, mod, and reprint.
- Stat tiles: **127mm** tall · **6 DOF** of expressive movement · **On-device** LLM + vision · **MIT-licensed** firmware *(license TBD)*

**Visual:**
- **Horizontal scroll-snap gallery** of 3–4 real product photographs (or final hero renders if photos not ready):
  1. Front view, eyes lit warm white
  2. Side view, neck mid-rotation
  3. Top-down showing speaker grille + sensor array
  4. Hand-scale: robot next to a coffee mug on a desk, cat in soft focus background
- Reference: Reachy Mini Hugging Face product gallery — clean white backdrop, consistent lighting.
- Beneath: **link strip** — *Download BOM · Download STEP files · GitHub repo* (small mono caps).

**Components:** `ProductReveal`, `ProductGallery` (scroll-snap), `StatTile`, `LinkStrip`.

**Motion:** Scroll-snap gallery. Optional stat numbers count up on enter (once).

---

## Section 4 — Hardware Breakdown (`SensorMap`)

**Purpose:** Maker credibility. Real engineering, not a Bluetooth toy.

**Copy:**
- Headline: **"The hardware, in the open."**
- Sub: Every sensor, every chip, every degree of freedom — annotated, documented, and downloadable.

**Visual:** Large **annotated exploded-view diagram** ~70% width desktop. 8–10 callouts:
- 1080p wide-FOV camera (front face)
- 4-mic array (top)
- Full-range speaker (chest)
- Temperature + ambient light sensor
- 6-axis IMU
- 2-DOF neck servos + 4-DOF body actuators
- Edge LLM compute (Gemma-3-class on-device, 4B params quantized) *(exact chip TBD)*
- MCP connector ports (USB-C, micro-HDMI debug)
- 3D-printable shell (PETG/PLA, STL provided)
- Battery + USB-C charging

Reference: Reachy Mini Kickstarter exploded view + Open Duck Mini JLCPCB annotated PCB style. Below diagram: small "Powered by [chip vendor]" strip (only if confirmed).

**Components:** `SensorMap` (SVG-based hoverable callouts), `Callout`, `ChipStrip`.

**Motion:** Hover callout → label highlights, line thickens 1px, tooltip with one extra sentence. Mobile: callouts collapse into tap-to-expand stacked list beneath static diagram.

---

## Section 5 — The Open SDK (`SDKPlayground`)

**Purpose:** Convert the dev/maker in 30 seconds. Show code on the page. Make them imagine writing it tonight.

**Copy:**
- Headline: **"Teach it a new behavior in 20 lines."**
- Sub: The OpenPaw SDK is Python-first, MCP-ready, and ships with 12 starter behaviors. Fork one, change a few lines, flash it back.

**Visual: 60/40 side-by-side (stacked mobile):**
- Left (60%): **Real syntax-highlighted code block** showing a working "wag tail when name is called" behavior, 18–22 lines Python. Mono font (JetBrains Mono). Background: very dark slate `#1A1B1F` (the only dark surface on the page). Line numbers + tiny `behaviors/wag_on_call.py` filename tab.
- Right (40%): **4-second silent loop video** of robot performing exactly that behavior. Code-to-result causality is the entire point.
- Reference: Playdate dev page — code in-context next to device executing it. Mecha Comet developer section.
- Below: 3 chip tags — `Python SDK · MCP-compatible · Flash-over-USB`

**Components:** `SDKPlayground`, `CodeBlock` (prism-react-renderer, server-rendered), `BehaviorClipVideo`, `ChipTag`.

**Motion:** Do not animate the code. Subtle blinking cursor on the last line OK. The looping video does the work.

---

## Section 6 — Community + Roadmap (`CommunityRoadmap`)

**Purpose:** Prove the community moat is real (or will be by launch) and roadmap is public.

**Copy:**
- Headline: **"Built in public. Shipped together."**
- Sub: Our goal: **100 community-built behaviors live on launch day**. Join the build.

**Visual:**
- Left column: vertical **public roadmap** as 6 stacked `RoadmapItem` cards:
  - ✅ May 2026 — Prototype v3 (we are here)
  - ✅ June 2026 — SDK public beta
  - ◐ July 2026 — Kickstarter launch
  - ○ Aug 2026 — Manufacturing tooling
  - ○ Oct 2026 — Backer firmware preview
  - ○ Dec 2026 — Units ship
- Right column: 3 **community CTA tiles**:
  - **Discord** (live member count via widget API or hardcoded)
  - **GitHub** (star count if repo live, else "Repo opens June 2026")
  - **Forum / Discourse** ("Forum opens with launch")
- Reference: Reachy Mini community strip + Hackster.io "follow build log" pattern.

**Components:** `CommunityRoadmap`, `RoadmapItem`, `CommunityTile`, `LiveCounter`.

**Motion:** Roadmap items have status dot (filled/half/hollow). On scroll into view, "we are here" gets a single quiet pulse — once.

---

## Section 7 — Pricing Tiers (`PricingTable`)

**Purpose:** Convert the buyer past the story, ready to commit. Honest about Kickstarter risk.

**Copy:**
- Headline: **"Three ways in."**
- Sub: Lock your unit now. Ship target: December 2026. Full refund any time before manufacturing tooling begins (Aug 2026).

| Tier | Price | Headline | Bullets |
|---|---|---|---|
| **VIP Super Early Bird** | **$189** | Reserve with $5 today | Saves $210 vs retail · 500 units only · $184 due on Kickstarter launch · Discord founders-channel access · Limited to first 500 |
| **Kickstarter Early Bird** | **$250** | Available July 7, 2026 | Saves $149 vs retail · First 2,000 backers · Standard color: warm cream · Ships Dec 2026 |
| **Retail** | **$399** | Post-campaign D2C | Available Q1 2027 · All colorways · Pre-order list opens with Kickstarter |

Below table: **trust strip** — "Built by Ayva Labs · Manufactured by [TBD partner] · Refund anytime before tooling starts"

**Visual:** Middle (VIP) card visually emphasized — slightly larger, lime accent border, "MOST POPULAR" ribbon. Reference: Playdate Stereo Dock pricing block. Below: shipping/refund FAQ teaser linking into §9.

**Components:** `PricingTable`, `PricingTier`, `TrustStrip`, `RibbonBadge`.

**Motion:** None. Pricing must feel rock-solid.

---

## Section 8 — VIP Waitlist Gate (`VIPGate`)

**Purpose:** The conversion point. Email + $5 deposit. Mirrors pawmebot.com Stripe + n8n + KIT flow conceptually.

**Copy:**
- Headline: **"Lock in $189. Refundable any time."**
- Sub: 247 / 500 VIP spots claimed. Pay $5 today, $184 on Kickstarter launch day. Cancel and get every cent back, any time before December.
- Form: email (required), country (dropdown, required for shipping).
- Button: **Reserve VIP — $5** → opens Stripe checkout in new tab.
- Beneath form: tiny copy — "We don't sell your email. We don't run ads. Unsubscribe in one click."

**Visual:** Two-column — left form + headline, right **live counter** with thin horizontal progress bar (claimed / 500). Updates live via websocket if feasible, else daily snapshot. Beneath right: 3 micro-testimonial quotes (real, from VIP-list responses) with name + city only, no photos. Reference: Mecha Comet pre-order block — quiet, confident, no urgency theater.

**Components:** `VIPGate`, `EmailField`, `CountrySelect`, `VIPCounter`, `MicroTestimonial`.

**Motion:** Counter ticks up with single number-roll on enter. NO fake-urgency timers. The counter is the urgency.

---

## Section 9 — FAQ (`FAQ`)

**Purpose:** Eliminate remaining objections. 8 questions max. Answers 2–4 sentences each.

**Q list:**
1. **What's the open-source license?** *(MIT firmware + CERN-OHL hardware placeholder)*
2. **Is it really open hardware?** STEP files, BOM, PCB schematics, firmware source all published on GitHub at launch.
3. **Why a robot — can't a smart speaker do this?** Speakers don't move, can't see, can't follow your pet from room to room. OpenPaw can.
4. **Will it work with my cat?** Yes. Behaviors ship for dogs, cats, small mammals. Birds and reptiles are community-roadmap.
5. **Can I get a refund?** Yes, any time before manufacturing tooling begins August 2026. After that, case-by-case.
6. **When does it ship?** December 2026 for Kickstarter backers. Q1 2027 for D2C retail.
7. **Where is it built?** Final assembly in [TBD]. PCB by JLCPCB *(TBD)*.
8. **Do I need to code to use it?** No. 12 behaviors ship pre-installed. Coding unlocks the next 100.

**Visual:** Accordion list, one open by default (the license question — devs scan first). Reference: Playdate FAQ — quiet typography, generous line height, `+ / –` toggle only.

**Components:** `FAQ`, `FAQItem` (accordion).

**Motion:** Smooth 200ms height transition on expand/collapse. Nothing else.

---

## Section 10 — Footer (`Footer`)

**Copy:**
- Left: small OpenPaw wordmark + "Built by Ayva Labs · Hyderabad + remote" + © 2026
- Center: link columns
  - **Product:** Hardware · SDK · Roadmap · Pricing
  - **Build:** GitHub · Discord · Forum · Hackster page
  - **Company:** About · Press kit · `hi@openpaw.io` · Privacy · Terms
  - **Updates:** Twitter · Instagram · Kickstarter (pre-launch)
- Right: thin newsletter signup ("monthly build log, no spam") — separate from VIP gate.

**Visual:** Single horizontal divider above. No big footer art. Reference: play.date footer.

**Components:** `Footer`, `FooterColumn`, `NewsletterMini`.

**Motion:** None.

---

## Aesthetic System

### Color palette
- **Cream paper** `#F5F1E8` — primary background. Warm, not white.
- **Charcoal ink** `#1A1B1F` — primary type + SDK code surface. Near-black with warm tint, never pure `#000`.
- **Lime spark** `#C8E94B` — single accent. CTA fill, "you are here" roadmap dot, VIP ribbon, hover underlines. Used sparingly — if more than ~6% of viewport is lime at any scroll position, reduce.
- Utility: `#E8E2D2` (paper-shadow, card surface elevation), `#6B6B70` (muted ink, sub-copy).

### Typography (Google Fonts, both free, via `next/font/google`)
- **Headings:** **Space Grotesk** — 600/700. Hero scale: `clamp(48px, 7vw, 96px)`. Tracking: -0.02em.
- **Body:** **Inter** — 400/500. Line height 1.6. 17px desktop, 16px mobile.
- **Mono (code + chip tags + small caps labels):** **JetBrains Mono** — 500. 14px in code, 11px uppercase letterspaced for eyebrow tags.

### Spacing scale
8-point base. Section vertical padding: 120px desktop / 80px mobile. Component gap: 24px. Type rhythm: headline → sub-headline 16px; sub-headline → body 32px.

### Border-radius philosophy
- Cards + pricing tiles: **16px**
- Buttons: **999px** (pill)
- Code block + image frames: **8px**
- Product render: no frame, no radius — floats on paper.

### Surface treatment
**Paper-first, flat, no glass.** No gradients in UI surfaces. No drop shadows except quiet `0 1px 2px rgba(26,27,31,0.06)` on elevated cards (pricing, community tiles). Only dark surface is the SDK code block (§5). One contrasting dark moment > ten medium-toned cards.

### Brand config (rename safety)
All brand strings (name, domain, email, repo URL, social handles) read from `lib/siteConfig.ts` so the rename from OpenPaw → final name is one-file. Logo SVG is a single `<OpenPawWordmark />` component.

---

## Mobile Considerations

- **Hero:** Product render scales to 90vw, loop video drops below (full-width). CTA full-width pill.
- **Problem strip (§2):** 3-column → vertical stack.
- **Product gallery (§3):** scroll-snap stays — works beautifully on touch.
- **Sensor map (§4):** annotated diagram → static image + tap-to-expand stacked callout list beneath.
- **SDK playground (§5):** code on top, video below. Code block horizontally scrollable (do not shrink type below 13px).
- **Roadmap + community (§6):** roadmap stacks above community tiles.
- **Pricing (§7):** 3-card row → stacked. VIP card keeps lime border + ribbon.
- **VIP gate (§8):** form full-width, counter above form.
- **FAQ + footer:** unchanged structure, tighter padding.
- **Sticky bottom bar (mobile only, <768px):** thin pill — "Reserve VIP — $5 · 247/500 claimed" → scrolls to §8.

---

## Implementation guardrails

- **Do NOT touch** `/Users/sandy/pawme-landing/` or `pawmebot.com`. Read-only on that repo.
- **Do NOT push to GitHub.** Sandy reviews locally first.
- Reuse Pixel/Clarity/n8n IDs from PawMe via env vars — leave TODO comments in `lib/siteConfig.ts` (Sandy will decide reuse vs fresh post-build).
- License placeholders: MIT (firmware) + CERN-OHL (hardware). Mark `[TBD]` in copy.
- Real product photography unavailable — use isometric illustrative renders with TODO swap notes. Acceptable per Playdate/Reachy precedent.
- All copy is directional. Mark in JSX with `{/* COPY: directional, owner=Sandy */}` so Sandy can find + revise easily.
- Counter values, testimonial quotes, partner logos: use placeholders. Mark TODOs.

## Reference files in pawme-landing (read-only)
- `components/EmailGate.tsx` — model for `VIPGate` (Stripe + n8n + KIT funnel)
- `components/Tracking.tsx` — Pixel + Clarity + CAPI dedup pattern
- `lib/eventId.ts` — event_id + fbp/fbc/UTM capture
- `lib/siteConfig.ts` — shape of the central config
- `next.config.mjs` — static-export + basePath pattern
