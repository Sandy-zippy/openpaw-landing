type Variant = "default" | "lime" | "dark";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export default function ChipTag({ children, variant = "default", className }: Props) {
  const variants: Record<Variant, string> = {
    default: "bg-paperShadow text-ink",
    lime: "bg-lime text-ink",
    dark: "bg-ink text-paper",
  };

  return (
    <span
      className={`mono-caps inline-flex items-center rounded-pill px-3 py-1.5 ${variants[variant]}${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
