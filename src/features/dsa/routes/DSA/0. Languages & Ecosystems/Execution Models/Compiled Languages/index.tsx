import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'LTO merged IR across modules, enabling global inlining and dead-code elimination.',
  },
  {
    title: 'Modern safe systems languages',
    detail:
      'Rust and Go kept AOT compilation while improving memory safety and concurrency ergonomics.',
  },
  {
    title: 'Multi-target toolchains',
    detail: 'LLVM and GCC matured cross-compilation, enabling one host to build for many targets.',
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
    detail: 'Per-translation-unit machine code plus relocation info, later stitched by the linker.',
  },
  {
    title: 'Static libraries',
    detail:
      'Archive of object files linked into the final binary; increases size but simplifies deployment.',
  },
  {
    title: 'Shared libraries',
    detail: 'Dynamic linking reduces binary size but adds runtime dependency management.',
  },
  {
    title: 'Debug symbols',
    detail: 'Mappings from machine addresses to source lines for debugging and profiling.',
  },
  {
    title: 'Stripped binaries',
    detail: 'Remove symbols to reduce size; keep separate debug artifacts for production.',
  },
  {
    title: 'PDB/DWARF metadata',
    detail: 'Platform-specific debug formats used by profilers and debuggers.',
  },
]

const optimizationLevels = [
  {
    title: '-O0 / Debug',
    detail: 'Fast compile, maximal debug info, minimal optimization. Good for iteration.',
  },
  {
    title: '-O1',
    detail: 'Light optimizations without long compile times; useful for development builds.',
  },
  {
    title: '-O2',
    detail: 'Balanced optimization; default for release builds in many projects.',
  },
  {
    title: '-O3',
    detail: 'Aggressive inlining and vectorization; can bloat code or hurt cache.',
  },
  {
    title: 'PGO',
    detail: 'Profile-guided optimization uses real workloads to guide hot paths.',
  },
  {
    title: 'LTO',
    detail: 'Whole-program optimization across translation units; improves inlining and DCE.',
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
    detail: 'Inlining and static linking boost speed but can inflate binary size and hurt i-cache.',
  },
  {
    title: 'CPU target matters',
    detail: 'Targeting AVX2 or NEON can speed hot loops but reduces portability.',
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
    detail: 'Compilers, build systems, and CLI tools need fast startup and low overhead.',
  },
  {
    context: 'Game engines and real-time graphics',
    detail:
      'Frame budgets demand deterministic timing and explicit control of memory and threading.',
  },
  {
    context: 'Embedded systems',
    detail: 'Small binaries and predictable timing make compiled languages ideal for firmware.',
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
    explanation: 'With LTO, add can be inlined into main even across translation units.',
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
    detail: 'PGO reorders branches and inlines hot functions based on real usage patterns.',
  },
  {
    title: 'Cache-aware code generation',
    detail: 'Data layout and hints like restrict or alignment pragmas influence vectorization.',
  },
  {
    title: 'Deterministic builds',
    detail: 'Pinned toolchains and hermetic builds reduce drift across environments.',
  },
  {
    title: 'Cross-compilation',
    detail: 'One host can build for many targets; CI pipelines often produce multi-arch binaries.',
  },
  {
    title: 'Security hardening',
    detail: 'Stack canaries, PIE, and ASLR-friendly binaries reduce exploitability.',
  },
  {
    title: 'ABI compatibility',
    detail: 'Stable ABI and symbol versioning matter for shared libraries and plugin ecosystems.',
  },
]

const takeaways = [
  'Compiled languages trade build time for fast, predictable runtime behavior.',
  'Optimization is a feedback loop: measure, profile, then tune flags and layout.',
  'Binary size, ABI stability, and deployment strategy are part of the design.',
  'Use PGO and LTO before manual micro-optimizations.',
]

const glossaryTerms = [
  {
    term: 'Front-end',
    definition: 'Compiler phase that parses source, checks types, and lowers to IR.',
  },
  {
    term: 'Middle-end',
    definition: 'Optimization phase that transforms IR with DCE, inlining, and vectorization.',
  },
  {
    term: 'Back-end',
    definition: 'Target-specific phase that emits machine code and schedules instructions.',
  },
  {
    term: 'AOT compilation',
    definition: 'Ahead-of-time compilation that produces a native binary before runtime.',
  },
  {
    term: 'LTO',
    definition: 'Link-time optimization across translation units for global inlining and DCE.',
  },
  {
    term: 'PGO',
    definition: 'Profile-guided optimization that uses real workloads to shape code layout.',
  },
  {
    term: 'Object file',
    definition: 'Per-translation-unit machine code with relocation info for linking.',
  },
  {
    term: 'Shared library',
    definition: 'Dynamically linked binary that reduces size but adds runtime dependencies.',
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
    { id: 'core-pipeline', label: 'Compilation Pipeline' },
    { id: 'core-artifacts', label: 'Build Artifacts' },
    { id: 'core-optimizations', label: 'Optimization Levels' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CompiledLanguagesPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Compiled Languages',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Compiled Languages"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Compiled Languages</h1>
      <p>
        Compiled languages transform source code into native binaries before execution. They
        emphasize predictable runtime behavior, explicit hardware control, and minimal dependencies
        at deployment time.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              The compiler front-loads work: parsing, type checks, optimization, and layout are
              completed before the program runs. The result is a self-contained binary with
              predictable performance and explicit control over calling conventions, memory layout,
              and runtime dependencies.
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
          <section id="core-pipeline" className="bin98-section">
            <h2 className="bin98-heading">Compilation Pipeline</h2>
            {pipelineStages.map((block) => (
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
          <section id="core-artifacts" className="bin98-section">
            <h2 className="bin98-heading">Build Artifacts and Linking</h2>
            {buildArtifacts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-optimizations" className="bin98-section">
            <h2 className="bin98-heading">Optimization Levels and Knobs</h2>
            {optimizationLevels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Build-time tuning is part of performance engineering. Use fast builds for iteration
              and selective PGO/LTO for critical release paths.
            </p>
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Performance Intuition</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
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
