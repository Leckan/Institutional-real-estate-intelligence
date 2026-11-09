import React from 'react';
import { 
  Building2, 
  Bell, 
  Moon, 
  Sun, 
  FileDown, 
  SlidersHorizontal,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { AlertItem, InvestorProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  alerts: AlertItem[];
  onOpenAlerts: () => void;
  onOpenProfile: () => void;
  onQuickExport: () => void;
  investorProfile: InvestorProfile;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  alerts,
  onOpenAlerts,
  onOpenProfile,
  onQuickExport,
  investorProfile,
  savedCount,
}) => {
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                  AI Housing Opportunity Engine
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide block">
                  Institutional Real Estate Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'explorer' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Opportunity Explorer
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'map' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Market Heat Map
            </button>
            <button
              onClick={() => setActiveTab('property')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'property' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Property Intelligence
            </button>
            <button
              onClick={() => setActiveTab('zoning')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'zoning' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Zoning
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'analytics' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Historical Analytics
            </button>
            <button
              onClick={() => setActiveTab('index')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'index' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Opportunity Index
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'advisor' 
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Advisor
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'reports' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Reports
            </button>
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Watchlist counter */}
            <button
              onClick={() => setActiveTab('watchlist')}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Saved Watchlist"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-mono">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Notifications / Alerts button */}
            <button
              onClick={onOpenAlerts}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Active Hotspot Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Investor profile config */}
            <button
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Investor Profile & Criteria"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate max-w-[120px]">{investorProfile.firmName.split(' ')[0]}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onQuickExport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export Memo</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sub-navigation bar for tablet & mobile */}
      <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-medium no-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'explorer', label: 'Explorer' },
          { id: 'map', label: 'Heat Map' },
          { id: 'property', label: 'Property Intel' },
          { id: 'zoning', label: 'Zoning' },
          { id: 'analytics', label: 'Historical' },
          { id: 'index', label: 'Index' },
          { id: 'advisor', label: 'AI Advisor' },
          { id: 'reports', label: 'Reports' },
          { id: 'watchlist', label: `Watchlist (${savedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
