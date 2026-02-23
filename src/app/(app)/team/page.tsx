"use client";

import { useState, useMemo } from "react";
import { Search, CheckCircle2, Clock, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { teamMembers } from "@/data/mock-data";
import type { TeamRole } from "@/lib/types";

type RoleFilter = "all" | TeamRole;

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
];

function RoleBadge({ role }: { role: TeamRole }) {
  const config: Record<TeamRole, { label: string; className: string }> = {
    admin: { label: "Admin", className: "text-primary bg-primary/10" },
    manager: { label: "Manager", className: "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10" },
    member: { label: "Member", className: "text-muted-foreground bg-muted" },
    viewer: { label: "Viewer", className: "text-muted-foreground/70 bg-muted/60" },
  };
  const c = config[role];
  return (
    <Badge variant="outline" className={`text-xs font-medium border-0 rounded-full ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function formatLastActive(iso: string): string {
  const d = new Date(iso);
  const now = new Date("2026-02-23T12:00:00Z");
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

const AVATAR_COLORS = [
  "bg-[color:var(--chart-1)]/20 text-[color:var(--chart-1)]",
  "bg-[color:var(--chart-2)]/20 text-[color:var(--chart-2)]",
  "bg-[color:var(--chart-3)]/20 text-[color:var(--chart-3)]",
  "bg-[color:var(--chart-4)]/20 text-[color:var(--chart-4)]",
  "bg-[color:var(--chart-5)]/20 text-[color:var(--chart-5)]",
];

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchSearch =
        search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.department.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || m.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {teamMembers.length} members across your workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Manage Roles</Button>
          <Button size="sm">Invite Member</Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, title, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1">
          {ROLE_FILTERS.map((f) => {
            const count =
              f.value === "all"
                ? teamMembers.length
                : teamMembers.filter((m) => m.role === f.value).length;
            return (
              <button
                key={f.value}
                onClick={() => setRoleFilter(f.value)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors duration-100 flex items-center gap-1.5 ${
                  roleFilter === f.value
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {f.label}
                <span
                  className={`text-xs font-mono px-1 rounded-sm ${
                    roleFilter === f.value
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap ml-auto">
          {filtered.length} member{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Team Cards Grid */}
      {filtered.length === 0 ? (
        <div className="linear-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No team members match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member, index) => {
            const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
            return (
              <Card
                key={member.id}
                className="linear-card animate-fade-in"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationDuration: "200ms",
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}
                    >
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight truncate">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {member.title}
                          </p>
                        </div>
                        <RoleBadge role={member.role} />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Department */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{member.department}</span>
                    <span className="text-muted-foreground/60">
                      Active {formatLastActive(member.lastActiveAt)}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="text-center p-2 rounded-md bg-muted/50">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[color:var(--success)]" />
                      </div>
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {member.tasksCompleted}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Done</p>
                    </div>
                    <div className="text-center p-2 rounded-md bg-muted/50">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Clock className="w-3 h-3 text-primary" />
                      </div>
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {member.tasksInProgress}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Active</p>
                    </div>
                    <div className="text-center p-2 rounded-md bg-muted/50">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Zap className="w-3 h-3 text-[color:var(--warning)]" />
                      </div>
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {member.sprintPoints}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Pts</p>
                    </div>
                  </div>

                  {/* Email */}
                  <p className="text-xs text-muted-foreground/70 truncate font-mono pt-0.5 border-t border-border/60">
                    {member.email}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
