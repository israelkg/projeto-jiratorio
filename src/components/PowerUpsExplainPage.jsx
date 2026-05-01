import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, BookOpen, Check,
  RotateCcw, ChevronsRight, Users, Grab, Clock, Eye, Shuffle, Zap, Shield,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

import { cn } from "@/lib/utils";

const POWERUPS = [
  { id: "inverter", Icon: RotateCcw,    label: "Inverter Pergunta",  description: "Devolve a pergunta para a pessoa que direcionou a você. Ela responde no seu lugar.",                    color: "#009dff", suit: "♦", rank: "A" },
  { id: "pular",    Icon: ChevronsRight,label: "Pular a Vez",        description: "Não responde a pergunta sem perder pontos. Repassa para outra pessoa escolhida por você.",              color: "#f0c040", suit: "♥", rank: "K" },
  { id: "dupla",    Icon: Users,        label: "Resposta em Dupla",  description: "Escolha alguém para responder junto. Acerto: +1 / +0,5 ponto. Erro: -0,2 ponto cada.",                  color: "#9b59b6", suit: "♠", rank: "Q" },
  { id: "roubar",   Icon: Grab,         label: "Roubar um Ponto",    description: "Retira 1 ponto de qualquer participante. O ponto é subtraído imediatamente do alvo escolhido.",        color: "#fe5f55", suit: "♥", rank: "J" },
  { id: "tempo",    Icon: Clock,        label: "+ 30 Segundos",      description: "Concede 30 segundos extras ao timer. Só pode ser usado uma vez por rodada.",                            color: "#50c878", suit: "♣", rank: "10" },
  { id: "dica",     Icon: Eye,          label: "Ver Dica",           description: "Revela uma pista da resposta correta sem mostrar inteira. Não garante acerto, mas ajuda.",              color: "#f0c040", suit: "♦", rank: "9" },
  { id: "dobro",    Icon: Zap,          label: "Pontos em Dobro",    description: "Se acertar após ativar, pontos ganhos x2. Se errar, penalidade também dobra.",                          color: "#fe5f55", suit: "♥", rank: "8" },
  { id: "escudo",   Icon: Shield,       label: "Escudo",             description: "Protege de perder pontos em caso de erro. Consumido após o uso, não acumula.",                          color: "#50c878", suit: "♣", rank: "7" },
  { id: "troca",    Icon: Shuffle,      label: "Trocar Questão",     description: "Substitui a pergunta atual por nova aleatória. A descartada não retorna à rodada.",                     color: "#9b59b6", suit: "♠", rank: "6" },
];

export default function PowerUpsExplainPage({ onSave }) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [items, setItems] = useState(POWERUPS.map((p) => ({ ...p, enabled: true })));
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSaved(false);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onSave?.(items.filter((p) => p.enabled).map((p) => p.id));
  };

  const enabledCount = items.filter((p) => p.enabled).length;

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

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
          Card Compendium
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

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <BookOpen size={14} /> Card Compendium <BookOpen size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            EXPLICAÇÃO POWER-UPS
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {enabledCount} habilitados / {items.length} cards ◆
          </p>
        </Motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p, i) => {
            const PIcon = p.Icon;
            const isOn = p.enabled;
            return (
              <Motion.div
                key={p.id}
                initial={{ y: 50, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.08 + i * 0.04, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1, scale: 1.02 }}
                onClick={() => toggle(p.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2 min-h-[230px] transition-all",
                  isOn ? "border-current" : "border-balatro-card-edge opacity-50 grayscale",
                )}
                style={{
                  color: isOn ? p.color : undefined,
                  boxShadow: isOn
                    ? `0 12px 0 #000, 0 18px 32px ${p.color}40`
                    : "0 6px 0 #000, 0 12px 24px rgba(0,0,0,0.5)",
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
                      isOn ? "bg-balatro-purple border-purple-900" : "border-balatro-card-edge bg-balatro-bg-deep",
                    )}
                  >
                    {isOn && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </div>

                <div
                  className="flex flex-col items-center justify-center gap-2 my-1 py-3 rounded-lg"
                  style={{
                    background: isOn ? `linear-gradient(180deg, ${p.color}25, ${p.color}08)` : "rgba(255,255,255,0.04)",
                    color: isOn ? p.color : "rgba(255,255,255,0.4)",
                  }}
                >
                  <PIcon size={32} strokeWidth={2.5} />
                  <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-center px-2 leading-tight"
                        style={{ color: isOn ? p.color : "rgba(255,255,255,0.6)" }}>
                    {p.label}
                  </span>
                </div>

                <p className="text-[11px] leading-snug text-balatro-text-dim text-center px-1 flex-1">
                  {p.description}
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
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            saved
              ? "bg-balatro-green text-white border-green-900"
              : "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.6)]",
          )}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><BookOpen size={18} /> Salvar Configuração</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
