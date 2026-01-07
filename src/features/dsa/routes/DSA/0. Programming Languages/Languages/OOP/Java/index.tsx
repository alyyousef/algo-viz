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
    title: 'Write once, run anywhere (1995)',
    detail:
      'Java launched with the JVM, promising portability and safer memory management than C++.',
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
    title: 'Cloud-native and microservices era',
    detail:
      'Frameworks like Spring Boot and Quarkus pushed Java into fast-starting microservices and cloud deployments.',
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
]

const coreOopFeatures = [
  {
    heading: 'Classes and objects',
    bullets: [
      'Encapsulation with access modifiers.',
      'Constructors enforce initialization logic.',
      'Classes define reusable, modular code.',
    ],
  },
  {
    heading: 'Inheritance',
    bullets: [
      'Single inheritance with interfaces for multiple contracts.',
      'Polymorphism via method overriding.',
      'Use composition to avoid fragile hierarchies.',
    ],
  },
  {
    heading: 'Interfaces and abstraction',
    bullets: [
      'Interfaces define contracts without implementation.',
      'Default methods enable evolution without breaking code.',
      'Abstract classes share partial behavior.',
    ],
  },
  {
    heading: 'Memory and GC',
    bullets: [
      'Automatic garbage collection prevents manual memory bugs.',
      'Tuning JVM parameters can reduce pause times.',
      'Heap sizing affects performance and latency.',
    ],
  },
  {
    heading: 'Concurrency',
    bullets: [
      'Threads and executors support parallel workloads.',
      'Concurrent collections simplify thread-safe programming.',
      'Modern features include CompletableFuture and virtual threads.',
    ],
  },
  {
    heading: 'Tooling ecosystem',
    bullets: [
      'Maven and Gradle for dependency management.',
      'Spring for enterprise development.',
      'Profilers and JVM tools for diagnostics.',
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
]

const pitfalls = [
  'Ignoring GC behavior in low-latency systems.',
  'Overusing inheritance instead of interfaces and composition.',
  'Using heavy frameworks for tiny services, increasing startup time.',
  'Allocating excessive objects in tight loops.',
  'Skipping profiling and guessing performance bottlenecks.',
]

const decisionGuidance = [
  'Need enterprise-grade tooling and a massive ecosystem: Java is strong.',
  'Need portable deployment across platforms: JVM portability helps.',
  'Need low-latency services: Java works with careful tuning.',
  'Need minimal memory footprint and fast startup: evaluate alternatives.',
  'Need safe concurrency and strong typing: Java is reliable.',
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
]

const takeaways = [
  'Java is a stable, portable OOP language with a massive ecosystem.',
  'The JVM provides performance via JIT and safety via GC.',
  'Concurrency and tooling make it a workhorse for backend systems.',
  'Modern features keep Java competitive in cloud-native development.',
]

export default function JavaPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Java</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Portable OOP with a battle-tested runtime and ecosystem</div>
              <p className="win95-text">
                Java is the classic object-oriented language for large-scale systems. It runs on the JVM, offers automatic
                memory management, and powers everything from enterprise applications to Android. This page focuses on its
                design choices, performance characteristics, and best-fit use cases.
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
                Java balances portability, performance, and safety. The JVM abstracts the OS and hardware, while the language
                enforces strong typing and object-oriented patterns. It shines in long-running services and large teams that
                benefit from tooling and predictability.
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
            <legend>How it works: OOP and core features</legend>
            <div className="win95-grid win95-grid-3">
              {coreOopFeatures.map((block) => (
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
            <legend>Performance checklist</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Java performance comes from JIT optimization and careful memory usage. Profiling and GC tuning are essential
                when targeting low-latency workloads.
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

