import SectionShell from "@/components/primitives/SectionShell";

type Block = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

// Thin-line diagrams, 1.5px stroke, single accent (lime on muted ink).
function CameraVsRobotDiagram() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="22" height="14" rx="2" stroke="#1A1B1F" strokeWidth="1.5" />
      <circle cx="17" cy="21" r="3.2" stroke="#1A1B1F" strokeWidth="1.5" />
      <path d="M32 21h12" stroke="#C8E94B" strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx="56" cy="50" r="14" stroke="#1A1B1F" strokeWidth="1.5" />
      <circle cx="51" cy="47" r="1.5" fill="#1A1B1F" />
      <circle cx="61" cy="47" r="1.5" fill="#1A1B1F" />
      <path d="M50 55q6 4 12 0" stroke="#1A1B1F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M56 36v-6" stroke="#1A1B1F" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="56" cy="28" r="1.8" fill="#C8E94B" />
    </svg>
  );
}

function HealthSignalDiagram() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <path d="M6 44h12l4-12 6 22 5-14 4 8h32" stroke="#1A1B1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="52" r="2.4" fill="#C8E94B" />
      <circle cx="42" cy="40" r="2.4" fill="#C8E94B" />
      <path d="M58 20a8 8 0 0 1 0 16" stroke="#1A1B1F" strokeWidth="1.5" />
      <path d="M58 24a4 4 0 0 1 0 8" stroke="#1A1B1F" strokeWidth="1.5" />
      <circle cx="58" cy="28" r="1.5" fill="#1A1B1F" />
    </svg>
  );
}

function PhonePlusHardwareDiagram() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="22" height="40" rx="3" stroke="#1A1B1F" strokeWidth="1.5" />
      <path d="M14 22h10M14 28h7M14 34h10M14 40h6" stroke="#1A1B1F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 34h10" stroke="#C8E94B" strokeWidth="1.5" strokeDasharray="2 3" />
      <rect x="48" y="22" width="26" height="26" rx="4" stroke="#1A1B1F" strokeWidth="1.5" />
      <circle cx="55" cy="32" r="1.6" fill="#1A1B1F" />
      <circle cx="67" cy="32" r="1.6" fill="#1A1B1F" />
      <path d="M55 41q6 3 12 0" stroke="#1A1B1F" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="61" cy="18" r="1.6" fill="#C8E94B" />
    </svg>
  );
}

const blocks: Block[] = [
  {
    icon: <CameraVsRobotDiagram />,
    title: "AI in the room, not in a server farm.",
    body: "Cloud assistants forget you the moment the tab closes. OpenPaw runs on-device — it sees, listens, and remembers, locally, in the room with you.",
  },
  {
    icon: <HealthSignalDiagram />,
    title: "On-device. Always-on. Yours.",
    body: "Vision, audio, and a Gemma-class language model all run on the robot. No subscription. No mic pointed at someone else's data center.",
  },
  {
    icon: <PhonePlusHardwareDiagram />,
    title: "Open hardware in a world of closed AI.",
    body: "Humane, Rabbit, Friend — every consumer AI device this year shipped locked. We open every byte: firmware, schematics, BOM, the lot.",
  },
];

export default function ProblemStrip() {
  return (
    <SectionShell id="problem">
      <header className="mx-auto max-w-[760px] text-center">
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Phones forget. Robots remember.
        </h2>
      </header>

      <div className="relative mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
        {blocks.map((b, i) => (
          <article key={b.title} className="flex flex-col items-start gap-5">
            <div>{b.icon}</div>
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
          </article>
        ))}
      </div>

      {/* Centered divider with lime dot */}
      <div className="mt-20 flex items-center justify-center gap-4">
        <div className="h-px w-24 bg-ink/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        <div className="h-px w-24 bg-ink/15" />
      </div>
    </SectionShell>
  );
}
