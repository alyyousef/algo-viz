import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: "The process of distributing incoming network traffic across a group of backend servers to ensure high availability and reliability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Load Balancing">

If a single web server can handle 1,000 concurrent users, what happens when 10,000 users visit your site? You scale horizontally by adding 9 more servers. But how do the users know which of the 10 servers to connect to? You place a **Load Balancer** in front of them.

A Load Balancer acts as the "traffic cop" routing client requests across all servers capable of fulfilling them in a manner that maximizes speed and capacity utilization.

## 1. Types of Load Balancers

<ComparisonTable 
  headers={['Type', 'OSI Layer', 'How it works', 'Use Case']} 
  rows={[
    ['Layer 4 (Transport)', 'Layer 4 (TCP/UDP)', 'Routes traffic based purely on IP address and Port. It does not inspect the contents of the HTTP request.', 'Ultra-low latency routing, or routing non-HTTP traffic (like database connections).'],
    ['Layer 7 (Application)', 'Layer 7 (HTTP)', 'Inspects the actual HTTP headers, URL paths, and cookies to make routing decisions.', 'Routing TICK1/apiTICK1 to Node.js servers, and TICK1/imagesTICK1 to static file servers.']
  ]} 
/>

## 2. Redundancy
A load balancer introduces a single point of failure. If the load balancer crashes, your entire application goes offline, even if all 10 backend servers are perfectly healthy.

To solve this, load balancers are always deployed in **Active-Passive** or **Active-Active** clusters using protocols like VRRP or Keepalived. If the primary load balancer dies, the standby instantly takes over its IP address.

## 3. Session Persistence (Sticky Sessions)
If a user adds an item to their shopping cart on Server A (and Server A stores that cart in local memory), their next request *must* be routed to Server A, or their cart will appear empty. Load balancers achieve this by injecting a cookie into the user's browser, forcing "Sticky Sessions". 

*(Note: Modern system design discourages Sticky Sessions. State should be stored in a shared external database like Redis so any server can handle any request.)*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/CDNs/index.mdx': `---
title: Content Delivery Networks (CDNs)
description: "A geographically distributed network of proxy servers that cache content closer to end users to reduce latency."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Content Delivery Networks (CDNs)">

Because of the speed of light, data takes roughly 150 milliseconds to travel from New York to Sydney, Australia. If your web server is in New York, Australian users will experience severe latency.

A **CDN (Content Delivery Network)** solves this by placing thousands of caching servers (called **Edge Servers**) in cities all around the world.

## 1. How a CDN Works
1. A user in Sydney requests TICK1hero-image.jpgTICK1.
2. The DNS routes their request to the closest CDN Edge Server (in Sydney).
3. **Cache Miss**: The Sydney edge server does not have the image. It forwards the request to your **Origin Server** in New York.
4. The Origin Server sends the image back to Sydney.
5. The Sydney edge server saves a copy in its RAM/Disk (caches it) and serves it to the user.
6. **Cache Hit**: A second user in Sydney requests the same image. The edge server serves it instantly from cache without ever contacting New York.

## 2. Push vs Pull CDNs
- **Pull CDN**: The most common. You just point the CDN at your Origin URL. The CDN pulls files automatically upon the first user request (lazy loading).
- **Push CDN**: You actively upload your files (via API or FTP) directly to the CDN's servers ahead of time. Best for massive files that must be available instantly to everyone.

<Callout icon="warning" title="Cache Invalidation">
The hardest part of using a CDN is cache invalidation. If you update your logo on the Origin Server, the CDN might continue serving the old logo for 24 hours. You must either manually issue a "Purge" command via the CDN dashboard, or use versioned filenames (TICK1logo_v2.jpgTICK1) to bust the cache automatically.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Caching strategies/index.mdx': `---
title: Caching Strategies
description: "Common patterns for deciding when to read from and write to a high-speed cache versus the primary database."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Caching Strategies">

Reading from a database (like PostgreSQL) requires slow disk I/O. Reading from a Cache (like Redis or Memcached) is done entirely in RAM and is orders of magnitude faster. However, because caches are volatile and have limited capacity, you must employ specific strategies to keep the cache synchronized with the database.

## 1. Read Strategies

<ComparisonTable 
  headers={['Strategy', 'How it works', 'Pros & Cons']} 
  rows={[
    ['Cache-Aside (Lazy Loading)', 'Application asks Cache. If miss, app asks DB, then writes result to Cache.', 'Pro: Cache only contains requested data. Con: The first request is penalized with a cache miss latency.'],
    ['Read-Through', 'Application asks Cache. If miss, the *Cache itself* (not the app) fetches from the DB, saves it, and returns it.', 'Pro: App logic is much simpler. Con: Requires specific cache software that supports DB connections.']
  ]} 
/>

## 2. Write Strategies

<ComparisonTable 
  headers={['Strategy', 'How it works', 'Pros & Cons']} 
  rows={[
    ['Write-Through', 'Application writes to the Cache, and the Cache immediately writes synchronously to the DB.', 'Pro: Data is always 100% consistent. Con: Every write incurs the latency of writing to both systems.'],
    ['Write-Behind (Write-Back)', 'App writes *only* to the Cache. The Cache asynchronously writes to the DB later in a batch.', 'Pro: Extremely fast writes. Con: High risk of data loss if the Cache crashes before flushing to the DB.'],
    ['Write-Around', 'App writes directly to the DB, bypassing the Cache entirely.', 'Pro: Prevents the cache from filling up with data that won\\'t be read soon. Con: The next read will be a cache miss.']
  ]} 
/>

## 3. Eviction Policies
When the RAM is full, the cache must delete old data to make room for new data. The most common algorithm is **LRU (Least Recently Used)**, which discards the item that has not been read in the longest amount of time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/CAP theorem/index.mdx': `---
title: CAP Theorem
description: "A fundamental theorem stating that a distributed data store can only simultaneously provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The CAP Theorem">

Formulated by Eric Brewer in 2000, the **CAP Theorem** is the foundational rule for understanding how distributed databases (like Cassandra, MongoDB, or CockroachDB) handle network failures.

It states that a distributed system can only guarantee **two out of three** of the following properties:

1. **Consistency (C)**: Every read receives the most recent write, or an error. If User A updates their name, User B *must* see the new name immediately.
2. **Availability (A)**: Every request receives a non-error response, without the guarantee that it contains the most recent write.
3. **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

## The Reality of CAP
In a distributed system connected over the internet, network partitions (P) are a fact of physics. Cables get cut, switches fail, routers crash. Therefore, **you cannot choose CA**. You are forced to choose between **CP** and **AP** during a network failure.

Imagine a database with Node 1 and Node 2. The network cable between them is cut (a Partition).

### Scenario 1: Choose Consistency (CP)
A user tries to write to Node 1. Node 1 cannot contact Node 2 to replicate the data. To remain Consistent, Node 1 *must* refuse the write and return an Error to the user. The system is Consistent, but **Unavailable**.
*Examples: MongoDB, HBase, Redis.*

### Scenario 2: Choose Availability (AP)
A user tries to write to Node 1. Node 1 cannot contact Node 2, but accepts the write anyway to remain Available. A second user reads from Node 2 and gets the old, stale data. The system is Available, but **Inconsistent**.
*Examples: Cassandra, DynamoDB.*

<Callout icon="info" title="PACELC Theorem">
CAP only applies *during a failure*. What about when the network is running perfectly? The **PACELC Theorem** extends CAP: "If there is a Partition (P), choose A or C. Else (E), choose between Latency (L) and Consistency (C)."
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Rate limiting/index.mdx': `---
title: Rate Limiting
description: "A technique used to control the amount of incoming traffic to a network or application to prevent abuse and ensure stability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Rate Limiting">

If a single user (or a malicious bot) sends 10,000 requests per second to your login endpoint, your database will crash, taking the entire application offline for everyone. **Rate Limiting** prevents this by artificially capping the number of requests a user can make within a specific time window.

When a limit is exceeded, the server stops processing the request and returns an **HTTP 429 Too Many Requests** response.

## Common Algorithms

<ComparisonTable 
  headers={['Algorithm', 'How it works', 'Pros & Cons']} 
  rows={[
    ['Token Bucket', 'Tokens are added to a bucket at a fixed rate (e.g., 1 per second). Every request costs 1 token. If the bucket is empty, drop the request.', 'Pro: Allows sudden, brief bursts of traffic. Standard for most APIs (like AWS/Stripe).'],
    ['Leaky Bucket', 'Requests are placed in a queue (the bucket) that leaks (processes) at a strict, constant rate.', 'Pro: Smooths out bursts, ensuring a perfectly stable load on backend servers.'],
    ['Fixed Window Counter', 'Divides time into fixed windows (e.g., 1:00-1:01). Increments a counter. Resets at the start of the next minute.', 'Con: The "Burst at Edge" problem. A user can send 100 requests at 1:00:59, and 100 more at 1:01:01, crushing the server with 200 requests in 2 seconds.'],
    ['Sliding Window Log', 'Keeps a timestamp of every single request in a Redis sorted set. Calculates exact rate based on current time minus 1 minute.', 'Pro: Perfectly accurate. Con: Consumes massive amounts of RAM to store all those timestamps.']
  ]} 
/>

## Implementation
Rate limiting is rarely implemented inside the application code itself. It is almost always handled at the edge by the **API Gateway**, Load Balancer, or WAF (Web Application Firewall) (e.g., Cloudflare, Nginx, Kong), using Redis to share the rate limit counters across all edge servers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Circuit breakers/index.mdx': `---
title: Circuit Breaker Pattern
description: "A design pattern used to detect failures and encapsulate the logic of preventing a failure from constantly recurring."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Circuit Breaker Pattern">

In a microservices architecture, Service A calls Service B. If Service B becomes overloaded and extremely slow, Service A will sit there waiting for a timeout. Very quickly, all the threads in Service A will be blocked waiting for Service B, causing Service A to crash. This is a **Cascading Failure**.

To prevent this, we wrap the network call in a **Circuit Breaker** (borrowing the concept from electrical engineering).

## The Three States

1. **CLOSED**: Under normal operations, the circuit is closed. Requests flow freely from A to B. The circuit breaker counts the number of failures/timeouts.
2. **OPEN**: If the failure rate exceeds a threshold (e.g., 50% failures over 10 seconds), the circuit "trips" and opens. While OPEN, Service A *instantly* returns an error to the user without even attempting to call Service B. This gives Service B time to recover instead of hammering it with traffic.
3. **HALF-OPEN**: After a timeout (e.g., 30 seconds), the breaker lets a *single* test request pass through to Service B.
   - If the test request succeeds, the circuit assumes B has recovered and resets to **CLOSED**.
   - If the test request fails, the circuit snaps back to **OPEN** and waits another 30 seconds.

<Callout icon="tip" title="Fallbacks">
When the circuit is OPEN, a good application implements a **Fallback**. If the "Recommendation Engine" service is down, the Circuit Breaker instantly returns a fallback list of the "Top 10 Global Best Sellers" so the UI doesn't look broken.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Consistent hashing/index.mdx': `---
title: Consistent Hashing
description: "A specialized hashing algorithm that minimizes the number of keys that need to be remapped when a hash table is resized."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Consistent Hashing">

Imagine you are storing 1 million user profiles across a cluster of 4 Redis servers (Servers A, B, C, and D). 
To figure out which server holds User 123, you use a simple modulo hash: TICK1serverIndex = hash("User123") % 4TICK1.

This works perfectly until Server C crashes. Now you only have 3 servers. You change the formula to TICK1% 3TICK1. Suddenly, almost every single user maps to a completely different server index. **You just invalidated your entire cache.**

## The Solution: The Hash Ring

**Consistent Hashing** solves this by mapping both the data keys *and* the servers onto a conceptual circle (a "hash ring" from 0 to 360 degrees).

1. Hash the IP addresses of Servers A, B, C, and D, and place them on the ring (e.g., at 10°, 90°, 180°, 270°).
2. Hash the user ID (e.g., "User123" hashes to 45°).
3. To find the server for User 123, move clockwise around the ring from 45° until you hit the first server. (In this case, Server B at 90°).

## Adding or Removing Servers
If Server C (180°) crashes, the keys that were stored on it simply continue clockwise and fall onto Server D (270°). 
**The brilliant part:** All the keys on Server A, Server B, and Server D remain exactly where they are. Only the data on the broken server needs to be remapped. 

<Callout icon="info" title="Virtual Nodes">
To prevent data from bunching up unevenly if servers happen to hash close together on the ring, implementations use **Virtual Nodes**. Instead of hashing Server A once, they hash Server A 100 times (e.g., A1, A2, A3) to spread it evenly across the entire 360-degree ring.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Saga pattern/index.mdx': `---
title: Saga Pattern
description: "A sequence of local transactions used to maintain data consistency across microservices."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="The Saga Pattern">

In a monolith, if a user buys an item, you deduct inventory and charge their card within a single ACID database transaction. If the card declines, you issue an SQL TICK1ROLLBACKTICK1, and the inventory is perfectly restored.

In microservices, the Inventory DB and the Payment DB are separated by a network. You cannot run a single ACID transaction across them. To solve this, you use a **Saga**.

A Saga is a sequence of local database transactions. Each service performs its local transaction and publishes an event to trigger the next step.

## Compensating Transactions
If a step fails, you cannot use SQL TICK1ROLLBACKTICK1. You must write business logic to execute a **Compensating Transaction**—an operation that actively undoes the previous step.

If Step 1 (Deduct Inventory) succeeds, but Step 2 (Charge Card) fails, the Payment Service emits a "PaymentFailed" event. The Inventory Service listens for this event and executes a Compensating Transaction: TICK1UPDATE inventory SET count = count + 1TICK1.

## Choreography vs Orchestration

There are two ways to organize a Saga:

<ComparisonTable 
  headers={['Type', 'How it works', 'Pros & Cons']} 
  rows={[
    ['Choreography', 'Services listen to each other\\'s events directly. (A decentralized dance).', 'Pro: No single point of failure. Con: Hard to track the overall status of the transaction.'],
    ['Orchestration', 'A central "Orchestrator" service acts as a conductor, explicitly telling each service what to do via commands.', 'Pro: Complex workflows are easy to monitor and reason about. Con: The orchestrator is a single point of failure.']
  ]} 
/>

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
