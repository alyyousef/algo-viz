import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
  {
    title: 'Persistent data structures popularized (1990s-2000s)',
    detail:
      'Okasaki and later Clojure show how structural sharing can make immutability practical at scale.',
  },
  {
    title: 'FP in mainstream tooling (2010s)',
    detail:
      'Libraries like RxJS, Lodash/fp, and Elm-style architectures bring FP ideas to the web.',
  },
  {
    title: 'Effect systems gain traction (2020s)',
    detail:
      'Languages and libraries explore algebraic effects, typed effects, and safer effect handling.',
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
      'Functional code emphasizes transformations of data through pipelines of pure functions rather than stepwise mutation. The question shifts from "what is the next state?" to "what is the next value?"',
  },
  {
    title: 'Immutability as safety rail',
    detail:
      'By default, values are not mutated. New values are derived from old ones. This reduces aliasing bugs and simplifies concurrency because readers cannot observe partial writes.',
  },
  {
    title: 'Effects are explicit',
    detail:
      'Side effects are modeled as values or constrained at the edges, making data flow predictable.',
  },
  {
    title: 'Types describe domains',
    detail:
      'ADTs and sum types make illegal states unrepresentable and improve refactoring safety.',
  },
  {
    title: 'Composition over inheritance',
    detail:
      'Small functions compose into larger behavior without deep class hierarchies.',
  },
]

const mechanics = [
  {
    heading: 'Purity and referential transparency',
    bullets: [
      'Pure functions have no side effects and always produce the same output for the same input, enabling equational reasoning and easy testing.',
      'Referential transparency allows replacing a function call with its result without changing program behavior.',
      'Effects (IO, randomness, state) are pushed to the boundaries and modeled explicitly (monads, algebraic effects).',
      'Idempotent functions simplify retries and distributed workflows.',
    ],
  },
  {
    heading: 'Evaluation strategies',
    bullets: [
      'Eager (strict) evaluation computes arguments before function application (OCaml, F#, most JS).',
      'Lazy (non-strict) defers computation until needed (Haskell). Laziness enables infinite streams but requires care to avoid space leaks.',
      'Thunks and memoization: lazy runtimes wrap expressions in thunks and may cache results to avoid recomputation.',
      'Strictness annotations and eager folds prevent accidental memory blowups.',
    ],
  },
  {
    heading: 'Type systems and composition',
    bullets: [
      'Algebraic data types (ADTs) and pattern matching encode domain shapes clearly and exhaustively.',
      'Type inference (Hindley-Milner) reduces annotation noise while keeping strong static guarantees.',
      'Higher-order functions (map, fold, filter) and function composition operators build pipelines concisely.',
      'Monoids and functors give reusable algebraic structure for composition.',
    ],
  },
  {
    heading: 'Effects and state',
    bullets: [
      'State is passed explicitly or modeled as a value (State monad, reducers).',
      'IO is isolated in effectful layers to keep core logic pure.',
      'Effect systems make dependencies visible and enforce safe ordering.',
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
  {
    title: 'Parallelism vs overhead',
    detail:
      'Pure functions parallelize easily, but coordination and data transfer add overhead that must be measured.',
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
  {
    context: 'Data science and analytics',
    detail:
      'Functional pipelines enable reproducible transformations and clean data lineage.',
  },
  {
    context: 'Streaming systems',
    detail:
      'Functional streams model continuous data with composable transformations.',
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
  {
    title: 'Pure state reducer (JavaScript)',
    code: `const reducer = (state, action) => {
  switch (action.type) {
    case 'add': return { ...state, count: state.count + 1 }
    case 'reset': return { ...state, count: 0 }
    default: return state
  }
}`,
    explanation:
      'Reducers make state transitions explicit and easy to test without side effects.',
  },
  {
    title: 'Function composition',
    code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)
const normalize = pipe(trim, toLower, removePunctuation)`,
    explanation:
      'Composition builds pipelines from small reusable transformations.',
  },
]

const pitfalls = [
  'Overusing laziness without profiling can create space leaks and unpredictable memory use.',
  'Ignoring performance characteristics of persistent data structures can introduce unnecessary allocations.',
  'Mixing side effects into "pure" code erodes referential transparency, complicating tests and reasoning.',
  'Abstracting too aggressively can obscure control flow and make debugging harder without good tooling.',
  'Assuming immutability alone makes code correct; domain modeling and invariants still matter.',
  'Forgetting to control strictness in critical loops can cause memory spikes.',
  'Over-using monads or abstractions without team alignment can slow development.',
]

const decisionPoints = [
  'Need strong reasoning and testability: favor functional style to isolate effects and enable equational reasoning.',
  'Building concurrent or distributed systems: immutable messages and pure handlers reduce shared-state bugs.',
  'Performance-critical inner loops: measure. If allocation overhead dominates, use strictness annotations, specialized data structures, or drop to controlled mutation.',
  'Team experience and tooling: choose languages with solid profilers, type tooling, and library support for your domain.',
  'Domain modeling with rich types: FP shines when you can encode business rules in ADTs.',
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
      "Compilers can fuse adjacent maps and filters to eliminate intermediate allocations. GHC's stream fusion and loop fusion in array libraries recover performance.",
  },
  {
    title: 'Typed FP for correctness',
    detail:
      'Dependent and refinement types (Idris, Liquid Haskell) encode invariants in the type system, catching domain errors at compile time.',
  },
  {
    title: 'Free monads and interpreters',
    detail:
      'Define programs as data, then interpret them for different runtimes or test environments.',
  },
  {
    title: 'Category theory in practice',
    detail:
      'Concepts like functors and monoids formalize composition and reusable abstractions.',
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
  'Good FP mixes purity with pragmatism: isolate mutation where it wins and keep interfaces pure.',
  'Teams benefit most when they adopt shared conventions and tooling for FP patterns.',
]

const fpTooling = [
  {
    title: 'Languages',
    detail:
      'Haskell, Elm, F#, OCaml, Clojure, Scala, and functional JS all trade purity for pragmatism.',
  },
  {
    title: 'Libraries',
    detail:
      'FP libraries like RxJS, fp-ts, and Ramda provide higher-order utilities and type-safe patterns.',
  },
  {
    title: 'Tooling',
    detail:
      'REPLs, property-based testing, and type-driven tooling accelerate feedback loops.',
  },
  {
    title: 'Runtime support',
    detail:
      'Runtimes with good profilers and GC insights are critical for performance tuning.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Profile allocations',
    detail:
      'Measure heap growth and GC pauses to detect space leaks or hot paths.',
  },
  {
    title: 'Check strictness',
    detail:
      'Validate evaluation strategy to ensure thunks are not piling up.',
  },
  {
    title: 'Property-based tests',
    detail:
      'Generators explore edge cases that example tests often miss.',
  },
  {
    title: 'Trace effects',
    detail:
      'Log and observe effect boundaries to ensure IO and state changes are isolated.',
  },
]

const productionChecklist = [
  {
    title: 'Performance',
    detail:
      'Profile pipelines, limit allocations, and apply strictness where needed.',
  },
  {
    title: 'Correctness',
    detail:
      'Use types and property tests to encode domain invariants.',
  },
  {
    title: 'Reliability',
    detail:
      'Isolate side effects and use pure cores with effectful shells.',
  },
  {
    title: 'Team alignment',
    detail:
      'Document FP conventions to avoid abstraction sprawl.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Pure functions, immutability, and higher-order functions.',
  },
  {
    step: 'Types and data',
    detail: 'ADTs, pattern matching, and type inference.',
  },
  {
    step: 'Effects and concurrency',
    detail: 'Monads, effect systems, and functional concurrency models.',
  },
  {
    step: 'Performance',
    detail: 'Persistent data structures, strictness, and profiling.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.fp-win98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fp-win98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.fp-win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.fp-win98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.fp-win98-titlecontrols {
  display: flex;
  gap: 2px;
}

.fp-win98-control {
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

.fp-win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.fp-win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.fp-win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.fp-win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.fp-win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.fp-win98-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.fp-win98-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fp-win98-toc li {
  margin: 0 0 8px;
}

.fp-win98-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.fp-win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.fp-win98-content h1 {
  font-size: 20px;
  margin: 0 0 12px;
}

.fp-win98-content h2 {
  font-size: 16px;
  margin: 0 0 8px;
}

.fp-win98-content h3 {
  font-size: 13px;
  margin: 0 0 6px;
}

.fp-win98-content section {
  margin: 0 0 20px;
}

.fp-win98-content p,
.fp-win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.fp-win98-content p {
  margin: 0 0 10px;
}

.fp-win98-content ul,
.fp-win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.fp-win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.fp-win98-code {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin: 6px 0 10px;
  padding: 8px;
}

.fp-win98-code code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .fp-win98-main {
    grid-template-columns: 1fr;
  }

  .fp-win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .fp-win98-titletext {
    font-size: 13px;
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
    { id: 'bp-applications', label: 'Real-world Applications' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-tooling', label: 'Tooling and Ecosystem' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [
    { id: 'glossary-terms', label: 'Terms and Concepts' },
    { id: 'glossary-sources', label: 'Further Reading and Sources' },
  ],
}

export default function FunctionalProgrammingPage(): JSX.Element {
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
    document.title = `Functional Programming (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Functional Programming',
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
    <div className="fp-win98-page">
      <style>{win98HelpStyles}</style>
      <div className="fp-win98-window" role="presentation">
        <header className="fp-win98-titlebar">
          <span className="fp-win98-titletext">Functional Programming</span>
          <div className="fp-win98-titlecontrols">
            <button className="fp-win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="fp-win98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="fp-win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`fp-win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fp-win98-main">
          <aside className="fp-win98-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="fp-win98-content">
            <h1>Functional Programming</h1>
            <p>
              Functional programming treats computation as the evaluation of expressions, not the mutation of state. By emphasizing
              pure functions, immutability, and composition, it makes programs easier to reason about, test, and parallelize, while
              demanding care with performance and effect management.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview">
                  <h2>Overview</h2>
                  <p>
                    The paradigm reduces moving parts: state changes are explicit, and functions are the primary building blocks.
                    This clarity aids correctness and concurrency but shifts responsibility to manage performance overheads from
                    allocation, laziness, and runtime features like garbage collection.
                  </p>
                </section>
                <hr className="fp-win98-divider" />
                <section id="bp-history">
                  <h2>Historical Context</h2>
                  {milestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications">
                  <h2>Real-world Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-complexity">
                  <h2>Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Start with clean, pure designs, then profile. Optimize by fusing pipelines, controlling strictness, and using
                    specialized data structures. If mutation is needed for speed, isolate it behind pure interfaces.
                  </p>
                </section>
                <section id="bp-takeaways">
                  <h2>Key Takeaways</h2>
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
                <section id="core-mental-models">
                  <h2>Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics">
                  <h2>How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3>{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-when-to-use">
                  <h2>When to Use It</h2>
                  <ol>
                    {decisionPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-pitfalls">
                  <h2>Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced">
                  <h2>Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling">
                  <h2>Tooling and Ecosystem</h2>
                  {fpTooling.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging">
                  <h2>Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-production">
                  <h2>Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning">
                  <h2>Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical">
                <h2>Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3>{example.title}</h3>
                    <div className="fp-win98-code">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms">
                  <h2>Terms and Concepts</h2>
                  <p><strong>Pure function:</strong> A function with no side effects that returns the same output for the same input.</p>
                  <p><strong>Referential transparency:</strong> Replacing an expression with its value does not change program behavior.</p>
                  <p><strong>Immutability:</strong> Values are not modified in place; new values are derived from existing values.</p>
                  <p><strong>Higher-order function:</strong> A function that takes other functions as arguments or returns functions.</p>
                  <p><strong>Algebraic data type (ADT):</strong> A type built from product and sum combinations to model domain shapes safely.</p>
                  <p><strong>Pattern matching:</strong> Structural branching over ADT variants with compiler-checked exhaustiveness.</p>
                  <p><strong>Type inference:</strong> Compiler deduction of types, often associated with Hindley-Milner systems.</p>
                  <p><strong>Laziness (non-strict evaluation):</strong> Deferring evaluation until values are demanded.</p>
                  <p><strong>Persistent data structure:</strong> An immutable structure using structural sharing for efficient updates.</p>
                  <p><strong>Monads and effect systems:</strong> Techniques for sequencing and constraining side effects while preserving a pure core.</p>
                </section>
                <section id="glossary-sources">
                  <h2>Further Reading and Sources</h2>
                  <ul>
                    {sources.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
