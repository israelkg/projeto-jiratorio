import { useState } from "react";
import {
  Home,
  UserCircle2,
  Users,
  Star,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const DEMO_TEAMS = [
  { id: 1, name: "Equipe 1", players: ["FULANO 1", "FULANO 2"], points: 3,   maxPoints: 6 },
  { id: 2, name: "Equipe 2", players: ["FULANO 3", "FULANO 4"], points: 3.5, maxPoints: 6 },
  { id: 3, name: "Equipe 3", players: ["FULANO 5", "FULANO 6"], points: 1,   maxPoints: 6 },
  { id: 4, name: "Equipe 4", players: ["FULANO 7", "FULANO 8"], points: 5,   maxPoints: 6 },
];

const DEMO_ACTIONS = [
  { id: 1, team: "EQUIPE 2", action: "repassou a vez",              detail: "",          type: "negative", value: "-0,5 ponto" },
  { id: 2, team: "EQUIPE 1", action: "acertou a pergunta",          detail: "",          type: "positive", value: "+1 ponto"   },
  { id: 3, team: "EQUIPE 4", action: "roubou +1 ponto da",          detail: "EQUIPE 1",  type: "steal",    value: ""          },
  { id: 4, team: "EQUIPE 3", action: "errou a pergunta",            detail: "",          type: "negative", value: "0 ponto"   },
  { id: 5, team: "EQUIPE 1", action: "usou power-up",               detail: "+30 seg",   type: "powerup",  value: ""          },
];

const ACTION_COLORS = {
  positive: "#22c55e",
  negative: "#ef4444",
  steal:    "#f59e0b",
  powerup:  "#a78bfa",
};

const ACTION_ICONS = {
  positive: TrendingUp,
  negative: TrendingDown,
  steal:    Zap,
  powerup:  Star,
};

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}

const TEAM_COLORS = ["#0ea5e9", "#a78bfa", "#22c55e", "#f59e0b"];

export default function DuoModePage({
  onHome,
  teams = DEMO_TEAMS,
  actions = DEMO_ACTIONS,
  roundNumber = 3,
}) {
  const sorted = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent)",
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
            "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)",
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} /> Home
          </button>
          <button
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-8">

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users size={22} style={{ color: "#38bdf8" }} />
          </div>
          <h1
            className="text-5xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #38bdf8 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            Modo Duplas
          </h1>
          <div className="flex items-center justify-center">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.25)",
                color: "#38bdf8",
              }}
            >
              Rodada #{roundNumber}
            </span>
          </div>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
          />
        </div>

        {/* Team cards — horizontal scroll */}
        <div
          className="w-full flex gap-4 pb-2"
          style={{
            overflowX: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(56,189,248,0.3) rgba(255,255,255,0.05)",
          }}
        >
          {teams.map((team, idx) => {
            const color   = TEAM_COLORS[idx % TEAM_COLORS.length];
            const pct     = Math.min((team.points / team.maxPoints) * 100, 100);
            const isLeader = sorted[0].id === team.id;

            return (
              <div
                key={team.id}
                className="flex-shrink-0 flex flex-col items-center rounded-2xl px-6 pt-6 pb-5 gap-3 transition-all duration-300"
                style={{
                  width: "180px",
                  background: isLeader
                    ? `rgba(${hexRgb(color)},0.1)`
                    : "rgba(255,255,255,0.04)",
                  border: isLeader
                    ? `1px solid rgba(${hexRgb(color)},0.35)`
                    : "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  boxShadow: isLeader
                    ? `0 8px 28px rgba(${hexRgb(color)},0.25), inset 0 1px 0 rgba(255,255,255,0.06)`
                    : "0 4px 16px rgba(0,0,0,0.25)",
                }}
              >
                {/* Leader crown */}
                {isLeader && (
                  <Star
                    size={14}
                    fill={color}
                    style={{ color, position: "absolute", marginTop: "-20px" }}
                  />
                )}

                {/* Duo avatars */}
                <div className="flex items-center -space-x-3">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2"
                      style={{
                        background: `rgba(${hexRgb(color)},0.15)`,
                        borderColor: color,
                        color: color,
                        zIndex: i === 0 ? 1 : 0,
                      }}
                    >
                      {(team.players[i] ?? "?")[0]}
                    </div>
                  ))}
                </div>

                {/* Team name */}
                <div className="text-center">
                  <p
                    className="text-xs font-black tracking-widest uppercase"
                    style={{ color: isLeader ? color : "rgba(255,255,255,0.8)" }}
                  >
                    {team.name}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 truncate max-w-[140px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {team.players.join(" & ")}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />

                {/* Score */}
                <div className="text-center w-full">
                  <span
                    className="text-2xl font-black"
                    style={{ color: isLeader ? color : "rgba(255,255,255,0.9)" }}
                  >
                    {team.points}
                  </span>
                  <span
                    className="text-sm font-semibold ml-1"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    /{team.maxPoints}
                  </span>

                  {/* Progress bar */}
                  <div
                    className="w-full h-1.5 rounded-full mt-2 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                        boxShadow: `0 0 8px rgba(${hexRgb(color)},0.6)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom panels */}
        <div className="w-full grid grid-cols-2 gap-5" style={{ minHeight: "220px" }}>

          {/* ── Ranking Atual ── */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Star size={14} style={{ color: "#f59e0b" }} />
              <span
                className="text-xs font-black tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Ranking Atual
              </span>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y flex-1 overflow-y-auto">
              {sorted.map((team, idx) => {
                const color = TEAM_COLORS[teams.findIndex((t) => t.id === team.id) % TEAM_COLORS.length];
                const pct   = Math.min((team.points / team.maxPoints) * 100, 100);
                return (
                  <div
                    key={team.id}
                    className="flex items-center gap-3 px-5 py-3 transition-colors duration-150"
                    style={{
                      borderBottom: idx < sorted.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Rank star */}
                    <Star
                      size={16}
                      fill={idx === 0 ? "#f59e0b" : "transparent"}
                      style={{ color: idx === 0 ? "#f59e0b" : "rgba(255,255,255,0.2)", flexShrink: 0 }}
                    />

                    {/* Name */}
                    <span
                      className="text-xs font-black tracking-widest uppercase flex-shrink-0 w-20"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {team.name}
                    </span>

                    {/* Bar */}
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                        }}
                      />
                    </div>

                    {/* Points */}
                    <span
                      className="text-xs font-black flex-shrink-0"
                      style={{ color }}
                    >
                      {team.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Ações da Rodada ── */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Zap size={14} style={{ color: "#a78bfa" }} />
              <span
                className="text-xs font-black tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Ações da Rodada
              </span>
            </div>

            {/* Scrollable list */}
            <div
              className="flex flex-col flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(167,139,250,0.3) rgba(255,255,255,0.05)",
              }}
            >
              {actions.map((action, idx) => {
                const color   = ACTION_COLORS[action.type] ?? "#fff";
                const Icon    = ACTION_ICONS[action.type] ?? Minus;
                return (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 px-5 py-3 transition-colors duration-150"
                    style={{
                      borderBottom:
                        idx < actions.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <Icon size={13} style={{ color, marginTop: "2px", flexShrink: 0 }} />
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span className="font-black" style={{ color }}>
                        {action.team}
                      </span>{" "}
                      — {action.action}
                      {action.detail && (
                        <span className="font-black" style={{ color: "rgba(255,255,255,0.85)" }}>
                          {" "}{action.detail}
                        </span>
                      )}
                      {action.value && (
                        <span className="font-bold" style={{ color }}>
                          {" "}({action.value})
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
