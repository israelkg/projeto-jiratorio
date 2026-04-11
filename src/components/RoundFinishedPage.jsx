import { Home, UserCircle2, Trophy, Zap, Pencil, CheckCircle2, ChevronRight } from "lucide-react";

const DEMO_HISTORY = [
  {
    id: 1,
    actor: "FULANO 2",
    event: "acertou a pergunta e ganhou 1 ponto",
    type: "correct",
  },
  {
    id: 2,
    actor: "FULANO 2",
    event: 'usou o power-up "+ 30 segundos"',
    type: "powerup",
  },
  {
    id: 3,
    actor: "FULANO 3",
    event: "fez a pergunta como inquisitor para FULANO 2",
    type: "inquisitor",
  },
  {
    id: 4,
    actor: "FULANO 1",
    event: "errou a pergunta e perdeu a vez",
    type: "wrong",
  },
  {
    id: 5,
    actor: "FULANO 3",
    event: "ganhou 2 pontos de bônus pela rodada",
    type: "bonus",
  },
];

const EVENT_COLORS = {
  correct:    "#22c55e",
  powerup:    "#f59e0b",
  inquisitor: "#a78bfa",
  wrong:      "#ef4444",
  bonus:      "#38bdf8",
};

const ACTION_BUTTONS = [
  {
    id: "btn-ativar-powerup",
    label: "Ativar Power-Up",
    icon: Zap,
    gradient: "linear-gradient(135deg, #7c3aed, #6366f1)",
    shadow: "rgba(99,102,241,0.4)",
  },
  {
    id: "btn-editar-rodada",
    label: "Editar Rodada",
    icon: Pencil,
    gradient: "linear-gradient(135deg, #0369a1, #0ea5e9)",
    shadow: "rgba(14,165,233,0.4)",
  },
  {
    id: "btn-finalizar-revisao",
    label: "Finalizar Revisão",
    icon: CheckCircle2,
    gradient: "linear-gradient(135deg, #059669, #0d9488)",
    shadow: "rgba(5,150,105,0.4)",
  },
  {
    id: "btn-proxima-rodada",
    label: "Próxima Rodada",
    icon: ChevronRight,
    gradient: "linear-gradient(135deg, #0284c7, #0ea5e9)",
    shadow: "rgba(14,165,233,0.4)",
  },
];

export default function RoundFinishedPage({
  onHome,
  onActivatePowerUp,
  onEditRound,
  onFinishReview,
  onNextRound,
  history = DEMO_HISTORY,
  roundNumber = 20,
}) {
  const actions = [
    { ...ACTION_BUTTONS[0], handler: onActivatePowerUp },
    { ...ACTION_BUTTONS[1], handler: onEditRound },
    { ...ACTION_BUTTONS[2], handler: onFinishReview },
    { ...ACTION_BUTTONS[3], handler: onNextRound },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-56 h-56 rounded-full opacity-8 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-8 py-4"
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} /> Home
          </button>
          <button
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy size={22} style={{ color: "#f59e0b" }} />
          </div>
          <h1
            className="text-5xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #a78bfa 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            Rodada Finalizada
          </h1>

          {/* Round badge */}
          <div className="flex items-center justify-center">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(167,139,250,0.12)",
                border: "1px solid rgba(167,139,250,0.25)",
                color: "#a78bfa",
              }}
            >
              Rodada #{roundNumber}
            </span>
          </div>

          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
          />
        </div>

        {/* History card */}
        <div
          className="w-full max-w-2xl rounded-2xl flex flex-col overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Card header */}
          <div
            className="px-8 py-4 flex items-center justify-between"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span
              className="text-sm font-black tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Histórico
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {history.length} eventos
            </span>
          </div>

          {/* Scrollable event list */}
          <div
            className="flex flex-col divide-y overflow-y-auto"
            style={{
              maxHeight: "220px",
              divideColor: "rgba(255,255,255,0.05)",
            }}
          >
            {history.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-start gap-3 px-8 py-4 transition-colors duration-150"
                style={{
                  borderBottom:
                    idx < history.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  background: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* Color dot */}
                <div
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: EVENT_COLORS[item.type] ?? "#38bdf8" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span
                    className="font-black"
                    style={{ color: EVENT_COLORS[item.type] ?? "#38bdf8" }}
                  >
                    {item.actor}
                  </span>{" "}
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>—</span>{" "}
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons 2×2 grid */}
        <div className="w-full max-w-2xl grid grid-cols-2 gap-4">
          {actions.map(({ id, label, icon: Icon, gradient, shadow, handler }) => (
            <button
              key={id}
              id={id}
              onClick={handler}
              className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
              style={{
                background: gradient,
                color: "white",
                boxShadow: `0 10px 28px ${shadow}`,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 16px 36px ${shadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = `0 10px 28px ${shadow}`;
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
