import { motion } from "motion/react";

const WORDS = [
  { t: "कविता", f: "deva", x: "8%", y: "18%", s: "3.2rem", o: 0.18, d: 0 },
  { t: "Story", f: "display", x: "78%", y: "12%", s: "2.6rem", o: 0.16, d: 1.5 },
  { t: "கதை", f: "deva", x: "12%", y: "72%", s: "2.8rem", o: 0.14, d: 0.8 },
  { t: "Verse", f: "serif", x: "82%", y: "68%", s: "3rem", o: 0.18, d: 2.2 },
  { t: "শব্দ", f: "deva", x: "45%", y: "8%", s: "2.2rem", o: 0.13, d: 1.2 },
  { t: "Lyric", f: "display", x: "5%", y: "45%", s: "2.4rem", o: 0.15, d: 0.4 },
  { t: "ਸ਼ਬਦ", f: "deva", x: "88%", y: "42%", s: "2.6rem", o: 0.14, d: 1.8 },
  { t: "Screenplay", f: "serif", x: "55%", y: "85%", s: "2rem", o: 0.16, d: 2.6 },
];

const FONT_MAP: Record<string, string> = {
  deva: "var(--font-deva)",
  display: "var(--font-display)",
  serif: "var(--font-serif)",
};

export function FloatingWords() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {WORDS.map((w, i) => (
        <motion.span
          key={i}
          className="absolute select-none italic"
          style={{
            left: w.x,
            top: w.y,
            fontFamily: FONT_MAP[w.f],
            fontSize: w.s,
            color: "var(--ink)",
            opacity: w.o,
            ["--dx" as string]: `${(i % 2 ? -1 : 1) * 14}px`,
            ["--dy" as string]: `${(i % 3 ? -1 : 1) * 18}px`,
            ["--r" as string]: `${(i % 2 ? -1 : 1) * 1.5}deg`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: w.o, y: 0 }}
          transition={{ duration: 2.4, delay: w.d * 0.3 }}
        >
          <span className="animate-drift inline-block" style={{ animationDelay: `${w.d}s` }}>
            {w.t}
          </span>
        </motion.span>
      ))}
    </div>
  );
}
