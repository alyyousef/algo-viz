import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/SOC 2/index.mdx': `---
title: SOC 2 (System and Organization Controls 2)
description: The industry standard compliance framework for evaluating how effectively a cloud service provider manages customer data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SOC 2 (System and Organization Controls 2)">

If your company uses AWS, Salesforce, or Datadog, you are trusting a third party with your sensitive data. How do you know their internal security isn\\'t terrible? 

**SOC 2** is an auditing procedure developed by the American Institute of CPAs (AICPA) specifically to ensure that cloud service providers securely manage data to protect the interests of the organization and the privacy of its clients.

<Callout icon="success" title="The B2B Requirement">
  If you are building a B2B SaaS startup, achieving SOC 2 compliance is practically mandatory. Enterprise companies will almost never sign a contract with you until you can hand them your SOC 2 audit report proving you follow basic security hygiene.
</Callout>

## The Trust Services Criteria

A SOC 2 audit is based on five "Trust Services Criteria." Only Security is strictly mandatory; the others are optional based on the business model.

1. **Security:** (Mandatory) The system is protected against unauthorized access (e.g., Firewalls, 2FA, Intrusion Detection).
2. **Availability:** The system is available for operation and use as committed or agreed (e.g., Disaster recovery, Uptime monitoring).
3. **Processing Integrity:** System processing is complete, valid, accurate, timely, and authorized.
4. **Confidentiality:** Information designated as confidential is protected as agreed (e.g., Encryption, Access Controls).
5. **Privacy:** Personal information is collected, used, retained, disclosed, and disposed of securely.

## Type I vs Type II

- **SOC 2 Type I:** Evaluates the *design* of the security processes at a specific point in time (e.g., "Do you have a policy that requires background checks today?").
- **SOC 2 Type II:** Evaluates the *operating effectiveness* of those processes over a period of time, usually 6–12 months (e.g., "Did you actually run background checks on every employee hired over the last year?").

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/PCI-DSS/index.mdx': `---
title: PCI-DSS (Payment Card Industry Data Security Standard)
description: The strict, globally mandated security standard for any organization that handles credit card information.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PCI-DSS (Payment Card Industry Data Security Standard)">

In 2004, Visa, MasterCard, Discover, and American Express realized that disparate security standards were leading to massive credit card breaches. They joined forces to create the PCI Security Standards Council and launched **PCI-DSS**.

If your business accepts, processes, stores, or transmits credit card data, you **must** comply with PCI-DSS. Failure to comply can result in massive monthly fines or the permanent loss of the ability to process credit cards.

<Callout icon="warning" title="Scope Reduction">
  The number one rule of PCI-DSS compliance is: **Don\\'t store credit card numbers if you don\\'t have to.** Modern businesses use payment gateways like Stripe or Braintree to tokenize the transaction on the frontend. The raw credit card number mathematically bypasses the company\\'s servers entirely, drastically reducing their PCI compliance scope.
</Callout>

## The 12 Requirements

PCI-DSS is incredibly prescriptive, containing 12 core requirements grouped into 6 goals:

<ComparisonTable 
  headers={['Goal', 'Requirements']}
  rows={[
    ['Build and Maintain a Secure Network', '1. Install and maintain firewalls. \\n2. Do not use vendor-supplied defaults for system passwords.'],
    ['Protect Cardholder Data', '3. Protect stored cardholder data (Encryption/Hashing). \\n4. Encrypt transmission of data across open, public networks (TLS).'],
    ['Maintain a Vulnerability Management Program', '5. Protect all systems against malware and regularly update anti-virus. \\n6. Develop and maintain secure systems and applications.'],
    ['Implement Strong Access Control Measures', '7. Restrict access to cardholder data by business need-to-know. \\n8. Identify and authenticate access to system components. \\n9. Restrict physical access to cardholder data.'],
    ['Regularly Monitor and Test Networks', '10. Track and monitor all access to network resources and cardholder data. \\n11. Regularly test security systems and processes (Penetration testing).'],
    ['Maintain an Information Security Policy', '12. Maintain a policy that addresses information security for all personnel.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/NIST Cybersecurity Framework/index.mdx': `---
title: NIST Cybersecurity Framework (CSF)
description: A universally adopted set of guidelines for mitigating organizational cybersecurity risks, created by the U.S. government.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NIST Cybersecurity Framework (CSF)">

The National Institute of Standards and Technology (NIST) is a physical sciences laboratory of the U.S. Department of Commerce. While they publish highly technical mathematical standards for things like AES encryption, their most famous administrative achievement is the **NIST Cybersecurity Framework (CSF)**.

Unlike PCI-DSS, which is a rigid checklist, the NIST CSF is a voluntary, high-level framework that helps organizations answer the question: *"How do we organize our entire cybersecurity program?"*

<Callout icon="tip" title="The Common Language">
  The NIST CSF is brilliant because it bridges the gap between technical engineers and the Board of Directors. It translates complex network architecture into a language of business risk.
</Callout>

## The Core Functions

The framework is organized into five core, chronological functions that represent the lifecycle of managing a cyber threat:

1. **Identify:** Develop an organizational understanding of risk. (What assets do we have? Who has access to them?)
2. **Protect:** Develop safeguards to ensure delivery of services. (Implement Firewalls, 2FA, Security Training.)
3. **Detect:** Develop activities to identify the occurrence of a cybersecurity event. (Implement SIEMs, Intrusion Detection Systems.)
4. **Respond:** Develop activities to take action regarding a detected cybersecurity incident. (Incident Response Plan, Containment.)
5. **Recover:** Develop activities to maintain plans for resilience and restore impaired services. (Disaster Recovery, Restoring from Backups.)

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/ISO 27001/index.mdx': `---
title: ISO/IEC 27001
description: The premier international standard for building and maintaining an Information Security Management System (ISMS).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ISO/IEC 27001">

While SOC 2 is heavily focused on the United States cloud market, **ISO/IEC 27001** is the globally recognized standard for information security. It is published by the International Organization for Standardization (ISO).

Unlike technical frameworks that tell you exactly *how* to configure a firewall, ISO 27001 is a management framework. It dictates that an organization must establish, implement, maintain, and continually improve an **Information Security Management System (ISMS)**.

<Callout icon="success" title="The ISMS Concept">
  An ISMS is a systematic approach to managing sensitive company information. It encompasses people, processes, and IT systems. ISO 27001 proves to the world that your company doesn\\'t just do security "ad-hoc," but has a formalized, mathematically documented process for identifying and mitigating risk.
</Callout>

## The PDCA Cycle

ISO 27001 operates heavily on the Deming Cycle for continuous improvement:

<ComparisonTable 
  headers={['Phase', 'Action']}
  rows={[
    ['Plan', 'Establish the ISMS policy, objectives, processes, and procedures relevant to managing risk. (e.g., Conducting a formal Risk Assessment).'],
    ['Do', 'Implement and operate the ISMS policy, controls, processes, and procedures. (e.g., Rolling out mandatory Multi-Factor Authentication).'],
    ['Check', 'Assess and measure process performance against policies, and report the results to management. (e.g., Internal audits).'],
    ['Act', 'Take corrective and preventive actions based on the results of the internal audit to achieve continual improvement.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/HIPAA/index.mdx': `---
title: HIPAA (Health Insurance Portability and Accountability Act)
description: The strict US federal law regulating the security and privacy of protected health information (PHI).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HIPAA (Health Insurance Portability and Accountability Act)">

Enacted in 1996, **HIPAA** is a United States federal law that dictates how healthcare providers, insurers, and their third-party software vendors must protect patient data.

The core of HIPAA focuses on safeguarding **Protected Health Information (PHI)**. This includes any demographic information, medical histories, test results, mental health conditions, or insurance information that can be linked to a specific patient.

<Callout icon="warning" title="Massive Penalties">
  HIPAA violations are notoriously expensive. Fines are levied per violation and can range from $100 to $50,000 *per compromised record*, with a maximum penalty of $1.5 million per year for identical violations. Furthermore, criminal penalties can include up to 10 years in federal prison for knowing violations.
</Callout>

## The Three Core Rules

<ComparisonTable 
  headers={['Rule', 'Description']}
  rows={[
    ['The Privacy Rule', 'Dictates *who* has access to PHI. It requires obtaining patient consent before sharing data and gives patients the right to examine and obtain a copy of their health records.'],
    ['The Security Rule', 'Dictates *how* PHI must be protected electronically. It mandates Administrative (training), Physical (locks on server rooms), and Technical (encryption, access controls) safeguards.'],
    ['The Breach Notification Rule', 'Requires organizations to publicly report any breach affecting more than 500 individuals to the Secretary of HHS, and notify the affected individuals and the media.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/GDPR/index.mdx': `---
title: GDPR (General Data Protection Regulation)
description: The comprehensive data privacy law of the European Union that fundamentally changed how global companies handle user data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GDPR (General Data Protection Regulation)">

Implemented in 2018, the **GDPR** is the toughest privacy and security law in the world. Though it was drafted and passed by the European Union (EU), it imposes obligations onto organizations anywhere in the world, so long as they target or collect data related to people in the EU.

GDPR fundamentally shifted the legal landscape: data belongs to the user, not the company.

<Callout icon="info" title="The Cost of Non-Compliance">
  GDPR introduced existential financial threats to tech giants. Fines can reach up to €20 million, or **4% of the firm\\'s worldwide annual revenue** from the preceding financial year, whichever is higher. (Amazon was famously fined €746 million under GDPR in 2021).
</Callout>

## Key User Rights

GDPR enshrines several mathematically enforceable rights for internet users:

1. **Right to be Forgotten (Erasure):** A user can demand that a company mathematically delete every trace of their existence from all databases and backups.
2. **Right to Access:** Users can request a downloadable copy of all data a company holds on them.
3. **Right to Data Portability:** Users have the right to transfer their data from one IT environment to another (e.g., easily moving your playlists from Spotify to Apple Music).
4. **Consent:** Consent to collect data must be freely given, specific, informed, and unambiguous. (This is why every website now has an annoying Cookie Consent banner).

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/FedRAMP/index.mdx': `---
title: FedRAMP (Federal Risk and Authorization Management Program)
description: The incredibly rigorous, standardized approach to security assessment required for cloud providers selling to the US Federal Government.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="FedRAMP (Federal Risk and Authorization Management Program)">

If a startup builds an amazing cloud application and wants to sell it to the Pentagon, the Department of Energy, or the IRS, they cannot simply sign a contract. The software must first achieve **FedRAMP Authorization**.

FedRAMP is a government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products.

<Callout icon="warning" title="The Highest Barrier to Entry">
  FedRAMP is notoriously the most difficult, expensive, and time-consuming compliance framework in the world. Achieving High Authorization can take a company 12-24 months and cost millions of dollars in engineering and auditing fees, but it unlocks access to billions of dollars in federal contracts.
</Callout>

## Impact Levels

FedRAMP categorizes cloud service offerings into three impact levels, based on the potential impact of a mathematical security breach:

<ComparisonTable 
  headers={['Impact Level', 'Data Types', 'Security Controls']}
  rows={[
    ['Low', 'Publicly available data. Loss of confidentiality would have a limited adverse effect on the agency.', '~125 Controls. Basic security hygiene.'],
    ['Moderate', 'Data that is not available to the public, such as PII (Personally Identifiable Information). Loss would have a serious adverse effect.', '~325 Controls. Very strict monitoring, encryption, and access controls.'],
    ['High', 'Highly sensitive, unclassified data (e.g., law enforcement, financial, health data). Loss would have a severe or catastrophic adverse effect.', '~421 Controls. The absolute maximum level of civilian cybersecurity. Requires FIPS 140-2 validated cryptography.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.5 Compliance & Standards/CCPA/index.mdx': `---
title: CCPA (California Consumer Privacy Act)
description: The landmark state statute that brought GDPR-style data privacy rights to the United States.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CCPA (California Consumer Privacy Act)">

Because the United States lacks a comprehensive federal data privacy law, the state of California stepped in. Enacted in 2020 (and significantly expanded by the CPRA in 2023), the **CCPA** is the strictest data privacy law in America.

Because California represents the 5th largest economy in the world, almost every major technology company was forced to adopt CCPA standards nationwide rather than trying to geographically segregate California users.

<Callout icon="info" title="The 'Do Not Sell' Mandate">
  The most famous and visible requirement of the CCPA is that companies must place a clear, conspicuous link on their website\\'s homepage titled **"Do Not Sell or Share My Personal Information"**. Clicking this must immediately halt the mathematical exchange of the user\\'s data with third-party ad networks.
</Callout>

## Key Rights Under CCPA/CPRA

1. **Right to Know:** Consumers can ask what specific personal data a business has collected about them over the past 12 months.
2. **Right to Delete:** Consumers can request the deletion of their personal data.
3. **Right to Opt-Out:** Consumers can forbid a business from selling or sharing their data to third parties.
4. **Right to Non-Discrimination:** A business cannot charge a consumer a different price or provide a lower quality of service just because the consumer exercised their privacy rights.
5. **Right to Correct:** (Added by CPRA) Consumers can demand the correction of inaccurate personal data.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Penetration testing/index.mdx': `---
title: Penetration Testing (Pentesting)
description: The authorized, simulated cyberattack against a computer system to evaluate its security posture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Penetration Testing (Pentesting)">

Automated vulnerability scanners (like Nessus) are excellent at finding outdated software, but they cannot mathematically link vulnerabilities together to achieve a complex goal. 

**Penetration Testing**, or ethical hacking, is the practice of hiring human experts to actively attack your networks, applications, and employees in a controlled environment to find vulnerabilities before the real hackers do.

<Callout icon="success" title="The Proof of Concept">
  Unlike an automated scanner that outputs a 500-page PDF of theoretical risks, a penetration tester delivers a mathematical "Proof of Concept." They demonstrate exactly how a seemingly low-risk flaw in an obscure web form allowed them to completely extract the CEO\\'s emails.
</Callout>

## Types of Pentesting

<ComparisonTable 
  headers={['Type', 'Knowledge Level', 'Use Case']}
  rows={[
    ['Black Box', 'Zero knowledge. The testers are given only the company\\'s name and must rely entirely on open-source intelligence (OSINT) and external scanning.', 'Simulating an attack from a random, unprivileged internet hacker.'],
    ['White Box', 'Full knowledge. The testers are given the network diagrams, administrator credentials, and the raw source code of the applications.', 'Deep architectural review to find complex, hidden mathematical logic flaws that a Black Box test would miss.'],
    ['Gray Box', 'Partial knowledge. The testers are given a standard user account on the application.', 'Simulating an attack from a malicious insider or a customer whose account was compromised.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Red teaming/index.mdx': `---
title: Red Teaming
description: An advanced, objective-based simulation of a real-world Advanced Persistent Threat (APT) attack.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Red Teaming">

While Penetration Testing focuses on finding *as many vulnerabilities as possible* within a specific scope (e.g., "test this web app"), **Red Teaming** is vastly different. 

Red Teaming is an objective-based, covert operation designed to test an organization\\'s entire detection and response capability. The goal is not to find every bug; the goal is to silently compromise the objective (e.g., "Steal the source code database") without the internal security team (the Blue Team) ever knowing they are there.

<Callout icon="warning" title="No Rules Engagement">
  A penetration test stops at the firewall. A Red Team engagement might involve social engineering, dropping malware-infected USB drives in the company parking lot, calling the IT helpdesk pretending to be a panicked executive who forgot their password, or even physically picking the locks to the server room.
</Callout>

## The Cyber Kill Chain

Red Teams meticulously follow the Lockheed Martin Cyber Kill Chain to model their attacks:

1. **Reconnaissance:** Harvesting email addresses, social media profiles, and open ports.
2. **Weaponization:** Coupling a mathematical exploit with a backdoor payload into a deliverable file (like a PDF).
3. **Delivery:** Sending the weaponized PDF via a highly targeted phishing email (Spear-phishing).
4. **Exploitation:** The payload mathematically triggers a buffer overflow when the PDF is opened.
5. **Installation:** Establishing a persistent backdoor so access remains even if the computer is rebooted.
6. **Command and Control (C2):** The compromised host beacons out to a server controlled by the Red Team.
7. **Actions on Objectives:** Pivoting through the internal network, dumping Active Directory passwords, and quietly exfiltrating the target data.

</ConceptTemplate>
`,
}

async function generateMega63() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega63().catch(console.error)
