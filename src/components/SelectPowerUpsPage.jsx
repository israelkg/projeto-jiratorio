import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Check, Zap,
  RefreshCw, SkipForward, Users, Hand, Eye, Clock, Shuffle, Shield,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

import { cn } from "@/lib/utils";

const POWERUPS = [
  { id: "inverter", Icon: RefreshCw,   label: "Inverter Pergunta",   desc: "Devolve a pergunta para o Inquisitor. Ele responde no seu lugar.",                color: "#f0c040", suit: "♠", rank: "A"  },
  { id: "pular",    Icon: SkipForward, label: "Pular a Vez",         desc: "Repassa a pergunta para outro jogador sem perda de pontos.",                       color: "#fe5f55", suit: "♥", rank: "K"  },
  { id: "dupla",    Icon: Users,       label: "Resposta em Dupla",   desc: "Escolha alguém para responder com você. Acerto: +0,5 pts. Erro: -0,2 pts.",       color: "#009dff", suit: "♦", rank: "Q"  },
  { id: "roubar",   Icon: Hand,        label: "Roubar 1 Ponto",      desc: "Subtrai 1 ponto de qualquer participante e adiciona ao seu placar.",              color: "#9b59b6", suit: "♣", rank: "J"  },
  { id: "dica",     Icon: Eye,         label: "Dica",                desc: "Revela uma pista da resposta antes de responder.",                                color: "#50c878", suit: "♠", rank: "10" },
  { id: "tempo",    Icon: Clock,       label: "Tempo Extra",         desc: "+30 segundos no cronômetro da rodada atual.",                                     color: "#009dff", suit: "♦", rank: "9"  },
  { id: "escudo",   Icon: Shield,      label: "Escudo",              desc: "Protege de perder pontos em caso de erro nesta rodada.",                          color: "#50c878", suit: "♣", rank: "8"  },
  { id: "troca",    Icon: Shuffle,     label: "Trocar Questão",      desc: "Substitui pergunta atual por uma nova aleatória, sem penalidade.",                color: "#fe5f55", suit: "♥", rank: "7"  },
];

export default function SelectPowerUpsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [enabled, setEnabled] = useState(new Set(["inverter", "dupla", "roubar", "dica"]));
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSaved(false);
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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
          Joker Collection
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

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold text-glow-gold uppercase flex items-center justify-center gap-2">
            <Zap size={14} /> Joker Collection <Zap size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(240,192,64,0.5))" }}>
            SELECIONAR POWER-UPS
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {enabled.size} de {POWERUPS.length} habilitados ◆
          </p>
        </Motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POWERUPS.map((p, i) => {
            const isOn = enabled.has(p.id);
            const PIcon = p.Icon;
            return (
              <Motion.div
                key={p.id}
                initial={{ y: 60, opacity: 0, rotate: -3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? -1 : 1, scale: 1.03 }}
                onClick={() => toggle(p.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2 min-h-[260px] transition-all",
                  isOn ? "border-current" : "border-balatro-card-edge opacity-60 grayscale",
                )}
                style={{
                  color: isOn ? p.color : undefined,
                  boxShadow: isOn
                    ? `0 14px 0 #000, 0 22px 36px ${p.color}55`
                    : "0 8px 0 #000, 0 16px 28px rgba(0,0,0,0.6)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-center leading-none" style={{ color: p.color }}>
                    <span className="font-pixel text-base">{p.rank}</span>
                    <span className="text-base">{p.suit}</span>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      isOn ? "bg-balatro-gold border-yellow-700" : "border-balatro-card-edge bg-balatro-bg-deep",
                    )}
                  >
                    {isOn && <Check size={14} className="text-balatro-bg-deep" strokeWidth={3} />}
                  </div>
                </div>

                <div
                  className="flex-1 flex flex-col items-center justify-center gap-3 my-2 rounded-lg"
                  style={{
                    background: isOn ? `linear-gradient(180deg, ${p.color}30, ${p.color}10)` : "rgba(255,255,255,0.04)",
                    color: isOn ? p.color : "rgba(255,255,255,0.4)",
                  }}
                >
                  <PIcon size={40} strokeWidth={2.5} />
                  <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-center px-2 leading-tight"
                        style={{ color: isOn ? p.color : "rgba(255,255,255,0.6)" }}>
                    {p.label}
                  </span>
                </div>

                <p className="text-[11px] leading-snug text-balatro-text-dim text-center px-1">
                  {p.desc}
                </p>

                <div className="flex items-end justify-end rotate-180" style={{ color: p.color }}>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-pixel text-base">{p.rank}</span>
                    <span className="text-base">{p.suit}</span>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

        <Motion.button
          onClick={handleSave}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ y: 2, scale: 0.98 }}
          disabled={enabled.size === 0}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            saved
              ? "bg-balatro-green text-white border-green-900"
              : enabled.size === 0
                ? "bg-balatro-card-edge text-balatro-text-dim border-black opacity-50 cursor-not-allowed"
                : "bg-balatro-gold text-balatro-bg-deep border-yellow-800 hover:shadow-balatro-glow-gold",
          )}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><Zap size={18} /> Confirmar Seleção</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
