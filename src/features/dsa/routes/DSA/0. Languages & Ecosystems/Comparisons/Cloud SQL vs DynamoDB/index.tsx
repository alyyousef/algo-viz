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
  cloudSqlCode: string
  dynamoCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Cloud SQL vs DynamoDB'
const pageSubtitle =
  'Comparing a managed relational database service with a serverless key-value and document database.'
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
      'Cloud SQL and DynamoDB are not two cloud-branded databases competing to solve the same problem. Cloud SQL is Google Clouds managed relational database service for engines such as PostgreSQL, MySQL, and SQL Server. It gives you a familiar SQL database model with managed backups, maintenance, high availability options, and operational automation. DynamoDB is AWSs fully managed key-value and document database. It is designed around very low-latency access at scale, serverless operation, and table design driven by access patterns rather than relational joins.',
      'A useful shorthand is this: Cloud SQL is for teams that want a traditional relational database without self-managing the database servers, while DynamoDB is for teams that want a highly scalable NoSQL operational store whose data model is shaped around keys, items, and carefully planned query patterns. Both are managed cloud databases. The practical decision is whether your workload wants SQL and relational semantics or a serverless non-relational design optimized for predictable access patterns and elastic scale.',
      'That means the real question is not Which managed database is better. The real question is whether your application is naturally relational, transactional, and query-rich, or whether it is naturally key-driven, denormalized, and built to leverage DynamoDB style partitioning and horizontal scale.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Cloud SQL is built around managed infrastructure for existing relational engines. Google explicitly frames Cloud SQL as a fully managed database service that helps you set up, maintain, manage, and administer your relational databases on Google Cloud. The important point is that the service model is managed, but the database model is still the familiar relational model. Tables, joins, schemas, transactions, indexes, and SQL remain the center of gravity.',
      'DynamoDB is built around a very different assumption. AWS documentation describes it as a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. The center of gravity is not relational modeling. It is table design around partition keys, sort keys, access patterns, secondary indexes, and predictable low-latency operations. You do not normally ask DynamoDB to behave like PostgreSQL. You ask it to serve a specific NoSQL workload shape extremely well.',
      'This is why Cloud SQL often feels like familiar database administration without the infrastructure burden, while DynamoDB often feels like a specialized application architecture choice. Cloud SQL manages a classic database model. DynamoDB asks you to design around a different model altogether.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Cloud SQL is strongest when the application wants a relational system of record. It is a natural fit for transactional backends, admin systems, line-of-business software, SaaS applications with structured relationships, reporting queries, ORM-driven services, and systems that benefit from standard SQL features. It is also attractive when the team already knows PostgreSQL or MySQL well and wants to keep that mental model while offloading routine operations to the cloud provider.',
      'DynamoDB is strongest when the workload is already shaped around key-based access patterns, very high request rates, elastic scale, and denormalized records. It is especially strong for user-session data, request metadata, event metadata, carts, game state, leaderboards, high-scale profiles, and applications where predictable low-latency point reads and writes matter more than rich relational queries. It is also attractive when the team wants a database that feels operationally close to serverless infrastructure rather than to a classic managed database server.',
      'If the core question is Which service should back an ordinary transactional product database, Cloud SQL is often the more natural answer. If the core question is Which service should back a very high-scale application data store designed around partition keys and item access, DynamoDB is often the better fit.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Cloud SQL when the data model is relational and SQL is central to the application.',
      'Choose DynamoDB when the data model is key-based or document-shaped and query patterns are known ahead of time.',
      'Choose Cloud SQL when joins, foreign keys, transactions, and mature relational tooling matter most.',
      'Choose DynamoDB when horizontal scale, serverless operations, and predictable access-path design matter most.',
      'If the debate is really relational model versus key-value and document model, that is the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Cloud SQL is a managed relational database service',
    detail:
      'The provider manages much of the infrastructure, but you are still working with normal relational database concepts and engine-specific behavior.',
  },
  {
    title: 'DynamoDB is a serverless NoSQL platform',
    detail:
      'Its core abstraction is a table of items accessed through keys and indexes, not a joined relational schema.',
  },
  {
    title: 'Cloud SQL starts from data relationships',
    detail:
      'You usually model entities, constraints, and transactions first, then optimize queries with indexes and schema design.',
  },
  {
    title: 'DynamoDB starts from access patterns',
    detail:
      'You usually identify the exact reads and writes the application needs, then shape the table and indexes around those patterns.',
  },
  {
    title: 'Transactions mean different things here',
    detail:
      'Cloud SQL inherits mature ACID semantics from relational engines. DynamoDB supports transactions, but transactions are not the databases primary architectural identity.',
  },
  {
    title: 'Scale is obtained in different ways',
    detail:
      'Cloud SQL scales like a managed relational instance with replicas and instance sizing, while DynamoDB scales through a service-native distributed architecture.',
  },
  {
    title: 'Operational burden does not disappear, it moves',
    detail:
      'Cloud SQL reduces database administration work. DynamoDB removes many server-style concerns but demands stricter data-model discipline around partitions and indexes.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-model',
    title: 'Data Model and Core Shape',
    paragraphs: [
      'Cloud SQL gives you a classic relational model because the underlying engines are relational engines. You define schemas, tables, rows, columns, indexes, constraints, and relationships. Queries can join data across tables, aggregate across sets, and express business logic using mature SQL features. This makes Cloud SQL a natural extension of existing application and enterprise database practices rather than a new storage paradigm.',
      'DynamoDB uses tables and items too, but the terms do not mean the same thing they mean in a relational database. AWS documents the core components as tables, items, and attributes, with primary keys based on partition keys and optionally sort keys. The modeling pressure is therefore very different. You are not using tables as normalized relation sets to be joined later. You are using tables as structures that should serve known access patterns efficiently and predictably.',
      'A practical framing is this: Cloud SQL models the world as related data with query flexibility. DynamoDB models the world as access paths over distributed items. One starts from data relationships. The other starts from request paths.',
    ],
  },
  {
    id: 'core-query',
    title: 'Query Model and Access Pattern Assumptions',
    paragraphs: [
      'Cloud SQL is designed for rich querying. Complex filtering, joins, grouping, ordering, transactions, subqueries, views, and engine-specific SQL capabilities are part of its natural surface area. This matters because application requirements often grow. A product team may begin with simple CRUD and then need reporting, search-like filtering, cross-entity joins, or analytical summaries. Relational databases absorb much of that growth naturally.',
      'DynamoDB is much less about broad query expressiveness and much more about predictable access paths. The database works best when the application knows how it will read and write data and can shape partition keys, sort keys, and indexes accordingly. If teams keep expecting ad hoc relational-style querying later, DynamoDB becomes painful quickly because the model was never designed around arbitrary query flexibility.',
      'This is why Cloud SQL is often the safer default for uncertain product requirements, while DynamoDB is often the stronger choice when the workload shape is already well understood and can be mapped to a small set of very efficient access patterns.',
    ],
  },
  {
    id: 'core-schema',
    title: 'Schema Discipline and Evolution',
    paragraphs: [
      'Cloud SQL requires schema design, but the discipline is familiar. Teams evolve schemas with migrations, add indexes, refine constraints, and normalize or denormalize as the application grows. The presence of a rigid schema is often an advantage because it makes data contracts explicit and helps preserve integrity across multiple writers and application versions.',
      'DynamoDB is commonly described as schema-flexible because items in a table do not need the same attribute set. But schema flexibility at the item level does not remove the need for serious design discipline. In practice, the hard part is choosing keys and indexes correctly, because changing those decisions later is more expensive than adding a column to a relational table. The database is flexible in record shape, but strict in access-path consequences.',
      'So both systems need rigor. Cloud SQL asks for explicit relational schema evolution. DynamoDB asks for explicit access-pattern evolution. The kind of discipline differs, but the need for discipline is equally real.',
    ],
  },
  {
    id: 'core-consistency',
    title: 'Consistency, Transactions, and Correctness Guarantees',
    paragraphs: [
      'Cloud SQL inherits the transactional semantics of its relational engines. That means the usual ACID expectations are front and center. Multi-statement transactions, constraints, rollbacks, isolation behavior, and relational integrity are normal parts of application design. If a workflow needs to update several related records atomically, Cloud SQL is operating on familiar ground.',
      'DynamoDB also supports strong consistency options and transactions, but the way you reason about correctness is different. AWS documents eventual consistency for default reads in some cases, optional strongly consistent reads for certain operations, and transactional APIs for groups of actions. Those are valuable capabilities, yet the service still expects you to think in terms of item access, conditional writes, idempotency, and careful key design rather than relational integrity through joins and constraints.',
      'This is not a story of one database having correctness and the other not. It is a story of where correctness lives. In Cloud SQL, correctness often lives naturally in the relational engine. In DynamoDB, correctness often lives in a combination of item-level design, conditional operations, and application-level modeling choices.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Model and Throughput Shape',
    paragraphs: [
      'Cloud SQL scales like a managed relational service. You choose instance sizes, storage characteristics, networking configuration, high availability settings, and read replicas where applicable. Scaling is real, but it still feels like scaling a managed database engine. That often means vertical scaling, replica strategies, connection management, and careful understanding of engine-specific performance bottlenecks.',
      'DynamoDB is fundamentally a distributed managed service built to scale elastically. AWS presents it as serverless and capable of handling very large workloads, with capacity modes such as on-demand and provisioned throughput. The design pressure therefore shifts away from instance sizing and toward table design, partition behavior, hot keys, and index strategy. You are operating at a service model level rather than at a managed engine instance level.',
      'That difference matters because teams sometimes say they need scale when they really need relational convenience, or they say they need SQL when they really need a service that can absorb highly elastic request traffic. The right answer depends on what kind of scaling problem the application actually has.',
    ],
  },
  {
    id: 'core-availability',
    title: 'High Availability and Failure Handling',
    paragraphs: [
      'Cloud SQL supports high availability configurations. Google documents HA as involving a primary instance and a standby in another zone within a region. This is valuable because it gives teams managed failover and reduced operational burden for production relational databases. But the architecture still feels like managed database infrastructure. You are thinking in terms of instances, failover, maintenance, and replicas.',
      'DynamoDB availability is much more native to the product identity. Because it is a regional managed service with distributed storage behavior built into the service itself, the availability conversation often feels less like managing a specific database instance topology and more like trusting a provider-managed distributed system. Your operational responsibility is less about failover mechanics and more about table design, capacity behavior, and request correctness.',
      'So the products differ not only in whether they are available, but in what operational story availability belongs to. Cloud SQL high availability is managed database HA. DynamoDB availability is part of the service abstraction itself.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexes and Access Paths',
    paragraphs: [
      'Cloud SQL indexes work the way most database developers expect. You add indexes to support queries, watch execution plans, manage tradeoffs between write cost and read performance, and use the database optimizer to help the engine choose good execution strategies. Indexes exist within a broad query language that can often be refined later as requirements change.',
      'DynamoDB indexes are more foundational to the table design itself. Global secondary indexes and local secondary indexes are not merely performance hints on top of a relational model. They are alternate access paths that you often plan from the beginning because they determine whether certain queries are practical at all. A missing index in DynamoDB is not always a slower query. It can be an impossible query in the desired shape.',
      'This is one of the clearest decision boundaries. If the product needs broad exploratory querying over structured relations, Cloud SQL is usually more natural. If the product needs a few extremely efficient and well-defined access paths over high-scale items, DynamoDB can be the stronger fit.',
    ],
  },
  {
    id: 'core-joins',
    title: 'Relationships, Joins, and Denormalization Pressure',
    paragraphs: [
      'Cloud SQL is comfortable with relationships. Foreign keys, join tables, one-to-many relations, many-to-many relations, and normalized schemas are ordinary design tools. That matters because many business systems are inherently relational. Orders belong to users, line items belong to orders, organizations own projects, projects contain tasks, and so on. The relational model maps these ideas directly and cleanly.',
      'DynamoDB does not want to solve that problem in the same way. It usually pushes teams toward denormalized items, composite keys, duplicated data for efficient reads, and access-pattern-oriented item collections. That is not a weakness when the workload fits it. It is a deliberate trade. But it does mean that teams expecting joins later often discover they chose the wrong tool.',
      'A useful heuristic is this: if the application domain itself is strongly relational, Cloud SQL starts from the shape of the problem. If the application domain can be reorganized into denormalized item access without pain, DynamoDB becomes much more plausible.',
    ],
  },
  {
    id: 'core-latency',
    title: 'Latency Profile and Request Expectations',
    paragraphs: [
      'Cloud SQL can be fast, but its performance profile is still that of a managed relational database engine. Query complexity, join cost, index quality, lock behavior, connection overhead, and engine tuning all affect latency. The benefit is expressive power. The cost is that high performance still depends on understanding relational database behavior well.',
      'DynamoDB is designed around low-latency key-based access. AWS explicitly markets it for high-performance applications at scale. This becomes very attractive when the application mostly needs point reads, writes, conditional updates, and tightly defined item lookups. If your most important promise is that a known key lookup should stay fast under huge load, DynamoDB is built for that story.',
      'The distinction is therefore not simply Fast versus Slow. It is predictable low-latency key access versus expressive relational querying. The more the workload leans toward the former, the more DynamoDB shines. The more it leans toward the latter, the more Cloud SQL remains compelling.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operations, Capacity Planning, and Day-2 Work',
    paragraphs: [
      'Cloud SQL reduces a large amount of database operations work, but it does not remove the need for database engineering. Teams still need to think about schema design, query plans, slow queries, storage growth, connection pooling, failover strategy, maintenance windows, and engine-specific tuning. The operational work is lighter than self-hosting, but the relational database mindset remains important.',
      'DynamoDB removes many traditional database server concerns because there are no instances to patch or clusters to tune in the same ordinary sense. But the operational difficulty shifts into modeling discipline. Teams must understand partition distribution, hot partitions, conditional write patterns, index choices, throughput mode, and how usage patterns interact with cost. That is a different kind of operational work, not an absence of operational work.',
      'This is why some teams underestimate DynamoDB. It looks operationally simple because the infrastructure is abstracted away. In reality, the complexity moved up into application data design. Cloud SQL keeps more of the classic database shape visible. DynamoDB hides the servers but demands stronger design honesty about access patterns.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Ecosystem, and Developer Fit',
    paragraphs: [
      'Cloud SQL fits neatly into the huge ecosystem of relational tooling. ORMs, migration frameworks, BI tools, admin tools, backup habits, SQL clients, replication concepts, and developer knowledge all transfer relatively easily. This matters in organizations where many engineers, analysts, and operations teams already know SQL deeply.',
      'DynamoDB fits more naturally into application code and AWS-native architectures than into generic database tooling culture. It works especially well when the team is already comfortable with AWS SDK usage, infrastructure-as-code, and application-layer data access patterns tailored to DynamoDB tables. The ecosystem is mature, but the ergonomics are closer to building against a service API than against a general-purpose database language.',
      'So the question is not which product has tooling. Both do. The question is whether your organization benefits more from the broad compatibility and familiarity of relational tooling or from the cloud-service-native ergonomics of a highly managed NoSQL store.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Cloud SQL can become the wrong choice when teams expect relational convenience to scale without relational consequences. Very large traffic, poor indexing, expensive joins, lock-heavy workloads, or weak connection management can create familiar database pain. The platform is managed, but the database behavior is still real. Cloud SQL does not magically remove the cost of complex relational workloads.',
      'DynamoDB can become the wrong choice when teams treat it like a generic database they can query later however they want. Poor partition-key choices, missing index plans, hot keys, overuse of scans, and attempts to recover relational behavior in application code can make the system awkward and expensive. DynamoDB punishes uncertainty about access patterns much more aggressively than relational databases do.',
      'Neither product is universally easier. Cloud SQL punishes workloads that outgrow comfortable relational-instance patterns. DynamoDB punishes workloads that were never truly key-value or document access problems. The right choice depends on which failure mode is less likely for your application and team.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Cloud SQL when SQL, relations, and transactional workflows are central to the system.',
      'Choose DynamoDB when the workload is naturally item-based, key-driven, and highly scalable.',
      'Prefer Cloud SQL when evolving queries and joins are likely to matter later.',
      'Prefer DynamoDB when the important access patterns are already known and can be modeled directly.',
      'Prefer Cloud SQL when broad database familiarity and tooling compatibility matter.',
      'Prefer DynamoDB when serverless operations and predictable low-latency item access matter more than relational flexibility.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-user-order',
    title: 'Store Users and Orders',
    summary:
      'The same domain looks relational in one system and denormalized or access-pattern-shaped in the other.',
    cloudSqlCode: `CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  total_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
    dynamoCode: `{
  "PK": "USER#42",
  "SK": "PROFILE",
  "email": "ada@example.com"
}

{
  "PK": "USER#42",
  "SK": "ORDER#2026-03-20T14:10:00Z#9001",
  "totalCents": 2599
}`,
    explanation:
      'Cloud SQL expresses the relationship directly with separate tables and a foreign key. DynamoDB often models the same domain by colocating related items under a shared partition key so the required access path is efficient.',
  },
  {
    id: 'ex-query',
    title: 'Fetch Recent Orders for a User',
    summary:
      'One system uses SQL over related rows. The other uses a key-conditioned query designed ahead of time.',
    cloudSqlCode: `SELECT id, total_cents, created_at
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 20;`,
    dynamoCode: `await dynamoDb.query({
  TableName: 'app',
  KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
  ExpressionAttributeValues: {
    ':pk': 'USER#42',
    ':prefix': 'ORDER#',
  },
  ScanIndexForward: false,
  Limit: 20,
})`,
    explanation:
      'Cloud SQL can express the request naturally with SQL. DynamoDB can answer it efficiently too, but only because the key design already anticipated that exact access pattern.',
  },
  {
    id: 'ex-transaction',
    title: 'Update Inventory and Create an Order Atomically',
    summary:
      'Both platforms support correctness tools, but one is fundamentally transactional by design.',
    cloudSqlCode: `BEGIN;

UPDATE inventory
SET quantity = quantity - 1
WHERE sku = 'ABC-123' AND quantity > 0;

INSERT INTO orders (user_id, total_cents)
VALUES (42, 2599);

COMMIT;`,
    dynamoCode: `await dynamoDb.transactWriteItems({
  TransactItems: [
    {
      Update: {
        TableName: 'app',
        Key: { PK: 'SKU#ABC-123', SK: 'INVENTORY' },
        UpdateExpression: 'SET quantity = quantity - :one',
        ConditionExpression: 'quantity > :zero',
        ExpressionAttributeValues: {
          ':one': 1,
          ':zero': 0,
        },
      },
    },
    {
      Put: {
        TableName: 'app',
        Item: { PK: 'USER#42', SK: 'ORDER#9001', totalCents: 2599 },
      },
    },
  ],
})`,
    explanation:
      'Cloud SQL treats multi-record transactional work as ordinary database behavior. DynamoDB can do transactional writes, but the surrounding data model is still item-based and access-pattern-driven rather than relational.',
  },
  {
    id: 'ex-index',
    title: 'Add Another Access Path',
    summary: 'Indexes exist in both systems, but they play a different architectural role.',
    cloudSqlCode: `CREATE INDEX orders_created_at_idx
ON orders (created_at DESC);`,
    dynamoCode: `{
  "IndexName": "GSI1",
  "PartitionKey": "orderStatus",
  "SortKey": "createdAt"
}`,
    explanation:
      'A new Cloud SQL index usually extends the databases existing query flexibility. A new DynamoDB secondary index is often a new first-class access path that must be treated as part of the original table design strategy.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Relational database',
    definition:
      'A database model organized around tables, relationships, SQL queries, and transactional integrity.',
  },
  {
    term: 'Cloud SQL',
    definition:
      'Google Cloud managed relational database service for engines such as PostgreSQL, MySQL, and SQL Server.',
  },
  {
    term: 'DynamoDB',
    definition:
      'AWS fully managed serverless key-value and document database built for low-latency access at large scale.',
  },
  {
    term: 'Partition key',
    definition:
      'The DynamoDB key component that determines how items are distributed and how requests are routed.',
  },
  {
    term: 'Sort key',
    definition:
      'An optional DynamoDB primary key component used to order related items within a partition.',
  },
  {
    term: 'Primary key',
    definition:
      'The identifying key for a record; in SQL this is a row identity concept, while in DynamoDB it also defines access behavior.',
  },
  {
    term: 'Global secondary index',
    definition:
      'A DynamoDB index that provides an alternate key-based access path over table data.',
  },
  {
    term: 'Read replica',
    definition:
      'A copy of a relational database used for read scaling or disaster recovery scenarios.',
  },
  {
    term: 'High availability',
    definition:
      'A deployment strategy that reduces downtime through redundancy and failover support.',
  },
  {
    term: 'ACID',
    definition:
      'A set of transactional guarantees commonly associated with relational database systems.',
  },
  {
    term: 'Denormalization',
    definition:
      'A modeling strategy that duplicates or restructures data to optimize specific reads or writes.',
  },
  {
    term: 'Conditional write',
    definition:
      'A DynamoDB write that only succeeds if specified conditions are true, often used for correctness and concurrency control.',
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
    { id: 'core-query', label: 'Query Model' },
    { id: 'core-schema', label: 'Schema and Evolution' },
    { id: 'core-consistency', label: 'Consistency and Transactions' },
    { id: 'core-scaling', label: 'Scaling Model' },
    { id: 'core-availability', label: 'Availability and Failure' },
    { id: 'core-indexing', label: 'Indexes and Access Paths' },
    { id: 'core-joins', label: 'Relationships and Joins' },
    { id: 'core-latency', label: 'Latency Profile' },
    { id: 'core-ops', label: 'Operations and Day-2 Work' },
    { id: 'core-tooling', label: 'Tooling and Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CloudSqlVsDynamoDbPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Cloud Sql Vs Dynamo Db Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cloud Sql Vs Dynamo Db Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="cloudsql-dynamo-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Cloud SQL and DynamoDB as real architectural choices rather than generic
        managed databases. The point is to make the tradeoffs explicit: relational model versus
        NoSQL model, query flexibility versus access-pattern discipline, transactional semantics,
        scaling approach, index strategy, operational fit, and the type of application each service
        is actually designed to serve well.
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
              <h3 className="bin98-subheading">Cloud SQL</h3>
              <div className="bin98-codebox">
                <code>{example.cloudSqlCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">DynamoDB</h3>
              <div className="bin98-codebox">
                <code>{example.dynamoCode.trim()}</code>
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
