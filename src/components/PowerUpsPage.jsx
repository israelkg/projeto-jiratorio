import { useState } from "react";
import { Home, UserCircle2, ChevronLeft, Zap, Shield, Clock, Eye, Shuffle, Check } from "lucide-react";

const POWERUPS = [
  { id: "dica",    icon: <Eye size={18} />,     label: "Dica",           sub: "Revela uma pista da resposta",        color: "#f59e0b", glow: "rgba(245,158,11,0.4)"  },
  { id: "tempo",   icon: <Clock size={18} />,   label: "Tempo Extra",    sub: "+15 segundos no cronômetro",          color: "#0ea5e9", glow: "rgba(14,165,233,0.4)"  },
  { id: "escudo",  icon: <Shield size={18} />,  label: "Escudo",         sub: "Protege de uma resposta errada",      color: "#22c55e", glow: "rgba(34,197,94,0.4)"   },
  { id: "troca",   icon: <Shuffle size={18} />, label: "Trocar Questão", sub: "Substitui a pergunta atual",          color: "#a855f7", glow: "rgba(168,85,247,0.4)"  },
  { id: "dobro",   icon: <Zap size={18} />,     label: "Pontos em Dobro",sub: "Multiplica por 2 os pontos ganhos",  color: "#ef4444", glow: "rgba(239,68,68,0.4)"   },
];

export default function PowerUpsPage({ onBack, onHome }) {
  const [values, setValues] = useState({ dica: 25, tempo: 20, escudo: 15, troca: 10, dobro: 5 });
  const [saved, setSaved] = useState(false);

  const set = (id, val) => { setSaved(false); setValues(v => ({ ...v, [id]: Number(val) })); };
  const total = Object.values(values).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#1a1a2e" }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-12 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-0 w-56 h-56 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #ef4444, transparent)", animationDelay: "1s" }} />
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
            onMouseEnter={e => e.currentTarget.style.color = "#f59e0b"}
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10 gap-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap size={22} style={{ color: "#f59e0b" }} />
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase"
            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fcd34d 50%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Power-Ups
          </h1>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#fbbf24" }}>
            Configure as probabilidades
          </p>
          <div className="w-24 h-0.5 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)" }} />
        </div>

        {/* Total indicator */}
        <div className="w-full max-w-md rounded-2xl px-6 py-4 flex items-center justify-between"
          style={{ background: total === 100 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${total === 100 ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, backdropFilter: "blur(16px)" }}>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Total</span>
          <span className="text-2xl font-black" style={{ color: total === 100 ? "#22c55e" : "#ef4444" }}>{total}%</span>
          <span className="text-xs font-semibold" style={{ color: total === 100 ? "#4ade80" : "#f87171" }}>
            {total === 100 ? "✓ Perfeito" : total > 100 ? "↓ Reduza" : "↑ Aumente"}
          </span>
        </div>

        {/* Power-up sliders */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {POWERUPS.map(p => (
            <div key={p.id} className="rounded-2xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${hexRgb(p.color)},0.15)`, border: `1px solid rgba(${hexRgb(p.color)},0.3)`, color: p.color }}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.8)" }}>{p.label}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{p.sub}</p>
                </div>
                <span className="text-lg font-black min-w-[3rem] text-right" style={{ color: p.color }}>{values[p.id]}%</span>
              </div>
              <input type="range" min={0} max={100} value={values[p.id]}
                onChange={e => set(p.id, e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: p.color, background: `linear-gradient(to right, ${p.color} ${values[p.id]}%, rgba(255,255,255,0.1) 0%)` }} />
            </div>
          ))}
        </div>

        {/* Save button */}
        <button onClick={() => setSaved(true)}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
          style={{
            background: saved ? "linear-gradient(135deg, #059669, #0d9488)" : "linear-gradient(135deg, #d97706, #f59e0b)",
            color: "white",
            boxShadow: saved ? "0 12px 32px rgba(5,150,105,0.4)" : "0 12px 32px rgba(217,119,6,0.4)",
            border: "1px solid rgba(255,255,255,0.15)",
            opacity: total !== 100 ? 0.5 : 1,
            cursor: total !== 100 ? "not-allowed" : "pointer",
          }}
          disabled={total !== 100}>
          {saved ? <><Check size={18} /> Salvo!</> : <><Zap size={18} /> Salvar Power-Ups</>}
        </button>
      </main>
    </div>
  );
}

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,255,255";
}
