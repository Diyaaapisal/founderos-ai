"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowLeft, Users, Plus, Mic, Image, Sparkles, RefreshCw, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { getStoredGroups, saveStoredGroup, getStoredExpenses, saveStoredExpense, FinanceGroup, FinanceExpense } from "@/lib/db";

export default function GroupOSPage() {
  const router = useRouter();

  // Data state
  const [group, setGroup] = useState<FinanceGroup | null>(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [expenses, setExpenses] = useState<FinanceExpense[]>([]);

  // Voice simulation states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [detectedExpense, setDetectedExpense] = useState<{ desc: string; amount: number; category: string } | null>(null);

  // OCR simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<{ merchant: string; amount: number; category: string; tax: number } | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const groups = getStoredGroups();
    if (groups.length > 0) {
      setGroup(groups[0]);
      const storedExpenses = getStoredExpenses().filter(e => e.groupId === groups[0].id);
      setExpenses(storedExpenses);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!group || !newMemberName.trim()) return;

    if (group.members.includes(newMemberName.trim())) {
      alert("Member name already configured in this node.");
      return;
    }

    const updatedGroup: FinanceGroup = {
      ...group,
      members: [...group.members, newMemberName.trim()]
    };

    saveStoredGroup(updatedGroup);
    setNewMemberName("");
    refreshData();
  };

  // Voice logging simulation
  const startVoiceRecording = () => {
    setIsRecording(true);
    setVoiceTranscript("Listening...");
    setDetectedExpense(null);

    setTimeout(() => {
      setVoiceTranscript('"Alice paid sixty dollars for domain registration yesterday"');
      setDetectedExpense({
        desc: "Domain Registration renewal",
        amount: 60.00,
        category: "SaaS Hosting"
      });
      setIsRecording(false);
    }, 2500);
  };

  const approveVoiceExpense = () => {
    if (!group || !detectedExpense) return;

    const splitAmount = Math.round((detectedExpense.amount / group.members.length) * 100) / 100;
    const splits = group.members.map(m => ({ member: m, amount: splitAmount }));

    const newExpense: FinanceExpense = {
      id: "e-" + Math.random().toString(36).substring(2, 9),
      groupId: group.id,
      description: detectedExpense.desc,
      amount: detectedExpense.amount,
      paidBy: "Alice",
      splits,
      category: detectedExpense.category,
      date: new Date().toISOString(),
      isVoiceLogged: true
    };

    saveStoredExpense(newExpense);
    setDetectedExpense(null);
    setVoiceTranscript("");
    refreshData();
  };

  // OCR receipt scanning simulation
  const handleReceiptScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsScanning(true);
    setScannedReceipt(null);

    setTimeout(() => {
      setScannedReceipt({
        merchant: "GitHub Enterprise",
        amount: 140.00,
        category: "API Costs",
        tax: 12.50
      });
      setIsScanning(false);
    }, 3000);
  };

  const approveOcrExpense = () => {
    if (!group || !scannedReceipt) return;

    const splitAmount = Math.round((scannedReceipt.amount / group.members.length) * 100) / 100;
    const splits = group.members.map(m => ({ member: m, amount: splitAmount }));

    const newExpense: FinanceExpense = {
      id: "e-" + Math.random().toString(36).substring(2, 9),
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
      }
    };

    saveStoredExpense(newExpense);
    setScannedReceipt(null);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center">
        <Link href="/finance" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Ledger
        </Link>
        <span className="text-xs font-mono text-cyan-455 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded text-cyan-400">
          Collaborative Hub Active
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Members Management (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Users className="w-4 h-4" /> NODE MEMBERS CONFIG
              </div>
              <h2 className="heading-font text-lg font-bold text-white">Venture Partners</h2>
              <p className="text-[10px] text-gray-500 mt-1">
                Add partners to this collaborative node list to simplify debt splits.
              </p>
            </div>

            {/* Members List */}
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 text-xs">
              {group?.members.map(member => (
                <div key={member} className="p-2.5 bg-white/5 border border-white/5 rounded-lg flex justify-between items-center">
                  <span className="text-white font-medium">{member}</span>
                  <span className="text-[9px] font-mono text-gray-500">Connected Node</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Partner name (e.g. Emily)"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-cyan-400 text-black font-bold text-xs shadow transition-all flex justify-center items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Link New Partner Node
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Voice Assistant & OCR Receipt Ingestion (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Voice-to-Expense NLP Simulation Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <Mic className="w-4.5 h-4.5 text-cyan-400" /> Voice-to-Expense Assistant
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  NLP engine parses verbal transactions and configures splits instantly.
                </p>
              </div>

              {/* Record panel */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center space-y-4 text-center">
                <button
                  onClick={startVoiceRecording}
                  disabled={isRecording}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isRecording ? "bg-red-500 animate-pulse text-white" : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20"
                  }`}
                >
                  <Mic className="w-6 h-6" />
                </button>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Assistant status</span>
                  <p className="text-xs text-gray-300 italic min-h-[30px] flex items-center justify-center max-w-[200px]">
                    {voiceTranscript || 'Click mic to say: "Alice paid $60 for domain registration"'}
                  </p>
                </div>
              </div>

              {/* Detected Output */}
              {detectedExpense && (
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-3 text-xs">
                  <span className="text-cyan-400 font-bold block">// DYNAMIC NLP EXPENSE EXTRACTED:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300">
                    <div>Description: <strong className="text-white font-normal">{detectedExpense.desc}</strong></div>
                    <div>Value: <strong className="text-white font-normal">${detectedExpense.amount}</strong></div>
                    <div>Category: <strong className="text-white font-normal">{detectedExpense.category}</strong></div>
                    <div>Paid By: <strong className="text-white font-normal">Alice</strong></div>
                  </div>
                  <button
                    onClick={approveVoiceExpense}
                    className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-[10px] shadow hover:bg-cyan-400 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Log to Ledger
                  </button>
                </div>
              )}
            </div>

            {/* Receipt OCR Scanning Pipeline Simulation Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="heading-font font-bold text-white flex items-center gap-2 text-base">
                  <Image className="w-4.5 h-4.5 text-emerald-400" /> Receipt OCR Scanning Node
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  Extract cost parameters and tax totals from invoice images.
                </p>
              </div>

              {/* Upload area */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center space-y-3 text-center border-dashed border-2">
                <input
                  type="file"
                  id="receipt-file"
                  accept="image/*"
                  onChange={handleReceiptScan}
                  className="hidden"
                />
                <label
                  htmlFor="receipt-file"
                  className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  {isScanning ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Image className="w-5 h-5" />
                  )}
                </label>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Invoice Upload</span>
                  <p className="text-[11px] text-gray-300 mt-1">
                    {isScanning ? "Processing OCR pipeline..." : "Upload JPG/PNG corporate receipt"}
                  </p>
                </div>
              </div>

              {/* Scanned Output */}
              {scannedReceipt && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3 text-xs">
                  <span className="text-emerald-450 font-bold block text-emerald-400">// SCAN COMPLETED SUCCESSFULLY:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300">
                    <div>Merchant: <strong className="text-white font-normal">{scannedReceipt.merchant}</strong></div>
                    <div>Total: <strong className="text-white font-normal">${scannedReceipt.amount}</strong></div>
                    <div>Tax: <strong className="text-white font-normal">${scannedReceipt.tax}</strong></div>
                    <div>Category: <strong className="text-white font-normal">{scannedReceipt.category}</strong></div>
                  </div>
                  <button
                    onClick={approveOcrExpense}
                    className="w-full py-2 rounded-lg bg-emerald-500 text-black font-bold text-[10px] shadow hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm & Log Split
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS Group OS Node. Advanced receipt OCR and voice parsing algorithms.</div>
      </footer>
    </div>
  );
}
