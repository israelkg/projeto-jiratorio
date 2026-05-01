import { useState } from "react";
import { motion as Motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Home, UserCircle2, Upload, Users, User, Sparkles,
  ListOrdered, Zap, Package, HelpCircle, LayoutList,
  PlayCircle, ChevronRight, Spade,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";

import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "import",          icon: Upload,      label: "Importar Material",     suit: "♠", color: "balatro-blue",   to: "/import-material" },
  { id: "generate",        icon: Sparkles,    label: "Gerar Perguntas",       suit: "♦", color: "balatro-blue",   to: "/generate" },
  { id: "list",            icon: ListOrdered, label: "Listar / Editar",       suit: "♣", color: "balatro-green",  to: "/list" },
  { id: "powerups",        icon: Zap,         label: "Power-Ups (%)",         suit: "♥", color: "balatro-gold",   to: "/powerups" },
  { id: "inventory",       icon: Package,     label: "Inventário Inicial",    suit: "♠", color: "balatro-purple", to: "/inventory" },
  { id: "questioncount",   icon: HelpCircle,  label: "Quantidade Perguntas",  suit: "♦", color: "balatro-blue",   to: "/question-count" },
  { id: "choosequestions", icon: LayoutList,  label: "Escolher Perguntas",    suit: "♣", color: "balatro-purple", to: "/choose-questions" },
  { id: "selectpowerups",  icon: Sparkles,    label: "Selecionar Power-Ups",  suit: "♥", color: "balatro-gold",   to: "/select-powerups" },
];

export default function CreateMatchPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("individual");
  const onHome = () => navigate("/");

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onHome}
            className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-red transition-colors flex items-center gap-2"
          >
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-red transition-colors">
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
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-red text-glow-red uppercase">
            ◆ Run Setup ◆
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(254,95,85,0.5))" }}>
            CRIAR PARTIDA
          </h1>
        </Motion.div>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-lg rounded-2xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(0,0,0,0.7)" }}
        >
          <div className="grid grid-cols-2 border-b-2 border-balatro-card-edge">
            <ModeButton active={mode === "individual"} icon={<User size={14} />} label="Individual" onClick={() => setMode("individual")} />
            <ModeButton active={mode === "dupla"}      icon={<Users size={14} />} label="Em Dupla"   onClick={() => setMode("dupla")} />
          </div>

          <div className="flex flex-col">
            {MENU_ITEMS.map((item, i) => (
              <MenuRow
                key={item.id}
                Icon={item.icon}
                label={item.label}
                suit={item.suit}
                color={item.color}
                onClick={() => navigate(item.to)}
                last={i === MENU_ITEMS.length - 1}
                index={i}
              />
            ))}
          </div>
        </Motion.div>

        <BalatroButton
          variant="red"
          onClick={() => navigate(mode === "dupla" ? "/duo-mode" : "/sort-draw")}
        >
          <Spade size={18} fill="currentColor" />
          <PlayCircle size={20} />
          Iniciar Partida
          <Spade size={18} fill="currentColor" />
        </BalatroButton>
      </main>
    </CRTFrame>
  );
}

function ModeButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 py-4 font-pixel text-[10px] tracking-[0.25em] uppercase transition-all border-b-2",
        active
          ? "bg-balatro-red/20 text-balatro-red text-glow-red border-balatro-red"
          : "text-balatro-text-dim border-transparent hover:text-balatro-text hover:bg-white/5",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

const SUIT_COLORS = {
  "balatro-blue":   "#009dff",
  "balatro-red":    "#fe5f55",
  "balatro-gold":   "#f0c040",
  "balatro-green":  "#50c878",
  "balatro-purple": "#9b59b6",
};

function MenuRow({ Icon, label, suit, color, onClick, last, index }) {
  const accent = SUIT_COLORS[color];
  return (
    <Motion.button
      onClick={onClick}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15 + index * 0.04 }}
      whileHover={{ x: 6 }}
      className={cn(
        "group relative w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors",
        !last && "border-b border-balatro-card-edge/50",
      )}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-1 opacity-0 scale-y-0 origin-center group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-200"
        style={{ background: accent }}
        aria-hidden="true"
      />

      <span
        className="flex items-center justify-center w-9 h-9 rounded-lg border-2 border-balatro-card-edge bg-black/30 group-hover:border-current transition-colors"
        style={{ color: accent }}
      >
        <Icon size={16} strokeWidth={2.5} />
      </span>

      <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text-dim group-hover:text-balatro-text transition-colors flex-1">
        {label}
      </span>

      <span className="font-pixel text-base group-hover:scale-125 transition-transform" style={{ color: accent }}>
        {suit}
      </span>

      <ChevronRight size={14} className="text-balatro-text-dim group-hover:text-balatro-text transition-colors" />
    </Motion.button>
  );
}
