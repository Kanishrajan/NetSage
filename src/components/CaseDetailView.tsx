import React, { useState } from 'react';
import { NetworkCase } from '../types';
import { Terminal, Network, AlertCircle, ChevronDown, ChevronRight, FileCode, CheckCircle2, Copy } from 'lucide-react';

interface CaseDetailViewProps {
  caseData: NetworkCase;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({ caseData }) => {
  const [copied, setCopied] = useState(false);
  const [openCommand, setOpenCommand] = useState<string | null>(null);

  // Parse show_outputs into JSON map if needed
  let showCommands: Record<string, string> = {};
  if (typeof caseData.show_outputs === 'string') {
    try {
      showCommands = JSON.parse(caseData.show_outputs);
    } catch {
      showCommands = { 'raw_output': caseData.show_outputs };
    }
  } else if (typeof caseData.show_outputs === 'object') {
    showCommands = caseData.show_outputs || {};
  }

  const handleCopyFix = () => {
    navigator.clipboard.writeText(caseData.expected_fix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs p-5 space-y-5">
      
      {/* Ticket Header & Taxonomy */}
      <div className="border-b border-zinc-200 pb-4 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-900 text-white rounded">
              TICKET #{caseData.case_id}
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded border border-zinc-200">
              {caseData.category}
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded border border-zinc-200">
              {caseData.osi_layer}
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getSeverityBadge(caseData.severity)}`}>
              {caseData.severity}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-zinc-500 font-mono">
            <span>Concept Tag:</span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-semibold border border-zinc-200">
              {caseData.concept}
            </span>
          </div>
        </div>

        <h2 className="text-base font-bold text-zinc-900">
          {caseData.title}
        </h2>
      </div>

      {/* Symptom & Topology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Symptom */}
        <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-md space-y-1">
          <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Observed Network Symptom</span>
          </div>
          <p className="text-xs text-zinc-800 leading-relaxed font-sans">
            {caseData.symptom}
          </p>
        </div>

        {/* Topology Note */}
        <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-md space-y-1">
          <div className="flex items-center space-x-2 text-zinc-800 font-bold text-xs">
            <Network className="w-4 h-4 text-zinc-600" />
            <span>Topology & Device Constraints</span>
          </div>
          <p className="text-xs text-zinc-800 leading-relaxed font-sans">
            {caseData.topology_note}
          </p>
        </div>
      </div>

      {/* Cisco CLI Show Commands Outputs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-900 flex items-center space-x-2 uppercase font-mono">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <span>Recorded Cisco CLI Show Command Outputs ({Object.keys(showCommands).length})</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-500">Cisco Packet Tracer Ground Truth Evidence</span>
        </div>

        <div className="space-y-2">
          {Object.entries(showCommands).map(([cmd, output]) => {
            const isOpen = openCommand === cmd || openCommand === null; // default open
            return (
              <div
                key={cmd}
                className="border border-zinc-800 rounded-md overflow-hidden bg-zinc-950 text-zinc-100 font-mono text-xs shadow-inner"
              >
                <button
                  onClick={() => setOpenCommand(isOpen && openCommand === cmd ? '' : cmd)}
                  className="w-full px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 flex items-center justify-between text-left transition-colors border-b border-zinc-800"
                >
                  <span className="font-mono font-bold text-emerald-400"># {cmd}</span>
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />}
                </button>

                {isOpen && (
                  <pre className="p-3 overflow-x-auto text-[11px] leading-snug font-mono text-emerald-300 bg-zinc-950 whitespace-pre-wrap select-text">
                    {output}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Expected Fix CLI Box */}
      <div className="p-3.5 bg-zinc-900 text-zinc-100 rounded-md border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 font-mono">
            <FileCode className="w-4 h-4" />
            <span>Expected Cisco IOS Fix Commands</span>
          </div>
          <button
            onClick={handleCopyFix}
            className="flex items-center space-x-1 px-2 py-1 text-[10px] font-mono font-bold rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy CLI Commands</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-2.5 bg-zinc-950 rounded text-xs font-mono text-emerald-400 whitespace-pre-wrap">
          {caseData.expected_fix}
        </pre>
      </div>

    </div>
  );
};
