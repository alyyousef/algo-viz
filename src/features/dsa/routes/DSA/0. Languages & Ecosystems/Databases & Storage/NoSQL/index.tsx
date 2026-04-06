import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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
const bucketsJson = mentalModels[0] ?? {
  title: 'Buckets of JSON',
  detail: 'Document stores act like folders of JSON files with indexes. You trade strict schemas for shape flexibility and easier evolution.',
}
const partitionedHashes = mentalModels[1] ?? {
  title: 'Partitioned hash tables',
  detail: 'Key-value stores look like massive distributed hash maps. The primary job is to route keys to partitions quickly and reliably.',
}
const columnFamilies = mentalModels[2] ?? {
  title: 'Column families as sparse spreadsheets',
  detail: 'Wide-column databases store rows with dynamic columns. A row can have thousands of columns, but only the present ones consume space.',
}
const graphCitizens = mentalModels[3] ?? {
  title: 'Graphs as first-class citizens',
  detail: 'Graph databases optimize traversals across relationships, turning join-heavy logic into path queries that are easy to express and fast to execute.',
}
const sharding = architectureBlocks[0] ?? {
  title: 'Sharding and partitioning',
  detail: 'Data is split across nodes by key ranges or hash. Partitioning improves throughput but requires careful choice of partition keys.',
}
const replication = architectureBlocks[1] ?? {
  title: 'Replication',
  detail: 'Copies of data across nodes improve availability and read scaling. Replication can be synchronous (strong) or asynchronous (eventual).',
}
const consistency = architectureBlocks[2] ?? {
  title: 'Consistency models',
  detail: 'Options range from strong consistency to eventual consistency. Systems may offer tunable read/write quorums to balance latency and safety.',
}
const indexing = architectureBlocks[3] ?? {
  title: 'Indexes and storage engines',
  detail: 'LSM trees favor write-heavy workloads; B-trees favor mixed reads and writes. Secondary indexes enable queries beyond key lookups.',
}

const glossaryTerms = [
  {
    term: bucketsJson.title,
    definition: bucketsJson.detail,
  },
  {
    term: partitionedHashes.title,
    definition: partitionedHashes.detail,
  },
  {
    term: columnFamilies.title,
    definition: columnFamilies.detail,
  },
  {
    term: graphCitizens.title,
    definition: graphCitizens.detail,
  },
  {
    term: sharding.title,
    definition: sharding.detail,
  },
  {
    term: replication.title,
    definition: replication.detail,
  },
  {
    term: consistency.title,
    definition: consistency.detail,
  },
  {
    term: indexing.title,
    definition: indexing.detail,
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
    { id: 'core-families', label: 'NoSQL Families' },
    { id: 'core-architecture', label: 'Architecture Blocks' },
    { id: 'core-query', label: 'Query Patterns' },
    { id: 'core-storage', label: 'Storage Engines' },
    { id: 'core-cap', label: 'Consistency and CAP' },
    { id: 'core-mechanisms', label: 'Consistency Mechanisms' },
    { id: 'core-transactions', label: 'Transaction Models' },
    { id: 'core-modeling', label: 'Data Modeling' },
    { id: 'core-operations', label: 'Operations Checklist' },
    { id: 'core-migrations', label: 'Migration Strategies' },
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
export default function NoSqlPage(): JSX.Element {
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
    document.title = `NoSQL (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'NoSQL',
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
          <span className="win98-title-text">NoSQL</span>
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
            <h1 className="win98-doc-title">NoSQL</h1>
            <p>
              NoSQL databases trade rigid relational schemas for specialized data models that scale horizontally and adapt quickly.
              Instead of one universal model, NoSQL offers families of databases optimized for particular access patterns, from
              key-value lookups to graph traversals.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    NoSQL systems prioritize scale-out architectures, flexible schemas, and specialized query patterns. They often
                    embrace eventual consistency to maximize availability and performance, but many provide knobs for stronger
                    guarantees.
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
                <section id="core-families" className="win98-section">
                  <h2 className="win98-heading">How It Works: NoSQL Families</h2>
                  {nosqlFamilies.map((block) => (
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
                <section id="core-architecture" className="win98-section">
                  <h2 className="win98-heading">How It Works: Architecture Building Blocks</h2>
                  {architectureBlocks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
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
                <section id="core-storage" className="win98-section">
                  <h2 className="win98-heading">Storage Engines and Indexing</h2>
                  {storageEngines.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cap" className="win98-section">
                  <h2 className="win98-heading">Consistency and CAP Tradeoffs</h2>
                  <table className="win98-table">
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
                  <p>
                    CAP is not a feature checklist; it is a tradeoff triangle. During network partitions, you choose between
                    consistency and availability. Many NoSQL systems expose tuning knobs so each workload can choose the right point
                    on that triangle.
                  </p>
                </section>
                <section id="core-mechanisms" className="win98-section">
                  <h2 className="win98-heading">Consistency Mechanics in the Real World</h2>
                  {consistencyMechanisms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-transactions" className="win98-section">
                  <h2 className="win98-heading">Transaction and Constraint Models</h2>
                  {transactionModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-modeling" className="win98-section">
                  <h2 className="win98-heading">Data Modeling Patterns</h2>
                  {dataModelingPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="win98-section">
                  <h2 className="win98-heading">Operations Checklist</h2>
                  {operationsChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-migrations" className="win98-section">
                  <h2 className="win98-heading">Migration and Integration Strategies</h2>
                  {migrationStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
