import { NextResponse } from "next/server";

// Mock JSON for the Hackathon Demo
const DEMO_RESPONSE = {
    clauses: [
        {
            id: "clause_001",
            title: "1. SERVICES",
            type: "Scope",
            original_text: "Designer agrees to provide UI/UX design services as requested by Client from time to time at Client's sole discretion.",
            plain_english: "You must do any design work they ask for, whenever they ask, with no clear boundaries.",
            risk_level: 4,
            risk_label: "High",
            risk_reason: "Scope is dangerously vague. You could be forced into endless, undefined work.",
            is_red_flag: false,
            is_negotiable: true,
            missing_protection: "Specific deliverables, timeline, or scope limitation.",
        },
        {
            id: "clause_002",
            title: "2. INTELLECTUAL PROPERTY",
            type: "IP",
            original_text: "All work product, inventions, designs, and materials created by Designer, whether during working hours or personal time, shall be the sole and exclusive property of Client in perpetuity. This includes any pre-existing materials Designer incorporates into deliverables.",
            plain_english: "They own everything you create, even on your own time, plus any past work you include.",
            risk_level: 5,
            risk_label: "Critical",
            risk_reason: "Blatant IP grab. It claims ownership of your personal side projects and past work.",
            is_red_flag: true,
            red_flag_explanation: "This forces you to surrender ownership of independent work outside this contract.",
            is_negotiable: true,
            missing_protection: "Limitation to only work created specifically for this project.",
        },
        {
            id: "clause_003",
            title: "3. PAYMENT",
            type: "Payment",
            original_text: "Client shall pay Designer within 90 days of invoice receipt. Client reserves the right to request unlimited revisions prior to payment release.",
            plain_english: "They don't have to pay you for 3 months, and they can withhold payment if you refuse endless free revisions.",
            risk_level: 5,
            risk_label: "Critical",
            risk_reason: "Net-90 payment is unacceptably late. Unlimited revisions tied to payment release gives the client power to never pay.",
            is_red_flag: true,
            red_flag_explanation: "Net-90 + unlimited revisions is a standard recipe for withholding payment indefinitely.",
            is_negotiable: true,
            missing_protection: "Net-30 or Net-15 limit, capped revision rounds.",
        },
        {
            id: "clause_004",
            title: "4. NON-COMPETE",
            type: "NonCompete",
            original_text: "Designer agrees not to provide services to any company in any industry for a period of 3 years following termination of this agreement.",
            plain_english: "You cannot work for anyone else, in any industry, for 3 years after this contract ends.",
            risk_level: 5,
            risk_label: "Critical",
            risk_reason: "This destroys your livelihood. You would be barred from working entirely for 3 years.",
            is_red_flag: true,
            red_flag_explanation: "A 3-year global non-compete for a freelancer is incredibly predatory and often legally unenforceable.",
            is_negotiable: true,
            missing_protection: "Non-compete should be struck entirely, or strictly limited to direct competitors for 6-12 months max.",
        },
        {
            id: "clause_005",
            title: "5. TERMINATION",
            type: "Termination",
            original_text: "Client may terminate this agreement at any time without notice or compensation. Designer may not terminate without 90 days written notice and Client approval.",
            plain_english: "They can fire you instantly without paying. You cannot quit without 3 months notice AND their permission.",
            risk_level: 4,
            risk_label: "High",
            risk_reason: "One-sided termination. You are trapped while they have no commitment.",
            is_red_flag: false,
            is_negotiable: true,
            missing_protection: "Mutual 14-day or 30-day notice period.",
        },
        {
            id: "clause_006",
            title: "6. LIABILITY",
            type: "Liability",
            original_text: "Designer shall indemnify and hold harmless Client from any and all claims, losses, and expenses of any nature whatsoever.",
            plain_english: "You must pay for any lawsuits, losses, or expenses the client faces, regardless of whose fault it is.",
            risk_level: 4,
            risk_label: "High",
            risk_reason: "Uncapped, unilateral indemnification puts infinite financial risk on you.",
            is_red_flag: false,
            is_negotiable: true,
            missing_protection: "Liability cap (e.g., total fees paid) and mutual indemnification.",
        },
        {
            id: "clause_007",
            title: "7. GOVERNING LAW",
            type: "GoverningLaw",
            original_text: "This agreement shall be governed by the laws of Delaware regardless of Designer's location.",
            plain_english: "If you need to sue them, or they sue you, it happens in Delaware under Delaware law.",
            risk_level: 2,
            risk_label: "Low",
            risk_reason: "Standard corporate clause, though potentially inconvenient if you don't live near Delaware.",
            is_red_flag: false,
            is_negotiable: true,
            missing_protection: "Local jurisdiction preference.",
        }
    ],
    total_clauses: 7,
    contract_type: "Freelance Design Services Agreement",
    parties: { party_a: "DesignCorp Inc.", party_b: "Freelancer (Designer)" },
    top_red_flags: [
        {
            clause_id: "clause_004",
            clause_title: "4. NON-COMPETE",
            severity: "Critical",
            one_line_summary: "Bans you from all work in any industry for 3 years."
        },
        {
            clause_id: "clause_003",
            clause_title: "3. PAYMENT",
            severity: "Critical",
            one_line_summary: "Allows them to indefinitely withhold payment using endless revisions."
        },
        {
            clause_id: "clause_002",
            clause_title: "2. INTELLECTUAL PROPERTY",
            severity: "Critical",
            one_line_summary: "Steals ownership of your past and personal work outside this contract."
        }
    ],
    combined_risk_narrative: "This agreement is highly predatory. It combines a livelihood-destroying 3-year non-compete with an IP grab that claims your personal side projects. Meanwhile, payment terms are severely delayed (Net-90) and tied to unlimited revisions, creating a high risk of permanent non-payment.",
    missing_clauses: [
        "Limitation of Liability (Caps your financial exposure)",
        "Payment Schedule / Late Fees (Protects your cash flow)",
        "Severability (Ensures contract survives if one illegal clause is struck)"
    ],
    overall_score: 78,
    category_scores: {
        ip_rights: 100,
        payment_terms: 100,
        termination: 80,
        liability: 80,
        non_compete: 100,
        confidentiality: 0
    },
    risk_distribution: { critical: 3, high: 2, medium: 0, low: 1, safe: 0 },
    verdict: "RUN",
    verdict_color: "red",
    verdict_headline: "Do not sign this contract.",
    verdict_reasoning: "The 3-year blanket non-compete combined with the ownership grab of your personal time makes this genuinely dangerous to your career.",
    top_3_priorities: [
        "Strike the 3-year non-compete entirely.",
        "Limit IP transfer ONLY to specific deliverables created for this project.",
        "Change payment to Net-30 and cap revisions to 2 rounds."
    ],
    confidence: 96
};

// Simulate 6-step Antigravity chain delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { contract_text } = body;

        if (!contract_text || typeof contract_text !== "string") {
            return NextResponse.json({ error: "Missing contract_text" }, { status: 400 });
        }

        // In a real implementation we would make 6 sequential Antigravity API calls here.
        // Step 1: Segmentation
        // Step 2: Clause Analysis
        // Step 3: Red Flag Synthesis
        // Step 4: Risk Scoring
        // Step 5: Verdict Generation
        // Step 6: Negotiation Emails

        // For Hackathon Demo, simulate processing time
        await delay(3500);

        return NextResponse.json(DEMO_RESPONSE);
    } catch (error) {
        console.error("Antigravity analysis failed:", error);
        return NextResponse.json(
            { error: "Analysis failed. Please try again." },
            { status: 500 }
        );
    }
}
