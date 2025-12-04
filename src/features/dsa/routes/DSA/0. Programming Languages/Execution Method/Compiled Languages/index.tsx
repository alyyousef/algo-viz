import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'FORTRAN I shows compiled code can rival assembly (1957)',
    detail:
      'John Backus and team proved an ahead-of-time compiler could optimize high-level math into machine code that matched hand-written assembly for numerical workloads.',
  },
  {
    title: 'C standardizes portable systems compilation (1970s)',
    detail:
      'Dennis Ritchie and the Unix group built C to compile efficiently on multiple architectures, anchoring the model of portable source with target-specific binaries.',
  },
  {
    title: 'Optimizing compilers go mainstream (1980s-1990s)',
    detail:
      'GCC and commercial toolchains added aggressive optimizations like inlining, loop unrolling, and register allocation guided by SSA, making -O2 the default expectation.',
  },
  {
    title: 'Link-time and whole-program optimization',
    detail:
      'LTO enabled optimizations across translation units, shrinking binaries and speeding hot paths by analyzing the entire program rather than single files.',
  },
  {
    title: 'Modern safe systems languages',
    detail:
      'Rust and Go keep ahead-of-time compilation but add safety or concurrency defaults, reinforcing that compiled does not have to mean unsafe or low ergonomics.',
  },
]

const mentalModels = [
  {
    title: 'Blueprint to concrete',
    detail:
      'Source code is a blueprint; the compiler pours concrete into the exact shape of your CPU. Once cast, behavior is fixed unless you rebuild.',
  },
  {
    title: 'Cost visibility',
    detail:
      'Ahead-of-time compilation exposes cost at build time. Binary size, inlining, and layout are inspectable before shipping, making performance budgeting explicit.',
  },
  {
    title: 'Static contracts',
    detail:
      'Types and lifetimes are enforced before execution. Errors are surfaced during compilation rather than at runtime, shifting defect discovery earlier.',
  },
]

const mechanics = [
  {
    heading: 'Front-end parsing and typing',
    bullets: [
      'Lexer and parser build an AST from source. Static analyzers resolve types, scopes, and detect errors before code generation.',
      'Modern compilers produce an intermediate representation (IR) such as SSA form to enable optimizations independent of syntax.',
    ],
  },
  {
    heading: 'Optimization pipelines',
    bullets: [
      'Passes perform constant folding, dead code elimination, inlining, loop unrolling, and vectorization when safe.',
      'Profile-guided optimization (PGO) feeds runtime profiles back into the compiler to guide branch layout and inlining decisions.',
      'Link-time optimization (LTO) merges IR across modules to remove redundant code and inline across translation units.',
    ],
  },
  {
    heading: 'Code generation and linking',
    bullets: [
      'Back-ends map IR to target instructions, manage registers, and schedule instructions for pipelines and caches.',
      'Assemblers encode instructions; linkers resolve symbols, relocate addresses, and lay out segments into an executable or shared library.',
      'Build systems orchestrate dependency graphs, incremental rebuilds, and artifact caching.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Runtime speed and deterministic overheads',
    detail:
      'Compiled binaries execute without interpreter dispatch. Overheads come from function calls, cache behavior, and branch prediction rather than dynamic dispatch loops.',
  },
  {
    title: 'Compile time as a resource',
    detail:
      'Heavy optimization and large codebases increase compile time. Build caching, incremental builds, and selective optimization levels balance developer velocity against runtime speed.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Binaries can be small when avoiding dynamic runtimes. Static linking raises size but simplifies deployment; dynamic linking shrinks size but adds versioning complexity.',
  },
]

const applications = [
  {
    context: 'Systems software',
    detail:
      'Kernels, hypervisors, and databases rely on compiled code for predictable performance, fine-grained memory control, and minimal runtime dependencies.',
  },
  {
    context: 'High-performance computing and numerical code',
    detail:
      'C, C++, and Fortran dominate HPC, where vectorization, cache blocking, and predictable layouts are critical for dense linear algebra and simulation.',
  },
  {
    context: 'Tooling and compilers themselves',
    detail:
      'Compilers, linkers, and build tools are compiled to maximize startup speed and handle large code graphs without interpreter overhead.',
  },
  {
    context: 'Game engines and real-time graphics',
    detail:
      'Frame budgets demand deterministic timing. Compiled languages allow explicit control over memory layouts, SIMD, and threading to hit frame targets.',
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
      'Ahead-of-time compilation lets the compiler unroll, vectorize, and schedule loads and multiplies for the target CPU without interpreter dispatch.',
  },
  {
    title: 'Compile-time safety with zero-cost abstractions (Rust)',
    code: `fn sum_pairs(xs: &[(i32, i32)]) -> i32 {
    xs.iter().map(|(a, b)| a + b).sum()
}`,
    explanation:
      'Iterators compile down to simple loops after inlining and monomorphization. Bounds checks are optimized away in release builds when provably safe.',
  },
  {
    title: 'Link-time optimization across modules (C++)',
    code: `// foo.cpp
int add(int a, int b) { return a + b; }

// main.cpp
extern int add(int, int);
int main() { return add(2, 3); }`,
    explanation:
      'With LTO, the compiler can inline add into main across translation units, removing call overhead and enabling further constant folding.',
  },
]

const pitfalls = [
  'Undefined behavior: out-of-bounds access or data races can silently corrupt state; the compiler may optimize assuming such cases never happen.',
  'Optimization surprises: aggressive inlining or vectorization can bloat code size or change cache behavior; measure in context.',
  'Portability gaps: endianness, alignment, and ABI differences require attention when targeting multiple architectures.',
  'Build system drift: mismatched flags or stale objects lead to subtle bugs; reproducible builds and clean rebuilds are essential.',
  'Slow edit-compile-run loops: without incremental builds or caching, heavy optimization slows developers and can hide regressions behind long feedback cycles.',
]

const decisionPoints = [
  'Need maximum predictable performance with minimal runtime overhead: prefer compiled languages.',
  'Deploying in environments with restricted runtimes or tight binary size: ahead-of-time binaries simplify distribution.',
  'Interfacing tightly with hardware or system calls: compiled code offers direct access and clear calling conventions.',
  'If iteration speed dominates and latency is relaxed: consider higher-level or hybrid approaches; otherwise invest in build speed tooling.',
]

const advancedInsights = [
  {
    title: 'Profile-guided optimization',
    detail:
      'Collect real workload profiles, then recompile so the optimizer can reorder branches, inline hot paths, and tune code layout. Gains often exceed manual micro-optimizations.',
  },
  {
    title: 'Cache-aware code generation',
    detail:
      'Compilers can tile loops and align data, but they need hints: restrict qualifiers, explicit vector types, and data layout choices affect auto-vectorization success.',
  },
  {
    title: 'Static analysis and sanitizers',
    detail:
      'AddressSanitizer, ThreadSanitizer, and static analyzers surface memory and concurrency bugs early. They complement the stronger guarantees of languages like Rust.',
  },
  {
    title: 'Deterministic builds',
    detail:
      'Pinned toolchains, hermetic builds, and content-addressed caches reduce drift across environments and make performance reproducibility possible.',
  },
]

const sources = [
  'The Dragon Book (Aho, Lam, Sethi, Ullman) for compiler theory and optimization pipelines.',
  'Compilers: Principles, Techniques, and Tools for SSA, register allocation, and code generation foundations.',
  'GeeksforGeeks: differences between compiled and interpreted languages for quick contrasts.',
  'Rust Book and C++ references for zero-cost abstractions and monomorphization.',
  'Intel and ARM optimization manuals for cache-aware and vectorization strategies.',
]

const takeaways = [
  'Compiled languages trade slower build times for fast, predictable runtime performance and small deployment footprints.',
  'Static typing and ahead-of-time analysis move many errors to compile time, but undefined behavior remains a core risk in unsafe subsets.',
  'Optimization is a feedback loop: measure, profile, and let the compiler help through PGO and LTO before hand-tuning.',
  'Choose compiled when you need control over layout, latency, and runtime dependencies; pair with faster-build layers for orchestration when iteration speed matters.',
]

export default function CompiledLanguagesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Compiled Languages"
      subtitle="Ahead-of-time translation to machine code"
      intro="Compiled languages translate source into machine code before execution. This front-loads cost into the build, yielding binaries that start fast, minimize runtime overhead, and expose hardware-friendly control. The discipline shifts toward careful types, layout, and build engineering."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Compiled languages focus on predictable performance, direct hardware access, and small runtime footprints. Work happens up
          front during builds, giving you visibility into binary size, calling conventions, and layout long before deployment.
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
          Choose optimization levels by need: -O0 for fast iteration, -O2 for balanced speed and size, -O3 or PGO for hot paths.
          Measure the tail latencies and cache misses that matter to your workload rather than relying on intuition alone.
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
