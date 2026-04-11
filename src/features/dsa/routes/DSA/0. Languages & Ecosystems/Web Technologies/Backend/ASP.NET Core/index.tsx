import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What ASP.NET Core is',
    body: 'ASP.NET Core is the modern web framework in the .NET ecosystem for building HTTP APIs, web applications, real-time systems, background-integrated services, and cloud-native backend workloads. It is not only a set of routing helpers. It is a full hosting and application pipeline model that combines dependency injection, middleware, configuration, logging, endpoint composition, authentication, and runtime integration.',
  },
  {
    title: 'Why it matters',
    body: 'ASP.NET Core matters because it gives .NET teams a first-class backend framework with strong runtime performance, deep tooling, composable architecture, and a consistent hosting model that works across APIs, MVC applications, minimal APIs, SignalR hubs, and service-oriented applications. It has become one of the flagship ways to build modern C# backend systems.',
  },
  {
    title: 'How to think about it',
    body: 'The best mental model is to treat ASP.NET Core as a request-processing pipeline around the .NET host. Requests enter through Kestrel or another server boundary, flow through configured middleware, resolve dependencies from the container, reach endpoints or controllers, and then emit responses with logging, auth, validation, and diagnostics woven into the path.',
  },
  {
    title: 'Where it fits best',
    body: 'ASP.NET Core is especially strong for typed service backends, internal platforms, public APIs, enterprise services, auth-heavy systems, multi-environment deployments, and cloud-native applications where observability, configuration control, and runtime consistency matter. It is often chosen when teams want the productivity and structure of managed code without giving up serious production engineering capabilities.',
  },
]

const whyItMatters = [
  'It provides a mature backend framework tightly integrated with C# and the .NET runtime.',
  'It supports multiple application styles without forcing one narrow pattern.',
  'It offers strong performance while retaining the ergonomics of a managed platform.',
  'It has first-class support for DI, configuration, logging, auth, and hosting.',
  'It is well suited to long-lived production systems that need good tooling and operational discipline.',
]

const historicalContext = [
  {
    title: 'From classic ASP.NET to ASP.NET Core',
    detail:
      'Older ASP.NET frameworks were deeply tied to the Windows and IIS era. ASP.NET Core was the redesign that modernized the stack around cross-platform .NET, modular hosting, better performance, and cleaner application composition.',
  },
  {
    title: 'The cloud-native shift',
    detail:
      'As backend systems moved toward containers, Linux deployments, microservices, and API-first architecture, ASP.NET Core became the .NET answer for modern service development rather than a framework centered on older server assumptions.',
  },
  {
    title: 'Consolidation around the generic host',
    detail:
      'The framework matured around a unified host, consistent configuration layers, middleware pipelines, and integrated observability. That made backend engineering in .NET feel more like modern platform engineering and less like disconnected framework usage.',
  },
  {
    title: 'Minimal APIs and modern endpoint styles',
    detail:
      'Recent versions broadened the framework beyond classic MVC controllers by adding minimal APIs, improved startup patterns, better async ergonomics, and more composable endpoint registration. This widened the range of use cases while keeping the same host and middleware foundation.',
  },
]

const bigPictureThemes = [
  {
    title: 'Hosting model first, handlers second',
    body: 'The framework is best understood from the outside in: host, configuration, services, middleware, endpoints, and runtime integration. If a team sees only controllers, it misses the architectural center of ASP.NET Core.',
  },
  {
    title: 'Pipeline composition is the core idea',
    body: 'Middleware ordering determines request behavior. Logging, exception handling, static files, routing, authentication, authorization, rate limiting, and custom cross-cutting behavior all depend on where they sit in the pipeline. This makes pipeline design a first-class engineering task.',
  },
  {
    title: 'Strong conventions without hard lock-in',
    body: 'ASP.NET Core has clear conventions for startup, dependency injection, configuration, and endpoint registration, but it remains flexible about whether the team prefers controllers, minimal APIs, MediatR-style handler patterns, or layered service architecture.',
  },
  {
    title: 'Framework strength comes from ecosystem integration',
    body: 'The value of ASP.NET Core is not only in routing and HTTP primitives. It is amplified by the wider .NET ecosystem: C# typing, async support, test tooling, EF Core integration, structured logging, identity, diagnostics, deployment tooling, and cloud-hosting compatibility.',
  },
]

const keyTakeaways = [
  'ASP.NET Core is a full hosting and request-pipeline framework, not just a controller library.',
  'Its strongest qualities are consistency, composability, tooling, and operational maturity.',
  'Middleware ordering, dependency injection, and endpoint design are core architectural concerns.',
  'It works well for APIs, services, and cloud-native backends where typed contracts matter.',
  'The framework is most effective when engineers understand both the web layer and the .NET runtime beneath it.',
]

const topicSignals = [
  {
    title: 'Choose ASP.NET Core when HTTP services are central',
    body: 'If the application is fundamentally an API, service backend, authenticated web system, or real-time web application, ASP.NET Core is a natural framework to evaluate because the host, routing, DI, and async model are aligned to those workloads.',
  },
  {
    title: 'Choose it when typed service architecture matters',
    body: 'If the team values strong compile-time contracts, refactoring safety, interface-driven services, and rich IDE support across a large codebase, ASP.NET Core is often a better fit than a looser scripting stack.',
  },
  {
    title: 'Choose it when operational discipline matters',
    body: 'Structured configuration, health checks, logging pipelines, environment-specific configuration, middleware control, and integration with modern deployment environments make the framework attractive for serious production systems.',
  },
  {
    title: 'Choose it when .NET is already part of the platform strategy',
    body: 'If the organization already uses C#, .NET libraries, EF Core, Azure services, or other .NET-hosted components, ASP.NET Core compounds that ecosystem advantage rather than introducing a disconnected stack.',
  },
]

const coreFoundations = [
  {
    title: 'Generic host',
    body: 'The host is the process-level foundation that sets up configuration, dependency injection, logging, environment handling, and application lifetime. ASP.NET Core applications are built on top of that host, which means backend concerns are unified early rather than bolted on later.',
  },
  {
    title: 'Kestrel and server boundary',
    body: 'Kestrel is the high-performance web server commonly used to receive HTTP traffic in ASP.NET Core. It handles connections, protocols, and request transport before the application pipeline takes over.',
  },
  {
    title: 'Middleware pipeline',
    body: "Requests flow through middleware in sequence. Each middleware can observe, mutate, short-circuit, or forward the request. This is one of the framework's central ideas, because cross-cutting concerns such as error handling, auth, CORS, compression, and logging live here.",
  },
  {
    title: 'Dependency injection',
    body: 'ASP.NET Core includes a built-in DI container and a clear service registration model. Most applications rely heavily on constructor injection for repositories, services, clients, handlers, and policy objects. This is one reason the ecosystem tends to produce structured service-oriented designs.',
  },
  {
    title: 'Endpoints and handlers',
    body: 'The final request target may be a controller action, a minimal API delegate, a Razor Pages handler, a SignalR hub, or another endpoint abstraction. The framework supports multiple presentation styles while preserving the same host and pipeline model underneath.',
  },
]

const languageAndFrameworkFeatures = [
  {
    title: 'Controllers and MVC',
    body: 'Controllers provide a familiar attribute-routed, action-oriented model that works well for layered backend applications. MVC is still relevant, especially in larger codebases where explicit controller classes and action methods improve discoverability and organization.',
  },
  {
    title: 'Minimal APIs',
    body: 'Minimal APIs reduce ceremony for smaller services, focused HTTP endpoints, and lightweight applications. They are useful when teams want the ASP.NET Core host and middleware model without committing to full controller structure everywhere.',
  },
  {
    title: 'Model binding and validation',
    body: 'The framework binds route values, query strings, headers, and request bodies into typed parameters or models. Validation patterns can then enforce structural correctness before business logic executes. This turns HTTP input handling into typed application boundaries rather than ad hoc parsing.',
  },
  {
    title: 'Authentication and authorization',
    body: 'ASP.NET Core includes mature support for authentication schemes, claims-based identity, policy authorization, cookie or token strategies, and framework-level security integration. For many production systems, these capabilities are a core reason to adopt the framework.',
  },
  {
    title: 'Background work and hosted services',
    body: 'The same host model can run background workers, scheduled processes, queue consumers, or startup tasks through hosted services. This makes it easier to keep supporting process logic in one platform rather than scattering it across unrelated tooling.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Async-first service model',
    body: 'Because modern backend services spend much of their time waiting on network, disk, or database operations, ASP.NET Core is built around async-first programming. Throughput and resource efficiency depend heavily on using async patterns correctly rather than blocking threads unnecessarily.',
  },
  {
    title: 'Configuration layering',
    body: "Configuration can come from files, environment variables, secrets stores, command-line arguments, and remote providers. The framework's layered configuration model is one of the reasons it adapts well to dev, test, staging, container, and production workflows.",
  },
  {
    title: 'Logging, tracing, and diagnostics',
    body: 'ASP.NET Core integrates well with structured logging, request tracing, metrics, health checks, and distributed diagnostics. Production engineering in this stack usually assumes observability is part of the application design rather than an afterthought.',
  },
  {
    title: 'Performance and allocation awareness',
    body: 'The framework can be fast, but engineers still need to care about serialization cost, request allocation, middleware overhead, blocking calls, connection pooling, and downstream latency. Managed runtimes reward disciplined measurement, not performance mythology.',
  },
]

const ecosystemUses = [
  {
    title: 'HTTP APIs and internal platforms',
    body: 'ASP.NET Core is widely used for JSON APIs, internal business platforms, admin systems, and service-to-service communication where strong typing, validation, auth, and consistent middleware composition are valuable.',
  },
  {
    title: 'Microservices and distributed systems',
    body: 'Because it composes well with containers, health endpoints, structured configuration, and async programming, the framework is a common choice for microservices and message-driven service architectures in .NET-heavy organizations.',
  },
  {
    title: 'Real-time and interactive systems',
    body: 'SignalR and the broader host model allow the same stack to support real-time communication patterns when applications need live updates or bidirectional interaction.',
  },
  {
    title: 'Full-stack .NET environments',
    body: 'In organizations where C#, .NET libraries, Azure integrations, and enterprise tooling are already standard, ASP.NET Core becomes a natural backend anchor rather than an isolated framework choice.',
  },
]

const comparisons = [
  {
    title: 'ASP.NET Core versus Spring Boot',
    body: 'Both are mature backend frameworks in strongly typed ecosystems with deep enterprise reach. ASP.NET Core tends to feel more integrated with the .NET host and C# language features, while Spring Boot is rooted in the Java and JVM ecosystem. The real decision is usually ecosystem alignment, deployment strategy, and team expertise rather than a simple framework feature checklist.',
  },
  {
    title: 'ASP.NET Core versus FastAPI or Express',
    body: 'Compared with lighter scripting frameworks, ASP.NET Core often offers more structure, stronger typing, and richer built-in operational support, but with more upfront framework and project-system weight. The trade is usually favorable in larger systems where lifecycle and maintainability matter.',
  },
  {
    title: 'Controllers versus minimal APIs',
    body: 'This is an internal comparison that matters in real projects. Controllers often help organize larger HTTP surfaces with clearer discoverability. Minimal APIs reduce ceremony and can be excellent for smaller or highly focused services. Good ASP.NET Core teams choose one or mix both deliberately rather than by habit.',
  },
  {
    title: 'Framework versus platform confusion',
    body: 'ASP.NET Core is often conflated with .NET itself. The framework handles web application concerns, while .NET provides the runtime, base libraries, build system, and broader hosting platform. Good decisions require understanding both layers.',
  },
]

const failureModes = [
  {
    title: 'Thinking only in controllers',
    body: "Teams sometimes treat ASP.NET Core as little more than a controller-and-route framework. That misses the host, middleware, DI, and operational model that actually define the framework's architecture.",
  },
  {
    title: 'Blocking inside async workflows',
    body: 'One of the fastest ways to harm throughput is to write blocking code inside an async service model. Hidden sync-over-async patterns can waste threads and create scale problems long before the CPU is saturated.',
  },
  {
    title: 'Overusing framework abstractions',
    body: 'Because the ecosystem is powerful, it is possible to over-abstract with excessive handlers, filters, wrappers, or service layers. The framework helps structure applications, but too much indirection can still make behavior hard to trace.',
  },
  {
    title: 'Ignoring middleware order',
    body: 'Middleware order is not decorative. Incorrect ordering can break authentication, routing, exception handling, CORS, or response behavior in ways that are subtle and frustrating.',
  },
  {
    title: 'Assuming strong typing removes runtime validation needs',
    body: 'Typed models improve internal correctness, but external inputs still need validation and boundary discipline. HTTP clients, third-party services, and user input can still violate assumptions regardless of compiler guarantees.',
  },
]

const studyChecklist = [
  'Understand the generic host, Kestrel, middleware, and endpoint flow as one system.',
  'Learn DI and configuration as core framework concepts, not optional extras.',
  'Use async correctly and avoid hidden blocking in request paths.',
  'Treat middleware order and endpoint registration as architectural decisions.',
  'Measure serialization, allocation, and downstream latency instead of guessing.',
  'Keep boundaries typed, validated, and operationally observable.',
]

const examples = [
  {
    id: 'asp98-example-minimal-api',
    title: 'Example: Minimal API endpoint',
    area: 'Endpoint Design',
    intro:
      'Minimal APIs are useful when the service is small, focused, or intentionally low-ceremony. They show how ASP.NET Core can expose a typed HTTP surface without requiring controller classes everywhere.',
    whyFit: 'This example captures the lighter endpoint model that many modern .NET services use.',
    code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/orders/{id:guid}", async (Guid id, IOrderRepository orders, CancellationToken cancellationToken) =>
{
    var order = await orders.FindByIdAsync(id, cancellationToken);
    return order is null ? Results.NotFound() : Results.Ok(order);
});

app.Run();`,
    takeaway:
      'Minimal APIs reduce ceremony, but they still run inside the same host, DI, and middleware architecture as the rest of ASP.NET Core.',
  },
  {
    id: 'asp98-example-middleware',
    title: 'Example: Custom middleware',
    area: 'Pipeline Composition',
    intro:
      'Middleware is the most direct way to express cross-cutting request behavior. Logging, correlation, timing, error shaping, auth gates, and policy enforcement often live here.',
    whyFit: "This example reflects the framework's central request-pipeline model.",
    code: `app.Use(async (context, next) =>
{
    var started = DateTimeOffset.UtcNow;
    await next();
    var elapsed = DateTimeOffset.UtcNow - started;
    app.Logger.LogInformation("Request {Path} completed in {Elapsed} ms", context.Request.Path, elapsed.TotalMilliseconds);
});`,
    takeaway:
      'ASP.NET Core architecture becomes much clearer once middleware is understood as the place where cross-cutting web behavior is composed.',
  },
  {
    id: 'asp98-example-controller',
    title: 'Example: Controller action with typed input',
    area: 'MVC Style',
    intro:
      'Controllers remain valuable for larger codebases where explicit endpoint classes improve discoverability and align well with layered application structure.',
    whyFit:
      'This example shows the classic style that many enterprise services still use effectively.',
    code: `[ApiController]
[Route("api/orders")]
public sealed class OrdersController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateAsync(CreateOrderRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _service.CreateAsync(request, cancellationToken));
    }
}`,
    takeaway:
      'Controller-based design is often a readability and organization choice, not a sign of outdated engineering.',
  },
  {
    id: 'asp98-example-di',
    title: 'Example: Service registration',
    area: 'Dependency Injection',
    intro:
      "The DI container is one of the framework's core structural tools. Registration policy affects lifetime, object graph composition, testability, and runtime behavior.",
    whyFit:
      'This example shows how service architecture is configured centrally rather than ad hoc.',
    code: `builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddHttpClient<PaymentsClient>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();`,
    takeaway:
      'In ASP.NET Core, service registration is part of application design, not just setup boilerplate.',
  },
  {
    id: 'asp98-example-config',
    title: 'Example: Bound configuration options',
    area: 'Configuration',
    intro:
      'Configuration binding lets applications map environment and settings data into typed options. This makes operational settings explicit, testable, and easier to reason about than scattered string lookups.',
    whyFit: "This example reflects one of the framework's strongest production-oriented features.",
    code: `builder.Services.Configure<StorageOptions>(
    builder.Configuration.GetSection("Storage")
);

public sealed class StorageOptions
{
    public string ConnectionString { get; init; } = string.Empty;
    public int TimeoutSeconds { get; init; }
}`,
    takeaway:
      'Typed configuration reduces operational ambiguity and makes deployment-specific behavior easier to manage safely.',
  },
]

const glossary = [
  {
    term: 'ASP.NET Core',
    definition: 'The modern .NET web framework for building APIs, web apps, and backend services.',
  },
  {
    term: 'Dependency injection',
    definition:
      'A design and runtime pattern where required services are provided by a container rather than constructed ad hoc.',
  },
  {
    term: 'Endpoint',
    definition: 'A routable HTTP target such as a controller action or minimal API handler.',
  },
  {
    term: 'Generic host',
    definition:
      'The .NET host abstraction that sets up configuration, logging, DI, and application lifetime.',
  },
  {
    term: 'Kestrel',
    definition: 'The high-performance web server commonly used by ASP.NET Core applications.',
  },
  {
    term: 'Middleware',
    definition:
      'A composable component in the request pipeline that can inspect, modify, or short-circuit requests and responses.',
  },
  {
    term: 'Minimal API',
    definition:
      'A low-ceremony endpoint style in ASP.NET Core for defining handlers directly in application setup.',
  },
  {
    term: 'Model binding',
    definition: 'The framework process that maps request data into typed parameters or objects.',
  },
  {
    term: 'Policy authorization',
    definition:
      'An authorization model where access rules are expressed as named policies rather than scattered checks.',
  },
  {
    term: 'Hosted service',
    definition:
      'A background service managed by the application host alongside the web application.',
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
    { id: 'asp98-overview', label: 'Overview' },
    { id: 'asp98-why', label: 'Why It Matters' },
    { id: 'asp98-history', label: 'Historical Context' },
    { id: 'asp98-themes', label: 'Big Picture Themes' },
    { id: 'asp98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'asp98-signals', label: 'Topic Signals' },
    { id: 'asp98-foundations', label: 'Foundations' },
    { id: 'asp98-features', label: 'Framework Features' },
    { id: 'asp98-runtime', label: 'Runtime and Operations' },
    { id: 'asp98-uses', label: 'Ecosystem Uses' },
    { id: 'asp98-compare', label: 'Compare and Contrast' },
    { id: 'asp98-failures', label: 'Failure Modes' },
    { id: 'asp98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'asp98-glossary', label: 'Terms' }],
}

export default function AspNetCorePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'ASP.NET Core',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="ASP.NET Core"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">ASP.NET Core</h1>
      <p className="asp98-intro">
        This page is a detailed overview of ASP.NET Core as a backend web framework in the .NET
        ecosystem. It covers the host model, middleware pipeline, DI system, endpoint styles,
        runtime behavior, and the framework\'s role in modern service and API engineering.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="asp98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="asp98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="asp98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="asp98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="asp98-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="asp98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {languageAndFrameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="asp98-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
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
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
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
        <section id="asp98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
