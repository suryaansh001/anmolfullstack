import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { useDemoAnalytics, usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
});

function ExplorePage() {
  const { writings } = usePlatform();
  const analytics = useDemoAnalytics();

  return (
    <PlatformShell
      title="Explore"
      subtitle="Discover moods, genres, and multilingual writing currents."
    >
      <section className="paper-texture border border-foreground/10 rounded-xl p-4 md:p-5 shadow-paper">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
          <input
            placeholder="Search by mood, language, memory, rain..."
            className="w-full rounded-full border border-foreground/15 bg-background/80 py-3 pl-11 pr-4 outline-none focus:border-foreground/40"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {analytics.trends.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="px-3 py-1.5 rounded-full text-xs border border-foreground/15 bg-background/70"
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="mt-6 grid lg:grid-cols-[1fr,2fr] gap-6">
        <article className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper">
          <h3 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
            Genre cloud
          </h3>
          <p className="text-sm text-foreground/60 italic">
            Tap any cloud to drift into a curated reading stream.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {analytics.moods.concat(["Monsoon", "Intimate", "Mythic"]).map((item, index) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                className="px-3 py-1.5 rounded-full text-xs border border-foreground/15 hover:bg-foreground hover:text-background transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </motion.button>
            ))}
          </div>
          <h3 className="font-display text-xl mt-6 mb-3" style={{ color: "var(--ink)" }}>
            Featured writers
          </h3>
          <div className="space-y-2">
            {analytics.featuredWriters.slice(0, 3).map((writer) => (
              <div
                key={writer.id}
                className="flex items-center gap-3 border border-foreground/12 rounded-lg p-2.5"
              >
                <img
                  src={writer.avatar}
                  alt={writer.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm">{writer.name}</p>
                  <p className="text-xs text-foreground/55">{writer.languages.join(" · ")}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <div className="grid md:grid-cols-2 gap-5">
          {writings.slice(0, 6).map((writing) => (
            <WritingCard key={writing.id} writing={writing} />
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}
