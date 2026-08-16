import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.3 Network Security/WAF/index.mdx': `---
title: Web Application Firewall (WAF)
description: A specialized firewall that filters, monitors, and blocks HTTP traffic to and from a web application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Application Firewall (WAF)">

A traditional network firewall operates at Layer 3 or 4 of the OSI model; it looks at IP addresses and Port numbers. It has no idea what the actual data is. If you host a website, you *must* open Port 443 (HTTPS) to the world. A traditional firewall will let a hacker right through on that port.

A **Web Application Firewall (WAF)** operates at Layer 7. It mathematically parses the actual HTTP requests (the URLs, the headers, the JSON body) and looks for malicious payloads like SQL Injection or Cross-Site Scripting.

<Callout icon="tip" title="WAF Deployment Models">
  Historically, WAFs were hardware appliances installed in the datacenter. Today, almost all modern WAFs (like Cloudflare or AWS WAF) are cloud-based reverse proxies. The user's traffic mathematically hits the Cloudflare server first, gets scrubbed clean, and then the safe traffic is forwarded to your actual web server.
</Callout>

## How a WAF Works

WAFs primarily operate using a set of mathematical rules, often based on the OWASP ModSecurity Core Rule Set (CRS):

1. **Negative Security Model (Blacklisting):** The WAF allows all traffic by default, but drops anything that matches a known malicious signature (e.g., if the URL contains \`SELECT * FROM\`).
2. **Positive Security Model (Whitelisting):** The WAF blocks all traffic by default, and only allows requests that perfectly match a strict mathematical schema (e.g., "The API only accepts a JSON object with a \`userId\` that is an integer").

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Port scanning/index.mdx': `---
title: Port Scanning
description: The mathematical process of probing a server or host for open ports to determine what services are running.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Port Scanning">

Every computer on a network has an IP address (its street address) and 65,535 possible "Ports" (the doors to the house). To hack a server, you first have to find out which doors are unlocked and what software is listening behind them.

**Port Scanning** is the mathematical technique of sending network packets to specific ports and analyzing the responses. The industry-standard tool for this is **Nmap**.

<Callout icon="warning" title="Stealth is Difficult">
  Scanning all 65,535 ports on a server is incredibly noisy. Modern Intrusion Detection Systems (IDS) will instantly flag the mathematical anomaly of thousands of connections from a single IP and block the scanner. Attackers use "stealth scans" (like a SYN scan) and heavily rate-limit their packets to evade detection.
</Callout>

## Types of Port States

When a port is scanned, it mathematically responds in one of three ways:

<ComparisonTable 
  headers={['State', 'Meaning', 'Hacker Interpretation']}
  rows={[
    ['Open', 'The server responded with an ACK. An application is actively listening on this port.', 'This is the target. I must figure out if the application listening here has a vulnerability.'],
    ['Closed', 'The server responded with an RST (Reset). No application is listening.', 'Move on, nothing to hack here.'],
    ['Filtered', 'The server did not respond at all. The packet was dropped into a black hole.', 'There is a firewall blocking my scan. I cannot mathematically determine if the port is open or closed.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Packet sniffing/index.mdx': `---
title: Packet Sniffing
description: The interception and logging of traffic passing over a digital network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Packet Sniffing">

When you send data over a network (like loading a webpage or sending an email), that data is chopped up into thousands of tiny mathematical pieces called **Packets**. 

**Packet Sniffing** (or Network Analysis) is the act of using software (like **Wireshark** or \`tcpdump\`) to capture these raw packets off the wire and reassemble them to read the data inside. 

<Callout icon="success" title="The Death of Plaintext">
  Historically, packet sniffing was devastating. If someone logged into a website on public WiFi, a hacker sniffing the airwaves could literally read their password in plaintext. The universal adoption of HTTPS (TLS encryption) mathematically broke this attack. Today, a packet sniffer only sees encrypted gibberish.
</Callout>

## Promiscuous Mode

By default, a computer's Network Interface Card (NIC) ignores all packets on the network unless the packet is mathematically addressed directly to its specific MAC address. 

To sniff a network effectively, the NIC must be placed into **Promiscuous Mode** (or Monitor Mode for WiFi). In this mode, the hardware mathematically passes *every single packet* it sees up to the CPU for the sniffing software to record, regardless of who it was addressed to.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Network segmentation/index.mdx': `---
title: Network Segmentation
description: The architectural practice of splitting a computer network into smaller, isolated sub-networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Network Segmentation">

If a bank is robbed, the robbers shouldn't be able to easily walk from the lobby straight into the vault. The building is mathematically divided into secure zones with locked doors between them.

**Network Segmentation** applies this physical concept to digital architecture. Instead of having one massive, flat network where the intern's laptop can directly ping the production database, the network is divided into isolated subnets (VLANs) separated by internal firewalls.

<Callout icon="info" title="Containing the Blast Radius">
  The primary mathematical goal of segmentation is limiting lateral movement. If an attacker breaches a marketing employee's laptop via phishing, segmentation ensures that the malware cannot physically route its packets to the engineering servers, drastically reducing the blast radius of the attack.
</Callout>

## Implementation Strategies

<ComparisonTable 
  headers={['Strategy', 'Technology', 'Description']}
  rows={[
    ['Macro-Segmentation', 'VLANs & Firewalls', 'Splitting the network into broad categories (e.g., Guest WiFi, Employee Laptops, Datacenter Servers). Traffic between these zones must pass through a strict firewall.'],
    ['Micro-Segmentation', 'Software-Defined Networking', 'A Zero-Trust approach. Segmenting down to the individual server level. Even two web servers sitting next to each other in the same rack are mathematically forbidden from talking to each other unless explicitly allowed.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/MITM attacks/index.mdx': `---
title: Man-in-the-Middle (MITM) Attacks
description: A cyberattack where the attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Man-in-the-Middle (MITM)">

If Alice wants to send a secret letter to Bob, she hands it to the postman. If the postman secretly opens the letter, reads it, mathematically alters the contents, reseals it, and hands it to Bob, that is a **Man-in-the-Middle (MITM)** attack.

In networking, an attacker positions themselves logically between the victim's device and the gateway router (often using techniques like ARP Spoofing or rogue WiFi hotspots).

<Callout icon="warning" title="Bypassing Encryption">
  TLS encryption makes MITM attacks incredibly difficult. If the attacker intercepts Alice's connection to her bank, they must present a valid TLS certificate for the bank, otherwise Alice's browser will throw a massive red warning screen.
</Callout>

## Types of MITM Attacks

1. **Rogue Access Points:** An attacker sets up a fake WiFi hotspot named "Starbucks_Free_WiFi." When victims connect, all their traffic routes through the attacker's laptop.
2. **ARP Spoofing:** The attacker mathematically poisons the local network, telling the victim's computer "I am the router," and telling the actual router "I am the victim."
3. **DNS Spoofing:** The attacker compromises the DNS server. When the victim types \`google.com\`, the DNS server maliciously returns the IP address of the attacker's fake Google server.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/IPS/index.mdx': `---
title: Intrusion Prevention Systems (IPS)
description: A network security technology that continuously monitors for malicious activity and automatically blocks it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Intrusion Prevention Systems (IPS)">

While an IDS (Intrusion Detection System) is a passive alarm that just notifies the security team, an **Intrusion Prevention System (IPS)** is an active defender. 

An IPS sits "in-line" on the network. Every single packet mathematically entering the building must pass *through* the IPS. If the IPS detects a known malware signature or malicious behavior, it instantly drops the packet, completely stopping the attack before it reaches the target server.

<Callout icon="warning" title="The False Positive Risk">
  Because an IPS actively drops traffic, a false positive is disastrous. If an IPS mathematically misidentifies a legitimate database backup as a "Data Exfiltration Attack" and kills the connection, the business suffers an outage. This is why IPS rules must be tuned flawlessly.
</Callout>

## Detection Methodologies

<ComparisonTable 
  headers={['Methodology', 'Description']}
  rows={[
    ['Signature-Based', 'The IPS maintains a massive database of mathematical fingerprints for known malware (like a virus scanner). It is extremely fast but cannot detect brand new "zero-day" attacks.'],
    ['Anomaly-Based', 'The IPS uses machine learning to mathematically baseline the "normal" traffic patterns of the network over several weeks. If traffic suddenly spikes or deviates from the baseline, it is blocked.'],
    ['Policy-Based', 'Administrators write strict mathematical rules (e.g., "Any SSH traffic originating from outside the United States is instantly dropped").']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/IDS/index.mdx': `---
title: Intrusion Detection Systems (IDS)
description: A passive network security technology that monitors network traffic for suspicious activity and issues alerts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Intrusion Detection Systems (IDS)">

An **Intrusion Detection System (IDS)** is the digital equivalent of a security camera. It watches everything that happens, but it cannot physically stop a burglar.

Unlike an IPS, which sits directly in the path of the traffic, an IDS is deployed "out-of-band." A copy of the network traffic is mathematically mirrored to the IDS. The IDS analyzes the copy, and if it detects malware, it sends an alert to the SIEM.

<Callout icon="success" title="Zero Network Impact">
  Because the IDS only receives a copy of the traffic, it is mathematically impossible for the IDS to accidentally block legitimate business traffic or slow down the network. This makes them incredibly safe to deploy in sensitive enterprise environments where uptime is critical.
</Callout>

## NIDS vs HIDS

1. **Network-Based (NIDS):** (e.g., Snort, Suricata). Placed at strategic choke points in the network infrastructure. It analyzes the raw packets flying across the wire.
2. **Host-Based (HIDS):** (e.g., OSSEC). Installed as a software agent directly on a specific server (the host). It analyzes the internal mathematical state of the machine—monitoring the system logs, file integrity, and running processes, which a NIDS cannot see.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/DNS attacks/index.mdx': `---
title: DNS Attacks
description: Cyberattacks that target the Domain Name System to disrupt availability or redirect users to malicious servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNS Attacks">

The Domain Name System (DNS) is the phonebook of the internet; it translates human-readable names (like \`google.com\`) into the mathematical IP addresses computers use to route traffic. 

Because every single action on the internet begins with a DNS lookup, compromising the DNS infrastructure is one of the most devastating attacks mathematically possible.

<Callout icon="tip" title="DNSSEC">
  To combat DNS tampering, the industry developed **DNSSEC** (Domain Name System Security Extensions). It adds cryptographic signatures to DNS records, allowing browsers to mathematically verify that the IP address returned actually came from the true owner of the domain, not a hacker.
</Callout>

## Common Attack Vectors

<ComparisonTable 
  headers={['Attack', 'Description']}
  rows={[
    ['DNS Spoofing (Cache Poisoning)', 'The attacker injects forged DNS data into the cache of a DNS resolver. When users ask for \`bank.com\`, the poisoned resolver mathematically directs them to the attacker\\'s fake server.'],
    ['DNS Amplification (DDoS)', 'The attacker sends a tiny DNS request with a spoofed source IP address to a vulnerable server. The server responds with a massive mathematical payload, directing all that traffic at the victim, overwhelming their bandwidth.'],
    ['DNS Tunneling', 'A stealthy exfiltration technique. An attacker inside a restricted network encodes stolen data into the text of a DNS query, bypassing the firewall because DNS port 53 is almost never blocked.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/DMZ/index.mdx': `---
title: DMZ (Demilitarized Zone)
description: A physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DMZ (Demilitarized Zone)">

In military terms, a demilitarized zone is a neutral area between two hostile nations. In cybersecurity, the **DMZ** is a highly controlled network subnet sitting between the dangerous public internet and the highly secure internal corporate network.

Any server that *must* be accessible to the public (like a company's web server or email server) is placed in the DMZ. 

<Callout icon="success" title="The Dual-Firewall Architecture">
  The most secure DMZ design uses two firewalls. The External Firewall allows traffic from the internet into the DMZ. The Internal Firewall completely blocks traffic originating from the DMZ from entering the internal corporate network.
</Callout>

## Mathematical Containment

The entire purpose of a DMZ is mathematical containment. 

Web servers are inherently risky because they accept input from strangers. If a hacker exploits a vulnerability in the web server, they take control of the server. Because the server is trapped in the DMZ, the Internal Firewall mathematically prevents the hacker from pivoting deeper into the network to steal the HR database. 

The compromised web server is a loss, but the crown jewels remain safe.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/DDoS mitigation/index.mdx': `---
title: DDoS Mitigation
description: The mathematical strategies and technologies used to protect networks from Distributed Denial of Service attacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DDoS Mitigation">

A **Distributed Denial of Service (DDoS)** attack is a brute-force mathematical assault. An attacker commands a botnet of 100,000 infected IoT devices to all load your website at the exact same second. The sheer volume of traffic overwhelms your servers, crashing the site for legitimate users.

Traditional firewalls cannot stop large-scale DDoS attacks because the volume of junk data is larger than the physical internet pipe leading into the building. 

<Callout icon="tip" title="The Cloud Scrubbing Center">
  The only way to survive a massive DDoS attack is to have a pipe bigger than the attacker's. Companies use cloud mitigation providers like Cloudflare or Akamai. When an attack hits, traffic is mathematically re-routed via BGP to massive, globally distributed "Scrubbing Centers." The junk traffic is absorbed and filtered out, and only clean traffic is sent to the origin server.
</Callout>

## Types of DDoS Attacks

<ComparisonTable 
  headers={['Type', 'Mechanism', 'Mitigation']}
  rows={[
    ['Volumetric Attacks', 'Pure bandwidth exhaustion. The attacker sends massive amounts of UDP junk data to clog the physical internet connection.', 'Anycast network routing to absorb the mathematical scale of the attack.'],
    ['Protocol Attacks', 'Exploiting weaknesses in Layer 3/4. (e.g., A SYN Flood, which mathematically exhausts the server\\'s connection state tables without using much bandwidth).', 'Intelligent hardware firewalls that validate TCP handshakes before passing them to the server.'],
    ['Application (Layer 7) Attacks', 'The most sophisticated. The attacker sends completely valid HTTP requests (like loading an expensive database search query) over and over to exhaust CPU/RAM.', 'Web Application Firewalls (WAFs) and mathematical Rate Limiting.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega66() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega66().catch(console.error)
