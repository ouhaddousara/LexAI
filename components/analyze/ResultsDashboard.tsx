"use client"

import { VerdictBadge } from "./VerdictBadge"
import { RiskScoreGauge } from "./RiskScoreGauge"
import { CategoryBreakdown } from "./CategoryBreakdown"
import { ClauseCard } from "./ClauseCard"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { AnalysisResponse, RedFlag, Clause } from "@/types"

interface Props {
    data: AnalysisResponse
    onReset: () => void
}

export function ResultsDashboard({ data, onReset }: Props) {
    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Analysis Results</h1>
                <Button variant="ghost" onClick={onReset} className="gap-2 text-gray-400 hover:text-white">
                    <ArrowLeft className="w-4 h-4" /> Analyze Another Contract
                </Button>
            </div>

            <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-start">

                {/* Main Content (Left in desktop) */}
                <div className="flex flex-col gap-8">
                    <VerdictBadge
                        verdict={data.verdict}
                        headline={data.verdict_headline}
                        reasoning={data.verdict_reasoning}
                    />

                    {data.top_red_flags?.length > 0 && (
                        <div className="bg-critical/5 border border-critical/20 rounded-xl p-6 flex flex-col gap-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-critical">
                                <AlertTriangle className="w-6 h-6" /> Top Red Flags
                            </h3>
                            <div className="flex flex-col gap-3">
                                {data.top_red_flags.map((rf: RedFlag, i: number) => (
                                    <div key={i} className="flex flex-col gap-1 p-3 bg-card border border-border rounded-lg">
                                        <span className="text-xs font-bold text-gray-400 uppercase">{rf.clause_title}</span>
                                        <span className="text-sm font-medium">{rf.one_line_summary}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-bold mb-6">Clause Breakdown</h2>
                        <div className="flex flex-col gap-6">
                            {data.clauses?.map((clause: Clause) => (
                                <ClauseCard key={clause.id} clause={clause} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right in desktop) */}
                <div className="flex flex-col gap-6 w-full lg:sticky lg:top-24">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 text-center">Overall Risk</h3>
                        <RiskScoreGauge score={data.overall_score} />
                        <div className="mt-8">
                            <CategoryBreakdown scores={data.category_scores} />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Contract Details</h3>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Type</span>
                                <span className="font-medium text-right ml-4 text-foreground">{data.contract_type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Party A</span>
                                <span className="font-medium text-right ml-4 text-foreground">{data.parties?.party_a}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Party B</span>
                                <span className="font-medium text-right ml-4 text-foreground">{data.parties?.party_b}</span>
                            </div>
                            <div className="flex justify-between border-t border-border pt-3 mt-1">
                                <span className="text-gray-500">Total Clauses</span>
                                <span className="font-medium text-foreground">{data.total_clauses}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recommended Actions</h4>
                        <ul className="text-sm space-y-2 mt-2">
                            {data.top_3_priorities?.map((priority: string, i: number) => (
                                <li key={i} className="flex gap-2 text-gray-300">
                                    <span className="text-brand font-bold">•</span> {priority}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
