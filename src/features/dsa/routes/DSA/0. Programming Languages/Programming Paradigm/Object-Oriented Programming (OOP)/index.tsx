import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
]

const mechanics = [
  {
    heading: 'Encapsulation and invariants',
    bullets: [
      'Visibility (private/protected/public) controls who can mutate state. Invariants are guarded by methods that validate changes.',
      'Interfaces define contracts without exposing data layout, enabling substitution and mocking.',
    ],
  },
  {
    heading: 'Polymorphism and dispatch',
    bullets: [
      'Subtype polymorphism lets code operate on interface types while concrete classes provide behavior.',
      'Dynamic dispatch typically uses vtables or inline caches to select the correct method at runtime.',
      'Parametric polymorphism (generics) enables reuse without sacrificing type safety, reducing the need for base classes.',
    ],
  },
  {
    heading: 'Inheritance and composition tools',
    bullets: [
      'Inheritance shares code and contracts but couples base and derived classes; changes in base can ripple unexpectedly.',
      'Composition delegates behavior to contained objects. Decorator and Strategy patterns formalize this approach.',
      'Mixins and traits offer horizontal reuse without deep hierarchies in some languages.',
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
]

const pitfalls = [
  'Deep inheritance hierarchies create fragile base class problems and tight coupling.',
  'God objects accumulate too many responsibilities, hiding dependencies and hindering testing.',
  'Mutability everywhere leads to shared-state bugs; prefer immutable value objects and controlled mutation.',
  'Overusing patterns for their own sake adds ceremony without clarity.',
  'Null references as defaults cause runtime failures; prefer safe defaults or option types when available.',
]

const decisionPoints = [
  'Modeling rich domains with long-lived invariants: OOP works well when objects guard state and enforce rules.',
  'Need runtime extensibility: interfaces and dynamic dispatch allow new behaviors without changing callers.',
  'Performance critical data pipelines: consider data oriented or functional styles to improve locality and parallelism.',
  'Team and tooling: static OOP languages pair well with refactoring tools; dynamic OOP eases metaprogramming but needs strong tests.',
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
]

export default function OOPPage(): JSX.Element {
  return (
    <TopicLayout
      title="Object-Oriented Programming (OOP)"
      subtitle="Modeling systems with objects, classes, and messages"
      intro="Object-oriented programming treats software as collaborating objects that hold state and expose behavior. It excels at encapsulating invariants and modeling rich domains, but requires discipline to avoid brittle hierarchies, overuse of patterns, and performance surprises from indirection."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          OOP centers on objects that guard their own state and respond to messages. Interfaces and polymorphism allow code to
          depend on contracts instead of concrete types, enabling extension without changing callers. The costs are extra
          indirection, potential cache misses, and the risk of tangled hierarchies if design discipline slips.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Optimize by flattening hot paths: reduce allocations, consider final classes to allow devirtualization, and batch work to
          improve cache locality. When abstraction cost is too high, isolate data oriented or functional slices for critical code.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Further reading and sources">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
