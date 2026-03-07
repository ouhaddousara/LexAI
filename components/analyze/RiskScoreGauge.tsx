"use client"

import { cn } from "@/lib/utils"
// import { motion } from 'framer-motion'

interface Props {
    score: number // 0-100 (100 = max risk)
}

export function RiskScoreGauge({ score }: Props) {
    // Determine color based on score
    let colorClass = "text-safe"
    let strokeClass = "stroke-safe"
    if (score > 30) { colorClass = "text-low"; strokeClass = "stroke-low"; }
    if (score > 50) { colorClass = "text-medium"; strokeClass = "stroke-medium"; }
    if (score > 70) { colorClass = "text-high"; strokeClass = "stroke-high"; }
    if (score > 85) { colorClass = "text-critical"; strokeClass = "stroke-critical"; }

    const circumference = 2 * Math.PI * 45 // r=45
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={cn("transition-all duration-1000 ease-out", strokeClass)}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={cn("text-4xl font-black", colorClass)}>{score}</span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Risk Score</span>
                </div>
            </div>
        </div>
    )
}
