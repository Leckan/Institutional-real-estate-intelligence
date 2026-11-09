export type PropertyType = 'Single Family' | 'Duplex' | 'Triplex' | 'Fourplex' | 'Small Multifamily (5-20 units)' | 'Mixed-Use Residential';

export type ConditionRating = 'Turnkey' | 'Minor Cosmetic' | 'Moderate Value-Add' | 'Substantial Rehabilitation' | 'Distressed';

export interface ComparableSale {
  id: string;
  address: string;
  salePrice: number;
  saleDate: string;
  distanceMiles: number;
  beds: number;
  baths: number;
  sqft: number;
  pricePerSqft: number;
  similarityScore: number;
}

export interface ZoningDetails {
  code: string;
  name: string;
  jurisdiction: string;
  permittedUses: string[];
  maxDensityUnitsPerAcre: number;
  maxBuildingHeightFt: number;
  maxFAR: number;
  maxLotCoveragePercent: number;
  aduPermitted: boolean;
  aduRules: string;
  todEligible: boolean;
  inclusionaryZoning: {
    required: boolean;
    setAsidePercent?: number;
    amiTargetPercent?: number;
  };
  affordableDensityBonusPercent: number;
  parkingMinimumPerUnit: number;
  verificationSource: string;
  lastVerifiedDate: string;
}

export interface FinancialAssumptions {
  purchasePrice: number;
  rehabCost: number;
  closingCostsPercent: number;
  downPaymentPercent: number;
  interestRatePercent: number;
  loanTermYears: number;
  grossMonthlyRent: number;
  otherMonthlyIncome: number;
  vacancyRatePercent: number;
  propertyManagementPercent: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  maintenanceReservePercent: number;
  utilitiesAnnual: number;
  annualRentGrowthPercent: number;
  annualAppreciationPercent: number;
  annualExpenseInflationPercent: number;
}

export interface PropertyFinancials {
  acquisitionCost: number;
  totalProjectInvestment: number;
  loanAmount: number;
  monthlyDebtService: number;
  annualGrossIncome: number;
  effectiveGrossIncome: number;
  annualOperatingExpenses: number;
  netOperatingIncome: number;
  annualDebtService: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  grossRentalYield: number;
  fiveYearIRR: number;
  tenYearIRR: number;
  breakEvenOccupancyPercent: number;
  dscr: number;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  msa: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  estimatedMarketValue: number;
  discountToMarketPercent: number;
  propertyType: PropertyType;
  units: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSizeSqft: number;
  yearBuilt: number;
  condition: ConditionRating;
  occupancyStatus: 'Vacant' | 'Tenant Occupied' | 'Partially Occupied';
  parcelNumber: string;
  images: string[];
  opportunityScore: number; // 0 - 100
  amiTargetPercent: number; // e.g. 60% AMI
  estimatedMonthlyRent: number;
  estimatedRehabCost: number;
  projectedROI: number;
  capRate: number;
  cashOnCash: number;
  zoning: ZoningDetails;
  financialAssumptions: FinancialAssumptions;
  comparables: ComparableSale[];
  tags: string[];
  summary: string;
  verifiedSource: string;
  lastUpdated: string;
  isSaved?: boolean;
}

export interface MarketMetrics {
  id: string;
  name: string; // e.g., "Baltimore, MD (Baltimore-Columbia-Towson MSA)"
  city: string;
  state: string;
  county: string;
  msa: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  opportunityScore: number; // 0 - 100
  affordabilityGapScore: number;
  predictedRoiPercent: number;
  medianSalePrice: number;
  pricePerSqft: number;
  medianHouseholdIncome: number;
  areaMedianIncome: number;
  medianMonthlyRent: number;
  hudFairMarketRent2Bed: number;
  costBurdenedHouseholdsPercent: number; // households spending >30% on housing
  housingSupplyGapUnits: number; // estimated affordable units needed
  averageCapRatePercent: number;
  grossRentalYieldPercent: number;
  historicalPriceGrowth1Yr: number;
  historicalPriceGrowth5Yr: number;
  predictedAppreciation1Yr: number;
  populationGrowthRatePercent: number;
  employmentGrowthRatePercent: number;
  daysOnMarket: number;
  housingInventoryMonths: number;
  zoningFriendlinessScore: number; // 0 - 100
  transitAccessScore: number;
  distressedPropertiesCount: number;
  activeOpportunityCount: number;
  topDevelopmentStrategy: string;
  aiMarketSummary: string;
  sources: {
    hud: string;
    census: string;
    fred: string;
    gis: string;
  };
  historicalTrend: {
    period: string;
    medianPrice: number;
    medianRent: number;
    salesVolume: number;
    inventory: number;
  }[];
  forecast: {
    horizon: string;
    predictedPrice: number;
    confidenceIntervalLow: number;
    confidenceIntervalHigh: number;
    predictedRent: number;
  }[];
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  marketOrProperty: string;
  type: 'hotspot' | 'price_drop' | 'zoning_incentive' | 'high_yield' | 'demand_surge';
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
  read: boolean;
  roi?: number;
  capRate?: number;
}

export interface InvestorProfile {
  name: string;
  firmName: string;
  role: string;
  budgetMin: number;
  budgetMax: number;
  targetCapRateMin: number;
  targetCashOnCashMin: number;
  preferredStrategies: string[];
  preferredMarkets: string[];
  targetAmiBand: string; // '30% AMI (Extremely Low)', '50% AMI (Very Low)', '60-80% AMI (Low)', 'Mixed-Income'
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  investmentHorizonYears: number;
}

export interface IndexWeights {
  affordabilityGap: number; // default 20
  financialReturn: number; // default 20
  marketGrowth: number; // default 15
  zoningFeasibility: number; // default 15
  propertyAffordability: number; // default 10
  rentalDemand: number; // default 10
  infrastructureTransit: number; // default 5
  riskMitigation: number; // default 5
}

export type AIAgentType = 
  | 'market_research'
  | 'property_discovery'
  | 'financial_analysis'
  | 'zoning_intelligence'
  | 'affordable_impact'
  | 'predictive_analytics'
  | 'investment_strategy';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'agent';
  agentName?: string;
  agentRole?: string;
  text: string;
  timestamp: string;
  structuredData?: {
    recommendations?: string[];
    riskFactors?: string[];
    financialHighlights?: { label: string; value: string }[];
    targetMarkets?: string[];
  };
}
