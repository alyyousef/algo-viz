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
    title: 'Relational model proposed (1970)',
    detail:
      'E. F. Codd introduces the relational model, separating data from physical storage and enabling declarative querying.',
  },
  {
    title: 'SQL emerges from SEQUEL (1974)',
    detail:
      'IBM develops SEQUEL, later SQL, to express relational queries in a human-friendly language.',
  },
  {
    title: 'SQL becomes ANSI standard (1986)',
    detail:
      'Standardization drives cross-vendor compatibility while allowing extensions for performance.',
  },
  {
    title: 'Modern SQL adds analytics (2003+)',
    detail:
      'Window functions, CTEs, and JSON support expand SQL into analytics and mixed workloads.',
  },
]

const mentalModels = [
  {
    title: 'Describe the result, not the steps',
    detail:
      'SQL is declarative: you specify what you want, and the optimizer decides how to fetch it.',
  },
  {
    title: 'Tables as sets',
    detail:
      'Rows behave like a set; operations like joins, filters, and projections are set transformations.',
  },
  {
    title: 'Schema as a contract',
    detail:
      'Constraints, types, and indexes define the contract for data integrity and performance.',
  },
]

const coreConcepts = [
  {
    heading: 'Data modeling',
    bullets: [
      'Tables define entities; columns define attributes with types.',
      'Primary keys guarantee uniqueness; foreign keys link entities.',
      'Normalization reduces redundancy; denormalization improves read speed.',
    ],
  },
  {
    heading: 'Querying and joins',
    bullets: [
      'SELECT filters and projects rows using WHERE and ORDER BY.',
      'JOINs combine tables by keys; choice of join affects cardinality.',
      'Aggregations summarize data with GROUP BY and HAVING.',
    ],
  },
  {
    heading: 'Indexes and performance',
    bullets: [
      'Indexes speed up lookups but add write overhead.',
      'Composite indexes must match query patterns.',
      'Explain plans reveal how the optimizer executes queries.',
    ],
  },
  {
    heading: 'Transactions and consistency',
    bullets: [
      'ACID properties ensure correctness under concurrency.',
      'Isolation levels trade consistency for throughput.',
      'Locks and MVCC prevent corruption in multi-user workloads.',
    ],
  },
]

const architectureNotes = [
  {
    title: 'Query optimizer',
    detail:
      'The optimizer chooses join order, index usage, and execution strategies based on statistics.',
  },
  {
    title: 'Storage engines',
    detail:
      'Row-based engines favor OLTP; columnar engines favor analytics.',
  },
  {
    title: 'Connection pooling',
    detail:
      'Pooling avoids expensive connection setup and improves throughput.',
  },
  {
    title: 'Schema migrations',
    detail:
      'Migration tools evolve schemas safely and maintain compatibility across releases.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Read vs write optimization',
    detail:
      'Indexes and denormalization speed reads but slow writes and increase storage.',
  },
  {
    title: 'Strong consistency costs',
    detail:
      'Higher isolation levels reduce anomalies but can increase locking and latency.',
  },
  {
    title: 'Query complexity',
    detail:
      'Nested subqueries and wide joins can be powerful but expensive; refactor with CTEs when needed.',
  },
  {
    title: 'Caching layers',
    detail:
      'Caching reduces load but risks stale data without careful invalidation.',
  },
]

const realWorldUses = [
  {
    context: 'Transactional systems',
    detail:
      'Banking, inventory, and order systems rely on SQL for strong consistency.',
  },
  {
    context: 'Analytics and reporting',
    detail:
      'SQL powers dashboards, BI tooling, and warehouse queries.',
  },
  {
    context: 'Operational data stores',
    detail:
      'Relational databases remain the backbone of SaaS backends.',
  },
  {
    context: 'Data integration',
    detail:
      'ETL pipelines use SQL to clean, join, and reshape data.',
  },
]

const examples = [
  {
    title: 'Simple join with aggregation',
    code: `SELECT c.name, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.name
ORDER BY orders DESC;`,
    explanation:
      'Joins combine entities, and aggregations summarize data per group.',
  },
  {
    title: 'Window function for ranking',
    code: `SELECT department, employee, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
FROM payroll;`,
    explanation:
      'Window functions compute rankings without collapsing rows.',
  },
  {
    title: 'Safe transaction block',
    code: `BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;`,
    explanation:
      'Transactions ensure transfers either fully complete or fully roll back.',
  },
]

const pitfalls = [
  'N+1 queries from ORM usage or repeated queries in loops.',
  'Missing indexes leading to full table scans.',
  'Over-normalization that forces many joins for basic queries.',
  'Lock contention from long-running transactions.',
  'Assuming vendor-specific SQL works everywhere.',
]

const decisionGuidance = [
  'Use SQL when you need strong consistency, structured data, and complex querying.',
  'Prefer relational databases for transactional systems with strict integrity requirements.',
  'Use columnar or hybrid engines for analytics-heavy workloads.',
  'Adopt migrations and schema versioning to keep teams aligned.',
  'Avoid SQL for highly variable, unstructured data unless JSON support suffices.',
]

const advancedInsights = [
  {
    title: 'Query tuning workflow',
    detail:
      'Capture slow queries, inspect explain plans, add indexes, and verify improvements with real workloads.',
  },
  {
    title: 'Partitioning strategies',
    detail:
      'Range and hash partitioning distribute data for faster queries and maintenance.',
  },
  {
    title: 'Materialized views',
    detail:
      'Precomputed views speed read-heavy dashboards at the cost of refresh complexity.',
  },
  {
    title: 'Row-level security',
    detail:
      'Database-enforced policies restrict data access per tenant or role.',
  },
]

const takeaways = [
  'SQL is a declarative language for relational data with strong integrity guarantees.',
  'Great SQL uses schemas, indexes, and query plans intentionally.',
  'Transactions and constraints are key to safe multi-user systems.',
  'The optimizer is powerful, but it needs accurate statistics and careful queries.',
]

export default function SqlBackendPage(): JSX.Element {
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
              <div className="win95-subheading">Declarative querying for relational data and transactions</div>
              <p className="win95-text">
                SQL is the standard language for working with relational databases. It lets you model data, enforce integrity,
                and query large datasets with expressive, declarative statements. Understanding SQL fundamentals is essential
                for building reliable backend systems.
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
                SQL separates the "what" from the "how" of data access. The optimizer chooses execution strategies while
                you focus on correctness and intent. This makes SQL both approachable and powerful for transactional systems.
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
            <legend>How it works: SQL fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((block) => (
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
            <legend>How it works: architecture notes</legend>
            <div className="win95-grid win95-grid-2">
              {architectureNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTradeoffs.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                SQL performance is determined by schema design, indexes, and query structure. The optimizer is powerful, but
                it depends on accurate statistics and data distributions.
              </p>
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
