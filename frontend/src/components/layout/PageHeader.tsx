import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Section } from "./Section";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ eyebrow, title, subtitle, rightSlot, className }, ref) => {
    return (
      <Section size="sm" className={cn("border-b border-[var(--border)]", className)}>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              {eyebrow && (
                <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-[-0.02em]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[var(--ink-secondary)] max-w-prose text-base leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {rightSlot && (
              <div className="flex-shrink-0">
                {rightSlot}
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
