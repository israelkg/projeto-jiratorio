import { Plus, FolderOpen, Sparkles } from "lucide-react";

export default function HomePage({ onNewSession }) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #9333ea, transparent)", animationDelay: "2s" }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-10 flex flex-col items-center gap-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: "rgba(147,51,234,0.2)", border: "1px solid rgba(147,51,234,0.4)", color: "#c084fc" }}>
          <Sparkles size={12} />
          Aprenda brincando
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-black tracking-tight leading-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sistema de<br />Revisão
          </h1>
          <h2 className="text-2xl font-extrabold tracking-widest uppercase"
            style={{ color: "#a78bfa" }}>
            Gamificada
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)" }} />

        {/* Action buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <ActionButton
            icon={<Plus size={32} strokeWidth={1.5} />}
            label="Nova Sessão"
            gradient="linear-gradient(135deg, #7c3aed, #4f46e5)"
            glowColor="rgba(124, 58, 237, 0.4)"
            onClick={onNewSession}
          />
          <ActionButton
            icon={<FolderOpen size={32} strokeWidth={1.5} />}
            label="Carregar Sessão"
            gradient="linear-gradient(135deg, #1d4ed8, #0e7490)"
            glowColor="rgba(29, 78, 216, 0.4)"
          />
        </div>

        {/* Footer hint */}
        <p className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
          Pressione uma opção para começar
        </p>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, gradient, glowColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl font-bold text-xs tracking-widest uppercase text-white transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = gradient;
        e.currentTarget.style.boxShadow = `0 12px 32px ${glowColor}`;
        e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.25)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.75)", transition: "color 0.3s" }}>
        {icon}
      </span>
      <span style={{ letterSpacing: "0.1em", lineHeight: 1.3, textAlign: "center" }}>
        {label}
      </span>
    </button>
  );
}
