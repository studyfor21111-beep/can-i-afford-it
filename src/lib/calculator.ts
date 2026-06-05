export interface CalculatorInput {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingEMI: number;
  savings: number;
  purchasePrice: number;
  downPaymentPct: number;
  loanTermYears: number;
  interestRatePct: number;
  category: string;
}

export interface AffordabilityResult {
  canAfford: boolean;
  score: number; // 0–100
  verdict: "green" | "amber" | "red";
  verdictText: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  emi: number;
  savingsAfter: number;
  downPayment: number;
  loanAmount: number;
  totalCost: number;
  timeToAffordMonths: number;
  tips: string[];
}

export function calculateEMI(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function runAffordabilityCheck(input: CalculatorInput): AffordabilityResult {
  const {
    monthlyIncome,
    monthlyExpenses,
    existingEMI,
    savings,
    purchasePrice,
    downPaymentPct,
    loanTermYears,
    interestRatePct,
    category,
  } = input;

  const downPayment = (purchasePrice * downPaymentPct) / 100;
  const loanAmount = purchasePrice - downPayment;
  const emi = calculateEMI(loanAmount, interestRatePct, loanTermYears);
  const totalEMI = emi + existingEMI;
  const totalOutflow = monthlyExpenses + totalEMI;
  const savingsAfter = monthlyIncome - totalOutflow;
  const debtToIncome = (totalEMI / monthlyIncome) * 100;

  // Category-specific running costs
  const runningCosts: Record<string, number> = {
    car: purchasePrice * 0.015 / 12, // ~1.5% p.a. maintenance + insurance estimate
    home: purchasePrice * 0.01 / 12,
    phone: 0,
    laptop: 0,
    education: 0,
    other: 0,
  };
  const extraMonthly = runningCosts[category] ?? 0;
  const totalCost = purchasePrice + emi * loanTermYears * 12 - loanAmount + extraMonthly * 12 * loanTermYears;

  // Score calculation
  let score = 100;
  // DTI penalty
  if (debtToIncome > 50) score -= 40;
  else if (debtToIncome > 40) score -= 25;
  else if (debtToIncome > 30) score -= 10;

  // Savings penalty
  if (savingsAfter < 0) score -= 40;
  else if (savingsAfter < monthlyIncome * 0.1) score -= 20;
  else if (savingsAfter < monthlyIncome * 0.2) score -= 10;

  // Down payment check
  if (savings < downPayment) score -= 20;

  score = Math.max(0, Math.min(100, score));

  const verdict: "green" | "amber" | "red" =
    score >= 65 ? "green" : score >= 40 ? "amber" : "red";

  const verdictMap: Record<string, string> = {
    green: "✅ Yes, you can afford it!",
    amber: "⚠️ Possible, but be cautious.",
    red: "❌ Not recommended right now.",
  };

  const timeToSave =
    savings >= downPayment
      ? 0
      : Math.ceil((downPayment - savings) / (monthlyIncome - monthlyExpenses - existingEMI));

  const tips: string[] = [];
  if (debtToIncome > 40) tips.push("Your total EMI exceeds 40% of income — try a longer loan term or smaller down payment.");
  if (savingsAfter < monthlyIncome * 0.1) tips.push("You'll have less than 10% of income left monthly. Build a 3-month emergency fund first.");
  if (savings < downPayment) tips.push(`You need ₹${(downPayment - savings).toLocaleString("en-IN")} more saved for the down payment.`);
  if (score >= 65) tips.push("Great financial position! Ensure you keep a 6-month emergency fund even after purchase.");
  if (category === "car") tips.push("Remember: car insurance, fuel, and maintenance add ~₹8,000–15,000/month on top of EMI.");

  return {
    canAfford: score >= 65,
    score,
    verdict,
    verdictText: verdictMap[verdict],
    monthlyIncome,
    monthlyExpenses,
    emi,
    savingsAfter,
    downPayment,
    loanAmount,
    totalCost,
    timeToAffordMonths: Math.max(0, timeToSave),
    tips,
  };
}
