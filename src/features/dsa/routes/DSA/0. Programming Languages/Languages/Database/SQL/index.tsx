import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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

