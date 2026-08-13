import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Containers/index.mdx': `---
title: Containers (Linux Concepts)
description: "Lightweight, standalone, executable packages of software that include everything needed to run an application."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Containers (Linux Concepts)">

Before Docker existed, **Containers** were simply a set of native Linux kernel features designed to isolate processes from one another. A container is not a virtual machine; it is just a standard Linux process that has been tricked into thinking it is the only process running on the computer.

## 1. The Core Kernel Features
Linux containers are built primarily on two foundational kernel technologies:

### Namespaces (Isolation)
Namespaces restrict what a process can *see*.
- **PID Namespace**: The process thinks it is PID 1, and cannot see any other processes on the host machine.
- **NET Namespace**: The process gets its own virtual network stack, its own localhost, and its own IP address.
- **MNT Namespace**: The process gets its own isolated file system root (TICK1/TICK1), unable to access the host's actual hard drive.

### cgroups (Resource Limiting)
Control Groups (cgroups) restrict what a process can *use*.
- If a process has a memory leak, cgroups ensure it can only consume a maximum of 512MB of RAM before the kernel kills it, preventing it from crashing the entire host server.
- They can also limit CPU cycles, disk I/O, and network bandwidth.

## 2. Virtual Machines vs Containers

<ComparisonTable 
  headers={['Feature', 'Virtual Machines (VMs)', 'Containers']} 
  rows={[
    ['Architecture', 'Hypervisor running multiple full Guest OS kernels.', 'A single Host OS kernel shared among all containers.'],
    ['Startup Time', 'Minutes (must boot the OS).', 'Milliseconds (just starting a process).'],
    ['Size', 'Gigabytes (contains full OS).', 'Megabytes (contains only dependencies).'],
    ['Isolation', 'Hardware-level isolation (very secure).', 'Process-level isolation (less secure, vulnerable to kernel exploits).']
  ]} 
/>

<Callout icon="info" title="The Container Illusion">
Because containers share the host's kernel, you cannot run a Windows container on a Linux host (without using a hidden Virtual Machine layer in between, which is exactly what Docker Desktop does on Mac/Windows).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker/index.mdx': `---
title: Docker
description: "The platform and toolset that popularized containerization by providing a standard way to build, package, and distribute containers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Docker">

While Linux had container features (LXC) for years, they were extremely difficult to use. In 2013, **Docker** revolutionized the software industry by introducing a user-friendly abstraction layer, a standard image format, and a centralized registry (Docker Hub).

Docker solved the infamous *"It works on my machine"* problem. By packaging the application code, the runtime (Node.js/Python), and the exact system dependencies (OpenSSL, glibc) into a single artifact, Docker guaranteed the app would run identically on a developer's laptop, a testing server, and production.

## 1. The Docker Architecture
Docker uses a client-server architecture:
- **Docker CLI**: The command-line tool developers interact with (TICK1docker runTICK1, TICK1docker buildTICK1).
- **Docker Daemon (dockerd)**: The background service running on the host machine that actually does the heavy lifting of building, running, and monitoring containers.
- **Containerd**: The low-level runtime (originally part of Docker, now an independent CNCF project) that manages the actual container lifecycle.

## 2. The OCI Standard
Docker became so dominant that the industry feared a monopoly. In response, Docker helped create the **Open Container Initiative (OCI)** to standardize how container images are built and executed.

Today, a "Docker image" is actually an "OCI image". This means you don't even need Docker to run them—you can use alternative OCI-compliant tools like **Podman** or **Buildah**.

<Callout icon="tip" title="Docker Desktop vs Docker Engine">
**Docker Engine** is the free, open-source daemon that runs natively on Linux. **Docker Desktop** is a proprietary GUI application for Mac and Windows that spins up a hidden Linux VM to run the Docker Engine.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Dockerfile/index.mdx': `---
title: Dockerfile
description: "A text document containing all the commands a user could call on the command line to assemble an image."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Dockerfile">

A **Dockerfile** is the blueprint for a container. It is a simple script consisting of specialized instructions that the Docker daemon executes sequentially to build a Docker Image.

## 1. Common Instructions

<ComparisonTable 
  headers={['Instruction', 'Purpose', 'Example']} 
  rows={[
    ['\`FROM\`', 'Sets the base image. Must be the first instruction.', '\`FROM node:18-alpine\`'],
    ['\`WORKDIR\`', 'Sets the working directory inside the container for subsequent instructions.', '\`WORKDIR /app\`'],
    ['\`COPY\`', 'Copies files from the host machine into the container.', '\`COPY package.json .\`'],
    ['\`RUN\`', 'Executes a command during the **build** phase (creating a new layer).', '\`RUN npm install\`'],
    ['\`ENV\`', 'Sets environment variables.', '\`ENV NODE_ENV=production\`'],
    ['\`EXPOSE\`', 'Documents which ports the application listens on (does not actually publish them).', '\`EXPOSE 8080\`'],
    ['\`CMD\`', 'Specifies the default command to execute when the container **starts**.', '\`CMD ["npm", "start"]\`']
  ]} 
/>

## 2. Example Dockerfile (Node.js)

${TICK3}dockerfile
# 1. Base Image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy dependencies first (for caching)
COPY package*.json ./
RUN npm ci --only=production

# 4. Copy application source code
COPY . .

# 5. Drop root privileges for security
USER node

# 6. Start the application
EXPOSE 3000
CMD ["node", "server.js"]
${TICK3}

<Callout icon="tip" title="CMD vs ENTRYPOINT">
TICK1CMDTICK1 provides default arguments that can be easily overridden from the CLI (e.g., TICK1docker run myapp bashTICK1 replaces the CMD). TICK1ENTRYPOINTTICK1 sets the primary executable that *cannot* be easily overridden, and any extra CLI arguments are passed to it instead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker images/index.mdx': `---
title: Docker Images & Layers
description: "Read-only templates containing the instructions for creating a Docker container, built using a stacked layer architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Docker Images & Layers">

A **Docker Image** is an immutable, read-only snapshot of an application and its dependencies. When you run an image, it becomes a **Container**. You can think of an Image as a Class, and a Container as an Instance of that Class.

## 1. The Union File System (Layers)
Images are not single monolithic files; they are built from a stack of independent **Layers**. 
Every time a TICK1RUNTICK1, TICK1COPYTICK1, or TICK1ADDTICK1 command is executed in a Dockerfile, Docker creates a new layer on top of the previous ones.

These layers use a **Union File System**. If Layer 1 contains TICK1file.txtTICK1, and Layer 2 modifies TICK1file.txtTICK1, Layer 2 doesn't overwrite Layer 1. It simply places the modified file on top, hiding the old version.

## 2. The Layer Caching Mechanism
Because building images can be slow, Docker heavily relies on layer caching.
If you rebuild an image, Docker checks each instruction. If the instruction and the files it references haven't changed, Docker instantly reuses the cached layer instead of rebuilding it.

**Crucial optimization rule**: Cache invalidation cascades downwards. If Layer 3 changes, Docker must rebuild Layer 3, and *every single layer after it* (4, 5, 6...).

This is why you always copy TICK1package.jsonTICK1 and run TICK1npm installTICK1 *before* copying your application source code. Your source code changes constantly (invalidating the cache), but your dependencies rarely change.

## 3. Containers: The Writable Layer
Because images are read-only, how does a container write a log file? 
When a container starts, Docker slaps a very thin, ephemeral **Writable Layer** on top of the read-only image stack. Any file modifications happen in this writable layer. When the container is deleted, the writable layer is instantly destroyed, and all data inside it is lost.

<Callout icon="warning" title="Bloated Images">
If you download a 100MB file in a TICK1RUNTICK1 command, and then delete it in a subsequent TICK1RUNTICK1 command, your final image is still 100MB larger! The file was permanently baked into the first layer. You must download and delete temporary files within the *same* TICK1RUNTICK1 command using TICK1&&TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Volumes/index.mdx': `---
title: Docker Volumes
description: "The preferred mechanism for persisting data generated by and used by Docker containers, bypassing the ephemeral writable layer."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Docker Volumes">

By default, all files created inside a container are stored on a thin, ephemeral writable layer. If the container crashes or is removed, that data is permanently lost. This is acceptable for stateless web servers, but catastrophic for databases.

To persist data permanently, you must mount storage from the host machine into the container. Docker provides two primary ways to do this.

## 1. Bind Mounts
A **Bind Mount** directly maps a specific file or directory from the host machine's filesystem (e.g., TICK1/home/user/my-codeTICK1) into the container (e.g., TICK1/appTICK1).
- **Primary Use Case**: Local development. You bind mount your source code directory into the container. When you hit "Save" in your IDE on the host, the container instantly sees the changes and triggers a hot-reload.
- **Drawback**: Highly dependent on the host machine's specific directory structure and OS permissions.

## 2. Docker Volumes
A **Volume** is a directory managed entirely by Docker itself (stored somewhere like TICK1/var/lib/docker/volumes/TICK1). You don't care *where* it is on the host; you just ask Docker to create it.
- **Primary Use Case**: Database persistence (PostgreSQL data directory) or shared storage between multiple containers.
- **Advantage**: Volumes are fully isolated from the host OS, can be easily backed up, and can even be backed by cloud providers (e.g., mounting an AWS EFS drive directly as a Docker volume).

<ComparisonTable 
  headers={['Metric', 'Bind Mounts', 'Docker Volumes']} 
  rows={[
    ['Managed By', 'The Host OS / User.', 'Docker Daemon.'],
    ['Host Path Dependency', 'Requires exact absolute paths (TICK1/users/bob/dataTICK1).', 'Completely abstracted (TICK1my-db-dataTICK1).'],
    ['Performance', 'Can be slow on Mac/Windows due to VM file syncing.', 'Extremely fast (native Linux performance).'],
    ['Best For', 'Live-reloading source code during dev.', 'Persisting production database files.']
  ]} 
/>

<Callout icon="tip" title="Anonymous Volumes">
If a Dockerfile has a TICK1VOLUME /var/lib/mysqlTICK1 instruction, and you run the container without specifying a mount, Docker automatically creates an "Anonymous Volume" with a random hash name to ensure the data is safe.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Kubernetes architecture/index.mdx': `---
title: Kubernetes Architecture
description: "The high-level architecture of Kubernetes, separating the Control Plane (the brain) from the Worker Nodes (the muscles)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Kubernetes Architecture">

**Kubernetes (K8s)** is an open-source container orchestration platform. While Docker allows you to run a container on one machine, K8s allows you to manage thousands of containers across hundreds of machines, handling automated rollouts, self-healing, scaling, and load balancing.

Kubernetes operates on a declarative model: you write a YAML file describing your *Desired State* (e.g., "I want 3 instances of my web app running"), and K8s continuously monitors the *Actual State*, making changes until the two match.

## 1. The Control Plane (The Brain)
The Control Plane is the collection of services that manage the cluster, make global decisions, and respond to events.

- **kube-apiserver**: The front door. Every single command (from developers using TICK1kubectlTICK1 or internal components) goes through the API server.
- **etcd**: The highly-available, distributed key-value store. It is the single source of truth for the cluster, storing the entire state and all YAML configurations.
- **kube-scheduler**: Watches for newly created Pods that have no node assigned, and selects the most optimal Worker Node for them to run on based on CPU/Memory constraints.
- **kube-controller-manager**: Runs various controllers in the background. For example, if a node crashes, the Node Controller notices and the ReplicaSet controller spins up replacement Pods.

## 2. The Worker Nodes (The Muscles)
These are the actual servers (VMs or bare metal) where your application containers run.

- **kubelet**: The "captain" of the node. It communicates with the control plane, ensuring that the containers described by the API server are actually running and healthy.
- **kube-proxy**: Manages network routing, maintaining network rules on the host to allow communication to the Pods from inside or outside the cluster.
- **Container Runtime**: The actual software that runs the containers (e.g., **containerd** or **CRI-O**). Docker is no longer directly supported as a runtime in modern K8s.

<Callout icon="info" title="Managed Kubernetes">
Because the Control Plane (specifically etcd) is incredibly difficult to run and maintain in a highly-available way, 90% of companies use Managed Kubernetes services like **AWS EKS**, **Google GKE**, or **Azure AKS**, where the cloud provider completely hides and manages the Control Plane for you.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Pods/index.mdx': `---
title: Kubernetes Pods
description: "The smallest and simplest Kubernetes object. A Pod represents a set of running containers on your cluster."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Kubernetes Pods">

In Kubernetes, you do not deploy containers directly. Instead, you deploy **Pods**. A Pod is the smallest deployable atomic unit in the K8s ecosystem. 

A Pod is a logical wrapper that encapsulates one or more containers, storage resources, a unique network IP, and options that govern how the container(s) should run.

## 1. One-Container vs Multi-Container Pods
- **One Container per Pod (Most Common)**: The standard deployment model. One Pod runs one instance of your Node.js API. If you need to scale, you don't add more containers to the Pod; you add more Pods to the cluster.
- **Multi-Container Pods (The Sidecar Pattern)**: Sometimes, two processes are so tightly coupled they must run on the exact same physical machine. For example, a main web server container, and a "sidecar" container that pulls the web server's log files and forwards them to Datadog.

## 2. Pod Networking and Storage
Because containers inside a single Pod share the exact same Linux network namespace:
- They can communicate with each other using TICK1localhostTICK1.
- They share the exact same IP address.
- They can easily share Volume mounts (e.g., Container A writes to a shared directory, Container B reads from it).

## 3. The Ephemeral Nature of Pods
**Pods are mortal.** They are born, they run, and they die. 
If a node crashes, the Pods on that node die. K8s does *not* resurrect the dead Pods; instead, higher-level controllers (like Deployments) notice the missing Pods and create brand new replacements on a healthy node.

Because Pods are ephemeral:
1. You should never store state directly on a Pod's local file system.
2. You should never rely on a Pod's specific IP address, because the replacement Pod will have a different IP (this is why you use K8s **Services**).

<Callout icon="warning" title="Never deploy naked Pods">
You should almost never run TICK1kubectl runTICK1 or deploy a raw TICK1kind: PodTICK1 YAML file in production. If a naked Pod crashes, it is gone forever. You should always use a **Deployment** or **StatefulSet** to manage your Pods.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Deployments/index.mdx': `---
title: Kubernetes Deployments
description: "A higher-level K8s controller that manages the creation, scaling, and rolling updates of replicated Pods."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Kubernetes Deployments">

Because individual Pods are ephemeral and prone to failure, we use **Deployments** to manage them. A Deployment provides declarative updates for Pods and ReplicaSets. You describe the desired state in the Deployment, and the controller changes the actual state to match it at a controlled rate.

## 1. The ReplicaSet Relationship
Technically, a Deployment doesn't manage Pods directly. 
1. The **Deployment** manages a **ReplicaSet**.
2. The **ReplicaSet** is a controller whose sole job is to ensure that a specified number of Pod replicas (e.g., 3) are running at any given time. If a node dies and a Pod is lost, the ReplicaSet instantly spins up a new one to get back to 3.

## 2. Rolling Updates
The primary reason we use Deployments instead of raw ReplicaSets is for Zero-Downtime deployments. 

When you update a Deployment to use a new Docker image tag (e.g., TICK1v2.0TICK1):
1. The Deployment creates a *new* ReplicaSet for TICK1v2.0TICK1.
2. It scales the new ReplicaSet up by 1 Pod.
3. Once the new Pod is healthy (passing Readiness Probes), it scales the old TICK1v1.0TICK1 ReplicaSet down by 1 Pod.
4. It repeats this process until the old ReplicaSet is at 0 and the new one is at full capacity. Users never experience downtime.

## 3. Deployment Rollbacks
Because the Deployment keeps the old ReplicaSet around (just scaled to 0), rolling back a bad release is instant. If TICK1v2.0TICK1 crashes in production, you issue a TICK1kubectl rollout undoTICK1 command. K8s simply scales the TICK1v1.0TICK1 ReplicaSet back up and scales TICK1v2.0TICK1 to 0.

<ComparisonTable 
  headers={['Controller', 'Best For', 'Characteristics']} 
  rows={[
    ['Deployment', 'Stateless Web Apps / APIs.', 'Pods are interchangeable. No persistent identity.'],
    ['StatefulSet', 'Databases (Kafka, PostgreSQL).', 'Pods have sticky, sequential IDs (db-0, db-1) and persistent storage attached.'],
    ['DaemonSet', 'Logging agents, Node monitoring.', 'Ensures exactly 1 Pod runs on every single node in the cluster.']
  ]} 
/>

<Callout icon="tip" title="Self-Healing">
The combination of a Deployment and a ReplicaSet is the core of Kubernetes' famous "self-healing" capability. The orchestrator constantly runs a reconciliation loop, comparing your YAML file to reality and fixing any discrepancies.
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
