import React from 'react';
import { DiagnosisResponse } from '../types';
import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, Terminal, AlertCircle, ShieldCheck } from 'lucide-react';

interface AiDiagnosisCardProps {
  diagnosis: DiagnosisResponse | null;
  loading: boolean;
  onDiagnose: () => void;
}

export const AiDiagnosisCard: React.FC<AiDiagnosisCardProps> = ({
  diagnosis,
  loading,
  onDiagnose
}) => {
  const getConfidenceBadge = (confidence: number) => {
    const pct = Math.round(confidence * 100);
    if (pct >= 85) {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        text: `${pct}% High Confidence`
      };
    } else if (pct >= 70) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        text: `${pct}% Moderate Confidence`
      };
    }
    return {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      text: `${pct}% Low Confidence`
    };
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs p-5 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Sparkles className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-zinc-900 font-mono">
                LLM Diagnosis Engine
              </h3>
              {diagnosis?.is_demo && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500">
              Pydantic-structured network diagnosis backed by grounded CLI evidence
            </p>
          </div>
        </div>

        <button
          onClick={onDiagnose}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-zinc-900 hover:bg-zinc-800 text-white transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing CLI Outputs...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Diagnosis</span>
            </>
          )}
        </button>
      </div>

      {/* Diagnosis Output */}
      {diagnosis ? (
        <div className="space-y-4">
          
          {/* Root Cause Banner */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>IDENTIFIED ROOT CAUSE</span>
              </span>

              {/* Confidence & Layer */}
              <div className="flex items-center space-x-2 font-mono">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getConfidenceBadge(diagnosis.confidence).bg}`}>
                  {getConfidenceBadge(diagnosis.confidence).text}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 border border-zinc-300">
                  {diagnosis.osi_layer}
                </span>
              </div>
            </div>

            <p className="text-xs font-bold text-zinc-900 leading-relaxed font-sans">
              {diagnosis.root_cause}
            </p>
          </div>

          {/* Grounded CLI Evidence vs AI Inference */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-800 uppercase font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Grounded CLI Evidence Facts ({diagnosis.evidence.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-zinc-500">Extracted from raw Cisco show commands</span>
            </div>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-md space-y-1.5 text-xs font-mono">
              {diagnosis.evidence.map((ev, i) => (
                <div key={i} className="flex items-start space-x-2 text-zinc-800">
                  <span className="text-emerald-600 font-bold shrink-0">[FACT #{i + 1}]</span>
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Command & Fix Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Recommended Next Command */}
            <div className="p-3 bg-zinc-900 text-zinc-100 rounded-md border border-zinc-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1 uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>Recommended Next Command</span>
              </span>
              <p className="font-mono text-xs text-emerald-300 bg-zinc-950 p-2 rounded border border-zinc-800">
                # {diagnosis.next_command}
              </p>
            </div>

            {/* CLI Fix Steps */}
            <div className="p-3 bg-zinc-900 text-zinc-100 rounded-md border border-zinc-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-zinc-300 flex items-center space-x-1 uppercase">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cisco IOS CLI Fix Steps</span>
              </span>
              <div className="bg-zinc-950 p-2 rounded border border-zinc-800 space-y-1 font-mono text-xs text-emerald-300">
                {diagnosis.fix_steps.map((step, idx) => (
                  <div key={idx} className="leading-tight">
                    <span className="text-zinc-500 mr-2">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-6 text-center text-zinc-500 text-xs border border-dashed border-zinc-200 rounded-md">
          Click "Generate AI Diagnosis" to execute Gemini LLM analysis on this ticket's CLI evidence.
        </div>
      )}

    </div>
  );
};
