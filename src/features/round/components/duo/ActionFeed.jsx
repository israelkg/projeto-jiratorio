import { motion as Motion } from "motion/react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionFeed({ actions, actionStyle }) {
  return (
    <Motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden flex flex-col"
      style={{ boxShadow: "0 12px 0 #000, 0 18px 32px rgba(0,0,0,0.6)", maxHeight: "600px" }}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-balatro-card-edge bg-black/30">
        <Zap size={14} className="text-balatro-gold" />
        <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-gold text-glow-gold uppercase">
          Histórico
        </span>
      </div>
      <div className="overflow-y-auto flex flex-col">
        {actions.map((a, i) => {
          const cfg = actionStyle[a.type];
          const AIcon = cfg.Icon;
          return (
            <Motion.div
              key={a.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className={cn(
                "flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors",
                i < actions.length - 1 && "border-b border-balatro-card-edge/40",
              )}
            >
              <div
                className="w-9 h-9 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
              >
                <AIcon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span
                    className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded"
                    style={{ color: cfg.color, background: `${cfg.color}20` }}
                  >
                    {cfg.label}
                  </span>
                  <span
                    className="font-pixel text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: cfg.color, textShadow: `0 0 8px ${cfg.color}` }}
                  >
                    {a.team}
                  </span>
                </div>
                <p className="text-[12px] text-balatro-text-dim leading-snug">
                  {a.action}{" "}
                  {a.detail && <span className="text-balatro-text">{a.detail}</span>}
                  {a.value && (
                    <span className="font-pixel ml-2 text-[10px]" style={{ color: cfg.color }}>
                      {a.value}
                    </span>
                  )}
                </p>
              </div>
            </Motion.div>
          );
        })}
      </div>
    </Motion.div>
  );
}
