import * as React from "react"
import { cn } from "../../lib/utils"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 6, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          gap === 1 && "space-y-1",
          gap === 2 && "space-y-2",
          gap === 3 && "space-y-3",
          gap === 4 && "space-y-4",
          gap === 5 && "space-y-5",
          gap === 6 && "space-y-6",
          gap === 8 && "space-y-8",
          gap === 10 && "space-y-10",
          gap === 12 && "space-y-12",
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
