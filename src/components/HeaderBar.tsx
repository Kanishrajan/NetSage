import React from 'react';
import { NetworkCase } from '../types';
import { NavTab } from './Sidebar';
import { ChevronRight, Server, Shield, Layers, RefreshCw } from 'lucide-react';

interface HeaderBarProps {
  activeTab: NavTab;
  cases: NetworkCase[];
  selectedCase: NetworkCase | null;
  onSelectCase: (c: NetworkCase) => void;
  onRefreshData?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeTab,
  cases,
  selectedCase,
  onSelectCase,
  onRefreshData,
}) => {
  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'overview':
        return 'Network Operations Overview';
      case 'cases':
        return 'Troubleshooting Cases Explorer';
      case 'diagnosis':
        return 'Case Diagnosis & CLI Evidence Analysis';
      case 'review':
        return 'Human Oversight & Review Panel';
      case 'verification':
        return 'Post-Fix CLI Command Verification';
      case 'analytics':
        return 'Evaluation & Accuracy Analytics';
      case 'responsible_ai':
        return 'Responsible AI & Audit Trail Log';
      case 'docs':
        return 'Packet Tracer Workflow & Rule Documentation';
      default:
        return 'NetSage AI Console';
    }
  };

  return (
    <header className="bg-white border-b border-zinc-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40 text-zinc-900 shadow-2xs">
      
      {/* Breadcrumb & Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 text-xs font-mono text-zinc-500">
          <span>NetSage AI</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-semibold text-zinc-800 capitalize">{activeTab.replace('_', ' ')}</span>
        </div>
        <span className="h-4 w-px bg-zinc-200" />
        <h2 className="text-sm font-bold text-zinc-900 tracking-tight">
          {getTabTitle(activeTab)}
        </h2>
      </div>

      {/* Right Controls: Active Case Switcher & Quick Refresh */}
      <div className="flex items-center space-x-3">
        
        {/* Case Switcher */}
        {selectedCase && (
          <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200 rounded-md px-2.5 py-1 text-xs">
            <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">Active Ticket:</span>
            <select
              value={selectedCase.case_id}
              onChange={(e) => {
                const found = cases.find((c) => c.case_id === e.target.value);
                if (found) onSelectCase(found);
              }}
              className="bg-transparent font-mono text-xs font-bold text-zinc-900 focus:outline-none cursor-pointer"
            >
              {cases.map((c) => (
                <option key={c.case_id} value={c.case_id}>
                  {c.case_id}: {c.title} ({c.category})
                </option>
              ))}
            </select>
            <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded bg-zinc-200 text-zinc-800 font-mono">
              {selectedCase.severity}
            </span>
          </div>
        )}

        {/* System Badges */}
        <div className="hidden lg:flex items-center space-x-2 text-xs">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono text-[11px]">
            <Server className="w-3 h-3 text-zinc-500" />
            <span>Cisco IOS 15.x</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px]">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Deterministic Rules Active</span>
          </span>
        </div>

        {/* Refresh Button */}
        {onRefreshData && (
          <button
            onClick={onRefreshData}
            title="Refresh dataset from backend"
            className="p-1.5 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}

      </div>

    </header>
  );
};
