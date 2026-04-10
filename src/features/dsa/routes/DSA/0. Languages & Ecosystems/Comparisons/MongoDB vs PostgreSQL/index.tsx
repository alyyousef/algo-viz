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
  'MongoDB and PostgreSQL are both serious production databases, but they represent different default philosophies about data modeling, querying, and consistency. MongoDB is centered on flexible document storage and application-friendly hierarchical records. PostgreSQL is centered on relational structure, strong transactional guarantees, and the expressive power of SQL over well-defined schemas.',
  'The useful comparison is not NoSQL versus SQL as a slogan. The useful comparison is how the data behaves, how often it changes shape, how important relational integrity is, how much query complexity the system needs, and what operational tradeoffs the team wants to make. Both systems are mature. The right one depends on whether the application benefits more from document flexibility or relational discipline.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'MongoDB stores data as documents, usually in BSON, which maps naturally to nested JSON-like structures. This makes it attractive when application records are hierarchical, vary in shape, or evolve quickly during product development. The model often feels close to how application objects are represented.',
      'PostgreSQL stores data in relational tables with well-defined schemas, keys, constraints, and SQL querying. It is attractive when data integrity, complex joins, transactions, and long-term structural clarity are important. It is one of the most capable general-purpose relational databases in production use.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Share',
    paragraphs: [
      'Both databases are capable of serious production workloads. Both support indexing, replication, scaling patterns, drivers across major languages, and broad ecosystem adoption. Both can succeed or fail depending on whether the data model matches the real problem.',
      'The main difference is not maturity. The main difference is default modeling style and what each database makes easy or difficult by design.',
    ],
    bullets: [
      'Both are production-grade databases with broad adoption.',
      'Both support indexing, replication, and serious operational use.',
      'Both can handle large applications when modeled appropriately.',
      'Both punish teams that choose them for fashion rather than fit.',
    ],
  },
  {
    id: 'bp-when-mongodb-fits',
    title: 'When MongoDB Is Usually the Better Fit',
    paragraphs: [
      'MongoDB is usually the better fit when the data is naturally document shaped, when records contain nested structures that are often loaded together, and when schema flexibility is genuinely valuable. It is especially attractive for content-heavy systems, event-like records, evolving product schemas, and applications that mostly read and write complete documents.',
      'It is also useful when the application benefits from storing related information together in one record rather than constantly decomposing it into many relational tables and joins.',
    ],
    bullets: [
      'Document-shaped or hierarchical data.',
      'Fast-evolving schema requirements.',
      'Applications that frequently read and write whole aggregates.',
      'Systems where nested records match the product domain naturally.',
    ],
  },
  {
    id: 'bp-when-postgresql-fits',
    title: 'When PostgreSQL Is Usually the Better Fit',
    paragraphs: [
      'PostgreSQL is usually the better fit when data relationships, transactional consistency, constraints, and rich querying matter. It is especially attractive for systems of record, financial workflows, operations platforms, line-of-business applications, and domains where the structure of the data should remain disciplined.',
      'It is also attractive when the team wants strong SQL capabilities, reliable relational integrity, and one database that can handle a wide range of workloads without giving up expressive query power.',
    ],
    bullets: [
      'Relational data with important integrity constraints.',
      'Complex queries and joins.',
      'Transaction-heavy business systems.',
      'Long-lived applications where schema clarity is a major benefit.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The right choice usually follows the data model. If the system is fundamentally relational and integrity heavy, PostgreSQL is often the safer default. If the system is fundamentally document oriented and schema variability is real rather than hypothetical, MongoDB may be the better match.',
    ],
    bullets: [
      'Choose MongoDB for document-shaped aggregates and flexible schema evolution.',
      'Choose PostgreSQL for relational integrity and SQL power.',
      'Choose PostgreSQL by default when the schema is stable and business critical.',
      'Choose MongoDB when nested document access is central to the product model.',
      'Do not choose flexibility if the domain actually needs discipline.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-data-model',
    title: 'Data Model',
    paragraphs: [
      'MongoDB’s data model is centered on collections of documents. A single document can contain nested arrays and nested objects, which can make the data feel close to application structures and reduce the need for joins in document-oriented use cases.',
      'PostgreSQL’s data model is centered on normalized tables, keys, and relationships. This model is especially effective when data integrity, cross-entity relationships, and long-term consistency matter. It asks the team to model structure more explicitly.',
    ],
  },
  {
    id: 'core-schema-discipline',
    title: 'Schema Flexibility Versus Schema Discipline',
    paragraphs: [
      'MongoDB is often praised for schema flexibility. That flexibility can accelerate iteration when the product is changing quickly or when documents do not all share exactly the same shape. The risk is that flexibility can become inconsistency if the team does not enforce structure at the application level.',
      'PostgreSQL is often praised for schema discipline. That discipline can feel slower early on, but it often pays off in stability, correctness, and shared understanding as the system grows. The schema becomes an explicit contract rather than an informal convention.',
    ],
  },
  {
    id: 'core-query-model',
    title: 'Query Model',
    paragraphs: [
      'MongoDB query patterns are often strongest when retrieving documents or document subsets by indexed fields, especially when one document already contains most of what the application needs. The model works best when access patterns are shaped around aggregates.',
      'PostgreSQL query patterns are often strongest when data must be joined, aggregated, filtered, and analyzed through expressive SQL. PostgreSQL excels when the application asks many structured questions across related entities rather than mostly fetching one nested object at a time.',
    ],
  },
  {
    id: 'core-transactions-integrity',
    title: 'Transactions and Integrity',
    paragraphs: [
      'PostgreSQL has a deeply established reputation for strong transactional integrity, relational constraints, and correctness-oriented behavior. This makes it a natural fit for domains where inconsistent writes or broken relationships are expensive.',
      'MongoDB supports strong capabilities as well, but its core appeal is usually not that it behaves like the best relational system. Its core appeal is that it solves different modeling problems more naturally when document aggregates are the right shape.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling and Operational Shape',
    paragraphs: [
      'MongoDB is often discussed in terms of horizontal scaling through sharding and the operational fit of document-oriented workloads. This can be useful when the system’s access patterns align with document partitioning and high-volume aggregate reads.',
      'PostgreSQL can scale impressively as well, but it is often chosen first for correctness and query power rather than because teams want a document-style distributed model. Many systems succeed with PostgreSQL far longer than teams initially expect when the schema and indexing are designed well.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-analytics-reporting',
    title: 'Analytics, Reporting, and Ad Hoc Queries',
    paragraphs: [
      'PostgreSQL is often the stronger default when the system will need rich ad hoc queries, reporting, aggregations across many related entities, and operational dashboards built on SQL. The relational model and SQL expressiveness are major strengths here.',
      'MongoDB can support aggregation pipelines and reporting workloads, but it is usually strongest when those workloads remain aligned with document-oriented access patterns rather than heavy relational-style querying across many normalized entities.',
    ],
  },
  {
    id: 'core-app-shape',
    title: 'Application Shape Fit',
    paragraphs: [
      'MongoDB often fits applications where the primary business record is a self-contained aggregate: a catalog item with nested attributes, a content document, a user profile with embedded settings, or event-like records that are usually processed as whole objects.',
      'PostgreSQL often fits applications where the domain is full of relationships: users, roles, permissions, orders, invoices, products, payments, workflows, and all the rules connecting them. In those cases, relational structure is a feature, not a burden.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team and Organization Fit',
    paragraphs: [
      'MongoDB tends to fit teams that are comfortable designing around document aggregates and enforcing structural discipline in application code or schema governance practices above the database. It rewards teams that truly understand their aggregate boundaries.',
      'PostgreSQL tends to fit teams that want the database itself to enforce more of the application’s structural truth. It often aligns naturally with teams that value explicit schema review, migration discipline, and relational correctness.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'MongoDB often wins on document flexibility, nested aggregate modeling, and a natural fit for JSON-like application data. PostgreSQL often wins on relational integrity, SQL expressiveness, and a strong default for long-lived business systems.',
      'The mistake is to treat MongoDB as a modern choice and PostgreSQL as a conservative choice. Both are modern. The real issue is whether the problem is document-shaped or relation-shaped, and whether flexibility or structure should carry more weight in the system.',
    ],
    bullets: [
      'Choose MongoDB for aggregates and evolving document structures.',
      'Choose PostgreSQL for integrity, joins, and complex querying.',
      'Do not choose document flexibility when the domain is deeply relational.',
      'Do not normalize aggressively when the application mainly reads whole aggregates.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the database is a system of record with many relationships and strong correctness rules, PostgreSQL is often the safer architectural default. It keeps the structure of the business explicit and lets the database enforce more of the truth.',
      'If the application is built around aggregate-oriented documents that naturally live and evolve together, MongoDB can simplify the model and reduce friction. The key is not whether the database is relational or non-relational as an ideology. The key is whether its native model matches the shape of the domain.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-document-shape',
    title: 'Document-Oriented Shape',
    description: [
      'MongoDB is often strongest when one record naturally contains most of the information the application needs together.',
    ],
    code: `{
  "userId": "42",
  "name": "Amina",
  "addresses": [
    { "city": "Cairo", "type": "home" }
  ],
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}`,
    notes: [
      'This style reduces the need for joins when the aggregate is usually loaded as a whole.',
      'It works best when the document boundary reflects the real business boundary.',
    ],
  },
  {
    id: 'examples-relational-shape',
    title: 'Relational Shape',
    description: [
      'PostgreSQL is often strongest when several entities must stay consistent and be queried together in structured ways.',
    ],
    code: `users
orders
order_items
products
payments

joined by keys
validated by constraints`,
    notes: [
      'This is where relational modeling becomes an advantage rather than overhead.',
      'The database helps preserve truth across interconnected business entities.',
    ],
  },
  {
    id: 'examples-query-style',
    title: 'Query Style Contrast',
    description: [
      'The difference often becomes obvious when comparing the kind of questions the application wants to ask.',
    ],
    code: `MongoDB question:
"Load this user profile document and its embedded preferences"

PostgreSQL question:
"Find all paid orders by region, joined with product category totals for the last quarter"`,
    notes: [
      'These are not hard limits, but they reflect where each database feels most natural.',
      'Model fit matters more than ideology.',
    ],
  },
  {
    id: 'examples-default-choice',
    title: 'Default Choice Heuristic',
    description: [
      'Many teams need a simple decision rule when the architecture is still emerging.',
    ],
    code: `If the domain is clearly relational:
default to PostgreSQL

If the domain is clearly aggregate-oriented and document-shaped:
consider MongoDB`,
    notes: [
      'This heuristic avoids choosing flexibility where structure is needed.',
      'It also avoids forcing relational decomposition onto naturally nested aggregates.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-mongodb',
    title: 'MongoDB Terms',
    terms: [
      {
        term: 'Document',
        definition: 'A BSON record representing one stored entity or aggregate in MongoDB.',
      },
      {
        term: 'Collection',
        definition:
          'A group of MongoDB documents, roughly analogous to a table but with more flexible document structure.',
      },
      {
        term: 'Aggregation Pipeline',
        definition:
          'A staged processing model in MongoDB for transforming and aggregating document data.',
      },
      {
        term: 'Sharding',
        definition: 'A MongoDB scaling strategy that partitions data across multiple nodes.',
      },
    ],
  },
  {
    id: 'glossary-postgresql',
    title: 'PostgreSQL Terms',
    terms: [
      {
        term: 'Table',
        definition: 'A structured relational storage object with columns and rows.',
      },
      {
        term: 'Join',
        definition: 'A relational operation that combines rows from related tables.',
      },
      {
        term: 'Constraint',
        definition:
          'A database rule such as uniqueness, foreign key integrity, or check validation.',
      },
      {
        term: 'SQL',
        definition:
          'The declarative query language used to define, query, and manipulate relational data.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Database Terms',
    terms: [
      {
        term: 'Schema',
        definition: 'The structural definition of stored data and its fields or columns.',
      },
      {
        term: 'Transaction',
        definition: 'A unit of work that must complete with consistent all-or-nothing behavior.',
      },
      {
        term: 'Index',
        definition: 'A data structure used to speed up lookup and query execution.',
      },
      {
        term: 'Aggregate',
        definition:
          'A business object boundary whose related data is commonly loaded and updated together.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-when-mongodb-fits', label: 'When MongoDB Fits' },
    { id: 'bp-when-postgresql-fits', label: 'When PostgreSQL Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-data-model', label: 'Data Model' },
    { id: 'core-schema-discipline', label: 'Schema Flexibility Versus Discipline' },
    { id: 'core-query-model', label: 'Query Model' },
    { id: 'core-transactions-integrity', label: 'Transactions and Integrity' },
    { id: 'core-scaling', label: 'Scaling and Operational Shape' },
    { id: 'core-analytics-reporting', label: 'Analytics and Reporting' },
    { id: 'core-app-shape', label: 'Application Shape Fit' },
    { id: 'core-team-fit', label: 'Team and Organization Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-document-shape', label: 'Document-Oriented Shape' },
    { id: 'examples-relational-shape', label: 'Relational Shape' },
    { id: 'examples-query-style', label: 'Query Style Contrast' },
    { id: 'examples-default-choice', label: 'Default Choice Heuristic' },
  ],
  glossary: [
    { id: 'glossary-mongodb', label: 'MongoDB Terms' },
    { id: 'glossary-postgresql', label: 'PostgreSQL Terms' },
    { id: 'glossary-shared', label: 'Shared Database Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mongo-pg-help-section">
      <h2 className="mongo-pg-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="mongo-pg-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mongo-pg-help-section">
      <h2 className="mongo-pg-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="mongo-pg-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="mongo-pg-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mongo-pg-help-section">
      <h2 className="mongo-pg-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="mongo-pg-help-divider" />}
    </section>
  )
}

export default function MongoDbVsPostgreSqlPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'MongoDB vs PostgreSQL',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="MongoDB vs PostgreSQL"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">MongoDB vs PostgreSQL</h1>
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
