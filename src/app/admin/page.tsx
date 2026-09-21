"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, ShieldCheck, Database, Layers, RefreshCw, BarChart2, ShieldAlert, Users, Server, Zap, Lock } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-emerald-450 flex items-center justify-center shadow-lg">
              <Cpu className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">FounderOS<span className="text-cyan-400 font-light">.AI</span></span>
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
            <Lock className="w-4 h-4 text-pink-500 animate-pulse" /> ADMIN NODE CONSOLE ACTIVE
          </div>
          <h1 className="heading-font text-3xl font-bold text-white tracking-tight">System Monitor</h1>
          <p className="text-xs text-gray-450 mt-1 font-light">Inspect platform transaction ingestion endpoints, CPU loads, and cloud ledger latency.</p>
        </div>

        {/* High-level status cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Linked Partner Nodes</span>
            <span className="text-2xl font-bold text-white font-mono">1,142</span>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">+12% // ACTIVE_NODES</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Ledger API Calls</span>
            <span className="text-2xl font-bold text-white font-mono">284K</span>
            <span className="text-[10px] text-cyan-455 text-cyan-400 font-mono flex items-center gap-1">99.99% // RUNNING</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">Simplified Events</span>
            <span className="text-2xl font-bold text-white font-mono">82,450</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">Graph Optimisations</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 block">NLP Token Cost</span>
            <span className="text-2xl font-bold text-white font-mono">$452.12</span>
            <span className="text-[10px] text-yellow-500 font-mono">Runway Stable</span>
          </div>
        </div>

        {/* Server clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-6 lg:col-span-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm"><Server className="w-4.5 h-4.5 text-cyan-450 text-cyan-400" /> Active API Nodes</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono font-bold">ALL CLUSTERS ACTIVE</span>
            </div>

            <div className="space-y-4 text-xs font-mono text-gray-400">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">us-east-ocr-scan-node-01</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 14% | Latency: 320ms</span>
                </div>
                <span className="text-cyan-400 font-bold shrink-0">ONLINE</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">ap-south-voice-nlp-node-02</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 38% | Latency: 110ms</span>
                </div>
                <span className="text-cyan-400 font-bold shrink-0">ONLINE</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-semibold block">eu-central-database-sync-03</span>
                  <span className="text-[9px] text-gray-500 block">CPU load: 5% | Latency: 180ms</span>
                </div>
                <span className="text-cyan-400 font-bold shrink-0">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 lg:col-span-4">
            <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm"><ShieldAlert className="w-4.5 h-4.5 text-pink-500" /> Security Log Matrix</h3>
            
            <div className="space-y-3 text-[11px] font-mono leading-relaxed text-gray-400">
              <div className="p-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                <span className="text-yellow-500 font-bold block mb-0.5">WARNING // API_RETRY</span>
                Vercel webhook token mismatch. Re-trying secure handshakes parameter verification...
              </div>
              <div className="p-2.5 bg-pink-500/5 border border-pink-500/10 rounded-xl">
                <span className="text-pink-400 font-bold block mb-0.5">ALERT // SUPABASE_SOCKET</span>
                Websocket sync reconnect resolved in 420ms. Local cache buffer logs pushed successfully.
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>&copy; 2026 FounderOS AI OS. Administrator command deck.</div>
      </footer>
    </div>
  );
}
