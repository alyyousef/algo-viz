import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '21. Databases - Fundamentals/SQL/index.mdx': `---
title: SQL (Structured Query Language)
description: The standard language for dealing with Relational Databases.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SQL (Structured Query Language)">

SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It is particularly useful in handling structured data, i.e., data incorporating relations among entities and variables.

<Callout icon="info" title="ACID Properties">
  Relational databases using SQL almost universally guarantee **ACID** transactions:
  - **A**tomicity: All or nothing.
  - **C**onsistency: Data is always valid according to defined rules.
  - **I**solation: Concurrent transactions do not interfere with each other.
  - **D**urability: Once committed, data is permanently saved.
</Callout>

## Normalization

The core philosophy of SQL database design is **Normalization**—organizing data to reduce redundancy and improve data integrity.

<ComparisonTable 
  headers={['Normal Form', 'Rule']}
  rows={[
    ['1NF (First)', 'Each column must contain atomic (indivisible) values. No repeating groups.'],
    ['2NF (Second)', 'Must be 1NF. All non-key attributes must depend on the *entire* primary key.'],
    ['3NF (Third)', 'Must be 2NF. All attributes must depend *only* on the primary key (no transitive dependencies).']
  ]}
/>

## Example: Joins

The power of SQL comes from linking normalized tables together using \`JOIN\` clauses.

\`\`\`sql
-- Fetch all Users and their associated Orders
SELECT 
    users.id, 
    users.name, 
    orders.total_amount, 
    orders.created_at
FROM users
-- INNER JOIN only returns rows where there is a match in BOTH tables
INNER JOIN orders 
    ON users.id = orders.user_id
WHERE users.status = 'active'
ORDER BY orders.created_at DESC;
\`\`\`

## Common SQL Engines

<ArchitectureDiagram chart={\`
graph TD
  SQL[SQL Language]
  
  subgraph Open Source
    PG[(PostgreSQL)]
    My[(MySQL)]
    Lite[(SQLite)]
  end
  
  subgraph Enterprise
    Oracle[(Oracle DB)]
    MS[(SQL Server)]
  end
  
  SQL -. Implemented by .-> PG
  SQL -. Implemented by .-> My
  SQL -. Implemented by .-> Oracle
\`} />

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/NoSQL/index.mdx': `---
title: NoSQL
description: A broad class of database management systems that do not use the traditional tabular relations used in relational databases.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="NoSQL">

NoSQL (originally referring to "non-SQL" or "non-relational") encompasses a wide variety of database technologies that were developed in response to the demands presented by modern applications: large volumes of rapidly changing, unstructured data, and the need for massive horizontal scalability.

<Callout icon="warning" title="Eventual Consistency">
  Unlike SQL databases which strictly enforce ACID properties, many NoSQL databases trade strict consistency for high availability and partition tolerance (BASE properties), leading to **Eventual Consistency**—meaning if no new updates are made, eventually all accesses will return the last updated value.
</Callout>

## Types of NoSQL Databases

NoSQL is not a single type of database, but rather an umbrella term for four distinct categories.

<ComparisonTable 
  headers={['Type', 'How Data is Stored', 'Best Use Case', 'Example']}
  rows={[
    ['Document', 'JSON/BSON like documents.', 'Content management, user profiles, rapidly changing schemas.', 'MongoDB, Couchbase'],
    ['Key-Value', 'Simple dictionary (Hash map).', 'Caching, session management, shopping carts.', 'Redis, DynamoDB'],
    ['Column-Family', 'Rows have many columns, grouped into families.', 'Time-series data, IoT, massive write-heavy logs.', 'Cassandra, HBase'],
    ['Graph', 'Nodes (entities) and Edges (relationships).', 'Social networks, recommendation engines, fraud detection.', 'Neo4j']
  ]}
/>

## Horizontal Scalability (Sharding)

NoSQL databases are typically designed to scale *Out* (adding more cheap servers) rather than scaling *Up* (buying one massive expensive server).

<ArchitectureDiagram chart={\`
graph TD
  App[Application]
  Router[Query Router]
  
  subgraph Sharded Cluster (e.g. MongoDB)
    ShardA[(Shard A\\nUsers A-M)]
    ShardB[(Shard B\\nUsers N-Z)]
  end
  
  App --> Router
  Router -- Hash(User_ID) --> ShardA
  Router -- Hash(User_ID) --> ShardB
\`} />

## Example: A Document (MongoDB)

Instead of normalizing data across 3 tables (Users, Addresses, Phone Numbers), Document databases prefer denormalization (embedding data).

\`\`\`json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice Smith",
  "age": 28,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "tags": ["premium", "newsletter"]
}
\`\`\`

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/21.1 Relational Databases/MySQL/index.mdx': `---
title: MySQL
description: The world's most popular open-source relational database management system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="MySQL">

MySQL is an open-source relational database management system (RDBMS) backed by Oracle. For over two decades, it has been the default database for web applications, forming the "M" in the ubiquitous LAMP stack (Linux, Apache, MySQL, PHP).

<Callout icon="tip" title="InnoDB Storage Engine">
  MySQL supports pluggable storage engines, but **InnoDB** is the default and most important one. It provides ACID-compliant transaction features, row-level locking, and foreign key constraints.
</Callout>

## MySQL vs PostgreSQL

The two titans of open-source relational databases are often compared.

<ComparisonTable 
  headers={['Feature', 'MySQL', 'PostgreSQL']}
  rows={[
    ['Focus', 'Speed, reliability, and ease of use (especially for read-heavy web apps).', 'Strict standards compliance, advanced data types, and data integrity.'],
    ['JSON Support', 'Basic JSON functions.', 'Incredible JSONB support, indexable JSON.'],
    ['Extensibility', 'Limited.', 'Highly extensible (custom types, functions, PostGIS).']
  ]}
/>

## Example: Creating a Table

MySQL uses standard SQL syntax but has specific types like \`AUTO_INCREMENT\` for primary keys.

\`\`\`sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE DEFAULT CURRENT_DATE,
    department_id INT,
    
    -- Foreign key constraint
    FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;
\`\`\`

## Architecture: Replication

MySQL is incredibly famous for its Master-Slave (Primary-Replica) replication architecture to scale out read operations.

<ArchitectureDiagram chart={\`
graph TD
  App[Web Application]
  
  Primary[(Primary DB\\nReads & Writes)]
  Replica1[(Read Replica 1)]
  Replica2[(Read Replica 2)]
  
  App -- Write (INSERT/UPDATE) --> Primary
  App -. Read (SELECT) .-> Replica1
  App -. Read (SELECT) .-> Replica2
  
  Primary -- Async Binlog Sync --> Replica1
  Primary -- Async Binlog Sync --> Replica2
\`} />

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/21.5 Search Engines - Search Databases/Elasticsearch/index.mdx': `---
title: Elasticsearch
description: A distributed, RESTful search and analytics engine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Elasticsearch">

Elasticsearch is a highly scalable open-source full-text search and analytics engine. It allows you to store, search, and analyze big volumes of data quickly and in near real-time. It is generally used as the underlying engine/technology that powers applications that have complex search features and requirements (like e-commerce product search or log analytics).

<Callout icon="info" title="The ELK Stack">
  Elasticsearch is the heart of the "ELK Stack" (Elasticsearch, Logstash, Kibana), which is the industry standard for centralized logging and observability.
</Callout>

## The Inverted Index

Standard databases are terrible at full-text search (e.g., searching for the word "apple" inside a 5,000-word blog post). Elasticsearch solves this using an **Inverted Index**.

<ComparisonTable 
  headers={['Concept', 'How it works']}
  rows={[
    ['Forward Index (Standard DB)', 'Maps a Document ID to a list of words. To find a word, you must scan every document.'],
    ['Inverted Index (Elasticsearch)', 'Maps every unique Word to a list of Document IDs that contain that word. Lookups are instant (O(1)).']
  ]}
/>

## Example: REST API

Unlike SQL databases, Elasticsearch is interacted with entirely via HTTP REST APIs using JSON.

\`\`\`json
// POST /products/_search
// Search for products containing "laptop" in the title, priced under $1000
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "laptop" } }
      ],
      "filter": [
        { "range": { "price": { "lte": 1000 } } }
      ]
    }
  }
}
\`\`\`

## Architecture

Elasticsearch is distributed by nature. Data is stored in **Indices**, which are divided into **Shards**, which are distributed across **Nodes**.

<ArchitectureDiagram chart={\`
graph TD
  Client[Client Application]
  
  subgraph Elasticsearch Cluster
    Node1[Node 1\\n(Primary Shard 0)]
    Node2[Node 2\\n(Replica Shard 0)]
    Node3[Node 3\\n(Primary Shard 1)]
  end
  
  Client -- HTTP JSON --> Node1
  Client -- HTTP JSON --> Node2
  
  Node1 -. syncs to .-> Node2
\`} />

</TechnologyTemplate>
`,
  '22. Data Engineering/Apache Spark/index.mdx': `---
title: Apache Spark
description: A unified analytics engine for large-scale data processing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Apache Spark">

Apache Spark is an open-source, distributed processing system used for big data workloads. It utilizes in-memory caching and optimized query execution for fast analytic queries against data of any size. It is the modern successor to Hadoop MapReduce.

<Callout icon="tip" title="In-Memory Processing">
  Spark is famously up to 100x faster than Hadoop MapReduce because it processes data in RAM (Random Access Memory) rather than writing intermediate results back to physical hard drives between every step.
</Callout>

## Core APIs

<ComparisonTable 
  headers={['API', 'Description', 'Use Case']}
  rows={[
    ['RDD (Resilient Distributed Dataset)', 'The fundamental, low-level data structure of Spark. A fault-tolerant collection of elements partitioned across the cluster.', 'Legacy code, or when you need extreme low-level control.'],
    ['DataFrames & Datasets', 'Higher-level APIs organized into named columns (like a table). Powered by the Catalyst Optimizer.', '99% of modern Spark workloads. Data manipulation and SQL queries.'],
    ['Spark Streaming', 'Micro-batch processing for real-time data streams.', 'Processing Kafka streams in near real-time.']
  ]}
/>

## Example: PySpark

Spark can be written in Scala, Java, SQL, or Python (PySpark). PySpark is incredibly popular among Data Scientists.

\`\`\`python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

# Initialize Spark Session
spark = SparkSession.builder.appName("SalesAnalysis").getOrCreate()

# Load a massive 500GB CSV file from an S3 bucket
df = spark.read.csv("s3://bucket/sales_data.csv", header=True, inferSchema=True)

# Perform distributed transformation and aggregation
high_value_sales = df.filter(col("amount") > 1000) \\
                     .groupBy("region") \\
                     .sum("amount")

# Trigger the action and write the result back to disk
high_value_sales.write.parquet("s3://bucket/high_value_sales.parquet")
\`\`\`

## Architecture

Spark utilizes a Master-Worker architecture. 

<ArchitectureDiagram chart={\`
graph TD
  Driver[Driver Program\\n(SparkContext)]
  ClusterManager{Cluster Manager\\n(YARN / Kubernetes)}
  
  subgraph Worker Nodes
    Worker1[Worker Node 1\\n(Executors + Tasks)]
    Worker2[Worker Node 2\\n(Executors + Tasks)]
    Worker3[Worker Node 3\\n(Executors + Tasks)]
  end
  
  Driver -- Requests Resources --> ClusterManager
  ClusterManager -- Allocates --> Worker1
  ClusterManager -- Allocates --> Worker2
  ClusterManager -- Allocates --> Worker3
  
  Driver -. Sends Code & Tasks .-> Worker1
  Driver -. Sends Code & Tasks .-> Worker2
\`} />

</TechnologyTemplate>
`,
}

async function generateData() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateData().catch(console.error)
