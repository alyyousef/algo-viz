import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/OCI Terraform provider/index.mdx': `---
title: OCI Terraform Provider
description: The official, mathematically deterministic Infrastructure as Code (IaC) plugin that allows HashiCorp Terraform to provision and manage Oracle Cloud resources.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Terraform Provider"
  subtitle="Infrastructure as Code for Oracle"
  tags={['OCI', 'Terraform', 'IaC', 'Automation']}
>

Manually clicking through the OCI Web Console to build 50 servers is mathematically unscalable and prone to human error. The OCI Terraform Provider allows you to define your entire cloud architecture in strict, version-controlled code.

## 1. Declarative Architecture
Terraform uses HCL (HashiCorp Configuration Language). It is mathematically **declarative**, not imperative.
You do not tell OCI *how* to build a server. You declare the mathematical *end-state*: *"I want exactly one TICK1oci_core_instanceTICK1 with 4 OCPUs in the US-Ashburn region."*
When you run TICK1terraform applyTICK1, the OCI Provider mathematically queries the current state of the cloud. If the server does not exist, it executes the exact REST API calls to create it. If the server already exists but only has 2 OCPUs, Terraform calculates the mathematical delta and executes the API call to upgrade the OCPUs to 4, guaranteeing the physical cloud matches your code perfectly.

## 2. OCI Resource Manager Integration
Running Terraform locally on a developer's laptop creates a security risk (managing the TICK1terraform.tfstateTICK1 file).
OCI natively integrates Terraform directly into the cloud via **OCI Resource Manager**. You push your Terraform code to a Git repository. OCI Resource Manager mathematically pulls the code, securely executes the Terraform binary inside the OCI Control Plane, and safely stores the state file in an encrypted internal bucket. This provides enterprise-grade IaC governance without managing external CI/CD runners.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/OKE/index.mdx': `---
title: Oracle Kubernetes Engine (OKE)
description: Oracle's fully managed, highly available Kubernetes container orchestration service mathematically designed to run enterprise-grade microservices on OCI's high-performance compute infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Oracle Kubernetes Engine (OKE)"
  subtitle="Managed Kubernetes on OCI"
  tags={['OCI', 'Kubernetes', 'Containers', 'Compute']}
>

Managing a Kubernetes Control Plane (the API server, etcd database, and scheduler) is mathematically complex and failure-prone. OKE abstracts this entirely, providing a production-ready Kubernetes cluster in minutes.

## 1. The Free Control Plane
Unlike AWS EKS (which historically charged an hourly fee just for the Control Plane), OCI provides the OKE Control Plane mathematically **for free**. 
Oracle manages the high-availability Master Nodes completely invisibly. You are only billed for the raw OCI Compute instances (the Worker Nodes) that physically run your Docker containers. This makes OKE highly cost-effective for enterprises running dozens of small, isolated Kubernetes clusters.

## 2. Virtual Nodes (Serverless Kubernetes)
Historically, you had to manually provision OCI Virtual Machines to act as Worker Nodes. If you provisioned too many, you wasted money.
OKE now supports **Virtual Nodes**. This mathematically eliminates the underlying Virtual Machines. You simply submit a standard Kubernetes Pod definition to the OKE API. The OCI Control Plane mathematically intercepts it and spins up a hyper-isolated, serverless micro-VM for that exact Pod. The Pod receives a native IP address from the VCN, but there are no physical servers for you to SSH into, patch, or manage, drastically reducing operational overhead.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Oracle Database/index.mdx': `---
title: Oracle Cloud Database Services
description: The premier, mathematically optimized hosting environment for traditional Oracle Databases (like RAC and Exadata) in the cloud, offering unparalleled performance over on-premise deployments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Oracle Cloud Database Services"
  subtitle="Enterprise Database Hosting"
  tags={['OCI', 'Database', 'Oracle', 'Exadata']}
>

While the Autonomous Database is fully self-driving, many enterprises have massive, complex legacy Oracle Databases (like 11g or 12c) that cannot be instantly modernized. OCI provides specialized infrastructure to host these legacy systems.

## 1. Exadata Cloud Service (ExaCS)
In the on-premise world, Oracle Exadata is a massive, multi-million dollar physical rack of servers mathematically engineered purely to run Oracle Databases at blistering speeds.
In OCI, you can rent an **Exadata Cloud Service**. You are mathematically renting a dedicated fraction (or the entirety) of a physical Exadata rack sitting in the Oracle Cloud data center. It provides the exact same hyper-fast RDMA network and NVMe flash cache as an on-premise Exadata, allowing you to lift-and-shift massive, mission-critical financial databases to the cloud with zero mathematical performance degradation.

## 2. Real Application Clusters (RAC)
Oracle RAC mathematically clusters multiple physical servers into a single logical database. If Node 1 physically explodes, Node 2 continues serving transactions instantly.
Running Oracle RAC on AWS or Azure is mathematically and architecturally very difficult (and often unsupported) due to the lack of shared block storage and multicast networking. OCI mathematically supports RAC natively on both Virtual Machines and Bare Metal servers, providing the only truly native cloud environment for high-availability legacy Oracle workloads.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Policies/index.mdx': `---
title: OCI IAM Policies
description: The strict, human-readable mathematical rules engine that definitively grants or denies access to every single resource within the Oracle Cloud Infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI IAM Policies"
  subtitle="The Authorization Engine"
  tags={['OCI', 'Security', 'IAM', 'Governance']}
>

In OCI, every API request is mathematically denied by default. An IAM Policy is the explicit mathematical override that allows a user or group to perform an action.

## 1. The SQL-Like Syntax
An OCI Policy is constructed using a very specific, human-readable syntax:
TICK3sql
Allow <subject> to <verb> <resource-type> in <location> where <conditions>
TICK3
For example: TICK1Allow group 'Network_Admins' to manage virtual-network-family in compartment 'Production'TICK1.
The mathematical engine parses this instantly. The verb TICK1manageTICK1 grants full CRUD (Create, Read, Update, Delete) permissions. If you change the verb to TICK1readTICK1, the engine mathematically strips the ability to modify or delete the networks, providing strict Principle of Least Privilege.

## 2. Granular Conditions
Policies can use mathematical **Conditions** to enforce extreme security.
TICK3sql
Allow group 'Developers' to manage instances in compartment 'Dev' where request.region = 'us-ashburn-1'
TICK3
If a compromised developer account in London attempts to spin up a Virtual Machine in the Frankfurt region, the IAM engine mathematically evaluates the condition. Because the TICK1request.regionTICK1 does not equal Ashburn, the engine instantly returns a TICK1403 ForbiddenTICK1 error. This allows security teams to mathematically geofence their entire cloud infrastructure using simple text strings.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Regions/index.mdx': `---
title: OCI Regions
description: The highest-level physical and geographical architecture of Oracle Cloud, representing distinct, entirely isolated data center clusters spread across the globe.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Regions"
  subtitle="Global Geographical Isolation"
  tags={['OCI', 'Architecture', 'Infrastructure', 'Global']}
>

When you deploy a Virtual Machine in OCI, you must choose a **Region** (e.g., US East - Ashburn, or UK South - London). A Region is a specific geographical area that contains one or more Availability Domains.

## 1. Mathematical Isolation
Regions are mathematically and physically isolated from one another.
They do not share power grids, network backbones, or regional control planes. If a massive natural disaster completely destroys the Ashburn region, the London region is mathematically unaffected and remains 100% operational. This is the foundation of Disaster Recovery (DR). Cloud architects mathematically duplicate their infrastructure across two Regions so that if one fails entirely, the global DNS can instantly route traffic to the surviving Region.

## 2. Data Sovereignty and Compliance
Regions enforce strict mathematical **Data Sovereignty**.
If a German bank stores its customer data in the Frankfurt Region, Oracle mathematically guarantees that the data physically rests on hard drives inside the borders of Germany. It will not be replicated to the US or the UK unless explicitly configured by the customer. This physical architecture is required to comply with strict international privacy laws like GDPR, ensuring the data never mathematically crosses restricted national borders.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Route Tables/index.mdx': `---
title: OCI Route Tables
description: The mathematical routing brains of a Virtual Cloud Network (VCN), defining exactly how network packets travel from a Subnet to the internet, on-premise networks, or other cloud services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Route Tables"
  subtitle="Subnet Traffic Direction"
  tags={['OCI', 'Networking', 'Routing', 'VCN']}
>

If a Virtual Machine tries to send a packet to Google (TICK18.8.8.8TICK1), the packet reaches the edge of the Subnet and stops. The Subnet has no idea where the internet is. The Route Table provides the mathematical map.

## 1. Destination and Target
Every Subnet in OCI is attached to exactly one Route Table. The table contains mathematical rules structured as **Destination CIDR -> Target Gateway**.
- **Rule 1:** TICK10.0.0.0/0TICK1 -> TICK1Internet GatewayTICK1 (Routes all public internet traffic out the front door).
- **Rule 2:** TICK1192.168.1.0/24TICK1 -> TICK1Dynamic Routing Gateway (DRG)TICK1 (Routes internal corporate traffic out the back door to the on-premise office via VPN).
When a packet leaves a VM, the VCN mathematically evaluates the destination IP against the Route Table. It finds the most specific matching CIDR block and fires the packet to that exact Gateway.

## 2. Private Routing
The mathematical absence of a rule is a security feature.
If you create a "Database Route Table" and do *not* include a rule for TICK10.0.0.0/0TICK1, the Subnet is mathematically isolated from the internet. If a hacker somehow manages to ping the database, the database might try to reply, but the Route Table mathematically drops the packet because it has no mathematical instruction on how to route it back to the internet.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Security Lists/index.mdx': `---
title: OCI Security Lists
description: The original, Subnet-level virtual firewall system in Oracle Cloud that mathematically enforces ingress and egress traffic rules for all Virtual Machines residing within a specific Subnet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Security Lists"
  subtitle="Subnet-Level Virtual Firewalls"
  tags={['OCI', 'Networking', 'Security', 'Firewall']}
>

While Network Security Groups (NSGs) apply rules directly to a single Virtual Machine, **Security Lists** apply rules mathematically to the entire Subnet boundary. 

## 1. Ingress and Egress Rules
A Security List is a mathematical whitelist. Everything is denied by default.
You attach a Security List to the "Web Subnet". You add an **Ingress Rule**: *"Allow TCP Port 80 (HTTP) from TICK10.0.0.0/0TICK1."*
Because the list is attached at the Subnet level, every single Virtual Machine that boots inside that Subnet automatically, mathematically inherits that firewall rule. If you have 50 Web Servers in the Subnet, you only write the rule once.

## 2. Stateful vs. Stateless
By default, Security List rules are **Stateful**. 
If a user mathematically initiates a connection to Port 80 (Ingress), OCI remembers the state of that connection. When the Web Server replies, OCI mathematically allows the outbound packet back through the firewall, even if there is no explicit Egress rule defined.
However, for massive, ultra-high-performance workloads (like a load balancer handling 1 million packets per second), tracking state consumes massive CPU. You can mark a rule as **Stateless**. This disables connection tracking, making the network mathematically faster, but requires the cloud architect to manually write matching Ingress and Egress rules for every single connection.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Service Gateway/index.mdx': `---
title: OCI Service Gateway
description: A mathematically secure, internal routing appliance that allows Virtual Machines in a private Subnet to privately access Oracle public services (like Object Storage) without traversing the internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Service Gateway"
  subtitle="Private Access to Public Services"
  tags={['OCI', 'Networking', 'Security', 'Routing']}
>

OCI Object Storage and OCI Autonomous Database are public services; their API endpoints exist on the public internet. If a highly secure, private Database VM needs to back itself up to Object Storage, sending that highly sensitive backup data over an Internet Gateway is a massive security risk.

## 1. The Internal Backbone
The Service Gateway mathematically solves this. 
You attach a Service Gateway to your VCN. In your Route Table, you add a rule: *"Route all traffic destined for 'All OCI Services in Region' to the Service Gateway."*
When the Database initiates the backup, the VCN routing engine mathematically intercepts the packet. Instead of sending it out to the public internet, it routes it to the Service Gateway. The Gateway forwards the packet entirely over Oracle's private, encrypted, internal fiber-optic backbone directly to the Object Storage array.

## 2. Perfect Mathematical Security
Because the traffic never touches the public internet, it cannot be mathematically intercepted or routed through malicious third-party ISPs.
More importantly, the Database VM does not need a Public IP address, an Internet Gateway, or a NAT Gateway. It remains 100% mathematically isolated from the outside world, yet it can still seamlessly consume all of Oracle's native cloud services, providing the ultimate enterprise security posture.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Subnets/index.mdx': `---
title: OCI Subnets
description: The fundamental mathematical divisions of a Virtual Cloud Network (VCN), defining specific IP address ranges and routing characteristics to isolate different layers of an application architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Subnets"
  subtitle="Logical Network Segmentation"
  tags={['OCI', 'Networking', 'VCN', 'IP Addressing']}
>

A Virtual Cloud Network (VCN) is a massive block of IP addresses (e.g., TICK110.0.0.0/16TICK1, which contains 65,536 IPs). You cannot deploy servers directly into a VCN. You must mathematically chop the VCN into smaller, manageable chunks called **Subnets**.

## 1. Regional vs. AD-Specific
Historically, a Subnet was mathematically bound to a single physical building (an Availability Domain). If AD 1 burned down, the Subnet died.
Modern OCI uses **Regional Subnets**. You carve out a chunk of IPs (e.g., TICK110.0.1.0/24TICK1). This Subnet mathematically spans all 3 Availability Domains in the Region simultaneously. You can place Web Server 1 in AD 1, and Web Server 2 in AD 2, and they will both pull IP addresses from the exact same Subnet, massively simplifying routing and firewall management.

## 2. Public vs. Private
When you create a Subnet, you must make a strict, permanent mathematical declaration: is it Public or Private?
- **Public Subnet**: Virtual Machines placed here are mathematically allowed to receive Public IP addresses from Oracle. They can talk directly to the internet (if an Internet Gateway is attached).
- **Private Subnet**: Virtual Machines placed here are mathematically forbidden from ever receiving a Public IP address. Even if an administrator tries to assign one via the API, the OCI Control Plane will mathematically reject the request. This provides a hard, physical security boundary for sensitive databases.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Vault/index.mdx': `---
title: OCI Vault (Key Management Service)
description: A highly secure, mathematically impenetrable cryptographic appliance powered by physical Hardware Security Modules (HSMs) used to manage encryption keys and sensitive secrets in Oracle Cloud.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Vault"
  subtitle="Cryptographic Key Management"
  tags={['OCI', 'Security', 'Encryption', 'KMS']}
>

By default, every Block Volume and Object Storage Bucket in OCI is encrypted using keys managed by Oracle. However, strict government and financial compliance laws demand that the customer, not Oracle, mathematically controls the encryption keys.

## 1. Hardware Security Modules (HSMs)
OCI Vault allows you to create **Master Encryption Keys (MEKs)**.
These keys are not stored on standard hard drives. They are mathematically generated and permanently trapped inside physical, tamper-evident Hardware Security Modules (HSMs) meeting FIPS 140-2 Level 3 certification. 
If an Oracle employee physically walks into the data center and attempts to pry open the HSM server to steal your key, the hardware mathematically detects the physical intrusion and instantly zeroes out (destroys) the silicon, guaranteeing absolute cryptographic security.

## 2. Envelope Encryption
OCI Vault uses mathematical **Envelope Encryption**.
When you encrypt a 10TB database, OCI does not send 10TB of data to the Vault. 
The database generates a small Data Encryption Key (DEK). It mathematically encrypts the 10TB of data with the DEK. 
The database then sends the DEK to the OCI Vault. The HSM encrypts the DEK using your Master Encryption Key, and sends the encrypted DEK back to the database to be stored on disk. To read the data, the database must mathematically reverse this entire process. If you delete your Master Key in OCI Vault, the entire 10TB database is mathematically instantly permanently destroyed (Crypto-shredding), because the DEK can never be decrypted again.

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
