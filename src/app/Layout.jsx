import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { BalatroBackground } from "@/components/balatro/BalatroBackground";
import { DevNav } from "@/components/dev/DevNav";
import { useSettingsStore } from "@/features/settings/store/settingsStore";

function RouteFallback() {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="font-pixel text-[10px] tracking-[0.4em] text-balatro-text-dim uppercase animate-pulse">
        ◆ Carregando ◆
      </div>
    </div>
  );
}

export function Layout() {
  const quality = useSettingsStore((s) => s.quality);
  return (
    <div
      className="relative min-h-screen bg-balatro-bg-deep"
      data-quality={quality}
    >
      <BalatroBackground />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
      {import.meta.env.DEV && <DevNav />}
    </div>
  );
}
