import { motion as Motion } from "motion/react";
import { Crown } from "lucide-react";

export function TeamCard({ team, cfg, isLeader, idx }) {
  const SIcon = cfg.suit;
  return (
    <Motion.div
      initial={{ y: 40, opacity: 0, rotate: -2 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay: 0.1 + idx * 0.08, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative rounded-xl border-4 bg-balatro-card overflow-hidden p-4 flex flex-col gap-3"
      style={{
        borderColor: cfg.color,
        boxShadow: `0 12px 0 #000, 0 18px 32px ${cfg.color}40`,
      }}
    >
      {isLeader && (
        <Motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-3 -right-3"
        >
          <Crown
            size={28}
            fill={cfg.color}
            className="text-balatro-gold"
            style={{ filter: `drop-shadow(0 0 12px ${cfg.color})` }}
          />
        </Motion.div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" style={{ color: cfg.color }}>
          <SIcon size={20} fill="currentColor" />
          <span
            className="font-pixel text-sm tracking-[0.2em] uppercase"
            style={{ textShadow: `0 0 8px ${cfg.color}` }}
          >
            {team.name}
          </span>
        </div>
        <span
          className="font-pixel text-2xl tabular-nums"
          style={{ color: cfg.color, textShadow: `0 0 12px ${cfg.color}` }}
        >
          {team.points}
          <span className="text-[10px] text-balatro-text-dim ml-1">/ {team.maxPoints}</span>
        </span>
      </div>

      {/* Score bar */}
      <div className="relative h-3 rounded-full border-2 border-balatro-card-edge bg-balatro-bg-deep overflow-hidden">
        <Motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(team.points / team.maxPoints) * 100}%` }}
          transition={{ delay: 0.3 + idx * 0.08, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: cfg.color, boxShadow: `0 0 12px ${cfg.color}` }}
        />
      </div>

      {/* Players */}
      <div className="flex flex-col gap-1.5">
        {team.players.map((p) => (
          <div key={p} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-pixel text-[10px] flex-shrink-0"
              style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
            >
              {p.split(" ").map((s) => s[0]).join("").slice(0, 2)}
            </div>
            <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">
              {p}
            </span>
          </div>
        ))}
      </div>
    </Motion.div>
  );
}
