"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, AlertCircle, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tasks, getTeamMemberById, getProjectById } from "@/data/mock-data";
import type { Task, TaskStatus, TaskPriority } from "@/lib/types";

type SortKey = "dueDate" | "priority" | "status" | "id";
type SortDir = "asc" | "desc";

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const STATUS_ORDER: Record<TaskStatus, number> = {
  in_progress: 5,
  in_review: 4,
  todo: 3,
  backlog: 2,
  done: 1,
};

function StatusBadge({ status, isOverdue }: { status: TaskStatus; isOverdue?: boolean }) {
  if (isOverdue) {
    return (
      <Badge
        variant="outline"
        className="text-xs font-medium border-0 rounded-full text-destructive bg-destructive/10"
      >
        Overdue
      </Badge>
    );
  }
  const config: Record<TaskStatus, { label: string; className: string }> = {
    done: { label: "Done", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    in_progress: { label: "In Progress", className: "text-primary bg-primary/10" },
    in_review: { label: "In Review", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    todo: { label: "To Do", className: "text-muted-foreground bg-muted" },
    backlog: { label: "Backlog", className: "text-muted-foreground bg-muted/60" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={`text-xs font-medium border-0 rounded-full ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config: Record<TaskPriority, { label: string; className: string }> = {
    critical: { label: "Critical", className: "text-destructive bg-destructive/10" },
    high: { label: "High", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    medium: { label: "Medium", className: "text-primary bg-primary/10" },
    low: { label: "Low", className: "text-muted-foreground bg-muted" },
  };
  const c = config[priority];
  return (
    <Badge variant="outline" className={`text-xs font-medium border-0 rounded-full ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchSearch =
          search === "" ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
        return matchSearch && matchStatus && matchPriority;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "dueDate") {
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          cmp = aDate - bDate;
        } else if (sortKey === "priority") {
          cmp = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        } else if (sortKey === "status") {
          cmp = STATUS_ORDER[b.status] - STATUS_ORDER[a.status];
        } else if (sortKey === "id") {
          cmp = a.id.localeCompare(b.id);
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [search, statusFilter, priorityFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3 h-3 ml-1 inline" />
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All tasks across every project
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">New Task</Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="backlog">Backlog</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {filtered.length} task{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Tasks Table */}
      <div className="linear-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none w-24"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    ID
                    <SortIcon col="id" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Title
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none w-32"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon col="status" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none w-28"
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center gap-1">
                    Priority
                    <SortIcon col="priority" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide w-36">
                  Assignee
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide w-44">
                  Project
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none w-28"
                  onClick={() => handleSort("dueDate")}
                >
                  <div className="flex items-center gap-1">
                    Due Date
                    <SortIcon col="dueDate" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                    No tasks match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((task: Task) => {
                  const assignee = task.assigneeId
                    ? getTeamMemberById(task.assigneeId)
                    : undefined;
                  const project = getProjectById(task.projectId);
                  return (
                    <TableRow
                      key={task.id}
                      className="hover:bg-muted/30 transition-colors duration-100"
                    >
                      <TableCell className="py-2 px-3 font-mono text-xs text-muted-foreground">
                        {task.id}
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium leading-tight line-clamp-1">
                            {task.title}
                          </span>
                          {task.isOverdue && (
                            <AlertCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                          )}
                          {task.blockedBy && (
                            <Lock className="w-3.5 h-3.5 text-[color:var(--warning)] flex-shrink-0" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <StatusBadge status={task.status} isOverdue={task.isOverdue} />
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <PriorityBadge priority={task.priority} />
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        {assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                              {assignee.initials}
                            </div>
                            <span className="text-sm text-muted-foreground truncate max-w-[80px]">
                              {assignee.name.split(" ")[0]}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic">
                            Unassigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        {project ? (
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="text-sm text-muted-foreground truncate max-w-[140px]">
                              {project.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-3 font-mono text-sm tabular-nums">
                        <span
                          className={
                            task.isOverdue
                              ? "text-destructive font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {formatDate(task.dueDate)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-destructive" />
          <span>Overdue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[color:var(--warning)]" />
          <span>Blocked by dependency</span>
        </div>
      </div>
    </div>
  );
}
