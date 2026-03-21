import { useState } from "react";
import { Home, UserCircle2, Sparkles, ChevronLeft, Check } from "lucide-react";

const QUESTION_TYPES = [
  { id: "multipla", label: "Múltipla Escolha", emoji: "🔘" },
  { id: "verdadeiro", label: "Verdadeiro / Falso", emoji: "✅" },
  { id: "dissertativa", label: "Dissertativa", emoji: "✏️" },
];

const DIFFICULTIES = [
  { id: "facil", label: "Fácil", color: "#22c55e", glow: "rgba(34,197,94,0.35)" },
  { id: "medio", label: "Médio", color: "#f59e0b", glow: "rgba(245,158,11,0.35)" },
  { id: "dificil", label: "Difícil", color: "#ef4444", glow: "rgba(239,68,68,0.35)" },
];

export default function GenerateQuestionsPage({ onBack, onHome }) {
  const [quantity, setQuantity] = useState(10);
  const [difficulty, setDifficulty] = useState("medio");
  const [types, setTypes] = useState({ multipla: true, verdadeiro: false, dissertativa: false });
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const toggleType = (id) => setTypes((t) => ({ ...t, [id]: !t[id] }));

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#1a1a2e" }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)", animationDelay: "2s" }} />
      </div>
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            <Home size={14} /> Home
          </button>
          <button style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} style={{ color: "#0ea5e9" }} />
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase"
            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #7dd3fc 50%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Gerar Perguntas
          </h1>
          <div className="w-24 h-0.5 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #0ea5e9, #818cf8)" }} />
        </div>

        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Quantity */}
          <Section label="Quantidade de perguntas">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>1</span>
                <span className="text-2xl font-black" style={{ color: "#7dd3fc" }}>{quantity}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>50</span>
              </div>
              <input type="range" min={1} max={50} value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#0ea5e9", background: `linear-gradient(to right, #0ea5e9 ${(quantity / 50) * 100}%, rgba(255,255,255,0.1) 0%)` }} />
            </div>
          </Section>

          {/* Difficulty */}
          <Section label="Dificuldade">
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTIES.map(d => (
                <button key={d.id} onClick={() => setDifficulty(d.id)}
                  className="py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: difficulty === d.id ? `rgba(${hexRgb(d.color)},0.2)` : "rgba(255,255,255,0.05)",
                    color: difficulty === d.id ? d.color : "rgba(255,255,255,0.35)",
                    border: difficulty === d.id ? `1px solid ${d.color}` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: difficulty === d.id ? `0 0 16px ${d.glow}` : "none",
                  }}>
                  {d.label}
                </button>
              ))}
            </div>
          </Section>

          {/* Types */}
          <Section label="Tipo de perguntas">
            <div className="flex flex-col gap-2">
              {QUESTION_TYPES.map(t => (
                <button key={t.id} onClick={() => toggleType(t.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300"
                  style={{
                    background: types[t.id] ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.04)",
                    border: types[t.id] ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <span className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase"
                    style={{ color: types[t.id] ? "#7dd3fc" : "rgba(255,255,255,0.4)" }}>
                    <span>{t.emoji}</span>{t.label}
                  </span>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300"
                    style={{ background: types[t.id] ? "#0ea5e9" : "rgba(255,255,255,0.08)", border: types[t.id] ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
                    {types[t.id] && <Check size={11} color="white" strokeWidth={3} />}
                  </div>
                </button>
              ))}
            </div>
          </Section>
        </div>

        {/* Generate button */}
        <button onClick={handleGenerate} disabled={generating}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
          style={{
            background: generated ? "linear-gradient(135deg, #059669, #0d9488)" : "linear-gradient(135deg, #0284c7, #0ea5e9)",
            color: "white",
            boxShadow: generated ? "0 12px 32px rgba(5,150,105,0.4)" : "0 12px 32px rgba(2,132,199,0.4)",
            opacity: generating ? 0.7 : 1,
            cursor: generating ? "not-allowed" : "pointer",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
          {generating ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Gerando...</>
          ) : generated ? (
            <><Check size={18} /> {quantity} Perguntas Geradas!</>
          ) : (
            <><Sparkles size={18} /> Gerar Perguntas</>
          )}
        </button>
      </main>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
      <p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
      {children}
    </div>
  );
}

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,255,255";
}
