"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import PlaceholderImage from "@/components/primitives/PlaceholderImage";
import { REPO_URL } from "@/lib/siteConfig";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type GalleryItem = { label: string; caption: string; image?: string };

const gallery: GalleryItem[] = [
  { label: "Front view — matrix-LED eyes", caption: "01 / Front", image: "bot-left.png" },
  { label: "Side view — wheel + chassis", caption: "02 / Side", image: "bot-right.png" },
  { label: "Top-down — speaker grille + sensor array", caption: "03 / Top" },
  { label: "Desk scale — beside a coffee mug", caption: "04 / Scale" },
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
    <div className="rounded-card border border-ink/8 bg-paper p-6 shadow-card">
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
  return (
    <SectionShell id="product">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,1fr] md:items-end md:gap-12">
        <header>
          <EyebrowLabel className="mb-5">
            OPEN HARDWARE / OPEN FIRMWARE / OPEN COMMUNITY
          </EyebrowLabel>
          <h2 className="font-display text-display-xl font-700 text-ink">
            {/* COPY: directional, owner=Sandy */}
            A 5-inch desktop companion. Every byte of it is yours to rewrite.
          </h2>
        </header>
        <p className="font-body text-[17px] leading-[1.6] text-inkMuted md:max-w-[480px] md:justify-self-end">
          {/* COPY: directional, owner=Sandy */}
          OpenPaw is a fully assembled robot you can use out of the box — and a
          published hardware platform (BOM, STEP files, PCB schematics, firmware
          source) you can fork, mod, and reprint.
        </p>
      </div>

      {/* Gallery */}
      <div className="snap-gallery mt-12 flex gap-5 overflow-x-auto px-1 pb-3 md:mt-16">
        {gallery.map((item, i) => (
          <div key={i} className="min-w-[78%] flex-shrink-0 sm:min-w-[58%] md:min-w-[42%] lg:min-w-[34%]">
            {item.image ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink/8 bg-paperShadow">
                <Image
                  src={`${BASE_PATH}/assets/${item.image}`}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 78vw, 34vw"
                  className="object-contain p-6"
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
          </div>
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
