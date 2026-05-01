import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Crown, Trophy, ChevronRight, RotateCcw,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { FloatingSuits } from "@/components/balatro/FloatingSuits";

import { cn } from "@/lib/utils";

const DEMO_PLAYERS = [
  { id: 1, name: "FULANO 1", totalPoints: 14, roundPoints: 3, avatar: "F1", trend: "up",   chips: 240, mult: 6 },
  { id: 2, name: "FULANO 2", totalPoints: 11, roundPoints: 1, avatar: "F2", trend: "down", chips: 200, mult: 4 },
  { id: 3, name: "FULANO 3", totalPoints: 9,  roundPoints: 2, avatar: "F3", trend: "up",   chips: 180, mult: 3 },
  { id: 4, name: "FULANO 4", totalPoints: 7,  roundPoints: 0, avatar: "F4", trend: "same", chips: 140, mult: 2 },
  { id: 5, name: "FULANO 5", totalPoints: 4,  roundPoints: 1, avatar: "F5", trend: "up",   chips: 100, mult: 1 },
];

const PODIUM = {
  1: { color: "#f0c040", glow: "0 0 32px rgba(240,192,64,0.6)", suit: "♠", height: "h-44", crown: true,  label: "1ST" },
  2: { color: "#cbd5e1", glow: "0 0 24px rgba(203,213,225,0.4)", suit: "♥", height: "h-32", crown: false, label: "2ND" },
  3: { color: "#fb923c", glow: "0 0 24px rgba(251,146,60,0.4)",  suit: "♦", height: "h-24", crown: false, label: "3RD" },
};

const TREND = {
  up:   { Icon: TrendingUp,   color: "#50c878" },
  down: { Icon: TrendingDown, color: "#fe5f55" },
  same: { Icon: Minus,        color: "rgba(255,255,255,0.3)" },
};

function RollingNumber({ value, duration = 1200, className }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={cn("tabular-nums", className)}>{display.toLocaleString("pt-BR")}</span>;
}

export default function RoundResultPage({
  players = DEMO_PLAYERS,
  roundNumber = 20,
}) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onNextRound = () => navigate("/round-question");
  const onReplayRound = () => navigate("/choose-questions");

  const sorted = [...players].sort((a, b) => b.totalPoints - a.totalPoints);
  const winner = sorted[0];

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Resultado · Rodada {String(roundNumber).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-gold transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-gold transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-10 overflow-y-auto">
        {/* Title */}
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold text-glow-gold uppercase">
            ◆ Cashed Out ◆
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(240,192,64,0.6))" }}>
            ROUND WIN
          </h1>
        </Motion.div>

        {/* Score breakdown — Balatro chip × mult */}
        <Motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="w-full max-w-3xl rounded-2xl border-4 border-balatro-gold bg-balatro-card overflow-hidden p-6"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(240,192,64,0.3)" }}
        >
          <div className="flex items-center justify-around gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="font-pixel text-[9px] tracking-[0.3em] text-balatro-text-dim uppercase">Chips</span>
              <RollingNumber value={winner.chips} className="font-pixel text-3xl md:text-4xl text-balatro-blue text-glow-blue" />
            </div>
            <span className="font-pixel text-3xl md:text-4xl text-balatro-text">×</span>
            <div className="flex flex-col items-center gap-2">
              <span className="font-pixel text-[9px] tracking-[0.3em] text-balatro-text-dim uppercase">Mult</span>
              <RollingNumber value={winner.mult} className="font-pixel text-3xl md:text-4xl text-balatro-red text-glow-red" duration={800} />
            </div>
            <span className="font-pixel text-3xl md:text-4xl text-balatro-text">=</span>
            <div className="flex flex-col items-center gap-2">
              <span className="font-pixel text-[9px] tracking-[0.3em] text-balatro-text-dim uppercase">Score</span>
              <RollingNumber value={winner.chips * winner.mult} className="font-pixel text-4xl md:text-5xl text-balatro-gold text-glow-gold" duration={1500} />
            </div>
          </div>
        </Motion.div>

        {/* Podium */}
        <div className="w-full max-w-2xl flex items-end justify-center gap-4">
          {[1, 0, 2].map((rankIdx, visualIdx) => {
            const player = sorted[rankIdx];
            const rank = rankIdx + 1;
            const cfg = PODIUM[rank];
            if (!player) return null;
            return (
              <Motion.div
                key={player.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + visualIdx * 0.15, type: "spring", stiffness: 220, damping: 18 }}
                className="flex flex-col items-center gap-2 flex-1 max-w-[180px]"
              >
                {cfg.crown && <Motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}><Crown size={32} fill={cfg.color} className="text-balatro-gold" style={{ filter: `drop-shadow(${cfg.glow})` }} /></Motion.div>}

                {/* Player card */}
                <div
                  className="relative w-full rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col items-center p-3 gap-2"
                  style={{ borderColor: cfg.color, boxShadow: `0 10px 0 #000, 0 16px 28px rgba(0,0,0,0.7), ${cfg.glow}` }}
                >
                  <span className="absolute top-2 left-2 font-pixel text-base" style={{ color: cfg.color }}>{cfg.suit}</span>
                  <span className="absolute bottom-2 right-2 font-pixel text-base rotate-180" style={{ color: cfg.color }}>{cfg.suit}</span>

                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-pixel text-base text-balatro-bg-deep border-4"
                    style={{ background: cfg.color, borderColor: cfg.color }}
                  >
                    {player.avatar}
                  </div>
                  <span className="font-pixel text-[9px] tracking-[0.2em] uppercase text-balatro-text truncate w-full text-center">
                    {player.name}
                  </span>
                  <span className="font-pixel text-xl tabular-nums" style={{ color: cfg.color, textShadow: `0 0 12px ${cfg.color}` }}>
                    {player.totalPoints}
                    <span className="text-[8px] text-balatro-text-dim ml-1">pts</span>
                  </span>
                </div>

                {/* Podium block */}
                <div
                  className={cn("w-full rounded-t-xl flex items-center justify-center font-pixel text-3xl text-balatro-bg-deep border-x-4 border-t-4", cfg.height)}
                  style={{ background: cfg.color, borderColor: cfg.color, boxShadow: `0 -6px 24px ${cfg.color}66` }}
                >
                  {cfg.label}
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* Leaderboard */}
        <Motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full max-w-2xl rounded-2xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
          style={{ boxShadow: "0 14px 0 #000, 0 20px 40px rgba(0,0,0,0.6)" }}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-balatro-card-edge bg-black/30">
            <Trophy size={14} className="text-balatro-gold" />
            <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-gold text-glow-gold uppercase">Leaderboard</span>
          </div>

          <div
            className="grid px-5 py-2 border-b border-balatro-card-edge/50 bg-black/20"
            style={{ gridTemplateColumns: "2.5rem 1fr 5rem 5rem" }}
          >
            {["#", "Jogador", "Rodada", "Total"].map((h) => (
              <span key={h} className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
                {h}
              </span>
            ))}
          </div>

          {sorted.map((player, idx) => {
            const trend = TREND[player.trend] ?? TREND.same;
            const TrendIcon = trend.Icon;
            const isTop3 = idx < 3;
            const podiumColor = isTop3 ? PODIUM[idx + 1].color : "rgba(255,255,255,0.4)";

            return (
              <Motion.div
                key={player.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 + idx * 0.06 }}
                className={cn(
                  "grid items-center gap-2 px-5 py-3 hover:bg-white/5 transition-colors",
                  idx < sorted.length - 1 && "border-b border-balatro-card-edge/40",
                )}
                style={{ gridTemplateColumns: "2.5rem 1fr 5rem 5rem" }}
              >
                <span className="font-pixel text-sm tabular-nums" style={{ color: podiumColor, textShadow: isTop3 ? `0 0 8px ${podiumColor}` : "none" }}>
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
          })}
        </Motion.div>

        {/* Floating decorative suits */}
        <FloatingSuits />

        {/* Actions */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="w-full max-w-2xl grid grid-cols-2 gap-4 pb-4"
        >
          <Motion.button
            onClick={onReplayRound}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ y: 2, scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-balatro-card text-balatro-text font-pixel text-[11px] tracking-[0.25em] uppercase border-b-4 border-black hover:bg-balatro-card-edge"
          >
            <RotateCcw size={14} />
            Repetir
          </Motion.button>
          <Motion.button
            onClick={onNextRound}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ y: 2, scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-balatro-gold text-balatro-bg-deep font-pixel text-[11px] tracking-[0.25em] uppercase border-b-4 border-yellow-800 hover:shadow-balatro-glow-gold"
          >
            <ChevronRight size={14} />
            Próxima Rodada
          </Motion.button>
        </Motion.div>
      </main>
    </CRTFrame>
  );
}

