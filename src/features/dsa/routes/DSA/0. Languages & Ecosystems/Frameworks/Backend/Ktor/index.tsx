import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

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
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Ktor is a Kotlin framework for building servers and clients with an emphasis on asynchronous programming, composable pipelines, and direct access to Kotlin language features. It is commonly used for backend APIs, microservices, web applications, and service integrations where teams want Kotlin-first development without the weight of a very large opinionated enterprise framework.',
  'The most useful way to think about Ktor is not as a batteries-included platform like Spring Boot and not as a bare HTTP library. It sits in the middle. Ktor gives teams a structured server framework with routing, plugins, content negotiation, authentication, testing, and coroutine-based request handling, while still leaving many architectural choices more explicit and closer to the application code.',
  'This page is intentionally thorough. It covers the Ktor programming model, application and routing structure, pipelines, plugins, coroutines, serialization, authentication, data access integration, testing, deployment, tradeoffs, and practical examples for designing real Kotlin backend services.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ktor is a framework for creating asynchronous servers and clients in Kotlin. On the server side it provides routing, plugin-based request handling, response generation, content negotiation, authentication hooks, testing tools, and multiple runtime engine options. It is intentionally designed to fit naturally with Kotlin language features such as coroutines, DSLs, and type safety.',
      'Its main appeal is flexibility with structure. Ktor gives a real framework model, but it does not force the degree of architectural ceremony that some larger backend frameworks do. Teams can build clean services with strong Kotlin ergonomics while still making explicit choices about modules, DI, persistence, and other application concerns.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Ktor Matters',
    paragraphs: [
      'Ktor matters because many Kotlin teams want a framework that feels native to Kotlin rather than one adapted from another model. Ktor uses coroutine-friendly request handling, Kotlin DSLs, and lightweight composition so backend code can remain direct and expressive.',
      'It is especially relevant for teams that want more flexibility than a highly opinionated platform provides, while still wanting something more structured and production-capable than assembling a server from very low-level libraries.',
    ],
    bullets: [
      'Built around Kotlin language strengths such as coroutines and DSLs.',
      'Provides structure without forcing a heavyweight enterprise programming model.',
      'Supports both server and client work in the same ecosystem.',
      'Fits teams that want explicit architectural choices with modern async support.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a Kotlin-first web framework where request processing is shaped by pipelines, routes, and installed plugins. A Ktor app is not just route handlers, but it is also not a heavily hidden container system. The framework is relatively transparent about how requests flow and where behavior is installed.',
      'That means Ktor rewards engineers who want to build explicit backend architecture on top of a clean foundation. The framework gives the HTTP and application lifecycle model, while the team decides how much additional structure to add for domains, services, DI, persistence, and runtime composition.',
    ],
    bullets: [
      'Think coroutine-friendly request pipeline with explicit structure.',
      'Think plugin installation and route composition rather than annotation-heavy hidden behavior.',
      'Think Kotlin application design first, framework ceremony second.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Ktor Fits Best',
    paragraphs: [
      'Ktor fits best for Kotlin-first APIs, microservices, backend integrations, gateway layers, internal services, and applications where teams want asynchronous capability and clean Kotlin code without committing to a very large all-encompassing framework. It is especially attractive when the team values Kotlin DSLs and explicit architecture decisions.',
      'It is also strong for services that need good HTTP handling, JSON serialization, auth integration, and testability, but do not need every concern prepackaged by the framework itself.',
    ],
    bullets: [
      'Kotlin backend services where language-native ergonomics matter.',
      'Teams that want a lighter framework with strong async support.',
      'Applications needing control over architecture instead of full platform opinionation.',
      'Services where plugin composition is a good fit for cross-cutting concerns.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Ktor Is Not the Best Default',
    paragraphs: [
      'Ktor is not automatically the right answer when a team wants a much more batteries-included platform with strongly guided architecture, or when the organization is not aligned around Kotlin at all. It can also be a weak fit if the application is so small that the framework adds more structure than needed, or if the team expects the framework itself to prescribe every architectural pattern.',
      'That does not make Ktor weak. It means its strength is giving a clean foundation, not solving every application-layer decision for the team.',
    ],
    bullets: [
      'Teams wanting a more fully opinionated platform with broader built-in conventions.',
      'Projects without meaningful Kotlin ecosystem alignment.',
      'Very small apps that do not need a framework beyond minimal routing.',
      'Organizations expecting framework-driven architecture rather than team-driven design.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Ktor is strongest when teams want Kotlin-native backend development with clear async support, explicit request pipelines, and room to shape the application architecture deliberately. It is more structured than a bare toolkit and less prescriptive than a broad enterprise platform.',
      'Its real value appears when teams use that flexibility responsibly: building clean modules, good plugin composition, and strong operational habits on top of a lightweight but production-capable base.',
    ],
    bullets: [
      'Choose Ktor when Kotlin-first development and architectural control are advantages.',
      'Treat pipelines, plugins, and coroutine behavior as central framework ideas.',
      'Use its flexibility to build clarity, not ad hoc sprawl.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Ktor Actually Is',
    paragraphs: [
      'Ktor is a Kotlin framework for building asynchronous applications, especially HTTP servers and clients. On the server side it provides an application object, route composition, request and response handling, plugin installation, serialization, authentication hooks, and testing infrastructure.',
      'The framework is intentionally aligned with Kotlin itself. That means much of the developer experience comes from Kotlin DSL design, type-safe composition, and coroutine-based concurrency rather than from large annotation-driven runtime machinery.',
    ],
  },
  {
    id: 'core-application',
    title: 'Application Structure and Modules',
    paragraphs: [
      'A Ktor server application is typically defined through one or more application modules where routes, plugins, and configuration are installed. This gives the service a straightforward composition model: create the application, install plugins, define routes, and wire the surrounding dependencies deliberately.',
      'The strong architectural point is that Ktor does not force one module layout. That flexibility is powerful, but teams should still define their own consistent boundaries for domain, infrastructure, and transport code.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and DSL-Based Composition',
    paragraphs: [
      'Ktor routing is commonly expressed through Kotlin DSL blocks. This makes route definitions readable and composable, and it fits naturally with nested route groups, path parameters, and endpoint-specific behavior.',
      'The routes are not only syntax. They are the public HTTP contract of the service, and Ktor gives teams a direct place to express that contract in a structured but lightweight way.',
    ],
  },
  {
    id: 'core-pipeline',
    title: 'Pipelines and Request Processing',
    paragraphs: [
      'Ktor request handling uses pipelines, which are ordered stages where plugins and handlers can intercept and influence execution. This provides a clear model for how requests are processed from inbound handling to response generation.',
      'Understanding the pipeline matters because cross-cutting behavior often lives there. Authentication, logging, content negotiation, error shaping, and other concerns are not random helpers; they participate in a defined request flow.',
    ],
  },
  {
    id: 'core-plugins',
    title: 'Plugins and Cross-Cutting Features',
    paragraphs: [
      'Ktor extends application behavior through plugins. Features such as content negotiation, authentication, compression, CORS, status pages, and metrics-related handling are installed explicitly. This makes the framework feel modular and transparent.',
      'Plugins are powerful because they are explicit, but that also means teams need to understand what has been installed and how plugins interact. Good Ktor work comes from deliberate composition, not from piling on middleware without architectural clarity.',
    ],
  },
  {
    id: 'core-coroutines',
    title: 'Coroutines and Concurrency',
    paragraphs: [
      'Ktor is designed to work naturally with Kotlin coroutines, which makes asynchronous request handling feel direct rather than callback-heavy. This is one of its core strengths for backend services that do I O, remote calls, or other latency-bound work.',
      'Coroutines simplify asynchronous flow, but they do not remove the need for concurrency reasoning. Cancellation, structured concurrency, timeouts, and resource management still matter in production services.',
    ],
  },
  {
    id: 'core-serialization',
    title: 'Serialization and Content Negotiation',
    paragraphs: [
      'Ktor supports content negotiation and structured serialization so Kotlin objects can be encoded and decoded cleanly across JSON and other formats. This makes API boundaries more type-safe and reduces repetitive parsing code.',
      'Serialization should still be treated as part of the API contract. Types, optional fields, error semantics, and compatibility decisions shape how the service evolves over time.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication and Authorization Hooks',
    paragraphs: [
      'Ktor provides authentication support through installed plugins and route scopes. This gives teams a framework-level place for auth concerns without forcing one global security architecture.',
      'The advantage is flexibility. The risk is inconsistency if teams do not define clear auth patterns across services. Security design still belongs to the application architecture, not only to plugin setup.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Architecture Choices',
    paragraphs: [
      'Ktor does not impose a heavyweight DI model by default. Teams can use manual composition, lightweight DI libraries, or their own architecture patterns. This is one reason some developers find Ktor refreshingly direct.',
      'The tradeoff is that structure is more the teams responsibility. A clear service architecture must be chosen deliberately rather than assumed to emerge from the framework automatically.',
    ],
  },
  {
    id: 'core-data-access',
    title: 'Data Access and Persistence Integration',
    paragraphs: [
      'Ktor integrates with the broader Kotlin and JVM ecosystem for data access rather than prescribing one ORM or repository model. Teams may use Exposed, Hibernate, jOOQ, plain JDBC, or other tools depending on their preferences and workload.',
      'This flexibility is valuable, but it means the application team must own its persistence discipline. Query design, transactions, connection handling, and schema evolution remain independent engineering concerns.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Ktor includes testing support that lets applications be exercised without running full external infrastructure in every case. Routes, plugins, serialization, and handler behavior can be tested through framework-provided application test harnesses.',
      'As with any backend stack, strong testing means choosing the right scope. Some behaviors want focused route or service tests; others want broader integration coverage.',
    ],
  },
  {
    id: 'core-engines',
    title: 'Engines and Runtime Deployment',
    paragraphs: [
      'Ktor can run on different server engines such as Netty or CIO. This gives teams some flexibility in runtime characteristics and deployment shape while keeping the framework-level application code mostly stable.',
      'The important engineering point is that the framework is only one part of runtime behavior. Engine choice, thread model, coroutine usage, and surrounding infrastructure all influence production characteristics.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Runtime Discipline',
    paragraphs: [
      'Healthy Ktor services still need the usual production attention: latency measurement, connection pool health, timeouts, cancellation behavior, logging, metrics, configuration management, and dependency upgrade discipline. The framework supports clean service construction, but not operational shortcuts.',
      'Operational quality usually depends more on the teams understanding of their runtime and dependencies than on the elegance of the route DSL.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Ktor can support efficient services, but performance depends on normal backend fundamentals: database behavior, network latency, serialization cost, coroutine and thread usage, and request-path architecture. Framework flexibility does not guarantee performance by itself.',
      'The right posture is empirical. Profile real service behavior, inspect request traces, understand coroutine usage patterns, and solve the actual bottleneck rather than assuming the framework choice settles the question.',
    ],
    bullets: [
      'Measure real request paths and dependency latency.',
      'Watch coroutine cancellation and timeout behavior deliberately.',
      'Treat database and serialization costs as first-class.',
      'Use framework flexibility to simplify hot paths, not complicate them.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Ktor is used for APIs, microservices, backend integrations, internal services, Kotlin-first web applications, and systems where teams want coroutine-friendly request handling with relatively light framework ceremony. It is especially attractive for JVM teams that want Kotlin-native backend ergonomics.',
      'Its strongest real-world value is giving Kotlin teams a clean, modern backend framework that stays close to the language and does not overprescribe architecture.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Ktor',
    paragraphs: [
      'Ktor is a weaker fit when the team wants a much more guided enterprise platform, when the application is too small to need more than a minimal HTTP layer, or when the organization is not committed enough to Kotlin for the ecosystem benefits to matter.',
      'It is also not the best choice if the team expects the framework to provide a complete architectural opinion on every concern. Ktor intentionally leaves more decisions to the application.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Ktor mistakes include letting route definitions become the whole architecture, installing plugins without a clear understanding of request flow, underestimating coroutine cancellation and timeout design, treating framework flexibility as permission for inconsistent service structure, and ignoring persistence discipline because the HTTP layer feels clean.',
      'Another recurring issue is inconsistent application structure across services. Ktor gives freedom, but without team conventions that freedom can become entropy.',
    ],
    bullets: [
      'Do not confuse low ceremony with no need for architecture.',
      'Do not ignore request pipeline order and plugin effects.',
      'Do not treat coroutines as magic performance dust.',
      'Do not let every service invent a completely different structure without reason.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Ktor Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Spring Boot, Ktor is usually lighter and less prescriptive. Compared with NestJS or Laravel, it offers less framework-level architecture and more direct language-centric composition. Compared with minimal HTTP frameworks, it offers stronger built-in structure and better integrated request handling features. Its closest identity is a Kotlin-native framework that balances flexibility with production-ready web capabilities.',
      'The right comparison is whether the team wants a lightweight but real framework or a broader platform with more built-in architectural guidance.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Ktor when Kotlin is a strategic language choice and the team wants a backend framework that is coroutine-friendly, explicit, and less opinionated than a broader platform. Choose something else when the application wants either a much smaller toolkit or a much more batteries-included platform.',
      'The strongest Ktor decisions happen when Kotlin ergonomics, async behavior, and explicit architectural control are real advantages rather than stylistic preferences.',
    ],
    bullets: [
      'Need Kotlin-first backend development: strong Ktor signal.',
      'Need coroutine-friendly async request handling: strong Ktor signal.',
      'Need heavy platform opinionation and built-in enterprise structure: weaker Ktor signal.',
      'Need lightweight framework flexibility with production capability: strong Ktor signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-application',
    title: 'Application Module with Plugins and Routes',
    description: [
      'A typical Ktor application installs plugins and then defines routes in a module function. This keeps request behavior explicit and close to the application entry composition.',
      'The framework structure is lightweight, but the application still has a clear startup shape.',
    ],
    code: `fun Application.module() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        get("/health") {
            call.respond(mapOf("status" to "ok"))
        }
    }
}`,
    notes: [
      'Plugin installation is part of application architecture, not only setup noise.',
      'Routes remain explicit and readable in one composition flow.',
    ],
  },
  {
    id: 'examples-route',
    title: 'Route with Path Parameter',
    description: [
      'Ktor routes commonly use the DSL to capture parameters and respond with serialized output. This example returns one order by ID.',
      'The handler stays close to the HTTP contract while still allowing the service layer to remain separate.',
    ],
    code: `routing {
    get("/orders/{id}") {
        val id = call.parameters["id"] ?: return@get call.respond(HttpStatusCode.BadRequest)
        val order = orderService.findOne(id)
        call.respond(order)
    }
}`,
    notes: [
      'Route handlers should still delegate to application services for deeper logic.',
      'Explicit parameter handling keeps request boundaries clear.',
    ],
  },
  {
    id: 'examples-auth',
    title: 'Authentication Plugin Scope',
    description: [
      'Authentication is commonly installed as a plugin and then applied to route scopes that require it. This keeps security behavior visible in the route tree.',
      'The goal is clarity about which endpoints are protected and how.',
    ],
    code: `install(Authentication) {
    bearer("auth-bearer") {
        authenticate { tokenCredential ->
            if (tokenCredential.token == "secret-token") UserIdPrincipal("demo") else null
        }
    }
}

routing {
    authenticate("auth-bearer") {
        get("/me") {
            call.respond(mapOf("user" to "demo"))
        }
    }
}`,
    notes: [
      'Auth plugins are powerful when route protection remains obvious and consistent.',
      'Security setup should stay explicit rather than hidden in unrelated helpers.',
    ],
  },
  {
    id: 'examples-serialization',
    title: 'Typed Response Serialization',
    description: [
      'Ktor works naturally with Kotlin data classes and installed serializers. This makes API contracts easier to define and maintain.',
      'The shape of the data becomes part of the type system rather than hand-built JSON strings.',
    ],
    code: `@Serializable
data class InvoiceResponse(
    val id: String,
    val status: String,
    val totalCents: Int,
)

get("/invoices/{id}") {
    call.respond(InvoiceResponse("42", "PAID", 12500))
}`,
    notes: [
      'Typed responses improve clarity around API contracts.',
      'Serialization choices still affect compatibility and performance.',
    ],
  },
  {
    id: 'examples-test',
    title: 'Application Test',
    description: [
      'Ktor supports testing applications through a framework test harness that exercises routes and plugins without requiring a separately launched external server in many cases.',
      'This helps teams test request behavior directly and cheaply.',
    ],
    code: `class ApplicationTest {
    @Test
    fun testHealth() = testApplication {
        application {
            module()
        }

        val response = client.get("/health")
        assertEquals(HttpStatusCode.OK, response.status)
    }
}`,
    notes: [
      'Application tests are useful for route and plugin behavior.',
      'Keep test scope aligned with the behavior being validated.',
    ],
  },
  {
    id: 'examples-timeout',
    title: 'Coroutine Timeout for External Work',
    description: [
      'Coroutines make timeout handling part of ordinary Kotlin flow. This is useful when the service depends on network calls or other latency-sensitive work.',
      'Timeouts are an architectural decision, not only a code pattern.',
    ],
    code: `suspend fun fetchCustomer(customerId: String): Customer =
    withTimeout(2_000) {
        customerGateway.fetch(customerId)
    }`,
    notes: [
      'Timeout behavior should be explicit around external dependencies.',
      'Coroutine ergonomics help keep async control flow readable.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Ktor Terms',
    terms: [
      {
        term: 'Application Module',
        definition:
          'A Ktor function that configures the application by installing plugins and defining routes or other startup behavior.',
      },
      {
        term: 'Plugin',
        definition:
          'A composable framework extension in Ktor used to add capabilities such as auth, serialization, or error handling.',
      },
      {
        term: 'Routing DSL',
        definition:
          'Ktors Kotlin-based declarative style for defining routes and nested request handlers.',
      },
      {
        term: 'Coroutine',
        definition:
          'A Kotlin concurrency primitive used by Ktor for asynchronous and non-blocking application behavior.',
      },
      {
        term: 'Engine',
        definition: 'The server runtime implementation used by Ktor, such as Netty or CIO.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Pipeline',
        definition:
          'An ordered sequence of request-processing stages where Ktor handlers and plugins can intercept execution.',
      },
      {
        term: 'Content Negotiation',
        definition:
          'The plugin-driven mechanism for selecting and handling request or response serialization formats.',
      },
      {
        term: 'Call',
        definition:
          'The request-response context object used by Ktor handlers to inspect input and produce output.',
      },
      {
        term: 'Authentication Scope',
        definition:
          'A route group or handler area protected by an installed authentication configuration.',
      },
      {
        term: 'Status Pages',
        definition:
          'A Ktor plugin commonly used to map exceptions and failures into consistent HTTP responses.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'Structured Concurrency',
        definition:
          'A Kotlin coroutine design principle where asynchronous work is organized with explicit parent-child lifetime relationships.',
      },
      {
        term: 'Serialization',
        definition:
          'The process of converting Kotlin objects to and from wire formats such as JSON.',
      },
      {
        term: 'testApplication',
        definition:
          'A Ktor testing utility used to run application behavior in a controlled in-process test environment.',
      },
      {
        term: 'Exposed',
        definition: 'A Kotlin SQL and database access library often used with Ktor applications.',
      },
      {
        term: 'Cancellation',
        definition:
          'The coroutine mechanism for stopping suspended or asynchronous work when the parent scope or timeout ends.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

export default function KtorPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Ktor',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Ktor"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Ktor</h1>
      <p className="bin98-doc-subtitle">
        Kotlin backend framework reference covering coroutines, routing, plugins, request pipelines,
        serialization, testing, and deployment tradeoffs.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
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

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
