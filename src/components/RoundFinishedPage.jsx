import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, Trophy, Zap, Pencil, CheckCircle2,
  ChevronRight, CheckCircle, XCircle, Volume2, Sparkles, Star,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

import { cn } from "@/lib/utils";

const DEMO_HISTORY = [
  { id: 1, actor: "FULANO 2", event: "acertou a pergunta e ganhou 1 ponto",         type: "correct" },
  { id: 2, actor: "FULANO 2", event: 'usou o power-up "+ 30 segundos"',              type: "powerup" },
  { id: 3, actor: "FULANO 3", event: "fez a pergunta como inquisitor para FULANO 2", type: "inquisitor" },
  { id: 4, actor: "FULANO 1", event: "errou a pergunta e perdeu a vez",              type: "wrong" },
  { id: 5, actor: "FULANO 3", event: "ganhou 2 pontos de bônus pela rodada",         type: "bonus" },
];

const EVENT_STYLE = {
  correct:    { color: "#50c878", Icon: CheckCircle, label: "ACERTO" },
  wrong:      { color: "#fe5f55", Icon: XCircle,     label: "ERRO" },
  powerup:    { color: "#f0c040", Icon: Zap,         label: "POWER-UP" },
  inquisitor: { color: "#9b59b6", Icon: Volume2,     label: "INQUISITOR" },
  bonus:      { color: "#009dff", Icon: Star,        label: "BÔNUS" },
};

const ACTIONS = [
  { id: "powerup",  label: "Ativar Power-Up",   Icon: Zap,           variant: "purple", route: null },
  { id: "edit",     label: "Editar Rodada",     Icon: Pencil,        variant: "blue",   route: "/edit-question" },
  { id: "finish",   label: "Finalizar Revisão", Icon: CheckCircle2,  variant: "green",  route: "/dashboard" },
  { id: "next",     label: "Próxima Rodada",    Icon: ChevronRight,  variant: "red",    route: "/sort-draw" },
];

const VARIANT_STYLES = {
  purple: "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.5)]",
  blue:   "bg-balatro-blue   text-white border-blue-950   hover:shadow-balatro-glow-blue",
  green:  "bg-balatro-green  text-white border-green-900",
  red:    "bg-balatro-red    text-white border-red-950    hover:shadow-balatro-glow-red",
};

export default function RoundFinishedPage({
  history = DEMO_HISTORY,
  roundNumber = 20,
}) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Round End · {String(roundNumber).padStart(2, "0")}
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <Trophy size={14} /> Round Finished <Trophy size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.6))" }}>
            RODADA #{String(roundNumber).padStart(2, "0")}
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {history.length} eventos registrados ◆
          </p>
        </Motion.div>

        {/* History card */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl rounded-2xl border-4 border-balatro-purple bg-balatro-card overflow-hidden"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(155,89,182,0.3)" }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-balatro-card-edge bg-black/30">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-balatro-purple" />
              <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-purple text-glow-purple uppercase">
                Histórico
              </span>
            </div>
            <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-text-dim uppercase">
              {history.length} eventos
            </span>
          </div>

          <div className="flex flex-col max-h-[280px] overflow-y-auto">
            {history.map((item, idx) => {
              const cfg = EVENT_STYLE[item.type] ?? EVENT_STYLE.bonus;
              const EventIcon = cfg.Icon;
              return (
                <Motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.08 }}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors",
                    idx < history.length - 1 && "border-b border-balatro-card-edge/40",
                  )}
                >
                  <div
                    className="w-9 h-9 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
                  >
                    <EventIcon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded"
                        style={{ color: cfg.color, background: `${cfg.color}20` }}
                      >
                        {cfg.label}
                      </span>
                      <span
                        className="font-pixel text-[10px] tracking-[0.15em] uppercase"
                        style={{ color: cfg.color, textShadow: `0 0 8px ${cfg.color}` }}
                      >
                        {item.actor}
                      </span>
                    </div>
                    <p className="text-[13px] text-balatro-text-dim leading-snug mt-0.5">
                      {item.event}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>

        {/* Action buttons */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-2xl grid grid-cols-2 gap-4"
        >
          {ACTIONS.map((action) => {
            const ActionIcon = action.Icon;
            return (
              <Motion.button
                key={action.id}
                onClick={() => action.route && navigate(action.route)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 2, scale: 0.98 }}
                className={cn(
                  "flex items-center justify-center gap-3 py-4 rounded-2xl font-pixel text-[11px] tracking-[0.25em] uppercase border-b-4",
                  VARIANT_STYLES[action.variant],
                )}
              >
                <ActionIcon size={16} />
                {action.label}
              </Motion.button>
            );
          })}
        </Motion.div>
      </main>
    </CRTFrame>
  );
}
