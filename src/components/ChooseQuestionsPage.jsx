import { useState } from "react";
import {
  Home,
  UserCircle2,
  ChevronLeft,
  Pencil,
  Check,
  X,
  LayoutList,
  CheckSquare,
} from "lucide-react";

const INITIAL_QUESTIONS = [
  { id: 1, text: "O que é mitose e como ela ocorre nas células eucarióticas?" },
  { id: 2, text: "A fotossíntese ocorre nos cloroplastos das células vegetais?" },
  { id: 3, text: "Explique o processo de meiose e sua importância genética." },
  { id: 4, text: "Qual é a fórmula molecular da água e suas propriedades?" },
  { id: 5, text: "Descreva a estrutura do DNA e o modelo da dupla hélice." },
  { id: 6, text: "Quais são as principais diferenças entre células procarióticas e eucarióticas?" },
  { id: 7, text: "O que são enzimas e qual é o seu papel no metabolismo celular?" },
  { id: 8, text: "Como funciona a replicação do DNA durante a divisão celular?" },
];

function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}

export default function ChooseQuestionsPage({ onBack, onHome }) {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selected, setSelected] = useState(new Set(INITIAL_QUESTIONS.map((q) => q.id)));
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleSelect = (id) => {
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(questions.map((q) => q.id)));
  const deselectAll = () => setSelected(new Set());

  const startEdit = (q) => {
    setEditingId(q.id);
    setEditText(q.text);
  };

  const saveEdit = () => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === editingId ? { ...q, text: editText } : q))
    );
    setEditingId(null);
  };

  const handleConfirm = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const selectedCount = selected.size;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #10b981, transparent)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-56 h-56 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
            animationDelay: "3s",
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
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
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-8 gap-6 overflow-hidden">
        {/* Title */}
        <div className="text-center space-y-2 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-1">
            <LayoutList size={22} style={{ color: "#a78bfa" }} />
          </div>
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Material Gerado
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#a78bfa" }}
          >
            Selecione as perguntas para a partida
          </p>
          <div
            className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #818cf8)" }}
          />
        </div>

        {/* Stats bar + actions */}
        <div
          className="w-full max-w-lg flex items-center justify-between rounded-2xl px-5 py-3 flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-2">
            <CheckSquare size={14} style={{ color: "#a78bfa" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Selecionadas:
            </span>
            <span className="text-sm font-black" style={{ color: "#c084fc" }}>
              {selectedCount}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg transition-all duration-200"
              style={{
                background: "rgba(167,139,250,0.1)",
                color: "#a78bfa",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.1)")}
            >
              Todas
            </button>
            <button
              onClick={deselectAll}
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg transition-all duration-200"
              style={{
                background: "rgba(239,68,68,0.08)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
            >
              Nenhuma
            </button>
          </div>
        </div>

        {/* Scrollable questions list */}
        <div
          className="w-full max-w-lg flex flex-col gap-2.5 overflow-y-auto pr-1"
          style={{
            flex: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(167,139,250,0.3) transparent",
          }}
        >
          {questions.map((q, i) => {
            const isSelected = selected.has(q.id);
            const isEditing = editingId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-2xl px-4 py-3.5 flex items-center gap-3 transition-all duration-300"
                style={{
                  background: isSelected
                    ? "rgba(124,58,237,0.1)"
                    : "rgba(255,255,255,0.04)",
                  border: isSelected
                    ? "1px solid rgba(167,139,250,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  boxShadow: isSelected ? "inset 3px 0 0 #7c3aed" : "inset 3px 0 0 transparent",
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => !isEditing && toggleSelect(q.id)}
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: isSelected
                      ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                      : "rgba(255,255,255,0.06)",
                    border: isSelected
                      ? "1px solid rgba(167,139,250,0.5)"
                      : "1px solid rgba(255,255,255,0.12)",
                    boxShadow: isSelected ? "0 0 10px rgba(124,58,237,0.4)" : "none",
                  }}
                >
                  {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                </button>

                {/* Number */}
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                  style={{
                    background: "rgba(167,139,250,0.1)",
                    color: "rgba(167,139,250,0.7)",
                    border: "1px solid rgba(167,139,250,0.2)",
                  }}
                >
                  {i + 1}
                </span>

                {/* Text / edit input */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full text-sm rounded-lg px-3 py-1.5 outline-none"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid #7c3aed",
                        color: "white",
                      }}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="text-sm leading-snug"
                      style={{ color: isSelected ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
                    >
                      {q.text}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {isEditing ? (
                    <>
                      <IconBtn
                        icon={<Check size={12} />}
                        color="#10b981"
                        onClick={saveEdit}
                      />
                      <IconBtn
                        icon={<X size={12} />}
                        color="#ef4444"
                        onClick={() => setEditingId(null)}
                      />
                    </>
                  ) : (
                    <IconBtn
                      icon={<Pencil size={12} />}
                      color="#0ea5e9"
                      onClick={() => startEdit(q)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={selectedCount === 0}
          className="px-14 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3 flex-shrink-0"
          style={{
            background: saved
              ? "linear-gradient(135deg, #059669, #0d9488)"
              : selectedCount === 0
              ? "rgba(255,255,255,0.06)"
              : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: selectedCount === 0 ? "rgba(255,255,255,0.2)" : "white",
            boxShadow: saved
              ? "0 12px 32px rgba(5,150,105,0.4)"
              : selectedCount === 0
              ? "none"
              : "0 12px 32px rgba(124,58,237,0.45)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: selectedCount === 0 ? "not-allowed" : "pointer",
          }}
        >
          {saved ? (
            <>
              <Check size={18} /> Salvo!
            </>
          ) : (
            <>
              <CheckSquare size={18} />
              Confirmar {selectedCount > 0 ? `(${selectedCount})` : ""}
            </>
          )}
        </button>
      </main>
    </div>
  );
}

function IconBtn({ icon, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${hexRgb(color)},0.2)`;
        e.currentTarget.style.color = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.color = "rgba(255,255,255,0.35)";
      }}
    >
      {icon}
    </button>
  );
}
