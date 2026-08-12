import React, { useState } from 'react';
import { HumanReview } from '../types';
import { ShieldCheck, CheckCircle2, Edit3, XCircle, Filter, Search } from 'lucide-react';

interface ResponsibleAiLogProps {
  reviews: HumanReview[];
}

export const ResponsibleAiLog: React.FC<ResponsibleAiLogProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<'ALL' | 'ACCEPTED' | 'EDITED' | 'REJECTED'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = reviews.filter((r) => {
    const matchesFilter = filter === 'ALL' || r.reviewer_decision === filter;
    const matchesSearch =
      r.case_id.toLowerCase().includes(search.toLowerCase()) ||
      r.reviewer_reason.toLowerCase().includes(search.toLowerCase()) ||
      r.ai_root_cause.toLowerCase().includes(search.toLowerCase()) ||
      r.corrected_root_cause.toLowerCase().includes(search.toLowerCase()) ||
      r.reviewer_name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Governance Banner */}
      <div className="bg-zinc-900 text-zinc-100 rounded-lg p-5 border border-zinc-800 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zinc-800 border border-zinc-700 rounded text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-mono tracking-tight text-white">
              Responsible AI Governance & Human Audit Log
            </h2>
            <p className="text-xs text-zinc-400">
              AI recommendations are strictly advisory. Human overrides, corrections, and rationales are permanently audited.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-zinc-950/80 rounded border border-zinc-800 space-y-0.5">
            <span className="font-mono font-bold text-emerald-400 text-[11px] uppercase block">1. Human Control</span>
            <span className="text-zinc-300">NetSage AI never autonomously modifies switch or router configuration files.</span>
          </div>
          <div className="p-3 bg-zinc-950/80 rounded border border-zinc-800 space-y-0.5">
            <span className="font-mono font-bold text-zinc-300 text-[11px] uppercase block">2. Mandatory Audit</span>
            <span className="text-zinc-300">Every decision (Accepted, Edited, Rejected) requires reviewer identity & rationale.</span>
          </div>
          <div className="p-3 bg-zinc-950/80 rounded border border-zinc-800 space-y-0.5">
            <span className="font-mono font-bold text-amber-400 text-[11px] uppercase block">3. Disagreement Log</span>
            <span className="text-zinc-300">Explicitly tracks edge cases where senior engineers corrected model outputs.</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-lg border border-zinc-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search audit log by case, reason, cause, reviewer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 focus:ring-1 focus:ring-zinc-800"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="font-mono font-medium text-zinc-500 uppercase">Decision Filter:</span>
          {(['ALL', 'ACCEPTED', 'EDITED', 'REJECTED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-all ${
                filter === f
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* Review Log List */}
      <div className="space-y-3">
        {filtered.map((rev) => {
          const isAccepted = rev.reviewer_decision === 'ACCEPTED';
          const isEdited = rev.reviewer_decision === 'EDITED';
          const isRejected = rev.reviewer_decision === 'REJECTED';

          return (
            <div
              key={rev.review_id}
              className={`p-4 rounded-lg border space-y-3 bg-white shadow-2xs transition-all ${
                isRejected
                  ? 'border-rose-200'
                  : isEdited
                  ? 'border-blue-200'
                  : 'border-zinc-200'
              }`}
            >
              
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-900 text-white">
                    TICKET #{rev.case_id}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">
                    Audit ID: {rev.review_id}
                  </span>
                  <span className="text-xs text-zinc-500">
                    Signed off by <strong className="text-zinc-900 font-mono">{rev.reviewer_name}</strong>
                  </span>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded border flex items-center space-x-1 ${
                    isAccepted
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isEdited
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {isAccepted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isEdited && <Edit3 className="w-3.5 h-3.5 text-blue-600" />}
                  {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                  <span>{rev.reviewer_decision}</span>
                </span>
              </div>

              {/* Original AI Cause vs Corrected */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-md space-y-1">
                  <span className="font-mono font-bold text-zinc-600 text-[10px] uppercase block">
                    Original AI Proposed Cause
                  </span>
                  <p className="text-zinc-800 leading-snug">
                    {rev.ai_root_cause}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-md border space-y-1 ${
                    isAccepted
                      ? 'bg-zinc-50 border-zinc-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <span className="font-mono font-bold text-zinc-700 text-[10px] uppercase block">
                    {isAccepted ? 'Accepted Diagnosis' : 'Human Corrected Diagnosis'}
                  </span>
                  <p className="text-zinc-900 font-semibold leading-snug">
                    {rev.corrected_root_cause}
                  </p>
                </div>
              </div>

              {/* Reviewer Rationale Note */}
              <div className="p-2.5 bg-zinc-50 rounded-md border border-zinc-200 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-zinc-600 uppercase text-[11px]">Rationale:</span>
                  <span className="text-zinc-800">{rev.reviewer_reason}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {new Date(rev.timestamp).toLocaleString()}
                </span>
              </div>

            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-zinc-500 text-xs bg-white rounded-lg border border-zinc-200">
            No human review audit records found matching your criteria.
          </div>
        )}
      </div>

    </div>
  );
};
