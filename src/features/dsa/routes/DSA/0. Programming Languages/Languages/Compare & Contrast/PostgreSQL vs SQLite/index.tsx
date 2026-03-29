import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
      'PostgreSQL and SQLite are both respected SQL databases, but they solve meaningfully different architectural problems. PostgreSQL is a client-server database built for shared, concurrent, multi-user systems. SQLite is an embedded database library built to live inside an application process and store data in a local file.',
      'That means the real decision is rarely about sophistication. Both are sophisticated. The more useful decision is whether the product needs a managed database service with server-grade concurrency and operational controls, or a lightweight embedded engine that avoids database infrastructure almost entirely.',
      'The original page scope was placeholder content for PostgreSQL vs SQLite, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller reference.',
    ],
  },
  {
    id: 'bp-server-vs-embedded',
    title: 'Server Database vs Embedded Database',
    paragraphs: [
      'PostgreSQL expects a running database server, client connections, authentication, resource management, background maintenance, and a surrounding operational story. SQLite does not. In typical use, SQLite is simply linked into the application and given a file path.',
      'That one difference explains most of the tradeoffs. PostgreSQL wins when shared access, durability controls, roles, replication, and scalable service operation matter. SQLite wins when local simplicity, portability, and zero-admin deployment matter more than centralized database infrastructure.',
    ],
  },
  {
    id: 'bp-postgresql',
    title: 'When PostgreSQL Fits Better',
    paragraphs: [
      'PostgreSQL is usually the better fit when many users or services access the same data, when concurrent writes are common, or when the database is a serious system-of-record component. It fits backend APIs, SaaS products, internal platforms, transactional systems, analytics-aware relational workloads, and applications that rely on advanced SQL or extensions.',
      'It also becomes the safer choice when the schema and database feature set are expected to grow over time. Roles, background operations, advanced indexing, replication options, and extension support give PostgreSQL much more room for expansion once a product moves beyond local or low-concurrency use.',
    ],
  },
  {
    id: 'bp-sqlite',
    title: 'When SQLite Fits Better',
    paragraphs: [
      'SQLite is often the better fit when the data belongs naturally to a single application instance, device, or local workflow. That includes mobile apps, desktop apps, CLI tools, local-first products, test fixtures, edge devices, browser-adjacent tooling, and small embedded systems.',
      'Its strength is not that it imitates a server database on a smaller scale. Its strength is that it removes an entire layer of infrastructure. You ship an application and a database file, not a database fleet.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare them only by feature count. SQLite can be excellent even when PostgreSQL has more features, because feature abundance is not always the design goal. Another mistake is to use SQLite for a shared write-heavy backend simply because it is easy to start with.',
      'The real question is not which database is more impressive. The real question is whether the systems deployment and concurrency model fits an embedded file-backed engine or a dedicated server database.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose PostgreSQL when the application is shared, concurrent, service-oriented, or expected to grow into a richer database platform.',
      'Choose SQLite when simplicity, local durability, portability, and zero-admin deployment are the main advantages.',
      'If the products natural home is on one device or inside one process, SQLite is often a gift. If the products natural home is a shared service, PostgreSQL is usually the safer architectural default.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both systems use SQL, both support transactions, both can enforce relational schemas, and both can serve real production applications. Neither should be dismissed as merely toy technology.',
      'The most important distinction is not whether they can store tables. It is how they are deployed, how they handle concurrency, and what kind of product architecture they expect.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture',
    paragraphs: [
      'PostgreSQL is a standalone server process. Applications connect to it through clients or drivers, and the server manages sessions, permissions, background maintenance, and coordinated access to data.',
      'SQLite is an embedded library. There is no separate database service to start or monitor in the typical case. The application reads and writes the database file directly through the SQLite engine running in-process.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Locking',
    paragraphs: [
      'PostgreSQL is built for many concurrent readers and writers. It is designed for service workloads where multiple requests, users, or jobs may interact with the same data at once.',
      'SQLite can handle concurrent access, especially for many readers, but its write model is fundamentally different from a client-server engine. For local or lightly contended workloads that can be perfectly acceptable. For shared write-heavy backends it often becomes the wrong fit.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and Reliability Model',
    paragraphs: [
      'PostgreSQL is known for strong transactional behavior in multi-user systems and is often chosen precisely because teams trust it to carry serious relational workloads under contention.',
      'SQLite also supports transactions and durability, and it does so impressively well for an embedded database. The question is not whether SQLite has transactions. The question is whether the systems concurrency and deployment shape match SQLites embedded model.',
    ],
  },
  {
    id: 'core-features',
    title: 'SQL Feature Depth',
    paragraphs: [
      'PostgreSQL is the stronger choice when the application will rely on advanced SQL, rich joins, procedural logic, extension support, JSON-heavy querying, geospatial tooling, full-text search, or specialized index families.',
      'SQLite supports a large and useful subset of SQL features for compact application storage, testing, local caches, and smaller systems. It is strong within its intended design envelope, but it is not trying to be a drop-in replacement for a fully featured database platform in every scenario.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Deployment',
    paragraphs: [
      'Running PostgreSQL means owning database operations: provisioning, upgrades, credentials, backups, failover planning, monitoring, migration discipline, and performance tuning. That is extra work, but it comes with extra capability.',
      'Running SQLite often means there is no database service to administer at all. Operationally, that simplicity can be one of the biggest advantages in mobile, desktop, test, or edge environments.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Direction',
    paragraphs: [
      'PostgreSQL scales through ordinary server-side techniques such as better hardware, tuning, indexing, connection management, read replicas, partitioning strategies, and broader infrastructure design.',
      'SQLite scales best when the application architecture keeps data local or when each instance largely owns its own database file. It is excellent at that. It is much less compelling when the plan is many distributed writers all hitting the same shared operational database.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Fit',
    paragraphs: [
      'PostgreSQL appears throughout backend frameworks, managed services, internal platforms, SaaS products, and data-aware business systems. It fits organizations that treat the database as an independently operated service.',
      'SQLite appears everywhere local data matters: mobile operating systems, browsers, desktop tools, installers, embedded devices, offline-first applications, and test environments. Its ecosystem strength is not glamour. It is ubiquity inside software products.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'SQLite can be extremely fast when the workload is local and in-process because there is no network hop and little infrastructure overhead. That is why simplistic benchmark comparisons can be misleading if they ignore architecture.',
      'PostgreSQL wins when the problem needs a real database server: coordinated multi-user writes, shared services, access control, observability, and operational depth. The right performance comparison must always include the deployment model, not only query execution speed.',
    ],
  },
  {
    id: 'core-evolution',
    title: 'Growth and Migration Path',
    paragraphs: [
      'SQLite is often a superb starting point for a local app, but it can become constraining once the product shifts toward many concurrent users, centralized services, or multi-tenant operational backends.',
      'PostgreSQL is often chosen when teams want to avoid that architectural pivot later. At the same time, starting with PostgreSQL when the app is truly local-only can mean carrying unnecessary operational weight. The honest answer depends on the products likely growth path.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward PostgreSQL if many users or services share the data, concurrent writes are important, or the database is a strategic system-of-record service.',
      'Lean toward SQLite if the data is local to one app, one device, or one process and zero-admin deployment is a major advantage.',
      'If you are choosing for a local-first client app, SQLite is often ideal. If you are choosing for a shared backend platform, PostgreSQL is usually the correct default.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-connection',
    title: 'Connection Model',
    description:
      'The architectural difference shows up before the first table is created. PostgreSQL expects a server. SQLite opens a local file.',
    snippets: [
      {
        label: 'PostgreSQL',
        code: `const client = new Client({
  host: 'db.internal',
  database: 'app',
  user: 'service_user',
})

await client.connect()`,
      },
      {
        label: 'SQLite',
        code: `const db = new Database('app.db')

db.exec('PRAGMA foreign_keys = ON')`,
      },
    ],
    takeaway:
      'If the application should ship without a separate database service, SQLite has a major structural advantage.',
  },
  {
    id: 'examples-wal',
    title: 'Durability and Write Mode',
    description:
      'SQLite is often configured with WAL for smoother local concurrency, while PostgreSQL simply lives as a server process with write-ahead logging built into its normal operational model.',
    snippets: [
      {
        label: 'PostgreSQL',
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
        label: 'SQLite',
        code: `PRAGMA journal_mode = WAL;

BEGIN TRANSACTION;
UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;
COMMIT;`,
      },
    ],
    takeaway:
      'Both support transactions, but the surrounding concurrency story is different because one is embedded and the other is a server database.',
  },
  {
    id: 'examples-schema',
    title: 'Schema and Timestamp Defaults',
    description:
      'Both databases can express ordinary relational schemas, but PostgreSQL usually carries richer type semantics and server-oriented defaults.',
    snippets: [
      {
        label: 'PostgreSQL',
        code: `CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total_cents BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
      },
      {
        label: 'SQLite',
        code: `CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
      },
    ],
    takeaway:
      'For ordinary relational work both can look familiar. The deeper differences are operational, concurrency-related, and long-term architectural.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb keeps the comparison grounded in deployment model instead of vague database prestige.',
    snippets: [
      {
        label: 'PostgreSQL Rule',
        code: `If many users or services share the data
and concurrent writes are normal:
  choose PostgreSQL`,
      },
      {
        label: 'SQLite Rule',
        code: `If the data lives with one application
and zero-admin local durability is the goal:
  choose SQLite`,
      },
    ],
    takeaway:
      'Choosing by architecture almost always produces a better answer than choosing by which engine sounds more impressive.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  { term: 'Embedded Database', definition: 'A database engine linked into an application rather than run as a separate service.' },
  { term: 'Client-Server Database', definition: 'A database system that runs as its own service and accepts connections from separate client processes.' },
  { term: 'WAL', definition: 'Write-ahead logging, a durability and concurrency mechanism used in different ways by database engines.' },
  { term: 'System of Record', definition: 'The authoritative database where important application data is maintained over time.' },
  { term: 'Connection Pool', definition: 'A managed pool of reusable database connections typically used with server databases such as PostgreSQL.' },
  { term: 'Local-First', definition: 'An application design where data is stored and usable locally before or even without server synchronization.' },
  { term: 'Durability', definition: 'The guarantee that committed data survives crashes or restarts according to the systems design.' },
  { term: 'Concurrent Writers', definition: 'Multiple independent clients or sessions writing to the same database at roughly the same time.' },
  { term: 'Replica', definition: 'A secondary copy of a database used for availability, recovery, or read scaling.' },
  { term: 'PRAGMA', definition: 'A SQLite command used to configure engine behaviors and database settings.' },
  { term: 'TIMESTAMPTZ', definition: 'A PostgreSQL timestamp type that stores timezone-aware values.' },
  { term: 'Offline Sync', definition: 'A pattern where local data changes are later synchronized with a central system.' },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.pg-sqlite-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.pg-sqlite-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.pg-sqlite-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.pg-sqlite-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.pg-sqlite-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.pg-sqlite-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
}

.pg-sqlite-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.pg-sqlite-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.pg-sqlite-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.pg-sqlite-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.pg-sqlite-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.pg-sqlite-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.pg-sqlite-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pg-sqlite-help-toc-list li {
  margin: 0 0 8px;
}

.pg-sqlite-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.pg-sqlite-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.pg-sqlite-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.pg-sqlite-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.pg-sqlite-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.pg-sqlite-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.pg-sqlite-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.pg-sqlite-help-content p,
.pg-sqlite-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.pg-sqlite-help-content p {
  margin: 0 0 10px;
}

.pg-sqlite-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.pg-sqlite-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.pg-sqlite-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.pg-sqlite-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .pg-sqlite-help-main {
    grid-template-columns: 1fr;
  }

  .pg-sqlite-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .pg-sqlite-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    padding-left: 4px;
    white-space: normal;
  }
}
`

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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function PostgreSqlVsSqlitePage(): JSX.Element {
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
    document.title = `PostgreSQL vs SQLite (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'PostgreSQL vs SQLite',
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
    <div className="pg-sqlite-help-page">
      <style>{helpStyles}</style>
      <div className="pg-sqlite-help-window" role="presentation">
        <header className="pg-sqlite-help-titlebar">
          <span className="pg-sqlite-help-titletext">PostgreSQL vs SQLite</span>
          <div className="pg-sqlite-help-controls">
            <button className="pg-sqlite-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="pg-sqlite-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="pg-sqlite-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`pg-sqlite-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pg-sqlite-help-main">
          <aside className="pg-sqlite-help-toc" aria-label="Table of contents">
            <h2 className="pg-sqlite-help-toc-title">Contents</h2>
            <ul className="pg-sqlite-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="pg-sqlite-help-content">
            <h1 className="pg-sqlite-help-doc-title">PostgreSQL vs SQLite</h1>
            <p className="pg-sqlite-help-doc-subtitle">
              Manual-style comparison of architecture, deployment model, concurrency, and long-term tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="pg-sqlite-help-section">
                    <h2 className="pg-sqlite-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="pg-sqlite-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="pg-sqlite-help-section">
                  <h2 className="pg-sqlite-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="pg-sqlite-help-section">
                  <h2 className="pg-sqlite-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="pg-sqlite-help-subheading">{snippet.label}</h3>
                      <div className="pg-sqlite-help-codebox">
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
              <section id="glossary-terms" className="pg-sqlite-help-section">
                <h2 className="pg-sqlite-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
