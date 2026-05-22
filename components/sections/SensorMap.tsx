"use client";

import { useState } from "react";
import SectionShell from "@/components/primitives/SectionShell";

type Callout = {
  id: string;
  label: string;
  detail: string;
  // Coordinate of label on 800x600 viewBox + which side the callout line exits.
  x: number;
  y: number;
  side: "left" | "right";
};

const callouts: Callout[] = [
  { id: "cam", label: "1080p wide-FOV camera", detail: "Front-mounted CSI camera, 1080p @ 60fps, 110° wide field of view.", x: 400, y: 230, side: "left" },
  { id: "mics", label: "4-mic array", detail: "Top-mounted beamforming array for directional voice + ambient capture.", x: 400, y: 160, side: "right" },
  { id: "speaker", label: "Full-range speaker", detail: "Chest-mounted 28mm full-range driver. Tuned for voice + soft chimes.", x: 400, y: 340, side: "left" },
  { id: "temp", label: "Temp + ambient light", detail: "Combined I²C sensor — feeds room context to behavior policies.", x: 510, y: 280, side: "right" },
  { id: "imu", label: "6-axis IMU", detail: "Accel + gyro on the body PCB. Detects tip, lift, and motion.", x: 510, y: 330, side: "right" },
  { id: "servos", label: "2-DOF neck + 4-DOF body", detail: "Six total servos. Sub-1° resolution on the neck. All driver code open.", x: 290, y: 360, side: "left" },
  { id: "edge", label: "Edge LLM compute", detail: "Gemma-3-class on-device LLM, 4B params quantized to INT4 (exact chip TBD).", x: 410, y: 410, side: "left" },
  { id: "ports", label: "USB-C + micro-HDMI debug", detail: "Power, flash, and serial console — no hidden test pads.", x: 510, y: 430, side: "right" },
  { id: "shell", label: "3D-printable shell", detail: "PETG / PLA shells. STL provided for every external panel.", x: 290, y: 460, side: "left" },
  { id: "battery", label: "Battery + USB-C charging", detail: "Internal Li-ion + USB-C PD charging. Hot-swap planned for v2.", x: 510, y: 490, side: "right" },
];

// Stylized robot silhouette (centered around x=400, y=300)
function RobotSilhouette() {
  return (
    <g>
      {/* Head */}
      <ellipse cx="400" cy="220" rx="105" ry="95" fill="#E8E2D2" stroke="#1A1B1F" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="372" cy="215" r="14" fill="#1A1B1F" />
      <circle cx="428" cy="215" r="14" fill="#1A1B1F" />
      <circle cx="376" cy="211" r="3" fill="#F5F1E8" />
      <circle cx="432" cy="211" r="3" fill="#F5F1E8" />
      {/* Antenna */}
      <line x1="400" y1="125" x2="400" y2="105" stroke="#1A1B1F" strokeWidth="1.5" />
      <circle cx="400" cy="100" r="5" fill="#C8E94B" stroke="#1A1B1F" strokeWidth="1.5" />
      {/* Mic array dots on top */}
      <circle cx="368" cy="135" r="2.5" fill="#1A1B1F" />
      <circle cx="385" cy="128" r="2.5" fill="#1A1B1F" />
      <circle cx="415" cy="128" r="2.5" fill="#1A1B1F" />
      <circle cx="432" cy="135" r="2.5" fill="#1A1B1F" />
      {/* Neck */}
      <rect x="385" y="305" width="30" height="22" rx="4" fill="#E8E2D2" stroke="#1A1B1F" strokeWidth="1.5" />
      {/* Body */}
      <rect x="320" y="325" width="160" height="160" rx="22" fill="#E8E2D2" stroke="#1A1B1F" strokeWidth="1.5" />
      {/* Speaker grille (chest) */}
      <g stroke="#1A1B1F" strokeWidth="1" opacity="0.8">
        <line x1="350" y1="360" x2="450" y2="360" />
        <line x1="350" y1="370" x2="450" y2="370" />
        <line x1="350" y1="380" x2="450" y2="380" />
      </g>
      {/* Body panel — edge LLM compute */}
      <rect x="360" y="400" width="80" height="40" rx="6" fill="#F5F1E8" stroke="#1A1B1F" strokeWidth="1.2" />
      <text x="400" y="425" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#1A1B1F" letterSpacing="0.1em">LLM</text>
      {/* Ports */}
      <rect x="445" y="455" width="18" height="6" rx="2" fill="#1A1B1F" />
      <rect x="425" y="455" width="14" height="6" rx="2" fill="#1A1B1F" />
      {/* Base shadow ellipse */}
      <ellipse cx="400" cy="500" rx="100" ry="6" fill="#1A1B1F" opacity="0.06" />
    </g>
  );
}

function CalloutLine({
  c, active, onActivate,
}: { c: Callout; active: boolean; onActivate: () => void }) {
  // Endpoint on the silhouette — approximate
  const ex = c.side === "left" ? c.x - 70 : c.x + 70;
  const ey = c.y;
  // Label endpoint near the edge of the extended viewBox (-220 to 1020).
  // Keep a small inset from the absolute edge so descenders aren't clipped.
  const lx = c.side === "left" ? -40 : 840;
  const ly = c.y;

  return (
    <g
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      role="button"
      aria-label={c.label}
      className="cursor-pointer outline-none"
    >
      <line
        x1={ex}
        y1={ey}
        x2={lx}
        y2={ly}
        stroke="#1A1B1F"
        strokeWidth={active ? 2 : 1}
        opacity={active ? 1 : 0.55}
      />
      <circle
        cx={ex}
        cy={ey}
        r={active ? 5 : 3.5}
        fill={active ? "#C8E94B" : "#1A1B1F"}
        stroke="#1A1B1F"
        strokeWidth="1"
      />
      <text
        x={c.side === "left" ? lx - 4 : lx + 4}
        y={ly + 4}
        textAnchor={c.side === "left" ? "end" : "start"}
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fill="#1A1B1F"
        letterSpacing="0.06em"
        fontWeight={active ? 600 : 500}
      >
        {c.label}
      </text>
    </g>
  );
}

export default function SensorMap() {
  const [active, setActive] = useState<string>(callouts[0].id);
  const activeCallout = callouts.find((c) => c.id === active) ?? callouts[0];

  return (
    <SectionShell id="hardware">
      <header className="mx-auto max-w-[760px] text-center">
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          The hardware, in the open.
        </h2>
        <p className="mt-5 font-body text-[17px] leading-[1.6] text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          Every sensor, every chip, every degree of freedom — annotated,
          documented, and downloadable.
        </p>
      </header>

      {/* Desktop: SVG with hoverable callouts */}
      <div className="mt-14 hidden md:block">
        <svg
          viewBox="-220 0 1240 580"
          className="w-full"
          role="img"
          aria-label="OpenPaw annotated sensor map"
        >
          <RobotSilhouette />
          {callouts.map((c) => (
            <CalloutLine
              key={c.id}
              c={c}
              active={c.id === active}
              onActivate={() => setActive(c.id)}
            />
          ))}
        </svg>
        <div className="mx-auto mt-6 max-w-[640px] rounded-card bg-paperShadow px-6 py-4 text-center">
          <div className="mono-caps text-inkMuted">{activeCallout.label}</div>
          <p className="mt-2 font-body text-[15px] leading-[1.6] text-ink">
            {/* COPY: directional, owner=Sandy */}
            {activeCallout.detail}
          </p>
        </div>
      </div>

      {/* Mobile: static SVG + tap-to-expand callout list */}
      <div className="mt-12 md:hidden">
        <svg
          viewBox="200 80 400 440"
          className="mx-auto w-full max-w-[420px]"
          role="img"
          aria-label="OpenPaw silhouette"
        >
          <RobotSilhouette />
        </svg>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {callouts.map((c) => (
            <MobileCalloutRow key={c.id} c={c} />
          ))}
        </div>
      </div>

      {/* Chip strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span className="mono-caps text-inkMuted">Powered by</span>
        {/* COPY: directional, owner=Sandy */}
        {/* TODO: only ship logos we can legitimately claim by launch */}
        {["[CHIP VENDOR TBD]", "JLCPCB", "OSHWA"].map((s) => (
          <span key={s} className="mono-caps text-ink opacity-50">{s}</span>
        ))}
      </div>
    </SectionShell>
  );
}

function MobileCalloutRow({ c }: { c: Callout }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="mono-caps text-ink">{c.label}</span>
        <span className="mono-caps text-inkMuted" aria-hidden="true">{open ? "—" : "+"}</span>
      </button>
      {open && (
        <p className="pb-4 font-body text-[15px] leading-[1.6] text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          {c.detail}
        </p>
      )}
    </div>
  );
}
