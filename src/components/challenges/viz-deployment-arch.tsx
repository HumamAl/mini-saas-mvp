import { Globe, Server, Database, Layers, RotateCcw } from "lucide-react";

const layers = [
  {
    layer: "CDN",
    technology: "Vercel Edge Network",
    rationale: "Static assets served in <10ms globally",
    icon: Globe,
    type: "external" as const,
  },
  {
    layer: "CI/CD",
    technology: "GitHub Actions → Blue/Green",
    rationale: "Zero-downtime switch: new version warm before cutover",
    icon: Layers,
    type: "backend" as const,
  },
  {
    layer: "App Servers",
    technology: "Next.js on Vercel Serverless",
    rationale: "Auto-scaling, no cold starts on warm instances",
    icon: Server,
    type: "backend" as const,
  },
  {
    layer: "Rollback",
    technology: "Instant with health check gate",
    rationale: "Automated 30s rollback if health probe fails post-deploy",
    icon: RotateCcw,
    type: "ai" as const,
  },
  {
    layer: "Database",
    technology: "Postgres + connection pooling",
    rationale: "PgBouncer keeps connections under limit during traffic spikes",
    icon: Database,
    type: "database" as const,
  },
];

const typeStyles: Record<string, { bg: string; border: string }> = {
  frontend: {
    bg: "color-mix(in oklch, var(--primary) 8%, transparent)",
    border: "color-mix(in oklch, var(--primary) 25%, transparent)",
  },
  backend: {
    bg: "color-mix(in oklch, var(--muted) 80%, transparent)",
    border: "color-mix(in oklch, var(--border) 60%, transparent)",
  },
  external: {
    bg: "color-mix(in oklch, var(--muted) 60%, transparent)",
    border: "color-mix(in oklch, var(--border) 60%, transparent)",
  },
  database: {
    bg: "color-mix(in oklch, var(--primary) 4%, transparent)",
    border: "color-mix(in oklch, var(--primary) 18%, transparent)",
  },
  ai: {
    bg: "color-mix(in oklch, var(--success) 8%, transparent)",
    border: "color-mix(in oklch, var(--success) 20%, transparent)",
  },
};

export function VizDeploymentArch() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Deployment Stack
      </p>
      <div className="space-y-2">
        {layers.map((l) => {
          const s = typeStyles[l.type];
          return (
            <div
              key={l.layer}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{
                backgroundColor: s.bg,
                borderColor: s.border,
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <div
                className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--primary) 10%, transparent)",
                }}
              >
                <l.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">
                    {l.layer}
                  </span>
                  <span className="text-xs font-medium truncate">{l.technology}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{l.rationale}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
