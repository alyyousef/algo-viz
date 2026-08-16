import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Containers/index.mdx': `---
title: Containers
description: Executable units of software in which application code is packaged, along with its libraries and dependencies, in common ways so that it can be run anywhere.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Containers">

Before 2013, deploying software was biologically painful. You had to physically SSH into a Linux server, install Python 2.7, install PostgreSQL, and hope the server's OS dependencies matched your laptop. Usually, they didn't, resulting in the infamous *"It works on my machine!"* crisis.

**Containers** mathematically solved this by utilizing Linux Kernel features (cgroups and namespaces).

<Callout icon="success" title="The Shipping Container Metaphor">
  A Docker container is a mathematically isolated, sealed box. 
  
  It contains your exact Python code, the exact Python 3.9 interpreter, and the exact required Linux dependencies. Because the box contains the OS dependencies, you can take that box and mathematically guarantee it will run identically on an Ubuntu server, an AWS cloud instance, or a macOS laptop.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Kubernetes/index.mdx': `---
title: Kubernetes
description: An open-source container orchestration system for automating software deployment, scaling, and management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Kubernetes (K8s)"
  subtitle="The Cloud Operating System"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/512px-Kubernetes_logo_without_workmark.svg.png"
  description="If Docker is the shipping container, Kubernetes is the automated port facility. It is a mathematical orchestration engine that manages thousands of containers across hundreds of servers."
  yearCreated={2014}
  creator="Google (Joe Beda, Brendan Burns, Craig McLuckie)"
  isOpenSource={true}
  websiteUrl="https://kubernetes.io/"
>

Running 1 container on your laptop is easy. Running 10,000 containers across 500 physical AWS servers, handling load-balancing, auto-restarting crashed containers, and doing zero-downtime rolling updates is biologically impossible for a human.

<Callout icon="tip" title="The Control Plane">
  Kubernetes solves this using a **Declarative Architecture**. 
  
  You mathematically tell the K8s API: *"I want exactly 5 copies of the Node.js container running."* 
  
  The K8s Control Plane monitors the cluster. If Server #3 physically catches on fire and dies, K8s detects that only 4 containers are running. It biologically calculates the state divergence, automatically spins up a new container on Server #4, and rewires the network routing in milliseconds to maintain the desired mathematical state of 5.
</Callout>

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Microservices/index.mdx': `---
title: Microservices
description: An architectural style that structures an application as a collection of services that are highly maintainable and testable, loosely coupled, independently deployable, and organized around business capabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microservices">

Historically, applications were **Monoliths**: A single, massive codebase containing the UI, the database logic, the billing system, and the user management system. If the billing system had a memory leak, the entire application crashed.

**Microservices** mathematically divide the monolith into dozens of tiny, independent applications.

<Callout icon="warning" title="The Distributed Systems Cost">
  In a microservices architecture, the \`Billing Service\` (written in Java) is a separate codebase from the \`User Service\` (written in Node.js). They communicate over the network via HTTP APIs or gRPC.
  
  **Pros:** You can deploy the Billing Service without touching the User Service. If Billing crashes, Users can still log in.
  
  **Cons:** You have mathematically introduced Network Latency. If an API request requires fetching data from 6 different microservices, the biological overhead of 6 network hops can drastically cripple performance compared to a simple SQL \`JOIN\` inside a Monolith.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Service mesh/index.mdx': `---
title: Service mesh
description: A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Service Mesh">

When an enterprise splits a Monolith into 500 microservices, a terrifying mathematical problem emerges: How do you secure, monitor, and route traffic between 500 different applications communicating over the network?

If you force every developer to manually write TLS encryption and retry-logic into their Java and Node.js code, it will biologically fail.

<Callout icon="success" title="The Sidecar Proxy">
  A **Service Mesh** (like Istio or Linkerd) solves this by injecting a "Sidecar" Proxy mathematically next to every single container.
  
  When Service A wants to talk to Service B, it doesn't send the request directly. It sends it to its local Sidecar. The Sidecar automatically encrypts the traffic with mTLS, routes it to Service B's Sidecar, handles retries if it fails, and emits telemetry metrics to Grafana. The application developers write zero security code; the infrastructure handles it mathematically.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Twelve-factor apps/index.mdx': `---
title: Twelve-Factor Apps
description: A methodology for building software-as-a-service applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Twelve-Factor App Methodology">

Invented by the engineers at Heroku in 2011, the **Twelve-Factor App** is a mathematical manifesto detailing exactly how to build modern, cloud-native web applications.

If an application violates these 12 architectural rules, it will biologically struggle to scale on modern container orchestration platforms like Kubernetes.

<Callout icon="info" title="Key Architectural Rules">
  Some of the most critical mathematical rules include:
  1. **Config in Environment:** Never hardcode database passwords in the codebase. Always use Environment Variables (\`.env\`).
  2. **Stateless Processes:** The application must mathematically assume that local memory and disk space are temporary. If a user uploads an image, it must be saved to a database or S3, never to the container's local hard drive (because K8s might destroy the container at any second).
  3. **Disposability:** The app must start up instantly and shut down gracefully when receiving a \`SIGTERM\` signal.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Serverless/index.mdx': `---
title: Serverless
description: A cloud-computing execution model in which the cloud provider dynamically manages the allocation and provisioning of servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Serverless Computing">

In a standard Kubernetes cluster, you are paying AWS $500/month for the physical EC2 servers, even if your traffic drops to zero at 3:00 AM. 

**Serverless** (like AWS Lambda) mathematically eliminates idle server costs.

<Callout icon="tip" title="Scale-to-Zero Architecture">
  In a Serverless architecture, you do not provision a server. You upload a ZIP file containing a single JavaScript function to AWS.
  
  When a user hits your API, AWS mathematically spins up a micro-container in 50 milliseconds, executes your function, returns the HTTP response, and instantly destroys the container. 
  
  You are biologically billed *by the millisecond* of CPU execution. If you get 0 visitors, your AWS bill is mathematically $0.00.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/GitOps/index.mdx': `---
title: GitOps
description: An operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD, and applies them to infrastructure automation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitOps">

Historically, if a Senior DevOps Engineer wanted to scale an application from 3 servers to 5 servers, they would manually run a \`kubectl\` command in their terminal. If they quit the company, nobody would know why the server count was changed.

**GitOps** mathematically enforces that **Git is the absolute Single Source of Truth for Infrastructure.**

<Callout icon="success" title="Continuous Reconciliation">
  With GitOps (using tools like ArgoCD or Flux), human beings are biologically banned from manually changing the Kubernetes cluster.
  
  Instead, you edit a YAML file in a GitHub repository, changing \`replicas: 3\` to \`replicas: 5\`, and you merge the Pull Request. A software agent mathematically watching the Git repo detects the commit, compares it to the live K8s cluster, realizes there is a mathematical divergence, and automatically executes the commands to synchronize the cluster to match the Git repository.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Immutable infrastructure/index.mdx': `---
title: Immutable infrastructure
description: An approach to managing services and software deployments on IT resources wherein components are replaced rather than changed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Immutable Infrastructure">

In the 2000s, system administrators used "Mutable Infrastructure". If a Linux server needed a security patch, the admin SSH'd into the server and ran \`apt-get upgrade\`. Over 5 years, the server accumulated biological "Configuration Drift," becoming a terrifying, un-reproducible snowflake.

**Immutable Infrastructure** is the mathematical paradigm shift that powers the Cloud-Native era.

<Callout icon="warning" title="No SSH Allowed">
  In an Immutable architecture, servers and containers are mathematically read-only. 
  
  Once a server or Docker container is booted, you are biologically forbidden from modifying it, patching it, or SSHing into it. If a security patch is required, you mathematically build a brand-new container image, boot the new container, route traffic to it, and completely destroy the old container.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Operators/index.mdx': `---
title: Operators
description: Software extensions to Kubernetes that make use of custom resources to manage applications and their components.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kubernetes Operators">

Kubernetes is mathematically brilliant at managing stateless web servers. If a React server crashes, K8s just kills it and restarts it. 

But what happens if a **PostgreSQL Database** crashes? You cannot just arbitrarily kill and restart a database without biological data corruption. Databases require human operational intelligence (taking backups, replicating data, running schema migrations).

<Callout icon="info" title="Codifying Human Intelligence">
  A **Kubernetes Operator** is a piece of software that mathematically replaces the human Database Administrator. 
  
  It is a custom controller written in Go that runs inside the cluster. It contains the exact mathematical logic required to safely manage complex, stateful applications. If the Postgres primary node dies, the Postgres Operator mathematically knows the exact sequence of API calls required to safely promote a read-replica to primary without losing data.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Cloud-native networking/index.mdx': `---
title: Cloud-native networking
description: The methods and technologies used to connect containers, microservices, and nodes in a cloud-native environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud-Native Networking">

In a legacy data center, servers had static, physical IP addresses. You plugged an ethernet cable into a switch.

In Kubernetes, networking is entirely **Software-Defined (SDN)**. 

Because K8s might mathematically destroy 500 containers and respawn them on different physical servers 3 seconds later, every new container gets a completely randomized IP address. Relying on static IP addresses is biologically impossible.

<Callout icon="tip" title="The CNI and CoreDNS">
  Cloud-Native Networking relies on two mathematical components:
  1. **CNI (Container Network Interface):** Plugins like Calico or Cilium that mathematically program the Linux kernel (using eBPF or iptables) to route virtual packets between randomized container IPs across different physical servers.
  2. **Service Discovery (CoreDNS):** Because IPs change constantly, microservices must communicate using mathematical DNS names (e.g., \`http://billing-service.default.svc.cluster.local\`). CoreDNS dynamically updates the IP routing table the exact millisecond a container boots.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Cloud-native storage/index.mdx': `---
title: Cloud-native storage
description: Storage systems architected specifically for cloud-native applications and orchestrated environments like Kubernetes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud-Native Storage">

Kubernetes containers are mathematically **Ephemeral**. If you save a file to \`/app/data.txt\` inside a container, and the container crashes, the file is biologically deleted forever.

This is a massive problem for Databases that mathematically require persistent disk storage.

<Callout icon="success" title="The CSI Architecture">
  Kubernetes solves this using the **CSI (Container Storage Interface)**.
  
  Instead of saving to the container's virtual filesystem, the developer mathematically requests a **Persistent Volume Claim (PVC)**. The K8s CSI plugin dynamically contacts the underlying cloud provider (e.g., AWS EBS). It mathematically provisions a physical 50GB cloud hard drive, physically detaches it, and mounts it directly into the container over the network. 
  
  If the container dies and respawns on a different server, K8s mathematically detaches the physical hard drive and re-mounts it to the new server, ensuring zero data loss.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega105() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega105().catch(console.error)
