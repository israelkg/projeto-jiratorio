import { useState } from "react";
import { Home, UserCircle2, BookOpen, Mic } from "lucide-react";

const DEMO_QUESTION =
  "Em que ano foi assinada a Declaração de Independência dos Estados Unidos, marcando o início de uma nova era política no continente americano?";

export default function RoundQuestionPage({
  onHome,
  question = DEMO_QUESTION,
  roundNumber = 20,
  onStartReading,
}) {
  const [reading, setReading] = useState(false);

  const handleStartReading = () => {
    setReading(true);
    if (onStartReading) onStartReading();
  };

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
            background: "radial-gradient(circle, #6366f1, transparent)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-48 h-48 rounded-full opacity-8 blur-3xl animate-pulse"
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
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Window dots */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
        </div>

        {/* Right nav actions */}
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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10">

        {/* Title section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BookOpen size={20} style={{ color: "#38bdf8" }} />
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
            Pergunta da Rodada
          </h1>

          {/* Round badge */}
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

          {/* Divider */}
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
          />
        </div>

        {/* Question card */}
        <div
          className="w-full max-w-2xl rounded-2xl px-10 py-8 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Texto da pergunta
          </span>
          <p
            className="text-xl font-semibold leading-relaxed"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {question}
          </p>
        </div>

        {/* CTA Button */}
        <button
          id="btn-iniciar-leitura"
          onClick={handleStartReading}
          disabled={reading}
          className="flex items-center gap-3 px-12 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
          style={{
            background: reading
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : "linear-gradient(135deg, #0284c7, #0ea5e9)",
            color: "white",
            boxShadow: reading
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : "0 12px 32px rgba(14,165,233,0.4)",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: reading ? "default" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!reading)
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          <Mic size={18} />
          {reading ? "Leitura Iniciada…" : "Iniciar Leitura do Inquisitor"}
        </button>
      </main>
    </div>
  );
}
