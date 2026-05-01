import { motion as Motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PODIUM_BY_RANK } from "./podiumConfig";
import { cn } from "@/lib/utils";

const TREND = {
  up:   { Icon: TrendingUp,   color: "#50c878" },
  down: { Icon: TrendingDown, color: "#fe5f55" },
  same: { Icon: Minus,        color: "rgba(255,255,255,0.3)" },
};

export function PlayerRow({ player, idx, total, RollingNumber }) {
  const trend = TREND[player.trend] ?? TREND.same;
  const TrendIcon = trend.Icon;
  const isTop3 = idx < 3;
  const podiumColor = isTop3 ? PODIUM_BY_RANK[idx + 1].color : "rgba(255,255,255,0.4)";
  const isLast = idx === total - 1;

  return (
    <Motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.1 + idx * 0.06 }}
      className={cn(
        "grid items-center gap-2 px-5 py-3 hover:bg-white/5 transition-colors",
        !isLast && "border-b border-balatro-card-edge/40",
      )}
      style={{ gridTemplateColumns: "2.5rem 1fr 5rem 5rem" }}
    >
      <span
        className="font-pixel text-sm tabular-nums"
        style={{ color: podiumColor, textShadow: isTop3 ? `0 0 8px ${podiumColor}` : "none" }}
      >
        {idx + 1}
      </span>
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-pixel text-[10px] flex-shrink-0 border-2"
          style={{
            background: isTop3 ? podiumColor : "rgba(255,255,255,0.08)",
            color: isTop3 ? "#0a0a1a" : "rgba(255,255,255,0.7)",
            borderColor: isTop3 ? podiumColor : "rgba(255,255,255,0.15)",
          }}
        >
          {player.avatar}
        </div>
        <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text truncate">
          {player.name}
        </span>
        <TrendIcon size={12} style={{ color: trend.color, flexShrink: 0 }} />
      </div>
      <span
        className={cn(
          "font-pixel text-xs tabular-nums",
          player.roundPoints > 0 ? "text-balatro-green" : "text-balatro-text-dim",
        )}
      >
        {player.roundPoints > 0 ? `+${player.roundPoints}` : "—"}
      </span>
      <span className="font-pixel text-xs tabular-nums text-balatro-text">
        <RollingNumber value={player.totalPoints} duration={900} />
        <span className="text-[8px] text-balatro-text-dim ml-1">pts</span>
      </span>
    </Motion.div>
  );
}
