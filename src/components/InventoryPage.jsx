import { useState } from "react";
import { Home, UserCircle2, ChevronLeft, Package, Check } from "lucide-react";

const CARD_OPTIONS = [2, 3, 4, 5, 6];

export default function InventoryPage({ onBack, onHome }) {
  const [startWithCards, setStartWithCards] = useState(true);
  const [maxCards, setMaxCards] = useState(4);
  const [timeLimit, setTimeLimit] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChange = (setter) => (val) => {
    setSaved(false);
    setter(val);
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
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-12 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-56 h-56 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #818cf8, transparent)",
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <Home size={14} /> Home
          </button>
          <button
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10 gap-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package size={22} style={{ color: "#818cf8" }} />
          </div>
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #818cf8 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Inventário Inicial
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#818cf8" }}
          >
            Configure o inventário dos jogadores
          </p>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #22d3ee)" }}
          />
        </div>

        {/* SIM / NÃO Toggle */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <label
            className="text-xs font-bold tracking-widest uppercase text-center"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Inventário inicial: começar com cartas?
          </label>
          <div
            className="flex rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
          >
            {[{ label: "Sim", value: true }, { label: "Não", value: false }].map(({ label, value }) => {
              const active = startWithCards === value;
              return (
                <button
                  key={label}
                  onClick={() => handleChange(setStartWithCards)(value)}
                  className="flex-1 py-3 text-sm font-black tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                      : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.35)",
                    boxShadow: active ? "0 4px 20px rgba(99,102,241,0.4)" : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Max Cards Selector */}
        <div className="w-full max-w-md flex flex-col gap-4">
          <label
            className="text-xs font-bold tracking-widest uppercase text-center"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Número máximo de cartas no inventário
          </label>
          <div className="flex items-center justify-center gap-4">
            {CARD_OPTIONS.map((n) => {
              const active = maxCards === n;
              return (
                <button
                  key={n}
                  onClick={() => handleChange(setMaxCards)(n)}
                  className="w-12 h-12 rounded-full text-sm font-black transition-all duration-300 flex items-center justify-center"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                      : "rgba(255,255,255,0.07)",
                    color: active ? "#fff" : "rgba(255,255,255,0.4)",
                    border: active
                      ? "2px solid rgba(129,140,248,0.6)"
                      : "2px solid rgba(255,255,255,0.08)",
                    boxShadow: active ? "0 0 20px rgba(99,102,241,0.5)" : "none",
                    transform: active ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Limit Input */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <label
            className="text-xs font-bold tracking-widest uppercase text-center"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Tempo máximo para resposta
          </label>
          <input
            type="number"
            min={0}
            value={timeLimit}
            onChange={(e) => handleChange(setTimeLimit)(e.target.value)}
            placeholder="Digite aqui (segundos)..."
            className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(99,102,241,0.6)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
          style={{
            background: saved
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "white",
            boxShadow: saved
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : "0 12px 32px rgba(79,70,229,0.45)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {saved ? (
            <>
              <Check size={18} /> Salvo!
            </>
          ) : (
            <>
              <Package size={18} /> Salvar
            </>
          )}
        </button>
      </main>
    </div>
  );
}
