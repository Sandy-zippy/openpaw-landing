import SectionShell from "@/components/primitives/SectionShell";
import ChipTag from "@/components/primitives/ChipTag";
import PlaceholderImage from "@/components/primitives/PlaceholderImage";
import { withBase } from "@/lib/withBase";

// Tokenized Python code rendered server-side. We do this by hand instead of
// pulling in prism-react-renderer just to keep the dep graph tight.
type Tok = { v: string; c?: string };

const code: Tok[][] = [
  [{ v: "from", c: "kw" }, { v: " openpaw " }, { v: "import", c: "kw" }, { v: " Robot, listen" }],
  [{ v: "" }],
  [{ v: "paw = Robot(name=" }, { v: '"Mochi"', c: "str" }, { v: ")" }],
  [{ v: "" }],
  [{ v: "@listen", c: "dec" }, { v: ".for_phrase(" }, { v: '"Mochi"', c: "str" }, { v: ")" }],
  [{ v: "def", c: "kw" }, { v: " greet(ctx):" }],
  [{ v: "    " }, { v: "if", c: "kw" }, { v: " ctx.confidence > " }, { v: "0.7", c: "num" }, { v: ":" }],
  [{ v: "        paw.look_toward(ctx.source)" }],
  [{ v: "        paw.wag_tail(speed=" }, { v: "1.2", c: "num" }, { v: ", duration=" }, { v: "2.0", c: "num" }, { v: ")" }],
  [{ v: "        paw.say(" }, { v: '"hey, you"', c: "str" }, { v: ", voice=" }, { v: '"warm"', c: "str" }, { v: ")" }],
  [{ v: "    " }, { v: "else", c: "kw" }, { v: ":" }],
  [{ v: "        paw.tilt_head()" }],
  [{ v: "" }],
  [{ v: "paw.run()" }],
];

const colorMap: Record<string, string> = {
  kw: "#C8E94B",      // lime: keywords
  str: "#E8E2D2",     // paper-shadow: strings
  num: "#F5F1E8",     // paper: numbers
  dec: "#C8E94B",     // lime: decorators
};

function CodeLine({ line, index, isLast }: { line: Tok[]; index: number; isLast: boolean }) {
  return (
    <div className="flex">
      <span className="select-none pr-5 text-right font-mono text-[12px] text-paper/30" style={{ width: "2.4rem" }}>
        {index + 1}
      </span>
      <code className="font-mono text-[14px] leading-[1.65] text-paper">
        {line.map((tok, i) => (
          <span key={i} style={tok.c ? { color: colorMap[tok.c] } : undefined}>
            {tok.v || " "}
          </span>
        ))}
        {isLast && <span className="code-cursor" aria-hidden="true" />}
      </code>
    </div>
  );
}

export default function SDKPlayground() {
  return (
    <SectionShell id="sdk">
      <header className="mx-auto max-w-[760px] text-center">
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Teach it a new behavior in 20 lines.
        </h2>
        <p className="mt-5 font-body text-[17px] leading-[1.6] text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          The OpenPaw SDK is Python-first, MCP-ready, and ships with 12 starter
          behaviors. Fork one, change a few lines, flash it back.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-[1.5fr,1fr] md:gap-7">
        {/* Code block — 60% */}
        <div className="overflow-hidden rounded-soft sdk-surface">
          {/* Filename tab */}
          <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
              <span className="ml-3 font-mono text-[12px] text-paper/60">behaviors/wag_on_call.py</span>
            </div>
            <span className="mono-caps text-paper/40">Python</span>
          </div>
          {/* Code body */}
          <div className="overflow-x-auto px-5 py-5">
            <pre className="m-0 min-w-max bg-transparent p-0">
              {code.map((line, i) => (
                <CodeLine key={i} line={line} index={i} isLast={i === code.length - 1} />
              ))}
            </pre>
          </div>
        </div>

        {/* Demo image — 40% */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink/8 bg-paperShadow">
            <img
              src={withBase("/assets/generated/sdk-demo.png")}
              alt="OpenPaw robot beside a laptop showing code in an editor"
              className="h-full w-full select-none object-cover"
            />
          </div>
          <p className="mt-3 font-body text-[14px] leading-[1.6] text-inkMuted">
            {/* COPY: directional, owner=Sandy */}
            The exact behavior on the left, running on real hardware.
          </p>
        </div>
      </div>

      {/* Chip tags */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <ChipTag>Python SDK</ChipTag>
        <ChipTag>MCP-compatible</ChipTag>
        <ChipTag>Flash-over-USB</ChipTag>
      </div>
    </SectionShell>
  );
}
