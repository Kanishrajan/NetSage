import React from 'react';
import { 
  LayoutDashboard, 
  ListFilter, 
  Stethoscope, 
  UserCheck, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  BookOpen,
  Network,
  ChevronRight
} from 'lucide-react';

export type NavTab = 
  | 'overview' 
  | 'cases' 
  | 'diagnosis' 
  | 'review' 
  | 'verification' 
  | 'analytics' 
  | 'responsible_ai' 
  | 'docs';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  caseCount: number;
  reviewedCount: number;
  verifiedCount: number;
  selectedCaseId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  caseCount,
  reviewedCount,
  verifiedCount,
  selectedCaseId,
}) => {
  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'NOC operational summary & metrics',
    },
    {
      id: 'cases' as NavTab,
      label: 'Troubleshooting Cases',
      icon: ListFilter,
      badge: caseCount,
      description: 'Search & filter network tickets',
    },
    {
      id: 'diagnosis' as NavTab,
      label: 'Diagnosis & Evidence',
      icon: Stethoscope,
      badge: selectedCaseId ? selectedCaseId : undefined,
      description: 'Cisco show output & AI reasoning',
    },
    {
      id: 'review' as NavTab,
      label: 'Human Review',
      icon: UserCheck,
      badge: reviewedCount > 0 ? reviewedCount : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Senior engineer sign-off & edits',
    },
    {
      id: 'verification' as NavTab,
      label: 'Fix Verification',
      icon: CheckCircle2,
      badge: verifiedCount > 0 ? verifiedCount : undefined,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Post-fix CLI testing log',
    },
    {
      id: 'analytics' as NavTab,
      label: 'Analytics & Eval',
      icon: BarChart3,
      description: 'Accuracy & category statistics',
    },
    {
      id: 'responsible_ai' as NavTab,
      label: 'Responsible AI Log',
      icon: ShieldCheck,
      description: 'Audit trail of human overrides',
    },
    {
      id: 'docs' as NavTab,
      label: 'Packet Tracer Guide',
      icon: BookOpen,
      description: '16-step scenario & rule specs',
    },
  ];

  return (
    <aside className="w-64 bg-zinc-900 text-zinc-100 flex flex-col h-screen sticky top-0 shrink-0 border-r border-zinc-800 select-none">
      
      {/* Brand Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center space-x-3 bg-zinc-950">
        <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 shrink-0">
          <Network className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold tracking-tight text-white truncate">
              NetSage AI
            </h1>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-zinc-800 text-zinc-300 rounded border border-zinc-700 shrink-0">
              v2.4
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 truncate">
            Cisco Network Operations
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
          Main Console
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-all text-left ${
                isActive
                  ? 'bg-zinc-800 text-white font-semibold shadow-xs border-l-2 border-emerald-500 pl-2.5'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <div className="truncate">
                  <div className="leading-tight truncate">{item.label}</div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                    item.badgeColor || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Info */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950/60 text-[11px] text-zinc-400 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono text-zinc-500">System Status</span>
          <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE</span>
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono truncate">
          Engine: Gemini 3.6 Flash / PyRules
        </div>
      </div>

    </aside>
  );
};
