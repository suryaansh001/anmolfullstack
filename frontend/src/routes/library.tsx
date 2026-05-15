import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { usePlatform } from "@/context/platform-context";
import type { WritingCategory } from "@/lib/demo-data";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const { writings } = usePlatform();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<WritingCategory | "All">("All");
  const [language, setLanguage] = useState<"All" | string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "bookmarks" | "latest">("latest");
  const [visible, setVisible] = useState(4);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const base = writings.filter((writing) => {
      const query = search.toLowerCase();
      const searchable =
        `${writing.title} ${writing.genre} ${writing.language} ${writing.excerpt}`.toLowerCase();
      return (
        (category === "All" || writing.category === category) &&
        (language === "All" || writing.language === language) &&
        searchable.includes(query)
      );
    });
    const sorted = [...base];
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === "bookmarks") sorted.sort((a, b) => b.bookmarks - a.bookmarks);
    if (sortBy === "latest")
      sorted.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return sorted;
  }, [category, language, search, sortBy, writings]);

  const visibleItems = filtered.slice(0, visible);

  useEffect(() => {
    setVisible(4);
  }, [search, category, language, sortBy]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => Math.min(prev + 2, filtered.length));
          }
        });
      },
      { rootMargin: "250px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <PlatformShell
      title="Library"
      subtitle="Search, filter, and preview multilingual manuscripts with cinematic transitions."
    >
      <section className="paper-texture border border-foreground/10 rounded-xl p-4 md:p-5 shadow-paper">
        <div className="grid lg:grid-cols-4 gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, genre, language..."
            className="lg:col-span-2 rounded-xl border border-foreground/15 bg-background/80 px-4 py-2.5 outline-none focus:border-foreground/40"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as WritingCategory | "All")}
            className="rounded-xl border border-foreground/15 bg-background/80 px-3 py-2.5"
          >
            {["All", "Poetry", "Lyrics", "Stories", "Screenplays"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-xl border border-foreground/15 bg-background/80 px-3 py-2.5"
          >
            {["All", "Hindi", "Tamil", "Bengali", "English", "Gujarati"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {[
            { id: "latest", label: "Latest first" },
            { id: "bookmarks", label: "Most bookmarked" },
            { id: "rating", label: "Top rated" },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id as "rating" | "bookmarks" | "latest")}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${sortBy === option.id ? "bg-foreground text-background border-transparent" : "border-foreground/15 text-foreground/70"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <motion.section layout className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {visibleItems.map((writing) => (
            <motion.div key={writing.id} layout exit={{ opacity: 0, scale: 0.95 }}>
              <WritingCard writing={writing} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
      <div ref={sentinelRef} className="h-8" />
      {visible < filtered.length && (
        <div className="text-center text-xs uppercase tracking-[0.2em] text-foreground/50 mt-2">
          Loading more manuscripts…
        </div>
      )}
    </PlatformShell>
  );
}
