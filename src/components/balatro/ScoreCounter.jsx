import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ScoreCounter({ value, duration = 1200, className, glow = "blue" }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    const start = startRef.current;
    const delta = value - start;
    if (delta === 0) return;
    const startTime = performance.now();

    let raf;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + delta * eased);
      setDisplay(current);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else startRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  const glowClass = {
    blue: "text-balatro-blue text-glow-blue",
    red: "text-balatro-red text-glow-red",
    gold: "text-balatro-gold text-glow-gold",
    purple: "text-balatro-purple text-glow-purple",
  }[glow];

  return (
    <Motion.span
      key={value}
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={cn("font-pixel tabular-nums", glowClass, className)}
    >
      {display.toLocaleString("pt-BR")}
    </Motion.span>
  );
}
