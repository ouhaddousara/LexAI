import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clause_id, clause_text } = body;

        if (!clause_id || !clause_text) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Step 6: Negotiation Email Generation
        // Simulate Antigravity delay
        await delay(1500);

        // Generate response based on the demo clause_ids
        let email_subject = "Question regarding contract clause";
        let email_body = "Hi team,\n\nI was reviewing the contract and had a question about one of the clauses.";
        let negotiation_ask = "Please clarify this clause.";

        if (clause_id === "clause_004") {
            email_subject = "Proposed revision to Non-Compete clause";
            email_body = "Hi team,\n\nThank you for sending over the agreement. I am excited to work together. However, I noticed the non-compete clause (Section 4) currently restricts me from working in any industry for 3 years post-termination. As a freelancer, I rely on taking multiple clients to sustain my business, so this restriction is unfortunately too broad.\n\nCould we revise this to be a strictly tailored non-solicitation of your direct clients during the contract term and for 6 months thereafter?\n\nLooking forward to your thoughts.";
            negotiation_ask = "Strike the broad 3-year non-compete and replace with a targeted non-solicitation clause.";
        } else if (clause_id === "clause_003") {
            email_subject = "Proposed revision to Payment Terms";
            email_body = "Hi team,\n\nThanks for the contract. Before I sign, I'd like to request a standard adjustment to the Payment Terms (Section 3). Net-90 days is difficult for my cash flow, and tying final payment to unlimited revisions presents an open-ended risk on my end.\n\nCould we update this to Net-30 terms, and cap revisions to two rounds as is standard for my project rates?\n\nLet me know if this works for you.";
            negotiation_ask = "Change payment to Net-30 and cap revisions to 2 rounds.";
        } else if (clause_id === "clause_002") {
            email_subject = "Clarification on Intellectual Property clause";
            email_body = "Hi team,\n\nI'm reviewing the agreement and need to adjust the IP clause (Section 2). Given its current wording, it inadvertently claims IP rights to my independent, pre-existing work and personal projects outside the scope of our engagement.\n\nCould we amend the wording so that IP transfer explicitly applies only to the specific deliverables created distinctly for this project?\n\nPlease let me know your thoughts so we can finalize the agreement.";
            negotiation_ask = "Limit IP transfer strictly to deliverables created for this project.";
        }

        return NextResponse.json({
            clause_id,
            email_subject,
            email_body,
            tone: "Professional",
            negotiation_ask,
        });
    } catch (error) {
        console.error("Antigravity email generation failed:", error);
        return NextResponse.json(
            { error: "Failed to generate email." },
            { status: 500 }
        );
    }
}
