import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CasesTableView } from './components/CasesTableView';
import { CaseDetailView } from './components/CaseDetailView';
import { RuleCheckerCard } from './components/RuleCheckerCard';
import { AiDiagnosisCard } from './components/AiDiagnosisCard';
import { HumanReviewSection } from './components/HumanReviewSection';
import { FixVerificationCard } from './components/FixVerificationCard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ResponsibleAiLog } from './components/ResponsibleAiLog';
import { DocumentationView } from './components/DocumentationView';
import { NetworkCase, RuleCheckSummary, DiagnosisResponse, HumanReview, VerificationResult, EvaluationMetrics } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  
  const [cases, setCases] = useState<NetworkCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<NetworkCase | null>(null);
  const [ruleSummary, setRuleSummary] = useState<RuleCheckSummary | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResponse | null>(null);
  const [reviews, setReviews] = useState<HumanReview[]>([]);
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null);

  const [loadingCases, setLoadingCases] = useState(true);
  const [runningRules, setRunningRules] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);
  const [savingReview, setSavingReview] = useState(false);
  const [loggingVerification, setLoggingVerification] = useState(false);

  // Fetch initial dataset from backend API
  useEffect(() => {
    fetchCases();
    fetchReviews();
    fetchVerifications();
    fetchEvaluation();
  }, []);

  const fetchCases = async () => {
    try {
      setLoadingCases(true);
      const res = await fetch('/api/cases');
      const data = await res.json();
      if (data.success && data.cases.length > 0) {
        setCases(data.cases);
        if (!selectedCase) {
          setSelectedCase(data.cases[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch cases:', err);
    } finally {
      setLoadingCases(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const fetchVerifications = async () => {
    try {
      const res = await fetch('/api/verifications');
      const data = await res.json();
      if (data.success) {
        setVerifications(data.verifications);
      }
    } catch (err) {
      console.error('Failed to fetch verifications:', err);
    }
  };

  const fetchEvaluation = async () => {
    try {
      const res = await fetch('/api/evaluation');
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error('Failed to fetch evaluation metrics:', err);
    }
  };

  const handleRefreshAll = async () => {
    await Promise.all([
      fetchCases(),
      fetchReviews(),
      fetchVerifications(),
      fetchEvaluation()
    ]);
  };

  // Reset diagnosis/rules when case changes
  const handleSelectCase = (c: NetworkCase) => {
    setSelectedCase(c);
    setRuleSummary(null);
    setDiagnosis(null);
  };

  // Run Deterministic Rule Checks
  const handleRunRuleChecks = async () => {
    if (!selectedCase) return;
    try {
      setRunningRules(true);
      const res = await fetch('/api/rule-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCase)
      });
      const data = await res.json();
      if (data.success) {
        setRuleSummary(data);
      }
    } catch (err) {
      console.error('Rule check failed:', err);
    } finally {
      setRunningRules(false);
    }
  };

  // Run LLM Diagnosis Engine
  const handleDiagnose = async () => {
    if (!selectedCase) return;
    try {
      setDiagnosing(true);
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCase)
      });
      const data = await res.json();
      if (data.success) {
        setDiagnosis(data.diagnosis);
      }
    } catch (err) {
      console.error('Diagnosis failed:', err);
    } finally {
      setDiagnosing(false);
    }
  };

  // Save Human Review
  const handleSaveReview = async (reviewData: Partial<HumanReview>) => {
    try {
      setSavingReview(true);
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (data.success) {
        await fetchReviews();
        await fetchEvaluation();
        alert(`Human review successfully saved as: ${data.review.reviewer_decision}`);
      }
    } catch (err) {
      console.error('Failed to save review:', err);
    } finally {
      setSavingReview(false);
    }
  };

  // Log Fix Verification
  const handleVerify = async (verificationData: Partial<VerificationResult>) => {
    try {
      setLoggingVerification(true);
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationData)
      });
      const data = await res.json();
      if (data.success) {
        await fetchVerifications();
        alert(`Fix verification logged successfully with status: ${data.verification.status}`);
      }
    } catch (err) {
      console.error('Failed to log verification:', err);
    } finally {
      setLoggingVerification(false);
    }
  };

  // Map case review decisions
  const reviewStatusMap: Record<string, string> = {};
  reviews.forEach((r) => {
    if (!reviewStatusMap[r.case_id]) {
      reviewStatusMap[r.case_id] = r.reviewer_decision;
    }
  });

  const existingReview = selectedCase
    ? reviews.find((r) => r.case_id === selectedCase.case_id) || null
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex font-sans antialiased">
      
      {/* Enterprise Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        caseCount={cases.length}
        reviewedCount={reviews.length}
        verifiedCount={verifications.length}
        selectedCaseId={selectedCase?.case_id || null}
      />

      {/* Right Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <HeaderBar
          activeTab={activeTab}
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={handleSelectCase}
          onRefreshData={handleRefreshAll}
        />

        {/* Main Content Body */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          
          {/* SCREEN 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <OverviewDashboard
              cases={cases}
              reviews={reviews}
              metrics={metrics}
              onSelectCase={handleSelectCase}
              onNavigateTab={setActiveTab}
              reviewStatusMap={reviewStatusMap}
            />
          )}

          {/* SCREEN 2: TROUBLESHOOTING CASES TABLE */}
          {activeTab === 'cases' && (
            <CasesTableView
              cases={cases}
              selectedCaseId={selectedCase?.case_id || null}
              onSelectCase={handleSelectCase}
              onNavigateTab={setActiveTab}
              reviewStatusMap={reviewStatusMap}
            />
          )}

          {/* SCREEN 3: DIAGNOSIS & EVIDENCE DEEP DIVE */}
          {activeTab === 'diagnosis' && (
            <div className="space-y-6">
              {selectedCase ? (
                <>
                  {/* Case Details & CLI Show Commands */}
                  <CaseDetailView caseData={selectedCase} />

                  {/* Deterministic Rule Engine */}
                  <RuleCheckerCard
                    summary={ruleSummary}
                    loading={runningRules}
                    onRunRuleCheck={handleRunRuleChecks}
                  />

                  {/* Gemini AI Diagnosis Engine */}
                  <AiDiagnosisCard
                    diagnosis={diagnosis}
                    loading={diagnosing}
                    onDiagnose={handleDiagnose}
                  />

                  {/* Navigation shortcut footer */}
                  <div className="p-4 bg-white border border-zinc-200 rounded-lg flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-600">Next step in pipeline: Proceed to Senior Engineer Sign-off</span>
                    <button
                      onClick={() => setActiveTab('review')}
                      className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded transition-colors"
                    >
                      Open Human Review Panel →
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-zinc-500 text-xs bg-white rounded-lg border border-zinc-200">
                  Select a ticket from the Cases list to view CLI evidence and diagnose.
                </div>
              )}
            </div>
          )}

          {/* SCREEN 4: HUMAN REVIEW & OVERSIGHT */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              {selectedCase ? (
                <>
                  {/* Context bar */}
                  <div className="p-3 bg-zinc-900 text-zinc-100 rounded-lg border border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-emerald-400">Reviewing Ticket #{selectedCase.case_id}:</span> {selectedCase.title} ({selectedCase.category})
                    </div>
                    <span className="text-zinc-400">{selectedCase.symptom}</span>
                  </div>

                  <HumanReviewSection
                    caseId={selectedCase.case_id}
                    currentDiagnosis={diagnosis}
                    existingReview={existingReview}
                    onSaveReview={handleSaveReview}
                    saving={savingReview}
                  />
                </>
              ) : (
                <div className="p-12 text-center text-zinc-500 text-xs bg-white rounded-lg border border-zinc-200">
                  Select a ticket to conduct human review sign-off.
                </div>
              )}
            </div>
          )}

          {/* SCREEN 5: FIX VERIFICATION SUITE */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              {selectedCase ? (
                <>
                  {/* Context bar */}
                  <div className="p-3 bg-zinc-900 text-zinc-100 rounded-lg border border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-emerald-400">Verifying Ticket #{selectedCase.case_id}:</span> {selectedCase.title}
                    </div>
                    <span className="text-zinc-400">Method: {selectedCase.verification_method}</span>
                  </div>

                  <FixVerificationCard
                    caseData={selectedCase}
                    verifications={verifications}
                    onVerify={handleVerify}
                    loading={loggingVerification}
                  />
                </>
              ) : (
                <div className="p-12 text-center text-zinc-500 text-xs bg-white rounded-lg border border-zinc-200">
                  Select a ticket to verify post-fix CLI commands.
                </div>
              )}
            </div>
          )}

          {/* SCREEN 6: ANALYTICS & EVALUATION */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard metrics={metrics} />
          )}

          {/* SCREEN 7: RESPONSIBLE AI AUDIT LOG */}
          {activeTab === 'responsible_ai' && (
            <ResponsibleAiLog reviews={reviews} />
          )}

          {/* SCREEN 8: PACKET TRACER SCENARIO GUIDE */}
          {activeTab === 'docs' && (
            <DocumentationView />
          )}

        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-zinc-200 py-3 px-6 text-center text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>NetSage AI — Evidence-Grounded Cisco Network Troubleshooting Platform</span>
          <span>Enterprise NOC Edition v2.4</span>
        </footer>

      </div>

    </div>
  );
}
