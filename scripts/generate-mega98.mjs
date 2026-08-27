import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Anthos/index.mdx': `---
title: Google Cloud Anthos
description: Google's premier hybrid and multi-cloud Kubernetes orchestration platform, mathematically designed to unify cluster management across GCP, AWS, Azure, and on-premise data centers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Anthos"
  subtitle="Multi-Cloud Kubernetes Management"
  tags={['GCP', 'Kubernetes', 'Multi-Cloud', 'Enterprise']}
>

While GKE manages Kubernetes perfectly within Google Cloud, Anthos is a meta-orchestrator. It mathematically recognizes that large enterprises refuse to be locked into a single cloud provider, allowing them to manage clusters running on competing clouds from a single pane of glass.

## 1. Unified Configuration Management (Anthos Config Management)
Managing 50 Kubernetes clusters across AWS and GCP usually results in configuration drift.
Anthos solves this with mathematically enforced **GitOps**. You define your cluster security policies, RBAC roles, and network constraints in a single Git repository. Anthos Config Management mathematically synchronizes this Git repository directly to the control planes of all 50 clusters worldwide. If a rogue admin tries to manually change a firewall rule on a cluster in AWS, Anthos instantly detects the mathematical divergence from the Git truth and overwrites the manual change, restoring the cluster to the corporate standard.

## 2. Anthos Service Mesh
Networking microservices across different physical cloud providers is a nightmare.
Anthos natively integrates Istio to create the **Anthos Service Mesh**. It mathematically abstracts the underlying AWS/GCP VPC networking, creating a seamless, encrypted overlay network. A microservice running on Google Cloud can natively discover and make a mathematically secure, mutually encrypted (mTLS) HTTP call to a microservice running on an AWS EC2 cluster, without the developer ever knowing the two services are hosted on competing infrastructures.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/App Engine/index.mdx': `---
title: Google App Engine
description: Google's original Platform as a Service (PaaS), providing a fully managed, mathematically abstracted environment for deploying web applications that instantly auto-scale from zero to global traffic.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google App Engine"
  subtitle="The Original PaaS"
  tags={['GCP', 'PaaS', 'Web', 'Serverless']}
>

App Engine was released long before Kubernetes or Docker existed. It allows developers to deploy Python, Java, or Node.js code directly to Google's infrastructure without ever seeing or managing a Virtual Machine, load balancer, or operating system.

## 1. Standard vs. Flexible Environments
App Engine mathematically partitions its architecture into two distinct paradigms:
- **Standard Environment**: Your code runs in a highly restrictive, pre-configured sandbox. You cannot write to the local file system or install arbitrary C-libraries. Because of this strict mathematical confinement, Google can boot a new instance of your app in milliseconds. It mathematically scales to exactly zero when there is no traffic, costing $0.
- **Flexible Environment**: Your code runs inside a Docker container on Google Compute Engine VMs. You have total freedom (you can use any language, any library). However, because it relies on standard Docker/VM architecture, it boots slower (minutes, not milliseconds) and cannot scale to absolute zero; at least one instance must remain running.

## 2. Versioning and Traffic Splitting
Deploying to App Engine is mathematically elegant. 
Every time you run TICK1gcloud app deployTICK1, it creates an immutable **Version**. By default, 100% of traffic routes to the new version.
However, you can mathematically execute **A/B Testing** or **Canary Deployments** directly in the router. You instruct App Engine: *"Route exactly 95% of incoming HTTP requests to V1, and 5% to V2."* The hypervisor mathematically distributes the packets. If V2 generates 500 Server Errors, you instantly shift the slider back to 100% V1, executing a zero-downtime rollback in seconds.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/BigQuery/index.mdx': `---
title: Google BigQuery
description: Google's flagship, serverless, highly scalable enterprise data warehouse, mathematically engineered to execute SQL queries across petabytes of data in mere seconds.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google BigQuery"
  subtitle="The Petabyte SQL Engine"
  tags={['GCP', 'Database', 'Big Data', 'Serverless']}
>

BigQuery is not a standard relational database; it is a massively parallel, serverless analytics engine (OLAP). You do not provision servers, clusters, or memory. You simply throw a 5-Petabyte dataset at it, write a standard SQL query, and Google handles the underlying distributed mathematics.

## 1. Dremel and Colossus
BigQuery mathematically separates Compute from Storage to achieve its speed.
- **Colossus (Storage)**: The data is stored in Google's global distributed file system in a highly compressed, columnar format (Capacitor). 
- **Dremel (Compute)**: When you hit "Run Query", the Dremel engine mathematically compiles your SQL into a massive execution tree. It instantly spins up thousands of hidden worker nodes. Each node scans a tiny, specific slice of the Colossus storage, performs the mathematical aggregation (e.g., TICK1SUM()TICK1), and passes the result back up the tree. You get the answer to a Petabyte query in 5 seconds.

## 2. Serverless Economics
With traditional Data Warehouses (like early AWS Redshift or on-premise Hadoop), you pay a massive hourly fee for the cluster to sit idle.
BigQuery is purely **Serverless**. You pay exactly $0 for idle compute. You are billed purely on a mathematical metric: **Bytes Scanned**. If your query scans 1 Terabyte of data, you pay exactly $5.00. This forces data engineers to write mathematically efficient SQL (e.g., heavily utilizing partitioned tables to prevent accidental full-table scans that could cost hundreds of dollars).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Bigtable/index.mdx': `---
title: Google Cloud Bigtable
description: A massively scalable, sparsely populated NoSQL wide-column store designed for high-throughput, low-latency mathematical operations on petabytes of structured data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Bigtable"
  subtitle="High-Throughput Wide-Column NoSQL"
  tags={['GCP', 'Database', 'NoSQL', 'Big Data']}
>

Bigtable is the exact underlying database architecture that physically powers Google Search, Google Maps, and YouTube. It is not designed for complex SQL joins; it is mathematically engineered to read and write millions of rows per second at single-digit millisecond latency.

## 1. The 3D Mathematical Map
Bigtable is fundamentally a massive, distributed, multi-dimensional sorted map.
The data is mathematically indexed by exactly three values: **(Row Key, Column Key, Timestamp)**.
Because the data is strictly lexicographically sorted by the Row Key, querying is blisteringly fast, but *only* if you know the Row Key. If you design your Row Key poorly (e.g., using sequential user IDs like 1, 2, 3), you create a "hotspot"—all writes mathematically hit the exact same physical server node, melting it. Proper Bigtable architecture requires mathematical hashing of the Row Key to perfectly distribute the load across the cluster.

## 2. Analytical vs. Transactional
Unlike Datastore (Firestore), Bigtable does not support multi-row ACID transactions. It is purely designed for scale.
It is heavily used for **Time-Series Data** (e.g., IoT sensors sending temperature readings every millisecond) and **Financial Data** (e.g., tracking every stock trade in the world in real-time). Because it integrates natively with Apache Hadoop and Spark, it acts as the high-speed ingestion buffer that eventually feeds into analytical engines like BigQuery.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud CDN/index.mdx': `---
title: Google Cloud CDN
description: A low-latency Content Delivery Network that mathematically caches static assets at the global edge of Google's private fiber-optic network to accelerate web performance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud CDN"
  subtitle="Global Edge Caching"
  tags={['GCP', 'Networking', 'CDN', 'Performance']}
>

If a user in Paris requests a 5MB image from a server in Tokyo, the speed of light physically enforces a 250-millisecond delay. Cloud CDN mathematically eliminates this by caching the image directly in Paris.

## 1. Global Anycast IP
Cloud CDN leverages Google's massive Anycast DNS architecture.
When you set up Cloud CDN (usually attached to an External HTTP(S) Load Balancer), you are given a single, global IP address. 
When the Parisian user requests the image, the Anycast network mathematically routes their packet to the physically closest Google Edge Point of Presence (PoP) in France. The PoP checks its RAM. If the image is there (Cache Hit), it instantly returns it in 5 milliseconds. If not (Cache Miss), the PoP retrieves the image from Tokyo over Google's private, dedicated underwater fiber backbone (bypassing the chaotic public internet), caches it in Paris, and serves it to the user.

## 2. Cache Invalidation and Mathematics
Managing a CDN requires strict mathematical control over cache expiration (Time-To-Live, TTL).
If a developer updates a CSS file, but the Parisian PoP still has the old file cached, the website will look broken to French users. Developers use **Cache Invalidation**. They send a command to the Cloud CDN API: *"Mathematically purge TICK1/styles.cssTICK1 from every edge node globally."* Within seconds, the global network drops the file from RAM, forcing a fresh pull from the origin server on the next request.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud DNS/index.mdx': `---
title: Google Cloud DNS
description: A highly available, scalable Domain Name System (DNS) service mathematically engineered by Google to translate human-readable domain names into IP addresses globally with a 100% SLA.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud DNS"
  subtitle="Global Domain Routing"
  tags={['GCP', 'Networking', 'DNS', 'Global']}
>

If a hacker takes down your DNS provider, your entire company mathematically ceases to exist on the internet, even if your servers are running perfectly. Cloud DNS leverages the exact same global infrastructure that keeps Google.com online.

## 1. The 100% Mathematical SLA
Because DNS is the absolute bedrock of internet routing, Cloud DNS provides a mathematically binding **100% Service Level Agreement (SLA)**. 
Google guarantees the service will never go offline. It achieves this by heavily replicating your DNS Zone file (the list of your A Records, CNAMEs, and MX Records) across a massive, globally distributed network of Anycast name servers. When a user queries TICK1yourcompany.comTICK1, the query is automatically routed to the closest surviving name server, ensuring sub-millisecond resolution times regardless of regional internet outages.

## 2. Private vs. Public Zones
Cloud DNS is not just for the public internet; it is crucial for internal VPC networking.
- **Public Zones**: Translates TICK1yourcompany.comTICK1 to a Public IP address for the world to see.
- **Private Zones**: You can create a Private DNS Zone exclusively for your internal GCP Virtual Private Cloud (VPC). You can mathematically map TICK1database.internalTICK1 to Private IP TICK110.0.0.5TICK1. This record is physically invisible to the public internet. Only Virtual Machines residing strictly inside that specific VPC can resolve the name, providing massive internal security and simplifying microservice communication.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud Functions/index.mdx': `---
title: Google Cloud Functions
description: Google's event-driven, serverless compute platform that allows developers to run mathematically isolated, single-purpose blocks of code in response to cloud events.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Functions"
  subtitle="Serverless Event-Driven Code"
  tags={['GCP', 'Serverless', 'Compute', 'Functions']}
>

Cloud Functions are GCP's direct equivalent to AWS Lambda. Instead of provisioning an entire Virtual Machine to run a 50-line Node.js script, you deploy the raw code directly to the cloud, and Google mathematically handles the execution.

## 1. Event Triggers
A Cloud Function is mathematically useless until an event triggers it.
- **HTTP Triggers**: The function is assigned a public URL. When a user hits the URL, the code executes.
- **Background Triggers**: The function is physically wired into the GCP ecosystem. You can mathematically decree: *"Whenever a new file is uploaded to this specific Cloud Storage Bucket, instantly boot up my Python function, pass the file metadata as a JSON argument, and execute."* 
This allows for highly decoupled, reactive architectures. The function scales from 0 to 1,000 parallel executions instantly if 1,000 files are uploaded simultaneously.

## 2. Generations and Architecture
GCP offers two mathematical generations of Functions:
- **1st Gen**: The original architecture. Highly restricted, but extremely fast cold-starts.
- **2nd Gen (Cloud Run under the hood)**: 2nd Gen Functions are mathematically compiled into Docker containers and run on Google's Cloud Run infrastructure. This provides massive benefits: longer execution timeouts (up to 60 minutes), larger instances (up to 16GB of RAM), and native integration with Eventarc for complex event routing, blurring the line between simple Functions and complex containerized microservices.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud Logging/index.mdx': `---
title: Google Cloud Logging
description: A highly scalable, centralized log management service that mathematically aggregates, stores, and searches telemetry data from all GCP resources and custom applications in real-time.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Logging"
  subtitle="Centralized Telemetry Storage"
  tags={['GCP', 'Monitoring', 'Logs', 'Observability']}
>

If a microservice running on a GKE Kubernetes cluster crashes, the Pod is instantly destroyed. If the logs were stored locally on that Pod, the forensic data is mathematically erased forever. Cloud Logging prevents this by streaming all logs to a permanent, central repository.

## 1. The Log Router and Sinks
Cloud Logging ingests terabytes of data per second. Storing all of it forever is mathematically bankrupting.
To solve this, Cloud Logging uses the **Log Router**. Every single log entry mathematically passes through the Router. You create **Sinks** with specific mathematical filters to route the data:
- *"Filter: Severity == ERROR. Route to: BigQuery for long-term SQL analysis."*
- *"Filter: Resource == AuditLog. Route to: Cloud Storage for 7-year legal compliance."*
- *"Filter: Severity == DEBUG. Route to: /dev/null (Discard it to save money)."*
This mathematical routing allows enterprises to maintain total observability without paying exorbitant storage fees.

## 2. Advanced Log Analytics
Once the logs are stored, engineers must query them.
Cloud Logging provides a powerful, specialized query language. Because logs in GCP are highly structured JSON payloads (not just flat strings), you can write strict mathematical queries: 
TICK1resource.type="k8s_container" AND jsonPayload.latency_ms > 500 AND severity>="WARNING"TICK1.
This allows DevOps teams to instantly isolate the exact stack trace causing a performance degradation across a cluster of 1,000 nodes.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud Monitoring/index.mdx': `---
title: Google Cloud Monitoring
description: A comprehensive, mathematical observability platform (formerly Stackdriver) that ingests metrics, traces, and events to generate dashboards, alerts, and performance insights across GCP and AWS.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Monitoring"
  subtitle="Full-Stack Metrics and Alerting"
  tags={['GCP', 'Monitoring', 'Metrics', 'Alerts']}
>

Cloud Logging handles text. Cloud Monitoring handles **Metrics** (pure numerical data mathematically tracked over time, e.g., CPU=80%, Latency=45ms). Combining both gives an SRE (Site Reliability Engineer) total observability.

## 1. Metrics Explorer and MQL
Google Cloud automatically tracks thousands of default metrics for every resource you deploy.
Engineers use the **Metrics Explorer** to visually chart this data. For complex mathematical analysis, they use **MQL (Monitoring Query Language)**.
MQL allows you to perform advanced time-series math. You can write a query that takes the total number of HTTP 500 errors, mathematically divides it by the total number of HTTP 200 successes over a rolling 10-minute window, and graphs the resulting error-rate percentage, giving you a mathematically perfect view of system health.

## 2. Alerting Policies
Staring at dashboards is inefficient. SREs rely on mathematical **Alerting Policies**.
You define a strict rule: *"If the MQL error-rate percentage calculation exceeds 5% for more than 3 consecutive minutes, trigger an Alert."*
When the threshold is breached, the mathematical state engine fires a notification to an Action Channel (e.g., PagerDuty, Slack, or an SMS to the on-call engineer), ensuring that humans are only woken up at 3:00 AM when a mathematical anomaly physically threatens the platform.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.3 Google Cloud Platform/Cloud Run/index.mdx': `---
title: Google Cloud Run
description: A groundbreaking, fully managed serverless platform that mathematically orchestrates and auto-scales stateless Docker containers, charging strictly by the millisecond of execution.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Cloud Run"
  subtitle="Serverless Docker Containers"
  tags={['GCP', 'Serverless', 'Containers', 'Compute']}
>

Cloud Functions are great for tiny scripts, but terrible for complex APIs. Kubernetes (GKE) is great for complex APIs, but requires massive administrative overhead. Cloud Run is the mathematical perfection of both: You give it a Docker container, and Google scales it like a serverless function.

## 1. The Knative Abstraction
Under the hood, Cloud Run is powered by **Knative**, an open-source Kubernetes extension.
However, you never see the Kubernetes cluster. You simply execute TICK1gcloud run deploy --image my-apiTICK1. 
Google provisions the container, binds an SSL certificate, and provides a public HTTPS URL. The true mathematical power is concurrency. Unlike AWS Lambda (where 1 request = 1 container), a single Cloud Run container can mathematically handle up to 1,000 concurrent HTTP requests simultaneously. This drastically reduces the number of cold starts and makes Cloud Run significantly cheaper for high-traffic web APIs.

## 2. Scale to Zero
Cloud Run is purely serverless. 
If your API receives zero HTTP requests at 3:00 AM, Cloud Run mathematically terminates all containers. Your billing drops to exactly $0.00. 
The millisecond a user hits the URL, Cloud Run intercepts the packet, instantly boots the Docker container, processes the request, and returns the response. For developers who want the flexibility of Docker but refuse to pay for idle EC2/Compute Engine servers, Cloud Run is widely considered the most advanced serverless architecture in the cloud industry.

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
