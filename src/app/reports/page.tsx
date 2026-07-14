"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Cpu, ArrowLeft, FileText, CheckCircle, BarChart2, ShieldAlert, Award, Compass, DollarSign, Layers, Calendar, Activity, Zap, TrendingUp, Sliders, AlertTriangle, Loader2 } from "lucide-react";
import { getStoredRoastById, StartupRoast, getStoredRoasts } from "@/lib/db";

function ReportsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [roast, setRoast] = useState<StartupRoast | null>(null);
  const [allRoasts, setAllRoasts] = useState<StartupRoast[]>([]);

  useEffect(() => {
    const history = getStoredRoasts();
    setAllRoasts(history);

    if (id) {
      const data = getStoredRoastById(id);
      if (data) {
        setRoast(data);
      }
    } else if (history.length > 0) {
      // Default to first roast if no ID specified
      setRoast(history[0]);
    }
  }, [id]);

  if (!roast) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-center p-6">
        <FileText className="w-12 h-12 text-emerald-500 animate-pulse mb-4" />
        <h3 className="heading-font text-lg font-bold text-white">No Venture Reports Available</h3>
        <p className="text-xs text-gray-500 mt-1.5 max-w-xs">Run a startup validation sequence to unlock comprehensive strategic assessments.</p>
        <Link href="/validator" className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-xs shadow-md">
          Launch Validator Terminal
        </Link>
      </div>
    );
  }

  const { inputs, scores, report } = roast;

  // Extrapolate SWOT metrics from reports
  const strengths = [
    inputs.founderBackground ? `Founder domain edge: ${inputs.founderBackground}` : "Unpackaged pre-seed prototyping agility.",
    "Concierge manual validation strategy configuration.",
    inputs.geography ? `Localized geographic target: ${inputs.geography}` : "Low initial structural overhead constraints."
  ];

  const weaknesses = [
    `Lack of proprietary database or tech moat against ${inputs.competitors}.`,
    "High structural churn risks in small target buyer segments.",
    `Severe distribution bottlenecks under a passive '${inputs.acquisitionStrategy}' model.`
  ];

  const opportunities = [
    "Reposition backend utility as white-labeled developer APIs.",
    "Implement programmatic SEO landing calculators targeting search terms.",
    "Form tactical integration hooks inside primary legacy dashboards."
  ];

  const threats = [
    `Incumbents (${inputs.competitors}) cloning core page features into free bundles.`,
    "Escalating customer acquisition cost in general search marketing channels.",
    "Platform risk dependencies on unvetted underlying API nodes."
  ];

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background glow layers */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald opacity-25 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue opacity-25 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow space-y-12">
        {/* Navigation header row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Link href={`/roast/${roast.id}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Roast
            </Link>
            <div className="h-4 w-[1px] bg-white/10"></div>
            {/* Quick selector dropdown */}
            <select
              value={roast.id}
              onChange={(e) => router.push(`/reports?id=${e.target.value}`)}
              className="bg-black border border-white/10 rounded-lg py-1 px-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            >
              {allRoasts.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.inputs.idea.substring(0, 30)}...
                </option>
              ))}
            </select>
          </div>
          <span className="text-[10px] font-mono text-gray-500">// STRATEGY_REPORTS_NODE</span>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-450 mb-1 uppercase">
            <Zap className="w-4 h-4 text-emerald-400" /> Strategic Diagnostic Reports dossier
          </div>
          <h1 className="heading-font text-3xl md:text-4xl font-bold text-white tracking-tight">
            FounderOS Tactical Assessment
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Analyzing: <span className="text-white font-semibold">&quot;{inputs.idea}&quot;</span>
          </p>
        </div>

        {/* 1. SWOT Analysis Grid */}
        <div className="space-y-6">
          <h2 className="heading-font text-lg font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" /> SWOT Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-emerald-500 space-y-4">
              <h3 className="heading-font font-bold text-emerald-400 text-sm uppercase tracking-wider">// STRENGTHS (Internal Moats)</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-red-500 space-y-4">
              <h3 className="heading-font font-bold text-red-400 text-sm uppercase tracking-wider">// WEAKNESSES (Internal Risks)</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-cyan-500 space-y-4">
              <h3 className="heading-font font-bold text-cyan-400 text-sm uppercase tracking-wider">// OPPORTUNITIES (External TAM)</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {opportunities.map((o, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-pink-500 space-y-4">
              <h3 className="heading-font font-bold text-pink-400 text-sm uppercase tracking-wider">// THREATS (External Pressures)</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {threats.map((t, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 2. MVP Roadmap Timeline */}
        <div className="space-y-6">
          <h2 className="heading-font text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" /> MVP Launch Timeline Roadmap
          </h2>
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] glow-blue opacity-10 pointer-events-none"></div>

            <div className="text-xs text-gray-400 leading-relaxed font-light mb-6 border-b border-white/5 pb-4">
              <span className="font-bold text-white block mb-1">AI MVP Optimization Play:</span>
              {report.mvpPlan}
            </div>

            {/* Visual Timeline Steps */}
            <div className="relative border-l border-white/10 ml-4 pl-8 space-y-8 text-xs font-mono">
              
              <div className="relative">
                <div className="absolute -left-12 top-0.5 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">1</div>
                <div>
                  <span className="text-[10px] text-emerald-400 tracking-widest block font-bold">PHASE 1 // WEEK 1-2 // VALIDATION</span>
                  <span className="text-white text-sm font-bold block mt-1 font-sans">Concierge Target Verification</span>
                  <p className="text-gray-400 font-sans mt-1 leading-relaxed">
                    Set up a single landing page with a waitlist. Initiate cold LinkedIn DMs offering manual consultation services to build your first 5 client portfolios.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0.5 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">2</div>
                <div>
                  <span className="text-[10px] text-cyan-400 tracking-widest block font-bold">PHASE 2 // WEEK 3-4 // INTERFACES</span>
                  <span className="text-white text-sm font-bold block mt-1 font-sans">Core Ledger & UI Console Prototype</span>
                  <p className="text-gray-400 font-sans mt-1 leading-relaxed">
                    Build a single-tenant database dashboard using Next.js to log transaction inputs. Implement debt simplification queries manually using script channels.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0.5 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-black font-bold">3</div>
                <div>
                  <span className="text-[10px] text-purple-400 tracking-widest block font-bold">PHASE 3 // WEEK 5-6 // DEPLOYMENT</span>
                  <span className="text-white text-sm font-bold block mt-1 font-sans">Beta Automation Integration</span>
                  <p className="text-gray-400 font-sans mt-1 leading-relaxed">
                    Connect real-time API layers (OpenAI API tokens, receipt scan triggers). Release the beta to your first 15 manual users in a private Slack workspace.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. GTM Strategy & Defensibility Moats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* GTM Column */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="heading-font text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" /> Beachhead GTM Distribution Channels
            </h2>
            <div className="space-y-4 text-xs">
              <p className="text-gray-400 leading-relaxed font-light">
                {report.gtmStrategy}
              </p>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl font-mono text-[11px] text-gray-400">
                <span className="text-yellow-500 font-bold block mb-1">Recommended Distribution Channels:</span>
                - Niche founder communities (Indie Hackers, YC book, Discord)<br />
                - Programmatic calculators targeting SaaS infrastructure terms<br />
                - Collaborative Splitwise expense splitting invites (growth viral loop)
              </div>
            </div>
          </div>

          {/* Tech Complexity & Moat Analysis Column */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="heading-font text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> Defensibility Moat Analysis
            </h2>
            <div className="space-y-4 text-xs font-sans">
              <p className="text-gray-400 leading-relaxed font-light">
                {report.founderMarketFit}
              </p>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl font-mono text-[11px] text-gray-400 space-y-2">
                <div>
                  <span className="text-indigo-400 font-bold block">Developer Wrapper Risks:</span>
                  Moat Defensibility rating: <span className="text-red-400">Low (20%)</span>.
                </div>
                <div>
                  <span className="text-indigo-400 font-bold block">Defensibility Optimization Action:</span>
                  Transition API prompts into localized, fine-tuned open-source parameters. Bind users via direct multi-entity corporate ledger databases.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI Audit Node. Advanced strategic validation reports.</div>
      </footer>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-450" />
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
}
