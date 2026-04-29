<div align="center">

<img src="https://lex-ai-three.vercel.app/lexai-logo.svg" alt="LexAI Logo" height="60" />

# LexAI

**AI-powered contract intelligence. Know what you're signing before you sign.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square)](https://lex-ai-three.vercel.app)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://lex-ai-three.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-97%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)

[Live App](https://lex-ai-three.vercel.app) · [Analyze a Contract](https://lex-ai-three.vercel.app/analyze) · [Report a Bug](https://github.com/ouhaddousara/LexAI/issues) · [Request a Feature](https://github.com/ouhaddousara/LexAI/issues)

</div>

---

## Overview

LexAI is a full-stack SaaS application that uses AI to review contracts in under 30 seconds. It identifies hidden clauses, unfair terms, and legal red flags, then generates professional negotiation emails so users can push back on bad terms — without needing a lawyer.

The application targets freelancers, founders, and teams who sign contracts regularly but lack immediate access to legal counsel.

---

## Features

| Feature | Description |
|---|---|
| **30-Second Analysis** | Paste any contract text and receive a structured risk report instantly |
| **Red Flag Detection** | Catches hidden IP grabs, one-sided termination clauses, predatory payment terms, and more |
| **Plain English Translations** | Converts dense legalese into clear, actionable summaries |
| **Risk Scoring** | Assigns an overall risk score to help users decide: sign, negotiate, or reject |
| **Negotiation Email Generator** | Drafts professional pushback emails for each flagged clause (Pro) |
| **Contract History Dashboard** | Browse and revisit past analyses (Pro) |
| **Team Shared Library** | Collaborate on contracts with up to 5 seats (Team) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14+](https://nextjs.org/) (App Router, Server Components) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database ORM** | [Prisma](https://www.prisma.io/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Linting** | ESLint |

---

## Project Structure

```
LexAI/
├── app/                    # Next.js App Router — pages and API routes
├── components/             # Reusable React components
├── lib/                    # Utility functions, AI client, helpers
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets (logo, images)
├── src/app/                # Additional app directory (route segments)
├── types/                  # Global TypeScript type definitions
├── next.config.ts          # Next.js configuration
├── prisma.config.ts        # Prisma client configuration
├── tailwind.config.*       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript compiler options
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn
- A PostgreSQL database (local or hosted, e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ouhaddousara/LexAI.git
cd LexAI
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file at the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/lexai"

# App
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Run Prisma migrations**

```bash
npx prisma generate
npx prisma migrate dev
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

The application is configured for one-click deployment on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ouhaddousara/LexAI)

Ensure all environment variables from `.env.local` are set in your Vercel project settings before deploying.

---

## Pricing Tiers

| Plan | Price | Analyses | Features |
|---|---|---|---|
| **Free** | $0/month | 3/month | Basic risk scoring, plain English translations |
| **Pro** | $29/month | Unlimited | Advanced red flag detection, negotiation email generator, contract history |
| **Team** | $79/month | Unlimited | Everything in Pro + 5 seats + shared contract library |

---

## Roadmap

- [ ] PDF and DOCX file upload support
- [ ] Clause-level inline annotations
- [ ] Multi-language contract support
- [ ] Jurisdiction-aware risk analysis


---

## Author

**Sara Ouhaddou**  
[![GitHub](https://img.shields.io/badge/GitHub-ouhaddousara-181717?style=flat-square&logo=github)](https://github.com/ouhaddousara)

---

<div align="center">
<sub>Your contracts are never stored or shared. All analysis is ephemeral by design.</sub>
</div>
