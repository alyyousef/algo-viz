import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  cassandraCode: string
  mongoCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Cassandra vs MongoDB'
const pageSubtitle =
  'Comparing a wide-column distributed database optimized for scale and availability with a document database optimized for flexible data models and broad application ergonomics.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cassandra and MongoDB are both non-relational databases, but they solve very different problems and should not be treated as interchangeable NoSQL brands. Cassandra is a distributed wide-column database designed for very high write throughput, high availability, horizontal scale, and operation across many nodes and even multiple datacenters. MongoDB is a document database designed around JSON-like documents, flexible schema modeling, rich application-facing queries, replication, sharding, and a developer experience that often feels much closer to ordinary application objects.',
      'A useful shorthand is this: Cassandra is a scale-and-availability-first distributed database whose modeling style is driven by query patterns and partition design. MongoDB is a document-first operational database whose modeling style is driven by application objects, embedding or referencing strategy, indexing, and a balance of flexibility with transactional capability. Both can scale, but they scale according to different assumptions and reward different habits.',
      'This means the practical decision is not Which NoSQL database is better in the abstract. The practical decision is whether your workload is more like high-volume distributed event or time-series style storage with predictable access patterns, or more like an application database where flexible documents, secondary indexes, richer queries, and multi-document semantics matter more.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Cassandra is built around distributed systems realities first. Its documentation frames it as highly scalable and reliable, and its guarantees page explicitly describes choosing availability and partition tolerance under CAP tradeoffs, with eventual consistency for normal writes and lightweight transactions for narrower linearizable use cases. Cassandra wants you to think in terms of partitions, replicas, consistency levels, write paths, repair, and query-driven schema design.',
      'MongoDB is built around documents and application data modeling first. Its manual frames MongoDB as a document database, emphasizes the flexible document model, replication and automatic failover for high availability, sharding for horizontal scaling, and multi-document transactions for complex consistency-sensitive operations. MongoDB wants you to think in terms of documents, collections, embedding versus referencing, indexes, replica sets, and sharded clusters.',
      'That means Cassandra often feels like a distributed storage engine that exposes a query language, while MongoDB often feels like an application-shaped database that also knows how to scale and replicate seriously.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Cassandra is strongest for workloads where write volume is massive, uptime requirements are strict, data is naturally distributed, and query patterns are known ahead of time. It is especially strong for time-series ingestion, event logging, IoT telemetry, large-scale user activity storage, messaging-style workloads, and systems that need to keep operating across node or datacenter failures without treating every request as strongly consistent by default.',
      'MongoDB is strongest for application backends where data is naturally document-shaped, schema flexibility matters, query needs evolve, and developers want rich indexing and query support without giving up replication, sharding, or transactions. It is especially strong for product backends, content and catalog systems, user-profile and configuration data, internal tools, and many general-purpose application databases that do not fit rigidly into relational modeling but still need broad query expressiveness.',
      'If the central question is Which database best handles always-on distributed write-heavy scale with query patterns designed up front, Cassandra usually wins. If the central question is Which database best supports flexible application data and broad query ergonomics, MongoDB usually wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Cassandra when horizontal scale, write throughput, and availability under partitioned conditions matter most.',
      'Choose MongoDB when document modeling flexibility, secondary indexes, and broad application-facing query needs matter most.',
      'Choose Cassandra when you are willing to model tables around known query patterns and partition behavior.',
      'Choose MongoDB when your data shape and access patterns are more likely to evolve with the application.',
      'If the debate is really about distributed write architecture versus application data ergonomics, that is the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Cassandra is partition-design first',
    detail:
      'Its data model is driven by how data is distributed and which queries must be efficient, not by object flexibility alone.',
  },
  {
    title: 'MongoDB is document-model first',
    detail:
      'Its core abstraction is the document, and much of its usability comes from how naturally documents map to application data.',
  },
  {
    title: 'Cassandra rewards predictability',
    detail:
      'If you know the primary access patterns early, you can model for extreme scale and high availability very effectively.',
  },
  {
    title: 'MongoDB rewards adaptability',
    detail:
      'If the application schema and query surface will evolve, MongoDB often absorbs that change more gracefully.',
  },
  {
    title: 'Consistency defaults differ in spirit',
    detail:
      'Cassandra treats distributed availability tradeoffs as central. MongoDB more naturally supports application-style consistency expectations through replica sets and transactions.',
  },
  {
    title: 'Query flexibility is not the same thing as scalability model',
    detail:
      'MongoDB often gives richer ad hoc query ergonomics. Cassandra often gives more predictable behavior at very large distributed write scale when modeled correctly.',
  },
  {
    title: 'Data modeling mistakes are punished differently',
    detail:
      'Poor Cassandra modeling often shows up as partition and query pain. Poor MongoDB modeling often shows up as document bloat, bad indexes, or awkward embedding and referencing tradeoffs.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-model',
    title: 'Data Model and Mental Shape',
    paragraphs: [
      'Cassandra uses tables, rows, columns, and CQL, and the official CQL documentation explicitly says the model is similar to SQL in that data is stored in tables containing rows of columns. But that similarity is easy to overread. Cassandra is not a relational database with a distributed badge. The real design center is partition keys, clustering columns, replica placement, and query patterns. The table shape is less about representing the world elegantly and more about making the required reads and writes efficient across the cluster.',
      'MongoDB stores records as documents, and its manual describes a record as a document composed of field and value pairs, similar to JSON objects, with values that may include nested documents and arrays. That means MongoDB often feels closer to application objects and API payloads. The document model makes embedding and heterogeneous shape feel natural in a way that Cassandra does not try to optimize for.',
      'A practical framing is this: Cassandra tables are usually designed around how data must be partitioned and queried. MongoDB documents are usually designed around how data is naturally represented and retrieved by the application.',
    ],
  },
  {
    id: 'core-schema',
    title: 'Schema Flexibility and Modeling Discipline',
    paragraphs: [
      'Cassandra is often described as schema-flexible because it is not relational in the traditional sense, but in practice serious Cassandra use requires a high degree of intentional schema design. The official docs explicitly emphasize data modeling and even hint that it is not relational. You generally define tables around specific query needs, often denormalizing aggressively. Schema discipline is therefore not optional. It is one of the central engineering tasks in Cassandra.',
      'MongoDB is more visibly flexible at the record level because documents can evolve and because embedding and referencing let you model relationships in different ways. The MongoDB data modeling docs explicitly say you can model relationships by either embedding or referencing depending on application access patterns. This flexibility is one of MongoDBs biggest attractions, especially for product teams whose data shape changes over time.',
      'So both databases need modeling discipline, but the kind differs. Cassandra demands disciplined up-front query-driven schema design. MongoDB demands disciplined document design and indexing so flexibility does not become chaos.',
    ],
  },
  {
    id: 'core-query',
    title: 'Query Model and Access Pattern Assumptions',
    paragraphs: [
      'Cassandra is happiest when the access patterns are known in advance and the schema has been designed for them. CQL looks familiar to SQL users, but Cassandra is not trying to be a general-purpose ad hoc query engine. The standard guidance is to define application queries and then design the physical model around those queries. This is one reason Cassandra can be so effective at scale: the query model is intentionally constrained by what the storage architecture can serve efficiently.',
      'MongoDB is generally more flexible for application-facing queries. Rich indexes, document fields, nested structures, and a broad query language make it easier to support evolving feature needs without redesigning the entire storage layout every time the application grows a new query. This flexibility is especially valuable in product development, internal tooling, and systems where querying is not fully known at the beginning.',
      'The tradeoff is straightforward. Cassandra gives you more predictable behavior when you commit to your query model early. MongoDB gives you more room to evolve the query surface later.',
    ],
  },
  {
    id: 'core-consistency',
    title: 'Consistency Model, CAP Tradeoffs, and Transactions',
    paragraphs: [
      'Cassandra documentation explicitly frames the database through CAP tradeoffs and states that Cassandra chooses availability and partition tolerance, compromising on consistency to some extent for ordinary operations. The guarantees page describes eventual consistency of writes to a single table as a core property, while also noting lightweight transactions with linearizable consistency for narrower cases. In other words, Cassandra is designed so that the cluster keeps serving, and you as the engineer choose how much consistency to buy through modeling and consistency-level decisions.',
      'MongoDB has a more application-database-oriented consistency story. The manual describes replication and automatic failover for high availability and also supports multi-document ACID transactions. That means MongoDB can serve a broader set of consistency-sensitive application workflows more naturally when the workload requires all-or-nothing changes across multiple documents.',
      'This is not a simple stronger-versus-weaker story. Cassandra is optimized for a very different distributed systems bargain. MongoDB is optimized for a broader range of application semantics. The right choice depends on whether your core problem is distributed availability at scale or application transaction and query ergonomics.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling and Distribution Architecture',
    paragraphs: [
      'Cassandra is built for horizontal scale as a first principle. Its architecture is peer-to-peer rather than primary-secondary in the same ordinary sense many application databases use. Data is replicated across nodes according to the configured replication strategy and replication factor, and the cluster is intended to keep serving even when parts of the system are unavailable. This is one of the biggest reasons teams choose Cassandra at all.',
      'MongoDB scales through replica sets for high availability and sharding for horizontal scaling. The manual explicitly presents replica sets and sharding as core architecture concepts. This is a powerful model, but it feels different from Cassandra. MongoDB usually starts from application-database ergonomics and then adds distribution and scaling mechanisms. Cassandra starts from distributed operation and then constrains the data and query model accordingly.',
      'So the question is not Can MongoDB scale. It can. The question is whether scaling is the center of the design or a capability layered onto a more application-shaped database model.',
    ],
  },
  {
    id: 'core-replication',
    title: 'Replication, High Availability, and Failure Handling',
    paragraphs: [
      'In Cassandra, replication is fundamental to the data model and read-write path. Replica placement, consistency levels, hinted handoff, repair, and topology awareness are part of the ordinary operating model. A Cassandra team is usually thinking explicitly about failure domains and eventual convergence as normal engineering concerns, not exceptional database behavior.',
      'MongoDB replica sets center around a primary and secondaries with automatic failover. That architecture often feels more intuitive to application teams because it maps naturally onto primary-write expectations while still providing redundancy and read scaling options. For many product backends this is exactly the right mental model: a primary operational database that can fail over automatically and scale outward when needed.',
      'Cassandra usually feels more native to distributed-system operators. MongoDB usually feels more native to application developers who still need serious availability.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexes, Query Flexibility, and Secondary Access Paths',
    paragraphs: [
      'MongoDB is usually much more comfortable when the application wants multiple indexed access paths over the same logical entity. Secondary indexes, compound indexes, nested field queries, and document-oriented filtering are core parts of why MongoDB works well as a general operational database for application teams.',
      'Cassandra can support additional access paths, but the design center is still schema-per-query and partition-driven access. If you need many evolving, application-driven query patterns over the same dataset, Cassandra usually becomes harder to model well than MongoDB. The classic Cassandra approach is not to hope a rich ad hoc query engine will save you. It is to model the table so the intended query is already efficient.',
      'This is one of the clearest reasons many teams pick MongoDB: the indexing and query story matches how product features evolve. Cassandra is usually chosen when that flexibility is not the primary requirement.',
    ],
  },
  {
    id: 'core-write-read',
    title: 'Write Path, Read Path, and Workload Bias',
    paragraphs: [
      'Cassandra is famous for write-heavy workloads. When data arrives at very high volume and the system must remain available across many nodes and failures, Cassandra can be extremely effective if the partition model is sound. This is why it shows up so often in telemetry, log ingestion, and event-style storage discussions.',
      'MongoDB can also handle serious operational workloads, but it is generally chosen less for extreme distributed write bias and more for document-centric application behavior. Reads and writes are shaped by index design, document size, working set, and shard strategy rather than by the same kind of partition-first data model pressure Cassandra imposes.',
      'A useful heuristic is this: if the question starts with We need to sustain enormous distributed writes with predictable access patterns, Cassandra should be on the shortlist quickly. If the question starts with We need a flexible primary app database with evolving product queries, MongoDB should usually show up earlier.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions, Single-Entity Operations, and Cross-Record Guarantees',
    paragraphs: [
      'MongoDB documentation explicitly highlights multi-document ACID transactions. This matters because many application workflows eventually need to coordinate changes across more than one record while still preserving consistency. MongoDB can support that style of application logic more naturally when it is truly needed, even though good document modeling still tries to keep common operations local when possible.',
      'Cassandra supports lightweight transactions, but that is not the same thing as positioning the database around broad transactional workloads. Lightweight transactions are narrower tools in a system whose ordinary performance model assumes different tradeoffs. If your workload routinely needs rich cross-entity transactional semantics, Cassandra is often not the most natural fit.',
      'This is another example of first principles: MongoDB wants to serve general application development comfortably. Cassandra wants to serve distributed scalability and availability comfortably. Those are related goals, but they are not the same goal.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Operations, and Day-2 Complexity',
    paragraphs: [
      'Cassandra operations require serious distributed-systems competence. Repair, compaction behavior, partition sizing, tombstones, replication strategy, node health, and capacity planning all matter. This does not make Cassandra bad. It makes Cassandra a database that expects operators to understand its architecture deeply if they want sustained success at scale.',
      'MongoDB operations also require care, especially around replica sets, sharding, index strategy, working set management, and schema evolution. But for many teams MongoDB feels easier to operate initially because the mental model is closer to what application teams expect from a primary operational database. The learning curve is often more around good document modeling and index design than around distributed partition-first architecture from the start.',
      'So operational difficulty is not absent on either side. The difference is whether the difficulty concentrates in distributed storage architecture or in application-database growth and scaling behavior.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Team Fit, and Organizational Gravity',
    paragraphs: [
      'MongoDB has enormous developer mindshare because the document model aligns well with common application development. Many teams, frameworks, SDKs, and tutorials assume a document-database mental model already. This lowers onboarding friction for product teams and internal application work.',
      'Cassandra has strong gravity in organizations with serious distributed data infrastructure needs and in teams that already think in terms of availability, replication, predictable access patterns, and cluster-scale operations. It is often chosen by infrastructure-oriented teams rather than by product teams looking for the easiest operational database to ship with next week.',
      'This often decides the issue before the benchmark debate even starts. A team that wants a flexible app database usually leans MongoDB. A team that needs distributed write-heavy resilience usually leans Cassandra.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Cassandra can fail when teams treat it like a generic query engine instead of a query-driven distributed database. Poor partition choices, bad clustering-key design, and workloads that keep asking for new access patterns can make Cassandra painful quickly. The price of its scale and availability model is modeling discipline up front.',
      'MongoDB can fail when teams treat schema flexibility as a license to avoid data modeling altogether. Poor index design, oversized documents, bad embedding and referencing decisions, and careless sharding strategy can create serious operational and performance problems. The price of flexibility is discipline in a different place.',
      'Neither system is a free lunch. Cassandra punishes unclear access patterns. MongoDB punishes undisciplined document and index design. The correct choice depends on which failure mode your workload and team are better equipped to avoid.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Cassandra when write-heavy scale and high availability across distributed infrastructure dominate the problem.',
      'Choose MongoDB when flexible documents, rich indexes, and evolving application queries dominate the problem.',
      'Prefer Cassandra when you can design around known access patterns and partition keys early.',
      'Prefer MongoDB when product development speed and schema evolution matter more than partition-first distributed design.',
      'If your workload is essentially operational app data, MongoDB is often the more natural default.',
      'If your workload is essentially distributed high-volume storage with predictable queries, Cassandra is often the more natural default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-model',
    title: 'Model a User Activity Feed',
    summary:
      'The same product feature gets modeled very differently because the databases optimize for different retrieval assumptions.',
    cassandraCode: `CREATE TABLE user_activity_by_user (
  user_id uuid,
  occurred_at timestamp,
  activity_id uuid,
  kind text,
  payload text,
  PRIMARY KEY ((user_id), occurred_at, activity_id)
) WITH CLUSTERING ORDER BY (occurred_at DESC);`,
    mongoCode: `db.userActivity.insertOne({
  userId: ObjectId('...'),
  occurredAt: new Date(),
  kind: 'purchase',
  payload: { sku: 'ABC-123', price: 49.99 }
})

db.userActivity.createIndex({ userId: 1, occurredAt: -1 })`,
    explanation:
      'The Cassandra table is explicitly designed for a very specific query: recent activity by user. The MongoDB version stays closer to a natural document model and relies on indexing to support the query efficiently.',
  },
  {
    id: 'ex-query',
    title: 'Fetch Recent Records for One Entity',
    summary:
      'Both databases can answer entity-scoped timeline queries, but one expects that path to have shaped the schema in advance.',
    cassandraCode: `SELECT occurred_at, kind, payload
FROM user_activity_by_user
WHERE user_id = 2d931510-d99f-494a-8c67-87feb05e1594
LIMIT 20;`,
    mongoCode: `db.userActivity
  .find({ userId: ObjectId('...') })
  .sort({ occurredAt: -1 })
  .limit(20)`,
    explanation:
      'In Cassandra, that query works well because the partition key and clustering order were designed for it. In MongoDB, the same query works through the document model plus an appropriate index, with more freedom to add nearby queries later.',
  },
  {
    id: 'ex-transaction',
    title: 'Coordinate a Multi-Record Update',
    summary:
      'This is one of the places where the systems reveal their different center of gravity most clearly.',
    cassandraCode: `BEGIN BATCH
  INSERT INTO orders_by_id (order_id, status) VALUES (123, 'paid');
  INSERT INTO order_events_by_id (order_id, occurred_at, kind)
  VALUES (123, toTimestamp(now()), 'paid');
APPLY BATCH;`,
    mongoCode: `session.startTransaction()

await db.collection('orders').updateOne(
  { _id: orderId },
  { $set: { status: 'paid' } },
  { session }
)

await db.collection('orderEvents').insertOne(
  { orderId, kind: 'paid', occurredAt: new Date() },
  { session }
)

await session.commitTransaction()`,
    explanation:
      'The MongoDB example reflects an application-facing transactional workflow. The Cassandra example shows batched writes, but Cassandra is not generally chosen because teams want broad relational-style transactional semantics.',
  },
  {
    id: 'ex-scale',
    title: 'Think About Horizontal Scale',
    summary:
      'The syntax is less important here than the operational mindset, but the examples make the difference concrete.',
    cassandraCode: `CREATE KEYSPACE telemetry
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'dc1': 3,
  'dc2': 3
};`,
    mongoCode: `sh.enableSharding('appdb')
sh.shardCollection('appdb.userActivity', { userId: 'hashed' })`,
    explanation:
      'Cassandra surfaces replication strategy and datacenter thinking as part of ordinary database design. MongoDB surfaces sharding as a scaling mechanism layered onto a document database that may have started life as a replica set-backed operational store.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Partition key',
    definition:
      'A Cassandra key component that determines how data is distributed across the cluster.',
  },
  {
    term: 'Clustering column',
    definition: 'A Cassandra key component that determines sort order within a partition.',
  },
  {
    term: 'Replication factor',
    definition:
      'The number of Cassandra replicas maintained for a given dataset or keyspace configuration.',
  },
  {
    term: 'Consistency level',
    definition:
      'A Cassandra read or write setting that determines how many replicas must acknowledge an operation.',
  },
  {
    term: 'Lightweight transaction',
    definition:
      'A Cassandra transaction mechanism used for narrower compare-and-set style guarantees with stronger consistency semantics.',
  },
  {
    term: 'Document',
    definition:
      'A MongoDB record made of field and value pairs, potentially containing nested documents and arrays.',
  },
  {
    term: 'Collection',
    definition:
      'A MongoDB grouping of documents, roughly analogous to a table in casual conversation though not relational in the same sense.',
  },
  {
    term: 'Replica set',
    definition:
      'A MongoDB high-availability deployment model with automatic failover and replicated data across members.',
  },
  {
    term: 'Sharding',
    definition:
      'A MongoDB horizontal scaling technique that distributes data across shards based on a shard key.',
  },
  {
    term: 'Embedding',
    definition: 'A MongoDB modeling strategy that stores related data inside the same document.',
  },
  {
    term: 'Referencing',
    definition:
      'A MongoDB modeling strategy that stores relationships between separate documents rather than nesting all data together.',
  },
  {
    term: 'Tombstone',
    definition:
      'A Cassandra deletion marker that persists until compaction and can affect read behavior if overused.',
  },
  {
    term: 'Repair',
    definition:
      'A Cassandra maintenance process used to synchronize replicas and ensure eventual consistency convergence.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-model', label: 'Data Model' },
    { id: 'core-schema', label: 'Schema and Modeling' },
    { id: 'core-query', label: 'Query Model' },
    { id: 'core-consistency', label: 'Consistency and Transactions' },
    { id: 'core-scaling', label: 'Scaling Architecture' },
    { id: 'core-replication', label: 'Replication and HA' },
    { id: 'core-indexing', label: 'Indexes and Access Paths' },
    { id: 'core-write-read', label: 'Read and Write Bias' },
    { id: 'core-transactions', label: 'Transactional Semantics' },
    { id: 'core-tooling', label: 'Operations and Tooling' },
    { id: 'core-ecosystem', label: 'Ecosystem and Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CassandraVsMongoPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={pageTitle}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Cassandra and MongoDB as real database architecture choices rather than
        as generic NoSQL labels. The point is to make the tradeoffs explicit: data model, query
        shape, consistency model, replication, scaling, indexing, transactions, and the types of
        workloads each database is actually optimized to serve.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">Cassandra</h3>
              <div className="bin98-codebox">
                <code>{example.cassandraCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">MongoDB</h3>
              <div className="bin98-codebox">
                <code>{example.mongoCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

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
