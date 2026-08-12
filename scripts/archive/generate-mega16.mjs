import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices
description: An architectural style that structures an application as a collection of loosely coupled, independently deployable services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microservices">

**Microservices Architecture** is an approach to software development where a large application is built as a suite of small, modular services. Each service runs a unique process and communicates through a well-defined, lightweight mechanism (usually HTTP REST APIs or gRPC).

<Callout icon="info" title="The Anti-Monolith">
  In a traditional **Monolithic Architecture**, the UI, business logic, and database access are all bundled into a single massive codebase and deployed as a single unit. If the billing module has a bug, you must re-deploy the entire application. In a microservices architecture, the billing module is its own standalone application. It can be written in a different language, use a different database, and be deployed independently.
</Callout>

## Key Characteristics

1. **Independent Deployability**: The core tenet. You can update the "Search" microservice without touching the "Checkout" microservice.
2. **Organized Around Business Capabilities**: Conway's Law states that software design reflects a company's communication structures. Microservices align perfectly with small, cross-functional teams (e.g., "The Payments Team").
3. **Decentralized Data Management**: Each microservice should own its own database. The Payments service has a payments DB; the User service has a users DB. They do not share databases directly (to avoid coupling).
4. **Polyglot Persistence/Programming**: Teams can choose the best tool for the job. The AI Recommendation service can be written in Python, while the high-throughput API gateway is written in Go.

## The Hidden Costs

Microservices solve organizational scaling problems, but they introduce massive technical complexity:

- **Network Latency**: Calling a function in a monolith takes nanoseconds. Calling a microservice takes milliseconds over the network.
- **Distributed Transactions**: How do you guarantee a transaction if it requires updating data in three different microservices? (You usually have to use complex Saga patterns).
- **Operational Complexity**: Instead of monitoring 1 application, you are now monitoring, logging, and orchestrating 500 applications (requiring tools like Kubernetes and Istio).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.2 Software Architecture/Event-driven architecture/index.mdx': `---
title: Event-Driven Architecture
description: A software architecture paradigm promoting the production, detection, and consumption of events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event-Driven Architecture (EDA)">

**Event-Driven Architecture (EDA)** is a design pattern where the flow of the system is determined by "Events"—significant changes in state. Instead of services directly calling each other synchronously (like a traditional REST API), services communicate asynchronously by broadcasting and listening to events.

<Callout icon="success" title="The Power of Decoupling">
  In a traditional system, when a user registers, the \`UserService\` must synchronously call the \`EmailService\` to send a welcome email. The \`UserService\` is now hard-coupled to the \`EmailService\`. If the \`EmailService\` crashes, the user registration fails.
  In EDA, the \`UserService\` simply broadcasts an event: \`UserRegistered(id: 123)\` to a Message Broker. It doesn't care who listens. The \`EmailService\` listens to that broker and sends the email asynchronously. Total decoupling.
</Callout>

## Core Components

1. **Event Producers**: Applications or IoT devices that detect a state change and publish an event to the router. (e.g., "Item Added to Cart").
2. **Event Routers / Brokers**: The middleware infrastructure that ingests, stores, and routes the events. (e.g., Apache Kafka, AWS EventBridge, RabbitMQ).
3. **Event Consumers**: Services that subscribe to specific event types. When they receive an event, they execute their business logic.

## Types of Event-Driven Patterns

- **Pub/Sub (Publish-Subscribe)**: Producers publish events to a "Topic". Multiple consumers can subscribe to the topic. Every consumer receives a copy of the event.
- **Event Streaming**: Events are written to an append-only log (like Kafka). Consumers read from the stream at their own pace. Events are strictly ordered and persistent, allowing consumers to "replay" history.
- **Event Sourcing**: Instead of storing the current state of a database entity, the system stores every single event that mutated the entity. The current state is derived by replaying the events (similar to how Git tracks commits, or a bank tracks ledger transactions).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: The process of distributing incoming network traffic across multiple servers to ensure high availability and reliability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Load Balancing">

**Load Balancing** is the critical networking technique of distributing incoming user traffic across a pool of backend servers (a "server farm"). It ensures that no single server bears too much demand, improving responsiveness and maximizing application availability.

<Callout icon="info" title="The Traffic Cop">
  Think of a Load Balancer as a traffic cop standing in front of 5 toll booths. As cars (web requests) arrive, the cop directs each car to the toll booth with the shortest line. If a toll booth breaks down, the cop immediately stops sending cars to it.
</Callout>

## Load Balancing Algorithms

How does the load balancer decide which server gets the next request?
- **Round Robin**: Requests are distributed sequentially. Server A, then B, then C, then back to A.
- **Least Connections**: Sends the request to the server with the fewest active, open connections. Best for long-lived connections (like WebSockets).
- **IP Hash**: The client's IP address is mathematically hashed to consistently map them to a specific server. Useful if you need "sticky sessions" (ensuring the user always hits the server holding their session data).

## Layer 4 vs. Layer 7 Load Balancing

Load balancers operate at different layers of the OSI model:

- **Layer 4 (Transport Layer)**: Routes traffic based purely on network data (IP addresses and TCP ports). It is blazingly fast because it does not inspect the contents of the HTTP request. It simply forwards the raw packets. (e.g., AWS Network Load Balancer).
- **Layer 7 (Application Layer)**: Inspects the actual contents of the HTTP/HTTPS request. It can route traffic based on the URL path, HTTP headers, or cookies. For example, it can send all requests for \`/api/video\` to a cluster of powerful video-encoding servers, and \`/api/text\` to cheaper servers. (e.g., NGINX, AWS Application Load Balancer).

## Health Checks

A load balancer continuously pings its backend servers (usually by hitting a \`/health\` endpoint). If a server fails to respond within a timeout, the load balancer removes it from the pool, ensuring user traffic is never routed to a dead server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Consistent hashing/index.mdx': `---
title: Consistent Hashing
description: A distributed hashing scheme that minimizes data reorganization when servers are added or removed from a cluster.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Consistent Hashing">

**Consistent Hashing** is an elegant algorithm used in distributed systems (like distributed caches or NoSQL databases) to distribute data evenly across a cluster of servers, while minimizing the disruption caused when servers crash or new servers are added.

<Callout icon="error" title="The Problem with Standard Hashing">
  Normally, to route a request for user \`Bob\` to a server, you hash his name and modulo the number of servers: \`hash("Bob") % 4 servers = Server 2\`. 
  But what happens if you add a 5th server? The formula becomes \`hash("Bob") % 5\`. The result changes completely. Adding a single server causes nearly 100% of the data to remap to entirely different servers, resulting in a catastrophic cache miss storm.
</Callout>

## The Hash Ring

Consistent Hashing solves this by mapping both the **Data Keys** and the **Servers** themselves onto a conceptual circle (the Hash Ring), typically representing the output range of a hash function (e.g., $0$ to $2^{32}-1$).

1. **Place the Servers**: Hash the IP addresses of your 4 servers. Plot them as 4 points on the ring.
2. **Place the Data**: Hash the key "Bob". Plot it on the same ring.
3. **Routing Rule**: To find which server owns "Bob", start at Bob's position on the ring and move clockwise. The first Server you hit is the owner.

## Handling Node Churn

The brilliance of Consistent Hashing is revealed when the cluster changes:
- **Adding a Server**: If a new server is added to the ring, it only takes over the keys that fall between it and the previous server counter-clockwise. Only a tiny fraction ($1/N$) of the data needs to move.
- **Removing a Server**: If a server crashes, its data is naturally inherited by the next server clockwise on the ring. The rest of the cluster is entirely unaffected.

## Virtual Nodes

A raw hash ring can lead to uneven data distribution (e.g., servers randomly clustering together, leaving one server responsible for 50% of the ring). 
To fix this, systems use **Virtual Nodes**. Instead of mapping Server A to the ring once, they map it 100 times (e.g., \`hash(ServerA_1)\`, \`hash(ServerA_2)\`). This interleaves the servers across the ring, guaranteeing a perfectly balanced load.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Horizontal scaling/index.mdx': `---
title: Horizontal Scaling (Scaling Out)
description: Scaling a system by adding more independent machines to a resource pool.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Horizontal Scaling">

**Horizontal Scaling** (also known as "Scaling Out") is the process of expanding a system's capacity by adding more distinct computers (nodes) to the cluster, rather than upgrading the hardware of a single computer.

<Callout icon="success" title="The Cloud Native Way">
  Horizontal scaling is the foundation of modern cloud architecture. If your web server is overwhelmed by traffic, you don't buy a $50,000 supercomputer. You spin up 10 cheap, generic Linux servers and put a Load Balancer in front of them.
</Callout>

## Advantages

1. **Infinite Theoretical Capacity**: Unlike vertical scaling, which is limited by the maximum size of a motherboard, you can theoretically add an infinite number of servers to a cluster (like Google or Netflix do).
2. **Fault Tolerance / High Availability**: If you have 50 servers and 2 of them experience hardware failures, the load balancer routes around them. The user experiences zero downtime.
3. **Cost Elasticity**: You can automatically scale out (add servers) during Black Friday traffic spikes, and automatically scale in (destroy servers) at 3 AM to save money.

## The Challenge: State

Horizontal scaling is incredibly easy for **Stateless** applications (like a web server that just renders HTML). Because the servers don't store any data locally, a request can be sent to any server safely.

However, horizontal scaling is incredibly difficult for **Stateful** applications (like Databases). 
If you have 5 database servers, how do you ensure that data written to Server A is immediately visible to a user reading from Server B? This requires complex distributed systems engineering, such as Replication, Sharding, and Consensus Algorithms, which bring massive complexity and latency overhead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Vertical scaling/index.mdx': `---
title: Vertical Scaling (Scaling Up)
description: Scaling a system by adding more power (CPU, RAM) to an existing machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vertical Scaling">

**Vertical Scaling** (also known as "Scaling Up") is the process of increasing a system's capacity by upgrading the hardware components of a single computer. This usually means installing a faster CPU, adding more RAM, or upgrading from HDDs to NVMe SSDs.

<Callout icon="info" title="The Simplicity Tax">
  Vertical scaling is the easiest way to solve a performance problem. You don't have to rewrite any code, you don't need load balancers, and you don't have to worry about distributed data consistency. You just pay AWS to upgrade your instance from \`t3.medium\` (2 vCPUs) to \`m5.24xlarge\` (96 vCPUs).
</Callout>

## Advantages

1. **Zero Code Changes**: The application remains a monolith. There is no network latency between nodes or complex distributed transactions.
2. **Easy Administration**: You only have one operating system to patch, secure, and monitor.
3. **Strong Consistency**: Since all data resides in one machine's memory/disk, you never have to worry about stale data or replication lag.

## Limitations

1. **The Hardware Ceiling**: There is a strict physical limit to how powerful a single machine can be. Once you buy the most expensive mainframe available, you cannot scale any further.
2. **Single Point of Failure (SPOF)**: If your entire application runs on one massive server, and the power supply on that server blows out, your entire company is offline until the hardware is replaced. There is no redundancy.
3. **Downtime**: Upgrading hardware often requires shutting down the server, replacing the RAM/CPU, and rebooting, resulting in unavoidable downtime for users.
4. **Diminishing Returns**: Upgrading from 4GB to 8GB of RAM might cost $20. Upgrading from 1TB to 2TB of RAM on a specialized enterprise server might cost $20,000. Hardware costs scale exponentially at the high end.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Rate limiting/index.mdx': `---
title: Rate Limiting
description: The practice of controlling the rate of traffic sent or received on a network to prevent abuse and protect backend services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rate Limiting">

**Rate Limiting** is a defensive system design mechanism used to control the amount of incoming traffic an API or network service will accept within a specified time window. 

If a user exceeds the allowed limit (e.g., 100 requests per minute), the server rejects subsequent requests and returns an HTTP status code \`429 Too Many Requests\`.

<Callout icon="success" title="Why is it necessary?">
  1. **Preventing DDoS**: Stops malicious actors from flooding your servers with millions of requests to take down your application.
  2. **Cost Control**: Prevents a single user's buggy script from burning through your expensive cloud computing budget.
  3. **Fairness**: Ensures that one extremely active user doesn't starve the system's resources, keeping the app fast for everyone else.
</Callout>

## Common Rate Limiting Algorithms

There are several mathematical approaches to enforcing limits, usually implemented in API Gateways or in-memory caches like Redis:

### 1. Token Bucket
Imagine a bucket that holds a maximum of 100 tokens. The system drops a new token into the bucket every second. Every time a user makes a request, they must remove a token. If the bucket is empty, the request is dropped. This allows for short "bursts" of traffic.

### 2. Leaky Bucket
Requests are placed into a queue (the bucket). The server pulls requests out of the queue at a strictly constant, fixed rate (the leak). If the queue is full, new requests spill over and are rejected. This enforces a perfectly smooth, constant output rate.

### 3. Fixed Window Counter
The system tracks the number of requests per minute (e.g., 12:00:00 to 12:00:59). If the counter hits 100, requests are blocked until 12:01:00. **Flaw**: A user can send 100 requests at 12:00:59, and another 100 at 12:01:01, resulting in 200 requests hitting the server in 2 seconds (the "burst" problem).

### 4. Sliding Window Log
Records the exact timestamp of every single request. To check if a request is valid, it sums all timestamps in the last 60 seconds. This is perfectly accurate and avoids the boundary flaw of the Fixed Window, but storing millions of timestamps consumes massive amounts of RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Database replication/index.mdx': `---
title: Database Replication
description: The process of maintaining identical copies of a database across multiple servers to ensure high availability and read scalability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Replication">

**Database Replication** is the process of copying data from a central database to one or more auxiliary databases in real-time. This is the primary method for scaling databases horizontally for read-heavy workloads and providing disaster recovery.

<Callout icon="info" title="The Leader-Follower Pattern">
  The most common replication topology is **Leader-Follower** (formerly Master-Slave). 
  - The **Leader** node handles 100% of the WRITE requests (INSERT, UPDATE, DELETE).
  - The **Follower** nodes receive a constant stream of changes from the Leader. They handle READ requests (SELECT). 
  Because web apps are typically 90% reads and 10% writes, you can scale indefinitely just by adding more Follower nodes.
</Callout>

## Synchronous vs. Asynchronous Replication

How does the Leader send data to the Followers?

- **Synchronous**: When a user writes data, the Leader forces the Follower to acknowledge receipt of the data *before* telling the user "Success". This guarantees zero data loss if the Leader explodes, but it makes writes significantly slower (due to network latency).
- **Asynchronous**: The Leader writes the data to its own disk, immediately tells the user "Success", and then sends the data to the Followers in the background. This is incredibly fast, but if the Leader explodes before the background sync finishes, data is permanently lost. (This is the industry default).

## Replication Lag

Because replication is usually asynchronous, there is a tiny delay (perhaps 500 milliseconds) between the Leader updating and the Follower updating. This is called **Replication Lag**.

If a user updates their profile picture (which writes to the Leader) and immediately refreshes the page (which reads from a Follower), they might see their old picture. This is a classic violation of "Read-After-Write Consistency" caused by replication lag.

## Multi-Leader and Leaderless

- **Multi-Leader (Active-Active)**: Multiple nodes accept writes. Excellent for geographically distributed systems (a write node in the US, a write node in the EU). Incredibly difficult to resolve conflicts when two users update the same row on different continents.
- **Leaderless (Dynamo/Cassandra)**: Any node can accept writes. The client writes to multiple nodes simultaneously and considers the write successful if a "quorum" (majority) of nodes acknowledge it. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.1 System Design Concepts/Sharding/index.mdx': `---
title: Sharding
description: A horizontal scaling technique that partitions a massive database into smaller, faster, easily managed pieces.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sharding">

**Sharding** is a database architecture pattern that involves separating a single, massive dataset into multiple smaller, independent databases (called **Shards**). It is the ultimate tool for Horizontal Scaling of database writes.

<Callout icon="warning" title="Replication vs. Sharding">
  - **Replication** copies the *same* data to multiple servers to scale READS.
  - **Sharding** splits *different* data across multiple servers to scale WRITES and storage capacity.
  If you have 10TB of data, Shard A holds the first 5TB, and Shard B holds the other 5TB.
</Callout>

## The Shard Key

To implement sharding, you must choose a **Shard Key** (or Partition Key)—a column in your database that dictates how the data is distributed.

For example, if you are building a global chat app, you might shard by \`user_id\`.
- All messages for Users 1 to 10,000 are routed to Database Server A.
- All messages for Users 10,001 to 20,000 are routed to Database Server B.

## Sharding Strategies

1. **Range-Based Sharding**: Splitting by a sequential range (e.g., Dates or IDs). Easy to implement, but can lead to "hotspots". If you shard by date, the server holding "Today's" data will be overwhelmed with 99% of the traffic, while 2015's server sits idle.
2. **Hash-Based Sharding**: You run the Shard Key through a hash function (e.g., \`hash(user_id) % 4\`). This perfectly randomizes the data, guaranteeing an even distribution across all servers, completely eliminating hotspots. (This often utilizes **Consistent Hashing**).
3. **Directory-Based Sharding**: A central lookup table explicitly tells the application which shard holds which data (e.g., "Tenant A is on Shard 4").

## The Nightmares of Sharding

Sharding should be avoided until absolutely necessary because it introduces severe architectural complexity:
- **No Cross-Shard Joins**: You cannot perform a SQL \`JOIN\` between a table on Server A and a table on Server B. 
- **Resharding**: If Shard A becomes completely full, you must split it into two new shards and migrate terabytes of data while the system is live.
- **Celebrity Problem**: In hash-based sharding, if Justin Bieber is on Shard 3, every time he posts, millions of fans query Shard 3 simultaneously, bringing it down, even though the data is technically "evenly distributed".

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/CAP theorem/index.mdx': `---
title: CAP Theorem
description: A fundamental theorem of distributed computing stating that a distributed database can only provide two of three guarantees.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CAP Theorem">

Formulated by Eric Brewer in 2000, the **CAP Theorem** is the foundational principle of distributed systems design. It states that it is mathematically impossible for a distributed data store to simultaneously provide more than two of the following three guarantees:

1. **Consistency (C)**: Every read receives the most recent write, or an error. (If I update my password, any subsequent read on any node in the world *must* reflect the new password).
2. **Availability (A)**: Every request receives a non-error response, without the guarantee that it contains the most recent write. (The system will never refuse to answer, even if the answer is slightly outdated).
3. **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of network failures (partitions) between nodes.

<Callout icon="warning" title="The Illusion of Choice">
  CAP is often explained as "Pick any 2." This is dangerously misleading. In the real world, network cables get cut, switches fail, and packets drop. **Network Partitions (P) are a physical reality, not a choice.** Therefore, distributed systems must always support Partition Tolerance.
  The real choice is: **When a network partition happens, do you choose Consistency or Availability?**
</Callout>

## CP vs. AP Systems

When the network breaks, leaving Node A unable to talk to Node B, and a user tries to read data from Node A:

### CP Systems (Consistency + Partition Tolerance)
Node A knows it cannot talk to Node B to verify if it has the most recent data. Therefore, to protect **Consistency**, Node A completely shuts down and returns an error to the user. 
- *Best for*: Financial systems, billing ledgers. (It is better to be offline than to show an incorrect bank balance).
- *Examples*: MongoDB, HBase, Redis Cluster.

### AP Systems (Availability + Partition Tolerance)
Node A knows it cannot talk to Node B, but it prioritizes **Availability**. It responds to the user with whatever stale data it currently has in its local memory. 
- *Best for*: Social media, shopping carts, metrics. (It is better to show an old Facebook comment than to show a crashing error page).
- *Examples*: Cassandra, DynamoDB, CouchDB.

## The Limitation of CAP

CAP is heavily criticized today because it is too binary. It only describes what a system does *during a catastrophic network failure*. It completely ignores what the system does 99.9% of the time when the network is perfectly fine. This led to the creation of the **PACELC Theorem**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/PACELC theorem/index.mdx': `---
title: PACELC Theorem
description: An extension to the CAP Theorem that addresses the trade-off between Latency and Consistency during normal operation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PACELC Theorem">

The **PACELC Theorem**, formulated by Daniel Abadi in 2010, is a modern extension of the CAP Theorem. 

While CAP focuses exclusively on how a database behaves during a rare network outage, PACELC acknowledges that distributed systems face a constant, everyday trade-off even when the network is perfectly healthy: the trade-off between **Latency** and **Consistency**.

<Callout icon="info" title="Decoding the Acronym">
  **PACELC** stands for:
  If there is a **P**artition, how does the system trade off **A**vailability and **C**onsistency?
  **E**lse (during normal operation), how does the system trade off **L**atency and **C**onsistency?
</Callout>

## The "E-L-C" Tradeoff (Normal Operation)

Imagine a globally distributed database with nodes in New York and Tokyo. The network is working perfectly. A user in New York updates their profile.

- **Prioritize Consistency (PC/EC)**: The New York node must pause, send the data to Tokyo over the undersea fiber-optic cable, wait for Tokyo to acknowledge receipt, and then tell the user "Success." This guarantees perfect consistency worldwide, but introduces massive **Latency** (hundreds of milliseconds).
- **Prioritize Latency (PA/EL)**: The New York node saves the data locally and immediately tells the user "Success" (zero latency). It then syncs to Tokyo in the background. For a brief window, the system is perfectly fast, but Tokyo is serving stale data (sacrificing Consistency).

## Database Classifications under PACELC

PACELC allows us to classify NoSQL databases much more accurately:

- **DynamoDB, Cassandra, Riak (PA/EL)**: When a partition happens, they prioritize Availability. When the network is fine, they prioritize low Latency (by using asynchronous replication). They are built for extreme speed and uptime.
- **MongoDB, HBase (PC/EC)**: When a partition happens, they prioritize Consistency (by electing a new primary and refusing writes until it's ready). When the network is fine, they prioritize Consistency (writes must be acknowledged by a quorum).
- **VoltDB, CockroachDB (PC/EC)**: NewSQL databases designed explicitly for perfect, global consistency at the cost of latency.

PACELC proves that in distributed systems, the speed of light is your ultimate enemy. You cannot have instantaneous writes (low latency) and instant global replication (high consistency) at the same time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Eventual consistency/index.mdx': `---
title: Eventual Consistency
description: A consistency model which guarantees that, if no new updates are made, all replicas will eventually converge to the same value.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Eventual Consistency">

**Eventual Consistency** is a data consistency model used in highly available distributed systems. It provides a weak but practical guarantee: if no new updates are made to a specific piece of data, all database nodes will "eventually" synchronize and return the exact same value.

<Callout icon="info" title="The DNS Analogy">
  The Internet's Domain Name System (DNS) is the most famous eventually consistent system. When you buy a new domain name, the registrar warns you that it might take up to 48 hours to "propagate" worldwide. During that time, a user in London might see your new website, while a user in Japan still sees an error. *Eventually*, everyone sees the website.
</Callout>

## Why use Eventual Consistency? (High Availability)

According to the CAP and PACELC theorems, enforcing perfect, immediate consistency across multiple geographical servers requires synchronous blocking, which introduces massive latency and risks downtime.

Eventual consistency is chosen when **Availability** and **Low Latency** are more important than absolute correctness. 
- *Social Media*: If you "Like" a photo on Instagram, it is written to the US server. Your friend in Europe might not see your "Like" for another 3 seconds. Nobody cares. The system feels instantaneous.
- *Amazon Shopping Cart*: Amazon famously engineered Dynamo to be eventually consistent. They decided it was better for a user to occasionally see a deleted item reappear in their cart (a consistency anomaly) than to block the user from checking out due to a database lock.

## Dealing with Conflicts

The primary technical challenge of eventual consistency is **Conflict Resolution**. 

Because nodes do not lock data during writes, two users can update the exact same record on two different servers at the exact same nanosecond. When the servers sync in the background, they discover a conflict.

Systems resolve this using:
1. **Last Write Wins (LWW)**: Using timestamps, the server simply overwrites the older data with the newer data. (Prone to clock drift issues).
2. **Vector Clocks**: A mathematical algorithm that tracks the exact causal history of edits to determine which version is truly the latest.
3. **Application-Level Resolution**: The database gives both conflicting versions to the application code and forces the developer to write custom logic to merge them (e.g., merging two shopping carts together).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Strong consistency/index.mdx': `---
title: Strong Consistency
description: A consistency model guaranteeing that any read operation will always return the value of the most recently completed write operation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Strong Consistency">

**Strong Consistency** (often referred to as Linearizability in theoretical computer science) is the most intuitive and strict data consistency model. It provides a simple guarantee: once a write operation is successfully acknowledged to the user, any subsequent read operation, from anywhere in the world, will return that updated value.

<Callout icon="success" title="The Illusion of a Single Server">
  The goal of Strong Consistency is to make a massive, globally distributed cluster of 100 database servers behave exactly as if it were just one single machine sitting on your desk. There are no "stale reads," no "propagation delays," and no "conflict resolutions."
</Callout>

## How is it achieved? (Synchronous Replication)

To guarantee that no user ever reads stale data, the database must use **Synchronous Replication** or **Consensus Algorithms** (like Raft or Paxos).

When a user updates a bank balance on the Primary Node:
1. The Primary Node locks the row.
2. The Primary Node sends the new balance to all Replica Nodes.
3. The Primary Node **halts and waits**.
4. The Replica Nodes write the data and send an acknowledgement back.
5. Only after a majority (quorum) of replicas have confirmed the write does the Primary Node tell the user "Success" and unlock the row.

## The Cost of Strong Consistency

According to the PACELC theorem, Strong Consistency comes with severe architectural penalties:

1. **Massive Latency**: Because the Primary Node must wait for network acknowledgements from other servers (potentially across oceans), write operations are inherently slow. You cannot beat the speed of light.
2. **Reduced Availability**: If a network cable is cut and the Primary Node cannot reach the Replicas to form a quorum, it mathematically cannot guarantee consistency. Therefore, it must refuse all write requests and go offline (favoring Consistency over Availability).

## Use Cases

Strong consistency is mandatory when data correctness is critical and human lives, money, or inventory are at stake:
- **Banking & Finance**: You cannot have an eventually consistent bank ledger where an ATM reads a stale balance and dispenses cash you don't have.
- **E-Commerce Inventory**: If there is only 1 concert ticket left, 10,000 people clicking "Buy" simultaneously must be strictly serialized to ensure only one person gets it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Consensus algorithms/index.mdx': `---
title: Consensus Algorithms
description: Protocols used by distributed systems to agree on a single data value or network state, even in the presence of node failures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Consensus Algorithms">

In distributed systems, a **Consensus Algorithm** is a complex mathematical protocol that allows a cluster of independent computers to agree on a single truth, even if network cables are unplugged, servers crash, or messages are delayed.

<Callout icon="info" title="The Problem of Agreement">
  Imagine a 5-node database cluster. The user sends a command: \`SET x = 10\`. Node A receives it, but before it can tell the others, it crashes. Did the write happen? Node B thinks \`x=5\`. Node C thinks \`x=10\`. If they don't agree, the database is corrupted. Consensus algorithms ensure that the cluster moves forward as a single, unified entity.
</Callout>

## The Goal: Replicated State Machines

Most consensus algorithms are designed to build a **Replicated State Machine**. The goal is to ensure that every server in the cluster executes the exact same sequence of commands, in the exact same order. If they all start at the same state and execute the same commands in the same order, they will all end up with perfectly identical data.

## Paxos (The Pioneer)

Invented by Leslie Lamport in 1989, **Paxos** is the theoretical grandfather of all consensus algorithms. It mathematically proved that consensus is possible in asynchronous networks. 
However, Paxos is notoriously difficult to understand and even harder to implement correctly in code. It relies on Proposers, Acceptors, and Learners passing multiple rounds of complex messages.

## Raft (The Industry Standard)

Because Paxos was so incredibly difficult to implement, researchers at Stanford created **Raft** in 2013, designed explicitly for "understandability." Raft is now the industry standard, powering systems like Kubernetes (etcd), MongoDB, and Consul.

Raft achieves consensus by dividing the problem into three pieces:
1. **Leader Election**: The cluster automatically holds an election. One node becomes the Leader. The others become Followers. If the Leader crashes, the Followers detect the timeout and immediately elect a new Leader.
2. **Log Replication**: All user writes are sent exclusively to the Leader. The Leader appends the command to its log and sends it to the Followers.
3. **Safety (Quorum)**: The Leader only commits the write to the database *after* a majority (Quorum) of the Followers reply that they have successfully logged the command. This guarantees that even if a minority of servers explode, the data is safe.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
