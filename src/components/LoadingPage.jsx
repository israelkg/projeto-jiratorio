import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, Skull, Sparkles, Spade, Heart, Diamond, Club } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useQuality } from "@/features/settings/store/settingsStore";

const PHASES = [
  { label: "Analisando o material", color: "#009dff" },
  { label: "Gerando as perguntas",  color: "#9b59b6" },
  { label: "Finalizando estrutura", color: "#f0c040" },
];

export default function LoadingPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const q = useQuality();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const navTimeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.8;
        if (next >= 33 && next < 34) setPhase(1);
        if (next >= 66 && next < 67) setPhase(2);
        if (next >= 100) {
          clearInterval(interval);
          navTimeoutRef.current = setTimeout(() => navigate("/list"), 800);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => {
      clearInterval(interval);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [navigate]);

  const done = progress >= 100;
  const cur = PHASES[phase];

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Boss Reveal
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

      <FloatingSuits />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-2"
             style={{ color: cur.color, textShadow: `0 0 12px ${cur.color}` }}>
            <Skull size={14} /> Boss Reveal <Skull size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: `drop-shadow(0 0 14px ${cur.color}80)` }}>
            INVOCANDO IA
          </h1>
        </Motion.div>

        {/* Spinning card — 3D só em MEDIUM/ULTRA */}
        <Motion.div
          animate={q.decorative3D ? { rotateY: 360 } : { opacity: [0.85, 1, 0.85] }}
          transition={{
            duration: q.decorative3D ? 6 : 2,
            repeat: Infinity,
            ease: q.decorative3D ? "linear" : "easeInOut",
          }}
          style={q.decorative3D ? { transformStyle: "preserve-3d", perspective: 1000 } : undefined}
          className="relative w-44 h-64 rounded-2xl border-4 border-balatro-text bg-balatro-bg-deep flex flex-col items-center justify-center p-3 will-change-transform"
        >
          <Motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: cur.color }}
            className="will-change-transform"
          >
            <Sparkles size={64} strokeWidth={2} />
          </Motion.div>
        </Motion.div>

        {/* Progress bar */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Motion.span
              key={phase}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-pixel text-[10px] tracking-[0.2em] uppercase"
              style={{ color: cur.color, textShadow: `0 0 8px ${cur.color}` }}
            >
              {cur.label}…
            </Motion.span>
            <span className="font-pixel text-base text-balatro-text tabular-nums">
              {Math.floor(progress)}%
            </span>
          </div>
          <div
            className="relative h-4 rounded-full border-2 border-balatro-card-edge bg-balatro-bg-deep overflow-hidden"
            style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)" }}
          >
            <Motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${cur.color}, ${cur.color}aa)`,
                boxShadow: `0 0 16px ${cur.color}`,
              }}
            />
          </div>
          <div className="flex justify-between font-pixel text-[8px] tracking-widest text-balatro-text-dim">
            <span className={phase >= 0 ? "text-balatro-blue text-glow-blue" : ""}>FASE 1</span>
            <span className={phase >= 1 ? "text-balatro-purple text-glow-purple" : ""}>FASE 2</span>
            <span className={phase >= 2 ? "text-balatro-gold text-glow-gold" : ""}>FASE 3</span>
          </div>
        </div>

        {done && (
          <Motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-pixel text-sm tracking-[0.3em] text-balatro-green uppercase"
            style={{ textShadow: "0 0 12px rgba(80,200,120,0.6)" }}
          >
            ✓ PRONTO!
          </Motion.p>
        )}
      </main>
    </CRTFrame>
  );
}

const FLOATING_SUITS = [
  { Comp: Spade,   color: "#f5f5f0", x: "10%", delay: 0 },
  { Comp: Heart,   color: "#fe5f55", x: "85%", delay: 1.4 },
  { Comp: Diamond, color: "#f0c040", x: "20%", delay: 2.8 },
  { Comp: Club,    color: "#50c878", x: "75%", delay: 4.2 },
];

function FloatingSuits() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {FLOATING_SUITS.map((s, i) => {
        const SIcon = s.Comp;
        return (
          <Motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, color: s.color,  }}
            initial={{ y: "110vh", opacity: 0, rotate: 0 }}
            animate={{ y: "-20vh", opacity: [0, 0.4, 0], rotate: 360 }}
            transition={{ duration: 14, delay: s.delay, repeat: Infinity, ease: "linear" }}
          >
            <SIcon size={28} fill="currentColor" />
          </Motion.div>
        );
      })}
    </div>
  );
}
