import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Route tables/index.mdx': `---
title: AWS Route Tables
description: The mathematical navigation system within an AWS VPC that explicitly dictates exactly where network traffic should be forwarded when it leaves a specific subnet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Route Tables"
  subtitle="VPC Traffic Navigation"
  tags={['AWS', 'Networking', 'VPC', 'Routing']}
>

When an EC2 server in Subnet A tries to talk to a database in Subnet B, the network packets do not magically know where to go. They hit the subnet's router, which mathematically consults the Route Table.

## 1. The Local Route
Every Route Table in a VPC mathematically contains an un-deletable **Local Route**.
If your VPC is TICK110.0.0.0/16TICK1, the Local Route explicitly states: *"If a packet is destined for any IP starting with 10.0., route it internally within this VPC."*
This mathematical absolute guarantees that every subnet inside a VPC can ping every other subnet inside the same VPC by default, assuming Security Groups allow it.

## 2. Defining Public vs. Private
The Route Table is the absolute mathematical definition of whether a Subnet is Public or Private.
- **Public Subnet**: The Route Table contains a rule: *"If destination is TICK10.0.0.0/0TICK1 (the internet), target the Internet Gateway (igw-123)."*
- **Private Subnet**: The Route Table does *not* contain a route to the IGW. It might contain a route targeting a NAT Gateway (nat-456) for secure outbound access, or it might have no internet route at all.
If you place a web server in a subnet that lacks a Route Table entry for the Internet Gateway, it is mathematically impossible for the internet to reach that server.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/S3/index.mdx': `---
title: Amazon Simple Storage Service (S3)
description: The foundational object storage service of the internet, mathematically engineered to store and retrieve any amount of data from anywhere with 99.999999999% durability.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon S3"
  subtitle="Infinite Object Storage"
  tags={['AWS', 'Storage', 'Object', 'Serverless']}
>

S3 is not a hard drive (like EBS) or a file system (like EFS). It is an **Object Store**. You do not format S3, and it has no concept of physical directories. It is a massive, flat mathematical table mapping Keys to Data.

## 1. Objects and Keys
When you upload TICK1image.pngTICK1 to a folder called TICK1/uploads/TICK1, S3 does not create a physical folder. 
It creates an Object where the mathematical Key is the string TICK1"uploads/image.png"TICK1. Because it is a flat Key-Value store, it scales infinitely. There is no hierarchical file system overhead to slow down lookups when the bucket reaches 10 billion objects.

## 2. The Eleven Nines of Durability
S3 is famous for its **99.999999999% (11 Nines) Durability** mathematical guarantee.
If you store 10,000 objects in S3, on average, you will lose a single file once every 10,000,000 years.
AWS achieves this by instantly, automatically replicating every byte of your data across a minimum of three distinct physical Availability Zones (data centers) before returning a "200 OK" success message to your API call. Even if a massive natural disaster instantly destroys two entire Amazon data centers, your data survives intact in the third.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/SageMaker/index.mdx': `---
title: Amazon SageMaker
description: AWS's flagship, fully managed Machine Learning service that mathematically accelerates the entire AI lifecycle, providing managed Jupyter notebooks, distributed training clusters, and high-performance model serving endpoints.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon SageMaker"
  subtitle="The Enterprise ML Platform"
  tags={['AWS', 'Machine Learning', 'MLOps', 'Platform']}
>

Building a Machine Learning model on a laptop is easy. Securing the data, scaling the training across 50 GPUs, and deploying the model to a production API with auto-scaling is an infrastructure nightmare. SageMaker manages the entire pipeline.

## 1. Managed Training Jobs
In SageMaker, you do not manually spin up EC2 servers to train a model. 
You write your PyTorch script and call the SageMaker API: *"Train this script using 8 NVIDIA A100 GPUs."*
SageMaker mathematically provisions the massive cluster, pulls your training data directly from S3, injects your script into a managed Docker container, runs the training, saves the final model weights back to S3, and instantly destroys the cluster. You only pay for the exact seconds the math was running, completely eliminating the cost of idle GPUs.

## 2. SageMaker Endpoints
Once the model is trained, you must serve it. 
You call the SageMaker Deploy API. SageMaker automatically wraps your model in a high-performance C++ serving engine, deploys it to a fleet of EC2 instances spread across three Availability Zones, and places them behind a Load Balancer. It mathematically monitors the traffic; if 10,000 users hit the API, SageMaker automatically provisions more servers to handle the load, ensuring your inference latency never spikes.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Secrets Manager/index.mdx': `---
title: AWS Secrets Manager
description: A highly secure, encrypted vault designed to safely store, mathematically rotate, and precisely control access to database passwords, API keys, and sensitive cryptographic credentials.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Secrets Manager"
  subtitle="Automated Credential Vault"
  tags={['AWS', 'Security', 'Encryption', 'Database']}
>

Hardcoding a database password in your Python code or a GitHub repository is a fatal security flaw. Secrets Manager mathematically decouples the code from the credentials.

## 1. Centralized Retrieval
Instead of a password, your code contains the ARN (Amazon Resource Name) of the Secret.
When your Lambda function boots up, it makes an API call to Secrets Manager: *"Give me the database password."* 
Secrets Manager intercepts the request, mathematically checks the IAM Policy attached to the Lambda function, and if Authorized, uses KMS to decrypt the string and return it in memory. If a developer accidentally leaks the source code, the code only contains a harmless ARN; the password remains mathematically locked in AWS.

## 2. Automated Rotation
Database passwords should not last forever. Passwords should rotate every 30 days.
Secrets Manager handles this mathematically and automatically. 
On day 30, it triggers an invisible Lambda function. This function logs into the live RDS database, generates a complex new mathematical password, updates the database, and updates Secrets Manager. The next time your application requests the password, it receives the new one. This ensures zero-downtime credential rotation without any human intervention.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Security Groups/index.mdx': `---
title: AWS Security Groups
description: The fundamental, stateful virtual firewall assigned directly to an EC2 instance or ENI, mathematically dictating which specific IP addresses and ports are allowed to communicate with the resource.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Security Groups"
  subtitle="The Instance-Level Firewall"
  tags={['AWS', 'Security', 'Networking', 'Firewall']}
>

NACLs protect the neighborhood (the Subnet). Security Groups protect the house (the specific EC2 Instance). Even if a packet makes it past the NACL, the Security Group must explicitly allow it.

## 1. Stateful Filtering
The most important mathematical property of a Security Group is that it is **Stateful**.
If your EC2 web server initiates an outbound connection to download a file from GitHub, the Security Group mathematically registers the "state" of that connection. When the file packet returns from GitHub, the Security Group automatically allows it back in, completely ignoring the Inbound Rules. 
This means you can strictly set your Inbound Rules to only allow Port 443 (HTTPS) from the internet, while still allowing the server to safely browse the web outward.

## 2. Group Chaining
Security Groups do not just accept IP addresses; they mathematically accept *other Security Groups*.
If you have an Auto Scaling Group of 50 Web Servers and 1 Database Server, you do not want to hardcode 50 IP addresses into the Database firewall (because the IPs constantly change). 
Instead, you create a rule on the Database Security Group: *"Allow Port 5432 from any instance currently assigned the 'Web-Server-SG'."* AWS mathematically evaluates this at the network hypervisor level. When a new Web Server boots up, it instantly gains access to the database, creating a highly elastic, unbreakable security chain.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/SNS/index.mdx': `---
title: Amazon SNS (Simple Notification Service)
description: A highly scalable, fully managed Pub/Sub (Publish/Subscribe) messaging service used to mathematically broadcast a single event simultaneously to millions of subscribers or microservices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon SNS"
  subtitle="The Pub/Sub Broadcaster"
  tags={['AWS', 'Messaging', 'PubSub', 'Events']}
>

If an EC2 server crashes, you want to email the admin, trigger an auto-scaling Lambda function, and send a Slack message. Writing a Python script to do all three sequentially is slow and error-prone. SNS mathematically executes them in parallel.

## 1. The Pub/Sub Architecture
SNS relies on a mathematical concept called a **Topic**.
A microservice (the Publisher) does not know who is listening. It simply publishes a single JSON message to the TICK1ServerCrashTICK1 Topic. 
Multiple entities (the Subscribers) mathematically attach themselves to the Topic. A Subscriber can be an SQS Queue, a Lambda Function, an HTTP endpoint, or an SMS phone number. 
When the message hits the Topic, SNS mathematically duplicates the bytes and executes a massive "Fan-Out", pushing the message concurrently to all subscribers in milliseconds.

## 2. Message Filtering
A subscriber might not want *every* message on a Topic.
If the Billing Service subscribes to the TICK1AllPurchasesTICK1 Topic, it might only care about purchases over $1,000. 
Instead of receiving the message, reading it, and throwing it away (wasting compute), the subscriber sets a mathematical **Filter Policy** on the subscription (e.g., TICK1{"amount": [{"numeric": [">=", 1000]}]}TICK1). SNS mathematically evaluates the JSON payload at the network level and only forwards the message if it strictly matches the logic, drastically reducing downstream compute costs.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/SQS/index.mdx': `---
title: Amazon SQS (Simple Queue Service)
description: The oldest service in AWS, providing a massively scalable, mathematically durable message queue that decouples microservices by safely holding data until the receiving application is ready to process it.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon SQS"
  subtitle="The Decoupling Queue"
  tags={['AWS', 'Messaging', 'Queues', 'Decoupling']}
>

If an API receives 10,000 video upload requests per second, and the backend video processing server can only handle 10 per second, the backend will instantly crash (a Denial of Service). SQS is the mathematical shock absorber that prevents this.

## 1. Asynchronous Decoupling
Instead of the API talking directly to the Video Server, the API takes the request, converts it to JSON, and drops it into the SQS Queue. The API immediately returns a "200 OK" to the user.
The SQS Queue acts as an infinite, highly durable buffer. The Video Server mathematically pulls messages from the Queue at its own safe pace. If the Queue spikes to 100,000 messages, the data is safe. The system mathematically scales up more Video Servers to drain the queue faster, completely decoupling the speed of the Producer from the speed of the Consumer.

## 2. Visibility Timeout
When a server pulls a message from SQS, SQS does not delete it. It mathematically hides the message using the **Visibility Timeout** (e.g., 30 seconds). 
If the Video Server successfully processes the video, it sends a TICK1DeleteMessageTICK1 command, permanently erasing it. 
However, if the Video Server crashes while processing, it never sends the Delete command. After 30 seconds, the mathematical timer expires, and the message magically becomes visible in the queue again, allowing a *different* server to pick it up. This guarantees that no data is ever lost due to a backend server crash.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Step Functions/index.mdx': `---
title: AWS Step Functions
description: A serverless orchestration service that allows developers to design complex, multi-step business workflows as visual State Machines, mathematically guaranteeing execution order, retries, and error handling.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Step Functions"
  subtitle="Serverless State Machines"
  tags={['AWS', 'Orchestration', 'Serverless', 'Workflow']}
>

Chaining Lambda functions together directly (Lambda A calls Lambda B) is an architectural anti-pattern. If Lambda B fails, Lambda A has to wait, wasting money. Complex workflows require a dedicated mathematical orchestrator.

## 1. The JSON State Machine (ASL)
In Step Functions, you define your workflow using the **Amazon States Language (ASL)**, a JSON-based schema.
You define discrete states: TICK1TaskTICK1, TICK1ChoiceTICK1, TICK1ParallelTICK1, TICK1WaitTICK1. 
AWS mathematically compiles this JSON into a visual flowchart. When executed, the Step Function engine tracks the absolute mathematical state of the execution. It runs Lambda A, takes its JSON output, passes it to a TICK1ChoiceTICK1 state (which acts as an IF statement), and conditionally routes the data to Lambda B or Lambda C. 

## 2. Mathematical Resilience
Because the Step Function engine holds the State (not the code), it mathematically handles failures gracefully.
If a downstream API randomly times out, you do not write complex TICK1try/catchTICK1 loops in your code. You define a **Retry Policy** in the Step Function JSON (e.g., *"If this specific error occurs, wait 5 seconds, double the wait time, and try exactly 3 more times"*). If it ultimately fails, it routes the execution to a **Catch** state, gracefully triggering an alert and mathematically cleaning up any partial data, guaranteeing transaction safety.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Subnets/index.mdx': `---
title: AWS Subnets
description: The logical, mathematical subdivision of a Virtual Private Cloud (VPC) network, physically anchoring a block of IP addresses to a specific AWS Availability Zone for high availability architectural design.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Subnets"
  subtitle="Network Subdivisions"
  tags={['AWS', 'Networking', 'VPC', 'Architecture']}
>

A VPC is a massive conceptual block of IP addresses (e.g., 65,000 IPs). You cannot just throw servers into a VPC randomly. You must mathematically slice the VPC into smaller chunks called Subnets to control security and physical placement.

## 1. CIDR Math and Slicing
If your VPC has the CIDR block TICK110.0.0.0/16TICK1, you mathematically divide it.
You might create Subnet A with TICK110.0.1.0/24TICK1 (256 IPs) for your Web Servers, and Subnet B with TICK110.0.2.0/24TICK1 for your Databases. 
AWS mathematically reserves the first 4 and the last 1 IP addresses in every subnet for internal routing and DNS purposes. If you try to provision an EC2 instance in a /28 subnet (16 total IPs), you only actually have 11 usable IPs for your servers.

## 2. The Availability Zone Anchor
A VPC spans an entire AWS Region (e.g., N. Virginia). A Subnet does not.
A Subnet is mathematically anchored to **one specific Availability Zone (AZ)** (e.g., TICK1us-east-1aTICK1). If that specific physical data center loses power, that Subnet drops offline. 
Therefore, proper AWS architecture mandates mathematical redundancy: You create Web Subnet A in TICK1us-east-1aTICK1, and Web Subnet B in TICK1us-east-1bTICK1. You place an Elastic Load Balancer across both. If an entire data center is destroyed, the Load Balancer instantly detects the mathematical failure and routes 100% of the traffic to the surviving Subnet in the other AZ.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/VPC/index.mdx': `---
title: Amazon Virtual Private Cloud (VPC)
description: The foundational networking layer of AWS, providing a mathematically isolated, logically dedicated slice of the public cloud where customers define absolute control over IP addresses, subnets, and routing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Virtual Private Cloud (VPC)"
  subtitle="Your Private Cloud Network"
  tags={['AWS', 'Networking', 'Security', 'Infrastructure']}
>

Without a VPC, your EC2 servers would sit completely exposed on the public internet. A VPC is a cryptographic and mathematical boundary that isolates your resources from every other customer in the AWS ecosystem.

## 1. The CIDR Block
When you create a VPC, you mathematically define its size using **Classless Inter-Domain Routing (CIDR)**.
You assign a block of Private IPv4 addresses (e.g., TICK110.0.0.0/16TICK1). This mathematical equation allocates exactly 65,536 IP addresses to your cloud environment. This is your isolated universe. A server in your TICK110.0.0.0/16TICK1 VPC cannot communicate with a server in another customer's TICK110.0.0.0/16TICK1 VPC because the AWS Nitro hypervisor enforces absolute mathematical packet dropping between VPC boundaries.

## 2. Peering and Transit Gateways
If you have two different VPCs (e.g., a "Development" VPC and a "Production" VPC) and they need to share a database, they cannot route traffic natively.
You must establish a **VPC Peering Connection**. This mathematically fuses the Route Tables of both VPCs, allowing them to communicate via Private IPs without the data ever touching the public internet. If you have 500 VPCs, creating a web of Peering Connections becomes a mathematical nightmare, so you use a **Transit Gateway**, a massive central router that acts as the hub for all internal corporate AWS networking.

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
