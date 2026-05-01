import { motion as Motion } from "motion/react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  blue:   "bg-balatro-blue   text-white border-blue-900   hover:shadow-balatro-glow-blue",
  red:    "bg-balatro-red    text-white border-red-900    hover:shadow-balatro-glow-red",
  gold:   "bg-balatro-gold   text-black border-yellow-700 hover:shadow-balatro-glow-gold",
  green:  "bg-balatro-green  text-white border-green-900",
  purple: "bg-balatro-purple text-white border-purple-900",
  ghost:  "bg-balatro-card text-balatro-text border-balatro-card-edge",
};

export function BalatroButton({
  children,
  variant = "blue",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className,
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <Motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled && { y: -2 }}
      whileTap={!disabled && { y: 2, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
      className={cn(
        "relative font-pixel uppercase tracking-wider rounded-lg border-b-4 select-none",
        "transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </Motion.button>
  );
}
