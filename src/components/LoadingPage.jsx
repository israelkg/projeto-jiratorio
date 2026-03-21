import { useEffect, useState } from "react";
import { Home, UserCircle2 } from "lucide-react";

export default function LoadingPage({ onHome, onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=analisando, 1=gerando, 2=finalizando

  const PHASES = [
    "Analisando o material...",
    "Gerando as perguntas...",
    "Finalizando a estrutura...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.8;
        if (next >= 33 && next < 34) setPhase(1);
        if (next >= 66 && next < 67) setPhase(2);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onDone?.(), 600);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onDone]);

  const done = progress >= 100;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Keyframe styles */}
      <style>{`
        @keyframes spin-loader {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin-loader { animation: spin-loader 1.1s linear infinite; }
        .pulse-glow  { animation: pulse-glow 2s ease-in-out infinite; }
        .float-orb   { animation: float-orb 3s ease-in-out infinite; }
        .fade-in-up  { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent)",
            animation: "float-orb 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
            animation: "float-orb 5s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-12 blur-3xl"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent)",
            animation: "float-orb 6s ease-in-out infinite",
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c084fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} /> Home
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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 gap-10">

        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring glow */}
          <div
            className="absolute w-44 h-44 rounded-full opacity-30 blur-xl pulse-glow"
            style={{ background: "radial-gradient(circle, #7c3aed, #0ea5e9, transparent)" }}
          />

          {/* Spinning segmented ring */}
          <div className="spin-loader" style={{ width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * 360;
                const rad = (angle * Math.PI) / 180;
                const cx = 70 + 52 * Math.cos(rad);
                const cy = 70 + 52 * Math.sin(rad);
                const opacity = (i / 16) * 0.9 + 0.1;
                const size = 4 + (i / 16) * 3;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={size / 2}
                    fill={`rgba(167, 139, 250, ${opacity})`}
                  />
                );
              })}
            </svg>
          </div>

          {/* Center icon / progress number */}
          <div className="absolute flex flex-col items-center gap-0.5">
            <span
              className="text-2xl font-black tabular-nums"
              style={{ color: done ? "#4ade80" : "#c084fc" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-3 max-w-md">
          <h1
            className="text-4xl font-black tracking-tight uppercase leading-tight"
            style={{
              background: done
                ? "linear-gradient(135deg, #f8fafc 0%, #4ade80 100%)"
                : "linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transition: "all 0.5s",
            }}
          >
            {done ? "Perguntas Geradas!" : "Suas Perguntas Estão Sendo Geradas!"}
          </h1>

          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: done ? "#4ade80" : "rgba(255,255,255,0.35)" }}
          >
            {done ? "✓ Concluído com sucesso" : "Aguarde até o fim do carregamento"}
          </p>

          {/* Phase indicator */}
          {!done && (
            <p
              className="text-sm font-semibold fade-in-up"
              style={{ color: "rgba(167,139,250,0.7)" }}
              key={phase}
            >
              {PHASES[phase]}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm flex flex-col gap-2">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: done
                  ? "linear-gradient(90deg, #22c55e, #4ade80)"
                  : "linear-gradient(90deg, #7c3aed, #0ea5e9)",
                boxShadow: done
                  ? "0 0 12px rgba(34,197,94,0.5)"
                  : "0 0 12px rgba(124,58,237,0.5)",
              }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-between px-1">
            {["Análise", "Geração", "Finalização"].map((label, i) => {
              const stepProgress = i * 33.3;
              const reached = progress >= stepProgress;
              return (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: reached ? "#c084fc" : "rgba(255,255,255,0.15)",
                      boxShadow: reached ? "0 0 8px rgba(192,132,252,0.6)" : "none",
                    }}
                  />
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase"
                    style={{ color: reached ? "rgba(192,132,252,0.7)" : "rgba(255,255,255,0.2)" }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
