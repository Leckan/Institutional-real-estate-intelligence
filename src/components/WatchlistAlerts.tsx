import React, { useState } from 'react';
import { 
  Bell, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Sliders, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowDownRight,
  Building,
  FileDown
} from 'lucide-react';
import { Property, AlertItem } from '../types';
import { formatCurrency, formatPercent } from '../utils/financials';

interface WatchlistAlertsProps {
  properties: Property[];
  savedPropertyIds: string[];
  alerts: AlertItem[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onMarkAlertRead: (id: string) => void;
  onClearAlerts: () => void;
}

export const WatchlistAlerts: React.FC<WatchlistAlertsProps> = ({
  properties,
  savedPropertyIds,
  alerts,
  onToggleSave,
  onSelectProperty,
  onMarkAlertRead,
  onClearAlerts,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'watchlist' | 'alerts' | 'rules'>('watchlist');

  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));

  // Export saved properties to CSV
  const handleExportSavedCSV = () => {
    if (savedProperties.length === 0) return;
    const headers = ["Title", "Address", "City", "State", "Zip", "Price", "CapRate", "CashOnCash", "Units", "ZoningCode", "Score"];
    const rows = savedProperties.map(p => [
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.address.replace(/"/g, '""')}"`,
      p.city,
      p.state,
      p.zip,
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
    link.setAttribute("download", `saved_watchlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Watchlist & Investment Alerts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track monitored assets, automated market notifications, and underwriting trigger rules
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('watchlist')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSubTab === 'watchlist'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Saved Watchlist ({savedProperties.length})
          </button>
          <button
            onClick={() => setActiveSubTab('alerts')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSubTab === 'alerts'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Active Alerts ({alerts.filter(a => !a.read).length})
          </button>
          <button
            onClick={() => setActiveSubTab('rules')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSubTab === 'rules'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Alert Triggers
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Watchlist */}
      {activeSubTab === 'watchlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {savedProperties.length} properties saved for investment committee review
            </span>
            {savedProperties.length > 0 && (
              <button
                onClick={handleExportSavedCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Watchlist CSV</span>
              </button>
            )}
          </div>

          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-blue-500 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-semibold">
                        {p.propertyType}
                      </div>
                      <button
                        onClick={() => onToggleSave(p.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-rose-600 hover:bg-white transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {p.address}, {p.city}, {p.state}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans uppercase block">Price</span>
                          <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(p.price)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans uppercase block">Cap Rate</span>
                          <span className="font-bold text-emerald-600">{formatPercent(p.capRate)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans uppercase block">Cash/Cash</span>
                          <span className="font-bold text-blue-600">{formatPercent(p.cashOnCash)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => onSelectProperty(p)}
                      className="w-full py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open Full Analysis</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 dark:text-white">Watchlist is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark potential acquisition properties in the Opportunity Explorer to monitor price changes and generate investment memos.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Alerts Feed */}
      {activeSubTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {alerts.length} notifications across saved markets
            </span>
            <button
              onClick={onClearAlerts}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onMarkAlertRead(alert.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  alert.read 
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75' 
                    : 'bg-blue-50/40 dark:bg-slate-900 border-blue-200 dark:border-blue-900/60 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                    alert.type === 'hotspot' ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60' :
                    alert.type === 'price_drop' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-950/60'
                  }`}>
                    {alert.type === 'hotspot' ? <Flame className="w-4 h-4" /> :
                     alert.type === 'price_drop' ? <ArrowDownRight className="w-4 h-4" /> :
                     <Bell className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {alert.title}
                      </h4>
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                      <span>Market: {alert.marketOrProperty}</span>
                      <span>·</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                {alert.roi && (
                  <div className="text-right font-mono text-xs shrink-0">
                    <span className="text-[10px] text-slate-400 block font-sans">ROI Trigger</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">+{alert.roi}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Alert Trigger Configurations */}
      {activeSubTab === 'rules' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Automated Investment Alert Triggers
            </h3>
            <p className="text-xs text-slate-500">
              Configure push criteria for instant notification when off-market or MLS deals meet thresholds
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Cap Rate Threshold</span>
                <span className="text-slate-500">Notify when screened asset cap rate exceeds target</span>
              </div>
              <input type="number" defaultValue={9.5} step={0.25} className="w-20 px-2 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-right" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Price Discount Alert</span>
                <span className="text-slate-500">Notify when asking price drops by at least % below estimated market value</span>
              </div>
              <input type="number" defaultValue={15} step={1} className="w-20 px-2 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-right" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Zoning & ADU Amendment Alerts</span>
                <span className="text-slate-500">Immediate alert upon municipal passage of by-right ADU ordinances</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Workforce Supply Deficit Surges</span>
                <span className="text-slate-500">Notify when HUD CHAS datasets update regional housing shortage estimates</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
