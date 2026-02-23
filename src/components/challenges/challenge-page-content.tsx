"use client";

import type { ReactNode } from "react";
import type { ChallengeData } from "@/data/challenges";
import { OutcomeStatement } from "./outcome-statement";
import { VizRbacFlow } from "./viz-rbac-flow";
import { VizRealtimeBeforeAfter } from "./viz-realtime-before-after";
import { VizSearchMetrics } from "./viz-search-metrics";
import { VizDeploymentArch } from "./viz-deployment-arch";
import { VizCodebaseStack } from "./viz-codebase-stack";

const visualizations: Record<string, ReactNode> = {
  "challenge-1": <VizRbacFlow />,
  "challenge-2": <VizRealtimeBeforeAfter />,
  "challenge-3": <VizSearchMetrics />,
  "challenge-4": <VizDeploymentArch />,
  "challenge-5": <VizCodebaseStack />,
};

interface ChallengePageContentProps {
  challenges: ChallengeData[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => {
        const stepNumber = String(index + 1).padStart(2, "0");
        return (
          <div
            key={challenge.id}
            className="linear-card p-6 space-y-4 bg-gradient-to-br from-accent/5 to-background"
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: "200ms",
            }}
          >
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
                  {stepNumber}
                </span>
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-[calc(1.5rem+0.75rem)]">
                {challenge.description}
              </p>
            </div>
            <div className="pl-[calc(1.5rem+0.75rem)]">
              {visualizations[challenge.id]}
            </div>
            <div className="pl-[calc(1.5rem+0.75rem)]">
              <OutcomeStatement outcome={challenge.outcome} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
