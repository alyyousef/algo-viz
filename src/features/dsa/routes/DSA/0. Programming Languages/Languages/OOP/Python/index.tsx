import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Python 0.9.0 brings classes and exceptions (1991)',
    detail:
      'Guido van Rossum releases Python with classes, functions, and modules, aiming for readable, batteries-included development.',
  },
  {
    title: 'Python 2.0 adds list comprehensions and GC (2000)',
    detail:
      'Language ergonomics improve with list comprehensions and a cycle-detecting garbage collector for object graphs.',
  },
  {
    title: 'Python 3.0 modernizes the object model (2008)',
    detail:
      'Breaking changes clean up unicode, iterators, and library APIs, strengthening the long-term OOP story.',
  },
  {
    title: 'Type hints mature with protocols and dataclasses (2018)',
    detail:
      'PEP 544 and PEP 557 make structural typing and data-oriented classes first-class, guiding large codebases.',
  },
]

const mentalModels = [
  {
    title: 'Everything is an object',
    detail:
      'Numbers, functions, modules, and classes are instances of types. You can inspect, pass, and compose them consistently.',
  },
  {
    title: 'Namespaces are dictionaries',
    detail:
      'Attributes live in mappings. Classes and instances resolve names through a defined lookup path instead of compile-time slots.',
  },
  {
    title: 'Duck typing over rigid hierarchies',
    detail:
      'Behavior matters more than lineage. If an object responds to a protocol, it can be used regardless of its base class.',
  },
]

const oopPillars = [
  {
    heading: 'Encapsulation',
    bullets: [
      'Conventions like _private and __name mangling communicate intent without hard access modifiers.',
      'Properties wrap validation while keeping attribute syntax.',
      'Modules and packages provide coarse-grained encapsulation boundaries.',
    ],
  },
  {
    heading: 'Inheritance',
    bullets: [
      'Single and multiple inheritance are supported; method resolution order (MRO) is deterministic (C3 linearization).',
      'Mixins enable behavior sharing without deep hierarchies.',
      'Use super() consistently to keep cooperative multiple inheritance stable.',
    ],
  },
  {
    heading: 'Polymorphism',
    bullets: [
      'Duck typing and protocols emphasize interfaces over base classes.',
      'Operator overloading via dunder methods makes custom types feel built-in.',
      'Abstract base classes define optional contracts when structure is not enough.',
    ],
  },
  {
    heading: 'Composition',
    bullets: [
      'Prefer composing smaller objects rather than deep inheritance trees.',
      'Dependency injection keeps collaborations explicit and testable.',
      'Dataclasses help wire simple, immutable components quickly.',
    ],
  },
]

const objectModelNotes = [
  {
    title: 'Attribute lookup path',
    detail:
      'Instance attributes are checked first, then class attributes, then base classes in MRO order. __getattr__ and descriptors can intercept the flow.',
  },
  {
    title: 'Descriptors power properties',
    detail:
      'Objects defining __get__ and __set__ control access. Properties, staticmethod, and classmethod are descriptor-based.',
  },
  {
    title: 'Method binding is automatic',
    detail:
      'Functions stored on a class become bound methods when accessed via instances, inserting self as the first parameter.',
  },
  {
    title: 'Object lifecycle hooks',
    detail:
      '__new__ allocates, __init__ initializes, __del__ finalizes. __repr__ and __str__ control debug and user-facing text.',
  },
]

const dataModelProtocols = [
  {
    title: 'Containers and iteration',
    detail:
      'Implement __len__, __iter__, and __contains__ to integrate with len(), for loops, and in checks.',
  },
  {
    title: 'Numeric and ordering behavior',
    detail:
      'Override __add__, __mul__, __eq__, __lt__, and friends to model math or ordering on domain objects.',
  },
  {
    title: 'Context management',
    detail:
      'Define __enter__ and __exit__ to manage resources with the with statement.',
  },
  {
    title: 'Callable objects',
    detail:
      'Define __call__ to make instances behave like functions for configurable strategies.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Dynamic attribute lookup',
    detail:
      'Flexibility costs a few dictionary lookups per access. Local variables and __slots__ reduce overhead in tight loops.',
  },
  {
    title: 'Memory layout of objects',
    detail:
      'Each instance carries a __dict__ by default. For millions of objects, slots or arrays reduce memory pressure.',
  },
  {
    title: 'Interpreter overhead',
    detail:
      'Method calls and dynamic dispatch are slower than compiled languages. Use C-accelerated libraries for hot paths.',
  },
  {
    title: 'Concurrency constraints',
    detail:
      'The GIL simplifies object safety but limits CPU-bound threading; use multiprocessing or native extensions for parallelism.',
  },
]

const realWorldUses = [
  {
    context: 'Web services and APIs',
    detail:
      'Frameworks like Django and FastAPI rely on clean class design for models, views, and dependency injection.',
  },
  {
    context: 'Data and ML pipelines',
    detail:
      'Classes encapsulate preprocessing, estimators, and evaluation strategies while leveraging vectorized backends.',
  },
  {
    context: 'Automation and tooling',
    detail:
      'Scripts wrap system commands into reusable objects with clear interfaces and composable workflows.',
  },
  {
    context: 'Gaming and simulation',
    detail:
      'Entity systems model characters, states, and interactions; composition keeps behavior modular.',
  },
]

const examples = [
  {
    title: 'Plain class with behavior',
    code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount`,
    explanation:
      'State lives on the instance, and behavior enforces rules. A leading underscore signals internal attributes by convention.',
  },
  {
    title: 'Dataclass for data-rich objects',
    code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def distance_to_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5`,
    explanation:
      'Dataclasses generate boilerplate (init, repr, eq) while keeping methods for domain logic.',
  },
  {
    title: 'Descriptor-powered property',
    code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value`,
    explanation:
      'Properties keep a clean attribute interface while enforcing invariants on assignment.',
  },
  {
    title: 'Duck typing with protocols',
    code: `from typing import Protocol

class Serializer(Protocol):
    def dumps(self, data) -> str: ...

def save(serializer: Serializer, data):
    return serializer.dumps(data)`,
    explanation:
      'Any object with a dumps method works, regardless of inheritance, reinforcing interface-based design.',
  },
]

const pitfalls = [
  'Mutable default arguments (like [] or {}) are shared across instances.',
  'Class attributes are shared state; accidental mutation affects every instance.',
  'Skipping super() breaks cooperative multiple inheritance and mixins.',
  'Confusing is with == leads to identity bugs when comparing values.',
  'Monkey patching can hide dependencies and make tests flaky.',
]

const decisionGuidance = [
  'Model domain entities with classes when you need identity and behavior, not just data.',
  'Use dataclasses or namedtuples for value objects to reduce boilerplate.',
  'Prefer composition and small, testable collaborators to deep inheritance trees.',
  'Introduce protocols or ABCs when you need explicit contracts across modules.',
  'Use __slots__ for large numbers of simple objects to save memory.',
]

const advancedInsights = [
  {
    title: 'MRO and cooperative inheritance',
    detail:
      'C3 linearization ensures a consistent order. Every class in the chain should call super() to keep initialization safe.',
  },
  {
    title: 'Metaclasses for frameworks',
    detail:
      'Metaclasses customize class creation, enabling declarative APIs like ORMs and validation layers.',
  },
  {
    title: 'Descriptors as reusable field logic',
    detail:
      'Descriptors abstract validation and computation once, then reuse it across many classes and attributes.',
  },
  {
    title: 'Slots and weakrefs',
    detail:
      '__slots__ shrink memory but remove __dict__ by default; add __weakref__ if instances need weak references.',
  },
]

const takeaways = [
  'Python OOP is flexible: classes are dynamic objects, and behavior is shaped by the data model.',
  'Good design leans on composition, protocols, and small interfaces over deep inheritance.',
  'Performance comes from minimizing dynamic overhead in hot paths and using optimized libraries.',
  'Type hints and dataclasses scale OOP to larger teams without sacrificing readability.',
]

export default function PythonOopPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Python</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Object-oriented Python with a dynamic, protocol-driven core</div>
              <p className="win95-text">
                Python treats everything as an object, but it does not force rigid hierarchies. The language favors readable
                composition, duck typing, and a powerful data model that lets you override how your objects behave. This page
                breaks down Python OOP mechanics, design choices, and practical guidance for building maintainable systems.
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
                Python blends classic OOP (classes, inheritance, encapsulation) with a dynamic object model. Interfaces are
                expressed through behavior rather than strict base classes, which keeps code flexible but demands discipline
                in naming, testing, and design.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: OOP pillars in Python</legend>
            <div className="win95-grid win95-grid-2">
              {oopPillars.map((block) => (
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
            <legend>How it works: Python object model</legend>
            <div className="win95-grid win95-grid-2">
              {objectModelNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data model protocols</legend>
            <div className="win95-grid win95-grid-2">
              {dataModelProtocols.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTradeoffs.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Python OOP optimizes for clarity and flexibility. Use it to express domain logic, then lean on optimized
                libraries or native extensions for compute-heavy workloads.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
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
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
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
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
