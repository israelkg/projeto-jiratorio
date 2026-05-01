import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Home, UserCircle2, Mic, Volume2, Skull, Spade, Heart, Diamond, Club,
  Check, X, Eye, Zap, ArrowRight,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { Timer } from "@/features/round/components/Timer";
import { ScoreHUD } from "@/features/round/components/ScoreHUD";
import { PowerUpModal } from "@/features/round/components/PowerUpModal";
import { useRoundStore } from "@/features/round/store/roundStore";
import { useStudentsStore } from "@/features/students/store/studentsStore";
import { cn } from "@/lib/utils";

const DEMO_QUESTIONS = {
  1: { text: "Em que ano foi assinada a Declaração de Independência dos Estados Unidos?", answer: "1776" },
  2: { text: "Qual é o maior planeta do sistema solar?", answer: "Júpiter" },
  3: { text: "Quem pintou a Mona Lisa?", answer: "Leonardo da Vinci" },
};

export default function RoundQuestionPage({ targetScore = 1500 }) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  const roundNumber = useRoundStore((s) => s.roundNumber);
  const inquisitorId = useRoundStore((s) => s.inquisitorId);
  const victimId = useRoundStore((s) => s.victimId);
  const questionId = useRoundStore((s) => s.questionId);
  const showAnswer = useRoundStore((s) => s.showAnswer);
  const result = useRoundStore((s) => s.result);
  const setResult = useRoundStore((s) => s.setResult);
  const toggleAnswer = useRoundStore((s) => s.toggleAnswer);
  const addHistory = useRoundStore((s) => s.addHistory);
  const startTimer = useRoundStore((s) => s.startTimer);

  const students = useStudentsStore((s) => s.students);
  const addPoints = useStudentsStore((s) => s.addPoints);
  const givePowerUp = useStudentsStore((s) => s.givePowerUp);

  const [reading, setReading] = useState(false);
  const [puModal, setPuModal] = useState(false);
  const navTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  }, []);

  const inquisitor = students.find((s) => s.id === inquisitorId);
  const victim = students.find((s) => s.id === victimId);
  const question = DEMO_QUESTIONS[questionId] ?? DEMO_QUESTIONS[1];

  const handleStart = () => {
    setReading(true);
    startTimer();
  };

  const handleCorrect = () => {
    if (!victim) return;
    addPoints(victim.id, 1);
    addHistory({ actor: victim.name, event: "acertou (+1)", type: "correct" });
    // Sorteio power-up
    const PU_IDS = ["dica", "tempo", "escudo", "troca", "dobro"];
    const drawn = PU_IDS[Math.floor(Math.random() * PU_IDS.length)];
    givePowerUp(victim.id, drawn);
    addHistory({ actor: victim.name, event: `ganhou power-up: ${drawn}`, type: "powerup" });
    setResult("correct");
    navTimeoutRef.current = setTimeout(() => navigate("/round-finished"), 1500);
  };

  const handleWrong = () => {
    if (!victim) return;
    addPoints(victim.id, -1); // -0.5 ideal mas store usa int por simplicidade
    addHistory({ actor: victim.name, event: "errou (-0,5)", type: "wrong" });
    setResult("wrong");
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
        {/* LEFT — Inquisitor + Score */}
        <div className="flex flex-col gap-4">
          <RoleCard role="Inquisidor" name={inquisitor?.name ?? "—"} variant="purple" Icon={Volume2} />
          <ScoreHUD highlightId={victimId} className="hidden lg:block" />
        </div>

        {/* CENTER — Boss Blind question + Timer + Actions */}
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
              <CornerSuit letter="Q" />
              <span className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
                Pergunta · #{String(questionId ?? 1).padStart(3, "0")}
              </span>
              <CornerSuit letter="Q" flip />
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
                    <p className="text-base text-balatro-text font-mono">{question.answer}</p>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-end justify-between p-3 pt-0 text-balatro-red">
              <CornerSuit letter="Q" flip />
              <div className="flex gap-2 opacity-60">
                <Spade size={12} fill="currentColor" />
                <Heart size={12} fill="currentColor" />
                <Diamond size={12} fill="currentColor" />
                <Club size={12} fill="currentColor" />
              </div>
              <CornerSuit letter="Q" />
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

          {!reading ? (
            <Motion.button
              onClick={handleStart}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 2, scale: 0.97 }}
              className="px-10 py-4 rounded-2xl bg-balatro-red text-white font-pixel text-sm tracking-[0.25em] uppercase border-b-4 border-red-950 hover:shadow-balatro-glow-red flex items-center gap-3"
            >
              <Mic size={16} /> Iniciar Leitura
            </Motion.button>
          ) : (
            <Timer />
          )}

          {reading && !result && (
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <ActionBtn onClick={handleCorrect} color="#50c878" Icon={Check} label="Acertou" />
              <ActionBtn onClick={handleWrong} color="#fe5f55" Icon={X} label="Errou" />
            </div>
          )}

          {result === "wrong" && (
            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-3 gap-2 w-full max-w-lg"
            >
              <ActionBtn onClick={handlePass} color="#f0c040" Icon={ArrowRight} label="Repassar" />
              <ActionBtn onClick={toggleAnswer} color="#009dff" Icon={Eye} label={showAnswer ? "Ocultar" : "Revelar"} />
              <ActionBtn onClick={() => navigate("/round-finished")} color="#9b59b6" Icon={Check} label="Finalizar" />
            </Motion.div>
          )}

          {result === "correct" && (
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

        {/* RIGHT — Victim + Score mobile */}
        <div className="flex flex-col gap-4">
          <RoleCard role="Vítima" name={victim?.name ?? "—"} variant="red" Icon={Skull} />
          <ScoreHUD highlightId={victimId} className="lg:hidden" />
        </div>
      </main>

      <PowerUpModal open={puModal} onClose={() => setPuModal(false)} />
    </CRTFrame>
  );
}

function RoleCard({ role, name, variant, Icon }) {
  const cfg = {
    purple: { color: "#9b59b6", suit: "♠" },
    red:    { color: "#fe5f55", suit: "♥" },
  }[variant];

  return (
    <Motion.div
      initial={{ x: variant === "purple" ? -30 : 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2"
      style={{ borderColor: cfg.color, boxShadow: `0 10px 0 #000, 0 16px 28px ${cfg.color}40` }}
    >
      <div className="flex items-center justify-between" style={{ color: cfg.color }}>
        <span className="font-pixel text-[9px] tracking-[0.25em] uppercase">{role}</span>
        <span className="font-pixel text-xl">{cfg.suit}</span>
      </div>
      <div
        className="rounded-lg flex flex-col items-center justify-center py-4 gap-2"
        style={{ background: `linear-gradient(180deg, ${cfg.color}25, ${cfg.color}05)`, color: cfg.color }}
      >
        <Icon size={30} />
        <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">
          {name}
        </span>
      </div>
    </Motion.div>
  );
}

function CornerSuit({ letter, flip = false }) {
  return (
    <div className={cn("flex flex-col items-center leading-none", flip && "rotate-180")}>
      <span className="font-pixel text-sm">{letter}</span>
      <Spade size={12} fill="currentColor" />
    </div>
  );
}

function ActionBtn({ onClick, color, Icon, label }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ y: 2, scale: 0.96 }}
      className="px-4 py-3 rounded-xl border-b-4 font-pixel text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2"
      style={{
        background: color,
        color: color === "#f0c040" ? "#0a0a1a" : "#fff",
        borderColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Icon size={14} />
      {label}
    </Motion.button>
  );
}
