export interface Clause {
    id: string;
    title: string;
    type: string;
    original_text: string;
    plain_english: string;
    risk_level: number;
    risk_label: string;
    risk_reason?: string;
    is_red_flag: boolean;
    red_flag_explanation?: string | null;
    is_negotiable?: boolean;
    missing_protection?: string | null;
}

export interface RedFlag {
    clause_id: string;
    clause_title: string;
    severity: string;
    one_line_summary: string;
}

export interface CategoryScores {
    ip_rights: number;
    payment_terms: number;
    termination: number;
    liability: number;
    non_compete: number;
    confidentiality: number;
}

export interface AnalysisResponse {
    clauses: Clause[];
    total_clauses: number;
    contract_type: string;
    parties: { party_a: string; party_b: string };
    top_red_flags: RedFlag[];
    combined_risk_narrative: string;
    missing_clauses: string[];
    overall_score: number;
    category_scores: CategoryScores;
    risk_distribution: Record<string, number>;
    verdict: "SIGN" | "NEGOTIATE" | "RUN";
    verdict_color: string;
    verdict_headline: string;
    verdict_reasoning: string;
    top_3_priorities: string[];
    confidence: number;
}

export interface EmailResponse {
    clause_id: string;
    email_subject: string;
    email_body: string;
    tone: string;
    negotiation_ask: string;
}
