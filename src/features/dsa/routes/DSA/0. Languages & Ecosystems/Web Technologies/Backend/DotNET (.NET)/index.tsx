import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What .NET means in backend work',
    body: '.NET in backend engineering refers to the broader application platform rather than to one specific web framework. It includes the runtime, base libraries, hosting model, packaging system, diagnostics ecosystem, language support, and deployment story used to build services, APIs, workers, event processors, and other server-side systems.',
  },
  {
    title: 'Why this page is distinct from ASP.NET Core',
    body: 'ASP.NET Core is the flagship web framework inside the .NET ecosystem, but .NET itself is larger. Backend engineers working in .NET also deal with the runtime, the generic host, background services, dependency graphs, logging infrastructure, configuration layering, package management, CLI tooling, diagnostics, and deployment behavior across containers, servers, and cloud platforms.',
  },
  {
    title: 'What this page teaches',
    body: 'This page explains how the .NET platform supports backend systems as a whole. It focuses on runtime behavior, hosting, package and project structure, execution model, concurrency model, observability, common backend architecture patterns, and where .NET fits relative to other backend ecosystems.',
  },
  {
    title: 'Where .NET fits best',
    body: '.NET is especially strong when teams want typed service code, mature runtime behavior, solid tooling, long-term maintainability, strong IDE support, and a platform that can handle both HTTP-facing services and background processing inside one coherent ecosystem.',
  },
]

const whyItMatters = [
  'It gives backend teams a complete managed platform rather than only a request-routing library.',
  'It supports APIs, workers, message consumers, scheduled jobs, and service hosts in one ecosystem.',
  'It combines strong typing, good tooling, and serious diagnostics for long-lived production systems.',
  'It adapts well to containers, Linux hosts, Windows environments, and modern cloud deployment models.',
  'It helps teams standardize around one runtime and operational model across many backend workloads.',
]

const historicalContext = [
  {
    title: 'The original .NET era',
    detail:
      ".NET began as Microsoft's managed application platform, centered on the CLR, rich base class libraries, and languages such as C#. In early years it was strongly associated with Windows and enterprise application development.",
  },
  {
    title: 'Expansion beyond desktop and classic web',
    detail:
      'As the platform matured, .NET became relevant not only for desktop software but also for web backends, service layers, batch jobs, integration systems, and high-scale business applications.',
  },
  {
    title: '.NET Core and the cross-platform shift',
    detail:
      "The move to .NET Core changed the platform's trajectory by making it modular, faster, more cloud-friendly, and truly cross-platform. This was one of the most important events in making .NET a modern backend choice outside legacy Windows-first environments.",
  },
  {
    title: 'Unified modern .NET',
    detail:
      'Modern .NET unified much of the platform story around a common host, common tooling, modern packaging, container support, strong diagnostics, and a backend-friendly runtime model that works across many application types.',
  },
]

const bigPictureThemes = [
  {
    title: 'Platform first, framework second',
    body: 'A useful way to think about backend .NET is that frameworks such as ASP.NET Core live on top of a broader platform. The runtime, CLI, project system, generic host, configuration stack, and diagnostics infrastructure matter even when there is no web controller in sight.',
  },
  {
    title: 'One ecosystem can serve many backend shapes',
    body: 'A .NET backend team can build APIs, background workers, scheduled jobs, message-driven processors, internal tools, and realtime systems while staying inside the same runtime and tooling model. That reduces conceptual fragmentation across the platform.',
  },
  {
    title: 'Operational maturity is a major advantage',
    body: '.NET is not only about language ergonomics. It is also about the surrounding maturity of logging, tracing, performance diagnostics, package management, project structure, hosting, and production debugging. These qualities matter a great deal once systems become long-lived and business-critical.',
  },
  {
    title: 'Managed does not mean careless',
    body: 'The platform removes many manual memory hazards, but serious backend engineering still requires care with allocation, async scheduling, thread pool behavior, serialization, connection management, and latency-sensitive paths. The runtime helps, but it does not replace discipline.',
  },
]

const keyTakeaways = [
  '.NET is a backend platform, not only a language story and not only a web framework.',
  'Its core strengths are runtime maturity, tooling quality, operational consistency, and typed maintainability.',
  'The generic host and shared runtime model make it useful across many service shapes.',
  'Performance and observability are strong when teams understand the runtime rather than treating it as magic.',
  'It is often a strong choice for organizations that value long-term backend maintainability and platform coherence.',
]

const topicSignals = [
  {
    title: 'Use .NET when the platform itself matters',
    body: 'If the decision is not only about routing requests but about standardizing hosting, diagnostics, project structure, packaging, background processing, and runtime behavior, then the relevant question is about .NET as a platform rather than only about ASP.NET Core as a framework.',
  },
  {
    title: 'Use .NET when typed maintainability is a major requirement',
    body: 'If the codebase will be long-lived, shared across teams, and expected to survive repeated refactoring, strong typing, analyzers, IDE support, and disciplined project structure become real backend advantages.',
  },
  {
    title: 'Use .NET when service diversity exists under one umbrella',
    body: 'If the organization needs HTTP APIs, workers, queue consumers, cron-style tasks, and internal service utilities that all behave consistently in one engineering ecosystem, .NET is often a good fit.',
  },
  {
    title: 'Use .NET when runtime observability and performance tooling matter',
    body: 'Teams that need strong production diagnostics, memory and allocation insight, structured logs, tracing, and mature runtime introspection often benefit from the .NET ecosystem.',
  },
]

const coreFoundations = [
  {
    title: 'CLR and managed execution',
    body: 'Backend .NET applications run on the Common Language Runtime. The CLR provides JIT compilation, garbage collection, metadata, exception handling, type safety services, and runtime coordination. That managed core shapes how services behave under load and how engineers debug them.',
  },
  {
    title: 'The generic host',
    body: 'The generic host is a platform-level foundation for application startup, configuration, logging, dependency injection, and application lifetime. It is one of the key reasons .NET backend systems can share patterns across web apps and background services instead of using unrelated entry models.',
  },
  {
    title: 'Project system and package management',
    body: 'Modern SDK-style projects and NuGet packages define how backend systems are composed, versioned, restored, and built. This project model matters because it affects modularity, CI behavior, shared libraries, and how teams reason about solution structure.',
  },
  {
    title: 'Asynchronous service model',
    body: 'Most real backend workloads in .NET are IO-bound. Async and await, task scheduling, cancellation, and thread-pool behavior are foundational because throughput and responsiveness depend heavily on non-blocking service design.',
  },
  {
    title: 'Configuration and environment layering',
    body: 'Backend .NET systems usually combine configuration from files, environment variables, secrets systems, and deployment-specific overrides. That layered model is part of the platform and shapes how services are promoted across environments safely.',
  },
]

const platformFeatures = [
  {
    title: 'Base class libraries',
    body: 'The .NET base class libraries provide collections, networking, IO, serialization, concurrency primitives, diagnostics, cryptography, HTTP clients, and many other building blocks. A major strength of the platform is that much everyday backend functionality starts from mature first-party primitives rather than from a fragile patchwork of packages alone.',
  },
  {
    title: 'Dependency injection and service composition',
    body: 'The built-in DI model makes it natural to compose repositories, services, clients, handlers, policy objects, and platform integrations using consistent lifetime and construction rules. This strongly influences backend architecture in modern .NET teams.',
  },
  {
    title: 'Hosted services and workers',
    body: 'Backend .NET is not limited to request-response web work. The same host model supports workers, queue processors, scheduled jobs, startup tasks, and background loops, which makes the platform useful for service ecosystems rather than only for websites.',
  },
  {
    title: 'Configuration, logging, and options patterns',
    body: 'Typed options binding, structured logging, provider-based configuration, and environment-aware startup patterns are deeply baked into the ecosystem. These make backend code more operationally explicit and easier to reason about across environments.',
  },
  {
    title: 'Interoperability and library breadth',
    body: '.NET can integrate with databases, message brokers, cloud providers, gRPC, OpenTelemetry, caching layers, and native components through a large and mature library ecosystem. That breadth matters because backend platforms live or die by integration quality.',
  },
]

const runtimeAndOperations = [
  {
    title: 'JIT, startup, and steady state',
    body: 'Many .NET applications rely on JIT compilation, which means startup cost and warmup behavior matter. Long-running services often perform very well once hot paths are optimized, but cold-start-sensitive environments may require additional attention to startup characteristics and deployment strategy.',
  },
  {
    title: 'Garbage collection and allocation pressure',
    body: 'Managed memory simplifies correctness but does not make memory free. Service throughput and latency can suffer if request paths allocate heavily, box values unnecessarily, or create too much short-lived data. Production-grade .NET systems are often allocation-aware even when they are not ultra-low-level.',
  },
  {
    title: 'Observability as a normal expectation',
    body: 'The platform works well with structured logs, tracing, metrics, event counters, profiling tools, and production diagnostics. This matters because backend reliability increasingly depends on being able to explain latency, memory growth, saturation, and failure behavior in production.',
  },
  {
    title: 'Container and deployment readiness',
    body: 'Modern .NET is comfortable in containerized environments, Linux hosts, Kubernetes, CI/CD workflows, and cloud infrastructure. The platform now fits the operational expectations of modern backend teams much better than older Windows-centric reputations suggest.',
  },
]

const ecosystemUses = [
  {
    title: 'Web APIs and service backends',
    body: 'Many teams use .NET primarily through ASP.NET Core for APIs and service endpoints. The platform makes that straightforward, but its backend relevance extends beyond HTTP frameworks alone.',
  },
  {
    title: 'Background jobs and internal processing',
    body: 'Worker services, job processors, schedulers, and internal data pipelines are natural fits because the same host, configuration, logging, and DI models apply outside request-response environments.',
  },
  {
    title: 'Enterprise platform engineering',
    body: 'In larger organizations, .NET often becomes a standard platform for internal libraries, service templates, auth integration, telemetry patterns, and domain-specific backend tooling.',
  },
  {
    title: 'Hybrid cloud and on-prem environments',
    body: "The platform's maturity makes it comfortable in organizations that need to support a mix of cloud services, internal infrastructure, Windows-heavy enterprise systems, and Linux-based deployments at the same time.",
  },
]

const comparisons = [
  {
    title: '.NET versus Java and the JVM stack',
    body: 'Both ecosystems offer managed runtimes, strong typing, broad backend libraries, and mature enterprise tooling. The real differences often come down to language ergonomics, ecosystem preference, framework style, organizational history, and platform integrations rather than a simple winner-loser narrative.',
  },
  {
    title: '.NET versus lighter scripting ecosystems',
    body: 'Compared with Node.js, Python frameworks, or Ruby stacks, .NET often brings more upfront structure, stronger static contracts, and richer built-in operational patterns, but also more platform weight and project-system formality. The trade is often favorable in larger systems.',
  },
  {
    title: '.NET platform versus ASP.NET Core framework',
    body: 'A recurring source of confusion is collapsing the whole backend platform into the web framework. ASP.NET Core is one major part of backend .NET, but the platform also includes worker hosting, diagnostics, CLI tooling, packages, runtime behavior, and many non-web backend patterns.',
  },
  {
    title: '.NET versus low-level native service stacks',
    body: '.NET trades direct machine control for managed productivity and a powerful runtime. It can deliver very good backend performance, but it occupies a different design space from systems-first stacks where explicit memory and bare-metal control are the main priority.',
  },
]

const failureModes = [
  {
    title: 'Treating the runtime as invisible',
    body: 'Teams sometimes assume the managed runtime will take care of performance and memory behavior automatically. In reality, allocation pressure, thread usage, startup cost, and async correctness still need to be designed deliberately.',
  },
  {
    title: 'Conflating framework, language, and platform',
    body: 'C#, ASP.NET Core, and .NET are related but not identical. Confusing them makes architectural reasoning weaker because the team stops seeing where the language ends, where the runtime begins, and where the framework adds web-specific concerns.',
  },
  {
    title: 'Over-abstracting large service codebases',
    body: 'Because the ecosystem encourages structured design, teams can sometimes build too many layers, wrappers, or generic abstractions. Strong tooling does not justify needless indirection.',
  },
  {
    title: 'Ignoring production observability until late',
    body: 'The platform has strong diagnostics support, but teams still need to wire logs, traces, health checks, and measurement into their systems intentionally. Good tooling unused is no advantage at all.',
  },
  {
    title: 'Assuming cross-platform means no environment differences',
    body: 'Modern .NET is highly portable, but deployment environments still differ in startup behavior, filesystem assumptions, network shape, container settings, and operational constraints. Portability reduces friction; it does not erase environment-specific engineering.',
  },
]

const studyChecklist = [
  'Understand .NET as a platform, not only as C# plus a web framework.',
  'Learn the generic host, logging, DI, configuration, and project model together.',
  'Treat async design, allocation behavior, and observability as core backend skills.',
  'Separate language decisions from runtime and framework decisions.',
  "Use the platform's maturity to simplify operations rather than to justify over-engineering.",
  'Measure real production behavior instead of trusting stereotypes about managed performance.',
]

const examples = [
  {
    id: 'dot98-example-worker',
    title: 'Example: Generic host for a worker service',
    area: 'Hosting',
    intro:
      'The generic host is one of the clearest examples of backend .NET as a platform rather than only a web stack. It allows background processes to reuse the same DI, config, and logging infrastructure as web services.',
    whyFit: 'This example shows the breadth of backend .NET beyond HTTP controllers.',
    code: `var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<QueueWorker>();
builder.Services.AddSingleton<IMessageHandler, MessageHandler>();

using var host = builder.Build();
await host.RunAsync();`,
    takeaway:
      'Backend .NET becomes easier to standardize when workers and web apps share the same host and operational foundations.',
  },
  {
    id: 'dot98-example-options',
    title: 'Example: Typed configuration',
    area: 'Configuration',
    intro:
      'Typed options are a practical example of how .NET turns operational configuration into a compile-time-friendly shape instead of leaving everything as scattered string lookups.',
    whyFit:
      "This example reflects the platform's tendency toward explicit, maintainable backend structure.",
    code: `builder.Services.Configure<BrokerOptions>(
    builder.Configuration.GetSection("Broker")
);

public sealed class BrokerOptions
{
    public string Host { get; init; } = string.Empty;
    public int Port { get; init; }
}`,
    takeaway:
      'Typed configuration reduces ambiguity and improves maintainability in multi-environment backend systems.',
  },
  {
    id: 'dot98-example-logging',
    title: 'Example: Structured logging in a service path',
    area: 'Observability',
    intro:
      'Modern backend engineering expects logs to be structured and queryable, not just free-form strings. The .NET platform works well with this model and encourages it through consistent logging abstractions.',
    whyFit:
      'This example shows how observability is part of platform usage, not a separate afterthought.',
    code: `logger.LogInformation(
    "Processed order {OrderId} for customer {CustomerId} in {ElapsedMs} ms",
    orderId,
    customerId,
    elapsedMs
);`,
    takeaway:
      'Operational maturity in .NET comes partly from turning diagnostics into normal application structure.',
  },
  {
    id: 'dot98-example-di',
    title: 'Example: Service registration and composition',
    area: 'Dependency Injection',
    intro:
      'Many backend .NET systems are assembled through DI registration rather than manual object construction. The composition root becomes one of the most important architectural files in the system.',
    whyFit:
      'This example highlights how backend .NET favors explicit service graphs and repeatable application composition.',
    code: `builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<ISystemClock, SystemClock>();
builder.Services.AddHttpClient<BillingClient>();`,
    takeaway:
      'Understanding service registration is part of understanding backend .NET architecture.',
  },
  {
    id: 'dot98-example-runtime',
    title: 'Example: Allocation-aware backend hot path',
    area: 'Runtime Discipline',
    intro:
      'A managed platform still rewards careful hot-path design. Engineers often improve throughput and latency by reducing unnecessary intermediate allocations and choosing APIs with clearer memory behavior.',
    whyFit:
      'This example shows that backend .NET performance is often about practical runtime discipline rather than low-level heroics.',
    code: `public static int CountActiveFlags(ReadOnlySpan<byte> input)
{
    var total = 0;
    foreach (var value in input)
    {
        if (value == 1)
        {
            total++;
        }
    }

    return total;
}`,
    takeaway:
      'Managed backends still benefit from engineers who understand data shape, memory pressure, and hot-path design.',
  },
]

const glossary = [
  {
    term: '.NET',
    definition:
      'The broader managed platform including the runtime, libraries, tooling, and hosting model.',
  },
  { term: 'CLR', definition: 'The Common Language Runtime that executes managed .NET code.' },
  {
    term: 'Generic host',
    definition:
      'The host abstraction that manages startup, configuration, logging, DI, and lifetime.',
  },
  {
    term: 'Hosted service',
    definition: 'A background service managed by the host inside a .NET application.',
  },
  {
    term: 'IL',
    definition: 'Intermediate Language emitted before JIT compilation to native machine code.',
  },
  {
    term: 'JIT',
    definition: 'Just-in-time compilation of managed code into native code during execution.',
  },
  { term: 'NuGet', definition: 'The package management ecosystem used by .NET projects.' },
  {
    term: 'SDK-style project',
    definition: 'The modern .NET project format used for simplified builds and package restore.',
  },
  {
    term: 'Typed options',
    definition: 'A pattern that binds configuration data into strongly typed objects.',
  },
  {
    term: 'Worker service',
    definition:
      'A backend service shape focused on background processing rather than HTTP endpoints.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'dot98-overview', label: 'Overview' },
    { id: 'dot98-why', label: 'Why It Matters' },
    { id: 'dot98-history', label: 'Historical Context' },
    { id: 'dot98-themes', label: 'Big Picture Themes' },
    { id: 'dot98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'dot98-signals', label: 'Topic Signals' },
    { id: 'dot98-foundations', label: 'Foundations' },
    { id: 'dot98-features', label: 'Platform Features' },
    { id: 'dot98-runtime', label: 'Runtime and Operations' },
    { id: 'dot98-uses', label: 'Ecosystem Uses' },
    { id: 'dot98-compare', label: 'Compare and Contrast' },
    { id: 'dot98-failures', label: 'Failure Modes' },
    { id: 'dot98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'dot98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const dotNetHelpStyles = `
.dot98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dot98-window {
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

.dot98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.dot98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.dot98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.dot98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.dot98-control:focus-visible,
.dot98-tab:focus-visible,
.dot98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.dot98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.dot98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.dot98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.dot98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.dot98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.dot98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.dot98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dot98-toc-item + .dot98-toc-item {
  margin-top: 8px;
}

.dot98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.dot98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.dot98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.dot98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.dot98-section {
  margin: 0 0 22px;
}

.dot98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.dot98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.dot98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.dot98-content p,
.dot98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.dot98-content p {
  margin: 0 0 10px;
}

.dot98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.dot98-content li + li {
  margin-top: 4px;
}

.dot98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.dot98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .dot98-main {
    grid-template-columns: 1fr;
  }

  .dot98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .dot98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dot98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function DotNetBackendPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `.NET (Backend) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: '.NET (Backend)',
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
    <div className="dot98-help-page">
      <style>{dotNetHelpStyles}</style>
      <div className="dot98-window" role="presentation">
        <header className="dot98-titlebar">
          <span className="dot98-title">.NET (Backend)</span>
          <div className="dot98-title-controls">
            <button
              className="dot98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="dot98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="dot98-tabs" role="tablist" aria-label="DotNet Backend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`dot98-tab ${activeTab === tab.id ? 'dot98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dot98-main">
          <aside className="dot98-toc" aria-label="Table of contents">
            <h2 className="dot98-toc-title">Contents</h2>
            <ul className="dot98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="dot98-toc-item">
                  <a href={`#${section.id}`} className="dot98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="dot98-content">
            <h1 className="dot98-doc-title">.NET (Backend)</h1>
            <p className="dot98-intro">
              This page is a backend-focused overview of the broader .NET platform. It explains how
              the runtime, generic host, package system, diagnostics, and service patterns support
              backend development beyond the specific ASP.NET Core web framework.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="dot98-overview" className="dot98-section">
                  <h2 className="dot98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="dot98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="dot98-divider" />

                <section id="dot98-why" className="dot98-section">
                  <h2 className="dot98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="dot98-divider" />

                <section id="dot98-history" className="dot98-section">
                  <h2 className="dot98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="dot98-divider" />

                <section id="dot98-themes" className="dot98-section">
                  <h2 className="dot98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="dot98-divider" />

                <section id="dot98-takeaways" className="dot98-section">
                  <h2 className="dot98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="dot98-signals" className="dot98-section">
                  <h2 className="dot98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-foundations" className="dot98-section">
                  <h2 className="dot98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-features" className="dot98-section">
                  <h2 className="dot98-heading">Platform Features</h2>
                  {platformFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-runtime" className="dot98-section">
                  <h2 className="dot98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-uses" className="dot98-section">
                  <h2 className="dot98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-compare" className="dot98-section">
                  <h2 className="dot98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-failures" className="dot98-section">
                  <h2 className="dot98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="dot98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="dot98-checklist" className="dot98-section">
                  <h2 className="dot98-heading">Study Checklist</h2>
                  <ul>
                    {studyChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="dot98-section">
                    <h2 className="dot98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="dot98-codebox">
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
              <section id="dot98-glossary" className="dot98-section">
                <h2 className="dot98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
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
