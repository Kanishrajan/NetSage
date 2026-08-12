from checker.parser import ShowOutputParser

def test_parse_json_string():
    raw = '{"show vlan": "VLAN 10 active"}'
    parsed = ShowOutputParser.parse_show_outputs(raw)
    assert isinstance(parsed, dict)
    assert parsed.get("show vlan") == "VLAN 10 active"

def test_extract_ip_addresses():
    text = "Interface Gi0/0 has IP 192.168.1.1 and gateway 192.168.1.254"
    ips = ShowOutputParser.extract_ip_addresses(text)
    assert "192.168.1.1" in ips
    assert "192.168.1.254" in ips

def test_subnet_membership():
    in_subnet = ShowOutputParser.is_ip_in_subnet("192.168.10.15", "192.168.10.0", "255.255.255.0")
    assert in_subnet is True

    out_subnet = ShowOutputParser.is_ip_in_subnet("192.168.20.1", "192.168.10.0", "255.255.255.0")
    assert out_subnet is False
