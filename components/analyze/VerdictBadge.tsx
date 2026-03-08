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
            "rounded-[24px] border p-8 flex flex-col gap-4",
            {
                "bg-safe/5 border-safe/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]": isSign,
                "bg-medium/5 border-medium/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]": isNegotiate,
                "bg-critical/[0.03] border-critical/30 shadow-[0_0_60px_rgba(220,38,38,0.3)]": isRun,
            }
        )}>
            <div className="flex items-center gap-4">
                <span className={cn(
                    "text-xl font-bold tracking-wider px-4 py-2 rounded-full text-white",
                    {
                        "bg-safe": isSign,
                        "bg-medium": isNegotiate,
                        "bg-critical": isRun,
                    }
                )}>
                    {verdict}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{headline}</h3>
            </div>
            <p className="text-gray-300 mt-2 text-[15px] leading-relaxed">
                {reasoning}
            </p>
        </div>
    )
}
