export const toolPages = [
  {
    rel: '42.6 Security Tools/Burp Suite/index.mdx',
    title: 'Burp Suite',
    description:
      'An HTTP intercepting proxy used in authorized application assessments to inspect and reason about web traffic.',
    body: `
**Burp Suite** is a desktop proxy that sits between a browser and an app so an authorized tester can see requests the UI hides. PortSwigger ships Community and Professional editions. Defenders and AppSec engineers use it to **verify controls on systems they are allowed to test**. This page does not cover attack recipes or bypass chains.

## 1. Deep Dive and Mechanics

Traffic flows browser to Burp listener to target. The tester maps the app (which routes exist, which cookies are set) and checks whether the server enforces authn/authz that the UI claims. Repeater-style manual review is for understanding a single request you already generated in a normal session — still only in scope.

**In a SOC or platform team.** You care that employees do not point Burp at production without a ticket, that TLS interception uses an org CA you control, and that scan features stay off shared prod data.

**Alternatives.** OWASP ZAP is a common open-source cousin. The discipline is the same: authorized intercept, not "see what happens on a bank you do not own."

<Callout icon="warning" title="A proxy is a privileged seat">
Intercepting TLS requires a trust-on-first-use CA in the browser. Do that only on lab or enrolled test devices.
</Callout>

## 2. Mathematical / Theoretical Foundation

An intercepting proxy is a sanctioned man-in-the-middle for a client you configure. The security properties of the target app should not depend on the client being honest. Burp's value in AppSec is revealing that gap. Scope and legal authorization bound the work; the tool does not.

<ComparisonTable
  headers={['Edition / tool', 'Fits', 'Watch-out']}
  rows={[
    ['Burp Community', 'Manual AppSec learning', 'No licensed scanner'],
    ['Burp Pro', 'Authorized assessments', 'License and data handling'],
    ['ZAP', 'Open-source CI DAST', 'Tune noise'],
    ['Browser devtools', 'Tiny checks', 'Easy to miss cookies'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Authorized AppSec session
# - Written scope and staging host only
# - Org test CA on the test browser profile
# - No production customer data in saved project files
# - Findings go to the tracker, not a private stash
TICK3

CI DAST belongs on ephemeral environments with synthetic users.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Br[Test browser] --> Proxy[Burp listener]
    Proxy --> App[In-scope app]
    Proxy --> Notes[Finding notes]
    Notes --> Tick[Ticket]
TICK3

## 5. Interview Prep

**Q: Why a proxy instead of only reading code?**
**A:** The running app and the gateway may disagree with the source you were shown.

**Q: Is intercepting HTTPS "breaking encryption"?**
**A:** On a client you control, you installed a test CA. That is a lab technique, not a break of TLS on the internet.

**Q: Burp vs ZAP?**
**A:** Both are intercepting proxies. Pick licensing, CI fit, and team skill.

## 6. Production Use Cases

- **Internal AppSec** reviews of your own APIs.
- **Vendor assessments** with a contract.
- **Developer education** on why HttpOnly and server-side authz matter.

<Callout icon="tip" title="Keep project files out of Slack">
Saved sessions can contain tokens and personal data. Treat them as restricted evidence.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Cobalt Strike/index.mdx',
    title: 'Cobalt Strike',
    description:
      'A commercial adversary-simulation platform; defenders treat it as both a licensed exercise tool and a frequently abused C2 family.',
    body: `
**Cobalt Strike** is a licensed product for **authorized** red-team exercises. Criminals also abuse cracked copies, so SOCs hunt its beacon-like patterns. This page is for **defenders and program owners**: how to govern licensed use and what to detect. It does not describe how to deploy beacons, write payloads, or operate a C2 server.

## 1. Deep Dive and Mechanics

**Legitimate use.** A named red team with a charter, isolated infrastructure, and a halt button. The SOC may be blind during a covert exercise, but a trusted agent knows the infrastructure so a real incident is not confused forever.

**Abuse.** Stolen or cracked kits show up in incidents. EDR and network detections that look for the family's behaviors (odd outbound beacons, unusual process injection themes) are a detection-engineering problem, not a user manual.

**Governance.** Inventory who is allowed to run it, from where, and how long. Cracked copies on a "lab" laptop are a policy failure.

<Callout icon="error" title="Cracked Cobalt Strike is malware">
If it is not licensed and chartered, treat the binary as hostile and the host as infected.
</Callout>

## 2. Mathematical / Theoretical Foundation

C2 detection is a classification problem over periodic outbound connections and host behaviors. Licensed exercises create known-good labels for purple-team tuning. The dual-use nature of the product means your threat model must include both "we hired this" and "someone else did."

<ComparisonTable
  headers={['Context', 'Your job', 'Not your job']}
  rows={[
    ['Licensed exercise', 'Charter, isolate, debrief', 'Unbounded stealth'],
    ['Incident', 'Hunt and contain', 'Replay the kit'],
    ['Vendor intel', 'Ingest IOCs with TTL', 'Hoard samples in Slack'],
    ['HR / legal', 'Who may run it', 'Shadow IT "labs"'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Control owners
# - License named to the red-team lead
# - Infra in a dedicated cloud account with egress allow-lists
# - Trusted agent has indicator list for the window
# - After action: detections shipped, copies accounted for
TICK3

SOC runbooks should say how to tell an announced exercise from a real beacon.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Lic[License + charter] --> Ex[Exercise window]
    Ex --> TA[Trusted agent]
    TA --> SOC[SOC deconflict]
    Inc[Unplanned beacon] --> IR[Incident response]
TICK3

## 5. Interview Prep

**Q: Why do SOCs talk about this product so much?**
**A:** It is common in both paid exercises and crimeware. Detections transfer.

**Q: Should every company buy it?**
**A:** No. Most should buy better logging and a pentest. Simulation platforms are for mature programs.

**Q: What do you do if you find it on a workstation?**
**A:** Isolate, treat as an incident, and check whether a chartered exercise owns that hash and time.

## 6. Production Use Cases

- **Authorized red-team** programs with legal review.
- **Detection engineering** using vendor and community intel.
- **IR** playbooks that deconflict exercises.

<Callout icon="tip" title="Deconflict before you page the CEO">
A five-minute check with the trusted agent prevents two incidents: the real one and the self-inflicted one.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Ghidra/index.mdx',
    title: 'Ghidra',
    description:
      'NSA-released reverse-engineering suite used defensively to read binaries you are allowed to analyze.',
    body: `
**Ghidra** is a free reverse-engineering framework (disassembler, decompiler, project database). Malware analysts and vulnerability-intake engineers use it on **copies of software they are permitted to study**. This page does not cover cracking, DRM bypass, or turning bugs into exploits.

## 1. Deep Dive and Mechanics

You import a file, let the auto-analysis recover functions and a decompiler view, and write comments that become IR notes. Headless/scripted analysis is for scale (many samples, same questions). Collaboration features exist so two analysts do not fork comments.

**Fit.** Good enough for most defensive RE. Heavy commercial shops may still prefer IDA for some architectures or workflows. The bottleneck is usually analyst time, not the logo.

**Safety.** Open samples only in a lab project directory. Do not auto-analyze mystery files on a domain-joined laptop.

<Callout icon="info" title="Decompiler output is a hypothesis">
It is not the original source. Validate anything you will act on with a second artifact (behavior, log, vendor note).
</Callout>

## 2. Mathematical / Theoretical Foundation

Ghidra recovers a control-flow graph and a lifted intermediate representation, then pretty-prints C-like text. Correctness is heuristic. Packed or obfuscated samples increase the cost. Defenders stop when the decision (family, hunt, patch) is supported.

<ComparisonTable
  headers={['Tool', 'License', 'Defensive fit']}
  rows={[
    ['Ghidra', 'Apache-style free', 'Malware and intake'],
    ['IDA', 'Commercial', 'Shops that already script it'],
    ['Binary Ninja', 'Commercial', 'API-first teams'],
    ['strings + hash', 'OS tools', 'First five minutes'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lab project hygiene
# - Copies only; original hash recorded in the ticket
# - Project on an isolated analyst VM
# - Export: notes and IOCs, not the whole database to Slack
TICK3

Script recurring questions (signer, imports) instead of hand-clicking every sample.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Bin[Hashed copy] --> Imp[Import + auto-analysis]
    Imp --> Notes[Analyst comments]
    Notes --> Out[IR / detection notes]
TICK3

## 5. Interview Prep

**Q: Why Ghidra over paying for IDA?**
**A:** Cost, scripting, and "good enough" decompiler for many Intel/ARM samples. Use what the team will actually run.

**Q: Can Ghidra run the malware?**
**A:** It is primarily a static RE suite. Dynamic work belongs in a sandbox VM.

**Q: Legal?**
**A:** Analyzing a malware sample you received in IR is normal. Analyzing a competitor's product may not be.

## 6. Production Use Cases

- **SOC malware** queue for unique binaries.
- **Crash intake** on software you ship.
- **Firmware** notes on equipment you operate.

<Callout icon="tip" title="Time-box the decompiler">
If you cannot name a hunt after 90 minutes, escalate or reimage and move on.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Hashcat/index.mdx',
    title: 'Hashcat',
    description:
      'A password-recovery engine used in authorized audits of hashes you already own, to prove a policy is weak.',
    body: `
**Hashcat** is a high-performance password-recovery tool. In a defensive program it exists for one reason: **audit hashes you are allowed to have** (your own dump from a test IdP, a lab) so you can show that a policy or a KDF is insufficient. This page does not include recovery recipes, wordlists, or attack modes.

## 1. Deep Dive and Mechanics

Security teams sometimes recover a sample of their own password hashes in a controlled vault to measure guessability. The output is a **policy change** (length, blocklist, MFA, better KDF), not a trophy list of employee passwords in Slack.

**What you should do instead most of the time.** Use a memory-hard KDF (Argon2id), unique salts, breach password blocklists at set time, and phishing-resistant MFA. If you never store recoverable passwords, Hashcat has little to say.

**Legal.** Recovering hashes that are not yours is a crime. "Research" is not a defense if you do not own the data.

<Callout icon="error" title="Do not harvest production hashes for fun">
If you must audit, use an approved extract, a locked lab, and destroy the material after the metric is recorded.
</Callout>

## 2. Mathematical / Theoretical Foundation

Password recovery cost is guesses per second times the size of the guess space. KDFs add CPU/memory per guess. Salts stop precomputation across users. The defender's job is to make expected guesses exceed any reasonable budget and to add a second factor so a guessed password is not enough.

<ComparisonTable
  headers={['Store', 'Recovery cost', 'Do this']}
  rows={[
    ['Plain or reversible', 'Trivial', 'Never'],
    ['Unsalted fast hash', 'Low', 'Migrate now'],
    ['Salted bcrypt/scrypt/Argon2', 'High', 'Good baseline'],
    ['KDF + MFA + blocklist', 'Highest practical', 'Workforce default'],
  ]}
/>

## 3. Real-World Implementation

TICK3yaml
# Password policy (the real control)
min_length: 15
blocklist: breached_passwords
kdf: argon2id
mfa: required_for_all
audit: annual_authorized_sample_only
TICK3

Prefer passkeys or a password manager mandate over teaching people to rotate into seasonal words.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Store[Hashed passwords] --> Policy[KDF + salt + MFA]
    Audit[Authorized sample] --> Metric[Guessability metric]
    Metric --> Policy
TICK3

## 5. Interview Prep

**Q: Why is Hashcat in a security toolkit at all?**
**A:** To measure your own policy on data you own. Not to "see if we can get in."

**Q: Is a long passphrase enough?**
**A:** It helps. MFA and a KDF still matter because people reuse and phishing exists.

**Q: Hashcat vs John?**
**A:** Both are recovery tools. Hashcat is GPU-first. Your policy work is the same.

## 6. Production Use Cases

- **Annual password audit** under legal approval.
- **IdP migration** proving the old KDF was insufficient.
- **Education** for leadership on why MFA is not optional.

<Callout icon="tip" title="Publish the metric, not the passwords">
"12 percent of a sample fell to a modest budget" changes policy. A spreadsheet of names does not.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/IDA Pro/index.mdx',
    title: 'IDA Pro',
    description:
      'A commercial disassembler and debugger used in professional reverse engineering of permitted binaries.',
    body: `
**IDA Pro** (Hex-Rays) is a long-standing commercial RE workbench: disassembler, optional decompiler, debugger, and a large plugin culture. Defensive teams use it for malware and product crash analysis. This page does not cover exploit development or license circumvention.

## 1. Deep Dive and Mechanics

Workflow matches other RE suites: load a copy, let analysis name functions, add comments, and export notes. The debugger is for **lab VMs**, not production attach. Teams keep IDBs (databases) as work product with the same sensitivity as the sample.

**Why shops pay.** Architecture coverage, FLIRT-style library recognition, and years of internal scripts. Ghidra closed much of the gap for many Intel/ARM tasks.

**License hygiene.** Floating licenses and plugin policy belong to the lab owner. Cracked IDA on an analyst laptop is a compromise, not a shortcut.

<Callout icon="warning" title="A debugger is a live experiment">
Attach only to samples in a disposable VM. Never debug mystery binaries on a corp endpoint.
</Callout>

## 2. Mathematical / Theoretical Foundation

IDA's core is interactive disassembly: the analyst corrects the automatic CFG. The Hex-Rays decompiler is a heuristic translation from a microcode IR. Value is the annotated database, not a perfect C file. Decision-value-per-hour still applies.

<ComparisonTable
  headers={['Need', 'IDA role', 'Cheaper first step']}
  rows={[
    ['Family ID', 'When static is stuck', 'Hash / sandbox'],
    ['Crash root cause', 'Your own binary', 'Symbols + sanitizers'],
    ['Protocol notes', 'Legacy owned gear', 'Vendor docs'],
    ['Training', 'If you already own it', 'Ghidra'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lab standard
# - Licensed IDA on an isolated VM image
# - Samples and IDBs on an encrypted volume
# - Ticket link in the database comment header
TICK3

Back up IDBs like other evidence. They are expensive to recreate.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Copy[Hashed copy] --> IDA[IDA database]
    IDA --> Ann[Annotations]
    Ann --> IR[IR notes]
TICK3

## 5. Interview Prep

**Q: IDA vs Ghidra?**
**A:** Both recover CFGs and decompilation. IDA is commercial and script-mature in many shops. Ghidra is free and "good enough" for a lot of defensive work.

**Q: Do you need the decompiler?**
**A:** It speeds reading. You can still work from disassembly if budget is tight.

**Q: Can you share IDBs?**
**A:** Only inside the legal boundary. They may contain customer-derived samples.

## 6. Production Use Cases

- **Malware boutique** analysis.
- **Product security** crash triage on shipped native code.
- **OT firmware** you must support without a vendor.

<Callout icon="tip" title="Scripts beat heroics">
If you open IDA daily, automate the first ten questions.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/John the Ripper/index.mdx',
    title: 'John the Ripper',
    description:
      'A password-recovery toolkit used to audit hashes you own and to justify stronger KDFs and MFA.',
    body: `
**John the Ripper** is an open-source password-recovery project (often "John"). Like Hashcat, its only clean use in a company is an **authorized audit of your own hashes** to show residual guessability. This page does not include formats, wordlists, or recovery commands.

## 1. Deep Dive and Mechanics

An audit program extracts a sample from a test system or an approved production snapshot, runs a time-boxed recovery in a locked lab, and reports a percentage. Then you **destroy the extract**. The engineering follow-through is Argon2id, salt, blocklists, and MFA.

**Unix history.** John grew up around crypt(3)-style hashes. Modern orgs should not still store those for interactive login.

**Legal.** Other people's hashes, "just to see," are out of bounds.

<Callout icon="error" title="A recovered password list is toxic data">
Store the metric. Wipe the secrets. Tell people to rotate if the audit used real accounts.
</Callout>

## 2. Mathematical / Theoretical Foundation

Guessing is search over a distribution that is not uniform (people pick seasons and pets). A KDF multiplies work per guess. Unique salts prevent one precomputation from covering the directory. MFA changes the payoff: a guessed password should not open the session.

<ComparisonTable
  headers={['Control', 'What it does', 'Gap it leaves']}
  rows={[
    ['Length + blocklist', 'Removes easy guesses', 'Phishing'],
    ['Slow KDF + salt', 'Raises offline cost', 'Reuse elsewhere'],
    ['MFA', 'Second factor', 'Fatigue / bad UX'],
    ['Passkeys', 'No shared secret', 'Recovery flow'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Authorized audit record
# Approver, date, system, sample size
# Lab host id, duration cap
# Result: percent recovered (no plaintext retained)
# Follow-up ticket: policy / KDF / MFA
TICK3

Prefer forcing a reset over emailing anyone their recovered password.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Appr[Approval] --> Sample[Sample hashes]
    Sample --> Lab[Time-boxed lab]
    Lab --> Metric[Metric only]
    Metric --> Fix[Policy and KDF]
TICK3

## 5. Interview Prep

**Q: John vs Hashcat?**
**A:** Overlapping jobs. Hashcat is GPU-centric. John is common on Unix labs. Neither replaces MFA.

**Q: Should we audit monthly?**
**A:** Rarely. After a KDF change or a breach of the hash file, yes. Otherwise invest in IdP controls.

**Q: What if recovery is "too easy"?**
**A:** That is a successful audit. Fix the store and require MFA. Do not hide the result.

## 6. Production Use Cases

- **Legacy Linux** shadow-file migrations.
- **App-local** password tables you are deleting.
- **Compliance** evidence that offline guessability was measured.

<Callout icon="tip" title="Delete the app password table">
SSO plus passkeys makes this whole class of tools boring — that is the win.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Kali Linux/index.mdx',
    title: 'Kali Linux',
    description:
      'A Debian-based distribution that bundles security-assessment tools; treat it as a licensed lab image, not a daily driver.',
    body: `
**Kali Linux** is a Debian-derived distro from Offensive Security that preinstalls many assessment tools. It is a **convenience image for authorized lab and contracted test work**. It is not a magic hacker OS, not a place to do your banking, and not permission to scan the internet. This page does not document those tools' attack modes.

## 1. Deep Dive and Mechanics

Use Kali (or a slim custom image) as a **VM with snapshots**, on an isolated network, under a test charter. Update it; old Kali is just another unpatched box. Do not store customer data on it. Do not join it to the corp domain.

**Defender view.** Seeing Kali in your DHCP or EDR is a signal: lab, contractor, or someone improvising. Have an allow-list of test VLANs and treat the rest as an incident.

**Alternatives.** Many teams build a golden "assessment" VM with only the tools they need, or use cloud lab vendors, to shrink supply-chain surprise.

<Callout icon="warning" title="Kali is a toolkit, not an authorization">
The distro does not make scanning legal. Scope and a letter do.
</Callout>

## 2. Mathematical / Theoretical Foundation

A penetration-testing distro is a software supply chain: hundreds of packages with their own CVEs. Risk is dual-use software plus operator error (wrong interface, wrong RFC1918). Isolation and snapshots are the compensating controls.

<ComparisonTable
  headers={['Use', 'OK?', 'Control']}
  rows={[
    ['Chartered lab VM', 'Yes', 'Isolated net, snapshots'],
    ['Daily laptop', 'No', 'Use a boring OS'],
    ['Unscoped internet scan', 'No', 'Crime / ToS'],
    ['Mystery USB ISO', 'No', 'Supply-chain risk'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lab image policy
# - Official images only, checksum verified
# - Host-only or test VLAN networking
# - No corp SSO, no customer exports
# - Destroy or revert after the engagement
TICK3

Contractors should bring a process, not a surprise laptop on the prod Wi-Fi.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Img[Verified image] --> VM[Snapshot VM]
    VM --> Scope[In-scope lab]
    VM --> Wipe[Revert after]
    Bad[Kali on prod LAN] --> SOC[SOC ticket]
TICK3

## 5. Interview Prep

**Q: Do I need Kali to work in security?**
**A:** No. Most blue-team work is Windows logs, cloud consoles, and Python. Kali is optional convenience.

**Q: Why not install the tools on Ubuntu?**
**A:** You can. Kali is packaging. Many prefer a dedicated VM either way.

**Q: Is Kali "more secure"?**
**A:** It is a wide tool surface running as a powerful user. Treat it as dirty lab glassware.

## 6. Production Use Cases

- **Internal pentest** VMs on a test VLAN.
- **Training** classrooms with reset images.
- **SOC** detections for unexpected Kali DHCP fingerprints.

<Callout icon="tip" title="Checksum the ISO">
If you would not run a random Windows ISO, do not run a random Kali mirror either.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Metasploit/index.mdx',
    title: 'Metasploit Framework',
    description:
      'A Rapid7-maintained framework of modules used in authorized labs to verify that known issues are actually fixed.',
    body: `
The **Metasploit Framework** is a large, open toolkit used in **authorized** tests and in training labs to replay **known** vulnerability classes against systems you own. Defenders also study it to write detections. This page does not describe modules, payloads, or how to "pop a shell."

## 1. Deep Dive and Mechanics

**Legitimate use.** Confirm that last year's CVE is not still open on a lab clone, or that an IPS signature fires. That work happens on images you built, with a ticket, on a network that cannot reach customers.

**Defender use.** Know that commodity kits exist so you prioritize patching and EDR. Hunt for post-compromise behaviors in general (unexpected services, odd outbound) rather than memorizing a product.

**Risk.** Pointing a framework at the wrong CIDR is a change-control incident. Untrusted module source is a supply-chain incident.

<Callout icon="error" title="No scope, no framework">
If you do not have written authorization and a target list, you do not have a test. You have a policy violation.
</Callout>

## 2. Mathematical / Theoretical Foundation

Metasploit is a catalog that maps public vulnerability identifiers to reusable test code. Coverage of "the internet" is irrelevant; coverage of **your** unpatched surface is the metric. Detection engineering treats framework defaults as a labeled dataset for purple-team days — still without publishing those defaults here.

<ComparisonTable
  headers={['Use', 'Outcome', 'Forbidden']}
  rows={[
    ['Lab CVE verify', 'Patch proof', 'Customer networks'],
    ['Purple-team detect', 'New SIEM rule', 'Unannounced prod'],
    ['Training VM', 'Skill', 'Shared creds on the VM'],
    ['Internet "research"', 'None', 'Always'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lab verification record
# CVE, lab host name, snapshot id
# Expected: patched service refuses the old condition
# Evidence: ticket + screenshot of version / config
# No module output pasted into Slack
TICK3

Prefer vendor patches and version evidence over "we ran a kit and it failed" as the only proof.

## 4. Visualizations

TICK3mermaid
flowchart TD
    CVE[Known CVE] --> Patch[Patch in lab]
    Patch --> Verify[Authorized verify]
    Verify --> Prod[Promote patch]
    Kit[Unscoped use] --> IR[Treat as incident]
TICK3

## 5. Interview Prep

**Q: Is Metasploit required to be a pentester?**
**A:** No. Many assessments are authz and logic. A framework is optional and dangerous if sloppy.

**Q: Why do SOCs mention Meterpreter?**
**A:** It is a well-known post-compromise agent family. Detect the behaviors; do not practice them on corp.

**Q: Framework vs exploit PoC from the internet?**
**A:** Both are dual-use. Your job in this KB is to patch and detect, not to collect kits.

## 6. Production Use Cases

- **Patch verification** on isolated clones.
- **IPS/EDR** regression after a signature change.
- **IR awareness** training that stays conceptual.

<Callout icon="tip" title="Version pins beat kits">
A configuration-management report that nothing runs the vulnerable version is the control you want.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Nessus/index.mdx',
    title: 'Nessus',
    description:
      'A commercial vulnerability scanner that inventories known CVEs and misconfigurations on hosts you are allowed to scan.',
    body: `
**Nessus** (Tenable) is a vulnerability scanner. It logs into or fingerprints systems you authorize and reports missing patches, weak TLS, and default accounts. It is an **inventory and hygiene** tool. It is not a pentest and not a green checkbox that you are safe.

## 1. Deep Dive and Mechanics

**Authenticated scans** see real package versions. Unauthenticated scans see banners and are noisier and blinder. Credentials for the scanner should be least privilege, rotated, and not Domain Admin.

**Operations.** Schedule by environment. Freeze windows exist. A scan that knocks over an old printer is a change event — start with discovery, then credentialed, then coverage SLAs.

**Triage.** CVSS is a hint. Exploitability in your network, asset value, and compensating controls decide the ticket. Close with a version bump, not "risk accepted" forever.

<Callout icon="warning" title="A scanner can be a DoS">
Aggressive plugins against fragile OT or a Friday prod batch will make you famous in the wrong way.
</Callout>

## 2. Mathematical / Theoretical Foundation

A scanner is a classifier over version tuples and config checks. False positives come from banner lies and missing auth. False negatives come from unscanned subnets and software the plugin set does not know. Coverage is |scanned assets| / |CMDB assets|. Residual risk is the unscanned and the unfixed.

<ComparisonTable
  headers={['Mode', 'Sees', 'Risk']}
  rows={[
    ['Discover', 'Who is alive', 'Low'],
    ['Unauthenticated', 'Banners', 'Blind to missing patches'],
    ['Authenticated', 'Packages / registry', 'Needs locked creds'],
    ['Agent', 'Laptop fleets', 'Agent health'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Scan program
# - Creds: local scan user, no interactive login, vaulted
# - Prod: agreed window, start-of-change ticket
# - SLA: critical internet-facing in 7 days, else exception
# - Export to the same tracker as AppSec
TICK3

Deduplicate findings per image, not per clone of a scale set.

## 4. Visualizations

TICK3mermaid
flowchart LR
    CMDB[Asset inventory] --> Scan[Nessus]
    Scan --> Tri[Triage]
    Tri --> Patch[Patch / config]
    Tri --> Exc[Time-boxed exception]
TICK3

## 5. Interview Prep

**Q: Nessus vs pentest?**
**A:** Nessus lists known issues. A pentest shows impact and logic bugs scanners miss.

**Q: Why authenticated?**
**A:** Because "OpenSSH banner looks fine" is not the same as "kernel is current."

**Q: Nessus vs OpenVAS?**
**A:** Same job, different product and plugin economy. Process matters more than logo.

## 6. Production Use Cases

- **Weekly** infrastructure hygiene.
- **PCI ASV** adjacent internal scans (ASV itself is a specific service).
- **Laptop** fleets with agents.

<Callout icon="tip" title="Measure time-to-fix, not finding count">
A growing open-criticals chart is the only slide that matters.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Nmap/index.mdx',
    title: 'Nmap',
    description:
      'A network mapper used to inventory services on networks you own so you can shrink unexpected listeners.',
    body: `
**Nmap** is a service-discovery tool. Defenders use it (or safer CMDB + agent inventory) to answer: what is listening that we did not expect? Unauthorized scanning of networks you do not own is illegal and out of scope here. This page does not provide scan recipes or evasion techniques.

## 1. Deep Dive and Mechanics

**Defensive inventory.** Compare a permitted internal discovery against the CMDB. A new SSH on a printer VLAN or a forgotten RDP on the internet is a ticket. Prefer orchestrated, rate-limited discovery from a known scanner identity so SOC can allow-list it.

**What Nmap is not.** It is not stealth, not an exploit tool, and not a substitute for flow logs and cloud security-group reviews (which often find the same exposure with less drama).

**Policy.** Publish who may run discovery, from which jump host, and how the SOC recognizes it. Surprise Nmap from a laptop looks like recon because it is.

<Callout icon="warning" title="Scanning is a privilege">
Even inside the company, a careless sweep can trip IDS, crash brittle gear, or violate a customer contract.
</Callout>

## 2. Mathematical / Theoretical Foundation

Discovery is probing a space of address times port. Completeness trades with courtesy (rate) and with the target's filter (what they show you). The defensive metric is unexpected-listener count, not "how thoroughly we probed." Cloud APIs often give a more authoritative listener list than packets.

<ComparisonTable
  headers={['Source of truth', 'Best for', 'Gap']}
  rows={[
    ['Cloud SG / NSG / NACL', 'Public exposure', 'Host process vs rule'],
    ['Agent inventory', 'Laptops / VMs', 'Unmanaged devices'],
    ['Authorized mapper', 'Unknown listeners', 'Noise, fragility'],
    ['Flow logs', 'Who actually spoke', 'No payload'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Inventory control
# - Weekly export of public listeners from the cloud API
# - Diff vs last week; ticket new 0.0.0.0/0 admin ports
# - If a mapper is used: named host, change ticket, SOC notice
TICK3

Shut the port or put it behind SSO. Do not argue with the ticket about intent.

## 4. Visualizations

TICK3mermaid
flowchart TD
    API[Cloud / CMDB] --> Diff[Diff listeners]
    Diff --> Ticket[Unexpected service]
    Ticket --> Fix[Close or justify]
    Rogue[Unapproved scan] --> SOC[SOC investigate]
TICK3

## 5. Interview Prep

**Q: Is Nmap a vulnerability scanner?**
**A:** No. It finds services. Vulnerability scanners (and humans) judge versions and config.

**Q: Why do SOCs alert on it?**
**A:** Because the same packets appear in real reconnaissance. Allow-list your official scanner.

**Q: Better first step for cloud?**
**A:** Dump security groups and public IPs. You will find most of the embarrassment without a packet tool.

## 6. Production Use Cases

- **Attack-surface** reviews of your own ranges.
- **M&A** inventory of an inherited plant network (with authorization).
- **SOC** tuning so official discovery is not a sev-1.

<Callout icon="tip" title="Prefer the control-plane list">
Cloud APIs do not lie about the rule. Hosts sometimes lie about the banner.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/OWASP ZAP/index.mdx',
    title: 'OWASP ZAP',
    description:
      'An open-source intercepting proxy and DAST engine for authorized tests of your own web apps.',
    body: `
**OWASP ZED Attack Proxy (ZAP)** is a free intercepting proxy and scanner for web apps. AppSec teams put it in CI against **ephemeral preview environments** with synthetic users. It is not permission to scan third-party sites. This page does not cover exploit payloads or bypass recipes.

## 1. Deep Dive and Mechanics

**Manual.** Same idea as Burp: see the real requests, check that authz is server-side.

**Automation.** Baseline or full scans in CI on a disposable URL. Fail the build on high-confidence issues you have tuned (missing CSP is a conversation; a true open redirect on login is a stop). Keep the scan identity documented so prod WAF does not page.

**Noise.** DAST will yell. Maintain an allow-list with expiry, not a culture of ignoring the job.

<Callout icon="info" title="DAST cannot see your IDOR if it cannot log in">
Give the scanner a real role and a second role if you want access-control findings. Still only on systems you own.
</Callout>

## 2. Mathematical / Theoretical Foundation

DAST is dynamic testing: it explores a state graph of HTTP. Coverage is bounded by crawl quality and auth. False positives are inherent. Pair with SAST and code review. The CI gate is a policy on expected value, not a proof of absence of bugs.

<ComparisonTable
  headers={['Mode', 'When', 'Limit']}
  rows={[
    ['Proxy manual', 'Feature review', 'Human time'],
    ['CI baseline', 'Every PR preview', 'Shallow'],
    ['Nightly deeper', 'Main branch env', 'Flaky apps'],
    ['Prod scan', 'Rare, agreed', 'Customers and WAF'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# CI DAST
# - Preview URL + synthetic user
# - Timeout and memory caps
# - Fail on tuned high rules only
# - Upload HTML report as a build artifact (restricted)
TICK3

Do not scan production from a PR. You will DDoS yourself and poison analytics.

## 4. Visualizations

TICK3mermaid
flowchart LR
    PR[Preview deploy] --> ZAP[ZAP baseline]
    ZAP --> Gate[CI gate]
    Gate --> Ticket[New true positives]
TICK3

## 5. Interview Prep

**Q: ZAP vs Burp?**
**A:** Overlapping proxy jobs. ZAP is open and CI-friendly. Burp Pro is a common human-driven suite.

**Q: Will ZAP replace a pentest?**
**A:** No. It catches hygiene and some injection classes. Humans catch logic.

**Q: Safe to scan prod?**
**A:** Only with a window, rate limits, and a story for side effects (orders, emails).

## 6. Production Use Cases

- **PR previews** for internal apps.
- **Nightly** scans of staging.
- **Training** developers to read HTTP.

<Callout icon="tip" title="Tune or die">
An untuned DAST job becomes wallpaper in two sprints.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/OpenVAS/index.mdx',
    title: 'OpenVAS',
    description:
      'An open-source vulnerability scanner (Greenbone) for authorized inventories of known issues on your hosts.',
    body: `
**OpenVAS** (the Greenbone Vulnerability Management stack) is an open-source cousin of commercial vuln scanners. It checks systems you authorize for known CVEs and weak configs. Use it as a **hygiene loop**, not as a pentest and not as a license to scan strangers.

## 1. Deep Dive and Mechanics

You deploy a manager plus sensors, feed them an allow-listed address space, and prefer **authenticated** checks. Feed quality and update cadence matter; a stale feed is a false sense of safety.

**Ops.** Same rules as Nessus: change windows, fragile OT, least-privilege scan creds, and tickets with SLAs. Deduplicate by image.

**Fit.** Budget-conscious orgs and labs. Enterprises may still buy a commercial feed and UI. The process is the product.

<Callout icon="warning" title="Open source does not mean unscoped">
Your legal boundary is the same as with a paid scanner.
</Callout>

## 2. Mathematical / Theoretical Foundation

Plugin hits are version and config predicates. Error bars are unscanned assets and lying banners. Track coverage and age of criticals. Do not average CVSS into a single "security score" for the board.

<ComparisonTable
  headers={['Scanner', 'Cost model', 'You still need']}
  rows={[
    ['OpenVAS / Greenbone', 'Software + people', 'Creds, SLAs, owners'],
    ['Nessus / Qualys / InsightVM', 'License + people', 'Same process'],
    ['Cloud posture', 'CSPM', 'IAM and data, not packages'],
    ['Agent inventory', 'EDR / MDM', 'Patch pipeline'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Program checklist
# - Feed updates on a calendar
# - Authenticated scans for servers you own
# - Ticket SLA by severity and exposure
# - Exception register with expiry
TICK3

If nobody owns the OpenVAS VM, it will become an unpatched scanner — irony you cannot afford.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Feed[Updated feed] --> Sens[Sensor]
    Sens --> Findings[Findings]
    Findings --> Owners[Asset owners]
    Owners --> Fix[Patch]
TICK3

## 5. Interview Prep

**Q: OpenVAS vs Nessus?**
**A:** Same category. Licensing, feed, and UI differ. Ask about coverage and process.

**Q: Why do findings disagree across scanners?**
**A:** Different plugins and auth. Reconcile on package version, not on who yelled first.

**Q: Can I scan the internet "for research"?**
**A:** Not with this KB's blessing. Scan what you own or what a contract names.

## 6. Production Use Cases

- **Internal server** hygiene in cost-sensitive orgs.
- **Lab** networks for training.
- **Second opinion** next to a commercial scanner.

<Callout icon="tip" title="Patch the scanner too">
A vuln scanner with a stale OS is a free foothold on the management network.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Snort/index.mdx',
    title: 'Snort',
    description:
      'An open-source network IDS/IPS that matches traffic against rules so you can detect or drop known-bad patterns.',
    body: `
**Snort** is a long-lived network intrusion detection (and, in-line, prevention) engine. You feed it a span or a bump-in-the-wire and a ruleset. It is a **detection control**, not an attack tool. Encrypted traffic limits what payload rules can see unless you inspect at a trusted break.

## 1. Deep Dive and Mechanics

**IDS mode.** Copy of traffic, alerts to the SIEM. Safe. **IPS mode.** In-line drop. Fast and able to hurt availability if a rule is wrong.

**Rules.** Community, subscription, and your locals. Each rule needs an owner and a disable path. Tune or you will drown.

**Placement.** Internet edge, egress, and a few east-west chokepoints. You cannot span the whole cloud by wishing.

<Callout icon="info" title="TLS is most of the packet">
Without a designed TLS inspection point, many payload rules become metadata and JA3-style guesses.
</Callout>

## 2. Mathematical / Theoretical Foundation

Snort rules are pattern matchers over packets and streams (content, PCRE, flow). Detection is approximate: evasion and encryption exist. IPS adds a fail-closed/fail-open decision. False-positive rate times traffic volume is the SOC cost.

<ComparisonTable
  headers={['Mode', 'On path?', 'Failure']}
  rows={[
    ['IDS', 'No', 'You miss silently'],
    ['IPS', 'Yes', 'You drop good traffic'],
    ['NSM (Suricata/Zeek)', 'Usually no', 'Storage cost'],
    ['Host EDR', 'Host', 'Unmanaged devices'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Rule hygiene
# - Pull official sets on a schedule
# - Every local rule has an owner and a ticket
# - Disable with a comment, never "delete and forget"
# - Alert to SIEM with sensor id and src/dst
TICK3

Test new drop rules in alert-only for a week.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Span[Span or in-line] --> Snort[Snort]
    Snort --> SIEM[SIEM]
    Snort --> Drop[Optional drop]
TICK3

## 5. Interview Prep

**Q: Snort vs Suricata?**
**A:** Same niche. Suricata is multi-thread and often faster on modern NICs. Snort 3 modernized the old engine. Pick operations, not religion.

**Q: IDS vs IPS?**
**A:** Detect vs block. Blocking needs change control and a rollback.

**Q: Why still use NIDS in a Zero Trust world?**
**A:** Egress malware, guest networks, and places you do not have EDR.

## 6. Production Use Cases

- **Campus egress** IDS.
- **OT** spans where you cannot put agents.
- **Lab** teaching of detection engineering.

<Callout icon="tip" title="Name the sensor in the alert">
"Snort fired" without which site and which interface is not an alert.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Splunk/index.mdx',
    title: 'Splunk',
    description:
      'A commercial log platform used as a SIEM: ingest, search, alert, and retain security telemetry.',
    body: `
**Splunk** is a widely deployed log and SIEM platform. Security teams use it to **search and alert** on auth, EDR, proxy, and cloud audit data. It is not magic visibility. If you did not collect the log, Splunk cannot invent it. Cost is usually ingest volume, so the architecture problem is **what to keep hot**.

## 1. Deep Dive and Mechanics

**Ingest.** Forwarders or APIs land events. Parse enough fields to alert (user, src, dest, action). Normalize with a CIM-like model so a failed login looks the same from Okta and from VPN.

**Detect.** Saved searches and risk-based alerting. Each notable needs a runbook and an owner. Correlation is "these two facts together," not a 40-join novel.

**Retain.** Hot/warm/cold and an archive. IR will ask for 90 days the first time you kept 7.

<Callout icon="warning" title="License pressure deletes your best evidence">
If finance caps ingest, cut debug logs before you cut IdP and EDR.
</Callout>

## 2. Mathematical / Theoretical Foundation

A SIEM is an index plus a query language plus a scheduler. Detection quality is precision/recall under an ingest budget. Cardinality of fields (user, dest) drives storage. Risk scores are weighted sums — be honest that the weights are policy, not physics.

<ComparisonTable
  headers={['Data', 'Keep hot?', 'Why']}
  rows={[
    ['IdP / VPN / EDR', 'Yes', 'IR always asks'],
    ['Cloud audit', 'Yes', 'Key theft'],
    ['App debug', 'Sample', 'Cost'],
    ['Packet PCAP', 'On demand', 'Storage'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Use-case: repeated SSO failures then a success from a new country
# Data: IdP + VPN
# Action: revoke sessions, page identity on-call
# Tune: known travel, break-glass accounts
TICK3

Require a named owner on every enabled notable. Ownerless alerts are noise.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Src[Log sources] --> Fwd[Forwarders]
    Fwd --> Idx[Indexers]
    Idx --> SH[Search head]
    SH --> SOC[SOC notable]
TICK3

## 5. Interview Prep

**Q: Splunk vs "the cloud SIEM"?**
**A:** Same job. Ask about ingest cost, detection-as-code, and who writes the searches.

**Q: What is a notable?**
**A:** An alert instance the SOC is meant to work. If they cannot work it, it should not exist.

**Q: How long to retain?**
**A:** Threat and legal (often 90–365 days for security logs). Decide on purpose, not default.

## 6. Production Use Cases

- **Enterprise SOC** correlation.
- **Compliance** evidence searches.
- **Threat hunts** with a saved hypothesis.

<Callout icon="tip" title="Detection as code">
Reviews for searches should look like reviews for application code.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Suricata/index.mdx',
    title: 'Suricata',
    description:
      'A multi-threaded IDS/IPS and network security monitoring engine for detecting hostile traffic on links you control.',
    body: `
**Suricata** is an open-source IDS/IPS and NSM engine (OISF). It inspects traffic you feed it and can emit alerts plus protocol logs (HTTP, DNS, TLS metadata). Defenders use it on **their** spans and gateways. This page is about detection operations, not evasion or offensive use.

## 1. Deep Dive and Mechanics

**Performance.** Multi-thread and a modern capture story (AF_PACKET, DPDK in some shops). That is why many teams picked it over legacy single-thread Snort.

**Outputs.** EVE JSON to a SIEM or to a lake. TLS SNI, DNS queries, and file hashes from reconstructed streams are often more useful than a single payload rule.

**Rules.** Emerging Threats and others. Same hygiene as Snort: owners, staging, and no silent IPS in week one.

<Callout icon="info" title="Metadata outlives payload rules">
Even when HTTPS hides the body, DNS and SNI still tell a story — and they are still privacy-sensitive logs.
</Callout>

## 2. Mathematical / Theoretical Foundation

Suricata is a stream reassembly and signature engine plus protocol parsers. Throughput is packets per second versus CPU and a drop counter you must watch. Detection remains a pattern-match with evasion and encryption limits. NSM logs are a high-volume telemetry source; sample or filter or go bankrupt on storage.

<ComparisonTable
  headers={['Output', 'Use', 'Careful']}
  rows={[
    ['Alert', 'SOC queue', 'Noise'],
    ['EVE DNS/TLS', 'Hunt', 'PII in names'],
    ['Files', 'Malware hash', 'Disk'],
    ['Drop (IPS)', 'Block', 'Availability'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Sensor standard
# - Named site and link
# - EVE to SIEM with sensor tags
# - Drop counters on the dashboard
# - New drop rules alert-only first
TICK3

Keep a packet-loss graph next to the alert graph. A silent sensor is worse than none.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Nic[Capture] --> Sur[Suricata]
    Sur --> Eve[EVE JSON]
    Eve --> SIEM[SIEM / lake]
    Sur --> Alert[Alerts]
TICK3

## 5. Interview Prep

**Q: Suricata vs Snort vs Zeek?**
**A:** Suricata and Snort are signature IDS/IPS. Zeek is a protocol logger and scripting NSM. Many stacks run Suricata plus Zeek.

**Q: Why EVE JSON?**
**A:** One structured stream for alerts and protocol events. Easier than a pile of custom log formats.

**Q: Cloud equivalent?**
**A:** VPC traffic mirroring is expensive. Often you use DNS, flow, and host EDR instead of a full NIDS.

## 6. Production Use Cases

- **Egress** monitoring at the office edge.
- **DC** chokepoints you still own.
- **Purple-team** validation that a scenario produced an alert.

<Callout icon="tip" title="Watch the drop counter">
If the NIC is overflowing, you are not detecting. You are sampling at random.
</Callout>
`,
  },
  {
    rel: '42.6 Security Tools/Wireshark/index.mdx',
    title: 'Wireshark',
    description:
      'A GUI packet analyzer for troubleshooting and incident work on captures you are allowed to take.',
    body: `
**Wireshark** (and CLI tshark) decodes packet captures so you can see why a handshake failed or whether a host spoke to an unexpected name. It is a **microscope for authorized captures**. Capturing on a shared LAN without a charter can be illegal wiretapping. This page does not cover interception tricks or credential harvesting.

## 1. Deep Dive and Mechanics

**Capture.** On a span, a tap, or the local host you own. Write to pcap with a size limit. Stop. Analyze the file, not a forever live click-fest on a busy link.

**Analyze.** Display filters (tls, dns, ip.addr) to shrink the view. Follow a TCP stream for a cleartext protocol you are allowed to see. For TLS you will mostly see metadata unless you have a lab key you are allowed to load.

**Privacy.** Pcaps contain everything: tokens, health data, home addresses in DNS. Treat them as restricted evidence. Do not email them.

<Callout icon="warning" title="A pcap is a full recording">
If you would not put the payload in a ticket, do not put the pcap on a shared drive.
</Callout>

## 2. Mathematical / Theoretical Foundation

Packet analysis is reconstructing streams from a capture with possible loss. Wireshark's dissectors implement protocol state machines. Completeness requires you were on path. Encrypted payloads reduce the tool to timing, sizes, and cleartext headers (SNI depending on TLS version and settings).

<ComparisonTable
  headers={['Job', 'Wireshark', 'Better tool']}
  rows={[
    ['One broken handshake', 'Excellent', 'Sometimes just ssl_error logs'],
    ['Fleet malware', 'Too small', 'EDR + DNS'],
    ['Legal evidence', 'If hashed pcap', 'Full IR process'],
    ['Perf in the cloud', 'Hard to span', 'VPC flow, service mesh'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Capture card
# Reason, approver, host or tap
# Max size / time, SHA-256 of the file
# Retention and who may read
# Delete when the ticket closes
TICK3

On endpoints, prefer a short capture during a repro over a weekend-long sniff.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Auth[Authorization] --> Cap[Limited capture]
    Cap --> Hash[Hash + store]
    Hash --> Analyze[Analyze copy]
    Analyze --> Delete[Delete on close]
TICK3

## 5. Interview Prep

**Q: Wireshark vs tcpdump?**
**A:** tcpdump captures. Wireshark is the richer decoder GUI. Same legal rules.

**Q: Can you read HTTPS?**
**A:** Not the body, unless you have a permitted lab key or a TLS break you already operate.

**Q: Why is my capture empty in the cloud?**
**A:** You are not on path. Use flow logs or a service mesh tap the platform provides.

## 6. Production Use Cases

- **IR** on a single host's odd connections.
- **TLS** troubleshooting in a staging lab.
- **OT** protocol debugging on a tap you own.

<Callout icon="tip" title="Filter at capture time when you can">
A 40 GB pcap of the wrong VLAN helps no one and endangers everyone in it.
</Callout>
`,
  },
]
