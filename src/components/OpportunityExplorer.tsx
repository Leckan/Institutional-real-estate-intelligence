import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Bookmark, 
  BookmarkCheck, 
  SlidersHorizontal, 
  MapPin, 
  Home, 
  ExternalLink,
  CheckCircle2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Property, PropertyType, ConditionRating } from '../types';
import { formatCurrency, formatPercent } from '../utils/financials';

interface OpportunityExplorerProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onToggleSave: (id: string) => void;
  savedPropertyIds: string[];
}

export const OpportunityExplorer: React.FC<OpportunityExplorerProps> = ({
  properties,
  onSelectProperty,
  onToggleSave,
  savedPropertyIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [minCapRate, setMinCapRate] = useState<number>(0);
  const [minCashOnCash, setMinCashOnCash] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [aduOnly, setAduOnly] = useState<boolean>(false);
  const [todOnly, setTodOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'score' | 'capRate' | 'cashOnCash' | 'priceAsc' | 'discount'>('score');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);

  // Unique cities from data
  const cities = useMemo(() => {
    return Array.from(new Set(properties.map(p => p.city)));
  }, [properties]);

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAddress = p.address.toLowerCase().includes(q);
          const matchCity = p.city.toLowerCase().includes(q);
          const matchState = p.state.toLowerCase().includes(q);
          const matchZip = p.zip.includes(q);
          const matchNeighborhood = p.neighborhood.toLowerCase().includes(q);
          const matchZoning = p.zoning.code.toLowerCase().includes(q);
          if (!matchAddress && !matchCity && !matchState && !matchZip && !matchNeighborhood && !matchZoning) {
            return false;
          }
        }

        // City filter
        if (selectedCity !== 'all' && p.city !== selectedCity) return false;

        // Property type
        if (selectedType !== 'all' && p.propertyType !== selectedType) return false;

        // Financials
        if (p.price > maxPrice) return false;
        if (p.capRate < minCapRate) return false;
        if (p.cashOnCash < minCashOnCash) return false;

        // Zoning
        if (aduOnly && !p.zoning.aduPermitted) return false;
        if (todOnly && !p.zoning.todEligible) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.opportunityScore - a.opportunityScore;
        if (sortBy === 'capRate') return b.capRate - a.capRate;
        if (sortBy === 'cashOnCash') return b.cashOnCash - a.cashOnCash;
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'discount') return b.discountToMarketPercent - a.discountToMarketPercent;
        return 0;
      });
  }, [properties, searchQuery, selectedCity, selectedType, maxPrice, minCapRate, minCashOnCash, aduOnly, todOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCity('all');
    setMinCapRate(0);
    setMinCashOnCash(0);
    setMaxPrice(1000000);
    setAduOnly(false);
    setTodOnly(false);
    setSortBy('score');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Opportunity Explorer
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Screen {properties.length} underwritten affordable housing acquisition opportunities across target MSAs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Institutional Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              showFiltersDrawer 
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Search & Quick Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, ZIP, address, neighborhood, or zoning code (e.g. 'Baltimore', 'R-8', '21224')..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* City selector */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Metros ({cities.length})</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Property Type selector */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Property Types</option>
            <option value="Duplex">Duplex (2 Units)</option>
            <option value="Triplex">Triplex (3 Units)</option>
            <option value="Fourplex">Fourplex (4 Units)</option>
            <option value="Small Multifamily (5-20 units)">Multifamily (5-20 Units)</option>
          </select>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="score">Opportunity Score (Highest)</option>
              <option value="capRate">Cap Rate (Highest)</option>
              <option value="cashOnCash">Cash-on-Cash Return</option>
              <option value="discount">Discount to Market %</option>
              <option value="priceAsc">Price (Lowest)</option>
            </select>
          </div>

        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showFiltersDrawer && (
          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs animate-in fade-in duration-200">
            
            {/* Max Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500 dark:text-slate-400">Max Acquisition Price</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={1000000}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Min Cap Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500 dark:text-slate-400">Min Cap Rate</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{minCapRate}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={minCapRate}
                onChange={(e) => setMinCapRate(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Min Cash-on-Cash Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500 dark:text-slate-400">Min Cash-on-Cash</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{minCashOnCash}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={22}
                step={0.5}
                value={minCashOnCash}
                onChange={(e) => setMinCashOnCash(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Zoning check options */}
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={aduPermitted(aduOnly)}
                  onChange={(e) => setAduOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>By-Right ADU Permitted</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={todOnly}
                  onChange={(e) => setTodOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Transit-Oriented (TOD)</span>
              </label>
            </div>

          </div>
        )}

        {/* Filter status summary bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredProperties.length}</strong> matching properties</span>
          {(searchQuery || selectedCity !== 'all' || selectedType !== 'all' || minCapRate > 0 || minCashOnCash > 0 || maxPrice < 1000000 || aduOnly || todOnly) && (
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>

      </div>

      {/* Grid or Table Results */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => {
            const isSaved = savedPropertyIds.includes(prop.id);
            return (
              <div
                key={prop.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Top tag & bookmark */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold">
                      {prop.propertyType} · {prop.units} Units
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(prop.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors shadow-sm"
                      title={isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                      Score: {prop.opportunityScore}/100
                    </div>

                    <div className="absolute bottom-3 right-3 bg-emerald-600/95 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-semibold">
                      {prop.discountToMarketPercent}% Below Value
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 
                        onClick={() => onSelectProperty(prop)}
                        className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {prop.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{prop.address}, {prop.city}, {prop.state}</span>
                      </p>
                    </div>

                    {/* Financial stats matrix */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-center font-mono">
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

                    {/* Property Specs */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{prop.beds} Beds · {prop.baths} Baths</span>
                      <span>{prop.sqft.toLocaleString()} Sq Ft</span>
                      <span>Built {prop.yearBuilt}</span>
                    </div>

                    {/* Zoning highlights */}
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/40 p-2 rounded flex items-center justify-between">
                      <span className="font-medium">Zoning: {prop.zoning.code}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {prop.zoning.aduPermitted ? '✓ ADU Permitted' : 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectProperty(prop)}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Analyze Financials & Zoning</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Institutional Data Table View */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-3">Metro</th>
                  <th className="py-3 px-3 text-right">Price</th>
                  <th className="py-3 px-3 text-right">Discount</th>
                  <th className="py-3 px-3 text-right">Cap Rate</th>
                  <th className="py-3 px-3 text-right">Cash-on-Cash</th>
                  <th className="py-3 px-3 text-right">Proj. ROI</th>
                  <th className="py-3 px-3">Zoning</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProperties.map((p) => {
                  const isSaved = savedPropertyIds.includes(p.id);
                  return (
                    <tr 
                      key={p.id}
                      onClick={() => onSelectProperty(p)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white max-w-[220px] truncate">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {p.address}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                        {p.city}, {p.state}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                        {formatCurrency(p.price)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        -{p.discountToMarketPercent}%
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {formatPercent(p.capRate)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-blue-600 dark:text-blue-400 font-bold">
                        {formatPercent(p.cashOnCash)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                        {formatPercent(p.projectedROI)}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                          {p.zoning.code}
                        </span>
                        {p.zoning.aduPermitted && (
                          <span className="ml-1 text-[10px] text-emerald-600 font-semibold">ADU</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                          {p.opportunityScore}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onToggleSave(p.id)}
                            className="p-1 text-slate-400 hover:text-blue-600"
                            title={isSaved ? "Saved" : "Save"}
                          >
                            {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => onSelectProperty(p)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded"
                          >
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <Home className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900 dark:text-white">No Properties Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, increasing your max price, or lowering the minimum cap rate threshold.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};

function aduPermitted(val: boolean) {
  return val;
}
