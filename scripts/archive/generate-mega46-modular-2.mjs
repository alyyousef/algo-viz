import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/22. Data Engineering/Data pipelines/index.mdx': `---
title: Data Pipelines
description: The automated software systems responsible for extracting, transforming, and loading data from operational systems into analytical environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Pipelines">

A Data Pipeline is the automated software plumbing that moves data from Point A to Point B. Without pipelines, Data Analysts would have to manually export CSVs from the production database and email them to the BI team every morning.

## 1. The Stages of a Pipeline
A standard pipeline executes three mathematical phases (ETL or ELT):

1. **Ingestion (Extract)**: Pulling raw data from disparate sources. This could be a daily batch scrape of a PostgreSQL database, or a continuous real-time stream of JSON events from Apache Kafka.
2. **Processing (Transform)**: The raw data is mathematically dirty. The pipeline cleans null values, enforces data types, joins tables together, and aggregates metrics. This is executed using engines like Apache Spark or Snowflake SQL.
3. **Storage (Load)**: The pristine, transformed data is physically written to the target destination, such as a Data Warehouse (for BI dashboards) or a Data Lake (for Machine Learning).

## 2. Types of Pipelines
- **Batch Pipelines**: The vast majority of pipelines. They run on a chronological schedule (e.g., nightly) processing bounded datasets. They prioritize massive throughput over latency.
- **Streaming Pipelines**: Operate on unbounded data. They run continuously 24/7, mathematically processing events (like credit card fraud detection) with sub-millisecond latency using engines like Apache Flink.
- **Zero-ETL Pipelines**: A modern paradigm pioneered by cloud providers (like AWS). Instead of writing complex extraction scripts, the cloud provider mathematically syncs the operational database (Aurora) directly to the warehouse (Redshift) in real-time, completely bypassing the need for a traditional pipeline.

## 3. The Orchestration Layer
Because a Data Pipeline might consist of 50 different Python scripts and SQL queries that must execute in a strict mathematical order, they are managed by an Orchestrator (like **Apache Airflow** or **Dagster**). The orchestrator ensures that if the Extraction step fails, the Transformation step is mathematically halted to prevent data corruption.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data quality (Great Expectations)/index.mdx': `---
title: Data Quality (Great Expectations)
description: The practice of enforcing mathematical assertions and unit tests on data pipelines to prevent silent data corruption.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Quality">

In traditional Software Engineering, if code breaks, the server throws an explicit 500 Error. 
In Data Engineering, if a pipeline breaks (e.g., an upstream software engineer accidentally changes the API payload from dollars to cents), the pipeline will execute perfectly. It will silently output corrupted data, and the CEO will make catastrophic business decisions based on a false dashboard.

This is called **Silent Data Corruption**. Data Quality tools mathematically prevent this.

## 1. Great Expectations
**Great Expectations (GX)** is the absolute industry standard Python framework for Data Quality. It brings strict Software Engineering unit testing directly to data.

You define mathematical assertions (Expectations) about what your data *must* look like:
- TICK1expect_column_values_to_not_be_null('user_id')TICK1
- TICK1expect_column_values_to_be_between('age', min_value=0, max_value=120)TICK1
- TICK1expect_column_values_to_be_in_set('country', ['US', 'CA', 'UK'])TICK1

## 2. Pipeline Integration (The Circuit Breaker)
These assertions are not run passively; they are mathematically integrated directly into the Airflow DAG as a **Circuit Breaker**.

TICK3python
# Airflow execution graph
extract_data >> transform_data >> run_great_expectations >> load_to_dashboard
TICK3

If the TICK1transform_dataTICK1 step outputs a table where 5% of the ages are negative numbers, the TICK1run_great_expectationsTICK1 step mathematically detects the anomaly. It immediately fails the Airflow DAG, preventing the TICK1load_to_dashboardTICK1 step from executing. The corrupted data never reaches the business users.

## 3. Data Observability
While Great Expectations relies on hardcoded rules, modern Data Observability platforms (like Monte Carlo or Anomalo) use Machine Learning to automatically monitor tables. 
They mathematically calculate the historical variance of a table (e.g., "This table usually receives 10,000 rows a day"). If the table suddenly receives 2 rows on a Tuesday, the ML model mathematically flags an anomaly and alerts the Data Engineering team in Slack, even if no explicit rule was written.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data warehouses/index.mdx': `---
title: Data Warehouses
description: Centralized, highly-structured relational databases optimized for complex OLAP analytics and Business Intelligence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Warehouses">

A **Data Warehouse** is the architectural backbone of enterprise analytics. It is a massive relational database designed specifically for **OLAP** (Online Analytical Processing) rather than OLTP (Online Transaction Processing).

## 1. OLAP vs OLTP
- **OLTP (PostgreSQL, MySQL)**: Designed to process 10,000 tiny transactions per second (e.g., updating a single user's password). They use Row-Oriented storage.
- **OLAP (Snowflake, BigQuery)**: Designed to execute 5 massive, complex queries per hour (e.g., "Calculate the total revenue of all users across 10 years, grouped by country"). They use Column-Oriented storage to mathematically optimize these massive aggregations.

## 2. Core Architecture
- **Schema-on-Write**: Data Warehouses are rigidly structured. Before data can be inserted, it must be cleaned, transformed, and mapped to a strict relational schema.
- **Data Modeling**: To optimize query performance, data is historically modeled using strict mathematical paradigms like the **Star Schema** (Fact tables containing metrics, surrounded by Dimension tables containing attributes) or the **Data Vault** methodology.

## 3. The Cloud Revolution
Legacy Data Warehouses (like Teradata or Oracle) required companies to buy physical server racks. The hardware tightly coupled Storage and Compute, meaning scaling was incredibly expensive.

The industry was completely revolutionized by **Cloud Data Warehouses** (Snowflake, Google BigQuery, Amazon Redshift).
They mathematically decoupled Storage from Compute.
- You can store petabytes of data for pennies on cheap cloud storage.
- You only pay for the massive Compute clusters during the exactly 15 seconds it takes to execute your SQL query. 

This decoupling enabled the modern **ELT** paradigm, where the Warehouse itself has so much compute power that it is used to transform the raw data internally, replacing legacy external Spark clusters.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Databricks/index.mdx': `---
title: Databricks
description: The creator of Apache Spark and the pioneer of the Data Lakehouse architecture, providing a massive unified analytics platform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Databricks">

**Databricks** is one of the most dominant titans in modern Data Engineering, directly competing with Snowflake. It was founded by the original creators of **Apache Spark**.

## 1. Managed Apache Spark
Configuring, tuning, and maintaining an open-source Apache Spark cluster across 100 EC2 instances is a DevOps nightmare (dealing with Out-Of-Memory errors, JVM tuning, and network shuffles).

Databricks mathematically abstracted this away. It provides a fully managed, serverless Spark environment. You simply write a Python/SQL notebook in the browser, hit "Run", and Databricks dynamically spins up the cluster, mathematically optimizes the Spark execution graph using their proprietary **Photon Engine** (written in C++ for blistering speed), executes the job, and spins the cluster down.

## 2. The Pioneer of the Lakehouse
Historically, you had to maintain two systems: A Data Lake for Machine Learning, and a Data Warehouse (Snowflake) for BI analytics.

Databricks invented and heavily championed the **Data Lakehouse** architecture to mathematically merge the two. 
They created **Delta Lake**, an open-source Table Format that adds strict ACID transactions, Time Travel, and Schema Enforcement directly on top of raw Parquet files living in cheap AWS S3 / Azure Data Lake storage.

By doing this, Databricks eliminated the need for a Data Warehouse. You execute highly-governed, blazing-fast SQL queries directly against the Data Lake.

## 3. The Unified Platform
Databricks has aggressively expanded beyond just Spark, building a unified mathematical platform for the entire data lifecycle:
- **Databricks SQL**: A massive SQL execution engine designed specifically to compete with Snowflake for BI Dashboarding.
- **MLflow**: The industry standard open-source framework for tracking Machine Learning experiments, packaging models, and deploying them to production.
- **Unity Catalog**: A unified governance and metadata catalog that mathematically secures access to files, tables, and ML models across all clouds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Delta Lake/index.mdx': `---
title: Delta Lake
description: An open-source Table Format created by Databricks that brings ACID transactions and reliability to Data Lakes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Delta Lake">

Before Table Formats, Data Lakes were unreliable. If a Spark job crashed while writing 10,000 Parquet files to S3, your Data Lake was mathematically corrupted with partial data, destroying downstream analytics.

**Delta Lake**, created by Databricks, mathematically solves this by introducing a transactional metadata layer directly on top of the raw Parquet files. It competes directly with Apache Iceberg and Apache Hudi.

## 1. The Transaction Log (DeltaLog)
The mathematical core of Delta Lake is the TICK1_delta_logTICK1 directory, stored alongside the Parquet files.

Instead of a query engine blindly listing files in a directory, it first reads the Delta Log. The log mathematically records exactly which Parquet files were added and removed in every single transaction.
- **ACID Transactions**: If a Spark job crashes mid-write, the transaction is never committed to the Delta Log. The query engine simply ignores the partially written Parquet files.
- **Optimistic Concurrency Control**: If two Spark jobs try to update the exact same table simultaneously, Delta Lake mathematically resolves the conflict, ensuring data is never corrupted.

## 2. Advanced Features
Because the entire history of the table is recorded in the Delta Log, you unlock massive architectural capabilities:

- **Time Travel**: You can mathematically query the exact state of the table as it existed 5 days ago, or instantly rollback the table to recover from accidental deletions.
TICK3sql
SELECT count(*) FROM events TIMESTAMP AS OF '2026-01-01'
TICK3

- **Schema Evolution**: You can safely add new columns to a dataset without rewriting the petabytes of historical Parquet files. The Delta Log mathematically maps the schema changes.

- **Unified Batch & Streaming**: Because Delta Lake handles transactions perfectly, a Delta Table can mathematically act as a streaming source (like Kafka). A downstream pipeline can explicitly query "Give me only the new rows appended since I last checked", enabling blazing-fast incremental ETL pipelines.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/ELT/index.mdx': `---
title: ELT (Extract, Load, Transform)
description: The modern Data Engineering paradigm that leverages the immense compute power of Cloud Data Warehouses to transform data in-place.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ELT (Extract, Load, Transform)">

For decades, the standard architectural paradigm was ETL. With the advent of Cloud Data Warehouses (Snowflake, BigQuery), the industry experienced a massive mathematical paradigm shift to **ELT**.

## 1. The Paradigm Shift
In legacy systems, Data Warehouse storage and compute were incredibly expensive. You could not afford to store raw, dirty data. You had to use a massive external Apache Spark cluster to transform the data *before* loading it.

Cloud Data Warehouses mathematically decoupled compute and storage. Storage on S3 is practically free, and Cloud Compute can scale to thousands of cores in milliseconds.
Therefore, the architecture flipped:
1. **Extract**: Pull raw data from the operational database via tools like Fivetran or Airbyte.
2. **Load**: Dump the data *completely raw and unmodified* directly into the Cloud Data Warehouse.
3. **Transform**: Use the immense, dynamically-scaling SQL execution engine of the Warehouse *itself* to mathematically transform the raw data into clean analytical tables.

## 2. The Advantages of ELT
- **Simplicity**: You completely eliminate the need to maintain, tune, and debug complex, distributed Apache Spark clusters for daily batch transformations.
- **Democratization (SQL)**: In ETL, transformations were written in complex Scala or PySpark by specialized Data Engineers. In ELT, the data is already in the warehouse, so transformations are written in pure **SQL**. This allows Data Analysts to mathematically build pipelines themselves.
- **Raw Data Retention**: Because you load the raw data first, if a transformation logic was flawed (e.g., calculating revenue incorrectly), you mathematically possess the raw data to replay and fix the calculation instantly.

## 3. The Rise of dbt
ELT directly spawned the creation of **dbt (Data Build Tool)**. 
Because all transformations were now executing as SQL queries inside Snowflake, engineers needed a way to orchestrate thousands of SQL scripts. dbt mathematically models these SQL transformations as a Directed Acyclic Graph (DAG), bringing strict Software Engineering CI/CD practices to ELT pipelines.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/ETL/index.mdx': `---
title: ETL (Extract, Transform, Load)
description: The traditional data pipeline paradigm where data is processed in external compute clusters before being loaded into the warehouse.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ETL (Extract, Transform, Load)">

**ETL** was the absolute architectural standard for Data Engineering for over two decades. While much of the industry has shifted to ELT for structured data, ETL is still mathematically mandatory for complex Machine Learning and streaming workloads.

## 1. The Three Phases
1. **Extract**: Data is extracted from disparate source systems (PostgreSQL databases, external APIs, massive flat files).
2. **Transform**: The data is loaded into an external, heavy-duty processing engine (like **Apache Spark** or legacy Informatica). The engine mathematically cleanses the data, filters out PII, joins datasets together, and aggregates metrics.
3. **Load**: The pristine, highly-structured data is finally written into the target Data Warehouse (like Teradata or Redshift).

## 2. Why ETL was Historically Required
Before the Cloud, Data Warehouses were physically constrained. If you had a Teradata rack with a fixed CPU limit, and you executed a massive data transformation query, the CPU would peg at 100%, and the CEO's BI Dashboard would mathematically timeout and crash. 

To protect the Warehouse, transformations *had* to be executed outside the warehouse on a completely separate cluster.

## 3. Where ETL Still Dominates Today
While ELT is vastly superior for standard SQL analytics, ETL remains mathematically necessary in specific architectural scenarios:

- **Heavy Unstructured Data**: If you are extracting 10 Terabytes of raw PDF documents or Image files, a SQL Data Warehouse cannot process them. You mathematically *must* use a Spark cluster (ETL) to parse the PDFs using Python NLP libraries, extract the text, and only load the structured text into the warehouse.
- **Strict Compliance (PII)**: In healthcare or banking, dumping raw data containing Social Security Numbers into a centralized Data Warehouse is illegal. The data must be mathematically obfuscated (hashed or masked) in an external ETL layer *before* it ever touches the warehouse disk.
- **Real-Time Streaming**: Transforming an infinite stream of Kafka events using Apache Flink before saving it to a database is inherently an ETL paradigm.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Flink/index.mdx': `---
title: Apache Flink
description: The absolute state-of-the-art framework for stateful, exactly-once stream processing over unbounded data streams.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Flink">

While Apache Spark revolutionized Batch processing, it historically struggled with true real-time streaming (relying on "micro-batches" that caused seconds of latency).

**Apache Flink** was engineered from the ground up as a native, true Stream Processing engine. It processes unbounded data streams (like Kafka events) with sub-millisecond latency, and is the absolute standard for companies like Uber, Netflix, and Alibaba.

## 1. True Stream Processing
Unlike Spark Streaming, Flink does not wait to collect a "batch" of data. It processes every single event individually the exact millisecond it arrives.

The mathematical challenge of stream processing is **State**. If you are calculating the "Rolling 1-Hour Revenue", the Flink application must hold the current revenue mathematically in memory.
- **State Checkpointing**: Flink uses a mathematical algorithm called Chandy-Lamport to take distributed, asynchronous snapshots of this memory state and save it to persistent storage (like S3) without pausing the stream. 
- **Exactly-Once Semantics**: If a Flink server crashes and loses its RAM, a new server spins up, loads the state from the checkpoint, rewinds the Kafka offset, and mathematically guarantees that no financial transaction is ever double-counted or lost.

## 2. Event Time & Watermarks
Stream processing suffers from the "Out-of-Order" problem. An event triggered on a mobile phone might arrive at the server 10 minutes late due to a bad network connection.

Flink mathematically solves this by distinguishing between **Processing Time** (when the server saw it) and **Event Time** (when the event actually happened).

Flink utilizes **Watermarks**—a mathematical heuristic that tells the system: *"I am confident that all events older than 10:05 have now arrived."* Flink will buffer the 10:00-10:05 window in RAM, wait for the watermark to pass, and only then mathematically close the window and emit the perfectly accurate calculation.

## 3. SQL on Streams
Flink supports executing standard SQL directly on infinite streams. You can write a TICK1SELECTTICK1 statement that continuously runs forever, dynamically updating a live dashboard the millisecond a new Kafka event arrives.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/HDFS/index.mdx': `---
title: HDFS (Hadoop Distributed File System)
description: The pioneering distributed file system that spawned the Big Data era, designed to store massive datasets across thousands of commodity servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HDFS (Hadoop Distributed File System)">

Before Cloud Object Storage (like AWS S3) existed, storing a 5-Petabyte dataset was a mathematical impossibility for a standard enterprise. The largest single hard drive could only hold a few Terabytes. 

**HDFS (Hadoop Distributed File System)**, heavily inspired by the Google File System (GFS) paper, revolutionized the industry by allowing software to mathematically treat 1,000 separate commodity hard drives as one single, colossal file system.

## 1. Master-Worker Architecture
HDFS abstracts the complexity of distributed storage through two distinct node types:

### The NameNode (The Master)
The NameNode does not store any actual data. It stores the mathematical **Metadata**. It acts as the directory tree, tracking exactly which physical servers hold which pieces of a file. If the NameNode crashes, the entire cluster mathematically dies (this Single Point of Failure was later fixed with High Availability architectures).

### The DataNodes (The Workers)
The physical commodity servers (often thousands of them). When you upload a massive 1 Terabyte file to HDFS, it does not fit on one server. HDFS mathematically slices the file into **128 MB Blocks**, and scatters those blocks across the DataNodes.

## 2. Mathematical Fault Tolerance (Replication)
Because HDFS runs on cheap commodity hardware, hard drives mathematically fail every single day.
HDFS solves this through strict **Replication**.
By default, every single 128 MB block is replicated exactly **3 times** on three different physical servers (often ensuring they are on different physical power racks). 

If a hard drive catches fire, the NameNode instantly detects the heartbeat failure, mathematically identifies the missing blocks, and dynamically instructs the remaining servers to re-copy the surviving replicas to maintain the 3x guarantee. The system heals itself without human intervention.

## 3. The Move to Cloud Object Storage
While HDFS created the Big Data industry, managing thousands of physical hard drives is an operational nightmare. 

Today, HDFS is largely being replaced by Cloud Object Storage (AWS S3, Google Cloud Storage). S3 provides the same infinite scale and replication guarantees as HDFS, but is entirely serverless, allowing companies to physically shut down their HDFS racks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Hadoop/index.mdx': `---
title: Apache Hadoop
description: The foundational Big Data framework that pioneered distributed storage (HDFS) and distributed processing (MapReduce).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Hadoop">

In 2004, Google published a whitepaper detailing how they stored and indexed the entire internet. Doug Cutting and Mike Cafarella used this paper to create **Apache Hadoop**, birthing the entire modern Big Data industry.

## 1. The Core Components
Hadoop is not a database; it is a mathematical framework consisting of three core pillars:

1. **HDFS (Hadoop Distributed File System)**: The storage layer. It mathematically slices massive files into 128MB blocks and replicates them across thousands of cheap commodity hard drives for infinite scale and fault tolerance.
2. **YARN (Yet Another Resource Negotiator)**: The cluster operating system. When 50 different data scientists submit massive jobs simultaneously, YARN mathematically schedules the CPU and RAM allocation across the thousands of servers to prevent the cluster from crashing.
3. **MapReduce**: The execution engine.

## 2. The MapReduce Paradigm
Moving 10 Terabytes of data across a network to a central CPU for processing is mathematically impossible due to network bandwidth limitations.
MapReduce solves this by **moving the compute to the data**. 

- **Map Phase**: A tiny 10KB Java program is sent to every single server that holds a slice of the data. The servers execute the logic locally on their own hard drives in parallel.
- **Shuffle Phase**: The servers mathematically route their intermediate results across the network (e.g., all data for "User A" goes to Server 1, "User B" goes to Server 2).
- **Reduce Phase**: The final aggregation is calculated and written back to disk.

## 3. The Decline of Hadoop
While Hadoop was revolutionary, it had a fatal architectural flaw: **Disk I/O**.
MapReduce mathematically forced data to be written to the physical spinning hard drive between every single processing step. For complex algorithms (like Machine Learning), this extreme disk latency made jobs take hours or days.

Because of this, MapReduce was almost entirely replaced by **Apache Spark**, which performs the exact same distributed execution, but keeps the execution graph mathematically in **RAM**, making it 100x faster. 

Today, raw Hadoop is considered legacy architecture, having been largely superseded by Spark, Databricks, and Cloud Data Warehouses (Snowflake).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Hive/index.mdx': `---
title: Apache Hive
description: The framework that brought SQL to the Hadoop ecosystem, translating human-readable queries into complex MapReduce jobs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Hive">

When Apache Hadoop was first created, extracting data required Data Engineers to write incredibly complex, mathematically verbose Java MapReduce jobs. A simple aggregation that took 1 line in a relational database required 200 lines of complex Java code. This completely locked Data Analysts out of the Big Data ecosystem.

Facebook created **Apache Hive** to solve this.

## 1. SQL on Hadoop
Hive acts as a mathematical compiler. It allows users to write standard, human-readable SQL (called HiveQL). 

When you submit a query like TICK1SELECT country, COUNT(*) FROM users GROUP BY countryTICK1, Hive mathematically parses the SQL, generates a Directed Acyclic Graph (DAG) of the operations, and compiles it into the massive Java MapReduce jobs required to execute it across the distributed Hadoop cluster.

This single invention democratized Big Data, allowing anyone who knew SQL to query petabytes of data on HDFS.

## 2. The Hive Metastore
While Hive's execution engine (MapReduce) is now largely obsolete, its architectural legacy—the **Hive Metastore**—remains the absolute bedrock of modern Data Engineering.

HDFS is just a file system; it knows about raw Parquet files, but it does not know what a "Table" is.
The Hive Metastore is a central relational database (usually MySQL/PostgreSQL) that mathematically maps structural Metadata to physical files. 
It knows that the table TICK1prod.usersTICK1 physically maps to the HDFS directory TICK1/user/hive/warehouse/users/TICK1, and that it has 3 columns: ID (int), Name (string), and Age (int).

Today, even if a company uses Apache Spark, Presto, or Databricks (completely abandoning MapReduce), they still universally use the Hive Metastore API to mathematically locate their Data Lake tables.

## 3. Performance Limitations
Because Hive natively compiles to MapReduce, it suffers from the same catastrophic Disk I/O bottlenecks. A simple query can take minutes to execute because it must spin up JVMs across the cluster.

To solve this, modern engines like **Presto / Trino** and **Apache Impala** were created. They use the Hive Metastore to find the files, but execute the SQL using massive in-memory MPP (Massively Parallel Processing) engines, reducing query times from minutes to milliseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Kafka/index.mdx': `---
title: Apache Kafka
description: The industry standard distributed event streaming platform, utilizing an immutable append-only commit log architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Kafka">

Created at LinkedIn, **Apache Kafka** is the central nervous system of modern software architecture. It mathematically decoupled complex microservices by introducing a highly scalable, fault-tolerant distributed streaming platform.

## 1. The Core Fallacy of Message Queues
Traditional message queues (like RabbitMQ) are designed to delete messages. Once a microservice reads a message (e.g., "User Registered"), RabbitMQ deletes it. If 5 different microservices (Analytics, Email, Fraud) need to read that exact same message, you mathematically have to publish the message 5 separate times, destroying network bandwidth and scaling limits.

## 2. The Kafka Architecture: The Append-Only Log
Kafka is not a queue; it is a **Distributed Commit Log**.
When a Producer sends an event to a Kafka **Topic**, Kafka writes it to a physical file on disk by appending it to the absolute end.

Kafka mathematically **retains** the data for a configured period (e.g., 7 days). 
Because the data is retained on disk, an infinite number of independent Consumer microservices can read the exact same data at their own pace.

### Consumer Offsets
Kafka mathematically tracks the position of each consumer using an **Offset** (an integer index). 
- Consumer A (Fraud Detection) might be reading message #10,000 in real-time.
- Consumer B (Analytics Batch Job) might have crashed yesterday, and is currently reading message #8,000, mathematically catching up to the present.

## 3. Massive Horizontal Scale (Partitions)
If an Uber topic receives 1 million GPS coordinates a second, a single server will melt.
Kafka achieves infinite scale by splitting a Topic into **Partitions**.

- If a Topic has 10 partitions, the data is mathematically sharded across 10 different physical brokers.
- You can launch a **Consumer Group** of 10 microservice instances. Kafka will mathematically assign exactly one partition to each instance, allowing you to process the 1 million messages in parallel. 
- **Ordering Guarantee**: Kafka mathematically guarantees strict ordering *only* within a single partition. If you need all events for "User 123" to be processed in order, the Producer uses the User ID as the hashing key, ensuring all their events route to the exact same partition.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Kafka Connect/index.mdx': `---
title: Kafka Connect
description: The mathematical framework for streaming data reliably between Apache Kafka and massive external systems (Databases, S3, ElasticSearch).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kafka Connect">

If a Data Engineer needs to stream every single UPDATE from a PostgreSQL database into Apache Kafka, and then stream those Kafka events into an Elasticsearch cluster, writing custom Python consumers/producers is a terrible idea. Custom scripts fail at handling network partitions, retries, and offset management.

**Kafka Connect** is the official framework included with Apache Kafka to mathematically automate the continuous, reliable streaming of data between Kafka and external systems.

## 1. The Architecture
Kafka Connect operates entirely outside of your application code. It is a standalone, distributed cluster of worker nodes that physically execute **Connectors**.

- **Source Connectors**: Mathematically pull data *from* an external system (e.g., PostgreSQL, MongoDB, Twitter API) and push it into a Kafka Topic.
- **Sink Connectors**: Mathematically pull data *from* a Kafka Topic and push it into an external system (e.g., AWS S3, Snowflake, Elasticsearch).

## 2. Change Data Capture (CDC) with Debezium
The most powerful and prevalent use of Kafka Connect is CDC.
If you simply write a Source Connector that queries TICK1SELECT * FROM users WHERE updated_at > NOW()TICK1 every 5 seconds, you will mathematically crush the database CPU, and you will miss any rows that were updated and then deleted within those 5 seconds.

**Debezium** is an industry-standard suite of Kafka Connectors that solves this mathematically. 
Instead of running SQL queries, Debezium hooks directly into the database's internal **Transaction Log** (the WAL in Postgres, or the Binlog in MySQL). 
Every time a row changes on disk, Debezium instantly streams an event to Kafka. It mathematically guarantees that absolutely zero database changes are ever missed, and it puts almost zero load on the database CPU.

## 3. Distributed Fault Tolerance
Because Kafka Connect runs as a distributed cluster, it mathematically inherits Kafka's resilience. 
If a Kafka Connect Worker node crashes while streaming 100,000 events to Snowflake, the cluster instantly detects the failure. It mathematically reassigns the Sink Connector to a surviving Worker node, retrieves the exact Kafka Offset where it left off, and resumes streaming without dropping or duplicating a single row.

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
