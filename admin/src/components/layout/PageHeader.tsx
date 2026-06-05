import * as React from "react"
import { cn } from "../../lib/utils"
import { Container } from "./Container"
import { Section } from "./Section"

export interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  rightSlot?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  rightSlot,
  className,
}) => {
  return (
    <Section size="sm" className={cn("pb-4", className)}>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-bold text-[var(--ink)] tracking-[-0.03em]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-[var(--ink-secondary)]">{subtitle}</p>
            )}
          </div>
          {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
        </div>
      </Container>
    </Section>
  )
}
