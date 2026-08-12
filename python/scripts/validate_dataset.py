import json
import os
import sys

REQUIRED_FIELDS = [
    "case_id", "title", "category", "symptom", "topology_note",
    "show_outputs", "expected_fault", "osi_layer", "concept",
    "severity", "expected_next_command", "expected_fix", "verification_method"
]

VALID_CATEGORIES = {"VLAN", "Gateway", "DHCP", "DNS", "Routing", "ACL", "NAT", "Wireless"}
VALID_SEVERITIES = {"LOW", "MEDIUM", "HIGH", "CRITICAL"}
VALID_OSI_LAYERS = {"Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 5", "Layer 6", "Layer 7"}

def validate_dataset(filepath="data/cases.json"):
    print(f"--- Validating dataset file: {filepath} ---")
    if not os.path.exists(filepath):
        print(f"ERROR: File {filepath} does not exist!")
        return False

    with open(filepath, "r", encoding="utf-8") as f:
        try:
            cases = json.load(f)
        except Exception as e:
            print(f"ERROR: Failed to parse JSON in {filepath}: {e}")
            return False

    if len(cases) < 30:
        print(f"ERROR: Found {len(cases)} cases. Minimum required is 30!")
        return False

    case_ids = set()
    errors = []

    for idx, case in enumerate(cases):
        cid = case.get("case_id", f"INDEX-{idx}")
        if cid in case_ids:
            errors.append(f"Duplicate case_id: {cid}")
        case_ids.add(cid)

        for field in REQUIRED_FIELDS:
            val = case.get(field)
            if not val or str(val).strip() == "":
                errors.append(f"Case {cid}: Missing or empty required field '{field}'")

        cat = case.get("category")
        if cat not in VALID_CATEGORIES:
            errors.append(f"Case {cid}: Invalid category '{cat}'. Expected one of {VALID_CATEGORIES}")

        sev = case.get("severity")
        if sev not in VALID_SEVERITIES:
            errors.append(f"Case {cid}: Invalid severity '{sev}'. Expected one of {VALID_SEVERITIES}")

        osi = case.get("osi_layer")
        if osi not in VALID_OSI_LAYERS:
            errors.append(f"Case {cid}: Invalid OSI layer '{osi}'. Expected one of {VALID_OSI_LAYERS}")

    if errors:
        print(f"VALIDATION FAILED with {len(errors)} error(s):")
        for err in errors[:10]:
            print(f" - {err}")
        if len(errors) > 10:
            print(f" ... and {len(errors) - 10} more errors.")
        return False

    print(f"SUCCESS: All {len(cases)} cases passed dataset validation!")
    print(f"Categories covered: {len(set(c['category'] for c in cases))} / {len(VALID_CATEGORIES)}")
    return True

if __name__ == "__main__":
    success = validate_dataset()
    sys.exit(0 if success else 1)
