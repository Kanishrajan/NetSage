import json
import os

def main():
    from ai.evaluator import Evaluator
    print("--- Running NetSage AI Dataset Evaluation ---")
    report = Evaluator.evaluate_dataset("data/cases.json")
    
    print(f"Total Cases Evaluated: {report['total_cases']}")
    print(f"Correct Diagnoses: {report['correct_count']}")
    print(f"Partially Correct: {report['partial_count']}")
    print(f"Incorrect: {report['incorrect_count']}")
    print(f"Dataset Agreement Rate: {report['dataset_agreement_rate']}%")
    print(f"Rule/AI Agreement Rate: {report['rule_ai_agreement_rate']}%")
    
    output_path = os.path.join("data", "evaluation_report.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"Report saved to {output_path}")

if __name__ == "__main__":
    main()
