"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Shield } from "lucide-react"

import ElectricBorder from "@/components/ui/ElectricBorder"

interface Props {
    onAnalyze: (text: string) => void
}

export function ContractInput({ onAnalyze }: Props) {
    const [text, setText] = useState("")

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full mt-[10vh]">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Review your contract</h1>
                <p className="text-gray-400 text-lg">Paste your contract text. We&apos;ll identify the risks in 30 seconds.</p>
            </div>

            <ElectricBorder color="#00E68A" speed={0.2} chaos={0} borderRadius={16} className="w-full">
                <div className="relative border border-white/5 rounded-2xl overflow-hidden transition-colors bg-[#0A0A0A]">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-80 bg-transparent p-6 text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand resize-none relative z-10"
                        placeholder="Paste your freelance agreement, NDA, or terms of service here..."
                    />
                </div>
            </ElectricBorder>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4 text-safe" />
                    <span className="text-gray-300">Your contract is encrypted and never stored.</span>
                </div>

                <Button
                    className="bg-primary text-primary-foreground font-medium rounded-full h-12 px-8 text-[16px] hover:brightness-110"
                    style={{ fontFamily: 'var(--font-display)' }}
                    onClick={() => onAnalyze(text)}
                    disabled={text.trim().length < 50}
                >
                    Analyze Contract →
                </Button>
            </div>
        </div>
    )
}
