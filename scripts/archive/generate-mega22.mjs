import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/CIA triad/index.mdx': `---
title: The CIA Triad
description: "The foundational model of information security, representing the three core pillars of a secure system: Confidentiality, Integrity, and Availability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The CIA Triad">

The **CIA Triad** is the bedrock of all cybersecurity policy and system design. Every security control, encryption algorithm, and firewall rule is ultimately designed to enforce one or more of these three pillars.

If a system fails to guarantee even one of these pillars, it is considered compromised.

## 1. Confidentiality (The Secret)
Confidentiality ensures that sensitive information is strictly accessed only by authorized individuals or systems, and kept hidden from everyone else.
- **Threat**: Data breaches, packet sniffing, unauthorized access.
- **Controls**: AES-256 Encryption (Data at rest), TLS/SSL (Data in transit), RBAC (Role-Based Access Control), Passwords/MFA.

## 2. Integrity (The Truth)
Integrity ensures that data remains accurate, consistent, and untampered with over its entire lifecycle. If an authorized user sends $100, a hacker cannot alter the packet mid-transit to say $10,000.
- **Threat**: Man-in-the-Middle (MitM) attacks, malware altering files, unauthorized database updates.
- **Controls**: Cryptographic Hashing (SHA-256), Digital Signatures, File Integrity Monitoring (FIM), Checksums.

## 3. Availability (The Access)
Availability ensures that systems, networks, and data are strictly available and accessible to authorized users exactly when they need them. A perfectly encrypted database is useless if the server is offline.
- **Threat**: Distributed Denial of Service (DDoS) attacks, ransomware, hardware failures, power outages.
- **Controls**: Load Balancing, Redundancy/Failover (Multi-AZ architecture), Backups/Disaster Recovery plans, Web Application Firewalls (WAF).

<ComparisonTable 
  headers={['Pillar', 'Primary Goal', 'Classic Attack', 'Classic Defense']} 
  rows={[
    ['Confidentiality', 'Prevent unauthorized reading', 'Data Exfiltration / Sniffing', 'Encryption / Access Control'],
    ['Integrity', 'Prevent unauthorized modification', 'Data Tampering / Injection', 'Hashing / Digital Signatures'],
    ['Availability', 'Prevent unauthorized withholding', 'DDoS / Ransomware', 'Redundancy / Backups']
  ]} 
/>

<Callout icon="warning" title="The Trade-off Triangle">
In system design, optimizing heavily for one pillar often sacrifices another. 
For example, enforcing extreme **Confidentiality** (requiring 3 forms of MFA, hardware keys, and VPNs just to log in) severely impacts **Availability** (if a user loses their hardware key, they are permanently locked out of their own data).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Defence in depth/index.mdx': `---
title: Defence in Depth
description: "A cybersecurity strategy that uses multiple, independent layers of security controls to protect information, ensuring that if one layer fails, others will catch the breach."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Defence in Depth">

Also known as the "Castle Approach," **Defence in Depth** is the principle that no single security control is perfect. Every firewall has a zero-day vulnerability; every encryption protocol eventually breaks; every employee can be phished.

To secure a system, you must layer independent defenses.

## 1. The Castle Analogy
Imagine a medieval castle protecting the King (the Data):
1. **The Moat (Perimeter Security)**: The outer firewall blocking malicious IP addresses.
2. **The High Walls (Network Security)**: VPC Subnets ensuring only specific servers can talk to each other.
3. **The Guards (Access Control)**: IAM roles and MFA requiring strict authentication to enter the Keep.
4. **The Safe (Encryption)**: Even if an assassin reaches the King's room, the King is locked inside an impenetrable titanium safe (AES-256 Data-at-Rest Encryption).

## 2. Layers of Modern IT Security
A robust enterprise architecture implements controls at every layer of the OSI model:
- **Physical Layer**: Badge scanners, biometric locks, and security guards at the AWS data center.
- **Network Layer**: Firewalls, VPNs, and Network Access Control Lists (NACLs).
- **Application Layer**: Web Application Firewalls (WAF), input validation, and SQL injection prevention.
- **Endpoint Layer**: Antivirus (EDR), Mobile Device Management (MDM), and restricted USB ports on employee laptops.
- **Data Layer**: Full disk encryption (BitLocker), database column encryption, and strict database permissions.

## 3. The Swiss Cheese Model
In risk management, this is known as the "Swiss Cheese Model." Every layer of security has holes (vulnerabilities). However, if you stack enough slices of cheese together, the holes do not align, and a threat cannot pass all the way through.

<Callout icon="tip" title="Zero-Day Mitigation">
Defence in Depth is the primary mitigation against zero-day exploits. If a critical vulnerability is discovered in your Web Server software (allowing arbitrary code execution), the attacker still cannot steal the database if the database is in a completely isolated, firewalled private subnet that the web server is physically forbidden from accessing.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Least privilege/index.mdx': `---
title: Principle of Least Privilege (PoLP)
description: "The practice of limiting user and system access rights to the absolute minimum permissions necessary to perform their legitimate, required functions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Principle of Least Privilege (PoLP)">

The **Principle of Least Privilege (PoLP)** is arguably the most critical concept in modern IAM (Identity and Access Management). 
If an entity (a user, a microservice, or a script) does not explicitly require access to a resource to do its job, that access must be denied.

## 1. Why PoLP Matters (Blast Radius)
In cybersecurity, we assume compromise is inevitable. The goal of PoLP is to minimize the **Blast Radius** of a compromise.

If an entry-level marketing employee gets hit by a phishing attack, the attacker gains the employee's credentials. 
- **Without PoLP**: The employee had global "Admin" access. The attacker instantly deletes the entire production database.
- **With PoLP**: The employee only had "Read" access to the Marketing CRM. The attacker steals some emails, but the core database, financial records, and server infrastructure remain untouched.

## 2. Implementing PoLP in the Cloud
Cloud providers (AWS, Azure, GCP) enforce PoLP via Identity and Access Management (IAM) Policies. 
A good IAM policy is granular down to the exact action and resource.

Instead of: TICK1Allow: S3:*TICK1 (Allow this server to do anything to any S3 bucket)
You write: TICK1Allow: s3:GetObjectTICK1 on TICK1arn:aws:s3:::marketing-images-bucket/*TICK1 (Allow this server only to READ, and only from this ONE specific bucket).

## 3. Just-in-Time (JIT) Access
Even Senior Database Administrators shouldn't have permanent Admin access. 
Modern PoLP utilizes **JIT Access**. By default, the DBA has zero permissions. When an emergency occurs, the DBA requests access, another engineer approves it, and the DBA is granted temporary Admin credentials that automatically self-destruct after 60 minutes.

<Callout icon="warning" title="The Developer Friction Problem">
Developers hate PoLP because it slows them down. It is much easier to give a microservice global Admin rights so it "just works" rather than spending 3 hours writing a granular 500-line JSON IAM policy. Security engineering is a constant battle between developer velocity and system security.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Zero trust/index.mdx': `---
title: Zero Trust Architecture
description: 'A modern security framework that completely eliminates the concept of a "trusted internal network," requiring strict identity and device verification for every single request, regardless of origin.'
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Zero Trust Architecture">

For decades, corporate networks operated like an egg: a hard outer shell (the Firewall) and a soft, squishy interior (the Intranet). If an employee was connected to the corporate WiFi, they were "trusted" and could freely access internal servers without a password.

**Zero Trust** destroys this model. Its core mantra is: *"Never Trust, Always Verify."*

## 1. The Fall of the Perimeter
The old perimeter model failed for two reasons:
1. **Remote Work**: Employees now work from Starbucks on personal laptops, connecting to cloud SaaS apps. There is no physical corporate perimeter anymore.
2. **Lateral Movement**: If a hacker breaches the outer firewall (e.g., via a compromised VPN account), they find themselves in the "trusted" soft interior, allowing them to freely hop from server to server (lateral movement) completely undetected.

## 2. The Pillars of Zero Trust
Under Zero Trust, the network itself is treated as hostile (just like the public internet). Every single request—even if it comes from the CEO's laptop inside the corporate headquarters—must be cryptographically verified.

1. **Explicit Authentication**: Every request must carry a valid, short-lived token (e.g., JWT, SAML) proving user identity via MFA.
2. **Device Posture Check**: The system verifies not just the user, but the *device*. (e.g., "Is this laptop company-issued? Is the antivirus currently running? Is the OS patched?"). If the device is unpatched, access is denied.
3. **Micro-segmentation**: The network is divided into thousands of tiny, isolated zones. A compromised web server in Zone A physically cannot route packets to the database in Zone B unless explicitly authorized by policy.

## 3. Traditional VPN vs Zero Trust Network Access (ZTNA)

<ComparisonTable 
  headers={['Feature', 'Legacy VPN', 'Zero Trust (ZTNA)']} 
  rows={[
    ['Access Model', 'Connects the user to the entire corporate network.', 'Connects the user strictly to a specific application.'],
    ['Trust', 'Implicit. Once authenticated to the VPN, you are trusted.', 'Continuous. Every single HTTP request is cryptographically re-evaluated.'],
    ['Visibility', 'Network-level IP addresses.', 'Application-level identity and device context.']
  ]} 
/>

<Callout icon="tip" title="BeyondCorp">
Zero Trust was pioneered by Google in 2014 under the project name **BeyondCorp**, after Chinese state-sponsored hackers successfully breached Google's internal network (Operation Aurora). Today, Zero Trust is the mandate for all modern enterprise architectures.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Attack surface/index.mdx': `---
title: Attack Surface
description: 'The sum total of all different points (the "surface") where an unauthorized user can try to enter data to or extract data from an environment.'
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Attack Surface">

In cybersecurity, the **Attack Surface** represents every conceivable way a system could potentially be compromised. 
A fundamental goal of secure architecture is **Attack Surface Reduction (ASR)**—shrinking the target so hackers have fewer opportunities to find a vulnerability.

## 1. Types of Attack Surfaces
The total attack surface is typically divided into three categories:

1. **Digital / Network Attack Surface**: 
   - Open server ports (e.g., leaving Port 22 SSH exposed to the public internet).
   - Public-facing APIs, web forms, and authentication endpoints.
   - Outdated software dependencies (NPM packages) with known vulnerabilities.
2. **Physical Attack Surface**:
   - Unlocked server room doors.
   - Discarded hard drives in the dumpster.
   - USB ports on employee laptops (susceptible to malicious "dropped" flash drives).
3. **Social / Human Attack Surface**:
   - Employees susceptible to phishing, social engineering, or bribery.
   - The human element is almost universally the largest and weakest attack surface in any organization.

## 2. Attack Surface Reduction (ASR) Strategies
Every piece of code you write and every feature you add *increases* the attack surface. ASR aims to reverse this:

- **Disable Unused Features**: If your web server doesn't use FTP, uninstall the FTP daemon. (Every running service is a potential exploit vector).
- **Network Segmentation**: Move databases into Private Subnets that have no public IP addresses. 
- **Code Minification**: Remove dead code and unused NPM dependencies from your application.
- **Zero Trust & VPNs**: Hide internal administrative portals (like Grafana or Jenkins) behind strict ZTNA gateways so they are completely invisible to the public internet.

<Callout icon="warning" title="Shadow IT">
The most dangerous part of an organization's attack surface is the part the security team doesn't know exists. **Shadow IT** (e.g., a marketing team quietly spinning up an unauthorized WordPress server on AWS without telling IT) creates massive, unmonitored attack vectors that are often the root cause of corporate breaches.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Threat modelling (STRIDE/index.mdx': `---
title: Threat Modelling (STRIDE)
description: "A structured, proactive engineering process used to identify, quantify, and address potential security threats during the software design phase, before any code is written."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Threat Modelling (STRIDE)">

Security cannot be bolted onto an application right before launch; it must be designed into the architecture. **Threat Modelling** is the exercise of mapping out a system's architecture on a whiteboard, adopting an attacker's mindset, and asking: *"How can I break this?"*

The most famous methodology for this is Microsoft's **STRIDE** model.

## 1. The STRIDE Methodology
STRIDE is an acronym representing six categories of threats. During a threat modelling session, engineers look at every data flow and component and check them against these six categories:

<ComparisonTable 
  headers={['Threat', 'Definition', 'Violated Property', 'Mitigation Strategy']} 
  rows={[
    ['Spoofing', 'Pretending to be someone or something else.', 'Authentication', 'Strong Identity (MFA, TLS Certificates, OIDC).'],
    ['Tampering', 'Maliciously modifying data on disk or in transit.', 'Integrity', 'Digital Signatures, Checksums, HTTPS, WORM Storage.'],
    ['Repudiation', 'A user performing a malicious action and successfully denying it.', 'Non-repudiation', 'Immutable Audit Logs (append-only), Digital Signatures.'],
    ['Information Disclosure', 'Exposing sensitive data to unauthorized individuals.', 'Confidentiality', 'Encryption (AES-256), Masking, Stripping PII from logs.'],
    ['Denial of Service', 'Flooding a system to make it unavailable to legitimate users.', 'Availability', 'Load Balancers, Rate Limiting, Cloudflare/WAF.'],
    ['Elevation of Privilege', 'A low-level user exploiting a flaw to gain Admin rights.', 'Authorization', 'Principle of Least Privilege, RBAC, strict Input Validation.']
  ]} 
/>

## 2. The Threat Modelling Process
1. **Decompose the Application**: Draw a Data Flow Diagram (DFD) showing the frontend, APIs, databases, and external third-party services.
2. **Identify Threats**: Apply the STRIDE categories to every single arrow (data flow) and box (process) on the diagram. (e.g., *"Can an attacker tamper with the data flowing between the API and the Database?"*)
3. **Determine Mitigations**: For every identified threat, engineer a technical mitigation (e.g., *"We will use TLS 1.3 to prevent tampering in transit."*)
4. **Validate**: Review the architecture to ensure the mitigations were actually implemented correctly in code.

<Callout icon="tip" title="Shift-Left Security">
Threat modelling is the ultimate realization of **"Shift-Left Security"**—moving security checks as early in the Software Development Life Cycle (SDLC) as possible. Fixing a fatal architectural flaw during the whiteboard phase costs $100. Fixing it after a massive data breach in production costs $100 million.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Vulnerabilities/index.mdx': `---
title: Vulnerabilities & CVEs
description: "Weaknesses or flaws in a system's design, implementation, or operation that can be exploited by a threat actor to compromise security."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Vulnerabilities & CVEs">

A **Vulnerability** is the actual hole in the armor. It is a bug, a misconfiguration, or a logical flaw that violates the CIA Triad.
A vulnerability by itself does no damage; it merely sits there, waiting to be exploited.

## 1. Common Types of Vulnerabilities
Vulnerabilities stem from a variety of engineering failures:
- **Software Bugs**: Buffer overflows in C++, logic errors in Authentication code, or improper input sanitization leading to SQL Injection.
- **Misconfigurations**: Leaving an AWS S3 bucket set to "Public Read/Write," or leaving the default admin password (TICK1admin/adminTICK1) on a database.
- **Architectural Flaws**: Designing a system that transmits passwords over plain HTTP instead of HTTPS.

## 2. The CVE System (Common Vulnerabilities and Exposures)
When a security researcher discovers a new vulnerability in a widely used piece of software (like Apache, Windows, or a popular NPM package), it is standardized into the global **CVE Database**.

Every confirmed vulnerability receives a unique ID (e.g., TICK1CVE-2021-44228TICK1, the infamous Log4Shell vulnerability). This allows global security teams, antivirus scanners, and IT departments to track, discuss, and patch the exact same flaw using a universal identifier.

## 3. CVSS Scoring (Common Vulnerability Scoring System)
Not all vulnerabilities are equal. A flaw that allows a remote attacker to execute code without a password is much worse than a flaw that requires physical access to a machine to crash a minor app.

Vulnerabilities are scored from **0.0 to 10.0** based on severity:
<ComparisonTable 
  headers={['Score Range', 'Severity', 'Required Action']} 
  rows={[
    ['9.0 - 10.0', 'Critical', 'Emergency. Wake up the engineering team at 3 AM. Patch immediately.'],
    ['7.0 - 8.9', 'High', 'Urgent. Patch within the next 48 hours or next sprint cycle.'],
    ['4.0 - 6.9', 'Medium', 'Schedule patch during standard weekly/monthly maintenance.'],
    ['0.1 - 3.9', 'Low', 'Trivial impact. Patch when convenient.']
  ]} 
/>

<Callout icon="warning" title="Zero-Day Vulnerabilities">
A **Zero-Day** is a critical vulnerability that is actively being exploited by hackers *before* the software vendor even knows it exists (meaning the vendor has had "zero days" to release a patch). These are highly prized by intelligence agencies and cybercriminals, often selling for millions of dollars on the dark web.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/Exploits/index.mdx': `---
title: Exploits & Payloads
description: "The actual malicious code, scripts, or techniques used by an attacker to take advantage of a vulnerability and compromise a system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Exploits & Payloads">

If a **Vulnerability** is an unlocked door, an **Exploit** is the thief turning the handle, and the **Payload** is what the thief does once inside.

## 1. The Anatomy of an Attack
A successful cyberattack typically requires three distinct components:
1. **The Vulnerability**: The underlying flaw (e.g., an unpatched Windows Server with an SMB protocol bug).
2. **The Exploit**: The delivery mechanism. The attacker writes a specific Python script that sends a carefully crafted, malformed packet to the server, causing the server's memory to corrupt in a highly predictable way.
3. **The Payload**: The actual malware that executes once the exploit successfully breaches the system. (e.g., A ransomware executable that begins encrypting the hard drive).

## 2. Common Exploit Techniques
- **Remote Code Execution (RCE)**: The holy grail of exploits. The attacker sends a command across the internet, and the victim's server blindly executes it with Admin privileges.
- **SQL Injection (SQLi)**: Exploiting poorly written database queries to bypass login screens or dump entire user tables.
- **Cross-Site Scripting (XSS)**: Injecting malicious JavaScript into a legitimate website, forcing the browsers of innocent users to execute it and steal their session cookies.
- **Buffer Overflow**: Overwhelming a fixed-length memory block with too much data, causing the excess data (which contains malicious instructions) to spill into executable memory space.

## 3. Exploit Frameworks (Metasploit)
Hackers do not write exploits from scratch every time. They use robust software engineering tools. 
**Metasploit** is the world's most famous exploitation framework (written in Ruby). It contains a massive, searchable database of thousands of known exploits for thousands of CVEs. 

A penetration tester can simply type a few commands, point Metasploit at a target IP address, select a known exploit (like EternalBlue), select a payload (like a reverse shell), and click "Run."

<Callout icon="tip" title="Patch Management">
The existence of tools like Metasploit is why **Patch Management** is critical. The moment a vulnerability is assigned a CVE, hackers worldwide race to write a Metasploit module for it. If you do not patch your servers immediately, you will be hit by automated scanners dropping exploits across the entire internet.
</Callout>

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
