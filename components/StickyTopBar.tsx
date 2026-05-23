import { PRICING } from "@/lib/siteConfig";

export default function StickyTopBar() {
  const vipSavings = PRICING.retail - PRICING.vipEarlyBird;
  return (
    <div className="sticky top-0 z-50 w-full border-b border-ink/10 bg-lime text-ink">
      <div className="mx-auto flex w-full max-w-shell items-center justify-center gap-2 px-4 py-3.5 text-center sm:gap-3 sm:py-2.5 md:px-10">
        <span className="mono-caps text-[10px] font-600 leading-tight sm:text-[11px]">
          {/* COPY: directional, owner=Sandy */}
          <span className="hidden sm:inline">Launching </span>July 7 · Kickstarter
        </span>
        <span aria-hidden="true" className="text-ink/40">
          ·
        </span>
        <a
          href="#vip"
          className="mono-caps -my-3 inline-flex items-center py-3 text-[10px] font-600 leading-tight underline-offset-2 hover:underline sm:text-[11px]"
        >
          {/* COPY: directional, owner=Sandy */}
          VIP saves ${vipSavings} →
        </a>
      </div>
    </div>
  );
}
