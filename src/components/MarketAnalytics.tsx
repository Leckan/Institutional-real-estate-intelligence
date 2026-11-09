import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Percent, 
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { MarketMetrics } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/financials';

interface MarketAnalyticsProps {
  markets: MarketMetrics[];
}

export const MarketAnalytics: React.FC<MarketAnalyticsProps> = ({ markets }) => {
  const [selectedMetroA, setSelectedMetroA] = useState<string>(markets[0]?.id || '');
  const [selectedMetroB, setSelectedMetroB] = useState<string>(markets[1]?.id || '');
  const [timeHorizon, setTimeHorizon] = useState<string>('5Y');

  const metroA = markets.find(m => m.id === selectedMetroA) || markets[0];
  const metroB = markets.find(m => m.id === selectedMetroB) || markets[1];

  // Merge historical trends for comparative chart
  const combinedHistoricalData = metroA.historicalTrend.map((item, idx) => {
    const itemB = metroB.historicalTrend[idx] || item;
    return {
      period: item.period,
      priceA: item.medianPrice,
      priceB: itemB.medianPrice,
      rentA: item.medianRent,
      rentB: itemB.medianRent,
      salesVolA: item.salesVolume,
      salesVolB: itemB.salesVolume,
    };
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Horizon Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Historical Market Analytics & Predictive Forecasts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare regional housing performance, rent trajectories, and FHFA price index momentum
          </p>
        </div>

        {/* Time Horizon Pills */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
          {['6M', '1Y', '3Y', '5Y', '10Y'].map((h) => (
            <button
              key={h}
              onClick={() => setTimeHorizon(h)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeHorizon === h 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Metro Comparator Selectors */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">Primary Metro:</span>
            <select
              value={selectedMetroA}
              onChange={(e) => setSelectedMetroA(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              {markets.map(m => (
                <option key={m.id} value={m.id}>{m.city}, {m.state}</option>
              ))}
            </select>
          </div>

          <span className="text-xs font-bold text-slate-400 font-mono">VS</span>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">Comparison Metro:</span>
            <select
              value={selectedMetroB}
              onChange={(e) => setSelectedMetroB(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              {markets.map(m => (
                <option key={m.id} value={m.id}>{m.city}, {m.state}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Comparison KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase">Median Acquisition Basis</span>
            <div className="flex justify-between font-mono font-bold">
              <span className="text-blue-600">{metroA.city}: {formatCurrency(metroA.medianSalePrice)}</span>
              <span className="text-purple-600">{metroB.city}: {formatCurrency(metroB.medianSalePrice)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase">Average Cap Rate</span>
            <div className="flex justify-between font-mono font-bold">
              <span className="text-blue-600">{metroA.city}: {formatPercent(metroA.averageCapRatePercent)}</span>
              <span className="text-purple-600">{metroB.city}: {formatPercent(metroB.averageCapRatePercent)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase">Gross Rental Yield</span>
            <div className="flex justify-between font-mono font-bold">
              <span className="text-blue-600">{metroA.city}: {formatPercent(metroA.grossRentalYieldPercent)}</span>
              <span className="text-purple-600">{metroB.city}: {formatPercent(metroB.grossRentalYieldPercent)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase">Supply Deficit Units</span>
            <div className="flex justify-between font-mono font-bold">
              <span className="text-blue-600">{metroA.city}: {formatNumber(metroA.housingSupplyGapUnits)}</span>
              <span className="text-purple-600">{metroB.city}: {formatNumber(metroB.housingSupplyGapUnits)}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Historical Median Sale Price Trend Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Median Sales Price Trajectory ({metroA.city} vs {metroB.city})
            </h2>
            <p className="text-xs text-slate-500">
              Historical FHFA House Price Index and transaction records
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderRadius: '8px', 
                  border: 'none', 
                  color: '#fff', 
                  fontSize: '12px' 
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="priceA" stroke="#2563EB" strokeWidth={2.5} name={`${metroA.city} Median Price`} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="priceB" stroke="#9333EA" strokeWidth={2.5} name={`${metroB.city} Median Price`} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Monthly Rent Comparison Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Monthly Rental Growth Trajectory
            </h2>
            <p className="text-xs text-slate-500">
              HUD Fair Market Rents (FMR) 2-bedroom benchmark progression
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={combinedHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderRadius: '8px', 
                  border: 'none', 
                  color: '#fff', 
                  fontSize: '12px' 
                }} 
              />
              <Legend />
              <Bar dataKey="rentA" fill="#3B82F6" name={`${metroA.city} Median Rent`} radius={[4, 4, 0, 0]} />
              <Bar dataKey="rentB" fill="#A855F7" name={`${metroB.city} Median Rent`} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Predictive Modeling Horizon Cards */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Machine Learning Price & Rent Forecasts ({metroA.city})
          </h2>
          <p className="text-xs text-slate-500">
            BigQuery statistical regression & machine learning projections with confidence intervals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metroA.forecast.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                {f.horizon} Horizon
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {formatCurrency(f.predictedPrice)}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Range: {formatCurrency(f.confidenceIntervalLow)} - {formatCurrency(f.confidenceIntervalHigh)}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs flex justify-between font-mono">
                <span className="text-slate-400">Projected Rent:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(f.predictedRent)}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
