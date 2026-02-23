# Domain Knowledge Brief — Task/Project Management SaaS (B2B, SMB-focused)

## Sub-Domain Classification

**Independent B2B task/project management SaaS targeting software teams and small-to-mid-size technology companies (5-50 users, 3-10 active projects simultaneously). Methodology mix: Agile/Scrum-primary with Kanban boards as secondary view. Customers include early-stage startups and growing product teams.**

---

## Entity Names (10+ realistic names)

### Companies / Organizations (customers of TaskForge)
- Ridgeline Labs
- Meridian Stack
- Fieldstone Digital
- Aperture Software
- Dawnbrook Technologies
- Ironhaven Systems
- Portcullis Dev
- Claravon Studios
- Stormgate Platforms
- Nexhive Technologies
- Verdant Cloud
- Thornfield SaaS

### People Names (role-appropriate for software teams)
- Marcus Chen (Engineering Lead)
- Priya Nair (Product Owner)
- Jordan Wells (Senior Developer)
- Sofia Reyes (Scrum Master)
- Tobias Holt (Backend Engineer)
- Ananya Sharma (QA Engineer)
- Declan Murphy (Frontend Developer)
- Yuki Tanaka (DevOps Engineer)
- Caitlin O'Brien (Project Manager)
- Ravi Patel (CTO / Tech Lead)
- Leila Nassar (UI/UX Designer)
- Owen Fletcher (Full-Stack Developer)

### Projects / Epics / Sprints
- Velocity API Overhaul
- Auth & SSO Migration
- Payments Module v2
- Mobile Client Beta
- Dashboard Redesign Sprint
- Onboarding Flow Refactor
- Notification Engine
- Data Export Pipeline
- Multi-Tenant Architecture
- Search Indexing Upgrade

### Team Names
- Platform Core
- Growth Engineering
- Infrastructure
- Design Systems
- Customer Experience
- DevOps & Release
- Mobile Squad

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Sprint velocity (story points / 2-week sprint) | 18 | 42 | 68 | New teams average 5-10 pts/person; experienced 3-5 devs ≈ 40-55 |
| Sprint goal completion rate | 52% | 74% | 91% | High-performing teams hit 80%+ consistently (Metridev benchmark) |
| Task cycle time (from "In Progress" to "Done") | 0.5 days | 2.8 days | 11 days | Bugs typically faster; features longer |
| Number of open tasks per active developer | 3 | 7 | 18 | >15 signals planning breakdown |
| Overdue task rate (% past due date) | 4% | 14% | 31% | Teams without ceremony discipline trend high |
| Blocked task duration | 1 hr | 1.4 days | 6 days | Dependency blockers average longer than approval blockers |
| Active projects per workspace | 2 | 6 | 14 | Larger orgs run more projects but risk context switching |
| Tasks per sprint per team | 12 | 27 | 55 | Correlates with team size and decomposition habits |
| Bug-to-feature task ratio | 15% bugs | 28% bugs | 45% bugs | Mature products trend higher; new products trend lower |
| Story point estimate accuracy | ±8% | ±22% | ±47% | Fibonacci scale reduces variance vs. linear estimates |
| Team size per workspace | 3 | 9 | 28 | Sweet spot for task tools is 5-15 users |
| PR cycle time (open → merged) | 2 hrs | 18 hrs | 72 hrs | Elite teams average <24 hours (Harness benchmark) |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Sprint | A fixed-length iteration (usually 1-2 weeks) where a team completes a set of committed tasks | Core Scrum unit; sprints have start/end dates and a goal |
| Backlog | The master list of all tasks, features, and bugs prioritized but not yet scheduled | Product Backlog = all work; Sprint Backlog = committed for current sprint |
| Story Points | Abstract units measuring effort/complexity of a task using Fibonacci scale (1,2,3,5,8,13) | Estimation; used to calculate velocity |
| Velocity | Average story points completed per sprint over last 3 sprints | Sprint planning input; "our velocity is 42 points" |
| Burndown Chart | Graph showing remaining work (Y) vs. time (X) in a sprint; ideal line vs. actual | Sprint health indicator; flat or rising lines = scope creep or blocking |
| Epic | A large body of work (containing multiple user stories or tasks) spanning weeks to months | Parent container for a feature set; e.g., "Payments Epic" |
| User Story | A task framed from the user's perspective: "As a [role] I want [feature] so that [benefit]" | Task description format; linked to acceptance criteria |
| Acceptance Criteria | Conditions that must be met for a task to be considered done | QA checkpoint; prevents ambiguity on "done" |
| Blocker | A dependency or issue preventing a task from progressing | Status label; blockers are escalated immediately |
| Sprint Retrospective | Team meeting at sprint end to reflect on process, not just outcomes | Ceremony; produces action items for next sprint |
| Definition of Done (DoD) | Team-agreed checklist that a task must pass before being closed | Quality gate; prevents premature task closure |
| Kanban Board | Visual task management board with columns (To Do, In Progress, Review, Done) | Alternative to sprint view; good for continuous flow work |
| WIP Limit | Maximum number of tasks allowed in a column (Work In Progress limit) | Kanban constraint that forces bottleneck visibility |
| Technical Debt | Shortcuts or suboptimal code decisions that accumulate and slow future development | Often tracked as separate task type; 15-20% of sprint capacity recommended for debt |
| Roadmap | High-level timeline showing planned epics and milestones over quarters | Executive communication tool; not day-to-day task level |
| Throughput | Number of tasks completed per unit of time (week/sprint) | Flow metric used in Kanban; complements velocity |
| Cycle Time | Time from when work starts on a task to when it is complete | Key flow metric; low cycle time = high responsiveness |
| Lead Time | Time from when a task is created/requested to when it is complete | Includes wait time in backlog; always >= cycle time |
| Scope Creep | Unplanned additions to sprint scope after sprint planning | Common cause of sprint goal failure |
| Spike | A time-boxed research or investigation task with no deliverable code output | Used when effort is unknown; results inform estimates |

---

## Common Workflows

### Workflow 1: Sprint Planning and Execution
1. Product Owner prioritizes backlog items and moves top items to "Sprint Ready"
2. Team holds Sprint Planning meeting, reviews candidates, and assigns story points
3. Team commits to sprint goal and moves stories to "Sprint Backlog"
4. Daily standups: each member updates task status (In Progress, Review, Blocked)
5. Developers move tasks through: Backlog → In Progress → In Review → Done
6. QA validates tasks against acceptance criteria before marking Done
7. Sprint closes; burndown chart reviewed; velocity recorded
8. Sprint Retrospective: team identifies 1-3 process improvements

### Workflow 2: Bug Triage and Resolution
1. Bug reported via internal form or external support ticket
2. Engineering Lead reviews severity: Critical / High / Medium / Low
3. Critical bugs bypass sprint queue and are assigned immediately
4. Bug assigned to developer, linked to the affected Epic or component
5. Developer reproduces, fixes, and opens PR with test coverage
6. PR reviewed by one or two peers; QA verifies fix in staging
7. Bug task moved to Done; linked to release note

### Workflow 3: Feature Request to Delivery
1. Product Owner creates Epic for new feature set
2. Epic broken into User Stories with acceptance criteria
3. Stories estimated in planning poker session (story points)
4. Stories enter backlog; prioritized by business value vs. effort
5. Stories scheduled into sprints based on velocity and dependencies
6. Development proceeds; stories may be split mid-sprint if too large
7. Feature shipped; outcome tracked (usage metrics, support tickets)

---

## Common Edge Cases

1. **Blocked tasks with aging blockers** — Task blocked for 3+ days with no owner update; blocker source is an external dependency (third-party API, client approval)
2. **Overdue tasks carried across multiple sprints** — Task created 3 sprints ago still "In Progress"; original assignee left team
3. **Unestimated backlog items** — Story points = 0 or null; skipped during planning; inflates apparent capacity
4. **Sprint scope creep** — Task added to active sprint mid-week without removing equivalent scope; sprint ends at 110% commitment
5. **Tasks with no assignee** — Orphaned tasks in backlog with no owner, no priority, no sprint assignment
6. **Duplicate tasks** — Same bug reported twice from different team members; one resolved, one remains open
7. **Overloaded assignee** — Single developer has 12+ active tasks; team average is 6
8. **High-priority task with zero story points** — Marked P0/Critical but never estimated; planning gap
9. **Completed epic with open child tasks** — Epic closed as done but 2 sub-tasks remain in "In Progress"
10. **Tasks in "Review" for 5+ days** — PR opened but no reviewer assigned; sitting stale

---

## What Would Impress a Domain Expert

1. **Velocity trend vs. calendar events** — Experienced PMs know velocity drops 20-35% around major holidays, onboarding weeks, and quarterly planning cycles. A chart that shows velocity with sprint annotations (e.g., "Q4 planning week") signals deep understanding.

2. **Fibonacci scale story point enforcement** — Real teams use 1, 2, 3, 5, 8, 13, 21 (not 1-10). Any mock data using these values, not arbitrary integers like 6 or 9, signals insider knowledge. A task estimated at "7 points" immediately reads as fake.

3. **Bug-to-feature ratio drift** — Domain experts know that as a product matures, bugs increasingly crowd out feature work. A burndown or pie chart showing the bug percentage trend over 6 sprints (climbing from 18% to 34%) demonstrates real product lifecycle awareness.

4. **Sprint commitment vs. actual delta** — Not just "did they finish" but by how much did velocity deviate from commitment. A "sprint accuracy" metric (committed: 42 pts, delivered: 38 pts = 90.5% accuracy) is what experienced Scrum Masters track, not just raw velocity.

5. **WIP limit violation alerts** — In Kanban views, senior practitioners immediately look for WIP limit indicators. If a "In Review" column has a WIP limit of 3 and currently holds 5 items, that is a visible bottleneck signal that only someone who has implemented Kanban would think to include.

---

## Common Systems & Tools Used

| Tool | Category | Notes |
|------|----------|-------|
| Linear | Task Management | Favored by startups; speed-first; keyboard-centric UX |
| Jira | Task Management | Enterprise standard; 75% of Fortune 500; high configurability |
| Asana | Task Management | Strong for cross-functional teams; timeline/Gantt view |
| ClickUp | All-in-one | Docs + tasks + goals in one; popular with SMBs |
| Notion | Docs + Tasks | Lightweight; wikis + basic task management |
| GitHub Projects | Task Management | Native to repos; tight PR/issue linking |
| Shortcut (formerly Clubhouse) | Task Management | Popular with product-focused engineering teams |
| Confluence | Documentation | Wiki paired with Jira; spec and ADR storage |
| Slack | Communication | Bot integrations for task notifications common |
| Figma | Design | Tasks often reference Figma links for design specs |
| Sentry | Error Monitoring | Bug tasks often created from Sentry error triggers |
| PagerDuty | Incident Management | Critical incidents become high-priority tasks |

---

## Geographic / Cultural Considerations

No specific geographic constraints identified. Task management SaaS is globally applicable. However:
- US-based teams: typically Monday-Friday sprints, planning on Monday, retro on Friday
- Time zones matter for distributed teams — "blocked" may mean "waiting for async response"
- Currency: USD assumed for any billing/subscription mock data
- Sprint calendar: US holidays (Thanksgiving, Christmas week) cause predictable velocity drops

---

## Data Architect Notes

### Entity Names to Use
- Use these company names as workspace/organization names: "Ridgeline Labs", "Meridian Stack", "Aperture Software", "Ironhaven Systems", "Dawnbrook Technologies"
- Use these people names as task assignees: Marcus Chen, Priya Nair, Jordan Wells, Sofia Reyes, Tobias Holt, Ananya Sharma, Declan Murphy, Yuki Tanaka, Owen Fletcher
- Use these project/epic names: "Auth & SSO Migration", "Payments Module v2", "Dashboard Redesign Sprint", "Notification Engine", "Mobile Client Beta"
- Use these team names: "Platform Core", "Growth Engineering", "Infrastructure", "Design Systems"

### Metric Values to Use as Field Data
- Story points per task: draw from Fibonacci set only — 1, 2, 3, 5, 8, 13 (never 4, 6, 7, 9, 10, 11, 12)
- Sprint velocity: range 34-58 for a 5-person team; target 42 as the "typical" sprint
- Task cycle time: 0.5 to 8.5 days; most tasks cluster at 1-3 days
- Overdue tasks: ~12-18% of total open tasks should have past-due dates
- Completion rate per sprint: 68% to 89%; never exactly 100% or exactly 50%
- Priority distribution: ~15% Critical/P0, 30% High, 40% Medium, 15% Low

### Status Labels (exact strings)
- Task statuses: `"Backlog"`, `"Todo"`, `"In Progress"`, `"In Review"`, `"Done"`, `"Blocked"`, `"Cancelled"`
- Priority labels: `"Critical"`, `"High"`, `"Medium"`, `"Low"`
- Sprint status: `"Active"`, `"Planned"`, `"Completed"`, `"Cancelled"`
- Epic status: `"In Progress"`, `"Planning"`, `"Completed"`, `"On Hold"`
- Task types: `"Feature"`, `"Bug"`, `"Spike"`, `"Chore"`, `"Tech Debt"`

### Edge Cases to Include as Specific Records
- 1-2 tasks with status `"Blocked"` and blocker_since date > 3 days ago
- 2-3 tasks with due_date in the past and status NOT `"Done"` (overdue)
- 1 task with assignee = null (unassigned orphan in backlog)
- 1 task with story_points = 0 (unestimated)
- 1 sprint with completion_rate = 58% (underperforming sprint with comment "Scope creep from client revisions")
- 1 epic with progress = 94% but status = `"In Progress"` (nearly done but not closed)
- 1 task with 5 comments and last_activity 8 days ago (stale discussion)

### Date Patterns
- Sprint duration: exactly 14 days
- Sprint names: "Sprint 23", "Sprint 24", "Sprint 25" (sequential numbering)
- Current sprint started within last 7 days; ends in next 7 days
- Sprint history: 6 sprints of historical data (3 months back)
- Task created_at: spread across last 90 days; due_at within 30 days future
- Avoid round dates like "2026-02-01" — use realistic timestamps like "2026-02-03T09:14:22Z"
