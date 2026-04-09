import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type TopicLink = {
  id: string
  label: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, TopicLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-service-map', label: 'Service Map' },
    { id: 'bp-mental-model', label: 'Architectural Mindset' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-governance', label: 'Projects and Governance' },
    { id: 'core-infrastructure', label: 'Global Infrastructure' },
    { id: 'core-security', label: 'Identity and Security' },
    { id: 'core-networking', label: 'Networking and Delivery' },
    { id: 'core-compute', label: 'Compute Layer' },
    { id: 'core-storage', label: 'Storage Layer' },
    { id: 'core-data', label: 'Databases and Analytics' },
    { id: 'core-integration', label: 'Messaging and Eventing' },
    { id: 'core-operations', label: 'Operations and Platform Tooling' },
    { id: 'core-cost', label: 'Cost, Reliability, and Tradeoffs' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: [
    { id: 'ex-web', label: 'Web Platform' },
    { id: 'ex-event', label: 'Event Pipeline' },
    { id: 'ex-containers', label: 'Container Platform' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      'GCP Stack means the core Google Cloud Platform ecosystem: the services and architectural layers teams combine to run applications, data systems, internal tools, and platform infrastructure. It is not one framework. It is a broad collection of managed primitives for compute, storage, networking, identity, observability, data, and automation.',
  },
  {
    title: 'Why teams adopt it',
    details:
      'Organizations choose GCP when they want strong managed infrastructure, mature data and analytics tooling, Kubernetes-native platform options, global networking, and a service model that often feels streamlined around platform APIs and automation.',
  },
  {
    title: 'How to think about the stack',
    details:
      'The right mental model is responsibility-driven architecture. Decide how code runs, how traffic enters, where state lives, how services authenticate, how events move, and how the system is deployed and observed. GCP offers several options at each layer, so the key question is usually which service matches the workload with the least complexity.',
  },
  {
    title: 'What problem it solves',
    details:
      'GCP lets teams outsource infrastructure primitives while keeping control over service boundaries, scaling, security, and automation. It can support simple web applications, serverless systems, global APIs, data-intensive platforms, and internal engineering infrastructure.',
  },
]

const serviceMap = [
  {
    title: 'Foundation services',
    detail:
      'Organizations, folders, projects, IAM, Cloud DNS, VPC, Cloud Resource Manager, service accounts, Secret Manager, and audit logging establish the governance, identity, provisioning, and policy baseline for the environment.',
  },
  {
    title: 'Compute services',
    detail:
      'Compute Engine provides VMs, Cloud Run provides managed container execution, App Engine provides managed application hosting, Cloud Functions provides serverless functions, and GKE provides managed Kubernetes.',
  },
  {
    title: 'Storage and data services',
    detail:
      'Cloud Storage, persistent disks, Filestore, Cloud SQL, Spanner, Firestore, Bigtable, BigQuery, and allied services cover object, block, file, transactional, analytical, and large-scale data workloads.',
  },
  {
    title: 'Integration services',
    detail:
      'API Gateway, Pub/Sub, Eventarc, Workflows, and Cloud Tasks connect systems without forcing everything into direct synchronous service dependencies.',
  },
  {
    title: 'Operations services',
    detail:
      'Cloud Logging, Cloud Monitoring, Error Reporting, Trace, Audit Logs, Security Command Center, and deployment tooling make the platform manageable in production.',
  },
]

const architecturalMindset = [
  {
    title: 'Use platform boundaries deliberately',
    detail:
      'Static assets, public APIs, asynchronous workers, event pipelines, and durable state should each live in services built for that responsibility. GCP architectures are easiest to operate when delivery, execution, persistence, and orchestration are separated cleanly.',
  },
  {
    title: 'Treat projects as real platform boundaries',
    detail:
      'A GCP project is not just a console grouping. It is a billing, quota, IAM, API enablement, and operational boundary. Good project structure is part of system design, not a cleanup step.',
  },
  {
    title: 'Prefer managed services unless lower-level control is the actual requirement',
    detail:
      'A managed queue, managed database, or managed execution platform usually beats rebuilding the same capability on raw VMs if the team does not need that extra control.',
  },
]

const keyTakeaways = [
  'GCP Stack is a set of platform primitives, not one application framework.',
  'Projects, IAM, networking, and observability decisions shape the platform before individual workload services do.',
  'Managed services reduce operational burden but do not remove responsibility for data design, retries, failure isolation, and security.',
  'The best GCP architecture is usually the one with the fewest moving parts that still satisfies reliability, scale, latency, and governance needs.',
  'Standard patterns for project layout, service accounts, logging, CI/CD, and secret handling matter early.',
]

const governanceConcepts = [
  {
    title: 'Organizations, folders, and projects',
    detail:
      'Organizations and folders provide large-scale hierarchy and policy structure, while projects act as the major workload boundary for billing, IAM, service enablement, and quotas.',
  },
  {
    title: 'Project layout as architecture',
    detail:
      'Separate projects reduce blast radius, improve cost attribution, and make policy and service-account design easier. They should be chosen intentionally, not only by team convenience.',
  },
  {
    title: 'Shared platform projects',
    detail:
      'Larger environments often dedicate projects to shared networking, observability, container registries, CI/CD, or centralized security services so application teams inherit common baselines.',
  },
]

const infrastructureConcepts = [
  {
    title: 'Regions and zones',
    detail:
      'GCP regions and zones affect latency, availability, and recovery design. Multi-zone patterns improve resilience, while multi-region decisions add cost and operational complexity but can improve continuity.',
  },
  {
    title: 'Global network model',
    detail:
      'GCP is often appreciated for its strong global networking model. That matters for distributed APIs, edge exposure, load balancing, and cross-region traffic patterns.',
  },
  {
    title: 'Availability design',
    detail:
      'Reliability comes from workload placement, managed-service replication behavior, and sensible failover design rather than from any one infrastructure primitive alone.',
  },
]

const securityConcepts = [
  {
    title: 'IAM and service accounts',
    detail:
      'GCP identity design usually centers on IAM roles, principals, and service accounts. Workload identity and least-privilege service-account assignment are core operational patterns.',
  },
  {
    title: 'Secret and key management',
    detail:
      'Secret Manager and service-native encryption help keep credentials out of source code and manual configuration. Teams should prefer short-lived and scoped access wherever possible.',
  },
  {
    title: 'Policy and auditability',
    detail:
      'Audit Logs, organization policies, and service-account governance matter once multiple teams or systems share the same cloud estate.',
  },
]

const networkingConcepts = [
  {
    title: 'VPC and subnet design',
    detail:
      'VPC design controls network boundaries, routing, service exposure, and private connectivity. Subnets, firewall rules, Cloud NAT, and private-service access influence both security posture and operational complexity.',
  },
  {
    title: 'Traffic entry and exposure',
    detail:
      'Global load balancers, API Gateway, Cloud Run ingress, CDN, and DNS layers each solve different public exposure problems. The correct edge pattern changes latency, caching, and operational shape.',
  },
  {
    title: 'Private and hybrid connectivity',
    detail:
      'VPC peering, Shared VPC, VPN, Interconnect, and private-service connectivity matter when systems span multiple projects or hybrid environments.',
  },
]

const computeConcepts = [
  {
    title: 'Compute Engine',
    detail:
      'Compute Engine offers VM-level control and fits custom runtimes, stateful services, legacy systems, and workloads that need full host customization. It also leaves more operational work with the team.',
  },
  {
    title: 'Cloud Run and Cloud Functions',
    detail:
      'Cloud Run is a strong default for many stateless HTTP or event-driven containerized services, while Cloud Functions fits smaller event-triggered execution units. Both reduce host management but still require careful dependency and scaling design.',
  },
  {
    title: 'GKE',
    detail:
      'Google Kubernetes Engine is appropriate when teams really need Kubernetes abstractions, controllers, scheduling flexibility, or ecosystem integrations. It offers power, but it expands the operational surface area.',
  },
]

const storageConcepts = [
  {
    title: 'Cloud Storage',
    detail:
      'Cloud Storage is the default object store for assets, backups, archives, exported data, ingestion files, and data-lake style storage. Many GCP workflows either begin with object arrival or end by writing durable outputs there.',
  },
  {
    title: 'Persistent disks and file services',
    detail:
      'Persistent disks and file-oriented services support workloads that need block or shared file semantics rather than object storage. These are especially relevant for VM-based and some stateful container workloads.',
  },
  {
    title: 'Lifecycle and retention',
    detail:
      'Storage design includes access classes, retention rules, replication, backup, and data lifecycle management. Durable storage choices should match access patterns and recovery objectives.',
  },
]

const dataConcepts = [
  {
    title: 'Cloud SQL and transactional databases',
    detail:
      'Cloud SQL is a strong fit for managed relational workloads that need standard transactional behavior, SQL semantics, and reduced database operations burden.',
  },
  {
    title: 'Spanner, Firestore, and Bigtable',
    detail:
      'GCP also offers specialized data systems for globally distributed transactional workloads, document-style application state, and large-scale low-latency key-value access. The correct choice depends on access patterns and consistency needs.',
  },
  {
    title: 'BigQuery and analytical systems',
    detail:
      'BigQuery is one of the most important services in the GCP ecosystem because it turns large-scale analytical querying into a first-class managed platform capability rather than an afterthought attached to operational databases.',
  },
]

const integrationConcepts = [
  {
    title: 'API and application boundaries',
    detail:
      'API Gateway, load balancers, Cloud Run ingress, and CDN layers solve different exposure problems. The edge layer affects routing, security, caching, and developer experience.',
  },
  {
    title: 'Messaging and eventing',
    detail:
      'Pub/Sub, Eventarc, and Cloud Tasks help systems communicate asynchronously. These services are how GCP architectures avoid turning every dependency into a synchronous request chain.',
  },
  {
    title: 'Workflow and orchestration',
    detail:
      'Workflows and event-driven coordination services make multi-step processes explicit. They are useful when retries, branching, and long-running sequences should not be buried inside one worker.',
  },
]

const operationsConcepts = [
  {
    title: 'Infrastructure as code',
    detail:
      'Terraform and GCP-native provisioning patterns turn cloud environments into versioned definitions. Manual console work does not scale for review, repeatability, or disaster recovery.',
  },
  {
    title: 'Observability',
    detail:
      'Cloud Logging, Cloud Monitoring, Trace, Error Reporting, and dashboards should be designed around service health and failure signals that matter to the system, not just around collecting logs.',
  },
  {
    title: 'Security and audit operations',
    detail:
      'Audit Logs, security scanning, policy controls, and centralized visibility become essential as more teams and projects share the same environment.',
  },
]

const costAndTradeoffs = [
  {
    title: 'Cost shape follows workload shape',
    detail:
      'Serverless, VM-based, and container-based systems spend money differently. Idle capacity, egress, storage retention, and analytics usage often matter as much as the chosen compute service.',
  },
  {
    title: 'Reliability still comes from design',
    detail:
      'Managed services help, but resilient systems still require retries, idempotency, backpressure, redundancy choices, backups, and practiced recovery paths.',
  },
  {
    title: 'Higher abstractions reduce host work but constrain control',
    detail:
      'Cloud Run or Functions usually reduce operational burden substantially, while GKE or raw VMs provide more control but also raise platform complexity. There is no universally correct layer.',
  },
]

const designChecklist = [
  'Choose project boundaries deliberately rather than collapsing everything into one project.',
  'Start with service-account discipline, IAM, logging, tagging or labeling, and secret handling early.',
  'Use managed services by default and justify lower-level infrastructure with a concrete requirement.',
  'Design ingress, private networking, and event boundaries explicitly.',
  'Pick storage and database services according to access patterns, durability, and operational tolerance.',
  'Prefer queues and events when work can be asynchronous.',
  'Codify infrastructure and deployment flow in version control.',
  'Model service-boundary failure: retries, timeouts, throttling, poison work items, and recovery paths.',
]

const examples = [
  {
    id: 'ex-web',
    title: 'Web platform with managed frontend and API',
    intro:
      'A common GCP architecture serves static assets from Cloud Storage plus CDN, exposes APIs through a load balancer or API Gateway, runs backend code on Cloud Run, and stores state in Cloud SQL or Firestore.',
    code: `Resources:
  CloudStorageBucket
  CloudCDN
  ApiGateway
  CloudRunService
  CloudSqlInstance`,
    takeaway:
      'This pattern keeps delivery, API routing, application execution, and persistence in separate managed layers that can evolve independently.',
  },
  {
    id: 'ex-event',
    title: 'Event-driven processing pipeline',
    intro:
      'When user-facing systems should not block on all downstream work, the application accepts the request, emits a Pub/Sub message or event, and lets background services complete the process asynchronously.',
    code: `await pubsub.topic('orders').publishMessage({
  json: {
    orderId,
    eventType: 'order.submitted',
  },
})`,
    takeaway:
      'Pub/Sub boundaries absorb bursts and keep one dependency failure from immediately becoming user-facing latency everywhere.',
  },
  {
    id: 'ex-containers',
    title: 'Container platform with Cloud Run or GKE',
    intro:
      'For long-running HTTP services or internal APIs, a common GCP pattern uses Cloud Run for simpler stateless containers or GKE for full Kubernetes control, with Cloud SQL or managed stores for state and Cloud Monitoring for telemetry.',
    code: `service payments {
  image   = "us-central1-docker.pkg.dev/project/payments:2026-04-09"
  runtime = "cloud-run"
  ingress = "internal"
  data    = "cloud-sql"
}`,
    takeaway:
      'Cloud Run is a strong default when the team wants containers without taking on full Kubernetes platform operations.',
  },
]

const glossary = [
  {
    term: 'Project',
    definition: 'A major GCP billing, IAM, quota, and service-enablement boundary.',
  },
  {
    term: 'Service account',
    definition: 'An identity used by workloads and automation to access GCP services.',
  },
  {
    term: 'VPC',
    definition: 'The virtual network boundary for routing, segmentation, and connectivity.',
  },
  { term: 'Cloud Run', definition: 'Managed stateless container execution platform.' },
  { term: 'GKE', definition: 'Managed Kubernetes service on Google Cloud.' },
  {
    term: 'Cloud Storage',
    definition: 'Managed object storage for assets, archives, backups, and data files.',
  },
  { term: 'Pub/Sub', definition: 'Managed asynchronous messaging and event delivery service.' },
  { term: 'BigQuery', definition: 'Managed analytical data warehouse and query platform.' },
  { term: 'Cloud SQL', definition: 'Managed relational database service.' },
  {
    term: 'Firestore',
    definition: 'Managed document database for application state and sync-style workloads.',
  },
  {
    term: 'Eventarc',
    definition: 'Event routing service for event-driven integrations across GCP services.',
  },
  {
    term: 'Audit Logs',
    definition: 'Logs that record administrative and data-access activity in GCP.',
  },
]

const gcpStackHelpStyles = `
.gcp-stack-help-page { min-height: 100dvh; background: #c0c0c0; color: #000; font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif; }
.gcp-stack-help-window { min-height: 100dvh; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; display: flex; flex-direction: column; box-sizing: border-box; }
.gcp-stack-help-titlebar { position: relative; display: flex; align-items: center; min-height: 24px; padding: 2px 4px; background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: #fff; font-size: 13px; font-weight: 700; }
.gcp-stack-help-title { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 14px; }
.gcp-stack-help-controls { display: flex; gap: 2px; margin-left: auto; }
.gcp-stack-help-control { width: 18px; height: 16px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: 1px solid #404040; background: #c0c0c0; color: #000; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; line-height: 1; cursor: pointer; }
.gcp-stack-help-tabs { display: flex; flex-wrap: wrap; gap: 1px; padding: 6px 8px 0; background: #c0c0c0; }
.gcp-stack-help-tab { border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: none; background: #b6b6b6; padding: 5px 10px 4px; color: #000; font: inherit; font-size: 12px; cursor: pointer; }
.gcp-stack-help-tab.is-active { position: relative; top: 1px; background: #fff; }
.gcp-stack-help-main { display: grid; grid-template-columns: 232px minmax(0, 1fr); flex: 1; min-height: 0; border-top: 1px solid #404040; background: #fff; }
.gcp-stack-help-toc { overflow: auto; border-right: 1px solid #808080; background: #efefef; padding: 12px; }
.gcp-stack-help-toc-title { margin: 0 0 10px; font-size: 12px; font-weight: 700; }
.gcp-stack-help-toc-list { list-style: none; margin: 0; padding: 0; }
.gcp-stack-help-toc-list li { margin: 0 0 8px; }
.gcp-stack-help-toc-list a { color: #000; text-decoration: none; font-size: 12px; }
.gcp-stack-help-content { overflow: auto; padding: 16px 20px 22px; }
.gcp-stack-help-doc-title { margin: 0 0 12px; font-size: 20px; font-weight: 700; }
.gcp-stack-help-intro { margin: 0 0 16px; font-size: 12px; line-height: 1.5; }
.gcp-stack-help-section { margin: 0 0 22px; }
.gcp-stack-help-heading { margin: 0 0 8px; font-size: 16px; font-weight: 700; }
.gcp-stack-help-subheading { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
.gcp-stack-help-content p, .gcp-stack-help-content li { font-size: 12px; line-height: 1.5; }
.gcp-stack-help-content p { margin: 0 0 10px; }
.gcp-stack-help-content ul { margin: 0 0 10px 18px; padding: 0; }
.gcp-stack-help-divider { margin: 14px 0; border: 0; border-top: 1px solid #d0d0d0; }
.gcp-stack-help-codebox { margin: 6px 0 10px; padding: 8px; background: #f4f4f4; border-top: 2px solid #808080; border-left: 2px solid #808080; border-right: 2px solid #fff; border-bottom: 2px solid #fff; }
.gcp-stack-help-codebox code { display: block; font-family: "Courier New", Courier, monospace; font-size: 12px; white-space: pre-wrap; }
@media (max-width: 900px) { .gcp-stack-help-main { grid-template-columns: 1fr; } .gcp-stack-help-toc { border-right: none; border-bottom: 1px solid #808080; } }
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function GcpStackPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(currentTab) ? currentTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
  const tocSections = sectionLinks[activeTab]

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)

    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }

    document.title = `GCP Stack (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Stack',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }

    let parsedTasks: Array<{ id: string }> = []

    try {
      const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    } catch {
      parsedTasks = []
    }

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
    <div className="gcp-stack-help-page">
      <style>{gcpStackHelpStyles}</style>
      <div className="gcp-stack-help-window" role="presentation">
        <header className="gcp-stack-help-titlebar">
          <span className="gcp-stack-help-title">GCP Stack - Help</span>
          <div className="gcp-stack-help-controls">
            <button
              className="gcp-stack-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="gcp-stack-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="gcp-stack-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gcp-stack-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams)
                nextParams.set('tab', tab.id)
                setSearchParams(nextParams, { replace: true })
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="gcp-stack-help-main">
          <aside className="gcp-stack-help-toc" aria-label="Table of contents">
            <h2 className="gcp-stack-help-toc-title">Contents</h2>
            <ul className="gcp-stack-help-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="gcp-stack-help-content">
            <h1 className="gcp-stack-help-doc-title">GCP Stack</h1>
            <p className="gcp-stack-help-intro">
              GCP is broad enough that "the GCP stack" can mean a serverless application, a Cloud
              Run platform, a Kubernetes environment, or a data-heavy analytics system. This page
              treats GCP as a platform model: the major layers, the service families, the tradeoffs,
              and the architectural patterns that recur across real systems built on Google Cloud.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="gcp-stack-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  ))}
                </section>

                <hr className="gcp-stack-help-divider" />

                <section id="bp-service-map" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Service Map</h2>
                  {serviceMap.map((item) => (
                    <div key={item.title}>
                      <h3 className="gcp-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="gcp-stack-help-divider" />

                <section id="bp-mental-model" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Architectural Mindset</h2>
                  {architecturalMindset.map((item) => (
                    <div key={item.title}>
                      <h3 className="gcp-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="gcp-stack-help-divider" />

                <section id="bp-takeaways" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-governance" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Projects and Governance</h2>
                  {governanceConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-infrastructure" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Global Infrastructure</h2>
                  {infrastructureConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-security" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Identity and Security</h2>
                  {securityConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-networking" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Networking and Delivery</h2>
                  {networkingConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compute" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Compute Layer</h2>
                  {computeConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-storage" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Storage Layer</h2>
                  {storageConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-data" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Databases and Analytics</h2>
                  {dataConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-integration" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Messaging and Eventing</h2>
                  {integrationConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Operations and Platform Tooling</h2>
                  {operationsConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cost" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Cost, Reliability, and Tradeoffs</h2>
                  {costAndTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="gcp-stack-help-section">
                  <h2 className="gcp-stack-help-heading">Design Checklist</h2>
                  <ul>
                    {designChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="gcp-stack-help-section">
                    <h2 className="gcp-stack-help-heading">{example.title}</h2>
                    <p>{example.intro}</p>
                    <div className="gcp-stack-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="gcp-stack-help-section">
                <h2 className="gcp-stack-help-heading">Glossary</h2>
                {glossary.map((item) => (
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
