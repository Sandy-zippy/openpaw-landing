type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "paper" | "ink";
  /** Reduce vertical padding for tighter sections (footer, problem strip). */
  tight?: boolean;
};

export default function SectionShell({ children, id, className, tone = "paper", tight }: Props) {
  const bg = tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink";
  // Mobile gets a tighter rhythm so the page doesn't feel stretched between
  // sections; desktop keeps its breathing room.
  const padY = tight
    ? "py-12 md:py-24"
    : "py-14 md:py-[120px]";
  return (
    <section id={id} className={`${bg} ${padY}${className ? ` ${className}` : ""}`}>
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">{children}</div>
    </section>
  );
}
