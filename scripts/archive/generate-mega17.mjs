import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EC2/index.mdx': `---
title: Amazon EC2
description: Elastic Compute Cloud, Amazon's foundational service providing resizable compute capacity in the cloud.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Amazon EC2 (Elastic Compute Cloud)" 
  category="Cloud Computing" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/b/b2/Amazon_Web_Services_Logo.svg"
>

**Amazon EC2 (Elastic Compute Cloud)** is the absolute backbone of AWS. It provides raw, virtualized servers (called "Instances") in the cloud. When you launch an EC2 instance, you are renting a slice of a massive physical server sitting in an Amazon data center.

<Callout icon="info" title="IaaS Pioneer">
  EC2 is the quintessential example of **Infrastructure as a Service (IaaS)**. You get a virtual machine with a fresh Linux or Windows installation. From there, you are 100% responsible for patching the OS, installing runtimes (like Node.js or Python), and configuring networking.
</Callout>

## Instance Families

AWS offers hundreds of different EC2 instance types, categorized by what they are optimized to do. They use a naming convention like \\\`t3.micro\\\` or \\\`m5.large\\\`:
- **General Purpose (T, M)**: Balanced CPU, memory, and networking. (e.g., web servers).
- **Compute Optimized (C)**: High-performance processors for compute-intensive workloads (e.g., video encoding, scientific modeling).
- **Memory Optimized (R, X)**: Massive amounts of RAM for memory-intensive workloads (e.g., in-memory databases like Redis).
- **Accelerated Computing (P, G)**: Equipped with physical GPUs for Machine Learning and 3D rendering.

## Purchasing Options

How you pay for EC2 dictates your cloud architecture:
1. **On-Demand**: Pay by the second with zero long-term commitment. Most expensive, but maximum flexibility.
2. **Reserved Instances**: Commit to a 1-year or 3-year contract for a specific instance type. Offers a massive discount (up to 72%). Best for predictable, baseline traffic.
3. **Spot Instances**: Bid on unused Amazon server capacity. Offers the absolute cheapest price (up to 90% off), but **Amazon can terminate your server with only 2 minutes of warning** if they need the capacity back. Used for batch processing and fault-tolerant workloads.

## AMIs and EBS

When launching an EC2 instance, you must configure two critical components:
- **AMI (Amazon Machine Image)**: The template that contains the software configuration (OS, application server, and applications) required to launch your instance.
- **EBS (Elastic Block Store)**: The virtual hard drive attached to your EC2 instance. If you terminate an EC2 instance, the local ephemeral storage is permanently deleted, but you can configure the EBS volume to survive.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/S3/index.mdx': `---
title: Amazon S3
description: Simple Storage Service, an object storage service offering industry-leading scalability, data availability, and security.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Amazon S3 (Simple Storage Service)" 
  category="Cloud Computing" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/b/b2/Amazon_Web_Services_Logo.svg"
>

**Amazon S3** is a massively scalable **Object Storage** service. Unlike a traditional file system (where files are organized in a hierarchy of folders) or a block store (like a hard drive), S3 stores data as independent "Objects" in flat containers called "Buckets."

<Callout icon="success" title="The 11 Nines of Durability">
  S3 is famous for its guarantee of **99.999999999% (11 nines)** of data durability. If you store 10,000,000 objects in S3, you can expect to mathematically lose exactly 1 object every 10,000 years. AWS achieves this by automatically duplicating your data across multiple physical data centers (Availability Zones) the moment you upload it.
</Callout>

## Object Storage Architecture

An S3 Object consists of three things:
1. **The Data**: The actual file (a video, a CSV file, a zipped backup), ranging from 0 bytes up to 5 Terabytes.
2. **The Key**: The unique string identifier for the object (e.g., \\\`images/profile/user123.jpg\\\`). Note: Even though it looks like a folder path, S3 has no concept of folders; it is just a flat string.
3. **Metadata**: Key-value pairs describing the object (e.g., \\\`Content-Type: image/jpeg\\\`).

## Storage Classes

S3 offers different tiers to optimize costs based on how frequently you access the data:
- **S3 Standard**: For frequently accessed data. Highest storage cost, but lowest retrieval cost.
- **S3 Standard-IA (Infrequent Access)**: For data accessed less than once a month. Cheaper storage, but you pay a fee every time you read the data.
- **S3 Glacier Flexible Retrieval**: For archiving data (like 5-year-old tax records). Extremely cheap storage, but it takes 1 to 5 hours to retrieve a file.
- **S3 Glacier Deep Archive**: The absolute cheapest storage on earth, but retrieval can take 12+ hours.

## Common Use Cases

- **Static Website Hosting**: S3 can directly host HTML, CSS, and JS files, completely eliminating the need for an EC2 web server.
- **Data Lakes**: Serving as the central repository for massive big-data analytics and machine learning training data.
- **Backup and Archiving**: Using lifecycle policies to automatically move database backups into Glacier after 30 days.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/DynamoDB/index.mdx': `---
title: Amazon DynamoDB
description: A fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Amazon DynamoDB" 
  category="Cloud Computing" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/b/b2/Amazon_Web_Services_Logo.svg"
>

**Amazon DynamoDB** is a fully managed, proprietary NoSQL database service that supports key-value and document data structures. It is famous for providing single-digit millisecond latency at literally any scale, whether you have 10 users or 100 million users.

<Callout icon="warning" title="The Trade-off of Infinite Scale">
  DynamoDB achieves its infinite scale by strictly enforcing how you query your data. It does **not** support SQL, it does **not** support \\\`JOIN\\\` operations, and complex aggregations are nearly impossible. You must design your table specifically around the exact queries your application will run (Single-Table Design).
</Callout>

## Core Concepts

- **Tables**: The highest level data container. Unlike SQL, DynamoDB tables are schemaless.
- **Items**: A single record in the table (similar to a SQL row).
- **Attributes**: The data fields within an item. Except for the Primary Key, items do not need to have the same attributes.
- **Primary Key**: The only enforced schema. It uniquely identifies every item. It can be a simple **Partition Key** (e.g., \\\`UserId\\\`) or a composite **Partition Key + Sort Key** (e.g., \\\`UserId\\\` + \\\`OrderDate\\\`).

## The Magic of the Partition Key

DynamoDB uses the **Partition Key** to physically distribute your data across thousands of hidden servers (Sharding). 
When you query the database, AWS hashes the Partition Key to instantly determine exactly which physical server holds your data. This $O(1)$ time complexity is why DynamoDB queries take 5 milliseconds regardless of whether the table is 1 Megabyte or 100 Terabytes.

## Provisioned vs. On-Demand

You can configure how you pay for read/write throughput:
1. **Provisioned**: You explicitly tell AWS "I want to be able to handle exactly 1,000 Reads Per Second." You pay for that capacity 24/7, even if nobody uses the app. (Best for predictable traffic).
2. **On-Demand (Serverless)**: You pay per individual read/write request. If the app gets zero traffic, you pay $0. If the app goes viral and hits 50,000 requests per second, DynamoDB instantly scales to handle it. (Best for unpredictable traffic).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Containers/index.mdx': `---
title: Containers
description: A standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Containers">

A **Container** is an isolated, lightweight, and portable execution environment that bundles a software application along with all of its dependencies, libraries, and configuration files.

<Callout icon="success" title="The 'It Works on My Machine' Solution">
  Before containers, a developer would write Python code on a Mac, push it to a Linux server, and the server would crash because it had the wrong version of a C library installed. 
  Containers solve this entirely. Because the container includes the exact OS libraries and dependencies the code needs, if it runs on the developer's laptop, it is mathematically guaranteed to run identically on the production server.
</Callout>

## Virtual Machines vs. Containers

To understand containers, you must understand how they differ from traditional Virtual Machines (VMs).

- **Virtual Machines**: A hypervisor allocates physical hardware to run a completely independent, full-blown "Guest Operating System" (like Windows or Ubuntu) for every single VM. This is extremely heavy. A VM might consume 2GB of RAM just to boot the OS, before running any application code.
- **Containers**: Containers do **not** contain a full operating system. Instead, all containers running on a machine share the exact same underlying Host OS Kernel. The container only holds the application code and the specific user-space binaries it needs. This makes containers incredibly lightweight. They boot in milliseconds and consume only megabytes of RAM.

## How do they work? (Linux Primitives)

Containers are essentially an illusion created using three core features of the Linux Kernel:

1. **Namespaces**: Provide isolation. They trick a process into thinking it is the only process running on the computer. A process in a container cannot see processes, network interfaces, or mount points outside of its namespace.
2. **cgroups (Control Groups)**: Provide resource limits. They prevent a single container from consuming 100% of the CPU or RAM and starving the rest of the system.
3. **Union File Systems (OverlayFS)**: Provide layered image management. They allow the container to share common base files (like the Ubuntu root filesystem) with other containers to save massive amounts of disk space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker/index.mdx': `---
title: Docker
description: The industry-standard platform that democratized containerization by providing an easy-to-use CLI and ecosystem.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Docker" 
  category="DevOps & Infrastructure" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg"
>

**Docker** is the software platform that brought container technology to the masses. While Linux containers (LXC) existed long before Docker, they were incredibly difficult to use. Docker introduced a simple CLI, a standard image format (the Dockerfile), and a central registry (Docker Hub), completely revolutionizing modern software engineering.

<Callout icon="info" title="The Docker Daemon (dockerd)">
  At the heart of the Docker platform is the **Docker Daemon**, a background service running on your host OS. When you type \\\`docker run nginx\\\` in your terminal, the Docker CLI sends a REST API request to the Daemon, which actually talks to the Linux Kernel to construct the namespaces and cgroups required to spawn the container.
</Callout>

## Images vs. Containers

Understanding Docker requires distinguishing between its two fundamental states:

- **Docker Image**: The passive, read-only template. It is a frozen snapshot of an application and its dependencies (like a CD-ROM). You build an image once.
- **Docker Container**: The active, running instance of an image. You can launch 50 identical containers simultaneously from a single image. A container adds a thin, read-write layer on top of the read-only image so the application can write temporary files.

## The Docker Registry (Docker Hub)

Docker's explosive growth was fueled by **Docker Hub**, a global, public repository of pre-built images. 
If you need a PostgreSQL database, you do not need to compile PostgreSQL from source. You simply type \\\`docker run postgres\\\`, and Docker automatically downloads the official, optimized, secure image from Docker Hub and boots it in 3 seconds.

## The Open Container Initiative (OCI)

Docker became so popular that its image format became a de facto global standard. To prevent a monopoly, the industry formed the **OCI**, extracting Docker's core container runtime (\\\`runC\\\`) and standardizing the image format. Today, tools like **Podman** or **containerd** can run "Docker images" perfectly without actually having Docker installed.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Dockerfile/index.mdx': `---
title: Dockerfile
description: A text document containing all the commands a user could call on the command line to assemble a Docker image.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dockerfile">

A **Dockerfile** is the blueprint for a container. It is a simple, declarative text file that tells the Docker Engine exactly how to construct a Docker Image, step-by-step. 

<Callout icon="success" title="Infrastructure as Code">
  The Dockerfile represents a massive leap forward in operations. Instead of a systems administrator manually typing commands into a server to configure a runtime environment, the entire environment is codified into a 10-line text file. This file is committed to Git, allowing the environment to be version-controlled, peer-reviewed, and perfectly reproduced by CI/CD pipelines.
</Callout>

## Anatomy of a Dockerfile

Every instruction in a Dockerfile adds a new "Layer" to the final image. Common instructions include:

- **\\\`FROM\\\`**: The foundation. Every Dockerfile must start with a base image (e.g., \\\`FROM node:18-alpine\\\` or \\\`FROM ubuntu:22.04\\\`).
- **\\\`WORKDIR\\\`**: Sets the working directory inside the container for all subsequent commands.
- **\\\`COPY\\\`**: Copies files from your local laptop/host machine into the container's file system. (e.g., \\\`COPY package.json .\\\`).
- **\\\`RUN\\\`**: Executes a shell command inside the container *during the build process*. Used for installing dependencies. (e.g., \\\`RUN npm install\\\`).
- **\\\`EXPOSE\\\`**: Documents which port the container will listen on. (Purely informational; it does not actually publish the port).
- **\\\`CMD\\\`**: The default command that executes *when the container starts running*. (e.g., \\\`CMD ["npm", "start"]\\\`).

## The Layer Caching System

Docker builds images extremely fast using a caching system. Each line in the Dockerfile creates a read-only cryptographic layer.
If you change line 8 of a Dockerfile, Docker perfectly caches and reuses lines 1 through 7, and only rebuilds line 8 and onwards.

### The Dependency Anti-Pattern
Because of caching, the *order* of instructions is critical. 
A common mistake is copying the entire source code *before* installing dependencies:
\\\`\\\`\\\`dockerfile
COPY . .
RUN npm install
\\\`\\\`\\\`
If you change a single CSS file in your source code, the \\\`COPY\\\` layer breaks the cache, forcing \\\`npm install\\\` to re-download 500MB of dependencies every single time you build.

**The Correct Way:**
\\\`\\\`\\\`dockerfile
COPY package.json .
RUN npm install
COPY . .
\\\`\\\`\\\`
Now, the \\\`npm install\\\` cache is only broken if the \\\`package.json\\\` file actually changes!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker Compose/index.mdx': `---
title: Docker Compose
description: A tool for defining and running multi-container Docker applications using a single YAML file.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Docker Compose" 
  category="DevOps & Infrastructure" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg"
>

**Docker Compose** is a powerful orchestration tool designed for local development. While the standard \\\`docker run\\\` command is great for spinning up a single container, modern applications usually consist of multiple interacting services (e.g., a React frontend, a Node.js API, a PostgreSQL database, and a Redis cache).

Running four massive \\\`docker run\\\` commands with complex port-mapping and networking flags is tedious. Docker Compose allows you to define this entire multi-container architecture in a single, declarative \\\`docker-compose.yml\\\` file.

<Callout icon="success" title="The Magic of 'docker compose up'">
  Once you define your architecture in the YAML file, a developer simply clones the repository and types \\\`docker compose up\\\`. Compose will automatically build the images, create an isolated virtual network, boot all four containers in the correct order, and stream their combined logs to the terminal.
</Callout>

## The \\\`docker-compose.yml\\\` File

A standard Compose file defines **Services**, **Networks**, and **Volumes**:

\\\`\\\`\\\`yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb

  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass

volumes:
  pgdata:
\\\`\\\`\\\`

## Internal Networking and DNS

The most powerful feature of Docker Compose is its automatic internal DNS. 
Notice in the YAML above that the \\\`api\\\` service connects to the database using the hostname \\\`@db\\\`. 

When Compose spins up the environment, it creates a private bridge network. The Node.js API does not need to know the random IP address assigned to the PostgreSQL container. It simply makes a request to \\\`http://db:5432\\\`, and Docker's internal DNS server perfectly resolves it to the correct container.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Kubernetes architecture/index.mdx': `---
title: Kubernetes Architecture
description: The high-level master-worker architecture that powers the Kubernetes container orchestration engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kubernetes Architecture">

**Kubernetes (K8s)** is a distributed system designed to automate the deployment, scaling, and management of containerized applications across thousands of physical servers.

To achieve this, Kubernetes uses a strict **Client-Server (Master-Worker)** architecture. The cluster is divided into two distinct components: the **Control Plane** (the brains) and the **Worker Nodes** (the muscle).

<Callout icon="info" title="Declarative State">
  The fundamental philosophy of Kubernetes is **Declarative State**. You do not tell K8s *how* to do something (e.g., "start 3 containers"). You tell K8s the *Desired State* (e.g., "I want 3 containers to exist at all times"). K8s constantly monitors the cluster, and if a container crashes, it automatically intervenes to return the cluster to the Desired State.
</Callout>

## The Control Plane (The Master)

The Control Plane makes global decisions about the cluster (like scheduling) and detects/responds to cluster events. It consists of four core components:

1. **kube-apiserver**: The central nervous system. Every single command you run (like \\\`kubectl get pods\\\`) and every internal component communication goes through this REST API. It is the only component that talks to the database.
2. **etcd**: The brain's memory. A highly-available, distributed key-value store that holds the absolute truth of the cluster's state (what is supposed to be running vs. what is actually running).
3. **kube-scheduler**: The dispatcher. It watches for newly created Pods that have no assigned node, and mathematically selects the optimal Worker Node for them to run on (based on CPU/RAM availability).
4. **kube-controller-manager**: The enforcer. It runs continuous background loops comparing the Desired State to the Actual State, and takes action if they drift.

## The Worker Nodes

The Worker Nodes are the generic Linux servers that actually run your application containers. Each node runs three components:

1. **kubelet**: The captain of the node. It is an agent that communicates with the Control Plane. It ensures that the containers described in the Pod specifications are actually running and healthy.
2. **kube-proxy**: The network router. It maintains network rules on the host allowing network communication to your Pods from inside or outside the cluster.
3. **Container Runtime**: The actual software that pulls the image and runs the container (e.g., containerd or CRI-O). K8s does not run containers directly!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Pods/index.mdx': `---
title: Kubernetes Pods
description: The smallest and simplest deployable computing object that you can create and manage in Kubernetes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pods">

A **Pod** is the atomic, fundamental building block of Kubernetes. K8s does not directly deploy or manage raw "Containers." Instead, it wraps containers into a higher-level abstraction called a Pod.

<Callout icon="warning" title="Ephemeral by Design">
  Pods are mortal. They are born, they run, and they die. **A Pod is never "restarted".** If the server a Pod is running on crashes, that Pod is permanently destroyed. K8s will spin up a brand new, identical Pod on a different server to replace it. Never store permanent data inside a Pod.
</Callout>

## Why Pods? (The Sidecar Pattern)

A Pod usually contains exactly one container (e.g., your Node.js app). 
However, the reason Pods exist is that they can hold **multiple containers**. 

When multiple containers are placed inside the same Pod, they are mathematically guaranteed to be scheduled on the exact same physical Worker Node. Because of this, they share the exact same IP address (\\\`localhost\\\`), the exact same port space, and can share storage volumes.

This enables the **Sidecar Pattern**. 
- *Container 1*: The main application web server.
- *Container 2 (Sidecar)*: A tiny logging agent that tails the web server's logs and ships them to Datadog. 
They are deployed as a single atomic unit.

## Networking inside a Pod

Because all containers in a Pod share the same network namespace:
- They can communicate with each other using \\\`localhost\\\`. (e.g., The Node app can reach a sidecar Redis cache at \\\`localhost:6379\\\`).
- They cannot bind to the same port. (If Container 1 listens on 8080, Container 2 cannot listen on 8080).

## Pod Lifecycle

- **Pending**: The API accepted the Pod, but it is waiting to be scheduled onto a Node or waiting for the image to download.
- **Running**: The Pod is bound to a node, and all containers are running.
- **Succeeded / Failed**: The Pod finished its task (used in K8s Jobs).
- **CrashLoopBackOff**: The container inside the Pod is crashing immediately upon startup, so K8s is pausing before trying to start it again.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Deployments/index.mdx': `---
title: Kubernetes Deployments
description: A higher-level API object that manages the declarative updates, scaling, and self-healing of Pods.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deployments">

While a Pod is the fundamental unit of Kubernetes, you almost never create a Pod manually. Pods are mortal; if they crash, they are gone forever.

To achieve high availability and self-healing, you wrap your Pods in a **Deployment**. A Deployment is a Control Plane controller that ensures a specified number of identical Pods (replicas) are running at all times.

<Callout icon="success" title="The Self-Healing Promise">
  If you tell a Deployment "I want 3 replicas of my Nginx Pod", it creates them. If a physical Worker Node explodes and takes down 1 of those Pods, the Deployment controller detects that Current State (2) does not match Desired State (3). It will instantly command the Scheduler to spin up a new Pod on a healthy node to replace it.
</Callout>

## ReplicaSets (The Middleman)

Technically, a Deployment does not manage Pods directly. It manages a **ReplicaSet**, which in turn manages the Pods. 
When you update a Deployment to use a new Docker image tag (e.g., \\\`v2\\\`), the Deployment creates a *new* ReplicaSet for \\\`v2\\\`, and slowly scales the old \\\`v1\\\` ReplicaSet down to zero.

## Zero-Downtime Rollouts

The primary reason to use Deployments is for safe, automated version updates. 

When you deploy a new version of your application, the Deployment executes a **Rolling Update**:
1. It creates 1 new Pod with version 2.
2. It waits for the new Pod to pass its Readiness Probes (confirming it isn't crashing).
3. Once healthy, it deletes 1 old Pod running version 1.
4. It repeats this process until all Pods are running version 2. 

If version 2 contains a catastrophic bug and immediately crashes, the Deployment halts the rollout, leaving the remaining version 1 Pods online to serve traffic, ensuring zero downtime for your users.

## Rollbacks

Because the Deployment controller keeps the old ReplicaSets around (scaled to 0), if a deployment goes wrong, you can instantly rollback to the previous version with a single command: \\\`kubectl rollout undo deployment/my-app\\\`.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Services/index.mdx': `---
title: Kubernetes Services
description: An abstract way to expose an application running on a set of Pods as a single, stable network service.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Services">

Because Kubernetes Pods are mortal and frequently destroyed/recreated by Deployments, **their IP addresses are completely unpredictable**. 
If your Frontend Pod needs to talk to your Backend API Pod, it cannot hardcode the API's IP address, because that IP address will change tomorrow.

A **Service** solves this by providing a permanent, stable IP address and DNS name that acts as an internal load balancer in front of a fluctuating group of Pods.

<Callout icon="info" title="Labels and Selectors">
  A Service does not point to specific Pods. It uses a **Label Selector**. 
  You configure the Service to route traffic to any Pod that has the label \\\`app=backend\\\`. As Deployments create and destroy Pods with that label, the Service automatically updates its internal routing table in real-time.
</Callout>

## Types of Services

Kubernetes offers different Service types depending on how you want to expose your application:

1. **ClusterIP (Default)**: Exposes the Service on a private IP address internal to the cluster. The Service is only reachable by other Pods *inside* the K8s cluster. Perfect for private databases or backend microservices.
2. **NodePort**: Opens a specific port (between 30000-32767) on every single physical Worker Node in the cluster. If you hit any Worker Node's IP on that port, it routes into the Service. (Rarely used directly in production).
3. **LoadBalancer**: Triggers your cloud provider (AWS/GCP) to provision a physical, external HTTP Load Balancer outside the cluster, pointing user traffic into the Service. (Expensive, as every LoadBalancer Service creates a new AWS ALB).

## CoreDNS Integration

When you create a Service named \\\`my-database\\\`, Kubernetes automatically registers a DNS record in the cluster's internal DNS server (CoreDNS). 
Other Pods in the same namespace can literally make HTTP requests to \\\`http://my-database:5432\\\`, and K8s will perfectly load-balance the request to one of the healthy database Pods.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Ingress/index.mdx': `---
title: Kubernetes Ingress
description: An API object that manages external access to the services in a cluster, typically HTTP and HTTPS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ingress">

While a \\\`LoadBalancer\\\` Service can expose your application to the internet, it is highly inefficient. If you have 10 microservices, creating 10 \\\`LoadBalancer\\\` Services will force AWS to create 10 physical Load Balancers, billing you hundreds of dollars a month.

An **Ingress** provides a single, smart entry point into your cluster. It acts as a Layer 7 HTTP router. You only pay for **one** cloud load balancer, and the Ingress intelligently routes the traffic to different internal K8s Services based on the URL path or domain name.

<Callout icon="success" title="Path-Based Routing">
  With an Ingress, you can configure:
  - \\\`myapp.com/api\\\` $\\rightarrow$ Routes to the \\\`backend-service\\\`
  - \\\`myapp.com/shop\\\` $\\rightarrow$ Routes to the \\\`ecommerce-service\\\`
  - \\\`myapp.com/\\\` $\\rightarrow$ Routes to the \\\`frontend-service\\\`
</Callout>

## Ingress Controllers

The \\\`Ingress\\\` API object is just a piece of configuration (a set of rules). By itself, it does absolutely nothing. 
To make it work, you must install an **Ingress Controller** into your cluster.

An Ingress Controller is an actual application (usually an NGINX or HAProxy pod) that reads your Ingress rules and configures its own internal proxy routing. When internet traffic hits the single Cloud Load Balancer, it passes to the NGINX Ingress Controller pod, which inspects the HTTP headers and proxies the request to the correct internal Service.

## TLS Termination

Ingress is the standard location to handle HTTPS and SSL certificates. 
Instead of configuring SSL inside your Node.js or Java application containers, you attach the SSL certificate (often generated automatically by \\\`cert-manager\\\` and Let's Encrypt) directly to the Ingress. 
The Ingress Controller decrypts the HTTPS traffic at the edge of the cluster, and forwards standard, unencrypted HTTP traffic to your Pods (saving CPU cycles on your application).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/ConfigMaps/index.mdx': `---
title: ConfigMaps
description: An API object used to store non-confidential data in key-value pairs, decoupling environment configuration from container images.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ConfigMaps">

A core tenet of modern software engineering (The Twelve-Factor App) is that you should separate configuration from code. You should not hardcode environment variables, URLs, or database connection strings into your Docker image. 

In Kubernetes, **ConfigMaps** are the mechanism for injecting this configuration data into your Pods at runtime.

<Callout icon="info" title="The Power of Portability">
  By keeping the configuration outside the image, you can build a single Docker Image for your application (\\\`myapp:v1\\\`). You can deploy that exact same image to the Staging cluster (injecting a Staging ConfigMap) and the Production cluster (injecting a Production ConfigMap), ensuring perfect parity between environments.
</Callout>

## How to use a ConfigMap

A ConfigMap is a simple YAML object containing key-value pairs or entire configuration files:

\\\`\\\`\\\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  LOG_LEVEL: "debug"
  CACHE_ENDPOINT: "redis-service:6379"
\\\`\\\`\\\`

You can inject this data into a Pod in two ways:

1. **Environment Variables**: You can configure the Pod's Deployment YAML to map the \\\`LOG_LEVEL\\\` key directly into an environment variable inside the container. The Node.js app can then access it via \\\`process.env.LOG_LEVEL\\\`.
2. **Volume Mounts**: You can mount the entire ConfigMap as a physical file inside the container's file system. (e.g., mounting an \\\`nginx.conf\\\` text file directly into \\\`/etc/nginx/conf.d/\\\`). If you update the ConfigMap in Kubernetes, the physical file inside the running container is automatically updated!

## Limitations

ConfigMaps are stored as pure, unencrypted plaintext inside the Kubernetes \\\`etcd\\\` database. **You must never store passwords, API keys, or database credentials in a ConfigMap.** For sensitive data, you must use Kubernetes **Secrets**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Secrets/index.mdx': `---
title: Kubernetes Secrets
description: An API object designed to store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kubernetes Secrets">

A **Secret** functions almost identically to a ConfigMap—it injects configuration into Pods via Environment Variables or Volume Mounts. However, Secrets are explicitly designed for handling sensitive data that you do not want exposed in application logs or standard YAML definitions.

<Callout icon="warning" title="Base64 is NOT Encryption">
  A massive misconception among beginners is that Kubernetes Secrets are encrypted by default. **They are not.**
  When you create a Secret via a YAML file, the values are merely \\\`base64\\\` encoded (which can be instantly decoded by anyone). The primary purpose of this encoding is to allow the safe transmission of binary data (like SSH keys), not to provide cryptographic security.
</Callout>

## Security Mechanisms

While the YAML representation is just base64 encoded, Kubernetes does provide actual security mechanisms for Secrets under the hood:

1. **etcd Encryption at Rest**: You can (and should) configure the Kubernetes API server to cryptographically encrypt Secret data before it is written to the \\\`etcd\\\` database on the hard drive.
2. **In-Memory Storage**: When a Secret is mounted into a Pod as a Volume, Kubernetes mounts it using \\\`tmpfs\\\` (a RAM-backed file system). The secret is never actually written to the physical hard drive of the Worker Node, ensuring it disappears instantly if the node loses power.
3. **RBAC Protection**: Kubernetes Role-Based Access Control (RBAC) allows you to grant a developer permission to view ConfigMaps, but deny them permission to view Secrets.

## External Secret Managers

For enterprise-grade security, storing Secrets natively in Kubernetes is often considered insufficient. Best practices dictate using external secret management systems like **HashiCorp Vault**, **AWS Secrets Manager**, or **Azure Key Vault**. 

Tools like the \\\`External Secrets Operator\\\` can seamlessly sync credentials from AWS Secrets Manager directly into native Kubernetes Secrets in real-time, ensuring credentials are mathematically secured, rotated, and audited.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
