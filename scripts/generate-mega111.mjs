import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Travis CI/index.mdx': `---
title: Travis CI
description: A hosted, distributed continuous integration service historically foundational to the open-source GitHub ecosystem, automating testing and deployments through simple YAML configurations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Travis CI"
  subtitle="The Open-Source CI Pioneer"
  tags={['DevOps', 'CI/CD', 'Open Source', 'Legacy']}
>

Before GitHub natively built GitHub Actions, Travis CI was the absolute standard for open-source continuous integration, mathematically proving that code was healthy before it could be merged.

## 1. The Open-Source Standard
In the 2010s, nearly every major open-source repository on GitHub featured a green TICK1build: passingTICK1 Travis CI badge in its README. 
Travis was revolutionary because it offered free, massive mathematical compute power to open-source projects. A developer simply dropped a TICK1.travis.ymlTICK1 file into their repository root. When a PR was opened, Travis automatically spun up a pristine Linux container, executed the test suite, and mathematically reported the exit code directly back to the GitHub PR interface.

## 2. The Migration to GitHub Actions
Travis CI faced a mathematical decline following its acquisition by a private equity firm, which subsequently restricted the free tier for open-source projects. 
Simultaneously, GitHub launched **GitHub Actions**, deeply integrating CI/CD natively into the platform for free. The open-source community executed a massive mathematical migration away from Travis CI, though it remains in use in specific legacy enterprise environments.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Buildah/index.mdx': `---
title: Buildah
description: A command-line tool developed by Red Hat that facilitates building Open Container Initiative (OCI) compatible images without requiring a full Docker daemon to be running.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Buildah"
  subtitle="Daemonless Container Building"
  tags={['Containers', 'Red Hat', 'Security', 'Build']}
>

Historically, if a CI/CD server needed to build a Docker container, it required the Docker Daemon to be running. The Docker Daemon runs as root, presenting a massive, mathematical security vulnerability (often called "Docker-in-Docker" privilege escalation).

## 1. Daemonless Architecture
Buildah completely removes the mathematical necessity of the daemon. 
It is a simple, standalone executable that mathematically constructs OCI-compliant container images (which are physically identical to Docker images) directly from the filesystem. Because there is no background daemon running as root, Buildah can be executed by a standard, unprivileged user.

## 2. Shell Script Integration
Unlike Docker, which strictly requires a TICK1DockerfileTICK1 to mathematically define the image layers, Buildah can build images interactively via bash scripts.
You can use TICK1buildah runTICK1 to mount a raw container filesystem, use standard Linux tools (like TICK1aptTICK1 or TICK1makeTICK1) directly against that mount, and then mathematically seal it into a final image. This provides extreme low-level control over the exact bytes included in the final production binary.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/cgroups/index.mdx': `---
title: Control Groups (cgroups)
description: A fundamental Linux kernel feature that mathematically limits, accounts for, and isolates the physical resource usage (CPU, memory, disk I/O, network) of a collection of processes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Control Groups (cgroups)"
  subtitle="Mathematical Resource Limiting"
  tags={['Linux', 'Kernel', 'Containers', 'Security']}
>

If you run two Node.js applications on a standard Linux server, and App A has a memory leak, it will mathematically consume 100% of the server's RAM, causing the kernel to forcefully kill App B. Cgroups prevent this mathematical tragedy.

## 1. The Resource Sandbox
Cgroups (originally developed by Google) are one of the two foundational technologies behind all containers (the other being Namespaces).
When a container starts, the container engine uses cgroups to mathematically place a hard ceiling on its physical resources. You configure a cgroup: *"This specific process tree is mathematically forbidden from utilizing more than 512MB of RAM and 0.5 CPU cores."*

## 2. OOM Killer and Quality of Service
If the containerized application attempts to allocate 513MB of RAM, the Linux kernel's cgroup subsystem mathematically intercepts the syscall. 
The kernel instantly triggers the **OOM (Out of Memory) Killer** specifically for that cgroup, killing the offending container but leaving the rest of the host system (and other containers) perfectly stable. This mathematical resource isolation is the exact mechanism that allows Kubernetes to safely pack 50 independent applications onto a single physical server without interference.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/containerd/index.mdx': `---
title: containerd
description: An industry-standard, lightweight container runtime designed to mathematically manage the complete container lifecycle of its host system, acting as the core engine behind modern Kubernetes and Docker.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="containerd"
  subtitle="The Core Container Engine"
  tags={['Containers', 'Kubernetes', 'Runtime', 'Infrastructure']}
>

In the early days, Docker was a massive monolith that handled building images, networking, and running containers. Over time, the industry mathematically demanded that this monolith be broken into smaller, standardized pieces.

## 1. The Extraction from Docker
Containerd (originally part of Docker) was extracted and donated to the Cloud Native Computing Foundation (CNCF).
It is a highly focused daemon. It does not know how to build a Dockerfile. It does not have a user-friendly CLI. Its only mathematical purpose is to:
1. Download OCI images from a registry.
2. Unpack them into a filesystem.
3. Call the low-level TICK1runcTICK1 binary to start the process using Linux cgroups and namespaces.

## 2. Kubernetes Integration (CRI)
Kubernetes needed a way to run containers without the massive overhead of the full Docker engine.
Containerd implements the **Container Runtime Interface (CRI)**, a mathematical API standard defined by Kubernetes. When Kubernetes decides to start a pod on a node, the Kubelet communicates directly with containerd via gRPC. Containerd spins up the container. This mathematically streamlined architecture is why Kubernetes formally deprecated Docker as its underlying runtime in favor of containerd.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/CRI-O/index.mdx': `---
title: CRI-O
description: A lightweight, specialized open-source container runtime mathematically engineered exclusively for Kubernetes, acting as a minimalist bridge between the Kubelet and OCI-compatible runtimes.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="CRI-O"
  subtitle="The Kubernetes-Exclusive Runtime"
  tags={['Containers', 'Kubernetes', 'Runtime', 'Red Hat']}
>

While containerd is a general-purpose runtime (used by Docker and Kubernetes), CRI-O (developed heavily by Red Hat) was built from the ground up for one single mathematical purpose: serving Kubernetes.

## 1. Absolute Minimalism
CRI-O strips away any mathematical complexity that Kubernetes does not strictly require. 
If a feature is not explicitly defined in the Kubernetes Container Runtime Interface (CRI) specification, it is not implemented in CRI-O. This makes CRI-O significantly smaller, faster, and mathematically more secure (smaller attack surface) than alternative runtimes.

## 2. The OCI Bridge
When the Kubernetes Kubelet commands CRI-O to start a Pod, CRI-O simply pulls the image and sets up the storage.
For the actual execution, it passes the exact mathematical configuration to an OCI-compliant low-level runtime (like TICK1runcTICK1 or TICK1crunTICK1). Because it strictly adheres to OCI standards, it can run any container built by Docker, Buildah, or Podman, providing massive enterprise flexibility beneath the Kubernetes orchestration layer.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker Engine/index.mdx': `---
title: Docker Engine
description: The industry-defining, client-server application that pioneered the container revolution, providing a comprehensive toolkit for building, shipping, and mathematically isolating software applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Docker Engine"
  subtitle="The Pioneer of Containerization"
  tags={['Containers', 'Docker', 'Architecture', 'DevOps']}
>

Before Docker (released in 2013), utilizing Linux cgroups and namespaces required extreme, mathematical kernel expertise. Docker democratized this technology by wrapping complex kernel APIs in a simple, developer-friendly interface.

## 1. The Client-Server Architecture
The Docker Engine is mathematically split into two main components:
1. **The Docker Daemon (dockerd)**: A heavy background process running as root that physically creates containers, manages networking, and handles storage volumes.
2. **The Docker CLI (docker)**: The terminal client that developers use (e.g., TICK1docker run ubuntuTICK1). The CLI mathematically translates human commands into REST API calls, transmitting them to the local (or remote) Daemon.

## 2. The Dockerfile
Docker's greatest mathematical invention is the **Dockerfile**.
By allowing developers to define a server environment declaratively in a text file, Docker mathematically guaranteed that code would run identically across all machines. A developer runs TICK1docker buildTICK1, the Daemon mathematically calculates the caching hashes for each layer, and outputs an immutable OCI image that can be shipped to production.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker Hub/index.mdx': `---
title: Docker Hub
description: The world's largest public cloud repository for container images, serving as the mathematical central distribution point for open-source software and official vendor application binaries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Docker Hub"
  subtitle="The Global Container Registry"
  tags={['Containers', 'Docker', 'Registry', 'Cloud']}
>

If a Docker Image is the immutable binary executable, a Container Registry is the mathematical app store where those binaries are hosted. Docker Hub is the default, public registry for the entire ecosystem.

## 1. Image Resolution and Layers
When a developer types TICK1docker run nginxTICK1, their local Docker Engine realizes it does not mathematically possess the TICK1nginxTICK1 image.
By default, it reaches out to TICK1docker.ioTICK1 (Docker Hub). It doesn't download a single massive file; it downloads a mathematical manifest. This manifest defines the specific SHA-256 hashes of the image's "Layers." If the developer already has the underlying Alpine Linux layer cached on their laptop, the Engine only downloads the delta layers, saving massive amounts of bandwidth.

## 2. Official Images and Security
Docker Hub hosts **Official Images** (like Node, Python, Postgres).
These are mathematically audited and maintained directly by the Docker team in collaboration with the upstream software creators. They serve as the secure, mathematical foundation (the TICK1FROMTICK1 line in a Dockerfile) for nearly all corporate applications, ensuring developers aren't building their infrastructure on malicious, unverified code.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Docker networking/index.mdx': `---
title: Docker Networking
description: The mathematical subsystem within the Docker Engine that provides isolated, software-defined network topologies, allowing containers to securely communicate with each other and the external world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Docker Networking"
  subtitle="Software-Defined Container Communication"
  tags={['Containers', 'Docker', 'Networking', 'Architecture']}
>

By default, a container is mathematically isolated. It has its own private network namespace, its own loopback interface (TICK1localhostTICK1), and its own private IP address. It cannot communicate with the outside world.

## 1. The Bridge Network
When you install Docker, it creates a default virtual switch on the host machine called TICK1docker0TICK1 (the Bridge network).
When you spin up a container, Docker mathematically provisions a virtual ethernet cable (a TICK1vethTICK1 pair). One end plugs into the container, the other plugs into TICK1docker0TICK1. Docker assigns the container an internal IP (e.g., TICK1172.17.0.2TICK1). If the container needs to access the internet, Docker uses mathematical NAT (Network Address Translation) via iptables to route traffic through the host's physical Wi-Fi or Ethernet card.

## 2. Port Mapping
Because the container's IP is purely internal, the outside world cannot reach it.
If you run an Nginx container on port 80, you must mathematically map a port on the host machine to the container (e.g., TICK1docker run -p 8080:80 nginxTICK1). The Docker Engine dynamically rewrites the host's Linux iptables rules: *"Any traffic hitting the physical host machine on port 8080 must be mathematically forwarded to internal IP 172.17.0.2 on port 80."* This enables public access while maintaining internal isolation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Multi-stage builds/index.mdx': `---
title: Multi-Stage Builds
description: An advanced Dockerfile optimization technique that uses multiple sequential mathematical build environments to compile code, copying only the final binary into a microscopic, highly secure production image.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Multi-Stage Builds"
  subtitle="Microscopic Production Images"
  tags={['Containers', 'Docker', 'Optimization', 'Security']}
>

To compile a Go application, you need the Go compiler, the standard library, and Git. This creates a massive 800MB Docker image. However, the final compiled Go binary is only 15MB and requires absolutely zero dependencies to execute. Shipping the 800MB compiler to production is mathematically inefficient and a massive security vulnerability.

## 1. The Builder Stage
A Multi-Stage Dockerfile solves this by defining multiple TICK1FROMTICK1 statements.
The first stage is mathematically labeled the **Builder**.
TICK3dockerfile
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp main.go
TICK3
This creates the heavy, 800MB environment, downloads all dependencies, and computationally links the final TICK1myappTICK1 binary.

## 2. The Distroless Production Stage
The second TICK1FROMTICK1 statement starts a completely fresh, mathematically empty image (often Alpine or Scratch).
TICK3dockerfile
FROM alpine:latest
COPY --from=builder /app/myapp /myapp
CMD ["/myapp"]
TICK3
The Docker Engine mathematically reaches back into the heavy Builder stage, plucks out *only* the 15MB binary, and copies it into the fresh Alpine image. The massive 800MB Builder stage is mathematically discarded. The final production image is microscopic, mathematically reducing the network transfer time, memory footprint, and security attack surface.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Namespaces/index.mdx': `---
title: Namespaces (Linux)
description: A core Linux kernel feature that mathematically partitions system resources such that one set of processes sees one set of resources, while another set of processes sees a completely different set.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Namespaces"
  subtitle="The Illusion of Isolation"
  tags={['Linux', 'Kernel', 'Containers', 'Architecture']}
>

If cgroups limit *how much* of a resource a container can use, Namespaces limit *what* the container is mathematically allowed to see. Namespaces are the mechanism that tricks a process into believing it is the only process running on a server.

## 1. Process ID (PID) Namespace
On a standard Linux server, the master process (TICK1systemdTICK1) is always PID 1.
When you launch a container, the Linux kernel creates a new **PID Namespace**. Inside the container, the application mathematically believes it is PID 1. If it runs the TICK1psTICK1 command, it only sees itself. It is mathematically blind to the thousands of other processes running on the host OS.

## 2. The Six Standard Namespaces
A true container relies on the mathematical synthesis of six specific namespaces:
1. **PID**: Isolates the process tree.
2. **NET**: Isolates the network interfaces (giving the container its own IP).
3. **MNT**: Isolates the filesystem (giving the container its own root directory TICK1/TICK1).
4. **IPC**: Isolates inter-process communication.
5. **UTS**: Isolates the hostname (the container thinks it has its own unique server name).
6. **USER**: Isolates user privileges (a process can be the omnipotent TICK1rootTICK1 user *inside* the namespace, but map to a harmless, unprivileged user on the host OS).

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
