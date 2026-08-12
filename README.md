<div align="center">

🌐 NetSage AI

AI-Assisted Network Troubleshooting with Human-in-the-Loop Validation

<p>
  <strong>Evidence → Rule Validation → AI Diagnosis → Human Review → Verification</strong>
</p>

<br>

<img src="https://img.shields.io/badge/AI-Assisted-4F8CFF?style=for-the-badge" alt="AI Assisted">
<img src="https://img.shields.io/badge/Networking-Cisco-1BA0D7?style=for-the-badge" alt="Cisco">
<img src="https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-3178C6?style=for-the-badge" alt="React TypeScript">
<img src="https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge" alt="Python">
<img src="https://img.shields.io/badge/Testing-Pytest-0A9EDC?style=for-the-badge" alt="Pytest">

<br><br>

NetSage AI is not a generic chatbot.

It is a structured network troubleshooting system that combines Cisco-style network evidence, deterministic Python rules, LLM-assisted diagnosis, human review, and verification.

</div>

✨ What is NetSage AI?

NetSage AI helps network engineers and learners investigate Cisco-style networking problems using real troubleshooting evidence.

A case can contain:

Network symptoms

Topology information

Cisco show command output

Expected fault

OSI layer

Networking concept

Severity

NetSage processes that information through deterministic checks and an LLM, then presents an evidence-backed diagnosis for human review.

The core idea

┌──────────────────┐
│ Network Evidence │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Python Rule      │
│ Engine           │
└────────┬─────────┘
         │
         ├──────────────┐
         ↓              ↓
┌────────────────┐  ┌───────────────┐
│ Deterministic  │  │ LLM Diagnosis │
│ Validation     │  │               │
└────────┬───────┘  └───────┬───────┘
         └──────────┬───────┘
                    ↓
             ┌─────────────┐
             │ Human Review│
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │ Verification│
             └─────────────┘

🚀 Why is it different?

A basic AI project might simply do:

Problem → LLM → Answer

NetSage follows:

Problem
   ↓
Network Evidence
   ↓
Deterministic Rule Checks
   +
LLM Reasoning
   ↓
Evidence-backed Diagnosis
   ↓
Human Review
   ↓
Verification

This means the AI is treated as an assistant, not an autonomous network administrator.

🔎 Evidence first

The system separates:

Layer

Responsibility

Network Evidence

What the case actually shows

Rule Engine

Deterministic checks

LLM

Diagnosis and reasoning

Human

Final decision

Verification

Confirmation of the fix

🧠 Core Features

<table>
<tr>
<td width="50%">

🔍 Evidence-Based Diagnosis

Analyze symptoms, topology notes and Cisco show command output to identify the most likely fault.

</td>
<td width="50%">

⚙️ Deterministic Rule Engine

Python rules independently check known network conditions such as VLAN, gateway, route and interface problems.

</td>
</tr>

<tr>
<td>

🤖 Structured LLM Diagnosis

The AI produces:

Root cause

Confidence

OSI layer

Evidence

Next command

Suggested fix

</td>
<td>

👨‍💻 Human-in-the-Loop

Every diagnosis can be:

✅ Accepted

✏️ Edited

❌ Rejected

</td>
</tr>

<tr>
<td>

📊 Evaluation Dashboard

Track cases, categories, severity, AI/human agreement, review outcomes and verification.

</td>
<td>

🛡️ Responsible AI

AI disagreements and human corrections are recorded instead of hiding model failures.

</td>
</tr>
</table>

🏗️ System Architecture

                    ┌───────────────────────┐
                    │   Cisco Packet Tracer │
                    │     Network Labs      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Troubleshooting     │
                    │       Dataset         │
                    │       cases.csv       │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    Case Processor     │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
          ┌──────────────────┐     ┌──────────────────┐
          │  Python Rule     │     │    LLM API       │
          │     Engine       │     │    Diagnosis     │
          └────────┬─────────┘     └────────┬─────────┘
                   │                        │
                   └────────────┬───────────┘
                                ▼
                    ┌───────────────────────┐
                    │   Result Aggregator   │
                    └───────────┬───────────┘
                                ▼
                    ┌───────────────────────┐
                    │     Human Review      │
                    │                       │
                    │ Accept / Edit / Reject│
                    └───────────┬───────────┘
                                ▼
                    ┌───────────────────────┐
                    │      Verification     │
                    └───────────┬───────────┘
                                ▼
                    ┌───────────────────────┐
                    │ Analytics / Dashboard │
                    └───────────────────────┘

🔄 Troubleshooting Workflow

01  Select / Create Case
            ↓
02  Inspect Symptoms
            ↓
03  Inspect Topology
            ↓
04  Read Cisco Evidence
            ↓
05  Run Rule Engine
            ↓
06  Run LLM Diagnosis
            ↓
07  Compare Results
            ↓
08  Human Review
            ↓
09  Accept / Edit / Reject
            ↓
10  Verify Proposed Fix
            ↓
11  Record Outcome
            ↓
12  Analytics

🖥️ Application Experience

The interface is designed as a professional network troubleshooting workspace, rather than a chatbot.

Main sections

┌────────────────────────────────────────────────────────────┐
│ NetSage AI                                  ● System Ready │
├───────────────┬────────────────────────────────────────────┤
│               │                                            │
│ Overview      │                                            │
│ Cases         │           Troubleshooting Workspace        │
│ Diagnosis     │                                            │
│ Human Review  │                                            │
│ Analytics     │                                            │
│ Responsible   │                                            │
│ AI            │                                            │
│               │                                            │
└───────────────┴────────────────────────────────────────────┘

Diagnosis view

CASE: NS-001
VLAN Trunk Mismatch
────────────────────────────────────────────

SYMPTOM
PC cannot communicate with another VLAN.

NETWORK EVIDENCE
show vlan brief
show interfaces trunk

RULE CHECKS
✓ Interface status
✕ VLAN configuration

AI DIAGNOSIS
Likely Root Cause: VLAN configuration issue

Confidence: 87%
OSI Layer: Layer 2

SUPPORTING EVIDENCE
...

NEXT COMMAND
show interfaces trunk

SUGGESTED FIX
...

HUMAN REVIEW
[ Accept ]  [ Edit ]  [ Reject ]

🧪 Dataset

NetSage is designed around a controlled troubleshooting dataset containing 30+ network cases.

Target categories include:

Category

Examples

VLAN

VLAN mismatch, trunk configuration

Gateway

Incorrect/default gateway

DHCP

Address allocation problems

DNS

Name resolution problems

Routing

Missing or incorrect routes

ACL

Traffic blocked by access rules

NAT

Translation/configuration issues

Wireless

Connectivity/authentication issues

A case can contain:

case_id
title
category
symptom
topology_note
show_outputs
expected_fault
osi_layer
concept
severity
expected_next_command
expected_fix
verification_method

🧩 Example Case

Case ID:
NS-001

Category:
Routing

Symptom:
PC can reach its gateway but cannot reach the server.

Evidence:
show ip route

Expected Fault:
Missing route

OSI Layer:
Layer 3

Severity:
High

Possible NetSage diagnosis

Root Cause:
Missing route to destination network

Confidence:
88%

OSI Layer:
Layer 3

Evidence:
The destination network is not present in
the routing table.

Next Command:
show ip route

Suggested Fix:
Verify the destination network and configure
the appropriate route before testing connectivity.

⚔️ Rule Engine + AI

One of the key parts of NetSage is that the LLM is not the only source of truth.

Example

                 CASE
                  │
          ┌───────┴────────┐
          ▼                ▼
     RULE ENGINE          LLM
          │                │
          ▼                ▼
   Missing Route       ACL Issue
          │                │
          └───────┬────────┘
                  ▼
          ⚠ DISAGREEMENT
                  │
                  ▼
          HUMAN REVIEW

When deterministic checks and AI disagree, the application can explicitly flag the case for human investigation.

👨‍💻 Human Review

The review workflow provides three outcomes:

✅ Accepted

The reviewer agrees with the AI diagnosis.

✏️ Edited

The AI identified the general issue but the reviewer corrected part of the diagnosis.

❌ Rejected

The AI diagnosis is incorrect and the reviewer records the correct conclusion.

This makes AI failures measurable instead of invisible.

🛡️ Responsible AI

NetSage follows a human-controlled AI workflow.

The system:

Does not automatically apply network fixes.

Does not assume the LLM is always correct.

Displays supporting evidence.

Displays confidence.

Separates evidence from inference.

Highlights rule/AI disagreements.

Records human corrections.

Requires verification after a proposed fix.

Responsible AI lifecycle

AI Suggestion
     ↓
Evidence Review
     ↓
Human Decision
     ↓
Correction if Needed
     ↓
Verification
     ↓
Evaluation

🛠️ Technology Stack

Technology

Purpose

React

Frontend UI

TypeScript

Type-safe frontend development

Vite

Frontend development and build tooling

Python

Backend and network rule logic

LLM API

AI-assisted diagnosis

Pydantic

Structured response validation

Pandas

Dataset and evaluation processing

CSV

Case dataset and lightweight storage

Cisco Packet Tracer

Network simulation

Pytest

Automated testing

Git

Version control

GitHub

Source-code collaboration

Python venv

Dependency isolation

📁 Project Structure

netsage-ai/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── ai/
│   ├── diagnosis.py
│   ├── prompts.py
│   ├── schema.py
│   └── providers/
│
├── checker/
│   ├── rule_checker.py
│   ├── rules.py
│   └── parser.py
│
├── data/
│   ├── cases.csv
│   ├── ai_results.csv
│   ├── review_log.csv
│   └── verification_log.csv
│
├── scripts/
│   ├── generate_dataset.py
│   ├── validate_dataset.py
│   └── run_evaluation.py
│
├── tests/
│   ├── test_rules.py
│   ├── test_parser.py
│   ├── test_schema.py
│   └── test_evaluator.py
│
├── docs/
│   ├── architecture.md
│   ├── ai_design.md
│   ├── packet_tracer_workflow.md
│   └── responsible_ai.md
│
├── packet_tracer/
│
├── .env.example
├── .gitignore
├── package.json
├── requirements.txt
└── README.md

⚡ Quick Start

1. Clone

git clone <your-repository-url>
cd netsage-ai

2. Frontend

npm install
npm run dev

3. Python Environment

Windows

python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

macOS / Linux

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

🔐 Environment Variables

Create a .env file based on .env.example.

LLM_API_KEY=your_api_key_here
LLM_MODEL=your_model_name
LLM_BASE_URL=

Never commit API keys or .env files to GitHub.

🧪 Testing

Run all tests:

pytest

Run with coverage:

pytest --cov

Recommended test areas:

✓ Dataset validation
✓ Pydantic schemas
✓ Evidence parsing
✓ Rule engine
✓ AI response validation
✓ Evaluation logic
✓ Review workflow

🌐 Deployment

The frontend can be deployed as a modern web application.

For a production-style architecture:

              Vercel
                │
                ▼
        React / TypeScript
                │
                │ API
                ▼
          Python Backend
                │
        ┌───────┴────────┐
        ▼                ▼
   Rule Engine        LLM API

Keep API keys on the server side and use environment variables for secrets.

📊 Evaluation

NetSage evaluates AI output against known troubleshooting cases.

Evaluation should distinguish:

Correct

Partially correct

Incorrect

Rule/AI agreement

Human corrections

Verified fixes

The purpose is not simply to claim a high AI accuracy number, but to understand where the AI succeeds and where human intervention is required.

🎯 MVP

Core

30+ validated troubleshooting cases

Cisco Packet Tracer scenarios

CSV dataset

LLM integration

Pydantic validation

Python rule engine

Human review

Verification workflow

Evaluation

Responsible AI logging

Professional dashboard

Automated tests

Future Enhancements

Larger Dataset
      ↓
More Network Rules
      ↓
Topology Visualization
      ↓
Advanced Evidence Extraction
      ↓
Persistent Database
      ↓
Role-Based Access
      ↓
Real Network Telemetry

These are future extensions and are not required for the core case-based MVP.

💡 Project Differentiation

NetSage is best described as:

An evidence-driven, AI-assisted network troubleshooting platform with deterministic validation and human-in-the-loop verification.

Its value comes from combining:

Cisco Networking
      +
Structured Dataset
      +
Python Rule Engine
      +
LLM Reasoning
      +
Pydantic Validation
      +
Human Review
      +
Verification
      +
Responsible AI

The system does not simply answer:

"What is wrong?"

It aims to answer:

"What is most likely wrong, what evidence supports it, what should I check next, what fix is suggested, and has a human verified the result?"

🗺️ Roadmap

Phase 1 ─ Foundation
   │
   ├── Dataset
   ├── Packet Tracer cases
   ├── Pydantic models
   └── Rule engine
   │
   ▼
Phase 2 ─ AI
   │
   ├── LLM integration
   ├── Structured diagnosis
   └── Evaluation
   │
   ▼
Phase 3 ─ Human Review
   │
   ├── Accept
   ├── Edit
   ├── Reject
   └── Verification
   │
   ▼
Phase 4 ─ Product UI
   │
   ├── Dashboard
   ├── Case explorer
   ├── Diagnosis workspace
   └── Analytics
   │
   ▼
Phase 5 ─ Enhancement
   │
   ├── Better evidence extraction
   ├── Larger dataset
   └── Advanced network integrations

<div align="center">

NetSage AI

Evidence-driven diagnosis.AI-assisted troubleshooting.Human-controlled decisions.

<br>

Built for network troubleshooting • Designed for responsible AI

</div>
