import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Key Vault/index.mdx': `---
title: Azure Key Vault
description: Microsoft's centralized, mathematically secure cloud service for safely storing, strictly controlling, and cryptographically managing API keys, database passwords, and TLS certificates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Key Vault"
  subtitle="The Cryptographic Credential Store"
  tags={['Azure', 'Security', 'Encryption', 'Secrets']}
>

If a developer accidentally commits a database connection string to a public GitHub repository, a hacker can compromise the corporate database in seconds. Key Vault mathematically prevents this by completely removing credentials from the application code.

## 1. Hardware Security Modules (HSMs)
When you store a highly sensitive cryptographic key in Key Vault (e.g., the Master Key for encrypting a database), Azure does not store it on a standard hard drive. 
The key is physically injected into a **FIPS 140-2 Level 2 validated Hardware Security Module (HSM)**. These are tamper-proof physical appliances. When an application needs to decrypt data, it does not download the key. It sends the encrypted data to the Key Vault API. The physical HSM mathematically decrypts the data internally and returns the plaintext, guaranteeing the raw key never physically leaves the silicon.

## 2. Certificate Auto-Rotation
Managing HTTPS (TLS) certificates is notoriously error-prone; if a cert expires, the website goes offline.
Key Vault integrates natively with Certificate Authorities (like DigiCert). You can configure a mathematical rule: *"When this certificate is 30 days away from expiring, automatically request a new one."* Key Vault generates a new private key, requests the new certificate, and mathematically pushes it out to your Azure App Services and Application Gateways, providing true zero-touch, zero-downtime certificate rotation.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Load Balancer/index.mdx': `---
title: Azure Load Balancer
description: A high-performance, ultra-low latency Layer 4 load balancer that mathematically distributes incoming TCP and UDP network traffic across a cluster of backend virtual machines.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Load Balancer"
  subtitle="Layer 4 Network Routing"
  tags={['Azure', 'Networking', 'TCP', 'Routing']}
>

While Azure Application Gateway operates at Layer 7 (HTTP) and understands URLs, Azure Load Balancer operates purely at **Layer 4 (TCP/UDP)**. It does not know what an HTTP request is; it only understands raw IP addresses and ports, making it mathematically blisteringly fast.

## 1. The Hash-Based Distribution Algorithm
When a packet hits the Azure Load Balancer, it must decide which backend Virtual Machine to send it to.
It uses a **5-tuple mathematical hash** by default:
1. Source IP
2. Source Port
3. Destination IP
4. Destination Port
5. Protocol (TCP/UDP)
The load balancer runs this hash equation instantly in hardware. The mathematical result guarantees that all packets belonging to a specific user's TCP connection will be strictly routed to the exact same backend server for the duration of the session, preventing broken TCP handshakes.

## 2. Internal vs. Public
- **Public Load Balancer**: Maps a Public IP address to a pool of backend servers (e.g., routing internet traffic to your web servers).
- **Internal Load Balancer**: Maps a Private IP address to a pool of servers (e.g., routing your web servers' internal traffic to a highly available cluster of database servers). Internal Load Balancers are mathematically isolated from the internet, guaranteeing absolute backend security.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Log Analytics/index.mdx': `---
title: Azure Log Analytics
description: The massive, centralized mathematical data engine powering Azure Monitor, capable of ingesting terabytes of unstructured log data and executing blazing-fast columnar queries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Log Analytics"
  subtitle="The Big Data Log Engine"
  tags={['Azure', 'Monitoring', 'Logs', 'KQL']}
>

If you have 100 Virtual Machines, they generate massive text files containing Windows Event Logs or Linux Syslogs. SSHing into 100 machines to grep for an error is impossible. Log Analytics provides a single, mathematically unified database for all logs.

## 1. The Log Analytics Workspace
A Workspace is the physical boundary of your log data.
You install a tiny agent on your Virtual Machines (or configure diagnostic settings on your PaaS services like SQL Database). These resources continuously stream their JSON and text logs directly into the central Workspace. The Workspace mathematically indexes the text fields, transforming unstructured chaos into a highly organized, queryable schema.

## 2. Machine Learning and Anomaly Detection
Because Log Analytics uses the Kusto Query Language (KQL), it can do more than just search text; it can execute complex math.
Using the TICK1series_decompose_anomalies()TICK1 KQL function, you can mathematically analyze 30 days of API response times. The query engine instantly applies machine learning algorithms to the dataset, identifying baseline patterns, and returns a visual chart highlighting the exact 5-minute window where response times mathematically deviated from the historical norm, allowing for proactive, AI-driven troubleshooting.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/NSGs/index.mdx': `---
title: Network Security Groups (NSGs)
description: The fundamental, stateful virtual firewall in Azure that mathematically filters inbound and outbound network traffic to and from Azure resources within a Virtual Network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Network Security Groups (NSGs)"
  subtitle="The Virtual Network Firewall"
  tags={['Azure', 'Security', 'Networking', 'Firewall']}
>

An NSG is Azure's equivalent to AWS Security Groups (and loosely, NACLs). It is a list of mathematical rules that the Azure software-defined network hypervisor enforces before a packet is ever allowed to touch the operating system of a Virtual Machine.

## 1. Subnet vs. NIC Attachment
Unlike AWS (which splits Security Groups and NACLs), an Azure NSG can be mathematically attached in two places:
- **To a Subnet**: The rules apply to every single VM inside that entire subnet (like an AWS NACL).
- **To a Network Interface (NIC)**: The rules apply strictly to one specific Virtual Machine.
If a packet enters a subnet, it must mathematically pass the Subnet NSG *first*. If it passes, it must then mathematically pass the NIC NSG. If either one has a "Deny" rule, the packet is instantly destroyed.

## 2. Default Rules and Priorities
NSG rules are processed in strict mathematical order based on a Priority Number (100 to 4096). The lowest number wins.
Azure implicitly includes mathematical default rules (Priority 65000+):
- **Allow VNet Inbound**: All VMs inside a Virtual Network can ping each other by default.
- **Allow Internet Outbound**: All VMs can access the internet to download updates.
- **Deny All Inbound**: Everything else from the internet is strictly blocked.
To allow web traffic, you must explicitly create a Priority 100 rule allowing Port 443 (HTTPS), which mathematically overrides the Priority 65500 "Deny All" rule.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Service Bus/index.mdx': `---
title: Azure Service Bus
description: An enterprise-grade, highly reliable cloud messaging broker designed to mathematically decouple complex microservices, ensuring guaranteed message delivery, ordering, and transaction safety.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Service Bus"
  subtitle="Enterprise Message Broker"
  tags={['Azure', 'Messaging', 'Queues', 'Enterprise']}
>

While Azure Event Grid handles lightweight, fire-and-forget events, Service Bus is designed for high-value transactional data (like processing a $10,000 wire transfer) where mathematical certainty of delivery is required.

## 1. Queues and Dead-Lettering
A Service Bus **Queue** provides strict First-In-First-Out (FIFO) mathematically ordered processing.
When a Web API receives an order, it drops a JSON message into the Queue and returns. The backend worker pulls the message.
If the worker crashes while processing the order 10 times in a row, Service Bus realizes the code is broken. To prevent the poison message from mathematically blocking the entire queue forever, it automatically moves the message to a **Dead-Letter Queue (DLQ)**. Engineers can safely inspect the DLQ later to figure out why the JSON payload crashed the backend, ensuring zero data loss.

## 2. Topics and Subscriptions
For Pub/Sub scenarios, Service Bus uses **Topics**.
The Publisher sends one message to a Topic. The Topic mathematically duplicates the message into multiple **Subscriptions**.
- The "Inventory Subscription" receives a copy.
- The "Billing Subscription" receives a copy.
Each Subscription acts as its own independent, isolated Queue. If the Billing service is down for 3 hours, its Subscription safely holds the messages. The Inventory service continues operating at full speed, completely decoupled from the mathematical failure of the Billing system.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Storage Accounts/index.mdx': `---
title: Azure Storage Accounts
description: The foundational mathematical container in Azure that groups together Blob, File, Queue, and Table storage under a single unified API endpoint and billing structure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Storage Accounts"
  subtitle="The Unified Data Container"
  tags={['Azure', 'Storage', 'Infrastructure']}
>

In AWS, S3 and EFS are completely separate services. In Azure, a **Storage Account** is a single, unified mathematical namespace that houses four distinct storage paradigms simultaneously.

## 1. The Four Storage Pillars
When you create a Storage Account (e.g., TICK1mystorageTICK1), Azure generates four unique API endpoints:
- **Blob** (TICK1mystorage.blob.core.windows.netTICK1): Massive unstructured object storage (like AWS S3).
- **File** (TICK1mystorage.file.core.windows.netTICK1): SMB network shares for mounting drives to Windows/Linux.
- **Queue** (TICK1mystorage.queue.core.windows.netTICK1): Simple, lightweight messaging queues.
- **Table** (TICK1mystorage.table.core.windows.netTICK1): A massive, schema-less NoSQL Key/Value store (the predecessor to Cosmos DB).
By grouping these together, an administrator can apply a single IAM policy or network firewall rule mathematically across all four services at once.

## 2. Redundancy Mathematics
Storage Accounts provide strict mathematical guarantees against physical hardware failure:
- **LRS (Locally Redundant Storage)**: 3 exact copies of your data within a single data center.
- **ZRS (Zone-Redundant Storage)**: 3 copies spread across 3 entirely different data centers in the same city.
- **GRS (Geo-Redundant Storage)**: 3 copies in your primary region, and another 3 copies asynchronously replicated to a secondary region 500 miles away (e.g., East US and West US). If a hurricane destroys the entire East Coast, your data survives mathematically on the West Coast.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Subnets/index.mdx': `---
title: Azure Subnets
description: The logical, mathematical segmentation of an Azure Virtual Network (VNet) used to isolate resources, enforce strict security perimeters, and control the flow of IP traffic.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Subnets"
  subtitle="Network Segmentation"
  tags={['Azure', 'Networking', 'VNet', 'Security']}
>

You cannot deploy a Virtual Machine directly into a Virtual Network (VNet). You must deploy it into a Subnet—a mathematically defined, smaller slice of the VNet's IP address space.

## 1. CIDR Slicing
If your VNet is defined as TICK110.0.0.0/16TICK1 (65,536 IPs), you mathematically carve it into Subnets.
- Web Subnet: TICK110.0.1.0/24TICK1 (256 IPs)
- Database Subnet: TICK110.0.2.0/24TICK1 (256 IPs)
Unlike AWS (where subnets are strictly tied to a single physical Availability Zone), Azure Subnets **span the entire region**. A single Azure Subnet can contain VMs physically located in Zone 1, Zone 2, and Zone 3 simultaneously. This drastically simplifies the mathematical complexity of high-availability network design compared to AWS.

## 2. Subnet Delegation
Some managed Azure PaaS services (like Azure App Service or Azure PostgreSQL) require strict control over their network environment.
Azure uses **Subnet Delegation**. You mathematically hand over absolute control of a specific Subnet to the Azure PaaS service. You cannot deploy your own VMs into a delegated subnet; the Azure software hypervisor assumes total control over that IP space, injecting its managed servers directly into your private network while maintaining strict isolation.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Synapse/index.mdx': `---
title: Azure Synapse Analytics
description: A massive, unified enterprise analytics service that mathematically combines Big Data processing (Apache Spark) with enterprise data warehousing (SQL) into a single, cohesive workspace.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Synapse Analytics"
  subtitle="Unified Big Data & Data Warehousing"
  tags={['Azure', 'Data', 'Analytics', 'Big Data']}
>

Historically, data engineers had to stitch together Azure Data Factory (for moving data), Azure Databricks (for cleaning data with Spark), and Azure SQL Data Warehouse (for querying data). Synapse mathematically merges these chaotic pipelines into one unified Studio.

## 1. Dedicated vs. Serverless SQL Pools
Synapse provides two entirely different mathematical architectures for analyzing data:
- **Dedicated SQL Pools**: (Formerly SQL Data Warehouse). You provision a massive, always-on cluster of compute nodes. The data is physically stored in columnar format across the cluster. It is extremely fast and extremely expensive, designed for predictable, massive daily reports.
- **Serverless SQL Pools**: There is no cluster. The data sits cheaply in Azure Blob Storage (Data Lake) as Parquet or CSV files. You run a standard SQL query. Synapse instantly spins up thousands of hidden compute nodes, executes the SQL against the raw files, returns the answer, and disappears. You pay precisely per Terabyte of data scanned, mathematically optimizing costs for ad-hoc exploration.

## 2. Apache Spark Integration
Not all data can be cleaned with SQL. Synapse includes a fully managed **Apache Spark** engine.
A Data Scientist can open a Jupyter Notebook directly inside Synapse, write Python/PyTorch code, and mathematically execute it against the exact same data lake the SQL engineers are using. The Spark engine and the SQL engine mathematically share the same metadata catalog, allowing seamless interoperability between Big Data and traditional Data Warehousing.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Virtual Machines/index.mdx': `---
title: Azure Virtual Machines (VMs)
description: The foundational Infrastructure as a Service (IaaS) compute offering in Azure, providing developers with absolute root access to mathematically partitioned slices of physical server hardware.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Virtual Machines (VMs)"
  subtitle="IaaS Cloud Compute"
  tags={['Azure', 'Compute', 'IaaS', 'Infrastructure']}
>

Azure Virtual Machines are the exact equivalent of AWS EC2. When you provision a VM, you are renting a mathematically isolated slice of CPU, RAM, and Disk from a massive physical server rack sitting in a Microsoft data center.

## 1. VM Series and Sizing
Microsoft mathematically engineers different hardware architectures for specific workloads:
- **D-Series (General Purpose)**: A balanced mathematical ratio of CPU to RAM, used for standard web servers.
- **E-Series (Memory Optimized)**: Massive amounts of RAM relative to CPU, designed specifically for in-memory databases like Redis or SAP HANA.
- **N-Series (GPU Accelerated)**: Physically packed with NVIDIA GPUs, designed for Machine Learning and heavy video rendering.
You select the exact mathematical size (e.g., TICK1Standard_D4s_v3TICK1: 4 vCPUs, 16GB RAM) and the Hyper-V hypervisor strictly enforces those hardware boundaries.

## 2. Availability Sets vs. Zones
To guarantee 99.99% uptime, you cannot rely on one VM.
- **Availability Sets**: You deploy 2 VMs. Azure mathematically guarantees they are placed on different physical server racks connected to different power supplies within the *same* data center. If a rack fails, one VM survives.
- **Availability Zones**: You deploy 2 VMs. Azure mathematically guarantees they are placed in two *entirely different physical buildings* miles apart. If a tornado destroys the entire data center, the other VM survives.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Virtual Networks/index.mdx': `---
title: Azure Virtual Networks (VNets)
description: The absolute foundational networking boundary in Azure, providing a cryptographically isolated, logically dedicated slice of the Azure cloud for deploying secure resources.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Virtual Networks (VNets)"
  subtitle="The Isolated Cloud Network"
  tags={['Azure', 'Networking', 'Security', 'Infrastructure']}
>

An Azure Virtual Network (VNet) is the exact equivalent of an AWS VPC. Without a VNet, your databases and servers would be accessible to the public internet. A VNet provides the mathematical moat that keeps hackers out.

## 1. CIDR and Isolation
When you create a VNet, you define its size using a mathematical CIDR block (e.g., TICK110.0.0.0/16TICK1, giving you 65,536 private IP addresses).
The Azure Software Defined Network (SDN) hypervisor strictly enforces isolation. If your VNet is TICK110.0.0.0/16TICK1, and another company's VNet is TICK110.0.0.0/16TICK1, they are completely invisible to each other. The physical network hardware mathematically drops any packet attempting to cross the VNet boundary unless explicitly permitted by a VNet Peering connection.

## 2. VNet Peering
If you have a "Frontend" VNet and a "Backend" VNet, they cannot communicate by default.
You establish **VNet Peering**. This mathematically fuses the routing tables of the two VNets at the hypervisor level. The traffic flows directly across Microsoft's private, hyper-fast fiber optic backbone. It never touches the public internet, and there are no physical gateways or hops involved, ensuring massive bandwidth and ultra-low latency between the isolated networks.

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
