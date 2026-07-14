# FounderOS.AI // Next-Gen Startup Validator & Finance OS

> **Scalable and developer-friendly systems built for creators, startups, and indie hackers.**

FounderOS.AI is a double-sided platform designed to help high-velocity builders stress-test their ideas through adversarial AI simulation and automate shared capital reconciliation in one unified dashboard.

---

## ✦ Core Systems & Features

### 1. Adversarial Idea Roaster (AACP Engine)
Generic AI validators suffer from alignment bias—they naturally try to agree with you. Our **Adversarial Anti-Consensus Protocol (AACP)** matrix enforces game-theoretic friction among 6 specialized AI nodes:
*   **VC Investor:** Exposes market size deficiencies and TAM traps.
*   **Cynical Founder:** Highlights execution difficulty, burnout paths, and churn threats.
*   **Growth Hacker:** Reviews organic beachhead tactics and CAC/LTV imbalances.
*   **Enterprise Customer:** Evaluates workflow integration and willingness to pay.
*   **Technical Architect:** Identifies structural duplication risks and infrastructure cost models.
*   **Competitor CEO:** Simulates defensive cloning, pricing wars, and marketing blocks.

### 2. Analytical Score Telemetry
Visualizes critical validation metrics in real time:
*   **Death Probability Engine:** Percentage chance of project failure/abandonment within 18 months.
*   **Reality vs Hype Meter:** A gauge measuring the gap between current trend hype and underlying utility.
*   **Would Investors Fund This?:** A venture capital viability score based on exit-potential indicators.
*   **Execution Difficulty Score:** Complexity rating mapping development hours against resources.

### 3. Expense Finance OS
Automated corporate tracking ledger that simplifies cross-entity expenses, debt reconciliation, and cash trajectory maps for multi-member teams.

### 4. Stripe Subscription & PDF Export Simulation
Implements a freemium SaaS model checkout simulation. Upgrading to the Pro tier unlocks:
*   Moat Defensibility Analysis
*   Validation MVP Execution Plans
*   Incumbent Defensive Simulations
*   Printable PDF Audit Dossier Download

---

## ✦ Project Directory Layout

*   [`src/lib/db.ts`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/lib/db.ts) — Client-side database client managing local storage states, settings indexes, and mock billing configurations.
*   [`src/lib/roast-engine.ts`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/lib/roast-engine.ts) — Core prompt matrices and API integration handlers for Gemini, OpenAI, and Claude, complete with retry failovers.
*   [`src/app/api/`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/api) — Backend route endpoints for generating context-deepening questions and running AACP debates.
*   [`src/app/page.tsx`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/page.tsx) — Main marketing Landing page.
*   [`src/app/dashboard/`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/dashboard) — Founder portal listing statistics and history records.
*   [`src/app/roast/new/`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/roast/new) — Multi-card input wizard and interrogation step interface.
*   [`src/app/roast/pending/`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/roast/pending) — Live debate streaming terminal log.
*   [`src/app/roast/[id]/`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/src/app/roast/[id]) — Tabbed strategic audit report viewer.
*   [`DEPLOY.md`](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/DEPLOY.md) — Hosting guidelines.

---

## ✦ Quick Start

### 1. Install Dependencies
Run from your project root:
```bash
npm install
```

### 2. Configure Keys
Create a `.env.local` file in your root folder and set your credentials:
```env
GEMINI_API_KEY=your_gemini_key_here
# Optional fallback keys
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here
```

### 3. Launch Development Server
To start the server locally with Turbopack disabled (recommended for WebAssembly/Windows environments):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ API Integration Endpoints

Developer-friendly routes for curl audits:
*   **Generate Interrogation Questions:** `POST /api/questions`
*   **Run Debate Audit:** `POST /api/roast`

---

## ✦ Production Deployment
Refer to [DEPLOY.md](file:///C:/Users/pisal/.gemini/antigravity/scratch/startup-roast-ai/DEPLOY.md) for full instructions on building static outputs and deploying serverless functions to Vercel or Netlify.
