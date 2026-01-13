import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const milestones = [
  {
    title: 'FORTRAN I proves compiled code can rival assembly (1957)',
    detail:
      'The success of FORTRAN I established the idea that compilers can generate fast native code from high-level notation.',
  },
  {
    title: 'C standardizes portable systems compilation (1970s)',
    detail:
      'C balanced portability with control, enabling the same codebase to target multiple architectures.',
  },
  {
    title: 'Optimizing compilers go mainstream (1980s-1990s)',
    detail:
      'SSA, register allocation, and inlining became standard, making -O2 a baseline expectation.',
  },
  {
    title: 'Link-time and whole-program optimization',
    detail:
      'LTO merged IR across modules, enabling global inlining and dead-code elimination.',
  },
  {
    title: 'Modern safe systems languages',
    detail:
      'Rust and Go kept AOT compilation while improving memory safety and concurrency ergonomics.',
  },
  {
    title: 'Multi-target toolchains',
    detail:
      'LLVM and GCC matured cross-compilation, enabling one host to build for many targets.',
  },
]

const mentalModels = [
  {
    title: 'Blueprint to concrete',
    detail:
      'Source is a blueprint; compilation pours it into a fixed binary that executes without interpretation.',
  },
  {
    title: 'Front-loaded cost',
    detail:
      'Work happens at build time: type checking, optimization, and layout decisions before runtime.',
  },
  {
    title: 'Static contracts',
    detail:
      'Types, lifetimes, and visibility are enforced before execution, shifting errors earlier.',
  },
  {
    title: 'The binary is the product',
    detail:
      'Deployment ships compiled artifacts; behavior is determined by flags and toolchain versions.',
  },
  {
    title: 'Performance by design',
    detail:
      'Predictable performance comes from explicit choices: data layout, inlining, and CPU targets.',
  },
]

const pipelineStages = [
  {
    heading: 'Front-end',
    bullets: [
      'Lexing and parsing build an AST and resolve scopes.',
      'Type checking and semantic analysis catch errors early.',
      'Lowering to IR provides a machine-agnostic optimization target.',
    ],
  },
  {
    heading: 'Middle-end',
    bullets: [
      'IR optimizations: constant folding, DCE, CSE, inlining, loop unrolling.',
      'Vectorization and auto-parallelization attempt to use SIMD or threads.',
      'PGO uses runtime profiles to guide inlining and branch layout.',
    ],
  },
  {
    heading: 'Back-end',
    bullets: [
      'Instruction selection maps IR to target opcodes.',
      'Register allocation and scheduling minimize stalls.',
      'Assembly and linking produce executables or shared libraries.',
    ],
  },
]

const buildArtifacts = [
  {
    title: 'Object files',
    detail:
      'Per-translation-unit machine code plus relocation info, later stitched by the linker.',
  },
  {
    title: 'Static libraries',
    detail:
      'Archive of object files linked into the final binary; increases size but simplifies deployment.',
  },
  {
    title: 'Shared libraries',
    detail:
      'Dynamic linking reduces binary size but adds runtime dependency management.',
  },
  {
    title: 'Debug symbols',
    detail:
      'Mappings from machine addresses to source lines for debugging and profiling.',
  },
  {
    title: 'Stripped binaries',
    detail:
      'Remove symbols to reduce size; keep separate debug artifacts for production.',
  },
  {
    title: 'PDB/DWARF metadata',
    detail:
      'Platform-specific debug formats used by profilers and debuggers.',
  },
]

const optimizationLevels = [
  {
    title: '-O0 / Debug',
    detail:
      'Fast compile, maximal debug info, minimal optimization. Good for iteration.',
  },
  {
    title: '-O1',
    detail:
      'Light optimizations without long compile times; useful for development builds.',
  },
  {
    title: '-O2',
    detail:
      'Balanced optimization; default for release builds in many projects.',
  },
  {
    title: '-O3',
    detail:
      'Aggressive inlining and vectorization; can bloat code or hurt cache.',
  },
  {
    title: 'PGO',
    detail:
      'Profile-guided optimization uses real workloads to guide hot paths.',
  },
  {
    title: 'LTO',
    detail:
      'Whole-program optimization across translation units; improves inlining and DCE.',
  },
]

const complexityNotes = [
  {
    title: 'Runtime speed and deterministic overheads',
    detail:
      'Compiled binaries execute without interpreter dispatch. Overheads come from calls, cache behavior, and branches.',
  },
  {
    title: 'Compile time as a resource',
    detail:
      'Large codebases and heavy optimization increase build time; caching and incremental builds are essential.',
  },
  {
    title: 'Binary size vs performance',
    detail:
      'Inlining and static linking boost speed but can inflate binary size and hurt i-cache.',
  },
  {
    title: 'CPU target matters',
    detail:
      'Targeting AVX2 or NEON can speed hot loops but reduces portability.',
  },
  {
    title: 'Determinism vs flexibility',
    detail:
      'Ahead-of-time binaries are predictable but less flexible than JIT-optimized code for dynamic workloads.',
  },
]

const applications = [
  {
    context: 'Systems software',
    detail:
      'Kernels, databases, and runtimes rely on compiled code for predictable performance and tight resource control.',
  },
  {
    context: 'High-performance computing',
    detail:
      'Vectorization, cache blocking, and parallelism dominate; compiled languages provide control.',
  },
  {
    context: 'Tooling and infrastructure',
    detail:
      'Compilers, build systems, and CLI tools need fast startup and low overhead.',
  },
  {
    context: 'Game engines and real-time graphics',
    detail:
      'Frame budgets demand deterministic timing and explicit control of memory and threading.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Small binaries and predictable timing make compiled languages ideal for firmware.',
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
      'AOT compilation allows vectorization and instruction scheduling for the target CPU.',
  },
  {
    title: 'Zero-cost abstractions (Rust)',
    code: `fn sum_pairs(xs: &[(i32, i32)]) -> i32 {
  xs.iter().map(|(a, b)| a + b).sum()
}`,
    explanation:
      'Iterators are inlined and optimized away, leaving a simple loop in release builds.',
  },
  {
    title: 'Link-time optimization across modules (C++)',
    code: `// foo.cpp
int add(int a, int b) { return a + b; }

// main.cpp
extern int add(int, int);
int main() { return add(2, 3); }`,
    explanation:
      'With LTO, add can be inlined into main even across translation units.',
  },
]

const pitfalls = [
  'Undefined behavior: out-of-bounds access and data races can be optimized into incorrect behavior.',
  'Optimization surprises: aggressive inlining can bloat code and hurt cache performance.',
  'Portability gaps: ABIs, endianness, and alignment differ across platforms.',
  'Build system drift: mismatched flags or stale objects cause subtle inconsistencies.',
  'Slow edit-compile-run loops: heavy optimization slows iteration and hides regressions.',
]

const decisionPoints = [
  'Need maximum predictable performance with minimal runtime overhead: choose compiled languages.',
  'Shipping in constrained environments: ahead-of-time binaries simplify deployment.',
  'Hardware access or ABI control: compiled code gives explicit calling conventions and layout.',
  'If iteration speed dominates: use faster builds or hybrid approaches for orchestration.',
  'Treat build tooling as part of the product; invest in caching and reproducibility.',
]

const advancedInsights = [
  {
    title: 'Profile-guided optimization',
    detail:
      'PGO reorders branches and inlines hot functions based on real usage patterns.',
  },
  {
    title: 'Cache-aware code generation',
    detail:
      'Data layout and hints like restrict or alignment pragmas influence vectorization.',
  },
  {
    title: 'Deterministic builds',
    detail:
      'Pinned toolchains and hermetic builds reduce drift across environments.',
  },
  {
    title: 'Cross-compilation',
    detail:
      'One host can build for many targets; CI pipelines often produce multi-arch binaries.',
  },
  {
    title: 'Security hardening',
    detail:
      'Stack canaries, PIE, and ASLR-friendly binaries reduce exploitability.',
  },
  {
    title: 'ABI compatibility',
    detail:
      'Stable ABI and symbol versioning matter for shared libraries and plugin ecosystems.',
  },
]

const takeaways = [
  'Compiled languages trade build time for fast, predictable runtime behavior.',
  'Optimization is a feedback loop: measure, profile, then tune flags and layout.',
  'Binary size, ABI stability, and deployment strategy are part of the design.',
  'Use PGO and LTO before manual micro-optimizations.',
]

export default function CompiledLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Compiled Languages</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Ahead-of-time binaries for predictable performance and deployment</div>
              <p className="win95-text">
                Compiled languages transform source code into native binaries before execution. They emphasize predictable runtime
                behavior, explicit hardware control, and minimal dependencies at deployment time.
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
                The compiler front-loads work: parsing, type checks, optimization, and layout are completed before the program runs.
                The result is a self-contained binary with predictable performance and explicit control over calling conventions,
                memory layout, and runtime dependencies.
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
            <legend>Compilation pipeline</legend>
            <div className="win95-grid win95-grid-3">
              {pipelineStages.map((block) => (
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
            <legend>Build artifacts and linking</legend>
            <div className="win95-grid win95-grid-2">
              {buildArtifacts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Optimization levels and knobs</legend>
            <div className="win95-grid win95-grid-2">
              {optimizationLevels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Build-time tuning is part of performance engineering. Use fast builds for iteration and selective PGO/LTO for
                critical release paths.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
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

