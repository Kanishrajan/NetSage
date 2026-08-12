# NetSage AI - Prompt Engineering & LLM Design

## Prompt Engineering Strategy
NetSage AI uses strict system prompting to constrain the LLM:
- **Evidence-Grounded**: The model is instructed to cite exact facts from CLI `show` outputs.
- **Strict JSON Output**: The model must respond in JSON matching the `DiagnosisResponse` schema.
- **No Hallucinations**: When command outputs are insufficient, confidence is lowered (< 0.70) and `next_command` recommends the missing diagnostic command.
- **Separation of Fact and Inference**: Facts are listed in `evidence`, while technical inferences form the `root_cause`.

## Pydantic Schema Validation
The Python backend uses Pydantic to validate every LLM response before presentation:
- `confidence`: Checked between `0.0` and `1.0`.
- `root_cause`: Cannot be empty string.
- `evidence`: Must contain at least 1 non-empty item.
- Malformed responses trigger controlled retry or safe Demo Mode fallback.

## Demo Mode Resilience
If Gemini API keys are absent or offline, NetSage AI operates seamlessly in **Demo Mode**, serving pre-validated diagnoses grounded in the 30 Cisco Packet Tracer cases.
