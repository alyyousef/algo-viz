import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
  {
    title: 'SQL powers cloud scale (2010s)',
    detail:
      'Managed databases and replicas make SQL the default for startups and enterprises alike.',
  },
  {
    title: 'Hybrid OLTP + OLAP emerges (2015+)',
    detail: 'HTAP systems blend transactional and analytical workloads on the same data.',
  },
  {
    title: 'SQL in data lakes (2020+)',
    detail: 'Engines like Trino and DuckDB bring SQL to object storage and local analytics.',
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
  {
    title: 'Indexes as paths',
    detail: 'Indexes are alternate access paths, not magic; they optimize specific query shapes.',
  },
  {
    title: 'Transactions as timelines',
    detail: 'Isolation levels define what each query can see at a point in time.',
  },
  {
    title: 'Cost-based decisions',
    detail: 'The optimizer estimates costs using statistics; stale stats lead to bad plans.',
  },
]

const coreConcepts = [
  {
    heading: 'Data modeling',
    bullets: [
      'Tables define entities; columns define attributes with types.',
      'Primary keys guarantee uniqueness; foreign keys link entities.',
      'Normalization reduces redundancy; denormalization improves read speed.',
      'Constraints enforce business rules at the database layer.',
    ],
  },
  {
    heading: 'Querying and joins',
    bullets: [
      'SELECT filters and projects rows using WHERE and ORDER BY.',
      'JOINs combine tables by keys; choice of join affects cardinality.',
      'Aggregations summarize data with GROUP BY and HAVING.',
      'CTEs help break down complex queries into readable blocks.',
    ],
  },
  {
    heading: 'Indexes and performance',
    bullets: [
      'Indexes speed up lookups but add write overhead.',
      'Composite indexes must match query patterns.',
      'Explain plans reveal how the optimizer executes queries.',
      'Covering indexes can avoid table lookups for hot queries.',
    ],
  },
  {
    heading: 'Transactions and consistency',
    bullets: [
      'ACID properties ensure correctness under concurrency.',
      'Isolation levels trade consistency for throughput.',
      'Locks and MVCC prevent corruption in multi-user workloads.',
      'Savepoints allow partial rollbacks within a transaction.',
    ],
  },
  {
    heading: 'Schema evolution',
    bullets: [
      'Migrations are versioned, reversible changes to schema.',
      'Additive changes are safer than destructive ones.',
      'Backfills and defaults prevent nulls from breaking code.',
    ],
  },
  {
    heading: 'Security and governance',
    bullets: [
      'Roles and grants define who can read or write.',
      'Row-level security enforces tenant isolation.',
      'Auditing tracks sensitive data access.',
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
    detail: 'Row-based engines favor OLTP; columnar engines favor analytics.',
  },
  {
    title: 'Connection pooling',
    detail: 'Pooling avoids expensive connection setup and improves throughput.',
  },
  {
    title: 'Schema migrations',
    detail: 'Migration tools evolve schemas safely and maintain compatibility across releases.',
  },
  {
    title: 'Replication and failover',
    detail: 'Read replicas scale queries and provide redundancy for high availability.',
  },
  {
    title: 'Backups and PITR',
    detail: 'Point-in-time recovery depends on base snapshots plus write-ahead logs.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Read vs write optimization',
    detail: 'Indexes and denormalization speed reads but slow writes and increase storage.',
  },
  {
    title: 'Strong consistency costs',
    detail: 'Higher isolation levels reduce anomalies but can increase locking and latency.',
  },
  {
    title: 'Query complexity',
    detail:
      'Nested subqueries and wide joins can be powerful but expensive; refactor with CTEs when needed.',
  },
  {
    title: 'Caching layers',
    detail: 'Caching reduces load but risks stale data without careful invalidation.',
  },
  {
    title: 'Full-text vs structured search',
    detail: 'Text indexes are fast for keyword search, but may trade off relevance features.',
  },
  {
    title: 'Partitioning overhead',
    detail: 'Partitions speed range queries but add planning and maintenance complexity.',
  },
]

const realWorldUses = [
  {
    context: 'Transactional systems',
    detail: 'Banking, inventory, and order systems rely on SQL for strong consistency.',
  },
  {
    context: 'Analytics and reporting',
    detail: 'SQL powers dashboards, BI tooling, and warehouse queries.',
  },
  {
    context: 'Operational data stores',
    detail: 'Relational databases remain the backbone of SaaS backends.',
  },
  {
    context: 'Data integration',
    detail: 'ETL pipelines use SQL to clean, join, and reshape data.',
  },
  {
    context: 'Feature stores',
    detail: 'ML pipelines use SQL to assemble training datasets and feature views.',
  },
  {
    context: 'Operational analytics',
    detail: 'SQL powers near-real-time metrics and monitoring dashboards.',
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
    explanation: 'Joins combine entities, and aggregations summarize data per group.',
  },
  {
    title: 'Window function for ranking',
    code: `SELECT department, employee, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
FROM payroll;`,
    explanation: 'Window functions compute rankings without collapsing rows.',
  },
  {
    title: 'Common table expression (CTE)',
    code: `WITH recent_orders AS (
  SELECT * FROM orders WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT customer_id, COUNT(*) AS orders
FROM recent_orders
GROUP BY customer_id;`,
    explanation: 'CTEs make complex queries readable and reusable within a statement.',
  },
  {
    title: 'Safe transaction block',
    code: `BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;`,
    explanation: 'Transactions ensure transfers either fully complete or fully roll back.',
  },
  {
    title: 'Upsert with conflict handling',
    code: `INSERT INTO users (id, email)
VALUES (1, 'a@b.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;`,
    explanation: 'Upserts keep writes idempotent when a unique key already exists.',
  },
  {
    title: 'Index-friendly pagination',
    code: `SELECT * FROM events
WHERE created_at < $1
ORDER BY created_at DESC
LIMIT 50;`,
    explanation: 'Keyset pagination avoids expensive OFFSET scans on large tables.',
  },
]

const pitfalls = [
  'N+1 queries from ORM usage or repeated queries in loops.',
  'Missing indexes leading to full table scans.',
  'Over-normalization that forces many joins for basic queries.',
  'Lock contention from long-running transactions.',
  'Assuming vendor-specific SQL works everywhere.',
  'Using OFFSET pagination on large tables and causing slow scans.',
  'Neglecting connection pool limits and exhausting database resources.',
  'Stale statistics leading to poor query plans.',
]

const decisionGuidance = [
  'Use SQL when you need strong consistency, structured data, and complex querying.',
  'Prefer relational databases for transactional systems with strict integrity requirements.',
  'Use columnar or hybrid engines for analytics-heavy workloads.',
  'Adopt migrations and schema versioning to keep teams aligned.',
  'Avoid SQL for highly variable, unstructured data unless JSON support suffices.',
  'Choose a managed database when you need automated backups and scaling.',
  'Benchmark realistic workloads before picking an engine or schema.',
]

const advancedInsights = [
  {
    title: 'Query tuning workflow',
    detail:
      'Capture slow queries, inspect explain plans, add indexes, and verify improvements with real workloads.',
  },
  {
    title: 'Partitioning strategies',
    detail: 'Range and hash partitioning distribute data for faster queries and maintenance.',
  },
  {
    title: 'Materialized views',
    detail: 'Precomputed views speed read-heavy dashboards at the cost of refresh complexity.',
  },
  {
    title: 'Row-level security',
    detail: 'Database-enforced policies restrict data access per tenant or role.',
  },
  {
    title: 'Locking vs MVCC',
    detail: 'MVCC reduces read locks but increases storage for old row versions.',
  },
  {
    title: 'Plan stability',
    detail: 'Plan caching helps performance, but parameter shifts can cause regressions.',
  },
]

const takeaways = [
  'SQL is a declarative language for relational data with strong integrity guarantees.',
  'Great SQL uses schemas, indexes, and query plans intentionally.',
  'Transactions and constraints are key to safe multi-user systems.',
  'The optimizer is powerful, but it needs accurate statistics and careful queries.',
  'Schema evolution and migrations keep teams moving without downtime.',
  'Observability and capacity planning prevent production surprises.',
]

const ecosystemLandscape = [
  {
    heading: 'Core engines',
    bullets: [
      'PostgreSQL: robust features, extensions, strong correctness.',
      'MySQL: popular for web apps, wide hosting support.',
      'SQLite: embedded, lightweight, great for local apps.',
      'SQL Server/Oracle: enterprise features and tooling.',
    ],
  },
  {
    heading: 'Analytics engines',
    bullets: [
      'Snowflake/BigQuery/Redshift for large-scale warehousing.',
      'DuckDB for fast local analytics.',
      'Trino/Presto for federated queries across sources.',
    ],
  },
  {
    heading: 'Tools and workflows',
    bullets: [
      'Migrations: Flyway, Liquibase, Prisma, Alembic.',
      'BI: Looker, Metabase, Superset.',
      'ORMs: Prisma, Sequelize, TypeORM, Hibernate.',
    ],
  },
]

const sqlPatterns = [
  {
    title: 'Filtering and projection',
    detail: 'Use WHERE to reduce rows early and select only columns you need.',
  },
  {
    title: 'Join discipline',
    detail: 'Join on indexed keys; watch for accidental many-to-many explosions.',
  },
  {
    title: 'Aggregation strategy',
    detail: 'Aggregate after filtering to reduce work; use HAVING only when needed.',
  },
  {
    title: 'Pagination choices',
    detail: 'Prefer keyset pagination for large tables to avoid OFFSET scans.',
  },
]

const productionChecklist = [
  {
    title: 'Reliability',
    detail: 'Automate backups, test restores, and verify point-in-time recovery.',
  },
  {
    title: 'Performance',
    detail: 'Monitor slow queries, add indexes, and keep statistics up to date.',
  },
  {
    title: 'Safety',
    detail: 'Use migrations, staged rollouts, and avoid long-running locks.',
  },
  {
    title: 'Security',
    detail: 'Rotate credentials, apply least privilege, and audit access.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'SELECT, filtering, joins, and aggregate queries.',
  },
  {
    step: 'Modeling',
    detail: 'Keys, constraints, normalization, and schema design.',
  },
  {
    step: 'Performance',
    detail: 'Indexes, explain plans, and query refactoring.',
  },
  {
    step: 'Production',
    detail: 'Migrations, backups, pooling, and monitoring.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const glossary = [
  {
    term: 'ACID',
    definition: 'Transaction guarantees for atomicity, consistency, isolation, and durability.',
  },
  {
    term: 'MVCC',
    definition:
      'Multi-version concurrency control allowing non-blocking reads of older row versions.',
  },
  { term: 'CTE', definition: 'Common Table Expression for readable intermediate query blocks.' },
  {
    term: 'Window Function',
    definition: 'Analytical function computed across row partitions without collapsing rows.',
  },
  {
    term: 'Cardinality',
    definition: 'Estimated row counts used by the optimizer to choose plans.',
  },
  {
    term: 'Covering Index',
    definition: 'Index containing all needed columns so table reads can be skipped.',
  },
  { term: 'PITR', definition: 'Point-in-time recovery using base backups plus logs.' },
  {
    term: 'Normalization',
    definition: 'Schema design process to reduce redundancy and update anomalies.',
  },
  {
    term: 'Denormalization',
    definition: 'Intentional redundancy added to improve read performance.',
  },
  {
    term: 'Keyset Pagination',
    definition: 'Pagination by cursor/value range instead of OFFSET scanning.',
  },
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'SQL Fundamentals' },
    { id: 'core-landscape', label: 'Ecosystem Landscape' },
    { id: 'core-architecture', label: 'Architecture Notes' },
    { id: 'core-patterns', label: 'Query Patterns' },
    { id: 'core-tradeoffs', label: 'Complexity and Tradeoffs' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SqlBackendPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'SQL',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="SQL"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">SQL</h1>
      <p>
        SQL is the standard language for working with relational databases. It lets you model data,
        enforce integrity, and query large datasets with expressive, declarative statements.
        Understanding SQL fundamentals is essential for building reliable backend systems.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              SQL separates the "what" from the "how" of data access. The optimizer chooses
              execution strategies while you focus on correctness and intent. This makes SQL both
              approachable and powerful for transactional systems, analytics, and reporting.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">How It Works: SQL Fundamentals</h2>
            {coreConcepts.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-landscape" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Landscape</h2>
            {ecosystemLandscape.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-architecture" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Architecture Notes</h2>
            {architectureNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Query Patterns</h2>
            {sqlPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {performanceTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              SQL performance is determined by schema design, indexes, and query structure. The
              optimizer is powerful, but it depends on accurate statistics and data distributions.
            </p>
          </section>
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-production" className="bin98-section">
            <h2 className="bin98-heading">Production Checklist</h2>
            {productionChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-learning" className="bin98-section">
            <h2 className="bin98-heading">Learning Path</h2>
            {learningPath.map((item) => (
              <p key={item.step}>
                <strong>{item.step}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
