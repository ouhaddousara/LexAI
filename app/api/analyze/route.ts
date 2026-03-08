import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function extractDynamicScore(text: string, baseScore: number, keywordRisk: number) {
    let score = baseScore;
    if (text.toLowerCase().includes("indemnify") || text.toLowerCase().includes("indemnification")) score += 15;
    if (text.toLowerCase().includes("perpetuity") || text.toLowerCase().includes("all work product")) score += 15;
    if (text.toLowerCase().includes("non-compete") || text.toLowerCase().includes("noncompete")) score += 20;
    if (text.toLowerCase().includes("net-90") || text.toLowerCase().includes("90 days")) score += 10;
    return Math.min(100, Math.max(0, score + keywordRisk));
}

function generateDynamicClauses(text: string) {
    const textLower = text.toLowerCase();
    const clauses = [];
    let criticals = 0;
    let highs = 0;
    let mediums = 0;
    let lows = 0;

    // Generate dynamic IP clause
    if (textLower.includes("intellectual property") || textLower.includes("ownership") || textLower.includes("work product")) {
        let risk = 2; // low
        let label = "Low";
        let title = "INTELLECTUAL PROPERTY";
        let reason = "Standard IP ownership transfer for completed works.";
        let redFlag = false;

        if (textLower.includes("perpetuity") || textLower.includes("moral rights") || textLower.includes("all inventions")) {
            risk = 5; label = "Critical"; redFlag = true; criticals++;
            reason = "Overly broad IP grab claiming ownership potentially over unrelated or personal work.";
        } else { lows++; }

        clauses.push({
            id: "clause_ip", title, type: "IP",
            original_text: "Excerpt related to Intellectual Property...",
            plain_english: "Rules governing who owns the work you produce.",
            risk_level: risk, risk_label: label, risk_reason: reason, is_red_flag: redFlag, is_negotiable: true,
            missing_protection: "Clear boundaries limiting IP transfer strictly to project deliverables."
        });
    }

    // Generate dynamic Non-Compete clause
    if (textLower.includes("compete") || textLower.includes("competition")) {
        let risk = 5;
        let label = "Critical";
        let reason = "Restricts your ability to work for other clients after this project.";
        criticals++;
        clauses.push({
            id: "clause_nc", title: "NON-COMPETE", type: "NonCompete",
            original_text: "Excerpt related to Non-Compete...",
            plain_english: "You cannot work with competitors for a given period.",
            risk_level: risk, risk_label: label, risk_reason: reason, is_red_flag: true, is_negotiable: true,
            missing_protection: "Complete removal of non-compete for independent contractors."
        });
    }

    // Payment clause
    if (textLower.includes("pay") || textLower.includes("invoice") || textLower.includes("compensation")) {
        let risk = 1; let label = "Safe"; let redFlag = false; let reason = "Payment terms seem standard.";
        if (textLower.includes("net-90") || textLower.includes("90 days") || textLower.includes("unlimited revisions")) {
            risk = 5; label = "Critical"; redFlag = true; criticals++;
            reason = "Highly unfavorable payment delays or conditions strings attached.";
        } else if (textLower.includes("net-60")) {
            risk = 3; label = "Medium"; mediums++;
            reason = "Payment cycle is a bit long.";
        } else {
            lows++;
        }
        clauses.push({
            id: "clause_pay", title: "PAYMENT TERMS", type: "Payment",
            original_text: "Excerpt related to Payment and Compensation...",
            plain_english: "How and when you will receive your compensation.",
            risk_level: risk, risk_label: label, risk_reason: reason, is_red_flag: redFlag, is_negotiable: true,
            missing_protection: "Late fee penalties and strict net-30 terms."
        });
    }

    // Liability clause
    if (textLower.includes("liability") || textLower.includes("indemnify") || textLower.includes("hold harmless")) {
        let risk = 4; let label = "High"; let redFlag = false; let reason = "You bear significant financial liability if issues arise.";
        highs++;
        clauses.push({
            id: "clause_liab", title: "LIABILITY & INDEMNIFICATION", type: "Liability",
            original_text: "Excerpt related to Liability...",
            plain_english: "You may be forced to pay for legal damages.",
            risk_level: risk, risk_label: label, risk_reason: reason, is_red_flag: redFlag, is_negotiable: true,
            missing_protection: "Liability cap equal to total project fees."
        });
    }

    // Termination clause
    if (textLower.includes("terminat") || textLower.includes("cancel")) {
        clauses.push({
            id: "clause_term", title: "TERMINATION", type: "Termination",
            original_text: "Excerpt related to contract termination...",
            plain_english: "Rules for ending the agreement early.",
            risk_level: 2, risk_label: "Low", risk_reason: "Provides a mechanism to end the contract.", is_red_flag: false, is_negotiable: true,
            missing_protection: "Mutual notice period (e.g. 14 days)."
        });
        lows++;
    }

    // Fallback if the input text is very short or unrecognized
    if (clauses.length === 0) {
        clauses.push({
            id: "clause_unknown", title: "GENERAL TERMS", type: "Scope",
            original_text: "Assorted text...",
            plain_english: "General contractual obligations.",
            risk_level: 3, risk_label: "Medium", risk_reason: "Vague terms detected.", is_red_flag: false, is_negotiable: true,
            missing_protection: "More specific scope definition."
        });
        mediums++;
    }

    return { clauses, counts: { critical: criticals, high: highs, medium: mediums, low: lows, safe: 0 } };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { contract_text } = body;

        if (!contract_text || typeof contract_text !== "string") {
            return NextResponse.json({ error: "Missing contract_text" }, { status: 400 });
        }

        await delay(2000); // simulate processing

        const { clauses, counts } = generateDynamicClauses(contract_text);

        // Base score calculated from keywords and standard risks
        const overallScore = extractDynamicScore(contract_text, 10, counts.critical * 10 + counts.high * 5);

        let verdict = "SIGN";
        let verdict_color = "green";
        let verdict_headline = "Looks good to sign.";
        if (overallScore > 75) {
            verdict = "RUN";
            verdict_color = "red";
            verdict_headline = "Do not sign this contract.";
        } else if (overallScore > 40) {
            verdict = "NEGOTIATE";
            verdict_color = "yellow";
            verdict_headline = "Changes recommended before signing.";
        }

        const topRedFlags = clauses.filter(c => c.is_red_flag).map(c => ({
            clause_id: c.id,
            clause_title: c.title,
            severity: c.risk_label,
            one_line_summary: c.risk_reason
        }));

        const DEMO_RESPONSE = {
            clauses: clauses,
            total_clauses: clauses.length,
            contract_type: "Custom Agreement",
            parties: { party_a: "Client", party_b: "Freelancer" },
            top_red_flags: topRedFlags,
            combined_risk_narrative: `Our analysis detected an overall risk score of ${overallScore}/100 based on your text. Make sure to carefully review the highlighted clauses.`,
            missing_clauses: [
                "Clear Liability Caps",
                "Explicit Payment Schedules"
            ],
            overall_score: overallScore,
            category_scores: {
                ip_rights: contract_text.toLowerCase().includes("perpetuity") ? 95 : 20,
                payment_terms: contract_text.toLowerCase().includes("90 days") ? 100 : 30,
                termination: contract_text.toLowerCase().includes("terminate") ? 60 : 10,
                liability: contract_text.toLowerCase().includes("indemnify") ? 85 : 15,
                non_compete: contract_text.toLowerCase().includes("compete") ? 100 : 0,
                confidentiality: contract_text.toLowerCase().includes("confident") ? 50 : 0
            },
            risk_distribution: counts,
            verdict: verdict,
            verdict_color: verdict_color,
            verdict_headline: verdict_headline,
            verdict_reasoning: `Calculated from ${clauses.length} identified clauses and keyword heuristics.`,
            top_3_priorities: [
                "Ensure IP transfer is bounded.",
                "Negotiate fairer payment windows if applicable.",
                "Review liability for fair risk distribution."
            ],
            confidence: 88
        };

        return NextResponse.json(DEMO_RESPONSE);
    } catch (error) {
        console.error("Antigravity analysis failed:", error);
        return NextResponse.json(
            { error: "Analysis failed. Please try again." },
            { status: 500 }
        );
    }
}
