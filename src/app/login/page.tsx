"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setGlobalError("");
    setSuccessMessage("");
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        setSuccessMessage("Sign up successful! Please log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setGlobalError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async () => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: any) {
      setGlobalError(err.message || "OAuth failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] glow-cyan opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-emerald opacity-20 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-450 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Cpu className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span className="heading-font text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              FounderOS<span className="text-cyan-400 font-light">.AI</span>
            </span>
          </Link>
          <h1 className="heading-font text-2xl font-bold text-white">
            {isSignUp ? "Create an account" : "Log in to your account"}
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 font-light">
            {isSignUp ? "Enter your details to register a new node." : "Welcome back! Please enter your details to access your dashboard."}
          </p>
        </div>

        <div className="glass-panel-heavy p-8 rounded-2xl border border-white/10 shadow-2xl relative">
          <div className="absolute top-0 left-6 transform -translate-y-1/2 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-[10px] text-cyan-400 font-mono">
            SECURE ACCESS
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {globalError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">
                {globalError}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 text-center">
                {successMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium block">What is your email address?</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="e.g., founder@startup.com"
                  className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all font-sans`}
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium block">Enter your password</label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••••••"
                  className={`w-full bg-black/40 border ${errors.password ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all font-sans`}
                />
                <Lock className="w-4 h-4 text-gray-550 absolute left-3.5 top-3.5" />
              </div>
              {errors.password && <p className="text-[10px] text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded bg-black border-white/10 text-cyan-500 focus:ring-0 w-3 h-3" />
                Remember me
              </label>
              {!isSignUp && <a href="#" className="hover:text-cyan-400 transition-colors">Forgot password?</a>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex justify-center items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-black"></div>
                  {isSignUp ? "Creating account..." : "Logging in..."}
                </>
              ) : (
                <>
                  {isSignUp ? "Sign Up" : "Log In"}
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
            onClick={handleOAuthLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl border border-white/5 hover:border-white/15 bg-white/5 text-xs text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
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
          
          <div className="mt-6 text-center text-xs text-gray-500">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsSignUp(false)} className="text-cyan-400 hover:underline">
                  Log in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button onClick={() => setIsSignUp(true)} className="text-cyan-400 hover:underline">
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-[10px] text-center text-gray-500 mt-6 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Secured by Supabase Auth
        </p>
      </div>
    </div>
  );
}
