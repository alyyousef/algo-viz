import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'The two-language problem framed (2000s)',
    detail:
      'Scientists wrote prototypes in Python or MATLAB, then rewrote hot loops in C or Fortran. Julia set out to remove that split.',
  },
  {
    title: 'Julia project announced (2012)',
    detail:
      'The language introduced multiple dispatch, JIT compilation, and a syntax tuned for numerical computing.',
  },
  {
    title: '1.0 release with stability promise (2018)',
    detail:
      'Julia 1.0 committed to language stability, accelerating ecosystem growth across data science, ML, and simulation.',
  },
  {
    title: 'High-performance packages mature (2020s)',
    detail:
      'Libraries for differential equations, optimization, and GPU computing made Julia competitive in research and production.',
  },
]

const mentalModels = [
  {
    title: 'Fast like C, dynamic like Python',
    detail:
      'Julia compiles specialized machine code at runtime while keeping an interactive, dynamic workflow.',
  },
  {
    title: 'Multiple dispatch as the core engine',
    detail:
      'Functions choose implementations based on the types of all arguments, enabling expressive generic code.',
  },
  {
    title: 'Vectors, matrices, and broadcast everywhere',
    detail:
      'Array operations and dot broadcasting fuse elementwise loops, yielding concise code with strong performance.',
  },
]

const coreFeatures = [
  {
    heading: 'Multiple dispatch',
    bullets: [
      'Method selection depends on the types of all parameters.',
      'Enables clean generic programming without heavy inheritance.',
      'Optimizes for specialized code paths when types are known.',
    ],
  },
  {
    heading: 'JIT compilation',
    bullets: [
      'LLVM-based compilation produces optimized native code.',
      'Hot paths can be as fast as C or Fortran.',
      'First call incurs compile latency; subsequent calls are fast.',
    ],
  },
  {
    heading: 'Type system',
    bullets: [
      'Dynamic by default with optional type annotations.',
      'Parametric types support reusable data structures.',
      'Type stability drives performance-critical code.',
    ],
  },
  {
    heading: 'Array and linear algebra stack',
    bullets: [
      'First-class support for dense and sparse matrices.',
      'Broadcast fusion eliminates temporary allocations.',
      'BLAS and LAPACK backends accelerate primitives.',
    ],
  },
  {
    heading: 'Parallelism and distributed computing',
    bullets: [
      'Built-in support for threads and distributed workers.',
      'Task-based concurrency with async scheduling.',
      'GPU computing via CUDA and related packages.',
    ],
  },
  {
    heading: 'Package ecosystem',
    bullets: [
      'Pkg manages reproducible environments and registries.',
      'Strong libraries for SciML, optimization, and plotting.',
      'Interoperability with Python, R, and C libraries.',
    ],
  },
]

const performanceChecklist = [
  {
    title: 'Type stability',
    detail:
      'Functions should return consistent types. Instability triggers dynamic dispatch and slows hot loops.',
  },
  {
    title: 'Avoid global variables',
    detail:
      'Globals are type-unstable by default. Use functions and local variables for performance.',
  },
  {
    title: 'Preallocation',
    detail:
      'Reuse arrays inside loops to avoid garbage collection overhead.',
  },
  {
    title: 'Vectorization or explicit loops',
    detail:
      'Julia loops are fast. Use broadcast for clarity and fused operations, but do not fear explicit loops.',
  },
]

const realWorldUses = [
  {
    context: 'Scientific simulation',
    detail:
      'Differential equation solvers and HPC workflows benefit from performance and expressiveness.',
  },
  {
    context: 'Machine learning research',
    detail:
      'Differentiable programming tools make it attractive for new model prototyping and custom training loops.',
  },
  {
    context: 'Optimization and operations',
    detail:
      'Packages like JuMP enable clear optimization modeling with efficient solvers.',
  },
  {
    context: 'Financial modeling',
    detail:
      'Fast numerical kernels and time series analysis suit pricing models and risk analytics.',
  },
]

const examples = [
  {
    title: 'Multiple dispatch for distance metrics',
    code: `abstract type Metric end
struct Euclidean <: Metric end
struct Manhattan <: Metric end

distance(::Euclidean, a, b) = sqrt(sum((a .- b) .^ 2))
distance(::Manhattan, a, b) = sum(abs.(a .- b))

distance(Euclidean(), [1,2], [4,6])`,
    explanation:
      'Different metric behaviors share a single function name while dispatching on metric types.',
  },
  {
    title: 'Broadcast fusion and allocation control',
    code: `A = rand(1000, 1000)
B = rand(1000, 1000)

# Fused broadcast: one loop, no temporaries
C = @. 0.5 * A + 2 * B`,
    explanation:
      'The dot macro fuses the elementwise operations into a single loop for speed.',
  },
  {
    title: 'JuMP optimization sketch',
    code: `using JuMP, HiGHS
model = Model(HiGHS.Optimizer)
@variable(model, x >= 0)
@variable(model, y >= 0)
@objective(model, Max, 3x + 2y)
@constraint(model, 2x + y <= 8)
@constraint(model, x + 2y <= 8)
optimize!(model)`,
    explanation:
      'JuMP expresses optimization problems clearly and compiles them to efficient solvers.',
  },
]

const pitfalls = [
  'Ignoring type stability, which can turn hot loops into dynamic dispatch bottlenecks.',
  'Benchmarking without warm-up, leading to slow first-run results due to JIT compilation.',
  'Overusing global variables instead of functions and modules.',
  'Allocating inside tight loops instead of preallocating buffers.',
  'Assuming vectorization is always faster than explicit loops.',
]

const decisionGuidance = [
  'Need interactive development with near C performance: Julia is a strong choice.',
  'Need heavy numerical computing or simulation: Julia excels.',
  'Need fastest startup time for short scripts: consider alternatives or build system images.',
  'Need broad production tooling and large enterprise support: evaluate ecosystem maturity.',
  'Need integration with Python or C: Julia provides solid interop options.',
]

const advancedInsights = [
  {
    title: 'Multiple dispatch and composability',
    detail:
      'Libraries cooperate by extending methods for shared interfaces, enabling composable scientific workflows.',
  },
  {
    title: 'System images and precompilation',
    detail:
      'PackageCompiler can build custom system images that reduce startup and first-call latency.',
  },
  {
    title: 'Generated functions',
    detail:
      'Code can be generated based on types at compile time, unlocking high performance for generic algorithms.',
  },
  {
    title: 'Differentiable programming',
    detail:
      'Automatic differentiation integrates deeply with Julia code, enabling gradient-based optimization on custom models.',
  },
]

const takeaways = [
  'Julia combines high-level syntax with compiled performance.',
  'Multiple dispatch drives composability and performance across the ecosystem.',
  'Type stability and allocation control are the main performance levers.',
  'It shines in scientific computing, optimization, and ML research workflows.',
]

export default function JuliaPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Julia</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">High-level scientific computing with compiled speed</div>
              <p className="win95-text">
                Julia is a programming language designed for numerical and scientific computing. It blends an interactive workflow
                with JIT compilation and multiple dispatch, making it possible to write readable code that still performs like low-level
                languages.
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
                Julia focuses on the two-language problem: researchers want interactive, expressive code, yet production needs speed.
                Julia compiles specialized code for the types you use, allowing numerical kernels to run at native speed without leaving
                the high-level language.
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
            <legend>How it works: core features</legend>
            <div className="win95-grid win95-grid-3">
              {coreFeatures.map((block) => (
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
            <legend>Performance checklist</legend>
            <div className="win95-grid win95-grid-2">
              {performanceChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Julia performance is largely about type stability and allocation control. Once the compiler can infer types,
                optimized machine code falls out automatically.
              </p>
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
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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

