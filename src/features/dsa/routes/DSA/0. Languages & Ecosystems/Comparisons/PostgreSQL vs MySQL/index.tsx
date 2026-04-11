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
      'PostgreSQL and MySQL are both mature relational database systems used in serious production environments. Both support SQL, indexes, transactions, backups, replication, and the core expectations of modern application storage.',
      'The useful comparison is not whether one of them is real enterprise technology and the other is not. The more useful question is which default philosophy better matches the system being built. PostgreSQL tends to reward teams that want richer SQL, stronger database-level modeling, and feature depth. MySQL tends to reward teams that want broad operational familiarity, mainstream compatibility, and a very established path for conventional transactional web applications.',
      'This help-style reference covers PostgreSQL vs MySQL across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-same-problem',
    title: 'Same Problem, Different Defaults',
    paragraphs: [
      'Both engines solve the same broad class of problem: storing and querying structured relational data reliably. That means the choice is often subtler than relational versus NoSQL or transactional versus analytical. It is a choice between two databases that overlap heavily but emphasize different strengths.',
      'PostgreSQL is usually the database teams choose when they expect the relational model itself to carry more of the systems complexity. MySQL is often chosen when the team wants a proven relational workhorse with broad ecosystem reach and a straightforward fit for familiar application patterns.',
    ],
  },
  {
    id: 'bp-postgresql',
    title: 'When PostgreSQL Fits Better',
    paragraphs: [
      'PostgreSQL is often the stronger fit when the database is not just a persistence layer but a core part of the applications design. It stands out when the workload leans on complex joins, analytics-friendly SQL, advanced constraints, geospatial support, full-text search, JSON-heavy querying, custom types, or extension-driven capabilities.',
      'It is also a common default when teams want the database to enforce more truth directly. Strong support for constraints, views, functions, procedural logic, and extension-based growth makes PostgreSQL attractive for long-lived systems of record where correctness and modeling discipline matter.',
    ],
  },
  {
    id: 'bp-mysql',
    title: 'When MySQL Fits Better',
    paragraphs: [
      'MySQL is often the stronger fit when the team already operates it confidently, when hosting or platform support strongly favors it, or when the application is a conventional transactional web system with clear OLTP access patterns and familiar ORM-driven behavior.',
      'Modern MySQL is not just a legacy web database. With InnoDB, transactions, CTEs, window functions, JSON support, replication options, and managed-cloud availability, it can serve serious production workloads. The reason teams choose MySQL is usually not lack of sophistication. It is often a deliberate choice for familiarity, compatibility, and predictable operational practice.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'One trap is to compare old myths instead of current engines. Modern MySQL is far more capable than many old comparisons imply, and PostgreSQL is often less operationally exotic than teams fear when they only know it by reputation.',
      'Another trap is to benchmark logos instead of workloads. Real outcomes depend on schema quality, indexes, query patterns, concurrency, hardware, observability, and team skill far more than on simplistic database tribalism.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose PostgreSQL when feature depth, advanced SQL, extensibility, and database-enforced correctness are central.',
      'Choose MySQL when the workload is conventionally relational and transactional, but ecosystem continuity and operational familiarity carry more weight than maximum feature breadth.',
      'If the choice is not constrained by an existing platform or team skill base, PostgreSQL often provides more capability headroom, while MySQL often provides the smoother path for organizations already standardized on it.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both databases are mature relational systems with strong transactional stories. Both support indexes, transactions, replication patterns, backups, client libraries, ORM integration, and managed offerings across major cloud platforms.',
      'That matters because many discussions overstate the gap. A large number of business applications can succeed on either engine if the schema, queries, and operational model are designed well.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Storage Model',
    paragraphs: [
      'PostgreSQL is a single database server with a strongly integrated feature set. The engine exposes a cohesive model for SQL, procedural logic, indexing families, extensions, and concurrency behavior.',
      'MySQL historically includes multiple storage engines, but in serious modern transactional deployments the conversation usually centers on InnoDB. That detail matters because many claims about MySQL only make sense when framed as MySQL with InnoDB rather than as an abstract brand-level database.',
    ],
  },
  {
    id: 'core-sql',
    title: 'SQL Standards and Query Surface',
    paragraphs: [
      'PostgreSQL is widely viewed as the more expressive SQL environment. Teams often choose it for recursive CTEs, window functions, analytical queries, advanced aggregates, custom operators, rich subquery shapes, and workloads that ask the database sophisticated relational questions.',
      'MySQL handles ordinary application SQL very well, and modern versions support many features that older writeups wrongly imply are missing. The meaningful distinction is less that MySQL cannot do real SQL work and more that PostgreSQL is the database many teams reach for when they expect query complexity to keep growing.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Transactions, Concurrency, and Isolation',
    paragraphs: [
      'PostgreSQL uses MVCC and is strongly associated with correctness-oriented transactional behavior under concurrent workloads. It is often favored where many concurrent sessions read and write interconnected business data and the reasoning model needs to stay disciplined.',
      'MySQL with InnoDB also supports transactions and robust concurrency, but teams often encounter its behavior through the lens of common web application patterns rather than through heavily relational multi-constraint design. In other words, both are transactional, but PostgreSQL is more often chosen when concurrency semantics themselves are part of the architectural conversation.',
    ],
  },
  {
    id: 'core-correctness',
    title: 'Constraints and Data Integrity',
    paragraphs: [
      'PostgreSQL is frequently selected when the database should actively enforce structure. Foreign keys, check constraints, exclusion logic, views, generated columns, stored logic, and rich typing make it attractive when data integrity is not negotiable.',
      'MySQL can absolutely enforce important relational constraints as well, especially with InnoDB. The practical difference is often cultural: PostgreSQL teams are more likely to let the database carry a larger share of business invariants, while MySQL teams more often keep more of that logic in application services.',
    ],
  },
  {
    id: 'core-json',
    title: 'JSON, Text, and Document-Like Workloads',
    paragraphs: [
      'Both databases support JSON data, but PostgreSQL is often the stronger choice when JSON becomes a serious first-class design concern rather than a convenience field on otherwise relational tables. JSONB, operator support, and relevant index strategies give PostgreSQL a deeper document-inside-relational toolkit.',
      'MySQL also supports JSON and can serve mixed relational and semi-structured workloads effectively. The difference is that PostgreSQL is more often chosen when teams expect to lean heavily on JSON querying, indexing, and hybrid relational-document access patterns.',
    ],
  },
  {
    id: 'core-indexing',
    title: 'Indexing Strategies',
    paragraphs: [
      'Both engines depend on disciplined indexing, composite key design, and good query plans. B-tree indexes, covering strategies, and access-path awareness matter in either system.',
      'PostgreSQL stands out for broader index families such as GIN, GiST, and BRIN, which become relevant for full-text search, JSONB, geospatial workloads, and very large datasets. MySQL tuning more often centers on conventional B-tree patterns, careful schema design, and making common OLTP queries stay predictable.',
    ],
  },
  {
    id: 'core-extensibility',
    title: 'Extensibility and Server-Side Capability',
    paragraphs: [
      'PostgreSQL is famous for extensibility. Extensions such as PostGIS, procedural languages, advanced text search, custom data types, and richer operator ecosystems are part of why it is often described as a database platform rather than just a storage engine.',
      'MySQL is typically more conservative here. That can be a weakness when the workload wants specialized database-native capability, but it can also be a strength when the team prefers a simpler feature surface and fewer database-specific abstractions to manage.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Replication, High Availability, and Operations',
    paragraphs: [
      'Both databases support replication, backup strategies, failover planning, and managed-service deployment. Neither should be treated as operationally trivial just because it is open source.',
      'MySQL has long benefited from extremely broad operational familiarity across hosting providers, managed platforms, and web-focused deployment playbooks. PostgreSQL is also very well supported operationally, but teams often choose it because they want its engine capabilities, not merely because it is the easiest default on commodity infrastructure.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Hosting, and Team Fit',
    paragraphs: [
      'MySQL appears in a vast amount of existing software: CMS platforms, traditional web products, commodity hosting, legacy estates, and many organizational runbooks. That matters because skills, tooling, and incident familiarity have real economic value.',
      'PostgreSQL has similarly strong cloud support and a powerful modern ecosystem, but it is especially common in greenfield SaaS systems, data-aware applications, internal platforms, and products where SQL capability and extension support are treated as strategic advantages.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Performance claims such as PostgreSQL is better for analytics or MySQL is faster for web apps should be treated as directional tendencies, not laws. They can be useful starting intuitions, but they are not substitutes for workload-specific measurement.',
      'Schema shape, write patterns, read amplification, index coverage, cache behavior, transaction scope, and operational discipline will usually dominate brand-level assumptions. Choose the engine that matches the workload and then optimize like the details matter, because they do.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration and Compatibility Considerations',
    paragraphs: [
      'Moving between PostgreSQL and MySQL is usually straightforward only for the simplest schemas. Differences in SQL dialect, data types, JSON behavior, procedural features, generated values, indexing choices, and query semantics can make migration nontrivial.',
      'That means the best time to think about portability is early. If the product depends heavily on PostgreSQL extensions or on MySQL-specific operational patterns, the real long-term decision is not just data storage but the surrounding engineering model.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward PostgreSQL if complex querying, stricter relational modeling, extension support, or deeper database-level logic will matter.',
      'Lean toward MySQL if the organization already operates it confidently, if mainstream compatibility is a hard requirement, or if the workload is straightforward OLTP with familiar web-application patterns.',
      'If there is no clear organizational bias, PostgreSQL is often the better default for long-term feature headroom, while MySQL is often the better default for continuity in MySQL-centered environments.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-upsert',
    title: 'Upsert Workflow',
    description:
      'Both databases support upsert patterns, but they expose the idea through different syntax and slightly different mental models.',
    snippets: [
      {
        label: 'PostgreSQL',
        code: `INSERT INTO users (email, full_name)
VALUES ('ana@example.com', 'Ana')
ON CONFLICT (email)
DO UPDATE SET full_name = EXCLUDED.full_name
RETURNING id, email, full_name;`,
      },
      {
        label: 'MySQL',
        code: `INSERT INTO users (email, full_name)
VALUES ('ana@example.com', 'Ana')
ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name);`,
      },
    ],
    takeaway:
      'Both are production-ready. PostgreSQL often feels more explicit when conflict behavior is treated as part of the data model.',
  },
  {
    id: 'examples-json',
    title: 'JSON-Centered Querying',
    description:
      'Both engines can store and query JSON, but PostgreSQL is more often chosen when that mixed relational-document pattern becomes architecturally important.',
    snippets: [
      {
        label: 'PostgreSQL',
        code: `SELECT id, metadata->>'status' AS status
FROM orders
WHERE metadata @> '{"priority":"high"}';`,
      },
      {
        label: 'MySQL',
        code: `SELECT id, JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.status')) AS status
FROM orders
WHERE JSON_EXTRACT(metadata, '$.priority') = 'high';`,
      },
    ],
    takeaway:
      'If JSON is central to the systems query model, PostgreSQL often provides the broader native toolkit.',
  },
  {
    id: 'examples-search',
    title: 'Text Search Direction',
    description:
      'Full-text search exists in both worlds, but the surrounding feature culture looks different.',
    snippets: [
      {
        label: 'PostgreSQL',
        code: `SELECT id, title
FROM articles
WHERE to_tsvector('english', body) @@ plainto_tsquery('english', 'database tuning');`,
      },
      {
        label: 'MySQL',
        code: `SELECT id, title
FROM articles
WHERE MATCH(body) AGAINST ('database tuning' IN NATURAL LANGUAGE MODE);`,
      },
    ],
    takeaway:
      'Both can search text, but PostgreSQL is more often selected when search and indexing nuance must live deeply inside the relational layer.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb helps keep the debate focused on workload and team reality rather than database branding.',
    snippets: [
      {
        label: 'PostgreSQL Rule',
        code: `If the database must enforce more truth,
support richer SQL,
or grow into advanced indexing and extensions:
  choose PostgreSQL`,
      },
      {
        label: 'MySQL Rule',
        code: `If the workload is conventional OLTP,
the team already runs MySQL well,
and compatibility is a practical advantage:
  choose MySQL`,
      },
    ],
    takeaway:
      'The better database is the one that matches the systems shape and the teams operating discipline.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'ACID',
    definition:
      'A shorthand for transactional guarantees around atomicity, consistency, isolation, and durability.',
  },
  {
    term: 'MVCC',
    definition:
      'Multiversion concurrency control, a technique for handling concurrent reads and writes without simple global blocking.',
  },
  {
    term: 'InnoDB',
    definition:
      'The MySQL storage engine most commonly used for transactional workloads in modern deployments.',
  },
  {
    term: 'JSONB',
    definition: 'PostgreSQL binary JSON storage optimized for querying and indexing.',
  },
  {
    term: 'GIN Index',
    definition:
      'A PostgreSQL index type often used for arrays, full-text search, and JSONB-heavy workloads.',
  },
  {
    term: 'GiST Index',
    definition:
      'A PostgreSQL index family useful for certain advanced search and geospatial access patterns.',
  },
  {
    term: 'BRIN Index',
    definition:
      'A PostgreSQL index type designed for very large tables where data has useful natural ordering.',
  },
  {
    term: 'Read Replica',
    definition:
      'A secondary database instance used primarily for read scaling or recovery scenarios.',
  },
  {
    term: 'Logical Replication',
    definition:
      'Replication at the data-change level rather than only block or physical server state level.',
  },
  {
    term: 'OLTP',
    definition:
      'Online transaction processing workloads characterized by many short reads and writes.',
  },
  {
    term: 'Extension',
    definition:
      'A PostgreSQL capability for adding database-native functionality beyond the core engine.',
  },
  {
    term: 'Full-Text Search',
    definition:
      'Database-supported text indexing and search functionality beyond simple substring matching.',
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

export default function PostgreSqlVsMySqlPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'PostgreSQL vs MySQL',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="PostgreSQL vs MySQL"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">PostgreSQL vs MySQL</h1>
      <p className="pg-mysql-help-doc-subtitle">
        Manual-style comparison of architecture, SQL capability, operational fit, and long-term
        tradeoffs.
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
