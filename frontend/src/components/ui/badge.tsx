import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-action-black)]/20",
          // Variants - monochrome by default
          variant === "default" &&
            "bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)]",
          variant === "success" &&
            "bg-[var(--surface)] text-[var(--success)] border border-[var(--border)]",
          variant === "warning" &&
            "bg-[var(--surface)] text-[var(--warning)] border border-[var(--border)]",
          variant === "info" &&
            "bg-[var(--surface)] text-[var(--ink-secondary)] border border-[var(--border)]",
          variant === "outline" &&
            "bg-white text-[var(--ink-secondary)] border border-[var(--border)]",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
