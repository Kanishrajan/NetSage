# NetSage AI - Prompt Worked Examples

### Worked Example 1: Access Port VLAN Misconfiguration
**Input Case:**
- Category: VLAN
- Symptom: Host PC1 cannot ping Host PC2 in VLAN 10.
- Show Output: `show vlan brief` lists Fa0/2 in default VLAN 1.

**Expected Diagnosis Output:**
```json
{
  "root_cause": "Switch port Fa0/2 is configured in VLAN 1 (default) instead of VLAN 10.",
  "confidence": 0.95,
  "osi_layer": "Layer 2",
  "evidence": [
    "show vlan brief shows FastEthernet0/2 belongs to VLAN 1 instead of VLAN 10",
    "show interfaces switchport shows Operational Mode static access on VLAN 1"
  ],
  "next_command": "show running-config interface FastEthernet0/2",
  "fix_steps": [
    "interface FastEthernet0/2",
    "switchport access vlan 10"
  ]
}
```

### Worked Example 2: Host Gateway Outside Subnet
**Input Case:**
- Category: Gateway
- Symptom: Host 192.168.10.50/24 cannot reach default gateway.
- Show Output: `ipconfig /all` lists Default Gateway 192.168.20.1.

**Expected Diagnosis Output:**
```json
{
  "root_cause": "Host PC3 default gateway is set to 192.168.20.1 which is in a different subnet than PC3 IP (192.168.10.50/24).",
  "confidence": 0.92,
  "osi_layer": "Layer 3",
  "evidence": [
    "ipconfig /all shows host IP 192.168.10.50 with subnet mask 255.255.255.0",
    "ipconfig /all shows gateway 192.168.20.1 which belongs to 192.168.20.0/24 subnet"
  ],
  "next_command": "show ip interface brief on router R1",
  "fix_steps": [
    "Set host Default Gateway to 192.168.10.1 in Operating System network properties"
  ]
}
```
