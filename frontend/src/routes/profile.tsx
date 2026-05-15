import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/platform/platform-shell";
import { useDemoAnalytics, usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, writings } = usePlatform();
  const analytics = useDemoAnalytics();
  const published = writings.slice(0, 4);

  return (
    <PlatformShell
      title="Profile"
      subtitle="An editorial portrait of your voice, milestones, and published work."
    >
      <div className="grid lg:grid-cols-[1fr,1.4fr] gap-6">
        <section className="paper-texture rounded-xl border border-foreground/10 p-6 shadow-paper">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border border-foreground/15"
          />
          <h2 className="font-display text-3xl mt-3" style={{ color: "var(--ink)" }}>
            {user?.name}
          </h2>
          <p className="font-serif-lit italic text-foreground/70 mt-2">
            Keeper of multilingual manuscripts, weaving stories across rain, memory, and cinema.
          </p>
          <div className="mt-4 space-y-1 text-sm text-foreground/70">
            <div>Languages: Hindi · Tamil · Bengali · English · Gujarati</div>
            <div>Published writings: {writings.length}</div>
            <div>Reader bookmarks: {analytics.totalBookmarks}</div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Monsoon Laureate", "Story Archivist", "Multilingual Curator"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full border border-foreground/15 text-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>

        <section className="paper-texture rounded-xl border border-foreground/10 p-6 shadow-paper">
          <h3 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
            Featured content
          </h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {published.map((writing) => (
              <article
                key={writing.id}
                className="rounded-lg border border-foreground/15 p-4 bg-background/60"
              >
                <h4 className="font-display text-xl" style={{ color: "var(--ink)" }}>
                  {writing.title}
                </h4>
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/55 mt-1">
                  {writing.category} · {writing.language}
                </p>
                <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{writing.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
