import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function InterpretedLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Interpreted Languages</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Dynamic runtimes that trade raw speed for flexibility</div>
              <p className="win95-text">
                Interpreted languages execute through a runtime that stays present for every operation. The tradeoff is higher
                constant factors in exchange for fast iteration, portability, and expressive dynamism.
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
                Interpreters keep the runtime in the loop for every operation. They favor flexibility, portability, and quick
                edit-run cycles. When performance matters, you lean on JIT tiers, vectorized libraries, or native extensions.
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
              {mechanics.map((block) => (
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
            <legend>Runtime architecture</legend>
            <div className="win95-grid win95-grid-2">
              {runtimeArchitecture.map((item) => (
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
                Measure real workloads. Warm-up, GC pauses, and object shapes can affect tail latency more than average runtime.
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

