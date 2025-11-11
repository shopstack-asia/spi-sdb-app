import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-qv-chrome/40 bg-background/60 px-4 py-3 text-base text-foreground shadow-inner shadow-black/10 transition focus-visible:border-qv-gold/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qv-gold/40 placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
