import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'


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

export default function OOPPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Object-Oriented Programming (OOP)</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Modeling systems with objects, classes, and messages</div>
              <p className="win95-text">
                Object-oriented programming treats software as collaborating objects that hold state and expose behavior. It excels at
                encapsulating invariants and modeling rich domains, but requires discipline to avoid brittle hierarchies, overuse of
                patterns, and performance surprises from indirection.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                OOP centers on objects that guard their own state and respond to messages. Interfaces and polymorphism allow code to
                depend on contracts instead of concrete types, enabling extension without changing callers. The costs are extra
                indirection, potential cache misses, and the risk of tangled hierarchies if design discipline slips.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {milestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Optimize by flattening hot paths: reduce allocations, consider final classes to allow devirtualization, and batch work
                to improve cache locality. When abstraction cost is too high, isolate data oriented or functional slices for critical
                code.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and ecosystem</legend>
            <div className="win95-grid win95-grid-2">
              {toolingEcosystem.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging workflow</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Production checklist</legend>
            <div className="win95-grid win95-grid-2">
              {productionChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Further reading and sources</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {sources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {takeaways.map((item) => (
                <div key={item} className="win95-panel win95-panel--raised">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

