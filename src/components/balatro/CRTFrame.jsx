import { cn } from "@/lib/utils";
import { useQuality } from "@/features/settings/store/settingsStore";

export function CRTFrame({ children, className, withVignette = true, withScanlines = true }) {
  const q = useQuality();
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden",
        withScanlines && q.scanlines && "crt-scanlines",
        withVignette && q.vignette && "crt-vignette",
        className,
      )}
    >
      {children}
    </div>
  );
}
