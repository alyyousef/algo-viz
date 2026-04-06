import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS Lambda'
const pageSubtitle = 'Serverless functions for event-driven compute on AWS.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'AWS Lambda is AWS\'s function-as-a-service platform. You upload code or a container image, define the runtime and configuration, and Lambda runs the function in response to invocations without you managing long-lived servers.',
      'Lambda is fundamentally event-driven compute. The important platform questions are not only how to write the handler, but how invocation sources behave, how execution environments scale, how cold starts affect latency, and how permissions, observability, and downstream dependencies shape the system.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'Lambda fits best for short-lived event-driven logic, API handlers, automation, stream and queue processing, scheduled jobs, lightweight orchestration steps, and reactive integrations with other AWS services.',
      'It usually works alongside API Gateway, EventBridge, SQS, SNS, DynamoDB Streams, Kinesis, Step Functions, CloudWatch, IAM, and Secrets Manager. In many AWS architectures, Lambda becomes the glue layer between events and managed services.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Lambda because it removes server lifecycle management, scales automatically for many workloads, integrates deeply with AWS event sources, and lets small units of compute be deployed independently.',
      'It is especially strong when the workload is intermittent, bursty, event-triggered, or naturally decomposed into small independent handlers rather than long-running processes.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'Lambda is a weak fit for long-running compute, heavy stateful processes, high-throughput always-on workloads that stay warm continuously, or software that needs deep host control, unusual networking assumptions, or very large local runtime footprints.',
      'It is also easy to misuse Lambda by pushing too much business complexity into tiny handlers without proper shared libraries, testing boundaries, or idempotency. Small functions do not automatically mean simple systems.',
    ],
  },
]

const executionChoices = [
  {
    title: 'On-demand execution',
    summary:
      'Best default for most event-driven workloads where Lambda should scale as traffic arrives.',
    details: [
      'Pay per invocation and execution duration.',
      'May experience cold starts depending on traffic shape and runtime characteristics.',
      'Strong fit for irregular or elastic demand.',
    ],
  },
  {
    title: 'Provisioned concurrency',
    summary:
      'Best when latency-sensitive functions need pre-initialized execution environments to reduce cold-start impact.',
    details: [
      'Keeps execution environments prepared ahead of requests.',
      'Useful for critical APIs and interactive paths with strict latency targets.',
      'Adds cost in exchange for lower startup variability.',
    ],
  },
  {
    title: 'SnapStart',
    summary:
      'Best for supported runtimes when initialization latency is the main problem and snapshot-based startup optimization is a good fit.',
    details: [
      'Optimizes startup by restoring from a cached snapshot of the execution environment.',
      'Useful for some latency-sensitive Java, Python, and .NET workloads on supported runtimes.',
      'Has feature and compatibility limits and does not replace all cold-start strategies.',
    ],
  },
]

const lifecycleFlow = [
  'An event source or caller invokes the function directly, asynchronously, or through an event source mapping.',
  'Lambda prepares or reuses an execution environment, including initialization code and runtime setup.',
  'The handler runs with the event payload and environment configuration.',
  'The function returns a response or processing result, or fails and enters the source-specific retry or failure path.',
  'Logs, metrics, traces, concurrency behavior, and downstream side effects determine whether the function is operationally healthy, not just whether the code returned once.',
]

const fitGuide = [
  {
    title: 'Need event-driven compute with little server management',
    choice: 'Choose Lambda.',
  },
  {
    title: 'Need long-running service processes or deep host control',
    choice: 'Prefer ECS, EKS, or EC2 depending on the workload.',
  },
  {
    title: 'Need highly latency-sensitive APIs with initialization-heavy runtimes',
    choice: 'Use Lambda with provisioned concurrency or SnapStart where appropriate.',
  },
  {
    title: 'Need queue, stream, or event reactions tightly integrated with AWS',
    choice: 'Lambda is often a strong fit.',
  },
]

const coreConceptSections = [
  {
    id: 'core-model',
    heading: 'Function and Execution Model',
    paragraphs: [
      'A Lambda function is code plus configuration: runtime, memory, timeout, architecture, environment variables, IAM role, networking, storage, and trigger model. The function executes inside an execution environment that may be reused across invocations.',
      'The most important operational consequence is that Lambda is stateless in the durable sense but not necessarily fresh on every invocation. Execution environments can be reused, so in-memory caches, initialized clients, and temporary files may survive for later invocations on the same environment.',
    ],
  },
  {
    id: 'core-lifecycle',
    heading: 'Execution Environment and Cold Starts',
    paragraphs: [
      'When Lambda needs a new execution environment, it performs initialization before the handler can run. This is what is commonly called a cold start. The cost depends on runtime choice, package size, dependency graph, VPC setup, initialization logic, and other configuration details.',
      'Cold starts are not always catastrophic, but they matter a lot for interactive APIs and infrequently invoked functions with heavy startup work. Good Lambda design tries to minimize unnecessary initialization and chooses the right mitigation strategy instead of pretending cold starts do not exist.',
    ],
  },
  {
    id: 'core-concurrency',
    heading: 'Concurrency, Scaling, and Throttling',
    paragraphs: [
      'Lambda scales by creating more execution environments as concurrent demand rises, subject to account and function-level concurrency controls. Reserved concurrency can carve out or limit capacity for a function. Provisioned concurrency keeps environments ready in advance.',
      'Concurrency is not only a scaling feature. It is also a safety mechanism. Without explicit thinking, a fast event source can scale Lambda into downstream systems that cannot keep up. Good Lambda design often includes concurrency controls to protect databases, APIs, or third-party services.',
    ],
  },
  {
    id: 'core-triggers',
    heading: 'Invocation Types and Event Sources',
    paragraphs: [
      'Lambda can be invoked synchronously, asynchronously, or through event source mappings. Synchronous invocations are typical for APIs or direct service calls. Asynchronous invocations add built-in queueing and retry semantics. Event source mappings poll supported queue and stream services and invoke the function with batches of records.',
      'These modes are operationally different. SQS, Kinesis, DynamoDB Streams, EventBridge, and API Gateway all produce different retry, batching, and backpressure behavior. A function that is correct for one trigger model may behave badly under another if the failure model is ignored.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'VPC Networking and Connectivity',
    paragraphs: [
      'A Lambda function does not need to be in a VPC just because it talks to AWS services. It only needs VPC attachment when it must reach private resources inside that VPC, such as RDS in private subnets or internal services. Attaching Lambda to a VPC changes networking and operational behavior.',
      'VPC-attached Lambda functions need subnet and security-group planning, and they inherit the consequences of private networking such as NAT usage, endpoint design, and connectivity troubleshooting. Lambda networking should be minimal and deliberate rather than automatic.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'IAM Roles and Least Privilege',
    paragraphs: [
      'Every Lambda function runs with an execution role. That role determines which AWS APIs the function code can call and which integrations can be performed on its behalf. A broad wildcard role is one of the most common and avoidable Lambda security mistakes.',
      'Least privilege matters especially in Lambda because functions are often small, numerous, and triggered automatically. One overpowered function can become a major lateral-movement path if compromised or misconfigured.',
    ],
  },
  {
    id: 'core-packaging',
    heading: 'Packaging, Dependencies, Layers, and Images',
    paragraphs: [
      'Lambda supports zip-based deployment packages and container images. Zip packages are common for straightforward functions, while container images are useful when the runtime or dependency model needs more control. The choice should follow the workload, not habit.',
      'Lambda layers and extensions can help share dependencies or add runtime-side capabilities such as observability agents, but they also affect initialization behavior and operational complexity. If layers become a hidden dependency maze, the function platform gets harder to reason about rather than easier.',
    ],
  },
  {
    id: 'core-event-mappings',
    heading: 'Event Source Mappings, Batching, and Backpressure',
    paragraphs: [
      'For sources such as SQS, Kinesis, MSK, or DynamoDB Streams, Lambda commonly uses event source mappings. These mappings poll or read from the source and invoke the function with batches of records. Batch size, windowing, scaling, and failure handling all change how the workload behaves under load.',
      'This is where many Lambda systems become queue or stream systems in disguise. A function that is perfectly fine for synchronous API requests may fail badly when a batch contains poison records, downstream throughput is limited, or partial batch success is not handled correctly.',
    ],
  },
  {
    id: 'core-failure',
    heading: 'Retries, DLQs, Destinations, and Idempotency',
    paragraphs: [
      'Failure behavior in Lambda depends on the invocation model. Asynchronous invocations, event source mappings, and direct synchronous calls all handle retries differently. DLQs and destinations can capture failure outcomes, but the exact behavior depends on the trigger path.',
      'Idempotency is a first-class Lambda concern. Retries, duplicate events, and replay-like situations are normal in event-driven systems. If a function cannot safely process the same business input more than once, the architecture is fragile no matter how clean the handler code looks.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Logs, Metrics, Tracing, and Alarms',
    paragraphs: [
      'Lambda observability starts with structured logs in CloudWatch Logs, invocation metrics in CloudWatch, and traces where distributed tracing is enabled. But good Lambda observability also means understanding concurrency spikes, cold-start patterns, throttles, downstream latency, and event-source-specific failure metrics.',
      'Because Lambda is highly distributed and often ephemeral, debugging by manually reproducing a single host state is not an option. Teams need correlation IDs, meaningful logs, and alarms on both invocation-level and business-level failures.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security and Configuration Hygiene',
    paragraphs: [
      'Security on Lambda includes least-privilege IAM, careful environment configuration, secret management, package provenance, network minimization, and control over which services may invoke the function. Resource-based permissions for invocation matter just as much as the function execution role for outbound API access.',
      'Environment variables are configuration, not a secure secret vault by themselves. Sensitive data should usually come from Secrets Manager or Parameter Store with controlled retrieval and auditability, not from hardcoded values or casually shared plaintext configs.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Performance and Cost Tradeoffs',
    paragraphs: [
      'Lambda cost is shaped by invocation count, duration, memory configuration, architecture choice, provisioned concurrency, and related service usage. Memory sizing is especially important because it also changes CPU allocation and therefore execution speed. The cheapest memory setting is not always the cheapest real outcome.',
      'Performance tuning on Lambda often means reducing initialization work, right-sizing memory, improving batching, reusing clients safely, and avoiding unnecessary VPC attachment or network hops. Many slow Lambda systems are really slow downstream systems with a Lambda wrapper.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Initialize wisely',
    detail:
      'Move reusable client setup outside the handler when safe, but keep initialization lean. Cold-start optimization is often about doing less before the first useful line of work.',
  },
  {
    title: 'Control concurrency',
    detail:
      'Concurrency protects both latency and downstream systems. Unbounded Lambda scale can become a database or third-party outage if the function is allowed to flood dependencies.',
  },
  {
    title: 'Keep packages lean',
    detail:
      'Large bundles and unnecessary dependencies increase deployment size, initialization time, and operational complexity.',
  },
  {
    title: 'Know the trigger contract',
    detail:
      'Each event source has its own retry, batching, and failure model. Production Lambda work starts with that contract, not with a generic handler template.',
  },
  {
    title: 'Treat idempotency as a design requirement',
    detail:
      'Retries and duplicate deliveries are ordinary in serverless event processing. Safe replay behavior should not be an afterthought.',
  },
]

const designPatterns = [
  {
    title: 'API handler behind API Gateway',
    detail:
      'A Lambda function handles request-response logic for an HTTP route, often with provisioned concurrency or optimized initialization if low latency matters.',
  },
  {
    title: 'Queue consumer',
    detail:
      'A function processes SQS messages in batches, scales with backlog, and uses idempotent processing plus DLQ-aware recovery behavior.',
  },
  {
    title: 'EventBridge reaction function',
    detail:
      'A function reacts to domain or platform events, usually performing one clear follow-up action such as enrichment, notification, or workflow start.',
  },
  {
    title: 'Workflow step in Step Functions',
    detail:
      'A Lambda function does one bounded piece of work inside a larger state-machine process, keeping orchestration out of the handler logic itself.',
  },
]

const pitfalls = [
  'Using Lambda for workloads that should really be long-running services or containerized processes.',
  'Ignoring cold starts on latency-sensitive paths and then being surprised by inconsistent response times.',
  'Granting broad wildcard IAM permissions to small functions because policy design feels inconvenient.',
  'Attaching functions to a VPC without a real need and then inheriting avoidable networking complexity.',
  'Assuming all triggers retry the same way.',
  'Writing non-idempotent handlers for asynchronous or batched event processing.',
  'Bundling massive dependency trees into tiny functions that should have remained simple.',
  'Treating CloudWatch logs as optional until production debugging becomes impossible.',
]

const examples = [
  {
    id: 'ex-handler',
    title: 'Minimal handler shape',
    code: `export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      requestId: event?.requestContext?.requestId ?? null,
    }),
  }
}`,
    explanation:
      'The handler should be the smallest part of the system worth deploying. Shared libraries and service boundaries matter more than cramming everything into one file.',
  },
  {
    id: 'ex-sqs',
    title: 'Queue consumer mental model',
    code: `SQS queue
  -> event source mapping
  -> Lambda batch invocation
  -> process records idempotently
  -> partial failure handling or DLQ path`,
    explanation:
      'SQS-triggered Lambda is not just function invocation. It is queue processing with batching, retries, and poison-message consequences.',
  },
  {
    id: 'ex-role',
    title: 'Execution role reminder',
    code: `Lambda function
  -> execution role
     -> logs to CloudWatch
     -> reads from Secrets Manager
     -> writes to DynamoDB

Invocation permission:
  separate resource-based permission for who may invoke`,
    explanation:
      'Outbound AWS API access and inbound invocation permissions are different concerns. Both need to be designed deliberately.',
  },
  {
    id: 'ex-concurrency',
    title: 'Concurrency control shape',
    code: `traffic spike
  -> more concurrent invocations
  -> downstream dependency limit reached

Mitigations:
  reserved concurrency
  queue buffering
  backpressure-aware design
  downstream scaling`,
    explanation:
      'Lambda scaling is useful only when the rest of the system can absorb it or when the function is constrained intentionally.',
  },
]

const glossaryTerms = [
  {
    term: 'Execution environment',
    definition:
      'The runtime environment in which a Lambda function is initialized and invoked, potentially reused across multiple invocations.',
  },
  {
    term: 'Cold start',
    definition:
      'The initialization latency incurred when Lambda creates a new execution environment before the handler can run.',
  },
  {
    term: 'Provisioned concurrency',
    definition:
      'A Lambda feature that keeps execution environments initialized ahead of traffic to reduce startup latency.',
  },
  {
    term: 'SnapStart',
    definition:
      'A startup-optimization feature that restores supported Lambda runtimes from a cached initialized snapshot.',
  },
  {
    term: 'Event source mapping',
    definition:
      'The Lambda-managed integration that reads from supported sources such as queues or streams and invokes the function with records.',
  },
  {
    term: 'DLQ',
    definition:
      'A dead-letter queue used to capture failed events or records depending on the invocation path.',
  },
  {
    term: 'Destination',
    definition:
      'A configured success or failure target for certain asynchronous Lambda invocation outcomes.',
  },
  {
    term: 'Execution role',
    definition:
      'The IAM role under which the Lambda function code runs and calls AWS APIs.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation-recursion.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html',
  'https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html',
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-execution', label: 'Execution Choices' },
    { id: 'bp-flow', label: 'Lifecycle Flow' },
    { id: 'bp-fit', label: 'When to Choose Lambda' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Execution Model' },
    { id: 'core-lifecycle', label: 'Cold Starts' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-triggers', label: 'Invocation Sources' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-identity', label: 'IAM Roles' },
    { id: 'core-packaging', label: 'Packaging' },
    { id: 'core-event-mappings', label: 'Event Source Mappings' },
    { id: 'core-failure', label: 'Retries and DLQs' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-cost', label: 'Performance and Cost' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const lambdaHelpStyles = `
.lambda-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lambda-help-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.lambda-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.lambda-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.lambda-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.lambda-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
}

.lambda-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.lambda-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.lambda-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.lambda-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.lambda-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.lambda-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.lambda-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lambda-help-toc-list li {
  margin: 0 0 8px;
}

.lambda-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.lambda-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.lambda-help-title-main {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.lambda-help-section {
  margin: 0 0 20px;
}

.lambda-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.lambda-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.lambda-help-content p,
.lambda-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lambda-help-content p {
  margin: 0 0 10px;
}

.lambda-help-content ul,
.lambda-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.lambda-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.lambda-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.lambda-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.lambda-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .lambda-help-main {
    grid-template-columns: 1fr;
  }

  .lambda-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsLambdaPage(): JSX.Element {
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
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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
    <div className="lambda-help-page">
      <style>{lambdaHelpStyles}</style>
      <div className="lambda-help-window" role="presentation">
        <header className="lambda-help-titlebar">
          <span className="lambda-help-title">{pageTitle}</span>
          <div className="lambda-help-controls">
            <button className="lambda-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="lambda-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="lambda-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`lambda-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lambda-help-main">
          <aside className="lambda-help-toc" aria-label="Table of contents">
            <h2 className="lambda-help-toc-title">Contents</h2>
            <ul className="lambda-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lambda-help-content">
            <h1 className="lambda-help-title-main">{pageTitle}</h1>
            <p className="lambda-help-subheading">{pageSubtitle}</p>
            <p>
              This page focuses on Lambda as an execution platform rather than as a simple handler function. The important topics
              are cold starts, concurrency, trigger semantics, failure behavior, IAM, packaging, and how the function fits into an
              event-driven system around it.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="lambda-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="lambda-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="lambda-help-divider" />
                <section id="bp-execution" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Execution Choices</h2>
                  {executionChoices.map((item) => (
                    <div key={item.title}>
                      <h3 className="lambda-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <hr className="lambda-help-divider" />
                <section id="bp-flow" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Lifecycle Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <hr className="lambda-help-divider" />
                <section id="bp-fit" className="lambda-help-section">
                  <h2 className="lambda-help-heading">When to Choose Lambda</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="lambda-help-section">
                    <h2 className="lambda-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="lambda-help-section">
                  <h2 className="lambda-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="lambda-help-section">
                    <h2 className="lambda-help-heading">{example.title}</h2>
                    <div className="lambda-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="lambda-help-section">
                <h2 className="lambda-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="lambda-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="lambda-help-inline-link" target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
