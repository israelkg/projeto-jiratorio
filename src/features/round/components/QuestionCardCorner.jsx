import { Spade } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Canto estilo carta de baralho com letra + naipe.
 * Usado nos 4 cantos do Boss Blind question card.
 */
export function QuestionCardCorner({ letter, flip = false }) {
  return (
    <div className={cn("flex flex-col items-center leading-none", flip && "rotate-180")}>
      <span className="font-pixel text-sm">{letter}</span>
      <Spade size={12} fill="currentColor" />
    </div>
  );
}
