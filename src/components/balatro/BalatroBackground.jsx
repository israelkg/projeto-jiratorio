import { motion as Motion, useReducedMotion } from "motion/react";
import { useQuality } from "@/features/settings/store/settingsStore";

export function BalatroBackground() {
  const reduced = useReducedMotion();
  const q = useQuality();
  const animationsOff = reduced || q.background === "static";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base radial — static */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, #1e3a8a 0%, #0a0a1a 40%, #050505 100%)",
        }}
      />

      {/* Red wash — só MEDIUM/ULTRA */}
      {q.redWash && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 25% 35%, #b91c1c 0%, transparent 55%),
              radial-gradient(ellipse 70% 55% at 75% 65%, #991b1b 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 55% 80%, #fe5f55 0%, transparent 50%)
            `,
            opacity: 0.7,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* MEDIUM e ULTRA: 2-3 blobs animados */}
      {!animationsOff && q.background !== "static" && (
        <>
          <Motion.div
            className="absolute top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full opacity-40 will-change-transform"
            style={{
              background: "radial-gradient(circle, #dc2626 0%, transparent 65%)",
              filter: `blur(${q.blobBlur}px)`,
            }}
            animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          <Motion.div
            className="absolute bottom-0 right-0 w-[70%] h-[70%] rounded-full opacity-30 will-change-transform"
            style={{
              background: "radial-gradient(circle, #fe5f55 0%, transparent 65%)",
              filter: `blur(${q.blobBlur}px)`,
            }}
            animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ULTRA: 3º blob + SVG goo morph */}
          {q.background === "full-effects" && (
            <>
              <Motion.div
                className="absolute top-1/2 left-1/3 w-[60%] h-[60%] rounded-full opacity-25 will-change-transform"
                style={{
                  background: "radial-gradient(circle, #be185d 0%, transparent 70%)",
                  filter: `blur(${q.blobBlur}px)`,
                }}
                animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0] }}
                transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
              />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <radialGradient id="bg-swirl" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fe5f55" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                  </radialGradient>
                  <filter id="bg-goo">
                    <feGaussianBlur stdDeviation="20" />
                  </filter>
                </defs>
                <g filter="url(#bg-goo)" opacity="0.6">
                  <Motion.path
                    d="M -100,400 Q 200,200 500,450 T 1100,400 L 1300,800 L -100,800 Z"
                    fill="url(#bg-swirl)"
                    animate={{
                      d: [
                        "M -100,400 Q 200,200 500,450 T 1100,400 L 1300,800 L -100,800 Z",
                        "M -100,500 Q 300,300 600,350 T 1200,500 L 1300,800 L -100,800 Z",
                        "M -100,400 Q 200,200 500,450 T 1100,400 L 1300,800 L -100,800 Z",
                      ],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                  />
                </g>
              </svg>
            </>
          )}
        </>
      )}

      {/* Grid overlay (sempre visível) */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(#fe5f55 1px, transparent 1px), linear-gradient(90deg, #fe5f55 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ULTRA: noise turbulence */}
      {q.noise && (
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />
      )}
    </div>
  );
}
