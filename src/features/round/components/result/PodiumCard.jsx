import { motion as Motion } from "motion/react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PODIUM_BY_RANK } from "./podiumConfig";

export function PodiumCard({ player, rank, visualIdx }) {
  const cfg = PODIUM_BY_RANK[rank];
  if (!player || !cfg) return null;

  return (
    <Motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 + visualIdx * 0.15, type: "spring", stiffness: 220, damping: 18 }}
      className="flex flex-col items-center gap-2 flex-1 max-w-[180px]"
    >
      {cfg.crown && (
        <Motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <Crown
            size={32}
            fill={cfg.color}
            className="text-balatro-gold"
            style={{ filter: `drop-shadow(${cfg.glow})` }}
          />
        </Motion.div>
      )}

      {/* Player card */}
      <div
        className="relative w-full rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col items-center p-3 gap-2"
        style={{ borderColor: cfg.color, boxShadow: `0 10px 0 #000, 0 16px 28px rgba(0,0,0,0.7), ${cfg.glow}` }}
      >
        <span className="absolute top-2 left-2 font-pixel text-base" style={{ color: cfg.color }}>
          {cfg.suit}
        </span>
        <span className="absolute bottom-2 right-2 font-pixel text-base rotate-180" style={{ color: cfg.color }}>
          {cfg.suit}
        </span>

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-pixel text-base text-balatro-bg-deep border-4"
          style={{ background: cfg.color, borderColor: cfg.color }}
        >
          {player.avatar}
        </div>
        <span className="font-pixel text-[9px] tracking-[0.2em] uppercase text-balatro-text truncate w-full text-center">
          {player.name}
        </span>
        <span
          className="font-pixel text-xl tabular-nums"
          style={{ color: cfg.color, textShadow: `0 0 12px ${cfg.color}` }}
        >
          {player.totalPoints}
          <span className="text-[8px] text-balatro-text-dim ml-1">pts</span>
        </span>
      </div>

      {/* Podium block */}
      <div
        className={cn(
          "w-full rounded-t-xl flex items-center justify-center font-pixel text-3xl text-balatro-bg-deep border-x-4 border-t-4",
          cfg.height,
        )}
        style={{ background: cfg.color, borderColor: cfg.color, boxShadow: `0 -6px 24px ${cfg.color}66` }}
      >
        {cfg.label}
      </div>
    </Motion.div>
  );
}
