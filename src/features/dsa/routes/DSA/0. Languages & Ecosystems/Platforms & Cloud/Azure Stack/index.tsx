import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type TopicLink = {
  id: string
  label: string
}

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

export default function AzureStackPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Azure Stack',
    defaultTab: 'big-picture',
  })
  return (
    <TopicPageShell
      title="Azure Stack"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Azure Stack</h1>
      <p className="azure-stack-help-intro">
        Azure is broad enough that "the Azure stack" can mean a serverless application, an App
        Service deployment, a container platform, an enterprise identity-and-policy foundation, or a
        multi-subscription internal platform. This page treats Azure as a platform model: the major
        layers, the service families, the tradeoffs, and the patterns that show up across real
        systems built on it.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-service-map" className="bin98-section">
            <h2 className="bin98-heading">Service Map</h2>
            {serviceMap.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Architectural Mindset</h2>
            {architecturalMindset.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-governance" className="bin98-section">
            <h2 className="bin98-heading">Tenants and Governance</h2>
            {governanceConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-infrastructure" className="bin98-section">
            <h2 className="bin98-heading">Global Footprint</h2>
            {infrastructureConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-security" className="bin98-section">
            <h2 className="bin98-heading">Identity and Security</h2>
            {securityConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-networking" className="bin98-section">
            <h2 className="bin98-heading">Networking and Delivery</h2>
            {networkingConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compute" className="bin98-section">
            <h2 className="bin98-heading">Compute Layer</h2>
            {computeConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-storage" className="bin98-section">
            <h2 className="bin98-heading">Storage Layer</h2>
            {storageConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-data" className="bin98-section">
            <h2 className="bin98-heading">Databases and Analytics</h2>
            {dataConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-integration" className="bin98-section">
            <h2 className="bin98-heading">Messaging and Integration</h2>
            {integrationConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-operations" className="bin98-section">
            <h2 className="bin98-heading">Operations and Platform Tooling</h2>
            {operationsConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-cost" className="bin98-section">
            <h2 className="bin98-heading">Cost, Reliability, and Tradeoffs</h2>
            {costAndTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Design Checklist</h2>
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
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.intro}</p>
              <div className="bin98-codebox">
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
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
