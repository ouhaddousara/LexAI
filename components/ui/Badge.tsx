import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "safe" | "low" | "medium" | "high" | "critical" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-brand text-white": variant === "default",
                    "border-transparent bg-safe/20 text-safe": variant === "safe",
                    "border-transparent bg-low/20 text-low": variant === "low",
                    "border-transparent bg-medium/20 text-medium": variant === "medium",
                    "border-transparent bg-high/20 text-high": variant === "high",
                    "border-transparent bg-critical text-white animate-pulse-glow shadow-[0_0_15px_rgba(220,38,38,0.5)]": variant === "critical",
                    "text-foreground": variant === "outline",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
