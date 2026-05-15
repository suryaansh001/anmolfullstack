import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BookCheck, Flame, Globe2, History, LibraryBig, Sparkles } from "lucide-react";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { useDemoAnalytics, usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { writings } = usePlatform();
  const analytics = useDemoAnalytics();
  const featured = writings.slice(0, 4);

  return (
    <PlatformShell
      title="Writer Dashboard"
      subtitle="A calm workspace for drafts, publication flow, and evolving manuscripts."
    >
      <div className="grid xl:grid-cols-[1.4fr,1fr] gap-6">
        <section className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              icon={Flame}
              label="Writing streak"
              value="41 days"
              note="steady momentum"
            />
            <MetricCard
              icon={BookCheck}
              label="Published"
              value={`${analytics.totalWritings}`}
              note="multilingual pieces"
            />
            <MetricCard
              icon={Sparkles}
              label="Bookmarks"
              value={`${analytics.totalBookmarks}`}
              note="reader saves"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((writing) => (
              <WritingCard key={writing.id} writing={writing} compact />
            ))}
          </div>
        </section>
        <aside className="space-y-5">
          <Panel title="Recent drafts" icon={History}>
            <ul className="space-y-3 text-sm">
              {analytics.draftVersions.map((version) => (
                <li
                  key={version.id}
                  className="flex items-start justify-between border-b border-foreground/10 pb-2"
                >
                  <div>
                    <p className="font-serif-lit italic">{version.note}</p>
                    <p className="text-xs text-foreground/55">
                      {new Date(version.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-mono text-xs">{version.label}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/version-history"
              className="mt-3 inline-flex text-xs uppercase tracking-[0.2em] ink-underline text-foreground/65 hover:text-foreground"
            >
              Open timeline
            </Link>
          </Panel>

          <Panel title="Language distribution" icon={Globe2}>
            <div className="space-y-2">
              {analytics.languageDistribution.map((entry) => (
                <div key={entry.language}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{entry.language}</span>
                    <span>{entry.value}%</span>
                  </div>
                  <motion.div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--ink)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${entry.value}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Quick routes" icon={LibraryBig}>
            <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.16em]">
              <QuickLink to="/library">Library</QuickLink>
              <QuickLink to="/bookmarks">Bookmarks</QuickLink>
              <QuickLink to="/drafts">Drafts</QuickLink>
              <QuickLink to="/editor">Editor</QuickLink>
            </div>
          </Panel>
        </aside>
      </div>
    </PlatformShell>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="paper-texture rounded-xl border border-foreground/10 p-4 shadow-paper"
    >
      <div className="flex items-center justify-between text-foreground/65 text-xs uppercase tracking-[0.15em]">
        {label}
        <Icon className="w-4 h-4" />
      </div>
      <div className="mt-3 font-display text-3xl" style={{ color: "var(--ink)" }}>
        {value}
      </div>
      <p className="text-xs text-foreground/60 italic">{note}</p>
    </motion.div>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="paper-texture rounded-xl border border-foreground/10 p-4 md:p-5 shadow-paper">
      <div className="flex items-center gap-2 text-sm mb-4">
        <Icon className="w-4 h-4 text-foreground/60" />
        <h2 className="font-display text-xl" style={{ color: "var(--ink)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function QuickLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-foreground/15 px-3 py-2 hover:bg-foreground hover:text-background transition-colors text-center"
    >
      {children}
    </Link>
  );
}
