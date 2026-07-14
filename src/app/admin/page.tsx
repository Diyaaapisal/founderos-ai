"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, ShieldCheck, Database, Layers, RefreshCw, BarChart2, ShieldAlert, Users, Server, Zap, Lock } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-black font-bold text-xs shadow-lg">
              <Cpu className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">FounderOS<span className="text-emerald-400 font-light">.AI</span></span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Console Home
          </Link>
        </div>
      </header>

      {/* Main Admin Console */}
      <main className="max-w-6xl mx-auto w-full px-6 py-4 relative z-10 flex-grow space-y-8">
        
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-1 uppercase">
            <Lock className="w-4 h-4 text-pink-500 animate-pulse" /> ADMIN COMMAND STATION ACTIVE
          </div>
          <h1 className="heading-font text-3xl font-bold text-white tracking-tight">System Administration</h1>
          <p className="text-xs text-gray-450 mt-1">Monitor platform orchestration networks, billing matrices, and API rate thresholds.</p>
        </div>

        {/* High-level platform statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Total Registered Nodes</span>
            <span className="text-2xl font-bold text-white font-mono">1,482</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">+14% // WEEK_GAIN</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">API Requests</span>
            <span className="text-2xl font-bold text-white font-mono">424K</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">99.98% // UPTIME</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Ledger Volume</span>
            <span className="text-2xl font-bold text-white font-mono">$82,450</span>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">Simplified Transfers</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Inference Cost</span>
            <span className="text-2xl font-bold text-white font-mono">$1,894</span>
            <span className="text-[10px] text-yellow-450 text-yellow-500 font-mono">Runway Stable</span>
          </div>
        </div>

        {/* Server metrics and logs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Server status list (8 cols) */}
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-6 lg:col-span-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm"><Server className="w-4.5 h-4.5 text-emerald-400" /> Active Compute Clusters</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[9px] text-emerald-400 font-mono">ALL NODES ONLINE</span>
            </div>

            <div className="space-y-4 text-xs font-mono text-gray-400">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">us-east-validation-node-01</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 12% | Latency: 420ms</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">ONLINE</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">ap-south-ledger-sync-node-02</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 42% | Latency: 120ms</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">ONLINE</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">eu-central-roast-engine-03</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 8% | Latency: 780ms</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Rate limits / alerts logs (4 cols) */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 lg:col-span-4">
            <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm"><ShieldAlert className="w-4.5 h-4.5 text-pink-500" /> System Alerts</h3>
            
            <div className="space-y-3 text-[11px] font-mono leading-relaxed text-gray-400">
              <div className="p-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                <span className="text-yellow-500 font-bold block mb-0.5">WARNING // API_RATE_LIMIT</span>
                Ip node 192.168.1.42 has exceeded 6 roasts/min index limit. Applying cooling restriction...
              </div>
              <div className="p-2.5 bg-pink-500/5 border border-pink-500/10 rounded-xl">
                <span className="text-pink-400 font-bold block mb-0.5">ALERT // SUPABASE_DISCONNECT</span>
                Temporary socket drop in AP-South region. Automatically failed back to local fallback buffer...
              </div>
            </div>
          </div>

        </div>

      </main>

      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI OS. Secure Administrator Station.</div>
      </footer>
    </div>
  );
}
