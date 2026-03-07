"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Circle } from "lucide-react"

const STEPS = [
    "Reading contract...",
    "Identifying clauses...",
    "Scoring risk levels...",
    "Generating verdict...",
]

export function ProcessingState() {
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        // 3500ms total mock delay / 4 steps ~= 800ms per step
        // In a real streaming app, this would react to actual SSE events
        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= STEPS.length - 1) {
                    clearInterval(interval)
                    return prev
                }
                return prev + 1
            })
        }, 800)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full py-12">
            <div className="w-16 h-16 rounded-full border-t-2 border-brand border-r-2 animate-spin mb-8" />

            <h2 className="text-2xl font-bold mb-8">LexAI is reading your contract...</h2>

            <div className="flex flex-col gap-4 w-full">
                {STEPS.map((step, index) => {
                    const isCompleted = currentStep > index
                    const isActive = currentStep === index
                    const isPending = currentStep < index

                    return (
                        <div
                            key={index}
                            className={`flex items-center xl gap-3 p-3 rounded-lg border transition-colors duration-500
                ${isActive ? "bg-card border-brand/50 shadow-[0_0_15px_rgba(37,99,235,0.1)]" : "border-transparent"}
                ${isCompleted ? "text-gray-300" : isPending ? "text-gray-600" : "text-white"}
              `}
                        >
                            {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-brand" />
                            ) : isActive ? (
                                <div className="w-5 h-5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                            ) : (
                                <Circle className="w-5 h-5 text-gray-700" />
                            )}
                            <span className="font-medium">{step}</span>
                        </div>
                    )
                })}
            </div>

            <p className="mt-8 text-sm text-gray-500">Estimated time: ~25 seconds</p>
        </div>
    )
}
