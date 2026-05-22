"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAPrimary from "@/components/primitives/CTAPrimary";
import CTAGhost from "@/components/primitives/CTAGhost";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import OpenPawWordmark from "@/components/primitives/OpenPawWordmark";
import { REPO_URL, SHIP_DATE } from "@/lib/siteConfig";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  onReserveClick: () => void;
};

export default function HeroOpenPaw({ onReserveClick }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Top utility row: wordmark + small github link */}
      <div className="mx-auto flex w-full max-w-shell items-center justify-between px-6 pt-8 md:px-10 md:pt-10">
        <OpenPawWordmark size="md" />
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#hardware" className="mono-caps text-inkMuted transition-colors hover:text-ink">Hardware</a>
          <a href="#sdk" className="mono-caps text-inkMuted transition-colors hover:text-ink">SDK</a>
          <a href="#roadmap" className="mono-caps text-inkMuted transition-colors hover:text-ink">Roadmap</a>
          <a href="#pricing" className="mono-caps text-inkMuted transition-colors hover:text-ink">Pricing</a>
          <a href="#faq" className="mono-caps text-inkMuted transition-colors hover:text-ink">FAQ</a>
        </nav>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-caps hidden text-inkMuted transition-colors hover:text-ink md:block"
        >
          GitHub →
        </a>
      </div>

      <div className="mx-auto w-full max-w-shell px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
          {/* Left — copy column */}
          <div>
            <EyebrowLabel tone="lime" className="mb-6">
              {/* COPY: directional, owner=Sandy */}
              Ships {SHIP_DATE} · Built in the open
            </EyebrowLabel>

            <h1 className="font-display font-700 text-hero text-ink">
              {/* COPY: directional, owner=Sandy */}
              Meet OpenPaw. <span className="text-ink/85">The first open-source pet companion robot.</span>
            </h1>

            <p className="mt-8 max-w-[540px] font-body text-[18px] leading-[1.55] text-inkMuted md:text-[19px]">
              {/* COPY: directional, owner=Sandy */}
              Hardware specs you can download. Firmware you can fork. A robot
              your dog actually likes.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <CTAPrimary onClick={onReserveClick} ariaLabel="Reserve VIP unit for $5 deposit">
                Reserve VIP — $5 deposit →
              </CTAPrimary>
              <CTAGhost href={REPO_URL} external>
                View on GitHub
              </CTAGhost>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <span className="mono-caps text-inkMuted">Backed by</span>
              {/* COPY: directional, owner=Sandy */}
              <PartnerRow />
            </div>
          </div>

          {/* Right — hero render (real PawMe robot mockup, no dog) */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-[460px] w-full max-w-[520px] md:h-[560px]">
              <Image
                src={`${BASE_PATH}/assets/bot-left.png`}
                alt="OpenPaw robot — front three-quarter view"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <ScrollHint />
      </div>
    </section>
  );
}

function PartnerRow() {
  // {/* COPY: directional, owner=Sandy */}
  // TODO: replace placeholder strings with verified partner SVGs (40% opacity)
  const partners = ["HACKADAY", "HACKSTER", "OSHWA", "JLCPCB"];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 opacity-40">
      {partners.map((p) => (
        <span key={p} className="mono-caps text-ink">{p}</span>
      ))}
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="mt-16 hidden items-center gap-3 md:flex"
    >
      <span className="mono-caps text-inkMuted">Scroll</span>
      <div className="h-px w-12 bg-ink/30" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 2v9m0 0l-4-4m4 4l4-4" stroke="#1A1B1F" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
