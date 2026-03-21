import { useState } from "react";
import {
  Home,
  UserCircle2,
  ChevronLeft,
  Check,
  Zap,
  RefreshCw,
  SkipForward,
  Users,
  Hand,
  Eye,
  Clock,
  Shuffle,
  Shield,
} from "lucide-react";

const POWERUPS = [
  {
    id: "inverter",
    icon: <RefreshCw size={32} strokeWidth={2.5} />,
    label: "Inverter Pergunta",
    desc: "Esta cartão permite que você devolva a pergunta para o jogador que o direcionou a você. Ele será obrigado a responder no seu lugar.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.45)",
  },
  {
    id: "pular",
    icon: <SkipForward size={32} strokeWidth={2.5} />,
    label: "Pular a Vez",
    desc: "Este cartão permite que você não responda a pergunta que recebeu, sem perder pontos. A pergunta deve ser repassada para outro jogador escolhido por você.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.45)",
  },
  {
    id: "dupla",
    icon: <Users size={32} strokeWidth={2.5} />,
    label: "Resposta em Dupla",
    desc: "Este cartão permite que você escolha uma pessoa para responder junto com você à pergunta. Se vocês acertarem, você ganha 1 ponto e a outra pessoa ganha 0.5 ponto.",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.45)",
  },
  {
    id: "roubar",
    icon: <Hand size={32} strokeWidth={2.5} />,
    label: "Roubar um Ponto",
    desc: "Este cartão permite que você retire 1 ponto de qualquer participante. O ponto é subtraído imediatamente da pontuação do participante escolhido.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.45)",
  },
  {
    id: "dica",
    icon: <Eye size={32} strokeWidth={2.5} />,
    label: "Dica",
    desc: "Revela uma pista da resposta antes de você responder, aumentando suas chances de acertar sem eliminate o desafio completamente.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.45)",
  },
  {
    id: "tempo",
    icon: <Clock size={32} strokeWidth={2.5} />,
    label: "Tempo Extra",
    desc: "Adiciona +15 segundos no cronômetro da rodada atual, dando mais tempo para você pensar na resposta correta.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.45)",
  },
  {
    id: "escudo",
    icon: <Shield size={32} strokeWidth={2.5} />,
    label: "Escudo",
    desc: "Protege você de perder pontos em caso de uma resposta errada nesta rodada. O escudo é consumido após o uso.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.45)",
  },
  {
    id: "troca",
    icon: <Shuffle size={32} strokeWidth={2.5} />,
    label: "Trocar Questão",
    desc: "Substitui a pergunta atual por uma nova pergunta aleatória do banco de questões, sem penalidade de pontos.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.45)",
  },
];

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}

export default function SelectPowerUpsPage({ onBack, onHome }) {
  const [enabled, setEnabled] = useState(
    new Set(["inverter", "dupla", "roubar", "dica"])
  );
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSaved(false);
    setEnabled((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-12 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-56 h-56 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #ef4444, transparent)",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-8 py-4 flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} /> Home
          </button>
          <button
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-8">
        {/* Title */}
        <div className="text-center space-y-2 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap size={22} style={{ color: "#fbbf24" }} />
          </div>
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background:
                "linear-gradient(135deg, #f8fafc 0%, #fcd34d 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Power-Ups
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#fbbf24" }}
          >
            Escolha os power-ups da partida &mdash;{" "}
            <span style={{ color: "#f97316" }}>{enabled.size} ativos</span>
          </p>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)" }}
          />
        </div>

        {/* Cards grid */}
        <div
          className="w-full max-w-4xl grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          }}
        >
          {POWERUPS.map((p) => {
            const active = enabled.has(p.id);
            return (
              <PowerUpCard
                key={p.id}
                powerup={p}
                active={active}
                onToggle={() => toggle(p.id)}
              />
            );
          })}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={enabled.size === 0}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3 flex-shrink-0"
          style={{
            background: saved
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : enabled.size === 0
              ? "rgba(255,255,255,0.06)"
              : "linear-gradient(135deg, #d97706, #f59e0b)",
            color: enabled.size === 0 ? "rgba(255,255,255,0.2)" : "white",
            boxShadow: saved
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : enabled.size === 0
              ? "none"
              : "0 12px 32px rgba(217,119,6,0.4)",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: enabled.size === 0 ? "not-allowed" : "pointer",
          }}
        >
          {saved ? (
            <>
              <Check size={18} /> Salvo!
            </>
          ) : (
            <>
              <Zap size={18} /> Salvar
            </>
          )}
        </button>
      </main>
    </div>
  );
}

function PowerUpCard({ powerup, active, onToggle }) {
  const { icon, label, desc, color, glow } = powerup;
  const rgb = hexRgb(color);

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 cursor-pointer transition-all duration-300 select-none"
      onClick={onToggle}
      style={{
        background: active
          ? `rgba(${rgb},0.1)`
          : "rgba(255,255,255,0.03)",
        border: active
          ? `1px solid rgba(${rgb},0.4)`
          : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        boxShadow: active ? `0 8px 32px rgba(${rgb},0.2)` : "none",
        transform: active ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: active ? `rgba(${rgb},0.2)` : "rgba(255,255,255,0.06)",
          color: active ? color : "rgba(255,255,255,0.3)",
          border: active ? `1px solid rgba(${rgb},0.35)` : "1px solid rgba(255,255,255,0.08)",
          boxShadow: active ? `0 0 20px rgba(${rgb},0.3)` : "none",
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <div>
        <p
          className="text-xs font-black tracking-widest uppercase leading-tight"
          style={{ color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}
        >
          {label}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-[11px] leading-relaxed flex-1"
        style={{ color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
      >
        {desc}
      </p>

      {/* Checkbox */}
      <div className="flex justify-center pt-1">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
          style={{
            background: active
              ? `linear-gradient(135deg, ${color}, rgba(${rgb},0.7))`
              : "rgba(255,255,255,0.06)",
            border: active
              ? `1px solid rgba(${rgb},0.6)`
              : "1px solid rgba(255,255,255,0.15)",
            boxShadow: active ? `0 0 12px rgba(${rgb},0.5)` : "none",
          }}
        >
          {active && <Check size={13} color="white" strokeWidth={3} />}
        </div>
      </div>
    </div>
  );
}
