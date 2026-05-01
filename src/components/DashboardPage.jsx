import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, BarChart3, Target, Clock, Zap, AlertTriangle,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useStudentsStore } from "@/features/students/store/studentsStore";

const TOP_WRONG = [
  { id: 3, text: "Explique o processo de meiose...", wrongPct: 78 },
  { id: 5, text: "Descreva a estrutura do DNA...",   wrongPct: 64 },
  { id: 7, text: "O que são enzimas?",                wrongPct: 45 },
];

const PU_USAGE = [
  { id: "tempo",    label: "+30s",     count: 12, color: "#009dff" },
  { id: "dica",     label: "Dica",     count: 8,  color: "#f0c040" },
  { id: "escudo",   label: "Escudo",   count: 5,  color: "#50c878" },
  { id: "inverter", label: "Inverter", count: 3,  color: "#9b59b6" },
];

const TOTAL_QUESTIONS = 12;
const PU_MAX_COUNT = Math.max(...PU_USAGE.map((p) => p.count));
const PU_TOTAL = PU_USAGE.reduce((sum, p) => sum + p.count, 0);

export default function DashboardPage() {
  const navigate = useNavigate();
  const students = useStudentsStore((s) => s.students);

  const totalCorrect = students.reduce((sum, s) => sum + s.points, 0);
  const accuracyAvg = totalCorrect > 0
    ? Math.round((totalCorrect / (students.length * TOTAL_QUESTIONS)) * 100)
    : 0;
  const avgTime = 22;

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Run Stats
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-2"
          >
            <Home size={14} /> Home
          </button>
          <button
            aria-label="Perfil"
            className="text-balatro-text-dim hover:text-balatro-blue transition-colors"
          >
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
          <h1
            className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}
          >
            DASHBOARD
          </h1>
        </Motion.div>

        {/* KPI Cards */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard Icon={Target}        label="Acerto Médio" value={`${accuracyAvg}%`} color="#50c878" delay={0.1} />
          <KPICard Icon={Clock}         label="Tempo Médio"  value={`${avgTime}s`}     color="#f0c040" delay={0.15} />
          <KPICard Icon={Zap}           label="Power-Ups"    value={PU_TOTAL}          color="#9b59b6" delay={0.2} />
          <KPICard Icon={AlertTriangle} label="Mais Erradas" value={TOP_WRONG.length}  color="#fe5f55" delay={0.25} />
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Acerto por aluno */}
          <Motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
            style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
              <Target size={14} className="text-balatro-green" />
              <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-green uppercase">
                Acerto por Aluno
              </span>
            </div>
            <div className="flex flex-col gap-2 p-4">
              {students.map((s) => {
                const pct = Math.min(100, (s.points / TOTAL_QUESTIONS) * 100);
                return (
                  <div key={s.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">{s.name}</span>
                      <span className="font-pixel text-[10px] text-balatro-green tabular-nums">{Math.round(pct)}%</span>
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

          {/* Power-ups usados */}
          <Motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
            style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
              <Zap size={14} className="text-balatro-purple" />
              <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-purple uppercase">
                Uso de Power-Ups
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4">
              {PU_USAGE.map((p) => {
                const pct = (p.count / PU_MAX_COUNT) * 100;
                return (
                  <div key={p.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-pixel text-[10px] tracking-[0.15em] uppercase" style={{ color: p.color }}>
                        {p.label}
                      </span>
                      <span className="font-pixel text-[10px] tabular-nums" style={{ color: p.color }}>
                        {p.count}x
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-balatro-bg-deep border border-balatro-card-edge overflow-hidden">
                      <Motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Motion.div>
        </div>

        {/* Top wrong questions */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-5xl rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
          style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
            <AlertTriangle size={14} className="text-balatro-red" />
            <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-red uppercase">
              Perguntas mais erradas
            </span>
          </div>
          <div className="flex flex-col">
            {TOP_WRONG.map((q, i) => (
              <div
                key={q.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5"
                style={{ borderBottom: i < TOP_WRONG.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              >
                <span className="font-pixel text-base text-balatro-red tabular-nums w-10">#{q.id}</span>
                <p className="flex-1 text-sm text-balatro-text">{q.text}</p>
                <span
                  className="font-pixel text-base text-balatro-red tabular-nums"
                  style={{ textShadow: "0 0 8px #fe5f55" }}
                >
                  {q.wrongPct}%
                </span>
              </div>
            ))}
          </div>
        </Motion.div>
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
