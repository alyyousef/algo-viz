import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '13. Computer Networks/13.1 Models & Fundamentals/TCP-IP model/index.mdx': `---
title: TCP/IP Model
description: The foundational communication protocols used to interconnect network devices on the internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="TCP/IP Model">

The Internet Protocol Suite, commonly known as **TCP/IP**, is the conceptual model and set of communications protocols used in the Internet and similar computer networks. Unlike the theoretical 7-layer OSI model, the TCP/IP model consists of 4 practical layers that define how data should be packetized, addressed, transmitted, routed, and received.

<Callout icon="info" title="TCP vs IP">
  **IP (Internet Protocol)** obtains the address to which data is sent. **TCP (Transmission Control Protocol)** ensures data delivery once that IP address is found, checking for errors and ensuring packets arrive in the correct order.
</Callout>

## The 4 Layers of TCP/IP

The TCP/IP model condenses the OSI model into 4 distinct layers:

<ComparisonTable 
  headers={['Layer', 'Function', 'Common Protocols']}
  rows={[
    ['4. Application', 'Provides network services directly to applications.', 'HTTP, HTTPS, FTP, DNS, SMTP'],
    ['3. Transport', 'Handles host-to-host communication and error recovery.', 'TCP, UDP'],
    ['2. Internet', 'Routes packets across independent networks (Routing).', 'IP (IPv4, IPv6), ICMP'],
    ['1. Network Access', 'Physical transmission of data across the wire/wireless.', 'Ethernet, Wi-Fi, MAC addresses']
  ]}
/>

## Packet Encapsulation

As data travels down the stack from an application to the physical network cable, each layer wraps the payload with its own specific header. This is called **Encapsulation**.

<ArchitectureDiagram chart={\`
graph TD
  App[Application Data]
  Trans[Transport Header + Data\\nTCP Segment]
  Net[Internet Header + Segment\\nIP Packet]
  Link[Frame Header + Packet + Footer\\nEthernet Frame]
  
  App -- Encapsulates into --> Trans
  Trans -- Encapsulates into --> Net
  Net -- Encapsulates into --> Link
  Link -- Transmits as Bits --> Wire((Physical Medium))
\`} />

## The TCP 3-Way Handshake

Before any HTTP request can be sent over TCP, a connection must be established to ensure both client and server are ready and synchronized.

\`\`\`text
Client                                  Server
  |                                       |
  | -------- SYN (Seq=x) ---------------> |  1. Client requests connection
  |                                       |
  | <------- SYN-ACK (Seq=y, Ack=x+1) --- |  2. Server acknowledges & requests connection back
  |                                       |
  | -------- ACK (Ack=y+1) -------------> |  3. Client acknowledges server's sequence
  |                                       |
  v (Connection Established)              v
\`\`\`

</TechnologyTemplate>
`,
  '13. Computer Networks/13.2 Application-Layer Protocols/TLS/index.mdx': `---
title: TLS (Transport Layer Security)
description: Cryptographic protocol that provides communications security over a computer network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="TLS (Transport Layer Security)">

Transport Layer Security (TLS), the successor of the now-deprecated SSL (Secure Sockets Layer), is a cryptographic protocol designed to provide communications security over a computer network. When a website URL starts with \`https://\`, it is using HTTP over a TLS-encrypted tunnel.

<Callout icon="warning" title="SSL is Dead, Long Live TLS">
  Although people still colloquially refer to "SSL Certificates", SSL 3.0 was deprecated in 2015 due to the POODLE vulnerability. Modern secure communication relies strictly on TLS 1.2 or TLS 1.3.
</Callout>

## What does TLS guarantee?

A secure TLS connection ensures three critical properties:

<ComparisonTable 
  headers={['Property', 'Description', 'Mechanism used']}
  rows={[
    ['Encryption', 'Data is scrambled so third parties cannot eavesdrop.', 'Symmetric Cryptography (e.g., AES)'],
    ['Authentication', 'Proves the server is who it claims to be.', 'Asymmetric Cryptography (RSA/ECC) + Digital Certificates'],
    ['Integrity', 'Ensures data was not altered in transit.', 'Message Authentication Codes (HMAC)']
  ]}
/>

## The TLS 1.2 Handshake Process

Before encrypted data can flow, the client and server must agree on cryptographic keys. This happens *after* the TCP 3-way handshake.

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant Client
    participant Server

    Note over Client, Server: TCP Handshake already complete
    
    Client->>Server: 1. "Client Hello" (Supported Ciphers, Random Byte String)
    Server-->>Client: 2. "Server Hello" (Chosen Cipher, Random Byte String, Server Certificate)
    
    Note over Client: Client verifies Certificate with Root CA
    
    Client->>Server: 3. Key Exchange (Encrypted with Server's Public Key)
    Note over Server: Server decrypts with its Private Key
    
    Client->>Server: 4. "Finished" (Encrypted with new shared symmetric key)
    Server-->>Client: 5. "Finished" (Encrypted with new shared symmetric key)
    
    Note over Client, Server: Secure Symmetric HTTPS Traffic begins
\`} />

## TLS 1.3 Improvements

TLS 1.3 (released in 2018) massively improved performance by reducing the handshake from **2 Round Trips (2-RTT)** down to **1 Round Trip (1-RTT)**, drastically speeding up secure web page loads while simultaneously removing obsolete cryptographic algorithms like MD5 and SHA-1.

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/OAuth 2.0/index.mdx': `---
title: OAuth 2.0
description: The industry-standard protocol for authorization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="OAuth 2.0">

OAuth 2.0 is the industry-standard protocol for **Authorization**. It allows a user to grant a third-party application limited access to their resources on another site (like Google or GitHub), without handing over their password.

<Callout icon="error" title="Authentication vs Authorization">
  **OAuth 2.0 is NOT an authentication protocol.** It is designed for delegated *authorization* (accessing APIs). If you want to log a user in and know *who* they are (authentication), you should use **OpenID Connect (OIDC)**, which is an identity layer built on top of OAuth 2.0.
</Callout>

## The Core Roles

To understand OAuth, you must understand the 4 roles involved in the dance.

<ComparisonTable 
  headers={['Role', 'Description', 'Example']}
  rows={[
    ['Resource Owner', 'The user who owns the data.', 'You (the user)'],
    ['Client', 'The application requesting access to the data.', 'A third-party calendar app'],
    ['Authorization Server', 'The server issuing access tokens.', 'Google Login Screen (accounts.google.com)'],
    ['Resource Server', 'The API hosting the protected data.', 'Google Calendar API']
  ]}
/>

## The Authorization Code Flow

This is the most common and secure OAuth flow, used by web applications running on a backend server.

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant User
    participant App as Client App
    participant Auth as Auth Server (Google)
    participant API as Resource Server
    
    User->>App: 1. Clicks "Import Google Contacts"
    App->>User: 2. Redirects to Auth Server
    User->>Auth: 3. Logs in & grants permission
    Auth-->>App: 4. Redirects back with Authorization Code
    
    Note over App, Auth: Backend Server to Server Communication
    App->>Auth: 5. Exchanges Code + Client Secret for Token
    Auth-->>App: 6. Returns Access Token
    
    App->>API: 7. Requests Contacts + Access Token (Bearer)
    API-->>App: 8. Returns Contacts JSON
\`} />

## Tokens

- **Access Token**: A short-lived string (often a JWT) passed in the \`Authorization: Bearer <token>\` HTTP header to access APIs.
- **Refresh Token**: A long-lived credential used by the client application to obtain a new Access Token when the old one expires, preventing the user from having to log in again.

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Firewalls/index.mdx': `---
title: Firewalls
description: Network security systems that monitor and control incoming and outgoing network traffic.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Firewalls">

A firewall is a network security device (either hardware or software) that monitors incoming and outgoing network traffic and decides whether to allow or block specific traffic based on a defined set of security rules. It establishes a barrier between a trusted internal network and untrusted external networks (like the Internet).

<Callout icon="tip" title="Default Deny">
  The most secure firewall configuration principle is **Default Deny**: block all traffic by default, and explicitly allow only the specific ports, IPs, and protocols strictly necessary for operations.
</Callout>

## Types of Firewalls

Firewalls operate at different layers of the OSI model and offer varying depths of inspection.

<ComparisonTable 
  headers={['Type', 'OSI Layer', 'How it works']}
  rows={[
    ['Packet Filtering', 'Network (L3)', 'Inspects IP addresses and port numbers against rules. Fast but stateless.'],
    ['Stateful Inspection', 'Transport (L4)', 'Tracks the state of active TCP connections. Allows return traffic for established outbound connections.'],
    ['WAF (Web App Firewall)', 'Application (L7)', 'Inspects HTTP traffic for web exploits like SQL Injection and XSS (e.g., Cloudflare, AWS WAF).'],
    ['NGFW (Next-Gen)', 'Layers 3-7', 'Combines stateful inspection with deep packet inspection (DPI), Intrusion Prevention (IPS), and malware filtering.']
  ]}
/>

## Network Demilitarized Zone (DMZ)

In enterprise networks, a DMZ is a physical or logical subnetwork that contains and exposes an organization's external-facing services to a larger and untrusted network.

<ArchitectureDiagram chart={\`
graph TD
  Internet((Internet))
  
  subgraph DMZ Network
    Web[Web Server]
    Mail[Mail Server]
  end
  
  subgraph Internal Secure Network
    DB[(Database)]
    HR[HR Systems]
  end
  
  FW1{External Firewall}
  FW2{Internal Firewall}
  
  Internet --> FW1
  FW1 -- Allow Ports 80, 443 --> DMZ Network
  DMZ Network --> FW2
  FW2 -- Allow DB Port 5432 from Web Server ONLY --> Internal Secure Network
  
  FW1 -. Block everything else .-> FW1
  FW2 -. Block direct Internet access .-> FW2
\`} />

## iptables Example (Linux)

Under the hood, Linux uses \`iptables\` (or \`nftables\`) for local firewalling.

\`\`\`bash
# 1. Drop all incoming packets by default
sudo iptables -P INPUT DROP

# 2. Allow established return traffic
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 3. Allow incoming SSH (Port 22) only from a specific IP
sudo iptables -A INPUT -p tcp -s 203.0.113.50 --dport 22 -j ACCEPT

# 4. Allow incoming HTTP (Port 80) and HTTPS (Port 443) from anywhere
sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT
\`\`\`

</TechnologyTemplate>
`,
  '14. Web Fundamentals/DNS/index.mdx': `---
title: DNS (Domain Name System)
description: The phonebook of the Internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="DNS (Domain Name System)">

The Domain Name System (DNS) is a hierarchical and distributed naming system for computers, services, and other resources connected to the Internet. It translates readily memorized domain names (like \`google.com\`) to the numerical IP addresses (like \`142.251.32.46\`) needed for locating and identifying computer services.

<Callout icon="info" title="UDP Port 53">
  DNS queries are typically sent over **UDP on port 53** because they are small, quick, and don't require the overhead of a TCP connection. However, if a response is too large, it will fall back to TCP.
</Callout>

## How DNS Resolution Works

When you type a URL into your browser, a recursive lookup process begins across a global hierarchy of servers.

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant PC as Your Computer
    participant Resolver as ISP Resolver (e.g. 8.8.8.8)
    participant Root as Root Server (.)
    participant TLD as TLD Server (.com)
    participant Auth as Authoritative Server (example.com)
    
    PC->>Resolver: 1. What is the IP of www.example.com?
    Note over Resolver: Checks cache. If miss:
    
    Resolver->>Root: 2. Who handles .com?
    Root-->>Resolver: 3. Here is the .com TLD Server IP.
    
    Resolver->>TLD: 4. Who handles example.com?
    TLD-->>Resolver: 5. Here is the Authoritative Server IP.
    
    Resolver->>Auth: 6. What is the IP of www.example.com?
    Auth-->>Resolver: 7. The IP is 93.184.216.34
    
    Resolver-->>PC: 8. The IP is 93.184.216.34
\`} />

## Common DNS Record Types

DNS holds much more than just IP addresses. It handles mail routing, text verification, and aliases.

<ComparisonTable 
  headers={['Record Type', 'Purpose', 'Example Value']}
  rows={[
    ['A (Address)', 'Maps a domain name to an IPv4 address.', '93.184.216.34'],
    ['AAAA', 'Maps a domain name to an IPv6 address.', '2606:2800:220:1:248:1893:25c8:1946'],
    ['CNAME (Canonical)', 'Maps a domain name (alias) to another domain name.', 'www.example.com -> example.com'],
    ['MX (Mail Exchange)', 'Specifies the mail servers responsible for accepting email.', '10 aspmx.l.google.com'],
    ['TXT (Text)', 'Arbitrary text. Often used for domain ownership verification and spam prevention (SPF/DKIM).', 'v=spf1 include:_spf.google.com ~all']
  ]}
/>

## DNS Caching & TTL

To prevent the Root and TLD servers from being crushed by billions of requests per second, DNS is heavily cached at every layer (Browser -> OS -> ISP Router). The duration a record lives in a cache is determined by its **TTL (Time to Live)**, set by the domain owner. A TTL of 3600 means the record can be cached for 1 hour.

</TechnologyTemplate>
`,
}

async function generateCyber() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateCyber().catch(console.error)
