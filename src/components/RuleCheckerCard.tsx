import React from 'react';
import { RuleCheckSummary } from '../types';
import { ShieldAlert, ShieldCheck, Play, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface RuleCheckerCardProps {
  summary: RuleCheckSummary | null;
  loading: boolean;
  onRunRuleCheck: () => void;
}

export const RuleCheckerCard: React.FC<RuleCheckerCardProps> = ({
  summary,
  loading,
  onRunRuleCheck
}) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs p-5 space-y-4">
      
      {/* Header & Run Action */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200">
            <ShieldAlert className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-mono">
              Deterministic Python Network Rule Engine
            </h3>
            <p className="text-[11px] text-zinc-500">
              Evaluates 6 deterministic CLI network constraints (IP Duplicate, Mask, Gateway, Link, VLAN, Routing)
            </p>
          </div>
        </div>

        <button
          onClick={onRunRuleCheck}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-zinc-900 hover:bg-zinc-800 text-white transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Executing Rules...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run 6 Rule Checks</span>
            </>
          )}
        </button>
      </div>

      {/* Results View */}
      {summary ? (
        <div className="space-y-3">
          {/* Aggregate Summary Banner */}
          <div
            className={`p-3 rounded-md border flex items-center justify-between ${
              summary.has_failures
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-medium">
              {summary.has_failures ? (
                <XCircle className="w-4 h-4 text-amber-700 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              <span className="font-semibold">{summary.summary}</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-zinc-200">
              {summary.failed_count} / {summary.total_checks} Checks Failed
            </span>
          </div>

          {/* Individual Rule Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {summary.results.map((rule) => {
              const isPass = rule.status === 'PASS';
              return (
                <div
                  key={rule.rule_id}
                  className={`p-3 rounded-md border space-y-1.5 transition-all ${
                    isPass
                      ? 'bg-zinc-50 border-zinc-200'
                      : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] font-bold text-zinc-500">
                      {rule.rule_id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-zinc-900">
                    {rule.rule_name}
                  </h4>

                  <p className="text-[11px] text-zinc-600 line-clamp-2">
                    {rule.evidence}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-zinc-500 text-xs border border-dashed border-zinc-200 rounded-md">
          Click "Run 6 Rule Checks" to execute deterministic Python network rules on this ticket.
        </div>
      )}

    </div>
  );
};
