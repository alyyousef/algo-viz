import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud SQL/index.mdx': `---
title: Google Cloud SQL
description: A fully managed relational database service for MySQL, PostgreSQL, and SQL Server, abstracting away database administration while providing automated mathematical replication and failover.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud SQL"
  subtitle="Managed Relational Databases"
  tags={['GCP', 'Database', 'SQL', 'Managed']}
>

Cloud SQL is GCP's direct answer to AWS RDS. It provides a mathematically sound, fully managed environment for traditional relational databases, handling the grueling OS-level patching, backups, and network security automatically.

## 1. High Availability (HA) Mathematics
For production workloads, a single database is a single point of failure.
When you enable **High Availability** in Cloud SQL, Google provisions a Primary instance in Zone A and a Standby instance in Zone B. 
They use **Synchronous Replication**. When your API executes a SQL TICK1INSERTTICK1, the Primary database mathematically intercepts the storage block and fires it over the fiber network to the Standby. The Primary *will not* return a success message to your API until the Standby has physically confirmed the data is safely written to its own disk, mathematically guaranteeing zero data loss.

## 2. Read Replicas
If you have a massive reporting dashboard that runs complex TICK1SELECTTICK1 queries, it can starve the Primary database of CPU, causing live API inserts to fail.
Cloud SQL allows you to create **Read Replicas**. These use **Asynchronous Replication**. The Primary sends a stream of changes to the Replica in the background. You mathematically route all the heavy reporting traffic to the Replica, completely offloading the read-stress from the Primary and ensuring your production API remains blisteringly fast.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud Storage/index.mdx': `---
title: Google Cloud Storage (GCS)
description: A unified, infinitely scalable object storage service that provides a single API to mathematically store and retrieve unstructured data across multiple global storage classes.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Storage (GCS)"
  subtitle="Unified Object Storage"
  tags={['GCP', 'Storage', 'Object', 'Serverless']}
>

Google Cloud Storage (GCS) is the exact equivalent of AWS S3. It is a flat, mathematical namespace (Buckets and Objects) used to store unstructured data like videos, images, and massive analytical datasets.

## 1. The Unified API
In AWS, moving data from S3 Standard to S3 Glacier (Archive) fundamentally changes how you interact with the data (requiring asynchronous API calls).
GCS mathematically unifies this. Whether your data is in the **Standard** tier (accessed every day) or the **Archive** tier (accessed once a year), the exact same API call is used to retrieve it, and the time-to-first-byte is measured in milliseconds for both. The only mathematical difference is the billing: Archive costs vastly less to store, but vastly more to read.

## 2. Object Lifecycle Management
You do not want to pay high Standard tier prices for 10-year-old log files.
GCS provides **Lifecycle Policies**. You define a mathematical rule on the Bucket: *"If an object is strictly older than 30 days, mathematically transition its storage class from Standard to Coldline. If it is older than 365 days, transition it to Archive."* This automated state machine ensures your company pays the absolute minimum storage cost possible without requiring any human intervention.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Compute Engine/index.mdx': `---
title: Google Compute Engine (GCE)
description: Google's core Infrastructure as a Service (IaaS) offering, providing customizable, high-performance Virtual Machines that boot in seconds on Google's global fiber network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Compute Engine (GCE)"
  subtitle="IaaS Cloud Compute"
  tags={['GCP', 'Compute', 'IaaS', 'Virtualization']}
>

Compute Engine is GCP's equivalent to AWS EC2. It gives you raw, root-level SSH access to Virtual Machines running on Google's custom-built hardware and hypervisors.

## 1. Custom Machine Types
AWS and Azure force you into pre-defined mathematical hardware buckets (e.g., you must choose 2 CPUs/4GB RAM or 4 CPUs/8GB RAM). 
If your specific application mathematically requires exactly 6 CPUs and 11GB of RAM, AWS forces you to overpay for a larger instance. 
Compute Engine allows **Custom Machine Types**. You use a slider in the UI to mathematically dictate exactly how many vCPUs and exactly how many Megabytes of RAM you want. Google's hypervisor dynamically carves out that exact micro-architecture, ensuring you never pay for hardware you do not need.

## 2. Live Migration
Physical server hardware eventually fails and requires maintenance.
In AWS, if the underlying physical host needs a patch, AWS sends you an email telling you to reboot your EC2 instance (causing downtime).
Google Compute Engine uses **Live Migration**. When the physical server needs maintenance, Google mathematically spins up a clone on a new physical server, copies the RAM over the network in real-time, and seamlessly cuts over the network connection. The Virtual Machine never reboots; the application never goes down. You literally do not know it happened.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Dataflow/index.mdx': `---
title: Google Cloud Dataflow
description: A fully managed, serverless stream and batch data processing service built on Apache Beam, mathematically engineered to process massive data pipelines without provisioning clusters.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Dataflow"
  subtitle="Serverless Data Processing"
  tags={['GCP', 'Data', 'Streaming', 'Apache Beam']}
>

If you have a massive firehose of telemetry data coming from Pub/Sub, you need to clean it, mathematically aggregate it, and insert it into BigQuery. Managing a physical Apache Spark cluster to do this is tedious. Dataflow makes it serverless.

## 1. Apache Beam (Unified Batch and Stream)
Historically, developers had to write two entirely different codebases: one for Batch processing (Hadoop/Spark) and one for Streaming processing (Kafka/Flink).
Dataflow is built on the **Apache Beam** SDK. Beam provides a unified mathematical model. You write your pipeline logic *once* in Python or Java. If you feed it a static CSV file, it mathematically processes it as a Batch. If you feed it a live Pub/Sub stream, it seamlessly processes it as a Stream, completely eliminating code duplication.

## 2. Liquid Sharding (Dynamic Work Rebalancing)
In a standard cluster, if you chop a dataset into 10 pieces for 10 worker nodes, but one piece is mathematically much harder to process, 9 nodes will finish quickly and sit idle while the 1 node struggles (the Straggler Problem).
Dataflow solves this with **Liquid Sharding**. It mathematically monitors the CPU load of all worker nodes in real-time. If it detects a straggler, it dynamically slices the remaining work off the struggling node and redistributes it to the idle nodes on the fly, ensuring mathematically perfect cluster utilization and drastically faster execution times.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Dataproc/index.mdx': `---
title: Google Cloud Dataproc
description: A highly optimized, fully managed Hadoop and Spark cluster service designed to run massive Big Data workloads on GCP with sub-90-second cluster provisioning times.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Dataproc"
  subtitle="Managed Hadoop and Spark"
  tags={['GCP', 'Big Data', 'Spark', 'Hadoop']}
>

Dataproc is GCP's direct answer to AWS EMR. It provides a managed environment for open-source Big Data frameworks (Hadoop, Spark, Hive), allowing enterprises to lift-and-shift existing on-premise analytics workloads to the cloud.

## 1. Ephemeral Clusters
In an on-premise data center, a Hadoop cluster sits running 24/7, costing millions of dollars even when nobody is querying it.
Dataproc is designed to be mathematically **Ephemeral**. Because Google can provision a 50-node Dataproc cluster in less than 90 seconds, you do not leave it running. You write an automation script that boots the cluster, runs the Spark job, saves the results to Cloud Storage, and instantly deletes the cluster. You pay for exactly 5 minutes of compute instead of 24 hours.

## 2. Preemptible VMs for Cost Reduction
Spark is mathematically designed to handle node failures gracefully. If a worker node dies mid-calculation, the Master node simply mathematically re-assigns that chunk of work to a surviving node.
Because of this fault tolerance, you can build Dataproc clusters using **Preemptible VMs** (Spot Instances). These are excess Google servers sold at an 80% discount, with the caveat that Google can terminate them at any time with a 30-second warning. By mixing standard VMs for the Master nodes and Preemptible VMs for the Worker nodes, you can execute massive mathematical workloads for pennies on the dollar.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Firestore/index.mdx': `---
title: Google Cloud Firestore
description: A highly flexible, scalable NoSQL document database designed for massive mobile and web applications, featuring real-time mathematical synchronization and offline support.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Firestore"
  subtitle="Real-Time NoSQL Database"
  tags={['GCP', 'Database', 'NoSQL', 'Firebase']}
>

Firestore (the evolution of Firebase Realtime Database and Cloud Datastore) is a NoSQL document database. It does not use tables or rows; it uses **Collections** and **Documents** (JSON objects).

## 1. Real-Time Listeners
Standard databases require the frontend application to constantly "poll" (make repeated API calls) to see if data has changed, which is mathematically inefficient and drains mobile batteries.
Firestore uses real-time WebSockets. The frontend developer attaches a **Listener** to a specific Document or Query. When a backend server updates that Document, Firestore's global network mathematically pushes the exact JSON change directly to the mobile device in milliseconds. This is the architectural foundation of collaborative apps (like Google Docs) and real-time chat applications.

## 2. Shallow Queries and Indexing
In a poorly designed NoSQL database, querying a document downloads all its nested sub-collections, mathematically destroying network bandwidth.
Firestore enforces **Shallow Queries**. If you fetch a User document, it does *not* fetch the user's massive "Messages" sub-collection unless you explicitly ask for it.
Furthermore, Firestore automatically creates a mathematical index for every single field in every document by default. This guarantees that query performance scales with the size of the *result set*, not the size of the *dataset*. Searching for 10 users takes the exact same mathematical amount of time whether the database has 100 users or 100 billion users.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/GKE/index.mdx': `---
title: Google Kubernetes Engine (GKE)
description: The industry's premier, fully managed Kubernetes orchestration platform, mathematically engineered by the original creators of Kubernetes to provide unparalleled automation and scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Kubernetes Engine (GKE)"
  subtitle="The Premier Kubernetes Platform"
  tags={['GCP', 'Kubernetes', 'Containers', 'Compute']}
>

Google invented Kubernetes (originally Borg). Consequently, GKE is widely considered the most advanced, stable, and deeply integrated managed Kubernetes service on the market, vastly outperforming AWS EKS in native automation.

## 1. Autopilot Mode
Managing the underlying Virtual Machines (Worker Nodes) of a Kubernetes cluster requires deep mathematical capacity planning. If you provision too many, you waste money. If you provision too few, pods fail to schedule.
GKE introduced **Autopilot**. In Autopilot mode, you completely surrender the Worker Nodes to Google. You do not see them, and you cannot SSH into them. You simply submit a standard Kubernetes TICK1Deployment.yamlTICK1 to the API. Google mathematically provisions the exact compute capacity required for those specific pods in real-time, completely eliminating node management and providing a true serverless Kubernetes experience.

## 2. Native VPC Integration
In AWS EKS, configuring the networking (CNI) to ensure Pods can talk to the VPC requires installing complex third-party add-ons.
In GKE, Kubernetes is mathematically fused into the Google Cloud Software Defined Network (SDN). Every Pod automatically receives a native IP address directly from the GCP VPC Subnet. A Virtual Machine outside the cluster can ping a Pod directly by its IP address without traversing complex NAT translations, drastically reducing mathematical network latency and simplifying firewall architectures.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/IAM/index.mdx': `---
title: Google Cloud IAM
description: The unified Identity and Access Management system for GCP, mathematically defining who has what type of access to which specific cloud resources using roles and policies.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud IAM"
  subtitle="Identity and Access Control"
  tags={['GCP', 'Security', 'Identity', 'Governance']}
>

AWS IAM is notoriously complex, requiring developers to write massive, highly verbose JSON documents for every single resource. GCP IAM mathematically simplifies this by focusing on predefined Roles rather than granular JSON actions.

## 1. Members, Roles, and Bindings
GCP IAM operates on a strict mathematical trio:
- **Member**: Who are you? (e.g., A Google Workspace user, a Service Account).
- **Role**: What can you do? (e.g., TICK1roles/storage.objectViewerTICK1).
- **Binding**: Applying the Role to the Member on a specific Resource.
Instead of writing a custom JSON policy, you simply bind a pre-defined mathematical Role to a User. A "Service Account" acts exactly like an AWS IAM Role; it is a non-human identity that Virtual Machines or Cloud Functions assume to securely interact with other Google services without hardcoded passwords.

## 2. The Resource Hierarchy
Permissions in GCP flow strictly downward through a mathematical hierarchy:
**Organization -> Folder -> Project -> Resource**
If you grant a user the "Compute Admin" role at the **Folder** level, that mathematical permission cascades downwards. They automatically become a Compute Admin for every Project and every VM inside that Folder. This hierarchical inheritance mathematically eliminates the need to manually tag resources or write complex IAM boundaries, making enterprise governance vastly simpler than AWS.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Load Balancing/index.mdx': `---
title: Google Cloud Load Balancing
description: Google's massive, software-defined global load balancing architecture that mathematically distributes traffic across regions using a single Anycast IP address without requiring DNS pre-warming.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Load Balancing"
  subtitle="Global Software-Defined Routing"
  tags={['GCP', 'Networking', 'Load Balancing', 'Global']}
>

In AWS, if you want a global load balancer, you must stitch together Route 53 (DNS), CloudFront, and regional ALBs. Google Cloud Load Balancing is a single, globally distributed software-defined system that operates at the edge of Google's network.

## 1. The Single Anycast IP
When you create a Global External HTTP(S) Load Balancer in GCP, you receive exactly **one** Anycast IP address.
You deploy your backend Virtual Machines in New York, Tokyo, and London. You attach them all to this single Load Balancer.
When a user in Tokyo connects to that IP, Google's physical internet routers mathematically intercept the packet at the closest Edge Node in Japan. The Load Balancer terminates the SSL connection locally and instantly routes the traffic to the Tokyo Virtual Machines. If the Tokyo data center burns down, the Load Balancer instantly, mathematically reroutes the next packet to New York, completely invisibly to the user.

## 2. No Pre-Warming Required
In AWS, standard Elastic Load Balancers (ALBs) are actually Virtual Machines under the hood. If a massive Super Bowl ad drives 1 million users to your site instantly, the AWS ALB will physically crash unless you contact AWS support days in advance to "Pre-Warm" (scale up) the load balancer.
Google Cloud Load Balancers are not VMs; they are massive distributed software systems built directly into Google's physical network hardware. They can mathematically absorb 1 million concurrent connections instantly without any pre-warming, making them the most robust load balancers in the cloud industry.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Pub-Sub/index.mdx': `---
title: Google Cloud Pub/Sub
description: A globally distributed, mathematically durable messaging bus designed for asynchronous microservice decoupling and real-time streaming analytics at massive scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Pub/Sub"
  subtitle="Global Message Brokering"
  tags={['GCP', 'Messaging', 'Events', 'Streaming']}
>

Pub/Sub is Google's answer to both AWS SNS (broadcasting) and AWS SQS (queuing). It unifies these paradigms into a single, massively scalable mathematical architecture that requires zero provisioning.

## 1. Topics and Subscriptions
The architecture is mathematically elegant:
- **Publishers** send messages to a **Topic**.
- **Subscribers** receive messages from a **Subscription** attached to that Topic.
If an IoT device publishes a temperature reading to the TICK1SensorTopicTICK1, Pub/Sub mathematically duplicates that message to every Subscription attached to the topic. The "Alerting Subscription" pushes the message instantly to a Cloud Function. The "Analytics Subscription" safely queues the message until a Dataflow batch job wakes up and pulls it. This completely decouples the producers from the consumers.

## 2. At-Least-Once Delivery
Pub/Sub mathematically guarantees **At-Least-Once Delivery**. 
When a Subscriber receives a message, the message is not deleted; it is temporarily hidden. The Subscriber must process the message and mathematically send an **Acknowledgement (ACK)** back to Pub/Sub. 
If the Subscriber crashes and fails to send the ACK before the deadline, Pub/Sub mathematically assumes the message was not processed and redelivers it. Because of distributed system realities, Pub/Sub might occasionally deliver the exact same message twice; therefore, downstream microservices *must* be mathematically idempotent (handling duplicates safely).

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
