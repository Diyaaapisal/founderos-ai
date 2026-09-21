"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowLeft, Users, Plus, Mic, Image, Sparkles, RefreshCw, CheckCircle2, FileText, Wallet, Settings } from "lucide-react";
import { getStoredGroups, saveStoredGroup, getStoredExpenses, saveStoredExpense, FinanceGroup, FinanceExpense, getStoredSettings, generateAuditId } from "@/lib/db";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addMemberSchema = z.object({
  newMemberName: z.string().min(1, "Partner name is required"),
});
type AddMemberFormValues = z.infer<typeof addMemberSchema>;

const manualExpenseSchema = z.object({
  desc: z.string().min(1, "Please enter what this was for"),
  amount: z.number({ message: "Please enter a valid amount" }).positive("Must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  paidBy: z.string().min(1, "Please select who paid"),
});
type ManualExpenseFormValues = z.infer<typeof manualExpenseSchema>;

export default function GroupsPage() {
  const router = useRouter();

  // Data state
  const [group, setGroup] = useState<FinanceGroup | null>(null);
  
  // Voice simulation states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [detectedExpense, setDetectedExpense] = useState<{ desc: string; amount: number; category: string } | null>(null);

  // OCR simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<{ merchant: string; amount: number; category: string; tax: number } | null>(null);

  // Forms
  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    formState: { errors: memberErrors },
    reset: resetMember,
    setError: setMemberError
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: { newMemberName: "" }
  });

  const {
    register: registerExpense,
    handleSubmit: handleSubmitExpense,
    formState: { errors: expenseErrors },
    reset: resetExpense,
    setValue: setExpenseValue
  } = useForm<ManualExpenseFormValues>({
    resolver: zodResolver(manualExpenseSchema),
    defaultValues: { desc: "", category: "API Costs", paidBy: "" }
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const groups = getStoredGroups();
    if (groups.length > 0) {
      setGroup(groups[0]);
      if (groups[0].members.length > 0) {
        setExpenseValue("paidBy", groups[0].members[0]);
      }
    }
  };

  const onAddMember = (data: AddMemberFormValues) => {
    if (!group) return;

    if (group.members.includes(data.newMemberName.trim())) {
      setMemberError("newMemberName", { message: "This partner is already in the group." });
      return;
    }

    const updatedGroup: FinanceGroup = {
      ...group,
      members: [...group.members, data.newMemberName.trim()]
    };

    saveStoredGroup(updatedGroup);
    resetMember();
    refreshData();
  };

  const onManualSubmit = (data: ManualExpenseFormValues) => {
    if (!group) return;

    const splitAmount = Math.round((data.amount / group.members.length) * 100) / 100;
    const splits = group.members.map(m => ({ member: m, amount: splitAmount }));

    const newExpense: FinanceExpense = {
      id: "exp-" + Math.random().toString(36).substring(2, 9),
      groupId: group.id,
      description: data.desc,
      amount: data.amount,
      paidBy: data.paidBy,
      splits,
      category: data.category,
      date: new Date().toISOString(),
      auditId: generateAuditId()
    };

    saveStoredExpense(newExpense);
    resetExpense();
    router.push("/dashboard");
  };

  // Voice logging simulation
  // Voice logging integration
  const startVoiceRecording = async () => {
    setIsRecording(true);
    setVoiceTranscript("Listening...");
    setDetectedExpense(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Try Chrome.");
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(`"${transcript}"`);
      
      const settings = getStoredSettings();
      if (settings.mode === 'online' && (settings.openAiKey || settings.geminiKey)) {
        try {
          const res = await fetch('/api/ai/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              transcript,
              provider: settings.openAiKey ? 'openai' : 'gemini',
              apiKey: settings.openAiKey || settings.geminiKey
            })
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setDetectedExpense({
            desc: data.desc || "Voice Expense",
            amount: parseFloat(data.amount) || 0,
            category: data.category || "Other"
          });
        } catch (err) {
          console.error(err);
          alert("Failed to parse voice note with AI.");
        }
      } else {
        // Fallback mock
        setTimeout(() => {
          setDetectedExpense({ desc: "Voice Note (Offline Mode)", amount: 50.00, category: "Other" });
        }, 1000);
      }
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setVoiceTranscript("Failed to hear you.");
      setIsRecording(false);
    };

    recognition.start();
  };

  const approveVoiceExpense = () => {
    if (!group || !detectedExpense) return;

    const splitAmount = Math.round((detectedExpense.amount / group.members.length) * 100) / 100;
    const splits = group.members.map(m => ({ member: m, amount: splitAmount }));

    const newExpense: FinanceExpense = {
      id: "exp-" + Math.random().toString(36).substring(2, 9),
      groupId: group.id,
      description: detectedExpense.desc,
      amount: detectedExpense.amount,
      paidBy: group.members[0] || "Alice", // Default to first member
      splits,
      category: detectedExpense.category,
      date: new Date().toISOString(),
      isVoiceLogged: true,
      auditId: generateAuditId()
    };

    saveStoredExpense(newExpense);
    setDetectedExpense(null);
    setVoiceTranscript("");
    router.push("/dashboard");
  };

  // OCR receipt scanning integration
  const handleReceiptScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsScanning(true);
    setScannedReceipt(null);
    
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      
      const settings = getStoredSettings();
      if (settings.mode === 'online' && (settings.openAiKey || settings.geminiKey)) {
        try {
          const res = await fetch('/api/ai/ocr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64,
              provider: settings.openAiKey ? 'openai' : 'gemini',
              apiKey: settings.openAiKey || settings.geminiKey
            })
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setScannedReceipt({
            merchant: data.merchant || "Unknown Merchant",
            amount: parseFloat(data.amount) || 0,
            category: data.category || "Other",
            tax: parseFloat(data.tax) || 0
          });
        } catch (err) {
          console.error(err);
          alert("Failed to parse receipt with AI.");
        }
      } else {
        // Fallback mock
        setTimeout(() => {
          setScannedReceipt({ merchant: "Local Cafe (Offline)", amount: 45.00, category: "Meals", tax: 3.50 });
        }, 1500);
      }
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  const approveOcrExpense = () => {
    if (!group || !scannedReceipt) return;

    const splitAmount = Math.round((scannedReceipt.amount / group.members.length) * 100) / 100;
    const splits = group.members.map(m => ({ member: m, amount: splitAmount }));

    const newExpense: FinanceExpense = {
      id: "exp-" + Math.random().toString(36).substring(2, 9),
      groupId: group.id,
      description: `Receipt: ${scannedReceipt.merchant}`,
      amount: scannedReceipt.amount,
      paidBy: group.members[0] || "Alice",
      splits,
      category: scannedReceipt.category,
      date: new Date().toISOString(),
      ocrData: {
        merchant: scannedReceipt.merchant,
        total: scannedReceipt.amount,
        tax: scannedReceipt.tax
      },
      auditId: generateAuditId()
    };

    saveStoredExpense(newExpense);
    setScannedReceipt(null);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-emerald opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
        <span className="text-xs font-mono text-cyan-455 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded text-cyan-400">
          Add Expense
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Manual Ingestion (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Wallet className="w-4 h-4" /> ADD EXPENSE
              </div>
              <h2 className="heading-font text-xl font-bold text-white">Add a shared expense</h2>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Log a new cost. We'll automatically split it among the group.
              </p>
            </div>

            <form onSubmit={handleSubmitExpense(onManualSubmit)} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium block">What was this for?</label>
                <input
                  type="text"
                  {...registerExpense("desc")}
                  placeholder="e.g. Uber to the airport"
                  className={`w-full bg-black/40 border ${expenseErrors.desc ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all`}
                />
                {expenseErrors.desc && <p className="text-[10px] text-red-400">{expenseErrors.desc.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium block">How much?</label>
                  <input
                    type="number"
                    step="0.01"
                    {...registerExpense("amount", { valueAsNumber: true })}
                    placeholder="120.00"
                    className={`w-full bg-black/40 border ${expenseErrors.amount ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all font-mono`}
                  />
                  {expenseErrors.amount && <p className="text-[10px] text-red-400">{expenseErrors.amount.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium block">Category</label>
                  <select
                    {...registerExpense("category")}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 focus:ring-cyan-500/50 focus:ring-1 transition-all font-sans"
                  >
                    <option>API Costs</option>
                    <option>SaaS Hosting</option>
                    <option>Office Rent</option>
                    <option>Meals</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium block">Who paid?</label>
                <select
                  {...registerExpense("paidBy")}
                  className={`w-full bg-black border ${expenseErrors.paidBy ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 transition-all font-sans`}
                >
                  <option value="">Select a person...</option>
                  {group?.members.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {expenseErrors.paidBy && <p className="text-[10px] text-red-400">{expenseErrors.paidBy.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex justify-center items-center gap-1.5 cursor-pointer hover:shadow-cyan-500/40"
              >
                Save Expense
              </button>
            </form>
          </div>

          {/* Members node list */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
                <Users className="w-4.5 h-4.5 text-cyan-400" /> Group Members
              </h3>
              <p className="text-[10px] text-gray-500 mt-1">Who is sharing expenses in this group?</p>
            </div>

            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 text-xs">
              {group?.members.map(m => (
                <div key={m} className="p-2 bg-white/5 border border-white/5 rounded-lg flex justify-between items-center font-mono text-[11px]">
                  <span className="text-white">{m}</span>
                  <span className="text-gray-500">Active</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitMember(onAddMember)} className="space-y-2 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  {...registerMember("newMemberName")}
                  placeholder="e.g. Emily"
                  className={`flex-grow bg-black/45 border ${memberErrors.newMemberName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'} rounded-lg p-2 text-xs text-white placeholder-gray-650 focus:outline-none focus:ring-1 transition-all`}
                />
                <button
                  type="submit"
                  className="px-4 rounded-lg bg-white text-black font-bold hover:bg-cyan-400 transition-all"
                >
                  Add
                </button>
              </div>
              {memberErrors.newMemberName && <p className="text-[10px] text-red-400">{memberErrors.newMemberName.message}</p>}
            </form>
          </div>
        </div>

        {/* Right column: AI Ingestions (Voice & OCR Scanner) (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Voice Logger NLP Ingest */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <Mic className="w-4.5 h-4.5 text-cyan-400" /> Fast Voice Add
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  Just say what you bought and we'll parse it.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center space-y-3 text-center">
                <button
                  onClick={startVoiceRecording}
                  disabled={isRecording}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isRecording ? "bg-red-500 animate-pulse text-white shadow-red-500/20" : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20"
                  } cursor-pointer`}
                >
                  <Mic className="w-6 h-6" />
                </button>
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Microphone</span>
                  <p className="text-xs text-gray-300 italic min-h-[30px] flex items-center justify-center max-w-[200px]">
                    {voiceTranscript || 'Click mic to say: "Alice paid $60 for Uber"'}
                  </p>
                </div>
              </div>

              {detectedExpense && (
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-3 text-xs">
                  <span className="text-cyan-455 text-cyan-400 font-bold block font-mono text-[10px]">// WE HEARD:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300">
                    <div>What: <strong className="text-white font-normal">{detectedExpense.desc}</strong></div>
                    <div>How much: <strong className="text-white font-normal">${detectedExpense.amount}</strong></div>
                    <div>Category: <strong className="text-white font-normal">{detectedExpense.category}</strong></div>
                    <div>Who paid: <strong className="text-white font-normal">Alice</strong></div>
                  </div>
                  <button
                    onClick={approveVoiceExpense}
                    className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Looks good, save it
                  </button>
                </div>
              )}
            </div>

            {/* Receipt OCR Ingest */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <Image className="w-4.5 h-4.5 text-emerald-400" /> Receipt Scanner
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  Upload a photo of your receipt. We'll read it for you.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center space-y-3 text-center border-dashed border-2">
                <input
                  type="file"
                  id="receipt-ocr"
                  accept="image/*"
                  onChange={handleReceiptScan}
                  className="hidden"
                />
                <label
                  htmlFor="receipt-ocr"
                  className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-450 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  {isScanning ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Image className="w-5 h-5" />
                  )}
                </label>
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Upload Photo</span>
                  <p className="text-[11px] text-gray-305 mt-1">
                    {isScanning ? "Reading your receipt..." : "Tap to upload image"}
                  </p>
                </div>
              </div>

              {scannedReceipt && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3 text-xs">
                  <span className="text-emerald-455 text-emerald-400 font-bold block font-mono text-[10px]">// WE READ:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300">
                    <div>Where: <strong className="text-white font-normal">{scannedReceipt.merchant}</strong></div>
                    <div>Total: <strong className="text-white font-normal">${scannedReceipt.amount}</strong></div>
                    <div>Tax: <strong className="text-white font-normal">${scannedReceipt.tax}</strong></div>
                    <div>Category: <strong className="text-white font-normal">{scannedReceipt.category}</strong></div>
                  </div>
                  <button
                    onClick={approveOcrExpense}
                    className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Looks good, save it
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI - Simple, intuitive expense splitting.</div>
      </footer>
    </div>
  );
}
