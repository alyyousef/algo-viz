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

const cloudFunctionsHelpStyles = `
.cloudfunctions-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cloudfunctions-help-window {
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

.cloudfunctions-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cloudfunctions-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.cloudfunctions-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cloudfunctions-help-control {
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

.cloudfunctions-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cloudfunctions-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.cloudfunctions-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.cloudfunctions-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.cloudfunctions-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.cloudfunctions-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cloudfunctions-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloudfunctions-help-toc-list li {
  margin: 0 0 8px;
}

.cloudfunctions-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.cloudfunctions-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.cloudfunctions-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.cloudfunctions-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.cloudfunctions-help-section {
  margin: 0 0 20px;
}

.cloudfunctions-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cloudfunctions-help-content p,
.cloudfunctions-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cloudfunctions-help-content p {
  margin: 0 0 10px;
}

.cloudfunctions-help-content ul,
.cloudfunctions-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cloudfunctions-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.cloudfunctions-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.cloudfunctions-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .cloudfunctions-help-main {
    grid-template-columns: 1fr;
  }

  .cloudfunctions-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .cloudfunctions-help-title {
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
      'Cloud Functions is Google Cloud\'s event-driven serverless function platform. In current Google Cloud documentation, the modern model is closely tied to Cloud Run functions, so the service inherits more of the Cloud Run serverless execution model than older first-generation functions did.',
      'The simplest mental model is this: write a small focused function, define the HTTP or event trigger that should invoke it, and let the platform provision runtime instances on demand.',
      'The service is commonly used for webhook endpoints, file-processing automation, Pub/Sub consumers, scheduled jobs, lightweight APIs, and integration logic between managed cloud services.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'A lot of backend work is event-shaped rather than server-shaped. A file is uploaded, a message arrives, a scheduled tick fires, or an external webhook calls an endpoint. Provisioning a full application service for each of those workflows can be unnecessary overhead.',
      'Cloud Functions matters because it packages runtime management, scaling, trigger plumbing, and observability into a managed execution model that is very well suited to small event handlers.',
      'In a GCP architecture, Cloud Functions often acts as the glue layer. It connects storage to processing, messaging to persistence, external callbacks to internal workflows, and serverless events to small units of business logic.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Cloud Functions is strongest when the unit of work is narrow, event-driven, or exposed as a small HTTP endpoint. It fits automation, integration points, file and message processing, and focused backend behavior.',
      'It is especially useful when a team wants to avoid container and server management for code that does not justify a larger service boundary.',
      'It is weaker when the workload is a broad application with many routes, long-lived processes, connection-heavy behavior, or a need for a richer general-purpose service model. That is where Cloud Run or another application hosting model often becomes a better fit.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common workflow is to implement one function, configure an HTTP or event trigger, deploy it with the right runtime and identity, and then let the platform invoke it as requests or events arrive.',
      'Another common pattern is to chain managed services together with small functions. A file upload triggers metadata extraction, which publishes a message, which starts downstream processing or notification logic.',
      'This matters because Cloud Functions is rarely a full product by itself. It is a focused execution surface inside a broader event-driven architecture.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Cloud Functions as a serverless event and HTTP handler platform for small focused backend work.',
      'Modern Cloud Functions usage is closely aligned with the Cloud Run functions execution model.',
      'Triggers, retries, identity, and idempotency are core parts of the design, not secondary configuration.',
      'The service works best when each function has a narrow responsibility and a clear contract.',
      'Cloud Functions becomes most valuable when combined with messaging, storage, scheduling, and deployment automation in a larger GCP platform.',
    ],
  },
]

const mentalModels = [
  {
    title: 'A function is more than code',
    detail:
      'The handler code is only part of the system. Trigger model, identity, retry behavior, scaling controls, and downstream side effects all matter.',
  },
  {
    title: 'Small scope wins',
    detail:
      'Functions stay maintainable when each one has a narrow purpose, a clear input shape, and a predictable output or side effect.',
  },
  {
    title: 'Stateless by default',
    detail:
      'A function should not rely on local in-memory state being durable between invocations. Durable state belongs in managed storage systems.',
  },
  {
    title: 'Retries change correctness',
    detail:
      'Event-driven correctness depends on retry-aware logic. A function that is correct once may still be incorrect if it can run more than once for the same event.',
  },
  {
    title: 'Cold starts are part of design',
    detail:
      'Startup behavior, dependency size, and runtime initialization affect latency and cost. This is an architectural concern, not just a deployment detail.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-architecture',
    title: 'Architecture and execution model',
    paragraphs: [
      'Cloud Functions provides managed execution for event-triggered and HTTP-triggered code. The platform receives an invocation, provisions or reuses an instance, executes the handler, and integrates the result with logs, metrics, and surrounding Google Cloud services.',
      'The modern execution model is closely related to Cloud Run functions. That means concepts such as serverless instance lifecycle, scaling controls, runtime startup cost, and request handling behavior are part of the real mental model even if the developer experience remains function-first.',
      'The practical architectural implication is that a function is code plus trigger plus identity plus scaling behavior plus observability. Leaving any of those out produces an incomplete design.',
    ],
  },
  {
    id: 'core-triggers',
    title: 'HTTP triggers and event triggers',
    paragraphs: [
      'Cloud Functions supports two broad invocation styles: direct HTTP invocation and event-driven invocation. HTTP functions behave like narrow serverless endpoints. Event-driven functions react to events from cloud services and messaging systems.',
      'The distinction matters because HTTP handlers need response handling, authentication, and request validation, while event handlers need retry awareness, event contract parsing, and side-effect discipline.',
      'Choosing the right trigger type is therefore not just a deployment choice. It changes how the function is secured, observed, retried, and composed with the rest of the system.',
    ],
  },
  {
    id: 'core-events',
    title: 'Event delivery, retries, and idempotency',
    paragraphs: [
      'In event-driven serverless systems, duplicate delivery and retries are normal engineering concerns. The platform may invoke a function again when a previous attempt fails or when delivery semantics require another attempt.',
      'This means handlers should be idempotent whenever possible. If a function writes records, sends emails, publishes messages, or mutates downstream systems, it needs a strategy to prevent duplicated side effects.',
      'A practical technique is to propagate event IDs or operation IDs into downstream writes so repeated invocations can be detected safely.',
    ],
  },
  {
    id: 'core-runtime',
    title: 'Runtime environment and language model',
    paragraphs: [
      'Cloud Functions supports multiple runtimes, but the most important cross-language concern is startup and dependency weight. Everything initialized before the handler can affect cold-start latency and cost.',
      'Heavy frameworks, large dependency graphs, and broad initialization logic may make small functions behave like overgrown applications. That weakens one of the main benefits of the platform.',
      'A good runtime design keeps the handler focused, initializes shared clients carefully, and avoids large unnecessary application scaffolding for simple tasks.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling, concurrency, and instance controls',
    paragraphs: [
      'Cloud Functions scales automatically, but automatic scaling is still a design constraint. Teams need to think about how many instances may start, how concurrent work behaves, and what downstream systems can tolerate under burst load.',
      'Scaling is not only about serving more traffic. It is also about protecting databases, third-party APIs, and internal services from sudden request amplification.',
      'Minimum and maximum instance controls, along with concurrency-related behavior in the modern platform model, are therefore reliability tools as much as performance or cost tools.',
    ],
  },
  {
    id: 'core-network',
    title: 'Networking and service integration',
    paragraphs: [
      'Many functions are simple public endpoints, but production systems often need controlled egress, private services, and access to internal resources. That makes networking a meaningful part of Cloud Functions architecture.',
      'The function code may be tiny while the systems it touches are not. A small handler that reaches into sensitive databases, private APIs, or internal event paths still needs careful network and IAM design.',
      'A useful rule is to treat connectivity as part of the function contract. If the function depends on private resources, that dependency should be explicit in platform design and deployment review.',
    ],
  },
  {
    id: 'core-security',
    title: 'Identity, permissions, and security boundaries',
    paragraphs: [
      'Every function runs as an identity, and that identity determines what the function can access. Least-privilege IAM is therefore part of application correctness, not just platform administration.',
      'Security posture also depends on trigger style. Public HTTP handlers, authenticated service-to-service endpoints, and internal event consumers have very different threat models.',
      'A common mistake is to grant functions broad project-wide permissions because the code looks small. In serverless systems, small code with oversized IAM is still a large security risk.',
    ],
  },
  {
    id: 'core-state',
    title: 'State management and downstream systems',
    paragraphs: [
      'Functions should be designed as stateless execution units. Durable data belongs in databases, object storage, queues, or other managed persistence systems.',
      'Warm instances can reuse in-memory objects, which is useful for performance, but correctness should never depend on that reuse. Warm state is an optimization opportunity, not durable application memory.',
      'This distinction is important because many subtle serverless bugs come from accidentally assuming more process continuity than the platform guarantees.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Logs, metrics, and operational visibility',
    paragraphs: [
      'A production function needs more than a working handler. Teams need request and event visibility, failure context, latency signals, and structured logs that help distinguish one invocation from another.',
      'Serverless systems can feel simple until a distributed failure occurs. At that point, structured logs, error reporting, and event context become essential.',
      'The practical lesson is to design observability into the function from the start. Emit useful context and meaningful error information rather than relying on ad hoc debugging after deployment.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, cold starts, and efficiency',
    paragraphs: [
      'Cloud Functions performance is shaped by runtime startup, dependency size, handler complexity, and downstream network calls. For low-volume or bursty systems, cold starts often matter more than raw steady-state compute speed.',
      'The most effective optimizations are usually simple: keep dependencies small, limit startup work, avoid unnecessary framework weight, and push heavyweight long-running jobs into more suitable execution models.',
      'Efficiency also means choosing the right serverless shape. If the function is quietly becoming a large multi-endpoint backend, it may be time to move to a service-oriented platform instead.',
    ],
  },
  {
    id: 'core-devx',
    title: 'Deployment workflow and platform discipline',
    paragraphs: [
      'Functions still need disciplined software delivery. Teams should version source, review config and IAM changes, automate deployment, and keep revision history understandable.',
      'This is one reason Cloud Build and CI/CD pipelines matter for serverless systems too. A deployed function is production infrastructure, not a special case that should bypass engineering controls.',
      'Good deployment discipline also makes rollback and incident review easier because code, trigger configuration, and runtime settings move together as one reviewed unit.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and common service pairings',
    paragraphs: [
      'Cloud Functions commonly appears beside Cloud Storage, Pub/Sub, Eventarc, Firestore, Secret Manager, Cloud Scheduler, and Cloud Build. This is because functions are often used as glue between managed services.',
      'That ecosystem fit is one of the platform\'s main advantages. Teams can compose workflows quickly without standing up a larger backend for every integration point.',
      'The tradeoff is architectural sprawl. Many small functions across many triggers can become hard to govern unless ownership, naming, logging, and deployment standards stay clear.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with Cloud Run, Cloud Functions is often simpler for narrow handlers and event consumers, while Cloud Run is usually better when the workload behaves like a fuller service or requires more application-level control.',
      'Compared with Compute Engine or GKE, Cloud Functions removes most infrastructure management but gives up low-level control and some application flexibility.',
      'Compared with one-off scripts and cron jobs, Cloud Functions adds managed deployment, observability, IAM, and scaling, which is what usually makes the difference between a toy automation and a production platform component.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Turning one function into a mini-monolith with too many unrelated responsibilities.',
      'Ignoring idempotency and then producing duplicate side effects during retries.',
      'Using large framework and dependency stacks for tiny pieces of logic.',
      'Treating warm-instance memory as durable application state.',
      'Granting functions far more permissions than they actually need.',
      'Forcing long-lived service workloads into Cloud Functions when they belong in a broader service platform.',
      'Skipping observability because the code is small, leaving too little context to debug production failures.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Use Cloud Functions when the workload is naturally event-driven or is a narrow HTTP endpoint with a clear boundary.',
      'Prefer Cloud Run when the workload behaves more like a full service than a single handler.',
      'Design every event-driven function for retries and idempotency.',
      'Keep startup cost small and dependencies intentional to reduce cold-start pain.',
      'Treat trigger setup, IAM, and downstream side effects as core design elements.',
      'Use functions as composable building blocks, not as a catch-all home for miscellaneous backend logic.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Cloud Functions, they usually become more deliberate about event contracts, observability, scaling controls, IAM isolation, and the boundary between function-sized work and service-sized work.',
      'They also improve how they handle retries, failure routing, release automation, and dependency governance. Those practices are what keep serverless systems reliable once they become important.',
      'The practical lesson is that serverless simplicity does not remove architecture. It concentrates architectural decisions into triggers, identity, scaling, and side-effect design.',
    ],
  },
]

const examples = [
  {
    title: 'HTTP hello-world style function',
    code: `export const helloHttp = (req, res) => {
  res.status(200).send('Hello from Cloud Functions');
};`,
    explanation:
      'This is the simplest HTTP model: accept a request, return a response, and let the platform handle provisioning and scaling.',
  },
  {
    title: 'Cloud Storage event handler',
    code: `export const onFileUpload = async (cloudEvent) => {
  const file = cloudEvent.data;
  console.log('Bucket:', file.bucket);
  console.log('Name:', file.name);
};`,
    explanation:
      'Event-driven functions consume structured event data. The real design challenge is usually not reading the event, but making downstream actions safe and repeatable.',
  },
  {
    title: 'Idempotent event processing pattern',
    code: `export const processOrderEvent = async (cloudEvent) => {
  const eventId = cloudEvent.id;
  const order = cloudEvent.data;

  const alreadyProcessed = await hasProcessedEvent(eventId);
  if (alreadyProcessed) return;

  await writeOrderProjection(order);
  await markEventProcessed(eventId);
};`,
    explanation:
      'This is a basic retry-safe pattern. The handler checks whether it has already processed the event before applying side effects.',
  },
  {
    title: 'Reuse a shared client outside the handler carefully',
    code: `import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export const listBucket = async (req, res) => {
  const [files] = await storage.bucket(req.query.bucket).getFiles();
  res.json(files.map((file) => file.name));
};`,
    explanation:
      'Reusing clients outside the handler can reduce repeated setup cost on warm instances. The key is to treat this as a performance optimization, not as durable shared state.',
  },
  {
    title: 'Deploy an HTTP function from the CLI',
    code: `gcloud functions deploy helloHttp \
  --gen2 \
  --runtime=nodejs22 \
  --region=us-central1 \
  --source=. \
  --entry-point=helloHttp \
  --trigger-http \
  --allow-unauthenticated`,
    explanation:
      'Deployment settings are part of the function model. Runtime, region, generation, entry point, and trigger selection all affect behavior and should be treated as deliberate infrastructure choices.',
  },
  {
    title: 'Deploy a storage-triggered function',
    code: `gcloud functions deploy onFileUpload \
  --gen2 \
  --runtime=nodejs22 \
  --region=us-central1 \
  --source=. \
  --entry-point=onFileUpload \
  --trigger-bucket=my-upload-bucket`,
    explanation:
      'This example shows the event-driven shape directly. The function is attached to a storage event source instead of exposed as an HTTP endpoint.',
  },
]

const glossaryTerms = [
  {
    term: 'Function',
    definition: 'A small deployable unit of serverless code that runs in response to an HTTP request or event trigger.',
  },
  {
    term: 'HTTP trigger',
    definition: 'An invocation model where the function is called directly through an HTTP request.',
  },
  {
    term: 'Event trigger',
    definition: 'An invocation model where the function runs in response to a cloud event such as a file upload or message.',
  },
  {
    term: 'CloudEvent',
    definition: 'A standard event envelope used to describe metadata and payload for event-driven functions.',
  },
  {
    term: 'Cold start',
    definition: 'The extra startup latency that occurs when the platform creates a fresh instance to handle an invocation.',
  },
  {
    term: 'Warm instance',
    definition: 'A reused function instance that can handle another invocation without full cold-start initialization.',
  },
  {
    term: 'Idempotency',
    definition: 'The property that lets repeated processing of the same invocation or event avoid duplicate side effects.',
  },
  {
    term: 'Entry point',
    definition: 'The exported function handler that the platform invokes inside the deployed source package.',
  },
  {
    term: 'Generation 2',
    definition: 'The newer Cloud Functions model aligned more closely with Cloud Run serverless infrastructure and capabilities.',
  },
  {
    term: 'Concurrency',
    definition: 'The amount of simultaneous work an instance can handle, depending on runtime model and configuration.',
  },
  {
    term: 'Max instances',
    definition: 'A control that limits how many instances the platform may start for a function.',
  },
  {
    term: 'Service account',
    definition: 'The identity the function uses to access other Google Cloud resources.',
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
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Architecture and Execution' },
    { id: 'core-triggers', label: 'HTTP and Event Triggers' },
    { id: 'core-events', label: 'Retries and Idempotency' },
    { id: 'core-runtime', label: 'Runtime Environment' },
    { id: 'core-scaling', label: 'Scaling and Concurrency' },
    { id: 'core-network', label: 'Networking and Integration' },
    { id: 'core-security', label: 'Security and IAM' },
    { id: 'core-state', label: 'State Management' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-devx', label: 'Deployment Workflow' },
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

export default function GCPCloudFunctionsPage(): JSX.Element {
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
    document.title = `GCP Cloud Functions (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Cloud Functions',
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
    <div className="cloudfunctions-help-page">
      <style>{cloudFunctionsHelpStyles}</style>
      <div className="cloudfunctions-help-window" role="presentation">
        <header className="cloudfunctions-help-titlebar">
          <span className="cloudfunctions-help-title">GCP Cloud Functions</span>
          <div className="cloudfunctions-help-controls">
            <button className="cloudfunctions-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="cloudfunctions-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cloudfunctions-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`cloudfunctions-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cloudfunctions-help-main">
          <aside className="cloudfunctions-help-toc" aria-label="Table of contents">
            <h2 className="cloudfunctions-help-toc-title">Contents</h2>
            <ul className="cloudfunctions-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cloudfunctions-help-content">
            <h1 className="cloudfunctions-help-doc-title">GCP Cloud Functions</h1>
            <p className="cloudfunctions-help-doc-subtitle">Event-driven serverless functions for small focused backend logic</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact Cloud Functions manual: what the service is,
              how modern Cloud Functions relates to Cloud Run functions, how triggers and runtime behavior work, and which design
              choices matter for correctness, reliability, and maintainability.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="cloudfunctions-help-section">
                    <h2 className="cloudfunctions-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="cloudfunctions-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="cloudfunctions-help-section">
                  <h2 className="cloudfunctions-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="cloudfunctions-help-section">
                    <h2 className="cloudfunctions-help-heading">{section.title}</h2>
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
                  <section key={example.title} id={`example-${index + 1}`} className="cloudfunctions-help-section">
                    <h2 className="cloudfunctions-help-heading">{example.title}</h2>
                    <div className="cloudfunctions-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cloudfunctions-help-section">
                <h2 className="cloudfunctions-help-heading">Glossary</h2>
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
