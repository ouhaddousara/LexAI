"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Shield } from "lucide-react"

interface Props {
    onAnalyze: (text: string) => void
}

export function ContractInput({ onAnalyze }: Props) {
    const [text, setText] = useState("")

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full mt-12">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold mb-2">Review your contract</h1>
                <p className="text-gray-400">Paste your contract text below. We&apos;ll identify the risks in 30 seconds.</p>
            </div>

            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-96 bg-card border border-border rounded-xl p-6 text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                    placeholder="Paste your freelance agreement, NDA, or terms of service here..."
                />

                {text.length === 0 && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-4">
                        <p className="text-gray-600">Paste any contract above to get started.</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4 text-safe" />
                    <span className="text-white">🔒 Your contract is never stored or shared.</span>
                </div>

                <Button
                    size="lg"
                    onClick={() => onAnalyze(text)}
                    disabled={text.trim().length < 50}
                >
                    Analyze Contract →
                </Button>
            </div>
        </div>
    )
}
