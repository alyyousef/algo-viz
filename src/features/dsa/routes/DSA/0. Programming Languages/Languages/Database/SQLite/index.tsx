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
  'SQLite is an embedded relational database engine delivered as a library rather than a standalone server. Applications link it directly, open a database file, and execute SQL in-process. That is why SQLite shows up inside phones, browsers, desktop tools, local-first applications, installers, test fixtures, and edge devices.',
  'Its real strength is not that it imitates a server database in miniature. Its real strength is that it removes a whole layer of infrastructure. For many products, shipping a binary and a database file is simpler, safer, and faster than running a database service.',
  'This page is intentionally thorough. It covers overview and key ideas, core syntax and APIs, ecosystem and architecture notes, use cases, tradeoffs, compare-and-contrast guidance, and practical examples for schema design, transactions, concurrency, and performance.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'SQLite is a small, fast, embeddable SQL database engine designed to run inside an application process. Instead of connecting to a separate database server, the program calls SQLite through a library and reads or writes a local database file.',
      'That deployment model makes SQLite fundamentally different from systems such as PostgreSQL or MySQL. The decision is therefore not just about SQL syntax or feature count. The real question is whether the product needs an embedded file-backed database or a shared server-grade database service.',
      'SQLite is fully relational, supports transactions, and is used in serious production systems. It should not be dismissed as a toy. It is best understood as a deliberately different kind of database system with a different operational envelope.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why SQLite Matters',
    paragraphs: [
      'Many applications need durable structured data but do not need a separate database service. They need local state, offline behavior, searchable collections, durable caches, lightweight content storage, or a portable file format that travels with the application. SQLite is excellent at those jobs.',
      'Because the engine runs in-process, there is no network hop, no connection pool, no authentication server to configure, and no background database fleet to operate. That can simplify engineering, deployment, testing, and user support dramatically.',
    ],
    bullets: [
      'Zero-admin local deployment.',
      'Strong fit for mobile, desktop, CLI, embedded, and test environments.',
      'Portable relational storage with standard SQL concepts.',
      'Useful performance profile for local read-heavy and moderate-write workloads.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The most useful mental model is this: SQLite is a database library plus a durable file format. Your application is not talking over the network to a separate database server. Your application is opening a file and using a mature SQL engine to manage the contents safely.',
      'That is why SQLite feels almost invisible operationally when it fits. It is also why certain workloads do not fit. If many independent writers across a shared backend need to coordinate constantly, a single embedded file-backed engine is usually the wrong architectural center.',
    ],
    bullets: [
      'Think embedded engine, not mini server.',
      'Think local ownership of data, not shared database infrastructure.',
      'Think one database file per app, device, tenant, or instance when that model is natural.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When SQLite Fits Best',
    paragraphs: [
      'SQLite is a strong choice when the data belongs naturally to one application instance, one device, or one local workflow. Common examples include mobile apps, desktop apps, local-first products, browser-adjacent tooling, command-line utilities, edge devices, demos, development fixtures, and application caches.',
      'It is also a great fit when distribution simplicity matters. Shipping an app with a local database file is often easier than provisioning and supporting a separate service dependency.',
    ],
    bullets: [
      'On-device application storage.',
      'Offline-first and sync-later workflows.',
      'Local analytics, content libraries, and searchable datasets.',
      'Tests, prototyping, demos, and embedded systems.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where SQLite Stops Being the Right Tool',
    paragraphs: [
      'SQLite is usually the wrong default for a shared write-heavy backend where many users, services, or workers must hit the same database concurrently over time. It can handle concurrency, especially reads, but it does not become a general-purpose client-server database simply because the SQL is familiar.',
      'It is also a poor fit when the product needs database roles, centralized administration, read replicas, cluster failover, multi-node write scaling, or operational controls that assume a long-running server process.',
    ],
    bullets: [
      'Shared multi-user service backends with frequent concurrent writes.',
      'Systems that need server-grade access control and operational observability.',
      'Architectures built around replication and fleet-managed database infrastructure.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'SQLite is a serious relational database, but it is optimized for embedding, portability, and simplicity rather than centralized service operation.',
      'Its strengths come from being local and in-process. Its weaknesses appear when teams ask it to behave like a shared server database under heavy concurrent write coordination.',
    ],
    bullets: [
      'Choose SQLite when local durability and low operational overhead matter most.',
      'Do not confuse embedded-database excellence with server-database equivalence.',
      'The architecture choice matters more than the brand name of the SQL engine.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What SQLite Actually Is',
    paragraphs: [
      'SQLite is a C library that implements a transactional SQL database engine. Applications in many languages call into that library either directly or through a wrapper. There is no required daemon or external server process in the common case.',
      'That matters because SQLite owns parsing, planning, indexing, transactions, and on-disk layout inside the same process that uses it. The surrounding application architecture is therefore simpler, but the database is also more tightly coupled to local process and file-system realities.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and File Model',
    paragraphs: [
      'A typical SQLite database lives in a single file on disk. Depending on journaling mode and current activity, SQLite may also use companion journal, WAL, or shared-memory side files. From the application point of view, though, the core abstraction is still a database file rather than a network service.',
      'This file-centric model is part of why SQLite is easy to copy, move, bundle, inspect, or create for tests. It is also why file permissions, filesystem behavior, and deployment assumptions matter more than they do with a remote server database.',
    ],
  },
  {
    id: 'core-type-system',
    title: 'Data Model, Storage Classes, and Type Affinity',
    paragraphs: [
      'SQLite supports the familiar relational model of tables, rows, columns, constraints, and indexes, but its typing rules differ from many server databases. Values are stored using a small set of storage classes such as NULL, INTEGER, REAL, TEXT, and BLOB.',
      'Column declarations still matter, but SQLite historically uses type affinity rather than rigid per-column enforcement in the way many engineers expect from PostgreSQL or SQL Server. In practice this makes SQLite flexible and portable, but it also means teams should be deliberate about validation, constraints, and application expectations.',
    ],
    bullets: [
      'Type affinity influences how values are converted or compared.',
      'SQLite is flexible by design, which can be helpful or dangerous depending on discipline.',
      'Good schema design still matters even when the engine is permissive.',
    ],
  },
  {
    id: 'core-rowid',
    title: 'Rowid, Primary Keys, and Table Identity',
    paragraphs: [
      'Many SQLite tables have an internal row identifier, usually called the rowid. A column declared as `INTEGER PRIMARY KEY` is special because it aliases that rowid. This is one of the most important SQLite-specific schema behaviors to understand.',
      'That design can be efficient and convenient, but it also means teams should choose key strategy intentionally. SQLite also supports designs that avoid rowid tables entirely when a different primary-key layout is more appropriate.',
    ],
  },
  {
    id: 'core-schema-objects',
    title: 'Schema Objects',
    paragraphs: [
      'SQLite supports the core relational objects most application engineers expect: tables, indexes, views, and triggers. That makes it capable of much more than simple key-value persistence.',
      'A well-designed SQLite schema uses ordinary relational ideas: normalized tables when appropriate, foreign keys where relationships matter, indexes that match query patterns, and views or triggers only when they clarify a real persistence rule.',
    ],
  },
  {
    id: 'core-sql-surface',
    title: 'SQL Surface and Query Patterns',
    paragraphs: [
      'SQLite supports a substantial subset of SQL for data definition, queries, joins, grouping, transactions, and conflict handling. It is powerful enough for real application logic and reporting within its intended scope.',
      'The right mindset is to write deliberate SQL shaped around the screens or operations that matter. SQLite is happiest when schema and access patterns are designed together rather than treated as an afterthought.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexes and Query Planning',
    paragraphs: [
      'Indexes are still the main performance lever. SQLite can use indexes for equality lookups, range scans, sorting, and join acceleration just like other relational engines. A missing index on a hot query path is usually more important than clever application-side micro-optimization.',
      'The engine includes a query planner, and engineers can inspect plans with tools such as `EXPLAIN QUERY PLAN`. That is worth doing when performance matters because seemingly small SQL changes can change scan strategy dramatically.',
    ],
    bullets: [
      'Index the columns you actually filter, join, or sort on.',
      'Avoid creating too many indexes on write-heavy tables.',
      'Measure with actual plans instead of guessing.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions, ACID, and Atomicity',
    paragraphs: [
      'SQLite supports ACID transactions. Atomicity and durability are not optional extras in the engine; they are core design goals. That is one reason SQLite is trusted for real application data and not just disposable cache files.',
      'The most important habit is to group related writes inside explicit transactions. Correctness improves, and performance usually improves too because the engine can commit as one unit instead of paying transaction overhead for each statement.',
    ],
  },
  {
    id: 'core-journaling',
    title: 'Rollback Journal and WAL',
    paragraphs: [
      'SQLite protects transactions using journaling mechanisms. Historically the rollback journal has been the classic model. Write-ahead logging, usually enabled through `PRAGMA journal_mode = WAL`, changes the read-write interaction and is often preferred for modern application workloads.',
      'WAL often improves concurrency because readers can continue while a writer appends to the WAL. But it does not turn SQLite into a many-writers-at-once distributed database. The single-writer principle still matters for a single database file.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Locking',
    paragraphs: [
      'SQLite can support many readers efficiently, especially in WAL mode, but writes to a given database file are serialized. That is a critical architectural fact. For local workloads, short transactions, and moderate write rates, this can be entirely acceptable.',
      'Where teams get into trouble is assuming that a shared backend with many independent writers will scale the same way a client-server database does. SQLite can be robust under concurrency, but the concurrency model is not the same as MVCC-heavy server engines built for multi-session write contention.',
    ],
    bullets: [
      'Keep write transactions short.',
      'Use WAL when the workload benefits from better reader-writer overlap.',
      'Treat one-writer-at-a-time as a real design constraint, not a footnote.',
    ],
  },
  {
    id: 'core-constraints',
    title: 'Constraints, Integrity, and Foreign Keys',
    paragraphs: [
      'SQLite supports primary keys, unique constraints, checks, and foreign keys. These are important because they keep integrity rules near the data instead of scattering them only in application code.',
      'One practical detail trips many teams: foreign key enforcement is usually enabled per connection with `PRAGMA foreign_keys = ON`. If relational integrity matters, that setting should be deliberate rather than assumed.',
    ],
  },
  {
    id: 'core-pragmas',
    title: 'PRAGMAs and Configuration',
    paragraphs: [
      'SQLite exposes a family of configuration and inspection commands called PRAGMAs. These control or report behavior such as foreign key enforcement, journal mode, synchronous level, cache behavior, busy timeout, and more.',
      'PRAGMAs are powerful because they let teams adapt SQLite to the actual workload, but they should be applied with understanding. For example, weakening durability settings for speed may be acceptable in a cache database and completely unacceptable in a durable local ledger.',
    ],
  },
  {
    id: 'core-extensions',
    title: 'Extensions and Advanced Capabilities',
    paragraphs: [
      'SQLite is not limited to plain CRUD tables. Many builds support or bundle advanced capabilities such as full-text search, JSON-oriented functions, R-Tree indexing, virtual tables, and custom functions. These features make SQLite much more capable than its tiny footprint suggests.',
      'The important caveat is portability across builds. Some features depend on compile-time options or platform packaging choices, so advanced designs should verify what the target runtime actually includes.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs, Bindings, and Ecosystem',
    paragraphs: [
      'SQLite is available almost everywhere: C, C++, Python, Java, Kotlin, Swift, JavaScript wrappers, Rust, Go, .NET, and many more. Entire platform ecosystems rely on it indirectly. Android persistence stacks, desktop applications, browser components, and local sync engines frequently sit on top of SQLite.',
      "That ubiquity is one of SQLite's biggest strengths. Learning its core behaviors pays off across many languages and products because the underlying engine concepts remain familiar even when the host API changes.",
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'SQLite can be extremely fast when the workload is local and in-process because there is no network latency and very little surrounding infrastructure overhead. Simple reads can feel almost like ordinary file access, except with the benefit of indexing, transactions, and SQL semantics.',
      'At the same time, poor schema and query design still hurt. The best performance habits are ordinary database habits: choose the right indexes, use transactions for batched writes, avoid unnecessary row materialization, measure plans, and respect the single-writer model.',
    ],
    bullets: [
      'Batch writes in transactions.',
      'Use prepared statements and parameters.',
      'Project only the columns you need.',
      'Inspect plans instead of trusting intuition.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operational Practices',
    paragraphs: [
      'SQLite is operationally simple compared with a server database, but it is not magically maintenance-free. Teams still need backup strategy, migration discipline, schema versioning, corruption handling plans, and careful thinking about filesystem placement and permissions.',
      'Live backup behavior also deserves attention. A database file should not be treated like an ordinary document if the application is actively writing to it. For serious backup workflows, use SQLite-aware backup methods or otherwise coordinate the copy safely.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'SQLite is common in mobile apps for on-device relational data, in desktop apps for local documents and metadata, in developer tools for project state, in test suites for reproducible relational fixtures, and in edge software for durable local records without a service dependency.',
      'It is also useful for local caches and local-first products that sync later to a server system. In those designs SQLite is often the reliable local source of truth even if a different database exists centrally.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use SQLite',
    paragraphs: [
      'SQLite is usually not the right central database for a write-heavy SaaS backend, a multi-tenant platform with many concurrent workers, or an environment that expects centralized database administration, roles, replication, and failover tooling.',
      'It is also a bad fit when the data lives on an unreliable shared network filesystem or when the product architecture assumes that the database is an independently managed shared service rather than a local library.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A frequent mistake is assuming SQL familiarity means operational equivalence with PostgreSQL or MySQL. Another is leaving foreign key enforcement implicit and discovering integrity gaps much later. Teams also get hurt by long write transactions, missing indexes, and treating the file as safe to manipulate casually while the database is active.',
      'There is also a cultural pitfall: because SQLite is easy to start, teams sometimes postpone database design discipline. That works for a while and then turns into migration pain, performance confusion, and hidden application-side integrity logic.',
    ],
    bullets: [
      'Do not skip `PRAGMA foreign_keys = ON` when relationships matter.',
      'Do not hold write transactions open longer than necessary.',
      'Do not assume a file copy is always a correct live backup.',
      'Do not treat SQLite as a backend scaling strategy when the architecture says otherwise.',
    ],
  },
  {
    id: 'core-compare',
    title: 'SQLite Compared with Server Databases',
    paragraphs: [
      'Compared with PostgreSQL or MySQL, SQLite wins on simplicity, portability, embeddability, and local deployment cost. Server databases win on shared concurrency, access control, centralized operations, replication, and growth into service-oriented backends.',
      'The comparison is not about which engine is more advanced in the abstract. The comparison is about whether the product wants a database library or a database service.',
    ],
  },
  {
    id: 'core-migration-path',
    title: 'Growth Path and Migration Boundary',
    paragraphs: [
      'SQLite is often a superb starting point for a local app, and it can remain the correct permanent answer if the product stays local-first or device-centric. It becomes more questionable when the center of gravity shifts toward shared backend coordination and sustained multi-writer service traffic.',
      'The right migration signal is architectural, not emotional. If the application now needs a server database, move because the workload changed, not because SQLite suddenly became "bad."',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-schema',
    title: 'Schema with Foreign Keys and Indexes',
    description: [
      'This example shows ordinary relational SQLite usage: explicit keys, foreign key enforcement, and indexes shaped around common lookups.',
      'The point is not fancy syntax. The point is to model local data with the same discipline you would use in a larger relational system.',
    ],
    code: `PRAGMA foreign_keys = ON;

CREATE TABLE notebooks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  notebook_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (notebook_id) REFERENCES notebooks(id)
);

CREATE INDEX idx_notes_notebook_updated
ON notes (notebook_id, updated_at DESC);`,
    notes: [
      'Relational integrity is explicit rather than left only to application code.',
      'The index matches a common query pattern: recent notes within one notebook.',
    ],
  },
  {
    id: 'examples-transaction',
    title: 'Transaction with WAL Enabled',
    description: [
      'WAL is a common production choice for application databases because it improves reader-writer overlap for many local workloads.',
      'The write still belongs in a real transaction because related changes should commit atomically.',
    ],
    code: `PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

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
      'WAL improves concurrency characteristics but does not remove the single-writer rule.',
      'Grouping related statements in one transaction is both safer and usually faster.',
    ],
  },
  {
    id: 'examples-upsert',
    title: 'UPSERT for Sync or Cache Refresh',
    description: [
      'SQLite supports conflict-aware writes that are extremely useful for sync systems, refresh jobs, and local caches.',
      'This avoids awkward read-then-write races in application code for many ordinary cases.',
    ],
    code: `INSERT INTO user_profiles (id, display_name, avatar_url, updated_at)
VALUES (?, ?, ?, CURRENT_TIMESTAMP)
ON CONFLICT(id) DO UPDATE SET
  display_name = excluded.display_name,
  avatar_url = excluded.avatar_url,
  updated_at = CURRENT_TIMESTAMP;`,
    notes: [
      'Conflict handling belongs in the SQL layer when the rule is a database rule.',
      'This pattern is common in sync flows and cache refresh pipelines.',
    ],
  },
  {
    id: 'examples-plan',
    title: 'Inspecting the Query Plan',
    description: [
      'When a query feels slow, do not guess. Ask SQLite what plan it intends to use.',
      'Even a quick plan inspection often reveals whether the engine is using an index or scanning too much data.',
    ],
    code: `EXPLAIN QUERY PLAN
SELECT id, title, updated_at
FROM notes
WHERE notebook_id = 7
ORDER BY updated_at DESC
LIMIT 20;`,
    notes: [
      'Query-plan inspection is one of the fastest ways to validate indexing assumptions.',
      'Measure real queries instead of optimizing based on folklore.',
    ],
  },
  {
    id: 'examples-python',
    title: 'Typical API Usage from Python',
    description: [
      'SQLite often feels most natural when embedded directly into application code. Python makes that obvious because the standard library already includes a SQLite binding.',
      'The important practices are the same in any language: enable the settings you care about, use parameters, and keep transaction boundaries explicit.',
    ],
    code: `import sqlite3

conn = sqlite3.connect("app.db")
conn.execute("PRAGMA foreign_keys = ON")

with conn:
    conn.execute(
        "INSERT INTO notes (notebook_id, title, body) VALUES (?, ?, ?)",
        (7, "Ideas", "Use transactions for batch writes"),
    )

rows = conn.execute(
    "SELECT id, title FROM notes WHERE notebook_id = ? ORDER BY updated_at DESC",
    (7,),
).fetchall()`,
    notes: [
      'Parameterized statements prevent SQL injection and improve correctness.',
      "Embedded usage is one of the clearest demonstrations of SQLite's design philosophy.",
    ],
  },
  {
    id: 'examples-trigger',
    title: 'Trigger for Derived Maintenance Logic',
    description: [
      'Triggers are not always necessary, but they can be appropriate when a simple data-maintenance rule belongs close to the schema.',
      'As with all database logic, the goal is clarity and predictability, not magic.',
    ],
    code: `CREATE TRIGGER notes_set_updated_at
AFTER UPDATE OF title, body ON notes
FOR EACH ROW
BEGIN
  UPDATE notes
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
END;`,
    notes: [
      'Use triggers sparingly and document them well.',
      'If a rule is central to data correctness, the database can be a reasonable place to enforce it.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-engine',
    title: 'Core Engine Terms',
    terms: [
      {
        term: 'Embedded database',
        definition: 'A database engine linked into an application rather than run as a separate server process.',
      },
      {
        term: 'Database file',
        definition: 'The on-disk file that stores SQLite tables, indexes, and schema metadata.',
      },
      {
        term: 'Rowid',
        definition: 'An internal integer identifier present in many SQLite tables unless the schema is designed otherwise.',
      },
      {
        term: 'Type affinity',
        definition: "SQLite's rule set for how declared column types influence storage and comparison behavior.",
      },
      {
        term: 'PRAGMA',
        definition: 'A SQLite command used to configure, inspect, or tune database behavior.',
      },
      {
        term: 'Virtual table',
        definition: 'A table-like interface implemented by an extension or module rather than ordinary on-disk storage alone.',
      },
    ],
  },
  {
    id: 'glossary-transactions',
    title: 'Transaction and Durability Terms',
    terms: [
      {
        term: 'ACID',
        definition: 'Atomicity, consistency, isolation, and durability: the classic transactional guarantees.',
      },
      {
        term: 'Rollback journal',
        definition: 'A journaling mode that preserves atomicity by recording information needed to undo a transaction.',
      },
      {
        term: 'WAL',
        definition: 'Write-ahead logging mode in which changes are appended to a WAL file before checkpointing back into the main database.',
      },
      {
        term: 'Checkpoint',
        definition: 'The process of moving committed WAL contents back into the main database file.',
      },
      {
        term: 'Busy timeout',
        definition: 'A setting that controls how long SQLite waits when a lock cannot be acquired immediately.',
      },
      {
        term: 'Single writer',
        definition: 'The practical rule that one database file accepts one writer at a time even when many readers may coexist.',
      },
    ],
  },
  {
    id: 'glossary-schema',
    title: 'Schema and Query Terms',
    terms: [
      {
        term: 'Index',
        definition: 'An auxiliary structure that accelerates specific query patterns at the cost of extra storage and write overhead.',
      },
      {
        term: 'Foreign key',
        definition: 'A relational constraint that ties rows in one table to rows in another.',
      },
      {
        term: 'Trigger',
        definition: 'Database logic that runs automatically in response to certain data changes.',
      },
      {
        term: 'View',
        definition: 'A named query that behaves like a virtual table for reading data.',
      },
      {
        term: 'Full-text search',
        definition: 'A search-oriented capability available in many SQLite builds for tokenized text lookup.',
      },
      {
        term: 'EXPLAIN QUERY PLAN',
        definition: "A SQLite command that reveals the planner's chosen scan and index strategy for a query.",
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
    { id: 'core-architecture', label: 'Architecture' },
    { id: 'core-type-system', label: 'Type System' },
    { id: 'core-rowid', label: 'Rowid and Keys' },
    { id: 'core-schema-objects', label: 'Schema Objects' },
    { id: 'core-sql-surface', label: 'SQL Surface' },
    { id: 'core-indexing', label: 'Indexes and Plans' },
    { id: 'core-transactions', label: 'Transactions' },
    { id: 'core-journaling', label: 'Journaling and WAL' },
    { id: 'core-concurrency', label: 'Concurrency and Locking' },
    { id: 'core-constraints', label: 'Constraints' },
    { id: 'core-pragmas', label: 'PRAGMAs' },
    { id: 'core-extensions', label: 'Extensions' },
    { id: 'core-apis', label: 'APIs and Ecosystem' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-use-cases', label: 'Use Cases' },
    { id: 'core-not-fit', label: 'When Not to Use It' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-migration-path', label: 'Growth Path' },
  ],
  examples: [
    { id: 'examples-schema', label: 'Schema Example' },
    { id: 'examples-transaction', label: 'Transaction Example' },
    { id: 'examples-upsert', label: 'UPSERT Example' },
    { id: 'examples-plan', label: 'Query Plan Example' },
    { id: 'examples-python', label: 'API Example' },
    { id: 'examples-trigger', label: 'Trigger Example' },
  ],
  glossary: [
    { id: 'glossary-engine', label: 'Core Engine Terms' },
    { id: 'glossary-transactions', label: 'Transaction Terms' },
    { id: 'glossary-schema', label: 'Schema Terms' },
  ],
}

const pageStyles = `
.sqlite-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sqlite-help-window {
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

.sqlite-help-titlebar {
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

.sqlite-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.sqlite-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.sqlite-help-control {
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

.sqlite-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.sqlite-help-tab {
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

.sqlite-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.sqlite-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.sqlite-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.sqlite-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.sqlite-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sqlite-help-toc-item {
  margin: 0 0 8px;
}

.sqlite-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sqlite-help-toc-link:hover,
.sqlite-help-toc-link:focus-visible {
  text-decoration: underline;
}

.sqlite-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.sqlite-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.sqlite-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.sqlite-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.sqlite-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.sqlite-help-content p,
.sqlite-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.sqlite-help-content p {
  margin: 0 0 10px;
}

.sqlite-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sqlite-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.sqlite-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.sqlite-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .sqlite-help-main {
    grid-template-columns: 1fr;
  }

  .sqlite-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .sqlite-help-window {
    min-height: auto;
  }

  .sqlite-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .sqlite-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .sqlite-help-controls {
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
    <section key={section.id} id={section.id} className="sqlite-help-section">
      <h2 className="sqlite-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="sqlite-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="sqlite-help-section">
      <h2 className="sqlite-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="sqlite-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="sqlite-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="sqlite-help-section">
      <h2 className="sqlite-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="sqlite-help-divider" />}
    </section>
  )
}

export default function SQLitePage(): JSX.Element {
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
    document.title = `SQLite (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'SQLite',
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
    <div className="sqlite-help-page">
      <style>{pageStyles}</style>
      <div className="sqlite-help-window" role="presentation">
        <header className="sqlite-help-titlebar">
          <span className="sqlite-help-titletext">SQLite</span>
          <div className="sqlite-help-controls">
            <button
              className="sqlite-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="sqlite-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="sqlite-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`sqlite-help-tab ${activeTab === tab.id ? 'sqlite-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="sqlite-help-main">
          <aside className="sqlite-help-toc" aria-label="Table of contents">
            <h2 className="sqlite-help-toc-title">Contents</h2>
            <ul className="sqlite-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="sqlite-help-toc-item">
                  <a href={`#${section.id}`} className="sqlite-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="sqlite-help-content">
            <h1 className="sqlite-help-doc-title">SQLite</h1>
            <p className="sqlite-help-doc-subtitle">
              Embedded SQL database reference covering architecture, typing, transactions, journaling,
              indexing, APIs, ecosystem, and real-world tradeoffs.
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

