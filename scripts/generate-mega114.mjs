import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Namespaces/index.mdx': `---
title: Namespaces (Kubernetes)
description: A logical mechanism in Kubernetes used to mathematically partition a single physical cluster into multiple virtual sub-clusters, providing scope for naming, resource quotas, and access control.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Namespaces (Kubernetes)"
  subtitle="Virtual Cluster Partitioning"
  tags={['Kubernetes', 'Architecture', 'Organization', 'Security']}
>

Do not confuse Kubernetes Namespaces with Linux kernel namespaces. In Kubernetes, a Namespace is a purely logical, mathematical boundary within the etcd database.

## 1. Logical Isolation
If a company has a single 100-node Kubernetes cluster, they don't want the Frontend team and the Backend team accidentally deleting each other's Deployments.
The cluster administrator creates a TICK1frontendTICK1 namespace and a TICK1backendTICK1 namespace. These namespaces act as mathematical walls for object names. The Frontend team can create a Pod named TICK1api-serverTICK1 in their namespace, and the Backend team can simultaneously create a Pod named TICK1api-serverTICK1 in their namespace. The Kubernetes API server considers them mathematically distinct objects, eliminating naming collisions.

## 2. Quotas and Security
Namespaces are the foundational boundary for cluster governance.
- **Resource Quotas**: An administrator can mathematically enforce that the TICK1frontendTICK1 namespace is never allowed to consume more than 50GB of RAM across all its Pods.
- **RBAC**: Security policies are tied to Namespaces. A junior developer can be mathematically granted root access to the TICK1devTICK1 namespace, while being entirely cryptographically locked out of the TICK1prodTICK1 namespace.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/NetworkPolicies/index.mdx': `---
title: NetworkPolicies
description: A Kubernetes resource that mathematically dictates how groups of Pods are allowed to communicate with each other and external network endpoints, effectively acting as an internal software-defined firewall.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="NetworkPolicies"
  subtitle="Internal Cluster Firewalls"
  tags={['Kubernetes', 'Networking', 'Security', 'Architecture']}
>

By default, Kubernetes enforces a mathematically terrifying rule: **All Pods can communicate with all other Pods in the cluster.** If a hacker compromises a vulnerable frontend web server, they can freely ping the internal database Pod.

## 1. Zero Trust Architecture
A TICK1NetworkPolicyTICK1 allows you to mathematically revoke this default open access and implement a Zero Trust architecture.
You apply a YAML file that states: *"The TICK1databaseTICK1 Pods are mathematically forbidden from receiving any network traffic, EXCEPT from Pods that possess the label TICK1app=backendTICK1."*
If the compromised frontend Pod attempts to open a TCP connection to the database, the network plugin (like Calico or Cilium) intercepts the packet at the kernel level and mathematically drops it.

## 2. Ingress and Egress
NetworkPolicies evaluate traffic in two mathematical directions:
- **Ingress**: Traffic coming *into* a Pod (e.g., stopping unauthorized services from querying your API).
- **Egress**: Traffic leaving *out* of a Pod (e.g., stopping a compromised Pod from mathematically establishing a reverse shell to a hacker's external server). Egress policies can strictly limit a Pod to only communicate with specific external IP ranges.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Operators/index.mdx': `---
title: Operators
description: A software extension to Kubernetes that combines Custom Resource Definitions (CRDs) with custom mathematical control loops to automate the complex lifecycle management of stateful applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Operators"
  subtitle="Automating Human Expertise"
  tags={['Kubernetes', 'Architecture', 'Automation', 'Extensibility']}
>

Kubernetes mathematically knows exactly how to keep a stateless web server running. But it has absolutely no idea how to safely backup, upgrade, or shard a complex stateful database like PostgreSQL.

## 1. Encoding Human Knowledge
An Operator is a piece of software (usually written in Go) that runs as a Pod inside the cluster. It mathematically encodes the operational knowledge of a human database administrator.
When you install the PostgreSQL Operator, it watches the API Server. When you create a custom TICK1PostgresClusterTICK1 object, the Operator's mathematical loop takes over. It doesn't just spin up Pods; it orchestrates the primary-replica replication, mathematically handles leader election if the primary dies, and automatically schedules encrypted backups to AWS S3.

## 2. Day 2 Operations
Operators excel at "Day 2" operations—the mathematically complex tasks required to keep software running long-term.
If you need to upgrade an Elasticsearch cluster from version 7 to 8, a human might cause data loss. An Elasticsearch Operator knows the exact mathematical sequence required: drain the data from Node 1, upgrade Node 1, wait for the cluster state to turn "Green," and mathematically proceed to Node 2, ensuring zero downtime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/PersistentVolumeClaims/index.mdx': `---
title: PersistentVolumeClaims (PVCs)
description: A declarative request made by a developer in Kubernetes for mathematical storage resources (capacity and access mode) without needing to know the underlying hardware specifics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PersistentVolumeClaims (PVCs)"
  subtitle="Declarative Storage Requests"
  tags={['Kubernetes', 'Storage', 'Architecture', 'Infrastructure']}
>

In Kubernetes, a developer should never write YAML that says "Mount AWS EBS Volume ID v-12345." That breaks the mathematical abstraction. Instead, developers use **PersistentVolumeClaims (PVCs)**.

## 1. The Request for Storage
A PVC is a pure mathematical request. A developer creates a TICK1PersistentVolumeClaimTICK1 object that essentially says: *"I need 50GB of storage that can be read and written to by a single node (ReadWriteOnce), and it must be fast SSD (StorageClass: gp3)."*
The developer mounts this PVC directly into their Pod. The developer mathematically does not care if the cluster is running on AWS, Google Cloud, or a Raspberry Pi.

## 2. Dynamic Provisioning
When the PVC is created, the Kubernetes Controller Manager mathematically evaluates the request.
If **Dynamic Provisioning** is enabled, the cluster automatically talks to the underlying cloud provider. It mathematically executes the API calls to dynamically provision a 50GB AWS EBS volume, creates a matching TICK1PersistentVolumeTICK1 (PV) object in Kubernetes, and mathematically binds the PV to the developer's PVC. When the developer deletes the PVC, Kubernetes automatically deletes the EBS volume to save money.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/PersistentVolumes/index.mdx': `---
title: PersistentVolumes (PVs)
description: A piece of actual, physical storage infrastructure provisioned within a Kubernetes cluster that has a lifecycle mathematically independent of any individual Pod that consumes it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PersistentVolumes (PVs)"
  subtitle="The Physical Storage Abstraction"
  tags={['Kubernetes', 'Storage', 'Infrastructure', 'Architecture']}
>

By default, the filesystem inside a Docker container is mathematically ephemeral. If a database Pod crashes and restarts, every single row of data is permanently annihilated. To preserve data, Kubernetes uses **PersistentVolumes (PVs)**.

## 1. The Infrastructure Object
A PersistentVolume (PV) represents the actual physical storage (an AWS EBS volume, a Google Persistent Disk, or an NFS share in an on-premises data center).
While a PersistentVolumeClaim (PVC) is the *developer's request*, the PV is the *administrator's hardware*. The PV exists as a global cluster resource. Its mathematical lifecycle is completely decoupled from any Pod. If a Pod writes data to a PV and the Pod is violently deleted, the PV mathematically remains intact, safely holding the data.

## 2. Reclaim Policies
When a developer finishes using a PV and deletes their PVC claim, the PV's mathematical **Reclaim Policy** dictates what happens to the physical data.
- **Retain**: The volume is mathematically orphaned. The data is kept safe, but the volume cannot be claimed by another Pod until an administrator manually cleans it.
- **Delete**: The Kubernetes Controller reaches out to the cloud provider and mathematically obliterates the underlying storage drive (e.g., deleting the AWS EBS volume), permanently destroying the data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/RBAC/index.mdx': `---
title: RBAC (Kubernetes)
description: Role-Based Access Control, the mathematical security framework in Kubernetes that dictates exactly which users or service accounts are authorized to perform specific API operations on specific resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Role-Based Access Control (RBAC)"
  subtitle="Mathematical Cluster Security"
  tags={['Kubernetes', 'Security', 'Architecture', 'Authentication']}
>

Authentication verifies *who* you are. RBAC (Authorization) is the mathematical engine that determines *what you are allowed to do*.

## 1. The Three Pillars
RBAC is constructed from three distinct mathematical objects:
1. **The Subject**: The entity trying to act (a human User, a Group, or a machine TICK1ServiceAccountTICK1).
2. **The Role**: A mathematical list of permissions (e.g., "Allowed to TICK1getTICK1 and TICK1deleteTICK1 only TICK1PodsTICK1 and TICK1DeploymentsTICK1").
3. **The RoleBinding**: The mathematical glue. It binds a specific Subject to a specific Role.

## 2. Namespaced vs. Global
RBAC is mathematically partitioned based on scope.
- **Role / RoleBinding**: These are confined to a single Namespace. If Alice has a TICK1RoleBindingTICK1 granting her Admin rights in the TICK1devTICK1 namespace, she mathematically has zero privileges in the TICK1prodTICK1 namespace.
- **ClusterRole / ClusterRoleBinding**: These are global. A TICK1ClusterRoleBindingTICK1 granting read access means the Subject can mathematically read every single Pod in the entire cluster, across all namespaces. This is heavily utilized for infrastructure tools like Promtail or Fluentd that must scan the entire system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/ReplicaSets/index.mdx': `---
title: ReplicaSets
description: A core Kubernetes workload controller mathematically designed to maintain a stable, specified number of identical Pod replicas running in the cluster at any given time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="ReplicaSets"
  subtitle="The Guarantee of Availability"
  tags={['Kubernetes', 'Workloads', 'Architecture', 'High Availability']}
>

If you manually create a TICK1PodTICK1 in Kubernetes and the physical server it is running on catches fire, the Pod mathematically ceases to exist. It is not restarted. To ensure high availability, you must wrap Pods in a **ReplicaSet**.

## 1. The Mathematical Equation
The ReplicaSet controller runs a continuous mathematical loop evaluating a single equation: **Current Pods == Desired Pods**.
If you set TICK1replicas: 3TICK1, the ReplicaSet uses a mathematical "Label Selector" to scan the cluster. It looks for all Pods containing the label TICK1app=frontendTICK1. If it counts 2 Pods, the equation fails. The ReplicaSet immediately mathematically commands the API server to create 1 new Pod. If someone manually launches a 4th Pod, the equation fails, and the ReplicaSet ruthlessly terminates one Pod to restore mathematical equilibrium.

## 2. Managed by Deployments
In modern Kubernetes, developers **almost never create ReplicaSets directly**. 
Instead, developers create TICK1DeploymentsTICK1. A Deployment mathematically manages ReplicaSets. When you update the Docker image in a Deployment, the Deployment creates a *brand new* ReplicaSet, scales it up, and simultaneously scales down the *old* ReplicaSet, providing a mathematically flawless, zero-downtime rolling update.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Scheduler/index.mdx': `---
title: kube-scheduler
description: The control plane component mathematically responsible for assigning newly created, unscheduled Pods to optimal physical Worker Nodes based on strict resource constraints and affinity rules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="kube-scheduler"
  subtitle="The Orchestration Logistics Engine"
  tags={['Kubernetes', 'Architecture', 'Control Plane', 'Algorithms']}
>

When the Controller Manager creates a new Pod, the Pod mathematically exists in etcd, but its TICK1nodeNameTICK1 field is empty. It is physically running nowhere. The **kube-scheduler** is the mathematical algorithm that decides where it will run.

## 1. The Two-Step Algorithm
The Scheduler watches the API Server for any Pod with an empty TICK1nodeNameTICK1. When it finds one, it executes a two-phase mathematical operation:
1. **Filtering (Predicates)**: It eliminates incapable nodes. If the Pod requests 4GB of RAM, the scheduler mathematically filters out any Worker Node that has less than 4GB available.
2. **Scoring (Priorities)**: It mathematically ranks the surviving nodes. It gives higher scores to nodes that currently have the lowest resource utilization, or nodes that already have the required Docker image cached locally, preventing unnecessary network downloads. The Node with the highest mathematical score wins.

## 2. Affinity and Taints
Administrators can heavily influence the mathematical scoring using advanced rules.
- **Node Affinity**: You can mathematically force a Machine Learning Pod to *only* schedule on Worker Nodes that possess physical GPU hardware.
- **Taints and Tolerations**: You can "Taint" a Node (e.g., "This Node is for the billing team only"). The scheduler is mathematically forbidden from placing any Pod on that Node unless the Pod explicitly contains a matching "Toleration."

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Service mesh/index.mdx': `---
title: Service Mesh
description: A dedicated, mathematical infrastructure layer added to a microservices architecture that handles secure, reliable, and observable service-to-service communication via a network of proxy sidecars.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Service Mesh"
  subtitle="The Microservices Network Layer"
  tags={['Architecture', 'Microservices', 'Networking', 'Security']}
>

In a monolithic application, functions call other functions in memory (which takes nanoseconds and never fails). In microservices, services call each other over the network, which is mathematically unreliable, slow, and insecure.

## 1. Decoupling the Network
If Service A calls Service B and the network times out, Service A needs a retry logic algorithm. If the developer hardcodes that algorithm into Service A (using Java or Node.js), the application becomes bloated.
A **Service Mesh** (like Istio or Linkerd) extracts this mathematical logic entirely. It deploys a microscopic Proxy (a sidecar) next to every single container. The application simply sends a dumb HTTP request. The Proxy intercepts it, mathematically evaluates retry logic, circuit breaking, and load balancing, and routes it to the destination.

## 2. Zero-Trust Security (mTLS)
The greatest mathematical advantage of a Service Mesh is **Mutual TLS (mTLS)**.
When Service A's proxy connects to Service B's proxy, the proxies mathematically authenticate each other using cryptographic certificates and encrypt 100% of the traffic. This means even if a hacker penetrates the internal Kubernetes network and attempts a packet-sniffing attack, they will mathematically only see unreadable encrypted ciphertext.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/StatefulSets/index.mdx': `---
title: StatefulSets
description: A specialized Kubernetes workload controller mathematically designed to manage the deployment, scaling, and rigid identity of stateful applications (like databases) that require persistent storage and strict ordering.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="StatefulSets"
  subtitle="Managing Stateful Architectures"
  tags={['Kubernetes', 'Workloads', 'Architecture', 'Databases']}
>

If you deploy a web server using a TICK1DeploymentTICK1, the Pods are mathematically identical and interchangeable. They get random hash names (e.g., TICK1web-8f7b...TICK1). If you try to deploy a MongoDB cluster this way, it will catastrophically fail, because database nodes rely on strict mathematical identity to know who is the Primary and who is the Replica.

## 1. Sticky Identity
A TICK1StatefulSetTICK1 provides strict mathematical identity.
Instead of random hashes, Pods are named sequentially: TICK1mongo-0TICK1, TICK1mongo-1TICK1, TICK1mongo-2TICK1. 
If the physical Node hosting TICK1mongo-1TICK1 dies, Kubernetes will spin up a new Pod on a different Node, but it will mathematically force the new Pod to inherit the exact name TICK1mongo-1TICK1 and the exact internal DNS address. The MongoDB cluster mathematically recognizes the new Pod as the resurrected Node 1, preventing data split-brain scenarios.

## 2. Persistent Storage Binding
In a Deployment, all Pods share the same PVC. In a StatefulSet, each Pod is mathematically bound to its own exclusive PersistentVolume.
TICK1mongo-0TICK1 writes to Volume A. TICK1mongo-1TICK1 writes to Volume B. If TICK1mongo-1TICK1 dies and is resurrected, the StatefulSet controller mathematically guarantees that the new TICK1mongo-1TICK1 Pod is re-attached to the exact same Volume B, ensuring zero data loss during high-availability failovers.

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
