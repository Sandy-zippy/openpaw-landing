"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const baseClass =
  "inline-flex items-center justify-center rounded-pill bg-lime px-7 py-4 font-display text-[15px] font-600 tracking-tight text-ink transition-colors hover:bg-[#D6F25E] focus-visible:outline-ink disabled:opacity-60";

const CTAPrimary = forwardRef<HTMLElement, Props>(function CTAPrimary(
  { children, onClick, href, type = "button", fullWidth, disabled, className, ariaLabel },
  ref
) {
  const cls = `${baseClass}${fullWidth ? " w-full" : ""}${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
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
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cls}
    >
      {children}
    </motion.button>
  );
});

export default CTAPrimary;
