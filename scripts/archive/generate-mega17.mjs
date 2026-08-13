import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: The critical architectural component that distributes incoming network traffic across a cluster of backend servers to ensure high availability and reliability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Load Balancing">

When a web application scales from thousands to millions of users, a single server is mathematically incapable of handling the traffic. The solution is to add more servers. However, the users need a single IP address to connect to. 

A **Load Balancer (LB)** sits between the client and the server cluster, acting as a traffic cop. It accepts all incoming requests and routes them to the backend servers based on a specific algorithm.

## 1. Routing Algorithms
Load balancers use various mathematical algorithms to decide which server gets the next request:

- **Round Robin**: Distributes requests sequentially (Server 1, 2, 3, 1, 2, 3). Simple, but ignores server capacity.
- **Least Connections**: Routes the request to the server with the fewest active connections. Excellent for long-lived connections (like WebSockets).
- **IP Hash**: Mathematically hashes the client's IP address to consistently route them to the *same* server every time (useful for stateful sessions).

## 2. Layer 4 vs Layer 7 Load Balancing

<ComparisonTable 
  headers={['Metric', 'Layer 4 (Transport Level)', 'Layer 7 (Application Level)']} 
  rows={[
    ['Routing Decisions Based On', 'IP Address and TCP/UDP Port (Blind to the payload).', 'HTTP Headers, Cookies, URL Paths.'],
    ['Speed', 'Blazingly fast (minimal CPU inspection).', 'Slower (Requires decrypting TLS and parsing HTTP).'],
    ['Intelligence', 'Dumb routing.', 'Smart routing (e.g., Route TICK1/api/imagesTICK1 to Server A, TICK1/api/videoTICK1 to Server B).'],
    ['Popular Tools', 'HAProxy, AWS Network Load Balancer (NLB).', 'NGINX, AWS Application Load Balancer (ALB).']
  ]} 
/>

<Callout icon="warning" title="Single Point of Failure (SPOF)">
If you place a single Load Balancer in front of 100 robust servers, your architecture has a fatal flaw. If the Load Balancer crashes, your entire system goes offline. Load Balancers must always be deployed in **Active-Passive High Availability (HA) pairs**, using tools like Keepalived or AWS Route53 to seamlessly switch traffic if the primary LB dies.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Consistent hashing/index.mdx': `---
title: Consistent Hashing
description: A brilliant mathematical algorithm that allows distributed systems like caches and databases to dynamically scale out without causing massive data reshuffling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Consistent Hashing">

Imagine you have 4 cache servers storing millions of user sessions. You route users to servers using the mathematical formula: TICK1ServerIndex = Hash(UserID) % 4TICK1.

This works perfectly until Black Friday. Traffic spikes, and you add a 5th server.
Your formula is now: TICK1Hash(UserID) % 5TICK1.
Because the modulo denominator changed, **almost every single user hashes to a different server**. 99% of your cache becomes instantly invalidated. Your database is slammed with requests, and the system crashes. 

**Consistent Hashing** mathematically solves this exact catastrophe.

## 1. The Hash Ring
Instead of hashing values into an array, Consistent Hashing hashes both the **Data (User ID)** and the **Servers (IP Addresses)** onto a massive mathematical circle (a ring from 0 to 2³²-1).

1. Hash the 4 Servers onto the ring.
2. Hash a User ID onto the ring.
3. To find which server owns the user, move **clockwise** around the ring until you hit a Server.

## 2. The Scaling Magic
When you add a 5th server, you simply hash it onto the ring. 
Mathematically, the *only* data that gets reassigned is the data physically sitting on the ring between the new Server and its counter-clockwise neighbor. 
**If you have N servers and you add a new one, you only remap TICK11/NTICK1 of the data.** 99% of your cache remains perfectly intact.

## 3. Virtual Nodes
A raw hash ring has a flaw: servers might clump together on the ring, causing one server to take 80% of the traffic, while others take 5%. 

To solve this, modern systems use **Virtual Nodes**. Instead of hashing "Server A" once, they hash "ServerA-1", "ServerA-2", ... "ServerA-100". Each physical server appears 100 times, scattered evenly across the entire mathematical ring. This guarantees a perfectly uniform distribution of traffic.

<Callout icon="tip" title="Industry Dominance">
Consistent Hashing is the fundamental mathematical routing layer for almost all globally distributed NoSQL databases and CDNs, including **Amazon DynamoDB, Apache Cassandra, and Discord's infrastructure**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Sharding/index.mdx': `---
title: Sharding
description: The process of horizontally partitioning a monolithic database across multiple physical machines to bypass the fundamental limits of single-server scaling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Sharding">

When a database grows from 100GB to 50TB, you can no longer fit it onto a single hard drive. When you execute 100,000 writes per second, a single CPU will melt. 
**Sharding (Horizontal Partitioning)** solves this by breaking the database into smaller chunks (shards) and distributing them across multiple independent servers.

## 1. The Shard Key
To make this work, every row of data must be assigned to a specific shard. The architectural decision of *how* to split the data is dictated by the **Shard Key**. 

- **Algorithmic/Hash Sharding**: You hash the TICK1User_IDTICK1, e.g., TICK1Hash(User_ID) % 4TICK1. This mathematically guarantees an even distribution of data, preventing "hotspots". However, it makes Range Queries (e.g., "Find users with IDs between 100 and 500") impossible, because the data is scattered randomly across all servers.
- **Range Sharding**: Server A holds IDs 1-10,000. Server B holds 10,001-20,000. This makes Range Queries blazingly fast. However, it often creates "hotspots" (e.g., all new users are routed exclusively to Server B, overloading it while Server A sits idle).

## 2. The Catastrophic Costs of Sharding
Sharding is widely considered the absolute last resort in System Design. Once you shard a relational database, you physically lose access to core SQL features.

<ComparisonTable 
  headers={['SQL Feature', 'Monolithic Database', 'Sharded Database']} 
  rows={[
    ['JOINs', 'Lightning fast (Local disk).', 'Mathematically impossible across different shards without complex application-level logic.'],
    ['ACID Transactions', 'Guaranteed natively.', 'Requires extremely slow, complex Two-Phase Commit (2PC) protocols over the network.'],
    ['Auto-Increment IDs', 'Trivial (Counter in memory).', 'Requires a centralized ID generator (like Snowflake) to prevent duplicate IDs across shards.']
  ]} 
/>

<Callout icon="warning" title="Celebrity Problem (Hotspots)">
If you shard a social network by TICK1User_IDTICK1, it works great until Cristiano Ronaldo (who has 500 million followers) posts a photo. The single shard holding his data will be hit with millions of requests per second and immediately catch fire, taking down that fraction of the database. Mitigating hotspots requires extreme architectural complexity.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Rate limiting/index.mdx': `---
title: Rate Limiting
description: A critical defensive architectural pattern that restricts the number of network requests a user can make to protect APIs from abuse, DDoS, and cascading failure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Rate Limiting">

APIs are expensive to execute. If a malicious bot (or a buggy client script) sends 50,000 requests per second to your login endpoint, your database will crash, taking down the system for legitimate users. 

**Rate Limiting** acts as a defensive shield, throttling requests (usually returning HTTP 429 "Too Many Requests") when a client exceeds their quota.

## 1. The Core Algorithms

### Token Bucket
Imagine a bucket that holds a maximum of 10 tokens. Every minute, a background process adds 2 tokens to the bucket. 
When a request arrives, it must "spend" a token to proceed. If the bucket is empty, the request is dropped.
- **Benefit**: Allows for brief, sudden spikes in traffic (bursts) as long as the user has saved up tokens.

### Leaky Bucket
Incoming requests are placed into a FIFO queue (the bucket). The bucket "leaks" (processes) requests at a strictly constant rate (e.g., 5 requests per second). 
If a sudden burst of 100 requests hits, the bucket overflows and the excess requests are instantly dropped.
- **Benefit**: Guarantees a perfectly smooth, constant load on your backend database, entirely flattening out bursts.

### Fixed Window Counter
The simplest algorithm. Track requests in a Redis counter tied to the minute (e.g., TICK1user_123_10:05_AM = 8TICK1). If the counter exceeds 10, drop requests. At 10:06 AM, the counter resets to 0.
- **Flaw**: The "Boundary Spike". A user can send 10 requests at 10:05:59, and 10 requests at 10:06:01. They bypassed the limit and sent 20 requests in two seconds. 

<Callout icon="tip" title="Distributed Rate Limiting">
If you have 50 API Gateway servers, you cannot store rate limits in local RAM (or a user could hit different servers and bypass the limit 50 times). Rate Limiting in massive systems always relies on a centralized, ultra-fast, in-memory datastore like **Redis**, utilizing atomic operations like TICK1INCRTICK1 and TICK1EXPIRETICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Caching strategies/index.mdx': `---
title: Caching Strategies
description: The architectural patterns used to store expensive computational results in ultra-fast memory (RAM), drastically reducing database load and response latency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Caching Strategies">

Reading from a Disk (Database) takes milliseconds. Reading from RAM (Cache) takes microseconds. Caching is the single most powerful tool in System Design to reduce latency and save your database from collapsing under heavy load.

However, caching introduces the hardest problem in computer science: **Cache Invalidation**. If the database updates, but the cache does not, the user sees stale (wrong) data.

## 1. Write-Around (Cache Aside)
The most common strategy. The Application code acts as the orchestrator.
1. App asks Cache for data. If missing (Cache Miss), App queries the Database.
2. App writes the data into the Cache.
3. When updating data, the App updates the Database, and then manually **deletes** the cache key.
- **Pros**: Easy to build. The cache only splits data that is actually requested.
- **Cons**: Requires complex application-level logic to ensure the cache doesn't get out of sync.

## 2. Write-Through
The Application *only* ever talks to the Cache. The Cache itself is responsible for synchronously writing to the Database.
1. App writes data to the Cache.
2. The Cache freezes the request, writes to the DB, waits for the DB to confirm, and then returns success to the App.
- **Pros**: Mathematically impossible for the Cache and DB to be out of sync. Perfect consistency.
- **Cons**: Every single write suffers high latency, as it must traverse both the Cache and the DB sequentially.

## 3. Write-Back (Write-Behind)
1. App writes data to the Cache.
2. The Cache *instantly* returns success to the App.
3. Later, an asynchronous background worker takes the new data and lazily flushes it to the Database.
- **Pros**: Insanely fast. Extreme write throughput.
- **Cons**: **Dangerous**. If the Cache server loses power before the background worker flushes the data to the DB, the data is permanently destroyed.

<Callout icon="warning" title="Eviction Policies">
RAM is expensive and limited. When a cache fills up, it must delete old data to make room for new data. The most common algorithmic policy is **LRU (Least Recently Used)**, which drops the data that hasn't been requested in the longest time. 
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Horizontal scaling/index.mdx': `---
title: Horizontal Scaling (Scale-Out)
description: The paradigm of adding more physical machines to a cluster, allowing distributed architectures to handle infinite theoretical load.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Horizontal Scaling (Scale-Out)">

**Horizontal Scaling** (scaling *out*) means adding more physical (or virtual) servers to your resource pool. Instead of buying a $50,000 supercomputer, you rent 100 cheap $500 servers and link them together.

## 1. The Cloud Revolution
Horizontal scaling is the absolute foundation of modern Cloud Computing (AWS, GCP, Azure). 
Because horizontal scaling utilizes multiple independent servers, it naturally integrates with **Auto-Scaling Groups**. If CPU utilization hits 80%, the cloud provider can automatically spin up 10 new servers in seconds, and attach them to the Load Balancer.

## 2. The Architectural Requirements
You cannot simply "scale out" any application. Horizontal scaling mathematically forces your architecture to adhere to strict rules:
1. **Statelessness**: The servers cannot store any session data in local memory or local disk. If Server A saves a user's login cookie in its RAM, and the next request is routed to Server B, the user will be logged out. All state must be pushed out to a centralized Cache (Redis) or Database.
2. **Distributed Data**: If you have 50 web servers, they will instantly DDoS your single monolithic database. The database must also be horizontally scaled (via Sharding or Replication).

## 3. Fault Tolerance
The greatest advantage of Horizontal Scaling is extreme Fault Tolerance. If you have 100 servers, and 5 of them physically catch fire and explode, the Load Balancer simply removes them from the routing table. The system experiences a 5% capacity drop, but 0 seconds of downtime.

<Callout icon="tip" title="The Microservices Connection">
Horizontal scaling pairs perfectly with Microservices architecture. If the "Video Encoding" microservice is under heavy load, but the "Chat" microservice is idle, you can horizontally scale *only* the Video servers, saving massive amounts of money compared to scaling a massive Monolith.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Vertical scaling/index.mdx': `---
title: Vertical Scaling (Scale-Up)
description: The paradigm of upgrading a single machine's physical hardware (CPU, RAM, Disk) to handle increased load without altering system architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Vertical Scaling (Scale-Up)">

**Vertical Scaling** (scaling *up*) means taking your existing server and aggressively upgrading its internal hardware: adding more RAM, upgrading to a 64-core CPU, or swapping HDDs for ultra-fast NVMe SSDs.

## 1. The Simplicity of Scale-Up
The most beautiful aspect of Vertical Scaling is that it requires absolutely zero changes to your codebase or architecture. 
You do not need Load Balancers. You do not need to rewrite your app to be stateless. You do not need complex distributed caching systems. You just buy a bigger server.

For many startups, Vertical Scaling is the financially and technically superior choice for the first two years of operations.

## 2. The Mathematical Ceilings
Vertical Scaling is physically limited by the laws of thermodynamics and hardware manufacturing. 
- You can buy an AWS EC2 instance with 24 Terabytes of RAM (an TICK1u-24tb1.112xlargeTICK1). 
- If your database exceeds 24 Terabytes of RAM, you are mathematically trapped. You cannot buy a bigger server. You are forced to rewrite your entire architecture to support Horizontal Scaling (Sharding).

<ComparisonTable 
  headers={['Metric', 'Vertical Scaling', 'Horizontal Scaling']} 
  rows={[
    ['Architectural Complexity', 'Zero. Monolithic architecture works perfectly.', 'Extreme. Requires Load Balancers, stateless apps, and distributed data.'],
    ['Downtime during Scaling', 'Requires turning the server off, upgrading the hardware, and turning it back on (Downtime).', 'Zero downtime. Add new servers to the LB dynamically.'],
    ['Hardware Ceiling', 'Hard limit (Largest server available).', 'Infinite theoretical limit.'],
    ['Cost Curve', 'Exponential. (A server with 2x RAM might cost 4x the price).', 'Linear. (Buying a 2nd server costs exactly 2x).']
  ]} 
/>

<Callout icon="warning" title="The SPOF Risk">
Vertical scaling inherently creates a massive **Single Point of Failure (SPOF)**. If your entire architecture runs on a single $100,000 supercomputer, and the motherboard dies, your entire business is offline until a technician physically replaces the hardware.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/API gateways/index.mdx': `---
title: API Gateways
description: The centralized architectural entry point for microservice ecosystems, handling routing, authentication, and cross-cutting concerns at the edge.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="API Gateways">

In a modern Microservices architecture, a single mobile app might need data from the User Service, the Billing Service, and the Inventory Service. 
If the mobile app talks directly to all 3 services, it creates a chaotic, tightly-coupled web of IP addresses, SSL certificates, and authentication tokens. 

An **API Gateway** solves this by acting as the single, unified entry point for all external traffic.

## 1. The Reverse Proxy (Routing)
The primary function of an API Gateway is routing. The mobile app makes a single request to TICK1api.mycompany.com/billingTICK1. 
The Gateway mathematically inspects the URL path, looks up its internal routing table, and proxies the request into the private subnet to the specific Billing Microservice IP address. 
The external client never knows how many microservices exist behind the wall.

## 2. Cross-Cutting Concerns
If you have 50 microservices, writing JWT Authentication logic, Rate Limiting logic, and SSL Termination logic 50 times in 50 different languages is an architectural disaster. 
The API Gateway centralizes these **Cross-Cutting Concerns** at the edge of the network:

1. **SSL Termination**: The Gateway decrypts the HTTPS traffic, saving massive CPU cycles for the internal microservices (which communicate over fast, unencrypted HTTP within the private VPC).
2. **Authentication**: The Gateway verifies the JWT token. If it is invalid, it instantly drops the request, ensuring unauthenticated traffic never even touches the internal network.
3. **Rate Limiting**: The Gateway blocks malicious bots before they can harm the delicate microservices.

## 3. Request Aggregation
If a mobile client needs to render a complex dashboard, it might require 5 different REST endpoints. This forces the mobile client to make 5 slow network hops over a weak 4G connection. 
Advanced API Gateways (or specific **BFFs - Backends for Frontends**) can execute **Request Aggregation**: The mobile client makes 1 request to the Gateway. The Gateway makes 5 parallel, ultra-fast requests to the internal microservices, stitches the JSON together into a single massive payload, and sends it back to the mobile client in 1 hop.

<Callout icon="tip" title="Industry Standards">
Popular open-source API Gateways include **Kong** (built on NGINX), **Traefik**, and **Envoy**. Cloud providers offer managed solutions like **AWS API Gateway**, which natively trigger serverless Lambda functions.
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
