import type { JSX } from 'react'

const milestones = [
  {
    title: 'FORTRAN proves compilers can rival hand assembly (1957)',
    detail:
      'Backus and the IBM team shipped FORTRAN I, showing that higher-level notation could generate efficient machine code. Developer productivity jumped without catastrophic performance loss.',
  },
  {
    title: 'ALGOL and structured programming (1960s)',
    detail:
      'ALGOL 60 introduced block structure and clear scoping, seeding ideas for modern syntax, recursion, and structured control that still anchor C, JavaScript, and Go.',
  },
  {
    title: 'Smalltalk and the birth of interactive OOP (1970s)',
    detail:
      'Alan Kay and the Xerox PARC group used Smalltalk to explore objects, message passing, and live environments, influencing GUI tooling and dynamic runtimes.',
  },
  {
    title: 'Python and Java democratize batteries-included ecosystems (1990s)',
    detail:
      'Guido van Rossum emphasized readability and a rich standard library; Java popularized the JVM and write-once-run-anywhere portability for servers and desktops.',
  },
  {
    title: 'JavaScript everywhere and JIT acceleration (2000s-2010s)',
    detail:
      'V8 and modern JITs turned a browser scripting language into a performant general-purpose tool, enabling Node.js, npm, and ubiquitous web application stacks.',
  },
]

const mentalModels = [
  {
    title: 'Abstraction ladder',
    detail:
      'High-level languages climb a ladder: you trade direct hardware control for expressive constructs. The ladder is safe when lower rungs (runtime, libraries, OS) remain visible enough to diagnose cost.',
  },
  {
    title: 'Productivity budget',
    detail:
      'Think of performance, correctness, and delivery speed as a budget. High-level constructs spend a few CPU cycles to buy clearer intent, safer defaults, and faster iteration.',
  },
  {
    title: 'Leaky shields',
    detail:
      'Abstractions shield you from registers and layout, but leaks appear at interfaces: FFI boundaries, data copies, garbage collection pauses, and implicit allocations.',
  },
]

const howItWorks = [
  {
    heading: 'Compilation and interpretation',
    bullets: [
      'Source is lowered to bytecode or an AST; a VM or interpreter executes it stepwise. Examples: CPython bytecode, Ruby YARV, Lua VM.',
      'Ahead-of-time (AOT) compilers emit native code (Rust, Go) while retaining high-level syntax and safety checks.',
      'Hybrid paths JIT hot code paths at runtime to recover speed (JavaScript V8, Java HotSpot, PyPy).',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collectors reclaim unreachable memory; strategies differ (mark-sweep, generational, concurrent).',
      'Dynamic dispatch, reflection, and metaprogramming provide late binding and flexible APIs at the cost of predictability.',
      'Standard libraries offer batteries: file IO, networking, containers, concurrency primitives, cryptography, and testing frameworks.',
    ],
  },
  {
    heading: 'Portability layers',
    bullets: [
      'Virtual machines abstract hardware quirks so the same bytecode runs on Windows, macOS, Linux, or mobile.',
      'Foreign function interfaces (FFI) bridge to C or system calls when performance or OS access is needed.',
      'Package managers (pip, npm, Maven) distribute code and manage dependency graphs, enabling ecosystem-scale reuse.',
    ],
  },
]

const complexity = [
  {
    title: 'Asymptotic neutrality, constant-factor costs',
    detail:
      'Algorithms keep their big-O, but high-level runtimes add constant factors: bounds checks, dynamic dispatch, and GC barriers. For CPU-bound hot loops, those factors are visible; for IO-bound services, they are often dwarfed by network latency.',
  },
  {
    title: 'Garbage collection and pause dynamics',
    detail:
      'Throughput collectors maximize overall speed but may introduce pauses; concurrent or incremental collectors trade peak throughput for latency. Tuning heap sizes and generations is a practical skill.',
  },
  {
    title: 'Developer time vs machine time',
    detail:
      'Hours saved in implementation and defect reduction often outweigh milliseconds of runtime in products that evolve quickly. For extreme throughput (trading, kernels), low-level control reclaims constants at the cost of slower iteration.',
  },
]

const applications = [
  {
    context: 'Web backends',
    detail:
      'Frameworks like Django, Rails, and Express turn routing, auth, and templating into configuration. Teams ship features quickly while relying on native extensions or proxies for hotspots.',
  },
  {
    context: 'Data science and machine learning',
    detail:
      'Python wraps high-performance kernels (BLAS, cuDNN) with NumPy and PyTorch, letting scientists express math naturally while libraries handle vectorized C and CUDA code.',
  },
  {
    context: 'Automation and scripting',
    detail:
      'Shell replacements and task runners (Python scripts, Node CLIs) orchestrate APIs and filesystems with minimal ceremony, ideal for glue logic and prototyping.',
  },
  {
    context: 'Cross-platform clients',
    detail:
      'React Native and Flutter lift UI development to declarative layers while bridging to platform widgets and graphics libraries under the hood.',
  },
]

const examples = [
  {
    title: 'Readable data transformation (Python)',
    code: `def top_titles_by_score(rows, limit=5):
    # rows: list of dicts with 'title' and 'score'
    sorted_rows = sorted(rows, key=lambda r: r["score"], reverse=True)
    return [row["title"] for row in sorted_rows[:limit]]`,
    explanation:
      'A comprehension expresses intent without manual pointer arithmetic or memory allocation. The interpreter handles ordering and slicing; clarity invites quick reviews.',
  },
  {
    title: 'Concurrent IO without threads (JavaScript)',
    code: `async function fetchProfiles(ids) {
    const requests = ids.map((id) => fetch(\`/api/users/\${id}\`));
    const responses = await Promise.all(requests);
    return Promise.all(responses.map((r) => r.json()));
}`,
    explanation:
      'The event loop and promises hide scheduling complexity. Await syntax keeps control flow linear while the runtime multiplexes network IO.',
  },
  {
    title: 'When abstraction leaks (Python + NumPy vs pure Python)',
    code: `# Fast path: vectorized in C
scores = np.array(raw_scores)
adjusted = scores * 1.1 + 3

# Slow path: Python loop with per-iteration overhead
adjusted = [s * 1.1 + 3 for s in raw_scores]`,
    explanation:
      'The same math expressed differently can hit very different execution engines. Knowing when to stay in vectorized kernels preserves performance without abandoning high-level syntax.',
  },
]

const pitfalls = [
  'Assuming abstraction erases cost: dynamic dispatch, hidden allocations, and reflection can dominate hot paths.',
  'Ignoring memory profiles: GC pauses or accidental data copies can surface under latency-sensitive workloads.',
  'Overreliance on magical defaults: frameworks generate convenience, but unexamined defaults (N+1 queries, unbounded concurrency) become scaling bottlenecks.',
  'Shaky dependency hygiene: large ecosystems make supply chain vetting, pinning versions, and license awareness essential.',
  'Forgetting observability: without profiling and tracing hooks, it is hard to map high-level code to real CPU, memory, or network behavior.',
]

const decisionPoints = [
  'Optimize for iteration speed and readability: choose high-level languages for product discovery, research, and most networked services.',
  'Need predictable latency with tight budgets: profile first; if GC or dispatch dominates, consider lower-level segments or FFI for hotspots.',
  'Operate in constrained environments (firmware, kernels): prefer languages with explicit memory control or subsets that compile efficiently.',
  'Team expertise and ecosystem weight: pick the runtime with the richest libraries and operational tooling for your domain.',
]

const advancedInsights = [
  {
    title: 'JIT and tiered compilation',
    detail:
      'Modern runtimes observe code, speculate on shapes, and emit optimized machine code. Guard failures deoptimize. Warm-up time matters for short-lived processes.',
  },
  {
    title: 'Static types in high-level guise',
    detail:
      'TypeScript, Kotlin, and Rust show that expressive syntax can pair with strong static guarantees. Gradual typing (Python typing, Sorbet for Ruby) adds safety without abandoning dynamism.',
  },
  {
    title: 'FFI and polyglot runtimes',
    detail:
      'Bridging to C, Rust, or Java lets teams write most code in a high-level language and delegate critical loops to native modules. Polyglot VMs like GraalVM blur boundaries further.',
  },
  {
    title: 'Determinism and reproducibility',
    detail:
      'Containerized runtimes, pinned dependencies, and reproducible builds tame the variability often blamed on dynamic languages. This discipline is as critical as language choice.',
  },
]

const sources = [
  'Dragon Book (Aho, Lam, Sethi, Ullman) for compiler pipelines and optimization theory.',
  'Structure and Interpretation of Computer Programs for the role of abstraction in program design.',
  'GeeksforGeeks: differences between high-level and low-level languages for quick comparisons.',
  'V8 design docs and PyPy papers for modern JIT and interpreter strategies.',
  'Tanenbaum: Modern Operating Systems for how runtimes interact with OS scheduling and memory.',
]

const takeaways = [
  'High-level languages trade constant-factor performance for dramatic gains in clarity, safety, and delivery speed.',
  'Abstractions still leak: understand garbage collection, dispatch, and data movement to avoid surprises.',
  'Ecosystems and tooling often matter more than raw language speed; leverage libraries and profilers before reaching for rewrites.',
  'Use FFI or selective lower-level modules to balance hotspots without sacrificing overall productivity.',
]

const styles = `
  * {
    box-sizing: border-box;
  }

  .win95-page {
    width: 100%;
    min-height: 100vh;
    background: #C0C0C0;
    color: #000;
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
    font-size: 12px;
    line-height: 1.35;
    -webkit-font-smoothing: none;
    text-rendering: optimizeSpeed;
    margin: 0;
    padding: 0;
  }

  .win95-window {
    width: 100%;
    min-height: 100vh;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    background: #C0C0C0;
    display: flex;
    flex-direction: column;
  }

  .win95-title-bar {
    background: #000080;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px;
    gap: 8px;
    font-weight: bold;
    letter-spacing: 0.2px;
  }

  .win95-title {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .win95-close {
    background: #C0C0C0;
    color: #000;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    font-weight: bold;
    padding: 2px 10px;
    min-width: 28px;
    cursor: pointer;
  }

  .win95-close:active {
    border-color: #404040 #fff #fff #404040;
    background: #9c9c9c;
  }

  .win95-close:focus-visible {
    outline: 1px dotted #000;
    outline-offset: -4px;
  }

  .win95-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px;
  }

  .win95-section {
    border: 2px solid;
    border-color: #808080 #404040 #404040 #808080;
    padding: 10px;
    margin: 0;
  }

  .win95-section legend {
    padding: 0 6px;
    font-weight: bold;
  }

  .win95-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 8px;
  }

  .win95-grid.tight {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 6px;
  }

  .win95-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .win95-panel {
    border: 2px solid;
    border-color: #808080 #fff #fff #808080;
    background: #C0C0C0;
    padding: 8px;
  }

  .win95-panel.raised {
    border-color: #fff #404040 #404040 #fff;
  }

  .win95-panel strong,
  .win95-panel h4,
  .win95-panel h3 {
    font-weight: bold;
  }

  .win95-text {
    margin: 0;
  }

  .win95-list {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 6px;
  }

  .win95-ordered {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 6px;
  }

  .win95-code {
    margin: 8px 0 6px;
    padding: 8px;
    background: #bdbdbd;
    border: 2px solid;
    border-color: #404040 #fff #fff #404040;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    overflow-x: auto;
    color: #000;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 1px dotted #000;
    outline-offset: 2px;
  }

  button {
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
    font-size: 12px;
  }

  .win95-caption {
    margin: 6px 0 0;
  }
`

export default function HighLevelLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">High-Level Languages</span>
          <button type="button" className="win95-close" aria-label="Close">
            X
          </button>
        </div>

        <div className="win95-content">
          <fieldset className="win95-section">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                These languages exist to let humans think in domain terms rather than machine minutiae. They trade control of
                layout and registers for readability, safety features, and batteries-included libraries. The critical skill is
                knowing when that trade still meets your latency, memory, and observability needs.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Historical context</legend>
            <div className="win95-grid">
              {milestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>How it works</legend>
            <div className="win95-grid tight">
              {howItWorks.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <p className="win95-text">
                    <strong>{block.heading}</strong>
                  </p>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid">
              {complexity.map((note) => (
                <div key={note.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{note.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{note.detail}</p>
                </div>
              ))}
            </div>
            <p className="win95-text win95-caption">
              Profile before optimizing. Many high-level systems are IO-bound; improvements come from batching requests,
              reducing allocations, and moving compute into vectorized or native paths rather than abandoning the language.
            </p>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Real-world applications</legend>
            <div className="win95-grid">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.context}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{example.title}</strong>
                  </p>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text win95-caption">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Common pitfalls</legend>
            <ul className="win95-list">
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="win95-section">
            <legend>When to use it</legend>
            <ol className="win95-ordered">
              {decisionPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Advanced insights and frontiers</legend>
            <div className="win95-grid">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Further reading and sources</legend>
            <ul className="win95-list">
              {sources.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Key takeaways</legend>
            <div className="win95-panel raised">
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
