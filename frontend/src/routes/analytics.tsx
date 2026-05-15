import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts";
import { PlatformShell } from "@/components/platform/platform-shell";
import { useDemoAnalytics } from "@/context/platform-context";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const analytics = useDemoAnalytics();

  return (
    <PlatformShell
      title="Analytics"
      subtitle="Cinematic signals from your readership and writing patterns."
    >
      <div className="grid xl:grid-cols-2 gap-6">
        <ChartPanel title="Bookmark growth">
          <ChartContainer
            config={{
              bookmarks: { label: "Bookmarks", color: "var(--ink)" },
            }}
            className="h-[260px] w-full"
          >
            <LineChart data={analytics.bookmarkGrowth}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="bookmarks"
                stroke="var(--color-bookmarks)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </ChartPanel>

        <ChartPanel title="Writing activity">
          <ChartContainer
            config={{
              words: { label: "Words", color: "var(--maroon)" },
            }}
            className="h-[260px] w-full"
          >
            <BarChart data={analytics.writingActivity}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="words" fill="var(--color-words)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartPanel>

        <ChartPanel title="Language distribution">
          <ChartContainer
            config={{
              value: { label: "Share", color: "var(--gold)" },
            }}
            className="h-[300px] w-full"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={analytics.languageDistribution}
                dataKey="value"
                nameKey="language"
                fill="var(--color-value)"
                innerRadius={60}
                outerRadius={95}
              />
            </PieChart>
          </ChartContainer>
        </ChartPanel>

        <section className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper">
          <h2 className="font-display text-2xl mb-4" style={{ color: "var(--ink)" }}>
            Top genres
          </h2>
          <div className="space-y-3">
            {Object.entries(analytics.categoryCount).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between text-sm">
                  <span>{category}</span>
                  <span>{count} works</span>
                </div>
                <div className="h-2 bg-foreground/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-gradient-ink"
                    style={{ width: `${(count / analytics.totalWritings) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <h3 className="font-display text-xl mt-7 mb-2" style={{ color: "var(--ink)" }}>
            Trending writings
          </h3>
          <div className="text-sm text-foreground/70 space-y-1">
            {analytics.trends.slice(0, 5).map((trend) => (
              <div key={trend}>#{trend}</div>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="paper-texture rounded-xl border border-foreground/10 p-5 shadow-paper">
      <h2 className="font-display text-2xl mb-4" style={{ color: "var(--ink)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
