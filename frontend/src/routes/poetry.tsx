import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/platform/platform-shell";
import { WritingCard } from "@/components/platform/writing-card";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/poetry")({
  component: PoetryPage,
});

function PoetryPage() {
  const { writings } = usePlatform();
  const poetry = writings.filter((writing) => writing.category === "Poetry");

  return (
    <PlatformShell
      title="Poetry"
      subtitle="Floating verse cards, soft tones, and emotional textual textures."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {poetry.map((writing) => (
          <WritingCard key={writing.id} writing={writing} />
        ))}
      </div>
    </PlatformShell>
  );
}
