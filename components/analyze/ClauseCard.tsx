"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { AlertTriangle, Mail } from "lucide-react"
import { NegotiationEmail } from "./NegotiationEmail"

import { Clause } from "@/types"

interface Props {
    clause: Clause
}

const SkullIcon = ({ filled }: { filled: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M12 2C7.58 2 4 5.58 4 10c0 2.76 1.34 5.2 3.41 6.73L8 20h8l.59-3.27C18.66 15.2 20 12.76 20 10c0-4.42-3.58-8-8-8z" />
        <path d="M9 17v2M15 17v2M9 10a1 1 0 100 2 1 1 0 000-2zM15 10a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
)

function SkullRating({ level }: { level: number }) {
    return (
        <div className="flex gap-1 text-critical" title={`Risk Level: ${level}/5`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={i <= (level || 0) ? "opacity-100" : "opacity-20"}>
                    <SkullIcon filled={i <= (level || 0)} />
                </div>
            ))}
        </div>
    )
}

export function ClauseCard({ clause }: Props) {
    const [showOriginal, setShowOriginal] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const getBadgeVariant = (label: string) => {
        const l = label.toLowerCase()
        if (l === "critical") return "critical"
        if (l === "high") return "high"
        if (l === "medium") return "medium"
        if (l === "low") return "low"
        return "safe"
    }

    return (
        <Card className={`border-l-4 ${clause.is_red_flag ? "border-l-critical shadow-sm" : "border-l-border"}`}>
            {clause.is_red_flag && (
                <div className="bg-critical/10 text-critical px-4 py-2 border-b border-critical/20 flex items-center text-sm font-semibold gap-2 rounded-t-xl">
                    <AlertTriangle className="w-4 h-4" />
                    RED FLAG: {clause.red_flag_explanation}
                </div>
            )}
            <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline">{clause.type}</Badge>
                            <CardTitle className="text-lg">{clause.title}</CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant={getBadgeVariant(clause.risk_label)}>{clause.risk_label.toUpperCase()}</Badge>
                        <SkullRating level={clause.risk_level} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">

                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Meaning</h4>
                    <p className="text-foreground font-medium leading-relaxed bg-muted/30 p-3 rounded-lg border border-border">
                        {clause.plain_english}
                    </p>
                </div>

                {clause.risk_reason && (
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Risk Analysis</h4>
                        <p className="text-gray-300 text-sm">
                            {clause.risk_reason}
                        </p>
                    </div>
                )}

                {clause.missing_protection && (
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Missing Protection</h4>
                        <p className="text-gray-300 text-sm">
                            {clause.missing_protection}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="text-xs text-brand hover:underline"
                    >
                        {showOriginal ? "Hide Original Text" : "Show Original Text"}
                    </button>

                    {clause.is_red_flag && clause.is_negotiable && (
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => setShowEmail(!showEmail)}>
                            <Mail className="w-4 h-4" />
                            {showEmail ? "Close Email Draft" : "Get Negotiation Email"}
                        </Button>
                    )}
                </div>

                {showOriginal && (
                    <div className="mt-2 p-3 bg-muted rounded border border-border text-xs text-gray-400 font-mono leading-relaxed">
                        {clause.original_text}
                    </div>
                )}

                {showEmail && clause.is_red_flag && (
                    <div className="mt-4 border-t border-border pt-4">
                        <NegotiationEmail clause={clause} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
