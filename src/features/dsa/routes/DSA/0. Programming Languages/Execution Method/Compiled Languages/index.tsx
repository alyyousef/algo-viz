import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
    { id: 'core-pipeline', label: 'Compilation Pipeline' },
    { id: 'core-artifacts', label: 'Build Artifacts' },
    { id: 'core-optimizations', label: 'Optimization Levels' },
    { id: 'core-performance', label: 'Performance Notes' },
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

export default function CompiledLanguagesPage(): JSX.Element {
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
    document.title = `Compiled Languages (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Compiled Languages',
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
          <span className="win98-title-text">Compiled Languages</span>
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
            <h1 className="win98-doc-title">Compiled Languages</h1>
            <p>
              Compiled languages transform source code into native binaries before execution. They emphasize predictable runtime
              behavior, explicit hardware control, and minimal dependencies at deployment time.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    The compiler front-loads work: parsing, type checks, optimization, and layout are completed before the program
                    runs. The result is a self-contained binary with predictable performance and explicit control over calling
                    conventions, memory layout, and runtime dependencies.
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
                <section id="core-pipeline" className="win98-section">
                  <h2 className="win98-heading">Compilation Pipeline</h2>
                  {pipelineStages.map((block) => (
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
                <section id="core-artifacts" className="win98-section">
                  <h2 className="win98-heading">Build Artifacts and Linking</h2>
                  {buildArtifacts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-optimizations" className="win98-section">
                  <h2 className="win98-heading">Optimization Levels and Knobs</h2>
                  {optimizationLevels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Build-time tuning is part of performance engineering. Use fast builds for iteration and selective PGO/LTO for
                    critical release paths.
                  </p>
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Complexity Analysis and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
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
