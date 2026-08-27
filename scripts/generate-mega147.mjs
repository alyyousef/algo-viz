import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Flask vs Django/index.mdx': `---
title: Flask vs Django
description: "A comparison of Python's legacy web frameworks, contrasting the unopinionated, minimalist architecture of Flask with the 'batteries-included', highly structured monolith of Django."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Flask vs Django"
  subtitle="Minimalism vs The Monolith"
  tags={['Comparison', 'Python', 'Backend', 'Web Development']}
>

Before FastAPI disrupted the ecosystem, Python web development was a strict binary choice between Flask (the micro-framework) and Django (the monolithic framework).

## 1. Flask: The Micro-Framework
- **Philosophy**: "Do one thing well." Flask provides routing (via Werkzeug) and templating (via Jinja2), and absolutely nothing else.
- **Architecture**: Unopinionated. You must choose and integrate your own database ORM (SQLAlchemy), your own authentication system (Flask-Login), and your own directory structure.
- **Use Case**: Simple APIs, microservices, or highly customized applications where you need complete control over every single component.

## 2. Django: Batteries Included
- **Philosophy**: "Don't Repeat Yourself (DRY)." Django provides a massive, pre-built ecosystem. It assumes that most web apps need a database, user authentication, an admin panel, and CSRF protection, so it builds them all in natively.
- **Architecture**: Highly Opinionated (MVT - Model View Template). You must use the Django ORM. You must structure your folders exactly how Django wants them.
- **Use Case**: Massive content-management systems, e-commerce sites, or MVPs where you need a fully functioning backend with an admin dashboard in 24 hours. (Instagram and Pinterest were built on Django).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Go vs Rust/index.mdx': `---
title: Go vs Rust
description: "A philosophical comparison between the two dominant modern systems languages: Google's Go (simplicity and fast concurrency) and Mozilla's Rust (memory safety without garbage collection)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Go vs Rust"
  subtitle="The Modern Systems War"
  tags={['Comparison', 'Languages', 'Systems', 'Architecture']}
>

As C and C++ began showing their age (primarily due to memory leaks and security vulnerabilities), the tech giants built two completely different languages to replace them.

## 1. Go (Golang)
- **Creator**: Google (Rob Pike, Ken Thompson).
- **Philosophy**: Extreme Simplicity. Go is designed to be mathematically trivial to learn. It removes classes, inheritance, and complex abstractions.
- **Superpower**: Concurrency. Go uses lightweight "Goroutines" and channels, allowing a web server to handle 100,000 concurrent requests with mathematically perfect efficiency. It has an ultra-fast Garbage Collector.
- **Use Case**: Cloud infrastructure, microservices, and network routing. (Docker, Kubernetes, and Terraform are written in Go).

## 2. Rust
- **Creator**: Mozilla.
- **Philosophy**: Absolute Control and Safety. Rust allows you to write mathematically perfect, brutally fast C-level code, but its compiler physically refuses to compile if there is a single memory leak or race condition.
- **Superpower**: The Borrow Checker. Rust completely eliminates the Garbage Collector. It mathematically tracks the "ownership" of every variable in RAM at compile-time, ensuring memory is freed instantly when it goes out of scope.
- **Use Case**: Operating systems (Rust is now natively supported in the Linux Kernel), web browsers, AAA game engines, and embedded systems where a Garbage Collector pause is catastrophic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Horizontal vs vertical scaling/index.mdx': `---
title: Horizontal vs Vertical Scaling
description: "The fundamental infrastructure decision of how to handle increased server load: upgrading the mathematical power of a single machine (Vertical) versus adding more identical machines to a cluster (Horizontal)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Horizontal vs Vertical Scaling"
  subtitle="Scaling Out vs Scaling Up"
  tags={['Comparison', 'System Design', 'Architecture', 'Infrastructure']}
>

When a web application goes viral, the server will mathematically collapse under the load. There are only two ways to scale a system.

## 1. Vertical Scaling (Scaling Up)
- **Mechanism**: Buying a bigger server. If your 16GB RAM server is dying, you shut it down, migrate to a 128GB RAM server with a 64-core CPU, and turn it back on.
- **Pros**: Mathematically trivial. It requires exactly zero changes to your codebase.
- **Cons**: A Single Point of Failure. If that one massive server loses power, the entire application dies. Furthermore, there is a hard mathematical limit; you cannot physically buy a server with 10,000 Terabytes of RAM.

## 2. Horizontal Scaling (Scaling Out)
- **Mechanism**: Buying more servers. You keep your 16GB RAM server, but you buy 99 more identical ones, placing a **Load Balancer** in front of them to distribute the traffic evenly.
- **Pros**: Infinite mathematical scalability (Google uses millions of servers). High Availability (if 10 servers explode, the other 90 keep the site online seamlessly).
- **Cons**: Architecturally catastrophic. Your codebase must become "Stateless". If User A logs into Server 1, and their next request hits Server 2, Server 2 doesn't know who they are. You must introduce centralized caching (Redis), distributed databases, and complex container orchestration (Kubernetes).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/HTTP vs HTTPS/index.mdx': `---
title: HTTP vs HTTPS
description: "The critical networking distinction between raw, plaintext web transmission (HTTP) and mathematically encrypted, certificate-verified secure transmission (HTTPS)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="HTTP vs HTTPS"
  subtitle="Plaintext vs TLS Encryption"
  tags={['Comparison', 'Networking', 'Security', 'Protocols']}
>

HTTP (Hypertext Transfer Protocol) is the foundational language of the World Wide Web. It dictates how a browser asks a server for an HTML file. However, standard HTTP is a massive mathematical security risk.

## 1. HTTP (Port 80)
- **Mechanism**: When you submit a password over HTTP, it is mathematically transmitted across the internet as pure, readable plaintext.
- **Vulnerability**: Any router between your laptop and the server (e.g., the public Starbucks Wi-Fi router) can mathematically read the packets, stealing your password instantly via a "Man-in-the-Middle" attack.

## 2. HTTPS (Port 443)
- **Mechanism**: HTTPS wraps standard HTTP inside a massive cryptographic tunnel called **TLS** (Transport Layer Security).
- **The Handshake**: When you connect, the server sends a mathematical Certificate (verified by a trusted Certificate Authority). Your browser and the server use Asymmetric Math (RSA) to securely agree on a shared secret key. They then use that key to encrypt all further communication using Symmetric Math (AES-256).
- **Security**: If the Starbucks router intercepts an HTTPS packet, it only sees mathematical garbage. It would take all the computers on Earth millions of years to crack the encryption. (Google Chrome now explicitly flags any non-HTTPS site as "Not Secure").

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/IPv4 vs IPv6/index.mdx': `---
title: IPv4 vs IPv6
description: "A comparison of internet addressing protocols, detailing the mathematical exhaustion of the 32-bit IPv4 system and the transition to the astronomically massive 128-bit IPv6 system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="IPv4 vs IPv6"
  subtitle="The Exhaustion of Addresses"
  tags={['Comparison', 'Networking', 'Protocols', 'Architecture']}
>

Every device connected to the internet requires a unique IP address to route packets. The transition from IPv4 to IPv6 is the largest, most painful infrastructure migration in human history.

## 1. IPv4 (The 32-Bit Limit)
- **Format**: Four decimal numbers separated by dots (e.g., TICK1192.168.1.1TICK1).
- **The Math**: Because it is a 32-bit integer, there are mathematically exactly **2^32 (4.29 Billion)** possible addresses.
- **The Problem**: In the 1980s, 4 billion seemed infinite. With the invention of smartphones and IoT devices, the world officially ran out of IPv4 addresses. Engineers invented NAT (Network Address Translation) as a desperate hack to hide multiple devices behind a single public router IP, but it broke fundamental end-to-end routing.

## 2. IPv6 (The 128-Bit Future)
- **Format**: Eight groups of hexadecimal numbers separated by colons (e.g., TICK12001:0db8:85a3:0000:0000:8a2e:0370:7334TICK1).
- **The Math**: Because it is a 128-bit integer, there are exactly **2^128 (340 Undecillion)** possible addresses.
- **The Solution**: That is enough addresses to assign a unique IP to every single atom on the surface of the Earth. IPv6 eliminates the need for NAT entirely, restoring true peer-to-peer connectivity, and introduces native mathematical packet encryption (IPsec).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Java vs Csharp/index.mdx': `---
title: Java vs C#
description: "A historical and architectural comparison between the two titans of enterprise software: Sun's original write-once-run-anywhere Java, and Microsoft's highly refined, feature-rich C#."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Java vs C#"
  subtitle="The Enterprise Monopolies"
  tags={['Comparison', 'Languages', 'Enterprise', 'Architecture']}
>

Java (1995) and C# (2000) are massive, statically-typed, Object-Oriented, garbage-collected languages that mathematically dominate the Fortune 500 enterprise landscape.

## 1. Java (The JVM Pioneer)
- **Philosophy**: "Write Once, Run Anywhere." Java mathematically compiles source code into Bytecode, which is then executed by the Java Virtual Machine (JVM). This meant a Java program compiled on Windows could run flawlessly on Linux.
- **Ecosystem**: Unparalleled open-source ecosystem (Spring Boot, Apache Hadoop, Kafka). Android apps were historically written entirely in Java.
- **Cons**: Historically slow to adopt new mathematical language features, leading to notorious boilerplate (extreme verbosity).

## 2. C# (The Microsoft Refinement)
- **History**: When Microsoft was legally blocked from modifying Java in 2000, Anders Hejlsberg (creator of TypeScript) built C# as a direct competitor, running on the .NET Common Language Runtime (CLR).
- **Philosophy**: Developer Ergonomics. C# aggressively adopted modern mathematical features (LINQ, async/await, Properties, Structs) a decade before Java did.
- **Ecosystem**: Historically locked exclusively to Windows, making it useless for Linux servers. However, with the release of **.NET Core** (open-source and cross-platform), C# is now mathematically one of the fastest, most elegant, and highest-performing backend languages on earth, fully matching Java's cross-platform capabilities.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Jenkins vs GitHub Actions/index.mdx': `---
title: Jenkins vs GitHub Actions
description: "A comparison of Continuous Integration (CI/CD) pipelines, contrasting the absolute customizable power of a self-hosted Jenkins server with the frictionless, cloud-native YAML automation of GitHub Actions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Jenkins vs GitHub Actions"
  subtitle="The Evolution of CI/CD"
  tags={['Comparison', 'DevOps', 'CI/CD', 'Automation']}
>

Continuous Integration and Deployment (CI/CD) automates the mathematical process of testing, building, and deploying code every time a developer pushes a commit. 

## 1. Jenkins (The Self-Hosted Behemoth)
- **Architecture**: A massive Java application you must physically install and maintain on your own Linux server. You write pipelines using Groovy scripting.
- **Pros**: Absolute, mathematically infinite customization. There are thousands of plugins for every obscure enterprise tool on earth. Because you own the server, there are no cloud billing limits on build minutes.
- **Cons**: "Jenkins is a full-time job." Managing the JVM, updating plugins (which constantly break), and securing the server requires a dedicated DevOps engineer.

## 2. GitHub Actions (The Cloud-Native Standard)
- **Architecture**: Deeply integrated directly into the GitHub UI. You write pipelines using simple TICK1.yamlTICK1 files in your repository, and GitHub mathematically provisions temporary cloud servers (Runners) to execute them.
- **Pros**: Frictionless. Zero server maintenance. A massive marketplace of pre-built "Actions" (e.g., TICK1uses: actions/setup-node@v3TICK1) allows you to build complex pipelines in minutes instead of weeks.
- **Cons**: You pay by the minute for GitHub's cloud runners (though you can attach your own self-hosted runners if needed). Vendor lock-in is mathematically absolute; you cannot easily migrate GitHub Actions YAML to GitLab.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Kafka vs RabbitMQ/index.mdx': `---
title: Kafka vs RabbitMQ
description: "A fundamental architectural comparison of messaging systems, contrasting RabbitMQ's memory-based, point-to-point message queuing with Kafka's disk-based, massive-scale distributed event streaming log."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kafka vs RabbitMQ"
  subtitle="Message Queues vs Event Streams"
  tags={['Comparison', 'System Design', 'Architecture', 'Streaming']}
>

When microservices need to talk to each other asynchronously, they use Message Brokers. However, RabbitMQ and Apache Kafka solve two completely different mathematical problems.

## 1. RabbitMQ (The Smart Broker, Dumb Consumer)
- **Architecture**: A traditional Message Queue. When Service A sends a message, RabbitMQ mathematically routes it to the specific queue for Service B.
- **Mechanism**: Once Service B reads the message and acknowledges it, RabbitMQ physically deletes it from RAM. 
- **Use Case**: Complex routing rules (e.g., "Send PDF generation tasks to Server X, and Image tasks to Server Y"). Used when you want mathematically guaranteed, once-only task processing.

## 2. Apache Kafka (The Dumb Broker, Smart Consumer)
- **Architecture**: A Distributed Commit Log (Event Stream). Kafka does not delete messages when read. It mathematically appends every event to a massive, immutable text file on a Hard Drive.
- **Mechanism**: The Consumer is responsible for remembering its own "offset" (which line of the file it read last). Because Kafka just writes to disk sequentially, it can process **Millions of messages per second** (LinkedIn uses it to track every single button click globally).
- **Use Case**: Massive scale Data Pipelines, Event Sourcing, and scenarios where multiple different microservices need to independently replay the exact same historical data from a week ago.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Kubernetes vs Docker/index.mdx': `---
title: Kubernetes vs Docker
description: "Clarifying the most common misconception in DevOps: Docker is the engine that builds and runs a single container, while Kubernetes is the mathematical orchestrator that manages thousands of them across a cluster of servers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kubernetes vs Docker"
  subtitle="The Engine vs The Orchestrator"
  tags={['Comparison', 'DevOps', 'Containers', 'Kubernetes']}
>

Comparing Kubernetes to Docker is like comparing a symphony conductor to an individual violin. They do not compete; they mathematically rely on each other.

## 1. Docker (The Container Engine)
- **Purpose**: Docker takes your source code and mathematically packages it into a single, immutable box (a Container Image) containing the OS, libraries, and code. 
- **Limitation**: If you run Docker on a server, and that server loses power, your website dies. Docker has no mathematical concept of multiple servers (excluding Docker Swarm, which lost the orchestration war).

## 2. Kubernetes (The Container Orchestrator)
- **Purpose**: Kubernetes (K8s) is a massive clustered operating system. You give K8s a cluster of 100 physical Linux servers. You don't tell it *how* to run containers; you give it a declarative mathematical state: *"Ensure there are always exactly 5 instances of my Docker container running."*
- **Mechanism**: K8s constantly monitors the cluster. If Server #3 catches fire, taking down 2 of your Docker containers, the K8s Control Plane mathematically detects the failure instantly, and automatically boots up 2 replacement Docker containers on Server #7 to maintain the declared state. It handles load balancing, auto-scaling, and rolling updates seamlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Kubernetes vs Docker Compose/index.mdx': `---
title: Kubernetes vs Docker Compose
description: "An architectural comparison of container management, contrasting the simplicity of Docker Compose for local development on a single machine with the massive, distributed complexity of Kubernetes for production clusters."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kubernetes vs Docker Compose"
  subtitle="Local Dev vs Global Prod"
  tags={['Comparison', 'DevOps', 'Containers', 'Architecture']}
>

While Kubernetes and Docker Compose both orchestrate multiple containers using declarative YAML files, their mathematical scope and underlying architecture are worlds apart.

## 1. Docker Compose
- **Architecture**: Single-Node Orchestration. It runs locally on your laptop (or a single VPS). 
- **Use Case**: Local Development. You write a TICK1docker-compose.ymlTICK1 file defining a Postgres database, a Redis cache, and a Node.js backend. When you type TICK1docker-compose upTICK1, it boots all three containers on your laptop, hooks them to the same local network, and streams the logs to your terminal.
- **Limitation**: It is mathematically incapable of scaling across multiple physical servers or surviving hardware failures.

## 2. Kubernetes (K8s)
- **Architecture**: Multi-Node Distributed Orchestration. 
- **Use Case**: Enterprise Production. K8s requires a Control Plane and multiple Worker Nodes. It uses vastly more complex YAML (Deployments, Services, Ingresses).
- **The Verdict**: You use Docker Compose to mathematically test that your containers work together on your laptop. Once verified, you push those containers to a registry, and write Kubernetes manifests to deploy them across 50 servers in the cloud. Attempting to run full Kubernetes locally (via Minikube) just to test a database connection is often mathematically overkill.

</ConceptTemplate>
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
