import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Switching/index.mdx',
    content: `---
title: Switching
description: "The fundamental networking process of receiving incoming data frames and selectively forwarding them to a specific destination port on a local area network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Switching">
      {children}
    </ConceptTemplate>
  )
}

**Switching** is the core mechanism that makes local area networks (LANs) highly efficient. While routers connect *different* networks together (using Layer 3 IP addresses), switches connect devices *within the same* network (using Layer 2 MAC addresses).

Before switches, networks used **Hubs**. A hub is mathematically dumb; if a signal comes in on Port 1, the hub blindly amplifies the electrical signal and blasts it out of Ports 2, 3, 4, and 5. This causes massive collisions and severe security vulnerabilities. A **Switch** is intelligent; it reads the data frame, identifies the exact recipient, and builds a dedicated electrical circuit strictly between the sender and the receiver.

## 1. Deep Dive & Mechanics

A switch maintains an internal database called the **MAC Address Table** (or CAM Table - Content Addressable Memory). 

When a switch is first turned on, its MAC table is completely empty. It populates this table dynamically through **Learning**:
1. PC-A (MAC: TICK1AA:AATICK1) sends a frame to PC-B (MAC: TICK1BB:BBTICK1) on Port 1.
2. The switch reads the Source MAC (TICK1AA:AATICK1) and instantly records in its table: *"MAC AA:AA lives on Port 1."*
3. Because the switch doesn't know where TICK1BB:BBTICK1 lives yet, it performs a **Flood**. It sends the frame out of every single port *except* Port 1.
4. PC-B receives the frame and replies. PC-B's reply enters Port 4.
5. The switch reads PC-B's Source MAC and records: *"MAC BB:BB lives on Port 4."*
6. From now on, when PC-A talks to PC-B, the switch selectively **Forwards** the frame directly from Port 1 to Port 4. No other ports see the traffic.

## 2. Mathematical / Theoretical Foundation

The mathematical magic of a switch lies in its **CAM (Content Addressable Memory)**.

Standard computer RAM is addressed by location: you give the CPU an address (TICK10x4FA2TICK1), and the RAM returns the data stored there. 
CAM is the mathematical inverse. You give the hardware the *data* (a 48-bit MAC address), and the hardware returns the *address* (the physical switch port number). 

Because CAM is implemented physically in silicon ASICs (Application-Specific Integrated Circuits), this lookup occurs in exactly $O(1)$ time, usually within a few nanoseconds. This is why a 48-port enterprise switch can forward millions of frames per second simultaneously without any CPU bottleneck.

## 3. Real-World Implementation

Network engineers interact with switching primarily through enterprise switch CLIs (like Cisco IOS or Juniper Junos).

TICK3bash
# In Cisco IOS, view the dynamic MAC Address Table
show mac address-table

# Example Output:
# Vlan    Mac Address       Type        Ports
# ----    -----------       --------    -----
#    1    0014.2201.2345    DYNAMIC     Gi0/1
#    1    a45e.60dc.4fb1    DYNAMIC     Gi0/4

# Clear the MAC address table manually (forces the switch to re-learn everything)
clear mac address-table dynamic
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PC-A (Port 1)
    participant Switch (CAM Table)
    participant PC-B (Port 4)
    participant PC-C (Port 7)

    Note over Switch (CAM Table): Table is Empty
    PC-A->>Switch: Frame (Src: AA, Dst: BB)
    Note over Switch (CAM Table): Learns: AA is on Port 1
    Note over Switch (CAM Table): Unknown Dst: BB. Flooding...
    Switch->>PC-B: Forward Frame (Flood)
    Switch->>PC-C: Forward Frame (Flood)
    
    PC-B->>Switch: Reply Frame (Src: BB, Dst: AA)
    Note over Switch (CAM Table): Learns: BB is on Port 4
    Note over Switch (CAM Table): Knows AA is on Port 1. Unicast Forward.
    Switch->>PC-A: Forward Frame (Unicast)
TICK3

## 5. Interview Prep

**Q: What is a Layer 3 Switch?**
**A:** A traditional Layer 2 switch only looks at MAC addresses. A Layer 3 switch (also called a Multilayer Switch) has the silicon capability to also look at Layer 3 IP addresses. It essentially combines the high-speed ASICs of a switch with the routing capabilities of a router. This is critical in enterprise networks to route traffic between different VLANs at wire-speed without bottlenecking a traditional external router (Router-on-a-Stick).

**Q: What happens if you plug a cable from Port 1 on a switch directly into Port 2 on the same switch?**
**A:** You create a Layer 2 Switching Loop. Broadcast frames will enter Port 1, get flooded out Port 2, immediately re-enter Port 1, and get flooded again, infinitely multiplying. Because Ethernet frames have no TTL (Time-to-Live) field like IP packets do, the frames never die. Within seconds, a **Broadcast Storm** will consume 100% of the switch's CPU and bandwidth, completely crashing the network. 

**Q: How do switches prevent Broadcast Storms?**
**A:** They use the **Spanning Tree Protocol (STP)**. STP allows switches to mathematically map the physical network topology. If it detects a physical loop (redundant cables), it logically blocks one of the ports in software, breaking the loop while maintaining it as a standby backup link in case the primary cable fails.

## 6. Production Use Cases

- **Microsegmentation:** In data centers, switches are used to implement port-level security. A switch can be configured (via 802.1X) to physically shut down a port if it detects an unauthorized MAC address attempting to connect.
- **Top of Rack (ToR) Switching:** In AWS/Azure data centers, every server rack has a massive switch at the top. All 40 servers in the rack connect to the ToR switch at 100Gbps, allowing blistering fast Layer 2 communication between servers running microservices in the same rack before the traffic ever needs to hit a Layer 3 router.

<Callout icon="danger" title="MAC Flooding Attacks">
A hacker can exploit the limited size of a switch's CAM table using a tool like \`macof\`. The tool bombards the switch with 100,000 fake MAC addresses per second. The CAM table fills up and crashes. When a switch's memory is full, its default fallback behavior is to act like a dumb Hub—it starts flooding *all* traffic to *all* ports. The hacker can now open Wireshark and passively sniff all sensitive traffic on the network.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP-IP model/index.mdx',
    content: `---
title: TCP/IP Model
description: "The conceptual model and set of communications protocols used to govern the internet and similar computer networks, consisting of four architectural layers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="TCP/IP Model">
      {children}
    </ConceptTemplate>
  )
}

While the OSI Model is the theoretical 7-layer standard used for teaching and design, the **TCP/IP Model** (also known as the Internet Protocol Suite or DoD Model) is the actual, practical architecture that the modern internet is built upon.

Developed by the US Department of Defense (DARPA) in the 1970s (predating the OSI model), it is more concise, condensing the complex 7 layers of OSI into just 4 highly functional layers. 

## 1. Deep Dive & Mechanics

The TCP/IP model focuses heavily on pragmatism over theoretical purity. The four layers are:

1. **Application Layer (Layer 4):** Combines OSI's Application, Presentation, and Session layers. This layer handles high-level protocols, data representation, and dialogue control. (e.g., HTTP, HTTPS, SSH, DNS, SMTP, FTP).
2. **Transport Layer (Layer 3):** Maps directly to OSI's Transport layer. It provides end-to-end communication services for applications, handling multiplexing via ports and offering either reliable (TCP) or unreliable (UDP) delivery.
3. **Internet Layer (Layer 2):** Maps to OSI's Network layer. This is the realm of the IP protocol. It handles the logical addressing and routing of packets across multiple distinct networks (e.g., IPv4, IPv6, ICMP).
4. **Network Access Layer (Layer 1):** Combines OSI's Data Link and Physical layers. Also called the Link Layer, it defines the hardware addressing and physical transmission of bits over the medium (e.g., Ethernet, Wi-Fi 802.11, MAC addresses).

## 2. Mathematical / Theoretical Foundation

The defining theoretical philosophy of the TCP/IP model is the **End-to-End Principle**. 

The architects (Vint Cerf and Bob Kahn) mathematically assumed that the network infrastructure (the routers and cables in the Internet Layer and Network Access Layer) would be inherently unreliable and chaotic. Therefore, they pushed all the complex mathematical state-tracking, error-checking, and flow control out to the absolute edges of the network—into the Transport Layer (TCP) running on the end user's PC.

Because the core routers only have to do one simple $O(1)$ task—look at the IP address and forward the packet—the internet can scale to billions of nodes with immense speed. If a packet is dropped, the network doesn't care; it is the mathematical responsibility of the user's PC (TCP stack) to detect the missing sequence number and request a retransmission.

## 3. Real-World Implementation

Because TCP/IP is the foundational stack of modern Operating Systems, you interact with it constantly via socket programming.

TICK3python
# A simple Python representation of the TCP/IP stack in action
import socket

# We interact at the Application Layer, but ask the OS to give us a Transport (TCP) socket
# AF_INET = Internet Layer (IPv4)
# SOCK_STREAM = Transport Layer (TCP)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# The OS handles the Network and Link layers automatically
# resolving 'google.com' via DNS, finding the IP, and generating Ethernet frames
s.connect(("google.com", 80))

# We send Application Layer data (HTTP)
s.sendall(b"GET / HTTP/1.1\\r\\nHost: google.com\\r\\n\\r\\n")
print(s.recv(1024).decode())
TICK3

## 4. Visualizations

TICK3mermaid
block-beta
    columns 2
    space space
    OSI7["OSI: Application (7)"] TCPIP4["TCP/IP: Application (4)"]
    OSI6["OSI: Presentation (6)"] space
    OSI5["OSI: Session (5)"] space
    
    OSI4["OSI: Transport (4)"] TCPIP3["TCP/IP: Transport (3)"]
    
    OSI3["OSI: Network (3)"] TCPIP2["TCP/IP: Internet (2)"]
    
    OSI2["OSI: Data Link (2)"] TCPIP1["TCP/IP: Network Access (1)"]
    OSI1["OSI: Physical (1)"] space
TICK3
*(The TCP/IP model condenses the top three OSI layers into one, and the bottom two OSI layers into one).*

## 5. Interview Prep

**Q: Why did the TCP/IP model "win" against the OSI model in the real world?**
**A:** Pragmatism and timing. The OSI model was developed by massive international committees and took years to finalize. It was highly prescriptive and theoretically pure but complex to implement in software. TCP/IP was funded by the US military, developed rapidly by engineers actually building the ARPANET, and the protocol suite was baked directly into BSD Unix for free. By the time OSI was finalized, TCP/IP was already running the burgeoning internet.

**Q: At which TCP/IP layer does a firewall primarily operate?**
**A:** Traditional stateful firewalls (like iptables) operate simultaneously at the Internet Layer (blocking specific IP addresses) and the Transport Layer (blocking specific TCP/UDP ports). Modern Next-Generation Firewalls (NGFW) or Web Application Firewalls (WAF) operate all the way up at the Application Layer (inspecting HTTP headers or blocking SQL injection payloads).

**Q: How does the concept of Encapsulation map to the TCP/IP layers?**
**A:** 
- The Application Layer creates raw **Data**.
- The Transport Layer encapsulates it into a **Segment** (adds TCP/UDP header).
- The Internet Layer encapsulates it into a **Packet** (adds IP header).
- The Network Access Layer encapsulates it into a **Frame** (adds Ethernet header) and converts it to **Bits** for physical transmission.

## 6. Production Use Cases

- **Software Defined Networking (SDN):** Cloud providers heavily utilize the TCP/IP model to virtualize infrastructure. In AWS VPCs, the physical Network Access Layer is abstracted away. Engineers only interact with the Internet Layer (defining CIDR subnets and Route Tables) and the Transport Layer (defining Security Group rules for TCP/UDP ports).
- **Socket Programming:** Every time a backend developer writes a Node.js Express server or a Go web server, they are interfacing directly with the OS's TCP/IP stack, instructing the kernel to bind a process to a specific Transport Layer port (e.g., 8080) and listen for incoming Internet Layer IP packets.

<Callout icon="info" title="The 5-Layer Hybrid Model">
In modern computer science textbooks (like Kurose and Ross), academics often use a 5-layer hybrid model that combines the best of both worlds. It takes the top 3 layers of TCP/IP (Application, Transport, Network/Internet) but splits the bottom layer back into OSI's Data Link and Physical layers, as the distinction between a MAC address (Data Link) and a radio wave (Physical) is too important to ignore in modern engineering.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/TCP/index.mdx',
    content: `---
title: TCP (Transmission Control Protocol)
description: "A highly reliable, connection-oriented protocol at the Transport layer that guarantees the delivery, order, and integrity of data packets."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="TCP (Transmission Control Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**TCP (Transmission Control Protocol)** is the workhorse of the internet. If you are reading a webpage, sending an email, or downloading a file, you are relying on TCP.

It resides at the Transport Layer (Layer 4) of the OSI model. While the underlying IP protocol (Layer 3) is chaotic, unreliable, and prone to dropping or reordering packets, TCP sits on top of IP and acts as an uncompromising micromanager. It mathematically guarantees that every single byte of data sent by an application will be delivered to the destination exactly as it was sent, in the exact correct order, without duplication or corruption.

## 1. Deep Dive & Mechanics

TCP establishes a **Stateful Connection** between two computers before any data is sent. This is accomplished via the famous **3-Way Handshake**:
1. **SYN:** The Client sends a synchronization packet with a random mathematical Sequence Number (e.g., $1000$).
2. **SYN-ACK:** The Server acknowledges the client's sequence ($1001$) and sends its own random Sequence Number (e.g., $5000$).
3. **ACK:** The Client acknowledges the server's sequence ($5001$). The connection is now established.

During data transmission, TCP relies on **Sequence Numbers** and **Acknowledgments (ACKs)**. If the client sends 500 bytes of data (Seq: 1001), the server must reply with an ACK of 1501 (meaning "I received everything up to 1500, please send the next byte starting at 1501"). If the client doesn't receive that ACK within a specific timeout window, it assumes the packet was dropped by a router and mathematically forces a retransmission.

## 2. Mathematical / Theoretical Foundation

TCP's most complex mathematical algorithms involve **Flow Control** and **Congestion Control**.

- **Flow Control (The Sliding Window):** Prevents the sender from overwhelming the receiver's memory buffer. The receiver mathematically calculates how much free RAM it has left in its TCP buffer and advertises this "Window Size" in every ACK packet. If the Window Size hits 0, the sender pauses transmission until the receiver's application (like a slow web browser) processes the data and frees up RAM.
- **Congestion Control (AIMD - Additive Increase, Multiplicative Decrease):** Prevents the sender from overwhelming the internet routers. The sender starts by sending data slowly (Slow Start). It exponentially increases the send rate until a packet drops (which it assumes is due to router congestion). It then *multiplicatively decreases* the send rate (halving it) to relieve the internet, and then *additively increases* it slowly again. This creates the classic "sawtooth" graph of TCP throughput.

## 3. Real-World Implementation

Developers rarely write raw TCP packets; they interact with them via OS Socket APIs.

TICK3bash
# View all active TCP connections and their current state on a server
netstat -tnp
# or on modern Linux:
ss -tnp

# Output example:
# State      Recv-Q Send-Q  Local Address:Port   Peer Address:Port
# ESTAB      0      0       192.168.1.10:22      203.0.113.5:54321
# TIME-WAIT  0      0       192.168.1.10:80      10.0.0.5:12345

# Manually initiate a TCP connection to test if a port is open
telnet google.com 443
# or
nc -vz google.com 443
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: The 3-Way Handshake
    Client->>Server: 1. SYN (Seq=100)
    Server-->>Client: 2. SYN-ACK (Seq=500, Ack=101)
    Client->>Server: 3. ACK (Seq=101, Ack=501)
    
    Note over Client,Server: Data Transfer
    Client->>Server: Data (Seq=101, Len=50)
    Server-->>Client: ACK (Ack=151)
    
    Note over Client,Server: Connection Teardown (4-Way)
    Client->>Server: FIN (I am done sending)
    Server-->>Client: ACK (Acknowledged)
    Server->>Client: FIN (I am also done sending)
    Client-->>Server: ACK (Acknowledged)
TICK3

## 5. Interview Prep

**Q: What is the difference between TCP and UDP?**
**A:** TCP is connection-oriented, reliable, orders packets, and performs error checking and flow control, but has high latency overhead (used for HTTP, SSH, FTP). UDP is connectionless, unreliable, does not order packets, and has zero flow control, but is blazingly fast with minimal overhead (used for Video Streaming, VoIP, DNS, Gaming).

**Q: What is a SYN Flood Attack?**
**A:** A DDoS attack where the attacker sends thousands of TCP SYN packets to a server but intentionally never replies with the final ACK. The server allocates RAM for each half-open connection, waiting for the handshake to finish. Eventually, the server's TCP backlog queue fills up, and it drops all legitimate new connections. It is mitigated using SYN Cookies.

**Q: Why does TCP use a 4-Way Teardown to close a connection?**
**A:** TCP is a full-duplex protocol; data can flow in both directions independently. When the Client sends a FIN packet, it means "I have no more data to send," but it *can still receive data*. The Server ACKs this, but may continue sending its own data for several more seconds before finally sending its own FIN packet to permanently close its half of the connection.

## 6. Production Use Cases

- **Web Browsing & APIs (HTTP/HTTPS):** When you download a 5GB file via HTTP, it rides on TCP. If even a single byte was dropped out of order and not retransmitted, the entire ZIP file or executable binary would be hopelessly corrupted.
- **Relational Databases:** Protocols for PostgreSQL and MySQL operate strictly over TCP. If a backend server sends a complex SQL TICK1UPDATETICK1 query to the database, TCP guarantees the query arrives perfectly intact.

<Callout icon="info" title="The BBR Congestion Algorithm">
For decades, TCP congestion control (like CUBIC) relied strictly on packet loss to detect network congestion. In 2016, Google engineers introduced **TCP BBR (Bottleneck Bandwidth and Round-trip propagation time)**. Instead of waiting for packets to drop, BBR continuously calculates the mathematical physics of the network tube (Bandwidth × Latency) to determine the exact maximum speed data can be sent without causing a traffic jam. Enabling TCP BBR on a Linux server can instantly double web application throughput on high-latency links!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/UDP/index.mdx',
    content: `---
title: UDP (User Datagram Protocol)
description: "A lightweight, connectionless Transport layer protocol that prioritizes speed and low latency over reliability and data integrity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="UDP (User Datagram Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**UDP (User Datagram Protocol)** is the rebellious, fast-moving counterpart to TCP at the Transport Layer (Layer 4). While TCP is the meticulous accountant ensuring every byte is tracked and accounted for, UDP is the reckless courier who throws the package at the door and drives away without waiting for a signature.

UDP is a **connectionless** protocol. It performs no handshakes, no acknowledgments, no packet reordering, and no flow control. If a router is congested, it drops the UDP packet, and the sender will never know it happened.

## 1. Deep Dive & Mechanics

Because UDP strips away all of the reliability mechanisms of TCP, its header is incredibly minimal—only 8 bytes long (compared to TCP's 20-60 bytes).

A UDP Header contains exactly four fields:
1. **Source Port (16 bits):** Where it came from.
2. **Destination Port (16 bits):** Where it's going.
3. **Length (16 bits):** The size of the header and payload.
4. **Checksum (16 bits):** A basic mathematical check to ensure the payload wasn't corrupted in transit.

When an application tells the OS to send data via UDP, the OS instantly wraps it in this 8-byte header and blasts it onto the network wire. There is zero delay for connection establishment.

## 2. Mathematical / Theoretical Foundation

The theoretical justification for UDP lies in the physics of **Real-Time Communications** and the concept of **Head-of-Line Blocking**.

In TCP, if packet #1, #2, and #4 arrive, but packet #3 is dropped, TCP mathematically forces the operating system to *buffer* #4 and halt the application until packet #3 is retransmitted and arrives. This is called Head-of-Line Blocking.

In a live Zoom video call or a competitive multiplayer game (like Counter-Strike), this is disastrous. If a video frame from 0.5 seconds ago is dropped, retransmitting it is pointless—by the time it arrives, it's stale data, and the stream will noticeably stutter. UDP solves this mathematically by simply passing packets #1, #2, and #4 directly to the application. The application accepts the temporary visual glitch and keeps rendering the stream with the absolute lowest possible latency.

## 3. Real-World Implementation

Interacting with UDP requires specific flags in command-line tools, as most default to TCP.

TICK3bash
# Test if a UDP port is open (e.g., DNS port 53) using netcat (-u flag)
# Note: Because UDP is connectionless, it may not respond even if open!
nc -vzu 8.8.8.8 53

# Use iPerf3 to blast a network with UDP traffic to test maximum raw bandwidth
# Server side:
iperf3 -s
# Client side (-u for UDP, -b for target bandwidth):
iperf3 -c 192.168.1.10 -u -b 1000M

# View active UDP listening ports on a Linux server
ss -ulnp
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: Zero Setup Time
    Client->>Server: Datagram 1
    Client->>Server: Datagram 2
    Note over Client,Server: Datagram 3 is dropped by a router
    Client->>Server: Datagram 4
    
    Note over Server: Receives 1, 2, 4.<br/>Passes to App immediately.<br/>Does not care about 3.
TICK3

## 5. Interview Prep

**Q: Can you achieve reliability over UDP?**
**A:** Yes, but the *application* must handle it, not the operating system kernel. A developer can build a custom protocol on top of UDP where the application itself implements sequence numbers and retransmissions. This is heavily used in modern protocols like **QUIC** (which powers HTTP/3). QUIC uses UDP to avoid TCP's slow handshakes, but implements its own high-speed reliability in user-space.

**Q: Why does DNS primarily use UDP instead of TCP?**
**A:** A standard DNS query (translating a domain to an IP) is tiny and fits entirely inside a single 512-byte UDP packet. If DNS used TCP, a client would have to send 3 packets just to establish the handshake, then send the query, wait for the response, and send 4 packets to tear down the connection. Using UDP, it's a single packet out, single packet back. If it drops, the DNS client simply times out and retries.

**Q: What is a UDP Amplification DDoS Attack?**
**A:** Because UDP is connectionless, it is trivial to spoof the Source IP address. An attacker sends a tiny 64-byte UDP request to a public NTP (Network Time Protocol) or DNS server, but fakes the Source IP to be the victim's IP. The NTP server responds to the query with a massive 3,000-byte response, sending it directly to the victim. The attacker has "amplified" their bandwidth by 50x, easily overwhelming the victim's internet connection.

## 6. Production Use Cases

- **Streaming & Telemetry:** Video/Audio streaming (WebRTC, Zoom, Twitch ingest) and IoT sensor telemetry (where a sensor blasts temperature data every second; missing one second is irrelevant).
- **Service Discovery & Broadcasting:** Protocols like DHCP (to get an IP address) and mDNS (Bonjour/Chromecast discovery) rely on UDP broadcasts. You cannot broadcast with TCP because TCP requires a 1-to-1 handshake. UDP allows a device to blast a single packet to a subnet (TICK1255.255.255.255TICK1) asking, "Are there any printers here?"

<Callout icon="warning" title="Firewalls and UDP">
Because UDP has no concept of a "connection state" (no SYN, ACK, FIN), stateful firewalls have a difficult time tracking it. If an internal PC sends a UDP packet out to a server, the firewall creates a temporary "pseudo-state" allowing UDP packets from that server back in. However, this state usually times out very quickly (e.g., 30 seconds of silence), which is why UDP-based applications (like SIP VoIP phones) must constantly send "Keep-Alive" ping packets to keep the firewall hole open.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/VLAN/index.mdx',
    content: `---
title: VLAN (Virtual Local Area Network)
description: "A logical grouping of devices on one or more physical LANs, allowing for network segmentation without requiring separate physical hardware."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="VLAN (Virtual Local Area Network)">
      {children}
    </ConceptTemplate>
  )
}

A **VLAN (Virtual Local Area Network)** is a software-defined layer of network isolation operating at Layer 2 (Data Link Layer). 

Historically, if an enterprise wanted to completely separate their Accounting department's network from the Guest Wi-Fi network for security reasons, they had to buy two entirely separate physical switches and run separate physical cables. VLANs solve this by logically slicing a single physical 48-port switch into multiple independent "virtual switches." 

Ports 1-10 can be assigned to VLAN 10 (Accounting), and Ports 11-20 to VLAN 20 (Guest). Even though they share the same physical silicon, a computer on Port 1 mathematically cannot send a Layer 2 Ethernet frame to a computer on Port 11.

## 1. Deep Dive & Mechanics

VLANs are standardized under the **IEEE 802.1Q** protocol.

When a standard Ethernet frame enters a switch port that is configured as a specific VLAN (an **Access Port**), the switch's internal ASICs mathematically inject a 4-byte **VLAN Tag** directly into the Ethernet header. 

This tag contains a 12-bit VLAN Identifier (VID). As the frame moves through the internal backplane of the switch, the hardware enforces strict isolation: this frame is only allowed to exit out of other ports that share the same 12-bit VID. Before the frame is pushed out of the destination Access Port to the final PC, the switch strips the tag off. The PCs are completely unaware that VLANs even exist.

## 2. Mathematical / Theoretical Foundation

The 12-bit VLAN Identifier (VID) dictates the theoretical limits of network segmentation.

Because $2^{12} = 4096$, a single Ethernet network can mathematically support a maximum of **4,096 distinct VLANs** (with VLAN 0 and 4095 being reserved, leaving 4,094 usable). 

In traditional corporate environments, 4,000 subnets are more than enough. However, in massive modern cloud data centers (like AWS or Azure) hosting tens of thousands of different tenants, this 12-bit mathematical limit was a severe architectural bottleneck. This directly led to the invention of **VXLAN (Virtual Extensible LAN)**, which encapsulates Layer 2 frames inside Layer 4 UDP packets and uses a 24-bit identifier, expanding the limit to 16 million virtual networks.

## 3. Real-World Implementation

Configuring VLANs requires managing two types of switch ports: **Access Ports** and **Trunk Ports**.

- **Access Port:** Connects to an end device (PC, printer). The switch adds the tag when data enters, and removes it when data exits.
- **Trunk Port:** Connects to another switch or a router. The switch *leaves the 802.1Q tags intact* when sending data out this port, allowing traffic for dozens of different VLANs to traverse a single physical cable.

TICK3bash
# Example configuration on a Cisco IOS Switch

# 1. Create a VLAN
Switch(config)# vlan 20
Switch(config-vlan)# name GUEST_WIFI

# 2. Assign a port to the VLAN (Access Port)
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20

# 3. Configure a port connecting to another switch (Trunk Port)
Switch(config)# interface GigabitEthernet0/48
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Switch 1
        A(Port 1 - PC A) -.-> |Access: Untagged| V10[Internal VLAN 10]
        B(Port 2 - PC B) -.-> |Access: Untagged| V20[Internal VLAN 20]
    end

    V10 ==> |Trunk: Tagged 10| TrunkLink((802.1Q Trunk Cable))
    V20 ==> |Trunk: Tagged 20| TrunkLink

    subgraph Switch 2
        TrunkLink ==> |Trunk: Tagged 10| V10_2[Internal VLAN 10]
        TrunkLink ==> |Trunk: Tagged 20| V20_2[Internal VLAN 20]
        V10_2 -.-> |Access: Untagged| C(Port 1 - PC C)
        V20_2 -.-> |Access: Untagged| D(Port 2 - PC D)
    end
TICK3

## 5. Interview Prep

**Q: Can a device in VLAN 10 communicate with a device in VLAN 20?**
**A:** Not directly at Layer 2. By definition, VLANs represent separate broadcast domains. To communicate between them, you must use a Layer 3 device (a Router or a Multilayer Switch). The process is called **Inter-VLAN Routing**. The traffic must leave VLAN 10, hit the router, the router inspects the IP address, makes a routing decision, and pushes it back down into VLAN 20.

**Q: What is a "Native VLAN"?**
**A:** On an 802.1Q Trunk port, multiple tagged VLANs travel across the wire. The Native VLAN (usually VLAN 1 by default) is the one exception: traffic belonging to the Native VLAN is sent across the trunk *without* a tag. This was historically necessary for backward compatibility with legacy hubs that didn't understand 802.1Q headers. Security best practices dictate changing the Native VLAN to an unused ID to prevent VLAN Hopping attacks.

**Q: What is "Router on a Stick"?**
**A:** A network design pattern where a single physical router is connected to a switch via a single physical Trunk Cable. The router's physical interface is mathematically split into multiple "Sub-interfaces" (e.g., TICK1eth0.10TICK1 and TICK1eth0.20TICK1), each acting as the default gateway for a different VLAN, handling all the Inter-VLAN routing through one cable.

## 6. Production Use Cases

- **VoIP Isolation:** In corporate offices, desk phones and PCs often share the same ethernet cable (the PC plugs into the phone, the phone plugs into the wall). Switches use a feature called Voice VLAN to logically separate the traffic. The phone tags its audio traffic (VLAN 50), while the PC sends untagged data traffic (VLAN 10). The switch prioritizes the Voice VLAN to prevent choppy phone calls while someone is downloading a large file.
- **Hypervisor Networking:** In VMware ESXi or Proxmox, virtual machines are connected to a Virtual Switch inside the server. The physical NIC on the server is configured as an 802.1Q Trunk to the physical Top-of-Rack switch. This allows the virtualization admin to instantly place VM-A in the Database VLAN and VM-B in the Web VLAN purely through software.

<Callout icon="danger" title="VLAN Hopping (Double Tagging)">
A classic Layer 2 security vulnerability. If an attacker's PC is connected to an access port that happens to belong to the Native VLAN, they can mathematically craft a malicious Ethernet frame with *two* 802.1Q tags. The first switch strips the outer Native tag and forwards it down the trunk. The second switch receives the frame, reads the inner (forged) tag, and blindly forwards the attacker's traffic into a highly secure VLAN that they shouldn't have access to.
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
