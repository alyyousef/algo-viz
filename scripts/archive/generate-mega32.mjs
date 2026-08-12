import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/OSI model/index.mdx': `---
title: OSI Model
description: The foundational 7-layer conceptual framework used to understand and standardize how different computer systems communicate.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OSI Model">

The **Open Systems Interconnection (OSI) Model** was developed by the ISO in 1984. It does not dictate exactly how hardware should be built; rather, it provides a universal, conceptual 7-layer framework to describe the functions of a networking system.

If a network engineer says, *"We are experiencing a Layer 2 loop"*, every other engineer immediately knows exactly which hardware and protocols are involved.

## The 7 Layers

From bottom (hardware) to top (software):

1. **Physical (Layer 1)**: The absolute raw hardware. Cables, electrical voltages, radio frequencies, and fiber optic light pulses. (Hubs, Cables).
2. **Data Link (Layer 2)**: Node-to-node data transfer within the *same* local network. Handles physical addressing. (MAC Addresses, Switches, Ethernet).
3. **Network (Layer 3)**: Routing data *between different* networks across the globe. Handles logical addressing. (IP Addresses, Routers).
4. **Transport (Layer 4)**: Ensures data arrives reliably, in order, and assigns it to the correct application via Ports. (TCP, UDP).
5. **Session (Layer 5)**: Establishes, manages, and terminates persistent connections between two computers.
6. **Presentation (Layer 6)**: Formats, encrypts, and compresses data so the application can read it (e.g., SSL/TLS encryption, JPEG formatting).
7. **Application (Layer 7)**: The software interface the user actually interacts with. (HTTP, FTP, SMTP, DNS).

<Callout icon="info" title="Encapsulation (The Russian Doll)">
  When you send an email (Layer 7), the data travels *down* the stack on your computer. Each layer adds its own specific "Header" to the data. By the time it hits Layer 1, it is a massive nested package (encapsulation). When the server receives it, the data travels *up* the stack, with each layer stripping off its respective header (decapsulation).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP-IP model/index.mdx': `---
title: TCP/IP Model
description: The concise, practical 4-layer network model that the modern Internet is actually built upon, favored by the Department of Defense.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TCP/IP Model">

While the 7-layer OSI model is the gold standard for academic teaching and network troubleshooting, the Internet is not actually built on the OSI model. 

The Internet was built by DARPA (the U.S. Department of Defense) using the **TCP/IP Model** (sometimes called the DoD Model). It is a much simpler, highly practical 4-layer architecture.

## The 4 Layers

The TCP/IP model condenses the verbose OSI model down to its absolute essentials:

1. **Network Access Layer (OSI Layers 1 & 2)**: 
   Combines the Physical and Data Link layers. It handles everything required to move raw bits across local hardware (Ethernet, Wi-Fi, MAC addresses).
2. **Internet Layer (OSI Layer 3)**: 
   Maps perfectly to the OSI Network layer. It is responsible for global routing across disparate networks using the Internet Protocol (IP).
3. **Transport Layer (OSI Layer 4)**: 
   Maps perfectly to the OSI Transport layer. It handles reliable (TCP) and unreliable (UDP) data delivery.
4. **Application Layer (OSI Layers 5, 6, & 7)**: 
   TCP/IP condenses Session, Presentation, and Application into one massive layer. The philosophy is that if an application (like a web browser) needs encryption or session tracking, it should build it into the software itself (HTTPS), rather than relying on the operating system.

<Callout icon="success" title="Why TCP/IP Won">
  The OSI model was heavily bureaucratic, trying to define perfect standards for every possible edge case before a single piece of hardware was built. The TCP/IP model was built by engineers trying to solve immediate problems. They built working code (TCP and IP protocols) first, and defined the model based on what actually survived in the real world.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/MAC addresses/index.mdx': `---
title: MAC Addresses
description: The permanent, physical hardware serial numbers burned into every network card, operating exclusively at Layer 2.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MAC Addresses">

If an IP address is a computer's mailing address (which changes when you move to a new house), a **MAC Address** (Media Access Control) is the computer's social security number. It is permanent.

A MAC address operates exclusively at **Layer 2 (Data Link)**. It is a 48-bit hexadecimal number physically burned into the silicon of every Network Interface Card (NIC) at the factory.

## Format and Structure

A MAC address looks like this: **TICK100:1A:2B:3C:4D:5ETICK1**

It is divided into two distinct halves:
1. **OUI (Organizationally Unique Identifier)**: The first 24 bits (e.g., TICK100:1A:2BTICK1). This is a registered manufacturer code. You can look this code up online to instantly determine if the hardware was built by Apple, Intel, or Cisco.
2. **NIC Specific**: The last 24 bits (e.g., TICK13C:4D:5ETICK1). This is a unique serial number assigned by the manufacturer, ensuring that no two network cards on Earth have the exact same MAC address.

<Callout icon="warning" title="MAC Spoofing">
  While a MAC address is physically burned into the hardware, operating systems load it into RAM when the computer boots. This allows malicious hackers (and privacy-conscious users) to easily change their MAC address in software (MAC Spoofing) to bypass airport Wi-Fi time limits or evade network tracking.
</Callout>

## The Role of MAC Addresses
MAC addresses are only used for local communication. When your laptop talks to a printer on the same Wi-Fi network, the traffic is routed entirely via MAC addresses. **MAC addresses never pass through a router.** Once a packet leaves your house and hits the open Internet, your MAC address is stripped away and replaced by your router's MAC address.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Ethernet/index.mdx': `---
title: Ethernet (IEEE 802.3)
description: The undisputed global standard for wired Layer 2 networking, defining both the physical cables and the digital frame structures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ethernet (IEEE 802.3)">

**Ethernet** is not just a cable; it is a massive family of technologies standardized as **IEEE 802.3**. It dictates exactly how devices in a local area network (LAN) format data for transmission and how they negotiate access to the physical wire.

Ethernet dominates both Layer 1 (Physical Cables) and Layer 2 (Data Link Frames).

## The Ethernet Frame

When a computer sends an IP packet across a LAN, it cannot just send raw IP data. It must wrap (encapsulate) the IP packet inside a Layer 2 **Ethernet Frame**.

A standard frame consists of:
1. **Preamble**: A specific pattern of bits that tells the receiving network card, "Wake up, data is coming."
2. **Destination MAC Address**: Who this frame is going to.
3. **Source MAC Address**: Who sent the frame.
4. **EtherType**: A code indicating what kind of data is inside (e.g., 0x0800 means an IPv4 packet is inside).
5. **Payload (Data)**: The actual Layer 3 IP packet.
6. **FCS (Frame Check Sequence)**: A cryptographic hash (CRC32) calculated at the end. If the cable is slightly damaged and a single bit flips during transit, the receiving computer will recalculate the hash, realize it doesn't match, and silently delete the corrupted frame.

<Callout icon="info" title="CSMA/CD (Collision Detection)">
  In the 1990s, networks used Hubs. Only one computer could talk at a time. If two computers transmitted simultaneously, the electricity collided and destroyed the data. Ethernet used CSMA/CD to listen for collisions, tell both computers to wait a random number of milliseconds, and try again. Modern Switches have entirely eliminated collisions, rendering CSMA/CD obsolete.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Switching/index.mdx': `---
title: Switching
description: The intelligent Layer 2 process where dedicated hardware forwards data frames exclusively to the intended recipient based on MAC addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Switching">

In the early days of networking, offices used **Hubs**. A hub was a dumb electrical repeater. If Computer A sent a file to Computer B, the hub copied the electricity and blasted it out of every single port in the building. Everyone's network card had to process the file, realize it wasn't for them, and drop it. It was incredibly slow and insecure.

**Switches** replaced hubs. A switch operates at **Layer 2 (Data Link)** and possesses artificial intelligence (an ASIC chip) designed to learn exactly where computers are physically located.

## The MAC Address Table (CAM Table)

When you plug 10 computers into a switch, it learns the layout of the network by building a **MAC Address Table**.

1. Computer A (MAC: TICK1AA:AATICK1) plugs into Port 1 and sends a message.
2. The Switch looks at the Source MAC address of the frame and permanently records: *"MAC AA:AA is physically attached to Port 1."*
3. If Computer C (on Port 3) wants to talk to Computer A, the Switch intercepts the frame, checks its table, and forwards the data *exclusively* out of Port 1.

No other computer on the network ever sees the traffic.

<Callout icon="warning" title="MAC Flooding Attacks">
  Switches have a finite amount of RAM to store the MAC Table. Hackers can launch a "MAC Flood" attack by rapidly blasting 50,000 fake MAC addresses into the switch in 3 seconds. The switch's RAM fills up, the table crashes, and the switch enters "Fail-Open" mode—reverting into a dumb Hub. The hacker can then use Wireshark to sniff all the passwords being blasted across the network.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/VLAN/index.mdx': `---
title: VLAN (Virtual LAN)
description: A technology that logically splits a single physical switch into multiple isolated, independent virtual networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="VLAN (Virtual LAN)">

Imagine an enterprise office with 100 employees: 50 in HR, and 50 in Engineering. 
For security, HR computers should never be able to talk to Engineering computers. 

Historically, you would have to buy two physical Switches and run two completely separate wiring infrastructures. **VLANs (Virtual Local Area Networks - IEEE 802.1Q)** solve this in software.

## How VLANs Work

You can take a single 48-port physical switch and logically slice it in half.
- You assign Ports 1-24 to **VLAN 10 (HR)**.
- You assign Ports 25-48 to **VLAN 20 (Engineering)**.

If a computer on Port 5 (HR) tries to send a broadcast message to the entire office, the switch's internal logic will trap that message and *only* send it to other ports inside VLAN 10. The switch guarantees that Layer 2 traffic cannot cross VLAN boundaries.

## Trunking (802.1Q)

What if the HR department spans across three different floors, using three different physical switches? You don't want to run 10 separate cables between the switches for each VLAN.

You use a **Trunk Port**.
A Trunk is a single physical cable connecting two switches. When data leaves a switch via a Trunk, the switch forcibly injects a **4-byte VLAN Tag** into the middle of the Ethernet frame. The receiving switch reads the tag (e.g., "This data belongs to VLAN 10"), strips the tag off, and forwards the data to the correct HR computer.

<Callout icon="info" title="Inter-VLAN Routing">
  VLANs provide perfect Layer 2 isolation. If a manager in HR legitimately needs to send a file to Engineering, they cannot do it through the switch. The traffic must be sent up to a **Layer 3 Router** (often using a "Router on a Stick" topology or a Layer 3 Switch). The router inspects the IP addresses, applies firewall rules, and routes the traffic down into the other VLAN.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ARP/index.mdx': `---
title: ARP (Address Resolution Protocol)
description: The critical Layer 2 protocol used to mathematically translate a known Layer 3 IP address into an unknown Layer 2 MAC address.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARP (Address Resolution Protocol)">

Your computer knows it wants to talk to a printer at IP address TICK1192.168.1.50TICK1. 
However, Switches (Layer 2) do not understand IP addresses. They only understand MAC addresses. 

Your computer cannot put the IP packet onto the Ethernet cable until it knows the exact, physical MAC address of the printer. 
It uses **ARP (Address Resolution Protocol)** to find it.

## The ARP Process

1. **The ARP Request (Broadcast)**: 
   Your computer blasts a message to every single device on the local network (using the broadcast MAC address TICK1FF:FF:FF:FF:FF:FFTICK1). It yells: *"WHO HAS IP 192.168.1.50? PLEASE TELL ME YOUR MAC ADDRESS."*
2. **The ARP Reply (Unicast)**: 
   Every computer ignores the shout except the printer. The printer replies directly back to your computer: *"I have 192.168.1.50! My MAC address is 00:1A:2B:3C:4D:5E."*
3. **The ARP Cache**: 
   Your computer saves this answer in its local RAM (the ARP Table) for a few minutes so it doesn't have to keep shouting every time it wants to print a page.

<Callout icon="warning" title="ARP Spoofing (Poisoning)">
  ARP was designed in the 1980s. It has zero authentication. If your computer asks "Who has the Router's IP?", a hacker on the same Wi-Fi network can instantly reply, *"I am the Router! Give me your traffic!"* Your computer will unquestioningly overwrite its ARP table, sending all its Internet traffic (and passwords) directly to the hacker. This is the foundation of Man-In-The-Middle (MITM) attacks.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv4/index.mdx': `---
title: IPv4
description: The foundational Layer 3 logical addressing protocol that established the global internet, utilizing 32-bit addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IPv4">

The **Internet Protocol version 4 (IPv4)** is the fundamental routing language of the Internet, operating at Layer 3 (Network). It is responsible for providing logical, hierarchical addressing, allowing routers to calculate the fastest path to move a packet from New York to Tokyo.

## The 32-Bit Limit

An IPv4 address is mathematically a 32-bit binary number (e.g., TICK111000000.10101000.00000001.00001010TICK1). 
Because humans cannot read binary efficiently, it is represented as four decimal numbers separated by dots (Dotted Decimal Notation): **TICK1192.168.1.10TICK1**.

Because it is strictly 32 bits long, IPv4 is mathematically limited to exactly **4,294,967,296** unique IP addresses.
When the Internet was invented, 4 billion addresses seemed infinite. By the 2010s, thanks to smartphones and IoT devices, the world officially ran out of IPv4 addresses (IPv4 Exhaustion).

## The Time-To-Live (TTL) Field
An IP packet can occasionally get stuck in a routing loop, bouncing infinitely between three broken routers forever, consuming bandwidth.
To prevent this, the IPv4 Header includes a **TTL** field (usually starting at 64). Every time a router processes the packet, it subtracts 1 from the TTL. If the TTL hits 0, the router permanently deletes the packet and sends an ICMP "Time Exceeded" error back to the sender.

<Callout icon="info" title="Private IPv4 (RFC 1918)">
  To delay IPv4 exhaustion, engineers designated specific blocks of IP addresses as "Private" (e.g., TICK1192.168.x.xTICK1 or TICK110.x.x.xTICK1). These addresses are legally banned from the open internet. Millions of homes can reuse the exact same TICK1192.168.1.xTICK1 network internally, relying on NAT (Network Address Translation) at the router to translate them into one single public IP address when accessing the internet.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv6/index.mdx': `---
title: IPv6
description: The next-generation Layer 3 protocol designed to permanently solve IP exhaustion using massive 128-bit hexadecimal addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IPv6">

Because the world ran out of IPv4 addresses, the IETF developed **Internet Protocol version 6 (IPv6)**.

IPv6 does not use 32 bits. It uses **128 bits**. 
This increases the total number of IP addresses from 4 Billion to **340 Undecillion** (340 followed by 36 zeros). This is enough to assign a unique, publicly routable IP address to every single atom on the surface of the Earth.

## IPv6 Addressing Format

Because 128 bits is massive, IPv6 Abandons dotted-decimal and uses Hexadecimal separated by colons.
Example: **TICK12001:0db8:85a3:0000:0000:8a2e:0370:7334TICK1**

### Compression Rules
To make typing easier, IPv6 allows you to compress the address:
1. **Drop Leading Zeros**: TICK10db8TICK1 becomes TICK1db8TICK1.
2. **Double Colon (::)**: If you have consecutive blocks of all zeros, you can replace them entirely with a double colon (but you can only use TICK1::TICK1 once per address).
**Compressed**: TICK12001:db8:85a3::8a2e:370:7334TICK1

## Key Differences from IPv4

- **No More NAT**: Because IP addresses are infinite, Network Address Translation (NAT) is completely unnecessary. Every smartphone and smart fridge gets a direct, globally routable Public IP. (Firewalls simply block incoming traffic to protect them).
- **No More Broadcasts**: IPv4 relied heavily on network-crushing Broadcasts (ARP). IPv6 completely abolishes Broadcasts, replacing them entirely with hyper-efficient Multicast groups (NDP - Neighbor Discovery Protocol).

<Callout icon="success" title="The Dual-Stack Reality">
  Transitioning the entire planet to IPv6 overnight is impossible. Today, we live in a "Dual-Stack" world. Your smartphone and laptop are assigned both an IPv4 address and an IPv6 address simultaneously. When you visit Google, your device attempts to connect via IPv6 first; if it fails, it silently falls back to IPv4.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Subnetting/index.mdx': `---
title: Subnetting
description: The mathematical process of carving a single massive IP network into smaller, logically isolated sub-networks to improve security and performance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Subnetting">

If a company is assigned the TICK110.0.0.0TICK1 network, that single network can hold 16.7 million computers. 
If all 16 million computers were on the same network, a single ARP broadcast would instantly crash the entire infrastructure under the weight of network traffic.

**Subnetting** is the process of stealing bits from the "Host" portion of an IP address and giving them to the "Network" portion, mathematically dividing the massive network into hundreds of smaller, manageable networks.

## The Subnet Mask

To understand Subnetting, you must understand the **Subnet Mask**. 
An IP address is just a number. The computer does not know which part of the number represents the Network, and which part represents the Host. 
The Subnet Mask tells the computer exactly where to draw the line.

TICK3text
IP Address:   192.168.1.50   (11000000.10101000.00000001 . 00110010)
Subnet Mask:  255.255.255.0  (11111111.11111111.11111111 . 00000000)
                              [------ NETWORK PORTION ------]   [HOST]
TICK3

Everywhere the Subnet Mask has a binary TICK11TICK1, that part of the IP address is locked. It is the Network ID. 
Everywhere the Mask has a binary TICK10TICK1, that represents the available Host IPs.

## The Magic of ANDing
When a computer wants to send a packet to TICK1192.168.1.99TICK1, it runs a binary math operation (Logical AND) between the destination IP and its own Subnet Mask. 
- If the resulting Network ID matches its own Network ID, the computer knows the target is in the same room, and it uses ARP to find the MAC address.
- If the Network IDs do NOT match, the computer knows the target is in another building, and immediately forwards the packet to its Default Gateway (the Router).

<Callout icon="warning" title="Subnet Boundaries">
  Every subnet physically burns two IP addresses that can never be assigned to a computer. The very first address (all Host bits are 0) is reserved as the **Network Address**, identifying the subnet itself. The very last address (all Host bits are 1) is reserved as the **Broadcast Address**, used to shout to everyone in that specific subnet.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/CIDR/index.mdx': `---
title: CIDR (Classless Inter-Domain Routing)
description: The modern, flexible method of allocating IP addresses and defining subnet masks using slash notation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CIDR (Classless Inter-Domain Routing)">

In the 1980s, IP addresses were distributed in rigid "Classes". 
- **Class A**: Massive networks of 16 million IPs.
- **Class B**: Medium networks of 65,000 IPs.
- **Class C**: Tiny networks of 254 IPs.

If a company needed 500 IPs, a Class C was too small, so the government would give them a Class B (65,000 IPs), permanently wasting 64,500 addresses. This rigid system nearly destroyed the internet in the 90s.

## The Solution: CIDR

**Classless Inter-Domain Routing (CIDR)** abolished the rigid Classes. It allowed engineers to draw the Subnet Mask boundary absolutely anywhere they wanted, creating custom-sized networks.

To make this readable, CIDR introduced **Slash Notation**. 
Instead of writing out a Subnet Mask like TICK1255.255.255.0TICK1, you simply write **TICK1/24TICK1**. 
This tells the computer: *"Exactly 24 binary bits are locked for the Network, leaving 8 bits (256 addresses) for the Hosts."*

### Common CIDR Blocks
- **TICK1/8TICK1** (Subnet Mask: 255.0.0.0): 16.7 Million IPs.
- **TICK1/16TICK1** (Subnet Mask: 255.255.0.0): 65,534 IPs.
- **TICK1/24TICK1** (Subnet Mask: 255.255.255.0): 254 IPs. (The standard home Wi-Fi network).

<Callout icon="success" title="Custom Boundaries">
  CIDR allows for extreme flexibility. If you only need 30 IPs for a small office, you can assign them a **TICK1/27TICK1** network. A TICK1/27TICK1 locks 27 bits for the network, leaving exactly 5 bits for hosts. Mathematically, 2 to the power of 5 is 32. Minus the Network and Broadcast IPs, you get exactly 30 usable IP addresses, wasting zero space!
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DHCP/index.mdx': `---
title: DHCP (Dynamic Host Configuration Protocol)
description: The automated service that leases IP addresses, Subnet Masks, and DNS configurations to devices the moment they join a network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DHCP (Dynamic Host Configuration Protocol)">

If you connect to an airport Wi-Fi, you do not have to open your computer settings and manually type in an IP address, Subnet Mask, and Default Gateway Router. 

This automation is handled by **DHCP** (Operating at Layer 7, via UDP Ports 67/68).

## The D.O.R.A. Process

When a device connects to a network without an IP address, it initiates a 4-step negotiation called D.O.R.A.:

1. **Discover (Broadcast)**: The laptop has no IP, so it screams a broadcast to the entire network: *"Are there any DHCP Servers out there?"*
2. **Offer (Unicast/Broadcast)**: The DHCP Server hears the scream, looks at its pool of available IP addresses, and replies: *"Yes! I can offer you 192.168.1.50."*
3. **Request (Broadcast)**: The laptop officially replies to the network: *"I accept the offer for 192.168.1.50!"*
4. **Acknowledge (Unicast/Broadcast)**: The server formally locks the IP in its database and sends the final ACK, containing the Subnet Mask, Default Gateway, and DNS server IPs.

<Callout icon="info" title="IP Leasing">
  DHCP does not give you an IP address permanently; it **Leases** it to you. A lease might last 24 hours. At the 12-hour mark (50% of the lease), your laptop will silently contact the DHCP server and ask to renew the lease. If you leave the airport, the lease eventually expires, and the server reclaims the IP address to give to a new passenger.
</Callout>

## Static Assignments (Reservations)
Servers and Printers should never change their IP addresses. Instead of manually configuring them, Admins create **DHCP Reservations**. They tell the DHCP server: *"If you ever see a request from MAC Address AA:BB:CC, ALWAYS offer it 192.168.1.100."* This centralizes all IP management into the DHCP server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DNS (Records, Resolution, Zones)/index.mdx': `---
title: DNS (Records, Resolution, Zones)
description: The Domain Name System, a hierarchical, distributed database that translates human-readable hostnames into machine-routable IP addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNS (Records, Resolution, Zones)">

Computers strictly route traffic using IP addresses. Humans are terrible at memorizing IP addresses, so we use domain names like TICK1google.comTICK1. 
**DNS (Layer 7)** is the Phonebook of the Internet. It translates domains into IPs.

## The Recursive Resolution Process

When you type TICK1amazon.comTICK1 into your browser, an incredibly complex lookup occurs in milliseconds:
1. **Local Cache**: Your OS checks its local memory. If it doesn't know the IP, it asks your ISP's Recursive Resolver.
2. **Root Servers**: The Resolver asks the global Root Servers (TICK1.TICK1). The Root server says, *"I don't know the IP, but I know who manages all TICK1.comTICK1 domains. Ask the TLD server."*
3. **TLD Servers**: The Resolver asks the TICK1.comTICK1 Top-Level Domain server. The TLD says, *"I know who registered TICK1amazon.comTICK1. Ask their specific Authoritative Name Server."*
4. **Authoritative Server**: The Resolver asks Amazon's server, which finally replies: *"The IP for TICK1amazon.comTICK1 is 54.239.28.85."*

## DNS Records

An Authoritative Zone file contains different types of records:
- **A Record**: Maps a domain directly to an **IPv4** address.
- **AAAA Record**: Maps a domain directly to an **IPv6** address.
- **CNAME**: An Alias. It maps a domain to another domain (e.g., TICK1www.example.comTICK1 points to TICK1example.comTICK1). *A CNAME can never point directly to an IP.*
- **MX (Mail Exchange)**: Tells the world exactly which server handles incoming emails for this domain.
- **TXT**: Plain text records used heavily today to prove domain ownership and implement email anti-spam security (SPF, DKIM, DMARC).

<Callout icon="warning" title="DNS Propagation">
  Because DNS is distributed globally, resolvers cache answers for a set amount of time known as **TTL (Time to Live)**. If Amazon changes their IP address, but your ISP has a cached TTL of 24 hours, you will be routed to the dead IP address for 24 hours until the cache expires. Admins must lower the TTL to 5 minutes *before* migrating servers.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ICMP/index.mdx': `---
title: ICMP (Internet Control Message Protocol)
description: A core Layer 3 protocol used specifically for diagnostic reporting, error messaging, and network troubleshooting.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ICMP (Internet Control Message Protocol)">

When a router encounters a problem (like a destination being unreachable, or an IP packet's TTL expiring), it needs a way to report the error back to the sender. It cannot use TCP or UDP, because those are Layer 4. 

It uses **ICMP**, which operates firmly at **Layer 3**, right alongside IP. ICMP is the diagnostic messaging system of the Internet.

## Ping (Echo Request/Reply)

The most famous use of ICMP is the TICK1pingTICK1 command.
When you TICK1ping 8.8.8.8TICK1, your computer constructs an **ICMP Type 8 (Echo Request)** message and sends it.
If Google's server is alive, its Kernel intercepts the packet and instantly sends back an **ICMP Type 0 (Echo Reply)**.
By timing how long it took the reply to return, you measure Network Latency.

## Traceroute (Time Exceeded)

The TICK1tracerouteTICK1 command uses ICMP to map the exact path a packet takes across the globe.
1. It sends a packet to Google, but deliberately sets the IP TTL to **1**. 
2. The very first Router it hits subtracts 1 (TTL becomes 0), drops the packet, and sends back an **ICMP Type 11 (Time Exceeded)** error. Now you know the IP of the first router!
3. It sends a second packet with a TTL of **2**. It passes the first router, hits the second router, dies, and returns an ICMP error. Now you know the second router!
4. It repeats this until the packet finally reaches Google.

<Callout icon="info" title="Firewall Blocking">
  Historically, hackers used automated ICMP Pings to scan the internet and map out vulnerable corporate networks. Because of this, it is standard practice today for enterprise firewalls to aggressively drop and ignore all incoming ICMP packets. This is why you can often successfully load a company's website (via TCP Port 443) even though TICK1pingTICK1 says the server is dead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP/index.mdx': `---
title: TCP (Transmission Control Protocol)
description: The highly reliable, connection-oriented Layer 4 protocol that guarantees the perfect delivery of data across the Internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TCP (Transmission Control Protocol)">

When you load a banking website, you cannot have random bits of HTML or JavaScript go missing in transit, or the page will corrupt. You need absolute reliability.

**TCP (Layer 4)** is a connection-oriented protocol that sacrifices speed for absolute perfection. It tracks every single byte of data sent across the network. If a router drops a packet, TCP realizes it is missing, pauses the stream, and forces the sender to retransmit the missing data before continuing.

## The 3-Way Handshake

Before a single byte of application data (like a webpage) can be sent, TCP must establish a strict, synchronized connection using the famous 3-Way Handshake:

1. **SYN (Synchronize)**: The Client sends a packet to the Server requesting a connection.
2. **SYN-ACK (Synchronize-Acknowledge)**: The Server acknowledges the request and sends its own synchronization request back.
3. **ACK (Acknowledge)**: The Client acknowledges the Server's request. 

The connection is now established, and data can flow.

<Callout icon="warning" title="SYN Flood Attacks">
  Because the Server must allocate RAM to remember every half-open connection while waiting for the final ACK, hackers weaponized this. In a SYN Flood attack, a botnet sends millions of SYN requests to a server but never sends the final ACK. The server's RAM fills up with half-open connections, and it crashes, resulting in a Denial of Service (DDoS).
</Callout>

## Sequencing and Flow Control
TCP is brilliant. It numbers every packet using **Sequence Numbers**. If packets arrive completely out of order (because they took different routes across the internet), TCP holds them in RAM and mathematically reassembles them in perfect order before handing them to the Application. 

TCP also utilizes **Windowing** (Flow Control). If the Client is a slow smartphone and the Server is blasting data too fast, the Client will dynamically shrink its "TCP Window", commanding the Server to slow down to prevent data loss.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/UDP/index.mdx': `---
title: UDP (User Datagram Protocol)
description: The blazing fast, connectionless Layer 4 protocol that sacrifices reliability in exchange for absolute minimum latency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="UDP (User Datagram Protocol)">

TCP is perfect, but perfection takes time. The 3-way handshake, sequence tracking, and retransmissions introduce heavy latency. 
If you are playing a fast-paced multiplayer video game or on a live Zoom call, you do not want perfection. If a frame of video is dropped by a router, you don't want TCP to pause the video stream for 500ms to re-download the old frame; you want to immediately see the next frame.

You use **UDP (User Datagram Protocol)**.

## Fire and Forget

UDP is a "Connectionless" protocol. There is no 3-way handshake. There are no sequence numbers. There are no Acknowledgments.

If a server wants to send data via UDP, it simply slaps an IP address on the packet and blasts it onto the network. It has no idea if the packet arrived, if it arrived in the wrong order, or if the destination computer is even turned on. It is "Fire and Forget."

## Primary Use Cases

Because the UDP header is microscopic (8 bytes vs TCP's 20+ bytes), and it requires zero tracking overhead, it is used where speed is the only metric that matters:

1. **Real-Time Streaming**: Voice over IP (VoIP), Zoom, Twitch streaming, and Multiplayer Gaming.
2. **Micro-Transactions**: DNS uses UDP for lookups. When you ask for the IP of TICK1google.comTICK1, setting up a complex TCP handshake would take longer than the actual question. The computer just blasts the UDP question; if it doesn't get an answer in 2 seconds, it blasts it again.
3. **Network Discovery**: DHCP uses UDP to blast its broadcast packets across the local subnet.

<Callout icon="success" title="Application-Layer Reliability">
  Just because UDP is "unreliable" doesn't mean your app is broken. Modern protocols (like the revolutionary **QUIC/HTTP3** protocol built by Google) actually use UDP at Layer 4 for massive speed gains, and then manually implement highly optimized error-checking and reliability directly inside the Application Layer (Layer 7).
</Callout>

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
