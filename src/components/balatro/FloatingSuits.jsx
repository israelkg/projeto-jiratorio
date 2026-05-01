import { motion as Motion, useReducedMotion } from "motion/react";
import { Spade, Heart, Diamond, Club } from "lucide-react";

const DEFAULT_SUITS = [
  { Comp: Spade,   color: "#f5f5f0", x: "10%", delay: 0 },
  { Comp: Heart,   color: "#fe5f55", x: "85%", delay: 1.4 },
  { Comp: Diamond, color: "#f0c040", x: "20%", delay: 2.8 },
  { Comp: Club,    color: "#50c878", x: "75%", delay: 4.2 },
];

export function FloatingSuits({ count = 4, duration = 16, size = 28 }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const suits = DEFAULT_SUITS.slice(0, count);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {suits.map((s, i) => {
        const SIcon = s.Comp;
        return (
          <Motion.div
            key={`${s.color}-${i}`}
            className="absolute will-change-transform"
            style={{ left: s.x, color: s.color }}
            initial={{ y: "110vh", opacity: 0, rotate: 0 }}
            animate={{ y: "-20vh", opacity: [0, 0.4, 0], rotate: 360 }}
            transition={{ duration, delay: s.delay, repeat: Infinity, ease: "linear" }}
          >
            <SIcon size={size} fill="currentColor" />
          </Motion.div>
        );
      })}
    </div>
  );
}
