import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, ChevronLeft, Volume2, Skull, Dice5, ArrowRight } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useStudentsStore } from "@/features/students/store/studentsStore";
import { useRoundStore } from "@/features/round/store/roundStore";
import { pickRandom, pickWeighted } from "@/lib/random";

export default function SortDrawPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const students = useStudentsStore((s) => s.students);
  const incrementVictimCount = useStudentsStore((s) => s.incrementVictimCount);
  const setRoles = useRoundStore((s) => s.setRoles);

  const [phase, setPhase] = useState("idle"); // idle | rolling | done
  const [inquisitor, setInquisitor] = useState(null);
  const [victim, setVictim] = useState(null);
  const [tickName, setTickName] = useState("");
  const tickRef = useRef(null);

  useEffect(() => () => clearInterval(tickRef.current), []);

  const startSort = () => {
    setPhase("rolling");
    let count = 0;
    tickRef.current = setInterval(() => {
      setTickName(pickRandom(students).name);
      count++;
      if (count > 24) {
        clearInterval(tickRef.current);
        const inq = pickRandom(students);
        const remaining = students.filter((s) => s.id !== inq.id);
        const vic = pickWeighted(remaining);
        setInquisitor(inq);
        setVictim(vic);
        setRoles(inq.id, vic.id);
        incrementVictimCount(vic.id);
        setPhase("done");
      }
    }, 80);
  };

  const goToQuestion = () => navigate("/round-question");

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-red transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Role Drafting
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-red text-glow-red uppercase flex items-center justify-center gap-2">
            <Dice5 size={14} /> Role Drafting <Dice5 size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(254,95,85,0.5))" }}>
            SORTEIO
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Inquisidor faz a pergunta · Vítima responde
          </p>
        </Motion.div>

        {phase === "idle" && (
          <Motion.button
            onClick={startSort}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ y: 2, scale: 0.97 }}
            className="px-12 py-5 rounded-2xl bg-balatro-red text-white font-pixel text-sm tracking-[0.3em] uppercase border-b-4 border-red-950 hover:shadow-balatro-glow-red flex items-center gap-3"
          >
            <Dice5 size={18} /> Sortear Papéis
          </Motion.button>
        )}

        {phase === "rolling" && (
          <div className="flex flex-col items-center gap-4">
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-balatro-red"
              style={{ filter: "drop-shadow(0 0 16px rgba(254,95,85,0.6))" }}
            >
              <Dice5 size={72} />
            </Motion.div>
            <Motion.span
              key={tickName}
              initial={{ scale: 1.3, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-pixel text-2xl text-balatro-text tracking-[0.2em] tabular-nums"
              style={{ textShadow: "0 0 12px #fe5f55" }}
            >
              {tickName}
            </Motion.span>
          </div>
        )}

        {phase === "done" && inquisitor && victim && (
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-6">
              <RoleCard role="Inquisidor" name={inquisitor.name} variant="purple" Icon={Volume2} />
              <RoleCard role="Vítima" name={victim.name} variant="red" Icon={Skull} />
            </div>
            <Motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={goToQuestion}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ y: 2, scale: 0.97 }}
              className="px-12 py-4 rounded-2xl bg-balatro-gold text-balatro-bg-deep font-pixel text-sm tracking-[0.3em] uppercase border-b-4 border-yellow-800 hover:shadow-balatro-glow-gold flex items-center gap-3"
            >
              Escolher Pergunta <ArrowRight size={18} />
            </Motion.button>
          </div>
        )}
      </main>
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
      initial={{ y: 60, opacity: 0, scale: 0.85, rotate: -4 }}
      animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="rounded-2xl border-4 bg-balatro-card overflow-hidden flex flex-col items-center p-4 gap-2 w-44 h-60"
      style={{ borderColor: cfg.color, boxShadow: `0 14px 0 #000, 0 22px 36px ${cfg.color}55` }}
    >
      <div className="flex items-start justify-between w-full" style={{ color: cfg.color }}>
        <span className="font-pixel text-base">{cfg.suit}</span>
        <span className="font-pixel text-[8px] tracking-[0.2em] uppercase">{role}</span>
        <span className="font-pixel text-base rotate-180">{cfg.suit}</span>
      </div>
      <div
        className="flex-1 w-full rounded-lg flex items-center justify-center"
        style={{ background: `linear-gradient(180deg, ${cfg.color}30, ${cfg.color}10)`, color: cfg.color }}
      >
        <Icon size={48} />
      </div>
      <span className="font-pixel text-xs tracking-[0.15em] uppercase text-balatro-text">
        {name}
      </span>
    </Motion.div>
  );
}
