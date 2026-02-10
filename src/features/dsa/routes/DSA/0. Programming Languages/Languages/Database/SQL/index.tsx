import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const glossaryTerms = [
  {
    term: 'ACID',
    definition: 'Atomicity, Consistency, Isolation, Durability: the core transactional guarantees of SQL databases.',
  },
  {
    term: 'Primary key',
    definition: 'A column (or set) that uniquely identifies each row in a table.',
  },
  {
    term: 'Foreign key',
    definition: 'A constraint that enforces relationships between rows in different tables.',
  },
  {
    term: 'Index',
    definition: 'An auxiliary data structure that speeds queries at the cost of extra storage and write overhead.',
  },
  {
    term: 'Execution plan',
    definition: 'The strategy chosen by the optimizer to execute a SQL query.',
  },
  {
    term: 'Isolation level',
    definition: 'The concurrency contract that defines which anomalies are prevented.',
  },
  {
    term: 'Normalization',
    definition: 'Schema design technique that reduces duplication by organizing data into related tables.',
  },
  {
    term: 'Materialized view',
    definition: 'A precomputed query stored for fast reads, refreshed periodically or incrementally.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
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
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
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
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
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
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 6px 0 12px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #c0c0c0;
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}

.win98-table th {
  background: #e6e6e6;
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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-blocks', label: 'Core Building Blocks' },
    { id: 'core-query', label: 'Query Patterns' },
    { id: 'core-indexing', label: 'Indexing Strategies' },
    { id: 'core-lifecycle', label: 'Query Lifecycle' },
    { id: 'core-plans', label: 'Execution Plans' },
    { id: 'core-isolation', label: 'Isolation Levels' },
    { id: 'core-transactions', label: 'Transaction Patterns' },
    { id: 'core-normalization', label: 'Normalization' },
    { id: 'core-operations', label: 'Operations Checklist' },
    { id: 'core-compare', label: 'SQL vs NoSQL' },
    { id: 'core-applications', label: 'Real-World Uses' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-antipatterns', label: 'Anti-Patterns' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}
export default function SqlDatabasePage(): JSX.Element {
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
    document.title = `SQL (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'SQL',
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
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">SQL</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
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
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">SQL</h1>
            <p>
              SQL is the language of relational databases. It lets you describe what data you want instead of how to retrieve it,
              while the database optimizer figures out the fastest execution plan. This page covers the relational model, ACID
              guarantees, and the design patterns that make SQL reliable at scale.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    SQL systems organize data into related tables with enforced constraints. They excel at complex joins,
                    transactional updates, and consistent reporting. The tradeoff is more rigid schemas and more deliberate data
                    modeling compared to NoSQL alternatives.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-models" className="win98-section">
                  <h2 className="win98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-blocks" className="win98-section">
                  <h2 className="win98-heading">How It Works: Core Building Blocks</h2>
                  {coreBuildingBlocks.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-query" className="win98-section">
                  <h2 className="win98-heading">Query Patterns and Access Design</h2>
                  {queryPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-indexing" className="win98-section">
                  <h2 className="win98-heading">Indexing Strategies</h2>
                  {indexingStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-lifecycle" className="win98-section">
                  <h2 className="win98-heading">Query Lifecycle</h2>
                  {queryLifecycle.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-plans" className="win98-section">
                  <h2 className="win98-heading">Execution Plan Building Blocks</h2>
                  {executionPlans.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-isolation" className="win98-section">
                  <h2 className="win98-heading">Isolation Levels</h2>
                  <table className="win98-table">
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
                  <p>
                    Higher isolation means fewer concurrency anomalies but more locking or versioning overhead. Pick the lowest
                    level that still preserves correctness for your business rules.
                  </p>
                </section>
                <section id="core-transactions" className="win98-section">
                  <h2 className="win98-heading">Transaction Patterns</h2>
                  {transactionPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-normalization" className="win98-section">
                  <h2 className="win98-heading">Normalization and Schema Design</h2>
                  {normalizationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="win98-section">
                  <h2 className="win98-heading">Operations Checklist</h2>
                  {operationalNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">SQL vs NoSQL Comparison</h2>
                  <table className="win98-table">
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
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-antipatterns" className="win98-section">
                  <h2 className="win98-heading">Anti-Patterns to Avoid</h2>
                  <ul>
                    {antiPatterns.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decisions" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="win98-section">
                <h2 className="win98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <div key={item.term}>
                    <h3 className="win98-subheading">{item.term}</h3>
                    <p>{item.definition}</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
