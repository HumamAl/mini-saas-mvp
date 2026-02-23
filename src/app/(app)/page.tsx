"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CheckCircle2,
  AlertTriangle,
  Timer,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  dashboardStats,
  velocityData,
  activeSprint,
  teamWorkload,
  activities,
  taskStatusDistribution,
  taskPriorityDistribution,
  getTeamMemberById,
} from "@/data/mock-data";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm min-w-[140px]">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color as string }}
          />
          <span className="capitalize">{entry.name}:</span>
          <span className="font-mono font-medium text-foreground">
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

// ─── Relative timestamp ───────────────────────────────────────────────────────

function relativeTime(timestamp: string): string {
  const now = new Date("2026-02-23T18:00:00Z");
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 2) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

// ─── Action color ─────────────────────────────────────────────────────────────

function actionColor(action: string): string {
  if (action === "completed" || action === "completed project")
    return "var(--success)";
  if (action === "flagged overdue") return "var(--destructive)";
  if (action === "changed priority to critical") return "var(--destructive)";
  return "var(--primary)";
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

type TabKey = "overview" | "sprint" | "team";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const stats = [
    {
      title: "Tasks Completed",
      value: `${dashboardStats.completedTasks}/${dashboardStats.totalTasks}`,
      description: "tasks done this period",
      change: dashboardStats.completedChange,
      icon: CheckCircle2,
      invertColor: false,
    },
    {
      title: "Overdue Tasks",
      value: String(dashboardStats.overdueCount),
      description: "require immediate attention",
      change: dashboardStats.overdueChange,
      icon: AlertTriangle,
      invertColor: true,
    },
    {
      title: "Avg Completion",
      value: `${dashboardStats.avgCompletionDays}d`,
      description: "days from creation to done",
      change: dashboardStats.avgCompletionChange,
      icon: Timer,
      invertColor: true,
    },
    {
      title: "Sprint Velocity",
      value: `${dashboardStats.teamVelocity} pts`,
      description: "story points this sprint",
      change: dashboardStats.velocityChange,
      icon: Zap,
      invertColor: false,
    },
  ];

  const recentActivities = activities.slice(0, 8);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sprint 24 — v2.0 Final Push &middot;{" "}
            {dashboardStats.sprintProgress}% complete
          </p>
        </div>

        {/* Tab Switcher — changes the main chart */}
        <div className="flex items-center gap-1 bg-muted/60 rounded-lg p-1 w-fit">
          {(["overview", "sprint", "team"] as TabKey[]).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={[
                "capitalize rounded-md text-sm font-medium transition-all duration-150 px-3 h-8",
                activeTab === tab
                  ? "bg-background text-foreground shadow-[0_1px_2px_0_rgb(0_0_0/0.06)] border border-border/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              ].join(" ")}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const isPositive = stat.invertColor
            ? stat.change < 0
            : stat.change > 0;
          return (
            <Card
              key={stat.title}
              className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg animate-fade-in transition-all duration-150"
              style={{
                animationDelay: `${index * 80}ms`,
                animationDuration: "200ms",
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-primary/70" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-mono">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {isPositive ? (
                    <TrendingUp
                      className="w-3 h-3"
                      style={{ color: "var(--success)" }}
                    />
                  ) : (
                    <TrendingDown
                      className="w-3 h-3"
                      style={{ color: "var(--destructive)" }}
                    />
                  )}
                  <span
                    className="text-xs font-medium font-mono"
                    style={{
                      color: isPositive
                        ? "var(--success)"
                        : "var(--destructive)",
                    }}
                  >
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}% vs last period
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid: 2/3 chart + 1/3 activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart — changes with activeTab */}
        <div className="lg:col-span-2">
          {activeTab === "overview" && (
            <Card className="linear-card p-0">
              <CardHeader className="px-6 pt-6 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Sprint Velocity
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Actual vs target story points — last 8 sprints
                </p>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={velocityData}
                    margin={{ top: 4, right: 16, left: -8, bottom: 0 }}
                    barCategoryGap="30%"
                    barGap={4}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      strokeOpacity={0.5}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="points"
                      name="Actual"
                      fill="var(--chart-1)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="target"
                      name="Target"
                      fill="var(--chart-5)"
                      radius={[4, 4, 0, 0]}
                      opacity={0.5}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {activeTab === "sprint" && (
            <Card className="linear-card p-0">
              <CardHeader className="px-6 pt-6 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Sprint 24 Burndown
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ideal vs actual remaining story points &middot; Feb 17 – Mar
                  2
                </p>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart
                    data={activeSprint.burndownData}
                    margin={{ top: 4, right: 16, left: -8, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      strokeOpacity={0.5}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      interval={2}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="ideal"
                      name="Ideal"
                      stroke="var(--chart-5)"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={{ fill: "var(--chart-1)", r: 3 }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {activeTab === "team" && (
            <Card className="linear-card p-0">
              <CardHeader className="px-6 pt-6 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Team Workload
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Active tasks in progress per team member
                </p>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={teamWorkload}
                    layout="vertical"
                    margin={{ top: 4, right: 24, left: 8, bottom: 0 }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      strokeOpacity={0.5}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={110}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      name="Tasks"
                      fill="var(--chart-1)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <Card className="linear-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Recent Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Latest team actions
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {recentActivities.map((activity) => {
                  const member = getTeamMemberById(activity.userId);
                  const color = actionColor(activity.action);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 px-4 py-3 linear-hover"
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor:
                            "color-mix(in oklch, var(--primary) 12%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {member?.initials ?? "??"}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug">
                          <span className="font-medium text-foreground">
                            {member?.name ?? "Unknown"}
                          </span>{" "}
                          <span className="font-medium" style={{ color }}>
                            {activity.action}
                          </span>
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {activity.targetTitle}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                          {relativeTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task Distribution — two mini charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Donut */}
        <Card className="linear-card p-0">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-base font-semibold">
              Task Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={taskStatusDistribution}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={2}
                  >
                    {taskStatusDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-col gap-1.5 flex-1">
                {taskStatusDistribution.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-medium text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Bar Chart */}
        <Card className="linear-card p-0">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-base font-semibold">
              Priority Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart
                data={taskPriorityDistribution}
                margin={{ top: 4, right: 12, left: -12, bottom: 0 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey="priority"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Tasks" radius={[4, 4, 0, 0]}>
                  {taskPriorityDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 px-2">
              {taskPriorityDistribution.map((item) => (
                <div key={item.priority} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {item.priority}
                  </span>
                  <Badge
                    className="text-[10px] px-1.5 py-0 rounded-full font-mono h-4 border-0"
                    style={{
                      backgroundColor: `${item.fill}22`,
                      color: item.fill,
                    }}
                  >
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
