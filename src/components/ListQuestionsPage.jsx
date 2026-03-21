import { useState } from "react";
import { Home, UserCircle2, ChevronLeft, Pencil, Trash2, Plus, Check, X } from "lucide-react";

const INITIAL_QUESTIONS = [
  { id: 1, text: "O que é mitose?", type: "Múltipla Escolha", difficulty: "Médio" },
  { id: 2, text: "A fotossíntese ocorre nos cloroplastos?", type: "Verdadeiro / Falso", difficulty: "Fácil" },
  { id: 3, text: "Explique o processo de meiose.", type: "Dissertativa", difficulty: "Difícil" },
  { id: 4, text: "Qual é a fórmula da água?", type: "Múltipla Escolha", difficulty: "Fácil" },
  { id: 5, text: "Descreva a estrutura do DNA.", type: "Dissertativa", difficulty: "Difícil" },
];

const DIFF_COLORS = { Fácil: "#22c55e", Médio: "#f59e0b", Difícil: "#ef4444" };
const TYPE_COLORS = { "Múltipla Escolha": "#7c3aed", "Verdadeiro / Falso": "#0ea5e9", Dissertativa: "#10b981" };

export default function ListQuestionsPage({ onBack, onHome }) {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");

  const startEdit = (q) => { setEditingId(q.id); setEditText(q.text); };
  const saveEdit = () => {
    setQuestions(qs => qs.map(q => q.id === editingId ? { ...q, text: editText } : q));
    setEditingId(null);
  };
  const deleteQ = (id) => setQuestions(qs => qs.filter(q => q.id !== id));
  const addQuestion = () => {
    if (!newText.trim()) return;
    setQuestions(qs => [...qs, { id: Date.now(), text: newText.trim(), type: "Múltipla Escolha", difficulty: "Médio" }]);
    setNewText(""); setAdding(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#1a1a2e" }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)", animationDelay: "1.5s" }} />
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
            onMouseEnter={e => e.currentTarget.style.color = "#10b981"}
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10 gap-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight uppercase"
            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #6ee7b7 50%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Listar / Editar
          </h1>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#34d399" }}>
            {questions.length} pergunta{questions.length !== 1 ? "s" : ""}
          </p>
          <div className="w-24 h-0.5 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #10b981, #818cf8)" }} />
        </div>

        {/* Questions list */}
        <div className="w-full max-w-lg flex flex-col gap-3">
          {questions.map((q, i) => (
            <div key={q.id}
              className="rounded-2xl px-5 py-4 flex items-start gap-4 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
              {/* Number */}
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}>
                {i + 1}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {editingId === q.id ? (
                  <input value={editText} onChange={e => setEditText(e.target.value)}
                    className="w-full text-sm rounded-lg px-3 py-1.5 outline-none"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid #10b981", color: "white" }}
                    autoFocus />
                ) : (
                  <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.8)" }}>{q.text}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Tag color={TYPE_COLORS[q.type] || "#7c3aed"} label={q.type} />
                  <Tag color={DIFF_COLORS[q.difficulty] || "#f59e0b"} label={q.difficulty} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {editingId === q.id ? (
                  <>
                    <IconBtn icon={<Check size={13} />} color="#10b981" onClick={saveEdit} />
                    <IconBtn icon={<X size={13} />} color="#ef4444" onClick={() => setEditingId(null)} />
                  </>
                ) : (
                  <>
                    <IconBtn icon={<Pencil size={13} />} color="#0ea5e9" onClick={() => startEdit(q)} />
                    <IconBtn icon={<Trash2 size={13} />} color="#ef4444" onClick={() => deleteQ(q.id)} />
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Add new question */}
          {adding ? (
            <div className="rounded-2xl px-5 py-4 flex items-center gap-3"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px dashed rgba(16,185,129,0.4)" }}>
              <input value={newText} onChange={e => setNewText(e.target.value)}
                placeholder="Nova pergunta..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "white" }}
                onKeyDown={e => e.key === "Enter" && addQuestion()}
                autoFocus />
              <IconBtn icon={<Check size={13} />} color="#10b981" onClick={addQuestion} />
              <IconBtn icon={<X size={13} />} color="#ef4444" onClick={() => { setAdding(false); setNewText(""); }} />
            </div>
          ) : (
            <button onClick={() => setAdding(true)}
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#34d399"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"; e.currentTarget.style.background = "rgba(16,185,129,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              <Plus size={14} /> Adicionar pergunta
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function Tag({ color, label }) {
  return (
    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md"
      style={{ background: `rgba(${hexRgb(color)},0.15)`, color, border: `1px solid rgba(${hexRgb(color)},0.3)` }}>
      {label}
    </span>
  );
}

function IconBtn({ icon, color, onClick }) {
  return (
    <button onClick={onClick}
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
      onMouseEnter={e => { e.currentTarget.style.background = `rgba(${hexRgb(color)},0.2)`; e.currentTarget.style.color = color; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
      {icon}
    </button>
  );
}

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,255,255";
}
