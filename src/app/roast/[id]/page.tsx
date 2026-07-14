"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Cpu, ArrowLeft, Flame, AlertOctagon, TrendingUp, HelpCircle, FileText, Split, ChevronRight, BarChart2, ShieldAlert, Award, MessageSquare, Compass, DollarSign, Printer } from "lucide-react";
import { getStoredRoastById, StartupRoast } from "@/lib/db";

export default function RoastDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [roast, setRoast] = useState<StartupRoast | null>(null);
  const [activeTab, setActiveTab] = useState<"verdict" | "debate" | "remediation">("verdict");

  useEffect(() => {
    if (id) {
      const data = getStoredRoastById(id);
      if (data) {
        setRoast(data);
      }
    }
  }, [id]);

  if (!roast) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-center p-6">
        <AlertOctagon className="w-12 h-12 text-red-500 animate-pulse mb-4" />
        <h3 className="heading-font text-lg font-bold text-white">Venture Log Not Found</h3>
        <p className="text-xs text-gray-500 mt-1.5 max-w-xs">The requested audit sequence record does not exist on this localized storage node.</p>
        <Link href="/dashboard" className="mt-6 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Deconstruct inputs and reports
  const { inputs, scores, report, debateLogs, competitorSimulation, firstDollarStrategy } = roast;

  // Extrapolate detailed metrics matching the user's requirements
  const marketViability = scores.startupScore + 10 > 100 ? 98 : scores.startupScore + 10;
  const founderAdvantage = Math.round(scores.startupScore * 0.95);
  const distributionStrength = scores.gtmViability;
  const technicalFeasibility = scores.executionDifficulty;
  const aiLeverage = Math.round((scores.realityVsHype + scores.startupScore) / 2);
  const scalability = Math.round((100 - scores.executionDifficulty + scores.startupScore) / 2);
  const monetization = Math.round((scores.wouldInvestorsFund + scores.startupScore) / 1.5);
  const retentionPotential = Math.round((100 - scores.deathProbability + scores.startupScore) / 2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background glow structures */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald opacity-25 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue opacity-25 pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow space-y-8">
        
        {/* Navigation header row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5 no-print">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
              <ArrowLeft className="w-4 h-4" /> Console Home
            </Link>
            <span className="text-[10px] font-mono text-gray-500">
              AUDIT_ID: {id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all"
            >
              <Printer className="w-4 h-4" /> Print Dossier
            </button>
            <Link
              href={`/reports?id=${id}`}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-xs shadow-md transition-all hover:opacity-90"
            >
              <FileText className="w-4 h-4" /> Open Full AI Reports <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Global Overview Section */}
        <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-1">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" /> TARGET VENTURE CLASSIFIED AND AUDITED
              </div>
              <h1 className="heading-font text-2xl md:text-3xl font-bold text-white tracking-tight">
                {inputs.idea}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Category: <span className="text-white font-semibold">{inputs.category}</span> | Geography: <span className="text-white font-semibold">{inputs.geography}</span>
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-2 shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <div className="text-left font-mono">
                <div className="text-[9px] text-gray-500 uppercase tracking-widest leading-none">Failure Probability</div>
                <div className="text-lg font-bold text-red-450 leading-tight mt-0.5">{scores.deathProbability}%</div>
              </div>
            </div>
          </div>

          {/* Quick inputs summary grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-[11px] font-mono text-gray-400">
            <div>
              <span className="text-gray-500 block mb-0.5">// TARGET AUDIENCE</span>
              <span className="text-white truncate block">{inputs.targetAudience}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">// PRICING MODEL</span>
              <span className="text-white truncate block">{inputs.pricingModel}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">// COMPETITORS</span>
              <span className="text-white truncate block">{inputs.competitors}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">// ACQUISITION SPEED</span>
              <span className="text-white truncate block">{inputs.acquisitionStrategy}</span>
            </div>
          </div>
        </div>

        {/* Detailed Startup Score Gauges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Market Viability</span>
            <div className="text-2xl font-bold text-white heading-font">{marketViability}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${marketViability}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-cyan-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Founder Advantage</span>
            <div className="text-2xl font-bold text-white heading-font">{founderAdvantage}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${founderAdvantage}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-yellow-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Distribution Strength</span>
            <div className="text-2xl font-bold text-white heading-font">{distributionStrength}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${distributionStrength}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-indigo-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Technical Feasibility</span>
            <div className="text-2xl font-bold text-white heading-font">{technicalFeasibility}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${technicalFeasibility}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-teal-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">AI Leverage Opportunity</span>
            <div className="text-2xl font-bold text-white heading-font">{aiLeverage}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: `${aiLeverage}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-blue-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Scalability Rating</span>
            <div className="text-2xl font-bold text-white heading-font">{scalability}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${scalability}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-purple-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Monetization Profile</span>
            <div className="text-2xl font-bold text-white heading-font">{monetization}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${monetization}%` }}></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-pink-500 space-y-1.5">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">Retention Potential</span>
            <div className="text-2xl font-bold text-white heading-font">{retentionPotential}%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: `${retentionPotential}%` }}></div>
            </div>
          </div>

        </div>

        {/* Navigation Tabs for detailed sections */}
        <div className="flex border-b border-white/5 no-print text-xs">
          <button
            onClick={() => setActiveTab("verdict")}
            className={`px-6 py-3.5 font-bold transition-all border-b-2 ${
              activeTab === "verdict" ? "border-emerald-500 text-white bg-emerald-500/5" : "border-transparent text-gray-450 hover:text-white"
            } flex items-center gap-1.5`}
          >
            <Award className="w-4 h-4" /> The Brutal Verdict
          </button>
          <button
            onClick={() => setActiveTab("debate")}
            className={`px-6 py-3.5 font-bold transition-all border-b-2 ${
              activeTab === "debate" ? "border-emerald-500 text-white bg-emerald-500/5" : "border-transparent text-gray-450 hover:text-white"
            } flex items-center gap-1.5`}
          >
            <MessageSquare className="w-4 h-4" /> War Room Debate Logs
          </button>
          <button
            onClick={() => setActiveTab("remediation")}
            className={`px-6 py-3.5 font-bold transition-all border-b-2 ${
              activeTab === "remediation" ? "border-emerald-500 text-white bg-emerald-500/5" : "border-transparent text-gray-450 hover:text-white"
            } flex items-center gap-1.5`}
          >
            <Compass className="w-4 h-4" /> Remediation Actions
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-4 space-y-6">
          
          {/* Tab 1: Verdict & Roast */}
          {activeTab === "verdict" && (
            <div className="space-y-6">
              {/* Brutal Roast Red Box */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex gap-4 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 shrink-0">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="heading-font text-lg font-bold text-red-200">The Unforgiving Verdict Roast</h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    {report.brutalRoast}
                  </p>
                </div>
              </div>

              {/* Other core highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-450"></span> Asymmetric Opportunities
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {report.hiddenOpportunities}
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Investment Risk Analysis
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {report.investmentVerdict}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: War Room Debate Logs */}
          {activeTab === "debate" && (
            <div className="space-y-6 font-mono text-[11px] sm:text-xs">
              
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 flex items-center justify-between no-print">
                <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-emerald-400 animate-spin" /> Adversarial Anti-Consensus protocol enforced.</span>
                <span className="text-emerald-400 font-bold">5 NODES DIVERGING</span>
              </div>

              <div className="space-y-4">
                {debateLogs.map((log, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-5 border-white/[0.04] space-y-3 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-black border border-white/10 flex items-center justify-center font-bold text-xs text-white uppercase">
                          {log.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-white font-sans">{log.agent}</span>
                          <span className="text-[9px] text-gray-500 block leading-none mt-0.5">{log.role}</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-red-450 uppercase font-bold tracking-wider">Node Argument</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-gray-300 italic font-sans pl-3 border-l-2 border-red-500/40">
                        &quot;{log.quote}&quot;
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[10px] text-gray-450">
                        <div>
                          <span className="text-emerald-400 block font-bold">✔ ADVANTAGE CASE</span>
                          <span className="block mt-0.5 font-sans leading-relaxed">{log.positive}</span>
                        </div>
                        <div>
                          <span className="text-red-400 block font-bold">✘ SYSTEMIC VULNERABILITY</span>
                          <span className="block mt-0.5 font-sans leading-relaxed">{log.negative}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Remediation Plans */}
          {activeTab === "remediation" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5 text-yellow-500 animate-pulse" /> Defensive Competitor Attack Simulation
                </h3>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-line">
                  {competitorSimulation}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <DollarSign className="w-5 h-5 text-emerald-400 animate-bounce" /> The 24-Hour Cash Inversion Play
                </h3>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-line">
                  {firstDollarStrategy}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Quick redirect links row */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 no-print">
          <div className="text-xs text-gray-500 font-mono">
            // NEXT STEP: Run dynamic GTM and MVP roadmaps inside AI Reports matrix.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="text-xs font-semibold text-cyan-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Split className="w-4 h-4" /> Setup collaborative expense ledger
            </Link>
            <Link
              href={`/reports?id=${id}`}
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-emerald-400 hover:text-black transition-all flex items-center gap-1.5"
            >
              Generate AI Reports <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI Audit Node. High-performance stress-testing dossier.</div>
      </footer>
    </div>
  );
}
