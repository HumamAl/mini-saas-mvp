"use client";

import { useState, useMemo } from "react";
import { CalendarDays, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { projects, getTeamMemberById } from "@/data/mock-data";
import type { Project, ProjectStatus } from "@/lib/types";

type StatusTab = "all" | ProjectStatus;

const STATUS_TABS: { value: StatusTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "planning", label: "Planning" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
];

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config: Record<ProjectStatus, { label: string; className: string }> = {
    active: { label: "Active", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    planning: { label: "Planning", className: "text-primary bg-primary/10" },
    completed: { label: "Completed", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    on_hold: { label: "On Hold", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    cancelled: { label: "Cancelled", className: "text-destructive bg-destructive/10" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={`text-xs font-medium border-0 rounded-full ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<StatusTab>("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((p) => p.status === activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} projects across your workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Import</Button>
          <Button size="sm">New Project</Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? projects.length
              : projects.filter((p) => p.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors duration-100 flex items-center gap-1.5 ${
                activeTab === tab.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs font-mono px-1.5 py-0.5 rounded-sm ${
                  activeTab === tab.value
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="linear-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No projects with this status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((project: Project, index) => {
            const teamMembers = project.teamIds
              .map((id) => getTeamMemberById(id))
              .filter(Boolean);

            return (
              <Card
                key={project.id}
                className="linear-card animate-fade-in"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationDuration: "200ms",
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold leading-snug">
                          {project.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          {project.id}
                        </p>
                      </div>
                    </div>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-mono font-medium text-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-1.5 bg-muted"
                    />
                  </div>

                  {/* Task count + team + dates */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
                        <span className="font-mono">
                          {project.completedTaskCount}/{project.taskCount} tasks
                        </span>
                      </div>
                    </div>

                    {/* Team avatars */}
                    <div className="flex items-center -space-x-1.5">
                      {teamMembers.slice(0, 5).map((member) => (
                        <div
                          key={member!.id}
                          title={member!.name}
                          className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-semibold border-2 border-background flex-shrink-0"
                        >
                          {member!.initials}
                        </div>
                      ))}
                      {teamMembers.length > 5 && (
                        <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[9px] font-semibold border-2 border-background flex-shrink-0">
                          +{teamMembers.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date range */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/60 pt-3">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{formatDate(project.startDate)}</span>
                    <span className="text-border">—</span>
                    <span>{formatDate(project.endDate)}</span>
                    <span className="ml-auto flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {teamMembers.length} members
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
