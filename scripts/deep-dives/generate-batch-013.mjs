import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Load balancing (L4-L7)/index.mdx',
    content: `---
title: Load Balancing (L4-L7)
description: "The mathematical distribution of network traffic across a cluster of servers to improve responsiveness, availability, and capacity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Load Balancing (L4-L7)">
      {children}
    </ConceptTemplate>
  )
}

**Load Balancing** is the architectural prerequisite for horizontal scaling. If a single web server can handle 1,000 requests per second, and you receive 5,000 requests per second, you must deploy 5 servers. A Load Balancer sits mathematically in front of those 5 servers, acts as the single public IP address, and seamlessly distributes the incoming traffic among them so no single server is overwhelmed.

Modern Load Balancers operate primarily at two distinct layers of the OSI model: **Layer 4 (Transport)** and **Layer 7 (Application)**.

## 1. Deep Dive & Mechanics

**Layer 4 (L4) Load Balancing:**
Operates entirely at the TCP/UDP level. The load balancer does *not* look inside the payload (it doesn't know if the traffic is HTTP, SSH, or Redis). It simply looks at the Source IP and Destination Port. 
- **Pros:** Blazingly fast, mathematically simple, low CPU overhead.
- **Cons:** Blind. It cannot route traffic based on URL paths or cookies.

**Layer 7 (L7) Load Balancing:**
Operates at the Application level. The load balancer fully terminates the TCP connection, decrypts the TLS/SSL mathematically, and parses the actual HTTP request. 
- **Pros:** Highly intelligent. It can route TICK1/images/*TICK1 to a cluster of image servers, and TICK1/api/*TICK1 to a cluster of database microservices. It can manipulate headers and enforce Web Application Firewalls (WAF).
- **Cons:** High CPU overhead due to TLS decryption and HTTP parsing.

## 2. Mathematical / Theoretical Foundation

Load balancers distribute traffic using specific mathematical **Scheduling Algorithms**:

1. **Round Robin:** The simplest algorithm. Request 1 goes to Server A, Request 2 to Server B, Request 3 to Server C, and Request 4 loops back to Server A. Mathematically $O(1)$, but assumes all servers have identical CPU capacity and all requests take the same amount of time to process.
2. **Least Connections:** Mathematically tracks the number of active TCP connections on every backend server. It routes the next request to the server with the fewest active connections, preventing a server from getting bogged down by a slow database query.
3. **IP Hash (Consistent Hashing):** The load balancer mathematically hashes the Client's IP address (e.g., TICK1hash(192.168.1.50) % N_SERVERSTICK1). This guarantees that a specific user will *always* be routed to the exact same backend server, which is critical for stateful applications storing session data in local RAM.

## 3. Real-World Implementation

**HAProxy** and **Nginx** are the industry standards for software load balancing.

TICK3nginx
# An example Nginx Layer 7 Load Balancer configuration
upstream backend_api {
    # Using the Least Connections algorithm
    least_conn;
    
    server 10.0.0.11:8080 weight=3; # This server is 3x more powerful
    server 10.0.0.12:8080;
    server 10.0.0.13:8080 backup;   # Only use if 11 and 12 crash
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend_api;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    Client1[Client A] -->|GET /api| L7[L7 Load Balancer]
    Client2[Client B] -->|GET /images| L7
    Client3[Client C] -->|GET /api| L7

    subgraph Backend Fleet
        API1[API Server 1]
        API2[API Server 2]
        Img1[Image Server 1]
    end

    L7 -- Routes /api --> API1
    L7 -- Routes /api --> API2
    L7 -- Routes /images --> Img1

    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class L7 highlight;
TICK3

## 5. Interview Prep

**Q: What is a Health Check?**
**A:** If Server B crashes, the Load Balancer needs to know instantly so it doesn't send users to a dead server. The Load Balancer mathematically polls every backend server (e.g., sending an HTTP GET to TICK1/healthTICK1 every 5 seconds). If Server B returns a TICK1500 Internal ErrorTICK1 or times out, the LB mathematically removes Server B from the Round Robin pool until it recovers.

**Q: In Layer 7 load balancing, how does the backend server know the original Client's IP address?**
**A:** Because the L7 LB terminates the TCP connection, the backend server mathematically sees the *Load Balancer's* IP address as the Source IP, not the user's. To fix this, the L7 LB injects the user's real IP into a special HTTP header called TICK1X-Forwarded-ForTICK1 before passing the request to the backend.

**Q: How does AWS ALB differ from AWS NLB?**
**A:** 
- **ALB (Application Load Balancer):** A Layer 7 load balancer. It terminates HTTP/HTTPS, supports routing by URL path (TICK1/apiTICK1), and integrates heavily with AWS WAF.
- **NLB (Network Load Balancer):** A Layer 4 load balancer. It mathematically operates at the TCP/UDP level, capable of handling millions of requests per second at ultra-low latency. It is often used for non-HTTP traffic like database routing or massive multiplayer game servers.

## 6. Production Use Cases

- **Microservice Architectures (Kubernetes):** Inside a K8s cluster, the TICK1kube-proxyTICK1 acts as an internal L4 load balancer. When Microservice A wants to talk to Microservice B, it sends traffic to a single virtual "Service" IP. The internal load balancer mathematically distributes that traffic across the 50 dynamically scaling Pods running Microservice B.
- **Global Traffic Management (GSLB):** Global Server Load Balancing operates at the DNS level. When a user requests TICK1google.comTICK1, the GSLB looks at the user's location and mathematically returns the IP address of the closest regional Load Balancer (e.g., returning the Tokyo LB for a Japanese user, and the London LB for a UK user).

<Callout icon="danger" title="The Single Point of Failure">
A Load Balancer mathematically creates a massive Single Point of Failure (SPOF). If you have 100 perfectly healthy backend servers, but the Load Balancer in front of them crashes, your entire website goes offline. In production, Load Balancers are NEVER deployed alone. They are deployed in High Availability (HA) pairs (Active/Passive) using protocols like VRRP or Keepalived. If the Active LB loses power, the Passive LB mathematically steals the public IP address in milliseconds and takes over routing.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/MPLS/index.mdx',
    content: `---
title: MPLS (Multiprotocol Label Switching)
description: "A high-performance telecommunications routing technique that mathematically directs data from one node to the next based on short path labels rather than long network addresses."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="MPLS (Multiprotocol Label Switching)">
      {children}
    </ConceptTemplate>
  )
}

**MPLS (Multiprotocol Label Switching)** is the invisible backbone of enterprise Wide Area Networks (WANs) and global ISPs. 

Invented in the late 1990s, MPLS was designed to solve the immense mathematical overhead of traditional IP routing. When a standard IP packet hits a router, the router must parse the Layer 3 IP header, perform a mathematically complex Longest-Prefix-Match lookup in a massive routing table containing millions of internet routes, and decide where to send the packet. Doing this at every single router across a continent induces latency.

MPLS bypasses this. Instead of reading the IP address, an MPLS ingress router injects a tiny, simple 32-bit **Label** in front of the IP packet. Every subsequent router in the network mathematically ignores the complex IP address and simply switches the packet based on that tiny label in exactly $O(1)$ time in hardware.

## 1. Deep Dive & Mechanics

MPLS operates in the gray area between Layer 2 (Data Link) and Layer 3 (Network), often referred to as **Layer 2.5**.

1. **Ingress LER (Label Edge Router):** The packet enters the MPLS network. The router inspects the IP address once, mathematically determines the final destination, and "pushes" (adds) an MPLS Label onto the packet.
2. **LSR (Label Switching Routers):** The core routers inside the ISP network. They never look at the IP address. They read the Label (e.g., TICK1Label 45TICK1). Their internal table simply says: *"If I receive Label 45 on Port 1, swap it to Label 82 and blast it out Port 3."* This "swap" operation takes nanoseconds.
3. **Egress LER:** The packet reaches the end of the MPLS network. The final router "pops" (removes) the label, exposing the original standard IP packet, and delivers it to the customer.

## 2. Mathematical / Theoretical Foundation

The true mathematical power of MPLS is **Traffic Engineering (TE)**.

Standard IP routing protocols (like OSPF or BGP) are mathematically rigid: they always take the "Shortest Path." If the shortest path between New York and LA is through Chicago, 100% of the traffic will go through Chicago, causing a massive bottleneck, while the fiber-optic cable through Dallas sits completely empty.

MPLS allows network engineers to mathematically define explicit, pre-calculated paths (Label Switched Paths - LSPs). An engineer can program the MPLS labels to say: *"Send standard web traffic over the shortest path via Chicago. But send high-priority Voice-over-IP (VoIP) traffic over the slightly longer, but completely uncongested path via Dallas."* This guarantees Quality of Service (QoS).

## 3. Real-World Implementation

MPLS is strictly an infrastructure technology managed by ISPs (like AT&T or Verizon). You cannot run MPLS on a home router.

TICK3text
# A conceptual view of an MPLS Label Forwarding Information Base (LFIB) inside a core LSR router.
# Notice there are no IP addresses, only integer labels.

Incoming Label | Incoming Interface | Action          | Outgoing Label | Outgoing Interface
-----------------------------------------------------------------------------------------
45             | GigabitEthernet0/1 | SWAP to 82      | 82             | GigabitEthernet0/3
90             | GigabitEthernet0/1 | SWAP to 12      | 12             | GigabitEthernet0/4
105            | GigabitEthernet0/2 | POP (Remove)    | None           | GigabitEthernet0/5
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Customer NY (IP: 10.0.0.1)
    participant Ingress Edge (ISP)
    participant Core Router (ISP)
    participant Egress Edge (ISP)
    participant Customer LA (IP: 10.0.0.2)

    Customer NY->>Ingress Edge: Standard IP Packet (Dst: 10.0.0.2)
    Note over Ingress Edge: Reads IP.<br/>PUSHES Label [45]
    Ingress Edge->>Core Router: MPLS Frame [Label 45] + [IP Packet]
    
    Note over Core Router: Ignores IP.<br/>Reads [45]. SWAPS to [82].
    Core Router->>Egress Edge: MPLS Frame [Label 82] + [IP Packet]
    
    Note over Egress Edge: POPs Label.<br/>Exposes standard IP.
    Egress Edge->>Customer LA: Standard IP Packet (Dst: 10.0.0.2)
TICK3

## 5. Interview Prep

**Q: What is an MPLS VPN (L3VPN)?**
**A:** This is the primary reason corporations buy MPLS circuits. A bank has a branch in NY and LA. Instead of routing their traffic over the chaotic public internet using IPSec VPNs, they pay an ISP for an MPLS L3VPN. The ISP mathematically segregates the bank's traffic inside the core MPLS network using unique labels. The traffic never touches the public internet. It provides the mathematical security and privacy of a private fiber-optic cable, but runs on the ISP's shared infrastructure.

**Q: Is MPLS faster than standard IP routing today?**
**A:** Historically, yes. Today, not really. Modern routers have powerful ASICs that can perform Longest-Prefix-Match IP lookups in hardware just as fast as an MPLS label swap. Today, the primary value of MPLS is not raw switching speed, but rather Traffic Engineering, QoS guarantees, and creating secure L3VPNs for corporate customers.

**Q: What is SD-WAN, and is it killing MPLS?**
**A:** MPLS circuits are incredibly expensive ($1,000+ per month for a 100Mbps link) because the ISP guarantees uptime and QoS. **SD-WAN (Software-Defined WAN)** is heavily disrupting this. SD-WAN allows a corporation to buy two cheap, standard $100/mo internet connections (like Comcast Cable and AT&T Fiber). An SD-WAN appliance dynamically and mathematically monitors both links, bonding them together and shifting traffic in real-time over the public internet, offering similar reliability to MPLS at a fraction of the cost.

## 6. Production Use Cases

- **Real-Time Communications (VoIP/Video):** If a hospital performs remote robotic surgery across the country, they cannot rely on the public internet, where a suddenly congested router might drop a packet. They purchase an MPLS circuit with strict QoS mathematical guarantees that ensure the surgical video packets receive absolute priority across the entire ISP backbone.
- **ISP Backbone Architecture:** Almost all Tier-1 internet backbone providers use MPLS internally. When you download a file from a different continent, the traffic likely enters the underwater transatlantic fiber cable as a standard IP packet, gets encapsulated in MPLS labels to traverse the ocean efficiently, and is popped out as an IP packet on the other side.

<Callout icon="info" title="The Penultimate Hop Popping (PHP) Optimization">
A mathematical optimization in MPLS. If the Egress Edge Router has to receive an MPLS frame, POP the label, and then immediately perform a Layer 3 IP lookup to route the packet to the customer, it requires two mathematical operations in one cycle. PHP solves this. The router *right before* the edge (the Penultimate Hop) mathematically POPs the label early and forwards the raw IP packet to the Edge router. This perfectly distributes the CPU load.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Network Function Virtualization (NFV)/index.mdx',
    content: `---
title: Network Function Virtualization (NFV)
description: "The architectural concept of decoupling network functions (like firewalls, load balancers, and routers) from proprietary hardware appliances and running them as software on standard servers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Network Function Virtualization (NFV)">
      {children}
    </ConceptTemplate>
  )
}

**Network Function Virtualization (NFV)** is the cloud-computing revolution finally arriving at the telecommunications and networking industry.

Historically, if an enterprise or an ISP needed a firewall, they bought a physical, heavy, proprietary metal box from Cisco or Palo Alto. If they needed a Load Balancer, they bought a physical metal box from F5. These were called **Middleboxes**. They were incredibly expensive, required physical engineers to rack and cable them, and if a company needed 10x more firewall capacity for a Black Friday sale, they literally had to wait 3 months for FedEx to deliver a bigger metal box.

NFV mathematically abstracts these network functions away from proprietary hardware ASICs. It takes the software running inside that Cisco firewall and runs it as a standard Virtual Machine (VM) or Docker Container on cheap, generic Intel/AMD servers.

## 1. Deep Dive & Mechanics

The core component of NFV is the **VNF (Virtual Network Function)**. 
A VNF is simply a software application that performs a network task. Examples include:
- vRouter (Virtual Router)
- vFW (Virtual Firewall)
- vLB (Virtual Load Balancer)
- vEPC (Virtual Evolved Packet Core - used in 5G cellular networks)

Because VNFs are just software (often packaged in qcow2 VM images or containers), they are orchestrated by a hypervisor or Kubernetes. If a network detects a massive incoming DDoS attack, the NFV orchestrator can mathematically spin up 50 new Virtual Firewalls in the data center in 30 seconds, dynamically route the traffic through them to scrub the attack, and then delete them 5 hours later.

## 2. Mathematical / Theoretical Foundation

The mathematical challenge of NFV is **Packet Processing Overhead**.

A physical hardware firewall routes packets at 100 Gbps because it uses dedicated silicon ASICs designed mathematically for the sole purpose of bitwise packet inspection.
A standard Linux Kernel is a general-purpose OS. If an Ethernet frame arrives, it triggers a hardware interrupt, copies the packet from the NIC to kernel space, processes it through the complex Linux TCP/IP stack, and copies it to user space. This context-switching mathematics is brutally slow, capping out around 1-2 Gbps.

To make NFV viable, the industry invented **DPDK (Data Plane Development Kit)**. DPDK mathematically bypasses the Linux Kernel entirely. It maps the physical Network Card (NIC) directly into the RAM of the VNF software running in User Space. The software polls the memory directly, achieving 50+ Gbps packet processing speeds on standard Intel x86 CPUs, finally making NFV competitive with hardware.

## 3. Real-World Implementation

NFV is heavily managed via high-level orchestration YAML/JSON files, much like Terraform or Kubernetes manifests.

TICK3yaml
# Conceptual example of an NFV Service Chain definition (Service Function Chaining)
# This dictates that all incoming internet traffic must mathematically flow 
# through a Virtual Firewall, then a Virtual IDS, before hitting the Load Balancer.
service_chain:
  name: "Secure_Web_Ingress"
  components:
    - type: VNF
      image: palo_alto_vFW.qcow2
      vCPUs: 4
      RAM: 8GB
    - type: VNF
      image: snort_vIDS.qcow2
      vCPUs: 2
    - type: VNF
      image: haproxy_vLB.qcow2
      vCPUs: 2
  topology:
    internet -> palo_alto_vFW -> snort_vIDS -> haproxy_vLB -> internal_network
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Traditional Hardware Era (Pre-2015)
        Internet1[Internet] --> HW_FW[Physical Cisco Firewall]
        HW_FW --> HW_IDS[Physical IDS Box]
        HW_IDS --> HW_LB[Physical F5 Load Balancer]
        HW_LB --> Servers1[Web Servers]
    end

    subgraph Modern NFV Era (Software Defined)
        Internet2[Internet] --> Generic_Server[Generic Dell x86 Server]
        
        subgraph Inside Generic Server (Hypervisor/DPDK)
            vFW(VM: Virtual Firewall)
            vIDS(VM: Virtual IDS)
            vLB(VM: Virtual Load Balancer)
            vFW --> vIDS --> vLB
        end
        
        Generic_Server --> Servers2[Web Servers]
    end
TICK3

## 5. Interview Prep

**Q: What is the difference between SDN (Software Defined Networking) and NFV?**
**A:** They are complementary but distinct. 
- **SDN** separates the *Control Plane* from the *Data Plane*. It centralizes the mathematical brains of the network into a single controller, dynamically programming dumb physical switches on how to route packets.
- **NFV** virtualizes the *Network Functions* themselves. It takes a physical firewall appliance and turns it into a software VM. You often use SDN to dynamically route traffic *into* the NFV virtual firewalls.

**Q: What is Service Function Chaining (SFC)?**
**A:** In a physical network, routing traffic through a firewall, then an optimizer, then a proxy requires manually running physical ethernet cables between the boxes. In NFV, SFC is a mathematical routing overlay. The SDN controller dynamically alters the packet headers (often using NSH - Network Service Headers) to logically force a packet to travel through 5 different Virtual Machines in a highly specific sequence before exiting the server.

**Q: What is SR-IOV (Single Root I/O Virtualization)?**
**A:** Another mathematical hardware acceleration technique for NFV. It takes a single physical Network Card (NIC) and mathematically slices it into multiple "Virtual Functions" at the PCIe hardware level. Each Virtual Machine (VNF) connects directly to the hardware NIC, bypassing the hypervisor's virtual switch entirely, dramatically reducing latency.

## 6. Production Use Cases

- **5G Cellular Networks:** 5G is almost entirely built on NFV. Telecommunications companies (AT&T, Verizon) no longer deploy massive proprietary hardware switches in their core networks. They deploy generic edge-compute servers. The entire 5G Core (AMF, UPF, SMF) runs as containerized microservices (Cloud-Native Network Functions - CNFs) orchestrated by Kubernetes.
- **vCPE (Virtual Customer Premises Equipment):** Historically, an ISP would mail a physical enterprise router to a customer's new office. Today, they mail a generic, blank x86 mini-PC (a "white box"). Once plugged in, the ISP remotely spins up a Virtual Router, a Virtual SD-WAN optimizer, and a Virtual Firewall on that box via NFV orchestration in minutes.

<Callout icon="info" title="The Shift to CNFs (Cloud-Native Network Functions)">
Initially, NFV focused entirely on Virtual Machines (VNFs running on OpenStack/KVM). However, VMs have a slow boot time and significant OS overhead. The telecommunications industry is currently undergoing a massive mathematical migration to **CNFs**. Instead of running a Virtual Firewall as a heavy VM, it is packaged as a lightweight Docker Container and orchestrated by Kubernetes, allowing network functions to scale from 0 to 1,000 instances in sub-second timeframes.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Proxies/index.mdx',
    content: `---
title: Proxies (Forward Proxies)
description: "An intermediary server that sits between a client and the internet, mathematically evaluating and forwarding outbound requests to obscure the client's identity and enforce policies."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Proxies (Forward Proxies)">
      {children}
    </ConceptTemplate>
  )
}

A **Proxy** (specifically, a Forward Proxy) is a server that sits directly in front of client machines (like employee laptops or web scraping scripts). Its primary mathematical function is to intercept outbound traffic, act on behalf of the client, and forward the request to the destination server.

When a client uses a Forward Proxy, the destination server (e.g., Google) believes the request originated from the Proxy's IP address. It has absolutely no mathematical knowledge of the original client's IP address or physical existence.

## 1. Deep Dive & Mechanics

Proxies generally operate at Layer 7 (Application) or Layer 4 (Transport, via SOCKS). 

The classic Forward Proxy workflow:
1. The client is explicitly configured to use the proxy (e.g., configuring Chrome's proxy settings to point to TICK1192.168.1.50:8080TICK1).
2. The client wants to visit TICK1example.comTICK1. Instead of doing a DNS lookup for TICK1example.comTICK1, the client sends a direct HTTP request to the Proxy server: TICK1GET http://example.com/ HTTP/1.1TICK1.
3. The Proxy server evaluates the request against its mathematical rule engine (e.g., *"Is this domain on the corporate blocklist?"*).
4. If allowed, the Proxy establishes a TCP connection to TICK1example.comTICK1, fetches the HTML, and returns it to the client.

## 2. Mathematical / Theoretical Foundation

Historically, Forward Proxies were primarily used for **Mathematical Caching**. 

In the 1990s, internet bandwidth was incredibly expensive and slow. If a university had 500 students in a computer lab all trying to download the exact same 10MB Windows Update file, it would mathematically saturate the university's 1.5 Mbps T1 internet line for hours. 

By forcing all students through a caching Forward Proxy (like **Squid Cache**), the Proxy would download the 10MB file exactly once from Microsoft. When the other 499 students requested the file, the Proxy mathematically intercepted the request and served the file instantly from its local hard drive, reducing internet bandwidth usage by 99.8%.

## 3. Real-World Implementation

Interacting with proxies is standard practice in backend engineering, especially when writing web scrapers or bypassing geo-blocks.

TICK3bash
# Using curl to route a request through a Forward Proxy
# The target server (ifconfig.me) will only see the Proxy's IP address (10.0.0.5)
curl --proxy http://10.0.0.5:8080 http://ifconfig.me

# If the proxy requires authentication:
curl --proxy http://user:password@10.0.0.5:8080 http://ifconfig.me

# Using a SOCKS5 proxy (Layer 4) instead of an HTTP proxy
curl --socks5-hostname 10.0.0.5:1080 http://example.com
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Employee PC
    participant Corporate Proxy
    participant Facebook Server
    participant Wikipedia Server

    Note over Employee PC, Corporate Proxy: Traffic Interception
    Employee PC->>Corporate Proxy: GET http://facebook.com
    Note over Corporate Proxy: Math check against Blocklist
    Corporate Proxy-->>Employee PC: 403 Forbidden (Blocked by IT Policy)
    
    Employee PC->>Corporate Proxy: GET http://wikipedia.org
    Note over Corporate Proxy: Allowed. Modifies request.
    Corporate Proxy->>Wikipedia Server: GET / (Source IP: Proxy IP)
    Wikipedia Server-->>Corporate Proxy: 200 OK (Wikipedia HTML)
    Corporate Proxy-->>Employee PC: 200 OK (Wikipedia HTML)
TICK3

## 5. Interview Prep

**Q: What is the TICK1X-Forwarded-ForTICK1 header?**
**A:** When a Proxy makes a request to a destination server, the destination server only sees the Proxy's IP address. If a company *wants* the destination server to know the real user's IP (for logging or analytics), the proxy can mathematically inject the TICK1X-Forwarded-For: 198.51.100.24TICK1 header into the HTTP request before forwarding it. Transparent proxies do this; anonymous proxies strictly strip this header out.

**Q: How does an HTTP Forward Proxy handle HTTPS (Encrypted) traffic?**
**A:** A proxy cannot read HTTPS traffic without breaking the encryption. To handle HTTPS, the client uses the HTTP TICK1CONNECTTICK1 method. The client says to the Proxy: *"TICK1CONNECT google.com:443TICK1"*. The Proxy blindly opens a raw TCP tunnel to Google and mathematically passes the encrypted binary bytes back and forth without ever inspecting the payload. (Unless the corporate proxy is performing Man-in-the-Middle SSL Decryption by forcing the client to install a custom root certificate).

**Q: What is the difference between an HTTP Proxy and a SOCKS Proxy?**
**A:** An HTTP proxy operates at Layer 7. It understands HTTP semantics, reads URL paths, and can cache web pages. A **SOCKS Proxy** (like SOCKS5) operates at Layer 4. It has no idea what HTTP is. It simply receives a request to open a TCP/UDP socket to a destination IP and mathematically shuttles the raw bytes back and forth. SOCKS is required if you want to proxy non-HTTP traffic, like a BitTorrent client or an SSH connection.

## 6. Production Use Cases

- **Corporate Content Filtering:** Enterprises strictly funnel all employee outbound internet traffic through a Forward Proxy appliance (like Zscaler or Blue Coat). This enforces mathematical IT policies: blocking malware domains, preventing uploads to personal Google Drives (Data Loss Prevention - DLP), and generating reports on employee internet usage.
- **Web Scraping and IP Rotation:** If a data scientist writes a Python script to scrape Amazon product prices 10,000 times a second, Amazon's WAF will mathematically detect the anomaly and permanently ban the script's IP address. To solve this, the script routes its requests through a **Rotating Residential Proxy Network**. For every single request, the proxy provider dynamically forwards the traffic through a different compromised or leased residential IP address (like a smart TV in Kansas), mathematically obscuring the scraper's origin and bypassing IP rate limits.

<Callout icon="info" title="Transparent Proxies">
Normally, a client must be explicitly configured to use a proxy. A **Transparent Proxy** operates invisibly at the network routing layer. The user simply tries to connect to the internet normally. The router mathematically intercepts the Port 80/443 traffic and forces it through the proxy server via NAT rules (e.g., using \`iptables REDIRECT\`) without the user's laptop ever knowing a proxy exists. This is commonly used in hotel and airport Wi-Fi captive portals.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Reverse proxies/index.mdx',
    content: `---
title: Reverse Proxies
description: "An intermediary server that sits in front of backend servers, mathematically intercepting inbound client requests and routing them to the appropriate backend application."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Reverse Proxies">
      {children}
    </ConceptTemplate>
  )
}

While a Forward Proxy sits in front of *clients* to protect them from the internet, a **Reverse Proxy** sits in front of *servers* to protect them from the internet.

When a user types TICK1amazon.comTICK1 into their browser, they are mathematically connecting to a Reverse Proxy. The Reverse Proxy terminates the connection, inspects the request, and then silently establishes a second internal connection to one of thousands of hidden backend application servers. The user has absolutely no mathematical knowledge of the internal servers' existence or IP addresses.

## 1. Deep Dive & Mechanics

A Reverse Proxy operates primarily at Layer 7 (Application) and is the absolute foundation of modern web architecture. You almost never expose a Node.js, Python Django, or Java Tomcat server directly to the public internet on Port 80. You place a reverse proxy (like Nginx, HAProxy, or Envoy) in front of them.

**Why use a Reverse Proxy?**
1. **Load Balancing:** It can mathematically distribute 10,000 inbound requests across 50 hidden backend servers.
2. **TLS/SSL Termination:** Cryptographic math is CPU intensive. The reverse proxy handles the complex TLS handshakes, decrypts the HTTPS traffic, and forwards plain-text HTTP to the backend servers over a secure private network, saving immense backend CPU cycles.
3. **Static Asset Caching:** If 5,000 users request TICK1logo.pngTICK1, the reverse proxy serves it instantly from its local RAM or SSD. It never bothers the backend Python server with requests for static images.

## 2. Mathematical / Theoretical Foundation

The mathematical power of a Reverse Proxy lies in **Path-Based Routing (URL Multiplexing)**.

Before reverse proxies, if a company wanted to run a WordPress blog and a Java web application, they had to host them on two completely different IP addresses or ports (e.g., TICK1example.comTICK1 and TICK1example.com:8080TICK1).

A Reverse Proxy allows a single IP address on a single port (443) to mathematically route traffic to an infinite number of different internal microservices based on the HTTP Request URI or Host header.
- If URI starts with TICK1/blog/*TICK1 $\\rightarrow$ Route to internal IP 10.0.0.5 (PHP)
- If URI starts with TICK1/api/*TICK1 $\\rightarrow$ Route to internal IP 10.0.0.6 (Go)
- If URI is exactly TICK1/TICK1 $\\rightarrow$ Route to internal IP 10.0.0.7 (React SSR)

## 3. Real-World Implementation

**Nginx** is the most widely deployed open-source reverse proxy in the world.

TICK3nginx
# A classic Nginx Reverse Proxy configuration block
server {
    listen 443 ssl http2;
    server_name myapp.example.com;

    # SSL Termination happens here
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Route 1: Serve static files directly from the hard drive (bypassing backend)
    location /static/ {
        alias /var/www/static/;
        expires 30d; # Cache headers
    }

    # Route 2: Reverse Proxy all API requests to a hidden Node.js backend
    location /api/ {
        # The internal IP address of the Node server
        proxy_pass http://10.0.0.50:3000/;
        
        # Pass mathematical metadata to the backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Public Internet
    participant Nginx (Reverse Proxy)
    participant Node.js (Internal Port 3000)
    participant Python (Internal Port 8000)

    Public Internet->>Nginx (Reverse Proxy): GET /api/users
    Note over Nginx (Reverse Proxy): Matches "/api/" rule
    Nginx (Reverse Proxy)->>Node.js (Internal Port 3000): GET /users
    Node.js (Internal Port 3000)-->>Nginx (Reverse Proxy): 200 OK (JSON)
    Nginx (Reverse Proxy)-->>Public Internet: 200 OK (JSON)

    Public Internet->>Nginx (Reverse Proxy): GET /data/report
    Note over Nginx (Reverse Proxy): Matches "/data/" rule
    Nginx (Reverse Proxy)->>Python (Internal Port 8000): GET /report
    Python (Internal Port 8000)-->>Nginx (Reverse Proxy): 200 OK (CSV)
    Nginx (Reverse Proxy)-->>Public Internet: 200 OK (CSV)
TICK3

## 5. Interview Prep

**Q: What is an API Gateway, and how is it different from a Reverse Proxy?**
**A:** An API Gateway (like AWS API Gateway, Kong, or Apigee) is essentially a highly intelligent, specialized Reverse Proxy. While a reverse proxy focuses on routing and TLS termination, an API Gateway focuses on mathematical business logic. It handles Rate Limiting (blocking users who make >100 requests/sec), API Key validation, JWT token authentication, and Request Transformation (converting an XML payload to JSON before hitting the backend).

**Q: How does an Ingress Controller work in Kubernetes?**
**A:** An Ingress Controller is simply a Reverse Proxy (usually Nginx or Envoy) running inside the Kubernetes cluster. It mathematically reads standard K8s YAML files (Ingress Resources) and dynamically reconfigures its internal proxy rules on the fly to route external public internet traffic into the correct internal K8s Pods based on the URL path.

**Q: Why do backend applications sometimes generate redirect URLs containing TICK1http://localhost:3000TICK1 in production when placed behind a reverse proxy?**
**A:** Because the backend application mathematically believes it is running on TICK1localhost:3000TICK1. When it generates a redirect, it uses its own local environment data. The Reverse Proxy must be configured to pass the original host (TICK1proxy_set_header Host $host;TICK1) so the backend knows the user actually requested TICK1https://example.comTICK1.

## 6. Production Use Cases

- **Zero-Downtime Deployments (Blue/Green):** If you are running Backend Version 1 and want to deploy Version 2, you start Version 2 on a hidden internal IP. You then alter the Reverse Proxy configuration mathematically to say: *"Route 10% of traffic to Version 2."* If it crashes, you instantly route traffic back to Version 1. If it succeeds, you switch it to 100%. The user never experiences a dropped connection or downtime.
- **Service Meshes (Envoy):** In modern architectures, a lightweight Reverse Proxy (like Envoy) is deployed as a "Sidecar" alongside every single microservice. When Service A wants to talk to Service B, it actually talks to its local Envoy proxy. The proxy handles the complex mTLS encryption, circuit breaking, and retries automatically, freeing the developer from writing mathematical networking logic in their application code.

<Callout icon="danger" title="The Buffer Overflow Protection">
Another critical role of a reverse proxy is mathematically shielding backend servers from Slowloris attacks. A backend Python server (like Gunicorn) often has a strict limit on active connections (e.g., 4 threads). If a hacker sends an HTTP request but transmits the payload at a mathematically agonizing rate of 1 byte per second, the Python thread hangs waiting for the data, crashing the app. A reverse proxy like Nginx handles 100,000 asynchronous connections effortlessly. It buffers the entire slow payload in its own RAM, and only forwards the complete, assembled request to the backend Python server in a single, instant burst.
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
