import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Package, Check, Clock, Layers, Power, Loader2, Sparkles,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { fetchMatchConfig, updateMatchConfig } from "@/features/match-config/api";
import { cn } from "@/lib/utils";

const MAX_OPTIONS = [2, 3, 4, 5, 6];

export default function InventoryPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [startWithCards, setStartWithCards] = useState(false);
  const [initialCount, setInitialCount] = useState(0);
  const [maxCards, setMaxCards] = useState(4);
  const [timeLimit, setTimeLimit] = useState(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchMatchConfig()
      .then((data) => {
        if (cancelled) return;
        setStartWithCards(Boolean(data.start_with_powerups));
        setInitialCount(data.initial_count ?? 0);
        setMaxCards(data.max_count ?? 4);
        setTimeLimit(data.answer_time_seconds ?? 30);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Falha ao carregar configuração");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const markDirty = () => {
    setSaved(false);
    setError(null);
  };

  const handleToggle = (v) => {
    markDirty();
    setStartWithCards(v);
    if (!v) setInitialCount(0);
  };

  const handleMaxChange = (n) => {
    markDirty();
    setMaxCards(n);
    if (initialCount > n) setInitialCount(n);
  };

  const handleInitialChange = (n) => {
    markDirty();
    setInitialCount(Math.min(Math.max(0, n), maxCards));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateMatchConfig({
        start_with_powerups: startWithCards,
        initial_count: startWithCards ? initialCount : 0,
        max_count: maxCards,
        answer_time_seconds: timeLimit,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      const details = Array.isArray(err.details) ? err.details.join(" · ") : null;
      setError(details ?? err.message ?? "Falha ao salvar");
    } finally {
      setSaving(false);
    }
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
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Joker Slots Setup
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
            <Package size={14} /> Joker Slots <Package size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            INVENTÁRIO INICIAL
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Configure os slots de power-ups dos alunos
          </p>
        </Motion.div>

        {loading ? (
          <div className="font-pixel text-[10px] tracking-[0.4em] text-balatro-text-dim uppercase animate-pulse flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Carregando configuração
          </div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col gap-4">
            <Motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
              style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border-2 border-balatro-purple bg-balatro-purple/15 flex items-center justify-center text-balatro-purple">
                    <Power size={18} />
                  </div>
                  <div>
                    <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">Iniciar com Cartas</p>
                    <p className="text-[11px] text-balatro-text-dim">Alunos começam a sessão com power-ups</p>
                  </div>
                </div>
                <Toggle value={startWithCards} onChange={handleToggle} />
              </div>
            </Motion.div>

            {startWithCards && (
              <Motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.125 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg border-2 border-balatro-green bg-balatro-green/15 flex items-center justify-center text-balatro-green">
                    <Sparkles size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">Quantidade Inicial (X)</p>
                    <p className="text-[11px] text-balatro-text-dim">Cartas que cada aluno recebe ao começar</p>
                  </div>
                  <span className="font-pixel text-2xl text-balatro-green tabular-nums">{initialCount}</span>
                </div>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${maxCards + 1}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: maxCards + 1 }, (_, n) => {
                    const active = n === initialCount;
                    return (
                      <button
                        key={n}
                        onClick={() => handleInitialChange(n)}
                        className={cn(
                          "py-3 rounded-lg border-2 font-pixel text-base transition-all",
                          active
                            ? "border-balatro-green bg-balatro-green/20 text-balatro-green"
                            : "border-balatro-card-edge bg-balatro-bg-deep text-balatro-text-dim hover:border-balatro-green/50",
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </Motion.div>
            )}

            <Motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
              style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg border-2 border-balatro-blue bg-balatro-blue/15 flex items-center justify-center text-balatro-blue">
                  <Layers size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">Limite Máximo (Y)</p>
                  <p className="text-[11px] text-balatro-text-dim">Quantos power-ups cada aluno pode ter</p>
                </div>
                <span className="font-pixel text-2xl text-balatro-blue text-glow-blue tabular-nums">{maxCards}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {MAX_OPTIONS.map((n) => {
                  const active = n === maxCards;
                  return (
                    <button
                      key={n}
                      onClick={() => handleMaxChange(n)}
                      className={cn(
                        "py-3 rounded-lg border-2 font-pixel text-base transition-all",
                        active
                          ? "border-balatro-blue bg-balatro-blue/20 text-balatro-blue text-glow-blue"
                          : "border-balatro-card-edge bg-balatro-bg-deep text-balatro-text-dim hover:border-balatro-blue/50",
                      )}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </Motion.div>

            <Motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-5"
              style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg border-2 border-balatro-gold bg-balatro-gold/15 flex items-center justify-center text-balatro-gold">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text">Tempo de Resposta</p>
                  <p className="text-[11px] text-balatro-text-dim">Segundos por pergunta (padrão 30s)</p>
                </div>
                <span className="font-pixel text-2xl text-balatro-gold text-glow-gold tabular-nums">{timeLimit}s</span>
              </div>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={timeLimit}
                onChange={(e) => { markDirty(); setTimeLimit(Number(e.target.value)); }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: "#f0c040",
                  background: `linear-gradient(to right, #f0c040 ${(timeLimit - 10) / 1.1}%, rgba(255,255,255,0.08) ${(timeLimit - 10) / 1.1}%)`,
                }}
              />
              <div className="flex justify-between mt-1.5 font-pixel text-[8px] tracking-widest text-balatro-text-dim">
                <span>10s</span>
                <span>120s</span>
              </div>
            </Motion.div>
          </div>
        )}

        {error && (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase text-center">
            ✗ {error}
          </p>
        )}

        <BalatroButton
          onClick={handleSave}
          disabled={loading || saving}
          variant={saved ? "green" : "purple"}
        >
          {saving ? (
            <><Loader2 size={18} className="animate-spin" /> Salvando...</>
          ) : saved ? (
            <><Check size={18} /> Salvo!</>
          ) : (
            <><Package size={18} /> Salvar Inventário</>
          )}
        </BalatroButton>
      </main>
    </CRTFrame>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative w-14 h-7 rounded-full border-2 transition-colors",
        value ? "bg-balatro-purple border-purple-900" : "bg-balatro-bg-deep border-balatro-card-edge",
      )}
    >
      <Motion.span
        animate={{ x: value ? 28 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-md"
      />
    </button>
  );
}
