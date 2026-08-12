import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SMTP/index.mdx': `---
title: SMTP (Simple Mail Transfer Protocol)
description: The internet standard protocol used strictly for sending (pushing) email messages from a client to a server, or between servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SMTP (Simple Mail Transfer Protocol)">

When you click "Send" on an email, your email client uses **SMTP** (TCP Port 25, 465, or 587) to push the message to your email provider (like Gmail). Gmail then uses SMTP to push that message across the internet to the recipient's email provider (like Outlook).

**SMTP is strictly a push protocol.** It cannot be used to retrieve or read emails.

## The SMTP Conversation

SMTP is entirely text-based. If you telnet into an SMTP server, you literally type commands like:
- TICK1HELO client.example.comTICK1 (Hello, I want to talk)
- TICK1MAIL FROM:<alice@example.com>TICK1
- TICK1RCPT TO:<bob@example.com>TICK1
- TICK1DATATICK1 (Here comes the actual email body)

## The Port 25 Problem

Historically, all SMTP traffic used **Port 25** with zero authentication and zero encryption. Because of this, spammers could connect to any unprotected SMTP server (an "Open Relay") and use it to blast millions of spam emails, destroying the server's reputation.
Today, almost all residential ISPs aggressively block outbound Port 25. Modern email clients are forced to use **Port 587 (SMTP over TLS)**, which mandates strict username/password authentication and TLS encryption before a single email can be sent.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/IMAP/index.mdx': `---
title: IMAP (Internet Message Access Protocol)
description: The modern standard for retrieving emails, designed to keep all messages perfectly synchronized across multiple devices and the central server.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IMAP (Internet Message Access Protocol)">

Because SMTP can only *send* mail, you need a different protocol to *read* mail. Today, the absolute standard is **IMAP** (TCP Port 143, or Port 993 for encrypted IMAPS).

## The Synchronization Philosophy

IMAP was designed for the modern world where a user owns a laptop, a smartphone, and a tablet. 

When your iPhone uses IMAP to check your email, it does **not** download the emails and delete them from the server. Instead, IMAP acts as a synchronized remote control:
- It downloads a temporary cache of the headers so you can see the inbox.
- If you click an email on your phone, it streams the body from the server.
- If you mark an email as "Read" on your phone, IMAP sends a command to the Server to mark it "Read" in the master database. 
- When you open your laptop 5 minutes later, that email instantly shows as "Read" because both devices are looking at the exact same master server state.

<Callout icon="info" title="Server Storage Requirements">
  Because IMAP fundamentally relies on leaving all emails permanently on the server, the email provider (like Google or Microsoft) must provide massive, multi-gigabyte hard drives for every single user. This is why enterprise email hosting is incredibly expensive.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/POP3/index.mdx': `---
title: POP3 (Post Office Protocol version 3)
description: The legacy, one-way email retrieval protocol designed for the 1990s when internet access was highly restricted and server storage was expensive.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="POP3 (Post Office Protocol version 3)">

Before IMAP became the standard, the world used **POP3** (TCP Port 110, or Port 995 for encrypted POP3S). 

In the 1990s, server hard drive space was incredibly expensive. Email providers could not afford to store 10,000 emails for you. Furthermore, users paid for internet access by the minute (Dial-up), meaning they could not stay online to read emails.

## The Download-and-Delete Philosophy

POP3 was designed to solve these 90s hardware limitations:
1. You connect to the internet.
2. Your email client connects via POP3.
3. The client physically downloads every single new email to your local computer's hard drive.
4. **The client sends a command to the server to permanently delete the emails from the server.**
5. You disconnect from the internet and read your emails offline.

<Callout icon="warning" title="The Multi-Device Nightmare">
  POP3 is an absolute nightmare if you own multiple devices. If you use POP3 on your laptop, the laptop downloads the emails and deletes them from the server. When you check your phone an hour later, your inbox is completely empty because the server has nothing left. **Always use IMAP on modern devices.**
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/NTP/index.mdx': `---
title: NTP (Network Time Protocol)
description: The critical infrastructure protocol used to keep the system clocks of millions of computers synchronized down to the millisecond.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NTP (Network Time Protocol)">

If the clock on your server is wrong by exactly 3 minutes, it doesn't sound like a big deal. 
In reality, a 3-minute clock skew will instantly destroy your entire infrastructure:
- **Cryptography fails**: TLS certificates and Kerberos authentication tokens are mathematically tied to timestamps. If the server thinks the token is from "the future", it will instantly reject the login.
- **Databases corrupt**: Distributed databases (like Cassandra or Spanner) rely on timestamps to figure out which data was written first. If the clocks are wrong, old data might accidentally overwrite new data.

To solve this, the internet relies on **NTP** (UDP Port 123).

## The Stratum Hierarchy

NTP relies on a hierarchical system of trust known as **Stratums**:
- **Stratum 0**: Not computers. These are physical Atomic Clocks, GPS satellites, and radio clocks. They represent absolute, flawless time.
- **Stratum 1**: Highly secure servers physically hardwired directly to Stratum 0 atomic clocks.
- **Stratum 2**: Public NTP servers (like TICK1pool.ntp.orgTICK1 or Google's TICK1time.google.comTICK1) that query the Stratum 1 servers over the internet.
- **Stratum 3**: Your company's internal router, which syncs from Stratum 2, and then provides time to your laptop (Stratum 4).

Because NTP operates over UDP, it constantly measures the network latency to the server, mathematically subtracting the latency to guarantee the clock is accurate to within a few milliseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SNMP/index.mdx': `---
title: SNMP (Simple Network Management Protocol)
description: The universal standard protocol used by administrators to monitor and configure routers, switches, and enterprise printers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SNMP (Simple Network Management Protocol)">

If you have 500 Cisco switches and 100 enterprise printers in a building, you need a centralized dashboard to know if a switch's CPU is overheating, or if a printer is out of cyan ink. 

You cannot use SSH to log into 600 devices manually. You use **SNMP** (UDP Ports 161/162).

## Architecture

SNMP consists of a central **Manager** (the monitoring dashboard) and **Agents** (software running on the switches/printers). 
The data they exchange is structured in a highly organized, hierarchical database called a **MIB** (Management Information Base), using standardized OIDs (Object Identifiers). 

For example, OID TICK11.3.6.1.2.1.2.2.1.10TICK1 universally means "Total Bytes Received on this Interface."

## The Evolution of SNMP Security

- **SNMPv1 / v2c**: Used a concept called a "Community String" (essentially a password like TICK1publicTICK1 or TICK1privateTICK1) to authenticate. However, these versions transmit the password and all data in **absolute plain text**. If a hacker sniffs the TICK1privateTICK1 community string, they can send a write command to completely erase the configuration of every router in the building.
- **SNMPv3**: The modern standard. It completely overhauls security, requiring strong cryptographic authentication (SHA) and full payload encryption (AES), ensuring hackers cannot sniff or modify the monitoring data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/gRPC over HTTP-2/index.mdx': `---
title: gRPC (over HTTP/2)
description: Google's ultra-fast, binary Remote Procedure Call framework that leverages HTTP/2 to outperform traditional REST APIs in microservice architectures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="gRPC (over HTTP/2)">

For a decade, microservices communicated using **REST APIs** over HTTP/1.1, transferring data using large, plain-text JSON payloads. While JSON is easy for humans to read, it is incredibly inefficient for computers to parse. 

Google invented **gRPC** to solve the massive latency issues in their internal datacenters. 

## Protocol Buffers (Protobuf)

Instead of using JSON, gRPC uses **Protocol Buffers**. 
You write a strict schema defining exactly what your data looks like. The gRPC compiler then generates native client code (in Python, Go, Java, etc.). 
When the Python microservice wants to send data, it doesn't build a massive JSON string. It serializes the data into a microscopic, highly compressed binary payload. 

## The HTTP/2 Requirement

gRPC strictly requires **HTTP/2**. It cannot run on HTTP/1.1.
Because it rides on HTTP/2, it inherits massive architectural benefits:
1. **Multiplexing**: Thousands of gRPC calls can happen simultaneously over a single TCP connection.
2. **Bi-Directional Streaming**: Unlike REST (which is strictly request/response), gRPC allows the server to stream a continuous flow of thousands of binary updates back to the client in real-time.

<Callout icon="warning" title="The Browser Limitation">
  Because gRPC requires deep, low-level access to HTTP/2 frames, web browsers cannot use pure gRPC directly (Javascript does not have the required APIs). To use gRPC from a React frontend, you must use a proxy translation layer called **gRPC-Web**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/MQTT/index.mdx': `---
title: MQTT (Message Queuing Telemetry Transport)
description: An extremely lightweight, publish-subscribe messaging protocol designed specifically for IoT devices with terrible battery life and horrible internet connections.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MQTT (Message Queuing Telemetry Transport)">

If you have a smart-farm soil sensor running on a tiny solar panel, attempting to transmit data over a 2G cellular network with 80% packet loss, you cannot use HTTP. Setting up a TCP handshake, TLS encryption, and sending massive HTTP headers will instantly drain the battery and fail due to latency.

You use **MQTT**. It is the undisputed king of IoT (Internet of Things) communication.

## The Publish-Subscribe Architecture

MQTT does not use client-server API endpoints. It uses a **Broker**.
- The soil sensor **Publishes** a tiny message to a "Topic" on the Broker: TICK1farm/field1/moisture = 45%TICK1
- The farmer's dashboard app **Subscribes** to TICK1farm/#TICK1. 
- The moment the broker receives the tiny message from the sensor, it instantly pushes it to the farmer's dashboard.

## Why it Dominates IoT
1. **Microscopic Footprint**: The MQTT header is only **2 bytes** long (compared to HTTP's hundreds of bytes).
2. **Quality of Service (QoS)**: MQTT allows the sensor to choose exactly how reliable the network needs to be. 
   - **QoS 0**: "Fire and forget." (If the network drops it, whatever).
   - **QoS 1**: "Guarantee it arrives at least once."
   - **QoS 2**: "Mathematically guarantee it arrives exactly once."
3. **Last Will and Testament**: If the battery on the sensor dies, it stops pinging the Broker. The Broker realizes the connection dropped and instantly broadcasts a "Last Will" message to the farmer's dashboard warning that the sensor has died.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/CoAP/index.mdx': `---
title: CoAP (Constrained Application Protocol)
description: A specialized internet protocol designed to translate the familiar architecture of HTTP/REST into ultra-lightweight UDP packets for constrained IoT devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CoAP (Constrained Application Protocol)">

While MQTT is perfect for Publish-Subscribe telemetry, many developers prefer the traditional REST API architecture (GET, POST, PUT, DELETE). 
However, running a full HTTP web server on a smart lightbulb with 32KB of RAM is impossible.

**CoAP** was designed to solve this. It provides the exact same REST architecture as HTTP, but it has been heavily optimized for constrained microcontrollers.

## The Shift to UDP

The biggest difference between HTTP and CoAP is that **CoAP runs on UDP**, not TCP.
By abandoning the heavy TCP 3-way handshake and continuous connection tracking, the smart lightbulb can sleep for 23 hours, wake up, blast a single 4-byte UDP CoAP packet containing a TICK1POSTTICK1 request, and instantly go back to sleep to save battery.

## Features Built for IoT
1. **Confirmable Messages**: Because UDP is unreliable, CoAP implements its own tiny acknowledgment system (similar to MQTT QoS 1). The client can flag a packet as "Confirmable", forcing the server to send an ACK back.
2. **Observe**: In standard HTTP, if a client wants to know if a temperature changed, it has to poll the server every 5 seconds. CoAP introduced the TICK1ObserveTICK1 flag. The client says "Observe this URL." The server then holds the relationship and proactively pushes UDP packets to the client only when the temperature actually changes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Firewalls/index.mdx': `---
title: Firewalls
description: The critical security appliances that sit at the perimeter of a network, mathematically analyzing and blocking malicious traffic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Firewalls">

A **Firewall** is the bouncer at the door of your network. It inspects every single packet attempting to enter or leave, comparing it against a strict list of rules (Access Control Lists - ACLs) to decide whether to Allow or Drop the traffic.

## The Evolution of Firewalls

### 1. Packet Filtering (Stateless)
The earliest firewalls simply looked at Layer 3 and Layer 4 headers. 
Rule: *"Drop all packets from IP 1.2.3.4"* or *"Drop all traffic to Port 22"*.
They were incredibly fast but very stupid. They had no memory. They could easily be bypassed by hackers crafting fake packets.

### 2. Stateful Packet Inspection (SPI)
Modern standard firewalls (like TICK1iptablesTICK1 or TICK1ufwTICK1) are **Stateful**. They possess RAM and track the "State" of every connection. 
If your laptop inside the network reaches out to Google on Port 443, the firewall dynamically memorizes that outbound request. When Google replies 10 milliseconds later, the firewall checks its RAM, sees that your laptop explicitly requested the data, and allows it through. All unsolicited incoming traffic is dropped by default.

### 3. Next-Generation Firewalls (NGFW)
Hackers realized they couldn't bypass the firewall on Port 22, so they started sending viruses through Port 443 (HTTPS), which the firewall was forced to leave open for web browsing.
**NGFWs** (like Palo Alto or Fortinet) operate at **Layer 7**. They don't just look at IP addresses; they actually decrypt the HTTPS traffic in real-time, scan the payload for malware signatures, analyze the behavior, and re-encrypt it before passing it to the user.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Proxies/index.mdx': `---
title: Forward Proxies
description: Intermediary servers that sit inside a corporate network, intercepting outbound employee traffic to provide security, caching, and content filtering.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Forward Proxies">

In a standard home network, your laptop talks directly to the internet. 
In a high-security corporate environment, employee laptops are legally banned from touching the internet. Instead, they must route all their requests through a **Forward Proxy**.

## How a Forward Proxy Works

1. **The Request**: An employee opens Chrome and types TICK1reddit.comTICK1.
2. **The Interception**: The laptop does not connect to Reddit. It connects to the Corporate Proxy Server and says, *"Please fetch reddit.com for me."*
3. **The Proxy Action**: The Proxy Server, acting as a middleman, connects to Reddit, downloads the webpage, and hands it back to the employee.

Reddit never sees the employee's IP address. It only sees the Proxy Server's IP address.

## Why Enterprises Use Them

- **Content Filtering**: The Proxy checks the requested URL against a master database. If the URL is flagged as "Social Media" or "Malware," the Proxy instantly returns an Access Denied page to the employee.
- **Caching**: If 500 employees all load the exact same 100MB Windows Update file at 9:00 AM, the Proxy downloads the file *once* from Microsoft, stores it in its local RAM, and instantly serves the cached copy to the other 499 employees, saving 50GB of internet bandwidth.

<Callout icon="warning" title="SSL/TLS Inspection">
  Because 95% of the internet is encrypted (HTTPS), Proxies cannot see what URLs the employees are visiting. To fix this, corporations forcefully install a custom Root Certificate onto every employee laptop. This allows the Proxy to perform an authorized Man-In-The-Middle attack, intercepting and decrypting all employee HTTPS traffic (including banking passwords) in real-time before re-encrypting it and sending it to the destination.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Reverse proxies/index.mdx': `---
title: Reverse Proxies
description: The critical architecture where a proxy sits in front of a web server, protecting it from the public internet while providing TLS termination and load balancing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reverse Proxies">

A Forward Proxy protects the *Client* from the internet. 
A **Reverse Proxy** protects the *Server* from the internet.

You should never expose a raw Node.js or Python application directly to the open internet (Port 80/443). They are not designed to handle massive DDoS attacks or slow, malicious client connections. 
Instead, you place a highly optimized Reverse Proxy (like **Nginx** or **HAProxy**) in front of them.

## The Architecture

1. A user attempts to connect to your website. 
2. They do not hit your Python app. They hit the Nginx Reverse Proxy.
3. Nginx analyzes the HTTP request, ensures it is not malicious, and then silently forwards the request to the Python app running safely on an internal Private IP (e.g., TICK1localhost:3000TICK1).
4. Python processes the data, hands it back to Nginx, and Nginx delivers it to the user.

## Core Responsibilities

- **TLS Termination**: Managing SSL/TLS certificates and encrypting traffic requires heavy CPU math. The Reverse Proxy handles 100% of the cryptographic math (TLS Termination), sending the decrypted, plain-text request to the internal Python app. This frees up the Python app to focus purely on business logic.
- **Static Asset Serving**: Python is slow at reading images off a hard drive. Nginx is written in C and can serve images 50x faster. The Reverse Proxy is configured to instantly serve all TICK1.jpgTICK1 and TICK1.cssTICK1 files directly from its own cache, completely bypassing the backend application.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Load balancing (L4-L7)/index.mdx': `---
title: Load Balancing (L4 vs L7)
description: The architecture used to distribute massive amounts of incoming internet traffic evenly across a fleet of backend servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Load Balancing (L4 vs L7)">

If Amazon has 10 million users logging in on Black Friday, a single server will instantly melt down. They need 5,000 servers. But how do you distribute the users evenly across 5,000 servers when there is only one domain name (TICK1amazon.comTICK1)?

You use a **Load Balancer**. It sits at the edge of the network, receives all incoming traffic, and mathematically distributes it to the backend servers using algorithms like Round-Robin or Least-Connections.

## Layer 4 Load Balancing (Network)

A **Layer 4 (L4)** Load Balancer operates strictly at the Transport layer (TCP/UDP). 
- It only looks at the Source IP, Destination IP, and Ports. 
- It does **not** look at the HTTP payload. 
- Because it is blind to the content, it requires virtually zero CPU power and can route millions of packets per second with microscopic latency. It simply acts as a high-speed traffic cop.

## Layer 7 Load Balancing (Application)

A **Layer 7 (L7)** Load Balancer (often an Nginx Reverse Proxy) operates at the Application layer.
- It fully terminates the TLS connection and reads the actual HTTP headers and JSON payload.
- Because it can read the HTTP request, it can make highly intelligent routing decisions.
- **Example**: If the HTTP URL contains TICK1/api/video/TICK1, the L7 balancer routes the traffic to the massive GPU video-processing servers. If the URL contains TICK1/api/login/TICK1, it routes the traffic to the highly secure authentication servers.

<Callout icon="success" title="Health Checks">
  A critical feature of any Load Balancer is Health Checking. The Load Balancer constantly pings the backend servers every 5 seconds. If Server #3 crashes and stops responding, the Load Balancer instantly removes it from the rotation, ensuring no users are routed to a dead server.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/VPN (IPsec, OpenVPN, WireGuard)/index.mdx': `---
title: VPN (IPsec, OpenVPN, WireGuard)
description: Technologies used to create mathematically encrypted, private network tunnels directly through the hostile, public internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="VPN (IPsec, OpenVPN, WireGuard)">

A **VPN (Virtual Private Network)** allows you to create a secure, encrypted tunnel across the public internet. 
For example, if you are sitting in a Starbucks in New York, a VPN allows your laptop to securely tunnel into your corporate office in London. Your laptop receives a London Private IP address, and it behaves exactly as if you were physically plugged into the switch in the London office.

## The Big Three Protocols

There are three major VPN protocols used in modern infrastructure:

### 1. IPsec (Internet Protocol Security)
Built directly into the Linux Kernel, **IPsec** is the absolute enterprise standard for **Site-to-Site VPNs**. If you need to permanently connect an entire office building in Tokyo to an office building in Berlin, the two routers will use IPsec. It operates strictly at Layer 3. It is incredibly fast, but notoriously difficult to configure, requiring massive amounts of complex cryptographic negotiation (IKEv2).

### 2. OpenVPN
For decades, **OpenVPN** was the standard for **Client-to-Site** VPNs (e.g., a single employee logging into the office). It operates in "User Space" (Layer 7) and uses standard TLS/SSL for encryption. Because it can run on TCP Port 443, it perfectly mimics standard HTTPS web traffic, making it incredibly easy to punch through strict corporate firewalls. However, because it runs in User Space, it is notoriously slow and CPU-heavy.

### 3. WireGuard
**WireGuard** is the modern revolution. Added directly into the Linux Kernel in 2020, it is a devastatingly simple, ultra-fast VPN protocol. 
While OpenVPN has 100,000+ lines of bloated C code, WireGuard has roughly 4,000. It abandons all legacy cryptographic algorithms in favor of a single, highly optimized, state-of-the-art math cipher (ChaCha20). It is significantly faster than OpenVPN, consumes barely any battery on mobile devices, and connects instantly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Anycast/index.mdx': `---
title: Anycast Routing
description: A brilliant BGP routing methodology where a single IP address is shared simultaneously by hundreds of servers distributed across the globe.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Anycast Routing">

In traditional networking (Unicast), exactly one IP address belongs to exactly one server in one physical location. 

**Anycast** breaks this rule entirely. With Anycast, you can deploy 100 identical servers across 100 different countries, and assign **the exact same Public IP address to all 100 of them.**

## How It Works (BGP Magic)

If 100 servers all have the IP TICK18.8.8.8TICK1, how does the internet know where to send your packet? 

Anycast relies on **BGP (Border Gateway Protocol)**. All 100 servers broadcast a BGP route to the global internet, claiming they own TICK18.8.8.8TICK1. 
When your laptop in Tokyo sends a packet to TICK18.8.8.8TICK1, the BGP routers on the internet calculate the mathematically shortest path. The routers automatically send your packet to the server in Tokyo, completely ignoring the other 99 servers. 
When a user in London pings TICK18.8.8.8TICK1, their routers automatically send the packet to the server in London.

## The Ultimate DDoS Defense

Anycast is the primary technology used by CDNs (like Cloudflare) and Root DNS servers to survive massive DDoS attacks. 
If a massive botnet of hacked IoT cameras in Asia launches a 500 Gbps attack against an Anycast IP, the BGP routing protocol naturally traps all the malicious Asian traffic and forces it to hit the Asian servers. The servers in Europe and America remain completely untouched and online, effectively slicing the massive global DDoS attack into tiny, localized, manageable pieces.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/CDNs/index.mdx': `---
title: CDNs (Content Delivery Networks)
description: Massive, globally distributed networks of proxy servers designed to physically cache heavy content as close to the end user as mathematically possible.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CDNs (Content Delivery Networks)">

If your primary web server is physically located in New York, users in New York will experience blazing fast 10ms loading times. 
However, users in Sydney, Australia will experience terrible 250ms loading times, because the light literally has to travel through fiber optic cables across the Pacific Ocean.

You cannot defeat the speed of light. You must move the data closer to the user. You use a **CDN (Content Delivery Network)** like Cloudflare, Akamai, or AWS CloudFront.

## The Edge Cache Architecture

A CDN company deploys thousands of highly optimized "Edge Servers" in every major city on Earth.

1. You point your DNS records to the CDN, not your actual server.
2. An Australian user requests your website. The Anycast routing protocol sends their request to the CDN Edge Server located in Sydney.
3. The Sydney server checks its RAM. It doesn't have the files, so it reaches across the ocean to your New York server, downloads the massive 5MB hero image, and saves a copy to its local RAM.
4. When the *next* 10,000 Australian users request your website, the Sydney CDN server instantly serves the 5MB image directly from its local RAM. 

## The Benefits
- **Extreme Speed**: The heavy images and videos are served locally, providing instant load times globally.
- **Cost Reduction**: You pay your cloud provider for outgoing bandwidth. If the CDN serves 95% of your traffic directly from its cache, your New York server never even sees the traffic, drastically reducing your AWS bandwidth bill.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/DNSSEC/index.mdx': `---
title: DNSSEC (DNS Security Extensions)
description: A suite of cryptographic extensions designed to prevent hackers from hijacking DNS requests and silently redirecting traffic to malicious servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNSSEC (DNS Security Extensions)">

The original DNS protocol invented in 1983 had absolutely zero security. 

If you ask your ISP's DNS resolver, *"What is the IP for bank.com?"*, a hacker sitting in the same coffee shop can rapidly blast a fake UDP response to your computer claiming, *"The IP for bank.com is 6.6.6.6 (The Hacker's Server)."*
Your computer blindly trusts the first answer it receives, overwrites its DNS cache, and routes all your banking traffic to the hacker. This is called **DNS Cache Poisoning**.

## The Cryptographic Fix

To fix this, the internet implemented **DNSSEC**. 
DNSSEC does not encrypt the DNS request (that is what DoH - DNS over HTTPS does). Instead, DNSSEC provides **Cryptographic Authentication**.

When the owner of TICK1bank.comTICK1 sets up their DNS zone, they use Asymmetric Cryptography to digitally sign every single A-Record and MX-Record using a Private Key. 

When your computer queries the DNS server, the server returns the IP address *and* the cryptographic signature. Your computer uses the public key (which is verified by the Top Level Domain TICK1.comTICK1 servers in a Chain of Trust) to verify the signature. 
If a hacker attempts to inject a fake IP address, they cannot forge the cryptographic signature. Your computer will instantly realize the DNS response is a forgery and drop it, completely neutralizing Cache Poisoning attacks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/MPLS/index.mdx': `---
title: MPLS (Multiprotocol Label Switching)
description: A highly reliable, enterprise-grade telecommunications routing technique that uses shortest-path labels rather than long IP network addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MPLS (Multiprotocol Label Switching)">

In standard IP routing, every single time a packet hits a router, the router must stop, open the IP header, look at the Destination IP, query its massive BGP routing table (which contains a million entries), and calculate the next hop. This CPU-heavy lookup occurs at every single router across the globe.

To speed this up for massive corporate networks, telecoms invented **MPLS**.

## Layer 2.5 (The Label Header)

MPLS operates between Layer 2 (Data Link) and Layer 3 (Network). 

When a packet enters an MPLS network (from a corporate office), the first router injects a tiny, simple **Label** into the packet.
As the packet traverses the telecom provider's backbone, the internal routers completely ignore the complex IP address. They only look at the simple Label. 
The routers maintain microscopic "Label Forwarding Tables" that tell them exactly which physical port to blast the packet out of. 

## The Quality of Service (QoS) Benefit
While standard IP routing is faster today than it was in the 90s, MPLS remains popular because it provides flawless **Quality of Service (QoS)**. 
Because the telecom controls the physical MPLS backbone, they can mathematically guarantee that your encrypted VoIP phone calls (Label A) are prioritized over employee Netflix traffic (Label B), guaranteeing zero jitter or latency across continents.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Software-Defined Networking (SDN)/index.mdx': `---
title: SDN (Software-Defined Networking)
description: The paradigm shift that separates the network's intelligent control logic from the underlying physical hardware, allowing entire datacenters to be programmed via API.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SDN (Software-Defined Networking)">

Historically, if a datacenter had 500 physical Cisco switches, the "brains" (the routing logic and ACL rules) were permanently locked inside the silicon of each individual switch. If an architect wanted to deploy a new VLAN, a network engineer had to manually SSH into 500 different switches and type commands into the CLI. This took weeks and was prone to human error.

**Software-Defined Networking (SDN)** completely destroyed this architecture.

## The Decoupling of Planes

SDN forcibly separates the router into two distinct planes:
1. **The Data Plane (The Muscle)**: The physical switch hardware. Its only job is to move packets from Port 1 to Port 2 as fast as physically possible. It has zero intelligence.
2. **The Control Plane (The Brains)**: The intelligence is ripped out of the switches and centralized into a single, massive **SDN Controller** (a software application running on a central server).

## Programmable Infrastructure
Because the brains are centralized in software, the network can now be programmed. 
If an AWS customer clicks "Create VPC" in the web dashboard, the AWS SDN Controller instantly compiles the rules and pushes them down to the physical switches across the datacenter via an API (like OpenFlow) in milliseconds. 

The entire physical network infrastructure becomes agile, programmable, and capable of instantly reconfiguring itself based on software triggers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Network Function Virtualization (NFV)/index.mdx': `---
title: NFV (Network Function Virtualization)
description: The industry initiative to replace expensive, proprietary hardware appliances (like physical firewalls and load balancers) with software running on standard commodity servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NFV (Network Function Virtualization)">

While SDN (Software-Defined Networking) focuses on centralizing the *routing* logic of switches, **NFV (Network Function Virtualization)** focuses on virtualizing *expensive network appliances*.

Historically, if a company needed a Firewall, a Load Balancer, and an Intrusion Detection System (IDS), they had to buy three massive, proprietary, incredibly expensive hardware boxes from vendors like Cisco or F5, and bolt them into a server rack.

## The Shift to Software

NFV eliminates the proprietary hardware. 

Instead of buying a $50,000 physical Firewall box, a company buys a standard, cheap Dell x86 server (commodity hardware) running Linux. They then deploy the Firewall as a **Virtual Machine (VM) or Docker Container** (known as a VNF - Virtual Network Function).

## Extreme Elasticity
Because network appliances are now just software containers, they can be scaled dynamically. 
If a massive DDoS attack hits the network, the virtualization hypervisor can automatically spin up 10 additional Firewall VMs in seconds to absorb the traffic, and then delete them when the attack ends. This elasticity is the fundamental technology that makes modern Cloud Computing (AWS/Azure) possible.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    // This entirely avoids JSON/regex parsing issues.
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
