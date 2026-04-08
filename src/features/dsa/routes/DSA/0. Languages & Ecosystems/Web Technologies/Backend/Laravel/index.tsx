import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What Laravel is',
    body: 'Laravel is a full-featured PHP web framework designed to provide a broad, integrated backend development experience. It includes routing, controllers, an ORM, templating, dependency injection, configuration, background jobs, queues, events, validation, authentication tooling, and a large ecosystem of first-party and community packages.',
  },
  {
    title: 'Why Laravel matters',
    body: 'Laravel matters because it became one of the most influential frameworks in the PHP ecosystem by making modern web application development more structured, expressive, and approachable. It raised expectations around developer experience in PHP by combining productivity features with a coherent application model.',
  },
  {
    title: 'How to think about it',
    body: 'The most useful mental model is that Laravel is an opinionated application platform, not just a router plus helpers. It offers a fairly complete default way to think about controllers, models, views, services, jobs, events, queues, configuration, and testing. Teams can customize it, but its strength comes largely from the conventions it provides.',
  },
  {
    title: 'Where it fits best',
    body: 'Laravel fits best for full web applications, API backends, dashboards, internal tools, SaaS platforms, and product teams that want a rich default platform rather than assembling every major backend concern independently. It is especially strong when productivity, ecosystem integration, and convention-driven development matter.',
  },
]

const whyItMatters = [
  'It became one of the dominant frameworks for modern PHP backend development.',
  'It offers a broad integrated platform instead of requiring teams to compose every major backend capability themselves.',
  'It improved PHP developer experience through expressive APIs, clear conventions, and strong tooling.',
  'It supports both server-rendered applications and API-centric backends within one framework model.',
  'It remains a common reference point when comparing productivity-oriented backend frameworks.',
]

const historicalContext = [
  {
    title: 'Laravel rose during a shift in PHP expectations',
    detail:
      'PHP web development had long been widespread, but teams increasingly wanted stronger structure, cleaner tooling, and a more modern development style. Laravel gained traction by offering conventions and elegance at a time when many developers were looking for a more cohesive framework experience.',
  },
  {
    title: 'It emphasized developer experience as a core value',
    detail:
      'Laravel did not focus only on raw capability. It also focused on readability, expressive APIs, good defaults, and tooling that made common tasks pleasant. That emphasis helped it stand out in a crowded ecosystem.',
  },
  {
    title: 'The ecosystem expanded around the framework',
    detail:
      'Laravel became more than a core framework. Queue workers, first-party packages, Forge, Vapor, Nova, Sail, Horizon, and related tools helped turn it into a broader application platform rather than a narrow request framework.',
  },
  {
    title: 'It remained relevant by balancing convention and flexibility',
    detail:
      'Laravel offers strong conventions, but it is still usable across many kinds of products, from simple CRUD applications to multi-service platforms. That balance helped it remain relevant even as backend styles shifted toward APIs, queues, event-driven designs, and cloud deployment patterns.',
  },
]

const bigPictureThemes = [
  {
    title: 'Laravel is a platform, not a thin layer',
    body: 'A team adopting Laravel is usually adopting a broad framework worldview, not just an HTTP router. Many common backend concerns already have a Laravel-shaped answer, which is a major productivity advantage when the team wants those answers rather than needing to invent them all independently.',
  },
  {
    title: 'Convention accelerates development',
    body: 'Laravel is at its strongest when teams let its conventions reduce decision overhead. Consistent routing, controller patterns, request validation, queue handling, model conventions, and service container usage can make a codebase easier to extend when those patterns are applied coherently.',
  },
  {
    title: 'Integrated tooling changes architecture choices',
    body: 'Because Laravel includes batteries for jobs, queues, mail, events, auth, caching, and ORM access, teams often solve problems differently than they would in a thinner framework. Integration lowers the cost of using these capabilities, which can shape how applications evolve.',
  },
  {
    title: 'Productivity does not remove engineering discipline',
    body: 'Laravel can make teams very productive very quickly, but large systems still need careful boundaries, query discipline, background-processing strategy, observability, security review, and operational clarity. A productive framework can accelerate both good patterns and bad ones.',
  },
]

const keyTakeaways = [
  'Laravel is a full-featured PHP application framework with strong defaults and broad integrated capabilities.',
  'Its main value comes from convention, ecosystem tooling, and an expressive developer experience.',
  'It is often a strong fit for product teams that want a complete web application platform.',
  'Its power grows when teams use its conventions deliberately rather than mixing many conflicting styles.',
  'As Laravel systems scale, boundaries, data access discipline, and operational design matter as much as framework productivity.',
]

const topicSignals = [
  {
    title: 'Choose Laravel when you want an integrated platform',
    body: 'If the team wants routing, ORM access, background jobs, auth patterns, templating, validation, and configuration to come from a coherent framework instead of many unrelated packages, Laravel is a strong candidate.',
  },
  {
    title: 'Choose Laravel when product velocity matters',
    body: 'Laravel is especially attractive when teams are shipping product features quickly and benefit from strong scaffolding, expressive APIs, and a large ecosystem of existing patterns.',
  },
  {
    title: 'Choose Laravel when server-rendered and API styles may coexist',
    body: 'Laravel can support traditional web applications, admin interfaces, and API backends under one framework umbrella, which is useful for products that mix these concerns.',
  },
  {
    title: 'Avoid expecting convention to replace architecture',
    body: 'Laravel provides a lot, but teams still need to decide service boundaries, domain structure, scaling strategy, and data access discipline. Framework completeness does not mean application structure will emerge automatically.',
  },
]

const coreFoundations = [
  {
    title: 'Routing, controllers, and middleware',
    body: 'Laravel routes requests through a router into controllers or route closures, with middleware handling cross-cutting concerns such as auth, throttling, and request policy. This gives applications a clear HTTP entry structure while keeping policy composition explicit.',
  },
  {
    title: 'Eloquent ORM',
    body: "Eloquent is Laravel's ORM and one of the framework's most recognizable features. It provides an active-record style model layer with relationships, query building, scopes, and convenience methods. It is productive, but it also requires discipline to avoid unclear query behavior or accidental coupling between persistence and domain logic.",
  },
  {
    title: 'Blade templating and full-stack web support',
    body: 'Laravel is comfortable serving server-rendered web applications through Blade templates, not only APIs. That makes it a strong fit for dashboards, admin surfaces, and product applications that benefit from integrated frontend rendering at the server layer.',
  },
  {
    title: 'Service container and dependency injection',
    body: 'Laravel includes a service container that resolves dependencies and supports inversion of control patterns across controllers, services, jobs, listeners, and other framework-managed components. This is central to how larger Laravel applications stay modular.',
  },
  {
    title: 'Jobs, queues, events, and asynchronous workflows',
    body: 'Background processing is part of the normal Laravel model rather than an afterthought. Jobs, queues, scheduled tasks, and events let teams move slow or non-interactive work out of the request path in a framework-native way.',
  },
]

const frameworkFeatures = [
  {
    title: 'Expressive application conventions',
    body: 'Laravel gives developers a recognizable way to structure many concerns: controllers, form requests, models, migrations, jobs, listeners, policies, commands, and tests. That consistency helps teams onboard more quickly and reduce argument over baseline structure.',
  },
  {
    title: 'Rich first-party tooling',
    body: 'Migrations, queues, scheduled tasks, broadcasting, notifications, mail, caching, and testing support are all part of the broader Laravel experience. This lowers the cost of building full application behavior without integrating many unrelated libraries.',
  },
  {
    title: 'Validation and request lifecycle helpers',
    body: 'Laravel provides strong support for request validation, authorization checks, error responses, and lifecycle hooks. These features make boundary handling more consistent when teams adopt them systematically rather than ad hoc.',
  },
  {
    title: 'Artisan and operational development workflow',
    body: 'Artisan commands and related tooling are part of how Laravel applications are built and maintained. Code generation, operational tasks, migrations, background worker commands, and maintenance operations often flow through this tooling layer.',
  },
  {
    title: 'Ecosystem breadth',
    body: 'A major strength of Laravel is not just the core framework but the surrounding ecosystem of packages and official tools. Teams can often adopt familiar solutions for admin interfaces, monitoring, local development, deployment, and queue visibility without reinventing them.',
  },
]

const runtimeAndOperations = [
  {
    title: 'PHP runtime and deployment model',
    body: 'Laravel applications usually run in a classic PHP web-server environment or behind modern PHP application servers and containerized deployments. Real operational behavior depends on PHP runtime configuration, queue worker management, cache strategy, session handling, and database performance.',
  },
  {
    title: 'Background work is a first-class production concern',
    body: 'Once a Laravel application begins using queues, jobs, notifications, and scheduled tasks, operations become broader than handling web requests alone. Queue throughput, retries, idempotency, worker supervision, and failure visibility become essential parts of production reliability.',
  },
  {
    title: 'ORM convenience requires query discipline',
    body: 'Eloquent can make data access very productive, but convenience can hide query volume, relationship loading behavior, and expensive serialization. Teams need to understand eager loading, query boundaries, and how to keep persistence behavior visible enough to reason about.',
  },
  {
    title: 'Observability and security still need explicit standards',
    body: 'Laravel offers helpful features, but production services still need metrics, logs, traces, secret management, auth review, rate limiting, cache discipline, and deployment visibility. The framework helps with scaffolding, but it does not remove the need for operational design.',
  },
]

const ecosystemUses = [
  {
    title: 'Full web applications and SaaS products',
    body: 'Laravel is especially strong for product teams building customer-facing applications, dashboards, onboarding flows, billing layers, and admin surfaces that benefit from an integrated backend platform.',
  },
  {
    title: 'API backends with product logic',
    body: 'Although Laravel has strong server-rendered roots, it is also widely used for JSON APIs, mobile backends, and internal service layers when the surrounding application platform features are still valuable.',
  },
  {
    title: 'Internal business systems',
    body: 'Many organizations use Laravel for internal operations software, line-of-business apps, and workflow systems where CRUD, auth, notifications, and background processing are central concerns.',
  },
  {
    title: 'Teams standardized on PHP delivery',
    body: 'For teams with strong PHP experience or established PHP infrastructure, Laravel offers a mature and productive way to standardize application development around a coherent framework model.',
  },
]

const comparisons = [
  {
    title: 'Laravel versus Symfony',
    body: 'Symfony provides a powerful and modular PHP framework ecosystem with deep componentization, while Laravel emphasizes a more integrated and productivity-oriented developer experience. The difference is often one of framework feel and default workflow rather than raw capability alone.',
  },
  {
    title: 'Laravel versus Ruby on Rails',
    body: 'Both frameworks are known for strong conventions and product-oriented development speed. Laravel occupies a similar role in PHP that Rails historically occupied in Ruby: an opinionated framework that accelerates common web application work through integrated patterns and tooling.',
  },
  {
    title: 'Laravel versus Express.js or Flask',
    body: 'Express.js and Flask often provide thinner cores with more application-owned structure. Laravel provides a much broader built-in platform. It trades some flexibility and minimalism for productivity, convention, and a richer default ecosystem.',
  },
  {
    title: 'Laravel versus ASP.NET Core or Spring Boot',
    body: "Compared with larger enterprise ecosystems, Laravel remains highly productive and expressive, but it may offer different tradeoffs in static tooling, compile-time guarantees, and platform-level conventions. The key question is whether the team values Laravel's application productivity model over the broader infrastructure style of those platforms.",
  },
]

const failureModes = [
  {
    title: 'Letting framework convenience become hidden complexity',
    body: 'Laravel makes many tasks easy, which can encourage teams to keep adding features without making boundaries explicit. Over time this can produce applications where business logic, persistence behavior, request handling, and queue work are too tightly entangled.',
  },
  {
    title: 'Overusing Eloquent as the whole architecture',
    body: 'Eloquent is powerful, but if models become the container for every concern, codebases can become hard to reason about. Persistence models are not always the same thing as service boundaries or domain boundaries.',
  },
  {
    title: 'Ignoring query behavior and serialization cost',
    body: 'ORM convenience can hide expensive query patterns, relationship-loading problems, and heavy response serialization. Teams need to understand what the framework is doing for them, not just that it works in development.',
  },
  {
    title: 'Treating queues and jobs as an operational afterthought',
    body: 'Once queues are in use, the application is no longer only a web app. It is also a distributed processing system with retries, failure states, worker health, and delivery guarantees to think about.',
  },
  {
    title: 'Mixing too many styles in one codebase',
    body: 'Laravel works best when the team chooses coherent conventions. If one part of the application is controller-heavy, another is service-heavy, another is model-heavy, and validation and auth patterns vary everywhere, the codebase loses the clarity the framework is supposed to provide.',
  },
]

const studyChecklist = [
  'Understand Laravel as a broad application platform, not only as an HTTP router.',
  'Learn the request lifecycle, middleware flow, and controller patterns clearly.',
  'Use Eloquent productively, but keep data access behavior visible and disciplined.',
  'Treat queues, jobs, and events as core architecture concerns once they are adopted.',
  'Use the service container and framework conventions consistently rather than mixing many competing styles.',
  'Pair framework productivity with explicit operational standards for queries, caches, workers, and observability.',
]

const examples = [
  {
    id: 'lar98-example-route-controller',
    title: 'Example: Route to controller action',
    area: 'Routing',
    intro:
      'A typical Laravel entrypoint maps a route to a controller action instead of putting all request logic directly into the route definition. This keeps the HTTP surface readable while preserving room for application structure.',
    whyFit: "This captures Laravel's convention-oriented approach to request handling.",
    code: `Route::get('/orders/{order}', [OrderController::class, 'show']);

class OrderController extends Controller
{
    public function show(Order $order)
    {
        return response()->json($order);
    }
}`,
    takeaway:
      'Laravel encourages routes to remain thin and controllers to act as a structured entrypoint into the rest of the application.',
  },
  {
    id: 'lar98-example-validation',
    title: 'Example: Form request validation',
    area: 'Validation',
    intro:
      'Laravel often handles request validation through dedicated request classes so authorization and validation logic stay close to the HTTP boundary rather than being scattered through controllers.',
    whyFit:
      "This reflects one of the framework's cleaner patterns for keeping controller actions concise.",
    code: `class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}`,
    takeaway:
      'Validation is clearer when the request contract is explicit and reusable instead of hidden in ad hoc controller checks.',
  },
  {
    id: 'lar98-example-eloquent',
    title: 'Example: Eloquent relationship query',
    area: 'Data Access',
    intro:
      'Eloquent makes common relationship traversal and query composition concise, which is one reason Laravel is productive for CRUD-heavy and product-oriented applications.',
    whyFit:
      'This demonstrates both the convenience and the need for awareness around data access behavior.',
    code: `$orders = Order::with('lineItems')
    ->where('status', 'open')
    ->latest()
    ->get();`,
    takeaway:
      'ORM convenience is useful, but teams still need to understand how queries and relationship loading affect runtime behavior.',
  },
  {
    id: 'lar98-example-job',
    title: 'Example: Queueing background work',
    area: 'Asynchronous Work',
    intro:
      "Laravel makes it easy to move non-interactive work such as emails, exports, or notifications out of the request path through queued jobs. This is one of the framework's biggest strengths in production applications.",
    whyFit:
      'This shows how Laravel treats background work as part of the normal application model rather than as a bolt-on afterthought.',
    code: `SendReceiptEmail::dispatch($order->id);

class SendReceiptEmail implements ShouldQueue
{
    public function handle(): void
    {
        // send receipt
    }
}`,
    takeaway:
      'Queueing improves responsiveness, but it also means the team now owns worker health, retry policy, and idempotency.',
  },
  {
    id: 'lar98-example-service-container',
    title: 'Example: Constructor injection through the container',
    area: 'Architecture',
    intro:
      "Laravel's container makes it natural to inject services into controllers and other framework-managed classes. This supports cleaner boundaries when teams keep those services focused and explicit.",
    whyFit:
      'This captures how larger Laravel applications avoid putting every concern directly inside controllers or models.',
    code: `class BillingController extends Controller
{
    public function __construct(private BillingService $billing) {}

    public function charge(ChargeRequest $request)
    {
        return $this->billing->charge($request->validated());
    }
}`,
    takeaway:
      'The container is most helpful when it supports explicit service boundaries rather than hiding overly broad dependencies.',
  },
]

const glossary = [
  {
    term: 'Laravel',
    definition:
      'A full-featured PHP web framework with strong conventions, integrated tooling, and a broad application platform model.',
  },
  {
    term: 'Eloquent',
    definition:
      "Laravel's ORM for working with database records, relationships, and query composition through PHP models.",
  },
  { term: 'Blade', definition: "Laravel's templating engine for server-rendered HTML views." },
  {
    term: 'Service container',
    definition:
      "Laravel's dependency resolution system used to construct and inject application services and framework-managed classes.",
  },
  {
    term: 'Middleware',
    definition:
      'A request pipeline layer used for cross-cutting policy such as auth, throttling, or request filtering.',
  },
  {
    term: 'Form request',
    definition:
      'A Laravel request class used to encapsulate authorization and validation rules for an incoming request.',
  },
  {
    term: 'Job',
    definition:
      'A unit of background work that can be dispatched synchronously or through a queue.',
  },
  {
    term: 'Queue worker',
    definition:
      'A process that consumes and executes queued Laravel jobs outside the main HTTP request path.',
  },
  {
    term: 'Artisan',
    definition:
      "Laravel's command-line tooling for development, maintenance, migrations, and operational tasks.",
  },
  {
    term: 'Convention over configuration',
    definition:
      'A framework philosophy where common behavior is shaped by consistent defaults so teams write less setup code.',
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
    { id: 'lar98-overview', label: 'Overview' },
    { id: 'lar98-why', label: 'Why It Matters' },
    { id: 'lar98-history', label: 'Historical Context' },
    { id: 'lar98-themes', label: 'Big Picture Themes' },
    { id: 'lar98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'lar98-signals', label: 'Topic Signals' },
    { id: 'lar98-foundations', label: 'Foundations' },
    { id: 'lar98-features', label: 'Framework Features' },
    { id: 'lar98-runtime', label: 'Runtime and Operations' },
    { id: 'lar98-uses', label: 'Ecosystem Uses' },
    { id: 'lar98-compare', label: 'Compare and Contrast' },
    { id: 'lar98-failures', label: 'Failure Modes' },
    { id: 'lar98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'lar98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const laravelHelpStyles = `
.lar98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lar98-window {
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

.lar98-titlebar {
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

.lar98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.lar98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.lar98-control {
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

.lar98-control:focus-visible,
.lar98-tab:focus-visible,
.lar98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.lar98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.lar98-tab {
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

.lar98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.lar98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.lar98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.lar98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.lar98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lar98-toc-item + .lar98-toc-item {
  margin-top: 8px;
}

.lar98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.lar98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.lar98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.lar98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.lar98-section {
  margin: 0 0 22px;
}

.lar98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.lar98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.lar98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.lar98-content p,
.lar98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lar98-content p {
  margin: 0 0 10px;
}

.lar98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.lar98-content li + li {
  margin-top: 4px;
}

.lar98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.lar98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .lar98-main {
    grid-template-columns: 1fr;
  }

  .lar98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .lar98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lar98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function LaravelPage(): JSX.Element {
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
    document.title = `Laravel (Backend) (${activeTabLabel})`
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
      title: 'Laravel (Backend)',
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
    <div className="lar98-help-page">
      <style>{laravelHelpStyles}</style>
      <div className="lar98-window" role="presentation">
        <header className="lar98-titlebar">
          <span className="lar98-title">Laravel (Backend)</span>
          <div className="lar98-title-controls">
            <button
              className="lar98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="lar98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="lar98-tabs" role="tablist" aria-label="Laravel Backend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`lar98-tab ${activeTab === tab.id ? 'lar98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lar98-main">
          <aside className="lar98-toc" aria-label="Table of contents">
            <h2 className="lar98-toc-title">Contents</h2>
            <ul className="lar98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="lar98-toc-item">
                  <a href={`#${section.id}`} className="lar98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lar98-content">
            <h1 className="lar98-doc-title">Laravel (Backend)</h1>
            <p className="lar98-intro">
              This page is a backend-focused overview of Laravel as a full-featured PHP application
              framework. It explains Laravel's routing and middleware model, Eloquent ORM, service
              container, Blade and full-stack support, queue and job workflows, operational
              tradeoffs, and the architectural discipline needed to keep Laravel systems
              maintainable as they grow.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="lar98-overview" className="lar98-section">
                  <h2 className="lar98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="lar98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lar98-divider" />

                <section id="lar98-why" className="lar98-section">
                  <h2 className="lar98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="lar98-divider" />

                <section id="lar98-history" className="lar98-section">
                  <h2 className="lar98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="lar98-divider" />

                <section id="lar98-themes" className="lar98-section">
                  <h2 className="lar98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lar98-divider" />

                <section id="lar98-takeaways" className="lar98-section">
                  <h2 className="lar98-heading">Key Takeaways</h2>
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
                <section id="lar98-signals" className="lar98-section">
                  <h2 className="lar98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-foundations" className="lar98-section">
                  <h2 className="lar98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-features" className="lar98-section">
                  <h2 className="lar98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-runtime" className="lar98-section">
                  <h2 className="lar98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-uses" className="lar98-section">
                  <h2 className="lar98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-compare" className="lar98-section">
                  <h2 className="lar98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-failures" className="lar98-section">
                  <h2 className="lar98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lar98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lar98-checklist" className="lar98-section">
                  <h2 className="lar98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="lar98-section">
                    <h2 className="lar98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="lar98-codebox">
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
              <section id="lar98-glossary" className="lar98-section">
                <h2 className="lar98-heading">Glossary</h2>
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
