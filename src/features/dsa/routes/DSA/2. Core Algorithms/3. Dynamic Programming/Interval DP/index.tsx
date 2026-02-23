import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  'Interval DP optimizes over contiguous subarrays or substrings by splitting an interval into smaller intervals.',
  'The DP state is usually dp[l][r], representing the best value for the interval [l, r].',
  'Most recurrences choose a split k between l and r and combine dp[l][k] and dp[k+1][r].',
]

const formalDefinition = [
  {
    title: 'State',
    detail:
      'dp[l][r] is the optimal value for the subarray or substring from l to r (inclusive).',
  },
  {
    title: 'Transition',
    detail:
      'dp[l][r] = best over k in [l, r]: combine(dp[l][k], dp[k+1][r], cost(l, k, r)).',
  },
  {
    title: 'Order',
    detail:
      'Intervals are solved by increasing length so that smaller intervals are ready when a larger one is computed.',
  },
  {
    title: 'Base cases',
    detail:
      'Length 1 intervals usually cost 0 or value of a single element depending on the problem.',
  },
]

const mentalModels = [
  {
    title: 'Split the segment',
    detail:
      'Choose a final split point k. The optimal solution must end with one last split, so check them all.',
  },
  {
    title: 'Build by length',
    detail:
      'You cannot compute dp[l][r] until all shorter intervals inside it are done.',
  },
  {
    title: 'Combine with boundary cost',
    detail:
      'Many interval problems add a cost that depends on the endpoints and the split choice.',
  },
]

const recurrencePatterns = [
  {
    heading: 'Classic split (min or max)',
    bullets: [
      'dp[l][r] = min over k: dp[l][k] + dp[k+1][r] + cost(l, k, r).',
      'Used in matrix chain multiplication, optimal BST, merge stones.',
    ],
  },
  {
    heading: 'Choose last action inside interval',
    bullets: [
      'Pick the last item removed or added within [l, r] and combine left and right sides.',
      'Burst balloons and remove boxes use this view with boundary multipliers.',
    ],
  },
  {
    heading: 'Palindrome or partitioning',
    bullets: [
      'dp[l][r] depends on splitting at k when the interval is not a palindrome.',
      'Used in palindrome partition and string segmentation problems.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Define state and meaning',
    detail:
      'Decide what dp[l][r] represents and what the base case should return.',
  },
  {
    title: 'Pick transition',
    detail:
      'Choose the split rule or last-action rule and write the combine cost.',
  },
  {
    title: 'Loop by length',
    detail:
      'For len from 1..n, compute dp[l][r] for every interval of that length.',
  },
  {
    title: 'Read final answer',
    detail:
      'The result is usually dp[0][n-1] for the full interval.',
  },
]

const workedExample = [
  {
    title: 'Matrix chain dimensions',
    detail:
      'Matrices A, B, C with dims 10x30, 30x5, 5x60. dims = [10, 30, 5, 60].',
  },
  {
    title: 'Base cases',
    detail:
      'dp[i][i] = 0, a single matrix costs no multiplications.',
  },
  {
    title: 'Length 2',
    detail:
      'dp[0][1] = 10*30*5 = 1500. dp[1][2] = 30*5*60 = 9000.',
  },
  {
    title: 'Length 3',
    detail:
      'dp[0][2] = min( dp[0][0]+dp[1][2]+10*30*60, dp[0][1]+dp[2][2]+10*5*60 ) = min(27000, 4500) = 4500.',
  },
]

const problemGallery = [
  {
    heading: 'Matrix chain multiplication',
    bullets: [
      'Minimize scalar multiplications by choosing parenthesization.',
      'dp[l][r] = min dp[l][k] + dp[k+1][r] + dims[l]*dims[k+1]*dims[r+1].',
    ],
  },
  {
    heading: 'Burst balloons',
    bullets: [
      'Pick the last balloon to burst in [l, r].',
      'dp[l][r] = max dp[l][k-1] + dp[k+1][r] + a[l-1]*a[k]*a[r+1].',
    ],
  },
  {
    heading: 'Optimal BST',
    bullets: [
      'Pick root k and combine left and right costs.',
      'Add sum of probabilities for the interval as depth increases.',
    ],
  },
  {
    heading: 'Merge stones',
    bullets: [
      'Merge adjacent piles with cost equal to sum of weights.',
      'dp[l][r] = min dp[l][k] + dp[k+1][r] + sum(l, r).',
    ],
  },
  {
    heading: 'Palindrome partition',
    bullets: [
      'Min cuts to partition string into palindromes.',
      'dp[l][r] = 0 if palindrome else min dp[l][k] + dp[k+1][r] + 1.',
    ],
  },
  {
    heading: 'Strange game DP',
    bullets: [
      'Interval games often use dp[l][r] with max and min depending on turn.',
      'The split combines scores from left and right intervals.',
    ],
  },
]

const implementationNotes = [
  {
    title: 'Indexing',
    detail:
      'Use inclusive indices for clarity and be consistent about endpoints.',
  },
  {
    title: 'Infinity guards',
    detail:
      'Initialize dp with large values and take min or max carefully.',
  },
  {
    title: 'Prefix sums',
    detail:
      'Precompute sums for interval costs like merge stones.',
  },
  {
    title: 'Reconstruction',
    detail:
      'Store the best split k to rebuild the structure (tree, parentheses, cut points).',
  },
]

const complexityNotes = [
  {
    title: 'Typical complexity',
    detail:
      'Most interval DP runs in O(n^3) time and O(n^2) space because of the split loop.',
  },
  {
    title: 'When it is too slow',
    detail:
      'n around 500 or more can be heavy; consider optimizations or pruning.',
  },
  {
    title: 'Common optimizations',
    detail:
      'Knuth or quadrangle inequality optimizations can reduce some problems to O(n^2).',
  },
]

const optimizationPlaybook = [
  {
    title: 'Knuth optimization',
    detail:
      'If the optimal split indices are monotonic and quadrangle inequality holds, restrict k to a shrinking range.',
  },
  {
    title: 'Divide and conquer optimization',
    detail:
      'If the cost is convex or has monotone opt, compute dp rows in O(n log n).',
  },
  {
    title: 'Prune by constraints',
    detail:
      'If only certain k are valid (like merge piles in groups), skip invalid splits early.',
  },
]

const examples = [
  {
    title: 'Generic interval DP template',
    code: `function intervalDP(n):
    dp = matrix(n, n, +inf)
    for i in range(n):
        dp[i][i] = baseValue(i)

    for len in range(2, n + 1):
        for l in range(0, n - len + 1):
            r = l + len - 1
            for k in range(l, r):
                dp[l][r] = min(dp[l][r],
                               dp[l][k] + dp[k+1][r] + cost(l, k, r))
    return dp[0][n-1]`,
    explanation:
      'This is the classic split recurrence. Replace min with max or change cost to fit your problem.',
  },
  {
    title: 'Matrix chain multiplication',
    code: `function matrixChain(dims):
    n = len(dims) - 1
    dp = matrix(n, n, 0)
    for len in range(2, n + 1):
        for l in range(0, n - len + 1):
            r = l + len - 1
            dp[l][r] = +inf
            for k in range(l, r):
                cost = dp[l][k] + dp[k+1][r] + dims[l] * dims[k+1] * dims[r+1]
                dp[l][r] = min(dp[l][r], cost)
    return dp[0][n-1]`,
    explanation:
      'Parenthesization is chosen by selecting k. Storing k reconstructs the optimal order.',
  },
]

const pitfalls = [
  'Wrong loop order: computing dp[l][r] before its subintervals exist leads to garbage.',
  'Off-by-one mistakes with inclusive endpoints or dimension arrays.',
  'Forgetting to initialize dp with infinity for min problems.',
  'Not precomputing interval sums, leading to accidental O(n^4).',
  'Mixing up split meaning when using last-action formulations.',
]

const decisionGuidance = [
  'Use interval DP when the subproblem is defined on a contiguous segment and solutions combine by splitting.',
  'If the recurrence references dp[l][r] and dp[l][k] plus dp[k+1][r], you are in interval DP territory.',
  'If n is large, check whether an optimization (Knuth, divide and conquer) applies before coding.',
  'If the cost depends on interval sums, precompute prefix sums to keep transitions O(1).',
  'If you need the actual structure, store split indices for reconstruction.',
]

const advancedInsights = [
  'Interval DP often corresponds to building an optimal binary tree over the interval.',
  'Many problems can be reframed as choosing the last action, which avoids double counting costs.',
  'Semiring and algebraic views can unify interval DP with matrix chain and parsing algorithms.',
  'Some problems are solvable by monotone queue or convex hull instead of interval DP; compare constraints.',
  'The split index monotonicity property is the key to fast optimizations.',
]

const miniFaq = [
  {
    question: 'Why does length order matter?',
    answer:
      'The recurrence depends on shorter subintervals. Computing by increasing length guarantees they exist.',
  },
  {
    question: 'Should dp be inclusive or half-open?',
    answer:
      'Either works, but inclusive [l, r] is common. Stay consistent and test small cases.',
  },
  {
    question: 'How do I reconstruct the answer?',
    answer:
      'Store the best split k in a separate table and recursively rebuild the structure.',
  },
  {
    question: 'When is interval DP overkill?',
    answer:
      'If the structure is not contiguous or can be solved with a greedy or linear DP, interval DP adds unnecessary cost.',
  },
]

const takeaways = [
  'Interval DP is about optimizing contiguous segments by splitting them into smaller segments.',
  'The standard loop order is by length, then left index, then split index.',
  'Most problems are O(n^3) unless special structure allows optimization.',
  'Store split indices if you need to rebuild the optimal structure.',
  'Careful indexing and base cases are the difference between correct and broken DP.',
]

const glossary = [
  {
    term: 'Interval DP',
    definition:
      'Dynamic programming on contiguous ranges, usually represented by a two-dimensional state dp[l][r].',
  },
  {
    term: 'State dp[l][r]',
    definition:
      'The optimal value for subarray or substring from index l to r under the problem objective.',
  },
  {
    term: 'Split point k',
    definition:
      'An index where interval [l, r] is divided into left and right subintervals for combination.',
  },
  {
    term: 'Length-order traversal',
    definition:
      'Computing intervals in increasing length so dependencies on shorter segments are already solved.',
  },
  {
    term: 'Boundary cost',
    definition:
      'Extra transition term that depends on endpoints and possibly the split point, e.g. cost(l, k, r).',
  },
  {
    term: 'Knuth optimization',
    definition:
      'An optimization that narrows the split search range when monotonicity and quadrangle conditions hold.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const interval98HelpStyles = `
.interval98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.interval98-window {
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

.interval98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.interval98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.interval98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.interval98-control {
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

.interval98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.interval98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.interval98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.interval98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.interval98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.interval98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.interval98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.interval98-toc-list li {
  margin: 0 0 8px;
}

.interval98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.interval98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.interval98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.interval98-section {
  margin: 0 0 20px;
}

.interval98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.interval98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 12px 0 6px;
}

.interval98-content p,
.interval98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.interval98-content p {
  margin: 0 0 10px;
}

.interval98-content ul,
.interval98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.interval98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.interval98-preline {
  white-space: pre-line;
}

.interval98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.interval98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .interval98-main {
    grid-template-columns: 1fr;
  }

  .interval98-toc {
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
    { id: 'bp-definition', label: 'Formal Definition' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-patterns', label: 'Recurrence Patterns' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-gallery', label: 'Problem Gallery' },
    { id: 'core-impl', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-optimization', label: 'Optimization Playbook' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When To Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Practical Examples' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-faq', label: 'Quick FAQ' },
  ],
}

export default function IntervalDPPage(): JSX.Element {
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
    document.title = `Interval DP (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Interval DP',
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
    <div className="interval98-help-page">
      <style>{interval98HelpStyles}</style>
      <div className="interval98-window" role="presentation">
        <header className="interval98-titlebar">
          <span className="interval98-title-text">Interval DP</span>
          <div className="interval98-title-controls">
            <button className="interval98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="interval98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="interval98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`interval98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="interval98-main">
          <aside className="interval98-toc" aria-label="Table of contents">
            <h2 className="interval98-toc-title">Contents</h2>
            <ul className="interval98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="interval98-content">
            <h1 className="interval98-doc-title">Interval DP</h1>
            <p>
              Interval DP is the template for problems where the optimal solution for a segment is built by choosing a split inside
              that segment. It appears in matrix chain multiplication, merge-style costs, string cuts, and game intervals.
            </p>
            <p>
              This page keeps the full concept set: formal state and transitions, recurrence patterns, algorithm order, worked
              examples, implementation details, and optimization guidance.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="interval98-section">
                  <h2 className="interval98-heading">Overview</h2>
                  <ul>
                    {bigPicture.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="interval98-divider" />

                <section id="bp-definition" className="interval98-section">
                  <h2 className="interval98-heading">Formal Definition</h2>
                  {formalDefinition.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="interval98-divider" />

                <section id="bp-models" className="interval98-section">
                  <h2 className="interval98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="interval98-divider" />

                <section id="bp-takeaways" className="interval98-section">
                  <h2 className="interval98-heading">Key Takeaways</h2>
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
                <section id="core-patterns" className="interval98-section">
                  <h2 className="interval98-heading">Recurrence Patterns</h2>
                  {recurrencePatterns.map((block) => (
                    <div key={block.heading}>
                      <h3 className="interval98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-steps" className="interval98-section">
                  <h2 className="interval98-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-gallery" className="interval98-section">
                  <h2 className="interval98-heading">Problem Gallery</h2>
                  {problemGallery.map((block) => (
                    <div key={block.heading}>
                      <h3 className="interval98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-impl" className="interval98-section">
                  <h2 className="interval98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="interval98-section">
                  <h2 className="interval98-heading">Complexity and Trade-offs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-optimization" className="interval98-section">
                  <h2 className="interval98-heading">Optimization Playbook</h2>
                  {optimizationPlaybook.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="interval98-section">
                  <h2 className="interval98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-decisions" className="interval98-section">
                  <h2 className="interval98-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="interval98-section">
                  <h2 className="interval98-heading">Advanced Insights</h2>
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
                <section id="ex-worked" className="interval98-section">
                  <h2 className="interval98-heading">Worked Example (Matrix Chain)</h2>
                  {workedExample.map((item) => (
                    <div key={item.title}>
                      <h3 className="interval98-subheading">{item.title}</h3>
                      <p className="interval98-preline">{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-code" className="interval98-section">
                  <h2 className="interval98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="interval98-subheading">{example.title}</h3>
                      <div className="interval98-codebox">
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
                <section id="glossary-terms" className="interval98-section">
                  <h2 className="interval98-heading">Glossary</h2>
                  {glossary.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-faq" className="interval98-section">
                  <h2 className="interval98-heading">Quick FAQ</h2>
                  {miniFaq.map((item) => (
                    <div key={item.question}>
                      <h3 className="interval98-subheading">{item.question}</h3>
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
