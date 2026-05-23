type Spacing = "compact" | "normal" | "spacious";

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "paper" | "ink";
  /** Vertical padding tier. Defaults to "normal". */
  spacing?: Spacing;
  /** @deprecated Use `spacing="compact"`. Kept so existing callers don't break. */
  tight?: boolean;
};

const PAD_Y: Record<Spacing, string> = {
  compact:  "py-12 md:py-20",
  normal:   "py-14 md:py-[120px]",
  spacious: "py-20 md:py-[160px]",
};

export default function SectionShell({ children, id, className, tone = "paper", spacing, tight }: Props) {
  const bg = tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink";
  const resolved: Spacing = spacing ?? (tight ? "compact" : "normal");
  const padY = PAD_Y[resolved];
  return (
    <section id={id} className={`${bg} ${padY}${className ? ` ${className}` : ""}`}>
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">{children}</div>
    </section>
  );
}
