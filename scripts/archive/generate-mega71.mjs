import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: The process of distributing network traffic across multiple servers to ensure no single server bears too much demand.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Load Balancing">

Once you move from a single monolithic server to Horizontal Scaling, you introduce a new mathematical problem: how does the user know which of the 1,000 servers to talk to?

A **Load Balancer (LB)** sits directly between the clients and the server cluster. It acts as the mathematical traffic cop, receiving all incoming HTTP requests and routing them to healthy backend servers based on a specific algorithm.

<Callout icon="info" title="Hardware vs. Software">
  Historically, Load Balancers were expensive physical hardware boxes (F5 Big-IP). Today, they are almost exclusively software-based (HAProxy, Nginx) or managed cloud services (AWS Application Load Balancer).
</Callout>

## Load Balancing Algorithms

Load balancers do not just pick servers at random. They use strict mathematical algorithms:

<ComparisonTable 
  headers={['Algorithm', 'How it works', 'Best Use Case']}
  rows={[
    ['Round Robin', 'Iterates through the list of servers in order (1, 2, 3, 1, 2, 3).', 'When all backend servers have exactly the same CPU/RAM capacity.'],
    ['Least Connections', 'Mathematically checks which server currently has the fewest active TCP connections and routes there.', 'When requests take highly variable amounts of time to process.'],
    ['IP Hash', 'Mathematically hashes the client\\'s IP address to consistently map them to the exact same backend server.', 'When your application relies on sticky sessions (storing login state in local server RAM).']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/CDNs/index.mdx': `---
title: Content Delivery Networks (CDNs)
description: A geographically distributed network of proxy servers and their data centers, designed to provide high availability and performance by distributing the service spatially relative to end users.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Content Delivery Networks (CDNs)">

Due to the mathematical limits of the speed of light, if your web server is in New York, a user in Tokyo will always experience ~200ms of latency just to download a CSS file.

A **Content Delivery Network (CDN)** solves this by placing thousands of caching servers (Edge Nodes) in every major city on Earth. When the Tokyo user requests a 5MB image, the CDN serves it from a datacenter physically located in Tokyo, dropping the latency to ~10ms.

<Callout icon="success" title="The Push vs. Pull Model">
  Most modern CDNs (like Cloudflare or Fastly) use a **Pull** model. The first time a Tokyo user requests the image, the Tokyo Edge Node pulls it from the New York Origin Server. It mathematically caches it for 24 hours. The next 10,000 users in Tokyo get the image instantly from the Edge without ever touching the Origin.
</Callout>

## What Should Be CDN-Cached?

<ComparisonTable 
  headers={['Asset Type', 'Should you CDN it?', 'Explanation']}
  rows={[
    ['Static Assets (Images, Video, CSS, JS)', 'Yes (Mandatory)', 'These files never mathematically change per user. Serving them from the Origin server is a massive waste of expensive CPU and bandwidth.'],
    ['HTML Pages', 'Sometimes', 'If it is a public blog post, cache it! If it is a logged-in user\\'s dashboard, it cannot be cached globally.'],
    ['API Responses (JSON)', 'Rarely', 'Most API data is highly dynamic and user-specific. However, a public API like a weather forecast should absolutely be CDN-cached for a few minutes.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/API gateways/index.mdx': `---
title: API Gateways
description: An API management tool that sits between a client and a collection of backend services, acting as a reverse proxy to accept all API calls and aggregate the various services required to fulfill them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="API Gateways">

In a Microservices architecture, an application might be split into 50 different microservices (Users API, Payments API, Search API). If a mobile app needs to load a complex dashboard, forcing the mobile app to mathematically track 50 different IP addresses and make 50 separate network calls over 4G is an architectural disaster.

An **API Gateway** solves this by providing a single, unified entry point. The mobile app makes one call to \`api.example.com\`, and the Gateway handles the internal routing.

<Callout icon="tip" title="API Gateway vs. Load Balancer">
  A Load Balancer operates at Layer 4 (TCP), blindly routing packets. An API Gateway operates at Layer 7 (HTTP), mathematically parsing the actual URL and JSON payload to make intelligent routing decisions.
</Callout>

## Core Responsibilities of an API Gateway

Because the Gateway is the mathematical chokepoint for all incoming traffic, it is the perfect place to implement cross-cutting concerns:

1. **Authentication/Authorization:** The Gateway validates the JWT token mathematically before the request ever reaches the vulnerable backend microservices.
2. **Rate Limiting:** Blocking malicious IPs that are mathematically spamming the API, protecting the backend databases from crashing.
3. **Request Aggregation:** The Gateway can take one incoming request, mathematically fan it out to 3 different microservices in parallel, stitch the JSON responses together, and return one clean payload to the client.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Rate limiting/index.mdx': `---
title: Rate Limiting
description: A strategy for limiting network traffic, putting a cap on how often someone can repeat an action within a certain timeframe.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rate Limiting">

If a user writes a Python script to hit your login API 10,000 times a second, they will either successfully brute-force a password or mathematically crash your database. 

**Rate Limiting** is the defensive architectural pattern of tracking how many requests a user (or IP address) has made in the last minute, and returning an HTTP \`429 Too Many Requests\` if they exceed a mathematical threshold.

<Callout icon="warning" title="Distributed Tracking">
  Rate limiting in a single-server architecture is easy (store a counter in RAM). In a distributed system with 50 API Gateways, the gateways must mathematically share their counters using an ultra-fast centralized store like Redis, so an attacker cannot bypass the limit by hitting different gateways.
</Callout>

## Mathematical Algorithms for Rate Limiting

<ComparisonTable 
  headers={['Algorithm', 'How it Works', 'Pros/Cons']}
  rows={[
    ['Token Bucket', 'Tokens are added to a bucket at a fixed mathematical rate. Every request removes a token. If the bucket is empty, requests are dropped.', 'Pro: Allows for brief bursts of traffic. Con: Tuning the bucket size can be tricky.'],
    ['Fixed Window Counter', 'Counts requests from 12:00:00 to 12:01:00. Resets to zero at 12:01:00.', 'Con: Spiky traffic at the edge of the window (e.g., 500 requests at 12:00:59, 500 requests at 12:01:01) allows an attacker to mathematically double their rate limit.'],
    ['Sliding Window Log', 'Stores the exact timestamp of every request in a Redis Sorted Set. Mathematically calculates exactly how many occurred in the last rolling 60 seconds.', 'Pro: Extremely accurate. Con: Uses a massive amount of Redis RAM.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Caching strategies/index.mdx': `---
title: Caching Strategies
description: The architectural patterns used to keep the cache and the primary database synchronized.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Caching Strategies">

Reading from a database (disk) takes ~1 millisecond. Reading from a cache like Redis (RAM) takes ~0.1 milliseconds. Caching is mathematically required for high-throughput systems.

However, caching introduces the hardest problem in computer science: **Cache Invalidation**. When the data in the database mathematically changes, how do you ensure the cache isn't serving stale, incorrect data?

<Callout icon="info" title="The Golden Rule of Caching">
  You must never cache data unless you have a mathematically rigorous plan for exactly how and when that cache will be deleted or updated.
</Callout>

## Core Architectural Strategies

<ComparisonTable 
  headers={['Strategy', 'Data Flow', 'Trade-offs']}
  rows={[
    ['Cache-Aside (Lazy Loading)', 'The application mathematically checks the cache. If it\\'s a Miss, the application queries the DB, returns the data, and writes it to the cache.', 'Pro: Only requested data is cached. Con: The first user to request new data experiences a slow mathematical DB hit.'],
    ['Write-Through', 'The application mathematically writes to the cache and the DB simultaneously in the exact same transaction.', 'Pro: The cache is mathematically guaranteed to never be stale. Con: Every write operation is slower because it requires two network hops.'],
    ['Write-Behind (Write-Back)', 'The application writes ONLY to the cache and returns success to the user instantly. An asynchronous worker mathematically flushes the cache to the DB later.', 'Pro: Extreme write throughput. Con: If the cache server crashes before flushing, data is permanently lost.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Database replication/index.mdx': `---
title: Database Replication
description: The frequent electronic copying of data from a database in one computer or server to a database in another so that all users share the same level of information.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Replication">

If your entire application relies on a single database server, you have a mathematical **Single Point of Failure (SPOF)**. If that hard drive fails, your company dies.

**Database Replication** solves this by maintaining mathematically identical copies of the database across multiple physical servers.

<Callout icon="success" title="Read Scalability">
  While Replication is primarily designed for Fault Tolerance, it also provides massive performance benefits. In most web apps, 95% of queries are Reads, and 5% are Writes. You can mathematically route all Read queries to the Replicas, entirely offloading the Primary DB.
</Callout>

## Master-Slave (Primary-Replica) Architecture

This is the most common mathematical model in the world (used by default in PostgreSQL, MySQL, AWS RDS):

1. **The Primary (Master):** One single node mathematically accepts all \`INSERT\`, \`UPDATE\`, and \`DELETE\` statements. It writes the data to disk.
2. **The Replicas (Slaves):** Multiple nodes connect to the Primary. They mathematically stream the Primary's Write-Ahead Log (WAL) and replay the changes on their own disks.
3. **Failover:** If the Primary dies, a mathematical consensus algorithm instantly elects one of the Replicas to become the new Primary.

*Note: Replication can be Synchronous (slow, zero data loss) or Asynchronous (fast, potential data loss if the Primary dies before transmitting).*

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Sharding/index.mdx': `---
title: Database Sharding
description: A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Sharding">

Database Replication solves the problem of too many *Reads*, but all *Writes* still mathematically go to a single Primary server. What happens when your application generates 100,000 \`INSERT\` statements per second, completely overwhelming the Primary's physical disk?

**Sharding** is the ultimate, nuclear option for database scaling. It mathematically splits the actual table data across multiple independent database clusters.

<Callout icon="warning" title="The Complexity Nightmare">
  Sharding is incredibly complex. Once you shard a database, mathematical \`JOIN\` operations across different shards become impossible. You cannot easily do \`SELECT * FROM Users JOIN Orders\` if Users A-M are on Server 1 and Orders are on Server 2.
</Callout>

## The Shard Key

To distribute the data, you must choose a mathematical **Shard Key**. This key determines which server a row lives on.

<ComparisonTable 
  headers={['Sharding Strategy', 'How it Works', 'The Danger']}
  rows={[
    ['Hash-Based Sharding', 'Mathematically hashes the UserID (e.g., \`Hash(UserID) % 4\`) to distribute rows evenly across 4 servers.', 'If you add a 5th server, the modulo math changes, and you must physically migrate terabytes of data.'],
    ['Range-Based Sharding', 'Users A-F go to Server 1, G-M go to Server 2.', 'Data imbalances. If all your active users happen to have last names starting with A, Server 1 mathematically melts while Server 2 does nothing (a "Hot Spot").'],
    ['Directory-Based Sharding', 'A master lookup table stores the exact server location for every single row.', 'The lookup table itself becomes a massive mathematical bottleneck and SPOF.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Partitioning/index.mdx': `---
title: Database Partitioning
description: The mathematical division of a logical database or its constituting elements into distinct independent parts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Partitioning">

While *Sharding* spreads data across multiple physical computers, **Partitioning** mathematically divides a massive table into smaller, faster chunks *on the exact same physical computer*.

If a PostgreSQL \`Orders\` table has 10 billion rows, executing a \`SELECT\` or even rebuilding an index can mathematically lock the database for hours.

<Callout icon="tip" title="The Filing Cabinet Analogy">
  A monolithic table is a single filing cabinet drawer stuffed with 10,000 papers. Partitioning is splitting those papers mathematically into 12 distinct folders (one for each month). Finding a receipt from July is now 12x faster because you can ignore 11 folders entirely.
</Callout>

## Types of Partitioning

<ComparisonTable 
  headers={['Type', 'Mathematical Mechanism', 'Use Case']}
  rows={[
    ['Horizontal Partitioning', 'Splitting rows. (e.g., Table 1 holds rows 1-1M, Table 2 holds rows 1M-2M).', 'Managing massive time-series data or log files.'],
    ['Vertical Partitioning', 'Splitting columns. Moving the massive, rarely-accessed \`UserBioText\` column into a separate table, leaving the heavily accessed \`Username\` and \`PasswordHash\` in the primary table.', 'Optimizing RAM cache. The database can fit way more Usernames into memory if it doesn\\'t have to load the Bio text.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Consistent hashing/index.mdx': `---
title: Consistent Hashing
description: A special kind of hashing such that when a hash table is resized, only n/m keys need to be remapped on average.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Consistent Hashing">

In distributed systems, we often use the mathematical modulo operator to route data. If we have 4 cache servers, we route a user to a server using: \`Hash(UserID) % 4\`.

This works perfectly until Server #4 dies. Now we only have 3 servers. If we use \`Hash(UserID) % 3\`, almost *every single user* mathematically maps to a completely different server than they did before. The entire cache is instantly invalidated, causing a catastrophic "Cache Stampede" against the database.

**Consistent Hashing** is a brilliant mathematical algorithm that solves this.

<Callout icon="success" title="The Mathematical Ring">
  Instead of a simple modulo, Consistent Hashing places all servers on a theoretical mathematical ring (from 0 to 360 degrees). When a key is hashed, it is placed on the ring. It then walks clockwise until it mathematically collides with the first server it finds.
</Callout>

## The Elegance of the Ring

1. **Adding a Server:** If you add Server #5 to the mathematical ring, it only steals a tiny slice of the keys from its immediate clockwise neighbor. The other 4 servers are completely unaffected.
2. **Removing a Server:** If Server #2 dies, its keys simply walk further clockwise to Server #3. The rest of the ring remains perfectly intact.
3. **Virtual Nodes:** To prevent one server from mathematically taking on an unfair share of the circle, each physical server is assigned dozens of "Virtual Nodes" scattered randomly around the ring, ensuring a perfectly even distribution of data.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Leader election/index.mdx': `---
title: Leader Election
description: The process of designating a single process as the organizer of some task distributed among several computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Leader Election">

In a distributed cluster of 5 identical Database Replicas, they cannot all mathematically accept Writes at the same time, or they will overwrite each other's data and destroy the system. They must agree on a single **Leader**.

**Leader Election** is the mathematical consensus process where a cluster of independent nodes communicates over the network to democratically agree on which specific node is in charge.

<Callout icon="error" title="The Split-Brain Problem">
  If the network cord between Node A and Node B is mathematically cut, Node A might think the Leader died, and elect itself. Now you have two Leaders simultaneously accepting conflicting writes. This is called a "Split-Brain," and it is the most terrifying scenario in distributed systems.
</Callout>

## Consensus Algorithms

To prevent Split-Brain, Leader Election algorithms strictly enforce a mathematical **Quorum** (usually an odd number of nodes, requiring a simple majority to win an election).

<ComparisonTable 
  headers={['Algorithm', 'Description', 'Real-World Usage']}
  rows={[
    ['Paxos', 'The original, highly mathematical consensus algorithm. It is notoriously complex and difficult for humans to understand or implement correctly.', 'Google Spanner, Amazon DynamoDB (originally).'],
    ['Raft', 'Created specifically to be mathematically equivalent to Paxos in safety, but drastically easier for humans to understand and implement.', 'Etcd (the brain of Kubernetes), Consul, modern MongoDB.'],
    ['Zookeeper Atomic Broadcast (ZAB)', 'A specialized consensus protocol built exclusively for Apache ZooKeeper.', 'Apache Kafka (legacy architecture).']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega71() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega71().catch(console.error)
