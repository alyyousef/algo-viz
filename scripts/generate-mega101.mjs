import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Compute shapes/index.mdx': `---
title: OCI Compute Shapes
description: The mathematical template in Oracle Cloud that defines the exact number of CPU cores and amount of RAM allocated to a Virtual Machine or Bare Metal server.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Compute Shapes"
  subtitle="Hardware Resource Definitions"
  tags={['OCI', 'Compute', 'Hardware', 'Virtualization']}
>

In OCI, you do not just "launch a VM." You must select a **Shape**, which is a strict mathematical definition of the underlying hardware architecture your instance will use.

## 1. Fixed vs. Flexible Shapes
Historically, cloud providers forced users into **Fixed Shapes** (e.g., you must buy 4 CPUs with 16GB of RAM). If your app needed 4 CPUs but 32GB of RAM, you had to overpay for an 8-CPU shape.
OCI revolutionized this with **Flexible Shapes** (often based on AMD EPYC processors). When provisioning an OCI instance, you use two separate sliders in the UI. You mathematically dictate: *"Give me exactly 7 OCPUs, and exactly 22 GB of RAM."* OCI's hypervisor dynamically carves out that exact bespoke hardware profile, ensuring you never pay for mathematically wasted resources.

## 2. OCPU vs. vCPU Mathematics
When comparing clouds, the math of a CPU is critical.
AWS and Azure use **vCPUs** (Virtual CPUs). A vCPU represents a single hardware *Thread* on a processor core.
Oracle uses **OCPUs** (Oracle Compute Units). An OCPU represents an entire physical hardware *Core*, which typically contains 2 Threads (Hyperthreading). Therefore, 1 OCPU is mathematically equivalent to 2 AWS vCPUs. When an OCI Shape says "4 OCPUs", you are actually getting the raw processing power of 8 vCPUs on competing clouds.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Container Instances/index.mdx': `---
title: OCI Container Instances
description: A fully managed, serverless compute service in Oracle Cloud designed to quickly and easily run isolated Docker containers without managing any underlying infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Container Instances"
  subtitle="Serverless Docker Execution"
  tags={['OCI', 'Containers', 'Serverless', 'Compute']}
>

Container Instances is OCI's direct equivalent to AWS Fargate or Azure Container Instances. It provides raw, serverless execution of Docker containers for developers who do not want to manage the intense complexity of a Kubernetes (OKE) cluster.

## 1. The Serverless Architecture
With Container Instances, there are no Virtual Machines to provision, no OS patches to apply, and no orchestration layers to manage.
You simply provide OCI with a container image from a registry and specify a mathematical hardware requirement (e.g., TICK12 OCPUs, 16GB RAMTICK1). OCI instantly provisions a hypervisor-isolated micro-VM, boots the container, executes the workload, and terminates it. You are billed purely by the mathematical second of execution time.

## 2. Use Cases and Limitations
Because there is no orchestration (like Kubernetes), Container Instances are not designed for massive, highly available microservice meshes.
They are mathematically perfect for:
- **Batch Processing**: Spinning up 50 containers at midnight to process PDF reports, then instantly terminating them to save money.
- **CI/CD Pipelines**: Running isolated, ephemeral build agents for Jenkins or GitLab.
- **Simple Web APIs**: Hosting a lightweight, stateless REST API that does not require complex internal networking or service discovery.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/DRG/index.mdx': `---
title: Dynamic Routing Gateway (DRG)
description: A massive, centralized virtual router in Oracle Cloud mathematically engineered to establish private, encrypted network connections between OCI VNets and on-premise corporate data centers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Dynamic Routing Gateway (DRG)"
  subtitle="The Enterprise Network Hub"
  tags={['OCI', 'Networking', 'Routing', 'Hybrid Cloud']}
>

A Virtual Cloud Network (VCN) is an isolated island. If an enterprise wants their on-premise physical office network to securely talk to their OCI databases without touching the public internet, they must route traffic through a DRG.

## 1. Hybrid Cloud Connectivity
The DRG acts as the mathematical anchor point for two types of private connections:
- **IPSec VPN**: A software-based, mathematically encrypted tunnel over the public internet. Cheap, but subject to internet latency fluctuations.
- **OCI FastConnect**: A physical, dedicated fiber-optic cable running directly from your corporate data center into the Oracle Cloud data center. It bypasses the internet entirely, guaranteeing massive mathematical bandwidth (up to 100 Gbps) and ultra-low latency for critical enterprise workloads.

## 2. Hub-and-Spoke Routing
Historically, if you had 50 VCNs in Oracle Cloud, connecting them all required a massive, mathematically complex web of VCN Peering connections (a full mesh).
The modern DRG acts as a centralized **Hub router**. You mathematically attach all 50 VCNs (the Spokes) directly to the DRG. You also attach your on-premise FastConnect to the DRG. The DRG handles the mathematical routing tables, allowing VCN A to talk to VCN B, and VCN C to talk to the on-premise data center, all through a single, easily manageable central routing appliance.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Dynamic groups/index.mdx': `---
title: OCI Dynamic Groups
description: A mathematically rigorous IAM construct in Oracle Cloud that automatically grants permissions to cloud resources based on strict matching rules, eliminating the need to hardcode credentials.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Dynamic Groups"
  subtitle="Identity for Cloud Resources"
  tags={['OCI', 'Security', 'IAM', 'Identity']}
>

In AWS, if a Virtual Machine needs to read an S3 bucket, you assign an IAM Role to the VM. OCI handles this mathematically differently through the use of **Dynamic Groups**.

## 1. Mathematical Matching Rules
Instead of explicitly assigning a role to a specific Virtual Machine, you create a Dynamic Group based on a **Matching Rule**.
You define a mathematical rule: *"Any Virtual Machine that exists inside the 'Production_Compartment' is automatically a member of this Dynamic Group."*
When a new VM boots up inside that compartment, the OCI Identity system evaluates the mathematical rule, sees a match, and instantly injects the VM into the group. If the VM is moved to a different compartment, it mathematically falls out of the group and loses its permissions instantly.

## 2. Secure Resource Authentication
Once the Dynamic Group is created, you write a standard IAM Policy: *"Allow Dynamic Group 'Prod_VMs' to read Object Storage."*
When the Virtual Machine attempts to download a file, it does not use a hardcoded API key or password. It mathematically requests a short-lived, cryptographically signed token from the OCI metadata service. OCI verifies the VM's membership in the Dynamic Group and grants the token. This guarantees absolute zero-trust security and completely eliminates credential leakage in source code.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Fault domains/index.mdx': `---
title: OCI Fault Domains
description: A critical mathematical sub-division of physical infrastructure within an OCI Availability Domain, guaranteeing that cloud resources are spread across different physical server racks to prevent localized hardware failures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Fault Domains"
  subtitle="Anti-Affinity Hardware Placement"
  tags={['OCI', 'Architecture', 'Infrastructure', 'Reliability']}
>

Deploying two Virtual Machines into a single data center (Availability Domain) is dangerous. If they accidentally land on the exact same physical server rack, a single power supply failure will take down both VMs simultaneously. Fault Domains mathematically prevent this.

## 1. The Rule of Three
Every Availability Domain in Oracle Cloud is mathematically divided into exactly **Three Fault Domains**.
A Fault Domain represents a grouping of physical hardware that shares a single point of failure (e.g., a shared Top-of-Rack network switch, or a shared power distribution unit). 
When you provision a new Virtual Machine, you can explicitly tell OCI: *"Place this VM in Fault Domain 1."* When you provision your backup VM, you dictate: *"Place this VM in Fault Domain 2."* OCI's hypervisor mathematically guarantees that those two VMs will never physically touch the same hardware rack.

## 2. Automated Anti-Affinity
If you use OCI Instance Pools (Auto Scaling), you do not have to manually specify Fault Domains. 
The mathematical engine handles it automatically. If the auto-scaler decides to boot 3 new web servers to handle a traffic spike, the OCI Control Plane will mathematically distribute them evenly: one in Fault Domain 1, one in Fault Domain 2, and one in Fault Domain 3. This guarantees maximum physical high availability without requiring the cloud architect to manually manage server placement.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/File Storage/index.mdx': `---
title: OCI File Storage (FSS)
description: A fully managed, highly scalable, POSIX-compliant elastic file system in Oracle Cloud that allows thousands of servers to concurrently mount and share data via the NFS protocol.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI File Storage (FSS)"
  subtitle="Managed Network File System"
  tags={['OCI', 'Storage', 'File', 'NFS']}
>

While Block Volumes can only be attached to a single Virtual Machine at a time, OCI File Storage (FSS) is a shared network drive. It mathematically allows 10,000 different Virtual Machines to read and write to the exact same folder simultaneously.

## 1. Elastic Scaling and NFSv3
FSS uses the standard Network File System (NFSv3) protocol. 
To a Linux Virtual Machine, the FSS volume looks exactly like a local hard drive (e.g., mounted at TICK1/shared/dataTICK1).
The most powerful mathematical feature of FSS is its **Elasticity**. You do not provision a 500GB drive. The drive starts at 0 bytes. As you write files, the underlying hardware mathematically expands up to 8 Exabytes. You are billed purely by the exact byte count resting on the disk at the end of the month, eliminating the mathematical waste of provisioning empty storage space.

## 2. Export Options and Security
Because FSS is a network drive, security is paramount. If you are not careful, any VM in the network can mount it.
FSS uses **Export Options** to enforce mathematical security at the IP level. You define strict rules: *"Only Virtual Machines with the IP address TICK110.0.1.5TICK1 are mathematically allowed to mount this drive with Read/Write permissions. All other IPs in the subnet are strictly Read-Only."* This guarantees that a compromised web server cannot maliciously delete files off the shared corporate drive.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Functions/index.mdx': `---
title: OCI Functions
description: Oracle's serverless, event-driven compute platform, built on the open-source Fn Project, allowing developers to execute stateless code mathematically scaled by the cloud infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Functions"
  subtitle="Serverless Event-Driven Compute"
  tags={['OCI', 'Serverless', 'Compute', 'Functions']}
>

OCI Functions is Oracle's equivalent to AWS Lambda. It allows developers to deploy discrete blocks of code (Java, Python, Node.js) and pay exactly $0 until the code is actually triggered by a cloud event.

## 1. The Fn Project Architecture
Unlike AWS Lambda (which uses proprietary, closed-source hypervisors), OCI Functions is built entirely on the **open-source Fn Project**.
Every OCI Function is mathematically just a Docker container under the hood. When you deploy a function, the OCI CLI packages your Python code into a Docker image and pushes it to the OCI Container Registry. When the function is triggered, OCI simply pulls the Docker image, boots it in a hyper-isolated micro-VM, executes it, and destroys it. Because it is standard Docker, you can run the exact same serverless function locally on your laptop for testing, completely preventing vendor lock-in.

## 2. Event Integration and Triggers
A Function requires a mathematical trigger.
It natively integrates with OCI Events. You can define a rule: *"When a new CSV file is uploaded to an Object Storage Bucket, intercept the Event, route it to this specific Function, and mathematically parse the CSV into an Autonomous Database."* If 1,000 CSV files are uploaded in the same second, OCI Functions mathematically boots 1,000 parallel Docker containers, processes the files instantly, and scales back to zero, maximizing throughput and minimizing cost.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/IAM/index.mdx': `---
title: OCI Identity and Access Management (IAM)
description: The mathematical security foundation of Oracle Cloud, utilizing strict human-readable policies to dictate exactly which users and groups can manage specific resources within compartmentalized boundaries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Identity and Access Management (IAM)"
  subtitle="Cloud Security Governance"
  tags={['OCI', 'Security', 'Identity', 'Governance']}
>

Without IAM, anyone with the cloud console URL could delete your entire corporate database. OCI IAM is the mathematical gatekeeper that authenticates identities and authorizes their actions.

## 1. Human-Readable Policies
In AWS, IAM policies are written in massive, nested, mathematically complex JSON objects that are notoriously difficult to read. 
OCI took a fundamentally different architectural approach. OCI Policies are written in a **human-readable, SQL-like syntax**.
TICK3sql
Allow group 'Database_Admins' to manage autonomous-database in compartment 'Production'
TICK3
This statement is mathematically parsed by the OCI authorization engine. It clearly defines the Subject (the group), the Verbs (manage), the Resource (autonomous-database), and the Location (compartment). This drastically reduces the cognitive load on security auditors trying to prove exactly who has access to what.

## 2. The Identity Domains Evolution
Historically, OCI had two separate identity systems: OCI IAM (for raw cloud resources like VMs) and Oracle Identity Cloud Service (IDCS, for human SaaS applications like ERPs).
Oracle mathematically merged these into **Identity Domains**. A single Identity Domain now provides full enterprise SSO (Single Sign-On), MFA (Multi-Factor Authentication), and user lifecycle management. If an employee is terminated in the HR system, their Identity Domain account is disabled, and they instantly, mathematically lose access to both their corporate email and their OCI Virtual Machines simultaneously.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Images/index.mdx': `---
title: OCI Custom Images
description: A mathematically exact snapshot of a Virtual Machine's boot disk, used as a golden template to rapidly and consistently provision thousands of identical servers in Oracle Cloud.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Custom Images"
  subtitle="Virtual Machine Golden Templates"
  tags={['OCI', 'Compute', 'Infrastructure', 'Virtualization']}
>

If you need 50 web servers, manually installing Linux, Nginx, and your corporate security software 50 times is mathematically absurd. Custom Images automate this process perfectly.

## 1. The Golden Image Workflow
You boot a single, vanilla Oracle Linux Virtual Machine. 
You manually install all your necessary software, update the OS patches, and configure the firewalls exactly to your corporate specifications. 
You then instruct OCI to "Create Image." OCI mathematically pauses the VM and takes a bit-for-bit snapshot of the underlying Block Volume. This snapshot becomes a **Custom Image** stored permanently in OCI Object Storage. You can now use this exact mathematical template to boot 50 identical VMs in under 2 minutes.

## 2. Bring Your Own Image (BYOI)
Enterprises often have complex, legacy virtual machines running in on-premise VMWare data centers.
OCI supports **Bring Your Own Image (BYOI)**. You can take a mathematical export of a VMWare VM (e.g., a TICK1.vmdkTICK1 or TICK1.qcow2TICK1 file), upload it to an OCI Object Storage bucket, and instruct OCI to mathematically convert it into a native Custom Image. This allows enterprises to lift-and-shift legacy 10-year-old operating systems directly into the cloud without rewriting their underlying architecture.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Internet Gateway/index.mdx': `---
title: OCI Internet Gateway
description: A highly available, software-defined virtual router that mathematically bridges the gap between an isolated Oracle Virtual Cloud Network (VCN) and the public internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Internet Gateway"
  subtitle="The Bridge to the Public Web"
  tags={['OCI', 'Networking', 'Routing', 'Internet']}
>

When you create a Virtual Cloud Network (VCN) in OCI, it is completely mathematically isolated. It has no physical or logical connection to the outside world. An Internet Gateway provides the doorway to the public web.

## 1. Network Address Translation (NAT)
A Web Server running inside your VCN has a Private IP address (e.g., TICK110.0.0.5TICK1). The global internet does not know how to route packets to a Private IP.
When you assign a Public IP address to that Web Server, the server itself still only knows about TICK110.0.0.5TICK1. 
The Internet Gateway sits at the edge of the VCN. When a packet leaves the Web Server destined for Google, the Gateway mathematically performs 1-to-1 NAT. It strips off the Private IP header, applies the Public IP header, and fires the packet onto the internet. When the response comes back, it mathematically reverses the process.

## 2. Route Table Enforcement
Simply attaching an Internet Gateway to a VCN does not give your servers internet access. 
You must mathematically authorize the traffic using a **Route Table**. You create a Route Table for the Web Server's Subnet and add a rule: *"If a packet is destined for TICK10.0.0.0/0TICK1 (anywhere on the internet), forward it to the Internet Gateway."*
If a Subnet does *not* have this Route Table rule, it is mathematically defined as a **Private Subnet**. Even if you attach an Internet Gateway to the VCN, it is physically impossible for internet traffic to reach servers in that specific Private Subnet, guaranteeing deep architectural security.

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
