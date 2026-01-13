import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Relational model formalized (1970)',
    detail:
      'Edgar Codd defined the relational model, turning data into rows and tables with mathematical foundations for correctness.',
  },
  {
    title: 'SQL becomes a standard (1986)',
    detail:
      'ANSI and ISO standardized SQL, enabling portable queries across vendors even as each introduced unique extensions.',
  },
  {
    title: 'Client-server databases mature (1990s)',
    detail:
      'Enterprise RDBMS systems added cost-based optimizers, transactions, and robust indexing, making SQL dominant for business data.',
  },
  {
    title: 'Cloud and distributed SQL rise (2010s)',
    detail:
      'New SQL systems paired familiar query language with distributed architectures to scale horizontally without losing ACID guarantees.',
  },
]

const mentalModels = [
  {
    title: 'Tables as spreadsheets with rules',
    detail:
      'Tables look like spreadsheets, but constraints, keys, and data types enforce correctness and prevent silent errors.',
  },
  {
    title: 'Queries as set operations',
    detail:
      'SQL treats data as sets. SELECT, JOIN, and GROUP BY transform sets rather than iterating row by row.',
  },
  {
    title: 'Indexes as book indexes',
    detail:
      'Indexes are like a book index: they speed lookup but take space and must be maintained on writes.',
  },
]

const coreBuildingBlocks = [
  {
    heading: 'Schemas and tables',
    bullets: [
      'Schemas define structure, types, and constraints.',
      'Primary keys uniquely identify rows and anchor relationships.',
      'Foreign keys enforce referential integrity across tables.',
    ],
  },
  {
    heading: 'Joins and relations',
    bullets: [
      'Joins combine rows across tables by keys.',
      'Normalization reduces duplication at the cost of join complexity.',
      'Well-designed relationships prevent inconsistent data.',
    ],
  },
  {
    heading: 'Indexes',
    bullets: [
      'B-tree indexes accelerate equality and range filters.',
      'Composite indexes order by multiple columns.',
      'Covering indexes can satisfy queries without table lookups.',
    ],
  },
  {
    heading: 'Transactions (ACID)',
    bullets: [
      'Atomicity guarantees all-or-nothing changes.',
      'Consistency preserves constraints and invariants.',
      'Isolation prevents interference between concurrent queries.',
      'Durability ensures committed data survives crashes.',
    ],
  },
  {
    heading: 'Constraints',
    bullets: [
      'NOT NULL, UNIQUE, and CHECK rules validate data.',
      'Triggers enforce custom business logic when data changes.',
      'Constraints protect integrity without extra application code.',
    ],
  },
  {
    heading: 'Views and stored routines',
    bullets: [
      'Views expose reusable query logic as virtual tables.',
      'Stored procedures keep logic near data for performance.',
      'Materialized views precompute expensive queries.',
    ],
  },
]

const queryPatterns = [
  {
    title: 'Point lookups',
    detail:
      'Use primary keys or unique indexes for O(log n) access with minimal IO.',
  },
  {
    title: 'Range scans',
    detail:
      'B-tree indexes support range filters and ordered scans; match index order to your query.',
  },
  {
    title: 'Joins on selective keys',
    detail:
      'Filter early with WHERE clauses and selective join keys to reduce row explosion.',
  },
  {
    title: 'Aggregation workloads',
    detail:
      'GROUP BY and window functions handle rollups; materialized views can precompute heavy aggregates.',
  },
  {
    title: 'Pagination',
    detail:
      'Keyset pagination avoids OFFSET scan costs; use WHERE (id, created_at) > last_seen.',
  },
  {
    title: 'Analytical scans',
    detail:
      'Columnar or partitioned tables improve large scans and reduce IO.',
  },
]

const indexingStrategies = [
  {
    title: 'Single-column indexes',
    detail:
      'Best for simple filters; keep them on high-selectivity columns.',
  },
  {
    title: 'Composite indexes',
    detail:
      'Order matters: index (a, b) supports filters on a and ranges on b.',
  },
  {
    title: 'Covering indexes',
    detail:
      'Include all columns needed by the query to avoid table lookups.',
  },
  {
    title: 'Partial indexes',
    detail:
      'Index a subset of rows to reduce size and improve selectivity.',
  },
  {
    title: 'Functional indexes',
    detail:
      'Index expressions (lower(email), date(created_at)) to accelerate derived filters.',
  },
  {
    title: 'Index maintenance cost',
    detail:
      'Every index adds write overhead; measure before adding more.',
  },
]

const executionPlans = [
  {
    title: 'Sequential scan',
    detail:
      'Reads all rows; acceptable for small tables or very low selectivity.',
  },
  {
    title: 'Index scan',
    detail:
      'Uses B-tree to find matching rows quickly, then fetches table pages.',
  },
  {
    title: 'Index-only scan',
    detail:
      'Serves query entirely from index when all columns are covered.',
  },
  {
    title: 'Hash join',
    detail:
      'Builds a hash table of one input, then probes it; good for large joins.',
  },
  {
    title: 'Merge join',
    detail:
      'Requires sorted inputs; efficient for range joins and large datasets.',
  },
  {
    title: 'Nested loop join',
    detail:
      'Good for small inputs or highly selective lookups; can be slow otherwise.',
  },
]

const transactionPatterns = [
  {
    title: 'Optimistic concurrency',
    detail:
      'Use version columns and compare-and-swap updates to avoid lost updates.',
  },
  {
    title: 'Pessimistic locking',
    detail:
      'SELECT ... FOR UPDATE prevents concurrent changes but can reduce throughput.',
  },
  {
    title: 'Idempotent writes',
    detail:
      'Design operations so retries do not duplicate effects (e.g., unique constraints).',
  },
  {
    title: 'Saga workflows',
    detail:
      'Coordinate multi-step processes with compensating actions instead of long transactions.',
  },
]

const operationalNotes = [
  {
    title: 'Backups and recovery',
    detail:
      'Use point-in-time recovery with WAL or binlog to restore to exact moments.',
  },
  {
    title: 'Replication',
    detail:
      'Read replicas scale reads; async replication can lag, affecting read consistency.',
  },
  {
    title: 'Partitioning',
    detail:
      'Range or hash partitioning splits large tables for maintenance and performance.',
  },
  {
    title: 'Vacuum and bloat',
    detail:
      'MVCC systems require vacuuming; bloat hurts performance if ignored.',
  },
  {
    title: 'Connection pooling',
    detail:
      'Pools reduce connection overhead and protect databases from bursts.',
  },
  {
    title: 'Monitoring',
    detail:
      'Track slow queries, lock contention, and buffer cache hit rates.',
  },
]

const sqlVsNosql = [
  {
    dimension: 'Schema',
    sql: 'Rigid schema, enforced constraints.',
    nosql: 'Flexible schema, validation in app or optional.',
  },
  {
    dimension: 'Transactions',
    sql: 'Strong ACID across multiple tables.',
    nosql: 'Often single-document/record; limited multi-entity transactions.',
  },
  {
    dimension: 'Scaling',
    sql: 'Vertical scale with sharding/partitioning extensions.',
    nosql: 'Horizontal scale by default.',
  },
  {
    dimension: 'Querying',
    sql: 'Joins and rich SQL expressions.',
    nosql: 'Model-specific queries; joins often avoided or precomputed.',
  },
  {
    dimension: 'Consistency',
    sql: 'Strong by default.',
    nosql: 'Often eventual or tunable.',
  },
  {
    dimension: 'Best fit',
    sql: 'Transactional systems, reporting, data integrity.',
    nosql: 'Flexible, high-scale, specialized access patterns.',
  },
]

const antiPatterns = [
  'Using OR-heavy predicates that defeat indexes.',
  'Large OFFSET pagination on big tables.',
  'N+1 queries instead of joins or batch fetches.',
  'No indexes on foreign keys used in joins.',
  'Long-running transactions that hold locks.',
  'Overusing triggers for core business logic.',
]

const queryLifecycle = [
  {
    title: 'Parsing and validation',
    detail:
      'The SQL engine parses syntax, resolves names, and checks permissions and types before execution.',
  },
  {
    title: 'Optimization',
    detail:
      'A cost-based optimizer chooses join orders, index usage, and execution strategies based on statistics.',
  },
  {
    title: 'Execution',
    detail:
      'The engine executes the plan, reading indexes and tables, applying filters, joins, and aggregations.',
  },
  {
    title: 'Commit or rollback',
    detail:
      'Changes are committed atomically or rolled back in case of error or transaction abort.',
  },
]

const isolationMatrix = [
  {
    level: 'Read Uncommitted',
    behavior: 'Dirty reads possible',
    useCase: 'Rare, analytics-only',
  },
  {
    level: 'Read Committed',
    behavior: 'No dirty reads, non-repeatable reads possible',
    useCase: 'Typical OLTP default',
  },
  {
    level: 'Repeatable Read',
    behavior: 'Stable reads, phantom rows possible',
    useCase: 'Consistent reports',
  },
  {
    level: 'Serializable',
    behavior: 'Full isolation, no anomalies',
    useCase: 'Financial or inventory',
  },
]

const normalizationNotes = [
  {
    title: '1NF: atomic values',
    detail:
      'Each column holds a single value. No repeating groups or lists inside cells.',
  },
  {
    title: '2NF: eliminate partial dependency',
    detail:
      'Non-key columns depend on the whole primary key, not just part of it.',
  },
  {
    title: '3NF: eliminate transitive dependency',
    detail:
      'Non-key columns depend only on the key, not on other non-key columns.',
  },
  {
    title: 'Denormalization for speed',
    detail:
      'Duplicate data to reduce joins when read latency matters more than update cost.',
  },
]

const realWorldUses = [
  {
    context: 'Financial systems',
    detail:
      'Strong consistency and transactional integrity make SQL ideal for ledgers, payments, and audits.',
  },
  {
    context: 'Business intelligence',
    detail:
      'SQL excels at aggregations, reporting, and analytics with powerful GROUP BY and window functions.',
  },
  {
    context: 'Inventory and ordering',
    detail:
      'Constraints and transactions prevent overselling and preserve accurate counts.',
  },
  {
    context: 'SaaS platforms',
    detail:
      'Relational models map naturally to accounts, users, subscriptions, and billing relations.',
  },
]

const examples = [
  {
    title: 'Joining orders with customers',
    code: `SELECT o.id, o.total, c.name
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'PAID'
ORDER BY o.created_at DESC
LIMIT 20;`,
    explanation:
      'The JOIN stitches related tables together while filters and ordering remain expressive and readable.',
  },
  {
    title: 'Transaction to reserve inventory',
    code: `BEGIN;
UPDATE inventory
SET available = available - 1
WHERE sku = 'LAP-4810' AND available > 0;

INSERT INTO orders (sku, customer_id, status)
VALUES ('LAP-4810', 42, 'PAID');
COMMIT;`,
    explanation:
      'The transaction ensures inventory is decremented and the order is recorded atomically.',
  },
  {
    title: 'Index to accelerate lookups',
    code: `CREATE INDEX idx_orders_customer_date
ON orders (customer_id, created_at DESC);

SELECT *
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 10;`,
    explanation:
      'A composite index makes recent order lookups fast without scanning the full table.',
  },
]

const pitfalls = [
  'Overusing SELECT * and transferring more data than needed.',
  'Missing indexes on hot query paths, causing full table scans.',
  'Over-normalizing schemas and introducing too many joins for simple reads.',
  'Ignoring transaction isolation, leading to race conditions and inconsistent data.',
  'Relying on vendor-specific SQL without documenting portability tradeoffs.',
]

const decisionGuidance = [
  'Need strong consistency and constraints for critical data: choose SQL.',
  'Need complex joins and ad hoc analytics: SQL is the most expressive.',
  'Need predictable, transactional writes across multiple entities: SQL fits naturally.',
  'Need strict auditing and change history: SQL supports it with transactions and logs.',
  'Need flexible schema or massive write scale: evaluate NoSQL alternatives first.',
]

const advancedInsights = [
  {
    title: 'Query plan inspection',
    detail:
      'Use EXPLAIN to reveal join order, index usage, and scan types. Small query changes can flip performance dramatically.',
  },
  {
    title: 'Locking and contention',
    detail:
      'High write contention creates bottlenecks. Smaller transactions and proper indexes reduce lock durations.',
  },
  {
    title: 'Partitioning',
    detail:
      'Range or hash partitioning splits large tables for faster queries and easier maintenance.',
  },
  {
    title: 'Window functions',
    detail:
      'Analytical queries become concise with OVER clauses, removing the need for complex self-joins.',
  },
  {
    title: 'Distributed SQL tradeoffs',
    detail:
      'Distributed SQL provides horizontal scaling with SQL semantics, but global transactions add latency.',
  },
  {
    title: 'MVCC internals',
    detail:
      'Multi-version concurrency control keeps readers and writers separate but increases storage overhead.',
  },
]

const takeaways = [
  'SQL is the standard language for relational data with strong integrity guarantees.',
  'Schema design and indexing choices are the dominant performance levers.',
  'Transactions and isolation levels keep concurrent workloads correct.',
  'Relational modeling shines when relationships and consistency are first-class requirements.',
]

export default function SqlDatabasePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">SQL</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Relational databases powered by declarative queries and transactional safety</div>
              <p className="win95-text">
                SQL is the language of relational databases. It lets you describe what data you want instead of how to retrieve it,
                while the database optimizer figures out the fastest execution plan. This page covers the relational model, ACID
                guarantees, and the design patterns that make SQL reliable at scale.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                SQL systems organize data into related tables with enforced constraints. They excel at complex joins, transactional
                updates, and consistent reporting. The tradeoff is more rigid schemas and more deliberate data modeling compared
                to NoSQL alternatives.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: core building blocks</legend>
            <div className="win95-grid win95-grid-3">
              {coreBuildingBlocks.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Query patterns and access design</legend>
            <div className="win95-grid win95-grid-2">
              {queryPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Indexing strategies</legend>
            <div className="win95-grid win95-grid-2">
              {indexingStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Query lifecycle</legend>
            <div className="win95-grid win95-grid-2">
              {queryLifecycle.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Execution plan building blocks</legend>
            <div className="win95-grid win95-grid-2">
              {executionPlans.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Isolation levels</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Behavior</th>
                    <th>Best fit</th>
                  </tr>
                </thead>
                <tbody>
                  {isolationMatrix.map((row) => (
                    <tr key={row.level}>
                      <td>{row.level}</td>
                      <td>{row.behavior}</td>
                      <td>{row.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Higher isolation means fewer concurrency anomalies but more locking or versioning overhead. Pick the lowest level
                that still preserves correctness for your business rules.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Transaction patterns</legend>
            <div className="win95-grid win95-grid-2">
              {transactionPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Normalization and schema design</legend>
            <div className="win95-grid win95-grid-2">
              {normalizationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operations checklist</legend>
            <div className="win95-grid win95-grid-2">
              {operationalNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>SQL vs NoSQL comparison</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>SQL</th>
                    <th>NoSQL</th>
                  </tr>
                </thead>
                <tbody>
                  {sqlVsNosql.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.sql}</td>
                      <td>{row.nosql}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Anti-patterns to avoid</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {antiPatterns.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

