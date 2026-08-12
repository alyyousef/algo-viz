import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/21. Databases - Fundamentals/Database Concepts/index.mdx': `---
title: Database Concepts (ACID vs BASE)
description: The mathematical guarantees of database systems. Explaining ACID properties, the CAP Theorem, BASE architecture, Transactions, Isolation Levels, and Deadlocks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Concepts (ACID vs BASE)">

A database is not just a place to store data; it is a mathematical engine designed to guarantee data integrity in the face of network failures, server crashes, and thousands of concurrent users.

## 1. ACID Transactions (Relational Standard)
Relational databases (like PostgreSQL) mathematically guarantee **ACID** properties:
- **Atomicity**: "All or nothing." If a transaction has 5 steps and step 4 fails, the entire transaction is rolled back. No partial updates.
- **Consistency**: The database must always mathematically move from one valid state to another. Constraints (like "Balance cannot be negative") are strictly enforced.
- **Isolation**: Multiple concurrent transactions must not interfere with each other. If two users buy the last ticket simultaneously, the isolation level dictates who wins.
- **Durability**: Once a transaction is committed, it is permanently written to physical disk. Even if the server instantly loses power, the data is safe.

## 2. Isolation Levels & Deadlocks
Isolation is mathematically difficult because it destroys performance.
- **Read Uncommitted**: The fastest, but causes "Dirty Reads" (reading data from a transaction that hasn't finished yet).
- **Read Committed**: The standard default. Prevents dirty reads.
- **Repeatable Read**: Ensures that if you read a row twice in one transaction, it won't change in between.
- **Serializable**: The strictest. The database literally locks the rows and forces transactions to execute sequentially.

**Deadlocks**: Occur when Transaction A locks Row 1 and waits for Row 2, while Transaction B locks Row 2 and waits for Row 1. They wait forever. The database must mathematically detect this and kill one of the transactions.

## 3. The CAP Theorem & BASE
The **CAP Theorem** mathematically proves that in a distributed system, you can only pick two of the following three:
- **Consistency**: Every read receives the most recent write.
- **Availability**: Every request receives a non-error response (even if it's stale data).
- **Partition Tolerance**: The system continues to operate despite network failures between nodes.
Because networks *always* fail (Partition Tolerance is mandatory), databases must choose between CP or AP.

To scale globally, NoSQL databases adopted the **BASE** philosophy (AP):
- **B**asically **A**vailable
- **S**oft state
- **E**ventual consistency (The data will *eventually* propagate to all servers, but a user might read stale data for a few milliseconds).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Relational Databases/index.mdx': `---
title: Relational Databases & SQL
description: The architecture of RDBMS (MySQL, PostgreSQL, Oracle). Documenting strict Normalization (1NF-3NF), B-Tree indexing, Foreign Keys, Query Planners, and Execution Plans.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Relational Databases & SQL">

Relational Database Management Systems (RDBMS) have dominated software engineering since the 1970s. They store data in rigid tables with strictly defined mathematical schemas.

## 1. Normalization (1NF - 3NF)
Normalization is the mathematical process of structuring tables to eliminate data redundancy and prevent update anomalies.
- **1NF (First Normal Form)**: Every column must contain atomic (indivisible) values. No arrays or comma-separated strings inside a column.
- **2NF (Second Normal Form)**: Must be 1NF, and all non-key columns must depend on the *entire* Primary Key (important for composite keys).
- **3NF (Third Normal Form)**: Must be 2NF, and all non-key columns must depend *only* on the Primary Key. (e.g., Don't store TICK1UserAgeTICK1 if you already store TICK1UserDOBTICK1, as Age depends on DOB).

*Note: In massive enterprise systems, engineers sometimes intentionally **De-normalize** data (duplicate it) to dramatically speed up read queries at the cost of storage space.*

## 2. B-Tree Indexes
If you search for a user by name in a table of 100 million users, a **Full Table Scan** will take seconds.
By creating an **Index**, the database constructs a **B-Tree** (Balanced Tree) data structure on the disk. A B-Tree reduces the search time complexity from $O(N)$ to $O(\\log N)$. The database can traverse the tree to find the exact row location in 3 or 4 disk reads instead of 100 million.

## 3. Query Planners & Execution Plans
When you submit a SQL query, it is not executed directly. It goes to the **Query Planner**.
The planner is a mathematical engine that analyzes the query, looks at the available Indexes, and calculates the absolute most efficient way to fetch the data. 

TICK3sql
-- You can view the execution plan using EXPLAIN
EXPLAIN ANALYZE 
SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.country = 'UK';
TICK3

The output of an Execution Plan will tell you if the database chose a "Hash Join", a "Nested Loop", or if it was forced to do a horrific "Sequential Scan" because you forgot to add an Index.

## 4. The Giants
- **PostgreSQL**: The modern open-source standard. Incredibly feature-rich, mathematically rigorous, and supports advanced JSONB indexing.
- **MySQL (and MariaDB)**: The historical open-source standard. Extremely fast for read-heavy web applications.
- **SQLite**: A self-contained, serverless database that stores the entire database in a single local file. Used natively in billions of iOS and Android phones.
- **Oracle & SQL Server**: Massive, highly-expensive enterprise databases used by banks and governments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/NoSQL Databases/index.mdx': `---
title: NoSQL Databases
description: The non-relational ecosystem. Explaining Document stores (MongoDB), Key-Value stores (Redis), and Wide-Column stores (Cassandra).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NoSQL Databases">

In the 2000s, web giants like Google, Amazon, and Facebook realized that rigid Relational Databases could not mathematically scale across thousands of servers to handle petabytes of unstructured data. Thus, "Not Only SQL" (NoSQL) was born.

## 1. Document Stores (MongoDB, Firestore)
Instead of rigid tables, Document Stores save data as rich JSON (or BSON) objects.
- **Pros**: Schema-less flexibility. You can store an array of hobbies directly inside the User document without needing a separate table and a complex JOIN query.
- **Cons**: Because data is duplicated (de-normalized), updating a category name might require updating 10,000 separate documents instead of one row in a relational table.
- **MongoDB**: The absolute industry standard document database.
- **Firestore**: Google's serverless document database, heavily used in mobile development for real-time synchronization.

## 2. Key-Value Stores (Redis, DynamoDB)
The mathematically simplest database. It is literally just a giant hash map. You provide a Key (TICK1user:123TICK1) and it instantly returns the Value.
- **Redis**: An in-memory Key-Value store. Because it runs entirely in RAM (not on disk), it is unbelievably fast (sub-millisecond latency). It is universally used as a **Cache** to absorb massive traffic spikes.
- **DynamoDB**: Amazon's serverless Key-Value store. It mathematically guarantees single-digit millisecond latency regardless of whether you have 10 items or 100 Billion items in the database.

## 3. Wide-Column Stores (Cassandra, ScyllaDB)
Created by Facebook to power their massive Inbox search. Wide-column stores look like tables, but they are actually massively distributed Key-Value stores where the "Value" is a dynamic set of columns.
- **Architecture**: It is a Masterless, Peer-to-Peer ring architecture. There is no central server. You can lose 10 servers out of a 100-server cluster and the database will continue functioning flawlessly without dropping a single write.
- **Use Case**: Apple uses Cassandra to store over 10 Petabytes of iCloud data. Netflix uses it for their global infrastructure.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Specialized Databases/index.mdx': `---
title: Specialized Databases
description: Modern niche architectures. Graph Databases (Neo4j) for relationships, Time-Series (InfluxDB) for metrics, and Vector Databases (Pinecone, Milvus) for LLMs and AI.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Specialized Databases">

While Relational and standard NoSQL databases handle 95% of standard web applications, certain domains require mathematically specialized architectures.

## 1. Graph Databases (Neo4j)
If you are building a Social Network, a Recommendation Engine, or a Fraud Detection system, you need to query deep relationships: *"Find all friends of friends of Bob who have bought a Samsung TV in the last 30 days."*
In a Relational database, this requires 5 levels of horrific TICK1JOINTICK1 queries, taking seconds to execute.
- **Architecture**: Graph databases (like Neo4j) store data as **Nodes** (Entities) and **Edges** (Relationships). The relationships are pre-calculated physical pointers on the disk.
- **Performance**: Graph queries execute in constant time $O(1)$, regardless of whether the database has 100 users or 100 million users.

## 2. Time-Series Databases (InfluxDB, Prometheus)
If you are logging CPU metrics for 10,000 servers every second, or tracking IoT sensor data from wind turbines, you will generate billions of rows a day. A standard relational database will mathematically choke on this write volume.
- **Architecture**: Time-Series databases (TSDB) are optimized exclusively for sequential writes based on a Timestamp. They use massive data compression algorithms (like Gorilla compression) to shrink the data size by 90%.
- **Use Case**: Application Monitoring, IoT, and Financial Stock Market data.

## 3. Vector Databases (Pinecone, Milvus)
The explosive rise of Large Language Models (LLMs) created the need for Vector Databases.
- **Architecture**: You use an AI model (like OpenAI Embeddings) to convert a text document into a mathematical array of 1,536 floating-point numbers (a Vector). The Vector Database stores these embeddings in highly-optimized mathematical structures (like HNSW - Hierarchical Navigable Small World graphs).
- **Use Case**: Semantic Search. You can query the database for *"How to fix a leaky faucet"*, and it will mathematically calculate the Cosine Similarity between your query vector and all 10 million vectors in the database in milliseconds, returning the most conceptually relevant documents.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Scaling & Architecture/index.mdx': `---
title: Database Scaling & Architecture
description: How databases handle petabytes of traffic. Explaining Sharding, Partitioning, Replication, Connection Pooling, and Change Data Capture (CDC).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Scaling & Architecture">

Scaling a stateless web server is easy: you just launch 10 more copies of it behind a Load Balancer. Scaling a database is mathematically the hardest problem in distributed systems, because databases contain *State*.

## 1. Replication (Scaling Reads)
If 100,000 users are trying to read from your database, a single server will melt.
- **Master-Slave (Primary-Replica)**: All Writes go to exactly ONE Master server. The Master constantly streams the new data to 5 Read Replica servers. All Read queries are sent to the Replicas. This solves read-heavy bottlenecks.
- **Multi-Master**: Extremely complex. Writes can go to *any* server, and they sync between each other. This often requires complex mathematical conflict resolution (like CRDTs) if two users update the exact same row on two different masters simultaneously.

## 2. Sharding & Partitioning (Scaling Writes)
If you have 10 billion users, you cannot store them on one hard drive, and a single Master server cannot handle the write volume.
- **Partitioning**: Splitting a massive table into smaller physical tables on the *same* server (e.g., partitioning logs by Month).
- **Sharding**: The ultimate mathematical scale. You split the database across entirely different physical servers. (e.g., Users A-M live on Server 1, Users N-Z live on Server 2). 
  - *Warning*: Sharding destroys the ability to do simple JOIN queries across the whole dataset, vastly increasing application complexity.

## 3. Connection Pooling
Opening a TCP connection to a database requires a heavy mathematical cryptographic handshake (especially over SSL). If a web server opens a new connection for every single HTTP request, the database will instantly exhaust its RAM and crash.
- **Connection Pools (PgBouncer, Prisma Accelerate)**: A middleware layer that maintains 100 permanently open, reusable connections to the database. When a web server needs data, it simply "borrows" a connection for 5 milliseconds and returns it.

## 4. Change Data Capture (CDC)
How do you copy data from your primary PostgreSQL database into your Elasticsearch engine without writing dual-write spaghetti code in your backend?
- **CDC (Debezium)**: A CDC tool hooks directly into the database's internal **Transaction Log** (the WAL - Write Ahead Log). Every time a row is mathematically changed, CDC streams an event (e.g., via Apache Kafka) to update all downstream systems instantly.

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
