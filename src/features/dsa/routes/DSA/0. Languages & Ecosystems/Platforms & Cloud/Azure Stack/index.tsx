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
    { id: 'core-governance', label: 'Tenants and Governance' },
    { id: 'core-infrastructure', label: 'Global Footprint' },
    { id: 'core-security', label: 'Identity and Security' },
    { id: 'core-networking', label: 'Networking and Delivery' },
    { id: 'core-compute', label: 'Compute Layer' },
    { id: 'core-storage', label: 'Storage Layer' },
    { id: 'core-data', label: 'Databases and Analytics' },
    { id: 'core-integration', label: 'Messaging and Integration' },
    { id: 'core-operations', label: 'Operations and Platform Tooling' },
    { id: 'core-cost', label: 'Cost, Reliability, and Tradeoffs' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: [
    { id: 'ex-web', label: 'Web Platform' },
    { id: 'ex-event', label: 'Event System' },
    { id: 'ex-containers', label: 'Container Platform' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Azure Stack, as used by this page, means the core Azure cloud platform ecosystem: the major services and architectural layers teams combine to run applications, data systems, internal tools, and platform infrastructure.',
  },
  {
    title: 'Why teams adopt it',
    details:
      'Organizations choose Azure when they want strong Microsoft ecosystem integration, centralized enterprise identity through Entra ID, broad managed-service coverage, and practical governance tooling for subscriptions, policy, networking, and operations.',
  },
  {
    title: 'How to think about the stack',
    details:
      'The right mental model is responsibility-driven architecture. Decide how code runs, how services authenticate, where data lives, how traffic enters, how events move, and how deployments and monitoring work. Azure offers several valid options at each layer, so the real design task is choosing the simplest service that matches the workload.',
  },
  {
    title: 'What problem it solves',
    details:
      'Azure lets teams outsource commodity infrastructure while still retaining control over application boundaries, scaling, security, and automation. It supports everything from small line-of-business apps to enterprise internal platforms and global public systems.',
  },
]

const serviceMap = [
  {
    title: 'Foundation services',
    detail:
      'Tenants, subscriptions, resource groups, Entra ID, RBAC, Policy, Key Vault, Virtual Networks, DNS, ARM and Bicep, and Activity Logs establish the governance and control baseline for everything else.',
  },
  {
    title: 'Compute services',
    detail:
      'Virtual Machines provide direct host control, App Service provides managed web hosting, Azure Functions provides serverless execution, and Container Apps or AKS support container platforms at different complexity levels.',
  },
  {
    title: 'Storage and data services',
    detail:
      'Blob Storage, Files, managed disks, Azure SQL, managed PostgreSQL and MySQL offerings, Cosmos DB, and analytics services together cover object, file, block, relational, NoSQL, and reporting needs.',
  },
  {
    title: 'Integration services',
    detail:
      'API Management, Service Bus, Event Grid, Event Hubs, Logic Apps, and Functions connect systems without forcing every dependency into a direct synchronous call chain.',
  },
  {
    title: 'Operations services',
    detail:
      'Azure Monitor, Application Insights, Log Analytics, Defender, and deployment automation make the platform operable in production. Without them, the environment quickly becomes difficult to observe and control.',
  },
]

const architecturalMindset = [
  {
    title: 'Use platform boundaries deliberately',
    detail:
      'Public delivery, APIs, background execution, durable state, and orchestration should each live behind explicit service boundaries. Azure works best when the application is decomposed by responsibility instead of forced into one monolithic host.',
  },
  {
    title: 'Treat subscriptions and resource groups as operational structure',
    detail:
      'Subscriptions are major billing and governance boundaries. Resource groups organize lifecycle and deployment ownership. These are architectural decisions, not only portal conveniences.',
  },
  {
    title: 'Prefer managed services unless lower-level control is truly required',
    detail:
      'A managed queue, function host, web platform, or database usually reduces operational burden substantially. Lower-level infrastructure should be chosen for concrete workload reasons, not by default.',
  },
]

const keyTakeaways = [
  'Azure Stack is a broad platform model, not one application framework.',
  'Identity, governance, networking, and observability decisions shape the platform before individual workload services do.',
  'Managed services reduce operations but do not remove responsibility for architecture, security, and failure handling.',
  'The best Azure design is usually the one with the fewest moving parts that still satisfies security, reliability, latency, and compliance requirements.',
  'Standard patterns for subscriptions, RBAC, tagging, CI/CD, logging, and secret management matter early.',
]

const governanceConcepts = [
  {
    title: 'Tenant, subscriptions, and resource groups',
    detail:
      'The tenant is the top-level identity boundary, subscriptions are major billing and policy boundaries, and resource groups organize related resources for deployment and lifecycle management.',
  },
  {
    title: 'Management groups and policy',
    detail:
      'Management groups and Azure Policy allow a platform team to enforce region restrictions, tagging standards, security requirements, and other organizational controls at scale.',
  },
  {
    title: 'Shared platform subscriptions',
    detail:
      'Larger estates commonly dedicate subscriptions to shared networking, observability, security, and developer platform services so application teams inherit consistent baselines.',
  },
]

const infrastructureConcepts = [
  {
    title: 'Regions and paired regions',
    detail:
      'Azure regions affect latency, legal constraints, service availability, and disaster recovery design. Paired-region thinking often matters for backup and continuity planning.',
  },
  {
    title: 'Availability and redundancy',
    detail:
      'Availability Zones, zone redundancy, and geo-redundancy are service-level design choices. Reliability comes from choosing the right redundancy model for each system part, not from assuming all managed services behave identically.',
  },
  {
    title: 'Global delivery',
    detail:
      'Front Door, CDN, caching, and distributed public endpoints improve latency and resilience for user-facing systems while reducing pressure on origin services.',
  },
]

const securityConcepts = [
  {
    title: 'Entra ID and RBAC',
    detail:
      'Most Azure identity and authorization design starts with Entra ID and Azure RBAC. Teams need clear models for users, groups, workloads, role assignment scope, and least privilege.',
  },
  {
    title: 'Managed identities',
    detail:
      'Managed identities are the standard way for Azure-hosted workloads to access other Azure resources without embedding long-lived credentials in configuration or source code.',
  },
  {
    title: 'Secrets and encryption',
    detail:
      'Key Vault centralizes secrets, certificates, and keys. Combined with service-native encryption and controlled access policies, it keeps sensitive material out of application code.',
  },
]

const networkingConcepts = [
  {
    title: 'Virtual Networks and segmentation',
    detail:
      'Virtual Networks, subnets, NSGs, route tables, and private endpoints define service communication paths. These choices shape both the security posture and the operational complexity of the environment.',
  },
  {
    title: 'Traffic entry and exposure',
    detail:
      'Front Door, Application Gateway, API Management, App Service ingress, and load balancers each solve different public exposure and routing problems. Choosing the correct entry point affects caching, security, and latency.',
  },
  {
    title: 'Private and hybrid connectivity',
    detail:
      'VNet peering, VPN, ExpressRoute, and private networking options matter once systems span multiple subscriptions, environments, or on-premise integrations.',
  },
]

const computeConcepts = [
  {
    title: 'Virtual Machines',
    detail:
      'Virtual Machines give the most direct host control and fit custom runtimes, legacy applications, and stateful services, but they also push patching, image management, and host operations back to the team.',
  },
  {
    title: 'App Service and Functions',
    detail:
      'App Service is a strong fit for managed web apps and APIs, while Azure Functions is better for event-driven or bursty workloads with bounded execution. The difference is mainly workload shape and operational expectation.',
  },
  {
    title: 'Container platforms',
    detail:
      'Container Apps reduces platform overhead for many containerized workloads, while AKS is appropriate when teams truly need Kubernetes control-plane features and ecosystem flexibility.',
  },
]

const storageConcepts = [
  {
    title: 'Blob Storage',
    detail:
      'Blob Storage is the default object store for assets, archives, exports, backups, and ingestion files. Many Azure workflows begin with blob arrival or end by writing durable outputs to blobs.',
  },
  {
    title: 'Files and managed disks',
    detail:
      'Azure Files and managed disks support workloads that need file-system semantics or attached block storage rather than object storage. These are especially relevant for VMs and lift-and-shift designs.',
  },
  {
    title: 'Lifecycle and retention',
    detail:
      'Storage design includes access tiers, backup policy, replication strategy, and retention rules. Durable storage should be matched to access patterns and recovery requirements, not only raw capacity.',
  },
]

const dataConcepts = [
  {
    title: 'Azure SQL and managed relational databases',
    detail:
      'Azure SQL Database and managed PostgreSQL or MySQL offerings fit transactional systems, joins, reporting queries, and strong consistency workloads that benefit from reduced database operations burden.',
  },
  {
    title: 'Cosmos DB',
    detail:
      'Cosmos DB fits globally distributed, low-latency, schema-flexible workloads when the partitioning model and access patterns are designed intentionally instead of forced into relational habits.',
  },
  {
    title: 'Analytics and derived data',
    detail:
      'Analytical storage and data-lake patterns extend Azure beyond operational databases so warehousing, reporting, and pipeline workloads do not compete directly with user-facing traffic.',
  },
]

const integrationConcepts = [
  {
    title: 'API and application boundaries',
    detail:
      'API Management, Front Door, Application Gateway, and App Service ingress patterns each solve different exposure and control problems. The entry layer affects authentication, routing, caching, throttling, and observability.',
  },
  {
    title: 'Messaging',
    detail:
      'Service Bus supports reliable queues and topics, Event Grid supports reactive event routing, and Event Hubs supports high-throughput ingestion. These services help systems communicate without forcing synchronous coupling everywhere.',
  },
  {
    title: 'Workflow and orchestration',
    detail:
      'Logic Apps and Durable Functions make multi-step workflows explicit. They are useful when waits, retries, approvals, branching, or integration sequences should be durable and visible instead of hidden in custom workers.',
  },
]

const operationsConcepts = [
  {
    title: 'Infrastructure as code',
    detail:
      'ARM, Bicep, Terraform, and similar tooling make Azure environments repeatable and reviewable. Portal-only changes do not scale for repeatability or recovery.',
  },
  {
    title: 'Observability',
    detail:
      'Azure Monitor, Application Insights, and Log Analytics should be designed around system health and business-critical signals, not just generic logging. Good monitoring tells you which layer is degrading and why.',
  },
  {
    title: 'Security and compliance operations',
    detail:
      'Activity Logs, Defender, Policy, and configuration auditing become essential once multiple teams and environments share the same platform.',
  },
]

const costAndTradeoffs = [
  {
    title: 'Cost shape follows architecture',
    detail:
      'VM-hosted, serverless, and container-hosted systems spend money differently. Idle capacity, replication, storage retention, data transfer, and observability volume often matter as much as compute pricing.',
  },
  {
    title: 'Reliability still comes from design',
    detail:
      'Managed services improve the baseline, but resilient systems still require retry design, backpressure, idempotency, redundancy decisions, backups, and practiced recovery plans.',
  },
  {
    title: 'Higher abstraction reduces control',
    detail:
      'Functions and App Service reduce host-level work, while AKS and VMs increase flexibility at the cost of more operational responsibility. There is no universally correct abstraction layer.',
  },
]

const designChecklist = [
  'Choose tenant, subscription, and resource-group boundaries deliberately.',
  'Start with RBAC, managed identity, Key Vault, logging, and tagging before service sprawl begins.',
  'Use managed services by default and justify lower-level infrastructure with a clear workload need.',
  'Design ingress and private networking explicitly instead of mixing exposure models ad hoc.',
  'Pick databases and storage services according to access patterns, consistency needs, and operational tolerance.',
  'Prefer queues and events when work can be asynchronous.',
  'Codify infrastructure and deployment flow in version control.',
  'Model failure at service boundaries: retries, throttling, timeouts, poison-message handling, and recovery paths.',
]

const examples = [
  {
    id: 'ex-web',
    title: 'Web platform with managed frontend and API',
    intro:
      'A common Azure architecture serves static assets from Storage plus CDN or Front Door, exposes APIs through API Management or App Service ingress, runs backend code in App Service or Functions, and stores state in Azure SQL or Cosmos DB.',
    code: `Resources:
  StorageAccount
  FrontDoor
  ApiManagement
  AppService
  AzureSqlDatabase`,
    takeaway:
      'This pattern works because content delivery, API governance, execution, and persistence each live in services designed for that role.',
  },
  {
    id: 'ex-event',
    title: 'Event-driven order system',
    intro:
      'When user requests should not block on every downstream step, the application accepts the request, emits a Service Bus message or Event Grid event, and lets background workers or orchestrations finish the process asynchronously.',
    code: `await serviceBusSender.sendMessages({
  body: {
    orderId,
    eventType: 'order.submitted',
  },
})`,
    takeaway:
      'Queues and events isolate failures, absorb spikes, and let different platform components scale independently.',
  },
  {
    id: 'ex-containers',
    title: 'Container platform with Container Apps or AKS',
    intro:
      'For long-running APIs or internal services that need container packaging, a typical Azure pattern uses Container Apps or AKS for execution, private networking for service access, managed identities for authentication, and Azure Monitor for telemetry.',
    code: `service payments {
  image = "registry.azurecr.io/payments:2026-04-09"
  runtime = "container-apps"
  ingress = "internal"
  database = "azure-sql"
}`,
    takeaway:
      'This is a strong fit when a simple function host is too constrained but the workload still benefits from managed Azure platform services around it.',
  },
]

const glossary = [
  {
    term: 'Tenant',
    definition:
      'The top-level Microsoft Entra directory boundary for identities and directory objects.',
  },
  {
    term: 'Subscription',
    definition: 'A major Azure billing, quota, policy, and access boundary.',
  },
  {
    term: 'Resource group',
    definition: 'A deployment and lifecycle grouping for related Azure resources.',
  },
  {
    term: 'RBAC',
    definition: 'Role-based access control used to authorize actions on Azure resources.',
  },
  {
    term: 'Managed identity',
    definition:
      'An Azure-provided identity for workloads to access Azure resources without stored credentials.',
  },
  {
    term: 'Blob Storage',
    definition: 'Managed object storage for assets, backups, archives, and ingestion files.',
  },
  { term: 'App Service', definition: 'Managed web application and API hosting service.' },
  {
    term: 'Azure Functions',
    definition: 'Event-driven serverless compute for bounded execution units.',
  },
  {
    term: 'Cosmos DB',
    definition: 'Globally distributed managed NoSQL database with flexible access models.',
  },
  { term: 'Service Bus', definition: 'Managed messaging service for reliable queues and topics.' },
  {
    term: 'Event Grid',
    definition: 'Managed event routing service for reactive platform integrations.',
  },
  {
    term: 'Key Vault',
    definition: 'Service for secrets, certificates, and cryptographic key management.',
  },
]

const azureStackHelpStyles = `
.azure-stack-help-page { min-height: 100dvh; background: #c0c0c0; color: #000; font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif; }
.azure-stack-help-window { min-height: 100dvh; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; display: flex; flex-direction: column; box-sizing: border-box; }
.azure-stack-help-titlebar { position: relative; display: flex; align-items: center; min-height: 24px; padding: 2px 4px; background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: #fff; font-size: 13px; font-weight: 700; }
.azure-stack-help-title { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 14px; }
.azure-stack-help-controls { display: flex; gap: 2px; margin-left: auto; }
.azure-stack-help-control { width: 18px; height: 16px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: 1px solid #404040; background: #c0c0c0; color: #000; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; line-height: 1; cursor: pointer; }
.azure-stack-help-tabs { display: flex; flex-wrap: wrap; gap: 1px; padding: 6px 8px 0; background: #c0c0c0; }
.azure-stack-help-tab { border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: none; background: #b6b6b6; padding: 5px 10px 4px; color: #000; font: inherit; font-size: 12px; cursor: pointer; }
.azure-stack-help-tab.is-active { position: relative; top: 1px; background: #fff; }
.azure-stack-help-main { display: grid; grid-template-columns: 232px minmax(0, 1fr); flex: 1; min-height: 0; border-top: 1px solid #404040; background: #fff; }
.azure-stack-help-toc { overflow: auto; border-right: 1px solid #808080; background: #efefef; padding: 12px; }
.azure-stack-help-toc-title { margin: 0 0 10px; font-size: 12px; font-weight: 700; }
.azure-stack-help-toc-list { list-style: none; margin: 0; padding: 0; }
.azure-stack-help-toc-list li { margin: 0 0 8px; }
.azure-stack-help-toc-list a { color: #000; text-decoration: none; font-size: 12px; }
.azure-stack-help-content { overflow: auto; padding: 16px 20px 22px; }
.azure-stack-help-doc-title { margin: 0 0 12px; font-size: 20px; font-weight: 700; }
.azure-stack-help-intro { margin: 0 0 16px; font-size: 12px; line-height: 1.5; }
.azure-stack-help-section { margin: 0 0 22px; }
.azure-stack-help-heading { margin: 0 0 8px; font-size: 16px; font-weight: 700; }
.azure-stack-help-subheading { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
.azure-stack-help-content p, .azure-stack-help-content li { font-size: 12px; line-height: 1.5; }
.azure-stack-help-content p { margin: 0 0 10px; }
.azure-stack-help-content ul { margin: 0 0 10px 18px; padding: 0; }
.azure-stack-help-divider { margin: 14px 0; border: 0; border-top: 1px solid #d0d0d0; }
.azure-stack-help-codebox { margin: 6px 0 10px; padding: 8px; background: #f4f4f4; border-top: 2px solid #808080; border-left: 2px solid #808080; border-right: 2px solid #fff; border-bottom: 2px solid #fff; }
.azure-stack-help-codebox code { display: block; font-family: "Courier New", Courier, monospace; font-size: 12px; white-space: pre-wrap; }
@media (max-width: 900px) { .azure-stack-help-main { grid-template-columns: 1fr; } .azure-stack-help-toc { border-right: none; border-bottom: 1px solid #808080; } }
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function AzureStackPage(): JSX.Element {
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

    document.title = `Azure Stack (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Azure Stack',
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
    <div className="azure-stack-help-page">
      <style>{azureStackHelpStyles}</style>
      <div className="azure-stack-help-window" role="presentation">
        <header className="azure-stack-help-titlebar">
          <span className="azure-stack-help-title">Azure Stack - Help</span>
          <div className="azure-stack-help-controls">
            <button
              className="azure-stack-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="azure-stack-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="azure-stack-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`azure-stack-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
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
        <div className="azure-stack-help-main">
          <aside className="azure-stack-help-toc" aria-label="Table of contents">
            <h2 className="azure-stack-help-toc-title">Contents</h2>
            <ul className="azure-stack-help-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="azure-stack-help-content">
            <h1 className="azure-stack-help-doc-title">Azure Stack</h1>
            <p className="azure-stack-help-intro">
              Azure is broad enough that "the Azure stack" can mean a serverless application, an App
              Service deployment, a container platform, an enterprise identity-and-policy
              foundation, or a multi-subscription internal platform. This page treats Azure as a
              platform model: the major layers, the service families, the tradeoffs, and the
              patterns that show up across real systems built on it.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-stack-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-stack-help-divider" />

                <section id="bp-service-map" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Service Map</h2>
                  {serviceMap.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-stack-help-divider" />

                <section id="bp-mental-model" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Architectural Mindset</h2>
                  {architecturalMindset.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-stack-help-divider" />

                <section id="bp-takeaways" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Key Takeaways</h2>
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
                <section id="core-governance" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Tenants and Governance</h2>
                  {governanceConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-infrastructure" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Global Footprint</h2>
                  {infrastructureConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-security" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Identity and Security</h2>
                  {securityConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-networking" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Networking and Delivery</h2>
                  {networkingConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compute" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Compute Layer</h2>
                  {computeConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-storage" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Storage Layer</h2>
                  {storageConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-data" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Databases and Analytics</h2>
                  {dataConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-integration" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Messaging and Integration</h2>
                  {integrationConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Operations and Platform Tooling</h2>
                  {operationsConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cost" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Cost, Reliability, and Tradeoffs</h2>
                  {costAndTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="azure-stack-help-section">
                  <h2 className="azure-stack-help-heading">Design Checklist</h2>
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
                  <section key={example.id} id={example.id} className="azure-stack-help-section">
                    <h2 className="azure-stack-help-heading">{example.title}</h2>
                    <p>{example.intro}</p>
                    <div className="azure-stack-help-codebox">
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
              <section id="glossary-terms" className="azure-stack-help-section">
                <h2 className="azure-stack-help-heading">Glossary</h2>
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
