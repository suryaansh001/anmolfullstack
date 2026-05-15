import { motion } from "motion/react";
import { Bookmark, Star } from "lucide-react";

type Card = {
  cat: "Poetry" | "Lyrics" | "Stories" | "Screenplays";
  title: string;
  lang: string;
  author: string;
  excerpt: string;
  bookmarks: number;
  rating: number;
};

const CARDS: Card[] = [
  { cat: "Poetry", title: "मिट्टी की खुशबू", lang: "Hindi", author: "Aarav Mehta", excerpt: "बारिश की पहली बूँद ने मिट्टी से कहा — आज फिर मिलेंगे, थोड़ी देर ठहर...", bookmarks: 1240, rating: 4.8 },
  { cat: "Lyrics", title: "Saanson Mein", lang: "Hindi", author: "Ishaan Roy", excerpt: "Tere bina sapne adhure, in aankhon mein basaa loon main…", bookmarks: 982, rating: 4.7 },
  { cat: "Stories", title: "The Last Letter from Bombay", lang: "English", author: "Meera Pillai", excerpt: "She folded the paper twice, the way her father had taught her, and pressed it…", bookmarks: 2104, rating: 4.9 },
  { cat: "Screenplays", title: "Monsoon, Interrupted", lang: "English", author: "Kabir Sen", excerpt: "INT. SMALL CAFE — RAJ stares out the window. A cup of cutting chai trembles…", bookmarks: 678, rating: 4.6 },
  { cat: "Poetry", title: "চাঁদের চিঠি", lang: "Bengali", author: "Riya Das", excerpt: "একটা চিঠি লিখেছিলাম তোমায়, কিন্তু চাঁদ পড়ে নিল আগে…", bookmarks: 845, rating: 4.7 },
  { cat: "Stories", title: "ఊరి చివరి రైలు", lang: "Telugu", author: "Praneeth K.", excerpt: "ఆ స్టేషన్‌లో ఆగే చివరి రైలు ఎప్పుడూ రాత్రి తొమ్మిదికే వస్తుంది…", bookmarks: 521, rating: 4.5 },
];

const CAT_STYLES: Record<Card["cat"], { accent: string; label: string; ornament: string }> = {
  Poetry: { accent: "var(--maroon)", label: "Poetry", ornament: "❦" },
  Lyrics: { accent: "var(--gold)", label: "Lyrics", ornament: "♪" },
  Stories: { accent: "var(--ink)", label: "Stories", ornament: "§" },
  Screenplays: { accent: "var(--charcoal)", label: "Screenplay", ornament: "▣" },
};

export function Discover() {
  return (
    <section id="discover" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 max-w-2xl"
        >
          <p className="font-hand text-xl mb-4" style={{ color: "var(--maroon)" }}>~ the library ~</p>
          <h2 className="font-display text-5xl md:text-7xl leading-tight" style={{ color: "var(--ink)" }}>
            Discover voices,<br />
            <span className="italic font-light">in every script.</span>
          </h2>
          <p className="mt-6 font-serif-lit text-xl text-foreground/70 max-w-xl">
            A living archive of poems, lyrics, stories, and screenplays — written by Indian voices, in the languages they dream in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((c, i) => {
            const s = CAT_STYLES[c.cat];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative paper-texture rounded-sm shadow-paper hover:shadow-elevated transition-shadow duration-500 overflow-hidden"
                style={{ transform: `rotate(${(i % 2 ? -0.4 : 0.4)}deg)` }}
              >
                {/* Top film-strip for screenplays */}
                {c.cat === "Screenplays" && (
                  <div className="absolute top-0 left-0 right-0 h-3 flex justify-around bg-charcoal" style={{ background: "var(--charcoal)" }}>
                    {Array.from({ length: 12 }).map((_, k) => (
                      <span key={k} className="w-2 h-2 mt-0.5 rounded-sm" style={{ background: "var(--parchment)" }} />
                    ))}
                  </div>
                )}

                <div className="p-7 pt-9">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase font-medium px-2.5 py-1 rounded-sm"
                      style={{ color: s.accent, background: `color-mix(in oklab, ${s.accent} 12%, transparent)` }}
                    >
                      {s.ornament} {s.label}
                    </span>
                    <span className="text-xs italic text-foreground/50">{c.lang}</span>
                  </div>

                  <h3
                    className={`mb-3 leading-tight ${c.cat === "Poetry" ? "font-serif-lit italic text-3xl" : c.cat === "Screenplays" ? "font-display tracking-tight text-2xl uppercase" : "font-display text-2xl"}`}
                    style={{ color: "var(--ink)" }}
                  >
                    {c.title}
                  </h3>

                  <p className={`text-foreground/75 mb-6 line-clamp-3 ${c.cat === "Screenplays" ? "font-mono text-xs leading-relaxed" : "font-serif-lit text-base leading-relaxed"}`}>
                    {c.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-foreground/60 pt-4 border-t border-foreground/10">
                    <span className="italic">— {c.author}</span>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1">
                        <Bookmark className="w-3 h-3" style={{ color: s.accent }} />
                        {c.bookmarks.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" style={{ color: "var(--gold)" }} />
                        {c.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cinematic hover sweep */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-12"
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.3), transparent)",
                      animation: "film-sweep 1.8s ease-in-out",
                    }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
