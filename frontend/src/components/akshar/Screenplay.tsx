import { motion } from "motion/react";

export function Screenplay() {
  return (
    <section id="screenplay" className="relative py-32 overflow-hidden" style={{ background: "var(--charcoal)", color: "var(--parchment)" }}>
      {/* spotlight */}
      <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.72 0.13 75 / 0.25), transparent 50%)" }} />
      {/* film grain */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "var(--noise)" }} />

      {/* film strip top */}
      <div className="absolute top-8 inset-x-0 h-8 flex justify-around" style={{ background: "oklch(0.12 0.01 60)" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="w-3 h-3 mt-2.5 rounded-sm" style={{ background: "var(--parchment)" }} />
        ))}
      </div>
      <div className="absolute bottom-8 inset-x-0 h-8 flex justify-around" style={{ background: "oklch(0.12 0.01 60)" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="w-3 h-3 mt-2.5 rounded-sm" style={{ background: "var(--parchment)" }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)" }}>SCENE 01 — INT. THEATRE — NIGHT</p>
            <h2 className="font-display text-5xl md:text-7xl leading-tight" style={{ color: "var(--parchment)" }}>
              The screen<br /><span className="italic font-light" style={{ color: "var(--gold-soft)" }}>is yours.</span>
            </h2>
            <p className="mt-6 font-serif-lit text-xl text-parchment/70 max-w-lg">
              Format scenes, build characters, draft dialogue — with industry-standard screenplay tools wrapped in a cinematic writing experience.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
              {[
                { k: "Scenes", v: "Auto-format" },
                { k: "Dialogue", v: "Live blocking" },
                { k: "Drafts", v: "Versioned" },
              ].map((s) => (
                <div key={s.k} className="border-l border-parchment/20 pl-4">
                  <div className="text-xs tracking-widest uppercase text-parchment/50">{s.k}</div>
                  <div className="font-display text-lg mt-1" style={{ color: "var(--gold-soft)" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock screenplay page */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative paper-texture text-charcoal p-10 shadow-elevated"
            style={{ background: "var(--parchment)", color: "var(--charcoal)" }}
          >
            <div className="absolute top-3 right-4 font-mono text-[10px] text-foreground/40">DRAFT 03 · 42.</div>
            <div className="font-mono text-sm space-y-4 leading-relaxed">
              <p className="font-bold tracking-wider">INT. SMALL CAFE — RAJESHWARI ROAD — DUSK</p>
              <p className="text-foreground/80">A monsoon hum. The window fogs. RAJ (32), a tired screenwriter, stirs his cutting chai with a pen.</p>
              <div className="pl-20">
                <p className="font-bold">RAJ</p>
                <p className="pl-4 text-foreground/85">(quietly, to no one)<br/>Some stories don't end. They just... wait.</p>
              </div>
              <p className="text-foreground/80">MEERA enters, drenched. She holds an envelope.</p>
              <div className="pl-20">
                <p className="font-bold">MEERA</p>
                <p className="pl-4 text-foreground/85">You forgot this. Twenty years ago.</p>
              </div>
              <p className="font-bold tracking-wider pt-2">CUT TO:</p>
            </div>

            {/* spotlight sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: ["-30%", "130%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.85 0.06 80 / 0.18), transparent)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
