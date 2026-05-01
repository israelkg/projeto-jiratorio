import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, Trophy, ChevronRight, RotateCcw } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { FloatingSuits } from "@/components/balatro/FloatingSuits";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { PodiumCard } from "@/features/round/components/result/PodiumCard";
import { PlayerRow } from "@/features/round/components/result/PlayerRow";
import { cn } from "@/lib/utils";

const DEMO_PLAYERS = [
  { id: 1, name: "FULANO 1", totalPoints: 14, roundPoints: 3, avatar: "F1", trend: "up",   chips: 240, mult: 6 },
  { id: 2, name: "FULANO 2", totalPoints: 11, roundPoints: 1, avatar: "F2", trend: "down", chips: 200, mult: 4 },
  { id: 3, name: "FULANO 3", totalPoints: 9,  roundPoints: 2, avatar: "F3", trend: "up",   chips: 180, mult: 3 },
  { id: 4, name: "FULANO 4", totalPoints: 7,  roundPoints: 0, avatar: "F4", trend: "same", chips: 140, mult: 2 },
  { id: 5, name: "FULANO 5", totalPoints: 4,  roundPoints: 1, avatar: "F5", trend: "up",   chips: 100, mult: 1 },
];

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
    <CRTFrame>
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
          <button aria-label="Perfil" className="text-balatro-text-dim hover:text-balatro-gold transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-10 overflow-y-auto">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold text-glow-gold uppercase">
            ◆ Cashed Out ◆
          </p>
          <h1
            className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
            style={{ filter: "drop-shadow(0 0 14px rgba(240,192,64,0.6))" }}
          >
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
          {[1, 0, 2].map((rankIdx, visualIdx) => (
            <PodiumCard
              key={sorted[rankIdx]?.id ?? rankIdx}
              player={sorted[rankIdx]}
              rank={rankIdx + 1}
              visualIdx={visualIdx}
            />
          ))}
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
            <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-gold text-glow-gold uppercase">
              Leaderboard
            </span>
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

          {sorted.map((player, idx) => (
            <PlayerRow
              key={player.id}
              player={player}
              idx={idx}
              total={sorted.length}
              RollingNumber={RollingNumber}
            />
          ))}
        </Motion.div>

        <FloatingSuits />

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="w-full max-w-2xl grid grid-cols-2 gap-4 pb-4"
        >
          <BalatroButton onClick={onReplayRound} variant="ghost" size="md">
            <RotateCcw size={14} />
            Repetir
          </BalatroButton>
          <BalatroButton onClick={onNextRound} variant="gold" size="md">
            <ChevronRight size={14} />
            Próxima Rodada
          </BalatroButton>
        </Motion.div>
      </main>
    </CRTFrame>
  );
}
