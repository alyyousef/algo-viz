import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function LowLevelLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Low-Level Languages</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Direct control over memory, layout, and performance</div>
              <p className="win95-text">
                Low-level languages expose hardware details so you can tune cache behavior, memory layout, and concurrency.
                They demand precision and discipline, but they deliver deterministic performance when done right.
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
                These languages prioritize control over convenience. You manage allocation, lifetime, and layout explicitly, which
                enables tight latency budgets and predictable binaries. The cost is complexity and the risk of undefined behavior.
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
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {coreMechanics.map((block) => (
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
            <legend>Hardware cost model</legend>
            <div className="win95-grid win95-grid-2">
              {hardwareModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Once algorithms are chosen, most gains come from layout, vectorization, and minimizing synchronization. Measure
                first, optimize second.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and safety net</legend>
            <div className="win95-grid win95-grid-2">
              {toolingAndSafety.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Low-level vs high-level comparison</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            <legend>ABI deep dive</legend>
            <div className="win95-grid win95-grid-2">
              {abiNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-stack">
              {abiExamples.map((example) => (
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

