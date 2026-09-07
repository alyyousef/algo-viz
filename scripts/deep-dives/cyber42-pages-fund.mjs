export const fundPages = [
  {
    rel: 'Attack surface/index.mdx',
    title: 'Attack Surface',
    description:
      'The set of reachable interfaces, identities, and data stores a hostile party could try to abuse.',
    body: `
The **attack surface** is everything an outsider or insider can reach: public IPs, SaaS tenants, employee laptops, vendor VPNs, forgotten subdomains, and the APIs behind your mobile app. You cannot patch what you cannot see. The discipline is **inventory, shrink, and watch**.

## 1. Deep Dive and Mechanics

**External.** DNS names, certificates, cloud public IPs, object stores, and partner callbacks. Shadow IT and expired marketing sites are regular members.

**Identity.** Every account that can mint a session — humans, CI bots, OAuth apps — is surface. A public login box is smaller than a leaked refresh token with no rotation.

**Internal.** Flat networks and standing admin make the internal surface almost equal to "any phished laptop." Segmentation and least privilege shrink that.

<Callout icon="info" title="Surface is not just ports">
A support inbox that will reset a password from a convincing story is surface. So is an S3 bucket with a guessable name.
</Callout>

## 2. Mathematical / Theoretical Foundation

Model surface as a set of entry points with reachability to assets. Risk is not |surface| alone; it is the measure of high-value, low-control points. External attack-surface management (EASM) is a discovery process with false positives. The useful derivative is d(unexpected public services)/dt, not a vanity count of IPs.

<ComparisonTable
  headers={['Slice', 'Examples', 'Shrink by']}
  rows={[
    ['Network', 'Public IPs, VPNs', 'SG review, close admin'],
    ['App', 'Routes, uploads', 'Authz, WAF, less debug'],
    ['Identity', 'SSO, tokens, keys', 'MFA, rotation, JIT'],
    ['Supply', 'Vendors, CI', 'BAA, least scope, OIDC'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Weekly surface review
# - Dump public IPs, load balancers, and DNS
# - Diff vs last week
# - Ticket new listeners and unknown certificates
# - Confirm object stores block public access
TICK3

Give someone the job. An unread EASM email is not a control.

## 4. Visualizations

TICK3mermaid
flowchart TD
    DNS[DNS / certs] --> Inv[Inventory]
    Cloud[Public cloud IPs] --> Inv
    IdP[Identities] --> Inv
    Inv --> Shrink[Close or gate]
    Shrink --> Watch[Monitor diffs]
TICK3

## 5. Interview Prep

**Q: Attack surface vs attack vector?**
**A:** Surface is what exists to touch. A vector is a path through it (phish, stolen key, vuln).

**Q: How do you shrink it?**
**A:** Remove products, close ports, require SSO, delete unused apps, and segment.

**Q: Why do acquisitions hurt?**
**A:** You inherit unknown DNS and VPN concentrators on Friday afternoon.

## 6. Production Use Cases

- **Internet-facing** product orgs.
- **M&A** day-1 inventory.
- **Bug bounty** scope that matches reality.

<Callout icon="tip" title="Your marketing subdomain is in scope whether you like it or not">
Attackers do not honor the org chart.
</Callout>
`,
  },
  {
    rel: 'Authentication/index.mdx',
    title: 'Authentication',
    description:
      'The process of verifying that a principal is who or what it claims to be before a session starts.',
    body: `
**Authentication (authn)** answers "who is this?" A password, a passkey, a one-time code, or a workload certificate are authenticators. A session cookie or token is the later proof. Authentication is not authorization. A perfect login to the wrong permission set is still a breach.

## 1. Deep Dive and Mechanics

A good login verifies a secret or a hardware-bound key, then **issues a new session identifier** that is random, stored server-side or as a short-lived signed token with rotation, and bound to a cookie with Secure and HttpOnly flags when the client is a browser.

**Factors.** Something you know, have, or are. Phishing-resistant factors (WebAuthn) beat OTPs that can be relayed. Workloads should use cloud roles or SPIFFE-style identities, not a password in an env file.

**Lifecycle.** Disable on leaver. Step-up for sensitive actions. Invalidate sessions on password change.

<Callout icon="warning" title="A login API that trusts a client-supplied user id is not authentication">
That is a costume. The server must verify an authenticator.
</Callout>

## 2. Mathematical / Theoretical Foundation

Authentication protocols need freshness (nonces, timestamps) so replays fail. Session IDs need enough entropy that guessing is worse than other breaks (128+ bits). Password KDFs exist because humans pick low-entropy secrets. WebAuthn is a challenge-response that keeps the private key in an authenticator.

<ComparisonTable
  headers={['Authenticator', 'Phish resistant?', 'Typical use']}
  rows={[
    ['Password', 'No', 'Legacy, plus extras'],
    ['OTP / SMS', 'No', 'Better than password only'],
    ['WebAuthn / passkey', 'Yes', 'Workforce and consumer'],
    ['Workload cert / role', 'N/A (machine)', 'Services'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import secrets

def new_session_id() -> str:
    return secrets.token_urlsafe(32)
TICK3

Rotate the id at login and after step-up. Store reset tokens as hashes with a short TTL.

## 4. Visualizations

TICK3mermaid
flowchart TD
    U[Authenticator] --> V[Verify]
    V --> Rot[New session id]
    Rot --> C[Secure cookie or short token]
    C --> Later[Later requests]
TICK3

## 5. Interview Prep

**Q: Authn vs authz?**
**A:** Authn identifies. Authz permits. Mixing them is how "logged in" becomes "admin."

**Q: Why not JWT in localStorage?**
**A:** XSS can read it. Prefer HttpOnly cookies or a BFF.

**Q: Is MFA always enough?**
**A:** Promptable MFA can be phished. Prefer phishing-resistant MFA for admins.

## 6. Production Use Cases

- **Consumer** login with stuffing defenses.
- **Workforce SSO** to the IdP.
- **Service-to-service** identities in the mesh.

<Callout icon="tip" title="Log success and failure, never the secret">
You need the timeline. You do not need the password in the log line.
</Callout>
`,
  },
  {
    rel: 'Authorisation/index.mdx',
    title: 'Authorisation',
    description:
      'The decision of what an already-authenticated principal may do to a given resource.',
    body: `
**Authorisation (authz)** answers "may they do this?" after authentication. It is the check on every request: this user, this verb, this object, this tenant. Hidden buttons are not authz. The server must deny by default.

## 1. Deep Dive and Mechanics

Put the decision in a shared layer (policy engine, middleware, or capability tokens you mint). Look up the object, then test ownership, role, or relationship. Do not trust a client-supplied owner id.

**Models.** RBAC for job bundles. ABAC for attributes (clearance, geo). ReBAC for document sharing. Hybrid is normal.

**Failures.** IDOR (change the id), missing function-level checks, and cross-tenant leaks in SaaS. Tests should call the API as user A against user B's objects.

<Callout icon="error" title="UI hiding is not a control">
If the API performs the action, the API must refuse it.
</Callout>

## 2. Mathematical / Theoretical Foundation

Authz is a function allow(principal, action, resource, context) to boolean. Confused-deputy bugs happen when a powerful service uses its own identity to act on a caller-supplied target. Formal policy languages (Rego, Cedar, Zanzibar-style graphs) exist so the function is reviewable and testable.

<ComparisonTable
  headers={['Model', 'Grant', 'Typical fail']}
  rows={[
    ['RBAC', 'Role contains verbs', 'Role explosion / stale admin'],
    ['ABAC', 'Policy on attributes', 'Attribute lying / drift'],
    ['ReBAC', 'Walk relationships', 'Missing edge checks'],
    ['ACL', 'Per-object list', 'Does not scale'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def can_read(user, doc) -> bool:
    if user.role == "admin" and user.tenant == doc.tenant:
        return True
    return doc.owner_id == user.id and user.tenant == doc.tenant
TICK3

Always compare tenant. Always load the doc server-side. Never take owner_id from the body as truth.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Request] --> Authn[Authenticated principal]
    Authn --> Load[Load resource]
    Load --> Pol[Policy decide]
    Pol --> Allow[Allow]
    Pol --> Deny[Deny + log]
TICK3

## 5. Interview Prep

**Q: Why is broken access control OWASP number one?**
**A:** Every feature adds an object id. People forget the check. Impact is direct data.

**Q: RBAC vs ABAC?**
**A:** RBAC is simple until it is not. ABAC fits messy tenancy and risk, at the cost of policy complexity.

**Q: Can the gateway do all authz?**
**A:** Coarse yes (is this user in the app). Object-level usually needs the service that owns the object.

## 6. Production Use Cases

- **Multi-tenant SaaS** object APIs.
- **Admin consoles** with step-up plus role checks.
- **Internal tools** that must not be "VPN equals admin."

<Callout icon="tip" title="Write the negative test first">
User A must get 404 or 403 on user B's invoice. If you did not write that test, you do not have authz.
</Callout>
`,
  },
  {
    rel: 'CIA triad/index.mdx',
    title: 'The CIA Triad',
    description:
      'Confidentiality, integrity, and availability — the three properties every security control is trying to protect.',
    body: `
The **CIA triad** is the shortest useful model of what "secure" means. **Confidentiality** is who may read. **Integrity** is who may change and whether you can detect change. **Availability** is whether authorized people can use the system. Every control maps to at least one. Trade-offs are normal: a lockout policy helps confidentiality and can hurt availability.

## 1. Deep Dive and Mechanics

**Confidentiality.** Encryption at rest and in transit, access control, and least privilege. A public bucket fails this pillar even if nobody "hacked" a server.

**Integrity.** Hashes, signatures, backups with immutability, input validation, and change control. Ransomware is an integrity and availability event.

**Availability.** Redundancy, DDoS absorption, patching that does not brick the fleet, and tested restores. A perfectly secret dead system is still a failure.

<Callout icon="info" title="Sometimes people add authenticity or non-repudiation">
Those are useful. Start with CIA; you can always refine.
</Callout>

## 2. Mathematical / Theoretical Foundation

CIA is a requirements taxonomy, not a theorem. Confidentiality is closeness to Shannon-style secrecy in practice (keys, access). Integrity is unforgeability and tamper evidence (MAC, signature, hash chain). Availability is a reliability SLO under adversarial load as well as honest failure. You cannot maximize all three without cost.

<ComparisonTable
  headers={['Pillar', 'Fails when', 'Typical control']}
  rows={[
    ['Confidentiality', 'Wrong party reads', 'Encryption, IAM'],
    ['Integrity', 'Wrong party changes', 'Signatures, FIM'],
    ['Availability', 'Right party cannot use', 'HA, backups, DDoS'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Design review prompt
# - Who may read this field?
# - How do we detect unauthorized change?
# - What happens if this region or this key store dies?
TICK3

Write the answers in the design doc. "We use AWS" is not an answer.

## 4. Visualizations

TICK3mermaid
flowchart LR
    C[Confidentiality] --> Sys[System]
    I[Integrity] --> Sys
    A[Availability] --> Sys
    Sys --> Trade[Explicit trade-offs]
TICK3

## 5. Interview Prep

**Q: Give one control per pillar.**
**A:** TLS (C), signed commits or hashes (I), multi-AZ plus backups (A).

**Q: Where does MFA sit?**
**A:** Mostly confidentiality and integrity of sessions. Done badly it harms availability.

**Q: Is CIA enough for privacy law?**
**A:** No. Privacy adds purpose, minimisation, and rights. CIA is still the security core.

## 6. Production Use Cases

- **Architecture reviews** of a new service.
- **Incident severity** (which pillars were hit).
- **Control mapping** in GRC.

<Callout icon="tip" title="Name the pillar in the ticket">
"Fix availability" and "stop the leak" are different owners and different clocks.
</Callout>
`,
  },
  {
    rel: 'Defence in depth/index.mdx',
    title: 'Defence in Depth',
    description:
      'Layering independent controls so the failure of one does not equal a full compromise.',
    body: `
**Defence in depth** means more than one independent control between a threat and an asset. A WAF without authz is a single pane of glass. Authz without logging is a silent failure. Depth is **heterogeneous layers**: identity, network, host, application, data, and detection.

## 1. Deep Dive and Mechanics

Pick layers that fail differently. MFA fails phishing (sometimes). Network policy fails a stolen laptop less. EDR fails a novel file less. Immutable backups fail ransomware's encryption. None is enough.

**Anti-pattern.** Six products that all check the same WAF signature, or "we have a firewall" as the entire story. Depth is not a shopping count.

**Measure.** For a crown-jewel path, list the controls a single stolen laptop would still have to pass. If the answer is "none," you have a moat-and-hope design.

<Callout icon="warning" title="Duplicate tools are not depth">
Two AV engines on one host can still miss the same class. Different layers, different failure modes.
</Callout>

## 2. Mathematical / Theoretical Foundation

If controls are independent with miss probabilities p_i, the joint miss is the product — independence is the lie you must check. Common-mode failure (one IdP, one CI, one cloud account) collapses the product. Reliability engineering's "redundant diverse systems" is the same idea.

<ComparisonTable
  headers={['Layer', 'Example', 'Fails when']}
  rows={[
    ['Identity', 'SSO + MFA', 'Session theft'],
    ['Network', 'Segmentation', 'Allowed path'],
    ['Host', 'EDR + hardening', 'No sensor'],
    ['Data', 'Encryption + backup', 'Key + live encrypt'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Crown-jewel path
# Asset: payroll DB
# Layers: SSO, JIT admin, private net, IAM role, encryption, audit, immutable backup
# Exercise: which still hold if a laptop is phished?
TICK3

If the honest answer is "the phish is enough," add a layer or shrink standing access.

## 4. Visualizations

TICK3mermaid
flowchart TD
    T[Threat] --> L1[Identity]
    L1 --> L2[Network]
    L2 --> L3[Host]
    L3 --> L4[App authz]
    L4 --> L5[Data + backup]
    L5 --> A[Asset]
TICK3

## 5. Interview Prep

**Q: Depth vs hard perimeter?**
**A:** Perimeter is one layer. Depth assumes that layer fails.

**Q: Is Zero Trust against depth?**
**A:** No. Zero Trust is identity-centric depth. You still want detection and backups.

**Q: How many layers?**
**A:** Enough that one realistic failure does not reach the jewel. Not "all the vendors."

## 6. Production Use Cases

- **Ransomware** programs (prevent + detect + immutable backup).
- **Payments** (PCI plus app authz plus monitoring).
- **Admin planes** (PAM + network + logging).

<Callout icon="tip" title="Test a layer by removing it on paper">
If the story collapses, that layer was your only control.
</Callout>
`,
  },
  {
    rel: 'Exploits/index.mdx',
    title: 'Exploits',
    description:
      'Programs or techniques that use a vulnerability to cause unintended behavior — discussed here only as a thing to prevent and detect.',
    body: `
An **exploit** is a use of a vulnerability that makes a system behave outside its contract (crash, run unexpected code, leak data). A **payload** in casual talk is "what happens after." This knowledge base treats both as **objects of defense**: patch the hole, shrink the blast radius, and detect the aftermath. It does not teach how to write or run exploits.

## 1. Deep Dive and Mechanics

**Prevention.** Patch, configuration hardening, and memory-safety (languages, compiler flags, sandboxing). Remove the class when you can (memory-safe rewrite, managed runtime).

**Mitigation.** ASLR, NX/DEP, Control-flow integrity, least privilege, and sandboxing make a successful exploit less useful even when a bug remains. They are not a substitute for fixing known CVEs.

**Detection and response.** EDR and NIDS look for post-compromise behaviors. Your job after a public CVE is inventory, patch SLA, and hunting for the vulnerable version — not collecting kits.

<Callout icon="error" title="This page stops at defense">
No exploit steps, no PoCs, no payload construction. If you need to verify a fix, use a vendor patch and a version check on systems you own.
</Callout>

## 2. Mathematical / Theoretical Foundation

A vulnerability is a state the designer did not intend (memory unsafety, missing authz). An exploit is a witness that the state is reachable from attacker-controlled input. Mitigations raise the cost of turning a bug into reliable control. Formal methods and memory-safe languages shrink the bug class. Residual risk is always nonzero.

<ComparisonTable
  headers={['Defense', 'Acts on', 'Limit']}
  rows={[
    ['Patch', 'Known CVE', 'Zero-days, lag'],
    ['Memory safety', 'Whole class', 'Logic bugs remain'],
    ['Sandbox / least priv', 'Impact', 'Escape bugs'],
    ['EDR / backups', 'Aftermath', 'Need to be on'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Public-CVE playbook
# 1. Inventory who runs the product / library
# 2. Apply vendor patch or mitigate per vendor note
# 3. Verify version, not a kit
# 4. Hunt for unexpected processes or outbound on exposed hosts
TICK3

Subscribe to vendor and CISA notes. Time-to-inventory beats time-to-Twitter.

## 4. Visualizations

TICK3mermaid
flowchart TD
    CVE[Public CVE] --> Inv[Inventory]
    Inv --> Patch[Patch / mitigate]
    Patch --> Ver[Version evidence]
    Ver --> Hunt[Hunt leftovers]
TICK3

## 5. Interview Prep

**Q: Vulnerability vs exploit?**
**A:** A vulnerability is the weakness. An exploit is a working use of it. You can have a vuln with no public exploit and still need to patch.

**Q: Why mitigations if we patch?**
**A:** Because you will be late sometimes, and some bugs are unknown.

**Q: Should engineers study exploit write-ups?**
**A:** High-level write-ups help you design safer systems. Reproducing weaponized code is out of scope here.

## 6. Production Use Cases

- **Vulnerability management** SLAs.
- **Hardening baselines** (NX, ASLR, sandbox).
- **IR** after a widely exploited CVE week.

<Callout icon="tip" title="Measure exposure, then patch">
"Is it on the internet and unpatched?" is the first question, not "can we reproduce the issue."
</Callout>
`,
  },
  {
    rel: 'Least privilege/index.mdx',
    title: 'Least Privilege',
    description:
      'Granting a principal only the access it needs for a job, for only as long as it needs it.',
    body: `
**Least privilege** is a design rule: default deny, then add the smallest permission that still works. It applies to humans, roles, tokens, CI, and database users. Standing Domain Admin and TICK1s3:*TICK1 are the opposite. Most incidents become disasters because privilege was already waiting.

## 1. Deep Dive and Mechanics

**Humans.** Role bundles, just-in-time elevation, and recertification. Break-glass is short, logged, and paged.

**Workloads.** One role per task. CI deploys with a deploy role, not the developer's cloud keys. Database users that can only SELECT the tables they need.

**Time and blast radius.** Temporary credentials beat long-lived keys. Separate prod from sandbox accounts so a leaked CI token cannot wipe billing.

<Callout icon="warning" title="Privilege grows like ivy">
Nobody opens a ticket to add access and later opens one to remove it. Reviews and JIT are the weeding.
</Callout>

## 2. Mathematical / Theoretical Foundation

Privilege is the reachable set in an IAM graph. Least privilege is a minimization under the constraint "the job still completes." Over-approximation is the usual engineering fail (copy a powerful role). Formal policy analyzers exist because humans cannot see assume-role chains.

<ComparisonTable
  headers={['Pattern', 'Privilege', 'Better']}
  rows={[
    ['Shared admin', 'Everyone is root', 'Named + JIT'],
    ['Long-lived key', 'Months', 'Role + short token'],
    ['Monolithic role', 'All APIs', 'Task roles'],
    ['Prod = staging IAM', 'Blast radius', 'Separate accounts'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Access design
# - New service: write the verbs it needs, start from deny
# - CI: OIDC to a deploy role, no static keys
# - Humans: no standing prod write; request a window
TICK3

If a role has not been used in 90 days, remove it and wait for a ticket. That is a healthy test.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Job[Job to do] --> Min[Minimal verbs]
    Min --> Time[Time box]
    Time --> Rev[Review / expire]
    Rev --> Job
TICK3

## 5. Interview Prep

**Q: Least privilege vs need to know?**
**A:** Need to know is usually data classification. Least privilege is the mechanism for actions and data.

**Q: Does it slow teams down?**
**A:** Standing admin is fast until the incident. JIT with a one-click approve is fast enough.

**Q: How do you find excess?**
**A:** Access analyzer, unused permission reports, and "who can prod-deploy" as a weekly number.

## 6. Production Use Cases

- **Cloud IAM** permission boundaries.
- **Kubernetes RBAC** per namespace.
- **Database** users per microservice.

<Callout icon="tip" title="Count standing prod-write humans">
Put that number on a wall. Watch it fall.
</Callout>
`,
  },
  {
    rel: 'MFA/index.mdx',
    title: 'Multi-Factor Authentication',
    description:
      'Requiring more than one independent authenticator so a stolen password is not enough.',
    body: `
**Multi-factor authentication (MFA)** asks for a second, independent factor after (or with) the password. A phished or stuffed password should die at the second check. Not all MFA is equal: **SMS and prompt-bombing** fail more often than **phishing-resistant** WebAuthn keys.

## 1. Deep Dive and Mechanics

**Factors.** Knowledge (password), possession (key, TOTP device), inherence (biometric that unlocks a key). Two passwords are not two factors.

**Phishing.** OTP and push can be relayed in real time. WebAuthn binds the origin; a fake site cannot complete the ceremony. Admins and email get that first.

**Recovery.** The backup code is a factor. Ship codes offline, rate-limit, and watch for recovery abuse. A helpdesk that resets MFA from a phone call is the new weak factor.

<Callout icon="warning" title="MFA fatigue is a real bypass">
If you spam-push until the user hits approve, you built an availability attack on attention. Number matching and WebAuthn fix the class.
</Callout>

## 2. Mathematical / Theoretical Foundation

Independence of factors is the claim: compromising one channel should not yield the other. SMS rides the phone network (SIM-swap). TOTP is a shared secret (phishable). WebAuthn is origin-bound public-key challenge-response. Residual risk is recovery flows and session theft after a good MFA.

<ComparisonTable
  headers={['Method', 'Phish resistant', 'Notes']}
  rows={[
    ['SMS', 'No', 'SIM-swap, delay'],
    ['TOTP', 'No', 'Better than SMS'],
    ['Push + number match', 'No', 'Beats fatigue somewhat'],
    ['WebAuthn / FIDO2', 'Yes', 'Prefer for privileged'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Workforce MFA
# - All users: at least TOTP or push with number match
# - Admins, email, VPN: hardware key or platform passkey
# - Recovery: cached codes, not "reset via helpdesk chat"
TICK3

Consumer apps should offer passkeys and keep OTPs as fallback with tight risk checks.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Pw[Password or SSO] --> MFA[Second factor]
    MFA --> Sess[Session]
    Weak[SMS / prompt spam] --> Risk[Higher residual]
    Key[WebAuthn] --> Better[Lower residual]
TICK3

## 5. Interview Prep

**Q: Is MFA required?**
**A:** For any network that faces the internet, treat it as yes. Privileged roles: phishing-resistant.

**Q: Why not SMS?**
**A:** The phone number is a weak, transferable authenticator.

**Q: Does MFA stop session theft?**
**A:** Not by itself. You still need cookie hygiene, binding, and revoke-all.

## 6. Production Use Cases

- **IdP** enrollment for the whole company.
- **Customer banking** step-up.
- **Cloud consoles** with hardware keys.

<Callout icon="tip" title="Measure coverage, not policy PDFs">
Percent of privileged sign-ins that used WebAuthn is the real control.
</Callout>
`,
  },
  {
    rel: 'Risk assessment/index.mdx',
    title: 'Risk Assessment',
    description:
      'A structured way to name what could go wrong, how bad it would be, and what you will do about it.',
    body: `
A **risk assessment** turns anxiety into a list: asset, threat, vulnerability, likelihood, impact, and treatment. It is how you spend a finite budget. A 40-tab spreadsheet nobody updates is not an assessment. A one-page register with owners and dates can be.

## 1. Deep Dive and Mechanics

**Identify.** Assets and data classes, threats that matter to you (not a movie), and existing controls.

**Analyze.** Qualitative matrices (low/med/high) or quantitative models (FAIR) when you have frequency data. Write assumptions. Fake precision is worse than "high, we think."

**Treat.** Mitigate, transfer (insurance, vendor), avoid (do not offer the feature), or accept with a named executive and an expiry. Then re-assess after major change.

<Callout icon="info" title="Acceptance is a decision, not a shrug">
If nobody can sign the residual, you did not finish the assessment.
</Callout>

## 2. Mathematical / Theoretical Foundation

Expected loss is likelihood times impact when both are estimated honestly. Most cyber events are sparse, so qualitative bands plus scenarios work better than a fake dollar to three decimals. Sensitivity ("if this assumption is wrong, the rank flips") is the adult output. Aggregation across a register is not a single "risk score" you can average.

<ComparisonTable
  headers={['Method', 'Best when', 'Failure']}
  rows={[
    ['Qual matrix', 'Sparse data, speed', 'Everything is "high"'],
    ['Scenario / bow-tie', 'One jewel', 'Fanfic'],
    ['FAIR-style', 'Loss data exists', 'Garbage inputs'],
    ['Control checklist', 'Compliance', 'Misses novel threats'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Register row
# Asset: customer DB
# Threat: stolen cloud key
# Current: long-lived key in CI
# Treatment: OIDC role, 90 days, owner=platform
# Residual: accepted by CTO until then
TICK3

Review accepted items on a calendar. Eternal acceptance is shadow policy.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Asset[Assets] --> Anal[Analyze]
    Threat[Threats] --> Anal
    Anal --> Treat[Treat]
    Treat --> Residual[Residual + date]
    Residual --> Review[Re-assess]
TICK3

## 5. Interview Prep

**Q: Risk vs vulnerability?**
**A:** A vulnerability is a weakness. Risk is the chance and impact of a threat using it against an asset.

**Q: Why not only CVSS?**
**A:** CVSS ignores your data and your exposure. A critical on an isolated lab is not a critical on the payment API.

**Q: How often?**
**A:** Enterprise register at least annually and on significant change. Product risks at design time.

## 6. Production Use Cases

- **Board** residual-risk packs.
- **New product** go-live gates.
- **Vendor** onboarding.

<Callout icon="tip" title="Write the scenario in a sentence">
"A contractor laptop is stolen while unlocked" is assessable. "Cyber risk" is not.
</Callout>
`,
  },
  {
    rel: 'Security frameworks (NIST, ISO 27001, CIS Controls)/index.mdx',
    title: 'Security Frameworks',
    description:
      'Shared catalogs of outcomes and controls — NIST CSF, ISO 27001, CIS Controls — so you do not invent a program from scratch.',
    body: `
A **security framework** is a structured list of outcomes or controls you can adopt, map, and audit. **NIST CSF** talks outcomes. **ISO 27001** is a certifiable ISMS. **CIS Controls** is a prioritized technical starter list. Pick a backbone and crosswalk the rest so engineers do not run three religions.

## 1. Deep Dive and Mechanics

**Adopt.** Choose CSF or ISO as the language for the board. Use CIS as the first-year technical backlog (inventory, backups, MFA).

**Map.** Each real control (SSO, EDR, backup test) gets one row that points at CSF categories, ISO Annex A, and CIS items. Evidence lives on that row.

**Avoid.** Buying a GRC tool before you have owners. Copy-pasting all of 800-53 into a startup wiki.

<Callout icon="info" title="Frameworks do not patch servers">
They tell you which conversations to have. The work is still IAM, logging, and restores.
</Callout>

## 2. Mathematical / Theoretical Foundation

Frameworks are taxonomies. A crosswalk is a many-to-many relation between statements. Coverage is the fraction of in-scope statements with an owner and evidence. Tiers and maturity models are ordinal; do not average them into 3.7.

<ComparisonTable
  headers={['Framework', 'Shape', 'You get']}
  rows={[
    ['NIST CSF', 'Outcomes', 'Board language'],
    ['ISO 27001', 'ISMS + audit', 'Certificate'],
    ['CIS Controls', 'Prioritized tech', 'Year-one backlog'],
    ['800-53', 'Deep catalog', 'Fed / high assurance'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Crosswalk row
# Control: weekly backup restore test
# CSF: Recover
# ISO: backup controls
# CIS: data recovery
# Evidence: ticket with screenshot and date
TICK3

One owner per control. "Security team" is not an owner.

## 4. Visualizations

TICK3mermaid
flowchart LR
    CSF[NIST CSF] --> Map[Crosswalk]
    ISO[ISO 27001] --> Map
    CIS[CIS Controls] --> Map
    Map --> Work[Owned controls]
TICK3

## 5. Interview Prep

**Q: Which should we start with?**
**A:** CIS for technical hygiene, CSF for the story, ISO if customers demand a certificate.

**Q: CSF vs ISO?**
**A:** CSF is voluntary outcomes. ISO is a certifiable management system. You can do both with one set of controls.

**Q: Are frameworks legally required?**
**A:** Sometimes by contract or sector. Often they are how you prove due care.

## 6. Production Use Cases

- **First security program** at a growing SaaS.
- **Enterprise** that must answer every RFP.
- **Public sector** suppliers aligning to NIST.

<Callout icon="tip" title="One backlog, many labels">
Engineers get tickets. Auditors get mappings. Do not make engineers read all three catalogs.
</Callout>
`,
  },
  {
    rel: 'Threat modelling (STRIDE, DREAD)/index.mdx',
    title: 'Threat Modelling (STRIDE, DREAD)',
    description:
      'A design practice that names how a system can fail so you add controls before you ship.',
    body: `
**Threat modelling** is sitting with a diagram and asking "what can go wrong?" **STRIDE** is a mnemonic for threat categories (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege). **DREAD** is an old scoring mnemonic; many teams now prefer simpler severity or attack-tree notes. The deliverable is **mitigations in the design**, not a wallpaper matrix.

## 1. Deep Dive and Mechanics

Draw the data-flow: principals, processes, stores, trust boundaries. For each boundary, walk STRIDE. Write a mitigation or an accepted risk. Do this when the design can still change.

**STRIDE examples at a high level.** Spoofing: missing authn. Tampering: unsigned webhooks. Repudiation: no audit. Disclosure: extra fields in logs. DoS: unbounded work. Elevation: missing authz.

**DREAD.** Damage, Reproducibility, Exploitability, Affected users, Discoverability — historically used to score. It is subjective and easy to game. If you score, keep a short rubric and a human reviewer.

<Callout icon="warning" title="A model that never changes a design was theater">
If every threat is "covered by AWS," start over.
</Callout>

## 2. Mathematical / Theoretical Foundation

A threat model is a graph plus a set of unwanted traces. STRIDE is a coverage heuristic for categories, not a proof. Attack trees multiply AND/OR costs. Scoring schemes are ordinal at best. The scientific habit is listing assumptions (who is trusted, what the IdP guarantees).

<ComparisonTable
  headers={['Method', 'Gives you', 'Watch-out']}
  rows={[
    ['STRIDE on DFDs', 'Category coverage', 'Shallow if rushed'],
    ['Abuse stories', 'Product language', 'Miss structural issues'],
    ['DREAD score', 'A number', 'False precision'],
    ['Attack tree', 'Path costs', 'Combinatorial blow-up'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Session notes
# Diagram link, trust boundaries
# Threat: spoofed webhook
# Mitigation: HMAC + timestamp, deny replay
# Owner: payments API, before GA
TICK3

Store the notes next to the design doc. Update on significant change.

## 4. Visualizations

TICK3mermaid
flowchart TD
    DFD[Data-flow diagram] --> ST[STRIDE per boundary]
    ST --> Mit[Mitigations]
    Mit --> Backlog[Tickets]
    Mit --> Accept[Accepted risk]
TICK3

## 5. Interview Prep

**Q: When do you threat model?**
**A:** New trust boundaries, new data classes, or new internet exposure — before code freeze.

**Q: STRIDE vs PASTA vs OCTAVE?**
**A:** Different wrappers. STRIDE is the one engineers remember. Consistency beats brand.

**Q: Is DREAD still recommended?**
**A:** Many Microsoft-era teams dropped it for simpler ratings. Use it only if your org still speaks it.

## 6. Production Use Cases

- **New payment** or export features.
- **SSO / webhook** integrations.
- **Moving a service** from private to public.

<Callout icon="tip" title="One hour with a whiteboard beats a 30-page template">
Invite the people who will write the code and the people who will on-call it.
</Callout>
`,
  },
  {
    rel: 'Threats/index.mdx',
    title: 'Threats',
    description:
      'Actors and situations that can harm assets — the "who and why" half of a risk statement.',
    body: `
A **threat** is a potential cause of harm: a criminal gang, a careless admin, a fire, a hostile nation-state, or a dependency that goes bankrupt. Threats are not vulnerabilities (those are weaknesses) and not risks (those include likelihood and impact). You cannot "patch a threat." You can reduce exposure and impact.

## 1. Deep Dive and Mechanics

**Name them.** External criminals (ransomware, fraud), insiders (malicious or merely sloppy), supply chain, physical, and environmental. Be specific enough to design ("commodity ransomware" vs "targeted theft of source").

**Intent vs capability.** A script kid and an APT are different budgets. Your bank's threat is not a blog's threat. Intel and sector notes keep the list honest.

**Pair with assets.** A threat without an asset is a headline. "Ransomware against our file shares and backups" is a design input.

<Callout icon="info" title="Honest threats include accidents">
Most availability losses are bugs, expired certs, and deleted disks — not genius adversaries.
</Callout>

## 2. Mathematical / Theoretical Foundation

Threat modeling languages treat a threat as an agent with goals and resources. Capability can be thought of as a budget (time, money, access). Likelihood in the risk equation is P(threat acts and succeeds | controls). Do not assign movie-plot likelihoods without a base rate.

<ComparisonTable
  headers={['Threat class', 'Typical goal', 'Primary control theme']}
  rows={[
    ['Commodity crime', 'Cash / ransomware', 'Patch, MFA, backups'],
    ['Fraud / abuse', 'Money movement', 'Authz, velocity, step-up'],
    ['Insider', 'Data or sabotage', 'Least priv, audit'],
    ['Supply chain', 'Trust abuse', 'Pin, sign, isolate CI'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Threat statement
# Who: commodity ransomware operators
# What they want: encrypt file shares, pressure via stolen email
# We care because: 3-day outage + extortion
# So we: immutable backups, MFA, EDR, segmented shares
TICK3

Review the list when the business adds a new data class (health, payments, kids).

## 4. Visualizations

TICK3mermaid
flowchart LR
    Threat[Threat] --> Asset[Asset]
    Vuln[Vulnerability] --> Asset
    Asset --> Risk[Risk = chance x impact]
TICK3

## 5. Interview Prep

**Q: Threat vs vulnerability vs risk?**
**A:** Threat is the source of harm. Vulnerability is the weakness. Risk is the combination with impact.

**Q: Do we need named APT groups?**
**A:** Only if it changes a control. Sector-generic "capable criminal" is enough for most SaaS.

**Q: Are users a threat?**
**A:** Users are a source of error and sometimes abuse. Design for that without contempt.

## 6. Production Use Cases

- **Risk register** inputs.
- **Tabletop** scenarios.
- **Product** abuse cases (fraud).

<Callout icon="tip" title="Write threats your engineers can design against">
"Nation-state" is vague. "Someone with a phished admin session" is actionable.
</Callout>
`,
  },
  {
    rel: 'Vulnerabilities/index.mdx',
    title: 'Vulnerabilities',
    description:
      'Weaknesses in a system that a threat could use — tracked, prioritized, and closed as engineering work.',
    body: `
A **vulnerability** is a weakness: a missing authz check, an outdated library, a default password, a public bucket. **Vulnerability management** is the factory that finds, ranks, and closes them. A CVE number is one kind. A logic bug with no CVE is still a vulnerability.

## 1. Deep Dive and Mechanics

**Find.** Scanners, SCA in CI, pentests, bounties, and code review. Coverage matters more than the loudest tool.

**Rank.** CVSS is a starting hint. Add exposure (internet-facing?), data class, and whether a fix exists. A critical on an isolated lab is not today's fire.

**Close.** Patch, config change, or compensating control with an expiry. Verify with a version, not a vibe. Exceptions are risk acceptances.

<Callout icon="warning" title="A finding without an owner is decoration">
Every open item needs a team, a ticket, and a date.
</Callout>

## 2. Mathematical / Theoretical Foundation

The backlog is a queue with arrivals (new CVEs, new code) and service rate (patch capacity). SLAs are policy on expected loss. CVSS base score ignores your environment; environmental metrics exist for a reason. Zero-days are arrivals with incomplete information — mitigations and depth matter.

<ComparisonTable
  headers={['Source', 'Finds', 'Misses']}
  rows={[
    ['Infra scan', 'Known host CVEs', 'App logic'],
    ['SCA', 'Library CVEs', 'Your code'],
    ['SAST / review', 'Some code bugs', 'Runtime config'],
    ['Human test', 'Impact / logic', 'Complete coverage'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# SLA sketch
# Internet-facing critical: 7 days or mitigate
# Internal high: 30 days
# No-fix vendor: compensate + monthly review
# Evidence: version pin in the image or package lock
TICK3

SCA should fail CI on new criticals in production dependencies, with a documented ignore that expires.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Find[Find] --> Rank[Rank]
    Rank --> Fix[Fix]
    Rank --> Exc[Exception + expiry]
    Fix --> Verify[Verify version]
TICK3

## 5. Interview Prep

**Q: Vulnerability vs exploit?**
**A:** Weakness vs a working use. Patch vulns even when no exploit is public.

**Q: How do you handle a storm of CI findings?**
**A:** Baseline, fix new ones, burn down the old by risk, and do not hide the dashboard.

**Q: Is a misconfiguration a vulnerability?**
**A:** Yes. CWE and CIS treat many configs as weaknesses.

## 6. Production Use Cases

- **Weekly** vuln review with engineering.
- **Container** base-image rebuilds.
- **Customer** questionnaires that ask for SLA, not zero findings.

<Callout icon="tip" title="Ship the patch pipeline before the scanner">
Finding 4,000 issues on day one is how programs die. Find, then be able to ship.
</Callout>
`,
  },
  {
    rel: 'Zero trust/index.mdx',
    title: 'Zero Trust',
    description:
      'A model that grants access per request from verified identity and device posture, not from being "on the LAN."',
    body: `
**Zero Trust** assumes the network is hostile — including the office LAN. Access is decided by **identity, device, and policy** on each request. A VPN that dumps you onto a flat /16 is the old model. Zero Trust is not a product SKU. It is a way to draw trust boundaries around users, services, and data.

## 1. Deep Dive and Mechanics

**Authenticate strongly.** SSO, phishing-resistant MFA, and workload identities.

**Authorize narrowly.** Per app or per RPC, not "inside equals trusted." Device posture (managed, encrypted, patched) can be an input.

**Observe.** Every decision is logged. Lateral movement has no soft center to wander.

**Migrate.** Start with remote access (ZTNA replacing fat VPN), then service-to-service, then admin planes. Do not boil the ocean.

<Callout icon="info" title="Zero Trust still needs backups and patching">
It relocates the perimeter to identity. It does not repeal ransomware or supply-chain risk.
</Callout>

## 2. Mathematical / Theoretical Foundation

Classic perimeter security is a coarse allow based on network location. Zero Trust is allow(principal, device, action, resource, context) evaluated continuously (session risk can drop). NIST SP 800-207 describes the policy decision and enforcement points. Failure modes: a god-token IdP, or posture checks that are client-side theater.

<ComparisonTable
  headers={['Old', 'Zero Trust-ish', 'Still required']}
  rows={[
    ['Corp LAN trust', 'Per-app ZTNA', 'EDR and patch'],
    ['Flat VPN', 'SSO + device', 'Logging'],
    ['Hard shell, soft center', 'Micro-seg + identity', 'Backups'],
    ['Long VPN cert', 'Short session + step-up', 'IR revoke'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# First year
# - SSO everywhere, kill local passwords
# - ZTNA for a few apps; shrink the VPN
# - Device posture for admin apps
# - Service identities; no long-lived keys in CI
TICK3

Measure standing VPN group membership. Drive it toward zero.

## 4. Visualizations

TICK3mermaid
flowchart TD
    User[User + device] --> PDP[Policy decision]
    Work[Workload identity] --> PDP
    PDP --> PEP[Enforcement point]
    PEP --> App[App / data]
    PDP --> Log[Audit]
TICK3

## 5. Interview Prep

**Q: Is Zero Trust "no VPN"?**
**A:** Often ZTNA replaces a fat VPN. Some site-to-site links remain. The idea is no implied trust from IP.

**Q: Zero Trust vs least privilege?**
**A:** Least privilege is the permission rule. Zero Trust is where and how often you evaluate it.

**Q: Why do projects stall?**
**A:** They buy a gateway and never inventory apps or fix IdP hygiene.

## 6. Production Use Cases

- **Remote workforce** access.
- **Contractor** access to one app, not the LAN.
- **Service mesh** identities in the datacenter.

<Callout icon="tip" title="Start with the admin plane">
If the cloud console and the IdP are not Zero Trust, the rest is decoration.
</Callout>
`,
  },
]
