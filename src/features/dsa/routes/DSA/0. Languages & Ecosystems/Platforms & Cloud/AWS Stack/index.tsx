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
    { id: 'core-governance', label: 'Accounts and Governance' },
    { id: 'core-infrastructure', label: 'Global Infrastructure' },
    { id: 'core-security', label: 'Identity and Security' },
    { id: 'core-networking', label: 'Networking and Delivery' },
    { id: 'core-compute', label: 'Compute Layer' },
    { id: 'core-storage', label: 'Storage Layer' },
    { id: 'core-data', label: 'Databases and Analytics' },
    { id: 'core-integration', label: 'Integration and Orchestration' },
    { id: 'core-operations', label: 'Operations and Observability' },
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
      'AWS Stack is the collection of core AWS infrastructure services that teams combine to run applications, platforms, data systems, and internal tools. It is not a single framework. It is a catalog of composable primitives for compute, storage, networking, identity, security, messaging, observability, and automation.',
  },
  {
    title: 'Why teams use it',
    details:
      'Organizations choose AWS when they want broad service coverage, mature operational tooling, flexible hosting models, and global deployment options. The same platform can support static sites, event-driven systems, container platforms, analytics pipelines, and multi-account enterprise foundations.',
  },
  {
    title: 'How to reason about it',
    details:
      'The useful mental model is responsibility-driven architecture. Decide how code runs, how data is stored, how traffic enters, how systems authenticate, how events move, how change is deployed, and how failure is observed. AWS gives multiple answers for each layer, so the design question is usually "which service is the simplest correct fit" rather than "which AWS service exists for this category."',
  },
  {
    title: 'What problem it solves',
    details:
      'AWS lets a team outsource commodity infrastructure while keeping architectural control. You can provision resources on demand, segment workloads by account and network boundary, use managed data services, automate operations, and scale individual system parts instead of operating everything as one fixed server fleet.',
  },
]

const serviceMap = [
  {
    title: 'Foundation services',
    detail:
      'Accounts, AWS Organizations, IAM, KMS, VPC, Route 53, CloudFormation, and CloudTrail form the baseline for governance, identity, networking, infrastructure provisioning, and auditability.',
  },
  {
    title: 'Compute services',
    detail:
      'EC2 gives direct virtual-machine control, Lambda gives serverless event execution, ECS gives AWS-native container orchestration, Fargate reduces container host management, and EKS provides managed Kubernetes.',
  },
  {
    title: 'Storage and data services',
    detail:
      'S3 covers object storage, EBS covers block storage for EC2, EFS covers shared file storage, RDS and Aurora cover managed relational databases, and DynamoDB covers high-scale key-value and document workloads.',
  },
  {
    title: 'Integration services',
    detail:
      'API Gateway, SQS, SNS, EventBridge, Step Functions, and related services connect systems without forcing everything into synchronous service-to-service calls.',
  },
  {
    title: 'Operations services',
    detail:
      'CloudWatch, CloudTrail, Config, Systems Manager, Secrets Manager, and deployment tooling make the platform manageable in production. Without these, a cloud estate quickly becomes operationally opaque.',
  },
]

const architecturalMindset = [
  {
    title: 'Use service boundaries intentionally',
    detail:
      'Public assets belong in storage and edge services, APIs belong behind deliberate entry points, durable state belongs in databases or object stores, and long-running background work belongs in queues or workflows instead of a single request path.',
  },
  {
    title: 'Treat accounts as part of architecture',
    detail:
      'An AWS account is not only a billing artifact. It is a security boundary, quota boundary, audit boundary, and ownership boundary. Multi-account design is often the first serious platform architecture decision in AWS.',
  },
  {
    title: 'Prefer managed services unless control is truly required',
    detail:
      'A managed queue, database, or function service is usually easier to operate than the equivalent self-hosted stack on EC2. Teams should justify extra control with a concrete workload need, not with habit.',
  },
]

const keyTakeaways = [
  'AWS Stack is a set of platform primitives, not one opinionated application framework.',
  'Governance, IAM, networking, and observability decisions shape the platform before individual workload services do.',
  'Managed services reduce operations but do not remove responsibility for system design, data modeling, and failure handling.',
  'The best AWS architecture is usually the one with the fewest moving parts that still meets reliability, scale, latency, and compliance requirements.',
  'Standardizing account baselines, tagging, CI/CD, logging, and secret handling early pays off more than memorizing more services.',
]

const governanceConcepts = [
  {
    title: 'AWS account',
    detail:
      'The account is the primary ownership, billing, and security boundary. Resource isolation, cost attribution, quota management, and access design often start here.',
  },
  {
    title: 'AWS Organizations',
    detail:
      'Organizations groups accounts, centralizes billing, and applies policy guardrails such as service control policies. This is the normal way to control large environments consistently.',
  },
  {
    title: 'Shared services and landing zones',
    detail:
      'Mature AWS platforms often create dedicated accounts for networking, logging, security tooling, and CI/CD so that platform-wide concerns remain separate from workload-specific accounts.',
  },
]

const infrastructureConcepts = [
  {
    title: 'Regions',
    detail:
      'A region is the broad geographic deployment boundary. It affects latency, legal and compliance constraints, service availability, and disaster recovery design.',
  },
  {
    title: 'Availability Zones',
    detail:
      'Availability Zones are isolated failure domains inside a region. Multi-AZ design is one of the most important reliability patterns in AWS because it gives better resilience without immediately jumping to cross-region complexity.',
  },
  {
    title: 'Global edge network',
    detail:
      'CloudFront and other edge services improve public-user latency and reduce origin load by moving asset delivery and some request handling closer to clients.',
  },
]

const securityConcepts = [
  {
    title: 'IAM is the universal control plane',
    detail:
      'Every serious AWS platform depends on understanding principals, roles, trust policies, resource policies, and least privilege. IAM is the layer that decides who or what may call AWS APIs.',
  },
  {
    title: 'Temporary credentials are the norm',
    detail:
      'Modern AWS systems prefer IAM roles, federated access, and short-lived credentials over long-lived access keys. This improves auditability and reduces secret sprawl.',
  },
  {
    title: 'Encryption and secret management',
    detail:
      'KMS, service-native encryption, and Secrets Manager keep key handling and secret access centralized instead of spreading credentials throughout application configuration.',
  },
]

const networkingConcepts = [
  {
    title: 'VPC and subnet design',
    detail:
      'The VPC defines network ranges, routing, egress, service boundaries, and connectivity patterns. Public and private subnets, NAT, route tables, and VPC endpoints all change how workloads reach users and dependencies.',
  },
  {
    title: 'Traffic entry and control',
    detail:
      'Route 53 manages DNS, API Gateway and load balancers manage ingress, and security groups constrain traffic at the workload level. These choices define both system exposure and internal service communication.',
  },
  {
    title: 'Private and hybrid connectivity',
    detail:
      'PrivateLink, Transit Gateway, VPC peering, and hybrid links matter once systems span multiple accounts, multiple environments, or on-premise boundaries.',
  },
]

const computeConcepts = [
  {
    title: 'EC2',
    detail:
      'EC2 offers the most server-level control and fits custom runtimes, legacy applications, and stateful services, but it also leaves patching, image management, scaling groups, and host operations with the team.',
  },
  {
    title: 'Lambda',
    detail:
      'Lambda is a strong fit for event-driven and bursty workloads with clear execution boundaries. It removes most host management but introduces considerations around cold starts, package size, time limits, and downstream dependency behavior.',
  },
  {
    title: 'ECS, Fargate, and EKS',
    detail:
      'ECS is a strong default for containerized services on AWS, Fargate removes host management for many container workloads, and EKS fits teams that specifically need Kubernetes control planes and ecosystem patterns.',
  },
]

const storageConcepts = [
  {
    title: 'S3',
    detail:
      'S3 is the default durable object store for assets, backups, logs, exported data, and data-lake style storage. Many AWS workflows either begin with S3 events or end by writing results to S3.',
  },
  {
    title: 'EBS and EFS',
    detail:
      'EBS provides block volumes for EC2, while EFS provides shared managed file storage. These services serve workloads that need attached block devices or POSIX-like shared filesystems rather than object storage semantics.',
  },
  {
    title: 'Lifecycle, retention, and replication',
    detail:
      'Storage design is about more than capacity. Teams also choose storage classes, retention rules, replication policies, backups, and recovery behavior based on access frequency and resilience requirements.',
  },
]

const dataConcepts = [
  {
    title: 'RDS and Aurora',
    detail:
      'Managed relational databases fit transactional systems, joins, reporting queries, and strong consistency requirements. Aurora increases automation and scalability for compatible relational workloads.',
  },
  {
    title: 'DynamoDB',
    detail:
      'DynamoDB fits high-throughput key-value or document access patterns, low-latency serverless architectures, and workloads designed around explicit partition and access models.',
  },
  {
    title: 'Analytics and derived data',
    detail:
      'Athena, Glue, Redshift, and broader data-lake patterns extend the stack beyond operational databases so reporting and pipeline workloads do not compete directly with user-facing traffic.',
  },
]

const integrationConcepts = [
  {
    title: 'API and edge entry points',
    detail:
      'API Gateway, Application Load Balancer, and CloudFront all expose workloads, but they solve different problems. Selecting the correct entry layer affects latency, caching, routing, and operational complexity.',
  },
  {
    title: 'Messaging',
    detail:
      'SQS buffers work, SNS fans out notifications, and EventBridge routes events between producers and consumers. These services reduce tight coupling and help systems absorb bursts and failures.',
  },
  {
    title: 'Workflow orchestration',
    detail:
      'Step Functions makes multi-step business workflows explicit with retries, waits, branching, and task state. It is useful when process coordination should not be hidden inside application code alone.',
  },
]

const operationsConcepts = [
  {
    title: 'Infrastructure as code',
    detail:
      'CloudFormation, CDK, Terraform, and similar tooling turn AWS environments into versioned definitions. Manual console work does not scale for review, repeatability, or disaster recovery.',
  },
  {
    title: 'Observability',
    detail:
      'CloudWatch metrics, logs, alarms, dashboards, and traces should be designed around service health and failure signals, not just around collecting every possible log line.',
  },
  {
    title: 'Audit and compliance',
    detail:
      'CloudTrail records API activity, AWS Config tracks configuration changes, and Systems Manager helps with fleet-level operations. These services matter as soon as multiple teams share the same platform.',
  },
]

const costAndTradeoffs = [
  {
    title: 'Cost shape follows architecture',
    detail:
      'A serverless architecture spends money differently from a VM fleet or container platform. Request volume, data transfer, idle capacity, storage retention, and replication often dominate cloud cost more than the headline compute service alone.',
  },
  {
    title: 'Reliability comes from design, not branding',
    detail:
      'Managed services help, but resilient systems still require multi-AZ design, sensible retries, backpressure, idempotency, backups, and recovery plans that are actually tested.',
  },
  {
    title: 'Abstractions trade control for speed',
    detail:
      "Higher-level services reduce operations but constrain flexibility. Lower-level services increase control but also increase the team's operational obligations. There is no universally best layer.",
  },
]

const designChecklist = [
  'Choose account boundaries intentionally instead of defaulting everything into one account.',
  'Start with IAM roles, least privilege, centralized logging, and tagging before service sprawl begins.',
  'Use managed services by default and justify lower-level infrastructure with a concrete requirement.',
  'Design ingress, private networking, and service-to-service traffic paths explicitly.',
  'Pick storage and databases according to access patterns, durability needs, and operational tolerance.',
  'Prefer queues and events when work can be asynchronous.',
  'Codify infrastructure and deployment flow in version control.',
  'Model failure handling at service boundaries: retries, timeouts, dead-letter handling, and recovery paths.',
]

const examples = [
  {
    id: 'ex-web',
    title: 'Static site plus API plus managed data',
    intro:
      'A common entry architecture serves the frontend from S3 and CloudFront, exposes APIs through API Gateway, runs backend logic in Lambda, and stores state in DynamoDB or RDS. It keeps static delivery, request handling, and persistence cleanly separated.',
    code: `Resources:
  SiteBucket:
    Type: AWS::S3::Bucket

  SiteDistribution:
    Type: AWS::CloudFront::Distribution

  PublicApi:
    Type: AWS::ApiGatewayV2::Api

  OrdersFunction:
    Type: AWS::Lambda::Function

  OrdersTable:
    Type: AWS::DynamoDB::Table`,
    takeaway:
      'This pattern works well because edge delivery, API routing, function execution, and persistence scale independently.',
  },
  {
    id: 'ex-event',
    title: 'Event-driven order pipeline',
    intro:
      'When a user request should not block on all downstream work, the system accepts the request, emits a queue message or event, and lets background workers or workflows finish the process asynchronously.',
    code: `export async function handler(event) {
  await sqs.sendMessage({
    QueueUrl: process.env.ORDER_QUEUE_URL,
    MessageBody: JSON.stringify(event.detail),
  })

  return {
    statusCode: 202,
    body: JSON.stringify({ accepted: true }),
  }
}`,
    takeaway:
      'This pattern improves resilience because bursts and partial failures are absorbed by queues and workflow boundaries instead of directly impacting the caller.',
  },
  {
    id: 'ex-containers',
    title: 'Container platform with ECS and shared services',
    intro:
      'For long-running APIs, a common AWS pattern uses ECS or Fargate behind an application load balancer, stores relational state in RDS, reads secrets from Secrets Manager, and ships metrics and logs to CloudWatch.',
    code: `service "payments" {
  image         = "123456789012.dkr.ecr.us-east-1.amazonaws.com/payments:2026-04-09"
  launch_type   = "FARGATE"
  desired_count = 3

  network {
    subnets         = ["private-a", "private-b"]
    security_groups = ["payments-service"]
  }
}`,
    takeaway:
      'This is a good middle ground when Lambda is too constrained but full Kubernetes control is unnecessary.',
  },
]

const glossary = [
  {
    term: 'AWS account',
    definition: 'The primary billing, ownership, and security boundary for AWS resources.',
  },
  { term: 'Availability Zone', definition: 'An isolated failure domain inside an AWS region.' },
  {
    term: 'VPC',
    definition: 'A logically isolated virtual network for AWS resources and routing.',
  },
  {
    term: 'IAM role',
    definition: 'A temporary-credential identity assumed by users or workloads.',
  },
  {
    term: 'S3',
    definition: 'Managed object storage for assets, backups, logs, and large durable datasets.',
  },
  {
    term: 'EC2',
    definition:
      'Virtual machine compute where the team manages the guest operating system and server lifecycle.',
  },
  { term: 'Lambda', definition: 'Event-driven serverless compute for bounded execution units.' },
  { term: 'RDS', definition: 'Managed relational database service.' },
  {
    term: 'DynamoDB',
    definition:
      'Managed NoSQL key-value and document database optimized for scale and low latency.',
  },
  {
    term: 'EventBridge',
    definition: 'Event routing service for producers, consumers, and event buses.',
  },
  {
    term: 'Step Functions',
    definition: 'Managed workflow orchestration for explicit multi-step processes.',
  },
  {
    term: 'CloudFormation',
    definition: 'Infrastructure-as-code service for declaring AWS resources.',
  },
]

const awsStackHelpStyles = `
.aws-stack-help-page { min-height: 100dvh; background: #c0c0c0; color: #000; font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif; }
.aws-stack-help-window { min-height: 100dvh; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; display: flex; flex-direction: column; box-sizing: border-box; }
.aws-stack-help-titlebar { position: relative; display: flex; align-items: center; min-height: 24px; padding: 2px 4px; background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: #fff; font-size: 13px; font-weight: 700; }
.aws-stack-help-title { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 14px; }
.aws-stack-help-controls { display: flex; gap: 2px; margin-left: auto; }
.aws-stack-help-control { width: 18px; height: 16px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: 1px solid #404040; background: #c0c0c0; color: #000; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; line-height: 1; cursor: pointer; }
.aws-stack-help-tabs { display: flex; flex-wrap: wrap; gap: 1px; padding: 6px 8px 0; background: #c0c0c0; }
.aws-stack-help-tab { border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: none; background: #b6b6b6; padding: 5px 10px 4px; color: #000; font: inherit; font-size: 12px; cursor: pointer; }
.aws-stack-help-tab.is-active { position: relative; top: 1px; background: #fff; }
.aws-stack-help-main { display: grid; grid-template-columns: 232px minmax(0, 1fr); flex: 1; min-height: 0; border-top: 1px solid #404040; background: #fff; }
.aws-stack-help-toc { overflow: auto; border-right: 1px solid #808080; background: #efefef; padding: 12px; }
.aws-stack-help-toc-title { margin: 0 0 10px; font-size: 12px; font-weight: 700; }
.aws-stack-help-toc-list { list-style: none; margin: 0; padding: 0; }
.aws-stack-help-toc-list li { margin: 0 0 8px; }
.aws-stack-help-toc-list a { color: #000; text-decoration: none; font-size: 12px; }
.aws-stack-help-content { overflow: auto; padding: 16px 20px 22px; }
.aws-stack-help-doc-title { margin: 0 0 12px; font-size: 20px; font-weight: 700; }
.aws-stack-help-intro { margin: 0 0 16px; font-size: 12px; line-height: 1.5; }
.aws-stack-help-section { margin: 0 0 22px; }
.aws-stack-help-heading { margin: 0 0 8px; font-size: 16px; font-weight: 700; }
.aws-stack-help-subheading { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
.aws-stack-help-content p, .aws-stack-help-content li { font-size: 12px; line-height: 1.5; }
.aws-stack-help-content p { margin: 0 0 10px; }
.aws-stack-help-content ul { margin: 0 0 10px 18px; padding: 0; }
.aws-stack-help-divider { margin: 14px 0; border: 0; border-top: 1px solid #d0d0d0; }
.aws-stack-help-codebox { margin: 6px 0 10px; padding: 8px; background: #f4f4f4; border-top: 2px solid #808080; border-left: 2px solid #808080; border-right: 2px solid #fff; border-bottom: 2px solid #fff; }
.aws-stack-help-codebox code { display: block; font-family: "Courier New", Courier, monospace; font-size: 12px; white-space: pre-wrap; }
@media (max-width: 900px) { .aws-stack-help-main { grid-template-columns: 1fr; } .aws-stack-help-toc { border-right: none; border-bottom: 1px solid #808080; } }
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function AwsStackPage(): JSX.Element {
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

    document.title = `AWS Stack (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'AWS Stack',
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
    <div className="aws-stack-help-page">
      <style>{awsStackHelpStyles}</style>
      <div className="aws-stack-help-window" role="presentation">
        <header className="aws-stack-help-titlebar">
          <span className="aws-stack-help-title">AWS Stack - Help</span>
          <div className="aws-stack-help-controls">
            <button
              className="aws-stack-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="aws-stack-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="aws-stack-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`aws-stack-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
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
        <div className="aws-stack-help-main">
          <aside className="aws-stack-help-toc" aria-label="Table of contents">
            <h2 className="aws-stack-help-toc-title">Contents</h2>
            <ul className="aws-stack-help-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="aws-stack-help-content">
            <h1 className="aws-stack-help-doc-title">AWS Stack</h1>
            <p className="aws-stack-help-intro">
              AWS is broad enough that "the AWS stack" can mean a serverless app, a fleet of EC2
              instances, a container platform, an analytics pipeline, or an enterprise landing zone.
              This page treats AWS as a platform model: how its major layers fit together, why teams
              choose different services for the same responsibility, and what architecture decisions
              matter most when building on it.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="aws-stack-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  ))}
                </section>

                <hr className="aws-stack-help-divider" />

                <section id="bp-service-map" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Service Map</h2>
                  {serviceMap.map((item) => (
                    <div key={item.title}>
                      <h3 className="aws-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="aws-stack-help-divider" />

                <section id="bp-mental-model" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Architectural Mindset</h2>
                  {architecturalMindset.map((item) => (
                    <div key={item.title}>
                      <h3 className="aws-stack-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="aws-stack-help-divider" />

                <section id="bp-takeaways" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Key Takeaways</h2>
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
                <section id="core-governance" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Accounts and Governance</h2>
                  {governanceConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-infrastructure" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Global Infrastructure</h2>
                  {infrastructureConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-security" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Identity and Security</h2>
                  {securityConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-networking" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Networking and Delivery</h2>
                  {networkingConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compute" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Compute Layer</h2>
                  {computeConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-storage" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Storage Layer</h2>
                  {storageConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-data" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Databases and Analytics</h2>
                  {dataConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-integration" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Integration and Orchestration</h2>
                  {integrationConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Operations and Observability</h2>
                  {operationsConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cost" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Cost, Reliability, and Tradeoffs</h2>
                  {costAndTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="aws-stack-help-section">
                  <h2 className="aws-stack-help-heading">Design Checklist</h2>
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
                  <section key={example.id} id={example.id} className="aws-stack-help-section">
                    <h2 className="aws-stack-help-heading">{example.title}</h2>
                    <p>{example.intro}</p>
                    <div className="aws-stack-help-codebox">
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
              <section id="glossary-terms" className="aws-stack-help-section">
                <h2 className="aws-stack-help-heading">Glossary</h2>
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
