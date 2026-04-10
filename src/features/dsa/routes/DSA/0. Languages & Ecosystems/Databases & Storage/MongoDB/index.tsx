import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'MongoDB is a client-server document database built around BSON documents, flexible schemas, rich indexing, aggregation pipelines, replication, and horizontal scaling through sharding. It is often chosen when teams want a general-purpose operational database that stores nested application-shaped data without forcing every entity into a rigid relational layout first.',
  'The most useful way to think about MongoDB is not as "SQL but without tables" and not as "schema-free magic." It is a document-oriented database with its own modeling rules, query behavior, atomicity boundaries, and operational tradeoffs. The design questions move from joins and normalized tables toward document boundaries, denormalization, embedding versus referencing, index coverage, and shard-key selection.',
  'This page is intentionally thorough. It covers the document model, BSON and collections, querying and indexing, aggregation, transactions, consistency and durability controls, replication, sharding, operational habits, common use cases, pitfalls, and practical examples for day-to-day engineering decisions.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'MongoDB is a networked database server designed for shared operational data. Applications connect to it through drivers and work with JSON-like documents stored in collections. Those documents can include nested objects and arrays, which makes MongoDB attractive for data that naturally resembles application payloads, event records, user profiles, catalogs, and content objects.',
      'Unlike an embedded database such as SQLite, MongoDB is meant to run as a service. Unlike a relational system such as PostgreSQL or MySQL, MongoDB does not start from tables, rows, and foreign keys. Its primary unit is the document, and that changes how engineers think about modeling, transactions, and query design.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why MongoDB Matters',
    paragraphs: [
      'MongoDB became important because many product teams needed a database that handled evolving application data quickly, supported nested structures directly, and scaled operationally without forcing every workload through a fully normalized relational model. It also gained traction by offering a simpler path for some high-traffic web systems that wanted replication, flexible schemas, and horizontal distribution.',
      'That does not mean MongoDB is automatically simpler than relational databases. It means it solves a different set of modeling pressures well. When the document boundary matches the application boundary, MongoDB can reduce impedance mismatch and keep both reads and writes straightforward.',
    ],
    bullets: [
      'Stores nested JSON-like data naturally.',
      'Supports flexible but still intentional schema evolution.',
      'Provides indexing, replication, and sharding for production systems.',
      'Works well when document boundaries reflect real application boundaries.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a distributed document database where document shape is a first-class design decision. MongoDB is not "schemaless" in the sense of removing data modeling. It is schema-flexible. Engineers still need to decide what belongs in one document, what should be referenced elsewhere, what fields need indexes, and what query patterns the system must support under load.',
      'A practical MongoDB system is shaped around a few central questions. What is the atomic unit of change. Which reads need to be fast. Which fields define lookup and filtering patterns. Which data grows together. Which data must remain isolated to avoid oversized or unstable documents. Those are MongoDB architecture questions in the same way normalization and join strategy are relational architecture questions.',
    ],
    bullets: [
      'Think in documents, collections, and indexes.',
      'Treat document boundaries as part of correctness design.',
      'Expect denormalization when it improves hot-path reads.',
      'Plan for replication, backup, and scaling as service-level concerns.',
    ],
  },
  {
    id: 'bp-document-model',
    title: 'What the Document Model Changes',
    paragraphs: [
      'Document databases encourage keeping related information together when it is usually read or written together. A user profile can include preferences, addresses, tags, and nested settings in one record instead of across many join tables. A product can contain embedded variants, media metadata, or attributes that differ across categories without forcing a wide sparse table.',
      'This shifts complexity rather than eliminating it. Engineers gain flexibility and locality for some workloads, but they must make careful decisions about duplication, write amplification, update patterns, index shape, and how much growth a document may experience over time.',
    ],
    bullets: [
      'Embedding can reduce joins and improve read locality.',
      'Denormalization can simplify hot reads at the cost of duplication.',
      'Large or frequently changing nested arrays can create maintenance pressure.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When MongoDB Fits Best',
    paragraphs: [
      'MongoDB fits best when data is naturally hierarchical or semi-structured, when application entities evolve over time, or when teams benefit from keeping closely related state together in one document. Typical examples include content platforms, product catalogs, user profiles, event and activity streams, mobile backends, IoT metadata, personalization systems, and internal products with rapidly changing business objects.',
      'It is also a strong option when read patterns are centered on retrieving complete aggregates by ID or a small number of indexed filters rather than performing complex multi-table relational joins across highly normalized data.',
    ],
    bullets: [
      'Nested and evolving entity shapes.',
      'Application reads centered on whole aggregates or subdocuments.',
      'Operational systems that need replication and possible horizontal scaling.',
      'Teams comfortable designing document boundaries explicitly.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where MongoDB Is Not the Best Default',
    paragraphs: [
      'MongoDB is not the best default when the workload is fundamentally relational, heavily join-oriented, or strongly constrained by cross-entity integrity rules that must live in the database. Systems with rich reporting queries over many normalized relationships often fit better in a relational engine.',
      'It is also not ideal when teams hear "schema-flexible" and treat that as permission to stop modeling. Uncontrolled document shape, missing indexes, and ad hoc query design can make MongoDB systems harder to evolve than well-structured relational systems.',
    ],
    bullets: [
      'Highly relational data with frequent multi-entity joins.',
      'Workloads dominated by cross-table analytical SQL patterns.',
      'Teams that want to avoid data modeling rather than change its form.',
      'Small local-only data problems better served by embedded storage.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'MongoDB is most effective when document shape mirrors real application shape, query patterns are understood early, and indexes are designed around actual production access paths. Its strengths appear when modeling choices are deliberate, not when structure is ignored.',
      'The important engineering question is not whether MongoDB is "better than SQL." The real question is whether the document model, atomicity model, and operational scaling story match the workload better than relational alternatives do.',
    ],
    bullets: [
      'Choose MongoDB for document-shaped operational data, not as a default replacement for every database.',
      'Treat schema design, indexing, and shard-key choices as first-class architecture decisions.',
      'Use flexibility to model change well, not to defer all discipline.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What MongoDB Actually Is',
    paragraphs: [
      'MongoDB is a document database server that stores BSON documents in collections. Clients use drivers to insert, update, query, aggregate, and delete documents. The system supports indexes, replication, transactions, sharding, change streams, and operational tooling needed for serious production deployment.',
      'It is important to emphasize that MongoDB is not merely a storage format. It is a database engine with its own concurrency behavior, durability controls, query planner, replication model, and scaling mechanisms. Understanding those mechanics matters more than memorizing syntax alone.',
    ],
  },
  {
    id: 'core-bson',
    title: 'BSON, Documents, and Rich Value Types',
    paragraphs: [
      'MongoDB stores data as BSON, a binary representation of JSON-like documents. BSON supports nested objects, arrays, strings, numbers, booleans, dates, binary data, ObjectIds, decimals, and more. This richer type model helps MongoDB represent application entities directly while still supporting efficient storage and query execution.',
      'Because the primary storage unit is a document, a single record can contain significant structure. That is convenient, but it also means document size and update behavior matter. The database does not remove the need for modeling discipline just because the record can hold more shape.',
    ],
  },
  {
    id: 'core-collections',
    title: 'Collections and Schema Design',
    paragraphs: [
      'A MongoDB collection is roughly analogous to a table, but it does not require every document to share exactly the same fields. In well-designed systems, collections still develop consistent shapes, conventions, and validation rules. Production MongoDB succeeds when teams keep document structures intentional rather than allowing every caller to invent a new payload format.',
      'Schema design in MongoDB is about deciding which fields are stable, which are optional, which are nested, and how to evolve them over time. Schema validation can enforce part of this contract, and disciplined application code should enforce the rest.',
    ],
    bullets: [
      'Prefer a stable conceptual schema even when some fields are optional.',
      'Use validation and conventions to prevent uncontrolled drift.',
      'Design documents around real lifecycle and access patterns.',
    ],
  },
  {
    id: 'core-embedding',
    title: 'Embedding Versus Referencing',
    paragraphs: [
      'One of the central MongoDB decisions is whether to embed related data inside one document or reference it from another collection. Embedding improves locality and supports atomic single-document updates. Referencing reduces duplication and can be safer when related data grows independently or is shared broadly across many entities.',
      'There is no universal rule. Embed when the child data belongs strongly to the parent and is usually read together. Reference when the child data is large, reused, independently queried, or grows in ways that would destabilize the parent document.',
    ],
    bullets: [
      'Embed tightly coupled data read together on hot paths.',
      'Reference large, shared, or independently evolving entities.',
      'Watch for unbounded arrays and documents that grow unpredictably.',
    ],
  },
  {
    id: 'core-indexes',
    title: 'Indexes and Query Shape',
    paragraphs: [
      'Indexes are critical in MongoDB because flexible documents do not remove the cost of search. Without the right indexes, the server still scans too much data. MongoDB supports single-field, compound, multikey, text, geospatial, hashed, sparse, partial, and TTL indexes, each suited to different access patterns.',
      'The practical rule is straightforward: indexes must be designed for the filters, sorts, and lookup patterns the application actually uses. Compound index order matters. Array fields create multikey behavior. Every additional index improves some reads while increasing write cost and operational maintenance.',
    ],
    bullets: [
      'Build indexes around real production queries, not speculation.',
      'Remember that compound index field order changes usefulness.',
      'Treat index count as a write-path tradeoff, not a free optimization.',
    ],
  },
  {
    id: 'core-query-model',
    title: 'Query Model and Operators',
    paragraphs: [
      'MongoDB queries use document-style predicates rather than SQL. Filters can match nested fields, array membership, ranges, logical combinations, and special operators. This style can be expressive and concise when data is document-shaped, especially for nested structures that would require multiple tables elsewhere.',
      'At the same time, engineers should avoid treating the query model as magically forgiving. Query shape, index compatibility, and cardinality still determine performance. The fact that a query is easy to write does not mean it is cheap to execute.',
    ],
  },
  {
    id: 'core-updates',
    title: 'Update Operators and Partial Mutation',
    paragraphs: [
      'MongoDB supports partial document updates through operators such as `$set`, `$inc`, `$push`, `$pull`, `$unset`, and positional array updates. This is one of its practical strengths because applications often need to mutate a nested field or append to an array without rewriting an entire document through the client.',
      'Those features are powerful, but update complexity rises quickly when nested arrays become large or when multiple writers modify different parts of the same document concurrently. Good document boundaries keep these updates manageable.',
    ],
  },
  {
    id: 'core-aggregation',
    title: 'Aggregation Pipeline',
    paragraphs: [
      'MongoDB includes an aggregation pipeline for data transformation, filtering, grouping, projection, and reshaping. Pipeline stages such as `$match`, `$project`, `$group`, `$sort`, `$lookup`, `$unwind`, and `$facet` allow the server to perform sophisticated document processing without moving raw data into application code first.',
      'The aggregation framework is one of MongoDBs most important capabilities. It reduces the gap between simple document queries and richer server-side processing. Still, teams should remember that expressive pipelines can become expensive, so indexing and pipeline stage order remain important.',
    ],
  },
  {
    id: 'core-atomicity',
    title: 'Atomicity Model and Transactions',
    paragraphs: [
      'MongoDB guarantees atomicity at the single-document level. That means updates to one document happen as a unit, which is one reason document boundary design matters so much. If related state fits naturally into one document, many workflows become simpler because they do not need multi-document transactional coordination.',
      'MongoDB also supports multi-document transactions, especially for cases where correctness spans multiple collections or documents. They are useful and sometimes necessary, but the best MongoDB designs still try to preserve single-document atomicity for common hot-path operations when that matches the domain.',
    ],
  },
  {
    id: 'core-consistency',
    title: 'Read Concern, Write Concern, and Durability',
    paragraphs: [
      'MongoDB exposes tunable consistency and durability settings through concepts such as read concern and write concern. These settings control how much acknowledgement a write requires and what level of visibility or isolation a read expects. They matter because distributed systems always involve tradeoffs among latency, durability, and consistency under failure.',
      'Teams should understand the guarantees their application actually needs. A system that cannot tolerate acknowledged write loss should not choose weak durability settings accidentally. A system that needs fresh reads after writes should know whether it is reading from the primary or a lagging secondary.',
    ],
  },
  {
    id: 'core-replica-sets',
    title: 'Replica Sets and High Availability',
    paragraphs: [
      'MongoDB uses replica sets for redundancy and failover. A replica set has a primary node that accepts writes and secondaries that replicate its operations. If the primary fails, an election can choose a new primary. This provides availability and operational resilience for production systems.',
      'Replica sets also affect read architecture. Some workloads read from secondaries to reduce primary load, but that choice introduces freshness tradeoffs. Engineers should know whether a feature can tolerate replication lag before enabling those read patterns.',
    ],
  },
  {
    id: 'core-sharding',
    title: 'Sharding and Horizontal Scale',
    paragraphs: [
      'MongoDB supports sharding to distribute data across multiple nodes. Sharding can unlock scale for datasets or write volumes that exceed a single machine, but it introduces additional design complexity. The shard key influences data distribution, query routing, hotspot risk, and operational behavior.',
      'Poor shard-key selection can create severe imbalance or route too many queries inefficiently. Good sharding design starts from access patterns and data distribution, not from a vague desire to be "web scale."',
    ],
    bullets: [
      'Choose shard keys based on real cardinality and routing behavior.',
      'Avoid keys that create hotspots or force scatter-gather queries.',
      'Treat sharding as an architecture commitment, not a cosmetic scaling checkbox.',
    ],
  },
  {
    id: 'core-change-streams',
    title: 'Change Streams and Event-Driven Integration',
    paragraphs: [
      'MongoDB change streams allow applications to observe data changes in near real time. This is useful for cache invalidation, reactive processing, search indexing pipelines, audit flows, and event-driven integrations where application code wants to respond to writes without polling constantly.',
      'Change streams are operationally powerful, but they should complement sound system design rather than replace it. They are best used when consumers understand delivery semantics, failure handling, and downstream idempotency.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations, Monitoring, and Maintenance',
    paragraphs: [
      'Healthy MongoDB operations require monitoring query latency, index usage, replication status, lock and resource behavior, storage growth, backup freshness, oplog posture, and cluster balance when sharding is enabled. Managed services reduce some effort, but they do not remove the need to understand workload shape.',
      'Operational database quality usually degrades gradually. Symptoms include slow queries, collection scans, replication lag, oversized documents, and skewed shard distribution. Teams that review these signals early avoid emergency migrations later.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'MongoDB performance work usually depends on a few fundamentals: sensible document boundaries, correct indexes, predictable query shapes, careful aggregation design, controlled document growth, and realistic read versus write tradeoffs. Most problems are not mysterious. They usually trace back to a modeling or indexing mismatch.',
      'The strongest habit is empirical verification. Inspect explain plans, measure hot endpoints, understand array growth, and test write amplification. Flexible data models still demand disciplined performance analysis.',
    ],
    bullets: [
      'Run explain plans on important queries and pipelines.',
      'Prevent unbounded array growth in hot documents.',
      'Keep index count aligned with write throughput needs.',
      'Model for common access paths rather than theoretical elegance.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Strong Use Cases',
    paragraphs: [
      'MongoDB is strong for product catalogs, user profiles, content systems, metadata platforms, session-like operational data, event capture with flexible payloads, mobile app backends, personalization records, and services where aggregates are naturally document-shaped.',
      'It is especially effective when a single request often needs one entity and its nested data together, and when the schema evolves incrementally as the product grows.',
    ],
    bullets: [
      'Catalog and content systems with variable attributes.',
      'User-centered aggregates such as profiles, settings, and preferences.',
      'Operational event and activity records with semi-structured payloads.',
      'Applications that benefit from replication and possible sharding.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'Weak Use Cases',
    paragraphs: [
      'MongoDB is a weaker fit when the workload depends on relational joins across many highly normalized entities, when transactional integrity across many records is the dominant concern, or when the query language and reporting pattern are already fundamentally SQL-centric.',
      'It is also a poor fit when a team wants to avoid making modeling decisions. Document databases reward good modeling just as relational systems do, but the mistakes surface differently.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'The most common MongoDB failures are not exotic distributed-systems mistakes. They are usually simple architectural errors repeated at scale: documents that grow without bound, array-heavy structures that become hard to update, missing compound indexes, uncontrolled schema drift, and using `$lookup` to simulate a relational design that should probably have stayed relational.',
      'Another common pitfall is underestimating operational complexity once replication, backups, and sharding enter the picture. MongoDB can scale well, but distributed operations always cost engineering attention.',
    ],
    bullets: [
      'Treating schema flexibility as schema absence.',
      'Embedding data that should have been referenced.',
      'Referencing everything and losing document-locality benefits.',
      'Ignoring explain plans and relying on intuition for indexing.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Comparing MongoDB with Relational Systems',
    paragraphs: [
      'Compared with relational systems, MongoDB usually favors document locality, nested data, and flexible schema evolution, while relational databases usually favor normalized structure, stronger built-in relational constraints, and SQL-based joins and reporting. Neither model is universally superior. They optimize different design pressures.',
      'If your system is fundamentally built around aggregates and document reads, MongoDB can feel natural and efficient. If the system revolves around deeply relational consistency and complex cross-entity querying, a relational engine is often the cleaner foundation.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Guide',
    paragraphs: [
      'A good MongoDB decision starts by mapping the domain into document boundaries and expected query paths. Ask whether most important reads are by aggregate, whether nested structure is natural, whether schema evolves frequently, and whether denormalization is acceptable where it helps.',
      'Then ask the operational questions: will the team manage replica sets well, do read and write concerns match business guarantees, and if sharding is likely, is there a shard key with healthy long-term distribution. If those answers are strong, MongoDB is often a serious candidate.',
    ],
    bullets: [
      'Need document-shaped aggregates and flexible schema evolution: strong MongoDB signal.',
      'Need rich relational joins and strict cross-entity constraints: weak MongoDB signal.',
      'Need horizontal distribution with document-aware routing: possible MongoDB advantage.',
      'Need local embedded persistence: weak MongoDB signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-document',
    title: 'Document Model for a User Profile',
    description: [
      'This example shows a document-shaped aggregate where related data is usually read together. The profile contains nested preferences and an array of saved addresses in one record.',
      'The point is not to avoid structure. The point is to keep a natural aggregate together when that matches the application boundary.',
    ],
    code: `db.users.insertOne({
  email: "sam@example.com",
  plan: "pro",
  preferences: {
    theme: "light",
    notifications: {
      email: true,
      sms: false
    }
  },
  addresses: [
    { label: "home", city: "Cairo", country: "EG" },
    { label: "office", city: "Alexandria", country: "EG" }
  ],
  createdAt: new Date()
})`,
    notes: [
      'Embedding is useful when nested data belongs strongly to the parent record.',
      'Keep an eye on array growth and update frequency for embedded collections.',
    ],
  },
  {
    id: 'examples-index',
    title: 'Compound Index for an Orders Query',
    description: [
      'Indexes should match repeated application questions. This example supports recent orders for one customer using a compound index.',
      'MongoDB benefits from the same basic discipline as any other database: index for the queries that matter, not for vague future possibilities.',
    ],
    code: `db.orders.createIndex({ customerId: 1, createdAt: -1 })

db.orders.find(
  { customerId: 42 },
  { totalCents: 1, status: 1, createdAt: 1 }
).sort({ createdAt: -1 }).limit(20)`,
    notes: [
      'Compound index field order matters.',
      'Indexes improve reads but add write overhead and storage cost.',
    ],
  },
  {
    id: 'examples-aggregation',
    title: 'Aggregation Pipeline for Revenue by Status',
    description: [
      'The aggregation pipeline lets MongoDB filter, reshape, and summarize data on the server. That keeps data movement lower and centralizes repeated transformation logic.',
      'Pipeline stage order still matters, especially when early filters can reduce the amount of data processed downstream.',
    ],
    code: `db.orders.aggregate([
  { $match: { createdAt: { $gte: ISODate("2026-01-01T00:00:00Z") } } },
  {
    $group: {
      _id: "$status",
      orderCount: { $sum: 1 },
      revenueCents: { $sum: "$totalCents" }
    }
  },
  { $sort: { revenueCents: -1 } }
])`,
    notes: [
      'Push selective filtering early in the pipeline when possible.',
      'Aggregation power does not remove the need for good indexes on matching stages.',
    ],
  },
  {
    id: 'examples-update',
    title: 'Partial Update with Nested Fields',
    description: [
      'Partial mutation is one of MongoDBs practical strengths. Applications can update nested fields without replacing the whole document in client code.',
      'This works well when document boundaries remain stable and update frequency is understood.',
    ],
    code: `db.users.updateOne(
  { email: "sam@example.com" },
  {
    $set: {
      "preferences.notifications.email": false,
      updatedAt: new Date()
    },
    $inc: { profileVersion: 1 }
  }
)`,
    notes: [
      'Update operators reduce application-side rewrite overhead.',
      'Nested updates become harder to reason about when documents are too large or too volatile.',
    ],
  },
  {
    id: 'examples-transaction',
    title: 'Multi-Document Transaction',
    description: [
      'MongoDB supports transactions when correctness spans multiple documents or collections. They are useful, but they should not erase the value of modeling around single-document atomicity where that is natural.',
      'This example shows a transfer recorded across accounts and ledger entries in one session transaction.',
    ],
    code: `const session = client.startSession()

try {
  session.startTransaction()

  await db.collection("accounts").updateOne(
    { _id: "acct-a" },
    { $inc: { balanceCents: -5000 } },
    { session }
  )

  await db.collection("accounts").updateOne(
    { _id: "acct-b" },
    { $inc: { balanceCents: 5000 } },
    { session }
  )

  await db.collection("ledger").insertOne(
    { from: "acct-a", to: "acct-b", amountCents: 5000, createdAt: new Date() },
    { session }
  )

  await session.commitTransaction()
} catch (error) {
  await session.abortTransaction()
}`,
    notes: [
      'Transactions are available, but document-boundary design still matters.',
      'Use transactions when business correctness truly spans multiple documents.',
    ],
  },
  {
    id: 'examples-sharding',
    title: 'Sharding-Oriented Collection Design',
    description: [
      'Sharding is not just a deployment switch. It changes how data distribution and query routing behave. A shard key must reflect real cardinality and query access paths.',
      'This example sketches an events collection keyed by tenant and time-oriented identifiers for multi-tenant routing.',
    ],
    code: `sh.enableSharding("app")

db.events.createIndex({ tenantId: 1, eventId: 1 })

sh.shardCollection("app.events", {
  tenantId: 1,
  eventId: 1
})`,
    notes: [
      'Shard keys should reduce hotspots and support routing for common queries.',
      'Choosing a shard key too late is usually more painful than choosing it carefully early.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-document',
    title: 'Document Model Terms',
    terms: [
      {
        term: 'BSON',
        definition:
          'The binary document format used by MongoDB to represent JSON-like records with additional data types.',
      },
      {
        term: 'Document',
        definition:
          'The primary storage unit in MongoDB, containing fields, nested objects, and arrays as one logical record.',
      },
      {
        term: 'Collection',
        definition:
          'A grouping of related documents, similar in broad purpose to a table but not requiring identical shape for every record.',
      },
      {
        term: 'Embedding',
        definition:
          'A modeling approach where related child data is stored directly inside a parent document.',
      },
      {
        term: 'Referencing',
        definition:
          'A modeling approach where related data is stored in separate documents and linked through identifiers.',
      },
    ],
  },
  {
    id: 'glossary-query',
    title: 'Query and Performance Terms',
    terms: [
      {
        term: 'Compound Index',
        definition:
          'An index covering multiple fields where field order influences which filters and sorts it can support efficiently.',
      },
      {
        term: 'Multikey Index',
        definition:
          'An index created on an array field so MongoDB can index the elements within that array.',
      },
      {
        term: 'Aggregation Pipeline',
        definition:
          'A server-side sequence of processing stages used to transform, group, filter, and reshape documents.',
      },
      {
        term: 'Explain Plan',
        definition:
          'A report describing how MongoDB intends to execute a query or aggregation, often used to validate index usage.',
      },
      {
        term: 'Single-Document Atomicity',
        definition:
          'The guarantee that updates to one document occur as one indivisible operation.',
      },
    ],
  },
  {
    id: 'glossary-distributed',
    title: 'Distributed Operations Terms',
    terms: [
      {
        term: 'Replica Set',
        definition:
          'A group of MongoDB nodes that replicate data and provide failover through primary election.',
      },
      {
        term: 'Primary',
        definition:
          'The replica-set member that accepts writes and coordinates the main authoritative write stream.',
      },
      {
        term: 'Secondary',
        definition:
          'A replica-set member that copies operations from the primary and may serve some read workloads depending on configuration.',
      },
      {
        term: 'Shard Key',
        definition:
          'The field or field combination used to distribute documents across shards in a sharded cluster.',
      },
      {
        term: 'Write Concern',
        definition:
          'The durability acknowledgement level MongoDB requires before reporting a write as successful.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="postgres-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

export default function MongoDbPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'MongoDB',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="MongoDB"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">MongoDB</h1>
      <p className="postgres-help-doc-subtitle">
        Document database reference covering BSON, schema design, indexes, aggregation,
        transactions, replica sets, sharding, and operational tradeoffs.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
