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
    title: 'Web scale pressure exposes limits of classic RDBMS (late 1990s)',
    detail:
      'Growing web services struggled with rigid schemas and vertical scaling. Early key-value caches and denormalized stores emerged to absorb traffic spikes.',
  },
  {
    title: 'The term NoSQL enters mainstream (2009)',
    detail:
      'A meetup in San Francisco popularized NoSQL as a label for non-relational data stores focused on horizontal scaling and flexible data models.',
  },
  {
    title: 'Cloud-era managed databases expand choices (2010s)',
    detail:
      'Cloud providers released hosted document, wide-column, and graph services, making specialized storage available without heavy ops overhead.',
  },
  {
    title: 'Multi-model engines blur boundaries (late 2010s)',
    detail:
      'Databases began supporting multiple models (document + graph + key-value) inside one engine to reduce operational complexity.',
  },
]

const mentalModels = [
  {
    title: 'Buckets of JSON',
    detail:
      'Document stores act like folders of JSON files with indexes. You trade strict schemas for shape flexibility and easier evolution.',
  },
  {
    title: 'Partitioned hash tables',
    detail:
      'Key-value stores look like massive distributed hash maps. The primary job is to route keys to partitions quickly and reliably.',
  },
  {
    title: 'Column families as sparse spreadsheets',
    detail:
      'Wide-column databases store rows with dynamic columns. A row can have thousands of columns, but only the present ones consume space.',
  },
  {
    title: 'Graphs as first-class citizens',
    detail:
      'Graph databases optimize traversals across relationships, turning join-heavy logic into path queries that are easy to express and fast to execute.',
  },
]

const nosqlFamilies = [
  {
    heading: 'Key-value stores',
    bullets: [
      'Fast lookup by key; values are opaque blobs.',
      'Great for caches, sessions, feature flags, and counters.',
      'Limited querying; scaling relies on consistent hashing.',
    ],
  },
  {
    heading: 'Document databases',
    bullets: [
      'Store JSON-like documents with flexible schemas.',
      'Support secondary indexes, rich queries, and aggregations.',
      'Ideal for user profiles, catalogs, and content systems.',
    ],
  },
  {
    heading: 'Wide-column stores',
    bullets: [
      'Rows grouped into column families with sparse columns.',
      'Optimized for write-heavy workloads and large scans.',
      'Popular for telemetry, logs, and time series.',
    ],
  },
  {
    heading: 'Graph databases',
    bullets: [
      'Nodes and edges with properties; focus on relationships.',
      'Fast traversals for recommendations, fraud, and networks.',
      'Query languages express paths and patterns directly.',
    ],
  },
  {
    heading: 'Time-series databases',
    bullets: [
      'Optimized for append-only, timestamped metrics.',
      'Compression and downsampling reduce storage.',
      'Built-in aggregation windows and retention policies.',
    ],
  },
  {
    heading: 'Search-oriented stores',
    bullets: [
      'Inverted indexes for full-text search and relevance ranking.',
      'Faceting, highlighting, and fuzzy matching are first-class.',
      'Often paired with a primary database for authoritative data.',
    ],
  },
]

const architectureBlocks = [
  {
    title: 'Sharding and partitioning',
    detail:
      'Data is split across nodes by key ranges or hash. Partitioning improves throughput but requires careful choice of partition keys.',
  },
  {
    title: 'Replication',
    detail:
      'Copies of data across nodes improve availability and read scaling. Replication can be synchronous (strong) or asynchronous (eventual).',
  },
  {
    title: 'Consistency models',
    detail:
      'Options range from strong consistency to eventual consistency. Systems may offer tunable read/write quorums to balance latency and safety.',
  },
  {
    title: 'Indexes and storage engines',
    detail:
      'LSM trees favor write-heavy workloads; B-trees favor mixed reads and writes. Secondary indexes enable queries beyond key lookups.',
  },
]

const queryPatterns = [
  {
    title: 'Point lookups',
    detail:
      'Design keys so the most common queries are O(1) key fetches. Cache these aggressively.',
  },
  {
    title: 'Range scans',
    detail:
      'Sort keys (timestamps, sequence IDs) enable fast range queries within a partition.',
  },
  {
    title: 'Fan-out reads',
    detail:
      'Avoid scatter-gather across many partitions; precompute or denormalize to reduce fan-out.',
  },
  {
    title: 'Time-window queries',
    detail:
      'Time-series stores rely on TTL, downsampling, and windowed aggregations to keep costs stable.',
  },
  {
    title: 'Relationship traversals',
    detail:
      'Graph DBs optimize multi-hop traversals; other models often require application-side joins.',
  },
  {
    title: 'Search and relevance',
    detail:
      'Use search indexes for text, faceting, and scoring rather than forcing it into key-value patterns.',
  },
]

const storageEngines = [
  {
    title: 'LSM trees',
    detail:
      'Log-structured merge trees excel at write-heavy workloads with compaction to maintain read performance.',
  },
  {
    title: 'B-trees and variants',
    detail:
      'Balanced trees handle mixed read/write workloads and range queries with consistent latency.',
  },
  {
    title: 'In-memory engines',
    detail:
      'Prioritize speed with RAM-first storage; durability depends on snapshots and logs.',
  },
  {
    title: 'Columnar layouts',
    detail:
      'Store column blocks for analytics; great for aggregations but slower for point updates.',
  },
  {
    title: 'Secondary indexes',
    detail:
      'Enable flexible querying but add write amplification and storage cost.',
  },
  {
    title: 'Change streams',
    detail:
      'Expose updates as ordered logs for downstream processing and materialized views.',
  },
]

const consistencyMechanisms = [
  {
    title: 'Quorum reads/writes',
    detail:
      'Require a majority (or configurable) of replicas to agree, trading latency for consistency.',
  },
  {
    title: 'Read repair',
    detail:
      'Background reconciliation fixes stale replicas after reads detect divergence.',
  },
  {
    title: 'Hinted handoff',
    detail:
      'Temporary writes are queued when a replica is down, then replayed later.',
  },
  {
    title: 'Vector clocks',
    detail:
      'Track causality to detect conflicts and enable resolution strategies.',
  },
  {
    title: 'CRDTs',
    detail:
      'Conflict-free replicated data types merge automatically for eventual consistency.',
  },
  {
    title: 'Transactional fences',
    detail:
      'Lightweight transactions or CAS operations provide conditional updates when needed.',
  },
]

const transactionModels = [
  {
    title: 'Single-record atomicity',
    detail:
      'Most NoSQL systems guarantee atomic updates within a single key/document.',
  },
  {
    title: 'Multi-record transactions',
    detail:
      'Some engines provide limited multi-document transactions with higher latency.',
  },
  {
    title: 'Conditional updates',
    detail:
      'Compare-and-set or version checks prevent lost updates in concurrent writers.',
  },
  {
    title: 'Idempotent writes',
    detail:
      'Design APIs so retries do not duplicate effects, especially in eventual consistency.',
  },
]

const operationsChecklist = [
  {
    title: 'Backups and snapshots',
    detail:
      'Validate restore procedures; many NoSQL systems require special snapshot flows.',
  },
  {
    title: 'Capacity planning',
    detail:
      'Plan for compaction overhead, replication, and index storage growth.',
  },
  {
    title: 'Monitoring and alerts',
    detail:
      'Track tail latency, replication lag, compaction queue, and hot partitions.',
  },
  {
    title: 'Schema validation',
    detail:
      'Enforce contracts at the app layer or via schema validators to prevent drift.',
  },
  {
    title: 'TTL and data lifecycle',
    detail:
      'Use retention policies to bound storage and avoid hot partitions.',
  },
  {
    title: 'Load testing',
    detail:
      'Simulate read/write mixes and burst traffic; tune partition keys accordingly.',
  },
]

const migrationStrategies = [
  {
    title: 'Dual write with backfill',
    detail:
      'Write to both old and new stores, backfill historical data, then cut over.',
  },
  {
    title: 'Change data capture',
    detail:
      'Stream updates from the primary DB into NoSQL for read scaling or analytics.',
  },
  {
    title: 'Read-through cache',
    detail:
      'Gradually populate a NoSQL cache with production traffic to reduce risk.',
  },
  {
    title: 'Feature-flagged cutover',
    detail:
      'Use flags to switch traffic per cohort, enabling rollback if issues appear.',
  },
]

const antiPatterns = [
  'Using a single hot partition key for all traffic.',
  'Modeling many-to-many queries without precomputed views or graph storage.',
  'Creating secondary indexes for every query pattern.',
  'Storing huge documents that need frequent partial updates.',
  'Relying on eventual consistency for financial or transactional data.',
  'Ignoring compaction and disk amplification in LSM-based systems.',
]

const capMatrix = [
  {
    model: 'Strong consistency',
    read: 'Latest committed write',
    latency: 'Higher, coordination required',
    useCase: 'Banking, inventory, ledgers',
  },
  {
    model: 'Eventual consistency',
    read: 'May be stale temporarily',
    latency: 'Low, local reads',
    useCase: 'Social feeds, analytics',
  },
  {
    model: 'Tunable consistency',
    read: 'Quorum-based',
    latency: 'Configurable',
    useCase: 'Mixed workloads',
  },
]

const dataModelingPatterns = [
  {
    title: 'Embed vs reference',
    detail:
      'Embedding improves read locality but risks document bloat. References reduce duplication but require additional fetches or joins.',
  },
  {
    title: 'Denormalization',
    detail:
      'Duplicate data to serve read-heavy queries quickly. Maintain consistency with background jobs or application-level updates.',
  },
  {
    title: 'Single-table design',
    detail:
      'Wide-column stores often keep multiple entity types in one table to enable fast query patterns via carefully designed partition and sort keys.',
  },
  {
    title: 'Materialized views',
    detail:
      'Precompute read-optimized projections to avoid expensive aggregations at query time.',
  },
]

const realWorldUses = [
  {
    context: 'User profiles and content',
    detail:
      'Document models allow flexible fields per user or article. Schemas evolve without heavy migrations.',
  },
  {
    context: 'High-throughput telemetry',
    detail:
      'Wide-column and time-series databases ingest millions of events per second with fast range scans for dashboards.',
  },
  {
    context: 'Caching and sessions',
    detail:
      'Key-value stores deliver millisecond reads for tokens, rate limits, and ephemeral state.',
  },
  {
    context: 'Recommendations and fraud',
    detail:
      'Graph databases excel at path queries, discovering clusters, shared attributes, and suspicious relationships.',
  },
]

const examples = [
  {
    title: 'Designing a partition key for a wide-column store',
    code: `// Pseudocode for a time-series table
Table Metrics (
  partition_key: device_id,
  sort_key: timestamp,
  columns: metric_name, value, tags
)

// Query: latest metrics for device
SELECT * FROM Metrics
WHERE device_id = "device-17"
ORDER BY timestamp DESC
LIMIT 100`,
    explanation:
      'The partition key keeps all device metrics together, while the sort key supports efficient time range scans.',
  },
  {
    title: 'Document schema for a product catalog',
    code: `// Example document in JSON-like form
{
  "sku": "LAP-4810",
  "name": "VectorBook 14",
  "price": 1099.00,
  "specs": {
    "cpu": "8-core",
    "ram_gb": 16,
    "storage_gb": 512
  },
  "variants": [
    { "color": "silver", "stock": 24 },
    { "color": "midnight", "stock": 11 }
  ]
}`,
    explanation:
      'Embedding variants keeps the read path simple for product pages. Inventory updates must update the embedded array.',
  },
  {
    title: 'Graph query for friend recommendations',
    code: `// Cypher-style pseudocode
MATCH (me:User {id: 42})-[:FRIEND]->(f)-[:FRIEND]->(fof)
WHERE NOT (me)-[:FRIEND]->(fof) AND me <> fof
RETURN fof, COUNT(*) AS mutuals
ORDER BY mutuals DESC
LIMIT 10`,
    explanation:
      'Graph queries express multi-hop relationships directly and avoid heavy join logic in application code.',
  },
]

const pitfalls = [
  'Choosing a partition key with hot spots. A small set of keys can overload a single node and erase horizontal scaling gains.',
  'Overusing eventual consistency for critical data. Stale reads can cause double spends or conflicting updates.',
  'Indexing everything. Each secondary index increases write amplification and storage cost.',
  'Letting documents grow unbounded. Large documents slow reads, inflate memory use, and complicate updates.',
  'Ignoring backup and restore strategy. Some NoSQL systems require specialized snapshot workflows.',
]

const decisionGuidance = [
  'Need flexible schema and rich queries for nested data: choose a document database.',
  'Need sub-millisecond reads by key at massive scale: choose a key-value store.',
  'Need high write throughput with predictable range scans: choose a wide-column or time-series database.',
  'Need relationship-heavy queries with deep traversals: choose a graph database.',
  'Need full-text search, relevance, or fuzzy matching: choose a search-oriented store.',
]

const advancedInsights = [
  {
    title: 'Write amplification awareness',
    detail:
      'LSM-based engines trade write throughput for background compaction. Plan disk and CPU headroom to avoid latency spikes.',
  },
  {
    title: 'Multi-region replication tradeoffs',
    detail:
      'Lower latency for global users often increases write latency and conflict resolution complexity. Consider per-region leaders or CRDTs.',
  },
  {
    title: 'Schema governance without migrations',
    detail:
      'Flexible schemas still need discipline. Validate at the app layer and use versioned fields to keep data readable over time.',
  },
  {
    title: 'Cost modeling',
    detail:
      'NoSQL pricing often tracks read/write units and storage. Efficient keys and projections can cut costs dramatically.',
  },
]

const takeaways = [
  'NoSQL is a family of models designed for scale, flexibility, and specialized query patterns.',
  'Data modeling shifts from normalization to access-pattern-first design.',
  'Consistency is a dial, not a binary. Pick the model that matches business risk.',
  'Partition keys and indexing choices dominate performance outcomes.',
]

export default function NoSqlPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">NoSQL</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Flexible data models built for horizontal scale and evolving products</div>
              <p className="win95-text">
                NoSQL databases trade rigid relational schemas for specialized data models that scale horizontally and adapt quickly.
                Instead of one universal model, NoSQL offers families of databases optimized for particular access patterns, from
                key-value lookups to graph traversals.
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
                NoSQL systems prioritize scale-out architectures, flexible schemas, and specialized query patterns. They often
                embrace eventual consistency to maximize availability and performance, but many provide knobs for stronger guarantees.
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
            <legend>How it works: NoSQL families</legend>
            <div className="win95-grid win95-grid-3">
              {nosqlFamilies.map((block) => (
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
            <legend>How it works: architecture building blocks</legend>
            <div className="win95-grid win95-grid-2">
              {architectureBlocks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Storage engines and indexing</legend>
            <div className="win95-grid win95-grid-2">
              {storageEngines.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Consistency and CAP tradeoffs</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Read behavior</th>
                    <th>Latency profile</th>
                    <th>Best fit</th>
                  </tr>
                </thead>
                <tbody>
                  {capMatrix.map((row) => (
                    <tr key={row.model}>
                      <td>{row.model}</td>
                      <td>{row.read}</td>
                      <td>{row.latency}</td>
                      <td>{row.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                CAP is not a feature checklist; it is a tradeoff triangle. During network partitions, you choose between consistency
                and availability. Many NoSQL systems expose tuning knobs so each workload can choose the right point on that triangle.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Consistency mechanics in the real world</legend>
            <div className="win95-grid win95-grid-2">
              {consistencyMechanisms.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Transaction and constraint models</legend>
            <div className="win95-grid win95-grid-2">
              {transactionModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data modeling patterns</legend>
            <div className="win95-grid win95-grid-2">
              {dataModelingPatterns.map((item) => (
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
              {operationsChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Migration and integration strategies</legend>
            <div className="win95-grid win95-grid-2">
              {migrationStrategies.map((item) => (
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

