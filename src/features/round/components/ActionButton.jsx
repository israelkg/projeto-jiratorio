import { motion as Motion } from "motion/react";

/**
 * Botão colorido compacto pra ações de rodada (Acertou/Errou/Repassar/Revelar).
 * Mantém estilo inline pois aceita cor arbitrária.
 */
export function ActionButton({ onClick, color, Icon, label, ariaLabel }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ y: 2, scale: 0.96 }}
      className="px-4 py-3 rounded-xl border-b-4 font-pixel text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: color,
        color: color === "#f0c040" ? "#0a0a1a" : "#fff",
        borderColor: "rgba(0,0,0,0.5)",
        outlineColor: color,
      }}
    >
      <Icon size={14} />
      {label}
    </Motion.button>
  );
}
