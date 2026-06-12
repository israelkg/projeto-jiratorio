import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  Home, UserCircle2, Users, Loader2, AlertTriangle, Wand2, Hand, X,
  Spade, Heart, Diamond, Club, TrendingUp, TrendingDown, Zap, Star,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { TeamCard } from "@/features/round/components/duo/TeamCard";
import { ActionFeed } from "@/features/round/components/duo/ActionFeed";
import { fetchTeams, autoGenerateTeams, getSession } from "@/features/sessions/api";
import { listRounds, stealPoint } from "@/features/rounds/api";
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
  const currentRoundId = useRoundFlowStore((s) => s.currentRoundId);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(
    sessionId ? null : "Nenhuma sessão ativa. Carregue uma sessão na Home.",
  );
  const [stealOpen, setStealOpen] = useState(false);

  const reloadTeams = () => {
    if (sessionId) fetchTeams(sessionId).then(setTeams).catch(() => {});
  };

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
              <div className="flex gap-3 flex-wrap">
                <BalatroButton onClick={handleAutoGenerate} disabled={generating} variant="ghost" size="sm">
                  {generating ? <><Loader2 size={14} className="animate-spin" /> Regenerando...</> : <><Wand2 size={14} /> Refazer Duplas</>}
                </BalatroButton>
                <BalatroButton onClick={() => setStealOpen(true)} variant="gold" size="sm">
                  <Hand size={14} /> Roubar Ponto
                </BalatroButton>
              </div>
            </div>

            <ActionFeed actions={actions} actionStyle={ACTION_STYLE} />
          </div>
        )}
      </main>

      <StealModal
        open={stealOpen}
        onClose={() => setStealOpen(false)}
        sessionId={sessionId}
        teams={teams}
        currentRoundId={currentRoundId}
        onStolen={reloadTeams}
      />
    </CRTFrame>
  );
}

function StealModal({ open, onClose, sessionId, teams, currentRoundId, onStolen }) {
  const [holders, setHolders] = useState([]); // alunos com a carta 'roubar'
  const [roundId, setRoundId] = useState(currentRoundId);
  const [actorId, setActorId] = useState(null);
  const [targetTeamId, setTargetTeamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!open || !sessionId) return;
    setLoading(true);
    setError(null);
    setResult(null);
    Promise.all([
      getSession(sessionId),
      currentRoundId ? Promise.resolve([{ id: currentRoundId }]) : listRounds(sessionId),
    ])
      .then(([detail, rounds]) => {
        const withCard = (detail.students ?? []).filter((s) => (s.inventory ?? []).includes("roubar"));
        setHolders(withCard);
        setActorId(withCard[0]?.id ?? null);
        const latest = currentRoundId ?? (rounds.length ? rounds[rounds.length - 1].id : null);
        setRoundId(latest);
      })
      .catch((err) => setError(err.message ?? "Falha ao carregar dados"))
      .finally(() => setLoading(false));
  }, [open, sessionId, currentRoundId]);

  const actor = holders.find((h) => h.id === actorId);
  const actorTeamId = actor?.team_id;
  const targetableTeams = teams.filter((t) => t.id !== actorTeamId);

  const handleSteal = async () => {
    if (!roundId || !actorId || !targetTeamId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await stealPoint(sessionId, roundId, { actorId, targetTeamId });
      setResult(res);
      onStolen?.();
    } catch (err) {
      setError(err.message ?? "Falha ao roubar ponto");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        onClick={onClose}
      >
        <Motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl border-4 border-balatro-gold bg-balatro-card p-6 flex flex-col gap-4"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(240,192,64,0.3)" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-pixel text-sm tracking-[0.2em] text-balatro-gold text-glow-gold uppercase flex items-center gap-2">
              <Hand size={16} /> Roubar Ponto
            </h2>
            <button onClick={onClose} className="text-balatro-text-dim hover:text-balatro-red"><X size={18} /></button>
          </div>

          {loading ? (
            <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-text-dim uppercase flex items-center gap-2">
              <Loader2 size={12} className="animate-spin" /> Carregando...
            </p>
          ) : result ? (
            <div className="flex flex-col gap-3">
              <p className="font-pixel text-[11px] tracking-[0.15em] text-balatro-green uppercase text-center">
                ✓ {result.amount} ponto roubado!
              </p>
              <div className="flex flex-col gap-1">
                {result.teams?.map((t) => (
                  <div key={t.id} className="flex justify-between font-pixel text-[10px] tracking-[0.1em] uppercase text-balatro-text">
                    <span>{t.name}</span><span className="text-balatro-gold">{t.points}</span>
                  </div>
                ))}
              </div>
              <BalatroButton onClick={onClose} variant="green" size="sm" className="w-full">Fechar</BalatroButton>
            </div>
          ) : !roundId ? (
            <p className="font-pixel text-[10px] tracking-[0.15em] text-balatro-red uppercase text-center py-4">
              Nenhuma rodada jogada ainda. Jogue uma rodada antes de roubar.
            </p>
          ) : holders.length === 0 ? (
            <p className="font-pixel text-[10px] tracking-[0.15em] text-balatro-text-dim uppercase text-center py-4">
              Nenhum aluno possui a carta "roubar". A carta é ganha ao acertar perguntas.
            </p>
          ) : (
            <>
              <label className="flex flex-col gap-1">
                <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-text-dim uppercase">Quem rouba (tem a carta)</span>
                <select value={actorId ?? ""} onChange={(e) => setActorId(Number(e.target.value))} className="balatro-input">
                  {holders.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-text-dim uppercase">Roubar da equipe</span>
                <select value={targetTeamId ?? ""} onChange={(e) => setTargetTeamId(Number(e.target.value))} className="balatro-input">
                  <option value="">Selecione...</option>
                  {targetableTeams.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.points} pts)</option>
                  ))}
                </select>
              </label>
              {error && <p className="font-pixel text-[9px] tracking-[0.15em] text-balatro-red uppercase">✗ {error}</p>}
              <BalatroButton onClick={handleSteal} disabled={!targetTeamId || submitting} variant="gold" size="sm" className="w-full">
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Roubando...</> : <><Hand size={14} /> Confirmar Roubo</>}
              </BalatroButton>
            </>
          )}
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
}
