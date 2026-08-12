from .rules import (
    check_duplicate_ip,
    check_subnet_mask,
    check_gateway_mismatch,
    check_interface_down,
    check_missing_vlan,
    check_missing_route
)

class RuleChecker:
    """Deterministic Rule Engine executing 6 core network rule checks."""

    @classmethod
    def run_all_checks(cls, case):
        """Runs all 6 deterministic network rules against a troubleshooting case."""
        results = [
            check_duplicate_ip(case),
            check_subnet_mask(case),
            check_gateway_mismatch(case),
            check_interface_down(case),
            check_missing_vlan(case),
            check_missing_route(case)
        ]
        
        failures = [r for r in results if r["status"] == "FAIL"]
        has_failures = len(failures) > 0
        
        return {
            "case_id": case.get("case_id"),
            "has_failures": has_failures,
            "total_checks": len(results),
            "failed_count": len(failures),
            "results": results,
            "summary": "; ".join([f"{f['rule_name']}: {f['evidence']}" for f in failures]) if has_failures else "All deterministic network checks passed."
        }
