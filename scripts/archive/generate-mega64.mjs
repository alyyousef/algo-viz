import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/SOC operations/index.mdx': `---
title: SOC Operations (Security Operations Center)
description: The centralized function within an organization employing people, processes, and technology to continuously monitor and improve an organization's security posture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SOC Operations (Security Operations Center)">

A Security Operations Center (SOC) is the central command post for a company\\'s cybersecurity defenses. It operates 24/7/365, ingesting millions of data points from firewalls, endpoint agents, and network traffic to actively hunt for and stop cyberattacks in real time.

<Callout icon="tip" title="The Triage Problem">
  The biggest challenge in a modern SOC is "Alert Fatigue." A SIEM (like Splunk) might generate 10,000 security alerts per day. If human analysts have to check every single one, they will burn out and miss the actual attack. Effective SOC operations rely heavily on SOAR (Security Orchestration, Automation, and Response) to mathematically filter out the noise.
</Callout>

## The SOC Tier System

SOC Analysts are traditionally divided into tiers based on expertise and responsibility:

<ComparisonTable 
  headers={['Tier', 'Title', 'Responsibilities']}
  rows={[
    ['Tier 1', 'Triage Analyst', 'The front lines. Monitors the SIEM dashboard, reviews the initial alerts, and determines if it is a false positive or a real threat. If real, they escalate to Tier 2.'],
    ['Tier 2', 'Incident Responder', 'Performs deep mathematical analysis on escalated alerts. They identify the scope of the attack, the systems affected, and execute the initial containment strategy (e.g., disconnecting a server).'],
    ['Tier 3', 'Threat Hunter', 'Proactively searches the network for advanced, hidden threats that bypassed the automated SIEM alerts. Often involves reverse engineering malware and developing new detection rules.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Threat intelligence/index.mdx': `---
title: Cyber Threat Intelligence (CTI)
description: The analysis of data regarding malicious actors to understand their motives, targets, and attack behaviors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cyber Threat Intelligence (CTI)">

Defending a network blindly is mathematically impossible; there are infinite ways an attacker could breach a system. **Cyber Threat Intelligence (CTI)** focuses on gathering information about *who* is attacking, *why* they are attacking, and exactly *how* they operate.

By understanding the enemy, an organization can proactively configure their firewalls and Endpoint Detection and Response (EDR) systems to block specific attack vectors before the hackers even launch them.

<Callout icon="success" title="Indicators of Compromise (IoCs)">
  The most immediate output of CTI is IoCs. These are mathematically concrete artifacts like known malicious IP addresses, MD5 hashes of malware files, or specific domain names. CTI feeds push these IoCs to firewalls to automatically block traffic.
</Callout>

## Levels of Intelligence

<ComparisonTable 
  headers={['Level', 'Audience', 'Description']}
  rows={[
    ['Tactical', 'SOC Analysts & Firewalls', 'Highly technical, short-lived data. Includes IP addresses, file hashes, and malicious URLs. Used for immediate, automated blocking.'],
    ['Operational', 'Incident Responders', 'Information on specific attacker methodologies and campaigns. Focuses on the "TTPs" (Tactics, Techniques, and Procedures).'],
    ['Strategic', 'C-Suite & Board', 'High-level analysis of broad trends, financial impacts, and geopolitical motivations (e.g., "State-sponsored actors are targeting healthcare supply chains").']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Reverse engineering/index.mdx': `---
title: Reverse Engineering
description: The complex mathematical process of deconstructing software to extract its design, architecture, and source code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reverse Engineering">

When software is compiled, the human-readable source code (C++, Rust, Go) is translated into raw machine code (1s and 0s) that the CPU executes. 

**Reverse Engineering** is the grueling process of taking that compiled binary and working backward to deduce how it functions. In cybersecurity, this is primarily used for malware analysis, finding zero-day vulnerabilities in closed-source software, and understanding undocumented network protocols.

<Callout icon="warning" title="Anti-Reversing Techniques">
  Malware authors actively try to prevent reverse engineering. They use mathematical "Packers" to compress and encrypt the binary, "Obfuscators" to turn the code into spaghetti logic, and "Anti-Debugging" checks that cause the virus to delete itself if it detects it is running inside an analysis tool like IDA Pro.
</Callout>

## Core Techniques

1. **Static Analysis:** Examining the binary without executing it. Analysts use Disassemblers (like IDA Pro or Ghidra) to convert the machine code back into Assembly language, and then mathematically trace the flow of execution.
2. **Dynamic Analysis:** Executing the binary in a secure, isolated sandbox (a Virtual Machine) and using Debuggers (like x64dbg) to pause the execution at specific memory addresses, observing exactly how the CPU registers and RAM change in real-time.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Purple teaming/index.mdx': `---
title: Purple Teaming
description: A collaborative security exercise where Red and Blue teams work together to maximize cyber defense capabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Purple Teaming">

Historically, Red Teams (attackers) and Blue Teams (defenders) operated in silos. The Red Team would hack the company, deliver a massive PDF report showing how terrible the defenses were, and walk away. The Blue Team was left frustrated and overwhelmed.

**Purple Teaming** bridges this gap. It is a highly collaborative, mathematically structured methodology where attackers and defenders sit in the same room and work together in real-time.

<Callout icon="success" title="The Feedback Loop">
  In a Purple Team exercise, the Red Team executes an attack (e.g., dumping LSASS memory). They immediately stop and ask the Blue Team, "Did your SIEM catch that?" If not, they work together to write the mathematical detection rule, test it again, and verify the defense works before moving to the next attack.
</Callout>

## The Purple Team Process

1. **Threat Intelligence:** The team identifies a specific threat actor (e.g., APT29) and maps out their specific Tactics, Techniques, and Procedures (TTPs) using the MITRE ATT&CK framework.
2. **Execution:** The Red Team simulates exactly how APT29 would breach the network.
3. **Detection Engineering:** The Blue Team analyzes the logs generated by the attack and writes custom rules to mathematically detect that specific behavior in the future.
4. **Validation:** The Red Team runs the attack again to ensure the new detection rule fires perfectly without generating false positives.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Network security/index.mdx': `---
title: Network Security
description: The foundational discipline of protecting the underlying networking infrastructure from unauthorized access, misuse, or theft.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Network Security">

Before you can secure the applications or the data, you must secure the digital highways they travel on. **Network Security** is the practice of implementing hardware and software controls to protect the usability and integrity of your network.

It relies on a layered, mathematical approach called "Defense in Depth." If an attacker bypasses the perimeter firewall, they should immediately hit a secondary internal firewall, an Intrusion Prevention System, and strict VLAN routing rules.

<Callout icon="warning" title="The Death of the Perimeter">
  Historically, networks were built like castles: a hard outer shell (the firewall) and a soft, trusted inside. With the rise of cloud computing and remote work, this model is mathematically broken. An employee\\'s laptop at a coffee shop is inside the "perimeter." This necessitated the shift to Zero Trust Architecture.
</Callout>

## Core Network Security Technologies

<ComparisonTable 
  headers={['Technology', 'Function']}
  rows={[
    ['Next-Generation Firewalls (NGFW)', 'Unlike old firewalls that just blocked IP addresses and ports, NGFWs perform Deep Packet Inspection (DPI) to mathematically analyze the application-level data (e.g., blocking Facebook traffic while allowing Salesforce traffic).'],
    ['Intrusion Prevention Systems (IPS)', 'Actively scans network traffic for known malware signatures and instantly drops the packets before they reach the target server.'],
    ['Network Access Control (NAC)', 'Mathematically verifies the security posture of a device before letting it join the network. (e.g., "This laptop doesn\\'t have antivirus installed; put it in the Quarantine VLAN").']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Mobile security/index.mdx': `---
title: Mobile Security
description: The protection of smartphones, tablets, and wearable devices from threats and data leaks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mobile Security">

In the modern enterprise, the smartphone is the new perimeter. Employees check corporate email, access Slack, and authenticate via 2FA apps on devices that easily fit in their pockets—and are easily lost, stolen, or compromised.

**Mobile Security** deals with the unique mathematical and architectural challenges of securing iOS and Android ecosystems, which are vastly different from traditional Windows/Linux endpoints.

<Callout icon="info" title="Sandboxing Architecture">
  Unlike a Windows PC where an application runs with the user\\'s full permissions, iOS and Android employ strict mathematical Sandboxing. Every app runs in its own isolated container. App A cannot read the memory or files of App B unless explicitly permitted by the OS through APIs.
</Callout>

## Enterprise Mobility Management (EMM)

To secure employee devices, corporations deploy Mobile Device Management (MDM) or EMM solutions:

1. **Remote Wipe:** If a phone is lost on the subway, the IT admin can send a cryptographic kill command to mathematically erase the entire device instantly.
2. **Containerization:** The MDM creates a secure, encrypted "Work" profile on the phone. The company has absolute control over the Work apps, but zero visibility into the user\\'s personal apps or photos.
3. **App Vetting:** The MDM can forbid the installation of known malicious applications or require the device to be running the latest OS version before allowing access to corporate email.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Malware analysis/index.mdx': `---
title: Malware Analysis
description: The study of malicious software to understand its behavior, origin, and impact.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Malware Analysis">

When an Incident Response team discovers a suspicious \`.exe\` file on a compromised server, they must determine exactly what it does. Does it steal passwords? Is it a ransomware encryptor? Does it open a backdoor?

**Malware Analysis** is the highly specialized discipline of dissecting malicious code in a safe, mathematically isolated environment to extract threat intelligence and build defenses against it.

<Callout icon="warning" title="The Danger of Sandboxing">
  Malware analysts never execute viruses on their real computers. They use heavily isolated Virtual Machines (Sandboxes). However, advanced malware uses mathematical checks (like querying the CPU temperature or looking for specific VMWare drivers) to detect if it is in a sandbox. If it detects a sandbox, it goes dormant to hide its true behavior.
</Callout>

## The Analysis Pipeline

<ComparisonTable 
  headers={['Phase', 'Technique', 'Description']}
  rows={[
    ['Fully Automated', 'Cuckoo Sandbox', 'Upload the file to an automated system. It executes the malware and generates a massive JSON report of every file it touched and every server it pinged.'],
    ['Static Properties', 'Strings / PE Analysis', 'Without running the file, extracting human-readable text (like IP addresses or error messages) and analyzing the mathematical headers of the executable.'],
    ['Interactive Behavior', 'Process Explorer / Wireshark', 'Running the malware in a VM while a human analyst watches what processes it spawns, what registry keys it modifies, and what network traffic it generates.'],
    ['Manual Reversing', 'IDA Pro / Ghidra', 'The most difficult phase. Disassembling the machine code to mathematically prove exactly how the virus achieved its objectives.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Kubernetes security/index.mdx': `---
title: Kubernetes Security
description: The complex discipline of securing container orchestration platforms in cloud-native environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kubernetes Security">

Kubernetes (K8s) is the industry standard for deploying and managing containerized applications. However, its massive flexibility makes it notoriously difficult to secure. A single misconfigured mathematical permission can allow an attacker to escape a web container and take over the entire server cluster.

**Kubernetes Security** requires securing the 4 C\\'s of Cloud Native: Cloud, Cluster, Container, and Code.

<Callout icon="tip" title="Role-Based Access Control (RBAC)">
  The most common Kubernetes vulnerability is overly permissive RBAC. If a frontend web container is mathematically granted the \`cluster-admin\` role, an attacker who compromises that web container instantly gains God-mode access over every database and application in the cluster.
</Callout>

## Core K8s Security Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Network Policies', 'By default, any pod in a K8s cluster can talk to any other pod. Network Policies act as internal firewalls, mathematically restricting communication (e.g., the Frontend pod can talk to the Backend pod, but NOT directly to the Database pod).'],
    ['Pod Security Standards', 'Policies that prevent developers from deploying containers that run as \`root\`, mount sensitive host file systems, or request elevated Linux kernel privileges.'],
    ['Secrets Management', 'Never storing API keys or passwords in plaintext inside the container image or deployment YAML. K8s Secrets or external vaults (like HashiCorp Vault) must be used to mathematically inject credentials at runtime.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Incident response/index.mdx': `---
title: Incident Response (IR)
description: The structured, rapid-response methodology used by organizations to handle a data breach or cyberattack.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Incident Response (IR)">

Despite the best firewalls and encryption, a determined attacker will eventually breach the network. When the alarms go off, the organization cannot afford panic. 

**Incident Response (IR)** is the highly structured, almost militaristic execution of predefined plans to minimize damage, mathematically contain the threat, and restore normal business operations as quickly as possible.

<Callout icon="success" title="The Golden Rule of IR">
  The primary goal of Incident Response is not to catch the hacker or perfectly preserve forensic evidence for the FBI. The primary goal is **Business Continuity**—getting the company\\'s servers back online and generating revenue safely.
</Callout>

## The SANS Incident Response Lifecycle

The SANS Institute defines a universally adopted 6-step lifecycle (PICERL):

1. **Preparation:** Having the tools, policies, and communication plans ready before an attack happens.
2. **Identification:** Mathematically determining whether an anomalous event is a false alarm or a true security incident.
3. **Containment:** Stopping the bleeding. (e.g., Unplugging the infected server from the network so the ransomware cannot spread).
4. **Eradication:** Removing the root cause of the incident. (e.g., Deleting the malware, patching the vulnerability, resetting all passwords).
5. **Recovery:** Restoring systems to normal operation from clean backups, and mathematically verifying they are secure.
6. **Lessons Learned:** A post-mortem meeting to update the defenses so the exact same attack never succeeds twice.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.4 Cybersecurity Disciplines/Blue teaming/index.mdx': `---
title: Blue Teaming
description: The proactive and reactive defense of an organization's digital assets against cyberattacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Blue Teaming">

If the Red Team are the ethical hackers simulating the attack, the **Blue Team** are the internal security professionals tasked with detecting, mitigating, and stopping them.

Blue Teaming is a broad discipline that encompasses almost all defensive cybersecurity operations, from configuring firewalls and managing the SOC, to conducting forensic investigations after a breach.

<Callout icon="info" title="The Blue Team Disadvantage">
  The Blue Team plays an inherently asymmetrical game. The defender must perfectly secure thousands of servers, laptops, and employees every single day. The attacker only needs to find one single mathematical vulnerability, or trick one single employee into clicking a link, to win.
</Callout>

## Core Blue Team Responsibilities

<ComparisonTable 
  headers={['Responsibility', 'Description']}
  rows={[
    ['Log Analysis & SIEM', 'Constantly tuning the SIEM to aggregate logs from across the enterprise, creating mathematical alerts that flag anomalous behavior without drowning analysts in false positives.'],
    ['Vulnerability Management', 'Running automated scanners (like Nessus) to find unpatched software, and coordinating with the IT department to deploy patches before hackers can exploit them.'],
    ['Incident Response', 'When the alarms go off, the Blue Team executes the containment and eradication strategies to mathematically eject the attackers from the network.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega64() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega64().catch(console.error)
