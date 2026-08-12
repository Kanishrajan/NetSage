import React, { useState } from 'react';
import { VerificationResult, NetworkCase } from '../types';
import { Terminal, CheckCircle2, Play, AlertOctagon, HelpCircle, History } from 'lucide-react';

interface FixVerificationCardProps {
  caseData: NetworkCase;
  verifications: VerificationResult[];
  onVerify: (data: Partial<VerificationResult>) => void;
  loading: boolean;
}

export const FixVerificationCard: React.FC<FixVerificationCardProps> = ({
  caseData,
  verifications,
  onVerify,
  loading
}) => {
  const [status, setStatus] = useState<'VERIFIED_FIXED' | 'NOT_FIXED' | 'NEEDS_MORE_TESTING'>('VERIFIED_FIXED');
  const [method, setMethod] = useState(caseData.verification_method || 'ping test');
  const [output, setOutput] = useState(
    `Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to target, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`
  );
  const [notes, setNotes] = useState('Configuration applied and verified in Packet Tracer topology.');

  const caseVerifications = verifications.filter((v) => v.case_id === caseData.case_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify({
      case_id: caseData.case_id,
      status,
      method,
      command_output: output,
      notes
    });
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs p-5 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Terminal className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-mono">
              Fix Verification & Post-Check Suite
            </h3>
            <p className="text-[11px] text-zinc-500">
              A proposed configuration fix must be verified with active test commands before ticket closure
            </p>
          </div>
        </div>

        {caseVerifications.length > 0 && (
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Status: {caseVerifications[0].status}
          </span>
        )}
      </div>

      {/* Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Status Selection */}
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
              Verification Outcome
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full p-2 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 font-mono"
            >
              <option value="VERIFIED_FIXED">VERIFIED_FIXED (Success)</option>
              <option value="NOT_FIXED">NOT_FIXED (Fail)</option>
              <option value="NEEDS_MORE_TESTING">NEEDS_MORE_TESTING (Inconclusive)</option>
            </select>
          </div>

          {/* Method */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
              Verification Method / Command
            </label>
            <input
              type="text"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 font-mono"
            />
          </div>
        </div>

        {/* Console Command Output */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
            Observed Verification CLI Log
          </label>
          <textarea
            rows={3}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="w-full p-2.5 font-mono text-xs rounded-md border border-zinc-800 bg-zinc-950 text-emerald-400 focus:ring-1 focus:ring-zinc-800"
          />
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
            Verification Notes
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-bold rounded-md shadow-2xs transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{loading ? 'Logging Verification...' : 'Log Fix Verification'}</span>
          </button>
        </div>

      </form>

      {/* History Log */}
      {caseVerifications.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-zinc-200">
          <h4 className="text-xs font-mono font-bold text-zinc-800 flex items-center space-x-1.5 uppercase">
            <History className="w-3.5 h-3.5 text-zinc-500" />
            <span>Verification Audit History ({caseVerifications.length})</span>
          </h4>
          <div className="space-y-1.5">
            {caseVerifications.map((v) => (
              <div
                key={v.verification_id}
                className="p-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-zinc-900 mr-2">{v.method}</span>
                  <span className="text-zinc-600 text-[11px]">{v.notes}</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
