import * as React from "react"
import { cn } from "@/lib/utils"
// import { motion } from "framer-motion"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
    indicatorColor?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, indicatorColor = "bg-brand", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
                {...props}
            >
                <div
                    className={cn("h-full w-full flex-1 transition-all duration-500 ease-in-out", indicatorColor)}
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            </div>
        )
    }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
