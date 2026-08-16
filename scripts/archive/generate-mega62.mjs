import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Suricata/index.mdx': `---
title: Suricata
description: A high-performance, open-source network analysis and threat detection engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Suricata">

Suricata is a robust, open-source Network Intrusion Detection System (NIDS), Intrusion Prevention System (IPS), and Network Security Monitoring (NSM) engine. Developed by the OISF (Open Information Security Foundation), it is highly regarded as the modern, multi-threaded successor to Snort.

<Callout icon="success" title="The Multi-Threading Advantage">
  Older engines like Snort were originally single-threaded, meaning they could only utilize one CPU core, creating massive bottlenecks on 10-Gigabit networks. Suricata was designed from the ground up to be fully multi-threaded, allowing it to seamlessly scale across massive 64-core enterprise servers.
</Callout>

## Core Capabilities

<ComparisonTable 
  headers={['Capability', 'Description']}
  rows={[
    ['Signature-Based Detection', 'Inspects live network traffic against thousands of known mathematical rules and malware signatures to instantly drop malicious packets.'],
    ['Protocol Identification', 'Automatically identifies protocols (HTTP, DNS, TLS) on ANY port, defeating malware that tries to hide SSH traffic on port 80.'],
    ['File Extraction', 'Can automatically extract files (like PDFs or EXEs) out of the raw network stream and save them to disk for isolated malware analysis.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Splunk/index.mdx': `---
title: Splunk
description: The industry-leading SIEM platform that turns massive amounts of machine data into actionable security intelligence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Splunk">

In a modern enterprise, you have thousands of servers, firewalls, and applications generating gigabytes of log files every minute. If a hacker breaches your network, the evidence is in those logs, but finding it manually is impossible.

**Splunk** is a Security Information and Event Management (SIEM) system. It ingests massive amounts of raw, unstructured machine data, indexes it mathematically, and makes it instantly searchable.

<Callout icon="info" title="The Search Processing Language (SPL)">
  Splunk uses its own proprietary query language called SPL. It allows security analysts to pipe commands together mathematically, similar to Unix bash. (e.g., \`index=firewall action=blocked | stats count by src_ip | sort - count\`)
</Callout>

## Splunk in the SOC

In a Security Operations Center (SOC), Splunk is the central nervous system. 

1. **Ingestion:** Universal Forwarders installed on endpoints constantly stream logs to the Splunk Indexers.
2. **Correlation:** Splunk Enterprise Security mathematically correlates events. (e.g., "User Bob failed login 50 times from Russia, and 2 seconds later successfully logged in from New York.")
3. **Alerting:** It generates automated alerts for the incident response team to investigate the anomalous behavior.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Snort/index.mdx': `---
title: Snort
description: The original, legendary open-source Network Intrusion Detection System created by Sourcefire.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Snort">

Created by Martin Roesch in 1998, **Snort** is arguably the most famous Network Intrusion Detection System (NIDS) in the world. Now owned by Cisco, it fundamentally defined how signature-based threat detection operates.

<Callout icon="warning" title="Snort Rules">
  The true value of Snort is its syntax. "Snort Rules" have become the lingua franca of the cybersecurity industry. Almost all major commercial firewalls and competing open-source tools (like Suricata) natively understand and import Snort rules.
</Callout>

## Anatomy of a Snort Rule

A Snort rule consists of a **Rule Header** (who, where, and what) and **Rule Options** (the specific mathematical payload to look for).

\`alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS $HTTP_PORTS (msg:"SQL Injection Attempt"; content:"%27 OR 1=1"; sid:100001;)\`

- **Action:** \`alert\` (Log the packet)
- **Protocol:** \`tcp\`
- **Source/Dest:** From any external IP to our internal HTTP servers.
- **Payload Math:** Look for the exact byte sequence of \`' OR 1=1\` URL-encoded.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/OWASP ZAP/index.mdx': `---
title: OWASP ZAP (Zed Attack Proxy)
description: A highly capable, free, and open-source web application security scanner and proxy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OWASP ZAP (Zed Attack Proxy)">

While Burp Suite is the commercial gold standard for web application testing, the **Zed Attack Proxy (ZAP)** is the flagship open-source alternative maintained by the Open Worldwide Application Security Project (OWASP).

It operates identically as a "Man-in-the-Middle" proxy, allowing developers and penetration testers to intercept, inspect, and mathematically manipulate HTTP traffic between their browser and the web application.

<Callout icon="tip" title="CI/CD Integration">
  Because ZAP is completely free and has a robust headless API, it is universally used in DevSecOps pipelines. Developers configure GitHub Actions to automatically spin up ZAP and mathematically scan the staging environment for vulnerabilities (like XSS or SQLi) before every production deployment.
</Callout>

## Key Features

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Active Scanner', 'Automatically fires thousands of known attack payloads at the target website to discover mathematical flaws in the backend logic.'],
    ['Spider / Crawler', 'Automatically navigates the website, parsing HTML and JavaScript to discover all hidden endpoints, APIs, and directories.'],
    ['Fuzzer', 'Allows testers to inject massive arrays of random, malformed data into specific input fields to cause unhandled exceptions or crashes.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/OpenVAS/index.mdx': `---
title: OpenVAS (Open Vulnerability Assessment System)
description: A comprehensive open-source vulnerability scanner and manager.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OpenVAS (Open Vulnerability Assessment System)">

When you have a network of 5,000 computers, it is impossible to manually check if every machine has the latest Windows patches or is running an outdated, vulnerable version of Apache. 

**OpenVAS** is a full-featured vulnerability scanner. It scans the network, identifies the software running on every machine, and cross-references it against a massive database of known Common Vulnerabilities and Exposures (CVEs).

<Callout icon="info" title="The Nessus Fork">
  OpenVAS originally began as a fork of the famous "Nessus" scanner after Nessus transitioned from open-source to a closed-source commercial product in 2005. Today, OpenVAS is maintained by Greenbone Networks.
</Callout>

## How it Works

1. **Port Scanning:** It first acts like Nmap, discovering which IP addresses are alive and what ports are open.
2. **NVT Execution:** It executes thousands of Network Vulnerability Tests (NVTs). These are small scripts that interact with the open ports, attempting safe, mathematical checks to confirm if a specific vulnerability exists.
3. **Reporting:** It generates a comprehensive PDF/HTML report, scoring vulnerabilities using the CVSS (Common Vulnerability Scoring System) so admins know what to patch first.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Nessus/index.mdx': `---
title: Nessus
description: The industry-standard commercial vulnerability scanner developed by Tenable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Nessus">

Developed by Tenable Network Security, **Nessus** is the most widely deployed vulnerability scanner in the world. While OpenVAS serves the open-source community, Nessus is the commercial heavyweight relied upon by Fortune 500 companies and governments.

<Callout icon="success" title="The Plugin Database">
  The true value of Nessus is not its scanning engine, but its **Plugin Database**. Tenable employs hundreds of security researchers. Within hours of a new zero-day vulnerability hitting the news (like Log4j), Tenable writes a mathematical plugin for Nessus to detect it. This database contains over 180,000 plugins.
</Callout>

## Types of Scans

<ComparisonTable 
  headers={['Scan Type', 'Description', 'Accuracy']}
  rows={[
    ['Uncredentialed Scan', 'Scans the machine from the outside over the network. It can only see what a hacker would see (open ports, banner grabbing).', 'Low. Prone to false positives because it cannot see inside the OS.'],
    ['Credentialed Scan', 'The scanner is given an Administrator/Root password. It logs into the machine via SSH/RDP and mathematically inspects the registry, local files, and installed packages.', 'Extremely High. It knows exactly what is vulnerable.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Kali Linux/index.mdx': `---
title: Kali Linux
description: The specialized Debian-based Linux distribution explicitly designed for penetration testing and digital forensics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kali Linux">

Maintained by Offensive Security, **Kali Linux** is the undisputed standard operating system for hackers, penetration testers, and security professionals. 

It is not designed for daily use as a desktop OS. Instead, it is a highly customized environment pre-loaded with over 600 specific cybersecurity tools.

<Callout icon="tip" title="Why use Kali?">
  Compiling hacking tools from source code is notoriously difficult. A tool like Metasploit requires specific versions of Ruby, PostgreSQL, and dozens of obscure libraries. Kali Linux eliminates this nightmare by having every tool perfectly pre-compiled, mathematically configured, and ready to launch from a unified menu.
</Callout>

## Key Characteristics

1. **Single User by Default:** Historically, Kali ran completely as the \`root\` user, because packet injection, network sniffing, and hardware manipulation require absolute mathematical control over the kernel.
2. **Custom Kernel:** Kali uses a custom Linux kernel patched for wireless injection, allowing Wi-Fi adapters to easily spoof packets and crack WPA2 handshakes.
3. **Forensic Mode:** Kali can be booted from a USB drive in "Forensic Mode." In this mode, it mathematically guarantees that it will never mount the host machine\\'s hard drive or alter a single byte of data, preserving the chain of custody for police investigations.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/John the Ripper/index.mdx': `---
title: John the Ripper
description: A legendary, extremely fast password cracking software tool.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="John the Ripper">

When a hacker steals a database of passwords, they don\\'t get the plaintext passwords; they get cryptographic hashes (like MD5, SHA-256, or bcrypt). To find the real passwords, they must "crack" the hashes.

**John the Ripper (JtR)** is one of the oldest and most famous open-source password crackers. It is incredibly versatile and runs on CPU architectures.

<Callout icon="info" title="The Auto-Detect Magic">
  John the Ripper\\'s most famous feature is that it mathematically analyzes the structure of the hash (e.g., length, character set, prefixes like \`$1$\`) and automatically detects the hashing algorithm used, requiring zero configuration from the user.
</Callout>

## Cracking Modes

<ComparisonTable 
  headers={['Mode', 'Description']}
  rows={[
    ['Dictionary Attack', 'Takes a massive text file of common passwords (like the famous \`rockyou.txt\`), hashes each one, and mathematically compares it to the stolen hash.'],
    ['Brute Force', 'Mathematically tries every single possible combination of characters (\`a\`, \`b\`, \`c\`... \`aaaa\`, \`aaab\`). Guaranteed to work eventually, but usually takes millions of years for long passwords.'],
    ['Rule-based Attack', 'The most effective mode. It takes a dictionary word (e.g., \`password\`) and applies mathematical mutations (e.g., capitalizing the first letter, appending \`123\`, changing \`a\` to \`@\`) to create highly probable guesses (\`P@ssword123\`).']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/IDA Pro/index.mdx': `---
title: IDA Pro (Interactive Disassembler)
description: The absolute gold standard commercial tool for software reverse engineering and malware analysis.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IDA Pro (Interactive Disassembler)">

When analyzing a sophisticated virus (like Stuxnet), security researchers do not have the source code. They only have the compiled binary \`.exe\` file, which is just millions of mathematical 1s and 0s. 

**IDA Pro** (Interactive Disassembler Professional) is the industry-standard tool used to translate that machine code back into human-readable Assembly language.

<Callout icon="success" title="The Hex-Rays Decompiler">
  While reading Assembly is incredibly difficult, IDA Pro\\'s creator (Hex-Rays) revolutionized the industry by adding a "Decompiler" plugin. It mathematically analyzes the complex Assembly control flows and attempts to reconstruct the original high-level C/C++ code, saving researchers thousands of hours.
</Callout>

## Core Capabilities

1. **Interactive Analysis:** Unlike automated tools, IDA is highly interactive. If the automated analysis fails to mathematically identify a function, the human analyst can manually rename variables, define data structures, and map out the binary.
2. **Graph View:** It maps out the Assembly code into visual flowcharts. You can visually see the \`if/else\` branching logic, making it vastly easier to understand how the malware makes decisions.
3. **Cross-Architecture:** IDA supports analyzing binaries compiled for almost any CPU architecture in existence, from x86 Windows to ARM Android, to obscure embedded microcontrollers.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Hashcat/index.mdx': `---
title: Hashcat
description: The world's fastest and most advanced password recovery utility, leveraging the massive parallel compute power of GPUs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hashcat">

While *John the Ripper* is excellent for CPU-based cracking, **Hashcat** is the undisputed champion of GPU-accelerated password cracking. 

A modern CPU might have 16 or 32 cores to do math. A modern Nvidia RTX 4090 GPU has over 16,000 compute cores. Hashcat is explicitly designed to leverage OpenCL and CUDA to execute billions of mathematical hash comparisons per second across massive GPU clusters.

<Callout icon="warning" title="The NTLM Vulnerability">
  Hashcat can crack older, unsalted hashes at terrifying speeds. For example, a single RTX 4090 can calculate over 100 Billion Windows NTLM hashes per second. This means an 8-character complex Windows password can be mathematically brute-forced in less than an hour.
</Callout>

## Advanced Attack Modes

<ComparisonTable 
  headers={['Mode', 'Description']}
  rows={[
    ['Combinator Attack', 'Takes two dictionaries and mathematically concatenates every word in the first with every word in the second (e.g., \`super\` + \`mario\` = \`supermario\`).'],
    ['Mask Attack', 'A surgical brute-force. Instead of trying every character, you define a mathematical mask. If you know the password is a name followed by 4 digits, you use the mask \`?l?l?l?l?l?d?d?d?d\`, reducing the search space by trillions.'],
    ['Hybrid Attack', 'Combines a dictionary word with a mask. (e.g., Word from dictionary + \`?d?d?s\` to append two numbers and a symbol).']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega62() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega62().catch(console.error)
