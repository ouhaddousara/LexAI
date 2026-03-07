"use client"

import { cn } from "@/lib/utils"

interface Props {
    verdict: "SIGN" | "NEGOTIATE" | "RUN"
    headline: string
    reasoning: string
}

export function VerdictBadge({ verdict, headline, reasoning }: Props) {
    const isSign = verdict === "SIGN"
    const isNegotiate = verdict === "NEGOTIATE"
    const isRun = verdict === "RUN"

    return (
        <div className={cn(
            "rounded-xl border p-6 flex flex-col gap-2",
            {
                "bg-safe/10 border-safe/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]": isSign,
                "bg-medium/10 border-medium/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]": isNegotiate,
                "bg-critical/10 border-critical/30 shadow-[0_0_30px_rgba(220,38,38,0.2)] animate-pulse-glow": isRun,
            }
        )}>
            <div className="flex items-center gap-3">
                <span className={cn(
                    "text-2xl font-black tracking-wider px-3 py-1 rounded-lg text-white",
                    {
                        "bg-safe": isSign,
                        "bg-medium": isNegotiate,
                        "bg-critical": isRun,
                    }
                )}>
                    {verdict}
                </span>
                <h3 className="text-xl font-bold">{headline}</h3>
            </div>
            <p className="text-gray-300 mt-2 leading-relaxed">
                {reasoning}
            </p>
        </div>
    )
}
