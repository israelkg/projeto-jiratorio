import { motion as Motion } from "motion/react";
import { cn } from "@/lib/utils";

const VARIANT_BORDERS = {
  default: "border-balatro-card-edge",
  blue: "border-balatro-blue",
  red: "border-balatro-red",
  gold: "border-balatro-gold",
  green: "border-balatro-green",
  purple: "border-balatro-purple",
};

const VARIANT_GLOWS = {
  default: "",
  blue: "shadow-balatro-glow-blue",
  red: "shadow-balatro-glow-red",
  gold: "shadow-balatro-glow-gold",
  green: "",
  purple: "",
};

export function BalatroCard({
  children,
  variant = "default",
  foil = false,
  holo = false,
  selected = false,
  onClick,
  className,
}) {
  const Component = onClick ? Motion.button : Motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={{ y: -12, scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      animate={selected ? { y: -24, scale: 1.08 } : { y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative overflow-hidden rounded-xl border-2 bg-balatro-card",
        "shadow-balatro-card",
        VARIANT_BORDERS[variant],
        VARIANT_GLOWS[variant],
        holo && "holo-gradient",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <div className="relative z-10 p-4">{children}</div>
      {foil && <div className="foil-shimmer absolute inset-0 z-20 pointer-events-none" />}
    </Component>
  );
}
