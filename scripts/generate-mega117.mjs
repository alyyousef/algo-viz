import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/38. Infrastructure as Code/SaltStack/index.mdx': `---
title: SaltStack
description: A Python-based configuration management and orchestration platform renowned for its extreme mathematical execution speed, utilizing a high-speed message bus to control thousands of servers simultaneously.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="SaltStack (Salt)"
  subtitle="High-Speed Infrastructure Orchestration"
  tags={['Configuration Management', 'Python', 'Infrastructure', 'Automation']}
>

While Puppet and Chef operate on a slow, 30-minute mathematical pull cycle, SaltStack (now owned by VMware/Broadcom) was mathematically engineered for real-time speed.

## 1. The ZeroMQ Message Bus
SaltStack's architecture relies on a **Salt Master** and **Salt Minions** (the agents).
Instead of polling the Master via standard HTTP, the Minions mathematically maintain a persistent, encrypted TCP connection to the Master via a high-speed message bus called **ZeroMQ**. 
Because the connection is always open, if a zero-day vulnerability is discovered, an administrator can execute a mathematical command on the Master to patch 10,000 servers simultaneously. The command traverses the ZeroMQ bus and executes on all 10,000 Minions in less than 5 seconds.

## 2. States and Pillars
Like its competitors, SaltStack is mathematically declarative.
You write configuration files called **States** (using YAML and Jinja templating, making it much more readable than Chef's Ruby). To prevent hardcoding sensitive data, Salt uses **Pillars**. Pillars are encrypted, mathematically isolated data structures (like database passwords) that the Master securely distributes *only* to the specific Minions that require them, ensuring absolute cryptographic segregation of secrets.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Apache HTTP Server/index.mdx': `---
title: Apache HTTP Server
description: The historically dominant, open-source web server mathematically engineered around a process-driven, modular architecture that defined the early era of the World Wide Web.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Apache HTTP Server"
  subtitle="The Foundation of the Early Web"
  tags={['Web Servers', 'HTTP', 'Legacy', 'Architecture']}
>

Created in 1995, Apache was the absolute mathematical king of the internet for two decades. It was the "A" in the famous LAMP stack (Linux, Apache, MySQL, PHP).

## 1. Process-Driven Architecture
Apache's original mathematical architecture is fundamentally different from modern servers like Nginx.
Apache uses a **Multi-Processing Module (MPM)**. In its traditional TICK1preforkTICK1 mode, Apache mathematically spawns a brand new, dedicated OS process (or thread) for *every single incoming HTTP connection*. 
If 1,000 users visit the website simultaneously, Apache spawns 1,000 heavy Linux processes. If each process consumes 20MB of RAM, the server mathematically requires 20GB of RAM just to keep the connections open, leading to catastrophic memory exhaustion under heavy load (the infamous "C10k problem").

## 2. The .htaccess File
Apache's greatest strength (and mathematical weakness) was its extreme flexibility, specifically the TICK1.htaccessTICK1 file.
This allowed developers in a shared hosting environment to mathematically override global server configurations (like URL rewriting or password protection) on a per-directory basis without restarting the server. However, this mathematically forced Apache to scan the hard drive for a TICK1.htaccessTICK1 file on every single HTTP request, creating massive disk I/O latency that modern asynchronous servers eliminated.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Caddy/index.mdx': `---
title: Caddy
description: A modern, highly extensible open-source web server written in Go, mathematically distinguished by its automatic, zero-configuration acquisition and renewal of TLS certificates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Caddy"
  subtitle="The Auto-HTTPS Web Server"
  tags={['Web Servers', 'TLS', 'Go', 'Security']}
>

Configuring Nginx to serve HTTPS requires writing complex mathematical cryptographic blocks and setting up cron jobs to manually renew Let's Encrypt certificates before they expire. Caddy eliminates this mathematical overhead entirely.

## 1. Automatic HTTPS
Caddy is mathematically engineered for absolute security by default.
To serve a secure website, a developer writes a two-line TICK1CaddyfileTICK1:
TICK3text
example.com
reverse_proxy localhost:8080
TICK3
When Caddy starts, it mathematically analyzes the configuration. It automatically contacts Let's Encrypt, performs the cryptographic ACME challenge, provisions the TLS certificate, securely stores the private key, configures the cipher suites to mathematically reject legacy protocols (like SSLv3), and begins serving HTTPS traffic. It mathematically tracks the expiration date and automatically renews the certificate in the background, achieving zero-touch cryptographic security.

## 2. The Go Architecture
Because Caddy is written in **Go**, it compiles down to a single, mathematically independent binary.
It has zero dependencies (no libc, no Python, no PHP required). You can drop the single TICK1caddyTICK1 executable onto a naked Alpine Linux container and it will run flawlessly. Furthermore, Go's mathematical memory safety prevents the buffer overflow attacks that historically plagued C/C++ web servers like Apache and Nginx.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Envoy/index.mdx': `---
title: Envoy
description: A high-performance C++ distributed proxy designed by Lyft specifically for cloud-native microservices, mathematically abstracting the network to provide unified observability and traffic control.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Envoy"
  subtitle="The Cloud-Native Proxy"
  tags={['Proxies', 'Networking', 'Microservices', 'Architecture']}
>

Nginx and HAProxy were designed in the era of static servers. Envoy (donated to the CNCF by Lyft) was mathematically engineered from the ground up for the chaotic, highly dynamic era of Kubernetes microservices.

## 1. The Universal Data Plane
In a microservice architecture, Envoy is typically deployed as a **Sidecar** (one Envoy proxy running directly next to every single application container).
This mathematically forms a "Data Plane." The application never talks to the network directly; it only talks to its local Envoy proxy via TICK1localhostTICK1. Envoy mathematically handles all the complex distributed systems logic: mutual TLS (mTLS) encryption, automatic retries, exponential backoffs, and circuit breaking.

## 2. API-Driven Configuration
Nginx requires you to write a static TICK1nginx.confTICK1 file and mathematically reload the process (TICK1nginx -s reloadTICK1) to apply changes, which drops connections.
Envoy mathematically solved this by dropping static files entirely. Envoy is configured dynamically via a highly advanced gRPC API (the **xDS API**). A central Control Plane (like Istio) continuously streams mathematical routing updates directly into Envoy's memory in real-time. Envoy dynamically alters its routing tables without ever dropping a single active HTTP connection.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/HAProxy/index.mdx': `---
title: HAProxy
description: The industry standard open-source software for mathematical TCP/HTTP load balancing, renowned for its extreme reliability, low latency, and ability to handle millions of concurrent connections.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="HAProxy (High Availability Proxy)"
  subtitle="The Load Balancing Engine"
  tags={['Load Balancing', 'Networking', 'Performance', 'Architecture']}
>

While Nginx is primarily a Web Server that *can* load balance, HAProxy is a pure, hyper-optimized Load Balancer. It is the mathematical engine powering some of the highest-traffic websites on Earth (like Reddit and GitHub).

## 1. Extreme Mathematical Efficiency
HAProxy is written in C and uses an event-driven, non-blocking mathematical architecture.
Its primary objective is to move packets from a client to a backend server as fast as the physical CPU allows. It is so mathematically optimized that a single HAProxy server running on standard modern hardware can effortlessly sustain over 2 million concurrent TCP connections and route over 100,000 HTTP requests per second with less than 1 millisecond of added latency.

## 2. Advanced Routing Algorithms
HAProxy provides deep mathematical control over how traffic is distributed across backend servers:
- **Round Robin**: Distribute requests evenly (1, 2, 3, 1, 2, 3).
- **Least Connections**: Mathematically route the new request to the specific server that currently has the lowest number of active connections.
- **Source IP Hashing**: Mathematically hash the client's IP address. This guarantees that a specific user will *always* be routed to the exact same backend server, maintaining "sticky sessions" for stateful applications.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/IIS/index.mdx': `---
title: IIS (Internet Information Services)
description: Microsoft's proprietary, highly extensible web server mathematically integrated deeply into the Windows Server operating system, optimized for hosting .NET applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="IIS (Internet Information Services)"
  subtitle="The Enterprise Windows Web Server"
  tags={['Web Servers', 'Microsoft', 'Windows', 'Enterprise']}
>

If a corporation's architecture is mathematically anchored in the Microsoft ecosystem (Active Directory, SQL Server, C# .NET), IIS is the foundational web server that ties the ecosystem together.

## 1. Deep OS Integration
Because IIS is not a standalone executable but an integrated Windows Server Role, it possesses mathematical capabilities Linux servers lack.
The most prominent is **Windows Authentication (Kerberos/NTLM)**. If an employee logs into their corporate Windows laptop, IIS can mathematically authenticate them against Active Directory silently in the background via their browser, granting them access to internal web applications without requiring them to type a username and password.

## 2. Application Pools
IIS introduced a brilliant mathematical concept called **Application Pools**.
In Apache, if a poorly written PHP script crashes, the entire Apache server goes down. In IIS, administrators mathematically assign different websites to different isolated Application Pools. Each pool runs as an entirely separate Windows Worker Process (TICK1w3wp.exeTICK1). If Website A mathematically consumes 100% of the CPU and crashes its worker process, Website B (running in a different Application Pool) remains perfectly stable and highly available.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/TLS termination/index.mdx': `---
title: TLS Termination
description: An architectural pattern where a proxy or load balancer mathematically decrypts incoming secure HTTPS traffic, passing the unencrypted HTTP traffic to the internal backend servers to save compute resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="TLS Termination"
  subtitle="Cryptographic Offloading"
  tags={['Security', 'Cryptography', 'Networking', 'Architecture']}
>

Transport Layer Security (TLS, formerly SSL) involves highly complex mathematical calculations (RSA/ECC asymmetric handshakes and AES symmetric encryption). If you have 50 backend Node.js microservices, forcing each Node process to mathematically encrypt and decrypt traffic wastes massive amounts of CPU power.

## 1. The Proxy Offload
TLS Termination solves this by delegating the mathematical burden to a dedicated Load Balancer (like Nginx, HAProxy, or AWS ALB).
The client establishes a secure HTTPS connection with the Load Balancer. The Load Balancer holds the private key, performs the mathematical handshake, and **terminates** the TLS connection. It decrypts the packet. The Load Balancer then mathematically forwards the raw, unencrypted HTTP traffic over the internal private network to the backend Node.js server. 

## 2. Security Trade-offs
TLS Termination is mathematically brilliant for performance, but it introduces a strict security requirement: **The internal network must be absolutely trusted.**
Because traffic flows unencrypted between the Load Balancer and the backend server, if a hacker penetrates the internal VPC (Virtual Private Cloud), they can use a packet sniffer to read all passwords and data in plain text. In Zero-Trust architectures (like banking), engineers use **TLS Passthrough** or **mTLS**, mathematically forcing the encryption to remain intact until it reaches the final destination container.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Traefik/index.mdx': `---
title: Traefik
description: A modern, open-source Edge Router that mathematically integrates with cloud-native orchestrators (like Docker and Kubernetes) to dynamically and automatically discover and route traffic to microservices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Traefik"
  subtitle="The Auto-Discovering Edge Router"
  tags={['Web Servers', 'Proxies', 'Docker', 'Kubernetes']}
>

If you use Nginx to load balance 10 Docker containers, and you spin up a 11th container, you must manually edit the TICK1nginx.confTICK1 file and mathematically reload Nginx. Traefik was built to eliminate this manual configuration entirely.

## 1. Dynamic Mathematical Discovery
Traefik does not rely on static configuration files. It is mathematically plugged directly into the APIs of the underlying orchestrator (Docker Daemon or Kubernetes API).
When you deploy a new Docker container, you simply add a mathematical label to it: TICK1traefik.http.routers.my-app.rule=Host('myapp.com')TICK1.
Traefik instantly intercepts this API event. It mathematically updates its own internal routing table in memory in milliseconds. Traffic to TICK1myapp.comTICK1 is instantly routed to the new container without a single line of static configuration or a process reload.

## 2. The Kubernetes Ingress Controller
Because of its dynamic nature, Traefik became immensely popular as a **Kubernetes Ingress Controller**.
Instead of writing complex annotations, Traefik introduced a Custom Resource Definition (CRD) called the **IngressRoute**. This allows developers to mathematically define complex routing logic (like Canary deployments, header manipulations, and automatic Let's Encrypt TLS termination) using pure, declarative Kubernetes YAML.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Virtual hosts/index.mdx': `---
title: Virtual Hosts
description: A fundamental web server technique that mathematically enables a single physical server with a single IP address to host and route traffic for hundreds of completely different domain names.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Virtual Hosts (Server Blocks)"
  subtitle="Mathematical Domain Routing"
  tags={['Web Servers', 'Networking', 'HTTP', 'Architecture']}
>

In the early internet, hosting 10 different websites required 10 physical servers and 10 expensive, mathematically distinct public IP addresses. Virtual Hosting (known as TICK1VirtualHostTICK1 in Apache and TICK1serverTICK1 blocks in Nginx) solved this limitation.

## 1. The HTTP Host Header
Virtual Hosting relies on a specific mathematical feature of the HTTP/1.1 protocol: the **Host header**.
When a user types TICK1cats.comTICK1 into their browser, the DNS mathematically resolves to IP TICK1203.0.113.5TICK1. The user types TICK1dogs.comTICK1, and DNS resolves to the exact same IP TICK1203.0.113.5TICK1.
The TCP connection hits the web server. How does the server know which website to return? The browser mathematically injects a header into the request: TICK1Host: cats.comTICK1.

## 2. Server-Side Evaluation
The web server (e.g., Nginx) reads the HTTP request. It mathematically evaluates the TICK1HostTICK1 header against its internal configuration.
TICK3nginx
server {
    listen 80;
    server_name cats.com;
    root /var/www/cats;
}
server {
    listen 80;
    server_name dogs.com;
    root /var/www/dogs;
}
TICK3
If the header matches TICK1cats.comTICK1, Nginx mathematically routes the request to the TICK1/var/www/catsTICK1 directory. This simple mathematical string-matching algorithm allows massive shared-hosting providers to host thousands of websites on a single physical machine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Datadog/index.mdx': `---
title: Datadog
description: A massive, cloud-based, enterprise-grade observability and security platform that mathematically aggregates metrics, traces, and logs from across the entire technology stack into a unified, AI-driven dashboard.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Datadog"
  subtitle="The Enterprise Observability Behemoth"
  tags={['Observability', 'Monitoring', 'Enterprise', 'SaaS']}
>

Historically, a company used Nagios for server metrics, Splunk for logs, and New Relic for application tracing. Datadog mathematically synthesized all three pillars of observability into a single, aggressively unified SaaS platform.

## 1. The Unified Agent
The core of Datadog is the **Datadog Agent** (written in Go), deployed as a DaemonSet on Kubernetes or a service on Linux/Windows.
This single agent mathematically scrapes host CPU metrics, intercepts distributed APM (Application Performance Monitoring) traces, and tails container logs. Because all this data is transmitted to Datadog's cloud under a unified mathematical tagging structure, an engineer can look at a spike in CPU, click a button, and instantly see the exact database query and the exact error log that caused the spike at that exact millisecond.

## 2. AI and Mathematical Anomaly Detection
Datadog is designed for systems too complex for static mathematical alerts (e.g., "Alert if CPU > 90%").
It uses **Machine Learning Anomaly Detection**. Datadog's AI mathematically analyzes the application's traffic over 6 months to establish a seasonal baseline (e.g., traffic is always high on Tuesday mornings, but low on Saturday nights). If traffic suddenly spikes on a Saturday night, the AI mathematically detects the deviation from the baseline and triggers an incident, catching edge cases that humans cannot manually codify.

</TechnologyTemplate>
`
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
