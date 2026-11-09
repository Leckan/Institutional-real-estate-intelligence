import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Info,
  ChevronRight,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { MarketMetrics, IndexWeights } from '../types';
import { DEFAULT_INDEX_WEIGHTS } from '../data/mockData';
import { formatCurrency, formatPercent } from '../utils/financials';

interface AffordableHousingIndexProps {
  markets: MarketMetrics[];
  onSelectMarket: (market: MarketMetrics) => void;
}

export const AffordableHousingIndex: React.FC<AffordableHousingIndexProps> = ({
  markets,
  onSelectMarket,
}) => {
  const [weights, setWeights] = useState<IndexWeights>({ ...DEFAULT_INDEX_WEIGHTS });

  // Recalculate composite scores dynamically based on the customized weights
  const scoredMarkets = useMemo(() => {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

    return markets.map((m) => {
      // Dimension sub-scores (normalized 0 - 100)
      const subScores = {
        affordabilityGap: m.affordabilityGapScore,
        financialReturn: Math.min(100, (m.averageCapRatePercent / 12) * 100),
        marketGrowth: Math.min(100, (m.predictedRoiPercent / 22) * 100),
        zoningFeasibility: m.zoningFriendlinessScore,
        propertyAffordability: Math.min(100, (1 - m.medianSalePrice / 400000) * 100 + 40),
        rentalDemand: Math.min(100, (m.costBurdenedHouseholdsPercent / 55) * 100),
        infrastructureTransit: m.transitAccessScore,
        riskMitigation: 85,
      };

      // Weighted sum
      const weightedSum =
        subScores.affordabilityGap * weights.affordabilityGap +
        subScores.financialReturn * weights.financialReturn +
        subScores.marketGrowth * weights.marketGrowth +
        subScores.zoningFeasibility * weights.zoningFeasibility +
        subScores.propertyAffordability * weights.propertyAffordability +
        subScores.rentalDemand * weights.rentalDemand +
        subScores.infrastructureTransit * weights.infrastructureTransit +
        subScores.riskMitigation * weights.riskMitigation;

      const dynamicScore = Math.round(weightedSum / (totalWeight || 1));

      return {
        ...m,
        dynamicScore: Math.min(99, Math.max(50, dynamicScore)),
        subScores,
      };
    }).sort((a, b) => b.dynamicScore - a.dynamicScore);
  }, [markets, weights]);

  const handleWeightChange = (key: keyof IndexWeights, val: number) => {
    setWeights((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetWeights = () => {
    setWeights({ ...DEFAULT_INDEX_WEIGHTS });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Affordable Housing Opportunity Index (AHOI)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Proprietary scoring engine balancing institutional investor yields with community workforce housing impact
          </p>
        </div>

        <button
          onClick={handleResetWeights}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Weights</span>
        </button>
      </div>

      {/* Interactive Weight Customizer Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Institutional Custom Weight Engine
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Adjust sliders to personalize investment priority algorithms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Affordable Demand Gap</span>
              <span className="font-mono text-blue-600 font-bold">{weights.affordabilityGap}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={weights.affordabilityGap}
              onChange={(e) => handleWeightChange('affordabilityGap', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Financial Returns (Cap Rate)</span>
              <span className="font-mono text-blue-600 font-bold">{weights.financialReturn}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={weights.financialReturn}
              onChange={(e) => handleWeightChange('financialReturn', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Market Appreciation / ROI</span>
              <span className="font-mono text-blue-600 font-bold">{weights.marketGrowth}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={weights.marketGrowth}
              onChange={(e) => handleWeightChange('marketGrowth', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Zoning & ADU Leeway</span>
              <span className="font-mono text-blue-600 font-bold">{weights.zoningFeasibility}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={weights.zoningFeasibility}
              onChange={(e) => handleWeightChange('zoningFeasibility', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Basis Affordability</span>
              <span className="font-mono text-blue-600 font-bold">{weights.propertyAffordability}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={weights.propertyAffordability}
              onChange={(e) => handleWeightChange('propertyAffordability', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Rental Demand Strength</span>
              <span className="font-mono text-blue-600 font-bold">{weights.rentalDemand}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={weights.rentalDemand}
              onChange={(e) => handleWeightChange('rentalDemand', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Transit & Infrastructure</span>
              <span className="font-mono text-blue-600 font-bold">{weights.infrastructureTransit}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={weights.infrastructureTransit}
              onChange={(e) => handleWeightChange('infrastructureTransit', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Risk Mitigation Score</span>
              <span className="font-mono text-blue-600 font-bold">{weights.riskMitigation}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={weights.riskMitigation}
              onChange={(e) => handleWeightChange('riskMitigation', Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

        </div>
      </div>

      {/* Dynamic Ranked Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Real-Time Recalculated Regional Rankings
        </h2>

        <div className="space-y-3">
          {scoredMarkets.map((m, rank) => (
            <div
              key={m.id}
              onClick={() => onSelectMarket(m)}
              className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer shadow-sm transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                  rank === 0 ? 'bg-amber-500 text-white' :
                  rank === 1 ? 'bg-slate-400 text-white' :
                  rank === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  #{rank + 1}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {m.city}, {m.state}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {m.msa} · Strategy: <span className="font-medium text-slate-700 dark:text-slate-300">{m.topDevelopmentStrategy}</span>
                  </p>
                </div>
              </div>

              {/* Subscores Bar Strip */}
              <div className="flex items-center gap-6 text-xs font-mono">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Cap Rate</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatPercent(m.averageCapRatePercent)}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Yield</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{formatPercent(m.grossRentalYieldPercent)}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Basis</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(m.medianSalePrice)}</span>
                </div>
                
                {/* Composite Score Pill */}
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">AHOI Score</span>
                  <span className="text-base font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900/60">
                    {m.dynamicScore}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
