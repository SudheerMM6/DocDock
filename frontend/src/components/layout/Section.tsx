import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size = "md", as: Component = "section", ...props }, ref) => {
    const sizeClasses = {
      sm: "py-8 md:py-10",
      md: "py-10 md:py-14",
      lg: "py-14 md:py-16",
    };

    return (
      <Component
        ref={ref}
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

export { Section };
