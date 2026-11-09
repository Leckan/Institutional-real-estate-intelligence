import React, { useState } from 'react';
import { 
  FileDown, 
  Printer, 
  FileText, 
  Database, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Compass,
  DollarSign
} from 'lucide-react';
import { Property, MarketMetrics, InvestorProfile } from '../types';
import { formatCurrency, formatPercent } from '../utils/financials';

interface ReportsExportsProps {
  markets: MarketMetrics[];
  properties: Property[];
  investorProfile: InvestorProfile;
}

export const ReportsExports: React.FC<ReportsExportsProps> = ({
  markets,
  properties,
  investorProfile,
}) => {
  const [selectedReportType, setSelectedReportType] = useState<string>('committee_memo');
  const [selectedMarketId, setSelectedMarketId] = useState<string>(markets[0]?.id || '');
  const [includeAIThesis, setIncludeAIThesis] = useState<boolean>(true);
  const [includeZoningCheck, setIncludeZoningCheck] = useState<boolean>(true);

  const activeMarket = markets.find(m => m.id === selectedMarketId) || markets[0];
  const marketProps = properties.filter(p => p.city.toLowerCase() === activeMarket.city.toLowerCase());

  // Real CSV export
  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Address", "City", "State", "Price", "CapRate", "CashOnCash", "Units", "ZoningCode", "AHOIScore"];
    const rows = properties.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.address.replace(/"/g, '""')}"`,
      p.city,
      p.state,
      p.price,
      p.capRate,
      p.cashOnCash,
      p.units,
      p.zoning.code,
      p.opportunityScore
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ai_housing_pipeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real JSON export
  const handleExportJSON = () => {
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      platform: "AI Housing Opportunity Engine",
      investorProfile,
      activeMarket,
      properties: properties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        capRate: p.capRate,
        cashOnCash: p.cashOnCash,
        zoning: p.zoning,
        coordinates: p.coordinates
      }))
    };

    const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `housing_opportunity_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real GeoJSON export
  const handleExportGeoJSON = () => {
    const geoJSON = {
      type: "FeatureCollection",
      features: properties.map(p => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [p.coordinates.lng, p.coordinates.lat]
        },
        properties: {
          title: p.title,
          address: p.address,
          city: p.city,
          state: p.state,
          price: p.price,
          capRate: p.capRate,
          score: p.opportunityScore,
          zoning: p.zoning.code
        }
      }))
    };

    const geoString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJSON, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", geoString);
    link.setAttribute("download", `housing_opportunities_${new Date().toISOString().slice(0, 10)}.geojson`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Export Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Institutional Reports & Data Exports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate printable investment committee memorandums, raw CSV datasets, and GIS GeoJSON packages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handleExportGeoJSON}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>GeoJSON</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Database className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF Memo</span>
          </button>
        </div>
      </div>

      {/* Report Customizer Strip */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="font-bold text-slate-500 uppercase">Target Metro:</span>
          <select
            value={selectedMarketId}
            onChange={(e) => setSelectedMarketId(e.target.value)}
            className="px-3 py-1.5 font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
          >
            {markets.map(m => (
              <option key={m.id} value={m.id}>{m.city}, {m.state}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAIThesis}
              onChange={(e) => setIncludeAIThesis(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Include AI Investment Thesis</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeZoningCheck}
              onChange={(e) => setIncludeZoningCheck(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Include Zoning Feasibility</span>
          </label>
        </div>
      </div>

      {/* Printable Institutional Investment Committee Memorandum Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-8 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        
        {/* Memo Header */}
        <div className="border-b-2 border-slate-900 dark:border-white pb-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>MEMORANDUM // INVESTMENT COMMITTEE</span>
            <span>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Affordable Housing Acquisition Strategy & Regional Allocation Memo
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Prepared For</span>
              <strong className="text-slate-900 dark:text-white">{investorProfile.firmName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Underwritten By</span>
              <strong className="text-slate-900 dark:text-white">{investorProfile.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Target Region</span>
              <strong className="text-blue-600">{activeMarket.city}, {activeMarket.state}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Opportunity Score</span>
              <strong className="text-emerald-600 font-mono">{activeMarket.opportunityScore}/100</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Thesis */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
            01. Executive Thesis & Capital Allocation
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            The Investment Team recommends deploying capital into workforce housing assets within the <strong>{activeMarket.name}</strong> corridor. The target submarket exhibits an acute workforce supply deficit of <strong>{activeMarket.housingSupplyGapUnits.toLocaleString()} units</strong> with <strong>{activeMarket.costBurdenedHouseholdsPercent}%</strong> of renter households classified as rent-burdened under HUD parameters. Current median acquisition basis (${activeMarket.medianSalePrice.toLocaleString()}) reflects a substantial discount to current construction replacement cost.
          </p>
        </div>

        {/* Section 2: Core Financial Benchmarks */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
            02. Underwritten Return Thresholds
          </h3>
          <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Target Cap Rate</span>
              <span className="text-base font-bold text-emerald-600">{formatPercent(activeMarket.averageCapRatePercent)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Gross Rental Yield</span>
              <span className="text-base font-bold text-blue-600">{formatPercent(activeMarket.grossRentalYieldPercent)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Median FMR 2-Bed</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(activeMarket.hudFairMarketRent2Bed)}/mo</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans uppercase block">1-Yr Proj. Appreciation</span>
              <span className="text-base font-bold text-purple-600">+{activeMarket.predictedAppreciation1Yr}%</span>
            </div>
          </div>
        </div>

        {/* Section 3: AI Strategic Intelligence */}
        {includeAIThesis && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
              03. AI Multi-Agent Advisory Synthesis
            </h3>
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <p>{activeMarket.aiMarketSummary}</p>
              <div className="text-[11px] text-slate-500">
                <strong>Recommended Strategy:</strong> {activeMarket.topDevelopmentStrategy}
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Screened Acquisition Targets */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
            04. Screened Acquisition Opportunities ({activeMarket.city})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2 px-3">Asset</th>
                  <th className="py-2 px-3 text-right">Price</th>
                  <th className="py-2 px-3 text-right">Cap Rate</th>
                  <th className="py-2 px-3 text-right">Cash-on-Cash</th>
                  <th className="py-2 px-3">Zoning</th>
                  <th className="py-2 px-3 text-center">AHOI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {marketProps.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">{p.title}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">{formatCurrency(p.price)}</td>
                    <td className="py-2 px-3 text-right font-mono text-emerald-600 font-bold">{formatPercent(p.capRate)}</td>
                    <td className="py-2 px-3 text-right font-mono text-blue-600 font-bold">{formatPercent(p.cashOnCash)}</td>
                    <td className="py-2 px-3 font-mono">{p.zoning.code}</td>
                    <td className="py-2 px-3 text-center font-mono font-bold text-blue-600">{p.opportunityScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Public Data Attribution & Verification */}
        <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4 text-[11px] text-slate-400">
          <span className="font-bold text-slate-500 uppercase block">Data Attribution & Traceability:</span>
          <p>
            Public datasets ingested: {activeMarket.sources.hud} · {activeMarket.sources.census} · {activeMarket.sources.fred} · {activeMarket.sources.gis}.
          </p>
        </div>

      </div>

    </div>
  );
};
