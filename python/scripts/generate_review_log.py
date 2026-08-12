import csv
import json
import os

review_logs = [
    {
        "review_id": "REV-001",
        "case_id": "CASE-001",
        "ai_root_cause": "Switch port Fa0/2 is assigned to default VLAN 1 instead of VLAN 10.",
        "reviewer_decision": "ACCEPTED",
        "corrected_root_cause": "Switch port Fa0/2 is assigned to default VLAN 1 instead of VLAN 10.",
        "reviewer_reason": "AI diagnosis matches show vlan brief and interface switchport output perfectly.",
        "timestamp": "2026-08-10T14:22:10Z",
        "reviewer_name": "Senior Network Engineer (Reviewer 1)"
    },
    {
        "review_id": "REV-002",
        "case_id": "CASE-004",
        "ai_root_cause": "Trunk link physical cable fault or switch interface Gi0/2 is down.",
        "reviewer_decision": "EDITED",
        "corrected_root_cause": "Native VLAN mismatch discovered on GigabitEthernet0/2 (SW1 is Native VLAN 1, SW2 is Native VLAN 99).",
        "reviewer_reason": "AI overlooked the explicit CDP error log in show output (%CDP-4-NATIVE_VLAN_MISMATCH). Corrected diagnosis.",
        "timestamp": "2026-08-11T09:15:40Z",
        "reviewer_name": "Lead Architect (Reviewer 2)"
    },
    {
        "review_id": "REV-003",
        "case_id": "CASE-009",
        "ai_root_cause": "Centralized DHCP Server 10.1.1.50 is offline or client NIC is damaged.",
        "reviewer_decision": "REJECTED",
        "corrected_root_cause": "Interface Gi0/0/0.40 lacks 'ip helper-address 10.1.1.50' to forward cross-subnet broadcast DHCP DISCOVER requests.",
        "reviewer_reason": "AI hallucinated hardware failure. The show output explicitly shows Gi0/0/0.40 missing ip helper-address.",
        "timestamp": "2026-08-11T11:30:00Z",
        "reviewer_name": "System Auditor (Reviewer 3)"
    },
    {
        "review_id": "REV-004",
        "case_id": "CASE-015",
        "ai_root_cause": "HQ Router G0/0/0 physical interface hardware failure.",
        "reviewer_decision": "EDITED",
        "corrected_root_cause": "Edge-R1 router lacks a return static route for remote network 192.168.80.0/24 back to 10.1.1.2.",
        "reviewer_reason": "AI attributed asymmetry to hardware failure rather than analyzing Edge-R1 missing routing table entry.",
        "timestamp": "2026-08-11T13:45:12Z",
        "reviewer_name": "Senior Network Engineer (Reviewer 1)"
    },
    {
        "review_id": "REV-005",
        "case_id": "CASE-021",
        "ai_root_cause": "Standard ACL 10 must be permanently deleted from the router.",
        "reviewer_decision": "EDITED",
        "corrected_root_cause": "Standard ACL 10 applied INBOUND on G0/0/0 blocks all local routed traffic before reaching destination.",
        "reviewer_reason": "Deleting ACL destroys security intent. Standard ACLs must be placed closest to destination outbound.",
        "timestamp": "2026-08-12T08:10:05Z",
        "reviewer_name": "Lead Architect (Reviewer 2)"
    },
    {
        "review_id": "REV-006",
        "case_id": "CASE-028",
        "ai_root_cause": "Access Point radio hardware failure or WPA2 key corrupted.",
        "reviewer_decision": "REJECTED",
        "corrected_root_cause": "SSID string case typo ('Corporate_Wifi' vs 'Corporate_Wi-Fi') with broadcast SSID disabled.",
        "reviewer_reason": "AI ignored string casing difference in client profile vs AP config.",
        "timestamp": "2026-08-12T10:00:22Z",
        "reviewer_name": "System Auditor (Reviewer 3)"
    }
]

def main():
    os.makedirs("data", exist_ok=True)
    json_path = os.path.join("data", "review_log.json")
    csv_path = os.path.join("data", "review_log.csv")
    
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(review_logs, f, indent=2)
    
    fieldnames = list(review_logs[0].keys())
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for log in review_logs:
            writer.writerow(log)
    print(f"Saved {len(review_logs)} review logs to {json_path} and {csv_path}")

if __name__ == "__main__":
    main()
