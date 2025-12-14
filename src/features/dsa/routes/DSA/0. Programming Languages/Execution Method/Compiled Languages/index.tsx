import type { JSX } from 'react'

const milestones = [
  {
    title: 'FORTRAN I shows compiled code can rival assembly (1957)',
    detail:
      'John Backus and team proved an ahead-of-time compiler could optimize high-level math into machine code that matched hand-written assembly for numerical workloads.',
  },
  {
    title: 'C standardizes portable systems compilation (1970s)',
    detail:
      'Dennis Ritchie and the Unix group built C to compile efficiently on multiple architectures, anchoring the model of portable source with target-specific binaries.',
  },
  {
    title: 'Optimizing compilers go mainstream (1980s-1990s)',
    detail:
      'GCC and commercial toolchains added aggressive optimizations like inlining, loop unrolling, and register allocation guided by SSA, making -O2 the default expectation.',
  },
  {
    title: 'Link-time and whole-program optimization',
    detail:
      'LTO enabled optimizations across translation units, shrinking binaries and speeding hot paths by analyzing the entire program rather than single files.',
  },
  {
    title: 'Modern safe systems languages',
    detail:
      'Rust and Go keep ahead-of-time compilation but add safety or concurrency defaults, reinforcing that compiled does not have to mean unsafe or low ergonomics.',
  },
]

const mentalModels = [
  {
    title: 'Blueprint to concrete',
    detail:
      'Source code is a blueprint; the compiler pours concrete into the exact shape of your CPU. Once cast, behavior is fixed unless you rebuild.',
  },
  {
    title: 'Cost visibility',
    detail:
      'Ahead-of-time compilation exposes cost at build time. Binary size, inlining, and layout are inspectable before shipping, making performance budgeting explicit.',
  },
  {
    title: 'Static contracts',
    detail:
      'Types and lifetimes are enforced before execution. Errors are surfaced during compilation rather than at runtime, shifting defect discovery earlier.',
  },
]

const mechanics = [
  {
    heading: 'Front-end parsing and typing',
    bullets: [
      'Lexer and parser build an AST from source. Static analyzers resolve types, scopes, and detect errors before code generation.',
      'Modern compilers produce an intermediate representation (IR) such as SSA form to enable optimizations independent of syntax.',
    ],
  },
  {
    heading: 'Optimization pipelines',
    bullets: [
      'Passes perform constant folding, dead code elimination, inlining, loop unrolling, and vectorization when safe.',
      'Profile-guided optimization (PGO) feeds runtime profiles back into the compiler to guide branch layout and inlining decisions.',
      'Link-time optimization (LTO) merges IR across modules to remove redundant code and inline across translation units.',
    ],
  },
  {
    heading: 'Code generation and linking',
    bullets: [
      'Back-ends map IR to target instructions, manage registers, and schedule instructions for pipelines and caches.',
      'Assemblers encode instructions; linkers resolve symbols, relocate addresses, and lay out segments into an executable or shared library.',
      'Build systems orchestrate dependency graphs, incremental rebuilds, and artifact caching.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Runtime speed and deterministic overheads',
    detail:
      'Compiled binaries execute without interpreter dispatch. Overheads come from function calls, cache behavior, and branch prediction rather than dynamic dispatch loops.',
  },
  {
    title: 'Compile time as a resource',
    detail:
      'Heavy optimization and large codebases increase compile time. Build caching, incremental builds, and selective optimization levels balance developer velocity against runtime speed.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Binaries can be small when avoiding dynamic runtimes. Static linking raises size but simplifies deployment; dynamic linking shrinks size but adds versioning complexity.',
  },
]

const applications = [
  {
    context: 'Systems software',
    detail:
      'Kernels, hypervisors, and databases rely on compiled code for predictable performance, fine-grained memory control, and minimal runtime dependencies.',
  },
  {
    context: 'High-performance computing and numerical code',
    detail:
      'C, C++, and Fortran dominate HPC, where vectorization, cache blocking, and predictable layouts are critical for dense linear algebra and simulation.',
  },
  {
    context: 'Tooling and compilers themselves',
    detail:
      'Compilers, linkers, and build tools are compiled to maximize startup speed and handle large code graphs without interpreter overhead.',
  },
  {
    context: 'Game engines and real-time graphics',
    detail:
      'Frame budgets demand deterministic timing. Compiled languages allow explicit control over memory layouts, SIMD, and threading to hit frame targets.',
  },
]

const examples = [
  {
    title: 'Tight loop with predictable layout (C)',
    code: `double dot(const double* a, const double* b, size_t n) {
    double s = 0.0;
    for (size_t i = 0; i < n; ++i) {
        s += a[i] * b[i];
    }
    return s;
}`,
    explanation:
      'Ahead-of-time compilation lets the compiler unroll, vectorize, and schedule loads and multiplies for the target CPU without interpreter dispatch.',
  },
  {
    title: 'Compile-time safety with zero-cost abstractions (Rust)',
    code: `fn sum_pairs(xs: &[(i32, i32)]) -> i32 {
    xs.iter().map(|(a, b)| a + b).sum()
}`,
    explanation:
      'Iterators compile down to simple loops after inlining and monomorphization. Bounds checks are optimized away in release builds when provably safe.',
  },
  {
    title: 'Link-time optimization across modules (C++)',
    code: `// foo.cpp
int add(int a, int b) { return a + b; }

// main.cpp
extern int add(int, int);
int main() { return add(2, 3); }`,
    explanation:
      'With LTO, the compiler can inline add into main across translation units, removing call overhead and enabling further constant folding.',
  },
]

const pitfalls = [
  'Undefined behavior: out-of-bounds access or data races can silently corrupt state; the compiler may optimize assuming such cases never happen.',
  'Optimization surprises: aggressive inlining or vectorization can bloat code size or change cache behavior; measure in context.',
  'Portability gaps: endianness, alignment, and ABI differences require attention when targeting multiple architectures.',
  'Build system drift: mismatched flags or stale objects lead to subtle bugs; reproducible builds and clean rebuilds are essential.',
  'Slow edit-compile-run loops: without incremental builds or caching, heavy optimization slows developers and can hide regressions behind long feedback cycles.',
]

const decisionPoints = [
  'Need maximum predictable performance with minimal runtime overhead: prefer compiled languages.',
  'Deploying in environments with restricted runtimes or tight binary size: ahead-of-time binaries simplify distribution.',
  'Interfacing tightly with hardware or system calls: compiled code offers direct access and clear calling conventions.',
  'If iteration speed dominates and latency is relaxed: consider higher-level or hybrid approaches; otherwise invest in build speed tooling.',
]

const advancedInsights = [
  {
    title: 'Profile-guided optimization',
    detail:
      'Collect real workload profiles, then recompile so the optimizer can reorder branches, inline hot paths, and tune code layout. Gains often exceed manual micro-optimizations.',
  },
  {
    title: 'Cache-aware code generation',
    detail:
      'Compilers can tile loops and align data, but they need hints: restrict qualifiers, explicit vector types, and data layout choices affect auto-vectorization success.',
  },
  {
    title: 'Static analysis and sanitizers',
    detail:
      'AddressSanitizer, ThreadSanitizer, and static analyzers surface memory and concurrency bugs early. They complement the stronger guarantees of languages like Rust.',
  },
  {
    title: 'Deterministic builds',
    detail:
      'Pinned toolchains, hermetic builds, and content-addressed caches reduce drift across environments and make performance reproducibility possible.',
  },
]

const sources = [
  'The Dragon Book (Aho, Lam, Sethi, Ullman) for compiler theory and optimization pipelines.',
  'Compilers: Principles, Techniques, and Tools for SSA, register allocation, and code generation foundations.',
  'GeeksforGeeks: differences between compiled and interpreted languages for quick contrasts.',
  'Rust Book and C++ references for zero-cost abstractions and monomorphization.',
  'Intel and ARM optimization manuals for cache-aware and vectorization strategies.',
]

const takeaways = [
  'Compiled languages trade slower build times for fast, predictable runtime performance and small deployment footprints.',
  'Static typing and ahead-of-time analysis move many errors to compile time, but undefined behavior remains a core risk in unsafe subsets.',
  'Optimization is a feedback loop: measure, profile, and let the compiler help through PGO and LTO before hand-tuning.',
  'Choose compiled when you need control over layout, latency, and runtime dependencies; pair with faster-build layers for orchestration when iteration speed matters.',
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

export default function CompiledLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">Compiled Languages</span>
          <button type="button" className="win95-close" aria-label="Close">
            X
          </button>
        </div>

        <div className="win95-content">
          <fieldset className="win95-section">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Compiled languages focus on predictable performance, direct hardware access, and small runtime footprints. Work
                happens up front during builds, giving you visibility into binary size, calling conventions, and layout long before
                deployment.
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
              Choose optimization levels by need: -O0 for fast iteration, -O2 for balanced speed and size, -O3 or PGO for hot
              paths. Measure the tail latencies and cache misses that matter to your workload rather than relying on intuition
              alone.
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
