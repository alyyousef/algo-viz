import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/22. Data Engineering/ETL/index.mdx': `---
title: ETL (Extract, Transform, Load)
description: "The traditional data integration process of extracting data from source systems, transforming it into a structured format, and loading it into a data warehouse."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="ETL (Extract, Transform, Load)">

**ETL** is the traditional paradigm for moving data from operational databases (like PostgreSQL or MongoDB) into a centralized Data Warehouse for analytics and business intelligence.

## 1. The Three Phases
1. **Extract**: Pulling raw data from various disparate sources (REST APIs, SQL databases, CSV files, SaaS platforms like Salesforce).
2. **Transform**: The heavy lifting. This happens in a dedicated staging area or ETL server *before* the data reaches the warehouse. Tasks include:
   - Cleansing (removing nulls or duplicates).
   - Formatting (converting timestamps to a standard timezone).
   - Joining (merging user data with transaction data).
   - Aggregating (calculating daily sales totals).
3. **Load**: Inserting the heavily processed, highly structured data into the target Data Warehouse (like Teradata or early Redshift).

## 2. Why was ETL the standard?
Historically, Data Warehouses were incredibly expensive, tightly coupled appliances where computing power and storage were billed together. Storage was expensive, and analytical compute was precious. 
Therefore, you couldn't afford to load messy, raw data into the warehouse. You had to transform it on a separate, cheaper server first, and only load the perfectly structured, compressed final tables.

<Callout icon="warning" title="The Bottleneck">
Because transformation happens *before* loading, the ETL server often becomes a massive computational bottleneck. Furthermore, if a data scientist suddenly wants to analyze a raw field that was filtered out during the Transform phase, the data engineering team has to rewrite the entire pipeline to include it.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/ELT/index.mdx': `---
title: ELT (Extract, Load, Transform)
description: "The modern data integration process where raw data is loaded directly into a data warehouse or lake, and transformations occur inside the target system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="ELT (Extract, Load, Transform)">

**ELT** represents a massive paradigm shift in Data Engineering, brought about by the rise of cheap cloud storage and highly scalable cloud data warehouses (like Snowflake and BigQuery).

## 1. How ELT Works
1. **Extract**: Pull raw data from source systems (often using automated tools like Fivetran or Airbyte).
2. **Load**: Dump the completely raw, unstructured, or semi-structured data (JSON, Parquet) directly into the Data Warehouse or Data Lake immediately.
3. **Transform**: Use the massive, elastic computing power of the Data Warehouse itself to run SQL queries that transform the raw data into clean, aggregated models (often using tools like **dbt**).

## 2. Why ELT Won
Cloud Data Warehouses decoupled compute from storage. You can store petabytes of raw data for pennies (cheap storage). When you need to transform it, you can instantly spin up a massive cluster of servers for 5 minutes, run the SQL transformation, and shut the cluster down (elastic compute).

## 3. ETL vs ELT

<ComparisonTable 
  headers={['Feature', 'ETL (Traditional)', 'ELT (Modern)']} 
  rows={[
    ['Transformation Location', 'Separate staging server before the warehouse.', 'Inside the warehouse itself.'],
    ['Flexibility', 'Low. If raw data is dropped, it is gone forever.', 'High. Raw data is always preserved; you can re-transform anytime.'],
    ['Time to Load', 'Slow (must wait for transforms).', 'Fast (dump immediately).'],
    ['Tooling', 'Informatica, Talend.', 'Fivetran, Airbyte, dbt, Snowflake.']
  ]} 
/>

<Callout icon="tip" title="dbt (data build tool)">
The shift to ELT birthed **dbt**, the industry standard for the "T" in ELT. It allows data analysts to write simple SQL SELECT statements, which dbt compiles into complex transformation pipelines running directly inside Snowflake or BigQuery.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data warehouses/index.mdx': `---
title: Data Warehouses
description: "A centralized repository optimized for analyzing highly structured, relational data from disparate sources."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Data Warehouses">

A **Data Warehouse (DWH)** is a specialized database designed exclusively for **OLAP** (Online Analytical Processing) workloads—meaning it is optimized for scanning millions of rows to calculate sums and averages, rather than looking up single rows quickly (OLTP).

## 1. Core Architecture
- **Columnar Storage**: Unlike transactional databases (PostgreSQL) which store data row-by-row, warehouses (Snowflake, BigQuery, Redshift) store data column-by-column. If you run TICK1SELECT SUM(revenue) FROM salesTICK1, the engine only reads the revenue column from disk, entirely ignoring the other 50 columns. This makes analytics exponentially faster.
- **Structured Data**: Warehouses strictly enforce schema-on-write. Data must fit into predefined relational tables with strict data types.

## 2. Cloud Data Warehouses
The modern era is defined by Cloud Data Warehouses, specifically architecture that **decouples storage and compute**:
- **Storage** is kept in cheap object storage (like AWS S3).
- **Compute** is handled by clusters of virtual machines that can be spun up in seconds.
This means you can store petabytes of data cheaply, and only pay for compute when you actually run a query.

## 3. Popular Solutions
- **Amazon Redshift**: The first major cloud warehouse. Initially tightly coupled, but moving towards decoupled.
- **Google BigQuery**: Serverless. You don't manage clusters at all; you just write SQL and Google provisions thousands of machines in the background to run it in seconds.
- **Snowflake**: The pioneer of fully decoupled storage/compute across multiple clouds (AWS, GCP, Azure).

<Callout icon="warning" title="Not for Unstructured Data">
Data Warehouses are incredible for tabular data (sales, users, clicks), but they are terrible for unstructured data like images, audio files, or massive, deeply nested raw JSON dumps. For that, you need a Data Lake.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Data lakes/index.mdx': `---
title: Data Lakes
description: "A massive, centralized storage repository that holds vast amounts of raw data in its native, untransformed format."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Data Lakes">

If a Data Warehouse is a meticulously organized filing cabinet, a **Data Lake** is a giant warehouse floor where you dump boxes of every possible shape and size.

A Data Lake is typically built on cheap cloud object storage (like **AWS S3**, **Azure Data Lake Storage**, or **Google Cloud Storage**).

## 1. Schema-on-Read
In a warehouse, you must define the schema *before* you insert the data (Schema-on-Write). 
In a Data Lake, you simply dump the raw files (CSV, JSON, Parquet, images, server logs). You only apply a schema or structure when you actually try to read or analyze the data later (Schema-on-Read).

## 2. Why build a Data Lake?
- **Infinite, Cheap Storage**: Object storage is incredibly cheap. You can store petabytes of historical logs "just in case" you need them for a machine learning model 3 years from now.
- **Unstructured Data**: It is the only place to store unstructured data (videos, PDFs, raw IoT sensor dumps) required by Data Scientists for training deep learning models.

## 3. Data Lake vs Data Warehouse

<ComparisonTable 
  headers={['Metric', 'Data Warehouse', 'Data Lake']} 
  rows={[
    ['Data Type', 'Structured, relational (Tables).', 'Structured, Semi-structured, Unstructured (Files).'],
    ['Processing', 'Schema-on-Write (ETL).', 'Schema-on-Read (ELT).'],
    ['Storage Cost', 'Higher.', 'Extremely Low.'],
    ['Primary Users', 'Business Analysts (SQL, BI Dashboards).', 'Data Scientists, Data Engineers (Python, Spark).']
  ]} 
/>

<Callout icon="warning" title="The Data Swamp">
Because it is so easy to dump data into a lake, they frequently devolve into "Data Swamps"—unmanageable, undocumented, massive collections of files where nobody knows what the data means, how old it is, or if it is accurate. Strong metadata management and data governance are required.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Lakehouses/index.mdx': `---
title: Data Lakehouses
description: "A modern data architecture that combines the cheap storage and flexibility of Data Lakes with the performance and ACID transactions of Data Warehouses."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Data Lakehouses">

Historically, companies had to maintain both a Data Lake (for raw/unstructured data and machine learning) and a Data Warehouse (for fast BI reporting). This required building complex, fragile ETL pipelines to copy data from the Lake into the Warehouse.

The **Data Lakehouse** is an architectural paradigm designed to eliminate this duality by providing warehouse-like features directly on top of the cheap data lake storage.

## 1. How the Lakehouse Works
The key enabler of the Lakehouse architecture is the **Open Table Format**. Instead of just dumping raw Parquet files into S3, you use a metadata layer that sits on top of those files. 

This metadata layer tracks exactly which files belong to which table, what the schema is, and what data has changed, allowing for:
- **ACID Transactions**: You can safely run TICK1UPDATETICK1 and TICK1DELETETICK1 statements on data sitting in S3 without corrupting the files.
- **Time Travel**: You can query the database as it looked exactly 3 days ago.
- **Schema Evolution**: You can safely add or drop columns.

## 2. The Big Three Open Table Formats
1. **Apache Iceberg**: Originally developed by Netflix. Highly adopted industry standard, massive ecosystem support (Snowflake, BigQuery, AWS Athena).
2. **Delta Lake**: Created by Databricks. The foundation of the Databricks Lakehouse platform.
3. **Apache Hudi**: Originally developed by Uber. Focuses heavily on streaming data and fast upserts.

## 3. The End Goal
With a Lakehouse, your data sits exactly once in cheap AWS S3 storage (using Iceberg or Delta formats). 
- Your Data Scientists can read those files directly using Apache Spark for Machine Learning.
- Your Business Analysts can point a SQL engine (like Trino or Snowflake) directly at those same files for fast BI dashboards.
- Zero data copying is required.

<Callout icon="tip" title="Databricks">
The term "Lakehouse" was heavily popularized by **Databricks**, whose entire business model revolves around providing a unified compute platform on top of Delta Lake storage.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Batch processing/index.mdx': `---
title: Batch Processing
description: "The execution of data processing jobs on a large, bounded dataset at scheduled intervals."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Batch Processing">

**Batch Processing** is the traditional method of processing high volumes of data. Instead of processing data the moment it arrives, the system collects data over a period of time (e.g., an hour, a day, a week) and processes it all at once as a single "batch".

## 1. Characteristics of Batch Processing
- **Bounded Data**: The dataset has a strict, known beginning and end (e.g., "All log files generated on October 4th").
- **High Latency**: The results are not available immediately. You must wait for the schedule to trigger and the job to finish.
- **High Throughput**: Batch processing is highly efficient because you can process terabytes of data across thousands of machines simultaneously.

## 2. Typical Use Cases
- **Nightly ETL/ELT Jobs**: Reading all transactions from the day, aggregating total daily revenue, and updating the BI dashboard at 2:00 AM.
- **Payroll Processing**: Calculating salaries, taxes, and deductions for all employees on the 30th of the month.
- **Machine Learning Training**: Scanning 5 years of historical data to train a new recommendation algorithm.

## 3. Orchestration
Because batch jobs often depend on one another (e.g., "Wait for Job A to finish extracting data before Job B starts transforming it"), Data Engineers use orchestrators to manage these dependencies as **Directed Acyclic Graphs (DAGs)**.

The absolute industry standard for batch orchestration is **Apache Airflow**, though modern alternatives like **Dagster** and **Prefect** are gaining popularity.

<Callout icon="tip" title="The Trade-off">
Batch processing is significantly easier to engineer, debug, and maintain than stream processing. If your business doesn't *strictly require* sub-minute latency (e.g., if a dashboard that is 1 hour out of date is perfectly acceptable), you should always default to batch processing.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Stream processing/index.mdx': `---
title: Stream Processing
description: "The continuous, real-time processing of unbounded data exactly as it is generated or received."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Stream Processing">

While Batch processing waits for a bucket to fill up before pouring it out, **Stream Processing** involves drinking from the firehose. Data is treated as an **unbounded** (never-ending) stream of events that must be processed in real-time or near-real-time.

## 1. Core Architecture
Stream processing architectures are typically built around an event broker (like **Apache Kafka**).
1. **Producers**: Web servers or IoT devices instantly publish small events (e.g., "User clicked button", "Temperature changed") to a Kafka topic.
2. **Stream Processors**: Compute engines (like **Apache Flink**, **Kafka Streams**, or **Spark Streaming**) continuously read from Kafka, apply logic (filtering, alerting, rolling averages), and output the result.
3. **Consumers**: The transformed data is immediately pushed to a real-time dashboard or operational database.

## 2. The Hard Problems of Streaming
Stream processing introduces extreme complexity:
- **Out-of-Order Events**: What if an event generated at 10:00 AM on a mobile phone doesn't reach your server until 10:05 AM because the user went into a tunnel?
- **Windowing**: How do you calculate "Total clicks in the last 5 minutes" when the stream never ends? You must use Tumbling, Sliding, or Session windows.
- **State Management**: If your processor crashes, how do you recover the current running total without double-counting events?

## 3. Batch vs Streaming

<ComparisonTable 
  headers={['Metric', 'Batch Processing', 'Stream Processing']} 
  rows={[
    ['Data Scope', 'Bounded (known start and end).', 'Unbounded (never-ending).'],
    ['Latency', 'Hours or Days.', 'Milliseconds to Seconds.'],
    ['Complexity', 'Low to Medium (easy to re-run failures).', 'Extremely High (state recovery, out-of-order data).'],
    ['Use Case', 'Nightly revenue reports, Payroll.', 'Credit card fraud detection, Real-time Uber pricing.']
  ]} 
/>

<Callout icon="warning" title="Lambda & Kappa Architectures">
Historically, companies ran both Batch and Streaming systems side-by-side to guarantee both speed and accuracy (the **Lambda Architecture**). Today, modern stream engines like Apache Flink are so powerful they can handle both real-time streams and historical batch data using the exact same code (the **Kappa Architecture**).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/22. Data Engineering/Apache Spark/index.mdx': `---
title: Apache Spark
description: "An open-source, unified analytics engine for large-scale data processing, dominant in Data Engineering and Machine Learning."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Apache Spark">

**Apache Spark** is the undisputed king of distributed data processing. If you need to transform a 500-gigabyte CSV file, you can't do it on your laptop using Pandas—you will run out of RAM. You need to distribute that work across 20 different servers. Spark handles the complex coordination of dividing that work, executing it in parallel, and combining the results.

## 1. The Successor to Hadoop MapReduce
Before Spark, the industry used Hadoop MapReduce, which wrote intermediate data to physical hard drives between every single computation step. This was incredibly slow.
Spark revolutionized the industry by executing computations entirely **in-memory** (in RAM), making it up to 100x faster than MapReduce for certain workloads.

## 2. Core Concepts
- **Resilient Distributed Datasets (RDDs)**: The fundamental, low-level data structure of Spark. An immutable collection of objects partitioned across a cluster.
- **DataFrames**: The modern abstraction built on top of RDDs. Similar to Python Pandas or SQL tables, DataFrames allow you to manipulate distributed data using standard SQL or functional programming (TICK1.filter()TICK1, TICK1.groupBy()TICK1).
- **Driver and Executors**: A Spark application consists of a central **Driver** node (which figures out the execution plan) and dozens of **Executor** nodes (which actually hold the data in memory and run the computations).

## 3. The Spark Ecosystem
Spark is a unified engine containing multiple libraries:
- **Spark SQL**: For querying structured data using standard SQL syntax.
- **Spark Streaming**: For processing real-time data using micro-batches.
- **MLlib**: For distributed machine learning (training a random forest on a cluster of machines).

<Callout icon="tip" title="PySpark">
While Spark is written in Scala (a JVM language), the vast majority of modern Data Engineers interact with it using **PySpark**, a Python API that allows data scientists to write Python code that is translated into optimized distributed JVM execution plans.
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
