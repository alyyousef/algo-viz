import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/Software-Defined Networking (SDN)/index.mdx',
    content: `---
title: Software-Defined Networking (SDN)
description: "An approach to network management that enables dynamic, programmatically efficient network configuration by separating the mathematical routing brain from the physical hardware."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Software-Defined Networking (SDN)">
      {children}
    </ConceptTemplate>
  )
}

**Software-Defined Networking (SDN)** is the architectural shift that made modern cloud computing (like AWS VPCs) possible. 

Historically, if a network engineer wanted to change how traffic flowed through a corporate network, they had to physically SSH into 50 individual Cisco routers and manually type CLI commands into each one. This was mathematically impossible to scale for Amazon or Google, who own millions of switches. 

SDN solves this by slicing a router into two distinct planes:
1. **The Data Plane (The Muscle):** The physical hardware silicon (ASICs) that actually moves packets from Port A to Port B at 100 Gbps.
2. **The Control Plane (The Brain):** The mathematical logic that decides *where* the packet should go.

SDN mathematically rips the Control Plane out of the physical routers, centralizes it into a single software server (the **SDN Controller**), and leaves behind "dumb" Data Plane switches that blindly follow instructions.

## 1. Deep Dive & Mechanics

In an SDN architecture, the physical switches have no idea how to route traffic on their own. They don't run OSPF or BGP locally.

When a dumb switch receives a new, unrecognized packet:
1. It pauses the packet.
2. It sends a message up to the centralized SDN Controller asking, *"What do I do with this?"*
3. The SDN Controller, which has a god-like mathematical view of the entire global network topology, calculates the absolute optimal path.
4. The Controller pushes a "Flow Rule" down to the switch: *"If you see an IP from 10.0.0.5, blast it out Port 4."*
5. The switch saves this rule in its hardware RAM and forwards the packet instantly.

This communication between the Control Plane (Brain) and the Data Plane (Muscle) is facilitated by a mathematical protocol called **OpenFlow** (the most famous Southbound API).

## 2. Mathematical / Theoretical Foundation

The true power of SDN is the **Northbound API**.

Because the SDN Controller is just a software application (often written in Java or Python, like OpenDaylight), it exposes standard REST APIs. 

A DevOps engineer doesn't need to know Cisco CLI commands. They can write a Python script that mathematically says: *"If Server CPU > 90%, send an API call to the SDN Controller to instantly reroute 50% of the network traffic to the backup data center."* The SDN Controller receives the API call and automatically reprograms 5,000 physical switches across the continent in 500 milliseconds. 

The network is now mathematically programmable code.

## 3. Real-World Implementation

You interact with SDN concepts daily in AWS, specifically when configuring a **VPC (Virtual Private Cloud)**.

TICK3bash
# Conceptually, when you run this AWS CLI command to update a Route Table...
aws ec2 create-route --route-table-id rtb-2257 --destination-cidr-block 10.0.0.0/16 --gateway-id igw-c0a643a9

# ...you are mathematically interacting with the AWS SDN Controller (Northbound API).
# AWS's proprietary SDN Controller then translates that into low-level rules 
# and instantly reprograms the hypervisor vSwitches underneath your EC2 instances 
# so your traffic routes to the internet.
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph The Application Layer (Northbound)
        Py[Python Automation Script]
        Grafana[Traffic Monitor]
    end

    subgraph The Control Plane (Central Brain)
        SDN[SDN Controller - e.g., OpenDaylight]
    end

    subgraph The Data Plane (Dumb Hardware)
        SW1[Dumb Switch 1]
        SW2[Dumb Switch 2]
        SW3[Dumb Switch 3]
    end

    Py -- REST API (Northbound) --> SDN
    Grafana -- REST API (Northbound) --> SDN

    SDN -- OpenFlow Protocol (Southbound) --> SW1
    SDN -- OpenFlow Protocol (Southbound) --> SW2
    SDN -- OpenFlow Protocol (Southbound) --> SW3

    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class SDN highlight;
TICK3

## 5. Interview Prep

**Q: What is the difference between an Underlay and an Overlay network in SDN?**
**A:** 
- **The Underlay:** The physical hardware (the actual fiber optic cables and physical switches). Its only job is mathematically providing basic IP connectivity from Point A to Point B.
- **The Overlay:** The virtual, logical network created by SDN. The SDN controller takes traffic from a Virtual Machine, encapsulates it (using protocols like **VXLAN**), and mathematically tunnels it across the physical Underlay. The VM thinks it is on a private Layer 2 LAN with another VM across the country, completely ignorant of the physical internet underneath.

**Q: What happens if the centralized SDN Controller crashes? Does the entire network go down?**
**A:** No, but the network "freezes." The dumb switches maintain their existing Flow Rules in hardware RAM. They will continue to route existing traffic flows flawlessly at wire-speed. However, if a *brand new* type of traffic arrives, the switch won't know what to do and won't have a Controller to ask, so the new traffic will be dropped. To prevent this, SDN Controllers are always deployed as highly-available, mathematically distributed clusters (using consensus algorithms like Raft).

**Q: How does SDN enable Microsegmentation (Zero Trust)?**
**A:** In a traditional network, a firewall sits at the edge. Once a hacker gets past the firewall, they can talk to any server. In SDN, the SDN Controller mathematically programs firewall rules directly into the Virtual Switch attached to *every single VM*. If the Web VM gets hacked, the SDN Controller mathematically prevents it from opening a TCP connection to the Database VM, stopping lateral movement instantly.

## 6. Production Use Cases

- **Cloud Provider VPCs:** When you click "Create Subnet" in AWS, Amazon does not send an engineer to plug a cable into a router. You are interacting with Amazon's massive, global SDN controller, which mathematically provisions a secure, isolated Overlay network for your EC2 instances entirely in software.
- **SD-WAN (Software-Defined WAN):** The hottest trend in corporate networking. Instead of buying expensive, rigid MPLS circuits, a corporation buys standard internet connections. A centralized SD-WAN Controller continuously mathematically monitors the latency of the internet links and dynamically reprograms the edge routers in real-time to route voice traffic over the fastest link, bypassing internet congestion.

<Callout icon="warning" title="The Security Paradigm Shift">
SDN completely changes the threat model of a network. In the past, a hacker had to compromise 50 physical routers individually to control traffic. Today, if a hacker manages to compromise the centralized SDN Controller software, they instantly possess god-like mathematical control over the entire continent's physical infrastructure, capable of black-holing all traffic or silently mirroring sensitive data to their own servers with a single API call.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.3 Infrastructure/VPN (IPsec, OpenVPN, WireGuard)/index.mdx',
    content: `---
title: VPN (IPsec, OpenVPN, WireGuard)
description: "Virtual Private Networks mathematically extend a private network across a public network via encrypted tunneling, allowing secure remote access and site-to-site connectivity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="VPN (IPsec, OpenVPN, WireGuard)">
      {children}
    </ConceptTemplate>
  )
}

A **Virtual Private Network (VPN)** solves a fundamental routing problem: If you are sitting in a Starbucks (IP: 198.51.100.5), how do you securely access a corporate database that strictly only accepts connections from the internal corporate LAN (IP: 10.0.0.50)?

A VPN achieves this via **Encapsulation (Tunneling)**. 
Your laptop generates a standard IP packet destined for TICK110.0.0.50TICK1. Because TICK110.x.x.xTICK1 is unroutable on the public internet, the VPN client software mathematically encrypts this packet and wraps it inside a *second*, public IP packet destined for the corporate VPN Gateway. The Gateway receives it, unwraps it, and pushes the internal packet onto the private LAN. To the database, it mathematically appears as if your laptop is physically plugged into the office switch.

## 1. Deep Dive: The Big Three Protocols

**1. IPsec (Internet Protocol Security):**
The grandfather of enterprise VPNs. Operating at Layer 3, it is mathematically built directly into the operating system kernel. It is notoriously difficult to configure (requiring IKE phases, Diffie-Hellman, and precise cipher matching). It is primarily used for **Site-to-Site VPNs** (e.g., permanently linking the New York office router to the London office router).

**2. OpenVPN:**
The open-source champion for two decades. It operates in User Space (Layer 4/7) and heavily utilizes standard TLS (the same math as HTTPS) for key exchange. 
- **Pros:** Extremely flexible. It can run over TCP Port 443, mathematically bypassing almost any corporate firewall by masquerading as standard web traffic.
- **Cons:** It is a massive, bloated codebase (100,000+ lines of C code). Because it runs in User Space, encrypting and moving packets back and forth into the Kernel space induces massive mathematical latency, capping its raw throughput.

**3. WireGuard:**
The modern revolution. Created by Jason A. Donenfeld, WireGuard was built from scratch to be mathematically perfect.
- It is only ~4,000 lines of code (making it mathematically trivial to audit for security).
- It runs directly inside the Linux Kernel, offering blazing-fast speeds that max out gigabit connections.
- It ruthlessly dropped all legacy cryptography. It strictly uses state-of-the-art math: **Curve25519** for key exchange, **ChaCha20** for symmetric encryption, and **Poly1305** for MAC authentication.

## 2. Mathematical / Theoretical Foundation

WireGuard completely redesigned VPN authentication by adopting the **SSH paradigm**.

In OpenVPN or IPsec, you often need complex usernames, passwords, and X.509 Certificate Authorities. 

In WireGuard, authentication is mathematically identical to SSH Keys (Cryptographic Routing). 
Your laptop generates a Private/Public key pair. You give your Public Key to the VPN server. The VPN server maps your Public Key to a specific internal IP address (e.g., TICK110.0.0.2TICK1). When a packet arrives, WireGuard mathematically verifies the cryptographic signature. If the signature is valid, it guarantees the packet came from TICK110.0.0.2TICK1. If a hacker sends a packet, the math fails, and WireGuard silently drops the packet into a black hole (it doesn't even send an error response).

## 3. Real-World Implementation

Configuring WireGuard is shockingly simple compared to legacy IPsec.

TICK3ini
# Example WireGuard Client Configuration (/etc/wireguard/wg0.conf)

[Interface]
# The laptop's Private Key
PrivateKey = aBcDeFgHiJkLmNoPqRsTuVwXyZ123456=
# The internal IP the laptop will use on the VPN
Address = 10.0.0.2/32

[Peer]
# The Corporate VPN Server's Public Key
PublicKey = zYxWvUtSrQpOnMlKjIhGfEdCbA654321=
# The public IP of the Corporate VPN Server
Endpoint = 198.51.100.99:51820
# AllowedIPs: The mathematical routing table. 
# 10.0.0.0/24 means "Only send corporate traffic over the VPN."
# 0.0.0.0/0 means "Tunnel ALL my internet traffic through the VPN."
AllowedIPs = 10.0.0.0/24
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Laptop (Starbucks)
    participant Hacker (Wi-Fi Sniffer)
    participant Corporate Firewall (VPN Gateway)
    participant Internal DB

    Note over Laptop: User requests internal DB (10.0.0.50)
    Note over Laptop: WireGuard Encrypts the payload (ChaCha20)
    
    Laptop->>Corporate Firewall (VPN Gateway): Public UDP Packet [Src: 198.x, Dst: 203.x] <br/> Payload: {Encrypted 10.0.0.50 Request}
    
    Hacker-->>Laptop: Sniffs packet. Sees random mathematical noise.
    
    Note over Corporate Firewall (VPN Gateway): Decrypts Payload (Kernel Space)
    Corporate Firewall (VPN Gateway)->>Internal DB: Private TCP Packet [Src: 10.0.0.2, Dst: 10.0.0.50]
    
    Internal DB-->>Corporate Firewall (VPN Gateway): Response (DB Results)
    Note over Corporate Firewall (VPN Gateway): Encrypts Payload
    Corporate Firewall (VPN Gateway)->>Laptop: Public UDP Packet (Encrypted Results)
TICK3

## 5. Interview Prep

**Q: What is Split Tunneling?**
**A:** A critical network configuration. 
- **Full Tunnel:** *All* of your laptop's traffic (including Netflix and YouTube) is mathematically routed through the corporate VPN. This is secure but crushes the corporate firewall's bandwidth.
- **Split Tunnel:** The routing table is mathematically split. Traffic destined for TICK110.0.0.0/8TICK1 (Internal servers) goes through the encrypted VPN. Traffic destined for Netflix goes directly out the local Starbucks Wi-Fi, completely bypassing the VPN.

**Q: Why does WireGuard use UDP exclusively instead of TCP?**
**A:** The **TCP Meltdown Problem**. If you run a VPN over TCP (like OpenVPN often does), and you transfer a file over TCP inside the VPN, you have TCP encapsulated inside TCP. If a packet drops on the Wi-Fi, the inner TCP layer triggers a retransmission, and the outer TCP layer *also* triggers a retransmission. They mathematically cascade, causing exponential delays and grinding the connection to a halt. UDP is stateless and avoids this entirely.

**Q: How does WireGuard handle roaming (e.g., switching from Wi-Fi to 5G)?**
**A:** Brilliantly. Because WireGuard authenticates mathematically via Public Keys rather than relying on a static IP address, if you walk out of Starbucks and your phone switches to 5G (getting a brand new IP address), WireGuard instantly updates its internal routing table the moment it receives a valid cryptographically signed packet from the new IP. The VPN connection never drops.

## 6. Production Use Cases

- **Site-to-Site AWS Connectivity:** Enterprises use IPsec (via AWS Site-to-Site VPN) to mathematically link their on-premise physical Cisco routers directly to an AWS Virtual Private Cloud (VPC). The AWS servers and the physical office servers can communicate securely over the public internet as if they were in the exact same building.
- **Modern Remote Work (Tailscale / ZeroTier):** Tailscale is a massive commercial success built directly on top of the WireGuard protocol. It uses a centralized control plane to automatically distribute WireGuard Public Keys to all your devices (laptop, phone, Raspberry Pi). It creates a seamless, mathematically secure Peer-to-Peer mesh VPN where all your devices can talk directly to each other, completely bypassing the need for a centralized corporate firewall.

<Callout icon="danger" title="Commercial 'Privacy' VPNs">
When consumers buy NordVPN or ExpressVPN, they are buying an OpenVPN/WireGuard tunnel to a server owned by that company. While it mathematically encrypts traffic at the local coffee shop, the VPN provider can see 100% of the DNS requests and IP destinations once the traffic leaves their server. You are simply shifting your trust from your local ISP directly to the VPN company. If the VPN company keeps logs (despite marketing claims), your privacy is entirely compromised.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Bluetooth/index.mdx',
    content: `---
title: Bluetooth
description: "A short-range wireless technology standard used for exchanging data between fixed and mobile devices over short distances using UHF radio waves."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Bluetooth">
      {children}
    </ConceptTemplate>
  )
}

**Bluetooth** (IEEE 802.15.1) was invented in 1994 by Ericsson to replace the chaotic physical RS-232 serial cables used to connect accessories. 

Named after a 10th-century Viking king who united Denmark, Bluetooth mathematically unites disparate devices. It operates in the globally unlicensed **2.4 GHz ISM band** (the exact same frequency used by Wi-Fi and Microwave ovens). 

Because it shares this crowded airspace, Bluetooth relies on a mathematical survival technique called **Frequency-Hopping Spread Spectrum (FHSS)**. The devices mathematically slice the 2.4 GHz band into 79 distinct channels. A paired phone and headphone will rapidly hop between these channels 1,600 times per second in a synchronized, pseudo-random sequence. If Wi-Fi is interfering on Channel 10, the Bluetooth packet is mathematically guaranteed to succeed a millisecond later when they hop to Channel 45.

## 1. Deep Dive: Bluetooth Classic vs. BLE

Modern Bluetooth is actually two completely different, mathematically incompatible protocols hiding under the same brand name.

**1. Bluetooth Classic (BR/EDR):**
Designed for continuous, high-bandwidth streaming. It holds a persistent radio connection open. This is what your car stereo and wireless headphones use to stream high-quality A2DP audio. It consumes significant battery power.

**2. Bluetooth Low Energy (BLE - Bluetooth 4.0+):**
Designed for the Internet of Things (IoT). It is mathematically engineered to sleep 99% of the time. A BLE heart rate monitor wakes up, blasts 20 bytes of data over the radio in 3 milliseconds, and instantly goes back to sleep. A single coin-cell battery can power a BLE device for 3 years, but it mathematically cannot stream audio.

## 2. Mathematical / Theoretical Foundation

The core architecture of a Bluetooth network is called a **Piconet**.

A Piconet is a strict mathematical Master/Slave topology (recently rebranded as Central/Peripheral). 
- One device is the Central (e.g., your iPhone).
- Up to 7 active devices are the Peripherals (e.g., Apple Watch, AirPods, Keyboard).

The Central device acts as the absolute mathematical dictator of the radio airspace. It dictates the frequency-hopping sequence and strictly schedules time-slots. A Peripheral is mathematically forbidden from transmitting data unless the Central device explicitly grants it a microsecond time-slot. This prevents radio collisions in the air.

## 3. Real-World Implementation

Developers interact with BLE heavily when building mobile apps that connect to IoT devices using the **GATT (Generic Attribute Profile)**.

In GATT, data is mathematically organized into Services and Characteristics (identified by 16-bit or 128-bit UUIDs).

TICK3javascript
// Conceptual Web Bluetooth API (interacting with a BLE Heart Rate Monitor from Chrome)
navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
  .then(device => device.gatt.connect())
  .then(server => {
    // We connect to the mathematical 'heart_rate' Service (UUID 0x180D)
    return server.getPrimaryService('heart_rate');
  })
  .then(service => {
    // We read the 'heart_rate_measurement' Characteristic (UUID 0x2A37)
    return service.getCharacteristic('heart_rate_measurement');
  })
  .then(characteristic => {
    // We subscribe to mathematically pushed notifications
    characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', (e) => {
      const heartRate = e.target.value.getUint8(1); // Read binary byte
      console.log('Heart Rate: ', heartRate);
    });
  });
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Central (Phone)
    participant Peripheral (Smart Thermostat)

    Note over Peripheral: BLE Advertising Phase
    Peripheral-->>Central: [Broadcast Channel 37] "I am a Thermostat"
    Peripheral-->>Central: [Broadcast Channel 38] "I am a Thermostat"
    
    Note over Central, Peripheral: Connection Phase
    Central->>Peripheral: "Connect Request. Let's hop frequencies starting at seed X."
    
    Note over Central, Peripheral: GATT Math Interaction
    Central->>Peripheral: READ Request (Characteristic: Temperature)
    Peripheral-->>Central: READ Response (Bytes: 0x16 -> 22°C)
    
    Central->>Peripheral: WRITE Request (Characteristic: Target Temp, Bytes: 0x18)
    Peripheral-->>Central: ACK (Target set to 24°C)
TICK3

## 5. Interview Prep

**Q: What is BLE Advertising (Beacons)?**
**A:** In BLE, a device does not need to pair to transmit data. A Beacon (like an Apple AirTag or a store's location beacon) simply wakes up and broadcasts a tiny, 31-byte mathematical payload into the open air on three specific radio channels (37, 38, and 39). Any phone walking nearby can read this broadcast packet without ever establishing a connection.

**Q: How does Apple's "Find My" network mathematically locate lost items using Bluetooth?**
**A:** If you lose your keys with an AirTag in the park, the AirTag constantly broadcasts a rotating, cryptographically secure BLE beacon. Every single iPhone on earth silently listens for these beacons in the background. If a stranger walks past your keys, their iPhone detects the BLE beacon, mathematically tags it with the phone's current GPS location, and silently uploads the encrypted GPS coordinates to Apple's servers.

**Q: What is Bluetooth Mesh?**
**A:** Traditional Bluetooth is a Piconet (Star topology). The iPhone must be within 30 feet of the smart lightbulb. **Bluetooth Mesh** (introduced in Bluetooth 5) changes the math. If you have 50 smart lightbulbs throughout a massive office, your phone sends the "Turn Off" command to Bulb 1. Bulb 1 mathematically relays the command over the radio to Bulb 2, which relays it to Bulb 3, propagating the signal across the entire building without relying on Wi-Fi.

## 6. Production Use Cases

- **Continuous Glucose Monitors (CGM):** Medical devices implanted in the arm use BLE to continuously push real-time glucose readings to a smartphone. They rely heavily on the mathematical efficiency of BLE; the tiny transmitter battery must last for exactly 14 days without failing.
- **Wireless Audio (Bluetooth 5.2 LE Audio):** For 20 years, Bluetooth Classic was required for audio. The recent LE Audio specification introduced a revolutionary new mathematical codec called **LC3**. It allows high-fidelity audio to be streamed over the low-power BLE protocol. Crucially, it allows **Auracast** (Audio Sharing), where a single TV in an airport can mathematically broadcast its audio to 500 different pairs of headphones simultaneously without pairing.

<Callout icon="danger" title="Bluetooth Security (BlueBorne)">
Because the Bluetooth radio stack runs deep within the operating system kernel (often executing C code to parse complex GATT profiles before user authentication even occurs), it is highly vulnerable to mathematical buffer overflows. Vulnerabilities like **BlueBorne** allowed hackers to physically walk near an unpatched Android or Windows device, blast malformed Bluetooth packets at it, and achieve complete Remote Code Execution (RCE) without the user ever clicking a link or pairing a device.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Cellular generations (3G-4G-5G-6G)/index.mdx',
    content: `---
title: Cellular Generations (3G, 4G, 5G, 6G)
description: "The mathematical and physical evolution of mobile telecommunications, shifting from analog voice circuits to high-frequency, software-defined IP data networks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Cellular Generations (3G, 4G, 5G, 6G)">
      {children}
    </ConceptTemplate>
  )
}

The evolution of cellular networks (defined by the 3GPP organization) is a masterclass in pushing the mathematical limits of physics (Shannon's Law). 

Every decade, a new "Generation" (G) fundamentally rewrites how radio frequencies are mathematically modulated through the air, and how the massive telecommunications backbone routes those signals to the internet.

## 1. Deep Dive: The Generations

**3G (2001 - The Mobile Web Era)**
- **The Math:** Switched from time-division to **CDMA (Code Division Multiple Access)**. Multiple phones could transmit on the *exact same frequency* at the *exact same time*. The tower separated the calls by mathematically multiplying each phone's signal by a unique, orthogonal cryptographic code.
- **Result:** ~2 Mbps. Allowed the first smartphones (early iPhone) to load basic web pages, but latency was brutal (100ms+).

**4G LTE (2009 - The Broadband Era)**
- **The Math:** Abandoned CDMA for **OFDM (Orthogonal Frequency-Division Multiplexing)**. The radio spectrum was sliced into hundreds of microscopic, closely-packed subcarriers. It also introduced **MIMO (Multiple Input, Multiple Output)**, mathematically using multiple antennas to bounce signals off buildings and transmit parallel streams of data simultaneously.
- **Architecture:** 4G LTE was the first "All-IP" network. Voice calls were no longer analog circuits; they became VoIP packets (VoLTE).
- **Result:** ~100 Mbps. Birthed the gig economy (Uber) and mobile video streaming (Netflix on phones).

**5G (2019 - The Infrastructure Era)**
- **The Math:** 5G pushed into **Millimeter Wave (mmWave)** frequencies (24 GHz - 100 GHz). These massive frequencies allow for mathematical gigabit speeds but are physically fragile—they are blocked by a single tree leaf or a pane of glass. It also introduced **Massive MIMO** (towers with 128+ antennas).
- **Architecture:** The core network was completely rewritten into cloud-native microservices (NFV/SDN), removing reliance on proprietary hardware.
- **Result:** 1 to 10 Gbps. Sub-10ms latency. Designed for IoT, robotics, and replacing home broadband.

## 2. Mathematical / Theoretical Foundation

The defining mathematical innovation of 5G is **Beamforming**.

In 4G, a cell tower behaves like a lightbulb. It mathematically blasts RF energy in a massive 360-degree circle (or a 120-degree sector). If you are standing on the edge of the cell, you catch a tiny fraction of that energy; the rest is wasted into the sky or causes interference for other users.

5G Massive MIMO towers behave like laser pointers. Using complex constructive and destructive wave-interference mathematics, the 128 antennas on the tower perfectly align their radio waves to create a concentrated, invisible "beam" of RF energy pointed *directly* at your specific smartphone. As you walk down the street, the tower recalculates the physics thousands of times a second, physically steering the radio beam to follow you.

## 3. Real-World Implementation

As software developers, we rarely touch the raw RF radio layer. However, 5G introduced **Network Slicing**, which heavily impacts backend architecture.

TICK3yaml
# Conceptual 5G Network Slicing Configuration
# An ISP can mathematically slice a single physical 5G tower into three 
# isolated, virtual networks with different mathematical QoS guarantees.

slices:
  - id: slice_1_embb  # Enhanced Mobile Broadband
    use_case: "Consumer Smartphones (YouTube/Web)"
    priority: LOW
    bandwidth_guarantee: 100Mbps
    latency_target: 50ms

  - id: slice_2_urllc # Ultra-Reliable Low-Latency Communication
    use_case: "Remote Robotic Surgery & Autonomous Cars"
    priority: CRITICAL_HIGH
    bandwidth_guarantee: 5Mbps
    latency_target: 1ms

  - id: slice_3_mmtc  # Massive Machine Type Communications
    use_case: "100,000 Smart Water Meters"
    priority: LOWEST
    battery_efficiency: MAXIMIZE
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph 4G LTE Architecture (Hardware Heavy)
        Phone4G[Smartphone] -- OFDM Radio --> Tower4G[eNodeB Tower]
        Tower4G -- Fiber --> SGW[Proprietary Hardware SGW]
        SGW --> PGW[Proprietary Hardware PGW]
        PGW --> Internet1[Internet]
    end

    subgraph 5G Architecture (Software Defined)
        Phone5G[Smartphone] -- mmWave Beamforming --> Tower5G[gNodeB Tower]
        Tower5G -- Fiber --> UPF[UPF - Container running on Generic Server]
        UPF --> Internet2[Internet]
        
        AMF[AMF Microservice (K8s)] -. Controls .-> UPF
        SMF[SMF Microservice (K8s)] -. Controls .-> UPF
    end
TICK3

## 5. Interview Prep

**Q: Why does my 5G phone frequently drop to 4G LTE inside buildings?**
**A:** Physics. True 5G speeds rely on High-Band (mmWave) frequencies (e.g., 28 GHz). Mathematically, the higher the frequency, the shorter the wavelength. A 28 GHz wave is so tiny that it cannot physically penetrate concrete, brick, or modern low-e glass windows. To get 5G indoors, ISPs must install tiny "small cells" inside the building, otherwise the phone gracefully falls back to the deeply-penetrating 700 MHz (Sub-6) frequencies used by 4G.

**Q: What is MEC (Multi-access Edge Computing) in 5G?**
**A:** In 4G, if your phone requested data, the packet traveled from the tower to the ISP's core data center (often 500 miles away), then to AWS. 5G MEC physically places generic cloud servers (running Kubernetes) directly at the base of the local cell tower. If you are playing a VR game, the game server mathematically runs inside the tower's base station, reducing network latency to 2 milliseconds because the packet never leaves your neighborhood.

**Q: What will 6G (expected ~2030) theoretically introduce?**
**A:** 6G is currently in the research phase. It plans to push into the **Terahertz (THz)** spectrum (100 GHz - 3 THz). At these frequencies, the radio waves act almost like visible light. The mathematical goal is 1 Terabit-per-second (Tbps) speeds, enabling uncompressed holographic communication. It also aims to deeply integrate AI at the physical radio layer, using neural networks to mathematically optimize radio waveforms in real-time to defeat atmospheric interference.

## 6. Production Use Cases

- **Autonomous Vehicles (C-V2X):** 5G includes the Cellular Vehicle-to-Everything (C-V2X) mathematical standard. Cars do not just talk to the tower; they talk directly to other cars (V2V) and traffic lights (V2I) bypassing the network core entirely. If the car in front of you slams on its brakes, it blasts a 5G URLLC (Ultra-Reliable Low-Latency) packet that alerts your car's braking system in 1 millisecond.
- **Smart Factories (Industry 4.0):** Factories are replacing physical ethernet cables on assembly line robots with private 5G networks. Using a dedicated 5G Network Slice, the factory guarantees that a robot arm receives its control packets from the local MEC server with exactly 99.9999% mathematical reliability and sub-millisecond latency, something Wi-Fi is physically incapable of guaranteeing in a noisy, metal-filled factory environment.

<Callout icon="info" title="NSA vs. SA (Non-Standalone vs. Standalone)">
When ISPs initially launched "5G", it was almost entirely **5G NSA**. The phone connected to the tower using the new 5G radio physics, but the tower was still plugged into the old, legacy 4G Core network backbone. This provided faster downloads but didn't improve latency or allow Network Slicing. True 5G is **5G SA (Standalone)**, where both the radio and the backend cloud-native core are fully upgraded.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/GPS-GNSS/index.mdx',
    content: `---
title: GPS / GNSS
description: "A satellite-based radionavigation system that provides highly accurate mathematical geolocation and time information to a receiver anywhere on or near the Earth."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="GPS / GNSS">
      {children}
    </ConceptTemplate>
  )
}

**GNSS (Global Navigation Satellite System)** is the generic term for satellite navigation. **GPS (Global Positioning System)** is specifically the United States military's version of GNSS (Navstar), though the term is used colloquially for all systems. Other global systems include Galileo (Europe), GLONASS (Russia), and BeiDou (China).

Fundamentally, GPS is not a tracking system. The satellites do not know where you are. They are completely deaf. 
A GPS satellite is nothing more than a highly precise, $50 million **flying atomic clock** broadcasting the exact time into the void of space. Your smartphone is the mathematical genius that calculates your location.

## 1. Deep Dive & Mechanics

A GPS satellite sits in Medium Earth Orbit (MEO) about 20,000 km above the Earth. It continuously broadcasts a weak radio signal containing two critical pieces of data:
1. **The Ephemeris Data:** "I am Satellite #4, and here are my exact mathematical orbital coordinates in space."
2. **The Timestamp:** "The exact moment I transmitted this message was 12:00:00.000000000."

Your phone's GPS receiver (which is completely passive) listens to this signal. 
If your phone receives the signal at 12:00:00.067000000, it mathematically calculates the **Time of Flight** (0.067 seconds). 
Because radio waves travel at the speed of light ($c = 299,792$ km/s), the phone multiplies Time of Flight by $c$ to realize: *"I am exactly 20,086 kilometers away from Satellite #4."*

## 2. Mathematical / Theoretical Foundation

The mathematical core of GPS is **Trilateration** (often incorrectly called triangulation).

1. If you know you are 20,000 km from Satellite 1, you could be anywhere on the surface of a giant mathematical sphere surrounding that satellite.
2. If you know you are 21,000 km from Satellite 2, you are on a second sphere. The intersection of those two spheres creates a massive circular ring. You are somewhere on that ring.
3. Adding Satellite 3 creates a third sphere. The intersection of the ring and the third sphere leaves exactly **two mathematical points** in space. (One is usually deep in space or inside the earth, so it is discarded).
4. **The 4th Satellite Problem:** Your phone does not have a $100,000 atomic clock. Its internal quartz clock is terrible. If your phone's clock is wrong by just 1 millisecond, the mathematical distance calculation will be wrong by 300 kilometers! 

To solve this, a GPS receiver mathematically *requires* a signal from a **4th Satellite**. The receiver uses the 4th signal to algebraically solve a system of 4 equations with 4 variables ($X, Y, Z, \\text{and Time Error}$). This allows your $500 phone to mathematically synchronize its cheap quartz clock to the atomic clocks in space, giving you perfect time and pinpoint location.

## 3. Real-World Implementation

As software developers, we interact with GNSS data via the OS Location APIs or raw NMEA data streams.

TICK3javascript
// Interacting with the device's GNSS receiver via the Web Geolocation API
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      console.log(\`Latitude: \${position.coords.latitude}\`);
      console.log(\`Longitude: \${position.coords.longitude}\`);
      // The mathematical margin of error (e.g., 5 meters)
      console.log(\`Accuracy: \${position.coords.accuracy} meters\`);
      // GPS also provides highly accurate altitude, speed, and heading
      console.log(\`Altitude: \${position.coords.altitude} meters\`);
    },
    (error) => {
      console.error("GPS Error:", error.message);
    },
    {
      enableHighAccuracy: true, // Force the OS to power up the physical GPS chip
      maximumAge: 0             // Do not use cached location
    }
  );
}
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Space (Atomic Clocks)
        Sat1[Satellite 1]
        Sat2[Satellite 2]
        Sat3[Satellite 3]
        Sat4[Satellite 4]
    end

    subgraph Earth (Mathematical Processing)
        Phone[Smartphone GPS Chip]
    end

    Sat1 -- "I am at X1, Y1. Time is T1" --> Phone
    Sat2 -- "I am at X2, Y2. Time is T2" --> Phone
    Sat3 -- "I am at X3, Y3. Time is T3" --> Phone
    Sat4 -- "I am at X4, Y4. Time is T4" --> Phone
    
    Note over Phone: Solves 4 simultaneous equations<br/>Calculates Lat, Long, Altitude, and exact Time.
TICK3

## 5. Interview Prep

**Q: What is A-GPS (Assisted GPS) and why is it necessary?**
**A:** When a GPS chip is turned on completely cold, it has no idea where the satellites are in the sky. To figure it out, it must download the "Almanac" directly from the satellite's extremely slow 50-bps radio link. This can take mathematically up to 12.5 minutes! **A-GPS** fixes this. Your phone uses its cellular/Wi-Fi connection to instantly download the Almanac from Apple/Google servers over the internet in 1 second, achieving a "Time to First Fix" almost immediately.

**Q: Why does my GPS struggle in a city surrounded by skyscrapers?**
**A:** The **Multipath Effect**. In a city canyon, the radio signal from the satellite mathematically bounces off the glass of a skyscraper before hitting your phone. Because the signal took a bounced, V-shaped path, the Time of Flight is mathematically longer. Your phone incorrectly calculates that the satellite is further away than it actually is, resulting in your location jumping 50 meters into the middle of a building.

**Q: If Einstein's Theory of Relativity is ignored, does GPS break?**
**A:** Yes, catastrophically. 
- *Special Relativity:* The satellites are moving at 14,000 km/h. To them, time slows down (they lose 7 microseconds a day relative to Earth). 
- *General Relativity:* The satellites are in weaker gravity than Earth. To them, time speeds up (they gain 45 microseconds a day). 
Combined, the atomic clocks in space run mathematically 38 microseconds faster per day than clocks on Earth. If the GPS software didn't mathematically correct for this relativistic drift, GPS accuracy would degrade by 11 kilometers *every single day*.

## 6. Production Use Cases

- **Global Financial Synchronization:** The New York Stock Exchange and European exchanges do not use NTP (Network Time Protocol) over the internet to timestamp high-frequency trades. They install physical GPS antennas on the roof of their data centers. By decoding the atomic clock timestamps from the GPS satellites, they can mathematically synchronize their global database servers to within nanoseconds, preventing financial arbitrage.
- **Precision Agriculture & Surveying (RTK):** Standard GPS has an accuracy of ~3 meters due to mathematically unpredictable ionospheric interference slowing down the radio waves. **RTK (Real-Time Kinematic)** GPS uses a stationary base station on the farm that mathematically calculates the exact ionospheric error in real-time and broadcasts the correction to self-driving tractors, granting them millimeter-level driving accuracy.

<Callout icon="danger" title="GPS Spoofing">
Because civilian GPS signals are unencrypted and incredibly weak (-125 dBm, roughly the equivalent of looking at a 25-watt lightbulb from 10,000 miles away), they are highly susceptible to **Spoofing**. An attacker with a $200 Software Defined Radio (SDR) can transmit fake mathematical satellite data at a slightly higher power level. Nearby drones, ships, and smartphones will lock onto the fake signal and can be mathematically hijacked and piloted to the wrong coordinates.
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
