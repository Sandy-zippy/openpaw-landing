"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import CTAPrimary from "@/components/primitives/CTAPrimary";
import { PRICING, siteConfig, STRIPE_PAYMENT_LINK } from "@/lib/siteConfig";
import { generateEventId, readFbp, readFbc, readUtm } from "@/lib/eventId";
import { trackLead } from "@/components/Tracking";

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Netherlands",
  "Spain", "Italy", "Sweden", "Norway", "Denmark", "Finland", "Switzerland",
  "Australia", "New Zealand", "Japan", "Singapore", "Hong Kong", "South Korea",
  "United Arab Emirates", "India", "Brazil", "Mexico", "Other",
];

type Micro = { quote: string; name: string; city: string };

const microTestimonials: Micro[] = [
  // {/* COPY: directional, owner=Sandy */}
  // TODO: replace with real VIP-list quotes once VIP gate has real signups
  {
    quote: "Finally an open hardware companion my cat won't ignore.",
    name: "Mira K.",
    city: "Berlin",
  },
  {
    quote: "Wanted Reachy Mini for my dog. This is exactly that.",
    name: "Alex T.",
    city: "Brooklyn",
  },
  {
    quote: "I'll fork it the day the repo opens.",
    name: "Daiki H.",
    city: "Tokyo",
  },
];

function VIPCounter({ claimed, total }: { claimed: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(eased * claimed));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, claimed]);

  const pct = Math.min(100, (claimed / total) * 100);

  return (
    <div ref={ref} className="rounded-card border border-ink/10 bg-paper p-7 shadow-card md:p-8">
      <EyebrowLabel>VIP SPOTS CLAIMED</EyebrowLabel>

      <div className="mt-4 flex items-end gap-3">
        <span
          className="font-display text-[72px] font-700 leading-none tracking-tight text-ink md:text-[88px]"
          aria-label={`${claimed} of ${total} claimed`}
        >
          {display}
        </span>
        <span className="pb-2 font-display text-[24px] font-500 text-inkMuted">/ {total}</span>
      </div>

      <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-paperShadow">
        <motion.div
          className="h-full bg-lime"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>

      <div className="mt-3 mono-caps text-inkMuted">
        {/* COPY: directional, owner=Sandy */}
        {total - claimed} spots remaining
      </div>

      <ul className="mt-8 space-y-5 border-t border-ink/10 pt-6">
        {microTestimonials.map((m) => (
          <li key={m.name}>
            <p className="font-display text-[16px] leading-[1.4] text-ink">
              {/* COPY: directional, owner=Sandy */}
              &ldquo;{m.quote}&rdquo;
            </p>
            <div className="mono-caps mt-2 text-inkMuted">
              {m.name} · {m.city}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VIPGate() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!email || !country) {
      setError("Add your email and country to continue.");
      return;
    }

    setSubmitting(true);

    const eventId = generateEventId("Lead");
    const fbp = readFbp();
    const fbc = readFbc();
    const utm = readUtm();

    const payload = {
      event_name: "Lead",
      event_id: eventId,
      email,
      country,
      stage: "lp_vip_gate",
      source: siteConfig.domain,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      fbp,
      fbc,
      ...utm,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("openpaw_user", JSON.stringify({
        email, country, lead_event_id: eventId, ts: Date.now(),
      }));
    } catch {}

    trackLead({ email, eventID: eventId });

    if (siteConfig.tracking.eventsWebhookUrl) {
      try {
        await fetch(siteConfig.tracking.eventsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // Non-blocking — checkout is the priority
      }
    }

    if (STRIPE_PAYMENT_LINK) {
      const url = new URL(STRIPE_PAYMENT_LINK);
      url.searchParams.set("prefilled_email", email);
      url.searchParams.set("client_reference_id", `openpaw_${Date.now()}`);
      window.location.href = url.toString();
      return;
    }

    setSubmitting(false);
    setNotice("VIP signup opening soon. We saved your email — we'll be in touch with checkout the moment it's live.");
  };

  return (
    <SectionShell id="vip">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-14">
        {/* Form column */}
        <div>
          <EyebrowLabel tone="lime" className="mb-5">RESERVE YOUR UNIT</EyebrowLabel>
          <h2 className="font-display text-display-xl font-700 text-ink">
            {/* COPY: directional, owner=Sandy */}
            Lock in ${PRICING.vipEarlyBird}. Refundable any time.
          </h2>
          <p className="mt-5 max-w-[520px] font-body text-[17px] leading-[1.6] text-inkMuted">
            {/* COPY: directional, owner=Sandy */}
            <span className="font-600 text-ink">{PRICING.vipClaimed} / {PRICING.vipLimit}</span> VIP spots claimed. Pay ${PRICING.vipDeposit} today, ${PRICING.vipRemainder} on
            Kickstarter launch day. Cancel and get every cent back, any time
            before December.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mono-caps text-inkMuted">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
                autoComplete="email"
                className="mt-2 w-full rounded-card border border-ink/15 bg-paper px-5 py-4 font-body text-[16px] text-ink outline-none transition focus:border-ink focus:bg-paper focus:ring-2 focus:ring-lime/40"
              />
            </label>

            <label className="block">
              <span className="mono-caps text-inkMuted">Shipping country</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="mt-2 w-full appearance-none rounded-card border border-ink/15 bg-paper px-5 py-4 font-body text-[16px] text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-lime/40"
              >
                <option value="" disabled>Select your country…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            {error && (
              <div role="alert" className="mono-caps text-[#B43A3A]">{error}</div>
            )}
            {notice && (
              <div role="status" className="rounded-card bg-paperShadow px-4 py-3 font-body text-[14px] text-ink">
                {notice}
              </div>
            )}

            <CTAPrimary type="submit" fullWidth disabled={submitting}>
              {submitting ? "Reserving…" : `Reserve VIP — $${PRICING.vipDeposit} →`}
            </CTAPrimary>

            <p className="mono-caps text-inkMuted">
              We don't sell your email. We don't run ads. Unsubscribe in one click.
            </p>
          </form>
        </div>

        {/* Counter column */}
        <VIPCounter claimed={PRICING.vipClaimed} total={PRICING.vipLimit} />
      </div>
    </SectionShell>
  );
}
