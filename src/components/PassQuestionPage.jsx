import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, Dice5, Skull, ArrowRight } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useStudentsStore } from "@/features/students/store/studentsStore";
import { useRoundStore } from "@/features/round/store/roundStore";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PassQuestionPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  const students = useStudentsStore((s) => s.students);
  const inquisitorId = useRoundStore((s) => s.inquisitorId);
  const victimId = useRoundStore((s) => s.victimId);
  const setVictim = useRoundStore((s) => s.setVictim);
  const resetTimer = useRoundStore((s) => s.resetTimer);

  const [phase, setPhase] = useState("rolling");
  const [tickName, setTickName] = useState("");
  const [newVictim, setNewVictim] = useState(null);
  const tickRef = useRef(null);

  useEffect(() => {
    const eligible = students.filter((s) => s.id !== inquisitorId && s.id !== victimId);
    let count = 0;
    tickRef.current = setInterval(() => {
      setTickName(pickRandom(eligible).name);
      count++;
      if (count > 18) {
        clearInterval(tickRef.current);
        const picked = pickRandom(eligible);
        setNewVictim(picked);
        setVictim(picked.id);
        resetTimer();
        setPhase("done");
      }
    }, 80);
    return () => clearInterval(tickRef.current);
  }, [students, inquisitorId, victimId, setVictim, resetTimer]);

  const goBack = () => navigate("/round-question");

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Passing the Card
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-gold transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-gold transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold text-glow-gold uppercase flex items-center justify-center gap-2">
            <Dice5 size={14} /> Repasse <Dice5 size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(240,192,64,0.5))" }}>
            NOVA VÍTIMA
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Sorteando próximo aluno…
          </p>
        </Motion.div>

        {phase === "rolling" && (
          <div className="flex flex-col items-center gap-4">
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-balatro-gold"
              style={{ filter: "drop-shadow(0 0 16px rgba(240,192,64,0.6))" }}
            >
              <Dice5 size={64} />
            </Motion.div>
            <Motion.span
              key={tickName}
              initial={{ scale: 1.3, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-pixel text-2xl text-balatro-text tracking-[0.2em] tabular-nums"
              style={{ textShadow: "0 0 12px #f0c040" }}
            >
              {tickName}
            </Motion.span>
          </div>
        )}

        {phase === "done" && newVictim && (
          <div className="flex flex-col items-center gap-8">
            <Motion.div
              initial={{ y: 60, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="rounded-2xl border-4 border-balatro-red bg-balatro-card overflow-hidden flex flex-col items-center p-4 gap-2 w-48 h-64"
              style={{ boxShadow: "0 14px 0 #000, 0 22px 36px rgba(254,95,85,0.5)" }}
            >
              <div className="flex items-start justify-between w-full text-balatro-red">
                <span className="font-pixel text-base">♥</span>
                <span className="font-pixel text-[8px] tracking-[0.2em] uppercase">Nova Vítima</span>
                <span className="font-pixel text-base rotate-180">♥</span>
              </div>
              <div className="flex-1 w-full rounded-lg flex items-center justify-center bg-balatro-red/15 text-balatro-red">
                <Skull size={48} />
              </div>
              <span className="font-pixel text-xs tracking-[0.15em] uppercase text-balatro-text">
                {newVictim.name}
              </span>
            </Motion.div>
            <Motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={goBack}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ y: 2, scale: 0.97 }}
              className="px-12 py-4 rounded-2xl bg-balatro-gold text-balatro-bg-deep font-pixel text-sm tracking-[0.3em] uppercase border-b-4 border-yellow-800 hover:shadow-balatro-glow-gold flex items-center gap-3"
            >
              Continuar Rodada <ArrowRight size={18} />
            </Motion.button>
          </div>
        )}
      </main>
    </CRTFrame>
  );
}
