import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/etcd/index.mdx': `---
title: etcd
description: A strongly consistent, distributed key-value store that acts as the absolute mathematical source of truth for all cluster data, state, and metadata within a Kubernetes Control Plane.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="etcd"
  subtitle="The Central Nervous System"
  tags={['Kubernetes', 'Storage', 'Distributed Systems', 'Databases']}
>

If the kube-apiserver is the front door of Kubernetes, etcd is the vault. Every single object (Pods, Secrets, Deployments) you create in Kubernetes is mathematically serialized into JSON/Protobuf and saved in etcd.

## 1. The Raft Consensus Algorithm
Because etcd holds the critical state of the entire cluster, it cannot be a single point of failure. 
It is typically deployed as a highly available cluster of 3 or 5 nodes. To ensure the nodes don't mathematically disagree on the state of the cluster (e.g., Node A thinks there are 3 Pods, Node B thinks there are 4), etcd utilizes the **Raft consensus algorithm**. 
Raft guarantees strict mathematical consistency. If you request to create a Pod, etcd will not acknowledge the write until a strict majority (quorum) of the etcd nodes have mathematically committed the data to their physical hard drives.

## 2. The Single Point of Truth
No component in Kubernetes (other than the kube-apiserver) is mathematically allowed to communicate directly with etcd.
The kubelet, the scheduler, and the controller-manager all ask the API server, which in turn queries etcd. If you lose your etcd database and have no backups, your Kubernetes cluster mathematically ceases to exist. The running containers will keep running, but you will completely lose the ability to manage, scale, or update them.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Helm/index.mdx': `---
title: Helm
description: The industry-standard package manager for Kubernetes, enabling developers to mathematically template, version, and share complex multi-resource applications as reusable "Charts".
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Helm"
  subtitle="The Package Manager for Kubernetes"
  tags={['Kubernetes', 'Tooling', 'Package Management', 'DevOps']}
>

Deploying a complex application to Kubernetes (like a Redis cluster) might require 15 separate YAML files (StatefulSets, Services, ConfigMaps, Secrets). Managing 15 raw YAML files manually for every environment (Dev, Staging, Prod) is mathematically impossible.

## 1. Templating the YAML
Helm solves this by introducing mathematical templating (using the Go template engine).
Instead of hardcoding TICK1replicas: 3TICK1 in your TICK1deployment.yamlTICK1, you write TICK1replicas: {{ .Values.replicaCount }}TICK1. You bundle all 15 templated files into a **Helm Chart**. 
When you deploy to Production, you provide a TICK1values-prod.yamlTICK1 file. Helm mathematically injects those values into the templates, renders the final pure Kubernetes YAML, and applies it to the cluster in a single atomic operation.

## 2. Release Management
Helm does not just apply YAML; it mathematically tracks the state of the installation.
When you run TICK1helm install redis bitnami/redisTICK1, Helm creates a "Release" object inside the cluster. If you later upgrade the chart and it breaks production, you can simply run TICK1helm rollback redis 1TICK1. Helm mathematically calculates the exact diff between the current broken release and the previous stable release, and orchestrates the downgrade automatically.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/HPA/index.mdx': `---
title: Horizontal Pod Autoscaler (HPA)
description: A native Kubernetes controller that mathematically monitors resource metrics (like CPU or RAM) and dynamically adjusts the number of Pod replicas in a Deployment to match real-time traffic demand.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Horizontal Pod Autoscaler (HPA)"
  subtitle="Dynamic Mathematical Scaling"
  tags={['Kubernetes', 'Scaling', 'Automation', 'Performance']}
>

If an e-commerce application experiences a massive traffic spike during Black Friday, manually typing TICK1kubectl scale deployment --replicas=50TICK1 is too slow. The HPA automates this mathematical decision.

## 1. The Scaling Algorithm
The HPA controller constantly queries the Kubernetes Metrics Server (which aggregates data from the kubelets).
You configure the HPA with a mathematical target: *"Maintain an average CPU utilization of 70% across all Pods in this Deployment."*
If the average CPU hits 90%, the HPA executes a specific mathematical formula:
TICK1desiredReplicas = ceil[currentReplicas * ( currentMetricValue / desiredMetricValue )]TICK1
If you have 10 Pods at 90% CPU, the HPA calculates: TICK1ceil[10 * (90 / 70)] = 13TICK1. It instantly commands the Controller Manager to scale the Deployment to 13 Pods, distributing the load and bringing the average back down.

## 2. Custom Metrics
While CPU and Memory are standard, the HPA can scale based on arbitrary mathematical metrics.
Using Custom Metrics adapters, you can configure the HPA to scale based on business logic. For example: *"If the number of unprocessed messages in the AWS SQS Queue exceeds 10,000, mathematically scale up the worker Pods to 50."* This enables extremely precise, event-driven architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Istio/index.mdx': `---
title: Istio
description: A powerful, open-source Service Mesh that provides a dedicated mathematical infrastructure layer for securing, connecting, and observing microservices communication across a Kubernetes cluster.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Istio"
  subtitle="The Enterprise Service Mesh"
  tags={['Kubernetes', 'Service Mesh', 'Networking', 'Security']}
>

When a company has 500 microservices talking to each other, mathematically tracking latency, implementing retries, and securing the traffic with TLS encrypts becomes a nightmare. If every developer writes this logic into their application code, the codebase becomes bloated and inconsistent.

## 1. The Sidecar Proxy Pattern
Istio solves this by mathematically intercepting all network traffic.
When a Pod is created, Istio automatically injects a second container into the Pod called the **Envoy Proxy** (the "Sidecar"). 
The application container knows nothing about Istio. It simply sends an unencrypted HTTP request to TICK1http://backend-serviceTICK1. The Envoy Proxy mathematically intercepts that request at the network layer, encrypts it (mTLS), adds trace headers, and routes it to the destination's Envoy Proxy. This completely decouples networking logic from application logic.

## 2. Advanced Traffic Engineering
Because Envoy proxies intercept 100% of the traffic, the Istio Control Plane can execute advanced mathematical routing.
You can configure Istio to perform **Fault Injection** (e.g., "Mathematically force 5% of requests to the database to fail with a 500 error to test the application's resilience"). You can also execute **Traffic Shadowing** (e.g., "Send a mathematical duplicate of all live production traffic to the new v2 Staging Pod, but silently discard the response").

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Jobs/index.mdx': `---
title: Jobs
description: A Kubernetes workload controller mathematically designed to manage finite, batch-processing tasks, ensuring that a specified number of Pods successfully terminate rather than running indefinitely.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Jobs"
  subtitle="Finite Execution Controllers"
  tags={['Kubernetes', 'Workloads', 'Batch Processing', 'Automation']}
>

A TICK1DeploymentTICK1 is designed to mathematically keep a Pod running forever; if the Pod stops, the Deployment considers it a failure and restarts it. A TICK1JobTICK1 is designed to do exactly the opposite.

## 1. Run to Completion
A Job is mathematically engineered for tasks that have a definitive end (e.g., running a database migration script, calculating a nightly financial report).
When you create a Job, it spins up a Pod. The Pod executes its script. If the script exits with a success code (TICK10TICK1), the Job mathematically records the Pod as TICK1CompletedTICK1. The Pod terminates, and it is not restarted.

## 2. Parallelism and Retries
Jobs offer advanced mathematical control over execution execution.
- **Parallelism**: You can configure a Job to process a massive queue of images by specifying TICK1parallelism: 5TICK1 and TICK1completions: 100TICK1. Kubernetes will spin up 5 Pods simultaneously. As each Pod finishes, a new one spins up, until exactly 100 successful completions are mathematically recorded.
- **Resilience**: If a Node dies while a Job is processing, or the script throws a random network error, the Job Controller mathematically detects the failure and automatically spins up a replacement Pod to retry the task (up to a configured TICK1backoffLimitTICK1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/kube-apiserver/index.mdx': `---
title: kube-apiserver
description: The central communication hub of the Kubernetes Control Plane, mathematically exposing the REST API and acting as the exclusive gatekeeper for all cluster state modifications and authentication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="kube-apiserver"
  subtitle="The Front Door of Kubernetes"
  tags={['Kubernetes', 'Control Plane', 'Architecture', 'Security']}
>

In a Kubernetes cluster, no two components are mathematically allowed to talk directly to each other. The kubelet does not talk to the scheduler. The Controller Manager does not talk to etcd. Everything must mathematically pass through the TICK1kube-apiserverTICK1.

## 1. The Validation Gatekeeper
When you run TICK1kubectl apply -f pod.yamlTICK1, the YAML is converted to JSON and sent to the API Server.
The API Server executes a strict mathematical pipeline:
1. **Authentication**: "Are you cryptographically who you say you are?"
2. **Authorization (RBAC)**: "Are you mathematically allowed to create a Pod in this specific namespace?"
3. **Admission Control**: "Does this Pod violate cluster policies? (e.g., is the image from an unapproved registry?)"
4. **Validation**: "Is the JSON mathematically well-formed?"
If it passes all checks, the API server serializes the data and writes it to the TICK1etcdTICK1 database.

## 2. The Hub and Spoke Model
Because it is the single point of communication, the API Server is designed to be completely stateless. 
It mathematically scales horizontally with ease. In a production cluster, you run 3 or 5 instances of TICK1kube-apiserverTICK1 behind a Load Balancer. If one crashes, the internal components simply route their REST requests to a surviving API server, ensuring the cluster control plane remains highly available.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/kube-proxy/index.mdx': `---
title: kube-proxy
description: A network proxy daemon running on every Worker Node in a Kubernetes cluster, mathematically responsible for maintaining network rules and enabling communication to ClusterIP Services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="kube-proxy"
  subtitle="The Internal Network Router"
  tags={['Kubernetes', 'Networking', 'Architecture', 'Infrastructure']}
>

Pods in Kubernetes are ephemeral. Their IP addresses mathematically change every time they restart. If the Frontend needs to talk to the Backend, it cannot rely on hardcoded Pod IPs. It relies on a Kubernetes TICK1ServiceTICK1 (a stable, virtual IP). **kube-proxy** is the daemon that makes this virtual IP actually work.

## 1. The IPTables Mathematics
kube-proxy runs on every single Worker Node. It mathematically listens to the kube-apiserver for the creation of new TICK1ServicesTICK1 and their corresponding TICK1EndpointsTICK1 (the actual live Pod IPs).
By default, kube-proxy does not act as a literal proxy server; it acts as a kernel configuration engine. When a Service is created, kube-proxy mathematically writes complex **iptables** rules directly into the host Linux kernel. These rules state: *"If any process on this server tries to send a packet to the virtual Service IP 10.96.0.1, mathematically intercept the packet in the kernel and redirect it to the live Pod IP 172.16.2.4."*

## 2. IPVS Mode
In massive clusters (over 5,000 Services), the mathematical list of iptables rules becomes so long that the Linux kernel slows down trying to evaluate them sequentially for every packet.
For immense scale, kube-proxy can be configured to use **IPVS (IP Virtual Server)** mode. IPVS is a mathematically advanced load balancing technology built into the Linux kernel that uses hash tables (O(1) complexity) instead of sequential lists, allowing Kubernetes to route traffic across 10,000 microservices with zero network degradation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/kubelet/index.mdx': `---
title: kubelet
description: The primary node agent running on every physical Worker Node in a Kubernetes cluster, serving as the mathematical bridge between the Control Plane's commands and the local container runtime.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="kubelet"
  subtitle="The Captain of the Node"
  tags={['Kubernetes', 'Architecture', 'Node Agent', 'Infrastructure']}
>

If the Control Plane is the brain of the cluster, the **kubelet** is the spinal cord on every single physical server. It is the only Kubernetes component that physically touches the container runtime (like containerd).

## 1. The Execution Engine
The kubelet is a daemon (managed by systemd, not by Kubernetes itself) that mathematically registers its Node with the API Server.
It then enters a continuous loop, watching the API Server for new Pod assignments. When the Scheduler assigns a Pod to its Node, the kubelet reads the mathematical specifications (the TICK1PodSpecTICK1). It reaches out to the Container Runtime Interface (CRI) via gRPC and commands it: *"Download this image, set up these Linux cgroups, and start this container."*

## 2. Health Monitoring and Probes
The kubelet is mathematically responsible for the lifecycle of the Pod.
If a developer configures a **Liveness Probe** (e.g., pinging an HTTP endpoint every 5 seconds), it is the kubelet that actually executes the mathematical ping. If the application deadlocks and the ping fails 3 times in a row, the kubelet mathematically kills the container and commands containerd to restart it, reporting the failure back to the Control Plane.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Kustomize/index.mdx': `---
title: Kustomize
description: A template-free, configuration management tool natively built into Kubernetes that uses mathematical patching and overlays to customize raw YAML files for different deployment environments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Kustomize"
  subtitle="Patch-Based Configuration"
  tags={['Kubernetes', 'Tooling', 'DevOps', 'Configuration']}
>

Helm modifies YAML files by injecting variables via text templating (e.g., TICK1{{ .Values.image }}TICK1), which mathematically destroys the original YAML structure (making it unreadable to standard linters). Kustomize takes a fundamentally different, mathematically pure approach.

## 1. The Overlay Architecture
Kustomize relies on a **Base and Overlays** structure.
You create a TICK1base/TICK1 directory containing pure, standard, unmodified Kubernetes YAML files (the default architecture).
You then create TICK1overlays/prod/TICK1 and TICK1overlays/dev/TICK1. Inside TICK1prodTICK1, you write a TICK1kustomization.yamlTICK1 file containing mathematical patches. For example: *"Take the Base deployment, and mathematically patch the replica count from 1 to 5."* 

## 2. Native Kubectl Integration
Because Kustomize operates via mathematical patching (JSON Patch) rather than text templating, it guarantees that all files remain 100% valid YAML at all times.
Kustomize was deemed so mathematically elegant that it was merged directly into the core Kubernetes CLI. You do not need to install a separate tool; you can simply run TICK1kubectl apply -k ./overlays/prodTICK1. The CLI will mathematically merge the base and the production patches in memory and apply the final configuration to the cluster instantly.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Linkerd/index.mdx': `---
title: Linkerd
description: An ultra-lightweight, security-focused Service Mesh for Kubernetes that utilizes a specialized Rust-based micro-proxy to mathematically secure and observe cluster communications with minimal resource overhead.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Linkerd"
  subtitle="The Lightweight Service Mesh"
  tags={['Kubernetes', 'Service Mesh', 'Networking', 'Rust']}
>

While Istio is the dominant enterprise Service Mesh, it is notoriously massive, complex, and consumes significant mathematical compute resources. Linkerd (a CNCF graduated project) was built as the minimalist, zero-configuration alternative.

## 1. The Rust Micro-Proxy
Istio utilizes the Envoy proxy (written in C++). Linkerd completely rewrote its sidecar proxy from scratch in **Rust** (called the TICK1linkerd2-proxyTICK1).
Rust provides absolute mathematical memory safety (preventing buffer overflows) while delivering extreme performance. The Linkerd proxy is so small and mathematically efficient that it adds less than 1 millisecond of latency and consumes less than 10MB of RAM per Pod, making it feasible to inject into clusters with thousands of tiny microservices without bankrupting the cloud bill.

## 2. Zero-Config mTLS
Linkerd's primary mathematical philosophy is simplicity.
To install Istio requires weeks of mathematical configuration. To install Linkerd, a developer simply runs TICK1linkerd install | kubectl apply -f -TICK1. Instantly, all communication between Pods is automatically encrypted via mutually authenticated TLS (mTLS). Linkerd mathematically acts as its own Certificate Authority, automatically rotating cryptographic certificates every 24 hours with absolutely zero human configuration required.

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
