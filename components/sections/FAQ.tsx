"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";

type QA = { q: string; a: React.ReactNode };

const items: QA[] = [
  {
    q: "What's the open-source license?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Firmware: <strong className="text-ink">MIT</strong> — permissive, fork
        and ship commercial forks freely. Hardware: <strong className="text-ink">CERN-OHL-S v2</strong>
         {" "}(strong reciprocal) — fork the design, but your fork stays open. Full
        license text lands in the GitHub repo on Kickstarter launch day.
      </>
    ),
  },
  {
    q: "Is it really open hardware?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Yes. STEP files, BOM, PCB schematics, and firmware source are all
        published on GitHub at launch. You can re-print the shell, re-spin the
        PCB, and flash your own firmware.
      </>
    ),
  },
  {
    q: "Why a robot — can't I just use ChatGPT?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Cloud AI lives in a tab. OpenPaw lives in your room. It sees, listens, and
        runs entirely on-device — no subscription, no surveillance, just an AI
        that's actually present.
      </>
    ),
  },
  {
    q: "What can it actually do out of the box?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Twelve behaviors ship pre-installed: greet on presence, ambient mood
        loops, voice query (on-device LLM), reminders, journal mode, music sync,
        and more. Coding unlocks the next 100.
      </>
    ),
  },
  {
    q: "Can I get a refund?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Yes, any time before manufacturing tooling begins in August 2026.
        After that, refunds are case-by-case.
      </>
    ),
  },
  {
    q: "When does it ship?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        December 2026 for Kickstarter backers. Q1 2027 for D2C retail.
      </>
    ),
  },
  {
    q: "Where is it built?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        Final assembly in [TBD]. PCB by JLCPCB ([TBD]). Both partners locked
        before we open the campaign.
      </>
    ),
  },
  {
    q: "Do I need to code to use it?",
    a: (
      <>
        {/* COPY: directional, owner=Sandy */}
        No. 12 behaviors ship pre-installed. Coding unlocks the next 100 — and
        the SDK is friendly enough that "I wrote a Python script once" is plenty.
      </>
    ),
  },
];

function FAQItem({ qa, isOpen, onToggle }: { qa: QA; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-ink/12">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <h3 className="font-display text-[19px] font-600 leading-snug text-ink md:text-[22px]">
          {/* COPY: directional, owner=Sandy */}
          {qa.q}
        </h3>
        <span aria-hidden="true" className="mt-1 font-display text-[26px] font-500 leading-none text-ink">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="max-w-[820px] pb-7 pr-10 font-body text-[16px] leading-[1.65] text-inkMuted">
              {qa.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  // First item (license) open by default — devs scan first.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <header className="mx-auto max-w-[760px] text-center">
        <EyebrowLabel className="mb-5 justify-center">FAQ</EyebrowLabel>
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Eight answers, no fluff.
        </h2>
      </header>

      <div className="mx-auto mt-14 max-w-[920px] border-t border-ink/12">
        {items.map((qa, i) => (
          <FAQItem
            key={qa.q}
            qa={qa}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </SectionShell>
  );
}
