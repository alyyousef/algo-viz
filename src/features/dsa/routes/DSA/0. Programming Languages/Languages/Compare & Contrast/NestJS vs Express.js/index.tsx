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
  'NestJS and Express.js both live in the Node.js backend ecosystem, but they solve different layers of the problem. Express.js is a minimal web framework for handling HTTP requests and building middleware pipelines. NestJS is a higher-level application framework that usually runs on top of Express or Fastify and adds structure around modules, dependency injection, controllers, guards, pipes, interceptors, and opinionated architecture. The real comparison is therefore not simply framework A versus framework B. It is minimal foundation versus structured framework.',
  'Express gives teams a light and flexible starting point. NestJS gives teams a pre-shaped architecture with more conventions and more built-in patterns. That means Express often wins when simplicity and direct control matter most, while NestJS often wins when a codebase needs stronger organization, consistency, and scalable team structure. The right choice depends on project size, team discipline, architectural preferences, and how much framework guidance the organization wants.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Express.js is one of the most familiar and widely used HTTP frameworks in the Node ecosystem. It provides routing, middleware composition, request and response handling, and a very small conceptual surface area. The framework does not try to define the full architecture of your backend. That is both its power and its limitation.',
      'NestJS is a more opinionated backend framework inspired by patterns popular in enterprise frameworks. It encourages modular architecture, dependency injection, decorators, controller classes, and explicit layers. It can still use Express under the hood, but it adds a much richer application model on top of the HTTP layer.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core difference is the amount of architecture the framework gives you up front. Express gives you primitives and expects you to compose your own structure. NestJS gives you a structure and expects you to work within it most of the time.',
      'This means Express is closer to a toolkit, while NestJS is closer to an opinionated application platform. One is not automatically more mature than the other. The right tool depends on whether the project benefits more from flexibility or from enforced architectural consistency.',
    ],
    bullets: [
      'Express emphasizes minimalism and direct control.',
      'NestJS emphasizes structure, conventions, and framework-level patterns.',
      'Express asks teams to design the architecture.',
      'NestJS provides much of that architecture by default.',
    ],
  },
  {
    id: 'bp-when-express-fits',
    title: 'When Express.js Is Usually the Better Fit',
    paragraphs: [
      'Express is usually the better fit when the service is relatively small, the team wants minimal abstraction, or the architecture does not justify a heavier framework. It is also strong when a team already has its own preferred layering and simply wants a reliable HTTP foundation.',
      'It remains attractive for APIs, lightweight services, prototypes, integration layers, and environments where keeping the stack simple matters more than adopting a broad framework model.',
    ],
    bullets: [
      'Small or medium services with straightforward HTTP needs.',
      'Teams that prefer explicit code over framework conventions.',
      'Projects where low abstraction and low ceremony are valuable.',
      'Cases where custom architecture matters more than built-in structure.',
    ],
  },
  {
    id: 'bp-when-nest-fits',
    title: 'When NestJS Is Usually the Better Fit',
    paragraphs: [
      'NestJS is usually the better fit when the backend is growing, multiple developers need to follow the same patterns, or the project benefits from strong framework guidance. Its module system, dependency injection, validation flow, and cross-cutting abstractions help larger codebases stay more uniform.',
      'It is especially useful when the organization wants one repeatable application shape across many services, and when the team is comfortable accepting framework conventions to gain consistency and speed at scale.',
    ],
    bullets: [
      'Larger backends or teams that need architectural consistency.',
      'Organizations building many similar services with shared conventions.',
      'Projects that benefit from dependency injection and layered structure.',
      'Teams comfortable with decorators, modules, and framework ceremony.',
    ],
  },
  {
    id: 'bp-hidden-tradeoff',
    title: 'The Hidden Tradeoff',
    paragraphs: [
      'The hidden tradeoff is not just complexity versus simplicity. It is where complexity lives. With Express, complexity lives more in application code because the team must invent and enforce patterns itself. With NestJS, complexity lives more in framework concepts and abstractions because the team must understand and work through the framework model.',
      'That means NestJS can reduce codebase chaos while increasing framework overhead. Express can reduce framework overhead while increasing the need for internal discipline. The better option depends on which burden the team is more capable of carrying well.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'A strong decision starts by asking whether the real problem is HTTP handling or application architecture. If the service only needs a thin web layer, Express may be enough. If the organization needs repeatable architectural scaffolding and cross-cutting conventions, NestJS may provide real leverage.',
    ],
    bullets: [
      'Choose Express for low ceremony and direct control.',
      'Choose NestJS for convention-driven architecture and consistency.',
      'Do not mistake a heavier framework for automatic code quality.',
      'Do not mistake minimalism for architectural clarity if the team lacks discipline.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-abstraction-level',
    title: 'Abstraction Level',
    paragraphs: [
      'Express sits close to the HTTP and middleware layer. Requests come in, middleware runs, handlers execute, and responses are returned. That makes the control flow easy to understand for developers already familiar with Node request handling.',
      'NestJS adds higher-level abstractions on top of that model. Controllers, providers, modules, guards, pipes, interceptors, and exception filters organize behavior into named framework concepts. This can improve large-scale consistency, but it also means developers must learn the NestJS mental model before the codebase feels natural.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Code Organization',
    paragraphs: [
      'Express does not prescribe a strong application architecture. Teams must decide how to separate routes, services, validation, domain logic, configuration, and infrastructure concerns. This can be liberating for strong teams and dangerous for inconsistent teams.',
      'NestJS ships with architectural defaults that encourage modular boundaries and class-based organization. That makes it easier for multiple developers to work in a familiar pattern, especially across many repositories, but it can feel heavy for a service that does not need that much scaffolding.',
    ],
  },
  {
    id: 'core-dependency-injection',
    title: 'Dependency Injection',
    paragraphs: [
      'NestJS has built-in dependency injection as a central part of its design. Providers are registered in modules and injected where needed. This can improve testability, configurability, and service composition when used well.',
      'Express has no built-in dependency injection model. Teams either wire dependencies manually, use factories, or introduce separate libraries. This keeps the runtime model simple, but it also means the architecture must be built deliberately rather than assumed from the framework.',
    ],
  },
  {
    id: 'core-validation-crosscutting',
    title: 'Validation and Cross-Cutting Concerns',
    paragraphs: [
      'NestJS provides named mechanisms for common cross-cutting concerns. Guards handle authorization flow, pipes handle transformation and validation, interceptors handle wrapping behavior, and exception filters centralize error handling. This gives teams explicit places to put common logic.',
      'In Express, the same outcomes are possible, but they are usually built from middleware and custom conventions. This can be very clean in skilled hands, but the framework does not enforce one canonical place for these patterns.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Shape',
    paragraphs: [
      'NestJS often makes test boundaries more obvious because modules and providers are explicit units in the framework. Dependency injection can make substitution and mocking straightforward if the team follows the framework pattern cleanly.',
      'Express testing can be very direct because there is less framework machinery between the handler and the underlying logic. But if the codebase lacks clear layering, tests can become inconsistent because each feature may be structured differently.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Considerations',
    paragraphs: [
      'For many applications, the performance difference is not the deciding factor. Both approaches run in Node.js, and actual throughput often depends more on application logic, I/O patterns, database usage, and infrastructure than on the framework choice alone.',
      'The meaningful runtime question is usually whether the abstractions added by NestJS are worth their cost in complexity and startup ceremony. For small services, that extra framework surface may not buy enough. For larger systems, the organizational benefit may easily justify it.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve',
    paragraphs: [
      'Express has a smaller core learning surface. A developer can understand the request pipeline quickly and begin shipping functionality with little conceptual overhead.',
      'NestJS has a steeper learning curve because developers need to understand its dependency injection container, decorators, module graph, and lifecycle patterns. The upfront cost is higher, but the payoff can be better team alignment in larger codebases.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit',
    paragraphs: [
      'Express fits teams that want to stay close to the metal, value lightweight tooling, and trust themselves to enforce internal architecture without framework pressure. It is often a strong fit for smaller teams or highly custom backends.',
      'NestJS fits teams that want repeatable patterns, explicit boundaries, and a stronger framework contract. It is often a strong fit when the backend platform should feel similar across services regardless of who started each project.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Extension Model',
    paragraphs: [
      'Express has an enormous ecosystem history and a vast amount of community knowledge. Because it is unopinionated, it integrates easily with many different libraries and styles of code organization.',
      'NestJS also has a strong ecosystem, especially around its own conventions and official modules. The extension story is good when the problem fits the framework model. It can be less pleasant when a team wants to escape that model frequently.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Express usually wins on simplicity, flexibility, and transparency. NestJS usually wins on structure, consistency, and built-in architectural patterns. Neither is better in the abstract because they optimize for different engineering pressures.',
      'The real mistake is choosing Express and never imposing architecture, or choosing NestJS and assuming the framework will think for the team. Good outcomes still depend on clear domain modeling, disciplined boundaries, and pragmatic design.',
    ],
    bullets: [
      'Choose Express for small services, directness, and custom architecture.',
      'Choose NestJS for larger systems, team consistency, and built-in structure.',
      'Use explicit architecture either way.',
      'Let repo size and team coordination needs drive the decision.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-express-shape',
    title: 'Express Shape',
    description: [
      'An Express service usually starts from routes and middleware, then layers in whatever structure the team chooses.',
    ],
    code: `app.get('/users/:id', authMiddleware, async (req, res) => {
  const user = await userService.getById(req.params.id)
  res.json(user)
})`,
    notes: [
      'The control flow is direct and easy to follow.',
      'Architecture quality depends on what the team builds around this primitive layer.',
    ],
  },
  {
    id: 'examples-nest-shape',
    title: 'NestJS Shape',
    description: [
      'A NestJS service usually expresses HTTP behavior through controllers and providers inside modules.',
    ],
    code: `@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getById(id)
  }
}`,
    notes: [
      'The framework supplies conventions for routing, injection, and composition.',
      'This can improve consistency across large teams and many services.',
    ],
  },
  {
    id: 'examples-crosscutting',
    title: 'Cross-Cutting Concern Placement',
    description: [
      'The two frameworks often differ most in where validation, auth, and shared behaviors naturally live.',
    ],
    code: `Express:
middleware -> route handler -> custom error flow

NestJS:
guard -> pipe -> controller -> interceptor -> exception filter`,
    notes: [
      'NestJS names these stages explicitly.',
      'Express can achieve similar results, but the team defines the structure more manually.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: ['A useful evaluation separates the HTTP problem from the architecture problem.'],
    code: `Question 1:
Do we just need a thin HTTP layer?

Question 2:
Do we need strong framework-level conventions across teams?

Question 3:
Will the service stay small or grow into a larger platform-shaped backend?`,
    notes: [
      'If only the first question matters, Express is often enough.',
      'If the second and third questions matter strongly, NestJS often creates more long-term value.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-express',
    title: 'Express.js Terms',
    terms: [
      {
        term: 'Express.js',
        definition:
          'A minimal Node.js web framework focused on routing, middleware, and HTTP request handling.',
      },
      {
        term: 'Middleware',
        definition:
          'A function in the request pipeline that can inspect, modify, block, or pass control to the next step.',
      },
      {
        term: 'Route Handler',
        definition: 'The function that handles a matched HTTP route and returns a response.',
      },
      {
        term: 'Unopinionated Framework',
        definition:
          'A framework that gives core primitives but leaves many architectural choices to the team.',
      },
    ],
  },
  {
    id: 'glossary-nest',
    title: 'NestJS Terms',
    terms: [
      {
        term: 'NestJS',
        definition:
          'An opinionated Node.js backend framework built around modules, dependency injection, and structured application patterns.',
      },
      {
        term: 'Provider',
        definition:
          'A class or value managed by the NestJS dependency injection container and supplied where needed.',
      },
      {
        term: 'Guard',
        definition:
          'A NestJS construct used to decide whether a request is allowed to reach a route handler.',
      },
      {
        term: 'Interceptor',
        definition:
          'A NestJS construct used to wrap request handling for cross-cutting behaviors such as logging or response shaping.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Backend Terms',
    terms: [
      {
        term: 'Dependency Injection',
        definition:
          'A pattern in which dependencies are supplied externally rather than created directly inside a component.',
      },
      {
        term: 'Controller',
        definition:
          'A component responsible for mapping incoming requests to application behavior.',
      },
      {
        term: 'Cross-Cutting Concern',
        definition:
          'A behavior such as validation, logging, authorization, or error handling that affects many parts of a system.',
      },
      {
        term: 'Convention over Configuration',
        definition:
          'A design approach in which a framework supplies preferred defaults and patterns to reduce local decisions.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-express-fits', label: 'When Express.js Is Usually the Better Fit' },
    { id: 'bp-when-nest-fits', label: 'When NestJS Is Usually the Better Fit' },
    { id: 'bp-hidden-tradeoff', label: 'The Hidden Tradeoff' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-abstraction-level', label: 'Abstraction Level' },
    { id: 'core-architecture', label: 'Architecture and Code Organization' },
    { id: 'core-dependency-injection', label: 'Dependency Injection' },
    { id: 'core-validation-crosscutting', label: 'Validation and Cross-Cutting Concerns' },
    { id: 'core-testing', label: 'Testing Shape' },
    { id: 'core-performance', label: 'Performance and Runtime Considerations' },
    { id: 'core-learning-curve', label: 'Learning Curve' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-ecosystem', label: 'Ecosystem and Extension Model' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-express-shape', label: 'Express Shape' },
    { id: 'examples-nest-shape', label: 'NestJS Shape' },
    { id: 'examples-crosscutting', label: 'Cross-Cutting Concern Placement' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-express', label: 'Express.js Terms' },
    { id: 'glossary-nest', label: 'NestJS Terms' },
    { id: 'glossary-shared', label: 'Shared Backend Terms' },
  ],
}

const pageStyles = `
.nest-express-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.nest-express-help-window {
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

.nest-express-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.nest-express-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.nest-express-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.nest-express-help-control {
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

.nest-express-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.nest-express-help-tab {
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

.nest-express-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.nest-express-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.nest-express-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.nest-express-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.nest-express-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nest-express-help-toc-item {
  margin: 0 0 8px;
}

.nest-express-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.nest-express-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.nest-express-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.nest-express-help-section {
  margin: 0 0 20px;
}

.nest-express-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.nest-express-help-content p,
.nest-express-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.nest-express-help-content p {
  margin: 0 0 10px;
}

.nest-express-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.nest-express-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.nest-express-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.nest-express-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .nest-express-help-main {
    grid-template-columns: 1fr;
  }

  .nest-express-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .nest-express-help-page {
    min-height: auto;
  }

  .nest-express-help-window {
    min-height: auto;
  }

  .nest-express-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .nest-express-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
  }
}
`

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
    <section key={section.id} id={section.id} className="nest-express-help-section">
      <h2 className="nest-express-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="nest-express-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="nest-express-help-section">
      <h2 className="nest-express-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="nest-express-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="nest-express-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="nest-express-help-section">
      <h2 className="nest-express-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="nest-express-help-divider" />}
    </section>
  )
}

export default function NestJsVsExpressJsPage(): JSX.Element {
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
    document.title = `NestJS vs Express.js (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'NestJS vs Express.js',
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
    <div className="nest-express-help-page">
      <style>{pageStyles}</style>
      <div className="nest-express-help-window" role="presentation">
        <header className="nest-express-help-titlebar">
          <span className="nest-express-help-titletext">NestJS vs Express.js</span>
          <div className="nest-express-help-controls">
            <button
              className="nest-express-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="nest-express-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="nest-express-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nest-express-help-tab ${activeTab === tab.id ? 'nest-express-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="nest-express-help-main">
          <aside className="nest-express-help-toc" aria-label="Table of contents">
            <h2 className="nest-express-help-toc-title">Contents</h2>
            <ul className="nest-express-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="nest-express-help-toc-item">
                  <a href={`#${section.id}`} className="nest-express-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="nest-express-help-content">
            <h1 className="nest-express-help-doc-title">NestJS vs Express.js</h1>
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
