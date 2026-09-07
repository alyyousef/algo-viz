export const compPages = [
  {
    rel: '42.5 Compliance & Standards/CCPA/index.mdx',
    title: 'CCPA / CPRA',
    description:
      'California privacy law that gives residents rights over personal information and duties to businesses that collect it.',
    body: `
The **California Consumer Privacy Act (CCPA)**, expanded by **CPRA**, is a state privacy statute. It is not a security standard like SOC 2. It grants residents rights (know, delete, correct, opt out of sale/share) and requires businesses over a size or data threshold to disclose practices and honor requests. Security teams care because **you cannot fulfill a delete if you cannot find the data**.

## 1. Deep Dive and Mechanics

**Who.** For-profit businesses that meet revenue, records, or share-of-revenue tests, plus vendors who process for them. Employee and B2B data have had shifting coverage — read the current text, do not rely on 2018 blog posts.

**Rights operations.** A request lands, you verify identity without creating a new breach, you find every system of record, you delete or export, and you tell service providers to do the same. "Sale" and "share" include many ad-tech cookies, not only a cash invoice.

**Security.** Reasonable security is expected. A breach of unencrypted personal information has notice and AG dynamics. Encryption, access control, and a data map are the engineering half.

<Callout icon="info" title="CCPA is not GDPR with palm trees">
Definitions, thresholds, and private right of action differ. Do not copy-paste an EU RoPA and call it done.
</Callout>

## 2. Mathematical / Theoretical Foundation

Privacy compliance is a data-lineage problem: for each personal-information category, list purposes, processors, retention, and deletion method. Completeness of the map bounds your legal risk more than the font on the privacy policy. Identity verification is a security vs usability trade: too weak leaks data to impostors; too strong denies the real resident.

<ComparisonTable
  headers={['Duty', 'Engineering need', 'Failure']}
  rows={[
    ['Know / access', 'Export by person key', 'Shadow SaaS'],
    ['Delete', 'Hard delete + vendor fan-out', 'Backups forever unlabeled'],
    ['Opt-out sale/share', 'Consent and cookie plumbing', 'Pixels you forgot'],
    ['Reasonable security', 'Encryption, IAM, IR', 'Public bucket of PI'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Request runbook
# 1. Verify the requester (do not email the full export to an unchecked address)
# 2. Query the data map: CRM, billing, logs, warehouse, vendors
# 3. Apply delete or export; record ticket id and systems touched
# 4. Set a calendar reminder for backup expiry
TICK3

Treat marketing pixels as processors. If you cannot name them, you cannot honor opt-out.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Resident request] --> Ver[Verify identity]
    Ver --> Map[Data map lookup]
    Map --> Sys[Systems + vendors]
    Sys --> Act[Export or delete]
    Act --> Ev[Evidence ticket]
TICK3

## 5. Interview Prep

**Q: CCPA vs GDPR?**
**A:** Both are privacy laws. GDPR is EU, lawful-basis heavy. CCPA is California, consumer-rights and notice heavy, with different thresholds.

**Q: Do logs count?**
**A:** Often yes if they can identify a person. Retention and deletion design must include them.

**Q: What is CPRA?**
**A:** The ballot upgrade: more rights, an agency (CPPA), and sensitive-PI rules.

## 6. Production Use Cases

- **Consumer apps** with California users and ad tech.
- **Data warehouses** that must support subject deletion.
- **Vendor contracts** that flow down deletion SLAs.

<Callout icon="tip" title="Build the data map before the inbox opens">
A privacy portal without lineage is a promise you will break.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/FedRAMP/index.mdx',
    title: 'FedRAMP',
    description:
      'A U.S. government program that standardizes security assessment of cloud services used by federal agencies.',
    body: `
**FedRAMP** (Federal Risk and Authorization Management Program) is how U.S. federal agencies buy cloud with a repeatable security review. A Cloud Service Provider (CSP) implements NIST 800-53 controls at a baseline (Low, Moderate, High, plus LI-SaaS), gets assessed by a 3PAO, and receives an authorization. It is a **package and a continuous-monitoring job**, not a sticker you print once.

## 1. Deep Dive and Mechanics

**Authorize.** You pick a baseline, write a System Security Plan, implement controls, and sit an assessment. An agency or the JAB issues an ATO. Other agencies can reuse the package (the point of the program).

**Operate.** Monthly/annual deliverables: vulnerability scans, inventory, significant-change reports, and POA&Ms for open items. A quiet "we shipped a new region" can be a significant change.

**Boundary.** What is in the FedRAMP system vs corporate IT must be drawn. Corporate laptops that admin the cloud are in scope whether you like it or not.

<Callout icon="warning" title="Authorization is a living boundary">
If prod and the CI that can prod-deploy are different worlds on paper but the same keys in life, the assessor will notice.
</Callout>

## 2. Mathematical / Theoretical Foundation

FedRAMP is a control catalog (800-53) plus an assurance process (assess, authorize, monitor). Residual risk is tracked as POA&Ms with dates. Inheritance (IaaS under PaaS) is a composition of authorizations. The security claim is "meets the baseline as assessed," not "unhackable."

<ComparisonTable
  headers={['Baseline', 'Typical use', 'Effort']}
  rows={[
    ['LI-SaaS', 'Low-impact SaaS', 'Smallest'],
    ['Low', 'Limited data', 'Small'],
    ['Moderate', 'Most civilian SaaS', 'Default large'],
    ['High', 'Sensitive missions', 'Largest'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Continuous monitoring pack (conceptual)
# - Monthly authenticated vuln scans of the boundary
# - Inventory diff vs last month
# - POA&M updates with owners and dates
# - Incident notifications per the agency SLA
TICK3

Engineers should see FedRAMP change control as the same pipeline as prod, with extra evidence attached.

## 4. Visualizations

TICK3mermaid
flowchart LR
    SSP[SSP + controls] --> 3PAO[3PAO assess]
    3PAO --> ATO[Agency or JAB ATO]
    ATO --> ConMon[Continuous monitoring]
    ConMon --> ATO
TICK3

## 5. Interview Prep

**Q: FedRAMP vs SOC 2?**
**A:** SOC 2 is a CPA attestation to a customer. FedRAMP is a government authorization against 800-53 with ongoing scans.

**Q: What is a 3PAO?**
**A:** A Third Party Assessment Organization accredited to test the package.

**Q: Why do people say FedRAMP is hard?**
**A:** Evidence volume, change control, and the boundary including admin paths.

## 6. Production Use Cases

- **SaaS** sold to U.S. civilian agencies.
- **IaaS regions** that other CSPs inherit.
- **Gov cloud** partitions with separate IdP and keys.

<Callout icon="tip" title="Design the boundary on day one">
Retrofitting logging and admin isolation after the first agency deal is the expensive path.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/GDPR/index.mdx',
    title: 'GDPR',
    description:
      'The EU General Data Protection Regulation: lawful processing, data-subject rights, and accountability for personal data.',
    body: `
**GDPR** is the European Union's primary personal-data law. It applies to organizations in the EU and to many outside that offer goods or monitor people in the EU. It is a **lawful-basis and rights** regime, not a firewall checklist. Security is required as "appropriate technical and organisational measures," including breach notice (typically 72 hours to a supervisory authority when required).

## 1. Deep Dive and Mechanics

**Principles.** Lawfulness, fairness, transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity/confidentiality, and accountability.

**Roles.** A controller decides purposes. A processor acts on documented instructions. Both need contracts (DPA) and a path for subject rights.

**Rights and transfers.** Access, delete, restrict, portability, object. Transfers out of the EU need a mechanism (SCCs, adequacy, and a transfer assessment). Cookies and tracking are their own headache (ePrivacy plus GDPR).

<Callout icon="warning" title="Legitimate interest is not a magic word">
You still balance, document, and offer an opt-out where required. "We wanted analytics" is not a complete LIA.
</Callout>

## 2. Mathematical / Theoretical Foundation

GDPR risk is often framed as a DPIA: likelihood and severity of impact on people, not only on the company. Minimisation is an information-theory instinct: collect fewer identifying fields. Pseudonymisation and encryption are mitigations, not exemptions from being personal data. Accountability means you can show the record of processing, not only claim you are careful.

<ComparisonTable
  headers={['Concept', 'Means', 'Engineering hook']}
  rows={[
    ['Lawful basis', 'Why you may process', 'Flags in the data model'],
    ['Minimisation', 'Only needed fields', 'Schema and logs'],
    ['DPO / ROPA', 'Governance artifacts', 'System inventory'],
    ['72h notice', 'Authority clock', 'IR playbook'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Product privacy checklist
# - Named lawful basis per purpose
# - Retention on every store (including logs and backups)
# - Export/delete API keyed by user id
# - Subprocessor list and DPA in the procurement path
TICK3

Do not keep "just in case" email dumps of EU customers in a personal Drive.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Purpose[Purpose + basis] --> Collect[Collect min data]
    Collect --> Store[Store with retention]
    Store --> Rights[Subject rights]
    Store --> IR[Breach process]
    Store --> Xfer[Transfer tool]
TICK3

## 5. Interview Prep

**Q: Controller vs processor?**
**A:** Controller decides why. Processor follows instructions. A SaaS is often processor for customer content and controller for its own billing.

**Q: Is a hash still personal data?**
**A:** If it can be linked back to a person, treat it as personal. Salted hashes can still be personal data.

**Q: What is a DPIA?**
**A:** A documented high-risk processing assessment you do before you scale the risky thing.

## 6. Production Use Cases

- **Global SaaS** with EU tenants.
- **Marketing stacks** with consent and suppression.
- **HR systems** for EU employees.

<Callout icon="tip" title="Put retention in the table definition">
A column without a TTL becomes a forever archive.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/HIPAA/index.mdx',
    title: 'HIPAA',
    description:
      'U.S. health privacy and security rules for protected health information held by covered entities and their business associates.',
    body: `
**HIPAA** (Health Insurance Portability and Accountability Act) plus the HITECH updates govern **protected health information (PHI)** in the U.S. Covered entities (providers, plans, clearinghouses) and **business associates** (SaaS that touches PHI) must implement the Privacy, Security, and Breach Notification Rules. Encrypting a disk is necessary and not sufficient.

## 1. Deep Dive and Mechanics

**Privacy Rule.** Minimum necessary, uses and disclosures, patient rights, notices. Engineering sees this as "role-based access and audit who viewed a chart."

**Security Rule.** Administrative, physical, and technical safeguards that are required or addressable. Addressable does not mean optional; it means document why an alternative is equivalent.

**Breach.** Unauthorized use or disclosure of unsecured PHI. Encryption safe harbor exists when implemented to NIST-class standards. BAAs must flow to subcontractors.

<Callout icon="error" title="No BAA, no PHI">
A clever startup Slack channel is not a covered environment. If the vendor will not sign a BAA, do not put PHI there.
</Callout>

## 2. Mathematical / Theoretical Foundation

HIPAA security is a risk-analysis obligation (identify ePHI, threats, controls, residual risk), not a single product. "Addressable" controls are a documented decision record. Minimum necessary is a least-privilege rule over data fields, not only over VPN access. Audit logs must be attributable to a person, which forbids shared workstations without a story.

<ComparisonTable
  headers={['Rule', 'Core ask', 'Typical control']}
  rows={[
    ['Privacy', 'Who may see PHI', 'RBAC, min necessary'],
    ['Security', 'How ePHI is protected', 'MFA, encryption, audit'],
    ['Breach notify', 'When to tell people', 'IR clock + legal'],
    ['BAA', 'Vendor duty', 'Contract + equivalent safeguards'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# ePHI system baseline
# - Unique user IDs, MFA, automatic logoff
# - Encryption in transit and at rest
# - Audit of view/export; alerts on bulk access
# - BAA + BA inventory before go-live
TICK3

Access reviews for clinicians who changed departments are as important as TLS.

## 4. Visualizations

TICK3mermaid
flowchart LR
    CE[Covered entity] --> BAA[BAA]
    BAA --> BA[Business associate SaaS]
    BA --> PHI[ePHI store]
    PHI --> Audit[Access audit]
    PHI --> IR[Breach process]
TICK3

## 5. Interview Prep

**Q: Covered entity vs BA?**
**A:** The hospital is usually a CE. The cloud EHR or billing SaaS is a BA and needs a BAA.

**Q: Addressable encryption?**
**A:** If you skip it, you must document an equivalent. In 2026, "we skipped encryption" is a hard sell.

**Q: Is de-identified data free of HIPAA?**
**A:** Expert determination or Safe Harbor de-identification is a specific process. "We dropped the name column" is often still PHI.

## 6. Production Use Cases

- **EHR and telehealth** platforms.
- **Claims and billing** processors.
- **Research** pipelines that still hold identifiers.

<Callout icon="tip" title="Log the break-glass">
Emergency access must exist for care. It must also page someone.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/ISO 27001/index.mdx',
    title: 'ISO/IEC 27001',
    description:
      'An international standard for an Information Security Management System you can certify against.',
    body: `
**ISO/IEC 27001** is the standard for an **Information Security Management System (ISMS)**. You define scope, assess risk, pick controls (Annex A, aligned with 27002), run the PDCA loop, and a certification body audits you. The certificate says you have a managed system. It does not say a particular product is bug-free.

## 1. Deep Dive and Mechanics

**Scope.** Legal entities, locations, and systems in the ISMS. A narrow scope is honest if sales does not claim the whole company.

**Risk and SoA.** Risk assessment leads to a Statement of Applicability: which Annex A controls you use and why some are excluded. Then you operate them: access reviews, supplier reviews, incident process, secure development.

**Audit.** Stage 1 (readiness) and Stage 2 (certification), then surveillance years. Internal audit and management review are not optional theater.

<Callout icon="info" title="Annex A is a menu, not a shopping list">
You select controls from risk. Copying 93 controls into a wiki with no owners is not an ISMS.
</Callout>

## 2. Mathematical / Theoretical Foundation

ISO 27001 is a management-system standard (Plan-Do-Check-Act) wrapped around a control catalog. Residual risk after treatment is accepted by a named role. Certification is a sampling assurance process: auditors test a sample of controls and evidence. The security claim is process existence and operation, not exhaustive technical proof.

<ComparisonTable
  headers={['Artifact', 'Purpose', 'Owner']}
  rows={[
    ['Scope', 'What is certified', 'CISO / exec'],
    ['Risk register', 'Why controls exist', 'Risk owner'],
    ['SoA', 'Control selection', 'ISMS lead'],
    ['Internal audit', 'Check the system', 'Independent of ops'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Lightweight ISMS loop
# - Quarterly risk review
# - Monthly access and vuln metrics
# - Annual internal audit + management review
# - Supplier list with security questionnaires on a cadence
TICK3

Tie tickets to control IDs so evidence is a query, not a scavenger hunt.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Scope[Scope] --> Risk[Risk assessment]
    Risk --> SoA[Statement of Applicability]
    SoA --> Ops[Operate controls]
    Ops --> IA[Internal audit]
    IA --> CB[Certification body]
TICK3

## 5. Interview Prep

**Q: 27001 vs 27002?**
**A:** 27001 is the certifiable ISMS. 27002 is guidance on how controls look.

**Q: 27001 vs SOC 2?**
**A:** Both are assurance. 27001 is an international management standard. SOC 2 is an AICPA attestation on Trust Services Criteria.

**Q: Can a startup pass?**
**A:** Yes if scope is honest and evidence is real. Headcount is not the blocker; chaos is.

## 6. Production Use Cases

- **Enterprise sales** that require a certificate.
- **Multi-country** groups that want one ISMS language.
- **Suppliers** who must show a certified ISMS to a regulator.

<Callout icon="tip" title="Scope the product you sell first">
Certifying the cafeteria Wi-Fi and forgetting the SaaS is a common comedy.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/NIST Cybersecurity Framework/index.mdx',
    title: 'NIST Cybersecurity Framework',
    description:
      'A voluntary U.S. framework that organizes cybersecurity outcomes into functions you can measure and communicate.',
    body: `
The **NIST Cybersecurity Framework (CSF)** is a common language for outcomes: **Govern, Identify, Protect, Detect, Respond, Recover** (CSF 2.0 added Govern). It is not a law and not a certification. You profile your current and target state, then fund the gaps. Boards like it because it is short enough to put on a slide without lying too much.

## 1. Deep Dive and Mechanics

**Core.** Functions, categories, and subcategory outcomes (for example, asset inventory, access control, detections). You map your actual controls to those outcomes.

**Profiles and tiers.** A profile is "where we are / where we want to be" for a system or enterprise. Tiers describe how risk-informed the program is, not a score to brag about.

**Implementation.** Pick a backbone (CSF) and crosswalk ISO, CIS, SOC 2 so engineers do not run four programs. Use it in vendor reviews and board packs.

<Callout icon="info" title="CSF 2.0 is the current spine">
If your slide still says five functions only, update it. Govern is first-class now.
</Callout>

## 2. Mathematical / Theoretical Foundation

CSF is a taxonomy of outcomes, not a quantitative risk model. You can overlay FAIR or a simple likelihood-impact matrix. The value is coverage analysis: empty categories are visible. Tiers are ordinal labels (Partial to Adaptive). Do not average them into a fake 87.

<ComparisonTable
  headers={['Function', 'Question', 'Example outcome']}
  rows={[
    ['Govern', 'Who owns cyber risk?', 'Policy and roles'],
    ['Identify', 'What do we have?', 'Asset and data map'],
    ['Protect', 'What stops abuse?', 'IAM, hardening'],
    ['Detect / Respond / Recover', 'Can we see, stop, restore?', 'SOC, IR, backups'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Profile row
# Category: PR.AA (identity)
# Current: passwords + optional MFA
# Target: phishing-resistant MFA for all workforce
# Gap owner: IAM lead, two quarters
TICK3

Publish the profile internally. A secret framework helps no one.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Gov[Govern] --> Id[Identify]
    Id --> Pr[Protect]
    Pr --> Det[Detect]
    Det --> Res[Respond]
    Res --> Rec[Recover]
    Rec --> Gov
TICK3

## 5. Interview Prep

**Q: Is CSF mandatory?**
**A:** For many U.S. federal and contractor contexts it is expected. For private industry it is a voluntary lingua franca, sometimes required by customers.

**Q: CSF vs 800-53?**
**A:** CSF is outcomes. 800-53 is a detailed control catalog. You can implement CSF with 800-53, CIS, or ISO controls.

**Q: What is a current-state profile?**
**A:** An honest map of which outcomes you actually meet, with evidence.

## 6. Production Use Cases

- **Board reporting** of program gaps.
- **M&A** security integration plans.
- **Sector profiles** (manufacturing, IT) as a starting template.

<Callout icon="tip" title="Fund Detect and Recover, not only Protect">
Many programs buy prevent tools and skip backups and detections. CSF makes that imbalance obvious.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/PCI-DSS/index.mdx',
    title: 'PCI DSS',
    description:
      'The payment-card industry standard for protecting cardholder data wherever it is stored, processed, or transmitted.',
    body: `
**PCI DSS** is a contractual standard from the PCI Security Standards Council. If you store, process, or transmit **cardholder data (CHD)** or **sensitive authentication data**, you are in the cardholder data environment (CDE) and must meet the current DSS (v4.x). The cheapest control is often **not having the data**: a hosted payment field or token vault shrinks scope.

## 1. Deep Dive and Mechanics

**Scope.** Systems that touch CHD and systems connected to them. Segmentation that actually works can shrink the CDE. Flat networks make the whole estate in scope.

**Requirements.** Network controls, hardening, protect stored data, encryption in transit, anti-malware, secure development, access control, unique IDs, physical, logging, testing, and a policy pack. v4.x emphasizes customized approaches and stronger MFA and phishing-resistant options for CDE access.

**Assess.** SAQ vs ROC depends on volume and how you take cards. QSAs assess larger merchants and service providers.

<Callout icon="error" title="Logs and admin laptops are in scope if they can reach the CDE">
A jump box with CHD screenshots in a ticket is still card data.
</Callout>

## 2. Mathematical / Theoretical Foundation

Scope is a reachability and data-flow graph. If CHD bytes can land on a host, that host is in. PAN storage constraints (render, hash, truncate, encrypt with documented key management) are applied crypto, not "we zipped it." Compensating controls must meet the intent and be extra, not a shrug.

<ComparisonTable
  headers={['Approach', 'CHD on your box?', 'Typical SAQ / ROC']}
  rows={[
    ['Redirect / hosted field', 'No', 'Shorter SAQ'],
    ['Tokenize after auth', 'Transient only', 'Smaller CDE'],
    ['Store PAN', 'Yes', 'Full controls + keys'],
    ['Service provider', 'Yes for customers', 'ROC common'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Scope reduction
# - Hosted payment page; your app stores only a token
# - CDE in a separate VPC with deny-all peering
# - Admin via PAM with MFA; no email on CDE jump hosts
# - Quarterly ASV scans and documented pentest
TICK3

Never keep magnetic-stripe or CVV data after authorization. That is forbidden storage, not a setting.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Browser[Browser] --> Hosted[Hosted payment]
    Hosted --> Vault[Token vault]
    Browser --> App[Your app: token only]
    App --> Vault
    CDE[CDE segment] --> App
TICK3

## 5. Interview Prep

**Q: What is the CDE?**
**A:** The people, process, and tech that store, process, or transmit CHD, plus connected systems that can affect it.

**Q: Why tokenize?**
**A:** Tokens are not PANs. Most of your CRM falls out of scope if the flow is honest.

**Q: SAQ vs ROC?**
**A:** Self-Assessment Questionnaire vs a Report on Compliance signed by a QSA. Volume and role decide.

## 6. Production Use Cases

- **E-commerce** with a hosted checkout.
- **Payfacs and processors** with a large CDE.
- **Retail** store networks segmented from office IT.

<Callout icon="tip" title="Draw data flows before you buy a scanner">
PCI is a scope problem first and a tool problem second.
</Callout>
`,
  },
  {
    rel: '42.5 Compliance & Standards/SOC 2/index.mdx',
    title: 'SOC 2',
    description:
      'An AICPA attestation report on how a service organization meets Trust Services Criteria such as security and availability.',
    body: `
**SOC 2** is an attestation by a CPA firm against the **Trust Services Criteria** (Security always; Availability, Confidentiality, Processing Integrity, Privacy as you add them). A Type I is a point-in-time design review. A Type II tests operating effectiveness over a period (often 3–12 months). Customers ask for the report under NDA. It is not a product certification and not a pentest.

## 1. Deep Dive and Mechanics

**System description.** You write what the system is, the boundaries, and the controls. The auditor tests a sample: access reviews, change tickets, backup restores, vendor reviews, alerts.

**Exceptions.** A failed sample becomes a written exception. Honest exceptions plus a fix beat a fake clean report that a customer later disproves.

**Bridge letters.** After the period, a short letter says "nothing material changed" until the next Type II. Do not treat that as a new audit.

<Callout icon="warning" title="SOC 2 is sampling">
Passing does not mean every laptop was encrypted every day. It means the control operated in the sample.
</Callout>

## 2. Mathematical / Theoretical Foundation

Attestation is statistical sampling over a control population (joiners, changes, incidents). Type II speaks to operating effectiveness across time. Criteria are outcome-oriented; you map your controls to them (CC6 access, CC7 detect, and so on). Residual risk and complementary user-entity controls (CUECs) remind the customer they still have work.

<ComparisonTable
  headers={['Report', 'Says', 'Use']}
  rows={[
    ['SOC 2 Type I', 'Design at a date', 'Early sales'],
    ['SOC 2 Type II', 'Operated over a period', 'Enterprise default'],
    ['SOC 3', 'Public summary', 'Website seal'],
    ['SOC 1', 'Financial reporting controls', 'Payroll / fintech ledgers'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Evidence you will be asked for
# - SSO/MFA screenshots + joiner/leaver tickets
# - Change tickets with review for prod deploys
# - Backup restore test notes
# - Risk assessment and vendor list
# - Incident tickets (yes, having some is healthy)
TICK3

Put evidence in the ticket at the time of the work, not in a March panic.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Scope[System description] --> Map[Controls to TSC]
    Map --> Period[Type II period]
    Period --> Sample[Auditor sample]
    Sample --> Rep[Report + exceptions]
TICK3

## 5. Interview Prep

**Q: Type I vs Type II?**
**A:** I is design. II is "did it run for months." Serious buyers want II.

**Q: Security criterion only?**
**A:** Common for a first year. Availability if you sell SLAs. Privacy if you are a processor of personal data at scale.

**Q: Is SOC 2 required by law?**
**A:** No. It is a market and contract expectation.

## 6. Production Use Cases

- **B2B SaaS** security reviews.
- **Data processors** that must show change control.
- **Annual** customer questionnaire replacement (partial).

<Callout icon="tip" title="Write CUECs your customers can actually do">
If you require them to MFA and you never said so, the report will.
</Callout>
`,
  },
]
