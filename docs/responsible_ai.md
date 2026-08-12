# Responsible AI Principles & Human Oversight

NetSage AI operates under strict Responsible AI principles for critical infrastructure:

1. **Human Authority**: AI recommendations are strictly advisory. The system NEVER autonomously applies router or switch configuration changes.
2. **Mandatory Human Review**: Every diagnosis must undergo human review (ACCEPTED, EDITED, or REJECTED) before proceeding to fix verification.
3. **Audit Logging**: All human reviews, corrections, and reviewer rationales are logged in `data/review_log.csv`.
4. **Disagreements & AI Correction**: The platform explicitly highlights cases where human reviewers corrected AI misdiagnoses (e.g. 5 pre-documented edge cases in dataset).
5. **Transparency**: The UI clearly displays AI confidence scores, grounding evidence, and rule engine check status.
