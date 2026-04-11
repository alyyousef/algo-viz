import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'SSE, AVX, and NEON exposed explicit vectorization for media and numerical workloads.',
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
    detail: 'You gain power and risk. Tooling and discipline are essential to stay safe.',
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
    detail: 'Mispredicts cost dozens of cycles. Data-oriented layouts and branchless code help.',
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
    detail: 'Crossing into the kernel is expensive; batch syscalls and reduce context switches.',
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
    detail: 'perf, VTune, Instruments, and flamegraphs reveal cache misses and hot functions.',
  },
  {
    title: 'Static analysis',
    detail: 'Clang-Tidy, Coverity, and Rust Clippy catch API misuse and dangerous patterns.',
  },
  {
    title: 'Fuzzing',
    detail: 'libFuzzer and AFL discover edge cases that manual testing misses.',
  },
  {
    title: 'Memory checking',
    detail: 'Valgrind and AddressSanitizer highlight leaks, use-after-free, and double frees.',
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
    detail: 'No GC pauses, but lock contention and page faults can still cause spikes.',
  },
  {
    title: 'Layout-driven speed',
    detail: 'SoA layouts often outperform AoS when vectorizing or scanning large arrays.',
  },
  {
    title: 'Memory bandwidth limits',
    detail: 'For large datasets, bandwidth caps performance regardless of instruction count.',
  },
  {
    title: 'Binary size vs instruction cache',
    detail: 'Over-inlining can bloat binaries and hurt i-cache performance.',
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
    detail: 'Resource-constrained devices demand precise memory use and predictable interrupts.',
  },
  {
    context: 'Game engines and graphics',
    detail: 'Real-time frame budgets depend on data-oriented design, SIMD math, and memory arenas.',
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
    detail: 'Vectorization, tiling, and MPI/OpenMP drive throughput at scale.',
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
    detail: 'C++ encodes type information in symbol names; extern "C" disables mangling for FFI.',
  },
  {
    title: 'Endianness and word size',
    detail:
      'The ABI fixes assumptions about byte order and pointer size. Mixing 32-bit and 64-bit builds breaks compatibility.',
  },
  {
    title: 'Stack frames and unwinding',
    detail: 'ABIs define stack frame layout and metadata for exception handling and debugging.',
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
    explanation: 'extern "C" uses the C ABI so other languages can link without C++ name mangling.',
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
    explanation: 'Row-major storage keeps memory sequential, minimizing cache misses.',
  },
  {
    title: 'Manual memory with RAII (C++)',
    code: `struct Buffer {
  size_t n;
  double* data;
  Buffer(size_t n) : n(n), data(static_cast<double*>(malloc(n * sizeof(double)))) {}
  ~Buffer() { free(data); }
};`,
    explanation: 'Lifetime is explicit; RAII guarantees cleanup without a garbage collector.',
  },
  {
    title: 'Safe systems control (Rust)',
    code: `fn increment_all(xs: &mut [i32]) {
  for v in xs.iter_mut() {
    *v += 1;
  }
}`,
    explanation: 'Borrowing prevents aliasing and enables compiler optimizations.',
  },
  {
    title: 'Branchless clamp (C)',
    code: `int clamp(int x, int lo, int hi) {
  if (x < lo) return lo;
  if (x > hi) return hi;
  return x;
}`,
    explanation: 'Even simple conditionals matter in hot loops; measure branch behavior.',
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
  detail: 'You gain power and risk. Tooling and discipline are essential to stay safe.',
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
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Low-Level Languages',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Low-Level Languages"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Low-Level Languages</h1>
      <p>
        Low-level languages expose hardware details so you can tune cache behavior, memory layout,
        and concurrency. They demand precision and discipline, but they deliver deterministic
        performance when done right.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              These languages prioritize control over convenience. You manage allocation, lifetime,
              and layout explicitly, which enables tight latency budgets and predictable binaries.
              The cost is complexity and the risk of undefined behavior.
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
          <section id="core-how" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {coreMechanics.map((block) => (
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
          <section id="core-hardware" className="bin98-section">
            <h2 className="bin98-heading">Hardware Cost Model</h2>
            {hardwareModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Intuition</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Once algorithms are chosen, most gains come from layout, vectorization, and minimizing
              synchronization. Measure first, optimize second.
            </p>
          </section>
          <section id="core-tooling" className="bin98-section">
            <h2 className="bin98-heading">Tooling and Safety Net</h2>
            {toolingAndSafety.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
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
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Low-Level vs High-Level Comparison</h2>
            <table className="bin98-table">
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
          <section id="core-abi" className="bin98-section">
            <h2 className="bin98-heading">ABI Deep Dive</h2>
            {abiNotes.map((item) => (
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
        <>
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
          <section id="ex-abi" className="bin98-section">
            <h2 className="bin98-heading">ABI Examples</h2>
            {abiExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
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
