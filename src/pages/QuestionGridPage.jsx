import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, ChevronLeft, LayoutList, Lock, Loader2, AlertTriangle } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { getSessionQuestions } from "@/features/sessions/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { useRoundFlowStore } from "@/features/rounds/store/roundFlowStore";
import { cn } from "@/lib/utils";

export default function QuestionGridPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const sessionId = useActiveSessionStore((s) => s.sessionId);
  const setSelectedQuestion = useRoundFlowStore((s) => s.setSelectedQuestion);

  const [questions, setQuestions] = useState([]);
  const [used, setUsed] = useState([]);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState(
    sessionId ? null : "Nenhuma sessão ativa. Carregue uma sessão na Home.",
  );

  useEffect(() => {
    if (!sessionId) return;
    getSessionQuestions(sessionId)
      .then(setQuestions)
      .catch((err) => setError(err.message ?? "Falha ao carregar perguntas"))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const select = (q) => {
    if (used.includes(q.id)) return;
    setSelectedQuestion(q);
    setUsed((u) => [...u, q.id]);
    navigate("/round-question");
  };

  const remaining = questions.length - used.length;

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Question Grid
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-blue text-glow-blue uppercase flex items-center justify-center gap-2">
            <LayoutList size={14} /> Question Grid <LayoutList size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}>
            ESCOLHER PERGUNTA
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {remaining} de {questions.length} restantes ◆
          </p>
        </Motion.div>

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando perguntas...
          </p>
        ) : error ? (
          <div className="flex flex-col items-center gap-4">
            <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2">
              <AlertTriangle size={14} /> {error}
            </p>
            <button
              onClick={() => navigate("/choose-questions")}
              className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-blue hover:underline"
            >
              ◄ Selecionar perguntas da sessão
            </button>
          </div>
        ) : questions.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="font-pixel text-[11px] tracking-[0.2em] text-balatro-text-dim uppercase text-center">
              Nenhuma pergunta atribuída a esta sessão.
            </p>
            <button
              onClick={() => navigate("/choose-questions")}
              className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-blue hover:underline"
            >
              ◄ Selecionar perguntas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-3xl">
            {questions.map((q, idx) => {
              const id = q.id;
              const number = idx + 1;
              const isUsed = used.includes(id);
              return (
                <Motion.button
                  key={id}
                  type="button"
                  onClick={() => select(q)}
                  disabled={isUsed}
                  aria-label={`Pergunta ${number}${isUsed ? " (usada)" : ""}`}
                  title={q.text}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: number * 0.04, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={!isUsed ? { y: -8, scale: 1.05, rotate: number % 2 === 0 ? -2 : 2 } : undefined}
                  whileTap={!isUsed ? { scale: 0.96 } : undefined}
                  className={cn(
                    "relative aspect-[3/4] rounded-xl border-4 flex flex-col items-center justify-center gap-1 transition-all p-1",
                    isUsed
                      ? "border-balatro-card-edge bg-balatro-card opacity-40 grayscale cursor-not-allowed"
                      : "border-balatro-blue bg-balatro-card cursor-pointer hover:shadow-balatro-glow-blue",
                  )}
                  style={{
                    boxShadow: !isUsed ? "0 8px 0 #000, 0 14px 24px rgba(0,157,255,0.3)" : "0 4px 0 #000",
                  }}
                >
                  <span
                    className="font-pixel text-3xl tabular-nums"
                    style={{
                      color: isUsed ? "rgba(255,255,255,0.3)" : "#009dff",
                      textShadow: !isUsed ? "0 0 10px #009dff" : "none",
                    }}
                  >
                    {String(number).padStart(2, "0")}
                  </span>
                  {isUsed && <Lock size={14} className="text-balatro-text-dim" />}
                </Motion.button>
              );
            })}
          </div>
        )}
      </main>
    </CRTFrame>
  );
}
