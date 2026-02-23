import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const history = [
  '600-200 BCE, Indian prosody texts by Pingala and Virahanka describe similar recurrences for counting syllable patterns.',
  '1202, Leonardo of Pisa (Fibonacci) publishes Liber Abaci to model rabbit populations and popularizes the sequence in Europe.',
  '1843, Jacques Binet formalizes the closed form using the golden ratio roots of the characteristic polynomial.',
  'Late 1900s, algorithm texts (Knuth, CLRS) adopt matrix and fast-doubling derivations to teach divide-and-conquer.',
]

const formalDefinition = [
  {
    title: 'Definition',
    detail:
      'F(0) = 0, F(1) = 1, and for n >= 2: F(n) = F(n-1) + F(n-2). This is a linear recurrence of order 2.',
  },
  {
    title: 'Two-state memory model',
    detail:
      'Each term depends only on the two previous terms. The state of the system is a pair (F(n-1), F(n-2)).',
  },
  {
    title: 'Characteristic roots',
    detail:
      'Solve x^2 = x + 1. The roots are phi = (1 + sqrt(5)) / 2 and psi = (1 - sqrt(5)) / 2.',
  },
  {
    title: 'Asymptotic growth',
    detail:
      'F(n) grows like phi^n / sqrt(5). psi^n is tiny in magnitude and vanishes for large n.',
  },
]

const mechanics = [
  {
    heading: 'Recurrence and mental model',
    bullets: [
      'F(n) = F(n-1) + F(n-2) with seeds F(0) = 0, F(1) = 1; a two-state system that only remembers the last two observations.',
      'Optimal substructure: each term is optimal given optimal smaller terms; overlapping subproblems cause naive recursion to explode.',
      'Call tree duplication is the core cost driver: computing F(40) recomputes F(30) many times unless cached.',
    ],
  },
  {
    heading: 'Bottom-up tabulation',
    bullets: [
      'Allocate fib[0..n], seed fib[0] = 0, fib[1] = 1, then march upward; each step reuses two prior cells.',
      'Time O(n), space O(n); reduce to O(1) by keeping two rolling values and discarding the array.',
      'Modulo arithmetic keeps values bounded for hashing or contests, with no effect on asymptotics.',
    ],
  },
  {
    heading: 'Acceleration tricks',
    bullets: [
      'Fast doubling computes (F(n), F(n+1)) using even/odd identities in O(log n) time and O(1) space.',
      'Matrix exponentiation raises [[1,1],[1,0]] to the (n-1) power with binary exponentiation, also O(log n).',
      'Closed form (Binet) gives O(1) arithmetic but loses exactness for large n unless using arbitrary precision and rounding.',
    ],
  },
]

const recurrenceBreakdown = [
  {
    title: 'Base cases anchor the sequence',
    detail:
      'F(0) and F(1) pin down every future term. Changing seeds shifts the entire series.',
  },
  {
    title: 'One-step recurrence',
    detail:
      'Each F(n) is a single add of the two previous terms. DP turns this into a linear pass.',
  },
  {
    title: 'Overlap is massive',
    detail:
      'Naive recursion generates O(phi^n) calls because subtrees repeat the same F(k) values.',
  },
]

const workedExample = [
  {
    title: 'Input',
    detail: 'n = 7. We want F(7).',
  },
  {
    title: 'Tabulation table',
    detail:
      'Index: 0 1 2 3 4 5 6 7\nValue: 0 1 1 2 3 5 8 13',
  },
  {
    title: 'Rolling variables',
    detail:
      'Start (prev2, prev1) = (0, 1). Update 5 times to reach (8, 13). The answer is 13.',
  },
]

const algorithmComparison = [
  {
    heading: 'Naive recursion',
    bullets: [
      'Time O(phi^n), space O(n) for call stack depth.',
      'Great for teaching overlap, useless for production.',
    ],
  },
  {
    heading: 'Memoization',
    bullets: [
      'Time O(n), space O(n). Caches results to avoid recomputation.',
      'Easy to retrofit on recursive code but has call overhead.',
    ],
  },
  {
    heading: 'Tabulation',
    bullets: [
      'Time O(n), space O(1) with rolling variables.',
      'Fastest constant factors for a single query.',
    ],
  },
  {
    heading: 'Fast doubling',
    bullets: [
      'Time O(log n), space O(1). Works well for very large n.',
      'Uses identities derived from squaring the companion matrix.',
    ],
  },
]

const fastDoublingIdentities = [
  {
    title: 'Even index',
    detail: 'F(2k) = F(k) * (2 * F(k+1) - F(k))',
  },
  {
    title: 'Odd index',
    detail: 'F(2k+1) = F(k+1)^2 + F(k)^2',
  },
  {
    title: 'Why it helps',
    detail:
      'Each step halves n, similar to exponentiation by squaring, yielding logarithmic recursion depth.',
  },
]

const matrixView = [
  {
    title: 'Companion matrix',
    detail:
      'M = [[1, 1], [1, 0]]. Then M^n = [[F(n+1), F(n)], [F(n), F(n-1)]].',
  },
  {
    title: 'Binary exponentiation',
    detail:
      'Compute M^n in O(log n) multiplications by squaring and multiplying when bits are set.',
  },
  {
    title: 'Generalization',
    detail:
      'The matrix method extends cleanly to k-order linear recurrences by using a k x k companion matrix.',
  },
]

const complexityTradeoffs = [
  'Naive recursion: O(phi^n). Educational for showing overlap, impractical beyond around n = 40.',
  'Tabulation with rolling variables: O(n) time, O(1) space, best constant factors for single queries.',
  'Memoization: O(n) time and space but often slower than tabulation due to function-call overhead.',
  'Fast doubling or matrix exponentiation: O(log n) time, O(1) space, shines for very large n or many large queries.',
  'Closed form: O(1) operations but subject to floating error; trustworthy only up to about n = 70 in double precision.',
]

const applications = [
  'Capacity planning with lag: inventory replenishment where today depends on two prior weeks, a Fibonacci-like recurrence.',
  'Heap and tree analyses: Fibonacci heaps, binomial trees, and AVL balance proofs bound node degrees with Fibonacci growth.',
  'Search and hashing: Fibonacci hashing and interpolation choose probe gaps tied to golden ratio spacing for cache-friendly spread.',
  'Graphics and modeling: phyllotaxis spirals, L-systems, and procedural plant models often lean on Fibonacci angles and counts.',
  'Failure story: naive recursion in a production endpoint led to timeouts at n = 45; fast doubling cut latency to microseconds.',
]

const examples = [
  {
    title: 'Bottom-up O(n) with rolling variables',
    code: `function fib(n):
    if n < 0: error "non-negative only"
    if n == 0: return 0
    prev2 = 0  // F(0)
    prev1 = 1  // F(1)
    for i in range(2, n + 1):
        cur = prev1 + prev2
        prev2 = prev1
        prev1 = cur
    return prev1`,
    explanation:
      'Constant space, linear time, branch-free inside the loop. Great baseline for most applications.',
  },
  {
    title: 'Memoized recursion',
    code: `function fibMemo(n, memo):
    if n < 2: return n
    if memo[n] exists: return memo[n]
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]`,
    explanation:
      'Good for illustrating overlap and caching. Adds recursion overhead but keeps the math readable.',
  },
  {
    title: 'Fast doubling O(log n)',
    code: `function fibDoubling(n):
    if n == 0: return (0, 1)  // (F(n), F(n+1))
    (a, b) = fibDoubling(n // 2)
    c = a * (2 * b - a)      // F(2k)
    d = a * a + b * b        // F(2k + 1)
    if n is even:
        return (c, d)
    else:
        return (d, c + d)`,
    explanation:
      'Divide-and-conquer mirrors exponentiation by squaring. Depth O(log n) avoids stack blowups for huge n.',
  },
  {
    title: 'Matrix power O(log n) with binary exponentiation',
    code: `function matMul(A, B):
    return [[A00*B00 + A01*B10, A00*B01 + A01*B11],
            [A10*B00 + A11*B10, A10*B01 + A11*B11]]

function matPow(M, n):
    R = identity2
    while n > 0:
        if n is odd: R = matMul(R, M)
        M = matMul(M, M)
        n = n // 2
    return R

function fibMatrix(n):
    if n == 0: return 0
    return matPow([[1,1],[1,0]], n - 1)[0][0]`,
    explanation:
      'Linear algebra view: repeated squaring of the companion matrix yields F(n). Useful for k-order recurrences.',
  },
]

const pitfalls = [
  'Naive recursion is exponential and exhausts stacks; never ship it beyond teaching demos.',
  'Integer overflow hits early with 32-bit ints; prefer bigints or modular arithmetic for large n.',
  'Floating point Binet drifts for n greater than roughly 70 with double precision; always round and validate.',
  'Off-by-one seeds: choose F(0) = 0, F(1) = 1 and stay consistent across APIs and tests.',
  'Memoization can thrash caches for many distinct n; prefer tabulation or doubling for repeated queries.',
]

const decisionGuidance = [
  'Single query, moderate n (less than 1e7): choose rolling O(n) tabulation for simplicity and cache friendliness.',
  'Very large n (hundreds of thousands or more): choose fast doubling or matrix power for O(log n) time and O(1) space.',
  'Streaming many queries of increasing n: precompute once with tabulation and reuse the array.',
  'Working modulo M (hashing, coding puzzles): apply mod at each add and multiply; doubling identities still hold.',
  'Need proofs or generalizations: use the matrix or characteristic polynomial view to extend to k-order recurrences.',
]

const advancedInsights = [
  'Pisano periods: Fibonacci modulo m repeats with a period, enabling fast modulo queries and detecting cycles.',
  'Zeckendorf representation: every positive integer is a sum of nonconsecutive Fibonacci numbers, the basis for Fibonacci coding.',
  'Fast doubling derives directly from squaring the companion matrix, showing how divide-and-conquer mirrors algebra.',
  'In Fibonacci heaps, node degree is bounded by log_phi(n); the sequence controls consolidation complexity.',
  'Runtime proofs for AVL trees and binomial heaps reuse the same recurrence, making Fibonacci a template for many analyses.',
]

const miniFaq = [
  {
    question: 'Why does the naive recursion blow up so fast?',
    answer:
      'The call tree duplicates subproblems. F(n) calls F(n-1) and F(n-2), which both compute F(n-3), and so on.',
  },
  {
    question: 'Is memoization always slower than tabulation?',
    answer:
      'Not always, but often. Memoization pays function-call and map overhead; tabulation is a tight loop.',
  },
  {
    question: 'When should I use fast doubling?',
    answer:
      'When n is huge or you need many large queries. It gives O(log n) time without heavy matrices.',
  },
  {
    question: 'Can I compute Fibonacci with negative n?',
    answer:
      'Yes with the negafibonacci identity: F(-n) = (-1)^(n+1) * F(n). It is rarely needed in practice.',
  },
]

const takeaways = [
  'Fibonacci is the smallest recurrence that still shows overlapping subproblems and optimal substructure.',
  'Tabulation gives O(n) time; fast doubling gives O(log n) with simple identities.',
  'Base cases and consistent indexing matter more than any optimization.',
  'Matrix and characteristic polynomial views generalize to other linear recurrences.',
  'Know the numeric limits: overflow and floating error are the real traps.',
]

const glossary = [
  {
    term: 'Linear recurrence (order 2)',
    definition:
      'A recurrence where each term is computed from the two previous terms: F(n) = F(n-1) + F(n-2).',
  },
  {
    term: 'Overlapping subproblems',
    definition:
      'The same smaller Fibonacci values are recomputed many times in naive recursion.',
  },
  {
    term: 'Memoization',
    definition:
      'Top-down caching that stores computed F(k) values and reuses them later.',
  },
  {
    term: 'Tabulation',
    definition:
      'Bottom-up dynamic programming that fills Fibonacci values iteratively from base cases.',
  },
  {
    term: 'Fast doubling',
    definition:
      'A divide-and-conquer method that computes F(n) in O(log n) using identities for F(2k) and F(2k+1).',
  },
  {
    term: 'Companion matrix',
    definition:
      'The 2x2 matrix [[1,1],[1,0]] whose powers encode Fibonacci values.',
  },
  {
    term: 'Binet formula',
    definition:
      'Closed-form expression for Fibonacci numbers using the roots phi and psi.',
  },
  {
    term: 'Pisano period',
    definition:
      'The repeating cycle length of Fibonacci numbers under modulo arithmetic.',
  },
  {
    term: 'Zeckendorf representation',
    definition:
      'Unique decomposition of a positive integer into nonconsecutive Fibonacci numbers.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const fib98HelpStyles = `
.fib98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fib98-window {
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

.fib98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.fib98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.fib98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.fib98-control {
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
  cursor: pointer;
}

.fib98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.fib98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.fib98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.fib98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.fib98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.fib98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.fib98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fib98-toc-list li {
  margin: 0 0 8px;
}

.fib98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.fib98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.fib98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.fib98-section {
  margin: 0 0 20px;
}

.fib98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.fib98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 12px 0 6px;
}

.fib98-content p,
.fib98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.fib98-content p {
  margin: 0 0 10px;
}

.fib98-content ul,
.fib98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.fib98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.fib98-preline {
  white-space: pre-line;
}

.fib98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.fib98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .fib98-main {
    grid-template-columns: 1fr;
  }

  .fib98-toc {
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
    { id: 'bp-definition', label: 'Formal Definition' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-breakdown', label: 'Recurrence Breakdown' },
    { id: 'core-algorithms', label: 'Algorithm Comparison' },
    { id: 'core-doubling', label: 'Fast Doubling' },
    { id: 'core-matrix', label: 'Matrix View' },
    { id: 'core-complexity', label: 'Complexity & Trade-offs' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When To Use What' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example (n = 7)' },
    { id: 'ex-code', label: 'Practical Code Examples' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-faq', label: 'Quick FAQ' },
  ],
}

export default function FibonacciSequencePage(): JSX.Element {
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
    document.title = `Fibonacci Sequence (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Fibonacci Sequence',
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
    <div className="fib98-help-page">
      <style>{fib98HelpStyles}</style>
      <div className="fib98-window" role="presentation">
        <header className="fib98-titlebar">
          <span className="fib98-title-text">Fibonacci Sequence</span>
          <div className="fib98-title-controls">
            <button className="fib98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="fib98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="fib98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`fib98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fib98-main">
          <aside className="fib98-toc" aria-label="Table of contents">
            <h2 className="fib98-toc-title">Contents</h2>
            <ul className="fib98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="fib98-content">
            <h1 className="fib98-doc-title">Fibonacci Sequence</h1>
            <p>
              Dynamic programming starts here: the smallest overlapping-subproblem recurrence that still teaches every core trick.
              Fibonacci numbers expose how recursion explodes, how caching tames it, and how algebra unlocks logarithmic speed.
            </p>
            <p>
              This page keeps the full concept map: formal recurrence, historical context, algorithmic choices, worked examples,
              fast-doubling identities, matrix interpretation, and practical trade-offs for real systems.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="fib98-section">
                  <h2 className="fib98-heading">Overview</h2>
                  <p>
                    Fibonacci is a compact demonstration of dynamic programming. Start with naive recursion (exponential), add
                    memoization (linear), then switch to tabulation (linear with lower overhead). For very large n, use fast
                    doubling or matrix exponentiation (logarithmic time).
                  </p>
                  <p>
                    The same reasoning pattern appears in tree balance proofs, heap analysis, hashing heuristics, and recurrence-based
                    system models.
                  </p>
                </section>
                <hr className="fib98-divider" />

                <section id="bp-history" className="fib98-section">
                  <h2 className="fib98-heading">Historical Context</h2>
                  <ul>
                    {history.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="fib98-divider" />

                <section id="bp-definition" className="fib98-section">
                  <h2 className="fib98-heading">Formal Definition</h2>
                  {formalDefinition.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="fib98-divider" />

                <section id="bp-why" className="fib98-section">
                  <h2 className="fib98-heading">Why This Matters</h2>
                  <ul>
                    {applications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="fib98-divider" />

                <section id="bp-takeaways" className="fib98-section">
                  <h2 className="fib98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="fib98-section">
                  <h2 className="fib98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="fib98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-breakdown" className="fib98-section">
                  <h2 className="fib98-heading">Recurrence Breakdown</h2>
                  {recurrenceBreakdown.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-algorithms" className="fib98-section">
                  <h2 className="fib98-heading">Algorithm Comparison</h2>
                  {algorithmComparison.map((block) => (
                    <div key={block.heading}>
                      <h3 className="fib98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-doubling" className="fib98-section">
                  <h2 className="fib98-heading">Fast Doubling Identities</h2>
                  {fastDoublingIdentities.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-matrix" className="fib98-section">
                  <h2 className="fib98-heading">Matrix View</h2>
                  {matrixView.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="fib98-section">
                  <h2 className="fib98-heading">Complexity and Trade-offs</h2>
                  <ul>
                    {complexityTradeoffs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="fib98-section">
                  <h2 className="fib98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-decisions" className="fib98-section">
                  <h2 className="fib98-heading">When To Use What</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="fib98-section">
                  <h2 className="fib98-heading">Advanced Insights</h2>
                  <ul>
                    {advancedInsights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="fib98-section">
                  <h2 className="fib98-heading">Worked Example (n = 7)</h2>
                  {workedExample.map((item) => (
                    <div key={item.title}>
                      <h3 className="fib98-subheading">{item.title}</h3>
                      <p className="fib98-preline">{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-code" className="fib98-section">
                  <h2 className="fib98-heading">Practical Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="fib98-subheading">{example.title}</h3>
                      <div className="fib98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="fib98-section">
                  <h2 className="fib98-heading">Glossary</h2>
                  {glossary.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-faq" className="fib98-section">
                  <h2 className="fib98-heading">Quick FAQ</h2>
                  {miniFaq.map((item) => (
                    <div key={item.question}>
                      <h3 className="fib98-subheading">{item.question}</h3>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
