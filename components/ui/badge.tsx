import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex max-w-full items-center rounded-md border px-2.5 py-0.5 text-xs font-mono leading-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground",
        blue: "border-blue/30 bg-blue/10 text-blue",
        purple: "border-purple/30 bg-purple/10 text-purple",
        cyan: "border-cyan/30 bg-cyan/10 text-cyan",
        outline: "border-border bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        "min-w-0 break-words whitespace-normal",
        className,
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
