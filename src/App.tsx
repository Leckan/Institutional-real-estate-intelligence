import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { OpportunityExplorer } from './components/OpportunityExplorer';
import { InteractiveMarketMap } from './components/InteractiveMarketMap';
import { PropertyIntelligence } from './components/PropertyIntelligence';
import { ZoningExplorer } from './components/ZoningExplorer';
import { MarketAnalytics } from './components/MarketAnalytics';
import { AffordableHousingIndex } from './components/AffordableHousingIndex';
import { AIInvestmentAdvisor } from './components/AIInvestmentAdvisor';
import { WatchlistAlerts } from './components/WatchlistAlerts';
import { ReportsExports } from './components/ReportsExports';
import { SettingsModal } from './components/SettingsModal';

import { 
  MARKET_DATA, 
  PROPERTIES, 
  INITIAL_ALERTS, 
  INITIAL_INVESTOR_PROFILE 
} from './data/mockData';
import { MarketMetrics, Property, AlertItem, InvestorProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [markets] = useState<MarketMetrics[]>(MARKET_DATA);
  const [properties] = useState<Property[]>(PROPERTIES);
  const [selectedMarket, setSelectedMarket] = useState<MarketMetrics>(MARKET_DATA[0]);
  const [selectedProperty, setSelectedProperty] = useState<Property>(PROPERTIES[0]);
  
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_property_ids');
      return saved ? JSON.parse(saved) : ['prop-balt-001', 'prop-clev-002'];
    } catch {
      return ['prop-balt-001', 'prop-clev-002'];
    }
  });

  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile>(INITIAL_INVESTOR_PROFILE);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Persist watchlist
  useEffect(() => {
    localStorage.setItem('saved_property_ids', JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  const handleToggleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts((prev) => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handleClearAlerts = () => {
    setAlerts((prev) => prev.map(a => ({ ...a, read: true })));
  };

  const handleSelectMarket = (m: MarketMetrics) => {
    setSelectedMarket(m);
    // Find matching property if exists
    const matchingProp = properties.find(p => p.city.toLowerCase() === m.city.toLowerCase());
    if (matchingProp) {
      setSelectedProperty(matchingProp);
    }
  };

  const handleSelectProperty = (p: Property) => {
    setSelectedProperty(p);
    const matchingMarket = markets.find(m => m.city.toLowerCase() === p.city.toLowerCase());
    if (matchingMarket) {
      setSelectedMarket(matchingMarket);
    }
    setActiveTab('property');
  };

  const handleOpenAdvisorWithProperty = (p: Property) => {
    setSelectedProperty(p);
    setActiveTab('advisor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 3-Zone Institutional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        alerts={alerts}
        onOpenAlerts={() => setActiveTab('watchlist')}
        onOpenProfile={() => setIsSettingsOpen(true)}
        onQuickExport={() => setActiveTab('reports')}
        investorProfile={investorProfile}
        savedCount={savedPropertyIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && (
          <OverviewDashboard
            markets={markets}
            properties={properties}
            alerts={alerts}
            onSelectMarket={(m) => {
              handleSelectMarket(m);
              setActiveTab('map');
            }}
            onSelectProperty={handleSelectProperty}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'explorer' && (
          <OpportunityExplorer
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onToggleSave={handleToggleSaveProperty}
            savedPropertyIds={savedPropertyIds}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMarketMap
            markets={markets}
            properties={properties}
            selectedMarket={selectedMarket}
            onSelectMarket={handleSelectMarket}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {activeTab === 'property' && (
          <PropertyIntelligence
            property={selectedProperty}
            onBack={() => setActiveTab('explorer')}
            onToggleSave={handleToggleSaveProperty}
            isSaved={savedPropertyIds.includes(selectedProperty.id)}
            onOpenAdvisorWithProperty={handleOpenAdvisorWithProperty}
          />
        )}

        {activeTab === 'zoning' && (
          <ZoningExplorer
            properties={properties}
            markets={markets}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {activeTab === 'analytics' && (
          <MarketAnalytics markets={markets} />
        )}

        {activeTab === 'index' && (
          <AffordableHousingIndex
            markets={markets}
            onSelectMarket={(m) => {
              handleSelectMarket(m);
              setActiveTab('map');
            }}
          />
        )}

        {activeTab === 'advisor' && (
          <AIInvestmentAdvisor
            markets={markets}
            properties={properties}
            selectedMarket={selectedMarket}
            selectedProperty={selectedProperty}
            investorProfile={investorProfile}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsExports
            markets={markets}
            properties={properties}
            investorProfile={investorProfile}
          />
        )}

        {activeTab === 'watchlist' && (
          <WatchlistAlerts
            properties={properties}
            savedPropertyIds={savedPropertyIds}
            alerts={alerts}
            onToggleSave={handleToggleSaveProperty}
            onSelectProperty={handleSelectProperty}
            onMarkAlertRead={handleMarkAlertRead}
            onClearAlerts={handleClearAlerts}
          />
        )}
      </main>

      {/* Settings & Profile Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        investorProfile={investorProfile}
        onSaveProfile={setInvestorProfile}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Housing Opportunity Engine · Discover opportunities. Predict markets. Build affordable communities.</span>
          <span className="font-mono text-[11px]">HUD FY2026 · Census ACS 5-Year · FHFA HPI Verified</span>
        </div>
      </footer>

    </div>
  );
}
