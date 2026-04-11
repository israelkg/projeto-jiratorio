import { useState } from "react";
import {
  Home,
  UserCircle2,
  RotateCcw,
  ChevronsRight,
  Users,
  Grab,
  Clock,
  Eye,
  Shuffle,
  Zap,
  Shield,
  Check,
} from "lucide-react";

const POWERUPS = [
  {
    id: "inverter",
    icon: RotateCcw,
    label: "Inverter Pergunta",
    description:
      "Este cartão permite que você devolva a pergunta para a pessoa que a direcionou a você. Ela será obrigada a responder no seu lugar.",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.35)",
    enabled: true,
  },
  {
    id: "pular",
    icon: ChevronsRight,
    label: "Pular a Vez",
    description:
      "Este cartão permite que você não responda à pergunta que recebeu, sem perder pontos. A pergunta deve ser repassada para outra pessoa escolhida por você.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    enabled: false,
  },
  {
    id: "dupla",
    icon: Users,
    label: "Resposta em Dupla",
    description:
      "Este cartão permite que você escolha uma pessoa para responder junto com você à pergunta. Se vocês acertarem, você ganha 1 ponto e a outra pessoa ganha 0,5 ponto.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    enabled: true,
  },
  {
    id: "roubar",
    icon: Grab,
    label: "Roubar um Ponto",
    description:
      "Este cartão permite que você retire 1 ponto de qualquer participante. O ponto é subtraído imediatamente da pontuação escolhida.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.35)",
    enabled: true,
  },
  {
    id: "tempo",
    icon: Clock,
    label: "+ 30 Segundos",
    description:
      "Este cartão concede 30 segundos extras ao tempo disponível para responder a pergunta da rodada. Só pode ser usado uma vez por rodada.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
    enabled: true,
  },
  {
    id: "dica",
    icon: Eye,
    label: "Ver Dica",
    description:
      "Este cartão revela uma pista sobre a resposta correta da pergunta, sem exibir a resposta completa. Não garante o acerto, mas ajuda.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.35)",
    enabled: false,
  },
  {
    id: "dobro",
    icon: Zap,
    label: "Pontos em Dobro",
    description:
      "Se você acertar a pergunta após ativar este power-up, os pontos ganhos são multiplicados por 2. O risco também é maior se errar.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.35)",
    enabled: true,
  },
  {
    id: "escudo",
    icon: Shield,
    label: "Escudo",
    description:
      "Protege você de perder pontos em caso de erro nesta rodada. O escudo é consumido após o uso e não pode ser acumulado.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    enabled: false,
  },
  {
    id: "troca",
    icon: Shuffle,
    label: "Trocar Questão",
    description:
      "Substitui a pergunta atual por uma nova, sorteada aleatoriamente do banco de questões. A pergunta descartada não retorna à rodada.",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
    enabled: true,
  },
];

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}

export default function PowerUpsExplainPage({ onHome, onBack, onSave }) {
  const [items, setItems] = useState(POWERUPS);
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSaved(false);
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onSave) onSave(items.filter((p) => p.enabled).map((p) => p.id));
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-12 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/3 left-0 w-56 h-56 rounded-full opacity-8 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
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
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-8 min-h-0">

        {/* Title */}
        <div className="text-center space-y-3 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap size={22} style={{ color: "#f59e0b" }} />
          </div>
          <h1
            className="text-5xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            Power-Ups
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#fbbf24" }}
          >
            Ative os power-ups disponíveis na partida
          </p>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #f59e0b, #f97316)" }}
          />
        </div>

        {/* Horizontal scrollable cards */}
        <div
          className="w-full flex-1 flex flex-col min-h-0"
          style={{ overflow: "hidden" }}
        >
          <div
            className="flex gap-5 pb-4 px-1"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(245,158,11,0.4) rgba(255,255,255,0.05)",
              height: "100%",
              alignItems: "stretch",
            }}
          >
            {items.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="flex-shrink-0 flex flex-col rounded-2xl transition-all duration-300"
                  style={{
                    width: "200px",
                    minHeight: "300px",
                    background: p.enabled
                      ? `rgba(${hexRgb(p.color)},0.07)`
                      : "rgba(255,255,255,0.04)",
                    border: p.enabled
                      ? `1px solid rgba(${hexRgb(p.color)},0.3)`
                      : "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    boxShadow: p.enabled
                      ? `0 8px 32px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                      : "0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Icon area */}
                  <div
                    className="flex items-center justify-center rounded-t-2xl py-8"
                    style={{
                      background: p.enabled
                        ? `rgba(${hexRgb(p.color)},0.1)`
                        : "rgba(255,255,255,0.03)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Icon
                      size={52}
                      strokeWidth={1.5}
                      style={{
                        color: p.enabled ? p.color : "rgba(255,255,255,0.25)",
                        filter: p.enabled ? `drop-shadow(0 0 12px ${p.glow})` : "none",
                        transition: "all 0.3s",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 px-5 py-5 gap-3">
                    <h3
                      className="text-xs font-black tracking-widest uppercase text-center leading-tight"
                      style={{
                        color: p.enabled ? p.color : "rgba(255,255,255,0.5)",
                        transition: "color 0.3s",
                      }}
                    >
                      {p.label}
                    </h3>

                    <p
                      className="text-[11px] leading-relaxed text-center flex-1"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {p.description}
                    </p>

                    {/* Checkbox toggle */}
                    <div className="flex items-center justify-center pt-2">
                      <button
                        id={`toggle-${p.id}`}
                        onClick={() => toggle(p.id)}
                        className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300"
                        style={{
                          background: p.enabled
                            ? p.color
                            : "rgba(255,255,255,0.07)",
                          border: p.enabled
                            ? `2px solid ${p.color}`
                            : "2px solid rgba(255,255,255,0.2)",
                          boxShadow: p.enabled ? `0 0 16px ${p.glow}` : "none",
                        }}
                        aria-label={p.enabled ? "Desativar" : "Ativar"}
                      >
                        {p.enabled && <Check size={14} color="#fff" strokeWidth={3} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badge: quantidade ativa */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              color: "#f59e0b",
            }}
          >
            {items.filter((p) => p.enabled).length} de {items.length} ativos
          </span>
        </div>

        {/* Save button */}
        <button
          id="btn-salvar-powerups"
          onClick={handleSave}
          className="flex items-center gap-3 px-16 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex-shrink-0"
          style={{
            background: saved
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : "linear-gradient(135deg, #d97706, #f59e0b)",
            color: saved ? "white" : "#1a1a2e",
            boxShadow: saved
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : "0 12px 32px rgba(245,158,11,0.4)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          onMouseEnter={(e) => {
            if (!saved) e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          {saved ? (
            <><Check size={18} /> Salvo!</>
          ) : (
            <><Zap size={18} /> Salvar</>
          )}
        </button>
      </main>
    </div>
  );
}
