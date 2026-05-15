import { motion } from "motion/react";
import { Particles } from "./Particles";

const VERSES = [
  { text: "वो जो शब्दों में नहीं कह सका,\nवो खामोशी में लिख दिया।", author: "— Anonymous", lang: "Hindi" },
  { text: "I keep my words in a small wooden box,\nthe way grandmothers keep saffron.", author: "— Meera Pillai", lang: "English" },
  { text: "চোখের জল কাগজে পড়ে\nকবিতা হয়ে যায়।", author: "— Riya Das", lang: "Bengali" },
];

export function Poetry() {
  return (
    <section id="poetry" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, oklch(0.42 0.12 25 / 0.08), transparent 60%)" }} />
      <Particles count={50} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="font-hand text-2xl mb-4" style={{ color: "var(--maroon)" }}>~ poetry ~</p>
          <h2 className="font-display text-5xl md:text-7xl leading-tight" style={{ color: "var(--ink)" }}>
            A gallery of <span className="italic font-light">verses.</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {VERSES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className={`relative max-w-2xl ${i % 2 ? "ml-auto text-right" : ""}`}
            >
              {/* ink blot */}
              <div
                className="absolute -top-8 -left-6 w-32 h-32 rounded-full opacity-10 blur-2xl"
                style={{ background: i === 0 ? "var(--ink)" : i === 1 ? "var(--maroon)" : "var(--gold)" }}
              />
              <p
                className={`font-serif-lit italic text-3xl md:text-5xl leading-snug whitespace-pre-line ${v.lang !== "English" ? "font-deva" : ""}`}
                style={{ color: "var(--ink)" }}
              >
                {v.text}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-foreground/60" style={{ justifyContent: i % 2 ? "flex-end" : "flex-start" }}>
                <span className="h-px w-12" style={{ background: "var(--gold)" }} />
                <span className="italic">{v.author}</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40">{v.lang}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
