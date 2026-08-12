import pytest
from checker.rules import (
    check_duplicate_ip,
    check_subnet_mask,
    check_gateway_mismatch,
    check_interface_down,
    check_missing_vlan,
    check_missing_route
)
from checker.rule_checker import RuleChecker

def test_duplicate_ip_pass():
    case = {"show_outputs": '{"show ip interface brief": "Gi0/0 192.168.1.1 up up"}'}
    res = check_duplicate_ip(case)
    assert res["status"] == "PASS"

def test_duplicate_ip_fail():
    case = {"show_outputs": '{"show ip dhcp conflict": "192.168.1.1 Ping conflict detected"}'}
    res = check_duplicate_ip(case)
    assert res["status"] == "FAIL"
    assert res["rule_id"] == "IP001"

def test_gateway_mismatch_fail():
    case = {
        "title": "Gateway Mismatch Case",
        "category": "Gateway",
        "show_outputs": '{"ipconfig": "IP: 192.168.10.50, Gateway: 192.168.20.1"}'
    }
    res = check_gateway_mismatch(case)
    assert res["status"] == "FAIL"
    assert res["rule_id"] == "GW003"

def test_interface_down_fail():
    case = {"show_outputs": '{"show interface": "GigabitEthernet0/0/0 is down, line protocol is down"}'}
    res = check_interface_down(case)
    assert res["status"] == "FAIL"

def test_missing_vlan_fail():
    case = {
        "title": "VLAN Missing",
        "category": "VLAN",
        "show_outputs": '{"show vlan brief": "VLAN 30 is NOT listed"}'
    }
    res = check_missing_vlan(case)
    assert res["status"] == "FAIL"

def test_missing_route_fail():
    case = {
        "title": "Missing Route",
        "category": "Routing",
        "show_outputs": '{"show ip route": "Gateway of last resort is not set"}'
    }
    res = check_missing_route(case)
    assert res["status"] == "FAIL"

def test_rule_checker_aggregate():
    case = {
        "case_id": "TEST-01",
        "category": "Gateway",
        "show_outputs": '{"ipconfig": "IP: 192.168.10.50, Gateway: 192.168.20.1"}'
    }
    summary = RuleChecker.run_all_checks(case)
    assert summary["has_failures"] is True
    assert summary["total_checks"] == 6
    assert summary["failed_count"] >= 1
