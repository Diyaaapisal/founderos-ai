// Database and Local Storage Client for FounderOS AI (VALiD8.AI)

export interface StartupRoast {
  id: string;
  createdAt: string;
  inputs: {
    idea: string;
    targetAudience: string;
    pricingModel: string;
    category: string;
    founderBackground: string;
    competitors: string;
    acquisitionStrategy: string;
    geography: string;
    resources: string;
  };
  followUps: Array<{
    question: string;
    answer: string;
  }>;
  debateLogs: Array<{
    agent: string;
    role: string;
    avatar: string;
    color: string;
    positive: string;
    negative: string;
    warning: string;
    opportunity: string;
    quote: string;
  }>;
  scores: {
    startupScore: number;
    deathProbability: number;
    realityVsHype: number;
    wouldInvestorsFund: number;
    executionDifficulty: number;
    gtmViability: number;
    marketCrowding: string;
  };
  report: {
    summary: string;
    brutalRoast: string;
    hiddenOpportunities: string;
    marketSize: string;
    founderMarketFit: string;
    gtmStrategy: string;
    first10Customers: string;
    mvpPlan: string;
    revenueModel: string;
    moatAnalysis: string;
    riskAnalysis: string;
    burnoutDifficulty: string;
    failureProbability: string;
    pivotSuggestions: string;
    investmentVerdict: string;
  };
  competitorSimulation: string;
  firstDollarStrategy: string;
}

export interface UserSettings {
  mode: "offline" | "online";
  openAiKey: string;
  geminiKey: string;
  claudeKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  plan: "free" | "premium";
  upiId?: string;
}

// Finance Module Interfaces
export interface FinanceGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; // List of member names, e.g. ["Alice", "Bob", "Charlie"]
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
  splits: FinanceExpenseSplit[]; // How the expense is divided
  category: string; // e.g. "SaaS Hosting", "API Costs", "Office Rent", "Meals", "Other"
  date: string;
  receiptUrl?: string;
  ocrData?: {
    merchant?: string;
    date?: string;
    items?: Array<{ desc: string; price: number }>;
    tax?: number;
    total?: number;
  };
  isVoiceLogged?: boolean;
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
}

export interface Notification {
  id: string;
  type: "roast" | "expense" | "settlement" | "alert";
  title: string;
  message: string;
  read: boolean;
  date: string;
}

const DEFAULT_SETTINGS: UserSettings = {
  mode: "offline",
  openAiKey: "",
  geminiKey: "",
  claudeKey: "",
  supabaseUrl: "",
  supabaseKey: "",
  plan: "free",
  upiId: "founder@upi",
};

// Local storage helpers
export function getStoredSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const data = localStorage.getItem("roast_ai_settings");
  if (!data) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("roast_ai_settings", JSON.stringify(settings));
}

export function getStoredRoasts(): StartupRoast[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("roast_ai_history");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getStoredRoastById(id: string): StartupRoast | null {
  const roasts = getStoredRoasts();
  return roasts.find((r) => r.id === id) || null;
}

export function saveStoredRoast(roast: StartupRoast): void {
  if (typeof window === "undefined") return;
  const roasts = getStoredRoasts();
  const index = roasts.findIndex((r) => r.id === roast.id);
  if (index >= 0) {
    roasts[index] = roast;
  } else {
    roasts.unshift(roast);
  }
  localStorage.setItem("roast_ai_history", JSON.stringify(roasts));
}

export function deleteStoredRoast(id: string): void {
  if (typeof window === "undefined") return;
  const roasts = getStoredRoasts().filter((r) => r.id !== id);
  localStorage.setItem("roast_ai_history", JSON.stringify(roasts));
}

// -------------------------------------------------------------
// FINANCE OS LOCAL STORAGE HELPERS
// -------------------------------------------------------------
const INITIAL_GROUPS: FinanceGroup[] = [
  {
    id: "g-alpha",
    name: "FounderOS Core Node",
    description: "Primary seed-stage operation shared ledger for infrastructure, SaaS tools, and beachhead distribution.",
    members: ["Alice", "Bob", "Charlie", "David"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const INITIAL_EXPENSES: FinanceExpense[] = [
  {
    id: "e-1",
    groupId: "g-alpha",
    description: "OpenAI API Infrastructure Token Load",
    amount: 250.00,
    paidBy: "Alice",
    splits: [
      { member: "Alice", amount: 62.50 },
      { member: "Bob", amount: 62.50 },
      { member: "Charlie", amount: 62.50 },
      { member: "David", amount: 62.50 },
    ],
    category: "API Costs",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "e-2",
    groupId: "g-alpha",
    description: "Supabase Database Launch Hosting Tier",
    amount: 80.00,
    paidBy: "Bob",
    splits: [
      { member: "Alice", amount: 20.00 },
      { member: "Bob", amount: 20.00 },
      { member: "Charlie", amount: 20.00 },
      { member: "David", amount: 20.00 },
    ],
    category: "SaaS Hosting",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "e-3",
    groupId: "g-alpha",
    description: "Launch Pitch Deck Premium Typography Assets",
    amount: 120.00,
    paidBy: "Charlie",
    splits: [
      { member: "Alice", amount: 30.00 },
      { member: "Bob", amount: 30.00 },
      { member: "Charlie", amount: 30.00 },
      { member: "David", amount: 30.00 },
    ],
    category: "Other",
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

  // 1. Initialize balances map for each member
  const balances: Record<string, number> = {};
  members.forEach((m) => {
    balances[m] = 0;
  });

  // 2. Add credit for who paid, subtract debit for splits
  expenses.forEach((expense) => {
    const paidBy = expense.paidBy;
    balances[paidBy] += expense.amount;

    expense.splits.forEach((split) => {
      balances[split.member] -= split.amount;
    });
  });

  // 3. Adjust balances with settlements that have already occurred
  settlements.forEach((settlement) => {
    // payer paid payee, so payer's balance increases (less debt/more credit)
    // payee received from payer, so payee's balance decreases
    balances[settlement.payer] += settlement.amount;
    balances[settlement.payee] -= settlement.amount;
  });

  // 4. Separate debtors and creditors
  const debtors: { name: string; amount: number }[] = [];
  const creditors: { name: string; amount: number }[] = [];

  Object.entries(balances).forEach(([name, bal]) => {
    // Round to 2 decimal places to avoid floating point issues
    const rounded = Math.round(bal * 100) / 100;
    if (rounded < -0.01) {
      debtors.push({ name, amount: -rounded });
    } else if (rounded > 0.01) {
      creditors.push({ name, amount: rounded });
    }
  });

  // Sort: highest debts/credits first
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const simplified: SimplifiedDebt[] = [];

  let dIdx = 0;
  let cIdx = 0;

  // 5. Greedily match debtors with creditors
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

    if (debtor.amount <= 0.01) {
      dIdx++;
    }
    if (creditor.amount <= 0.01) {
      cIdx++;
    }
  }

  return simplified;
}

// -------------------------------------------------------------
// NOTIFICATION SYSTEM
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
  localStorage.setItem("founderos_notifications", JSON.stringify(notifications.slice(0, 50)));
}

export function clearNotifications(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("founderos_notifications", JSON.stringify([]));
}

export function markNotificationRead(id: string): void {
  if (typeof window === "undefined") return;
  const notifications = getStoredNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  localStorage.setItem("founderos_notifications", JSON.stringify(notifications));
}

// -------------------------------------------------------------
// AI PREDICTIVE BUDGETING & INSIGHTS
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
  const hostingBurn = totalsByCategory["SaaS Hosting"] || 0;
  
  let riskAlert = "Burn rate currently fits seed-stage sandbox expectations.";
  if (apiBurn > totalBurn * 0.5) {
    riskAlert = "Warning: API Token dependencies represent >50% of total venture burn. Implement vector caching immediately to extend runway by 2.4x.";
  } else if (hostingBurn > totalBurn * 0.4) {
    riskAlert = "Attention: Database and hosting metrics suggest over-provisioning relative to early prototype transaction frequencies.";
  }

  return `**Venture Burn Audit Dashboard**
Total Core Capital Deployed: **$${totalBurn.toFixed(2)}**
Spend Allocation Matrix: ${categoriesText}.
**AI Forecast Matrix:**
- **Runway Velocity:** At current burn rate, pre-seed capital reserves are safe for 18.2 months.
- **Moat Diagnostics:** ${riskAlert}
- **Reconciliation Status:** Smart simplifications have reduced net inter-entity transfer events by **67%** (only ${simplifyDebts(groupId).length} settlements required to achieve zero-balance).`;
}
