import React, { useState, useEffect } from 'react';
import { HumanReview, DiagnosisResponse } from '../types';
import { UserCheck, CheckCircle2, Edit3, XCircle, ShieldCheck } from 'lucide-react';

interface HumanReviewSectionProps {
  caseId: string;
  currentDiagnosis: DiagnosisResponse | null;
  existingReview: HumanReview | null;
  onSaveReview: (reviewData: Partial<HumanReview>) => void;
  saving: boolean;
}

export const HumanReviewSection: React.FC<HumanReviewSectionProps> = ({
  caseId,
  currentDiagnosis,
  existingReview,
  onSaveReview,
  saving
}) => {
  const [decision, setDecision] = useState<'ACCEPTED' | 'EDITED' | 'REJECTED'>(
    existingReview?.reviewer_decision || 'ACCEPTED'
  );
  const [reviewerName, setReviewerName] = useState(
    existingReview?.reviewer_name || 'Senior Network Engineer'
  );
  const [correctedRootCause, setCorrectedRootCause] = useState(
    existingReview?.corrected_root_cause || currentDiagnosis?.root_cause || ''
  );
  const [reason, setReason] = useState(
    existingReview?.reviewer_reason || ''
  );

  // Sync state when caseId or existingReview changes
  useEffect(() => {
    if (existingReview) {
      setDecision(existingReview.reviewer_decision);
      setReviewerName(existingReview.reviewer_name);
      setCorrectedRootCause(existingReview.corrected_root_cause);
      setReason(existingReview.reviewer_reason);
    } else {
      setDecision('ACCEPTED');
      setCorrectedRootCause(currentDiagnosis?.root_cause || '');
      setReason('');
    }
  }, [caseId, existingReview, currentDiagnosis]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please enter a reviewer rationale or reason.');
      return;
    }

    onSaveReview({
      case_id: caseId,
      ai_root_cause: currentDiagnosis?.root_cause || 'CLI evidence evaluated',
      reviewer_decision: decision,
      corrected_root_cause: decision === 'ACCEPTED' ? (currentDiagnosis?.root_cause || '') : correctedRootCause,
      reviewer_reason: reason,
      reviewer_name: reviewerName
    });
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs p-5 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200">
            <UserCheck className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-mono">
              Human Review & Oversight Sign-off Panel
            </h3>
            <p className="text-[11px] text-zinc-500">
              Senior engineer approval required before applying configuration changes to production switches/routers
            </p>
          </div>
        </div>

        {existingReview && (
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Review Status: {existingReview.reviewer_decision}
          </span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Decision Toggle Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => {
              setDecision('ACCEPTED');
              if (currentDiagnosis) setCorrectedRootCause(currentDiagnosis.root_cause);
            }}
            className={`p-3 rounded-md border flex flex-col items-center justify-center space-y-1.5 transition-all ${
              decision === 'ACCEPTED'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-mono">ACCEPT DIAGNOSIS</span>
          </button>

          <button
            type="button"
            onClick={() => setDecision('EDITED')}
            className={`p-3 rounded-md border flex flex-col items-center justify-center space-y-1.5 transition-all ${
              decision === 'EDITED'
                ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-2xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Edit3 className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-mono">EDIT DIAGNOSIS</span>
          </button>

          <button
            type="button"
            onClick={() => setDecision('REJECTED')}
            className={`p-3 rounded-md border flex flex-col items-center justify-center space-y-1.5 transition-all ${
              decision === 'REJECTED'
                ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-2xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <XCircle className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-mono">REJECT DIAGNOSIS</span>
          </button>
        </div>

        {/* Corrected Root Cause Field (If EDITED or REJECTED) */}
        {(decision === 'EDITED' || decision === 'REJECTED') && (
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
              Human Corrected Root Cause <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={correctedRootCause}
              onChange={(e) => setCorrectedRootCause(e.target.value)}
              placeholder="Enter corrected technical root cause derived from show command analysis..."
              className="w-full p-2.5 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 focus:ring-1 focus:ring-zinc-800"
            />
          </div>
        )}

        {/* Reviewer Name & Rationale Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1 md:col-span-1">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
              Reviewer Name / Role
            </label>
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full p-2 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900 font-mono"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase">
              Reviewer Rationale & Audit Notes <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., AI diagnosis matches 'show vlan brief' output and default gateway subnet."
              className="w-full p-2 text-xs rounded-md border border-zinc-300 bg-white text-zinc-900"
            />
          </div>
        </div>

        {/* Submit Review Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold rounded-md shadow-2xs transition-colors disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{saving ? 'Recording Review...' : 'Save Human Sign-off'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
