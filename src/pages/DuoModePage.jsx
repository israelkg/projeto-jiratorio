import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Users, Loader2, AlertTriangle, Wand2,
  Spade, Heart, Diamond, Club, TrendingUp, TrendingDown, Zap, Star,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { TeamCard } from "@/features/round/components/duo/TeamCard";
import { ActionFeed } from "@/features/round/components/duo/ActionFeed";
import { fetchTeams, autoGenerateTeams } from "@/features/sessions/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { useRoundFlowStore } from "@/features/rounds/store/roundFlowStore";

const TEAM_CFG = [
  { color: "#009dff", suit: Spade,   suitChar: "♠" },
  { color: "#9b59b6", suit: Heart,   suitChar: "♥" },
  { color: "#50c878", suit: Diamond, suitChar: "♦" },
  { color: "#f0c040", suit: Club,    suitChar: "♣" },
];

const ACTION_STYLE = {
  positive: { color: "#50c878", Icon: TrendingUp,   label: "ACERTO" },
  negative: { color: "#fe5f55", Icon: TrendingDown, label: "ERRO" },
  steal:    { color: "#f0c040", Icon: Zap,          label: "ROUBO" },
  powerup:  { color: "#9b59b6", Icon: Star,         label: "POWER-UP" },
};

const HISTORY_TYPE_TO_ACTION = {
  correct: "positive",
  wrong: "negative",
  powerup: "powerup",
  inquisitor: "steal",
};

export default function DuoModePage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  const sessionId = useActiveSessionStore((s) => s.sessionId);
  const flowHistory = useRoundFlowStore((s) => s.history);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(
    sessionId ? null : "Nenhuma sessão ativa. Carregue uma sessão na Home.",
  );

  useEffect(() => {
    if (!sessionId) return;
    fetchTeams(sessionId)
      .then(setTeams)
      .catch((err) => setError(err.message ?? "Falha ao carregar equipes"))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleAutoGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const generated = await autoGenerateTeams(sessionId);
      setTeams(generated);
    } catch (err) {
      setError(err.message ?? "Falha ao gerar equipes");
    } finally {
      setGenerating(false);
    }
  };

  const maxPoints = Math.max(6, ...teams.map((t) => t.points));
  const mapped = teams.map((t) => ({
    id: t.id,
    name: t.name,
    points: t.points,
    maxPoints,
    players: (t.players ?? []).map((p) => p.name),
  }));
  const sorted = [...mapped].sort((a, b) => b.points - a.points);
  const leader = sorted[0];

  const actions = flowHistory.slice(-6).reverse().map((h, i) => ({
    id: h.id ?? i,
    team: h.actor,
    action: h.event,
    detail: "",
    type: HISTORY_TYPE_TO_ACTION[h.type] ?? "powerup",
    value: "",
  }));

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Team Battle
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

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando equipes...
          </p>
        ) : error ? (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2 py-8">
            <AlertTriangle size={14} /> {error}
          </p>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-8">
            <p className="font-pixel text-[11px] tracking-[0.2em] text-balatro-text-dim uppercase text-center">
              Nenhuma equipe formada ainda.
            </p>
            <BalatroButton onClick={handleAutoGenerate} disabled={generating} variant="blue" size="md">
              {generating ? <><Loader2 size={16} className="animate-spin" /> Gerando...</> : <><Wand2 size={16} /> Gerar Duplas Automaticamente</>}
            </BalatroButton>
          </div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sorted.map((team, idx) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    cfg={TEAM_CFG[mapped.indexOf(mapped.find((m) => m.id === team.id)) % TEAM_CFG.length]}
                    isLeader={leader && team.id === leader.id}
                    idx={idx}
                  />
                ))}
              </div>
              <BalatroButton onClick={handleAutoGenerate} disabled={generating} variant="ghost" size="sm" className="self-start">
                {generating ? <><Loader2 size={14} className="animate-spin" /> Regenerando...</> : <><Wand2 size={14} /> Refazer Duplas</>}
              </BalatroButton>
            </div>

            <ActionFeed actions={actions} actionStyle={ACTION_STYLE} />
          </div>
        )}
      </main>
    </CRTFrame>
  );
}
