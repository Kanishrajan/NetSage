import json

SYSTEM_PROMPT = """You are NetSage AI, a specialized Cisco Network Troubleshooting Assistant.
Analyze the network troubleshooting case and CLI outputs provided.
Return a structured JSON object according to the exact schema.

Schema requirements:
{
  "root_cause": "String describing the exact network fault",
  "confidence": 0.85 (Float between 0.0 and 1.0),
  "osi_layer": "Layer 1" | "Layer 2" | "Layer 3" | "Layer 4" | "Layer 7",
  "evidence": ["List", "of", "facts", "from", "show", "outputs"],
  "next_command": "Recommended Cisco CLI diagnostic command",
  "fix_steps": ["Ordered list of CLI commands or action steps"]
}

Important Rules:
1. Ground every evidence item directly in the provided show outputs.
2. If evidence is ambiguous, reflect this in a lower confidence score (< 0.70).
3. Always suggest a valid Cisco show command as `next_command`.
4. Output ONLY valid JSON matching this schema. No markdown wrapping.
"""

def build_case_prompt(case):
    """Formats a troubleshooting case into an AI prompt."""
    show_outputs = case.get("show_outputs", "")
    if isinstance(show_outputs, str):
        try:
            parsed = json.loads(show_outputs)
            show_text = "\n\n".join([f"--- Command: {k} ---\n{v}" for k, v in parsed.items()])
        except Exception:
            show_text = show_outputs
    elif isinstance(show_outputs, dict):
        show_text = "\n\n".join([f"--- Command: {k} ---\n{v}" for k, v in show_outputs.items()])
    else:
        show_text = str(show_outputs)

    return f"""Case ID: {case.get('case_id')}
Title: {case.get('title')}
Category: {case.get('category')}
Symptom: {case.get('symptom')}
Topology Note: {case.get('topology_note')}

CLI Show Command Outputs:
{show_text}

Diagnose the root cause, determine confidence, identify OSI layer, extract grounding evidence, recommend next CLI command, and list exact fix steps.
"""
