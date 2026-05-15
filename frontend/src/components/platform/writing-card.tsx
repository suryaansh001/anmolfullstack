import { motion } from "motion/react";
import { Bookmark, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { usePlatform } from "@/context/platform-context";
import type { Writing } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<Writing["category"], string> = {
  Poetry: "border-l-[3px] border-l-[var(--maroon)]",
  Lyrics: "border-l-[3px] border-l-[var(--gold)]",
  Stories: "border-l-[3px] border-l-[var(--ink)]",
  Screenplays: "border-l-[3px] border-l-[var(--charcoal)]",
};

export function WritingCard({ writing, compact = false }: { writing: Writing; compact?: boolean }) {
  const { isBookmarked, toggleBookmark } = usePlatform();
  const [previewOpen, setPreviewOpen] = useState(false);
  const bookmarked = isBookmarked(writing.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "paper-texture rounded-xl border border-foreground/10 shadow-paper overflow-hidden",
        CATEGORY_STYLES[writing.category],
      )}
    >
      <div
        className="h-1.5 w-full"
        style={{
          background:
            writing.category === "Poetry"
              ? "linear-gradient(90deg, var(--maroon), transparent)"
              : writing.category === "Lyrics"
                ? "linear-gradient(90deg, var(--gold), transparent)"
                : writing.category === "Stories"
                  ? "linear-gradient(90deg, var(--ink), transparent)"
                  : "linear-gradient(90deg, var(--charcoal), transparent)",
        }}
      />
      <div className={cn("p-5 md:p-6", compact && "p-4")}>
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-foreground/8 uppercase tracking-[0.17em]">
              {writing.category}
            </span>
            <span className="text-foreground/60">{writing.language}</span>
          </div>
          <button
            onClick={() => toggleBookmark(writing.id)}
            className="relative h-8 w-8 rounded-full border border-foreground/15 grid place-items-center overflow-hidden"
            aria-label="toggle bookmark"
          >
            <motion.span
              key={`${writing.id}-${bookmarked}`}
              initial={{ scale: 0.2, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute w-6 h-6 rounded-full"
              style={{ background: "color-mix(in oklab, var(--gold) 60%, transparent)" }}
            />
            <Bookmark
              className={cn(
                "w-4 h-4 relative z-10",
                bookmarked ? "fill-[var(--gold)] text-[var(--gold)]" : "text-foreground/60",
              )}
            />
          </button>
        </div>
        <h3 className="font-display text-2xl leading-tight" style={{ color: "var(--ink)" }}>
          {writing.title}
        </h3>
        <p className="mt-3 font-serif-lit italic text-foreground/75 line-clamp-3">
          {writing.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-foreground/60">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded-full border border-foreground/15">
              {writing.genre}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              {writing.rating.toFixed(1)}
            </span>
          </div>
          <span>{writing.bookmarks.toLocaleString()} saves</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link
            to="/editor"
            search={{ from: writing.id }}
            className="inline-flex text-xs uppercase tracking-[0.18em] ink-underline text-foreground/70 hover:text-foreground"
          >
            Open preview
          </Link>
          <button
            onClick={() => setPreviewOpen((open) => !open)}
            className="text-[10px] uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground"
          >
            {previewOpen ? "Hide scene" : "Expand scene"}
          </button>
        </div>
        <motion.div
          initial={false}
          animate={{ height: previewOpen ? "auto" : 0, opacity: previewOpen ? 1 : 0 }}
          className="overflow-hidden"
        >
          <p className="mt-3 text-sm font-serif-lit italic text-foreground/70 border-t border-foreground/10 pt-3">
            {writing.body}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}
