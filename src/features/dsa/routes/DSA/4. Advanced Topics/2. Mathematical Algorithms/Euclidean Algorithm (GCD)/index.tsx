import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Euclid formalizes gcd (c. 300 BCE)',
    detail:
      'Elements, Book VII introduces the classic method for finding the greatest common divisor via repeated division.',
  },
  {
    title: 'Extended Euclidean Algorithm (Middle Ages)',
    detail:
      'Mathematicians generalize the method to compute coefficients for Bezout identity, enabling modular inverses.',
  },
  {
    title: 'Number theory foundations (1800s)',
    detail:
      'Gauss and others use gcd as a core tool in modular arithmetic and congruence theory.',
  },
  {
    title: 'Modern computing adoption (1900s)',
    detail:
      'GCD becomes a standard primitive in libraries, used in cryptography, rational arithmetic, and algorithms.',
  },
]

const mentalModels = [
  {
    title: 'Repeated remainder shaving',
    detail:
      'Each step replaces the larger number with the remainder, shaving off multiples until only the gcd remains.',
  },
  {
    title: 'Common measure tape',
    detail:
      'If two lengths can be measured by a single tape length, the gcd is the longest such tape that fits both exactly.',
  },
  {
    title: 'Reduction funnel',
    detail:
      'The algorithm funnels big numbers down into smaller and smaller pairs without changing the gcd.',
  },
  {
    title: 'Back-substitution scaffold',
    detail:
      'Every remainder is a linear combination of the original numbers, enabling the extended algorithm.',
  },
]

const coreStatements = [
  {
    title: 'GCD invariance',
    detail:
      'gcd(a, b) = gcd(b, a mod b). Replacing (a, b) with (b, a mod b) preserves the gcd.',
  },
  {
    title: 'Termination',
    detail:
      'The sequence of remainders strictly decreases and reaches zero, making the last non-zero remainder the gcd.',
  },
  {
    title: 'Bezout identity',
    detail:
      'There exist integers x and y such that ax + by = gcd(a, b). Extended Euclid finds them.',
  },
]

const notationTable = [
  { symbol: 'a, b', meaning: 'Input integers (assume non-negative)' },
  { symbol: 'r', meaning: 'Remainder when dividing a by b' },
  { symbol: 'g', meaning: 'Greatest common divisor of a and b' },
  { symbol: 'x, y', meaning: 'Bezout coefficients: ax + by = g' },
]

const constructionSteps = [
  {
    title: 'Basic Euclidean Algorithm',
    detail: [
      'Given a and b with a >= b >= 0.',
      'While b != 0: set (a, b) = (b, a mod b).',
      'When b = 0, the gcd is a.',
    ],
  },
  {
    title: 'Extended Euclidean Algorithm',
    detail: [
      'Track coefficients (x, y) so each remainder is a linear combination of original inputs.',
      'When the remainder reaches 0, the previous coefficients give Bezout identity.',
      'Use the coefficients to compute modular inverses when gcd is 1.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Runs in O(log min(a, b)) steps. Each step is a division, making it very fast in practice.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra space for iterative gcd; O(1) or O(log n) for extended variants depending on implementation.',
  },
  {
    title: 'Worst case inputs',
    detail:
      'Consecutive Fibonacci numbers maximize the number of iterations, explaining the logarithmic bound.',
  },
  {
    title: 'Big integer considerations',
    detail:
      'Division dominates runtime when numbers are huge. Efficient big-int division matters in crypto code.',
  },
]

const realWorldUses = [
  {
    context: 'Fraction simplification',
    detail:
      'Reduce rational numbers by dividing numerator and denominator by gcd.',
  },
  {
    context: 'Modular arithmetic',
    detail:
      'Extended gcd computes modular inverses, required for CRT and RSA key operations.',
  },
  {
    context: 'Cryptography',
    detail:
      'Detect non-coprime keys, compute inverses, and speed up algorithms with gcd checks.',
  },
  {
    context: 'Scheduling and cycles',
    detail:
      'GCD and LCM determine when periodic events overlap.',
  },
  {
    context: 'Geometry and grids',
    detail:
      'Use gcd to step through lattice points and reduce direction vectors.',
  },
  {
    context: 'Hashing and sharding',
    detail:
      'Ensure uniform cycles by verifying moduli are coprime with gcd.',
  },
]

const examples = [
  {
    title: 'Compute gcd(252, 105)',
    code: `252 = 105 * 2 + 42
105 = 42 * 2 + 21
42 = 21 * 2 + 0

gcd = 21`,
    explanation:
      'The last non-zero remainder is 21, so gcd(252, 105) = 21.',
  },
  {
    title: 'Extended Euclid for inverse',
    code: `Find inverse of 17 mod 3120:
3120 = 17 * 183 + 9
17 = 9 * 1 + 8
9 = 8 * 1 + 1
8 = 1 * 8 + 0

Back substitute:
1 = 9 - 8
1 = 9 - (17 - 9) = 2*9 - 17
1 = 2*(3120 - 17*183) - 17 = 2*3120 - 17*367

So inverse of 17 mod 3120 is -367 mod 3120 = 2753`,
    explanation:
      'Since gcd(17, 3120) = 1, the inverse exists. The coefficient of 17 gives the inverse modulo 3120.',
  },
  {
    title: 'Fast gcd loop (iterative)',
    code: `function gcd(a, b):
    while b != 0:
        (a, b) = (b, a % b)
    return a`,
    explanation:
      'The iterative form uses constant memory and is the standard gcd primitive in most libraries.',
  },
]

const pitfalls = [
  'Forgetting to handle negative inputs by normalizing to non-negative values.',
  'Assuming gcd(0, b) is undefined; it equals |b|.',
  'Returning the wrong coefficient from extended gcd when computing inverses.',
  'Overflow when using recursion with very deep stacks (rare but possible).',
  'Confusing gcd with lcm; lcm(a, b) = |a*b| / gcd(a, b).',
]

const decisionGuidance = [
  'Use Euclidean Algorithm whenever you need gcd or coprimality checks.',
  'Use extended Euclid when you need modular inverses or Bezout coefficients.',
  'Prefer iterative gcd for speed and stack safety.',
  'Normalize inputs to non-negative for predictable behavior.',
  'Use big integer libraries when inputs exceed native range.',
]

const advancedInsights = [
  {
    title: 'Binary GCD (Stein algorithm)',
    detail:
      'Replaces division with shifts and subtraction, useful on hardware where division is expensive.',
  },
  {
    title: 'GCD in polynomials',
    detail:
      'The Euclidean Algorithm generalizes to polynomials, enabling factorization and algebraic simplification.',
  },
  {
    title: 'GCD and lattice basis',
    detail:
      'Bezout coefficients correspond to integer combinations that can be interpreted as lattice vectors.',
  },
  {
    title: 'Batch gcd optimization',
    detail:
      'Use prefix and suffix gcd arrays to answer gcd range queries in O(1).',
  },
  {
    title: 'Extended gcd for CRT',
    detail:
      'CRT solvers use extended gcd to merge congruences and to compute modular inverses.',
  },
  {
    title: 'Coprime probability',
    detail:
      'The probability that two random integers are coprime is 6 / pi^2, shaping expected gcd behavior.',
  },
]

const takeaways = [
  'Euclidean Algorithm is the fastest path to gcd, using repeated remainders.',
  'Extended Euclid gives Bezout coefficients and modular inverses.',
  'Runtime is logarithmic in the input size, even in the worst case.',
  'Normalize inputs and handle zeros to avoid edge case bugs.',
  'GCD is foundational across number theory, crypto, and algorithm design.',
]

const glossaryTerms = [
  {
    term: 'Greatest common divisor (gcd)',
    definition:
      'The largest integer that divides two numbers without a remainder.',
  },
  {
    term: 'Remainder',
    definition:
      'The value left after dividing a by b, written here as a mod b.',
  },
  {
    term: 'Bezout identity',
    definition:
      'A relation of the form ax + by = gcd(a, b), with integers x and y.',
  },
  {
    term: 'Modular inverse',
    definition:
      'A value that multiplies with a number to produce 1 modulo another number, available when gcd is 1.',
  },
  {
    term: 'Coprime',
    definition:
      'Two integers whose gcd is 1.',
  },
  {
    term: 'LCM',
    definition:
      'The least common multiple, related by lcm(a, b) = |a*b| / gcd(a, b).',
  },
  {
    term: 'CRT',
    definition:
      'The Chinese Remainder Theorem, which relies on modular inverses and extended gcd to merge congruences.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const euclidHelpStyles = `
.euclid98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.euclid98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.euclid98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  min-height: 24px;
}

.euclid98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.euclid98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.euclid98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.euclid98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.euclid98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.euclid98-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.euclid98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.euclid98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.euclid98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.euclid98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.euclid98-toc-list li {
  margin: 0 0 8px;
}

.euclid98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.euclid98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.euclid98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.euclid98-intro {
  margin: 0 0 16px;
}

.euclid98-section {
  margin: 0 0 20px;
}

.euclid98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.euclid98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.euclid98-content p,
.euclid98-content li,
.euclid98-content dt,
.euclid98-content dd,
.euclid98-table th,
.euclid98-table td {
  font-size: 12px;
  line-height: 1.5;
}

.euclid98-content p {
  margin: 0 0 10px;
}

.euclid98-content ul,
.euclid98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.euclid98-content dl {
  margin: 0;
}

.euclid98-content dt {
  font-weight: 700;
  margin: 0 0 2px;
}

.euclid98-content dd {
  margin: 0 0 10px 0;
}

.euclid98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.euclid98-table th,
.euclid98-table td {
  text-align: left;
  vertical-align: top;
  padding: 3px 10px 3px 0;
}

.euclid98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.euclid98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.euclid98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .euclid98-titletext {
    position: static;
    transform: none;
    margin-right: auto;
    font-size: 14px;
  }

  .euclid98-main {
    grid-template-columns: 1fr;
  }

  .euclid98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .euclid98-content {
    padding: 14px 14px 18px;
  }
}

@media (max-width: 560px) {
  .euclid98-tabs {
    flex-wrap: wrap;
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
    { id: 'bp-uses', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-theorem', label: 'Core Statements' },
    { id: 'core-construction', label: 'How It Works' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-guidance', label: 'When To Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
    { id: 'examples-notes', label: 'Implementation Notes' },
  ],
  glossary: [
    { id: 'glossary-notation', label: 'Notation' },
    { id: 'glossary-terms', label: 'Terms' },
  ],
}

export default function EuclideanAlgorithmGCDPage(): JSX.Element {
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
    document.title = `Euclidean Algorithm (GCD) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Euclidean Algorithm (GCD)',
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
    <div className="euclid98-page">
      <style>{euclidHelpStyles}</style>
      <div className="euclid98-window" role="presentation">
        <header className="euclid98-titlebar">
          <span className="euclid98-titletext">Euclidean Algorithm (GCD)</span>
          <div className="euclid98-controls">
            <button className="euclid98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="euclid98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="euclid98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`euclid98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="euclid98-main">
          <aside className="euclid98-toc" aria-label="Table of contents">
            <h2 className="euclid98-toc-title">Contents</h2>
            <ul className="euclid98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="euclid98-content">
            <h1 className="euclid98-doc-title">Euclidean Algorithm (GCD)</h1>
            <p className="euclid98-intro">
              The Euclidean Algorithm computes gcd(a, b) by repeated division. It is one of the oldest algorithms still used
              today because it is simple, fast, and foundational. Its extended form also produces Bezout coefficients needed
              for modular inverses and CRT.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="euclid98-section">
                  <h2 className="euclid98-heading">Overview</h2>
                  <p>
                    GCD is the largest integer that divides two numbers without a remainder. Euclid showed that the gcd stays
                    the same when you replace the larger number with its remainder by the smaller. That single invariant powers
                    an algorithm that shrinks numbers quickly and deterministically.
                  </p>
                  <p>
                    The algorithm is a fast, reliable computation of the greatest common divisor and a bridge to number-theory
                    tools such as modular inverses, CRT, coprimality checks, and rational simplification.
                  </p>
                </section>

                <hr className="euclid98-divider" />

                <section id="bp-history" className="euclid98-section">
                  <h2 className="euclid98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="euclid98-divider" />

                <section id="bp-uses" className="euclid98-section">
                  <h2 className="euclid98-heading">Why It Matters</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="euclid98-divider" />

                <section id="bp-takeaways" className="euclid98-section">
                  <h2 className="euclid98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="euclid98-section">
                  <h2 className="euclid98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-theorem" className="euclid98-section">
                  <h2 className="euclid98-heading">Core Statements</h2>
                  {coreStatements.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-construction" className="euclid98-section">
                  <h2 className="euclid98-heading">How It Works</h2>
                  {constructionSteps.map((step) => (
                    <div key={step.title}>
                      <h3 className="euclid98-subheading">{step.title}</h3>
                      <ul>
                        {step.detail.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p>
                    The extended variant is the bridge from gcd to modular inverses. When gcd(a, b) = 1, the coefficient of a
                    in Bezout identity is the inverse of a modulo b.
                  </p>
                </section>

                <section id="core-complexity" className="euclid98-section">
                  <h2 className="euclid98-heading">Complexity</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    For fixed-size integers, gcd is effectively constant time. For big integers, runtime is dominated by
                    division and the number of steps grows only logarithmically.
                  </p>
                </section>

                <section id="core-guidance" className="euclid98-section">
                  <h2 className="euclid98-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-pitfalls" className="euclid98-section">
                  <h2 className="euclid98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-advanced" className="euclid98-section">
                  <h2 className="euclid98-heading">Advanced Insights</h2>
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
                <section id="examples-worked" className="euclid98-section">
                  <h2 className="euclid98-heading">Worked Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="euclid98-subheading">{example.title}</h3>
                      <div className="euclid98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="examples-notes" className="euclid98-section">
                  <h2 className="euclid98-heading">Implementation Notes</h2>
                  <p>
                    The worked examples show three common uses: repeated remainder reduction, extended Euclid for a modular
                    inverse, and the standard iterative loop used in most libraries.
                  </p>
                  <p>
                    In practice, prefer the iterative form for speed and stack safety, normalize inputs before the loop, and
                    switch to big integer support when native arithmetic is too small.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-notation" className="euclid98-section">
                  <h2 className="euclid98-heading">Notation</h2>
                  <table className="euclid98-table">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notationTable.map((row) => (
                        <tr key={row.symbol}>
                          <td>{row.symbol}</td>
                          <td>{row.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <section id="glossary-terms" className="euclid98-section">
                  <h2 className="euclid98-heading">Terms</h2>
                  <dl>
                    {glossaryTerms.map((item) => (
                      <div key={item.term}>
                        <dt>{item.term}</dt>
                        <dd>{item.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
