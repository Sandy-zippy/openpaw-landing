"use client";

import { useEffect, useState } from "react";
import { PRICING } from "@/lib/siteConfig";

export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Sticky reserve bar"
      aria-hidden={!visible}
      className={`fixed bottom-3 z-50 transition-all duration-300 inset-x-3 md:inset-x-auto md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href="#vip"
        className="flex items-center justify-between gap-4 rounded-pill bg-ink px-5 py-3 text-paper shadow-cardHover md:gap-5"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-ink">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <path d="M3 1.2L9.5 6 3 10.8V1.2Z" />
            </svg>
          </span>
          <span className="font-display text-[14px] font-600">
            {/* COPY: directional, owner=Sandy */}
            Reserve VIP — ${PRICING.vipDeposit}
          </span>
        </div>
        <span className="mono-caps text-paper/70">
          {PRICING.vipClaimed}/{PRICING.vipLimit}
        </span>
      </a>
    </div>
  );
}
