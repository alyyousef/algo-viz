import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'LISP and REPL culture (1950s-1960s)',
    detail:
      'John McCarthy and Steve Russell implemented eval for LISP, birthing interactive development with read-eval-print loops that let developers experiment live.',
  },
  {
    title: 'Shells and scripting glue (1970s-1980s)',
    detail:
      'Unix shells (sh, csh, later bash) popularized interpreted pipelines for automation, showing that small scripts could orchestrate powerful native tools.',
  },
  {
    title: 'Perl, Python, Ruby mainstream dynamic scripting (1990s)',
    detail:
      'These languages prioritized expressiveness and batteries-included libraries, making interpreted execution the default for web apps, sysadmin tasks, and data munging.',
  },
  {
    title: 'JavaScript in browsers (mid-1990s)',
    detail:
      'Netscape introduced JavaScript to let pages run logic without plugins. Interpretation enabled instant ship cycles across heterogeneous clients.',
  },
  {
    title: 'JIT-accelerated interpreters (2000s-2010s)',
    detail:
      'V8, PyPy, and JavaScriptCore added just-in-time compilation to interpreters, blending dynamic flexibility with near-compiled speed on hot paths.',
  },
]

const mentalModels = [
  {
    title: 'Script as conversation',
    detail:
      'Interpreted programs converse with a runtime line by line or bytecode by bytecode. The runtime remains present, mediating every operation.',
  },
  {
    title: 'Late binding as a superpower',
    detail:
      'Types and bindings are often resolved at runtime. This enables metaprogramming, dynamic imports, and rapid iteration, but shifts more checks to execution time.',
  },
  {
    title: 'Runtime as an operating system',
    detail:
      'The interpreter provides its own scheduler, garbage collector, module loader, and standard library. Understanding that mini-OS helps explain performance and behavior.',
  },
]

const mechanics = [
  {
    heading: 'Source to bytecode',
    bullets: [
      'Many interpreters tokenize and parse source, then emit bytecode for a virtual machine (Python CPython, Lua).',
      'Some execute ASTs directly or threaded code without a stable bytecode format (early Ruby).',
      'Dynamic features (eval, reflection) can introduce new code at runtime, forcing the VM to stay adaptable.',
    ],
  },
  {
    heading: 'Execution engines',
    bullets: [
      'Bytecode interpreters loop over opcodes, dispatching to handlers. Dispatch overhead is a key cost.',
      'Tracing JITs record hot paths and compile them to native code, adding guards to ensure dynamic assumptions hold.',
      'Baseline JITs quickly emit simple native code, while optimizing tiers recompile hotspots with aggressive inlining and speculation.',
    ],
  },
  {
    heading: 'Runtime services',
    bullets: [
      'Garbage collection manages memory automatically, often with generational or incremental collectors.',
      'Dynamic dispatch resolves method lookups at runtime; inline caches and hidden classes speed repeated shapes.',
      'Module systems and package managers load code on demand, enabling rapid updates without recompilation.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics unaffected, constants shift',
    detail:
      'An O(n log n) sort stays O(n log n), but interpreter dispatch, dynamic type checks, and GC introduce higher constant factors than compiled equivalents.',
  },
  {
    title: 'Startup and warm-up behavior',
    detail:
      'Interpreted code starts instantly, a boon for CLIs and lambdas. JIT warm-up can delay peak speed; short-lived scripts may never reach optimized tiers.',
  },
  {
    title: 'Memory overhead',
    detail:
      'Object headers, dictionaries for dynamic attributes, and runtime metadata increase footprint. Compact representations (small ints, hidden classes) mitigate some overhead.',
  },
]

const applications = [
  {
    context: 'Web frontends',
    detail:
      'Browsers interpret and JIT JavaScript to make pages interactive. Rapid deploys and dynamic typing allow shipping new logic without client recompiles.',
  },
  {
    context: 'Scripting and automation',
    detail:
      'Python, Ruby, and shell excel at glue code: file manipulation, API calls, DevOps pipelines, and test harnesses where developer speed beats raw throughput.',
  },
  {
    context: 'Data analysis and ML prototyping',
    detail:
      'Scientists iterate quickly in Python notebooks while heavy lifting occurs in compiled extensions (NumPy, PyTorch) that the interpreter orchestrates.',
  },
  {
    context: 'Serverless and CLIs',
    detail:
      'Fast startup makes interpreted languages attractive for short-lived functions and command-line tools, provided cold start overhead is acceptable.',
  },
]

const examples = [
  {
    title: 'Interactive exploration (Python REPL)',
    code: `>>> import math
>>> angles = [0, 30, 45, 60, 90]
>>> [math.sin(math.radians(a)) for a in angles]
[0.0, 0.5, 0.7071067811865475, 0.8660254037844386, 1.0]`,
    explanation:
      'Immediate feedback encourages experimentation. The interpreter compiles each line to bytecode and executes it on the spot.',
  },
  {
    title: 'Dynamic dispatch in practice (JavaScript)',
    code: `function format(user) {
    if (user.premium) return user.name.toUpperCase();
    return user.name;
}
format({ name: "Ada", premium: true });`,
    explanation:
      'Properties can appear at runtime; inline caches in modern engines memoize shapes to keep repeated calls fast despite late binding.',
  },
  {
    title: 'When interpretation bottlenecks',
    code: `# Python: slow loop
total = 0
for x in data:
    total += x * 1.1

# Faster: push work into vectorized native code
arr = np.array(data, dtype=np.float64)
total = (arr * 1.1).sum()`,
    explanation:
      'Interpreter overhead per iteration can dominate. Offloading hot loops to compiled extensions keeps high-level ergonomics while regaining speed.',
  },
]

const pitfalls = [
  'Assuming speed without measurement: interpreter dispatch and dynamic types can surprise in hot loops.',
  'Ignoring warm-up: JIT optimizations need stable shapes and time; microbenchmarks that stop early mislead.',
  'Memory leaks via lingering references: long-lived servers need profiling to catch reference cycles or caches.',
  'Unbounded dynamism: excessive use of eval or runtime code generation complicates security, tooling, and performance.',
  'Deployment drift: relying on system interpreters can lead to version mismatches; pin and vendor runtimes when reproducibility matters.',
]

const decisionPoints = [
  'Optimize for iteration speed and flexibility: use interpreted languages for scripting, glue, and fast-changing products.',
  'Need low latency with stable throughput: measure. If interpreter overhead dominates, move hotspots to native extensions or choose compiled paths.',
  'Short-lived workloads: prefer interpreters with minimal warm-up or avoid heavy JIT tiers.',
  'Operational simplicity: choose portable runtimes with easy packaging (single-file executables, containers) to avoid environment drift.',
]

const advancedInsights = [
  {
    title: 'Inline caches and hidden classes',
    detail:
      'Engines like V8 create shapes for objects and attach inline caches to call sites. Stable shapes lead to monomorphic call sites that JIT well; polymorphic sites deoptimize.',
  },
  {
    title: 'Tracing vs method JITs',
    detail:
      'Tracing JITs record hot traces through loops, while method JITs compile hot functions. Workload characteristics determine which strategy yields better speed and stability.',
  },
  {
    title: 'Garbage collection tuning',
    detail:
      'Adjust heap sizes and generations for latency vs throughput. Incremental and concurrent GC reduce pause times for interactive apps; throughput GCs suit batch workloads.',
  },
  {
    title: 'FFI bridges and polyglot runtimes',
    detail:
      'FFI lets interpreted code call native libraries. Polyglot platforms (GraalVM) allow mixing languages while sharing optimizations and tooling.',
  },
]

const sources = [
  'Structure and Interpretation of Computer Programs for the philosophy of interpreters and evaluators.',
  'V8 and PyPy papers for modern JIT and inline cache strategies.',
  'Dragon Book chapters on interpretation vs compilation trade-offs.',
  'GeeksforGeeks: interpreted vs compiled language overviews for quick contrasts.',
  'Official docs for CPython, Ruby MRI, and Lua for bytecode and VM designs.',
]

const takeaways = [
  'Interpreted languages prioritize developer speed, flexibility, and immediate feedback, often trading raw performance.',
  'Warm-up, dispatch overhead, and GC shape runtime profiles; measure real workloads before optimizing or rewriting.',
  'JITs narrow the gap when workloads are stable; for hot loops, offload to native extensions or vectorized libraries.',
  'Control your runtime environment: pin versions, manage dependencies, and use profiling and GC tuning to keep systems healthy.',
]

export default function InterpretedLanguagesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Interpreted Languages"
      subtitle="On-the-fly execution via virtual machines or evaluators"
      intro="Interpreted languages execute with a runtime that reads code and performs work on the fly. This yields instant feedback, rapid iteration, and rich dynamism. The trade is higher per-operation overhead and reliance on runtime machinery like garbage collectors, dispatch tables, and JIT tiers."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Interpreters keep the runtime in the loop for every operation. They favor flexibility, portability, and fast edit-run
          cycles over the last drop of performance. Understanding the interpreter and its JIT, if present, helps predict when code
          will be fast enough and when to reach for native helpers.
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
          Expect more variability than ahead-of-time binaries. Warm-up, GC pauses, and shape stability affect tail latency. Profile
          real request patterns, not just microbenchmarks.
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
