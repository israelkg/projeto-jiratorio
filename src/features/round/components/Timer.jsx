import { useEffect } from "react";
import { motion as Motion } from "motion/react";
import { Pause, Play, Plus, RotateCcw } from "lucide-react";
import { useRoundStore } from "../store/roundStore";
import { cn } from "@/lib/utils";

export function Timer({ compact = false }) {
  const timer = useRoundStore((s) => s.timer);
  const timerInitial = useRoundStore((s) => s.timerInitial);
  const timerRunning = useRoundStore((s) => s.timerRunning);
  const startTimer = useRoundStore((s) => s.startTimer);
  const pauseTimer = useRoundStore((s) => s.pauseTimer);
  const resetTimer = useRoundStore((s) => s.resetTimer);
  const tickTimer = useRoundStore((s) => s.tickTimer);
  const addTime = useRoundStore((s) => s.addTime);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(tickTimer, 1000);
    return () => clearInterval(id);
  }, [timerRunning, tickTimer]);

  const pct = (timer / timerInitial) * 100;
  const danger = timer <= 5 && timer > 0;
  const expired = timer === 0;
  const color = expired ? "#fe5f55" : danger ? "#fe5f55" : timer <= 10 ? "#f0c040" : "#50c878";

  return (
    <div className={cn("flex flex-col items-center gap-3", compact ? "" : "w-full max-w-md")}>
      <Motion.div
        animate={danger && timerRunning ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: danger && timerRunning ? Infinity : 0 }}
        className="relative"
      >
        <div
          className={cn(
            "rounded-2xl border-4 bg-balatro-card px-8 py-4 flex items-center gap-3",
            compact ? "" : "shadow-[0_10px_0_#000,0_16px_28px_rgba(0,0,0,0.6)]",
          )}
          style={{ borderColor: color }}
        >
          <Motion.span
            key={timer}
            initial={{ scale: 1.4, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-pixel tabular-nums"
            style={{
              color,
              fontSize: compact ? "1.5rem" : "2.5rem",
              textShadow: `0 0 16px ${color}`,
            }}
          >
            {String(timer).padStart(2, "0")}s
          </Motion.span>
        </div>
      </Motion.div>

      {/* Bar */}
      <div
        className={cn(
          "relative w-full h-2 rounded-full border-2 border-balatro-card-edge bg-balatro-bg-deep overflow-hidden",
          compact && "max-w-[140px]",
        )}
      >
        <Motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>

      {/* Controls */}
      {!compact && (
        <div className="flex items-center gap-2">
          {!timerRunning && timer > 0 && (
            <ControlBtn onClick={startTimer} color="#50c878" Icon={Play} label="Iniciar" />
          )}
          {timerRunning && (
            <ControlBtn onClick={pauseTimer} color="#f0c040" Icon={Pause} label="Pausar" />
          )}
          <ControlBtn onClick={resetTimer} color="#9b59b6" Icon={RotateCcw} label="Reset" />
          <ControlBtn onClick={() => addTime(30)} color="#009dff" Icon={Plus} label="+30s" />
        </div>
      )}
    </div>
  );
}

function ControlBtn({ onClick, color, Icon, label }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-current font-pixel text-[9px] tracking-[0.2em] uppercase"
      style={{ color, background: `${color}10` }}
      aria-label={label}
    >
      <Icon size={12} />
      {label}
    </Motion.button>
  );
}
