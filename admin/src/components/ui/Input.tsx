import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full px-3 py-2",
          "bg-[var(--color-canvas-white)]",
          "border border-[var(--border)] rounded-feature",
          "text-sm text-[var(--ink)]",
          "placeholder:text-[var(--ink-secondary)]",
          "focus:outline-none focus:border-[var(--ink)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
