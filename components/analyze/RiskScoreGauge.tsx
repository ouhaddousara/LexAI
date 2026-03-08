"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface Props {
    score: number // 0-100 (100 = max risk)
}

export function RiskScoreGauge({ score }: Props) {
    const [animatedScore, setAnimatedScore] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedScore(score)
        }, 100)
        return () => clearTimeout(timer)
    }, [score])

    // Determine color based on score
    let colorClass = "text-safe"
    if (score > 30) { colorClass = "text-low"; }
    if (score > 50) { colorClass = "text-medium"; }
    if (score > 70) { colorClass = "text-high"; }
    if (score > 85) { colorClass = "text-critical"; }

    const circumference = 2 * Math.PI * 45 // r=45
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={cn("transition-all duration-1000 ease-out", colorClass)}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={cn("text-5xl font-black", colorClass)}>{score}</span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">Risk Score</span>
                </div>
            </div>
        </div>
    )
}
