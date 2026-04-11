import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'LISP and REPL culture (1950s-1960s)',
    detail:
      'Interactive read-eval-print loops made it possible to evolve programs without a compile step.',
  },
  {
    title: 'Shells and scripting glue (1970s-1980s)',
    detail: 'Unix shells showed that quick scripts could orchestrate powerful native tools.',
  },
  {
    title: 'Perl, Python, Ruby mainstream dynamic scripting (1990s)',
    detail:
      'Expressive syntax and batteries-included libraries made interpreted execution the default for automation and web.',
  },
  {
    title: 'JavaScript in browsers (mid-1990s)',
    detail: 'Interpretation enabled instant deployment across heterogeneous clients.',
  },
  {
    title: 'JIT-accelerated interpreters (2000s-2010s)',
    detail:
      'V8, PyPy, and JavaScriptCore blended interpretation with JIT compilation on hot paths.',
  },
  {
    title: 'Polyglot runtimes and WebAssembly (2010s-2020s)',
    detail: 'Interpreters increasingly interop with native and WASM modules for speed.',
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
    detail: 'Generational GC assumes most objects die young. Tuning heap sizes affects pauses.',
  },
  {
    title: 'Inline caches',
    detail: 'Caches memoize method lookups so repeated calls stay fast when shapes are stable.',
  },
  {
    title: 'Native extensions',
    detail: 'FFI bridges to C/C++ for heavy computation, often where performance matters most.',
  },
  {
    title: 'Event loop and concurrency',
    detail: 'Many runtimes use event loops for I/O concurrency rather than OS threads.',
  },
]

const performanceFactors = [
  {
    title: 'Dispatch overhead',
    detail: 'Each opcode dispatch adds cost. Tight loops are slower than in compiled code.',
  },
  {
    title: 'Warm-up behavior',
    detail: 'JITs need time and stable shapes to optimize. Short-lived scripts may never get fast.',
  },
  {
    title: 'Object overhead',
    detail: 'Dynamic objects store metadata and hash tables; memory footprints grow.',
  },
  {
    title: 'GC pauses',
    detail: 'Stop-the-world pauses or incremental GC can affect tail latency.',
  },
  {
    title: 'I/O dominance',
    detail:
      'Most apps are I/O-bound; batching and caching often provide bigger wins than CPU tuning.',
  },
  {
    title: 'Interop costs',
    detail: 'Crossing into native code or JIT tiers can copy data and incur marshaling overhead.',
  },
]

const applications = [
  {
    context: 'Web frontends',
    detail: 'JavaScript in the browser enables rapid, cross-platform deployment of UI logic.',
  },
  {
    context: 'Scripting and automation',
    detail: 'Python, Ruby, and shell excel at glue code, integration, and workflow automation.',
  },
  {
    context: 'Data analysis and ML prototyping',
    detail: 'Notebooks and interactive environments let researchers iterate quickly on datasets.',
  },
  {
    context: 'Serverless and CLIs',
    detail:
      'Fast startup and packaging make interpreted languages attractive for short-lived tasks.',
  },
  {
    context: 'Education and teaching',
    detail: 'Readable syntax and interactive feedback lower the barrier to learning.',
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
    explanation: 'Property lookup and dynamic shapes can be optimized with inline caches.',
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
    detail: 'Heap sizing and generational tuning trade throughput for latency and pause times.',
  },
  {
    title: 'FFI and polyglot runtimes',
    detail: 'GraalVM, WASM, and FFI let interpreted code call native code with shared tooling.',
  },
  {
    title: 'Runtime instrumentation',
    detail: 'Sampling profilers and tracing are critical for tracking interpreter overhead.',
  },
  {
    title: 'Packaging for predictability',
    detail: 'Bundling runtimes and dependencies avoids version drift in production.',
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
  detail:
    'The runtime stays present for each operation; execution is a dialogue with the interpreter.',
}
const lateBinding = mentalModels[1] ?? {
  title: 'Late binding as a superpower',
  detail:
    'Names, types, and methods resolve at runtime, enabling dynamic imports and metaprogramming.',
}
const runtimeAsOS = mentalModels[2] ?? {
  title: 'Runtime as a mini-OS',
  detail:
    'Interpreters provide GC, schedulers, module loaders, and often a standard library ecosystem.',
}
const fastFeedback = mentalModels[3] ?? {
  title: 'Fast feedback loop',
  detail: 'Edit-run cycles are short; correctness is validated through rapid iteration and tests.',
}
const dataOverCode = mentalModels[4] ?? {
  title: 'Data over code',
  detail:
    'Many interpreted systems are I/O-bound; performance depends more on batching and caches than CPU.',
}
const bytecodeVm = runtimeArchitecture[0] ?? {
  title: 'Bytecode VM',
  detail:
    'A compact instruction set with an interpreter loop; good for portability and simplicity.',
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
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-architecture', label: 'Runtime Architecture' },
    { id: 'core-performance', label: 'Performance Intuition' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function InterpretedLanguagesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Interpreted Languages',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Interpreted Languages"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Interpreted Languages</h1>
      <p>
        Interpreted languages execute through a runtime that stays present for every operation. The
        tradeoff is higher constant factors in exchange for fast iteration, portability, and
        expressive dynamism.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Interpreters keep the runtime in the loop for every operation. They favor flexibility,
              portability, and quick edit-run cycles. When performance matters, you lean on JIT
              tiers, vectorized libraries, or native extensions.
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
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {mechanics.map((block) => (
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
          <section id="core-architecture" className="bin98-section">
            <h2 className="bin98-heading">Runtime Architecture</h2>
            {runtimeArchitecture.map((item) => (
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
              Measure real workloads. Warm-up, GC pauses, and object shapes can affect tail latency
              more than average runtime.
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
