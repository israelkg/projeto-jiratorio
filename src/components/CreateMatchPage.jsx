import { useState } from "react";
import {
  Home,
  UserCircle2,
  Upload,
  Users,
  User,
  Sparkles,
  ListOrdered,
  Zap,
  Package,
  HelpCircle,
  LayoutList,
  Sparkles,
  PlayCircle,
  ChevronRight,
} from "lucide-react";

export default function CreateMatchPage({ onHome, onImport, onGenerate, onList, onPowerUps, onInventory, onQuestionCount, onChooseQuestions, onSelectPowerUps }) {
  const [mode, setMode] = useState("individual"); // "individual" | "dupla"
  const [startHover, setStartHover] = useState(false);

  const menuItems = [
    {
      id: "import",
      icon: <Upload size={16} strokeWidth={2} />,
      label: "Importar Material",
      accent: "#7c3aed",
      glow: "rgba(124,58,237,0.35)",
      onClick: onImport,
    },
    {
      id: "generate",
      icon: <Sparkles size={16} strokeWidth={2} />,
      label: "Gerar Perguntas",
      accent: "#0ea5e9",
      glow: "rgba(14,165,233,0.35)",
      onClick: onGenerate,
    },
    {
      id: "list",
      icon: <ListOrdered size={16} strokeWidth={2} />,
      label: "Listar / Editar Perguntas",
      accent: "#10b981",
      glow: "rgba(16,185,129,0.35)",
      onClick: onList,
    },
    {
      id: "powerups",
      icon: <Zap size={16} strokeWidth={2} />,
      label: "Power-Ups (%)",
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.35)",
      onClick: onPowerUps,
    },
    {
      id: "inventory",
      icon: <Package size={16} strokeWidth={2} />,
      label: "Inventário Inicial",
      accent: "#6366f1",
      glow: "rgba(99,102,241,0.35)",
      onClick: onInventory,
    },
    {
      id: "questioncount",
      icon: <HelpCircle size={16} strokeWidth={2} />,
      label: "Quantidade de Perguntas",
      accent: "#0ea5e9",
      glow: "rgba(14,165,233,0.35)",
      onClick: onQuestionCount,
    },
    {
      id: "choosequestions",
      icon: <LayoutList size={16} strokeWidth={2} />,
      label: "Escolher Perguntas",
      accent: "#a855f7",
      glow: "rgba(168,85,247,0.35)",
      onClick: onChooseQuestions,
    },
    {
      id: "selectpowerups",
      icon: <Sparkles size={16} strokeWidth={2} />,
      label: "Selecionar Power-Ups",
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.35)",
      onClick: onSelectPowerUps,
    },
  ];


  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)", animationDelay: "3s" }}
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

      {/* Nav bar */}
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c084fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} />
            Home
          </button>
          <button
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c084fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Criar Nova Partida
          </h1>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #818cf8)" }}
          />
        </div>

        {/* Options card */}
        <div
          className="w-full max-w-md rounded-2xl overflow-hidden flex flex-col gap-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          }}
        >
          {/* Mode toggle row */}
          <div
            className="flex"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <ModeButton
              active={mode === "individual"}
              icon={<User size={15} />}
              label="Modo Individual"
              onClick={() => setMode("individual")}
              rounded="left"
            />
            <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
            <ModeButton
              active={mode === "dupla"}
              icon={<Users size={15} />}
              label="Modo em Dupla"
              onClick={() => setMode("dupla")}
              rounded="right"
            />
          </div>

          {/* Menu items */}
          {menuItems.map((item, i) => (
            <MenuRow
              key={item.id}
              icon={item.icon}
              label={item.label}
              accent={item.accent}
              glow={item.glow}
              onClick={item.onClick}
              last={i === menuItems.length - 1}
            />
          ))}
        </div>

        {/* Start button */}
        <button
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
          style={{
            background: startHover
              ? "linear-gradient(135deg, #6d28d9, #4f46e5)"
              : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "white",
            boxShadow: startHover
              ? "0 20px 48px rgba(124,58,237,0.65)"
              : "0 12px 32px rgba(124,58,237,0.45)",
            transform: startHover ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
        >
          <span className="flex items-center gap-3">
            <PlayCircle size={18} />
            Iniciar Partida
          </span>
        </button>
      </main>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function ModeButton({ active, icon, label, onClick, rounded }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300"
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(79,70,229,0.25))"
          : "transparent",
        color: active ? "#c084fc" : "rgba(255,255,255,0.35)",
        borderBottom: active ? "2px solid #9333ea" : "2px solid transparent",
        borderRadius:
          rounded === "left" ? "0.75rem 0 0 0" : "0 0.75rem 0 0",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.35)";
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function MenuRow({ icon, label, accent, glow, onClick, last }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-300"
      style={{
        background: hovered ? `rgba(${hexToRgb(accent)}, 0.12)` : "transparent",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? `inset 3px 0 0 ${accent}` : `inset 3px 0 0 transparent`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
          style={{
            background: hovered ? `rgba(${hexToRgb(accent)}, 0.25)` : "rgba(255,255,255,0.06)",
            color: hovered ? accent : "rgba(255,255,255,0.5)",
            boxShadow: hovered ? `0 4px 12px ${glow}` : "none",
          }}
        >
          {icon}
        </span>
        <span
          className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}
        >
          {label}
        </span>
      </div>
      <ChevronRight
        size={14}
        style={{
          color: hovered ? accent : "rgba(255,255,255,0.2)",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "all 0.3s",
        }}
      />
    </button>
  );
}

// Helper to convert hex to r,g,b for rgba()
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "255,255,255";
}
