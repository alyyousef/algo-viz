import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Task runners and CLI tools coordinate systems, APIs, and files with minimal ceremony.',
  },
  {
    context: 'Cross-platform clients',
    detail:
      'React Native, Flutter, and SwiftUI lift UI development while bridging to native rendering layers.',
  },
  {
    context: 'DevOps and infrastructure',
    detail: 'IaC tools and build pipelines use high-level languages for maintainable automation.',
  },
  {
    context: 'Education and prototyping',
    detail: 'Readable syntax reduces cognitive load, enabling rapid experimentation and teaching.',
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
    explanation: 'The runtime handles scheduling; async/await keeps logic readable and sequential.',
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
    explanation: 'Strong typing catches errors at compile time without sacrificing readability.',
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
    detail: 'Type hints in Python or TypeScript add safety and tooling without giving up dynamism.',
  },
  {
    title: 'Polyglot runtimes',
    detail:
      'GraalVM and WebAssembly let multiple languages share a runtime and call each other efficiently.',
  },
  {
    title: 'Determinism controls',
    detail: 'Pinned dependencies, containers, and reproducible builds reduce runtime variability.',
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

const abstractionLadder = mentalModels[0] ?? {
  title: 'Abstraction ladder',
  detail:
    'You trade direct hardware control for expressive constructs. The ladder is safe when you can still see the cost.',
}
const productivityBudget = mentalModels[1] ?? {
  title: 'Productivity budget',
  detail:
    'Time saved in implementation and debugging often outweighs raw CPU cycles in product development.',
}
const leakyShields = mentalModels[2] ?? {
  title: 'Leaky shields',
  detail:
    'Garbage collection, copies, and FFI boundaries are where abstractions leak and performance surprises appear.',
}
const ecosystemGravity = mentalModels[3] ?? {
  title: 'Ecosystem gravity',
  detail:
    'Libraries, tooling, and community support often determine language choice more than syntax.',
}
const correctnessByDefault = mentalModels[4] ?? {
  title: 'Correctness by default',
  detail:
    'High-level languages bake in bounds checks, memory safety, or exceptions to prevent common bugs.',
}
const allocationOverhead = performanceFactors[0] ?? {
  title: 'Allocation overhead',
  detail:
    'High-level code allocates more objects; GC overhead appears in tight loops or high-throughput services.',
}
const dispatchBoxing = performanceFactors[1] ?? {
  title: 'Dispatch and boxing',
  detail:
    'Dynamic types and boxed values add indirection; JITs can remove some overhead with specialization.',
}

const glossaryTerms = [
  {
    term: abstractionLadder.title,
    definition: abstractionLadder.detail,
  },
  {
    term: productivityBudget.title,
    definition: productivityBudget.detail,
  },
  {
    term: leakyShields.title,
    definition: leakyShields.detail,
  },
  {
    term: ecosystemGravity.title,
    definition: ecosystemGravity.detail,
  },
  {
    term: correctnessByDefault.title,
    definition: correctnessByDefault.detail,
  },
  {
    term: allocationOverhead.title,
    definition: allocationOverhead.detail,
  },
  {
    term: dispatchBoxing.title,
    definition: dispatchBoxing.detail,
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-families', label: 'Language Families' },
    { id: 'core-performance', label: 'Performance Intuition' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HighLevelLanguagesPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'High-Level Languages',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="High-Level Languages"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">High-Level Languages</h1>
      <p>
        High-level languages let developers express intent with rich syntax, strong libraries, and
        safer defaults. They reduce boilerplate, accelerate iteration, and push many low-level
        details into compilers, runtimes, and VMs.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              These languages exist to let humans think in domain terms rather than machine
              minutiae. They trade direct control of layout and registers for readability, safety
              features, and batteries-included libraries. The critical skill is knowing when that
              trade still meets your latency, memory, and observability needs.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {milestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
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
          <section id="core-how" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((block) => (
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
          <section id="core-families" className="bin98-section">
            <h2 className="bin98-heading">Language Families</h2>
            {languageFamilies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Intuition</h2>
            {performanceFactors.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Many high-level systems are I/O-bound. Optimize the data path first: batching,
              caching, and avoiding needless serialization often beat micro-optimizations in code.
            </p>
          </section>
          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {applications.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
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
          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights and Frontiers</h2>
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
                <code>{example.code}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <div key={item.term}>
              <h3 className="bin98-subheading">{item.term}</h3>
              <p>{item.definition}</p>
            </div>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
