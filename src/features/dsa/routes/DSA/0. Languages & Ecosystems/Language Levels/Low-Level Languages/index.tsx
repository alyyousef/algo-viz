import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Assembly languages codify processor manuals (1950s)',
    detail:
      'Mnemonic opcodes replaced raw binary, letting programmers name registers and memory addresses directly.',
  },
  {
    title: 'C unifies portability and control (1972)',
    detail:
      'C mapped cleanly to hardware while staying portable, becoming the lingua franca of kernels and runtimes.',
  },
  {
    title: 'C++ adds zero-cost abstractions (1980s)',
    detail:
      'Templates, RAII, and inlining enabled higher-level structure without mandatory runtime overhead.',
  },
  {
    title: 'Modern compilers and optimizers (1990s-2000s)',
    detail:
      'LLVM and GCC matured optimization pipelines, linking low-level control with aggressive optimization.',
  },
  {
    title: 'Rust emphasizes safety with control (2010s)',
    detail:
      'Rust introduced ownership and borrowing to prevent memory bugs without a garbage collector.',
  },
  {
    title: 'SIMD and vector intrinsics go mainstream',
    detail:
      'SSE, AVX, and NEON exposed explicit vectorization for media and numerical workloads.',
  },
]

const mentalModels = [
  {
    title: 'Bare metal contract',
    detail:
      'You control layout, lifetime, and ordering. Violations become undefined behavior or security bugs.',
  },
  {
    title: 'Cost is visible',
    detail:
      'Every allocation, branch, and cache miss is measurable; performance is shaped by the memory hierarchy.',
  },
  {
    title: 'Deterministic tools',
    detail:
      'No GC pauses. Predictability comes from explicit ownership, careful synchronization, and manual tuning.',
  },
  {
    title: 'Hardware-first thinking',
    detail:
      'Data structures are chosen for cache lines, alignment, and vector width, not just big-O.',
  },
  {
    title: 'Sharp edges, sharp tools',
    detail:
      'You gain power and risk. Tooling and discipline are essential to stay safe.',
  },
]

const coreMechanics = [
  {
    heading: 'Compilation pipeline',
    bullets: [
      'Source to AST, then lowered to IR (LLVM IR, GCC GIMPLE) and machine code.',
      'Linkers resolve symbols, layout segments, and decide static vs dynamic linking.',
      'Debug info (DWARF, PDB) maps assembly back to source for profiling and debugging.',
    ],
  },
  {
    heading: 'Memory and layout control',
    bullets: [
      'Stack vs heap decisions are explicit; custom allocators and arenas manage lifetimes.',
      'Alignment and padding affect cache lines, SIMD safety, and ABI correctness.',
      'Pointer arithmetic and aliasing rules guide optimization and safety.',
    ],
  },
  {
    heading: 'Concurrency and ordering',
    bullets: [
      'Threads share memory; synchronization uses mutexes, atomics, and fences.',
      'Memory models define ordering guarantees; misuse leads to subtle data races.',
      'Lock-free structures rely on CAS/LL-SC with careful progress guarantees.',
    ],
  },
]

const hardwareModel = [
  {
    title: 'Registers and pipelines',
    detail:
      'Modern CPUs pipeline instructions; register pressure can spill to memory and slow hot loops.',
  },
  {
    title: 'Cache hierarchy',
    detail:
      'L1/L2/L3 caches reward spatial locality. Layout and access patterns dominate throughput.',
  },
  {
    title: 'Branch prediction',
    detail:
      'Mispredicts cost dozens of cycles. Data-oriented layouts and branchless code help.',
  },
  {
    title: 'SIMD width',
    detail:
      'Vector units process multiple elements per instruction. Align data to vector width for best results.',
  },
  {
    title: 'NUMA effects',
    detail:
      'On multi-socket machines, memory locality affects latency; pin threads or allocate locally.',
  },
  {
    title: 'I/O and syscalls',
    detail:
      'Crossing into the kernel is expensive; batch syscalls and reduce context switches.',
  },
]

const toolingAndSafety = [
  {
    title: 'Sanitizers',
    detail:
      'ASan, UBSan, and TSan catch memory and concurrency bugs early, often with minimal effort.',
  },
  {
    title: 'Profilers',
    detail:
      'perf, VTune, Instruments, and flamegraphs reveal cache misses and hot functions.',
  },
  {
    title: 'Static analysis',
    detail:
      'Clang-Tidy, Coverity, and Rust Clippy catch API misuse and dangerous patterns.',
  },
  {
    title: 'Fuzzing',
    detail:
      'libFuzzer and AFL discover edge cases that manual testing misses.',
  },
  {
    title: 'Memory checking',
    detail:
      'Valgrind and AddressSanitizer highlight leaks, use-after-free, and double frees.',
  },
  {
    title: 'Build flags',
    detail:
      'Optimization levels, LTO, and CPU targets change performance drastically; measure with the real build.',
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics stay, constants shrink',
    detail:
      'Low-level code improves constant factors via cache locality, SIMD, and reduced allocations.',
  },
  {
    title: 'Deterministic latency',
    detail:
      'No GC pauses, but lock contention and page faults can still cause spikes.',
  },
  {
    title: 'Layout-driven speed',
    detail:
      'SoA layouts often outperform AoS when vectorizing or scanning large arrays.',
  },
  {
    title: 'Memory bandwidth limits',
    detail:
      'For large datasets, bandwidth caps performance regardless of instruction count.',
  },
  {
    title: 'Binary size vs instruction cache',
    detail:
      'Over-inlining can bloat binaries and hurt i-cache performance.',
  },
]

const applications = [
  {
    context: 'Operating systems and kernels',
    detail:
      'Schedulers, drivers, and memory managers require deterministic control and minimal overhead.',
  },
  {
    context: 'Embedded and firmware',
    detail:
      'Resource-constrained devices demand precise memory use and predictable interrupts.',
  },
  {
    context: 'Game engines and graphics',
    detail:
      'Real-time frame budgets depend on data-oriented design, SIMD math, and memory arenas.',
  },
  {
    context: 'Networking and storage',
    detail:
      'Low latency packet processing and disk I/O benefit from tight control and zero-copy buffers.',
  },
  {
    context: 'Cryptography and compression',
    detail:
      'Constant-time operations and bit-level control protect security and maximize throughput.',
  },
  {
    context: 'High-performance computing',
    detail:
      'Vectorization, tiling, and MPI/OpenMP drive throughput at scale.',
  },
]

const comparisonTable = [
  {
    dimension: 'Memory management',
    low: 'Manual allocation, explicit lifetime, custom allocators.',
    high: 'Garbage collection or managed runtimes handle lifetimes.',
  },
  {
    dimension: 'Performance profile',
    low: 'Low constant factors; predictable latency when designed well.',
    high: 'Higher constant factors; latency can include GC pauses.',
  },
  {
    dimension: 'Safety defaults',
    low: 'Undefined behavior possible; safety depends on discipline and tooling.',
    high: 'Bounds checks, runtime errors, and safe defaults reduce crash risk.',
  },
  {
    dimension: 'Portability',
    low: 'Requires platform-specific build targets and ABI awareness.',
    high: 'VMs and runtimes offer broad portability across OS/CPU.',
  },
  {
    dimension: 'Tooling & ecosystem',
    low: 'Strong debuggers/profilers; fewer batteries-included libraries.',
    high: 'Huge libraries and frameworks accelerate product delivery.',
  },
  {
    dimension: 'Concurrency model',
    low: 'Threads, atomics, fences; explicit synchronization.',
    high: 'Richer concurrency primitives; often abstracted by runtime.',
  },
  {
    dimension: 'Typical domains',
    low: 'Kernels, drivers, embedded, real-time, HPC.',
    high: 'Web apps, data analysis, automation, prototyping.',
  },
]

const abiNotes = [
  {
    title: 'Calling conventions',
    detail:
      'ABIs define how arguments are passed (registers vs stack), who saves registers, and how return values are handled.',
  },
  {
    title: 'Data layout and alignment',
    detail:
      'Struct padding and alignment rules ensure fields are placed at offsets the CPU can load efficiently.',
  },
  {
    title: 'Name mangling',
    detail:
      'C++ encodes type information in symbol names; extern "C" disables mangling for FFI.',
  },
  {
    title: 'Endianness and word size',
    detail:
      'The ABI fixes assumptions about byte order and pointer size. Mixing 32-bit and 64-bit builds breaks compatibility.',
  },
  {
    title: 'Stack frames and unwinding',
    detail:
      'ABIs define stack frame layout and metadata for exception handling and debugging.',
  },
  {
    title: 'Binary compatibility',
    detail:
      'Changing struct layouts or function signatures can silently break dynamic linking. Versioning matters.',
  },
]

const abiExamples = [
  {
    title: 'C++ to C FFI',
    code: `// C++ function exported with C linkage
extern "C" int add(int a, int b) {
  return a + b;
}`,
    explanation:
      'extern "C" uses the C ABI so other languages can link without C++ name mangling.',
  },
  {
    title: 'Struct layout mismatch',
    code: `// C side
struct Point { int x; int y; };

// C++ side (different packing)
struct PointPacked { char tag; int x; int y; };`,
    explanation:
      'Extra fields or different packing changes offsets. Both sides must agree on layout.',
  },
]

const examples = [
  {
    title: 'Cache-friendly traversal (C++)',
    code: `double sum_rows(const std::vector<std::vector<double>>& m) {
  double s = 0.0;
  for (const auto& row : m) {
    for (double v : row) s += v;
  }
  return s;
}`,
    explanation:
      'Row-major storage keeps memory sequential, minimizing cache misses.',
  },
  {
    title: 'Manual memory with RAII (C++)',
    code: `struct Buffer {
  size_t n;
  double* data;
  Buffer(size_t n) : n(n), data(static_cast<double*>(malloc(n * sizeof(double)))) {}
  ~Buffer() { free(data); }
};`,
    explanation:
      'Lifetime is explicit; RAII guarantees cleanup without a garbage collector.',
  },
  {
    title: 'Safe systems control (Rust)',
    code: `fn increment_all(xs: &mut [i32]) {
  for v in xs.iter_mut() {
    *v += 1;
  }
}`,
    explanation:
      'Borrowing prevents aliasing and enables compiler optimizations.',
  },
  {
    title: 'Branchless clamp (C)',
    code: `int clamp(int x, int lo, int hi) {
  if (x < lo) return lo;
  if (x > hi) return hi;
  return x;
}`,
    explanation:
      'Even simple conditionals matter in hot loops; measure branch behavior.',
  },
]

const pitfalls = [
  'Undefined behavior: out-of-bounds access and use-after-free corrupt state silently.',
  'Aliasing surprises: overlapping pointers can block vectorization.',
  'Alignment mistakes: misaligned loads can crash on some architectures.',
  'Concurrency hazards: missing fences or misuse of atomics leads to heisenbugs.',
  'Security risks: unchecked inputs can yield buffer overflows and timing leaks.',
  'Premature micro-optimizations that reduce clarity without measurable wins.',
]

const decisionPoints = [
  'Need deterministic latency or tight control of memory layout: choose low-level languages.',
  'Operating close to hardware (kernels, drivers, firmware) requires explicit control.',
  'Use low-level modules for hotspots and keep orchestration in higher-level code.',
  'If memory safety is critical and expertise is limited, prefer Rust or safe subsets.',
  'Benchmark with realistic workloads before committing to low-level rewrites.',
]

const advancedInsights = [
  {
    title: 'Memory ordering and atomics',
    detail:
      'Acquire-release vs relaxed atomics define visibility guarantees; misuse can pass tests and fail under load.',
  },
  {
    title: 'Zero-cost abstractions',
    detail:
      'Inlining and templates can express high-level patterns that compile away, but overuse can bloat binaries.',
  },
  {
    title: 'Data-oriented design',
    detail:
      'Struct-of-arrays layouts and fixed-size pools reduce cache misses and improve vectorization.',
  },
  {
    title: 'Link-time optimization',
    detail:
      'LTO enables cross-module inlining and dead-code elimination, often with large speed gains.',
  },
  {
    title: 'Constant-time discipline',
    detail:
      'Crypto code must avoid data-dependent branches and memory access to prevent timing leaks.',
  },
  {
    title: 'Platform-specific tuning',
    detail:
      'Targeting CPU features (AVX2, AVX-512, NEON) can yield huge gains but reduces portability.',
  },
]

const takeaways = [
  'Low-level languages expose hardware for deterministic performance and tight memory control.',
  'The main risks are undefined behavior and concurrency bugs; tooling is not optional.',
  'Cache locality and data layout often matter more than algorithmic tweaks once big-O is fixed.',
  'Blend approaches: keep control where it matters and avoid rewriting everything.',
]

const bareMetal = mentalModels[0] ?? {
  title: 'Bare metal contract',
  detail:
    'You control layout, lifetime, and ordering. Violations become undefined behavior or security bugs.',
}
const visibleCost = mentalModels[1] ?? {
  title: 'Cost is visible',
  detail:
    'Every allocation, branch, and cache miss is measurable; performance is shaped by the memory hierarchy.',
}
const deterministicTools = mentalModels[2] ?? {
  title: 'Deterministic tools',
  detail:
    'No GC pauses. Predictability comes from explicit ownership, careful synchronization, and manual tuning.',
}
const hardwareFirst = mentalModels[3] ?? {
  title: 'Hardware-first thinking',
  detail:
    'Data structures are chosen for cache lines, alignment, and vector width, not just big-O.',
}
const sharpTools = mentalModels[4] ?? {
  title: 'Sharp edges, sharp tools',
  detail:
    'You gain power and risk. Tooling and discipline are essential to stay safe.',
}
const compilePipeline = coreMechanics[0] ?? {
  heading: 'Compilation pipeline',
  bullets: [],
}
const memoryLayout = coreMechanics[1] ?? {
  heading: 'Memory and layout control',
  bullets: [],
}
const ordering = coreMechanics[2] ?? {
  heading: 'Concurrency and ordering',
  bullets: [],
}

const glossaryTerms = [
  {
    term: bareMetal.title,
    definition: bareMetal.detail,
  },
  {
    term: visibleCost.title,
    definition: visibleCost.detail,
  },
  {
    term: deterministicTools.title,
    definition: deterministicTools.detail,
  },
  {
    term: hardwareFirst.title,
    definition: hardwareFirst.detail,
  },
  {
    term: sharpTools.title,
    definition: sharpTools.detail,
  },
  {
    term: compilePipeline.heading,
    definition: 'Source-to-IR lowering, optimization passes, and final machine code emission.',
  },
  {
    term: memoryLayout.heading,
    definition: 'Explicit decisions about stack/heap, alignment, padding, and allocator strategy.',
  },
  {
    term: ordering.heading,
    definition: 'Synchronization primitives that define visibility and ordering across threads.',
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

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 6px 0 12px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #c0c0c0;
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}

.win98-table th {
  background: #e6e6e6;
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
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-hardware', label: 'Hardware Cost Model' },
    { id: 'core-performance', label: 'Performance Intuition' },
    { id: 'core-tooling', label: 'Tooling and Safety Net' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-compare', label: 'Low vs High Comparison' },
    { id: 'core-abi', label: 'ABI Deep Dive' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-abi', label: 'ABI Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function LowLevelLanguagesPage(): JSX.Element {
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
    document.title = `Low-Level Languages (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Low-Level Languages',
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
          <span className="win98-title-text">Low-Level Languages</span>
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
            <h1 className="win98-doc-title">Low-Level Languages</h1>
            <p>
              Low-level languages expose hardware details so you can tune cache behavior, memory layout, and concurrency. They
              demand precision and discipline, but they deliver deterministic performance when done right.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    These languages prioritize control over convenience. You manage allocation, lifetime, and layout explicitly,
                    which enables tight latency budgets and predictable binaries. The cost is complexity and the risk of undefined
                    behavior.
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
                <section id="core-how" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {coreMechanics.map((block) => (
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
                <section id="core-hardware" className="win98-section">
                  <h2 className="win98-heading">Hardware Cost Model</h2>
                  {hardwareModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Intuition</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Once algorithms are chosen, most gains come from layout, vectorization, and minimizing synchronization. Measure
                    first, optimize second.
                  </p>
                </section>
                <section id="core-tooling" className="win98-section">
                  <h2 className="win98-heading">Tooling and Safety Net</h2>
                  {toolingAndSafety.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
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
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Low-Level vs High-Level Comparison</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Dimension</th>
                        <th>Low-level</th>
                        <th>High-level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonTable.map((row) => (
                        <tr key={row.dimension}>
                          <td>{row.dimension}</td>
                          <td>{row.low}</td>
                          <td>{row.high}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-abi" className="win98-section">
                  <h2 className="win98-heading">ABI Deep Dive</h2>
                  {abiNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
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
              <>
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
                <section id="ex-abi" className="win98-section">
                  <h2 className="win98-heading">ABI Examples</h2>
                  {abiExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <div className="win98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
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
