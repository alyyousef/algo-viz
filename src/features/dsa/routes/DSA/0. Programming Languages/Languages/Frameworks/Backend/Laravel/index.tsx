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
  'Laravel is a PHP web application framework designed to make backend development productive through expressive syntax, integrated tooling, and a broad set of built-in capabilities. It is commonly used for web applications, APIs, admin systems, SaaS platforms, and product backends where teams want one coherent framework to cover routing, data access, validation, queues, jobs, mail, authentication, testing, and deployment-oriented application structure.',
  'The most useful way to think about Laravel is not just as a routing layer for PHP. It is an application platform built around service providers, a service container, Eloquent ORM, Blade templates, middleware, artisan tooling, queues, and convention-driven project structure. It tries to solve a large amount of ordinary web-application work with a consistent developer experience.',
  'This page is intentionally thorough. It covers the Laravel programming model, request lifecycle, service container, providers, routing, controllers, validation, Eloquent, migrations, Blade, queues, events, testing, operations, tradeoffs, and practical examples that show how Laravel applications are organized in real backend systems.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Laravel is a full-featured PHP framework for building web applications and APIs. It provides a structured environment for routing, controllers, views, database access, queues, events, background jobs, authentication, caching, testing, and operational tooling. Instead of assembling many disconnected libraries, teams can use one opinionated framework with broad built-in support.',
      'Its major appeal is developer productivity. Laravel gives teams an expressive syntax, strong conventions, integrated tools, and a large ecosystem so common backend concerns can be solved quickly without sacrificing the ability to build serious production systems.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Laravel Matters',
    paragraphs: [
      'Laravel matters because many business applications need a framework that helps teams move quickly while still providing enough structure for long-lived systems. It became influential by making PHP backend development feel cohesive, modern, and highly productive for everyday web application work.',
      'It is especially important in teams that want to build product features fast without constantly wiring the same infrastructure concerns by hand. Routing, validation, database work, job dispatching, notifications, scheduling, and test scaffolding all fit naturally inside one framework story.',
    ],
    bullets: [
      'Expressive syntax and integrated tooling speed up common backend work.',
      'Broad built-in capabilities reduce repeated infrastructure assembly.',
      'Strong ecosystem support helps with practical production development.',
      'The framework covers both application development and operational concerns.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a batteries-included backend framework with a service container at the center and conventional entry points for request handling, domain services, persistence, rendering, and background work. A Laravel app is not only a set of PHP files. It is a framework-managed application with clear extension points and lifecycle rules.',
      'That means Laravel architecture is not only about controller syntax. Teams need to think about service boundaries, model behavior, middleware, queue design, validation, provider registration, and how framework conveniences affect long-term maintainability.',
    ],
    bullets: [
      'Think integrated application platform, not only route callbacks.',
      'Think container, providers, and framework lifecycle alongside business logic.',
      'Think productivity plus maintainability, not only short-term speed.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Laravel Fits Best',
    paragraphs: [
      'Laravel fits best for CRUD-heavy applications, SaaS products, admin systems, marketplaces, internal business platforms, customer dashboards, content systems, and APIs where teams benefit from fast iteration, full-stack framework support, and the wider PHP ecosystem. It is especially effective when the application needs many ordinary web concerns in one place.',
      'It also fits well when a team wants to deliver quickly with strong conventions but does not want to manually piece together a backend architecture from low-level components.',
    ],
    bullets: [
      'Web applications and APIs with many common backend concerns.',
      'Teams that want a broad framework rather than a minimal toolkit.',
      'Projects where speed of delivery and convention are meaningful advantages.',
      'Systems benefiting from Laravel ecosystem tooling and community practice.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Laravel Is Not the Best Default',
    paragraphs: [
      'Laravel is not automatically the right answer for tiny scripts, highly specialized performance-sensitive systems where framework abstraction is a poor fit, or teams that do not want a broad opinionated framework. If the backend is extremely small, the framework may add more structure than the workload really needs.',
      'It can also be a weak fit if the organization does not want PHP or if the surrounding platform strategy strongly favors another language ecosystem with better team alignment.',
    ],
    bullets: [
      'Very small applications that do not need a full framework.',
      'Teams that prefer minimal or low-level backend stacks.',
      'Projects where PHP ecosystem alignment is weak.',
      'Workloads whose architectural needs do not match Laravels integrated model.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Laravel is strongest when the application benefits from one coherent framework handling many common backend concerns. It saves time not just through helpers, but through a consistent architecture and toolchain.',
      'Its real value appears when teams use the framework to move quickly without letting convenience erase domain boundaries, data discipline, or operational rigor.',
    ],
    bullets: [
      'Choose Laravel when integrated tooling and framework breadth are advantages.',
      'Treat the service container and request lifecycle as core concepts.',
      'Use the frameworks productivity to strengthen delivery, not to avoid architecture.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Laravel Actually Is',
    paragraphs: [
      'Laravel is a full-featured PHP framework with conventions and infrastructure for web applications and APIs. It includes routing, controllers, request validation, ORM support, templating, queues, events, jobs, notifications, scheduling, caching, and testing support under one architectural umbrella.',
      'This matters because the framework is not only a library collection. It is a guided way of building backend applications so common concerns are solved consistently across projects.',
    ],
  },
  {
    id: 'core-request-lifecycle',
    title: 'Request Lifecycle',
    paragraphs: [
      'A Laravel request enters through the application bootstrap, passes through middleware, reaches routing, and then resolves a controller or handler. Along the way, the framework container can inject dependencies, validation can shape input, and middleware can enforce cross-cutting rules such as authentication or throttling.',
      'Understanding this flow is important because it determines where concerns belong. Middleware, controllers, form requests, services, and models each have different responsibilities in a healthy Laravel codebase.',
    ],
  },
  {
    id: 'core-container',
    title: 'Service Container and Dependency Resolution',
    paragraphs: [
      'The Laravel service container resolves dependencies and lets the framework instantiate controllers, services, listeners, commands, and many other classes automatically. This makes applications easier to compose because dependencies can be declared rather than manually constructed everywhere.',
      'The container becomes more valuable as systems grow. It improves testability and structure, but teams still need to keep the dependency graph understandable instead of letting everything depend on everything else.',
    ],
  },
  {
    id: 'core-providers',
    title: 'Service Providers and Bootstrapping',
    paragraphs: [
      'Service providers are one of Laravels main extension points. They register bindings, configure package behavior, attach listeners, and participate in application bootstrap. This makes them central to how infrastructure and framework-level behavior enter the application.',
      'Providers are powerful, but they should stay purposeful. When too much unrelated logic is hidden in boot code, the application becomes harder to trace and reason about.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Endpoint Design',
    paragraphs: [
      'Laravel routing maps URLs and verbs to controllers, closures, middleware stacks, and route groups. It supports route model binding, prefixing, namespacing, rate limiting, and many patterns useful in real backend applications.',
      'Good routes are more than syntax. They define the public surface of the application, and Laravel gives teams a readable place to express that surface clearly.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Controllers and Application Flow',
    paragraphs: [
      'Controllers handle request coordination and should generally remain focused on transport and orchestration concerns. In a well-structured Laravel app, deeper business logic lives in services, actions, models, or domain modules rather than growing uncontrolled inside controllers.',
      'This separation helps keep web behavior understandable and makes application rules reusable outside one request path.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation and Form Requests',
    paragraphs: [
      'Laravel supports validation at the request boundary, often through form request classes. This gives the application a structured way to validate incoming data before controllers or services operate on it.',
      'This is one of the cleanest parts of the framework because it pushes invalid state out early and keeps validation rules near the input contract rather than scattered randomly through controller methods.',
    ],
  },
  {
    id: 'core-eloquent',
    title: 'Eloquent and Data Modeling',
    paragraphs: [
      'Eloquent is Laravels ORM and one of its most visible productivity features. It provides models, relationships, scopes, query building, persistence helpers, and integration with migrations and validation-adjacent workflows.',
      'The productivity gain is real, but strong Laravel teams still need SQL awareness, indexing discipline, and careful relationship loading. ORM convenience does not remove database realities.',
    ],
  },
  {
    id: 'core-migrations',
    title: 'Migrations and Schema Evolution',
    paragraphs: [
      'Laravel migrations provide a versioned way to evolve the database schema consistently across environments. This supports repeatable development and deployment because schema changes become part of the application history rather than ad hoc manual database edits.',
      'The framework makes schema evolution easier, but teams still need migration discipline. Large data changes, indexes, and backward-compatible rollout concerns remain real engineering work.',
    ],
  },
  {
    id: 'core-blade',
    title: 'Blade and Server Rendering',
    paragraphs: [
      'Blade is Laravels templating engine for server-rendered views. It supports layouts, components, conditionals, loops, and reusable templates while keeping rendering integrated with the rest of the framework.',
      'This is useful because many applications still benefit from server-rendered pages, dashboards, admin interfaces, or hybrid frontend architectures. Laravel does not require every web experience to become a separate client application.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware and Cross-Cutting Behavior',
    paragraphs: [
      'Middleware handles repeated request concerns such as authentication, authorization, sessions, throttling, CORS, and tenant resolution. It gives the framework a structured place for pre-controller request behavior that would otherwise be duplicated broadly.',
      'The key design principle is clarity. Middleware should handle broad request rules, not become a hidden dumping ground for arbitrary business logic.',
    ],
  },
  {
    id: 'core-queues',
    title: 'Queues, Jobs, and Async Work',
    paragraphs: [
      'Laravel supports queued jobs and background processing so expensive or slow work can move out of the request-response path. This is useful for emails, reports, notifications, imports, integrations, and retryable external work.',
      'Background work still needs real design. Idempotency, retry behavior, observability, and queue health all matter once async systems are part of production.',
    ],
  },
  {
    id: 'core-events',
    title: 'Events, Listeners, and Application Decoupling',
    paragraphs: [
      'Laravel events and listeners provide a way to decouple parts of the application when one action should trigger several follow-up behaviors. This can help keep controllers or services from becoming overly procedural when several reactions need to happen after one domain event.',
      'The caution is to keep event flows understandable. Too much hidden behavior behind listeners can make the application difficult to debug if event boundaries are not clear.',
    ],
  },
  {
    id: 'core-artisan',
    title: 'Artisan and Developer Workflow',
    paragraphs: [
      'Artisan is Laravels command-line tool for scaffolding, migrations, queue work, scheduling, and framework operations. It is a major productivity feature because it turns common repetitive tasks into first-class framework commands.',
      'Tooling matters because the speed of backend development depends on more than runtime code. Commands, generators, and repeatable operational tasks shape the daily engineering workflow.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Laravel includes strong support for unit, feature, and integration-style testing with helpers for requests, database state, authentication context, and framework behavior. This makes it easier to test application flows in a realistic way without writing excessive boilerplate.',
      'A strong test strategy still depends on scope. Not every behavior needs a full HTTP test if a smaller test proves it more directly, and not every domain rule should remain implicit inside feature tests only.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Runtime Discipline',
    paragraphs: [
      'Healthy Laravel systems need production discipline around queues, cache behavior, configuration, secrets, session handling, scheduled tasks, database performance, logging, and deployment rollback safety. The framework helps organize the application, but it does not remove operational responsibility.',
      'Operational quality often depends less on route syntax and more on how well the team understands database behavior, queue backlog, cache invalidation, and environment configuration.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Laravel performance work usually comes down to the fundamentals: query shape, eager loading, caching, queue offloading, route and config optimization, and careful avoidance of avoidable repeated work. Many performance issues are ordinary backend issues expressed through framework abstractions rather than caused by the framework itself.',
      'The best posture is empirical. Measure request latency, inspect database queries, profile queue behavior, and optimize the real bottleneck instead of guessing based on framework reputation.',
    ],
    bullets: [
      'Watch SQL behavior and relationship loading closely.',
      'Use queues and caches to reduce request-path cost.',
      'Profile real application paths rather than abstract framework overhead.',
      'Keep framework convenience aligned with system clarity.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Laravel is widely used for SaaS applications, admin panels, customer portals, content systems, ecommerce-adjacent services, internal business tools, APIs, and many web products that need to move quickly with strong framework support for ordinary backend concerns.',
      'Its main practical strength is that a large number of valuable applications still look like forms, workflows, domain records, notifications, and background jobs. Laravel is optimized for that reality.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Laravel',
    paragraphs: [
      'Laravel is a weaker fit when the application is extremely small, when the team strongly prefers a much smaller framework, or when the ecosystem and staffing strategy are clearly better served by another platform. It is also less compelling if the project does not need most of what the framework is good at.',
      'That does not reduce its quality. It just means framework breadth should be matched to actual system needs.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Laravel mistakes include fat controllers, hidden database inefficiency through Eloquent relationships, callback-like model events used without enough clarity, scattered validation, weak migration discipline, and queue usage without enough operational visibility.',
      'Another recurring issue is convenience debt: the framework makes it easy to ship quickly, but if the team does not keep domain boundaries clear, the codebase can become difficult to evolve later.',
    ],
    bullets: [
      'Do not let controllers become the center of all application logic.',
      'Do not assume ORM convenience means query cost does not matter.',
      'Do not scatter framework hooks until behavior becomes hard to trace.',
      'Do not rely on speed of scaffolding as a substitute for architecture.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Laravel Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with minimal PHP frameworks, Laravel is broader and more opinionated. Compared with Rails, it plays a somewhat similar productivity role in the PHP ecosystem through convention, ORM integration, and strong built-in capabilities. Compared with frameworks such as NestJS or Spring Boot, it offers a comparable application-platform ambition in a very different language and ecosystem.',
      'The meaningful comparison is whether the teams language choice, deployment model, and application needs align with Laravels integrated style. The best framework is the one whose strengths match the product and the people building it.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Laravel when the application benefits from one broad framework handling routing, validation, ORM behavior, queues, templates, and common backend workflow patterns. Choose something smaller when the project is too simple to justify that framework breadth.',
      'The strongest Laravel decisions happen when framework productivity, PHP ecosystem fit, and application shape all point in the same direction.',
    ],
    bullets: [
      'Need broad integrated backend tooling: strong Laravel signal.',
      'Need fast delivery on a web application with many common concerns: strong Laravel signal.',
      'Need a tiny framework with minimal abstraction: weak Laravel signal.',
      'Need strong PHP ecosystem alignment: strong Laravel signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-route',
    title: 'Route to Controller Mapping',
    description: [
      'Laravel routes are usually declared clearly and then mapped to controller methods. This keeps the public HTTP surface readable and conventional.',
      'The route layer becomes easier to maintain when it reflects resource and application intent rather than ad hoc callback sprawl.',
    ],
    code: `Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
});`,
    notes: [
      'Route groups help apply middleware consistently.',
      'Controller mapping keeps transport concerns separated from deeper logic.',
    ],
  },
  {
    id: 'examples-validation',
    title: 'Form Request Validation',
    description: [
      'Form requests let Laravel applications keep input validation at the boundary in a dedicated class. This keeps controllers cleaner and contracts more explicit.',
      'The goal is to reject invalid input before business logic compensates for it later.',
    ],
    code: `class StoreOrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'sku' => ['required', 'string'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}`,
    notes: [
      'Validation belongs close to request entry points.',
      'Dedicated request classes improve readability in larger applications.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'Controller Delegating to a Service',
    description: [
      'A healthy Laravel controller coordinates the HTTP flow and then delegates real business work. This example keeps creation logic out of the controller body.',
      'The framework makes thin controllers easy when teams enforce that discipline explicitly.',
    ],
    code: `class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, OrderService $orders)
    {
        $order = $orders->create($request->validated());

        return response()->json(['id' => $order->id], 201);
    }
}`,
    notes: [
      'Dependency injection keeps controller dependencies explicit.',
      'Service boundaries become more valuable as application workflows grow.',
    ],
  },
  {
    id: 'examples-model',
    title: 'Eloquent Model with Relationship',
    description: [
      'Eloquent models commonly express relationships and domain-adjacent persistence behavior. This example shows a basic belongs-to relationship for orders.',
      'The convenience is useful, but teams should still think about query cost and indexing under the surface.',
    ],
    code: `class Order extends Model
{
    protected $fillable = ['account_id', 'status', 'total_cents'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}`,
    notes: [
      'Eloquent relationships improve readability for ordinary application code.',
      'Convenience does not remove the need for SQL awareness and eager loading discipline.',
    ],
  },
  {
    id: 'examples-job',
    title: 'Queued Job',
    description: [
      'Queued jobs move slow or retry-prone work out of the request path. This example dispatches an invoice email later instead of blocking the response.',
      'The queue model is one of Laravels practical production strengths when used with observability and retry discipline.',
    ],
    code: `class SendInvoiceEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $invoiceId) {}

    public function handle(): void
    {
        $invoice = Invoice::findOrFail($this->invoiceId);
        Mail::to($invoice->customer_email)->send(new InvoiceMail($invoice));
    }
}`,
    notes: [
      'Jobs should be designed to handle retries safely.',
      'Async work belongs in explicit queue workflows, not hidden side effects.',
    ],
  },
  {
    id: 'examples-test',
    title: 'Feature Test for an API Endpoint',
    description: [
      'Laravel testing helpers make feature-level request tests straightforward. This example checks that an authenticated request can create an order.',
      'These tests are useful when the full request flow matters more than one isolated class behavior.',
    ],
    code: `public function test_authenticated_user_can_create_order(): void
{
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/orders', [
            'sku' => 'BK-17',
            'quantity' => 1,
        ])
        ->assertCreated();
}`,
    notes: [
      'Feature tests are strong for request-path confidence.',
      'Use smaller tests too when they prove behavior more directly and cheaply.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Laravel Terms',
    terms: [
      {
        term: 'Service Container',
        definition:
          'Laravels dependency resolution system used to instantiate and inject classes throughout the application.',
      },
      {
        term: 'Service Provider',
        definition:
          'A Laravel bootstrap component used to register services and framework-level configuration into the application.',
      },
      {
        term: 'Eloquent',
        definition:
          'Laravels ORM for working with database-backed models, relationships, queries, and persistence operations.',
      },
      {
        term: 'Blade',
        definition:
          'Laravels templating engine for server-rendered views and reusable UI components.',
      },
      {
        term: 'Artisan',
        definition:
          'The Laravel command-line tool used for framework operations, generators, migrations, and developer workflows.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request and Workflow Terms',
    terms: [
      {
        term: 'Middleware',
        definition:
          'A request-processing layer used for cross-cutting behavior such as authentication, throttling, and request shaping.',
      },
      {
        term: 'Form Request',
        definition:
          'A dedicated Laravel request class used to authorize and validate incoming request data.',
      },
      {
        term: 'Route Model Binding',
        definition:
          'A Laravel feature that resolves route parameters directly into model instances.',
      },
      {
        term: 'Job',
        definition:
          'A queued or dispatchable unit of work commonly used for asynchronous processing outside the request path.',
      },
      {
        term: 'Listener',
        definition:
          'A class that responds to an application event as part of Laravels event system.',
      },
    ],
  },
  {
    id: 'glossary-data',
    title: 'Data and Testing Terms',
    terms: [
      {
        term: 'Migration',
        definition:
          'A versioned database schema change script used to evolve the database consistently over time.',
      },
      {
        term: 'Seeder',
        definition:
          'A Laravel class used to populate the database with initial or test data.',
      },
      {
        term: 'Factory',
        definition:
          'A Laravel test and data-generation utility for creating model instances in predictable shapes.',
      },
      {
        term: 'Feature Test',
        definition:
          'A Laravel test style that exercises larger pieces of application behavior, often through HTTP requests or integrated flows.',
      },
      {
        term: 'Eager Loading',
        definition:
          'A technique used to load related models up front and reduce N plus 1 query problems.',
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

export default function LaravelPage(): JSX.Element {
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
    document.title = `Laravel (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Laravel',
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
          <span className="postgres-help-titletext">Laravel</span>
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
            <h1 className="postgres-help-doc-title">Laravel</h1>
            <p className="postgres-help-doc-subtitle">
              PHP backend framework reference covering routing, service container,
              Eloquent, Blade, middleware, queues, testing, and deployment tradeoffs.
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
