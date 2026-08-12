import React from 'react';
import { FileText, Terminal, Network, ShieldCheck } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  const steps = [
    "Build the network topology in Cisco Packet Tracer (Routers, Switches, PCs, APs).",
    "Configure initial networking (IP addressing, VLANs, routing protocols, DHCP pools, ACLs, NAT).",
    "Verify baseline connectivity (all pings succeed end-to-end).",
    "Introduce exactly ONE primary configuration fault (e.g. wrong VLAN, missing gateway, missing IP helper).",
    "Record the exact symptom observed by end-users (e.g. PC1 cannot ping default gateway).",
    "Execute relevant Cisco CLI show commands (show ip interface brief, show vlan brief, show ip route, etc.).",
    "Copy raw command outputs.",
    "Record the exact expected root cause.",
    "Identify the corresponding OSI Layer (Layer 1 to Layer 7).",
    "Assign concept tag (e.g. 802.1Q Trunking, DHCP Relay, Static NAT).",
    "Determine severity level (LOW, MEDIUM, HIGH, CRITICAL).",
    "Specify the expected next diagnostic CLI command.",
    "Formulate the exact Cisco IOS CLI fix commands.",
    "Apply the fix in Cisco Packet Tracer.",
    "Verify connectivity restoration with verification command (ping, traceroute, nslookup).",
    "Append the complete case evidence into data/cases.csv and data/cases.json."
  ];

  const rules = [
    { id: "IP001", name: "Duplicate IP Address Check", desc: "Detects IP address collisions or duplicate ARP conflict entries in show output logs." },
    { id: "MASK002", name: "Subnet Mask Consistency", desc: "Validates IP address and subnet mask / wildcard mask boundary alignment." },
    { id: "GW003", name: "Default Gateway Subnet Matching", desc: "Ensures default gateway IP resides within host's configured LAN subnet." },
    { id: "IF004", name: "Interface Link Status", desc: "Checks physical layer status and line protocol for down/down or administratively down states." },
    { id: "VL005", name: "VLAN Membership & Trunk Check", desc: "Verifies switchport access VLAN, trunk allowed lists, and switch database entries." },
    { id: "RT006", name: "Routing Table Reachability", desc: "Checks for valid route entries, gateway of last resort, and next-hop reachability." }
  ];

  return (
    <div className="space-y-6 text-zinc-900">
      
      {/* Header */}
      <div className="bg-zinc-900 text-zinc-100 p-5 rounded-lg border border-zinc-800 space-y-2 shadow-2xs">
        <div className="flex items-center space-x-2 text-emerald-400">
          <FileText className="w-5 h-5" />
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider">Cisco Packet Tracer Scenario Creation & Architecture Specs</h2>
        </div>
        <p className="text-xs text-zinc-400">
          Operational methodology and rule definitions powering NetSage AI's evidence-driven network troubleshooting console.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 16-Step PT Workflow */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold font-mono flex items-center space-x-2 text-zinc-900 uppercase">
            <Network className="w-4 h-4 text-zinc-700" />
            <span>16-Step Scenario Creation Workflow</span>
          </h3>

          <div className="space-y-1.5 text-xs">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-2 p-2 rounded bg-zinc-50 border border-zinc-200">
                <span className="font-mono font-bold text-zinc-900 shrink-0">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span className="text-zinc-800">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deterministic Rule Specs & System Architecture */}
        <div className="space-y-6">
          
          {/* Rule Specs */}
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold font-mono flex items-center space-x-2 text-zinc-900 uppercase">
              <Terminal className="w-4 h-4 text-zinc-700" />
              <span>6 Deterministic Python Network Rules</span>
            </h3>

            <div className="space-y-2">
              {rules.map((r) => (
                <div key={r.id} className="p-2.5 rounded border border-zinc-200 bg-zinc-50 text-xs space-y-0.5">
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="font-bold text-zinc-900">{r.id}</span>
                    <span className="font-semibold text-zinc-800">{r.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible AI Overview */}
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold font-mono flex items-center space-x-2 text-zinc-900 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Responsible AI & Human-in-the-Loop Architecture</span>
            </h3>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded text-xs space-y-2 text-zinc-800">
              <p>
                NetSage AI is explicitly engineered for enterprise network environments where unvalidated automated configuration edits can cause widespread outage.
              </p>
              <p>
                The platform operates in strict advisory mode. AI-proposed root causes and fixes must pass through human review (Accepted, Edited, or Rejected) and post-fix command verification before case resolution.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
