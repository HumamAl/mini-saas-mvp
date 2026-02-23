// src/app/(proposal)/proposal/page.tsx — Server Component (no "use client")
import { ExternalLink, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { proposalData } from "@/data/proposal";

export const metadata = { title: "Proposal — TaskForge" };

export default function ProposalPage() {
  const { hero, projects, approachSteps, skillCategories, cta } = proposalData;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 space-y-10">

        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden rounded-2xl"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 270))" }}
        >
          {/* Subtle radial highlight — top left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 20% 30%, oklch(0.55 0.12 var(--primary-h, 270) / 0.12), transparent 65%)",
            }}
          />

          {/* Main hero content */}
          <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 space-y-6">
            {/* Effort badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-white/60" />
              <span className="font-mono text-xs tracking-wider text-white/70">
                {hero.badgeText ?? "Built this demo for your project"}
              </span>
            </div>

            {/* Name + value prop — weight contrast typography */}
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest uppercase text-white/40">
                Full-Stack Developer · Next.js Specialist
              </p>
              <h1 className="text-4xl md:text-5xl tracking-tight leading-none">
                <span className="font-light text-white/80">Hi, I&apos;m</span>{" "}
                <span className="font-black text-white">{hero.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                {hero.valueProp}
              </p>
            </div>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/[0.05] px-8 py-5 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ─────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Built for real clients, shipped to production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="linear-card p-5 space-y-3"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">{project.name}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors duration-100"
                      aria-label={`View ${project.name} live demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome statement */}
                <div
                  className="flex items-start gap-2 rounded-md px-3 py-2"
                  style={{
                    backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
                    borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-xs font-medium text-[color:var(--success)]">
                    {project.outcome}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
            <p className="text-sm text-muted-foreground mt-1">
              No surprises. Visible progress. Short feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approachSteps.map((step, index) => (
              <div
                key={step.step}
                className="linear-card p-5 flex gap-4"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Step number */}
                <div className="shrink-0 pt-0.5">
                  <span className="font-mono text-2xl font-bold bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-transparent tabular-nums">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ───────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Skills</h2>
            <p className="text-sm text-muted-foreground mt-1">
              The tools that matter for this project.
            </p>
          </div>

          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.label} className="linear-card p-5 space-y-3">
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs px-2.5 py-1 rounded-full border-border/60 text-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: CTA ───────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden rounded-2xl"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 270))" }}
        >
          {/* Subtle radial highlight — bottom right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 80% 80%, oklch(0.55 0.12 var(--primary-h, 270) / 0.10), transparent 60%)",
            }}
          />

          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col items-center text-center gap-6">
            {/* Availability indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ backgroundColor: "var(--success)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--success)" }}
                />
              </span>
              <span className="font-mono text-xs tracking-wider text-white/50">
                {cta.availabilityNote}
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {cta.heading}
              </h2>
              <p className="text-base text-white/60 leading-relaxed">{cta.subtext}</p>
            </div>

            {/* CTA button */}
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
              asChild
            >
              <a href={cta.ctaHref} target="_blank" rel="noopener noreferrer">
                {cta.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            {/* Signature */}
            <p className="text-sm text-white/30 mt-2">— {cta.authorName}</p>
          </div>
        </section>

      </div>
    </div>
  );
}
