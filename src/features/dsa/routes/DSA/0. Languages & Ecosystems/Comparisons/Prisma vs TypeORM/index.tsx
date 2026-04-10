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
      'Prisma and TypeORM are both important tools in the TypeScript database ecosystem, but they represent different mental models for persistence. Prisma is schema-first, generation-driven, and strongly centered on a typed client API. TypeORM is entity-centric, decorator-heavy, and more closely aligned with traditional ORM patterns built around classes, repositories, and object mapping.',
      'That means the useful comparison is not simply which one talks to PostgreSQL or MySQL more effectively. The real issue is how the team wants to express persistence: through a schema file that generates a client and migrations, or through class-based entities and ORM patterns living directly in application code.',
      'This help-style reference covers Prisma vs TypeORM across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-prisma',
    title: 'When Prisma Fits Better',
    paragraphs: [
      'Prisma is often the stronger fit when the team wants a modern TypeScript experience with a very explicit schema, generated types, predictable migrations, and a clean query client that feels strongly guided. It is especially attractive in greenfield services, startup backends, and codebases where type safety and clarity of schema ownership matter a great deal.',
      'It is also frequently favored when the team wants to reduce ORM ambiguity. Instead of treating decorated classes as the central source of truth, Prisma makes the schema explicit and turns that schema into generated access primitives. That workflow often feels disciplined and approachable for teams standardizing on TypeScript.',
    ],
  },
  {
    id: 'bp-typeorm',
    title: 'When TypeORM Fits Better',
    paragraphs: [
      'TypeORM is often the stronger fit when the team prefers classic ORM modeling through entities, decorators, repositories, entity managers, and query builders. It can feel natural when the application is already architected around class-based domain objects and object-relational mapping conventions.',
      'It can also be a better fit when a codebase already uses TypeORM deeply or when the team wants persistence logic to live closer to application classes rather than behind a generated client layer. The main strength is often conceptual fit with an established object-modeling style rather than novelty.',
    ],
  },
  {
    id: 'bp-shared-realities',
    title: 'Shared Realities',
    paragraphs: [
      'Both tools are abstractions over relational databases, not replacements for database design. Schema quality, indexing, transaction boundaries, raw SQL literacy, and migration discipline still matter regardless of which abstraction is chosen.',
      'Both can be used successfully in production. The decision becomes most important when the team cares strongly about typing behavior, schema ownership, runtime feel, and long-term maintenance habits.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A frequent mistake is to compare them only by whether one feels newer or more old-school. That misses the real issue, which is how the project wants to model persistence over time.',
      'Another mistake is to assume that either tool removes the need to understand SQL and relational design. The better abstraction still depends on disciplined schema decisions and careful query behavior underneath.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Prisma when schema-first workflow, generated types, and a strongly guided TypeScript developer experience are central.',
      'Choose TypeORM when entity classes, repositories, decorators, and classic ORM architecture fit the codebase more naturally.',
      'If the team is already deeply successful with one of them, that operational familiarity may outweigh abstract comparisons.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both tools aim to make relational database work more ergonomic in TypeScript and Node.js applications. Both support models, relations, migrations, transactions, and integration with mainstream backend frameworks.',
      'That overlap is real, but it does not mean they are interchangeable in developer feel. The strongest differences show up in schema ownership, type safety, runtime model, and how the team structures application persistence.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Mental Model',
    paragraphs: [
      'Prisma is schema-first. Developers define models in a Prisma schema file, generate a typed client, and usually treat that schema as the explicit contract between database shape and application code.',
      'TypeORM is entity-first in feel. Classes and decorators define tables, columns, and relations, and the ORM works through repositories, entity managers, and query builders. The application code itself often becomes the most visible expression of the persistence model.',
    ],
  },
  {
    id: 'core-schema',
    title: 'Schema Ownership',
    paragraphs: [
      'In Prisma, schema visibility is one of the biggest strengths. The shape of the database is collected in a dedicated language and file, which makes it easier for many teams to review, diff, and reason about schema evolution as its own concern.',
      'In TypeORM, schema information is distributed across decorated classes and supporting configuration. That can feel more natural to object-oriented teams, but it can also make the persistence picture more implicit when the codebase grows large.',
    ],
  },
  {
    id: 'core-types',
    title: 'Type Safety and DX',
    paragraphs: [
      'Prisma is widely praised for strong generated typing. Selected fields, nested relations, filters, ordering, and many returned shapes are reflected directly in the generated client. This aligns especially well with teams that expect TypeScript to carry as much structural certainty as possible.',
      'TypeORM works in TypeScript, but its typing model is not centered on generating a schema-driven query client. The result can feel more flexible and less prescriptive, which some teams prefer and others experience as less precise.',
    ],
  },
  {
    id: 'core-migrations',
    title: 'Migrations and Lifecycle',
    paragraphs: [
      'Prisma encourages a visible migration workflow tied closely to the schema definition. For many teams, this creates a clean operational story: change schema, generate migration, regenerate client, update application code.',
      'TypeORM also supports migrations, but the overall experience is often more dependent on project conventions and how carefully the team structures entities, metadata, and runtime configuration. That does not make it weaker by default, but it does make consistency more team-dependent.',
    ],
  },
  {
    id: 'core-query',
    title: 'Query Style',
    paragraphs: [
      'Prisma feels like calling a typed data access client. Reads and writes are described with structured objects, nested relations, and generated methods that strongly reflect the schema model.',
      'TypeORM offers a classic ORM range: repositories for common operations, query builders for more customized SQL-like construction, and entity managers for broader lifecycle work. Teams that like ORM patterns often find this more natural than Prisma-style generated method calls.',
    ],
  },
  {
    id: 'core-relations',
    title: 'Relations and Nested Workflows',
    paragraphs: [
      'Prisma is especially comfortable when the team wants nested relation loading and nested write patterns through a guided client API. The generated surface often makes common relational traversals easy to discover and hard to misuse.',
      'TypeORM handles relations well too, but the experience is more shaped by ORM patterns such as eager versus lazy loading, entity graphs, repository methods, and query-builder decisions. The result is powerful, but often less uniformly guided.',
    ],
  },
  {
    id: 'core-escape-hatches',
    title: 'Raw SQL and Escape Hatches',
    paragraphs: [
      'No serious database abstraction is complete without an escape hatch. Prisma supports raw queries when the client abstraction is not the right fit, and teams should still be willing to use database-native SQL when needed.',
      'TypeORM also provides paths for more direct or custom querying, especially through query builders and raw query access. In both tools, real maturity comes from knowing when to leave the happy path and use the database more directly.',
    ],
  },
  {
    id: 'core-runtime',
    title: 'Runtime and Operational Feel',
    paragraphs: [
      'Prisma introduces a generate step and a more explicit toolchain rhythm. Many teams consider that a strength because it makes the schema lifecycle visible and turns database access into a typed artifact rather than only a runtime convention.',
      'TypeORM can feel more immediate because entities live directly in application code, but that can also mean more room for variation across projects. The experience depends heavily on how disciplined the team is about repository patterns, transactional boundaries, and entity usage.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Team Fit',
    paragraphs: [
      'Prisma is often adopted in greenfield TypeScript backends, modern API servers, and codebases that value a polished onboarding path. It is frequently associated with teams that want the database layer to feel modern, explicit, and strongly typed.',
      'TypeORM remains relevant in codebases that prefer established ORM conventions, repository-centric architecture, or class-based domain modeling. It can be especially attractive when the project already thinks of persistence through entities rather than through generated clients.',
    ],
  },
  {
    id: 'core-migration-between',
    title: 'Switching Cost Between Them',
    paragraphs: [
      'Moving from TypeORM to Prisma or from Prisma to TypeORM is not just a dependency swap. It usually means changing how the project thinks about schema, migrations, relation loading, typing, and persistence boundaries.',
      'That switching cost matters because the tool choice shapes habits. A team that standardizes on Prisma learns schema-first thinking. A team that standardizes on TypeORM learns entity-driven ORM patterns. Either can work, but both have architectural gravity.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Prisma if strong generated types, explicit schema ownership, and a modern guided TypeScript experience are top priorities.',
      'Lean toward TypeORM if decorated entities, repositories, and classic ORM workflows fit the codebase more naturally.',
      'If the team already has deep working knowledge of one tool and the current codebase is healthy, staying consistent may be the highest-leverage decision.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-model',
    title: 'Model Definition',
    description:
      'The core design difference appears immediately in how each tool defines schema and persistence structure.',
    snippets: [
      {
        label: 'Prisma',
        code: `model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}`,
      },
      {
        label: 'TypeORM',
        code: `@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column({ nullable: true })
  name?: string
}`,
      },
    ],
    takeaway:
      'Prisma separates schema from application classes. TypeORM makes persistence metadata part of the class model itself.',
  },
  {
    id: 'examples-query',
    title: 'Querying Records',
    description:
      'Both tools can express ordinary reads clearly, but the query surface feels very different in practice.',
    snippets: [
      {
        label: 'Prisma',
        code: `const users = await prisma.user.findMany({
  where: { email: { contains: '@example.com' } },
  orderBy: { id: 'desc' },
  include: { posts: true },
})`,
      },
      {
        label: 'TypeORM',
        code: `const users = await userRepository.find({
  where: { email: Like('%@example.com') },
  order: { id: 'DESC' },
  relations: { posts: true },
})`,
      },
    ],
    takeaway:
      'Prisma often feels like a typed data client. TypeORM often feels like an ORM repository.',
  },
  {
    id: 'examples-transaction',
    title: 'Transaction Workflow',
    description:
      'Both tools support transactions, but the surrounding API reflects their broader architectural style.',
    snippets: [
      {
        label: 'Prisma',
        code: `await prisma.$transaction(async (tx) => {
  await tx.account.update({
    where: { id: 1 },
    data: { balance: { decrement: 100 } },
  })

  await tx.account.update({
    where: { id: 2 },
    data: { balance: { increment: 100 } },
  })
})`,
      },
      {
        label: 'TypeORM',
        code: `await dataSource.transaction(async (manager) => {
  await manager.decrement(Account, { id: 1 }, 'balance', 100)
  await manager.increment(Account, { id: 2 }, 'balance', 100)
})`,
      },
    ],
    takeaway:
      'Both are workable. The difference is whether the codebase wants a generated-client rhythm or a manager-and-entity ORM rhythm.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short prompt can keep the comparison focused on maintenance style rather than trend language.',
    snippets: [
      {
        label: 'Prisma Rule',
        code: `If the team wants schema-first workflow,
generated types,
and a strongly guided query API:
  choose Prisma`,
      },
      {
        label: 'TypeORM Rule',
        code: `If the team wants entities, decorators,
repositories, and classic ORM patterns:
  choose TypeORM`,
      },
    ],
    takeaway:
      'The better tool is usually the one that matches how the team wants to express persistence over time.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'ORM',
    definition:
      'Object-relational mapping, a pattern for working with relational databases through application abstractions.',
  },
  {
    term: 'Schema-First',
    definition:
      'A workflow where an explicit schema definition drives generated code or contracts.',
  },
  {
    term: 'Entity',
    definition:
      'A class or model object representing a table or row shape in an ORM-centric system.',
  },
  {
    term: 'Repository',
    definition:
      'An abstraction that encapsulates persistence operations for entities or aggregates.',
  },
  {
    term: 'Migration',
    definition: 'A versioned database change used to evolve schema over time safely.',
  },
  {
    term: 'Generated Client',
    definition:
      'Code produced from schema definitions to provide strongly typed database access methods.',
  },
  {
    term: 'Decorator',
    definition:
      'Metadata-style syntax commonly used by TypeORM to declare table and column mapping on classes.',
  },
  {
    term: 'Query Builder',
    definition:
      'An API for constructing SQL-like queries programmatically rather than only through repository convenience methods.',
  },
  {
    term: 'Entity Manager',
    definition:
      'A coordination object used in ORM workflows to handle persistence and transactions.',
  },
  {
    term: 'Nested Write',
    definition:
      'A write operation that creates or updates related records in one higher-level API call.',
  },
  {
    term: 'Introspection',
    definition: 'Deriving schema or metadata information from an existing database.',
  },
  {
    term: 'Escape Hatch',
    definition:
      'A lower-level path such as raw SQL used when the abstraction layer is not the right tool.',
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

export default function PrismaVsTypeOrmPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Prisma vs TypeORM',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Prisma vs TypeORM"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Prisma vs TypeORM</h1>
      <p className="prisma-typeorm-help-doc-subtitle">
        Manual-style comparison of schema ownership, query style, typing model, and long-term
        maintenance tradeoffs.
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
