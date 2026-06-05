import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20",
          "disabled:pointer-events-none disabled:opacity-50",
          // No shadow - Titan spec
          "shadow-none",
          // Variants
          variant === "primary" && [
            "bg-[var(--accent)] text-white",
            "hover:bg-[var(--ink)]",
            "rounded-pill",
          ],
          variant === "outline" && [
            "bg-transparent border border-[var(--border)] text-[var(--ink)]",
            "hover:bg-[var(--surface)]",
            "rounded-pill",
          ],
          variant === "ghost" && [
            "bg-transparent text-[var(--ink)]",
            "hover:bg-[var(--surface)]",
            "rounded-nav",
          ],
          variant === "danger" && [
            "bg-transparent text-red-600",
            "hover:bg-red-50",
            "rounded-nav",
          ],
          // Sizes
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-10 px-5 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
