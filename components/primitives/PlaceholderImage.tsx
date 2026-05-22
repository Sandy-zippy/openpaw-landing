type Props = {
  label: string;
  aspectRatio?: string;     // e.g. "1/1", "16/9", "4/5"
  width?: number | string;  // intrinsic width hint
  height?: number | string; // intrinsic height hint
  tone?: "paper" | "paperShadow" | "ink";
  rounded?: "none" | "soft" | "card";
  showPlay?: boolean;       // tag this as a video loop placeholder
  className?: string;
  caption?: string;         // optional sub-line above label
};

export default function PlaceholderImage({
  label,
  aspectRatio = "1/1",
  width,
  height,
  tone = "paperShadow",
  rounded = "card",
  showPlay = false,
  className,
  caption,
}: Props) {
  const bg =
    tone === "ink" ? "bg-ink text-paper" : tone === "paper" ? "bg-paper text-ink" : "bg-paperShadow text-ink";
  const radius = rounded === "none" ? "" : rounded === "soft" ? "rounded-soft" : "rounded-card";
  const border = tone === "ink" ? "border-paper/15" : "border-ink/10";

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden border ${border} ${bg} ${radius}${className ? ` ${className}` : ""}`}
      style={{
        aspectRatio,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      role="img"
      aria-label={label}
    >
      {/* Subtle dashed grid so the placeholder reads as a frame, not an empty box */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="ph-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid)" />
      </svg>

      {showPlay && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-paper">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M3 1.5L11.5 7L3 12.5V1.5Z" />
          </svg>
        </div>
      )}
      <div className="relative z-10 px-6 text-center">
        {caption && (
          <div className="mono-caps mb-2 opacity-60">{caption}</div>
        )}
        <div className="font-display text-sm font-500 leading-snug tracking-tight opacity-70">
          {label}
        </div>
        <div className="mono-caps mt-2 opacity-40">{aspectRatio}</div>
      </div>
    </div>
  );
}
