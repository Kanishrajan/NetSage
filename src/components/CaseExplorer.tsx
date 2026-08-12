import React, { useState } from 'react';
import { NetworkCase } from '../types';
import { Search, Filter, AlertTriangle, Layers, Tag, CheckCircle2 } from 'lucide-react';

interface CaseExplorerProps {
  cases: NetworkCase[];
  selectedCaseId: string | null;
  onSelectCase: (c: NetworkCase) => void;
  reviewStatusMap: Record<string, string>;
}

export const CaseExplorer: React.FC<CaseExplorerProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  reviewStatusMap
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const categories = ['ALL', 'VLAN', 'Gateway', 'DHCP', 'DNS', 'Routing', 'ACL', 'NAT', 'Wireless'];
  const severities = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symptom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSeverity = severityFilter === 'ALL' || c.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-900/50';
      case 'HIGH':
        return 'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-900/50';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-900/50';
      default:
        return 'bg-slate-500/10 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-800';
    }
  };

  const getReviewBadge = (caseId: string) => {
    const status = reviewStatusMap[caseId];
    if (!status) return null;
    if (status === 'ACCEPTED') {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
          <span>ACCEPTED</span>
        </span>
      );
    }
    if (status === 'EDITED') {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
          <span>EDITED</span>
        </span>
      );
    }
    if (status === 'REJECTED') {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
          <span>REJECTED</span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-120px)]">
      
      {/* Search & Filter Controls */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search case title, symptom, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Counter */}
      <div className="px-3 py-1.5 bg-slate-100/60 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
        <span>Showing {filteredCases.length} of {cases.length} cases</span>
        {categoryFilter !== 'ALL' && (
          <span className="font-medium text-blue-600 dark:text-blue-400">{categoryFilter}</span>
        )}
      </div>

      {/* List of Cases */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
        {filteredCases.map((c) => {
          const isSelected = c.case_id === selectedCaseId;
          return (
            <button
              key={c.case_id}
              onClick={() => onSelectCase(c)}
              className={`w-full text-left p-3 transition-colors flex flex-col space-y-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    {c.case_id}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {c.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getReviewBadge(c.case_id)}
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded border ${getSeverityBadge(c.severity)}`}>
                    {c.severity}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                {c.title}
              </h4>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
                {c.symptom}
              </p>

              <div className="flex items-center space-x-3 text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-slate-400" />
                  <span>{c.osi_layer}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>{c.concept}</span>
                </span>
              </div>
            </button>
          );
        })}

        {filteredCases.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No matching troubleshooting cases found. Try adjusting search filters.
          </div>
        )}
      </div>

    </div>
  );
};
