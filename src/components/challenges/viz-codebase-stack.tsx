import { Code2, SquareStack, FileCode, FlaskConical, BookOpen } from "lucide-react";

const stackLayers = [
  {
    layer: "Types",
    technology: "TypeScript strict mode",
    rationale: "Catches entire classes of bugs at compile time — no runtime surprises",
    icon: Code2,
    accent: false,
  },
  {
    layer: "Structure",
    technology: "Modular feature-based architecture",
    rationale: "Each feature folder is self-contained — easy to find, easy to delete",
    icon: SquareStack,
    accent: false,
  },
  {
    layer: "API",
    technology: "Explicit typed contracts",
    rationale: "Request/response shapes defined once, shared between client and server",
    icon: FileCode,
    accent: true,
  },
  {
    layer: "Testing",
    technology: "Unit + integration tests on critical paths",
    rationale: "RBAC rules and data mutations tested — safe to refactor without fear",
    icon: FlaskConical,
    accent: false,
  },
  {
    layer: "Docs",
    technology: "Decision records + inline JSDoc",
    rationale: "Why decisions were made, not just what — your next dev thanks you",
    icon: BookOpen,
    accent: false,
  },
];

export function VizCodebaseStack() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Handover-Ready Stack
      </p>
      <div className="border-l-2 pl-4 space-y-0" style={{ borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)" }}>
        {stackLayers.map((l, i) => (
          <div
            key={l.layer}
            className="flex items-start gap-3 py-2.5"
            style={
              i < stackLayers.length - 1
                ? {
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "color-mix(in oklch, var(--border) 60%, transparent)",
                  }
                : undefined
            }
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded-md shrink-0 mt-0.5"
              style={
                l.accent
                  ? {
                      backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
                      borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }
                  : {
                      backgroundColor: "color-mix(in oklch, var(--muted) 80%, transparent)",
                    }
              }
            >
              <l.icon
                className="w-3 h-3"
                style={{ color: l.accent ? "var(--primary)" : "var(--muted-foreground)" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">
                  {l.layer}
                </span>
                <span
                  className="text-xs font-medium"
                  style={l.accent ? { color: "var(--primary)" } : undefined}
                >
                  {l.technology}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{l.rationale}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
