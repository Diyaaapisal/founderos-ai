"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, User, Mail, Shield, Award, Activity, BarChart2, ShieldCheck } from "lucide-react";
import { getStoredSettings } from "@/lib/db";

export default function ProfilePage() {
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    const settings = getStoredSettings();
    setPlan(settings.plan);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-emerald opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md px-6 py-4 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      {/* Main Profile Info */}
      <main className="max-w-3xl mx-auto w-full px-6 py-4 relative z-10 flex-grow space-y-8">
        
        {/* Profile Title */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 text-black">
            <User className="w-8 h-8 stroke-[2]" />
          </div>
          <div>
            <h1 className="heading-font text-2xl md:text-3xl font-bold text-white tracking-tight">Founder Profile Node</h1>
            <p className="text-xs text-gray-400 mt-1">Sovereign network administrator details.</p>
          </div>
        </div>

        {/* User profile data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 md:col-span-2">
            <h3 className="heading-font font-bold text-white text-sm border-b border-white/5 pb-2 flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-450" /> Administrative Credentials</h3>
            
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">Sovereign Name</span>
                  <span className="text-white font-semibold mt-0.5 block">AI Software Architect</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">Node Position</span>
                  <span className="text-white font-semibold mt-0.5 block">Lead Product Strategist</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 font-mono uppercase block">Associated Email Address</span>
                <span className="text-white font-semibold mt-0.5 block flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-500" /> architect@founderos.ai</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 font-mono uppercase block">Sovereign Plan status</span>
                <span className="text-white font-semibold mt-0.5 block uppercase text-emerald-450 text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 animate-bounce" /> {plan === "premium" ? "Scale Venture Tier Active" : "Developer Sandbox Tier"}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="heading-font font-bold text-white text-sm border-b border-white/5 pb-2 flex items-center gap-1.5"><Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> Usage Metrics</h3>
              
              <div className="space-y-2 text-[11px] font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>API Tokens Used:</span>
                  <span className="text-white font-semibold">12,450 / 50k</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: "25%" }}></div>
                </div>

                <div className="flex justify-between pt-1">
                  <span>Audit Quota:</span>
                  <span className="text-white font-semibold">{plan === "premium" ? "Unlimited" : "3 / 3"}</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: plan === "premium" ? "100%" : "100%" }}></div>
                </div>
              </div>
            </div>

            <Link
              href="/settings"
              className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-semibold text-white text-center transition-all mt-4"
            >
              Configure keys
            </Link>
          </div>

        </div>

      </main>

      <footer className="max-w-3xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI OS. Secure founder profile.</div>
      </footer>
    </div>
  );
}
