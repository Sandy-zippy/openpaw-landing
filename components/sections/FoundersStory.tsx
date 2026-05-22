"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import { withBase } from "@/lib/withBase";

// -----------------------------------------------------------------------------
// FoundersStory — the human spine of the OpenPaw page.
//
// Story beats are from a real May 22, 2026 voice call between Sandy & Ashok.
// All copy carries the {/* COPY: directional, owner=Sandy */} tag so Sandy
// can grep + revise. Photos live in /public/assets/founder-*.jpg. Prithu's
// photo is still auth-walled, so he renders as a monogram card (TODO Sandy).
// -----------------------------------------------------------------------------

type TimelineStep = {
  date: string;
  body: string;
  tone: "paper" | "lime" | "ink";
  isPivot?: boolean;
};

const timeline: TimelineStep[] = [
  {
    date: "Feb 2026",
    body: "We started building a closed pet companion. Three months, three prototypes, thin margins, no recurring revenue path.",
    tone: "paper",
  },
  {
    date: "May 22, 2026",
    body: "Reachy Mini hit $700K on Kickstarter. JLCPCB open-sourced Open Duck Mini last week. We looked at each other and decided.",
    tone: "lime",
    isPivot: true,
  },
  {
    date: "Now",
    body: "Hardware. Firmware. BOM. Schematics. All of it. Public. Forever. Built by hand, in the open.",
    tone: "ink",
  },
];

type Founder = {
  name: string;
  role: string;
  bio: string;
  photo?: string;     // path under /public/assets/
  monogram?: string;  // initials fallback
  twitter?: string;
  github?: string;
};

const founders: Founder[] = [
  {
    name: "Sandy Kadyan",
    role: "Growth + Strategy",
    bio:
      "Growth + strategy. ZippyScale + Crowd Launches. Wired the funnel, makes sure the open-source story actually ships.",
    photo: "founder-sandy.jpg",
    twitter: "https://twitter.com/openpaw",
    github: "https://github.com/openpaw",
  },
  {
    name: "Ashok Jaiswal",
    role: "Hardware + Firmware",
    bio:
      "Hardware + firmware. Builds the thing on the desk. Three months, three prototypes, one breaking point.",
    photo: "founder-ashok.jpg",
    twitter: "https://twitter.com/openpaw",
    github: "https://github.com/openpaw",
  },
  {
    name: "Prithu Hazarika",
    role: "Product + Design",
    bio:
      "Owns the product surface and the industrial design. Why every curve has a reason.",
    photo: "founder-prithu.jpg",
    twitter: "https://twitter.com/prithuhazarika",
    github: "https://github.com/openpaw",
  },
];

function TimelineCard({
  step,
  index,
  isLast,
  reduced,
}: {
  step: TimelineStep;
  index: number;
  isLast: boolean;
  reduced: boolean;
}) {
  const toneClasses =
    step.tone === "lime"
      ? "bg-paper border-lime"
      : step.tone === "ink"
      ? "bg-ink text-paper border-ink"
      : "bg-paperShadow border-ink/10";

  const dateColor =
    step.tone === "ink" ? "text-lime" : step.tone === "lime" ? "text-ink" : "text-inkMuted";

  const bodyColor =
    step.tone === "ink" ? "text-paper/85" : "text-ink";

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 1, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full min-w-[78%] flex-shrink-0 snap-start flex-col rounded-card border-2 p-7 shadow-card sm:min-w-[60%] md:min-w-0 ${toneClasses} ${
        step.isPivot && !reduced ? "timeline-pulse" : ""
      }`}
    >
      <div className={`mono-caps mb-4 ${dateColor}`}>
        {/* COPY: directional, owner=Sandy */}
        {step.date}
      </div>
      <p className={`font-body text-[16px] leading-[1.55] ${bodyColor}`}>
        {/* COPY: directional, owner=Sandy */}
        {step.body}
      </p>
      {step.isPivot && (
        <div className="mt-5 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="mono-caps text-ink/70">The Pivot</span>
        </div>
      )}
      {/* Step number, top-right, quiet */}
      <span className="mono-caps absolute right-5 top-5 opacity-40">
        {String(index + 1).padStart(2, "0")} / {String(3).padStart(2, "0")}
      </span>
      {!isLast && (
        <span
          aria-hidden="true"
          className="hidden md:absolute md:-right-4 md:top-1/2 md:block md:h-px md:w-8 md:bg-ink/15"
        />
      )}
    </motion.article>
  );
}

function FounderCard({
  founder,
  index,
  reduced,
}: {
  founder: Founder;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 1, y: 18, scale: 0.92 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-4 rounded-card border border-ink/10 bg-paper p-6 shadow-card transition-shadow hover:shadow-cardHover md:p-7"
    >
      {founder.photo ? (
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-ink/10 bg-paperShadow">
          <img
            src={withBase(`/assets/${founder.photo}`)}
            alt={`${founder.name} portrait`}
            className="h-full w-full select-none object-cover"
          />
        </div>
      ) : (
        // Monogram fallback for founders without a portrait yet.
        // {/* TODO Sandy: real Prithu photo (LinkedIn was auth-walled) */}
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full bg-lime"
          aria-label={`${founder.name} monogram`}
        >
          <span className="font-display text-4xl font-700 text-ink">
            {founder.monogram}
          </span>
        </div>
      )}

      <div>
        <h3 className="font-display text-display-md font-700 leading-tight text-ink">
          {/* COPY: directional, owner=Sandy */}
          {founder.name}
        </h3>
        <div className="mono-caps mt-1 inline-flex items-center gap-2 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          {founder.role}
        </div>
      </div>

      <p className="font-body text-[15px] leading-[1.6] text-inkMuted">
        {/* COPY: directional, owner=Sandy */}
        {founder.bio}
      </p>

      <div className="mt-auto flex items-center gap-5 pt-2">
        {founder.twitter && (
          <a
            href={founder.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-caps text-inkMuted transition-colors hover:text-lime"
          >
            Twitter ↗
          </a>
        )}
        {founder.github && (
          <a
            href={founder.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-caps text-inkMuted transition-colors hover:text-lime"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function FoundersStory() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell id="founders">
      {/* Section header */}
      <header className="mx-auto max-w-[820px] text-center">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 1, y: 10 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <EyebrowLabel tone="lime" className="mb-5 justify-center">
            BUILT IN THE OPEN
          </EyebrowLabel>
        </motion.div>
        <motion.h2
          initial={reduced ? { opacity: 1 } : { opacity: 1, y: 14 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display text-display-xl font-700 text-ink"
        >
          {/* COPY: directional, owner=Sandy */}
          We pivoted to open-source on May 22.
          <br className="hidden md:block" /> Here&rsquo;s why.
        </motion.h2>
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 1, y: 14 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-5 max-w-[640px] font-body text-[17px] leading-[1.6] text-inkMuted"
        >
          {/* COPY: directional, owner=Sandy */}
          Three builders. One robot. Three months of building it closed, one
          afternoon to decide it shouldn&rsquo;t be.
        </motion.p>
      </header>

      {/* Pivot timeline — horizontal scroll-snap on mobile, 3 columns on md+ */}
      <div className="relative mt-14 md:mt-16">
        <div className="snap-gallery flex gap-5 overflow-x-auto px-1 pb-3 [mask-image:linear-gradient(to_right,transparent_0,black_16px,black_calc(100%-32px),transparent_100%)] md:grid md:grid-cols-3 md:gap-7 md:overflow-visible md:px-0 md:pb-0 md:[mask-image:none]">
          {timeline.map((step, i) => (
            <TimelineCard
              key={step.date}
              step={step}
              index={i}
              isLast={i === timeline.length - 1}
              reduced={reduced}
            />
          ))}
        </div>
        {/* Scroll affordance — small mono caption that invites a drag */}
        <div
          aria-hidden="true"
          className="mono-caps mt-4 flex items-center justify-center gap-2 text-inkMuted md:hidden"
        >
          <span>←</span>
          <span>DRAG</span>
          <span>→</span>
        </div>
      </div>

      {/* Founder triptych */}
      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7">
        {founders.map((f, i) => (
          <FounderCard key={f.name} founder={f} index={i} reduced={reduced} />
        ))}
      </div>

      {/* Pull quote */}
      <motion.figure
        initial={reduced ? { opacity: 1 } : { opacity: 1, y: 8 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-24 max-w-[920px] text-center"
      >
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-ink/15" />
          <span className="mono-caps text-inkMuted">The Moment</span>
          <span className="h-px w-12 bg-ink/15" />
        </div>
        <blockquote className="font-display text-display-lg font-700 leading-[1.1] tracking-tight text-ink md:text-display-xl">
          {/* COPY: directional, owner=Sandy */}
          &ldquo;Screw it. Open source. Open source. I&rsquo;m 100% sure.&rdquo;
        </blockquote>
        <figcaption className="mono-caps mt-6 text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          — Sandy, the moment we decided
        </figcaption>
      </motion.figure>

      {/* Spark callouts — what we were watching that week */}
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 1, x: -16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 rounded-card border border-ink/10 bg-paperShadow p-5 md:p-6"
        >
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-lime" />
          <div>
            <div className="mono-caps text-inkMuted">The Spark</div>
            <div className="mt-1 font-display text-[18px] font-600 text-ink">
              {/* COPY: directional, owner=Sandy */}
              Reachy Mini · $700K+ on Kickstarter
            </div>
            <div className="mt-1 font-body text-[14px] text-inkMuted">
              {/* COPY: directional, owner=Sandy */}
              Hugging Face&rsquo;s open-source desktop robot proved the appetite.
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 1, x: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="flex items-center gap-4 rounded-card border border-ink/10 bg-paperShadow p-5 md:p-6"
        >
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-lime" />
          <div>
            <div className="mono-caps text-inkMuted">The Confirm</div>
            <div className="mt-1 font-display text-[18px] font-600 text-ink">
              {/* COPY: directional, owner=Sandy */}
              Open Duck Mini · open-sourced by JLCPCB
            </div>
            <div className="mt-1 font-body text-[14px] text-inkMuted">
              {/* COPY: directional, owner=Sandy */}
              A manufacturer chose to publish the design last week. Game on.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Closing line */}
      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 1, y: 8 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-20 max-w-[640px] text-center font-body italic text-[17px] leading-[1.55] text-inkMuted"
      >
        {/* COPY: directional, owner=Sandy */}
        Built by hand. Built in public. Built to fork.
      </motion.p>
    </SectionShell>
  );
}
