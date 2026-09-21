"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, LayoutDashboard, Split, Check, ArrowUpRight, TrendingUp, Activity, Layers, Play, ArrowRight, ShieldCheck, CreditCard, Sparkles, MessageSquare } from "lucide-react";

export default function LandingPage() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderVisible(false);
    }, 550);

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
      {/* Loading Screen */}
      {loaderVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] transition-opacity duration-700 ease-out">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-r-2 border-cyan-500 mb-4"></div>
            <p className="text-xs tracking-widest text-neutral-500 uppercase font-mono">
              Loading Ledger Modules...
            </p>
          </div>
        </div>
      )}

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-full h-[800px] glow-cyan pointer-events-none z-0"></div>
      <div className="absolute top-[1200px] right-1/4 w-full h-[600px] glow-emerald pointer-events-none z-0"></div>
      <div className="absolute top-[2600px] left-1/3 w-full h-[800px] glow-cyan pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-40 glass-panel transition-all duration-300 ${
        scrolled ? "bg-[#030712]/95 backdrop-blur-md py-3 border-b border-cyan-500/15" : "bg-transparent py-5 border-b border-transparent"
      } px-6`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="heading-font text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                FounderOS<span className="text-cyan-400 font-light">.AI</span>
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <span className="h-4 w-[1px] bg-white/10 mx-1"></span>
              <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all bg-white/5">
              Login
            </Link>
            <Link href="/dashboard" className="relative overflow-hidden group px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-black shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-1">Open Console <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 space-y-32">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8 mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400 tracking-wide uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Ledger Engine v4.0 Active: Autonomic Debt Simplification
            </div>

            <h1 className="heading-font text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-550 max-w-4xl mx-auto leading-[1.05]">
              Realtime Splits.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-450 text-glow-aqua">
                Automated Runways.
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              The autonomous operating system for collaborative startup finance. Simplifies inter-founder debts, scans corporate receipts with AI OCR, logs expenses via voice NLP, and forecasts cash burn velocities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-black shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Enter Finance OS
                <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold glass-panel border border-white/10 hover:border-cyan-500/40 text-white transition-all duration-300 flex items-center justify-center gap-2">
                Sign In / Register
                <Play className="w-5 h-5 text-cyan-400" />
              </Link>
            </div>

            {/* Dashboard Visualizer Mock */}
            <div className="pt-16 max-w-4xl mx-auto relative animate-float">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative glass-panel-heavy rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden text-left">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/50"></span>
                    <span className="text-xs text-gray-500 font-mono ml-2">ledger-optimisation-matrix.sh</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono">
                    REALTIME LEDGER MATRIX SYNCED
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">Core Ledger Burn</span>
                    <div className="text-sm font-bold text-cyan-400 flex items-center justify-between">
                      <span>Burn rate</span>
                      <span>$240.00 / mo</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">Reconciliation Matrix</span>
                    <div className="text-sm font-bold text-emerald-400 flex items-center justify-between">
                      <span>Simplification</span>
                      <span>72% Less events</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-gray-500">Cash Runway Forecast</span>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span>Runway Index</span>
                      <span className="text-amber-400">14.8 Months Left</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST MATRIX */}
        <section className="max-w-7xl mx-auto px-6 py-8 border-y border-white/5 bg-black/20">
          <p className="text-center text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-6">
            Powered by modern web infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale contrast-200 text-xs font-bold tracking-widest font-mono">
            <span>NEXT.JS CORE</span>
            <span>SUPABASE DB</span>
            <span>OPENAI VISION</span>
            <span>GEMINI PRO</span>
            <span>TAILWIND CSS</span>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="heading-font text-3xl md:text-5xl font-bold tracking-tight">
              Uncompromising ledger technology for elite co-founders.
            </h2>
            <p className="text-gray-400 font-light">
              FounderOS AI automates every step of inter-founder spend reconciliation, receipt audit, and predictive budgeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <Split className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">Smart Debt Simplification</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Graph-based net balance reduction algorithm. Merges multiple inter-member splits into single transactions automatically.
              </p>
              <Link href="/dashboard" className="text-xs text-cyan-400 font-medium hover:underline inline-flex items-center gap-1">
                Open Dashboard <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Box 2 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">AI Expense Ingestion</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Upload images or invoice PDFs. The OCR scanning engine automatically extracts merchant details, totals, and splits values.
              </p>
              <Link href="/groups" className="text-xs text-emerald-400 font-medium hover:underline inline-flex items-center gap-1">
                Scan Receipts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Box 3 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="heading-font text-xl font-bold text-white mb-2">Predictive Budgeting</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Machine learning forecast parameters analyzing cash burn rates, categorising spends, and issuing warning alerts.
              </p>
              <Link href="/dashboard" className="text-xs text-purple-400 font-medium hover:underline inline-flex items-center gap-1">
                View Forecasts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. WORKFLOW */}
        <section id="workflow" className="max-w-5xl mx-auto px-6 py-12 relative">
          <div className="absolute inset-0 bg-glow-radial pointer-events-none"></div>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Architectural Execution</span>
            <h2 className="heading-font text-3xl font-bold mt-2">Core Ledger Flow Lifecycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-cyan-500/40 text-cyan-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-cyan-500/10">01</div>
              <h4 className="font-bold text-white text-base">Ingest Transaction</h4>
              <p className="text-gray-400 text-xs leading-relaxed">Log shared expense details via voice transcription, invoice OCR scans, or manual inputs.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-emerald-500/40 text-emerald-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-emerald-500/10">02</div>
              <h4 className="font-bold text-white text-base">Simplify Balances</h4>
              <p className="text-gray-400 text-xs leading-relaxed">The algorithm processes net balances, clearing redundant transactions across the entire partner node.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-black border border-purple-500/40 text-purple-400 font-mono text-sm flex items-center justify-center shadow-lg shadow-purple-500/10">03</div>
              <h4 className="font-bold text-white text-base">UPI Settlement</h4>
              <p className="text-gray-450 text-xs leading-relaxed font-light font-sans">Settlements are processed via UPI transaction tracking and dynamically compiled payment QR codes.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-cyan-400 text-black font-mono text-sm font-bold flex items-center justify-center shadow-lg shadow-cyan-400/20">04</div>
              <h4 className="font-bold text-white text-base">Forecast Runway</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">Generate real-time monthly burn alerts and runways indicators directly inside the admin workstation.</p>
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cyan-455 font-semibold mb-3 text-cyan-400">
              Co-Founder Feedback
            </h2>
            <p className="text-3xl font-bold text-white tracking-tight heading-font">
              Synchronizing cash flows globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
              <p className="text-neutral-300 text-xs font-light leading-relaxed">
                &quot;The simplified debt algorithm cut down our inter-partner bank transfers from 18 to just 3 transactions per month. Absolutely critical for early-stage bootstrapping team dynamics.&quot;
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-[10px] text-white font-mono">
                  EL
                </div>
                <div>
                  <div className="text-white text-xs font-medium">Elena Rostova</div>
                  <div className="text-neutral-500 text-[10px]">SaaS Technical Co-Founder</div>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
              <p className="text-neutral-300 text-xs font-light leading-relaxed">
                &quot;Voice-to-expense logs let us record API costs while debugging. I just say the details out loud and the splits are logged in the correct categories instantly.&quot;
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-[10px] text-white font-mono">
                  DK
                </div>
                <div>
                  <div className="text-white text-xs font-medium">David K.</div>
                  <div className="text-neutral-500 text-[10px]">Pre-seed Co-Founder / DevOps</div>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
              <p className="text-neutral-300 text-xs font-light leading-relaxed">
                &quot;No more manually entering invoice numbers. The OCR scanner extracts merchant name and exact tax amounts correctly in seconds, then prompts partner allocations.&quot;
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-[10px] text-white font-mono">
                  AM
                </div>
                <div>
                  <div className="text-white text-xs font-medium">Alex Marcovich</div>
                  <div className="text-neutral-500 text-[10px]">Indie Hacker / Builder</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PRICING */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="heading-font text-3xl font-bold tracking-tight">Finance OS Pricing Plans</h2>
            <p className="text-gray-400 font-light text-sm">Scale your collaborative ledger as your startup grows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Free Tier</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl heading-font font-bold tracking-tight">$0</span>
                  <span className="ml-1 text-sm font-semibold text-gray-500">/ forever</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed">Ideal for small groups wanting to settle basic bills securely.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Basic Spend Ledger</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Up to 5 Group Members</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Standard Debt Optimization</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white text-center transition-all">
                Get Started Free
              </Link>
            </div>

            <div className="glass-panel-heavy p-8 rounded-2xl flex flex-col justify-between border-2 border-cyan-500/30 relative shadow-[0_0_40px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider">Most Selected</div>
              <div>
                <h4 className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Pro Tier</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl heading-font font-bold tracking-tight">$12</span>
                  <span className="ml-1 text-sm font-semibold text-gray-400">/ month</span>
                </div>
                <p className="mt-4 text-xs text-gray-450 leading-relaxed">For professional founders needing high-capacity AI features and fast logging.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-200">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unlimited Transactions</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> AI Receipt OCR Scanning</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Voice NLP Expense Logging</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Predictive Budgeting Forecasts</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-center shadow-lg shadow-cyan-500/20 transition-all">
                Upgrade to Pro
              </Link>
            </div>

            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-gray-450 uppercase tracking-wider">Enterprise</h4>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl heading-font font-bold tracking-tight">Custom</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed">Tailored for venture studios, multi-layered incubators, and startup networks.</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Multi-Group Ledgers</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> API Integrations & Export Logs</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Dedicated Account Manager</li>
                </ul>
              </div>
              <Link href="/login" className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white text-center transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="relative rounded-3xl overflow-hidden glass-panel-heavy border border-cyan-500/20 p-12 text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 pointer-events-none"></div>
            <h2 className="heading-font text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
              Automate co-founder capital splits instantly.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light text-sm">
              Deploy graph-simplified settlements and AI transaction audits in under sixty seconds.
            </p>
            <div className="pt-4">
              <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 hover:text-black transition-all shadow-xl hover:shadow-cyan-400/20 inline-block">
                Enter Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-black/60 py-12 px-6 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="heading-font font-bold text-white text-sm">FounderOS<span className="text-cyan-400">.AI</span></span>
              <span>© 2026 FounderOS. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">System Status</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
