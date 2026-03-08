"use client"

import { useState } from "react"
import { ContractInput } from "@/components/analyze/ContractInput"
import { ProcessingState } from "@/components/analyze/ProcessingState"
import { ResultsDashboard } from "@/components/analyze/ResultsDashboard"
import Link from "next/link"
import { Shield } from "lucide-react"
import Image from "next/image"
import { AnalysisResponse } from "@/types"

export default function AnalyzePage() {
    const [appState, setAppState] = useState<"INPUT" | "PROCESSING" | "RESULTS" | "ERROR">("INPUT")
    const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null)

    const handleAnalyze = async (text: string) => {
        if (!text.trim()) return;

        setAppState("PROCESSING")
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contract_text: text }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed analysis")

            setAnalysisResult(data)
            setAppState("RESULTS")
        } catch (err) {
            console.error(err)
            setAppState("ERROR")
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="border-b border-border bg-background/80 backdrop-blur-md z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image src="/lexai-logo.svg" alt="LexAI" width={120} height={30} className="h-7 w-auto" priority />
                    </Link>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl w-full flex flex-col">
                {appState === "INPUT" && <ContractInput onAnalyze={handleAnalyze} />}

                {appState === "PROCESSING" && (
                    <div className="flex-1 flex items-center justify-center">
                        <ProcessingState />
                    </div>
                )}

                {appState === "RESULTS" && analysisResult && (
                    <ResultsDashboard data={analysisResult} onReset={() => setAppState("INPUT")} />
                )}

                {appState === "ERROR" && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                        <Shield className="w-16 h-16 text-critical mb-4" />
                        <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
                        <p className="text-gray-400 mb-6">Something went wrong. Try pasting your contract again.</p>
                        <button
                            onClick={() => setAppState("INPUT")}
                            className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand/90 font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
