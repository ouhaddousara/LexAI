import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "danger" | "safe"
    size?: "default" | "sm" | "lg"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-brand text-white hover:bg-brand/90": variant === "default",
                        "border border-border bg-transparent hover:bg-muted text-foreground": variant === "outline",
                        "hover:bg-muted text-foreground": variant === "ghost",
                        "bg-critical text-white hover:bg-critical/90 shadow-[0_0_15px_rgba(220,38,38,0.5)]": variant === "danger",
                        "bg-safe text-white hover:bg-safe/90 shadow-[0_0_15px_rgba(34,197,94,0.3)]": variant === "safe",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-12 rounded-lg px-8 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
