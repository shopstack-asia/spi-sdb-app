import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-qv-chrome/40 bg-background/60 px-4 text-base text-foreground shadow-inner shadow-black/10 transition focus-visible:border-qv-gold/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qv-gold/40 placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
