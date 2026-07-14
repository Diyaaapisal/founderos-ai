"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, Flame, LayoutDashboard, Split, Settings, TrendingUp, AlertTriangle, Sparkles, Plus, Wallet, ShieldAlert, FileText, ArrowRight, Activity, Users, FileSpreadsheet } from "lucide-react";
import { getStoredRoasts, getStoredExpenses, getStoredGroups, getStoredSettings, simplifyDebts, StartupRoast, FinanceExpense } from "@/lib/db";

export default function DashboardPage() {
  const router = useRouter();
  const [roasts, setRoasts] = useState<StartupRoast[]>([]);
  const [expenses, setExpenses] = useState<FinanceExpense[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [pendingSettlementsCount, setPendingSettlementsCount] = useState(0);
  const [totalBurn, setTotalBurn] = useState(0);

  useEffect(() => {
    // Ingest data
    const storedRoasts = getStoredRoasts();
    setRoasts(storedRoasts);

    const storedExpenses = getStoredExpenses();
    setExpenses(storedExpenses);

    const groups = getStoredGroups();
    if (groups.length > 0) {
      setMemberCount(groups[0].members.length);
      const simplified = simplifyDebts(groups[0].id);
      setPendingSettlementsCount(simplified.length);
    }

    const burn = storedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalBurn(burn);
  }, []);

  // Stats Calculations
  const totalStartups = roasts.length;
  const avgScore = totalStartups
    ? Math.round(roasts.reduce((acc, curr) => acc + curr.scores.startupScore, 0) / totalStartups)
    : 0;
  const avgFailureProbability = totalStartups
    ? Math.round(roasts.reduce((acc, curr) => acc + curr.scores.deathProbability, 0) / totalStartups)
    : 0;

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 rounded bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-emerald-500/20">
              <Cpu className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-neutral-355 transition-colors">
              FounderOS<span className="text-emerald-400 font-light">.AI</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/settings"
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" /> Node config
            </Link>
          </div>
        </div>
      </header>

      {/* Main Console Layout */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex-grow space-y-12">
        {/* Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              CORE OPERATING SYSTEM CONSOLE ALPHA-01
            </div>
            <h1 className="heading-font text-3xl md:text-4xl font-bold text-white tracking-tight">
              Control Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/validator"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-md flex items-center gap-1.5 transition-all"
            >
              <Flame className="w-4 h-4" /> Audit New Startup
            </Link>
            <Link
              href="/finance"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black shadow-md flex items-center gap-1.5 transition-all"
            >
              <Split className="w-4 h-4" /> Open Finance OS
            </Link>
          </div>
        </div>

        {/* Modules Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 1: Startup Validator Hub */}
          <div className="glass-panel-heavy rounded-2xl p-6 border border-emerald-500/20 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Cpu className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="heading-font text-lg font-bold text-white">Startup Validator & Roaster</h3>
                    <p className="text-[10px] text-gray-500 font-mono">// ADVERSARIAL_VALIDATION_MATRIX</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[9px] text-emerald-400 font-mono uppercase">
                  Active Audit Mode
                </span>
              </div>

              {/* Statistics sub-grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Audits</span>
                  <div className="text-xl font-bold text-white mt-1 font-mono">{totalStartups}</div>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Avg Score</span>
                  <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">{avgScore}</div>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Fail Prob</span>
                  <div className="text-xl font-bold text-red-400 mt-1 font-mono">{avgFailureProbability}%</div>
                </div>
              </div>

              {/* Brief recent list */}
              <div className="space-y-2 font-mono text-[11px] text-gray-400">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Recent Valuations</span>
                {roasts.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No validations registered. Create one to kickstart matrix.</p>
                ) : (
                  roasts.slice(0, 2).map((roast) => (
                    <Link
                      key={roast.id}
                      href={`/roast/${roast.id}`}
                      className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-all"
                    >
                      <span className="text-white truncate font-sans max-w-[200px]">{roast.inputs.idea}</span>
                      <span className="text-red-400 font-bold shrink-0">Score: {roast.scores.startupScore}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <Link
              href="/validator"
              className="w-full py-2.5 rounded-xl border border-emerald-500/25 hover:bg-emerald-500/5 text-xs font-semibold text-emerald-400 text-center flex items-center justify-center gap-1.5 transition-all mt-4"
            >
              Enter Validator Console <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Module 2: Collaborative Finance OS Ledger */}
          <div className="glass-panel-heavy rounded-2xl p-6 border border-cyan-500/20 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Split className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="heading-font text-lg font-bold text-white">Collaborative Finance OS</h3>
                    <p className="text-[10px] text-gray-500 font-mono">// REALTIME_EXPENSE_LEDGER</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-[9px] text-cyan-400 font-mono uppercase">
                  Simplification Active
                </span>
              </div>

              {/* Statistics sub-grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Members</span>
                  <div className="text-xl font-bold text-white mt-1 font-mono">{memberCount}</div>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Total Burn</span>
                  <div className="text-xl font-bold text-cyan-400 mt-1 font-mono">${totalBurn}</div>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Settlements</span>
                  <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{pendingSettlementsCount}</div>
                </div>
              </div>

              {/* Brief recent list */}
              <div className="space-y-2 font-mono text-[11px] text-gray-400">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Recent Expenses</span>
                {expenses.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No ledger transactions registered yet.</p>
                ) : (
                  expenses.slice(0, 2).map((expense) => (
                    <Link
                      key={expense.id}
                      href="/finance"
                      className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-all"
                    >
                      <span className="text-white truncate font-sans max-w-[200px]">{expense.description}</span>
                      <span className="text-cyan-400 font-bold shrink-0">${expense.amount.toFixed(2)}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <Link
              href="/finance"
              className="w-full py-2.5 rounded-xl border border-cyan-500/25 hover:bg-cyan-500/5 text-xs font-semibold text-cyan-400 text-center flex items-center justify-center gap-1.5 transition-all mt-4"
            >
              Enter Ledger Console <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Audit Queue History Timeline Layout */}
        <div className="space-y-6">
          <h2 className="heading-font text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" /> Complete Venture Validation History Log
          </h2>

          {roasts.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border-white/[0.05]">
              <div className="h-10 w-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-500 text-sm mx-auto mb-4 font-mono">
                !
              </div>
              <h3 className="text-white text-sm font-semibold mb-2">No startup audits registered</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
                Your validation pipeline is empty. Submit a startup pitch or requirements draft to trigger adversarial AI analysis.
              </p>
              <Link
                href="/validator"
                className="inline-flex px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all shadow-sm"
              >
                Launch Validator Terminal
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roasts.map((roast) => (
                <div
                  key={roast.id}
                  onClick={() => router.push(`/roast/${roast.id}`)}
                  className="glass-card rounded-xl p-6 border-white/[0.04] flex flex-col justify-between h-64 hover:border-emerald-500/25 relative group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-neutral-400 uppercase">
                        {roast.inputs.category}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500">
                        {new Date(roast.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-white text-sm font-bold line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {roast.inputs.idea}
                    </h3>
                    <p className="text-gray-400 text-[11px] font-light line-clamp-3 leading-relaxed">
                      Target Audience: {roast.inputs.targetAudience}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-mono">Overall Score</span>
                      <span className="text-sm font-bold text-white font-mono">
                        {roast.scores.startupScore}<span className="text-[10px] text-gray-500 font-normal">/100</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 block text-right font-mono">Failure Risk</span>
                      <span className="text-sm font-bold text-red-400 font-mono block text-right">
                        {roast.scores.deathProbability}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-neutral-950/60 py-6 px-6 text-center text-xs text-neutral-500 relative z-20">
        <div>&copy; 2026 FounderOS AI Operating System. Realism Audit Engine.</div>
      </footer>
    </div>
  );
}
