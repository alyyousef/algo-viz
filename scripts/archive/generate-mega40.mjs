import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-1.1/index.mdx': `---
title: HTTP/1.1
description: "The classic, text-based hypermedia protocol that powered the growth of the World Wide Web for over two decades."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="HTTP/1.1"
  icon="globe"
>

Released in 1997, **HTTP/1.1** is the protocol that defined the modern web. It is a text-based, application-layer protocol built on top of TCP. Whenever you request a web page, your browser sends an HTTP request to a server, and the server replies with an HTTP response.

## Key Features

1. **Persistent Connections (Keep-Alive)**: Unlike HTTP/1.0, which opened and closed a brand new TCP connection for every single image on a webpage, HTTP/1.1 introduced TICK1Connection: keep-aliveTICK1. This allowed a single TCP connection to remain open, allowing the browser to download the HTML, CSS, and JS files over the same connection, vastly improving loading speeds.
2. **Chunked Transfer Encoding**: Allowed a server to start sending an HTML document before it knew the total size of the document, enabling dynamically generated content.
3. **Host Header**: Introduced the TICK1HostTICK1 header, making virtual hosting possible (allowing multiple websites with different domain names to live on a single IP address).

## The Head-of-Line Blocking Problem
HTTP/1.1 suffers from **Head-of-Line (HoL) Blocking** at the application layer. While a TCP connection is persistent, requests must be fulfilled in order. If the browser asks for a massive 5MB image, it cannot ask for a tiny 2KB CSS file on the same TCP connection until the image finishes downloading. To bypass this, browsers traditionally opened 6 parallel TCP connections per domain.

<Callout icon="info" title="Human Readable">
One of the best things about HTTP/1.1 is that it is plain text. You can literally use Telnet to connect to a web server, manually type TICK1GET / HTTP/1.1TICK1, press enter twice, and read the raw HTML response.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-2/index.mdx': `---
title: HTTP/2
description: "A major revision of the HTTP network protocol, introducing multiplexing, binary framing, and header compression to solve HTTP/1.1's performance bottlenecks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="HTTP/2"
  icon="rocket"
>

Published in 2015 and heavily based on Google's SPDY protocol, **HTTP/2** was the first major upgrade to the web in 18 years. It was designed specifically to make websites load faster by fixing the inherent design flaws in HTTP/1.1.

## How it Works: Binary Framing

HTTP/1.1 is text-based. HTTP/2 fundamentally changes this by adding a **Binary Framing Layer**. 
Instead of sending raw text, HTTP/2 breaks down messages (Headers and Body) into discrete, binary frames. 

Because the data is broken into frames, HTTP/2 can perform **Multiplexing**.

## Multiplexing (Solving Application HoL Blocking)
In HTTP/1.1, if you wanted 10 files, you had to queue them one after another (or open 6 TCP connections).
In HTTP/2, the browser opens **a single TCP connection** to the server. Over this single connection, it can send requests for the HTML, CSS, and 8 images simultaneously. The server sends back binary frames for all 10 files interspersed with each other. 

## Other Features
- **Header Compression (HPACK)**: HTTP/1.1 sends the exact same headers (like cookies and user agents) on every single request, wasting bandwidth. HTTP/2 compresses headers and only sends the delta (what changed).
- **Server Push**: (Largely deprecated now) Allowed a server to proactively send CSS and JS files to the client before the client even realized it needed them.

<Callout icon="warning" title="TCP Head-of-Line Blocking">
While HTTP/2 solved HoL blocking at the *application* layer, it created a new problem at the *TCP* layer. Because everything travels over a single TCP connection, if a single packet is lost on the network, TCP halts the *entire* connection to wait for retransmission, pausing the download of all multiplexed files simultaneously.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-3 (QUIC)/index.mdx': `---
title: HTTP/3 (QUIC)
description: "The newest iteration of HTTP, which abandons TCP entirely in favor of QUIC (a UDP-based protocol) to solve TCP-level Head-of-Line blocking."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="HTTP/3 (QUIC)"
  icon="zap"
>

**HTTP/3** is a radical departure from its predecessors. For 30 years, HTTP has run on top of TCP. HTTP/3 throws TCP out the window and runs on top of **QUIC** (Quick UDP Internet Connections), a protocol originally developed by Google.

Because QUIC runs on top of **UDP** (which does not guarantee delivery or order), QUIC itself implements the necessary reliability, congestion control, and encryption logic normally handled by TCP and TLS.

## Why Abandon TCP?

HTTP/2 multiplexed all requests over a single TCP connection. If a single network packet dropped, TCP halted the entire connection until the packet was retransmitted. This is called **TCP Head-of-Line (HoL) Blocking**.

By using UDP (which doesn't care about order), QUIC implements multiple independent "streams." If the packet containing a chunk of an image drops, only the stream for that specific image is paused. The CSS and JS streams continue downloading unimpeded.

## 0-RTT Handshakes
Establishing a secure HTTP/2 connection requires a TCP 3-way handshake, followed by a TLS handshake. If the server is physically far away, this takes hundreds of milliseconds before the first byte of actual data is sent.

QUIC bakes TLS 1.3 directly into the protocol. A client can establish a secure connection and request the HTML file in a single round trip (1-RTT). For servers the client has visited before, it can send the request with zero round trips (0-RTT), resulting in instantaneous loading.

<Callout icon="tip" title="Connection Migration">
If you are watching a YouTube video on HTTP/2 (TCP) and walk out of your house, your phone switches from Wi-Fi to 5G. Your IP address changes, breaking the TCP connection, causing the video to buffer while it reconnects. QUIC uses a persistent "Connection ID" instead of relying on IP addresses. When you switch to 5G, the QUIC connection migrates seamlessly, and the video never stops.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/WebSockets/index.mdx': `---
title: WebSockets
description: "A computer communications protocol providing full-duplex communication channels over a single TCP connection, essential for real-time web applications."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="WebSockets"
  icon="plug"
>

**WebSockets** were created to solve a fundamental limitation of HTTP: HTTP is strictly half-duplex and client-driven. In HTTP, a server can never send data to a browser unless the browser asks for it first.

Before WebSockets, developers faked real-time behavior using **Long Polling** (the browser sends an HTTP request, the server holds it open until it has data, responds, and the browser immediately requests again). This was incredibly inefficient.

## The WebSocket Handshake

WebSockets cleverly hijack HTTP to establish their connection:
1. The browser sends a standard HTTP TICK1GETTICK1 request with an TICK1Upgrade: websocketTICK1 header.
2. If the server supports it, it responds with an HTTP TICK1101 Switching ProtocolsTICK1 status.
3. The HTTP connection is "upgraded," and the TCP socket is kept alive indefinitely.

## Full-Duplex Communication
Once established, the connection is **Full-Duplex**. Both the client and the server can push messages to each other at the exact same time, with almost zero overhead. The heavy HTTP headers (cookies, user-agents) are stripped away, and only raw binary or text frames are sent.

This makes WebSockets the de facto standard for:
- Live chat applications (Discord, Slack)
- Multiplayer browser games
- Live stock tickers and crypto trading dashboards
- Collaborative editing (Google Docs)

<Callout icon="info" title="Socket.IO vs WebSockets">
Developers often confuse the two. WebSockets are the underlying raw protocol. **Socket.IO** is a JavaScript library that wraps WebSockets, providing automatic reconnections, broadcasting to "rooms," and gracefully falling back to HTTP Long-Polling if the user's corporate firewall blocks the WebSocket protocol.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/SMTP/index.mdx': `---
title: SMTP
description: "Simple Mail Transfer Protocol, the internet standard communication protocol for electronic mail transmission."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="SMTP"
  icon="mail"
>

**SMTP (Simple Mail Transfer Protocol)** is the foundation of global email. It is the protocol used to *push* or send emails from a client to a mail server, and from one mail server to another.

(Note: SMTP is only used for *sending* mail. To *retrieve* mail from a server to your phone or laptop, you use **IMAP** or **POP3**).

## How Email Actually Works

If alice@gmail.com sends an email to bob@yahoo.com:
1. Alice's phone connects to Google's SMTP server and authenticates.
2. Google's SMTP server queries DNS for Yahoo's "MX" (Mail Exchange) record to find Yahoo's server IP.
3. Google's server opens an SMTP connection to Yahoo's server on Port 25.
4. They exchange a series of text-based commands (TICK1EHLOTICK1, TICK1MAIL FROMTICK1, TICK1RCPT TOTICK1, TICK1DATATICK1).
5. Yahoo accepts the email and drops it into Bob's inbox.

## The Spam Problem
SMTP was designed in 1982 when the internet was a small group of trusted academics. It inherently lacks authentication; anyone can connect to an SMTP server and claim to be "president@whitehouse.gov".

To combat spam and spoofing, the internet layered cryptographic verifications on top of SMTP:
- **SPF (Sender Policy Framework)**: A DNS record listing the IP addresses allowed to send mail on behalf of a domain.
- **DKIM (DomainKeys Identified Mail)**: Cryptographically signs every outgoing email so the receiver can verify it wasn't tampered with.
- **DMARC**: Tells the receiving server what to do (reject or quarantine) if an email fails SPF or DKIM checks.

<Callout icon="warning" title="Port 25 Blocking">
If you rent a cloud server on AWS or DigitalOcean and try to build your own email server, you will find that outbound traffic on Port 25 is hard-blocked at the firewall level. Cloud providers do this to prevent hackers from renting servers to send millions of spam emails. You usually have to request manual unblocking from customer support.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/FTP/index.mdx': `---
title: FTP
description: "File Transfer Protocol, a standard network protocol used for the transfer of computer files between a client and server on a computer network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="FTP"
  icon="folder"
>

**FTP (File Transfer Protocol)** is an ancient protocol (originally defined in 1971, pre-dating TCP/IP itself) used for uploading and downloading files. For decades, it was the primary way web developers uploaded HTML files to their shared hosting providers.

## The Two-Port Architecture

FTP is unusual because it uses two separate TCP connections:
1. **The Control Connection (Port 21)**: Used to send commands (like TICK1USERTICK1, TICK1PASSTICK1, TICK1LISTTICK1) and receive status replies. This connection stays open for the entire session.
2. **The Data Connection (Port 20)**: A temporary, separate connection opened specifically to transfer the actual file contents, then immediately closed.

This two-port architecture makes FTP a nightmare for modern NATs (Network Address Translation) and strict firewalls, leading to the invention of "Passive Mode" (where the client initiates the data connection instead of the server).

## Security Flaws
FTP sends everything—including your username and password—in **plain text**. If you log into an FTP server over public Wi-Fi, anyone sniffing the network can steal your credentials instantly.

<Callout icon="danger" title="FTP vs SFTP vs FTPS">
- **FTP**: Unencrypted, insecure, obsolete.
- **FTPS**: FTP wrapped in TLS encryption. Still suffers from firewall issues due to the two-port architecture.
- **SFTP (SSH File Transfer Protocol)**: Not FTP at all! It is an entirely different, highly secure protocol that runs over standard SSH (Port 22). **SFTP is the modern standard for secure file transfers.**
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/MQTT/index.mdx': `---
title: MQTT
description: "Message Queuing Telemetry Transport, a lightweight, publish-subscribe network protocol that transports messages between devices, standard in IoT."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="MQTT"
  icon="wifi"
>

**MQTT** is the undisputed king protocol of the **Internet of Things (IoT)**. 

When you have a smart thermostat, a fleet of delivery trucks, or 10,000 temperature sensors in a factory, HTTP is far too heavy. HTTP requires opening a connection, sending heavy headers, and keeping the connection alive. MQTT is designed to be incredibly lightweight, using minimal battery power and bandwidth over unstable networks (like 2G cellular or satellite).

## The Publish-Subscribe Model (Pub/Sub)

MQTT does not use a Client-Server request model. It uses a **Broker**.

1. **The Broker**: A central server (like Eclipse Mosquitto) that acts as a post office.
2. **Publishers**: A smart thermometer publishes a tiny message ("22.5") to a specific **Topic** (e.g., TICK1house/livingroom/tempTICK1).
3. **Subscribers**: Your phone app connects to the broker and subscribes to TICK1house/+/tempTICK1. The broker instantly pushes the temperature data to your phone.

The thermometer and your phone never talk to each other directly; they only talk to the broker.

## QoS (Quality of Service)
MQTT allows devices to specify how critical a message is:
- **QoS 0 (At most once)**: "Fire and forget." The sensor sends data; if the network drops it, it's gone. Used for data that updates frequently.
- **QoS 1 (At least once)**: Guaranteed delivery, but the subscriber might receive duplicates.
- **QoS 2 (Exactly once)**: Guaranteed delivery with no duplicates. Uses a 4-step handshake. Used for critical commands (e.g., "Unlock the front door").

<Callout icon="tip" title="Last Will and Testament (LWT)">
A brilliant feature of MQTT. When a sensor connects to the broker, it can register a "Last Will." If the sensor suddenly loses power and drops the TCP connection ungracefully, the broker will automatically publish the Last Will message (e.g., "Device Offline") to a topic, alerting the system that the sensor died.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/TLS/index.mdx': `---
title: TLS
description: "Transport Layer Security, the cryptographic protocol designed to provide communications security over a computer network (the 'S' in HTTPS)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="TLS"
  icon="lock"
>

**TLS (Transport Layer Security)** is the successor to the deprecated **SSL (Secure Sockets Layer)**. It is the cryptographic armor that wraps around other protocols. When you wrap HTTP in TLS, you get HTTPS. When you wrap SMTP in TLS, you get SMTPS.

TLS provides three critical guarantees to internet communication:
1. **Encryption**: Hides the data from eavesdroppers (ISPs, hackers on public Wi-Fi).
2. **Authentication**: Proves you are actually talking to TICK1google.comTICK1 and not an imposter intercepting the traffic.
3. **Integrity**: Ensures the data wasn't altered in transit.

## The TLS Handshake (How it works)

When you navigate to TICK1https://bank.comTICK1:
1. **Client Hello / Server Hello**: The browser and server agree on which cryptographic algorithms to use (the cipher suite).
2. **Certificate Exchange**: The server sends its public key and its TLS Certificate (issued by a trusted Certificate Authority like Let's Encrypt). The browser verifies the certificate's cryptographic signature to prove the server is the real bank.
3. **Key Exchange**: Because asymmetric encryption (public/private keys) is too slow for downloading streaming video, they only use it momentarily. The browser securely generates a random "Symmetric Session Key" and encrypts it using the server's public key.
4. **Secure Tunnel**: The server decrypts the session key using its private key. Now, both the browser and server share a super-fast, symmetric secret key. All further HTTP traffic is encrypted using this session key.

## TLS 1.3
Released in 2018, **TLS 1.3** was a massive overhaul. It ruthlessly stripped out dozens of outdated, vulnerable cryptographic algorithms (like MD5 and SHA-1) and reduced the handshake from two round-trips to **one round-trip (1-RTT)**, making the secure web significantly faster.

<Callout icon="info" title="Let's Encrypt">
Before 2015, TLS certificates cost hundreds of dollars a year, and configuring them was a nightmare. This meant 70% of the web was unencrypted. A non-profit called **Let's Encrypt** launched, providing automated, free TLS certificates to anyone. Today, over 95% of web traffic is encrypted, entirely changing the landscape of internet privacy.
</Callout>

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
