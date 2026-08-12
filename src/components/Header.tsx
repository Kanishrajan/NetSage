import React from 'react';
import { Network, ShieldCheck, Activity, Cpu, Sparkles, Database, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'troubleshoot' | 'analytics' | 'responsible_ai' | 'docs';
  setActiveTab: (tab: 'troubleshoot' | 'analytics' | 'responsible_ai' | 'docs') => void;
  caseCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, caseCount }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg shadow-sm flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  NetSage AI
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Cisco PT v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI-Assisted Network Troubleshooting & Human Review
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('troubleshoot')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'troubleshoot'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Troubleshoot Suite</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Analytics & Eval</span>
            </button>

            <button
              onClick={() => setActiveTab('responsible_ai')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'responsible_ai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Responsible AI Log</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PT Guide</span>
            </button>
          </nav>

          {/* Quick Metrics Badge */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>{caseCount} Cases Loaded</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini 2.5 Flash / Demo Engine</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
