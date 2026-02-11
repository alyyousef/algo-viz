import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Write once, run anywhere (1995)',
    detail:
      'Java launched with the JVM, promising portability and safer memory management than C++.',
  },
  {
    title: 'J2EE and enterprise patterns (late 1990s)',
    detail:
      'Servlets, EJBs, and early app servers established Java as the enterprise default.',
  },
  {
    title: 'Enterprise dominance (2000s)',
    detail:
      'Java became the backbone of large-scale enterprise systems with robust tooling and frameworks.',
  },
  {
    title: 'Modern language upgrades (Java 8+)',
    detail:
      'Lambdas, streams, and functional features modernized the language while keeping backward compatibility.',
  },
  {
    title: 'Faster release cadence (Java 9+)',
    detail:
      'The six-month release cycle accelerated feature delivery and JVM improvements.',
  },
  {
    title: 'Cloud-native and microservices era',
    detail:
      'Frameworks like Spring Boot and Quarkus pushed Java into fast-starting microservices and cloud deployments.',
  },
  {
    title: 'Modern JVM era (2020s)',
    detail:
      'Records, sealed classes, and Loom brought improved data modeling and concurrency.',
  },
]

const mentalModels = [
  {
    title: 'JVM as a portable runtime',
    detail:
      'Java compiles to bytecode, and the JVM abstracts hardware differences while optimizing at runtime.',
  },
  {
    title: 'Garbage collection handles memory',
    detail:
      'Automatic memory management simplifies development but requires awareness of GC pauses.',
  },
  {
    title: 'Strong typing for large codebases',
    detail:
      'Static types and interfaces help teams manage complexity and reduce runtime errors.',
  },
  {
    title: 'Frameworks as productivity layers',
    detail:
      'Spring, Jakarta EE, and friends provide conventions that scale teams and systems.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled to bytecode',
    detail:
      'Java source compiles to JVM bytecode, enabling portability across platforms.',
  },
  {
    title: 'Class-based OOP',
    detail:
      'Everything is organized into classes with encapsulation and access control.',
  },
  {
    title: 'Managed memory',
    detail:
      'The GC manages allocation and cleanup, removing manual memory errors.',
  },
  {
    title: 'Strong standard library',
    detail:
      'Collections, IO, networking, and concurrency are built in and battle-tested.',
  },
]

const runtimePipeline = [
  {
    stage: 'Compile',
    description: 'javac produces bytecode (.class files).',
  },
  {
    stage: 'Class loading',
    description: 'The JVM loads classes on demand with verification.',
  },
  {
    stage: 'JIT optimization',
    description: 'Hot methods are compiled to native code for speed.',
  },
  {
    stage: 'GC and runtime services',
    description: 'Memory is reclaimed and runtime services manage threads and IO.',
  },
]

const typeSystemDetails = [
  {
    title: 'Static typing',
    detail:
      'Types are checked at compile time for safer refactoring and maintenance.',
  },
  {
    title: 'Generics',
    detail:
      'Parameterized types add reuse while preserving type safety.',
  },
  {
    title: 'Records and sealed classes',
    detail:
      'Records model immutable data; sealed classes constrain hierarchies.',
  },
  {
    title: 'Null safety discipline',
    detail:
      'Nulls are allowed, so Optional and annotations help prevent errors.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Collections framework',
    detail:
      'Lists, sets, maps, and queues cover most data structures.',
  },
  {
    title: 'Streams and functional tools',
    detail:
      'Streams provide declarative data processing and parallelization.',
  },
  {
    title: 'Concurrency utilities',
    detail:
      'Executors, locks, atomics, and concurrent collections support safe parallelism.',
  },
  {
    title: 'IO and NIO',
    detail:
      'NIO enables non-blocking IO for scalable servers.',
  },
]

const coreOopFeatures = [
  {
    heading: 'Classes and objects',
    bullets: [
      'Encapsulation with access modifiers.',
      'Constructors enforce initialization logic.',
      'Classes define reusable, modular code.',
      'Records simplify immutable data carriers.',
    ],
  },
  {
    heading: 'Inheritance',
    bullets: [
      'Single inheritance with interfaces for multiple contracts.',
      'Polymorphism via method overriding.',
      'Use composition to avoid fragile hierarchies.',
      'Sealed classes constrain inheritance trees.',
    ],
  },
  {
    heading: 'Interfaces and abstraction',
    bullets: [
      'Interfaces define contracts without implementation.',
      'Default methods enable evolution without breaking code.',
      'Abstract classes share partial behavior.',
      'Functional interfaces power lambdas.',
    ],
  },
  {
    heading: 'Memory and GC',
    bullets: [
      'Automatic garbage collection prevents manual memory bugs.',
      'Tuning JVM parameters can reduce pause times.',
      'Heap sizing affects performance and latency.',
      'Escape analysis reduces allocations.',
    ],
  },
  {
    heading: 'Concurrency',
    bullets: [
      'Threads and executors support parallel workloads.',
      'Concurrent collections simplify thread-safe programming.',
      'Modern features include CompletableFuture and virtual threads.',
      'Structured concurrency is emerging in modern Java.',
    ],
  },
  {
    heading: 'Tooling ecosystem',
    bullets: [
      'Maven and Gradle for dependency management.',
      'Spring for enterprise development.',
      'Profilers and JVM tools for diagnostics.',
      'JFR provides built-in production profiling.',
    ],
  },
]

const performanceNotes = [
  {
    title: 'JIT optimization',
    detail:
      'Hot code paths are optimized at runtime, so long-running services often outperform initial benchmarks.',
  },
  {
    title: 'GC tuning matters',
    detail:
      'Choosing G1, ZGC, or Shenandoah impacts latency and throughput.',
  },
  {
    title: 'Avoid over-allocation',
    detail:
      'Excess object creation increases GC pressure and slows services.',
  },
  {
    title: 'Use profiling tools',
    detail:
      'JFR and async-profiler help identify CPU and allocation hotspots.',
  },
  {
    title: 'Watch startup time',
    detail:
      'Class loading and warmup can dominate short-lived services.',
  },
]

const realWorldUses = [
  {
    context: 'Enterprise backend systems',
    detail:
      'Java powers banking, telecom, and large-scale business applications.',
  },
  {
    context: 'Android apps',
    detail:
      'Java remains core for Android development despite Kotlin adoption.',
  },
  {
    context: 'Big data platforms',
    detail:
      'Hadoop, Spark, and Kafka are built on the JVM, often using Java APIs.',
  },
  {
    context: 'Low-latency services',
    detail:
      'Financial firms use Java with tuned JVMs for reliable low-latency systems.',
  },
  {
    context: 'Cloud-native microservices',
    detail:
      'Spring Boot, Quarkus, and Micronaut power containerized services.',
  },
  {
    context: 'Developer tooling',
    detail:
      'Build tools, IDEs, and static analyzers rely on Java libraries.',
  },
]

const examples = [
  {
    title: 'Class with encapsulation',
    code: `class Account {
  private double balance;

  public Account(double balance) {
    this.balance = balance;
  }

  public void deposit(double amount) {
    balance += amount;
  }

  public double getBalance() {
    return balance;
  }
}`,
    explanation:
      'Encapsulation protects balance updates and exposes controlled methods.',
  },
  {
    title: 'Polymorphism with interfaces',
    code: `interface PaymentMethod {
  void pay(double amount);
}

class Card implements PaymentMethod {
  public void pay(double amount) {
    System.out.println("Paid " + amount);
  }
}

void checkout(PaymentMethod method) {
  method.pay(19.99);
}`,
    explanation:
      'Interfaces provide a contract so different payment types can be swapped.',
  },
  {
    title: 'Streams for aggregation',
    code: `List<Integer> scores = List.of(90, 72, 88, 95);
double avg = scores.stream()
  .filter(s -> s >= 80)
  .mapToInt(s -> s)
  .average()
  .orElse(0);`,
    explanation:
      'Streams make data transformations declarative and parallelizable.',
  },
  {
    title: 'CompletableFuture for async work',
    code: `CompletableFuture<String> result =
  CompletableFuture.supplyAsync(() -> fetchUser())
    .thenApply(user -> enrich(user))
    .thenApply(data -> data.toString());`,
    explanation:
      'CompletableFuture chains asynchronous work without blocking threads.',
  },
  {
    title: 'Record for immutable data',
    code: `record Point(int x, int y) {}

Point p = new Point(3, 4);`,
    explanation:
      'Records reduce boilerplate for simple immutable data carriers.',
  },
]

const pitfalls = [
  'Ignoring GC behavior in low-latency systems.',
  'Overusing inheritance instead of interfaces and composition.',
  'Using heavy frameworks for tiny services, increasing startup time.',
  'Allocating excessive objects in tight loops.',
  'Skipping profiling and guessing performance bottlenecks.',
  'Blocking IO on request threads without timeouts.',
  'Ignoring JVM warmup when benchmarking.',
]

const decisionGuidance = [
  'Need enterprise-grade tooling and a massive ecosystem: Java is strong.',
  'Need portable deployment across platforms: JVM portability helps.',
  'Need low-latency services: Java works with careful tuning.',
  'Need minimal memory footprint and fast startup: evaluate alternatives.',
  'Need safe concurrency and strong typing: Java is reliable.',
  'Need long-lived services with predictable ops: Java is a good fit.',
]

const advancedInsights = [
  {
    title: 'JVM ergonomics',
    detail:
      'Default GC and runtime settings are tuned for throughput, but latency goals often need custom flags.',
  },
  {
    title: 'Modern Java evolution',
    detail:
      'Records, sealed classes, and pattern matching improve expressiveness without losing compatibility.',
  },
  {
    title: 'Native image tradeoffs',
    detail:
      'GraalVM native images reduce startup time but can limit reflection-heavy libraries.',
  },
  {
    title: 'Virtual threads',
    detail:
      'Project Loom introduces lightweight threads for highly concurrent servers.',
  },
  {
    title: 'Observability',
    detail:
      'JMX, JFR, and OpenTelemetry are common for production visibility.',
  },
]

const takeaways = [
  'Java is a stable, portable OOP language with a massive ecosystem.',
  'The JVM provides performance via JIT and safety via GC.',
  'Concurrency and tooling make it a workhorse for backend systems.',
  'Modern features keep Java competitive in cloud-native development.',
  'Operational maturity is a key Java advantage.',
]

const toolingWorkflow = [
  {
    title: 'Build and dependencies',
    detail:
      'Maven and Gradle handle builds, tests, and dependency graphs.',
  },
  {
    title: 'IDE support',
    detail:
      'IntelliJ IDEA and Eclipse provide deep refactoring and debugging.',
  },
  {
    title: 'Testing',
    detail:
      'JUnit, Testcontainers, and Mockito cover unit and integration tests.',
  },
  {
    title: 'Monitoring',
    detail:
      'JFR, JMX, and APM agents provide runtime visibility.',
  },
]

const concurrencyOptions = [
  {
    title: 'Executors and pools',
    detail:
      'ExecutorService manages thread pools for scalable workloads.',
  },
  {
    title: 'CompletableFuture',
    detail:
      'Async pipelines reduce blocking and improve throughput.',
  },
  {
    title: 'Virtual threads',
    detail:
      'Loom enables massive concurrency with simple code.',
  },
  {
    title: 'Reactive stacks',
    detail:
      'Project Reactor and RxJava support reactive programming.',
  },
]

const interopOptions = [
  {
    title: 'JVM language interop',
    detail:
      'Kotlin, Scala, and Groovy run on the JVM and interoperate with Java.',
  },
  {
    title: 'Native libraries',
    detail:
      'JNI and Panama provide access to C and system libraries.',
  },
  {
    title: 'JavaScript',
    detail:
      'GraalVM enables JS and polyglot runtimes alongside Java.',
  },
  {
    title: 'Messaging and APIs',
    detail:
      'Kafka, gRPC, and REST are common integration layers.',
  },
]

const deploymentOptions = [
  {
    title: 'JARs and fat jars',
    detail:
      'Ship services as executable JARs with embedded servers.',
  },
  {
    title: 'Containers',
    detail:
      'Docker images with tuned JVM flags are standard for cloud deployments.',
  },
  {
    title: 'Native images',
    detail:
      'GraalVM native images reduce startup time and memory.',
  },
  {
    title: 'App servers',
    detail:
      'Deploy to Tomcat, Jetty, or Jakarta EE servers.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to C++',
    detail:
      'Java trades low-level control for GC safety and portability.',
  },
  {
    title: 'Compared to Go',
    detail:
      'Java has a larger ecosystem; Go offers faster startup and simpler tooling.',
  },
  {
    title: 'Compared to Python',
    detail:
      'Java is faster for long-running services but slower to prototype.',
  },
  {
    title: 'Compared to Kotlin',
    detail:
      'Kotlin is more concise but runs on the same JVM runtime.',
  },
]

const learningPath = [
  {
    title: 'Core syntax and OOP',
    detail:
      'Learn classes, interfaces, and access modifiers.',
  },
  {
    title: 'Collections and generics',
    detail:
      'Use lists, maps, and generic types effectively.',
  },
  {
    title: 'Concurrency basics',
    detail:
      'Understand threads, executors, and synchronization.',
  },
  {
    title: 'Frameworks',
    detail:
      'Build services with Spring Boot or Jakarta EE.',
  },
  {
    title: 'Performance and ops',
    detail:
      'Profile, tune GC, and use observability tooling.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'JVM', definition: 'A portable runtime that executes Java bytecode and optimizes hot paths at runtime.' },
  { term: 'Bytecode', definition: 'Platform-neutral instructions produced by javac and executed by the JVM.' },
  { term: 'JIT', definition: 'Runtime compilation of frequently used methods into native machine code.' },
  { term: 'Garbage Collection', definition: 'Automatic memory reclamation that removes unreachable objects.' },
  { term: 'Generics', definition: 'Parameterized types that provide reuse while preserving type safety.' },
  { term: 'Records', definition: 'Compact immutable data carriers for modeling data-oriented types.' },
  { term: 'Sealed Classes', definition: 'A way to constrain inheritance to a known set of subclasses.' },
  { term: 'CompletableFuture', definition: 'An API for asynchronous pipelines and non-blocking composition.' },
  { term: 'Virtual Threads', definition: 'Lightweight threads introduced by Project Loom for high concurrency.' },
  { term: 'JFR', definition: 'Java Flight Recorder, built-in production profiling and observability.' },
  { term: 'JNI / Panama', definition: 'Interoperability layers for calling native C or system libraries.' },
  { term: 'GraalVM Native Image', definition: 'Ahead-of-time compilation to reduce startup time and memory.' },
]

const javaHelpStyles = `
.java98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.java98-window {
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

.java98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.java98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.java98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.java98-control {
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
  cursor: pointer;
  padding: 0;
}

.java98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.java98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.java98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.java98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.java98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.java98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.java98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.java98-toc-list li {
  margin: 0 0 8px;
}

.java98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.java98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.java98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.java98-section {
  margin: 0 0 22px;
}

.java98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.java98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.java98-content p,
.java98-content li,
.java98-content th,
.java98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.java98-content p {
  margin: 0 0 10px;
}

.java98-content ul,
.java98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.java98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.java98-content th,
.java98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.java98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.java98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.java98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .java98-main {
    grid-template-columns: 1fr;
  }

  .java98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-runtime', label: 'Runtime Pipeline' },
    { id: 'core-types', label: 'Type System and Design' },
    { id: 'core-library', label: 'Standard Library' },
    { id: 'core-oop', label: 'OOP Features' },
    { id: 'core-workflow', label: 'Tooling and Workflow' },
    { id: 'core-performance', label: 'Performance Checklist' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
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

export default function JavaPage(): JSX.Element {
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
    document.title = `Java (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Java',
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
    <div className="java98-help-page">
      <style>{javaHelpStyles}</style>
      <div className="java98-window" role="presentation">
        <header className="java98-titlebar">
          <span className="java98-title-text">Java</span>
          <div className="java98-title-controls">
            <button className="java98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="java98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="java98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`java98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="java98-main">
          <aside className="java98-toc" aria-label="Table of contents">
            <h2 className="java98-toc-title">Contents</h2>
            <ul className="java98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="java98-content">
            <h1 className="java98-doc-title">Java</h1>
            <p>
              Java is the classic object-oriented language for large-scale systems. It runs on the JVM, offers automatic memory
              management, and powers everything from enterprise applications to Android. This document focuses on Java design
              choices, runtime behavior, and practical tradeoffs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="java98-section">
                  <h2 className="java98-heading">Overview</h2>
                  <p>
                    Java balances portability, performance, and safety. The JVM abstracts the OS and hardware, while the
                    language enforces strong typing and object-oriented patterns. It shines in long-running services and large
                    teams that benefit from tooling and predictability.
                  </p>
                </section>
                <hr className="java98-divider" />
                <section id="bp-history" className="java98-section">
                  <h2 className="java98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="java98-section">
                  <h2 className="java98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="java98-section">
                  <h2 className="java98-heading">Key Takeaways</h2>
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
                <section id="core-fundamentals" className="java98-section">
                  <h2 className="java98-heading">Language Fundamentals</h2>
                  {languageFundamentals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-runtime" className="java98-section">
                  <h2 className="java98-heading">Runtime Pipeline</h2>
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
                <section id="core-types" className="java98-section">
                  <h2 className="java98-heading">Type System and Design</h2>
                  {typeSystemDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-library" className="java98-section">
                  <h2 className="java98-heading">Standard Library Highlights</h2>
                  {standardLibraryHighlights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-oop" className="java98-section">
                  <h2 className="java98-heading">How It Works: OOP and Core Features</h2>
                  {coreOopFeatures.map((block) => (
                    <div key={block.heading}>
                      <h3 className="java98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="java98-section">
                  <h2 className="java98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="java98-section">
                  <h2 className="java98-heading">Performance Checklist</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Java performance comes from JIT optimization and careful memory usage. Profiling and GC tuning are
                    essential when targeting low-latency workloads.
                  </p>
                </section>
                <section id="core-concurrency" className="java98-section">
                  <h2 className="java98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-uses" className="java98-section">
                  <h2 className="java98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="java98-section">
                  <h2 className="java98-heading">Interoperability and Deployment</h2>
                  <h3 className="java98-subheading">Interoperability</h3>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="java98-subheading">Deployment</h3>
                  {deploymentOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="java98-section">
                  <h2 className="java98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-compare" className="java98-section">
                  <h2 className="java98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="java98-section">
                  <h2 className="java98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-learning" className="java98-section">
                  <h2 className="java98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="java98-section">
                  <h2 className="java98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="java98-section">
                <h2 className="java98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="java98-subheading">{example.title}</h3>
                    <div className="java98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="java98-section">
                <h2 className="java98-heading">Glossary</h2>
                {glossary.map((item) => (
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
