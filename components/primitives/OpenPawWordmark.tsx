import { PROJECT_NAME } from "@/lib/siteConfig";

type Props = {
  className?: string;
  tone?: "ink" | "paper";
  size?: "sm" | "md" | "lg";
};

export default function OpenPawWordmark({ className, tone = "ink", size = "md" }: Props) {
  const sizes = {
    sm: { dot: 14, text: "text-[18px]" },
    md: { dot: 18, text: "text-[22px]" },
    lg: { dot: 26, text: "text-[32px]" },
  } as const;
  const s = sizes[size];
  const textTone = tone === "paper" ? "text-paper" : "text-ink";
  // Paw glyph always renders in PawMe brand green for recognition
  const dotTone = "fill-lime";

  return (
    <div className={`inline-flex items-center gap-2 font-display font-700 tracking-tight ${textTone}${className ? ` ${className}` : ""}`}>
      <svg width={s.dot} height={s.dot} viewBox="0 0 24 24" aria-hidden="true">
        {/* Stylised paw mark — three pads + heel */}
        <circle cx="12" cy="14" r="6" className={dotTone} />
        <circle cx="6" cy="7" r="2.5" className={dotTone} />
        <circle cx="12" cy="5" r="2.5" className={dotTone} />
        <circle cx="18" cy="7" r="2.5" className={dotTone} />
      </svg>
      <span className={s.text}>{PROJECT_NAME}</span>
    </div>
  );
}
