import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ARP/index.mdx': `---
title: ARP (Address Resolution Protocol)
description: The critical Layer 2 protocol that bridges the physical hardware of a local network with the logical IP addresses of the internet by mapping IP addresses to MAC addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARP (Address Resolution Protocol)">

Imagine you know someone's mailing address (IP Address), but you don't know what their physical house looks like (MAC Address). You cannot deliver the mail without knowing the physical destination. 
**ARP** is the protocol that computers use to broadcast a question to the local network: *"Who has this IP address? Tell me your physical MAC address."*

## 1. How ARP Works (The Broadcast)

When Computer A wants to send data to Computer B (IP: 192.168.1.50) on the same local network:
1. **Check the Cache**: Computer A first checks its internal **ARP Cache** (a temporary table of recently mapped IP-to-MAC addresses).
2. **The Broadcast Request**: If the IP is not in the cache, Computer A sends an Ethernet broadcast frame (Target MAC: ${TICK1}FF:FF:FF:FF:FF:FF${TICK1}) to every single device on the local switch. The message says: *"Who has 192.168.1.50? Send your MAC to me."*
3. **The Unicast Reply**: Every device receives the broadcast, but only Computer B (who actually owns that IP) responds. Computer B sends a direct (unicast) message back: *"I am 192.168.1.50, and my MAC is 00:1A:2B:3C:4D:5E."*
4. **Caching**: Computer A saves this mapping in its ARP Cache to avoid broadcasting again, and immediately begins transmitting the actual data payload.

## 2. ARP Spoofing (Poisoning)

ARP was designed in the 1980s and has absolutely no authentication. It blindly trusts any ARP reply it receives.
A hacker on a local network can continuously spam forged ARP replies to the victim's computer, falsely claiming: *"I am the Default Gateway (the Router), here is my MAC address."*
The victim's computer overwrites its ARP cache and starts sending all of its internet traffic directly to the hacker's laptop instead of the router, executing a perfect **Man-in-the-Middle (MITM) attack**.

<Callout icon="info" title="IPv6 and NDP">
  ARP only exists for IPv4. When IPv6 was introduced, ARP was entirely replaced by the **Neighbor Discovery Protocol (NDP)**, which uses ICMPv6 and multicast instead of inefficient network-wide broadcasts.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DHCP/index.mdx': `---
title: DHCP (Dynamic Host Configuration Protocol)
description: The automated network management protocol that dynamically assigns IP addresses and configuration parameters to devices joining a network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DHCP (Dynamic Host Configuration Protocol)">

In the early days of networking, network administrators had to manually walk to every computer and manually type in a static IP address, Subnet Mask, and Default Gateway. If two computers were accidentally given the same IP, the network crashed.

**DHCP** automated this process. It is a client-server protocol (running on UDP ports 67 and 68) that automatically leases IP addresses to devices the millisecond they connect to the network.

## 1. The DORA Process

When you connect your phone to a Wi-Fi network, the DHCP exchange occurs in 4 steps (DORA):

1. **Discover**: Your phone has no IP address. It shouts a broadcast message to the entire network: *"Are there any DHCP servers here? I need an IP!"*
2. **Offer**: The router (acting as the DHCP server) hears the shout, checks its pool of available IPs, and replies: *"I am a DHCP server. I can offer you 192.168.1.15."*
3. **Request**: Your phone replies: *"I accept 192.168.1.15. Please reserve it for me."*
4. **Acknowledge**: The server finalizes the lease and replies: *"Confirmed. You own 192.168.1.15 for the next 24 hours. Your Default Gateway is 192.168.1.1, and your DNS server is 8.8.8.8."*

## 2. IP Leases

DHCP does not give out permanent IP addresses. It provides **Leases**. 
A lease might last 24 hours. When the lease is 50% expired (12 hours), the client automatically contacts the server to ask for a renewal. If the laptop is turned off and the lease fully expires, the DHCP server reclaims the IP address and gives it to a different device, preventing the network from running out of addresses.

<Callout icon="warning" title="Rogue DHCP Servers">
  Because the **Discover** message is a broadcast, a hacker can plug a rogue laptop into a corporate network and run their own DHCP server. If the hacker's server replies with an **Offer** faster than the legitimate corporate router, it can assign victims a fake DNS server, silently redirecting all their web traffic to phishing sites.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DNS (Records, Resolution, Zones)/index.mdx': `---
title: DNS (Domain Name System)
description: The hierarchical, decentralized phonebook of the internet that translates human-readable domain names into machine-readable IP addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNS (Domain Name System)">

Computers only understand IP addresses (like ${TICK1}142.250.190.46${TICK1}), but humans cannot memorize billions of random numbers. We remember names (like ${TICK1}google.com${TICK1}). 
**DNS** is the globally distributed database that bridges this gap, translating domain names into routing IP addresses in milliseconds.

## 1. The Resolution Process (How a lookup works)

If you type ${TICK1}example.com${TICK1} into your browser, a massive global relay race occurs:

1. **Local Cache**: Your OS checks its local cache. If it doesn't know the IP, it asks your ISP's **Recursive Resolver**.
2. **Root Name Server**: The Resolver asks one of the 13 global Root Servers. The Root doesn't know the exact IP, but it says: *"I don't know example.com, but I know who handles all .com domains. Go ask the .com TLD server."*
3. **TLD Name Server**: The Resolver asks the Top-Level Domain server (.com). The TLD says: *"I don't know the IP, but I know the specific server that is authorized to answer for example.com. Go ask AWS Route 53."*
4. **Authoritative Name Server**: The Resolver asks the final authority (e.g., AWS). The Authoritative Server checks its records and replies: *"The IP for example.com is 93.184.216.34."*

## 2. Common DNS Records

When configuring a domain, administrators set up specific records to route different types of traffic:
- **A Record (Address)**: Maps a domain to an **IPv4** address.
- **AAAA Record**: Maps a domain to an **IPv6** address.
- **CNAME (Canonical Name)**: Maps an alias (like ${TICK1}www.example.com${TICK1}) to another domain name (like ${TICK1}example.com${TICK1}). It cannot point directly to an IP.
- **MX Record (Mail Exchange)**: Tells the internet which server handles email for the domain.
- **TXT Record**: A text string used for verification, heavily used by SPF, DKIM, and DMARC to prevent email spoofing.

<Callout icon="tip" title="Time to Live (TTL)">
  Every DNS record has a **TTL** (e.g., 3600 seconds). This tells the Recursive Resolver how long it is allowed to cache the IP address before it must delete it and ask the Authoritative Server again. If you are migrating servers, you must lower your TTL to 60 seconds days in advance, otherwise, users' browsers will aggressively cache the old IP and fail to connect to your new server.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IP/index.mdx': `---
title: IP (Internet Protocol)
description: The fundamental network-layer protocol responsible for addressing and routing packets of data across vast, interconnected global networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IP (Internet Protocol)">

While MAC addresses allow two computers to talk on the exact same local switch, they cannot route traffic across the globe. 
The **Internet Protocol (IP)** operates at Layer 3 of the OSI model. It provides the logical addressing system and the routing mechanics required to send a packet of data from a laptop in Tokyo, through 15 different routers, to a server in New York.

## 1. Connectionless and Best-Effort

IP is inherently a **Connectionless** and **Unreliable** protocol.
- **Connectionless**: It does not set up a dedicated circuit before sending data. It just blindly throws packets at the nearest router and hopes for the best.
- **Best-Effort**: IP offers absolutely zero guarantees that a packet will arrive. If a router gets congested, it will mercilessly drop the IP packet into the void. IP does not care, and it will not attempt to resend it. (Reliability is entirely the responsibility of the Layer 4 protocol, TCP).

## 2. The Anatomy of an IP Packet

When a piece of data is sent over the internet, it is wrapped in an IP Header. The most critical fields are:
- **Source IP Address**: Who sent it.
- **Destination IP Address**: Where it is going.
- **TTL (Time to Live)**: A countdown timer. Every time the packet passes through a router, the router subtracts 1 from the TTL. If the TTL hits 0, the router destroys the packet. This prevents a misconfigured packet from looping around the internet infinitely and crashing the global network.

## 3. Fragmentation

Different networks have different physical limits on how large a packet can be (the **MTU** - Maximum Transmission Unit). Standard Ethernet MTU is 1500 bytes. 
If an IP packet is 4000 bytes long, the IP protocol will automatically slice it into three smaller "fragments," label them with sequence numbers, and send them individually. The receiving computer's IP layer will wait for all three fragments to arrive and seamlessly stitch them back together before handing the data up to the application.

<Callout icon="info" title="IPv4 vs IPv6">
  The original standard, IPv4, only supported 4.3 billion addresses, which ran out entirely in the 2010s. The internet is currently undergoing a multi-decade, agonizingly slow migration to **IPv6**, which supports $3.4 \\times 10^{38}$ addresses (enough to assign an IP address to every single atom on the surface of the Earth).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/MAC addresses/index.mdx': `---
title: MAC Addresses
description: The permanent, physical hardware address burned into every network interface card, responsible for delivering data frames on a local Ethernet or Wi-Fi network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MAC Addresses (Media Access Control)">

An IP Address is a logical address that changes depending on what network you are connected to (like a mailing address). 
A **MAC Address** is a physical hardware address permanently burned into your computer's Wi-Fi chip or Ethernet port at the factory (like a VIN number on a car). It operates at Layer 2 (Data Link Layer) of the OSI model.

## 1. Anatomy of a MAC Address

A MAC address is a 48-bit identifier, usually represented as six pairs of hexadecimal digits (e.g., ${TICK1}00:1A:2B:3C:4D:5E${TICK1}).

It is split into two exact halves:
- **OUI (Organizationally Unique Identifier)**: The first 24 bits (${TICK1}00:1A:2B${TICK1}). This is registered to the manufacturer. By looking at the OUI, a network admin can instantly tell if the device is made by Apple, Intel, or Cisco.
- **NIC Specific**: The last 24 bits (${TICK1}3C:4D:5E${TICK1}). This is a unique serial number assigned by the manufacturer to that specific chip.

## 2. The Local Network Limitation

MAC addresses have absolutely zero concept of geography or routing. 
You cannot send a message across the internet using a MAC address. A router will not forward a MAC frame. 
MAC addresses are **only used to deliver data between two devices connected to the exact same local network (LAN)**.

When you send a web request to Google:
1. Your computer sends an Ethernet frame to your **Home Router's MAC address**. 
2. Your router rips off the Ethernet frame, looks at the IP address, and builds a brand new Ethernet frame addressed to the **ISP's Router's MAC address**.
3. The MAC address changes at every single "hop" across the internet, while the IP address remains constant.

<Callout icon="warning" title="MAC Randomization (Privacy)">
  Historically, because your phone's Wi-Fi MAC address never changed, shopping malls would track your physical movements by scanning for your MAC address as you walked past different stores. To defeat this, modern iOS and Android devices use **MAC Randomization**, generating a fake, temporary MAC address for every new Wi-Fi network they connect to.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/NAT/index.mdx': `---
title: NAT (Network Address Translation)
description: The vital routing technology that allows an entire private network of devices to share a single public internet IP address, preventing the internet from running out of IPv4 addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NAT (Network Address Translation)">

In the 1990s, engineers realized a catastrophic problem: the IPv4 protocol only allowed for 4.3 billion IP addresses, and the world was going to run out.
**NAT** was invented as an emergency stopgap. It allows a home or corporate router to hide dozens, hundreds, or thousands of devices behind one single public IP address.

## 1. Private vs Public IP Addresses

Certain blocks of IP addresses (like ${TICK1}192.168.x.x${TICK1} or ${TICK1}10.x.x.x${TICK1}) were permanently reserved for **Private Networks**. These addresses are completely unroutable on the public internet. If a router sees a packet destined for ${TICK1}192.168.1.5${TICK1} on the global internet backbone, it immediately drops it.

## 2. How NAT Works

Imagine an office building where 100 employees all share the exact same outbound phone number, but each has a private 3-digit extension on their desk. This is how NAT works:

1. **Outbound**: Your laptop (${TICK1}192.168.1.50${TICK1}) wants to load Google. It sends the packet to the router.
2. **Translation**: The router intercepts the packet. It strips away your private IP address, and replaces it with the router's one **Public IP Address** (e.g., ${TICK1}203.0.113.5${TICK1}). 
3. **The NAT Table**: The router writes down a note in its internal NAT Table: *"I sent a request to Google on behalf of 192.168.1.50."*
4. **Inbound**: Google replies, sending the webpage back to the Public IP (${TICK1}203.0.113.5${TICK1}).
5. **Reverse Translation**: The router receives the packet, checks its NAT Table, realizes the data belongs to your laptop, rewrites the destination to ${TICK1}192.168.1.50${TICK1}, and forwards it to you.

## 3. The Security Side-Effect

While NAT was designed solely to conserve IP addresses, it accidentally created a massive security firewall.
Because devices behind a NAT router do not have public IP addresses, a hacker in Russia literally cannot target your specific laptop. If they try to hack your Public IP, they hit the router, and because the router has no entry in its NAT table expecting inbound traffic, it silently drops the hacker's packets. 
*(This is why you have to manually configure "Port Forwarding" if you want to host a Minecraft server at home).*

<Callout icon="tip" title="NAT in the IPv6 Era">
  Because IPv6 has $3.4 \\times 10^{38}$ addresses, every single lightbulb and refrigerator on Earth can have a globally routable Public IP address. Therefore, NAT is completely unnecessary and structurally discouraged in pure IPv6 networks.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/OSI model/index.mdx': `---
title: The OSI Model
description: The foundational 7-layer conceptual framework used to understand, standardize, and troubleshoot how data flows through a computer network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/ComparisonTable'

<ConceptTemplate title="The OSI Model (Open Systems Interconnection)">

When you send an email, a massive, wildly complex orchestration of hardware and software occurs. To make sense of it, the ISO created a 7-layer conceptual model. 

The **OSI Model** breaks networking down into isolated, independent layers. The beauty of the model is abstraction: the engineers writing the HTTP web browser (Layer 7) don't need to know if the user is connected via Wi-Fi or a copper Ethernet cable (Layer 1).

## The 7 Layers (Top to Bottom)

<ComparisonTable 
  headers={['Layer', 'Name', 'Description', 'Protocols / Hardware']} 
  rows={[
    ['7', 'Application', 'The interface the human uses. Where network-aware applications operate.', 'HTTP, HTTPS, SMTP, FTP, DNS'],
    ['6', 'Presentation', 'Data formatting, encryption (SSL/TLS), and compression.', 'JPEG, ASCII, TLS/SSL'],
    ['5', 'Session', 'Establishes, maintains, and terminates communication sessions.', 'Sockets, NetBIOS, RPC'],
    ['4', 'Transport', 'End-to-end data delivery, reliability (TCP), or speed (UDP). Segments data.', 'TCP, UDP, Port Numbers'],
    ['3', 'Network', 'Logical addressing and routing across the internet. Packets.', 'IP (IPv4/IPv6), ICMP, Routers'],
    ['2', 'Data Link', 'Physical addressing on the local network. MAC addresses. Frames.', 'Ethernet, Wi-Fi (802.11), Switches'],
    ['1', 'Physical', 'The actual raw bits (1s and 0s) transmitted over physical mediums.', 'Cables, Radio Waves, Fiber Optics, Hubs']
  ]} 
/>

## Encapsulation (How Data Moves)

When you send an email, data moves **Top-Down** (Layer 7 down to 1).
As the data passes through each layer, the layer adds its own specific "Header" to the data (like putting a letter inside an envelope, and then putting that envelope inside a shipping box). This is called **Encapsulation**.

When the email reaches the destination server, the data moves **Bottom-Up** (Layer 1 up to 7). Each layer rips off its specific header, reads the instructions, and passes the payload up to the next layer (**Decapsulation**), until the pure email appears on the screen.

<Callout icon="warning" title="OSI vs TCP/IP Model">
  The OSI Model is a theoretical, conceptual framework taught in universities. It is not exactly how the modern internet actually works. The real internet is based on the 4-layer **TCP/IP Model** (Application, Transport, Internet, Network Access). However, network engineers still universally use OSI terminology (e.g., calling a router a "Layer 3 device" and a switch a "Layer 2 device").
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Subnetting/index.mdx': `---
title: Subnetting
description: The mathematical process of logically dividing a single large IP network into multiple smaller, isolated networks to improve security and performance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Subnetting">

If a massive university puts all 50,000 of its computers on a single network, the network will instantly collapse. Every time a computer uses ARP or DHCP, it sends a broadcast message to all 50,000 computers. This "Broadcast Storm" will overwhelm the switches.

**Subnetting** is the mathematical process of taking a large block of IP addresses and slicing it into smaller, isolated "Subnets." Computers in Subnet A cannot natively talk to computers in Subnet B without passing through a router (which blocks broadcast traffic).

## 1. The Subnet Mask

An IP address (like ${TICK1}192.168.1.50${TICK1}) actually contains two pieces of information:
1. **The Network ID**: Which neighborhood the computer lives in.
2. **The Host ID**: The specific house number of the computer.

The **Subnet Mask** is a mathematical filter (like ${TICK1}255.255.255.0${TICK1}) that tells the computer exactly where the Network ID ends and the Host ID begins.
If a computer's IP is ${TICK1}192.168.1.50${TICK1} with a mask of ${TICK1}255.255.255.0${TICK1}, the computer inherently knows that the network is ${TICK1}192.168.1${TICK1} and its specific ID is ${TICK1}50${TICK1}.

## 2. CIDR Notation (Classless Inter-Domain Routing)

Writing out ${TICK1}255.255.255.0${TICK1} is tedious. Modern networking uses **CIDR Notation**, which simply counts the number of "1" bits in the subnet mask.
- A mask of ${TICK1}255.255.255.0${TICK1} has exactly 24 ones in binary. 
- In CIDR notation, this is written as **${TICK1}/24${TICK1}**.

### Common CIDR Blocks:
- **${TICK1}/24${TICK1}**: Provides exactly 256 IP addresses (254 usable). Perfect for a small office or home.
- **${TICK1}/16${TICK1}**: Provides 65,536 IP addresses. Used by large corporations.
- **${TICK1}/8${TICK1}**: Provides 16.7 million IP addresses. Used by massive ISPs.

## 3. Why Subnet?

1. **Performance**: Smaller subnets reduce broadcast traffic, keeping the network fast.
2. **Security**: If the HR department and the Engineering department are on different subnets, you can put a firewall router between them and strictly control which databases they are allowed to access. (If they were on the same subnet, traffic flows directly through the switch, bypassing the firewall entirely).

<Callout icon="error" title="The Subnet Math Trap">
  In any subnet, the very first IP address is ALWAYS reserved for the "Network Address" (used for routing tables), and the very last IP address is ALWAYS reserved for the "Broadcast Address". Therefore, a ${TICK1}/24${TICK1} subnet gives you 256 addresses, but you can only assign 254 of them to actual computers.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP/index.mdx': `---
title: TCP (Transmission Control Protocol)
description: The highly reliable, connection-oriented Layer 4 protocol that guarantees the accurate, ordered delivery of data across the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TCP (Transmission Control Protocol)">

The Internet Protocol (IP) is completely unreliable; it frequently drops packets if routers get congested. 
**TCP (Transmission Control Protocol)** sits on top of IP at Layer 4 (Transport). Its sole purpose is to provide an ironclad guarantee: if an application sends a file, the destination will receive the file perfectly, with zero missing bytes, and in the exact correct order. 

TCP powers HTTP/HTTPS, SSH, FTP, and Email (SMTP)—applications where a single missing byte of data corrupts the entire file.

## 1. The Three-Way Handshake

Because TCP is **Connection-Oriented**, it refuses to send a single byte of data until both computers formally agree to establish a session. This is the 3-Way Handshake:
1. **SYN**: The Client says, *"Hello, I would like to establish a connection. My starting sequence number is 100."*
2. **SYN-ACK**: The Server replies, *"I acknowledge your 100, and I agree. My starting sequence number is 500."*
3. **ACK**: The Client replies, *"I acknowledge your 500. Let's begin transmitting."*

## 2. Guaranteed Delivery and Sequencing

When you download a 10MB image, TCP slices it into thousands of small segments. 
Because IP routes packets dynamically, Segment 5 might arrive *before* Segment 2. 
- TCP assigns a **Sequence Number** to every segment. The receiving computer holds the segments in a buffer and mathematically reassembles them in perfect order before showing the image.
- **Acknowledgements**: For every segment received, the receiver must send an "ACK" back to the sender. If the sender does not receive an ACK within a few milliseconds, it assumes the packet was dropped by a router and **automatically retransmits it**.

## 3. Flow Control and Congestion Control

TCP is highly polite to the network.
- **Flow Control (Windowing)**: The receiver tells the sender exactly how much RAM buffer space it has left. If the receiver's CPU is overwhelmed, it shrinks the "Window", forcing the sender to slow down so it doesn't crash the receiver.
- **Congestion Control**: If the sender detects that packets are being dropped (meaning the internet routers in the middle are congested), it will aggressively throttle its own transmission speed to alleviate the global internet traffic jam.

<Callout icon="warning" title="The Overhead Cost">
  TCP's absolute reliability comes at a massive cost in speed. The 3-way handshake adds latency before data even starts flowing, and the constant ACKs and retransmissions require significant overhead. For real-time applications where speed is more important than perfect accuracy (like video calling), developers use UDP instead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/UDP/index.mdx': `---
title: UDP (User Datagram Protocol)
description: The blazing fast, connectionless Layer 4 protocol that prioritizes absolute speed and low latency over reliability and ordered delivery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="UDP (User Datagram Protocol)">

While TCP is a meticulous courier who requires a signature for every package, **UDP** is a machine gun. It blindly blasts packets of data at the destination as fast as physically possible. 

UDP operates at Layer 4 (Transport) and is explicitly **Connectionless** and **Unreliable**. It performs no handshakes, expects no acknowledgements, and does not care if the data arrives out of order, or if it arrives at all.

## 1. Why Use UDP? (The Need for Speed)

If UDP is so unreliable, why is it used? Because TCP's reliability (handshakes, ACKs, retransmissions) introduces massive latency. 
There is a massive class of applications where **late data is worse than missing data**.

- **VoIP / Video Calls (Zoom, Discord)**: If a packet containing a frame of video is dropped by a router, you don't want TCP to pause the video, request a retransmission, and wait 50ms for the missing frame. You want the app to just skip the frame (causing a tiny visual glitch) and immediately play the newest live frame.
- **Live Multiplayer Gaming**: In a fast-paced shooter, your exact position needs to be updated 60 times a second. If packet #42 is lost, the server doesn't care, because packet #43 is already arriving with your updated position.
- **DNS Lookups**: Translating a domain name needs to be instantaneous. Setting up a 3-way TCP handshake just to ask one question is a waste of time. DNS uses a single UDP packet to ask the question, and a single UDP packet to receive the answer.

## 2. What UDP Lacks

To achieve this extreme speed, UDP strips away almost all of TCP's features:
- **No Retransmissions**: If a packet is lost, it is gone forever.
- **No Sequencing**: If packets arrive out of order, UDP passes them to the application out of order.
- **No Congestion Control**: UDP will blast data at 1 Gigabit per second even if the receiving network can only handle 10 Megabits, causing catastrophic packet loss for everyone else on the network.

<Callout icon="tip" title="Application-Layer Reliability">
  Just because you use UDP doesn't mean your app has to be completely unreliable. Modern protocols (like HTTP/3 which uses QUIC) are built on top of UDP. They leverage the raw speed of UDP at the transport layer, but manually implement their own highly-optimized reliability and sequencing features directly within the application layer code.
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
