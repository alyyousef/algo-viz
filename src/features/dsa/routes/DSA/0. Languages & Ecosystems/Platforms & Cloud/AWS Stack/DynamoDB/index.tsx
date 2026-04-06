import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS DynamoDB'
const pageSubtitle = 'AWS managed key-value and document database for predictable low-latency at scale.'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon DynamoDB is AWS\'s fully managed NoSQL database service for key-value and document data. It is designed for very low-latency lookups at high scale, with automatic partition management, built-in replication features, and tight integration with the rest of AWS.',
      'The core DynamoDB promise is not relational flexibility. It is predictable performance for well-chosen access patterns. The service rewards designs where the primary key and index strategy are planned around the queries the application actually needs to run.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'DynamoDB is best understood as an access-pattern-first database. In relational systems, teams often begin with normalization and figure out queries later. In DynamoDB, you usually list the reads and writes you need first, and then shape the table key design and indexes to support those patterns directly.',
      'That mindset is why DynamoDB discussions keep returning to partition keys, sort keys, item collections, GSIs, hot partitions, and single-table design. Those are not secondary tuning topics. They are the model.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'DynamoDB is commonly used for user profiles, carts, sessions, event state, gaming leaderboards, IoT device state, configuration storage, request idempotency records, workflow metadata, and other workloads that need high scale with simple point lookups or carefully designed range queries.',
      'It is also a strong fit when you want a managed operational database without running database instances, managing patching, or handling storage nodes directly.',
    ],
  },
  {
    title: 'When it is the wrong tool',
    paragraphs: [
      'If the workload depends on ad hoc joins, complex relational constraints, heavy cross-entity analytics, or arbitrary querying over many attributes, DynamoDB is often the wrong primary store. It can do a lot, but it does not become a relational database because the data is stored as JSON-like items.',
      'The most expensive DynamoDB mistakes happen when teams choose it for scale reasons before they actually know their access patterns, or when they keep designing as if a Scan is an acceptable substitute for a planned query path.',
    ],
  },
]

const decisionGuidance = [
  {
    title: 'Need predictable low-latency lookups at scale with known access patterns',
    choice: 'DynamoDB is a strong fit.',
  },
  {
    title: 'Need flexible joins, arbitrary filtering, or relational reporting',
    choice: 'Prefer a relational system or pair DynamoDB with another analytical store.',
  },
  {
    title: 'Need multi-region active-active style writes with managed replication',
    choice: 'DynamoDB global tables are often a strong option.',
  },
  {
    title: 'Need mostly cacheable session or metadata lookups',
    choice: 'DynamoDB works well and DAX may help when read patterns fit.',
  },
  {
    title: 'Need to model many entity types around a few query paths',
    choice: 'Single-table design may be appropriate.',
  },
  {
    title: 'Need one row here and there with many unpredictable query combinations',
    choice: 'DynamoDB may feel unnatural unless the query paths can be made explicit.',
  },
]

const coreConceptSections = [
  {
    id: 'core-data-model',
    heading: 'Data Model',
    paragraphs: [
      'DynamoDB stores items inside tables. Each item is a set of attributes. Every item is identified by a primary key, which is either a simple partition key or a composite key made of partition key plus sort key.',
      'Items in the same table do not need to share the same non-key attributes. That schema flexibility is powerful, but the actual structure of the table is still constrained by the key design and by how you query it.',
      'The service supports scalar values, lists, maps, sets, and nested document-like shapes. That makes it natural for application-centric data, but nested structure does not remove the need for a sound access model.',
    ],
  },
  {
    id: 'core-access-patterns',
    heading: 'Access Patterns First',
    paragraphs: [
      'A DynamoDB table should usually be designed from required reads and writes backward. Ask which items must be fetched together, which items must be sorted together, which entity relationships must be navigated efficiently, and which lookups need indexes.',
      'If the answer to a read requirement is "we will Scan and filter later," the design is usually not done yet. Scan exists, but it is not the happy path for primary application traffic.',
      'The discipline here is practical rather than academic: if the key design matches the access patterns, DynamoDB feels extremely fast and simple. If it does not, the service feels restrictive and expensive.',
    ],
  },
  {
    id: 'core-keys',
    heading: 'Partition Keys, Sort Keys, and Item Collections',
    paragraphs: [
      'The partition key determines how data is distributed. Good partition keys spread traffic and storage across partitions. Bad partition keys concentrate traffic and create hot partitions.',
      'A composite key adds a sort key so that multiple related items can live under the same partition key and then be retrieved in sorted order. This is one of the main building blocks for modeling one-to-many relationships, time-ordered events, and grouped entity collections.',
      'All items sharing the same partition key form an item collection. In practice, that means partition-key choice affects both query shape and scaling behavior. High-cardinality, well-distributed keys are usually safer than low-cardinality hot keys.',
    ],
  },
  {
    id: 'core-indexes',
    heading: 'Secondary Indexes: GSI and LSI',
    paragraphs: [
      'Global secondary indexes let you query the same data through an alternate key structure. They are the standard tool when the main table key supports one access path and the application needs another.',
      'Local secondary indexes share the table partition key but use a different sort key. They are more constrained and tied to the base table\'s item collection behavior. In practice, many teams reach for GSIs more often because they are more flexible.',
      'Indexes are not free. They consume capacity, increase write cost, and require design discipline. A good index exists to serve a specific query path, not to imitate the general-purpose flexibility of secondary indexes in relational databases.',
    ],
  },
  {
    id: 'core-query',
    heading: 'GetItem, Query, and Scan',
    paragraphs: [
      'GetItem is the simplest operation: fetch one item by full primary key. Query is the workhorse operation: fetch items by partition key, optionally narrowed and ordered by sort-key conditions. Scan reads across the table or index and is usually the least efficient way to answer application reads.',
      'Query should be your default read primitive once the key model is correct. It supports patterns like "all orders for one customer" or "events for one device during a time range" when the partition and sort keys are designed appropriately.',
      'Scan is still useful for controlled backfills, maintenance jobs, or analytics export workflows, but it is not usually what you want on a user-facing request path.',
    ],
  },
  {
    id: 'core-expressions',
    heading: 'Expressions and Conditional Logic',
    paragraphs: [
      'DynamoDB uses expressions for filtering, projection, conditions, and updates. Condition expressions are especially important because they let you enforce write expectations such as "only create this item if it does not already exist" or "only update if the version matches."',
      'That conditional model is one of the service\'s strongest correctness tools. It is how many teams implement optimistic locking, uniqueness guards, idempotency records, state-machine transitions, and inventory protections.',
      'Update expressions let you increment counters, set nested attributes, append to lists, or remove fields without rewriting the whole item.',
    ],
  },
  {
    id: 'core-capacity',
    heading: 'Capacity Modes, Throughput, and Hot Partitions',
    paragraphs: [
      'DynamoDB supports on-demand mode and provisioned mode. On-demand is simpler operationally because the service adjusts to traffic and charges per request. Provisioned mode lets you define read and write capacity and is useful when workload shape is understood and predictable.',
      'Regardless of mode, partition-level behavior still matters. A table can have enough total capacity on paper and still suffer from hot keys if too much traffic concentrates on a small subset of partition-key values.',
      'Adaptive capacity helps smooth real-world imbalances, but it is not magic. Key design still matters, especially for write-heavy hotspots, counters, and tenant-skewed workloads.',
    ],
  },
  {
    id: 'core-consistency',
    heading: 'Consistency Model',
    paragraphs: [
      'Reads can be eventually consistent or strongly consistent on the base table in supported contexts. Eventually consistent reads are usually cheaper and sufficient for many web workloads. Strongly consistent reads matter when the latest committed write must be visible immediately to the caller.',
      'Secondary indexes are eventually consistent. That matters when an application writes an item and then expects an alternate index path to reflect the change immediately.',
      'Design for the consistency actually required, not the strongest consistency imaginable. Many systems need deterministic writes and conditional correctness but can tolerate eventually consistent reads for derived views.',
    ],
  },
  {
    id: 'core-transactions',
    heading: 'Transactions',
    paragraphs: [
      'DynamoDB supports transactional reads and writes across multiple items. Transactions are useful when several related items must change atomically, such as debiting one record while crediting another or inserting a record only if related constraints also hold.',
      'Transactions are valuable, but they are not a license to ignore data modeling. They have higher cost and should be used when cross-item atomicity is truly required, not as a replacement for access-pattern-aware design.',
      'In many DynamoDB systems, condition expressions solve a large percentage of correctness needs without requiring full transactions.',
    ],
  },
  {
    id: 'core-streams',
    heading: 'Streams and Event-Driven Workflows',
    paragraphs: [
      'DynamoDB Streams capture item-level changes and make them available for downstream processing. This is commonly paired with AWS Lambda for projections, denormalized views, notifications, search indexing, or audit flows.',
      'Streams are one of the reasons DynamoDB fits event-driven architectures well. The table becomes both the operational state store and the producer of change events for downstream systems.',
      'A stream consumer should be idempotent and resilient. Change processors are part of the system\'s durability story, not just a convenience hook.',
    ],
  },
  {
    id: 'core-global',
    heading: 'Global Tables and Multi-Region Design',
    paragraphs: [
      'Global tables replicate DynamoDB tables across AWS Regions for multi-Region reads and writes. This is useful for active-active regional architectures, lower-latency geography-aware access, and resilience planning.',
      'Global tables reduce operational burden compared with building your own replication, but they do not remove the need to reason about conflict behavior, failover strategy, and region-scoped dependencies.',
      'Multi-Region database design is still a systems problem. DynamoDB gives you powerful primitives, but application semantics still decide whether a multi-writer topology is safe.',
    ],
  },
  {
    id: 'core-ttl',
    heading: 'TTL, Archival, and Data Lifecycle',
    paragraphs: [
      'Time to Live lets you mark items for automatic expiration using a configured timestamp attribute. TTL is useful for sessions, ephemeral tokens, caches, temporary workflows, and cleanup-oriented state.',
      'TTL should be treated as an asynchronous lifecycle mechanism rather than an immediate-delete guarantee. If the application needs instant revocation semantics, it must enforce them itself instead of assuming the item disappears the moment the timestamp passes.',
      'Combined with Streams, TTL can also feed cleanup or archival workflows indirectly by making expiration visible to downstream processors.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, IAM, and Encryption',
    paragraphs: [
      'DynamoDB integrates with IAM for fine-grained API access control, with VPC endpoints for private connectivity patterns, and with AWS encryption features for at-rest protection. It is typically secured at the service boundary rather than by placing the database inside a private subnet the way instance-based databases are.',
      'Fine-grained access control matters when different services or tenants should only touch selected items or tables. As always, the more powerful the access policy, the more important it becomes to keep the table and key structure intentional and understandable.',
      'Auditability matters too. Database correctness problems often become security problems when the wrong service can mutate the wrong item set.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance, DAX, and Cost',
    paragraphs: [
      'DynamoDB performance is shaped by access-path design far more than by ad hoc tuning. A single well-keyed Query can be dramatically cheaper and faster than a Scan plus filter expression, even if both eventually produce the same logical answer.',
      'DynamoDB Accelerator, or DAX, is an in-memory cache for DynamoDB that can reduce read latency for appropriate read-heavy workloads. It is most useful when applications repeatedly fetch the same items and can benefit from a dedicated caching layer that stays close to DynamoDB semantics.',
      'The major cost drivers are request volume, item size, index count, write amplification into GSIs, transactions, storage, streams, global replication, and poor query patterns. Good modeling is the primary cost optimization.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Single-table design',
    detail:
      'Store multiple entity types in one table when they participate in the same access patterns and can share key conventions. This can produce extremely efficient query paths, but it demands discipline in naming, item typing, and documentation.',
  },
  {
    title: 'Entity-per-table design',
    detail:
      'Use separate tables when entities have clearly different scaling, retention, or operational concerns. This is often simpler for teams early in DynamoDB adoption.',
  },
  {
    title: 'Time-series partitioning',
    detail:
      'Model sort keys around time or sequence when the dominant query is "give me the recent events for one thing." Be careful not to create one hot partition for every write-heavy tenant or device.',
  },
  {
    title: 'Sparse indexes',
    detail:
      'Populate an index key attribute only on items that should appear in that index. This is a common and efficient way to build alternate lookup paths without indexing every item type.',
  },
  {
    title: 'Idempotency and state machines',
    detail:
      'Use conditional writes and version or state attributes to implement safe retries, workflow transitions, and duplicate suppression without central locking.',
  },
]

const pitfalls = [
  'Choosing a partition key with low cardinality or skewed traffic and then creating hot partitions.',
  'Treating Scan plus filter as a normal application query path.',
  'Adding GSIs without a precise access pattern and then paying permanent write and storage cost for them.',
  'Designing the table before listing the reads and writes the application actually needs.',
  'Using single-table design without clear naming conventions, entity typing, and access-pattern documentation.',
  'Assuming eventually consistent index reads reflect writes immediately.',
  'Using transactions everywhere when condition expressions would solve the problem more simply.',
  'Ignoring item size and write amplification from projections and secondary indexes.',
  'Assuming TTL is an immediate-delete mechanism.',
  'Forgetting pagination, one megabyte page boundaries, and last evaluated key handling in real query flows.',
]

const examples = [
  {
    id: 'ex-single-table',
    title: 'Single-table entity pattern',
    code: `Table keys:
  PK
  SK

Customer item:
  PK = CUSTOMER#123
  SK = PROFILE

Order item:
  PK = CUSTOMER#123
  SK = ORDER#2026-03-10#9001

Query:
  PK = CUSTOMER#123
  begins_with(SK, ORDER#)`,
    explanation:
      'This pattern places related entities in one item collection so a single Query can return a customer profile and time-ordered orders with sort-key filtering.',
  },
  {
    id: 'ex-query-not-scan',
    title: 'Query over Scan mindset',
    code: `Good:
  Query partition key = TENANT#42
  sort key between 2026-03-01 and 2026-03-31

Bad:
  Scan entire table
  filter tenant = 42
  filter createdAt in March`,
    explanation:
      'The point is not stylistic purity. Query reads the items your key design says are relevant. Scan reads broadly and then throws work away.',
  },
  {
    id: 'ex-conditional-write',
    title: 'Conditional put for uniqueness or idempotency',
    code: `PutItem:
  item = {
    PK: REQUEST#abc123,
    status: ACCEPTED
  }
  condition:
    attribute_not_exists(PK)`,
    explanation:
      'This is the standard DynamoDB pattern for create-once semantics. If the item already exists, the write fails instead of silently overwriting.',
  },
  {
    id: 'ex-update-expression',
    title: 'Update expression idea',
    code: `UpdateItem:
  key = USER#42 / PROFILE
  update:
    SET loginCount = if_not_exists(loginCount, 0) + 1,
        lastSeenAt = :now
  condition:
    accountStatus = :active`,
    explanation:
      'Update expressions let you mutate selected attributes efficiently while condition expressions enforce correctness on the write.',
  },
  {
    id: 'ex-transaction',
    title: 'Transactional write shape',
    code: `TransactWriteItems:
  1. ConditionCheck account balance >= 50
  2. Update account A set balance = balance - 50
  3. Update account B set balance = balance + 50
  4. Put transfer record`,
    explanation:
      'Transactions are for the cases where several items must succeed or fail together. Use them when cross-item atomicity is truly part of the business rule.',
  },
  {
    id: 'ex-ttl',
    title: 'TTL item shape',
    code: `Session item:
  PK = SESSION#xyz
  userId = 42
  expiresAt = 1770000000

TTL attribute configured:
  expiresAt`,
    explanation:
      'TTL works well for ephemeral records such as sessions, temporary invitations, and short-lived workflow state.',
  },
]

const glossaryTerms = [
  {
    term: 'Partition key',
    definition:
      'The primary key attribute DynamoDB uses to distribute data and route lookups.',
  },
  {
    term: 'Sort key',
    definition:
      'The secondary part of a composite primary key used to order related items within one partition key.',
  },
  {
    term: 'Item collection',
    definition:
      'The set of items that share the same partition key value.',
  },
  {
    term: 'GSI',
    definition:
      'A global secondary index that provides an alternate key path across the table.',
  },
  {
    term: 'LSI',
    definition:
      'A local secondary index that shares the table partition key but uses a different sort key.',
  },
  {
    term: 'Query',
    definition:
      'The primary read operation for fetching items by partition key and optional sort-key conditions.',
  },
  {
    term: 'Scan',
    definition:
      'A broad read operation that examines the table or index rather than using a targeted key path.',
  },
  {
    term: 'Condition expression',
    definition:
      'A write guard that allows a mutation only if the specified item state is true.',
  },
  {
    term: 'Update expression',
    definition:
      'A partial mutation syntax for setting, incrementing, removing, or otherwise changing item attributes.',
  },
  {
    term: 'On-demand capacity',
    definition:
      'The DynamoDB pricing and throughput mode where reads and writes are billed by request volume rather than preconfigured capacity.',
  },
  {
    term: 'Provisioned capacity',
    definition:
      'The throughput mode where you define read and write capacity levels ahead of time.',
  },
  {
    term: 'DAX',
    definition:
      'DynamoDB Accelerator, an in-memory cache designed to reduce read latency for suitable DynamoDB workloads.',
  },
  {
    term: 'Streams',
    definition:
      'A DynamoDB feature that emits ordered item-level changes for downstream consumers.',
  },
  {
    term: 'Global table',
    definition:
      'A DynamoDB table replicated across multiple AWS Regions for multi-Region access and resilience patterns.',
  },
  {
    term: 'TTL',
    definition:
      'Time to Live, the item expiration mechanism based on a configured timestamp attribute.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html',
  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html',
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
    { id: 'bp-when', label: 'When to Use It' },
  ],
  'core-concepts': [
    { id: 'core-data-model', label: 'Data Model' },
    { id: 'core-access-patterns', label: 'Access Patterns' },
    { id: 'core-keys', label: 'Keys' },
    { id: 'core-indexes', label: 'Indexes' },
    { id: 'core-query', label: 'Query and Scan' },
    { id: 'core-expressions', label: 'Expressions' },
    { id: 'core-capacity', label: 'Capacity' },
    { id: 'core-consistency', label: 'Consistency' },
    { id: 'core-transactions', label: 'Transactions' },
    { id: 'core-streams', label: 'Streams' },
    { id: 'core-global', label: 'Global Tables' },
    { id: 'core-ttl', label: 'TTL' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-performance', label: 'Performance and Cost' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const dynamoHelpStyles = `
.dynamo-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dynamo-help98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
}

.dynamo-help98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.dynamo-help98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.dynamo-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.dynamo-help98-control {
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

.dynamo-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.dynamo-help98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.dynamo-help98-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.dynamo-help98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.dynamo-help98-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.dynamo-help98-toctitle {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.dynamo-help98-toclist {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dynamo-help98-toclist li {
  margin: 0 0 8px;
}

.dynamo-help98-toclist a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.dynamo-help98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.dynamo-help98-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.dynamo-help98-section {
  margin: 0 0 20px;
}

.dynamo-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.dynamo-help98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.dynamo-help98-content p,
.dynamo-help98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.dynamo-help98-content p {
  margin: 0 0 10px;
}

.dynamo-help98-content ul,
.dynamo-help98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.dynamo-help98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.dynamo-help98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.dynamo-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.dynamo-help98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .dynamo-help98-main {
    grid-template-columns: 1fr;
  }

  .dynamo-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsDynamoDbPage(): JSX.Element {
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
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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
    <div className="dynamo-help98-page">
      <style>{dynamoHelpStyles}</style>
      <div className="dynamo-help98-window" role="presentation">
        <header className="dynamo-help98-titlebar">
          <span className="dynamo-help98-titletext">{pageTitle}</span>
          <div className="dynamo-help98-controls">
            <button className="dynamo-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="dynamo-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="dynamo-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dynamo-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dynamo-help98-main">
          <aside className="dynamo-help98-toc" aria-label="Table of contents">
            <h2 className="dynamo-help98-toctitle">Contents</h2>
            <ul className="dynamo-help98-toclist">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="dynamo-help98-content">
            <h1 className="dynamo-help98-title">{pageTitle}</h1>
            <p className="dynamo-help98-subheading">{pageSubtitle}</p>
            <p>
              This page is intentionally practical. DynamoDB looks simple at the API surface, but most of the real engineering work
              is in choosing keys, indexes, and write conditions that fit the application\'s traffic and correctness requirements.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="dynamo-help98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dynamo-help98-section">
                  <h2 className="dynamo-help98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="dynamo-help98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="dynamo-help98-divider" />
                <section id="bp-when" className="dynamo-help98-section">
                  <h2 className="dynamo-help98-heading">When to Use It</h2>
                  <ul>
                    {decisionGuidance.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="dynamo-help98-section">
                    <h2 className="dynamo-help98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-patterns" className="dynamo-help98-section">
                  <h2 className="dynamo-help98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="dynamo-help98-section">
                  <h2 className="dynamo-help98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="dynamo-help98-section">
                    <h2 className="dynamo-help98-heading">{example.title}</h2>
                    <div className="dynamo-help98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dynamo-help98-section">
                <h2 className="dynamo-help98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="dynamo-help98-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="dynamo-help98-inline-link" target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
