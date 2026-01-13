import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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

export default function NodeJsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Node.js</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Event-driven JavaScript runtime for scalable network services</div>
              <p className="win95-text">
                Node.js brings JavaScript to the server with a non-blocking event loop and a huge ecosystem of packages.
                It shines in I/O-heavy applications, realtime systems, and tooling, while requiring care around CPU-heavy workloads.
                Under the hood, V8, libuv, and streams cooperate to keep latency low and throughput high.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Node.js is a runtime built around an event loop that handles thousands of concurrent connections without
                spawning a thread per request. Its model is simple and fast for I/O-bound systems, but design choices
                around asynchronous execution, timeouts, and CPU offloading are critical. Production systems rely on
                streams, connection pooling, and careful observability to stay stable under load.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: Node.js fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ecosystem landscape</legend>
            <div className="win95-grid win95-grid-2">
              {ecosystemLandscape.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: architecture notes</legend>
            <div className="win95-grid win95-grid-2">
              {architectureNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTradeoffs.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Node gives excellent I/O throughput and developer velocity, but it needs careful architecture for CPU-heavy
                workloads and latency-sensitive services.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Production checklist</legend>
            <div className="win95-grid win95-grid-2">
              {productionChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
