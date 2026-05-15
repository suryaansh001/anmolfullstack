import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PlatformShell } from "@/components/platform/platform-shell";
import { useDemoAnalytics } from "@/context/platform-context";

export const Route = createFileRoute("/version-history")({
  component: VersionHistoryPage,
});

function VersionHistoryPage() {
  const { draftVersions } = useDemoAnalytics();
  const [activeId, setActiveId] = useState(draftVersions[0]?.id ?? "");
  const active = draftVersions.find((version) => version.id === activeId) ?? draftVersions[0];

  return (
    <PlatformShell title="Version History" subtitle="Stories evolve, but never disappear.">
      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6">
        <section className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper">
          <div className="relative pl-6">
            <div className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
            <div className="space-y-4">
              {draftVersions.map((version, index) => (
                <motion.button
                  key={version.id}
                  onClick={() => setActiveId(version.id)}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-left relative block w-full rounded-lg border p-3 transition-colors ${activeId === version.id ? "border-foreground/35 bg-foreground/5" : "border-foreground/12 hover:border-foreground/25"}`}
                >
                  <span
                    className={`absolute -left-[21px] top-4 w-3 h-3 rounded-full border-2 ${activeId === version.id ? "bg-[var(--gold)] border-[var(--gold)]" : "border-[var(--gold)] bg-background"}`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">{version.label}</span>
                    <span className="text-[11px] text-foreground/55">
                      {new Date(version.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm italic text-foreground/70">{version.note}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <aside className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper">
          <h2 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
            Snapshot preview
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55 mt-1">
            {active?.label}
          </p>
          <p className="mt-4 font-serif-lit italic text-lg leading-relaxed text-foreground/80">
            {active?.snapshot}
          </p>
          <button className="mt-6 rounded-full h-10 px-5 bg-gradient-ink text-primary-foreground text-xs uppercase tracking-[0.2em]">
            Restore this version
          </button>
        </aside>
      </div>
    </PlatformShell>
  );
}
