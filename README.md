<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NetSage AI — Project Documentation</title>
<meta name="description" content="NetSage AI — AI-assisted network troubleshooting with human-in-the-loop validation.">

<style>
:root {
  --bg: #07111f;
  --surface: #0d1929;
  --surface-2: #111f33;
  --text: #edf4ff;
  --muted: #9badc3;
  --line: rgba(255,255,255,.09);
  --accent: #4f8cff;
  --accent-2: #6ea8ff;
  --success: #31c48d;
  --warning: #f2b84b;
  --danger: #ef6b73;
  --shadow: 0 24px 70px rgba(0,0,0,.28);
  --radius: 18px;
}

* { box-sizing: border-box; scroll-behavior: smooth; }

html { background: var(--bg); }

body {
  margin: 0;
  color: var(--text);
  background:
    radial-gradient(circle at 15% 0%, rgba(79,140,255,.13), transparent 30%),
    radial-gradient(circle at 85% 10%, rgba(49,196,141,.07), transparent 25%),
    var(--bg);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.7;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }

.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  z-index: 1000;
  background: linear-gradient(90deg, var(--accent), var(--success));
}

.nav {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  width: min(1100px, calc(100% - 32px));
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(7,17,31,.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 12px 40px rgba(0,0,0,.18);
}

.brand {
  font-weight: 750;
  letter-spacing: -.02em;
  white-space: nowrap;
}

.brand span { color: var(--accent-2); }

.nav-links {
  margin-left: auto;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-links::-webkit-scrollbar { display: none; }

.nav-links a {
  padding: 7px 11px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
  transition: .25s ease;
}

.nav-links a:hover {
  color: var(--text);
  background: rgba(255,255,255,.07);
}

.container {
  width: min(1080px, calc(100% - 36px));
  margin: auto;
}

.hero {
  min-height: 92vh;
  display: grid;
  place-items: center;
  padding: 150px 0 80px;
  position: relative;
}

.hero-inner { max-width: 900px; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border: 1px solid rgba(79,140,255,.28);
  border-radius: 999px;
  color: #bcd4ff;
  background: rgba(79,140,255,.08);
  font-size: 13px;
  margin-bottom: 24px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 14px rgba(49,196,141,.65);
}

h1 {
  margin: 0;
  font-size: clamp(3.2rem, 9vw, 7rem);
  line-height: .92;
  letter-spacing: -.065em;
}

.gradient-text {
  background: linear-gradient(110deg, #fff 20%, #8bb7ff 58%, #64d9af);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero p {
  max-width: 730px;
  margin: 28px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 17px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: transform .25s ease, background .25s ease, border .25s ease;
  font-weight: 650;
  font-size: 14px;
}

.button.primary {
  background: var(--accent);
  border-color: var(--accent);
}

.button:hover {
  transform: translateY(-2px);
  background: var(--surface-2);
}

.button.primary:hover { background: #3e7eea; }

.flow {
  margin-top: 65px;
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(13,25,41,.68);
  box-shadow: var(--shadow);
}

.flow-item {
  padding: 16px 10px;
  text-align: center;
  border-radius: 12px;
  background: rgba(255,255,255,.035);
  color: var(--muted);
  font-size: 13px;
}

.flow-item strong {
  display: block;
  color: var(--text);
  margin-bottom: 4px;
}

section {
  padding: 100px 0;
}

.section-head {
  max-width: 720px;
  margin-bottom: 36px;
}

.kicker {
  color: var(--accent-2);
  font-size: 13px;
  font-weight: 750;
  letter-spacing: .12em;
  text-transform: uppercase;
}

h2 {
  margin: 7px 0 12px;
  font-size: clamp(2rem, 5vw, 3.3rem);
  line-height: 1.05;
  letter-spacing: -.045em;
}

h3 {
  margin-top: 0;
  font-size: 1.15rem;
}

.section-head p, .card p {
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(145deg, rgba(17,31,51,.88), rgba(13,25,41,.72));
  box-shadow: 0 12px 40px rgba(0,0,0,.12);
  transition: transform .35s ease, border-color .35s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(79,140,255,.35);
}

.icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(79,140,255,.1);
  color: var(--accent-2);
  margin-bottom: 16px;
  font-weight: 800;
}

.architecture {
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #081522;
  overflow-x: auto;
  box-shadow: var(--shadow);
}

pre {
  margin: 0;
  color: #cfe0f5;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 13px;
  line-height: 1.65;
}

.code {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #06101b;
  overflow-x: auto;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
  background: var(--surface);
}

th, td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid var(--line);
}

th {
  color: #cfe0f5;
  font-size: 13px;
  background: var(--surface-2);
}

td { color: var(--muted); }

.badge {
  display: inline-flex;
  padding: 4px 9px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: .04em;
}

.success { color: #8be6c2; background: rgba(49,196,141,.1); }
.warning { color: #f7d18a; background: rgba(242,184,75,.1); }
.danger { color: #ffabb0; background: rgba(239,107,115,.1); }

.timeline {
  position: relative;
  margin-top: 20px;
  padding-left: 28px;
  border-left: 1px solid var(--line);
}

.step {
  position: relative;
  padding: 0 0 34px 20px;
}

.step::before {
  content: "";
  position: absolute;
  left: -34px;
  top: 7px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 1px rgba(79,140,255,.4);
}

.step h3 { margin-bottom: 5px; }
.step p { margin: 0; color: var(--muted); }

.callout {
  padding: 24px;
  border-left: 3px solid var(--accent);
  border-radius: 0 14px 14px 0;
  background: rgba(79,140,255,.07);
  color: #cbdcff;
}

footer {
  padding: 70px 0 100px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .75s ease, transform .75s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-1 { transition-delay: .08s; }
.delay-2 { transition-delay: .16s; }
.delay-3 { transition-delay: .24s; }

@media (max-width: 850px) {
  .grid { grid-template-columns: 1fr 1fr; }
  .flow { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
}

@media (max-width: 600px) {
  .container { width: min(100% - 24px, 1080px); }
  .grid { grid-template-columns: 1fr; }
  .flow { grid-template-columns: 1fr; }
  section { padding: 70px 0; }
  .hero { padding-top: 125px; }
  h1 { font-size: 3.7rem; }
}
</style>
</head>

<body>

<div class="progress" id="progress"></div>

<nav class="nav">
  <a href="#top" class="brand">NetSage <span>AI</span></a>
  <div class="nav-links">
    <a href="#overview">Overview</a>
    <a href="#features">Features</a>
    <a href="#architecture">Architecture</a>
    <a href="#stack">Stack</a>
    <a href="#workflow">Workflow</a>
    <a href="#setup">Setup</a>
  </div>
</nav>

<main id="top">

<section class="hero">
  <div class="container hero-inner">
    <div class="eyebrow reveal"><span class="dot"></span> AI-Assisted Network Troubleshooting</div>

    <h1 class="reveal delay-1">
      <span class="gradient-text">NetSage AI</span>
    </h1>

    <p class="reveal delay-2">
      Evidence-driven Cisco network diagnosis combining deterministic validation,
      LLM reasoning, human review, and fix verification.
    </p>

    <div class="hero-actions reveal delay-3">
      <a class="button primary" href="#overview">Explore Project</a>
      <a class="button" href="#setup">Setup Guide</a>
    </div>

    <div class="flow reveal delay-3">
      <div class="flow-item"><strong>Evidence</strong>Symptoms + show output</div>
      <div class="flow-item"><strong>Rules</strong>Deterministic checks</div>
      <div class="flow-item"><strong>AI</strong>Structured diagnosis</div>
      <div class="flow-item"><strong>Human</strong>Review decision</div>
      <div class="flow-item"><strong>Verify</strong>Confirm the fix</div>
    </div>
  </div>
</section>

<section id="overview">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">01 / Overview</div>
      <h2>Not a chatbot.<br> A troubleshooting system.</h2>
      <p>
        NetSage AI helps engineers connect network symptoms with likely root causes
        using actual troubleshooting evidence. AI assists with diagnosis, while
        deterministic checks and human review provide control.
      </p>
    </div>

    <div class="callout reveal">
      <strong>Core principle</strong><br>
      Evidence → Rule Validation → AI Diagnosis → Human Review → Verification
    </div>
  </div>
</section>

<section id="features">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">02 / Capabilities</div>
      <h2>Built around engineering evidence.</h2>
      <p>Each capability supports a specific stage of the troubleshooting process.</p>
    </div>

    <div class="grid">
      <article class="card reveal">
        <div class="icon">01</div>
        <h3>Evidence-Based Diagnosis</h3>
        <p>Analyze symptoms, topology notes, and Cisco show-command outputs.</p>
      </article>

      <article class="card reveal delay-1">
        <div class="icon">02</div>
        <h3>LLM Reasoning</h3>
        <p>Generate structured root cause, confidence, OSI layer, evidence, next command, and fix steps.</p>
      </article>

      <article class="card reveal delay-2">
        <div class="icon">03</div>
        <h3>Rule Engine</h3>
        <p>Run deterministic checks for duplicate IPs, masks, gateways, interfaces, VLANs, and routes.</p>
      </article>

      <article class="card reveal">
        <div class="icon">04</div>
        <h3>Human Review</h3>
        <p>Every diagnosis can be Accepted, Edited, or Rejected before it becomes final.</p>
      </article>

      <article class="card reveal delay-1">
        <div class="icon">05</div>
        <h3>Verification</h3>
        <p>Separate an AI recommendation from a human-approved and actually verified fix.</p>
      </article>

      <article class="card reveal delay-2">
        <div class="icon">06</div>
        <h3>Responsible AI</h3>
        <p>Record corrected AI responses and expose disagreements instead of hiding uncertainty.</p>
      </article>
    </div>
  </div>
</section>

<section id="architecture">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">03 / Architecture</div>
      <h2>From network evidence<br>to verified diagnosis.</h2>
    </div>

    <div class="architecture reveal">
<pre>
                 Cisco Packet Tracer
                         │
                         ▼
              Troubleshooting Cases
                     cases.csv
                         │
                         ▼
                  Case Processor
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       Python Rule Engine       LLM Diagnosis
              │                     │
              └──────────┬──────────┘
                         ▼
                  Result Aggregator
                         │
                         ▼
                   Human Review
                  /     |      \
             Accept   Edit    Reject
                         │
                         ▼
                     Verification
                         │
                         ▼
                  Analytics / UI
</pre>
    </div>
  </div>
</section>

<section id="stack">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">04 / Technology</div>
      <h2>The engineering stack.</h2>
    </div>

    <div class="table-wrap reveal">
      <table>
        <thead>
          <tr><th>Technology</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>React + TypeScript</td><td>Frontend application</td></tr>
          <tr><td>Vite</td><td>Frontend development and build tooling</td></tr>
          <tr><td>Python</td><td>Networking rules and backend logic</td></tr>
          <tr><td>LLM API</td><td>AI-assisted diagnosis</td></tr>
          <tr><td>Pydantic</td><td>Structured AI response validation</td></tr>
          <tr><td>Pandas</td><td>Dataset and evaluation processing</td></tr>
          <tr><td>CSV</td><td>Case and result storage</td></tr>
          <tr><td>Cisco Packet Tracer</td><td>Network simulation and case creation</td></tr>
          <tr><td>Pytest</td><td>Automated testing</td></tr>
          <tr><td>Git + GitHub</td><td>Version control</td></tr>
          <tr><td>Python venv</td><td>Isolated Python environment</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section id="workflow">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">05 / Workflow</div>
      <h2>How a case moves<br>through NetSage.</h2>
    </div>

    <div class="timeline">
      <div class="step reveal">
        <h3>01 — Create or select a case</h3>
        <p>Start with a validated Cisco-style troubleshooting scenario.</p>
      </div>
      <div class="step reveal delay-1">
        <h3>02 — Inspect evidence</h3>
        <p>Review symptoms, topology notes, and relevant show-command output.</p>
      </div>
      <div class="step reveal delay-2">
        <h3>03 — Run deterministic checks</h3>
        <p>The Python rule engine checks known configuration conditions independently.</p>
      </div>
      <div class="step reveal">
        <h3>04 — Run AI diagnosis</h3>
        <p>The LLM produces a structured, evidence-backed troubleshooting recommendation.</p>
      </div>
      <div class="step reveal delay-1">
        <h3>05 — Human review</h3>
        <p>The reviewer accepts, edits, or rejects the diagnosis and records the decision.</p>
      </div>
      <div class="step reveal delay-2">
        <h3>06 — Verify</h3>
        <p>The proposed fix is checked separately from the AI recommendation.</p>
      </div>
    </div>
  </div>
</section>

<section id="dataset">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">06 / Dataset</div>
      <h2>30+ structured<br>troubleshooting cases.</h2>
      <p>Cases cover the required network fault categories and provide known outcomes for evaluation.</p>
    </div>

    <div class="table-wrap reveal">
      <table>
        <thead>
          <tr><th>Category</th><th>Target Cases</th></tr>
        </thead>
        <tbody>
          <tr><td>VLAN</td><td>4</td></tr>
          <tr><td>Gateway</td><td>3</td></tr>
          <tr><td>DHCP</td><td>4</td></tr>
          <tr><td>DNS</td><td>3</td></tr>
          <tr><td>Routing</td><td>5</td></tr>
          <tr><td>ACL</td><td>4</td></tr>
          <tr><td>NAT</td><td>3</td></tr>
          <tr><td>Wireless</td><td>4</td></tr>
        </tbody>
      </table>
    </div>

    <div class="code reveal" style="margin-top:20px">
<pre>case_id,category,symptom,show_outputs,expected_fault,osi_layer,concept,severity</pre>
    </div>
  </div>
</section>

<section id="setup">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">07 / Setup</div>
      <h2>Get the project running.</h2>
    </div>

    <div class="grid">
      <article class="card reveal">
        <div class="icon">01</div>
        <h3>Frontend</h3>
        <div class="code">
<pre>npm install
npm run dev</pre>
        </div>
      </article>

      <article class="card reveal delay-1">
        <div class="icon">02</div>
        <h3>Python environment</h3>
        <div class="code">
<pre>python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt</pre>
        </div>
      </article>

      <article class="card reveal delay-2">
        <div class="icon">03</div>
        <h3>Environment variables</h3>
        <div class="code">
<pre>LLM_API_KEY=your_api_key
LLM_MODEL=your_model
LLM_BASE_URL=</pre>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="testing">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">08 / Quality</div>
      <h2>Test before you trust.</h2>
      <p>Core logic should be independently testable and AI responses should be validated before reaching the interface.</p>
    </div>

    <div class="grid">
      <article class="card reveal">
        <div class="icon">✓</div>
        <h3>Dataset Validation</h3>
        <p>Validate case count, required fields, IDs, categories, severity, evidence, and expected faults.</p>
      </article>

      <article class="card reveal delay-1">
        <div class="icon">✓</div>
        <h3>Rule Tests</h3>
        <p>Test duplicate IP, subnet, gateway, interface, VLAN, and route checks.</p>
      </article>

      <article class="card reveal delay-2">
        <div class="icon">✓</div>
        <h3>AI Schema Tests</h3>
        <p>Reject malformed JSON, missing fields, invalid confidence, and incomplete evidence.</p>
      </article>
    </div>

    <div class="code reveal" style="margin-top:20px">
<pre>pytest
pytest --cov</pre>
    </div>
  </div>
</section>

<section id="responsible">
  <div class="container">
    <div class="section-head reveal">
      <div class="kicker">09 / Responsible AI</div>
      <h2>AI assists.<br>Humans decide.</h2>
      <p>
        NetSage does not automatically apply network changes. AI recommendations remain
        advisory until reviewed, and corrected cases are retained for evaluation.
      </p>
    </div>

    <div class="grid">
      <article class="card reveal">
        <span class="badge success">ACCEPTED</span>
        <h3 style="margin-top:16px">Diagnosis confirmed</h3>
        <p>The reviewer agrees with the AI diagnosis.</p>
      </article>

      <article class="card reveal delay-1">
        <span class="badge warning">EDITED</span>
        <h3 style="margin-top:16px">Diagnosis corrected</h3>
        <p>The AI identified the issue but required human correction.</p>
      </article>

      <article class="card reveal delay-2">
        <span class="badge danger">REJECTED</span>
        <h3 style="margin-top:16px">Diagnosis incorrect</h3>
        <p>The reviewer rejects the AI recommendation and records why.</p>
      </article>
    </div>
  </div>
</section>

</main>

<footer>
  <div class="container">
    <strong>NetSage AI</strong>
    <p>AI-assisted troubleshooting · Evidence-driven diagnosis · Human-controlled decisions</p>
  </div>
</footer>

<script>
const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
</script>

</body>
</html>
