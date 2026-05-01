import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Users, Star, Zap, TrendingUp, TrendingDown,
  Crown, Spade, Heart, Diamond, Club,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { cn } from "@/lib/utils";

const DEMO_TEAMS = [
  { id: 1, name: "Equipe 1", players: ["FULANO 1", "FULANO 2"], points: 3,   maxPoints: 6 },
  { id: 2, name: "Equipe 2", players: ["FULANO 3", "FULANO 4"], points: 3.5, maxPoints: 6 },
  { id: 3, name: "Equipe 3", players: ["FULANO 5", "FULANO 6"], points: 1,   maxPoints: 6 },
  { id: 4, name: "Equipe 4", players: ["FULANO 7", "FULANO 8"], points: 5,   maxPoints: 6 },
];

const DEMO_ACTIONS = [
  { id: 1, team: "EQUIPE 2", action: "repassou a vez",              detail: "",          type: "negative", value: "-0,5" },
  { id: 2, team: "EQUIPE 1", action: "acertou a pergunta",          detail: "",          type: "positive", value: "+1"   },
  { id: 3, team: "EQUIPE 4", action: "roubou ponto da",             detail: "EQUIPE 1",  type: "steal",    value: "+1"   },
  { id: 4, team: "EQUIPE 3", action: "errou a pergunta",            detail: "",          type: "negative", value: "0"    },
  { id: 5, team: "EQUIPE 1", action: "usou power-up",               detail: "+30 seg",   type: "powerup",  value: ""     },
];

const ACTION_STYLE = {
  positive: { color: "#50c878", Icon: TrendingUp,   label: "ACERTO" },
  negative: { color: "#fe5f55", Icon: TrendingDown, label: "ERRO" },
  steal:    { color: "#f0c040", Icon: Zap,          label: "ROUBO" },
  powerup:  { color: "#9b59b6", Icon: Star,         label: "POWER-UP" },
};

const TEAM_CFG = [
  { color: "#009dff", suit: Spade,   suitChar: "♠" },
  { color: "#9b59b6", suit: Heart,   suitChar: "♥" },
  { color: "#50c878", suit: Diamond, suitChar: "♦" },
  { color: "#f0c040", suit: Club,    suitChar: "♣" },
];

export default function DuoModePage({
  teams = DEMO_TEAMS,
  actions = DEMO_ACTIONS,
  roundNumber = 3,
}) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  const sorted = [...teams].sort((a, b) => b.points - a.points);
  const leader = sorted[0];

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Team Battle · Rodada {String(roundNumber).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-blue transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-blue text-glow-blue uppercase flex items-center justify-center gap-2">
            <Users size={14} /> Team Battle <Users size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}>
            MODO DUPLA
          </h1>
        </Motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Teams grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sorted.map((team, idx) => {
              const cfg = TEAM_CFG[teams.indexOf(team) % TEAM_CFG.length];
              const SIcon = cfg.suit;
              const isLeader = team.id === leader.id;
              return (
                <Motion.div
                  key={team.id}
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
                      <Crown size={28} fill={cfg.color} className="text-balatro-gold" style={{ filter: `drop-shadow(0 0 12px ${cfg.color})` }} />
                    </Motion.div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2" style={{ color: cfg.color }}>
                      <SIcon size={20} fill="currentColor" />
                      <span className="font-pixel text-sm tracking-[0.2em] uppercase" style={{ textShadow: `0 0 8px ${cfg.color}` }}>
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
                  <div
                    className="relative h-3 rounded-full border-2 border-balatro-card-edge bg-balatro-bg-deep overflow-hidden"
                  >
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
                    {team.players.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-pixel text-[10px] flex-shrink-0"
                          style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
                        >
                          {p.split(" ").map(s => s[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">
                          {p}
                        </span>
                      </div>
                    ))}
                  </div>
                </Motion.div>
              );
            })}
          </div>

          {/* Action feed */}
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
                const cfg = ACTION_STYLE[a.type];
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
                        {a.action} {a.detail && <span className="text-balatro-text">{a.detail}</span>}
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
        </div>
      </main>
    </CRTFrame>
  );
}
