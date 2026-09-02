import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ICMP/index.mdx',
    content: `---
title: ICMP (Internet Control Message Protocol)
description: "A network layer protocol used by devices to diagnose network communication issues and report errors."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="ICMP (Internet Control Message Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**ICMP (Internet Control Message Protocol)** is the diagnostic heartbeat of the internet. While protocols like TCP and UDP are designed to carry actual application data (like web pages or video streams), ICMP is designed purely for control and error-reporting.

It operates at the Network Layer (Layer 3) alongside IP. In fact, ICMP messages are always encapsulated directly inside standard IP packets. If a router drops a packet because a network is unreachable, or if a packet's Time-to-Live (TTL) expires, the router uses ICMP to send an error message back to the original sender.

## 1. Deep Dive & Mechanics

ICMP has no concept of ports (unlike TCP/UDP). Instead, it relies on a **Type** and a **Code** field in its header to convey meaning.

Some of the most critical ICMP Types include:
- **Type 0:** Echo Reply (Used by TICK1pingTICK1)
- **Type 8:** Echo Request (Used by TICK1pingTICK1)
- **Type 3:** Destination Unreachable (A router couldn't find the target. The *Code* field specifies why: e.g., Code 1 = Host Unreachable, Code 3 = Port Unreachable).
- **Type 11:** Time Exceeded (A packet's TTL hit zero, causing it to be dropped. This is the mechanism TICK1tracerouteTICK1 exploits to map network paths).

## 2. Mathematical / Theoretical Foundation

The diagnostic tool TICK1tracerouteTICK1 relies on a brilliant theoretical hack involving ICMP and the IPv4 header's **Time to Live (TTL)** field.

The TTL field is a single byte (0-255). Its mathematical purpose is to prevent routing loops. Every time a packet passes through a router (a "hop"), the router decrements the TTL by $1$. If TTL $= 0$, the router drops the packet and sends an **ICMP Type 11 (Time Exceeded)** message back to the sender.

TICK1tracerouteTICK1 artificially exploits this:
1. It sends a packet to the destination with TTL $= 1$. The very first router decrements it to 0, drops it, and replies with ICMP Type 11. Now we know the IP of the 1st router!
2. It sends a packet with TTL $= 2$. The 1st router decrements it to 1 and passes it. The 2nd router decrements it to 0, drops it, and replies. Now we know the IP of the 2nd router!
3. This loop continues, mapping the exact network topology hop-by-hop until the final destination is reached.

## 3. Real-World Implementation

The two most famous commands in networking rely entirely on ICMP.

TICK3bash
# 1. Ping: Tests basic connectivity and latency (Uses ICMP Type 8 and 0)
ping google.com

# 2. Traceroute: Maps the network path hop-by-hop
# (On Windows, this is 'tracert', which uses ICMP Echo Requests)
# (On Linux, 'traceroute' traditionally uses UDP packets, but relies on ICMP Type 11 for the replies)
traceroute google.com

# 3. MTR (My Traceroute): A powerful diagnostic tool combining ping and traceroute in real-time
mtr 8.8.8.8
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PC
    participant Router1
    participant Router2
    participant Dest (Server)

    Note over PC: traceroute: Send Packet (TTL=1)
    PC->>Router1: UDP Packet (TTL=1)
    Note over Router1: TTL hits 0. Drop.
    Router1-->>PC: ICMP Time Exceeded (I am Router1)
    
    Note over PC: traceroute: Send Packet (TTL=2)
    PC->>Router1: UDP Packet (TTL=2)
    Router1->>Router2: UDP Packet (TTL=1)
    Note over Router2: TTL hits 0. Drop.
    Router2-->>PC: ICMP Time Exceeded (I am Router2)
TICK3

## 5. Interview Prep

**Q: If I TICK1pingTICK1 a server and it times out, does that definitively mean the server is offline?**
**A:** No. Many system administrators and firewalls intentionally drop or block ICMP Type 8 (Echo Requests) to prevent their servers from being discovered by basic network scanners or hit by Ping Floods. A server could be perfectly online and serving web traffic on TCP Port 443, while simultaneously dropping all ICMP ping requests.

**Q: What is a "Smurf Attack"?**
**A:** A Smurf Attack is a classic DDoS attack. An attacker sends an ICMP Echo Request (Ping) to a network's broadcast address (e.g., TICK1192.168.1.255TICK1). Crucially, the attacker *spoofs* the Source IP to be the victim's IP. All 254 computers on that network receive the ping and simultaneously send ICMP Echo Replies to the victim, overwhelming their bandwidth. Modern routers block directed broadcasts to prevent this.

**Q: How does Path MTU Discovery work?**
**A:** When a sender transmits a packet with the "Don't Fragment" (DF) bit set in the IP header, and it hits a router where the next link has a smaller MTU (Maximum Transmission Unit), the router drops the packet. It then sends an **ICMP Type 3, Code 4 (Fragmentation Needed and DF Set)** message back to the sender, telling it exactly what the smaller MTU size is so the sender can adjust its packet size dynamically.

## 6. Production Use Cases

- **Network Monitoring (Nagios/Zabbix):** Enterprise monitoring tools constantly send ICMP pings to thousands of switches, routers, and servers to generate real-time uptime dashboards and alert administrators if hardware goes offline.
- **Blackhole Routing (Null Routing):** When a network is under DDoS attack, ISPs will often route the malicious traffic to a "Null0" interface. This interface drops the traffic and explicitly suppresses ICMP "Destination Unreachable" responses to save CPU overhead.

<Callout icon="danger" title="Ping of Death">
In the 1990s, a vulnerability known as the "Ping of Death" existed in many operating systems (including Windows 95). The maximum legal size of an IPv4 packet is 65,535 bytes. Hackers would craft a fragmented ICMP packet that, when reassembled by the target, exceeded 65,535 bytes, causing an immediate buffer overflow and a Blue Screen of Death.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IP/index.mdx',
    content: `---
title: IP (Internet Protocol)
description: "The principal set of rules governing the format of data sent over the internet or local network, responsible for routing and addressing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="IP (Internet Protocol)">
      {children}
    </ConceptTemplate>
  )
}

The **Internet Protocol (IP)** is the foundational protocol of the Network Layer (Layer 3) in the OSI model. If the internet is a massive global postal system, IP defines exactly what the "envelope" looks like, how addresses are written on it, and how postal workers (routers) pass that envelope from city to city until it reaches its destination.

It is a **connectionless** and **best-effort** protocol. This means IP does not guarantee that a packet will arrive successfully, nor does it guarantee packets will arrive in order. If a router is congested, it will simply drop the IP packet without apology. Reliability and ordering are delegated to higher-level protocols like TCP.

## 1. Deep Dive & Mechanics

Every piece of data sent across the internet (whether it's an email, a Zoom video frame, or a web page) is broken down and encapsulated inside an **IP Packet**. 

An IP Packet consists of two parts:
1. **The Header:** Contains the Source IP Address, the Destination IP Address, the Time-to-Live (TTL), the Protocol indicator (telling the receiver if the payload is TCP, UDP, ICMP, etc.), and fragmentation data.
2. **The Payload:** The actual data being transported (e.g., a TCP segment).

When a router receives an IP packet on one interface, it strips the Layer 2 Ethernet frame, inspects the Layer 3 Destination IP Address in the header, consults its internal Routing Table, determines the best exit interface, wraps the packet in a new Layer 2 frame, and pushes it out.

## 2. Mathematical / Theoretical Foundation

Routing decisions in IP are mathematically governed by **Prefix Matching**.

When a router looks at a destination IP (e.g., TICK1192.168.5.50TICK1), its routing table may have multiple overlapping mathematical subsets (CIDR blocks):
- TICK1192.0.0.0/8TICK1 (Go out Port A)
- TICK1192.168.0.0/16TICK1 (Go out Port B)
- TICK1192.168.5.0/24TICK1 (Go out Port C)

The router performs a bitwise AND operation on the destination IP and the subnet masks in the table. The mathematical rule is **Longest Prefix Match**: the router will always choose the most specific route (the one with the longest subnet mask). In this case, Port C is chosen because a TICK1/24TICK1 mask is more specific than a TICK1/16TICK1.

## 3. Real-World Implementation

Network administrators interact with IP at the system level primarily through the TICK1iproute2TICK1 suite in Linux (which replaced the legacy TICK1ifconfigTICK1 and TICK1routeTICK1 commands).

TICK3bash
# 1. View IP addresses assigned to all network interfaces
ip addr show

# 2. View the routing table (shows how IP decides where to send packets)
ip route show

# Example output:
# default via 192.168.1.1 dev eth0 proto dhcp 
# 192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 

# 3. Add a static route for a specific IP subnet
sudo ip route add 10.5.0.0/16 via 192.168.1.254 dev eth0
TICK3

## 4. Visualizations

TICK3mermaid
architecture-beta
    group internet(cloud)[The Internet Routing Path]

    service pc1(server)[Host A: 10.0.0.5] in internet
    service r1(database)[Router 1] in internet
    service r2(database)[Router 2] in internet
    service pc2(server)[Host B: 8.8.8.8] in internet

    pc1:R --> L:r1
    r1:R --> L:r2
    r2:R --> L:pc2
TICK3
*(Host A creates an IP packet destined for 8.8.8.8. Router 1 doesn't know where Host B is, but it knows Router 2 is closer. Router 2 makes the final delivery.)*

## 5. Interview Prep

**Q: IP is an unreliable, "best-effort" protocol. Why wouldn't the architects of the internet make the foundation reliable by default?**
**A:** This is a classic architectural tradeoff. Forcing reliability (acknowledgments, retransmissions, ordering) at Layer 3 would add immense processing overhead and latency to every single router on the internet. Furthermore, not all applications *want* reliability. Real-time VoIP or competitive gaming (which use UDP over IP) prefer dropping a late packet entirely rather than pausing the stream to wait for a retransmission. Reliability is strictly relegated to Layer 4 (TCP) so that Layer 3 (IP) can remain blazingly fast and stateless.

**Q: What is the purpose of the "Protocol" field in the IPv4 header (or "Next Header" in IPv6)?**
**A:** When a packet reaches its final destination, the operating system's IP stack needs to know which software module to hand the payload to. If the Protocol field is TICK16TICK1, it hands it to the TCP stack. If it's TICK117TICK1, it hands it to the UDP stack. If it's TICK11TICK1, it hands it to ICMP.

**Q: What happens if an IP packet is larger than the network's Maximum Transmission Unit (MTU)?**
**A:** IPv4 handles this via **Fragmentation**. The router splits the payload into smaller IP packets, assigns them the same Identification number, and uses the Fragment Offset field so the destination host can reassemble them. (Note: IPv6 handles this differently; routers simply drop the packet and tell the sender to fragment it themselves).

## 6. Production Use Cases

- **BGP (Border Gateway Protocol):** The core routing protocol of the internet. ISPs use BGP to advertise which IP prefixes (CIDR blocks) they own, allowing the global web of routers to construct the shortest paths for IP packets to traverse continents.
- **IPsec (Internet Protocol Security):** A suite of protocols used heavily in corporate VPNs. IPsec fundamentally alters IP by encrypting and authenticating the actual IP packets at Layer 3, ensuring that even if traffic traverses the public internet, routers only see encrypted payloads.

<Callout icon="info" title="IP is Protocol Independent">
A beautiful aspect of the OSI model is encapsulation independence. IP does not care what is carrying it. An IP packet can travel over an Ethernet cable, be transmitted over Wi-Fi, sent via satellite, or beamed via microwave. To the IP protocol, the physical medium is completely irrelevant.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv4/index.mdx',
    content: `---
title: IPv4 (Internet Protocol version 4)
description: "The fourth iteration of the Internet Protocol and the dominant addressing system that currently routes the vast majority of global internet traffic."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="IPv4 (Internet Protocol version 4)">
      {children}
    </ConceptTemplate>
  )
}

**IPv4** is the technology that made the modern internet possible. Deployed in 1983 for the ARPANET, it defines IP addresses as 32-bit numerical labels written in dotted-decimal notation (e.g., TICK1192.0.2.146TICK1).

Because it uses exactly 32 bits, the absolute maximum number of possible IPv4 addresses is $2^{32}$, or approximately **4.3 billion**. In the early 1980s, dedicating a unique IP address to 4.3 billion computers seemed like an impossible milestone. However, with the explosion of smartphones, IoT devices, and cloud computing, the pool of unallocated IPv4 addresses officially ran out (IPv4 Exhaustion) around 2011.

## 1. Deep Dive & Mechanics

An IPv4 address is divided into a **Network Portion** and a **Host Portion**. The boundary between these two is defined by the Subnet Mask (using CIDR notation).

To keep the internet functioning despite exhaustion, IPv4 heavily relies on **NAT (Network Address Translation)** and RFC 1918 Private Address Spaces. 

RFC 1918 defines three blocks of IP addresses that are "unroutable" on the public internet:
- **10.0.0.0/8** (Massive corporate networks / AWS VPCs)
- **172.16.0.0/12** (Docker containers, medium networks)
- **192.168.0.0/16** (Home routers)

When your laptop (TICK1192.168.1.5TICK1) connects to Google, your home router intercepts the packet, mathematically rewrites the Source IP to your ISP-provided Public IP, and forwards it to the internet. When Google replies, your router rewrites the Destination IP back to your private address.

## 2. Mathematical / Theoretical Foundation

The structure of an IPv4 Header is highly optimized for 32-bit CPU architectures. The standard header is exactly 20 bytes long.

One critical mathematical component of the header is the **Header Checksum**. 
Because packets travel across noisy copper wires, bit corruption happens. The sender calculates a mathematical hash of the header (using one's complement arithmetic) and places it in the Checksum field. When a router receives the packet, it performs the exact same math. If the computed hash doesn't perfectly match the Checksum field, the router assumes the destination IP is corrupted and instantly drops the packet to prevent misrouting.

*(Notably, because every router must decrement the TTL field by 1, the header data changes at every hop, forcing every router to mathematically recompute the Header Checksum before forwarding it—a massive source of CPU overhead that IPv6 later eliminated).*

## 3. Real-World Implementation

Interacting with IPv4 usually involves subnetting, pinging, or configuring static IPs.

TICK3bash
# On Linux, view your IPv4 addresses and subnet masks
ip -4 addr show

# Ping a public IPv4 address
ping 1.1.1.1

# Use netcat to listen on a specific IPv4 interface on port 8080
nc -l -p 8080 -s 192.168.1.50
TICK3

## 4. Visualizations

TICK3mermaid
packet-beta
    title Standard IPv4 Header (20 Bytes)
    0-3: "Version (4) | IHL"
    4-11: "Type of Service (ToS)"
    12-31: "Total Length"
    32-47: "Identification"
    48-50: "Flags"
    51-63: "Fragment Offset"
    64-71: "Time to Live (TTL)"
    72-79: "Protocol (TCP/UDP)"
    80-95: "Header Checksum"
    96-127: "Source IPv4 Address"
    128-159: "Destination IPv4 Address"
TICK3

## 5. Interview Prep

**Q: What is a Loopback Address?**
**A:** In IPv4, the entire TICK1127.0.0.0/8TICK1 block is reserved for loopback. The most famous address is TICK1127.0.0.1TICK1 (localhost). Any packet sent to this address never touches a physical Network Interface Card (NIC); the OS kernel instantly loops it back to the local machine. It is used extensively for testing local web servers and inter-process communication.

**Q: Why do we use TICK10.0.0.0TICK1 in configurations?**
**A:** Depending on the context, TICK10.0.0.0TICK1 has two meanings. In a routing table (TICK10.0.0.0/0TICK1), it is the "Default Route"—meaning "match any IP address." In server configuration (like configuring an Express.js or Nginx server to listen on TICK10.0.0.0TICK1), it means "bind to all available IPv4 interfaces on this machine," rather than binding to just localhost or a single specific ethernet port.

**Q: What is IP Spoofing?**
**A:** IP spoofing is the creation of IP packets with a forged source IP address. Because routers traditionally only care about the *Destination* IP to make routing decisions, an attacker can easily craft a packet that says it came from a trusted internal IP. Modern networks prevent this using BCP38 (Network Ingress Filtering), where edge routers drop packets if the source IP doesn't match the expected subnet of the interface it arrived on.

## 6. Production Use Cases

- **AWS Elastic IPs:** Because public IPv4 addresses are exhausted, they are now a commodity. Cloud providers own massive blocks of public IPv4 addresses and lease them to customers as "Elastic IPs" to attach to EC2 instances.
- **Docker Bridge Networks:** By default, the Docker daemon creates a private bridge network (often TICK1172.17.0.0/16TICK1) for containers. It relies entirely on Linux TICK1iptablesTICK1 to perform NAT, allowing containers with private IPv4 addresses to access the public internet.

<Callout icon="info" title="The Subnet Math Shortcut">
Network engineers use a quick mental shortcut for IPv4 subnetting. Because every bit borrowed halves the network, you can start at a TICK1/24TICK1 (256 IPs). A TICK1/25TICK1 is 128 IPs. A TICK1/26TICK1 is 64 IPs. A TICK1/27TICK1 is 32. This simple division is why CIDR notation is vastly preferred over writing out TICK1255.255.255.224TICK1.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/IPv6/index.mdx',
    content: `---
title: IPv6 (Internet Protocol version 6)
description: "The most recent version of the Internet Protocol, designed to replace IPv4 and solve the critical problem of global IP address exhaustion."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="IPv6 (Internet Protocol version 6)">
      {children}
    </ConceptTemplate>
  )
}

**IPv6** is the successor to IPv4. Drafted by the IETF in 1998, its primary mandate was to solve the impending exhaustion of the 32-bit IPv4 address space.

While IPv4 offers 4.3 billion addresses, IPv6 utilizes a **128-bit address space**. This mathematically provides $2^{128}$ addresses, which is roughly 340 undecillion ($3.4 \\times 10^{38}$) unique IP addresses. To visualize this scale, we could assign an IPv6 address to every single atom on the surface of the Earth, and we still wouldn't run out.

IPv6 addresses are represented as eight groups of four hexadecimal digits, separated by colons (e.g., TICK12001:0db8:85a3:0000:0000:8a2e:0370:7334TICK1).

## 1. Deep Dive & Mechanics

Because the address space is virtually infinite, IPv6 completely eliminates the need for **NAT (Network Address Translation)**. Every smartphone, smart lightbulb, and laptop on the planet can theoretically have a globally unique, publicly routable IP address, restoring the internet to its original true end-to-end architecture.

IPv6 also introduces **SLAAC (Stateless Address Autoconfiguration)**. In IPv4, clients rely on a DHCP server to hand them an IP. In IPv6, a router periodically broadcasts Router Advertisement (RA) messages. A client PC receives the network prefix (e.g., the first 64 bits) from the router, and then mathematically derives the last 64 bits (the Interface ID) by itself, usually by hashing its own MAC address (using the EUI-64 format) or generating random privacy extensions. The client configures its own IP address instantly without a central server.

## 2. Mathematical / Theoretical Foundation

The engineers who designed IPv6 took the opportunity to aggressively optimize the packet header to reduce CPU overhead on internet backbone routers.

In IPv4, the header is variable length and contains a Checksum. As mentioned, because the TTL decreases at every hop, every router must mathematically recalculate the IPv4 checksum.
**IPv6 entirely removes the header checksum.** Modern data-link layers (like Ethernet FCS) and transport layers (like TCP checksums) already perform error checking. By eliminating this redundant math, IPv6 hardware routing is theoretically much faster and requires less ASIC complexity.

Furthermore, IPv6 eliminates **Router Fragmentation**. In IPv4, if a packet is too big, the router slices it into pieces. In IPv6, routers simply drop oversized packets and send an ICMPv6 "Packet Too Big" message to the sender, forcing the sender's CPU to handle the fragmentation, drastically speeding up router throughput.

## 3. Real-World Implementation

IPv6 formatting has rules for abbreviation to make it human-readable:
1. You can omit leading zeros in a group (e.g., TICK10db8TICK1 becomes TICK1db8TICK1).
2. You can replace a single contiguous block of multiple TICK10000TICK1 groups with a double colon TICK1::TICK1 (but only once per address).

Example: TICK12001:0db8:0000:0000:0000:0000:0000:0001TICK1 condenses to just TICK12001:db8::1TICK1.

TICK3bash
# Ping a public IPv6 address (like Google's DNS)
ping6 2001:4860:4860::8888

# View your machine's IPv6 configuration (look for 'inet6')
ip -6 addr show

# An IPv6 URL in a web browser requires brackets because colons denote ports!
# http://[2001:db8::1]:8080/
TICK3

## 4. Visualizations

TICK3mermaid
packet-beta
    title Streamlined IPv6 Header (40 Bytes Fixed)
    0-3: "Version (6)"
    4-11: "Traffic Class"
    12-31: "Flow Label"
    32-47: "Payload Length"
    48-55: "Next Header"
    56-63: "Hop Limit (TTL)"
    64-191: "Source IPv6 Address (128 bits)"
    192-319: "Destination IPv6 Address (128 bits)"
TICK3

## 5. Interview Prep

**Q: What is the equivalent of the IPv4 localhost (TICK1127.0.0.1TICK1) in IPv6?**
**A:** The IPv6 loopback address is TICK1::1TICK1 (all zeros, ending in a one).

**Q: Does IPv6 use Broadcasts or ARP?**
**A:** No. IPv6 completely eliminates broadcasts (which were notoriously noisy in IPv4). Instead, it relies heavily on **Multicast** (sending packets only to subscribed groups of devices). The IPv4 ARP protocol is replaced by the **Neighbor Discovery Protocol (NDP)**, which uses ICMPv6 multicast to resolve MAC addresses much more efficiently.

**Q: What is a Link-Local Address?**
**A:** Every single IPv6 interface automatically generates a Link-Local Address starting with TICK1fe80::TICK1. This address is only valid on the immediate local network segment and is not routable across the internet. It is used for devices to communicate with each other (and find the default router) before they even get a public IP address.

## 6. Production Use Cases

- **Mobile Carrier Networks:** 4G LTE and 5G networks are almost exclusively built on IPv6. Mobile carriers ran out of IPv4 addresses years ago. Your smartphone primarily uses IPv6 to access the internet, utilizing Carrier-Grade NAT (CGNAT) or DNS64/NAT64 to access legacy IPv4-only websites.
- **IoT Smart Home Frameworks:** Protocols like Thread (used in the Matter smart home standard) are built directly on IPv6 (specifically 6LoWPAN). Every smart light switch and thermostat is assigned a routable IPv6 address, eliminating complex NAT port-forwarding issues.

<Callout icon="warning" title="Security Implications of No NAT">
Because IPv4 required NAT to share a single public IP, NAT accidentally acted as a rudimentary inbound firewall (blocking unsolicited traffic from reaching your internal PC). With IPv6, every device has a publicly routable IP. If a company enables IPv6 on their network without properly configuring stateful firewall rules on their edge router, every printer and workstation is instantly exposed to the entire public internet.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/MAC addresses/index.mdx',
    content: `---
title: MAC Addresses (Media Access Control)
description: "Unique 48-bit hardware identifiers assigned to Network Interface Controllers for communications at the data link layer of a network segment."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="MAC Addresses (Media Access Control)">
      {children}
    </ConceptTemplate>
  )
}

A **MAC Address** (Media Access Control Address) is the fundamental hardware identifier in networking. While IP addresses (Layer 3) are logical and change depending on which coffee shop you sit in, MAC addresses (Layer 2) are traditionally "burned-in" to the hardware (ROM) of your Network Interface Card (NIC) at the factory. 

If IP addresses are the mailing addresses (City and Zip Code) that get a packet to your neighborhood, the MAC address is your actual physical name that gets the packet handed directly to you by the mail carrier. Switches use MAC addresses to forward Ethernet frames to the correct physical port on a local network.

## 1. Deep Dive & Mechanics

A standard MAC address is 48 bits long (6 bytes) and is typically displayed as six groups of two hexadecimal digits (e.g., TICK100:1A:2B:3C:4D:5ETICK1).

It is strictly split into two halves:
1. **The first 24 bits (OUI - Organizationally Unique Identifier):** This is assigned by the IEEE to the manufacturer. If you look up TICK100:1A:2BTICK1 in a database, it will mathematically prove that the NIC was manufactured by a specific vendor, like Cisco, Apple, or Intel.
2. **The last 24 bits (NIC Specific):** This is assigned sequentially by the manufacturer, ensuring that no two cards from the same vendor ever share the same identifier.

When a network switch receives an Ethernet frame, it reads the Source MAC address and records it in its **MAC Address Table (CAM Table)** alongside the physical port it arrived on. This allows the switch to rapidly learn exactly which port every device is connected to.

## 2. Mathematical / Theoretical Foundation

The very first byte of a MAC address contains two theoretically critical boolean flags (bits 0 and 1):

1. **The U/L Bit (Universally/Locally Administered):** If this bit is TICK10TICK1, the MAC address is globally unique (factory burned). If this bit is flipped to TICK11TICK1, it indicates the MAC address was manually changed or randomly generated by software (Local Administration).
2. **The I/G Bit (Individual/Group):** If this bit is TICK10TICK1, the frame is a Unicast frame (destined for a single specific NIC). If this bit is TICK11TICK1, the frame is a Multicast or Broadcast frame.

For example, the broadcast MAC address TICK1FF:FF:FF:FF:FF:FFTICK1 is mathematically all binary 1s, meaning the I/G bit is 1, instructing every NIC on the network to process the frame.

## 3. Real-World Implementation

You interact with MAC addresses constantly in systems administration, often for Wake-on-LAN, DHCP reservations, or network troubleshooting.

TICK3bash
# View the MAC address (link/ether) of your interfaces on Linux
ip link show

# Change/Spoof a MAC address temporarily (interface must be down first)
sudo ip link set dev eth0 down
sudo ip link set dev eth0 address 02:11:22:33:44:55
sudo ip link set dev eth0 up

# View the ARP table (the mapping of IPs to MAC addresses on your LAN)
ip neigh show
TICK3

## 4. Visualizations

TICK3mermaid
packet-beta
    title MAC Address 48-bit Structure
    0-23: "OUI (Vendor ID: e.g., Apple, Dell)"
    24-47: "Device Specific (Assigned by Vendor)"
TICK3
*(The first 24 bits are publicly trackable to the manufacturer, the last 24 are a unique serial number).*

## 5. Interview Prep

**Q: Can two devices have the same MAC address on the internet? What about the local network?**
**A:** On the global internet, MAC addresses are irrelevant; routers strip Layer 2 frames off and only route via Layer 3 IPs. However, if two devices have the identical MAC address on the *same local network* (LAN), it creates chaos. The switch will constantly update its CAM table, flapping the port assignment back and forth. Packets will be delivered to the wrong machine, effectively breaking connectivity for both devices.

**Q: What is MAC Address Spoofing?**
**A:** While the default MAC is physically burned into ROM, the operating system driver reads it into RAM on boot and uses that RAM value for transmission. MAC Spoofing is simply telling the OS driver to use a custom 48-bit value instead. This is often used to bypass captive portals in hotels (by cloning a MAC address that has already paid for Wi-Fi) or to evade MAC-filtering firewalls.

**Q: Why do modern iOS and Android devices generate random MAC addresses?**
**A:** Privacy tracking. In the past, as you walked through a mall, every Wi-Fi router recorded your phone's Wi-Fi probe requests. Because your MAC address was globally unique and static, retail tracking companies could track your physical movements across the city. Modern OSes use **MAC Randomization** (setting the U/L bit to 1) to generate a fake, temporary MAC address for every different Wi-Fi network they scan, completely destroying this tracking mechanism.

## 6. Production Use Cases

- **DHCP Reservations:** Network administrators configure the DHCP server to always assign the IP TICK1192.168.1.100TICK1 to the office printer's specific MAC address. Even if the printer reboots or is offline for weeks, no other device can steal that IP.
- **Port Security (802.1X):** In enterprise environments, switches are configured with MAC filtering. If an employee unplugs their corporate desktop and plugs a rogue personal laptop into the Ethernet wall jack, the switch detects an unauthorized MAC address and instantly shuts down the physical port to prevent intrusion.

<Callout icon="warning" title="CAM Table Flooding">
A devastating Layer 2 attack is CAM Table Flooding (using tools like \`macof\`). The attacker generates hundreds of thousands of fake MAC addresses per second. The network switch attempts to learn all of them, exhausting its finite CAM Table memory. Once the memory is full, the switch fails open, defaulting to behaving like a dumb Hub—broadcasting all traffic (including passwords) to all ports, allowing the attacker to easily sniff the network.
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
