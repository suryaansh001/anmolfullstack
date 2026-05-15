import { motion } from "motion/react";

const LANGS = [
  { name: "Hindi", native: "हिन्दी", count: "12,400+ works" },
  { name: "Tamil", native: "தமிழ்", count: "8,200+ works" },
  { name: "Bengali", native: "বাংলা", count: "9,100+ works" },
  { name: "Gujarati", native: "ગુજરાતી", count: "4,300+ works" },
  { name: "English", native: "English", count: "18,700+ works" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ", count: "3,800+ works" },
];

export function Languages() {
  return (
    <section id="languages" className="relative py-32 px-6 overflow-hidden bg-gradient-cinematic">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 max-w-3xl"
        >
          <p className="font-hand text-xl mb-4" style={{ color: "var(--maroon)" }}>~ languages ~</p>
          <h2 className="font-display text-5xl md:text-7xl leading-tight" style={{ color: "var(--ink)" }}>
            Every language<br /><span className="italic font-light">deserves a stage.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 rounded-sm overflow-hidden">
          {LANGS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              className="group relative bg-card p-12 paper-texture overflow-hidden cursor-pointer"
            >
              <div className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-4">{l.name}</div>
              <div className="font-display text-6xl md:text-7xl mb-3 transition-colors duration-500 group-hover:italic" style={{ color: "var(--ink)", fontFamily: l.name === "English" ? "var(--font-display)" : "var(--font-deva)" }}>
                {l.native}
              </div>
              <div className="text-sm text-foreground/60 italic">{l.count}</div>
              <div
                className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                style={{ background: "var(--gold)" }}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-16 text-center font-serif-lit italic text-2xl text-foreground/60 max-w-2xl mx-auto">
          "Words travel further when they're allowed to keep their accent."
        </p>
      </div>
    </section>
  );
}
