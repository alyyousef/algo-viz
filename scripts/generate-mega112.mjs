import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/OCI image spec/index.mdx': `---
title: OCI Image Spec
description: The Open Container Initiative (OCI) mathematical standard that strictly defines the format and structure of container images, ensuring universal interoperability across diverse container runtimes and registries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="OCI Image Specification"
  subtitle="The Universal Container Standard"
  tags={['Containers', 'Standards', 'Architecture', 'OCI']}
>

In the early days, Docker owned the proprietary mathematical format for container images. If a competitor built a faster container runtime, they couldn't run Docker images. To prevent monopoly, Docker donated their image format to the Linux Foundation, creating the **Open Container Initiative (OCI)**.

## 1. The Mathematical Structure
The OCI Image Spec dictates that a container image is not a single executable file, but a mathematical collection of three specific components:
1. **The Manifest**: A JSON document that mathematically maps the layers of the image and their exact SHA-256 hashes.
2. **The Layers**: Compressed tarballs (TICK1.tar.gzTICK1) containing the actual files and directories. Each layer represents a modification (e.g., a TICK1RUNTICK1 command in a Dockerfile).
3. **The Configuration**: A JSON document defining runtime parameters, such as environment variables, the default working directory, and the TICK1ENTRYPOINTTICK1 command.

## 2. Universal Interoperability
Because the OCI Image Spec is an open mathematical standard, the industry exploded with innovation. 
You can use Red Hat's **Buildah** to mathematically construct an OCI image. You can push that image to a **Harbor** registry. You can pull that image to a server running the **containerd** runtime, and it will execute flawlessly. The OCI Spec ensures that the entire container ecosystem is completely decoupled from the Docker corporation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Podman/index.mdx': `---
title: Podman
description: A powerful, daemonless, open-source container engine developed by Red Hat that is mathematically compatible with the Docker CLI but uniquely supports running containers without root privileges.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Podman"
  subtitle="The Daemonless Docker Alternative"
  tags={['Containers', 'Red Hat', 'Security', 'Tooling']}
>

For years, the phrase "alias docker=podman" has been a battle cry for security-conscious DevOps engineers. Podman was engineered by Red Hat specifically to solve the mathematical security flaws inherent in Docker's architecture.

## 1. The Daemonless Advantage
Docker requires the TICK1dockerdTICK1 daemon, a massive background process running as root, to manage all containers. If a hacker exploits a vulnerability in a Docker container, they can mathematically escalate privileges to gain root access to the host machine.
Podman is mathematically daemonless. When you type TICK1podman runTICK1, it acts as a standard, standalone Linux executable that directly interacts with the kernel (via TICK1runcTICK1). If you run Podman as a standard user (e.g., TICK1aliceTICK1), the container processes run entirely within Alice's mathematical permissions. If the container is compromised, the hacker only gains Alice's limited access, protecting the host system.

## 2. Native Pod Support
While Docker manages single containers, Podman (as the name implies) can mathematically manage **Pods**—groups of containers that share the same network, IPC, and PID namespaces.
Podman can generate Kubernetes YAML (TICK1podman generate kubeTICK1) from a running local Pod, allowing developers to mathematically test multi-container architectures on their laptops and deploy them directly to a massive Kubernetes cluster with zero translation overhead.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.1 Containers/Registries/index.mdx': `---
title: Container Registries
description: Highly available storage and distribution systems mathematically designed to host, version, and securely deliver OCI-compliant container image layers to cloud infrastructure globally.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Container Registries"
  subtitle="The Hubs of Immutable Artifacts"
  tags={['Containers', 'Storage', 'Distribution', 'Architecture']}
>

A CI/CD pipeline compiles source code into a mathematical OCI container image. Before Kubernetes can run that image, it must be uploaded to a secure, highly-available storage system known as a Container Registry.

## 1. Public vs. Private Registries
While **Docker Hub** is the world's default public registry for open-source images, enterprises mathematically mandate private registries to protect proprietary code.
Major cloud providers offer integrated private registries: **AWS ECR** (Elastic Container Registry), **Google GCR/Artifact Registry**, and **Azure ACR**. When a Kubernetes cluster on AWS needs to scale up, it mathematically requests the image from ECR, ensuring the gigabytes of data never leave the private AWS fiber-optic network.

## 2. Advanced Mathematical Features
Modern registries are not just dumb storage buckets; they are active security platforms.
- **Vulnerability Scanning**: When an image is pushed, the registry mathematically decompresses the layers and scans the binaries against known CVE databases, physically blocking the deployment if a critical vulnerability is found.
- **Image Signing (Notary)**: Registries use cryptographic mathematics to sign images. A Kubernetes cluster can be configured to mathematically reject any image that was not cryptographically signed by an authorized senior engineer, preventing supply-chain attacks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Cilium/index.mdx': `---
title: Cilium
description: An advanced open-source software for transparently securing the network connectivity and load balancing between Kubernetes application workloads, mathematically powered by eBPF in the Linux kernel.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Cilium"
  subtitle="eBPF-Powered Kubernetes Networking"
  tags={['Kubernetes', 'Networking', 'Security', 'eBPF']}
>

Traditional Kubernetes networking (like Flannel or Calico) relies on IPTables, a legacy Linux firewall system that mathematically collapses under the weight of thousands of microservices, creating massive CPU overhead and latency.

## 1. The eBPF Revolution
Cilium completely bypasses IPTables using a revolutionary mathematical kernel technology called **eBPF (Extended Berkeley Packet Filter)**.
eBPF allows developers to safely inject compiled, sandboxed programs directly into the Linux kernel without requiring a kernel reboot. Cilium injects mathematical networking logic at the lowest possible level. When Pod A sends a packet to Pod B, the kernel physically routes it in microseconds, resulting in unprecedented, near-hardware network performance for Kubernetes clusters.

## 2. Layer 7 Security and Observability
Because Cilium operates at the kernel level, it possesses total mathematical visibility into network traffic.
Traditional firewalls block IPs and Ports (Layer 4). Cilium can mathematically inspect HTTP requests (Layer 7). An engineer can write a Cilium Network Policy that says: *"The Frontend Pod is mathematically allowed to issue HTTP GET requests to the TICK1/api/usersTICK1 endpoint on the Backend Pod, but if it issues an HTTP POST, immediately drop the packet."* This provides extreme, zero-trust security inside the cluster.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Clusters/index.mdx': `---
title: Clusters (Kubernetes)
description: The fundamental macroscopic architecture of Kubernetes, consisting of a mathematical aggregate of master control nodes and worker compute nodes unified to operate as a single logical supercomputer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kubernetes Clusters"
  subtitle="The Logical Supercomputer"
  tags={['Kubernetes', 'Architecture', 'Infrastructure', 'Distributed Systems']}
>

A developer does not deploy an application to "Server A" or "Server B." In Kubernetes, the physical hardware is mathematically abstracted away. A developer deploys to the **Cluster**, treating a warehouse of 1,000 servers as a single logical supercomputer.

## 1. The Master-Worker Architecture
A Kubernetes Cluster is mathematically divided into two distinct planes:
- **The Control Plane (Master Nodes)**: The mathematical brain of the cluster. It does not run user applications. It runs the API server, the scheduler, and the etcd database. It makes global decisions (e.g., "We need 5 replicas of Nginx").
- **The Data Plane (Worker Nodes)**: The physical muscle. These are the servers (EC2 instances, bare metal) that mathematically execute the containerized workloads (Pods). They take orders directly from the Control Plane.

## 2. High Availability (HA)
For a cluster to be mathematically resilient, it must be highly available. 
A production cluster never has a single Master Node; it typically has 3 or 5 Master Nodes spread across different physical data centers (Availability Zones). They use a mathematical consensus algorithm (Raft) to agree on the cluster state. If an entire data center catches fire and a Master Node is destroyed, the remaining nodes maintain mathematical quorum, and the cluster continues operating without a second of downtime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Control plane/index.mdx': `---
title: Control Plane
description: The central orchestration brain of a Kubernetes cluster, composed of critical mathematical components that continuously manage global state, scheduling, and API communication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="The Control Plane"
  subtitle="The Brain of Kubernetes"
  tags={['Kubernetes', 'Architecture', 'Control Plane', 'Distributed Systems']}
>

If the Worker Nodes are the engines of a ship, the Control Plane is the bridge. It makes all mathematical decisions regarding cluster state, scaling, and recovery.

## 1. Core Components
The Control Plane is not a single program; it is a mathematical symphony of several distinct binaries:
- **kube-apiserver**: The front door. Every kubectl command and internal component mathematically communicates *only* with the API server.
- **etcd**: The central nervous system. A highly-available, distributed key-value store that holds the mathematical "Desired State" of every object in the cluster.
- **kube-scheduler**: The logistics engine. When a new Pod is created, the scheduler mathematically analyzes the RAM/CPU usage of all Worker Nodes and assigns the Pod to the optimal server.
- **kube-controller-manager**: The relentless enforcer. It runs continuous mathematical loops, ensuring the physical Live State of the cluster perfectly matches the Desired State in etcd.

## 2. Managed Control Planes
Managing a highly-available Control Plane requires immense mathematical expertise (managing etcd backups, upgrading API servers, handling TLS certificates).
Because of this complexity, 90% of enterprises use Cloud-Managed Kubernetes (like AWS EKS, Google GKE, or Azure AKS). In these services, the cloud provider completely hides the Control Plane. The provider manages the master nodes mathematically behind the scenes, and the customer only pays for and manages the Worker Nodes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Controller Manager/index.mdx': `---
title: Controller Manager
description: A core component of the Kubernetes Control Plane that runs continuous mathematical reconciliation loops, ensuring the physical state of the cluster permanently matches the desired declarative state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Controller Manager"
  subtitle="The Relentless Enforcer"
  tags={['Kubernetes', 'Control Plane', 'Architecture', 'Automation']}
>

Kubernetes is a declarative system. You do not tell Kubernetes *how* to deploy 5 Pods; you mathematically declare that you *want* 5 Pods. The **kube-controller-manager** is the engine that makes that desire a physical reality.

## 1. The Reconciliation Loop
The Controller Manager is a daemon that embeds several distinct mathematical control loops (e.g., the ReplicaSet Controller, the Node Controller).
These controllers operate on a simple mathematical formula: **Current State vs. Desired State**.
If a developer creates a Deployment requesting 3 replicas of an app, the Desired State is 3. The ReplicaSet Controller checks the Current State (0). It mathematically calculates the diff, and issues commands to the API server to create 3 Pods.

## 2. Relentless Self-Healing
The loop never stops. It runs continuously, thousands of times a minute.
If a Worker Node physically loses power, the 3 Pods running on it die. The Current State drops to 0. The ReplicaSet Controller instantly detects the mathematical divergence from the Desired State (3). Without any human intervention, the Controller Manager mathematically commands the Scheduler to spin up 3 brand new Pods on the surviving Worker Nodes, ensuring the application remains highly available.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/CRDs/index.mdx': `---
title: Custom Resource Definitions (CRDs)
description: An advanced extensibility mechanism in Kubernetes that allows developers to mathematically define custom objects and APIs, transforming Kubernetes from a container orchestrator into a universal control plane.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Custom Resource Definitions (CRDs)"
  subtitle="Extending the Kubernetes Brain"
  tags={['Kubernetes', 'Architecture', 'APIs', 'Extensibility']}
>

Out of the box, the Kubernetes API understands standard mathematical resources: TICK1PodsTICK1, TICK1DeploymentsTICK1, and TICK1ServicesTICK1. But what if you want Kubernetes to manage a PostgreSQL database or an AWS S3 Bucket?

## 1. Defining New Mathematics
A **CRD (Custom Resource Definition)** allows you to inject new mathematical nouns into the Kubernetes API.
You can create a CRD called TICK1DatabaseTICK1. Once applied, a developer can write standard Kubernetes YAML specifying TICK1kind: DatabaseTICK1 and use TICK1kubectl get databasesTICK1. The Kubernetes API server now mathematically understands and stores the state of these custom objects in etcd, exactly as if they were native Pods.

## 2. The Operator Pattern
A CRD is just a mathematical data structure; it has no behavior. To make the CRD do something, you must write a Custom Controller (often called an **Operator**).
If a developer applies a TICK1DatabaseTICK1 YAML file, the custom Operator detects the new object. The Operator contains the complex mathematical logic (written in Go) required to reach out to an external cloud provider, provision a managed PostgreSQL instance, configure the backups, and return the connection string to Kubernetes. CRDs allow Kubernetes to mathematically orchestrate anything in the world with an API, not just containers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/CronJobs/index.mdx': `---
title: CronJobs
description: A native Kubernetes workload resource designed to execute time-based, mathematical schedules for ephemeral, batch-processing containerized tasks (Jobs) using standard Unix cron syntax.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="CronJobs"
  subtitle="Time-Based Kubernetes Execution"
  tags={['Kubernetes', 'Workloads', 'Automation', 'Scheduling']}
>

While TICK1DeploymentsTICK1 are designed to keep web servers running mathematically forever, a TICK1CronJobTICK1 is designed to spin up a container at a specific time, perform a finite mathematical calculation, and then terminate.

## 1. The Unix Cron Syntax
Kubernetes CronJobs utilize the standard mathematical 5-point Unix cron syntax (TICK1Minute Hour Day Month DayOfWeekTICK1).
For example, a schedule of TICK10 2 * * *TICK1 mathematically guarantees that Kubernetes will execute the specified container image every single day at precisely 2:00 AM. 

## 2. The CronJob Controller
Behind the scenes, the CronJob object is managed by the Kubernetes Controller Manager.
At 2:00 AM, the controller mathematically creates a TICK1JobTICK1 object. The TICK1JobTICK1 object then creates a TICK1PodTICK1. The container runs (e.g., executing a database backup script to S3). Once the script returns an exit code of TICK10TICK1 (success), the Pod enters a TICK1CompletedTICK1 state. If the script fails, the TICK1JobTICK1 controller can be mathematically configured to retry the execution up to a specified limit, providing immense reliability for scheduled background tasks compared to a traditional Linux crontab.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/DaemonSets/index.mdx': `---
title: DaemonSets
description: A specialized Kubernetes workload controller mathematically engineered to ensure that exactly one copy of a specific Pod runs on every single Worker Node in the cluster.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="DaemonSets"
  subtitle="Node-Level Guaranteed Execution"
  tags={['Kubernetes', 'Workloads', 'Architecture', 'Infrastructure']}
>

A TICK1DeploymentTICK1 schedules Pods randomly; if you ask for 3 Pods on a 10-Node cluster, 7 Nodes will have zero Pods, and 1 Node might have all 3. A TICK1DaemonSetTICK1 changes this mathematical logic entirely.

## 1. The Mathematical Guarantee
A DaemonSet mathematically guarantees that **one (and only one) Pod** will run on every single Node in the cluster.
If your cluster has 1,000 Worker Nodes, the DaemonSet controller will instantly schedule exactly 1,000 Pods. If the Auto-Scaler adds 50 new physical servers to the cluster to handle high traffic, the DaemonSet controller mathematically detects the new Nodes and automatically deploys the Pod to them before they are allowed to accept normal workloads.

## 2. Infrastructure Use Cases
DaemonSets are not used for web applications. They are strictly used for infrastructure-level, background mathematical processes that require access to the physical host:
- **Log Aggregation**: Running a Fluentd or Promtail agent on every Node to scrape the raw text logs from all other containers and forward them to Elasticsearch.
- **Monitoring**: Running a Prometheus Node Exporter on every Node to gather physical CPU/RAM metrics.
- **Networking**: The CNI (Container Network Interface) plugins (like Calico or Cilium) run as DaemonSets to manage the iptables and eBPF routing rules directly on the host kernel.

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
