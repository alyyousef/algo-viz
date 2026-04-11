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
  'Express.js is a minimalist web framework for Node.js used to build APIs, web servers, middleware pipelines, and backend applications with direct control over request handling. It is widely used for REST APIs, service backends, internal tools, SSR adapters, gateway layers, and lightweight server applications across the JavaScript and TypeScript ecosystem.',
  'The most useful way to think about Express is as a thin HTTP application framework built on Node request and response primitives, routing, and middleware composition. It provides enough structure to build real backend systems, but it deliberately avoids prescribing a large platform architecture, which is why teams often pair it with their own conventions and libraries.',
  'This page is intentionally thorough. It covers the Express programming model, middleware pipeline, routing, request and response objects, error handling, async behavior, validation, security, database integration, deployment, performance, testing, and the tradeoffs that matter when using Express in production.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Express.js is a lightweight framework for building web servers and APIs on Node.js. It provides routing, middleware, request and response helpers, and application composition on top of the Node HTTP runtime. Its design favors directness and flexibility rather than strong built-in conventions.',
      'That design has made Express one of the most widely used backend libraries in the JavaScript ecosystem. It can power small servers and large production services alike, but it expects the team to decide how validation, data access, auth, architecture, and operational discipline should be organized.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Express Matters',
    paragraphs: [
      'Express matters because it gave JavaScript and Node developers a simple, composable way to build HTTP services without working directly at the raw Node server layer for every concern. Its middleware model shaped a large part of the Node backend ecosystem.',
      'It is also important because its minimalism makes it adaptable. Teams can use it for APIs, proxies, monolith backends, small service endpoints, or custom architectures without buying into a heavyweight framework worldview.',
    ],
    bullets: [
      'Simple routing and middleware composition model.',
      'Fits naturally into the broader Node.js ecosystem.',
      'Minimal core with freedom to compose surrounding libraries.',
      'Approachable for small services but flexible enough for larger systems.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a middleware-driven request pipeline. An Express app is a stack of handlers that inspect requests, attach information, branch to routes, produce responses, or forward errors. Requests move through that stack in order, and each handler decides whether to end the response or pass control onward.',
      'That makes control flow and composition central ideas. Express is not mainly about annotations or hidden containers. It is about explicit ordering of middleware, routers, and handlers around Node HTTP semantics.',
    ],
    bullets: [
      'Think middleware chain plus route handlers.',
      'Think explicit control over request flow and response completion.',
      'Think lightweight HTTP shell around application-specific architecture.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Express Fits Best',
    paragraphs: [
      'Express fits best when teams want a small and flexible Node backend framework with direct control over routing, middleware, and surrounding libraries. It is a strong fit for APIs, service adapters, internal tools, web backends, BFF layers, and applications where the team prefers to assemble architecture deliberately.',
      'It is especially useful when JavaScript or TypeScript is already central to the stack and when the team values a thin framework layer over an all-encompassing platform.',
    ],
    bullets: [
      'Node.js APIs and services with explicit routing needs.',
      'Teams that want to compose middleware and libraries themselves.',
      'Projects where low framework ceremony is an advantage.',
      'Applications needing straightforward HTTP control without heavy platform defaults.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Express Is Not the Best Default',
    paragraphs: [
      'Express is not the best default when a team wants strong built-in architecture, dependency injection, validation, documentation generation, or highly opinionated framework conventions. It can also be a weak fit when teams confuse minimalism with absence of design work and let the codebase drift into unstructured middleware sprawl.',
      'It is also not ideal when the application would benefit more from a framework that guides modules, controllers, validation, and testing conventions more aggressively from the start.',
    ],
    bullets: [
      'Teams wanting stronger built-in backend conventions.',
      'Projects that need framework-level validation and schema generation by default.',
      'Large applications without willingness to define internal standards.',
      'Organizations expecting the framework to prevent architectural entropy automatically.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Express is strongest when simplicity, flexibility, and direct control over HTTP handling are genuine advantages. It provides a very capable foundation, but it does not impose the architecture that a growing backend system needs.',
      'The best Express systems use that freedom carefully. Strong routing discipline, predictable middleware order, explicit validation, clean layering, and operational rigor matter far more than the fact that the core framework stays small.',
    ],
    bullets: [
      'Choose Express when lightweight HTTP composition is the right fit.',
      'Treat middleware order and handler boundaries as first-class design concerns.',
      'Use its flexibility to build clarity, not accidental complexity.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Express Actually Is',
    paragraphs: [
      'Express.js is a web framework for Node.js that provides routing, middleware support, request and response helpers, and application composition on top of the Node HTTP runtime. It is intentionally small and does not attempt to prescribe the entire backend stack.',
      'Its identity is lightweight server composition. Express gives enough structure to build real web services, but it expects teams to choose their own validation, auth patterns, ORM or query layer, documentation strategy, module organization, and much of the application architecture.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Object and Project Structure',
    paragraphs: [
      'An Express application usually starts with an app object created by express(). That app registers global middleware, routers, error handlers, configuration, and server startup code. Small applications may begin in one file, but production systems usually split routes, middleware, controllers, services, persistence, and config into separate modules.',
      'Because Express is not opinionated about structure, teams need to define one deliberately. Good Express code keeps HTTP transport concerns thin while domain logic, persistence logic, and external integrations live outside route handlers.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Route Handlers',
    paragraphs: [
      'Express routes map HTTP methods and paths to handler functions. The app and router objects expose methods such as get, post, put, patch, and delete, and those handlers receive request, response, and next arguments for processing.',
      'The route handler is where transport logic meets application logic, but it should not become the whole architecture. Clean Express systems use route handlers to interpret the request and delegate real work to services or domain modules.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware Pipeline',
    paragraphs: [
      'Middleware is the defining Express concept. A middleware function can inspect the request, modify request or response objects, perform authentication, log activity, parse bodies, attach services, or terminate the request by sending a response. If it does not end the response, it calls next() to continue the pipeline.',
      'Middleware order matters. That means Express applications are highly sensitive to composition sequence. Good teams treat middleware ordering as architecture, not setup noise.',
    ],
  },
  {
    id: 'core-request-response',
    title: 'Request and Response Objects',
    paragraphs: [
      'Express request and response objects wrap Node HTTP primitives with convenience helpers. Developers commonly read params, query strings, headers, cookies, and bodies from req, then send JSON, text, files, redirects, or status codes through res.',
      'That convenience is useful, but it can also encourage handler-heavy code. The response object should be where the HTTP contract is finalized, not where the entire application behavior lives.',
    ],
  },
  {
    id: 'core-routers',
    title: 'Routers and Modular Composition',
    paragraphs: [
      'Express.Router lets teams group related routes and middleware into modular units that can be mounted under path prefixes. This is the main built-in mechanism for organizing larger applications.',
      'Routers help structure transport concerns, but they do not replace architecture. Business workflows, service boundaries, and persistence concerns still need separate modeling outside the router tree.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation and Parsing Strategy',
    paragraphs: [
      'Express does not prescribe one validation model. Teams usually pair it with libraries such as Zod, Joi, Yup, class-validator, or handwritten validation functions. This flexibility is useful, but it means validation standards must be chosen deliberately.',
      'Strong Express services validate inputs explicitly at request boundaries. Without that discipline, route handlers become fragile and data assumptions leak deep into the application.',
    ],
  },
  {
    id: 'core-async',
    title: 'Async Behavior and Error Propagation',
    paragraphs: [
      'Modern Express code often uses async handlers because Node applications frequently perform database calls, network requests, or other asynchronous work. Async functions can make control flow clearer than nested callbacks, but error propagation needs to be handled carefully.',
      'Historically, Express did not automatically catch every async failure pattern the way many developers expected. Even with newer patterns, teams should be explicit about error forwarding, promise handling, and centralized failure shaping.',
    ],
  },
  {
    id: 'core-errors',
    title: 'Error Handling',
    paragraphs: [
      'Express uses dedicated error-handling middleware to centralize failure responses. A middleware with four parameters, err, req, res, and next, can convert exceptions and operational failures into consistent HTTP responses.',
      'This is a critical production concern. Without a clear error strategy, applications leak stack traces, return inconsistent payloads, or leave requests hanging. Centralized error handling should be treated as part of the API contract and operational posture.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security and Auth Layers',
    paragraphs: [
      'Express does not prescribe one security model. Authentication, authorization, session management, CSRF protection where relevant, input sanitization, rate limiting, helmet-style headers, and secret management are assembled through middleware and application design.',
      'That flexibility is powerful, but it also means Express does not save teams from weak security architecture. Good security in Express depends more on explicit design and operational discipline than on any single package choice.',
    ],
  },
  {
    id: 'core-database',
    title: 'Database Integration and Persistence',
    paragraphs: [
      'Express works with the broader Node ecosystem for persistence rather than imposing a database layer. Teams may use Prisma, Sequelize, TypeORM, Knex, Mongoose, raw drivers, or custom repositories depending on the workload and preferred level of abstraction.',
      'The framework does not remove the need for transaction design, query discipline, connection lifecycle management, migrations, and consistency thinking. Those concerns remain independent engineering responsibilities.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration and Environment Management',
    paragraphs: [
      'Express applications usually load configuration from environment variables, config modules, or dedicated runtime settings systems. This includes ports, database URLs, API keys, feature flags, proxy settings, and security-sensitive values.',
      'As services grow, configuration discipline becomes increasingly important. Keeping configuration explicit, validated, and separate from request logic reduces deployment mistakes and improves operability.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Express applications are commonly tested with tools such as Supertest plus Jest, Vitest, Mocha, or Node test runners. These tests can exercise routes directly and verify status codes, headers, JSON payloads, auth behavior, and error paths.',
      'Testing quality depends heavily on architecture. If routes stay thin and middleware is well separated, HTTP-level tests and service-level tests can each focus on the right scope.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Runtime Model',
    paragraphs: [
      'Express applications run on Node.js and are often deployed behind reverse proxies, containers, process managers, serverless adapters, or orchestration platforms. Runtime behavior depends on Node version, process model, memory limits, proxy trust configuration, and the behavior of external dependencies.',
      'Deployment architecture matters because Express is only the request layer. Logging, process supervision, graceful shutdown, health checks, TLS termination, and horizontal scaling strategy all shape production reliability.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Express can support fast services, but actual performance depends on route design, middleware overhead, database behavior, caching, event-loop blocking, payload sizes, serialization cost, and downstream latency. The framework itself is only one small part of end-to-end behavior.',
      'The right mindset is empirical. Profile real endpoints, inspect traces, watch event-loop health, and solve the actual bottleneck rather than assuming minimal framework code automatically means optimal production performance.',
    ],
    bullets: [
      'Avoid blocking the event loop with synchronous CPU or I O work.',
      'Measure middleware cost, database latency, and downstream service behavior.',
      'Treat caching and batching as architectural performance tools.',
      'Tune process count and infrastructure based on real traffic characteristics.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Express is widely used for REST APIs, backend-for-frontend layers, internal tools, admin backends, SSR support servers, service gateways, integration layers, and general Node web services. It is especially common where JavaScript or TypeScript consistency across frontend and backend matters.',
      'Its enduring popularity comes from being easy to start, easy to understand, and compatible with a very large package ecosystem.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Express',
    paragraphs: [
      'Express is a weaker fit when the team wants stronger framework conventions for modules, dependency injection, validation, and application structure, or when the application would benefit from a more opinionated enterprise backend platform.',
      'It can also be a weak fit when the organization repeatedly produces unstructured Node services and needs the framework to enforce more discipline than Express aims to provide.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Express mistakes include giant route files, confusing middleware order, missing error propagation in async handlers, inconsistent validation, putting database logic directly into route handlers, and assuming a package stack equals architecture.',
      'Another recurring issue is uncontrolled mutation of request objects and ad hoc conventions for auth, validation, and service boundaries. Express gives freedom, but ungoverned freedom becomes entropy quickly.',
    ],
    bullets: [
      'Do not treat middleware order as incidental.',
      'Do not let controllers become the entire application.',
      'Do not leave async failures to ad hoc behavior.',
      'Do not add packages faster than you add architecture clarity.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Express Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with NestJS, Express is lighter and much less opinionated. Compared with Fastify, it is often seen as more traditional and more broadly familiar, though not always the strongest default for every performance-sensitive or schema-driven use case. Compared with larger backend frameworks such as Spring Boot or Laravel, Express offers far fewer built-in conventions and subsystem defaults.',
      'The right comparison is whether the team wants a minimal HTTP framework they shape themselves or a broader platform that pushes architectural structure more aggressively.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Express when Node.js is the right runtime, the team wants direct control over HTTP composition, and the organization is willing to define consistent architectural patterns above the framework. Choose something more opinionated when the project needs stronger default guidance or integrated backend conventions.',
      'The best Express decisions happen when flexibility is genuinely useful and the team has the engineering discipline to use it well.',
    ],
    bullets: [
      'Need lightweight Node HTTP composition: strong Express signal.',
      'Need freedom to choose libraries and patterns: strong Express signal.',
      'Need strong built-in backend conventions: weaker Express signal.',
      'Need simple routing and middleware without heavy framework ceremony: strong Express signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-app',
    title: 'Basic Express Application',
    description: [
      'A minimal Express application creates an app, registers a route, and starts listening on a port. This is the foundation that larger services build on.',
      'The important idea is that request handling remains explicit and close to the Node runtime model.',
    ],
    code: `const express = require("express")

const app = express()

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(3000)`,
    notes: [
      'Even the smallest app already follows the middleware and routing model.',
      'Directness is one of Expresss biggest strengths.',
    ],
  },
  {
    id: 'examples-router',
    title: 'Router-Based Modularization',
    description: [
      'Routers let teams group related endpoints and mount them under a shared path prefix. This keeps larger services from collapsing into one giant server file.',
      'Routers organize transport concerns while leaving deeper architecture to the application.',
    ],
    code: `const express = require("express")

const ordersRouter = express.Router()

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await orderService.findOne(req.params.id)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

app.use("/orders", ordersRouter)`,
    notes: [
      'Routers help with organization, but they are not the full architecture.',
      'Async route handlers should still forward failures consistently.',
    ],
  },
  {
    id: 'examples-middleware',
    title: 'Middleware for Auth and Request Flow',
    description: [
      'Middleware can enforce preconditions before a request reaches a route. This is how many Express apps implement logging, authentication, tracing, and request-scoped context.',
      'The key design point is that middleware either completes the response or calls next() to continue the chain.',
    ],
    code: `function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "unauthorized" })
  }

  next()
}

app.get("/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email })
})`,
    notes: [
      'Middleware ordering determines whether req.user exists when a route runs.',
      'Cross-cutting concerns should remain consistent across the app.',
    ],
  },
  {
    id: 'examples-validation',
    title: 'Request Validation Before Controller Logic',
    description: [
      'Express does not validate input automatically, so teams usually validate at the route boundary before calling deeper business logic.',
      'This keeps bad data from leaking into the service layer and makes failures more predictable.',
    ],
    code: `app.post("/users", async (req, res, next) => {
  try {
    const payload = createUserSchema.parse(req.body)
    const user = await userService.create(payload)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})`,
    notes: [
      'Validation belongs at the boundary, not scattered throughout service code.',
      'Schema libraries are usually chosen separately from the framework.',
    ],
  },
  {
    id: 'examples-error-handler',
    title: 'Central Error Handler',
    description: [
      'Express uses a dedicated error-handling middleware to standardize failure responses. This keeps routes and middleware focused on normal control flow.',
      'A centralized handler is important for production-grade observability and consistent client behavior.',
    ],
    code: `app.use((error, req, res, next) => {
  logger.error(error)

  if (error.name === "ZodError") {
    return res.status(400).json({ error: "validation_failed" })
  }

  res.status(500).json({ error: "internal_server_error" })
})`,
    notes: [
      'Error handlers should be installed after routes and middleware.',
      'Operational errors and validation errors should usually be shaped differently.',
    ],
  },
  {
    id: 'examples-supertest',
    title: 'Testing with Supertest',
    description: [
      'Express routes are often tested with Supertest so the application can be exercised through HTTP-style assertions without a separate deployed server.',
      'This helps verify status codes, payloads, headers, and error behavior from the transport layer outward.',
    ],
    code: `const request = require("supertest")

test("GET /health returns ok", async () => {
  const response = await request(app).get("/health")

  expect(response.statusCode).toBe(200)
  expect(response.body).toEqual({ status: "ok" })
})`,
    notes: [
      'HTTP-level tests are useful for routes, middleware, and error shaping.',
      'Keep test scope aligned with the layer you want to validate.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Express Terms',
    terms: [
      {
        term: 'Express Application',
        definition:
          'The main app instance created by express() that registers routes, middleware, and configuration.',
      },
      {
        term: 'Middleware',
        definition:
          'A function that can inspect a request, modify request or response state, end the response, or pass control with next().',
      },
      {
        term: 'Router',
        definition:
          'A modular grouping of routes and middleware that can be mounted under a path prefix.',
      },
      {
        term: 'req',
        definition:
          'The request object used to access params, query values, headers, body data, and request-scoped properties.',
      },
      {
        term: 'res',
        definition:
          'The response object used to send status codes, JSON, text, redirects, files, and headers.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'next',
        definition:
          'The callback used to pass control to the next middleware or error handler in the chain.',
      },
      {
        term: 'Error-Handling Middleware',
        definition:
          'A middleware function with four arguments used to convert failures into HTTP responses.',
      },
      {
        term: 'Body Parser',
        definition:
          'Middleware that parses request bodies, commonly JSON or URL-encoded payloads, before route handlers use them.',
      },
      {
        term: 'Mount Path',
        definition:
          'The URL prefix under which a router or middleware stack is attached to the application.',
      },
      {
        term: 'Route Parameters',
        definition:
          'Dynamic path segments such as :id that are extracted into req.params during request handling.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'Node Event Loop',
        definition:
          'The core Node.js runtime mechanism that schedules asynchronous callbacks and can be harmed by blocking work.',
      },
      {
        term: 'Supertest',
        definition:
          'A popular library for making HTTP-style assertions against Express apps in tests.',
      },
      {
        term: 'Helmet',
        definition:
          'A common middleware package used to add safer default HTTP headers to Express applications.',
      },
      {
        term: 'Prisma',
        definition: 'A popular Node ORM and query toolkit often used with Express applications.',
      },
      {
        term: 'Graceful Shutdown',
        definition:
          'The practice of stopping an Express process cleanly while draining requests and releasing resources.',
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
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="postgres-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

export default function ExpressJsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Express.js',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Express.js"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Express.js</h1>
      <p className="postgres-help-doc-subtitle">
        Node.js backend framework reference covering middleware, routing, request flow, async error
        handling, deployment, and tradeoffs.
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
