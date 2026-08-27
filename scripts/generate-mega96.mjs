import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure SQL/index.mdx': `---
title: Azure SQL Database
description: Microsoft's flagship, fully managed Platform as a Service (PaaS) relational database engine, providing up-to-the-minute mathematically perfect backups and autonomous performance tuning for SQL Server.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure SQL Database"
  subtitle="Managed SQL Server"
  tags={['Azure', 'Database', 'SQL', 'PaaS']}
>

Running Microsoft SQL Server on a physical machine requires expensive licensing, OS patching, and grueling manual backup configurations. Azure SQL mathematically abstracts the entire server away; you simply purchase a logical Database.

## 1. The DTU vs. vCore Models
Azure mathematically prices database performance in two ways:
- **DTU (Database Transaction Unit)**: A blended, mathematical abstraction combining CPU, RAM, and IOPS into a single number. A 100-DTU database is guaranteed to be exactly twice as fast as a 50-DTU database, completely hiding the underlying hardware from the developer.
- **vCore**: For enterprises migrating massive workloads, you mathematically specify exactly how many CPUs and how much RAM you want, giving you granular control over hardware scaling.

## 2. Point-in-Time Restore
Azure SQL continuously takes mathematically rigorous backups of your transaction logs every 5 to 10 minutes. 
If a developer accidentally runs TICK1DELETE FROM Users;TICK1 at exactly 2:14 PM and 32 seconds, ruining the production database, you do not restore from a generic nightly backup. You click a button in the Azure Portal and type TICK12:14:31 PMTICK1. Azure mathematically replays the transaction logs and resurrects the database to the exact mathematical millisecond *before* the deletion occurred.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Bicep/index.mdx': `---
title: Azure Bicep
description: A clean, declarative, domain-specific language (DSL) mathematically compiled into native Azure Resource Manager (ARM) JSON, drastically simplifying Infrastructure as Code on Azure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Bicep"
  subtitle="Modern Infrastructure as Code"
  tags={['Azure', 'IaC', 'DevOps', 'Bicep']}
>

Writing raw ARM JSON templates is mathematically tedious and prone to severe syntax errors due to deep bracket nesting. Bicep was invented as a transparent compiler to solve this.

## 1. The Transparent Abstraction
Unlike Terraform, which maintains its own complex "State File", Bicep is completely stateless. 
You write clean, readable code (resembling TypeScript): 
TICK3bicep
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: 'mystorageaccount'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
}
TICK3
When you deploy this, the Bicep CLI mathematically transpiles it into standard ARM JSON in milliseconds and passes it directly to the Azure API. Azure tracks the state natively. Because Bicep compiles directly to ARM, it supports new Azure features on "Day Zero" (the exact second Microsoft releases them), whereas Terraform often takes weeks to update its providers.

## 2. Modules and Mathematical Reusability
Bicep allows you to mathematically construct complex architectures using **Modules**.
A central DevOps team can write a highly secure TICK1SecureDatabase.bicepTICK1 file that hardcodes specific firewall rules and encryption standards. Application teams across the enterprise simply import this module into their own Bicep files, passing in parameters. This guarantees that every database deployed mathematically adheres to corporate security policies without the developers needing to understand the underlying networking.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Blob Storage/index.mdx': `---
title: Azure Blob Storage
description: Microsoft's massively scalable object storage solution for the cloud, mathematically optimized for storing massive amounts of unstructured data such as text or binary data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Blob Storage"
  subtitle="Infinite Unstructured Storage"
  tags={['Azure', 'Storage', 'Object', 'Serverless']}
>

Azure Blob Storage is the exact architectural equivalent of AWS S3. It is a flat, infinitely scalable mathematical namespace designed to store unstructured bytes (Blobs) without the overhead of a traditional file system.

## 1. Blob Types
Azure mathematically divides blobs into three distinct architectures:
- **Block Blobs**: Best for standard files (images, documents). The file is mathematically chunked into tiny "blocks". If a 5GB upload fails at 4.9GB, Azure only re-uploads the failed blocks, not the entire file.
- **Append Blobs**: Optimized exclusively for appending data to the end of a file. Used heavily for high-throughput application logging.
- **Page Blobs**: Mathematically optimized for random read/write operations. This is the exact underlying storage architecture that physically powers the hard drives (VHDs) of Azure Virtual Machines.

## 2. Storage Tiers
Storing 100 Terabytes of data you access every day is expensive. Storing 100 Terabytes of 10-year-old tax documents is cheap.
Azure uses mathematical **Access Tiers**:
- **Hot**: High storage cost, extremely cheap mathematical read/write costs.
- **Cool**: Cheaper storage, but higher read/write costs (for data accessed once a month).
- **Archive**: The data is mathematically compressed and physically written to tape drives. It costs almost nothing, but retrieving the data takes up to 15 hours because a physical robot must retrieve the tape.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Container Apps/index.mdx': `---
title: Azure Container Apps
description: A fully managed, serverless container service heavily optimized for microservices, allowing developers to deploy Docker containers without managing the underlying Kubernetes cluster.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Container Apps"
  subtitle="Serverless Microservices"
  tags={['Azure', 'Containers', 'Serverless', 'Microservices']}
>

Running raw Kubernetes (AKS) is an infrastructure nightmare. Running a simple web app (App Service) lacks microservice networking. Container Apps is the mathematical middle ground, built on top of a hidden Kubernetes cluster.

## 1. KEDA (Kubernetes Event-Driven Autoscaling)
The most powerful mathematical feature of Container Apps is its native integration with **KEDA**.
Standard auto-scaling looks at CPU percentage (e.g., "Scale up if CPU > 80%"). This is slow and reactive. 
KEDA scales based on *Events*. You can configure your Container App to mathematically monitor an Azure Service Bus queue. If the queue is empty, the container scales exactly to Zero (costing $0). The exact millisecond a message hits the queue, KEDA mathematically forces the Container App to boot up, process the message, and spin back down to zero.

## 2. Dapr (Distributed Application Runtime)
Microservices require complex math to talk to each other (Service Discovery, Mutual TLS encryption, State management).
Container Apps natively injects **Dapr** as a "sidecar" into your container. If Container A wants to talk to Container B, it does not need to know B's IP address or write complex retry logic. Container A simply sends a standard HTTP request to its own local Dapr sidecar (TICK1localhost:3500TICK1), and Dapr mathematically handles the secure network routing, retries, and encryption to Container B completely invisibly.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Container Instances/index.mdx': `---
title: Azure Container Instances (ACI)
description: The fastest and simplest way to run a single, isolated Docker container in Azure, providing raw, un-orchestrated serverless compute charged strictly by the second.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Container Instances (ACI)"
  subtitle="Raw Serverless Containers"
  tags={['Azure', 'Containers', 'Serverless', 'Compute']}
>

If you just need to run a single Python script inside a Docker container that takes 5 minutes to execute, setting up a Kubernetes cluster or a Container App environment is massive overkill. ACI is the mathematical equivalent of AWS Fargate, stripped down to its barest essentials.

## 1. The Raw Execution Engine
With ACI, there is absolutely no orchestration. No load balancing, no complex networking, no auto-scaling.
You simply provide an image (TICK1my-python-script:latestTICK1) and a mathematical requirement (TICK12 CPUs, 4GB RAMTICK1). Azure instantly provisions a hypervisor-isolated micro-VM, boots the container, runs the script, and destroys the VM. You pay precisely for the exact seconds the container was running.

## 2. Burst Compute for AKS
While ACI is un-orchestrated on its own, it can be mathematically attached to Azure Kubernetes Service (AKS) as **Virtual Nodes**.
If your AKS cluster experiences a massive, unexpected spike in traffic, and all the physical Virtual Machines are at 100% CPU, the cluster cannot boot new containers. Using Virtual Nodes, AKS can mathematically command ACI to instantly boot the overflow containers in the serverless ether. This provides infinite, instantaneous scale without having to wait 5 minutes for a new physical EC2/VM to boot up.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Cosmos DB/index.mdx': `---
title: Azure Cosmos DB
description: Microsoft's globally distributed, multi-model NoSQL database service, mathematically engineered to guarantee single-digit millisecond response times and 99.999% availability anywhere in the world.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Cosmos DB"
  subtitle="Global NoSQL Database"
  tags={['Azure', 'Database', 'NoSQL', 'Global']}
>

If a user in Tokyo queries a database in New York, the speed of light physically dictates a ~150-millisecond delay. For ultra-responsive web applications, this is unacceptable. Cosmos DB mathematically eliminates this geographical latency.

## 1. Turnkey Global Distribution
In Cosmos DB, you write data to the East US region. Within milliseconds, Cosmos DB's backbone network mathematically replicates that data to instances in Japan, Europe, and Australia. 
When the Tokyo user opens the app, the app queries the local Tokyo endpoint, retrieving the data in exactly 2 milliseconds. If the entire Eastern United States loses power, Cosmos DB mathematically reroutes read/write operations to the surviving regions instantly, guaranteeing a massive **99.999% SLA**.

## 2. Tunable Mathematical Consistency
In distributed databases, you must mathematically trade off between Consistency (everyone sees the exact same data instantly) and Availability (the database is fast and never goes down) — this is the CAP Theorem.
Cosmos DB allows you to mathematically tune this on a sliding scale:
- **Strong**: (Slowest) If you write a record in NY, it is mathematically locked until Tokyo confirms it saved it.
- **Eventual**: (Fastest) NY saves it instantly and returns. Tokyo will get it *eventually*.
- **Session**: (The Default) A user is mathematically guaranteed to read their *own* writes instantly within their current session, but other users might see a slight delay.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Entra ID/index.mdx': `---
title: Microsoft Entra ID
description: The mathematical evolution of Azure Active Directory, providing a massive, cloud-based Identity and Access Management (IAM) system that secures billions of authentications globally.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Microsoft Entra ID"
  subtitle="Cloud Identity and Access Management"
  tags={['Azure', 'Security', 'Identity', 'Authentication']}
>

Entra ID (formerly Azure AD) is not just for securing Azure virtual machines. It is the identity backbone for Office 365, GitHub, and millions of third-party SaaS applications via OAuth and SAML.

## 1. Conditional Access Policies
A simple username and password (or even MFA) is not mathematically secure enough for enterprise zero-trust architectures.
Entra ID uses **Conditional Access**. This is a mathematical policy engine that evaluates the *context* of a login attempt in real-time. 
A policy might decree: *"If the user is logging in from an IP address in the Corporate Office, using a laptop mathematically enrolled in Intune (MDM), allow access. If the same user logs in from an unknown IP in a foreign country, mathematically require MFA. If they fail, instantly lock the account."*

## 2. Managed Identities
Hardcoding database passwords into application code is a massive security risk.
Entra ID provides **Managed Identities** for Azure resources. You assign a Managed Identity to a Virtual Machine. The VM mathematically asks Entra ID for a temporary, cryptographically signed token. It uses this token to authenticate directly to Azure SQL or Key Vault. There are zero passwords, zero connection strings, and the credential rotation is mathematically handled by Azure invisible to the developer.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Event Grid/index.mdx': `---
title: Azure Event Grid
description: A highly scalable, fully managed event routing service that enables developers to build mathematically decoupled, reactive, event-driven architectures across the entire Azure ecosystem.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Event Grid"
  subtitle="The Event Routing Backbone"
  tags={['Azure', 'Messaging', 'Events', 'Serverless']}
>

When a user uploads an image to Azure Blob Storage, you want a Serverless Function to instantly compress it. You could write a script that polls the storage account every 5 seconds (wasting compute). Event Grid mathematically eliminates polling.

## 1. Push-Based Event Routing
Event Grid is physically wired into the fabric of Azure. 
When the image hits Blob Storage, the storage account instantly fires a tiny JSON packet (an Event) to Event Grid: TICK1{"eventType": "BlobCreated", "subject": "/image.jpg"}TICK1.
Event Grid acts as a mathematical router. It instantly pushes that JSON payload directly to the Azure Function. The compute is strictly reactive. Because it is push-based, you only pay for the exact millisecond the event occurs, completely eliminating the architectural inefficiency of constant polling.

## 2. Advanced Mathematical Filtering
If 100,000 files are uploaded, but your Function only cares about TICK1.jpgTICK1 files (and not TICK1.pdfTICK1), you do not want to trigger the Function 100,000 times just to throw the PDFs away.
Event Grid allows you to define mathematical **Filters** on the subscription. You configure the subscription to explicitly match: TICK1SubjectEndsWith: ".jpg"TICK1. Event Grid evaluates this string mathematics at the network layer, instantly dropping the PDF events and only forwarding the JPEGs, saving massive amounts of downstream serverless compute costs.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Event Hubs/index.mdx': `---
title: Azure Event Hubs
description: A massive, big-data streaming platform and event ingestion service capable of mathematically receiving and processing millions of events per second with ultra-low latency.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Event Hubs"
  subtitle="Massive Telemetry Ingestion"
  tags={['Azure', 'Big Data', 'Streaming', 'Events']}
>

Event Grid is designed for discrete, individual events (e.g., "A file was uploaded"). Event Hubs is designed for a massive, unceasing mathematical firehose of data (e.g., 100,000 IoT sensors sending temperature telemetry every second).

## 1. Partitioned Consumer Architecture
If a single server tried to read 100,000 messages a second, its CPU would instantly melt.
Event Hubs mathematically solves this using **Partitions**. As the firehose of data enters the Hub, it is mathematically sliced into separate buckets (Partitions). 
When you spin up a cluster of 10 processing servers, Event Hubs assigns exactly one Partition to each server. This mathematical division of labor guarantees that you can horizontally scale your consumers to process millions of messages concurrently without any network collision or locking issues.

## 2. Kafka Compatibility
Apache Kafka is the open-source industry standard for massive data streaming, but hosting a physical Kafka cluster requires extensive distributed systems engineering.
Event Hubs mathematically exposes a **Kafka-compatible protocol head**. A developer can take an existing application written for Apache Kafka and point its connection string directly at Azure Event Hubs. The code mathematically believes it is talking to a physical Kafka cluster, allowing enterprises to migrate to a fully managed PaaS without rewriting a single line of streaming code.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Front Door/index.mdx': `---
title: Azure Front Door
description: A massive, global Layer 7 load balancer and Content Delivery Network (CDN) that mathematically routes internet traffic to the fastest, closest Azure region while providing robust edge security.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Front Door"
  subtitle="Global Edge Routing"
  tags={['Azure', 'Networking', 'Global', 'CDN']}
>

If your application is hosted in New York, and a user in Sydney tries to connect, their HTTP request must mathematically bounce across 20 different underwater fiber optic routers, resulting in high latency and packet loss.

## 1. The Anycast Network
Front Door utilizes Microsoft's massive, private global WAN (Wide Area Network).
When the user in Sydney types your URL, they do not connect to New York. Because of **Anycast DNS**, they connect to a physical Microsoft Edge Node located directly in Sydney. 
The Front Door edge node mathematically intercepts the HTTP request, terminates the SSL connection locally (saving massive latency), and routes the request onto Microsoft's private, hyper-fast fiber backbone directly to your New York server, completely bypassing the chaotic public internet.

## 2. Global Failover and Web Application Firewall
Because Front Door sits at the global edge of the internet, it is the ultimate mathematical failover system.
If you deploy your app to both New York and London, Front Door monitors their health. If the entire East Coast of the US loses power, Front Door instantly detects the mathematical failure and transparently routes all global traffic to London. Furthermore, it includes a global WAF. If a massive DDoS attack originates from a botnet in Russia, Front Door mathematically absorbs and blocks the attack at the physical edge nodes in Europe, ensuring the malicious packets never even reach your actual Azure infrastructure.

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
