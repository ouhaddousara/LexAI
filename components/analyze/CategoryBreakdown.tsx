import { ProgressBar } from "@/components/ui/ProgressBar"

interface Props {
    scores: {
        ip_rights: number
        payment_terms: number
        termination: number
        liability: number
        non_compete: number
        confidentiality: number
    }
}

export function CategoryBreakdown({ scores }: Props) {
    const getIndicatorColor = (val: number) => {
        if (val < 20) return "bg-safe"
        if (val < 50) return "bg-low"
        if (val < 70) return "bg-medium"
        if (val < 90) return "bg-high"
        return "bg-critical"
    }

    const categories = [
        { label: "Intellectual Property", value: scores.ip_rights },
        { label: "Payment Terms", value: scores.payment_terms },
        { label: "Termination", value: scores.termination },
        { label: "Liability", value: scores.liability },
        { label: "Non-Compete", value: scores.non_compete },
        { label: "Confidentiality", value: scores.confidentiality },
    ]

    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Category Breakdown</h4>
            {categories.map((cat, i) => (
                <div key={i} className="flex flex-col gap-2 relative">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-300">{cat.label}</span>
                        <span className="text-white">{cat.value}/100</span>
                    </div>
                    <ProgressBar value={cat.value} indicatorColor={getIndicatorColor(cat.value)} />
                </div>
            ))}
        </div>
    )
}
