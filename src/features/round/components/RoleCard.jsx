import { motion as Motion } from "motion/react";
import { Volume2, Skull } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  purple: { color: "#9b59b6", suit: "♠", borderClass: "border-balatro-purple", DefaultIcon: Volume2 },
  red:    { color: "#fe5f55", suit: "♥", borderClass: "border-balatro-red",    DefaultIcon: Skull },
};

/**
 * Card estilo carta de baralho exibindo papel + nome do aluno.
 * Usado em SortDrawPage e RoundQuestionPage.
 */
export function RoleCard({
  role,
  name,
  variant = "purple",
  Icon,
  className,
  delay = 0,
  size = "md",
}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.purple;
  const RoleIcon = Icon ?? cfg.DefaultIcon;

  const dimensions = size === "lg"
    ? "w-44 h-60"
    : "";

  return (
    <Motion.div
      initial={{ y: 30, opacity: 0, scale: 0.92 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 240, damping: 22 }}
      className={cn(
        "rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-3 gap-2",
        cfg.borderClass,
        dimensions,
        className,
      )}
      style={{ boxShadow: `0 10px 0 #000, 0 16px 28px ${cfg.color}40` }}
    >
      <div className="flex items-center justify-between" style={{ color: cfg.color }}>
        <span className="font-pixel text-[9px] tracking-[0.25em] uppercase">{role}</span>
        <span className="font-pixel text-xl">{cfg.suit}</span>
      </div>
      <div
        className="rounded-lg flex flex-col items-center justify-center py-4 gap-2 flex-1"
        style={{
          background: `linear-gradient(180deg, ${cfg.color}25, ${cfg.color}05)`,
          color: cfg.color,
        }}
      >
        <RoleIcon size={size === "lg" ? 48 : 30} />
        <span className="font-pixel text-[10px] tracking-[0.15em] uppercase text-balatro-text">
          {name}
        </span>
      </div>
    </Motion.div>
  );
}
