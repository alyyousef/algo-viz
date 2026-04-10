import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Angular is',
    body: 'Angular is a frontend application framework built around components, templates, dependency injection, routing, forms, reactive patterns, and a strongly structured development model. It is designed to help teams build large client-side applications with a coherent architecture rather than assembling everything from separate libraries.',
  },
  {
    title: 'Why Angular matters',
    body: 'Angular matters because it became one of the defining framework-driven approaches to large-scale frontend development. It offered a comprehensive application model for TypeScript-heavy teams that wanted structure, tooling, testing support, and strong conventions rather than a thinner view library plus many surrounding decisions.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Angular is a frontend platform, not just a rendering library. It gives teams a standard way to think about components, templates, services, dependency injection, routing, forms, change detection, and application-wide organization. That breadth is a strength when consistency matters more than minimal ceremony.',
  },
  {
    title: 'Where it fits best',
    body: 'Angular fits best for medium to large frontend applications, internal dashboards, enterprise interfaces, multi-team web apps, and projects where strong structure, TypeScript integration, and framework-level consistency matter more than a lightweight initial learning curve.',
  },
]

const whyItMatters = [
  'It provides a full application framework rather than only a UI rendering layer.',
  'It gives teams consistent patterns for components, services, routing, forms, and dependency injection.',
  'It became a major choice for large TypeScript-heavy frontend codebases.',
  'It supports enterprise-style frontend architecture with strong tooling and conventions.',
  'It remains a major reference point when comparing structured frontend frameworks.',
]

const historicalContext = [
  {
    title: 'Angular evolved from an earlier AngularJS era',
    detail:
      'Modern Angular is not simply a small update to AngularJS. It was a major redesign that adopted a component model, TypeScript, stronger tooling, and a more explicit framework architecture for large applications.',
  },
  {
    title: 'Framework structure became a feature, not a side effect',
    detail:
      'As frontend applications became larger and more stateful, teams increasingly wanted stronger structure rather than only small UI libraries. Angular positioned itself as a framework that could provide that structure directly.',
  },
  {
    title: 'TypeScript adoption reinforced Angulars appeal',
    detail:
      'Angular became particularly attractive to teams that wanted a typed frontend environment with decorators, classes, dependency injection, and an opinionated build and tooling story. This fit many enterprise engineering cultures well.',
  },
  {
    title: 'It competed by offering breadth rather than minimalism',
    detail:
      'While some frontend ecosystems emphasized choosing separate libraries for routing, state, forms, and data flow, Angular offered a more integrated answer. That made it appealing to teams that preferred a single consistent framework worldview.',
  },
]

const bigPictureThemes = [
  {
    title: 'Angular is framework-first',
    body: 'Angular does not try to stay small at all costs. It aims to give teams a coherent framework model for frontend applications. This can reduce inconsistency and decision fatigue, but it also means developers need to learn more framework concepts up front.',
  },
  {
    title: 'Dependency injection shapes client architecture',
    body: 'Services and dependency injection are central to how Angular encourages shared logic, data access, and application coordination. This gives teams stronger patterns for organization, but it also requires clear service boundaries and thoughtful state ownership.',
  },
  {
    title: 'Templates and reactive data flow matter together',
    body: 'Angular applications are not only about component classes. Templates, bindings, RxJS streams, forms, and change detection all interact. Teams need to understand these interactions instead of treating the template layer as a passive view over arbitrary code.',
  },
  {
    title: 'Consistency is one of the main tradeoffs',
    body: 'Angular often feels heavier than lighter frontend stacks on small projects, but larger teams frequently accept that because consistent architecture, conventions, and tooling can be more valuable than minimal setup once the application grows.',
  },
]

const keyTakeaways = [
  'Angular is a full frontend framework centered on components, templates, services, routing, and dependency injection.',
  'Its main value is strong application structure rather than minimal ceremony.',
  'It is often a strong fit for large, long-lived TypeScript-heavy frontend applications.',
  'It works best when teams adopt its framework model deliberately rather than partially.',
  'Its productivity comes from consistency, but teams still need clear state and service boundaries.',
]

const topicSignals = [
  {
    title: 'Choose Angular when frontend consistency matters',
    body: 'If the team wants one framework to define components, routing, forms, DI, HTTP access, and project structure in a consistent way, Angular is a strong candidate.',
  },
  {
    title: 'Choose Angular when TypeScript is central to the team',
    body: 'Angular is particularly attractive to teams that prefer a strongly typed frontend environment and are comfortable with class-based, decorator-driven framework patterns.',
  },
  {
    title: 'Choose Angular when the application will grow',
    body: 'Large admin surfaces, enterprise dashboards, workflow-heavy interfaces, and multi-team apps often benefit from Angular because structure and consistency become more important as the frontend scales.',
  },
  {
    title: 'Avoid adopting Angular for tiny projects by reflex',
    body: 'A very small application may not need the full framework surface. Angular should be chosen because its structure solves real coordination and maintainability problems, not only because it offers more features.',
  },
]

const coreFoundations = [
  {
    title: 'Components and templates',
    body: 'Angular applications are built from components whose templates define view structure and bindings. Understanding how component classes, template expressions, inputs, outputs, and structural directives work together is essential to reasoning about Angular code.',
  },
  {
    title: 'Services and dependency injection',
    body: 'Angular uses dependency injection to provide shared services, data access layers, and utility abstractions to components and other services. This is a major part of how application structure stays organized across larger codebases.',
  },
  {
    title: 'Routing and navigation',
    body: 'The router is a first-class part of Angular rather than a separate afterthought. Route configuration, guards, lazy loading, and nested outlets are central to how larger Angular applications are organized.',
  },
  {
    title: 'RxJS and reactive patterns',
    body: 'Angular commonly uses observables and reactive patterns for HTTP data, event streams, forms, and component interactions. This gives the framework a powerful asynchronous model, but it also increases the conceptual surface developers need to understand.',
  },
  {
    title: 'Change detection and application state',
    body: 'Angular updates views through its change-detection model. Teams need to understand how change detection, async updates, component boundaries, and state flow interact if they want the application to stay predictable and performant.',
  },
]

const frameworkFeatures = [
  {
    title: 'Integrated routing, forms, and HTTP patterns',
    body: 'Angular provides first-class framework support for routing, forms, HTTP access, and dependency injection. This reduces the need to assemble a separate stack for each concern and helps teams standardize how applications are built.',
  },
  {
    title: 'CLI and workspace conventions',
    body: 'Angular tooling provides scaffolding, build configuration, testing setup, and code-generation workflows. This matters because it lowers coordination cost across larger teams by keeping project structure and common tasks predictable.',
  },
  {
    title: 'Standalone and modular composition patterns',
    body: 'Angular applications can be organized through modules and, in newer patterns, standalone components and related APIs. Regardless of exact style, the framework still encourages deliberate boundaries rather than ad hoc component sprawl.',
  },
  {
    title: 'Validation and forms infrastructure',
    body: 'Template-driven and reactive forms give Angular a strong story for complex data-entry interfaces. This makes it especially attractive for dashboards, admin surfaces, and workflow applications with substantial form logic.',
  },
  {
    title: 'Testing and architectural tooling',
    body: 'Because Angular provides consistent abstractions around components, services, and dependency injection, it can also support a relatively standardized approach to unit and integration testing across the codebase.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Bundle size and startup behavior matter',
    body: 'Angular applications bring significant framework capability, but that also means teams need to pay attention to bundle size, route splitting, lazy loading, and startup behavior so the application remains fast enough for users.',
  },
  {
    title: 'RxJS power can become complexity',
    body: 'Reactive streams can be an elegant way to model UI and data flow, but they can also make code harder to reason about when observables, subscriptions, and stream transformations are used without clear ownership or lifecycle discipline.',
  },
  {
    title: 'Change detection and rendering need understanding',
    body: 'Angular gives teams a predictable rendering model, but performance and correctness still depend on understanding when change detection runs, how state updates propagate, and where expensive work should live.',
  },
  {
    title: 'Operational frontend quality still needs standards',
    body: 'Error reporting, analytics, performance monitoring, route-level loading behavior, caching strategy, and deployment discipline remain important even in a strongly structured framework. Angular provides architecture, not automatic UX quality.',
  },
]

const ecosystemUses = [
  {
    title: 'Enterprise dashboards and internal tools',
    body: 'Angular is especially common in admin systems, internal platforms, and data-heavy interfaces where consistent structure and long-term maintainability are more important than minimal initial setup.',
  },
  {
    title: 'Large product frontends',
    body: 'Applications with many routes, teams, forms, permissions, and service integrations often benefit from Angular because the framework standardizes more of the application surface.',
  },
  {
    title: 'TypeScript-heavy frontend organizations',
    body: 'Teams that prefer a strongly typed frontend environment and more framework-driven architecture often choose Angular because it aligns well with those engineering preferences.',
  },
  {
    title: 'Workflow-oriented applications',
    body: 'Angular works well for interfaces built around stepwise forms, approval flows, data entry, reporting, and operational processes where consistency and form handling are central.',
  },
]

const comparisons = [
  {
    title: 'Angular versus React',
    body: 'React is typically a UI library that leaves more stack choices to the application, while Angular offers a fuller framework with routing, DI, forms, and stronger default structure. The tradeoff is flexibility and ecosystem choice versus integrated consistency.',
  },
  {
    title: 'Angular versus Vue',
    body: 'Vue often feels lighter and more incrementally adoptable, while Angular emphasizes a broader, more formalized application architecture. Angular tends to fit teams that want stronger framework conventions from the start.',
  },
  {
    title: 'Angular versus Svelte',
    body: 'Svelte emphasizes compilation-driven simplicity and a lighter runtime feel, while Angular emphasizes broad framework infrastructure and a more standardized frontend platform. They optimize for different team and application shapes.',
  },
  {
    title: 'Angular versus thin library assembly',
    body: 'A team can build a large frontend by composing many smaller libraries, but then it must define and enforce all the architectural conventions itself. Angular is attractive when the framework-supplied structure is part of the value proposition.',
  },
]

const failureModes = [
  {
    title: 'Using services as unbounded global buckets',
    body: 'Dependency injection is powerful, but teams can misuse services as large catch-all objects for unrelated state and behavior. This makes dependency graphs harder to understand and weakens application boundaries.',
  },
  {
    title: 'Overcomplicating the app with reactive patterns',
    body: 'RxJS can be elegant, but not every interaction needs a complex stream pipeline. Overusing observables and transformation chains can make the code harder to read than the problem requires.',
  },
  {
    title: 'Ignoring change-detection and rendering costs',
    body: 'Framework structure does not prevent inefficient rendering or unnecessary recalculation. Teams still need to think about component boundaries, data flow, and when UI updates actually occur.',
  },
  {
    title: 'Treating Angular as only component syntax',
    body: 'Teams sometimes learn components and templates but ignore routing, forms, DI, and broader architectural patterns. That usually leads to partial adoption of the framework without getting the consistency benefits it is supposed to provide.',
  },
  {
    title: 'Choosing the framework for ceremony rather than fit',
    body: 'Angular can be very effective, but if a project does not benefit from its structure, the framework may feel heavier than necessary. It should be chosen because the application and team need strong framework-level consistency.',
  },
]

const studyChecklist = [
  'Understand Angular as a full frontend framework rather than only as a component syntax.',
  'Learn how components, templates, services, routing, and forms fit together in the framework model.',
  'Use dependency injection to support clear service boundaries, not broad shared-state dumping grounds.',
  'Understand enough RxJS and change detection to reason about asynchronous UI behavior clearly.',
  'Be deliberate about route organization, lazy loading, and bundle size as the app grows.',
  'Adopt the framework because its consistency helps the team, not simply because it offers more surface area.',
]

const examples = [
  {
    id: 'ang98-example-component',
    title: 'Example: Component with template binding',
    area: 'Components',
    intro:
      'A basic Angular component shows how the framework combines a class and a template to create a coherent UI unit.',
    whyFit: 'This captures the most visible entry point into the Angular programming model.',
    code: `@Component({
  selector: 'app-counter',
  template: '<button (click)="count = count + 1">Count: {{ count }}</button>',
})
export class CounterComponent {
  count = 0
}`,
    takeaway:
      'Angular components are not only classes or only templates; the framework expects both to work together as one UI unit.',
  },
  {
    id: 'ang98-example-service',
    title: 'Example: Injectable service',
    area: 'Dependency Injection',
    intro:
      'Angular uses injectable services to hold shared logic and data access so components do not have to own every concern directly.',
    whyFit:
      'This demonstrates one of the most important structural ideas in larger Angular applications.',
    code: `@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Order[]>('/api/orders')
  }
}`,
    takeaway:
      'Services are most helpful when they give components cleaner boundaries rather than simply moving clutter into another file.',
  },
  {
    id: 'ang98-example-router',
    title: 'Example: Route configuration',
    area: 'Routing',
    intro:
      'The Angular router is part of the core framework story and is often central to how larger applications are structured.',
    whyFit: 'This reflects that route organization is not a side concern in Angular applications.',
    code: `export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
]`,
    takeaway:
      'Route design shapes application structure early, so Angular teams usually benefit from treating the router as architecture rather than only navigation syntax.',
  },
  {
    id: 'ang98-example-reactive-form',
    title: 'Example: Reactive form setup',
    area: 'Forms',
    intro:
      'Reactive forms are one of Angulars strongest built-in features for structured data-entry interfaces and validation-heavy UIs.',
    whyFit: 'This shows why Angular is often comfortable in admin and workflow applications.',
    code: `form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  name: ['', Validators.required],
})`,
    takeaway:
      'Angular forms are powerful because the framework gives them structure, but that structure only pays off when the form model stays clear and intentional.',
  },
  {
    id: 'ang98-example-observable',
    title: 'Example: Observable-driven data flow',
    area: 'Reactive Patterns',
    intro:
      'Angular often models asynchronous data through observables so components can react to changing data over time instead of managing every update imperatively.',
    whyFit:
      'This captures the frameworks common reactive style without requiring a massive code sample.',
    code: `orders$ = this.ordersService.list().pipe(
  map((orders) => orders.filter((order) => order.open)),
)`,
    takeaway:
      'Reactive streams can be elegant, but teams should keep them readable and avoid turning every simple interaction into a complex pipeline.',
  },
]

const glossary = [
  {
    term: 'Angular',
    definition:
      'A full frontend framework for building structured client-side applications with TypeScript, components, routing, and dependency injection.',
  },
  {
    term: 'Component',
    definition: 'A core Angular UI unit that combines a class, template, and metadata.',
  },
  {
    term: 'Template',
    definition:
      'The declarative HTML-like view layer used by Angular components for bindings and directives.',
  },
  {
    term: 'Service',
    definition:
      'An injectable class typically used for shared logic, state coordination, or data access in Angular applications.',
  },
  {
    term: 'Dependency injection',
    definition:
      'The framework mechanism that provides services and other dependencies to components and other classes.',
  },
  {
    term: 'RxJS',
    definition:
      'A reactive programming library commonly used by Angular for observables and asynchronous stream handling.',
  },
  {
    term: 'Reactive form',
    definition:
      'An Angular form model built in code with explicit structure and validator configuration.',
  },
  {
    term: 'Route guard',
    definition: 'A router-level hook used to control navigation based on application conditions.',
  },
  {
    term: 'Change detection',
    definition:
      'Angulars mechanism for deciding when and how view bindings should update in response to state changes.',
  },
  {
    term: 'Lazy loading',
    definition:
      'A code-splitting approach where Angular loads route or feature code only when it is needed.',
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
    { id: 'ang98-overview', label: 'Overview' },
    { id: 'ang98-why', label: 'Why It Matters' },
    { id: 'ang98-history', label: 'Historical Context' },
    { id: 'ang98-themes', label: 'Big Picture Themes' },
    { id: 'ang98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'ang98-signals', label: 'Topic Signals' },
    { id: 'ang98-foundations', label: 'Foundations' },
    { id: 'ang98-features', label: 'Framework Features' },
    { id: 'ang98-runtime', label: 'Runtime and Operations' },
    { id: 'ang98-uses', label: 'Ecosystem Uses' },
    { id: 'ang98-compare', label: 'Compare and Contrast' },
    { id: 'ang98-failures', label: 'Failure Modes' },
    { id: 'ang98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'ang98-glossary', label: 'Terms' }],
}

export default function AngularPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Angular (Frontend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Angular (Frontend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Angular (Frontend)</h1>
      <p className="ang98-intro">
        This page is a frontend-focused overview of Angular as a structured application framework.
        It explains components, templates, services, dependency injection, routing, RxJS, forms,
        operational tradeoffs, and the architectural discipline needed to keep Angular applications
        clear as they grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="ang98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="ang98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="ang98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="ang98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="ang98-takeaways" className="bin98-section">
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
          <section id="ang98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="ang98-checklist" className="bin98-section">
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
        <section id="ang98-glossary" className="bin98-section">
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
