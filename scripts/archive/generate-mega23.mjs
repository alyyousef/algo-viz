import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/IaaS/index.mdx': `---
title: Infrastructure as a Service (IaaS)
description: "The foundational layer of cloud computing, providing raw, virtualized computing resources like servers, storage, and networking over the internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Infrastructure as a Service (IaaS)">

**Infrastructure as a Service (IaaS)** is the most basic cloud computing model. Instead of buying physical Dell servers, racking them in a data center, and wiring them to routers, you rent virtual servers and virtual networks from a cloud provider (like AWS, Azure, or GCP).

With IaaS, you rent the *hardware*, but you are still responsible for installing and managing the Operating System, the runtime environment, the database software, and your application code.

## 1. Core IaaS Components
- **Compute**: Virtual Machines (VMs). You choose the CPU cores, RAM, and base OS image (e.g., Ubuntu, Windows Server).
  - *Examples*: AWS EC2, Azure Virtual Machines, Google Compute Engine (GCE).
- **Storage**: Raw block storage attached to the VMs, or object storage for files.
  - *Examples*: AWS EBS (Elastic Block Store), AWS S3.
- **Networking**: Virtual Private Clouds (VPCs), subnets, routing tables, and firewalls (Security Groups).
  - *Examples*: AWS VPC, Azure Virtual Network.

## 2. The Shared Responsibility Model
In IaaS, security is a shared responsibility:
- **The Cloud Provider** is responsible for the "Security *of* the Cloud" (physical data center locks, hypervisor security, cooling, power).
- **You (The Customer)** are responsible for the "Security *in* the Cloud" (patching the Linux kernel on your VM, configuring firewall rules, encrypting your data, managing user access).

<ComparisonTable 
  headers={['Pros of IaaS', 'Cons of IaaS']} 
  rows={[
    ['Ultimate Control: You have root/admin access to the OS.', 'High Management Overhead: You must patch OS updates and manage security.'],
    ['Flexibility: You can run legacy software that requires specific OS tweaks.', 'Scaling Complexity: You must manually configure Auto Scaling groups and Load Balancers.'],
    ['No Hardware CapEx: Pay-as-you-go instead of buying $10k servers upfront.', 'Skill Barrier: Requires experienced System Administrators/DevOps engineers.']
  ]} 
/>

<Callout icon="tip" title="When to use IaaS">
Use IaaS when you are migrating legacy on-premise applications to the cloud via a "Lift and Shift" strategy, or when you require strict, low-level control over the operating system kernel and network stack.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/PaaS/index.mdx': `---
title: Platform as a Service (PaaS)
description: "A cloud computing model that abstracts away infrastructure management, providing a ready-to-use platform for developers to deploy and run applications."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Platform as a Service (PaaS)">

**Platform as a Service (PaaS)** sits one layer above IaaS. With PaaS, you no longer manage the Operating System, the runtime (like Node.js or Java), or the server updates. 

You simply upload your source code, and the PaaS provider handles the provisioning, load balancing, and scaling of the underlying servers automatically.

## 1. The Developer Experience
In an IaaS environment (like AWS EC2), deploying a Node.js app requires: 
1. Provisioning a Linux VM.
2. SSHing into the VM.
3. Installing Node.js, NPM, and PM2.
4. Configuring Nginx as a reverse proxy.
5. Cloning the Git repo and starting the app.

In a PaaS environment (like Heroku or AWS Elastic Beanstalk), deploying requires one command:
TICK1git push heroku masterTICK1. The platform automatically detects the language, installs dependencies, provisions a container, routes traffic, and handles SSL certificates.

## 2. Examples of PaaS
- **Application PaaS**: Heroku, AWS Elastic Beanstalk, Google App Engine, Azure App Service, Vercel, Netlify.
- **Database PaaS (DBaaS)**: Amazon RDS, Azure SQL Database. (You don't install PostgreSQL on a Linux server; you just click a button and AWS gives you a connection string to a fully managed, automatically backed-up PostgreSQL instance).

## 3. The Trade-off: Control vs Velocity

<ComparisonTable 
  headers={['IaaS', 'PaaS']} 
  rows={[
    ['You manage the OS, runtime, and infrastructure.', 'You manage ONLY your application code and data.'],
    ['Slower time-to-market due to infrastructure setup.', 'Extremely fast time-to-market.'],
    ['Maximum control and flexibility.', 'Vendor lock-in; restricted to the runtimes the platform supports.'],
    ['Generally cheaper per compute hour.', 'Generally more expensive (you are paying a premium for the automation).']
  ]} 
/>

<Callout icon="warning" title="The Escape Hatch">
The biggest risk of PaaS is outgrowing the platform. If your application requires a custom C++ library installed on the OS, or requires tweaking the kernel TCP limits, you cannot do it on a PaaS. You will be forced to migrate back down to IaaS or Containers (Kubernetes).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/SaaS/index.mdx': `---
title: Software as a Service (SaaS)
description: "The highest level of cloud abstraction, delivering fully managed software applications over the internet on a subscription basis."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Software as a Service (SaaS)">

**Software as a Service (SaaS)** is the model most familiar to end-users. In SaaS, the cloud provider manages absolutely everything: the servers, the network, the operating system, the database, and the application code itself.

The customer simply opens a web browser, logs in, and uses the software.

## 1. The SaaS Business Model
Instead of buying a CD-ROM with Microsoft Office 2010, installing it locally, and buying a new CD five years later, customers pay a recurring monthly or annual subscription fee (e.g., Microsoft 365). 

This is incredibly lucrative for software companies (recurring revenue) and beneficial for customers (zero maintenance, instant updates).

## 2. Classic SaaS Examples
- **Enterprise SaaS**: Salesforce (CRM), Workday (HR), Slack/Microsoft Teams (Communication), Jira (Project Management).
- **Consumer SaaS**: Gmail, Netflix, Dropbox, Spotify.

## 3. The Pizza as a Service Analogy
To understand the relationship between IaaS, PaaS, and SaaS, consider the "Pizza as a Service" analogy:
- **On-Premise (Legacy)**: Making pizza at home. You provide the oven, the gas, the dough, the cheese, and do the cooking.
- **IaaS**: Buying a frozen pizza. You use your own oven and gas to cook it.
- **PaaS**: Pizza Delivery. They cook it using their oven and ingredients, but you provide the dining table and drinks at your house.
- **SaaS**: Dining out at a Pizzeria. They provide the pizza, the table, the drinks, and do the dishes. You just eat.

<Callout icon="tip" title="The Build vs Buy Decision">
In modern software engineering, the default stance is to "Buy" SaaS for commodity business functions (like email, CRM, HR) and only "Build" software that provides a core competitive advantage. A hospital shouldn't spend millions engineering a custom chat application when they can just buy Slack (SaaS).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/Serverless/index.mdx': `---
title: Serverless Computing
description: "An execution model where the cloud provider dynamically manages the allocation of machine resources, allowing developers to run code without provisioning or managing servers, and billing only for exact execution time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Serverless Computing">

Despite the name, **Serverless** does not mean there are no servers. It means the developer *thinks* about servers less. 

In a traditional architecture, a server runs 24/7 waiting for requests. You pay for it even if no one is using your app at 3:00 AM. In a Serverless architecture, your code is asleep (costing $0.00). When an HTTP request arrives, the cloud provider instantly spins up a tiny container, runs your code, returns the response, and kills the container. You are billed in increments of 1 millisecond.

## 1. Function as a Service (FaaS)
The core of Serverless compute is **FaaS**. 
You write a single function (e.g., in Node.js or Python) and upload it to the cloud. You configure a trigger (e.g., "Run this function when someone uploads an image to S3").
- **AWS**: AWS Lambda
- **Azure**: Azure Functions
- **GCP**: Google Cloud Functions

## 2. Serverless vs PaaS
While PaaS abstracts away OS management, a PaaS application is still generally a long-running process that requires you to specify the number of instances and scale them up/down. Serverless is strictly event-driven and scales automatically from 0 to 10,000 concurrent executions without any configuration.

## 3. The Cold Start Problem
Because Serverless functions "go to sleep" when not in use, the very first request that wakes them up experiences a delay (often 200ms to 2 seconds) while the cloud provider provisions the container and loads the runtime environment. This is called a **Cold Start**. Subsequent requests hit the warm container and execute in milliseconds.

<ComparisonTable 
  headers={['Metric', 'Traditional Server (EC2)', 'Serverless (Lambda)']} 
  rows={[
    ['Billing', 'Per Hour / Per Second (while running 24/7).', 'Per Millisecond of exact execution time.'],
    ['Scaling', 'Manual or Auto-Scaling Groups (takes minutes to spin up new VMs).', 'Instantaneous, per-request scaling.'],
    ['Idle Cost', 'High (paying for idle compute).', 'Zero (if no traffic, cost is exactly $0).'],
    ['State', 'Can store state on local disk.', 'Completely Stateless (must use external DB like DynamoDB).']
  ]} 
/>

<Callout icon="warning" title="Vendor Lock-in">
Serverless architectures are highly prone to vendor lock-in. An AWS Lambda function is often deeply integrated with AWS API Gateway, AWS S3, and Amazon DynamoDB. Migrating a fully Serverless application from AWS to Azure requires a near-complete rewrite of the infrastructure code.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/Regions/index.mdx': `---
title: Cloud Regions
description: "Distinct geographic locations worldwide where cloud providers cluster their physical data centers to reduce latency and comply with data sovereignty laws."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Cloud Regions">

When you deploy a virtual machine in "The Cloud," it physically exists on a silicon rack in a massive, highly secure warehouse. A **Region** is the broad geographic area where those warehouses are located.

Examples of AWS Regions:
- TICK1us-east-1TICK1 (N. Virginia, USA)
- TICK1eu-west-1TICK1 (Ireland)
- TICK1ap-northeast-1TICK1 (Tokyo, Japan)

## 1. Why Regions Matter
When architecting a cloud application, selecting the correct Region is the first and most critical decision, governed by three factors:

### Latency
Data cannot travel faster than the speed of light. If your users are entirely based in Australia, deploying your servers in TICK1us-east-1TICK1 (Virginia) means every API request must cross the Pacific Ocean twice, adding ~250ms of lag. You should deploy in TICK1ap-southeast-2TICK1 (Sydney) to achieve &lt;20ms latency.

### Data Sovereignty and Compliance
Many countries have strict privacy laws (like the EU's GDPR) stipulating that citizen data must not physically leave the country. A German bank must deploy their databases in TICK1eu-central-1TICK1 (Frankfurt) to ensure legal compliance.

### Cost
Electricity, real estate, and taxation vary wildly across the globe. Therefore, the exact same Virtual Machine costs different amounts depending on the Region. (e.g., TICK1sa-east-1TICK1 in São Paulo is traditionally much more expensive than TICK1us-east-1TICK1 in Virginia).

## 2. Region Independence
Cloud Regions are designed to be entirely independent and isolated from one another. If a massive natural disaster wipes out the TICK1ap-northeast-1TICK1 (Tokyo) region, TICK1us-east-1TICK1 will continue operating perfectly. They share no fate.

<Callout icon="tip" title="Global Services">
While most cloud services (like EC2 VMs) are "Region-scoped" (they exist only in the region you selected), a few services are "Global." For example, AWS IAM (Identity and Access Management) and Route 53 (DNS) are global services that span across all regions simultaneously.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/Availability zones/index.mdx': `---
title: Availability Zones (AZs)
description: "Isolated, highly redundant physical data centers located within a single Cloud Region, designed to provide fault tolerance against localized failures."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Availability Zones (AZs)">

If a **Region** is a geographic area (like "Northern Virginia"), an **Availability Zone (AZ)** is a specific, physical data center (or cluster of adjacent data centers) within that Region.

Every modern cloud Region contains a minimum of three AZs (e.g., TICK1us-east-1aTICK1, TICK1us-east-1bTICK1, TICK1us-east-1cTICK1).

## 1. Fault Isolation
The primary purpose of an AZ is **Fault Tolerance**.
AZs within the same Region are physically separated by miles. They are positioned on different power grids, different flood plains, and utilize different internet transit providers. 

If a hurricane, massive power outage, or fire destroys the TICK1us-east-1aTICK1 data center, TICK1us-east-1bTICK1 and TICK1us-east-1cTICK1 remain completely unaffected.

## 2. Multi-AZ Architecture
Because AZs are so close together (typically &lt;60 miles apart), they are connected via dedicated, ultra-high-speed fiber optic cables, resulting in single-digit millisecond latency between them.

This allows architects to build **Synchronous Multi-AZ** applications.
For a production database (like AWS RDS), you should always enable Multi-AZ deployment. The cloud provider will place the Primary Database in AZ-A, and a Standby Replica in AZ-B. Every time a user writes data, it is synchronously copied to both buildings before confirming success. 
If AZ-A suddenly loses power, the cloud automatically fails over to AZ-B in seconds with zero data loss.

## 3. Region vs AZ

<ComparisonTable 
  headers={['Metric', 'Region', 'Availability Zone (AZ)']} 
  rows={[
    ['Definition', 'A large geographic area (e.g., Ireland).', 'A single, isolated data center building within that area.'],
    ['Distance Apart', 'Thousands of miles.', 'Tens of miles.'],
    ['Latency Between', 'High (50ms - 200ms).', 'Ultra-Low (&lt;2ms).'],
    ['Disaster Protection', 'Protects against entire country/coastline catastrophes.', 'Protects against local fires, floods, and power grid failures.']
  ]} 
/>

<Callout icon="warning" title="Data Transfer Costs">
While transferring data *within* the same AZ is usually free, cloud providers charge money for data flowing *between* AZs (e.g., $0.01 per GB). For massive Big Data applications processing petabytes of traffic, poorly optimizing AZ-to-AZ traffic can result in shocking monthly bills.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/Autoscaling/index.mdx': `---
title: Autoscaling
description: "A cloud computing feature that automatically and dynamically adjusts the amount of computational resources allocated to an application based on real-time traffic demand."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Autoscaling">

In the on-premise era, if an e-commerce website expected massive traffic on Black Friday, they had to physically purchase and install 20 expensive servers in October. For the other 11 months of the year, 18 of those servers sat completely idle, wasting money and electricity.

The cloud solves this via **Elasticity and Autoscaling**.

## 1. How Autoscaling Works
An Autoscaling Group (ASG) monitors metrics (like CPU utilization) across a fleet of Virtual Machines. 

- **Scale Out (Provisioning)**: If average CPU spikes above 80% due to a viral marketing campaign, the ASG automatically provisions 5 new VMs, registers them with the Load Balancer, and distributes the traffic.
- **Scale In (De-provisioning)**: When the viral traffic subsides and average CPU drops below 30%, the ASG safely terminates the 5 excess VMs, instantly stopping the hourly billing for those machines.

## 2. Horizontal vs Vertical Scaling

<ComparisonTable 
  headers={['Type', 'Definition', 'Cloud Example', 'Limitations']} 
  rows={[
    ['Horizontal Scaling (Scaling OUT/IN)', 'Adding or removing MORE machines to a cluster.', 'Autoscaling Group adding 5 new EC2 instances.', 'Application must be designed to be Stateless (e.g., storing sessions in Redis, not on local disk).'],
    ['Vertical Scaling (Scaling UP/DOWN)', 'Increasing the size (CPU/RAM) of an EXISTING machine.', 'Stopping a 2GB RAM VM and changing it to a 64GB RAM VM.', 'Requires downtime (reboot). Has a hard physical limit (you can only buy a server so big).']
  ]} 
/>

*In modern cloud architecture, Horizontal Scaling is vastly preferred for web applications, while Vertical Scaling is often necessary for massive monolithic databases.*

## 3. Types of Scaling Policies
- **Target Tracking**: "Always keep the average CPU of the fleet exactly at 50%." (The easiest and most common policy).
- **Step Scaling**: "If CPU > 70%, add 2 instances. If CPU > 90%, add 10 instances."
- **Scheduled Scaling**: "Every Friday at 9:00 AM, scale out to 20 instances because we know our marketing email goes out then."
- **Predictive Scaling**: The cloud provider uses Machine Learning to analyze historical traffic patterns and proactively scales up *before* the spike hits.

<Callout icon="tip" title="Stateless Architecture">
Autoscaling absolutely requires a **Stateless Architecture**. If User A logs into Web Server 1, and the session token is saved on Web Server 1's local hard drive, User A will be logged out if the Load Balancer routes their next request to Web Server 2. Sessions must be stored in a centralized database or cache (like Redis) so any server can handle any request.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing — Fundamentals/High availability/index.mdx': `---
title: High Availability (HA)
description: "A system design approach and associated service implementation that ensures a prearranged level of operational performance will be met during a contractual measurement period."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="High Availability (HA)">

In distributed systems, everything fails eventually. Hard drives crash, power lines are severed, and network switches burn out. **High Availability (HA)** is the architectural discipline of ensuring an application remains accessible to users *despite* these inevitable hardware and software failures.

## 1. Measuring HA (The "Nines")
HA is measured as a percentage of uptime per year. Engineers refer to this as the "number of nines." Every additional "nine" requires exponentially more complex and expensive engineering.

<ComparisonTable 
  headers={['Uptime %', 'Colloquial Name', 'Downtime per Year', 'Typical Use Case']} 
  rows={[
    ['99.0%', 'Two Nines', '3 days, 15 hours', 'Internal batch processing scripts.'],
    ['99.9%', 'Three Nines', '8.76 hours', 'Standard corporate web applications.'],
    ['99.99%', 'Four Nines', '52.6 minutes', 'E-commerce, consumer SaaS, payments.'],
    ['99.999%', 'Five Nines', '5.26 minutes', 'Telecommunications, aviation, critical cloud infrastructure.']
  ]} 
/>

## 2. Core HA Principles
To achieve HA, you must eliminate **Single Points of Failure (SPOF)**.
1. **Redundancy**: Deploying a minimum of two Virtual Machines behind a Load Balancer. If VM 1 crashes, the Load Balancer detects the failure via a Health Check and routes all traffic to VM 2.
2. **Multi-AZ Deployment**: Placing VM 1 in Availability Zone A, and VM 2 in Availability Zone B. If an entire data center catches fire, the application survives.
3. **Failover**: For stateful databases, utilizing an Active-Passive setup. The primary database replicates data synchronously to a secondary standby database. If the primary dies, DNS automatically routes traffic to the standby.

## 3. SLAs (Service Level Agreements)
HA is a business contract. Cloud providers offer SLAs guaranteeing specific uptimes (e.g., AWS guarantees 99.99% uptime for EC2 instances deployed across multiple AZs). 
If the provider fails to meet the SLA, they are legally obligated to issue financial credits to your account.

<Callout icon="warning" title="Cost of Five Nines">
Business stakeholders often demand "100% uptime," not realizing the engineering cost. Moving an application from 99.9% (Single Region, Multi-AZ) to 99.999% (Multi-Region, Active-Active Global database replication) will often multiply the infrastructure and engineering costs by 10x.
</Callout>

</ConceptTemplate>
`,
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
