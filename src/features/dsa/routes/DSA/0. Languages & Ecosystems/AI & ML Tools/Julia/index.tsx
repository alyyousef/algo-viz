import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
    title: 'Early community growth (2014-2016)',
    detail:
      'A core package registry, the REPL, and early scientific libraries established Julia as a serious research platform.',
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
  {
    title: 'Industry adoption expands (2020s)',
    detail:
      'Finance, energy, and simulation-heavy teams adopted Julia for speedups without leaving high-level workflows.',
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
  {
    title: 'Types as performance contracts',
    detail:
      'You can write dynamic code, but stable types let the compiler optimize like a static language.',
  },
  {
    title: 'Generic code is the fast path',
    detail:
      'Well-typed generic functions compile into specialized kernels for each concrete usage.',
  },
]

const coreFeatures = [
  {
    heading: 'Multiple dispatch',
    bullets: [
      'Method selection depends on the types of all parameters.',
      'Enables clean generic programming without heavy inheritance.',
      'Optimizes for specialized code paths when types are known.',
      'Supports trait-like patterns using dispatch on abstract types.',
    ],
  },
  {
    heading: 'JIT compilation',
    bullets: [
      'LLVM-based compilation produces optimized native code.',
      'Hot paths can be as fast as C or Fortran.',
      'First call incurs compile latency; subsequent calls are fast.',
      'Cacheable code lowers latency across sessions with precompile.',
    ],
  },
  {
    heading: 'Type system',
    bullets: [
      'Dynamic by default with optional type annotations.',
      'Parametric types support reusable data structures.',
      'Type stability drives performance-critical code.',
      'Multiple numeric types enable exactness or speed tradeoffs.',
    ],
  },
  {
    heading: 'Array and linear algebra stack',
    bullets: [
      'First-class support for dense and sparse matrices.',
      'Broadcast fusion eliminates temporary allocations.',
      'BLAS and LAPACK backends accelerate primitives.',
      'Custom array types allow domain-specific storage layouts.',
    ],
  },
  {
    heading: 'Parallelism and distributed computing',
    bullets: [
      'Built-in support for threads and distributed workers.',
      'Task-based concurrency with async scheduling.',
      'GPU computing via CUDA and related packages.',
      'Composable parallel patterns via Dagger and ThreadsX.',
    ],
  },
  {
    heading: 'Package ecosystem',
    bullets: [
      'Pkg manages reproducible environments and registries.',
      'Strong libraries for SciML, optimization, and plotting.',
      'Interoperability with Python, R, and C libraries.',
      'Precompilation improves load times for complex stacks.',
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
    detail: 'Reuse arrays inside loops to avoid garbage collection overhead.',
  },
  {
    title: 'Vectorization or explicit loops',
    detail:
      'Julia loops are fast. Use broadcast for clarity and fused operations, but do not fear explicit loops.',
  },
  {
    title: 'Measure with tools',
    detail:
      'Use @time, @btime (BenchmarkTools), and @code_warntype to validate performance assumptions.',
  },
]

const realWorldUsesList = [
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
    detail: 'Packages like JuMP enable clear optimization modeling with efficient solvers.',
  },
  {
    context: 'Financial modeling',
    detail:
      'Fast numerical kernels and time series analysis suit pricing models and risk analytics.',
  },
  {
    context: 'Signal processing',
    detail:
      'DSP, FFTs, and control systems benefit from composable numeric code and visualization.',
  },
  {
    context: 'Robotics and physics engines',
    detail: 'Rigid-body and kinematics calculations stay readable while running at high speed.',
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
    explanation: 'The dot macro fuses the elementwise operations into a single loop for speed.',
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
  {
    title: 'Type stability check',
    code: `f(x) = x > 0 ? x : 0
@code_warntype f(3)

g(x) = x > 0 ? x : 0.0
@code_warntype g(3)`,
    explanation:
      'Mixed return types trigger instability; keep branches consistent to enable specialization.',
  },
  {
    title: 'Threads for simple parallelism',
    code: `using Base.Threads
function threaded_sum(xs)
  s = zeros(Float64, nthreads())
  @threads for i in eachindex(xs)
    s[threadid()] += xs[i]
  end
  return sum(s)
end`,
    explanation: 'Thread-local accumulation avoids contention while still using a simple loop.',
  },
]

const pitfalls = [
  'Ignoring type stability, which can turn hot loops into dynamic dispatch bottlenecks.',
  'Benchmarking without warm-up, leading to slow first-run results due to JIT compilation.',
  'Overusing global variables instead of functions and modules.',
  'Allocating inside tight loops instead of preallocating buffers.',
  'Assuming vectorization is always faster than explicit loops.',
  'Loading heavy packages inside tight loops instead of once at startup.',
  'Relying on default RNG or global state in parallel code without care.',
]

const decisionGuidance = [
  'Need interactive development with near C performance: Julia is a strong choice.',
  'Need heavy numerical computing or simulation: Julia excels.',
  'Need fastest startup time for short scripts: consider alternatives or build system images.',
  'Need broad production tooling and large enterprise support: evaluate ecosystem maturity.',
  'Need integration with Python or C: Julia provides solid interop options.',
  'Need to prototype math-heavy algorithms quickly: Julia is designed for this workflow.',
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
  {
    title: 'Custom array types',
    detail:
      'Domain-specific arrays (lazy, sparse, GPU) plug into generic algorithms through interfaces.',
  },
]

const takeaways = [
  'Julia combines high-level syntax with compiled performance.',
  'Multiple dispatch drives composability and performance across the ecosystem.',
  'Type stability and allocation control are the main performance levers.',
  'It shines in scientific computing, optimization, and ML research workflows.',
  'The ecosystem is rich for research, with growing production adoption.',
]

const languageFundamentals = [
  {
    title: 'Syntax with math-first ergonomics',
    detail:
      'Unicode-friendly operators, 1-based indexing, and array literals make math and linear algebra read naturally.',
  },
  {
    title: 'Functions are the unit of performance',
    detail:
      'Julia specializes functions per argument types, so small, composable functions perform well.',
  },
  {
    title: 'Multiple dispatch over inheritance',
    detail: 'Behavior is organized around functions, not classes, enabling cross-cutting APIs.',
  },
  {
    title: 'Metaprogramming is practical',
    detail:
      'Macros and generated functions allow domain-specific syntax without sacrificing speed.',
  },
]

const typeSystemDetails = [
  {
    title: 'Abstract vs concrete types',
    detail: 'Abstract types define interfaces; concrete types store data and are instantiated.',
  },
  {
    title: 'Parametric types',
    detail:
      'Types can be parameterized by element types and dimensions, enabling reusable data containers.',
  },
  {
    title: 'Union types',
    detail: 'Small unions are optimized, but broad unions can hamper inference in hot paths.',
  },
  {
    title: 'Type annotations',
    detail: 'Hints can improve clarity, but overly strict annotations can reduce generic reuse.',
  },
]

const toolingWorkflow = [
  {
    title: 'REPL and Revise.jl',
    detail: 'Interactive development with live code reloading keeps iteration fast.',
  },
  {
    title: 'Pkg environments',
    detail: 'Project and Manifest files capture exact dependencies for reproducibility.',
  },
  {
    title: 'Testing and docs',
    detail: 'Built-in Test plus Documenter.jl support robust test suites and docs.',
  },
  {
    title: 'Profiling',
    detail: 'Profile, ProfileView, and TimerOutputs reveal allocation hotspots and latency.',
  },
]

const ecosystemHighlights = [
  {
    title: 'SciML and differential equations',
    detail: 'Comprehensive solvers with sensitivity analysis and GPU-ready pipelines.',
  },
  {
    title: 'DataFrames and data tools',
    detail: 'DataFrames.jl plus CSV.jl provide a familiar data-wrangling toolkit.',
  },
  {
    title: 'Plotting and visualization',
    detail: 'Makie, Plots, and Gadfly cover interactive and publication-quality visuals.',
  },
  {
    title: 'Optimization and algebra',
    detail: 'JuMP, Optim, and LinearAlgebra handle convex and non-convex workflows.',
  },
  {
    title: 'GPU computing',
    detail: 'CUDA.jl and AMDGPU.jl bring native GPU kernels with familiar syntax.',
  },
  {
    title: 'Probabilistic programming',
    detail: 'Turing.jl enables Bayesian modeling with automatic inference.',
  },
]

const concurrencyModel = [
  {
    title: 'Tasks and async',
    detail: 'Lightweight tasks with cooperative scheduling power IO-heavy workflows.',
  },
  {
    title: 'Threads',
    detail: 'Multi-threading via @threads and Threads.@spawn enables shared-memory parallelism.',
  },
  {
    title: 'Distributed workers',
    detail: 'The Distributed standard library scales computation across processes and machines.',
  },
  {
    title: 'GPU kernels',
    detail: 'KernelAbstractions and CUDA allow writing kernels directly in Julia.',
  },
]

const interopOptions = [
  {
    title: 'Python interoperability',
    detail: 'PyCall and PythonCall bridge Julia with NumPy, Pandas, and PyTorch workflows.',
  },
  {
    title: 'C and Fortran',
    detail: 'ccall and bindings provide zero-copy access to native libraries.',
  },
  {
    title: 'R integration',
    detail: 'RCall enables importing R packages and data frames into Julia.',
  },
  {
    title: 'Shared libraries',
    detail: 'PackageCompiler can build shared libraries for integration into other systems.',
  },
]

const deploymentOptions = [
  {
    title: 'Scripts and CLI tools',
    detail:
      'Write command-line apps with ArgParse or Comonicon and package them with Project environments.',
  },
  {
    title: 'System images',
    detail: 'Custom system images reduce startup latency for production services.',
  },
  {
    title: 'Server and API usage',
    detail: 'HTTP.jl and Genie.jl support web services; tasks handle concurrency.',
  },
  {
    title: 'Binary distribution',
    detail: 'Create standalone apps using PackageCompiler and artifact bundling.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Python',
    detail:
      'Julia offers faster numeric kernels without C extensions but has higher startup latency.',
  },
  {
    title: 'Compared to MATLAB',
    detail: 'Julia is open-source and general-purpose, with similar matrix-centric syntax.',
  },
  {
    title: 'Compared to C++',
    detail:
      'Julia trades long compile times and manual memory work for interactive speed and simplicity.',
  },
  {
    title: 'Compared to R',
    detail:
      'Julia provides faster loops and stronger general programming constructs for large systems.',
  },
]

const learningPath = [
  {
    title: 'Start with core syntax',
    detail: 'Learn arrays, broadcasting, and functions; write small numerical kernels.',
  },
  {
    title: 'Understand types',
    detail: 'Read @code_warntype output to build intuition for performance.',
  },
  {
    title: 'Adopt packages',
    detail: 'Use Pkg environments and explore the SciML and DataFrames ecosystems.',
  },
  {
    title: 'Scale performance',
    detail: 'Profile allocations, preallocate, and explore threading or GPU options.',
  },
]

const compilationStages = [
  {
    stage: 'Parsing',
    description: 'Julia parses code into an AST ready for lowering.',
  },
  {
    stage: 'Lowering',
    description: 'High-level syntax is transformed into a simpler intermediate form.',
  },
  {
    stage: 'Type inference',
    description: 'The compiler infers types to specialize and optimize code.',
  },
  {
    stage: 'LLVM codegen',
    description: 'LLVM emits optimized native machine code.',
  },
]
const dispatchEngine = mentalModels[1] ?? {
  title: 'Multiple dispatch as the core engine',
  detail:
    'Functions choose implementations based on the types of all arguments, enabling expressive generic code.',
}
const typeContracts = mentalModels[3] ?? {
  title: 'Types as performance contracts',
  detail:
    'You can write dynamic code, but stable types let the compiler optimize like a static language.',
}
const jitCompilation = coreFeatures[1] ?? {
  heading: 'JIT compilation',
  bullets: [],
}
const typeStability = performanceChecklist[0] ?? {
  title: 'Type stability',
  detail:
    'Functions should return consistent types. Instability triggers dynamic dispatch and slows hot loops.',
}
const profilingTools = toolingWorkflow[3] ?? {
  title: 'Profiling',
  detail: 'Profile, ProfileView, and TimerOutputs reveal allocation hotspots and latency.',
}
const systemImages = deploymentOptions[1] ?? {
  title: 'System images',
  detail: 'Custom system images reduce startup latency for production services.',
}

const glossaryTerms = [
  {
    term: dispatchEngine.title,
    definition: dispatchEngine.detail,
  },
  {
    term: typeContracts.title,
    definition: typeContracts.detail,
  },
  {
    term: jitCompilation.heading,
    definition: 'LLVM-based runtime compilation that produces specialized native machine code.',
  },
  {
    term: typeStability.title,
    definition: typeStability.detail,
  },
  {
    term: profilingTools.title,
    definition: profilingTools.detail,
  },
  {
    term: systemImages.title,
    definition: systemImages.detail,
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
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-features', label: 'Core Features' },
    { id: 'core-types', label: 'Type System' },
    { id: 'core-compilation', label: 'Compilation Pipeline' },
    { id: 'core-performance', label: 'Performance Checklist' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
    { id: 'core-ecosystem', label: 'Ecosystem Highlights' },
    { id: 'core-tooling', label: 'Tooling and Workflow' },
    { id: 'core-interop', label: 'Interoperability' },
    { id: 'core-deploy', label: 'Deployment Options' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-compare', label: 'Comparisons' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function JuliaPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Julia',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Julia"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Julia</h1>
      <p>
        Julia is a programming language designed for numerical and scientific computing. It blends
        an interactive workflow with JIT compilation and multiple dispatch, making it possible to
        write readable code that still performs like low-level languages.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Julia focuses on the two-language problem: researchers want interactive, expressive
              code, yet production needs speed. Julia compiles specialized code for the types you
              use, allowing numerical kernels to run at native speed without leaving the high-level
              language.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
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
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">Language Fundamentals</h2>
            {languageFundamentals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-features" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Core Features</h2>
            {coreFeatures.map((block) => (
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
          <section id="core-types" className="bin98-section">
            <h2 className="bin98-heading">Type System Deep Dive</h2>
            {typeSystemDetails.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compilation" className="bin98-section">
            <h2 className="bin98-heading">Compilation Pipeline</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>What happens</th>
                </tr>
              </thead>
              <tbody>
                {compilationStages.map((item) => (
                  <tr key={item.stage}>
                    <td>{item.stage}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Checklist</h2>
            {performanceChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Julia performance is largely about type stability and allocation control. Once the
              compiler can infer types, optimized machine code falls out automatically.
            </p>
          </section>
          <section id="core-concurrency" className="bin98-section">
            <h2 className="bin98-heading">Concurrency and Parallelism</h2>
            {concurrencyModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUsesList.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-ecosystem" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Highlights</h2>
            {ecosystemHighlights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-tooling" className="bin98-section">
            <h2 className="bin98-heading">Tooling and Workflow</h2>
            {toolingWorkflow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-interop" className="bin98-section">
            <h2 className="bin98-heading">Interoperability</h2>
            {interopOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-deploy" className="bin98-section">
            <h2 className="bin98-heading">Deployment Options</h2>
            {deploymentOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
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
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Comparisons and Tradeoffs</h2>
            {comparisonNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-learning" className="bin98-section">
            <h2 className="bin98-heading">Learning Path</h2>
            {learningPath.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
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
