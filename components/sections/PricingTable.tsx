"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import CTAPrimary from "@/components/primitives/CTAPrimary";
import CTAGhost from "@/components/primitives/CTAGhost";
import { PRICING } from "@/lib/siteConfig";

type Tier = {
  name: string;
  price: number;
  priceSuffix?: string;
  headline: string;
  bullets: string[];
  cta: string;
  ctaKind: "primary" | "ghost" | "muted";
  available: boolean;
  highlighted?: boolean;
  ribbon?: string;
};

const tiers: Tier[] = [
  {
    name: "VIP Super Early Bird",
    price: PRICING.vipEarlyBird,
    headline: `Reserve with $${PRICING.vipDeposit} today`,
    bullets: [
      `Saves $${PRICING.retail - PRICING.vipEarlyBird} vs retail`,
      `${PRICING.vipLimit} units only`,
      `$${PRICING.vipRemainder} due on Kickstarter launch`,
      "Private founders channel access",
      `Limited to first ${PRICING.vipLimit}`,
    ],
    cta: `Reserve VIP — $${PRICING.vipDeposit}`,
    ctaKind: "primary",
    available: true,
    highlighted: true,
    ribbon: `${PRICING.vipLimit - PRICING.vipClaimed} of ${PRICING.vipLimit} left`,
  },
  {
    name: "Kickstarter Early Bird",
    price: PRICING.kickstarterEarlyBird,
    headline: "Available July 7, 2026",
    bullets: [
      `Saves $${PRICING.retail - PRICING.kickstarterEarlyBird} vs retail`,
      `First ${PRICING.kickstarterLimit.toLocaleString()} backers`,
      "Standard color: warm cream",
      "Ships Dec 2026",
    ],
    cta: "Notify me on launch",
    ctaKind: "ghost",
    available: false,
  },
  {
    name: "Retail",
    price: PRICING.retail,
    headline: "Post-campaign D2C",
    bullets: [
      "Available Q1 2027",
      "All colorways",
      "Pre-order list opens with Kickstarter",
    ],
    cta: "Join pre-order list",
    ctaKind: "ghost",
    available: false,
  },
];

type Props = {
  onReserveClick: () => void;
};

function TierCard({
  tier,
  onReserveClick,
  reduced,
}: {
  tier: Tier;
  onReserveClick: () => void;
  reduced: boolean;
}) {
  const baseClasses =
    "relative flex h-full flex-col rounded-card border bg-paper p-7 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-cardHover";
  const visualClass = tier.highlighted
    ? "border-lime shadow-card lg:scale-[1.03] hover:border-lime hover:shadow-[0_8px_30px_rgba(4,218,141,0.18)]"
    : "border-ink/10 shadow-card hover:border-ink/25";

  return (
    <article className={`${baseClasses} ${visualClass}`}>
      {tier.ribbon && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={`mono-caps rounded-pill px-3 py-1 text-ink ${
              reduced ? "bg-lime" : "ribbon-sweep"
            }`}
          >
            {tier.ribbon}
          </span>
        </div>
      )}

      <div className="mono-caps text-[12px] font-700 tracking-[0.18em] text-ink">
        {tier.name}
        {tier.highlighted && (
          <span aria-hidden="true" className="ml-2 inline-block h-[6px] w-[24px] translate-y-[-2px] rounded-sm bg-lime align-middle" />
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-[52px] font-700 leading-none tracking-tight text-ink md:text-[56px]">
          ${tier.price}
        </span>
        {tier.priceSuffix && (
          <span className="font-body text-[14px] text-inkMuted">{tier.priceSuffix}</span>
        )}
      </div>
      <div className="mt-2 font-body text-[15px] text-inkMuted">
        {/* COPY: directional, owner=Sandy */}
        {tier.headline}
      </div>

      <ul className="mt-7 flex flex-1 flex-col gap-3">
        {tier.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 font-body text-[15px] leading-[1.55] text-ink">
            <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime" />
            {/* COPY: directional, owner=Sandy */}
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {tier.ctaKind === "primary" ? (
          <CTAPrimary fullWidth onClick={onReserveClick}>
            {tier.cta}
          </CTAPrimary>
        ) : (
          <CTAGhost onClick={tier.ctaKind === "ghost" ? onReserveClick : undefined} className="w-full">
            {tier.cta}
          </CTAGhost>
        )}
      </div>
    </article>
  );
}

export default function PricingTable({ onReserveClick }: Props) {
  const reduced = useReducedMotion() ?? false;
  // Order tiers visually (Kickstarter / VIP / Retail) so the stagger reads
  // left-to-right on lg. VIP card is index 1 (the center column).
  const ordered: Array<{ tier: Tier; orderClass: string }> = [
    { tier: tiers[1], orderClass: "lg:order-1" },
    { tier: tiers[0], orderClass: "lg:order-2" },
    { tier: tiers[2], orderClass: "lg:order-3" },
  ];

  return (
    <SectionShell id="pricing" spacing="spacious">
      <motion.header
        initial={reduced ? { opacity: 1 } : { opacity: 1, y: 12 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-[760px] text-center"
      >
        <EyebrowLabel className="mb-5 justify-center">PRICING</EyebrowLabel>
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Three ways to lock your unit.
        </h2>
        <p className="mt-5 font-body text-[17px] leading-[1.6] text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          Lock your unit now. Ship target: December 2026. Full refund any time
          before manufacturing tooling begins (Aug 2026).
        </p>
      </motion.header>

      <div className="mt-16 grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:items-stretch">
        {ordered.map(({ tier, orderClass }, i) => (
          <motion.div
            key={tier.name}
            initial={reduced ? { opacity: 1 } : { opacity: 1, y: 18, scale: 0.96 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={orderClass}
          >
            <TierCard tier={tier} onReserveClick={onReserveClick} reduced={reduced} />
          </motion.div>
        ))}
      </div>

      {/* Trust strip */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
        <span className="mono-caps text-inkMuted">Built by Ayva Labs</span>
        <span className="hidden h-3 w-px bg-ink/15 md:inline-block" />
        <span className="mono-caps text-inkMuted">Manufactured in India</span>
        <span className="hidden h-3 w-px bg-ink/15 md:inline-block" />
        <span className="mono-caps text-inkMuted">Refund anytime before tooling starts</span>
      </div>

      <div className="mt-6 text-center">
        <a href="#faq" className="mono-caps text-ink underline-offset-4 hover:underline">
          Shipping + refund FAQ ↓
        </a>
      </div>
    </SectionShell>
  );
}
