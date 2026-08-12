# Cisco Packet Tracer Scenario Creation Workflow

Follow these 16 steps to create and validate network troubleshooting cases using Cisco Packet Tracer:

1. Build the network topology in Cisco Packet Tracer (Routers, Switches, PCs, Servers, Access Points).
2. Configure initial networking (IP addressing, VLANs, routing protocols, DHCP pools, ACLs, NAT).
3. Verify baseline connectivity (all pings succeed end-to-end).
4. Introduce exactly ONE primary configuration fault (e.g., misconfigured VLAN access port, wrong default gateway, missing subinterface encapsulation, missing IP helper address).
5. Record the exact symptom observed by end-users (e.g., "PC1 cannot ping default gateway").
6. Execute relevant Cisco CLI `show` commands on involved network devices:
   - `show ip interface brief`
   - `show vlan brief`
   - `show interfaces trunk`
   - `show ip route`
   - `show access-lists`
   - `show ip nat translations`
   - `show ip dhcp binding` / `show ip dhcp pool`
   - `show running-config`
7. Copy raw command outputs.
8. Record the exact expected root cause.
9. Identify the corresponding OSI Layer (Layer 1 through Layer 7).
10. Assign concept tag (e.g., 802.1Q Trunking, DHCP Relay, Static NAT).
11. Determine severity level (LOW, MEDIUM, HIGH, CRITICAL).
12. Specify the expected next diagnostic CLI command.
13. Formulate the exact Cisco IOS CLI fix commands.
14. Apply the fix in Cisco Packet Tracer.
15. Verify connectivity restoration with verification command (`ping`, `traceroute`, `nslookup`).
16. Append the complete case evidence into `data/cases.csv` and `data/cases.json`.
