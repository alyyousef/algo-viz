import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-2/index.mdx',
    content: `---
title: HTTP/2
description: "A major revision of the HTTP network protocol standard, fundamentally changing how data is formatted and transported to improve web performance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="HTTP/2">
      {children}
    </ConceptTemplate>
  )
}

**HTTP/2** (published as RFC 7540 in 2015) was the first major upgrade to the web's core protocol in 18 years. It was heavily derived from Google's experimental **SPDY** protocol.

While HTTP/1.1 fundamentally shaped the early dynamic web, it was incredibly inefficient for modern, asset-heavy websites. HTTP/1.1 suffered from **Head-of-Line (HoL) Blocking** at the application layer, requiring browsers to open multiple parallel TCP connections (which wastes memory and defeats TCP congestion control) just to download a CSS file and a JavaScript file simultaneously. HTTP/2 was engineered specifically to decrease latency and fix these structural bottlenecks without changing the high-level semantics (methods, status codes, URIs) of HTTP.

## 1. Deep Dive & Mechanics

HTTP/2 abandons the plain-text, human-readable format of HTTP/1.1 entirely. It is a strictly **Binary Protocol**. 

It introduces the concept of **Streams, Messages, and Frames**:
- **Frame:** The smallest unit of communication (e.g., a HEADERS frame, a DATA frame).
- **Message:** A complete HTTP request or response (e.g., a GET request), consisting of one or more frames.
- **Stream:** A bidirectional flow of bytes established within the TCP connection.

Because data is chopped into tiny binary frames, HTTP/2 achieves true **Multiplexing**. A browser can open a single TCP connection to a server and request 50 images simultaneously. The server chops all 50 images into frames, tags each frame with a Stream ID, and interleaves them together over the single TCP connection. The browser reads the Stream IDs and mathematically reassembles the 50 images in parallel. Head-of-Line Blocking at the application layer is completely eliminated.

## 2. Mathematical / Theoretical Foundation

HTTP/2 introduces **HPACK Header Compression**.

In HTTP/1.1, if a browser makes 100 requests to the same server, it mathematically transmits the exact same 1KB of cookie and User-Agent headers 100 times, wasting 100KB of bandwidth.

HPACK solves this using a stateful mathematical **Compression Table**.
Both the client and the server maintain a synchronized, indexed table of headers in RAM. 
1. Request 1: The client sends TICK1User-Agent: Mozilla...TICK1 and TICK1Cookie: session=123TICK1 in plain text. The server stores these at Index 62 and 63 in its table.
2. Request 2: The client simply sends the binary integers TICK1[62, 63]TICK1.
The server performs an $O(1)$ lookup, reconstructing the massive strings from the indices. This reduces header overhead bandwidth by up to 90%.

## 3. Real-World Implementation

Because HTTP/2 is binary and almost exclusively requires TLS (HTTPS) in practice via the ALPN (Application-Layer Protocol Negotiation) extension, you can no longer use TICK1telnetTICK1 to type raw requests. You must use modern tools.

TICK3bash
# Test if a server supports HTTP/2 using curl
# The -I fetches only the headers. --http2 forces HTTP/2.
curl -I --http2 https://www.google.com

# Output snippet:
# HTTP/2 200 
# content-type: text/html; charset=ISO-8859-1
# ...
TICK3

*Note: In Node.js, you interact with HTTP/2 via the TICK1node:http2TICK1 module, which exposes specific API methods to handle streams and push events, rather than the standard TICK1node:httpTICK1 module.*

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Browser
    participant Server

    Note over Browser,Server: HTTP/1.1 (Parallel Connections)
    Browser->>Server: TCP Conn 1: GET /img1.jpg
    Browser->>Server: TCP Conn 2: GET /img2.jpg
    Server-->>Browser: Conn 1: [img1 bytes]
    Server-->>Browser: Conn 2: [img2 bytes]

    Note over Browser,Server: HTTP/2 (Multiplexing over ONE Connection)
    Browser->>Server: Stream 1: GET /img1.jpg & Stream 2: GET /img2.jpg
    Note over Server: Server interleaves binary frames
    Server-->>Browser: [Frame: Str1 Data][Frame: Str2 Data][Frame: Str1 Data]
    Note over Browser: Browser reassembles Stream 1 and 2 in parallel
TICK3

## 5. Interview Prep

**Q: What is HTTP/2 Server Push?**
**A:** Server Push was a feature where a server could preemptively send resources to the client before the client asked for them. For example, if the client requested TICK1index.htmlTICK1, the server knows the client will eventually need TICK1style.cssTICK1. The server pushes TICK1style.cssTICK1 into the browser's cache instantly. *Note: Server Push proved mathematically difficult to optimize in the real world (often pushing assets the browser already had cached, wasting bandwidth) and has been deprecated in modern browsers like Chrome.*

**Q: Does HTTP/2 solve Head-of-Line Blocking completely?**
**A:** No! It solves HoL blocking at the **Application Layer (HTTP)** via multiplexing. However, it still runs on top of TCP. If a single packet drops, the **TCP Layer** will halt the entire socket, blocking *all* multiplexed streams until the packet is retransmitted. This is called *TCP Head-of-Line Blocking*, and it is the exact reason HTTP/3 was created.

**Q: Why do we still use tools like Webpack to bundle 50 JavaScript files into 1 massive file if HTTP/2 can multiplex 50 files efficiently?**
**A:** When HTTP/2 was released, many developers stopped bundling. However, they discovered that parsing and executing 50 separate JS modules in the V8 engine has significant CPU overhead compared to parsing 1 bundled file. Additionally, optimal compression (like Gzip/Brotli) achieves much higher mathematical compression ratios on one massive text file than on 50 tiny text files. Bundling remains a best practice.

## 6. Production Use Cases

- **gRPC (Google Remote Procedure Call):** The incredibly popular gRPC framework for microservice communication is built entirely on top of HTTP/2. It uses HTTP/2's binary framing and multiplexing to stream Protocol Buffer (protobuf) messages between servers at blistering speeds.
- **High-Traffic Media Sites:** Sites that load hundreds of small thumbnails (like Pinterest or Netflix) saw massive, immediate page load speed improvements by simply upgrading their reverse proxies (Nginx/Envoy) to support HTTP/2, as the browser no longer had to wait for available TCP connection slots to fetch the images.

<Callout icon="warning" title="The ALPN Requirement">
While the HTTP/2 specification technically allows for unencrypted HTTP/2 over plain TCP (known as h2c), every major browser vendor (Chrome, Firefox, Safari) strictly refused to implement it for security reasons. Therefore, to use HTTP/2 in a web browser, the server *must* support HTTPS (TLS 1.2+). The TLS handshake uses the ALPN extension to mathematically negotiate the upgrade to HTTP/2 before any HTTP data is sent.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-3 (QUIC)/index.mdx',
    content: `---
title: HTTP/3 (QUIC)
description: "The third major version of the Hypertext Transfer Protocol, built entirely on top of the new UDP-based QUIC transport protocol to eliminate TCP bottlenecks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="HTTP/3 (QUIC)">
      {children}
    </ConceptTemplate>
  )
}

**HTTP/3** represents the most radical paradigm shift in the history of web protocols. Since 1989, the World Wide Web has relied exclusively on TCP as its underlying transport layer. HTTP/3 rips TCP out of the stack entirely and replaces it with a new protocol called **QUIC** (Quick UDP Internet Connections), which runs on top of **UDP**.

Standardized in 2022 (RFC 9114), HTTP/3 was created to solve the fundamental physics problem that HTTP/2 exposed: **TCP Head-of-Line (HoL) Blocking**.

## 1. Deep Dive & Mechanics

In HTTP/2, you multiplex 50 streams (images, CSS, JS) over a single TCP connection. If a mobile phone drives into a tunnel and a single packet containing a piece of Image 1 drops, TCP will halt the entire socket. The browser cannot render Image 2, 3, or 4 (even if their packets arrived perfectly) until Image 1's packet is retransmitted.

QUIC solves this by moving reliability out of the OS Kernel (TCP) and into the User Space.
Because QUIC runs on UDP, it implements its own mathematical packet reordering and retransmission algorithms. If Stream 1 drops a packet, QUIC halts Stream 1. However, because QUIC understands that Stream 2 and Stream 3 are logically independent, it continues to pass their UDP packets to the browser. Only the specific stream that lost data is delayed.

## 2. Mathematical / Theoretical Foundation

The mathematical latency of establishing a secure web connection is a massive bottleneck.
In HTTP/2 over TLS 1.2, establishing a connection requires:
1. TCP Handshake (1 RTT - Round Trip Time)
2. TLS Handshake (2 RTT)
Total: **3 RTTs** before a single byte of HTTP data is sent. If the user is in Australia and the server is in New York (200ms ping), that's 600ms of dead silence.

QUIC integrates TLS 1.3 directly into its transport layer. 
- **Standard QUIC Connection:** Because cryptographic keys are negotiated during the initial connection setup, it takes only **1 RTT** to establish a secure connection.
- **0-RTT Resumption:** If the client has spoken to the server before, it remembers the cryptographic mathematical parameters. The client can send an HTTP GET request in the very first UDP packet it sends, achieving **0 RTT** latency.

## 3. Real-World Implementation

Implementing HTTP/3 requires specialized server configurations, as many legacy firewalls blindly block UDP traffic on port 443.

TICK3bash
# Testing HTTP/3 requires a modern build of curl with the --http3 flag compiled in
curl -I --http3 https://cloudflare.com

# Example Nginx configuration to enable HTTP/3 (QUIC)
server {
    # Listen on TCP for HTTP/1.1 and HTTP/2
    listen 443 ssl http2;
    
    # Listen on UDP for HTTP/3 (QUIC)
    listen 443 quic reuseport;
    
    # Advertise to the client that HTTP/3 is available
    add_header Alt-Svc 'h3=":443"; ma=86400';
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: Legacy HTTP/2 (TCP + TLS 1.2)
    Client->>Server: [TCP SYN]
    Server-->>Client: [TCP SYN-ACK]
    Client->>Server: [TCP ACK] + [TLS Client Hello]
    Server-->>Client: [TLS Server Hello]
    Client->>Server: [TLS Key Exchange]
    Server-->>Client: [TLS Finished]
    Client->>Server: [HTTP GET /] (Data Finally Sent!)

    Note over Client,Server: HTTP/3 QUIC (0-RTT Resumption)
    Client->>Server: [QUIC Handshake + TLS Keys + HTTP GET /]
    Server-->>Client: [HTTP 200 OK HTML Data]
    Note over Client,Server: Done in a single round trip!
TICK3

## 5. Interview Prep

**Q: If QUIC is built on UDP, isn't it insecure and unreliable?**
**A:** No. QUIC uses UDP simply as a dumb, fast pipe to bypass the rigid TCP logic built into OS kernels. The QUIC protocol itself (implemented in user-space libraries like Google's TICK1quicheTICK1 or Cloudflare's TICK1quicheTICK1) mathematically implements all the reliability, sequence numbering, and flow control that TCP has, plus mandatory end-to-end TLS 1.3 encryption.

**Q: How does a web browser know a server supports HTTP/3 if it connects using TCP first?**
**A:** Through the **Alt-Svc (Alternative Service)** HTTP header. The browser makes its first connection using standard HTTP/2 over TCP. The server responds with the HTML and includes TICK1Alt-Svc: h3=":443"TICK1. The browser mathematically records this in its cache. The next time the user visits the site, the browser completely skips TCP and immediately fires a UDP QUIC packet at port 443.

**Q: What is Connection Migration in QUIC?**
**A:** In TCP, a connection is mathematically bound by the 4-tuple (Client IP, Client Port, Server IP, Server Port). If you are watching a video on Wi-Fi and walk out of your house, your phone switches to 5G. Your Client IP changes. The TCP connection breaks, and the video buffers. In QUIC, connections are identified by a 64-bit **Connection ID** embedded in the packet, independent of the IP. When you switch to 5G, the phone keeps sending the same Connection ID, and the server seamlessly continues streaming the video without dropping the connection.

## 6. Production Use Cases

- **Mobile Applications:** Apps like Uber and YouTube use QUIC extensively because mobile network physics (cell tower handoffs, high latency, frequent packet drops) are exactly the environments where QUIC mathematically destroys TCP in performance.
- **Content Delivery Networks (CDNs):** Cloudflare, Fastly, and Google Edge extensively support HTTP/3. Because the protocol is highly optimized for fast connection setup (0-RTT), edge nodes can deliver cached assets to end-users globally with perceptually instant load times.

<Callout icon="danger" title="The CPU Overhead of QUIC">
Because TCP is heavily optimized by the OS Kernel and hardware network cards (NICs can perform TCP Checksum Offloading and Segmentation in hardware ASICs), it is incredibly CPU efficient. Because QUIC runs in user-space over UDP, all cryptographic encryption and packet sequencing must be done mathematically by the main CPU. When Cloudflare first deployed HTTP/3, they noted that it required roughly 2x to 3x more CPU power to serve the same amount of traffic compared to TCP.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP/index.mdx',
    content: `---
title: HTTP (Hypertext Transfer Protocol)
description: "The foundational Application-layer protocol that powers the World Wide Web, designed to transfer hypermedia documents between clients and servers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="HTTP (Hypertext Transfer Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**HTTP (Hypertext Transfer Protocol)** is the primary language of the World Wide Web. Invented by Tim Berners-Lee at CERN in 1989, it was initially designed for the simple task of fetching HTML documents from a server. Today, it is the backbone of almost all internet communication, powering web browsers, mobile apps, and machine-to-machine REST APIs.

HTTP is an Application Layer (Layer 7) protocol. It sits on top of a reliable transport protocol (traditionally TCP/IP). It is a **Client-Server** protocol, meaning a client (like a web browser) initiates a request, and a server mathematically processes it and returns a response.

## 1. Deep Dive & Mechanics

The most defining characteristic of HTTP is that it is fundamentally **Stateless**. 

When a client sends Request A, and then sends Request B one second later, the HTTP protocol itself has absolutely no mathematical concept that both requests came from the same person. The server treats every single request as a completely isolated event. 

To build modern, stateful applications (like a shopping cart or a logged-in user session), developers must implement state tracking *on top* of HTTP. This is universally achieved using **Cookies** or **Tokens** (like JWT). The server gives the client a mathematically unique string (a Cookie) in the first response. The client attaches this string in the HTTP Headers of every subsequent request, allowing the server to manually reconstruct the state.

## 2. Mathematical / Theoretical Foundation

Every HTTP communication consists of two distinct data structures: the **Request** and the **Response**.

**The HTTP Request contains:**
1. A Request Line: TICK1[Method] [URI] [HTTP Version]TICK1 (e.g., TICK1GET /index.html HTTP/1.1TICK1)
2. HTTP Headers: Key-value pairs providing metadata (e.g., TICK1Host: google.comTICK1)
3. An optional Body: Raw data being sent to the server (e.g., a JSON payload in a POST request).

**The HTTP Response contains:**
1. A Status Line: TICK1[HTTP Version] [Status Code] [Reason Phrase]TICK1 (e.g., TICK1HTTP/1.1 200 OKTICK1)
2. HTTP Headers: Key-value pairs (e.g., TICK1Content-Type: application/jsonTICK1)
3. An optional Body: The actual data requested.

The Status Codes are mathematically grouped:
- **1xx (Informational):** The request was received, continuing process.
- **2xx (Successful):** The action was successfully received, understood, and accepted. (e.g., 200 OK, 201 Created).
- **3xx (Redirection):** Further action must be taken to complete the request (e.g., 301 Moved Permanently, 302 Found).
- **4xx (Client Error):** The request contains bad syntax or cannot be fulfilled. (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found).
- **5xx (Server Error):** The server failed to fulfill an apparently valid request. (e.g., 500 Internal Server Error, 502 Bad Gateway).

## 3. Real-World Implementation

While browsers abstract HTTP entirely, backend developers interact with it constantly using tools like TICK1curlTICK1 or Postman.

TICK3bash
# Perform a simple GET request
curl http://example.com/api/users

# Perform a POST request with JSON data and custom headers
curl -X POST http://example.com/api/users \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer my_jwt_token" \\
     -d '{"name": "Alice", "role": "admin"}'

# View the raw HTTP Request and Response Headers (-v for verbose)
curl -v http://example.com
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client (Browser)
    participant Server (API)
    participant Database

    Client->>Server: POST /login (Body: {user, pass})
    Note over Server: Validates credentials
    Server->>Database: Query User
    Database-->>Server: Result (Valid)
    Note over Server: Generates Session Token
    Server-->>Client: HTTP/1.1 200 OK<br/>Set-Cookie: session=XYZ

    Note over Client,Server: The Stateless Protocol in Action
    Client->>Server: GET /dashboard<br/>Cookie: session=XYZ
    Note over Server: Reads Cookie, Identifies User
    Server-->>Client: HTTP/1.1 200 OK<br/>(Dashboard HTML)
TICK3

## 5. Interview Prep

**Q: What is the difference between idempotent and safe HTTP methods?**
**A:** 
- A **Safe** method (GET, HEAD, OPTIONS) mathematically guarantees it will not modify resources on the server. It is strictly read-only.
- An **Idempotent** method (PUT, DELETE) can modify the server, but making the exact same request 1 time has the exact same mathematical effect as making it 10,000 times. For example, TICK1DELETE /user/5TICK1. If you run it once, the user is gone. If you run it 10 more times, the end state of the database is exactly the same (the user is still gone).
- POST is neither safe nor idempotent. Submitting a POST request 10 times usually creates 10 duplicate records.

**Q: What is CORS (Cross-Origin Resource Sharing)?**
**A:** It is a security mechanism enforced by web browsers. If a script on TICK1https://mywebsite.comTICK1 tries to make an HTTP request to an API at TICK1https://api.otherdomain.comTICK1, the browser mathematically blocks it (Same-Origin Policy). To allow it, the API server must explicitly include the TICK1Access-Control-Allow-Origin: https://mywebsite.comTICK1 header in its HTTP responses.

**Q: What is the purpose of the HTTP OPTIONS method?**
**A:** It is primarily used for **Preflight Requests** in CORS. Before a browser sends a complex POST request with custom headers to a different domain, it sends a lightweight TICK1OPTIONSTICK1 request first to ask the server, *"Are you willing to accept a POST request with these headers from my domain?"* The server replies with the allowed methods and origins.

## 6. Production Use Cases

- **RESTful APIs:** Representational State Transfer (REST) is an architectural style that strictly leverages HTTP semantics. It maps CRUD operations to HTTP methods (Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE) and uses standard HTTP Status Codes to communicate success or failure.
- **Webhooks:** A server-to-server communication pattern heavily reliant on HTTP. When an event occurs on Stripe (e.g., a customer payment succeeds), Stripe acts as an HTTP client and fires an HTTP POST request containing the payment data to a specific URL on your backend server.

<Callout icon="info" title="The Power of Headers">
HTTP Headers are incredibly extensible. Because the protocol dictates that unknown headers should simply be ignored, developers and organizations can invent custom headers on the fly. For example, AWS heavily utilizes custom headers like \`x-amz-request-id\` for tracing. You can inject \`X-My-Custom-Correlation-Id\` into your microservices to easily track a single request as it bounces across 20 different internal servers in Datadog.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTPS/index.mdx',
    content: `---
title: HTTPS (HTTP Secure)
description: "An extension of the HTTP protocol that uses encryption to secure communication over a computer network, widely used on the internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="HTTPS (HTTP Secure)">
      {children}
    </ConceptTemplate>
  )
}

**HTTPS (Hypertext Transfer Protocol Secure)** is mathematically identical to HTTP, with one critical difference: all HTTP data (headers, URLs, payloads) is routed through a cryptographic tunnel known as **TLS (Transport Layer Security)**, historically called SSL, before being transmitted over TCP.

In standard HTTP (Port 80), all traffic is transmitted in plain text. Any router or ISP along the path can read passwords, session cookies, and private messages (Packet Sniffing). HTTPS (Port 443) ensures **Confidentiality** (encryption), **Integrity** (data wasn't tampered with), and **Authentication** (you are talking to the real server, not an imposter).

## 1. Deep Dive & Mechanics

The magic of HTTPS relies on a mathematically complex process called the **TLS Handshake**, which establishes the secure tunnel.

1. **Client Hello:** The browser sends supported cipher suites and a random byte string.
2. **Server Hello & Certificate:** The server replies with its chosen cipher, its own random string, and its **Digital Certificate** (which contains its Public Key and is mathematically signed by a trusted Certificate Authority like Let's Encrypt).
3. **Authentication:** The browser's OS verifies the Certificate Authority's mathematical signature against its local Root Trust Store. If valid, the browser knows the server is authentic.
4. **Key Exchange (Asymmetric):** The client and server use the Public Key and complex algorithms (like Diffie-Hellman or RSA) to securely mathematically derive a shared **Symmetric Session Key** without ever transmitting the actual key across the wire.
5. **Secure Channel (Symmetric):** The handshake is over. Both sides now use the lightning-fast Symmetric Session Key (e.g., AES-GCM) to encrypt and decrypt all actual HTTP traffic.

## 2. Mathematical / Theoretical Foundation

HTTPS is built upon the dual mathematical pillars of Modern Cryptography:

1. **Asymmetric Cryptography (Public Key / Private Key):** Based on the mathematical difficulty of factoring massively large prime numbers (RSA) or calculating discrete logarithms on elliptic curves (ECC). It allows two parties to securely exchange secrets over an observed network. However, asymmetric math requires intense CPU calculations, making it too slow to encrypt gigabytes of video data.
2. **Symmetric Cryptography (Shared Key):** Based on bitwise operations (like XOR) and substitution-permutation networks (like AES). It is mathematically blazingly fast (often hardware-accelerated in the CPU). 

HTTPS combines them beautifully: Asymmetric math is used *only* during the first 50 milliseconds to securely exchange a key, and then Symmetric math takes over to encrypt the actual massive web payloads.

## 3. Real-World Implementation

Configuring HTTPS requires obtaining a cryptographic certificate and binding it to a web server (like Nginx).

TICK3bash
# Using Let's Encrypt (Certbot) to automatically fetch a free TLS certificate
# and configure Nginx to serve HTTPS traffic.
sudo certbot --nginx -d example.com -d www.example.com

# Example Nginx Block for HTTPS
# server {
#     listen 443 ssl http2;
#     server_name example.com;
#     
#     ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
#     
#     # Disable mathematically weak/broken legacy protocols
#     ssl_protocols TLSv1.2 TLSv1.3;
#     
#     location / {
#         proxy_pass http://localhost:3000;
#     }
# }
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Browser
    participant Server

    Note over Browser,Server: 1. TCP Handshake
    Browser->>Server: SYN
    Server-->>Browser: SYN-ACK
    Browser->>Server: ACK

    Note over Browser,Server: 2. TLS Handshake (Asymmetric Math)
    Browser->>Server: ClientHello (Supported Ciphers)
    Server-->>Browser: ServerHello + Digital Certificate (Public Key)
    Note over Browser: Verifies Certificate Signature
    Browser->>Server: Key Exchange (e.g., ECDHE)
    Server-->>Browser: Handshake Finished

    Note over Browser,Server: 3. Encrypted HTTP (Symmetric Math - AES)
    Browser->>Server: [ENCRYPTED: GET / HTTP/1.1]
    Server-->>Browser: [ENCRYPTED: 200 OK <html>...]
TICK3

## 5. Interview Prep

**Q: What is a Man-in-the-Middle (MitM) attack, and how does HTTPS prevent it?**
**A:** In a MitM attack, a hacker intercepts the connection and acts as a proxy (the client talks to the hacker, the hacker talks to the server). HTTPS prevents this via **Digital Certificates**. The hacker can intercept the traffic, but to read it, they must present a valid TLS certificate for TICK1google.comTICK1. Because they do not possess Google's Private Key, and no trusted Certificate Authority will mathematically sign a fake certificate for them, the browser will throw a massive red "Your Connection is Not Private" warning and halt the connection.

**Q: What is HSTS (HTTP Strict Transport Security)?**
**A:** It is a security header (TICK1Strict-Transport-Security: max-age=31536000TICK1) sent by the server over HTTPS. It tells the browser, *"For the next year, never mathematically attempt to connect to this domain using unencrypted HTTP (Port 80) ever again."* This prevents SSL Stripping attacks where a hacker intercepts the initial plain-text TICK1http://TICK1 redirect and prevents the user from upgrading to HTTPS.

**Q: What is SNI (Server Name Indication)?**
**A:** In the early days, you needed a unique IP address for every single HTTPS website because the TLS handshake happened *before* the HTTP TICK1HostTICK1 header was sent; the server didn't know which certificate to present. SNI is an extension to TLS. In the initial TICK1ClientHelloTICK1 packet, the browser includes the domain name (e.g., TICK1example.comTICK1) in plain text. This allows a single IP address (like an AWS Load Balancer) to host thousands of different HTTPS certificates and serve the correct one instantly.

## 6. Production Use Cases

- **E-Commerce and Compliance:** PCI-DSS (Payment Card Industry) and HIPAA regulations mathematically and legally mandate that all transmission of credit card data and patient records occur over strongly encrypted TLS channels (HTTPS).
- **Service-to-Service Encryption (mTLS):** In modern Zero Trust microservice architectures (like Kubernetes with Istio), HTTPS isn't just for external users. Microservice A communicates with Microservice B using **Mutual TLS (mTLS)**, where *both* the client and the server present cryptographic certificates to authenticate each other, completely encrypting all internal data center traffic.

<Callout icon="danger" title="TLS Termination">
In large architectures, web servers (like Node.js or Tomcat) rarely handle HTTPS themselves. The cryptographic math requires significant CPU overhead. Architects use a **TLS Termination Proxy** (like AWS ALB, Nginx, or HAProxy) at the edge of the network. The proxy handles the complex TLS handshake and decrypts the traffic. It then forwards the plain-text HTTP traffic over the secure, private backend network to the internal application servers, saving massive amounts of CPU cycles.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/IMAP/index.mdx',
    content: `---
title: IMAP (Internet Message Access Protocol)
description: "A standard email retrieval protocol used by email clients to access, manage, and synchronize messages on a remote mail server."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="IMAP (Internet Message Access Protocol)">
      {children}
    </ConceptTemplate>
  )
}

**IMAP (Internet Message Access Protocol)**, currently in its 4th revision (IMAP4), is the modern standard for receiving email. (Note: **SMTP** is used for *sending* email, while IMAP is used exclusively for *retrieving* it).

Before IMAP became ubiquitous, the world relied on **POP3 (Post Office Protocol)**. POP3 was designed for an era when server hard drives were tiny and expensive. In POP3, an email client connects to the server, downloads the email to the local computer, and mathematically deletes the email from the server. 

IMAP was invented because modern users have multiple devices (a phone, a laptop, a tablet). IMAP is fundamentally a **synchronization protocol**. Emails live permanently on the server. When you read an email on your phone, the phone uses IMAP to tell the server to flag it as "Read." When you open your laptop, it syncs with the server and mathematically sees the "Read" flag, keeping all devices in perfect harmony.

## 1. Deep Dive & Mechanics

IMAP operates over TCP Port 143 (or Port 993 for IMAP over TLS/SSL, known as IMAPS). 

Unlike HTTP, which is stateless, IMAP relies on a persistent, stateful TCP connection. When a client connects, it authenticates and enters an **Authenticated State**. It can then select a specific Mailbox (e.g., TICK1INBOXTICK1 or TICK1ArchiveTICK1).

Because emails can be massive (containing 20MB PDF attachments), IMAP is highly optimized for partial mathematical retrieval. An IMAP client can request *only* the email headers (Subject, Sender, Date) to quickly populate a list UI. If the user clicks on an email with a massive attachment, the client can use IMAP to fetch *only* the text body, leaving the 20MB binary attachment on the server until the user explicitly clicks "Download."

## 2. Mathematical / Theoretical Foundation

IMAP tracks the state of emails using a mathematical tagging system called **Message Sequence Numbers** and **UIDs (Unique Identifiers)**.

Every message in a folder is assigned a sequential number (1, 2, 3). However, if message 2 is deleted, message 3 mathematically shifts down and becomes message 2. This makes caching on a mobile phone extremely difficult.

To solve this, IMAP assigns a strict, monotonically increasing 32-bit **UID** to every message, along with a **UIDVALIDITY** value for the folder. A client (like Apple Mail) caches the UIDs locally. When it connects, it says: *"I have UIDs 100 through 500. Give me anything higher than 500."* This $O(1)$ synchronization mechanism mathematically guarantees the client and server remain perfectly synced without needing to re-download the entire 10GB mailbox.

## 3. Real-World Implementation

Like HTTP and FTP, IMAP is a plain-text protocol at its core (before TLS encryption is applied). You can interact with it via telnet or OpenSSL.

TICK3bash
# Connect to an IMAP server over TLS (Port 993)
openssl s_client -crlf -connect imap.example.com:993

# The server greets you:
* OK IMAP4rev1 Service Ready

# IMAP commands must be prefixed with a unique transaction tag (e.g., a001)
a001 LOGIN myemail@example.com mypassword
a001 OK LOGIN completed

# Select the inbox
a002 SELECT INBOX
* 15 EXISTS (15 emails total)
a002 OK [READ-WRITE] SELECT completed

# Fetch the Subject and Sender of email #1
a003 FETCH 1 (BODY[HEADER.FIELDS (SUBJECT FROM)])
* 1 FETCH (BODY[HEADER.FIELDS (Subject From)] {55}
From: boss@example.com
Subject: Urgent Meeting
)
a003 OK FETCH completed

# Log out
a004 LOGOUT
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Mobile Phone
    participant IMAP Server
    participant Laptop

    Note over Mobile Phone, IMAP Server: Phone Syncs
    Mobile Phone->>IMAP Server: FETCH INBOX (Unread)
    IMAP Server-->>Mobile Phone: Returns Email UID 500 (Unread)
    Note over Mobile Phone: User reads Email UID 500
    Mobile Phone->>IMAP Server: STORE UID 500 +FLAGS (\Seen)
    IMAP Server-->>Mobile Phone: OK (Marked as Read on Server)

    Note over Laptop, IMAP Server: Laptop turns on and Syncs
    Laptop->>IMAP Server: FETCH INBOX (Flags changed since last sync?)
    IMAP Server-->>Laptop: UID 500 is now \Seen
    Note over Laptop: Laptop instantly marks email as Read in UI
TICK3

## 5. Interview Prep

**Q: What is the IMAP TICK1IDLETICK1 command (Push Email)?**
**A:** In standard IMAP, the client must constantly mathematically poll the server (e.g., every 5 minutes) asking, *"Are there new emails?"* This wastes battery life on mobile devices. The IMAP TICK1IDLETICK1 extension allows the client to open the TCP connection and simply wait. When a new email arrives on the server, the server instantly pushes a notification down the open TCP socket to the phone, triggering a notification mathematically instantly (Push Email).

**Q: If you delete an email in an IMAP client, why isn't it actually deleted on the server immediately?**
**A:** IMAP separates the act of flagging an email from the mathematical act of purging it from the hard drive. When you delete an email, IMAP simply applies the TICK1\\DeletedTICK1 flag to the message. The email still exists. The server only physically destroys the data when the client explicitly issues the TICK1EXPUNGETICK1 command (which most email clients do automatically when you close the app or empty the Trash folder).

**Q: Why are modern APIs (like Microsoft Graph or Gmail REST API) replacing IMAP for developers?**
**A:** IMAP is incredibly complex to parse. The responses are formatted in a highly specific, nested ASCII structure (MIME formats) that requires heavy string manipulation. Modern REST APIs use standard JSON over HTTP, making it exponentially easier for a developer to write a Python script to read an inbox compared to dealing with raw IMAP socket programming.

## 6. Production Use Cases

- **Customer Support Software:** Platforms like Zendesk or Intercom utilize IMAP libraries in the background. They connect to a company's TICK1support@company.comTICK1 inbox, constantly read incoming emails using IMAP, and mathematically convert those raw emails into Support Tickets in their database.
- **Email Migration Tools:** When an enterprise migrates from an on-premise Exchange server to Google Workspace, migration tools use IMAP to recursively iterate through every folder, download the MIME structures, and push them up to the new provider, preserving folder hierarchies and read/unread flags perfectly.

<Callout icon="info" title="The JMAP Successor">
Because IMAP is showing its age (developed in the 1980s), the IETF recently standardized **JMAP (JSON Meta Application Protocol)** (RFC 8620). Backed by companies like Fastmail, JMAP seeks to replace IMAP entirely by providing a mathematically optimized, JSON-based, stateless API over HTTPS. It drastically reduces battery consumption on mobile devices and eliminates the need for holding open fragile, long-lived TCP connections.
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
