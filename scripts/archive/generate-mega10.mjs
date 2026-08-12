import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '65. Comparison Pages (Reference)/AWS vs Azure/index.mdx': `---
title: AWS vs Azure
description: A comparison of the two largest cloud computing providers in the world.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="AWS vs Azure">

Amazon Web Services (AWS) and Microsoft Azure are the undisputed titans of the cloud computing industry, collectively powering a massive percentage of the modern internet.

<Callout icon="info" title="Market Position">
  **AWS** is the pioneer (launched in 2006) and holds the largest market share. It is often favored by startups, tech companies, and open-source heavy workloads.
  
  **Azure** (launched in 2010) is deeply integrated into the Microsoft ecosystem. If a Fortune 500 company already pays millions for Office 365, Active Directory, and Windows Server licenses, Microsoft makes it incredibly attractive to migrate to Azure.
</Callout>

## Service Equivalents

<ComparisonTable 
  headers={['Category', 'AWS', 'Azure']}
  rows={[
    ['Virtual Machines', 'Elastic Compute Cloud (EC2)', 'Azure Virtual Machines'],
    ['Object Storage', 'Simple Storage Service (S3)', 'Azure Blob Storage'],
    ['Managed Kubernetes', 'Elastic Kubernetes Service (EKS)', 'Azure Kubernetes Service (AKS)'],
    ['Serverless Functions', 'AWS Lambda', 'Azure Functions'],
    ['Identity & IAM', 'AWS IAM', 'Microsoft Entra ID (formerly Azure AD)']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/AWS vs GCP/index.mdx': `---
title: AWS vs Google Cloud Platform (GCP)
description: Comparing the market leader against the king of data and machine learning.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="AWS vs Google Cloud Platform (GCP)">

While AWS is the dominant market leader for general compute, Google Cloud Platform (GCP) has carved out a massive niche by exposing the internal tools Google built to run Search and YouTube to the public.

<Callout icon="success" title="The Google Advantage">
  If your startup is heavily focused on Big Data analytics (BigQuery) or Machine Learning (TensorFlow/Vertex AI), GCP is often considered far superior to AWS. Furthermore, because Google created Kubernetes, their managed GKE service is widely considered the best in the industry.
</Callout>

## Service Equivalents

<ComparisonTable 
  headers={['Category', 'AWS', 'GCP']}
  rows={[
    ['Virtual Machines', 'EC2', 'Compute Engine'],
    ['Object Storage', 'S3', 'Cloud Storage'],
    ['Data Warehouse', 'Redshift', 'BigQuery'],
    ['Managed Kubernetes', 'EKS', 'Google Kubernetes Engine (GKE)'],
    ['Serverless Container', 'Fargate', 'Cloud Run']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/EC2 vs Azure VM vs Compute Engine vs OCI Compute/index.mdx': `---
title: Cloud Virtual Machines Comparison
description: Comparing the foundational IaaS compute offerings across the major cloud providers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Cloud Virtual Machines Comparison">

Infrastructure as a Service (IaaS) Virtual Machines are the absolute foundational building blocks of the cloud. You are renting a slice of a physical server in a massive data center.

<Callout icon="tip" title="The Commodity Layer">
  At the end of the day, a Linux VM is just a Linux VM. The actual compute performance across AWS, Azure, and GCP is nearly identical. The choice of provider usually comes down to pricing, billing flexibility, and integration with higher-level services.
</Callout>

## The Offerings

<ComparisonTable 
  headers={['Provider', 'Service Name', 'Key Differentiator']}
  rows={[
    ['Amazon Web Services', 'Amazon EC2', 'Incredible variety of instance types (Graviton ARM processors, massive GPU clusters). Very complex pricing.'],
    ['Microsoft Azure', 'Azure Virtual Machines', 'Seamless integration with Windows Server licensing (Azure Hybrid Benefit saves massive costs).'],
    ['Google Cloud (GCP)', 'Compute Engine', 'Custom Machine Types (you can request exactly 5 vCPUs and 13GB RAM, rather than paying for a pre-set size).'],
    ['Oracle Cloud (OCI)', 'OCI Compute', 'Extremely aggressive pricing, often much cheaper for raw compute and outbound bandwidth than the Big Three.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/S3 vs Blob Storage vs GCS vs OCI Object Storage/index.mdx': `---
title: Cloud Object Storage Comparison
description: Comparing the infinite-scale storage solutions across the major cloud providers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Cloud Object Storage Comparison">

Object storage is an architecture that manages data as objects (as opposed to file systems or blocks). It is infinitely scalable, extremely cheap, and accessed via HTTP APIs. It is perfect for storing images, videos, backups, and logs.

<Callout icon="info" title="The S3 Standard">
  Amazon S3 was the first major cloud service ever launched (2006). Its API is so ubiquitous that almost all competitors (including on-premise solutions like MinIO) have built their storage to be "S3-compatible".
</Callout>

## The Offerings

<ComparisonTable 
  headers={['Provider', 'Service Name', 'Notable Feature']}
  rows={[
    ['AWS', 'Amazon S3', 'The industry standard. Massive ecosystem of integrations. Complex tiered storage classes (Glacier).'],
    ['Microsoft Azure', 'Azure Blob Storage', 'Excellent integration with Azure Data Lake for enterprise analytics.'],
    ['Google Cloud (GCP)', 'Cloud Storage (GCS)', 'Single API across all storage classes, excellent global edge caching.'],
    ['Oracle Cloud (OCI)', 'OCI Object Storage', 'Aggressively priced, especially for outbound data transfer (Egress).']
  ]}
/>

</TechnologyTemplate>
`,
  '35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EC2/index.mdx': `---
title: Amazon EC2 (Elastic Compute Cloud)
description: A web service that provides secure, resizable compute capacity in the cloud.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Amazon EC2 (Elastic Compute Cloud)">

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

<Callout icon="warning" title="The Pet vs Cattle Analogy">
  In the old days, a physical server was a **Pet**. You gave it a name (e.g., "Zeus"), manually patched it, and nursed it back to health if it crashed.
  
  An EC2 instance is **Cattle**. It is disposable. If it crashes, you shoot it and an Auto Scaling Group instantly spins up an identical replacement.
</Callout>

## Pricing Models

<ComparisonTable 
  headers={['Model', 'Description', 'Best For']}
  rows={[
    ['On-Demand', 'Pay by the second with no long-term commitments.', 'Spiky, unpredictable workloads or short-term testing.'],
    ['Reserved Instances', 'Commit to 1 or 3 years of usage for a massive discount (up to 72%).', 'Steady-state, predictable enterprise workloads (like a main database).'],
    ['Spot Instances', 'Bid on spare, unused AWS capacity for up to 90% off. However, AWS can terminate the instance with 2 minutes notice.', 'Stateless, fault-tolerant workloads (e.g., Image rendering, Hadoop batch processing).']
  ]}
/>

</TechnologyTemplate>
`,
  '35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/S3/index.mdx': `---
title: Amazon S3 (Simple Storage Service)
description: An object storage service offering industry-leading scalability, data availability, security, and performance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Amazon S3 (Simple Storage Service)">

Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. You can use it to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics.

<Callout icon="success" title="Eleven Nines of Durability">
  AWS guarantees 99.999999999% durability for data stored in S3 standard. Statistically, if you store 10,000,000 objects in S3, you can expect to lose exactly ONE object every 10,000 years.
</Callout>

## Storage Classes

<ComparisonTable 
  headers={['Class', 'Use Case', 'Cost Profile']}
  rows={[
    ['S3 Standard', 'Frequently accessed data (Profile pictures, active website assets).', 'Highest storage cost, low retrieval cost.'],
    ['S3 Intelligent-Tiering', 'Data with unknown or changing access patterns. AWS automatically moves it between tiers.', 'Small monitoring fee, optimizes storage costs automatically.'],
    ['S3 Glacier Deep Archive', 'Long-term compliance backups (Data kept for 7 years but never read).', 'Fractions of a penny per GB (cheapest storage), but retrieving data takes 12-48 hours and costs money.']
  ]}
/>

</TechnologyTemplate>
`,
  '35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/DynamoDB/index.mdx': `---
title: Amazon DynamoDB
description: A fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Amazon DynamoDB">

Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. DynamoDB offers built-in security, continuous backups, automated multi-Region replication, in-memory caching, and data export tools.

<Callout icon="error" title="The Single Table Design Trap">
  DynamoDB is incredibly fast, but querying it is extremely rigid. You cannot do SQL JOINs. Advanced usage requires "Single Table Design", where you shove Users, Orders, and Products into the exact same table and use complex composite keys to query them. It is very hard to learn.
</Callout>

## Key Characteristics

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Performance', 'Guarantees single-digit millisecond read and write performance at any scale.'],
    ['Serverless', 'You don\\'t provision a database server. You just create a table and start throwing data at it. It scales infinitely automatically.'],
    ['Pricing', 'You pay for Read Capacity Units (RCUs) and Write Capacity Units (WCUs), or use On-Demand mode to pay exactly per request.']
  ]}
/>

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Virtual machines/index.mdx': `---
title: Virtual Machines (VMs)
description: The emulation of a computer system based on computer architectures and provide functionality of a physical computer.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Virtual Machines (VMs)">

A virtual machine (VM) is the virtualization/emulation of a computer system. Virtual machines are based on computer architectures and provide functionality of a physical computer. Their implementations may involve specialized hardware, software, or a combination.

<Callout icon="info" title="The Hypervisor">
  A Hypervisor (or Virtual Machine Monitor) is the software that sits between the physical hardware and the Virtual Machines. It slices up the physical RAM and CPU and tricks each VM into thinking it is running on a dedicated physical box.
</Callout>

## Types of Hypervisors

<ComparisonTable 
  headers={['Type', 'Description', 'Examples']}
  rows={[
    ['Type 1 (Bare-Metal)', 'Runs directly on the physical hardware. Highly performant. This is what powers AWS, Azure, and Enterprise data centers.', 'VMware ESXi, Microsoft Hyper-V, KVM.'],
    ['Type 2 (Hosted)', 'Runs as an application inside a host operating system (like Windows or macOS). Much slower, used mostly for desktop testing.', 'VirtualBox, VMware Workstation.']
  ]}
/>

</TechnologyTemplate>
`,
  '14. Web Fundamentals/DNS/index.mdx': `---
title: Domain Name System (DNS)
description: The phonebook of the Internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Domain Name System (DNS)">

The Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It associates various information with domain names assigned to each of the participating entities.

<Callout icon="success" title="The Human Translation">
  Humans cannot remember that Google lives at \`142.250.190.46\`. DNS allows you to type \`google.com\`. The browser asks a DNS resolver for the IP address, and the resolver returns the correct numbers so your computer can make the TCP connection.
</Callout>

## Common Record Types

<ComparisonTable 
  headers={['Record Type', 'Function', 'Example Target']}
  rows={[
    ['A Record', 'Maps a domain name directly to an IPv4 Address.', \`192.168.1.1\`],
    ['AAAA Record', 'Maps a domain name directly to an IPv6 Address.', \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`],
    ['CNAME Record', 'Maps a domain name to another domain name (an alias).', \`ghs.googlehosted.com\`],
    ['MX Record', 'Directs email to a mail server.', \`mail.google.com\`],
    ['TXT Record', 'Stores arbitrary text, heavily used for proving domain ownership and email security (SPF, DKIM).', \`v=spf1 include:_spf.google.com ~all\`]
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/CDNs/index.mdx': `---
title: Content Delivery Networks (CDNs)
description: A geographically distributed network of proxy servers and their data centers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Content Delivery Networks (CDNs)">

A content delivery network (CDN) is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end users.

<Callout icon="tip" title="Defeating the Speed of Light">
  If your main server is in New York, and a user in Tokyo requests a 5MB image, the data literally has to travel through fiber optic cables across the ocean, taking 200+ milliseconds. 
  
  A CDN copies that image to a server in Tokyo. The user requests it, and the Tokyo server responds in 5 milliseconds.
</Callout>

## How it Works

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['Origin Server', 'Your actual server (e.g., an AWS S3 bucket in New York). This holds the absolute truth.'],
    ['Edge Server (PoP)', 'The CDN servers scattered in 100+ cities worldwide (Point of Presence).'],
    ['Cache Miss', 'User in Paris requests an image. The Paris Edge Server doesn\\'t have it. It asks the Origin Server in NY, serves it to the user, and caches a copy.'],
    ['Cache Hit', 'The next user in Paris requests the same image. The Paris Edge Server instantly returns the cached copy, completely bypassing the NY Origin server.']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega10() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega10().catch(console.error)
