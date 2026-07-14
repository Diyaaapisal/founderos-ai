"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, Settings, ShieldCheck, Zap, Sparkles, Check, Database, Award, Info } from "lucide-react";
import { getStoredSettings, saveStoredSettings, UserSettings } from "@/lib/db";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    mode: "offline",
    openAiKey: "",
    geminiKey: "",
    claudeKey: "",
    supabaseUrl: "",
    supabaseKey: "",
    plan: "free",
    upiId: "founder@upi",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePlanToggle = () => {
    const nextPlan = settings.plan === "free" ? "premium" : "free";
    const updated = { ...settings, plan: nextPlan };
    setSettings(updated);
    saveStoredSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-full h-[600px] glow-emerald opacity-20 pointer-events-none z-0"></div>

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

      {/* Main Form */}
      <main className="max-w-3xl mx-auto w-full px-6 py-4 relative z-10 flex-grow space-y-6">
        <div>
          <h1 className="heading-font text-3xl font-bold tracking-tight text-white mb-2">Node Controls</h1>
          <p className="text-xs text-gray-400">
            Configure computation mode, remote database synchronisation, and payment profiles.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex justify-between items-center transition-all">
            <span>✓ Node configurations synced successfully to browser storage registry.</span>
            <button onClick={() => setSaved(false)} className="text-emerald-400 font-bold hover:underline">Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Subscription Model Section */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Award className="w-4.5 h-4.5 text-emerald-400" /> Subscription Plan Tier</h2>
                <p className="text-[11px] text-gray-400 mt-1">
                  Simulate upgrading this node console to unlock full SWOT matrices, GTM channels, and PDF dossier prints.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePlanToggle}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  settings.plan === "premium"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg"
                    : "border border-white/10 hover:bg-white/5 text-gray-300"
                }`}
              >
                {settings.plan === "premium" ? "★ PREMIUM ENABLED" : "FREE PLAN ACTIVE"}
              </button>
            </div>
          </div>

          {/* Engine Modes */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Settings className="w-4.5 h-4.5 text-cyan-400" /> LLM Execution Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  settings.mode === "offline"
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-white/[0.05] bg-white/[0.01] hover:border-white/15"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="mode"
                    value="offline"
                    checked={settings.mode === "offline"}
                    onChange={() => setSettings({ ...settings, mode: "offline" })}
                    className="accent-emerald-500"
                  />
                  <span className="text-xs font-semibold text-white">Local Simulation Heuristics</span>
                </div>
                <span className="text-[11px] text-gray-400 mt-2 font-light">
                  Instant, high-fidelity mock debates, roasts, and GTM profiles. No external keys required.
                </span>
              </label>

              <label
                className={`flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  settings.mode === "online"
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-white/[0.05] bg-white/[0.01] hover:border-white/15"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="mode"
                    value="online"
                    checked={settings.mode === "online"}
                    onChange={() => setSettings({ ...settings, mode: "online" })}
                    className="accent-emerald-500"
                  />
                  <span className="text-xs font-semibold text-white">Dynamic AI Cloud Nodes</span>
                </div>
                <span className="text-[11px] text-gray-400 mt-2 font-light">
                  Interfaces directly with OpenAI or Google API keys for personalized validation insights.
                </span>
              </label>
            </div>
          </div>

          {/* Online API Keys */}
          {settings.mode === "online" && (
            <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Zap className="w-4.5 h-4.5 text-yellow-500" /> API Access Keys</h2>
              <p className="text-[11px] text-gray-450 leading-relaxed">
                Provide at least one key below. The system prioritizes OpenAI, falling back to Anthropic or Google Gemini keys.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1.5 font-mono">OPENAI_API_KEY</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={settings.openAiKey}
                    onChange={(e) => setSettings({ ...settings, openAiKey: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1.5 font-mono">GEMINI_API_KEY</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={settings.geminiKey}
                    onChange={(e) => setSettings({ ...settings, geminiKey: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* UPI Settling configuration */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> UPI Settlement Config</h2>
            <p className="text-[11px] text-gray-400">
              Provide your sovereign UPI address. This is used to compile pay-back transaction QR codes dynamically.
            </p>

            <div className="text-xs">
              <label className="block text-[11px] text-gray-400 mb-1.5 font-mono">FINTECH_UPI_ID</label>
              <input
                type="text"
                placeholder="founder@upi"
                value={settings.upiId || ""}
                onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Database Setup */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Database className="w-4.5 h-4.5 text-indigo-400" /> Remote Database (Supabase)</h2>
            <p className="text-[11px] text-gray-400 font-light">
              Optionally sync all localized browser data to a remote Postgres database.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1.5 font-mono">SUPABASE_URL</label>
                <input
                  type="text"
                  placeholder="https://xyz.supabase.co"
                  value={settings.supabaseUrl}
                  onChange={(e) => setSettings({ ...settings, supabaseUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1.5 font-mono">SUPABASE_ANON_KEY</label>
                <input
                  type="password"
                  placeholder="eyJhbGci..."
                  value={settings.supabaseKey}
                  onChange={(e) => setSettings({ ...settings, supabaseKey: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-white/[0.05] text-xs">
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-emerald-400 hover:text-black transition-all shadow-md"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-neutral-950/60 py-6 px-6 text-center text-xs text-neutral-500 relative z-20 mt-12">
        <div>&copy; 2026 FounderOS AI OS. Node Configurations console.</div>
      </footer>
    </div>
  );
}
