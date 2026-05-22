"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import CTAPrimary from "@/components/primitives/CTAPrimary";
import CTAGhost from "@/components/primitives/CTAGhost";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import OpenPawWordmark from "@/components/primitives/OpenPawWordmark";
import { PROJECT_NAME, REPO_URL, SHIP_DATE } from "@/lib/siteConfig";
import { withBase } from "@/lib/withBase";

type Props = {
  onReserveClick: () => void;
};

// Stagger timing — restrained, sequence reads top-to-bottom on left column,
// product rises last so the eye lands there once copy is read.
const ease = [0.22, 1, 0.36, 1] as const;
const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export default function HeroOpenPaw({ onReserveClick }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Top utility row: wordmark + nav + github link */}
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

      <div className="relative mx-auto w-full max-w-shell px-6 pb-14 pt-12 md:px-10 md:pb-28 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
          {/* Left — copy column */}
          <div>
            <motion.div {...appear(0)}>
              <EyebrowLabel tone="lime" className="mb-6">
                {/* COPY: directional, owner=Sandy */}
                Ships {SHIP_DATE} · Built in the open
              </EyebrowLabel>
            </motion.div>

            <motion.h1
              {...appear(0.08)}
              className="font-display font-700 text-hero text-ink"
            >
              {/* COPY: directional, owner=Sandy */}
              Meet {PROJECT_NAME}.{" "}
              <span className="text-ink/85">The open-source AI companion.</span>
            </motion.h1>

            <motion.p
              {...appear(0.18)}
              className="mt-8 max-w-[540px] font-body text-[18px] leading-[1.55] text-inkMuted md:text-[19px]"
            >
              {/* COPY: directional, owner=Sandy */}
              Hardware specs you can download. Firmware you can fork. A robot
              built in the open.
            </motion.p>

            <motion.div
              {...appear(0.28)}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 [&>*]:w-full sm:[&>*]:w-auto"
            >
              <CTAPrimary onClick={onReserveClick} ariaLabel="Reserve VIP unit for $1 deposit">
                Reserve VIP — $1 deposit →
              </CTAPrimary>
              <CTAGhost href={REPO_URL} external>
                View on GitHub
              </CTAGhost>
            </motion.div>

            <motion.div
              {...appear(0.4)}
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="mono-caps text-inkMuted">Backed by</span>
              {/* COPY: directional, owner=Sandy */}
              <PartnerRow />
            </motion.div>
          </div>

          {/* Right — product stage with halo, orbit ring, status chip */}
          <ProductStage reduceMotion={!!reduceMotion} />
        </div>

        {/* Scroll hint */}
        <ScrollHint />
      </div>

      {/* Ambient corner glows — restrained, sit behind everything.
          On mobile the glows live inside this clipped wrapper so they can't
          extend the section's scrollWidth past the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden lg:overflow-visible"
      >
        <div
          className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full opacity-60 blur-3xl md:-right-32 md:-top-32 md:h-[520px] md:w-[520px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(4,218,141,0.18), rgba(4,218,141,0) 70%)",
          }}
        />
        <div
          className="absolute -left-24 bottom-0 h-[260px] w-[260px] rounded-full opacity-50 blur-3xl md:-left-40 md:h-[420px] md:w-[420px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,133,255,0.10), rgba(0,133,255,0) 70%)",
          }}
        />
      </div>
    </section>
  );
}

/**
 * ProductStage — anchors the hero render with three layers of restrained motion:
 *   1. Halo glow behind the product (breathes subtly via framer scale)
 *   2. Slow-rotating orbital ring SVG with dashed perimeter + accent node
 *   3. Live-status chip overlay with pulsing dot
 *
 * If `hero-loop.mp4` exists on disk it will load as a <video> overlay; the
 * onError handler hides it and reveals the still image fallback so we never
 * ship a broken element.
 */
function ProductStage({ reduceMotion }: { reduceMotion: boolean }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.35 }}
      className="relative mx-auto flex w-full max-w-[420px] items-center justify-center overflow-hidden md:max-w-none lg:overflow-visible"
    >
      {/* Halo glow — sits behind the product, soft breathing scale.
          Scaled down on mobile so it fits inside the viewport even after blur. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 mx-auto h-full w-full"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[420px] md:w-[420px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(4,218,141,0.32), rgba(4,218,141,0) 65%)",
          }}
        />
      </motion.div>

      {/* Orbital ring — slow rotation, dashed perimeter, accent node.
          Mobile size accounts for the rotated bounding box (≈√2× the side
          length), so 240px stays under the 340px viewport-minus-padding budget. */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 md:h-[520px] md:w-[520px]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="300"
          cy="300"
          r="260"
          fill="none"
          stroke="rgba(14,30,46,0.10)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="300"
          cy="300"
          r="200"
          fill="none"
          stroke="rgba(14,30,46,0.08)"
          strokeWidth="1"
        />
        {/* Accent node travels on the outer ring */}
        <circle cx="560" cy="300" r="4" fill="#04DA8D" />
        <circle cx="560" cy="300" r="9" fill="#04DA8D" fillOpacity="0.22" />
      </motion.svg>

      {/* The product render itself — anchored, float idle */}
      <motion.div
        className="relative z-10"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={withBase("/assets/generated/hero-alt.png")}
          alt="OpenPaw — three-quarter render with teal LED eyes"
          className="relative z-10 mx-auto h-auto w-[78vw] max-w-[360px] select-none drop-shadow-[0_24px_48px_rgba(14,30,46,0.18)] md:w-full md:max-w-[520px]"
        />

        {/* Optional video overlay — if hero-loop.mp4 exists it plays on top of
            the still; if it 404s we hide it and the still remains. */}
        {!videoFailed && (
          <video
            aria-hidden="true"
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            onError={() => setVideoFailed(true)}
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain mix-blend-multiply"
          >
            <source src={withBase("/assets/generated/hero-loop.mp4")} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Live status chip — overlays top-right of product */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.9 }}
        className="absolute right-2 top-4 z-20 hidden items-center gap-2 rounded-pill border border-ink/10 bg-paper/90 px-3 py-1.5 shadow-card backdrop-blur sm:flex md:right-6 md:top-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
          STATUS: BOOT_OK
        </span>
      </motion.div>

      {/* Spec ticker — overlays bottom-left of product, mono caps */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.05 }}
        className="absolute bottom-2 left-2 z-20 hidden flex-col gap-1 rounded-card border border-ink/10 bg-paper/90 px-4 py-3 shadow-card backdrop-blur md:flex md:bottom-6 md:left-6"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-inkMuted">
          ESP32-S3 · 6 DOF · MIT licensed
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
          v3.1 · prototype
        </span>
      </motion.div>
    </motion.div>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 2, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 1.2 },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
      }}
      className="mt-16 hidden items-center gap-3 md:flex"
    >
      <span className="mono-caps text-inkMuted">Scroll</span>
      <div className="h-px w-12 bg-ink/30" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 2v9m0 0l-4-4m4 4l4-4" stroke="#0E1E2E" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
