import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Container security/index.mdx': `---
title: Container Security
description: The discipline of securing Docker containers, images, and the runtime environment they operate in.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Container Security">

Before Kubernetes orchestrates anything, the fundamental building block is the **Container** (usually Docker). Containers package an application and all its mathematical dependencies into a single, portable image.

Because containers share the host machine\\'s operating system kernel, a vulnerability in a container can mathematically compromise the entire host if not properly secured.

<Callout icon="warning" title="The Root Problem">
  The single most common container security failure is running the container process as the \`root\` user. If an attacker breaches the web app running inside the container, and the app is running as root, the attacker mathematically has root privileges. They can then execute a "container escape" to seize control of the underlying host server.
</Callout>

## Key Security Practices

<ComparisonTable 
  headers={['Practice', 'Description']}
  rows={[
    ['Image Scanning', 'Using tools like Trivy or Clair to mathematically scan the \`Dockerfile\` and the base image (e.g., Ubuntu, Alpine) for known CVEs before the container is ever deployed.'],
    ['Minimal Base Images', 'Instead of using a bloated 1GB Ubuntu image, developers should use "Distroless" or Alpine Linux images (5MB). Fewer installed packages mathematically reduces the attack surface.'],
    ['Immutable Containers', 'A container should be read-only at runtime. If an attacker breaches the app, they cannot mathematically download malware or modify the application files because the filesystem is locked.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/IAM/index.mdx': `---
title: Identity and Access Management (IAM)
description: The overarching framework of policies and technologies ensuring that the right users have the appropriate access to technology resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Identity and Access Management (IAM)">

In modern cloud environments, the traditional network firewall is dead. The new perimeter is **Identity**. If an attacker steals a valid username and password, the firewall will happily let them right through the front door.

**Identity and Access Management (IAM)** is the discipline of mathematically proving *who* a user is (Authentication) and strictly limiting *what* they are allowed to do (Authorization).

<Callout icon="success" title="The Principle of Least Privilege">
  The golden mathematical rule of IAM is Least Privilege. A user or a service account should only be granted the absolute minimum permissions necessary to perform their job, and nothing more. (e.g., The Marketing team does not need read-access to the production database).
</Callout>

## Core IAM Components

1. **Single Sign-On (SSO):** Instead of users having 50 different passwords for 50 different SaaS apps, they authenticate once to a central Identity Provider (like Okta or Azure AD). The IdP then uses mathematical protocols (SAML or OIDC) to log them into the other apps securely.
2. **Multi-Factor Authentication (MFA):** Requiring mathematically distinct forms of proof. (Something you know: Password; Something you have: A YubiKey or a phone; Something you are: A fingerprint).
3. **Privileged Access Management (PAM):** Specialized vaults (like CyberArk) used to strictly control and monitor "God-mode" accounts (like Domain Admins or AWS Root users). These passwords are automatically rotated every few hours.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Endpoint security/index.mdx': `---
title: Endpoint Security
description: The practice of securing end-user devices such as desktops, laptops, and mobile devices from being exploited by malicious actors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Endpoint Security">

An **Endpoint** is any physical device that connects to the corporate network. It is almost always the weakest link in the mathematical security chain because it is operated by a human who might click on a phishing email.

Historically, Endpoint Security just meant installing basic Antivirus software. Today, because malware mutates so rapidly, signature-based Antivirus is largely obsolete. It has been replaced by Endpoint Detection and Response (EDR).

<Callout icon="info" title="EDR vs Antivirus">
  Traditional Antivirus relies on mathematical signatures (comparing a file\\'s hash to a list of known bad hashes). **EDR** (like CrowdStrike or SentinelOne) relies on behavioral analysis. Even if a file has never been seen before in history, the EDR will block it if it behaves maliciously (e.g., trying to silently encrypt the "My Documents" folder).
</Callout>

## Core Capabilities of EDR

<ComparisonTable 
  headers={['Capability', 'Description']}
  rows={[
    ['Continuous Monitoring', 'The EDR agent mathematically records every process spawned, every registry key changed, and every network connection made by the endpoint.'],
    ['Automated Mitigation', 'If malicious behavior is detected, the EDR can automatically kill the process, quarantine the file, and mathematically isolate the laptop from the rest of the network.'],
    ['Threat Hunting', 'Allows SOC analysts to remotely query the mathematical state of thousands of endpoints simultaneously (e.g., "Show me every laptop that currently has a process named \`mimikatz.exe\` running").']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/GRC (Governance, Risk, Compliance)/index.mdx': `---
title: GRC (Governance, Risk, and Compliance)
description: The synchronized approach to managing an organization's overall governance, enterprise risk management, and compliance with regulations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GRC (Governance, Risk, and Compliance)">

Cybersecurity is not just about configuring firewalls; it is a fundamental business risk. **GRC** is the organizational strategy that aligns IT with business objectives while effectively managing mathematical risk and meeting regulatory requirements.

<Callout icon="tip" title="The Three Pillars">
  - **Governance:** The policies, procedures, and leadership oversight that ensure security activities align with the CEO\\'s business goals.
  - **Risk:** The mathematical process of identifying, assessing, and mitigating threats to the organization\\'s capital and earnings.
  - **Compliance:** Ensuring the organization adheres to external laws (GDPR, HIPAA) and industry standards (PCI-DSS, SOC 2).
</Callout>

## The Role of the CISO

The Chief Information Security Officer (CISO) is the executive responsible for the GRC program. Their job is not to eliminate *all* risk—doing so is mathematically impossible without bankrupting the company. 

Their job is to calculate the mathematical cost of a potential breach versus the cost of the security controls required to prevent it, and present that data to the Board of Directors so the business can make an informed decision on Risk Appetite.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Digital forensics/index.mdx': `---
title: Digital Forensics
description: The branch of forensic science encompassing the recovery and investigation of material found in digital devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital Forensics">

When a major cybercrime occurs, it is not enough to just delete the virus. You must mathematically prove *exactly* what happened, especially if the incident will lead to civil litigation or criminal prosecution by law enforcement.

**Digital Forensics** is the meticulous scientific process of preserving, identifying, extracting, and documenting computer evidence.

<Callout icon="warning" title="The Chain of Custody">
  The most critical concept in forensics is the **Chain of Custody**. If a forensic analyst mathematically alters even a single byte of data on the suspect\\'s hard drive, the evidence becomes legally inadmissible in court. Analysts must create perfect mathematical copies (forensic images) of the drive and only analyze the copies.
</Callout>

## The Forensic Process

<ComparisonTable 
  headers={['Phase', 'Action']}
  rows={[
    ['Collection', 'Seizing the physical device. If the device is powered on, immediately dumping the volatile RAM to a file before turning it off, as RAM contains decrypted passwords and active malware.'],
    ['Preservation', 'Using specialized hardware write-blockers to create a bit-for-bit mathematical clone of the hard drive. A cryptographic hash (SHA-256) is calculated to prove the copy is identical to the original.'],
    ['Analysis', 'Searching the clone for hidden files, deleted files (carving), browser history, and timeline reconstruction to prove the suspect\\'s mathematical actions.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Cloud security/index.mdx': `---
title: Cloud Security
description: The discipline of protecting data, applications, and infrastructure involved in cloud computing environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud Security">

In traditional on-premises security, you owned the servers, the network switches, and the building. In Cloud Computing (AWS, Azure, GCP), you are renting someone else\\'s computers. This requires a fundamental shift in how security is architected.

**Cloud Security** relies heavily on IAM (Identity and Access Management) and mathematical configuration management, rather than physical network boundaries.

<Callout icon="warning" title="The Shared Responsibility Model">
  The cloud provider (AWS) is responsible for the security **OF** the cloud (the physical datacenters, the hypervisor, the power grid). The customer is responsible for security **IN** the cloud (the operating system, the firewall rules, the application code, and the IAM permissions).
</Callout>

## Core Cloud Security Concepts

<ComparisonTable 
  headers={['Concept', 'Tooling', 'Description']}
  rows={[
    ['Cloud Security Posture Management (CSPM)', 'AWS Security Hub, Wiz', 'Continuously scans the cloud environment for mathematical misconfigurations (e.g., an S3 bucket accidentally left open to the public internet).'],
    ['Cloud Workload Protection (CWPP)', 'CrowdStrike, Datadog', 'Secures the actual virtual machines and containers running the applications, similar to traditional EDR.'],
    ['Infrastructure as Code (IaC) Security', 'Checkov, Terraform', 'Scanning the mathematical templates that define the cloud infrastructure for security flaws *before* the infrastructure is even built.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Bug bounty programs/index.mdx': `---
title: Bug Bounty Programs
description: Crowdsourced security initiatives where organizations financially reward ethical hackers for discovering and reporting vulnerabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bug Bounty Programs">

A company can only hire a limited number of penetration testers. **Bug Bounty Programs** democratize security testing by inviting the entire global community of ethical hackers to mathematically attack the company\\'s public assets in exchange for cash rewards.

Platforms like HackerOne and Bugcrowd facilitate these programs, providing a safe legal framework for researchers to operate within.

<Callout icon="success" title="The Economics of Bounties">
  Bug bounties are incredibly cost-effective. A company might pay $10,000 for a critical SQL Injection report. However, if a malicious hacker found that same vulnerability on the black market, it could cost the company $10 million in GDPR fines and lost customer trust.
</Callout>

## How it Works

1. **Scope Definition:** The company explicitly defines the mathematical boundaries. (e.g., \`*.example.com\` is allowed, but the physical office WiFi and employee phishing are strictly forbidden).
2. **Discovery & Reporting:** A researcher finds a vulnerability, writes a detailed proof-of-concept, and submits it privately through the bounty platform.
3. **Triage:** The company\\'s internal security team verifies the mathematical validity of the bug and ensures it is not a duplicate.
4. **Reward:** Based on the severity (using CVSS scoring), the researcher is paid. (Minor bugs might pay $50; critical remote code execution bugs can pay over $100,000).

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Application security/index.mdx': `---
title: Application Security (AppSec)
description: The process of making apps more secure by finding, fixing, and enhancing the security of apps at the code level.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Application Security (AppSec)">

Firewalls cannot protect an application that is mathematically designed to be vulnerable. **Application Security (AppSec)** focuses on integrating security practices directly into the software development lifecycle (SDLC), ensuring that developers write secure code from day one.

This philosophy is often referred to as "Shifting Left"—finding mathematical bugs early in the development process rather than waiting until the code is already in production.

<Callout icon="info" title="The OWASP Top 10">
  AppSec engineers rely heavily on the **OWASP Top 10**. This is a globally recognized document that mathematically ranks the ten most critical security risks to web applications (such as Broken Access Control, Injection, and Cryptographic Failures).
</Callout>

## The AppSec Toolchain

<ComparisonTable 
  headers={['Tool Type', 'Acronym', 'Description']}
  rows={[
    ['Static Application Security Testing', 'SAST', 'Mathematically scans the raw, uncompiled source code (e.g., scanning a GitHub repo) to find obvious vulnerabilities like hardcoded passwords or SQL injection flaws.'],
    ['Dynamic Application Security Testing', 'DAST', 'Interacts with the running application from the outside, throwing mathematical payloads at the web forms to see if the application crashes or leaks data (e.g., OWASP ZAP).'],
    ['Software Composition Analysis', 'SCA', 'Scans the \`package.json\` or \`requirements.txt\` to mathematically verify that the third-party open-source libraries the developers are using do not contain known vulnerabilities (CVEs).']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/VPNs/index.mdx': `---
title: Virtual Private Networks (VPN)
description: A technology that creates a secure, encrypted connection over a less secure network, such as the public internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Private Networks (VPN)">

When an employee works from a coffee shop, any hacker on that public WiFi can mathematically intercept their unencrypted traffic. 

A **Virtual Private Network (VPN)** solves this by creating a cryptographic tunnel. The VPN software on the laptop mathematically encrypts all outbound data, sends it through the public internet to the corporate VPN server, where it is decrypted and allowed onto the secure internal network.

<Callout icon="warning" title="The VPN Bottleneck">
  Traditional corporate VPNs have a major flaw: "Hairpinning." If a remote employee wants to access Salesforce (a cloud app), their traffic must first travel all the way to the corporate VPN server in New York, just to be sent right back out to the internet to reach Salesforce. This creates massive mathematical latency.
</Callout>

## Types of VPNs

<ComparisonTable 
  headers={['Type', 'Use Case', 'Description']}
  rows={[
    ['Remote Access VPN', 'Employees working from home', 'Connects an individual user\\'s device securely to the corporate network. (e.g., Cisco AnyConnect, OpenVPN).'],
    ['Site-to-Site VPN', 'Connecting branch offices', 'Mathematically connects entire networks together. A router in the London office establishes a permanent encrypted tunnel to a router in the New York office, so the two networks appear as one.'],
    ['Consumer VPN', 'Privacy enthusiasts', 'Services like NordVPN or ExpressVPN. They encrypt traffic to hide the user\\'s IP address from their ISP and bypass geographical restrictions, but they do not connect the user to a corporate network.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Zero Trust networking/index.mdx': `---
title: Zero Trust Architecture
description: A security framework requiring all users, whether in or outside the organization's network, to be authenticated, authorized, and continuously validated.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zero Trust Architecture">

For decades, IT networks operated on the "Castle and Moat" model. Once you mathematically passed the firewall (the moat) and were inside the corporate network, you were inherently trusted. If a hacker breached the firewall, they had free reign.

**Zero Trust** fundamentally destroys this model. The core mathematical tenet of Zero Trust is: *"Never Trust, Always Verify."*

<Callout icon="success" title="Location is Irrelevant">
  In a true Zero Trust network, there is no "inside" or "outside." An employee sitting at a desk inside corporate headquarters is treated with the exact same mathematical suspicion as a random hacker sitting in a coffee shop halfway across the world.
</Callout>

## Core Principles

1. **Continuous Authentication:** Logging in once at 9:00 AM is not enough. The system mathematically evaluates the user\\'s risk profile continuously. (e.g., If the user suddenly attempts to download 50GB of data, force them to re-authenticate with MFA).
2. **Device Posture:** It is not just about *who* is logging in, but *what* device they are using. The Zero Trust engine mathematically verifies the laptop has the latest OS patches and EDR running before granting access.
3. **Micro-Segmentation:** Applications are isolated from each other. Even if a hacker compromises the HR database, mathematical network policies prevent them from pivoting laterally to the Engineering source code repository.

</ConceptTemplate>
`,
}

async function generateMega65() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega65().catch(console.error)
