"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import PlaceholderImage from "@/components/primitives/PlaceholderImage";
import { REPO_URL } from "@/lib/siteConfig";
import { withBase } from "@/lib/withBase";

type GalleryItem = { label: string; caption: string; image?: string };

const gallery: GalleryItem[] = [
  { label: "Front view — matrix-LED eyes", caption: "01 / Front", image: "bot-left.png" },
  { label: "Side view — wheel + chassis", caption: "02 / Side", image: "bot-right.png" },
  { label: "Top-down — mic + sensor array", caption: "03 / Top", image: "generated/gallery-top.png" },
  { label: "Desk scale — beside a ceramic mug", caption: "04 / Scale", image: "generated/gallery-scale.png" },
];

type Stat = { value: string; unit?: string; label: string; small?: string };

const stats: Stat[] = [
  { value: "127", unit: "mm", label: "tall" },
  { value: "6", unit: "DOF", label: "of expressive movement" },
  { value: "On-device", label: "LLM + vision" },
  { value: "MIT", label: "licensed firmware", small: "+ CERN-OHL-S hardware" },
];

function StatTile({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-card border border-ink/8 bg-paper p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="font-display text-[40px] font-700 leading-none tracking-tight text-ink md:text-[44px]">
        {/* COPY: directional, owner=Sandy */}
        {stat.value}
        {stat.unit && (
          <span className="ml-1 font-display text-[20px] font-500 text-inkMuted">{stat.unit}</span>
        )}
      </div>
      <div className="mt-3 font-body text-[14px] text-inkMuted">{stat.label}</div>
      {stat.small && (
        <div className="mono-caps mt-2 text-inkMuted opacity-70">({stat.small})</div>
      )}
    </div>
  );
}

export default function ProductReveal() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell id="product">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,1fr] md:items-end md:gap-12">
        <header>
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5 }}
          >
            <EyebrowLabel className="mb-5">
              OPEN HARDWARE / OPEN FIRMWARE / OPEN COMMUNITY
            </EyebrowLabel>
          </motion.div>
          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-display-xl font-700 text-ink"
          >
            {/* COPY: directional, owner=Sandy */}
            A 5-inch desktop companion. Every byte of it is yours to rewrite.
          </motion.h2>
        </header>
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="font-body text-[17px] leading-[1.6] text-inkMuted md:max-w-[480px] md:justify-self-end"
        >
          {/* COPY: directional, owner=Sandy */}
          OpenPaw is a fully assembled robot you can use out of the box — and a
          published hardware platform (BOM, STEP files, PCB schematics, firmware
          source) you can fork, mod, and reprint.
        </motion.p>
      </div>

      {/* Gallery */}
      <div className="snap-gallery mt-12 flex gap-5 overflow-x-auto px-1 pb-3 md:mt-16">
        {gallery.map((item, i) => (
          <motion.div
            key={i}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-[78%] flex-shrink-0 sm:min-w-[58%] md:min-w-[42%] lg:min-w-[34%]"
          >
            {item.image ? (
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card border border-ink/8 bg-paperShadow">
                <img
                  src={withBase(`/assets/${item.image}`)}
                  alt={item.label}
                  className="h-full w-full select-none object-contain p-6"
                />
                <div className="absolute left-4 top-4 mono-caps text-inkMuted/70">{item.caption}</div>
              </div>
            ) : (
              <PlaceholderImage
                label={item.label}
                caption={item.caption}
                aspectRatio="4/5"
                tone="paperShadow"
                rounded="card"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <StatTile stat={s} />
          </motion.div>
        ))}
      </div>

      {/* Link strip */}
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="mono-caps text-ink transition-colors hover:text-ink/60">
          Download BOM →
        </a>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="mono-caps text-ink transition-colors hover:text-ink/60">
          Download STEP files →
        </a>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="mono-caps text-ink transition-colors hover:text-ink/60">
          GitHub repo →
        </a>
      </div>
    </SectionShell>
  );
}
