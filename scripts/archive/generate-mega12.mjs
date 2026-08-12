import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/OSI model/index.mdx': `---
title: OSI Model
description: The conceptual model that characterizes and standardizes the communication functions of a telecommunication or computing system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="The OSI Model">

The Open Systems Interconnection (OSI) model is a conceptual framework created by the International Organization for Standardization (ISO). It standardizes the functions of a communication system into seven distinct categories, or layers.

<Callout icon="info" title="Why is it important?">
  While the OSI model isn't strictly how modern networks operate (the TCP/IP model is the actual implementation), it remains the universal language used by network engineers and software developers to troubleshoot and discuss network architecture.
</Callout>

## The Seven Layers

The layers are usually numbered 1 through 7, starting from the physical hardware up to the user-facing application. A popular mnemonic to remember them from top to bottom is: **"All People Seem To Need Data Processing"**.

<ComparisonTable 
  headers={['Layer', 'Name', 'Function', 'Examples']}
  rows={[
    ['7', 'Application', 'End-user layer. Network applications and APIs.', 'HTTP, FTP, SMTP, DNS'],
    ['6', 'Presentation', 'Data formatting, encryption, and compression.', 'SSL/TLS, JPEG, ASCII'],
    ['5', 'Session', 'Establishes, manages, and terminates connections.', 'NetBIOS, RPC, Sockets'],
    ['4', 'Transport', 'End-to-end connections, reliability, and flow control.', 'TCP, UDP'],
    ['3', 'Network', 'Logical addressing and routing packets across multiple networks.', 'IPv4, IPv6, ICMP, IPsec'],
    ['2', 'Data Link', 'Physical addressing (MAC) and framing on a single local network.', 'Ethernet, Wi-Fi, Switches'],
    ['1', 'Physical', 'The physical medium transmitting raw bit streams (0s and 1s).', 'Cables, Hubs, Radio Waves']
  ]}
/>

## How Data Moves (Encapsulation)

When you send an email, the data starts at Layer 7 on your computer and moves down to Layer 1. As it moves down, each layer wraps the data with its own specific header information. This process is called **Encapsulation**.

Once the electrical signals reach the receiving computer at Layer 1, it moves back up the stack. Each layer reads its specific header, strips it away, and passes the payload up to the next layer. This is called **De-encapsulation**.

<Callout icon="tip" title="Troubleshooting Tip">
  Network engineers often troubleshoot "from the bottom up." If a user complains a website won't load (Layer 7), you first check if the cable is plugged in (Layer 1), then if they have a valid IP address (Layer 3), then if the DNS port is open (Layer 4), etc.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP/index.mdx': `---
title: Transmission Control Protocol (TCP)
description: A connection-oriented protocol guaranteeing reliable, ordered delivery of data over an IP network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Transmission Control Protocol (TCP)">

The Transmission Control Protocol (TCP) is one of the foundational protocols of the Internet. Operating at Layer 4 (the Transport Layer) of the OSI model, TCP is designed to provide reliable, ordered, and error-checked delivery of a stream of bytes between applications.

<Callout icon="success" title="The Reliable Protocol">
  If you download a file, load a webpage, or send an email, you are using TCP. It ensures that every single byte of data sent is received exactly as it was transmitted, and in the exact correct order. If a packet is lost, TCP automatically requests a retransmission.
</Callout>

## The Three-Way Handshake

Because TCP is a **connection-oriented** protocol, the client and server must establish a formal connection before any actual application data is sent. This is accomplished via the Three-Way Handshake:

1. **SYN (Synchronize)**: The client wants to connect. It sends a SYN packet with a random initial sequence number.
2. **SYN-ACK (Synchronize-Acknowledge)**: The server receives the SYN. It replies with a SYN-ACK packet, acknowledging the client's sequence number and sending its own sequence number.
3. **ACK (Acknowledge)**: The client receives the SYN-ACK and replies with an ACK packet to acknowledge the server's sequence number. 

*Connection is now established.*

<ArchitectureDiagram chart={\`
sequenceDiagram
  participant Client
  participant Server
  Client->>Server: 1. SYN (Seq=100)
  Server->>Client: 2. SYN-ACK (Seq=300, Ack=101)
  Client->>Server: 3. ACK (Seq=101, Ack=301)
\`} />

## Core Features of TCP

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Reliability', 'Uses acknowledgments (ACKs) for every packet. If the sender does not receive an ACK within a timeout period, it retransmits the packet.'],
    ['Ordering', 'Every packet is assigned a Sequence Number. The receiving TCP stack uses these numbers to reassemble the packets in the exact correct order before handing them to the application.'],
    ['Flow Control', 'Ensures the sender doesn\\'t overwhelm the receiver. The receiver advertises a "Window Size" detailing exactly how much data it can currently accept.'],
    ['Congestion Control', 'Ensures the sender doesn\\'t overwhelm the network router infrastructure. TCP automatically slows down transmission if it detects packet loss.']
  ]}
/>

## Teardown (Four-Way Handshake)

When an application is done sending data, the connection is gracefully closed using a four-step process involving **FIN (Finish)** packets, ensuring that all in-flight data is fully received before the socket is destroyed.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/UDP/index.mdx': `---
title: User Datagram Protocol (UDP)
description: A simple, connectionless transport protocol that prioritizes speed over reliability.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="User Datagram Protocol (UDP)">

The User Datagram Protocol (UDP) is a core member of the Internet protocol suite. Operating alongside TCP at the Transport Layer (Layer 4), UDP is a **connectionless** protocol that provides a simple but unreliable message-passing service.

<Callout icon="warning" title="Fire and Forget">
  Unlike TCP, UDP does not establish a connection, does not guarantee delivery, does not guarantee packet order, and does not perform congestion control. It simply blasts packets onto the network as fast as possible.
</Callout>

## Why use an unreliable protocol?

It might seem counterintuitive to use a protocol that routinely loses data. However, TCP's reliability mechanisms (handshakes, acknowledgments, retransmissions, flow control) introduce significant **latency** (delay) and **overhead**.

UDP is used when speed is strictly more important than perfect accuracy.

### Common Use Cases:

1. **Real-Time Video/Audio Streaming**: If you lose a frame in a video call, it is better for the screen to glitch for a millisecond than to pause the entire call waiting for that specific frame to be retransmitted.
2. **Online Gaming**: First-person shooters require instant state updates. Old positional data is useless; only the newest packet matters.
3. **DNS (Domain Name System)**: DNS requests are tiny (often a single packet). Establishing a 3-way TCP handshake just to send one packet is incredibly inefficient.

## TCP vs UDP Comparison

<ComparisonTable 
  headers={['Feature', 'TCP (Transmission Control Protocol)', 'UDP (User Datagram Protocol)']}
  rows={[
    ['Connection', 'Connection-Oriented (3-way handshake)', 'Connectionless (Fire and forget)'],
    ['Reliability', 'Guarantees delivery (retransmits lost data)', 'No guarantees (packet loss is ignored)'],
    ['Ordering', 'Guarantees packets arrive in order', 'Packets may arrive completely out of order'],
    ['Overhead', 'High (20-byte header, ACKs)', 'Low (8-byte header, no ACKs)'],
    ['Speed', 'Slower (due to overhead and flow control)', 'Blazing fast'],
    ['Examples', 'HTTP/HTTPS, SSH, FTP, Email (SMTP)', 'VoIP, Video Streaming, DNS, DHCP']
  ]}
/>

## UDP in the Modern Era: QUIC & HTTP/3

Historically, the web ran exclusively on TCP (via HTTP/1.1 and HTTP/2). However, modern web architecture is shifting. **HTTP/3** is built on top of a new protocol called **QUIC**.

QUIC is built on top of UDP. It utilizes UDP's speed to bypass the slow TCP handshakes, but implements its own custom reliability and congestion control mechanisms at the application layer, giving developers the best of both worlds.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IP/index.mdx': `---
title: Internet Protocol (IP)
description: The principal communications protocol for relaying datagrams across network boundaries, establishing the Internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Internet Protocol (IP)">

The Internet Protocol (IP) is the foundational routing protocol of the entire Internet. Operating at the Network Layer (Layer 3) of the OSI model, IP is responsible for addressing hosts and routing packets from a source network to a destination network.

<Callout icon="info" title="The Postal Service of the Internet">
  If TCP is the certified mail process that guarantees delivery, IP is the actual postal service network. It puts the sender's address and the receiver's address on the envelope (packet) and figures out which roads (routers) to take to get the envelope to the right city.
</Callout>

## The Role of IP

IP has two primary responsibilities:

1. **Addressing**: Every device connected to an IP network must have a unique IP address. This acts as the logical identifier for the device.
2. **Routing**: When a packet is sent to an IP address outside of the local network, routers inspect the destination IP address in the packet header and use routing tables to forward the packet closer to its final destination.

## Connectionless and Unreliable

Crucially, the Internet Protocol itself is **connectionless** and provides **"best-effort"** delivery. 
- It does not establish a connection before sending.
- It does not guarantee that the packet will arrive.
- It does not guarantee that packets will arrive in the correct order.

Reliability is strictly the responsibility of the upper-layer protocol (like TCP). If you use UDP over IP, the entire transmission is completely unreliable.

## The IP Packet Header

When data from the Transport layer (TCP/UDP) comes down to the Network layer, IP encapsulates it by adding an IP Header. This header contains vital routing information.

Key fields in an IPv4 header include:
- **Source IP Address**: The sender's logical address.
- **Destination IP Address**: The receiver's logical address.
- **Time to Live (TTL)**: A counter that decrements by 1 every time the packet passes through a router. If TTL hits 0, the packet is destroyed. This prevents packets from looping infinitely if there is a routing error.
- **Protocol**: Indicates what layer 4 protocol is inside the payload (e.g., 6 for TCP, 17 for UDP).

## Versions: IPv4 vs IPv6

The Internet currently operates on two versions of IP simultaneously:
- **IPv4**: The original standard. Uses 32-bit addresses (e.g., \`192.168.1.1\`). It mathematically ran out of unique addresses years ago, but is kept alive via NAT (Network Address Translation).
- **IPv6**: The modern replacement. Uses 128-bit addresses (e.g., \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`), providing enough unique addresses for every atom on the surface of the earth.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv4/index.mdx': `---
title: IPv4 (Internet Protocol version 4)
description: The fourth version of the Internet Protocol, utilizing 32-bit addresses.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="IPv4 (Internet Protocol version 4)">

IPv4 is the fourth version of the Internet Protocol and the core protocol that routes most traffic on the Internet today. Developed in the early 1980s by DARPA, it establishes the fundamental rules for addressing and routing packets across complex networks.

<Callout icon="error" title="The Exhaustion Crisis">
  IPv4 uses a 32-bit address space, which mathematically allows for exactly $2^{32}$ (4,294,967,296) unique addresses. In the 1980s, four billion seemed like an infinite number. Today, every smartphone, smart TV, and refrigerator needs an IP. The final blocks of new IPv4 addresses were officially depleted in 2011.
</Callout>

## Addressing and Notation

An IPv4 address is 32 bits long. To make it readable for humans, it is divided into four 8-bit octets and written in **dotted-decimal notation**.

For example, the binary address:
\`11000000.10101000.00000001.00001010\`
Translates to the decimal address:
\`192.168.1.10\`

Each decimal number can range from 0 to 255.

## Network and Host Portions

Every IPv4 address is mathematically split into two parts:
1. **The Network ID**: Identifies the specific network (the "street name").
2. **The Host ID**: Identifies the specific device on that network (the "house number").

The **Subnet Mask** is what tells the computer which part is the network and which part is the host. 

## Private vs Public IP Addresses

To delay the exhaustion of the 4 billion addresses, the IETF created RFC 1918, which reserved specific blocks of IPv4 addresses for **Private Networks**.

<ComparisonTable 
  headers={['Class', 'Private Range', 'Default Subnet Mask']}
  rows={[
    ['Class A', '10.0.0.0 to 10.255.255.255', '255.0.0.0 (/8)'],
    ['Class B', '172.16.0.0 to 172.31.255.255', '255.255.0.0 (/16)'],
    ['Class C', '192.168.0.0 to 192.168.255.255', '255.255.255.0 (/24)']
  ]}
/>

Private IP addresses are not routable on the public internet. You can use \`192.168.1.5\` in your house, and your neighbor can use the exact same IP in their house. When your traffic needs to access the internet, your home router uses **NAT (Network Address Translation)** to translate your private IP into the single Public IP assigned to you by your ISP.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv6/index.mdx': `---
title: IPv6 (Internet Protocol version 6)
description: The most recent version of the Internet Protocol, featuring a massive 128-bit address space.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="IPv6 (Internet Protocol version 6)">

IPv6 is the most recent version of the Internet Protocol (IP). It was developed by the IETF to deal with the long-anticipated problem of IPv4 address exhaustion. While adoption has taken over two decades, IPv6 now handles a significant portion of global internet traffic.

<Callout icon="success" title="Practically Infinite Addresses">
  IPv6 utilizes a 128-bit address length (compared to IPv4's 32-bit). This allows for $2^{128}$ unique addresses, or approximately $3.4 \\times 10^{38}$. That is enough to assign a unique IP address to every single atom on the surface of the Earth, with enough left over for 100 more Earths.
</Callout>

## Addressing and Notation

Because they are 128 bits long, writing IPv6 addresses in decimal would be unreadable. Instead, they are represented as eight groups of four **hexadecimal** digits, separated by colons.

Example: \`2001:0db8:0000:0000:0000:8a2e:0370:7334\`

To make writing them easier, there are two strict abbreviation rules:
1. **Omit Leading Zeros**: You can drop leading zeros in any group. (\`0db8\` becomes \`db8\`, \`0000\` becomes \`0\`).
2. **Double Colon**: You can replace one contiguous sequence of blocks containing only zeros with a double colon (\`::\`). This can only be used once per address.

Applying the rules to the example above:
Result: \`2001:db8::8a2e:370:7334\`

## Key Advantages Over IPv4

<ComparisonTable 
  headers={['Feature', 'IPv4', 'IPv6']}
  rows={[
    ['Address Space', '32-bit (4.3 Billion)', '128-bit (340 Undecillion)'],
    ['NAT Requirement', 'Requires NAT to survive exhaustion.', 'No NAT required. Every device can have a public, routable IP.'],
    ['Security', 'IPsec is optional and often difficult to configure.', 'IPsec is built-in to the protocol standard (though technically optional in newer RFCs, it is native).'],
    ['Header Complexity', 'Complex, variable length header with checksums.', 'Simplified, fixed-length header for faster router processing (no header checksums required).'],
    ['Configuration', 'Requires DHCP servers to assign addresses.', 'Supports SLAAC (Stateless Address Autoconfiguration). Devices can generate their own IP address using the router prefix and their MAC address.']
  ]}
/>

## The Transition Period

IPv4 and IPv6 are not naturally interoperable. An IPv4-only device cannot talk directly to an IPv6-only device. To facilitate the transition, networks run **Dual-Stack** configurations, where network interfaces are assigned both an IPv4 and an IPv6 address simultaneously, utilizing whichever protocol the destination supports.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/MAC addresses/index.mdx': `---
title: MAC Addresses
description: Media Access Control addresses, the unique physical identifiers for network interfaces on local segments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="MAC Addresses">

A Media Access Control (MAC) address is a unique identifier assigned to a Network Interface Controller (NIC) for use as a network address in communications within a network segment. They operate at the Data Link layer (Layer 2) of the OSI model.

<Callout icon="info" title="Physical vs Logical">
  Think of a **MAC address** like a person's Social Security Number (or national ID)—it is hardcoded at birth by the manufacturer and never changes, no matter where they travel. Think of an **IP address** like a mailing address—it changes depending on what city (network) you currently reside in.
</Callout>

## Format and Structure

A MAC address is a 48-bit number, typically represented as six groups of two hexadecimal digits, separated by hyphens or colons.

Example: \`00:1A:2B:3C:4D:5E\`

The 48 bits are divided into two distinct halves:
1. **OUI (Organizationally Unique Identifier)**: The first 24 bits (\`00:1A:2B\`) identify the manufacturer of the hardware (e.g., Cisco, Apple, Intel). The IEEE manages these assignments.
2. **NIC Specific**: The last 24 bits (\`3C:4D:5E\`) are uniquely assigned by the manufacturer to that specific piece of hardware.

## How MAC Addresses Are Used

When a computer wants to send data to another computer, the IP address (Layer 3) is used to route the packet across the global internet. 

However, once the packet arrives at the destination's local router, the router doesn't use IP to get it to the final computer. It uses Ethernet or Wi-Fi (Layer 2). The router must encapsulate the IP packet inside an Ethernet Frame. The header of this Ethernet Frame requires the **Destination MAC Address** of the target computer.

### ARP (Address Resolution Protocol)

How does a router know the MAC address of the target computer if it only has the IP address? It uses ARP.

1. The router shouts (broadcasts) to every device on the local network: *"Who has IP 192.168.1.50? Tell me your MAC address!"*
2. The specific device with that IP replies: *"I am 192.168.1.50, and my MAC is AA:BB:CC:DD:EE:FF."*
3. The router saves this in its ARP Cache and forwards the frame.

## MAC Spoofing and Randomization

While a MAC address is permanently burned into the physical hardware chip (the BIA or Burned-In Address), the operating system handles the actual communication. 

Modern operating systems (iOS, Android, Windows) now feature **MAC Randomization**. When connecting to public Wi-Fi networks (like a coffee shop), the OS generates a fake, random MAC address to prevent tracking companies from monitoring your physical location across different stores.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Subnetting/index.mdx': `---
title: Subnetting
description: The practice of dividing a single large IP network into multiple smaller, manageable logical sub-networks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Subnetting">

Subnetting is the practice of dividing a single, large logical network into multiple smaller, independent sub-networks (subnets). It is one of the most fundamental mathematical skills required for network engineering.

<Callout icon="success" title="Why Subnet?">
  1. **Performance**: A subnet acts as a boundary for broadcast traffic. Without subnets, an ARP broadcast would interrupt every single device in a massive corporate network.
  2. **Security**: You can put the HR department on a separate subnet from the Guest Wi-Fi and use a router/firewall to strictly control traffic between them.
  3. **Efficiency**: It prevents the waste of IP addresses.
</Callout>

## The Subnet Mask

An IPv4 address (e.g., \`192.168.1.10\`) does not know where the network ends and the host begins. The **Subnet Mask** provides this boundary.

A standard mask like \`255.255.255.0\` (represented in binary as 24 ones followed by 8 zeros) tells the computer: *"The first 24 bits are the Network ID, the last 8 bits are the Host ID."*

## CIDR Notation

Instead of writing out \`255.255.255.0\`, engineers use Classless Inter-Domain Routing (CIDR) notation. CIDR simply counts the number of binary "1"s in the mask.
- \`255.0.0.0\` = \`/8\`
- \`255.255.0.0\` = \`/16\`
- \`255.255.255.0\` = \`/24\`

## The Mechanics of Subnetting (Borrowing Bits)

Imagine you are given the network \`192.168.1.0/24\`. This gives you 1 network with 256 addresses (254 usable for devices, 1 for network ID, 1 for broadcast).

If you want to create two separate networks (e.g., one for Sales, one for Engineering), you must "borrow" bits from the Host portion and give them to the Network portion.

1. You change the mask from \`/24\` to \`/25\`. 
2. You borrowed 1 bit. $2^1 = 2$. You now have **2 subnets**.
3. You have 7 bits remaining for hosts. $2^7 - 2 = 126$. You now have **126 usable hosts per subnet**.

The two new networks are:
- **Subnet A**: \`192.168.1.0/25\` (Hosts: .1 to .126)
- **Subnet B**: \`192.168.1.128/25\` (Hosts: .129 to .254)

## Essential Formulas

If $N$ is the number of borrowed network bits, and $H$ is the number of remaining host bits:
- **Number of created subnets** = $2^N$
- **Number of usable hosts per subnet** = $2^H - 2$

<Callout icon="warning" title="The Minus 2 Rule">
  Why subtract 2 when calculating hosts? In every IPv4 subnet, the very first IP address (all binary 0s in the host portion) is reserved as the **Network Address**, and the very last IP address (all binary 1s in the host portion) is reserved as the **Broadcast Address**. You cannot assign these to a computer.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DHCP/index.mdx': `---
title: Dynamic Host Configuration Protocol (DHCP)
description: A network management protocol used to automate the process of configuring devices on IP networks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Dynamic Host Configuration Protocol (DHCP)">

The Dynamic Host Configuration Protocol (DHCP) is an application-layer protocol used to automate the assignment of IP addresses, subnet masks, default gateways, and other IP parameters to devices on a network. 

<Callout icon="info" title="Life Before DHCP">
  Before DHCP, network administrators had to walk to every single computer in an office, open the network settings, and manually type in a static IP address, ensuring they never accidentally typed the same address twice. DHCP made "plug and play" networking a reality.
</Callout>

## The D.O.R.A. Process

When a device (client) connects to a network (like plugging in an Ethernet cable or joining Wi-Fi), it doesn't have an IP address, so it cannot communicate normally. It must use broadcasts to find a DHCP server through a four-step process known as DORA:

<ComparisonTable 
  headers={['Step', 'Action', 'Transmission Type']}
  rows={[
    ['1. Discover', 'Client shouts: "I am new here (MAC: AA:BB...). Is there a DHCP server out there?"', 'Broadcast (from 0.0.0.0 to 255.255.255.255)'],
    ['2. Offer', 'DHCP Server replies: "I am here! I can offer you the IP address 192.168.1.50."', 'Unicast (or Broadcast depending on OS)'],
    ['3. Request', 'Client replies: "I accept your offer. Please lease me 192.168.1.50."', 'Broadcast (so any other DHCP servers know the offer was accepted)'],
    ['4. Acknowledge', 'DHCP Server replies: "Confirmed. The IP is yours. Here is your Subnet Mask, Gateway, and DNS server."', 'Unicast']
  ]}
/>

## Leases and Renewals

DHCP does not grant IP addresses permanently; it "leases" them. The administrator configures a lease time (e.g., 24 hours, or 7 days). 

- **T1 Timer (50%)**: When the lease time is halfway over, the client quietly contacts the specific DHCP server that gave it the address and asks to renew it. 
- **T2 Timer (87.5%)**: If the original server is offline, the client waits until the lease is 87.5% expired, and then begins broadcasting to *any* DHCP server asking for a renewal.
- **Expiration**: If the lease expires completely, the client must immediately stop using the IP address and drop off the network.

## DHCP Reservations

Sometimes you want the automation of DHCP, but you need a device (like a network printer or a server) to always have the exact same IP address so users can reliably find it. Administrators can create a **DHCP Reservation**. They map the printer's MAC address to a specific IP in the DHCP server. Every time that printer connects and performs a Discover, the server always Offers that exact reserved IP.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/NAT/index.mdx': `---
title: Network Address Translation (NAT)
description: A method of mapping private IP addresses to a public IP address before transferring the information.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Network Address Translation (NAT)">

Network Address Translation (NAT) is a process in which one or more local IP addresses are translated into one or more Global IP addresses and vice versa in order to provide Internet access to local hosts. It is most commonly implemented on a router or firewall.

<Callout icon="success" title="The Savior of IPv4">
  NAT was originally designed as a temporary band-aid to slow down the exhaustion of the IPv4 address space. By allowing millions of homes and businesses to hide hundreds of internal devices behind a single public IP address, NAT single-handedly kept the IPv4 internet alive for the last two decades.
</Callout>

## How NAT Works

Imagine a home network. You have a laptop (\`192.168.1.10\`) and a phone (\`192.168.1.11\`). Your ISP gave your router exactly one public IP address (\`203.0.113.5\`).

1. Your laptop wants to load \`google.com\`. It generates a packet with Source IP: \`192.168.1.10\` and sends it to the router.
2. The router receives the packet. It knows that \`192.168.x.x\` is a private, unroutable address. The internet would drop it.
3. The router performs **Translation**. It strips out the laptop's private source IP and replaces it with its own public IP (\`203.0.113.5\`). 
4. The router records this swap in its **NAT Translation Table** so it remembers who asked for the data.
5. The packet goes to Google. Google replies to the public IP (\`203.0.113.5\`).
6. The router receives the reply, looks at its NAT table, realizes the payload is meant for the laptop, translates the destination IP back to \`192.168.1.10\`, and delivers it.

## PAT (Port Address Translation) / NAT Overload

The scenario described above explains how a router masks an IP, but how does it handle the laptop and the phone browsing Google at the exact same time? If Google replies to the router's public IP, how does the router know if the packet goes to the laptop or the phone?

It solves this using **PAT (Port Address Translation)**, which is technically what almost all home and corporate routers actually use (often just called "NAT Overload").

In PAT, the router doesn't just translate the IP address; it translates the **Source Port** at Layer 4.
- Laptop asks Google -> Router translates Source IP to \`203.0.113.5\` and Source Port to \`50001\`.
- Phone asks Google -> Router translates Source IP to \`203.0.113.5\` and Source Port to \`50002\`.

When Google replies to port \`50001\`, the NAT table knows exactly which internal IP requested it.

## The Side Effect: Security

Because internal IP addresses are hidden from the outside world, NAT inadvertently acts as a primitive firewall. A hacker on the internet cannot initiate a connection directly to your laptop (\`192.168.1.10\`) because that address is non-routable. Unless you configure "Port Forwarding" on your router to explicitly let traffic inside, all unsolicited inbound traffic hitting the NAT router is dropped.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP/index.mdx': `---
title: Hypertext Transfer Protocol (HTTP)
description: The foundational application layer protocol for distributed, collaborative, hypermedia information systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Hypertext Transfer Protocol (HTTP)">

The Hypertext Transfer Protocol (HTTP) is the foundation of data communication for the World Wide Web. It is an application-layer (Layer 7) protocol used to transmit hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers.

<Callout icon="info" title="Stateless Protocol">
  HTTP is a **stateless** protocol. This means the server does not keep any data (state) between two requests. If you request page A and then page B, the server has no idea it is the same user. This is why technologies like HTTP Cookies were invented—to inject stateful sessions into a stateless protocol.
</Callout>

## The Request-Response Cycle

HTTP functions as a request-response protocol in the client-server computing model. 
1. The **Client** (e.g., Chrome) opens a TCP connection to the server (port 80) and sends an HTTP Request message.
2. The **Server** processes the request and returns an HTTP Response message containing the requested resource (or an error), and then closes the connection (or keeps it alive in newer HTTP versions).

## HTTP Methods (Verbs)

When a client sends a request, it must specify an action to be performed using an HTTP Method. The most common are often mapped to CRUD (Create, Read, Update, Delete) operations in REST APIs:

<ComparisonTable 
  headers={['Method', 'Action', 'CRUD Equivalent']}
  rows={[
    ['GET', 'Requests a representation of the specified resource. Should only retrieve data.', 'Read'],
    ['POST', 'Submits data to be processed to a specified resource.', 'Create'],
    ['PUT', 'Replaces all current representations of the target resource with the request payload.', 'Update (Full)'],
    ['PATCH', 'Applies partial modifications to a resource.', 'Update (Partial)'],
    ['DELETE', 'Deletes the specified resource.', 'Delete']
  ]}
/>

## HTTP Status Codes

When the server responds, it includes a 3-digit status code indicating the result of the request. These are universally standardized into 5 classes:

- **1xx (Informational)**: Request received, continuing process.
- **2xx (Successful)**: The request was successfully received, understood, and accepted. *(e.g., 200 OK, 201 Created)*
- **3xx (Redirection)**: Further action needs to be taken in order to complete the request. *(e.g., 301 Moved Permanently)*
- **4xx (Client Error)**: The request contains bad syntax or cannot be fulfilled (the client messed up). *(e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found)*
- **5xx (Server Error)**: The server failed to fulfill an apparently valid request (the server messed up). *(e.g., 500 Internal Server Error, 502 Bad Gateway)*

## Structure of a Message

An HTTP message (both request and response) consists of:
1. **Start Line**: Method + Path + Version (Request) OR Version + Status Code + Status Text (Response).
2. **Headers**: Key-value pairs providing metadata (e.g., \`Host: google.com\`, \`Content-Type: application/json\`).
3. **Empty Line**: Separates headers from the body.
4. **Body**: The actual payload (e.g., HTML text, JSON data, image binary). Optional for some requests like GET.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTPS/index.mdx': `---
title: HTTPS (HTTP Secure)
description: An extension of HTTP that uses encryption for secure communication over a computer network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="HTTPS (HTTP Secure)">

HTTPS (Hypertext Transfer Protocol Secure) is an extension of the standard HTTP protocol. It is used for secure communication over a computer network and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS), formerly known as Secure Sockets Layer (SSL).

<Callout icon="warning" title="Why HTTP isn't enough">
  Standard HTTP transmits all data—including passwords, credit card numbers, and session cookies—in plain text. Anyone positioned between your computer and the server (e.g., on a public Wi-Fi network, or a malicious ISP) can read everything using a packet sniffer. HTTPS mathematically encrypts this data.
</Callout>

## The Three Pillars of TLS

When you connect to a website via HTTPS, the underlying TLS protocol guarantees three things:

1. **Encryption**: Data exchanged is encrypted to keep it safe from eavesdroppers. If intercepted, it looks like random noise.
2. **Authentication**: Proves that the website you are communicating with is actually who it claims to be (preventing Man-in-the-Middle attacks).
3. **Data Integrity**: Detects if the data has been altered or corrupted during transfer, either intentionally or accidentally.

## How the TLS Handshake Works

Before any HTTP data is sent, the client and server must establish secure encryption keys. Because they are communicating over a public network, they use **Asymmetric Cryptography** (Public/Private keys) to safely agree on a shared **Symmetric Key** for the rest of the session.

1. **Client Hello**: The browser connects to the server (Port 443) and says, "Let's talk securely. Here are the cipher suites I support."
2. **Server Hello & Certificate**: The server chooses a cipher suite and sends back its Digital Certificate. This certificate contains the server's Public Key and is digitally signed by a trusted Certificate Authority (CA) like Let's Encrypt or DigiCert.
3. **Verification**: The browser checks the certificate's signature against its internal list of trusted CAs. If it matches, the browser trusts the server's Public Key.
4. **Key Exchange**: The browser generates a random "session key" (symmetric key), encrypts it using the server's Public Key, and sends it to the server.
5. **Decryption**: The server receives the encrypted session key and decrypts it using its closely guarded Private Key. 

*Both parties now have the exact same symmetric session key, and nobody listening in could have intercepted it. All subsequent HTTP traffic is encrypted using this fast symmetric key.*

<ArchitectureDiagram chart={\`
sequenceDiagram
  participant Browser
  participant Server
  Browser->>Server: 1. TCP 3-Way Handshake
  Browser->>Server: 2. Client Hello (Supported Ciphers)
  Server->>Browser: 3. Server Hello + Certificate (Public Key)
  Browser->>Browser: 4. Verify Certificate with OS Trust Store
  Browser->>Server: 5. Encrypt random Session Key with Public Key
  Server->>Server: 6. Decrypt with Private Key
  Browser->>Server: 7. Encrypted HTTP Request (using Session Key)
\`} />

## Certificates and Authorities

The entire system relies on a chain of trust. Your operating system and browser come pre-installed with "Root Certificates" belonging to major Certificate Authorities (CAs). If a website's certificate is not signed by a CA that your browser trusts (e.g., a self-signed certificate), your browser will display a massive red warning page indicating the connection is not private.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/BGP/index.mdx': `---
title: Border Gateway Protocol (BGP)
description: The core routing protocol of the Internet, making routing decisions across multiple autonomous systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Border Gateway Protocol (BGP)">

The Border Gateway Protocol (BGP) is the routing protocol of the global Internet. While interior routing protocols (like OSPF or EIGRP) find the best path *within* a single corporate network, BGP is the protocol that allows different massive networks (like Comcast, AT&T, and Google) to route traffic *between* each other.

<Callout icon="info" title="The Map of the Internet">
  There is no central server that knows the entire layout of the Internet. The Internet is decentralized. BGP is the mechanism by which thousands of independent networks constantly gossip with their neighbors to collectively draw the map of how to reach every IP address on Earth.
</Callout>

## Autonomous Systems (AS)

The Internet is an interconnected web of "Autonomous Systems." An AS is a massive network (or group of networks) operated by a single massive entity, like an Internet Service Provider (ISP), a large university, or a massive tech company. 

Every AS is assigned a globally unique number called an **ASN (Autonomous System Number)**. 
- AS15169 = Google
- AS7922 = Comcast

BGP routers sit at the very edge (border) of these networks. Their job is to talk to the BGP routers in neighboring ASes.

## Path Vector Protocol

BGP is a **Path Vector** protocol. When a BGP router advertises a route to an IP address, it doesn't just say "I know how to get there." It provides the exact sequence of ASNs that the traffic will pass through to get there.

Example Advertisement: *"To reach the IPs 8.8.8.0/24, send traffic to me. The path is AS7922 -> AS3356 -> AS15169."*

Because the entire AS path is included, BGP mathematically prevents routing loops. If a router sees its own ASN in the path, it immediately drops the advertisement, knowing it would cause an infinite loop.

## The BGP Decision Process

When a router receives multiple different paths to the same destination, how does it choose the "best" one? Unlike interior protocols that look at link speed (bandwidth) or delay, BGP does not care about speed. BGP routes based on **Policy and Economics**.

A typical AS will prefer routes in this order:
1. **Local Preference (Economics)**: Did we manually configure a preference? (e.g., Always send traffic through Provider A because our contract with them is cheaper than Provider B).
2. **AS Path Length**: If all else is equal, choose the route that traverses the fewest number of Autonomous Systems.
3. **MED (Multi-Exit Discriminator)**: A suggestion from a neighboring AS on which entry point they prefer you use.

<Callout icon="error" title="BGP Hijacking (The Weakness)">
  BGP was designed in the 1980s based on absolute trust. If an ISP accidentally (or maliciously) broadcasts to the world, "I am the best route to YouTube's IP addresses," other routers will believe it and blindly forward all YouTube traffic to them, effectively taking YouTube offline. This is called a BGP Hijack. Modern security mechanisms like RPKI are being slowly rolled out to cryptographically verify BGP routes.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/CDNs/index.mdx': `---
title: Content Delivery Networks (CDNs)
description: A geographically distributed network of proxy servers that cache content close to end users.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Content Delivery Networks (CDNs)">

A Content Delivery Network (CDN) is a geographically distributed group of servers that work together to provide fast delivery of Internet content. By caching assets closer to the physical location of users, CDNs drastically reduce load times, save bandwidth costs, and protect against malicious traffic.

<Callout icon="success" title="The Speed of Light Limitation">
  Data cannot travel faster than the speed of light. If a user in Tokyo requests an image from a server in New York, the physical distance guarantees latency. A CDN solves this by storing a copy of that image on a server located *in Tokyo*.
</Callout>

## How a CDN Works

When a website utilizes a CDN (like Cloudflare, Akamai, or AWS CloudFront), the DNS configuration is changed so that all user requests hit the CDN's servers first, rather than the website's main "Origin Server."

1. **The Edge**: The CDN operates hundreds of Points of Presence (PoPs) or "Edge Servers" in data centers around the world.
2. **The Cache**: When a user requests a static asset (like an image, CSS file, or video), the Edge Server closest to them checks its local cache.
3. **The Hit**: If the asset is in the cache, the CDN serves it immediately. The Origin Server never even knows the request happened.
4. **The Miss**: If the asset is missing or expired, the CDN fetches it from the Origin Server, serves it to the user, and caches a copy for the next user.

<ArchitectureDiagram chart={\`
graph LR
  User_Tokyo((User in Tokyo)) --> CDN_Tokyo[CDN Edge Server Tokyo]
  User_London((User in London)) --> CDN_London[CDN Edge Server London]
  
  CDN_Tokyo -. "Cache Miss (Fetch)" .-> Origin[Origin Server in NY]
  CDN_London -. "Cache Miss (Fetch)" .-> Origin
  
  CDN_Tokyo -- "Cache Hit (Fast)" --> User_Tokyo
\`} />

## BGP Anycast

How does a user in Tokyo magically connect to the Tokyo server, while a user in London connects to the London server using the exact same domain name? CDNs use a networking technique called **Anycast**.

In standard Unicast, one IP address points to exactly one server. In Anycast, the CDN assigns the *exact same IP address* to every single edge server in the world. They use the BGP routing protocol to broadcast this IP from hundreds of locations. When a user requests that IP, the global internet routing infrastructure automatically delivers the packet to the physically closest server announcing that IP address.

## Benefits Beyond Speed

While latency reduction is the primary goal, modern CDNs act as critical infrastructure for enterprise websites:
- **DDoS Protection**: A massive botnet attack will hit the CDN's edge network, which is large enough to absorb terabits of malicious traffic, shielding the fragile origin server.
- **TLS Termination**: The computationally expensive process of decrypting HTTPS traffic is handled by the CDN edge.
- **Bandwidth Savings**: Web hosting providers charge for data exiting their servers (egress). Because the CDN handles 90%+ of traffic via cache hits, origin hosting costs drop significantly.

</TechnologyTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log(`Wrote ${filePath}`)
  }
}

main().catch(console.error)
