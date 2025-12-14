import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Assembly languages codify processor manuals (1950s)',
    detail:
      'Mnemonic opcodes replaced raw binary, letting programmers name registers and memory addresses directly while matching the hardware one-to-one.',
  },
  {
    title: 'C unifies portability and control (1972)',
    detail:
      'Dennis Ritchie built C for Unix, offering pointer arithmetic and manual memory while compiling efficiently on many architectures. It became the lingua franca for kernels and runtimes.',
  },
  {
    title: 'C++ adds zero-cost abstractions (1980s)',
    detail:
      'Bjarne Stroustrup aimed to add classes and strong type support without paying runtime overhead, shaping the idea of zero-cost abstractions that compile down to efficient code.',
  },
  {
    title: 'Rust emphasizes safety with control (2010s)',
    detail:
      'Rust kept deterministic performance but introduced a borrow checker to prevent data races and many memory errors at compile time, pushing system code toward safer defaults.',
  },
  {
    title: 'SIMD and vector intrinsics go mainstream',
    detail:
      'Instruction set extensions (SSE, AVX, NEON) encouraged explicit vectorization. Intrinsics exposed these capabilities to low-level code for tight loops in media and numerical workloads.',
  },
]

const mentalModels = [
  {
    title: 'Bare metal contract',
    detail:
      'Low-level code is a contract with the CPU and memory hierarchy. You control layout, lifetime, and ordering, which yields speed when honored and chaos when broken.',
  },
  {
    title: 'Cost is visible',
    detail:
      'Every abstraction is measurable: an extra branch mispredict, a cache line split, an unexpected allocation. Thinking in cycles per cache line helps decisions.',
  },
  {
    title: 'Deterministic tools',
    detail:
      'There is little runtime safety net. Determinism comes from explicit ownership, RAII patterns, and disciplined concurrency rather than garbage collectors or dynamic checks.',
  },
]

const mechanics = [
  {
    heading: 'Compilation pipeline',
    bullets: [
      'Parsing to an AST, lowering to IR (LLVM IR, GCC GIMPLE), then machine-specific codegen. Optimizations like inlining and vectorization aim for predictable layout and branch patterns.',
      'Linkers resolve symbols and lay out segments (.text, .data, .bss). Static linking yields self-contained binaries; dynamic linking trades size for flexibility.',
      'Debug info (DWARF, PDB) maps machine code back to source for profilers and debuggers.',
    ],
  },
  {
    heading: 'Memory and layout control',
    bullets: [
      'Stack vs heap decisions are explicit. Placement new, custom allocators, and arenas control fragmentation and lifetime.',
      'Alignment and padding affect cache lines and SIMD safety; struct packing can reduce size but may hurt performance.',
      'Pointer arithmetic exposes aliasing risks; qualifiers like restrict and compiler hints guide optimization.',
    ],
  },
  {
    heading: 'Concurrency and ordering',
    bullets: [
      'Threads share memory directly; synchronization uses mutexes, atomics, and fences.',
      'Memory models define ordering guarantees. C++11 atomics and Rust provide acquire-release and sequentially consistent primitives.',
      'Lock-free structures use compare-and-swap or load-linked/store-conditional; correctness hinges on careful progress guarantees.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics match algorithms; constants dominate reality',
    detail:
      'Low-level code shines by shrinking constant factors: fewer cache misses, vectorized loops, and reduced allocations. Big-O is unchanged, but practical throughput improves.',
  },
  {
    title: 'Cache and branch behavior',
    detail:
      'Traversal patterns that respect spatial and temporal locality often deliver multi-x speedups. Branch mispredicts can cost dozens of cycles; predictable branches or SIMD masks help.',
  },
  {
    title: 'Deterministic latency',
    detail:
      'Without garbage collection pauses, latency distributions narrow. The trade is manual lifetime management and potential stalls from locks or page faults.',
  },
]

const applications = [
  {
    context: 'Operating systems and kernels',
    detail:
      'Schedulers, virtual memory, and drivers depend on deterministic memory and hardware access. C and Rust dominate here for control and predictable footprints.',
  },
  {
    context: 'Game engines and real-time graphics',
    detail:
      'Tight loops over spatial data benefit from cache-aware ECS architectures, SIMD math, and explicit memory arenas to keep frame times stable.',
  },
  {
    context: 'Embedded and firmware',
    detail:
      'Resource-constrained devices need precise memory use and timing. Bare-metal C, Rust, and sometimes assembly ensure predictable interrupts and power budgets.',
  },
  {
    context: 'Cryptography and compression',
    detail:
      'Implementations rely on constant-time operations, bit-level control, and vector intrinsics to maximize throughput without leaking side-channel information.',
  },
  {
    context: 'High-performance computing',
    detail:
      'Numerical kernels use explicit vectorization, tiling, and cache blocking. MPI and OpenMP integrate with C, C++, and Fortran for parallel scaling.',
  },
]

const examples = [
  {
    title: 'Cache-friendly traversal (C++)',
    code: `double sum_rows(const std::vector<std::vector<double>>& m) {
    double s = 0.0;
    for (const auto& row : m) {
        // contiguous inner vectors keep access sequential
        for (double v : row) s += v;
    }
    return s;
}`,
    explanation:
      'Row-major, contiguous storage keeps accesses within cache lines, reducing misses compared to scattered pointers. The code is explicit about iteration order and layout expectations.',
  },
  {
    title: 'Manual memory and RAII (C++)',
    code: `struct Buffer {
    size_t n;
    double* data;
    Buffer(size_t n) : n(n), data(static_cast<double*>(malloc(n * sizeof(double)))) {}
    ~Buffer() { free(data); }
};`,
    explanation:
      'Allocation and deallocation are explicit, and RAII ensures cleanup even on exceptions. There is no hidden collector, so lifetime discipline is required.',
  },
  {
    title: 'Safe systems control (Rust)',
    code: `fn increment_all(xs: &mut [i32]) {
    for v in xs.iter_mut() {
        *v += 1;
    }
}`,
    explanation:
      'Rust borrows give mutable access without aliasing, enabling bounds checks to be optimized away in release builds. You retain predictable performance with compile-time safety.',
  },
]

const pitfalls = [
  'Undefined behavior: out-of-bounds access, use-after-free, and data races can silently corrupt state.',
  'Aliasing surprises: overlapping pointers can block vectorization unless the compiler can prove independence.',
  'Endianness and alignment: incorrect assumptions break portability or trigger traps on stricter architectures.',
  'Concurrency hazards: missing fences or misuse of atomics leads to heisenbugs that resist reproduction.',
  'Security risks: unchecked inputs can yield buffer overflows, format string exploits, or timing leaks.',
]

const decisionPoints = [
  'Need deterministic latency or tight control of memory layout: choose low-level languages and measure cache and branch behavior.',
  'Operating close to hardware (kernels, drivers, firmware): require explicit control and predictable binaries.',
  'Performance hotspots inside a larger system: rewrite critical paths in C, C++, or Rust while keeping higher-level orchestration elsewhere.',
  'Team experience and safety posture: if memory safety is critical and expertise is limited, consider Rust or stricter subsets before raw C.',
]

const advancedInsights = [
  {
    title: 'Memory ordering and atomics',
    detail:
      'Acquire-release and relaxed atomics give fine-grained ordering control. Misusing them can pass tests and still fail under load. Tools like ThreadSanitizer and Loom help validate behavior.',
  },
  {
    title: 'SIMD and data layout',
    detail:
      'Struct-of-arrays often vectorizes better than array-of-structs. Aligning data to 32 or 64 bytes can avoid penalties and enable wider loads and stores.',
  },
  {
    title: 'Zero-cost abstractions',
    detail:
      'Templates, constexpr, and inlining can express high-level patterns that disappear at compile time. The cost model must remain clear; poor inlining can still bloat code or hurt cache.',
  },
  {
    title: 'Tooling for correctness',
    detail:
      'Sanitizers (ASan, UBSan, TSan), valgrind, perf, and flamegraphs are essential. They map machine-level faults back to source while preserving the mental model of the hardware.',
  },
]

const sources = [
  'The C Programming Language (Kernighan and Ritchie) for idioms and portability rules.',
  'C++ references: Stroustrup and cppreference for zero-cost abstraction patterns and memory model.',
  'Rustonomicon and Rust Book for safe systems patterns and ownership semantics.',
  'Intel and ARM architecture manuals for cache, SIMD, and memory ordering specifics.',
  'GeeksforGeeks: differences between high-level and low-level languages for quick contrasts.',
]

const takeaways = [
  'Low-level languages expose hardware directly, enabling deterministic performance and tight memory control.',
  'Safety nets are thin: undefined behavior and concurrency errors are the main failure modes; tooling and discipline are mandatory.',
  'Cache behavior, layout, and branch predictability often matter more than big-O once you pick a low-level tool.',
  'Blend approaches: keep orchestration in higher-level code while isolating critical loops and device access in low-level modules.',
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

export default function LowLevelLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">Low-Level Languages</span>
          <button type="button" className="win95-close" aria-label="Close">
            X
          </button>
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
                These languages prioritize control over convenience. They expose registers, memory, and calling conventions so
                you can tune cache usage, branch behavior, and binary size. They demand an accurate mental model of the CPU,
                memory hierarchy, and operating system to avoid undefined behavior.
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
              Once algorithms are chosen, gains come from memory locality, vectorization, and minimizing synchronization.
              Measure with perf, flamegraphs, and cache-aware benchmarks before rewriting interfaces.
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
