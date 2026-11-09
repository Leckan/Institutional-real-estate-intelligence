import { FinancialAssumptions, PropertyFinancials } from '../types';

export function calculateFinancials(
  assumptions: FinancialAssumptions,
  scenario: 'base' | 'best' | 'worst' = 'base'
): PropertyFinancials {
  // Scenario adjustments
  let rentMultiplier = 1;
  let expenseMultiplier = 1;
  let vacancyDelta = 0;
  let appreciationDelta = 0;

  if (scenario === 'best') {
    rentMultiplier = 1.08;
    expenseMultiplier = 0.95;
    vacancyDelta = -2; // e.g. 5% down to 3%
    appreciationDelta = 1.5;
  } else if (scenario === 'worst') {
    rentMultiplier = 0.92;
    expenseMultiplier = 1.08;
    vacancyDelta = 3; // e.g. 5% up to 8%
    appreciationDelta = -1.5;
  }

  const purchasePrice = assumptions.purchasePrice;
  const rehabCost = assumptions.rehabCost;
  const closingCosts = (purchasePrice * assumptions.closingCostsPercent) / 100;
  const acquisitionCost = purchasePrice + closingCosts;
  const totalProjectInvestment = acquisitionCost + rehabCost;

  // Financing
  const downPayment = (purchasePrice * assumptions.downPaymentPercent) / 100;
  const loanAmount = purchasePrice - downPayment;
  const initialCashInvested = downPayment + closingCosts + rehabCost;

  // Monthly mortgage calculation (standard amortizing fixed rate)
  const monthlyRate = (assumptions.interestRatePercent / 100) / 12;
  const totalPayments = assumptions.loanTermYears * 12;
  let monthlyDebtService = 0;
  if (monthlyRate > 0 && totalPayments > 0 && loanAmount > 0) {
    monthlyDebtService =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  const annualDebtService = monthlyDebtService * 12;

  // Income
  const adjustedGrossMonthlyRent = assumptions.grossMonthlyRent * rentMultiplier;
  const annualGrossIncome = (adjustedGrossMonthlyRent + assumptions.otherMonthlyIncome) * 12;
  const adjustedVacancyRate = Math.max(1, assumptions.vacancyRatePercent + vacancyDelta);
  const vacancyLoss = (annualGrossIncome * adjustedVacancyRate) / 100;
  const effectiveGrossIncome = annualGrossIncome - vacancyLoss;

  // Operating Expenses
  const propMgmt = (effectiveGrossIncome * assumptions.propertyManagementPercent) / 100;
  const maintenance = (effectiveGrossIncome * assumptions.maintenanceReservePercent) / 100;
  const adjustedTaxes = assumptions.propertyTaxAnnual * expenseMultiplier;
  const adjustedInsurance = assumptions.insuranceAnnual * expenseMultiplier;
  const adjustedUtilities = assumptions.utilitiesAnnual * expenseMultiplier;

  const annualOperatingExpenses =
    propMgmt + maintenance + adjustedTaxes + adjustedInsurance + adjustedUtilities;

  // NOI
  const netOperatingIncome = effectiveGrossIncome - annualOperatingExpenses;

  // Cash Flow
  const annualCashFlow = netOperatingIncome - annualDebtService;

  // Returns
  const capRate = totalProjectInvestment > 0 ? (netOperatingIncome / totalProjectInvestment) * 100 : 0;
  const cashOnCashReturn =
    initialCashInvested > 0 ? (annualCashFlow / initialCashInvested) * 100 : 0;
  const grossRentalYield =
    totalProjectInvestment > 0 ? (annualGrossIncome / totalProjectInvestment) * 100 : 0;

  // Break-even occupancy
  const breakEvenOccupancyPercent =
    annualGrossIncome > 0
      ? ((annualOperatingExpenses + annualDebtService) / annualGrossIncome) * 100
      : 100;

  // DSCR (Debt Service Coverage Ratio)
  const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 999;

  // Multi-year IRR approximations based on cash flow + appreciation + debt paydown
  const appRate = Math.max(0.5, (assumptions.annualAppreciationPercent + appreciationDelta) / 100);
  
  // Estimate 5-year IRR
  const fiveYearFutureValue = totalProjectInvestment * Math.pow(1 + appRate, 5);
  // Estimate loan balance after 5 years (rule of thumb ~90% remaining)
  const loanBalance5Yr = loanAmount * 0.90;
  const terminalEquity5Yr = Math.max(0, fiveYearFutureValue - loanBalance5Yr);
  const total5YrReturns = (annualCashFlow * 5) + (terminalEquity5Yr - initialCashInvested);
  const fiveYearIRR = initialCashInvested > 0 ? Math.min(45, Math.max(-10, ((total5YrReturns / 5) / initialCashInvested) * 100 + (appRate * 100))) : 0;

  // Estimate 10-year IRR
  const tenYearFutureValue = totalProjectInvestment * Math.pow(1 + appRate, 10);
  const loanBalance10Yr = loanAmount * 0.76;
  const terminalEquity10Yr = Math.max(0, tenYearFutureValue - loanBalance10Yr);
  const total10YrReturns = (annualCashFlow * 10) + (terminalEquity10Yr - initialCashInvested);
  const tenYearIRR = initialCashInvested > 0 ? Math.min(50, Math.max(-5, ((total10YrReturns / 10) / initialCashInvested) * 100 + (appRate * 100 * 0.9))) : 0;

  return {
    acquisitionCost,
    totalProjectInvestment,
    loanAmount,
    monthlyDebtService,
    annualGrossIncome,
    effectiveGrossIncome,
    annualOperatingExpenses,
    netOperatingIncome,
    annualDebtService,
    annualCashFlow,
    capRate,
    cashOnCashReturn,
    grossRentalYield,
    fiveYearIRR,
    tenYearIRR,
    breakEvenOccupancyPercent,
    dscr,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
