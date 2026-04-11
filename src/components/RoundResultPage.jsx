import { useState, useEffect } from "react";
import { Home, UserCircle2, Star, TrendingUp, Award, ChevronRight, RotateCcw } from "lucide-react";

const DEMO_PLAYERS = [
  { id: 1, name: "FULANO 1", totalPoints: 14, roundPoints: 3, avatar: "F1", trend: "up" },
  { id: 2, name: "FULANO 2", totalPoints: 11, roundPoints: 1, avatar: "F2", trend: "down" },
  { id: 3, name: "FULANO 3", totalPoints: 9,  roundPoints: 2, avatar: "F3", trend: "up" },
  { id: 4, name: "FULANO 4", totalPoints: 7,  roundPoints: 0, avatar: "F4", trend: "same" },
  { id: 5, name: "FULANO 5", totalPoints: 4,  roundPoints: 1, avatar: "F5", trend: "up" },
];

const PODIUM_COLORS = [
  { bg: "linear-gradient(135deg, #f59e0b, #fbbf24)", shadow: "rgba(245,158,11,0.5)", label: "#fef3c7", ring: "#f59e0b" },
  { bg: "linear-gradient(135deg, #94a3b8, #cbd5e1)",  shadow: "rgba(148,163,184,0.5)", label: "#f1f5f9", ring: "#94a3b8" },
  { bg: "linear-gradient(135deg, #b45309, #d97706)",  shadow: "rgba(180,83,9,0.5)",    label: "#fef3c7", ring: "#b45309" },
];

const PODIUM_ORDER = [1, 0, 2]; // visual order: 2nd, 1st, 3rd

const TREND_ICON = {
  up:   { symbol: "▲", color: "#22c55e" },
  down: { symbol: "▼", color: "#ef4444" },
  same: { symbol: "—", color: "rgba(255,255,255,0.3)" },
};

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display}</>;
}

export default function RoundResultPage({
  onHome,
  onNextRound,
  onReplayRound,
  players = DEMO_PLAYERS,
  roundNumber = 20,
}) {
  const sorted = [...players].sort((a, b) => b.totalPoints - a.totalPoints);
  const top3   = sorted.slice(0, 3);
  const rest   = sorted.slice(3);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)", animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full opacity-8 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", animationDelay: "3s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-8 overflow-y-auto">

        {/* Title */}
        <div className="text-center space-y-3 w-full">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award size={22} style={{ color: "#f59e0b" }} />
          </div>
          <h1
            className="text-5xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 50%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            Resultado da Rodada
          </h1>
          <div className="flex items-center justify-center">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#f59e0b",
              }}
            >
              Rodada #{roundNumber}
            </span>
          </div>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #f59e0b, #d97706)" }}
          />
        </div>

        {/* ── Podium ── */}
        <div className="w-full max-w-2xl flex items-end justify-center gap-4">
          {PODIUM_ORDER.map((rankIndex) => {
            const player  = top3[rankIndex];
            const rank    = rankIndex + 1;
            const palette = PODIUM_COLORS[rankIndex];
            const heights = ["h-28", "h-36", "h-20"]; // 2nd, 1st, 3rd
            if (!player) return null;

            return (
              <div key={player.id} className="flex flex-col items-center gap-2 flex-1">
                {/* Crown for 1st */}
                {rank === 1 && (
                  <Star
                    size={22}
                    fill="#f59e0b"
                    style={{ color: "#f59e0b", filter: "drop-shadow(0 0 8px #f59e0b)" }}
                  />
                )}

                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black border-2"
                  style={{
                    background: palette.bg,
                    borderColor: palette.ring,
                    boxShadow: `0 0 20px ${palette.shadow}`,
                    color: "#1a1a2e",
                  }}
                >
                  {player.avatar}
                </div>

                {/* Name + points */}
                <div className="text-center">
                  <div
                    className="text-xs font-black tracking-widest uppercase truncate max-w-[90px]"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {player.name}
                  </div>
                  <div className="text-xl font-black" style={{ color: palette.ring }}>
                    <AnimatedNumber value={player.totalPoints} />
                    <span className="text-xs font-semibold ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>pts</span>
                  </div>
                </div>

                {/* Podium block */}
                <div
                  className={`w-full ${heights[rankIndex]} rounded-t-xl flex items-center justify-center text-3xl font-black`}
                  style={{
                    background: palette.bg,
                    boxShadow: `0 -4px 24px ${palette.shadow}`,
                    color: "#1a1a2e",
                  }}
                >
                  {rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Full leaderboard ── */}
        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="grid px-6 py-3"
            style={{
              gridTemplateColumns: "2rem 1fr 5rem 5rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {["#", "Jogador", "Rodada", "Total"].map((h) => (
              <span
                key={h}
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((player, idx) => {
            const trend = TREND_ICON[player.trend] ?? TREND_ICON.same;
            const isTop3 = idx < 3;
            return (
              <div
                key={player.id}
                className="grid items-center px-6 py-4 transition-colors duration-150"
                style={{
                  gridTemplateColumns: "2rem 1fr 5rem 5rem",
                  borderBottom: idx < sorted.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Rank */}
                <span
                  className="text-sm font-black"
                  style={{ color: isTop3 ? PODIUM_COLORS[idx].ring : "rgba(255,255,255,0.3)" }}
                >
                  {idx + 1}
                </span>

                {/* Player name + trend */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: isTop3
                        ? PODIUM_COLORS[idx].bg
                        : "rgba(255,255,255,0.08)",
                      color: isTop3 ? "#1a1a2e" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {player.avatar}
                  </div>
                  <span
                    className="text-sm font-bold truncate"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {player.name}
                  </span>
                  <TrendingUp
                    size={12}
                    style={{ color: trend.color, flexShrink: 0 }}
                  />
                </div>

                {/* Round points */}
                <div className="flex items-center gap-1">
                  <span
                    className="text-sm font-black"
                    style={{
                      color: player.roundPoints > 0 ? "#22c55e" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {player.roundPoints > 0 ? `+${player.roundPoints}` : "—"}
                  </span>
                </div>

                {/* Total points */}
                <span
                  className="text-sm font-black"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  <AnimatedNumber value={player.totalPoints} duration={900} />
                  <span
                    className="text-xs font-semibold ml-1"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    pts
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-2xl grid grid-cols-2 gap-4 pb-4">
          <button
            id="btn-repetir-rodada"
            onClick={onReplayRound}
            className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #374151, #4b5563)",
              color: "white",
              boxShadow: "0 10px 28px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.4)";
            }}
          >
            <RotateCcw size={16} /> Repetir Rodada
          </button>
          <button
            id="btn-proxima-rodada"
            onClick={onNextRound}
            className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #b45309, #f59e0b)",
              color: "#1a1a2e",
              boxShadow: "0 10px 28px rgba(245,158,11,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 16px 36px rgba(245,158,11,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(245,158,11,0.4)";
            }}
          >
            <ChevronRight size={16} /> Próxima Rodada
          </button>
        </div>
      </main>
    </div>
  );
}
