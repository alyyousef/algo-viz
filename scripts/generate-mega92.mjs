import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EBS/index.mdx': `---
title: Amazon Elastic Block Store (EBS)
description: A high-performance, mathematically replicable block storage service designed to act as the primary, persistent hard drive for Amazon EC2 instances.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Elastic Block Store (EBS)"
  subtitle="Persistent Block Storage for EC2"
  tags={['AWS', 'Storage', 'Block', 'EC2']}
>

If an EC2 instance crashes and is destroyed, any data saved to its temporary physical hard drive (Instance Store) is mathematically erased forever. EBS solves this by decoupling the compute from the storage.

## 1. Network-Attached Block Storage
An EBS volume is not physically inside the EC2 server. It is a massive SAN (Storage Area Network) connected to the EC2 instance via a dedicated, hyper-fast fiber optic network.
Because it is decoupled, if your EC2 server crashes, the EBS volume physically detaches itself. You can instantly spin up a new EC2 server and attach the exact same EBS volume, maintaining perfect mathematical continuity of your database or file system.

## 2. Mathematical Replication and IOPS
EBS guarantees data safety through invisible mathematical replication. 
When you save a file to an EBS volume, AWS automatically replicates that exact block of data to multiple physical hardware racks within the same Availability Zone.
Furthermore, EBS provides **Provisioned IOPS** (Input/Output Operations Per Second). If you are running a massive PostgreSQL database, you can mathematically force AWS to guarantee exactly 64,000 read/write operations per second, ensuring your database never experiences physical IO bottlenecks regardless of how many users are querying it.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EC2/index.mdx': `---
title: Amazon Elastic Compute Cloud (EC2)
description: The foundational compute service of AWS, providing resizable, highly configurable virtual machines that grant developers absolute root access to underlying hardware architectures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Elastic Compute Cloud (EC2)"
  subtitle="Virtual Servers in the Cloud"
  tags={['AWS', 'Compute', 'IaaS', 'Virtualization']}
>

EC2 is the original AWS service. It is pure Infrastructure as a Service (IaaS). You are renting a mathematical slice of a massive physical server sitting in an Amazon data center.

## 1. The Nitro Hypervisor
Historically, Virtual Machines were slow because the Hypervisor (the software splitting the physical server into smaller virtual servers) consumed 30% of the CPU.
AWS invented the **Nitro System**, which physically moved the mathematical routing of network packets and storage IO off the main CPU and onto dedicated hardware silicon cards. This means if you rent an EC2 instance with 64 vCPUs, you get exactly 64 vCPUs of raw compute power, with near-zero mathematical overhead from the virtualization layer.

## 2. Instance Families and AMIs
You do not just rent "a server." You rent a mathematically specialized architecture.
- **Compute Optimized (C-Series)**: High CPU, low RAM. For batch processing and gaming.
- **Memory Optimized (R-Series)**: High RAM, low CPU. For in-memory databases like Redis.
- **Accelerated (P-Series)**: Packed with NVIDIA GPUs. For Machine Learning.
You boot these instances using an **AMI (Amazon Machine Image)**, which is a mathematically exact snapshot of an operating system (Linux/Windows) and pre-installed software, allowing you to spin up 1,000 identical servers in 30 seconds.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/ECS/index.mdx': `---
title: Amazon Elastic Container Service (ECS)
description: A highly scalable, fully managed container orchestration service that allows developers to easily run, stop, and mathematically manage Docker containers on a cluster of virtual servers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Elastic Container Service (ECS)"
  subtitle="AWS-Native Container Orchestration"
  tags={['AWS', 'Containers', 'Docker', 'Compute']}
>

Running one Docker container is easy. Running 500 Docker containers across 50 EC2 instances, handling their networking, load balancing, and mathematically ensuring that if a container crashes, it is instantly rebooted, requires an Orchestrator.

## 1. Task Definitions and Services
In ECS, you do not interact with individual containers. You write a **Task Definition** (a JSON file).
The Task Definition mathematically declares: *"I need 1 Nginx container (port 80) and 1 Node.js container (port 3000) running together, sharing 2GB of RAM."*
You then give this Task Definition to an **ECS Service**. You instruct the Service: *"Mathematically guarantee that exactly 50 copies of this Task are running at all times."* The ECS Control Plane continuously monitors the cluster. If an EC2 server dies and takes down 5 Tasks, ECS instantly detects the mathematical imbalance and spins up 5 new Tasks on the surviving servers to restore the desired state.

## 2. Deep AWS Integration
Unlike Kubernetes (which is cloud-agnostic and incredibly complex), ECS is mathematically hardwired directly into the AWS ecosystem. 
It integrates seamlessly with the Application Load Balancer (ALB). When ECS boots a new container on a random port, it automatically registers that exact IP and Port with the ALB. It integrates natively with IAM, allowing you to assign a specific IAM Role directly to a single Docker container, guaranteeing zero-trust security without managing complex Kubernetes secrets.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EFS/index.mdx': `---
title: Amazon Elastic File System (EFS)
description: A fully managed, mathematically elastic NFS (Network File System) designed to be mounted concurrently by thousands of EC2 instances, providing shared, infinitely scalable file storage.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Elastic File System (EFS)"
  subtitle="Shared Network File Storage"
  tags={['AWS', 'Storage', 'File', 'Linux']}
>

An EBS Volume can only be attached to *one* EC2 instance at a time. If you have 50 web servers that all need to read and write to the exact same TICK1/uploadsTICK1 directory simultaneously, EBS is mathematically impossible. You need EFS.

## 1. Concurrent NFS Mounting
EFS uses the standard NFSv4 protocol. 
You can mathematically mount a single EFS file system onto 1,000 different EC2 instances simultaneously. To the Linux operating system, it looks like a standard physical folder (e.g., TICK1/var/www/htmlTICK1). If Server A writes a file to that folder, Server B can instantly read it. This is the foundational architecture for legacy CMS platforms like WordPress running in a highly available, multi-server cloud environment.

## 2. Mathematical Elasticity
With EBS, you must provision the size in advance (e.g., 100GB). If you hit 100GB, the disk crashes.
EFS is mathematically **Elastic**. You do not provision a size. It starts at 0 bytes. As you add files, it physically grows to Petabytes. When you delete files, it shrinks. You are billed exactly for the mathematical byte count you are storing at the end of the month. Furthermore, it automatically replicates all files across three physical Availability Zones, guaranteeing massive durability against data center failures.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EKS/index.mdx': `---
title: Amazon Elastic Kubernetes Service (EKS)
description: A managed service that mathematically abstracts away the immense complexity of running the Kubernetes Control Plane, allowing enterprises to run standard Kubernetes workloads natively on AWS.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Elastic Kubernetes Service (EKS)"
  subtitle="Managed Kubernetes on AWS"
  tags={['AWS', 'Kubernetes', 'Containers', 'Compute']}
>

Kubernetes is the industry standard for container orchestration, but running the "Master Nodes" (the Control Plane that stores the etcd database and handles the API) is a DevOps nightmare. If the Control Plane goes down, the entire cluster is lost. 

## 1. The Managed Control Plane
EKS physically removes the Control Plane from your responsibility. 
AWS provisions, scales, and mathematically patches the Kubernetes Master Nodes across three Availability Zones in a hidden AWS account. You do not manage them, and you cannot SSH into them. You simply receive a mathematically perfect, highly available Kubernetes API endpoint. You use standard TICK1kubectlTICK1 commands to talk to it, and you only manage the "Worker Nodes" (the EC2 instances that actually run your Docker containers).

## 2. Cloud-Agnostic vs. AWS Native
Why use EKS instead of ECS? **Portability**.
ECS is proprietary to AWS. If you write ECS YAML, you are locked into Amazon forever. 
EKS runs 100% upstream, open-source Kubernetes. The exact same TICK1deployment.yamlTICK1 file that runs on EKS can be mathematically deployed to Google Cloud (GKE), Azure (AKS), or an on-premise physical data center without changing a single line of code. EKS is chosen by massive enterprises that mandate a multi-cloud or cloud-agnostic architectural strategy.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/ElastiCache/index.mdx': `---
title: Amazon ElastiCache
description: A fully managed, sub-millisecond in-memory data store service that seamlessly deploys and scales open-source Redis and Memcached engines to mathematically accelerate application performance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon ElastiCache"
  subtitle="Managed Redis and Memcached"
  tags={['AWS', 'Database', 'Cache', 'Redis']}
>

Reading a user's profile from a Postgres database on a hard drive takes 10 milliseconds. If you have 100,000 users requesting their profile simultaneously, the hard drive will physically melt. ElastiCache intercepts these requests and serves them from RAM in 0.5 milliseconds.

## 1. The Mathematical Power of RAM
ElastiCache is physically constrained to the Random Access Memory (RAM) of the server. There are no hard drives. 
When a web server queries the database for the "Top 10 Leaderboard", it mathematically calculates the result and stores the final HTML/JSON inside ElastiCache (using a Key like TICK1leaderboard_htmlTICK1). The next 10,000 users who request the page do not touch the database. The web server checks ElastiCache, finds the Key, and mathematically streams the bytes directly from RAM back to the user at the speed of light.

## 2. Redis vs. Memcached
ElastiCache offers two engines:
- **Memcached**: A pure, mathematically simple key-value store. It only handles strings. It is multi-threaded and incredibly fast, but if the server reboots, all data is instantly erased.
- **Redis**: A highly advanced data structure server. It mathematically supports Lists, Sets, and Sorted Sets (allowing you to build the Leaderboard directly inside the cache). Crucially, Redis supports **Persistence** (taking snapshots to disk) and **Replication** (copying RAM to a backup node), guaranteeing that a server crash does not destroy your cache.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EMR/index.mdx': `---
title: Amazon EMR (Elastic MapReduce)
description: A managed cluster platform that radically simplifies running massive Big Data frameworks like Apache Hadoop and Apache Spark to mathematically process petabytes of data across hundreds of EC2 instances.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon EMR (Elastic MapReduce)"
  subtitle="Managed Big Data Clusters"
  tags={['AWS', 'Big Data', 'Spark', 'Hadoop']}
>

If you need to mathematically analyze a 500 Terabyte log file, a single computer will take 10 years. EMR allows you to spin up 1,000 computers, chop the file into 1,000 pieces, analyze them concurrently in 5 minutes, and combine the result.

## 1. The MapReduce Paradigm
EMR automates the complex networking of distributed mathematics.
- **Map**: EMR automatically distributes the raw data across the Worker Nodes. Each node executes your Python/Java code to independently filter and mathematically transform its specific chunk of data.
- **Reduce**: EMR handles the massive network shuffling required to pull all the transformed data back to a Master Node, which mathematically aggregates the results (e.g., Summing up the total clicks). 

## 2. Decoupling Compute and Storage
In a traditional on-premise Hadoop cluster, the data is physically stored on the hard drives of the servers (HDFS). If you need more storage, you have to buy more CPU power, which is financially inefficient.
EMR mathematically decouples this using **EMRFS**. The 500 Terabytes of data live permanently in Amazon S3 (infinite, cheap storage). You only spin up the massive, expensive EMR EC2 cluster when you actually need to run the math. The cluster pulls the data from S3, executes the Spark job, writes the answer back to S3, and instantly terminates the EC2 instances, saving the company millions of dollars.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/EventBridge/index.mdx': `---
title: Amazon EventBridge
description: A serverless, mathematically robust event bus that connects application components together using real-time data streams, enabling deeply decoupled, event-driven microservice architectures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon EventBridge"
  subtitle="The Serverless Event Bus"
  tags={['AWS', 'Events', 'Integration', 'Serverless']}
>

In a monolithic application, if a user buys an item, the Order function directly calls the Shipping function. In a microservices architecture, direct API calls create massive, fragile dependencies. EventBridge mathematically decouples them.

## 1. The Event Router
When a user buys an item, the Order microservice does not talk to Shipping. It simply fires a JSON JSON object (the Event) into EventBridge: TICK1{"detail-type": "OrderPlaced", "item": "Shoes"}TICK1. The Order service's job is mathematically finished.
EventBridge acts as the central router. Other microservices (Shipping, Billing, Analytics) create **Rules**. 
The Shipping service has a mathematical rule: *"If an event hits the bus with detail-type = 'OrderPlaced', route a copy of that JSON to me."* EventBridge mathematically duplicates the JSON and delivers it to every interested microservice simultaneously, ensuring no service ever needs to know the IP address or existence of any other service.

## 2. Schema Registry and Transformation
Because microservices are built by different teams, JSON formats can drift and break downstream consumers.
EventBridge includes a **Schema Registry**. It mathematically inspects the JSON events flowing through the bus, infers the schema, and automatically generates TypeScript or Java code bindings. A developer can download these bindings to guarantee their code perfectly matches the mathematical structure of the event, completely eliminating TICK1undefinedTICK1 errors in production.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Fargate/index.mdx': `---
title: AWS Fargate
description: A groundbreaking serverless compute engine for containers that completely eliminates the need to provision, manage, or mathematically scale the underlying EC2 virtual machines.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Fargate"
  subtitle="Serverless Containers"
  tags={['AWS', 'Containers', 'Serverless', 'Compute']}
>

With standard ECS or EKS, you still have to physically provision the EC2 servers that your Docker containers run on. If your servers have 10GB of RAM, and you try to boot a container needing 12GB, the math fails, and the container crashes. Fargate eliminates the server entirely.

## 1. The Serverless Container Abstraction
With Fargate, you do not manage EC2 instances. There is no cluster to scale.
You simply tell AWS: *"Here is my Docker image. It mathematically requires exactly 2.0 vCPUs and 4GB of RAM. Run it."*
AWS reaches into a massive, hidden fleet of compute power, instantly carves out a micro-VM that exactly matches your mathematical specifications, injects your container, and boots it. You are billed purely by the exact second for the exact CPU/RAM requested. 

## 2. Security and Isolation
In a standard EC2 cluster, if you run 10 Docker containers on one server, they technically share the same physical Linux kernel. If a hacker escapes one container, they can theoretically attack the other 9.
Fargate enforces absolute mathematical isolation. Every single Fargate Task runs inside its own dedicated hardware-isolated micro-VM (powered by Firecracker). They do not share a kernel, memory, or CPU with any other task. This provides military-grade security isolation by default, making Fargate the industry standard for running highly sensitive, multi-tenant SaaS workloads.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Glue/index.mdx': `---
title: AWS Glue
description: A fully managed, serverless ETL (Extract, Transform, Load) service that mathematically discovers, catalogs, and transforms massive datasets for analytics and machine learning.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Glue"
  subtitle="Serverless Data Integration"
  tags={['AWS', 'Data', 'ETL', 'Serverless']}
>

Data Engineers spend 80% of their time writing boilerplate Python scripts to move data from a database into a data lake, change the date format, and save it as a Parquet file. AWS Glue automates this entire mathematical pipeline.

## 1. The Glue Data Catalog (Crawlers)
If you dump 10,000 JSON files into S3, AWS has no idea what that data is. 
You point an **AWS Glue Crawler** at the S3 bucket. The Crawler physically opens the files, mathematically infers the schema (e.g., *"This field is a String, this field is an Array of Integers"*), and creates a centralized table definition in the **Glue Data Catalog**. 
Once the mathematical schema is cataloged, services like Amazon Athena can instantly query those raw JSON files using standard SQL.

## 2. Serverless Spark ETL
Once the data is cataloged, you need to transform it (e.g., joining user data with purchase history).
You write a Python or Scala script using the Apache Spark framework. You hand the script to Glue. Glue acts exactly like EMR, but it is entirely serverless. It instantly spins up a massive, distributed Spark cluster, mathematically executes your transformation across thousands of parallel nodes, writes the final cleaned dataset to a new S3 bucket, and vanishes. You only pay for the exact seconds the cluster was running.

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
