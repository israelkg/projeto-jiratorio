import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Pencil, Trash2, Check, AlertTriangle, Spade,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { cn } from "@/lib/utils";

const DEFAULT_QUESTION = {
  id: 1,
  text: "Explique o processo de meiose e sua importância genética para as células reprodutivas.",
};

export default function EditQuestionPage({ question = DEFAULT_QUESTION, onSave, onDelete }) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

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
    navigate(-1);
  };

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Card Editor · #{String(question.id).padStart(3, "0")}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-blue transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-blue transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-blue text-glow-blue uppercase flex items-center justify-center gap-2">
            <Pencil size={14} /> Card Editor <Pencil size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(0,157,255,0.5))" }}>
            EDITAR PERGUNTA
          </h1>
        </Motion.div>

        <Motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 20 }}
          className="relative w-full max-w-2xl rounded-2xl border-4 border-balatro-blue bg-balatro-card overflow-hidden"
          style={{ boxShadow: "0 16px 0 #000, 0 24px 48px rgba(0,157,255,0.3)" }}
        >
          {/* Top corners */}
          <div className="flex items-start justify-between p-4 pb-0" style={{ color: "#009dff" }}>
            <div className="flex flex-col items-center leading-none">
              <span className="font-pixel text-base">Q</span>
              <Spade size={14} fill="currentColor" />
            </div>
            <span className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
              Pergunta · #{String(question.id).padStart(3, "0")}
            </span>
            <div className="flex flex-col items-center leading-none rotate-180">
              <span className="font-pixel text-base">Q</span>
              <Spade size={14} fill="currentColor" />
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="font-pixel text-[9px] tracking-[0.3em] text-balatro-text-dim uppercase mb-2">
              Texto da pergunta
            </p>
            <textarea
              value={editText}
              onChange={(e) => { setEditText(e.target.value); setSaved(false); }}
              rows={6}
              className="w-full bg-balatro-bg-deep border-2 border-balatro-card-edge focus:border-balatro-blue rounded-lg p-4 text-base text-balatro-text leading-relaxed font-mono outline-none resize-none transition-colors"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="font-pixel text-[8px] tracking-[0.2em] text-balatro-text-dim uppercase">
                {editText.length} caracteres
              </span>
              {isDirty && (
                <span className="font-pixel text-[8px] tracking-[0.2em] text-balatro-gold uppercase flex items-center gap-1">
                  <AlertTriangle size={10} /> Alterado
                </span>
              )}
            </div>
          </div>

          {/* Bottom corners */}
          <div className="flex items-end justify-between p-4 pt-0" style={{ color: "#009dff" }}>
            <div className="flex flex-col items-center leading-none rotate-180">
              <span className="font-pixel text-base">Q</span>
              <Spade size={14} fill="currentColor" />
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className="font-pixel text-base">Q</span>
              <Spade size={14} fill="currentColor" />
            </div>
          </div>
        </Motion.div>

        {confirmDelete && (
          <Motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-lg border-2 border-balatro-red bg-balatro-red/15 px-4 py-2 flex items-center gap-2"
          >
            <AlertTriangle size={14} className="text-balatro-red" />
            <span className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase">
              Clique novamente para confirmar
            </span>
          </Motion.div>
        )}

        {/* Actions */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <Motion.button
            onClick={handleDelete}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ y: 2, scale: 0.98 }}
            className={cn(
              "px-8 py-4 rounded-2xl font-pixel text-[11px] tracking-[0.25em] uppercase border-b-4 flex items-center gap-2",
              confirmDelete
                ? "bg-balatro-red text-white border-red-950 animate-pulse"
                : "bg-balatro-card text-balatro-red border-black hover:bg-balatro-red/20",
            )}
          >
            <Trash2 size={14} />
            {confirmDelete ? "Confirmar?" : "Excluir"}
          </Motion.button>
          <Motion.button
            onClick={handleSave}
            disabled={!isDirty || !editText.trim()}
            whileHover={isDirty && editText.trim() && { y: -3, scale: 1.03 }}
            whileTap={isDirty && editText.trim() && { y: 2, scale: 0.98 }}
            className={cn(
              "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
              saved
                ? "bg-balatro-green text-white border-green-900"
                : !isDirty || !editText.trim()
                  ? "bg-balatro-card-edge text-balatro-text-dim border-black opacity-50 cursor-not-allowed"
                  : "bg-balatro-blue text-white border-blue-950 hover:shadow-balatro-glow-blue",
            )}
          >
            {saved ? <><Check size={18} /> Salvo!</> : <><Check size={18} /> Salvar</>}
          </Motion.button>
        </Motion.div>
      </main>
    </CRTFrame>
  );
}
