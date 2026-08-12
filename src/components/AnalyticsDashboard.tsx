import React from 'react';
import { EvaluationMetrics } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Database, ShieldCheck, Layers, TrendingUp, AlertTriangle } from 'lucide-react';

interface AnalyticsDashboardProps {
  metrics: EvaluationMetrics | null;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs font-mono">
        Loading operational analytics metrics...
      </div>
    );
  }

  const categoryData = Object.entries(metrics.categories || {}).map(([name, value]) => ({
    name,
    value
  }));

  const severityData = Object.entries(metrics.severities || {}).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#10b981', '#2563eb', '#f59e0b', '#e11d48'];

  const reviewsSummary = metrics.reviews_summary || {
    total_reviewed: 6,
    accepted: 4,
    edited: 1,
    rejected: 1,
    human_agreement_pct: 85
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Cases */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Troubleshooting Cases</span>
            <Database className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">{metrics.total_cases}</span>
            <span className="text-xs text-zinc-500 font-mono">Scenarios</span>
          </div>
          <p className="text-[11px] text-zinc-500">Cisco Packet Tracer scenarios</p>
        </div>

        {/* Categories Covered */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Network Categories</span>
            <Layers className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">
              {Object.keys(metrics.categories || {}).length} / 8
            </span>
            <span className="text-xs text-zinc-500 font-mono">Taxonomy</span>
          </div>
          <p className="text-[11px] text-zinc-500">Layer 1 to Layer 7 protocols</p>
        </div>

        {/* AI vs Human Agreement */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">AI / Human Agreement</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-emerald-900">
              {reviewsSummary.human_agreement_pct}%
            </span>
            <span className="text-xs text-emerald-700 font-mono">Sign-off Rate</span>
          </div>
          <p className="text-[11px] text-zinc-500">Concurrence on diagnosis</p>
        </div>

        {/* Dataset Agreement */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Dataset Accuracy</span>
            <TrendingUp className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">
              {metrics.dataset_agreement_rate}%
            </span>
            <span className="text-xs text-zinc-500 font-mono">Baseline</span>
          </div>
          <p className="text-[11px] text-zinc-500">Rule engine validation</p>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown Bar Chart */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center space-x-2 font-mono">
              <Database className="w-4 h-4 text-zinc-700" />
              <span>Troubleshooting Cases by Network Category</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">8 Core Categories</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'monospace' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                <Tooltip />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Breakdown & Review Decisions */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center space-x-2 font-mono">
              <AlertTriangle className="w-4 h-4 text-zinc-700" />
              <span>Severity Breakdown & Review Decisions</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Severity Pie */}
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`sev-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Review Decision Breakdown */}
            <div className="flex flex-col justify-center space-y-3 bg-zinc-50 p-4 rounded-md border border-zinc-200 font-mono text-xs">
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800">Accepted:</span>
                <span className="font-bold">{reviewsSummary.accepted}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{ width: `${(reviewsSummary.accepted / (reviewsSummary.total_reviewed || 1)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-800">Edited:</span>
                <span className="font-bold">{reviewsSummary.edited}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${(reviewsSummary.edited / (reviewsSummary.total_reviewed || 1)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-800">Rejected:</span>
                <span className="font-bold">{reviewsSummary.rejected}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-rose-600 h-1.5 rounded-full"
                  style={{ width: `${(reviewsSummary.rejected / (reviewsSummary.total_reviewed || 1)) * 100}%` }}
                />
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
