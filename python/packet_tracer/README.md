# Cisco Packet Tracer Lab Files & Topology Scenarios

This directory contains reference topologies and instructions for NetSage AI Packet Tracer scenarios.

## Included Scenario Categories
1. **VLAN Scenarios**: Access port misconfigurations, trunk allowed VLAN omissions, uncreated VLAN database entries, native VLAN mismatches.
2. **Gateway Scenarios**: Host gateway subnet errors, subinterface IP typos, dot1q encapsulation missing.
3. **DHCP Scenarios**: DHCP pool exhaustion, missing IP helper-address for relay, DHCP excluded address conflicts, bad default-router options.
4. **DNS Scenarios**: Invalid client DNS server IP, missing DNS routes, missing A records.
5. **Routing Scenarios**: Missing return static routes, OSPF area mismatches, OSPF passive interfaces, static route next-hop typos, RIPv2 auto-summary issues.
6. **ACL Scenarios**: Extended ACL implicit deny blocking web traffic, standard ACL placed on wrong interface, inbound vs outbound misconfiguration, wildcard mask errors.
7. **NAT Scenarios**: Missing `ip nat inside` on LAN interface, NAT overload ACL subnet mismatch, static NAT incorrect private IP mapping.
8. **Wireless Scenarios**: WPA2-PSK key case sensitivity typo, hidden SSID name typo, AP switch port native VLAN mismatch, DHCP Option 43 missing for WLC join.

Refer to `docs/packet_tracer_workflow.md` for step-by-step guidance on capturing CLI show command outputs.
