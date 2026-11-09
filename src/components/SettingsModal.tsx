import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw,
  Building2,
  DollarSign
} from 'lucide-react';
import { InvestorProfile } from '../types';
import { DATA_REGISTRY } from '../data/mockData';
import { formatCurrency } from '../utils/financials';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investorProfile: InvestorProfile;
  onSaveProfile: (profile: InvestorProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  investorProfile,
  onSaveProfile,
}) => {
  const [profile, setProfile] = useState<InvestorProfile>({ ...investorProfile });
  const [activeTab, setActiveTab] = useState<'profile' | 'data_sources'>('profile');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile(profile);
    onClose();
  };

  const handleTriggerDataSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('All 5 public GIS and HUD datasets synchronized successfully.');
      setTimeout(() => setSyncNotice(''), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Investor Profile & Data Source Integrations
              </h2>
              <p className="text-xs text-slate-500">
                Configure deal screening parameters and monitor public data synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Investor Profile & Criteria
          </button>
          <button
            onClick={() => setActiveTab('data_sources')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'data_sources'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Public Data Source Registry (5 Active)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Firm / Organization</label>
                  <input
                    type="text"
                    value={profile.firmName}
                    onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Lead Investor Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Min Investment Budget ($)</label>
                  <input
                    type="number"
                    value={profile.budgetMin}
                    onChange={(e) => setProfile({ ...profile, budgetMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Max Investment Budget ($)</label>
                  <input
                    type="number"
                    value={profile.budgetMax}
                    onChange={(e) => setProfile({ ...profile, budgetMax: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Target Cap Rate Minimum (%)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={profile.targetCapRateMin}
                    onChange={(e) => setProfile({ ...profile, targetCapRateMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-medium">Target Cash-on-Cash Min (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.targetCashOnCashMin}
                    onChange={(e) => setProfile({ ...profile, targetCashOnCashMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300 font-medium">Target Workforce AMI Band</label>
                <select
                  value={profile.targetAmiBand}
                  onChange={(e) => setProfile({ ...profile, targetAmiBand: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-900 dark:text-white"
                >
                  <option value="30% AMI (Extremely Low)">30% AMI (Extremely Low Income)</option>
                  <option value="50% AMI (Very Low)">50% AMI (Very Low Income)</option>
                  <option value="60-80% AMI (Low-Income Workforce)">60-80% AMI (Low-Income Workforce)</option>
                  <option value="Mixed-Income">Mixed-Income (30% - 100% AMI)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300 font-medium">Risk Tolerance</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Conservative', 'Moderate', 'Aggressive'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setProfile({ ...profile, riskTolerance: r })}
                      className={`py-2 text-center rounded-lg font-semibold transition-colors ${
                        profile.riskTolerance === r
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Active Public Data Pipelines</h3>
                  <p className="text-slate-500 text-[11px]">Direct scheduled synchronization with federal & municipal open-data portals</p>
                </div>
                <button
                  onClick={handleTriggerDataSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 rounded-lg font-semibold transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronizing...' : 'Sync Now'}</span>
                </button>
              </div>

              {syncNotice && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{syncNotice}</span>
                </div>
              )}

              <div className="space-y-2.5">
                {DATA_REGISTRY.map((d, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{d.name}</span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-bold">
                        {d.freshness}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500">
                      <span>Provider: <strong className="text-slate-700 dark:text-slate-300">{d.provider}</strong></span>
                      <span>Coverage: {d.coverage}</span>
                      <span>Records: <strong className="font-mono">{d.recordsCount}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
          >
            Save Criteria
          </button>
        </div>

      </div>
    </div>
  );
};
