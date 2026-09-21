"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, Settings, ShieldCheck, Zap, Database, Award, Info } from "lucide-react";
import { getStoredSettings, saveStoredSettings, UserSettings } from "@/lib/db";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const settingsSchema = z.object({
  mode: z.enum(["offline", "online"]),
  openAiKey: z.string().optional(),
  geminiKey: z.string().optional(),
  supabaseUrl: z.string().optional(),
  supabaseKey: z.string().optional(),
  plan: z.enum(["free", "premium"]),
  upiId: z.string().optional(),
});
type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      mode: "offline",
      openAiKey: "",
      geminiKey: "",
      supabaseUrl: "",
      supabaseKey: "",
      plan: "free",
      upiId: "founder@upi",
    }
  });

  const mode = watch("mode");
  const plan = watch("plan");

  useEffect(() => {
    const stored = getStoredSettings();
    reset({
      mode: stored.mode || "offline",
      openAiKey: stored.openAiKey || "",
      geminiKey: stored.geminiKey || "",
      supabaseUrl: stored.supabaseUrl || "",
      supabaseKey: stored.supabaseKey || "",
      plan: stored.plan || "free",
      upiId: stored.upiId || "founder@upi",
    });
  }, [reset]);

  const onSave = (data: SettingsFormValues) => {
    saveStoredSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePlanToggle = () => {
    const nextPlan = plan === "free" ? "premium" : "free";
    setValue("plan", nextPlan);
    
    // Auto-save when toggling plan for UX convenience
    const currentData = watch();
    saveStoredSettings({ ...currentData, plan: nextPlan });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-full h-[600px] glow-cyan opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md px-6 py-4 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg">
              <Cpu className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">FounderOS<span className="text-cyan-400 font-light">.AI</span></span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Settings Form */}
      <main className="max-w-3xl mx-auto w-full px-6 py-4 relative z-10 flex-grow space-y-6">
        <div>
          <h1 className="heading-font text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
          <p className="text-xs text-gray-400">
            Manage your AI keys, database connections, and payment details.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex justify-between items-center transition-all">
            <span>✓ Settings saved successfully.</span>
            <button onClick={() => setSaved(false)} className="text-emerald-400 font-bold hover:underline">Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSave)} className="space-y-6">
          {/* Subscription Model Section */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Award className="w-4.5 h-4.5 text-cyan-400" /> Current Plan</h2>
                <p className="text-[11px] text-gray-400 mt-1 font-light">
                  Upgrade to unlock unlimited receipt scanning and voice uploads.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePlanToggle}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  plan === "premium"
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black shadow-lg"
                    : "border border-white/10 hover:bg-white/5 text-gray-300"
                }`}
              >
                {plan === "premium" ? "★ PREMIUM ACTIVE" : "FREE PLAN ACTIVE"}
              </button>
            </div>
          </div>

          {/* Engine Modes */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Settings className="w-4.5 h-4.5 text-cyan-400" /> App Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  mode === "offline"
                    ? "border-cyan-500/50 bg-cyan-500/5"
                    : "border-white/[0.05] bg-white/[0.01] hover:border-white/15"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="offline"
                    {...register("mode")}
                    className="accent-cyan-500"
                  />
                  <span className="text-xs font-semibold text-white">Local / Demo Mode</span>
                </div>
                <span className="text-[11px] text-gray-400 mt-2 font-light">
                  Great for testing. Uses fake data for AI receipt scanning and voice parsing. No API keys needed.
                </span>
              </label>

              <label
                className={`flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  mode === "online"
                    ? "border-cyan-500/50 bg-cyan-500/5"
                    : "border-white/[0.05] bg-white/[0.01] hover:border-white/15"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="online"
                    {...register("mode")}
                    className="accent-cyan-500"
                  />
                  <span className="text-xs font-semibold text-white">Live AI Mode</span>
                </div>
                <span className="text-[11px] text-gray-400 mt-2 font-light">
                  Connects to real AI APIs (OpenAI/Gemini) to actually read your receipts and parse voice notes.
                </span>
              </label>
            </div>
          </div>

          {/* Online API Keys */}
          {mode === "online" && (
            <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Zap className="w-4.5 h-4.5 text-yellow-500" /> Your API Keys</h2>
              <p className="text-[11px] text-gray-450 leading-relaxed font-light">
                Add your API keys so the app can talk to the AI.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1.5">OpenAI API Key (Starts with sk-...)</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    {...register("openAiKey")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1.5">Google Gemini API Key (Starts with AIzaSy...)</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    {...register("geminiKey")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* UPI Address Config */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> How do you want to get paid?</h2>
            <p className="text-[11px] text-gray-400 font-light">
              Add your UPI ID. We'll use this to generate a QR code so your group can pay you back instantly.
            </p>

            <div className="text-xs">
              <label className="block text-[11px] text-gray-400 mb-1.5">Your UPI ID</label>
              <input
                type="text"
                placeholder="e.g. founder@upi or phone@paytm"
                {...register("upiId")}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Database Setup */}
          <div className="glass-panel rounded-xl p-6 border-white/[0.06] space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5"><Database className="w-4.5 h-4.5 text-indigo-400" /> Database Connection (Supabase)</h2>
            <p className="text-[11px] text-gray-400 font-light">
              Want to sync expenses across multiple devices? Add your Supabase project details here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1.5">Supabase URL</label>
                <input
                  type="text"
                  placeholder="https://xyz.supabase.co"
                  {...register("supabaseUrl")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1.5">Supabase Anon Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGci..."
                  {...register("supabaseKey")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
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
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 transition-all shadow-md cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-neutral-950/60 py-6 px-6 text-center text-xs text-neutral-500 relative z-20 mt-12">
        <div>&copy; 2026 FounderOS AI OS.</div>
      </footer>
    </div>
  );
}
