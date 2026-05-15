import { useMemo } from "react";

export function Particles({ count = 30, className = "" }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 2.5,
        d: Math.random() * 8,
        dur: 12 + Math.random() * 18,
        o: 0.15 + Math.random() * 0.35,
        i,
      })),
    [count],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((p) => (
        <span
          key={p.i}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: "var(--gold)",
            opacity: p.o,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.dur}s`,
            ["--dx" as string]: `${(p.i % 2 ? -1 : 1) * 30}px`,
            ["--dy" as string]: `${(p.i % 3 ? -1 : 1) * 40}px`,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}

export function PaperFragments() {
  const frags = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        x: 10 + Math.random() * 80,
        y: Math.random() * 100,
        rot: -20 + Math.random() * 40,
        d: Math.random() * 6,
        i,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {frags.map((f) => (
        <div
          key={f.i}
          className="absolute animate-drift"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: 80,
            height: 110,
            background: "oklch(0.96 0.025 85 / 0.55)",
            transform: `rotate(${f.rot}deg)`,
            boxShadow: "0 8px 22px -8px oklch(0.3 0.05 60 / 0.25)",
            animationDelay: `${f.d}s`,
            ["--dx" as string]: `${(f.i % 2 ? -1 : 1) * 18}px`,
            ["--dy" as string]: `${(f.i % 2 ? -1 : 1) * 22}px`,
            ["--r" as string]: `${f.rot}deg`,
            backgroundImage:
              "linear-gradient(transparent 24px, oklch(0.32 0.06 250 / 0.12) 25px), linear-gradient(transparent 50px, oklch(0.32 0.06 250 / 0.12) 51px), linear-gradient(transparent 76px, oklch(0.32 0.06 250 / 0.12) 77px)",
          }}
        />
      ))}
    </div>
  );
}
