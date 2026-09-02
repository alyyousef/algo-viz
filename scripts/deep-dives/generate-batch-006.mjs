import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/NAT/index.mdx',
    content: `---
title: NAT (Network Address Translation)
description: "A technique used by routers to modify network address information in IP packet headers, allowing multiple devices on a private network to share a single public IP address."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="NAT (Network Address Translation)">
      {children}
    </ConceptTemplate>
  )
}

**NAT (Network Address Translation)** is the unsung hero that kept the IPv4 internet alive for decades. Invented in the 1990s as a temporary band-aid for IPv4 address exhaustion, it became a permanent fixture in global network architecture.

Without NAT, every single laptop, phone, and smart TV in your house would require its own unique public IP address purchased from your Internet Service Provider (ISP). With NAT, your ISP only gives your home router *one* public IP address. Your router then creates a private, hidden network (usually TICK1192.168.x.xTICK1) and acts as an aggressive translator for all outbound and inbound traffic.

## 1. Deep Dive & Mechanics

When a private device (e.g., TICK1192.168.1.10TICK1) wants to fetch a webpage from Google (TICK1142.250.190.46TICK1), the packet reaches the NAT router.

The NAT router performs three distinct mechanical steps:
1. **Packet Interception:** It halts the packet.
2. **Address Translation:** It modifies the Layer 3 IP Header, stripping out the private Source IP (TICK1192.168.1.10TICK1) and replacing it with its own public WAN IP (e.g., TICK1203.0.113.5TICK1).
3. **State Tracking:** It records this translation in a **NAT Translation Table** (storing the original private IP, the destination IP, and the ports used) so that when Google replies, the router knows exactly which private device to forward the reply to.

## 2. Mathematical / Theoretical Foundation

NAT fundamentally breaks the original **End-to-End Principle** of the internet, which theorized that every node should be able to communicate directly and transparently with any other node without intermediary modification.

By manipulating Layer 3 headers mid-flight, NAT introduces immense stateful complexity. A router without NAT only needs to hold a static routing table (O(1) memory per route). A NAT router must dynamically allocate and maintain a massive hash map of active connections (O(N) memory, where N is the number of active TCP/UDP sessions). If a NAT table fills up (e.g., during a torrenting session with thousands of peers), the router will mathematically drop all new outbound connections because it cannot track them.

## 3. Real-World Implementation

NAT is primarily configured on firewalls and edge routers. In Linux, it is handled by TICK1iptablesTICK1 (or TICK1nftablesTICK1).

TICK3bash
# Configure standard SNAT (Source NAT) or "Masquerading" on a Linux router
# This tells iptables to translate all traffic leaving eth0 (the WAN port)
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Configure DNAT (Destination NAT) / Port Forwarding
# Forward all public traffic hitting port 80 to an internal web server at 192.168.1.50
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.50:80

# View the current NAT Translation Table (Connection Tracking)
sudo conntrack -L
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PC (192.168.1.10)
    participant Router (Pub: 203.0.113.5)
    participant Server (8.8.8.8)

    PC->>Router: Src: 192.168.1.10 | Dst: 8.8.8.8
    Note over Router: Intercepts.<br/>Writes to NAT Table.<br/>Translates Source IP.
    Router->>Server: Src: 203.0.113.5 | Dst: 8.8.8.8
    Server-->>Router: Src: 8.8.8.8 | Dst: 203.0.113.5
    Note over Router: Checks NAT Table.<br/>Finds match for 192.168.1.10.<br/>Translates Dest IP.
    Router-->>PC: Src: 8.8.8.8 | Dst: 192.168.1.10
TICK3

## 5. Interview Prep

**Q: What is the difference between SNAT and DNAT?**
**A:** **SNAT (Source NAT)** modifies the Source IP of a packet leaving a network (e.g., allowing an internal PC to browse the web). **DNAT (Destination NAT)** modifies the Destination IP of a packet entering a network (e.g., Port Forwarding, allowing the public internet to reach a private web server).

**Q: Does NAT provide security?**
**A:** Yes, but strictly as a byproduct. Because NAT drops unsolicited inbound traffic that doesn't have a matching entry in the state table, it acts as a rudimentary inbound firewall. However, security purists argue that NAT is not a substitute for a true stateful inspection firewall (which evaluates packet payloads and rulesets, not just IP headers).

**Q: What is Carrier-Grade NAT (CGNAT)?**
**A:** As ISPs ran out of public IPv4 addresses, they started putting NAT *inside* their own infrastructure. Instead of giving your home router a public IP, they give it a private IP (usually in the TICK1100.64.0.0/10TICK1 range). Your router performs NAT to the ISP, and the ISP performs NAT to the internet. This "Double NAT" breaks port-forwarding and P2P gaming, accelerating the need for IPv6.

## 6. Production Use Cases

- **AWS NAT Gateways:** In cloud architecture, you place your databases in a Private Subnet (no public IP). However, the database occasionally needs to download software updates. You deploy a managed NAT Gateway in a Public Subnet, allowing the database to initiate outbound traffic while remaining completely invisible and unreachable from the outside.
- **Load Balancing (Reverse Proxy):** Advanced Load Balancers (like HAProxy or F5 Big-IP) use DNAT heavily. A user hits the public IP of the load balancer, which then performs DNAT to transparently forward the packets to one of ten backend web servers.

<Callout icon="info" title="IPsec and NAT Traversal (NAT-T)">
NAT notoriously breaks the IPsec VPN protocol. IPsec encrypts and hashes the IP header to detect tampering. When a NAT router translates the Source IP, the IPsec math fails, and the packet is dropped as "tampered." Engineers invented **NAT-T (NAT Traversal)** to encapsulate IPsec inside UDP port 4500, essentially hiding the IPsec headers from the NAT router so they survive translation.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/OSI model/index.mdx',
    content: `---
title: OSI Model (Open Systems Interconnection)
description: "A conceptual framework used to describe the functions of a networking system across seven distinct layers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="OSI Model (Open Systems Interconnection)">
      {children}
    </ConceptTemplate>
  )
}

The **OSI Model** (Open Systems Interconnection) is the universal language of computer networking. Developed in 1984 by the ISO, it divides the incredibly complex process of network communication into seven manageable, isolated layers.

While the modern internet technically runs on the simpler 4-layer TCP/IP model, the 7-layer OSI model remains the gold standard for network design, troubleshooting, and communication among engineers. When an engineer says, "We have a Layer 3 issue," every other engineer instantly knows they are talking about IP routing, not physical cables.

## 1. Deep Dive & Mechanics

The seven layers operate on the principle of **Encapsulation**. When you send an email, the data starts at Layer 7 and travels down. Each layer wraps the data in its own specific header (like putting an envelope inside a larger envelope), creating a **Protocol Data Unit (PDU)**. 

1. **Layer 7 - Application:** The software interface (HTTP, SMTP). PDU: *Data*
2. **Layer 6 - Presentation:** Data formatting, encryption, compression (TLS/SSL, JPEG). PDU: *Data*
3. **Layer 5 - Session:** Establishing and managing persistent connections. PDU: *Data*
4. **Layer 4 - Transport:** End-to-end reliability, sequencing, and ports (TCP, UDP). PDU: *Segment*
5. **Layer 3 - Network:** Logical addressing and routing across multiple networks (IP, ICMP). PDU: *Packet*
6. **Layer 2 - Data Link:** Node-to-node delivery on the same local network using MAC addresses (Ethernet, Wi-Fi). PDU: *Frame*
7. **Layer 1 - Physical:** The actual transmission of raw bits over a physical medium (Cables, Radio waves, Hubs). PDU: *Bits*

When the data reaches the destination, it travels *up* the stack, with each layer stripping off (decapsulating) its specific header.

## 2. Mathematical / Theoretical Foundation

The OSI model is heavily influenced by the software engineering principle of **Separation of Concerns** and **Abstraction Interfaces**.

By isolating functions into layers, mathematical optimization can occur independently. An engineer designing a complex error-correction math algorithm for a fiber-optic cable at Layer 1 does not need to care or know how a Layer 7 HTTP request is formatted. Because the interfaces between layers are strictly standardized, you can completely rip out a copper cable (Layer 1) and replace it with Wi-Fi (Layer 1/2), and Layer 3 (IP) and Layer 4 (TCP) will continue functioning with zero mathematical awareness that the physical medium changed.

## 3. Real-World Implementation

Troubleshooting networks should almost always follow the OSI model, starting from Layer 1 and working up (the Bottom-Up approach).

TICK3bash
# Troubleshooting workflow:

# 1. Layer 1 (Physical): Is the cable plugged in? Does the NIC have link lights?
ethtool eth0 | grep "Link detected"

# 2. Layer 2 (Data Link): Can we see local MAC addresses? (Is the switch working?)
ip neigh show

# 3. Layer 3 (Network): Can we route to the outside world? (IP/ICMP)
ping 8.8.8.8

# 4. Layer 4 (Transport): Is the specific TCP/UDP port open on the server?
telnet 8.8.8.8 443

# 7. Layer 7 (Application): Is the web server actually returning a valid HTTP response?
curl -I https://google.com
TICK3

## 4. Visualizations

TICK3mermaid
block-beta
    columns 2
    L7["Layer 7: Application (HTTP, SMTP)"] PDU7["PDU: Data"]
    L6["Layer 6: Presentation (TLS, JPEG)"] PDU6["PDU: Data"]
    L5["Layer 5: Session (RPC, Sockets)"] PDU5["PDU: Data"]
    L4["Layer 4: Transport (TCP, UDP)"] PDU4["PDU: Segment"]
    L3["Layer 3: Network (IP, ICMP)"] PDU3["PDU: Packet"]
    L2["Layer 2: Data Link (Ethernet, MAC)"] PDU2["PDU: Frame"]
    L1["Layer 1: Physical (Cables, Hubs)"] PDU1["PDU: Bits"]
TICK3

## 5. Interview Prep

**Q: At which OSI layer does a Router operate? What about a Switch?**
**A:** A Router operates at Layer 3 (Network) because it inspects IP addresses to make routing decisions. A standard Switch operates at Layer 2 (Data Link) because it inspects MAC addresses to switch frames on a local network. A Hub operates at Layer 1 (Physical) because it blindly repeats electrical signals without inspecting any data.

**Q: What is a "Layer 7 Load Balancer" vs a "Layer 4 Load Balancer"?**
**A:** A Layer 4 Load Balancer (like AWS Network Load Balancer) only looks at the IP address and TCP/UDP port to forward traffic. It is extremely fast but blind to the actual content. A Layer 7 Load Balancer (like AWS Application Load Balancer or Nginx) actually terminates the HTTP connection, inspects the URL path (e.g., TICK1/imagesTICK1 vs TICK1/apiTICK1), and routes traffic intelligently based on the application data.

**Q: Why do many network engineers joke about "Layer 8"?**
**A:** "Layer 8" is an IT joke referring to the User. If a network issue cannot be explained by Layers 1-7, it is often a "Layer 8 issue" (human error, like someone unplugging their own computer).

## 6. Production Use Cases

- **Firewall Rule Definition:** Next-Generation Firewalls (NGFWs) like Palo Alto allow administrators to write rules across multiple OSI layers. You can write a Layer 3/4 rule (Block IP 1.2.3.4 on Port 80) or a Layer 7 rule (Block HTTP requests attempting to download TICK1.exeTICK1 files, regardless of the port).
- **Network Architecture:** When designing a microservices architecture in Kubernetes, engineers must understand how the Calico CNI operates at Layer 3 (IP routing via BGP) while the Istio Service Mesh operates heavily at Layer 7 (managing mTLS and HTTP request tracing).

<Callout icon="info" title="Mnemonics for Memorization">
The most common way to memorize the 7 layers from bottom to top (Physical to Application) is:
**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.
From top to bottom:
**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/PAT/index.mdx',
    content: `---
title: PAT (Port Address Translation)
description: "An extension of NAT that maps multiple private IP addresses to a single public IP address by utilizing unique transport layer port numbers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="PAT (Port Address Translation)">
      {children}
    </ConceptTemplate>
  )
}

**PAT (Port Address Translation)**, also commonly referred to as **NAT Overload**, is the specific implementation of NAT that is used in 99% of homes and corporate offices today. 

While pure NAT translates one private IP address to one public IP address (a 1:1 ratio, which doesn't actually save any public IP addresses), PAT translates *thousands* of private IP addresses to a *single* public IP address (a Many:1 ratio). It achieves this by manipulating not just Layer 3 (IP Addresses), but also Layer 4 (TCP/UDP Port Numbers).

## 1. Deep Dive & Mechanics

When a private PC (TICK1192.168.1.10TICK1) sends a web request, it generates a random source port (e.g., TICK15000TICK1). The router receives this packet.

To perform PAT, the router does three things:
1. It changes the Source IP to its Public IP (e.g., TICK1203.0.113.5TICK1).
2. It allocates a **new, unique Source Port** on its WAN interface (e.g., TICK16000TICK1) and rewrites the TCP/UDP header.
3. It creates an entry in its PAT table: TICK1192.168.1.10:5000 <--> 203.0.113.5:6000TICK1.

If a second PC (TICK1192.168.1.20TICK1) coincidentally sends a packet using the exact same random source port (TICK15000TICK1), the router handles this gracefully. It translates it to the Public IP but assigns it a different port (e.g., TICK16001TICK1). When the web server replies to TICK16001TICK1, the router strictly maps it back to the second PC.

## 2. Mathematical / Theoretical Foundation

PAT is mathematically bounded by the limits of the Layer 4 Transport Header (TCP/UDP).

A port number is a 16-bit unsigned integer. Therefore, there are exactly $2^{16} = 65,536$ possible ports. Port 0 is reserved, leaving 65,535 usable ports. 

Since PAT maps every single unique outbound connection to a unique source port on the public IP, **a single public IP address can mathematically only support 65,535 simultaneous concurrent connections**. In massive enterprise environments or Carrier-Grade NAT (CGNAT) setups, a single public IP is not enough; the firewall must maintain a *Pool* of public IPs, mathematically expanding the connection limit to $N \\times 65,535$.

## 3. Real-World Implementation

In Cisco environments, PAT is configured using the TICK1overloadTICK1 keyword. In Linux TICK1iptablesTICK1, the standard MASQUERADE target automatically implies PAT.

TICK3bash
# In Cisco IOS, standard NAT looks like this:
ip nat inside source static 192.168.1.10 203.0.113.5

# PAT (NAT Overload) looks like this (mapping a whole subnet to an interface):
ip nat inside source list 1 interface GigabitEthernet0/0 overload

# In Linux, check the active PAT translation table (Connection Tracking)
sudo conntrack -L
# Output snippet:
# tcp 6 43200 ESTABLISHED src=192.168.1.10 dst=8.8.8.8 sport=5000 dport=443 [UNREPLIED] src=8.8.8.8 dst=203.0.113.5 sport=443 dport=6000
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PC1 (192.168.1.10:5000)
    participant PC2 (192.168.1.20:5000)
    participant Router (203.0.113.5)
    participant Web Server (8.8.8.8:443)

    PC1->>Router: Send (Src: 192.168.1.10:5000)
    Note over Router: Maps to 203.0.113.5:6000
    Router->>Web Server: Send (Src: 203.0.113.5:6000)
    
    PC2->>Router: Send (Src: 192.168.1.20:5000)
    Note over Router: Port clash! Maps to 203.0.113.5:6001
    Router->>Web Server: Send (Src: 203.0.113.5:6001)

    Web Server-->>Router: Reply to 203.0.113.5:6001
    Note over Router: Lookup 6001 in PAT table
    Router-->>PC2 (192.168.1.20:5000): Forwarded (Dst: 192.168.1.20:5000)
TICK3

## 5. Interview Prep

**Q: Why doesn't PAT work well with the ICMP (Ping) protocol?**
**A:** PAT relies on Layer 4 TCP and UDP port numbers to track which internal device sent which packet. ICMP is a Layer 3 protocol; it has no concept of ports! To solve this, PAT routers perform a deep inspection hack on ICMP Echo Requests: they use the "ICMP Identifier" field in the ICMP header to act as a pseudo-port to track the state of pings.

**Q: What is Port Exhaustion?**
**A:** Port exhaustion occurs when a network has more than 65,535 active outbound connections sharing a single public IP. Because the router has run out of 16-bit port numbers to assign on its WAN interface, any new web requests from internal users will be instantly dropped until existing connections close.

**Q: If both PC1 and PC2 open an SSH connection (Port 22) to a remote server, how does the remote server distinguish between them?**
**A:** The remote server doesn't know PC1 and PC2 exist. It only sees two connections coming from the router's public IP. However, the router's PAT process assigned them different Source Ports (e.g., TICK16000TICK1 and TICK16001TICK1). The TCP session is uniquely identified by a 4-tuple: (Source IP, Source Port, Dest IP, Dest Port). Since the Source Ports are different, the server treats them as distinct sessions.

## 6. Production Use Cases

- **Home Office Networks:** Every standard consumer Wi-Fi router sold today utilizes PAT by default. It allows 50 laptops, smartphones, and smart devices in a house to successfully share a single IP address provided by Comcast or AT&T.
- **Enterprise Guest Wi-Fi:** In an enterprise, guest Wi-Fi networks are heavily segregated. A corporation might assign a TICK1/16TICK1 subnet (65k internal IPs) to guest devices, but they will route all of that traffic through a single interface on the Palo Alto firewall utilizing PAT Overload to hide the guest topology from the public internet.

<Callout icon="warning" title="NAT vs PAT Terminology">
In the industry, when an engineer says "NAT", they are almost always referring to PAT (NAT Overload). True 1:1 NAT is rarely used except for exposing specific internal servers to the internet. If you are translating ports to save IP addresses, you are technically using PAT.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Routing (Static & Dynamic)/index.mdx',
    content: `---
title: Routing (Static & Dynamic)
description: "The process of selecting a path for traffic in a network across multiple routers, implemented via manual configuration or automated protocols."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Routing (Static & Dynamic)">
      {children}
    </ConceptTemplate>
  )
}

**Routing** is the central intelligence of the internet. When an IP packet arrives at a router, the router must inspect the Destination IP address and decide which physical interface (port) to send it out of. To make this decision, it consults its **Routing Table**. 

The fundamental problem of network engineering is how to populate and maintain this Routing Table. There are two primary methods: **Static Routing** (a human types the routes manually) and **Dynamic Routing** (routers use complex algorithms to talk to each other and learn the routes automatically).

## 1. Deep Dive & Mechanics

**Static Routing:**
A network administrator logs into the router and explicitly types: *"To reach network 10.5.0.0/16, send the packet out Port 2."*
- **Pros:** Zero CPU overhead (no algorithms running), completely predictable, highly secure (no routing protocols to hack).
- **Cons:** Does not scale. If Port 2's cable gets cut by a backhoe, the router will stubbornly keep sending packets into the void. A human must manually log in and change the route to a backup path.

**Dynamic Routing:**
Administrators enable a Routing Protocol (like OSPF or BGP). Routers constantly send "Hello" packets to each other, exchanging information about which networks they can see and how fast their links are.
- **Pros:** Highly scalable. If a cable is cut, the algorithm instantly recalculates the topology and updates the routing table to use a backup path in milliseconds (Convergence).
- **Cons:** Requires CPU/RAM to maintain the database of routes. Misconfigurations can cause massive network outages (e.g., routing loops).

## 2. Mathematical / Theoretical Foundation

Dynamic routing protocols rely heavily on **Graph Theory** algorithms to calculate the shortest path.

1. **Distance-Vector Protocols (e.g., RIP, EIGRP):** Based on the **Bellman-Ford algorithm**. Routers do not know the full map of the network; they only know what their direct neighbors tell them (Routing by rumor). They calculate the "Distance" (e.g., hop count) and the "Vector" (which port to send it out).
2. **Link-State Protocols (e.g., OSPF, IS-IS):** Based on **Dijkstra's Shortest Path First (SPF) algorithm**. Every router floods information about its links to *all* other routers. Every router mathematically builds a complete, identical $O(N)$ topological map of the entire network in RAM, and then runs Dijkstra's algorithm to calculate the absolute fastest path to every destination.

## 3. Real-World Implementation

In Linux, you can manage the routing table using the TICK1iproute2TICK1 suite.

TICK3bash
# View the current routing table
ip route show

# STATIC ROUTING EXAMPLES:
# Add a static route for a specific subnet
sudo ip route add 192.168.100.0/24 via 10.0.0.1 dev eth0

# Add a Default Route (0.0.0.0/0). "If you don't know where it goes, send it to 192.168.1.1"
sudo ip route add default via 192.168.1.1

# DYNAMIC ROUTING:
# In Linux, dynamic routing is usually handled by a software daemon like FRRouting (FRR) or Quagga.
# Example FRR vtysh command to enable OSPF:
# router ospf
#  network 192.168.0.0/16 area 0
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    A(Router A) -- 10ms Ping --> B(Router B)
    A -- 50ms Ping --> C(Router C)
    B -- 10ms Ping --> D(Router D)
    C -- 10ms Ping --> D

    classDef highlight fill:#f9f,stroke:#333,stroke-width:4px;
    class A,B,D highlight;
TICK3
*(In a Dynamic Link-State protocol like OSPF, Router A knows the path A->C->D takes 60ms, while A->B->D takes 20ms. It automatically populates the routing table to route through B. If B dies, it instantly recalculates and routes through C).*

## 5. Interview Prep

**Q: What is Administrative Distance (AD)?**
**A:** If a router learns about the *exact same* destination network from two different sources (e.g., a human typed a Static Route, but OSPF also dynamically found a path), which one does it trust? Administrative Distance is a trustworthiness score. A Static Route has an AD of 1 (highly trusted). OSPF has an AD of 110. The router will always install the Static Route into the table because it has the lower AD.

**Q: What is the difference between IGP and EGP?**
**A:** **IGP (Interior Gateway Protocol)** includes OSPF and EIGRP. These are used *inside* a single organization (an Autonomous System) to route traffic between office buildings. **EGP (Exterior Gateway Protocol)** refers to BGP. It is used on the public internet to route traffic *between* different organizations and ISPs.

**Q: What is a Routing Loop, and how does IP prevent it?**
**A:** A routing loop occurs when Router A thinks the path to a destination is through Router B, and Router B thinks the path is through Router A. The packet bounces back and forth infinitely, consuming bandwidth. IP prevents this at Layer 3 using the **TTL (Time to Live)** field. Every bounce decrements the TTL by 1. When it hits 0, the packet is dropped.

## 6. Production Use Cases

- **Site-to-Site VPNs:** Often utilize Static Routing. If a company has a branch office with subnet TICK110.1.0.0/16TICK1, the HQ firewall simply has a static route instructing it to send all traffic for that subnet into the IPSec VPN tunnel interface.
- **Internet Backbone (BGP):** The global internet relies on BGP (Border Gateway Protocol). When an ISP in London connects to an ISP in New York, they don't type static routes for the billions of IPs on the internet. Their routers establish a dynamic BGP session and exchange millions of routing prefixes dynamically, automatically routing around transatlantic cable failures.

<Callout icon="danger" title="BGP Route Leaks">
Because BGP operates on blind trust between organizations, a misconfiguration by a junior engineer at a small ISP can accidentally advertise that they have the "fastest route" to Google's servers. The dynamic algorithm accepts this, and suddenly half the world's internet traffic is routed to a tiny router in Kansas, instantly causing a global internet outage.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Subnetting/index.mdx',
    content: `---
title: Subnetting
description: "The mathematical practice of dividing a single large IP network into multiple smaller, logically isolated sub-networks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Subnetting">
      {children}
    </ConceptTemplate>
  )
}

**Subnetting** is arguably the most critical and mathematically intensive skill in foundational networking. It is the process of taking a large block of IP addresses provided by an ISP or cloud provider and slicing it into smaller, manageable chunks (subnets).

Why subnet? 
1. **Security:** You isolate networks. Your database servers go in one subnet, and public web servers go in another, separated by a firewall.
2. **Performance:** If you put 5,000 computers on a single network, the Layer 2 ARP broadcast traffic would cripple the network switches. Subnetting limits the scope of broadcasts.

## 1. Deep Dive & Mechanics

An IPv4 address (32 bits) is split into a **Network ID** and a **Host ID**. 

When you subnet, you perform **bit borrowing**. You "borrow" bits from the Host portion of the address and reassign them to the Network portion. By doing this, you increase the number of available subnets, but mathematically decrease the number of host IP addresses available inside each of those subnets.

The boundary is controlled by the **Subnet Mask**, typically written in CIDR notation (e.g., TICK1/24TICK1).

## 2. Mathematical / Theoretical Foundation

Subnetting relies entirely on base-2 (Binary) mathematics. 

**Key Formulas:**
1. **Number of Subnets created:** $2^s$ (where $s$ is the number of bits borrowed).
2. **Number of Usable Hosts per subnet:** $2^h - 2$ (where $h$ is the number of host bits remaining). We subtract 2 because the all-zeros address is reserved for the Network ID, and the all-ones address is reserved for the Broadcast Address.

**Example Scenario:**
You are given TICK1192.168.1.0 /24TICK1 (256 total IPs). You need to split this into 4 smaller networks.
- To get 4 subnets, you need to borrow 2 bits ($2^2 = 4$).
- The new prefix is TICK1/24 + 2 = /26TICK1.
- You have $32 - 26 = 6$ host bits remaining.
- Hosts per subnet: $2^6 - 2 = 64 - 2 = 62$ usable hosts.

Your 4 new subnets are:
1. TICK1192.168.1.0 /26TICK1 (IPs: 1-62)
2. TICK1192.168.1.64 /26TICK1 (IPs: 65-126)
3. TICK1192.168.1.128 /26TICK1 (IPs: 129-190)
4. TICK1192.168.1.192 /26TICK1 (IPs: 193-254)

## 3. Real-World Implementation

In cloud architecture (like AWS or Terraform), you configure subnets using CIDR strings. You do not manually type out binary.

TICK3bash
# Example Terraform configuration for an AWS VPC Subnet
resource "aws_subnet" "database_subnet" {
  vpc_id     = aws_vpc.main.id
  
  # The VPC is 10.0.0.0/16 (65,536 IPs). 
  # We carve out a /24 subnet (256 IPs) specifically for databases.
  cidr_block = "10.0.1.0/24"
  
  availability_zone = "us-east-1a"
  tags = {
    Name = "Private-DB-Subnet"
  }
}
TICK3

## 4. Visualizations

TICK3mermaid
pie title Subnetting a /24 Network into /26s
    "Subnet 1: .0/26 (64 IPs)" : 64
    "Subnet 2: .64/26 (64 IPs)" : 64
    "Subnet 3: .128/26 (64 IPs)" : 64
    "Subnet 4: .192/26 (64 IPs)" : 64
TICK3

## 5. Interview Prep

**Q: You are given a TICK1/29TICK1 subnet. How many usable IP addresses does it contain?**
**A:** A TICK1/29TICK1 means 29 bits are used for the network, leaving 3 bits for the host. $2^3 = 8$ total IPs. Subtract 2 for the Network and Broadcast addresses, leaving exactly **6 usable IP addresses**. TICK1/29TICK1s are frequently used for Point-to-Point router links or small public IP blocks given by an ISP.

**Q: What is a TICK1/31TICK1 subnet used for?**
**A:** Mathematically, $32 - 31 = 1$ host bit. $2^1 = 2$ IPs. If you subtract 2, you get 0 usable IPs. However, RFC 3021 created a special exception for Point-to-Point links between two routers. Because there are only two devices on the wire, there is no need for a Broadcast address. A TICK1/31TICK1 allows exactly 2 usable IPs, saving address space.

**Q: In AWS, if you create a TICK110.0.1.0/24TICK1 subnet, how many IPs are actually usable by EC2 instances?**
**A:** Standard math dictates $256 - 2 = 254$. However, AWS reserves the first 4 IPs and the last IP (Network, VPC Router, Amazon DNS, Future Use, and Broadcast). Therefore, you have $256 - 5 = 251$ usable IPs.

## 6. Production Use Cases

- **VPC Design:** A standard Cloud Architecture best practice is to deploy a TICK1/16TICK1 VPC, and then subnet it across 3 Availability Zones. Each zone gets a TICK1/24TICK1 Public Subnet (for Load Balancers), a TICK1/24TICK1 Private Subnet (for App Servers), and a TICK1/24TICK1 Database Subnet. Subnetting allows strict Security Group and Network ACL rules to govern traffic between these layers.
- **Data Center Segmentation:** A hospital might subnet their internal network to place all medical imaging machines (MRIs, X-Rays) in a TICK110.50.x.xTICK1 subnet, physically isolated from the guest Wi-Fi subnet TICK1192.168.x.xTICK1 to comply with HIPAA regulations.

<Callout icon="info" title="The Subnet Cheat Code">
Network Engineers rarely do the binary math by hand in production. They use the "Magic Number" trick. Subtract the interesting octet of the subnet mask from 256. If your mask is \`255.255.255.224\`, the magic number is $256 - 224 = 32$. This instantly tells you that your subnets increment by 32 (e.g., .0, .32, .64, .96).
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
