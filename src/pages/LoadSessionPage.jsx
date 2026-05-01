import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, ChevronLeft, FolderOpen, Play, Trash2, Calendar } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

const DEMO_SESSIONS = [
  { id: 1, name: "Biologia · 9º Ano",  students: 24, questions: 40, date: "2026-04-15", round: 8 },
  { id: 2, name: "História · Reforma", students: 18, questions: 30, date: "2026-04-22", round: 3 },
  { id: 3, name: "Química Orgânica",   students: 30, questions: 50, date: "2026-04-28", round: 12 },
];

export default function LoadSessionPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [sessions, setSessions] = useState(DEMO_SESSIONS);

  const remove = (id) => setSessions((s) => s.filter((x) => x.id !== id));
  const load = () => navigate("/create");

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Saved Runs
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-purple transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-10 flex flex-col items-center gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <FolderOpen size={14} /> Saved Runs <FolderOpen size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            CARREGAR SESSÃO
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {sessions.length} sessões salvas ◆
          </p>
        </Motion.div>

        {sessions.length === 0 ? (
          <p className="font-pixel text-[12px] tracking-[0.2em] text-balatro-text-dim uppercase py-12">
            Nenhuma sessão salva ainda
          </p>
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-3">
            {sessions.map((sess, i) => (
              <Motion.div
                key={sess.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-4 flex items-center gap-4 hover:border-balatro-purple/60 transition-colors"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="w-12 h-12 rounded-lg border-2 border-balatro-purple bg-balatro-purple/15 flex items-center justify-center text-balatro-purple flex-shrink-0">
                  <FolderOpen size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-pixel text-[11px] tracking-[0.15em] uppercase text-balatro-text">
                    {sess.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-balatro-text-dim font-mono">
                    <span>{sess.students} alunos</span>
                    <span>·</span>
                    <span>{sess.questions} perguntas</span>
                    <span>·</span>
                    <span>Rodada {sess.round}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {sess.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Motion.button
                    onClick={load}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Continuar sessão"
                    className="w-10 h-10 rounded-lg border-2 border-balatro-green text-balatro-green bg-balatro-green/15 flex items-center justify-center hover:shadow-balatro-glow-blue"
                  >
                    <Play size={14} />
                  </Motion.button>
                  <Motion.button
                    onClick={() => remove(sess.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Excluir sessão"
                    className="w-10 h-10 rounded-lg border-2 border-balatro-red text-balatro-red bg-balatro-red/15 flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </Motion.button>
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </main>
    </CRTFrame>
  );
}
