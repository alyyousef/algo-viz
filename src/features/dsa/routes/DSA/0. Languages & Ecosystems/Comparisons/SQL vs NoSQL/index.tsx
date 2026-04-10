import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'SQL and NoSQL are not just two query syntaxes. They represent different families of database design priorities. SQL usually refers to relational databases that organize data into tables with explicit schemas, relationships, joins, and mature transactional guarantees. NoSQL refers to a broader umbrella of non-relational systems such as document stores, key-value stores, wide-column stores, and graph databases.',
      'That umbrella point matters. Comparing SQL to NoSQL is not like comparing PostgreSQL to MySQL. SQL is a data model and query tradition centered on relations. NoSQL is a catch-all category for systems that often relax or replace relational assumptions in order to optimize for scale patterns, flexible data shapes, or specialized access paths.',
      'This help-style manual covers overview, key ideas, syntax, APIs, ecosystem, architecture notes, use cases, and tradeoffs while explaining where each approach fits, where the comparison is oversimplified, and how real engineering decisions are usually made.',
    ],
  },
  {
    id: 'bp-sql-fit',
    title: 'When SQL Fits Better',
    paragraphs: [
      'SQL is usually the strongest default when the data has clear relationships, the business rules are strict, correctness matters more than raw write fan-out, and the application needs rich queries across multiple entities. Financial systems, transactional backends, admin tooling, analytics pipelines, and most internal business systems often benefit from normalized schemas, joins, and ACID transactions.',
      'Relational databases also tend to age well when a product accumulates reporting needs, cross-entity filtering, and integrity rules. Foreign keys, constraints, and mature query planners reduce the amount of data consistency logic that would otherwise leak into application code.',
    ],
  },
  {
    id: 'bp-nosql-fit',
    title: 'When NoSQL Fits Better',
    paragraphs: [
      'NoSQL is often a better fit when the access patterns are narrow and well known, the shape of the data is heterogeneous or hierarchical, the system needs simple horizontal scaling, or the workload is specialized enough that a relational model becomes awkward. Examples include high-volume event ingestion, cache-like key retrieval, document-heavy product catalogs, user profiles, session storage, recommendation edges, and IoT workloads.',
      'Document databases often shine when an application naturally reads and writes aggregates as one unit. Key-value stores fit hot-path lookups with minimal query complexity. Wide-column systems fit partition-oriented write-heavy workloads. Graph databases fit relationship traversal problems that are cumbersome with many joins.',
    ],
  },
  {
    id: 'bp-false-binary',
    title: 'Why The SQL vs NoSQL Debate Is Often Too Binary',
    paragraphs: [
      'Modern systems blur the old boundaries. Many relational databases now support JSON columns, partial indexes, full-text search, and some horizontal scaling strategies. Many NoSQL databases now support transactions, secondary indexes, aggregation pipelines, or SQL-like query layers. The practical question is rarely relational versus non-relational in the abstract. It is usually which data model best matches the dominant access patterns and operational constraints.',
      'A second problem with the slogan-level debate is that teams compare relational databases to a single document database and then treat the result as universal. That misses the fact that a document store, a key-value store, and a graph database solve very different problems even though they are all labeled NoSQL.',
    ],
  },
  {
    id: 'bp-tradeoff',
    title: 'Core Tradeoff',
    paragraphs: [
      'SQL databases usually ask teams to model relationships explicitly up front so they can gain strong consistency, reusable query power, and data integrity. NoSQL systems often ask teams to model around access patterns, denormalization, or partitioning strategies so they can gain simpler scaling characteristics, flexible records, or specialized performance.',
      'Neither side is universally simpler. SQL can feel rigid early and pay off later. NoSQL can feel fast to start and become harder later if query needs expand or data duplication creates consistency problems.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose SQL by default when you need strong relational integrity, flexible ad hoc querying, joins, and dependable multi-row transactional behavior.',
      'Choose a NoSQL system when the workload is better described by access patterns than by relationships, or when a document, key-value, wide-column, or graph model fits the data more naturally than normalized tables.',
      'The strongest engineering posture is not ideology. It is identifying the data shapes, read paths, write paths, consistency expectations, and scaling behavior the application actually needs.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-what-sql-means',
    title: 'What SQL Usually Means',
    paragraphs: [
      'In day-to-day engineering conversation, SQL usually means a relational database management system such as PostgreSQL, MySQL, SQL Server, or SQLite. Data is organized into tables made of rows and columns, tables are related through keys, and queries combine sets of rows through filtering, grouping, and joins.',
      'The relational model is powerful because it separates how data is stored from how it can be queried. A well-designed schema can support many future questions, not just the one query the team has today. That is one reason relational systems remain the default in so many production systems.',
    ],
  },
  {
    id: 'core-what-nosql-means',
    title: 'What NoSQL Usually Means',
    paragraphs: [
      'NoSQL means non-relational, but that definition is too loose to be very helpful by itself. In practice it covers several major database families. Document databases store records as nested documents. Key-value databases optimize retrieval by key. Wide-column systems organize data around partitions and sparse columns. Graph databases optimize traversal across edges and nodes.',
      'Because those systems differ so much, a NoSQL decision should start with the subtype, not the label. Saying choose NoSQL is incomplete. The real question is whether the workload is best served by a document model, a key-value model, a partitioned wide-column model, or a graph model.',
    ],
  },
  {
    id: 'core-schema',
    title: 'Schema Rigidity vs Schema Flexibility',
    paragraphs: [
      'SQL schemas are explicit. Tables, column types, constraints, indexes, and relationships are defined intentionally. That can feel slower during early prototyping, but it gives teams a strong contract around what data is valid and how entities relate to each other.',
      'Many NoSQL systems permit more flexible records. A document in one collection may not have exactly the same fields as another. That flexibility can speed up iteration and reduce migration friction, but it also shifts more responsibility into application code, validation layers, or disciplined modeling practices.',
    ],
  },
  {
    id: 'core-modeling',
    title: 'Normalization vs Denormalization',
    paragraphs: [
      'Relational design usually favors normalization. Data is broken into related tables so each fact is stored once and linked through keys. This reduces duplication and makes updates safer because there are fewer copies of the same truth to keep in sync.',
      'NoSQL designs often denormalize deliberately. Related information may be embedded into one document or copied into multiple records so the application can answer its common queries with fewer joins or fewer cross-partition reads. That can improve read performance and simplify specific access paths, but it increases the cost of consistency when duplicated facts change.',
    ],
  },
  {
    id: 'core-relationships',
    title: 'Relationships and Joins',
    paragraphs: [
      'SQL databases are built around relationships. Foreign keys and joins let teams ask complex questions across entities without redesigning the storage model every time a new report or feature appears. This is one of the deepest long-term advantages of relational systems.',
      'NoSQL systems often avoid general-purpose joins or restrict them in favor of application-level composition, document embedding, or query patterns aligned to one aggregate at a time. That works very well when the main reads are known and stable, but it is less forgiving when the application later needs many cross-entity reports or arbitrarily connected queries.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and Consistency',
    paragraphs: [
      'Relational databases are strongly associated with ACID transactions. Multiple changes can succeed or fail together, intermediate states remain hidden, and constraints help preserve correctness. That matters for money movement, inventory, booking systems, and any workflow where partial success is unacceptable.',
      'NoSQL does not mean no consistency. Many NoSQL systems provide atomic single-record operations, and several also support multi-document or distributed transactions. The tradeoff is usually that transactions are not the modeling center of gravity in the same way they are in a classic relational design, especially when the system encourages aggregate-oriented or partition-oriented access.',
    ],
  },
  {
    id: 'core-query',
    title: 'Query Model and Expressiveness',
    paragraphs: [
      'SQL is a declarative query language with decades of tooling, optimization, and developer familiarity behind it. It is especially effective for filtering, joining, sorting, grouping, window functions, and analytical queries that evolve over time.',
      'NoSQL query models vary widely. Document stores may support rich filtering over nested fields and aggregation pipelines. Key-value stores may support almost no query flexibility beyond key-based access. Wide-column systems may require that queries follow the partition and clustering strategy exactly. This means a NoSQL system can be extremely efficient for known access patterns but much less forgiving for ad hoc exploration.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Model',
    paragraphs: [
      'SQL systems often scale vertically first and horizontally with more planning. Replication, partitioning, read replicas, and managed cloud offerings can take them far, but the design often assumes stronger centralized coordination.',
      'Many NoSQL systems were designed with horizontal distribution as a first-class concern. Partition keys, sharding strategies, replica placement, and eventual consistency options often appear earlier in the design conversation. That can make large-scale distribution more natural, but it also means poor key design can become a major bottleneck.',
    ],
  },
  {
    id: 'core-access-patterns',
    title: 'Access-Pattern Design',
    paragraphs: [
      'SQL encourages a schema that can answer many related questions later. NoSQL often encourages modeling from the access patterns backward. What are the hot reads. What are the partition keys. What must be fetched together. What can be duplicated safely. Those questions shape the schema much earlier.',
      'This is one reason NoSQL systems can feel very fast when the requirements are clear and very painful when they are not. If the access pattern changes, the data model may need significant redesign rather than just a new join or index.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexing and Performance',
    paragraphs: [
      'Both SQL and NoSQL systems use indexes, but the design pressure is different. In SQL, indexes support a broad query language and query planner. Teams often start with a normalized schema and add indexes as usage becomes clear.',
      'In NoSQL systems, index choices are often inseparable from the data model itself. A document structure, partition key, or sort key can determine whether a request is efficient or impossible. That means performance tuning is often more front-loaded in NoSQL system design.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operational and Team Complexity',
    paragraphs: [
      'SQL is conceptually demanding but organizationally familiar. Most engineers, analysts, BI tools, and data pipelines speak SQL. That shared literacy reduces friction across teams.',
      'NoSQL can simplify a narrow production path while increasing organizational complexity elsewhere. If the database cannot answer exploratory questions easily, teams may end up copying data into warehouses, search systems, or analytics pipelines to recover the flexibility they gave up at the operational layer.',
    ],
  },
  {
    id: 'core-hybrid',
    title: 'Hybrid Architectures Are Normal',
    paragraphs: [
      'Many mature systems use both. A relational database may own transactional truth, while Redis handles caching, Elasticsearch handles search, object storage handles blobs, and a document or event store handles specialized workloads. SQL versus NoSQL is often not a winner-take-all choice.',
      'The strongest design usually assigns each store a clear responsibility. The trouble starts when a team forces one database to solve every persistence problem because the technology choice became ideological instead of workload-driven.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward SQL if the system needs joins, constraints, reporting flexibility, and multi-entity transactions more than it needs ultra-specialized distribution behavior.',
      'Lean toward NoSQL if the data naturally lives as aggregates, keys, partitions, or graphs; the access patterns are predictable; and the specialized performance or scaling model materially simplifies the system.',
      'If the answer is unclear, the safe default for many business applications is still relational first, then add specialized NoSQL systems where the workload proves that the specialization is worth the complexity.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-relational-model',
    title: 'Normalized Relational Model',
    description:
      'A relational design separates users, orders, and line items so each entity has a clear responsibility and relationships are expressed explicitly.',
    snippets: [
      {
        label: 'SQL Schema',
        code: `CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  sku TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price_cents INTEGER NOT NULL
);`,
      },
    ],
    takeaway:
      'Normalization reduces duplication and makes integrity rules explicit, but common reads may require joins.',
  },
  {
    id: 'examples-document-model',
    title: 'Aggregate-Oriented Document Model',
    description:
      'A document-oriented design may store an order and its items together because the application usually reads the whole order in one request.',
    snippets: [
      {
        label: 'Document Example',
        code: `{
  "_id": "ord_1024",
  "userId": "usr_88",
  "status": "paid",
  "createdAt": "2026-03-30T08:10:00Z",
  "items": [
    { "sku": "kb-01", "quantity": 1, "unitPriceCents": 12900 },
    { "sku": "ms-07", "quantity": 2, "unitPriceCents": 3900 }
  ],
  "shippingAddress": {
    "city": "Cairo",
    "country": "EG"
  }
}`,
      },
    ],
    takeaway:
      'Embedding reduces read-time assembly for aggregate reads, but duplicated facts across documents become an update responsibility.',
  },
  {
    id: 'examples-query-shape',
    title: 'Cross-Entity Query vs Direct Aggregate Fetch',
    description:
      'The contrast becomes clear when the product needs either cross-entity reporting or direct retrieval of one known aggregate.',
    snippets: [
      {
        label: 'SQL Join Query',
        code: `SELECT u.email, o.id, o.status
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid'
ORDER BY o.created_at DESC;`,
      },
      {
        label: 'Document Fetch',
        code: `db.orders.find(
  { _id: "ord_1024" },
  { userId: 1, status: 1, items: 1, shippingAddress: 1 }
)`,
      },
    ],
    takeaway:
      'SQL excels when the question spans multiple related entities. A document model excels when the dominant read is one aggregate fetched by known criteria.',
  },
  {
    id: 'examples-transaction',
    title: 'Transactional Update vs Aggregate Atomicity',
    description:
      'Relational systems often center multi-row transactional workflows. NoSQL systems often center atomic changes to one record or partitioned unit, with broader transactions available only when truly necessary.',
    snippets: [
      {
        label: 'SQL Transaction',
        code: `BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;`,
      },
      {
        label: 'Aggregate-Oriented Update',
        code: `db.orders.updateOne(
  { _id: "ord_1024" },
  {
    $set: { status: "shipped" },
    $push: { history: { state: "shipped", at: "2026-03-30T09:00:00Z" } }
  }
)`,
      },
    ],
    takeaway:
      'If correctness depends on many related records changing together, relational modeling is often the simpler baseline. If one aggregate owns the write, document atomicity may be enough.',
  },
  {
    id: 'examples-decision',
    title: 'Simple Selection Heuristic',
    description: 'A short heuristic helps separate ideology from workload analysis.',
    snippets: [
      {
        label: 'Use SQL When',
        code: `The system needs:
- strong relational integrity
- joins and ad hoc reporting
- multi-entity transactions
- predictable long-term data governance`,
      },
      {
        label: 'Use NoSQL When',
        code: `The system needs:
- aggregate-oriented reads
- flexible or nested records
- partition-oriented scaling
- a specialized model such as key-value, document, or graph`,
      },
    ],
    takeaway:
      'Start from the query and consistency model, not from industry slogans about old versus modern databases.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Relational Database',
    definition:
      'A database that stores structured data in related tables and typically uses SQL for querying and manipulation.',
  },
  {
    term: 'NoSQL',
    definition:
      'A broad category of non-relational databases including document, key-value, wide-column, and graph systems.',
  },
  {
    term: 'Schema',
    definition:
      'The defined structure of stored data, including fields, types, constraints, and relationships.',
  },
  {
    term: 'Normalization',
    definition:
      'A relational design practice that reduces duplication by splitting data into related tables.',
  },
  {
    term: 'Denormalization',
    definition:
      'A modeling practice that duplicates or embeds data to optimize specific reads or reduce joins.',
  },
  {
    term: 'Join',
    definition:
      'A relational query operation that combines rows from multiple tables based on matching conditions.',
  },
  {
    term: 'ACID',
    definition:
      'A set of transactional guarantees covering atomicity, consistency, isolation, and durability.',
  },
  {
    term: 'Eventual Consistency',
    definition:
      'A consistency model in which replicas may temporarily differ but converge over time.',
  },
  {
    term: 'Document Database',
    definition:
      'A NoSQL database that stores data as document-like records, often JSON or BSON shaped.',
  },
  {
    term: 'Key-Value Store',
    definition:
      'A database optimized for storing and retrieving values by a unique key with minimal query complexity.',
  },
  {
    term: 'Wide-Column Store',
    definition:
      'A NoSQL database family designed around partitioned rows with flexible columns and high write scalability.',
  },
  {
    term: 'Graph Database',
    definition:
      'A database designed to represent nodes and edges efficiently for traversal-heavy relationship queries.',
  },
  {
    term: 'Partition Key',
    definition:
      'A field used to distribute data across shards or partitions in many distributed NoSQL systems.',
  },
  {
    term: 'Aggregate',
    definition:
      'A group of related data treated as one read or write unit, common in document-oriented design.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SqlVsNosqlPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'SQL vs NoSQL',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="SQL vs NoSQL"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">SQL vs NoSQL</h1>
      <p className="sql-nosql-help-doc-subtitle">
        Manual-style comparison of relational modeling, non-relational data families, consistency,
        scaling, and access-pattern tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
