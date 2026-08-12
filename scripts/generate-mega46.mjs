import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/22. Data Engineering/Data Architecture/index.mdx': `---
title: Data Architecture (Lakes vs Warehouses)
description: Deep-dive into the architectural evolution from rigid Data Warehouses (Snowflake, BigQuery) to unstructured Data Lakes (S3), and the modern hybrid revolution of Lakehouses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Architecture (Lakes vs Warehouses)">

Data Engineering is the mathematical discipline of designing, building, and maintaining the infrastructure required to process petabytes of data. At the core of this discipline lies the fundamental architecture of where and how data is physically stored and queried.

## 1. The Data Warehouse (The Legacy Standard)
Historically, the **Data Warehouse** was the absolute standard for enterprise analytics. It is a central, highly-structured relational database optimized exclusively for **OLAP** (Online Analytical Processing) queries, rather than OLTP (Online Transaction Processing).

### Architecture
- **Schema-on-Write**: Data must be strictly cleaned, transformed, and normalized *before* it is written into the warehouse. If you try to insert JSON with a missing column, it fails instantly.
- **Compute and Storage**: In legacy systems (like Teradata), compute and storage were physically coupled. You had to buy massive, expensive hardware racks.
- **Modern Cloud Data Warehouses**: **Snowflake** and **Google BigQuery** revolutionized this by mathematically decoupling Compute from Storage. You pay pennies to store petabytes of data on their S3-like storage layers, and you spin up transient Compute clusters (Virtual Warehouses) only when you execute a query.

**Use Case**: Business Intelligence (BI) dashboards, strict financial reporting, and highly governed structured SQL queries.

## 2. The Data Lake (The Unstructured Dump)
As companies began collecting massive amounts of unstructured data (images, massive raw JSON logs, IoT sensor telemetry), the rigid Schema-on-Write architecture of the Data Warehouse became a catastrophic bottleneck. The **Data Lake** was born.

### Architecture
- **Schema-on-Read**: A Data Lake (like Amazon S3, Azure Data Lake, or HDFS) is simply a massive, cheap object storage system. You dump raw data into it exactly as it arrives. The schema is applied later, only when a Data Scientist attempts to read and parse the data.
- **Swamp Risk**: Because there is zero strict governance on write, Data Lakes often devolve into "Data Swamps"—unsearchable, undocumented terabytes of useless data.

**Use Case**: Machine Learning training, massive unstructured data storage, and exploratory Data Science.

## 3. The Data Lakehouse (The Modern Revolution)
The industry realized that maintaining two entirely separate systems (a Lake for ML and a Warehouse for BI) was phenomenally expensive and required horrific dual-write pipelines. The **Data Lakehouse** was invented to mathematically merge the two.

### Architecture
Pioneered by **Databricks**, a Lakehouse utilizes open-source Table Formats (like **Apache Iceberg**, **Delta Lake**, or **Apache Hudi**) sitting directly on top of cheap Data Lake storage (S3). 
These table formats add a transactional metadata layer that mathematically provides ACID guarantees, time-travel (versioning), and schema enforcement directly on the raw files.

You get the infinite, cheap scaling of a Data Lake, with the strict SQL governance and performance of a Data Warehouse. This is the absolute state-of-the-art in modern Data Engineering.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Batch Processing/index.mdx': `---
title: Batch Processing (Hadoop & Spark)
description: A rigorous breakdown of the MapReduce algorithm, HDFS, and how Apache Spark mathematically revolutionized Big Data by keeping execution graphs entirely in RAM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Batch Processing (Hadoop & Spark)">

When processing a 10-Petabyte dataset, a single supercomputer will mathematically run out of RAM and CPU. The data must be processed in **Batch** across a distributed cluster of thousands of commodity servers.

## 1. The Hadoop Revolution
In 2004, Google published a paper detailing how they indexed the entire internet. This paper led to the creation of **Apache Hadoop**, the framework that created the Big Data industry.

Hadoop has two core mathematical components:
1. **HDFS (Hadoop Distributed File System)**: A master-slave architecture. A NameNode tracks metadata, and thousands of DataNodes store physical 128MB blocks of data. Data is replicated 3x mathematically to ensure absolute fault tolerance.
2. **MapReduce**: The programming paradigm. Instead of moving 10 Terabytes of data across the network to a central CPU (which takes hours), MapReduce mathematically moves the *Compute* (a 10KB Java program) to the DataNodes, executing the processing in parallel on the disks where the data already lives.

## 2. The Bottleneck of MapReduce
MapReduce was revolutionary, but it had a catastrophic mathematical flaw: **Disk I/O**.
If you wrote a complex algorithm (like Machine Learning training) that required 5 sequential MapReduce jobs, Job 1 would write its output to the physical hard drive. Job 2 would read from the hard drive, process, and write to the hard drive. 
The extreme latency of spinning HDD disks made complex multi-stage algorithms agonizingly slow.

## 3. Apache Spark (The In-Memory Revolution)
**Apache Spark** was created to mathematically solve the disk I/O bottleneck of Hadoop. It is the absolute standard for modern batch processing.

### Resilient Distributed Datasets (RDDs)
Spark introduced the RDD, an immutable, distributed collection of objects. 
Instead of writing intermediate data to disk, Spark keeps the entire dataset mathematically partitioned **in RAM** across the cluster. If a node crashes, Spark does not rely on disk replication; it relies on **Lineage**. It mathematically remembers the exact graph of transformations (DAG) used to create the RDD and simply recomputes the lost partition from the source data.

### Lazy Evaluation
Spark does not execute a line of code when you apply a transformation (e.g., TICK1.map()TICK1 or TICK1.filter()TICK1). It mathematically builds a **Directed Acyclic Graph (DAG)** of your intent. 
Execution only occurs when you call an Action (e.g., TICK1.count()TICK1 or TICK1.save()TICK1). At that point, Spark's Catalyst Optimizer calculates the absolute fastest physical execution plan, aggressively fusing filters and maps to minimize memory usage.

TICK3python
# PySpark Example (Lazy Evaluation)
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("DataProcessing").getOrCreate()

# These are Transformations (Instantly returns, builds the DAG)
df = spark.read.parquet("s3://massive-bucket/data/")
filtered_df = df.filter(df.age > 30)
grouped_df = filtered_df.groupBy("country").count()

# This is an Action (Triggers the Catalyst Optimizer and executes the massive distributed job)
grouped_df.write.parquet("s3://massive-bucket/output/")
TICK3

Spark is empirically 10x to 100x faster than Hadoop MapReduce for complex workloads, completely dominating the modern data landscape via managed platforms like **Databricks**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Stream Processing/index.mdx': `---
title: Stream Processing (Kafka & Flink)
description: Extensive breakdown of Apache Kafka's Append-Only Log architecture, consumer groups, offsets, and how Apache Flink processes unbounded streams in real-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stream Processing (Kafka & Flink)">

Batch processing runs on a schedule (e.g., every midnight). However, modern systems (Uber tracking cars, Robinhood executing trades, Netflix tracking user clicks) require **Stream Processing**: executing complex mathematical transformations on unbounded, infinite streams of data in real-time with sub-millisecond latency.

## 1. Apache Kafka (The Nervous System)
**Apache Kafka** is not a database, nor is it a traditional message queue (like RabbitMQ). It is a highly-distributed, mathematically robust **Distributed Commit Log**.

### The Append-Only Log
At its core, a Kafka Topic is simply an append-only text file on disk. When a Producer sends an event (e.g., "User clicked button"), it is appended to the absolute end of the log. 
Unlike RabbitMQ, where a message is deleted after it is read, Kafka mathematically retains the message for a configured retention period (e.g., 7 days). This allows 50 different Consumer microservices to read the exact same message independently, at their own pace.

### Partitions & Consumer Groups
To achieve massive horizontal scale, a Topic is mathematically split into **Partitions**. 
If a Topic has 10 partitions, you can launch a **Consumer Group** containing 10 separate servers. Kafka will mathematically assign exactly one partition to each server, allowing you to process 1,000,000 messages per second in parallel. 
Kafka tracks exactly which message each consumer has read using an **Offset** (an integer index). If a consumer crashes, a new server spins up, reads the committed offset, and resumes instantly without dropping a single event.

## 2. Apache Flink (The Processing Engine)
Kafka is brilliant at *storing and moving* the stream, but you often need to perform complex mathematical aggregations on the stream (e.g., "Calculate the average Uber surge price in Manhattan over a rolling 5-minute window").

**Apache Flink** is the absolute state-of-the-art framework for stateful stream processing.

### Event Time vs Processing Time
Flink mathematically solves the "Out of Order Data" problem.
If a user clicks a button on their phone while in an internet dead-zone, the event might arrive at the server 10 minutes late.
- **Processing Time**: The timestamp when the server received the event. (Highly inaccurate for analytics).
- **Event Time**: The timestamp generated by the phone when the button was physically clicked. 

Flink utilizes a mathematical concept called **Watermarks** to temporarily buffer windows of time, wait for late-arriving events based on Event Time, and then execute the aggregation with absolute mathematical correctness. It guarantees **Exactly-Once Semantics**, ensuring that even if a server crashes midway through a calculation, no data is double-counted.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data Storage Formats/index.mdx': `---
title: Data Storage Formats (Parquet & Iceberg)
description: Mathematical comparison of row-based vs columnar storage. Deep dive into Parquet compression, and modern Table Formats like Apache Iceberg and Delta Lake.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Storage Formats (Parquet & Iceberg)">

In massive distributed systems, storing data as standard JSON or CSV files is mathematically catastrophic. CSV files are uncompressed, slow to parse, and do not contain schema metadata. The Data Engineering industry relies on mathematically optimized binary file formats.

## 1. Row-Oriented vs Column-Oriented
Relational databases (PostgreSQL, MySQL) store data in **Row-Oriented** formats. The disk physically stores all data for User A, followed by all data for User B. This is incredibly fast for fetching a single user's profile (OLTP).

However, in Data Engineering (OLAP), you rarely fetch a single user. You run queries like: *"Calculate the average Age of all 10 Billion users"*. 
In a Row-Oriented database, the system must physically read the entire hard drive (fetching names, addresses, emails) just to extract the Age column. This destroys disk I/O.

### Columnar Storage (Apache Parquet)
**Apache Parquet** is a **Column-Oriented** binary format. It physically stores all the Names together, then all the Addresses together, then all the Ages together. 
When you query the average Age, the engine physically reads *only* the specific disk blocks containing the Ages, ignoring 95% of the file. This mathematically reduces disk I/O by orders of magnitude.

Furthermore, because a column contains identical data types (e.g., a massive array of integers), Parquet applies aggressive mathematical compression algorithms (like Dictionary Encoding and Run-Length Encoding), routinely shrinking 1TB of CSV data into 100GB of Parquet data.

## 2. Table Formats (Iceberg & Delta Lake)
While Parquet solves file storage, it does not solve *Database State*. A Data Lake might contain 500,000 Parquet files. If a Spark job crashes halfway through writing 10,000 new files, your Data Lake is mathematically corrupted with partial data.

To solve this, the industry invented **Table Formats** (the architecture powering the Data Lakehouse).

### Apache Iceberg & Delta Lake
These formats maintain a strict, mathematical **Metadata Layer** (often JSON or Avro files) that explicitly tracks exactly which Parquet files belong to the current version of the table.

- **ACID Transactions**: When writing data, the new Parquet files are hidden. Only when the metadata file is atomically swapped (the Commit) does the data become visible. If a job fails, the hidden files are simply garbage collected. No corruption.
- **Time Travel**: Because metadata tracks versions, you can execute a SQL query mathematically "as of" exactly 3 days ago by reading the old metadata file, which points to the old Parquet files.
- **Schema Evolution**: You can instantly rename or drop columns without needing to rewrite petabytes of physical Parquet files; it is handled entirely in the metadata pointer layer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data Pipelines/index.mdx': `---
title: Data Pipelines (ETL, ELT & dbt)
description: The paradigm shift from ETL to ELT due to cheap cloud storage. Extensive breakdown of how dbt (Data Build Tool) brings software engineering practices to SQL.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Pipelines (ETL, ELT & dbt)">

A Data Pipeline is the automated software that extracts data from operational databases (like a PostgreSQL database powering a web app), cleans it, and moves it into the Data Warehouse for analytics.

## 1. The Paradigm Shift: ETL vs ELT
Historically, Data Warehouses (like Teradata) had incredibly expensive Compute and Storage. You could not afford to store raw, dirty data.

### ETL (Extract, Transform, Load)
The legacy architecture. 
1. **Extract**: Pull raw data from the database.
2. **Transform**: Use a massive, expensive external server (like Apache Spark or Informatica) to mathematically clean the data, normalize it, and aggregate it.
3. **Load**: Insert the perfectly clean data into the Warehouse.

### ELT (Extract, Load, Transform)
With the invention of Snowflake and BigQuery, Cloud Storage became incredibly cheap, and Cloud Compute became massively powerful and elastic.
1. **Extract**: Pull raw data.
2. **Load**: Dump the completely raw, dirty data directly into the Cloud Data Warehouse.
3. **Transform**: Use the immense processing power of the Warehouse *itself* to execute massive SQL queries that transform the raw tables into clean analytical tables.

ELT mathematically removes the need for expensive external Spark clusters for daily transformations. The Data Warehouse becomes the single source of truth and the execution engine.

## 2. dbt (Data Build Tool)
With the shift to ELT, Analytics Engineers were suddenly writing thousands of massive, 500-line SQL scripts to transform data inside Snowflake. This became completely unmanageable.

**dbt** revolutionized the industry by bringing strict Software Engineering CI/CD practices directly to SQL.

- **Modularity**: Instead of one massive script, you write small TICK1SELECTTICK1 statements in separate files. You use the mathematical TICK1{{ ref('model_name') }}TICK1 macro to reference other files. dbt mathematically resolves the dependency tree (DAG) and executes the SQL in the correct order.
- **Version Control**: All data transformations are stored in Git.
- **Testing**: dbt allows you to define YAML files asserting that a column must be TICK1uniqueTICK1 or TICK1not_nullTICK1. Before compiling the SQL, dbt mathematically executes these assertions, failing the pipeline if the data quality is corrupted.

TICK3sql
-- Example dbt model (stg_users.sql)
WITH source AS (
    SELECT * FROM {{ source('raw_database', 'users') }}
),
renamed AS (
    SELECT
        id AS user_id,
        LOWER(email) AS email_address,
        created_at
    FROM source
)
SELECT * FROM renamed;
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Orchestration/index.mdx': `---
title: Orchestration & Data Quality
description: Thorough analysis of Directed Acyclic Graphs (DAGs) in Apache Airflow, modern alternatives like Dagster/Prefect, and enforcing Data Quality via Great Expectations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Orchestration & Data Quality">

A modern Data Platform consists of hundreds of moving parts: Fivetran extracting data, dbt transforming it, Spark training an ML model, and Tableau refreshing a dashboard.
These tasks cannot run blindly on a cron schedule. If the Fivetran extraction fails, the dbt transformation must mathematically halt; otherwise, it will generate corrupted analytics.

## 1. Orchestration: Apache Airflow
Created at Airbnb, **Apache Airflow** is the undisputed industry standard for orchestrating complex data pipelines. It is a workflow management platform written in Python.

### Directed Acyclic Graphs (DAGs)
In Airflow, a workflow is mathematically defined as a **DAG**.
- **Directed**: The tasks have a strict execution order (Task A -> Task B).
- **Acyclic**: It mathematically cannot contain infinite loops (Task A cannot wait for Task B if Task B waits for Task A).
- **Graph**: The visual representation of the nodes and edges.

You write Python code to define the DAG. Airflow handles retries on failure, alerting, and parallel execution of independent branches.

TICK3python
# Airflow DAG Example
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG('daily_etl_pipeline', start_date=datetime(2026, 1, 1), schedule_interval='@daily') as dag:
    
    extract = BashOperator(task_id='extract_data', bash_command='python extract.py')
    transform = BashOperator(task_id='run_dbt', bash_command='dbt run')
    deploy = BashOperator(task_id='refresh_dashboard', bash_command='python refresh.py')

    # Mathematical dependency definition
    extract >> transform >> deploy
TICK3

### Modern Alternatives (Dagster & Prefect)
While Airflow dominates, it is heavily task-oriented (it cares about *tasks* running, not the *data* moving between them).
**Dagster** and **Prefect** are modern orchestrators built around "Software-Defined Assets". They mathematically track the lineage and state of the actual data tables, making them vastly superior for complex Machine Learning orchestration and debugging.

## 2. Data Quality & Observability
If a software application breaks, it throws a 500 Error. If a Data Pipeline breaks (e.g., an upstream engineer accidentally renames the "Revenue" column), the pipeline might still succeed, but it outputs $0 for all financial reports. This is called **Silent Data Corruption**.

**Great Expectations** is the industry standard Python framework for mathematically asserting data quality.
You define "Expectations" (unit tests for data):
- "The column TICK1user_idTICK1 must never be null."
- "The column TICK1daily_revenueTICK1 must be mathematically between $0 and $10,000."
- "The column TICK1country_codeTICK1 must strictly match the ISO-3166 list."

Before Airflow triggers the downstream BI dashboard refresh, it mathematically runs the Great Expectations suite. If the data violates the assertions, Airflow explicitly kills the pipeline and alerts the engineers, mathematically guaranteeing that the CEO never views corrupted data.

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
