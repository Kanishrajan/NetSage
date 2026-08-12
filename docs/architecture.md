# NetSage AI - System Architecture

NetSage AI is an evidence-driven network troubleshooting platform with human review.

```
Evidence → Deterministic Rule Checks → AI Diagnosis → Human Review → Fix → Verification
```

## System Components

1. **Troubleshooting Case Repository (`data/cases.json`, `data/cases.csv`)**
   - Contains 30+ structured network troubleshooting scenarios covering VLAN, Gateway, DHCP, DNS, Routing, ACL, NAT, and Wireless.
   - Includes real CLI show command outputs (`show ip route`, `show vlan brief`, `show interfaces trunk`, etc.).

2. **Deterministic Rule Engine (`checker/`)**
   - Executes 6 deterministic rule checks:
     - `IP001`: Duplicate IP address conflict detection
     - `MASK002`: Subnet mask & wildcard mask validation
     - `GW003`: Default gateway subnet matching
     - `IF004`: Interface operational status (down/down check)
     - `VL005`: VLAN membership & switch database check
     - `RT006`: Routing table reachability check

3. **LLM Diagnosis Engine (`ai/`)**
   - Utilizes Google Gemini API (`gemini-3.6-flash`) with structured output enforcement.
   - Validates responses using Pydantic schemas (`DiagnosisResponse`).
   - Grounding evidence extracted directly from CLI show outputs.
   - Includes automatic Demo Mode fallback when API keys are unconfigured.

4. **Human Review System (`data/review_log.csv`)**
   - Human reviewers review AI diagnosis outputs and select: ACCEPTED, EDITED, or REJECTED.
   - Enforces reviewer rationale on modifications.
   - Logs reviews for Responsible AI tracking.
   - Documents 5 key edge cases where human reviewers corrected AI hallucinations.

5. **Fix & Verification Engine (`data/verification_log.csv`)**
   - Generates exact Cisco CLI configuration commands to resolve the issue.
   - Simulates verification commands (`ping`, `traceroute`, `show ip route`).
   - Tracks verification status: `VERIFIED_FIXED`, `NOT_FIXED`, or `NEEDS_MORE_TESTING`.

6. **Analytics & Evaluation Dashboard**
   - Visualizes category breakdowns, severity metrics, AI vs Human agreement %, rule check failure rates, and Responsible AI logs.
