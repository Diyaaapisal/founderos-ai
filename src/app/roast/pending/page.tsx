"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getStoredSettings, saveStoredRoast, StartupRoast } from "@/lib/db";

// Fix import from 'next/navigation' instead of 'navigation'
import { useRouter as useNextRouter } from "next/navigation";

export default function PendingRoastPage() {
  const router = useNextRouter();

  const [logs, setLogs] = useState<Array<{ agent: string; text: string; color: string }>>([]);
  const [complete, setComplete] = useState(false);
  const [finalRoast, setFinalRoast] = useState<StartupRoast | null>(null);
  const [error, setError] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Agent quotes to stream before API response (or during simulator mock phase)
  const initialBootLogs = [
    { agent: "SYSTEM", text: "Initializing Adversarial Anti-Consensus Protocol (AACP) Matrix...", color: "text-neutral-500 font-bold" },
    { agent: "SYSTEM", text: "Mapping startup inputs to cognitive stress filters...", color: "text-neutral-500" },
    { agent: "SYSTEM", text: "Spawning 6 autonomous validation nodes in isolation...", color: "text-neutral-500" },
  ];

  useEffect(() => {
    // Scroll to bottom of terminal whenever logs update
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    // 1. Read pending data
    const inputsStr = sessionStorage.getItem("pending_roast_inputs");
    const followUpsStr = sessionStorage.getItem("pending_roast_followups");

    if (!inputsStr || !followUpsStr) {
      setError("No pending roast configurations found. Redirecting...");
      setTimeout(() => router.push("/roast/new"), 3000);
      return;
    }

    const inputs = JSON.parse(inputsStr);
    const followUps = JSON.parse(followUpsStr);
    const settings = getStoredSettings();

    // Start logging sequence
    let currentLogs = [...initialBootLogs];
    setLogs(currentLogs);

    const runValidation = async () => {
      try {
        // Trigger debate API call
        const response = await fetch("/api/roast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs, followUps, settings }),
        });

        if (!response.ok) {
          throw new Error("Validation engine crashed during synthesis.");
        }

        const roastData: StartupRoast = await response.json();
        setFinalRoast(roastData);

        // Stream agent quotes sequentially to create a realistic debate feel
        const agents = roastData.debateLogs;
        
        for (let i = 0; i < agents.length; i++) {
          const agentData = agents[i];
          
          // Add small booting status
          await delay(800);
          setLogs(prev => [
            ...prev,
            { agent: "SYSTEM", text: `[NODE_${i+1}_${agentData.agent.toUpperCase()}]: Enforced anti-consensus parameters. Invoking audit...`, color: "text-neutral-600 font-mono" }
          ]);

          // Stream the actual quote
          await delay(1200);
          const colorClass = 
            agentData.avatar === "VC" ? "text-purple-400" :
            agentData.avatar === "CF" ? "text-red-400" :
            agentData.avatar === "GH" ? "text-blue-400" :
            agentData.avatar === "CP" ? "text-yellow-400" :
            agentData.avatar === "TA" ? "text-green-400" : "text-orange-400";

          setLogs(prev => [
            ...prev,
            { agent: agentData.agent, text: agentData.quote, color: colorClass }
          ]);
        }

        // Compilation complete
        await delay(1000);
        setLogs(prev => [
          ...prev,
          { agent: "SYSTEM", text: "Matrix execution complete. Compilation successful. 15-section report ready.", color: "text-green-400 font-bold font-mono" }
        ]);

        // Save completed roast data to localStorage history
        saveStoredRoast(roastData);

        // Clear wizard sessions
        sessionStorage.removeItem("pending_roast_inputs");
        sessionStorage.removeItem("pending_roast_followups");

        setComplete(true);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Execution error running strategic debate.");
        setLogs(prev => [
          ...prev,
          { agent: "ERROR", text: `Protocol execution failure: ${e.message}`, color: "text-red-500 font-bold" }
        ]);
      }
    };

    runValidation();
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleProceed = () => {
    if (finalRoast) {
      router.push(`/roast/${finalRoast.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-neutral-300 font-mono text-xs flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-full h-[600px] glow-purple pointer-events-none z-0"></div>

      {/* Header */}
      <header className="border-b border-white/[0.05] p-6 flex justify-between items-center bg-black/40 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 rounded bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-[10px]">
            R
          </div>
          <span className="font-medium text-xs tracking-tight text-white uppercase tracking-wider">AACP_DEBATE_CONSOLE</span>
        </div>
        <div className="text-[10px] text-neutral-500">
          SESSION_ID: {finalRoast ? finalRoast.id.toUpperCase() : "SYNCING"}
        </div>
      </header>

      {/* Interactive Terminal Core */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-grow flex flex-col justify-center z-10">
        <div className="glass-panel border-white/10 rounded-xl p-5 bg-black/80 flex-grow flex flex-col h-[500px] justify-between shadow-2xl relative">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4 text-[10px] text-neutral-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500/30 animate-pulse"></span>
              <span>SYNTHETIC_DEBATE_STREAM // INFERENCE_ACTIVE</span>
            </div>
            <span>PORT: 443</span>
          </div>

          {/* Logs scroll wrapper */}
          <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-800">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                <span className={`text-[10px] ${log.color} uppercase tracking-wider font-semibold mr-2`}>
                  [{log.agent}]
                </span>
                <span className="text-neutral-300 font-sans leading-relaxed block sm:inline">
                  {log.text}
                </span>
              </div>
            ))}
            {error && (
              <div className="text-red-500 font-bold border border-red-500/20 bg-red-500/5 p-3 rounded mt-4">
                ✕ {error}
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Proceed Section */}
          {complete && finalRoast && (
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex justify-between items-center animate-fade-in">
              <span className="text-green-400 text-[10px] font-bold tracking-wider animate-pulse">
                ✦ AUDIT COMPILED & SYNCED. READY FOR EXTRACTION.
              </span>
              <button
                onClick={handleProceed}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all shadow-lg shadow-white/15"
              >
                Compile Strategic Report →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[10px] text-neutral-600 border-t border-white/[0.03]">
        WARNING: Anti-Consensus matrix active. Conversational agreement models disabled.
      </footer>
    </div>
  );
}
