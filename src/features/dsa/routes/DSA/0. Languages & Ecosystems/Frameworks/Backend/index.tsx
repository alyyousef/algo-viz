import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  takeaway: string
}

const BACKEND_FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/backend'

const frameworkDirectory = [
  'Express.js',
  'NestJS',
  'FastAPI',
  'Flask',
  'Django REST Framework',
  'Spring Boot',
  'ASP.NET Core',
  'Laravel',
  'Ruby on Rails',
  'Phoenix (Elixir)',
  'Ktor',
]

const introParagraphs = [
  'Backend Frameworks is the overview page for the server-side framework subsection inside Languages & Ecosystems. It explains the ideas that repeat across API frameworks, batteries-included application platforms, typed service frameworks, and minimalist HTTP stacks before the reader dives into any one product.',
  'The best way to use this page is as a backend framework field guide. Instead of asking only what one framework does, ask what backend frameworks in general are trying to standardize: request flow, routing, validation, serialization, dependency wiring, persistence boundaries, background work, observability, and deployment behavior.',
  'The child pages in this section answer the narrower question of how particular ecosystems make those tradeoffs. This page answers the broader question of why backend frameworks exist at all, what they help with, what they cost, and how to evaluate them without reducing the decision to fashion or syntax preference.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'backend98-overview',
    title: 'Overview',
    paragraphs: [
      'A backend framework is a structured foundation for building APIs, web applications, service backends, and other network-facing systems. Instead of starting from low-level sockets or a bare HTTP server, teams start with a system that already knows how requests enter the application, how routes are matched, how handlers are composed, and how responses are produced.',
      'What makes a backend framework different from a plain library is that it usually shapes the whole development model. It provides not only utilities but also an execution environment: routing model, middleware pipeline, lifecycle hooks, serialization rules, dependency composition, extension points, and often expectations about project structure.',
      'That is why backend framework choice is architectural. Choosing one means choosing a way for application code to be discovered, invoked, validated, tested, instrumented, deployed, and maintained over time.',
    ],
  },
  {
    id: 'backend98-why',
    title: 'Why Backend Frameworks Matter',
    paragraphs: [
      'Most backend systems need the same baseline capabilities whether they are public APIs, internal tools, admin backends, monoliths, or microservices. They need route matching, request parsing, response serialization, auth hooks, validation boundaries, database access patterns, configuration, logging, error handling, and operational signals for production.',
      'Without a framework, teams repeatedly recreate those mechanics and often recreate them inconsistently. Frameworks matter because they turn repeated infrastructure problems into conventions. That reduces setup cost, increases predictability, and gives developers a shared way to discuss where code belongs and how requests should flow.',
      'Frameworks also matter socially, not just technically. A strongly opinionated framework can improve onboarding and consistency by deciding more things up front. A lightweight framework can preserve freedom and reduce ceremony, but it moves more architectural responsibility onto the team.',
    ],
    bullets: [
      'They reduce repeated setup work across services and APIs.',
      'They define how request flow and application structure are organized.',
      'They influence validation, testing, persistence, and deployment habits.',
      'They trade off flexibility against built-in guidance.',
    ],
  },
  {
    id: 'backend98-problems',
    title: 'What Backend Frameworks Usually Solve',
    paragraphs: [
      'Backend frameworks exist because raw server programming leaves too many recurring decisions open. Every serious service needs a reliable answer to the same categories of problems: how requests are matched, how input is validated, how errors are normalized, where cross-cutting behavior runs, how business logic stays separate from transport details, and how the application exposes enough signals to run safely in production.',
      'Different frameworks solve these problems with different levels of opinionation. Some expose a thin request pipeline and let the team choose almost everything else. Others provide modules, dependency injection, validation decorators, code generation, official testing patterns, background job helpers, or integrated persistence assumptions.',
      'The point is not that all frameworks solve the same problem equally well. The point is that they exist because these concerns recur in almost every backend system, and teams benefit from solving them in a coherent and repeatable way.',
    ],
    bullets: [
      'Endpoint and route definition.',
      'Request parsing and response serialization.',
      'Shared middleware, filters, or interceptors.',
      'Validation and schema boundaries.',
      'Error handling and API response consistency.',
      'Persistence integration and transaction boundaries.',
      'Configuration, observability, and deployment hooks.',
    ],
  },
  {
    id: 'backend98-reading-guide',
    title: 'How to Read This Section',
    paragraphs: [
      'Start with the overview questions rather than the syntax. How much convention does the framework impose? How much architecture does it provide out of the box? Does it assume controllers and services, plain request handlers, functional pipelines, generated schemas, or integrated modules? Those are the questions that shape maintainability.',
      'Then compare frameworks by fit. Minimal HTTP layers, batteries-included MVC systems, typed contract-oriented API frameworks, and ecosystem-first application platforms each solve different organizational problems. A good framework choice is usually less about popularity and more about whether the frameworks assumptions make the application simpler or more awkward.',
      'Use the examples and glossary tabs as shared vocabulary. They are meant to make the child pages easier to compare without treating each ecosystem as if it invented backend architecture from scratch.',
    ],
  },
  {
    id: 'backend98-spectrum',
    title: 'The Opinionation Spectrum',
    paragraphs: [
      'Backend frameworks range from minimal composition layers to full application platforms. At one end, a framework may mostly provide routing and middleware while leaving validation, architecture, and persistence to companion libraries. At the other end, a framework may prescribe controllers, services, modules, dependency injection, validation, ORM patterns, and official testing and deployment guidance.',
      'This spectrum matters because the same feature can feel like a benefit or a cost depending on the team. More opinionation can improve consistency, onboarding, documentation, and long-term maintainability. Less opinionation can improve flexibility, reduce ceremony, and make it easier to adapt the framework to unusual workloads or established internal standards.',
      'The wrong mental model is that more built-in features automatically means a better framework. The better mental model is that every built-in feature is also a built-in assumption about how the application should be structured and where complexity should live.',
    ],
  },
  {
    id: 'backend98-directory',
    title: 'Frameworks in This Section',
    paragraphs: [
      'The entries below are the concrete framework pages already present under Backend Frameworks. They represent different language ecosystems and different points on the opinionation spectrum. Some are minimalist request frameworks. Some are batteries-included application platforms. Some are strongly typed service frameworks. Read them comparatively rather than as isolated products.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'backend98-when-to-use',
    title: 'When a Backend Framework Is the Right Tool',
    paragraphs: [
      'A backend framework is usually the right tool when the application has repeated HTTP or service concerns and the team benefits from consistent structure. If the codebase needs standard routing, auth hooks, validation, serialization, service composition, test patterns, and deployment conventions, a framework typically reduces chaos rather than adding it.',
      'Frameworks are especially useful when multiple developers need to work in the same codebase over time. Conventions improve onboarding, make code review more predictable, and reduce the amount of custom architecture each new feature has to invent.',
      'They are also useful when the surrounding ecosystem matters. Official plugins, documentation, scaffolding, deployment integrations, and mature community conventions can create real leverage beyond the framework core itself.',
    ],
  },
  {
    id: 'backend98-when-not-to-use',
    title: 'Where Frameworks Can Hurt',
    paragraphs: [
      'A backend framework is not automatically the right choice for every service. Very small utilities, one-off jobs, unusual network protocols, highly specialized low-level runtimes, or systems with nonstandard control flow may not benefit from a full framework abstraction.',
      'Frameworks also hurt when they are chosen for prestige rather than fit. A framework that adds modules, decorators, generated structure, and lifecycle rules without solving real repeated problems becomes ceremony. Likewise, a very minimal framework can become a source of entropy if the team actually needed stronger defaults but never created any above the transport layer.',
      'The key tradeoff is not framework versus no framework in the abstract. It is whether the frameworks constraints remove accidental complexity or simply relocate it.',
    ],
  },
  {
    id: 'backend98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'The original page was a placeholder. That original intent is preserved here as a roadmap so the section can continue to deepen while remaining faithful to the same coverage goals.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'backend98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Backend frameworks are coordination tools. They coordinate request flow, extension points, team conventions, error behavior, operational hooks, and the shape of production systems. The right choice depends on what kinds of complexity the team needs help standardizing.',
      'Strong framework choices are rarely about trend-following. They come from understanding whether the framework improves consistency, maintainability, and operational clarity for the actual service and team that will live with it.',
    ],
    bullets: [
      'Choose a backend framework for development model fit, not only language familiarity.',
      'Treat routing, middleware, validation, and error handling as architectural concerns.',
      'Expect framework choice to influence operations, testing, and long-term maintenance.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'backend98-request-flow',
    title: 'Request Lifecycle and Routing',
    paragraphs: [
      'Nearly every backend framework defines a request lifecycle. A request enters the system, passes through a listener or adapter, is matched to a route or controller, runs through middleware or filters, invokes application logic, and exits through a response serialization layer. The framework may expose those phases explicitly or hide some behind conventions, but the lifecycle still exists.',
      'Understanding that lifecycle is fundamental because it determines where authentication, validation, logging, transactions, tracing, caching, and error shaping actually belong. Teams that do not understand the lifecycle tend to scatter those concerns across handlers in inconsistent ways.',
      'Routing is therefore not just URL matching. It is the first structural boundary where transport concerns are translated into application behavior.',
    ],
  },
  {
    id: 'backend98-middleware',
    title: 'Middleware, Filters, and Cross-Cutting Behavior',
    paragraphs: [
      'Backend frameworks typically provide a way to run shared behavior around requests: middleware, filters, plugs, interceptors, decorators, or lifecycle hooks depending on the ecosystem. This is where logging, auth, rate limiting, tracing, compression, body parsing, and request-scoped context often live.',
      'The design question is not whether such a mechanism exists. The design question is how explicit its order is, how local or global it can be, how failures propagate through it, and whether the framework helps teams keep those cross-cutting concerns understandable.',
      'Middleware systems are one of the clearest expressions of framework philosophy. Minimal frameworks usually expose them directly and expect developers to manage ordering carefully. More opinionated frameworks may wrap them in guards, interceptors, annotations, or declarative registration models.',
    ],
  },
  {
    id: 'backend98-data-boundaries',
    title: 'Validation, Serialization, and Persistence Boundaries',
    paragraphs: [
      'Frameworks differ sharply in how they approach input validation, schema definitions, serialization, and persistence. Some give strong first-class tools for DTOs, schema validation, declarative request contracts, and response shaping. Others stay deliberately thin and expect companion libraries or handwritten boundaries.',
      'That difference matters because a backend does not become maintainable by routing alone. The application also needs disciplined boundaries for untrusted input, internal domain logic, and stored data. Without those boundaries, route handlers become dumping grounds for validation, persistence, and response shaping all at once.',
      'A mature backend framework strategy makes the request boundary explicit: validate early, map data deliberately, and keep storage concerns from leaking uncontrolled into transport code.',
    ],
  },
  {
    id: 'backend98-composition',
    title: 'Application Composition and Dependency Wiring',
    paragraphs: [
      'Backend applications need a way to compose services, repositories, clients, caches, background workers, and configuration. Some frameworks use dependency injection containers, modules, and providers. Others rely on plain function composition, object construction, or explicit imports.',
      'There is no single universally correct model. The important question is whether the composition style stays understandable as the codebase grows. In small services, explicit construction can be perfectly clear. In large systems, injection or module systems can help standardize how dependencies are created, substituted, and tested.',
      'The framework choice matters here because it often determines how much wiring is visible and how much is mediated by framework infrastructure.',
    ],
  },
  {
    id: 'backend98-controllers-services',
    title: 'Controllers, Services, and Layering',
    paragraphs: [
      'Many backend frameworks encourage some form of layering even when they do not enforce it. A common pattern is transport code at the edge, service or domain logic in the middle, and persistence or external integrations behind that. Framework vocabulary differs, but the architectural need is stable.',
      'Controllers or route handlers should translate HTTP-level details into application calls. Services should contain business rules and workflows. Repository or data-access layers should isolate persistence details. Frameworks are helpful when they make these boundaries easier to preserve rather than easier to collapse.',
      'A common failure mode in backend systems is letting the handler become the whole architecture. Comprehensive frameworks help most when they reduce that drift.',
    ],
  },
  {
    id: 'backend98-architecture',
    title: 'Opinionation and Architecture',
    paragraphs: [
      'Minimal frameworks mainly organize HTTP handling. Opinionated frameworks go further and influence modules, services, controllers, configuration, validation style, testing patterns, background jobs, and extension structure. Neither model is automatically better because different teams need different levels of guidance.',
      'The practical question is whether the framework reduces architectural uncertainty or whether it fights the way the team actually needs to build the system. A framework that supplies exactly the boundaries the team needed can save a lot of design work. A framework that imposes the wrong abstractions can increase complexity even when it looks feature-rich.',
      'This is why framework evaluation should focus on the shape of the system over time rather than on how quickly a tutorial endpoint can be created.',
    ],
    bullets: [
      'Lightweight frameworks preserve flexibility but require more team-owned conventions.',
      'Opinionated frameworks accelerate consistency but can impose more ceremony.',
      'The cost of a framework is as much conceptual as it is technical.',
    ],
  },
  {
    id: 'backend98-security',
    title: 'Security Architecture',
    paragraphs: [
      'Backend frameworks participate directly in security architecture because they control request parsing, middleware registration, auth hooks, session handling, header shaping, and extension points for authorization policies. Even when security libraries are external, the framework determines where those concerns attach to the lifecycle.',
      'Teams should evaluate whether the framework makes it easy to apply consistent authentication, authorization, input validation, header hardening, secret management, rate limiting, and safe error handling. Security failures often emerge from inconsistent boundaries rather than from one obviously insecure API.',
      'A framework that leaves everything open can still be secure, but only if the team is disciplined enough to build and apply those boundaries consistently.',
    ],
  },
  {
    id: 'backend98-background-work',
    title: 'Background Jobs and Asynchronous Workflows',
    paragraphs: [
      'Real backend systems do more than answer immediate HTTP requests. They send emails, process uploads, generate reports, publish events, retry external calls, schedule recurring jobs, and trigger downstream workflows. A backend framework does not need to solve all of this directly, but it should at least fit cleanly with those patterns.',
      'Some frameworks include first-class integrations for queues, scheduled jobs, workers, or event-driven workflows. Others rely on external tooling and team-owned conventions. The key question is whether the framework helps keep background work separate from request-response latency while still keeping the application architecture coherent.',
      'This matters because many production bottlenecks are really workflow design problems, not route-handler problems.',
    ],
  },
  {
    id: 'backend98-config',
    title: 'Configuration and Environment Management',
    paragraphs: [
      'Backend frameworks live inside deployment environments, so configuration discipline matters. Ports, database URLs, secret references, feature flags, cache endpoints, queue credentials, proxy trust, and environment-specific behavior all need an explicit place to live.',
      'A good backend framework setup keeps configuration centralized, validated, and visible. It should be possible to understand which values are required to boot the application, which affect runtime behavior, and which are safe to change between environments.',
      'Frameworks that encourage ad hoc configuration scattered across handlers or modules make operability much worse even if the local development experience feels convenient.',
    ],
  },
  {
    id: 'backend98-operations',
    title: 'Operational Concerns',
    paragraphs: [
      'A backend framework always extends beyond code organization. It affects startup behavior, health checks, graceful shutdown, observability hooks, container readiness, proxy behavior, runtime configuration, and how easy it is to expose metrics and traces. Operational fit matters as much as local development ergonomics.',
      'This is why framework selection should not be reduced to syntax preference. Production behavior, debugging workflow, scaling assumptions, cold-start profile where relevant, upgrade cadence, and ecosystem stability are part of the framework decision.',
      'Many frameworks feel similar when serving a simple route. They differ more visibly when teams try to instrument them, deploy them repeatedly, run them under failure, and evolve them across version upgrades.',
    ],
  },
  {
    id: 'backend98-performance',
    title: 'Performance and Scalability Mindset',
    paragraphs: [
      'Framework performance matters, but it is rarely the only meaningful variable. Throughput and latency depend on routing overhead, serialization cost, middleware depth, database latency, caching strategy, concurrency model, connection pooling, background job design, and downstream network behavior. The framework is one layer inside a larger system.',
      'This means benchmark-based decisions should be made carefully. A framework with lower raw overhead may still be the wrong operational choice if it leads to weaker validation, harder maintainability, or more team-level inconsistency. Likewise, a more opinionated framework may be worth modest overhead if it dramatically improves correctness and developer throughput.',
      'The right performance mindset is empirical: measure realistic endpoints, inspect traces, and evaluate the whole request path rather than only the framework core.',
    ],
    bullets: [
      'Do not confuse framework microbenchmarks with end-to-end service behavior.',
      'Measure routing, serialization, database, cache, and downstream latency together.',
      'Treat maintainability and correctness as part of performance at team scale.',
      'Use real workload shape when comparing frameworks under load.',
    ],
  },
  {
    id: 'backend98-testing',
    title: 'Testing and Reliability',
    paragraphs: [
      'A backend framework strongly influences testing strategy because it defines how easy it is to instantiate the application, isolate handlers, mock dependencies, and execute real request flows in tests. Framework choice therefore affects unit testing, integration testing, contract testing, and end-to-end reliability work.',
      'Comprehensive frameworks often provide official testing modules or conventions. Minimal frameworks may keep testing simpler by exposing plain functions and explicit composition. Both can work well. The key is whether the framework makes the application testable without turning tests into infrastructure puzzles.',
      'Reliable backends usually test at multiple levels: pure domain logic, request-level behavior, auth and validation boundaries, persistence integrations, and failure paths.',
    ],
  },
  {
    id: 'backend98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Backend framework misuse follows recurring patterns. Teams often pick a framework because it is fashionable, then ignore the architectural model it expects. They either overfit everything to the framework or fight it constantly with custom patterns that defeat its value.',
      'Another common failure mode is confusing framework selection with architecture completion. Even a strong framework does not automatically create good boundaries, safe transactions, useful observability, or clear domain models. Those still require engineering discipline.',
    ],
    bullets: [
      'Choosing a framework for hype instead of workload fit.',
      'Letting route handlers become the entire application architecture.',
      'Adding many packages without a coherent composition model.',
      'Ignoring operational behavior until after the framework is deeply adopted.',
      'Assuming built-in conventions remove the need for deliberate design.',
    ],
  },
  {
    id: 'backend98-selection',
    title: 'Selection Checklist',
    paragraphs: [
      'When comparing backend frameworks, ask what level of guidance the team needs, how much runtime and ecosystem integration matters, and whether the application benefits from strong conventions or from a thinner composition layer. Also ask whether the framework makes the likely future shape of the system easier or harder to sustain.',
      'Selection quality improves when the decision criteria are concrete. Talk about service boundaries, request volume, type-safety expectations, deployment model, hiring pipeline, migration risk, and operational maturity rather than only saying one framework feels cleaner or more modern.',
    ],
    bullets: [
      'Do you want minimal HTTP control or a fuller application platform?',
      'Do you need first-class validation, DI, or batteries-included subsystems?',
      'Does the framework match the team language ecosystem and deployment model?',
      'Will the framework help maintain structure as the codebase grows?',
      'Are its conventions reducing complexity or creating ceremony without benefit?',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'backend98-example-route',
    title: 'Example: Framework Route Handler',
    description: [
      'A backend framework usually gives a standard place to map HTTP requests to application behavior. The exact syntax changes by ecosystem, but the structure is consistent: decode input, call domain logic, and return a response.',
      'What matters is not the exact API surface. What matters is that the framework creates a repeatable request boundary instead of leaving every endpoint to invent its own conventions.',
    ],
    code: `router.get("/orders/:id", async (request, response) => {
  const order = await orderService.findById(request.params.id)
  response.json(order)
})`,
    takeaway:
      'Frameworks standardize the request boundary so teams do not invent route handling from scratch for every service.',
  },
  {
    id: 'backend98-example-middleware',
    title: 'Example: Shared Middleware Pipeline',
    description: [
      'Cross-cutting concerns usually run before route logic. Middleware or equivalent hooks are where frameworks centralize authentication, logging, parsing, and request-scoped setup.',
      'This is one of the clearest places where framework design becomes architectural rather than cosmetic, because ordering determines what every route can assume about the request.',
    ],
    code: `app.use(traceRequest)
app.use(authenticateUser)
app.use(validateJsonBody)
app.use("/api", apiRoutes)`,
    takeaway:
      'The ordering of shared request behavior is one of the most important design rules in any backend framework.',
  },
  {
    id: 'backend98-example-validation',
    title: 'Example: Validation Before Business Logic',
    description: [
      'Strong backend systems validate incoming data at the boundary instead of letting assumptions leak through the application. Some frameworks provide this directly; others rely on companion libraries.',
      'Either way, the framework should make this pattern easy to apply consistently or the service will drift into fragile request handling.',
    ],
    code: `const payload = createUserSchema.parse(request.body)
const user = await userService.create(payload)

response.status(201).json(user)`,
    takeaway:
      'The framework choice matters less than whether the framework makes boundary validation easy to apply consistently.',
  },
  {
    id: 'backend98-example-service-layer',
    title: 'Example: Thin Handler, Deeper Service',
    description: [
      'A backend framework is healthiest when transport code stays thin and domain logic lives somewhere more stable than the HTTP layer.',
      'This example illustrates the separation between request interpretation and the actual business operation being performed.',
    ],
    code: `app.post("/subscriptions", async (request, response) => {
  const input = createSubscriptionSchema.parse(request.body)
  const result = await subscriptionService.create(input)
  response.status(201).json(result)
})`,
    takeaway:
      'Framework handlers should usually orchestrate boundaries, not contain the whole business workflow.',
  },
  {
    id: 'backend98-example-error-shaping',
    title: 'Example: Centralized Error Handling',
    description: [
      'Backend frameworks typically provide one place to normalize failures into consistent HTTP responses. This prevents every route from inventing its own error contract.',
      'A strong error boundary improves client behavior, observability, and incident diagnosis.',
    ],
    code: `app.use((error, request, response, next) => {
  logger.error(error)

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: "validation_failed" })
  }

  response.status(500).json({ error: "internal_server_error" })
})`,
    takeaway:
      'A backend framework becomes much more valuable when it helps failure behavior stay consistent across the whole service.',
  },
  {
    id: 'backend98-example-background-job',
    title: 'Example: Offloading Work to a Background Job',
    description: [
      'Many backend actions should not be completed fully inside the request-response cycle. Framework-based applications often enqueue background work after validating input and committing the primary state change.',
      'This keeps latency predictable while allowing heavier or retriable tasks to run elsewhere.',
    ],
    code: `app.post("/reports", async (request, response) => {
  const report = await reportService.create(request.body)
  await jobs.enqueue("generate-report", { reportId: report.id })
  response.status(202).json({ id: report.id, status: "queued" })
})`,
    takeaway:
      'Comprehensive backend design includes workflow boundaries, not only request handlers.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Backend framework',
    definition:
      'A server-side development framework that structures request handling, application composition, and operational conventions.',
  },
  {
    term: 'Route handler',
    definition:
      'The code that receives a matched request and produces an HTTP response or delegates to deeper application logic.',
  },
  {
    term: 'Request lifecycle',
    definition:
      'The sequence of phases a request passes through, from server entry and middleware to handler execution, serialization, and response completion.',
  },
  {
    term: 'Middleware',
    definition:
      'Shared request-processing logic that runs before, after, or around route handlers.',
  },
  {
    term: 'Interceptor or filter',
    definition:
      'Framework-specific mechanisms for surrounding request execution, shaping responses, or handling failures and cross-cutting behavior.',
  },
  {
    term: 'Controller',
    definition:
      'A framework-level unit that groups request endpoints and translates HTTP input into application actions.',
  },
  {
    term: 'Service layer',
    definition:
      'Application logic that holds business workflows outside the HTTP transport boundary.',
  },
  {
    term: 'Dependency injection',
    definition:
      'A pattern where framework-managed objects receive their dependencies from a container or composition mechanism rather than constructing them directly.',
  },
  {
    term: 'Provider',
    definition:
      'A framework-managed dependency, service, or construct that can be injected into other parts of the application.',
  },
  {
    term: 'Serialization',
    definition:
      'The transformation of in-memory data into HTTP response formats such as JSON or text.',
  },
  {
    term: 'DTO',
    definition:
      'A data transfer object used to define structured inputs or outputs at the application boundary.',
  },
  {
    term: 'Schema validation',
    definition:
      'The act of checking external input against an explicit contract before deeper application logic uses it.',
  },
  {
    term: 'Persistence layer',
    definition:
      'The part of the application that interacts with databases, queues, or other durable storage systems.',
  },
  {
    term: 'Background job',
    definition:
      'Work that runs outside the direct request-response path, such as sending email, processing uploads, or scheduling tasks.',
  },
  {
    term: 'Observability',
    definition:
      'The combination of logs, metrics, traces, and runtime signals used to understand system behavior in production.',
  },
  {
    term: 'Graceful shutdown',
    definition:
      'Stopping the application in a controlled way so in-flight requests and resources are handled safely during termination.',
  },
  {
    term: 'Convention over configuration',
    definition:
      'A framework design style that uses strong defaults and expected structure to reduce repeated manual setup.',
  },
  {
    term: 'Opinionated framework',
    definition:
      'A framework that strongly guides project structure, lifecycle behavior, and extension patterns rather than leaving most choices open.',
  },
  {
    term: 'Minimal framework',
    definition:
      'A framework that provides core transport composition with relatively few architectural assumptions beyond that boundary.',
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
    { id: 'backend98-overview', label: 'Overview' },
    { id: 'backend98-why', label: 'Why Backend Frameworks Matter' },
    { id: 'backend98-problems', label: 'What Backend Frameworks Usually Solve' },
    { id: 'backend98-reading-guide', label: 'How to Read This Section' },
    { id: 'backend98-spectrum', label: 'The Opinionation Spectrum' },
    { id: 'backend98-directory', label: 'Frameworks in This Section' },
    { id: 'backend98-when-to-use', label: 'When a Backend Framework Is the Right Tool' },
    { id: 'backend98-when-not-to-use', label: 'Where Frameworks Can Hurt' },
    { id: 'backend98-roadmap', label: 'Coverage Roadmap' },
    { id: 'backend98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'backend98-request-flow', label: 'Request Lifecycle and Routing' },
    { id: 'backend98-middleware', label: 'Middleware and Shared Behavior' },
    { id: 'backend98-data-boundaries', label: 'Validation and Persistence Boundaries' },
    { id: 'backend98-composition', label: 'Application Composition and Dependency Wiring' },
    { id: 'backend98-controllers-services', label: 'Controllers, Services, and Layering' },
    { id: 'backend98-architecture', label: 'Opinionation and Architecture' },
    { id: 'backend98-security', label: 'Security Architecture' },
    { id: 'backend98-background-work', label: 'Background Jobs and Async Workflows' },
    { id: 'backend98-config', label: 'Configuration and Environment Management' },
    { id: 'backend98-operations', label: 'Operational Concerns' },
    { id: 'backend98-performance', label: 'Performance and Scalability Mindset' },
    { id: 'backend98-testing', label: 'Testing and Reliability' },
    { id: 'backend98-failure-modes', label: 'Common Failure Modes' },
    { id: 'backend98-selection', label: 'Selection Checklist' },
  ],
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'backend98-glossary', label: 'Terms' }],
}

function toFrameworkRoute(name: string): string {
  return `${BACKEND_FRAMEWORKS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="backend98-section">
      <h2 className="backend98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="backend98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="backend98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="backend98-section">
      <h2 className="backend98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="backend98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="backend98-divider" />}
    </section>
  )
}

export default function BackendFrameworksPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Backend Frameworks',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Backend Frameworks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Backend Frameworks</h1>
      <p className="backend98-doc-subtitle">
        Help-style overview of backend framework architecture, request lifecycle, operational
        tradeoffs, and the framework pages available in this subsection.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1, {
              linkedBullets: frameworkDirectory,
            }),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary' ? (
        <section id="backend98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      ) : null}
    </TopicPageShell>
  )
}
