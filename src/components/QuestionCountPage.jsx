import { useState } from "react";
import { Home, UserCircle2, ChevronLeft, HelpCircle, Check } from "lucide-react";

const COUNT_OPTIONS = [30, 40, 50, 60, 70];

export default function QuestionCountPage({ onBack, onHome }) {
  const [selected, setSelected] = useState(30);
  const [saved, setSaved] = useState(false);

  const handleSelect = (n) => {
    setSelected(n);
    setSaved(false);
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
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-12 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-56 h-56 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
            animationDelay: "1s",
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
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
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle size={22} style={{ color: "#38bdf8" }} />
          </div>
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #38bdf8 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Selecione a Quantidade
            <br />
            de Perguntas
          </h1>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }}
          />
        </div>

        {/* Circle selector */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {COUNT_OPTIONS.map((n) => {
            const active = selected === n;
            return (
              <button
                key={n}
                onClick={() => handleSelect(n)}
                className="w-16 h-16 rounded-full text-lg font-black transition-all duration-300 flex items-center justify-center"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #0284c7, #0ea5e9)"
                    : "rgba(255,255,255,0.07)",
                  color: active ? "#fff" : "rgba(255,255,255,0.45)",
                  border: active
                    ? "2px solid rgba(56,189,248,0.7)"
                    : "2px solid rgba(255,255,255,0.08)",
                  boxShadow: active ? "0 0 28px rgba(14,165,233,0.55)" : "none",
                  transform: active ? "scale(1.15)" : "scale(1)",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>

        {/* Selected display */}
        <div
          className="rounded-2xl px-8 py-4 flex items-center gap-3"
          style={{
            background: "rgba(14,165,233,0.08)",
            border: "1px solid rgba(14,165,233,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Selecionado:
          </span>
          <span
            className="text-2xl font-black"
            style={{ color: "#38bdf8" }}
          >
            {selected}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            perguntas
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
          style={{
            background: saved
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : "linear-gradient(135deg, #0284c7, #0ea5e9)",
            color: "white",
            boxShadow: saved
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : "0 12px 32px rgba(14,165,233,0.4)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {saved ? (
            <>
              <Check size={18} /> Salvo!
            </>
          ) : (
            <>
              <HelpCircle size={18} /> Salvar
            </>
          )}
        </button>
      </main>
    </div>
  );
}
