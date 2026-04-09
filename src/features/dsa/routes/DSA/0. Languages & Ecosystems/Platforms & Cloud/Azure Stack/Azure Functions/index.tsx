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
    { id: 'bp-fit', label: 'Where It Fits' },
    { id: 'bp-when-not', label: 'When It Is Not Ideal' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Execution Model' },
    { id: 'core-hosting', label: 'Hosting Plans' },
    { id: 'core-triggers', label: 'Triggers and Bindings' },
    { id: 'core-lifecycle', label: 'Execution Lifecycle and Scaling' },
    { id: 'core-state', label: 'State, Retries, and Durability' },
    { id: 'core-networking', label: 'Networking and Integrations' },
    { id: 'core-security', label: 'Security and Configuration' },
    { id: 'core-operations', label: 'Deployment and Operations' },
    { id: 'core-performance', label: 'Performance and Cost' },
    { id: 'core-pitfalls', label: 'Pitfalls and Checklist' },
  ],
  examples: [
    { id: 'examples-http', label: 'HTTP Endpoint' },
    { id: 'examples-bus', label: 'Service Bus Worker' },
    { id: 'examples-blob', label: 'Blob Processing' },
    { id: 'examples-durable', label: 'Durable Workflow' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      "Azure Functions is Azure's serverless compute platform for event-driven applications. A function runs when something happens: an HTTP request arrives, a queue message appears, a timer fires, a blob is uploaded, or an event is emitted elsewhere in Azure.",
  },
  {
    title: 'Why teams use it',
    details:
      'It reduces host management for background jobs, automation, queue workers, webhook handlers, lightweight APIs, and platform glue code. It is especially attractive when demand is bursty and the work naturally begins from external events.',
  },
  {
    title: 'How to reason about it',
    details:
      'The correct model is not "tiny cloud scripts." It is "event-driven execution with external state, retry-aware handlers, and platform-managed workers." A function should assume the host can scale, restart, or disappear at any time.',
  },
]

const platformFit = [
  {
    title: 'Execution layer inside Azure',
    detail:
      'Functions often sits between Storage Accounts, Service Bus, Event Grid, API Management, Cosmos DB, SQL Database, and external APIs. It is the code layer that reacts to events and coordinates useful work.',
  },
  {
    title: 'Bridge between synchronous and asynchronous systems',
    detail:
      'HTTP-triggered functions handle ingress and webhooks, while queue-, event-, timer-, and blob-triggered functions handle background work. The platform is strongest when those styles are combined deliberately.',
  },
  {
    title: 'Best when infrastructure should stay secondary',
    detail:
      'If the core engineering problem is business logic, integration, or automation rather than custom host control, Functions is often a better fit than building and operating dedicated worker servers.',
  },
]

const whenNotIdeal = [
  {
    title: 'Long-lived or highly stateful processes',
    detail:
      'Workloads that depend on in-memory state, process affinity, or highly customized host control may fit App Service, container apps, AKS, or dedicated workers more naturally.',
  },
  {
    title: 'Heavy always-on traffic',
    detail:
      'A workload with steady high utilization may prefer a more fixed hosting model where latency, warm capacity, and runtime tuning are easier to reason about.',
  },
  {
    title: 'When serverless is used to hide architecture',
    detail:
      'Functions should not be an excuse to avoid queue design, retries, idempotency, dependency control, or state boundaries. The complexity still exists; it just moves to different layers.',
  },
]

const keyTakeaways = [
  'Azure Functions is event-driven compute inside the Azure platform.',
  'Triggers define entry points, bindings reduce glue code, and external systems hold durable state.',
  'Automatic scale is useful, but safe architecture still depends on retries, idempotency, and downstream protection.',
  'Hosting choice changes latency, warm capacity, networking behavior, and cost.',
  'Durable Functions exists because many business workflows are multi-step processes, not one-shot handlers.',
]

const executionModel = [
  {
    title: 'Function app as the deployment boundary',
    detail:
      'A function app groups related functions, runtime settings, identity, environment variables, monitoring, and deployment behavior. It is a deployment unit, not just a folder of handlers.',
  },
  {
    title: 'One trigger per function',
    detail:
      'Each function has a primary trigger that starts execution. That makes message shape, delivery semantics, and retry boundaries explicit parts of the design.',
  },
  {
    title: 'Stateless by default',
    detail:
      'Each invocation should assume it may run on a different worker instance. Local memory and local files are not reliable sources of durable application state.',
  },
  {
    title: 'Platform-controlled worker lifecycle',
    detail:
      'The platform can cold start, scale out, recycle, or shut down workers. Code should tolerate that behavior rather than relying on long-lived host state.',
  },
]

const hostingPlans = [
  {
    title: 'Consumption-style hosting',
    detail:
      'This emphasizes elastic scale and paying for actual execution. It is attractive for irregular demand but requires more attention to startup behavior and workload limits.',
  },
  {
    title: 'Premium or pre-warmed capacity',
    detail:
      'This reduces cold-start pressure and improves predictability for more latency-sensitive or networking-constrained workloads, usually at higher baseline cost.',
  },
  {
    title: 'Dedicated hosting',
    detail:
      'Dedicated-style hosting trades some serverless elasticity for more fixed application-host behavior. It can make sense when the workload is always active or fits broader app hosting patterns.',
  },
]

const triggersAndBindings = [
  {
    title: 'HTTP triggers',
    detail:
      'These fit lightweight APIs, callbacks, internal control endpoints, and webhooks. They work best when the request either completes quickly or hands slow work off to background processing.',
  },
  {
    title: 'Message and event triggers',
    detail:
      'Service Bus, Event Grid, storage queues, blob events, and timers support asynchronous architectures that absorb spikes more gracefully than direct request-response chains.',
  },
  {
    title: 'Bindings',
    detail:
      'Bindings reduce boilerplate for inputs and outputs, but engineers still need to understand the underlying service behavior, data flow, and retry semantics instead of treating bindings as magic.',
  },
]

const lifecycleAndScaling = [
  {
    title: 'Scaling is trigger-driven',
    detail:
      'The runtime scales based on trigger demand and backlog. That improves elasticity, but it can also create a burst of downstream pressure if databases and APIs are not protected.',
  },
  {
    title: 'Cold start is an architecture concern',
    detail:
      'Initialization cost, dependency loading, startup work, and plan choice affect startup latency. The best mitigation is usually architectural: smaller apps, faster initialization, and using pre-warmed capacity only when needed.',
  },
  {
    title: 'Execution still has boundaries',
    detail:
      'A managed platform does not mean infinite runtime. Long or complex work should be split into bounded units or moved into durable workflows or more suitable hosting models.',
  },
]

const stateAndDurability = [
  {
    title: 'Externalize state',
    detail:
      'Workflow progress, checkpoints, deduplication data, and business state belong in storage systems or durable orchestration state, not in local process memory.',
  },
  {
    title: 'Design for retries and duplicates',
    detail:
      'Many trigger sources retry failed work. Good functions are idempotent or duplicate-aware so that replaying the same event does not produce inconsistent state.',
  },
  {
    title: 'Durable Functions',
    detail:
      'Durable Functions adds orchestration, timers, fan-out, fan-in, and checkpointed workflows. It is useful when business logic spans multiple steps or needs to survive host restarts cleanly.',
  },
]

const networkingAndIntegrations = [
  {
    title: 'Azure services as natural companions',
    detail:
      'Functions commonly integrates with Storage Accounts, Service Bus, Event Grid, API Management, Cosmos DB, SQL Database, Key Vault, and Application Insights. The platform works best when each service has a clear role.',
  },
  {
    title: 'Private networking',
    detail:
      'Some workloads need VNet integration, private endpoints, or controlled egress. These choices affect dependency access, startup behavior, and operational fit.',
  },
  {
    title: 'Use events to decouple systems',
    detail:
      'A queue message or published event is often a better boundary than a direct synchronous dependency. It lowers latency pressure and limits failure propagation.',
  },
]

const securityAndConfiguration = [
  {
    title: 'Managed identity first',
    detail:
      'When a function must call other Azure resources, managed identities are usually the best default because they avoid embedded credentials and align with Azure RBAC.',
  },
  {
    title: 'Configuration belongs outside the code',
    detail:
      'Connection settings, feature flags, secret values, and environment-specific parameters belong in app configuration and secret management, not in hard-coded source files.',
  },
  {
    title: 'Security includes the whole data path',
    detail:
      'Good security design asks who can invoke the function, who can publish to its trigger, and what downstream systems the function can access after it starts running.',
  },
]

const deploymentAndOperations = [
  {
    title: 'Function apps are production systems',
    detail:
      'Versioning, CI/CD, rollback strategy, monitoring, and infrastructure definitions matter here just as much as they do for any conventional service.',
  },
  {
    title: 'Observe trigger lag and dependency health',
    detail:
      'Useful metrics include queue depth, failure rate, dead-letter volume, orchestration duration, dependency latency, timeout rate, and retry rate. Logs alone are not enough.',
  },
  {
    title: 'Separate platform failures from code failures',
    detail:
      'A broken function can fail because of configuration, trigger permissions, networking, secret access, scaling behavior, or the code itself. Good telemetry helps isolate the failing layer.',
  },
]

const performanceAndCost = [
  {
    title: 'Cost shape follows invocation shape',
    detail:
      'Functions is often cost-efficient for bursty or low-duty-cycle systems, but a steady heavy workload may justify more fixed hosting. Pricing should be evaluated at the architecture level, not just by the serverless label.',
  },
  {
    title: 'Latency comes from more than handler code',
    detail:
      'Initialization, network calls, serialization, storage I/O, and downstream throttling often dominate end-to-end response time more than the CPU time inside the handler itself.',
  },
  {
    title: 'Protect downstream systems',
    detail:
      'Automatic scale can overwhelm a database or third-party API. Concurrency control, queue buffering, batch sizing, and backpressure still matter on a managed platform.',
  },
]

const pitfallsAndChecklist = [
  'Do not assume exactly-once delivery unless the full architecture guarantees it.',
  'Do not hide long workflows inside one synchronous HTTP call.',
  'Do not rely on process memory, local files, or one worker instance for correctness.',
  'Prefer queues or events when work is slow, bursty, or retryable.',
  'Use managed identity and external configuration rather than embedding credentials.',
  'Test timeout behavior, retries, poison message handling, and dependency throttling before production traffic arrives.',
  'Keep each function focused on one clear unit of work with explicit inputs and outputs.',
]

const examples = [
  {
    id: 'examples-http',
    title: 'HTTP endpoint that hands off slow work',
    intro:
      'A common pattern validates the request quickly, enqueues background work, and returns immediately instead of blocking the caller while downstream processing runs.',
    code: `import { app } from '@azure/functions'

app.http('submitInvoice', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (request, context) => {
    const payload = await request.json()

    context.extraOutputs.set('invoiceQueue', {
      invoiceId: payload.id,
    })

    return {
      status: 202,
      jsonBody: { accepted: true, invoiceId: payload.id },
    }
  },
})`,
    takeaway:
      'Use HTTP for ingestion and control, then move variable-latency work into asynchronous processing.',
  },
  {
    id: 'examples-bus',
    title: 'Service Bus worker',
    intro:
      'Service Bus works well when several producers hand work to a background processor and the function should scale with message volume rather than request rate.',
    code: `import { app } from '@azure/functions'

app.serviceBusQueue('processInvoice', {
  connection: 'ServiceBusConnection',
  queueName: 'invoices',
  handler: async (message, context) => {
    context.log(\`Processing invoice \${message.invoiceId}\`)
  },
})`,
    takeaway:
      'Queue-triggered workers isolate failures and smooth spikes better than tightly chained synchronous calls.',
  },
  {
    id: 'examples-blob',
    title: 'Blob-triggered file ingestion',
    intro:
      'Storage events are a natural trigger when files arrive asynchronously and need validation, parsing, or transformation.',
    code: `import { app } from '@azure/functions'

app.storageBlob('ingestCsv', {
  path: 'incoming/{name}',
  connection: 'AzureWebJobsStorage',
  handler: async (_blob, context) => {
    context.log(\`Received file \${context.triggerMetadata.name}\`)
  },
})`,
    takeaway:
      'Blob triggers are a good fit when file arrival is the business event and processing can happen out of band.',
  },
  {
    id: 'examples-durable',
    title: 'Durable orchestration',
    intro:
      'When a workflow spans multiple activities and must survive restarts, an orchestrator makes the state machine explicit instead of hiding it in ad hoc worker logic.',
    code: `df.app.orchestration('fulfillOrder', function* (context) {
  const order = context.df.getInput()
  const payment = yield context.df.callActivity('chargeCard', order)
  const shipment = yield context.df.callActivity('reserveInventory', payment)
  return yield context.df.callActivity('sendConfirmation', shipment)
})`,
    takeaway:
      'Durable Functions is for explicit long-lived workflow state, retries, waits, and orchestration boundaries.',
  },
]

const glossary = [
  {
    term: 'Function app',
    definition:
      'The deployment, runtime, configuration, and identity boundary for one or more functions.',
  },
  { term: 'Trigger', definition: 'The event source that starts function execution.' },
  {
    term: 'Binding',
    definition: 'A declarative input or output connection that reduces integration boilerplate.',
  },
  {
    term: 'Cold start',
    definition:
      'Startup latency introduced when a new worker must be initialized before execution.',
  },
  {
    term: 'Managed identity',
    definition:
      'An Azure-provided identity for authenticating to Azure resources without stored credentials.',
  },
  {
    term: 'Durable Functions',
    definition: 'An extension for orchestrated, stateful, checkpointed workflows.',
  },
  {
    term: 'Idempotency',
    definition:
      'The ability to process the same event more than once without inconsistent results.',
  },
  {
    term: 'Poison message',
    definition: 'A message that repeatedly fails and must be isolated from the normal flow.',
  },
  {
    term: 'Dead-letter queue',
    definition: 'A holding area for messages that could not be processed successfully.',
  },
  { term: 'Scale-out', definition: 'Adding more worker instances to handle rising demand.' },
]

const azureFunctionsHelpStyles = `
.azure-functions-help-page { min-height: 100dvh; background: #c0c0c0; color: #000; font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif; }
.azure-functions-help-window { min-height: 100dvh; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; display: flex; flex-direction: column; box-sizing: border-box; }
.azure-functions-help-titlebar { position: relative; display: flex; align-items: center; min-height: 24px; padding: 2px 4px; background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: #fff; font-size: 13px; font-weight: 700; }
.azure-functions-help-title { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 14px; }
.azure-functions-help-controls { display: flex; gap: 2px; margin-left: auto; }
.azure-functions-help-control { width: 18px; height: 16px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: 1px solid #404040; background: #c0c0c0; color: #000; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; line-height: 1; cursor: pointer; }
.azure-functions-help-tabs { display: flex; flex-wrap: wrap; gap: 1px; padding: 6px 8px 0; background: #c0c0c0; }
.azure-functions-help-tab { border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #404040; border-bottom: none; background: #b6b6b6; padding: 5px 10px 4px; color: #000; font: inherit; font-size: 12px; cursor: pointer; }
.azure-functions-help-tab.is-active { position: relative; top: 1px; background: #fff; }
.azure-functions-help-main { display: grid; grid-template-columns: 232px minmax(0, 1fr); flex: 1; min-height: 0; border-top: 1px solid #404040; background: #fff; }
.azure-functions-help-toc { overflow: auto; border-right: 1px solid #808080; background: #efefef; padding: 12px; }
.azure-functions-help-toc-title { margin: 0 0 10px; font-size: 12px; font-weight: 700; }
.azure-functions-help-toc-list { list-style: none; margin: 0; padding: 0; }
.azure-functions-help-toc-list li { margin: 0 0 8px; }
.azure-functions-help-toc-list a { color: #000; text-decoration: none; font-size: 12px; }
.azure-functions-help-content { overflow: auto; padding: 16px 20px 22px; }
.azure-functions-help-doc-title { margin: 0 0 12px; font-size: 20px; font-weight: 700; }
.azure-functions-help-intro { margin: 0 0 16px; font-size: 12px; line-height: 1.5; }
.azure-functions-help-section { margin: 0 0 22px; }
.azure-functions-help-heading { margin: 0 0 8px; font-size: 16px; font-weight: 700; }
.azure-functions-help-subheading { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
.azure-functions-help-content p, .azure-functions-help-content li { font-size: 12px; line-height: 1.5; }
.azure-functions-help-content p { margin: 0 0 10px; }
.azure-functions-help-content ul { margin: 0 0 10px 18px; padding: 0; }
.azure-functions-help-divider { margin: 14px 0; border: 0; border-top: 1px solid #d0d0d0; }
.azure-functions-help-codebox { margin: 6px 0 10px; padding: 8px; background: #f4f4f4; border-top: 2px solid #808080; border-left: 2px solid #808080; border-right: 2px solid #fff; border-bottom: 2px solid #fff; }
.azure-functions-help-codebox code { display: block; font-family: "Courier New", Courier, monospace; font-size: 12px; white-space: pre-wrap; }
@media (max-width: 900px) { .azure-functions-help-main { grid-template-columns: 1fr; } .azure-functions-help-toc { border-right: none; border-bottom: 1px solid #808080; } }
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function AzureFunctionsPage(): JSX.Element {
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

    document.title = `Azure Functions (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Azure Functions',
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
    <div className="azure-functions-help-page">
      <style>{azureFunctionsHelpStyles}</style>
      <div className="azure-functions-help-window" role="presentation">
        <header className="azure-functions-help-titlebar">
          <span className="azure-functions-help-title">Azure Functions - Help</span>
          <div className="azure-functions-help-controls">
            <button
              className="azure-functions-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="azure-functions-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="azure-functions-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`azure-functions-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
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
        <div className="azure-functions-help-main">
          <aside className="azure-functions-help-toc" aria-label="Table of contents">
            <h2 className="azure-functions-help-toc-title">Contents</h2>
            <ul className="azure-functions-help-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="azure-functions-help-content">
            <h1 className="azure-functions-help-doc-title">Azure Functions</h1>
            <p className="azure-functions-help-intro">
              Azure Functions is a serverless execution environment for event-driven workloads, but
              it only stays simple when the architecture respects its model. This page goes beyond
              the short definition and covers where the service fits, how triggers and bindings
              shape design, how hosting choices affect latency and cost, and why retries,
              durability, and external state are core parts of building on the platform.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-functions-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-functions-help-divider" />

                <section id="bp-fit" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Where It Fits</h2>
                  {platformFit.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-functions-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-functions-help-divider" />

                <section id="bp-when-not" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">When It Is Not Ideal</h2>
                  {whenNotIdeal.map((item) => (
                    <div key={item.title}>
                      <h3 className="azure-functions-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="azure-functions-help-divider" />

                <section id="bp-takeaways" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Key Takeaways</h2>
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
                <section id="core-model" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Execution Model</h2>
                  {executionModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-hosting" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Hosting Plans</h2>
                  {hostingPlans.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-triggers" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Triggers and Bindings</h2>
                  {triggersAndBindings.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-lifecycle" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Execution Lifecycle and Scaling</h2>
                  {lifecycleAndScaling.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-state" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">State, Retries, and Durability</h2>
                  {stateAndDurability.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-networking" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Networking and Integrations</h2>
                  {networkingAndIntegrations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-security" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Security and Configuration</h2>
                  {securityAndConfiguration.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Deployment and Operations</h2>
                  {deploymentAndOperations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Performance and Cost</h2>
                  {performanceAndCost.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="azure-functions-help-section">
                  <h2 className="azure-functions-help-heading">Pitfalls and Checklist</h2>
                  <ul>
                    {pitfallsAndChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section
                    key={example.id}
                    id={example.id}
                    className="azure-functions-help-section"
                  >
                    <h2 className="azure-functions-help-heading">{example.title}</h2>
                    <p>{example.intro}</p>
                    <div className="azure-functions-help-codebox">
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
              <section id="glossary-terms" className="azure-functions-help-section">
                <h2 className="azure-functions-help-heading">Glossary</h2>
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
