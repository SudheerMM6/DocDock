import * as React from "react"
import { cn } from "../../lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "none"
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          size === "lg" && "py-24",
          size === "md" && "py-20",
          size === "sm" && "py-12",
          size === "none" && "",
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"
