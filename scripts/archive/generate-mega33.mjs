import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/NAT/index.mdx': `---
title: NAT (Network Address Translation)
description: The Layer 3 mechanism used by routers to translate Private IP addresses into Public IP addresses, which saved the IPv4 internet from exhaustion.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NAT (Network Address Translation)">

In the 1990s, the Internet was rapidly running out of the 4 billion available IPv4 addresses. 
The solution was to designate certain blocks of IPs as "Private" (e.g., TICK1192.168.0.0/16TICK1 or TICK110.0.0.0/8TICK1). You can assign Private IPs to every computer in your house, but Private IPs are legally banned from the public Internet. If a router sees a packet destined for a Private IP, it instantly drops it.

So, how do computers in your house browse the web? **NAT (Network Address Translation)**.

## How NAT Works

When your laptop (TICK1192.168.1.50TICK1) tries to load Google, it sends the packet to your home Router.
The Router performs NAT:
1. It intercepts the packet.
2. It completely strips off the Source IP (TICK1192.168.1.50TICK1).
3. It replaces the Source IP with the Router's own singular **Public IP Address** (e.g., TICK1203.0.113.5TICK1).
4. It forwards the disguised packet to Google.

When Google replies, it replies to the Router's Public IP. The Router intercepts the reply, checks its internal **NAT Table**, remembers that the original request came from your laptop, translates the destination IP back to TICK1192.168.1.50TICK1, and delivers it to you.

<Callout icon="info" title="The Unintended Security Benefit">
  NAT was designed solely to conserve IP addresses, but it accidentally became one of the greatest security features in networking history. Because your laptop has a Private IP, a hacker in Russia literally cannot mathematically route a packet directly to your laptop. It acts as a perfect default firewall, dropping all unsolicited incoming traffic at the Router.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/PAT/index.mdx': `---
title: PAT (Port Address Translation)
description: The specific extension of NAT that allows hundreds of devices to share exactly one single Public IP address simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PAT (Port Address Translation)">

Strict, one-to-one NAT (Static NAT) takes one Private IP and translates it to one Public IP. If your office has 500 computers, you would have to buy 500 expensive Public IP addresses from your ISP. This defeats the purpose of conserving IPv4 addresses.

What we use today in every home and office is **PAT (Port Address Translation)**, also known as NAT Overload. PAT allows 500 computers to share exactly **one single Public IP address**.

## The Port Magic

How can 500 computers share one IP without the traffic getting mixed up? By abusing Layer 4 Ports.

1. **Laptop A** (TICK1192.168.1.50TICK1) sends a packet to Google from Source Port 10001.
2. **Laptop B** (TICK1192.168.1.60TICK1) sends a packet to Google from Source Port 10001.

When the Router intercepts the packets, it strips the Private IPs and replaces them with its one Public IP (TICK1203.0.113.5TICK1). However, if both packets go to Google with the same Public IP and the same Source Port (10001), when Google replies, the router won't know which laptop to send the reply to.

So, PAT dynamically overwrites the **Source Ports**:
- It translates Laptop A's packet to: TICK1203.0.113.5:50001TICK1
- It translates Laptop B's packet to: TICK1203.0.113.5:50002TICK1

<Callout icon="success" title="The Translation Table">
  The router maintains a massive NAT/PAT translation table in RAM. When Google replies to Port 50001, the router checks the table, instantly sees that 50001 belongs to Laptop A, rewrites the packet back to its original Private IP and original port (10001), and delivers it flawlessly.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/Routing (Static & Dynamic)/index.mdx': `---
title: Routing (Static & Dynamic)
description: The Layer 3 mechanisms used by routers to calculate the fastest path across the global Internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Routing (Static & Dynamic)">

A **Router** (Layer 3) is fundamentally a highly specialized computer designed to read the Destination IP address of an incoming packet, check its internal **Routing Table**, and instantly forward the packet out of the correct physical port toward the destination.

But how does the Router know which port is the correct path?

## Static Routing

**Static Routing** means a human Sysadmin manually logged into the router and typed a permanent rule:
*"If you see a packet destined for TICK110.5.5.0/24TICK1, send it out of Port 3."*

This is perfect for small networks. However, if the cable on Port 3 gets cut by a backhoe, the static route is permanently broken, and traffic blackholes until a human manually fixes it.

## Dynamic Routing Protocols

The Internet is too massive for humans to write static routes. Instead, routers run **Dynamic Routing Protocols** (like OSPF, BGP, or EIGRP). 
Routers automatically talk to each other, constantly exchanging maps of the network. 

1. **OSPF (Open Shortest Path First)**: Used internally within large corporate networks (IGP). Routers use complex Dijkstra math to calculate the fastest path to a destination based on bandwidth (e.g., preferring a 10Gbps fiber link over a 1Gbps copper link).
2. **BGP (Border Gateway Protocol)**: The absolute backbone of the Internet (EGP). BGP is used to route traffic between massive ISPs (like Comcast and AT&T). If an underwater fiber cable connecting London to New York is cut, BGP automatically recalculates the global routing table in seconds, silently rerouting the world's traffic through South America to avoid the outage.

<Callout icon="warning" title="BGP Hijacking">
  Because BGP assumes all ISPs are trustworthy, it is vulnerable to hijacking. If a malicious ISP falsely broadcasts to the world, *"I am the fastest route to YouTube!"*, the global internet will unquestioningly overwrite its routing tables and funnel all YouTube traffic to the malicious ISP in a matter of minutes.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ports/index.mdx': `---
title: Network Ports
description: The 16-bit virtual endpoints at Layer 4 (TCP/UDP) used to route incoming network traffic to the correct software application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Network Ports">

An IP address gets a packet to the correct physical computer. But a modern server might be running a Web Server, an Email Server, and an SSH Server all at the same time. 
How does the OS know which application should receive the incoming packet? 

It uses **Layer 4 Ports**.

## The Port Concept

A Port is a 16-bit number, ranging from **1 to 65,535**. It is essentially an apartment number added to the IP address (e.g., TICK1192.168.1.50:80TICK1).

- **Well-Known Ports (0 - 1023)**: Tightly controlled standard ports.
  - **22**: SSH
  - **53**: DNS
  - **80**: HTTP
  - **443**: HTTPS
- **Ephemeral Ports (49152 - 65535)**: Temporary ports assigned dynamically to client applications (like your web browser) when they initiate a connection.

<Callout icon="info" title="The Web Browser Example">
  When you open Chrome and go to Google, Chrome asks the OS for a random Ephemeral Port (e.g., TICK152000TICK1). Chrome builds a packet with a Source Port of TICK152000TICK1 and a Destination Port of TICK1443TICK1 (HTTPS), and sends it to Google. Google receives it on Port 443, processes the webpage, and replies back to your IP on Port TICK152000TICK1. Your OS receives the reply, sees Port TICK152000TICK1, and knows exactly which Chrome tab to deliver the HTML to.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/sockets/index.mdx': `---
title: Sockets
description: The software programming interface (API) that allows applications to actually read and write data to the network stack.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sockets">

We know that Layer 3 provides the IP address, and Layer 4 provides the Port. 
But how does a Python script actually tell the Operating System, *"Hey, I want to listen for incoming data on Port 8080"*?

It uses a **Socket**.

## What is a Socket?

A Socket is not a physical piece of hardware; it is a software abstraction provided by the Operating System Kernel. 
In Linux, "Everything is a File." A socket is literally a file descriptor. When a Python application wants to send a network packet, it doesn't write binary ones and zeros to the Ethernet card. It just calls TICK1socket.write("Hello")TICK1, and the OS handles all the insane complexity of encapsulating it into TCP, IP, and Ethernet frames.

## The Socket Tuple

A network connection is mathematically defined by a **5-Tuple**:
1. **Protocol** (TCP or UDP)
2. **Source IP Address**
3. **Source Port**
4. **Destination IP Address**
5. **Destination Port**

<Callout icon="success" title="Multiplexing">
  A web server like Nginx listens on exactly one port (TICK180TICK1). How can 10,000 different users load the website simultaneously without the traffic colliding? Because the OS tracks connections using the 5-Tuple. Even though all 10,000 users are hitting Destination Port 80, they all have completely different Source IPs and Source Ports, allowing the Kernel to spawn 10,000 unique, isolated Sockets in RAM simultaneously.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP/index.mdx': `---
title: HTTP (Hypertext Transfer Protocol)
description: The foundational Layer 7 application protocol that dictates how web browsers and web servers exchange data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP (Hypertext Transfer Protocol)">

Created by Tim Berners-Lee in 1989, **HTTP** is the foundation of data communication on the World Wide Web. It is a Layer 7 protocol that rides on top of TCP (Layer 4) via Port 80.

## The Request-Response Cycle

HTTP is fundamentally a client-server, Request/Response protocol. It is entirely plain text (human readable).

### The HTTP Request
When you type a URL into a browser, it opens a TCP connection and sends a raw text string:
TICK3text
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept-Language: en-US
TICK3

- **The Verb**: TICK1GETTICK1 (Read), TICK1POSTTICK1 (Create), TICK1PUTTICK1 (Update), TICK1DELETETICK1.
- **The Headers**: Key-Value pairs providing metadata about the client.

### The HTTP Response
The server processes the request and replies with text:
TICK3text
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 138

<html><body>Hello World!</body></html>
TICK3

<Callout icon="warning" title="Statelessness">
  By definition, HTTP is a **Stateless** protocol. The server has no memory. If you log into Amazon (Request 1), and then click "View Cart" (Request 2), the server has completely forgotten who you are. To solve this massive flaw, engineers invented **Cookies**. The server sends a random Session ID cookie to your browser, and your browser automatically attaches that cookie to every future HTTP Request, allowing the server to remember you.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-1.1/index.mdx': `---
title: HTTP/1.1
description: The massively successful 1997 revision of HTTP that introduced Keep-Alive connections, serving as the standard for two decades.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP/1.1">

In 1991, the original HTTP/1.0 was incredibly inefficient. Every single time a browser wanted to download a file (an image, a CSS file), it had to open a brand new TCP connection, perform the slow 3-way handshake, download the file, and immediately kill the connection. 
If a webpage had 50 images, the browser had to open and close 50 completely separate TCP connections.

## The HTTP/1.1 Revolution

Released in 1997, **HTTP/1.1** introduced two massive architectural changes that saved the web.

1. **Persistent Connections (Keep-Alive)**:
   By default, HTTP/1.1 connections remain open. The browser performs the slow TCP handshake exactly once, and then rapidly shoots 50 GET requests for all 50 images through that single, established tunnel.
2. **The Host Header**:
   HTTP/1.0 did not require a TICK1Host: example.comTICK1 header. If a server hosted 100 different websites on the same IP address, it had no idea which website the client wanted. HTTP/1.1 mandated the Host header, making shared web hosting (Virtual Hosts) mathematically possible.

<Callout icon="warning" title="Head-of-Line Blocking">
  HTTP/1.1 had a fatal flaw. While it reused a single TCP connection, requests had to be processed sequentially. If you requested a massive 10MB Video, and then requested a tiny 1KB CSS file, the CSS file was physically blocked in the queue, forced to wait for the video to finish downloading completely. This is called Head-of-Line Blocking, and it forced developers to invent insane hacks like "Domain Sharding" to bypass it.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-2/index.mdx': `---
title: HTTP/2
description: The 2015 overhaul of HTTP that introduced binary framing and stream multiplexing to solve the latency problems of the modern web.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP/2">

By 2015, modern webpages had become massive, requiring browsers to download hundreds of Javascript and CSS files simultaneously. HTTP/1.1, with its sequential processing and Head-of-Line blocking, was collapsing under the weight.

Google developed an experimental protocol called SPDY, which the IETF eventually standardized into **HTTP/2**.

## The Binary Revolution

HTTP/1.1 was entirely plain text (you could read the headers with your eyes). 
HTTP/2 is a **Binary** protocol. The client takes the HTTP request, compiles it into binary machine code, and breaks it into tiny, discrete "Frames".

## Multiplexing (The Killer Feature)

Because the requests are broken into binary frames, HTTP/2 can **Multiplex** data.
You can send the 10MB Video and the 1KB CSS file *at the exact same time* over a single TCP connection. The server chops both files into tiny binary frames, mixes them together in the TCP pipe, and the browser mathematically reassembles them on the other side. 
**Head-of-Line blocking was completely eliminated.**

<Callout icon="success" title="Header Compression (HPACK)">
  In HTTP/1.1, every single request re-sent the exact same massive headers (Cookies, User-Agents), wasting massive amounts of bandwidth. HTTP/2 introduced **HPACK**, which aggressively compresses headers, drastically reducing the size of the request payloads and speeding up mobile browsing significantly.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-3 (QUIC)/index.mdx': `---
title: HTTP/3 (QUIC)
description: The radical 2022 overhaul of HTTP that completely abandons TCP in favor of a highly optimized, encrypted UDP architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP/3 (QUIC)">

HTTP/2 was incredible, but it revealed a new bottleneck: **TCP itself**.
While HTTP/2 solved Head-of-Line blocking at the Application Layer (Layer 7), if a single TCP packet was dropped by a router, the TCP protocol (Layer 4) would blindly freeze the entire connection to wait for a retransmission, accidentally recreating Head-of-Line blocking.

To fix this, Google decided to completely abandon TCP. 
They built **QUIC**, which became the foundation of **HTTP/3**.

## The Shift to UDP

HTTP/3 runs entirely on **UDP**. 
Because UDP is connectionless and has no error checking, HTTP/3 simply builds all of the reliability, sequence tracking, and retransmission logic directly into the Application Layer software.

### The Benefits of QUIC:
1. **0-RTT Handshakes**: TCP + TLS requires multiple back-and-forth round trips just to establish a secure connection before data can flow. QUIC caches cryptographic keys, allowing returning visitors to send encrypted HTTP data on the very first packet (Zero Round Trip Time).
2. **Connection Migration**: If you are watching a YouTube video on Wi-Fi, and you leave your house, your phone switches to 5G. Your IP address changes. In TCP, the connection instantly dies and the video buffers. In QUIC, connections are tracked by a cryptographic ID, not an IP address. The video continues playing flawlessly while switching networks.

<Callout icon="warning" title="Firewall Headaches">
  Because UDP was historically only used for DNS and gaming, thousands of enterprise firewalls aggressively block or throttle heavy UDP traffic. System administrators had to radically reconfigure their firewall rules to allow UDP Port 443 so HTTP/3 traffic could pass through without being dropped.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/WebSockets/index.mdx': `---
title: WebSockets
description: A persistent, bi-directional communication protocol designed to allow real-time data streaming between a browser and a server.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebSockets">

HTTP was designed to be strictly unidirectional: The Client asks a question, and the Server answers. The Server can **never** initiate contact with the Client.

If you are building a real-time Chat app, or a live Stock Market ticker, how does the Server push new messages to the Client without the Client constantly mashing the refresh button? 
Historically, developers used horrible hacks like "Long Polling" (holding an HTTP connection open indefinitely). 

**WebSockets** solved this permanently.

## The Connection Upgrade

A WebSocket starts its life as a completely normal HTTP GET request, but it includes a special header:
TICK1Connection: UpgradeTICK1
TICK1Upgrade: websocketTICK1

If the Server supports it, it replies with a TICK1101 Switching ProtocolsTICK1 status code.
The HTTP protocol is instantly terminated, but the underlying TCP connection remains open. The tunnel transforms into a persistent, raw, bidirectional binary stream.

<Callout icon="success" title="True Full-Duplex">
  Because the tunnel is raw TCP, it is Full-Duplex. The server can push 10 stock price updates to the browser at the exact same millisecond the browser is pushing a chat message to the server, with virtually zero latency and none of the massive HTTP header overhead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTPS/index.mdx': `---
title: HTTPS (HTTP Secure)
description: The encrypted extension of HTTP, designed to prevent Man-In-The-Middle attacks and ensure data privacy across the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTPS (HTTP Secure)">

Standard HTTP transmits data in pure, unencrypted plain text. If you log into your bank over HTTP from a coffee shop Wi-Fi, anyone with a packet sniffer (like Wireshark) can read your password in clear text.

**HTTPS (HTTP Secure)** solves this by wrapping the standard HTTP payload inside an impenetrable cryptographic vault before sending it over the network. 

## The Transport Layer Security (TLS)

HTTPS is not actually a new protocol; it is literally just standard HTTP layered on top of the **TLS** encryption protocol (which operates between Layer 4 and Layer 7). 
It defaults to TCP Port **443**.

When you connect to an HTTPS website, two things happen mathematically:
1. **Encryption**: The data is scrambled using complex mathematics (like AES). Even if a hacker intercepts the packet, it looks like pure random static.
2. **Authentication**: How do you know the server you connected to is *actually* your bank, and not a hacker spoofing the IP address? The server provides a cryptographic **Digital Certificate**, signed by a globally trusted Certificate Authority (CA), mathematically proving its identity to your browser.

<Callout icon="info" title="The Let's Encrypt Revolution">
  Historically, getting a Digital Certificate was a miserable process that cost hundreds of dollars a year, which is why only banks used HTTPS. In 2015, the **Let's Encrypt** project launched, providing completely free, automated certificates to anyone. Today, over 95% of all web traffic on Earth is encrypted via HTTPS.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SSL/index.mdx': `---
title: SSL (Secure Sockets Layer)
description: The original, now heavily deprecated cryptographic protocol created by Netscape in the 1990s to secure the early internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSL (Secure Sockets Layer)">

In 1995, as the web began to support e-commerce (like Amazon), it became obvious that sending credit card numbers over plain-text HTTP was a disaster. 

Netscape Communications (the creators of the first major web browser) invented **SSL (Secure Sockets Layer)** to encrypt web traffic.

## The Death of SSL

SSL went through three major versions (SSL 1.0, 2.0, and 3.0). 
However, by the late 2010s, massive mathematical flaws and cryptographic vulnerabilities (like the POODLE attack) were discovered in the core architecture of SSL. 

Because the flaws were unfixable, the global internet security community officially deprecated and banned all versions of SSL.

<Callout icon="warning" title="Nomenclature Confusion">
  Today, **zero servers on the internet use SSL**. It is completely dead. It was entirely replaced by the newer **TLS** protocol. However, because "SSL" was the standard term for 20 years, the entire industry still incorrectly uses the term. When you buy an "SSL Certificate" today, you are actually buying a TLS Certificate.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/TLS/index.mdx': `---
title: TLS (Transport Layer Security)
description: The modern, cryptographically secure protocol that officially replaced SSL to provide encryption and authentication for the global internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TLS (Transport Layer Security)">

When the IETF took over the development of SSL from Netscape in 1999, they completely overhauled the math, removed the proprietary code, and renamed it **TLS (Transport Layer Security)**.

TLS 1.2 became the absolute gold standard for internet encryption for over a decade.

## The TLS 1.3 Overhaul

In 2018, **TLS 1.3** was released, completely revolutionizing how encryption handshakes are performed.

1. **Massive Speed Increases**: TLS 1.2 required two full round-trips across the internet just to negotiate the encryption keys before a single byte of HTTP data could be sent. TLS 1.3 optimized the math, requiring only *one* round-trip (and supporting 0-RTT for returning visitors), drastically speeding up the loading time of secure websites.
2. **Culling Weak Algorithms**: For backwards compatibility, TLS 1.2 supported ancient, broken encryption algorithms from the 1990s (like MD5 and DES). Hackers could launch "Downgrade Attacks," forcing a server to use broken math. TLS 1.3 violently purged all legacy algorithms, leaving only bleeding-edge, mathematically unbreakable ciphers (like ChaCha20 and AES-GCM).

<Callout icon="success" title="Perfect Forward Secrecy">
  Historically, if a hacker recorded 5 years of your encrypted traffic, and then managed to steal the server's master private key, they could retroactively decrypt all 5 years of history. TLS 1.3 mandates **Perfect Forward Secrecy (PFS)** using Ephemeral Diffie-Hellman math. The server generates a brand new, unique encryption key for *every single session*, and deletes it instantly when you disconnect, making retroactive decryption mathematically impossible.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SSH/index.mdx': `---
title: SSH (Secure Shell)
description: The absolute standard protocol for securely logging into and administrating remote Linux servers over an untrusted network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSH (Secure Shell)">

In the early days of Unix, administrators used a protocol called TICK1TelnetTICK1 to remotely manage servers. Telnet was unencrypted; anyone on the network could read the administrator's root password in plain text.

In 1995, **SSH (Secure Shell)** was invented to replace Telnet. Operating on TCP Port **22**, SSH provides a cryptographically secure, encrypted tunnel giving you terminal access to a remote machine.

## Key-Based Authentication

While you can log into SSH using a password, it is highly discouraged due to brute-force attacks. The standard is **Asymmetric Key-Based Authentication**.

1. You generate a mathematical Keypair on your laptop: A **Public Key** and a highly guarded **Private Key**.
2. You upload the Public Key to the remote server (into the TICK1~/.ssh/authorized_keysTICK1 file).
3. When you attempt to log in, the server sends a complex mathematical puzzle that can *only* be solved if you possess the Private Key. 
4. Your laptop solves the puzzle automatically in milliseconds and you are granted access without ever typing a password.

<Callout icon="warning" title="Port Forwarding (Tunneling)">
  SSH is not just for terminal access. It is a fully encrypted tunnel. You can use **SSH Local Port Forwarding** to securely access an internal database. (e.g., TICK1ssh -L 5432:localhost:5432 user@serverTICK1). This binds a port on your local laptop, tunnels the traffic through the encrypted SSH connection, and injects it directly into the remote server's database, bypassing the server's firewall completely.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SFTP/index.mdx': `---
title: SFTP (SSH File Transfer Protocol)
description: A highly secure, encrypted file transfer protocol that leverages the existing SSH tunnel to safely move data between servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SFTP (SSH File Transfer Protocol)">

While SSH is used to execute commands remotely, administrators frequently need to upload or download massive files to the server. 

Instead of configuring a completely separate, complicated FTP server, administrators use **SFTP (SSH File Transfer Protocol)**.

## How It Works

Despite the name, SFTP has absolutely nothing to do with the legacy FTP protocol. 
SFTP is an entirely separate subsystem built directly into the standard SSH daemon (OpenSSH). 

Because it rides inside the existing SSH tunnel (TCP Port 22):
- It requires zero additional firewall configuration (if Port 22 is open, SFTP works).
- It inherits the flawless encryption of SSH.
- It inherits the Asymmetric Key-Based Authentication of SSH.

<Callout icon="info" title="SCP vs SFTP">
  For decades, administrators used the TICK1scpTICK1 (Secure Copy) command to transfer files over SSH. However, the TICK1scpTICK1 protocol is incredibly ancient and suffers from deep architectural security flaws. The OpenSSH project has officially deprecated TICK1scpTICK1. Modern systems now silently hijack the TICK1scpTICK1 command and route the transfer through the far superior, feature-rich SFTP protocol in the background.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/FTP/index.mdx': `---
title: FTP (File Transfer Protocol)
description: The legacy, unencrypted, and notoriously complex protocol originally designed in 1971 to transfer files across networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="FTP (File Transfer Protocol)">

**FTP (File Transfer Protocol)** is one of the oldest protocols on the internet, predating TCP/IP itself. It was the standard way to upload files to web servers for decades.

Today, standard FTP is considered a massive security risk and is almost entirely obsolete. 

## The Dual-Channel Nightmare

FTP is incredibly hostile to modern firewalls because it requires **two completely separate connections** to function:
1. **The Command Channel (Port 21)**: The client connects to Port 21 to send commands (like "LIST files" or "DOWNLOAD image.jpg").
2. **The Data Channel (Port 20 or Random)**: When the server actually transfers the file, it opens a *brand new connection*. 

### Active vs Passive Mode
- **Active Mode**: The Client tells the Server, *"I am listening on Port 5000, please connect to me to send the file."* Modern NAT routers instantly block this because they drop unsolicited incoming traffic.
- **Passive Mode**: The Server tells the Client, *"I am listening on random Port 55000, please connect to me to get the file."* The Server's firewall must be manually configured to allow thousands of random high-numbered ports, which security teams hate.

<Callout icon="warning" title="Zero Encryption">
  Standard FTP transmits everything in plain text, including the username and password used to log in. It should never be used on the modern internet. If legacy systems absolutely require FTP, administrators must wrap it in TLS encryption, creating a protocol known as **FTPS (FTP over SSL/TLS)**. (Note: FTPS is completely different from SFTP, which uses SSH).
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
