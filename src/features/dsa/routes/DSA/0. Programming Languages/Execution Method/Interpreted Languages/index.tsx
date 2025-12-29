import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'LISP and REPL culture (1950s-1960s)',
    detail:
      'John McCarthy and Steve Russell implemented eval for LISP, birthing interactive development with read-eval-print loops that let developers experiment live.',
  },
  {
    title: 'Shells and scripting glue (1970s-1980s)',
    detail:
      'Unix shells (sh, csh, later bash) popularized interpreted pipelines for automation, showing that small scripts could orchestrate powerful native tools.',
  },
  {
    title: 'Perl, Python, Ruby mainstream dynamic scripting (1990s)',
    detail:
      'These languages prioritized expressiveness and batteries-included libraries, making interpreted execution the default for web apps, sysadmin tasks, and data munging.',
  },
  {
    title: 'JavaScript in browsers (mid-1990s)',
    detail:
      'Netscape introduced JavaScript to let pages run logic without plugins. Interpretation enabled instant ship cycles across heterogeneous clients.',
  },
  {
    title: 'JIT-accelerated interpreters (2000s-2010s)',
    detail:
      'V8, PyPy, and JavaScriptCore added just-in-time compilation to interpreters, blending dynamic flexibility with near-compiled speed on hot paths.',
  },
]

const mentalModels = [
  {
    title: 'Script as conversation',
    detail:
      'Interpreted programs converse with a runtime line by line or bytecode by bytecode. The runtime remains present, mediating every operation.',
  },
  {
    title: 'Late binding as a superpower',
    detail:
      'Types and bindings are often resolved at runtime. This enables metaprogramming, dynamic imports, and rapid iteration, but shifts more checks to execution time.',
  },
  {
    title: 'Runtime as an operating system',
    detail:
      'The interpreter provides its own scheduler, garbage collector, module loader, and standard library. Understanding that mini-OS helps explain performance and behavior.',
  },
]

const mechanics = [
  {
    heading: 'Source to bytecode',
    bullets: [
      'Many interpreters tokenize and parse source, then emit bytecode for a virtual machine (Python CPython, Lua).',
      'Some execute ASTs directly or threaded code without a stable bytecode format (early Ruby).',
      'Dynamic features (eval, reflection) can introduce new code at runtime, forcing the VM to stay adaptable.',
    ],
  },
  {
    heading: 'Execution engines',
    bullets: [
      'Bytecode interpreters loop over opcodes, dispatching to handlers. Dispatch overhead is a key cost.',
      'Tracing JITs record hot paths and compile them to native code, adding guards to ensure dynamic assumptions hold.',
      'Baseline JITs quickly emit simple native code, while optimizing tiers recompile hotspots with aggressive inlining and speculation.',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collection manages memory automatically, often with generational or incremental collectors.',
      'Dynamic dispatch resolves method lookups at runtime; inline caches and hidden classes speed repeated shapes.',
      'Module systems and package managers load code on demand, enabling rapid updates without recompilation.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics unaffected, constants shift',
    detail:
      'An O(n log n) sort stays O(n log n), but interpreter dispatch, dynamic type checks, and GC introduce higher constant factors than compiled equivalents.',
  },
  {
    title: 'Startup and warm-up behavior',
    detail:
      'Interpreted code starts instantly, a boon for CLIs and lambdas. JIT warm-up can delay peak speed; short-lived scripts may never reach optimized tiers.',
  },
  {
    title: 'Memory overhead',
    detail:
      'Object headers, dictionaries for dynamic attributes, and runtime metadata increase footprint. Compact representations (small ints, hidden classes) mitigate some overhead.',
  },
]

const applications = [
  {
    context: 'Web frontends',
    detail:
      'Browsers interpret and JIT JavaScript to make pages interactive. Rapid deploys and dynamic typing allow shipping new logic without client recompiles.',
  },
  {
    context: 'Scripting and automation',
    detail:
      'Python, Ruby, and shell excel at glue code: file manipulation, API calls, DevOps pipelines, and test harnesses where developer speed beats raw throughput.',
  },
  {
    context: 'Data analysis and ML prototyping',
    detail:
      'Scientists iterate quickly in Python notebooks while heavy lifting occurs in compiled extensions (NumPy, PyTorch) that the interpreter orchestrates.',
  },
  {
    context: 'Serverless and CLIs',
    detail:
      'Fast startup makes interpreted languages attractive for short-lived functions and command-line tools, provided cold start overhead is acceptable.',
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
      'Immediate feedback encourages experimentation. The interpreter compiles each line to bytecode and executes it on the spot.',
  },
  {
    title: 'Dynamic dispatch in practice (JavaScript)',
    code: `function format(user) {
    if (user.premium) return user.name.toUpperCase();
    return user.name;
}
format({ name: "Ada", premium: true });`,
    explanation:
      'Properties can appear at runtime; inline caches in modern engines memoize shapes to keep repeated calls fast despite late binding.',
  },
  {
    title: 'When interpretation bottlenecks',
    code: `# Python: slow loop
total = 0
for x in data:
    total += x * 1.1

# Faster: push work into vectorized native code
arr = np.array(data, dtype=np.float64)
total = (arr * 1.1).sum()`,
    explanation:
      'Interpreter overhead per iteration can dominate. Offloading hot loops to compiled extensions keeps high-level ergonomics while regaining speed.',
  },
]

const pitfalls = [
  'Assuming speed without measurement: interpreter dispatch and dynamic types can surprise in hot loops.',
  'Ignoring warm-up: JIT optimizations need stable shapes and time; microbenchmarks that stop early mislead.',
  'Memory leaks via lingering references: long-lived servers need profiling to catch reference cycles or caches.',
  'Unbounded dynamism: excessive use of eval or runtime code generation complicates security, tooling, and performance.',
  'Deployment drift: relying on system interpreters can lead to version mismatches; pin and vendor runtimes when reproducibility matters.',
]

const decisionPoints = [
  'Optimize for iteration speed and flexibility: use interpreted languages for scripting, glue, and fast-changing products.',
  'Need low latency with stable throughput: measure. If interpreter overhead dominates, move hotspots to native extensions or choose compiled paths.',
  'Short-lived workloads: prefer interpreters with minimal warm-up or avoid heavy JIT tiers.',
  'Operational simplicity: choose portable runtimes with easy packaging (single-file executables, containers) to avoid environment drift.',
]

const advancedInsights = [
  {
    title: 'Inline caches and hidden classes',
    detail:
      'Engines like V8 create shapes for objects and attach inline caches to call sites. Stable shapes lead to monomorphic call sites that JIT well; polymorphic sites deoptimize.',
  },
  {
    title: 'Tracing vs method JITs',
    detail:
      'Tracing JITs record hot traces through loops, while method JITs compile hot functions. Workload characteristics determine which strategy yields better speed and stability.',
  },
  {
    title: 'Garbage collection tuning',
    detail:
      'Adjust heap sizes and generations for latency vs throughput. Incremental and concurrent GC reduce pause times for interactive apps; throughput GCs suit batch workloads.',
  },
  {
    title: 'FFI bridges and polyglot runtimes',
    detail:
      'FFI lets interpreted code call native libraries. Polyglot platforms (GraalVM) allow mixing languages while sharing optimizations and tooling.',
  },
]

const sources = [
  'Structure and Interpretation of Computer Programs for the philosophy of interpreters and evaluators.',
  'V8 and PyPy papers for modern JIT and inline cache strategies.',
  'Dragon Book chapters on interpretation vs compilation trade-offs.',
  'GeeksforGeeks: interpreted vs compiled language overviews for quick contrasts.',
  'Official docs for CPython, Ruby MRI, and Lua for bytecode and VM designs.',
]

const takeaways = [
  'Interpreted languages prioritize developer speed, flexibility, and immediate feedback, often trading raw performance.',
  'Warm-up, dispatch overhead, and GC shape runtime profiles; measure real workloads before optimizing or rewriting.',
  'JITs narrow the gap when workloads are stable; for hot loops, offload to native extensions or vectorized libraries.',
  'Control your runtime environment: pin versions, manage dependencies, and use profiling and GC tuning to keep systems healthy.',
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

  .win95-header-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px;
  }

  .win95-button {
    padding: 3px 10px 2px;
    background: #C0C0C0;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1.2;
    text-decoration: none;
    color: #000;
  }

  .win95-button:active {
    border-color: #404040 #fff #fff #404040;
    background: #9c9c9c;
  }

  .win95-button:focus-visible {
    outline: 1px dotted #000;
    outline-offset: -3px;
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

export default function InterpretedLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">Interpreted Languages</span>
          <Link to="/algoViz" className="win95-close" aria-label="Close window">X</Link>
        </div>

        <div className="win95-content">
          <div className="win95-header-row">
            <Link to="/algoViz" className="win95-button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-section">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Interpreters keep the runtime in the loop for every operation. They favor flexibility, portability, and fast
                edit-run cycles over the last drop of performance. Understanding the interpreter and its JIT, if present, helps
                predict when code will be fast enough and when to reach for native helpers.
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
              {mechanics.map((block) => (
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
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{note.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{note.detail}</p>
                </div>
              ))}
            </div>
            <p className="win95-text win95-caption">
              Expect more variability than ahead-of-time binaries. Warm-up, GC pauses, and shape stability affect tail latency.
              Profile real request patterns, not just microbenchmarks.
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
