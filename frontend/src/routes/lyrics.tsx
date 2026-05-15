import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/lyrics")({
  component: LyricsPage,
});

function LyricsPage() {
  const { writings } = usePlatform();
  const lyrics = writings.filter((writing) => writing.category === "Lyrics");

  return (
    <PlatformShell
      title="Lyrics"
      subtitle="Waveform-inspired motion and rhythmic lines in multilingual melodies."
    >
      <div className="relative mb-5 h-14 rounded-xl border border-foreground/15 overflow-hidden bg-background/60">
        <motion.div
          className="absolute inset-y-0 left-0 w-48"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 38%, transparent), transparent)",
          }}
          animate={{ x: ["-20%", "220%"] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {lyrics.map((writing) => (
          <WritingCard key={writing.id} writing={writing} />
        ))}
      </div>
    </PlatformShell>
  );
}
