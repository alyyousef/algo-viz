import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/22. Data Engineering/Airflow/index.mdx': `---
title: Apache Airflow
description: The industry standard platform for orchestrating complex data pipelines using Python Directed Acyclic Graphs (DAGs).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Airflow">

Created at Airbnb, **Apache Airflow** is the absolute industry standard for workflow orchestration. It allows Data Engineers to programmatically author, schedule, and monitor complex data pipelines using Python.

## 1. Core Architecture
Unlike cron jobs which blindly execute scripts at a specific time, Airflow mathematically models workflows as **Directed Acyclic Graphs (DAGs)**.

- **Directed**: Execution flows strictly from upstream to downstream (e.g., Task A $\\rightarrow$ Task B).
- **Acyclic**: The graph cannot contain infinite loops. Task A cannot depend on Task B if Task B depends on Task A.
- **Graph**: The mathematical representation of tasks (Nodes) and dependencies (Edges).

Airflow operates on a robust architecture:
- **Scheduler**: A daemon that mathematically evaluates all DAGs, determines which tasks have met their dependencies, and pushes them to the queue.
- **Executor / Workers**: The processes that pull tasks from the queue and physically execute the code (e.g., Celery Workers, Kubernetes Pods).
- **Webserver**: A Flask UI for visualizing the DAGs, checking logs, and triggering manual runs.
- **Metadata Database**: A PostgreSQL/MySQL database that tracks the exact state, history, and variables of every single task execution.

## 2. DAG Definition (Python)
In Airflow, pipelines are declared completely in Python, allowing for dynamic generation, loop iteration, and standard software engineering practices (version control, CI/CD).

TICK3python
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data_engineering',
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'daily_sales_pipeline',
    default_args=default_args,
    start_date=datetime(2026, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:

    # Task 1: Extract data using a Bash script
    extract_data = BashOperator(
        task_id='extract_sales_data',
        bash_command='python /scripts/extract_sales.py'
    )

    # Task 2: Transform data via Snowflake SQL execution
    transform_data = SnowflakeOperator(
        task_id='transform_sales',
        snowflake_conn_id='snowflake_prod',
        sql="""
            INSERT INTO prod.core.daily_sales
            SELECT date, SUM(amount) FROM raw.sales GROUP BY date;
        """
    )

    # Mathematical dependency definition (Bitshift operators)
    extract_data >> transform_data
TICK3

## 3. Advanced Features
- **Sensors**: Special tasks that do not execute logic, but mathematically "wait" for an external event to occur (e.g., waiting for an S3 file to arrive) before allowing the DAG to proceed.
- **XComs (Cross-Communication)**: A mechanism allowing tasks to pass small amounts of metadata (like a dynamic file path) to downstream tasks.
- **Catchup**: If you create a daily DAG today, but set the start date to 10 days ago, Airflow will mathematically execute the past 10 days of pipelines to "catch up" to the current state.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Apache Beam/index.mdx': `---
title: Apache Beam
description: A unified, mathematically rigorous programming model for executing both Batch and Streaming data processing pipelines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Beam">

Historically, Data Engineers had to write two completely separate codebases: one using Apache Spark for daily Batch processing, and another using Apache Flink for real-time Stream processing. This was a maintenance nightmare.

**Apache Beam** (Batch + strEAM) mathematically unifies these two paradigms.

## 1. The Unified Paradigm
Apache Beam is an API, not an execution engine. You write your pipeline logic *once* using the Beam SDK (Python, Java, Go). 
You then compile that logic and send it to a **Runner** (the physical execution engine).

Supported Runners include:
- **Google Cloud Dataflow** (The most common, natively built for Beam)
- **Apache Flink**
- **Apache Spark**
- **DirectRunner** (For local testing)

Because the pipeline is decoupled from the execution engine, you can mathematically port your code from an on-premise Spark cluster to a serverless Google Dataflow cluster without changing a single line of business logic.

## 2. Core Concepts
Beam operates on a highly abstract, mathematically rigorous foundation.

- **PCollection (Parallel Collection)**: The foundational dataset. It is immutable and massively distributed. A PCollection can represent a finite dataset (Batch) or an infinite, unbounded dataset (Stream).
- **PTransform (Parallel Transform)**: The mathematical operations applied to a PCollection (e.g., TICK1ParDoTICK1, TICK1GroupByKeyTICK1, TICK1FilterTICK1).
- **Pipeline**: The DAG (Directed Acyclic Graph) encapsulating all PCollections and PTransforms.

TICK3python
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

# A simple Batch pipeline to count word frequencies
with beam.Pipeline(options=PipelineOptions()) as p:
    (
        p
        | 'Read Text File' >> beam.io.ReadFromText('gs://my-bucket/input.txt')
        | 'Extract Words' >> beam.FlatMap(lambda line: line.split())
        | 'Pair with 1' >> beam.Map(lambda word: (word, 1))
        | 'Group and Sum' >> beam.CombinePerKey(sum)
        | 'Write Output' >> beam.io.WriteToText('gs://my-bucket/output.txt')
    )
TICK3

## 3. Streaming and Windowing
Where Beam truly shines is its mathematical handling of time in infinite streams.
If you are streaming IoT sensor data, you cannot calculate an average because the stream never ends. You must apply **Windowing**.

- **Fixed Windows**: Every 5 minutes (e.g., 10:00 - 10:05).
- **Sliding Windows**: Every 5 minutes, starting every 1 minute (overlapping).
- **Session Windows**: Dynamic windows defined by user activity (e.g., 30 minutes of inactivity closes the window).

Beam utilizes **Watermarks** to handle out-of-order data (Event Time vs Processing Time) and **Triggers** to determine when to mathematically emit the results of a window before it closes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Apache Hudi/index.mdx': `---
title: Apache Hudi
description: A modern Table Format that brings ACID transactions and massive update/delete capabilities to Data Lakes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Hudi">

In legacy Data Lakes (like AWS S3 storing raw Parquet files), modifying existing data is mathematically catastrophic. If a user deletes their account (GDPR compliance), you cannot simply run a SQL TICK1DELETETICK1 query. You must write a massive Spark job to read a 10GB Parquet file, filter out the single user, and rewrite the entire 10GB file.

**Apache Hudi** (Hadoop Upserts Deletes and Incrementals) was created by Uber to mathematically solve this problem, bringing ACID transactions to the Data Lake.

## 1. Core Capabilities
Hudi sits between your raw Parquet files and your query engine (like Presto, Spark, or Athena). It acts as a transactional metadata layer.

- **Upserts**: Hudi mathematically merges new streaming records with existing historical records, overwriting old data without forcing you to manually orchestrate complex file rewrites.
- **ACID Transactions**: Multiple Spark jobs can write to the same Hudi table simultaneously. Hudi uses optimistic concurrency control to ensure the data is never corrupted.
- **Incremental Queries**: Instead of recalculating a daily aggregate from scratch, Hudi allows downstream consumers to query *only* the records that mathematically changed in the last 15 minutes.

## 2. Storage Types
Hudi mathematically optimizes disk I/O by offering two distinct storage formats, depending on whether your workload is Read-Heavy or Write-Heavy.

### Copy on Write (CoW)
- **Mechanism**: Every time an Update or Delete occurs, Hudi immediately reads the original Parquet file, applies the change in memory, and writes a completely new, mathematically perfect Parquet file.
- **Advantage**: Queries are incredibly fast because they just read standard, contiguous Parquet files.
- **Disadvantage**: Massive write amplification. Changing 1 row requires rewriting 1,000,000 rows.

### Merge on Read (MoR)
- **Mechanism**: When an Update occurs, Hudi quickly writes the change to a lightweight, row-based **Log File** (Avro format). It leaves the massive base Parquet file untouched.
- **Advantage**: Writes are unbelievably fast (perfect for real-time streaming).
- **Disadvantage**: Queries are slower, because the query engine (e.g., Presto) must mathematically merge the base Parquet file and the delta Log file *in memory* during the query. Periodically, Hudi executes a background **Compaction** job to permanently merge the logs into the base Parquet files.

## 3. The Ecosystem
Hudi is one of the three major titans in the modern "Lakehouse" architecture, fiercely competing with **Apache Iceberg** and **Delta Lake**. AWS heavily adopted Hudi early on, deeply integrating it into Amazon EMR and Amazon Athena.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Apache Iceberg/index.mdx': `---
title: Apache Iceberg
description: An open standard Table Format developed at Netflix for huge analytic tables, guaranteeing mathematical consistency at petabyte scale.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Iceberg">

Historically, Data Lakes tracked tables using the Hive Metastore, which physically mapped a "Table" to a "Directory" (e.g., TICK1s3://bucket/table/year=2026/TICK1). If that directory contained 100,000 Parquet files, a query engine had to execute a mathematically agonizing TICK1list()TICK1 operation on the S3 API just to figure out what files existed before the query could even begin.

**Apache Iceberg** was created by Netflix to mathematically replace this broken architecture. Instead of tracking directories, Iceberg tracks **individual files** at the metadata level.

## 1. The Metadata Architecture
Iceberg flips the paradigm: **The metadata defines the table, not the file system.**

1. **Metadata File (JSON)**: Tracks the table schema, partition spec, and points to the current Snapshot.
2. **Manifest List (Avro)**: Tracks all the individual Manifest files that make up the Snapshot.
3. **Manifest Files (Avro)**: Physically lists the exact S3 paths of the raw data files (Parquet/ORC). Crucially, it stores column-level statistics (min/max values) for every single file.

### Mathematical Pruning
Because the Manifest Files store Min/Max stats, Iceberg achieves phenomenal speed. If a query requests TICK1SELECT * WHERE age > 60TICK1, Iceberg mathematically checks the Manifest. If a Parquet file has a Min Age of 12 and a Max Age of 45, Iceberg completely ignores the file. The query engine never even opens it.

## 2. Core Features

### Hidden Partitioning
In legacy Hive, if you partitioned by Date, you had to physically alter your SQL queries to explicitly query the TICK1dateTICK1 column, forcing Data Analysts to understand the physical disk layout. 
Iceberg hides this. You configure the table to partition by TICK1day(timestamp)TICK1, and Analysts simply query the TICK1timestampTICK1 column normally. Iceberg mathematically handles the partitioning invisibly in the background.

### Schema Evolution
In legacy systems, dropping a column or renaming a column was impossible without physically rewriting the petabytes of underlying data.
Iceberg assigns mathematical, unique IDs to every column. If you rename a column from TICK1client_idTICK1 to TICK1customer_idTICK1, Iceberg simply updates the JSON Metadata file. The underlying Parquet files are never touched.

### Time Travel and Rollbacks
Every commit to an Iceberg table creates a mathematically immutable **Snapshot**.
You can physically query the exact state of the table from yesterday using time travel syntax. If a rogue ETL pipeline writes 500 million corrupted rows, you don't need a backup; you simply execute a rollback command to instantly revert the metadata pointer to the previous Snapshot.

TICK3sql
-- Iceberg Time Travel via SQL
SELECT count(*) FROM prod.db.events FOR SYSTEM_TIME AS OF '2026-01-01 10:00:00';
TICK3

Iceberg is arguably the most widely adopted open-source Table Format today, supported natively by Snowflake, BigQuery, Databricks, and AWS Athena.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Apache Spark/index.mdx': `---
title: Apache Spark
description: The industry standard unified analytics engine for massive-scale data processing, utilizing mathematically optimized in-memory Directed Acyclic Graphs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Spark">

Before Spark, the industry relied on Hadoop MapReduce, which was catastrophically slow because it mathematically forced data to be written to physical spinning hard drives between every single processing step.

**Apache Spark** revolutionized Data Engineering by moving the data processing entirely into **RAM**, achieving speeds 100x faster than Hadoop.

## 1. Core Abstractions

### RDD (Resilient Distributed Dataset)
The foundational mathematical abstraction of Spark. An RDD is a read-only, partitioned collection of records distributed across a cluster of 1,000 servers.
- **Resilient**: If Server #45 crashes and loses its slice of RAM, Spark does not rely on disk backups. It relies on mathematical **Lineage**. It looks at the execution graph and instantly re-computes the lost partition from the original source file.

### DataFrames & Datasets
While RDDs were revolutionary, raw Python/Java objects were slow to serialize. Spark introduced DataFrames (modeled after Pandas/R). 
DataFrames enforce a strict schema (Rows and Columns) under the hood. This allows Spark to utilize the **Tungsten Engine**, which mathematically bypasses the Java Virtual Machine (JVM) garbage collector by explicitly managing memory at the binary byte level, resulting in massive performance gains.

## 2. Lazy Evaluation & The Catalyst Optimizer
When you write PySpark code, it does absolutely nothing immediately. 

TICK3python
# This code executes in 1 millisecond. No data is processed.
df = spark.read.parquet("s3://massive-bucket/")
filtered = df.filter(df.age > 18)
grouped = filtered.groupBy("city").count()
TICK3

Spark mathematically evaluates your code and builds a **Logical Plan** (a Directed Acyclic Graph of intent).
It only executes when you call an **Action** (e.g., TICK1grouped.show()TICK1, TICK1grouped.write()TICK1).

Once an Action is called, the **Catalyst Optimizer** mathematically rewrites your code. 
- **Predicate Pushdown**: If you filter TICK1age > 18TICK1 *after* a massive join, Catalyst will mathematically rewrite the DAG to execute the filter *before* the join, saving gigabytes of RAM.
- **Physical Planning**: Catalyst determines whether to execute a Broadcast Hash Join (sending a small 5MB table to every server) or a Sort-Merge Join (shuffling terabytes of data across the network).

## 3. Spark Architecture
- **Driver Node**: The central brain. It holds the Catalyst Optimizer, parses your Python code, and coordinates the execution.
- **Worker Nodes**: The physical servers executing the code.
- **Executors**: JVM processes running on the Worker Nodes. They hold the RAM to cache data and allocate CPU cores to execute parallel Tasks.
- **Shuffling**: The most mathematically expensive operation in Spark. If you execute a TICK1groupByTICK1, data belonging to the same key must be physically moved across the network from 100 different servers to a single server. Badly partitioned shuffles cause Out-Of-Memory (OOM) errors.

Spark dominates the industry today, heavily commercialized and optimized by the platform **Databricks**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Avro/index.mdx': `---
title: Apache Avro
description: A Row-Oriented binary data serialization format optimized for fast writes, heavily utilized in streaming architectures like Apache Kafka.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache Avro">

In Data Engineering, data must be physically stored and transmitted. Storing streaming data as raw JSON is mathematically inefficient: JSON stores the string key (e.g., TICK1"user_id"TICK1) repeatedly in every single row, wasting gigabytes of bandwidth and disk space.

**Apache Avro** is a mathematical serialization format designed to fix this by explicitly separating the Data from the Schema.

## 1. Schema-Based Serialization
Avro relies on a JSON-defined schema.

TICK3json
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "user_id", "type": "int"},
    {"name": "username", "type": "string"}
  ]
}
TICK3

When Avro serializes data, it does not write the keys (TICK1user_idTICK1). It mathematically compresses the values into a dense binary byte array. 
Because the schema is required to read the binary data, Avro files physically embed the JSON schema in the header of the file.

## 2. Row-Oriented vs Column-Oriented
Unlike Parquet (which is Column-Oriented and optimized for analytical reads), **Avro is Row-Oriented**.
- **The Advantage**: Row-oriented formats are mathematically optimized for **Writes**. If an application generates a massive stream of events, appending a full row sequentially to an Avro file is incredibly fast.
- **The Disadvantage**: If you want to query only the "Age" column across 10 million rows, the query engine must scan the entire Avro file, resulting in heavy Disk I/O.

## 3. The Standard for Apache Kafka
Avro is the absolute standard data format for **Apache Kafka**.

When a microservice produces a message to a Kafka topic, it serializes the message into Avro. However, sending the JSON schema with every single message would destroy Kafka's bandwidth.
To solve this, Kafka clusters utilize a **Schema Registry**. 
1. The Producer registers the schema to the Registry and receives an integer ID (e.g., Schema ID 42).
2. The Producer serializes the data into binary Avro, prefixes it with "ID 42", and sends it to Kafka.
3. The Consumer receives the binary, asks the Registry for "Schema 42", and deserializes the data.

## 4. Schema Evolution
Avro mathematically guarantees forward and backward compatibility. 
If a team decides to add a new column (e.g., TICK1emailTICK1), they update the Avro schema. 
- **Backward Compatibility**: A new Consumer can mathematically read data generated by an old Producer (the TICK1emailTICK1 field simply defaults to null).
- **Forward Compatibility**: An old Consumer can mathematically read data generated by a new Producer (it simply ignores the new TICK1emailTICK1 bytes in the binary stream).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Batch processing/index.mdx': `---
title: Batch Processing
description: The paradigm of executing massive, high-latency computational jobs over bounded datasets at scheduled intervals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Batch Processing">

Data Engineering is broadly bifurcated into two mathematical paradigms: Stream Processing and Batch Processing. 

**Batch Processing** is the execution of complex transformations against a massive, static, mathematically **bounded** dataset (a dataset that has a defined start and end).

## 1. The Paradigm
Unlike Stream processing (which must respond to events in milliseconds), Batch processing accepts high latency in exchange for massive throughput.

- **Schedule**: Batch jobs run on a strict chronological schedule (e.g., midnight, hourly) orchestrated by tools like Apache Airflow.
- **Completeness**: A batch job mathematically assumes it has access to the *entire* dataset. If you are calculating the "Daily Total Revenue", the job runs at 1:00 AM, assuming all transactions for the previous day have securely landed on disk.
- **Fault Tolerance**: If a batch job fails halfway through a 5-hour run, the entire job is typically retried. Modern engines (like Spark) mitigate this by caching checkpoints, but the fundamental mathematical property is that the pipeline halts and retries.

## 2. Core Use Cases
Despite the massive hype around real-time streaming, 90% of enterprise data engineering is executed in Batch.
- **ETL/ELT**: Extracting 50GB of daily updates from a PostgreSQL replica, transforming it, and loading it into Snowflake.
- **Machine Learning Training**: Reading 10 years of historical Parquet files from an S3 Data Lake to mathematically calculate weights for a Deep Learning model.
- **Financial Reporting**: Generating the strict, legally compliant End-of-Month revenue dashboards.

## 3. The Architecture Stack
The architecture for Batch Processing has evolved through three distinct eras:

1. **The Legacy Era (2000s)**: On-premise Data Warehouses (Teradata) executing massive stored SQL procedures overnight. Highly expensive and rigid.
2. **The Big Data Era (2010s)**: Apache Hadoop and MapReduce. Data was dumped into cheap HDFS storage, and Java MapReduce jobs executed over hours. It introduced horizontal scaling but suffered from horrific Disk I/O bottlenecks.
3. **The Modern Era (2020s)**: **Apache Spark** and **Cloud Data Warehouses** (Snowflake/BigQuery). Spark executes the DAGs entirely in RAM for blistering speed, while tools like **dbt** (Data Build Tool) execute ELT batch transformations directly inside the Cloud Data Warehouse using massive parallel SQL execution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/BigQuery/index.mdx': `---
title: Google BigQuery
description: Google's serverless, highly-scalable, mathematically decoupled Cloud Data Warehouse architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Google BigQuery">

**BigQuery** is Google Cloud's fully managed, serverless enterprise Data Warehouse. Alongside Snowflake, it mathematically revolutionized the Data Engineering industry by fundamentally changing how Compute and Storage interact.

## 1. Serverless Architecture
In a legacy Data Warehouse (like Amazon Redshift originally), you had to explicitly provision a cluster. You rented 10 massive servers. If you ran a query, those 10 servers executed it. If you ran zero queries, you still paid for 10 servers.

BigQuery is entirely **Serverless**. You do not provision hardware. 
When you execute a SQL query, Google's mathematical resource manager (Borg) instantly allocates thousands of CPU cores from Google's global, multi-tenant fleet to your query, executes it in 3 seconds, and de-allocates the CPUs. You are billed purely for the gigabytes of data mathematically scanned during those 3 seconds.

## 2. Decoupled Compute and Storage
The secret to BigQuery's infinite scale is the physical separation of Compute and Storage, connected by Google's massive Petabit-scale optical network (Jupiter).

- **Storage (Colossus)**: Data is physically stored in Colossus (Google's global distributed file system). It is stored in a heavily compressed, proprietary columnar format called **Capacitor**.
- **Compute (Dremel)**: When you run a query, the Dremel engine dynamically spins up a massive Execution Tree. 
- **The Network**: The CPUs physically read the data from the Colossus storage nodes across the Jupiter network. Because the network is so mathematically fast (1 Petabit/sec bisection bandwidth), moving the data to the CPUs is not a bottleneck.

## 3. Advanced Features

### Nested and Repeated Fields
Unlike legacy RDBMS systems that force strict First Normal Form (1NF), BigQuery mathematically embraces semi-structured data. You can natively store JSON arrays directly inside a column (TICK1ARRAY<STRUCT>TICK1) and mathematically unnest them during a query using the TICK1UNNEST()TICK1 function. This avoids horrific JOINs.

### BigQuery ML
BigQuery allows Data Analysts to train massive Machine Learning models using standard SQL, without moving the data out of the warehouse.

TICK3sql
-- Training a K-Means clustering model directly in SQL
CREATE MODEL TICK1my_dataset.customer_clustersTICK1
OPTIONS(model_type='kmeans', num_clusters=5) AS
SELECT age, total_purchases, account_balance FROM TICK1my_dataset.usersTICK1;
TICK3

### Real-Time Streaming Inserts
While BigQuery is an OLAP warehouse, it mathematically supports streaming ingestion. You can stream up to millions of rows per second directly into BigQuery tables, and the data is available for SQL querying within milliseconds, blurring the line between batch and stream processing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Dagster/index.mdx': `---
title: Dagster
description: The modern, Software-Defined Asset (SDA) orchestrator challenging Apache Airflow for Data Engineering pipelines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dagster">

For years, Apache Airflow completely dominated the orchestration landscape. However, Airflow is mathematically a **Task-based** orchestrator. It knows that "Task A" (a bash script) runs before "Task B" (a python script), but Airflow has absolutely no idea what data is physically moving between them.

**Dagster** was built to solve this. It is a **Data-aware** orchestrator built around the concept of Software-Defined Assets.

## 1. Software-Defined Assets (SDAs)
In Dagster, you do not orchestrate generic tasks; you orchestrate **Assets**.
An Asset is a mathematical declaration of a specific dataset (e.g., a Parquet file in S3, a Snowflake table, a trained ML model) and the Python function required to compute it.

TICK3python
from dagster import asset

# Dagster knows this function mathematically produces the "raw_users" asset
@asset
def raw_users():
    return extract_from_api()

# Dagster automatically detects the dependency because 'raw_users' is passed as an argument!
@asset
def cleaned_users(raw_users):
    return clean_data(raw_users)
TICK3

Because Dagster physically models the data lineage (not just the tasks), the UI is profoundly more powerful. You can click on the "cleaned_users" table in the Dagster UI and see exactly what code produced it, its upstream dependencies, and its historical execution state.

## 2. Core Differences from Airflow
- **Data Lineage**: In Airflow, debugging requires reading logs to figure out which table a task modified. In Dagster, the table *is* the task.
- **Local Development**: Testing Airflow DAGs locally is notoriously agonizing, often requiring heavy Docker containers. Dagster is mathematically decoupled from its execution environment, allowing you to run pipelines purely in memory on your local laptop for rapid unit testing.
- **Type Checking**: Dagster allows you to enforce strict Python types and Metadata on the inputs and outputs of every step, providing software engineering rigor to pipelines.

## 3. The Modern Data Stack Integration
Dagster integrates flawlessly with modern tools like **dbt**.
When you integrate dbt into Airflow, Airflow typically sees the entire dbt run as a single giant "Task". If one dbt model fails, the whole task fails.
When you integrate dbt into Dagster, Dagster mathematically parses the dbt graph and represents every single dbt SQL model as an individual Software-Defined Asset in the UI, allowing you to execute, monitor, and retry specific SQL models natively.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data catalogs/index.mdx': `---
title: Data Catalogs
description: The metadata management layer required to solve the Data Swamp problem, enabling searchability, governance, and trust across petabytes of enterprise data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Catalogs">

As organizations scale, they dump thousands of tables into Snowflake and millions of Parquet files into S3 Data Lakes. When a new Data Analyst joins the company and is asked to "Find the daily revenue", they are confronted with tables named TICK1rev_finalTICK1, TICK1rev_final_v2TICK1, and TICK1old_rev_do_not_useTICK1.

Without mathematical organization, a Data Lake degenerates into a **Data Swamp**. The **Data Catalog** is the software system engineered to solve this.

## 1. The Metadata Engine
A Data Catalog (like Alation, Collibra, or open-source **DataHub** / **Amundsen**) is a centralized, searchable repository of all metadata in the organization.

It mathematically crawls your databases (Snowflake, Postgres), BI tools (Tableau, Looker), and orchestrators (Airflow), indexing:
- **Technical Metadata**: Column names, data types, primary keys.
- **Operational Metadata**: When was this table last updated? Did the Airflow job fail this morning?
- **Business Metadata**: Tagging a column as PII (Personally Identifiable Information), documenting the business definition of "Active User".

## 2. Data Discovery and Lineage
The primary UI of a Data Catalog resembles a Google Search engine. An analyst searches for "Revenue", and the catalog ranks the tables based on mathematical usage statistics (e.g., this table is queried 5,000 times a day, so it is the "Gold" standard).

### Lineage Graphs
Modern catalogs construct a massive mathematical Directed Acyclic Graph (DAG) of **Data Lineage**. 
If a Data Engineer wants to drop a column in the TICK1raw_salesTICK1 table, they check the catalog's Lineage Graph. The graph mathematically proves that dropping the column will break a dbt model, which will break a Tableau dashboard used by the CFO. This prevents catastrophic downstream outages.

## 3. The Push vs Pull Architecture
- **Pull-based Catalogs (Legacy)**: The catalog runs a cron job every midnight, hitting the Snowflake schema API to update its metadata. Problem: The catalog is often 24 hours out of date.
- **Push-based Catalogs (Modern)**: Utilizing event-driven architectures. When a dbt job finishes modifying a table, dbt mathematically *pushes* an API event to the Data Catalog (e.g., using DataHub's Kafka integration), ensuring the catalog's metadata is accurate to the millisecond.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data lakes/index.mdx': `---
title: Data Lakes
description: Massive, unstructured object storage repositories that utilize Schema-on-Read, forming the foundation of modern Machine Learning architectures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Lakes">

Historically, data was stored in relational Data Warehouses. This required data to be heavily cleaned and formatted before insertion (Schema-on-Write). As companies began generating petabytes of raw JSON logs, images, and telemetry, relational databases became mathematically and financially impossible to scale.

The **Data Lake** is the architectural solution.

## 1. The Core Philosophy: Schema-on-Read
A Data Lake (like AWS S3, Google Cloud Storage, or Azure Data Lake) is physically just an infinitely scalable Object Store. 
You dump raw data into the Lake exactly as it is generated by the application—without cleaning it, without formatting it, and without defining a schema.

The schema is applied mathematically only when a query engine (like Presto, Athena, or Spark) attempts to **Read** the data.
- **Advantage**: Zero ingestion friction. You never lose raw data because of a schema mismatch. It empowers Data Scientists to train Machine Learning models on the pristine, unaltered raw data.
- **Disadvantage**: Without strict governance, files become unorganized, poorly formatted, and undocumented, devolving the architecture into a useless "Data Swamp".

## 2. Physical Organization & Partitioning
Because S3 does not have a mathematical "Folder" concept (it is a flat Key-Value store where the path TICK1/year/month/file.jsonTICK1 is just a long string key), physical organization is critical.

To prevent massive disk I/O bottlenecks, data is mathematically partitioned in the file paths.
TICK3text
s3://my-datalake/events/year=2026/month=08/day=12/
TICK3
If an engine queries data for August 12, it mathematically parses the string keys and ignores all other terabytes of data, effectively pruning the execution graph.

## 3. The Rise of the Lakehouse
While Data Lakes are perfect for Machine Learning, they are horrific for Business Intelligence. They lack ACID transactions (if a job crashes mid-write, the files are corrupted) and cannot handle row-level UPDATEs/DELETEs efficiently.

This mathematical limitation led to the invention of the **Data Lakehouse** (Databricks). By applying transactional metadata layers (Apache Iceberg, Delta Lake) on top of the raw Parquet files in the Data Lake, engineers successfully bolted Data Warehouse SQL capabilities directly onto the cheap Data Lake storage.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data lineage/index.mdx': `---
title: Data Lineage
description: The mathematical mapping of data's journey across an organization, tracking transformations from raw source to final analytic dashboard.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Lineage">

In a modern enterprise, data does not exist in isolation. A single metric on a CEO's dashboard (e.g., "Total Revenue") is the mathematical output of a massive chain of software dependencies.

The production database is scraped by Fivetran, loaded into Snowflake, transformed by 5 layers of dbt SQL models, aggregated by Airflow, and visualized in Looker.
**Data Lineage** is the mathematical Directed Acyclic Graph (DAG) tracking this exact journey.

## 1. Why Lineage is Critical

### Impact Analysis (Proactive)
A Backend Software Engineer wants to rename the database column TICK1usr_idTICK1 to TICK1user_idTICK1. In the past, they would rename it, and suddenly the data team's nightly Airflow pipeline would crash, destroying the company's financial reports.
With proper lineage, the engineer queries the Lineage Graph and mathematically proves exactly which 14 downstream dbt models and 3 dashboards will break, allowing them to coordinate the change safely.

### Root Cause Analysis (Reactive)
A Data Analyst notices the "Daily Active Users" metric has dropped to zero on the dashboard. Without lineage, debugging requires manually reading hundreds of SQL scripts. With lineage, the analyst traces the DAG backwards visually, instantly identifying that the upstream TICK1stg_stripe_paymentsTICK1 table failed to update this morning.

## 2. How Lineage is Captured
Capturing lineage across disparate tools is mathematically complex.

- **SQL Parsing**: Tools parse the raw SQL queries executed in the warehouse. If the SQL is TICK1INSERT INTO target SELECT * FROM sourceTICK1, the parser mathematically draws an edge from TICK1sourceTICK1 to TICK1targetTICK1.
- **Orchestrator APIs**: Tools like dbt inherently know their lineage because they compile the DAG to run the code. dbt generates a TICK1manifest.jsonTICK1 file that explicitly maps the entire lineage graph.
- **OpenLineage Standard**: An open-source framework. Instead of trying to parse SQL after the fact, systems (like Spark, Flink, and Airflow) natively emit JSON events to an OpenLineage backend every time a job runs, declaring exactly what inputs they read and what outputs they wrote.

Data Lineage is visually surfaced to the organization via **Data Catalogs** (like DataHub or Alation), bringing strict mathematical observability to the data pipeline.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data marts/index.mdx': `---
title: Data Marts
description: Highly-specialized, subject-oriented subsets of a Data Warehouse designed for specific business departments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Marts">

When an enterprise builds a massive, centralized Data Warehouse, it often contains thousands of tables spanning every aspect of the business (Finance, HR, Engineering, Marketing). 

If a Marketing Analyst simply wants to calculate the ROI of an ad campaign, querying the massive core warehouse is intimidating, mathematically complex (requiring 15 table JOINs), and dangerous (they might accidentally query sensitive HR salary data).

The architectural solution is the **Data Mart**.

## 1. Architecture of a Data Mart
A Data Mart is a mathematically isolated subset of the Data Warehouse, engineered specifically for a single business unit (e.g., a "Marketing Data Mart" or a "Finance Data Mart").

- **Aggregated & Denormalized**: While the core Enterprise Data Warehouse (EDW) is highly normalized (3NF) to ensure data integrity, the Data Mart is typically heavily denormalized (using a Star Schema). This pre-calculates massive JOINs, allowing analysts to query the data instantly.
- **Security & Access**: The HR Data Mart physically restricts access, guaranteeing that only HR employees can mathematically query the sensitive tables.

## 2. Top-Down vs Bottom-Up Design
The data engineering industry spent decades fighting over how Data Marts should be mathematically constructed.

### Inmon Approach (Top-Down)
Bill Inmon theorized that the enterprise must first build a colossal, perfectly normalized, single-source-of-truth Data Warehouse. Once that massive architectural feat is complete, the Data Marts are mathematically derived by extracting specific subsets from the core warehouse. (Highly consistent, but takes years to build).

### Kimball Approach (Bottom-Up)
Ralph Kimball theorized that building a perfect central warehouse is impossible. Instead, you instantly build specific, denormalized Data Marts for each department based on immediate business needs (using Star Schemas with standard "Conformed Dimensions"). The Enterprise Data Warehouse is simply the mathematical union of all these individual Data Marts. (Fast to build, but harder to keep globally consistent).

## 3. Modern Context
In the modern era of Cloud Data Warehouses (Snowflake, BigQuery) and dbt (Data Build Tool), the physical separation of Data Marts is often unnecessary. 
Instead of copying data to separate physical servers, modern engineers simply create highly-optimized **Materialized Views** or separate schema namespaces within the same Snowflake cluster, granting the Marketing team access only to the TICK1marketing_martTICK1 schema.

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
