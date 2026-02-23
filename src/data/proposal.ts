// src/data/proposal.ts
// Tab 3 — Proposal (sales page) data for TaskForge mini-SaaS demo

export interface PortfolioProject {
  name: string;
  description: string;
  outcome: string;
  tech: string[];
  url?: string; // omit if no live demo — ExternalLink icon must NOT render
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ProposalData {
  hero: {
    name: string;
    valueProp: string;
    badgeText?: string;
    stats: HeroStat[];
  };
  projects: PortfolioProject[];
  approachSteps: ApproachStep[];
  skillCategories: SkillCategory[];
  cta: {
    heading: string;
    subtext: string;
    availabilityNote: string;
    ctaLabel: string;
    ctaHref: string;
    authorName: string;
  };
}

export const proposalData: ProposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "Full-stack developer who ships production-grade SaaS tools — from RBAC and real-time sync to polished dashboards.",
    badgeText: "Built this demo for your project",
    stats: [
      { value: "24+", label: "projects shipped" },
      { value: "15+", label: "industries served" },
      { value: "< 48hr", label: "demo turnaround" },
    ],
  },
  projects: [
    {
      name: "WMF Agent Dashboard",
      description:
        "AI-powered customer service agent for Windsor Metal Finishing — email classification, RFQ data extraction with confidence scoring, and human-in-the-loop approval workflow.",
      outcome: "Replaced a 4-hour manual quote review with a 20-minute automated extraction flow",
      tech: ["Next.js", "TypeScript", "Claude API", "n8n"],
      url: "https://wmf-agent-dashboard.vercel.app",
    },
    {
      name: "Fleet Maintenance SaaS",
      description:
        "Fleet and asset management platform with work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard — six modules covering the full maintenance lifecycle.",
      outcome: "Full asset lifecycle tracking with work orders, preventive schedules, and parts inventory",
      tech: ["Next.js", "Recharts", "TypeScript", "shadcn/ui"],
      // no url — omit ExternalLink icon
    },
    {
      name: "Lead Intake CRM",
      description:
        "Custom lead intake and automation system with a public intake form, CRM dashboard, lead scoring, pipeline management, and configurable automation rules engine.",
      outcome: "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
      tech: ["Next.js", "TypeScript", "shadcn/ui"],
      // no url — omit ExternalLink icon
    },
    {
      name: "Data Intelligence Platform",
      description:
        "Unified analytics and intelligence dashboard that aggregates data from multiple sources, classifies insights with AI, and exposes interactive charts with exportable reports.",
      outcome: "Multi-source data aggregation with AI classification and exportable reports",
      tech: ["Next.js", "TypeScript", "Recharts", "AI APIs"],
      url: "https://data-intelligence-platform-sandy.vercel.app",
    },
  ],
  approachSteps: [
    {
      step: "01",
      title: "Understand",
      description:
        "Deep-read requirements, map user roles, clarify the one scope question that unlocks the rest. No assumptions.",
      timeline: "Day 1",
    },
    {
      step: "02",
      title: "Architect",
      description:
        "Design database schema, API contracts, and component hierarchy before touching code. RBAC roles defined up front.",
      timeline: "Day 2–3",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Ship iteratively — working features first, polish second. Visible progress every few days, not just at the end.",
      timeline: "Day 4–10",
    },
    {
      step: "04",
      title: "Handover",
      description:
        "Documented code, deployment guide, and an architecture walkthrough so your team can extend it confidently.",
      timeline: "Day 11–12",
    },
  ],
  skillCategories: [
    {
      label: "Frontend",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "Recharts"],
    },
    {
      label: "Backend & APIs",
      skills: ["Node.js", "REST APIs", "WebSockets", "PostgreSQL", "Redis"],
    },
    {
      label: "Auth & Security",
      skills: ["RBAC", "JWT", "OAuth", "OWASP best practices"],
    },
    {
      label: "DevOps",
      skills: ["Vercel", "Docker", "CI/CD", "GitHub Actions"],
    },
  ],
  cta: {
    heading: "Let's build this together",
    subtext:
      "Available to start this week. Happy to jump on a quick call to discuss your exact requirements.",
    availabilityNote: "Available to start within 48 hours",
    ctaLabel: "Start the Conversation",
    ctaHref: "https://www.upwork.com/freelancers/humam",
    authorName: "Humam",
  },
};
