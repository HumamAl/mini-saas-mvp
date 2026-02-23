const metrics = [
  {
    label: "Full-text search response",
    value: 42,
    max: 100,
    display: "42ms",
    target: "< 50ms target",
    status: "success" as const,
  },
  {
    label: "Multi-filter combining (status + priority + assignee + date)",
    value: 38,
    max: 100,
    display: "38ms",
    target: "< 50ms target",
    status: "success" as const,
  },
  {
    label: "Cursor-based pagination (10K tasks)",
    value: 61,
    max: 100,
    display: "61ms",
    target: "< 100ms target",
    status: "success" as const,
  },
  {
    label: "Naive offset pagination (10K tasks, no index)",
    value: 94,
    max: 100,
    display: "940ms",
    target: "unacceptable",
    status: "destructive" as const,
  },
];

const colorMap = {
  success: "var(--success)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
};

export function VizSearchMetrics() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Query Performance
      </p>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground leading-snug flex-1">
                {m.label}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="font-mono text-xs font-semibold tabular-nums"
                  style={{ color: colorMap[m.status] }}
                >
                  {m.display}
                </span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${colorMap[m.status]} 10%, transparent)`,
                    color: colorMap[m.status],
                  }}
                >
                  {m.target}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted w-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${m.value}%`,
                  backgroundColor: colorMap[m.status],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
