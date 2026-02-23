export interface ChallengeData {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers treat a mini SaaS as just a CRUD app — wire up a database, slap on some auth, ship it. That works until you hit your first race condition, your first permission escalation, or your first 'the client can't hand this off to anyone' moment.",
  differentApproach:
    "I architect it for production from day one: RBAC that scales with org growth, real-time sync built around conflict resolution, and a codebase clean enough that your next developer can contribute in a day.",
  accentWord: "production from day one",
};

export const challenges: ChallengeData[] = [
  {
    id: "challenge-1",
    title: "Role-Based Access Control Architecture",
    description:
      "Most auth implementations hardcode role checks inline — scattered conditionals that break the moment a new role is needed. RBAC needs to be a first-class system: centralized permission matrix, enforced at the middleware layer, configurable without touching business logic.",
    outcome:
      "Clean separation of concerns — roles and permissions are configurable without code changes, reducing future admin work by ~80%.",
  },
  {
    id: "challenge-2",
    title: "Real-Time Data Sync Without Race Conditions",
    description:
      "Polling-based updates create stale UIs and conflicting edits when two users touch the same record simultaneously. The fix isn't just switching to WebSockets — it's pairing optimistic updates with server-side conflict resolution so data integrity is guaranteed.",
    outcome:
      "Instant updates across all connected clients with zero data conflicts — latency drops from ~840ms (poll cycle) to under 120ms.",
  },
  {
    id: "challenge-3",
    title: "Advanced Search & Filtering at Scale",
    description:
      "Filtering by status, priority, assignee, and date simultaneously sounds simple until you have 10,000+ tasks and a UI that freezes on every keypress. Cursor-based pagination and indexed query patterns keep responses fast regardless of dataset size.",
    outcome:
      "Sub-50ms search responses even with complex multi-filter queries across large datasets — no pagination flicker, no loading spinners on filter change.",
  },
  {
    id: "challenge-4",
    title: "Production Deployment & Zero-Downtime Updates",
    description:
      "A single-server deploy means every release takes down the app for every user. Blue/green deployments with automated health checks and instant rollback mean releases become a non-event — push code, watch the pipeline, keep working.",
    outcome:
      "Fully automated deployments with instant rollback — zero downtime guaranteed, mean time to recovery drops from minutes to under 30 seconds.",
  },
  {
    id: "challenge-5",
    title: "Clean, Maintainable Codebase for Handover",
    description:
      "A codebase only its author understands is a liability. TypeScript strict mode, modular architecture, explicit API contracts, and documented decision points mean anyone on your future team can onboard fast and contribute safely.",
    outcome:
      "A codebase your next developer can pick up in a day, not a week — reducing onboarding time by ~75% and future bug rates from architectural confusion.",
  },
];
