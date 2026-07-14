"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowLeft, Split, Wallet, Plus, Users, BarChart2, DollarSign, Activity, FileText, Check, AlertCircle, RefreshCw, Send, CheckCircle2 } from "lucide-react";
import { getStoredGroups, getStoredExpenses, saveStoredExpense, getStoredSettlements, saveStoredSettlement, simplifyDebts, getFinancialInsights, FinanceGroup, FinanceExpense, FinanceSettlement } from "@/lib/db";

export default function FinanceOSDashboard() {
  const router = useRouter();
  
  // Data State
  const [groups, setGroups] = useState<FinanceGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState("");
  const [expenses, setExpenses] = useState<FinanceExpense[]>([]);
  const [simplifiedDebts, setSimplifiedDebts] = useState<Array<{ payer: string; payee: string; amount: number }>>([]);
  const [insights, setInsights] = useState("");
  
  // Form State
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("API Costs");
  
  // Settlement state
  const [activeSettlement, setActiveSettlement] = useState<{ payer: string; payee: string; amount: number } | null>(null);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiTxId, setUpiTxId] = useState("");
  const [isSettling, setIsSettling] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const storedGroups = getStoredGroups();
    setGroups(storedGroups);
    if (storedGroups.length > 0) {
      const gId = storedGroups[0].id;
      setActiveGroupId(gId);
      
      const storedExpenses = getStoredExpenses().filter(e => e.groupId === gId);
      setExpenses(storedExpenses);
      
      const debts = simplifyDebts(gId);
      setSimplifiedDebts(debts);
      
      const textInsights = getFinancialInsights(gId);
      setInsights(textInsights);
      
      // Default paidBy selector to first member
      if (storedGroups[0].members.length > 0) {
        setPaidBy(storedGroups[0].members[0]);
      }
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount || parseFloat(amount) <= 0 || !paidBy) {
      alert("Please enter valid expense details.");
      return;
    }

    const group = groups.find(g => g.id === activeGroupId);
    if (!group) return;

    const totalAmount = parseFloat(amount);
    const splitAmount = Math.round((totalAmount / group.members.length) * 100) / 100;
    
    // Equi-split splits mapping
    const splits = group.members.map(member => ({
      member,
      amount: splitAmount
    }));

    const newExpense: FinanceExpense = {
      id: "e-" + Math.random().toString(36).substring(2, 9),
      groupId: activeGroupId,
      description: desc,
      amount: totalAmount,
      paidBy,
      splits,
      category,
      date: new Date().toISOString()
    };

    saveStoredExpense(newExpense);
    
    // Reset inputs
    setDesc("");
    setAmount("");
    
    refreshData();
  };

  const initiateSettlement = (debt: { payer: string; payee: string; amount: number }) => {
    setActiveSettlement(debt);
    setShowUpiModal(true);
  };

  const handleCompleteSettlement = () => {
    if (!activeSettlement) return;
    setIsSettling(true);

    setTimeout(() => {
      const newSettlement: FinanceSettlement = {
        id: "s-" + Math.random().toString(36).substring(2, 9),
        groupId: activeGroupId,
        payer: activeSettlement.payer,
        payee: activeSettlement.payee,
        amount: activeSettlement.amount,
        date: new Date().toISOString(),
        status: "completed",
        upiTxId: upiTxId || "UPI-" + Math.floor(Math.random() * 9000000000 + 1000000000)
      };

      saveStoredSettlement(newSettlement);
      setIsSettling(false);
      setShowUpiModal(false);
      setUpiTxId("");
      setActiveSettlement(null);
      refreshData();
    }, 1500);
  };

  const activeGroup = groups.find(g => g.id === activeGroupId);
  const totalBurn = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-25 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-blue opacity-25 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center no-print">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
        <span className="text-xs font-mono text-cyan-455 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded text-cyan-400">
          Fintech Ledger node
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Add Expenses (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Wallet className="w-4 h-4" /> SECURE LEDGER INGESTION
              </div>
              <h2 className="heading-font text-xl font-bold text-white">Record Shared Expense</h2>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Log startup expenditure. Balances will automatically simplify across all partner nodes.
              </p>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium block">Expense Description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="e.g. Vercel Hosting Premium plan"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium block">Total Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="80.00"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all"
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
                <label className="text-xs text-gray-400 font-medium block">Paid By partner</label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                >
                  {activeGroup?.members.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 text-[10px] text-gray-500 font-mono">
                // Note: Expense splits will divide equally among {activeGroup?.members.length} members.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all flex justify-center items-center gap-1.5"
              >
                <Plus className="w-4.5 h-4.5 stroke-[2.5]" /> Log Transaction Split
              </button>
            </form>
          </div>

          {/* AI Financial Insights Dashboard */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> AI Forecast Matrix
            </h3>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-gray-400 leading-relaxed whitespace-pre-line">
              {insights}
            </div>
          </div>
        </div>

        {/* Right Column: Ledger Log & Balances Simplification (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main group details */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex justify-between items-center">
            <div>
              <h1 className="heading-font text-2xl font-bold text-white">{activeGroup?.name}</h1>
              <p className="text-xs text-gray-400 mt-1 font-light">{activeGroup?.description}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono uppercase block">Total Burn</span>
              <span className="text-2xl font-bold text-white font-mono">${totalBurn.toFixed(2)}</span>
            </div>
          </div>

          {/* Debt Simplification visualizer */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="heading-font text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4.5 h-4.5 text-emerald-400 animate-spin" /> Graph-Simplified Net Balances
            </h3>
            
            {simplifiedDebts.length === 0 ? (
              <div className="p-8 text-center bg-black/35 rounded-xl border border-white/5">
                <CheckCircle2 className="w-8 h-8 text-emerald-450 mx-auto mb-2" />
                <p className="text-xs text-gray-300 font-bold">Ledger Balance Achieved</p>
                <p className="text-[10px] text-gray-500 mt-0.5">All venture partners have settled their active obligations.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {simplifiedDebts.map((debt, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between space-y-3 hover:border-cyan-500/20 transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-white">{debt.payer}</span>
                        <span className="text-[10px] text-gray-500 block">Debtor node</span>
                      </div>
                      <span className="text-gray-500 text-[10px] font-mono">owes</span>
                      <div className="text-right">
                        <span className="font-bold text-white">{debt.payee}</span>
                        <span className="text-[10px] text-gray-500 block">Creditor node</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-white/5 pt-2">
                      <span className="text-sm font-bold text-cyan-400 font-mono">${debt.amount.toFixed(2)}</span>
                      <button
                        onClick={() => initiateSettlement(debt)}
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[10px] shadow-sm flex items-center gap-1 transition-all"
                      >
                        <Send className="w-3 h-3" /> Settle payment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expense History Ledger */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="heading-font text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" /> Share Ledger Transaction Logs
            </h3>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between text-xs hover:border-white/10 transition-all">
                  <div className="space-y-1">
                    <span className="text-white font-semibold block leading-tight">{expense.description}</span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                      <span>Paid by: <strong className="text-gray-300 font-normal">{expense.paidBy}</strong></span>
                      <span>•</span>
                      <span>Category: <strong className="text-gray-300 font-normal">{expense.category}</strong></span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-white font-mono block">${expense.amount.toFixed(2)}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* UPI Settlement Simulation Modal */}
      {showUpiModal && activeSettlement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 no-print">
          <div className="glass-panel border-white/10 rounded-2xl max-w-md w-full p-6 relative overflow-hidden shadow-2xl space-y-6">
            <button
              onClick={() => setShowUpiModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg mx-auto mb-3">
                <Send className="w-5 h-5" />
              </span>
              <h3 className="heading-font text-lg font-bold text-white">Reconciliation UPI Settling</h3>
              <p className="text-xs text-gray-400">
                You are settling a balance from <strong className="text-white font-bold">{activeSettlement.payer}</strong> to <strong className="text-white font-bold">{activeSettlement.payee}</strong>.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center space-y-2 font-mono">
              <span className="text-[10px] text-gray-550 uppercase tracking-widest block">Transfer Value</span>
              <span className="text-2xl font-bold text-cyan-450">${activeSettlement.amount.toFixed(2)}</span>
              <span className="text-[10px] text-gray-500 block">UPI ID: founderos@upi</span>
            </div>

            {/* UPI QR Code simulation */}
            <div className="w-36 h-36 bg-white p-2.5 rounded-xl mx-auto flex items-center justify-center border border-white/10 shadow-lg">
              {/* Simulated QR Code using pixels */}
              <div className="grid grid-cols-6 gap-1 w-full h-full opacity-90">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`rounded-[2px] ${i % 3 === 0 || i % 4 === 0 || i < 6 || i > 30 ? "bg-black" : "bg-gray-300"}`}></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={upiTxId}
                onChange={(e) => setUpiTxId(e.target.value)}
                placeholder="UPI Transaction ID (optional)"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500/50"
              />

              <button
                onClick={handleCompleteSettlement}
                disabled={isSettling}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg transition-all flex justify-center items-center"
              >
                {isSettling ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-black mr-2"></div>
                    Verifying settlement transaction...
                  </>
                ) : (
                  "Confirm Settlement Complete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS Finance OS Operating system. Realtime debt simplification engine.</div>
      </footer>
    </div>
  );
}
