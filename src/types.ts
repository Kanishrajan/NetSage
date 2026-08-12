export interface NetworkCase {
  case_id: string;
  title: string;
  category: 'VLAN' | 'Gateway' | 'DHCP' | 'DNS' | 'Routing' | 'ACL' | 'NAT' | 'Wireless' | string;
  symptom: string;
  topology_note: string;
  show_outputs: string | Record<string, string>;
  expected_fault: string;
  osi_layer: 'Layer 1' | 'Layer 2' | 'Layer 3' | 'Layer 4' | 'Layer 7' | string;
  concept: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expected_next_command: string;
  expected_fix: string;
  verification_method: string;
}

export interface RuleCheckResult {
  rule_id: string;
  rule_name: string;
  status: 'PASS' | 'FAIL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence: string;
  explanation: string;
}

export interface RuleCheckSummary {
  case_id: string;
  has_failures: boolean;
  total_checks: number;
  failed_count: number;
  results: RuleCheckResult[];
  summary: string;
}

export interface DiagnosisResponse {
  root_cause: string;
  confidence: number;
  osi_layer: string;
  evidence: string[];
  next_command: string;
  fix_steps: string[];
  is_demo?: boolean;
}

export interface HumanReview {
  review_id: string;
  case_id: string;
  ai_root_cause: string;
  reviewer_decision: 'ACCEPTED' | 'EDITED' | 'REJECTED';
  corrected_root_cause: string;
  reviewer_reason: string;
  timestamp: string;
  reviewer_name: string;
}

export interface VerificationResult {
  verification_id: string;
  case_id: string;
  status: 'VERIFIED_FIXED' | 'NOT_FIXED' | 'NEEDS_MORE_TESTING';
  method: string;
  command_output: string;
  notes: string;
  timestamp: string;
}

export interface EvaluationMetrics {
  total_cases: number;
  categories: Record<string, number>;
  severities: Record<string, number>;
  reviews_summary: {
    total_reviewed: number;
    accepted: number;
    edited: number;
    rejected: number;
    human_agreement_pct: number;
  };
  dataset_agreement_rate: number;
  rule_ai_agreement_rate: number;
}
