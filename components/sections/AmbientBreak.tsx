"use client";

import { motion, useReducedMotion } from "framer-motion";
import { withBase } from "@/lib/withBase";

// -----------------------------------------------------------------------------
// AmbientBreak — a cinematic 16:9 video moment between Pricing and VIP.
// Uses ambient-mood.mp4 (eye-macro loop) with a quiet overlay headline.
// Built to create a single dark/atmospheric beat in the cream-paper flow.
// -----------------------------------------------------------------------------

export default function AmbientBreak() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="ambient-break"
      aria-label="OpenPaw — built in the open"
      className="relative bg-ink"
    >
      <div className="relative mx-auto w-full max-w-shell overflow-hidden md:rounded-card">
        {/* Mobile gets a taller crop (4:3) so the headline has room above the
            video; desktop stays cinematic 16:9. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
          {/* Still image only — ambient-mood.mp4 showed head motion the real
              robot can't do. Re-introduce once we have a Seedance regen. */}
          <img
            src={withBase("/assets/generated/eye-macro.png")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full select-none object-cover"
          />

          {/* Bottom-to-top gradient. Heavier on mobile so the headline survives
              against the bright LED-eye macro; lighter on desktop where the
              16:9 crop gives the text its own real estate. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/0 md:from-ink/45 md:via-ink/15"
          />

          {/* Foreground content */}
          <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-8 md:px-12 md:pb-16">
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 1, y: 14 }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[680px]"
            >
              <div className="mono-caps text-paper/60">
                {/* COPY: directional, owner=Sandy */}
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Built in the open
                </span>
              </div>
              <h2 className="mt-4 font-display text-display-md font-600 leading-[1.05] text-paper">
                {/* COPY: directional, owner=Sandy */}
                Every behavior. Every byte. <span className="text-lime">Yours to rewrite.</span>
              </h2>
              <p className="mt-5 max-w-[520px] font-body text-[16px] leading-[1.55] text-paper/75">
                {/* COPY: directional, owner=Sandy */}
                Cloud AI lives in someone else's data center. OpenPaw lives in your room — and the schematics live on GitHub.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
