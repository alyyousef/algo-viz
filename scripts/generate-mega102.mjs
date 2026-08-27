import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Load Balancer/index.mdx': `---
title: OCI Load Balancer
description: A mathematically rigorous, high-availability software-defined networking service that distributes incoming TCP and HTTP traffic across multiple compute instances to ensure fault tolerance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Load Balancer"
  subtitle="Layer 4 and Layer 7 Traffic Distribution"
  tags={['OCI', 'Networking', 'Load Balancing', 'High Availability']}
>

If an enterprise deploys a single Web Server, that server is a mathematical single point of failure. If it crashes, the application goes offline. The OCI Load Balancer solves this by fronting a cluster of servers with a single Public IP address.

## 1. Flexible Bandwidth Shapes
Historically in OCI, you had to choose a fixed bandwidth size for your Load Balancer (e.g., exactly 100 Mbps or 400 Mbps). 
Modern OCI utilizes **Flexible Load Balancers**. You mathematically define a minimum bandwidth (e.g., 10 Mbps) and a maximum bandwidth (e.g., 1000 Mbps). During normal hours, OCI only charges you for the 10 Mbps footprint. If a sudden surge of traffic hits, the underlying software-defined network mathematically expands the bandwidth up to 1000 Mbps instantly, ensuring zero dropped packets without requiring you to over-provision expensive network capacity.

## 2. Health Checks and Routing Policies
The Load Balancer does not just blindly forward traffic. It mathematically monitors the health of the backend servers.
It continuously pings a specific endpoint (e.g., TICK1/api/healthTICK1). If Server B fails to return a TICK1200 OKTICK1 HTTP status code three times in a row, the Load Balancer mathematically removes Server B from the routing pool. All subsequent traffic is instantly rerouted to Server A and Server C. 
Furthermore, it supports **Layer 7 Routing**. The Load Balancer can mathematically inspect the URL path: *"If the URL contains TICK1/images/TICK1, route the packet to the Image Server Pool. If it contains TICK1/api/TICK1, route it to the API Server Pool."*

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Logging/index.mdx': `---
title: OCI Logging
description: A highly scalable, centralized telemetry service that mathematically aggregates, indexes, and searches logs from all OCI resources, custom applications, and security audits.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Logging"
  subtitle="Centralized Telemetry and Audit"
  tags={['OCI', 'Observability', 'Logging', 'Security']}
>

In a distributed cloud architecture with 500 Virtual Machines and 50 Databases, manually SSHing into servers to read text-based log files is mathematically impossible. OCI Logging centralizes this data.

## 1. Unified Log Ingestion
OCI Logging acts as the single mathematical sink for three distinct types of logs:
- **Audit Logs**: Irrefutable, mathematically secure records of every single API call made to the OCI Control Plane (e.g., *"User John deleted Database X at 2:00 PM"*).
- **Service Logs**: Native telemetry emitted directly by OCI services (e.g., Load Balancer access logs, VCN Flow Logs).
- **Custom Logs**: Application logs pushed directly from your code or via the unified monitoring agent installed on your VMs.

## 2. Log Search and Service Connectors
Once billions of log lines are aggregated, OCI provides a mathematical search engine to query them (using a syntax similar to SQL). 
However, storing hot logs forever is expensive. OCI utilizes **Service Connectors**. You write a mathematical rule: *"Hold the logs in hot search memory for 30 days. On day 31, mathematically intercept the log stream and archive it to an ultra-cheap Object Storage Bucket for 7-year compliance retention."* This automated state machine ensures strict security compliance at the lowest possible cost.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Monitoring/index.mdx': `---
title: OCI Monitoring
description: A comprehensive metrics and alerting engine that mathematically analyzes the real-time health, performance, and capacity of the entire Oracle Cloud infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Monitoring"
  subtitle="Real-Time Metrics and Alerting"
  tags={['OCI', 'Observability', 'Metrics', 'Automation']}
>

While OCI Logging handles text-based events, OCI Monitoring handles raw, mathematical time-series data (Metrics). 

## 1. Metrics and Dimensions
Every resource in OCI automatically emits metrics.
A Virtual Machine emits TICK1CpuUtilizationTICK1. An Autonomous Database emits TICK1StorageSpaceUsedTICK1. 
These metrics are tagged with **Dimensions**. A dimension is a mathematical filter. You do not just view "CPU Utilization"; you view *"CPU Utilization WHERE Region = Ashburn AND Compartment = Production AND InstanceType = WebServer"*. This dimensional filtering allows DevOps engineers to mathematically isolate performance bottlenecks across a massive, globally distributed fleet of servers.

## 2. Alarms and Auto-Scaling
Metrics are useless without mathematical reaction.
You configure an **Alarm** using MQL (Monitoring Query Language): *"IF the 5-minute rolling average of CPU Utilization for the WebServer pool strictly exceeds 80%, trigger an Alert."*
The Alert mathematically triggers an OCI Notification, which sends an SMS to the on-call engineer. More importantly, the Alert can trigger an OCI Auto-Scaling action, mathematically instructing the cloud to boot 3 brand-new Web Servers and attach them to the Load Balancer before human intervention is even required.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/MySQL HeatWave/index.mdx': `---
title: MySQL HeatWave
description: Oracle's revolutionary, massively parallel in-memory query accelerator that mathematically allows a single MySQL database to process both rapid transactions and massive analytical queries simultaneously.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="MySQL HeatWave"
  subtitle="Unified OLTP and OLAP"
  tags={['OCI', 'Database', 'MySQL', 'Analytics']}
>

Historically, database architecture forced a mathematical divide: you used MySQL for fast, tiny transactions (OLTP), but if you wanted to run a massive data analytics report (OLAP), you had to export the data via a complex ETL pipeline into a separate Data Warehouse (like Snowflake or Redshift). HeatWave destroys this divide.

## 1. The In-Memory Accelerator
HeatWave is an in-memory, columnar processing engine physically attached to the OCI MySQL Database Service.
When a user executes a standard SQL query, the MySQL optimizer mathematically analyzes it. 
If it is a simple query (*"Update User 5's password"*), MySQL handles it instantly. 
If it is a massive analytical query (*"Calculate the average sales of all products across 5 billion rows over the last 10 years"*), the optimizer mathematically intercepts the query and pushes it down to the HeatWave cluster. HeatWave executes the query across dozens of distributed in-memory nodes, returning the result up to 400x faster than standard MySQL, completely eliminating the need for a separate Data Warehouse.

## 2. HeatWave AutoML
Because HeatWave holds massive amounts of data in its distributed RAM, exporting that data to a separate Machine Learning server is mathematically inefficient.
HeatWave includes **AutoML**. Data Scientists can write standard SQL commands directly inside the database to mathematically train Machine Learning models (like predicting customer churn) directly on the raw data resting in memory. This eliminates data movement, drastically improves security, and democratizes AI for standard SQL developers.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/NAT Gateway/index.mdx': `---
title: OCI NAT Gateway
description: A highly secure, managed networking appliance that mathematically allows Virtual Machines in private subnets to initiate outbound internet traffic without exposing them to inbound internet attacks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI NAT Gateway"
  subtitle="Secure Outbound Internet"
  tags={['OCI', 'Networking', 'Security', 'Routing']}
>

If you place a Database Virtual Machine in a Private Subnet (with no Public IP address and no Internet Gateway), it is mathematically secure from internet hackers. However, if that Database needs to download a security patch from TICK1ubuntu.comTICK1, it is mathematically trapped. The NAT Gateway solves this.

## 1. Outbound-Only State Machine
A NAT (Network Address Translation) Gateway is fundamentally different from an Internet Gateway.
An Internet Gateway is bidirectional. A NAT Gateway is mathematically **unidirectional** regarding connection initiation. 
When the Database tries to ping TICK1ubuntu.comTICK1, the traffic is routed to the NAT Gateway. The Gateway mathematically strips the Database's private IP, replaces it with the Gateway's own Public IP, and sends the request to the internet. When Ubuntu replies, the Gateway remembers the mathematical state of the connection and forwards the packet back to the Database. 

## 2. Dropping Unsolicited Traffic
The mathematical security guarantee of a NAT Gateway lies in its state table. 
If a hacker on the internet attempts to initiate a brand-new connection directly to the NAT Gateway's Public IP, the Gateway consults its state table. Because no internal VM initiated that specific connection, the Gateway mathematically drops the packets instantly. This allows private backend servers to download patches and API updates while remaining physically impossible to reach from the outside world.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/NSGs/index.mdx': `---
title: OCI Network Security Groups (NSGs)
description: A granular, mathematically precise virtual firewall system that applies strict ingress and egress traffic rules directly to individual Virtual Network Interface Cards (VNICs).
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Network Security Groups (NSGs)"
  subtitle="Granular Virtual Firewalls"
  tags={['OCI', 'Security', 'Networking', 'Firewall']}
>

In OCI, Security Lists apply firewall rules to an entire Subnet. Network Security Groups (NSGs) provide a much more precise mathematical level of security, applying rules directly to individual servers.

## 1. VNIC-Level Enforcement
When you boot a Virtual Machine in OCI, it receives a Virtual Network Interface Card (VNIC).
An NSG is a mathematical logical group. You assign the Web Server's VNIC to the "Web_NSG".
You then define strict mathematical rules inside the NSG: *"Allow Ingress TCP Port 443 (HTTPS) from 0.0.0.0/0. Block all other ports."* The OCI hypervisor physically enforces this rule at the VNIC level. Even if a hacker breaches the wider Subnet, they mathematically cannot establish an SSH connection (Port 22) to the Web Server, because the NSG will physically drop the packet before the OS even sees it.

## 2. Microsegmentation via NSG Tags
NSGs allow for brilliant mathematical **Microsegmentation** without relying on IP addresses.
If you have 100 Web Servers and 50 Database Servers, managing IP whitelists is impossible.
Instead, you create a "DB_NSG". You write an Ingress rule: *"Allow TCP Port 1521 (Oracle DB) ONLY where the Source is mathematically tagged as 'Web_NSG'."*
If you boot a brand new Web Server, you simply assign it to the 'Web_NSG'. It instantly inherits the mathematical permission to talk to the Database. If a compromised server in the same Subnet (but not in the Web_NSG) tries to connect to the database, the DB_NSG mathematically drops the packet.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/Object Storage/index.mdx': `---
title: OCI Object Storage
description: Oracle's infinitely scalable, mathematically durable flat-namespace storage service designed to house massive amounts of unstructured data such as backups, logs, and multimedia files.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Object Storage"
  subtitle="Infinite Unstructured Data"
  tags={['OCI', 'Storage', 'Object', 'Serverless']}
>

OCI Object Storage is the exact equivalent of AWS S3. It does not use folders or block sectors; it uses a massive, mathematical flat namespace of **Buckets** containing **Objects**. 

## 1. The Mathematical Physics of Object Storage
You cannot install an operating system on Object Storage. It is designed purely for HTTP-based REST API access (PUT, GET, DELETE).
When you upload a 10GB video file, OCI Object Storage mathematically fragments the file into tiny shards and distributes them across multiple independent fault domains within the region. This architecture mathematically guarantees **99.999999999% (Eleven 9s) of durability**. If two entire server racks in the Oracle data center physically burn down, the mathematical parity algorithms guarantee that not a single byte of your video file is lost.

## 2. Standard vs. Archive Storage Tiers
Storing petabytes of data is expensive. OCI provides mathematical cost optimization via storage tiers.
- **Standard Tier**: Designed for "hot" data accessed frequently (like website images). You pay a premium for storage, but retrieval is instantaneous.
- **Archive Tier**: Designed for 10-year compliance backups. The storage cost is mathematically slashed (often by 90%), but the data is physically moved to deep, cold storage arrays. If you request a file from the Archive tier, you must mathematically wait up to 4 hours for OCI to physically retrieve the data before you can download it.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/OCI CLI/index.mdx': `---
title: OCI Command Line Interface (CLI)
description: A powerful, Python-based terminal tool that allows DevOps engineers to mathematically interact with, provision, and manage every single Oracle Cloud resource directly from the command line.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Command Line Interface (CLI)"
  subtitle="Terminal-Based Cloud Control"
  tags={['OCI', 'CLI', 'DevOps', 'Automation']}
>

While the OCI Web Console is visually appealing, it is mathematically impossible to use a mouse to provision 500 Virtual Machines efficiently. The OCI CLI provides scriptable, programmatic access to the entire cloud.

## 1. The REST API Wrapper
Every single button in the OCI Web Console is secretly just executing an HTTP REST API call.
The OCI CLI is a mathematical wrapper around this API. When a developer types TICK1oci compute instance launch --shape VM.Standard2.1TICK1 in their terminal, the CLI mathematically constructs the required JSON payload, signs it cryptographically with the user's private RSA key, and fires the HTTP request directly to the OCI Control Plane. This allows engineers to write Bash or PowerShell scripts to completely automate their infrastructure deployments.

## 2. JMESPath Querying
When you ask the CLI for a list of all Virtual Machines, it returns a massive, highly nested mathematical JSON document containing thousands of lines of metadata.
The OCI CLI natively integrates **JMESPath**, a mathematical query language for JSON. 
Instead of piping the output into complex TICK1grepTICK1 or TICK1awkTICK1 commands, the engineer can append a query: TICK1--query "data[*].{Name:\"display-name\", State:\"lifecycle-state\"}"TICK1. The CLI mathematically filters the massive JSON response on the client side, outputting only a clean, human-readable table of the VM names and whether they are running or stopped.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/OCI SDK/index.mdx': `---
title: OCI Software Development Kits (SDKs)
description: A suite of language-specific libraries mathematically engineered to allow custom applications to securely authenticate and programmatically control Oracle Cloud infrastructure natively in code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Software Development Kits (SDKs)"
  subtitle="Programmatic Cloud Integration"
  tags={['OCI', 'Development', 'SDK', 'Automation']}
>

The OCI CLI is excellent for DevOps Bash scripts, but if a developer is writing a custom Java web application that needs to upload user avatars to OCI Object Storage, they cannot rely on terminal commands. They need the OCI SDK.

## 1. Native Language Integration
Oracle provides mathematically optimized SDKs for Java, Python, Go, TypeScript, and .NET.
These libraries handle the grueling mathematical complexity of cloud authentication. The OCI REST API strictly requires every single HTTP request to be cryptographically signed using an RSA-256 algorithm based on the HTTP headers. 
If a developer had to write this mathematical signature logic manually, it would take weeks. The SDK handles it entirely. The developer simply imports the SDK, writes TICK1client.putObject(file)TICK1, and the SDK mathematically handles the cryptographic signing, the network retries, and the JSON parsing automatically.

## 2. Waiters and Pagination
Cloud provisioning is asynchronous. If your Python code asks OCI to boot a Database, the API instantly returns a TICK1202 AcceptedTICK1 status, but the database will take 10 minutes to physically build.
The SDK provides **Waiters**. The developer writes TICK1waiters.forDatabaseAvailable(dbId)TICK1. The SDK automatically and mathematically implements a backoff polling algorithm, pausing the Python thread and checking the OCI API every few seconds until the database state mathematically transitions to TICK1AVAILABLETICK1, preventing the developer from having to write complex, infinite polling loops.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.4 Oracle Cloud Infrastructure/OCI tenancy/index.mdx': `---
title: OCI Tenancy
description: The absolute mathematical root boundary of an organization's presence in Oracle Cloud, providing strict, unbreachable physical and logical isolation from all other Oracle customers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OCI Tenancy"
  subtitle="The Root Cloud Boundary"
  tags={['OCI', 'Architecture', 'Security', 'Governance']}
>

When a corporation signs a contract with Oracle, they do not just get a username. They are mathematically allocated a **Tenancy**. A Tenancy is the highest level of logical isolation in the OCI architecture, equivalent to an AWS "Account."

## 1. Absolute Isolation
Oracle Cloud is a multi-tenant public cloud. Your company's Virtual Machines might physically reside on the exact same hardware rack as a competitor's Virtual Machines.
The Tenancy is the mathematical hypervisor boundary that guarantees absolute isolation. It is mathematically and physically impossible for a user in Tenancy A to see, access, or consume the resources in Tenancy B unless an explicit, cross-tenancy IAM trust policy is aggressively configured. All billing, all Compartments, and all IAM users exist strictly within the mathematical borders of the Tenancy.

## 2. The Root Compartment and Global Scope
When a Tenancy is created, it is instantiated with a **Root Compartment**. 
Every single resource the company ever builds will mathematically exist as a child of this Root Compartment. Furthermore, the Tenancy itself is **Global**. While a Virtual Machine is physically locked to a specific Region (like London), the Tenancy exists globally across the entire Oracle Cloud. This allows the Tenancy Administrators to write a single, global IAM policy in the Root Compartment that mathematically cascades down and secures every single server in every single data center on Earth simultaneously.

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
