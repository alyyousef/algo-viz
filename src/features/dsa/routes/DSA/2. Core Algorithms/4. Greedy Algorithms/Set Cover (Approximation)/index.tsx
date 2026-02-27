import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Set Cover formalized as NP-hard (1972)',
    detail:
      'Richard Karp listed Set Cover among the classic NP-complete problems, establishing it as a benchmark for approximation algorithms.',
  },
  {
    title: 'Greedy approximation bound by Chvatal (1979)',
    detail:
      'The greedy rule that picks the most uncovered elements per step is proven to achieve an H_n approximation, where n is the universe size.',
  },
  {
    title: 'Hardness near ln n (1998)',
    detail:
      'Feige showed that, unless P=NP, no polynomial-time algorithm can guarantee a better approximation than (1 - o(1)) ln n.',
  },
  {
    title: 'Modern large-scale uses (2000s+)',
    detail:
      'Set Cover models sensor placement, test suite minimization, and feature selection, making greedy approximations standard in practice.',
  },
]

const mentalModels = [
  {
    title: 'Coupons and baskets',
    detail:
      'Each element is a coupon you must collect; each set is a basket of coupons. Greedy keeps picking the basket that adds the most new coupons.',
  },
  {
    title: 'Price per uncovered element',
    detail:
      'If sets are weighted, think of cost divided by new coverage. Greedy chooses the cheapest price per newly covered element.',
  },
  {
    title: 'Covering a map with beacons',
    detail:
      'Imagine placing towers to cover points on a map. Each tower covers a region; greedy places the tower that lights up the most dark points.',
  },
]

const coreConcepts = [
  {
    heading: 'Problem definition',
    bullets: [
      'Universe U: the elements that must be covered.',
      'Collection of sets S1...Sk where each Si is a subset of U.',
      'Goal: pick the smallest number of sets whose union equals U.',
      'Weighted variant: each set has a cost; goal is minimum total cost.',
    ],
  },
  {
    heading: 'Greedy rule',
    bullets: [
      'Repeatedly choose the set that covers the most uncovered elements.',
      'For weighted cover, choose the best ratio: cost / newly covered elements.',
      'Stop when all elements are covered or no progress is possible.',
    ],
  },
  {
    heading: 'Why approximation matters',
    bullets: [
      'Exact solutions are exponential in the worst case (NP-hard).',
      'Greedy is fast and simple with a provable bound.',
      'Worst-case gap is logarithmic; often close to optimal in practice.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Initialize',
    detail:
      'Start with all elements uncovered and an empty solution. Track which elements are covered and how many new ones each set would add.',
  },
  {
    title: 'Pick best set',
    detail:
      'Choose the set that covers the largest number of uncovered elements. If weighted, maximize newly covered per unit cost.',
  },
  {
    title: 'Update coverage',
    detail:
      'Mark the chosen set as selected and remove its elements from the uncovered pool. Recompute coverage gains for remaining sets.',
  },
  {
    title: 'Terminate',
    detail:
      'Stop when all elements are covered or no remaining set adds new elements. The selected sets are the greedy solution.',
  },
]

const approximationNotes = [
  {
    title: 'Harmonic approximation',
    detail:
      'Greedy achieves at most H_n times the optimum, where H_n = 1 + 1/2 + ... + 1/n.',
  },
  {
    title: 'Tight up to constants',
    detail:
      'No polynomial-time algorithm can beat (1 - o(1)) ln n unless P = NP, so greedy is near the best possible in theory.',
  },
  {
    title: 'Weighted guarantee',
    detail:
      'The same H_n bound applies to the weighted variant when using cost-per-new-element greedy.',
  },
  {
    title: 'Practical behavior',
    detail:
      'Real-world instances often have structure (overlaps, clusters) that make greedy solutions close to optimal.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Naive implementation: O(k * n) per iteration. With k sets and n elements, worst-case O(k * n * log n) if using a heap.',
  },
  {
    title: 'Space cost',
    detail:
      'Store sets as bitsets or boolean arrays for fast membership tests. Space O(k * n) in dense form, less with sparse lists.',
  },
  {
    title: 'Optimization tips',
    detail:
      'Use bitsets and popcount for fast coverage updates. Maintain uncovered elements and recompute only affected sets.',
  },
]

const realWorldUses = [
  {
    context: 'Test suite minimization',
    detail:
      'Each test covers a set of code paths. Greedy picks tests that cover the most uncovered paths to reduce runtime while retaining coverage.',
  },
  {
    context: 'Sensor placement',
    detail:
      'Sensors cover regions or targets. The goal is to place the fewest sensors that cover all points of interest.',
  },
  {
    context: 'Feature selection',
    detail:
      'Each feature explains or covers a subset of requirements. Greedy picks the most informative features under a budget.',
  },
  {
    context: 'Data summarization',
    detail:
      'Select a small set of representative items that cover key topics or elements in a dataset.',
  },
]

const examples = [
  {
    title: 'Worked example (unweighted)',
    code: `Universe U = {1,2,3,4,5,6,7,8}
Sets:
  A = {1,2,3,4}
  B = {3,4,5}
  C = {5,6,7}
  D = {7,8}
  E = {2,8}

Greedy steps:
  Pick A (covers 4 new elements)
  Remaining uncovered = {5,6,7,8}
  Pick C (covers 3 new elements)
  Remaining uncovered = {8}
  Pick D or E (covers 1 new element)
Solution = {A, C, D} (or {A, C, E})`,
    explanation:
      'Greedy chooses the largest new coverage each step. It uses three sets here, which is optimal for this instance.',
  },
  {
    title: 'Weighted variant intuition',
    code: `Weighted sets (cost in brackets):
  A = {1,2,3,4} [4]
  B = {3,4,5} [2]
  C = {5,6,7} [2]
  D = {7,8} [1]
  E = {2,8} [1]

Greedy ratio = cost / newly covered:
  A: 4/4 = 1.0
  B: 2/3 = 0.67
  C: 2/3 = 0.67
  D: 1/2 = 0.5
Pick D first, then recompute ratios.`,
    explanation:
      'Weighted greedy chooses the lowest cost per new element. This often differs from the unweighted choice and leads to cheaper solutions.',
  },
  {
    title: 'Greedy pseudocode',
    code: `function greedySetCover(U, sets):
    covered = empty set
    chosen = []
    while covered != U:
        best = null
        bestGain = 0
        for s in sets:
            gain = |s - covered|
            if gain > bestGain:
                bestGain = gain
                best = s
        if bestGain == 0: break
        chosen.append(best)
        covered = covered union best
    return chosen`,
    explanation:
      'The core loop evaluates how many new elements each set adds, then chooses the best. Weighted versions replace gain with gain per cost.',
  },
]

const pitfalls = [
  'Forgetting to recompute gains after adding a set, which makes later choices incorrect.',
  'Using raw set size instead of newly covered size, which overestimates redundant sets.',
  'Ignoring weights in the weighted variant; the correct rule is cost per new element.',
  'Stopping too early when the remaining uncovered elements are in disjoint or rare sets.',
  'Assuming greedy is optimal; it is an approximation with a provable bound.',
]

const decisionGuidance = [
  'Use greedy when exact optimization is too slow and you need a solution quickly.',
  'Prefer greedy when universe size is large and sets overlap heavily.',
  'Use weighted greedy when costs differ; avoid unweighted heuristics in that case.',
  'If you need exact minimum, switch to integer programming or branch and bound.',
  'If coverage is optional or partial, consider maximum coverage or budgeted variants.',
]

const advancedInsights = [
  {
    title: 'Dual fitting intuition',
    detail:
      'The H_n bound can be understood via dual fitting: greedy assigns a price to each covered element and the total price upper-bounds the greedy cost.',
  },
  {
    title: 'Bitset acceleration',
    detail:
      'Represent each set as a bitset and use popcount to compute gain quickly. This reduces iteration time in dense universes.',
  },
  {
    title: 'Lazy evaluation',
    detail:
      'Maintain a max-heap of sets by gain. Recompute gain only when a set rises to the top to avoid scanning every set each step.',
  },
  {
    title: 'Tight instances',
    detail:
      'There are instances where greedy returns about ln n times the optimal number of sets, matching the theoretical bound.',
  },
]

const takeaways = [
  'Set Cover is NP-hard, so approximation is the practical default.',
  'Greedy is simple, fast, and nearly optimal in a theoretical sense.',
  'Correctness relies on counting only newly covered elements each step.',
  'Weighted and unweighted versions use different selection criteria.',
]

const quickGlossary = [
  {
    term: 'Set cover',
    definition: 'Choose sets whose union covers all required elements.',
  },
  {
    term: 'Universe U',
    definition: 'The full set of elements that must be covered.',
  },
  {
    term: 'Gain',
    definition: 'Number of newly covered elements a candidate set adds.',
  },
  {
    term: 'Weighted set cover',
    definition: 'Variant where each set has a cost; choose by cost per new coverage.',
  },
  {
    term: 'Harmonic number H_n',
    definition: 'Approximation factor bound for greedy, with H_n <= 1 + ln(n).',
  },
  {
    term: 'Approximation algorithm',
    definition: 'Polynomial-time method with provable bound relative to optimal.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const setCoverHelpStyles = `
.set-cover-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.set-cover-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.set-cover-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.set-cover-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.set-cover-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.set-cover-control {
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

.set-cover-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.set-cover-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.set-cover-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.set-cover-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.set-cover-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.set-cover-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.set-cover-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.set-cover-toc-list li {
  margin: 0 0 8px;
}

.set-cover-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.set-cover-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.set-cover-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.set-cover-section {
  margin: 0 0 20px;
}

.set-cover-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.set-cover-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.set-cover-content p,
.set-cover-content li {
  font-size: 12px;
  line-height: 1.5;
}

.set-cover-content p {
  margin: 0 0 10px;
}

.set-cover-content ul,
.set-cover-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.set-cover-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.set-cover-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.set-cover-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .set-cover-main {
    grid-template-columns: 1fr;
  }

  .set-cover-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-approach', label: 'How the Greedy Approach Works' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-guarantees', label: 'Approximation Guarantees' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-comparison', label: 'Greedy vs Exact' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SetCoverApproximationPage(): JSX.Element {
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
    document.title = `Set Cover (Approximation) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Set Cover (Approximation)',
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
    <div className="set-cover-help-page">
      <style>{setCoverHelpStyles}</style>
      <div className="set-cover-window" role="presentation">
        <header className="set-cover-titlebar">
          <span className="set-cover-title">Set Cover (Approximation)</span>
          <div className="set-cover-controls">
            <button className="set-cover-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="set-cover-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="set-cover-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`set-cover-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="set-cover-main">
          <aside className="set-cover-toc" aria-label="Table of contents">
            <h2 className="set-cover-toc-title">Contents</h2>
            <ul className="set-cover-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="set-cover-content">
            <h1 className="set-cover-doc-title">Set Cover (Approximation)</h1>
            <p>
              Greedy selection for a classic NP-hard covering problem. Set Cover asks for the smallest collection of sets whose union
              covers every element in a universe. The exact solution is NP-hard, but the greedy approximation is fast, intuitive, and
              has a tight theoretical guarantee. This page explains the problem definition, the greedy rule, why it works, and how to
              implement it responsibly.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="set-cover-section">
                  <h2 className="set-cover-heading">Overview</h2>
                  <p>
                    Set Cover models decisions where each action covers multiple requirements and you want the fewest actions overall.
                    The greedy approximation repeatedly chooses the most valuable set at the moment, guaranteeing a solution within a
                    logarithmic factor of the optimal size.
                  </p>
                </section>
                <hr className="set-cover-divider" />
                <section id="bp-history" className="set-cover-section">
                  <h2 className="set-cover-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="set-cover-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="set-cover-section">
                  <h2 className="set-cover-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="set-cover-section">
                  <h2 className="set-cover-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="set-cover-section">
                  <h2 className="set-cover-heading">Key Takeaways</h2>
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
                <section id="core-approach" className="set-cover-section">
                  <h2 className="set-cover-heading">How It Works: The Greedy Approach</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="set-cover-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-steps" className="set-cover-section">
                  <h2 className="set-cover-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The key invariant: each step must measure only newly covered elements. Counting already covered elements makes
                    greedy appear better than it is and breaks the approximation guarantee.
                  </p>
                </section>
                <section id="core-guarantees" className="set-cover-section">
                  <h2 className="set-cover-heading">Approximation Guarantees</h2>
                  {approximationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <div className="set-cover-codebox">
                    <code>{'H_n = 1 + 1/2 + 1/3 + ... + 1/n  <=  1 + ln(n)'}</code>
                  </div>
                  <p>
                    This harmonic bound quantifies how far greedy can be from optimal. The bound is tight up to constants, which is
                    why greedy remains a gold standard for approximation.
                  </p>
                </section>
                <section id="core-complexity" className="set-cover-section">
                  <h2 className="set-cover-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Greedy is often I/O and memory bound. Bitsets, sparse lists, and incremental gain updates can make the difference
                    between a toy implementation and a production-quality solver.
                  </p>
                </section>
                <section id="core-comparison" className="set-cover-section">
                  <h2 className="set-cover-heading">Greedy vs Optimal (Quick Intuition)</h2>
                  <p><strong>Quality:</strong> Greedy is within H_n factor of optimal; exact optimization returns the optimum.</p>
                  <p><strong>Runtime:</strong> Greedy is polynomial and fast; exact methods are exponential in the worst case.</p>
                  <p><strong>Practical scale:</strong> Greedy works well on large universes; exact methods fit small to medium instances.</p>
                </section>
                <section id="core-pitfalls" className="set-cover-section">
                  <h2 className="set-cover-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="set-cover-section">
                  <h2 className="set-cover-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="set-cover-section">
                  <h2 className="set-cover-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="set-cover-section">
                <h2 className="set-cover-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="set-cover-subheading">{example.title}</h3>
                    <div className="set-cover-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="set-cover-section">
                <h2 className="set-cover-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
