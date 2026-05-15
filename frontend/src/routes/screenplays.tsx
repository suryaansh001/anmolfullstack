import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/screenplays")({
  component: ScreenplaysPage,
});

function ScreenplaysPage() {
  const { writings } = usePlatform();
  const screenplays = writings.filter((writing) => writing.category === "Screenplays");

  return (
    <PlatformShell
      title="Screenplays"
      subtitle="Film-strip rhythm, script aesthetics, and scene-ready previews."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {screenplays.map((writing) => (
          <WritingCard key={writing.id} writing={writing} />
        ))}
      </div>
    </PlatformShell>
  );
}
