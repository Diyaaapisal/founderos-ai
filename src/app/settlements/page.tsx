"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowLeft, RefreshCw, Send, CheckCircle2, QrCode, AlertCircle, FileText, Check, Bell } from "lucide-react";
import { getStoredGroups, getStoredSettlements, saveStoredSettlement, simplifyDebts, FinanceGroup, FinanceSettlement, getStoredSettings, generateAuditId } from "@/lib/db";
import { QRCodeSVG } from "qrcode.react";

export default function SettlementsPage() {
  const router = useRouter();

  // Data state
  const [group, setGroup] = useState<FinanceGroup | null>(null);
  const [simplifiedDebts, setSimplifiedDebts] = useState<Array<{ payer: string; payee: string; amount: number }>>([]);
  const [settlementLogs, setSettlementLogs] = useState<FinanceSettlement[]>([]);
  const [fintechUpiId, setFintechUpiId] = useState("founder@upi");

  // Modal simulation state
  const [activeSettlement, setActiveSettlement] = useState<{ payer: string; payee: string; amount: number } | null>(null);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiTxId, setUpiTxId] = useState("");
  const [isSettling, setIsSettling] = useState(false);
  const [remindedList, setRemindedList] = useState<string[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const groups = getStoredGroups();
    const settings = getStoredSettings();
    if (settings && settings.upiId) {
      setFintechUpiId(settings.upiId);
    }

    if (groups.length > 0) {
      setGroup(groups[0]);
      
      const debts = simplifyDebts(groups[0].id);
      setSimplifiedDebts(debts);

      const logs = getStoredSettlements().filter(s => s.groupId === groups[0].id);
      setSettlementLogs(logs);
    }
  };

  const initiateSettlement = (debt: { payer: string; payee: string; amount: number }) => {
    setActiveSettlement(debt);
    setShowUpiModal(true);
  };

  const handleSendReminder = (payer: string) => {
    if (!remindedList.includes(payer)) {
      setRemindedList([...remindedList, payer]);
    }
  };

  const handleCompleteSettlement = () => {
    if (!group || !activeSettlement) return;
    setIsSettling(true);

    setTimeout(() => {
      const newSettlement: FinanceSettlement = {
        id: "settle-" + Math.random().toString(36).substring(2, 9),
        groupId: group.id,
        payer: activeSettlement.payer,
        payee: activeSettlement.payee,
        amount: activeSettlement.amount,
        date: new Date().toISOString(),
        status: "completed",
        upiTxId: upiTxId || "UPI-" + Math.floor(Math.random() * 9000000000 + 1000000000),
        auditId: generateAuditId()
      };

      saveStoredSettlement(newSettlement);
      setIsSettling(false);
      setShowUpiModal(false);
      setUpiTxId("");
      setActiveSettlement(null);
      refreshData();
    }, 1500);
  };

  const handleExportSettlementsCSV = () => {
    if (settlementLogs.length === 0) return;
    const headers = ["ID", "Payer", "Payee", "Amount", "Status", "Date", "UPI TX ID"];
    const rows = settlementLogs.map(s => [
      s.id, s.payer, s.payee, s.amount, s.status, new Date(s.date).toLocaleDateString(), s.upiTxId || ""
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "founderos_settlements.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate UPI URI
  // upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR
  const upiUri = activeSettlement ? `upi://pay?pa=${fintechUpiId}&pn=${activeSettlement.payee}&am=${activeSettlement.amount}&cu=INR` : "";

  return (
    <div className="min-h-screen bg-[#030712] relative flex flex-col justify-between py-12 px-6">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-full h-[600px] glow-cyan opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-full h-[600px] glow-emerald opacity-20 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-8 relative z-10 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-300 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="text-xs font-mono text-cyan-455 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded text-cyan-400">
          Settle Up
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: simplified balances (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel-heavy p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <RefreshCw className="w-4 h-4" /> BALANCES
              </div>
              <h2 className="heading-font text-xl font-bold text-white">Who owes who?</h2>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                We've done the math to minimize the number of transfers needed to get everyone paid back.
              </p>
            </div>

            {simplifiedDebts.length === 0 ? (
              <div className="p-8 text-center bg-black/35 rounded-xl border border-white/5 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs text-gray-300 font-bold">You're all settled up!</p>
                  <p className="text-[10px] text-gray-500 max-w-xs mx-auto">No pending balances in your group.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {simplifiedDebts.map((debt, index) => (
                  <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-cyan-500/20 transition-all text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{debt.payer}</span>
                        <span className="text-gray-500 text-[10px]">owes</span>
                        <span className="font-bold text-white">{debt.payee}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 block leading-none font-mono">Net balance split</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-cyan-455 text-cyan-400 font-mono">${debt.amount.toFixed(2)}</span>
                      
                      <button
                        onClick={() => handleSendReminder(debt.payer)}
                        className={`px-3 py-2 rounded-lg text-[10px] font-bold shadow transition-all flex items-center gap-1 cursor-pointer ${remindedList.includes(debt.payer) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-black border border-white/10 text-gray-300 hover:bg-white/5'}`}
                      >
                        {remindedList.includes(debt.payer) ? <><Check className="w-3.5 h-3.5" /> Reminded</> : <><Bell className="w-3.5 h-3.5" /> Remind</>}
                      </button>

                      <button
                        onClick={() => initiateSettlement(debt)}
                        className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[10px] shadow transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Settle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Settlement History Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="heading-font font-bold text-white flex items-center gap-2 text-sm">
                <FileText className="w-4.5 h-4.5 text-cyan-400" /> Settle History
              </h3>
              <button 
                onClick={handleExportSettlementsCSV}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-white font-mono flex items-center transition-all cursor-pointer"
              >
                CSV
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
              {settlementLogs.length === 0 ? (
                <p className="text-xs text-gray-500 italic text-center py-4">No completed settlements yet.</p>
              ) : (
                settlementLogs.map(log => (
                  <div key={log.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center hover:border-white/10 transition-all font-mono text-[11px]">
                    <div className="space-y-0.5">
                      <span className="text-white font-sans">{log.payer} paid {log.payee}</span>
                      <span className="text-[9px] text-gray-550 block font-mono">ID: {log.upiTxId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-450 text-emerald-400 font-bold block">${log.amount.toFixed(2)}</span>
                      <span className="text-[9px] text-gray-500 block">{new Date(log.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* UPI QR modal */}
      {showUpiModal && activeSettlement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="glass-panel border-white/10 rounded-2xl max-w-sm w-full p-6 relative overflow-hidden shadow-2xl space-y-6">
            <button
              onClick={() => setShowUpiModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="text-center space-y-1 relative z-10">
              <QrCode className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
              <h3 className="heading-font text-lg font-bold text-white">Scan to Pay</h3>
              <p className="text-xs text-gray-400">
                <strong className="text-white font-bold">{activeSettlement.payer}</strong>, scan to pay <strong className="text-white font-bold">${activeSettlement.amount.toFixed(2)}</strong> to <strong className="text-white font-bold">{activeSettlement.payee}</strong>.
              </p>
            </div>

            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center space-y-1.5 font-mono text-xs">
              <span className="text-[9px] text-gray-500 uppercase block">UPI Payment ID</span>
              <span className="text-cyan-400 font-bold font-mono">{fintechUpiId}</span>
            </div>

            {/* Real QR code */}
            <div className="w-40 h-40 bg-white p-3 rounded-xl mx-auto flex items-center justify-center border border-white/5 shadow-lg">
              <QRCodeSVG value={upiUri} size={136} level="L" includeMargin={false} />
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={upiTxId}
                onChange={(e) => setUpiTxId(e.target.value)}
                placeholder="Transaction ID (e.g. 5189280)"
                className="w-full bg-black/45 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500/50"
              />

              <button
                onClick={handleCompleteSettlement}
                disabled={isSettling}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg transition-all flex justify-center items-center cursor-pointer"
              >
                {isSettling ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-black mr-2"></div>
                    Verifying transfer...
                  </>
                ) : (
                  "Confirm Paid"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-gray-500 mt-12 relative z-10">
        <div>FounderOS AI - Simple, intuitive expense splitting.</div>
      </footer>
    </div>
  );
}
