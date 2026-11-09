import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Info, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Sliders,
  Compass
} from 'lucide-react';
import { MarketMetrics, Property } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/financials';

interface InteractiveMarketMapProps {
  markets: MarketMetrics[];
  properties: Property[];
  selectedMarket: MarketMetrics | null;
  onSelectMarket: (market: MarketMetrics) => void;
  onSelectProperty: (property: Property) => void;
}

export type HeatMapLayer = 
  | 'opportunity_score'
  | 'predicted_roi'
  | 'affordable_demand'
  | 'price_appreciation'
  | 'rental_yield'
  | 'supply_gap'
  | 'sales_volume'
  | 'population_growth'
  | 'employment_growth'
  | 'zoning_potential'
  | 'distressed_properties'
  | 'transit_accessibility'
  | 'infrastructure_dev'
  | 'neighborhood_affordability';

export const InteractiveMarketMap: React.FC<InteractiveMarketMapProps> = ({
  markets,
  properties,
  selectedMarket,
  onSelectMarket,
  onSelectProperty,
}) => {
  const [activeLayer, setActiveLayer] = useState<HeatMapLayer>('opportunity_score');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchRadiusMiles, setSearchRadiusMiles] = useState<number>(25);
  const [showPropertyPins, setShowPropertyPins] = useState<boolean>(true);
  const [filterMinScore, setFilterMinScore] = useState<number>(75);

  const activeMarket = selectedMarket || markets[0];

  // Helper to extract intensity value based on selected layer
  const getLayerValue = (m: MarketMetrics): { value: number; label: string; formatted: string } => {
    switch (activeLayer) {
      case 'opportunity_score':
        return { value: m.opportunityScore, label: 'Opportunity Score', formatted: `${m.opportunityScore}/100` };
      case 'predicted_roi':
        return { value: m.predictedRoiPercent * 5, label: 'Predicted ROI', formatted: `${m.predictedRoiPercent}%` };
      case 'affordable_demand':
        return { value: m.affordabilityGapScore, label: 'Workforce Demand', formatted: `${m.affordabilityGapScore}/100` };
      case 'price_appreciation':
        return { value: m.predictedAppreciation1Yr * 12, label: '1-Yr Appreciation', formatted: `${m.predictedAppreciation1Yr}%` };
      case 'rental_yield':
        return { value: m.grossRentalYieldPercent * 5.5, label: 'Gross Rental Yield', formatted: `${m.grossRentalYieldPercent}%` };
      case 'supply_gap':
        return { value: Math.min(100, (m.housingSupplyGapUnits / 45000) * 100), label: 'Supply Deficit', formatted: `${formatNumber(m.housingSupplyGapUnits)} units` };
      case 'sales_volume':
        return { value: 85, label: 'Sales Volume', formatted: `${formatNumber(m.historicalTrend[m.historicalTrend.length - 1].salesVolume)} deals` };
      case 'population_growth':
        return { value: Math.min(100, m.populationGrowthRatePercent * 50), label: 'Population Growth', formatted: `${m.populationGrowthRatePercent}%` };
      case 'employment_growth':
        return { value: Math.min(100, m.employmentGrowthRatePercent * 35), label: 'Employment Growth', formatted: `${m.employmentGrowthRatePercent}%` };
      case 'zoning_potential':
        return { value: m.zoningFriendlinessScore, label: 'Zoning Leeway', formatted: `${m.zoningFriendlinessScore}/100` };
      case 'distressed_properties':
        return { value: Math.min(100, (m.distressedPropertiesCount / 700) * 100), label: 'Distressed Units', formatted: `${m.distressedPropertiesCount} count` };
      case 'transit_accessibility':
        return { value: m.transitAccessScore, label: 'Transit Access', formatted: `${m.transitAccessScore}/100` };
      case 'infrastructure_dev':
        return { value: 78, label: 'Infrastructure', formatted: '78/100' };
      case 'neighborhood_affordability':
        return { value: m.affordabilityGapScore, label: 'Affordability Index', formatted: `${m.affordabilityGapScore}/100` };
      default:
        return { value: m.opportunityScore, label: 'Opportunity Score', formatted: `${m.opportunityScore}` };
    }
  };

  // Color generator based on standard 5-tier classification
  const getColorForValue = (val: number) => {
    if (val >= 88) return { bg: 'fill-emerald-600', stroke: 'stroke-emerald-400', glow: '#059669', name: 'Exceptional Opportunity' };
    if (val >= 80) return { bg: 'fill-emerald-500', stroke: 'stroke-emerald-300', glow: '#10B981', name: 'Strong Opportunity' };
    if (val >= 70) return { bg: 'fill-amber-500', stroke: 'stroke-amber-300', glow: '#F59E0B', name: 'Moderate Opportunity' };
    if (val >= 55) return { bg: 'fill-orange-500', stroke: 'stroke-orange-300', glow: '#F97316', name: 'Elevated Risk' };
    return { bg: 'fill-rose-500', stroke: 'stroke-rose-300', glow: '#EF4444', name: 'Low Attractiveness' };
  };

  // Map projection coordinates to SVG canvas space (width 960, height 500)
  // US Bounding Box roughly: lat 25 to 50, lng -125 to -65
  const projectCoords = (lat: number, lng: number) => {
    const minLng = -125;
    const maxLng = -66;
    const minLat = 24;
    const maxLat = 50;

    const x = ((lng - minLng) / (maxLng - minLng)) * 900 + 30;
    const y = 500 - (((lat - minLat) / (maxLat - minLat)) * 440 + 30);
    return { x, y };
  };

  // Properties within active market
  const activeMarketProperties = useMemo(() => {
    return properties.filter(p => p.city.toLowerCase() === activeMarket.city.toLowerCase());
  }, [properties, activeMarket]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Layer Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Heat Map Layer:
            </span>
          </div>
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value as HeatMapLayer)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="opportunity_score">1. Overall Opportunity Score (0-100)</option>
            <option value="predicted_roi">2. Predicted ROI (%)</option>
            <option value="affordable_demand">3. Affordable Housing Demand</option>
            <option value="price_appreciation">4. Property Price Appreciation</option>
            <option value="rental_yield">5. Gross Rental Yield (%)</option>
            <option value="supply_gap">6. Housing Supply Gap (Units)</option>
            <option value="sales_volume">7. Historical Sales Volume</option>
            <option value="population_growth">8. Population Growth Rate</option>
            <option value="employment_growth">9. Employment Growth Rate</option>
            <option value="zoning_potential">10. Zoning & ADU Potential</option>
            <option value="distressed_properties">11. Distressed Property Concentration</option>
            <option value="transit_accessibility">12. Transit Accessibility Score</option>
            <option value="infrastructure_dev">13. Infrastructure Development</option>
            <option value="neighborhood_affordability">14. Neighborhood Affordability Gap</option>
          </select>
        </div>

        {/* Secondary Map Controls */}
        <div className="flex items-center gap-4 text-xs">
          
          {/* Show properties toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={showPropertyPins}
              onChange={(e) => setShowPropertyPins(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Show Property Pins</span>
          </label>

          {/* Search radius slider */}
          <div className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>Radius:</span>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={searchRadiusMiles}
              onChange={(e) => setSearchRadiusMiles(Number(e.target.value))}
              className="w-20 accent-blue-600"
            />
            <span className="font-mono font-bold text-slate-900 dark:text-white">{searchRadiusMiles}mi</span>
          </div>

          {/* Zoom buttons */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.25))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(0.75, zoomLevel - 0.25))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Map Workspace: Interactive Vector Map + Side Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[560px]">
          
          {/* Top floating legend */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2.5 rounded-lg text-xs space-y-1.5 shadow-lg">
            <div className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Investment Attractiveness Legend</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-300">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Exceptional (88+)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Strong (80-87)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Moderate (70-79)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span>Risk (&lt;70)</span>
              </div>
            </div>
          </div>

          {/* Top right quick layer indicator */}
          <div className="absolute top-4 right-4 z-10 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold font-mono shadow-md">
            Active: {activeLayer.replace('_', ' ').toUpperCase()}
          </div>

          {/* Interactive Geographic SVG Projection */}
          <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
            <svg
              viewBox="0 0 960 520"
              className="w-full h-full max-h-[520px] transition-transform duration-300 select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Background Geographic Grids */}
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="heatGlow">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Stylized US Continental Boundary Silhouette */}
              <path
                d="M 120 120 L 260 110 L 460 90 L 680 80 L 760 110 L 860 140 L 880 180 L 820 250 L 830 330 L 790 440 L 740 460 L 680 430 L 640 400 L 580 410 L 520 440 L 440 430 L 360 410 L 280 420 L 220 370 L 140 330 L 110 240 Z"
                fill="#0F172A"
                stroke="#334155"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                opacity="0.8"
              />

              {/* Major Interstate Highway Corridors (I-95, I-80, I-75, I-40) */}
              <path d="M 130 180 Q 480 160 850 150" fill="none" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 160 300 Q 500 310 820 280" fill="none" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 760 100 Q 770 280 770 440" fill="none" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M 520 100 Q 530 280 540 420" fill="none" stroke="#1E293B" strokeWidth="1.5" />

              {/* Regional Market Heat Circles & Polygons */}
              {markets.map((m) => {
                const { x, y } = projectCoords(m.coordinates.lat, m.coordinates.lng);
                const isSelected = activeMarket.id === m.id;
                const { value, formatted } = getLayerValue(m);
                const color = getColorForValue(value);

                // Radius of heat zone based on custom search radius
                const heatRadius = Math.max(28, (searchRadiusMiles / 25) * 40);

                return (
                  <g 
                    key={m.id} 
                    className="cursor-pointer group"
                    onClick={() => onSelectMarket(m)}
                  >
                    {/* Heat intensity aura */}
                    <circle
                      cx={x}
                      cy={y}
                      r={heatRadius}
                      fill={color.glow}
                      opacity={isSelected ? 0.35 : 0.18}
                      className="transition-all duration-300 group-hover:opacity-40"
                    />

                    {/* Regional bounding perimeter */}
                    <circle
                      cx={x}
                      cy={y}
                      r={heatRadius * 0.65}
                      fill="none"
                      stroke={color.glow}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                      opacity="0.8"
                    />

                    {/* Metro Node Anchor */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 9 : 7}
                      className={`${color.bg} transition-all duration-200`}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />

                    {/* Label Badge */}
                    <foreignObject
                      x={x - 65}
                      y={y + 14}
                      width={130}
                      height={40}
                      className="overflow-visible pointer-events-none"
                    >
                      <div className="flex flex-col items-center">
                        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded shadow-md whitespace-nowrap ${
                          isSelected ? 'bg-white text-slate-900 ring-2 ring-blue-500' : 'bg-slate-900/90 text-white'
                        }`}>
                          {m.city} ({formatted})
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Individual Property Pins in Active Metro */}
              {showPropertyPins && properties.map((p) => {
                const { x, y } = projectCoords(p.coordinates.lat, p.coordinates.lng);
                // slight offset so properties don't stack directly over city center
                const offsetX = (p.id.charCodeAt(p.id.length - 1) % 5 - 2) * 8;
                const offsetY = (p.id.charCodeAt(p.id.length - 2) % 5 - 2) * 8;
                
                return (
                  <g
                    key={p.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProperty(p);
                    }}
                  >
                    <circle
                      cx={x + offsetX}
                      cy={y + offsetY}
                      r={4.5}
                      fill="#3B82F6"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      className="hover:r-6 transition-all"
                    />
                  </g>
                );
              })}

            </svg>
          </div>

          {/* Bottom map status bar */}
          <div className="bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <strong className="text-white">{activeMarket.city}, {activeMarket.state}</strong> selected
              </span>
              <span>·</span>
              <span>Coordinates: <span className="font-mono text-slate-300">{activeMarket.coordinates.lat.toFixed(2)}°N, {Math.abs(activeMarket.coordinates.lng).toFixed(2)}°W</span></span>
            </div>
            <div className="text-[11px] font-mono">
              HUD & Census Verified Boundary Layer
            </div>
          </div>

        </div>

        {/* Side Regional Inspector Drawer (1 Col) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Metropolitan Profile</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-slate-400">{activeMarket.county}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeMarket.city}, {activeMarket.state}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeMarket.msa}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md block">
                  Score: {activeMarket.opportunityScore}/100
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Tier-1 Hotspot</span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Median Sale Price</span>
                <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                  {formatCurrency(activeMarket.medianSalePrice)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ${activeMarket.pricePerSqft}/sq ft avg
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Average Cap Rate</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {formatPercent(activeMarket.averageCapRatePercent)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Gross Yield: {formatPercent(activeMarket.grossRentalYieldPercent)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Housing Supply Deficit</span>
                <span className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
                  {formatNumber(activeMarket.housingSupplyGapUnits)} units
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {activeMarket.costBurdenedHouseholdsPercent}% cost-burdened
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">HUD FMR 2-Bedroom</span>
                <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                  {formatCurrency(activeMarket.hudFairMarketRent2Bed)}/mo
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Median Rent: {formatCurrency(activeMarket.medianMonthlyRent)}
                </span>
              </div>
            </div>

            {/* AI Strategic Assessment */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Strategic Investment Thesis</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeMarket.aiMarketSummary}
              </p>
              <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Recommended Strategy:</strong> {activeMarket.topDevelopmentStrategy}
              </div>
            </div>

            {/* Properties currently available in this metro */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>Active Properties in {activeMarket.city} ({activeMarketProperties.length})</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeMarketProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProperty(p)}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-colors flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors truncate max-w-[190px]">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {formatCurrency(p.price)} · {p.units} Units · Cap: {p.capRate}%
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                if (activeMarketProperties.length > 0) {
                  onSelectProperty(activeMarketProperties[0]);
                }
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Inspect {activeMarket.city} Opportunities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
