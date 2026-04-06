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
  'Laravel and Django are both high-productivity web frameworks that aim to help teams build full-featured applications quickly without forcing them to assemble every layer by hand. Both provide strong defaults for routing, ORM access, templating, authentication, testing, and common application concerns. The important difference is not whether either one is capable. The difference is ecosystem, framework style, language culture, and how each framework approaches convention and application structure.',
  'Laravel is tightly associated with modern PHP development and is often praised for developer ergonomics, approachable APIs, and a strong product-building workflow. Django is tightly associated with Python web development and is often praised for disciplined conventions, batteries-included design, and a mature approach to building robust web applications. Both can be excellent; the stronger fit depends heavily on language ecosystem and project shape.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Laravel is a PHP framework designed to make application development expressive and productive. It emphasizes elegant APIs, developer experience, and a cohesive approach to web application building. It is often favored for teams that want to move quickly with a framework that feels friendly and pragmatic.',
      'Django is a Python framework designed around the idea of shipping robust web applications with strong defaults and clear conventions. It is often favored by teams that value a mature batteries-included framework and the wider benefits of the Python ecosystem.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both frameworks aim to reduce repetitive infrastructure work so developers can focus on application behavior. Both offer ORM-based data access, routing, templating, authentication patterns, testing support, and solutions for many everyday web concerns.',
      'Both are opinionated enough to give teams a path forward without requiring architecture from scratch. That is one of the main reasons they remain relevant: they compress a large amount of routine web work into repeatable conventions.',
    ],
    bullets: [
      'Rapid application development with strong built-in patterns.',
      'ORM support and database-backed application development.',
      'Authentication, routing, and testing support out of the box.',
      'A mature path for building CRUD-heavy and content-rich applications.',
    ],
  },
  {
    id: 'bp-when-laravel-fits',
    title: 'When Laravel Is Usually the Better Fit',
    paragraphs: [
      'Laravel is often the better fit when the team is already comfortable with PHP or wants a framework that emphasizes smooth developer experience and product-building speed. It is especially appealing for startups, internal tools, SaaS products, and teams that value expressive syntax and a strong ecosystem around common web product needs.',
      'It is also attractive when the broader PHP hosting and deployment story is already familiar to the organization or when the team values Laravel’s cohesive ecosystem of adjacent tools and conventions.',
    ],
    bullets: [
      'PHP-first teams or organizations.',
      'Projects that value framework ergonomics and quick iteration.',
      'Web applications, dashboards, admin tools, and SaaS platforms.',
      'Teams that want a cohesive developer-friendly product framework.',
    ],
  },
  {
    id: 'bp-when-django-fits',
    title: 'When Django Is Usually the Better Fit',
    paragraphs: [
      'Django is often the better fit when the team is already strong in Python or when the project benefits from the wider Python ecosystem around data, scripting, automation, and backend services. It is especially attractive for systems that want convention, reliability, and a mature batteries-included framework model.',
      'It is also attractive when the app naturally lives in a broader Python stack, such as internal tooling, data-driven web products, research-adjacent systems, or organizations where Python is the default language of backend work.',
    ],
    bullets: [
      'Python-first teams or organizations.',
      'Projects that benefit from the wider Python ecosystem.',
      'Applications that value convention and strong built-in structure.',
      'Teams that prefer a disciplined batteries-included framework model.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'In practice, the framework decision is usually downstream of the language and ecosystem decision. Laravel is strongest when PHP is already a strategic asset. Django is strongest when Python is already a strategic asset. Once that is clear, the remaining tradeoffs are mostly about style, conventions, and the kind of developer experience the team prefers.',
    ],
    bullets: [
      'Choose Laravel when PHP ecosystem leverage matters most.',
      'Choose Django when Python ecosystem leverage matters most.',
      'Choose Laravel for expressive product-focused ergonomics.',
      'Choose Django for disciplined batteries-included conventions.',
      'Let language fit and team capability outweigh fashion.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-language-ecosystem',
    title: 'Language and Ecosystem Context',
    paragraphs: [
      'Laravel lives inside the PHP ecosystem. Its strengths are inseparable from the maturity of modern PHP, the familiarity of PHP hosting patterns, and the ecosystem of tools and services that surround Laravel-based application development.',
      'Django lives inside the Python ecosystem. Its strengths are inseparable from Python’s readability, its broad backend usage, and the wider ecosystem around automation, data work, scientific tooling, and general-purpose server-side programming.',
    ],
  },
  {
    id: 'core-framework-style',
    title: 'Framework Style and Philosophy',
    paragraphs: [
      'Laravel tends to emphasize elegant APIs and developer pleasure. It is opinionated, but often in a way that feels oriented around helping teams move fast and keep common product-development work approachable.',
      'Django tends to emphasize convention, structure, and a mature sense of framework completeness. It often feels a bit more procedural and disciplined in the way it guides teams through the common architecture of a web application.',
    ],
  },
  {
    id: 'core-batteries-included',
    title: 'Batteries Included Versus Framework Ergonomics',
    paragraphs: [
      'Django is frequently described as batteries included because it ships with strong built-in support for many concerns teams otherwise piece together manually. The admin interface, ORM, forms, authentication patterns, and project structure are all part of that reputation.',
      'Laravel is also productive and feature-rich, but the feel is slightly different. It often wins praise not just because features exist, but because the framework APIs and surrounding tools are designed to feel cohesive and pleasant during everyday product work.',
    ],
  },
  {
    id: 'core-orm-data',
    title: 'ORM and Data Modeling',
    paragraphs: [
      'Laravel uses Eloquent, which is widely appreciated for approachable data access and a fluid model-oriented style. It is often easy for developers to become productive quickly in common web application patterns.',
      'Django uses its ORM and model system to give a similarly productive experience with a strong convention-driven structure. It often feels especially comfortable in applications where data models, forms, admin capabilities, and standard business workflows are central.',
    ],
  },
  {
    id: 'core-tooling-workflow',
    title: 'Tooling and Workflow',
    paragraphs: [
      'Laravel benefits from the broader ecosystem of PHP tooling plus framework-specific conventions, scaffolding, and adjacent services that make common product development tasks easier. The workflow often feels oriented around shipping web products quickly.',
      'Django benefits from Python’s tooling culture and the simplicity of operating inside a general-purpose backend language. The workflow often feels especially natural for teams that combine web development with scripting, automation, background jobs, or data-oriented work.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-admin-productivity',
    title: 'Admin and Internal Productivity Features',
    paragraphs: [
      'Django is famous for its admin capabilities and the speed with which teams can stand up internal management interfaces over structured models. This can be a major advantage for content-heavy systems, internal operations tools, and products with substantial back-office workflows.',
      'Laravel also supports strong productivity patterns for admin and internal tooling, often through its ecosystem and community tooling choices. The feel is somewhat less tied to one canonical built-in admin identity and more to a broader ecosystem of framework-adjacent solutions.',
    ],
  },
  {
    id: 'core-product-vs-platform',
    title: 'Product Framework Versus General Python Platform',
    paragraphs: [
      'Laravel often feels like a product-building framework. Its ecosystem and community energy are strongly aligned with web application delivery, developer ergonomics, and the common patterns of SaaS and business app construction.',
      'Django often feels like a web framework that sits comfortably inside a broader programming language platform. That makes it attractive in organizations where the same language also powers scripts, automation, ML-adjacent services, or data workflows.',
    ],
  },
  {
    id: 'core-scaling-teams',
    title: 'Team Scaling and Maintainability',
    paragraphs: [
      'Laravel teams often benefit from a strong shared framework culture and a relatively smooth path to productivity for developers who understand modern PHP application structure. The framework’s ergonomics help keep many common tasks readable and fast to implement.',
      'Django teams often benefit from explicit conventions and a strong project layout that can make applications predictable over time. For large teams, this kind of disciplined structure can reduce ambiguity about where common concerns belong.',
    ],
  },
  {
    id: 'core-performance-ops',
    title: 'Performance and Operations',
    paragraphs: [
      'Neither framework should be reduced to simplistic performance stereotypes. Real performance depends much more on application design, query discipline, caching, background processing, and operational architecture than on framework brand alone.',
      'The more meaningful operational difference is usually the surrounding platform knowledge the team already has. A team fluent in PHP operations may ship Laravel systems more confidently. A team fluent in Python operations may do the same with Django.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Laravel often wins on expressive APIs, product-development ergonomics, and PHP ecosystem fit. Django often wins on mature built-in structure, admin strength, and Python ecosystem fit. Those are meaningful but context-dependent advantages.',
      'The common mistake is to compare them only as web frameworks without considering the language ecosystem around them. In real projects, the language choice, hiring pool, operational habits, and adjacent tooling often matter more than a narrow feature checklist.',
    ],
    bullets: [
      'Choose Laravel for PHP-first product development and framework ergonomics.',
      'Choose Django for Python-first development and disciplined built-in structure.',
      'Prefer ecosystem fit over generic framework rankings.',
      'Treat team familiarity and adjacent tooling as part of the architecture decision.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the application is one part of a larger PHP web product estate, Laravel is usually the most coherent choice. It aligns naturally with the language, hosting culture, and framework expectations of that environment.',
      'If the application sits inside a broader Python backend or data-oriented organization, Django is usually the most coherent choice. It aligns naturally with the language, operational habits, and cross-project reuse opportunities of that environment.',
      'If neither ecosystem is predetermined, then the best comparison is between product ergonomics and batteries-included discipline. Both can be excellent; the better choice is the one your team can operate and evolve confidently.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-models',
    title: 'Model-Oriented Development',
    description: [
      'Both frameworks make data-backed application development a first-class experience, but the surrounding style differs slightly.',
    ],
    code: `Laravel:
Eloquent model
controller and route conventions
ecosystem-driven product tooling

Django:
model
view
admin and form conventions
batteries-included project structure`,
    notes: [
      'Both are productive for CRUD-heavy and business-data-oriented applications.',
      'The difference is often the feel of the workflow rather than whether the capability exists.',
    ],
  },
  {
    id: 'examples-admin',
    title: 'Admin Workflow Contrast',
    description: [
      'Django is especially known for turning structured models into useful admin interfaces quickly, while Laravel often reaches similar productivity through its broader ecosystem and framework conventions.',
    ],
    code: `Django emphasis:
strong built-in admin identity

Laravel emphasis:
strong framework ergonomics
ecosystem-assisted admin and product tooling`,
    notes: [
      'This difference matters in operations-heavy or content-heavy internal workflows.',
      'It also influences how quickly teams can build internal back-office surfaces.',
    ],
  },
  {
    id: 'examples-ecosystem-fit',
    title: 'Ecosystem Fit Example',
    description: ['The framework decision often follows the wider language decision.'],
    code: `Choose Laravel when:
the organization is PHP-oriented
the product stack already lives in modern PHP

Choose Django when:
the organization is Python-oriented
the app benefits from the wider Python backend ecosystem`,
    notes: [
      'This is usually the real decision frame in production settings.',
      'Framework comparison without language context is often misleading.',
    ],
  },
  {
    id: 'examples-product-shape',
    title: 'Product Shape Example',
    description: [
      'Different application shapes naturally lean toward different framework strengths.',
    ],
    code: `Laravel often feels strong for:
SaaS platforms
internal business apps
web products with fast iteration

Django often feels strong for:
content-heavy systems
data-backed internal platforms
Python-adjacent backend products`,
    notes: [
      'These are common patterns, not hard rules.',
      'The stronger factor is still team and ecosystem fit.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-laravel',
    title: 'Laravel Terms',
    terms: [
      {
        term: 'Eloquent',
        definition:
          'Laravel’s ORM and model system for interacting with relational data in an object-oriented style.',
      },
      {
        term: 'Artisan',
        definition:
          'Laravel’s command-line tooling for development, scaffolding, and framework tasks.',
      },
      {
        term: 'Blade',
        definition: 'Laravel’s templating engine for server-rendered views.',
      },
      {
        term: 'PHP Ecosystem',
        definition:
          'The broader language, library, hosting, and tooling environment in which Laravel operates.',
      },
    ],
  },
  {
    id: 'glossary-django',
    title: 'Django Terms',
    terms: [
      {
        term: 'Django Admin',
        definition:
          'Django’s built-in administrative interface generated around configured models and permissions.',
      },
      {
        term: 'ORM',
        definition:
          'Django’s object-relational mapping layer for defining and querying data models.',
      },
      {
        term: 'MVT',
        definition:
          'Model-View-Template, the architectural vocabulary often associated with Django’s project structure.',
      },
      {
        term: 'Batteries Included',
        definition:
          'The idea that the framework ships with many common capabilities built in rather than expecting many separate choices.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Web Framework Terms',
    terms: [
      {
        term: 'Convention',
        definition:
          'A standard project or API pattern encouraged by a framework so teams make fewer architecture decisions from scratch.',
      },
      {
        term: 'Scaffolding',
        definition:
          'Automatically generated code or structure used to accelerate common development tasks.',
      },
      {
        term: 'CRUD',
        definition:
          'Create, read, update, and delete operations commonly used in database-backed applications.',
      },
      {
        term: 'Framework Ergonomics',
        definition:
          'How pleasant and efficient a framework feels during everyday development work.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-laravel-fits', label: 'When Laravel Fits' },
    { id: 'bp-when-django-fits', label: 'When Django Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-ecosystem', label: 'Language and Ecosystem Context' },
    { id: 'core-framework-style', label: 'Framework Style and Philosophy' },
    { id: 'core-batteries-included', label: 'Batteries Included Versus Ergonomics' },
    { id: 'core-orm-data', label: 'ORM and Data Modeling' },
    { id: 'core-tooling-workflow', label: 'Tooling and Workflow' },
    { id: 'core-admin-productivity', label: 'Admin and Internal Productivity' },
    { id: 'core-product-vs-platform', label: 'Product Framework Versus Platform' },
    { id: 'core-scaling-teams', label: 'Team Scaling and Maintainability' },
    { id: 'core-performance-ops', label: 'Performance and Operations' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-models', label: 'Model-Oriented Development' },
    { id: 'examples-admin', label: 'Admin Workflow Contrast' },
    { id: 'examples-ecosystem-fit', label: 'Ecosystem Fit Example' },
    { id: 'examples-product-shape', label: 'Product Shape Example' },
  ],
  glossary: [
    { id: 'glossary-laravel', label: 'Laravel Terms' },
    { id: 'glossary-django', label: 'Django Terms' },
    { id: 'glossary-shared', label: 'Shared Web Framework Terms' },
  ],
}

const pageStyles = `
.laravel-django-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.laravel-django-help-window {
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

.laravel-django-help-titlebar {
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

.laravel-django-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.laravel-django-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.laravel-django-help-control {
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

.laravel-django-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.laravel-django-help-tab {
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

.laravel-django-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.laravel-django-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.laravel-django-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.laravel-django-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.laravel-django-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.laravel-django-help-toc-item {
  margin: 0 0 8px;
}

.laravel-django-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.laravel-django-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.laravel-django-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.laravel-django-help-section {
  margin: 0 0 20px;
}

.laravel-django-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.laravel-django-help-content p,
.laravel-django-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.laravel-django-help-content p {
  margin: 0 0 10px;
}

.laravel-django-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.laravel-django-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.laravel-django-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.laravel-django-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .laravel-django-help-main {
    grid-template-columns: 1fr;
  }

  .laravel-django-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .laravel-django-help-page {
    min-height: auto;
  }

  .laravel-django-help-window {
    min-height: auto;
  }

  .laravel-django-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .laravel-django-help-titletext {
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
    <section key={section.id} id={section.id} className="laravel-django-help-section">
      <h2 className="laravel-django-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="laravel-django-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="laravel-django-help-section">
      <h2 className="laravel-django-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="laravel-django-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="laravel-django-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="laravel-django-help-section">
      <h2 className="laravel-django-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="laravel-django-help-divider" />}
    </section>
  )
}

export default function LaravelVsDjangoPage(): JSX.Element {
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
    document.title = `Laravel vs Django (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Laravel vs Django',
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
    <div className="laravel-django-help-page">
      <style>{pageStyles}</style>
      <div className="laravel-django-help-window" role="presentation">
        <header className="laravel-django-help-titlebar">
          <span className="laravel-django-help-titletext">Laravel vs Django</span>
          <div className="laravel-django-help-controls">
            <button
              className="laravel-django-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="laravel-django-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="laravel-django-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`laravel-django-help-tab ${activeTab === tab.id ? 'laravel-django-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="laravel-django-help-main">
          <aside className="laravel-django-help-toc" aria-label="Table of contents">
            <h2 className="laravel-django-help-toc-title">Contents</h2>
            <ul className="laravel-django-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="laravel-django-help-toc-item">
                  <a href={`#${section.id}`} className="laravel-django-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="laravel-django-help-content">
            <h1 className="laravel-django-help-doc-title">Laravel vs Django</h1>
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
