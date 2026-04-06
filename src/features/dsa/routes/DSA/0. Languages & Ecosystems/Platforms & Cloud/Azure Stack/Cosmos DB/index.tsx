import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { JSX, MouseEvent } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type NarrativeSection = {
  id: string
  heading: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pageTitle = 'Azure Cosmos DB'
const pageSubtitle =
  'Globally distributed, low-latency database service for NoSQL and compatible APIs with elastic scale and predictable throughput.'

const introParagraphs = [
  "Azure Cosmos DB is Microsoft's globally distributed database platform for operational workloads that need low latency, elastic horizontal scale, high availability, and flexible data models. In practice, most teams encounter it as Azure Cosmos DB for NoSQL, but the platform also exposes compatible APIs for MongoDB, Apache Cassandra, Apache Gremlin, and Table workloads.",
  'The defining architectural idea is that Cosmos DB is not just a database you place in one region and size once. It is a globally aware, partitioned, replicated system where request units, partition keys, consistency level, and region topology directly shape performance, cost, correctness, and availability. If those choices are weak, the application pays for them continuously.',
  'This page treats Azure Cosmos DB as a systems and platform topic: APIs and data models, databases and containers, partitioning, request units, provisioned versus autoscale versus serverless throughput, indexing, consistency levels, multi-region reads and writes, security and networking, change feed, analytical store, vector search, cost discipline, and the design tradeoffs that determine when Cosmos DB is the right database and when it is not.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Azure Cosmos DB is a distributed database engine exposed through Azure-managed accounts. Data is stored in containers and partitioned horizontally so throughput and storage can scale out. Replication across regions is a built-in platform capability rather than an add-on that teams stitch together manually.',
      'The service is designed around operational workloads that need predictable low latency, high availability, and elastic scale. That makes it different from a traditional single-node database, and also different from purely analytical systems. Cosmos DB is built for application-serving paths, event-driven systems, user-profile stores, catalogs, telemetry, session data, and globally distributed application state.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Cosmos DB when they need a managed distributed database without building partitioning, replication, global failover, and consistency behavior from scratch. The service is particularly attractive when the application footprint is global or when low-latency read and write behavior across regions matters more than classic relational features.',
      'It is also useful when the team wants schema-flexible JSON document storage with automatic indexing and first-class support for concepts like TTL, change feed, analytical store, or vector search in the NoSQL API. In those scenarios, Cosmos DB can act as both a high-scale operational database and a broader event and data-serving platform component.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The fastest way to misunderstand Cosmos DB is to treat it like a normal database with unusual pricing. The real mental model is a partitioned, replicated database where throughput is an explicit resource and partition key choice defines scale shape. If the partition key is poor, throughput is misallocated, or the consistency choice conflicts with latency goals, the design becomes expensive or brittle even if queries look simple.',
      'A healthy Cosmos DB design starts with access patterns, tenant patterns, item shapes, partition boundaries, write rates, consistency needs, multi-region topology, and failure assumptions. Only after those are clear should you decide on autoscale, serverless, indexing customization, or advanced features such as analytical store and vector search.',
    ],
  },
  {
    title: 'Core platform model',
    paragraphs: [
      'The main Azure boundary is the Cosmos DB account. Under that account you create databases and then containers. Containers are the most important unit for storage, indexing, partitioning, throughput, and query behavior. Items live in containers, and a partition key maps those items into logical partitions that the service then places on physical partitions internally.',
      'The service supports multiple APIs. Azure Cosmos DB for NoSQL is the native document model with SQL-like querying, automatic indexing, and the broadest platform surface for modern features. Other APIs provide compatibility patterns for MongoDB, Cassandra, Gremlin, and Table workloads. The right API is a product decision, not just a client-library choice.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      'Current Microsoft documentation highlights several platform directions that matter now. Vector search in Azure Cosmos DB for NoSQL is now documented as a first-class capability with vector policies and DiskANN-based indexing options. Analytical-store documentation also now points readers toward Cosmos DB Mirroring for Microsoft Fabric as generally available for downstream analytics scenarios.',
      "Operationally, autoscale and serverless guidance continues to be refined, and Microsoft's latest docs emphasize that serverless performance behaves differently from provisioned throughput accounts and that autoscale is particularly useful for variable or spiky workloads. Those are not marketing nuances; they affect how you provision and budget real systems.",
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Account is the global and regional boundary',
    detail:
      'The Cosmos DB account defines API family, region topology, default consistency, networking posture, and many security and replication settings.',
  },
  {
    title: 'Container is the main workload boundary',
    detail:
      'Partition key, indexing policy, item model, throughput allocation, TTL, and many performance properties live at the container layer.',
  },
  {
    title: 'Partition key is the scale contract',
    detail:
      'The partition key determines how data and throughput distribute, which directly shapes RU efficiency, hot-partition risk, and query behavior.',
  },
  {
    title: 'RU/s is the throughput currency',
    detail:
      'Request units abstract CPU, memory, and I/O cost for operations. The service is intentionally explicit about throughput rather than hiding it behind only instance sizing.',
  },
  {
    title: 'Consistency is a first-class design choice',
    detail:
      'Strong, bounded staleness, session, consistent prefix, and eventual consistency each trade off latency, throughput, and programming simplicity differently.',
  },
]

const fitGuide = [
  {
    title: 'Need low-latency globally distributed operational data with horizontal scale',
    choice: 'Azure Cosmos DB is a strong fit.',
  },
  {
    title: 'Need schema-flexible JSON with automatic indexing and managed replication',
    choice: 'Cosmos DB for NoSQL is often a natural choice.',
  },
  {
    title:
      'Need relational joins, strict schemas, and classic relational transactions across many entities',
    choice: 'A relational database may be a better fit than Cosmos DB.',
  },
  {
    title: 'Need throughput that varies sharply and unpredictably',
    choice: 'Autoscale or serverless Cosmos DB may fit well depending on workload shape.',
  },
  {
    title:
      'Need globally replicated reads close to users and application-managed consistency semantics',
    choice: 'Cosmos DB is specifically designed for that space.',
  },
  {
    title: 'Need a simple low-cost database without global distribution or partitioning complexity',
    choice: 'Cosmos DB may be more platform and more cost surface than necessary.',
  },
]

const keyTakeaways = [
  'Cosmos DB is a partitioned, replicated database platform, not just a document database with unusual billing.',
  'Partition key design is one of the most important choices in the entire architecture.',
  'Request units, consistency level, and region topology are core system-design variables, not operational details.',
  'The NoSQL API has the richest modern feature surface, including indexing controls, analytical store, change feed, and vector search.',
  'Most Cosmos DB production pain comes from weak partitioning strategy, poor RU planning, or misunderstanding of multi-region and consistency tradeoffs.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-apis',
    heading: 'APIs, Data Models, and Choosing the Right Cosmos DB Surface',
    paragraphs: [
      "Azure Cosmos DB exposes multiple APIs because different workloads arrive with different query models and client expectations. Azure Cosmos DB for NoSQL is the native API and generally the richest feature surface for new designs. It stores JSON items, uses SQL-like querying over documents, and is the place where most of the platform's newer capabilities appear first.",
      "The platform also offers compatible APIs for MongoDB, Apache Cassandra, Apache Gremlin, and Table scenarios. Those compatibility layers can reduce migration friction or let teams preserve a familiar programming model, but they are still running on Cosmos DB's distributed substrate and operational model. Compatibility does not mean every ecosystem assumption behaves identically to the original product.",
      "The practical rule is to choose the API that matches the application's real model and migration constraints, not the one that merely avoids learning. For greenfield distributed document workloads, the NoSQL API is usually the cleanest default unless a strong existing ecosystem reason points elsewhere.",
    ],
  },
  {
    id: 'core-containers',
    heading: 'Databases, Containers, Items, and the True Unit of Scale',
    paragraphs: [
      'In Cosmos DB, containers are more important than databases. The database is mostly an organizational grouping. The container is where throughput, partitioning, indexing, TTL behavior, and most query-performance characteristics are defined. This is why container design deserves more attention than top-level database naming.',
      'Each item in a container is a document or record in the chosen API model, and each item must participate in the partitioning strategy. Containers can have dedicated throughput or share throughput at the database level, but the operational truth is still the same: the container is the main workload boundary.',
      'This means teams should not casually dump unrelated entities into one container unless the access patterns and partitioning logic truly align. A container is not just a bucket. It is an indexed, partitioned, RU-governed substrate with a real performance contract.',
    ],
  },
  {
    id: 'core-partitioning',
    heading: 'Partition Keys, Logical Partitions, Physical Partitions, and Hotspots',
    paragraphs: [
      'Partition key choice is one of the most important decisions in Cosmos DB. Items with the same partition-key value belong to the same logical partition. The service then maps logical partitions onto physical partitions as data and throughput grow. Good partitioning spreads both storage and request load. Bad partitioning creates hotspots, skewed RU consumption, and painful redesign work later.',
      'The right key is driven by access patterns. Good candidates usually have high cardinality, even request distribution, and align with frequent read or write operations. Poor candidates are low-cardinality values, monotonic time values used naively, or keys that send disproportionate traffic to a small subset of logical partitions.',
      'A common failure mode is picking the key based only on how the JSON looks instead of how the system behaves. Partition design is not about what field seems convenient. It is about how the workload will scale under real traffic and whether the busiest partitions can remain healthy as the product grows.',
    ],
  },
  {
    id: 'core-throughput',
    heading: 'Request Units, Provisioned Throughput, Autoscale, and Serverless',
    paragraphs: [
      "Cosmos DB measures database work in request units, or RUs. Reads, writes, queries, index maintenance, and consistency effects all consume RU budget. This explicit throughput model is unusual for teams coming from traditional databases, but it is one of Cosmos DB's clearest strengths because it makes scale and cost behavior more visible.",
      "Provisioned throughput gives a fixed RU budget. Autoscale adjusts throughput within configured bounds to better absorb variable workloads. Serverless removes preprovisioned throughput entirely and bills based on usage, but Microsoft's docs note that serverless has different performance expectations and is not simply provisioned throughput with a nicer billing label.",
      'Throughput mode should follow workload shape. Steady, predictable traffic often fits provisioned throughput. Bursty production systems often fit autoscale. Low-volume or unpredictable development and smaller workloads may fit serverless. The wrong mode usually shows up as either wasted spend or painful throttling under real traffic.',
    ],
  },
  {
    id: 'core-indexing',
    heading: 'Indexing Policy, Query Cost, and Why Default Indexing Is Not Always Enough',
    paragraphs: [
      'Cosmos DB automatically indexes data by default in the NoSQL API, which is one reason teams like it early on. Queries work quickly without a lot of manual index management. But as data models and workloads grow, the indexing policy becomes an important tuning surface because indexing everything has write and storage costs.',
      'A more mature design often customizes indexing so that expensive or irrelevant paths are excluded, while frequently queried fields remain indexed appropriately. The goal is not to disable indexing recklessly. The goal is to make index behavior reflect actual read patterns rather than paying for broad indexing you do not benefit from.',
      'The practical lesson is that RU cost is not just a query issue. Index design, item size, write volume, and consistency choices all shape the RU budget. Teams that ignore indexing policy in serious workloads eventually pay for that omission through inflated write costs or unnecessarily complex query behavior.',
    ],
  },
  {
    id: 'core-consistency',
    heading: 'Consistency Levels and the Latency-Correctness Tradeoff',
    paragraphs: [
      "Cosmos DB exposes five consistency levels: strong, bounded staleness, session, consistent prefix, and eventual. This is one of the platform's defining features because it lets teams express consistency requirements directly rather than accepting a single behavior everywhere.",
      'Session consistency is a common default for application workloads because it provides read-your-writes behavior for a client session without the full global cost of strong consistency. Strong consistency gives the simplest mental model but can raise latency and limit some region-topology choices. Eventual and consistent prefix offer weaker guarantees that can improve performance for workloads tolerant of temporary divergence.',
      'The mistake is choosing a level by intuition alone. Consistency should follow real correctness needs: do users need immediate read-your-writes behavior, can feeds lag slightly, do financial or inventory semantics require stronger guarantees, and how do those answers change across regions? The wrong consistency setting can either overpay for guarantees you do not need or quietly violate business assumptions you do need.',
    ],
  },
  {
    id: 'core-global',
    heading: 'Multi-Region Reads, Multi-Region Writes, Failover, and Global Distribution',
    paragraphs: [
      "One of Cosmos DB's strongest differentiators is built-in global distribution. Accounts can replicate across multiple Azure regions, place reads close to users, and optionally support writes in more than one region. This means global topology is a normal configuration concern rather than a custom engineering project.",
      'But global distribution introduces real design choices. Failover policy, read region placement, write region count, and consistency level interact. Multi-region writes can improve resilience and write locality, but they also require more careful reasoning about conflict behavior and application assumptions. Even with managed failover, the application still needs to understand what correctness guarantees it expects during regional disruption.',
      'The right model depends on business posture. If one primary region with fast failover is enough, keep the design simple. If users truly need globally local writes and business continuity across region loss, then multi-region writes and a stronger geo design may be justified. Cosmos DB makes those options available, but it does not choose the right tradeoff for you.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, Entra Integration, Keys, RBAC, and Network Isolation',
    paragraphs: [
      'Cosmos DB security spans identities, keys, role assignment, and networking. Modern designs should strongly prefer Microsoft Entra-based access and managed identities for application access where possible rather than embedding account keys in application configuration. Shared secrets are easy to start with and easy to regret later.',
      'Role-based access control matters because distributed data platforms are often touched by many services and teams. Reader, writer, operator, backup, and analytics consumers should not all carry the same effective power. The more teams that interact with Cosmos DB, the more important it becomes to model access deliberately instead of using one broad credential everywhere.',
      'Network security is equally important. Private endpoints, firewall rules, and restricted ingress paths reduce exposure of the account. Without those controls, data protection depends too heavily on application credentials alone. The best Cosmos DB security posture is identity plus network isolation, not one or the other.',
    ],
  },
  {
    id: 'core-change-feed',
    heading: 'Change Feed, Event-Driven Processing, and Downstream Workflows',
    paragraphs: [
      'The Cosmos DB change feed is one of the most useful platform features for reactive architectures. It exposes ordered item changes within a container so downstream systems can project views, trigger workflows, sync search indexes, or drive event-processing pipelines without polling the full dataset repeatedly.',
      'This is powerful because it turns the operational database into a real event source for materialized views, analytics pipelines, and integration patterns. Instead of writing custom diff logic everywhere, teams can consume changes from the container and process them incrementally.',
      'Change feed does not eliminate the need for idempotency or replay-aware consumers. It gives you a structured stream of change events, but the downstream architecture still needs to handle duplicate processing, transient failures, and checkpoint semantics correctly.',
    ],
  },
  {
    id: 'core-analytical',
    heading: 'Analytical Store, HTAP Patterns, and Fabric Mirroring',
    paragraphs: [
      'Cosmos DB analytical store is designed for hybrid transactional and analytical processing patterns. It gives downstream analytical systems a columnar-optimized representation of operational data without making the transactional container carry every reporting workload directly. This matters because heavy analytics on the operational path is one of the fastest ways to ruin a database serving layer.',
      "Microsoft's latest documentation also points to Cosmos DB Mirroring in Microsoft Fabric as generally available. That reflects a broader platform direction: Cosmos DB should participate in analytical and lakehouse workflows without forcing the operational container to become the analytics engine itself.",
      'The design lesson is simple: operational reads and analytical reads are not the same problem. Analytical store, mirroring, or downstream export patterns exist so teams can separate those concerns cleanly.',
    ],
  },
  {
    id: 'core-ttl',
    heading: 'TTL, Data Retention, and Automatic Expiration',
    paragraphs: [
      'Time to live is a practical operational feature in Cosmos DB. It allows items to expire automatically after a configured interval, which is useful for sessions, caches, transient events, ephemeral user state, and retention-controlled data. TTL is one of the easiest ways to keep containers from growing indefinitely when the business model already knows data should age out.',
      'This matters because many operational stores quietly become archives by accident. TTL makes retention explicit and automated. That keeps the hot operational dataset closer to the data that actually matters now, which helps both cost and query behavior.',
      'Like any deletion automation, TTL must align with business expectations. You should not use TTL casually on data that may become important for compliance, support, or audit without a separate retention plan.',
    ],
  },
  {
    id: 'core-advanced',
    heading: 'Advanced NoSQL Features: Vector Search and Modern Retrieval Patterns',
    paragraphs: [
      'Azure Cosmos DB for NoSQL now documents vector search as a first-class capability, including vector embedding storage, vector policy configuration, and indexing strategies such as DiskANN for approximate nearest-neighbor retrieval. This is an important shift because it lets teams keep operational application data and vector-enabled retrieval patterns closer together when that architecture makes sense.',
      'The key design question is not whether vector search exists. It is whether the application benefits from combining vector retrieval with operational data in Cosmos DB or whether a separate retrieval system is the better fit. The feature is valuable, but like any advanced database feature it should follow a clear workload requirement, not novelty.',
      'More broadly, this shows Cosmos DB continuing to expand beyond simple document CRUD into a richer application-data platform. That can be very useful, but it also means teams should be clear about what they are optimizing for so the data model does not accumulate unrelated responsibilities by accident.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Drivers, RU Hygiene, and Capacity Discipline',
    paragraphs: [
      'Cosmos DB cost is mostly shaped by throughput, storage, region count, feature usage, and workload efficiency. Request units are the most visible driver, but RU cost itself is shaped by item size, indexing, query pattern, consistency level, and partition distribution. That means cost discipline is inseparable from data-model discipline.',
      'The most common cost mistake is overprovisioning throughput for a weak data model. The second most common is the opposite: underprovisioning and then discovering widespread throttling under production bursts. Both are symptoms of not understanding the actual RU profile of the workload.',
      'Healthy cost management in Cosmos DB means measuring real RU consumption, watching hot partitions, adjusting indexing thoughtfully, choosing the right throughput mode, and removing stale data with TTL or archival strategies where appropriate. The platform can be very efficient, but only when the model and workload align.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Partitioning aligned to access patterns',
    detail:
      'Pick a partition key that spreads both data and traffic while still aligning with the most common read and write paths.',
  },
  {
    title: 'Container boundaries by workload shape',
    detail:
      'Use separate containers when entities have materially different access patterns, throughput behavior, indexing needs, or retention logic.',
  },
  {
    title: 'Session consistency for user-centric apps',
    detail:
      'Use session consistency when users need read-your-writes behavior but strong global consistency is not worth the added cost and latency.',
  },
  {
    title: 'Change feed for projections and integration',
    detail:
      'Drive search indexes, notifications, analytical projections, and event workflows from change feed consumers rather than full-dataset polling.',
  },
  {
    title: 'Analytical separation for heavy reporting',
    detail:
      'Use analytical store or downstream analytical paths so reporting workloads do not consume the same RU budget as transactional queries.',
  },
  {
    title: 'Managed identity plus private access',
    detail:
      'Prefer Entra-based application access and private endpoints so secrets and open network exposure are not the default database security model.',
  },
]

const operationalChecklist = [
  'Choose the API model intentionally instead of defaulting to compatibility mode by habit.',
  'Design the partition key from actual access and scale patterns before loading production data.',
  'Measure RU usage for real queries and writes rather than estimating blindly.',
  'Select provisioned, autoscale, or serverless throughput based on traffic shape, not only on initial budget instinct.',
  'Review indexing policy once query patterns stabilize so write cost and query efficiency stay balanced.',
  'Pick a consistency level that matches correctness needs rather than choosing the strongest or weakest option by default.',
  'Design region topology and failover policy explicitly for the business continuity target.',
  'Use Entra ID, managed identity, RBAC, and private networking for the normal security posture.',
  'Test throttling, failover, and hot-partition behavior before declaring the system production ready.',
  'Use TTL, archival strategy, and container review to keep storage and RU spend from drifting upward unnoticed.',
]

const compareNotes = [
  {
    title: 'Cosmos DB vs relational databases',
    detail:
      'Relational systems are often better for complex joins, strict schemas, and traditional transactional modeling. Cosmos DB is stronger for globally distributed, partitioned, high-scale operational data.',
  },
  {
    title: 'Cosmos DB vs MongoDB-compatible self-managed clusters',
    detail:
      'Cosmos DB removes infrastructure management and adds Azure-native global distribution, but the compatibility model should be evaluated carefully against exact ecosystem expectations.',
  },
  {
    title: 'Cosmos DB vs Redis',
    detail:
      'Redis is an in-memory data structure store and cache, while Cosmos DB is a durable distributed database with persistence, partitioning, and broader query and replication semantics.',
  },
  {
    title: 'Cosmos DB vs Azure SQL Database',
    detail:
      'Azure SQL Database is the better default for many relational application domains. Cosmos DB is better when low-latency global scale and partitioned nonrelational access patterns are central.',
  },
  {
    title: 'Cosmos DB analytical store vs direct reporting queries',
    detail:
      'Analytical store exists so reporting and analytical workloads do not have to consume transactional RU budgets or overload the operational serving path.',
  },
]

const pitfalls = [
  'Choosing a weak partition key because it looked convenient in the JSON rather than because it fit the traffic pattern.',
  'Treating containers like generic folders instead of the real throughput and partitioning boundaries they are.',
  'Underestimating the RU cost of broad queries, large items, or over-indexed write-heavy workloads.',
  'Assuming global distribution automatically solves every availability or conflict concern without application design changes.',
  'Using account keys everywhere instead of moving applications to Entra-based access and managed identity.',
  'Letting one hot logical partition dominate traffic until throttling becomes a production incident.',
  'Running analytics or reporting directly on the transactional path when analytical store or downstream pipelines should exist.',
  'Choosing the strongest consistency level because it feels safest without verifying whether the workload actually needs it.',
  'Loading transient or session-like data indefinitely without TTL or cleanup strategy.',
  'Using Cosmos DB where a simpler relational or lower-scale database would solve the real problem more directly.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-container',
    title: 'Create a Cosmos DB for NoSQL container with a partition key',
    code: `az cosmosdb sql container create \\
  --account-name cdb-app-prod \\
  --resource-group rg-data-prod \\
  --database-name appdb \\
  --name orders \\
  --partition-key-path "/tenantId" \\
  --throughput 1000`,
    explanation:
      'This captures the most important operational truth in Cosmos DB: container creation and partition-key choice are foundational. The partition key determines how the workload scales and how RU budget is distributed long after the first deployment succeeds.',
  },
  {
    id: 'ex-item',
    title: 'Typical NoSQL item shape designed around a tenant partition',
    code: `{
  "id": "order-2026-000184",
  "tenantId": "tenant-42",
  "userId": "user-918",
  "status": "paid",
  "createdAt": "2026-03-13T14:20:00Z",
  "total": 149.90,
  "currency": "USD",
  "lines": [
    { "sku": "sku-100", "qty": 1, "price": 99.95 },
    { "sku": "sku-220", "qty": 1, "price": 49.95 }
  ]
}`,
    explanation:
      'This example shows an item shape that keeps the tenant as the partition anchor. It will not be the right key for every product, but it illustrates the idea that item structure and partition strategy must be designed together rather than separately.',
  },
  {
    id: 'ex-ttl',
    title: 'Enable TTL for ephemeral session-style data',
    code: `az cosmosdb sql container create \\
  --account-name cdb-app-prod \\
  --resource-group rg-data-prod \\
  --database-name appdb \\
  --name sessions \\
  --partition-key-path "/userId" \\
  --ttl 86400 \\
  --throughput 400`,
    explanation:
      'TTL is a practical hygiene tool for transient data. Instead of storing session-like state forever and paying to query and retain it indefinitely, the container can expire items automatically after one day.',
  },
  {
    id: 'ex-change-feed',
    title: 'Conceptual change-feed processor pattern',
    code: `while (processor.isRunning()) {
  const batch = await changeFeed.readNext()
  for (const item of batch.items) {
    await projectToSearchIndex(item)
    await publishDomainEvent(item)
  }
  await checkpoint(batch.continuation)
}`,
    explanation:
      'This illustrates the architectural use of change feed: capture incremental item changes and project them into search, analytics, or downstream workflows. The real implementation details vary by SDK, but the pattern is stable and central to many Cosmos DB designs.',
  },
]

const glossaryTerms = [
  {
    term: 'Cosmos DB Account',
    definition:
      'The top-level Azure resource that defines API family, regions, consistency defaults, networking, and security posture.',
  },
  {
    term: 'Container',
    definition:
      'The main operational boundary in Cosmos DB for items, partitioning, indexing, throughput, and many query behaviors.',
  },
  {
    term: 'Partition Key',
    definition:
      'The item property used to distribute data into logical partitions and shape horizontal scale behavior.',
  },
  {
    term: 'Logical Partition',
    definition: 'The grouping of all items sharing the same partition-key value.',
  },
  {
    term: 'Physical Partition',
    definition:
      'The underlying internal partition resource where Cosmos DB places data and RU capacity as the workload scales.',
  },
  {
    term: 'Request Unit (RU)',
    definition:
      'The normalized throughput currency that measures the cost of reads, writes, queries, and related operations in Cosmos DB.',
  },
  {
    term: 'Autoscale',
    definition:
      'A throughput mode that adjusts RU capacity within configured bounds to absorb variable workload demand.',
  },
  {
    term: 'Serverless',
    definition:
      'A Cosmos DB consumption model that bills based on usage without preprovisioned throughput, suited to lighter or bursty workloads with different performance expectations.',
  },
  {
    term: 'Consistency Level',
    definition:
      'The selected tradeoff model between correctness guarantees and latency, such as strong, session, or eventual consistency.',
  },
  {
    term: 'Change Feed',
    definition:
      'An ordered stream of item changes within a container used for projections, integration, and event-driven processing.',
  },
  {
    term: 'Analytical Store',
    definition:
      'A columnar analytical representation of Cosmos DB data intended for HTAP and downstream analytical workloads.',
  },
  {
    term: 'Vector Search',
    definition:
      'A Cosmos DB for NoSQL capability for storing vectors and executing similarity retrieval using vector indexing strategies.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/cosmos-db/introduction',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/choose-api',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/request-units',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/provision-throughput-autoscale',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/serverless',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/index-overview',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/change-feed-design-patterns',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/analytical-store-introduction',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/vector-search',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-configure-private-endpoints',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-grant-control-plane-role-based-access',
  'https://learn.microsoft.com/en-us/azure/cosmos-db/global-dist-under-the-hood',
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-apis', label: 'APIs' },
    { id: 'core-containers', label: 'Containers' },
    { id: 'core-partitioning', label: 'Partitioning' },
    { id: 'core-throughput', label: 'RU and Throughput' },
    { id: 'core-indexing', label: 'Indexing' },
    { id: 'core-consistency', label: 'Consistency' },
    { id: 'core-global', label: 'Global Distribution' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-change-feed', label: 'Change Feed' },
    { id: 'core-analytical', label: 'Analytical Store' },
    { id: 'core-ttl', label: 'TTL and Retention' },
    { id: 'core-advanced', label: 'Advanced Features' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-cosmos-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-cosmos-help-page .win98-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.azure-cosmos-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-cosmos-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-cosmos-help-page .win98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.azure-cosmos-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-cosmos-help-page .win98-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.azure-cosmos-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-cosmos-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-cosmos-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-cosmos-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-cosmos-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-cosmos-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-cosmos-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-cosmos-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-cosmos-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-cosmos-help-page .win98-content p,
.azure-cosmos-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-cosmos-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-cosmos-help-page .win98-content ul,
.azure-cosmos-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-cosmos-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-cosmos-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-cosmos-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-cosmos-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-cosmos-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-cosmos-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-cosmos-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureCosmosDbPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromSearch(location.search))

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const url = new URL(window.location.href)
    const nextSearch = new URLSearchParams(url.search)
    const shouldClearHash = url.hash.length > 0
    if (nextSearch.get('tab') !== activeTab || shouldClearHash) {
      nextSearch.set('tab', activeTab)
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel])

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)
    if (!currentHash) {
      return
    }

    const container = contentRef.current
    const target = document.getElementById(currentHash)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })
  }, [activeTab])

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) {
      return
    }

    setActiveTab(tabId)
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })

    const url = new URL(window.location.href)
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="azure-cosmos-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main ref={contentRef} className="win98-content">
            <h1 className="win98-doc-title">{pageTitle}</h1>
            <p className="win98-doc-subtitle">{pageSubtitle}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="win98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="win98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-model" className="win98-section">
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="win98-divider" />

                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-ops-checklist" className="win98-section">
                  <h2 className="win98-heading">Operational Checklist</h2>
                  <ul>
                    {operationalChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="win98-section">
                    <h2 className="win98-heading">{example.title}</h2>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-sources" className="win98-section">
                  <h2 className="win98-heading">Primary Sources</h2>
                  <p>
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure Cosmos DB features, throughput options, API
                    capabilities, and regional behavior can change, so production decisions should
                    always be revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
