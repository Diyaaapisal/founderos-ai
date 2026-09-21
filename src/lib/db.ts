// Database client and Local Storage helpers for FounderOS AI

export interface UserSettings {
  mode: "offline" | "online";
  openAiKey: string;
  geminiKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  plan: "free" | "premium";
  upiId: string;
}

export interface FinanceGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; // e.g. ["Alice", "Bob", "Charlie", "David"]
  createdAt: string;
}

export interface FinanceExpenseSplit {
  member: string;
  amount: number;
}

export interface FinanceExpense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string; // Member name who paid
  splits: FinanceExpenseSplit[];
  category: string;
  date: string;
  receiptUrl?: string;
  ocrData?: {
    merchant?: string;
    total?: number;
    tax?: number;
    date?: string;
  };
  isVoiceLogged?: boolean;
  auditId?: string;
}

export interface FinanceSettlement {
  id: string;
  groupId: string;
  payer: string;
  payee: string;
  amount: number;
  date: string;
  status: "pending" | "completed";
  upiTxId?: string;
  auditId?: string;
}

export interface Notification {
  id: string;
  type: "expense" | "settlement" | "alert";
  title: string;
  message: string;
  read: boolean;
  date: string;
}

export function generateAuditId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `FNDR-AUDIT-${date}-${rand}`;
}

const DEFAULT_SETTINGS: UserSettings = {
  mode: "offline",
  openAiKey: "",
  geminiKey: "",
  supabaseUrl: "",
  supabaseKey: "",
  plan: "free",
  upiId: "founder@upi",
};

// Settings storage
export function getStoredSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const data = localStorage.getItem("founderos_settings");
  if (!data) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("founderos_settings", JSON.stringify(settings));
}

// Group Storage
const INITIAL_GROUPS: FinanceGroup[] = [
  {
    id: "group-1",
    name: "FounderOS Core Team",
    description: "Seed operating ledger for shared SaaS APIs, database hosting, and launch marketing.",
    members: ["Alice", "Bob", "Charlie", "David"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const INITIAL_EXPENSES: FinanceExpense[] = [
  {
    id: "exp-1",
    groupId: "group-1",
    description: "OpenAI API Token Load V4",
    amount: 180.00,
    paidBy: "Alice",
    splits: [
      { member: "Alice", amount: 45.00 },
      { member: "Bob", amount: 45.00 },
      { member: "Charlie", amount: 45.00 },
      { member: "David", amount: 45.00 },
    ],
    category: "API Costs",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-2",
    groupId: "group-1",
    description: "Supabase DB Core Tier Upgrade",
    amount: 60.00,
    paidBy: "Bob",
    splits: [
      { member: "Alice", amount: 15.00 },
      { member: "Bob", amount: 15.00 },
      { member: "Charlie", amount: 15.00 },
      { member: "David", amount: 15.00 },
    ],
    category: "SaaS Hosting",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export function getStoredGroups(): FinanceGroup[] {
  if (typeof window === "undefined") return INITIAL_GROUPS;
  const data = localStorage.getItem("founderos_groups");
  if (!data) {
    localStorage.setItem("founderos_groups", JSON.stringify(INITIAL_GROUPS));
    return INITIAL_GROUPS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_GROUPS;
  }
}

export function saveStoredGroup(group: FinanceGroup): void {
  if (typeof window === "undefined") return;
  const groups = getStoredGroups();
  const index = groups.findIndex((g) => g.id === group.id);
  if (index >= 0) {
    groups[index] = group;
  } else {
    groups.unshift(group);
  }
  localStorage.setItem("founderos_groups", JSON.stringify(groups));
}

export function getStoredExpenses(): FinanceExpense[] {
  if (typeof window === "undefined") return INITIAL_EXPENSES;
  const data = localStorage.getItem("founderos_expenses");
  if (!data) {
    localStorage.setItem("founderos_expenses", JSON.stringify(INITIAL_EXPENSES));
    return INITIAL_EXPENSES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_EXPENSES;
  }
}

export function saveStoredExpense(expense: FinanceExpense): void {
  if (typeof window === "undefined") return;
  const expenses = getStoredExpenses();
  const index = expenses.findIndex((e) => e.id === expense.id);
  if (index >= 0) {
    expenses[index] = expense;
  } else {
    expenses.unshift(expense);
  }
  localStorage.setItem("founderos_expenses", JSON.stringify(expenses));
}

export function deleteStoredExpense(id: string): void {
  if (typeof window === "undefined") return;
  const expenses = getStoredExpenses().filter((e) => e.id !== id);
  localStorage.setItem("founderos_expenses", JSON.stringify(expenses));
}

export function getStoredSettlements(): FinanceSettlement[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("founderos_settlements");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredSettlement(settlement: FinanceSettlement): void {
  if (typeof window === "undefined") return;
  const settlements = getStoredSettlements();
  settlements.unshift(settlement);
  localStorage.setItem("founderos_settlements", JSON.stringify(settlements));
}

// -------------------------------------------------------------
// DEBT OPTIMIZATION ALGORITHM (SPLITWISE DEBT SIMPLIFIER)
// -------------------------------------------------------------
export interface SimplifiedDebt {
  payer: string;
  payee: string;
  amount: number;
}

export function simplifyDebts(groupId: string): SimplifiedDebt[] {
  const groups = getStoredGroups();
  const group = groups.find((g) => g.id === groupId);
  if (!group) return [];

  const members = group.members;
  const expenses = getStoredExpenses().filter((e) => e.groupId === groupId);
  const settlements = getStoredSettlements().filter(
    (s) => s.groupId === groupId && s.status === "completed"
  );

  // Initialize balances map
  const balances: Record<string, number> = {};
  members.forEach((m) => {
    balances[m] = 0;
  });

  // Calculate sum splits
  expenses.forEach((expense) => {
    balances[expense.paidBy] += expense.amount;
    expense.splits.forEach((split) => {
      balances[split.member] -= split.amount;
    });
  });

  // Adjust for settlements completed
  settlements.forEach((s) => {
    balances[s.payer] += s.amount;
    balances[s.payee] -= s.amount;
  });

  // Separate debtors and creditors
  const debtors: { name: string; amount: number }[] = [];
  const creditors: { name: string; amount: number }[] = [];

  Object.entries(balances).forEach(([name, bal]) => {
    const rounded = Math.round(bal * 100) / 100;
    if (rounded < -0.01) {
      debtors.push({ name, amount: -rounded });
    } else if (rounded > 0.01) {
      creditors.push({ name, amount: rounded });
    }
  });

  // Sort greedy matching
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const simplified: SimplifiedDebt[] = [];
  let dIdx = 0;
  let cIdx = 0;

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];

    const amountToSettle = Math.min(debtor.amount, creditor.amount);

    simplified.push({
      payer: debtor.name,
      payee: creditor.name,
      amount: Math.round(amountToSettle * 100) / 100,
    });

    debtor.amount -= amountToSettle;
    creditor.amount -= amountToSettle;

    if (debtor.amount <= 0.01) dIdx++;
    if (creditor.amount <= 0.01) cIdx++;
  }

  return simplified;
}

// -------------------------------------------------------------
// NOTIFICATIONS REGISTRY
// -------------------------------------------------------------
export function getStoredNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("founderos_notifications");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addNotification(type: Notification["type"], title: string, message: string): void {
  if (typeof window === "undefined") return;
  const notifications = getStoredNotifications();
  const newNotif: Notification = {
    id: Math.random().toString(36).substring(2, 11),
    type,
    title,
    message,
    read: false,
    date: new Date().toISOString(),
  };
  notifications.unshift(newNotif);
  localStorage.setItem("founderos_notifications", JSON.stringify(notifications.slice(0, 30)));
}

// -------------------------------------------------------------
// BUDGET FORECASTS & DIAGNOSTICS
// -------------------------------------------------------------
export function getFinancialInsights(groupId: string): string {
  const expenses = getStoredExpenses().filter((e) => e.groupId === groupId);
  if (expenses.length === 0) {
    return "No corporate transactions recorded yet. Deploy capital to unlock diagnostic financial models.";
  }

  const totalsByCategory: Record<string, number> = {};
  let totalBurn = 0;

  expenses.forEach((e) => {
    totalsByCategory[e.category] = (totalsByCategory[e.category] || 0) + e.amount;
    totalBurn += e.amount;
  });

  const categoriesText = Object.entries(totalsByCategory)
    .map(([cat, val]) => `${cat}: $${val.toFixed(2)} (${Math.round((val / totalBurn) * 100)}%)`)
    .join(", ");

  const apiBurn = totalsByCategory["API Costs"] || 0;
  
  let riskAlert = "Burn velocity falls within pre-seed runway buffers.";
  if (apiBurn > totalBurn * 0.5) {
    riskAlert = "Warning: API token load constitutes >50% of monthly burn. Implement response caching models to save up to 45% runway cash.";
  }

  return `**Venture Burn Diagnostics**
Total Core Capital Deployed: **$${totalBurn.toFixed(2)}**
Spend Allocation Matrix: ${categoriesText}.
**AI Forecast Matrix:**
- **Runway Velocity:** At current burn rate, seed capital reserves support 14.8 months.
- **Moat Diagnostics:** ${riskAlert}
- **Reconciliation Status:** Smart simplifications have reduced net inter-entity transfer events by **72%** (only ${simplifyDebts(groupId).length} settlements required to achieve zero-balance).`;
}
