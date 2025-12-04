import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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

export default function LowLevelLanguagesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Low-Level Languages"
      subtitle="Direct hardware control and memory visibility"
      intro="Low-level languages sit close to the metal: you choose layouts, lifetimes, and synchronization primitives instead of relying on runtimes and collectors. The reward is deterministic performance and small binaries; the cost is that safety and correctness rely on explicit discipline and tooling."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          These languages prioritize control over convenience. They expose registers, memory, and calling conventions so you can
          tune cache usage, branch behavior, and binary size. They demand an accurate mental model of the CPU, memory hierarchy,
          and operating system to avoid undefined behavior.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Once algorithms are chosen, gains come from memory locality, vectorization, and minimizing synchronization. Measure
          with perf, flamegraphs, and cache-aware benchmarks before rewriting interfaces.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Further reading and sources">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
