import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Wrench, X, Gauge, Zap, Sparkles } from "lucide-react";
import { ROUTES } from "@/app/router";
import { useSettingsStore, QUALITY_PRESETS } from "@/features/settings/store/settingsStore";
import { cn } from "@/lib/utils";

const QUALITY_ICON = { low: Gauge, medium: Zap, ultra: Sparkles };

export function DevNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const quality = useSettingsStore((s) => s.quality);
  const setQuality = useSettingsStore((s) => s.setQuality);

  return (
    <div className="fixed bottom-4 right-4 z-[100] font-pixel">
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="absolute bottom-14 right-0 w-72 max-h-[70vh] overflow-y-auto rounded-xl border-2 border-balatro-card-edge bg-balatro-bg-deep/95 backdrop-blur-md shadow-2xl"
          >
            <div className="px-4 py-3 border-b-2 border-balatro-card-edge">
              <p className="text-[9px] tracking-[0.3em] text-balatro-red text-glow-red uppercase">
                ◆ Dev Nav ◆
              </p>
              <p className="text-[8px] tracking-widest text-balatro-text-dim uppercase mt-1">
                Atalhos de QA · só em dev
              </p>
            </div>

            {/* Quality switcher */}
            <div className="px-4 py-3 border-b-2 border-balatro-card-edge bg-black/30">
              <p className="text-[8px] tracking-[0.3em] text-balatro-gold text-glow-gold uppercase mb-2">
                Qualidade
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(QUALITY_PRESETS).map(([key, preset]) => {
                  const Icon = QUALITY_ICON[key];
                  const active = quality === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setQuality(key)}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2 rounded-md border-2 transition-all",
                        active ? "border-current" : "border-balatro-card-edge",
                      )}
                      style={{
                        color: active ? preset.color : "rgba(255,255,255,0.5)",
                        background: active ? `${preset.color}15` : "transparent",
                      }}
                    >
                      <Icon size={14} />
                      <span className="text-[8px] tracking-[0.15em] uppercase">{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ul className="flex flex-col py-2">
              {ROUTES.map((r) => {
                const active = r.path === location.pathname;
                return (
                  <li key={r.path}>
                    <Link
                      to={r.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-colors",
                        active
                          ? "text-balatro-red bg-balatro-red/10"
                          : "text-balatro-text-dim hover:text-balatro-text hover:bg-white/5",
                      )}
                    >
                      <span>{r.label}</span>
                      <span className="text-balatro-card-edge">{r.path}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.button
        whileHover={{ scale: 1.05, rotate: open ? 0 : 12 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar navegação de desenvolvimento" : "Abrir navegação de desenvolvimento"}
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-balatro-red border-b-4 border-red-950 flex items-center justify-center text-white shadow-balatro-glow-red"
      >
        {open ? <X size={20} /> : <Wrench size={20} />}
      </Motion.button>
    </div>
  );
}
