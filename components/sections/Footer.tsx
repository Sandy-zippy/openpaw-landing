"use client";

import { useState } from "react";
import OpenPawWordmark from "@/components/primitives/OpenPawWordmark";
import {
  REPO_URL,
  DISCORD_URL,
  FORUM_URL,
  HACKSTER_URL,
  TWITTER_URL,
  INSTAGRAM_URL,
  KICKSTARTER_URL,
  SUPPORT_EMAIL,
  BUILT_BY,
  BUILT_LOCATION,
  PROJECT_NAME,
  siteConfig,
} from "@/lib/siteConfig";

type Col = { title: string; links: { label: string; href: string; external?: boolean }[] };

const columns: Col[] = [
  {
    title: "Product",
    links: [
      { label: "Hardware", href: "#hardware" },
      { label: "SDK", href: "#sdk" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "GitHub", href: REPO_URL, external: true },
      { label: "Discord", href: DISCORD_URL, external: true },
      { label: "Forum", href: FORUM_URL, external: true },
      { label: "Hackster page", href: HACKSTER_URL, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Press kit", href: "#" },
      { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "Updates",
    links: [
      { label: "Twitter", href: TWITTER_URL, external: true },
      { label: "Instagram", href: INSTAGRAM_URL, external: true },
      { label: "Kickstarter (pre-launch)", href: KICKSTARTER_URL, external: true },
    ],
  },
];

function NewsletterMini() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    if (siteConfig.tracking.eventsWebhookUrl) {
      try {
        await fetch(siteConfig.tracking.eventsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "BuildLogSubscribe",
            email,
            stage: "lp_footer_newsletter",
            source: siteConfig.domain,
            timestamp: new Date().toISOString(),
          }),
          keepalive: true,
        });
      } catch {}
    }

    setSubmitting(false);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[320px]">
      <div className="mono-caps mb-3 text-inkMuted">MONTHLY BUILD LOG</div>
      <div className="flex items-center gap-2 border-b border-ink/20 pb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
          className="flex-1 bg-transparent font-body text-[15px] text-ink outline-none placeholder:text-inkMuted/70"
        />
        <button
          type="submit"
          disabled={submitting || sent}
          className="mono-caps text-ink transition-colors hover:text-inkMuted"
          aria-label="Subscribe to monthly build log"
        >
          {sent ? "✓ in" : submitting ? "…" : "Join →"}
        </button>
      </div>
      <p className="mono-caps mt-3 text-inkMuted">No spam. Unsubscribe in one click.</p>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink/12 bg-paper">
      <div className="mx-auto w-full max-w-shell px-6 pb-28 pt-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr,2.2fr,1.2fr]">
          {/* Left: wordmark + locale */}
          <div>
            <OpenPawWordmark size="lg" />
            <p className="mt-5 max-w-[260px] font-body text-[14px] leading-[1.6] text-inkMuted">
              {/* COPY: directional, owner=Sandy */}
              Built by {BUILT_BY} · {BUILT_LOCATION}
            </p>
            <p className="mono-caps mt-4 text-inkMuted">© 2026 {PROJECT_NAME}</p>
          </div>

          {/* Center: link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mono-caps mb-4 text-inkMuted">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noopener noreferrer" : undefined}
                        className="font-body text-[14px] text-ink transition-colors hover:text-inkMuted"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: newsletter */}
          <div className="lg:justify-self-end">
            <NewsletterMini />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink/12 pt-6 md:flex-row md:items-center">
          <p className="mono-caps text-inkMuted">
            Open hardware · Open firmware · Open community
          </p>
          <p className="mono-caps text-inkMuted">
            License: MIT firmware + CERN-OHL-S v2 hardware
          </p>
        </div>
      </div>
    </footer>
  );
}
