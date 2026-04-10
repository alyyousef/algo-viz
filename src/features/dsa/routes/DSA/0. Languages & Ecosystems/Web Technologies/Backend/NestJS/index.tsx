import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What NestJS is',
    body: 'NestJS is an opinionated backend framework for Node.js, usually used with TypeScript, that structures applications around modules, controllers, providers, decorators, and dependency injection. It can run on top of Express or Fastify and aims to bring a more application-platform style to the JavaScript and TypeScript backend ecosystem.',
  },
  {
    title: 'Why NestJS matters',
    body: 'NestJS matters because it gave Node teams a more structured alternative to minimalist frameworks. It became especially appealing to teams that wanted strong conventions, dependency injection, testing-friendly design, and a framework that scales with larger codebases more comfortably than ad hoc route-and-middleware assembly.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that NestJS is a platform layer over the Node HTTP ecosystem. Instead of centering raw middleware and route handlers, it centers modules, injectable services, decorated controllers, and lifecycle-aware framework abstractions. It is closer in spirit to frameworks such as Angular, Spring Boot, or ASP.NET Core than to bare Express.',
  },
  {
    title: 'Where it fits best',
    body: 'NestJS fits best for medium to large TypeScript services, internal platforms, APIs with multiple integrations, backend teams that value strong conventions, and organizations that want a more standardized architecture for Node applications rather than each service inventing its own style.',
  },
]

const whyItMatters = [
  'It brought stronger architecture and dependency-injection patterns into mainstream Node and TypeScript backend work.',
  'It gives teams a consistent module and provider model for growing codebases.',
  'It supports multiple transports and patterns beyond ordinary REST controllers.',
  'It improved the experience of testing and organizing larger Node services.',
  'It remains a common choice when teams want more framework structure than Express or Fastify alone provide.',
]

const historicalContext = [
  {
    title: 'NestJS emerged after early Node minimalism',
    detail:
      'Many early Node backends were built with lightweight frameworks such as Express, where architecture was largely owned by the application. As codebases grew, teams increasingly wanted stronger conventions and more reusable structure. NestJS arrived as one of the prominent answers to that demand.',
  },
  {
    title: 'TypeScript adoption changed expectations',
    detail:
      'As TypeScript became common in backend development, developers began wanting frameworks that made stronger use of decorators, types, classes, and dependency injection. NestJS leaned into that shift and offered a more framework-driven architecture built around those ideas.',
  },
  {
    title: 'It borrowed from established framework patterns',
    detail:
      'NestJS did not invent module-oriented backend architecture from nothing. It drew inspiration from Angular and from class-based, injection-driven server frameworks in other ecosystems. That made it feel familiar to teams coming from more opinionated enterprise or frontend frameworks.',
  },
  {
    title: 'It broadened beyond HTTP',
    detail:
      'NestJS became more than a REST framework. It added GraphQL support, WebSockets, microservice transports, and other patterns, which helped position it as an application platform rather than only as an HTTP router.',
  },
]

const bigPictureThemes = [
  {
    title: 'Architecture is a first-class framework concern',
    body: 'NestJS is not trying to stay small at all costs. It is deliberately trying to give teams a framework-shaped architecture for services. This often reduces inconsistency across codebases, but it also means adopting more framework concepts up front.',
  },
  {
    title: 'Dependency injection is central to the model',
    body: 'Modules and providers are not side features. They are central to how NestJS expects applications to be built. Teams that understand the injection graph, provider scopes, and module boundaries tend to use the framework effectively; teams that do not often experience it as overcomplicated ceremony.',
  },
  {
    title: 'Decorators express framework intent',
    body: 'Controllers, routes, guards, pipes, interceptors, and modules are often declared through decorators. This makes code concise and framework-aware, but it also means behavior is sometimes expressed indirectly through metadata rather than only through ordinary function calls.',
  },
  {
    title: 'Conventions trade some flexibility for maintainability',
    body: 'NestJS usually shines when teams want consistency across many files, modules, and services. The price is that a very small service may feel more ceremonial than a thin framework, but larger teams often accept that tradeoff for clearer long-term structure.',
  },
]

const keyTakeaways = [
  'NestJS is an opinionated Node and TypeScript backend framework centered on modules, providers, controllers, and dependency injection.',
  'Its main value is architectural consistency rather than minimal ceremony.',
  'It is often a strong fit for larger teams and longer-lived services.',
  'It can support REST, GraphQL, WebSockets, and microservice transports under one framework model.',
  'It works best when teams embrace its conventions deliberately instead of treating it like decorated Express.',
]

const topicSignals = [
  {
    title: 'Choose NestJS when structure and consistency are priorities',
    body: 'If the team wants a standardized way to organize controllers, services, modules, validation, auth, and testing across many services, NestJS is a strong candidate.',
  },
  {
    title: 'Choose NestJS when TypeScript is central to the team',
    body: 'NestJS is particularly attractive to teams that already use TypeScript heavily and want framework features that take advantage of decorators, classes, and typed service patterns.',
  },
  {
    title: 'Choose NestJS when the service model may expand',
    body: 'If the application may grow from simple HTTP endpoints into background processing, GraphQL, event-driven flows, or multi-transport communication, NestJS offers a broader platform than thin router frameworks.',
  },
  {
    title: 'Avoid using NestJS only because it feels enterprise',
    body: 'A very small service may not need the module and provider ceremony. NestJS should be chosen because the team benefits from its architectural model, not because more abstraction automatically means better engineering.',
  },
]

const coreFoundations = [
  {
    title: 'Modules as architectural boundaries',
    body: 'NestJS groups related providers and controllers into modules. This is one of the key ways the framework encourages feature or domain organization. Clear module boundaries are essential if the codebase is going to stay understandable as it grows.',
  },
  {
    title: 'Controllers and routes',
    body: 'HTTP endpoints are usually defined in controllers through method decorators that map to routes. This keeps route declarations consistent, but it also means the developer needs to understand how metadata and decorators shape runtime behavior.',
  },
  {
    title: 'Providers and dependency injection',
    body: 'Services, repositories, gateways, and other injectable components are modeled as providers that the container can resolve. This supports testability and modularity when provider responsibilities stay focused and when modules expose only what other modules really need.',
  },
  {
    title: 'Pipes, guards, and interceptors',
    body: 'NestJS has dedicated abstractions for input transformation and validation, authorization checks, and request or response wrapping behavior. These abstractions can make cross-cutting concerns cleaner than ordinary middleware in some cases, but they also add conceptual surface area.',
  },
  {
    title: 'Underlying platform adapters',
    body: 'Although NestJS has its own framework layer, it still runs on HTTP adapters such as Express or Fastify underneath. Understanding that separation helps teams reason about what belongs to NestJS itself and what belongs to the underlying server platform.',
  },
]

const frameworkFeatures = [
  {
    title: 'Strong module and provider organization',
    body: "NestJS gives teams a stable way to organize code around modules and injected services instead of loose folders and ad hoc wiring. That consistency is one of the framework's main advantages in larger applications.",
  },
  {
    title: 'Built-in support for validation and request shaping',
    body: 'DTOs, pipes, class-based validation patterns, and transformation support make it easier to standardize request boundaries. This helps teams avoid repeating manual parsing and validation logic throughout controllers.',
  },
  {
    title: 'Framework support for multiple transports',
    body: 'NestJS can support REST APIs, GraphQL, WebSockets, and microservice transports under one conceptual framework. This matters for teams whose applications extend beyond simple HTTP controllers.',
  },
  {
    title: 'Testing-friendly architecture',
    body: 'Because providers are injectable and modules can be instantiated in controlled ways, NestJS often makes it easier to write unit and integration tests around framework-managed code than thinner frameworks do by default.',
  },
  {
    title: 'CLI and ecosystem conventions',
    body: 'The Nest CLI, standardized file structure, and common patterns for modules, services, and controllers reduce setup friction and encourage consistency across projects and teams.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Node runtime behavior still matters',
    body: 'NestJS adds architecture and abstractions, but it still runs on Node. Event-loop behavior, async handling, backpressure, timeouts, shutdown hooks, and process supervision remain real operational concerns no matter how structured the framework is.',
  },
  {
    title: 'Framework abstraction does not remove performance analysis',
    body: 'NestJS can be efficient enough for many workloads, but the framework layer is only part of service behavior. Database access, serialization cost, validation, downstream requests, and cache design often dominate runtime performance.',
  },
  {
    title: 'Cross-cutting policy should remain visible',
    body: 'Because NestJS offers middleware, guards, pipes, filters, and interceptors, teams can spread request behavior across many abstractions. That can be powerful, but only if the resulting execution path remains understandable to maintainers.',
  },
  {
    title: 'Operational maturity still needs explicit design',
    body: 'Logging, tracing, metrics, retries, background task policy, graceful shutdown, config management, and secret handling still need concrete engineering decisions. NestJS supplies structure, not automatic production excellence.',
  },
]

const ecosystemUses = [
  {
    title: 'Team-standardized TypeScript services',
    body: 'NestJS is often used where organizations want a common architecture for Node services so that controllers, services, DTOs, validation, and auth patterns look familiar across multiple repositories.',
  },
  {
    title: 'Business APIs with many integrations',
    body: 'Applications that combine external APIs, internal modules, background workflows, auth layers, and validation pipelines often benefit from NestJS because structure becomes more important as the number of moving parts increases.',
  },
  {
    title: 'GraphQL and multi-transport systems',
    body: 'NestJS is attractive for teams that expect to combine HTTP APIs with GraphQL resolvers, WebSockets, or message-based transports while still keeping one overarching framework model.',
  },
  {
    title: 'Enterprise-style Node adoption',
    body: 'Teams coming from enterprise frameworks in other ecosystems often find NestJS easier to adopt because it speaks in terms of modules, DI, decorators, and predictable framework roles instead of raw middleware composition alone.',
  },
]

const comparisons = [
  {
    title: 'NestJS versus Express.js',
    body: 'Express.js is far thinner and leaves far more architectural decisions to the application. NestJS layers a full module and provider architecture on top of the Node ecosystem. The tradeoff is flexibility and low ceremony versus strong conventions and framework-guided structure.',
  },
  {
    title: 'NestJS versus Fastify',
    body: 'Fastify usually emphasizes performance-oriented HTTP structure and a schema-centric plugin model, while NestJS emphasizes broader application architecture and framework abstractions. NestJS can even run on Fastify through an adapter when teams want both sets of tradeoffs.',
  },
  {
    title: 'NestJS versus ASP.NET Core or Spring Boot',
    body: 'NestJS resembles these frameworks more than minimalist Node frameworks do in its emphasis on DI, structured controllers, and broad application design. It is not identical in runtime or ecosystem depth, but the architectural posture is closer.',
  },
  {
    title: 'NestJS versus raw TypeScript architecture',
    body: 'A team can build structured Node services without NestJS, but then it must define and enforce that architecture itself. NestJS is attractive when the team wants the framework to supply much of that baseline structure.',
  },
]

const failureModes = [
  {
    title: 'Treating NestJS as decorated Express',
    body: 'Teams sometimes use NestJS only as a route-decorator layer while ignoring modules, provider boundaries, and injection discipline. This keeps the ceremony but loses much of the architectural benefit.',
  },
  {
    title: 'Overusing framework abstractions without clarity',
    body: 'Pipes, guards, interceptors, middleware, filters, and decorators can each be useful, but spreading logic across too many of them can make request flow difficult to follow. Abstraction should improve clarity, not hide behavior.',
  },
  {
    title: 'Bloated providers and weak module boundaries',
    body: 'If providers become catch-all service classes or modules export too much, the injection graph becomes messy and the architecture loses the clarity NestJS is supposed to create.',
  },
  {
    title: 'Confusing DTOs, entities, and domain models',
    body: 'A frequent mistake is collapsing transport-layer DTOs, persistence entities, and business-level domain objects into one type. NestJS does not prevent that automatically; the team still needs clean boundaries.',
  },
  {
    title: 'Choosing the framework for prestige rather than fit',
    body: 'NestJS can be valuable, but not every service needs its full architecture. If a team adopts it for a tiny service with no real structural pressure, the framework may add more ceremony than value.',
  },
]

const studyChecklist = [
  'Understand modules, providers, and controller roles clearly before scaling a codebase.',
  'Use dependency injection to support clear boundaries, not to hide broad service objects everywhere.',
  'Choose where to use guards, pipes, interceptors, and middleware intentionally.',
  'Keep DTOs, persistence models, and domain concepts separate when boundaries matter.',
  'Remember that NestJS still runs on Node and inherits real runtime and operational constraints.',
  'Adopt the framework because its structure helps the team, not because ceremony alone feels more professional.',
]

const examples = [
  {
    id: 'nest98-example-controller',
    title: 'Example: Controller and service pair',
    area: 'Architecture',
    intro:
      'A typical NestJS endpoint is defined in a controller, while business logic lives in an injected service. This keeps the HTTP surface separate from deeper application behavior.',
    whyFit:
      'This captures the core controller-provider structure that distinguishes NestJS from thinner frameworks.',
    code: `@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }
}`,
    takeaway:
      'NestJS is easiest to reason about when controllers stay thin and providers own the actual application logic.',
  },
  {
    id: 'nest98-example-module',
    title: 'Example: Feature module',
    area: 'Modules',
    intro:
      'Modules define which controllers and providers belong together and what should be visible to the rest of the application. They are the main structural unit for organizing larger NestJS codebases.',
    whyFit: "This demonstrates the framework's preferred unit of architectural grouping.",
    code: `@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}`,
    takeaway:
      'Clear module boundaries are one of the main reasons NestJS scales better than ad hoc route assembly in larger projects.',
  },
  {
    id: 'nest98-example-validation',
    title: 'Example: DTO validation with a pipe',
    area: 'Validation',
    intro:
      'NestJS often validates incoming requests through DTO classes and validation pipes so request-shape checks happen near the transport boundary.',
    whyFit:
      'This shows how the framework standardizes request validation without scattering manual checks through controllers.',
    code: `export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  name!: string
}

@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto)
}`,
    takeaway:
      'Validation is cleaner when transport contracts are explicit instead of being rebuilt in each handler.',
  },
  {
    id: 'nest98-example-guard',
    title: 'Example: Guard for authorization policy',
    area: 'Cross-Cutting Policy',
    intro:
      'Guards let NestJS express authorization or access checks as a dedicated framework abstraction rather than as ad hoc code inside every controller method.',
    whyFit:
      'This reflects how NestJS often separates route policy from business logic more explicitly than thinner frameworks do.',
    code: `@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    return request.user?.role === 'admin'
  }
}`,
    takeaway:
      'Specialized framework abstractions help when they keep policy centralized and understandable, not when they scatter logic across too many layers.',
  },
  {
    id: 'nest98-example-interceptor',
    title: 'Example: Interceptor for response shaping',
    area: 'Interceptors',
    intro:
      'Interceptors can wrap controller execution to handle logging, transformation, timing, or response shaping in a reusable way.',
    whyFit: 'This shows both the power and the extra abstraction surface of the NestJS model.',
    code: `@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const started = Date.now()
    return next.handle().pipe(
      tap(() => console.log('duration_ms', Date.now() - started)),
    )
  }
}`,
    takeaway:
      'Interceptors are useful when they centralize cross-cutting behavior cleanly, but teams should keep the resulting execution path comprehensible.',
  },
]

const glossary = [
  {
    term: 'NestJS',
    definition:
      'An opinionated Node and TypeScript backend framework built around modules, controllers, providers, and dependency injection.',
  },
  {
    term: 'Module',
    definition:
      'A NestJS unit of organization that groups related controllers and providers and defines what is exported.',
  },
  {
    term: 'Provider',
    definition:
      'An injectable class or value managed by the NestJS dependency-injection container.',
  },
  {
    term: 'Controller',
    definition: 'A class whose methods handle incoming transport requests such as HTTP routes.',
  },
  {
    term: 'DTO',
    definition: 'A data transfer object used to model transport-layer request or response shapes.',
  },
  {
    term: 'Pipe',
    definition: 'A NestJS abstraction for validation, parsing, or transformation of incoming data.',
  },
  {
    term: 'Guard',
    definition:
      'A framework abstraction used to determine whether a request is allowed to proceed.',
  },
  {
    term: 'Interceptor',
    definition:
      'A wrapper around handler execution used for cross-cutting behavior such as logging or response transformation.',
  },
  {
    term: 'Decorator',
    definition: 'Metadata syntax used heavily by NestJS to declare framework roles and behavior.',
  },
  {
    term: 'Adapter',
    definition:
      'The integration layer that lets NestJS run on an underlying platform such as Express or Fastify.',
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
    { id: 'nest98-overview', label: 'Overview' },
    { id: 'nest98-why', label: 'Why It Matters' },
    { id: 'nest98-history', label: 'Historical Context' },
    { id: 'nest98-themes', label: 'Big Picture Themes' },
    { id: 'nest98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'nest98-signals', label: 'Topic Signals' },
    { id: 'nest98-foundations', label: 'Foundations' },
    { id: 'nest98-features', label: 'Framework Features' },
    { id: 'nest98-runtime', label: 'Runtime and Operations' },
    { id: 'nest98-uses', label: 'Ecosystem Uses' },
    { id: 'nest98-compare', label: 'Compare and Contrast' },
    { id: 'nest98-failures', label: 'Failure Modes' },
    { id: 'nest98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'nest98-glossary', label: 'Terms' }],
}

export default function NestJsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'NestJS (Backend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="NestJS (Backend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">NestJS (Backend)</h1>
      <p className="nest98-intro">
        This page is a backend-focused overview of NestJS as an opinionated Node and TypeScript
        framework. It explains NestJS modules, controllers, providers, dependency injection, request
        lifecycle abstractions, transport flexibility, operational tradeoffs, and the architectural
        discipline needed to keep NestJS services clear as they grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="nest98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nest98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="nest98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nest98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nest98-takeaways" className="bin98-section">
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
          <section id="nest98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nest98-checklist" className="bin98-section">
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
        <section id="nest98-glossary" className="bin98-section">
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
