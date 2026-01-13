import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const milestones = [
  {
    title: 'FORTRAN proves compilers can rival hand assembly (1957)',
    detail:
      'FORTRAN I demonstrated that high-level notation could produce efficient machine code, launching modern compiler design.',
  },
  {
    title: 'ALGOL and structured programming (1960s)',
    detail:
      'ALGOL 60 introduced block structure, lexical scoping, and clean syntax that influenced C, Pascal, and modern languages.',
  },
  {
    title: 'Smalltalk and interactive OOP (1970s)',
    detail:
      'Smalltalk pioneered live environments, message passing, and object orientation, reshaping language design.',
  },
  {
    title: 'C++ and Java scale OOP (1980s-1990s)',
    detail:
      'C++ brought performance with abstraction; Java popularized VM portability and large-scale library ecosystems.',
  },
  {
    title: 'Python and JavaScript democratize scripting (1990s-2000s)',
    detail:
      'Readable syntax and batteries-included libraries made high-level languages the default for rapid product iteration.',
  },
  {
    title: 'JITs and tiered runtimes (2000s-2020s)',
    detail:
      'Modern runtimes compile hot paths at runtime, narrowing the performance gap with low-level languages.',
  },
]

const mentalModels = [
  {
    title: 'Abstraction ladder',
    detail:
      'You trade direct hardware control for expressive constructs. The ladder is safe when you can still see the cost.',
  },
  {
    title: 'Productivity budget',
    detail:
      'Time saved in implementation and debugging often outweighs raw CPU cycles in product development.',
  },
  {
    title: 'Leaky shields',
    detail:
      'Garbage collection, copies, and FFI boundaries are where abstractions leak and performance surprises appear.',
  },
  {
    title: 'Ecosystem gravity',
    detail:
      'Libraries, tooling, and community support often determine language choice more than syntax.',
  },
  {
    title: 'Correctness by default',
    detail:
      'High-level languages bake in bounds checks, memory safety, or exceptions to prevent common bugs.',
  },
]

const howItWorks = [
  {
    heading: 'Compilation and execution',
    bullets: [
      'Interpreters execute bytecode or AST nodes step by step (CPython, Ruby).',
      'JITs compile hot code paths to native machine code (V8, HotSpot, PyPy).',
      'AOT compilers emit native code ahead of time while keeping high-level syntax (Go, Rust).',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collectors reclaim unreachable memory; strategies include generational, concurrent, and incremental GC.',
      'Dynamic dispatch, reflection, and metaprogramming enable flexible APIs but add runtime overhead.',
      'Standard libraries provide IO, networking, concurrency, and testing with consistent APIs.',
    ],
  },
  {
    heading: 'Portability layers',
    bullets: [
      'VMs abstract OS and hardware differences so bytecode runs anywhere.',
      'FFI bridges to C/C++ or system calls for performance or platform access.',
      'Package managers enable ecosystem-scale reuse (pip, npm, Maven, Cargo).',
    ],
  },
]

const languageFamilies = [
  {
    title: 'Dynamic scripting',
    detail:
      'Python, Ruby, JavaScript: high flexibility, rapid iteration, strong metaprogramming, higher runtime overhead.',
  },
  {
    title: 'Managed static',
    detail:
      'Java, C#, Kotlin: static types, GC, robust tooling, strong server and enterprise ecosystems.',
  },
  {
    title: 'Modern systems-high-level',
    detail:
      'Rust, Go, Swift: higher-level ergonomics with control over performance and concurrency.',
  },
  {
    title: 'Functional',
    detail:
      'Haskell, OCaml, F#: immutability and pure functions improve reasoning and concurrency.',
  },
  {
    title: 'Data-oriented and scientific',
    detail:
      'Julia, R, MATLAB: optimized numeric kernels and domain-specific syntax for math-heavy workloads.',
  },
  {
    title: 'Domain-specific',
    detail:
      'SQL, Prolog, MATLAB: specialized syntax that encodes problem structure for concise solutions.',
  },
]

const performanceFactors = [
  {
    title: 'Allocation overhead',
    detail:
      'High-level code allocates more objects; GC overhead appears in tight loops or high-throughput services.',
  },
  {
    title: 'Dispatch and boxing',
    detail:
      'Dynamic types and boxed values add indirection; JITs can remove some overhead with specialization.',
  },
  {
    title: 'Vectorization boundaries',
    detail:
      'Libraries like NumPy or BLAS speed up bulk work; falling back to per-element loops is slow.',
  },
  {
    title: 'I/O dominance',
    detail:
      'Many applications are I/O-bound; optimizing CPU-heavy paths helps only after reducing network or disk latency.',
  },
  {
    title: 'Warm-up and steady state',
    detail:
      'JIT runtimes need warm-up time. Benchmarks should measure both cold and hot performance.',
  },
  {
    title: 'Interop costs',
    detail:
      'FFI boundaries can copy data or require marshaling; minimize crossings for performance.',
  },
]

const applications = [
  {
    context: 'Web backends',
    detail:
      'Frameworks like Django, Rails, and Express ship features quickly; hotspots can move to native extensions.',
  },
  {
    context: 'Data science and ML',
    detail:
      'Python and Julia wrap optimized kernels, giving scientists expressive code with native performance inside libraries.',
  },
  {
    context: 'Automation and scripting',
    detail:
      'Task runners and CLI tools coordinate systems, APIs, and files with minimal ceremony.',
  },
  {
    context: 'Cross-platform clients',
    detail:
      'React Native, Flutter, and SwiftUI lift UI development while bridging to native rendering layers.',
  },
  {
    context: 'DevOps and infrastructure',
    detail:
      'IaC tools and build pipelines use high-level languages for maintainable automation.',
  },
  {
    context: 'Education and prototyping',
    detail:
      'Readable syntax reduces cognitive load, enabling rapid experimentation and teaching.',
  },
]

const examples = [
  {
    title: 'Readable transformation (Python)',
    code: `def top_titles_by_score(rows, limit=5):
    sorted_rows = sorted(rows, key=lambda r: r["score"], reverse=True)
    return [row["title"] for row in sorted_rows[:limit]]`,
    explanation:
      'Expressive syntax and standard library tools replace manual loops and temporary buffers.',
  },
  {
    title: 'Async IO without threads (JavaScript)',
    code: `async function fetchProfiles(ids) {
  const requests = ids.map((id) => fetch(\`/api/users/\${id}\`));
  const responses = await Promise.all(requests);
  return Promise.all(responses.map((r) => r.json()));
}`,
    explanation:
      'The runtime handles scheduling; async/await keeps logic readable and sequential.',
  },
  {
    title: 'Vectorized math vs loops (Python + NumPy)',
    code: `scores = np.array(raw_scores)
adjusted = scores * 1.1 + 3  # vectorized in C

adjusted = [s * 1.1 + 3 for s in raw_scores]  # Python loop`,
    explanation:
      'The same math can run in optimized native code or slow per-element interpretation.',
  },
  {
    title: 'Type safety with high-level syntax (TypeScript)',
    code: `type User = { id: string; plan: "free" | "pro" }
function upgrade(user: User): User {
  return { ...user, plan: "pro" }
}`,
    explanation:
      'Strong typing catches errors at compile time without sacrificing readability.',
  },
]

const pitfalls = [
  'Assuming abstraction erases cost: dynamic dispatch, hidden allocations, and reflection add overhead.',
  'Ignoring memory profiles: GC pauses and data copies can surface under latency-sensitive workloads.',
  'Overreliance on defaults: frameworks can hide N+1 queries, unbounded concurrency, or slow JSON parsing.',
  'Dependency bloat: large ecosystems require version pinning, security review, and license awareness.',
  'Missing observability: without profiling and tracing, mapping high-level code to CPU usage is hard.',
]

const decisionPoints = [
  'Optimize for iteration speed and clarity when product discovery matters most.',
  'Profile hotspots before rewriting; move only critical paths to lower-level code.',
  'Pick ecosystems with strong tooling, testing, and deployment support.',
  'Use high-level languages for I/O-bound services where latency is dominated by network or disk.',
  'Prefer explicit memory control only when latency and throughput targets demand it.',
]

const advancedInsights = [
  {
    title: 'Tiered compilation',
    detail:
      'Runtimes profile code, compile hot paths, and deoptimize when assumptions break. Warm-up matters for short jobs.',
  },
  {
    title: 'Gradual typing',
    detail:
      'Type hints in Python or TypeScript add safety and tooling without giving up dynamism.',
  },
  {
    title: 'Polyglot runtimes',
    detail:
      'GraalVM and WebAssembly let multiple languages share a runtime and call each other efficiently.',
  },
  {
    title: 'Determinism controls',
    detail:
      'Pinned dependencies, containers, and reproducible builds reduce runtime variability.',
  },
  {
    title: 'FFI design',
    detail:
      'Batch data across the boundary to amortize marshaling costs and avoid per-call overhead.',
  },
  {
    title: 'Runtime tuning',
    detail:
      'GC configuration, heap sizing, and JIT flags can shift latency vs throughput tradeoffs.',
  },
]

const takeaways = [
  'High-level languages maximize readability, safety, and speed of delivery.',
  'Performance costs are mostly constant factors: allocation, dispatch, GC, and data movement.',
  'Ecosystem and tooling often matter more than raw speed.',
  'Use profiling and selective native code to keep hotspots fast.',
]

export default function HighLevelLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">High-Level Languages</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Expressive languages that trade hardware control for productivity</div>
              <p className="win95-text">
                High-level languages let developers express intent with rich syntax, strong libraries, and safer defaults. They
                reduce boilerplate, accelerate iteration, and push many low-level details into compilers, runtimes, and VMs.
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
                These languages exist to let humans think in domain terms rather than machine minutiae. They trade direct control
                of layout and registers for readability, safety features, and batteries-included libraries. The critical skill is
                knowing when that trade still meets your latency, memory, and observability needs.
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
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((block) => (
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
            <legend>Language families</legend>
            <div className="win95-grid win95-grid-2">
              {languageFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {performanceFactors.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Many high-level systems are I/O-bound. Optimize the data path first: batching, caching, and avoiding needless
                serialization often beat micro-optimizations in code.
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

