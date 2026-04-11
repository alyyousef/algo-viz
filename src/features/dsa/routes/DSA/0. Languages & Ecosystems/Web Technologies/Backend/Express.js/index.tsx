import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Express.js is',
    body: 'Express.js is a minimalist web framework built on top of Node.js. It provides routing, middleware composition, request and response helpers, and an intentionally thin abstraction over HTTP. Its design philosophy is to supply a small stable core and let teams assemble the rest of the backend stack from surrounding libraries and conventions.',
  },
  {
    title: 'Why Express matters',
    body: 'Express matters because it became one of the defining frameworks of the Node backend ecosystem. It shaped how JavaScript developers think about server-side routing, middleware, request handling, and incremental framework composition. Even teams that move to other Node frameworks often inherit architectural habits first popularized through Express.',
  },
  {
    title: 'How to think about it',
    body: 'The most useful mental model is that Express is a thin pipeline around the Node HTTP server. Requests enter the app, move through ordered middleware, reach a route handler, and produce a response. The framework offers convenience and composition, but it deliberately avoids imposing a heavy application architecture.',
  },
  {
    title: 'Where it fits best',
    body: 'Express is strongest when teams want flexibility, a low learning curve, and a huge ecosystem of middleware and supporting packages. It fits well for small to medium APIs, internal tools, quick service prototypes, gateway-style backends, and codebases where the team wants to define its own conventions instead of adopting a more opinionated framework.',
  },
]

const whyItMatters = [
  'It is one of the most influential and widely understood Node backend frameworks.',
  'Its middleware model is simple and composable, which makes cross-cutting behavior easy to express.',
  'It lets teams start small without committing to a heavy backend architecture up front.',
  'It integrates naturally with the Node and npm ecosystem.',
  'It remains a common reference point when evaluating newer Node frameworks.',
]

const historicalContext = [
  {
    title: 'Express rose with early Node adoption',
    detail:
      'As Node.js gained traction for backend work, Express provided a simple way to build APIs and HTTP services without working directly at the lower-level Node HTTP module. Its timing made it foundational to the growth of server-side JavaScript.',
  },
  {
    title: 'Middleware became the signature idea',
    detail:
      'The framework popularized the idea that request handling could be assembled from ordered middleware functions responsible for parsing, auth, validation, logging, and error handling. That composition style influenced much of the Node ecosystem that followed.',
  },
  {
    title: 'The ecosystem grew around its thin core',
    detail:
      'Because Express stayed deliberately small, the community filled in surrounding concerns through body parsers, validation layers, session middleware, auth strategies, ORMs, templating systems, and API utilities. That flexibility became one of its defining strengths and weaknesses.',
  },
  {
    title: 'Newer frameworks changed expectations',
    detail:
      'Over time, frameworks such as Fastify and NestJS offered stronger performance claims, richer type stories, or more opinionated architecture. Express remained relevant because of familiarity, simplicity, and ecosystem reach rather than because it tried to win every benchmark or design trend.',
  },
]

const bigPictureThemes = [
  {
    title: 'Minimal core, maximal freedom',
    body: 'Express gives teams a lot of room to decide structure for themselves. This is attractive when flexibility is needed, but it also means architecture quality depends more heavily on team discipline because the framework does not enforce strong boundaries for you.',
  },
  {
    title: 'Middleware is the central abstraction',
    body: 'Request handling in Express is best understood as a chain of functions. Logging, auth, body parsing, validation, tracing, rate limiting, and route handlers all become stages in that chain. If a team understands middleware order and responsibility, the framework becomes much easier to reason about.',
  },
  {
    title: 'Express is a framework for assembly, not a full platform',
    body: 'Unlike more vertically integrated platforms, Express does not try to solve every backend concern itself. That is both a strength and a tradeoff. It stays lightweight, but teams must choose and maintain more of the surrounding stack on their own.',
  },
  {
    title: 'Operational discipline still matters',
    body: 'Because Express is so easy to start with, teams can underestimate production concerns. Error handling, structured logging, graceful shutdown, validation, async boundaries, request timeouts, observability, and security policy still need deliberate engineering.',
  },
]

const keyTakeaways = [
  'Express is a minimalist HTTP framework built around middleware composition.',
  'Its greatest strengths are simplicity, flexibility, and ecosystem familiarity.',
  'Its greatest weakness is that unstructured teams can build messy applications quickly.',
  'It is often a strong fit for lightweight services and teams that prefer assembling their own backend stack.',
  'Good Express engineering depends more on architectural discipline than on framework enforcement.',
]

const topicSignals = [
  {
    title: 'Choose Express when flexibility is the priority',
    body: 'If the team wants a lightweight framework and prefers assembling its own router, validation, auth, and persistence story rather than inheriting a strongly opinionated backend architecture, Express is a natural candidate.',
  },
  {
    title: 'Choose Express when the HTTP layer is simple',
    body: 'If the application is mainly a thin API, gateway, or internal service where routing and middleware are the main concerns, Express often feels natural and fast to work with.',
  },
  {
    title: 'Choose Express when the team already understands Node deeply',
    body: 'Teams comfortable with Node, npm, async JavaScript, and middleware-driven architecture can use Express effectively without needing a framework to impose much ceremony on them.',
  },
  {
    title: 'Avoid assuming Express will impose good structure automatically',
    body: 'If the team needs strong conventions, dependency injection, codebase-level architecture defaults, or framework-driven module boundaries, a more opinionated framework may be easier to keep consistent at scale.',
  },
]

const coreFoundations = [
  {
    title: 'Node HTTP underneath',
    body: "Express is built on top of the Node HTTP server model. The framework does not replace Node's runtime behavior. It wraps the lower-level request and response objects with convenience methods and middleware flow while still depending on Node's event loop and async execution model.",
  },
  {
    title: 'Middleware pipeline',
    body: 'Middleware is the key idea. Each middleware function can inspect the request, modify context, terminate the response, or pass control to the next step. This makes cross-cutting concerns straightforward, but it also makes ordering extremely important.',
  },
  {
    title: 'Routing and handlers',
    body: 'Express maps HTTP methods and paths to handler functions. Handlers can be attached directly to routes or layered with route-local middleware. In practice, route organization becomes one of the central architecture decisions in Express applications.',
  },
  {
    title: 'Request and response helpers',
    body: 'The framework adds common conveniences such as JSON responses, parameter parsing, status helpers, and cleaner access to route params or body data. These are small features individually, but together they make raw Node HTTP development much less repetitive.',
  },
  {
    title: 'Application assembly through packages',
    body: "Express applications usually rely on a surrounding package set for validation, auth, sessions, rate limiting, file upload, ORM access, schema parsing, or API documentation. This is normal in the ecosystem and part of the framework's design philosophy.",
  },
]

const frameworkFeatures = [
  {
    title: 'Router-based modularity',
    body: 'Express routers let teams split route trees into feature-focused modules. This is one of the main ways larger services prevent the application entrypoint from collapsing into one giant file.',
  },
  {
    title: 'Middleware-driven cross-cutting behavior',
    body: 'Auth, tracing, parsing, CORS, compression, request IDs, logging, and error handling all fit naturally into middleware. This makes the framework especially intuitive for HTTP-specific concerns.',
  },
  {
    title: 'Compatibility with TypeScript and modern tooling',
    body: 'Although Express began in a mostly JavaScript-first world, it is commonly used today with TypeScript, schema validation libraries, testing tools, and modern bundling or runtime workflows. That helps teams keep the framework while modernizing the surrounding engineering model.',
  },
  {
    title: 'Small abstraction surface',
    body: 'The framework does not attempt to model everything as decorators, modules, or a full container-based architecture. That can make it easier to understand at a glance, but it also means teams must decide many conventions themselves.',
  },
  {
    title: 'Ecosystem gravity',
    body: 'A major reason Express remains important is that countless tutorials, packages, and engineers understand its model. Familiarity reduces onboarding friction and makes it easier to find examples, debugging advice, and integration patterns.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Async boundaries and error handling',
    body: "Express applications run inside Node's async environment, so promise handling, async route wrappers, and centralized error middleware matter. Poor async handling can easily produce swallowed errors or inconsistent responses.",
  },
  {
    title: 'Production hardening is not automatic',
    body: 'A working Express app can be created in minutes, but production readiness takes longer. Timeouts, rate limits, request-size controls, input validation, logging, metrics, structured errors, graceful shutdown, and reverse-proxy awareness still need to be designed deliberately.',
  },
  {
    title: 'Performance depends on simplicity and downstream behavior',
    body: 'Express can be fast enough for many workloads, but raw framework overhead is only part of the story. Database latency, serialization, validation cost, network calls, caching strategy, and blocking CPU work usually dominate real service behavior.',
  },
  {
    title: 'Operational clarity matters at scale',
    body: 'As Express codebases grow, the challenge shifts from "can this route work?" to "can the team reason about how requests move through the system?" Consistent middleware policy, route organization, service boundaries, and observability become essential.',
  },
]

const ecosystemUses = [
  {
    title: 'REST APIs and internal services',
    body: 'Express is widely used for straightforward JSON APIs, internal service layers, admin tooling backends, and gateway-style services where the HTTP boundary is the dominant concern.',
  },
  {
    title: 'Prototypes and startup velocity',
    body: 'Because it has a low cognitive barrier and a large ecosystem, Express is often used when teams want to move quickly from idea to working backend without spending much time on framework ceremony.',
  },
  {
    title: 'Learning and onboarding into Node backends',
    body: 'Express remains one of the most common frameworks through which developers first learn server-side JavaScript. That educational footprint contributes to its continued prevalence in production teams.',
  },
  {
    title: 'Custom backend assembly',
    body: 'Some teams choose Express precisely because they want to define their own architecture and package mix rather than inheriting a more standardized framework stack.',
  },
]

const comparisons = [
  {
    title: 'Express versus Fastify',
    body: 'Fastify usually emphasizes stronger performance defaults, schema-centric design, and more structured plugin behavior. Express emphasizes familiarity, simplicity, and the inertia of its huge ecosystem. The better choice depends on whether the team values ecosystem familiarity or stronger built-in structure and throughput-oriented defaults.',
  },
  {
    title: 'Express versus NestJS',
    body: 'NestJS layers a much more opinionated architecture on top of Node, often using decorators, DI, and module structure. Express stays much closer to raw middleware and route composition. Teams that want low ceremony often prefer Express, while teams that want stronger framework conventions often prefer NestJS.',
  },
  {
    title: 'Express versus ASP.NET Core or Spring Boot',
    body: 'Compared with heavier strongly typed ecosystems, Express offers less built-in structure and lower entry overhead, but also fewer platform-level defaults for DI, configuration, validation, and long-term architectural consistency. It trades platform maturity for flexibility and speed of assembly.',
  },
  {
    title: 'Framework versus runtime confusion',
    body: 'Express is a framework in the Node ecosystem, not the Node runtime itself. Teams sometimes conflate the two and then blame Node for problems that are really architecture or package-selection issues in the Express layer.',
  },
]

const failureModes = [
  {
    title: 'Building a large app with no conventions',
    body: 'Express gives freedom early, but freedom without structure becomes confusion later. Large codebases need explicit patterns for routing, services, validation, errors, and testing or they quickly become difficult to maintain.',
  },
  {
    title: 'Middleware ordering mistakes',
    body: 'Because request behavior is pipeline-driven, incorrect ordering can break parsing, auth, error handling, CORS, or response semantics in subtle ways. Middleware order is a design concern, not a formatting detail.',
  },
  {
    title: 'Weak input validation',
    body: 'The framework does not automatically guarantee safe inputs. Without explicit validation and boundary discipline, route handlers can accumulate fragile assumptions about request shape and user intent.',
  },
  {
    title: 'Unhandled async errors',
    body: 'Async route logic that is not wrapped or forwarded correctly can leak errors past the intended error middleware or create inconsistent response behavior. Modern Express teams need a clear async error strategy.',
  },
  {
    title: 'Mistaking low ceremony for low complexity',
    body: 'Express can make it easy to start coding, but real production concerns still exist. Security, observability, deployment, and downstream failure handling do not disappear just because the initial route file is short.',
  },
]

const studyChecklist = [
  'Understand Express as a middleware pipeline over Node HTTP.',
  'Define project conventions early if the service will grow.',
  'Treat validation, error handling, and observability as first-class concerns.',
  'Use middleware ordering intentionally, not accidentally.',
  'Separate route code from deeper application logic once complexity increases.',
  'Choose Express for flexibility deliberately, not by default habit.',
]

const examples = [
  {
    id: 'exp98-example-basic-route',
    title: 'Example: Basic route handler',
    area: 'Routing',
    intro:
      "The simplest Express application shows the framework's appeal: concise route registration over a familiar HTTP model without much setup ceremony.",
    whyFit: 'This example captures the quick-start simplicity that made Express so widely adopted.',
    code: `import express from 'express';

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(3000);`,
    takeaway:
      'Express feels approachable because the entry path from empty file to working route is extremely short.',
  },
  {
    id: 'exp98-example-middleware',
    title: 'Example: Middleware for cross-cutting logic',
    area: 'Middleware',
    intro:
      'Middleware is where Express expresses policy. Logging, request timing, auth checks, correlation IDs, and validation often belong here rather than inside every route.',
    whyFit: "This example shows the framework's defining composition model.",
    code: `app.use((req, res, next) => {
  req.requestStartedAt = Date.now();
  console.log(req.method, req.path);
  next();
});`,
    takeaway:
      'Understanding middleware is more important than memorizing route syntax, because middleware is how Express applications stay composable.',
  },
  {
    id: 'exp98-example-router',
    title: 'Example: Router-based feature module',
    area: 'Modularity',
    intro:
      'Routers are one of the main tools for preventing route sprawl. They let teams organize HTTP surfaces by feature instead of putting every handler in one application file.',
    whyFit: 'This example reflects the first structural step most real Express codebases need.',
    code: `const ordersRouter = Router();

ordersRouter.get('/:id', getOrderById);
ordersRouter.post('/', createOrder);

app.use('/orders', ordersRouter);`,
    takeaway:
      'Express stays simple longer when route modules and application boundaries are introduced early enough.',
  },
  {
    id: 'exp98-example-error-handler',
    title: 'Example: Centralized error middleware',
    area: 'Error Handling',
    intro:
      'Production services need one place where operational errors become consistent HTTP responses and logs. Express error middleware provides that centralization when used correctly.',
    whyFit:
      'This example shows how lightweight frameworks still need explicit production architecture.',
    code: `app.use((err, req, res, next) => {
  req.log?.error(err);
  res.status(500).json({ error: 'internal_error' });
});`,
    takeaway:
      'Without a clear error path, even simple Express services become operationally hard to debug.',
  },
  {
    id: 'exp98-example-validation',
    title: 'Example: Boundary validation before business logic',
    area: 'Input Safety',
    intro:
      'One of the most common Express mistakes is letting raw request data flow directly into service logic. Validation should happen near the HTTP boundary so deeper code can depend on stable assumptions.',
    whyFit:
      'This example captures the importance of deliberate request discipline in a minimalist framework.',
    code: `app.post('/users', validateCreateUser, async (req, res, next) => {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
});`,
    takeaway:
      'Express stays manageable when HTTP concerns are handled explicitly at the edge instead of being spread throughout the application.',
  },
]

const glossary = [
  {
    term: 'Express.js',
    definition: 'A minimalist Node.js web framework built around routing and middleware.',
  },
  {
    term: 'Middleware',
    definition:
      'A function in the request pipeline that can inspect, modify, terminate, or forward a request.',
  },
  {
    term: 'Route handler',
    definition: 'A function that processes a matched HTTP route and produces a response.',
  },
  {
    term: 'Router',
    definition: 'A modular grouping of routes and middleware in an Express application.',
  },
  {
    term: 'Next function',
    definition: 'The callback used to pass control from one middleware function to the next.',
  },
  {
    term: 'Error middleware',
    definition: 'A special middleware form used to centralize error handling in Express.',
  },
  {
    term: 'Request pipeline',
    definition: 'The ordered chain of middleware and handlers through which a request travels.',
  },
  {
    term: 'Body parser',
    definition: 'Middleware that parses request bodies into usable JavaScript data structures.',
  },
  {
    term: 'Low ceremony',
    definition: 'A style that minimizes framework-imposed structure and boilerplate.',
  },
  {
    term: 'Operational hardening',
    definition: 'The work required to make a service safe, observable, and reliable in production.',
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
    { id: 'exp98-overview', label: 'Overview' },
    { id: 'exp98-why', label: 'Why It Matters' },
    { id: 'exp98-history', label: 'Historical Context' },
    { id: 'exp98-themes', label: 'Big Picture Themes' },
    { id: 'exp98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'exp98-signals', label: 'Topic Signals' },
    { id: 'exp98-foundations', label: 'Foundations' },
    { id: 'exp98-features', label: 'Framework Features' },
    { id: 'exp98-runtime', label: 'Runtime and Operations' },
    { id: 'exp98-uses', label: 'Ecosystem Uses' },
    { id: 'exp98-compare', label: 'Compare and Contrast' },
    { id: 'exp98-failures', label: 'Failure Modes' },
    { id: 'exp98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'exp98-glossary', label: 'Terms' }],
}

export default function ExpressJsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Express.js (Backend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Express.js (Backend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Express.js (Backend)</h1>
      <p className="exp98-intro">
        This page is a backend-focused overview of Express.js as a Node web framework. It explains
        the middleware pipeline, routing model, ecosystem fit, operational tradeoffs, and the
        architectural discipline needed to keep Express applications maintainable as they grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="exp98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exp98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="exp98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exp98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exp98-takeaways" className="bin98-section">
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
          <section id="exp98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exp98-checklist" className="bin98-section">
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
        <section id="exp98-glossary" className="bin98-section">
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
