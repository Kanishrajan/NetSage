import React, { useState } from 'react';
import { NetworkCase } from '../types';
import { NavTab } from './Sidebar';
import { Search, Filter, CheckCircle2, Edit3, XCircle, ArrowRight, Layers, Tag, ChevronDown } from 'lucide-react';

interface CasesTableViewProps {
  cases: NetworkCase[];
  selectedCaseId: string | null;
  onSelectCase: (c: NetworkCase) => void;
  onNavigateTab: (tab: NavTab) => void;
  reviewStatusMap: Record<string, string>;
}

export const CasesTableView: React.FC<CasesTableViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  onNavigateTab,
  reviewStatusMap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const categories = ['ALL', 'VLAN', 'Gateway', 'DHCP', 'DNS', 'Routing', 'ACL', 'NAT', 'Wireless'];
  const severities = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const statuses = ['ALL', 'PENDING', 'ACCEPTED', 'EDITED', 'REJECTED'];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.concept.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSeverity = severityFilter === 'ALL' || c.severity === severityFilter;
    
    const status = reviewStatusMap[c.case_id] || 'PENDING';
    const matchesStatus = statusFilter === 'ALL' || status === statusFilter;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
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
        <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
          PENDING
        </span>
      );
    }
    if (status === 'ACCEPTED') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>ACCEPTED</span>
        </span>
      );
    }
    if (status === 'EDITED') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-50 text-blue-800 border border-blue-200">
          <Edit3 className="w-3 h-3 text-blue-600" />
          <span>EDITED</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-50 text-rose-800 border border-rose-200">
        <XCircle className="w-3 h-3 text-rose-600" />
        <span>REJECTED</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs space-y-4 p-5">
      
      {/* Filter Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search ticket ID, title, symptom, or concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 focus:ring-1 focus:ring-zinc-800 focus:border-zinc-800"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Category */}
          <div className="flex items-center space-x-1.5">
            <span className="text-zinc-500 font-mono text-[11px] uppercase">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-1.5 rounded border border-zinc-300 bg-white text-zinc-900 font-mono text-xs"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Severity */}
          <div className="flex items-center space-x-1.5">
            <span className="text-zinc-500 font-mono text-[11px] uppercase">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="p-1.5 rounded border border-zinc-300 bg-white text-zinc-900 font-mono text-xs"
            >
              {severities.map((sev) => (
                <option key={sev} value={sev}>{sev}</option>
              ))}
            </select>
          </div>

          {/* Review Status */}
          <div className="flex items-center space-x-1.5">
            <span className="text-zinc-500 font-mono text-[11px] uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 rounded border border-zinc-300 bg-white text-zinc-900 font-mono text-xs"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Case Count Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
        <span>Showing {filteredCases.length} of {cases.length} troubleshooting tickets</span>
        {(categoryFilter !== 'ALL' || severityFilter !== 'ALL' || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setCategoryFilter('ALL');
              setSeverityFilter('ALL');
              setStatusFilter('ALL');
              setSearchTerm('');
            }}
            className="text-zinc-800 underline hover:text-zinc-900 font-semibold"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Main Professional Data Table */}
      <div className="overflow-x-auto border border-zinc-200 rounded-md">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-[11px] font-mono text-zinc-600 uppercase bg-zinc-50">
              <th className="py-2.5 px-3 font-semibold">Case ID</th>
              <th className="py-2.5 px-3 font-semibold">Category</th>
              <th className="py-2.5 px-3 font-semibold">Title & Symptom</th>
              <th className="py-2.5 px-3 font-semibold">OSI Layer</th>
              <th className="py-2.5 px-3 font-semibold">Concept Tag</th>
              <th className="py-2.5 px-3 font-semibold">Severity</th>
              <th className="py-2.5 px-3 font-semibold">Review Status</th>
              <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filteredCases.map((c) => {
              const isSelected = c.case_id === selectedCaseId;
              return (
                <tr
                  key={c.case_id}
                  className={`hover:bg-zinc-50/80 transition-colors ${
                    isSelected ? 'bg-zinc-100/70 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold text-zinc-900">
                    {c.case_id}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-bold text-zinc-900">{c.title}</div>
                    <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{c.symptom}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-zinc-600">
                    {c.osi_layer}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-zinc-500">
                    {c.concept}
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
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => {
                          onSelectCase(c);
                          onNavigateTab('diagnosis');
                        }}
                        className="px-2 py-1 text-xs font-semibold rounded bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
                      >
                        Diagnose
                      </button>
                      <button
                        onClick={() => {
                          onSelectCase(c);
                          onNavigateTab('review');
                        }}
                        className="px-2 py-1 text-xs font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => {
                          onSelectCase(c);
                          onNavigateTab('verification');
                        }}
                        className="px-2 py-1 text-xs font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors"
                      >
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredCases.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-zinc-500 text-xs">
                  No network troubleshooting tickets found matching your search and filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
