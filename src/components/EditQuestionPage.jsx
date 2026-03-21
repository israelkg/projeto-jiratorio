import { useState } from "react";
import { Home, UserCircle2, ChevronLeft, Pencil, Trash2, Check, AlertTriangle } from "lucide-react";

// Default question passed via props; falls back to this placeholder
const DEFAULT_QUESTION = {
  id: 1,
  text: "Explique o processo de meiose e sua importância genética para as células reprodutivas.",
};

export default function EditQuestionPage({ onBack, onHome, question = DEFAULT_QUESTION, onSave, onDelete }) {
  const [editText, setEditText] = useState(question.text);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isDirty = editText.trim() !== question.text;

  const handleSave = () => {
    if (!editText.trim()) return;
    onSave?.({ ...question, text: editText.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete?.(question.id);
    onBack?.();
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)", animationDelay: "1.5s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <button onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#38bdf8"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#38bdf8"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            <Home size={14} /> Home
          </button>
          <button style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#38bdf8"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10 gap-7">

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Pencil size={20} style={{ color: "#38bdf8" }} />
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #38bdf8 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            Editar Pergunta
          </h1>
          <div className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }} />
        </div>

        {/* Original (read-only) */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Texto original
          </label>
          <div className="w-full rounded-2xl px-5 py-4 text-sm leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              minHeight: 90,
            }}>
            {question.text}
          </div>
        </div>

        {/* Editable textarea */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Texto editado
          </label>
          <textarea
            value={editText}
            onChange={e => { setEditText(e.target.value); setSaved(false); }}
            rows={4}
            placeholder="Digite o novo texto da pergunta..."
            className="w-full rounded-2xl px-5 py-4 text-sm leading-relaxed resize-none outline-none transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: isDirty ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              boxShadow: isDirty ? "0 0 0 3px rgba(14,165,233,0.1)" : "none",
            }}
            onFocus={e => {
              e.currentTarget.style.border = "1px solid rgba(56,189,248,0.6)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.15)";
            }}
            onBlur={e => {
              e.currentTarget.style.border = isDirty ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = isDirty ? "0 0 0 3px rgba(14,165,233,0.1)" : "none";
            }}
          />
          <div className="flex justify-end">
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {editText.length} caracteres
            </span>
          </div>
        </div>

        {/* Confirm delete warning */}
        {confirmDelete && (
          <div className="w-full max-w-lg rounded-2xl px-5 py-3 flex items-center gap-3"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <AlertTriangle size={16} style={{ color: "#f87171", flexShrink: 0 }} />
            <p className="text-xs font-semibold" style={{ color: "#fca5a5" }}>
              Tem certeza? Clique em <strong>Excluir</strong> novamente para confirmar. Esta ação não pode ser desfeita.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="w-full max-w-lg flex items-center gap-4">
          {/* Delete */}
          <button
            onClick={handleDelete}
            className="flex-1 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: confirmDelete
                ? "linear-gradient(135deg, #b91c1c, #ef4444)"
                : "rgba(239,68,68,0.1)",
              color: confirmDelete ? "white" : "#f87171",
              border: "1px solid rgba(239,68,68,0.3)",
              boxShadow: confirmDelete ? "0 12px 32px rgba(239,68,68,0.35)" : "none",
            }}>
            <Trash2 size={16} />
            {confirmDelete ? "Confirmar Exclusão" : "Excluir Pergunta"}
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={!editText.trim()}
            className="flex-1 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: saved
                ? "linear-gradient(135deg, #059669, #0d9488)"
                : !editText.trim()
                ? "rgba(255,255,255,0.05)"
                : "linear-gradient(135deg, #0284c7, #0ea5e9)",
              color: !editText.trim() ? "rgba(255,255,255,0.2)" : "white",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: saved
                ? "0 12px 32px rgba(5,150,105,0.4)"
                : !editText.trim()
                ? "none"
                : "0 12px 32px rgba(14,165,233,0.4)",
              cursor: !editText.trim() ? "not-allowed" : "pointer",
            }}>
            {saved ? <><Check size={16} /> Salvo!</> : <><Pencil size={16} /> Salvar Pergunta</>}
          </button>
        </div>
      </main>
    </div>
  );
}
