"use client";

import SectionShell from "@/components/primitives/SectionShell";
import EyebrowLabel from "@/components/primitives/EyebrowLabel";
import { ROADMAP, FORUM_URL } from "@/lib/siteConfig";

function StatusDot({ status, isHere }: { status: "done" | "half" | "todo"; isHere?: boolean }) {
  if (status === "done") {
    return (
      <span
        className={`inline-block h-3 w-3 flex-shrink-0 rounded-full bg-lime ${isHere ? "quiet-pulse" : ""}`}
        aria-label="completed"
      />
    );
  }
  if (status === "half") {
    return (
      <span className="relative inline-block h-3 w-3 flex-shrink-0 rounded-full border border-ink/40" aria-label="in progress">
        <span className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
          <span className="block h-3 w-3 rounded-full bg-ink" />
        </span>
      </span>
    );
  }
  return (
    <span className="inline-block h-3 w-3 flex-shrink-0 rounded-full border border-ink/30" aria-label="upcoming" />
  );
}

type CommunityTileProps = {
  label: string;
  metric: string;
  detail: string;
  href: string;
  cta: string;
  glyph: React.ReactNode;
};

function CommunityTile({ label, metric, detail, href, cta, glyph }: CommunityTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-card border border-ink/10 bg-paper p-6 shadow-card transition-shadow hover:shadow-cardHover"
    >
      <div className="flex items-center justify-between">
        <div className="text-ink">{glyph}</div>
        <span className="mono-caps text-inkMuted transition-colors group-hover:text-ink">{cta} →</span>
      </div>
      <div className="mt-6 font-display text-[36px] font-700 leading-none tracking-tight text-ink">
        {/* COPY: directional, owner=Sandy */}
        {metric}
      </div>
      <div className="mt-2 font-display text-[15px] font-600 text-ink">{label}</div>
      <div className="mt-1 font-body text-[13px] text-inkMuted">{detail}</div>
    </a>
  );
}

const GithubGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.79.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const ForumGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 1 4.21 7.61L3 21l1.39-4.16A9 9 0 0 1 3 12z" />
    <line x1="8" y1="11" x2="16" y2="11" />
    <line x1="8" y1="14" x2="13" y2="14" />
  </svg>
);

export default function CommunityRoadmap() {
  return (
    <SectionShell id="roadmap">
      <header className="mx-auto max-w-[760px] text-center">
        <EyebrowLabel className="mb-5 justify-center">PUBLIC ROADMAP</EyebrowLabel>
        <h2 className="font-display text-display-xl font-700 text-ink">
          {/* COPY: directional, owner=Sandy */}
          Built in public. Shipped together.
        </h2>
        <p className="mt-5 font-body text-[17px] leading-[1.6] text-inkMuted">
          {/* COPY: directional, owner=Sandy */}
          Our goal: <span className="font-600 text-ink">100 community-built behaviors live on launch day.</span>{" "}
          Join the build.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr,1fr] lg:gap-14">
        {/* Roadmap */}
        <ol className="relative">
          {/* Vertical rail */}
          <span aria-hidden="true" className="absolute left-[6px] top-2 bottom-2 w-px bg-ink/15" />

          {ROADMAP.map((item, i) => (
            <li key={i} className="relative flex items-start gap-5 pb-7 last:pb-0">
              <div className="relative z-10 mt-1.5">
                <StatusDot status={item.status} isHere={item.isHere} />
              </div>
              <div className="flex-1">
                <div className="mono-caps text-inkMuted">{item.date}</div>
                <div className="mt-1 font-display text-[20px] font-600 text-ink">
                  {/* COPY: directional, owner=Sandy */}
                  {item.label}
                  {item.isHere && (
                    <span className="ml-3 inline-block translate-y-[-2px] rounded-pill bg-lime px-2 py-[2px] font-mono text-[10px] font-600 uppercase tracking-[0.14em] text-ink">
                      we are here
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Community tiles — Discord tile pulled until we can plug a real live
            count. GitHub tile points to the VIP form since the repo doesn't
            exist publicly yet. */}
        <div className="grid grid-cols-1 gap-4">
          <CommunityTile
            label="GitHub"
            metric="June '26"
            detail="repo opens with SDK public beta"
            href="#vip"
            cta="Get notified"
            glyph={<GithubGlyph />}
          />
          <CommunityTile
            label="Forum"
            metric="Soon"
            detail="long-form build logs · opens with Kickstarter"
            href={FORUM_URL}
            cta="Get notified"
            glyph={<ForumGlyph />}
          />
        </div>
      </div>
    </SectionShell>
  );
}
