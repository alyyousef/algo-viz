import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/22. Data Engineering/Kafka Streams/index.mdx': `---
title: Kafka Streams
description: A lightweight Java/Scala client library for building real-time stream processing applications directly on top of Apache Kafka.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kafka Streams">

While tools like Apache Flink or Apache Spark Streaming are incredibly powerful, they require you to stand up, manage, and monitor an entirely separate massive cluster of physical servers. 

If you already have a Kafka cluster, and you simply want to execute a real-time mathematical aggregation (e.g., "Count the number of fraudulent clicks per IP address every 5 minutes"), deploying a massive Flink cluster is architectural overkill. 

**Kafka Streams** was created to solve this mathematically.

## 1. The Architectural Paradigm
Kafka Streams is **not** a cluster. It is not an execution engine.
It is literally just a standard Java/Scala library (a JAR file). 

You write your stream processing logic in a standard Spring Boot or Java application, and you deploy it to Kubernetes just like any other standard microservice. 
The magic is that the Kafka Streams library mathematically hooks into Kafka's native Consumer Group protocol. 

If you deploy 10 instances of your Java app to Kubernetes, Kafka Streams will mathematically distribute the processing of the Kafka partitions across those 10 instances. If one pod crashes, the library automatically rebalances the partitions to the remaining 9 pods.

## 2. KStreams vs KTables
Kafka Streams mathematically bifurcates the world into two concepts:

- **KStream (The River)**: An unbounded sequence of independent events. (e.g., A stream of every single move a chess player makes).
- **KTable (The Snapshot)**: A mathematical materialization of the stream. It represents the *current* state of the world based on the primary key. (e.g., The current position of the chess pieces on the board).

Kafka Streams allows you to mathematically join a KStream with a KTable in real-time, executing massive distributed SQL-like joins without ever touching a database.

## 3. RocksDB State Store
When calculating an aggregation (like a 5-minute rolling average), the Java microservice must mathematically hold the intermediate state. If you hold it in RAM and the Kubernetes pod restarts, you lose the calculation.

Kafka Streams mathematically solves this by embedding **RocksDB** directly into the Java application. 
RocksDB is an ultra-fast, local Key-Value store. Kafka Streams saves the calculation state to the local disk via RocksDB, and simultaneously backs up that state to a hidden internal Kafka Topic. If the pod crashes and spins up on a new server, it instantly restores its RocksDB state from the internal Kafka topic and resumes processing perfectly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Lakehouses/index.mdx': `---
title: The Data Lakehouse
description: The architectural synthesis of Data Lakes and Data Warehouses, providing massive unstructured scaling with strict SQL ACID guarantees.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Data Lakehouse">

For a decade, organizations were mathematically forced to maintain two entirely separate architectures. They dumped raw data into a **Data Lake** (AWS S3) to train Machine Learning models, and they ran complex ETL pipelines to copy a structured subset of that data into a **Data Warehouse** (Snowflake) for Business Intelligence.

This dual-architecture was a mathematical nightmare, causing massive data duplication, pipeline fragility, and insane AWS bills. The **Data Lakehouse**, pioneered by Databricks, mathematically merged the two.

## 1. The Core Architecture
A Lakehouse achieves its magic by utilizing open-source **Table Formats** (Apache Iceberg, Delta Lake, or Apache Hudi) sitting directly on top of raw Parquet files in the Data Lake.

### Schema on Write AND Read
In a Lakehouse, you can dump raw images (Schema-on-Read) directly next to highly structured financial tables (Schema-on-Write). The Table Format metadata layer mathematically enforces column types, preventing a rogue script from inserting a string into an integer column.

### ACID Transactions
Because the Table Format utilizes optimistic concurrency control and transactional logs, you can execute standard SQL TICK1UPDATETICK1 and TICK1DELETETICK1 statements directly against the raw S3 files, with absolute mathematical certainty that the files will not be corrupted if the job crashes midway.

## 2. Unifying the Ecosystem
The Lakehouse architecture mathematically eliminates the need for a separate Data Warehouse.

- **Data Scientists** can connect PySpark directly to the Lakehouse, reading raw unstructured data for Deep Learning.
- **Data Analysts** can connect Tableau directly to the *exact same Lakehouse*, executing blistering-fast SQL queries against the structured Tables via engines like Databricks SQL or Trino.

Because both teams operate on the exact same physical Parquet files in S3, there is zero data duplication, and the concept of "stale data" is mathematically eradicated.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Luigi/index.mdx': `---
title: Luigi
description: A Python package built by Spotify for orchestrating complex batch jobs, focusing heavily on explicit file dependency resolution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Luigi">

Before Apache Airflow became the absolute dominant industry standard, Spotify engineered **Luigi** to mathematically orchestrate their massive Hadoop data pipelines.

## 1. The Target-Based Architecture
Unlike Airflow, which is fundamentally a **Task-based** orchestrator (Task A triggers Task B), Luigi is a **Target-based** orchestrator.

In Luigi, you do not write a DAG that says "Run script 1, then run script 2". 
Instead, you mathematically define the end-goal: *"I want the file TICK1final_report.parquetTICK1 to exist."*

Luigi's engine mathematically calculates the dependency chain backwards:
1. Does TICK1final_report.parquetTICK1 exist? No.
2. The code says TICK1final_report.parquetTICK1 requires TICK1cleaned_data.parquetTICK1. Does that exist? No.
3. The code says TICK1cleaned_data.parquetTICK1 requires TICK1raw_data.csvTICK1. Does that exist? Yes.
4. Luigi executes the code to create TICK1cleaned_data.parquetTICK1, then executes the code to create TICK1final_report.parquetTICK1.

TICK3python
import luigi

class CleanDataTask(luigi.Task):
    def requires(self):
        return RawDataTask()
        
    def output(self):
        return luigi.LocalTarget("cleaned_data.parquet")
        
    def run(self):
        # Read the raw data and create the cleaned data
        pass
TICK3

## 2. Why Luigi was Surpassed
Luigi was revolutionary for its time, but it had mathematical limitations that caused Airflow to overtake it:

- **No Built-in Scheduler**: Luigi does not know *when* to run. You have to trigger Luigi jobs using a rigid linux cron job. Airflow has a mathematically robust, native scheduler daemon.
- **Distributed Execution**: Luigi originally struggled to distribute tasks across thousands of workers dynamically, whereas Airflow's CeleryExecutor made horizontal scaling trivial.
- **Visualizing the DAG**: Airflow's UI for visualizing the Directed Acyclic Graph before execution was significantly superior to Luigi's tracking.

Today, Luigi is largely considered legacy, superseded by Airflow, Dagster, and Prefect.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/ORC/index.mdx': `---
title: Apache ORC
description: The Optimized Row Columnar format, deeply integrated into the Hadoop ecosystem to provide massive mathematical compression and fast reads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache ORC (Optimized Row Columnar)">

**Apache ORC** is a highly efficient, mathematically compressed columnar storage format. It is the direct rival to Apache Parquet, engineered primarily by Hortonworks to provide blistering fast execution specifically for **Apache Hive**.

## 1. Columnar Compression
Like Parquet, ORC is column-oriented. If you query TICK1SELECT age FROM usersTICK1, the disk mathematically skips all names, addresses, and emails, reading only the continuous block of integers representing the ages.

ORC applies aggressive mathematical compression:
- **Run-Length Encoding (RLE)**: If a column has 10,000 rows of the string "Active", ORC does not write the string 10,000 times. It mathematically writes TICK1("Active", 10000)TICK1, shrinking megabytes of data into a few bytes.
- **Dictionary Encoding**: It scans a column, assigns an integer to every unique string, and stores the massive array as tiny integers, drastically reducing file size.

## 2. ORC vs Parquet
ORC and Parquet are architecturally very similar, but they won different ecosystem wars.

- **Ecosystem Integration**: ORC is mathematically optimized for **Apache Hive** and **Presto/Trino**. Parquet is mathematically optimized for **Apache Spark**.
- **Data Types**: Parquet relies heavily on a flattened, heavily nested schema model (using repetition and definition levels). ORC handles complex nested data (Arrays, Maps, Structs) slightly differently, often resulting in marginally better compression ratios for highly nested JSON-like data, though Parquet is generally faster for flat analytics.
- **ACID Support**: ORC was the foundational file format required to enable the original ACID transaction support within Apache Hive.

Because Apache Spark overwhelmingly won the execution engine war against Hive, **Parquet** became the de facto industry standard, but ORC remains heavily utilized in massive enterprise Hadoop clusters.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Parquet/index.mdx': `---
title: Apache Parquet
description: The undisputed industry standard columnar storage format, mathematically engineered to drastically reduce disk I/O for analytical queries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Parquet">

If you store 10 Terabytes of data in CSV format, querying it is mathematically agonizing. CSV files are uncompressed, unstructured strings. To find the average age of a user, the CPU must scan every single comma in the 10TB file.

**Apache Parquet** was created by Twitter and Cloudera to mathematically eradicate this bottleneck. It is the absolute foundation of the modern Data Engineering stack.

## 1. Columnar Architecture
Parquet is a **Column-Oriented** binary format.
In a row-oriented format (CSV, JSON, Avro), data is stored physically sequentially on disk: TICK1Name1, Age1, Name2, Age2TICK1.
In Parquet, data is stored mathematically by column: TICK1Name1, Name2 ... Age1, Age2TICK1.

If a Data Analyst executes TICK1SELECT SUM(revenue) FROM salesTICK1, the query engine (Spark, Snowflake) uses the Parquet header metadata to locate the exact physical byte offset of the TICK1revenueTICK1 column on the hard drive. It reads *only* that specific block of bytes, mathematically ignoring the 99% of the file containing irrelevant columns. This reduces Disk I/O from terabytes to megabytes.

## 2. Mathematical Compression
Because a Parquet column contains homogenous data (e.g., an array containing 5 million integers), it is mathematically perfect for compression algorithms.

- **Dictionary Encoding**: It detects that the TICK1countryTICK1 column only contains 195 unique strings. It creates a dictionary TICK1{"USA": 1, "UK": 2}TICK1, and writes the 5 million rows as tiny 8-bit integers, shrinking the file size by 90%.
- **Snappy Compression**: On top of the logical encodings, the entire binary block is physically compressed using algorithms like Snappy or Zstandard, providing massive space savings while ensuring the CPU can decompress it in milliseconds.

## 3. Predicate Pushdown (Min/Max Stats)
Parquet files mathematically store statistics in their footers. For every "Row Group" (chunk of data), the footer stores the Minimum and Maximum value of every column.

If you execute TICK1SELECT * FROM users WHERE age > 60TICK1, the engine reads the Parquet footer. If the TICK1ageTICK1 column for that chunk has a Max value of 45, the engine mathematically **drops the entire block**, refusing to read it from disk. This is called Predicate Pushdown, and it is the secret to Parquet's blistering speed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Prefect/index.mdx': `---
title: Prefect
description: A modern Python orchestrator focused on dynamic, data-aware execution, offering a mathematically robust alternative to Airflow.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Prefect">

While Apache Airflow is the legacy standard for orchestration, it was designed in an era where pipelines were static. Airflow requires you to mathematically define the exact DAG structure *before* the pipeline runs. If you need to dynamically spin up 50 tasks based on an API response, Airflow struggles.

**Prefect** was engineered specifically to solve this, adopting a philosophy of "Negative Engineering"—handling all the infrastructure failures so you can focus on Python code.

## 1. Dynamic DAGs and Pythonic Syntax
Prefect abandons Airflow's rigid mathematical DAG declaration. In Prefect, your DAG is literally just standard Python code using decorators.

TICK3python
from prefect import flow, task

@task(retries=3)
def fetch_data(api_endpoint):
    return requests.get(api_endpoint).json()

@task
def process_data(data):
    return [d * 2 for d in data]

# The @flow decorator mathematically constructs the DAG at runtime
@flow
def my_dynamic_pipeline(endpoints):
    results = []
    # Dynamic iteration: Airflow cannot easily do this natively
    for endpoint in endpoints: 
        raw = fetch_data(endpoint)
        clean = process_data(raw)
        results.append(clean)
    return results

if __name__ == "__main__":
    my_dynamic_pipeline(["api/v1/users", "api/v1/sales"])
TICK3

Because execution is dynamic, Prefect mathematically constructs the graph on the fly, allowing for incredibly complex, conditional looping architectures that are impossible in rigid Airflow DAGs.

## 2. Hybrid Execution Model
One of Prefect's most significant architectural innovations is its hybrid execution model.
In Airflow, the central server must have access to all your secrets, API keys, and private networks to execute the code.

In Prefect, the central UI (Prefect Cloud) only handles the **Metadata** (scheduling, state tracking). The actual physical execution happens on **your** infrastructure (e.g., your private AWS Kubernetes cluster) via a Prefect Agent. The Agent polls the cloud for work, executes the Python code locally using your secure VPC secrets, and only sends the mathematical *Status* (Success/Fail) back to the UI. Your proprietary data never touches Prefect's servers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Redshift/index.mdx': `---
title: Amazon Redshift
description: AWS's massively parallel processing (MPP) Data Warehouse, the historical pioneer of the cloud analytics revolution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Amazon Redshift">

Before Snowflake and BigQuery dominated the market, **Amazon Redshift** mathematically pioneered the Cloud Data Warehouse revolution. It proved that companies could rent petabyte-scale analytical databases by the hour instead of spending $10 million on physical Teradata server racks.

## 1. MPP Architecture (Massively Parallel Processing)
Redshift is a heavily modified fork of PostgreSQL 8.0, mathematically engineered to operate across a distributed cluster of servers.

- **Leader Node**: The brain of the cluster. It parses the SQL query, builds the execution graph, and mathematically distributes the execution plan to the Compute nodes.
- **Compute Nodes**: The physical servers. If you execute a query on a 10-node Redshift cluster, all 10 nodes scan their local storage disks in parallel, mathematically aggregating the results before returning them to the Leader node.

## 2. The Storage Bottleneck
Historically, Redshift physically coupled Compute and Storage. If you needed to store 100 Terabytes of data, you had to buy 20 Compute nodes, even if you only ran 1 query a day. This was mathematically expensive.

When Snowflake launched, it decimated Redshift by decoupling Storage (S3) from Compute (EC2), allowing infinite scaling. 
In response, AWS engineered **Redshift RA3 Nodes (Managed Storage)**. Today, modern Redshift mathematically decouples the architecture. Data is stored cheaply on S3, and the RA3 compute nodes use massive NVMe SSDs to dynamically cache the hottest data locally, competing directly with Snowflake's architecture.

## 3. Redshift Spectrum
Before Redshift decoupled its storage, AWS created **Redshift Spectrum**.
Spectrum allows you to mathematically query raw Parquet/ORC files sitting in an S3 Data Lake directly from the Redshift SQL console. 

It dynamically spins up thousands of invisible, serverless compute nodes in the background to execute the S3 scan, and mathematically joins that raw Data Lake data with your highly-structured Redshift tables in a single SQL query. This was Amazon's first major step toward the Lakehouse architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Schema registries/index.mdx': `---
title: Schema Registries
description: The mathematical governance layer for streaming architectures, ensuring strict data contracts between decoupled producers and consumers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Schema Registries">

In a massively decoupled microservice architecture using Apache Kafka, a Producer (e.g., the Billing Service) emits JSON events, and 50 different Consumers read them. 
If a junior engineer at the Billing Service decides to rename the JSON key from TICK1customer_idTICK1 to TICK1client_idTICK1, the 50 downstream microservices will instantly crash, causing a catastrophic company-wide outage.

The **Schema Registry** mathematically prevents this by enforcing strict Data Contracts.

## 1. The Mathematical Enforcement
A Schema Registry (like the Confluent Schema Registry) is a standalone web server that stores versions of schemas (typically written in **Apache Avro**, Protobuf, or JSON Schema).

1. **The Contract**: The Billing Service mathematically registers a schema defining exactly what fields must exist (e.g., TICK1customer_idTICK1 must be an integer). 
2. **The Serialization**: When the Billing Service tries to send a message to Kafka, its Kafka Client automatically contacts the Registry. The Registry mathematically verifies that the payload perfectly matches the schema.
3. **The Rejection**: If the payload contains TICK1client_idTICK1 instead, the Schema Registry mathematically rejects the payload, throwing an exception *before* the corrupted data is ever written to Kafka.

## 2. Schema Evolution
Software evolves, so schemas must change. The Schema Registry mathematically governs **Schema Evolution** through strict compatibility rules.

- **Backward Compatibility**: If you add a new column (e.g., TICK1emailTICK1), you must provide a default value. This mathematically guarantees that old consumers (who don't know about the email field) can still read the new messages without crashing.
- **Forward Compatibility**: You mathematically delete a column. Old consumers can still read the new messages because the underlying Avro/Protobuf serialization format is designed to safely ignore missing bytes.

If a developer attempts to make a breaking change (e.g., changing TICK1ageTICK1 from an Integer to a String), the Schema Registry mathematically blocks the deployment, forcing the organization to negotiate a safe migration path. It is the ultimate guardian of streaming data integrity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Snowflake/index.mdx': `---
title: Snowflake
description: The revolutionary cloud-native Data Warehouse that mathematically decoupled Storage from Compute, reshaping the entire data industry.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Snowflake">

**Snowflake** is arguably the most successful and disruptive Data Engineering technology of the 2010s. It completely destroyed the legacy on-premise Data Warehouse market (Teradata, Oracle) by engineering a mathematically flawless, cloud-native architecture from the ground up.

## 1. The Decoupled Architecture
In legacy systems, a server physically contained the hard drive (Storage) and the CPU (Compute). If you ran out of storage, you were mathematically forced to buy another server (which included CPUs you didn't need).

Snowflake mathematically decoupled this into three distinct layers:
1. **Centralized Storage**: All data is stored in cheap, infinite Cloud Object Storage (AWS S3, Azure Blob). Snowflake manages the physical files using a proprietary, highly-compressed micro-partition format.
2. **Multi-Cluster Compute (Virtual Warehouses)**: You spin up temporary, stateless clusters of CPUs (e.g., a "Large" warehouse). These CPUs pull the data from S3, execute the SQL query, and shut down.
3. **Cloud Services Layer**: The mathematical brain. It manages authentication, metadata, query parsing, and the global transaction state.

## 2. Instant Elasticity & Concurrency
Because Compute is stateless and decoupled, Snowflake solves the historical "Concurrency Bottleneck".

If the CEO is running a massive end-of-year financial report on the database, a Data Analyst trying to query the same database would historically face a 10-minute timeout because the CPUs were pegged at 100%.
In Snowflake, you simply spin up **two separate Virtual Warehouses**. The CEO's query runs on Warehouse A. The Analyst's query runs on Warehouse B. They both read the exact same physical data from S3, but they have zero mathematical compute contention. You can spin up 100 warehouses instantly.

## 3. Micro-Partitions and Zero-Copy Clones
- **Micro-Partitions**: Snowflake does not use traditional indexes. It mathematically chunks data into millions of tiny, immutable micro-partitions (50MB - 500MB). It tracks the Min/Max values for every column in the Cloud Services layer, allowing it to instantly skip 99% of the disk during a query.
- **Zero-Copy Cloning**: If a Data Engineer wants to test a destructive SQL script on the 10-Terabyte Production table, they can execute TICK1CREATE TABLE dev CLONE prodTICK1. Because files are immutable, Snowflake does not copy the 10TB of data. It mathematically copies only the metadata pointers (taking 1 second and costing $0), allowing the engineer to safely test on production data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Storm/index.mdx': `---
title: Apache Storm
description: The original pioneer of real-time stream processing, utilizing a topology-based execution architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Storm">

Before Apache Flink and Kafka Streams dominated the market, **Apache Storm** (open-sourced by Twitter in 2011) was the undisputed king of real-time stream processing. It was one of the first frameworks to mathematically prove that unbounded data streams could be processed at scale with sub-millisecond latency.

## 1. The Topology Architecture
In Hadoop Batch processing, jobs execute as a DAG and eventually finish. In Storm, you mathematically define a **Topology**, which is a graph of computation that runs infinitely until it is explicitly killed by an administrator.

The Topology consists of two core components:
- **Spouts (The Source)**: The mathematical entry point. A Spout connects to a message broker (like Apache Kafka or a Twitter API stream) and emits continuous tuples (records) into the topology.
- **Bolts (The Processors)**: The computational units. A Bolt receives tuples, executes mathematical logic (filtering, aggregating, connecting to a database), and emits new tuples to downstream Bolts.

## 2. Execution Guarantees
Storm pioneered the mathematical concept of tracking tuple execution to guarantee data processing.

- **At-Least-Once Guarantee**: When a Spout emits a tuple, Storm mathematically tracks its entire journey through the complex web of Bolts. If any Bolt crashes or fails to acknowledge the tuple, Storm explicitly tells the Spout to replay the exact tuple. This mathematically guarantees no data is lost, but it can result in double-counting if a downstream database isn't idempotent.
- **Trident**: Because At-Least-Once caused financial issues (double charging), Storm later introduced the **Trident** API, which mathematically bolted micro-batching onto Storm to provide Exactly-Once semantics (similar to Spark Streaming).

## 3. Why Storm Declined
While revolutionary, Storm possessed fatal architectural limitations:
1. **Lack of State Management**: Storm had no native mathematical way to handle "State". If you wanted to calculate a 1-hour rolling average, you had to manually store that state in an external Redis database, causing massive network I/O bottlenecks. Flink solved this by embedding the state directly into the local server's memory/disk.
2. **No Event Time Watermarks**: Storm struggled mathematically with out-of-order data, lacking the sophisticated Event Time Windowing logic that became the hallmark of Apache Flink.

Today, Apache Storm is largely considered legacy, heavily replaced by Flink and Kafka Streams.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Stream processing/index.mdx': `---
title: Stream Processing
description: The paradigm of executing complex, stateful analytical computations over infinite, unbounded streams of events in real-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stream Processing">

For decades, organizations ran their analytics in Batch (e.g., executing a giant SQL query at midnight). However, modern digital applications (Uber's surge pricing, credit card fraud detection, algorithmic stock trading) cannot wait until midnight. They require **Stream Processing**: executing complex mathematical aggregations on data the exact millisecond it arrives.

## 1. Unbounded Data
The fundamental mathematical difference between Batch and Stream processing is the concept of boundaries.
- **Bounded (Batch)**: A CSV file with 1 million rows. It has a start and an end.
- **Unbounded (Stream)**: A Kafka topic capturing website clicks. It has a start, but mathematically, it never ends. 

Because the stream never ends, you mathematically *cannot* execute a query like "Calculate the total average". You must apply **Windowing** (e.g., "Calculate the average over a 5-minute rolling window").

## 2. The Hard Problems in Streaming
Stream processing is mathematically the most difficult architecture in Data Engineering.

### 1. State Management
To calculate a 1-hour average, the streaming server must hold the running total in memory. If the server catches fire at minute 59, the state is destroyed. Modern frameworks (like Apache Flink) solve this mathematically by taking asynchronous, distributed snapshots of the RAM (using algorithms like Chandy-Lamport) and saving them to S3, guaranteeing fault-tolerant recovery.

### 2. Out-of-Order Data (Event Time vs Processing Time)
A user clicks a button on a train while inside a tunnel (no internet). The phone records the click at 10:00 AM (Event Time). The train exits the tunnel, and the event reaches the server at 10:15 AM (Processing Time).
If the server mathematically calculates analytics based on Processing Time, the metrics are destroyed. Stream processing engines utilize **Watermarks** to temporarily hold windows open, wait for late-arriving data, and enforce mathematical correctness based strictly on Event Time.

## 3. The Tech Stack
- **The Storage Layer**: **Apache Kafka** is the undisputed king. It acts as the infinite, fault-tolerant buffer that holds the raw stream of events.
- **The Processing Engine**: **Apache Flink** (for massive, stateful clusters) and **Kafka Streams** (for lightweight Java microservices) are the modern industry standards, completely replacing legacy systems like Apache Storm and Spark Streaming (Micro-batching).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Synapse Analytics/index.mdx': `---
title: Azure Synapse Analytics
description: Microsoft's unified enterprise analytics service that mathematically merges Data Warehousing, Big Data, and Data Integration into a single platform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Azure Synapse Analytics">

Historically, deploying an enterprise data architecture required duct-taping disparate tools together: using Azure Data Factory for pipelines, Azure Databricks for Spark processing, and Azure SQL Data Warehouse for BI.

**Azure Synapse Analytics** was engineered by Microsoft to mathematically unify these distinct architectures into a single, cohesive pane of glass. It is the direct evolution of the legacy Azure SQL Data Warehouse.

## 1. The Unified Analytics Platform
Synapse mathematically blends the two opposing paradigms of Data Engineering: The relational Data Warehouse and the unstructured Data Lake.

It achieves this through a unified workspace that offers multiple specialized mathematical compute engines running over the exact same data in Azure Data Lake Storage (ADLS Gen2):

- **Dedicated SQL Pool (The Warehouse)**: The traditional, massively parallel processing (MPP) engine. You provision dedicated compute nodes to execute blazing-fast, highly structured SQL queries against rigid tables.
- **Serverless SQL Pool (The Lakehouse)**: A dynamically scaling, pay-per-query engine. It allows Data Analysts to write standard SQL directly against raw Parquet or CSV files sitting in the Data Lake, without ever formally importing the data into a database.
- **Apache Spark Pool**: A fully managed Spark engine built directly into Synapse, allowing Data Scientists to execute complex Python/Scala Machine Learning pipelines against the exact same Data Lake files.

## 2. Synapse Pipelines
Synapse integrates **Azure Data Factory** directly into its core. 
You can mathematically construct complex Directed Acyclic Graphs (DAGs) using a drag-and-drop visual interface to orchestrate the movement of data. A pipeline can extract data from an on-premise Oracle database, trigger a Spark notebook to cleanse the data, and finally trigger a Dedicated SQL Pool stored procedure to aggregate it.

## 3. Competitive Landscape
Synapse is Microsoft's answer to the fierce cloud analytics war. 
- It directly competes with **Snowflake** and **Google BigQuery** in the Cloud Data Warehouse space.
- It directly competes with **Databricks** in the Data Lakehouse / Apache Spark space. 

By unifying ETL, Spark, and SQL into a single deeply integrated Microsoft ecosystem, it is heavily favored by massive enterprises already entrenched in the Azure ecosystem.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/dbt/index.mdx': `---
title: dbt (Data Build Tool)
description: The revolutionary framework that brings strict Software Engineering principles (CI/CD, testing, version control) to Data Engineering SQL pipelines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="dbt (Data Build Tool)">

Before dbt, Data Analysts were forced to maintain catastrophic 2,000-line SQL scripts inside Airflow to transform data. There was no version control, no modularity, and no testing. If a script broke, the entire data warehouse was corrupted.

**dbt (Data Build Tool)** mathematically revolutionized the industry by bringing the rigor of Software Engineering directly to SQL. It is the undisputed standard for the **ELT (Extract, Load, Transform)** paradigm.

## 1. Modular SQL & The DAG
Instead of writing one massive script, dbt forces you to write small, atomic SQL queries (called Models).
- You write a model that just cleans user data (TICK1stg_users.sqlTICK1).
- You write another model that aggregates revenue (TICK1stg_payments.sqlTICK1).

You mathematically link these models using the Jinja TICK1{{ ref() }}TICK1 macro.
TICK3sql
-- final_analytics.sql
SELECT u.name, p.total
FROM {{ ref('stg_users') }} u
JOIN {{ ref('stg_payments') }} p ON u.id = p.user_id
TICK3

When you execute TICK1dbt runTICK1, dbt parses the TICK1ref()TICK1 macros, mathematically constructs a **Directed Acyclic Graph (DAG)** of all dependencies, and executes the SQL in the exact correct order inside the Data Warehouse (e.g., Snowflake, BigQuery).

## 2. Software Engineering Rigor

### Automated Testing
In dbt, you can define mathematical assertions in a simple YAML file.
TICK3yaml
models:
  - name: stg_users
    columns:
      - name: user_id
        tests:
          - unique
          - not_null
TICK3
Before deploying, dbt compiles these YAML rules into SQL tests. If the TICK1user_idTICK1 column contains a null value, the dbt pipeline mathematically fails, preventing silent data corruption.

### CI/CD and Version Control
Because dbt models are just text files, the entire data pipeline is stored in Git. When a Data Analyst wants to modify a metric, they open a Pull Request. A CI/CD pipeline automatically executes the dbt models against a temporary "Dev" schema in Snowflake, mathematically proving the SQL works before merging it into Production.

## 3. The Analytics Engineer
dbt is so powerful that it created an entirely new job title: **The Analytics Engineer**. 
It empowered people who only know SQL (Analysts) to mathematically build production-grade, fault-tolerant data pipelines without needing to know complex Python, Scala, or Apache Spark.

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
