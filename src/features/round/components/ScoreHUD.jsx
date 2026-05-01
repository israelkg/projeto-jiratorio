import { motion as Motion } from "motion/react";
import { Crown } from "lucide-react";
import { useStudentsStore } from "@/features/students/store/studentsStore";
import { cn } from "@/lib/utils";

export function ScoreHUD({ highlightId, className }) {
  const students = useStudentsStore((s) => s.students);
  const sorted = [...students].sort((a, b) => b.points - a.points);
  const top = sorted[0];

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden",
        className,
      )}
      style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-balatro-card-edge bg-black/30">
        <Crown size={12} className="text-balatro-gold" />
        <span className="font-pixel text-[9px] tracking-[0.3em] text-balatro-gold uppercase">
          Pontuação
        </span>
      </div>
      <div className="flex flex-col max-h-[420px] overflow-y-auto">
        {sorted.map((s, idx) => {
          const isTop = s.id === top.id;
          const isHighlight = s.id === highlightId;
          return (
            <Motion.div
              key={s.id}
              layout
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 transition-colors",
                isHighlight ? "bg-balatro-red/15" : "hover:bg-white/5",
                idx < sorted.length - 1 && "border-b border-balatro-card-edge/40",
              )}
            >
              <span
                className="font-pixel text-[10px] tabular-nums w-5 text-center"
                style={{
                  color: isTop ? "#f0c040" : "rgba(255,255,255,0.4)",
                  textShadow: isTop ? "0 0 6px #f0c040" : "none",
                }}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-[9px] tracking-[0.15em] uppercase text-balatro-text truncate">
                  {s.name}
                </p>
                {s.inventory.length > 0 && (
                  <p className="text-[9px] text-balatro-text-dim mt-0.5">
                    🃏 {s.inventory.length}
                  </p>
                )}
              </div>
              <Motion.span
                key={s.points}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="font-pixel text-sm tabular-nums"
                style={{
                  color: isTop ? "#f0c040" : "#f5f5f0",
                  textShadow: isTop ? "0 0 8px #f0c040" : "none",
                }}
              >
                {s.points}
              </Motion.span>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}
