import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Zap, Shield, Clock, Eye, Shuffle, Check,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

import { cn } from "@/lib/utils";

const POWERUPS = [
  { id: "dica",   Icon: Eye,     label: "Dica",            sub: "Revela uma pista da resposta",       color: "#f0c040" },
  { id: "tempo",  Icon: Clock,   label: "Tempo Extra",     sub: "+15 segundos no cronômetro",         color: "#009dff" },
  { id: "escudo", Icon: Shield,  label: "Escudo",          sub: "Protege de uma resposta errada",     color: "#50c878" },
  { id: "troca",  Icon: Shuffle, label: "Trocar Questão",  sub: "Substitui a pergunta atual",         color: "#9b59b6" },
  { id: "dobro",  Icon: Zap,     label: "Pontos em Dobro", sub: "Multiplica por 2 os pontos ganhos",  color: "#fe5f55" },
];

export default function PowerUpsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [values, setValues] = useState({ dica: 25, tempo: 20, escudo: 15, troca: 10, dobro: 5 });
  const [saved, setSaved] = useState(false);

  const set = (id, val) => { setSaved(false); setValues((v) => ({ ...v, [id]: Number(val) })); };
  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const isValid = total === 100;

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-gold transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Joker Shop · Probabilidades
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

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-6 overflow-y-auto">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold text-glow-gold uppercase flex items-center justify-center gap-2">
            <Zap size={14} /> Joker Shop <Zap size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(240,192,64,0.5))" }}>
            POWER-UPS
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Configure as probabilidades de sorteio
          </p>
        </Motion.div>

        {/* Total indicator */}
        <Motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "w-full max-w-md rounded-2xl border-4 px-6 py-4 flex items-center justify-between",
            isValid ? "border-balatro-green bg-balatro-green/10" : "border-balatro-red bg-balatro-red/10",
          )}
          style={{ boxShadow: `0 10px 0 #000, 0 16px 28px ${isValid ? "rgba(80,200,120,0.3)" : "rgba(254,95,85,0.3)"}` }}
        >
          <span className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim">Total</span>
          <Motion.span
            key={total}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className={cn(
              "font-pixel text-3xl tabular-nums",
              isValid ? "text-balatro-green" : "text-balatro-red",
            )}
            style={{ textShadow: `0 0 12px ${isValid ? "#50c878" : "#fe5f55"}` }}
          >
            {total}%
          </Motion.span>
          <span className={cn(
            "font-pixel text-[9px] tracking-[0.2em] uppercase",
            isValid ? "text-balatro-green" : "text-balatro-red",
          )}>
            {isValid ? "✓ OK" : total > 100 ? "↓ Excesso" : "↑ Faltam"}
          </span>
        </Motion.div>

        {/* Sliders */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {POWERUPS.map((p, i) => {
            const PIcon = p.Icon;
            return (
              <Motion.div
                key={p.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md px-5 py-4"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: p.color, color: p.color, background: `${p.color}15` }}
                  >
                    <PIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">{p.label}</p>
                    <p className="text-[11px] text-balatro-text-dim leading-snug">{p.sub}</p>
                  </div>
                  <span
                    className="font-pixel text-lg tabular-nums min-w-[3rem] text-right"
                    style={{ color: p.color, textShadow: `0 0 10px ${p.color}` }}
                  >
                    {values[p.id]}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[p.id]}
                  onChange={(e) => set(p.id, e.target.value)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: p.color,
                    background: `linear-gradient(to right, ${p.color} ${values[p.id]}%, rgba(255,255,255,0.08) ${values[p.id]}%)`,
                  }}
                />
              </Motion.div>
            );
          })}
        </div>

        <Motion.button
          onClick={() => isValid && setSaved(true)}
          whileHover={isValid && { y: -3, scale: 1.03 }}
          whileTap={isValid && { y: 2, scale: 0.98 }}
          disabled={!isValid}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            saved
              ? "bg-balatro-green text-white border-green-900"
              : !isValid
                ? "bg-balatro-card-edge text-balatro-text-dim border-black opacity-50 cursor-not-allowed"
                : "bg-balatro-gold text-balatro-bg-deep border-yellow-800 hover:shadow-balatro-glow-gold",
          )}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><Zap size={18} /> Salvar Power-Ups</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
