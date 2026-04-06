import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Simula 67 invents objects and classes (1967)',
    detail:
      'Dahl and Nygaard introduced classes, objects, and simulation roots, proving that encapsulated state and behavior could model real-world systems.',
  },
  {
    title: 'Smalltalk refines message passing (1970s)',
    detail:
      'Alan Kay and the Xerox PARC team framed computation as objects sending messages. Live environments and late binding influenced modern dynamic OOP.',
  },
  {
    title: 'C++ brings OOP to systems programming (1980s)',
    detail:
      'Bjarne Stroustrup blended classes with low-level control. Virtual tables for dynamic dispatch and RAII for resource safety set patterns that persist in systems code.',
  },
  {
    title: 'Java mainstreams managed OOP (1995)',
    detail:
      'Java popularized garbage collection, interfaces, and a large standard library, making OOP the default for enterprise software and cross-platform tooling.',
  },
  {
    title: 'Design patterns and SOLID principles (1990s-2000s)',
    detail:
      'The Gang of Four cataloged reusable OOP structures; SOLID offered guidance for dependency direction, interface design, and extensibility.',
  },
  {
    title: 'Managed runtimes mature (2000s)',
    detail:
      'JVM and .NET profiling, JIT optimizations, and generics make large-scale OOP more performant and maintainable.',
  },
  {
    title: 'Mobile and app platforms scale OOP (2010s)',
    detail:
      'Android and iOS SDKs make object models the default for app architecture.',
  },
  {
    title: 'Hybrid paradigms rise (2010s-2020s)',
    detail:
      'Modern systems blend OOP with FP and data-oriented design to balance clarity and performance.',
  },
]

const mentalModels = [
  {
    title: 'Objects as capsules',
    detail:
      'An object bundles data with the only procedures allowed to touch it. Invariants live inside the capsule; outside code must use its messages.',
  },
  {
    title: 'Messages over methods',
    detail:
      'Think in terms of requests sent to objects, not function calls. Dynamic dispatch chooses behavior based on the receiver, enabling polymorphism.',
  },
  {
    title: 'Composition over inheritance',
    detail:
      'Reuse by assembling objects with narrow roles instead of deep class trees. Composition reduces coupling and fragility when domains evolve.',
  },
  {
    title: 'Contracts as boundaries',
    detail:
      'Interfaces formalize expectations and allow collaborators to change independently.',
  },
  {
    title: 'State is owned',
    detail:
      'Each object owns its state, and encapsulation prevents accidental mutation from the outside.',
  },
  {
    title: 'Polymorphism enables substitution',
    detail:
      'Callers depend on behavior, not type; implementations can vary without changing usage.',
  },
]

const mechanics = [
  {
    heading: 'Encapsulation and invariants',
    bullets: [
      'Visibility (private/protected/public) controls who can mutate state. Invariants are guarded by methods that validate changes.',
      'Interfaces define contracts without exposing data layout, enabling substitution and mocking.',
      'Value objects capture immutable domain facts while entities manage identity and lifecycle.',
    ],
  },
  {
    heading: 'Polymorphism and dispatch',
    bullets: [
      'Subtype polymorphism lets code operate on interface types while concrete classes provide behavior.',
      'Dynamic dispatch typically uses vtables or inline caches to select the correct method at runtime.',
      'Parametric polymorphism (generics) enables reuse without sacrificing type safety, reducing the need for base classes.',
      'Overriding contracts must honor Liskov Substitution to avoid runtime surprises.',
    ],
  },
  {
    heading: 'Inheritance and composition tools',
    bullets: [
      'Inheritance shares code and contracts but couples base and derived classes; changes in base can ripple unexpectedly.',
      'Composition delegates behavior to contained objects. Decorator and Strategy patterns formalize this approach.',
      'Mixins and traits offer horizontal reuse without deep hierarchies in some languages.',
      'Dependency injection inverts control and makes composition testable.',
    ],
  },
  {
    heading: 'Lifecycle and resource management',
    bullets: [
      'Constructors and factories control object creation and enforce invariants.',
      'Destructors, dispose patterns, or finalizers manage resources safely.',
      'Object pooling can reduce allocation pressure for hot paths.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics unchanged, indirection adds constants',
    detail:
      'Algorithms keep their big-O; dynamic dispatch and pointer chasing add constant factors. Deep object graphs can hurt cache locality.',
  },
  {
    title: 'Allocation and lifetime',
    detail:
      'GC based OOP pays allocation and collection costs; RAII based OOP pays in destructor calls but gains deterministic release. Object pooling trades memory for fewer allocations in hot paths.',
  },
  {
    title: 'Dependency graphs',
    detail:
      'Large class hierarchies can slow builds and complicate change. Interface segregation and stable abstractions keep dependency depth manageable.',
  },
  {
    title: 'Cache locality tradeoffs',
    detail:
      'Object graphs scatter memory; hot loops can benefit from flattening or data-oriented structures.',
  },
]

const applications = [
  {
    context: 'GUI frameworks',
    detail:
      'Widgets and event handlers map naturally to objects with state and message handlers. Frameworks like Swing, Cocoa, and Qt rely on object hierarchies and callbacks.',
  },
  {
    context: 'Game engines',
    detail:
      'Entity behaviors, renderers, and physics components are modeled as objects. Many modern engines mix OOP with data oriented design to address performance and cache behavior.',
  },
  {
    context: 'Enterprise services',
    detail:
      'Domain models, repositories, and service objects encapsulate business logic. Interfaces enable testing and decouple implementations from contracts.',
  },
  {
    context: 'Mobile apps',
    detail:
      'iOS and Android SDKs expose lifecycles and UI elements as objects; inheritance provides hooks, while composition organizes features.',
  },
  {
    context: 'Backend services',
    detail:
      'Controllers, services, and repositories encapsulate business logic behind clear APIs.',
  },
  {
    context: 'Simulation systems',
    detail:
      'OOP maps naturally to entities and interactions in physics and modeling systems.',
  },
]

const examples = [
  {
    title: 'Encapsulating invariants (Java)',
    code: `public final class Account {
    private int balance;

    public Account(int initial) {
        if (initial < 0) throw new IllegalArgumentException();
        this.balance = initial;
    }

    public void deposit(int amount) {
        if (amount <= 0) throw new IllegalArgumentException();
        balance += amount;
    }

    public int balance() { return balance; }
}`,
    explanation:
      'State is private; methods enforce invariants. Callers cannot mutate balance directly, preventing inconsistent states.',
  },
  {
    title: 'Composition over inheritance (TypeScript)',
    code: `interface Notifier { notify(message: string): void; }

class EmailNotifier implements Notifier { notify(msg) { /* ... */ } }
class SMSNotifier implements Notifier { notify(msg) { /* ... */ } }

class AlertService {
    constructor(private notifier: Notifier) {}
    raise(message: string) { this.notifier.notify(message); }
}`,
    explanation:
      'Behavior is injected via an interface. Swapping implementations does not require subclassing AlertService, keeping dependencies narrow.',
  },
  {
    title: 'Dynamic dispatch cost awareness (C++)',
    code: `struct Shape { virtual double area() const = 0; };
struct Rect : Shape { double w, h; double area() const override { return w * h; } };
struct Circle : Shape { double r; double area() const override { return 3.14159 * r * r; } };

double total_area(const std::vector<Shape*>& shapes) {
    double sum = 0;
    for (auto s : shapes) sum += s->area(); // virtual call each iteration
    return sum;
}`,
    explanation:
      'Virtual calls add indirection. If this is hot, consider batching by type, static polymorphism, or devirtualization.',
  },
  {
    title: 'Encapsulated value object (C#)',
    code: `public readonly record struct Money(decimal Amount, string Currency) {
    public Money Add(Money other) =>
        Currency == other.Currency ? new(Amount + other.Amount, Currency)
                                   : throw new InvalidOperationException();
}`,
    explanation:
      'Value objects model domain rules without exposing mutable state.',
  },
  {
    title: 'Strategy pattern',
    code: `interface PricingStrategy { price(base: number): number }
class Standard implements PricingStrategy { price(b) { return b } }
class Discount implements PricingStrategy { price(b) { return b * 0.9 } }

class Checkout {
  constructor(private strategy: PricingStrategy) {}
  total(base: number) { return this.strategy.price(base) }
}`,
    explanation:
      'Strategies swap behavior without subclassing, keeping dependencies explicit.',
  },
]

const pitfalls = [
  'Deep inheritance hierarchies create fragile base class problems and tight coupling.',
  'God objects accumulate too many responsibilities, hiding dependencies and hindering testing.',
  'Mutability everywhere leads to shared-state bugs; prefer immutable value objects and controlled mutation.',
  'Overusing patterns for their own sake adds ceremony without clarity.',
  'Null references as defaults cause runtime failures; prefer safe defaults or option types when available.',
  'Tight coupling between layers makes refactoring painful.',
  'Violating LSP leads to subtle runtime bugs in polymorphic code.',
]

const decisionPoints = [
  'Modeling rich domains with long-lived invariants: OOP works well when objects guard state and enforce rules.',
  'Need runtime extensibility: interfaces and dynamic dispatch allow new behaviors without changing callers.',
  'Performance critical data pipelines: consider data oriented or functional styles to improve locality and parallelism.',
  'Team and tooling: static OOP languages pair well with refactoring tools; dynamic OOP eases metaprogramming but needs strong tests.',
  'Large teams with evolving requirements benefit from stable interfaces and substitution.',
]

const advancedInsights = [
  {
    title: 'SOLID and design heuristics',
    detail:
      'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion reduce coupling and improve substitutability.',
  },
  {
    title: 'Value objects and immutability',
    detail:
      'Model domain values as immutable objects to simplify equality, caching, and concurrency. Keep mutation in aggregate roots or services.',
  },
  {
    title: 'Data oriented design contrast',
    detail:
      'Grouping data by access patterns (struct of arrays) can outperform object graphs. Many engines mix OOP interfaces with data oriented internals.',
  },
  {
    title: 'Devirtualization and sealing',
    detail:
      'Compilers can optimize virtual calls to direct calls when classes are final or call sites are monomorphic, cutting dispatch overhead in hot loops.',
  },
  {
    title: 'Domain-driven design',
    detail:
      'Entities, aggregates, and bounded contexts bring clarity to complex business models.',
  },
  {
    title: 'Composition at scale',
    detail:
      'Dependency injection containers manage wiring but require disciplined boundaries to avoid magic.',
  },
]

const sources = [
  'Smalltalk-80: The Language and its Implementation for classic message passing and live environments.',
  'The C++ Programming Language (Stroustrup) and Effective C++ (Meyers) for systems OOP patterns and pitfalls.',
  'Effective Java (Bloch) for pragmatic guidance on immutability, equals/hashCode, and inheritance traps.',
  'Design Patterns (Gamma et al.) and SOLID principles for reusable OOP heuristics.',
  'GeeksforGeeks: OOP concepts overview for quick contrasts and definitions.',
]

const takeaways = [
  'OOP encapsulates data with behavior to protect invariants and enable substitution through interfaces.',
  'Composition is safer than deep inheritance; use inheritance sparingly for true is-a relationships.',
  'Indirection and object graphs add constant overhead; be mindful of dispatch costs, allocation, and cache behavior in hot paths.',
  'Clear contracts, immutability where possible, and disciplined use of patterns keep OOP codebases maintainable.',
  'Interfaces and dependency direction matter more than class count for long-term sustainability.',
  'Blend OOP with FP or data-oriented techniques where performance or clarity demands it.',
]

const toolingEcosystem = [
  {
    title: 'Languages',
    detail:
      'Java, C#, C++, Swift, Kotlin, and Python offer different balances of safety, performance, and expressiveness.',
  },
  {
    title: 'Testing and tooling',
    detail:
      'Mocking frameworks, contract tests, and refactoring tools strengthen OOP workflows.',
  },
  {
    title: 'Frameworks',
    detail:
      'Spring, .NET, and Cocoa provide conventions and dependency management for large systems.',
  },
  {
    title: 'Architecture',
    detail:
      'Layered and hexagonal architectures keep dependencies flowing inward.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Trace object lifecycles',
    detail:
      'Profile allocations and garbage collection to locate leaks or hotspots.',
  },
  {
    title: 'Inspect polymorphism',
    detail:
      'Confirm dynamic dispatch targets when behavior is unexpected.',
  },
  {
    title: 'Test boundaries',
    detail:
      'Use interface-driven tests to isolate side effects and dependencies.',
  },
  {
    title: 'Reduce coupling',
    detail:
      'Refactor large classes into focused objects to improve clarity.',
  },
]

const productionChecklist = [
  {
    title: 'Design',
    detail:
      'Validate boundaries and ensure responsibilities are clear.',
  },
  {
    title: 'Performance',
    detail:
      'Measure dispatch-heavy code paths and reduce object churn.',
  },
  {
    title: 'Reliability',
    detail:
      'Guard invariants and enforce contracts through tests and types.',
  },
  {
    title: 'Maintainability',
    detail:
      'Prefer composition and small interfaces over deep inheritance.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Classes, objects, encapsulation, and inheritance basics.',
  },
  {
    step: 'Design principles',
    detail: 'SOLID, design patterns, and dependency direction.',
  },
  {
    step: 'Architecture',
    detail: 'Layering, DI, and domain-driven design.',
  },
  {
    step: 'Performance and tooling',
    detail: 'Profiling, testing, and memory management.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.oop-win98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.oop-win98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.oop-win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.oop-win98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.oop-win98-titlecontrols {
  display: flex;
  gap: 2px;
}

.oop-win98-control {
  width: 18px;
  height: 16px;
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
  font-size: 11px;
  line-height: 1;
}

.oop-win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.oop-win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.oop-win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.oop-win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.oop-win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.oop-win98-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.oop-win98-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.oop-win98-toc li {
  margin: 0 0 8px;
}

.oop-win98-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.oop-win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.oop-win98-content h1 {
  font-size: 20px;
  margin: 0 0 12px;
}

.oop-win98-content h2 {
  font-size: 16px;
  margin: 0 0 8px;
}

.oop-win98-content h3 {
  font-size: 13px;
  margin: 0 0 6px;
}

.oop-win98-content section {
  margin: 0 0 20px;
}

.oop-win98-content p,
.oop-win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.oop-win98-content p {
  margin: 0 0 10px;
}

.oop-win98-content ul,
.oop-win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.oop-win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.oop-win98-code {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin: 6px 0 10px;
  padding: 8px;
}

.oop-win98-code code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .oop-win98-main {
    grid-template-columns: 1fr;
  }

  .oop-win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .oop-win98-titletext {
    font-size: 13px;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Real-world Applications' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-tooling', label: 'Tooling and Ecosystem' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [
    { id: 'glossary-terms', label: 'Terms and Concepts' },
    { id: 'glossary-sources', label: 'Further Reading and Sources' },
  ],
}

export default function OOPPage(): JSX.Element {
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
    document.title = `Object-Oriented Programming (OOP) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Object-Oriented Programming (OOP)',
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
    <div className="oop-win98-page">
      <style>{win98HelpStyles}</style>
      <div className="oop-win98-window" role="presentation">
        <header className="oop-win98-titlebar">
          <span className="oop-win98-titletext">Object-Oriented Programming (OOP)</span>
          <div className="oop-win98-titlecontrols">
            <button className="oop-win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="oop-win98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="oop-win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`oop-win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="oop-win98-main">
          <aside className="oop-win98-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="oop-win98-content">
            <h1>Object-Oriented Programming (OOP)</h1>
            <p>
              Object-oriented programming treats software as collaborating objects that hold state and expose behavior. It excels at
              encapsulating invariants and modeling rich domains, but requires discipline to avoid brittle hierarchies, overuse of
              patterns, and performance surprises from indirection.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview">
                  <h2>Overview</h2>
                  <p>
                    OOP centers on objects that guard their own state and respond to messages. Interfaces and polymorphism allow code to
                    depend on contracts instead of concrete types, enabling extension without changing callers. The costs are extra
                    indirection, potential cache misses, and the risk of tangled hierarchies if design discipline slips.
                  </p>
                </section>
                <hr className="oop-win98-divider" />
                <section id="bp-history">
                  <h2>Historical Context</h2>
                  {milestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications">
                  <h2>Real-world Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-complexity">
                  <h2>Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Optimize by flattening hot paths: reduce allocations, consider final classes to allow devirtualization, and batch work
                    to improve cache locality. When abstraction cost is too high, isolate data-oriented or functional slices for critical
                    code.
                  </p>
                </section>
                <section id="bp-takeaways">
                  <h2>Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models">
                  <h2>Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics">
                  <h2>How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3>{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-when-to-use">
                  <h2>When to Use It</h2>
                  <ol>
                    {decisionPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-pitfalls">
                  <h2>Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced">
                  <h2>Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling">
                  <h2>Tooling and Ecosystem</h2>
                  {toolingEcosystem.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging">
                  <h2>Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-production">
                  <h2>Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning">
                  <h2>Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical">
                <h2>Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3>{example.title}</h3>
                    <div className="oop-win98-code">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms">
                  <h2>Terms and Concepts</h2>
                  <p><strong>Object:</strong> An instance that combines state and behavior behind a defined interface.</p>
                  <p><strong>Class:</strong> A blueprint that defines structure and behavior for objects.</p>
                  <p><strong>Encapsulation:</strong> Hiding internal state and exposing controlled operations to protect invariants.</p>
                  <p><strong>Interface:</strong> A contract that specifies behavior independent of concrete implementation.</p>
                  <p><strong>Polymorphism:</strong> Ability to use one interface with multiple implementations through substitution.</p>
                  <p><strong>Dynamic dispatch:</strong> Runtime selection of the method implementation for a polymorphic call.</p>
                  <p><strong>Inheritance:</strong> Reusing behavior and contracts through an is-a relationship.</p>
                  <p><strong>Composition:</strong> Building behavior by assembling collaborating objects rather than extending a base class.</p>
                  <p><strong>Liskov Substitution Principle (LSP):</strong> Subtypes must preserve expected behavior of base contracts.</p>
                  <p><strong>RAII:</strong> Resource Acquisition Is Initialization; ties resource lifetime to object lifetime.</p>
                  <p><strong>Value object:</strong> Immutable domain value typically compared by contents rather than identity.</p>
                  <p><strong>Dependency injection:</strong> Supplying dependencies from outside to reduce coupling and improve testability.</p>
                </section>
                <section id="glossary-sources">
                  <h2>Further Reading and Sources</h2>
                  <ul>
                    {sources.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
