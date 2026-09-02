import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ARP/index.mdx',
    content: `---
title: ARP (Address Resolution Protocol)
description: "A crucial network protocol used to map logical IP addresses to physical MAC addresses on a local area network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="ARP (Address Resolution Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**ARP (Address Resolution Protocol)** is the vital bridge between the Network Layer (Layer 3 - IP addresses) and the Data Link Layer (Layer 2 - MAC addresses) of the OSI model. 

When a computer wants to send data to another computer on the same local network, it knows the target's IP address (like TICK1192.168.1.50TICK1), but network switches don't understand IP addresses—they only understand physical hardware MAC addresses (like TICK100:1A:2B:3C:4D:5ETICK1). ARP is the protocol used to ask the network: *"Who has this IP address? Please tell me your MAC address."*

## 1. Deep Dive & Mechanics

ARP operates strictly within the boundaries of a single Local Area Network (LAN). It cannot cross routers. 

When Host A wants to communicate with Host B:
1. **ARP Cache Check:** Host A first checks its local ARP cache (a temporary table in RAM mapping IP to MAC). If found, it uses it.
2. **ARP Request:** If not found, Host A broadcasts an ARP Request frame to the entire network. The destination MAC is the broadcast address (TICK1FF:FF:FF:FF:FF:FFTICK1). The message essentially says: *"If your IP is 192.168.1.50, reply to me."*
3. **ARP Reply:** All devices receive the broadcast, but only Host B (who owns that IP) processes it. Host B sends a **unicast** ARP Reply directly back to Host A saying: *"I am 192.168.1.50, and my MAC is 00:1A:2B..."*
4. **Caching:** Host A caches this mapping so it doesn't have to broadcast again for subsequent packets.

## 2. Mathematical / Theoretical Foundation

The ARP protocol is inherently **stateless** and **unauthenticated**. This theoretical design flaw stems from the early days of the internet when networks were small and trusted. 

Because it is stateless, a machine does not need to actually send an ARP Request to accept an ARP Reply. If a machine receives a gratuitous ARP Reply, it will simply overwrite its local ARP cache with the new data. This lack of cryptographic verification leads directly to $O(1)$ effort for an attacker to poison a target's routing path on a LAN.

## 3. Real-World Implementation

You can interact with your operating system's ARP cache via the command line.

TICK3bash
# View the current ARP table (works on Linux, Windows, and macOS)
arp -a

# Output example:
# ? (192.168.1.1) at 00:14:22:01:23:45 on en0 ifscope [ethernet]
# ? (192.168.1.15) at a4:5e:60:dc:4f:b1 on en0 ifscope [ethernet]

# Clear the ARP cache (requires admin/root privileges)
# Useful if a device's IP changed but your PC is still trying to talk to the old MAC
sudo arp -d -a

# On modern Linux (iproute2 suite), 'ip neigh' is preferred over 'arp'
ip neigh show
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Host A (192.168.1.10)
    participant Switch
    participant Host B (192.168.1.50)

    Note over Host A (192.168.1.10): Wants to ping 192.168.1.50
    Host A->>Switch: [BROADCAST] ARP Request: Who has 192.168.1.50?
    Switch->>Host B: Forwards Broadcast
    Note over Host B (192.168.1.50): Recognizes its own IP
    Host B-->>Switch: [UNICAST] ARP Reply: I am 192.168.1.50 (MAC: B1:B2...)
    Switch-->>Host A: Forwards Unicast Reply
    Note over Host A (192.168.1.10): Updates ARP Cache, begins sending IP packets
TICK3

## 5. Interview Prep

**Q: What is ARP Spoofing (or ARP Poisoning)?**
**A:** ARP spoofing is a Man-in-the-Middle (MitM) attack. Because ARP is stateless and unauthenticated, an attacker on the local network continuously broadcasts forged ARP Replies telling the victim's PC that the attacker's MAC address belongs to the Default Gateway (the router). The victim updates its cache and unknowingly sends all its internet traffic through the attacker's machine.

**Q: Does IPv6 use ARP?**
**A:** No. IPv6 eliminates ARP entirely. Instead, it relies on the **Neighbor Discovery Protocol (NDP)**, which operates using ICMPv6 and multicast rather than layer-2 broadcasts. NDP is more efficient and can be secured using IPSec (Secure Neighbor Discovery - SEND).

**Q: What is a Gratuitous ARP?**
**A:** A Gratuitous ARP is an ARP Request or Reply that is not prompted by a need to resolve an IP address, but is instead broadcasted by a device to announce or update its IP-to-MAC mapping to the rest of the network. This is heavily used in High Availability (HA) firewall failovers, so when the backup firewall takes over the primary's IP, it forces all switches to update their MAC tables instantly.

## 6. Production Use Cases

- **High Availability (HA) Failover:** Using VRRP (Virtual Router Redundancy Protocol). When a primary router dies, the secondary router assumes the virtual IP address and fires off a Gratuitous ARP to the switch, seamlessly redirecting traffic to itself in milliseconds.
- **Wake-on-LAN (WoL):** Network administrators often need to maintain static ARP entries in their routers so they can send magic WoL packets to computers that are powered off and thus cannot respond to dynamic ARP requests.

<Callout icon="warning" title="Broadcast Storms">
Because ARP requests use the broadcast address, they are sent to every single port on a switch. In massive, unsegmented networks (a single giant VLAN), the sheer volume of background ARP requests from thousands of devices can consume significant CPU and bandwidth, leading to degraded network performance. This is why segmenting networks into smaller subnets/VLANs is critical.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/CIDR/index.mdx',
    content: `---
title: CIDR (Classless Inter-Domain Routing)
description: "A method of allocating IP addresses and IP routing that replaces the legacy Class-based network architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="CIDR (Classless Inter-Domain Routing)">
      {children}
    </ConceptTemplate>
  )
}

**CIDR (Classless Inter-Domain Routing)** is the modern standard for defining and organizing IP networks. Introduced in 1993, CIDR was created to solve a massive impending crisis: the internet was running out of IP addresses due to the immense waste caused by the legacy "Classful" network system (Class A, B, and C networks).

Instead of forcing networks into rigid, pre-defined sizes, CIDR allows network administrators to create subnets of *any* arbitrary size using a flexible subnet mask.

## 1. Deep Dive & Mechanics

In the legacy Classful system, if a company needed 300 IP addresses, a Class C network (254 hosts) was too small. The registry would have to give them a Class B network (65,534 hosts), wasting over 65,000 IP addresses.

CIDR introduced **Variable-Length Subnet Masking (VLSM)**. 

A CIDR notation looks like this: TICK1192.168.1.0/24TICK1.
The TICK1/24TICK1 is the **prefix length**. It mathematically dictates exactly how many bits of the 32-bit IPv4 address are locked to represent the *Network ID*, leaving the remaining bits to represent the *Host IDs*.

In a TICK1/24TICK1 network:
- 24 bits are locked for the network.
- $32 - 24 = 8$ bits remain for the hosts.
- $2^8 = 256$ total IPs. (Minus 2 for the Network and Broadcast addresses = 254 usable IPs).

## 2. Mathematical / Theoretical Foundation

CIDR operates strictly on **Binary Boolean Logic**, specifically the Bitwise AND operation.

When a router receives a packet destined for TICK1192.168.1.50TICK1, it needs to determine which route to send it down. It checks its routing table, which contains CIDR blocks.

The router converts the IP and the Subnet Mask to binary and performs an AND operation:
- IP (192.168.1.50): TICK111000000.10101000.00000001.00110010TICK1
- Mask (/24 or 255.255.255.0): TICK111111111.11111111.11111111.00000000TICK1
- **Result (Network ID):** TICK111000000.10101000.00000001.00000000TICK1 (192.168.1.0)

This $O(1)$ bitwise mathematical operation allows routers to process millions of packets per second in hardware (ASICs).

## 3. Real-World Implementation

Understanding how to calculate CIDR blocks is essential for Cloud Engineering (AWS/Azure/GCP).

**Common CIDR Blocks:**
- TICK1/32TICK1: $2^0 = 1$ IP. Exactly one specific host. Used in firewall rules to whitelist a single IP.
- TICK1/24TICK1: $2^8 = 256$ IPs. The standard home network (TICK1255.255.255.0TICK1).
- TICK1/16TICK1: $2^{16} = 65,536$ IPs. A standard large corporate subnet or AWS VPC (TICK110.0.0.0/16TICK1).
- TICK1/0TICK1: Represents the entire internet. TICK10.0.0.0/0TICK1 is the "Default Route"—if no other specific CIDR matches, send the packet here (usually out to the ISP).

**Route Aggregation (Supernetting):**
CIDR allows routers to combine multiple smaller networks into one larger routing table entry to save RAM.
If a router knows paths to TICK1192.168.0.0/24TICK1 and TICK1192.168.1.0/24TICK1, it can aggregate them and advertise a single TICK1192.168.0.0/23TICK1 route to the internet backbone.

## 4. Visualizations

TICK3mermaid
pie title IP Distribution in a /24 vs /25 Network
    "Network /25 (128 IPs)" : 128
    "Network /26 (64 IPs)" : 64
    "Network /27 (32 IPs)" : 32
    "Network /27 (32 IPs)" : 32
TICK3
*(A TICK1/24TICK1 can be perfectly sliced into one TICK1/25TICK1, one TICK1/26TICK1, and two TICK1/27TICK1 subnets without wasting a single IP address).*

## 5. Interview Prep

**Q: If you provision an AWS VPC with the CIDR TICK110.0.0.0/24TICK1, how many usable IPs do you get for EC2 instances?**
**A:** Mathematically, a TICK1/24TICK1 provides 256 total IPs. In standard networking, you subtract 2 (Network and Broadcast). However, AWS reserves an *additional* 3 IPs per subnet (for the VPC router, DNS server, and future use). Therefore, you get $256 - 5 = 251$ usable IPs.

**Q: What is the Longest Prefix Match rule in routing?**
**A:** If a router's table has overlapping CIDR entries (e.g., TICK110.0.0.0/8TICK1 routes to Port A, and TICK110.1.2.0/24TICK1 routes to Port B), and a packet arrives for TICK110.1.2.50TICK1, it technically matches both. The router will *always* choose the route with the highest CIDR number (the most specific, longest prefix). It will send it out Port B.

**Q: What is the Subnet Mask equivalent of a TICK1/22TICK1 CIDR?**
**A:** A TICK1/24TICK1 is TICK1255.255.255.0TICK1. A TICK1/22TICK1 means we borrow 2 bits *back* from the third octet. $256 - 2^2 = 256 - 4 = 252$. The mask is TICK1255.255.252.0TICK1. It contains 1,024 IPs.

## 6. Production Use Cases

- **Cloud VPC Design:** When building a cloud infrastructure, architects carefully carve up a TICK1/16TICK1 VPC into smaller CIDR blocks for Public, Private, and Database subnets to ensure logical isolation and efficient IP utilization.
- **Firewall Whitelisting:** Instead of writing 256 individual firewall rules to allow a partner company's office to access an API, a security engineer simply writes one rule allowing the CIDR block TICK1203.0.113.0/24TICK1.

<Callout icon="info" title="IPv6 and CIDR">
CIDR is completely baked into IPv6 as well. Because IPv6 addresses are 128 bits long, you will frequently see notations like TICK12001:db8::/32TICK1. A standard IPv6 subnet assigned to a single local LAN is a TICK1/64TICK1, which mathematically contains $18.4$ quintillion IP addresses!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DHCP/index.mdx',
    content: `---
title: DHCP (Dynamic Host Configuration Protocol)
description: "A network management protocol used to automatically assign IP addresses and other communication parameters to devices on a network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="DHCP (Dynamic Host Configuration Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**DHCP (Dynamic Host Configuration Protocol)** is the magic that makes connecting to networks effortless. When you connect your laptop to a coffee shop Wi-Fi, you don't manually type in an IP address, Subnet Mask, Gateway, and DNS server. DHCP handles all of this automatically in the background in a fraction of a second.

Operating at the Application Layer (Layer 7) but dealing strictly with Layer 3 (IP) assignments, DHCP is a client-server protocol. The DHCP Server maintains a pool of available IP addresses and "leases" them out to clients for a specific duration.

## 1. Deep Dive & Mechanics

The DHCP allocation process strictly follows a 4-step sequence known by the acronym **DORA**:
1. **Discover:** The client machine wakes up without an IP address. It broadcasts a DHCP Discover packet to the entire network (Destination IP: TICK1255.255.255.255TICK1, Destination Port: 67) shouting, *"Are there any DHCP servers here?"*
2. **Offer:** Any DHCP server that hears this broadcast checks its pool. It reserves an IP and broadcasts a DHCP Offer back, saying, *"Here is an IP address you can use, along with the router and DNS info."*
3. **Request:** The client receives the offer. (If there are multiple DHCP servers, it usually picks the first one it receives). It broadcasts a DHCP Request saying, *"I accept this specific offer from Server X."*
4. **Acknowledge (ACK):** The chosen DHCP server sends a DHCP ACK, confirming the lease is finalized. The client binds the IP to its network interface.

## 2. Mathematical / Theoretical Foundation

DHCP relies on the concept of **Lease Times** and **State Machines** to prevent IP exhaustion. 

If a coffee shop has a /24 subnet (254 IPs), and 300 unique people walk in and connect over the course of a day, the IPs would run out. 
DHCP solves this mathematically by leasing IPs temporarily (e.g., for 2 hours).

Clients run a state machine to manage this lease:
- At **$T_1$ (50% of lease time)**: The client attempts to renew the lease directly with the original server via Unicast.
- At **$T_2$ (87.5% of lease time)**: If the original server is dead, the client enters a Rebinding state and broadcasts to *any* DHCP server to extend the lease.
- If the timer hits 100%, the client mathematically forces a network disconnect and drops the IP, allowing the server to place it back in the available pool.

## 3. Real-World Implementation

DHCP isn't just about IP addresses; it passes **DHCP Options**.
- Option 1: Subnet Mask
- Option 3: Default Router (Gateway)
- Option 6: DNS Servers
- Option 15: Domain Name

**Example: A typical ISC DHCPd configuration file (\`/etc/dhcp/dhcpd.conf\`)**
TICK3text
# Define the global DNS servers
option domain-name-servers 8.8.8.8, 1.1.1.1;

# Define the subnet and the IP pool
subnet 192.168.10.0 netmask 255.255.255.0 {
  range 192.168.10.100 192.168.10.200;
  option routers 192.168.10.1;
  default-lease-time 3600;      # 1 hour
  max-lease-time 7200;          # 2 hours
}

# Static Reservation based on MAC address (e.g., for a network printer)
host OfficePrinter {
  hardware ethernet 00:1A:2B:3C:4D:5E;
  fixed-address 192.168.10.50;
}
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client (0.0.0.0)
    participant Switch
    participant DHCP Server (10.0.0.1)

    Client->>Switch: 1. DHCP Discover (Broadcast)
    Switch->>DHCP Server: Forwards Broadcast
    DHCP Server-->>Switch: 2. DHCP Offer (IP: 10.0.0.50) (Broadcast)
    Switch-->>Client: Forwards Offer
    Client->>Switch: 3. DHCP Request (I accept 10.0.0.50) (Broadcast)
    Switch->>DHCP Server: Forwards Request
    DHCP Server-->>Switch: 4. DHCP ACK (Confirmed!) (Unicast/Broadcast)
    Switch-->>Client: Forwards ACK
    Note over Client (0.0.0.0): Configures interface to 10.0.0.50
TICK3

## 5. Interview Prep

**Q: If a client PC boots up and has an IP address of TICK1169.254.x.xTICK1, what happened?**
**A:** This is an APIPA (Automatic Private IP Addressing) address. It means the DORA process failed—the client sent out a DHCP Discover but never received an Offer (perhaps the DHCP server is down or the switch port is misconfigured). The OS assigns itself a TICK1169.254TICK1 address so it can at least communicate with other broken devices on the local link.

**Q: What is a DHCP Relay (IP Helper)?**
**A:** Because DHCP Discover packets are broadcasts (TICK1255.255.255.255TICK1), they cannot cross routers. In an enterprise with 50 VLANs, you don't want 50 DHCP servers. You configure a "DHCP Relay" or "IP Helper" on the router. When the router hears the broadcast on VLAN 10, it converts it to a Unicast packet and forwards it directly to the centralized DHCP server on VLAN 100.

**Q: What is Rogue DHCP?**
**A:** A security threat where an attacker plugs a router or runs software on a corporate network that hands out fake DHCP Offers faster than the real server. The attacker assigns themselves as the Default Gateway, instantly achieving a Man-in-the-Middle position for all new clients. This is mitigated using "DHCP Snooping" on enterprise switches.

## 6. Production Use Cases

- **PXE Booting:** In data centers, empty servers boot up and use DHCP to request not just an IP, but also the location of a TFTP server (DHCP Option 66). They then download their operating system image directly over the network without requiring a USB drive or human interaction.
- **VoIP Phone Provisioning:** IP desk phones use DHCP to request their VLAN assignment and the IP of the PBX server so they can automatically register and download their configuration files upon being plugged in.

<Callout icon="danger" title="Pool Exhaustion">
A common Denial of Service (DoS) attack is "DHCP Starvation." An attacker uses a tool like TICK1yersiniaTICK1 to rapidly spoof thousands of random MAC addresses, sending thousands of DHCP Discover packets per second. The server hands out all available IPs in the pool, preventing any legitimate users from joining the network.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/DNS (Records, Resolution, Zones)/index.mdx',
    content: `---
title: DNS (Domain Name System)
description: "The decentralized, hierarchical naming system of the internet, responsible for translating human-readable domain names into IP addresses."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="DNS (Domain Name System)">
      {children}
    </ConceptTemplate>
  )
}

**DNS (Domain Name System)** is often referred to as the phonebook of the internet. Humans remember words like \`google.com\`, but internet routers only understand IP addresses like \`142.250.190.46\`. DNS bridges this gap.

Without DNS, the modern internet would collapse. It is a globally distributed, hierarchical, and highly cached database. It operates primarily over **UDP Port 53**, prioritizing raw speed and low overhead over guaranteed delivery, although it falls back to TCP Port 53 for large responses (like Zone Transfers or DNSSEC).

## 1. Deep Dive & Mechanics

When you type a URL into your browser, a complex **Recursive DNS Resolution** process occurs behind the scenes:

1. **Browser/OS Cache Check:** The OS checks if it recently resolved the name.
2. **Recursive Resolver:** The OS queries its configured DNS server (usually provided by the ISP or a public resolver like Cloudflare's TICK11.1.1.1TICK1). If TICK11.1.1.1TICK1 doesn't have the answer cached, it takes responsibility to find it.
3. **Root Servers (TICK1.TICK1):** The recursive resolver asks one of the 13 global Root Servers: *"Where is the TICK1.comTICK1 Top-Level Domain (TLD) server?"*
4. **TLD Servers (TICK1.comTICK1):** The resolver queries the TICK1.comTICK1 TLD server: *"Where is the authoritative server for TICK1google.comTICK1?"*
5. **Authoritative Servers:** The resolver asks Google's dedicated nameserver: *"What is the IP for TICK1www.google.comTICK1?"* The authoritative server returns the final IP.
6. **Caching:** The recursive resolver caches this answer (based on the TTL - Time to Live) and passes it back to your browser.

## 2. Mathematical / Theoretical Foundation

DNS is structured mathematically as a **Tree Graph** (Inverted Tree Data Structure).

The root is simply a dot (TICK1.TICK1). The branches are TLDs (TICK1comTICK1, TICK1orgTICK1, TICK1netTICK1), and the leaves are subdomains. Because it is a tree graph, query time complexity is logarithmic $O(\\log N)$, allowing the system to resolve queries against billions of domains globally in milliseconds.

The system scales via **Distributed Caching**. The Time To Live (TTL) value dictates how many seconds a node in the tree is allowed to cache the result. This massively reduces the load on the Root and Authoritative servers, allowing the internet to function without DDoS-ing its own infrastructure.

## 3. Real-World Implementation

DNS relies on different **Record Types** stored inside a DNS Zone.

- **A Record:** Maps a domain to an IPv4 address.
- **AAAA Record:** Maps a domain to an IPv6 address.
- **CNAME (Canonical Name):** Maps an alias to another domain name (e.g., TICK1www.example.comTICK1 points to TICK1example.comTICK1). You cannot point a CNAME to an IP.
- **MX (Mail Exchange):** Dictates which mail servers accept email on behalf of the domain.
- **TXT (Text):** Originally for human notes, now heavily used for domain verification and email security (SPF, DKIM, DMARC).
- **NS (Name Server):** Delegates a subdomain to a different authoritative DNS server.

**Example Command-Line Interaction (using TICK1digTICK1):**
TICK3bash
# Query the A record for example.com
dig example.com A

# Query specifically against Google's 8.8.8.8 resolver
dig @8.8.8.8 example.com MX

# Trace the entire recursive path from the Root servers down
dig +trace example.com
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PC as User's PC
    participant Resolver as ISP Resolver (1.1.1.1)
    participant Root as Root Server (.)
    participant TLD as TLD Server (.com)
    participant Auth as Auth Server (google.com)

    PC->>Resolver: What is the IP of www.google.com?
    Resolver->>Root: Where is .com?
    Root-->>Resolver: Go to TLD Server (192.x.x.x)
    Resolver->>TLD: Where is google.com?
    TLD-->>Resolver: Go to Auth Server (ns1.google.com)
    Resolver->>Auth: What is the IP of www.google.com?
    Auth-->>Resolver: It is 142.250.190.46
    Resolver-->>PC: Result: 142.250.190.46 (Cached)
TICK3

## 5. Interview Prep

**Q: What is the difference between an Authoritative DNS server and a Recursive DNS server?**
**A:** An authoritative server actually holds the master DNS zone files and records for a specific domain; it provides the absolute truth (e.g., Amazon Route 53 hosting your company's domain). A recursive server (like Google's TICK18.8.8.8TICK1) holds no domains of its own; it traverses the internet to fetch answers from authoritative servers on behalf of the client and caches the results.

**Q: Can you put a CNAME record at the "Apex" (root) of a domain?**
**A:** No, standard DNS RFCs forbid placing a CNAME at the root (apex) of a domain (e.g., TICK1example.comTICK1). If you do, it overrides and breaks all other records at the apex, including MX records, completely destroying email delivery. Cloud providers solve this using proprietary pseudo-records (like ALIAS in Route 53 or CNAME Flattening in Cloudflare).

**Q: Why does DNS primarily use UDP instead of TCP?**
**A:** Speed and connection overhead. TCP requires a 3-way handshake before sending data. A standard DNS request fits inside a single 512-byte UDP packet. By using UDP, the client sends the question and the server sends the answer instantly, requiring only 2 packets total. If the packet drops, the client simply times out and tries again.

## 6. Production Use Cases

- **Global Load Balancing (GeoDNS):** Authoritative DNS servers (like Cloudflare or NS1) evaluate the incoming query's origin IP. If a user in Japan queries TICK1api.myapp.comTICK1, DNS returns the IP of the Tokyo AWS region. If a user in New York queries it, DNS returns the IP of the us-east-1 region.
- **Failover Routing:** DNS Health Checks continuously ping a primary web server. If it goes down, the DNS server automatically updates the A record to point to a backup server's IP address.

<Callout icon="warning" title="DNS Propagation is a Myth">
People often talk about waiting 24-48 hours for "DNS Propagation." The internet doesn't actively push or propagate DNS changes. It's simply a matter of TTL (Time to Live) caching. If your A record had a TTL of 24 hours, thousands of recursive resolvers globally have cached the old IP and will stubbornly refuse to ask for the new IP until their 24-hour countdown timer expires. Always lower your TTL to 60 seconds a day before a major migration!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Ethernet/index.mdx',
    content: `---
title: Ethernet
description: "The foundational family of wired computer networking technologies standardizing Data Link and Physical layer communications (IEEE 802.3)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Ethernet">
      {children}
    </ConceptTemplate>
  )
}

**Ethernet** is the undisputed king of wired local area networking (LAN). Invented at Xerox PARC in 1973 by Bob Metcalfe, it defines the hardware and signaling standards for the Physical Layer (Layer 1) and Data Link Layer (Layer 2) of the OSI model.

Whenever you plug a copper RJ45 cable (Cat5e/Cat6) or a fiber optic transceiver into a server, switch, or router, you are utilizing Ethernet. It dictates exactly how bits are turned into electrical pulses/light, and how those bits are organized into logical **Frames** to be processed by Network Interface Cards (NICs).

## 1. Deep Dive & Mechanics

At Layer 2, Ethernet communicates using **MAC (Media Access Control) Addresses**. Every Ethernet NIC in the world is physically burned with a globally unique 48-bit MAC address by its manufacturer.

When an OS wants to transmit an IP packet, the Ethernet NIC wraps it in an **Ethernet Frame**. The frame has a strict structure:
1. **Preamble (8 bytes):** A sequence of alternating 1s and 0s to synchronize the receiver's clock.
2. **Destination MAC (6 bytes):** Where the frame is going.
3. **Source MAC (6 bytes):** Where the frame came from.
4. **EtherType (2 bytes):** Tells the receiving OS what is inside the payload (e.g., IPv4 is TICK10x0800TICK1, IPv6 is TICK10x86DDTICK1).
5. **Payload (46 to 1500 bytes):** The actual IP packet. (1500 bytes is the standard MTU - Maximum Transmission Unit).
6. **FCS / CRC (4 bytes):** A Frame Check Sequence math hash. If a single bit flips due to cable interference, the math fails on the receiving end, and the frame is instantly dropped as corrupt.

## 2. Mathematical / Theoretical Foundation

Early Ethernet operated over a shared coaxial cable (bus topology). This created a severe theoretical problem: if two computers transmitted electrical voltage simultaneously, a **Collision** occurred, destroying both signals. 

Ethernet solved this using the **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection) algorithm.
1. **Listen:** The NIC listens to the wire. Is there voltage? If yes, wait.
2. **Transmit:** If quiet, begin transmitting bits.
3. **Detect:** While transmitting, continue listening. If a voltage spike is detected (a collision), immediately stop.
4. **Backoff Algorithm:** Both colliding NICs generate a random mathematical number (exponential backoff) and wait that many microseconds before attempting to transmit again.

*Note: Modern Ethernet uses Full-Duplex Switches, where every device has a dedicated transmit and receive wire. Collisions mathematically cannot happen, rendering CSMA/CD obsolete, though it remains in the protocol specification.*

## 3. Real-World Implementation

In the real world, manipulating Ethernet involves adjusting the **MTU (Maximum Transmission Unit)** or viewing MAC addresses on server interfaces.

TICK3bash
# View Ethernet interfaces, MAC addresses, and MTU on Linux
ip link show

# Example Output:
# 2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP
#    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff

# Increase MTU for Jumbo Frames (Improves storage network performance)
sudo ip link set dev eth0 mtu 9000

# View detailed hardware statistics (dropped frames, CRC errors) for an Ethernet NIC
ethtool -S eth0
TICK3

## 4. Visualizations

TICK3mermaid
packet-beta
    title Standard Ethernet Frame (IEEE 802.3)
    0-7: "Preamble"
    8-13: "Dest MAC"
    14-19: "Src MAC"
    20-21: "Type"
    22-49: "Payload (IP Packet) - Up to 1500 bytes"
    50-53: "CRC / FCS"
TICK3

## 5. Interview Prep

**Q: What is a MAC Address, and can you change it?**
**A:** A MAC address is a 48-bit identifier (e.g., TICK100:1A:2B:3C:4D:5ETICK1). The first 24 bits represent the OUI (Organizationally Unique Identifier - tying it to a vendor like Cisco or Apple). The last 24 bits are unique to the NIC. While it is physically burned into the hardware (ROM), the operating system's software networking stack handles the actual transmission. Therefore, you can easily "spoof" or change your MAC address in software using tools like TICK1macchangerTICK1.

**Q: What are Jumbo Frames?**
**A:** By default, Ethernet limits payloads to 1500 bytes (the MTU). For high-throughput scenarios (like iSCSI SAN storage or cloud interconnects), breaking a massive 10GB file into tiny 1500-byte frames requires massive CPU overhead for the constant generation of headers and interrupts. Jumbo Frames increase the MTU to 9000 bytes, dramatically reducing CPU overhead and increasing data transfer rates.

**Q: What is the difference between a Hub and a Switch?**
**A:** A Hub is a dumb Layer 1 device; any electrical signal that comes in one port is aggressively blasted out of all other ports, causing massive collisions and security risks. A Switch is a smart Layer 2 device; it looks at the Destination MAC address inside the Ethernet Frame, checks its internal MAC Address Table (CAM table), and selectively forwards the electrical signal *only* out of the specific physical port where the target device lives.

## 6. Production Use Cases

- **Data Center Interconnects:** Modern enterprise data centers use specialized Ethernet (like 100GbE or 400GbE fiber optics) to connect Top-of-Rack (ToR) switches to Spine switches.
- **VLANs (Virtual LANs - 802.1Q):** Ethernet allows administrators to insert a 4-byte tag into the frame header. This allows a single physical switch to behave like 10 isolated logical switches, keeping guest Wi-Fi traffic securely separated from corporate accounting servers on the exact same physical wires.

<Callout icon="info" title="The Promiscuous Mode">
By default, an Ethernet NIC drops any frame it receives if the Destination MAC doesn't perfectly match its own MAC. However, network engineers and hackers use tools like Wireshark to flip the NIC into "Promiscuous Mode". In this mode, the NIC bypasses the hardware filter and sends *every single frame* on the wire up to the CPU for inspection.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '\`\`\`')
      .replace(/TICK1/g, '\`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
