import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Settings, Check, Zap, Gauge, Sparkles,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { useSettingsStore, QUALITY_PRESETS } from "@/features/settings/store/settingsStore";
import { cn } from "@/lib/utils";

const QUALITY_ICONS = {
  low:    Gauge,
  medium: Zap,
  ultra:  Sparkles,
};

export default function SettingsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const quality = useSettingsStore((s) => s.quality);
  const setQuality = useSettingsStore((s) => s.setQuality);

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
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
          Settings
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

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-10 flex flex-col items-center gap-10">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <Settings size={14} /> Settings <Settings size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            OPÇÕES
          </h1>
        </Motion.div>

        {/* Quality section */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Gauge size={14} className="text-balatro-gold" />
            <span className="font-pixel text-[11px] tracking-[0.3em] text-balatro-gold text-glow-gold uppercase">
              Qualidade Gráfica
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(QUALITY_PRESETS).map(([key, preset], i) => {
              const Icon = QUALITY_ICONS[key];
              const active = quality === key;
              return (
                <Motion.button
                  key={key}
                  type="button"
                  onClick={() => setQuality(key)}
                  initial={{ y: 40, opacity: 0, rotate: -3 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 220, damping: 20 }}
                  whileHover={{ y: -8, scale: 1.03, rotate: i % 2 === 0 ? -1 : 1 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={active}
                  className={cn(
                    "relative cursor-pointer rounded-xl border-4 bg-balatro-card overflow-hidden flex flex-col p-4 gap-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                  style={{
                    borderColor: active ? preset.color : "var(--color-balatro-card-edge)",
                    boxShadow: active
                      ? `0 14px 0 #000, 0 22px 36px ${preset.color}55`
                      : "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)",
                    outlineColor: preset.color,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
                      style={{
                        borderColor: preset.color,
                        color: preset.color,
                        background: `${preset.color}15`,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    {active && (
                      <Motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-balatro-gold border-2 border-yellow-700 flex items-center justify-center"
                      >
                        <Check size={14} className="text-balatro-bg-deep" strokeWidth={3} />
                      </Motion.div>
                    )}
                  </div>

                  <div>
                    <p
                      className="font-pixel text-base tracking-[0.2em] uppercase mb-1"
                      style={{
                        color: preset.color,
                        textShadow: active ? `0 0 12px ${preset.color}` : "none",
                      }}
                    >
                      {preset.label}
                    </p>
                    <p className="text-[11px] text-balatro-text-dim leading-snug">
                      {preset.sub}
                    </p>
                  </div>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-1 mt-2">
                    <FeatureRow on={preset.background !== "static"} label="Fundo animado" color={preset.color} />
                    <FeatureRow on={preset.redWash}       label="Swirl vermelho"  color={preset.color} />
                    <FeatureRow on={preset.noise}         label="Noise turbulence" color={preset.color} />
                    <FeatureRow on={preset.scanlines}     label="Scanlines CRT"   color={preset.color} />
                    <FeatureRow on={preset.vignette}      label="Vinheta CRT"     color={preset.color} />
                    <FeatureRow on={preset.foilShimmer}   label="Foil shimmer"    color={preset.color} />
                    <FeatureRow on={preset.glowText}      label="Glow nos textos" color={preset.color} />
                    <FeatureRow on={preset.decorative3D}  label="3D / rotações"   color={preset.color} />
                    <FeatureRow on={preset.floatingSuits > 0} label={`Naipes flutuantes (${preset.floatingSuits})`} color={preset.color} />
                  </ul>
                </Motion.button>
              );
            })}
          </div>

          <p className="text-center font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase mt-2">
            ◆ Salvo automaticamente · {QUALITY_PRESETS[quality].label} ◆
          </p>
        </div>
      </main>
    </CRTFrame>
  );
}

function FeatureRow({ on, label, color }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-sm border flex items-center justify-center flex-shrink-0"
        style={{
          borderColor: on ? color : "rgba(255,255,255,0.2)",
          background: on ? color : "transparent",
        }}
      >
        {on && <Check size={8} className="text-balatro-bg-deep" strokeWidth={4} />}
      </span>
      <span
        className="font-pixel text-[9px] tracking-[0.15em] uppercase"
        style={{ color: on ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
    </li>
  );
}
