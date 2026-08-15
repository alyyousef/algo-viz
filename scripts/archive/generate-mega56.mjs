import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/CAP theorem/index.mdx': `---
title: CAP Theorem
description: A fundamental computer science theorem proving that distributed data stores can only simultaneously guarantee two out of three traits: Consistency, Availability, and Partition Tolerance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CAP Theorem">

The **CAP Theorem** (formulated by Eric Brewer in 2000) is the absolute foundation of modern distributed system design. It states that any distributed database can only provide two of the following three guarantees simultaneously:

## 1. The Three Pillars

- **Consistency (C)**: Every read receives the most recent write. If Node A updates a user's password, and a millisecond later a read request hits Node B, Node B must return the *new* password (or return an error if it hasn't synced yet).
- **Availability (A)**: Every request receives a non-error response, regardless of the state of the individual nodes. The system must always return data, even if it is slightly out of date.
- **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

## 2. The Illusion of Choice

The CAP theorem is often misunderstood as choosing any two (CA, CP, or AP). This is false. 

In the physical world, networks are unreliable. Cables get cut, routers crash, and packets drop. Therefore, **Partition Tolerance (P) is not a choice; it is a physical requirement.** Because network partitions will inevitably happen, a distributed system must fundamentally choose between **CP** and **AP**.

### Scenario: The Network Breaks
Node A and Node B are separated by a broken network cable. They cannot talk to each other. A user writes a new password to Node A. 
Another user requests the password from Node B. What does Node B do?

1. **AP (Availability over Consistency)**: Node B returns the *old* password. It remains Available, but sacrifices Consistency. (Examples: Cassandra, DynamoDB).
2. **CP (Consistency over Availability)**: Node B realizes it cannot contact Node A to verify the latest password. To prevent returning stale data, Node B throws a 500 Error. It remains Consistent, but sacrifices Availability. (Examples: MongoDB, HBase).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/PACELC theorem/index.mdx': `---
title: PACELC Theorem
description: An extension of the CAP Theorem that addresses what tradeoffs distributed systems make during normal operation when the network is perfectly healthy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PACELC Theorem">

The CAP theorem proves that in the event of a network Partition (P), you must choose between Availability (A) or Consistency (C). 
However, network partitions are rare. What happens during normal operation? The **PACELC Theorem** extends CAP to explain the trade-offs systems make when the network is perfectly healthy.

It is an acronym that reads:
**If P (Partition), choose A or C. Else (E), choose L or C.**

## 1. The "Else" Clause (Latency vs Consistency)

When there is no network failure (Else), a distributed database must still make a fundamental architectural choice every time a user writes data to Node A:

1. **Choose L (Latency over Consistency)**: Node A instantly tells the user "Write Successful", and then quietly copies the data to Node B in the background. The user experiences zero Latency. However, for a few milliseconds, Node A and Node B are Inconsistent. (Example: DynamoDB).
2. **Choose C (Consistency over Latency)**: Node A tells the user "Please wait". Node A copies the data to Node B, waits for Node B to confirm receipt, and *only then* tells the user "Write Successful". The system is perfectly Consistent, but the user experiences massive Latency. (Example: CockroachDB).

## 2. Real-World Classifications

- **Cassandra (PA/EL)**: If partitioned, favors Availability. Normally, favors Latency (speed) over perfect Consistency.
- **MongoDB (PC/EC)**: If partitioned, favors Consistency (shuts down). Normally, favors Consistency over Latency.
- **DynamoDB (PA/EL)**: The quintessential highly available, extremely fast, eventually consistent database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Consensus algorithms/index.mdx': `---
title: Consensus Algorithms
description: The complex mathematical protocols used by distributed systems to agree on a single source of truth when multiple nodes are writing data simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Consensus Algorithms">

If you have a database cluster with 5 nodes, and User A sends a command to Node 1 to set \`x=10\`, while User B sends a command to Node 2 to set \`x=20\` at the exact same millisecond, what is the final value of \`x\`?

A **Consensus Algorithm** is the protocol the nodes use to talk to each other, elect a leader, and agree on the exact chronological order of events, ensuring the entire cluster maintains a single source of truth.

## 1. The Byzantine Generals Problem

Consensus algorithms are designed to solve variations of the Byzantine Generals Problem: How do independent actors coordinate an attack over an unreliable communication network where some actors might be dead, and some actors might actively be lying (Byzantine Fault)?

In traditional database consensus, we assume nodes might crash, but they don't actively lie (Fail-Stop model). In blockchain consensus, we assume nodes *are* actively lying (Byzantine model).

## 2. Prominent Algorithms

1. **Paxos**: Invented in 1989, it is mathematically beautiful but notoriously impossible for humans to understand or implement in code. It requires complex multi-phase voting to agree on a single value.
2. **Raft**: Invented in 2013 specifically to be understandable. It relies on strict Leader Election. Only one node (the Leader) is allowed to accept writes. If the Leader crashes, the remaining nodes start a randomized timer; the first one to wake up requests votes to become the new Leader. Raft is the engine behind modern systems like **etcd** and **Consul**.
3. **Proof of Work / Proof of Stake**: The Byzantine fault-tolerant consensus algorithms used by blockchains like Bitcoin and Ethereum to agree on ledgers when nodes are actively malicious.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Eventual consistency/index.mdx': `---
title: Eventual Consistency
description: A high-availability data model where changes made to one node take time to propagate, meaning users might temporarily see stale data before the system converges.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Eventual Consistency">

In a strictly consistent database, if you update your Twitter bio, the database locks the entire system until that bio is copied to every server globally. This guarantees everyone sees the new bio instantly, but makes the database incredibly slow.

**Eventual Consistency** sacrifices immediate perfection for raw speed. It guarantees that if no new updates are made, *eventually* all servers will receive the update and return the same value.

## 1. The User Experience

If you upload a new profile picture to an eventually consistent system:
1. Server A (in New York) saves the picture instantly.
2. You refresh the page, hitting Server B (in London). Server B hasn't received the update yet. You see your *old* profile picture.
3. You panic and refresh again, hitting Server A. You see the *new* picture.
4. Two seconds later, background synchronization finishes. Server B updates. The system has "converged".

## 2. Why Use It?

Eventual consistency is the backbone of massive global systems (like DNS, Cassandra, and Amazon DynamoDB).
- **Speed**: The write operation returns a success message in 1 millisecond because it doesn't wait for global synchronization.
- **Availability**: If the underwater cable to London is severed, Server A continues accepting writes. It will simply wait until the cable is fixed to eventually sync with London.

<Callout icon="warning" title="Conflict Resolution">
  If two users update the exact same row on two disconnected servers simultaneously, an eventually consistent system will have a conflict when the network reconnects. Engineers must implement resolution strategies, like "Last Write Wins" (LWW) based on timestamps, or using complex data structures called CRDTs to merge the data automatically.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Rate limiting/index.mdx': `---
title: Rate Limiting
description: A defensive architecture mechanism used to control the amount of incoming traffic to an API, preventing server exhaustion, DDoS attacks, and abuse.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rate Limiting">

If you expose a public API, a single malicious user (or a poorly written script) can send 100,000 requests per second, completely exhausting your server's CPU and crashing the database. 

**Rate Limiting** is a defensive shield (usually deployed at the API Gateway level) that explicitly restricts how many requests a user can make in a given timeframe (e.g., "100 requests per minute per IP address"). If they exceed the limit, the server immediately drops the request and returns an **HTTP 429 Too Many Requests** error.

## 1. The Algorithms

Engineers implement Rate Limiting using several standard mathematical algorithms, usually backed by an ultra-fast in-memory cache like **Redis**:

- **Token Bucket**: The most common algorithm (used by Amazon and Stripe). You are given a bucket with 10 tokens. Every request costs 1 token. A background process refills the bucket at a rate of 1 token per second. If the bucket is empty, you are rate-limited. It allows for short "bursts" of traffic.
- **Leaky Bucket**: Requests enter the bucket at any speed, but they leak out of the bottom to the server at a strict, constant rate. This smooths out traffic spikes into a perfectly steady stream.
- **Fixed Window**: The system counts requests starting exactly at the top of the minute (12:00:00 to 12:01:00). *Flaw:* A user can send 100 requests at 12:00:59, and 100 more at 12:01:01, effectively sending 200 requests in 2 seconds and crashing the server.

## 2. Distributed Rate Limiting

Rate limiting on a single server is easy (just keep a hash map in RAM). 
In a distributed system with 50 API servers behind a Load Balancer, it becomes incredibly difficult. You cannot store the counts in local RAM, because Server 1 doesn't know how many requests Server 2 processed. You must use a centralized, atomic Redis cluster to track counts globally, which introduces latency.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Sharding/index.mdx': `---
title: Sharding
description: The process of horizontally partitioning a massive database across multiple physical servers to scale write capacity beyond the limits of a single machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sharding">

When a database becomes too large to fit on a single physical hard drive, or the sheer volume of \`INSERT\` operations exhausts the CPU, you cannot just add more "Replicas" (which only help with read traffic). You must scale horizontally by breaking the database apart into **Shards**.

Sharding is the architectural process of splitting a single logical database table across multiple independent physical servers.

## 1. The Shard Key

To split the data, you must choose a **Shard Key** (a specific column, like \`user_id\`). The application server uses a mathematical formula against this key to determine exactly which physical server holds the data.

- **Range Sharding**: \`user_id\` 1 to 10,000 go to Server A. \`user_id\` 10,001 to 20,000 go to Server B. *Danger:* If new users are highly active, Server B gets 100% of the traffic while Server A sits idle (a "Hot Shard").
- **Hash Sharding**: You pass the \`user_id\` through a Hash Function (e.g., \`Hash(user_id) % 4\`). This guarantees data is distributed perfectly evenly across all 4 servers, completely eliminating Hot Shards.

## 2. The Nightmare of Complexity

Sharding is considered an absolute last resort in System Design because it breaks the fundamental rules of relational databases:
- **No JOINs**: If you shard users based on \`user_id\`, you cannot write a query that JOINs the \`Users\` table with a different sharded table. The data lives on physically different machines.
- **Resharding**: If you use Hash Sharding with 4 servers, and you need to add a 5th server, the mathematical modulo (\`% 5\`) changes. Every single piece of data on all 4 servers must be physically moved to a new location. This requires complex techniques like **Consistent Hashing** to minimize data movement.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Message queues/index.mdx': `---
title: Message Queues
description: Asynchronous communication infrastructure that decouples microservices by allowing them to drop tasks into a buffer rather than waiting for direct API responses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Message Queues">

If Microservice A needs Microservice B to process an invoice, it could make a direct HTTP REST call. However, if Microservice B is currently overwhelmed or crashed, the HTTP call will timeout, and the invoice is permanently lost. This is called **Tight Coupling**.

A **Message Queue** (like RabbitMQ or AWS SQS) solves this by acting as a highly durable, asynchronous buffer between services.

## 1. The Producer-Consumer Pattern

1. **Producer**: Microservice A creates a JSON "Message" representing the invoice and drops it into the Queue. It receives an instant 200 OK from the Queue and immediately goes back to work. It does not care when the invoice is actually processed.
2. **The Queue**: A highly available server that holds the messages in memory (or on disk) in strict chronological order.
3. **Consumer**: Microservice B reads the message from the Queue, processes the invoice, and tells the Queue to delete the message.

## 2. System Resilience (Buffering)

The true power of a message queue is handling traffic spikes.
If a Super Bowl ad causes 100,000 users to sign up in one minute, the system needs to send 100,000 welcome emails. An email server cannot send 100,000 emails a minute; it will crash.

Instead, the Web Server dumps 100,000 "Send Email" tasks into a Message Queue. The Email Server pulls them off the queue at a steady, safe rate of 500 per minute. The queue acts as a shock absorber, protecting the Email Server from being destroyed by the traffic spike.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Apache Kafka/index.mdx': `---
title: Apache Kafka
description: An ultra-high-throughput, distributed event streaming platform used to handle millions of real-time events per second without dropping a single packet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Kafka">

A standard message queue (like RabbitMQ) deletes a message the moment a consumer reads it. It is designed for simple task delegation. 
**Apache Kafka** is completely different. It is a **Distributed Event Streaming Platform**. It operates like an append-only, immutable database log. When you write a message to Kafka, it stays on the hard drive permanently (or for a configured retention period).

## 1. The Anatomy of Kafka

- **Topics**: Data is organized into Topics (e.g., \`user-clicks\`).
- **Partitions**: To handle millions of events per second, a single Topic is broken apart into Partitions spread across multiple physical servers.
- **Producers**: Applications that aggressively dump events onto the end of a Partition log.
- **Consumers**: Applications that read from the log. Because the data isn't deleted, you can have 50 different microservices all reading the exact same \`user-clicks\` log simultaneously, at their own pace, using an **Offset** (a bookmark indicating the last message they read).

## 2. High Throughput

Kafka is famous for processing millions of messages per second on cheap hardware. It achieves this by bypassing RAM entirely. 
It uses a Linux kernel feature called **Zero-Copy**, moving data directly from the network socket to the hard drive, and directly from the hard drive back to the network socket, utilizing sequential disk I/O which is blazingly fast.

<Callout icon="info" title="Kafka vs Traditional Queues">
  Use RabbitMQ or AWS SQS when you want to execute a specific task exactly once (like sending an email). Use Kafka when you want to broadcast a massive stream of events (like website clicks, IoT sensor data, or financial ticker prices) to multiple different analytical systems simultaneously.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.4 Caching/Cache fundamentals/index.mdx': `---
title: Cache Fundamentals
description: The architectural strategy of storing expensive database queries in ultra-fast RAM to reduce latency and protect backend infrastructure from traffic spikes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache Fundamentals">

Querying a relational database requires hitting the physical hard drive and performing complex mathematical \`JOIN\` operations. It is slow and expensive. 

A **Cache** is a temporary storage layer composed entirely of ultra-fast RAM (like Redis or Memcached). By storing the results of expensive queries in RAM, the system can return data to the user in microseconds, completely bypassing the database.

## 1. Cache Strategies

How do you get data into the cache?
- **Cache-Aside (Lazy Loading)**: The application asks the cache for a User Profile. If it's missing (a Cache Miss), the application hits the database, gets the profile, sends it to the user, and then saves it in the cache for the *next* time.
- **Write-Through**: The application writes data directly to the cache, and the cache immediately writes it synchronously to the database. Slower write speeds, but guarantees the cache is never stale.
- **Write-Back (Write-Behind)**: The application writes data only to the cache and instantly returns success. The cache asynchronously flushes the data to the database later. Extremely fast, but if the cache loses power, data is permanently lost.

## 2. Cache Invalidation (The Hardest Problem)

A famous computer science quote states: *"There are only two hard things in Computer Science: cache invalidation and naming things."*

If a user updates their profile picture in the database, the cache still holds the old picture. You must explicitly tell the cache to delete (invalidate) the old data. If the invalidation logic fails, your application will serve stale, corrupted data to users indefinitely.
Engineers mitigate this using **TTL (Time to Live)**, forcing the cache to automatically delete data after a certain timeframe (e.g., 5 minutes) as a safety net.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.4 Caching/Redis/index.mdx': `---
title: Redis
description: The world's fastest in-memory key-value data store, used universally for caching, rate limiting, and real-time leaderboards.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Redis (Remote Dictionary Server)">

Redis is an open-source, in-memory, NoSQL key-value store. Because it bypasses the hard drive and stores everything exclusively in RAM, it is capable of performing millions of read and write operations per second with sub-millisecond latency.

It is universally deployed in almost every modern system design architecture.

## 1. More Than Just Strings

While Memcached can only store simple strings, Redis is famous for supporting advanced native data structures:
- **Strings**: Storing JSON blobs or counting page views (using atomic \`INCR\` commands).
- **Lists**: Implementing basic queues or showing the 10 most recent comments.
- **Sets**: Ensuring uniqueness (e.g., storing the IP addresses of users who already voted in a poll).
- **Sorted Sets**: The holy grail of Redis. It automatically keeps data sorted by a numerical score. Used to build real-time global gaming leaderboards in $O(\\log N)$ time.

## 2. Single-Threaded Event Loop

Redis is notoriously **single-threaded**. It processes every single command sequentially, one at a time. 
While this sounds slow, because RAM access is so incredibly fast, a single thread can process 100,000+ commands per second. 

The massive advantage of being single-threaded is that Redis commands are **Atomic**. If two web servers simultaneously send an \`INCR\` command to increase a view counter, Redis guarantees they will not overwrite each other (no race conditions). This makes Redis the perfect engine for distributed locks and rate limiters.

<Callout icon="warning" title="Data Persistence">
  Because Redis lives in RAM, if the server loses power, all data is instantly annihilated. While Redis offers persistence features (RDB snapshots to disk, or AOF append-only logs), they degrade performance. Redis is primarily used as an ephemeral cache, not a primary source of truth.
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
