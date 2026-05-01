import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, HelpCircle, Check, Spade, Heart, Diamond, Club,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { cn } from "@/lib/utils";

const COUNT_OPTIONS = [
  { n: 30, suit: Spade,   color: "#f5f5f0", rank: "A" },
  { n: 40, suit: Heart,   color: "#fe5f55", rank: "K" },
  { n: 50, suit: Diamond, color: "#f0c040", rank: "Q" },
  { n: 60, suit: Club,    color: "#50c878", rank: "J" },
  { n: 70, suit: Spade,   color: "#9b59b6", rank: "10" },
];

export default function QuestionCountPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);
  const [selected, setSelected] = useState(40);
  const [saved, setSaved] = useState(false);

  const handleSelect = (n) => { setSelected(n); setSaved(false); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

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
          Hand Size
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-blue text-glow-blue uppercase flex items-center justify-center gap-2">
            <HelpCircle size={14} /> Hand Size <HelpCircle size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}>
            QUANTAS PERGUNTAS?
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Recomendado: ≥ 1 a cada 2 alunos
          </p>
        </Motion.div>

        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {COUNT_OPTIONS.map((opt, i) => {
            const SIcon = opt.suit;
            const isActive = selected === opt.n;
            return (
              <Motion.button
                key={opt.n}
                type="button"
                onClick={() => handleSelect(opt.n)}
                initial={{ y: 60, opacity: 0, rotate: -3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? -1 : 1, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative cursor-pointer rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2 min-h-[180px] transition-all focus-visible:outline-2 focus-visible:outline-offset-2",
                  isActive ? "border-current" : "border-balatro-card-edge opacity-60",
                )}
                style={{
                  color: isActive ? opt.color : undefined,
                  outlineColor: opt.color,
                  boxShadow: isActive
                    ? `0 14px 0 #000, 0 22px 36px ${opt.color}55`
                    : "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.6)",
                }}
              >
                <div className="flex items-start justify-between" style={{ color: opt.color }}>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-pixel text-base">{opt.rank}</span>
                    <SIcon size={14} fill="currentColor" />
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-balatro-gold border-2 border-yellow-700 flex items-center justify-center">
                      <Check size={14} className="text-balatro-bg-deep" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div
                  className="flex-1 flex items-center justify-center my-2 rounded-lg"
                  style={{
                    background: isActive ? `linear-gradient(180deg, ${opt.color}30, ${opt.color}10)` : "rgba(255,255,255,0.04)",
                    color: isActive ? opt.color : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span className="font-pixel text-4xl tabular-nums" style={{ textShadow: isActive ? `0 0 12px ${opt.color}` : "none" }}>
                    {opt.n}
                  </span>
                </div>
                <div className="flex items-end justify-end rotate-180" style={{ color: opt.color }}>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-pixel text-base">{opt.rank}</span>
                    <SIcon size={14} fill="currentColor" />
                  </div>
                </div>
              </Motion.button>
            );
          })}
        </div>

        <Motion.button
          onClick={handleSave}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ y: 2, scale: 0.98 }}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            saved
              ? "bg-balatro-green text-white border-green-900"
              : "bg-balatro-blue text-white border-blue-950 hover:shadow-balatro-glow-blue",
          )}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><HelpCircle size={18} /> Salvar — {selected}</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
