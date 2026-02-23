import { ArrowRight, User, Shield, SquareCheck, LayoutGrid, Lock } from "lucide-react";

const steps = [
  {
    label: "User Request",
    description: "Any route or API call",
    icon: User,
    highlight: false,
  },
  {
    label: "Auth Middleware",
    description: "JWT validation",
    icon: Shield,
    highlight: false,
  },
  {
    label: "Role Check",
    description: "admin / manager / member",
    icon: SquareCheck,
    highlight: false,
  },
  {
    label: "Permission Matrix",
    description: "resource × action map",
    icon: LayoutGrid,
    highlight: true,
  },
  {
    label: "Resource Access",
    description: "Granted or 403",
    icon: Lock,
    highlight: false,
  },
];

export function VizRbacFlow() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Request Flow
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
              style={
                step.highlight
                  ? {
                      borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
                      backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
                    }
                  : {
                      borderColor: "color-mix(in oklch, var(--border) 60%, transparent)",
                      backgroundColor: "var(--card)",
                    }
              }
            >
              <step.icon
                className="w-4 h-4 shrink-0"
                style={
                  step.highlight
                    ? { color: "var(--primary)" }
                    : { color: "var(--muted-foreground)" }
                }
              />
              <div>
                <p
                  className="text-xs font-medium"
                  style={step.highlight ? { color: "var(--primary)" } : undefined}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
      <div
        className="rounded-md p-3 text-xs text-muted-foreground"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
          borderColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <span className="font-mono font-medium text-primary">Permission Matrix</span>
        {" "}is the single source of truth — add a new role by adding one row. No scattered{" "}
        <span className="font-mono">if (role === &apos;admin&apos;)</span> checks in business logic.
      </div>
    </div>
  );
}
