"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/primitives/SectionShell";
import ChipTag from "@/components/primitives/ChipTag";
import { withBase } from "@/lib/withBase";

// Tokenized Python code rendered server-side. We do this by hand instead of
// pulling in prism-react-renderer just to keep the dep graph tight.
type Tok = { v: string; c?: string };

const code: Tok[][] = [
  [{ v: "from", c: "kw" }, { v: " openpaw " }, { v: "import", c: "kw" }, { v: " Robot, listen" }],
  [{ v: "" }],
  [{ v: "bot = Robot()" }],
  [{ v: "" }],
  [{ v: "@listen", c: "dec" }, { v: ".for_phrase(" }, { v: '"hey"', c: "str" }, { v: ")" }],
  [{ v: "def", c: "kw" }, { v: " greet(ctx):" }],
  [{ v: "    " }, { v: "if", c: "kw" }, { v: " ctx.confidence > " }, { v: "0.7", c: "num" }, { v: ":" }],
  [{ v: "        bot.look_toward(ctx.source)" }],
  [{ v: "        bot.eyes_blink(pattern=" }, { v: '"warm_wave"', c: "str" }, { v: ")" }],
  [{ v: "        bot.say(" }, { v: '"hi, i\'m here"', c: "str" }, { v: ", voice=" }, { v: '"warm"', c: "str" }, { v: ")" }],
  [{ v: "    " }, { v: "else", c: "kw" }, { v: ":" }],
  [{ v: "        bot.tilt_head()" }],
  [{ v: "" }],
  [{ v: "bot.run()" }],
];

const colorMap: Record<string, string> = {
  kw: "#04DA8D",      // lime: keywords
  str: "#F4ECDE",     // paper-shadow: strings
  num: "#FFF8F0",     // paper: numbers
  dec: "#04DA8D",     // lime: decorators
};

// Flatten the code into a single character stream while preserving token color
// metadata. This lets the typewriter reveal characters left-to-right, line by
// line, without losing syntax highlighting.
type Char = { ch: string; color?: string; lineIdx: number; tokIdx: number; charIdx: number };

function buildCharStream(): Char[] {
  const stream: Char[] = [];
  code.forEach((line, lineIdx) => {
    if (line.length === 0 || (line.length === 1 && !line[0].v)) {
      // Blank line — emit a synthetic newline char so the reveal advances.
      stream.push({ ch: "\n", lineIdx, tokIdx: 0, charIdx: 0 });
      return;
    }
    line.forEach((tok, tokIdx) => {
      const value = tok.v || "";
      for (let i = 0; i < value.length; i++) {
        stream.push({
          ch: value[i],
          color: tok.c ? colorMap[tok.c] : undefined,
          lineIdx,
          tokIdx,
          charIdx: i,
        });
      }
    });
    stream.push({ ch: "\n", lineIdx, tokIdx: -1, charIdx: 0 });
  });
  return stream;
}

function CodeBlock({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const stream = useMemo(() => buildCharStream(), []);
  // If reduced motion, render everything immediately. Otherwise reveal on view.
  const [revealed, setRevealed] = useState<number>(reduced ? stream.length : 0);

  useEffect(() => {
    if (reduced) {
      setRevealed(stream.length);
      return;
    }
    if (!inView) return;
    // ~40 chars/sec = 25ms per char. Total ~3s for typical block.
    const stepMs = 25;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= stream.length) {
        window.clearInterval(id);
      }
    }, stepMs);
    return () => window.clearInterval(id);
  }, [inView, reduced, stream.length]);

  // Group revealed chars back into lines for rendering.
  const lines: Array<Array<{ ch: string; color?: string }>> = useMemo(() => {
    const out: Array<Array<{ ch: string; color?: string }>> = code.map(() => []);
    for (let i = 0; i < Math.min(revealed, stream.length); i++) {
      const c = stream[i];
      if (c.ch === "\n") continue;
      out[c.lineIdx].push({ ch: c.ch, color: c.color });
    }
    return out;
  }, [revealed, stream]);

  const totalChars = stream.length;
  const cursorLineIdx = useMemo(() => {
    if (revealed >= totalChars) return code.length - 1;
    const cur = stream[Math.min(revealed, totalChars - 1)];
    return cur ? cur.lineIdx : code.length - 1;
  }, [revealed, stream, totalChars]);

  return (
    <div ref={ref} className="overflow-hidden rounded-soft sdk-surface">
      {/* Filename tab */}
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
          <span className="ml-3 font-mono text-[12px] text-paper/60">behaviors/greet_on_phrase.py</span>
        </div>
        <span className="mono-caps text-paper/40">Python</span>
      </div>
      {/* Code body */}
      <div className="overflow-x-auto px-5 py-5">
        <pre className="m-0 min-w-max bg-transparent p-0">
          {lines.map((line, i) => {
            // Render a non-breaking space for empty lines so the height stays.
            const isEmpty = line.length === 0;
            const showCursor = i === cursorLineIdx;
            return (
              <div key={i} className="flex">
                <span
                  className="select-none pr-5 text-right font-mono text-[12px] text-paper/30"
                  style={{ width: "2.4rem" }}
                >
                  {i + 1}
                </span>
                <code className="font-mono text-[14px] leading-[1.65] text-paper">
                  {isEmpty ? " " : line.map((c, j) => (
                    <span key={j} style={c.color ? { color: c.color } : undefined}>
                      {c.ch}
                    </span>
                  ))}
                  {showCursor && <span className="code-cursor" aria-hidden="true" />}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

export default function SDKPlayground() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell id="sdk">
      <header className="mx-auto max-w-[760px] text-center">
        <motion.h2
          initial={reduced ? { opacity: 1 } : { opacity: 1, y: 14 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55 }}
          className="font-display text-display-xl font-700 text-ink"
        >
          {/* COPY: directional, owner=Sandy */}
          Teach it a new behavior in 20 lines.
        </motion.h2>
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 1, y: 14 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-5 font-body text-[17px] leading-[1.6] text-inkMuted"
        >
          {/* COPY: directional, owner=Sandy */}
          The OpenPaw SDK is Python-first, MCP-ready, and ships with 12 starter
          behaviors. Fork one, change a few lines, flash it back.
        </motion.p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-[1.5fr,1fr] md:gap-7">
        {/* Code block — 60% — typewriter reveal */}
        <CodeBlock reduced={reduced} />

        {/* Demo image — 40% — soft lime halo + gentle float */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/5]">
            {/* Lime halo glow behind the image, pulses on a 6s loop. */}
            {!reduced && (
              <div
                aria-hidden="true"
                className="sdk-halo pointer-events-none absolute inset-0 rounded-card"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(4,218,141,0.35) 0%, rgba(4,218,141,0) 65%)",
                  filter: "blur(18px)",
                }}
              />
            )}
            <div
              className={`relative h-full w-full overflow-hidden rounded-card border border-ink/8 bg-paperShadow ${
                reduced ? "" : "sdk-float"
              }`}
            >
              <img
                src={withBase("/assets/generated/sdk-demo.png")}
                alt="OpenPaw robot beside a laptop showing code in an editor"
                className="h-full w-full select-none object-cover"
              />
            </div>
          </div>
          <p className="mt-3 font-body text-[14px] leading-[1.6] text-inkMuted">
            {/* COPY: directional, owner=Sandy */}
            The exact behavior on the left, running on real hardware.
          </p>
        </div>
      </div>

      {/* Chip tags — stagger fade-up */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {["Python SDK", "MCP-compatible", "Flash-over-USB"].map((label, i) => (
          <motion.div
            key={label}
            initial={reduced ? { opacity: 1 } : { opacity: 1, y: 8 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <ChipTag>{label}</ChipTag>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
