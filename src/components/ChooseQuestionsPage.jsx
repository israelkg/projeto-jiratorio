import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Pencil, Check, X,
  LayoutList, CheckSquare, Square, Spade, Heart, Diamond, Club,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";

import { cn } from "@/lib/utils";

const INITIAL_QUESTIONS = [
  { id: 1, text: "O que é mitose e como ela ocorre nas células eucarióticas?",       suit: "spade",   rank: "A" },
  { id: 2, text: "A fotossíntese ocorre nos cloroplastos das células vegetais?",      suit: "heart",   rank: "K" },
  { id: 3, text: "Explique o processo de meiose e sua importância genética.",         suit: "diamond", rank: "Q" },
  { id: 4, text: "Qual é a fórmula molecular da água e suas propriedades?",           suit: "club",    rank: "J" },
  { id: 5, text: "Descreva a estrutura do DNA e o modelo da dupla hélice.",           suit: "spade",   rank: "10" },
  { id: 6, text: "Quais são as principais diferenças entre células procarióticas e eucarióticas?", suit: "heart", rank: "9" },
  { id: 7, text: "O que são enzimas e qual é o seu papel no metabolismo celular?",    suit: "diamond", rank: "8" },
  { id: 8, text: "Como funciona a replicação do DNA durante a divisão celular?",       suit: "club",    rank: "7" },
];

const SUITS = {
  spade:   { Icon: Spade,   color: "#f5f5f0" },
  heart:   { Icon: Heart,   color: "#fe5f55" },
  diamond: { Icon: Diamond, color: "#f0c040" },
  club:    { Icon: Club,    color: "#50c878" },
};

export default function ChooseQuestionsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selected, setSelected] = useState(new Set(INITIAL_QUESTIONS.map((q) => q.id)));
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleSelect = (id) => {
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(questions.map((q) => q.id)));
  const deselectAll = () => setSelected(new Set());

  const startEdit = (q) => { setEditingId(q.id); setEditText(q.text); };
  const saveEdit = () => {
    setQuestions((qs) => qs.map((q) => (q.id === editingId ? { ...q, text: editText } : q)));
    setEditingId(null);
  };

  const handleConfirm = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      

      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Hand Selection
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-purple transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-6">
        {/* Title */}
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <LayoutList size={14} /> Hand Selection <LayoutList size={14} />
          </p>
          <h1 className="font-pixel text-2xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            ESCOLHER PERGUNTAS
          </h1>
        </Motion.div>

        {/* Toolbar */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-5xl flex items-center justify-between gap-4 rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md px-5 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text-dim">
              Selecionadas:
            </div>
            <span className="font-pixel text-base text-balatro-gold text-glow-gold tabular-nums">
              {selected.size}/{questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ToolbarButton onClick={selectAll}>
              <CheckSquare size={12} /> Todas
            </ToolbarButton>
            <ToolbarButton onClick={deselectAll}>
              <Square size={12} /> Nenhuma
            </ToolbarButton>
          </div>
        </Motion.div>

        {/* Questions hand */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {questions.map((q, i) => {
            const isSelected = selected.has(q.id);
            const isEditing = editingId === q.id;
            const suitCfg = SUITS[q.suit];
            const SuitIcon = suitCfg.Icon;
            return (
              <Motion.button
                key={q.id}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`Pergunta ${q.id}: ${q.text}`}
                onClick={() => !isEditing && toggleSelect(q.id)}
                initial={{ y: 60, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={!isEditing && { y: -8, rotate: i % 2 === 0 ? -1 : 1, scale: 1.02 }}
                className={cn(
                  "relative cursor-pointer text-left rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2 min-h-[200px] transition-shadow focus-visible:outline-2 focus-visible:outline-balatro-gold focus-visible:outline-offset-2",
                  isSelected ? "border-balatro-gold" : "border-balatro-card-edge",
                )}
                style={{
                  boxShadow: isSelected
                    ? "0 14px 0 #000, 0 22px 36px rgba(240,192,64,0.4)"
                    : "0 8px 0 #000, 0 16px 28px rgba(0,0,0,0.6)",
                }}
              >
                {/* Top corner */}
                <div className="flex items-start justify-between" style={{ color: suitCfg.color }}>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-pixel text-base">{q.rank}</span>
                    <SuitIcon size={14} fill="currentColor" />
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-balatro-gold border-2 border-yellow-700 flex items-center justify-center">
                      <Check size={14} className="text-balatro-bg-deep" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Body */}
                {isEditing ? (
                  <textarea
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-balatro-bg-deep/60 border-2 border-balatro-purple rounded-md p-2 text-xs text-balatro-text resize-none font-mono outline-none"
                  />
                ) : (
                  <p className="flex-1 text-[12px] leading-snug text-balatro-text-dim">
                    {q.text}
                  </p>
                )}

                {/* Footer */}
                {isEditing ? (
                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); saveEdit(); }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-balatro-green text-white font-pixel text-[8px] tracking-wider"
                    >
                      <Check size={12} /> SALVAR
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-balatro-card-edge text-balatro-text font-pixel text-[8px] tracking-wider"
                    >
                      <X size={12} /> CANCEL
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(q); }}
                    className="flex items-center justify-center gap-1 py-1 rounded-md border border-balatro-card-edge text-balatro-text-dim hover:text-balatro-text hover:border-balatro-purple font-pixel text-[8px] tracking-wider transition-colors"
                  >
                    <Pencil size={10} /> EDITAR
                  </button>
                )}

                {/* Bottom corner (rotated) */}
                <div className="flex items-end justify-between rotate-180" style={{ color: suitCfg.color }}>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-pixel text-base">{q.rank}</span>
                    <SuitIcon size={14} fill="currentColor" />
                  </div>
                </div>
              </Motion.button>
            );
          })}
        </div>

        {/* Confirm button */}
        <Motion.button
          onClick={handleConfirm}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ y: 2, scale: 0.98 }}
          disabled={selected.size === 0}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            saved
              ? "bg-balatro-green text-white border-green-900"
              : selected.size === 0
                ? "bg-balatro-card-edge text-balatro-text-dim border-black cursor-not-allowed opacity-50"
                : "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.6)]",
          )}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><Check size={18} /> Confirmar Seleção</>}
        </Motion.button>
      </main>
    </CRTFrame>
  );
}

function ToolbarButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-balatro-bg-deep border border-balatro-card-edge text-balatro-text-dim hover:text-balatro-text hover:border-balatro-purple font-pixel text-[9px] tracking-[0.2em] uppercase transition-colors"
    >
      {children}
    </button>
  );
}
