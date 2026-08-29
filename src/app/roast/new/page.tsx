"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredSettings } from "@/lib/db";

interface FollowUpQuestion {
  question: string;
  answer: string;
}

export default function NewRoastPage() {
  const router = useRouter();
  
  // Step tracker: 1, 2, 3 (core forms), 4 (loading questions), 5 (follow-ups form)
  const [step, setStep] = useState(1);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  // Form State
  const [idea, setIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [pricingModel, setPricingModel] = useState("");
  const [category, setCategory] = useState("AI");
  const [founderBackground, setFounderBackground] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [acquisitionStrategy, setAcquisitionStrategy] = useState("");
  const [geography, setGeography] = useState("");
  const [resources, setResources] = useState("");

  // Follow-up Questions State
  const [followUps, setFollowUps] = useState<FollowUpQuestion[]>([]);

  // Navigation handlers
  const nextStep = () => {
    setValidationMessage("");
    if (step === 1 && (!idea || !targetAudience)) {
      setValidationMessage("Friendly tip: Please provide a brief idea and target audience so we can understand your vision before moving forward!");
      return;
    }
    if (step === 2 && (!pricingModel || !acquisitionStrategy || !geography)) {
      setValidationMessage("Friendly tip: Please share your distribution plan first, then move forward!");
      return;
    }
    setStep((s) => s + 1);
  };
  const prevStep = () => {
    setValidationMessage("");
    setStep((s) => s - 1);
  };

  // Submit Step 3 to fetch custom follow-up questions
  const handleFetchFollowUps = () => {
    setValidationMessage("");
    if (!founderBackground || !competitors || !resources) {
      setValidationMessage("Friendly tip: Please help us understand your background and resources first, then move forward!");
      return;
    }
    fetchFollowUps();
  };

  const fetchFollowUps = async () => {
    setError("");
    setLoadingQuestions(true);
    setStep(4);

    const inputs = {
      idea,
      targetAudience,
      pricingModel,
      category,
      founderBackground,
      competitors,
      acquisitionStrategy,
      geography,
      resources,
    };

    const settings = getStoredSettings();

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, settings }),
      });

      if (!res.ok) {
        throw new Error("Failed to formulate stress questions from engine.");
      }

      const data = await res.json();
      setFollowUps(data.map((q: any) => ({ question: q.question, answer: "" })));
      setStep(5);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Network error while calling validator engine.");
      setStep(3);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Submit Follow-ups to trigger live debate
  const handleSimulateDebate = () => {
    setValidationMessage("");
    if (followUps.some((f) => !f.answer.trim())) {
      setValidationMessage("Friendly tip: Please provide a defense for each question first, then move forward!");
      return;
    }

    const inputs = {
      idea,
      targetAudience,
      pricingModel,
      category,
      founderBackground,
      competitors,
      acquisitionStrategy,
      geography,
      resources,
    };

    // Store in sessionStorage to be picked up by the debate loader page
    sessionStorage.setItem("pending_roast_inputs", JSON.stringify(inputs));
    sessionStorage.setItem("pending_roast_followups", JSON.stringify(followUps));

    // Redirect to the loading/streaming portal
    router.push("/roast/pending");
  };

  return (
    <div className="min-h-screen grid-bg relative flex flex-col justify-between">
      {/* Glow overlays */}
      <div className="absolute top-0 left-1/4 w-full h-[600px] glow-purple pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-darkBg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/20">
              R
            </div>
            <span className="font-medium text-sm tracking-tight text-white">Startup Roast AI</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            ✕ Cancel Roast
          </Link>
        </div>
      </header>

      {/* Main Multi-step Wizard Container */}
      <main className="max-w-2xl mx-auto w-full px-6 py-12 relative z-10 flex-grow flex flex-col justify-center">
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
            {error}
          </div>
        )}
        
        {validationMessage && (
          <div className="mb-6 p-4 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs flex items-center">
            <span className="mr-2">💡</span> {validationMessage}
          </div>
        )}

        {/* Progress Bar (Visible only during input steps 1-3 & 5) */}
        {step !== 4 && (
          <div className="mb-10">
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-2">
              <span>PROT_VALIDATION_FLOW</span>
              <span>
                {step === 5 ? "STEP 4/4: INTERROGATION" : `STEP ${step}/4: CONFIG`}
              </span>
            </div>
            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-white/[0.02]">
              <div
                className="bg-purple-600 h-full transition-all duration-500"
                style={{
                  width: `${step === 5 ? 100 : (step / 3) * 75}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 1: The Thesis */}
        {step === 1 && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">Core Pitch & Audience</h1>
              <p className="text-xs text-neutral-400">
                Identify the core value proposition of your startup and define your target audience.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">STARTUP_IDEA (PITCH)</label>
                <textarea
                  placeholder="e.g. A marketplace connecting freelance developers with local micro-businesses for fast design audits, charging a flat commission per project."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="AI / LLM Wrappers">AI / LLM Wrappers</option>
                    <option value="DevTools / Infrastructure">DevTools / Infrastructure</option>
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="Consumer Web / Mobile">Consumer Web / Mobile</option>
                    <option value="Web3 / FinTech">Web3 / FinTech</option>
                    <option value="E-commerce / D2C">E-commerce / D2C</option>
                    <option value="Hardware / Biotech">Hardware / Biotech</option>
                    <option value="Niche Marketplace">Niche Marketplace</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">TARGET_AUDIENCE</label>
                  <input
                    type="text"
                    placeholder="e.g. Freelance designers, local retail shop owners"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/[0.05]">
              <button
                onClick={nextStep}
                className="px-6 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Distribution & Market */}
        {step === 2 && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">Pricing & Distribution</h1>
              <p className="text-xs text-neutral-400">
                Outline how you make money, acquire customers, and where you plan to operate.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">PRICING_MODEL</label>
                <input
                  type="text"
                  placeholder="e.g. Freemium with a $15/month Pro tier for developer automation tools"
                  value={pricingModel}
                  onChange={(e) => setPricingModel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">ACQUISITION_STRATEGY (GTM)</label>
                <input
                  type="text"
                  placeholder="e.g. SEO blogging, cold outbound sales via LinkedIn, Reddit community marketing"
                  value={acquisitionStrategy}
                  onChange={(e) => setAcquisitionStrategy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">TARGET_GEOGRAPHY</label>
                <input
                  type="text"
                  placeholder="e.g. United States, Global, Localized (London only)"
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/[0.05]">
              <button
                onClick={prevStep}
                className="px-5 py-2 rounded-full text-xs font-semibold border border-white/10 hover:bg-white/5 text-neutral-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Incumbents & Execution */}
        {step === 3 && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">Founder Context & Moats</h1>
              <p className="text-xs text-neutral-400">
                Supply context regarding who is building this startup, who you compete with, and what you have available.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">FOUNDER_BACKGROUND</label>
                <textarea
                  placeholder="e.g. Full-stack developer with 3 years of agency experience. Decent at engineering but zero sales experience."
                  value={founderBackground}
                  onChange={(e) => setFounderBackground(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">COMPETITORS</label>
                  <input
                    type="text"
                    placeholder="e.g. Toptal, Rover, manual Google search"
                    value={competitors}
                    onChange={(e) => setCompetitors(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">RESOURCES_AVAILABLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Solo founder, $1k budget, 20 hrs/week"
                    value={resources}
                    onChange={(e) => setResources(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/[0.05]">
              <button
                onClick={prevStep}
                className="px-5 py-2 rounded-full text-xs font-semibold border border-white/10 hover:bg-white/5 text-neutral-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleFetchFollowUps}
                className="px-6 py-2 rounded-full text-xs font-semibold bg-gradient-to-tr from-purple-600 to-blue-500 text-white hover:opacity-90 transition-all shadow-md"
              >
                Expose Blind Spots →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Loading follow-up questions */}
        {step === 4 && (
          <div className="glass-panel rounded-2xl p-12 text-center border-white/[0.05] space-y-6">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-r-2 border-purple-500 mx-auto"></div>
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-purple-400 font-mono">
                [Interrogating Hypotheses]
              </h2>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Analyzing core market models, pricing viability, and founder background imbalances. Formulating strategic adversarial vectors...
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Follow-Up Questions (Interrogation Room) */}
        {step === 5 && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded border border-red-500/20 bg-red-500/5 text-[10px] font-mono tracking-wide text-red-400 mb-3">
                <span>STAGE: INTERROGATION_PROTOCOL</span>
              </div>
              <h1 className="text-xl font-bold text-white mb-1">We Spot Potential Flaws</h1>
              <p className="text-xs text-neutral-400">
                The AI Roast Engine has detected core friction vulnerabilities. Defend your thesis below to proceed to the war room.
              </p>
            </div>

            <div className="space-y-6 py-2">
              {followUps.map((item, idx) => (
                <div key={idx} className="space-y-2 bg-neutral-900/30 p-4 rounded-lg border border-white/[0.03]">
                  <label className="block text-xs font-medium text-purple-300 leading-relaxed">
                    Q{idx + 1}: {item.question}
                  </label>
                  <textarea
                    placeholder={idx === 0 ? "Example Answer: We plan to use B2B cold emailing and LinkedIn outreach to acquire our first 100 users..." : "Provide your defense..."}
                    value={item.answer}
                    onChange={(e) => {
                      const updated = [...followUps];
                      updated[idx].answer = e.target.value;
                      setFollowUps(updated);
                    }}
                    rows={3}
                    className="w-full px-3 py-2 rounded bg-black/50 border border-white/5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/[0.05]">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2 rounded-full text-xs font-semibold border border-white/10 hover:bg-white/5 text-neutral-300 transition-all"
              >
                Edit Config
              </button>
              <button
                onClick={handleSimulateDebate}
                className="px-6 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-all shadow-md"
              >
                Deploy Syndicate →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-neutral-950/60 py-6 px-6 text-center text-xs text-neutral-500 relative z-20">
        <div>&copy; 2026 Startup Roast AI. Realism Engine Wizard.</div>
      </footer>
    </div>
  );
}
