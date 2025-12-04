import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Lambda calculus formalizes computation (1930s)',
    detail:
      'Alonzo Church introduced lambda calculus as a minimal model of computation. Its substitution rules and function application underpin modern functional languages.',
  },
  {
    title: 'LISP demonstrates symbolic processing (1958)',
    detail:
      'John McCarthy built LISP to manipulate code as data. Its homoiconicity and REPL culture proved functional ideas could be practical, not only theoretical.',
  },
  {
    title: 'ML and Hindley-Milner typing (1970s)',
    detail:
      'Robin Milner created ML with type inference and algebraic data types, making strong typing usable without excessive annotations and popularizing pattern matching.',
  },
  {
    title: 'Lazy evaluation mainstreamed by Haskell (1990)',
    detail:
      'Haskell standardized non-strict semantics, pure functions, and type classes. Laziness enabled modularity and infinite data structures while forcing explicit control of effects.',
  },
  {
    title: 'Functional patterns enter industry',
    detail:
      'Scala, Clojure, F#, and functional JavaScript patterns brought immutability, higher-order functions, and monadic abstractions into mainstream backend and frontend development.',
  },
]

const mentalModels = [
  {
    title: 'Programs as math',
    detail:
      'If a function maps inputs to outputs without hidden state, it behaves like a mathematical function. Reasoning becomes algebraic: replace equals with equals.',
  },
  {
    title: 'Data flows not control flows',
    detail:
      'Functional code emphasizes transformations of data through pipelines of pure functions rather than stepwise mutation. The question shifts from “what is the next state” to “what is the next value.”',
  },
  {
    title: 'Immutability as safety rail',
    detail:
      'By default, values are not mutated. New values are derived from old ones. This reduces aliasing bugs and simplifies concurrency because readers cannot observe partial writes.',
  },
]

const mechanics = [
  {
    heading: 'Purity and referential transparency',
    bullets: [
      'Pure functions have no side effects and always produce the same output for the same input, enabling equational reasoning and easy testing.',
      'Referential transparency allows replacing a function call with its result without changing program behavior.',
      'Effects (IO, randomness, state) are pushed to the boundaries and modeled explicitly (monads, algebraic effects).',
    ],
  },
  {
    heading: 'Evaluation strategies',
    bullets: [
      'Eager (strict) evaluation computes arguments before function application (OCaml, F#, most JS).',
      'Lazy (non-strict) defers computation until needed (Haskell). Laziness enables infinite streams but requires care to avoid space leaks.',
      'Thunks and memoization: lazy runtimes wrap expressions in thunks and may cache results to avoid recomputation.',
    ],
  },
  {
    heading: 'Type systems and composition',
    bullets: [
      'Algebraic data types (ADTs) and pattern matching encode domain shapes clearly and exhaustively.',
      'Type inference (Hindley-Milner) reduces annotation noise while keeping strong static guarantees.',
      'Higher-order functions (map, fold, filter) and function composition operators build pipelines concisely.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics stay, constants shift',
    detail:
      'Functional implementations share algorithmic complexity with imperative ones. Overheads come from allocation, indirection, and garbage collection rather than explicit mutation.',
  },
  {
    title: 'Allocation and GC costs',
    detail:
      'Persistent data structures copy-on-write with structural sharing. They save asymptotic space compared to deep copies but allocate more than in-place mutation. GC pauses affect latency-sensitive workloads.',
  },
  {
    title: 'Laziness and space',
    detail:
      'Deferred computation can improve speed by avoiding unused work or hurt by retaining thunks and large unevaluated structures. Profiling for space leaks is essential in lazy settings.',
  },
]

const applications = [
  {
    context: 'Data pipelines and ETL',
    detail:
      'Map-reduce style transformations fit naturally into functional pipelines. Immutable data and pure steps ease parallelization and reproducibility.',
  },
  {
    context: 'Financial systems',
    detail:
      'Firms use F# and Scala for pricing engines and risk because deterministic transformations and strong typing reduce subtle state bugs.',
  },
  {
    context: 'Concurrent and distributed services',
    detail:
      'Immutable messages and pure handlers simplify reasoning about concurrency. Erlang and Elixir leverage this for fault-tolerant telecom and messaging systems.',
  },
  {
    context: 'Frontend UI architectures',
    detail:
      'React popularized pure render functions and immutable props; state updates are modeled as pure reducers (Redux), enabling predictable UI changes.',
  },
]

const examples = [
  {
    title: 'Pipeline with higher-order functions (JavaScript)',
    code: `const totalPremium = users
  .filter((u) => u.premium)
  .map((u) => u.credits)
  .reduce((sum, c) => sum + c, 0);`,
    explanation:
      'Composition of pure functions expresses the transformation clearly. No intermediate mutation is required, and each step is testable in isolation.',
  },
  {
    title: 'Algebraic data types and pattern matching (F#)',
    code: `type Payment =
    | Card of int
    | Wire of string
    | Cash

let describe payment =
    match payment with
    | Card digits -> $"Card ending {digits % 10000}"
    | Wire bank -> $"Wire from {bank}"
    | Cash -> "Cash"`,
    explanation:
      'Pattern matching enforces exhaustiveness. The compiler warns if a case is missing, improving correctness when domains evolve.',
  },
  {
    title: 'Lazy stream (Haskell)',
    code: `naturals = [0..]            -- infinite list
firstTenSquares = take 10 (map (^2) naturals)`,
    explanation:
      'Non-strict evaluation allows infinite structures. Only the demanded prefix is computed, but careless retention can cause space leaks.',
  },
]

const pitfalls = [
  'Overusing laziness without profiling can create space leaks and unpredictable memory use.',
  'Ignoring performance characteristics of persistent data structures can introduce unnecessary allocations.',
  'Mixing side effects into “pure” code erodes referential transparency, complicating tests and reasoning.',
  'Abstracting too aggressively can obscure control flow and make debugging harder without good tooling.',
  'Assuming immutability alone makes code correct; domain modeling and invariants still matter.',
]

const decisionPoints = [
  'Need strong reasoning and testability: favor functional style to isolate effects and enable equational reasoning.',
  'Building concurrent or distributed systems: immutable messages and pure handlers reduce shared-state bugs.',
  'Performance-critical inner loops: measure. If allocation overhead dominates, use strictness annotations, specialized data structures, or drop to controlled mutation.',
  'Team experience and tooling: choose languages with solid profilers, type tooling, and library support for your domain.',
]

const advancedInsights = [
  {
    title: 'Monads and effect systems',
    detail:
      'Monads sequence effectful computations while keeping pure function signatures. Newer effect systems and algebraic effects aim to model side effects with less ceremony.',
  },
  {
    title: 'Persistent data structures',
    detail:
      'Structures like HAMTs and finger trees offer near-constant-time updates via structural sharing. They balance immutability with practical performance.',
  },
  {
    title: 'Fusion and deforestation',
    detail:
      'Compilers can fuse adjacent maps and filters to eliminate intermediate allocations. GHC’s stream fusion and loop fusion in array libraries recover performance.',
  },
  {
    title: 'Typed FP for correctness',
    detail:
      'Dependent and refinement types (Idris, Liquid Haskell) encode invariants in the type system, catching domain errors at compile time.',
  },
]

const sources = [
  'Structure and Interpretation of Computer Programs for foundational functional abstractions.',
  'Real World Haskell and Learn You a Haskell for practical lazy FP patterns.',
  'Okasaki: Purely Functional Data Structures for persistent structure design.',
  'Types and Programming Languages (Pierce) for type systems and semantics.',
  'GeeksforGeeks: functional vs imperative overviews for quick contrasts.',
]

const takeaways = [
  'Functional programming centers on pure functions, immutability, and composition to improve reasoning and testability.',
  'Performance hinges on allocation patterns, laziness, and data structure choices; measure and tune with awareness of the runtime.',
  'Effects should be explicit and localized, whether via monads, effect handlers, or disciplined boundaries.',
  'Persistent data and higher-order abstractions enable safe concurrency and clearer domain modeling when used with care.',
]

export default function FunctionalProgrammingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Functional Programming"
      subtitle="Expressions, immutability, and pure functions"
      intro="Functional programming treats computation as the evaluation of expressions, not the mutation of state. By emphasizing pure functions, immutability, and composition, it makes programs easier to reason about, test, and parallelize, while demanding care with performance and effect management."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          The paradigm reduces moving parts: state changes are explicit, and functions are the primary building blocks. This clarity
          aids correctness and concurrency but shifts responsibility to manage performance overheads from allocation, laziness, and
          runtime features like garbage collection.
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
          Start with clean, pure designs, then profile. Optimize by fusing pipelines, controlling strictness, and using
          specialized data structures. If mutation is needed for speed, isolate it behind pure interfaces.
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
