"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, Settings, Plus, FileSpreadsheet, Sparkles, ArrowRight, Download } from "lucide-react";
import { getStoredGroups, getStoredExpenses, getStoredSettings, simplifyDebts, getFinancialInsights, FinanceGroup, FinanceExpense } from "@/lib/db";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
  const [group, setGroup] = useState<FinanceGroup | null>(null);
  const [expenses, setExpenses] = useState<FinanceExpense[]>([]);
  const [simplifiedCount, setSimplifiedCount] = useState(0);
  const [totalBurn, setTotalBurn] = useState(0);
  const [insights, setInsights] = useState("");
  const [plan, setPlan] = useState("free");

  // Chart Data
  const [pieData, setPieData] = useState<{name: string, value: number}[]>([]);
  const [barData, setBarData] = useState<{name: string, value: number}[]>([]);

  const COLORS = ['#06b6d4', '#10b981', '#6366f1', '#f59e0b', '#ec4899'];

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const groups = getStoredGroups();
    const storedExpenses = getStoredExpenses();
    const settings = getStoredSettings();
    setPlan(settings.plan);

    if (groups.length > 0) {
      setGroup(groups[0]);
      const activeExpenses = storedExpenses.filter(e => e.groupId === groups[0].id);
      setExpenses(activeExpenses);
      
      const simplified = simplifyDebts(groups[0].id);
      setSimplifiedCount(simplified.length);
      
      const burn = activeExpenses.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalBurn(burn);

      const textInsights = getFinancialInsights(groups[0].id);
      setInsights(textInsights);

      // Prepare Pie Chart Data (Category breakdown)
      const catMap: Record<string, number> = {};
      activeExpenses.forEach(e => {
        catMap[e.category] = (catMap[e.category] || 0) + e.amount;
      });
      const pie = Object.keys(catMap).map(k => ({ name: k, value: catMap[k] }));
      setPieData(pie);

      // Prepare Bar Chart Data (Member breakdown)
      const memMap: Record<string, number> = {};
      activeExpenses.forEach(e => {
        memMap[e.paidBy] = (memMap[e.paidBy] || 0) + e.amount;
      });
      const bar = Object.keys(memMap).map(k => ({ name: k, value: memMap[k] }));
      setBarData(bar);
    }
  };

  const handleExportCSV = () => {
    if (expenses.length === 0) return;
    
    const headers = ["ID", "Description", "Category", "Amount", "Paid By", "Date"];
    const rows = expenses.map(e => [
      e.id, 
      `"${e.description.replace(/"/g, '""')}"`, 
      `"${e.category}"`, 
      e.amount, 
      `"${e.paidBy}"`, 
      new Date(e.date).toLocaleDateString()
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "founderos_expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-25 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-emerald opacity-25 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.05] glass-panel bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">
                FounderOS<span className="text-cyan-400 font-light">.AI</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 text-xs font-semibold text-gray-400">
              <Link href="/dashboard" className="text-white">Spend Ledger</Link>
              <Link href="/groups" className="hover:text-white transition-colors">Add Expense</Link>
              <Link href="/settlements" className="hover:text-white transition-colors">Settlements</Link>
              <Link href="/settings" className="hover:text-white transition-colors">Settings</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex-grow space-y-8">
        
        {/* Title row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-450 bg-cyan-400 animate-pulse"></span>
              CORE OPERATING SYSTEM CONSOLE
            </div>
            <h1 className="heading-font text-3xl font-bold text-white tracking-tight">
              Spend Console Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/groups"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Expense
            </Link>
          </div>
        </div>

        {/* Global Summary Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-5 rounded-2xl space-y-1.5 border-l-4 border-l-cyan-500">
            <span className="text-[9px] uppercase tracking-widest font-mono text-gray-500 block">Total Group Burn</span>
            <div className="text-2xl font-bold text-white font-mono">${totalBurn.toFixed(2)}</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1.5 border-l-4 border-l-emerald-500">
            <span className="text-[9px] uppercase tracking-widest font-mono text-gray-500 block">Active Members</span>
            <div className="text-2xl font-bold text-white font-mono">{group?.members.length || 0}</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1.5 border-l-4 border-l-yellow-500">
            <span className="text-[9px] uppercase tracking-widest font-mono text-gray-500 block">Pending Settlements</span>
            <div className="text-2xl font-bold text-white font-mono">{simplifiedCount}</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl space-y-1.5 border-l-4 border-l-purple-500">
            <span className="text-[9px] uppercase tracking-widest font-mono text-gray-500 block">Plan Tier</span>
            <div className="text-xs font-bold text-purple-400 uppercase font-mono py-1.5">{plan}</div>
          </div>
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="heading-font font-bold text-white text-sm">Category Spend Breakdown</h3>
            <div className="h-48">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">No data available</div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center text-[10px]">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-gray-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="heading-font font-bold text-white text-sm">Spend by Member</h3>
            <div className="h-48">
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">No data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Spend logs data table (Full Width) */}
        <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" /> Recent Transactions
            </h3>
            <button 
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> EXPORT CSV
            </button>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {expenses.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs">No transactions recorded. Click "Add Expense" to start.</div>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between text-xs hover:border-cyan-500/15 transition-all">
                  <div className="space-y-1">
                    <span className="text-white font-semibold block leading-tight">{expense.description}</span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                      <span>Paid by: <strong className="text-gray-300 font-normal">{expense.paidBy}</strong></span>
                      <span>•</span>
                      <span>Category: <strong className="text-gray-300 font-normal">{expense.category}</strong></span>
                      {expense.isVoiceLogged && <span className="text-cyan-400">[Voice Logged]</span>}
                      {expense.ocrData && <span className="text-emerald-450 text-emerald-400">[OCR Scanned]</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-white font-mono block">${expense.amount.toFixed(2)}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-neutral-950/60 py-6 px-6 text-center text-xs text-neutral-500 relative z-20">
        <div>&copy; 2026 FounderOS AI OS. Sovereign collaborative finance ledger.</div>
      </footer>
    </div>
  );
}
