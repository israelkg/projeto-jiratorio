import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Crown, LogOut, Loader2, Check, Hourglass, Trophy } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { fetchStudentState, submitStudentAnswer } from "@/features/student/api";
import { useStudentAuthStore } from "@/features/student/store/studentAuthStore";
import { cn } from "@/lib/utils";

const POLL_MS = 2500;

export default function StudentPlayPage() {
  const navigate = useNavigate();
  const token = useStudentAuthStore((s) => s.token);
  const storedStudent = useStudentAuthStore((s) => s.student);
  const clear = useStudentAuthStore((s) => s.clear);

  const [state, setState] = useState(null);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [sending, setSending] = useState(false);
  const [sentRoundId, setSentRoundId] = useState(null);
  const pollRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return undefined;
    }
    let alive = true;
    const tick = async () => {
      try {
        const data = await fetchStudentState();
        if (alive) setState(data);
      } catch (err) {
        if (alive) setError(err.message ?? "Falha ao atualizar");
      }
    };
    tick();
    pollRef.current = setInterval(tick, POLL_MS);
    return () => { alive = false; clearInterval(pollRef.current); };
  }, [token, navigate]);

  const round = state?.active_round ?? null;
  const myTurn = round?.i_am_victim && !round?.already_answered;
  const question = round?.question ?? null;

  // Limpa o campo quando muda a rodada.
  useEffect(() => {
    if (round?.round_id !== sentRoundId) setAnswer("");
  }, [round?.round_id, sentRoundId]);

  const sendAnswer = async (value) => {
    const text = (value ?? answer).trim();
    if (!text) return;
    setSending(true);
    setError(null);
    try {
      await submitStudentAnswer(text);
      setSentRoundId(round.round_id);
      const data = await fetchStudentState();
      setState(data);
    } catch (err) {
      setError(err.message ?? "Falha ao enviar resposta");
    } finally {
      setSending(false);
    }
  };

  const onLogout = () => { clear(); navigate("/login", { replace: true }); };

  const me = state?.me ?? storedStudent ?? {};
  const scoreboard = state?.scoreboard ?? [];

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-blue uppercase">
          {state?.session?.name ?? "Turma"}
        </div>
        <button onClick={onLogout} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-red flex items-center gap-1.5">
          <LogOut size={14} /> Sair
        </button>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center gap-5 max-w-md mx-auto w-full">
        {/* Identificação do aluno */}
        <div className="w-full rounded-2xl border-2 border-balatro-blue/50 bg-balatro-card/80 p-4 flex items-center justify-between">
          <div>
            <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">Você</p>
            <p className="font-pixel text-sm tracking-[0.15em] text-balatro-text uppercase">{me.name ?? "—"}</p>
          </div>
          <div className="text-right">
            <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">Pontos</p>
            <p className="font-pixel text-2xl text-balatro-gold text-glow-gold tabular-nums">{me.points ?? 0}</p>
          </div>
        </div>

        {error && (
          <p className="font-pixel text-[9px] tracking-[0.2em] text-balatro-red uppercase">✗ {error}</p>
        )}

        {/* Área central: pergunta / espera */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {myTurn && question ? (
              <Motion.div
                key="question"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border-4 border-balatro-red bg-balatro-card p-5 flex flex-col gap-4"
                style={{ boxShadow: "0 12px 0 #000, 0 18px 32px rgba(254,95,85,0.3)" }}
              >
                <p className="font-pixel text-[9px] tracking-[0.3em] text-balatro-red text-glow-red uppercase text-center">
                  ◆ Sua vez de responder ◆
                </p>
                <p className="text-base text-balatro-text text-center leading-relaxed">{question.text}</p>

                {question.type === "multipla" && question.options?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => sendAnswer(opt)}
                        disabled={sending}
                        className="rounded-lg border-2 border-balatro-card-edge bg-balatro-bg-deep px-4 py-3 text-left text-sm text-balatro-text hover:border-balatro-blue transition-colors disabled:opacity-50"
                      >
                        {String.fromCharCode(65 + i)}) {opt}
                      </button>
                    ))}
                  </div>
                ) : question.type === "verdadeiro" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <BalatroButton onClick={() => sendAnswer("verdadeiro")} disabled={sending} variant="green" size="md">Verdadeiro</BalatroButton>
                    <BalatroButton onClick={() => sendAnswer("falso")} disabled={sending} variant="red" size="md">Falso</BalatroButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Digite sua resposta..."
                      rows={3}
                      className="balatro-input resize-none"
                    />
                    <BalatroButton onClick={() => sendAnswer()} disabled={sending || !answer.trim()} variant="blue" size="md" className="w-full">
                      {sending ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : <><Check size={16} /> Enviar Resposta</>}
                    </BalatroButton>
                  </div>
                )}
              </Motion.div>
            ) : round?.i_am_victim && round?.already_answered ? (
              <WaitCard key="answered" icon={Hourglass} color="#50c878"
                title="Resposta enviada!"
                subtitle="Aguarde o professor avaliar." />
            ) : round ? (
              <WaitCard key="other" icon={Hourglass} color="#f0c040"
                title={`${round.victim_name ?? "Outro aluno"} está respondendo`}
                subtitle="Fique de olho no placar." />
            ) : (
              <WaitCard key="idle" icon={Hourglass} color="#009dff"
                title="Aguardando o professor"
                subtitle="A próxima rodada vai começar em instantes." />
            )}
          </AnimatePresence>
        </div>

        {/* Placar ao vivo */}
        <div className="w-full rounded-2xl border-2 border-balatro-card-edge bg-balatro-card/80 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-balatro-card-edge bg-black/30">
            <Trophy size={12} className="text-balatro-gold" />
            <span className="font-pixel text-[9px] tracking-[0.3em] text-balatro-gold uppercase">Placar ao Vivo</span>
          </div>
          <div className="flex flex-col max-h-[280px] overflow-y-auto">
            {scoreboard.map((s, idx) => (
              <div key={s.id} className={cn(
                "flex items-center gap-3 px-4 py-2",
                s.id === me.id && "bg-balatro-blue/15",
                idx < scoreboard.length - 1 && "border-b border-balatro-card-edge/40",
              )}>
                <span className="font-pixel text-[10px] tabular-nums w-5 text-center" style={{ color: idx === 0 ? "#f0c040" : "rgba(255,255,255,0.4)" }}>
                  {idx === 0 ? <Crown size={12} className="inline" /> : idx + 1}
                </span>
                <span className="font-pixel text-[9px] tracking-[0.15em] uppercase text-balatro-text flex-1 truncate">{s.name}</span>
                <span className="font-pixel text-sm tabular-nums text-balatro-text">{s.points}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </CRTFrame>
  );
}

function WaitCard({ icon: Icon, color, title, subtitle }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl border-2 border-balatro-card-edge bg-balatro-card/80 p-6 flex flex-col items-center gap-3 text-center"
    >
      <Motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color }}>
        <Icon size={32} />
      </Motion.div>
      <p className="font-pixel text-[11px] tracking-[0.2em] uppercase text-balatro-text">{title}</p>
      <p className="text-[12px] text-balatro-text-dim">{subtitle}</p>
    </Motion.div>
  );
}
