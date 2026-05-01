import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Users, Star, Zap, TrendingUp, TrendingDown,
  Crown, Spade, Heart, Diamond, Club,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { TeamCard } from "@/features/round/components/duo/TeamCard";
import { ActionFeed } from "@/features/round/components/duo/ActionFeed";

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
            {sorted.map((team, idx) => (
              <TeamCard
                key={team.id}
                team={team}
                cfg={TEAM_CFG[teams.indexOf(team) % TEAM_CFG.length]}
                isLeader={team.id === leader.id}
                idx={idx}
              />
            ))}
          </div>

          <ActionFeed actions={actions} actionStyle={ACTION_STYLE} />
        </div>
      </main>
    </CRTFrame>
  );
}
