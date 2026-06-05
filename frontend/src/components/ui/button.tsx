import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-black)]/20",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "primary" &&
            "bg-[var(--color-action-black)] text-white hover:bg-[var(--color-midnight-ink)] rounded-pill",
          variant === "secondary" &&
            "bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--soft)] rounded-lg",
          variant === "outline" &&
            "bg-white text-[var(--ink)] border border-[var(--color-soft-concrete)] hover:bg-[var(--surface)] rounded-pill",
          variant === "ghost" &&
            "bg-transparent text-[var(--ink)] hover:bg-[var(--surface)] rounded-lg",
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
