type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "muted" | "lime";
};

export default function EyebrowLabel({ children, className, tone = "muted" }: Props) {
  const toneClass = tone === "ink" ? "text-ink" : tone === "lime" ? "text-ink" : "text-inkMuted";
  return (
    <div className={`mono-caps ${toneClass}${className ? ` ${className}` : ""}`}>
      {tone === "lime" ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
}
