import { useEffect, useId, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { X, Zap, Eye, Shield, Clock, Shuffle, RefreshCw, SkipForward, Users, Hand, Loader2 } from "lucide-react";
import { useRoundStore } from "../store/roundStore";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { useRoundFlowStore } from "@/features/rounds/store/roundFlowStore";
import { getSession } from "@/features/sessions/api";
import { usePowerup as activatePowerupApi } from "@/features/rounds/api";

const POWERUPS = {
  inverter: { Icon: RefreshCw,   label: "Inverter Pergunta",  color: "#f0c040" },
  pular:    { Icon: SkipForward, label: "Pular a Vez",        color: "#fe5f55" },
  dupla:    { Icon: Users,       label: "Resposta em Dupla",  color: "#009dff" },
  roubar:   { Icon: Hand,        label: "Roubar 1 Ponto",     color: "#9b59b6" },
  dica:     { Icon: Eye,         label: "Dica",               color: "#50c878" },
  tempo:    { Icon: Clock,       label: "+30 Segundos",       color: "#009dff" },
  escudo:   { Icon: Shield,      label: "Escudo",             color: "#50c878" },
  troca:    { Icon: Shuffle,     label: "Trocar Questão",     color: "#fe5f55" },
  dobro:    { Icon: Zap,         label: "Pontos em Dobro",    color: "#fe5f55" },
};

const EFFECT_NOTE = {
  escudo: "Erro nesta rodada não tira ponto.",
  dobro: "Próximo acerto vale o dobro.",
  tempo: "Adiciona 30s no cronômetro.",
  roubar: "Tira 1 ponto de outro aluno.",
};

export function PowerUpModal({ open, onClose }) {
  const sessionId = useActiveSessionStore((s) => s.sessionId);
  const roundId = useRoundFlowStore((s) => s.currentRoundId);
  const addTime = useRoundStore((s) => s.addTime);
  const swapRoles = useRoundStore((s) => s.swapRoles);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [stealFor, setStealFor] = useState(null); // {studentId} aguardando alvo

  const titleId = useId();
  const closeBtnRef = useRef(null);

  const refresh = () => {
    if (!sessionId) return;
    setLoading(true);
    getSession(sessionId)
      .then((d) => setStudents(d.students ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!open) return undefined;
    setError(null); setFeedback(null); setStealFor(null);
    refresh();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sessionId]);

  const withPowerUps = students.filter((s) => (s.inventory ?? []).length > 0);

  const activate = async (studentId, card, targetStudentId) => {
    if (!sessionId || !roundId) {
      setError("Inicie uma rodada para usar power-ups.");
      return;
    }
    if (card === "roubar" && !targetStudentId) {
      setStealFor({ studentId });
      return;
    }
    setBusy(true); setError(null);
    try {
      const res = await activatePowerupApi(sessionId, roundId, { studentId, card, targetStudentId });
      if (card === "tempo") addTime(30);
      if (card === "inverter") swapRoles();
      const who = students.find((s) => s.id === studentId)?.name ?? "Aluno";
      setFeedback(`${who} usou ${POWERUPS[card]?.label ?? card}${res.amount ? ` (+${res.amount})` : ""}`);
      setStealFor(null);
      refresh();
    } catch (err) {
      setError(err.message ?? "Falha ao usar power-up");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <Motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-labelledby={titleId}
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
              <button ref={closeBtnRef} onClick={onClose} aria-label="Fechar modal"
                className="text-balatro-text-dim hover:text-balatro-red transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto flex flex-col gap-3">
              {feedback && <p className="font-pixel text-[9px] tracking-[0.2em] text-balatro-green uppercase">✓ {feedback}</p>}
              {error && <p className="font-pixel text-[9px] tracking-[0.2em] text-balatro-red uppercase">✗ {error}</p>}

              {loading ? (
                <p className="text-center font-pixel text-[10px] tracking-[0.2em] text-balatro-text-dim uppercase py-8 flex items-center justify-center gap-2">
                  <Loader2 size={12} className="animate-spin" /> Carregando...
                </p>
              ) : stealFor ? (
                <div className="flex flex-col gap-2">
                  <p className="font-pixel text-[9px] tracking-[0.2em] text-balatro-purple uppercase">Roubar ponto de quem?</p>
                  {students.filter((s) => s.id !== stealFor.studentId).map((t) => (
                    <button key={t.id} disabled={busy}
                      onClick={() => activate(stealFor.studentId, "roubar", t.id)}
                      className="rounded-lg border-2 border-balatro-card-edge bg-balatro-bg-deep px-4 py-2 text-left text-sm text-balatro-text hover:border-balatro-purple disabled:opacity-50 flex justify-between">
                      <span>{t.name}</span><span className="text-balatro-text-dim">{t.points} pts</span>
                    </button>
                  ))}
                  <button onClick={() => setStealFor(null)} className="font-pixel text-[8px] tracking-[0.2em] text-balatro-text-dim uppercase mt-1">Cancelar</button>
                </div>
              ) : withPowerUps.length === 0 ? (
                <p className="text-center font-pixel text-[10px] tracking-[0.2em] text-balatro-text-dim uppercase py-8">
                  Nenhum aluno tem power-ups. Eles são ganhos ao acertar perguntas.
                </p>
              ) : (
                withPowerUps.map((student) => (
                  <div key={student.id} className="rounded-xl border-2 border-balatro-card-edge bg-balatro-bg-deep/60 p-3">
                    <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text mb-2">{student.name}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {student.inventory.map((puId, i) => {
                        const cfg = POWERUPS[puId];
                        if (!cfg) return null;
                        const PIcon = cfg.Icon;
                        return (
                          <Motion.button
                            key={`${puId}-${i}`} type="button" disabled={busy}
                            whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={() => activate(student.id, puId)}
                            title={EFFECT_NOTE[puId] ?? ""}
                            className="flex flex-col items-start gap-1 px-3 py-2 rounded-lg border-2 transition-all disabled:opacity-50"
                            style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
                          >
                            <span className="flex items-center gap-2">
                              <PIcon size={14} />
                              <span className="font-pixel text-[9px] tracking-[0.15em] uppercase">{cfg.label}</span>
                            </span>
                            {EFFECT_NOTE[puId] && (
                              <span className="text-[9px] text-balatro-text-dim normal-case text-left leading-tight">{EFFECT_NOTE[puId]}</span>
                            )}
                          </Motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
