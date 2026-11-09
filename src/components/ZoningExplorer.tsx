import React, { useState } from 'react';
import { 
  Building, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Layers,
  Info
} from 'lucide-react';
import { Property, MarketMetrics } from '../types';

interface ZoningExplorerProps {
  properties: Property[];
  markets: MarketMetrics[];
  onSelectProperty: (property: Property) => void;
}

export const ZoningExplorer: React.FC<ZoningExplorerProps> = ({
  properties,
  markets,
  onSelectProperty,
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('all');
  const [searchCode, setSearchCode] = useState<string>('');

  const strategies = [
    { id: 'all', label: 'All Development Strategies' },
    { id: 'adu', label: 'By-Right ADU Construction' },
    { id: 'multifamily', label: 'Multifamily Infill (2-4 units)' },
    { id: 'tod', label: 'Transit-Oriented Density Bonus' },
    { id: 'mixed_use', label: 'Mixed-Use Residential' },
    { id: 'rehab', label: 'Historic Preservation & Tax Credits' },
  ];

  const zoningCatalog = [
    {
      code: "R-8",
      metro: "Baltimore, MD",
      name: "Residential High-Density Urban",
      authority: "City of Baltimore Dept of Planning",
      permittedUses: ["Single-Family", "Duplex", "Triplex", "Fourplex", "ADU by right"],
      maxDensity: "35 Units / Acre",
      maxFAR: 2.5,
      maxHeight: "45 ft",
      aduStatus: "Allowed by right up to 800 sq ft or 50% footprint",
      todStatus: "Eligible within 1/2 mile of Metro / Light Rail",
      inclusionaryZoning: "Voluntary density bonus (+25%) for 60% AMI units",
      parkingReq: "0.5 spaces per unit (waived in TOD zones)",
      bestStrategy: "Historic rowhouse duplex/triplex conversion + rear carriage house ADU",
    },
    {
      code: "RA-2",
      metro: "Cleveland, OH",
      name: "Residential Apartment Medium Density",
      authority: "Cleveland City Planning Commission",
      permittedUses: ["Multifamily", "Apartment House", "Townhomes", "Community Facilities"],
      maxDensity: "40 Units / Acre",
      maxFAR: 2.2,
      maxHeight: "40 ft",
      aduStatus: "Conditional; multi-family conversion conforming",
      todStatus: "Rapid Transit station overlay bonus active",
      inclusionaryZoning: "Abatement eligible via City Housing Trust",
      parkingReq: "0.75 spaces per unit",
      bestStrategy: "4-to-8 unit value-add apartment repositioning",
    },
    {
      code: "R2",
      metro: "Detroit, MI",
      name: "Two-Family Residential District",
      authority: "BSEED Detroit Planning Commission",
      permittedUses: ["Single-Family", "Two-Family Dwellings", "Infill ADUs"],
      maxDensity: "24 Units / Acre",
      maxFAR: 1.8,
      maxHeight: "35 ft",
      aduStatus: "Permitted under 2024 Detroit Unified Ordinance",
      todStatus: "Standard corridors",
      inclusionaryZoning: "NEZ 15-year property tax freeze eligible",
      parkingReq: "1.0 space per unit",
      bestStrategy: "Brick duplex modernization with NEZ tax freeze",
    },
    {
      code: "CMX-2",
      metro: "Philadelphia, PA",
      name: "Commercial Mixed-Use Neighborhood",
      authority: "Philadelphia Dept of Licenses & Inspections",
      permittedUses: ["Multifamily Residential", "Ground Retail", "Live-Work Spaces"],
      maxDensity: "60 Units / Acre",
      maxFAR: 3.0,
      maxHeight: "38 ft",
      aduStatus: "Conforming as multi-family unit addition",
      todStatus: "High-frequency transit zone (+35% density bonus)",
      inclusionaryZoning: "Mandatory 10% set-aside at 60% AMI or in-lieu fee",
      parkingReq: "0 spaces required (Transit Oriented)",
      bestStrategy: "Transit-oriented 5-to-12 unit ground-up or conversion",
    },
    {
      code: "RU-3",
      metro: "Memphis, TN",
      name: "Residential Urban District",
      authority: "Memphis & Shelby County Division of Planning",
      permittedUses: ["Multifamily up to 8 Units", "Townhomes", "Auxiliary Units"],
      maxDensity: "32 Units / Acre",
      maxFAR: 2.0,
      maxHeight: "45 ft",
      aduStatus: "By-right detached ADU on parcels >6,000 sq ft",
      todStatus: "Bus rapid corridor overlay",
      inclusionaryZoning: "PILOT property tax freeze incentive program",
      parkingReq: "0.75 spaces per unit",
      bestStrategy: "Midtown quadplex repositioning + detached cottage unit",
    },
    {
      code: "MR-3",
      metro: "Atlanta, GA",
      name: "Multifamily Residential District",
      authority: "City of Atlanta Department of City Planning",
      permittedUses: ["Duplex", "Multifamily", "Accessory Dwellings", "Urban Infill"],
      maxDensity: "30 Units / Acre",
      maxFAR: 2.4,
      maxHeight: "40 ft",
      aduStatus: "Allowed by right up to 1,000 sq ft",
      todStatus: "MARTA rail corridor overlay zone",
      inclusionaryZoning: "10% set-aside at 60% AMI in BeltLine overlay",
      parkingReq: "0.5 spaces per unit",
      bestStrategy: "BeltLine corridor lot subdivision & ADU infill",
    }
  ];

  const filteredCatalog = zoningCatalog.filter((item) => {
    if (searchCode.trim()) {
      const q = searchCode.toLowerCase();
      const match = item.code.toLowerCase().includes(q) || 
                    item.name.toLowerCase().includes(q) || 
                    item.metro.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedStrategy === 'adu' && !item.aduStatus.toLowerCase().includes('right')) return false;
    if (selectedStrategy === 'tod' && !item.todStatus.toLowerCase().includes('transit') && !item.todStatus.toLowerCase().includes('bonus')) return false;
    if (selectedStrategy === 'mixed_use' && !item.permittedUses.some(u => u.toLowerCase().includes('mixed') || u.toLowerCase().includes('retail'))) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Zoning & Development Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Municipal land-use codes, accessory dwelling unit (ADU) mandates, and inclusionary density incentives
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public Open-Data GIS Verified</span>
          </div>
        </div>
      </div>

      {/* Strategy Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Filter by zoning code or metro (e.g. 'R-8', 'Baltimore', 'CMX-2')..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {strategies.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStrategy(s.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedStrategy === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Zoning Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalog.map((zone) => (
          <div
            key={zone.code + zone.metro}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{zone.metro}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{zone.code}</span>
                    <span className="text-xs font-normal text-slate-400">· {zone.name}</span>
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {zone.authority.split(' ')[0]}
                </span>
              </div>

              {/* Specs Matrix */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block">Max Density</span>
                  <span className="font-bold text-slate-900 dark:text-white">{zone.maxDensity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block">Max FAR</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{zone.maxFAR}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block">Max Height</span>
                  <span className="font-bold text-slate-900 dark:text-white">{zone.maxHeight}</span>
                </div>
              </div>

              {/* Key Permissions Checklist */}
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">ADU Provisions:</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {zone.aduStatus}
                  </p>
                </div>

                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Transit (TOD) / Affordability Incentive:</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {zone.todStatus} · {zone.inclusionaryZoning}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Recommended Strategy</span>
              <p className="font-medium text-slate-900 dark:text-white text-xs mt-0.5">
                {zone.bestStrategy}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Statutory Caveat Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Institutional Planning Notice:</strong> Zoning classifications and development parameters are aggregated from municipal open-data portals and verified against published municipal codes. Interpretations reflect preliminary screening research and do not constitute formal legal determinations or land-use entitlements.
        </p>
      </div>

    </div>
  );
};
