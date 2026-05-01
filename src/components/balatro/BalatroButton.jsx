import { motion as Motion } from "motion/react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  blue:   "bg-balatro-blue   text-white border-blue-950   hover:shadow-balatro-glow-blue",
  red:    "bg-balatro-red    text-white border-red-950    hover:shadow-balatro-glow-red",
  gold:   "bg-balatro-gold   text-balatro-bg-deep border-yellow-800 hover:shadow-balatro-glow-gold",
  green:  "bg-balatro-green  text-white border-green-900",
  purple: "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.6)]",
  ghost:  "bg-balatro-card   text-balatro-text border-black hover:bg-balatro-card-edge",
};

const SIZES = {
  sm: "px-4 py-2 text-[10px] gap-2 rounded-lg",
  md: "px-8 py-3 text-[12px] gap-2 rounded-xl",
  lg: "px-12 py-4 text-sm gap-3 rounded-2xl",
};

/**
 * Botão pixel-art Balatro — border-b-4 + spring tap + variantes coloridas.
 * Substitui implementações inline em CTAs de página.
 */
export function BalatroButton({
  children,
  variant = "blue",
  size = "lg",
  onClick,
  type = "button",
  disabled = false,
  className,
  ariaLabel,
}) {
  return (
    <Motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={!disabled ? { y: -3, scale: 1.03 } : undefined}
      whileTap={!disabled ? { y: 2, scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
      className={cn(
        "font-pixel tracking-[0.25em] uppercase border-b-4 select-none flex items-center justify-center",
        "transition-shadow duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </Motion.button>
  );
}
