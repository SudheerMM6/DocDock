import * as React from "react";
import { cn } from "@/lib/utils";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = "md", ...props }, ref) => {
    const gapClasses = {
      sm: "space-y-4",
      md: "space-y-6",
      lg: "space-y-8",
    };

    return (
      <div
        ref={ref}
        className={cn(gapClasses[gap], className)}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

export { Stack };
