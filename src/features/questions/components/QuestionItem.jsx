import { motion as Motion } from "motion/react";
import { Check, X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Card de pergunta selecionável + editável estilo carta de baralho.
 * Usado em ChooseQuestionsPage.
 */
export function QuestionItem({
  question,
  index,
  suitConfig,
  isSelected,
  isEditing,
  editText,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onChangeEditText,
}) {
  const SuitIcon = suitConfig.Icon;
  return (
    <Motion.button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`Pergunta ${question.id}: ${question.text}`}
      onClick={() => !isEditing && onToggle(question.id)}
      initial={{ y: 60, opacity: 0, rotate: -2 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={!isEditing ? { y: -8, rotate: index % 2 === 0 ? -1 : 1, scale: 1.02 } : undefined}
      className={cn(
        "relative cursor-pointer text-left rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2 min-h-[200px] transition-shadow",
        "focus-visible:outline-2 focus-visible:outline-balatro-gold focus-visible:outline-offset-2",
        isSelected ? "border-balatro-gold" : "border-balatro-card-edge",
      )}
      style={{
        boxShadow: isSelected
          ? "0 14px 0 #000, 0 22px 36px rgba(240,192,64,0.4)"
          : "0 8px 0 #000, 0 16px 28px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top corner */}
      <div className="flex items-start justify-between" style={{ color: suitConfig.color }}>
        <div className="flex flex-col items-center leading-none">
          <span className="font-pixel text-base">{question.rank}</span>
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
          onChange={(e) => onChangeEditText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-balatro-bg-deep/60 border-2 border-balatro-purple rounded-md p-2 text-xs text-balatro-text resize-none font-mono outline-none"
        />
      ) : (
        <p className="flex-1 text-[12px] leading-snug text-balatro-text-dim">{question.text}</p>
      )}

      {/* Footer */}
      {isEditing ? (
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onSaveEdit(); }}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-balatro-green text-white font-pixel text-[8px] tracking-wider"
          >
            <Check size={12} /> SALVAR
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCancelEdit(); }}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-balatro-card-edge text-balatro-text font-pixel text-[8px] tracking-wider"
          >
            <X size={12} /> CANCEL
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); onStartEdit(question); }}
          className="flex items-center justify-center gap-1 py-1 rounded-md border border-balatro-card-edge text-balatro-text-dim hover:text-balatro-text hover:border-balatro-purple font-pixel text-[8px] tracking-wider transition-colors"
        >
          <Pencil size={10} /> EDITAR
        </button>
      )}

      {/* Bottom corner */}
      <div className="flex items-end justify-between rotate-180" style={{ color: suitConfig.color }}>
        <div className="flex flex-col items-center leading-none">
          <span className="font-pixel text-base">{question.rank}</span>
          <SuitIcon size={14} fill="currentColor" />
        </div>
      </div>
    </Motion.button>
  );
}
