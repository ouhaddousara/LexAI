"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProps {
    children: React.ReactNode
    content: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm whitespace-nowrap",
                        {
                            "bottom-full left-1/2 -translate-x-1/2 mb-2": position === "top",
                            "top-full left-1/2 -translate-x-1/2 mt-2": position === "bottom",
                            "right-full top-1/2 -translate-y-1/2 mr-2": position === "left",
                            "left-full top-1/2 -translate-y-1/2 ml-2": position === "right",
                        }
                    )}
                >
                    {content}
                    <div
                        className={cn(
                            "absolute w-2 h-2 bg-gray-900 rotate-45",
                            {
                                "top-full left-1/2 -translate-x-1/2 -mt-1": position === "top",
                                "bottom-full left-1/2 -translate-x-1/2 -mb-1": position === "bottom",
                                "left-full top-1/2 -translate-y-1/2 -ml-1": position === "left",
                                "right-full top-1/2 -translate-y-1/2 -mr-1": position === "right",
                            }
                        )}
                    />
                </div>
            )}
        </div>
    )
}
