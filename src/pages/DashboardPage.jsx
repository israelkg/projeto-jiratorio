import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, BarChart3, Target, Zap, AlertTriangle, Loader2, Trophy,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { fetchSessionMetrics } from "@/features/sessions/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";

const PU_COLORS = ["#009dff", "#f0c040", "#50c878", "#9b59b6", "#fe5f55"];
const PU_LABELS = {
  dica: "Dica", tempo: "Tempo Extra", escudo: "Escudo", troca: "Trocar", dobro: "Dobro",
  inverter: "Inverter", pular: "Pular", dupla: "Dupla", roubar: "Roubar",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const sessionId = useActiveSessionStore((s) => s.sessionId);
  const sessionName = useActiveSessionStore((s) => s.sessionName);

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState(
    sessionId ? null : "Nenhuma sessão ativa. Carregue uma sessão na Home para ver as métricas.",
  );

  useEffect(() => {
    if (!sessionId) return;
    fetchSessionMetrics(sessionId)
      .then(setMetrics)
      .catch((err) => setError(err.message ?? "Falha ao carregar métricas"))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const scoreboard = metrics?.scoreboard ?? [];
  const totals = metrics?.totals ?? { rounds_played: 0, correct: 0, wrong: 0, passed: 0 };
  const puUsage = metrics?.powerup_usage ?? [];
  const topWrong = metrics?.top_wrong_questions ?? [];

  const answered = totals.correct + totals.wrong;
  const accuracy = answered > 0 ? Math.round((totals.correct / answered) * 100) : 0;
  const puTotal = puUsage.reduce((sum, p) => sum + p.count, 0);
  const puMax = Math.max(1, ...puUsage.map((p) => p.count));
  const maxPoints = Math.max(1, ...scoreboard.map((s) => s.points));

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={() => navigate(-1)} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Run Stats
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/")} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button aria-label="Perfil" className="text-balatro-text-dim hover:text-balatro-blue transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-blue text-glow-blue uppercase flex items-center justify-center gap-2">
            <BarChart3 size={14} /> Run Stats <BarChart3 size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}>
            DASHBOARD
          </h1>
          {sessionName && (
            <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">◆ {sessionName} ◆</p>
          )}
        </Motion.div>

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando métricas...
          </p>
        ) : error ? (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2 py-8">
            <AlertTriangle size={14} /> {error}
          </p>
        ) : (
          <>
            <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPICard Icon={Target}        label="Acerto Médio" value={`${accuracy}%`}          color="#50c878" delay={0.1} />
              <KPICard Icon={Trophy}        label="Rodadas"      value={totals.rounds_played}    color="#f0c040" delay={0.15} />
              <KPICard Icon={Zap}           label="Power-Ups"    value={puTotal}                 color="#9b59b6" delay={0.2} />
              <KPICard Icon={AlertTriangle} label="Erros"        value={totals.wrong}            color="#fe5f55" delay={0.25} />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
                  <Target size={14} className="text-balatro-green" />
                  <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-green uppercase">Pontuação por Aluno</span>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  {scoreboard.length === 0 && <p className="text-[11px] text-balatro-text-dim">Sem dados ainda.</p>}
                  {scoreboard.map((s) => {
                    const pct = Math.min(100, (s.points / maxPoints) * 100);
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between mb-1">
                          <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">{s.name}</span>
                          <span className="font-pixel text-[10px] text-balatro-green tabular-nums">{s.points} pts</span>
                        </div>
                        <div className="h-2 rounded-full bg-balatro-bg-deep border border-balatro-card-edge overflow-hidden">
                          <Motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-balatro-green"
                            style={{ boxShadow: "0 0 8px #50c878" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Motion.div>

              <Motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
                  <Zap size={14} className="text-balatro-purple" />
                  <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-purple uppercase">Uso de Power-Ups</span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  {puUsage.length === 0 && <p className="text-[11px] text-balatro-text-dim">Nenhum power-up sorteado ainda.</p>}
                  {puUsage.map((p, i) => {
                    const color = PU_COLORS[i % PU_COLORS.length];
                    const pct = (p.count / puMax) * 100;
                    return (
                      <div key={p.card}>
                        <div className="flex justify-between mb-1">
                          <span className="font-pixel text-[10px] tracking-[0.15em] uppercase" style={{ color }}>
                            {PU_LABELS[p.card] ?? p.card}
                          </span>
                          <span className="font-pixel text-[10px] tabular-nums" style={{ color }}>{p.count}x</span>
                        </div>
                        <div className="h-3 rounded-full bg-balatro-bg-deep border border-balatro-card-edge overflow-hidden">
                          <Motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Motion.div>
            </div>

            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-5xl rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
              style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
                <AlertTriangle size={14} className="text-balatro-red" />
                <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-red uppercase">Perguntas mais erradas</span>
              </div>
              <div className="flex flex-col">
                {topWrong.length === 0 && <p className="text-[11px] text-balatro-text-dim px-4 py-3">Nenhum erro registrado ainda.</p>}
                {topWrong.map((q, i) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5"
                    style={{ borderBottom: i < topWrong.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <span className="font-pixel text-base text-balatro-red tabular-nums w-10">#{q.id}</span>
                    <p className="flex-1 text-sm text-balatro-text truncate">{q.text}</p>
                    <span className="font-pixel text-base text-balatro-red tabular-nums" style={{ textShadow: "0 0 8px #fe5f55" }}>
                      {q.wrong_count}×
                    </span>
                  </div>
                ))}
              </div>
            </Motion.div>
          </>
        )}
      </main>
    </CRTFrame>
  );
}

function KPICard({ Icon, label, value, color, delay }) {
  return (
    <Motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className="rounded-xl border-4 bg-balatro-card p-4 flex flex-col items-center gap-2"
      style={{ borderColor: color, boxShadow: `0 10px 0 #000, 0 16px 28px ${color}40` }}
    >
      <div style={{ color }}>
        <Icon size={24} />
      </div>
      <span className="font-pixel text-2xl tabular-nums" style={{ color, textShadow: `0 0 12px ${color}` }}>
        {value}
      </span>
      <span className="font-pixel text-[8px] tracking-[0.25em] uppercase text-balatro-text-dim text-center">
        {label}
      </span>
    </Motion.div>
  );
}
