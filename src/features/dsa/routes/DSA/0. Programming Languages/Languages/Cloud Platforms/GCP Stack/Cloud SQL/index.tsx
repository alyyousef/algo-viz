import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const cloudSqlHelpStyles = `
.cloudsql-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cloudsql-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.cloudsql-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cloudsql-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.cloudsql-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cloudsql-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.cloudsql-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cloudsql-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.cloudsql-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.cloudsql-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.cloudsql-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.cloudsql-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cloudsql-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloudsql-help-toc-list li {
  margin: 0 0 8px;
}

.cloudsql-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.cloudsql-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.cloudsql-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.cloudsql-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.cloudsql-help-section {
  margin: 0 0 20px;
}

.cloudsql-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cloudsql-help-content p,
.cloudsql-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cloudsql-help-content p {
  margin: 0 0 10px;
}

.cloudsql-help-content ul,
.cloudsql-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cloudsql-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.cloudsql-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.cloudsql-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .cloudsql-help-main {
    grid-template-columns: 1fr;
  }

  .cloudsql-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .cloudsql-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

const bigPictureSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cloud SQL is Google Cloud\'s managed relational database service for MySQL, PostgreSQL, and SQL Server. The simplest mental model is that it gives you a managed transactional database instance without asking you to operate the full database infrastructure stack yourself.',
      'It is designed for application databases, not for warehouse-scale analytics. The central concerns are transactions, schemas, indexes, connection management, backups, replicas, failover, and secure application connectivity.',
      'Adopting Cloud SQL usually means choosing managed operations for a familiar relational engine. The team still owns database design, query quality, schema evolution, and workload behavior, but a large share of instance management moves into the platform.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'Relational databases remain the default foundation for a huge amount of application state. Teams still need transactions, constraints, SQL semantics, joins, backups, read replicas, and stable operational workflows for core application data.',
      'Cloud SQL matters because many teams want those database capabilities without spending their time patching hosts, wiring failover by hand, or building every operational workflow from scratch.',
      'In a GCP stack, Cloud SQL often becomes the transactional persistence layer for web applications, internal systems, back-office tools, and service backends that want managed relational storage with familiar engine behavior.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Cloud SQL is strongest for OLTP-style application workloads, internal business systems, content and identity stores, and service backends that need a managed relational database rather than a custom-built database platform.',
      'It is a strong fit when the team wants MySQL, PostgreSQL, or SQL Server semantics and values managed backups, replication, maintenance handling, and standard connectivity patterns.',
      'It is a weaker fit for analytical warehousing, globally distributed low-latency data systems, or workloads that need more control than a managed single-engine relational service is intended to provide.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common workflow is to create an instance, choose engine and sizing, configure backups and high availability, connect an application through private IP or secure connectors, and then manage schema and query behavior through ordinary database tooling.',
      'Another common pattern is to use Cloud SQL as the primary transactional database behind a Cloud Run or GKE service, with read replicas for reporting or read-heavy application paths and automated backups for recovery.',
      'This matters because Cloud SQL is not just “database hosting.” It is managed relational operations combined with application-focused connectivity and lifecycle tooling.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Cloud SQL as managed relational infrastructure for application databases.',
      'You still own schema design, indexing, query quality, and workload shape even though the platform manages much of the infrastructure.',
      'Engine choice, connectivity model, backups, replicas, and high availability are core design decisions.',
      'Cloud SQL is about transactional application storage, not about data warehousing.',
      'Good Cloud SQL use depends on both database engineering discipline and solid cloud operational choices.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Managed does not mean automatic correctness',
    detail:
      'Cloud SQL can manage infrastructure tasks, but it cannot fix poor schema design, bad queries, or application misuse of connections and transactions.',
  },
  {
    title: 'Engine behavior still matters',
    detail:
      'The platform is managed, but MySQL, PostgreSQL, and SQL Server still have real engine-specific semantics, operational patterns, and tradeoffs.',
  },
  {
    title: 'Connectivity is part of architecture',
    detail:
      'How applications reach the database private IP, connectors, proxy patterns, and IAM-related access design are all part of the real system.',
  },
  {
    title: 'Availability and recovery are separate concerns',
    detail:
      'High availability reduces service disruption risk, while backups and point-in-time recovery help with restoration after data loss or logical mistakes.',
  },
  {
    title: 'Connections are a scaling resource',
    detail:
      'Database performance is shaped not only by CPU and storage but also by how application instances create, reuse, and limit connections.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-engines',
    title: 'Supported engines and workload fit',
    paragraphs: [
      'Cloud SQL supports MySQL, PostgreSQL, and SQL Server. That matters because Cloud SQL is not one generic database. It is a managed platform around familiar engines with different features, tuning considerations, and ecosystem expectations.',
      'Engine choice should follow application needs, team skills, and database semantics. PostgreSQL often fits applications that want richer SQL features and extensions. MySQL often fits ecosystems that already standardize on it. SQL Server matters when Microsoft stack compatibility is a core requirement.',
      'The practical lesson is to choose the engine first for database reasons, then choose Cloud SQL as the managed operating model around that engine.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Instance model and resource architecture',
    paragraphs: [
      'Cloud SQL revolves around managed database instances. Sizing choices such as CPU, memory, storage, availability mode, and region shape the operational behavior of that instance.',
      'The platform manages infrastructure-level tasks, but the instance is still a real database system with state, maintenance windows, quotas, and workload limits. It should be treated as a production dependency, not an abstract utility.',
      'Architecturally, Cloud SQL often sits behind application services such as Cloud Run, GKE, or Compute Engine applications. That means instance design should be evaluated together with application scaling behavior, not in isolation.',
    ],
  },
  {
    id: 'core-connectivity',
    title: 'Connection models, connectors, and the Auth Proxy',
    paragraphs: [
      'Application connectivity is one of the most important Cloud SQL design areas. Teams can use private IP, language connectors, and secure proxy-style approaches such as the Cloud SQL Auth Proxy depending on architecture and networking needs.',
      'This matters because database reliability is strongly affected by how applications open and manage connections. A secure, consistent connection model is often more important operationally than minor instance tuning differences.',
      'A useful architectural rule is to standardize the connection approach per platform. If every service connects differently, debugging and security governance become harder than they need to be.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Schema design, indexing, and query discipline',
    paragraphs: [
      'Cloud SQL manages infrastructure, not database quality. Schema design, constraints, indexing strategy, and query patterns remain the responsibility of the engineering team.',
      'Relational performance problems often begin at the application layer: missing indexes, broad scans, bad transaction boundaries, chatty ORM usage, or unbounded connection growth.',
      'The right operational mindset is to treat Cloud SQL like a managed engine that still needs serious database engineering. If the workload is poorly designed, the platform cannot rescue it automatically.',
    ],
  },
  {
    id: 'core-ha',
    title: 'High availability and failover',
    paragraphs: [
      'High availability in Cloud SQL is about reducing disruption when underlying infrastructure or the primary instance has a problem. It is not the same thing as logical backup or historical recovery.',
      'Teams should think of HA as a continuity mechanism for infrastructure failure scenarios and point-in-time recovery or backup restore as the mechanisms for recovering from data loss, operator mistakes, or bad writes.',
      'This distinction matters because many teams initially think backups and HA solve the same problem. They do not. A resilient database strategy usually needs both.',
    ],
  },
  {
    id: 'core-backups',
    title: 'Backups and point-in-time recovery',
    paragraphs: [
      'Backups are central to Cloud SQL operations. They protect against catastrophic loss, destructive changes, and the need to restore to a known earlier state.',
      'Point-in-time recovery extends that recovery model by letting teams restore to a specific historical moment within a retention window rather than only to the time of a full backup snapshot.',
      'The key lesson is that backup strategy is not a checkbox. Teams should know what their restore path is, how long it takes, and what data-loss window is acceptable for the application.',
    ],
  },
  {
    id: 'core-replicas',
    title: 'Read replicas and read scaling',
    paragraphs: [
      'Read replicas help distribute read-heavy workloads and can support reporting or geographically closer reads depending on engine capabilities and architecture.',
      'They are useful when the main issue is read pressure rather than write bottlenecks, but they do not turn a transactional relational database into an infinitely scalable globally distributed platform.',
      'A practical rule is to use replicas to protect the primary and separate read-heavy patterns, while remembering that replication lag and consistency expectations still matter.',
    ],
  },
  {
    id: 'core-security',
    title: 'IAM, database users, and security boundaries',
    paragraphs: [
      'Cloud SQL security has multiple layers: Google Cloud IAM for instance-level control, network and connector boundaries for transport, and engine-level users and permissions for database access.',
      'Some environments also use IAM database authentication patterns where appropriate, which can simplify credential management and align access with cloud identities.',
      'The important design point is that database access is never only about the password. Instance permissions, service identities, network exposure, and application roles all matter together.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, sizing, and connection management',
    paragraphs: [
      'Cloud SQL performance is shaped by instance size, storage characteristics, query quality, indexing, transaction shape, and connection behavior. It is usually a mistake to think of performance only as CPU or memory.',
      'Connection management is especially important in cloud-native systems. Highly scalable app platforms can overwhelm a relational database with too many concurrent connections if pooling and access discipline are weak.',
      'A strong performance habit is to treat connection count, query latency, slow queries, index health, and read-write balance as one combined performance problem rather than separate concerns.',
    ],
  },
  {
    id: 'core-maintenance',
    title: 'Maintenance, upgrades, and operational lifecycle',
    paragraphs: [
      'Managed databases still have maintenance events, engine upgrades, storage growth decisions, and lifecycle planning. The benefit is that the platform handles much of the operational mechanism, not that lifecycle stops existing.',
      'Teams should still plan for maintenance windows, test version upgrades, understand compatibility risk, and treat schema and engine evolution as a long-term operating concern.',
      'The lesson is straightforward: Cloud SQL reduces toil, but it does not eliminate the need for disciplined production database ownership.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and common service pairings',
    paragraphs: [
      'Cloud SQL commonly appears beside Cloud Run, GKE, Compute Engine, Secret Manager, Cloud Build, and VPC networking components. That is because the database is usually one part of a broader application platform.',
      'The ecosystem fit matters because application scaling, deployment, and identity directly affect database behavior. A transactional database does not live in isolation from the compute platform using it.',
      'This is one reason Cloud SQL architecture should be discussed alongside application architecture rather than treated as a standalone infrastructure procurement decision.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with BigQuery, Cloud SQL is for transactional application storage rather than analytical warehousing. If the question is OLTP, Cloud SQL may fit; if the question is large-scale analytics, BigQuery usually fits better.',
      'Compared with self-managed databases, Cloud SQL reduces operational burden significantly, but it gives up some low-level control and custom infrastructure flexibility.',
      'Compared with globally distributed or highly specialized database platforms, Cloud SQL remains a managed relational service first. Its strength is operational familiarity and managed infrastructure, not solving every possible database scaling model.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Treating a managed relational database as if the platform will fix poor schema and query design automatically.',
      'Ignoring connection pooling and overwhelming the database from rapidly scaling application services.',
      'Confusing high availability with backup and restore strategy.',
      'Using the wrong engine for organizational or technical reasons and then forcing the workload to compensate.',
      'Exposing database access paths more broadly than necessary.',
      'Letting read-heavy reporting workloads compete with transactional traffic on the primary without a deliberate replica or architecture strategy.',
      'Handling upgrades and maintenance reactively instead of as a planned operational lifecycle.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Use Cloud SQL when you need a managed transactional relational database with familiar engine semantics.',
      'Choose the engine for database reasons first, then choose Cloud SQL as the operating model.',
      'Design connectivity, pooling, and IAM as seriously as schema and indexing.',
      'Plan separately for availability, backup, and restore.',
      'Use replicas deliberately for read scaling, not as a substitute for broader architecture decisions.',
      'Treat database engineering and cloud operations as one combined responsibility.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Cloud SQL, they usually become more deliberate about failover posture, PITR, read replica strategy, IAM database auth, connector standardization, and upgrade planning.',
      'These practices matter because the database is often the most stateful and hardest-to-replace part of the system. Managed infrastructure helps, but strong operational discipline matters even more as system importance grows.',
      'The practical lesson is that Cloud SQL is simple to start with, but it becomes most valuable when treated as a serious production database platform with clear ownership and operational standards.',
    ],
  },
]

const examples = [
  {
    title: 'Create a PostgreSQL instance from the CLI',
    code: `gcloud sql instances create app-db \
  --database-version=POSTGRES_16 \
  --cpu=2 \
  --memory=7680MB \
  --region=us-central1`,
    explanation:
      'This is the basic Cloud SQL provisioning flow: choose engine, version, sizing, and region, then let the platform manage the underlying database infrastructure.',
  },
  {
    title: 'Create an application database and user',
    code: `gcloud sql databases create app \
  --instance=app-db

gcloud sql users create app_user \
  --instance=app-db \
  --password='replace-me'`,
    explanation:
      'Managed infrastructure does not remove normal relational concerns. Databases, users, and privileges still need to be modeled deliberately for the application.',
  },
  {
    title: 'Connect through the Cloud SQL Auth Proxy',
    code: `./cloud-sql-proxy PROJECT_ID:us-central1:app-db

psql "host=127.0.0.1 port=5432 dbname=app user=app_user password=replace-me"`,
    explanation:
      'The Auth Proxy is a common secure connectivity pattern. It simplifies application access and avoids exposing raw database connectivity more broadly than necessary.',
  },
  {
    title: 'Create a read replica',
    code: `gcloud sql instances create app-db-replica \
  --master-instance-name=app-db \
  --region=us-east1`,
    explanation:
      'Read replicas are useful for offloading read-heavy workloads and separating transactional traffic from reporting or geographically distributed reads.',
  },
  {
    title: 'Enable high availability and backups deliberately',
    code: `gcloud sql instances patch app-db \
  --availability-type=REGIONAL \
  --backup-start-time=03:00`,
    explanation:
      'Availability and backup posture should be explicit platform choices. They affect both resilience and the operational recovery path.',
  },
  {
    title: 'Use a connector-style application configuration',
    code: `DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=app
DATABASE_USER=app_user`,
    explanation:
      'Many application platforms standardize connectivity through a proxy or connector pattern. The details vary by runtime, but the design goal stays the same: safe, repeatable, and reviewable application database access.',
  },
]

const glossaryTerms = [
  {
    term: 'Instance',
    definition: 'The managed Cloud SQL database resource that runs a selected relational engine version and configuration.',
  },
  {
    term: 'High availability',
    definition: 'A deployment posture that reduces service disruption risk during certain infrastructure failure scenarios.',
  },
  {
    term: 'Backup',
    definition: 'A recoverable stored snapshot or backup set used to restore database state after loss or error.',
  },
  {
    term: 'Point-in-time recovery',
    definition: 'A recovery capability that restores the database to a specific historical moment within a supported retention window.',
  },
  {
    term: 'Read replica',
    definition: 'A replicated secondary instance used primarily for read scaling or workload separation.',
  },
  {
    term: 'Private IP',
    definition: 'A connectivity model where applications reach the database through private networking rather than public access.',
  },
  {
    term: 'Cloud SQL Auth Proxy',
    definition: 'A connectivity helper that simplifies secure application or operator access to Cloud SQL instances.',
  },
  {
    term: 'Connector',
    definition: 'A language or platform integration path used to connect applications to Cloud SQL securely and consistently.',
  },
  {
    term: 'IAM database authentication',
    definition: 'A database access model that uses Google Cloud IAM identities for supported authentication patterns.',
  },
  {
    term: 'Connection pooling',
    definition: 'A strategy for reusing database connections efficiently instead of opening a new connection for every operation.',
  },
  {
    term: 'Maintenance window',
    definition: 'A planned time period when platform maintenance activity may be applied to the managed database instance.',
  },
  {
    term: 'OLTP',
    definition: 'Online transaction processing, the class of workload Cloud SQL is generally intended to support.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-fit', label: 'Where It Fits Best' },
    { id: 'bp-workflow', label: 'Typical Workflow' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-engines', label: 'Supported Engines' },
    { id: 'core-architecture', label: 'Instance Architecture' },
    { id: 'core-connectivity', label: 'Connectivity Models' },
    { id: 'core-operations', label: 'Schema and Query Discipline' },
    { id: 'core-ha', label: 'High Availability' },
    { id: 'core-backups', label: 'Backups and PITR' },
    { id: 'core-replicas', label: 'Read Replicas' },
    { id: 'core-security', label: 'Security and IAM' },
    { id: 'core-performance', label: 'Performance and Sizing' },
    { id: 'core-maintenance', label: 'Maintenance and Upgrades' },
    { id: 'core-ecosystem', label: 'Ecosystem' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-antipatterns', label: 'Common Mistakes' },
    { id: 'core-decision', label: 'Decision Checklist' },
    { id: 'core-advanced', label: 'Advanced Capabilities' },
  ],
  examples: examples.map((example, index) => ({
    id: `example-${index + 1}`,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GCPCloudSQLPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `GCP Cloud SQL (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Cloud SQL',
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="cloudsql-help-page">
      <style>{cloudSqlHelpStyles}</style>
      <div className="cloudsql-help-window" role="presentation">
        <header className="cloudsql-help-titlebar">
          <span className="cloudsql-help-title">GCP Cloud SQL</span>
          <div className="cloudsql-help-controls">
            <button className="cloudsql-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="cloudsql-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cloudsql-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`cloudsql-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cloudsql-help-main">
          <aside className="cloudsql-help-toc" aria-label="Table of contents">
            <h2 className="cloudsql-help-toc-title">Contents</h2>
            <ul className="cloudsql-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cloudsql-help-content">
            <h1 className="cloudsql-help-doc-title">GCP Cloud SQL</h1>
            <p className="cloudsql-help-doc-subtitle">Managed relational databases for MySQL, PostgreSQL, and SQL Server workloads</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact Cloud SQL manual: what the service is,
              how it fits into transactional application architecture, and which design choices matter for engine selection,
              connectivity, recovery, performance, and secure operations.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="cloudsql-help-section">
                    <h2 className="cloudsql-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="cloudsql-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="cloudsql-help-section">
                  <h2 className="cloudsql-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="cloudsql-help-section">
                    <h2 className="cloudsql-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
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
                {examples.map((example, index) => (
                  <section key={example.title} id={`example-${index + 1}`} className="cloudsql-help-section">
                    <h2 className="cloudsql-help-heading">{example.title}</h2>
                    <div className="cloudsql-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cloudsql-help-section">
                <h2 className="cloudsql-help-heading">Glossary</h2>
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
