import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Modular arithmetic in classical number theory',
    detail:
      'Fermat and Euler used modular powers to prove number theory results, motivating efficient exponentiation.',
  },
  {
    title: 'Fast powering appears in algorithms (1960s-1970s)',
    detail:
      'Binary exponentiation becomes a standard technique to reduce exponentiation from linear to logarithmic time.',
  },
  {
    title: 'Public key cryptography (1970s)',
    detail:
      'RSA and Diffie-Hellman rely on modular exponentiation with huge integers, making performance essential.',
  },
  {
    title: 'Big integer libraries (1990s-2000s)',
    detail:
      'Libraries optimize modular multiplication and exponentiation using Montgomery and sliding-window methods.',
  },
]

const mentalModels = [
  {
    title: 'Square-and-reduce',
    detail:
      'Exponentiation is just repeated squaring with modular reduction after every step.',
  },
  {
    title: 'Exponent in binary',
    detail:
      'Read the exponent bits and multiply the answer only when a bit is set.',
  },
  {
    title: 'Bounded growth',
    detail:
      'The modulus acts like a fence, keeping numbers from exploding in size.',
  },
  {
    title: 'Fast powering engine',
    detail:
      'Powering is the same core idea as fast doubling in Fibonacci or exponentiation by squaring in algebra.',
  },
]

const coreStatements = [
  {
    title: 'Modular reduction rule',
    detail:
      '(a * b) mod m = ((a mod m) * (b mod m)) mod m, so you can reduce at every step.',
  },
  {
    title: 'Exponentiation by squaring',
    detail:
      'Compute a^e by squaring and halving the exponent: O(log e) multiplications.',
  },
  {
    title: 'Binary decomposition',
    detail:
      'If e = sum of powers of two, then a^e is the product of the corresponding squared bases.',
  },
]

const notationTable = [
  { symbol: 'a', meaning: 'Base integer' },
  { symbol: 'e', meaning: 'Exponent (non-negative integer)' },
  { symbol: 'm', meaning: 'Modulus (positive integer)' },
  { symbol: 'result', meaning: 'Final value of a^e mod m' },
]

const constructionSteps = [
  {
    title: 'Binary modular exponentiation',
    detail: [
      'Set result = 1 and base = a mod m.',
      'While e > 0: if e is odd, result = (result * base) mod m.',
      'Set base = (base * base) mod m, e = floor(e / 2).',
      'When e = 0, result is a^e mod m.',
    ],
  },
  {
    title: 'Repeated squaring table',
    detail: [
      'Precompute a^(1), a^(2), a^(4), a^(8), ... by squaring.',
      'Multiply only the powers corresponding to 1 bits in e.',
      'Reduce modulo m after every multiplication.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'O(log e) multiplications and squarings. Each multiplication is modulo m.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra memory for iterative exponentiation.',
  },
  {
    title: 'Big integer cost',
    detail:
      'For large m, multiplication dominates. Use fast multiplication or Montgomery reduction for speed.',
  },
  {
    title: 'Precomputation tradeoff',
    detail:
      'Sliding-window methods precompute small powers to reduce multiplications at the cost of extra memory.',
  },
]

const realWorldUses = [
  {
    context: 'RSA encryption and decryption',
    detail:
      'Core RSA operations are modular exponentiations with large exponents and moduli.',
  },
  {
    context: 'Diffie-Hellman key exchange',
    detail:
      'Computes g^a mod p and g^b mod p efficiently to derive shared secrets.',
  },
  {
    context: 'Primality testing',
    detail:
      'Algorithms like Fermat and Miller-Rabin use modular exponentiation repeatedly.',
  },
  {
    context: 'Hashing and checksums',
    detail:
      'Rolling hash functions can use modular powers to update hash values quickly.',
  },
  {
    context: 'Competitive programming',
    detail:
      'Many problems require computing a^b mod m under large constraints.',
  },
  {
    context: 'Cryptographic protocols',
    detail:
      'Signatures, commitments, and zero-knowledge proofs often rely on modular powers.',
  },
]

const examples = [
  {
    title: 'Compute 7^13 mod 20',
    code: `Exponent bits: 13 = 1101 (binary)
Start: result = 1, base = 7 mod 20

e=13 (odd): result = 1*7 mod 20 = 7
base = 7^2 mod 20 = 49 mod 20 = 9
e=6

e=6 (even): result = 7
base = 9^2 mod 20 = 81 mod 20 = 1
e=3

e=3 (odd): result = 7*1 mod 20 = 7
base = 1^2 mod 20 = 1
e=1

e=1 (odd): result = 7*1 mod 20 = 7
e=0 -> done

Answer: 7`,
    explanation:
      'By reducing at each step, numbers stay small and the result is computed in O(log e) time.',
  },
  {
    title: 'Fast power template',
    code: `function modPow(a, e, m):
    result = 1
    base = a % m
    while e > 0:
        if e % 2 == 1:
            result = (result * base) % m
        base = (base * base) % m
        e = floor(e / 2)
    return result`,
    explanation:
      'This standard loop is the foundation for modular exponentiation in most libraries.',
  },
  {
    title: 'Negative base handling',
    code: `Compute (-3)^5 mod 11
Normalize base: (-3 mod 11) = 8
Compute 8^5 mod 11 = 10`,
    explanation:
      'Always normalize the base into [0, m-1] before exponentiation.',
  },
]

const pitfalls = [
  'Doing a^e first and taking mod at the end, which overflows quickly.',
  'Forgetting to reduce negative bases into the [0, m-1] range.',
  'Assuming modular exponentiation is fast without using log time methods.',
  'Using recursion without tail optimization on very large exponents.',
  'Mixing modulus 0 or negative moduli, which are undefined.',
]

const decisionGuidance = [
  'Use modular exponentiation when you need a^e mod m with large e.',
  'Prefer binary exponentiation for simplicity and speed.',
  'Use sliding-window or Montgomery methods for heavy cryptographic workloads.',
  'Normalize inputs to avoid sign issues and overflow.',
  'Use big integer types when m does not fit in native integers.',
]

const advancedInsights = [
  {
    title: 'Montgomery reduction',
    detail:
      'Avoids expensive division by converting to a Montgomery domain and using shifts and adds.',
  },
  {
    title: 'Sliding-window exponentiation',
    detail:
      'Precomputes odd powers to reduce the number of multiplications for large exponents.',
  },
  {
    title: 'Constant-time implementations',
    detail:
      'Crypto code uses regular control flow to avoid timing side channels.',
  },
  {
    title: 'Exponentiation chains',
    detail:
      'Optimized addition chains reduce multiplications further but are hard to find optimally.',
  },
  {
    title: 'CRT acceleration',
    detail:
      'For RSA, compute mod p and mod q, then recombine with CRT for a big speedup.',
  },
  {
    title: 'Modulus special forms',
    detail:
      'Mersenne and pseudo-Mersenne primes enable faster modular reductions.',
  },
]

const takeaways = [
  'Modular exponentiation keeps values bounded while computing huge powers.',
  'Binary exponentiation cuts time from O(e) to O(log e).',
  'Reduce after every multiplication to avoid overflow.',
  'Performance hinges on fast modular multiplication for big integers.',
  'Used everywhere in cryptography, primality testing, and hashing.',
]

const glossaryTerms = [
  {
    term: 'Modular exponentiation',
    definition:
      'The computation of a^e mod m using repeated squaring and reduction.',
  },
  {
    term: 'Binary exponentiation',
    definition:
      'A logarithmic-time powering method that processes exponent bits one by one.',
  },
  {
    term: 'Modular reduction',
    definition:
      'Replacing a value with its remainder modulo m to keep arithmetic bounded.',
  },
  {
    term: 'Montgomery reduction',
    definition:
      'A modular multiplication technique that avoids costly division in large-integer arithmetic.',
  },
  {
    term: 'Sliding-window method',
    definition:
      'A precomputation-based exponentiation strategy that trades memory for fewer multiplications.',
  },
  {
    term: 'CRT',
    definition:
      'The Chinese Remainder Theorem, used to accelerate RSA exponentiation by working modulo factors separately.',
  },
  {
    term: 'Constant-time implementation',
    definition:
      'An implementation style that avoids data-dependent timing variation to reduce side channels.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const modularHelpStyles = `
.modexp98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.modexp98-window {
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

.modexp98-titlebar {
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

.modexp98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.modexp98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.modexp98-control {
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

.modexp98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.modexp98-tab {
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

.modexp98-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.modexp98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.modexp98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.modexp98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.modexp98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.modexp98-toc-list li {
  margin: 0 0 8px;
}

.modexp98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.modexp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.modexp98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.modexp98-intro {
  margin: 0 0 16px;
}

.modexp98-section {
  margin: 0 0 20px;
}

.modexp98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.modexp98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.modexp98-content p,
.modexp98-content li,
.modexp98-content dt,
.modexp98-content dd,
.modexp98-table th,
.modexp98-table td {
  font-size: 12px;
  line-height: 1.5;
}

.modexp98-content p {
  margin: 0 0 10px;
}

.modexp98-content ul,
.modexp98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.modexp98-content dl {
  margin: 0;
}

.modexp98-content dt {
  font-weight: 700;
  margin: 0 0 2px;
}

.modexp98-content dd {
  margin: 0 0 10px 0;
}

.modexp98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.modexp98-table th,
.modexp98-table td {
  text-align: left;
  vertical-align: top;
  padding: 3px 10px 3px 0;
}

.modexp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.modexp98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.modexp98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .modexp98-titletext {
    position: static;
    transform: none;
    margin-right: auto;
    font-size: 14px;
  }

  .modexp98-main {
    grid-template-columns: 1fr;
  }

  .modexp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .modexp98-content {
    padding: 14px 14px 18px;
  }
}

@media (max-width: 560px) {
  .modexp98-tabs {
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

export default function ModularExponentiationPage(): JSX.Element {
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
    document.title = `Modular Exponentiation (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Modular Exponentiation',
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
    <div className="modexp98-page">
      <style>{modularHelpStyles}</style>
      <div className="modexp98-window" role="presentation">
        <header className="modexp98-titlebar">
          <span className="modexp98-titletext">Modular Exponentiation</span>
          <div className="modexp98-controls">
            <button className="modexp98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="modexp98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="modexp98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`modexp98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="modexp98-main">
          <aside className="modexp98-toc" aria-label="Table of contents">
            <h2 className="modexp98-toc-title">Contents</h2>
            <ul className="modexp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="modexp98-content">
            <h1 className="modexp98-doc-title">Modular Exponentiation</h1>
            <p className="modexp98-intro">
              Modular exponentiation computes a^e mod m efficiently by repeatedly squaring and reducing. It is the core
              primitive behind RSA, Diffie-Hellman, and primality tests, turning huge exponents into manageable loops.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="modexp98-section">
                  <h2 className="modexp98-heading">Overview</h2>
                  <p>
                    Naive exponentiation explodes in size, but modular arithmetic lets you reduce after every multiplication.
                    The result is a fast, safe method that runs in logarithmic time and keeps numbers bounded.
                  </p>
                  <p>
                    The rule (a * b) mod m = ((a mod m) * (b mod m)) mod m lets you reduce every step. This keeps
                    intermediate values small and protects against overflow.
                  </p>
                </section>

                <hr className="modexp98-divider" />

                <section id="bp-history" className="modexp98-section">
                  <h2 className="modexp98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="modexp98-divider" />

                <section id="bp-uses" className="modexp98-section">
                  <h2 className="modexp98-heading">Why It Matters</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="modexp98-divider" />

                <section id="bp-takeaways" className="modexp98-section">
                  <h2 className="modexp98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="modexp98-section">
                  <h2 className="modexp98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-theorem" className="modexp98-section">
                  <h2 className="modexp98-heading">Core Statements</h2>
                  {coreStatements.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-construction" className="modexp98-section">
                  <h2 className="modexp98-heading">How It Works</h2>
                  {constructionSteps.map((step) => (
                    <div key={step.title}>
                      <h3 className="modexp98-subheading">{step.title}</h3>
                      <ul>
                        {step.detail.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-complexity" className="modexp98-section">
                  <h2 className="modexp98-heading">Complexity</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    For 64-bit integers, modular exponentiation is fast. For 1024-bit or 2048-bit numbers, the
                    multiplication algorithm dominates, so optimized big-int math matters.
                  </p>
                </section>

                <section id="core-guidance" className="modexp98-section">
                  <h2 className="modexp98-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-pitfalls" className="modexp98-section">
                  <h2 className="modexp98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-advanced" className="modexp98-section">
                  <h2 className="modexp98-heading">Advanced Insights</h2>
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
                <section id="examples-worked" className="modexp98-section">
                  <h2 className="modexp98-heading">Worked Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="modexp98-subheading">{example.title}</h3>
                      <div className="modexp98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="examples-notes" className="modexp98-section">
                  <h2 className="modexp98-heading">Implementation Notes</h2>
                  <p>
                    The examples cover a worked bit-by-bit evaluation, the standard iterative template, and normalization of
                    a negative base before the loop starts.
                  </p>
                  <p>
                    In practice, use repeated squaring as the default, reduce after every multiplication, and switch to
                    Montgomery or sliding-window techniques for sustained cryptographic workloads.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-notation" className="modexp98-section">
                  <h2 className="modexp98-heading">Notation</h2>
                  <table className="modexp98-table">
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

                <section id="glossary-terms" className="modexp98-section">
                  <h2 className="modexp98-heading">Terms</h2>
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
