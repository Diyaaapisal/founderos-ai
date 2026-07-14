import { StartupRoast } from "./db";

// Helper to clean up string outputs from API block markdown wrappers
function parseJSONFromMarkdown(text: string): any {
  try {
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse JSON directly. Attempting regex extraction.", e);
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        throw new Error("Unable to parse JSON from response.");
      }
    }
    throw e;
  }
}

// -------------------------------------------------------------
// OFFLINE HEURISTIC & CUSTOMIZED GENERATOR
// -------------------------------------------------------------
function generateOfflineQuestions(inputs: any) {
  const idea = inputs.idea || "your startup";
  const audience = inputs.targetAudience || "mainstream users";
  const category = inputs.category || "software";
  const competitors = inputs.competitors || "existing solutions";
  const pricing = inputs.pricingModel || "subscription";
  
  return [
    {
      question: `Since your business model relies on ${pricing} targeting ${audience}, how will you maintain unit economics as customer acquisition costs (CAC) inevitably scale?`,
      answer: ""
    },
    {
      question: `You identified your category as ${category} and listed competitors like ${competitors}. What is your actual asymmetric moat that prevents them from copying your product inside a single sprint?`,
      answer: ""
    },
    {
      question: `Given your startup idea is "${idea}", why now? What recent shift in technology, behavior, or regulation makes this viable today when it failed previously?`,
      answer: ""
    }
  ];
}

function generateOfflineDebateAndReport(inputs: any, followUps: any[]): StartupRoast {
  const id = Math.random().toString(36).substring(2, 11);
  const date = new Date().toISOString();
  
  const idea = inputs.idea || "this project";
  const audience = inputs.targetAudience || "niche customers";
  const pricing = inputs.pricingModel || "SaaS";
  const category = inputs.category || "General Tech";
  const founder = inputs.founderBackground || "technical builder";
  const competitors = inputs.competitors || "incumbents";
  const acquisition = inputs.acquisitionStrategy || "word of mouth";
  const geography = inputs.geography || "global";
  const resources = inputs.resources || "limited capital";

  // Calculations for scores (Brutally low as required for roasting, but realistic)
  const marketViability = Math.floor(Math.random() * 20) + 30; // 30 - 50
  const founderAdvantage = Math.floor(Math.random() * 25) + 20; // 20 - 45
  const distributionStrength = Math.floor(Math.random() * 20) + 15; // 15 - 35
  const technicalFeasibility = Math.floor(Math.random() * 30) + 60; // 60 - 90
  const aiLeverage = Math.floor(Math.random() * 40) + 40; // 40 - 80
  const scalability = Math.floor(Math.random() * 30) + 30; // 30 - 60
  const monetization = Math.floor(Math.random() * 25) + 35; // 35 - 60
  const retentionPotential = Math.floor(Math.random() * 25) + 20; // 20 - 45

  const rawScore = Math.round((marketViability + founderAdvantage + distributionStrength + technicalFeasibility + aiLeverage + scalability + monetization + retentionPotential) / 8);
  const deathProbability = Math.floor(Math.random() * 15) + 80; // 80% - 95%
  const realityVsHype = Math.floor(Math.random() * 30) + 65; // 65% - 95%
  const wouldInvestorsFund = Math.floor(Math.random() * 15) + 10; // 10% - 25%
  const executionDifficulty = Math.floor(Math.random() * 20) + 70; // 70% - 90%
  const gtmViability = Math.floor(Math.random() * 25) + 20; // 20% - 45%
  const crowding = ["Extreme", "Saturated", "Heavy", "High"][Math.floor(Math.random() * 4)];

  return {
    id,
    createdAt: date,
    inputs: {
      idea,
      targetAudience: audience,
      pricingModel: pricing,
      category,
      founderBackground: founder,
      competitors,
      acquisitionStrategy: acquisition,
      geography,
      resources
    },
    followUps: followUps.map(f => ({ question: f.question, answer: f.answer })),
    debateLogs: [
      {
        agent: "VC Investor",
        role: "Tier-1 Venture Capitalist",
        avatar: "VC",
        color: "purple",
        positive: `The target category '${category}' has significant macroTailwinds, and scaling globally from '${geography}' represents a large hypothetical addressable market.`,
        negative: `A pricing structure of '${pricing}' is extremely difficult to scale to $100M ARR unless average contract value is >$15k/year. Your customer acquisition strategy ('${acquisition}') lacks organic loops or structural compounding.`,
        warning: `Incumbents like '${competitors}' already own the distribution pipes and can bundle this utility in a single product release. A founder with a '${founder}' background will struggle to navigate complex commercial enterprise procurement.`,
        opportunity: `If you pivot from a generic product into an enterprise-grade developer infrastructure layer, your unit economics and defensibility could triple.`,
        quote: `Your TAM calculations are based on massive wishful thinking. You are building a nice feature wrapper, not a VC-scale operating platform.`
      },
      {
        agent: "Cynical Founder",
        role: "3x Failed Founder & YC Alum",
        avatar: "CF",
        color: "red",
        positive: `Launching with '${resources}' forces you to face market realities fast before bloating your team structure.`,
        negative: `You're in love with this product idea, but the target audience '${audience}' doesn't care about your tech stack. They will churn by month three once the initial novelty fades.`,
        warning: `The acquisition strategy '${acquisition}' is just a placeholder for 'we hope users find us'. You will burn out within 9 months coding in an empty room.`,
        opportunity: `Stop coding today. Try to pre-sell a manual concierge version of this workflow for $100. If you can't sell it manually, code won't save you.`,
        quote: `I spent 18 months building something very similar. Let me save you the therapy bills: build a simple landing page, collect emails, and charge them first.`
      },
      {
        agent: "Growth Hacker",
        role: "Organic Distribution Specialist",
        avatar: "GH",
        color: "blue",
        positive: `Since '${audience}' congregate in online forums and communities, there are clear scraping and cold-outbound vectors.`,
        negative: `Your organic marketing ideas are outdated. Paid ads will drain your '${resources}' instantly, and SEO will take 12 months to drive a single conversion.`,
        warning: `Keywords in the '${category}' niche are heavily bid on by '${competitors}'. Your cost-per-click will make unit economics mathematically impossible.`,
        opportunity: `Build a free programmatic engineering-as-marketing tool (e.g. an audit tool or calculator) to acquire users organically.`,
        quote: `You have no viral loop or referral mechanism built into the core user journey. You're trying to push water uphill.`
      },
      {
        agent: "Technical Architect",
        role: "Principal Systems Architect",
        avatar: "TA",
        color: "green",
        positive: `The core technology for '${idea}' is straightforward. We can deploy a functional MVP on Next.js and Supabase in a week.`,
        negative: `There is zero technical defensibility here. A junior engineer with cursor can duplicate your entire landing page and database structure in a weekend.`,
        warning: `If you scale, API rates or token consumption under a '${pricing}' model will choke your gross margins down to single digits.`,
        opportunity: `Build local-first database caching or fine-tune a smaller open-source model to reduce inference cost by 90%.`,
        quote: `You are a wrapper on top of an API. Once that API provider releases your core feature as an update, your business model ceases to exist.`
      },
      {
        agent: "Competitor CEO",
        role: "CEO of Primary Competitor",
        avatar: "CC",
        color: "orange",
        positive: `Your launch will help validate the market and expand the category for us.`,
        negative: `We (${competitors}) already have enterprise contracts, security clearances (SOC-2 Type II), and a massive engineering team.`,
        warning: `The second you get traction, we will copy your exact features, launch it as a free toggle button, and buy Google Ads on your brand name.`,
        opportunity: `If you build a very specific API integration for a CRM we don't support, we might acquire you for talent-acq ($200k) in two years.`,
        quote: `We have 150 developers and a $15M marketing budget. If you somehow get traction in our segment, we will package your entire core product as a free toggle button in our next release.`
      }
    ],
    scores: {
      startupScore: rawScore,
      deathProbability,
      realityVsHype,
      wouldInvestorsFund,
      executionDifficulty,
      gtmViability,
      marketCrowding: crowding
    },
    report: {
      summary: `**FounderOS AI Audit Summary:** Evaluating the startup idea "${idea}" targeting ${audience} in the category of ${category}. Operating from ${geography} with ${resources} and using a ${pricing} pricing model. Key competitors listed: '${competitors}'.`,
      brutalRoast: `Let's strip away the founder hubris: this startup is a feature masquerading as a business. You are proposing a thin wrapper around a database or AI API and hoping that customers will magically migrate from their current setups. **${competitors}** holds all the structural advantages: distribution, compliance, brand trust, and capital. Your acquisition strategy of **${acquisition}** is entirely passive and will fail to overcome the noise of a saturated market. With a background in **${founder}** and limited resources (**${resources}**), you are entering a knife fight with a toothpick. You are highly likely to burn your small budget, coding in isolation, only to launch to absolute silence and join the 95% of pre-seed startups that die within a year from distribution failure.`,
      hiddenOpportunities: `The true value lies in narrowing your scope by 90%. Instead of a broad dashboard, build a white-labeled integration for **${competitors}**. Alternatively, build a highly targeted localized version for **${geography}** where strict privacy compliance laws or localized banking rails prevent global platforms from competing.`,
      marketSize: `While the overall ${category} market TAM is large, your addressable market (SAM) is extremely restricted due to legacy dominance. Realistically, your SOM is capped at under $150k ARR unless you pivot to high-ticket enterprise contracts with contract values exceeding $30k/year.`,
      founderMarketFit: `As a founder with a background in **${founder}**, you suffer from a 'product bias'. You believe that writing cleaner code, using Next.js 15, or having a nicer UI is a competitive moat. It isn't. In this market, distribution is 90% of the game. You must dedicate 8 days of your week to outbound sales and 1 day to coding.`,
      gtmStrategy: `Stop thinking about broad marketing. Identify the top 40 target buyers on LinkedIn who currently use **${competitors}** and complain about their price or speed. Reach out manually, offer to solve their exact problem manually for free, and transition them into your first 5 case studies.`,
      first10Customers: `1. Scrape directories of companies using legacy systems in the ${category} space.
2. Send 80 highly personalized, short emails highlighting one specific workflow speed enhancement.
3. Offer a lifetime membership deal for a $250 one-off payment to bootstrap your initial compute costs.
4. Onboard them manually via Zoom to verify where their friction points lie.`,
      mvpPlan: `Do not write a multi-tenant user authentication system or dashboard. Create a single landing page with an input field that triggers a webhook to your email. Perform the work manually behind the scenes (concierge MVP) for the first five paying users to validate demand.`,
      revenueModel: `Your current model is '${pricing}'. Freemium models will drain your limited capital (**${resources}**) via hosting bills. Charge a high-ticket annual upfront subscription ($500-$2,000/yr) from day one to maintain positive cash flow.`,
      moatAnalysis: `You currently have **no moat**. Code is not a moat. A competent competitor can clone your UI in a weekend. You must build a moat via proprietary workflow integrations, user network effects, or direct data relationships.`,
      riskAnalysis: `1. **Feature Bundling:** Competitors copy your core page and release it as a free update.
2. **High Churn:** Target users sign up for a month, solve their immediate problem, and cancel.
3. **CAC Spike:** Paid search terms are too expensive, and organic channels fail to yield signups.`,
      burnoutDifficulty: `High (85%). The effort required to build a complex SaaS relative to the initial customer response will lead to severe founder friction. You need immediate validation to keep going.`,
      failureProbability: `88% chance of bankruptcy within 18 months, driven by unsustainable customer acquisition costs and lack of structural product defensibility.`,
      pivotSuggestions: `1. Pivot from a general SaaS to a specialized white-labeled API developers can embed inside CRM platforms.
2. Pivot from B2C to target marketing agencies who manage the budgets.
3. Focus entirely on automated migration utilities from legacy platforms.`,
      investmentVerdict: `**HARD PASS.** VCs require a 100x return potential. Your current TAM constraints, low ACV, and passive distribution mean this is a lifestyle business at best. Bootstrap this or pivot before raising.`
    },
    competitorSimulation: `**Venture Attack Simulation:**
- **Month 1:** You launch on Product Hunt and get 150 upvotes. One of the product managers at **${competitors}** flags your landing page.
- **Month 2:** Their engineering team analyzes your UI and builds the exact same tab within their platform.
- **Month 3:** They launch it as a free update to their 10,000 active customers.
- **Month 4:** They bid on your brand name keywords on Google Ads. Your CAC climbs to $400. You run out of cash.`,
    firstDollarStrategy: `**The 24-Hour Cash Inversion Play:**
1. Create a 3-page PDF template showing how you solve this specific problem.
2. Direct message 40 target users on LinkedIn. Offer to perform a manual audit for $75.
3. Deliver the audit within 24 hours.
4. If 3 people pay, you have validated demand. If 0 pay, delete this codebase and save 6 months of your life.`
  };
}

// -------------------------------------------------------------
// ONLINE DYNAMIC GENERATOR (API INTEGRATIONS)
// -------------------------------------------------------------
export async function getAiFollowUpQuestions(inputs: any, settings: any): Promise<any> {
  const geminiKey = settings.geminiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openAiKey = settings.openAiKey || process.env.OPENAI_API_KEY;
  const claudeKey = settings.claudeKey || process.env.CLAUDE_API_KEY;
  
  const hasKey = !!(geminiKey || openAiKey || claudeKey);
  const runOffline = settings.mode === "offline" && !process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.CLAUDE_API_KEY;

  if (runOffline || !hasKey) {
    return generateOfflineQuestions(inputs);
  }

  const settingsWithEnv = {
    ...settings,
    geminiKey,
    openAiKey,
    claudeKey
  };

  const systemPrompt = `You are a brutal startup validator, Y Combinator partner, and veteran growth investor combined.
Given a startup idea and configuration, generate exactly 3 challenging, strategic, and direct follow-up questions to drill into their assumptions and expose potential flaws.
The tone must be intelligent, startup-native, and analytical. Avoid generic motivational sentences.
Output your response as a valid JSON array of objects with the following schema:
[
  { "question": "Question text here", "answer": "" },
  { "question": "Question text here", "answer": "" },
  { "question": "Question text here", "answer": "" }
]`;

  const userPrompt = `Startup Config:
Idea: ${inputs.idea}
Target Audience: ${inputs.targetAudience}
Pricing Model: ${inputs.pricingModel}
Business Category: ${inputs.category}
Founder Background: ${inputs.founderBackground}
Competitors: ${inputs.competitors}
Acquisition Strategy: ${inputs.acquisitionStrategy}
Geography: ${inputs.geography}
Resources Available: ${inputs.resources}`;

  try {
    const responseText = await callLlmApi(systemPrompt, userPrompt, settingsWithEnv);
    return parseJSONFromMarkdown(responseText);
  } catch (e) {
    console.error("API Call failed, falling back to offline questions generator", e);
    return generateOfflineQuestions(inputs);
  }
}

export async function getAiDebateAndReport(inputs: any, followUps: any[], settings: any): Promise<StartupRoast> {
  const geminiKey = settings.geminiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openAiKey = settings.openAiKey || process.env.OPENAI_API_KEY;
  const claudeKey = settings.claudeKey || process.env.CLAUDE_API_KEY;
  
  const hasKey = !!(geminiKey || openAiKey || claudeKey);
  const runOffline = settings.mode === "offline" && !process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.CLAUDE_API_KEY;

  if (runOffline || !hasKey) {
    // Delay to simulate computation
    await new Promise(resolve => setTimeout(resolve, 3000));
    return generateOfflineDebateAndReport(inputs, followUps);
  }

  const settingsWithEnv = {
    ...settings,
    geminiKey,
    openAiKey,
    claudeKey
  };

  const systemPrompt = `You are the core of Startup Roast AI. Perform a structured multi-agent debate and output a detailed audit report.
The 5 agents involved in the AACP debate are:
1. VC Investor (VC): Ex-Partner, top-tier fund. Highly critical of TAM, scaling, exit paths.
2. Cynical Founder (CF): Built & failed 3 times, exited once. Focuses on burnout, operations, churn, brutal realities.
3. Growth Hacker (GH): Scale specialist. Skeptical of paid ads, targets clever distribution loops.
4. Customer Persona (CP): Target buyer. Hates new logins, requires manager sign-off.
5. Technical Architect (TA): Systems engineer. Exposes database provision costs, wrapper risks, security holes.

Ensure they argue with each other, call out each other's assumptions, and actively avoid consensus (Adversarial Anti-Consensus Protocol).

Output MUST be a single, parseable JSON object matching exactly the following TypeScript schema:
{
  "debateLogs": [
    {
      "agent": "VC Investor",
      "role": "Tier-1 Venture Capitalist",
      "avatar": "VC",
      "color": "purple",
      "positive": "What works or has potential here...",
      "negative": "Brutal critique of TAM or pricing...",
      "warning": "Critical market or team vulnerability...",
      "opportunity": "Adjacent high-growth angle...",
      "quote": "Short, memorable, brutal 2-sentence punchline quote"
    },
    ... (similarly for CF, GH, CP, TA)
  ],
  "scores": {
    "startupScore": 38, // 1-100 overall viability
    "deathProbability": 88, // % chance of failure
    "realityVsHype": 92, // % hype index
    "wouldInvestorsFund": 15, // % funding likelihood
    "executionDifficulty": 85, // % difficulty
    "gtmViability": 28, // % marketing feasibility
    "marketCrowding": "Extreme"
  },
  "report": {
    "summary": "Detailed summary...",
    "brutalRoast": "Extremely detailed, analytical, brutal critique...",
    "hiddenOpportunities": "Pivot / high-margin pathways...",
    "marketSize": "Realistic TAM/SAM/SOM assessment...",
    "founderMarketFit": "How founder background matches/clashes with category demands...",
    "gtmStrategy": "Actionable, clever organic distribution channels...",
    "first10Customers": "Step-by-step unscalable acquisition plan...",
    "mvpPlan": "Scrappy, low-code MVP validation outline...",
    "revenueModel": "Pricing adjustments and unit economics audit...",
    "moatAnalysis": "Critical audit of their defensibility factors...",
    "riskAnalysis": "Top 3 systemic threats...",
    "burnoutDifficulty": "Burnout rate analysis based on complexity and cash...",
    "failureProbability": "Direct explanation of their death probability...",
    "pivotSuggestions": "Three practical pivot opportunities...",
    "investmentVerdict": "Detailed, formal VC reject/accept breakdown..."
  },
  "competitorSimulation": "A multi-month simulation text of how competitors defend their territory...",
  "firstDollarStrategy": "A scrappy play to make the first dollar in 24 hours..."
}`;

  const userPrompt = `Startup Profile:
Idea: ${inputs.idea}
Target Audience: ${inputs.targetAudience}
Pricing Model: ${inputs.pricingModel}
Business Category: ${inputs.category}
Founder Background: ${inputs.founderBackground}
Competitors: ${inputs.competitors}
Acquisition Strategy: ${inputs.acquisitionStrategy}
Geography: ${inputs.geography}
Resources: ${inputs.resources}

Follow-up Deep Dive:
${followUps.map((f, i) => `Q${i+1}: ${f.question}\nAns: ${f.answer}`).join("\n")}`;

  try {
    const responseText = await callLlmApi(systemPrompt, userPrompt, settingsWithEnv);
    const resultObj = parseJSONFromMarkdown(responseText);

    return {
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      inputs,
      followUps,
      debateLogs: resultObj.debateLogs,
      scores: resultObj.scores,
      report: resultObj.report,
      competitorSimulation: resultObj.competitorSimulation,
      firstDollarStrategy: resultObj.firstDollarStrategy
    };
  } catch (e) {
    console.error("API Call for debate failed. Falling back to offline engine.", e);
    return generateOfflineDebateAndReport(inputs, followUps);
  }
}

// Unified API Caller Supporting OpenAI, Gemini, and Claude
async function callLlmApi(systemPrompt: string, userPrompt: string, settings: any): Promise<string> {
  const geminiKey = settings.geminiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openAiKey = settings.openAiKey || process.env.OPENAI_API_KEY;
  const claudeKey = settings.claudeKey || process.env.CLAUDE_API_KEY;

  // 1. OPENAI
  if (openAiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API failed: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // 2. CLAUDE (Anthropic)
  if (claudeKey) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeKey,
        "anthropic-version": "2023-06-01"
      } as any,
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Claude API failed: ${errorText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  // 3. GEMINI
  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nUser Input Context:\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e: any) {
      console.warn("Gemini JSON mode call failed, retrying in text mode...", e);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nUser Input Context:\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API failed on retry: ${errorText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    }
  }

  throw new Error("No API keys provided for Online Mode.");
}
