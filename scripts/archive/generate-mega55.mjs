import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/Cloud computing/index.mdx': `---
title: Cloud Computing
description: The delivery of computing services—including servers, storage, databases, networking, and software—over the Internet on a pay-as-you-go basis.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud Computing">

Historically, if a company wanted to launch a website, they had to physically purchase a $10,000 server, plug it into the wall, install an operating system, and hire a systems administrator to keep it from catching fire. 

**Cloud Computing** is the practice of renting those servers from massive tech companies (like Amazon, Microsoft, or Google) instead of buying them yourself.

## 1. The Core Benefits

- **Capital Expense (CapEx) to Variable Expense (OpEx)**: Instead of spending millions upfront building data centers, you pay only for the exact amount of CPU and RAM you consume, billed by the millisecond.
- **Elasticity (Scaling)**: If your app suddenly goes viral, you don't have to wait 3 weeks to order new hardware. You click a button, and the cloud provider instantly provisions 1,000 extra servers for you, and automatically destroys them when traffic dies down.
- **Global Reach**: You can deploy your application to servers in Tokyo, London, and New York simultaneously with a single click, providing low latency to users worldwide.

## 2. Cloud Deployment Models

- **Public Cloud**: Owned by a third-party provider (AWS, Azure) and accessed over the public internet. You share the underlying physical hardware with thousands of other companies (Multi-tenant).
- **Private Cloud**: A cloud environment dedicated entirely to one single organization, usually maintained on-site behind a corporate firewall. Extremely expensive, but required by some banks and governments.
- **Hybrid Cloud**: A combination of both. A bank might run its highly sensitive database on a Private Cloud, but run its front-end web servers on the Public Cloud to handle traffic spikes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/IaaS/index.mdx': `---
title: Infrastructure as a Service (IaaS)
description: The foundational layer of cloud computing that provides raw, virtualized hardware resources like virtual machines, storage drives, and networking over the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Infrastructure as a Service (IaaS)">

Cloud computing is divided into three primary "Service Models" based on how much control you want versus how much management you want the cloud provider to do. The lowest level is **IaaS (Infrastructure as a Service)**.

## 1. The Raw Hardware

In an IaaS model, the cloud provider (like AWS) only manages the physical data center, the physical servers, and the virtualization hypervisor. 
They give you an empty **Virtual Machine (VM)** and a virtual hard drive.

- **You control**: The Operating System (Linux/Windows), all the installed software, the database, the security patches, and the application code.
- **They control**: Keeping the physical server plugged in and the hard drive spinning.

## 2. Examples of IaaS

- **Amazon EC2 (Elastic Compute Cloud)**: The most famous IaaS product in the world. You rent raw Linux or Windows virtual machines.
- **Google Compute Engine (GCE)**: Google's equivalent VM offering.
- **Amazon S3**: Raw object storage drives.

## 3. The Trade-off

IaaS gives you maximum control. If you want to install a highly experimental, custom-compiled Linux kernel from 2004, you can. 
However, it also gives you maximum responsibility. If a critical security vulnerability is discovered in Linux, AWS will not fix it for you. If you don't log into your VM and run \`apt-get upgrade\`, your server will be hacked.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/PaaS/index.mdx': `---
title: Platform as a Service (PaaS)
description: A cloud model that abstracts away the operating system and servers, providing a managed platform where developers only need to upload their application code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Platform as a Service (PaaS)">

While IaaS gives you a raw Virtual Machine and forces you to install the Operating System and configure the web server yourself, **PaaS (Platform as a Service)** abstracts the entire underlying infrastructure away.

## 1. The Developer Experience

In a PaaS model, you do not even know what operating system the server is running. You simply write your Node.js or Python code on your laptop, and upload it to the platform. 

The PaaS provider automatically:
1. Provisions the servers.
2. Installs the correct version of Node.js.
3. Sets up a Load Balancer.
4. Secures the operating system with the latest patches.
5. Automatically spins up more servers if traffic spikes.

## 2. Examples of PaaS

- **Heroku**: The pioneer of PaaS. Developers simply ran \`git push heroku master\`, and their code was instantly live on the internet.
- **AWS Elastic Beanstalk**: Amazon's managed PaaS offering.
- **Vercel / Netlify**: Modern PaaS platforms optimized specifically for Frontend frameworks like Next.js and React.

## 3. The Trade-off

PaaS drastically accelerates development speed because software engineers don't have to waste time acting as system administrators. 
However, you lose control over the underlying environment. If your application strictly requires a specific, obscure C++ library to be installed at the OS level, the PaaS provider might not allow you to install it, forcing you to downgrade back to IaaS.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/Serverless/index.mdx': `---
title: Serverless Computing
description: An execution model where the cloud provider dynamically manages the allocation of machine resources, and customers are billed strictly for the exact milliseconds their code executes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Serverless Computing (FaaS)">

**Serverless** is a terrible name, because there are absolutely still servers involved. 
However, from the developer's perspective, the servers no longer exist. You do not provision them, you do not manage them, and most importantly, **you do not pay for them when they are idle.**

## 1. Function as a Service (FaaS)

The core of Serverless is FaaS. Instead of deploying an entire monolithic application, you deploy a single, isolated function (e.g., a function that resizes an image).

When a user uploads an image, the cloud provider instantly spins up a micro-container, executes your function, and destroys the container. 
If 10,000 users upload images simultaneously, the provider spins up 10,000 containers in parallel. 
If nobody uploads an image for a month, you pay exactly **$0.00**.

## 2. The Cold Start Problem

Because the provider destroys the server when it's idle, the next time someone triggers the function, the provider has to boot the container back up from scratch. This takes about 500 milliseconds and is known as a **Cold Start**. 
For highly interactive web APIs, a 500ms delay on the first request can be unacceptable, requiring complex workarounds to keep the functions "warm".

## 3. Serverless Databases

The Serverless concept has expanded beyond compute. A traditional database (like AWS RDS) charges you $100/month just to keep the server spinning, even if you never query it. 
A **Serverless Database** (like Amazon DynamoDB or Serverless Aurora) charges you based entirely on the number of Read/Write operations you perform, offering infinite scalability and zero idle costs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/High availability/index.mdx': `---
title: High Availability (HA) & Fault Tolerance
description: The architectural principles of designing systems that remain continuously operational for a specific percentage of time, eliminating single points of failure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="High Availability (HA) & Fault Tolerance">

Hardware fails. Hard drives corrupt, power supplies explode, and fiber optic cables get cut by construction workers. 
If your application runs on a single server, and that server dies, your application goes offline. **High Availability (HA)** is the architectural practice of ensuring your app stays online even when the underlying hardware inevitably burns down.

## 1. The Nines (Service Level Agreements)

Availability is measured in "Nines", representing the percentage of time a system is guaranteed to be online per year:
- **99% (Two Nines)**: 3.65 days of allowable downtime per year.
- **99.9% (Three Nines)**: 8.77 hours of downtime.
- **99.99% (Four Nines)**: 52.6 minutes of downtime.
- **99.999% (Five Nines)**: 5.26 *minutes* of downtime per year. (Considered the gold standard for telecom and financial systems).

## 2. Eliminating Single Points of Failure (SPOF)

To achieve HA, you must remove every Single Point of Failure in your architecture through **Redundancy**.

1. **Load Balancing**: Instead of 1 web server, you run 3 web servers behind a Load Balancer. If Server A crashes, the Load Balancer instantly detects it and routes all traffic to Servers B and C.
2. **Availability Zones (AZs)**: If all 3 servers are in the same physical data center, a massive power outage takes them all down. Cloud providers split Regions into multiple Availability Zones (physically separated data centers 50 miles apart on different power grids). You must deploy Server A in AZ-1, Server B in AZ-2, and Server C in AZ-3.
3. **Database Replication**: A single database is a massive SPOF. You must configure Primary-Replica replication, preferably spanning across multiple Availability Zones, so if the Primary datacenter floods, the Replica instantly takes over.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EC2/index.mdx': `---
title: Amazon EC2 (Elastic Compute Cloud)
description: The foundational compute service of AWS, allowing users to rent and configure scalable virtual machines in the cloud.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Amazon EC2 (Elastic Compute Cloud)">

**EC2** is the oldest and most fundamental service in AWS. It is pure Infrastructure as a Service (IaaS). It allows you to rent a Virtual Machine (called an "Instance"), install an Operating System on it, and run whatever code you want.

## 1. Instance Types

AWS does not just offer generic servers. They offer highly specialized hardware profiles (Instance Families) tailored to specific workloads:
- **T-Series (General Purpose)**: Cheap, burstable CPU instances perfect for basic web servers and microservices (e.g., \`t3.micro\`).
- **C-Series (Compute Optimized)**: Packed with high-frequency processors for intensive math, batch processing, and gaming servers.
- **R-Series (Memory Optimized)**: Packed with massive amounts of RAM for running in-memory databases like Redis or high-performance relational databases.
- **P/G-Series (Accelerated Computing)**: Instances attached to massive NVIDIA GPUs, used exclusively for training Machine Learning models and rendering 3D graphics.

## 2. Pricing Models

EC2 is famous for its complex billing structures that allow companies to optimize costs:
1. **On-Demand**: You pay by the second, with no long-term commitment. The most expensive option, but completely flexible.
2. **Reserved Instances**: You sign a 1-year or 3-year contract promising to use the instance, in exchange for up to a 72% discount.
3. **Spot Instances**: AWS has thousands of unused servers sitting idle. They auction these off at a 90% discount. *The catch:* If someone else is willing to pay more, AWS gives you a 2-minute warning and abruptly terminates your server. Spot instances are only used for fault-tolerant batch jobs that can afford to be interrupted.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/S3/index.mdx': `---
title: Amazon S3 (Simple Storage Service)
description: The internet's hard drive. A highly durable, infinitely scalable object storage service used to store images, videos, backups, and data lakes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Amazon S3 (Simple Storage Service)">

**S3** is a massively scalable **Object Storage** service. Unlike a traditional hard drive (Block Storage) or a file system with folders (File Storage), S3 stores data as flat "Objects" inside a "Bucket."

It is widely considered the backbone of the modern internet. If you download an image on Netflix, a PDF on a banking app, or a log file from a data lake, it is almost certainly stored in S3.

## 1. Eleven Nines of Durability

The most famous metric in cloud computing is S3's durability guarantee: **99.999999999% (11 Nines)**. 
If you store 10,000,000 objects in S3, statistically, you can expect to lose exactly *one* object every 10,000 years. 

It achieves this by automatically copying every file you upload across at least 3 completely different, physically separated data centers (Availability Zones) before it even confirms the upload was successful.

## 2. Storage Classes

S3 allows you to move data between different "Tiers" to save massive amounts of money based on how often you access the data:
- **S3 Standard**: For data accessed frequently (like profile pictures on a live website). Most expensive storage, but retrieval is free and instant.
- **S3 Infrequent Access (IA)**: For backups you access once a month. Storage is 50% cheaper, but they charge you a fee every time you retrieve a file.
- **S3 Glacier Deep Archive**: For legal compliance records you must keep for 10 years but will never look at. Storage costs pennies per terabyte, but retrieving a file takes 12 hours.

<Callout icon="warning" title="S3 Security Disasters">
  By default, S3 buckets are completely private. However, due to misconfigurations in IAM policies, "Leaked S3 Buckets" are the number one cause of massive corporate data breaches. Engineers accidentally click "Make Public" on a bucket containing millions of unencrypted customer passports, leaving them exposed to the open internet.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/VPC/index.mdx': `---
title: Amazon VPC (Virtual Private Cloud)
description: The foundational networking layer of AWS that allows users to carve out a logically isolated section of the cloud and launch resources in a virtual network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Amazon VPC (Virtual Private Cloud)">

When you launch an EC2 instance, it doesn't just float in the void. It must be connected to a network. 
A **VPC (Virtual Private Cloud)** is a logically isolated, private network that you completely control. It is exactly like the physical networking router in your office building, but entirely virtualized.

## 1. Subnets (Public vs Private)

You divide your VPC's IP address range into smaller chunks called **Subnets**. The most critical architectural decision in AWS is isolating these subnets for security.

- **Public Subnets**: Connected to an "Internet Gateway". Any EC2 instance (like a web server) placed here can talk to the internet, and the internet can talk back.
- **Private Subnets**: Completely isolated from the internet. You must place your Databases and internal microservices here. Even if a hacker knows the IP address of your database, they cannot reach it from the outside world.

## 2. Security Groups and NACLs

VPCs enforce strict firewall rules at two different levels:
1. **Network Access Control Lists (NACLs)**: The outermost firewall. It operates at the Subnet level. If you detect an attack from a specific IP address in Russia, you create a NACL rule to explicitly block that IP from entering the subnet.
2. **Security Groups**: The innermost firewall. It operates at the individual EC2 instance level. You attach a Security Group to your Web Server that says *"Only allow incoming traffic on Port 443 (HTTPS), and block absolutely everything else."* 

<Callout icon="tip" title="NAT Gateways">
  If a Database in a Private Subnet needs to download a security patch from the internet, it can't, because it has no internet access. You solve this by placing a **NAT Gateway** in the Public Subnet. The database routes its request to the NAT Gateway, which fetches the patch from the internet and passes it back down to the database, ensuring the database remains hidden from inbound attacks.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Lambda/index.mdx': `---
title: AWS Lambda
description: The pioneering Serverless compute service that lets you run code without provisioning or managing servers, scaling automatically based on incoming events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWS Lambda">

Introduced in 2014, **AWS Lambda** single-handedly invented the concept of Serverless computing (FaaS). It revolutionized cloud architecture by completely removing the need to manage EC2 virtual machines.

## 1. Event-Driven Architecture

Lambda is fundamentally event-driven. A Lambda function does absolutely nothing and costs absolutely nothing until an **Event** triggers it.
Common triggers include:
- An HTTP request hitting an AWS API Gateway.
- A user uploading an image to an S3 Bucket (triggering a Lambda to create a thumbnail).
- A message arriving in an SQS Queue.
- A scheduled cron job from EventBridge running every 5 minutes.

## 2. Extreme Concurrency

If your API receives 1 request, AWS spins up 1 micro-container to run your Lambda.
If a Super Bowl commercial airs and your API receives 10,000 requests in a single second, AWS instantly spins up 10,000 isolated micro-containers to process them all simultaneously. 

You do not need to configure Load Balancers or Autoscaling Groups. The concurrency is managed entirely by AWS.

## 3. The Execution Limits

Lambda is not meant for long-running processes. It is designed for microservices.
- **Time Limit**: A Lambda function is hard-killed by AWS if it runs for more than 15 minutes. (If you have a batch job that takes 2 hours, you must use EC2 or ECS, not Lambda).
- **Statelessness**: Because containers are constantly created and destroyed, Lambda functions are entirely stateless. You cannot save a file to the local hard drive and expect it to be there on the next request. All state must be saved to an external database like DynamoDB.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/IAM/index.mdx': `---
title: AWS IAM (Identity and Access Management)
description: The absolute core security service in AWS, dictating exactly who or what is allowed to perform specific actions on specific resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWS IAM (Identity and Access Management)">

**IAM** is the overarching security umbrella of AWS. Every single API call made in AWS—whether it's launching an EC2 instance, reading an S3 file, or deleting a database—must pass through IAM for authorization. 

If IAM is misconfigured, your entire cloud infrastructure will be compromised.

## 1. Users, Groups, and Policies

- **IAM Users**: Represents a physical human being (or an external application) that needs to log in to AWS.
- **IAM Policies**: JSON documents that explicitly define permissions. For example, a policy might say: *"Allow the \`s3:PutObject\` action, but only on the bucket named \`production-backups\`."*
- **IAM Groups**: Instead of attaching policies to 50 individual developers, you create a \`Developers\` Group, attach the policy to the group, and place the users inside it.

## 2. The Principle of Least Privilege

The golden rule of IAM is **Least Privilege**. You must give a user the absolute bare minimum permissions required to do their job, and nothing more. If a developer only needs to read from S3, you must explicitly deny them the ability to write to S3 or launch expensive EC2 servers.

## 3. IAM Roles (For Machines)

It is a catastrophic security vulnerability to hardcode AWS API Keys (Access Key ID and Secret Key) inside your application code to allow your EC2 instance to talk to S3. If the code is leaked to GitHub, hackers will steal the keys.

Instead, you use **IAM Roles**. 
A Role is an identity that an AWS Service (like an EC2 instance or a Lambda function) can temporarily "assume". You attach the Role directly to the EC2 server. The server can now securely talk to S3 without a single hardcoded password existing anywhere in your codebase.

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
