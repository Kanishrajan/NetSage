import json
import os
from .diagnosis import DiagnosisEngine
from checker.rule_checker import RuleChecker

class Evaluator:
    """Evaluates AI diagnosis quality and Rule Engine agreement across dataset cases."""

    @classmethod
    def evaluate_dataset(cls, cases_filepath="data/cases.json"):
        if not os.path.exists(cases_filepath):
            raise FileNotFoundError(f"Cases dataset file not found at {cases_filepath}")

        with open(cases_filepath, "r", encoding="utf-8") as f:
            cases = json.load(f)

        total_cases = len(cases)
        correct_count = 0
        partial_count = 0
        rule_agreement_count = 0
        evaluations = []

        for case in cases:
            diagnosis = DiagnosisEngine.diagnose_case(case)
            rule_check = RuleChecker.run_all_checks(case)

            # Check fault overlap
            exp_fault = case.get("expected_fault", "").lower()
            ai_root = diagnosis.get("root_cause", "").lower()
            exp_osi = case.get("osi_layer", "").lower()
            ai_osi = diagnosis.get("osi_layer", "").lower()

            osi_matches = (exp_osi == ai_osi)
            
            # Simple keyword overlap for root cause match
            exp_words = set(exp_fault.split())
            ai_words = set(ai_root.split())
            common = exp_words.intersection(ai_words)
            overlap_ratio = len(common) / max(len(exp_words), 1)

            if overlap_ratio > 0.4 and osi_matches:
                match_status = "CORRECT"
                correct_count += 1
            elif overlap_ratio > 0.2 or osi_matches:
                match_status = "PARTIALLY_CORRECT"
                partial_count += 1
            else:
                match_status = "INCORRECT"

            # Check Rule Engine vs AI agreement
            rule_failed = rule_check.get("has_failures", False)
            # If rule failed and AI detected a fault (confidence > 0.6), that's agreement
            ai_detected = diagnosis.get("confidence", 0) > 0.5
            if (rule_failed and ai_detected) or (not rule_failed and not ai_detected):
                rule_agreement_count += 1
                agreement_status = "AGREED"
            else:
                agreement_status = "DISAGREED"

            evaluations.append({
                "case_id": case.get("case_id"),
                "category": case.get("category"),
                "severity": case.get("severity"),
                "expected_fault": case.get("expected_fault"),
                "ai_root_cause": diagnosis.get("root_cause"),
                "match_status": match_status,
                "rule_status": "FAIL" if rule_failed else "PASS",
                "agreement_status": agreement_status,
                "confidence": diagnosis.get("confidence")
            })

        agreement_rate = (correct_count + partial_count * 0.5) / max(total_cases, 1) * 100.0
        rule_ai_agreement_rate = (rule_agreement_count / max(total_cases, 1)) * 100.0

        return {
            "total_cases": total_cases,
            "correct_count": correct_count,
            "partial_count": partial_count,
            "incorrect_count": total_cases - (correct_count + partial_count),
            "dataset_agreement_rate": round(agreement_rate, 2),
            "rule_ai_agreement_rate": round(rule_ai_agreement_rate, 2),
            "evaluations": evaluations
        }
