import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Sparkles, ChevronLeft, Check, CircleDot, ListChecks, Pencil,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { cn } from "@/lib/utils";

const QUESTION_TYPES = [
  { id: "multipla",     label: "Múltipla Escolha",   Icon: CircleDot,  color: "#9b59b6" },
  { id: "verdadeiro",   label: "Verdadeiro / Falso", Icon: ListChecks, color: "#009dff" },
  { id: "dissertativa", label: "Dissertativa",       Icon: Pencil,     color: "#50c878" },
];

const DIFFICULTIES = [
  { id: "facil",   label: "Fácil",   color: "#50c878" },
  { id: "medio",   label: "Médio",   color: "#f0c040" },
  { id: "dificil", label: "Difícil", color: "#fe5f55" },
];

export default function GenerateQuestionsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [quantity, setQuantity] = useState(10);
  const [difficulty, setDifficulty] = useState("medio");
  const [types, setTypes] = useState({ multipla: true, verdadeiro: false, dissertativa: false });
  const [generating, setGenerating] = useState(false);
  const navTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  }, []);

  const toggleType = (id) => setTypes((t) => ({ ...t, [id]: !t[id] }));

  const handleGenerate = () => {
    setGenerating(true);
    navTimeoutRef.current = setTimeout(() => navigate("/loading"), 600);
  };

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Joker Generator
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-purple transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-6 overflow-y-auto">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Joker Generator <Sparkles size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            GERAR PERGUNTAS
          </h1>
        </Motion.div>

        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Quantidade */}
          <Motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
            style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg border-2 border-balatro-blue bg-balatro-blue/15 flex items-center justify-center text-balatro-blue">
                <Sparkles size={18} />
              </div>
              <div className="flex-1">
                <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">Quantidade</p>
                <p className="text-[11px] text-balatro-text-dim">Quantas perguntas a IA deve gerar</p>
              </div>
              <span className="font-pixel text-2xl text-balatro-blue text-glow-blue tabular-nums">{quantity}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                accentColor: "#009dff",
                background: `linear-gradient(to right, #009dff ${(quantity - 5) / 0.95}%, rgba(255,255,255,0.08) ${(quantity - 5) / 0.95}%)`,
              }}
            />
          </Motion.div>

          {/* Dificuldade */}
          <Motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
            style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
          >
            <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text mb-3">Dificuldade</p>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTIES.map((d) => {
                const active = difficulty === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDifficulty(d.id)}
                    className={cn(
                      "py-3 rounded-lg border-2 font-pixel text-[10px] tracking-[0.2em] uppercase transition-all",
                      active ? "border-current text-current" : "border-balatro-card-edge text-balatro-text-dim",
                    )}
                    style={{
                      color: active ? d.color : undefined,
                      background: active ? `${d.color}20` : undefined,
                      textShadow: active ? `0 0 8px ${d.color}` : "none",
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </Motion.div>

          {/* Tipos */}
          <Motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
            style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
          >
            <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text mb-3">Tipos de Pergunta</p>
            <div className="flex flex-col gap-2">
              {QUESTION_TYPES.map((t) => {
                const TIcon = t.Icon;
                const active = types[t.id];
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleType(t.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all text-left",
                      active ? "border-current" : "border-balatro-card-edge",
                    )}
                    style={{
                      color: active ? t.color : "rgba(255,255,255,0.6)",
                      background: active ? `${t.color}15` : "rgba(0,0,0,0.2)",
                    }}
                  >
                    <TIcon size={18} />
                    <span className="font-pixel text-[10px] tracking-[0.15em] uppercase flex-1">{t.label}</span>
                    {active && <Check size={16} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </Motion.div>
        </div>

        <Motion.button
          onClick={handleGenerate}
          disabled={generating}
          whileHover={!generating && { y: -3, scale: 1.03 }}
          whileTap={!generating && { y: 2, scale: 0.98 }}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            generating
              ? "bg-balatro-card-edge text-balatro-text-dim border-black cursor-wait"
              : "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.6)]",
          )}
        >
          {generating ? <><Check size={18} /> Gerando…</> : <><Sparkles size={18} /> Gerar Perguntas</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
