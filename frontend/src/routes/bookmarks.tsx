import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/bookmarks")({
  component: BookmarksPage,
});

function BookmarksPage() {
  const { writings, bookmarks } = usePlatform();
  const saved = writings.filter((writing) => bookmarks.includes(writing.id));

  return (
    <PlatformShell
      title="Bookmarks"
      subtitle="Your saved pieces, pulsing softly in a private reading shelf."
    >
      <p className="text-sm text-foreground/65 mb-4">Saved manuscripts: {saved.length}</p>
      {saved.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {saved.map((writing) => (
            <WritingCard key={writing.id} writing={writing} />
          ))}
        </div>
      ) : (
        <div className="paper-texture rounded-xl border border-foreground/10 p-8 text-center italic text-foreground/65">
          Bookmark a piece from Library or Explore and it will appear here.
        </div>
      )}
    </PlatformShell>
  );
}
