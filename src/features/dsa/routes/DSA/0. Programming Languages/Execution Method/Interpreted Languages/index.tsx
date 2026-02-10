import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'LISP and REPL culture (1950s-1960s)',
    detail:
      'Interactive read-eval-print loops made it possible to evolve programs without a compile step.',
  },
  {
    title: 'Shells and scripting glue (1970s-1980s)',
    detail:
      'Unix shells showed that quick scripts could orchestrate powerful native tools.',
  },
  {
    title: 'Perl, Python, Ruby mainstream dynamic scripting (1990s)',
    detail:
      'Expressive syntax and batteries-included libraries made interpreted execution the default for automation and web.',
  },
  {
    title: 'JavaScript in browsers (mid-1990s)',
    detail:
      'Interpretation enabled instant deployment across heterogeneous clients.',
  },
  {
    title: 'JIT-accelerated interpreters (2000s-2010s)',
    detail:
      'V8, PyPy, and JavaScriptCore blended interpretation with JIT compilation on hot paths.',
  },
  {
    title: 'Polyglot runtimes and WebAssembly (2010s-2020s)',
    detail:
      'Interpreters increasingly interop with native and WASM modules for speed.',
  },
]

const mentalModels = [
  {
    title: 'Script as conversation',
    detail:
      'The runtime stays present for each operation; execution is a dialogue with the interpreter.',
  },
  {
    title: 'Late binding as a superpower',
    detail:
      'Names, types, and methods resolve at runtime, enabling dynamic imports and metaprogramming.',
  },
  {
    title: 'Runtime as a mini-OS',
    detail:
      'Interpreters provide GC, schedulers, module loaders, and often a standard library ecosystem.',
  },
  {
    title: 'Fast feedback loop',
    detail:
      'Edit-run cycles are short; correctness is validated through rapid iteration and tests.',
  },
  {
    title: 'Data over code',
    detail:
      'Many interpreted systems are I/O-bound; performance depends more on batching and caches than CPU.',
  },
]

const mechanics = [
  {
    heading: 'Source to bytecode',
    bullets: [
      'Many interpreters parse source and emit bytecode (CPython, Lua, Ruby).',
      'Some execute ASTs directly or use threaded code without stable bytecode formats.',
      'Dynamic features like eval and reflection can inject code at runtime.',
    ],
  },
  {
    heading: 'Execution engines',
    bullets: [
      'Bytecode dispatch loops interpret opcodes; dispatch overhead is a primary cost.',
      'Baseline JITs emit simple native code quickly; optimizing tiers recompile hotspots.',
      'Tracing JITs record hot traces through loops and compile them with guards.',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collection manages memory, often with generational or incremental strategies.',
      'Dynamic dispatch uses inline caches or hidden classes to speed method lookups.',
      'Package managers and module loaders enable rapid updates without recompilation.',
    ],
  },
]

const runtimeArchitecture = [
  {
    title: 'Bytecode VM',
    detail:
      'A compact instruction set with an interpreter loop; good for portability and simplicity.',
  },
  {
    title: 'Object model',
    detail:
      'Dynamic objects use dictionaries or shapes; changes to object shape can deoptimize hot paths.',
  },
  {
    title: 'Garbage collector',
    detail:
      'Generational GC assumes most objects die young. Tuning heap sizes affects pauses.',
  },
  {
    title: 'Inline caches',
    detail:
      'Caches memoize method lookups so repeated calls stay fast when shapes are stable.',
  },
  {
    title: 'Native extensions',
    detail:
      'FFI bridges to C/C++ for heavy computation, often where performance matters most.',
  },
  {
    title: 'Event loop and concurrency',
    detail:
      'Many runtimes use event loops for I/O concurrency rather than OS threads.',
  },
]

const performanceFactors = [
  {
    title: 'Dispatch overhead',
    detail:
      'Each opcode dispatch adds cost. Tight loops are slower than in compiled code.',
  },
  {
    title: 'Warm-up behavior',
    detail:
      'JITs need time and stable shapes to optimize. Short-lived scripts may never get fast.',
  },
  {
    title: 'Object overhead',
    detail:
      'Dynamic objects store metadata and hash tables; memory footprints grow.',
  },
  {
    title: 'GC pauses',
    detail:
      'Stop-the-world pauses or incremental GC can affect tail latency.',
  },
  {
    title: 'I/O dominance',
    detail:
      'Most apps are I/O-bound; batching and caching often provide bigger wins than CPU tuning.',
  },
  {
    title: 'Interop costs',
    detail:
      'Crossing into native code or JIT tiers can copy data and incur marshaling overhead.',
  },
]

const applications = [
  {
    context: 'Web frontends',
    detail:
      'JavaScript in the browser enables rapid, cross-platform deployment of UI logic.',
  },
  {
    context: 'Scripting and automation',
    detail:
      'Python, Ruby, and shell excel at glue code, integration, and workflow automation.',
  },
  {
    context: 'Data analysis and ML prototyping',
    detail:
      'Notebooks and interactive environments let researchers iterate quickly on datasets.',
  },
  {
    context: 'Serverless and CLIs',
    detail:
      'Fast startup and packaging make interpreted languages attractive for short-lived tasks.',
  },
  {
    context: 'Education and teaching',
    detail:
      'Readable syntax and interactive feedback lower the barrier to learning.',
  },
]

const examples = [
  {
    title: 'Interactive exploration (Python REPL)',
    code: `>>> import math
>>> angles = [0, 30, 45, 60, 90]
>>> [math.sin(math.radians(a)) for a in angles]
[0.0, 0.5, 0.7071067811865475, 0.8660254037844386, 1.0]`,
    explanation:
      'Immediate feedback encourages experimentation; each line is compiled to bytecode and executed.',
  },
  {
    title: 'Dynamic dispatch in practice (JavaScript)',
    code: `function format(user) {
  if (user.premium) return user.name.toUpperCase();
  return user.name;
}
format({ name: "Ada", premium: true });`,
    explanation:
      'Property lookup and dynamic shapes can be optimized with inline caches.',
  },
  {
    title: 'Vectorized math vs loops (Python + NumPy)',
    code: `total = 0
for x in data:
  total += x * 1.1

arr = np.array(data, dtype=np.float64)
total = (arr * 1.1).sum()`,
    explanation:
      'Interpreter overhead per iteration can dominate; vectorized native code is faster.',
  },
  {
    title: 'Cache-aware batch processing',
    code: `def process(ids, fetch):
    batches = [ids[i:i+100] for i in range(0, len(ids), 100)]
    return [fetch(batch) for batch in batches]`,
    explanation:
      'Batching reduces per-call overhead and improves I/O efficiency in interpreted environments.',
  },
]

const pitfalls = [
  'Assuming speed without measurement: interpreter dispatch and dynamic types can surprise.',
  'Ignoring warm-up: JIT optimization needs stable shapes and time.',
  'Memory leaks via references: caches and globals can prevent GC from freeing objects.',
  'Excessive eval or runtime code generation complicates security and tooling.',
  'Deployment drift: unpinned runtime versions cause subtle behavior changes.',
  'Hot loops in pure script: move heavy work to native or vectorized libraries.',
]

const decisionPoints = [
  'Choose interpreted languages for iteration speed, scripting, and glue logic.',
  'For CPU-bound hotspots, use native extensions or compiled modules.',
  'Short-lived workloads favor interpreters with minimal warm-up.',
  'Use packaging tools to lock runtime versions and dependencies.',
  'Prioritize observability to connect runtime behavior to performance.',
]

const advancedInsights = [
  {
    title: 'Inline caches and shapes',
    detail:
      'Stable object shapes lead to monomorphic call sites that JIT well; polymorphism deoptimizes.',
  },
  {
    title: 'Tracing vs method JITs',
    detail:
      'Tracing JITs optimize loops; method JITs optimize functions. Workload shape determines which wins.',
  },
  {
    title: 'GC tuning',
    detail:
      'Heap sizing and generational tuning trade throughput for latency and pause times.',
  },
  {
    title: 'FFI and polyglot runtimes',
    detail:
      'GraalVM, WASM, and FFI let interpreted code call native code with shared tooling.',
  },
  {
    title: 'Runtime instrumentation',
    detail:
      'Sampling profilers and tracing are critical for tracking interpreter overhead.',
  },
  {
    title: 'Packaging for predictability',
    detail:
      'Bundling runtimes and dependencies avoids version drift in production.',
  },
]

const takeaways = [
  'Interpreted languages maximize flexibility and fast iteration.',
  'Dispatch overhead, GC, and warm-up shape performance profiles.',
  'JITs narrow the gap but require stable shapes and warm-up time.',
  'Keep hot loops in native or vectorized code when performance matters.',
]

const scriptConversation = mentalModels[0] ?? {
  title: 'Script as conversation',
  detail: 'The runtime stays present for each operation; execution is a dialogue with the interpreter.',
}
const lateBinding = mentalModels[1] ?? {
  title: 'Late binding as a superpower',
  detail: 'Names, types, and methods resolve at runtime, enabling dynamic imports and metaprogramming.',
}
const runtimeAsOS = mentalModels[2] ?? {
  title: 'Runtime as a mini-OS',
  detail: 'Interpreters provide GC, schedulers, module loaders, and often a standard library ecosystem.',
}
const fastFeedback = mentalModels[3] ?? {
  title: 'Fast feedback loop',
  detail: 'Edit-run cycles are short; correctness is validated through rapid iteration and tests.',
}
const dataOverCode = mentalModels[4] ?? {
  title: 'Data over code',
  detail: 'Many interpreted systems are I/O-bound; performance depends more on batching and caches than CPU.',
}
const bytecodeVm = runtimeArchitecture[0] ?? {
  title: 'Bytecode VM',
  detail: 'A compact instruction set with an interpreter loop; good for portability and simplicity.',
}
const dispatchOverhead = performanceFactors[0] ?? {
  title: 'Dispatch overhead',
  detail: 'Each opcode dispatch adds cost. Tight loops are slower than in compiled code.',
}

const glossaryTerms = [
  {
    term: scriptConversation.title,
    definition: scriptConversation.detail,
  },
  {
    term: lateBinding.title,
    definition: lateBinding.detail,
  },
  {
    term: runtimeAsOS.title,
    definition: runtimeAsOS.detail,
  },
  {
    term: fastFeedback.title,
    definition: fastFeedback.detail,
  },
  {
    term: dataOverCode.title,
    definition: dataOverCode.detail,
  },
  {
    term: bytecodeVm.title,
    definition: bytecodeVm.detail,
  },
  {
    term: dispatchOverhead.title,
    definition: dispatchOverhead.detail,
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
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-architecture', label: 'Runtime Architecture' },
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

export default function InterpretedLanguagesPage(): JSX.Element {
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
    document.title = `Interpreted Languages (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Interpreted Languages',
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
          <span className="win98-title-text">Interpreted Languages</span>
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
            <h1 className="win98-doc-title">Interpreted Languages</h1>
            <p>
              Interpreted languages execute through a runtime that stays present for every operation. The tradeoff is higher
              constant factors in exchange for fast iteration, portability, and expressive dynamism.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Interpreters keep the runtime in the loop for every operation. They favor flexibility, portability, and quick
                    edit-run cycles. When performance matters, you lean on JIT tiers, vectorized libraries, or native extensions.
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
                <section id="core-mechanics" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {mechanics.map((block) => (
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
                <section id="core-architecture" className="win98-section">
                  <h2 className="win98-heading">Runtime Architecture</h2>
                  {runtimeArchitecture.map((item) => (
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
                    Measure real workloads. Warm-up, GC pauses, and object shapes can affect tail latency more than average runtime.
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
