import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Home, UserCircle2, Mic, Volume2, Skull, Spade, Heart, Diamond, Club,
  Check, X, Eye, Zap, ArrowRight, Loader2, AlertTriangle,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { Timer } from "@/features/round/components/Timer";
import { ScoreHUD } from "@/features/round/components/ScoreHUD";
import { PowerUpModal } from "@/features/round/components/PowerUpModal";
import { RoleCard } from "@/features/round/components/RoleCard";
import { QuestionCardCorner } from "@/features/round/components/QuestionCardCorner";
import { ActionButton } from "@/features/round/components/ActionButton";
import { useRoundStore } from "@/features/round/store/roundStore";
import { useRoundFlowStore } from "@/features/rounds/store/roundFlowStore";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { createRound, submitRoundResult, drawPowerup, getRound } from "@/features/rounds/api";

const POWERUP_LABELS = {
  dica: "Dica", tempo: "Tempo Extra", escudo: "Escudo",
  troca: "Trocar Questão", dobro: "Pontos em Dobro",
  inverter: "Inverter", pular: "Pular Vez", dupla: "Resposta em Dupla", roubar: "Roubar Ponto",
};

export default function RoundQuestionPage({ targetScore = 1500 }) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  const sessionId = useActiveSessionStore((s) => s.sessionId);

  const roundNumber = useRoundFlowStore((s) => s.roundNumber);
  const inquisitor = useRoundFlowStore((s) => s.inquisitor);
  const victim = useRoundFlowStore((s) => s.victim);
  const selectedQuestion = useRoundFlowStore((s) => s.selectedQuestion);
  const currentRoundId = useRoundFlowStore((s) => s.currentRoundId);
  const lastResult = useRoundFlowStore((s) => s.lastResult);
  const setCurrentRound = useRoundFlowStore((s) => s.setCurrentRound);
  const setScoreboard = useRoundFlowStore((s) => s.setScoreboard);
  const setLastResult = useRoundFlowStore((s) => s.setLastResult);
  const setLastPowerup = useRoundFlowStore((s) => s.setLastPowerup);
  const pushHistory = useRoundFlowStore((s) => s.pushHistory);

  const startTimer = useRoundStore((s) => s.startTimer);

  const [reading, setReading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [puModal, setPuModal] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState(null);
  const navTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  }, []);

  // Enquanto a rodada está aberta, consulta a resposta enviada pelo aluno (vítima).
  useEffect(() => {
    if (!sessionId || !currentRoundId || lastResult) return undefined;
    let alive = true;
    const poll = setInterval(async () => {
      try {
        const r = await getRound(sessionId, currentRoundId);
        if (alive && r.submitted_answer) setStudentAnswer(r.submitted_answer);
      } catch { /* ignora */ }
    }, 2500);
    return () => { alive = false; clearInterval(poll); };
  }, [sessionId, currentRoundId, lastResult]);

  // Sem pergunta selecionada → volta pra grade.
  useEffect(() => {
    if (!selectedQuestion) navigate("/question-grid", { replace: true });
  }, [selectedQuestion, navigate]);

  const question = selectedQuestion ?? { text: "—", answer: "—" };
  const canUseBackend = Boolean(sessionId && inquisitor?.id && victim?.id && selectedQuestion?.id);

  const handleStart = async () => {
    setError(null);
    setReading(true);
    startTimer();

    if (!canUseBackend) return; // modo demo/local: sem criar round no backend

    setBusy(true);
    try {
      const round = await createRound(sessionId, {
        inquisitorId: inquisitor.id,
        victimId: victim.id,
        questionId: selectedQuestion.id,
      });
      setCurrentRound(round.id);
    } catch (err) {
      setError(err.message ?? "Falha ao iniciar rodada");
    } finally {
      setBusy(false);
    }
  };

  const submitOutcome = async (outcome) => {
    if (!canUseBackend || !currentRoundId) {
      // fallback local: só marca resultado visual
      setLastResult(outcome);
      return null;
    }
    const result = await submitRoundResult(sessionId, currentRoundId, outcome);
    setScoreboard(result.scoreboard);
    setLastResult(outcome);
    return result;
  };

  const handleCorrect = async () => {
    setError(null);
    setBusy(true);
    try {
      await submitOutcome("correct");
      pushHistory({ actor: victim?.name ?? "—", event: "acertou a pergunta (+1)", type: "correct" });

      if (canUseBackend && currentRoundId) {
        const pu = await drawPowerup(sessionId, currentRoundId);
        setLastPowerup(pu);
        if (pu.drawn) {
          pushHistory({ actor: victim?.name ?? "—", event: `ganhou power-up: ${POWERUP_LABELS[pu.drawn] ?? pu.drawn}`, type: "powerup" });
        }
      }
      navTimeoutRef.current = setTimeout(() => navigate("/round-finished"), 1600);
    } catch (err) {
      setError(err.message ?? "Falha ao registrar acerto");
    } finally {
      setBusy(false);
    }
  };

  const handleWrong = async () => {
    setError(null);
    setBusy(true);
    try {
      await submitOutcome("wrong");
      pushHistory({ actor: victim?.name ?? "—", event: "errou a pergunta", type: "wrong" });
    } catch (err) {
      setError(err.message ?? "Falha ao registrar erro");
    } finally {
      setBusy(false);
    }
  };

  const handlePass = () => navigate("/pass-question");

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Rodada · {String(roundNumber).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-red transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-red transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] gap-4 px-4 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <RoleCard role="Inquisidor" name={inquisitor?.name ?? "—"} variant="purple" Icon={Volume2} />
          <ScoreHUD highlightId={victim?.id} className="hidden lg:block" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <Skull size={18} className="text-balatro-red" />
            <h1 className="font-pixel text-xl md:text-2xl text-balatro-red text-glow-red tracking-[0.15em]">
              BOSS BLIND
            </h1>
            <Skull size={18} className="text-balatro-red" />
          </div>

          <div className="flex items-center gap-1 font-pixel">
            <span className="text-[9px] text-balatro-text-dim">META ≥</span>
            <span className="text-2xl text-balatro-gold text-glow-gold tabular-nums">
              {targetScore.toLocaleString("pt-BR")}
            </span>
          </div>

          <Motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-2xl rounded-2xl border-4 border-balatro-red bg-balatro-card overflow-hidden"
            style={{ boxShadow: "0 14px 0 #000, 0 20px 40px rgba(220,38,38,0.4), inset 0 0 60px rgba(254,95,85,0.15)" }}
          >
            <div className="flex items-start justify-between p-3 pb-0 text-balatro-red">
              <QuestionCardCorner letter="Q" />
              <span className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
                {selectedQuestion?.type ? `Tipo · ${selectedQuestion.type}` : "Pergunta"}
              </span>
              <QuestionCardCorner letter="Q" flip />
            </div>
            <div className="px-6 py-6 flex flex-col items-center gap-4">
              <Spade size={140} className="absolute opacity-[0.04] text-balatro-red pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} fill="currentColor" />
              <p className="relative z-10 text-lg md:text-xl font-semibold leading-relaxed text-balatro-text text-center max-w-xl">
                {question.text}
              </p>
              <AnimatePresence>
                {showAnswer && (
                  <Motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="rounded-xl border-2 border-balatro-green bg-balatro-green/15 px-6 py-3 mt-2"
                  >
                    <p className="font-pixel text-[9px] tracking-[0.3em] text-balatro-green uppercase mb-1">Resposta</p>
                    <p className="text-base text-balatro-text font-mono">{question.answer || "—"}</p>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-end justify-between p-3 pt-0 text-balatro-red">
              <QuestionCardCorner letter="Q" flip />
              <div className="flex gap-2 opacity-60">
                <Spade size={12} fill="currentColor" />
                <Heart size={12} fill="currentColor" />
                <Diamond size={12} fill="currentColor" />
                <Club size={12} fill="currentColor" />
              </div>
              <QuestionCardCorner letter="Q" />
            </div>
            <AnimatePresence>
              {reading && (
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="foil-shimmer absolute inset-0 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </Motion.div>

          {error && (
            <div className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          {!reading ? (
            <Motion.button
              onClick={handleStart}
              disabled={busy}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 2, scale: 0.97 }}
              className="px-10 py-4 rounded-2xl bg-balatro-red text-white font-pixel text-sm tracking-[0.25em] uppercase border-b-4 border-red-950 hover:shadow-balatro-glow-red flex items-center gap-3 disabled:opacity-60"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Mic size={16} />} Iniciar Leitura
            </Motion.button>
          ) : (
            <Timer />
          )}

          {studentAnswer && !lastResult && (
            <Motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md rounded-xl border-2 border-balatro-blue bg-balatro-blue/10 px-4 py-3 text-center"
            >
              <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-blue uppercase mb-1">
                Resposta do aluno (no dispositivo)
              </p>
              <p className="text-base text-balatro-text font-mono">{studentAnswer}</p>
            </Motion.div>
          )}

          {reading && !lastResult && (
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <ActionButton onClick={handleCorrect} color="#50c878" Icon={busy ? Loader2 : Check} label="Acertou" />
              <ActionButton onClick={handleWrong} color="#fe5f55" Icon={X} label="Errou" />
            </div>
          )}

          {lastResult === "wrong" && (
            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-3 gap-2 w-full max-w-lg"
            >
              <ActionButton onClick={handlePass} color="#f0c040" Icon={ArrowRight} label="Repassar" />
              <ActionButton onClick={() => setShowAnswer((v) => !v)} color="#009dff" Icon={Eye} label={showAnswer ? "Ocultar" : "Revelar"} />
              <ActionButton onClick={() => navigate("/round-finished")} color="#9b59b6" Icon={Check} label="Finalizar" />
            </Motion.div>
          )}

          {lastResult === "correct" && (
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-xl border-2 border-balatro-green bg-balatro-green/15 px-6 py-3"
            >
              <p className="font-pixel text-sm tracking-[0.3em] text-balatro-green uppercase">
                ✓ ACERTO! Sorteando power-up…
              </p>
            </Motion.div>
          )}

          <button
            onClick={() => setPuModal(true)}
            className="font-pixel text-[10px] tracking-[0.25em] uppercase text-balatro-purple text-glow-purple hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Zap size={14} /> Ativar Power-Up
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <RoleCard role="Vítima" name={victim?.name ?? "—"} variant="red" Icon={Skull} />
          <ScoreHUD highlightId={victim?.id} className="lg:hidden" />
        </div>
      </main>

      <PowerUpModal open={puModal} onClose={() => setPuModal(false)} />
    </CRTFrame>
  );
}
