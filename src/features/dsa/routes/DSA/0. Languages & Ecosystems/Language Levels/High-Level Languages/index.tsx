import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
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

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-mono {
  font-family: "Courier New", Courier, monospace;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
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
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-families', label: 'Language Families' },
    { id: 'core-performance', label: 'Performance Intuition' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HighLevelLanguagesPage(): JSX.Element {
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
    document.title = `High-Level Languages (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'High-Level Languages',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">High-Level Languages</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">High-Level Languages</h1>
            <p>
              High-level languages let developers express intent with rich syntax, strong libraries, and safer defaults. They
              reduce boilerplate, accelerate iteration, and push many low-level details into compilers, runtimes, and VMs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    These languages exist to let humans think in domain terms rather than machine minutiae. They trade direct
                    control of layout and registers for readability, safety features, and batteries-included libraries. The
                    critical skill is knowing when that trade still meets your latency, memory, and observability needs.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {milestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-models" className="win98-section">
                  <h2 className="win98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-how" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {howItWorks.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-families" className="win98-section">
                  <h2 className="win98-heading">Language Families</h2>
                  {languageFamilies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Intuition</h2>
                  {performanceFactors.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Many high-level systems are I/O-bound. Optimize the data path first: batching, caching, and avoiding needless
                    serialization often beat micro-optimizations in code.
                  </p>
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decisions" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="win98-section">
                <h2 className="win98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <div key={item.term}>
                    <h3 className="win98-subheading">{item.term}</h3>
                    <p>{item.definition}</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
