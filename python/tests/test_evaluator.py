from ai.evaluator import Evaluator

def test_evaluator_runs_on_dataset():
    report = Evaluator.evaluate_dataset("data/cases.json")
    assert report["total_cases"] >= 30
    assert report["dataset_agreement_rate"] >= 0.0
    assert report["rule_ai_agreement_rate"] >= 0.0
    assert len(report["evaluations"]) == report["total_cases"]
