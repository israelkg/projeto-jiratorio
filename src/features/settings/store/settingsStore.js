import { create } from "zustand";
import { persist } from "zustand/middleware";

export const QUALITY = {
  LOW: "low",
  MEDIUM: "medium",
  ULTRA: "ultra",
};

export const QUALITY_PRESETS = {
  low: {
    label: "Baixa",
    sub: "Performance máxima",
    color: "#50c878",
    background: "static",      // só gradient base
    redWash: false,            // sem swirl vermelho de fundo
    scanlines: false,          // sem CRT
    vignette: false,           // sem vinheta
    floatingSuits: 0,          // sem naipes
    foilShimmer: false,        // sem foil
    glowText: false,           // sem text-shadow
    decorative3D: false,       // LoadingPage sem rotate3D
    noise: false,              // sem turbulência
  },
  medium: {
    label: "Média",
    sub: "Balanceado",
    color: "#f0c040",
    background: "animated-light", // 2 blobs leves
    redWash: true,
    scanlines: true,
    vignette: true,
    floatingSuits: 3,
    blobBlur: 40,
    foilShimmer: true,
    glowText: true,
    decorative3D: true,
    noise: false,
  },
  ultra: {
    label: "Ultra",
    sub: "Visual completo",
    color: "#fe5f55",
    background: "full-effects",   // 3 blobs + SVG goo morph
    redWash: true,
    scanlines: true,
    vignette: true,
    floatingSuits: 6,
    blobBlur: 64,
    foilShimmer: true,
    glowText: true,
    decorative3D: true,
    noise: true,
    suitsGlow: true,              // drop-shadow nos naipes
  },
};

export const useSettingsStore = create(
  persist(
    (set) => ({
      quality: QUALITY.MEDIUM,
      setQuality: (q) => set({ quality: q }),
    }),
    { name: "jiratorio-settings" },
  ),
);

export const useQuality = () => {
  const quality = useSettingsStore((s) => s.quality);
  return QUALITY_PRESETS[quality] ?? QUALITY_PRESETS[QUALITY.MEDIUM];
};
