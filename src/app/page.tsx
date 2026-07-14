"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, Flame, LayoutDashboard, Zap, ShieldAlert, Split, FileSpreadsheet, Check, ArrowRight, ArrowUpRight, TrendingUp, Activity, Layers, Play } from "lucide-react";

export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderVisible(false);
    }, 600);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Loading Loader */}
      {loaderVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] transition-opacity duration-700 ease-out">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-r-2 border-[#10b981] mb-4"></div>
            <p className="text-xs tracking-widest text-neutral-500 uppercase font-mono">
              Aligning Quantum Ledger Nodes...
            </p>
          </div>
        </div>
      )}

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-full h-[800px] glow-emerald pointer-events-none z-0"></div>
      <div className="absolute top-[1200px] right-1/4 w-full h-[600px] glow-blue pointer-events-none z-0"></div>
      <div className="absolute top-[2600px] left-1/3 w-full h-[800px] glow-emerald pointer-events-none z-0"></div>

      {/* Navigation Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 glass-panel transition-all duration-300 ${
        scrolled ? "bg-[#030712]/90 backdrop-blur-md py-3 border-b border-emerald-500/15" : "bg-transparent py-5 border-b border-transparent"
      } px-6`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Cpu className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="heading-font text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                FounderOS<span className="text-emerald-400 font-light">.AI</span>
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-450">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#workflow" className="text-gray-400 hover:text-white transition-colors">Workflow</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              <span className="h-4 w-[1px] bg-white/10 mx-1"></span>
              <Link href="/validator" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                <Flame className="w-3.5 h-3.5" /> AI Roaster
              </Link>
              <Link href="/finance" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                <LayoutDashboard className="w-3.5 h-3.5" /> Finance OS
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:border-emerald-500/30 text-gray-300 hover:text-white transition-all bg-white/5">
              Launch Sandbox
            </Link>
            <Link href="/dashboard" className="relative overflow-hidden group px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-1">Console <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 space-y-32">
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8 mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-xs font-semibold text-emerald-400 tracking-wide uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Engine v3.4 Active: Automated Financial Architecture
            </div>

            <h1 className="heading-font text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 max-w-4xl mx-auto leading-[1.05]">
              Validate Ideas.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-glow-aqua">
                Automate Capital.
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Scalable and developer-friendly systems built for creators, startups, and indie hackers. Validate product viability, stress-test strategy, and automate corporate operations instantly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href="/validator" className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Run Autonomous AI Roast
                <Flame className="w-5 h-5 group-hover:animate-bounce" />
              </Link>
              <Link href="/finance" className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold glass-panel border border-white/10 hover:border-cyan-500/40 text-white transition-all duration-300 flex items-center justify-center gap-2">
                Enter Finance OS Dashboard
                <LayoutDashboard className="w-5 h-5 text-cyan-400" />
              </Link>
            </div>

            <div className="pt-16 max-w-4xl mx-auto relative animate-float">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative glass-panel-heavy rounded-2xl border border-white/10 shadow-2xl p-4 overflow-hidden text-left">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/50"></span>
                    <span className="text-xs text-gray-500 font-mono ml-2">core-intelligence-node.sh</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
                    REALTIME AGENT CONNECTED
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">Market Signal</span>
                    <div className="text-sm font-bold text-emerald-400 flex items-center justify-between">
                      <span>High Disruption</span>
                      <span>94.2%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">Burn Optimisation Matrix</span>
                    <div className="text-sm font-bold text-cyan-400 flex items-center justify-between">
                      <span>Safe Threshold</span>
                      <span>0.62x Factor</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">GTM Path Velocity</span>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span>Accelerated</span>
                      <span className="text-amber-400">14 Days To Launch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST / LOGOS */}
        <section className="max-w-7xl mx-auto px-6 py-8 border-y border-white/5 bg-black/20">
          <p className="text-center text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-6">
            Scalable & developer-friendly systems built for creators, startups, and indie hackers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale contrast-200 text-xs font-bold tracking-widest font-mono">
            <span>STRIPE_X</span>
            <span>LINEAR_CORE</span>
            <span>RAMP_FORK</span>
            <span>PERPLEX_NET</span>
            <span>BREX_LABS</span>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="heading-font text-3xl md:text-5xl font-bold tracking-tight">
              Engineered to bypass structural founder failure.
            </h2>
            <p className="text-gray-400 font-light">
              Scalable, developer-friendly validation and financial rails built for creators, startups, and indie hackers. Coordinates uncompromising market critique with automated corporate frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">Autonomous Idea Roasting</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Upload pitch mechanics or text summaries to strip away hubris. Get structural error feedback based on synthetic competitor trends.
              </p>
              <Link href="/validator" className="text-xs text-emerald-400 font-medium hover:underline inline-flex items-center gap-1">
                Launch Core Roaster <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Box 2 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <Split className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">AI Expense Reconciliation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Connect dynamic accounts or log bills. The platform automatically balances cross-entity corporate debts with high transparency.
              </p>
              <Link href="/finance" className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1">
                View Finance Core <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Box 3 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">Investor Confidence Scoring</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                An objective multi-vector assessment matrix mimicking seed-stage VC analytics parameters to prepare you for institutional vetting.
              </p>
              <Link href="/validator" className="text-xs text-purple-400 font-medium hover:underline inline-flex items-center gap-1">
                Explore Matrix Models <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. WORKFLOW / PROTOCOL */}
        <section id="workflow" className="max-w-5xl mx-auto px-6 py-12 relative">
          <div className="absolute inset-0 bg-glow-radial pointer-events-none"></div>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Architectural Execution</span>
            <h2 className="heading-font text-3xl font-bold mt-2">The 4-Step Validation Velocity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-emerald-500/40 text-emerald-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-emerald-500/10">01</div>
              <h4 className="font-bold text-white text-base">Ingest Strategy</h4>
              <p className="text-gray-400 text-xs leading-relaxed">Provide your product concept or system requirements statement via our intuitive capture terminal.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-cyan-500/40 text-cyan-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-cyan-500/10">02</div>
              <h4 class="font-bold text-white text-base">Stress Simulation</h4>
              <p className="text-gray-400 text-xs leading-relaxed">AI engine runs simulations against public registries, market datasets, and tech-stack bottlenecks.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-purple-500/40 text-purple-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-purple-500/10">03</div>
              <h4 class="font-bold text-white text-base">Financial Mapping</h4>
              <p className="text-gray-400 text-xs leading-relaxed">Generates automated structural cash limits, shared partner accounts, and capital trajectory charts.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-emerald-400 text-black font-mono text-sm font-bold flex items-center justify-center shadow-lg shadow-emerald-400/20">04</div>
              <h4 class="font-bold text-white text-base">Venture Deployment</h4>
              <p className="text-gray-400 text-xs leading-relaxed">Export institutional investor reports and manage multi-member corporate transactions instantly.</p>
            </div>
          </div>
        </section>

        {/* 5. PRICING */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="heading-font text-3xl font-bold tracking-tight">Flexible, Transparent Pricing Structure</h2>
            <p className="text-gray-400 font-light text-sm">Scale your computational analytical bandwidth as your product validation pipeline expands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Developer Sandbox</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl heading-font font-bold tracking-tight">$0</span>
                  <span className="ml-1 text-sm font-semibold text-gray-500">/ forever</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed">Perfect for early stage prototyping and running standalone product roasts.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 3 Comprehensive AI Roasts / Mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Baseline Financial OS Ledger</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 2 Connected Member Matrix</li>
                </ul>
              </div>
              <Link href="/validator" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white text-center transition-all">
                Launch Free Terminal
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="glass-panel-heavy p-8 rounded-2xl flex flex-col justify-between border-2 border-emerald-500/30 relative shadow-[0_0_40px_rgba(16,185,129,0.05)]">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-[10px] font-bold uppercase tracking-wider">
                Most Selected
              </div>
              <div>
                <h4 className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Scale Venture</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl heading-font font-bold tracking-tight">$79</span>
                  <span className="ml-1 text-sm font-semibold text-gray-450">/ month</span>
                </div>
                <p className="mt-4 text-xs text-gray-405 leading-relaxed">For professional builders needing high-fidelity market validation data streams.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-200">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Realtime Concept Roasts</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full GTM Roadmap Generation Models</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Automated Multi-Entity Debt Simplification</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Advanced PDF Investor Dossier Export</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-center shadow-lg shadow-emerald-500/20 transition-all">
                Upgrade To Scale OS
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Institutional Node</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl heading-font font-bold tracking-tight">$299</span>
                  <span className="ml-1 text-sm font-semibold text-gray-500">/ month</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed">Tailored for incubators, venture studios, and multi-layered fund networks.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Trained Synthetic Competitor Matrix</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> White-Labeled Platform Interfaces</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Enterprise API Ingestion & Access Keys</li>
                </ul>
              </div>
              <Link href="/login" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white text-center transition-all">
                Contact Architecture Desk
              </Link>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="relative rounded-3xl overflow-hidden glass-panel-heavy border border-emerald-500/20 p-12 text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 pointer-events-none"></div>
            <h2 className="heading-font text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
              Stop building applications without structural alpha validation.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light text-sm">
              Deploy automated evaluation vectors in under sixty seconds. Build businesses on data, not hunches.
            </p>
            <div className="pt-4">
              <Link href="/validator" className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-emerald-400 hover:text-black transition-all shadow-xl hover:shadow-emerald-400/20 inline-block">
                Initiate Free Evaluation
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-black/60 py-12 px-6 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="heading-font font-bold text-white text-sm">FounderOS<span className="text-emerald-400">.AI</span></span>
              <span>© 2026 Sovereign Fintech Node. All rights artificial.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Infrastructure</a>
              <a href="#" className="hover:text-white transition-colors">Security Cryptography</a>
              <a href="#" className="hover:text-white transition-colors">Platform Status</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
