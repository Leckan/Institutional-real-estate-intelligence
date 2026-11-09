import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  Percent, 
  DollarSign, 
  Users, 
  MapPin, 
  ArrowDownRight, 
  BadgePercent,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { MarketMetrics, Property, AlertItem } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/financials';

interface OverviewDashboardProps {
  markets: MarketMetrics[];
  properties: Property[];
  alerts: AlertItem[];
  onSelectMarket: (market: MarketMetrics) => void;
  onSelectProperty: (property: Property) => void;
  onNavigate: (tab: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  markets,
  properties,
  alerts,
  onSelectMarket,
  onSelectProperty,
  onNavigate,
}) => {
  // Aggregate KPI calculations
  const totalOpportunities = markets.reduce((acc, m) => acc + m.activeOpportunityCount, 0);
  const avgROI = markets.reduce((acc, m) => acc + m.predictedRoiPercent, 0) / markets.length;
  const avgPrice = markets.reduce((acc, m) => acc + m.medianSalePrice, 0) / markets.length;
  const totalSupplyGap = markets.reduce((acc, m) => acc + m.housingSupplyGapUnits, 0);
  const avgRentalYield = markets.reduce((acc, m) => acc + m.grossRentalYieldPercent, 0) / markets.length;
  const avgCapRate = markets.reduce((acc, m) => acc + m.averageCapRatePercent, 0) / markets.length;
  const belowMarketCount = properties.filter(p => p.discountToMarketPercent > 15).length;

  // Chart data: Market opportunity comparison
  const marketChartData = markets.map(m => ({
    city: m.city,
    opportunityScore: m.opportunityScore,
    capRate: m.averageCapRatePercent,
    roi: m.predictedRoiPercent,
    supplyGapK: Math.round(m.housingSupplyGapUnits / 1000),
    medianPriceK: Math.round(m.medianSalePrice / 1000),
  }));

  // Trend data across quarters
  const trendData = [
    { quarter: 'Q1 2024', identifiedDeals: 142, avgYield: 12.8, capitalDeployedM: 4.8 },
    { quarter: 'Q2 2024', identifiedDeals: 198, avgYield: 13.4, capitalDeployedM: 7.2 },
    { quarter: 'Q3 2024', identifiedDeals: 245, avgYield: 13.9, capitalDeployedM: 9.6 },
    { quarter: 'Q4 2024', identifiedDeals: 289, avgYield: 14.1, capitalDeployedM: 11.4 },
    { quarter: 'Q1 2025', identifiedDeals: 320, avgYield: 14.5, capitalDeployedM: 13.8 },
    { quarter: 'Q2 2025', identifiedDeals: 358, avgYield: 14.8, capitalDeployedM: 15.2 },
    { quarter: 'Q3 2025', identifiedDeals: 395, avgYield: 15.1, capitalDeployedM: 17.9 },
    { quarter: 'Q4 2025', identifiedDeals: 420, avgYield: 15.4, capitalDeployedM: 20.4 },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome & Executive Briefing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Institutional Deal Screening Active</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-xs text-slate-500">Updated from HUD & Census GIS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Affordable Housing Investment Intelligence
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Real-time multi-metro deal pipeline tracking high cash-flow residential and small multifamily assets situated in high-demand, workforce-constrained geographic corridors.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('explorer')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Explore 370+ Deals
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            Open Market Heat Map
          </button>
        </div>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Opportunities</span>
            <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {totalOpportunities}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.8% vs last month</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Emerging Hotspots</span>
            <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            6 Metros
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <span>Cleveland, Baltimore leading</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Potential ROI</span>
            <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {formatPercent(avgROI)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1.2% cap rate expansion</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Acquisition Price</span>
            <div className="p-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {formatCurrency(avgPrice)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>$135k - $345k range</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Affordable Demand Deficit</span>
            <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {formatNumber(totalSupplyGap)} units
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
            <span>Severe workforce shortage</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Tracked Submarkets</span>
            <div className="p-1.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            18 MSAs
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Tier 1 & Tier 2 focus</span>
          </div>
        </div>

        {/* KPI 7 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Below Replacement Value</span>
            <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            68% of Pipeline
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Avg discount 22.4%</span>
          </div>
        </div>

        {/* KPI 8 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Gross Yield</span>
            <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <BadgePercent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {formatPercent(avgRentalYield)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
            <span>Average Cap Rate: {formatPercent(avgCapRate)}</span>
          </div>
        </div>

      </div>

      {/* Primary Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Deal Pipeline & Yield Evolution (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Identified Opportunity Growth & Capital Absorption
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quarterly trajectory of screened affordable housing assets and stabilized yields
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block"></span>
                <span>Active Deals</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                <span>Gross Yield %</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="dealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="quarter" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[10, 18]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderRadius: '8px', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '12px' 
                  }} 
                />
                <Area yAxisId="left" type="monotone" dataKey="identifiedDeals" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#dealGradient)" name="Screened Deals" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Regional Cap Rate by MSA */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Regional Cap Rates by Metro
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Underwritten market capitalization benchmarks
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 14]} unit="%" tickLine={false} />
                <YAxis type="category" dataKey="city" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderRadius: '8px', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="capRate" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Cap Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Emerging Hotspots & Recent Pipeline Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hotspots List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Emerging Affordable Housing Investment Hotspots
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by AI Housing Opportunity Index combining demand deficit, zoning leeway, and cash flow
              </p>
            </div>
            <button
              onClick={() => onNavigate('index')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View Full Index</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {markets.slice(0, 4).map((m) => (
              <div 
                key={m.id}
                onClick={() => {
                  onSelectMarket(m);
                  onNavigate('map');
                }}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer shadow-sm group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {m.city}, {m.state}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      {m.msa}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                      Score: {m.opportunityScore}/100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-slate-100 dark:border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Median Price</span>
                    <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                      {formatCurrency(m.medianSalePrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Cap Rate</span>
                    <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {formatPercent(m.averageCapRatePercent)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Supply Gap</span>
                    <span className="text-xs font-bold font-mono text-rose-600 dark:text-rose-400">
                      {Math.round(m.housingSupplyGapUnits / 1000)}k units
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-[230px]">
                    {m.topDevelopmentStrategy}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Explore
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Intelligence & Alerts Feed (1 col) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Live Opportunity Feed
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Real-Time</span>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div 
                key={alert.id}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs truncate max-w-[190px]">
                    {alert.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {alert.description}
                </p>
                {alert.roi && (
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                    <span>Projected ROI: <strong className="text-emerald-600 dark:text-emerald-400">{alert.roi}%</strong></span>
                    {alert.capRate && <span>Cap Rate: <strong className="text-blue-600 dark:text-blue-400">{alert.capRate}%</strong></span>}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('advisor')}
            className="w-full py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Multi-Agent AI Advisor</span>
          </button>
        </div>

      </div>

      {/* Featured Deals Spotlight Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Screened Acquisition Opportunities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified residential & small multifamily properties with underwritten cash flow and zoning upside
            </p>
          </div>
          <button
            onClick={() => onNavigate('explorer')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Properties</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {properties.slice(0, 3).map((prop) => (
            <div
              key={prop.id}
              onClick={() => {
                onSelectProperty(prop);
                onNavigate('property');
              }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                    {prop.propertyType} · {prop.units} Units
                  </div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold font-mono">
                    Score: {prop.opportunityScore}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-semibold">
                    {prop.discountToMarketPercent}% Below Market
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {prop.address}, {prop.city}, {prop.state} {prop.zip}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 font-sans uppercase block">Price</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {formatCurrency(prop.price)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-sans uppercase block">Cap Rate</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {formatPercent(prop.capRate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-sans uppercase block">Cash-on-Cash</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {formatPercent(prop.cashOnCash)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px]">Zoning: <strong className="text-slate-700 dark:text-slate-300">{prop.zoning.code}</strong> (ADU: {prop.zoning.aduPermitted ? 'Yes' : 'No'})</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                  Analyze
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
