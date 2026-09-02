import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/ports/index.mdx',
    content: `---
title: Ports (Network Ports)
description: "Logical constructs that identify specific processes or network services running on a host computer, enabling multiplexing of network traffic."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Ports (Network Ports)">
      {children}
    </ConceptTemplate>
  )
}

In computer networking, if an IP address (Layer 3) is a skyscraper's street address, a **Port** (Layer 4) is the specific apartment number inside that building. 

When a server receives a stream of network packets, it needs a way to know where to send them. Should it hand the data to the Nginx web server, the SSH daemon, or the PostgreSQL database? It determines this by looking at the **Destination Port** inside the TCP or UDP header. This concept allows a single computer to host hundreds of different network services simultaneously—a process known as multiplexing.

## 1. Deep Dive & Mechanics

A port is a 16-bit unsigned integer, meaning there are exactly **65,536** possible ports (from 0 to 65,535). 

The Internet Assigned Numbers Authority (IANA) divides these into three strict categories:
1. **Well-Known Ports (0 - 1023):** Reserved for core system services (e.g., 80 for HTTP, 443 for HTTPS, 22 for SSH). On Unix-like systems, you mathematically cannot bind a process to these ports unless you have root (administrator) privileges. This was originally designed as a security measure so clients could trust that a service running on port 22 was actually controlled by the server admin, not a rogue user.
2. **Registered Ports (1024 - 49151):** Assigned by IANA for specific vendor applications (e.g., 3306 for MySQL, 5432 for PostgreSQL). Any user process can bind to these without root privileges.
3. **Dynamic / Ephemeral Ports (49152 - 65535):** Used temporarily by client applications. When your web browser opens a connection to Google, it automatically assigns itself a random ephemeral source port (like 53421) so it can receive the returning traffic.

## 2. Mathematical / Theoretical Foundation

At the Transport Layer (TCP and UDP), a port is fundamentally just a 16-bit number mathematically encoded in the packet header. 

The operating system kernel maps these 16-bit numbers to specific application processes (PIDs) using a Hash Table or Tree data structure in RAM. When a packet arrives, the kernel strips the Layer 3 IP header, inspects the Layer 4 header to extract the Destination Port, performs an $O(1)$ lookup in the port table, finds the corresponding process's memory buffer, and dumps the payload into it.

If a packet arrives for a port where no process is currently listening, the kernel mathematically rejects it. For TCP, it replies with a **RST (Reset)** packet. For UDP, it replies with an **ICMP Destination Port Unreachable** packet.

## 3. Real-World Implementation

Network administrators and backend engineers interact with ports constantly when configuring firewalls and debugging servers.

TICK3bash
# View all currently listening ports on a Linux server and the Process IDs attached to them
sudo netstat -tlnp
# Or using the modern equivalent 'ss':
sudo ss -tlnp

# Example Output:
# State    Recv-Q    Send-Q        Local Address:Port        Peer Address:Port    Process
# LISTEN   0         128                 0.0.0.0:22               0.0.0.0:*        users:(("sshd",pid=1234,fd=3))
# LISTEN   0         511                 0.0.0.0:80               0.0.0.0:*        users:(("nginx",pid=5678,fd=4))

# Scan a remote server to see what ports are open (using Nmap)
nmap -p 1-1024 example.com

# Open a specific port (e.g., 8080) on a Linux firewall using UFW
sudo ufw allow 8080/tcp
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Browser
    participant OS Kernel
    participant WebServer (Port 443)
    participant Database (Port 5432)

    Browser->>OS Kernel: Packet (Dst IP: X, Dst Port: 443)
    Note over OS Kernel: Table Lookup: Port 443 -> PID 101 (Nginx)
    OS Kernel->>WebServer: Delivers Payload

    Browser->>OS Kernel: Packet (Dst IP: X, Dst Port: 5432)
    Note over OS Kernel: Table Lookup: Port 5432 -> PID 205 (Postgres)
    OS Kernel->>Database: Delivers Payload

    Browser->>OS Kernel: Packet (Dst IP: X, Dst Port: 9999)
    Note over OS Kernel: Table Lookup: Port 9999 -> NULL
    OS Kernel-->>Browser: Connection Refused (TCP RST)
TICK3

## 5. Interview Prep

**Q: Can two different applications listen on the same port at the same time?**
**A:** Generally, no. If Nginx is listening on Port 80, and you try to start Apache on Port 80, the OS will throw an TICK1EADDRINUSETICK1 (Address already in use) error. However, there are exceptions. Using the TICK1SO_REUSEPORTTICK1 socket option in Linux allows multiple processes to bind to the same port. The kernel will automatically load-balance incoming connections across those processes, which is heavily used by modern web servers (like Nginx workers) to scale across multiple CPU cores.

**Q: If a firewall blocks all inbound ports except Port 443, how can a client web browser receive the response from the server?**
**A:** This is due to **Stateful Firewalls**. The firewall blocks *unsolicited inbound* traffic on all ports. However, when the client *initiates* the outbound connection to Port 443, it uses a random ephemeral source port (e.g., 50123). The stateful firewall records this connection in its state table. When the server replies (Destination Port 50123), the firewall mathematically matches it to the existing state table entry and dynamically allows the packet back in.

**Q: Why do some ports like 80 and 443 use TCP, while port 53 uses UDP?**
**A:** HTTP/HTTPS requires guaranteed data delivery, which TCP provides. DNS (Port 53) requires extremely low latency for tiny requests (fitting in a single 512-byte packet). The overhead of setting up a TCP handshake just to ask for an IP address is mathematically inefficient, so DNS primarily uses connectionless UDP.

## 6. Production Use Cases

- **Port Forwarding (DNAT):** In Docker, when you run TICK1docker run -p 8080:80 nginxTICK1, you are mapping Port 8080 on the host machine to Port 80 inside the container. The Docker daemon manipulates TICK1iptablesTICK1 to automatically rewrite the destination port of incoming packets.
- **Microservices Architecture:** In Kubernetes, thousands of microservices run on random ephemeral ports. A Service Mesh (like Istio) manages complex port mapping, allowing Service A to talk to Service B on Port 80, while under the hood it is seamlessly routed to Port 31456 on a random Node.

<Callout icon="danger" title="Port Scanning and Security">
Port scanning is the first step in almost every cyberattack. Hackers use tools like Nmap to systematically ping all 65,535 ports on a public IP address to find out what software is running. If they find Port 3389 open, they know Remote Desktop Protocol (RDP) is exposed and will immediately launch brute-force password attacks against it. Best practice dictates implementing "Default Deny" firewall rules, only explicitly opening the ports strictly required for the business.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.1 Models & Fundamentals/sockets/index.mdx',
    content: `---
title: Sockets (Network Sockets)
description: "The software endpoints in an operating system that establish a bidirectional communication channel across a network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Sockets (Network Sockets)">
      {children}
    </ConceptTemplate>
  )
}

A **Network Socket** is the fundamental software abstraction that allows two programs to talk to each other over a network. If IP addresses and Ports are the theoretical addresses in the TCP/IP model, a Socket is the actual object instantiated in the Operating System's memory that performs the work.

Introduced as the Berkeley Sockets API in 1983, the socket API became the universal standard. When a programmer wants to build a web server, they don't write complex code to generate Ethernet frames or calculate TCP checksums. They simply ask the OS to give them a "Socket," bind it to a port, and write data to it exactly as if they were writing to a file on a hard drive.

## 1. Deep Dive & Mechanics

In Unix-like systems, everything is a file, and a Socket is no exception. It is represented by a **File Descriptor** (an integer pointer).

To establish a TCP server connection, a program performs a strict sequence of system calls:
1. **TICK1socket()TICK1**: Asks the kernel to create an endpoint for communication. The kernel allocates a memory buffer and returns a file descriptor.
2. **TICK1bind()TICK1**: Associates the socket with a specific IP Address and Port (e.g., TICK10.0.0.0:80TICK1).
3. **TICK1listen()TICK1**: Marks the socket as a "Passive Socket," telling the kernel it is ready to accept incoming connections.
4. **TICK1accept()TICK1**: A blocking call. When a client performs a TCP handshake, TICK1accept()TICK1 mathematically duplicates the listening socket and returns a *brand new* "Active Socket" connected specifically to that client. The original socket goes back to listening.
5. **TICK1read()TICK1 / TICK1write()TICK1**: The server and client push and pull bytes into their respective socket buffers.

## 2. Mathematical / Theoretical Foundation

A network socket is uniquely identified by a mathematical **5-Tuple**:
1. Protocol (TCP or UDP)
2. Source IP Address
3. Source Port
4. Destination IP Address
5. Destination Port

This 5-Tuple is critically important. A web server only has one listening socket on Port 80. How can it serve 10,000 concurrent clients if it only has one port?
Because the kernel uses the 5-Tuple as a hash key. When a packet arrives, the kernel checks the Source IP and Source Port of the client. Since every client has a different Source IP or Source Port, every connection results in a mathematically unique 5-Tuple. The kernel can effortlessly demultiplex the traffic and hand it to the correct active socket file descriptor.

## 3. Real-World Implementation

Here is how sockets look in raw Python (which wraps the C Berkeley Sockets API very cleanly).

TICK3python
import socket

# 1. Create a TCP/IP socket (AF_INET = IPv4, SOCK_STREAM = TCP)
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Allow the port to be reused immediately after the server stops
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# 2. Bind the socket to all interfaces on port 8080
server_socket.bind(('0.0.0.0', 8080))

# 3. Listen for incoming connections (Queue size of 5)
server_socket.listen(5)
print("Listening on port 8080...")

while True:
    # 4. Accept a connection (This blocks until a client connects)
    client_socket, client_address = server_socket.accept()
    print(f"Connection established with {client_address}")
    
    # 5. Read data and send a response
    request = client_socket.recv(1024)
    client_socket.sendall(b"HTTP/1.1 200 OK\\r\\n\\r\\nHello from the socket!")
    
    # 6. Close the active client socket
    client_socket.close()
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Server Application
    participant Server Kernel (OS)
    participant Client Application

    Server Application->>Server Kernel: socket()
    Server Application->>Server Kernel: bind(Port 80)
    Server Application->>Server Kernel: listen()
    Server Application->>Server Kernel: accept() (Blocks)

    Client Application->>Server Kernel: connect() (TCP Handshake)
    Note over Server Kernel: Kernel completes Handshake
    Server Kernel-->>Server Application: Returns NEW Client Socket FD
    
    Client Application->>Server Kernel: send("GET /")
    Server Kernel-->>Server Application: recv("GET /")
TICK3

## 5. Interview Prep

**Q: What is a Datagram Socket (TICK1SOCK_DGRAMTICK1)?**
**A:** While a Stream Socket (TICK1SOCK_STREAMTICK1) represents a reliable TCP connection, a Datagram Socket represents UDP. Because UDP is connectionless, you don't call TICK1listen()TICK1 or TICK1accept()TICK1. You simply call TICK1bind()TICK1 to a port, and then use TICK1recvfrom()TICK1 to pull whatever chaotic packets happen to land on that port, dealing with them one by one.

**Q: What is a Unix Domain Socket (IPC)?**
**A:** A Unix Domain Socket (TICK1AF_UNIXTICK1) is a socket used for Inter-Process Communication (IPC) *on the same physical machine*. Instead of binding to an IP address and port, it binds to a file path on the hard drive (e.g., TICK1/var/run/docker.sockTICK1). Because the data never touches the TCP/IP network stack (no IP headers, no checksum calculations), Unix sockets are mathematically magnitudes faster than using localhost (TICK1127.0.0.1TICK1) for local communication.

**Q: What is the C10k Problem?**
**A:** In the 1990s, web servers handled concurrent connections by spawning a new OS thread or process for every active socket (like Apache). Creating 10,000 threads to handle 10,000 sockets (the C10k problem) would exhaust the server's RAM and crash the kernel due to context-switching overhead. Modern servers (like Nginx or Node.js) solve this using **Asynchronous, Non-Blocking Sockets** combined with event loops (TICK1epollTICK1 or TICK1kqueueTICK1). One thread can efficiently monitor 10,000 non-blocking sockets simultaneously.

## 6. Production Use Cases

- **WebSockets:** While regular HTTP sockets close immediately after a request finishes, WebSockets (used in chat apps or live trading dashboards) upgrade the HTTP connection and intentionally keep the underlying TCP socket open permanently, allowing bidirectional real-time data flow.
- **Docker Daemon:** When you run the TICK1dockerTICK1 command in your terminal, it actually connects to a Unix Domain Socket (TICK1/var/run/docker.sockTICK1) to send HTTP REST commands directly to the Docker background daemon process running on the same machine.

<Callout icon="warning" title="File Descriptor Exhaustion">
In Linux, everything is a file, including sockets. The OS imposes a hard limit on how many File Descriptors a process can open (usually 1,024 by default). If a Node.js web server receives a massive traffic spike and tries to \`accept()\` its 1025th client socket, the OS will mathematically block it, throwing a \`Too many open files\` (EMFILE) error, crashing the server. Systems Administrators must manually increase this limit (using \`ulimit -n\`) in production environments.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/CoAP/index.mdx',
    content: `---
title: CoAP (Constrained Application Protocol)
description: "A specialized web transfer protocol designed specifically for constrained nodes and IoT networks with severe memory and power limitations."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="CoAP (Constrained Application Protocol)">
      {children}
    </ConceptTemplate>
  )
}

The **Constrained Application Protocol (CoAP)** is essentially HTTP rewritten for the Internet of Things (IoT). 

While HTTP is incredibly powerful, it is also bloated. HTTP relies on heavy TCP connections, massive text-based headers, and complex TLS handshakes. If you are manufacturing a smart temperature sensor running on an 8-bit microcontroller powered by a coin-cell battery that must last for 5 years, the CPU and radio power required to transmit standard HTTP/TCP traffic will kill the battery in weeks.

CoAP (RFC 7252) was designed to solve this. It provides the exact same RESTful paradigm as HTTP (GET, POST, PUT, DELETE), but it operates over lightweight **UDP** and encodes its headers in a highly compressed binary format.

## 1. Deep Dive & Mechanics

Because CoAP uses UDP, it inherently lacks the reliability of TCP. To compensate, CoAP implements its own minimal reliability layer directly in the application payload.

CoAP defines four message types:
1. **Confirmable (CON):** The message requires an Acknowledgment. If the sender doesn't receive an ACK, it will mathematically calculate an exponential backoff timer and retransmit the UDP packet.
2. **Non-confirmable (NON):** Fire-and-forget. Used for frequent telemetry (e.g., sending a temperature reading every second). If it drops, it doesn't matter.
3. **Acknowledgment (ACK):** Acknowledges a CON message.
4. **Reset (RST):** Indicates a message was received but could not be processed (e.g., missing context).

Furthermore, CoAP implements a feature HTTP lacks natively: **Observe**. A client can send a single GET request with the "Observe" flag. The server will then push state changes to the client automatically over time without the client needing to poll.

## 2. Mathematical / Theoretical Foundation

The mathematical brilliance of CoAP is its **Binary Header Compression**.

An HTTP request might have 300-500 bytes of ASCII string headers (TICK1Accept-Language: en-USTICK1, TICK1User-Agent: Mozilla...TICK1). 
CoAP theoretically compresses all metadata into a fixed 4-byte base header, followed by mathematically delta-encoded binary options.

For example, instead of sending the string TICK1Content-Format: application/jsonTICK1, CoAP mathematically maps the URI and Content-Format to integers. TICK1application/jsonTICK1 is simply represented by the integer TICK150TICK1. This allows an entire CoAP request, including payload, to frequently fit inside a single 127-byte IEEE 802.15.4 radio frame (preventing fragmentation and saving massive amounts of radio battery power).

## 3. Real-World Implementation

Interacting with CoAP requires specialized libraries, as standard web browsers do not natively support \`coap://\` URIs.

TICK3javascript
// A simple Node.js CoAP Client using the 'coap' npm package
const coap = require('coap');

// We create a GET request to a CoAP endpoint
const req = coap.request('coap://localhost/temperature');

req.on('response', (res) => {
  // CoAP response codes map directly to HTTP (e.g., 2.05 = HTTP 200 OK)
  console.log(\`Response Code: \${res.code}\`); 
  
  res.pipe(process.stdout);
});

req.end();
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Sensor (Client)
    participant Gateway (Server)

    Note over Sensor,Gateway: Standard HTTP equivalent (GET)
    Sensor->>Gateway: [CON] GET /temp (Token: 0x4A)
    Gateway-->>Sensor: [ACK] 2.05 Content (Token: 0x4A, Payload: 22C)

    Note over Sensor,Gateway: The Observe Pattern (Pub/Sub)
    Sensor->>Gateway: [CON] GET /temp (Observe: 0)
    Gateway-->>Sensor: [ACK] 2.05 Content (Temp: 22C)
    Note over Gateway: 1 Hour Later... Temp Changes
    Gateway-->>Sensor: [CON] 2.05 Content (Temp: 24C)
    Sensor->>Gateway: [ACK] (Received update)
TICK3

## 5. Interview Prep

**Q: How does CoAP handle security without TLS (which requires TCP)?**
**A:** CoAP secures data using **DTLS (Datagram Transport Layer Security)**. DTLS is essentially TLS mathematically adapted to work over unreliable UDP. It provides the same cryptographic guarantees (AES encryption, Certificates, Pre-Shared Keys) but is designed to handle out-of-order and dropped packets.

**Q: If CoAP uses UDP, how does it handle large payloads (like downloading a firmware update)?**
**A:** CoAP handles this using **Block-Wise Transfers**. Instead of relying on TCP fragmentation, the CoAP application layer mathematically requests the file in small chunks (e.g., 64-byte blocks). The client requests Block 1, the server sends Block 1. The client then explicitly requests Block 2. This keeps RAM requirements on the tiny IoT device extremely low.

**Q: CoAP vs MQTT: Which should you use for IoT?**
**A:** MQTT is a Publish/Subscribe protocol running over TCP. It requires a central Broker (server) and maintains an always-on TCP connection, making it excellent for high-reliability message routing but heavier on battery. CoAP is a Request/Response (RESTful) protocol running over UDP. It is decentralized (device-to-device) and vastly superior for ultra-low power devices that want to wake up, blast a UDP packet, and immediately go back to sleep.

## 6. Production Use Cases

- **Smart City Infrastructure:** Networked streetlights and parking meters often use CoAP over NB-IoT (Narrowband IoT) cellular networks. The tiny packet size of CoAP minimizes expensive cellular data costs while preserving the 10-year battery life of the parking meter.
- **Home Automation (Matter/Thread):** CoAP is heavily utilized in local mesh networks like Thread (used by Apple, Google, and Amazon smart home devices). A smartphone app can use a CoAP GET request to directly query the state of a smart lock without needing a complex central server.

<Callout icon="info" title="Cross-Protocol Proxies">
Because CoAP was explicitly designed to map exactly to HTTP semantics (GET, PUT, 404 Not Found, 500 Internal Error), it is trivial to build a stateless proxy. An HTTP client (like a standard React web app) can send a standard HTTP GET to an Edge Gateway. The Gateway instantly translates the HTTP header into a binary CoAP UDP packet, sends it to the smart bulb, receives the CoAP reply, translates it back to HTTP, and sends it to the web browser.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/FTP/index.mdx',
    content: `---
title: FTP (File Transfer Protocol)
description: "A standard network protocol used for the transfer of computer files between a client and server on a computer network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="FTP (File Transfer Protocol)">
      {children}
    </ConceptTemplate>
  )
}

The **File Transfer Protocol (FTP)** is one of the oldest protocols still in use on the internet, predating TCP/IP itself (first proposed in 1971 as RFC 114 for the ARPANET). 

Before the World Wide Web and HTTP existed, if you wanted to download software or share documents across the country, you used FTP. While HTTP is optimized for fetching hundreds of tiny assets (HTML, CSS, images) rapidly, FTP was mathematically optimized for one thing: holding open a robust, long-term connection to transfer massive, gigabyte-sized files.

## 1. Deep Dive & Mechanics

Unlike almost every other modern protocol (which uses a single connection), FTP requires **two separate TCP connections** to function:

1. **The Control Connection (Port 21):** The client connects to the server on Port 21. This connection stays open the entire time. It is used strictly for sending text-based commands (like TICK1USERTICK1, TICK1PASSTICK1, TICK1CWDTICK1 to change directories, and TICK1RETRTICK1 to retrieve a file). *No actual file data is ever sent over this port.*
2. **The Data Connection (Port 20 or random):** When the client asks to download a file, an entirely separate TCP connection is created specifically to stream the binary bytes of that file. Once the file finishes, the data connection closes, but the Control connection on Port 21 remains open for the next command.

## 2. Mathematical / Theoretical Foundation

The complexity of FTP arises from how the Data Connection is mathematically established. There are two modes: **Active Mode** and **Passive Mode**.

- **Active Mode (Server connects to Client):** The client opens a random local port (e.g., 50000). It sends a TICK1PORTTICK1 command over Port 21 telling the server, *"I am listening on IP X, Port 50000."* The **server** then initiates a new TCP connection from its Port 20 to the Client's Port 50000.
- **Passive Mode (Client connects to Server):** Because modern NAT and client firewalls block inbound connections, Active Mode almost never works today. In Passive Mode (TICK1PASVTICK1), the client says, *"I cannot accept inbound connections."* The server opens a random ephemeral port (e.g., 60000) and replies, *"Okay, you connect to me on IP Y, Port 60000."* The client then initiates the data connection.

## 3. Real-World Implementation

Interacting with FTP via the command line reveals its plain-text nature.

TICK3bash
# Connecting to an FTP server via CLI
ftp ftp.example.com

# The interactive prompt begins:
# Connected to ftp.example.com.
# 220 (vsFTPd 3.0.3)
# Name: anonymous
# 331 Please specify the password.
# Password: (enter email)
# 230 Login successful.

# Basic Commands:
ftp> ls          # Lists directory contents
ftp> cd pub      # Changes directory
ftp> binary      # Switches transfer mode from ASCII to Binary (critical for zip/exe files!)
ftp> get file.zip # Downloads the file
ftp> put mydata.tar # Uploads a file
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Client
    participant Server (Port 21)
    participant Server (Random Port)

    Note over Client,Server (Port 21): Passive Mode FTP
    Client->>Server (Port 21): TCP Handshake (Control)
    Client->>Server (Port 21): USER anonymous / PASS guest
    Server (Port 21)-->>Client: 230 Logged in
    
    Client->>Server (Port 21): PASV (Enter Passive Mode)
    Server (Port 21)-->>Client: 227 Entering Passive Mode (IP, Port 60000)
    
    Client->>Server (Port 21): RETR massive-file.iso (Download)
    Note over Client,Server (Random Port): Client opens NEW TCP Connection to Port 60000
    Server (Random Port)-->>Client: [Streaming Binary Data...]
    Note over Client,Server (Random Port): Transfer Complete. Port 60000 closes.
    Server (Port 21)-->>Client: 226 Transfer complete.
TICK3

## 5. Interview Prep

**Q: Is FTP secure?**
**A:** Absolutely not. Standard FTP transmits everything—including your username and password—in **plain text**. Anyone sniffing the Wi-Fi network with Wireshark can read your credentials instantly. Today, standard FTP is only used for public, anonymous downloads (like downloading Linux ISOs).

**Q: What is the difference between FTPS and SFTP?**
**A:** They are completely different protocols. 
- **FTPS (FTP over SSL):** This is the exact same traditional FTP protocol, but wrapped in a TLS encryption tunnel (similar to HTTPS). It still uses the complex two-connection (Port 21/Data Port) architecture.
- **SFTP (SSH File Transfer Protocol):** This has absolutely nothing to do with FTP. It is a subsystem of SSH (Secure Shell). It operates entirely over a single TCP connection (Port 22), is fully encrypted, and avoids all the NAT/Firewall nightmares of Passive/Active mode. **SFTP is the modern industry standard.**

**Q: Why do you have to type TICK1binaryTICK1 before downloading an image or executable in CLI FTP?**
**A:** Because FTP was invented when mainframes used different text encodings (like EBCDIC vs ASCII), its default mode is **ASCII mode**. If you download a TICK1.zipTICK1 file in ASCII mode, the FTP client will mathematically search the binary file for line-ending characters (like TICK1\\nTICK1) and translate them to match your local OS (e.g., TICK1\\r\\nTICK1). This alters the bytes and completely corrupts the ZIP file. Setting TICK1binaryTICK1 mode (Image mode) forces FTP to transfer the raw bytes untouched.

## 6. Production Use Cases

- **Legacy Mainframe Integration:** Massive banking and logistics mainframes built in the 1980s still rely heavily on batch processing via FTP. Every night at midnight, systems generate massive CSV flat-files and push them to partner networks using automated FTP scripts.
- **Media and Broadcasting:** High-end video production houses often still use FTP (specifically accelerated variants) to upload massive 500GB raw 8K video files to centralized NAS servers, as HTTP upload protocols often struggle with files of that sheer magnitude.

<Callout icon="danger" title="FTP and Firewalls">
FTP is a nightmare for network engineers. Because the server tells the client which random Port (e.g., Port 64321) to connect to *inside the plain-text payload of Port 21*, a standard firewall blocking all inbound ports will block the file transfer. Firewalls had to implement a hack called **FTP ALG (Application Layer Gateway)**. The firewall literally spies on the plain-text Port 21 traffic, parses the \`227 Entering Passive Mode\` message, extracts the port number, and dynamically opens a temporary hole in the firewall for that specific port. Because FTPS encrypts the payload, the firewall cannot read the port number, completely breaking FTPS behind strict firewalls!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.2 Application-Layer Protocols/HTTP-1.1/index.mdx',
    content: `---
title: HTTP/1.1
description: "The foundational Application-layer protocol of the World Wide Web, standardizing persistent connections and chunked transfers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="HTTP/1.1">
      {children}
    </ConceptTemplate>
  )
}

**HTTP/1.1** (Hypertext Transfer Protocol), standardized in 1997 (RFC 2068), is the undisputed language of the World Wide Web. While HTTP/1.0 created the web, it was highly inefficient. HTTP/1.1 introduced critical mathematical and architectural improvements that allowed the web to scale to its current massive, dynamic state.

It is a stateless, text-based, Request-Response protocol operating over TCP (usually Port 80, or 443 for HTTPS). A client (browser) sends a plaintext request, and a server returns a plaintext response containing headers and a payload (like HTML or JSON).

## 1. Deep Dive & Mechanics

The most critical upgrade in HTTP/1.1 was the introduction of **Persistent Connections (Keep-Alive)**.

In HTTP/1.0, if a webpage had 10 images, the browser had to perform a full TCP 3-Way Handshake, request Image 1, receive Image 1, and close the TCP connection. Then it had to perform *another* 3-Way Handshake for Image 2. This added massive mathematical latency overhead.

HTTP/1.1 defaults to TICK1Connection: keep-aliveTICK1. The browser opens a single TCP connection, requests the HTML, keeps the TCP socket open, and reuses that exact same socket to sequentially request the CSS, JS, and all 10 images. 

Additionally, HTTP/1.1 introduced **Host Headers**. In 1.0, the server didn't know which domain you were requesting, meaning one IP address could only host one website. 1.1 requires the TICK1Host: example.comTICK1 header, allowing a single IP address to host thousands of different websites (Virtual Hosting).

## 2. Mathematical / Theoretical Foundation

A major challenge in streaming data over TCP is knowing when the payload ends. 
If a server is generating a massive database report dynamically, it doesn't know the TICK1Content-LengthTICK1 ahead of time. In 1.0, the only way to signal the end of a file was to physically close the TCP connection, which breaks Keep-Alive.

HTTP/1.1 solved this mathematically with **Chunked Transfer Encoding**. 
Instead of sending one massive payload, the server sends the data in chunks. Before each chunk, it sends the exact hexadecimal size of that chunk. 

TICK3text
HTTP/1.1 200 OK
Transfer-Encoding: chunked

4\r\n        (Hex for 4 bytes)
Wiki\r\n
5\r\n        (Hex for 5 bytes)
pedia\r\n
0\r\n        (Hex 0 means "I am finished!")
\r\n
TICK3
This allows the TCP socket to stay open, while mathematically guaranteeing the client knows exactly when the dynamic stream has concluded.

## 3. Real-World Implementation

Because HTTP/1.1 is plain text, you can literally speak it to a server using a raw TCP socket.

TICK3bash
# Connect to a web server manually
telnet example.com 80

# Type the following HTTP/1.1 request (pressing Enter twice at the end):
GET / HTTP/1.1
Host: example.com
Accept: text/html

# The server will reply in plain text:
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1256
Connection: keep-alive

<!doctype html>
<html>...</html>
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Browser
    participant Server

    Note over Browser,Server: HTTP/1.0 (Inefficient)
    Browser->>Server: TCP Handshake (SYN, SYN-ACK, ACK)
    Browser->>Server: GET /index.html
    Server-->>Browser: 200 OK (HTML)
    Server->>Browser: TCP FIN (Closes Connection)
    Browser->>Server: TCP Handshake (NEW Connection)
    Browser->>Server: GET /style.css
    Server-->>Browser: 200 OK (CSS)

    Note over Browser,Server: HTTP/1.1 (Keep-Alive)
    Browser->>Server: TCP Handshake (SYN, SYN-ACK, ACK)
    Browser->>Server: GET /index.html (Connection: keep-alive)
    Server-->>Browser: 200 OK (HTML)
    Note over Browser,Server: TCP Socket remains open!
    Browser->>Server: GET /style.css
    Server-->>Browser: 200 OK (CSS)
    Browser->>Server: GET /script.js
    Server-->>Browser: 200 OK (JS)
TICK3

## 5. Interview Prep

**Q: What is Head-of-Line (HoL) Blocking in HTTP/1.1?**
**A:** Even though HTTP/1.1 reuses the TCP connection, it is strictly synchronous. The browser requests Asset 1. It *must* wait for Asset 1 to completely finish downloading before it can request Asset 2 on that same socket. If Asset 1 is a massive 50MB video file, Asset 2 (a tiny CSS file) is stuck waiting in line. This is Head-of-Line Blocking. Browsers hack around this by opening up to 6 parallel TCP connections to the same server.

**Q: What is HTTP Pipelining?**
**A:** Pipelining was an attempt to fix HoL blocking in HTTP/1.1. It allowed the browser to send the requests for Asset 1, 2, and 3 simultaneously without waiting for the response. However, the server was mathematically forced to return the responses in the exact same order (1, 2, 3). If Asset 1 took a long time to generate, 2 and 3 were still blocked on the server side. Pipelining was notoriously buggy in intermediary proxies and was largely abandoned by modern browsers in favor of HTTP/2.

**Q: What is a 304 Not Modified response?**
**A:** A caching mechanism. The browser sends a GET request with a header TICK1If-Modified-Since: Wed, 21 Oct 2025TICK1. The server checks the file. If the file hasn't changed since that date, it replies with TICK1304 Not ModifiedTICK1 and an empty body. This mathematically saves immense bandwidth, telling the browser to just use the copy in its local hard drive cache.

## 6. Production Use Cases

- **RESTful APIs:** Almost all standard web APIs (JSON over HTTP) communicate using HTTP/1.1 semantics, utilizing verbs (GET, POST, PUT, DELETE, PATCH) to map directly to CRUD operations on database resources.
- **Reverse Proxies:** Tools like Nginx and HAProxy are masters of HTTP/1.1. They parse the TICK1HostTICK1 header of incoming traffic on Port 80/443 and dynamically route it to different backend microservices based on the URL path.

<Callout icon="warning" title="The Overhead of Text">
HTTP/1.1 is incredibly verbose. Every single request sends hundreds of bytes of plain-text headers (User-Agent, Cookies, Accept-Encoding). If a web page makes 100 requests for tiny icons, the browser transmits the exact same 1KB of cookie/header data 100 times over the wire, wasting 100KB of upload bandwidth. This mathematical inefficiency was a primary driver for the binary compression introduced in HTTP/2.
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
