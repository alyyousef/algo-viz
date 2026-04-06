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
  'MySQL is a client-server relational database widely used for web applications, transactional systems, SaaS backends, and operational business data. It is known for broad adoption, mature tooling, strong ecosystem support, and a practical balance between relational capability and operational familiarity.',
  'The most useful way to think about MySQL today is not as a generic "SQL database" but as a family of production patterns centered on the InnoDB storage engine, transactional workloads, replication, indexing, and predictable operational deployment. It is often chosen because teams want a proven shared database service with large talent and tooling availability.',
  'This page is intentionally thorough. It covers overview and key ideas, SQL and API concepts, architecture and storage-engine behavior, use cases, tradeoffs, replication and backup strategy, and practical examples across schema design, transactions, indexing, JSON usage, and partitioning.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'MySQL is a relational database server designed for shared application data, multi-user access, and long-running service deployment. Applications connect to it over the network or local sockets and rely on it for transactions, indexing, query execution, and durable storage.',
      'Its popularity comes partly from technical capability and partly from ecosystem momentum. MySQL appears in hosting platforms, web stacks, managed services, internal business systems, and large numbers of backend products, which means teams often inherit both operational patterns and institutional familiarity around it.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why MySQL Matters',
    paragraphs: [
      'Many teams need a database that is relational, production-proven, well-supported by frameworks, and operationally familiar across hosting environments and managed services. MySQL remains one of the most common answers to that need.',
      'It is especially important historically because so much of the web grew up around it. That history still affects today\'s engineering reality: a large amount of tooling, migration support, ORM compatibility, and operational knowledge is built around MySQL deployments.',
    ],
    bullets: [
      'Large ecosystem and broad hosting support.',
      'Strong fit for shared transactional application data.',
      'Operational familiarity for many backend teams.',
      'Common default in web and SaaS environments.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a practical shared relational database service with strong support for ordinary application workloads. MySQL is not an embedded database and it is not an in-memory coordination engine. It is a long-running server that manages concurrent access, indexes, transactions, and persistent data.',
      'That means schema design, index strategy, transaction boundaries, backup planning, and replication are all part of the product architecture, not secondary concerns. Like PostgreSQL, MySQL becomes more valuable when treated as a core system rather than a passive row bucket.',
    ],
    bullets: [
      'Think shared server database, not local file.',
      'Think operational service with backups and replication.',
      'Think practical relational modeling shaped around real queries.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When MySQL Fits Best',
    paragraphs: [
      'MySQL fits well when the workload is shared, relational, and transactional, especially when the team values ecosystem familiarity and common operational patterns. Typical examples include ecommerce systems, CMS platforms, SaaS products, line-of-business software, customer account systems, and APIs built around predictable CRUD and reporting needs.',
      'It is also a reasonable choice when the surrounding framework or platform already strongly supports it and the application does not need niche database-specific capabilities beyond what MySQL handles well.',
    ],
    bullets: [
      'Backend systems with ordinary transactional business data.',
      'Products that benefit from mature ecosystem support.',
      'Teams that want a broadly understood relational default.',
      'Hosting environments where MySQL is already part of the operational path.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where MySQL Is Not the Best Default',
    paragraphs: [
      'MySQL is not automatically the right answer when the data is local-only, embedded, or clearly better served by a specialized engine such as Redis for ephemeral state or SQLite for on-device persistence. It is also not ideal if the application depends heavily on extension-driven capabilities more commonly associated with PostgreSQL.',
      'Like any large relational database, it can also be overkill when the workload is tiny and a managed or embedded alternative would remove unnecessary operational cost.',
    ],
    bullets: [
      'Embedded local storage problems.',
      'Highly specialized workloads that want a different data model.',
      'Small systems where server operations add cost without real benefit.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'MySQL is often chosen because it is practical, proven, and broadly supported. It handles a large class of application data problems very well when schema, indexes, and operations are taken seriously.',
      'Its value is not only in speed or popularity. Its value is in being a stable, shared relational platform that many teams can deploy, understand, and maintain effectively.',
    ],
    bullets: [
      'Choose MySQL when the workload is shared, relational, and operationally conventional.',
      'Treat InnoDB, indexing, replication, and backups as first-class design concerns.',
      'Use ecosystem familiarity as an advantage, not an excuse for weak data modeling.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What MySQL Actually Is',
    paragraphs: [
      'MySQL is a relational database server with a SQL interface, storage engines, transaction support, indexing, replication features, and broad client-library support. It is usually deployed as a long-running service used by multiple application processes rather than as a local library.',
      'That service model matters because it makes MySQL part of a shared operational environment. Connection handling, backups, failover planning, migrations, and permissions all become part of the engineering picture.',
    ],
  },
  {
    id: 'core-innodb',
    title: 'InnoDB and Storage Engine Reality',
    paragraphs: [
      'Modern MySQL discussions usually mean MySQL with InnoDB as the primary storage engine. InnoDB provides transactions, row-level locking, crash recovery, and foreign-key support. That is the practical foundation for most serious MySQL production systems.',
      'Historically MySQL had multiple storage-engine tradeoffs that mattered more in day-to-day choice. Today, InnoDB is the ordinary default for good reason, and most architectural thinking should start there.',
    ],
  },
  {
    id: 'core-relational-model',
    title: 'Schemas, Tables, and Relational Design',
    paragraphs: [
      'MySQL organizes data into databases, tables, rows, columns, constraints, and indexes. The engine is strongest when teams use straightforward relational design: keys are clear, constraints are deliberate, and relationships are modeled intentionally instead of hidden only in application code.',
      'The practical design rule is the same as in other relational systems: model data around integrity and access patterns, not only around what the first UI screen happens to need.',
    ],
  },
  {
    id: 'core-types',
    title: 'Type System and Column Choices',
    paragraphs: [
      'MySQL supports numeric types, text types, booleans by convention, date and time types, JSON, binary data, enums, and more. Correct type choice improves integrity, storage efficiency, and query clarity.',
      'A common source of trouble is overusing generic text or loosely defined columns for data that really has structure. Precise types reduce ambiguity and make future maintenance easier.',
    ],
    bullets: [
      'Use date and time types for dates, not ad hoc strings.',
      'Choose numeric types deliberately for IDs, counters, and money representations.',
      'Use JSON only when flexibility is genuinely part of the model.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and ACID Behavior',
    paragraphs: [
      'With InnoDB, MySQL supports ACID transactions so groups of statements can commit or roll back as one unit. This is central for shared application state, especially when several updates must remain logically consistent.',
      'The practical lesson is that transactions should be treated as the normal correctness boundary for multi-step business workflows rather than as an advanced feature for rare cases.',
    ],
  },
  {
    id: 'core-isolation',
    title: 'Isolation Levels and Locking',
    paragraphs: [
      'MySQL supports multiple isolation levels and uses a combination of locking and MVCC-like mechanisms in InnoDB to manage concurrency. The exact behavior matters because concurrent systems can produce subtle anomalies if developers assume stronger guarantees than they actually configured.',
      'Teams should know when they are relying on row locks, gap locks, or isolation behavior to preserve correctness. Application bugs under concurrency often come from assumptions made at this layer.',
    ],
  },
  {
    id: 'core-indexes',
    title: 'Indexes and Access Patterns',
    paragraphs: [
      'Indexes are one of the main performance levers in MySQL. B-tree indexes accelerate equality filters, ranges, joins, and some orderings. Composite indexes are particularly important because many application queries combine filters and sorts.',
      'The core rule is simple: indexes should match the questions the application actually asks. Adding indexes casually wastes write throughput and storage, while missing the right index can turn an otherwise healthy system into a full-scan bottleneck.',
    ],
    bullets: [
      'Design composite indexes in the order the workload needs.',
      'Remember that every index adds maintenance cost on writes.',
      'Inspect plans instead of assuming the optimizer will use what you intended.',
    ],
  },
  {
    id: 'core-optimizer',
    title: 'Optimizer and Query Planning',
    paragraphs: [
      'MySQL uses a query optimizer to choose join order, access path, and index usage. As in other relational systems, plan quality depends on schema design, statistics, and query shape.',
      'Engineers should use plan-inspection tools such as `EXPLAIN` when a query is slow or unexpectedly expensive. Plan inspection is a practical engineering habit, not only a specialist activity.',
    ],
  },
  {
    id: 'core-json',
    title: 'JSON and Hybrid Data Models',
    paragraphs: [
      'MySQL supports JSON columns and functions, which can be useful when some parts of the data are flexible or sparse while the broader model remains relational. This can reduce pressure to push every optional attribute into a rigid top-level schema too early.',
      'The danger is the same as everywhere else: if JSON becomes a way to avoid schema design entirely, the database gradually becomes harder to index, validate, and reason about.',
    ],
  },
  {
    id: 'core-replication',
    title: 'Replication, Read Scaling, and HA',
    paragraphs: [
      'MySQL supports replication and high-availability patterns that allow read scaling and failover strategies. In production, many deployments use primary-replica topologies, managed failover, or hosted services that abstract some of the operational complexity.',
      'Replication improves availability posture, but it also introduces lag and consistency considerations. Engineers should know whether a read path is allowed to see slightly stale data before routing it to replicas.',
    ],
  },
  {
    id: 'core-backups',
    title: 'Backups, Restore, and Recovery Discipline',
    paragraphs: [
      'A trustworthy MySQL deployment needs backup and restore planning, not only running instances. Logical dumps, physical backups, binary logs, and point-in-time recovery strategies all belong in the broader operational story.',
      'The real test is not whether backups exist somewhere. The real test is whether the team can restore data correctly under pressure and understands what data-loss window remains under realistic failures.',
    ],
  },
  {
    id: 'core-partitioning',
    title: 'Partitioning and Large Tables',
    paragraphs: [
      'MySQL supports partitioning for workloads where data naturally splits along dimensions such as time or range. This can help manage very large datasets and make some maintenance operations easier when the access pattern aligns with the partition boundary.',
      'Partitioning adds complexity and should not be introduced simply because the table is large. The partitioning dimension must actually help pruning, retention, or operations in a measurable way.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Routine Maintenance',
    paragraphs: [
      'Healthy MySQL operation includes monitoring query latency, slow-query logs, replication health, connection usage, storage growth, backup freshness, and index effectiveness. Managed services reduce some burden, but not the need to understand what the database is doing.',
      'Production database quality is strongly tied to operational discipline. Ignoring maintenance usually appears first as slow queries, lock contention, or reliability surprises rather than dramatic immediate failure.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'MySQL performance work usually comes down to the fundamentals: right schema, right indexes, right query shape, correct batching, sensible connection management, and understanding what the optimizer is actually doing.',
      'The best posture is empirical. Measure hot queries, inspect plans, understand row counts, and solve the actual bottleneck instead of chasing database folklore or framework myths.',
    ],
    bullets: [
      'Check plans on real hot paths.',
      'Design around actual access patterns instead of abstract purity.',
      'Treat connection management as part of throughput design.',
      'Avoid massive unbounded result sets and accidental N+1 query patterns.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'MySQL is widely used for web backends, ecommerce systems, CMS platforms, customer-account systems, internal business tools, SaaS applications, and traditional line-of-business software that depends on shared relational data.',
      'Its strength is not that every workload is perfect for it. Its strength is that a very large class of ordinary backend data problems fit it well and can be supported with mature tools and operational practices.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use MySQL',
    paragraphs: [
      'MySQL is not the best default when the application needs embedded local storage, purely in-memory ephemeral state, or a data model that is clearly better served by a specialized engine. It can also be the wrong answer when teams need specific advanced capabilities that another relational platform supports more naturally.',
      'As with any shared database service, it can also be unnecessary overhead for workloads that do not truly need a server process and multi-user operational features.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common MySQL failures include weak indexing discipline, poor ORM-generated query patterns, vague transaction boundaries, replica lag assumptions that were never validated, and schema drift where JSON or loosely typed columns become the path of least resistance.',
      'Another recurring mistake is operational complacency: assuming backups are fine, replicas are current, or query performance will stay acceptable as data grows without actually measuring any of it.',
    ],
    bullets: [
      'Do not ignore slow-query analysis.',
      'Do not use JSON to hide avoidable schema confusion.',
      'Do not assume replication means reads are always current.',
      'Do not let framework defaults define the whole database strategy.',
    ],
  },
  {
    id: 'core-compare',
    title: 'MySQL Compared with PostgreSQL, SQLite, and Redis',
    paragraphs: [
      'Compared with PostgreSQL, MySQL is often chosen for ecosystem familiarity and common operational patterns, while PostgreSQL is often chosen for deeper extension support and some advanced SQL use cases. Compared with SQLite, MySQL is much more appropriate for shared server-side workloads. Compared with Redis, MySQL is stronger for durable relational data, while Redis is stronger for low-latency in-memory state and key-oriented primitives.',
      'The real comparison is always about workload shape, operations, and growth path rather than slogans about which database is "better."',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose MySQL when the workload is relational, shared, transactional, and operationally conventional. Choose something else when the problem is local-only, memory-first, or clearly specialized enough that a different model fits better.',
      'For many teams, MySQL remains a sensible default because the operational path and ecosystem support are so widely understood.',
    ],
    bullets: [
      'Shared transactional application data: strong MySQL signal.',
      'Need broad ecosystem and hosting familiarity: strong MySQL signal.',
      'Need embedded local persistence: weak MySQL signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-schema',
    title: 'Relational Schema with Foreign Keys',
    description: [
      'This example shows a straightforward MySQL schema using InnoDB-friendly relational design with keys, timestamps, and foreign-key integrity.',
      'The point is not novelty. The point is to make shared business data explicit and durable.',
    ],
    code: `CREATE TABLE customers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  total_cents BIGINT NOT NULL,
  status VARCHAR(32) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB;`,
    notes: [
      'InnoDB is the normal transactional default for serious MySQL systems.',
      'Foreign keys keep relational integrity in the database, not only in the app.',
    ],
  },
  {
    id: 'examples-transaction',
    title: 'Transaction for Inventory and Order Creation',
    description: [
      'Multi-step workflows should live inside a transaction when correctness depends on all steps succeeding together.',
      'This is one of the clearest reasons teams use a shared relational database at all.',
    ],
    code: `START TRANSACTION;

UPDATE inventory
SET available = available - 1
WHERE sku = 'LAP-4810' AND available > 0;

INSERT INTO orders (customer_id, total_cents, status)
VALUES (42, 129900, 'PAID');

COMMIT;`,
    notes: [
      'Transactions define the correctness boundary.',
      'Business workflows should not rely on lucky ordering of separate autocommit statements.',
    ],
  },
  {
    id: 'examples-index',
    title: 'Composite Index for Recent Orders',
    description: [
      'Indexes should match the query the application repeats all day long. This example supports recent-order reads for one customer.',
      'A well-shaped index often does more than any application-side tuning attempt.',
    ],
    code: `CREATE INDEX idx_orders_customer_created
ON orders (customer_id, created_at DESC);

SELECT id, total_cents, status, created_at
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;`,
    notes: [
      'Composite index order is workload-dependent.',
      'Design indexes for actual filters and sort clauses, not abstract completeness.',
    ],
  },
  {
    id: 'examples-json',
    title: 'JSON for Flexible Event Metadata',
    description: [
      'MySQL JSON support is useful when part of the model is flexible but the surrounding system still benefits from relational structure.',
      'It works best when used deliberately rather than as an excuse to avoid schema design entirely.',
    ],
    code: `CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_type VARCHAR(64) NOT NULL,
  payload JSON NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

SELECT id
FROM events
WHERE JSON_EXTRACT(payload, '$.source') = 'mobile';`,
    notes: [
      'JSON is useful for flexible metadata, not for replacing all schema thinking.',
      'Query cost and indexing strategy still matter when JSON enters the design.',
    ],
  },
  {
    id: 'examples-explain',
    title: 'Inspecting a Query Plan',
    description: [
      'When MySQL performance matters, plan inspection should be routine. It is one of the fastest ways to validate indexing assumptions.',
      'Do not guess whether the optimizer is doing the right thing. Ask it.',
    ],
    code: `EXPLAIN
SELECT id, total_cents, status
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;`,
    notes: [
      'Use EXPLAIN early when performance is confusing.',
      'Slow queries are often an indexing or shape problem, not a mystery.',
    ],
  },
  {
    id: 'examples-partitioning',
    title: 'Range Partitioning by Month',
    description: [
      'Partitioning can make large time-oriented tables easier to manage when the query pattern naturally follows the same boundary.',
      'It adds structure and should be driven by actual operational or pruning value.',
    ],
    code: `CREATE TABLE audit_logs (
  id BIGINT NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  actor_id BIGINT NOT NULL,
  action VARCHAR(128) NOT NULL,
  PRIMARY KEY (id, created_at)
)
PARTITION BY RANGE (TO_DAYS(created_at)) (
  PARTITION p202601 VALUES LESS THAN (TO_DAYS('2026-02-01')),
  PARTITION p202602 VALUES LESS THAN (TO_DAYS('2026-03-01'))
);`,
    notes: [
      'Partitioning should align with retention and pruning needs.',
      'Large-table features add complexity and should have a measured reason behind them.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-storage',
    title: 'Storage and Transaction Terms',
    terms: [
      {
        term: 'InnoDB',
        definition:
          'The primary transactional storage engine for modern MySQL deployments, providing crash recovery, row-level locking, and ACID transaction support.',
      },
      {
        term: 'ACID',
        definition:
          'The durability and correctness model describing atomicity, consistency, isolation, and durability for transactions.',
      },
      {
        term: 'Autocommit',
        definition:
          'A mode where each statement commits automatically unless an explicit transaction groups statements together.',
      },
      {
        term: 'Foreign Key',
        definition:
          'A relational constraint that ties one table to another and helps preserve referential integrity inside the database.',
      },
      {
        term: 'MVCC-Like Behavior',
        definition:
          'Concurrency behavior in InnoDB that helps readers and writers proceed together with reduced blocking compared to simplistic lock-only models.',
      },
    ],
  },
  {
    id: 'glossary-query',
    title: 'Query and Performance Terms',
    terms: [
      {
        term: 'Index',
        definition:
          'An auxiliary data structure used to accelerate lookups, joins, and some sort operations at the cost of extra storage and write maintenance.',
      },
      {
        term: 'Composite Index',
        definition:
          'An index built from multiple columns where column order matters for which queries benefit from it.',
      },
      {
        term: 'Optimizer',
        definition:
          'The part of MySQL that chooses how to execute a query, including index usage and join ordering.',
      },
      {
        term: 'EXPLAIN',
        definition:
          'A plan-inspection tool used to understand how MySQL intends to execute a query and whether it is likely to be efficient.',
      },
      {
        term: 'Slow Query Log',
        definition:
          'An operational tool that records queries exceeding configured thresholds so teams can identify performance hotspots.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Replication and Operations Terms',
    terms: [
      {
        term: 'Primary-Replica',
        definition:
          'A deployment pattern where one node accepts primary writes and one or more replicas receive changes for read scaling or failover.',
      },
      {
        term: 'Replication Lag',
        definition:
          'The delay between a change being committed on the primary and becoming visible on a replica.',
      },
      {
        term: 'Binary Log',
        definition:
          'A MySQL log of data-changing events used for replication and some recovery strategies.',
      },
      {
        term: 'Point-in-Time Recovery',
        definition:
          'A restore strategy that combines backups with logs so data can be recovered to a chosen moment.',
      },
      {
        term: 'Partitioning',
        definition:
          'A table-layout feature that divides large tables into partitions, often by range or time, to support pruning or operational maintenance.',
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
.postgres-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.postgres-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.postgres-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.postgres-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.postgres-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.postgres-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
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
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.postgres-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.postgres-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.postgres-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.postgres-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.postgres-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.postgres-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.postgres-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.postgres-help-toc-item {
  margin: 0 0 8px;
}

.postgres-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.postgres-help-toc-link:hover,
.postgres-help-toc-link:focus-visible {
  text-decoration: underline;
}

.postgres-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.postgres-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.postgres-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.postgres-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.postgres-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.postgres-help-content p,
.postgres-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.postgres-help-content p {
  margin: 0 0 10px;
}

.postgres-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.postgres-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.postgres-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.postgres-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .postgres-help-main {
    grid-template-columns: 1fr;
  }

  .postgres-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .postgres-help-window {
    min-height: auto;
  }

  .postgres-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .postgres-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .postgres-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
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
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="postgres-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

export default function MySqlPage(): JSX.Element {
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
    document.title = `MySQL (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'MySQL',
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
    <div className="postgres-help-page">
      <style>{pageStyles}</style>
      <div className="postgres-help-window" role="presentation">
        <header className="postgres-help-titlebar">
          <span className="postgres-help-titletext">MySQL</span>
          <div className="postgres-help-controls">
            <button className="postgres-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="postgres-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="postgres-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`postgres-help-tab ${activeTab === tab.id ? 'postgres-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="postgres-help-main">
          <aside className="postgres-help-toc" aria-label="Table of contents">
            <h2 className="postgres-help-toc-title">Contents</h2>
            <ul className="postgres-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="postgres-help-toc-item">
                  <a href={`#${section.id}`} className="postgres-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="postgres-help-content">
            <h1 className="postgres-help-doc-title">MySQL</h1>
            <p className="postgres-help-doc-subtitle">
              Relational database server reference covering InnoDB, transactions, indexing,
              replication, backup strategy, JSON support, partitioning, and operational tradeoffs.
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
