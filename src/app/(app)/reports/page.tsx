"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  taskCompletionByMonth,
  taskStatusDistribution,
  taskPriorityDistribution,
  velocityData,
} from "@/data/mock-data";
import type { ChartDataPoint, VelocityDataPoint, TaskDistributionPoint, PriorityDistributionPoint } from "@/lib/types";

type TimeRange = "30d" | "90d" | "6mo" | "1yr";

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "30d", label: "Last 30d" },
  { value: "90d", label: "Last 90d" },
  { value: "6mo", label: "Last 6mo" },
  { value: "1yr", label: "Last 1yr" },
];

const STAT_COLORS = {
  primary: "oklch(0.50 0.18 270)",
  success: "oklch(0.627 0.194 149.214)",
  warning: "oklch(0.769 0.188 70.08)",
  destructive: "oklch(0.577 0.245 27.325)",
};

// Simulate different data slices based on time range
function getCompletionData(range: TimeRange): ChartDataPoint[] {
  const slices: Record<TimeRange, number> = { "30d": 1, "90d": 3, "6mo": 6, "1yr": 6 };
  return taskCompletionByMonth.slice(-slices[range]);
}

function getVelocityData(range: TimeRange): VelocityDataPoint[] {
  const slices: Record<TimeRange, number> = { "30d": 2, "90d": 4, "6mo": 6, "1yr": 8 };
  return velocityData.slice(-slices[range]);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border/60 rounded-lg shadow-[0_4px_12px_0_rgb(0_0_0/0.08)] p-3 text-sm">
      {label && <p className="font-medium text-foreground mb-1.5">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-mono font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="bg-popover border border-border/60 rounded-lg shadow-[0_4px_12px_0_rgb(0_0_0/0.08)] p-3 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="font-medium">{entry.name}</span>
        <span className="font-mono text-muted-foreground">{entry.value}</span>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("6mo");

  const completionData = useMemo(() => getCompletionData(timeRange), [timeRange]);
  const sprintVelocity = useMemo(() => getVelocityData(timeRange), [timeRange]);

  const totalCompleted = completionData.reduce((sum, d) => sum + d.value, 0);
  const avgVelocity =
    sprintVelocity.length > 0
      ? Math.round(sprintVelocity.reduce((s, d) => s + d.points, 0) / sprintVelocity.length)
      : 0;
  const totalTasks = taskStatusDistribution.reduce((s, d) => s + d.count, 0);
  const doneCount = taskStatusDistribution.find((d) => d.status === "Done")?.count ?? 0;
  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance analytics and team velocity
          </p>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setTimeRange(r.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-100 ${
                timeRange === r.value
                  ? "bg-background text-foreground shadow-[0_1px_2px_0_rgb(0_0_0/0.06)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground">Tasks Completed</p>
          <p className="text-2xl font-bold mt-1 font-mono tabular-nums">{totalCompleted}</p>
          <p className="text-xs text-muted-foreground mt-0.5">in selected period</p>
        </div>
        <div className="bg-gradient-to-br from-[color:var(--success)]/5 to-[color:var(--success)]/10 border border-[color:var(--success)]/20 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground">Completion Rate</p>
          <p className="text-2xl font-bold mt-1 font-mono tabular-nums">{completionRate}%</p>
          <p className="text-xs text-muted-foreground mt-0.5">of all tasks</p>
        </div>
        <div className="bg-gradient-to-br from-[color:var(--warning)]/5 to-[color:var(--warning)]/10 border border-[color:var(--warning)]/20 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground">Avg Sprint Velocity</p>
          <p className="text-2xl font-bold mt-1 font-mono tabular-nums">{avgVelocity}</p>
          <p className="text-xs text-muted-foreground mt-0.5">story points</p>
        </div>
        <div className="bg-gradient-to-br from-destructive/5 to-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground">Critical Priority</p>
          <p className="text-2xl font-bold mt-1 font-mono tabular-nums">
            {taskPriorityDistribution.find((d) => d.priority === "Critical")?.count ?? 0}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">tasks open</p>
        </div>
      </div>

      {/* Row 1: Task Completion Bar + Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 1: Monthly Task Completion */}
        <Card className="linear-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Task Completion Trend</CardTitle>
            <p className="text-xs text-muted-foreground">
              Completed vs. target tasks per month
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={completionData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  name="completed"
                  fill="oklch(0.50 0.18 270)"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="target"
                  name="target"
                  fill="oklch(0.50 0.18 270 / 0.15)"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Status Distribution Donut */}
        <Card className="linear-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Status Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">Current task breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={taskStatusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                >
                  {taskStatusDistribution.map((entry: TaskDistributionPoint, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="mt-2 space-y-1">
              {taskStatusDistribution.map((entry: TaskDistributionPoint) => (
                <div key={entry.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span className="text-muted-foreground">{entry.status}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums">{entry.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Velocity Line + Priority Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 4: Sprint Velocity Line */}
        <Card className="linear-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Team Velocity</CardTitle>
            <p className="text-xs text-muted-foreground">
              Story points completed per sprint vs. target
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={sprintVelocity}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0)" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[60, "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="points"
                  name="actual"
                  stroke="oklch(0.50 0.18 270)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "oklch(0.50 0.18 270)", strokeWidth: 0 }}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="target"
                  stroke="oklch(0.50 0.18 270 / 0.3)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 3: Priority Breakdown Horizontal Bars */}
        <Card className="linear-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Priority Breakdown</CardTitle>
            <p className="text-xs text-muted-foreground">Tasks by priority level</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                layout="vertical"
                data={taskPriorityDistribution}
                margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.922 0 0)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="priority"
                  type="category"
                  tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                  width={52}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="tasks" radius={[0, 3, 3, 0]} maxBarSize={20}>
                  {taskPriorityDistribution.map((entry: PriorityDistributionPoint, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
