import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What Spring Boot is',
    body: 'Spring Boot is an opinionated Java framework layer built on top of the broader Spring ecosystem. It streamlines the creation of backend services and web applications by providing auto-configuration, embedded servers, dependency injection, configuration management, web and data access integration, and production-oriented tooling through one coherent application platform.',
  },
  {
    title: 'Why Spring Boot matters',
    body: 'Spring Boot matters because it made the large Spring ecosystem much easier to adopt for everyday service development. It reduced configuration burden, standardized service structure, and gave Java teams a productive way to build HTTP APIs, enterprise applications, batch processes, and distributed systems while staying inside a mature ecosystem.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Spring Boot is a production-focused application platform rather than only a web framework. It provides a standardized way to wire controllers, services, repositories, configuration, security, data access, and deployment behavior so that a service can move from local development to production operations with less repeated setup work.',
  },
  {
    title: 'Where it fits best',
    body: 'Spring Boot fits best for enterprise services, internal platforms, API backends, business systems, integration-heavy applications, and teams that want strong framework infrastructure, deep Java ecosystem support, and a mature operational model for long-lived services.',
  },
]

const whyItMatters = [
  'It made the broader Spring ecosystem much easier to use for modern service development.',
  'It provides a standardized application model for Java backend teams building long-lived systems.',
  'It integrates web, data, security, configuration, testing, and operations into one framework platform.',
  'It remains a dominant choice for enterprise and business-critical backend applications.',
  'It shaped how many teams think about auto-configuration, embedded servers, and production-ready Java services.',
]

const historicalContext = [
  {
    title: 'Spring existed before Spring Boot',
    detail:
      'The Spring ecosystem was already powerful, but traditional setup often involved substantial manual configuration and boilerplate. Spring Boot emerged to simplify that experience by adding opinionated defaults, embedded server support, and easier application startup.',
  },
  {
    title: 'Auto-configuration changed the developer experience',
    detail:
      'By inferring common framework setup from dependencies and the environment, Spring Boot removed a large amount of repeated configuration. That changed how quickly teams could get a real application running without giving up the broader depth of the Spring ecosystem.',
  },
  {
    title: 'Microservices increased its relevance',
    detail:
      'As organizations adopted service-oriented and microservice architectures, Spring Boot became a common choice because it offered a mature and consistent model for building deployable Java services with strong infrastructure support.',
  },
  {
    title: 'It became the default face of Spring for many teams',
    detail:
      'For many developers, Spring Boot is what they mean when they say Spring in modern backend development. It became the main entry point for building web services and application backends in the Java ecosystem.',
  },
]

const bigPictureThemes = [
  {
    title: 'Infrastructure is part of the framework story',
    body: 'Spring Boot is not trying to be a thin HTTP layer. It provides a broad answer to application startup, configuration, dependency injection, data access, security, and production behavior. Its value comes partly from how much infrastructure it standardizes.',
  },
  {
    title: 'Convention is balanced with enterprise flexibility',
    body: 'Spring Boot offers strong defaults, but it still lives in an ecosystem known for extensive customization. Teams can start quickly and still access deeper framework capabilities when the application requires more control.',
  },
  {
    title: 'Dependency injection shapes architecture',
    body: 'Components, services, repositories, configuration classes, and controllers are generally wired through the Spring container. This pushes teams toward explicit dependency graphs and layered application structure, which can help maintainability when used with discipline.',
  },
  {
    title: 'Production readiness is part of the promise',
    body: 'Spring Boot is designed not only to make code compile and routes respond, but also to support health checks, metrics, configuration, environment-specific behavior, and operational visibility. That production orientation is central to why many teams adopt it.',
  },
]

const keyTakeaways = [
  'Spring Boot is an opinionated Java application platform built on the Spring ecosystem.',
  'Its main strengths are integrated infrastructure, strong defaults, and enterprise-ready service development.',
  'It is especially strong for long-lived backend systems with many operational and integration concerns.',
  'It works best when teams use its dependency-injection and layering model deliberately.',
  'Its convenience is powerful, but clear boundaries, query discipline, and operational visibility still matter.',
]

const topicSignals = [
  {
    title: 'Choose Spring Boot when infrastructure depth matters',
    body: 'If the service needs mature support for configuration, dependency injection, security, persistence, testing, and operations, Spring Boot is often a strong fit.',
  },
  {
    title: 'Choose Spring Boot when services are expected to live a long time',
    body: 'Long-lived internal platforms and enterprise applications often benefit from Spring Boot because it provides a well-understood structure that many engineers and organizations already know how to operate.',
  },
  {
    title: 'Choose Spring Boot when integration-heavy systems are common',
    body: 'Applications that interact with databases, queues, schedulers, auth systems, external APIs, and internal services often benefit from the surrounding Spring ecosystem and the consistency Spring Boot adds on top of it.',
  },
  {
    title: 'Avoid assuming the framework replaces architecture',
    body: 'Spring Boot provides a lot of infrastructure, but teams still need to design module boundaries, transaction rules, data ownership, and operational standards. A mature framework does not automatically make application design mature.',
  },
]

const coreFoundations = [
  {
    title: 'Inversion of control and dependency injection',
    body: 'Spring Boot applications are built around the Spring container, which manages components and injects dependencies. This is central to how services, repositories, configuration objects, and web controllers are structured.',
  },
  {
    title: 'Auto-configuration and starters',
    body: 'A large part of the Spring Boot experience comes from starters and auto-configuration. By adding the right dependencies, teams receive sensible defaults for web stacks, persistence, validation, security, and operational behavior with less manual wiring.',
  },
  {
    title: 'Controllers, services, and repositories',
    body: 'Spring Boot commonly organizes code into layered structures where controllers handle transport concerns, services hold application behavior, and repositories or data components manage persistence interactions. This is not the only possible architecture, but it is one of the most familiar patterns in the ecosystem.',
  },
  {
    title: 'Embedded server model',
    body: 'Spring Boot commonly packages applications with embedded servlet containers so they run as self-contained services rather than requiring separate external app-server deployment. This is part of why it became so popular for modern service development.',
  },
  {
    title: 'Configuration and environment-aware behavior',
    body: 'Profiles, externalized properties, and configuration binding are core parts of the Spring Boot model. This helps applications adapt across environments without rewriting the service for each deployment target.',
  },
]

const frameworkFeatures = [
  {
    title: 'Integrated starters and ecosystem modules',
    body: 'Spring Boot starters reduce dependency selection friction and give teams predictable baseline integration for web servers, data access, validation, security, messaging, and testing. This is one of the main reasons the framework feels productive despite the depth of the broader Spring ecosystem.',
  },
  {
    title: 'Production-oriented operational tooling',
    body: 'Health endpoints, metrics integration, configuration profiles, and operational hooks are part of the normal Spring Boot story. This makes it easier to build services that are not only functional but also observable and controllable in production.',
  },
  {
    title: 'Validation and structured request handling',
    body: 'Spring Boot applications commonly use typed request objects, annotations, validation, and controller advice to standardize request processing and error handling. This helps transport boundaries stay explicit when the team applies the patterns consistently.',
  },
  {
    title: 'Security and data access integration',
    body: 'Spring Boot fits naturally with Spring Security, Spring Data, transactional boundaries, and other infrastructure layers that many enterprise applications need. This is a major part of its platform value.',
  },
  {
    title: 'Testing support across layers',
    body: 'The framework ecosystem supports controller tests, slice tests, integration tests, and full application tests in a relatively standardized way, which helps large teams test framework-managed behavior consistently.',
  },
]

const runtimeAndOperations = [
  {
    title: 'The JVM and application profile matter',
    body: 'Spring Boot services inherit the operational characteristics of the JVM, including startup behavior, memory profile, garbage collection tradeoffs, and deployment tuning. Understanding the runtime matters just as much as understanding the framework annotations.',
  },
  {
    title: 'Auto-configuration should still be understood',
    body: 'Auto-configuration is a productivity feature, but teams still need to know what has been configured and why. Otherwise, debugging security, persistence, serialization, or request behavior becomes harder than it needs to be.',
  },
  {
    title: 'Data access and transactions need discipline',
    body: 'Spring Boot makes data access convenient through JPA and repository patterns, but careless transaction boundaries, lazy loading, or query design can still create surprising runtime behavior. Framework convenience does not remove the need for careful persistence design.',
  },
  {
    title: 'Operational maturity is broader than health checks',
    body: 'Production-quality services still require logging strategy, distributed tracing, metrics, retry policy, resilience design, and deployment discipline. Spring Boot provides tools for these concerns, but the team must still define the actual standards.',
  },
]

const ecosystemUses = [
  {
    title: 'Enterprise and business-critical APIs',
    body: 'Spring Boot is widely used for long-lived business services, internal APIs, and systems where stability, integration support, and operational standards are essential.',
  },
  {
    title: 'Internal platforms and integration services',
    body: 'Applications that connect databases, queues, identity systems, third-party services, and internal infrastructure often benefit from the breadth of the Spring ecosystem and the consistency Spring Boot adds on top.',
  },
  {
    title: 'Regulated or operationally mature environments',
    body: 'Teams working in environments with strong security, deployment, audit, or operational requirements often prefer Spring Boot because of its maturity and the number of established patterns around it.',
  },
  {
    title: 'Organizations standardized on Java backend delivery',
    body: 'Many organizations use Spring Boot as the default model for backend services so engineers can move between systems that share similar configuration, layering, and operational conventions.',
  },
]

const comparisons = [
  {
    title: 'Spring Boot versus NestJS or ASP.NET Core',
    body: 'All three frameworks emphasize structured backend architecture, dependency injection, and production-oriented service design. Spring Boot is generally the most rooted in the Java enterprise ecosystem, while NestJS targets TypeScript teams and ASP.NET Core targets the .NET ecosystem.',
  },
  {
    title: 'Spring Boot versus Rails or Laravel',
    body: 'Rails and Laravel often emphasize product velocity and convention-heavy application development, while Spring Boot often emphasizes enterprise integration depth, infrastructure maturity, and a broader Java operations culture. Each can be productive, but they optimize for somewhat different team contexts.',
  },
  {
    title: 'Spring Boot versus minimalist web frameworks',
    body: 'Thin frameworks often give teams more freedom and less ceremony at the start. Spring Boot gives teams more infrastructure and stronger default structure. The tradeoff is between low setup overhead and broader integrated platform capability.',
  },
  {
    title: 'Spring Boot versus plain Spring without Boot',
    body: 'Plain Spring gives more manual control but also more setup burden. Spring Boot became popular because most teams benefit from faster startup through defaults and auto-configuration rather than from assembling every piece manually.',
  },
]

const failureModes = [
  {
    title: 'Relying on auto-configuration without understanding it',
    body: 'Auto-configuration accelerates development, but if a team does not understand what has been configured, debugging can become painful. Productive defaults should still be inspectable and intentional.',
  },
  {
    title: 'Creating overly large service and repository layers',
    body: 'Layered architecture can improve structure, but it can also become a habit that produces bloated services, thin pass-through layers, and unclear ownership if teams are not deliberate about boundaries.',
  },
  {
    title: 'Ignoring query and transaction behavior',
    body: 'JPA and repository convenience can hide expensive queries, lazy-loading surprises, and transactional coupling. Teams need to understand persistence behavior explicitly rather than assuming annotations make it safe by default.',
  },
  {
    title: 'Treating the framework as the architecture',
    body: 'Spring Boot gives strong infrastructure, but the application still needs domain boundaries, service contracts, and sensible module ownership. Framework maturity does not replace software design.',
  },
  {
    title: 'Using enterprise ceremony where it is not needed',
    body: 'For very small services, Spring Boot can feel heavier than simpler frameworks. Teams should adopt it because its infrastructure and conventions help them, not because more framework depth automatically improves the outcome.',
  },
]

const studyChecklist = [
  'Understand Spring Boot as an application platform layered over the broader Spring ecosystem.',
  'Learn dependency injection, auto-configuration, and controller-service-repository structure clearly.',
  'Treat configuration, profiles, and operations as first-class parts of the service design.',
  'Use data access abstractions productively, but keep query and transaction behavior visible.',
  'Remember that the JVM and deployment model still shape production behavior strongly.',
  'Adopt framework conventions intentionally instead of assuming defaults always equal good architecture.',
]

const examples = [
  {
    id: 'spring98-example-controller',
    title: 'Example: REST controller and service',
    area: 'Layered HTTP Flow',
    intro:
      "A typical Spring Boot endpoint uses a controller for transport concerns and a service for application behavior. This is one of the framework's most recognizable structural patterns.",
    whyFit:
      'This captures the controller-service split that many Spring Boot teams rely on for clarity.',
    code: `@RestController
@RequestMapping("/orders")
class OrderController(private val service: OrderService) {

    @GetMapping("/{id}")
    fun findOne(@PathVariable id: Long): OrderDto =
        service.findOne(id)
}`,
    takeaway:
      'Spring Boot is easiest to maintain when transport handling stays thin and business behavior lives in focused services.',
  },
  {
    id: 'spring98-example-configuration',
    title: 'Example: Configuration properties binding',
    area: 'Configuration',
    intro:
      'External configuration is a core part of the Spring Boot model. Typed configuration binding helps services keep environment-specific values organized and explicit.',
    whyFit:
      'This shows how the framework treats configuration as part of the normal application design rather than as scattered string lookup.',
    code: `@ConfigurationProperties(prefix = "billing")
data class BillingProperties(
    val timeoutMs: Long,
    val baseUrl: String,
)`,
    takeaway:
      'Typed configuration improves maintainability because operational values become part of the application contract rather than hidden environment trivia.',
  },
  {
    id: 'spring98-example-repository',
    title: 'Example: Repository-based data access',
    area: 'Persistence',
    intro:
      'Spring Boot applications often express data access through repositories and JPA entities so common query behavior is concise and framework-integrated.',
    whyFit:
      'This demonstrates both the productivity and the abstraction layer that many Spring Boot systems rely on.',
    code: `interface OrderRepository : JpaRepository<OrderEntity, Long> {
    fun findByStatus(status: OrderStatus): List<OrderEntity>
}`,
    takeaway:
      'Repository abstractions can be productive, but teams still need to understand what SQL and transaction behavior they imply.',
  },
  {
    id: 'spring98-example-validation',
    title: 'Example: Request validation',
    area: 'Boundary Handling',
    intro:
      'Spring Boot commonly validates request objects near the transport boundary so malformed inputs do not leak deeply into the service layer.',
    whyFit:
      'This reflects how the framework standardizes structured request handling and validation.',
    code: `data class CreateUserRequest(
    @field:NotBlank val name: String,
    @field:Email val email: String,
)

@PostMapping
fun create(@Valid @RequestBody request: CreateUserRequest)`,
    takeaway:
      'Validation works best when request contracts are explicit and enforced before deeper application logic runs.',
  },
  {
    id: 'spring98-example-actuator',
    title: 'Example: Health endpoint exposure',
    area: 'Operations',
    intro:
      'Operational readiness is part of the Spring Boot story. Health and metrics support are often wired in with minimal code because the framework expects production visibility to matter.',
    whyFit:
      'This highlights that the framework is concerned with service operations, not only request handling.',
    code: `management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always`,
    takeaway:
      'Operational features are most useful when they are part of a deliberate monitoring strategy rather than simply enabled and forgotten.',
  },
]

const glossary = [
  {
    term: 'Spring Boot',
    definition:
      'An opinionated Java application platform built on top of the Spring ecosystem for backend services and web applications.',
  },
  {
    term: 'Auto-configuration',
    definition:
      "Spring Boot's mechanism for configuring framework behavior automatically based on dependencies and environment.",
  },
  {
    term: 'Starter',
    definition:
      'A curated dependency bundle that enables a common Spring Boot capability with sensible defaults.',
  },
  {
    term: 'Dependency injection',
    definition:
      'The framework pattern where the Spring container wires components together based on configuration and type information.',
  },
  {
    term: 'Controller',
    definition: 'A web-layer component that handles incoming HTTP requests and returns responses.',
  },
  {
    term: 'Service',
    definition:
      'An application-layer component commonly used for business behavior in Spring Boot applications.',
  },
  {
    term: 'Repository',
    definition:
      'A persistence-facing abstraction often used with Spring Data to manage data access operations.',
  },
  {
    term: 'Profile',
    definition:
      'A named environment mode used to vary Spring Boot configuration across deployment contexts.',
  },
  {
    term: 'Actuator',
    definition:
      "Spring Boot's operational feature set for health checks, metrics, and management endpoints.",
  },
  {
    term: 'Embedded server',
    definition:
      'A servlet container packaged inside the application so the service can run as a self-contained process.',
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
    { id: 'spring98-overview', label: 'Overview' },
    { id: 'spring98-why', label: 'Why It Matters' },
    { id: 'spring98-history', label: 'Historical Context' },
    { id: 'spring98-themes', label: 'Big Picture Themes' },
    { id: 'spring98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'spring98-signals', label: 'Topic Signals' },
    { id: 'spring98-foundations', label: 'Foundations' },
    { id: 'spring98-features', label: 'Framework Features' },
    { id: 'spring98-runtime', label: 'Runtime and Operations' },
    { id: 'spring98-uses', label: 'Ecosystem Uses' },
    { id: 'spring98-compare', label: 'Compare and Contrast' },
    { id: 'spring98-failures', label: 'Failure Modes' },
    { id: 'spring98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'spring98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const springHelpStyles = `
.spring98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.spring98-window {
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

.spring98-titlebar {
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

.spring98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.spring98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.spring98-control {
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

.spring98-control:focus-visible,
.spring98-tab:focus-visible,
.spring98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.spring98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.spring98-tab {
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

.spring98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.spring98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.spring98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.spring98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.spring98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.spring98-toc-item + .spring98-toc-item {
  margin-top: 8px;
}

.spring98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.spring98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.spring98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.spring98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.spring98-section {
  margin: 0 0 22px;
}

.spring98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.spring98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.spring98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.spring98-content p,
.spring98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.spring98-content p {
  margin: 0 0 10px;
}

.spring98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.spring98-content li + li {
  margin-top: 4px;
}

.spring98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.spring98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .spring98-main {
    grid-template-columns: 1fr;
  }

  .spring98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .spring98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spring98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function SpringBootPage(): JSX.Element {
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
    document.title = `Spring Boot (Backend) (${activeTabLabel})`
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
      title: 'Spring Boot (Backend)',
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
    <div className="spring98-help-page">
      <style>{springHelpStyles}</style>
      <div className="spring98-window" role="presentation">
        <header className="spring98-titlebar">
          <span className="spring98-title">Spring Boot (Backend)</span>
          <div className="spring98-title-controls">
            <button
              className="spring98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="spring98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="spring98-tabs" role="tablist" aria-label="Spring Boot Backend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`spring98-tab ${activeTab === tab.id ? 'spring98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="spring98-main">
          <aside className="spring98-toc" aria-label="Table of contents">
            <h2 className="spring98-toc-title">Contents</h2>
            <ul className="spring98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="spring98-toc-item">
                  <a href={`#${section.id}`} className="spring98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="spring98-content">
            <h1 className="spring98-doc-title">Spring Boot (Backend)</h1>
            <p className="spring98-intro">
              This page is a backend-focused overview of Spring Boot as an opinionated Java
              application platform. It explains dependency injection, auto-configuration, layered
              request handling, configuration and profiles, operational tooling, and the
              architectural discipline needed to keep Spring Boot services clear as they grow.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="spring98-overview" className="spring98-section">
                  <h2 className="spring98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="spring98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="spring98-divider" />

                <section id="spring98-why" className="spring98-section">
                  <h2 className="spring98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="spring98-divider" />

                <section id="spring98-history" className="spring98-section">
                  <h2 className="spring98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="spring98-divider" />

                <section id="spring98-themes" className="spring98-section">
                  <h2 className="spring98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="spring98-divider" />

                <section id="spring98-takeaways" className="spring98-section">
                  <h2 className="spring98-heading">Key Takeaways</h2>
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
                <section id="spring98-signals" className="spring98-section">
                  <h2 className="spring98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-foundations" className="spring98-section">
                  <h2 className="spring98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-features" className="spring98-section">
                  <h2 className="spring98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-runtime" className="spring98-section">
                  <h2 className="spring98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-uses" className="spring98-section">
                  <h2 className="spring98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-compare" className="spring98-section">
                  <h2 className="spring98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-failures" className="spring98-section">
                  <h2 className="spring98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="spring98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="spring98-checklist" className="spring98-section">
                  <h2 className="spring98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="spring98-section">
                    <h2 className="spring98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="spring98-codebox">
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
              <section id="spring98-glossary" className="spring98-section">
                <h2 className="spring98-heading">Glossary</h2>
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
