"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
};

export default function CTAGhost({ children, href, onClick, external, className }: Props) {
  const cls = `inline-flex items-center justify-center rounded-pill border border-ink/20 bg-transparent px-7 py-4 font-display text-[15px] font-500 tracking-tight text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cls}
    >
      {children}
    </motion.button>
  );
}
