"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Copy, Check } from "lucide-react"

import { Clause, EmailResponse } from "@/types"

interface Props {
    clause: Clause
}

export function NegotiationEmail({ clause }: Props) {
    const [emailData, setEmailData] = useState<EmailResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        async function fetchEmail() {
            try {
                const res = await fetch("/api/analyze/email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        clause_id: clause.id,
                        clause_text: clause.original_text,
                        risk_reason: clause.risk_reason
                    })
                })
                const data = await res.json()
                setEmailData(data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchEmail()
    }, [clause])

    const copyToClipboard = () => {
        if (emailData) {
            navigator.clipboard.writeText(`${emailData.email_subject}\n\n${emailData.email_body}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (loading) {
        return (
            <div className="animate-pulse space-y-3 p-4 bg-muted/20 rounded-lg">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-24 bg-muted rounded w-full"></div>
            </div>
        )
    }

    if (!emailData) {
        return <p className="text-sm text-critical">Failed to generate email.</p>
    }

    return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm relative">
            <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-semibold">Subject: {emailData.email_subject}</div>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2 shrink-0">
                    {copied ? <Check className="w-4 h-4 text-safe" /> : <Copy className="w-4 h-4" />}
                </Button>
            </div>
            <div className="text-sm text-gray-300 whitespace-pre-wrap font-sans bg-muted/30 p-3 rounded border border-border">
                {emailData.email_body}
            </div>
            <div className="mt-4 text-xs font-semibold text-brand">
                Goal: {emailData.negotiation_ask}
            </div>
        </div>
    )
}
