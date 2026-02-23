import { X, Check } from "lucide-react";

const before = {
  label: "Without real-time sync",
  items: [
    "Polling every 5s — data always slightly stale",
    "Two users edit same record → last write wins",
    "~840ms until other clients see changes",
    "No conflict detection or user warning",
  ],
};

const after = {
  label: "With WebSocket + conflict resolution",
  items: [
    "Server pushes updates instantly via WebSocket",
    "Optimistic UI — changes appear in <50ms locally",
    "Conflict detected server-side, user prompted to resolve",
    "<120ms propagation to all connected clients",
  ],
};

export function VizRealtimeBeforeAfter() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Before / After
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className="rounded-lg p-4 space-y-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p className="text-xs font-semibold text-destructive">{before.label}</p>
          <ul className="space-y-1.5">
            {before.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-destructive">
                <X className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-lg p-4 space-y-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--success)" }}
          >
            {after.label}
          </p>
          <ul className="space-y-1.5">
            {after.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs"
                style={{ color: "var(--success)" }}
              >
                <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
