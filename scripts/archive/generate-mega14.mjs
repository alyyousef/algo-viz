import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/OSI model/index.mdx': `---
title: The OSI Model
description: The conceptual 7-layer framework that standardized global telecommunications and network architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The OSI Model">

Before the **Open Systems Interconnection (OSI) Model** was published in 1984, computer networks were entirely proprietary. An IBM computer physically could not talk to an Apple computer. The OSI Model solved this by mathematically slicing networking into 7 distinct, abstract layers. 

## The 7 Layers (Top to Bottom)

<ComparisonTable 
  headers={['Layer', 'Name', 'Function & Protocols']} 
  rows={[
    ['7', 'Application', 'End-user layer. Where the software operates. (HTTP, FTP, SMTP, DNS)'],
    ['6', 'Presentation', 'Translates, encrypts, and compresses data. (TLS/SSL, ASCII, JPEG)'],
    ['5', 'Session', 'Establishes, manages, and terminates connections between applications. (NetBIOS)'],
    ['4', 'Transport', 'Reliable data transfer, segmentation, and error checking. (TCP, UDP)'],
    ['3', 'Network', 'Logical addressing and routing packets across the internet. (IP, ICMP, IPSec)'],
    ['2', 'Data Link', 'Physical MAC addressing and framing across a local area network (LAN). (Ethernet, Switches)'],
    ['1', 'Physical', 'The actual physical hardware transmitting raw 0s and 1s over cables/radio. (Cables, Hubs, Wi-Fi)']
  ]} 
/>

## Encapsulation
When you send an email, the data starts at Layer 7 and travels **down** the stack. 
As it passes through each layer, that layer attaches its own mathematical metadata (a header) to the payload. 
- At Layer 4, the data becomes a **Segment**.
- At Layer 3, it becomes a **Packet** (adding IP addresses).
- At Layer 2, it becomes a **Frame** (adding MAC addresses).
- At Layer 1, it is converted into raw **Bits** (electrical voltages).

When the receiving computer gets the Bits, it performs **De-encapsulation**, traveling **up** the stack, stripping the headers one by one until the raw email hits Layer 7.

<Callout icon="info" title="Is the OSI Model actually used?">
Strictly speaking, the modern internet does **not** use the OSI model; it uses the simpler 4-layer TCP/IP model. However, the OSI model is the universal language of Network Engineering. If an engineer says "We have a Layer 3 problem," they universally mean a routing/IP issue.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP-IP model/index.mdx': `---
title: The TCP/IP Model
description: The practical, 4-layer architecture that actually powers the modern global internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="The TCP/IP Model">

While the OSI model is a beautiful theoretical framework, it was over-engineered. The United States Department of Defense (DoD) funded the ARPANET project, which resulted in the **TCP/IP Model**—a leaner, meaner, 4-layer stack that physically powers the modern internet.

## The 4 Layers

The TCP/IP model mathematically collapses the 7 OSI layers into 4 highly practical layers.

<ComparisonTable 
  headers={['TCP/IP Layer', 'Equivalent OSI Layers', 'Function & Protocols']} 
  rows={[
    ['4. Application', 'Application (7), Presentation (6), Session (5)', 'Handles all high-level software protocols. Data formatting and encryption happen natively here. (HTTP, HTTPS, SSH, FTP, DNS)'],
    ['3. Transport', 'Transport (4)', 'Provides end-to-end communication control. Dictates if the connection needs to be highly reliable (TCP) or blazing fast (UDP).'],
    ['2. Internet', 'Network (3)', 'Handles logical addressing and routing. Ensures packets can navigate across thousands of routers to reach a destination on the other side of the planet. (IPv4, IPv6, ICMP)'],
    ['1. Network Access', 'Data Link (2), Physical (1)', 'Handles the physical hardware and local network frames. (Ethernet cables, MAC addresses, Wi-Fi waves).']
  ]} 
/>

## Why did TCP/IP win?
In the 1980s, the "Protocol Wars" raged between the OSI model and TCP/IP. 
OSI was heavily backed by European telecoms and government bureaucracies, resulting in sluggish standard development. 
TCP/IP was backed by UNIX researchers. It was lightweight, open-source, and crucially, **it actually worked**. The internet organically adopted TCP/IP because developers could immediately build real applications on it, completely killing the OSI protocol suite.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP/index.mdx': `---
title: Transmission Control Protocol (TCP)
description: The foundational protocol of the internet that guarantees perfect, ordered delivery of data via the Three-Way Handshake.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Transmission Control Protocol (TCP)">

When you download a 5GB video game or load a webpage, you cannot afford a single missing byte. The **Transmission Control Protocol (TCP)** operates at Layer 4 (Transport) and mathematically guarantees that every single bit of data is delivered perfectly, and in the correct order.

## 1. The Three-Way Handshake
TCP is a **Connection-Oriented** protocol. Before Alice can send a single byte of actual data to Bob, their computers must mathematically establish a stateful connection via a 3-step ritual:

1. **SYN (Synchronize)**: Alice sends a packet to Bob with the TICK1SYNTICK1 flag set to 1, and a random initial Sequence Number (e.g., 5000). She is asking, *"Can we talk?"*
2. **SYN-ACK (Synchronize-Acknowledge)**: Bob receives the SYN. He replies with a packet where both TICK1SYNTICK1 and TICK1ACKTICK1 flags are set. He acknowledges Alice's sequence number (5001) and provides his own random Sequence Number (e.g., 9000). He says, *"Yes, I hear you, can you hear me?"*
3. **ACK (Acknowledge)**: Alice receives the SYN-ACK. She replies with an TICK1ACKTICK1 packet acknowledging Bob's sequence number (9001). The connection is now mathematically established.

## 2. Guaranteed Delivery & Ordering
The internet is a chaotic place. When Alice sends a 10MB image, TCP chops it into thousands of tiny Segments. These segments might take completely different physical paths across the planet. 

- **Ordering**: TCP mathematically assigns a **Sequence Number** to every segment. If Segment 4 arrives before Segment 2, Bob's TCP stack holds Segment 4 in a RAM buffer and waits, mathematically reassembling them in perfect order before handing them to the Application Layer.
- **Retransmission**: When Bob receives Segment 1, he mathematically sends an **ACK** back to Alice. If Alice does not receive an ACK within a specific mathematical timeout (RTO), she assumes the packet was destroyed by a router and aggressively resends it.

## 3. Congestion Control
TCP is mathematically polite. If a server blasts data at 10 Gigabits per second, but the client is on a 3G mobile phone, the packets will instantly drop. 
TCP uses a **Sliding Window** protocol. Bob dynamically tells Alice exactly how many bytes he can handle in his current RAM buffer. Alice mathematically throttles her transmission speed to perfectly match Bob's capacity, preventing network collapse.

<Callout icon="warning" title="The Cost of Reliability">
The mathematical overhead of TCP is massive. The 3-way handshake adds huge latency before the first byte of actual data is even sent (head-of-line blocking). Furthermore, the 20-byte TCP header is heavy. This makes TCP completely useless for real-time multiplayer video games or Zoom calls.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/UDP/index.mdx': `---
title: User Datagram Protocol (UDP)
description: The blazing-fast, connectionless alternative to TCP, where raw speed is prioritized over guaranteed delivery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="User Datagram Protocol (UDP)">

While TCP is a meticulous librarian ensuring every page of a book arrives perfectly, the **User Datagram Protocol (UDP)** is a firehose. It operates at Layer 4 (Transport) and mathematically prioritizes absolute speed and minimal latency above all else.

## 1. Fire and Forget (Connectionless)
UDP completely eliminates the mathematical overhead of TCP. 
There is **no Three-Way Handshake**. If Alice wants to send data to Bob via UDP, she simply constructs the packet and blasts it onto the internet. 

Because it is connectionless, UDP has zero concept of state. 
- It does **not** track Sequence Numbers.
- It does **not** wait for ACKs (Acknowledgments).
- If a packet hits a congested router and is deleted, UDP mathematically doesn't care. It will never retransmit the packet.

## 2. The Minimal Header
Because it strips out congestion control, sliding windows, and sequence tracking, the mathematical footprint of UDP is tiny. 
While a TCP header is 20 bytes (and highly complex to process), a UDP header is exactly **8 bytes**:
- Source Port (16 bits)
- Destination Port (16 bits)
- Length (16 bits)
- Checksum (16 bits)

## 3. Why Use UDP?

<ComparisonTable 
  headers={['Use Case', 'Why TCP Fails', 'Why UDP Excels']} 
  rows={[
    ['Multiplayer Gaming (FPS)', 'If packet 4 is dropped, TCP halts packet 5 and 6 (Head-of-Line Blocking) while it retransmits 4. By the time packet 4 arrives 100ms later, the player has already moved, rendering the data mathematically useless. This causes severe lag.', 'UDP simply drops packet 4 and immediately processes packet 5. The player models might jitter for 1 frame, but the game remains perfectly real-time.'],
    ['Video Streaming (Twitch/Zoom)', 'Retransmitting a lost video frame 500ms later causes the stream to violently freeze and buffer.', 'UDP drops the frame. The video might display a minor visual glitch (artifacting) for a fraction of a second, but the audio and stream continue uninterrupted.'],
    ['DNS Lookups', 'Setting up a 3-way handshake just to ask for a single IP address adds massive, unnecessary latency.', 'UDP blasts a single packet asking for the IP, and receives a single packet back instantly.']
  ]} 
/>

<Callout icon="tip" title="Modern Protocols (QUIC / HTTP/3)">
For 30 years, HTTP strictly used TCP. However, Google mathematically realized that TCP's head-of-line blocking was a catastrophic bottleneck for modern web speeds. They invented **QUIC (HTTP/3)**, which shockingly abandons TCP entirely. HTTP/3 runs on **UDP**, implementing its own highly-optimized, multiplexed congestion control purely in the application layer.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IP/index.mdx': `---
title: Internet Protocol (IP)
description: The mathematical addressing system that binds the entire global internet, allowing packets to route across thousands of disconnected networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Internet Protocol (IP)">

Operating at Layer 3 (Network), the **Internet Protocol (IP)** is the primary architectural foundation of the internet. Its sole mathematical purpose is to provide logical addressing and to route individual packets across a chaotic web of millions of independent routers.

## 1. Logical Addressing
At Layer 2, devices communicate using hardcoded MAC addresses. However, a MAC address is mathematically flat; it provides absolutely zero geographical or topological information (like a Social Security Number). You cannot use MAC addresses to route traffic across the globe.

IP Addresses are **Logical** and **Hierarchical** (like a Zip Code). They mathematically define exactly where in the global network topology a device resides.

## 2. IPv4 vs IPv6

The internet originally ran on **IPv4**, which uses 32-bit mathematical addresses (e.g., TICK1192.168.1.1TICK1). 
A 32-bit space mathematically yields exactly TICK12^32TICK1 (4.3 billion) unique addresses. In the 1980s, this seemed infinite. By 2011, the world officially ran out of IPv4 addresses.

To save the internet, engineers deployed **IPv6**, which uses massive 128-bit mathematical addresses (e.g., TICK12001:0db8:85a3:0000:0000:8a2e:0370:7334TICK1). 
A 128-bit space yields TICK12^128TICK1 addresses. This is a number so mathematically incomprehensible that we could assign an IP address to every single atom on the surface of the Earth, and still have enough addresses left for a trillion other planets.

<ComparisonTable 
  headers={['Feature', 'IPv4', 'IPv6']} 
  rows={[
    ['Address Length', '32 bits (4.3 billion addresses)', '128 bits (340 undecillion addresses)'],
    ['Format', 'Dotted Decimal (192.168.1.1)', 'Hexadecimal (2001:db8::ff00:42:8329)'],
    ['Header Size', 'Variable (20-60 bytes)', 'Fixed (40 bytes), heavily optimized for routers.'],
    ['NAT (Network Address Translation)', 'Absolutely critical to share public IPs and delay exhaustion.', 'Mathematically obsolete. Every device gets a true Public IP.']
  ]} 
/>

## 3. Best-Effort Delivery
It is critical to understand that IP is a **Connectionless, Best-Effort** protocol.
IP does absolutely nothing to guarantee that a packet actually arrives. It does not retransmit lost packets, and it does not care if packets arrive completely out of order. 
It relies entirely on Layer 4 (TCP) to handle reliability and error-checking. The IP protocol's only job is to look at the destination IP address, look at its local routing table, and throw the packet out the correct physical port toward the next hop.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DNS (Records, Resolution, Zones)/index.mdx': `---
title: Domain Name System (DNS)
description: The decentralized global phonebook of the internet, mapping human-readable domain names to mathematical IP addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Domain Name System (DNS)">

Computers exclusively communicate using mathematical IP addresses (e.g., TICK1142.250.190.46TICK1). Humans cannot memorize billions of IP addresses. The **Domain Name System (DNS)** was invented to map human-readable names (TICK1google.comTICK1) to machine-readable IPs.

## 1. The Recursive Resolution Process
When you type TICK1www.example.comTICK1 into your browser, an incredibly complex, globally decentralized query process occurs in milliseconds:

1. **Local Cache / OS**: The browser checks its local cache. If missing, it checks the OS cache.
2. **Recursive Resolver**: The OS queries a Recursive DNS Server (usually provided by your ISP or Google's TICK18.8.8.8TICK1). The Resolver's job is to hunt down the IP.
3. **Root Nameservers**: The Resolver queries one of the 13 mathematical Root Servers globally. The Root server says, *"I don't know the IP, but I know who handles the TICK1.comTICK1 domains."*
4. **TLD Nameservers**: The Resolver queries the Top-Level Domain (TLD) server for TICK1.comTICK1. The TLD server says, *"I don't know the IP, but I know the specific authoritative server for TICK1example.comTICK1."*
5. **Authoritative Nameserver**: The Resolver queries the final Authoritative server (e.g., hosted on AWS Route53). This server holds the actual mathematical record and returns TICK193.184.216.34TICK1.
6. The Resolver hands the IP back to your browser, and the HTTP request begins.

## 2. Common DNS Record Types

<ComparisonTable 
  headers={['Record Type', 'Function', 'Example Target']} 
  rows={[
    ['A (Address)', 'Maps a domain name directly to an IPv4 address.', '192.168.1.50'],
    ['AAAA (Quad-A)', 'Maps a domain name directly to an IPv6 address.', '2001:db8::1'],
    ['CNAME (Canonical Name)', 'Maps a domain name to another domain name (an alias). Cannot be placed at the root apex (example.com).', 'www.example.com -> myapp.herokuapp.com'],
    ['MX (Mail Exchange)', 'Directs email to a specific mail server for the domain.', 'mail.google.com'],
    ['TXT (Text)', 'Stores arbitrary text data. Critically used for security verification (SPF, DKIM, DMARC, SSL validation).', 'v=spf1 include:_spf.google.com ~all']
  ]} 
/>

## 3. DNS Zones
A **DNS Zone** is a contiguous portion of the global domain name space for which administrative responsibility has been delegated to a single manager. For instance, you might own the zone for TICK1example.comTICK1, allowing you to mathematically create infinite subdomains (TICK1api.example.comTICK1, TICK1dev.example.comTICK1) within your authoritative zone file.

<Callout icon="warning" title="Security and Latency">
DNS traditionally runs on UDP port 53 in **plaintext**. This means ISPs and hackers on public Wi-Fi can mathematically observe exactly what websites you visit, even if the actual website traffic is encrypted via HTTPS. Modern web architectures are aggressively adopting **DNS over HTTPS (DoH)** to mathematically encrypt the DNS queries themselves, closing this massive privacy loophole.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ARP/index.mdx': `---
title: Address Resolution Protocol (ARP)
description: The critical Layer 2 / Layer 3 glue that mathematically maps a logical IP address to a physical hardware MAC address on a local network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Address Resolution Protocol (ARP)">

When your computer wants to send data across the internet to Google, it relies on IP routing (Layer 3). But when your computer wants to send a packet to your actual home router (the default gateway sitting 10 feet away), it MUST use Layer 2 Ethernet Frames. 

Ethernet Frames require a physical **MAC Address**. 
You know your router's IP address (TICK1192.168.1.1TICK1), but your network card mathematically cannot build the Ethernet Frame because it doesn't know the router's physical MAC address. **ARP solves this exact problem.**

## 1. The ARP Broadcast
**ARP (Address Resolution Protocol)** acts as the mathematical translator between Layer 3 (IP) and Layer 2 (MAC).

1. **The Question (ARP Request)**: Your computer mathematically generates an ARP Request packet saying: *"Who has IP TICK1192.168.1.1TICK1? Tell TICK1192.168.1.50TICK1."*
2. **The Broadcast**: It sends this request to the special MAC Broadcast Address (TICK1FF:FF:FF:FF:FF:FFTICK1). The network switch physically duplicates this frame and blasts it out to every single device on the local network.
3. **The Answer (ARP Reply)**: Every device receives the broadcast. Your printer sees it and ignores it (wrong IP). Your router sees it, confirms the IP matches its own, and mathematically generates an ARP Reply: *"I have TICK1192.168.1.1TICK1! My MAC address is TICK100:1A:2B:3C:4D:5ETICK1."* This reply is sent directly (unicast) back to your computer.

## 2. The ARP Cache
Because broadcasting to the entire network is computationally loud and wastes bandwidth, operating systems aggressively cache the results. 
Once your computer learns the router's MAC address, it stores the mapping in its local RAM **ARP Cache** (or ARP Table). For the next few minutes, it can mathematically generate Ethernet frames instantly without needing to broadcast.

<Callout icon="warning" title="ARP Spoofing (Poisoning)">
ARP was designed in the 1980s and has absolutely zero built-in security or cryptographic authentication. 
If a hacker is on the same Starbucks Wi-Fi as you, they can aggressively spam the network with fake ARP Replies saying, *"I am the Router, my MAC is [Hacker's MAC]."* 
Your computer's ARP cache is mathematically poisoned, and it begins sending all of its internet traffic directly to the hacker's laptop instead of the real router, executing a devastating **Man-In-The-Middle (MITM)** attack.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Routing (Static & Dynamic)/index.mdx': `---
title: IP Routing (Static vs Dynamic)
description: The mathematical algorithms and protocols routers use to calculate the absolute shortest path across the global internet topology.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="IP Routing">

When a router receives an IP packet, it looks at the Destination IP, looks at its internal **Routing Table**, and forwards the packet out the correct physical port. But how does a router mathematically build that routing table? How does a router in Tokyo know the exact path to a server in London?

## 1. Static Routing
In **Static Routing**, a human network engineer logs into the router via CLI and manually types the exact mathematical route.
- *"If a packet is destined for TICK110.5.0.0/16TICK1, throw it out Port 2."*
- **Pros**: Mathematically zero CPU overhead. Absolute security (nobody can inject fake routes).
- **Cons**: Catastrophically unscalable. If the router connected to Port 2 physically catches on fire, the static route is completely broken, and all traffic is dropped. The internet could not exist using Static Routing.

## 2. Dynamic Routing Protocols
In **Dynamic Routing**, routers mathematically talk to each other. They constantly exchange topology maps, allowing algorithms to automatically recalculate the fastest paths if a cable is cut.

Dynamic protocols are mathematically divided into two categories:

### A. Interior Gateway Protocols (IGP)
Used *inside* a single organization's network (an Autonomous System, like Google's internal data center or a university campus).

<ComparisonTable 
  headers={['Protocol', 'Algorithm', 'Mechanism']} 
  rows={[
    ['OSPF (Open Shortest Path First)', 'Dijkstra’s Algorithm (Link-State)', 'Every router mathematically builds a complete 3D map of the entire network topology. They calculate the absolute shortest path based on Link Cost (bandwidth). A 10Gbps fiber link mathematically costs less than a 100Mbps copper link.'],
    ['EIGRP (Enhanced Interior Gateway Routing Protocol)', 'DUAL Algorithm (Distance-Vector)', 'Cisco proprietary (mostly). Routers only know what their direct neighbors tell them. They calculate metrics based on a complex mathematical formula involving Bandwidth and Delay. Extremely fast convergence when a link fails.']
  ]} 
/>

### B. Exterior Gateway Protocols (EGP)
Used *between* different organizations. This is the protocol that mathematically glues the global internet together.

**BGP (Border Gateway Protocol)**: 
BGP is the only EGP in use today. When Comcast's network connects to AT&T's network, they use BGP.
Unlike OSPF which calculates the fastest path based on link speed, BGP is a **Path-Vector** protocol. It mathematically calculates the path based on *business policies* and *AS-Path length* (the number of different companies the packet must hop through). 

<Callout icon="warning" title="BGP Hijacking">
Like ARP, BGP was built on trust. If a telecom in Russia accidentally (or maliciously) broadcasts a BGP message claiming, *"I am the absolute best mathematical route to YouTube's IP addresses,"* the global internet routers will blindly believe it and instantly reroute 100% of global YouTube traffic into a Russian data center blackhole. This has happened multiple times, bringing down massive sections of the internet.
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
