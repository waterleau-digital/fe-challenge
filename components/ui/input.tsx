import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-border px-3 py-1 text-base bg-input transition-[color,box-shadow] outline-none",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "aria-invalid:border-destructive aria-invalid:outline-destructive",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          className,
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };