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
  'Hexagonal Architecture and Clean Architecture are often presented as competing styles, but in practice they are close relatives. Both aim to protect business rules from frameworks, databases, UIs, and infrastructure concerns. Both push dependencies inward toward the core of the system. Both are reactions against architectures where application logic becomes trapped inside web controllers, ORM models, and framework conventions.',
  'The useful comparison is not one good pattern versus one bad pattern. The useful comparison is emphasis and vocabulary. Hexagonal Architecture emphasizes ports and adapters around a domain-centered core. Clean Architecture emphasizes concentric layers, use cases, and the dependency rule. In many codebases, a disciplined design ends up borrowing ideas from both.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Hexagonal Architecture, also called Ports and Adapters, focuses on isolating the application core from external actors. The core exposes ports, and adapters implement the technical details needed to talk to databases, message brokers, web frameworks, and other systems.',
      'Clean Architecture focuses on a layered model where entities and use cases sit toward the center while interface adapters and frameworks live toward the outside. The central rule is that source code dependencies point inward, never outward toward volatile infrastructure.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'Shared Goal',
    paragraphs: [
      'Both architectures are trying to achieve the same strategic outcome: keep business logic independent from delivery mechanisms and technology details. If the database, framework, messaging stack, or UI changes, the core rules of the business should remain stable.',
      'This is why teams often find the two patterns compatible. They are not fundamentally opposing theories. They are two ways of organizing thought around the same high-level design objective.',
    ],
    bullets: [
      'Protect domain and application rules from infrastructure churn.',
      'Make business logic easier to test without heavy technical setup.',
      'Reduce coupling to frameworks, transport protocols, and persistence mechanisms.',
      'Keep dependencies flowing toward stable policy rather than volatile detail.',
    ],
  },
  {
    id: 'bp-where-they-differ',
    title: 'Where They Differ',
    paragraphs: [
      'Hexagonal Architecture is usually more concrete about interaction boundaries. It asks what ports the application exposes or consumes, and what adapters connect those ports to the outside world. That framing is practical when a system interacts with many external technologies.',
      'Clean Architecture is usually more explicit about layering inside the application. It distinguishes entities, use cases, interface adapters, and frameworks, which helps teams reason about where orchestration logic belongs and what should remain framework-independent.',
    ],
  },
  {
    id: 'bp-when-hexagonal-fits',
    title: 'When Hexagonal Architecture Is Usually the Better Framing',
    paragraphs: [
      'Hexagonal Architecture is especially useful when a team is wrestling with many integration points and wants a strong mental model for inbound and outbound dependencies. It shines when the practical challenge is isolating the application core from databases, third-party APIs, queues, file systems, and transports.',
      'It is also a strong fit when teams want a straightforward, implementation-oriented vocabulary: ports define the boundary, adapters implement the technical side of that boundary.',
    ],
    bullets: [
      'Systems with many infrastructure integrations.',
      'Teams that want boundary-oriented design language.',
      'Applications where testability through fake adapters is a central concern.',
      'Codebases where external drivers and driven actors need explicit modeling.',
    ],
  },
  {
    id: 'bp-when-clean-fits',
    title: 'When Clean Architecture Is Usually the Better Framing',
    paragraphs: [
      'Clean Architecture is especially useful when a team needs clarity about internal layering and application orchestration. It is helpful when use cases, entities, controllers, presenters, and gateways need to be separated clearly so that business rules do not bleed into interface code.',
      'It often resonates well with teams working on large application codebases where use-case-centric design and dependency rules need to be taught across many modules and contributors.',
    ],
    bullets: [
      'Applications with significant use-case orchestration logic.',
      'Teams that benefit from layered vocabulary and teaching aids.',
      'Codebases that need strong separation between enterprise rules and delivery concerns.',
      'Projects where long-term maintainability depends on enforcing dependency direction rigorously.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'In practice, many teams should stop trying to choose one label dogmatically and instead decide what explanatory model helps the codebase stay disciplined. The best choice is often the one that gives the team a common language for enforcing boundaries.',
    ],
    bullets: [
      'Use Hexagonal language when ports, adapters, and integration boundaries are the main teaching problem.',
      'Use Clean Architecture language when use cases, layering, and dependency rules are the main teaching problem.',
      'Use both when the system benefits from a layered core and explicit ports at the edges.',
      'Reject both labels if they become ceremony without improving dependency direction or testability.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-dependency-rule',
    title: 'Dependency Direction',
    paragraphs: [
      'Both architectures insist that dependencies should point toward stable policy, not unstable detail. Business rules should not import web frameworks, ORM types, transport DTOs, or message broker clients directly.',
      'Clean Architecture states this as the dependency rule. Hexagonal Architecture usually expresses it by making the core define ports while adapters depend on those ports rather than the other way around.',
    ],
  },
  {
    id: 'core-domain-core',
    title: 'The Core of the Application',
    paragraphs: [
      'In Hexagonal Architecture, the core is the application and domain logic that should remain independent of delivery and infrastructure concerns. The language is less about concentric rings and more about a protected inside surrounded by adapters.',
      'In Clean Architecture, the center is often described in layers such as entities and use cases. Entities hold the most stable business rules, while use cases coordinate application-specific workflows around those rules.',
    ],
  },
  {
    id: 'core-ports-vs-use-cases',
    title: 'Ports Versus Use Cases',
    paragraphs: [
      'Hexagonal Architecture emphasizes ports as the boundary contracts. Input ports define what the application can do from the perspective of callers. Output ports define what the application needs from external systems.',
      'Clean Architecture emphasizes use cases as the central units of application behavior. A use case coordinates the work needed to fulfill an application action while depending only on abstractions for technical concerns.',
      'These are not mutually exclusive. A use case can implement an input port, and a gateway abstraction in Clean Architecture often looks very similar to an output port in Hexagonal Architecture.',
    ],
  },
  {
    id: 'core-adapters-and-boundaries',
    title: 'Adapters, Gateways, and Interface Layers',
    paragraphs: [
      'Hexagonal Architecture uses the term adapter very explicitly. An HTTP controller can be an inbound adapter. A repository implementation, queue publisher, or third-party API client can be an outbound adapter.',
      'Clean Architecture often talks about interface adapters, controllers, presenters, and gateways. The vocabulary is more layered and role-specific, but the idea is similar: the outer parts translate between external mechanisms and the inner application model.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Strategy',
    paragraphs: [
      'Both architectures support strong testability by allowing the application core to run without real infrastructure. If the core depends only on abstractions, tests can plug in fake repositories, fake clients, or in-memory adapters.',
      'Hexagonal Architecture often feels especially natural for testing through fake adapters because the port-and-adapter language maps directly onto replacement boundaries. Clean Architecture often feels natural for use-case tests that exercise orchestration without involving frameworks.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-framework-independence',
    title: 'Framework Independence',
    paragraphs: [
      'A major promise of both architectures is that frameworks should remain replaceable details rather than the structure of the application itself. The application should not be architected around the web framework, ORM, queue library, or UI toolkit.',
      'Hexagonal Architecture communicates this by keeping adapters at the perimeter. Clean Architecture communicates it by keeping frameworks and drivers in the outermost circles. In both cases, the framework is supposed to plug into the application, not own it.',
    ],
  },
  {
    id: 'core-layering-vs-shape',
    title: 'Layering Versus Shape',
    paragraphs: [
      'Hexagonal Architecture is often drawn as a hexagon with many sides to emphasize that the application can have many different kinds of inputs and outputs, none of which should dominate the core. The shape is symbolic more than literal.',
      'Clean Architecture is often drawn as concentric circles to emphasize inward dependency direction and the difference between enterprise rules, application rules, adapters, and frameworks. The picture is more pedagogical about layers than about integration boundaries.',
    ],
  },
  {
    id: 'core-practical-differences',
    title: 'Practical Differences in Real Codebases',
    paragraphs: [
      'A codebase leaning Hexagonal often has packages or modules named around ports and adapters, with explicit interfaces for driven dependencies and clear separation between domain/application code and infrastructure implementations.',
      'A codebase leaning Clean often has packages or modules named around entities, use cases, interface adapters, gateways, presenters, and controllers. The internal layering of application behavior is usually more emphasized.',
      'The real difference in many teams is what they choose to make visible in the code structure and in architecture discussions. The actual dependency graph may end up very similar.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'The main benefit of both approaches is long-term maintainability through boundary discipline. The main risk of both approaches is accidental ceremony. If a system is simple and stable, too many layers or too many interfaces can obscure the core behavior rather than protect it.',
      'Hexagonal Architecture can become interface-heavy if every dependency is abstracted prematurely. Clean Architecture can become layer-heavy if every concept is split into many files and DTO translations without real architectural pressure behind the decision.',
    ],
    bullets: [
      'Use abstraction where volatility and substitution actually exist.',
      'Do not create interfaces only to satisfy a diagram.',
      'Prefer explicit boundaries around real external dependencies.',
      'Keep the architecture small enough that developers can still follow the use case end to end.',
    ],
  },
  {
    id: 'core-when-to-mix',
    title: 'When to Mix Them',
    paragraphs: [
      'Mixing the patterns is common and usually sensible. A system can use Clean Architecture language for internal layering and Hexagonal Architecture language for external boundaries. For example, use cases may sit in the center while input and output ports define how the outer world interacts with those use cases.',
      'This hybrid is often the most practical expression because it preserves the teaching strengths of both models: Clean for inner dependency discipline, Hexagonal for boundary and adapter thinking.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the main failure mode in the codebase is business logic leaking into controllers, repositories, or framework models, either pattern can help. Pick the vocabulary that your team will actually use consistently.',
      'If the codebase has many external technologies and you need explicit boundaries around them, Hexagonal language often lands better. If the codebase has many complex application workflows and you need strong layering of entities and use cases, Clean language often lands better.',
      'If the architecture discussion becomes ideological, step back and inspect the dependency graph. The real question is whether the core rules are isolated and the details depend on abstractions. The label matters less than that outcome.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-hexagonal-shape',
    title: 'Hexagonal Ports and Adapters Shape',
    description: [
      'This example shows the typical Hexagonal framing: the application core is surrounded by inbound and outbound adapters that communicate through ports.',
    ],
    code: `HTTP Controller --> Input Port --> Application Service --> Output Port --> Repository Adapter
CLI Command -----> Input Port --> Application Service --> Output Port --> Email Adapter`,
    notes: [
      'The core owns the abstractions that define how the outside world can interact with it.',
      'Adapters translate technical concerns into core-facing contracts.',
      'This is especially useful when the system has several delivery mechanisms or integrations.',
    ],
  },
  {
    id: 'examples-clean-shape',
    title: 'Clean Architecture Layering',
    description: [
      'This example shows the typical Clean Architecture framing: entities and use cases sit inward, while controllers, presenters, and frameworks stay outward.',
    ],
    code: `Frameworks & Drivers
        |
Interface Adapters
        |
Use Cases
        |
Entities`,
    notes: [
      'The diagram emphasizes dependency direction toward the center.',
      'The teaching value is in clarifying what belongs in business rules versus delivery code.',
    ],
  },
  {
    id: 'examples-hybrid',
    title: 'Common Hybrid',
    description: [
      'Many practical systems combine the two approaches by placing use cases in the center and exposing them through ports implemented by adapters at the edge.',
    ],
    code: `Controller --> Input Port --> Use Case --> Output Port --> Persistence Adapter
Controller --> Input Port --> Use Case --> Output Port --> Event Bus Adapter`,
    notes: [
      'This is often how real codebases end up regardless of which label they start with.',
      'The important part is the dependency graph, not the diagram title.',
    ],
  },
  {
    id: 'examples-testability',
    title: 'Testing the Core Without Infrastructure',
    description: [
      'One of the strongest reasons to adopt either pattern is the ability to exercise core behavior without running real infrastructure.',
    ],
    code: `test("place order use case") {
  fakeRepo = InMemoryOrderRepository()
  fakePayments = FakePaymentGateway()
  useCase = PlaceOrderUseCase(fakeRepo, fakePayments)

  result = useCase.execute(command)
  assert(result.status == "placed")
}`,
    notes: [
      'The test focuses on business behavior rather than framework wiring.',
      'This style is enabled by depending on abstractions at the boundary.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-hexagonal',
    title: 'Hexagonal Terms',
    terms: [
      {
        term: 'Port',
        definition:
          'An abstract boundary contract that defines how the application core communicates with the outside world.',
      },
      {
        term: 'Adapter',
        definition:
          'A concrete implementation that translates between a port and a technical mechanism such as HTTP, SQL, or messaging.',
      },
      {
        term: 'Inbound Adapter',
        definition:
          'An adapter that drives the application, such as a controller, consumer, or CLI entry point.',
      },
      {
        term: 'Outbound Adapter',
        definition:
          'An adapter used by the application to reach external systems such as databases or third-party APIs.',
      },
    ],
  },
  {
    id: 'glossary-clean',
    title: 'Clean Architecture Terms',
    terms: [
      {
        term: 'Entity',
        definition: 'A core business object or rule set representing stable enterprise logic.',
      },
      {
        term: 'Use Case',
        definition: 'Application-specific orchestration logic that coordinates business actions.',
      },
      {
        term: 'Interface Adapter',
        definition:
          'A layer that translates data and calls between the application core and external systems.',
      },
      {
        term: 'Dependency Rule',
        definition:
          'The rule that source code dependencies must point inward toward more stable business policy.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Architecture Terms',
    terms: [
      {
        term: 'Framework Independence',
        definition:
          'Designing the application so that framework choice does not dictate core business structure.',
      },
      {
        term: 'Boundary',
        definition:
          'A separation line between business policy and technical detail or between one architectural responsibility and another.',
      },
      {
        term: 'Policy',
        definition:
          'Stable business or application rules that should change less often than infrastructure details.',
      },
      {
        term: 'Detail',
        definition:
          'A volatile implementation concern such as a database, transport protocol, framework, or vendor API.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-where-they-differ', label: 'Where They Differ' },
    { id: 'bp-when-hexagonal-fits', label: 'When Hexagonal Fits' },
    { id: 'bp-when-clean-fits', label: 'When Clean Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-dependency-rule', label: 'Dependency Direction' },
    { id: 'core-domain-core', label: 'The Core of the Application' },
    { id: 'core-ports-vs-use-cases', label: 'Ports Versus Use Cases' },
    { id: 'core-adapters-and-boundaries', label: 'Adapters and Interface Layers' },
    { id: 'core-testing', label: 'Testing Strategy' },
    { id: 'core-framework-independence', label: 'Framework Independence' },
    { id: 'core-layering-vs-shape', label: 'Layering Versus Shape' },
    { id: 'core-practical-differences', label: 'Practical Differences' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-when-to-mix', label: 'When to Mix Them' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-hexagonal-shape', label: 'Hexagonal Shape' },
    { id: 'examples-clean-shape', label: 'Clean Shape' },
    { id: 'examples-hybrid', label: 'Common Hybrid' },
    { id: 'examples-testability', label: 'Testing the Core' },
  ],
  glossary: [
    { id: 'glossary-hexagonal', label: 'Hexagonal Terms' },
    { id: 'glossary-clean', label: 'Clean Architecture Terms' },
    { id: 'glossary-shared', label: 'Shared Architecture Terms' },
  ],
}

const pageStyles = `
.hex-clean-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.hex-clean-help-window {
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

.hex-clean-help-titlebar {
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

.hex-clean-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.hex-clean-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.hex-clean-help-control {
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

.hex-clean-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.hex-clean-help-tab {
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

.hex-clean-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.hex-clean-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.hex-clean-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.hex-clean-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.hex-clean-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.hex-clean-help-toc-item {
  margin: 0 0 8px;
}

.hex-clean-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.hex-clean-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.hex-clean-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.hex-clean-help-section {
  margin: 0 0 20px;
}

.hex-clean-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.hex-clean-help-content p,
.hex-clean-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.hex-clean-help-content p {
  margin: 0 0 10px;
}

.hex-clean-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.hex-clean-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.hex-clean-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.hex-clean-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .hex-clean-help-main {
    grid-template-columns: 1fr;
  }

  .hex-clean-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .hex-clean-help-page {
    min-height: auto;
  }

  .hex-clean-help-window {
    min-height: auto;
  }

  .hex-clean-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .hex-clean-help-titletext {
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
    <section key={section.id} id={section.id} className="hex-clean-help-section">
      <h2 className="hex-clean-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="hex-clean-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="hex-clean-help-section">
      <h2 className="hex-clean-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="hex-clean-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="hex-clean-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="hex-clean-help-section">
      <h2 className="hex-clean-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="hex-clean-help-divider" />}
    </section>
  )
}

export default function HexagonalArchitectureVsCleanArchitecturePage(): JSX.Element {
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
    document.title = `Hexagonal Architecture vs Clean Architecture (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Hexagonal Architecture vs Clean Architecture',
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
    <div className="hex-clean-help-page">
      <style>{pageStyles}</style>
      <div className="hex-clean-help-window" role="presentation">
        <header className="hex-clean-help-titlebar">
          <span className="hex-clean-help-titletext">
            Hexagonal Architecture vs Clean Architecture
          </span>
          <div className="hex-clean-help-controls">
            <button
              className="hex-clean-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="hex-clean-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="hex-clean-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`hex-clean-help-tab ${activeTab === tab.id ? 'hex-clean-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hex-clean-help-main">
          <aside className="hex-clean-help-toc" aria-label="Table of contents">
            <h2 className="hex-clean-help-toc-title">Contents</h2>
            <ul className="hex-clean-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="hex-clean-help-toc-item">
                  <a href={`#${section.id}`} className="hex-clean-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="hex-clean-help-content">
            <h1 className="hex-clean-help-doc-title">
              Hexagonal Architecture vs Clean Architecture
            </h1>
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
