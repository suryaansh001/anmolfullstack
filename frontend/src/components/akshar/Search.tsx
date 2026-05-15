import { AnimatePresence, motion } from "motion/react";
import { Search as SearchIcon, X } from "lucide-react";
import { useMemo, useState } from "react";

const MOODS = [
  { label: "melancholic", hue: "var(--ink)" },
  { label: "ecstatic", hue: "var(--gold)" },
  { label: "tender", hue: "var(--maroon)" },
  { label: "fierce", hue: "var(--maroon)" },
  { label: "wistful", hue: "var(--ink)" },
  { label: "luminous", hue: "var(--gold)" },
  { label: "restless", hue: "var(--ink)" },
  { label: "devotional", hue: "var(--maroon)" },
];

const GENRES = ["Poetry", "Lyrics", "Stories", "Screenplays", "Ghazal", "Haiku", "Memoir", "Folk Tale"];
const LANGUAGES = ["Hindi", "Tamil", "Bengali", "Gujarati", "English", "Punjabi", "Telugu", "Marathi"];

const FLOATING_SUGGESTIONS = [
  { t: "monsoon longing", x: "8%", y: "18%", d: 0 },
  { t: "मोहब्बत", x: "82%", y: "12%", d: 0.6, font: "deva" },
  { t: "midnight ghazals", x: "12%", y: "78%", d: 1.2 },
  { t: "diaspora memory", x: "78%", y: "72%", d: 0.3 },
  { t: "ਸੁਪਨੇ", x: "5%", y: "48%", d: 0.9, font: "deva" },
  { t: "first rains", x: "88%", y: "44%", d: 1.5 },
  { t: "தனிமை", x: "45%", y: "8%", d: 1.8, font: "deva" },
];

export function Search() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);

  const activeFilters = useMemo(
    () => [mood && { k: "mood", v: mood, set: setMood }, genre && { k: "genre", v: genre, set: setGenre }, lang && { k: "language", v: lang, set: setLang }].filter(Boolean) as { k: string; v: string; set: (v: null) => void }[],
    [mood, genre, lang],
  );

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* ambient spotlight */}
      <motion.div
        animate={{ opacity: focused ? 0.55 : 0.2 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.85 0.06 80 / 0.6), transparent 55%)" }}
      />

      {/* floating genre/mood suggestions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATING_SUGGESTIONS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute italic select-none animate-drift"
            style={{
              left: s.x,
              top: s.y,
              fontFamily: s.font === "deva" ? "var(--font-deva)" : "var(--font-serif)",
              color: "var(--ink)",
              opacity: 0.18,
              fontSize: "1.4rem",
              animationDelay: `${s.d}s`,
              ["--dx" as string]: `${(i % 2 ? -1 : 1) * 18}px`,
              ["--dy" as string]: `${(i % 2 ? -1 : 1) * 22}px`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.18 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: s.d * 0.4 }}
          >
            {s.t}
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-hand text-xl mb-4" style={{ color: "var(--maroon)" }}>~ search ~</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-12" style={{ color: "var(--ink)" }}>
            Find a feeling.<br />
            <span className="italic font-light">Not just a word.</span>
          </h2>

          {/* search bar */}
          <div className="relative group">
            <motion.div
              animate={{ opacity: focused ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute -inset-2 rounded-full blur-2xl"
              style={{ background: "var(--gold)" }}
            />
            <div className={`relative flex items-center gap-3 paper-texture rounded-full pl-6 pr-2 py-2 shadow-paper border transition-colors ${focused ? "border-foreground/40" : "border-foreground/10"}`}>
              <SearchIcon className="w-5 h-5 text-foreground/40 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search by mood, language, genre, or emotion."
                className="flex-1 bg-transparent border-0 outline-none font-serif-lit italic text-lg placeholder:text-foreground/40 py-3 min-w-0"
              />
              <button className="px-5 h-11 rounded-full text-sm tracking-wider uppercase text-primary-foreground transition-transform hover:scale-[1.02] shrink-0"
                      style={{ background: "var(--ink)" }}>
                Search
              </button>
            </div>
          </div>

          {/* active filter chips */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 flex flex-wrap justify-center gap-2 overflow-hidden"
              >
                {activeFilters.map((f) => (
                  <motion.button
                    key={f.k + f.v}
                    layout
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    onClick={() => f.set(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-primary-foreground"
                    style={{ background: "var(--ink)" }}
                  >
                    <span className="opacity-60 uppercase tracking-widest text-[10px]">{f.k}</span>
                    <span className="italic font-serif-lit text-sm">{f.v}</span>
                    <X className="w-3 h-3 opacity-70" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* moods */}
          <div className="mt-12">
            <div className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4">explore by mood</div>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
              {MOODS.map((m, i) => {
                const active = mood === m.label;
                return (
                  <motion.button
                    key={m.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    onClick={() => setMood(active ? null : m.label)}
                    whileHover={{ y: -2 }}
                    className={`group relative px-4 py-2 rounded-full font-serif-lit italic text-base transition-colors ${active ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground"}`}
                    style={active ? { background: m.hue } : undefined}
                  >
                    {!active && (
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `color-mix(in oklab, ${m.hue} 14%, transparent)` }}
                      />
                    )}
                    <span className="relative">{m.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* genre + language filters */}
          <div className="mt-12 grid sm:grid-cols-2 gap-8 text-left">
            <FilterColumn label="Genre" items={GENRES} value={genre} onChange={setGenre} />
            <FilterColumn label="Language" items={LANGUAGES} value={lang} onChange={setLang} deva />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterColumn({
  label,
  items,
  value,
  onChange,
  deva,
}: {
  label: string;
  items: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  deva?: boolean;
}) {
  return (
    <div className="paper-texture rounded-md border border-foreground/10 p-5 shadow-paper">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs tracking-[0.3em] uppercase text-foreground/50">{label}</div>
        {value && (
          <button onClick={() => onChange(null)} className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground">
            clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((g) => {
          const active = value === g;
          return (
            <motion.button
              key={g}
              layout
              onClick={() => onChange(active ? null : g)}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                active
                  ? "text-primary-foreground border-transparent"
                  : "border-foreground/15 text-foreground/70 hover:border-foreground/50 hover:text-foreground"
              } ${deva && g !== "English" ? "font-deva" : ""}`}
              style={active ? { background: "var(--ink)" } : undefined}
            >
              {g}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
