import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'FORTRAN proves compilers can rival hand assembly (1957)',
    detail:
      'Backus and the IBM team shipped FORTRAN I, showing that higher-level notation could generate efficient machine code. Developer productivity jumped without catastrophic performance loss.',
  },
  {
    title: 'ALGOL and structured programming (1960s)',
    detail:
      'ALGOL 60 introduced block structure and clear scoping, seeding ideas for modern syntax, recursion, and structured control that still anchor C, JavaScript, and Go.',
  },
  {
    title: 'Smalltalk and the birth of interactive OOP (1970s)',
    detail:
      'Alan Kay and the Xerox PARC group used Smalltalk to explore objects, message passing, and live environments, influencing GUI tooling and dynamic runtimes.',
  },
  {
    title: 'Python and Java democratize batteries-included ecosystems (1990s)',
    detail:
      'Guido van Rossum emphasized readability and a rich standard library; Java popularized the JVM and write-once-run-anywhere portability for servers and desktops.',
  },
  {
    title: 'JavaScript everywhere and JIT acceleration (2000s-2010s)',
    detail:
      'V8 and modern JITs turned a browser scripting language into a performant general-purpose tool, enabling Node.js, npm, and ubiquitous web application stacks.',
  },
]

const mentalModels = [
  {
    title: 'Abstraction ladder',
    detail:
      'High-level languages climb a ladder: you trade direct hardware control for expressive constructs. The ladder is safe when lower rungs (runtime, libraries, OS) remain visible enough to diagnose cost.',
  },
  {
    title: 'Productivity budget',
    detail:
      'Think of performance, correctness, and delivery speed as a budget. High-level constructs spend a few CPU cycles to buy clearer intent, safer defaults, and faster iteration.',
  },
  {
    title: 'Leaky shields',
    detail:
      'Abstractions shield you from registers and layout, but leaks appear at interfaces: FFI boundaries, data copies, garbage collection pauses, and implicit allocations.',
  },
]

const howItWorks = [
  {
    heading: 'Compilation and interpretation',
    bullets: [
      'Source is lowered to bytecode or an AST; a VM or interpreter executes it stepwise. Examples: CPython bytecode, Ruby YARV, Lua VM.',
      'Ahead-of-time (AOT) compilers emit native code (Rust, Go) while retaining high-level syntax and safety checks.',
      'Hybrid paths JIT hot code paths at runtime to recover speed (JavaScript V8, Java HotSpot, PyPy).',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collectors reclaim unreachable memory; strategies differ (mark-sweep, generational, concurrent).',
      'Dynamic dispatch, reflection, and metaprogramming provide late binding and flexible APIs at the cost of predictability.',
      'Standard libraries offer batteries: file IO, networking, containers, concurrency primitives, cryptography, and testing frameworks.',
    ],
  },
  {
    heading: 'Portability layers',
    bullets: [
      'Virtual machines abstract hardware quirks so the same bytecode runs on Windows, macOS, Linux, or mobile.',
      'Foreign function interfaces (FFI) bridge to C or system calls when performance or OS access is needed.',
      'Package managers (pip, npm, Maven) distribute code and manage dependency graphs, enabling ecosystem-scale reuse.',
    ],
  },
]

const complexity = [
  {
    title: 'Asymptotic neutrality, constant-factor costs',
    detail:
      'Algorithms keep their big-O, but high-level runtimes add constant factors: bounds checks, dynamic dispatch, and GC barriers. For CPU-bound hot loops, those factors are visible; for IO-bound services, they are often dwarfed by network latency.',
  },
  {
    title: 'Garbage collection and pause dynamics',
    detail:
      'Throughput collectors maximize overall speed but may introduce pauses; concurrent or incremental collectors trade peak throughput for latency. Tuning heap sizes and generations is a practical skill.',
  },
  {
    title: 'Developer time vs machine time',
    detail:
      'Hours saved in implementation and defect reduction often outweigh milliseconds of runtime in products that evolve quickly. For extreme throughput (trading, kernels), low-level control reclaims constants at the cost of slower iteration.',
  },
]

const applications = [
  {
    context: 'Web backends',
    detail:
      'Frameworks like Django, Rails, and Express turn routing, auth, and templating into configuration. Teams ship features quickly while relying on native extensions or proxies for hotspots.',
  },
  {
    context: 'Data science and machine learning',
    detail:
      'Python wraps high-performance kernels (BLAS, cuDNN) with NumPy and PyTorch, letting scientists express math naturally while libraries handle vectorized C and CUDA code.',
  },
  {
    context: 'Automation and scripting',
    detail:
      'Shell replacements and task runners (Python scripts, Node CLIs) orchestrate APIs and filesystems with minimal ceremony, ideal for glue logic and prototyping.',
  },
  {
    context: 'Cross-platform clients',
    detail:
      'React Native and Flutter lift UI development to declarative layers while bridging to platform widgets and graphics libraries under the hood.',
  },
]

const examples = [
  {
    title: 'Readable data transformation (Python)',
    code: `def top_titles_by_score(rows, limit=5):
    # rows: list of dicts with 'title' and 'score'
    sorted_rows = sorted(rows, key=lambda r: r["score"], reverse=True)
    return [row["title"] for row in sorted_rows[:limit]]`,
    explanation:
      'A comprehension expresses intent without manual pointer arithmetic or memory allocation. The interpreter handles ordering and slicing; clarity invites quick reviews.',
  },
  {
    title: 'Concurrent IO without threads (JavaScript)',
    code: `async function fetchProfiles(ids) {
    const requests = ids.map((id) => fetch(\`/api/users/\${id}\`));
    const responses = await Promise.all(requests);
    return Promise.all(responses.map((r) => r.json()));
}`,
    explanation:
      'The event loop and promises hide scheduling complexity. Await syntax keeps control flow linear while the runtime multiplexes network IO.',
  },
  {
    title: 'When abstraction leaks (Python + NumPy vs pure Python)',
    code: `# Fast path: vectorized in C
scores = np.array(raw_scores)
adjusted = scores * 1.1 + 3

# Slow path: Python loop with per-iteration overhead
adjusted = [s * 1.1 + 3 for s in raw_scores]`,
    explanation:
      'The same math expressed differently can hit very different execution engines. Knowing when to stay in vectorized kernels preserves performance without abandoning high-level syntax.',
  },
]

const pitfalls = [
  'Assuming abstraction erases cost: dynamic dispatch, hidden allocations, and reflection can dominate hot paths.',
  'Ignoring memory profiles: GC pauses or accidental data copies can surface under latency-sensitive workloads.',
  'Overreliance on magical defaults: frameworks generate convenience, but unexamined defaults (N+1 queries, unbounded concurrency) become scaling bottlenecks.',
  'Shaky dependency hygiene: large ecosystems make supply chain vetting, pinning versions, and license awareness essential.',
  'Forgetting observability: without profiling and tracing hooks, it is hard to map high-level code to real CPU, memory, or network behavior.',
]

const decisionPoints = [
  'Optimize for iteration speed and readability: choose high-level languages for product discovery, research, and most networked services.',
  'Need predictable latency with tight budgets: profile first; if GC or dispatch dominates, consider lower-level segments or FFI for hotspots.',
  'Operate in constrained environments (firmware, kernels): prefer languages with explicit memory control or subsets that compile efficiently.',
  'Team expertise and ecosystem weight: pick the runtime with the richest libraries and operational tooling for your domain.',
]

const advancedInsights = [
  {
    title: 'JIT and tiered compilation',
    detail:
      'Modern runtimes observe code, speculate on shapes, and emit optimized machine code. Guard failures deoptimize. Warm-up time matters for short-lived processes.',
  },
  {
    title: 'Static types in high-level guise',
    detail:
      'TypeScript, Kotlin, and Rust show that expressive syntax can pair with strong static guarantees. Gradual typing (Python typing, Sorbet for Ruby) adds safety without abandoning dynamism.',
  },
  {
    title: 'FFI and polyglot runtimes',
    detail:
      'Bridging to C, Rust, or Java lets teams write most code in a high-level language and delegate critical loops to native modules. Polyglot VMs like GraalVM blur boundaries further.',
  },
  {
    title: 'Determinism and reproducibility',
    detail:
      'Containerized runtimes, pinned dependencies, and reproducible builds tame the variability often blamed on dynamic languages. This discipline is as critical as language choice.',
  },
]

const sources = [
  'Dragon Book (Aho, Lam, Sethi, Ullman) for compiler pipelines and optimization theory.',
  'Structure and Interpretation of Computer Programs for the role of abstraction in program design.',
  'GeeksforGeeks: differences between high-level and low-level languages for quick comparisons.',
  'V8 design docs and PyPy papers for modern JIT and interpreter strategies.',
  'Tanenbaum: Modern Operating Systems for how runtimes interact with OS scheduling and memory.',
]

const takeaways = [
  'High-level languages trade constant-factor performance for dramatic gains in clarity, safety, and delivery speed.',
  'Abstractions still leak: understand garbage collection, dispatch, and data movement to avoid surprises.',
  'Ecosystems and tooling often matter more than raw language speed; leverage libraries and profilers before reaching for rewrites.',
  'Use FFI or selective lower-level modules to balance hotspots without sacrificing overall productivity.',
]

export default function HighLevelLanguagesPage(): JSX.Element {
  return (
    <TopicLayout
      title="High-Level Languages"
      subtitle="Abstractions that prioritize developer velocity"
      intro="High-level languages raise the floor of expressiveness: they hide registers and manual memory, ship rich libraries, and let teams express intent directly. The cost is additional runtime machinery, but the payoff is faster iteration, safer defaults, and ecosystems that encode decades of practice."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          These languages exist to let humans think in domain terms rather than machine minutiae. They trade control of layout and
          registers for readability, safety features, and batteries-included libraries. The critical skill is knowing when that
          trade still meets your latency, memory, and observability needs.
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
          {howItWorks.map((block) => (
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
          {complexity.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Profile before optimizing. Many high-level systems are IO-bound; improvements come from batching requests, reducing
          allocations, and moving compute into vectorized or native paths rather than abandoning the language.
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
