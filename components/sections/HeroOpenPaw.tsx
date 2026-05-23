"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import CTAPrimary from "@/components/primitives/CTAPrimary";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import OpenPawWordmark from "@/components/primitives/OpenPawWordmark";
import { COUNTRIES, PRICING, PROJECT_NAME, SHIP_DATE } from "@/lib/siteConfig";
import { reservationDraft, useReservation } from "@/lib/useReservation";
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
      {/* Top utility row: wordmark + desktop nav / mobile hamburger.
          GitHub link is hidden until the public repo is live. */}
      <div className="mx-auto flex w-full max-w-shell items-center justify-between px-6 pt-8 md:px-10 md:pt-10">
        <OpenPawWordmark size="md" />
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#hardware" className="mono-caps text-inkMuted transition-colors hover:text-ink">Hardware</a>
          <a href="#sdk" className="mono-caps text-inkMuted transition-colors hover:text-ink">SDK</a>
          <a href="#roadmap" className="mono-caps text-inkMuted transition-colors hover:text-ink">Roadmap</a>
          <a href="#pricing" className="mono-caps text-inkMuted transition-colors hover:text-ink">Pricing</a>
          <a href="#faq" className="mono-caps text-inkMuted transition-colors hover:text-ink">FAQ</a>
        </nav>
        <MobileNavToggle />
        <span aria-hidden="true" className="hidden md:block" />
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

            <motion.div {...appear(0.28)} className="mt-10">
              <HeroReservationForm onFallbackScroll={onReserveClick} />
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
        {/* hero-loop.mp4 was pulled — the Higgsfield render showed motion the
            real robot can't do (head tilt) and the mix-blend overlay was
            visibly buggy. Bring it back only after Seedance regen is approved. */}
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

function HeroReservationForm({ onFallbackScroll }: { onFallbackScroll: () => void }) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const { submit } = useReservation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);

    const result = await submit({ email, country, stage: "lp_hero" });

    if (result.status === "redirecting") return;
    setSubmitting(false);
    if (result.status === "error") {
      setError(result.message);
    } else {
      // Stripe isn't live — stash the draft so VIPGate can prefill + show a
      // confirmation banner instead of making the user retype.
      reservationDraft.save({ email, country });
      setNotice(result.message);
      onFallbackScroll();
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[520px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <label className="block flex-1">
          <span className="sr-only">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@email.com"
            autoComplete="email"
            className="w-full rounded-pill border border-ink/15 bg-paper px-5 py-4 font-body text-[15px] text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-lime/40"
          />
        </label>
        <label className="block sm:w-[40%]">
          <span className="sr-only">Shipping country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full appearance-none rounded-pill border border-ink/15 bg-paper px-5 py-4 font-body text-[15px] text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-lime/40"
          >
            <option value="" disabled>Country…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3">
        <CTAPrimary type="submit" fullWidth disabled={submitting} ariaLabel="Reserve VIP unit for $1 deposit">
          {submitting ? "Reserving…" : `Reserve VIP — $${PRICING.vipDeposit} deposit →`}
        </CTAPrimary>
      </div>

      {error && (
        <div role="alert" className="mono-caps mt-3 text-[#B43A3A]">{error}</div>
      )}
      {notice && (
        <div role="status" className="mt-3 rounded-card bg-paperShadow px-4 py-3 font-body text-[14px] text-ink">
          {notice}
        </div>
      )}

      <p className="mono-caps mt-3 text-inkMuted">
        ${PRICING.vipDeposit} holds your spot · ${PRICING.vipRemainder} on Kickstarter launch · Refundable any time
      </p>
    </form>
  );
}

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Hardware", href: "#hardware" },
  { label: "SDK", href: "#sdk" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function MobileNavToggle() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  if (typeof document !== "undefined") {
    // Effect runs every render; cheap and predictable for a sub-1KB widget.
    document.body.style.overflow = open ? "hidden" : "";
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex flex-col bg-paper"
          onClick={(e) => {
            // Close when the user taps outside the inner panel (anchor links also close).
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="flex items-center justify-between px-6 pt-8">
            <OpenPawWordmark size="md" />
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-display-md font-600 text-ink transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-8 pb-10">
            <a
              href="#vip"
              onClick={() => setOpen(false)}
              className="mono-caps text-inkMuted underline-offset-4 hover:underline"
            >
              Reserve VIP — ${PRICING.vipDeposit} →
            </a>
          </div>
        </div>
      )}
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
