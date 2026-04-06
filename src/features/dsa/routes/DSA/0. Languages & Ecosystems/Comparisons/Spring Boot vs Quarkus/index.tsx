import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Spring Boot and Quarkus are both Java frameworks for building backend services, APIs, and cloud applications, but they optimize for slightly different defaults. Spring Boot emphasizes a massive ecosystem, familiar Spring programming models, auto-configuration, starter dependencies, and a mature enterprise development experience. Quarkus emphasizes build-time optimization, very fast startup, low memory usage, developer tooling geared toward hot reload, and strong alignment with container and native-image deployment.',
      'That means the practical question is not which framework can expose REST endpoints or talk to a database. Both can. The more useful question is whether the team benefits more from Spring Boot\'s ecosystem breadth and conventional enterprise familiarity or from Quarkus\'s build-time model, fast developer loop, and stronger native-image posture.',
      'The original page scope was placeholder content for Spring Boot vs Quarkus, with planned notes on overview, key ideas, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style page keeps that scope and expands it into a fuller technical reference.',
    ],
  },
  {
    id: 'bp-spring-boot',
    title: 'When Spring Boot Fits Better',
    paragraphs: [
      'Spring Boot is often the stronger choice when the team already lives in the Spring ecosystem, needs access to the broadest range of integrations, or values mature conventions for dependency injection, data access, security, messaging, scheduling, and operations. It is especially attractive in organizations where Spring knowledge is already widespread and where long-term maintainability depends on hiring from a large Java talent pool.',
      'It also fits very well when the application is not constrained primarily by cold-start time or native-image pressure. A conventional JVM deployment with Spring Boot often delivers an excellent tradeoff between productivity, ecosystem support, and runtime capability.',
    ],
  },
  {
    id: 'bp-quarkus',
    title: 'When Quarkus Fits Better',
    paragraphs: [
      'Quarkus is often the stronger choice when fast startup, lower memory footprint, build-time optimization, and container-first or native-executable deployment are central requirements. It is especially attractive for platform teams building microservices that may scale aggressively, start frequently, or benefit from tighter resource efficiency in cloud environments.',
      'It also appeals to teams that like Jakarta and CDI style programming but want a framework designed from the beginning around build-time augmentation and modern cloud deployment assumptions rather than around a large runtime reflection-heavy heritage.',
    ],
  },
  {
    id: 'bp-same-goal',
    title: 'Same Goal, Different Runtime Philosophy',
    paragraphs: [
      'Both frameworks want to make Java productive for service development. Both support REST, dependency injection, configuration, health checks, data access, testing, and cloud deployment. Both can run on the JVM, integrate with major databases, and expose production-ready services.',
      'The deeper difference is philosophy. Spring Boot makes a broad ecosystem easy to consume through auto-configuration and starters. Quarkus tries to move more framework work to build time so that runtime startup and memory behavior are improved, especially for native-image scenarios.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to reduce the comparison to startup benchmarks. Startup and memory matter, but so do team familiarity, extension quality, library compatibility, observability, migration cost, testing habits, deployment model, and the likelihood that the application will actually use native executables in production.',
      'Another mistake is to assume that Spring Boot means slow and Quarkus means only native. Spring Boot supports AOT and native-image workflows, and Quarkus runs well on the JVM too. The real comparison is about framework defaults, ecosystem gravity, and the amount of operational value the build-time model actually creates for the product.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Spring Boot when ecosystem breadth, organizational familiarity, and mature enterprise defaults matter most.',
      'Choose Quarkus when build-time optimization, fast startup, and container or native deployment characteristics matter enough to justify the ecosystem tradeoff.',
      'If the team is unsure, Spring Boot is often the conservative default. If the platform has strong cloud efficiency goals and the team is willing to align with Quarkus patterns, Quarkus becomes much more compelling.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both frameworks solve the same broad class of problems: create HTTP APIs, inject dependencies, bind configuration, connect to databases, expose metrics and health checks, and package applications for modern deployment environments.',
      'That means neither framework is missing the basics. The meaningful decision points are not whether one can serve JSON or run with Maven. The meaningful decision points are how each framework structures development, optimizes startup, composes libraries, and behaves in cloud operations.',
    ],
  },
  {
    id: 'core-programming-model',
    title: 'Programming Model',
    paragraphs: [
      'Spring Boot sits on top of the wider Spring ecosystem. The programming model revolves around annotations, dependency injection, auto-configuration, starters, and libraries such as Spring MVC, Spring WebFlux, Spring Data, Spring Security, and Actuator. Many teams already know those abstractions deeply, which shortens onboarding when staying inside the Spring world.',
      'Quarkus is built around extensions, Jakarta standards, CDI through ArC, configuration, and build-time augmentation. It can feel familiar to Jakarta EE or MicroProfile oriented teams, while also offering opinionated conveniences such as RESTEasy Reactive and Panache. The experience is modern and productive, but it is not simply Spring with faster startup.',
    ],
  },
  {
    id: 'core-auto-config',
    title: 'Auto-configuration vs Build-Time Augmentation',
    paragraphs: [
      'Spring Boot\'s signature productivity feature is auto-configuration. If the right classes are on the classpath and the application has not already provided its own bean, Boot can automatically configure a large amount of infrastructure. That is why adding a starter dependency often turns on a working feature with very little explicit setup.',
      'Quarkus is more strongly defined by build-time augmentation. Extensions analyze and prepare application behavior during the build so that runtime work is reduced. This matters because startup speed, memory footprint, and native-image compatibility all benefit when the framework can push more processing earlier in the lifecycle.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Breadth',
    paragraphs: [
      'Spring Boot has one of the deepest ecosystems in enterprise Java. There are mature first-party and community options for security, data access, messaging, batch processing, cloud integration, testing slices, and operational tooling. That breadth lowers integration risk, especially for large organizations and heterogeneous legacy environments.',
      'Quarkus has a strong and growing extension ecosystem, but it is still narrower. The relevant question is not whether Quarkus has extensions, because it does. The relevant question is whether the exact stack your application depends on is equally mature, equally supported, and equally well-documented there compared with Spring Boot.',
    ],
  },
  {
    id: 'core-dev-loop',
    title: 'Developer Experience and Live Reload',
    paragraphs: [
      'Spring Boot has a familiar and productive developer experience, especially when combined with IDE support, DevTools, and the broader Spring ecosystem. The workflow is mature and predictable, and most Java teams can become productive quickly.',
      'Quarkus places exceptional emphasis on development mode. The official tooling supports `quarkus:dev`, hot deployment, rapid iteration, and even a Dev UI. This often makes Quarkus feel unusually responsive for Java development, especially when teams are iterating on endpoints, configuration, and data models.',
    ],
  },
  {
    id: 'core-native',
    title: 'JVM Runtime vs Native-Image Story',
    paragraphs: [
      'Spring Boot supports GraalVM native-image workflows and AOT processing, so it is no longer accurate to frame it as JVM-only. However, much of Spring\'s heritage was built in a world where broad runtime flexibility was more important than native compilation constraints, so native workflows often require more deliberate attention.',
      'Quarkus was designed with native executables much closer to the center of its identity. Even when running on the JVM, many of its design choices reflect the goal of minimizing runtime work. That does not mean every Quarkus application should become native, but it does mean the framework generally feels more aligned with that deployment style.',
    ],
  },
  {
    id: 'core-startup-memory',
    title: 'Startup Time and Memory Footprint',
    paragraphs: [
      'In many environments, Spring Boot on the JVM is perfectly acceptable and operationally efficient enough. For long-lived services, the startup difference may not dominate the business outcome. Memory and cold start still matter, but they must be evaluated in context rather than treated as abstract scoreboard metrics.',
      'Quarkus is often chosen precisely because startup speed and memory usage are not secondary concerns. In serverless-style, bursty, dense-container, or fast-scaling environments, those characteristics may materially affect platform economics and operational behavior. This is one of Quarkus\'s strongest practical advantages.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data Access and Persistence',
    paragraphs: [
      'Spring Boot benefits from the maturity of Spring Data, transaction management, and the surrounding Spring database stack. Repository abstractions, declarative transactions, and deep community knowledge make data access one of Spring\'s safest bets.',
      'Quarkus supports Hibernate ORM and also offers Panache, which simplifies common persistence patterns with an active-record or repository style API. Some teams find Panache concise and pleasant, especially for straightforward CRUD services, but the decision should still account for how much the team values Spring Data\'s broader familiarity and ecosystem depth.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Bean Model',
    paragraphs: [
      'Spring Boot uses the Spring container and a programming model that many Java developers know well. Conditional configuration, bean scopes, configuration classes, and annotation-driven composition are central to its identity.',
      'Quarkus uses CDI through ArC and performs important work at build time. This can influence what framework features are natural, what patterns are efficient, and how extensions integrate. For teams already comfortable with CDI and Jakarta standards, this often feels straightforward. For Spring-native teams, it is a real shift in mental model.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operations, Observability, and Packaging',
    paragraphs: [
      'Spring Boot Actuator is one of the framework\'s strongest operational features. Health endpoints, metrics, environment insight, and management integrations make operational maturity a built-in part of the platform. Spring Boot also supports layered jars and buildpacks for container workflows, which keeps it very competitive in mainstream cloud packaging.',
      'Quarkus also supports health, metrics, configuration, and cloud deployment patterns very well, and its packaging and startup profile make it attractive for containerized services. The operational difference is not that one can be monitored and the other cannot. It is that Spring Boot emphasizes a mature management ecosystem while Quarkus emphasizes runtime efficiency and cloud ergonomics.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Library Compatibility and Migration Risk',
    paragraphs: [
      'Spring Boot usually wins on compatibility confidence. The odds are high that your library, your team\'s internal starter, your organization\'s security conventions, and your existing production playbooks already assume Spring.',
      'Quarkus can be extremely productive, but its build-time and native-aware design means some libraries and dynamic patterns deserve more scrutiny. This does not make Quarkus fragile. It means that framework fit should be evaluated against the exact dependencies and reflective behaviors your application uses.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Hiring Reality',
    paragraphs: [
      'Spring Boot is easier to justify when organizational standardization matters. Its ecosystem size, training material, and hiring familiarity can outweigh technical differences that matter only in niche runtime scenarios.',
      'Quarkus is easier to justify when the platform team is optimization-minded, comfortable with framework internals, and motivated by measurable cloud-runtime gains. It rewards teams that are intentional about startup, memory, native-image constraints, and build-time behavior rather than just ordinary enterprise CRUD velocity.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Spring Boot if your application depends on the broadest Spring integrations, your engineers already know Spring well, or your operational model does not strongly depend on startup and memory minimization.',
      'Lean toward Quarkus if the service platform values fast boot, efficient containers, strong development-mode iteration, and a framework that treats build-time optimization and native-image support as first-class concerns.',
      'If the application is conventional enterprise backend software with no special runtime constraints, Spring Boot is often the lower-risk default. If the platform has real cold-start or density pressure, Quarkus deserves serious consideration rather than being treated as an exotic alternative.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-bootstrap',
    title: 'Minimal HTTP Endpoint Bootstrap',
    description:
      'The first contrast is how each framework presents the simplest service entry point.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `@SpringBootApplication
@RestController
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @GetMapping("/hello")
  String hello() {
    return "hello";
  }
}`,
      },
      {
        label: 'Quarkus',
        code: `@Path("/hello")
public class HelloResource {
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String hello() {
    return "hello";
  }
}`,
      },
    ],
    takeaway:
      'Both are concise, but Spring Boot centers the Spring application class and auto-configuration, while Quarkus often centers a resource plus extension-driven build setup.',
  },
  {
    id: 'examples-data',
    title: 'Repository-Style Data Access',
    description:
      'Data-access ergonomics reveal a lot about framework identity and ecosystem defaults.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `public interface BookRepository
    extends JpaRepository<Book, Long> {
  List<Book> findByAuthor(String author);
}`,
      },
      {
        label: 'Quarkus',
        code: `@Entity
public class Book extends PanacheEntity {
  public String title;
  public String author;

  public static List<Book> byAuthor(String author) {
    return list("author", author);
  }
}`,
      },
    ],
    takeaway:
      'Spring Boot usually feels strongest through Spring Data repositories. Quarkus often feels strongest when teams embrace Panache or its extension-driven persistence model.',
  },
  {
    id: 'examples-dev-native',
    title: 'Development Loop and Native Build Intent',
    description:
      'The command story highlights the runtime assumptions of each framework.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `./mvnw spring-boot:run
# add DevTools for restart support
# add AOT/native configuration only if needed`,
      },
      {
        label: 'Quarkus',
        code: `./mvnw quarkus:dev
# hot deployment in dev mode
./mvnw package -Dnative
# native executable when the deployment needs it`,
      },
    ],
    takeaway:
      'Spring Boot treats native execution as an important supported deployment path. Quarkus makes fast dev mode and native-aware packaging feel closer to the center of daily framework use.',
  },
  {
    id: 'examples-decision',
    title: 'Simple Selection Heuristic',
    description:
      'A short rule keeps the comparison tied to workload and team reality rather than framework branding.',
    snippets: [
      {
        label: 'Choose Spring Boot',
        code: `If the team wants:
- the broadest Java ecosystem support
- mature Spring integrations
- low migration and hiring risk
- enterprise defaults over runtime specialization`,
      },
      {
        label: 'Choose Quarkus',
        code: `If the team wants:
- very fast startup
- lower memory pressure
- strong dev mode feedback loops
- a framework designed around build-time optimization`,
      },
    ],
    takeaway:
      'The right answer depends less on abstract popularity and more on whether platform efficiency or ecosystem breadth is the stronger constraint.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Starter',
    definition: 'A Spring Boot dependency bundle that brings in a useful default stack for a feature such as web, data, or security.',
  },
  {
    term: 'Auto-configuration',
    definition: 'Spring Boot automatically configuring infrastructure based on classpath contents, conditions, and missing user-defined beans.',
  },
  {
    term: 'Actuator',
    definition: 'Spring Boot\'s operational feature set for health, metrics, environment, and management endpoints.',
  },
  {
    term: 'AOT',
    definition: 'Ahead-of-time processing that prepares application behavior earlier in the lifecycle, especially relevant to native-image support.',
  },
  {
    term: 'Build-Time Augmentation',
    definition: 'Quarkus performing framework work during the build so less work remains at runtime.',
  },
  {
    term: 'Extension',
    definition: 'A Quarkus integration module that contributes build-time and runtime behavior for a particular capability.',
  },
  {
    term: 'ArC',
    definition: 'Quarkus\'s CDI-based dependency injection container.',
  },
  {
    term: 'Panache',
    definition: 'A Quarkus persistence convenience layer that simplifies common Hibernate ORM usage through active-record or repository patterns.',
  },
  {
    term: 'Native Executable',
    definition: 'A compiled binary, typically produced with GraalVM or Mandrel tooling, that avoids a conventional JVM startup path.',
  },
  {
    term: 'Dev Mode',
    definition: 'Quarkus\'s development workflow with hot deployment and fast iteration through `quarkus:dev`.',
  },
  {
    term: 'Layered Jar',
    definition: 'A Spring Boot packaging feature that separates archive contents into layers to improve container image caching.',
  },
  {
    term: 'CDI',
    definition: 'Contexts and Dependency Injection, the Jakarta standard dependency injection model used by Quarkus.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.spring-quarkus-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.spring-quarkus-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.spring-quarkus-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.spring-quarkus-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.spring-quarkus-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.spring-quarkus-help-control {
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
  color: #000000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
}

.spring-quarkus-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.spring-quarkus-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.spring-quarkus-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.spring-quarkus-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.spring-quarkus-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.spring-quarkus-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.spring-quarkus-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.spring-quarkus-help-toc-list li {
  margin: 0 0 8px;
}

.spring-quarkus-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.spring-quarkus-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.spring-quarkus-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.spring-quarkus-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.spring-quarkus-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.spring-quarkus-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.spring-quarkus-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.spring-quarkus-help-content p,
.spring-quarkus-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.spring-quarkus-help-content p {
  margin: 0 0 10px;
}

.spring-quarkus-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.spring-quarkus-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.spring-quarkus-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.spring-quarkus-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .spring-quarkus-help-main {
    grid-template-columns: 1fr;
  }

  .spring-quarkus-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .spring-quarkus-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    padding-left: 4px;
    white-space: normal;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SpringBootVsQuarkusPage(): JSX.Element {
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
    document.title = `Spring Boot vs Quarkus (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Spring Boot vs Quarkus',
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
    <div className="spring-quarkus-help-page">
      <style>{helpStyles}</style>
      <div className="spring-quarkus-help-window" role="presentation">
        <header className="spring-quarkus-help-titlebar">
          <span className="spring-quarkus-help-titletext">Spring Boot vs Quarkus</span>
          <div className="spring-quarkus-help-controls">
            <button className="spring-quarkus-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="spring-quarkus-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="spring-quarkus-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`spring-quarkus-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="spring-quarkus-help-main">
          <aside className="spring-quarkus-help-toc" aria-label="Table of contents">
            <h2 className="spring-quarkus-help-toc-title">Contents</h2>
            <ul className="spring-quarkus-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="spring-quarkus-help-content">
            <h1 className="spring-quarkus-help-doc-title">Spring Boot vs Quarkus</h1>
            <p className="spring-quarkus-help-doc-subtitle">
              Manual-style comparison of ecosystem breadth, build-time optimization, native-image fit, dev mode, and enterprise Java platform tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="spring-quarkus-help-section">
                    <h2 className="spring-quarkus-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="spring-quarkus-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="spring-quarkus-help-section">
                  <h2 className="spring-quarkus-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="spring-quarkus-help-section">
                  <h2 className="spring-quarkus-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="spring-quarkus-help-subheading">{snippet.label}</h3>
                      <div className="spring-quarkus-help-codebox">
                        <code>{snippet.code}</code>
                      </div>
                    </Fragment>
                  ))}
                  <p>
                    <strong>Takeaway:</strong> {example.takeaway}
                  </p>
                </section>
              ))}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="spring-quarkus-help-section">
                <h2 className="spring-quarkus-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
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
