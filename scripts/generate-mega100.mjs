import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Secret Manager/index.mdx': `---
title: Google Secret Manager
description: A highly secure, globally replicated vault designed to mathematically protect, store, and manage access to sensitive API keys, database passwords, and cryptographic certificates in GCP.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Secret Manager"
  subtitle="The Cryptographic Credential Vault"
  tags={['GCP', 'Security', 'Encryption', 'Secrets']}
>

Secret Manager mathematically decouples sensitive credentials from application code. Instead of storing a database password in a Git repository or an environment variable (where it can be dumped by a hacker), you store it in Secret Manager.

## 1. Immutable Secret Versions
When you create a Secret (e.g., TICK1DB_PASSWORDTICK1), you do not just update its value; you mathematically append a **Version**.
If you update the password, it becomes Version 2. Version 1 is not deleted; it is retained (unless explicitly destroyed). This mathematical immutability allows for instant, perfect rollbacks. If a developer deploys Version 2 of a password to Production, and the database rejects it, the developer can instantly instruct the API to revert to Version 1, restoring connectivity in seconds without manual intervention.

## 2. Principle of Least Privilege
Secret Manager is deeply integrated with GCP IAM.
You do not grant a Virtual Machine access to "all secrets." You write a strict mathematical IAM policy: *"The Service Account attached to the Billing VM is mathematically authorized to read EXACTLY TICK1projects/123/secrets/BillingAPIKey/versions/latestTICK1."* If the Billing VM is compromised by a hacker, the hacker cannot mathematically read the TICK1DatabasePasswordTICK1 secret, completely halting lateral movement within the cloud environment.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Spanner/index.mdx': `---
title: Google Cloud Spanner
description: A revolutionary, globally distributed relational database that achieves the mathematically impossible: providing strict ACID transactional consistency across continents at massive scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Spanner"
  subtitle="Global ACID Relational Database"
  tags={['GCP', 'Database', 'SQL', 'Global']}
>

The CAP Theorem mathematically states that a distributed database must trade off between Consistency and Availability. Traditional relational databases (like PostgreSQL) choose Consistency but cannot scale globally. NoSQL databases (like Cassandra) scale globally but sacrifice strict Consistency. Spanner breaks the rules.

## 1. TrueTime API (Atomic Clocks)
Spanner achieves global ACID consistency using **TrueTime**.
Every physical Google server rack running Spanner is equipped with GPS receivers and Atomic Clocks. 
When a transaction occurs in New York, Spanner uses TrueTime to mathematically assign an absolute, globally indisputable microsecond timestamp to the transaction. If a conflicting transaction occurs in Tokyo a millisecond later, the Atomic Clocks guarantee that the Tokyo server mathematically knows it happened second. This allows Spanner to serialize global transactions perfectly without the massive network latency required by traditional distributed locking mechanisms.

## 2. Horizontal SQL Scaling
Standard SQL databases (like Cloud SQL/MySQL) scale *vertically* (you must buy a bigger, more expensive CPU).
Spanner scales *horizontally*. You can write standard SQL queries (with JOINs and Foreign Keys). If your database hits 50 Terabytes, you simply add more Spanner nodes. Spanner mathematically chops the relational tables into "Splits" and distributes them across the new servers. It provides the limitless scale of NoSQL with the mathematical safety and query power of traditional SQL.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Vertex AI/index.mdx': `---
title: Google Vertex AI
description: Google's unified, enterprise-grade Machine Learning platform that mathematically consolidates the entire AI workflow, from data preparation and model training to MLOps deployment and generative AI integration.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Vertex AI"
  subtitle="The Unified MLOps Platform"
  tags={['GCP', 'Machine Learning', 'AI', 'MLOps']}
>

Vertex AI replaces legacy GCP AI services (like AI Platform) by mathematically unifying the entire Machine Learning lifecycle under a single UI and API, drastically reducing the friction of moving a model from a Jupyter Notebook to a production endpoint.

## 1. Feature Store and Model Registry
Vertex AI eliminates mathematical redundancy for Data Scientists.
- **Vertex Feature Store**: If a data engineer writes a complex mathematical pipeline to calculate "User Purchasing Power", they save that feature to the Feature Store. Other data scientists can instantly reuse this mathematically verified feature in their own models instead of rewriting the code.
- **Model Registry**: Once a model is trained, its exact mathematical weights (the TICK1.pklTICK1 or TICK1.pbTICK1 file) are versioned and stored in the Registry. This provides strict governance, proving exactly which mathematical model was running in production on any given date.

## 2. Generative AI (Gemini) Integration
Vertex AI is the enterprise gateway to Google's foundational models (like Gemini).
Unlike public ChatGPT, Vertex AI mathematically guarantees **Data Privacy**. When an enterprise uses the Vertex AI API to fine-tune the Gemini model on their private corporate documents, that data is mathematically isolated. It is never used to train Google's public models. Vertex AI provides strict IAM controls, allowing enterprises to safely integrate LLMs into highly secure, compliance-heavy applications (like healthcare or finance).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/VPC/index.mdx': `---
title: Google Virtual Private Cloud (VPC)
description: The global, software-defined networking foundation of GCP, uniquely designed to span the entire planet without requiring the complex mathematical peering connections needed in AWS or Azure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Virtual Private Cloud (VPC)"
  subtitle="The Global Cloud Network"
  tags={['GCP', 'Networking', 'VPC', 'Global']}
>

In AWS and Azure, a VPC/VNet is mathematically bound to a single physical Region (e.g., US-East). If you want a server in London to talk to a server in Tokyo privately, you must create a complex VPC Peering connection. Google VPCs fundamentally alter this math.

## 1. Global by Default
A Google Cloud VPC is **Global**. 
When you create a VPC (e.g., TICK1my-global-networkTICK1), it mathematically spans every single Google data center on Earth simultaneously. 
You can create a Subnet in Tokyo (TICK110.1.0.0/24TICK1) and a Subnet in London (TICK110.2.0.0/24TICK1) *inside the exact same VPC*. 
A Virtual Machine in Tokyo can ping a Virtual Machine in London using purely its internal Private IP address. The traffic routes instantly across Google's private, encrypted underwater fiber-optic backbone without a single VPN, Peering Connection, or Transit Gateway required.

## 2. Premium vs. Standard Network Tiers
GCP allows you to mathematically choose your routing physics:
- **Premium Tier**: The default. A user's packet in Australia enters Google's private fiber network at the closest Edge Node in Sydney. It travels across the ocean on Google's private, uncongested cables to your server in New York, guaranteeing ultra-low latency.
- **Standard Tier**: The packet travels across the chaotic, public internet (bouncing across dozens of third-party ISPs) and only enters Google's network in New York. It is mathematically slower and less reliable, but significantly cheaper for outbound bandwidth.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/API Gateway/index.mdx': `---
title: OCI API Gateway
description: A highly available, serverless network appliance in Oracle Cloud mathematically designed to route, secure, and rate-limit HTTP traffic before it reaches backend microservices or Oracle Functions.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI API Gateway"
  subtitle="Secure Microservice Routing"
  tags={['OCI', 'Networking', 'API', 'Security']}
>

If you have 50 microservices running on OCI (Oracle Cloud Infrastructure), you do not want 50 different public IP addresses exposed to the internet. API Gateway provides a single, mathematically secure point of entry.

## 1. Request Routing and Transformation
The API Gateway mathematically intercepts the incoming HTTP packet.
If a user requests TICK1api.com/v1/usersTICK1, the Gateway evaluates its mathematical routing table. It can route the traffic to a Virtual Machine, a Kubernetes Cluster (OKE), or trigger a serverless Oracle Function. Furthermore, it can mathematically transform the request on the fly. If an old client sends an XML payload, the API Gateway can execute a mathematical transformation policy to convert the XML into JSON before handing it to the modern backend microservice, eliminating the need to update the backend code.

## 2. Rate Limiting and Authentication
APIs must be protected from DDoS attacks and brute-force abuse.
You can configure a mathematical **Rate Limit** policy on the Gateway: *"Limit IP Address X to exactly 10 requests per second."* If the user exceeds this, the Gateway instantly drops the packets and returns a TICK1429 Too Many RequestsTICK1 error. 
Additionally, the Gateway can integrate with Oracle Identity Cloud Service (IDCS). It mathematically verifies the cryptographic signature of the incoming JWT (JSON Web Token) at the edge. If the token is invalid, the request is destroyed before it ever touches your backend servers, saving massive amounts of compute.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Autonomous Database/index.mdx': `---
title: Oracle Autonomous Database
description: Oracle's flagship, self-driving cloud database service that utilizes advanced machine learning to mathematically automate tuning, patching, and scaling without human intervention.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Oracle Autonomous Database"
  subtitle="The Self-Driving Database"
  tags={['OCI', 'Database', 'SQL', 'Autonomous']}
>

Traditionally, Oracle Databases required an army of highly paid Database Administrators (DBAs) to mathematically tune indexes, allocate memory, and apply security patches. The Autonomous Database uses Machine Learning to replace the DBA.

## 1. Self-Tuning and Self-Securing
The Autonomous Database continuously monitors its own mathematical performance.
If it detects that a specific TICK1SELECTTICK1 query is running slowly, the internal AI mathematically analyzes the execution plan, automatically creates the necessary Index to speed up the query, and tests it. If the index works, it keeps it; if not, it drops it. 
Furthermore, it is **Self-Securing**. The moment Oracle releases a critical security patch, the Autonomous Database mathematically applies the patch to itself in the background with zero downtime, guaranteeing protection against zero-day exploits without waiting for human approval.

## 2. ATP vs. ADW
Oracle mathematically optimizes the Autonomous Database into two distinct architectures based on the workload:
- **Autonomous Transaction Processing (ATP)**: Mathematically optimized for OLTP (Online Transaction Processing). It is designed to handle millions of tiny, rapid read/write operations (e.g., e-commerce checkouts) utilizing row-based caching.
- **Autonomous Data Warehouse (ADW)**: Mathematically optimized for OLAP (Online Analytical Processing). It uses columnar storage and massively parallel processing to scan billions of rows for complex BI reporting, completely ignoring rapid, single-row inserts.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Availability domains/index.mdx': `---
title: OCI Availability Domains
description: The foundational physical architecture of Oracle Cloud Infrastructure, representing distinct, highly isolated data centers within a region designed for mathematical fault tolerance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Availability Domains"
  subtitle="Physical Data Center Isolation"
  tags={['OCI', 'Architecture', 'Infrastructure', 'Reliability']}
>

An Oracle Cloud Region (e.g., US-Ashburn-1) is a geographic area. Inside that geographic area, OCI mathematically distributes its hardware into isolated physical buildings called **Availability Domains (ADs)**.

## 1. Absolute Physical Isolation
An Availability Domain is the exact equivalent of an AWS Availability Zone.
If an OCI Region has 3 Availability Domains (AD 1, AD 2, AD 3), they are physically separated by several miles. They do not share power grids, cooling systems, or network switches. The mathematical premise is absolute isolation: If a massive fire completely destroys AD 1, the physical destruction has a 0% mathematical probability of affecting AD 2 or AD 3. 
To achieve High Availability (HA), cloud architects must deploy their Web Servers mathematically across at least two ADs, placing a Load Balancer in front of them.

## 2. Fault Domains
Within a single Availability Domain, Oracle further mathematically subdivides the hardware into **Fault Domains**.
A Fault Domain is a grouping of physical hardware (racks of servers). Every AD has exactly 3 Fault Domains. If you deploy two Virtual Machines into AD 1, and you place them both in Fault Domain 1, a single power supply failure on that specific rack could take down both VMs. By mathematically forcing VM 1 into Fault Domain 1, and VM 2 into Fault Domain 2, you guarantee they are on different physical racks, protecting against localized hardware failure within the same building.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Block Volumes/index.mdx': `---
title: OCI Block Volumes
description: High-performance, mathematically durable, persistent block storage networks that act as the physical hard drives for Oracle Cloud Compute instances.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Block Volumes"
  subtitle="Persistent Network Hard Drives"
  tags={['OCI', 'Storage', 'Block', 'Compute']}
>

OCI Block Volumes are the exact equivalent of AWS EBS. When you provision a Virtual Machine in Oracle Cloud, its primary "C: Drive" or "/dev/sda" is not physically inside the server; it is a Block Volume attached via a hyper-fast iSCSI network connection.

## 1. Dynamic Performance Scaling
In most clouds, if you want a faster hard drive, you have to provision a massively large hard drive (because IOPS are tied to Gigabytes) or pay exorbitant fees for provisioned IOPS.
OCI Block Volumes offer a unique mathematical advantage: **Dynamic Performance Scaling**. 
Using the OCI Console, you can move a slider to instantly change the Volume Performance Unit (VPU) from "Lower Cost" to "Balanced" to "Higher Performance" (ultra-high IOPS). The mathematical change happens instantly on the fly, with zero downtime. You can crank up the IOPS right before running a massive database batch job, and crank it back down an hour later to save money.

## 2. Volume Groups and Consistent Backups
If an enterprise application spans multiple disks (e.g., Disk 1 has the database files, Disk 2 has the transaction logs), taking independent backups is dangerous. If the backups are taken 5 seconds apart, the mathematical state of the database is corrupted.
OCI provides **Volume Groups**. You mathematically group multiple Block Volumes together. When you trigger a backup, OCI executes a **Crash-Consistent** snapshot across all volumes in the group at the exact same mathematical millisecond, guaranteeing the backup is transactionally safe and restorable.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Compartments/index.mdx': `---
title: OCI Compartments
description: A fundamental, mathematically rigorous logical isolation feature unique to Oracle Cloud, used to strictly organize and secure cloud resources across an entire enterprise.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Compartments"
  subtitle="Logical Resource Isolation"
  tags={['OCI', 'Security', 'Governance', 'IAM']}
>

In AWS, if you want to completely isolate the "HR Team" from the "DevOps Team", you generally create two entirely separate AWS Accounts. OCI handles this mathematically within a single Tenancy (Account) using **Compartments**.

## 1. Logical Boundaries
A Compartment is a logical, mathematical folder. It is not a physical network boundary.
When you create a Virtual Machine, a Database, or a Virtual Cloud Network (VCN), you *must* mathematically place it into a specific Compartment (e.g., TICK1Production_CompartmentTICK1). 
You then apply IAM Policies strictly to the Compartment: *"Allow the 'DevOps_Group' to manage all Virtual Machines inside the 'Production_Compartment'."* If a DevOps engineer tries to delete a VM in the TICK1HR_CompartmentTICK1, the mathematical IAM evaluation strictly blocks the action.

## 2. Hierarchical Nesting and Quotas
Compartments can be mathematically nested up to 6 levels deep. 
(e.g., TICK1Root -> Finance -> Analytics -> SandboxTICK1).
This allows for massive enterprise governance. You can apply a **Quota Policy** at the TICK1FinanceTICK1 level: *"Mathematically restrict this compartment and all its children to a maximum of 50 CPU cores."* This absolute mathematical ceiling prevents a junior developer in the Sandbox from accidentally spinning up 1,000 GPUs and bankrupting the company.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Compute/index.mdx': `---
title: OCI Compute
description: Oracle Cloud's foundational Infrastructure as a Service (IaaS), providing extreme-performance Virtual Machines and Bare Metal servers powered by a custom-built off-box virtualization architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Compute"
  subtitle="Bare Metal and Virtual Machines"
  tags={['OCI', 'Compute', 'IaaS', 'Bare Metal']}
>

OCI Compute provides the raw processing power for the Oracle Cloud. However, OCI's underlying architecture was built much later than AWS, allowing Oracle to implement a vastly different mathematical approach to hypervisor design.

## 1. Off-Box Virtualization
In a traditional cloud (like early AWS), the Hypervisor (the software that splits the physical server into Virtual Machines) runs on the main CPU. This mathematically consumes 10-20% of the server's compute power and creates potential security vulnerabilities.
OCI utilizes **Off-Box Virtualization**. Oracle physically moved the network and storage virtualization math off the main CPU and onto a dedicated custom silicon card (a SmartNIC). 
This means if you rent an OCI Virtual Machine, the hypervisor consumes exactly 0% of the CPU. You get mathematically perfect, unadulterated access to the raw CPU power.

## 2. Bare Metal Servers
Because of this Off-Box Virtualization, OCI is famous for its **Bare Metal** offerings.
You can rent an entire, massive physical server (e.g., 128 cores, 2 Terabytes of RAM). There is absolutely zero hypervisor software installed on the main CPU by Oracle. You have 100% mathematical root access to the bare physical hardware, exactly as if it were sitting in your own data center. This is strictly required for extreme-performance workloads like massive Oracle RAC databases, high-frequency trading, and heavy VMware migrations that cannot tolerate a single microsecond of hypervisor latency.

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
