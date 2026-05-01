import { motion as Motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Spade, Heart, Diamond, Club } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useQuality } from "@/features/settings/store/settingsStore";


export default function HomePage() {
  const navigate = useNavigate();
  const onNewSession = () => navigate("/create");
  const onLoadSession = () => navigate("/load-session");
  const onOptions = () => navigate("/settings");
  return (
    <CRTFrame className="bg-balatro-bg-deep">
      
      <FloatingSuits />

      <main className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center px-8 lg:px-20 py-10">
        {/* LEFT — title + buttons */}
        <div className="flex flex-col items-start gap-10 max-w-xl">
          <Motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="space-y-2"
          >
            <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-red text-glow-red uppercase">
              ◆ Sistema de Revisão ◆
            </p>
            <Logo />
            <p className="font-pixel text-xs tracking-[0.3em] text-balatro-text-dim uppercase pt-2">
              Aprenda · Aposte · Vença
            </p>
          </Motion.div>

          <Motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 22 }}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <MenuButton primary onClick={onNewSession}>
              <Spade size={18} fill="currentColor" />
              <span>Nova Sessão</span>
            </MenuButton>
            <MenuButton onClick={onLoadSession}>
              <Diamond size={18} fill="currentColor" />
              <span>Carregar Sessão</span>
            </MenuButton>
            <MenuButton variant="ghost" onClick={onOptions}>
              <Club size={18} fill="currentColor" />
              <span>Opções</span>
            </MenuButton>
            <MenuButton variant="ghost">
              <Heart size={18} fill="currentColor" />
              <span>Sair</span>
            </MenuButton>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-pixel text-[8px] tracking-[0.4em] text-balatro-text-dim uppercase"
          >
            v0.1.0 · Press Start
          </Motion.p>
        </div>

        {/* RIGHT — decorative jokers */}
        <div className="hidden lg:flex relative justify-center items-center h-[500px]">
          <JokerStack />
        </div>
      </main>

      {/* Mobile: jokers below */}
      <div className="lg:hidden relative z-10 flex justify-center pb-12">
        <JokerStack compact />
      </div>
    </CRTFrame>
  );
}

function Logo() {
  return (
    <Motion.h1
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
      className="font-pixel text-balatro-text leading-none flex items-center gap-1 select-none"
      style={{ filter: "drop-shadow(0 0 16px rgba(254,95,85,0.6)) drop-shadow(0 0 32px rgba(220,38,38,0.4))" }}
    >
      <span className="text-5xl md:text-7xl text-balatro-text">REVI</span>
      <Motion.span
        animate={{ rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center justify-center bg-balatro-text rounded-md w-12 h-12 md:w-16 md:h-16 mx-1 shadow-2xl"
      >
        <Spade size={36} className="text-balatro-bg-deep" fill="currentColor" />
      </Motion.span>
      <span className="text-5xl md:text-7xl text-balatro-text">SÃO</span>
    </Motion.h1>
  );
}

function JokerStack() {
  const jokers = [
    { rotate: -18, x: -60, y: 20, color: "#16a34a", icon: <Spade size={28} fill="currentColor" />, label: "JOKER", delay: 0.4 },
    { rotate: -4,  x: -10, y: -10, color: "#f5f5f0", icon: <SkullIcon />,                              label: "JOKER", delay: 0.55 },
    { rotate: 12,  x: 50,  y: 30,  color: "#fbbf24", icon: <JesterIcon />,                              label: "JOKER", delay: 0.7 },
  ];

  return (
    <div className="relative w-[320px] h-[420px]">
      {jokers.map((j, i) => (
        <Motion.div
          key={i}
          initial={{ y: -200, opacity: 0, rotate: j.rotate - 30 }}
          animate={{ y: j.y, opacity: 1, rotate: j.rotate, x: j.x }}
          transition={{ delay: j.delay, type: "spring", stiffness: 200, damping: 18 }}
          whileHover={{ y: j.y - 20, scale: 1.05 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-64 rounded-2xl border-4 border-balatro-text bg-balatro-bg-deep p-3 flex flex-col justify-between"
          style={{
            boxShadow: "0 16px 0 #000, 0 24px 40px rgba(0,0,0,0.8)",
            zIndex: i,
          }}
        >
          <CornerLabel color={j.color} top label={j.label} />
          <div
            className="flex-1 flex items-center justify-center my-2 rounded-xl"
            style={{ background: `linear-gradient(180deg, ${j.color}33 0%, ${j.color}66 100%)`, color: j.color }}
          >
            {j.icon}
          </div>
          <CornerLabel color={j.color} label={j.label} />
        </Motion.div>
      ))}
    </div>
  );
}

function CornerLabel({ color, top = false, label }) {
  return (
    <span
      className={`font-pixel text-[8px] leading-none ${top ? "self-start" : "self-end rotate-180"}`}
      style={{ color }}
    >
      {label}
    </span>
  );
}

function SkullIcon() {
  return (
    <svg viewBox="0 0 24 24" width="56" height="56" fill="currentColor">
      <path d="M12 2C7 2 4 5 4 9v4c0 1.5 1 3 2 3l-1 4h4l1-2h4l1 2h4l-1-4c1 0 2-1.5 2-3V9c0-4-3-7-8-7zm-3 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
  );
}

function JesterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="56" height="56" fill="currentColor">
      <path d="M12 2L8 6h8l-4-4zm-6 6l-2 4 4 2v8h12v-8l4-2-2-4-4 2-4-2-4 2-4-2zm6 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
  );
}

function MenuButton({ children, onClick, primary = false, variant }) {
  const base = "group relative w-full flex items-center gap-4 px-6 py-4 font-pixel text-xs tracking-[0.2em] uppercase border-b-4 rounded-xl select-none transition-all duration-150";
  const styles = primary
    ? "bg-balatro-red text-white border-red-950 hover:shadow-balatro-glow-red"
    : variant === "ghost"
      ? "bg-balatro-card/60 text-balatro-text-dim border-balatro-card-edge hover:text-balatro-text"
      : "bg-balatro-card text-balatro-text border-black hover:bg-balatro-card-edge";

  return (
    <Motion.button
      onClick={onClick}
      whileHover={{ x: 6 }}
      whileTap={{ y: 2, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      className={`${base} ${styles}`}
    >
      {children}
      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
    </Motion.button>
  );
}

const SUITS_ALL = [
  { Comp: Spade,   color: "#f5f5f0", x: "8%",  delay: 0,   size: 28 },
  { Comp: Heart,   color: "#fe5f55", x: "92%", delay: 2,   size: 32 },
  { Comp: Diamond, color: "#f0c040", x: "55%", delay: 4,   size: 26 },
  { Comp: Club,    color: "#50c878", x: "78%", delay: 6,   size: 30 },
  { Comp: Heart,   color: "#dc2626", x: "30%", delay: 8,   size: 24 },
  { Comp: Spade,   color: "#9b59b6", x: "65%", delay: 10,  size: 28 },
];

function FloatingSuits() {
  const reduced = useReducedMotion();
  const q = useQuality();
  if (reduced || q.floatingSuits === 0) return null;
  const suits = SUITS_ALL.slice(0, q.floatingSuits);
  const useGlow = !!q.suitsGlow;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {suits.map((s, i) => {
        const SuitIcon = s.Comp;
        return (
          <Motion.div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: s.x,
              color: s.color,
              ...(useGlow && { filter: `drop-shadow(0 0 8px ${s.color})` }),
            }}
            initial={{ y: "110vh", opacity: 0, rotate: 0 }}
            animate={{ y: "-20vh", opacity: [0, 0.4, 0], rotate: 360 }}
            transition={{ duration: 18, delay: s.delay, repeat: Infinity, ease: "linear" }}
          >
            <SuitIcon size={s.size} fill="currentColor" />
          </Motion.div>
        );
      })}
    </div>
  );
}
