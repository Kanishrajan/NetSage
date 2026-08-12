import React from 'react';
import { NetworkCase, HumanReview, EvaluationMetrics } from '../types';
import { NavTab } from './Sidebar';
import { 
  Database, 
  CheckCircle2, 
  Edit3, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Layers,
  Terminal,
  Clock
} from 'lucide-react';

interface OverviewDashboardProps {
  cases: NetworkCase[];
  reviews: HumanReview[];
  metrics: EvaluationMetrics | null;
  onSelectCase: (c: NetworkCase) => void;
  onNavigateTab: (tab: NavTab) => void;
  reviewStatusMap: Record<string, string>;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  cases,
  reviews,
  metrics,
  onSelectCase,
  onNavigateTab,
  reviewStatusMap,
}) => {
  const acceptedCount = reviews.filter((r) => r.reviewer_decision === 'ACCEPTED').length;
  const editedCount = reviews.filter((r) => r.reviewer_decision === 'EDITED').length;
  const rejectedCount = reviews.filter((r) => r.reviewer_decision === 'REJECTED').length;
  const totalReviewed = reviews.length;

  const agreementPct = totalReviewed > 0 
    ? Math.round((acceptedCount / totalReviewed) * 100) 
    : (metrics?.reviews_summary?.human_agreement_pct || 85);

  // Group cases by category
  const categoryCounts: Record<string, number> = {};
  cases.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-800 border-red-200 font-bold';
      case 'HIGH':
        return 'bg-orange-50 text-orange-800 border-orange-200 font-bold';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-200 font-medium';
    }
  };

  const getReviewBadge = (caseId: string) => {
    const status = reviewStatusMap[caseId];
    if (!status) {
      return (
        <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
          PENDING REVIEW
        </span>
      );
    }
    if (status === 'ACCEPTED') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>ACCEPTED</span>
        </span>
      );
    }
    if (status === 'EDITED') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-blue-50 text-blue-800 border border-blue-200">
          <Edit3 className="w-3 h-3 text-blue-600" />
          <span>EDITED</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-rose-50 text-rose-800 border border-rose-200">
        <XCircle className="w-3 h-3 text-rose-600" />
        <span>REJECTED</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Cases */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Total Tickets</span>
            <Database className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">{cases.length}</span>
            <span className="text-xs text-zinc-500 font-mono">Recorded</span>
          </div>
          <p className="text-[11px] text-zinc-500">Cisco Packet Tracer scenarios</p>
        </div>

        {/* Accepted */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Accepted AI</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-emerald-900">{acceptedCount}</span>
            <span className="text-xs text-emerald-700 font-mono">({totalReviewed ? Math.round((acceptedCount/totalReviewed)*100) : 0}%)</span>
          </div>
          <p className="text-[11px] text-zinc-500">Approved without edits</p>
        </div>

        {/* Edited */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Edited AI</span>
            <Edit3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-blue-900">{editedCount}</span>
            <span className="text-xs text-blue-700 font-mono">({totalReviewed ? Math.round((editedCount/totalReviewed)*100) : 0}%)</span>
          </div>
          <p className="text-[11px] text-zinc-500">Human engineer modified</p>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Rejected AI</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-rose-900">{rejectedCount}</span>
            <span className="text-xs text-rose-700 font-mono">({totalReviewed ? Math.round((rejectedCount/totalReviewed)*100) : 0}%)</span>
          </div>
          <p className="text-[11px] text-zinc-500">Human engineer rejected</p>
        </div>

        {/* AI-Human Agreement */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-800">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">AI Agreement</span>
            <ShieldCheck className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">{agreementPct}%</span>
            <span className="text-xs text-emerald-700 font-mono">Target &gt;80%</span>
          </div>
          <p className="text-[11px] text-zinc-500">Human oversight concurrence</p>
        </div>

      </div>

      {/* Network Workflow Banner */}
      <div className="bg-zinc-900 text-zinc-100 rounded-lg p-4 border border-zinc-800 shadow-2xs">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Operational Pipeline Architecture
            </span>
            <span className="text-[11px] text-zinc-400">
              Evidence Grounding → Deterministic Checks → LLM Reasoning → Human Sign-off
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('cases')}
            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors"
          >
            <span>View All Tickets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">01. TICKET</span>
            <p className="font-semibold text-white">Symptom Record</p>
          </div>
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">02. EVIDENCE</span>
            <p className="font-semibold text-emerald-300">Cisco `show` Logs</p>
          </div>
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">03. RULE CHECK</span>
            <p className="font-semibold text-blue-300">6 Python Checks</p>
          </div>
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">04. AI DIAGNOSIS</span>
            <p className="font-semibold text-purple-300">Gemini Pydantic</p>
          </div>
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">05. OVERSIGHT</span>
            <p className="font-semibold text-amber-300">Human Engineer</p>
          </div>
          <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700 space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block">06. VERIFY</span>
            <p className="font-semibold text-emerald-400">Post-Fix Ping Test</p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Category Issue Distribution & Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown List */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-zinc-700" />
              <span>Issue Category Distribution</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">{Object.keys(categoryCounts).length} Categories</span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / cases.length) * 100);
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center font-mono">
                    <span className="font-semibold text-zinc-800">{cat}</span>
                    <span className="text-zinc-500 font-bold">{count} cases ({pct}%)</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-800 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Cases Data Table */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-zinc-700" />
              <span>Active Network Cases ({cases.length})</span>
            </h3>
            <button
              onClick={() => onNavigateTab('cases')}
              className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-900"
            >
              Open Full Explorer →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-[11px] font-mono text-zinc-500 uppercase bg-zinc-50/50">
                  <th className="py-2.5 px-3 font-semibold">ID</th>
                  <th className="py-2.5 px-3 font-semibold">Title & Category</th>
                  <th className="py-2.5 px-3 font-semibold">OSI Layer</th>
                  <th className="py-2.5 px-3 font-semibold">Severity</th>
                  <th className="py-2.5 px-3 font-semibold">Review Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {cases.slice(0, 7).map((c) => (
                  <tr key={c.case_id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-zinc-900">
                      {c.case_id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-zinc-900">{c.title}</div>
                      <div className="text-[11px] text-zinc-500 flex items-center space-x-2 mt-0.5">
                        <span className="font-mono bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200 text-zinc-700">
                          {c.category}
                        </span>
                        <span className="truncate max-w-[220px]">{c.symptom}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-600">
                      {c.osi_layer}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${getSeverityBadge(c.severity)}`}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {getReviewBadge(c.case_id)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectCase(c);
                          onNavigateTab('diagnosis');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
                      >
                        Diagnose
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
