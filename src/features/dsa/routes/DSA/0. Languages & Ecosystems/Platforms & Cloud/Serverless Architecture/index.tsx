import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  steps?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  code: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Serverless Architecture'
const pageSubtitle =
  'Managed, event-driven application design built from stateless compute and cloud services.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Serverless architecture is an application architecture pattern in which the cloud provider manages most infrastructure lifecycle concerns while the application is assembled from stateless compute units and managed platform services.',
      'The important mental shift is that the architecture is not centered on a server that stays alive forever. It is centered on requests, events, scheduled invocations, data stores, queues, identity, and service contracts.',
      'Serverless does not mean there are no servers. It means the engineering team is designing above the server-management layer and is trading some runtime control for managed scaling, managed operations, and faster composition of backend capabilities.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why It Matters',
    paragraphs: [
      'A large amount of modern backend work is naturally demand-driven. A request arrives, a file is uploaded, a payment webhook fires, a message appears on a queue, or a scheduler starts a periodic task. Provisioning long-lived infrastructure for every such workflow is often more operational ceremony than architectural value.',
      'Serverless matters because it lets teams focus on service boundaries, triggers, data flow, permissions, and correctness under retries rather than on patching hosts, replacing nodes, and sizing idle capacity manually.',
      'It is especially strong when the system shape is event-driven, bursty, seasonal, integration-heavy, or made of many small backend capabilities that do not each justify their own always-on service fleet.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where It Fits Best',
    paragraphs: [
      'Serverless is strongest for event processors, webhook endpoints, API backends with variable traffic, scheduled jobs, automation, file and media processing pipelines, notifications, orchestration steps, and integration glue between managed services.',
      'It is also a good fit when the architecture already wants managed building blocks such as object storage, message queues, authentication, secret management, and serverless databases or caches.',
      'It is weaker when the workload needs long-running in-memory state, stable low-latency warm processes at all times, unusual networking assumptions, specialized host-level control, or a broad service boundary that behaves more like a traditional application platform than a set of bounded handlers.',
    ],
  },
  {
    id: 'bp-shape',
    title: 'Typical System Shape',
    steps: [
      'A request, message, file event, database change, or scheduler trigger starts the work.',
      'A small stateless compute unit validates input, loads context, and performs one bounded responsibility.',
      'Durable state is read from or written to managed storage such as a database, object store, cache, or queue.',
      'Slow or fan-out work is pushed to asynchronous infrastructure such as queues, topics, streams, or workflow engines.',
      'Logs, traces, metrics, and dead-letter handling provide the operational record because there is no single long-lived host to inspect manually.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    bullets: [
      'Serverless is an architecture model, not only a compute product.',
      'Stateless compute and externalized state are central assumptions.',
      'Retries, duplicate delivery, and partial failure are normal and must be designed for.',
      'Automatic scaling helps only when downstream systems and concurrency limits are designed deliberately.',
      'Serverless removes a class of infrastructure work, but it does not remove distributed-systems complexity.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Architecture over runtime',
    detail:
      'The core design object is the workflow between triggers, compute, storage, and messaging, not a single long-lived machine process.',
  },
  {
    title: 'Compute is disposable, state is not',
    detail:
      'Instances may start, stop, retry, or be replaced at any time. Durable business state belongs in explicit storage systems, not in process memory.',
  },
  {
    title: 'Contracts matter more than hosts',
    detail:
      'Request schemas, event schemas, IAM boundaries, timeout limits, retry semantics, and downstream guarantees define correctness more than any server name ever will.',
  },
  {
    title: 'Small units do not automatically mean simple systems',
    detail:
      'A hundred narrow handlers with weak ownership and unclear contracts can be harder to operate than one well-designed service.',
  },
  {
    title: 'Scaling is useful only with control',
    detail:
      'If upstream compute scales faster than the database, queue consumer, or third-party API, the platform can magnify failure instead of preventing it.',
  },
  {
    title: 'Retries are part of the happy path',
    detail:
      'In event-driven serverless systems, replay-safe behavior is a correctness requirement, not an edge case.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-architecture',
    title: 'Architecture and Execution Model',
    paragraphs: [
      'Serverless architecture usually combines three things: a trigger model, a compute model, and a set of managed backing services. The compute layer may be function-oriented, container-oriented, or job-oriented, but the architectural pattern is the same: execute on demand and push durable state into managed systems.',
      'A compute unit in a serverless system should be treated as a bounded execution surface with explicit resource limits, startup behavior, identity, and failure semantics. It is not a reliable place to store shared system truth.',
      'This is why serverless design is tightly connected to event modeling, data design, and workflow decomposition. If those parts are weak, the platform cannot rescue the architecture.',
    ],
  },
  {
    id: 'core-build-blocks',
    title: 'Core Building Blocks',
    bullets: [
      'Request entry: API gateway, edge function, reverse proxy, or public endpoint.',
      'Event entry: queue, topic, stream, object storage event, database change feed, or scheduler.',
      'Compute: function, handler, containerized service, or run-to-completion job.',
      'State: relational database, key-value store, document store, object storage, cache, or search index.',
      'Workflow and decoupling: queue, event bus, pub-sub topic, stream, or workflow engine.',
      'Security: identity provider, execution role or service account, secrets manager, and policy layer.',
      'Operations: centralized logging, metrics, tracing, alarms, and dead-letter handling.',
    ],
  },
  {
    id: 'core-workload-shapes',
    title: 'Request-Driven, Event-Driven, and Scheduled Work',
    paragraphs: [
      'Request-driven serverless paths are usually synchronous and user-facing. They care about validation, authorization, latency, and how quickly the system can return a response. These paths are often a poor place for heavy fan-out or long-running work.',
      'Event-driven paths are usually asynchronous and are shaped by delivery guarantees, retries, ordering, batching, and side-effect safety. They can be more scalable and resilient, but they demand stronger thinking about idempotency and eventual consistency.',
      'Scheduled work looks simple, but it is still part of the same architecture. Cron-style serverless jobs need bounded execution, chunking, retry strategy, and operational visibility just like any other production workload.',
    ],
  },
  {
    id: 'core-state',
    title: 'State Management and Data Boundaries',
    paragraphs: [
      'A healthy serverless design treats the compute layer as transient and the data layer as intentional. Durable state should be stored in systems chosen for clear access patterns, consistency needs, partitioning behavior, and failure assumptions.',
      'The most common design mistake is to let business state become implicit in handler execution order or in-memory process reuse. Warm-instance reuse can help performance, but it is not a reliable persistence model.',
      'Another important boundary is transactional scope. A single function often talks to multiple systems, and those systems rarely share a transaction boundary. This pushes the design toward compensating actions, idempotent writes, and eventual-consistency-aware workflows.',
    ],
  },
  {
    id: 'core-delivery',
    title: 'Delivery Semantics, Retries, and Idempotency',
    paragraphs: [
      'At-least-once delivery is common in serverless event systems. A queue may redeliver a message, a webhook provider may retry a failed callback, or a platform may replay work after an internal error. Correctness therefore depends on handling the same logical event more than once without corrupting the system.',
      'Idempotency can be implemented with deduplication tables, idempotency keys, conditional writes, natural business keys, or write-once event markers. The exact mechanism is less important than making replay behavior explicit.',
      'Teams that ignore retry semantics often build systems that work in happy-path demos and fail under production ambiguity. In serverless architecture, retry behavior is not a transport detail. It changes business correctness.',
    ],
  },
  {
    id: 'core-workflows',
    title: 'Workflow Orchestration and Eventual Consistency',
    paragraphs: [
      'Many serverless systems are really workflows expressed across multiple managed services. An order is accepted, an event is emitted, inventory is reserved, payment is confirmed, and notifications are sent. Each step may succeed or fail independently.',
      'That means the system often behaves as a distributed workflow rather than a single atomic transaction. Good design makes state transitions visible, compensations possible, and timeouts or stuck work observable.',
      'Workflow engines, state machines, and explicit saga-style coordination are useful when the process spans many side effects and the team needs stronger visibility than loose event chaining provides.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling, Concurrency, and Backpressure',
    paragraphs: [
      'Serverless platforms can scale compute very quickly. That is one of their main strengths, but it is also one of their main risks. A burst of requests or messages can turn into a burst of downstream database connections, third-party API calls, or internal service traffic.',
      'Concurrency limits, queue buffering, rate limiting, batch sizing, and workload partitioning are not optional tuning details. They are the controls that keep elastic compute from overwhelming the rest of the system.',
      'A useful rule is to design around the slowest stable dependency, not the fastest serverless scale-up path. Otherwise the platform simply moves the bottleneck and makes the failure noisier.',
    ],
  },
  {
    id: 'core-cold-starts',
    title: 'Cold Starts, Startup Cost, and Runtime Reuse',
    paragraphs: [
      'When a serverless platform starts a fresh execution environment, startup cost appears before useful work begins. Dependency weight, initialization logic, framework choice, network setup, and runtime characteristics all influence this cost.',
      'Cold starts matter most for latency-sensitive endpoints and low-frequency workloads that do not stay warm naturally. The right mitigation depends on the platform and workload shape: smaller dependencies, lighter startup paths, pre-warmed capacity, or moving the workload to a different hosting model.',
      'Warm reuse can improve latency and reduce repeated setup cost, but code should treat reuse as an optimization opportunity rather than a correctness dependency. Reused state must be safe, bounded, and replaceable at any time.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security, Identity, and Secret Management',
    paragraphs: [
      'Every function or serverless service runs with an identity, and that identity determines what data and services it can reach. Least-privilege policy is therefore part of application architecture, not just infrastructure administration.',
      'Small deployable units can increase the attack surface if each one has broad permissions, weak trigger controls, or inconsistent secret handling. Good serverless security uses narrow execution roles or service accounts, deliberate invocation permissions, and centralized secret storage.',
      'A useful mental model is that each handler is its own trust boundary. If a unit of code can be invoked automatically and can call other sensitive systems, its permissions and inputs deserve the same rigor as any larger service.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking, Connectivity, and Edge Concerns',
    paragraphs: [
      'Serverless does not remove networking decisions. Public endpoints still need ingress control, authentication, rate limiting, and edge protection. Private workloads still need careful connectivity to databases, internal services, and egress destinations.',
      'Attaching serverless compute to private networks can be necessary, but it also changes startup behavior, routing complexity, and operational debugging. Connectivity should be added because the workload requires it, not because teams copy a default template blindly.',
      'Another networking concern is data gravity and latency. If a supposedly lightweight handler makes many network hops to reach databases, message brokers, or external APIs, the serverless layer may be quick while the end-to-end path remains slow and fragile.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability and Operational Debugging',
    paragraphs: [
      'Serverless architecture needs strong observability because there is rarely a stable host to inspect after the fact. Logs must be structured, traces must connect distributed steps, and metrics must reveal both platform behavior and business outcomes.',
      'Correlation IDs, event IDs, queue message IDs, and workflow state identifiers are especially important. Without them, teams can see that something failed but not which request or event caused the failure path.',
      'Operational debugging also needs dead-letter visibility, alarm thresholds, timeout awareness, and dashboards that show burst behavior, throttling, backlog, and downstream dependency saturation. These are first-class production signals in serverless systems.',
    ],
  },
  {
    id: 'core-delivery-model',
    title: 'Deployment Model, Versioning, and Release Discipline',
    paragraphs: [
      'Serverless units are small, but production release discipline still matters. Handlers, event schemas, permissions, environment settings, and infrastructure mappings should be reviewed and deployed as a coherent change set.',
      'Schema evolution is one of the most common pain points. If one function emits an event shape that another function assumes is stable, deployment order and backward compatibility become real engineering concerns.',
      'Good teams treat serverless deployment as platform engineering rather than as a shortcut around it. CI/CD, infrastructure-as-code, staged rollout, and clear ownership matter just as much here as they do for larger services.',
    ],
  },
  {
    id: 'core-cost',
    title: 'Cost Model and Performance Tradeoffs',
    paragraphs: [
      'Serverless cost is shaped by invocation count, execution duration, memory sizing, storage operations, queue or bus traffic, data transfer, and the cost of adjacent managed services. The compute bill alone rarely tells the full story.',
      'Fine-grained scaling can save money for intermittent workloads, but noisy event fan-out, chatty storage access, or excessive cross-service calls can make a serverless system more expensive than a better-shaped alternative.',
      'Performance tuning often improves both latency and cost. Reducing startup work, shrinking dependency trees, batching wisely, reusing clients safely, and offloading the right work to asynchronous paths usually matter more than micro-optimizing a few lines of handler code.',
    ],
  },
  {
    id: 'core-patterns',
    title: 'Common Design Patterns',
    bullets: [
      'Thin synchronous API path that publishes an event for slower work.',
      'Queue-based worker fleet for smoothing burst traffic and isolating failures.',
      'Storage-triggered processing pipeline for media, documents, or analytics artifacts.',
      'Webhook receiver that validates signatures and hands off work asynchronously.',
      'State-machine or saga workflow for multi-step distributed business processes.',
      'Scheduled maintenance jobs that batch work and update progress markers.',
      'Fan-out event bus architecture where one domain event drives multiple subscribers.',
      'BFF-style edge handler that aggregates managed backend services for a frontend client.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use Cases, Tradeoffs, and Compare-and-Contrast',
    paragraphs: [
      'Compared with traditional always-on services, serverless reduces infrastructure ownership and improves elastic scaling for many workloads, but it constrains runtime assumptions and pushes more importance onto event contracts and managed-service integration.',
      'Compared with containers on a managed platform, serverless functions are usually narrower and simpler to trigger, while serverless containers can be stronger when the workload behaves more like a full service than a single handler.',
      'Compared with monolithic request-response systems, serverless encourages decomposition and asynchronous boundaries. That can improve resilience and team autonomy, but it can also increase coordination cost and make the system harder to reason about if ownership and observability are weak.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common Mistakes and Anti-Patterns',
    bullets: [
      'Treating serverless as a synonym for simple and skipping architecture work.',
      'Writing non-idempotent handlers for queues, webhooks, or retried platform events.',
      'Letting one handler grow into a hidden monolith with too many unrelated responsibilities.',
      'Ignoring downstream bottlenecks and allowing uncontrolled concurrency bursts.',
      'Relying on process memory or local files as if they were durable system state.',
      'Granting broad permissions to every function because IAM design feels inconvenient.',
      'Choosing serverless for workloads that are effectively long-running services with heavy warm-state needs.',
      'Skipping structured logs and tracing because the code unit is small.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Is the workload naturally request-driven, event-driven, or scheduled?',
      'Where does durable state live, and what consistency model does it need?',
      'What are the retry and duplicate-delivery assumptions for each trigger path?',
      'What is the safe concurrency level for every downstream dependency?',
      'How will idempotency be enforced for externally visible side effects?',
      'Which identity should each compute unit run as, and what is the smallest permission set it needs?',
      'How will logs, traces, metrics, and dead-letter handling expose failure paths?',
      'Would a containerized service or another hosting model fit better if the unit is becoming too broad?',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced Practice and Governance',
    paragraphs: [
      'Mature serverless teams invest in naming conventions, event catalogs, reusable middleware or platform libraries, shared observability standards, and guardrails around IAM and deployment pipelines. Those practices keep many small units from becoming operational chaos.',
      'They also distinguish carefully between platform-level abstractions and business logic. Shared code for auth, tracing, validation, event publishing, and secrets access can improve consistency, but only when it remains transparent and does not hide important runtime behavior.',
      'The broader lesson is that serverless architecture scales organizationally only when technical boundaries, ownership, release discipline, and runtime assumptions stay explicit. Managed infrastructure reduces toil, but governance still determines system quality.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-api',
    title: 'Thin API Handler With Async Fan-Out',
    summary:
      'A synchronous endpoint does only the minimum work needed for correctness, then publishes an event for slower downstream processing.',
    code: `export async function createOrder(request: Request) {
  const payload = await request.json()
  const order = await orders.insert(payload)

  await events.publish('order.created', {
    orderId: order.id,
    customerId: order.customerId,
  })

  return Response.json({ orderId: order.id }, { status: 201 })
}`,
    explanation:
      'This pattern keeps the user-facing path short and moves enrichment, notifications, or analytics work to asynchronous consumers. It is one of the most common serverless API shapes.',
  },
  {
    id: 'ex-webhook',
    title: 'Webhook Receiver With Idempotency Key',
    summary:
      'External callbacks are often retried, so the receiver records an idempotency key before processing side effects.',
    code: `export async function paymentWebhook(event: WebhookEvent) {
  const alreadyHandled = await processedEvents.has(event.id)
  if (alreadyHandled) return

  await processedEvents.mark(event.id)
  await ledger.recordPayment(event.payload)
  await events.publish('payment.recorded', event.payload)
}`,
    explanation:
      'Webhook processing is a classic place where systems fail under replay. The idempotency record turns repeated delivery into a safe no-op instead of a duplicate business action.',
  },
  {
    id: 'ex-queue',
    title: 'Queue Consumer With Bounded Concurrency',
    summary:
      'A queue smooths traffic spikes, while the consumer processes messages safely and leaves room for retry or dead-letter handling.',
    code: `export async function consumeBatch(messages: QueueMessage[]) {
  for (const message of messages) {
    if (await dedupe.has(message.id)) continue

    await processWork(message.payload)
    await dedupe.mark(message.id)
  }
}`,
    explanation:
      'The important point is not the loop. It is the architectural shape: queue buffering, replay-safe processing, and explicit control over how fast work reaches downstream systems.',
  },
  {
    id: 'ex-storage',
    title: 'Storage Event Processing Pipeline',
    summary:
      'A file upload starts a pipeline that reads the object, performs bounded work, stores the result, and updates metadata externally.',
    code: `export async function onFileUploaded(event: StorageEvent) {
  const source = await storage.read(event.bucket, event.key)
  const thumbnail = await images.resize(source, { width: 320 })

  await storage.write('thumbnails', event.key, thumbnail)
  await metadata.upsert({
    fileKey: event.key,
    status: 'processed',
  })
}`,
    explanation:
      'This is a standard serverless media-processing pattern. The function does not keep durable state in memory. It moves the durable result into managed systems.',
  },
  {
    id: 'ex-schedule',
    title: 'Scheduled Cleanup Job',
    summary:
      'Timer-driven work still needs chunking, progress visibility, and replay-safe behavior.',
    code: `export async function nightlyCleanup() {
  const expiredSessions = await sessions.listExpired({ limit: 500 })

  for (const session of expiredSessions) {
    await sessions.deleteIfPresent(session.id)
  }

  await metrics.increment('cleanup.runs')
}`,
    explanation:
      'Scheduled serverless tasks should be treated like production workloads, not like throwaway scripts. They need bounds, observability, and safe retry behavior.',
  },
  {
    id: 'ex-workflow',
    title: 'Workflow-Oriented Serverless Shape',
    summary:
      'Some business flows are better represented as explicit steps with state transitions than as an opaque chain of loosely coupled handlers.',
    code: `Order accepted
  -> reserve inventory
  -> authorize payment
  -> publish shipment request
  -> send confirmation

On failure:
  -> compensate prior side effects
  -> mark workflow state
  -> alert if recovery stalls`,
    explanation:
      'This is the serverless workflow view in plain text. It highlights that orchestration, compensation, and state visibility matter when a process spans multiple services and side effects.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Serverless',
    definition:
      'An operational architecture model where the provider manages most infrastructure lifecycle work and compute typically runs on demand.',
  },
  {
    term: 'Function as a Service (FaaS)',
    definition:
      'A serverless compute model that executes small handler-style units in response to triggers.',
  },
  {
    term: 'Managed service',
    definition:
      'A cloud service where the provider operates the underlying infrastructure and exposes a higher-level runtime or API contract.',
  },
  {
    term: 'Event-driven architecture',
    definition:
      'A design style where components react to emitted events rather than relying only on synchronous request-response calls.',
  },
  {
    term: 'Cold start',
    definition:
      'The initialization latency incurred when a fresh execution environment is created before user code can handle work.',
  },
  {
    term: 'Warm instance',
    definition:
      'A reused execution environment that can process another request or event without full cold-start initialization.',
  },
  {
    term: 'Idempotency',
    definition:
      'A property where repeating the same logical operation does not create an incorrect additional effect.',
  },
  {
    term: 'Dead-letter queue',
    definition:
      'A destination for messages or events that could not be processed successfully after retries.',
  },
  {
    term: 'Backpressure',
    definition:
      'The set of mechanisms that slows or buffers upstream work so downstream systems are not overwhelmed.',
  },
  {
    term: 'Event bus',
    definition:
      'A routing layer that distributes published events to interested consumers or rules.',
  },
  {
    term: 'Workflow engine',
    definition:
      'A service that coordinates multi-step processes, state transitions, retries, and compensations explicitly.',
  },
  {
    term: 'Stateless compute',
    definition:
      'Compute whose durable correctness does not depend on local process memory or local disk surviving across invocations.',
  },
  {
    term: 'Execution role or service account',
    definition:
      'The identity under which a serverless unit runs and calls other services or data stores.',
  },
  {
    term: 'Durable state',
    definition:
      'System state stored in a database, queue, object store, cache, or other persistent system rather than transient process memory.',
  },
  {
    term: 'Fan-out',
    definition:
      'A pattern where one incoming event or request causes multiple downstream actions or subscribers to run.',
  },
  {
    term: 'Eventually consistent workflow',
    definition:
      'A workflow in which distributed state converges over time rather than changing atomically in one transaction.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-fit', label: 'Where It Fits Best' },
    { id: 'bp-shape', label: 'Typical System Shape' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Execution Model' },
    { id: 'core-build-blocks', label: 'Building Blocks' },
    { id: 'core-workload-shapes', label: 'Workload Shapes' },
    { id: 'core-state', label: 'State and Data Boundaries' },
    { id: 'core-delivery', label: 'Retries and Idempotency' },
    { id: 'core-workflows', label: 'Workflow Orchestration' },
    { id: 'core-scaling', label: 'Scaling and Backpressure' },
    { id: 'core-cold-starts', label: 'Cold Starts' },
    { id: 'core-security', label: 'Security and Identity' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-delivery-model', label: 'Deployment Model' },
    { id: 'core-cost', label: 'Cost and Performance' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-antipatterns', label: 'Common Mistakes' },
    { id: 'core-checklist', label: 'Decision Checklist' },
    { id: 'core-advanced', label: 'Advanced Practice' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ServerlessArchitecturePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Serverless Architecture Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Serverless Architecture Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="serverless-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page is intentionally thorough. It is meant to read like a compact serverless
        architecture manual: execution model, triggers, state design, retries, workflow
        coordination, scaling, security, observability, performance, and the tradeoffs that
        determine when serverless is the right architecture and when it is not.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.steps && (
                <ol>
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
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
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

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
