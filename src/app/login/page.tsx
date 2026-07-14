"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill out all credentials.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    // Simulate API authorization response
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] glow-emerald opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-blue opacity-20 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Cpu className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span className="heading-font text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              FounderOS<span className="text-emerald-400 font-light">.AI</span>
            </span>
          </Link>
          <h1 className="heading-font text-2xl font-bold text-white">Access Core Console</h1>
          <p className="text-xs text-gray-500 mt-1.5">Sign in to your validating node or collaborative finance OS ledger.</p>
        </div>

        <div className="glass-panel-heavy p-8 rounded-2xl border border-white/10 shadow-2xl relative">
          <div className="absolute top-0 left-6 transform -translate-y-1/2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[10px] text-emerald-400 font-mono">
            SECURE ACCESS GATEWAY
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium block">Venture Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@venture.co"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-605 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium block">Key Encryption Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-605 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded bg-black border-white/10 text-emerald-500 focus:ring-0 w-3 h-3" />
                Keep node logged in
              </label>
              <a href="#" className="hover:text-emerald-400 transition-colors">Recover decryption key</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-black"></div>
                  Authenticating credentials...
                </>
              ) : (
                <>
                  Enter Operating Console
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="h-[1px] bg-white/5 w-full block absolute top-1/2 -translate-y-1/2"></span>
            <span className="text-[10px] uppercase font-mono text-gray-500 px-3 bg-[#0a0f1d] relative z-10">or continue via OAuth</span>
          </div>

          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                router.push("/dashboard");
              }, 1200);
            }}
            className="w-full py-2.5 rounded-xl border border-white/5 hover:border-white/15 bg-white/5 text-xs text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google account
          </button>
        </div>

        <p className="text-[10px] text-center text-gray-500 mt-6 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          All computational connections encrypted end-to-end.
        </p>
      </div>
    </div>
  );
}
