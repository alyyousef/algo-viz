export const discPages = [
  {
    rel: '42.4 Cybersecurity Disciplines/Cloud security/index.mdx',
    title: 'Cloud Security',
    description:
      'Protecting identities, data, and workloads you run on a provider platform, under a shared-responsibility model.',
    body: `
**Cloud security** is mostly configuration and identity, not a new kind of firewall. The provider secures the buildings, hypervisor, and global network. You secure accounts, keys, networks, data classification, and the software you deploy. Most breaches are public storage, over-broad IAM, and forgotten admin keys — not novel cryptography.

## 1. Deep Dive and Mechanics

Start from the **shared responsibility** line for your service model. IaaS leaves you the guest OS and everything above. PaaS shrinks that. SaaS leaves you identity, data, and how you integrate.

**Control planes beat data planes.** A stolen cloud API key can create, read, and wipe more than a stolen VM password. Prefer short-lived roles, deny public data by default, and treat every region and account as its own blast radius.

**Continuous posture.** Scan for open buckets, 0.0.0.0/0 admin ports, unused access keys, and missing encryption flags. Fix in IaC so the next deploy does not reopen the hole.

<Callout icon="warning" title="The provider will not close your bucket">
Security of the cloud is theirs. Security in the cloud is yours. An open object store is a customer misconfiguration, not a vendor outage.
</Callout>

## 2. Mathematical / Theoretical Foundation

Cloud risk is a graph: principals, roles, resources, and trust edges (assume-role, service accounts, org policies). Effective permission is the reachability of that graph, not the text of one policy document. Least privilege means shrinking the reachable set. Segmentation means cutting edges between accounts and VPCs.

<ComparisonTable
  headers={['Layer', 'You own', 'Typical control']}
  rows={[
    ['IaaS', 'OS, net, data, IAM', 'SG/NACL, disk encryption, IMDSv2'],
    ['PaaS', 'App, data, IAM', 'Private endpoints, secret rotation'],
    ['SaaS', 'Identity, data, config', 'SSO, DLP, admin audit'],
    ['Org', 'Accounts and guardrails', 'SCP, landing zone, CloudTrail'],
  ]}
/>

## 3. Real-World Implementation

TICK3json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::app-private-prod/*",
    "Condition": {"Bool": {"aws:SecureTransport": "true"}}
  }]
}
TICK3

Grant a role, not a long-lived user key. Log every management event to an append-only account the workload cannot delete.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Prov[Provider: facilities, hypervisor, global net]
    You[Customer: IAM, data, app, network config]
    Prov --> Shared[Shared model]
    You --> Shared
    Shared --> CSPM[Posture scan]
    Shared --> CWPP[Workload protect]
    Shared --> IaC[Policy in code]
TICK3

## 5. Interview Prep

**Q: Shared responsibility in one sentence?**
**A:** They secure the platform. You secure what you put on it and who can call the APIs.

**Q: Why is IAM the real perimeter?**
**A:** Many workloads have no classic DMZ. A role with s3:* and a leaked key is the breach.

**Q: CSPM vs CWPP?**
**A:** CSPM finds misconfigured cloud resources. CWPP watches the running VM or container.

## 6. Production Use Cases

- **Multi-account orgs** with a security tooling account and SCPs.
- **Data lakes** with blocked public access and KMS CMKs.
- **Regulated SaaS** that must prove encryption and audit trails.

<Callout icon="tip" title="Turn on the logs before the incident">
CloudTrail, activity logs, and admin audit are cheap compared with reconstructing a breach from memory.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Container security/index.mdx',
    title: 'Container Security',
    description:
      'Hardening images, runtimes, and registries so a packed process cannot quietly become the host.',
    body: `
A **container** shares a kernel. It is isolation by namespaces, cgroups, and a root filesystem — not a second computer. **Container security** is supply-chain hygiene (what you ship), runtime least privilege (how it runs), and host hardening (what it could escape into). Treating Docker like a VM is how teams skip patches and run as root.

## 1. Deep Dive and Mechanics

**Image.** Start FROM a pinned digest, not latest. Run a non-root USER. Drop packages you do not need. Scan for known CVEs and secrets before push. Sign images and admit only signed digests to prod.

**Runtime.** Read-only root filesystem. Drop Linux capabilities. No privileged flag. No hostPath to the Docker socket. Resource limits so one pod cannot starve the node.

**Registry and CI.** Private registries, immutable tags for releases, and a break-the-build gate on critical CVEs in your base.

<Callout icon="warning" title="root in a container is still root on a bad day">
Kernel bugs and mis-mounted sockets collapse the namespace story. Privilege is a defect, not a convenience.
</Callout>

## 2. Mathematical / Theoretical Foundation

Isolation is a policy on kernel objects: mount, PID, net, user, IPC. The attack surface is the syscall ABI plus whatever you remounted. User namespaces and seccomp shrink that ABI. The security claim is residual risk after those filters, not "containers are safe."

<ComparisonTable
  headers={['Control', 'Stops', 'Does not stop']}
  rows={[
    ['Non-root USER', 'Trivial host writes', 'Kernel 0-days'],
    ['Read-only FS', 'In-container implants', 'Memory-only payloads'],
    ['Image scan', 'Known CVE in a layer', 'Logic bugs you wrote'],
    ['No docker.sock', 'Trivial escape', 'Other host mounts'],
  ]}
/>

## 3. Real-World Implementation

TICK3dockerfile
FROM python:3.12-slim@sha256:REPLACE_WITH_DIGEST
RUN useradd --uid 10001 --create-home app
WORKDIR /app
COPY --chown=app:app . .
USER 10001
TICK3

In compose or Kubernetes, set readOnlyRootFilesystem and drop ALL capabilities, then add back only what you measured.

## 4. Visualizations

TICK3mermaid
flowchart LR
    CI[CI build] --> Scan[CVE and secret scan]
    Scan --> Sign[Sign digest]
    Sign --> Reg[Registry]
    Reg --> Run[Runtime: non-root, seccomp]
    Run --> Host[Hardened host / node]
TICK3

## 5. Interview Prep

**Q: Container vs VM isolation?**
**A:** VMs have a hypervisor boundary. Containers share a kernel. Different threat model.

**Q: Why pin by digest?**
**A:** A tag can move. A digest is the bits you scanned.

**Q: Is Distroless enough?**
**A:** It shrinks the image. You still need a non-root user, network policy, and a patched base.

## 6. Production Use Cases

- **Microservice images** built in CI with a mandatory scan gate.
- **Batch jobs** that must not keep a writable root filesystem.
- **Multi-tenant build** agents that never mount the host runtime socket.

<Callout icon="tip" title="Rebuild on a cadence">
Unchanged app code still inherits base-image CVEs. Rebuild and redeploy regularly.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Digital forensics/index.mdx',
    title: 'Digital Forensics',
    description:
      'Preserving and interpreting digital evidence so an incident can be reconstructed without destroying the record.',
    body: `
**Digital forensics** answers what happened, when, and which artifacts support that story. It is not malware writing and not "hacking back." The first duty is **preservation**: image disks, collect volatile memory if justified, and write a chain of custody so a court or a board can trust the timeline.

## 1. Deep Dive and Mechanics

Work from volatile to durable: running process lists and memory, then disks, then backups and cloud API logs. Hash every artifact (SHA-256) at collection and at each handoff. Use write blockers or API exports that do not mutate the source when you can.

**Order of volatility** and **least surprise** beat clever live edits. Do not "clean" a host you may need as evidence. Isolate it, snapshot it, then analyze copies.

**Cloud and SaaS** shift the evidence to provider logs, object versions, and identity audit trails. You cannot image a multi-tenant control plane; you request the right logs early.

<Callout icon="warning" title="Analysis is done on copies">
One reboot, one "helpful" cleaner, or one in-place AV quarantine can erase the only timeline you had.
</Callout>

## 2. Mathematical / Theoretical Foundation

Integrity of evidence is a hash chain: collect, hash, store, re-hash on access. Timestamps need clock-source notes (NTP drift, timezone). Causation is inferred from multiple independent logs, not a single popup. Legal admissibility extra-requires documented process (chain of custody), not just a clever finding.

<ComparisonTable
  headers={['Source', 'Volatility', 'Typical use']}
  rows={[
    ['Memory / process table', 'Minutes', 'Active implants, keys'],
    ['Disk / volume snapshot', 'Days+', 'Persistence, files'],
    ['Cloud audit / VPC flow', 'Retained if enabled', 'API abuse, exfil path'],
    ['Backups / object versions', 'Long', 'Pre-incident baseline'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Collection card (copy, do not improvise on the live box)
# 1. Note UTC time, collector, case id
# 2. Snapshot or image; compute SHA-256
# 3. Store hash + path in the evidence log
# 4. Analyze only the copy
TICK3

Legal hold and HR/privacy review belong in the runbook before you start browsing mailboxes.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Alert[Alert or HR report] --> Hold[Legal hold / isolate]
    Hold --> Collect[Collect copies + hashes]
    Collect --> Analyze[Analyze copies]
    Analyze --> Report[Timeline + findings]
    Report --> IR[IR and legal]
TICK3

## 5. Interview Prep

**Q: Why hash artifacts?**
**A:** To prove the copy you analyzed is the copy you collected.

**Q: Live response vs full image?**
**A:** Live collection captures RAM and may change the host. Imaging is slower and more complete for disk. Choose from the playbook, not vibes.

**Q: Can you forensicate SaaS?**
**A:** You collect provider audit logs, admin events, and exported mail — not a physical disk.

## 6. Production Use Cases

- **Laptop theft or insider** cases with disk images and access logs.
- **Ransomware** timelines from backups plus EDR telemetry.
- **Cloud account** takeover using CloudTrail or Entra audit.

<Callout icon="tip" title="Enable the logs in peacetime">
Forensics cannot invent a CloudTrail trail that was never on.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Endpoint security/index.mdx',
    title: 'Endpoint Security',
    description:
      'Controls on laptops, servers, and phones that detect, contain, and recover from host-level abuse.',
    body: `
**Endpoint security** is the stack on the device: disk encryption, patching, application control, EDR telemetry, and a path to wipe or reimage. The network perimeter no longer sees most work. If the laptop is the office, the laptop is the control point.

## 1. Deep Dive and Mechanics

**Prevent.** Full-disk encryption, secure boot, screen lock, and a current OS. Remove local admin for standard users. Allow-list what you can; do not depend on users to "not click."

**Detect.** EDR records process trees, unsigned loaders, and odd network beacons. It is telemetry plus response (kill process, isolate host), not a 2009 antivirus signature file alone.

**Recover.** You must be able to revoke the device certificate, wipe, and restore from a known-good image. Isolation without a rebuild plan just parks malware.

<Callout icon="info" title="EDR is not a substitute for patching">
A current kernel and browser kill more commodity worms than any dashboard.
</Callout>

## 2. Mathematical / Theoretical Foundation

Detection is a classifier over host events with a false-positive cost (helpdesk) and a false-negative cost (dwell time). Isolation is a graph cut: remove the node from the corporate identity and network overlays. Disk encryption makes confidentiality of a stolen laptop a key-management problem (escrow, TPM) rather than a hope.

<ComparisonTable
  headers={['Control', 'Primary CIA', 'Failure mode']}
  rows={[
    ['Disk encryption', 'Confidentiality', 'Unlocked and logged in'],
    ['Patch + hardening', 'Integrity', 'Unmaintained golden image'],
    ['EDR isolate', 'Availability trade', 'No offline rebuild path'],
    ['MDM wipe', 'Confidentiality', 'Device never enrolled'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Baseline for a corporate laptop
# - FileVault / BitLocker with escrowed recovery
# - MDM enrollment required for mail and SSO
# - EDR sensor, tamper protection on
# - Local admin removed; just-in-time elevation
TICK3

Servers need the same idea: gold images, no standing admin, and a sensor that cannot be quietly uninstalled.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Dev[Device] --> Enc[Disk encryption]
    Dev --> MDM[MDM policy]
    Dev --> EDR[EDR sensor]
    EDR --> SOC[SOC]
    SOC --> Iso[Isolate / wipe]
TICK3

## 5. Interview Prep

**Q: AV vs EDR?**
**A:** AV is mostly known-bad files. EDR keeps a process and network timeline and can contain the host.

**Q: Why remove local admin?**
**A:** Most commodity malware wants a write to Program Files or a driver. Standard users shrink that.

**Q: BYOD?**
**A:** Then you need containerization or a VDI. You cannot EDR a personal phone you do not own.

## 6. Production Use Cases

- **Workforce laptops** with MDM + EDR + disk encryption.
- **Jump boxes** with extra logging and no email client.
- **Kiosks** that reimage on a timer.

<Callout icon="tip" title="Test isolate on a canary host">
A button you have never pressed will fail during the incident.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/GRC (Governance, Risk, Compliance)/index.mdx',
    title: 'GRC (Governance, Risk, Compliance)',
    description:
      'The management system that turns security work into policy, risk decisions, and evidence outsiders can audit.',
    body: `
**GRC** is how an organization decides what "secure enough" means and proves it. **Governance** sets ownership and policy. **Risk** ranks what could hurt the mission. **Compliance** maps controls to laws and customer contracts. Without GRC, engineering still patches — but the board cannot tell residual risk from folklore.

## 1. Deep Dive and Mechanics

Write a small set of policies (access, data, incident, vendors). Map each to a control owner and evidence (ticket, config, log). Run a risk register: asset, threat, likelihood, impact, treatment (mitigate, transfer, accept). Review accepted risk on a calendar, not forever.

**Compliance is a mapping, not a product.** SOC 2 and ISO 27001 ask for the same hygiene (access reviews, change control, backups) in different wrappers. Buy a GRC tool only after the register and owners exist in a spreadsheet that people actually update.

<Callout icon="warning" title="A certificate is not a control">
Passing an audit means you produced evidence for a sample. It does not mean the production IAM graph is clean this week.
</Callout>

## 2. Mathematical / Theoretical Foundation

Risk is commonly modeled as likelihood times impact, sometimes with a qualitative matrix to avoid fake precision. Expected loss is useful when you have frequency data (fraud) and misleading when you do not (novel nation-state). Residual risk after treatment should be explicit. Compliance coverage is a many-to-many map: one control can satisfy several framework statements.

<ComparisonTable
  headers={['Word', 'Question', 'Output']}
  rows={[
    ['Governance', 'Who decides?', 'Policy, RACI, board pack'],
    ['Risk', 'What could hurt us?', 'Register and treatments'],
    ['Compliance', 'What must we show?', 'Evidence and attestations'],
    ['Assurance', 'Is it working?', 'Audit, metrics, exceptions'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Risk row
# Asset: payroll SaaS
# Threat: stolen admin session
# Treatment: SSO + hardware MFA + quarterly access review
# Evidence: IdP policy export, review ticket
# Owner: Head of People Ops + IT
TICK3

Exceptions need an expiry date and a compensating control, or they become shadow policy.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Pol[Policy] --> Ctrl[Controls]
    Risk[Risk register] --> Ctrl
    Ctrl --> Ev[Evidence]
    Ev --> Aud[Internal / external audit]
    Aud --> Board[Leadership]
TICK3

## 5. Interview Prep

**Q: GRC vs security engineering?**
**A:** Engineering implements controls. GRC chooses which, tracks exceptions, and talks to auditors.

**Q: Why accept risk?**
**A:** Some treatments cost more than the loss. Acceptance must be named, owned, and time-boxed.

**Q: One framework or many?**
**A:** Pick a backbone (NIST CSF or ISO 27001) and crosswalk the rest so you do not run three ISMS.

## 6. Production Use Cases

- **Enterprise ISMS** with a living risk register.
- **Vendor reviews** before a SaaS admin integration.
- **Board reporting** of residual risk, not ticket counts alone.

<Callout icon="tip" title="Write policies people can obey">
If the policy needs a lawyer to log in, engineers will invent a workaround.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/IAM/index.mdx',
    title: 'Identity and Access Management (IAM)',
    description:
      'Policies and systems that decide who a principal is and what that principal may do.',
    body: `
**IAM** binds a human or workload to an identity, then grants the least access that still does the job. Passwords are one authenticator. The hard part is **lifecycle**: joiners, movers, leavers, break-glass, and the graph of roles that nobody mapped. Most "we were hacked" stories are "someone still had admin."

## 1. Deep Dive and Mechanics

**Identity.** Unique account, MFA, and a home in a directory or IdP. Prefer SSO over per-app passwords. Workloads get roles, not copied human keys.

**Access.** RBAC for coarse jobs, ABAC or ReBAC when tenancy is messy. Recertify standing access. Prefer just-in-time elevation for admin.

**Governance.** Joiner-mover-leaver from HR. Disable, do not just "remove from the team chat." Log admin APIs. Separate duties for pay and approve.

<Callout icon="warning" title="Shared admin is not an identity">
If five people know the root password, you have no attribution and no leaver process.
</Callout>

## 2. Mathematical / Theoretical Foundation

Access control is a decision function: allow(principal, action, resource, context). Confused deputy and confused tenant bugs happen when a service uses its own powerful identity to act on a caller-supplied id without a check. The IAM graph (who can assume whom) should be acyclic for humans and tightly scoped for workloads.

<ComparisonTable
  headers={['Model', 'Grant style', 'Fits']}
  rows={[
    ['RBAC', 'Roles as job bundles', 'Stable orgs'],
    ['ABAC', 'Attributes and policy', 'Large SaaS tenancy'],
    ['ReBAC', 'Relationship walks', 'Docs, graphs, shares'],
    ['ACL', 'Per-object list', 'Small sets, legacy'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Workforce baseline
# - One IdP, SSO to all business apps
# - Phishing-resistant MFA for admins
# - Quarterly access review for privileged roles
# - 15-minute break-glass with paging and recording
TICK3

Cloud IAM needs the same discipline: no long-lived access keys in CI, instance roles only.

## 4. Visualizations

TICK3mermaid
flowchart LR
    HR[HR event] --> IdP[IdP account]
    IdP --> MFA[MFA / device]
    IdP --> Apps[Apps and cloud roles]
    Apps --> Rev[Reviews and leaver disable]
TICK3

## 5. Interview Prep

**Q: Authentication vs IAM?**
**A:** Authn proves the principal. IAM is the whole lifecycle plus authorization.

**Q: Why JIT admin?**
**A:** Standing Domain Admin is a lottery ticket. Elevation with a ticket and a time box shrinks the window.

**Q: Service accounts?**
**A:** Treat them as identities: owner, rotation, no interactive login, scoped roles.

## 6. Production Use Cases

- **Enterprise SSO** with SCIM provisioning.
- **Cloud landing zones** with permission boundaries.
- **Customer-facing RBAC** in a multi-tenant product.

<Callout icon="tip" title="Measure standing privilege">
Count humans with prod write. Drive that number down every quarter.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Incident response/index.mdx',
    title: 'Incident Response',
    description:
      'A rehearsed process to detect, contain, eradicate, and learn from a security event without making it worse.',
    body: `
**Incident response (IR)** is the playbook you run when confidentiality, integrity, or availability is in doubt. The goal is to limit damage and restore trust, not to look busy in a chat channel. Good IR is boring: roles, comms, evidence, containment criteria, and a written timeline.

## 1. Deep Dive and Mechanics

A common loop is **NIST 800-61**: prepare, detect and analyze, contain, eradicate, recover, then lessons learned. Preparation is most of the work (logs, contacts, legal, backups you have restored once).

**Containment** is a product decision: isolate a host, revoke a token, disable a rule, or take a service offline. Do not wipe the only evidence. **Comms** need a single voice for customers, regulators, and staff.

Declare severity with a rubric (data type, blast radius, attacker presence), not whoever yells first.

<Callout icon="error" title="Do not freelance on the live box">
Unplanned kills, restores, and "just reboot it" destroy timelines and can re-trigger malware.
</Callout>

## 2. Mathematical / Theoretical Foundation

IR is decision-making under uncertainty with an expanding evidence set. Mean time to detect and mean time to contain are operational metrics; they are not the same as "we feel done." Residual risk after recovery (rotated secrets, remaining sessions) should be listed. Tabletop exercises test the decision graph before the real clock starts.

<ComparisonTable
  headers={['Phase', 'Question', 'Example action']}
  rows={[
    ['Detect', 'Is this real?', 'Triage alert, scope users'],
    ['Contain', 'Can it spread?', 'Isolate host, revoke token'],
    ['Eradicate', 'Root cause gone?', 'Patch, rebuild, rotate'],
    ['Recover', 'Safe to serve?', 'Restore, watch, communicate'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Incident header
# Sev / commander / scribe / comms / legal
# Suspected systems and data classes
# Containment taken and time (UTC)
# Evidence locations and hashes
TICK3

Keep a war-room doc that is append-only. Chat is fine; the doc is the record.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Prep[Prepare] --> Det[Detect]
    Det --> Ana[Analyze]
    Ana --> Con[Contain]
    Con --> Era[Eradicate]
    Era --> Rec[Recover]
    Rec --> LL[Lessons learned]
    LL --> Prep
TICK3

## 5. Interview Prep

**Q: Incident vs event?**
**A:** An event is a logged occurrence. An incident is a declared violation or imminent threat to CIA that needs the process.

**Q: Who is in charge?**
**A:** A named incident commander. Engineers advise; they do not all drive.

**Q: When do you notify?**
**A:** Follow statute and contract clocks (often days, sometimes hours). Legal owns the wording; IR owns the facts.

## 6. Production Use Cases

- **Stolen laptop** with disk encryption plus remote wipe.
- **Leaked CI token** with immediate rotation and repo audit.
- **Ransomware** with isolation and restore from offline backups.

<Callout icon="tip" title="Restore a backup on a Tuesday">
A backup that has never been restored is a rumor.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Kubernetes security/index.mdx',
    title: 'Kubernetes Security',
    description:
      'Hardening the cluster control plane, workloads, and supply chain so orchestration is not a privilege escalator.',
    body: `
**Kubernetes security** is IAM for an API that can run anything. The kube-apiserver is the real production. RBAC, admission, network policy, and workload identity matter more than a pretty dashboard. A default cluster is a convenience, not a baseline.

## 1. Deep Dive and Mechanics

**Control plane.** TLS everywhere, OIDC or certs for users, no anonymous admin. etcd is a secrets store: encrypt at rest, restrict who can reach it. Audit logs on.

**Workloads.** No privileged pods. No hostNetwork unless you measured why. RunAsNonRoot, read-only root, drop capabilities. Pod Security Admission at restricted. Secrets as files or CSI, not env dumps in tickets.

**Network and supply chain.** Default-deny NetworkPolicy. Admit only signed images from your registry. Separate node pools for untrusted tenants.

<Callout icon="warning" title="cluster-admin is Domain Admin">
A bind of cluster-admin to a CI bot or a human group is a standing superuser. Scope RoleBindings to namespaces.
</Callout>

## 2. Mathematical / Theoretical Foundation

Kubernetes authorization is a chain: authenticators produce a user, authorizers (RBAC, ABAC, webhooks) vote, admission mutates and validates. Effective permission is the union of RoleBindings. NetworkPolicy is a allow-list on pod selectors — missing policy is an implicit allow on many CNIs.

<ComparisonTable
  headers={['Surface', 'Hardening', 'Common miss']}
  rows={[
    ['API server', 'OIDC, audit, no anon', 'kubectl from a laptop forever'],
    ['RBAC', 'Namespace roles', 'cluster-admin in CI'],
    ['Pod', 'Restricted PSA', 'privileged: true'],
    ['Net', 'Default-deny NP', 'Flat cluster network'],
  ]}
/>

## 3. Real-World Implementation

TICK3yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: app
spec:
  podSelector: {}
  policyTypes: ["Ingress"]
TICK3

Follow with explicit allow rules from the ingress controller and peer services only.

## 4. Visualizations

TICK3mermaid
flowchart TD
    User[User / CI] --> API[kube-apiserver]
    API --> RBAC[RBAC]
    API --> Adm[Admission / PSA]
    Adm --> Sched[Scheduler]
    Sched --> Pod[Pod: non-root]
    Pod --> NP[NetworkPolicy]
TICK3

## 5. Interview Prep

**Q: Why not run privileged?**
**A:** Privileged almost means host. You lose the container bet.

**Q: Secrets in etcd?**
**A:** Enable encryption at rest and lock down etcd peers. Prefer external KMS.

**Q: PSA vs PSP?**
**A:** PodSecurityPolicy is gone. Use Pod Security Admission or a policy engine.

## 6. Production Use Cases

- **Prod clusters** with restricted PSA and signed images.
- **Multi-tenant** platforms with per-namespace NetworkPolicy.
- **GitOps** controllers scoped to one namespace, not cluster-admin.

<Callout icon="tip" title="Treat kubeconfig like a root key">
Short-lived credentials, device posture, and no checked-in admin.conf.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Malware analysis/index.mdx',
    title: 'Malware Analysis',
    description:
      'A defensive lab practice that classifies hostile software so you can detect, contain, and recover — not produce it.',
    body: `
**Malware analysis** is how responders learn what a sample does so they can write detections and judge impact. It is a **read-only investigation on copies in an isolated lab**. This page does not cover writing malware, packing it, or bypassing controls.

## 1. Deep Dive and Mechanics

**Triage.** Hash the sample, compare to known-good and known-bad sets, and note file type. Static notes (strings, imports, signer) stay on a copy. Dynamic notes (what it tries to touch) stay in a disposable VM with no production credentials and no open path to your real network.

**Output for the SOC.** Family name if known, persistence themes, C2 style at a high level, and **indicators you can hunt** (hashes, signer, unusual service names). The deliverable is a detection and a containment step, not a how-to.

**Safety.** Air-gapped or tightly egress-filtered lab. No shared home directory with your laptop. Legal review if samples include customer data.

<Callout icon="error" title="Never detonate on a production host">
Analysis VMs are cattle. Production is not a sandbox.
</Callout>

## 2. Mathematical / Theoretical Foundation

Classification is similarity search over features (hashes, fuzzy hashes, behavior graphs). Packed samples raise the cost of static reading; defenders then lean on behavior and reputation. The goal is a decision: benign, unwanted, or hostile — plus a confidence — not a complete decompile.

<ComparisonTable
  headers={['Mode', 'Question', 'Risk']}
  rows={[
    ['Hash / reputation', 'Have we seen this?', 'Low'],
    ['Static notes', 'What does it claim to import?', 'Low if copy-only'],
    ['Sandboxed run', 'What does it try to do?', 'Lab escape if sloppy'],
    ['Full RE', 'Why this family?', 'Time cost'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Analyst packet (defensive)
# Sample hash, source ticket, legal hold
# Lab VM snapshot id (no corp SSO)
# Findings: persistence theme, files touched, hunt queries
# Recommendation: isolate hosts, block signer / hash at EDR
TICK3

Share IOCs through your intel platform, not as "fun" binaries in Slack.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Sample[Submitted sample] --> Copy[Hashed copy]
    Copy --> Tri[Triage]
    Tri --> Lab[Isolated lab]
    Lab --> Det[Detections + IR notes]
    Det --> SOC[SOC hunt]
TICK3

## 5. Interview Prep

**Q: Why isolate the lab?**
**A:** Samples try to spread and to call home. Your analysis network must not be a launch pad.

**Q: Static vs dynamic?**
**A:** Static reads the file. Dynamic watches a run. Use both; trust neither alone.

**Q: What do you give the SOC?**
**A:** Huntables and containment, not a 40-page disassembly.

## 6. Production Use Cases

- **Phish attachment** triage for the mailbox team.
- **EDR unknown** binary that needs a family call.
- **Incident** scoping: which hosts saw the same hash.

<Callout icon="tip" title="Prefer vendor sandbox first">
Many samples are known. Do not spend a week on a commodity stealer.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Mobile security/index.mdx',
    title: 'Mobile Security',
    description:
      'Protecting apps and data on phones and tablets where the OS, store, and user are only partly yours.',
    body: `
**Mobile security** covers the device (OS updates, MDM), the app (secure storage, ATS/App Transport), and the backend (the same authz rules as web). A phone is a computer with a store, biometrics, and a habit of backing photos up to someone else's cloud. Defense is **assume a lost device** and **do not store crown jewels in plaintext app storage**.

## 1. Deep Dive and Mechanics

**Platform.** Ship on current iOS/Android. Use the system keystore/Keychain. Certificate pin only with a backup pin and a plan to rotate. Refuse jailbroken/rooted devices for high-assurance apps if your threat model says so.

**App.** No secrets in the binary. Short-lived tokens. Biometric unlock wrapping a key, not "fingerprint means skip auth." Clear clipboard of secrets. Screenshot flags for banking screens.

**MDM / MAM.** Corporate mail and VPN on enrolled devices. Work profile on Android. Remote wipe. BYOD gets a container, not full-disk control you do not have.

<Callout icon="warning" title="The API is still the app">
A beautiful Keychain does not help if the same token works from curl without device checks you actually enforce.
</Callout>

## 2. Mathematical / Theoretical Foundation

Mobile threat models mix device possession, OS sandbox, and a hostile network (coffee-shop Wi-Fi). Hardware-backed keys (TEE/Secure Enclave) raise the cost of extraction. Attestation gives the server a signed statement about OS state — useful, spoofable if you only check a boolean on the client.

<ComparisonTable
  headers={['Store', 'Use', 'Avoid']}
  rows={[
    ['Keychain / Keystore', 'Refresh tokens, keys', 'Backups you did not encrypt'],
    ['Encrypted file', 'Cached records', 'Long-lived session files'],
    ['Binary / resource', 'Nothing secret', 'API keys'],
    ['WebView storage', 'Rarely', 'Session cookies for banking'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Mobile app baseline
# - TLS 1.2+ only, no cleartext HTTP
# - Tokens in Keychain/Keystore, not SharedPreferences plaintext
# - Certificate transparency / pinning with a pinset you can rotate
# - Server-side device or step-up checks for high-risk actions
TICK3

Store listings and sideload policy are part of the threat model for Android.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Dev[Device OS] --> App[App sandbox]
    App --> KS[Hardware keystore]
    App --> API[Backend authz]
    MDM[MDM] --> Dev
TICK3

## 5. Interview Prep

**Q: Why not hide the API key in the APK?**
**A:** Extraction is routine. Keys belong on the server.

**Q: MDM vs MAM?**
**A:** MDM manages the device. MAM manages the work app and its data on a device you may not own.

**Q: Is biometric auth enough?**
**A:** It unlocks a key. The server still needs a real session and step-up for transfers.

## 6. Production Use Cases

- **Banking apps** with hardware-backed keys and step-up.
- **Enterprise email** on enrolled devices only.
- **Field-service apps** with remote wipe and offline crypto.

<Callout icon="tip" title="Test on a lost-phone drill">
Revoke the session, wipe if enrolled, and confirm the backend refuses the old token.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Network security/index.mdx',
    title: 'Network Security',
    description:
      'The discipline of controlling traffic, segmenting trust, and watching packets so the wire is not an open hallway.',
    body: `
**Network security** is policy on paths: who may speak to whom, with which protocols, and what you log when they do. Firewalls, segmentation, VPN, DNS filtering, and IDS/IPS are tools. The discipline is **deny by default**, **encrypt in transit**, and **assume a hostile LAN** for anything that leaves the building.

## 1. Deep Dive and Mechanics

**Segment.** Users, servers, PCI, guests, and management planes do not share a flat L2. East-west allow-lists beat a hard shell and a soft chewy center.

**Filter.** Stateful firewalls and security groups at chokepoints. WAF and DDoS controls at the edge for public apps. No admin protocols on the public internet.

**Observe.** Flow logs, DNS logs, and IDS on the spans you can still see (after TLS, that is metadata plus a few inspected edges).

<Callout icon="info" title="Encryption moves the fight to identity">
TLS stops casual sniffing. It does not stop a stolen session or a permitted path to an admin API.
</Callout>

## 2. Mathematical / Theoretical Foundation

A network policy is a set of allow tuples (src, dst, port, proto, identity). The default is deny. Reachability analysis asks whether an unintended path exists after NAT, peering, and overlapping CIDRs. Zero Trust adds a principal and device posture to the tuple so IP alone is not enough.

<ComparisonTable
  headers={['Control', 'Question it answers', 'Limit']}
  rows={[
    ['Firewall / SG', 'May these IPs talk?', 'Stolen host inside the set'],
    ['Segmentation', 'How far can a breach walk?', 'Mis-peered VPCs'],
    ['VPN / ZTNA', 'Is the user on a trusted path?', 'Endpoint malware'],
    ['IDS', 'Does this look hostile?', 'Encrypted payload'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Reachability review
# - Management plane only from PAM / break-glass
# - No 0.0.0.0/0 on SSH or RDP
# - Flow logs on every VPC / VNet
# - Guest Wi-Fi cannot reach corp RFC1918
TICK3

Draw the intended paths once a quarter. The diagram decays faster than the tickets.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Inet[Internet] --> Edge[Edge: DDoS / WAF]
    Edge --> Pub[Public tier]
    Pub --> App[App tier]
    App --> Data[Data tier]
    Users[Users] --> ZT[ZTNA / VPN]
    ZT --> App
TICK3

## 5. Interview Prep

**Q: Firewall vs segmentation?**
**A:** A firewall is a checkpoint. Segmentation is the design that makes most paths not exist.

**Q: Why still do network security under Zero Trust?**
**A:** Identity-aware access still rides packets. You still need DDoS, egress control, and a place to put sensors.

**Q: East-west?**
**A:** Traffic between servers. That is where ransomware walks.

## 6. Production Use Cases

- **PCI and OT** enclaves with documented conduits.
- **Cloud VPCs** with private endpoints and no public RDS.
- **Campus** networks with 802.1X and guest isolation.

<Callout icon="tip" title="Log deny as well as allow">
The packet you dropped is often the first IOC.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Penetration testing/index.mdx',
    title: 'Penetration Testing',
    description:
      'A time-boxed, authorized assessment that reports how a defined target fails under agreed rules — not a license to attack anything.',
    body: `
A **penetration test** is a contracted, scoped review. Testers try to show impact against systems you named, in a window you approved, with a written rules of engagement. It is not a bug bounty, not a red-team covert op, and not a tutorial for breaking into networks. The product is a **prioritized report** your engineers can patch from.

## 1. Deep Dive and Mechanics

**Scope and rules.** In-scope assets, forbidden techniques (usually destructive testing, phishing unless bought), contacts, and a kill switch. Legal and change-control sign off first.

**Method at a high level.** Enumerate what the client already exposed, check whether known classes of weakness exist (authz, patch level, defaults), and demonstrate impact only as far as the rules allow. Stop at proof, not at "how far could we go for fun."

**Close-out.** Findings with severity, evidence stored as agreed, and a retest offer. The value is the fix, not the slide with a logo.

<Callout icon="warning" title="Authorization is the whole job">
Testing without a letter and a scope is just unauthorized access. That is a crime, not a career.
</Callout>

## 2. Mathematical / Theoretical Foundation

A pentest samples the vulnerability space under a budget of hours. Coverage is never complete. Severity should track business impact (data, authz, availability), not scanner CVSS alone. Residual risk after the test is "what we did not have time to touch," and an honest report says so.

<ComparisonTable
  headers={['Activity', 'Goal', 'Covert?']}
  rows={[
    ['Vulnerability scan', 'Known CVE inventory', 'No'],
    ['Pentest', 'Show impact in scope', 'Usually no'],
    ['Red team', 'Test detection of an objective', 'Yes'],
    ['Bug bounty', 'Ongoing external reports', 'No'],
  ]}
/>

## 3. Real-World Implementation

TICK3markdown
# Rules of engagement sketch
# Customer: Example Corp
# Window: 2026-09-08 to 2026-09-19, business hours plus agreed
# In scope: *.app.example.com, staging VPC x
# Out of scope: destructive DoS, third-party IdP, physical
# Contacts: SOC 24/7, legal, engineering lead
# Deliverable: report + retest of criticals
TICK3

Give testers accounts that match real roles so they can find broken access control, not just the login page.

## 4. Visualizations

TICK3mermaid
flowchart LR
    RoE[Rules of engagement] --> Test[Authorized test window]
    Test --> Find[Findings]
    Find --> Fix[Engineering fix]
    Fix --> Retest[Retest]
TICK3

## 5. Interview Prep

**Q: Pentest vs scan?**
**A:** A scan lists known issues. A pentest shows whether they chain into impact and whether business logic fails.

**Q: Why not test prod on Friday?**
**A:** Change risk. Prefer staging plus a thin, agreed prod check.

**Q: How do you pick a vendor?**
**A:** Scope literacy, safe harbor, and whether they write patchable findings.

## 6. Production Use Cases

- **Annual app and infra** tests for enterprise customers.
- **PCI** required assessments.
- **Pre-launch** reviews of a new money-movement flow.

<Callout icon="tip" title="Patch before you buy another test">
Repeating last year's unfixed criticals is theater.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Purple teaming/index.mdx',
    title: 'Purple Teaming',
    description:
      'A joint exercise where offense-style scenarios are run in the open so defenders can tune detection in the same week.',
    body: `
**Purple teaming** is a collaborative drill. A small set of **authorized** scenarios is run while the SOC watches. The goal is better detections and playbooks, not a stealth trophy. If nobody shares timelines, you ran two monologues.

## 1. Deep Dive and Mechanics

Pick a few techniques mapped to a public framework (MITRE ATT&CK IDs as labels, not as a cookbook here). For each: what should fire, what did fire, time to detect, and the config change you will ship. Repeat until the gap list is short.

**Safety.** Same authorization as a pentest. Production data stays out of playgrounds. Use a lab or a canary tenant when you can.

**Output.** New or tighter detections, missing log sources, and training notes. A purple week that only produces a slide deck failed.

<Callout icon="info" title="Purple is a working agreement">
Red hides. Blue guesses. Purple puts both on the same timeline and scores the telemetry.
</Callout>

## 2. Mathematical / Theoretical Foundation

Each scenario is a hypothesis: if event class E occurs, detector D fires within T with false-positive rate below F. Purple teaming estimates those parameters on your stack, not on a vendor brochure. Coverage can be tracked as a matrix of techniques versus detections, knowing the matrix is never complete.

<ComparisonTable
  headers={['Mode', 'Information', 'Best outcome']}
  rows={[
    ['Red only', 'Hidden', 'Surprise findings'],
    ['Blue only', 'Alerts', 'Tuning in the dark'],
    ['Purple', 'Shared timeline', 'Detections that ship'],
    ['Tabletop', 'Talk only', 'Comms practice'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Scenario card
# ATT&CK label: credential access (category only)
# Expected logs: IdP risk, EDR process, VPN
# Expected alert: "impossible travel" or "token from new ASN"
# Result: fired / missed / too noisy
# Owner + ship date for the fix
TICK3

Keep raw offensive tooling notes out of the wiki the whole company can read.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Plan[Pick scenarios] --> Run[Authorized run]
    Run --> Watch[SOC watches]
    Watch --> Gap[Gap list]
    Gap --> Ship[Ship detections]
    Ship --> Plan
TICK3

## 5. Interview Prep

**Q: Why not only red team?**
**A:** Covert tests measure surprise. Purple measures whether you can see a known story. You want both over a year.

**Q: How many scenarios?**
**A:** A handful done well beats a catalog nobody tuned.

**Q: Who leads?**
**A:** A facilitator who can stop the exercise and who owns the gap list.

## 6. Production Use Cases

- **New EDR** onboarding weeks.
- **Detection engineering** sprints after a missed incident.
- **Regulated orgs** that must show control testing, not only a pentest PDF.

<Callout icon="tip" title="Score time-to-detect, not ego">
If the SOC saw it in two minutes, write that down and move to the next gap.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Red teaming/index.mdx',
    title: 'Red Teaming',
    description:
      'An authorized, objective-based exercise that tests whether detection and response notice a realistic intrusion story.',
    body: `
**Red teaming** (when done legally) is a **covert-to-the-SOC, overt-to-leadership** exercise. The team has written authorization, a defined objective (for example, reach a dummy crown-jewel record), and stop rules. The point is to measure **dwell time and response quality**, not to publish attack recipes. This page stays at that management and defensive level.

## 1. Deep Dive and Mechanics

**Charter.** Sponsor, objective, in/out of scope, emergency stop, and whether physical or social vectors are purchased. Legal and HR must sign social-engineering scopes.

**During.** The red cell works toward the objective while a trusted agent can halt them. The blue cell is not handed a live play-by-play (that would be purple). Evidence is kept for the debrief.

**After.** A timeline vs detections, missed log sources, and a remediation program. A red team that only "got domain admin" and leaves no detection work did half a job.

<Callout icon="error" title="No authorization, no red team">
Covert action against systems you do not own is a crime. Internal heroics without a charter are also out of bounds.
</Callout>

## 2. Mathematical / Theoretical Foundation

The exercise is a sample from an enormous adversary strategy space. Success/fail on one objective is a biased estimator of resilience. Useful metrics: time to first reliable detect, time to contain, and fraction of critical path steps that were visible in telemetry. Kill-chain language is a **narrative scaffold for the debrief**, not a how-to.

<ComparisonTable
  headers={['Exercise', 'Primary customer', 'Success looks like']}
  rows={[
    ['Pentest', 'Engineering', 'Patchable findings'],
    ['Red team', 'SOC + leadership', 'Honest detect/respond gaps'],
    ['Purple', 'Detection eng', 'Shipped rules'],
    ['Tabletop', 'Exec comms', 'Decisions under a script'],
  ]}
/>

## 3. Real-World Implementation

TICK3markdown
# Charter sketch
# Objective: access a staged "crown jewel" dataset in lab-prod
# In scope: named corp laptops and the staging VPC
# Out of scope: destructive actions, real customer PII, third parties
# Trusted agent: CISO on-call with halt authority
# Debrief: timeline vs SOC tickets within 10 business days
TICK3

Use canary files and staged data so "success" does not mean real exfiltration.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Charter[Signed charter] --> Ex[Exercise window]
    Ex --> Obj[Objective reached or time up]
    Obj --> Deb[Joint debrief]
    Deb --> Fix[Detections and control fixes]
TICK3

## 5. Interview Prep

**Q: Red vs pentest?**
**A:** Pentest maximizes findings in a known scope. Red tests whether the org notices an objective-driven story.

**Q: Should the SOC know?**
**A:** Usually no, except a trusted agent. That is the measurement.

**Q: What if they "win"?**
**A:** You buy a prioritized gap list. You do not conclude the company is doomed or the testers are magicians.

## 6. Production Use Cases

- **Mature SOCs** that already patch pentest findings.
- **Board-level** assurance after a large control investment.
- **M&A** environments that need a detection reality check.

<Callout icon="tip" title="Fund the fixes">
If the debrief has no budget, you bought expensive theater.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Reverse engineering/index.mdx',
    title: 'Reverse Engineering',
    description:
      'Reading a binary or protocol you did not write, used defensively for malware, interoperability, and incident work.',
    body: `
**Reverse engineering (RE)** is recovering design from artifacts: a binary, a firmware image, a closed protocol. In a security org it is a **defensive skill** for malware triage, vulnerability intake, and compatibility. This page does not cover cracking licenses, defeating protections for piracy, or building exploits.

## 1. Deep Dive and Mechanics

Analysts work on **copies** in a lab. They identify compiler, architecture, and libraries; recover control flow at a high level; and write notes the SOC can use (family, persistence theme, unique strings). Time-box: a commodity sample does not deserve a week of decompile.

**Legal.** License, CFAA, and contract terms matter. RE of your own malware sample or your own product is a different world from RE of a competitor's DRM.

**Pair with policy.** If the question is "do we have a CVE in this driver," you may want the vendor and a patch, not a full RE.

<Callout icon="warning" title="RE is not exploit development">
Understanding a crash is a patch and a mitigation. Turning it into a weapon is out of scope for this knowledge base.
</Callout>

## 2. Mathematical / Theoretical Foundation

A compiled program is a lossy compilation of source. Disassembly is an undecidable problem in the limit (self-modifying code, opaque predicates). In practice, tools recover a good-enough CFG. Type recovery and decompilation are heuristics. Defenders optimize for **decision value per hour**, not perfect source.

<ComparisonTable
  headers={['Need', 'Depth', 'Stop when']}
  rows={[
    ['IOC for SOC', 'Shallow', 'Stable hash / signer / URL pattern'],
    ['Impact for IR', 'Medium', 'You know what data it touched'],
    ['Patch a crash', 'Targeted', 'Root cause and fix'],
    ['Full rewrite', 'Deep', 'Rarely justified'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lab notes template
# Hash, file type, signer, first-seen ticket
# High-level behavior (category): persistence / steal / ransomware
# Huntables to export
# Do not store unpacked samples on corp file shares
TICK3

Keep tools and samples off everyday laptops.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Art[Artifact copy] --> Tri[File type / hash]
    Tri --> Notes[Control-flow notes]
    Notes --> Out[IR / detection output]
TICK3

## 5. Interview Prep

**Q: When do you RE vs just reimage?**
**A:** RE when the family is unknown and impact is unclear. Reimage when the host is cattle and telemetry is enough.

**Q: Ghidra vs IDA?**
**A:** Both are disassemblers/decompilers. Pick the one your team can license and script. The process matters more than the logo.

**Q: Is RE legal?**
**A:** It depends on jurisdiction, contract, and purpose. Security teams involve legal for third-party binaries.

## 6. Production Use Cases

- **Malware intake** for unique samples.
- **Vendor-dead firmware** you must still support safely.
- **Protocol notes** for a legacy plant system you own.

<Callout icon="tip" title="Write the hunt query first">
If RE will not change detection or containment, stop.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/SOC operations/index.mdx',
    title: 'SOC Operations',
    description:
      'The people, process, and tooling that turn security telemetry into triaged work and contained incidents.',
    body: `
A **Security Operations Center (SOC)** watches alerts, hunts, and drives IR. It is a factory for decisions: ignore, ticket, or incident. Tools (SIEM, EDR, SOAR) are inputs. The scarce resource is **attentive humans** and a queue that is not 95 percent junk.

## 1. Deep Dive and Mechanics

**Triage.** Enrich the alert (asset owner, user, geo, recent changes). Check allow-lists and maintenance windows. Close with a reason or escalate with a story.

**Use cases.** Each detection has an owner, a runbook, and a false-positive budget. If a rule cannot be actioned, tune it or drop it.

**Shifts and burnout.** Follow-the-sun or on-call. Measure time-to-acknowledge, not only MTTD vanity. Rotate hunts so people still think.

<Callout icon="warning" title="A SIEM is not a SOC">
Without runbooks, asset context, and authority to isolate, you have an expensive log search.
</Callout>

## 2. Mathematical / Theoretical Foundation

Alert volume is arrival vs service rate. If lambda exceeds mu, queues explode and people click "close." Detection quality is precision/recall against a labeled set you rarely have; in practice you track close reasons and re-open rates. Automation should handle the high-precision tail (disable a known-bad token), not the ambiguous middle.

<ComparisonTable
  headers={['Tier', 'Work', 'Needs']}
  rows={[
    ['L1', 'Triage and known playbooks', 'Context + runbooks'],
    ['L2', 'Investigations', 'Forensics access'],
    ['L3 / DET', 'New detections, hunts', 'Engineering time'],
    ['IR', 'Declared incidents', 'Commander + comms'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Use-case record
# Name: impossible travel on IdP
# Data: IdP risk + VPN + EDR
# Action if true: revoke sessions, open IR sev2
# Tune if: corporate travel calendar match
# Owner: identity detections
TICK3

SOAR can open the ticket and enrich. A human still owns the isolate button for messy cases.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Tel[Telemetry] --> SIEM[SIEM / XDR]
    SIEM --> L1[Triage]
    L1 --> Close[Close with reason]
    L1 --> L2[Investigate]
    L2 --> IR[Incident process]
TICK3

## 5. Interview Prep

**Q: MSSP vs internal SOC?**
**A:** MSSP scales watching. You still own context, authority, and the crown jewels. Hybrid is common.

**Q: How do you cut noise?**
**A:** Kill rules that never become incidents. Add asset context. Fix the product that pages 400 times.

**Q: Hunt vs alert?**
**A:** Alerts are push. Hunts are pull hypotheses. Both need a hypothesis and an output.

## 6. Production Use Cases

- **24/7 enterprise SOC** with EDR + IdP + email.
- **Cloud-first** SOC that lives in the provider and IdP consoles.
- **OT/IT** split queues with different isolate rules.

<Callout icon="tip" title="Close reasons are gold">
If 80 percent of a rule is "expected scanner," change the rule, not the people.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Threat intelligence/index.mdx',
    title: 'Threat Intelligence',
    description:
      'Processed information about adversaries and their methods that changes a defensive decision this week.',
    body: `
**Threat intelligence (TI)** is not a firehose of IPs. It is a statement such as: this actor targets our sector with this theme, so we prioritize these patches and these detections. If nobody changed a control, you collected trivia.

## 1. Deep Dive and Mechanics

**Levels.** Strategic (who and why, for leadership). Operational (campaigns). Tactical (TTPs). Technical (IOCs with TTLs). Most orgs drown in the last and skip the first.

**Lifecycle.** Requirements from IR and product ("do we care about this ransomware family?"), collection from ISACs and vendors, analysis, dissemination in a form a control owner can use, then feedback.

**Quality.** Source, confidence, and expiry. A raw IP from a public list is a maybe. A hash tied to a ticket you already have is gold.

<Callout icon="warning" title="IOC-only intel expires yesterday">
Addresses and filenames rotate. Behaviors and asset priorities last longer.
</Callout>

## 2. Mathematical / Theoretical Foundation

An IOC is a high-precision, low-recall feature. TTP mappings (ATT&CK) are a coarse ontology so you can score coverage. Utility is P(decision change | intel). Bayesian updating is the honest model; traffic-light confidence is the practical one. Sharing communities work when legal lanes (TLP) are respected.

<ComparisonTable
  headers={['Product', 'Audience', 'Example action']}
  rows={[
    ['Strategic brief', 'Exec', 'Budget a control'],
    ['Campaign note', 'SOC / IR', 'Watch a theme'],
    ['TTP note', 'Detection eng', 'Write or tune a rule'],
    ['IOC bundle', 'Controls', 'Block with a TTL'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Intel requirement
# Who: payments org
# Question: which ransomware families hit our sector this quarter?
# Output: top 3 + the backups and IdP controls they imply
# Not: 50k IPs in a CSV nobody will expire
TICK3

Feed IOCs into the SIEM with an expiry and a source field, or do not feed them.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Requirements] --> Col[Collect]
    Col --> Ana[Analyze]
    Ana --> Diss[Disseminate]
    Diss --> Act[Control or hunt]
    Act --> Req
TICK3

## 5. Interview Prep

**Q: Intel vs vulnerability management?**
**A:** VM is your CVE backlog. Intel tells you which threats make some CVEs urgent for you.

**Q: What is TLP?**
**A:** Traffic Light Protocol: how far a share may travel. Breaking TLP ends trust.

**Q: Do we need a dedicated intel team?**
**A:** Not at small scale. You need a named consumer and a 30-minute weekly brief.

## 6. Production Use Cases

- **Sector ISAC** membership with a human who reads it.
- **IR enrichment** during an active incident.
- **Board papers** that name relevant actors without fanfic.

<Callout icon="tip" title="Write requirements before buying a feed">
A feed without a question is unread mail.
</Callout>
`,
  },
]
