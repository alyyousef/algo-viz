import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'NestJS is a backend framework for Node.js built with TypeScript and inspired by architectural ideas common in server-side frameworks such as Angular and Spring. It emphasizes modules, dependency injection, decorators, and explicit application structure so teams can build APIs and services with a more organized and scalable shape than a bare minimal HTTP framework usually provides.',
  'The most useful way to think about NestJS is not as a replacement for Express syntax and not simply as a collection of decorators. It is an application architecture framework layered on top of the Node ecosystem. It provides a consistent model for modules, controllers, providers, middleware, validation, authorization, WebSockets, microservices, testing, and deployment, while still allowing access to lower-level Node tooling when needed.',
  'This page is intentionally thorough. It covers the NestJS programming model, module structure, dependency injection, controllers, providers, pipes, guards, interceptors, middleware, exception filters, data access integration, testing, microservices support, operational concerns, common tradeoffs, and practical examples for building real backend services.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'NestJS is a structured server-side framework for TypeScript and JavaScript applications. It usually runs on top of Express or Fastify and provides a strong architectural layer above the raw HTTP server. That layer includes dependency injection, modules, decorators, lifecycle hooks, request processing utilities, and integrations for common backend concerns.',
      'Its main value is not that it makes Node fast or changes the runtime. Its value is that it gives large or growing Node services a coherent application model. This is especially useful for teams that want a more opinionated, maintainable backend structure than plain Express applications often evolve into.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why NestJS Matters',
    paragraphs: [
      'NestJS matters because many Node backends outgrow ad hoc file organization quickly. Teams need dependency injection, clear module boundaries, testing support, common request pipeline hooks, and a standard way to express controllers, services, and cross-cutting behavior. NestJS addresses that need directly.',
      'It is especially appealing to teams that want TypeScript-first backend development and a framework that feels architecturally deliberate rather than minimally assembled from middleware and conventions invented separately on each project.',
    ],
    bullets: [
      'Provides a more structured architecture for Node backends.',
      'Uses TypeScript and decorators to express application intent clearly.',
      'Supports common backend concerns in one coherent framework.',
      'Helps larger teams standardize service structure and patterns.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is an application framework built around modules, providers, and dependency injection. A NestJS app is not just route handlers. It is a graph of framework-managed classes connected through modules and a request lifecycle where pipes, guards, interceptors, filters, and middleware each have a specific responsibility.',
      'That means NestJS architecture is about more than syntax. Engineers need to think about dependency boundaries, request pipeline order, service responsibilities, testing seams, and how framework abstractions map onto the runtime behavior of the application.',
    ],
    bullets: [
      'Think modules and providers, not only handlers and routes.',
      'Think framework-managed request lifecycle, not just middleware chains.',
      'Think architecture and dependency structure as first-class design concerns.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When NestJS Fits Best',
    paragraphs: [
      'NestJS fits best for backend APIs, internal services, microservices, gateway layers, enterprise Node applications, and teams that want a strong convention for application structure. It is especially useful when the backend has enough complexity that dependency injection, clear layering, validation, authorization, and testable composition all matter regularly.',
      'It also fits well when the team is already committed to TypeScript and wants a framework that makes architectural patterns more explicit instead of leaving every project to invent its own structure.',
    ],
    bullets: [
      'TypeScript-first backend services with meaningful architectural complexity.',
      'Teams that want shared conventions across multiple Node applications.',
      'APIs and services needing validation, authorization, and layered composition.',
      'Projects that benefit from testable dependency injection boundaries.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where NestJS Is Not the Best Default',
    paragraphs: [
      'NestJS is not automatically the right answer for tiny services, one-file APIs, or projects where the framework structure would be heavier than the application itself. If the backend is extremely small, a minimal framework may be easier to reason about and move through.',
      'It can also be a weak fit when the team does not want decorator-driven architecture, does not need dependency injection, or prefers a more explicit low-level style. Framework overhead should exist because it solves real problems, not because structure feels sophisticated.',
    ],
    bullets: [
      'Very small services where architecture scaffolding outweighs the need.',
      'Teams that prefer minimal frameworks and direct low-level control.',
      'Projects where dependency injection and module structure are unnecessary overhead.',
      'Cases where the ecosystem already strongly favors a different application model.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'NestJS is most valuable when the application is big enough to benefit from explicit architecture, dependency injection, and consistent backend patterns. It gives Node teams a more organized way to build serious services without abandoning the wider JavaScript ecosystem.',
      'Its strength is not minimalism. Its strength is turning common backend concerns into a repeatable framework model that teams can scale operationally and organizationally.',
    ],
    bullets: [
      'Choose NestJS when structure and consistency are genuine advantages.',
      'Treat the framework lifecycle and DI model as core concepts, not decoration.',
      'Use the architecture to clarify service boundaries rather than hiding complexity behind annotations.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What NestJS Actually Is',
    paragraphs: [
      'NestJS is an application framework for Node.js that layers architectural structure on top of HTTP platforms such as Express or Fastify. It provides a strongly organized model for modules, controllers, services, configuration, request processing, and framework integration for common backend concerns.',
      'This matters because the framework is more than a set of decorators. It is a way of composing a backend application so large features and cross-cutting concerns remain understandable as the codebase grows.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules and Application Organization',
    paragraphs: [
      'Modules are one of NestJSs central concepts. A module groups related controllers, providers, and imports into a coherent feature or infrastructure boundary. This gives the application a map of how functionality is organized and how dependencies are exposed between areas.',
      'Good module design improves maintainability because it makes feature boundaries explicit. Weak module design leads to tangled dependencies and services that feel global even when they should not.',
    ],
  },
  {
    id: 'core-providers',
    title: 'Providers and Dependency Injection',
    paragraphs: [
      'Providers are the injectable building blocks of a NestJS application. Services, repositories, factories, and many infrastructure objects are registered as providers and then resolved by the dependency injection container where needed.',
      'The framework-managed container is useful because it makes dependencies explicit, testable, and replaceable. The architectural tradeoff is that teams need to understand the provider graph and lifetime model instead of treating object construction as incidental.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Controllers and Route Handling',
    paragraphs: [
      'Controllers define request endpoints and organize route handling. Decorators specify routes, parameters, and request metadata, while controller methods coordinate application behavior by delegating to providers and domain services.',
      'In strong NestJS applications, controllers stay focused on transport concerns. Business logic should live in services or other providers so it can be reused and tested without the HTTP layer attached to every decision.',
    ],
  },
  {
    id: 'core-decorators',
    title: 'Decorators and Metadata',
    paragraphs: [
      'NestJS uses decorators heavily to express how classes and methods should behave within the framework. Decorators declare modules, controllers, injectable providers, routes, guards, interceptors, pipes, and parameter extraction logic.',
      'This style can be concise and expressive, but it requires discipline. Teams should understand what metadata the framework is consuming rather than treating decorators as magic labels with hidden semantics.',
    ],
  },
  {
    id: 'core-request-lifecycle',
    title: 'Request Lifecycle',
    paragraphs: [
      'A NestJS request may pass through middleware, guards, interceptors, pipes, and exception filters before and after controller execution. Each layer has a distinct purpose: middleware for broad request concerns, guards for authorization, pipes for transformation and validation, interceptors for wrapping behavior, and filters for error handling.',
      'Understanding this lifecycle is essential because it determines where cross-cutting logic belongs. The framework is most maintainable when each concern lives in the layer designed for it rather than being repeated ad hoc inside controllers.',
    ],
  },
  {
    id: 'core-pipes',
    title: 'Pipes and Validation',
    paragraphs: [
      'Pipes transform and validate incoming data before it reaches the controller method. They are often used with DTOs and class-based validation to ensure request input becomes typed, constrained application data at the boundary.',
      'This is valuable because the system boundary is one of the best places to reject invalid state. Strong input shaping makes the rest of the service simpler and safer.',
    ],
  },
  {
    id: 'core-guards',
    title: 'Guards and Authorization Flow',
    paragraphs: [
      'Guards determine whether a request is allowed to proceed. They are commonly used for authentication, role checks, and other authorization decisions that must happen before controller logic executes.',
      'The main design benefit is separation. Authorization rules do not need to be hand-written inside every controller method if they belong to a reusable framework-level mechanism.',
    ],
  },
  {
    id: 'core-interceptors',
    title: 'Interceptors and Cross-Cutting Behavior',
    paragraphs: [
      'Interceptors wrap method execution and can be used for logging, response transformation, timing, caching hooks, and other cross-cutting behavior. They provide a clean way to extend request handling without bloating controller logic.',
      'The key is to keep them purposeful. Interceptors are strong for shared mechanics, not as a place to hide arbitrary business logic.',
    ],
  },
  {
    id: 'core-filters',
    title: 'Exception Filters and Error Handling',
    paragraphs: [
      'Exception filters let NestJS applications centralize error translation and response formatting. This is useful because APIs need consistent failure behavior rather than ad hoc exception handling in every endpoint.',
      'A strong error strategy usually combines domain exceptions, framework filters, and clear response contracts so production failures remain understandable to both clients and operators.',
    ],
  },
  {
    id: 'core-configuration',
    title: 'Configuration and Environment Management',
    paragraphs: [
      'NestJS applications commonly rely on structured configuration modules, environment variables, typed configuration helpers, and bootstrapping logic that changes by environment. This allows one codebase to adapt across local development, test, staging, and production.',
      'Good configuration design matters because backend services become harder to operate when settings are scattered, untyped, or hidden in arbitrary files. Configuration should behave like part of the application contract.',
    ],
  },
  {
    id: 'core-data-access',
    title: 'Data Access and ORM Integration',
    paragraphs: [
      'NestJS integrates with common Node data libraries and ORMs such as TypeORM, Prisma, Mongoose, and raw database clients. The framework does not force one persistence model, but it gives teams a structured place to integrate repositories, transactions, and data-facing providers.',
      'The main engineering lesson is that framework structure does not replace database literacy. Query shape, transactions, indexes, and data modeling still matter independently of the NestJS abstractions around them.',
    ],
  },
  {
    id: 'core-microservices',
    title: 'Microservices and Transport Abstractions',
    paragraphs: [
      'NestJS includes patterns for microservice communication over transports such as TCP, Redis, NATS, and other message systems. This can be useful when the organization needs a shared architectural style across HTTP services and service-to-service messaging.',
      'These features are powerful, but they do not eliminate distributed-systems complexity. Contracts, retries, idempotency, tracing, and failure modes still need deliberate design.',
    ],
  },
  {
    id: 'core-websockets',
    title: 'WebSockets and Real-Time Support',
    paragraphs: [
      'NestJS supports WebSocket gateways so real-time features can be integrated within the same overall framework model as HTTP APIs. This is useful for notifications, collaborative features, live dashboards, and bidirectional client communication.',
      'Real-time support should still be designed with careful attention to connection lifecycle, authorization, and scaling behavior rather than treated as just another decorator layer.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'NestJS supports testing through dependency injection, testing modules, and tooling that lets teams instantiate application slices or full applications in a controlled way. This is one of the biggest architectural advantages of the framework because dependency graphs are explicit and can be substituted in tests.',
      'Good test strategy still depends on scope. Not every test should spin up the full application if a provider-level unit test or a smaller integration boundary will prove the behavior more directly.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Runtime Discipline',
    paragraphs: [
      'Healthy NestJS services still need attention to process management, resource usage, latency, logging, health checks, timeouts, connection pools, and dependency upgrades. The framework helps organize the application, but it does not remove the operational work of running a real Node service.',
      'Operational quality often depends more on system design and observability than on controller syntax. Teams should treat framework structure as a tool for maintainability, not as a guarantee of runtime correctness.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'NestJS performance work usually depends on the same fundamentals as other Node backends: efficient I O, careful database access, controlled serialization, appropriate caching, and avoiding unnecessary abstraction or reflection-heavy work in hot paths. Framework structure helps organization, but throughput still depends on real system behavior.',
      'The strongest habit is measurement. Profile requests, inspect queries, understand event-loop pressure, and optimize the actual bottleneck instead of blaming or praising the framework abstractly.',
    ],
    bullets: [
      'Measure real latency and throughput before optimizing framework internals.',
      'Watch database and network behavior as closely as controller behavior.',
      'Use the DI model to improve testability and structure, not to hide complexity.',
      'Keep module and provider boundaries understandable as the application grows.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'NestJS is widely used for REST APIs, GraphQL servers, internal service layers, enterprise Node backends, gateway applications, microservices, and systems where multiple teams benefit from a shared TypeScript-first backend architecture.',
      'Its strongest real-world value is giving larger or longer-lived Node projects a clearer application shape than they might otherwise maintain over time.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use NestJS',
    paragraphs: [
      'NestJS is a weak fit for tiny scripts, extremely small APIs, or teams that strongly prefer a minimal framework with less architectural ceremony. It is also not the best choice if the team dislikes decorator-heavy patterns or does not need the container and module system.',
      'That does not make the framework bad. It means the architectural overhead should be justified by the complexity and lifespan of the application.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common NestJS mistakes include putting too much logic in controllers, building overly tangled provider graphs, relying on decorators without understanding execution order, making global state implicit through poorly designed modules, and assuming ORM abstractions remove the need for database reasoning.',
      'Another recurring issue is framework cargo culting: adopting every abstraction layer regardless of whether the service is large enough to benefit from it.',
    ],
    bullets: [
      'Do not let decorators replace architectural clarity.',
      'Do not hide business rules inside transport-layer classes.',
      'Do not make every module depend on everything else.',
      'Do not confuse organized structure with actual system correctness.',
    ],
  },
  {
    id: 'core-compare',
    title: 'NestJS Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Express, NestJS is more opinionated and much more structured. Compared with Spring Boot or ASP.NET Core, it occupies a similar role in the Node ecosystem by offering dependency injection and a more formal backend architecture model. Compared with lighter TypeScript frameworks, NestJS generally trades simplicity for stronger conventions and broader built-in architecture support.',
      'The meaningful comparison is whether the service benefits from that added structure. If the workload is simple, a minimal framework may be more efficient. If the service is growing and needs a stronger architecture, NestJS can be a good fit.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose NestJS when the backend is serious enough to benefit from modules, dependency injection, validation layers, authorization hooks, and a structured request lifecycle. Choose something smaller when the application is too simple to justify that framework surface area.',
      'The strongest NestJS decisions happen when TypeScript, Node, and architectural consistency are strategic advantages rather than incidental preferences.',
    ],
    bullets: [
      'Need structured TypeScript backend architecture: strong NestJS signal.',
      'Need dependency injection and modular composition: strong NestJS signal.',
      'Need a tiny unopinionated service: weak NestJS signal.',
      'Need shared conventions across many Node services: strong NestJS signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-module',
    title: 'Feature Module',
    description: [
      'Modules are the backbone of NestJS application structure. This example groups a controller and service into one feature boundary.',
      'The point is not just organization. Modules define how capabilities are exposed and composed across the application.',
    ],
    code: `@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}`,
    notes: [
      'Modules should reflect real feature or infrastructure boundaries.',
      'Export only what other modules truly need.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'Controller and Service Pair',
    description: [
      'A typical NestJS controller delegates business behavior to a provider. This keeps HTTP handling and domain logic separated more cleanly.',
      'The controller expresses transport concerns while the service owns the application behavior.',
    ],
    code: `@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}

@Injectable()
export class OrdersService {
  findOne(id: string) {
    return { id, status: 'PAID' };
  }
}`,
    notes: [
      'Constructor injection keeps dependencies explicit and testable.',
      'Controllers should stay thin and transport-focused.',
    ],
  },
  {
    id: 'examples-validation',
    title: 'DTO and Validation Pipe',
    description: [
      'NestJS commonly validates request input with DTO classes and validation pipes. This makes the application boundary explicit and typed.',
      'The goal is to reject invalid input before deeper business logic has to compensate for it.',
    ],
    code: `export class CreateOrderDto {
  @IsString()
  sku!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

@Post()
create(@Body(new ValidationPipe()) dto: CreateOrderDto) {
  return this.ordersService.create(dto);
}`,
    notes: [
      'Validation belongs at the request boundary whenever possible.',
      'DTOs become clearer when they model real input contracts rather than arbitrary classes.',
    ],
  },
  {
    id: 'examples-guard',
    title: 'Guard for Authorization',
    description: [
      'Guards are the right place for reusable request authorization checks. This example blocks requests without an authenticated user object.',
      'Keeping this concern out of controllers makes the system easier to extend consistently.',
    ],
    code: `@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return Boolean(request.user);
  }
}`,
    notes: [
      'Guards should make authorization flow explicit and reusable.',
      'Authentication and authorization logic should stay consistent across endpoints.',
    ],
  },
  {
    id: 'examples-interceptor',
    title: 'Interceptor for Response Timing',
    description: [
      'Interceptors wrap execution and are useful for metrics, logging, or response transformation. This example shows a simple timing wrapper.',
      'Cross-cutting behavior belongs in framework mechanisms like interceptors rather than repeated controller code.',
    ],
    code: `@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => console.log('request took', Date.now() - start, 'ms')),
    );
  }
}`,
    notes: [
      'Interceptors are strong for shared mechanics around request execution.',
      'Keep them focused and avoid burying core domain behavior inside them.',
    ],
  },
  {
    id: 'examples-test',
    title: 'Service Test with Dependency Injection',
    description: [
      'NestJS testing utilities make it straightforward to instantiate providers in a controlled module context. This supports focused testing without a full application boot every time.',
      'The goal is to leverage the DI model for testability rather than treating tests as afterthoughts.',
    ],
    code: `describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = moduleRef.get(OrdersService);
  });

  it('returns an order by id', () => {
    expect(service.findOne('42')).toEqual({ id: '42', status: 'PAID' });
  });
});`,
    notes: [
      'Testing modules are useful when services depend on framework-managed providers.',
      'Keep test scope aligned with the behavior under evaluation.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core NestJS Terms',
    terms: [
      {
        term: 'Module',
        definition:
          'A NestJS organizational boundary that groups controllers, providers, and imports into one coherent application area.',
      },
      {
        term: 'Provider',
        definition:
          'An injectable class or factory managed by the NestJS dependency injection container.',
      },
      {
        term: 'Controller',
        definition:
          'The transport-layer class that receives requests and maps them to handler methods.',
      },
      {
        term: 'Dependency Injection',
        definition:
          'The pattern where application dependencies are supplied by the framework container rather than manually constructed everywhere.',
      },
      {
        term: 'Decorator',
        definition:
          'A TypeScript metadata mechanism used by NestJS to describe framework behavior for classes, methods, and parameters.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Middleware',
        definition:
          'A request-processing layer typically used for broad pre-controller logic such as logging or raw request handling.',
      },
      {
        term: 'Guard',
        definition:
          'A NestJS lifecycle component that decides whether a request is authorized to proceed.',
      },
      {
        term: 'Pipe',
        definition:
          'A component that transforms or validates incoming data before it reaches a controller method.',
      },
      {
        term: 'Interceptor',
        definition:
          'A wrapper around handler execution used for cross-cutting behaviors such as logging, timing, or response mapping.',
      },
      {
        term: 'Exception Filter',
        definition:
          'A NestJS mechanism for catching and translating errors into consistent framework-managed responses.',
      },
    ],
  },
  {
    id: 'glossary-testing',
    title: 'Data and Testing Terms',
    terms: [
      {
        term: 'DTO',
        definition:
          'A data transfer object class used to describe and often validate request or response payload shapes.',
      },
      {
        term: 'Testing Module',
        definition:
          'A NestJS test harness module used to construct providers and controllers in a controlled DI context.',
      },
      {
        term: 'Gateway',
        definition:
          'A NestJS abstraction commonly used for WebSocket-based real-time communication.',
      },
      {
        term: 'Microservice Transport',
        definition:
          'A communication mechanism used by NestJS microservice patterns to connect services over message or network transports.',
      },
      {
        term: 'Provider Graph',
        definition:
          'The dependency structure formed by injectable providers and the modules that expose them.',
      },
    ],
  },
]

const pageStyles = `
.postgres-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.postgres-help-window {
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

.postgres-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.postgres-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.postgres-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.postgres-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
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
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.postgres-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.postgres-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.postgres-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.postgres-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.postgres-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.postgres-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.postgres-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.postgres-help-toc-item {
  margin: 0 0 8px;
}

.postgres-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.postgres-help-toc-link:hover,
.postgres-help-toc-link:focus-visible {
  text-decoration: underline;
}

.postgres-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.postgres-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.postgres-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.postgres-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.postgres-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.postgres-help-content p,
.postgres-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.postgres-help-content p {
  margin: 0 0 10px;
}

.postgres-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.postgres-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.postgres-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.postgres-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .postgres-help-main {
    grid-template-columns: 1fr;
  }

  .postgres-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .postgres-help-window {
    min-height: auto;
  }

  .postgres-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .postgres-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .postgres-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
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

export default function NestJsPage(): JSX.Element {
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
    document.title = `NestJS (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'NestJS',
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
    <div className="postgres-help-page">
      <style>{pageStyles}</style>
      <div className="postgres-help-window" role="presentation">
        <header className="postgres-help-titlebar">
          <span className="postgres-help-titletext">NestJS</span>
          <div className="postgres-help-controls">
            <button className="postgres-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="postgres-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="postgres-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`postgres-help-tab ${activeTab === tab.id ? 'postgres-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="postgres-help-main">
          <aside className="postgres-help-toc" aria-label="Table of contents">
            <h2 className="postgres-help-toc-title">Contents</h2>
            <ul className="postgres-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="postgres-help-toc-item">
                  <a href={`#${section.id}`} className="postgres-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="postgres-help-content">
            <h1 className="postgres-help-doc-title">NestJS</h1>
            <p className="postgres-help-doc-subtitle">
              TypeScript backend framework reference covering modules, dependency injection,
              controllers, providers, middleware, guards, pipes, testing, and deployment tradeoffs.
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
          </main>
        </div>
      </div>
    </div>
  )
}
