import { useEffect, useState } from "react";
import { motion as Motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Home, UserCircle2, Upload, Users, User, Sparkles,
  ListOrdered, Zap, Package, HelpCircle, LayoutList,
  PlayCircle, ChevronRight, Spade, AlertTriangle, Bot, Loader2, Square,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { fetchMatchConfig, updateMatchConfig } from "@/features/match-config/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { useTestBots } from "@/features/student/useTestBots";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "import-setup",    icon: Upload,      label: "Importar Material e Alunos", suit: "♠", color: "balatro-blue",   to: "/import-setup" },
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const activeSession = useActiveSessionStore((s) => s.sessionId);
  const sessionName = useActiveSessionStore((s) => s.sessionName);
  const joinCode = useActiveSessionStore((s) => s.joinCode);
  const students = useActiveSessionStore((s) => s.students);
  const bots = useTestBots();

  const toggleBots = () => {
    if (bots.active) {
      bots.stop();
    } else {
      bots.start(joinCode, students.map((s) => s.name));
    }
  };

  useEffect(() => {
    fetchMatchConfig()
      .then((cfg) => setMode(cfg.mode ?? "individual"))
      .catch(() => {});
  }, []);

  const handleModeChange = async (next) => {
    if (next === mode) return;
    setMode(next);
    setSaving(true);
    setError(null);
    try {
      await updateMatchConfig({ mode: next });
    } catch (err) {
      setError(err.message ?? "Falha ao salvar modo");
    } finally {
      setSaving(false);
    }
  };

  const handleStart = () => {
    if (!activeSession) {
      setError("Carregue ou crie uma sessão antes de iniciar (Carregar Sessão na Home).");
      return;
    }
    navigate(mode === "dupla" ? "/duo-mode" : "/sort-draw");
  };

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
          {sessionName && (
            <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-green uppercase">
              ◆ Sessão ativa: {sessionName} ◆
            </p>
          )}
          {joinCode && (
            <div className="mt-2 flex flex-col items-center gap-3">
              <div className="inline-flex flex-col items-center gap-1 rounded-xl border-2 border-balatro-blue bg-balatro-blue/10 px-6 py-3">
                <span className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
                  Código da turma (alunos entram com ele)
                </span>
                <span className="font-pixel text-3xl tracking-[0.4em] text-balatro-blue text-glow-blue">
                  {joinCode}
                </span>
              </div>

              {/* Alunos de teste: entram e respondem sozinhos (para demonstração). */}
              <button
                onClick={toggleBots}
                disabled={bots.starting || students.length === 0}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-pixel text-[9px] tracking-[0.2em] uppercase transition-colors disabled:opacity-50",
                  bots.active
                    ? "border-balatro-red bg-balatro-red/15 text-balatro-red hover:bg-balatro-red/25"
                    : "border-balatro-green bg-balatro-green/15 text-balatro-green hover:bg-balatro-green/25",
                )}
              >
                {bots.starting
                  ? <><Loader2 size={12} className="animate-spin" /> Ativando...</>
                  : bots.active
                    ? <><Square size={12} /> Parar Alunos de Teste ({bots.count})</>
                    : <><Bot size={12} /> Ativar Alunos de Teste</>}
              </button>
              {bots.active && bots.lastAction && (
                <p className="font-pixel text-[8px] tracking-[0.15em] text-balatro-text-dim uppercase">
                  ▸ {bots.lastAction}
                </p>
              )}
            </div>
          )}
        </Motion.div>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-lg rounded-2xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md overflow-hidden"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(0,0,0,0.7)" }}
        >
          <div className="grid grid-cols-2 border-b-2 border-balatro-card-edge">
            <ModeButton active={mode === "individual"} icon={<User size={14} />} label="Individual" onClick={() => handleModeChange("individual")} disabled={saving} />
            <ModeButton active={mode === "dupla"}      icon={<Users size={14} />} label="Em Dupla"   onClick={() => handleModeChange("dupla")} disabled={saving} />
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

        {error && (
          <div className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        <BalatroButton
          variant="red"
          onClick={handleStart}
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

function ModeButton({ active, icon, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 py-4 font-pixel text-[10px] tracking-[0.25em] uppercase transition-all border-b-2 disabled:opacity-50",
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
