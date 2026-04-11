import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Gin is',
    body: "Gin is a lightweight HTTP web framework for Go built around routing, middleware chains, request context helpers, and fast JSON-oriented service development. It sits on top of Go's standard net/http stack and aims to make common backend work such as parameter extraction, request binding, grouped routing, and response writing more convenient without hiding the underlying Go server model.",
  },
  {
    title: 'Why Gin matters',
    body: "Gin matters because it became one of the most widely recognized frameworks in the Go backend ecosystem for teams that want more structure than raw net/http but less abstraction than a heavy full platform. It gave Go developers a practical way to build APIs quickly while staying close to the standard library model and Go's general preference for explicitness.",
  },
  {
    title: 'How to think about it',
    body: "The most useful mental model is that Gin is an ergonomic layer over Go's HTTP server primitives. Requests move through a handler chain, middleware can enrich or short-circuit processing, and the framework offers helpers for routing, binding, validation integration, and JSON output. It is a convenience-oriented framework, not a separate runtime or a full application platform.",
  },
  {
    title: 'Where it fits best',
    body: "Gin fits best for JSON APIs, internal services, gateway layers, backend-for-frontend endpoints, and Go services where teams want straightforward performance, a small framework surface, and explicit control over architecture. It is strongest when the team already likes Go's style and wants better HTTP ergonomics without giving up that style.",
  },
]

const whyItMatters = [
  'It became one of the most common entry points for Go web service development beyond raw net/http.',
  "It offers a practical middleware and routing model while staying close to Go's standard HTTP concepts.",
  'It supports fast API development without requiring a highly opinionated application platform.',
  'It fits well with Go teams that prefer explicit structure and lightweight frameworks.',
  'It remains a common comparison point when evaluating other Go web frameworks.',
]

const historicalContext = [
  {
    title: 'Gin grew out of the Go HTTP ecosystem',
    detail:
      'Go already shipped with a capable standard HTTP library, so web frameworks in Go had to justify themselves differently than frameworks in some other languages. Gin gained traction by offering ergonomic improvements rather than trying to replace the core server model entirely.',
  },
  {
    title: 'Performance and simplicity both mattered',
    detail:
      'In the Go ecosystem, frameworks are often judged not only by developer experience but also by allocation behavior, request throughput, and how much abstraction they place between the team and the standard library. Gin became popular because it aimed to improve ergonomics without abandoning those ecosystem priorities.',
  },
  {
    title: 'Microservice growth increased demand',
    detail:
      'As Go became more common in cloud services, API gateways, and infrastructure tools, many teams wanted a framework that accelerated HTTP endpoint development while still fitting Go deployment and operations habits. Gin became one of the frameworks frequently chosen for that role.',
  },
  {
    title: 'It stayed relevant by staying relatively small',
    detail:
      'Rather than expanding into a full-stack platform, Gin remained focused on HTTP concerns. That let it stay relevant in teams that wanted a focused router and middleware framework rather than an all-encompassing backend ecosystem.',
  },
]

const bigPictureThemes = [
  {
    title: 'Closer to the standard library than to a full platform',
    body: 'Gin is not trying to become a complete backend operating system. It gives useful HTTP-level abstractions but still expects the application to decide architecture, service boundaries, persistence patterns, and most operational standards on its own.',
  },
  {
    title: 'Middleware is the main composition model',
    body: 'Cross-cutting concerns such as logging, recovery, auth, tracing, and request policy are usually expressed through Gin middleware. If a team understands the handler chain clearly, the framework becomes much easier to reason about.',
  },
  {
    title: 'Binding and validation are conveniences, not architecture',
    body: 'Gin can bind incoming request data into structs and integrate with validation libraries, but these features should support good boundaries rather than replace them. The framework can parse and validate request shapes, yet the service still needs clear separation between HTTP models and deeper domain logic.',
  },
  {
    title: 'Go discipline still dominates framework outcomes',
    body: 'The overall quality of a Gin service usually depends more on package boundaries, context handling, error modeling, and operational discipline than on framework magic. Gin helps at the HTTP edge, but Go engineering quality still comes from explicit design decisions.',
  },
]

const keyTakeaways = [
  'Gin is a lightweight Go web framework built around routing, middleware, and request-context helpers.',
  'Its main value is ergonomic HTTP development without moving far away from net/http and Go conventions.',
  'It is often a strong fit for API services that want low ceremony and explicit application structure.',
  'Teams still need to supply clear architecture for validation, errors, persistence, and operations.',
  'Gin works best when treated as an HTTP layer, not as the whole backend architecture.',
]

const topicSignals = [
  {
    title: 'Choose Gin when you want lightweight Go HTTP ergonomics',
    body: 'If raw net/http feels too repetitive but a heavy framework would add unnecessary abstraction, Gin is often a good middle ground. It reduces boilerplate while keeping the service close to idiomatic Go request handling.',
  },
  {
    title: 'Choose Gin when the service is API-oriented',
    body: 'Gin is especially comfortable for JSON APIs, internal service layers, and gateway-style backends where routing, middleware, and request parsing are the main framework concerns.',
  },
  {
    title: 'Choose Gin when the team prefers explicit architecture',
    body: 'Teams that want to own package boundaries, service abstractions, and persistence choices themselves often appreciate Gin because it does not try to impose a larger application model over Go code.',
  },
  {
    title: 'Avoid expecting Gin to solve broader application structure',
    body: 'If the team wants strong built-in dependency injection, modules, scaffolding, or a highly integrated application platform, Gin may feel intentionally too small unless those patterns are built separately by the application.',
  },
]

const coreFoundations = [
  {
    title: 'net/http underneath',
    body: "Gin runs on top of Go's standard HTTP server model. Understanding request handlers, http.Server behavior, context propagation, and Go concurrency remains important because the framework does not replace those fundamentals.",
  },
  {
    title: 'Router and handler chain',
    body: 'Gin maps HTTP methods and paths to handler functions and lets middleware wrap those handlers in a chain. Requests can be observed, modified, rejected, or enriched as they move through that chain, which makes middleware order and responsibility important design decisions.',
  },
  {
    title: 'Gin context',
    body: 'Handlers receive a Gin context object that provides access to request data, path params, query strings, helpers for JSON responses, per-request values, and flow-control methods. This context is a productivity feature, but teams still need to distinguish HTTP-layer concerns from deeper application objects.',
  },
  {
    title: 'Binding into structs',
    body: 'Gin can bind JSON bodies, query parameters, path data, and form values into Go structs. This reduces repetitive parsing code and encourages explicit request models, especially when paired with validation tags and careful boundary design.',
  },
  {
    title: 'Route groups and middleware scoping',
    body: 'Gin route groups let teams organize related endpoints and attach middleware to specific branches of the route tree. This is one of the main tools for keeping larger services readable without forcing a heavyweight module system.',
  },
]

const frameworkFeatures = [
  {
    title: 'Low-friction routing and JSON responses',
    body: 'Gin makes the common path from route registration to JSON response very short. This matters because a large share of Go backend work is straightforward HTTP service development where reducing repetitive boilerplate improves productivity without requiring much new mental overhead.',
  },
  {
    title: 'Middleware-driven cross-cutting behavior',
    body: 'Logging, panic recovery, authentication, request IDs, tracing, CORS, and rate limiting all fit naturally into Gin middleware. That makes the framework a good fit for services where HTTP-layer policy is central to the design.',
  },
  {
    title: 'Binding and validation helpers',
    body: 'Gin can parse incoming payloads into typed structs and work with validation rules expressed through tags. These helpers are useful, but they should be applied carefully so external request models do not silently become the entire internal domain model.',
  },
  {
    title: 'Route grouping for service organization',
    body: 'The framework provides just enough structure to keep route trees manageable. Grouped routes and scoped middleware help organize public versus internal endpoints, versioned APIs, and feature-specific branches without enforcing a large framework architecture.',
  },
  {
    title: 'Compatibility with standard Go tooling',
    body: 'Because Gin remains close to Go HTTP fundamentals, it works naturally with the usual Go testing model, context propagation patterns, observability libraries, and deployment approaches. That compatibility is part of why many teams find it easy to adopt.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Go runtime and server behavior still matter',
    body: 'Gin services inherit the operational behavior of the Go runtime and the underlying HTTP server. Timeouts, request limits, cancellation handling, graceful shutdown, connection settings, and memory behavior still need deliberate engineering at the server boundary.',
  },
  {
    title: 'Validation and binding are not free',
    body: 'Request binding and validation improve clarity, but they add parsing and allocation work. The question is not whether to avoid them entirely, but how to use them responsibly and where to keep request models lean enough for the workload.',
  },
  {
    title: 'Recovery is not the same as error architecture',
    body: 'Gin can recover from panics and simplify response writing, but panic recovery is not a substitute for deliberate error modeling. Production services still need explicit policies for domain errors, client errors, observability, and operational failure reporting.',
  },
  {
    title: 'Performance depends on more than the router',
    body: 'Gin has a reputation for being efficient, but framework overhead is rarely the whole story. Database latency, serialization, cache behavior, downstream calls, and payload sizes usually dominate end-to-end service behavior. Good architecture matters more than winning a router benchmark in isolation.',
  },
]

const ecosystemUses = [
  {
    title: 'REST and JSON APIs',
    body: 'Gin is widely used for straightforward REST-style services, internal APIs, and microservice endpoints where JSON request and response handling are central concerns.',
  },
  {
    title: 'Gateway and edge services',
    body: 'Because middleware composition is natural in Gin, it is often used in services that perform authentication checks, request shaping, protocol adaptation, or backend aggregation near the edge of a system.',
  },
  {
    title: 'Operational and infrastructure tooling',
    body: 'Many Go teams use Gin for tooling APIs, control-plane endpoints, admin surfaces, and infrastructure-adjacent services where Go already has strong ecosystem advantages.',
  },
  {
    title: 'Teams standardizing on Go service patterns',
    body: 'Gin can serve as a common HTTP layer in organizations that already prefer Go for backend systems and want a small, familiar framework rather than a large application platform.',
  },
]

const comparisons = [
  {
    title: 'Gin versus net/http',
    body: 'Raw net/http offers maximal control and minimal framework dependency, while Gin reduces repetitive HTTP plumbing through a structured router, middleware model, and context helpers. The tradeoff is convenience versus absolute minimal abstraction.',
  },
  {
    title: 'Gin versus Echo or Fiber',
    body: 'Other Go frameworks may emphasize different API design choices, compatibility tradeoffs, or performance stories. Gin remains attractive because of familiarity, broad usage, and a balance between ergonomics and closeness to standard Go patterns.',
  },
  {
    title: 'Gin versus Express.js',
    body: "Both frameworks rely heavily on middleware, but Gin lives in Go and benefits from Go's compilation model, concurrency primitives, and standard library culture. Express often relies on a larger surrounding package ecosystem, whereas Gin commonly sits in codebases with more of the surrounding architecture written directly in Go.",
  },
  {
    title: 'Gin versus ASP.NET Core or Spring Boot',
    body: 'Compared with larger platform ecosystems, Gin offers less built-in application structure, dependency injection infrastructure, and platform-level ceremony. It trades integrated framework breadth for a smaller HTTP-focused surface and explicit ownership by the application.',
  },
]

const failureModes = [
  {
    title: 'Putting all logic directly in handlers',
    body: 'Because Gin handlers are easy to write, teams sometimes let routes accumulate business logic, persistence code, validation details, and response formatting in one place. That quickly makes the service harder to test and evolve.',
  },
  {
    title: 'Treating Gin context as the whole application boundary',
    body: 'The Gin context is convenient, but if it leaks too deeply into service and domain layers, the whole application becomes tightly coupled to the HTTP framework. Clear systems keep Gin-specific concerns near the edge.',
  },
  {
    title: 'Relying on tags and binding without clear schema ownership',
    body: 'Binding rules and validation tags can make request models concise, but they can also encourage teams to collapse transport models and internal models together. Explicit boundaries are still needed.',
  },
  {
    title: 'Confusing panic recovery with robust error design',
    body: 'Recovery middleware can prevent crashes from taking down a request path, but it does not create a coherent client-facing error model. Teams still need to define which errors are expected, how they are logged, and how they map to responses.',
  },
  {
    title: 'Mistaking framework efficiency for full service efficiency',
    body: 'Choosing a fast router does not automatically produce a fast service. Poor query design, large payloads, chatty downstream dependencies, and weak caching can still dominate the system.',
  },
]

const studyChecklist = [
  'Understand Gin as an HTTP framework over net/http rather than as a separate backend runtime.',
  'Use middleware intentionally and keep its ordering explicit.',
  'Keep Gin-specific context handling near the HTTP boundary instead of leaking it through the whole codebase.',
  'Separate request structs, service logic, and persistence concerns once the application grows.',
  'Design error handling and shutdown behavior deliberately instead of relying only on defaults.',
  'Choose Gin for its ergonomic fit with Go, not only for benchmark reputation.',
]

const examples = [
  {
    id: 'gin98-example-basic-route',
    title: 'Example: Basic JSON endpoint',
    area: 'Routing',
    intro:
      'A simple Gin handler shows the framework style clearly: concise route registration, a context object for request and response work, and direct JSON output with little boilerplate.',
    whyFit: 'This captures the main ergonomic promise of Gin compared with raw net/http.',
    code: `r := gin.Default()

r.GET("/health", func(c *gin.Context) {
    c.JSON(200, gin.H{"ok": true})
})

r.Run(":8080")`,
    takeaway:
      'Gin makes common HTTP endpoint work short and readable without hiding the basic Go server model.',
  },
  {
    id: 'gin98-example-middleware',
    title: 'Example: Middleware for request policy',
    area: 'Middleware',
    intro:
      'Middleware is where Gin expresses cross-cutting rules such as logging, request IDs, auth checks, and latency measurement. This keeps route handlers focused on feature logic.',
    whyFit: "This reflects one of the framework's main composition mechanisms.",
    code: `func RequestLogger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()
        log.Println(c.Request.Method, c.FullPath(), time.Since(start))
    }
}`,
    takeaway:
      'Understanding the handler chain is more important than memorizing helper methods because middleware defines how policy flows through a Gin service.',
  },
  {
    id: 'gin98-example-binding',
    title: 'Example: Binding JSON into a request struct',
    area: 'Validation and Binding',
    intro:
      'Gin can bind incoming JSON into a typed struct so the handler does not need to parse raw request data manually. This is most effective when the request struct is treated as an HTTP boundary model.',
    whyFit: 'This example shows the convenience that often makes Gin appealing for API work.',
    code: `type CreateUserRequest struct {
    Email string \`json:"email" binding:"required,email"\`
    Name  string \`json:"name" binding:"required"\`
}

r.POST("/users", func(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
})`,
    takeaway:
      'Binding improves clarity at the HTTP boundary, but the request struct should not automatically become the whole internal domain model.',
  },
  {
    id: 'gin98-example-route-group',
    title: 'Example: Route group with scoped middleware',
    area: 'Organization',
    intro:
      'Route groups let teams organize related endpoints and apply middleware only where it belongs. This is useful for versioned APIs, admin routes, and feature-specific request policy.',
    whyFit:
      'This demonstrates how Gin keeps route trees manageable without a heavyweight framework module system.',
    code: `api := r.Group("/api")
api.Use(AuthMiddleware())
{
    api.GET("/orders/:id", getOrder)
    api.POST("/orders", createOrder)
}`,
    takeaway:
      'Grouping routes early helps keep services understandable as the number of endpoints and policies grows.',
  },
  {
    id: 'gin98-example-error-response',
    title: 'Example: Consistent error response policy',
    area: 'Operations',
    intro:
      'Production services need a stable way to turn internal failures into client-visible responses. In Gin, that policy is often centralized through middleware or helper functions rather than repeated in every handler.',
    whyFit:
      'This example shows that lightweight frameworks still need explicit operational conventions.',
    code: `func fail(c *gin.Context, status int, code string) {
    c.JSON(status, gin.H{
        "error": code,
    })
    c.Abort()
}`,
    takeaway:
      'A Gin service stays maintainable when error responses follow a deliberate policy instead of ad hoc branching in every endpoint.',
  },
]

const glossary = [
  {
    term: 'Gin',
    definition:
      'A lightweight Go web framework built around routing, middleware, and request-context helpers.',
  },
  {
    term: 'net/http',
    definition:
      "Go's standard library HTTP package that underlies many Go web services and frameworks.",
  },
  {
    term: 'Middleware',
    definition:
      'A handler wrapper that can inspect, modify, or short-circuit request processing before or after the main handler.',
  },
  {
    term: 'Handler chain',
    definition:
      'The ordered sequence of middleware and endpoint handlers through which a Gin request travels.',
  },
  {
    term: 'gin.Context',
    definition:
      'The request-scoped object Gin passes to handlers for reading request data and writing responses.',
  },
  {
    term: 'Binding',
    definition: 'The process of decoding request data into a Go struct for structured handling.',
  },
  {
    term: 'Route group',
    definition:
      'A grouped branch of routes in Gin that can share a path prefix and middleware configuration.',
  },
  {
    term: 'Recovery middleware',
    definition:
      'Middleware that catches panics during request handling and prevents them from crashing the server process.',
  },
  {
    term: 'Request model',
    definition:
      'A struct that represents the expected shape of incoming HTTP data at the boundary of the service.',
  },
  {
    term: 'Low ceremony',
    definition:
      'A style that minimizes framework-imposed boilerplate and leaves more structure in the hands of the application.',
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
    { id: 'gin98-overview', label: 'Overview' },
    { id: 'gin98-why', label: 'Why It Matters' },
    { id: 'gin98-history', label: 'Historical Context' },
    { id: 'gin98-themes', label: 'Big Picture Themes' },
    { id: 'gin98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'gin98-signals', label: 'Topic Signals' },
    { id: 'gin98-foundations', label: 'Foundations' },
    { id: 'gin98-features', label: 'Framework Features' },
    { id: 'gin98-runtime', label: 'Runtime and Operations' },
    { id: 'gin98-uses', label: 'Ecosystem Uses' },
    { id: 'gin98-compare', label: 'Compare and Contrast' },
    { id: 'gin98-failures', label: 'Failure Modes' },
    { id: 'gin98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'gin98-glossary', label: 'Terms' }],
}

export default function GoGinPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Go (Gin) (Backend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Go (Gin) (Backend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Go (Gin) (Backend)</h1>
      <p className="gin98-intro">
        This page is a backend-focused overview of Gin as a lightweight Go web framework. It
        explains Gin's routing and middleware model, request binding and validation helpers, route
        grouping patterns, operational tradeoffs, and the architectural discipline needed to keep
        Gin services maintainable as they grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="gin98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="gin98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="gin98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="gin98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="gin98-takeaways" className="bin98-section">
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
          <section id="gin98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="gin98-checklist" className="bin98-section">
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
        <section id="gin98-glossary" className="bin98-section">
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
