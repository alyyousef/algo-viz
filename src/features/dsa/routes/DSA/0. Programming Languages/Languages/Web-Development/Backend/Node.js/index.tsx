import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Node.js created by Ryan Dahl (2009)',
    detail:
      'Node brings the V8 JavaScript engine to the server with a non-blocking event loop.',
  },
  {
    title: 'npm ecosystem explodes (2010)',
    detail:
      'The npm registry accelerates adoption with reusable packages and tooling.',
  },
  {
    title: 'Node.js Foundation forms (2015)',
    detail:
      'Governance stabilizes the platform and unifies community efforts.',
  },
  {
    title: 'ES modules and async/await mature (2017)',
    detail:
      'Modern JavaScript features become first-class in server-side development.',
  },
  {
    title: 'Serverless and containers mainstream (2018+)',
    detail:
      'Fast startup and low memory footprints make Node a default for cloud workloads.',
  },
  {
    title: 'LTS cadence matures (2019+)',
    detail:
      'Predictable long-term support aligns Node with enterprise upgrade cycles.',
  },
  {
    title: 'TypeScript becomes the backend default (2020+)',
    detail:
      'Typed JS improves large codebase safety and collaboration across teams.',
  },
]

const mentalModels = [
  {
    title: 'Event loop as the heart',
    detail:
      'A single-threaded event loop multiplexes I/O, letting Node handle many concurrent connections.',
  },
  {
    title: 'Non-blocking by default',
    detail:
      'I/O is asynchronous; CPU-heavy work must be moved off the main thread.',
  },
  {
    title: 'JavaScript everywhere',
    detail:
      'Frontend and backend can share language, reducing context switching and enabling shared tooling.',
  },
  {
    title: 'Queues, not threads',
    detail:
      'Work is scheduled through task queues; responsiveness depends on keeping those queues short.',
  },
  {
    title: 'Everything is a stream',
    detail:
      'I/O flows through streams with backpressure, which keeps memory usage stable under load.',
  },
  {
    title: 'Runtime plus host APIs',
    detail:
      'Node is V8 plus libuv and system APIs like fs, net, crypto, and timers.',
  },
]

const coreConcepts = [
  {
    heading: 'Runtime and modules',
    bullets: [
      'V8 compiles JavaScript to optimized machine code.',
      'CommonJS and ES modules provide dependency boundaries.',
      'npm scripts and package.json define build and runtime workflows.',
      'Package resolution and conditional exports influence runtime compatibility.',
    ],
  },
  {
    heading: 'Event loop and async',
    bullets: [
      'Callbacks, promises, and async/await model asynchronous workflows.',
      'The libuv thread pool handles filesystem and DNS operations.',
      'Backpressure in streams prevents memory blowups.',
      'Microtasks (promises) and macrotasks (timers/I/O) have different priority.',
    ],
  },
  {
    heading: 'HTTP and middleware',
    bullets: [
      'Built-in http module exposes low-level server building blocks.',
      'Frameworks like Express or Fastify add routing and middleware layers.',
      'Middleware composes cross-cutting concerns like auth and logging.',
      'HTTP/2 and ALPN enable multiplexed streams and improved latency.',
    ],
  },
  {
    heading: 'Tooling and observability',
    bullets: [
      'Profilers and the inspector help detect slow requests and leaks.',
      'Structured logging and tracing are essential at scale.',
      'Process managers like PM2 keep services alive and clustered.',
      'Health checks and graceful shutdowns protect in-flight requests.',
    ],
  },
  {
    heading: 'Data and concurrency',
    bullets: [
      'Worker threads allow CPU-bound work without blocking the main loop.',
      'Child processes isolate heavy tasks and provide fault boundaries.',
      'Atomic operations and shared memory are available but require caution.',
    ],
  },
  {
    heading: 'Security basics',
    bullets: [
      'Use secure TLS defaults and validate input consistently.',
      'Keep dependencies updated and lock versions for reproducible builds.',
      'Handle secrets via environment variables or managed vaults.',
    ],
  },
]

const architectureNotes = [
  {
    title: 'Single thread, many connections',
    detail:
      'The event loop avoids per-request threads, but blocking code halts all requests.',
  },
  {
    title: 'Worker threads for CPU work',
    detail:
      'Heavy computation should use worker_threads or external services to avoid stalling I/O.',
  },
  {
    title: 'Cluster and horizontal scale',
    detail:
      'Multiple processes share the same port to utilize multi-core CPUs.',
  },
  {
    title: 'Environment-driven config',
    detail:
      'Twelve-factor practices keep config outside code via environment variables.',
  },
  {
    title: 'Graceful shutdown',
    detail:
      'Handle SIGTERM/SIGINT to stop accepting new requests and drain existing connections.',
  },
  {
    title: 'Load balancing',
    detail:
      'Use a reverse proxy to route traffic and enforce timeouts and headers.',
  },
]

const performanceTradeoffs = [
  {
    title: 'I/O throughput',
    detail:
      'Node excels at I/O-bound workloads thanks to non-blocking networking.',
  },
  {
    title: 'CPU-bound bottlenecks',
    detail:
      'Single-threaded execution struggles with heavy CPU tasks unless offloaded.',
  },
  {
    title: 'Startup and cold starts',
    detail:
      'Node startups are fast, but large dependency graphs can slow cold starts.',
  },
  {
    title: 'Garbage collection',
    detail:
      'GC pauses are typically short but can affect latency-sensitive services.',
  },
  {
    title: 'Memory profile',
    detail:
      'Large heaps improve throughput but can increase GC pause times.',
  },
  {
    title: 'Native add-ons',
    detail:
      'Native modules can improve performance but add build complexity.',
  },
]

const realWorldUses = [
  {
    context: 'APIs and gateways',
    detail:
      'Node is popular for REST and GraphQL APIs with high concurrency needs.',
  },
  {
    context: 'Realtime apps',
    detail:
      'WebSockets and event-driven design suit chat, collaboration, and live dashboards.',
  },
  {
    context: 'Serverless functions',
    detail:
      'Fast startup and lightweight runtime make Node a common serverless choice.',
  },
  {
    context: 'Developer tooling',
    detail:
      'CLIs, build tools, and compilers often leverage Node for cross-platform scripting.',
  },
  {
    context: 'Streaming pipelines',
    detail:
      'Data ingest, ETL, and log processing benefit from streaming and backpressure.',
  },
  {
    context: 'Edge and CDN logic',
    detail:
      'Lightweight handlers run close to users with low latency requirements.',
  },
]

const examples = [
  {
    title: 'Simple HTTP server',
    code: `import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Node");
});

server.listen(3000);`,
    explanation:
      "Node's core HTTP module provides low-level access for building servers or frameworks.",
  },
  {
    title: 'Async/await with database calls',
    code: `async function fetchUser(db, id) {
  const user = await db.users.findOne({ id });
  return user;
}`,
    explanation:
      'Async/await reads like synchronous code but keeps I/O non-blocking.',
  },
  {
    title: 'Stream backpressure',
    code: `import fs from "fs";

const readStream = fs.createReadStream("large.log");
readStream.pipe(process.stdout);`,
    explanation:
      'Streams handle large data efficiently by applying backpressure automatically.',
  },
  {
    title: 'Graceful shutdown',
    code: `const shutdown = () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);`,
    explanation:
      'Stop accepting new requests, drain existing ones, and exit cleanly.',
  },
  {
    title: 'Worker thread for CPU work',
    code: `import { Worker } from "worker_threads";

const worker = new Worker("./heavy-task.js");
worker.on("message", (result) => console.log(result));`,
    explanation:
      'Offload expensive computation to keep the event loop responsive.',
  },
]

const pitfalls = [
  'Blocking the event loop with CPU-heavy tasks causes slow responses.',
  'Unhandled promise rejections can crash the process in newer Node versions.',
  'Memory leaks via global caches or event listeners accumulate quickly.',
  'Callback-style code can become hard to maintain without async patterns.',
  'Relying on too many dependencies increases attack surface and build time.',
  'Missing timeouts can lead to resource exhaustion under load.',
  'Ignoring backpressure can cause memory spikes and process crashes.',
  'Mixing ESM and CommonJS without a plan creates runtime failures.',
]

const decisionGuidance = [
  'Use Node.js for I/O-heavy services, APIs, and realtime applications.',
  'Prefer Node when your team benefits from full-stack JavaScript.',
  'Adopt worker threads or external services for CPU-heavy workloads.',
  'Leverage TypeScript and linting to scale large Node codebases.',
  'Avoid Node for low-latency numeric computing or heavy batch processing.',
  'Adopt a framework when you need conventions, validation, and middleware.',
  'Invest in observability early to prevent silent performance regressions.',
]

const advancedInsights = [
  {
    title: 'Event loop phases',
    detail:
      'Timers, I/O callbacks, and microtasks execute in distinct phases; understanding them prevents starvation bugs.',
  },
  {
    title: 'Async context propagation',
    detail:
      'AsyncLocalStorage enables request-scoped tracing and correlation IDs across async calls.',
  },
  {
    title: 'Native add-ons',
    detail:
      'C++ add-ons and N-API allow pushing hot paths into native code for performance.',
  },
  {
    title: 'Edge deployment patterns',
    detail:
      'Lightweight handlers and minimal dependencies keep latency low in edge environments.',
  },
  {
    title: 'Backpressure signals',
    detail:
      'Streams return false from write when buffers are full; honoring it prevents overload.',
  },
  {
    title: 'Runtime flags',
    detail:
      'V8 and Node flags can tune memory limits, debugging, and stack traces.',
  },
]

const takeaways = [
  'Node.js is a high-concurrency runtime built around a single-threaded event loop.',
  'It excels at I/O workloads but needs careful handling of CPU-bound tasks.',
  'The npm ecosystem accelerates development, but dependency hygiene matters.',
  'Modern tooling and TypeScript help large Node services stay maintainable.',
  'Streams, timeouts, and observability are critical for production reliability.',
  'Graceful shutdown and scaling strategies prevent user-facing outages.',
]

const ecosystemLandscape = [
  {
    heading: 'Popular frameworks',
    bullets: [
      'Express: minimal, ubiquitous middleware-first framework.',
      'Fastify: high-performance routing with schema-based validation.',
      'NestJS: opinionated architecture with DI and modules.',
      'Hono/Koa: smaller surface area for custom middleware stacks.',
    ],
  },
  {
    heading: 'Data and messaging',
    bullets: [
      'Postgres/MySQL with connection pools for consistent throughput.',
      'Redis for cache, rate limiting, and pub/sub.',
      'Kafka/NATS/RabbitMQ for asynchronous workflows and events.',
    ],
  },
  {
    heading: 'Observability',
    bullets: [
      'OpenTelemetry for tracing, metrics, and logs.',
      'Structured logging with JSON (pino, winston).',
      'APM tooling for profiling and slow request detection.',
    ],
  },
]

const productionChecklist = [
  {
    title: 'Reliability',
    detail:
      'Set timeouts, retries with backoff, and circuit breakers for upstream calls.',
  },
  {
    title: 'Security',
    detail:
      'Use strict headers, validate input, and keep dependencies patched.',
  },
  {
    title: 'Performance',
    detail:
      'Warm caches, reuse connections, and measure p95/p99 latencies.',
  },
  {
    title: 'Deployability',
    detail:
      'Graceful shutdown, health probes, and rolling deploys reduce downtime.',
  },
]

const learningPath = [
  {
    step: 'Fundamentals',
    detail: 'Event loop, async patterns, modules, and basic HTTP servers.',
  },
  {
    step: 'Production APIs',
    detail: 'Validation, auth, rate limits, logging, and error handling.',
  },
  {
    step: 'Scaling',
    detail: 'Clustering, queues, caching, and horizontal scaling.',
  },
  {
    step: 'Deep internals',
    detail: 'V8 profiling, libuv, streams, and native modules.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'Event Loop', definition: 'Single-threaded scheduler that processes callbacks and asynchronous completions.' },
  { term: 'libuv', definition: 'Cross-platform async I/O library underpinning Node concurrency primitives.' },
  { term: 'Microtask', definition: 'High-priority queue used by Promise callbacks and async continuations.' },
  { term: 'Macrotask', definition: 'Queue for timers, I/O callbacks, and other event loop phase tasks.' },
  { term: 'Backpressure', definition: 'Flow-control mechanism in streams that prevents memory overload.' },
  { term: 'Worker Thread', definition: 'Separate JS thread used for CPU-bound jobs outside the main event loop.' },
  { term: 'Cluster', definition: 'Multi-process model sharing server load across CPU cores.' },
  { term: 'LTS', definition: 'Long-term support release line with stability and extended maintenance.' },
  { term: 'ESM', definition: 'ECMAScript module system for native import/export in Node.' },
  { term: 'CJS', definition: 'CommonJS module system using require/module.exports.' },
]

const nodeHelpStyles = `
.node98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.node98-window {
  width: 100%;
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

.node98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.node98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.node98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.node98-control {
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
  cursor: pointer;
  padding: 0;
}

.node98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.node98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.node98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.node98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.node98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.node98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.node98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.node98-toc-list li {
  margin: 0 0 8px;
}

.node98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.node98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.node98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.node98-section {
  margin: 0 0 22px;
}

.node98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.node98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.node98-content p,
.node98-content li,
.node98-content th,
.node98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.node98-content p {
  margin: 0 0 10px;
}

.node98-content ul,
.node98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.node98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.node98-content th,
.node98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.node98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.node98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.node98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .node98-main {
    grid-template-columns: 1fr;
  }

  .node98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Node Fundamentals' },
    { id: 'core-landscape', label: 'Ecosystem Landscape' },
    { id: 'core-architecture', label: 'Architecture Notes' },
    { id: 'core-tradeoffs', label: 'Complexity and Tradeoffs' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function NodeJsPage(): JSX.Element {
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
    document.title = `Node.js (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Node.js',
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
    <div className="node98-help-page">
      <style>{nodeHelpStyles}</style>
      <div className="node98-window" role="presentation">
        <header className="node98-titlebar">
          <span className="node98-title-text">Node.js</span>
          <div className="node98-title-controls">
            <button className="node98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="node98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="node98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`node98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="node98-main">
          <aside className="node98-toc" aria-label="Table of contents">
            <h2 className="node98-toc-title">Contents</h2>
            <ul className="node98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="node98-content">
            <h1 className="node98-doc-title">Node.js</h1>
            <p>
              Node.js brings JavaScript to the server with a non-blocking event loop and a huge ecosystem of packages.
              It shines in I/O-heavy applications, realtime systems, and tooling, while requiring care around CPU-heavy workloads.
              Under the hood, V8, libuv, and streams cooperate to keep latency low and throughput high.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="node98-section">
                  <h2 className="node98-heading">Overview</h2>
                  <p>
                    Node.js is a runtime built around an event loop that handles thousands of concurrent connections without
                    spawning a thread per request. Its model is simple and fast for I/O-bound systems, but design choices
                    around asynchronous execution, timeouts, and CPU offloading are critical.
                  </p>
                </section>
                <hr className="node98-divider" />
                <section id="bp-history" className="node98-section">
                  <h2 className="node98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="node98-section">
                  <h2 className="node98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="node98-section">
                  <h2 className="node98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-fundamentals" className="node98-section">
                  <h2 className="node98-heading">How It Works: Node.js Fundamentals</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="node98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-landscape" className="node98-section">
                  <h2 className="node98-heading">Ecosystem Landscape</h2>
                  {ecosystemLandscape.map((block) => (
                    <div key={block.heading}>
                      <h3 className="node98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-architecture" className="node98-section">
                  <h2 className="node98-heading">How It Works: Architecture Notes</h2>
                  {architectureNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tradeoffs" className="node98-section">
                  <h2 className="node98-heading">Complexity Analysis and Tradeoffs</h2>
                  {performanceTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Node gives excellent I/O throughput and developer velocity, but it needs careful architecture for CPU-heavy
                    workloads and latency-sensitive services.
                  </p>
                </section>
                <section id="core-uses" className="node98-section">
                  <h2 className="node98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="node98-section">
                  <h2 className="node98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-production" className="node98-section">
                  <h2 className="node98-heading">Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="node98-section">
                  <h2 className="node98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="node98-section">
                  <h2 className="node98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning" className="node98-section">
                  <h2 className="node98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="node98-section">
                <h2 className="node98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="node98-subheading">{example.title}</h3>
                    <div className="node98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="node98-section">
                <h2 className="node98-heading">Glossary</h2>
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
