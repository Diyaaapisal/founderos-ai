"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowLeft, ArrowRight, Zap, Flame, ShieldAlert, AlertCircle, Compass, HelpCircle, Loader2 } from "lucide-react";
import { getStoredSettings, saveStoredRoast } from "@/lib/db";
import { getAiFollowUpQuestions, getAiDebateAndReport } from "@/lib/roast-engine";

export default function ValidatorPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "questions" | "loading">("input");
  
  // Form Inputs
  const [idea, setIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [pricingModel, setPricingModel] = useState("SaaS Subscription");
  const [category, setCategory] = useState("AI / Machine Learning");
  const [founderBackground, setFounderBackground] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [acquisitionStrategy, setAcquisitionStrategy] = useState("");
  const [geography, setGeography] = useState("Global");
  const [resources, setResources] = useState("Limited self-funded bootstrap");

  // Follow-up questions state
  const [followUps, setFollowUps] = useState<Array<{ question: string; answer: string }>>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing market coordinates...");

  // Trigger follow-up questions fetch
  const handleInitiateAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea || !targetAudience || !founderBackground || !competitors || !acquisitionStrategy) {
      alert("Please fill out the critical setup inputs before validation.");
      return;
    }
    
    setIsApiLoading(true);
    setLoadingText("Constructing target market stress variables...");
    setStep("loading");

    try {
      const settings = getStoredSettings();
      const inputs = {
        idea,
        targetAudience,
        pricingModel,
        category,
        founderBackground,
        competitors,
        acquisitionStrategy,
        geography,
        resources
      };
      
      const questions = await getAiFollowUpQuestions(inputs, settings);
      setFollowUps(questions);
      setCurrentQIndex(0);
      setStep("questions");
    } catch (err) {
      console.error(err);
      alert("Failed to initiate validate vectors. Rerouting...");
      setStep("input");
    } finally {
      setIsApiLoading(false);
    }
  };

  // Submit current answer and go to next question or final run
  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) {
      alert("Please state your counter-strategy answer.");
      return;
    }

    const updatedFollowUps = [...followUps];
    updatedFollowUps[currentQIndex].answer = currentAnswer;
    setFollowUps(updatedFollowUps);
    setCurrentAnswer("");

    if (currentQIndex < followUps.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // All questions answered, trigger debate + report generation
      setIsApiLoading(true);
      setStep("loading");
      setLoadingText("Assembling synthetic agent war room...");

      // Simulate loading phases for premium feel
      setTimeout(() => setLoadingText("Debate protocol: Node [VC Investor] is challenging margin targets..."), 1200);
      setTimeout(() => setLoadingText("Debate protocol: Node [Growth Hacker] rejects CAC claims..."), 2500);
      setTimeout(() => setLoadingText("Generating quantitative scores & pivot matrices..."), 3800);

      try {
        const settings = getStoredSettings();
        const inputs = {
          idea,
          targetAudience,
          pricingModel,
          category,
          founderBackground,
          competitors,
          acquisitionStrategy,
          geography,
          resources
        };

        const resultReport = await getAiDebateAndReport(inputs, updatedFollowUps, settings);
        saveStoredRoast(resultReport);
        router.push(`/roast/${resultReport.id}`);
      } catch (err) {
        console.error(err);
        alert("Failed to complete debate simulations.");
        setStep("input");
      } finally {
        setIsApiLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background glow layers */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald opacity-25 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue opacity-25 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="max-w-4xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Console
        </Link>
        <span className="text-xs font-mono text-emerald-450 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded text-emerald-400">
          Agent Matrix Active
        </span>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex-grow flex items-center justify-center">
        
        {/* Step 1: Input Setup Form */}
        {step === "input" && (
          <div className="w-full glass-panel-heavy rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8 animate-float">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Flame className="w-4 h-4 text-emerald-400 animate-pulse" /> STARTUP VALIDATOR TERMINAL ALPHA-02
              </div>
              <h1 className="heading-font text-2xl md:text-3xl font-bold text-white tracking-tight">
                Venture Strategy Assessment Ingestion
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                State your product assumptions to expose them to the Adversarial Anti-Consensus Protocol (AACP).
              </p>
            </div>

            <form onSubmit={handleInitiateAudit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Venture Core Hypothesis / Elevator Pitch</label>
                <textarea
                  rows={3}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Example: We are building FounderOS AI, a fintech operating system that automates group expense sharing and optimizes pre-seed startup validation using adversarial AI agents..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Target Customer Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Example: Pre-seed startup founders, indie hackers, and co-working entities"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Primary Competitors & Alternatives</label>
                <input
                  type="text"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  placeholder="Example: Splitwise, standard spreadsheets, generic ChatGPT wrappers"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Organic Acquisition / Distribution strategy</label>
                <input
                  type="text"
                  value={acquisitionStrategy}
                  onChange={(e) => setAcquisitionStrategy(e.target.value)}
                  placeholder="Example: Engineering-as-marketing free calculators, word of mouth"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Founder Background (Your Moat)</label>
                <input
                  type="text"
                  value={founderBackground}
                  onChange={(e) => setFounderBackground(e.target.value)}
                  placeholder="Example: Senior Full-stack AI Engineer with fintech background"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Business Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-sans"
                >
                  <option>AI / Machine Learning</option>
                  <option>Fintech / Blockchain</option>
                  <option>B2B SaaS / Enterprise</option>
                  <option>Developer Infrastructure</option>
                  <option>Consumer / Social Tech</option>
                  <option>Hardware / BioTech</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Monetization / Pricing model</label>
                <select
                  value={pricingModel}
                  onChange={(e) => setPricingModel(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-sans"
                >
                  <option>SaaS Subscription ($10-$50/mo)</option>
                  <option>High-Ticket Enterprise Contracts</option>
                  <option>Usage-Based API Billing</option>
                  <option>Transaction Split Commission</option>
                  <option>Freemium with Pro Add-ons</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Target Geography</label>
                <input
                  type="text"
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  placeholder="Example: Global, US & India"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-semibold block">Resourcing & Capital Available</label>
                <input
                  type="text"
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                  placeholder="Example: $5,000 bootstrap, 2 engineers working part time"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/35 transition-all flex justify-center items-center gap-2 group cursor-pointer"
                >
                  Initialize Validation Framework
                  <Zap className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Step 2: Dynamic questioning wizard */}
        {step === "questions" && (
          <div className="w-full glass-panel-heavy rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <span className="heading-font font-bold text-white text-base">Strategy Deep-Dive Stress Test</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                QUESTION {currentQIndex + 1} OF {followUps.length}
              </span>
            </div>

            {/* Question Card box */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-gray-200 leading-relaxed font-mono">
              <span className="text-emerald-450 font-bold block mb-1.5">[DIAGNOSTIC DETECTED]</span>
              {followUps[currentQIndex]?.question}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-semibold block">State your strategy counter-arguments:</label>
              <textarea
                rows={4}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Example: We will bypass traditional search engines and drive users through open-source utility plugins. SOC2 is covered by utilizing hosted Supabase compliance layers..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-650 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-gray-500 font-mono">Status: Awaiting input parameters...</span>
              <button
                onClick={handleAnswerSubmit}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all flex items-center gap-1 group"
              >
                Submit Response <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loading calculations panel */}
        {step === "loading" && (
          <div className="w-full glass-panel-heavy rounded-2xl p-10 border border-white/10 shadow-2xl text-center space-y-6">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="heading-font text-lg font-bold text-white">Adversarial Evaluation Node Running</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed font-mono text-glow-aqua">
                {loadingText}
              </p>
            </div>
            <div className="max-w-md mx-auto bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full animate-pulse rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>
        )}

      </div>

      <footer className="max-w-4xl mx-auto w-full text-center text-[10px] text-gray-500 mt-8 relative z-10">
        <div>FounderOS AI Audit Node. Real-time stress validation algorithm.</div>
      </footer>
    </div>
  );
}
