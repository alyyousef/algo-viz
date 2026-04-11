import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'PostgreSQL is a client-server relational database known for strong correctness, deep SQL support, extensibility, and long-term reliability under shared multi-user workloads. It is often chosen when teams want a serious system-of-record database that can start simply and still scale into more demanding product architecture over time.',
  'The key idea is not just that PostgreSQL stores tables. Many systems do that. PostgreSQL matters because it combines transactions, rich query capabilities, concurrency control, indexing depth, operational tooling, and extension support in one database platform that works well for backend services, SaaS systems, analytics-aware applications, and data-intensive products.',
  'This page is intentionally thorough. It covers overview and key ideas, SQL and API concepts, architecture and ecosystem notes, use cases, tradeoffs, operational concerns, extension strategy, and practical examples across schema design, indexing, transactions, JSONB, and partitioning.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'PostgreSQL is a full relational database server built for shared access, durability, and complex data workloads. Applications connect to it over the network or local sockets, and the database manages sessions, transactions, storage, indexing, permissions, and background maintenance.',
      'It is widely respected because it offers both strong fundamentals and room to grow. Teams can use PostgreSQL for ordinary CRUD business data, but they can also lean on advanced SQL, JSONB, geospatial support, full-text search, materialized views, partitioning, logical replication, and extensions without immediately changing platforms.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why PostgreSQL Matters',
    paragraphs: [
      'Many applications need more than a simple datastore. They need a shared transactional system where multiple services and users interact safely, where data integrity rules are enforced, and where query capability stays expressive as the product evolves. PostgreSQL is often the default answer to that class of problem.',
      'It is also strategically valuable because it lets teams postpone unnecessary fragmentation. Instead of introducing separate systems for relational data, moderate analytics, flexible JSON documents, search-like features, and background data workflows too early, PostgreSQL can often handle a large amount of that scope well.',
    ],
    bullets: [
      'Strong ACID transactions and shared concurrency.',
      'Deep SQL support with broad indexing and query-planning capabilities.',
      'Extension ecosystem that meaningfully expands the platform.',
      'Operational fit for serious backend and system-of-record workloads.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a durable, shared database service with strong transactional guarantees and a rich optimizer-driven query engine. PostgreSQL is not just a place to put rows. It is a platform for modeling relationships, coordinating concurrent access, and serving evolving application logic around data.',
      'That means design choices in PostgreSQL are rarely only about syntax. Schema design, indexing, transaction boundaries, query shape, roles, maintenance, and migration discipline all matter because the database is a long-lived operational component, not just a file or library embedded inside one app.',
    ],
    bullets: [
      'Think database service, not local data file.',
      'Think long-term schema and query evolution, not only initial CRUD.',
      'Think operational ownership alongside data modeling.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When PostgreSQL Fits Best',
    paragraphs: [
      'PostgreSQL fits well when many users or services share the same data, when correctness and transactions matter, or when the application expects its query needs to grow in sophistication over time. Typical examples include SaaS products, internal platforms, customer data systems, transactional APIs, financial workflows, analytics-aware product backends, and multi-tenant business software.',
      'It is also a strong choice when the team wants to avoid painting itself into a corner. PostgreSQL can support simple product phases and still remain relevant when the schema, reporting, concurrency, and operational requirements become more demanding.',
    ],
    bullets: [
      'Shared backend systems with concurrent writes.',
      'Business workflows where constraints and consistency matter.',
      'Applications that benefit from rich joins, aggregates, and SQL expressiveness.',
      'Products likely to evolve rather than stay permanently small and local.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where PostgreSQL Is Not the Best Default',
    paragraphs: [
      'PostgreSQL is not always the right answer when the data is naturally local to one device or process, when the application needs a zero-admin embedded store, or when a deliberately specialized database model is the better match. A mobile app with local-only persistence often wants SQLite. A pure in-memory ephemeral state problem may want Redis.',
      'It can also be overkill when the team is forced to carry server operations for a workload that does not need a server at all. PostgreSQL is powerful, but power still has operational cost.',
    ],
    bullets: [
      'Local-only embedded app storage.',
      'Ultra-simple workloads where a server database adds unnecessary complexity.',
      'Cases where a specialized engine is clearly a better fit for the access model.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'PostgreSQL is often the safest relational default for serious backend applications because it balances correctness, feature depth, and long-term growth potential extremely well.',
      'Its real value comes from combining transactional reliability with expressive querying and operational maturity, not from any one headline feature in isolation.',
    ],
    bullets: [
      'Choose PostgreSQL when the database is a shared service, not a local file.',
      'Use its relational strengths deliberately rather than treating it as a generic blob store.',
      'Expect schema, indexes, migrations, and operations to be part of the design from the beginning.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What PostgreSQL Actually Is',
    paragraphs: [
      'PostgreSQL is a standalone database server that stores data on disk, manages concurrent sessions, executes SQL, and enforces transactional correctness. Clients connect through drivers or ORMs, but the core system is a long-running service with its own storage engine, planner, executor, catalog, and maintenance processes.',
      'That service model matters because PostgreSQL is meant to sit at the center of a shared application architecture. Multiple services, workers, dashboards, and user-facing APIs can all interact with the same data while the database coordinates concurrency and persistence.',
    ],
  },
  {
    id: 'core-relational-model',
    title: 'Schemas, Tables, and the Relational Model',
    paragraphs: [
      'PostgreSQL organizes data using schemas, tables, rows, columns, constraints, indexes, views, and functions. Schemas provide namespacing and organizational boundaries inside one database. Tables model entities and relationships in the ordinary relational way.',
      'The engine is strongest when teams take relational modeling seriously: clear keys, explicit foreign-key relationships where appropriate, normalized structure when it helps integrity, and denormalization only when there is a measured reason.',
    ],
  },
  {
    id: 'core-types',
    title: 'Type System and Data Modeling',
    paragraphs: [
      'PostgreSQL has a rich type system that includes integers of multiple sizes, numeric types, text types, booleans, timestamps, JSON and JSONB, arrays, UUIDs, enums, ranges, geometric types, and extension-provided types. This is one of the reasons schemas can stay expressive and self-describing.',
      'Good type choice improves both correctness and query clarity. A timestamp with time zone carries different meaning than plain text pretending to hold a date, and a UUID is a better identity field than an ad hoc string with unclear format rules.',
    ],
    bullets: [
      'Use precise types instead of overly generic text fields.',
      'Let schema communicate meaning, not only storage format.',
      'JSONB is powerful, but it should not replace deliberate modeling by default.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and ACID Guarantees',
    paragraphs: [
      'PostgreSQL is built around transactions. Groups of statements can succeed or fail atomically, and the database ensures committed state remains durable according to its durability configuration. This is central to why PostgreSQL is trusted for payments, inventory, ledgers, and other correctness-sensitive systems.',
      'The practical lesson is that transactions are not an advanced feature reserved for rare cases. They are often the normal boundary for multi-step business operations and should be designed deliberately instead of left to accidental autocommit behavior.',
    ],
  },
  {
    id: 'core-mvcc',
    title: 'MVCC and Concurrency Control',
    paragraphs: [
      'PostgreSQL uses multi-version concurrency control, usually called MVCC, so readers and writers can proceed with less blocking than a simpler lock-everything model. Readers see a transactionally consistent snapshot, while writers create new row versions.',
      'This is one of the foundations of PostgreSQL performance and concurrency under shared workloads. It also explains why maintenance tasks such as vacuuming matter, because old row versions must eventually be cleaned up.',
    ],
  },
  {
    id: 'core-isolation',
    title: 'Isolation Levels and Correctness',
    paragraphs: [
      'PostgreSQL supports multiple isolation levels such as Read Committed, Repeatable Read, and Serializable. These define what anomalies are possible and what consistency guarantees transaction participants receive under concurrency.',
      'The right isolation level depends on business rules. Many workloads are safe with the default behavior, while financial or inventory-sensitive workflows may need stronger constraints or explicit locking strategies to avoid subtle anomalies.',
    ],
  },
  {
    id: 'core-wal',
    title: 'Write-Ahead Logging and Durability',
    paragraphs: [
      'PostgreSQL uses write-ahead logging, or WAL, to ensure crash recovery and support replication and backups. Changes are recorded in WAL before they are considered durably committed, which allows recovery after failure and makes point-in-time restoration possible.',
      'WAL is not just an internal implementation detail. It is part of the operational story of PostgreSQL because replication, backup strategy, restore planning, and durability tuning all depend on it.',
    ],
  },
  {
    id: 'core-indexes',
    title: 'Indexes and Access Paths',
    paragraphs: [
      'PostgreSQL supports multiple index types including B-tree, GIN, GiST, BRIN, and hash indexes, with B-tree being the ordinary default for equality and range queries. The richer families matter because different workloads need different access strategies.',
      'GIN is often important for JSONB and full-text search. BRIN can be attractive for very large append-oriented tables. GiST matters for geospatial and other specialized comparisons. Index choice should follow query patterns, not marketing familiarity.',
    ],
    bullets: [
      'Start with B-tree for common equality and range access.',
      'Use specialized indexes only when the data and queries justify them.',
      'Every extra index adds write overhead and maintenance cost.',
    ],
  },
  {
    id: 'core-planner',
    title: 'Query Planner and Execution',
    paragraphs: [
      'PostgreSQL uses a cost-based optimizer to choose execution plans. It estimates row counts, join orders, scan strategies, and index usage using statistics about the data. That is why the same SQL can behave very differently as data distribution changes.',
      'The practical implication is that `EXPLAIN` and `EXPLAIN ANALYZE` are core engineering tools. When performance matters, teams should inspect what plan PostgreSQL is actually using instead of assuming the problem or the solution.',
    ],
  },
  {
    id: 'core-jsonb',
    title: 'JSONB and Hybrid Modeling',
    paragraphs: [
      'PostgreSQL supports JSON and JSONB, with JSONB being the more query-friendly binary representation. This lets teams store semi-structured documents alongside strongly typed relational columns and still query inside those documents efficiently.',
      'JSONB is powerful because it can reduce the pressure to over-normalize or introduce a separate document database too early. The risk is overusing it until the schema becomes opaque and query semantics become harder to reason about than an explicit relational model.',
    ],
  },
  {
    id: 'core-functions',
    title: 'Views, Functions, Procedures, and Triggers',
    paragraphs: [
      'PostgreSQL supports views, materialized views, triggers, functions, and procedures, which means teams can move some data logic into the database when that improves correctness, reuse, or performance. This can be extremely useful in mature systems.',
      'The engineering discipline is to keep database-side logic understandable and intentional. If every business rule disappears into opaque trigger webs and procedural code, the database becomes harder to operate and review rather than more reliable.',
    ],
  },
  {
    id: 'core-extensions',
    title: 'Extensions and Ecosystem Depth',
    paragraphs: [
      'One of PostgreSQLs strongest advantages is its extension ecosystem. Common examples include PostGIS for geospatial workloads, pg_trgm for similarity search, UUID support, extension-managed indexing features, and many operational or developer-quality-of-life additions.',
      'Extensions make PostgreSQL feel more like a database platform than a narrow server. They are powerful, but they should still be selected carefully because they affect operations, compatibility, migrations, and long-term support expectations.',
    ],
  },
  {
    id: 'core-replication',
    title: 'Replication, Backups, and Recovery',
    paragraphs: [
      'PostgreSQL supports physical replication, logical replication, backups, restore workflows, and point-in-time recovery. These are central features for production deployments because they allow teams to plan for failure, read scaling, migrations, and operational continuity.',
      "The key mindset is that backup strategy is part of the system design, not an afterthought. A database is only as trustworthy as the team's ability to recover it under realistic failure conditions.",
    ],
  },
  {
    id: 'core-partitioning',
    title: 'Partitioning and Large Tables',
    paragraphs: [
      'PostgreSQL supports partitioning so very large tables can be split by range, list, or hash criteria. This can improve manageability and sometimes performance when the access pattern aligns with the partitioning scheme.',
      'Partitioning is not magic. It adds design and operational complexity, and it works best when the query workload has a clear dimension such as time or tenant distribution that naturally prunes partitions.',
    ],
  },
  {
    id: 'core-roles',
    title: 'Roles, Permissions, and Multi-User Operation',
    paragraphs: [
      'Because PostgreSQL is a shared server database, roles and permissions matter. Teams can grant and restrict access at database, schema, table, and function levels, which makes PostgreSQL appropriate for environments where multiple services or users should not all operate with the same privileges.',
      'This is a major difference from embedded databases. Security design is part of the database architecture, not just an application-layer convention.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations: Vacuum, Analyze, and Maintenance',
    paragraphs: [
      'PostgreSQL requires ongoing maintenance work such as vacuuming dead tuples, analyzing statistics, monitoring replication lag, checking long-running transactions, and tuning memory or connection behavior. Managed services can reduce the burden, but they do not remove the concepts.',
      'Healthy PostgreSQL operation means respecting the fact that the database is a live service with internal processes and physical storage behavior. Ignoring maintenance usually shows up first as degraded performance and later as operational risk.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Most PostgreSQL performance problems are not solved by vague hand-waving about hardware. They are usually solved by better schema design, better indexes, better query shape, fewer unnecessary round trips, smarter batching, smaller result sets, and a clear understanding of what the planner is doing.',
      'The best posture is empirical: inspect plans, measure query latency, understand row counts, and tune based on actual workload rather than folklore. PostgreSQL rewards engineers who reason from data rather than assumptions.',
    ],
    bullets: [
      'Use `EXPLAIN ANALYZE` on real hot queries.',
      'Prefer well-shaped indexes over application-side guesswork.',
      'Avoid oversized transactions and unbounded query patterns.',
      'Know when connection pooling is part of the fix.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'PostgreSQL is used for SaaS backends, identity and user-account systems, finance and billing workflows, inventory systems, workflow engines, internal business platforms, product analytics with moderate complexity, geospatial applications, and systems that need both relational integrity and flexible query power.',
      'It is often the place where multiple other systems eventually converge because it handles the ordinary hard parts of application data very well.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use PostgreSQL',
    paragraphs: [
      'PostgreSQL is not automatically the right answer when the workload is purely local and embedded, when the data model is better expressed by a specialized engine, or when the team is introducing a server database solely out of habit for a problem that does not require one.',
      'It can also be a poor fit when teams try to force it into roles that a simpler cache, queue, or search engine would handle more cleanly and cheaply as a companion system.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Frequent mistakes include weak indexing discipline, oversized ORMs generating poor query patterns, ignoring transaction boundaries, letting long-running transactions accumulate, treating JSONB as an excuse to avoid schema thinking, and assuming that backups are handled just because the database is popular.',
      'Another major pitfall is confusing feature abundance with architectural clarity. PostgreSQL can do a lot, but that does not mean every feature should be used at once or that the database should become an unstructured dumping ground for all product state.',
    ],
    bullets: [
      'Do not skip plan inspection on hot paths.',
      'Do not ignore vacuum and statistics health.',
      'Do not let JSONB become uncontrolled schema avoidance.',
      'Do not assume operational maturity without actual recovery practice.',
    ],
  },
  {
    id: 'core-compare',
    title: 'PostgreSQL Compared with SQLite, MySQL, and Redis',
    paragraphs: [
      'Compared with SQLite, PostgreSQL is heavier operationally but far stronger for shared concurrent server workloads. Compared with MySQL, PostgreSQL is often chosen for richer SQL behavior, extension depth, and some advanced modeling patterns, though both can serve serious production systems. Compared with Redis, PostgreSQL is much stronger for durable relational data, while Redis is stronger for low-latency in-memory state primitives.',
      'The practical comparison is always about workload shape, concurrency, operations, and growth path rather than slogans about which engine is the "best."',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose PostgreSQL when the data is shared, transactional, relational, and likely to evolve in complexity over time. Choose something else when the problem is clearly local-only, memory-first, or specialized enough that a different model wins naturally.',
      'For many backend teams, PostgreSQL remains the most responsible default starting point precisely because it handles ordinary hard problems so well.',
    ],
    bullets: [
      'Shared multi-user data and transactions: strong PostgreSQL signal.',
      'Need rich joins and long-term schema evolution: strong PostgreSQL signal.',
      'Need embedded zero-admin local storage: weak PostgreSQL signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-schema',
    title: 'Relational Schema with Constraints',
    description: [
      'This example shows the ordinary strength of PostgreSQL: clear types, keys, timestamps, and constraints for shared business data.',
      'The point is not exotic syntax. The point is that PostgreSQL makes correctness and structure first-class.',
    ],
    code: `CREATE TABLE accounts (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES accounts(id),
  total_cents BIGINT NOT NULL CHECK (total_cents >= 0),
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
    notes: [
      'Keys and constraints make correctness part of the schema.',
      'Typed timestamps and checks reduce application-side ambiguity.',
    ],
  },
  {
    id: 'examples-transaction',
    title: 'Transaction for a Money Transfer',
    description: [
      'PostgreSQL is often chosen because multi-step business workflows need clear transactional boundaries under shared concurrency.',
      'This kind of operation is ordinary database work, not an exotic edge case.',
    ],
    code: `BEGIN;

UPDATE accounts
SET balance_cents = balance_cents - 5000
WHERE id = 1;

UPDATE accounts
SET balance_cents = balance_cents + 5000
WHERE id = 2;

INSERT INTO transfers (from_account, to_account, amount_cents)
VALUES (1, 2, 5000);

COMMIT;`,
    notes: [
      'A transaction defines the correctness boundary.',
      'If one step fails, the system can roll back the whole change set.',
    ],
  },
  {
    id: 'examples-index',
    title: 'Composite Index for a Hot Query Path',
    description: [
      'Indexes should follow real query patterns instead of being added casually. This example matches a common "recent records by owner" access path.',
      'The database gets faster not because indexes are magic, but because the index shape matches the question the application asks repeatedly.',
    ],
    code: `CREATE INDEX idx_invoices_account_created
ON invoices (account_id, created_at DESC);

SELECT id, total_cents, status, created_at
FROM invoices
WHERE account_id = 42
ORDER BY created_at DESC
LIMIT 20;`,
    notes: [
      'Composite index order matters.',
      'Design indexes against actual filters and sort patterns.',
    ],
  },
  {
    id: 'examples-jsonb',
    title: 'JSONB for Flexible Metadata',
    description: [
      'JSONB is useful when part of the model is relational and part is more flexible or sparse.',
      'Used carefully, it lets PostgreSQL absorb moderate document-like needs without abandoning relational structure.',
    ],
    code: `CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_payload_gin
ON events USING GIN (payload);

SELECT id
FROM events
WHERE payload @> '{"source":"mobile"}';`,
    notes: [
      'JSONB is strongest when paired with deliberate indexing.',
      'Do not let flexible documents replace clear schema everywhere by default.',
    ],
  },
  {
    id: 'examples-explain',
    title: 'Inspecting a Query Plan',
    description: [
      'When PostgreSQL performance matters, plan inspection is not optional. It is part of normal engineering work.',
      'This is often the fastest way to see whether the optimizer is scanning, joining, or indexing the way you expect.',
    ],
    code: `EXPLAIN ANALYZE
SELECT id, total_cents
FROM invoices
WHERE account_id = 42
ORDER BY created_at DESC
LIMIT 20;`,
    notes: [
      'Use plan inspection to validate assumptions instead of guessing.',
      'Actual row counts often explain performance surprises more clearly than theory does.',
    ],
  },
  {
    id: 'examples-partitioning',
    title: 'Range Partitioning by Month',
    description: [
      'Partitioning is useful when table growth and query shape align around a natural boundary such as time.',
      'It is valuable when used deliberately and unnecessary when added just because the feature exists.',
    ],
    code: `CREATE TABLE audit_logs (
  id BIGSERIAL,
  created_at TIMESTAMPTZ NOT NULL,
  actor_id BIGINT NOT NULL,
  action TEXT NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_logs_2026_01
PARTITION OF audit_logs
FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');`,
    notes: [
      'Partitioning helps most when queries naturally prune partitions.',
      'It adds operational structure and should have a real reason behind it.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core PostgreSQL Terms',
    terms: [
      {
        term: 'Schema',
        definition:
          'A namespace inside a PostgreSQL database used to organize tables, views, functions, and other objects.',
      },
      {
        term: 'MVCC',
        definition:
          'Multi-version concurrency control, the mechanism PostgreSQL uses so readers and writers can interact with less blocking.',
      },
      {
        term: 'WAL',
        definition:
          'Write-ahead log used for durability, crash recovery, replication, and point-in-time restore.',
      },
      {
        term: 'JSONB',
        definition:
          'A binary JSON representation in PostgreSQL that supports indexing and query operations.',
      },
      {
        term: 'Role',
        definition: 'A PostgreSQL identity used for authentication and privilege management.',
      },
      {
        term: 'Extension',
        definition:
          'A package that adds functionality to PostgreSQL, such as new types, operators, or functions.',
      },
    ],
  },
  {
    id: 'glossary-performance',
    title: 'Performance and Storage Terms',
    terms: [
      {
        term: 'B-tree index',
        definition: 'The default PostgreSQL index type for equality and range lookups.',
      },
      {
        term: 'GIN index',
        definition: 'An index type often used for JSONB, arrays, and full-text search.',
      },
      {
        term: 'Vacuum',
        definition: 'Background or manual cleanup of dead row versions produced by MVCC activity.',
      },
      {
        term: 'Analyze',
        definition:
          'Statistic collection that helps the PostgreSQL planner estimate row counts and choose plans.',
      },
      {
        term: 'Partition',
        definition: 'A child table that stores one slice of a partitioned table.',
      },
      {
        term: 'EXPLAIN ANALYZE',
        definition:
          'A PostgreSQL command that runs a query and reports its actual execution plan and timing.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Operational Terms',
    terms: [
      {
        term: 'Physical replication',
        definition:
          'Replication of PostgreSQL storage changes at the WAL level to standby servers.',
      },
      {
        term: 'Logical replication',
        definition:
          'Replication of selected data changes in a more object-aware form than raw physical replication.',
      },
      {
        term: 'Point-in-time recovery',
        definition:
          'Restoring a PostgreSQL database to a chosen point using backups plus WAL replay.',
      },
      {
        term: 'Connection pool',
        definition:
          'A managed pool of reusable database connections used to limit overhead and control load.',
      },
      {
        term: 'System of record',
        definition: 'The authoritative database where long-term business truth is maintained.',
      },
      {
        term: 'Serializable isolation',
        definition:
          'The strongest standard PostgreSQL isolation level, designed to prevent transaction anomalies.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-mental-model', label: 'Mental Model' },
    { id: 'bp-when-it-fits', label: 'When It Fits' },
    { id: 'bp-when-it-does-not-fit', label: 'When It Does Not Fit' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-what-it-is', label: 'What It Is' },
    { id: 'core-relational-model', label: 'Schemas and Tables' },
    { id: 'core-types', label: 'Type System' },
    { id: 'core-transactions', label: 'Transactions' },
    { id: 'core-mvcc', label: 'MVCC' },
    { id: 'core-isolation', label: 'Isolation Levels' },
    { id: 'core-wal', label: 'WAL and Durability' },
    { id: 'core-indexes', label: 'Indexes' },
    { id: 'core-planner', label: 'Planner and Execution' },
    { id: 'core-jsonb', label: 'JSONB' },
    { id: 'core-functions', label: 'Views and Functions' },
    { id: 'core-extensions', label: 'Extensions' },
    { id: 'core-replication', label: 'Replication and Recovery' },
    { id: 'core-partitioning', label: 'Partitioning' },
    { id: 'core-roles', label: 'Roles and Permissions' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-use-cases', label: 'Use Cases' },
    { id: 'core-not-fit', label: 'When Not to Use It' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-decision', label: 'Decision Checklist' },
  ],
  examples: [
    { id: 'examples-schema', label: 'Schema Example' },
    { id: 'examples-transaction', label: 'Transaction Example' },
    { id: 'examples-index', label: 'Index Example' },
    { id: 'examples-jsonb', label: 'JSONB Example' },
    { id: 'examples-explain', label: 'EXPLAIN Example' },
    { id: 'examples-partitioning', label: 'Partitioning Example' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-performance', label: 'Performance Terms' },
    { id: 'glossary-operations', label: 'Operational Terms' },
  ],
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

export default function PostgreSqlPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'PostgreSQL',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="PostgreSQL"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">PostgreSQL</h1>
      <p className="postgres-help-doc-subtitle">
        Relational database server reference covering transactions, MVCC, WAL, indexing, extensions,
        replication, partitioning, and operational tradeoffs.
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
    </TopicPageShell>
  )
}
