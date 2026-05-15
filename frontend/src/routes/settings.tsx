import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/platform/platform-shell";
import { Switch } from "@/components/ui/switch";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings } = usePlatform();

  return (
    <PlatformShell
      title="Settings"
      subtitle="Personalize language, tone, and editing ambience for your studio."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <section className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper space-y-5">
          <SettingRow label="Language preference">
            <select
              value={settings.language}
              onChange={(event) => updateSettings({ language: event.target.value })}
              className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2"
            >
              {["Hindi", "Tamil", "Bengali", "English", "Gujarati"].map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Theme preference">
            <select
              value={settings.theme}
              onChange={(event) =>
                updateSettings({ theme: event.target.value as "parchment" | "midnight" })
              }
              className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2"
            >
              <option value="parchment">Parchment</option>
              <option value="midnight">Midnight</option>
            </select>
          </SettingRow>
          <SettingRow label="Editor font">
            <select
              value={settings.editorFont}
              onChange={(event) =>
                updateSettings({ editorFont: event.target.value as "serif" | "display" | "mono" })
              }
              className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2"
            >
              <option value="serif">Literary Serif</option>
              <option value="display">Cinematic Display</option>
              <option value="mono">Screenplay Mono</option>
            </select>
          </SettingRow>
        </section>

        <section className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper space-y-5">
          <SettingToggle
            title="Notification whispers"
            description="Soft reminders for drafts, feedback, and milestones."
            checked={settings.notifications}
            onChange={(checked) => updateSettings({ notifications: checked })}
          />
          <SettingToggle
            title="Ambient motion"
            description="Keep floating particles and manuscript drift active."
            checked={settings.ambientMotion}
            onChange={(checked) => updateSettings({ ambientMotion: checked })}
          />
        </section>
      </div>
    </PlatformShell>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-foreground/55 block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="border border-foreground/12 rounded-lg p-4 flex items-start justify-between gap-4">
      <div>
        <div className="font-display text-xl" style={{ color: "var(--ink)" }}>
          {title}
        </div>
        <p className="text-sm text-foreground/65">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
