import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/21. Databases - Fundamentals/Database Concepts/index.mdx': `---
title: Core Database Concepts
description: The fundamental principles governing data storage, retrieval, and transaction integrity across all modern database systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Core Database Concepts">

Before deciding between PostgreSQL, MongoDB, or Redis, an engineer must understand the fundamental concepts that govern how any database physically stores and protects data on a hard drive.

## 1. ACID Properties

The gold standard for relational database reliability is **ACID**. If a database is ACID-compliant, it guarantees that catastrophic hardware failures will not corrupt your data.
- **Atomicity**: A transaction is "all or nothing". If you transfer $100 from Alice to Bob, the database must subtract $100 from Alice AND add $100 to Bob. If the server loses power exactly in the middle, the database will completely roll back the transaction so Alice doesn't lose her money.
- **Consistency**: A transaction can only bring the database from one valid state to another. If a column has a rule saying \`balance >= 0\`, the database will automatically reject any transaction that results in a negative balance.
- **Isolation**: Concurrent transactions must not interfere with each other. If two people try to buy the absolute last ticket to a concert at the exact same millisecond, the database must serialize the requests, ensuring only one succeeds.
- **Durability**: Once a transaction is committed, it is written to non-volatile storage (the hard drive). If someone unplugs the server 1 millisecond later, the data is guaranteed to survive.

## 2. CAP Theorem

The CAP theorem proves that in a **distributed database** (a database spread across multiple servers), it is mathematically impossible to guarantee all three of the following traits simultaneously:
- **Consistency (C)**: Every read receives the most recent write.
- **Availability (A)**: Every request receives a non-error response (even if it's not the most recent data).
- **Partition Tolerance (P)**: The system continues to operate despite network failures dropping messages between nodes.

Because network partitions (P) are a physical reality of the internet (cables break), a distributed database must always choose between **CP** (Consistency over Availability) or **AP** (Availability over Consistency).

## 3. Indexes

Searching a database row-by-row (a "Full Table Scan") is incredibly slow. An **Index** is a separate, specialized data structure (usually a B-Tree) maintained by the database that keeps a specific column mathematically sorted.
- If you query \`WHERE user_id = 500\`, the database uses the Index to find the user in $O(\\log N)$ time, instead of scanning all 10 million rows.
- **The Trade-off**: Indexes consume massive amounts of disk space, and every time you \`INSERT\` or \`UPDATE\` a row, the database must also pause to update the Index, slowing down write speeds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/NoSQL Databases/index.mdx': `---
title: NoSQL Databases
description: Non-relational databases designed for hyper-scalability, flexible schemas, and high-velocity data that does not fit neatly into rigid tables.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NoSQL Databases">

Relational (SQL) databases were designed in the 1970s for highly structured data (like accounting ledgers) running on single, massive servers. 
In the 2000s, the explosion of web traffic and unstructured data (JSON, social media feeds, sensor logs) exposed the limits of SQL's rigid schemas and its inability to horizontally scale across hundreds of cheap servers. **NoSQL** was born.

## 1. Document Databases (MongoDB, Couchbase)

Instead of tables and rows, Document Databases store data as hierarchical JSON-like documents.
- **Flexibility**: You can store a user with an \`age\` field in Document 1, and a user without an \`age\` field in Document 2. There is no rigid schema enforcement.
- **Nested Data**: Instead of requiring 3 different tables and 3 \`JOIN\` operations to reconstruct a blog post and its comments, a Document Database stores the post and its array of comments together in a single, massive document. This makes reads incredibly fast.

## 2. Key-Value Stores (Redis, DynamoDB)

The absolute fastest type of database in existence. It functions exactly like a giant Hash Table. 
- You provide a Key (e.g., \`session_id_42\`), and the database returns a massive blob of data (Value).
- You cannot perform complex queries. You cannot say *"Find all users older than 25"*. You must know the exact Key.
- Because they often run entirely in RAM (like Redis), they offer sub-millisecond latency and are the backbone of modern caching architectures.

## 3. Wide-Column Stores (Cassandra, ScyllaDB)

Designed to handle astronomical amounts of data spread across thousands of servers. They organize data into columns instead of rows.
- If you have a database tracking the temperature of 10 million IoT sensors every second, a Wide-Column store can write that data across 50 different servers simultaneously without locking up. They are heavily optimized for write-heavy workloads.

<Callout icon="warning" title="Eventual Consistency">
  To achieve massive horizontal scalability and speed, many NoSQL databases sacrifice strict ACID compliance, opting for **Base (Basically Available, Soft state, Eventual consistency)**. If you update a user's profile picture, it might take a few milliseconds for that change to propagate to all servers globally. During that window, different users might temporarily see different pictures.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Relational Databases/index.mdx': `---
title: Relational Databases (SQL)
description: The absolute gold standard of data storage, organizing data into strict tables, enforcing relationships through foreign keys, and providing transactional integrity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Relational Databases (SQL)">

Relational Database Management Systems (RDBMS) like PostgreSQL, MySQL, and Oracle are the most widely used databases in the world. They organize data into rigid, highly structured tables (rows and columns) and use **SQL (Structured Query Language)** to interact with the data.

## 1. Relational Integrity

The core philosophy of an RDBMS is that data should be mathematically perfect, strictly typed, and completely devoid of duplication. 

- **Primary Keys**: Every row in a table must have a unique identifier (e.g., \`user_id\`).
- **Foreign Keys**: If a row in the \`Orders\` table belongs to a user, it stores their \`user_id\` as a Foreign Key. The database mathematically enforces this link. If you try to delete the user from the \`Users\` table, the database will aggressively block the deletion and throw an error, preventing you from creating an "orphaned" order.
- **Strict Schemas**: Before you can insert data, you must define the schema. If you tell the database a column is an \`INTEGER\`, and you try to insert the string \`"Five"\`, the database rejects the entire transaction.

## 2. Normalization

Normalization is the process of breaking data apart into smaller, specialized tables to eliminate redundancy.
Instead of storing a customer's shipping address redundantly on 50 different order rows, you store the address once in an \`Addresses\` table, and link to it via a Foreign Key. 

- **Advantage**: If the customer moves, you only update their address in one single place.
- **Disadvantage**: To actually view an order with its address, the database must perform a **JOIN**, mathematically stitching the tables back together in RAM, which is computationally expensive.

<Callout icon="tip" title="PostgreSQL vs MySQL">
  While both are phenomenal, **PostgreSQL** is generally considered the most advanced open-source relational database. It strictly adheres to SQL standards, supports advanced data types (like native JSONB for NoSQL-like capabilities), and handles complex analytical queries better. **MySQL** is slightly more forgiving, historically faster at simple read operations, and easier to set up for basic web apps.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Scaling & Architecture/index.mdx': `---
title: Database Scaling & Architecture
description: The architectural strategies used to expand a database's capacity to handle millions of users through vertical scaling, replication, and sharding.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Scaling & Architecture">

A single database server can easily handle thousands of requests per second. But what happens when an application goes viral and the database CPU hits 100%? The database becomes a global bottleneck, bringing down the entire application.

## 1. Vertical Scaling (Scaling Up)

The easiest solution to database performance issues is throwing money at the hardware.
- Instead of rewriting your architecture, you simply shut down the server and migrate the database to a massive mainframe with 128 CPU cores and 2 Terabytes of RAM.
- **The Limit**: Vertical scaling has a hard physical limit. You cannot buy a server with 10,000 CPU cores. Eventually, you will hit a hardware ceiling.

## 2. Replication (Scaling Reads)

In most web applications, 90% of database traffic is reading data, and only 10% is writing data.
**Primary-Replica Replication** solves this imbalance:
1. You have one **Primary (Master)** database. All \`INSERT\`, \`UPDATE\`, and \`DELETE\` operations must go here.
2. The Primary constantly streams a log of its changes to multiple **Replica (Slave)** databases.
3. Your application routes all \`SELECT\` (Read) queries to the Replicas.

By adding 5 Replicas, you can multiply your read capacity by 500%, while keeping the Primary perfectly safe from CPU exhaustion.

## 3. Sharding (Scaling Writes)

If your application is writing massive amounts of data (like Twitter), the Primary database will eventually fail. You must scale horizontally by breaking the database apart.

**Sharding** is the process of splitting a single logical table across multiple physical servers.
- **User IDs 1 to 10,000** are physically stored on Database Server A.
- **User IDs 10,001 to 20,000** are physically stored on Database Server B.
- When a user logs in, your application server uses a mathematical Hashing Algorithm to determine which physical database server holds their data, and routes the query directly to that server.

<Callout icon="warning" title="The Sharding Nightmare">
  Sharding introduces catastrophic complexity to an application. You can no longer perform \`JOIN\` operations between users, because their data lives on entirely different physical machines. Schema migrations require orchestrating updates across dozens of servers simultaneously. Sharding is an absolute last resort.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/21. Databases - Fundamentals/Specialized Databases/index.mdx': `---
title: Specialized Databases
description: Purpose-built database architectures engineered to solve highly specific, niche problems that traditional SQL or NoSQL engines cannot handle efficiently.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Specialized Databases">

When data reaches a certain scale or complexity, attempting to force it into a standard PostgreSQL or MongoDB cluster becomes mathematically inefficient. Engineers reach for **Specialized Databases** designed exclusively for one exact workload.

## 1. Graph Databases (Neo4j, Amazon Neptune)

If you need to query highly interconnected relationships (e.g., *"Find all friends of friends who bought a specific product and live in Paris"*), a Relational Database requires writing a query with 10 \`JOIN\` statements that will bring the CPU to its knees.

A **Graph Database** stores data specifically as Nodes (Entities) and Edges (Relationships). The physical relationship between data points is a first-class citizen. Querying massive, multi-level social networks or building recommendation engines takes milliseconds instead of minutes.

## 2. Time-Series Databases (InfluxDB, TimescaleDB)

Imagine an IoT system receiving 50,000 temperature readings per second from sensors worldwide. A standard database will quickly exhaust its write capacity and index limits.

A **Time-Series Database (TSDB)** is heavily optimized to store streams of data indexed strictly by a timestamp.
- They are engineered for massive, append-only write speeds.
- They natively support **Downsampling**: they automatically aggregate raw, per-second data into per-minute averages, deleting the raw data to save disk space after 24 hours.

## 3. Vector Databases (Pinecone, Milvus)

The backbone of modern AI and Large Language Models. 
Neural networks don't understand English; they convert sentences into 1,536-dimensional arrays of floating-point numbers (Vectors). 

A **Vector Database** does not query data by looking for exact string matches. It uses specialized algorithms (like HNSW) to plot these massive vectors in multi-dimensional space and rapidly calculate the spatial distance between them. This allows an application to instantly find the "most semantically similar" text to a user's query, even if they share zero keywords.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/ETL/index.mdx': `---
title: ETL (Extract, Transform, Load)
description: The fundamental data engineering pipeline pattern for moving raw data out of production systems, cleaning it, and dumping it into analytical warehouses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ETL (Extract, Transform, Load)">

You cannot run massive analytical queries (e.g., *"Give me the average lifetime value of all users grouped by region over the last 5 years"*) on your production PostgreSQL database. It would max out the CPU and cause the live website to crash for actual customers.

Instead, data engineers build pipelines to pull data out of production systems and move it to a dedicated data warehouse (like Snowflake or BigQuery). The traditional method for this is **ETL**.

## 1. Extract
The pipeline reaches into dozens of different data sources: pulling rows from the production SQL database, downloading JSON logs from AWS S3, and calling the Stripe API for billing data.

## 2. Transform (The Heavy Lifting)
Raw data is messy. During the Transform phase (usually handled by Python scripts or Apache Spark running on a separate server), the data is aggressively cleaned:
- Dates are converted to a single global timezone.
- PII (Personally Identifiable Information) like credit cards are masked or deleted.
- Data from the CRM and data from the SQL database are mathematically joined together into a massive, unified table.

## 3. Load
The perfectly formatted, deeply cleaned data is finally written (loaded) into the Data Warehouse, where Data Scientists can query it safely.

<Callout icon="info" title="ETL vs ELT">
  Historically, servers were weak, so transformation had to happen *before* data entered the warehouse. Today, massive cloud warehouses (like BigQuery) are so powerful that they can transform data instantly. This created **ELT (Extract, Load, Transform)**. You dump the messy raw data directly into the warehouse (Load), and then use raw SQL to clean and format it directly inside the warehouse itself (Transform), heavily utilizing tools like **dbt (data build tool)**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data warehouses/index.mdx': `---
title: Data Warehouses
description: Massive, highly structured, centralized repositories optimized strictly for complex analytical queries (OLAP) rather than transactional processing (OLTP).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Warehouses">

A production database (like MySQL) is designed for **OLTP (Online Transaction Processing)**. It excels at finding, updating, or inserting a single row of data in milliseconds. 
A **Data Warehouse** (like Snowflake, Amazon Redshift, or Google BigQuery) is designed for **OLAP (Online Analytical Processing)**. It excels at scanning billions of rows of historical data in seconds to generate business intelligence reports.

## 1. Columnar Storage (The Secret to Speed)

Traditional databases store data row-by-row on the hard drive. If you query \`SELECT SUM(price) FROM orders\`, a row-based database must physically load the entire row (customer name, address, date) off the hard drive into RAM just to look at the price, wasting 95% of the disk I/O.

Data Warehouses use **Columnar Storage**. They take all the \`price\` data for every single order and store it sequentially in one contiguous block on the hard drive. 
When you run the \`SUM\` query, the warehouse reads only the exact block containing the prices, skipping the names and addresses entirely. This makes analytical aggregations incredibly fast.

## 2. Separation of Storage and Compute

Modern cloud data warehouses revolutionized the industry by physically separating the hard drives from the CPUs.
- **Storage**: All your data lives in cheap object storage (like AWS S3).
- **Compute**: When you run a query, the warehouse instantly spins up a cluster of 50 temporary CPU nodes, pulls the data from S3, calculates the result in seconds, and then destroys the CPUs so you stop paying for them.

This allows companies to store petabytes of historical data for pennies, while only paying for massive supercomputer power during the exact seconds a query is running.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data lakes/index.mdx': `---
title: Data Lakes
description: A vast, low-cost repository that stores massive amounts of raw, unstructured data in its native format until it is needed for machine learning or analytics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Lakes">

A Data Warehouse is rigid. Before you can put data into a warehouse, you must define a strict schema (tables and columns) and clean the data. This is expensive and time-consuming. 

A **Data Lake** flips this paradigm. It operates on the philosophy of **"Store everything now, figure out the schema later (Schema-on-Read)."**

## 1. Unstructured Chaos

A Data Lake is fundamentally just a massive cloud object storage bucket (like Amazon S3 or Google Cloud Storage). You dump absolutely everything into it in its rawest, native format:
- Perfectly structured CSVs from the finance team.
- Semi-structured JSON log files from web servers.
- Completely unstructured PDFs, audio recordings of customer service calls, and raw images.

Because object storage costs pennies per gigabyte, companies can afford to keep decades of raw data "just in case."

## 2. The Machine Learning Goldmine

Data Warehouses are built for Business Analysts writing SQL. Data Lakes are built for Data Scientists writing Python.
A Data Scientist training a neural network needs raw, unfiltered data. If the data goes through an ETL pipeline into a warehouse, subtle outliers or "messy" data points are often cleaned or deleted—destroying the exact nuances the AI needs to learn from. The Data Lake preserves the raw reality of the data.

<Callout icon="warning" title="The Data Swamp">
  Because there is no schema enforcement, a Data Lake can quickly turn into a **Data Swamp**. If engineers dump thousands of files into S3 without strict naming conventions, metadata tagging, or governance, the data becomes completely unsearchable and useless. Finding a specific log file in a Data Swamp is impossible.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Batch processing/index.mdx': `---
title: Batch Processing
description: The traditional data engineering paradigm of processing massive volumes of data in scheduled, discrete chunks (batches) rather than in real-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Batch Processing">

Data Engineering is fundamentally about moving and crunching data. **Batch Processing** is the strategy of waiting for data to pile up over a period of time, and then processing all of it together in one massive, scheduled job.

If an e-commerce site processes 100,000 orders a day, a batch process might run at 2:00 AM every night. It wakes up, gathers all 100,000 orders from the past 24 hours, calculates the total revenue, updates the warehouse, and goes back to sleep.

## 1. Advantages of Batch

- **High Throughput / Efficiency**: Because you are processing massive chunks of data at once, you can heavily optimize the algorithms (using tools like Apache Spark or Hadoop). It is vastly more efficient to open a database connection once and insert 100,000 rows than to open 100,000 separate connections throughout the day.
- **Cost**: You can schedule batch jobs to run in the middle of the night when cloud compute resources (like AWS Spot Instances) are drastically cheaper.
- **Simplicity**: If a batch job fails halfway through, the recovery logic is simple: delete the partial results and just run the job again.

## 2. The Great Delay

The primary flaw of batch processing is latency. 
If the CEO asks to see the live sales dashboard at 3:00 PM, the dashboard is completely wrong. It only shows data up until 2:00 AM the previous night, because the next batch job hasn't run yet.

Batch processing is perfect for payroll, end-of-month reporting, and training machine learning models—tasks where immediate, real-time data is not required. For tasks that require instantaneous updates (like fraud detection on a credit card swipe), engineers must use **Stream Processing**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Stream processing/index.mdx': `---
title: Stream Processing
description: The continuous, real-time ingestion and analysis of data the exact millisecond it is generated, powering live dashboards and instant algorithmic decisions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stream Processing">

While Batch Processing waits until midnight to process data, **Stream Processing** acts immediately. It treats data not as a static file, but as an infinite, never-ending river of events.

If a user swipes a credit card, the event enters the stream. The processing engine analyzes the transaction for fraud and approves or denies it within 50 milliseconds.

## 1. Event Brokers (The Backbone)

To handle millions of instantaneous events without crashing the servers, engineers use highly specialized distributed message brokers, the absolute king of which is **Apache Kafka**.

When events occur (a user clicks a button, a sensor records a temperature), the raw data is instantly published to Kafka. Kafka acts as a massive shock absorber. Even if a billion events arrive in a single second, Kafka durably holds them in memory.
Stream Processing engines (like Apache Flink or Kafka Streams) subscribe to Kafka, instantly grabbing events as they arrive, running mathematical aggregations, and pushing the results to a live dashboard.

## 2. The Complexity of Time

Stream processing is notoriously difficult to engineer because of "Late Data."

Imagine you are calculating the "Total Sales per Minute."
A user buys a shirt at 12:01 PM on their phone, but they instantly drive into a tunnel and lose cell service. The phone finally sends the data to the server at 12:05 PM.
- Should the stream processor retroactively recalculate the 12:01 PM window?
- Stream processors handle this using **Watermarks** and **Windowing**, complex mechanisms that allow the engine to hold a time window open slightly longer to wait for delayed packets before finalizing the calculation.

<Callout icon="tip" title="The Lambda Architecture">
  Because Stream Processing is complex and prone to edge-case errors, companies historically used the **Lambda Architecture**. They run a Stream Processor to get "good enough" real-time estimates for live dashboards, but they *also* run a perfectly accurate Batch Job at midnight to overwrite and correct any mistakes the stream processor made during the day.
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
