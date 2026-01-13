import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
            <legend>Language fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {languageFundamentals.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Runtime pipeline</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Type system and design</legend>
            <div className="win95-grid win95-grid-2">
              {typeSystemDetails.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Standard library highlights</legend>
            <div className="win95-grid win95-grid-2">
              {standardLibraryHighlights.map((item) => (
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
            <legend>Tooling and workflow</legend>
            <div className="win95-grid win95-grid-2">
              {toolingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Concurrency and parallelism</legend>
            <div className="win95-grid win95-grid-2">
              {concurrencyOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Interoperability and deployment</legend>
            <div className="win95-grid win95-grid-2">
              {interopOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-2">
              {deploymentOptions.map((item) => (
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
            <legend>Comparisons and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {comparisonNotes.map((item) => (
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
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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

