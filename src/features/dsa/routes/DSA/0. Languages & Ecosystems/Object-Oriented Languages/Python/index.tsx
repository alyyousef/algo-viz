import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
  {
    title: 'Performance improvements in 3.10+ (2020s)',
    detail:
      'Faster CPython and specialization work improved common OOP workloads without changing APIs.',
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
  {
    title: 'Explicit is better than implicit',
    detail: 'Readable naming and clear interfaces outweigh clever inheritance tricks.',
  },
]

const languageFundamentals = [
  {
    title: 'Interpreted and dynamic',
    detail: 'Python executes bytecode in an interpreter, favoring flexibility and fast iteration.',
  },
  {
    title: 'Class-based object model',
    detail: 'Classes define behavior, while instances hold state and delegate to class methods.',
  },
  {
    title: 'First-class functions',
    detail: 'Functions are objects, enabling decorators, callbacks, and strategy patterns.',
  },
  {
    title: 'Batteries included',
    detail: 'The standard library provides IO, networking, data formats, and testing tools.',
  },
]

const runtimePipeline = [
  {
    stage: 'Parse and compile',
    description: 'Source code compiles to bytecode for the CPython VM.',
  },
  {
    stage: 'Bytecode execution',
    description: 'The interpreter executes bytecode instructions.',
  },
  {
    stage: 'C-extensions',
    description: 'Performance-sensitive modules run in optimized native code.',
  },
  {
    stage: 'GC and ref counting',
    description: 'Reference counting and cycle detection manage memory.',
  },
]

const typeSystemDetails = [
  {
    title: 'Dynamic typing',
    detail: 'Types are enforced at runtime, enabling rapid change but requiring tests.',
  },
  {
    title: 'Type hints',
    detail: 'Optional annotations improve tooling and documentation without changing runtime.',
  },
  {
    title: 'Protocols and ABCs',
    detail: 'Protocols define structural typing; ABCs define explicit contracts.',
  },
  {
    title: 'Dataclasses and attrs',
    detail: 'Data-centric classes reduce boilerplate and make intent clearer.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Collections and dataclasses',
    detail: 'collections and dataclasses provide structured containers and helpers.',
  },
  {
    title: 'asyncio',
    detail: 'Async event loops for high-concurrency IO workloads.',
  },
  {
    title: 'pathlib and typing',
    detail: 'Modern APIs for file paths and type annotations.',
  },
  {
    title: 'unittest and logging',
    detail: 'Built-in testing and structured logging tools.',
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
    detail: 'Define __enter__ and __exit__ to manage resources with the with statement.',
  },
  {
    title: 'Callable objects',
    detail: 'Define __call__ to make instances behave like functions for configurable strategies.',
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
  {
    title: 'Import and startup cost',
    detail:
      'Large dependency graphs increase startup time; keep modules lean for short-lived tasks.',
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
  {
    context: 'DevOps and platform tooling',
    detail: 'Infrastructure scripts and CLIs use OOP to encapsulate environments and tasks.',
  },
  {
    context: 'Desktop apps',
    detail: 'Qt and Tkinter use classes for widgets, signals, and event handling.',
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
  {
    title: 'Context manager with __enter__',
    code: `class Timer:
    def __enter__(self):
        import time
        self._start = time.time()
        return self

    def __exit__(self, exc_type, exc, tb):
        import time
        self.elapsed = time.time() - self._start

with Timer() as t:
    _ = sum(range(100000))
print(t.elapsed)`,
    explanation: 'Context managers model resource lifecycles cleanly and predictably.',
  },
  {
    title: 'Mixin for shared behavior',
    code: `class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(JsonMixin):
    def __init__(self, name):
        self.name = name`,
    explanation: 'Mixins share behavior without deep inheritance.',
  },
]

const pitfalls = [
  'Mutable default arguments (like [] or {}) are shared across instances.',
  'Class attributes are shared state; accidental mutation affects every instance.',
  'Skipping super() breaks cooperative multiple inheritance and mixins.',
  'Confusing is with == leads to identity bugs when comparing values.',
  'Monkey patching can hide dependencies and make tests flaky.',
  'Relying on __del__ for cleanup instead of context managers.',
  'Overusing inheritance when composition would be clearer.',
]

const decisionGuidance = [
  'Model domain entities with classes when you need identity and behavior, not just data.',
  'Use dataclasses or namedtuples for value objects to reduce boilerplate.',
  'Prefer composition and small, testable collaborators to deep inheritance trees.',
  'Introduce protocols or ABCs when you need explicit contracts across modules.',
  'Use __slots__ for large numbers of simple objects to save memory.',
  'Choose async patterns for IO-heavy systems, multiprocessing for CPU-heavy ones.',
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
  {
    title: 'Typing for scale',
    detail: 'Type hints, Protocols, and mypy reduce regressions in large OOP systems.',
  },
]

const takeaways = [
  'Python OOP is flexible: classes are dynamic objects, and behavior is shaped by the data model.',
  'Good design leans on composition, protocols, and small interfaces over deep inheritance.',
  'Performance comes from minimizing dynamic overhead in hot paths and using optimized libraries.',
  'Type hints and dataclasses scale OOP to larger teams without sacrificing readability.',
  'Clear boundaries and tests are essential in dynamic systems.',
]

const toolingWorkflow = [
  {
    title: 'Typing and linting',
    detail: 'mypy, ruff, and pylint keep large class hierarchies consistent.',
  },
  {
    title: 'Testing',
    detail: 'pytest and unittest cover unit and integration tests.',
  },
  {
    title: 'Packaging',
    detail: 'Poetry, uv, and pip manage environments and dependencies.',
  },
  {
    title: 'Profiling',
    detail: 'cProfile and py-spy reveal hot paths and allocation costs.',
  },
]

const concurrencyOptions = [
  {
    title: 'asyncio',
    detail: 'Cooperative concurrency for IO-bound tasks and servers.',
  },
  {
    title: 'multiprocessing',
    detail: 'Multiple processes bypass the GIL for CPU-heavy tasks.',
  },
  {
    title: 'threading',
    detail: 'Threads are best for IO-bound work due to the GIL.',
  },
  {
    title: 'native extensions',
    detail: 'Cython, Rust, or C extensions unlock parallel CPU work.',
  },
]

const interopOptions = [
  {
    title: 'C and C++ bindings',
    detail: 'ctypes, cffi, and pybind11 expose native libraries.',
  },
  {
    title: 'Java and .NET',
    detail: 'JPype and pythonnet bridge managed runtimes.',
  },
  {
    title: 'Web and JS',
    detail: 'Pyodide and WebAssembly run Python in the browser.',
  },
  {
    title: 'RPC and APIs',
    detail: 'gRPC and REST are common integration paths.',
  },
]

const deploymentOptions = [
  {
    title: 'Web services',
    detail: 'Deploy APIs with FastAPI, Django, or Flask.',
  },
  {
    title: 'CLI tools',
    detail: 'Typer and Click build command-line apps.',
  },
  {
    title: 'Packaging apps',
    detail: 'PyInstaller and zipapp bundle applications.',
  },
  {
    title: 'Containers',
    detail: 'Docker images standardize runtime environments.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Java',
    detail: 'Python is more flexible but lacks static enforcement and JVM performance.',
  },
  {
    title: 'Compared to C++',
    detail: 'Python trades low-level control for speed of development and readability.',
  },
  {
    title: 'Compared to Ruby',
    detail: 'Python has a larger ecosystem and broader tooling adoption.',
  },
  {
    title: 'Compared to Go',
    detail: 'Python is more dynamic, Go offers simpler concurrency and faster binaries.',
  },
]

const learningPath = [
  {
    title: 'Core syntax and classes',
    detail: 'Learn classes, methods, and instance vs class attributes.',
  },
  {
    title: 'Dataclasses and type hints',
    detail: 'Adopt dataclasses and typing for clarity in larger projects.',
  },
  {
    title: 'Protocols and ABCs',
    detail: 'Use Protocols and ABCs to design clean interfaces.',
  },
  {
    title: 'Performance awareness',
    detail: 'Profile, use __slots__, and lean on optimized libraries.',
  },
  {
    title: 'Production patterns',
    detail: 'Test, package, and deploy with standard tooling.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const glossary = [
  {
    term: 'Duck Typing',
    definition: 'Compatibility based on behavior and methods, not strict inheritance.',
  },
  {
    term: 'MRO',
    definition: 'Method Resolution Order used to resolve attributes in inheritance chains.',
  },
  {
    term: 'Descriptor',
    definition: 'An object with __get__ / __set__ hooks controlling attribute access.',
  },
  {
    term: 'Dataclass',
    definition: 'A class decorator that generates common methods for data-centric classes.',
  },
  { term: 'Protocol', definition: 'Structural typing contract used by type checkers.' },
  {
    term: '__slots__',
    definition: 'A way to reduce per-instance memory by removing dynamic __dict__.',
  },
  {
    term: 'GIL',
    definition: 'Global Interpreter Lock that affects CPU-bound thread parallelism in CPython.',
  },
  {
    term: 'Mixin',
    definition: 'A reusable behavior class intended to be composed via inheritance.',
  },
  { term: 'ABC', definition: 'Abstract Base Class used for explicit interface contracts.' },
  {
    term: 'Context Manager',
    definition: 'An object implementing __enter__ and __exit__ for scoped resources.',
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
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-runtime', label: 'Runtime Pipeline' },
    { id: 'core-types', label: 'Type System and Design' },
    { id: 'core-library', label: 'Standard Library' },
    { id: 'core-pillars', label: 'OOP Pillars' },
    { id: 'core-workflow', label: 'Tooling and Workflow' },
    { id: 'core-object-model', label: 'Python Object Model' },
    { id: 'core-protocols', label: 'Data Model Protocols' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
    { id: 'core-performance', label: 'Complexity and Tradeoffs' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-interop', label: 'Interoperability and Deployment' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-compare', label: 'Comparisons and Tradeoffs' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PythonOopPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Python',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Python"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Python</h1>
      <p>
        Python treats everything as an object, but it does not force rigid hierarchies. The language
        favors readable composition, duck typing, and a powerful data model that lets you override
        how your objects behave. This document focuses on Python OOP mechanics, design choices, and
        practical guidance for maintainable systems.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Python blends classic OOP (classes, inheritance, encapsulation) with a dynamic object
              model. Interfaces are expressed through behavior rather than strict base classes,
              which keeps code flexible but demands discipline in naming, testing, and design.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">Language Fundamentals</h2>
            {languageFundamentals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime Pipeline</h2>
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>What happens</th>
                </tr>
              </thead>
              <tbody>
                {runtimePipeline.map((item) => (
                  <tr key={item.stage}>
                    <td>{item.stage}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-types" className="bin98-section">
            <h2 className="bin98-heading">Type System and Design</h2>
            {typeSystemDetails.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-library" className="bin98-section">
            <h2 className="bin98-heading">Standard Library Highlights</h2>
            {standardLibraryHighlights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">How It Works: OOP Pillars in Python</h2>
            {oopPillars.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Tooling and Workflow</h2>
            {toolingWorkflow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-object-model" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Python Object Model</h2>
            {objectModelNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-protocols" className="bin98-section">
            <h2 className="bin98-heading">Data Model Protocols</h2>
            {dataModelProtocols.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-concurrency" className="bin98-section">
            <h2 className="bin98-heading">Concurrency and Parallelism</h2>
            {concurrencyOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {performanceTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Python OOP optimizes for clarity and flexibility. Use it to express domain logic, then
              lean on optimized libraries or native extensions for compute-heavy workloads.
            </p>
          </section>
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-interop" className="bin98-section">
            <h2 className="bin98-heading">Interoperability and Deployment</h2>
            <h3 className="bin98-subheading">Interoperability</h3>
            {interopOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Deployment</h3>
            {deploymentOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Comparisons and Tradeoffs</h2>
            {comparisonNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-learning" className="bin98-section">
            <h2 className="bin98-heading">Learning Path</h2>
            {learningPath.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
