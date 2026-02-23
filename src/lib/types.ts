import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Task Management Domain Types ────────────────────────────────────────────

export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "done";

export type TaskPriority = "low" | "medium" | "high" | "critical";

export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";

export type TeamRole = "admin" | "manager" | "member" | "viewer";

export type ActivityTargetType =
  | "task"
  | "project"
  | "team_member"
  | "comment"
  | "sprint";

/** A single work item within a project */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  /** undefined = unassigned */
  assigneeId?: string;
  reporterId: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  /** Planned effort in hours */
  estimatedHours: number;
  /** Logged effort in hours; null if not started */
  actualHours: number | null;
  /** Whether task is blocked by another dependency */
  blockedBy?: string | null;
  /** True if dueDate is past and status is not done */
  isOverdue?: boolean;
}

/** A project grouping tasks and a team */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  /** Completion percentage 0–100 */
  progress: number;
  startDate: string;
  endDate: string;
  ownerId: string;
  /** IDs of team members with access */
  teamIds: string[];
  taskCount: number;
  completedTaskCount: number;
  color: string;
}

/** A team member with their role (RBAC) */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  /** Two-letter initials for avatar */
  initials: string;
  department: string;
  title: string;
  tasksCompleted: number;
  tasksInProgress: number;
  joinedAt: string;
  lastActiveAt: string;
  /** Velocity: story points completed in current sprint */
  sprintPoints: number;
}

/** Sprint burndown data point */
export interface BurndownPoint {
  day: string;
  ideal: number;
  actual: number;
}

/** Active sprint with task assignments */
export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  taskIds: string[];
  /** Total story points committed */
  totalPoints: number;
  completedPoints: number;
  burndownData: BurndownPoint[];
}

/** Activity feed event */
export interface Activity {
  id: string;
  userId: string;
  action: string;
  targetType: ActivityTargetType;
  targetId: string;
  targetTitle: string;
  timestamp: string;
  /** Optional metadata (e.g., field changed, old/new value) */
  meta?: Record<string, string>;
}

/** KPI summary for dashboard header cards */
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  /** Change vs. previous 30 days as percentage */
  completedChange: number;
  overdueCount: number;
  overdueChange: number;
  /** Average days from creation to completion */
  avgCompletionDays: number;
  avgCompletionChange: number;
  /** Story points completed in current sprint */
  teamVelocity: number;
  velocityChange: number;
  /** Sprint completion percentage */
  sprintProgress: number;
  activeProjects: number;
}

// ─── Chart Data Shapes ────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  target?: number;
  fill?: string;
}

export interface VelocityDataPoint {
  week: string;
  points: number;
  target: number;
}

export interface TaskDistributionPoint {
  status: string;
  count: number;
  fill: string;
}

export interface PriorityDistributionPoint {
  priority: string;
  count: number;
  fill: string;
}
