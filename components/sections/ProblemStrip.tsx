"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";

type Block = {
  icon: (animate: boolean) => React.ReactNode;
  title: string;
  body: string;
};

// Thin-line diagrams, 1.5px stroke, single accent (lime on muted ink).
// Animated variants: lime accent strokes/dots scale-pulse one-shot when the
// parent article enters the viewport. Static otherwise (reduced-motion safe).
function CameraVsRobotDiagram({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="22" height="14" rx="2" stroke="#0E1E2E" strokeWidth="1.5" />
      <circle cx="17" cy="21" r="3.2" stroke="#0E1E2E" strokeWidth="1.5" />
      <motion.path
        d="M32 21h12"
        stroke="#04DA8D"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <circle cx="56" cy="50" r="14" stroke="#0E1E2E" strokeWidth="1.5" />
      <circle cx="51" cy="47" r="1.5" fill="#0E1E2E" />
      <circle cx="61" cy="47" r="1.5" fill="#0E1E2E" />
      <path d="M50 55q6 4 12 0" stroke="#0E1E2E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M56 36v-6" stroke="#0E1E2E" strokeWidth="1.5" strokeLinecap="round" />
      <motion.circle
        cx="56"
        cy="28"
        r="1.8"
        fill="#04DA8D"
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{ transformOrigin: "56px 28px" }}
      />
    </svg>
  );
}

function HealthSignalDiagram({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <path
        d="M6 44h12l4-12 6 22 5-14 4 8h32"
        stroke="#0E1E2E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle
        cx="32"
        cy="52"
        r="2.4"
        fill="#04DA8D"
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ transformOrigin: "32px 52px" }}
      />
      <motion.circle
        cx="42"
        cy="40"
        r="2.4"
        fill="#04DA8D"
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: "42px 40px" }}
      />
      <path d="M58 20a8 8 0 0 1 0 16" stroke="#0E1E2E" strokeWidth="1.5" />
      <path d="M58 24a4 4 0 0 1 0 8" stroke="#0E1E2E" strokeWidth="1.5" />
      <circle cx="58" cy="28" r="1.5" fill="#0E1E2E" />
    </svg>
  );
}

function PhonePlusHardwareDiagram({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="22" height="40" rx="3" stroke="#0E1E2E" strokeWidth="1.5" />
      <path
        d="M14 22h10M14 28h7M14 34h10M14 40h6"
        stroke="#0E1E2E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <motion.path
        d="M34 34h10"
        stroke="#04DA8D"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      />
      <rect x="48" y="22" width="26" height="26" rx="4" stroke="#0E1E2E" strokeWidth="1.5" />
      <circle cx="55" cy="32" r="1.6" fill="#0E1E2E" />
      <circle cx="67" cy="32" r="1.6" fill="#0E1E2E" />
      <path d="M55 41q6 3 12 0" stroke="#0E1E2E" strokeWidth="1.5" strokeLinecap="round" />
      <motion.circle
        cx="61"
        cy="18"
        r="1.6"
        fill="#04DA8D"
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        style={{ transformOrigin: "61px 18px" }}
      />
    </svg>
  );
}

const blocks: Block[] = [
  {
    icon: (animate) => <CameraVsRobotDiagram animate={animate} />,
    title: "AI in the room, not in a server farm.",
    body: "Cloud assistants forget you the moment the tab closes. OpenPaw runs on-device — it sees, listens, and remembers, locally, in the room with you.",
  },
  {
    icon: (animate) => <HealthSignalDiagram animate={animate} />,
    title: "On-device. Always-on. Yours.",
    body: "Vision, audio, and a Gemma-class language model all run on the robot. No subscription. No mic pointed at someone else's data center.",
  },
  {
    icon: (animate) => <PhonePlusHardwareDiagram animate={animate} />,
    title: "Open hardware in a world of closed AI.",
    body: "Humane, Rabbit, Friend — every consumer AI device this year shipped locked. We open every byte: firmware, schematics, BOM, the lot.",
  },
];

export default function ProblemStrip() {
  const reduced = useReducedMotion() ?? false;
  const gridRef = useRef<HTMLDivElement | null>(null);
  // Trigger diagram animations one-shot when the grid enters view.
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -8% 0px" });
  const animate = inView && !reduced;

  return (
    <SectionShell id="problem">
      <motion.header
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-[760px] text-center"
      >
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Phones forget. Robots remember.
        </h2>
      </motion.header>

      <div
        ref={gridRef}
        className="relative mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10"
      >
        {blocks.map((b, i) => (
          <motion.article
            key={b.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-5"
          >
            <div>{b.icon(animate)}</div>
            <h3 className="font-display text-display-md font-600 leading-tight text-ink">
              {/* COPY: directional, owner=Sandy */}
              {b.title}
            </h3>
            <p className="font-body text-[16px] leading-[1.6] text-inkMuted">
              {/* COPY: directional, owner=Sandy */}
              {b.body}
            </p>
            {i < blocks.length - 1 && (
              <div className="hidden h-full w-px md:absolute md:top-0" />
            )}
          </motion.article>
        ))}
      </div>

      {/* Centered divider with lime dot — breathing scale/opacity loop (reduced-motion respected) */}
      <div className="mt-20 flex items-center justify-center gap-4">
        <div className="h-px w-24 bg-ink/15" />
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-lime"
          animate={reduced ? undefined : { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
          transition={reduced ? undefined : { duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="h-px w-24 bg-ink/15" />
      </div>
    </SectionShell>
  );
}
