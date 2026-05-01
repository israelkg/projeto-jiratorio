import { useEffect, useId, useRef } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { X, Zap, Eye, Shield, Clock, Shuffle, RefreshCw, SkipForward, Users, Hand } from "lucide-react";
import { useStudentsStore } from "@/features/students/store/studentsStore";
import { useRoundStore } from "../store/roundStore";
import { cn } from "@/lib/utils";

const POWERUPS = {
  inverter: { Icon: RefreshCw,    label: "Inverter Pergunta",  color: "#f0c040" },
  pular:    { Icon: SkipForward,  label: "Pular a Vez",        color: "#fe5f55" },
  dupla:    { Icon: Users,        label: "Resposta em Dupla",  color: "#009dff" },
  roubar:   { Icon: Hand,         label: "Roubar 1 Ponto",     color: "#9b59b6" },
  dica:     { Icon: Eye,          label: "Dica",               color: "#50c878" },
  tempo:    { Icon: Clock,        label: "+30 Segundos",       color: "#009dff" },
  escudo:   { Icon: Shield,       label: "Escudo",             color: "#50c878" },
  troca:    { Icon: Shuffle,      label: "Trocar Questão",     color: "#fe5f55" },
  dobro:    { Icon: Zap,          label: "Pontos em Dobro",    color: "#fe5f55" },
};

export function PowerUpModal({ open, onClose, onActivate }) {
  const students = useStudentsStore((s) => s.students);
  const consumePowerUp = useStudentsStore((s) => s.consumePowerUp);
  const addTime = useRoundStore((s) => s.addTime);
  const swapRoles = useRoundStore((s) => s.swapRoles);
  const titleId = useId();
  const closeBtnRef = useRef(null);

  const studentsWithPowerUps = students.filter((s) => s.inventory.length > 0);

  // ESC fecha + focus inicial no botão fechar
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleActivate = (studentId, powerUpId) => {
    consumePowerUp(studentId, powerUpId);
    if (powerUpId === "tempo") addTime(30);
    if (powerUpId === "inverter") swapRoles();
    onActivate?.(studentId, powerUpId);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <Motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-2xl rounded-2xl border-4 border-balatro-purple bg-balatro-card overflow-hidden"
            style={{ boxShadow: "0 18px 0 #000, 0 28px 60px rgba(155,89,182,0.5)" }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-balatro-card-edge bg-black/30">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-balatro-purple" />
                <span id={titleId} className="font-pixel text-[10px] tracking-[0.3em] text-balatro-purple text-glow-purple uppercase">
                  Ativar Power-Up
                </span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Fechar modal"
                className="text-balatro-text-dim hover:text-balatro-red transition-colors focus-visible:outline-2 focus-visible:outline-balatro-red"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {studentsWithPowerUps.length === 0 ? (
                <p className="text-center font-pixel text-[10px] tracking-[0.2em] text-balatro-text-dim uppercase py-8">
                  Nenhum aluno tem power-ups disponíveis
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {studentsWithPowerUps.map((student) => (
                    <div
                      key={student.id}
                      className="rounded-xl border-2 border-balatro-card-edge bg-balatro-bg-deep/60 p-3"
                    >
                      <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text mb-2">
                        {student.name}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {student.inventory.map((puId, i) => {
                          const cfg = POWERUPS[puId];
                          if (!cfg) return null;
                          const PIcon = cfg.Icon;
                          return (
                            <Motion.button
                              key={`${puId}-${i}`}
                              type="button"
                              whileHover={{ y: -3, scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleActivate(student.id, puId)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all",
                              )}
                              style={{
                                borderColor: cfg.color,
                                color: cfg.color,
                                background: `${cfg.color}15`,
                              }}
                            >
                              <PIcon size={14} />
                              <span className="font-pixel text-[9px] tracking-[0.15em] uppercase">
                                {cfg.label}
                              </span>
                            </Motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
