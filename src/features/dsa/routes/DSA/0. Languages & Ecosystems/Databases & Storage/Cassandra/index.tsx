import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Apache Cassandra is a distributed wide-column database built for high availability, large-scale write-heavy workloads, and operation across multiple nodes without a single master. It is typically chosen when systems need predictable horizontal scaling, continuous availability, and tolerance for node or even data-center failure.',
  'The most useful way to think about Cassandra is not as a drop-in replacement for a relational database and not as a generic key-value store. It is a partitioned, replicated database whose data model is tightly connected to query patterns. You model tables around the reads and writes the application must perform, then use partition keys, clustering columns, and consistency levels to shape behavior.',
  'This page is intentionally thorough. It covers the distributed architecture, partition-based modeling, replication, tunable consistency, CQL tables, storage internals such as memtables and SSTables, compaction and repair, tombstones, lightweight transactions, and the operational tradeoffs that determine whether Cassandra is the right system for a workload.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cassandra is a distributed database designed to keep serving requests even when individual machines fail. Data is replicated across nodes, requests can be coordinated by multiple nodes, and the system is built to scale by adding more machines rather than pushing one central server harder.',
      'Its data model looks table-oriented on the surface, but the design philosophy is very different from a relational engine. Cassandra tables are not general-purpose relation containers for arbitrary joins. They are query-specific storage structures built around partition-local reads and high-throughput writes.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Cassandra Matters',
    paragraphs: [
      'Cassandra matters because some systems care more about availability, write throughput, and horizontal scale than about relational flexibility or ad hoc query power. When a service must accept large numbers of writes across many nodes and remain available during failures, Cassandra can be a strong architectural fit.',
      'It is especially relevant for globally distributed applications, time-series or event ingestion workloads, messaging and activity feeds, and operational systems where losing availability is more damaging than giving up rich relational queries.',
    ],
    bullets: [
      'Designed for no single point of failure.',
      'Strong fit for high-volume distributed writes.',
      'Scales horizontally by adding nodes.',
      'Supports replication across racks and data centers.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a replicated partitioned storage system where each table is designed around specific access patterns. Data is distributed by partition key, ordered within a partition by clustering columns, and replicated according to the keyspace strategy. Queries must align with that structure.',
      'That means Cassandra rewards up-front data modeling discipline. You do not start from normalization and ask the database to join later. You start from the reads and writes that must happen efficiently and design tables to make those operations cheap and local.',
    ],
    bullets: [
      'Think partition first, not table first.',
      'Think query-driven modeling, not join-driven modeling.',
      'Think replicated distributed system, not single-node database server.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Cassandra Optimizes For',
    paragraphs: [
      'Cassandra is optimized for write throughput, scale-out architecture, and availability under failure. Its storage engine and replication model are built so data can be written quickly, propagated across replicas, and compacted over time. This makes it strong for append-heavy or update-heavy operational workloads.',
      'It is less focused on full relational generality or arbitrary analytics. If a workload needs frequent joins, flexible aggregation across many relationships, or user-defined reporting queries that were not modeled in advance, Cassandra is usually a poor fit compared with relational or analytical databases.',
    ],
    bullets: [
      'High-throughput writes and durable replication.',
      'Partition-local reads with predictable query paths.',
      'Operational continuity when nodes fail.',
      'Scale-out growth across clusters.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Cassandra Fits Best',
    paragraphs: [
      'Cassandra fits best when workloads are distributed, large-scale, and query patterns are well understood in advance. Common examples include event ingestion, metrics and time-series storage, messaging metadata, recommendation or activity timelines, device telemetry, log-like operational records, and services deployed across multiple regions where availability matters greatly.',
      'It is especially effective when the system can accept denormalized data models and when the hot paths are centered on partition-oriented lookups or ordered scans within known partitions.',
    ],
    bullets: [
      'High-volume ingestion and append-heavy workloads.',
      'Multi-node or multi-data-center services prioritizing uptime.',
      'Access patterns known ahead of time and modeled explicitly.',
      'Systems that can denormalize data safely for performance.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Cassandra Is Not the Best Default',
    paragraphs: [
      'Cassandra is not the best default when the workload needs rich relational constraints, frequent joins, flexible secondary filtering, or ad hoc query exploration. It is also a poor choice when the data volume is modest and the operational cost of a distributed cluster outweighs the benefit.',
      'Teams also get into trouble when they choose Cassandra for scale branding rather than workload reality. A small or moderately sized system with relational requirements often becomes harder, not easier, when forced into Cassandra-style denormalized query tables.',
    ],
    bullets: [
      'Relational domains with cross-entity joins and constraints.',
      'Ad hoc reporting and unplanned query patterns.',
      'Small systems where cluster operations add unnecessary cost.',
      'Teams unwilling to model data around exact access paths.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Cassandra is powerful when the problem truly demands distributed availability and scale, and when engineers are ready to model data around partitions, replicas, and consistency tradeoffs. It is not a universal database; it is a specialized operational system with clear strengths.',
      'The real decision question is whether the workload gains enough from scale-out availability and write throughput to justify Cassandra-specific modeling and operational discipline. If yes, Cassandra can be a strong foundation. If not, simpler systems are often better.',
    ],
    bullets: [
      'Choose Cassandra for distributed availability and scale, not for generic SQL-like convenience.',
      'Model tables around queries, partitions, and consistency goals.',
      'Treat repair, compaction, and tombstone management as core operational concerns.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Cassandra Actually Is',
    paragraphs: [
      'Cassandra is a distributed wide-column database. Data is stored in keyspaces and tables, but those tables are not relational in the usual sense. Under the hood, Cassandra distributes rows by partition key, replicates them across nodes, and uses log-structured storage components to handle writes efficiently.',
      'Clients typically interact through CQL, the Cassandra Query Language, which resembles SQL at a surface level. That similarity is useful for readability, but it should not be mistaken for equivalent relational semantics. Cassandra uses a very different execution and modeling philosophy.',
    ],
  },
  {
    id: 'core-cluster-architecture',
    title: 'Peer-to-Peer Cluster Architecture',
    paragraphs: [
      'Cassandra uses a peer-to-peer architecture rather than a strict primary-replica design with one permanent master. Any node can coordinate client requests, and data ownership is distributed around a token ring or equivalent partitioning scheme. This reduces single-node dependence and contributes to high availability.',
      'Because coordination can happen on multiple nodes, operational design focuses on consistent cluster health, replica placement, repair, and network behavior rather than protecting one special primary server.',
    ],
  },
  {
    id: 'core-keyspaces',
    title: 'Keyspaces and Replication Strategy',
    paragraphs: [
      'A keyspace in Cassandra defines a namespace and a replication strategy. Replication factor determines how many copies of data exist, while strategies such as network topology aware replication place those copies across racks or data centers.',
      'These choices are not minor settings. They directly affect fault tolerance, read and write behavior, storage usage, and what consistency levels are practical for the workload.',
    ],
    bullets: [
      'Replication factor controls redundancy and fault tolerance.',
      'Placement strategy matters for multi-rack and multi-data-center design.',
      'Consistency expectations depend on replication choices.',
    ],
  },
  {
    id: 'core-partitions',
    title: 'Partition Keys and Data Distribution',
    paragraphs: [
      'The partition key determines where data lives in the cluster. Rows with the same partition key are stored together logically and routed to the same replica set. Good partition-key design spreads load evenly and keeps related reads local. Bad partition-key design creates hotspots or oversized partitions that damage performance.',
      'Partition design is one of the most important Cassandra skills. If you get it wrong, no amount of driver tuning or hardware scaling will cleanly fix the fundamental imbalance.',
    ],
    bullets: [
      'Choose keys with good cardinality and balanced traffic distribution.',
      'Avoid partitions that grow without bound.',
      'Align partition design with the most important read and write paths.',
    ],
  },
  {
    id: 'core-clustering',
    title: 'Clustering Columns and Row Order',
    paragraphs: [
      'Within a partition, clustering columns define sort order and how rows are organized on disk. This makes Cassandra very effective for ordered access patterns such as recent events for one user, messages in one conversation, or metrics for one device over a bounded time window.',
      'The combination of partition key and clustering columns is the heart of table design. Together they determine which queries are cheap, which are impossible, and which would require schema redesign.',
    ],
  },
  {
    id: 'core-query-driven-modeling',
    title: 'Query-Driven Data Modeling',
    paragraphs: [
      'Cassandra modeling starts from the application queries, not from abstract domain normalization. Engineers list the required reads and writes, then design one or more tables so each operation can be performed with predictable partition-local access.',
      'This usually leads to denormalization. The same logical fact may appear in multiple tables optimized for different queries. That duplication is normal in Cassandra because read efficiency and cluster predictability matter more than maintaining a single canonical join structure.',
    ],
  },
  {
    id: 'core-consistency',
    title: 'Tunable Consistency Levels',
    paragraphs: [
      'Cassandra offers tunable consistency on reads and writes. Clients can choose levels such as ONE, QUORUM, LOCAL_QUORUM, or ALL depending on the desired tradeoff between latency, consistency, and fault tolerance. This is one of Cassandras defining features because it lets applications shape behavior per operation.',
      'That flexibility also creates responsibility. Engineers need to understand what guarantees the system actually provides under failure and replication lag. Consistency settings should be chosen intentionally, not copied from examples without reasoning.',
    ],
    bullets: [
      'Lower consistency often reduces latency but weakens freshness guarantees.',
      'Quorum-style reads and writes can improve observed consistency.',
      'Multi-data-center deployments often rely on local consistency settings for latency control.',
    ],
  },
  {
    id: 'core-write-path',
    title: 'Write Path: Commit Log, Memtables, and SSTables',
    paragraphs: [
      'When Cassandra receives a write, it records it in a commit log for durability and applies it to an in-memory memtable. Later, memtables are flushed to immutable disk files called SSTables. This write path is optimized for high throughput and sequential disk behavior rather than in-place row rewriting.',
      'That architecture is one reason Cassandra handles heavy write workloads well. It also explains why read behavior, compaction, tombstones, and repair matter so much: data accumulates across immutable structures that must be merged and maintained over time.',
    ],
  },
  {
    id: 'core-read-path',
    title: 'Read Path and Replica Coordination',
    paragraphs: [
      'Reads in Cassandra may involve checking memtables, SSTables, caches, and possibly multiple replicas depending on consistency level. Because data may exist in several places and multiple versions can exist before compaction, the read path is more complex than a simple single-file lookup.',
      'This is why table design and partition locality matter so much. Cassandra performs best when reads touch a well-bounded partition and do not need broad scans across the cluster.',
    ],
  },
  {
    id: 'core-compaction',
    title: 'Compaction and Storage Maintenance',
    paragraphs: [
      'Compaction merges SSTables over time to reduce fragmentation, discard obsolete values, and clean up tombstone-heavy data once safe. Cassandra offers different compaction strategies tuned for different workloads, such as size-tiered, leveled, or time-window approaches.',
      'Compaction is not background trivia. It affects read amplification, disk usage, write amplification, and cluster stability. Strategy choice should match workload shape, especially for time-series data.',
    ],
  },
  {
    id: 'core-tombstones',
    title: 'Deletes, TTLs, and Tombstones',
    paragraphs: [
      'Cassandra does not immediately erase deleted data from every replica. Deletes and expirations create tombstones, which mark data as removed so the information can propagate consistently and be cleaned up later. Tombstones are necessary for distributed correctness, but too many of them can seriously hurt read performance.',
      'This means TTL-heavy and delete-heavy workloads need careful design. Tombstone pressure is one of the most common operational problems in poorly modeled Cassandra systems.',
    ],
  },
  {
    id: 'core-repair',
    title: 'Repair, Hinted Handoff, and Anti-Entropy',
    paragraphs: [
      'Because Cassandra is distributed and replicas may miss updates temporarily, the system relies on mechanisms such as hinted handoff, read repair behavior in some contexts, and explicit repair operations to converge replica state over time. Regular repair is part of operational correctness, not an optional cleanup task.',
      'If repair discipline is weak, stale data and inconsistency risk grow. Cassandra operations require teams to treat cluster maintenance as part of the database contract.',
    ],
  },
  {
    id: 'core-lightweight-transactions',
    title: 'Lightweight Transactions',
    paragraphs: [
      'Cassandra supports lightweight transactions for compare-and-set style operations using consensus-based coordination. These are useful for conditional inserts or updates when strict per-row agreement is necessary.',
      'They are much more expensive than ordinary writes, so they should be reserved for cases that truly need that guarantee. Cassandra is not intended to run all ordinary workload paths through transactional coordination.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexes, Materialized Views, and Access Tradeoffs',
    paragraphs: [
      'Cassandra has secondary indexing features and related access aids, but they are not a replacement for sound primary table design. The healthiest Cassandra systems still rely mainly on tables modeled directly for required queries.',
      'When teams try to recover relational-style flexibility through secondary indexes alone, they often create performance surprises. Cassandra prefers explicit query tables over generic indexing convenience.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations, Monitoring, and Capacity Planning',
    paragraphs: [
      'Healthy Cassandra operations include watching node health, disk usage, compaction pressure, repair schedules, pending tasks, partition sizes, latency percentiles, tombstone warnings, and cluster balance. Adding nodes can help, but only if partitioning and workload shape are already sound.',
      'Capacity planning is not only about total data volume. It is also about replica count, growth rate, compaction overhead, repair windows, and whether hotspot partitions can overload otherwise healthy hardware.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Strong Use Cases',
    paragraphs: [
      'Cassandra is strong for telemetry ingestion, event logs, user activity timelines, message metadata, recommendation feeds, IoT data, time-series style records, and globally distributed operational services that prioritize uptime and high write throughput.',
      'It is especially strong when requests are naturally scoped to a known key such as tenant, device, account, or conversation, and when the system can predefine the table shape around those requests.',
    ],
    bullets: [
      'Write-heavy event or time-series workloads.',
      'High-availability systems spanning multiple nodes or regions.',
      'Partition-oriented lookups and ordered scans within a known key.',
      'Systems that can denormalize for performance predictability.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'Weak Use Cases',
    paragraphs: [
      'Cassandra is a weak fit for small applications, relational business systems with rich constraints, workloads that depend on joins, and products whose query patterns are not yet understood. It is also a poor fit when teams expect database-side flexibility to rescue incomplete modeling.',
      'If the workload is better served by a single-node relational database or a general-purpose document system, Cassandra usually increases complexity without enough upside.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'The most common Cassandra mistakes are poor partition-key choices, partitions that grow too large, casual use of wide scans, ignoring tombstone buildup, weak repair discipline, and trying to force relational habits onto a query-driven distributed model.',
      'Another repeated mistake is underestimating operations. Cassandra can stay available through failure, but only when the cluster is maintained deliberately. Repairs, compaction behavior, and capacity growth cannot be treated as afterthoughts.',
    ],
    bullets: [
      'Choosing partition keys with low cardinality or hotspot traffic.',
      'Letting one partition grow without operational bounds.',
      'Overusing deletes and TTLs without tombstone planning.',
      'Using Cassandra before query patterns are actually known.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Comparing Cassandra with Other Databases',
    paragraphs: [
      'Compared with relational databases, Cassandra gives up joins, strong relational constraints, and general query flexibility in exchange for distributed availability and scale-out write behavior. Compared with document databases, Cassandra is more rigidly query-shaped and partition-oriented. Compared with Redis, it is a durable large-scale operational store rather than an in-memory data structure server.',
      'The correct comparison is not which database is more advanced. The real comparison is which database aligns with the workloads dominant constraints: relational expressiveness, document flexibility, embedded simplicity, cache-like speed, or distributed availability under scale.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Guide',
    paragraphs: [
      'A good Cassandra decision starts by asking whether the workload is large enough, distributed enough, and availability-sensitive enough to justify a cluster-oriented database. Then ask whether the critical reads and writes can be expressed cleanly through partition-based tables with bounded partitions.',
      'If the answer is yes, Cassandra can be a strong fit. If the workload mainly wants relational modeling, ad hoc queries, or simpler operations, the right move is usually to choose a different database rather than fight Cassandra into pretending it is something else.',
    ],
    bullets: [
      'Need scale-out writes and fault tolerance: strong Cassandra signal.',
      'Need joins, constraints, and flexible query composition: weak Cassandra signal.',
      'Need query shapes known in advance: strong Cassandra signal.',
      'Need simple local deployment or low operational burden: weak Cassandra signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-keyspace',
    title: 'Keyspace with Replication',
    description: [
      'A Cassandra keyspace defines replication behavior. This example creates an application keyspace with a replication factor tuned for one data center.',
      'Replication choices affect availability, storage cost, and which consistency levels make sense for reads and writes.',
    ],
    code: `CREATE KEYSPACE app
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'dc1': 3
};`,
    notes: [
      'Replication factor is a core design choice, not just a deployment detail.',
      'Multi-data-center clusters usually define replication per data center.',
    ],
  },
  {
    id: 'examples-partition',
    title: 'Table Designed Around a Partition Key',
    description: [
      'This table models recent events for one device. The device ID is the partition key and the event time is the clustering column so rows remain ordered within each device partition.',
      'This is the typical Cassandra pattern: start from the query shape, then encode locality and ordering directly into the primary key.',
    ],
    code: `CREATE TABLE device_events (
  device_id TEXT,
  event_time TIMESTAMP,
  event_type TEXT,
  payload TEXT,
  PRIMARY KEY ((device_id), event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);`,
    notes: [
      'All events for one device live in the same logical partition.',
      'Clustering order supports efficient recent-first reads within that partition.',
    ],
  },
  {
    id: 'examples-query',
    title: 'Partition-Local Read',
    description: [
      'Good Cassandra reads target a known partition and possibly a bounded clustering range. This keeps routing predictable and avoids cluster-wide scans.',
      'If the application cannot express its hot reads this way, the table shape is usually wrong or Cassandra may be the wrong database.',
    ],
    code: `SELECT event_time, event_type, payload
FROM device_events
WHERE device_id = 'device-17'
  AND event_time >= '2026-03-01'
LIMIT 50;`,
    notes: [
      'Queries should align with the primary key structure.',
      'Cassandra performs best when reads are partition-local and bounded.',
    ],
  },
  {
    id: 'examples-denormalized',
    title: 'Denormalized Query Table for a Timeline',
    description: [
      'Cassandra often stores the same logical data in multiple tables so each important query has an efficient access path. This example models a user activity feed directly for timeline reads.',
      'That duplication is deliberate. Cassandra usually favors predictable reads over normalized storage purity.',
    ],
    code: `CREATE TABLE user_timeline (
  user_id TEXT,
  bucket_date DATE,
  activity_time TIMESTAMP,
  activity_id UUID,
  activity_type TEXT,
  summary TEXT,
  PRIMARY KEY ((user_id, bucket_date), activity_time, activity_id)
) WITH CLUSTERING ORDER BY (activity_time DESC, activity_id DESC);`,
    notes: [
      'Bucketing helps prevent a single partition from growing without bound.',
      'Denormalized tables are normal in Cassandra when they serve real query paths.',
    ],
  },
  {
    id: 'examples-ttl',
    title: 'TTL for Expiring Data',
    description: [
      'Cassandra can assign TTL values so data expires automatically. This is useful for ephemeral events, caches, rolling telemetry, and retention-bounded operational records.',
      'TTL creates tombstones, so expiration-heavy workloads still need careful operational planning.',
    ],
    code: `INSERT INTO session_events (
  session_id,
  event_time,
  event_name
) VALUES (
  's-1001',
  toTimestamp(now()),
  'page_view'
) USING TTL 86400;`,
    notes: [
      'TTL is powerful but not free because expirations become tombstones.',
      'Retention design should account for read impact and compaction behavior.',
    ],
  },
  {
    id: 'examples-lwt',
    title: 'Lightweight Transaction for Conditional Insert',
    description: [
      'Lightweight transactions are used when an operation needs compare-and-set behavior rather than ordinary eventually convergent writes. This example ensures a username reservation only succeeds once.',
      'Use this sparingly. It is much costlier than a normal write path.',
    ],
    code: `INSERT INTO usernames (username, account_id)
VALUES ('samir', 42)
IF NOT EXISTS;`,
    notes: [
      'Lightweight transactions trade throughput and latency for stronger conditional guarantees.',
      'Reserve them for correctness-critical conditions, not routine bulk writes.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-modeling',
    title: 'Modeling Terms',
    terms: [
      {
        term: 'Partition Key',
        definition:
          'The key component that determines which replica set stores a rows data and how requests are distributed across the cluster.',
      },
      {
        term: 'Clustering Column',
        definition:
          'A column that defines row ordering within one partition and shapes efficient range or ordered reads.',
      },
      {
        term: 'Wide Row',
        definition:
          'A row structure where a partition may contain many clustered entries, often used for time-ordered or feed-like data access.',
      },
      {
        term: 'Denormalization',
        definition:
          'The practice of storing the same logical data in multiple tables so each important query has an efficient direct access path.',
      },
      {
        term: 'Bounded Partition',
        definition:
          'A partition whose size remains operationally controlled rather than growing without limit over time.',
      },
    ],
  },
  {
    id: 'glossary-distributed',
    title: 'Distributed System Terms',
    terms: [
      {
        term: 'Replication Factor',
        definition:
          'The number of copies of data Cassandra keeps across nodes for redundancy and fault tolerance.',
      },
      {
        term: 'Consistency Level',
        definition:
          'The requested number or locality of replica acknowledgements needed for a read or write operation.',
      },
      {
        term: 'Quorum',
        definition:
          'A majority-style consistency target commonly used to balance freshness and availability across replicas.',
      },
      {
        term: 'Hinted Handoff',
        definition:
          'A mechanism that temporarily stores missed replica updates so they can be delivered later after a node recovers.',
      },
      {
        term: 'Repair',
        definition:
          'An anti-entropy maintenance process that reconciles replica differences and helps preserve long-term consistency.',
      },
    ],
  },
  {
    id: 'glossary-storage',
    title: 'Storage and Maintenance Terms',
    terms: [
      {
        term: 'Commit Log',
        definition:
          'A durable append log used to record writes before or alongside their in-memory application.',
      },
      {
        term: 'Memtable',
        definition:
          'An in-memory structure that accumulates writes before flushing them to disk as SSTables.',
      },
      {
        term: 'SSTable',
        definition:
          'An immutable on-disk sorted string table file that stores flushed Cassandra data.',
      },
      {
        term: 'Compaction',
        definition:
          'The background process that merges SSTables, removes obsolete data versions, and influences read and write amplification.',
      },
      {
        term: 'Tombstone',
        definition:
          'A deletion or expiration marker that preserves distributed correctness until old data can be safely purged.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

const pageStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="win98-section">
      <h2 className="win98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="win98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="win98-section">
      <h2 className="win98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="win98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
          {section.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
      </ul>
      {isLast ? null : <hr className="win98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="win98-section">
      <h2 className="win98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="win98-divider" />}
    </section>
  )
}

export default function CassandraPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Cassandra (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Cassandra',
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
    <div className="win98-help-page">
      <style>{pageStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Cassandra</span>
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
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
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
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="win98-content">
            <h1 className="win98-doc-title">Cassandra</h1>
            <p>
              Distributed wide-column database reference covering partition-based modeling,
              tunable consistency, replication, storage internals, and operational tradeoffs.
            </p>

            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
