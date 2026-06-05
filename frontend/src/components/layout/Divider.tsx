import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-px w-full bg-[var(--border)]", className)}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
