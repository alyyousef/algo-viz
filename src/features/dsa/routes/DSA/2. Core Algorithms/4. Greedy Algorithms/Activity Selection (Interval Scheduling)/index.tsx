import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1950s: Early interval scheduling in operations research',
    detail:
      'Scheduling non-overlapping tasks on a single machine motivated greedy ordering by finish times.',
  },
  {
    title: '1970s: Greedy strategy formalized',
    detail:
      'Proofs that earliest-finish-first is optimal for single-resource interval scheduling became textbook staples.',
  },
  {
    title: '1990s: Competitive analysis for online variants',
    detail:
      'Online interval scheduling introduced competitive ratios when activities arrive over time.',
  },
  {
    title: 'Modern: Weighted and multi-processor extensions',
    detail:
      'Dynamic programming and approximation schemes extend the idea to weighted intervals and multiple machines.',
  },
]

const mentalModels = [
  {
    title: 'Timeline packing',
    detail:
      'Lay intervals on a timeline. Choosing the one that frees the line earliest leaves the most room for the rest.',
  },
  {
    title: 'Always keep the schedule flexible',
    detail:
      'Picking the earliest finishing activity maximizes remaining capacity; greedily hoarding long tasks reduces options.',
  },
  {
    title: 'Interval as a resource lock',
    detail:
      'Each interval locks the single resource from start to finish. You want the shortest lock that ends soonest to unlock the resource.',
  },
  {
    title: 'Matroid perspective',
    detail:
      'Non-overlapping intervals form an independence system where the greedy choice by finish time yields a maximum cardinality basis.',
  },
]

const problemVariants = [
  {
    heading: 'Unweighted interval scheduling',
    bullets: [
      'Maximize number of non-overlapping activities.',
      'Sort by earliest finish, pick compatible ones.',
      'Classical greedy optimal solution.',
    ],
  },
  {
    heading: 'Weighted interval scheduling',
    bullets: [
      'Each activity has value; maximize total value.',
      'Greedy fails; use DP with binary search on previous compatible interval.',
      'Runtime O(n log n).',
    ],
  },
  {
    heading: 'k parallel machines',
    bullets: [
      'Schedule on k identical resources.',
      'Greedy with a min-heap of end times works for maximizing count.',
      'For weighted or unrelated machines, complexity increases.',
    ],
  },
  {
    heading: 'Interval partitioning',
    bullets: [
      'Assign intervals to the minimum number of rooms without overlap per room.',
      'Greedy by start time with a min-heap of end times achieves optimal room count.',
      'Equivalent to coloring interval graphs.',
    ],
  },
  {
    heading: 'Online interval scheduling',
    bullets: [
      'Activities arrive over time without knowledge of future.',
      'Competitive analysis compares to optimal offline schedule.',
      'Simple greedy achieves bounded but not optimal ratios.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Sort by finish time ascending',
    detail:
      'Order activities by earliest end; ties can break by earliest start or shorter duration.',
  },
  {
    title: 'Initialize with first activity',
    detail:
      'Pick the activity that ends earliest; it cannot block any better choice.',
  },
  {
    title: 'Scan and select compatible',
    detail:
      'For each next interval in finish order, add it if its start is >= end of last chosen.',
  },
  {
    title: 'Track end time only',
    detail:
      'You only need the end of the last accepted activity to test compatibility.',
  },
  {
    title: 'Produce schedule',
    detail:
      'The chosen set is maximum cardinality; proof by exchange argument: any optimal schedule can swap in earlier finishing intervals without reducing size.',
  },
]

const implementationNotes = [
  {
    title: 'Inclusive vs exclusive endpoints',
    detail:
      'Decide if touching intervals (end == start) conflict. Most formulations allow equality as non-overlapping.',
  },
  {
    title: 'Stable sorting for ties',
    detail:
      'When finish times tie, sort shorter or earlier-starting first to preserve compatibility.',
  },
  {
    title: 'Input validation',
    detail:
      'Normalize intervals so start <= end; discard zero-length if undesired.',
  },
  {
    title: 'Heap for online arrivals',
    detail:
      'For streaming tasks, maintain a min-heap of end times to quickly decide acceptance on k machines.',
  },
  {
    title: 'Weighted variant uses DP',
    detail:
      'Precompute p[i], the rightmost non-overlapping interval before i, to speed transitions: dp[i] = max(dp[i-1], value[i] + dp[p[i]]).',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Sorting is O(n log n), the greedy scan is O(n). Overall O(n log n).',
  },
  {
    title: 'Space complexity',
    detail:
      'O(1) extra after sorting (or O(n) if you store selections).',
  },
  {
    title: 'Weighted variant',
    detail:
      'With DP and binary search on p[i], runtime O(n log n) and memory O(n).',
  },
  {
    title: 'k-machine scheduling',
    detail:
      'Using a heap of size k keeps time O(n log k) for maximizing count.',
  },
]

const realWorldUses = [
  {
    context: 'Conference room booking',
    detail:
      'Assign as many meetings as possible to a single room without conflicts.',
  },
  {
    context: 'CPU single-core task admission',
    detail:
      'Select the most tasks that can run to completion on a dedicated core before deadlines.',
  },
  {
    context: 'Bandwidth reservation',
    detail:
      'Schedule exclusive time windows on a link for data transfers.',
  },
  {
    context: 'Manufacturing machine slots',
    detail:
      'Pack jobs on a single machine to maximize throughput when setup times are negligible.',
  },
  {
    context: 'Advertising slots',
    detail:
      'Pick non-overlapping ads in a channel schedule to maximize count or value.',
  },
]

const examples = [
  {
    title: 'Greedy selection (pseudocode)',
    code: `function activitySelection(intervals):
    // intervals: [start, end)
    sort intervals by end asc, then start asc
    chosen = []
    lastEnd = -INF
    for (s, e) in intervals:
        if s >= lastEnd:
            chosen.append([s, e])
            lastEnd = e
    return chosen`,
    explanation:
      'Earliest-finish-first keeps the resource free as soon as possible, ensuring maximal count.',
  },
  {
    title: 'Proof sketch via exchange argument',
    code: `Let A be an optimal schedule.
Let g be the earliest-finishing interval overall.
If g not in A, replace the earliest-finishing interval in A with g.
This keeps size the same and ends no later.
Repeat to transform A into the greedy schedule without reducing size.`,
    explanation:
      'Any optimal schedule can be morphed to include the greedy choices without losing feasibility or cardinality.',
  },
  {
    title: 'Weighted interval DP transition',
    code: `sort by end time
compute p[i] = rightmost j < i with end[j] <= start[i]
dp[0] = 0
for i in 1..n:
    take = value[i] + dp[p[i]]
    skip = dp[i-1]
    dp[i] = max(take, skip)
return dp[n]`,
    explanation:
      'Weights break the simple greedy; the DP picks the best combination of compatible intervals.',
  },
]

const pitfalls = [
  'Sorting by start time instead of finish breaks optimality for unweighted scheduling.',
  'Treating touching intervals as overlapping when the model allows equality discards valid activities.',
  'Assuming greedy works for weighted intervals; it does not without additional structure.',
  'Missing input normalization (start > end) can silently drop activities or create negative durations.',
  'For k machines, forgetting to pop finished intervals from the heap causes over-allocation.',
]

const decisionGuidance = [
  'Use earliest-finish-first for maximizing the number of non-overlapping intervals on one resource.',
  'Switch to weighted DP when values matter more than count.',
  'For multiple identical machines, keep a min-heap of end times to decide placement greedily.',
  'For online arrivals, expect only competitive guarantees; design for bounded ratios, not optimality.',
  'If setup times or switching costs dominate, consider variants like interval partitioning or batching.',
]

const advancedInsights = [
  {
    title: 'Interval graphs',
    detail:
      'Unweighted scheduling is equivalent to finding a maximum independent set in an interval graph, solvable greedily.',
  },
  {
    title: 'Room coloring duality',
    detail:
      'Interval partitioning uses the same structure; the maximum depth of overlaps equals the minimum rooms needed.',
  },
  {
    title: 'Robustness to tie-breaking',
    detail:
      'Any earliest-finish-first ordering yields an optimal cardinality schedule; proof uses the same exchange argument.',
  },
  {
    title: 'Slack-aware heuristics',
    detail:
      'In practice, combining finish time with slack or deadline margins can improve robustness under uncertainty, though not strictly optimal.',
  },
]

const takeaways = [
  'Earliest-finish-first greedily solves unweighted interval scheduling optimally.',
  'The algorithm runs in O(n log n) due to sorting and uses constant extra space.',
  'Weighted intervals require DP; greedy alone is insufficient.',
  'Heap-based extensions handle multiple machines and online arrivals efficiently.',
  'Exchange arguments explain why swapping in earlier-finishing intervals preserves optimality.',
]

const quickGlossary = [
  {
    term: 'Interval scheduling',
    definition: 'Selecting a maximum set of mutually compatible time intervals on a constrained resource.',
  },
  {
    term: 'Activity',
    definition: 'A job with a start and end time that occupies the resource while active.',
  },
  {
    term: 'Compatible intervals',
    definition: 'Intervals that do not overlap under the chosen endpoint convention.',
  },
  {
    term: 'Earliest-finish-first',
    definition: 'Greedy rule that selects the compatible activity with the smallest finishing time.',
  },
  {
    term: 'Exchange argument',
    definition: 'Proof method showing greedy choices can replace optimal choices without reducing solution quality.',
  },
  {
    term: 'Weighted interval scheduling',
    definition: 'Variant where each interval has value and objective is maximum total value, solved with DP.',
  },
  {
    term: 'p[i]',
    definition: 'Index of the last interval finishing before interval i starts, used in weighted DP transitions.',
  },
  {
    term: 'Interval partitioning',
    definition: 'Assigning intervals to the minimum number of rooms/resources with no overlap per room.',
  },
  {
    term: 'Competitive ratio',
    definition: 'Quality measure for online algorithms relative to the offline optimal solution.',
  },
  {
    term: 'Interval graph',
    definition: 'Graph where each interval is a vertex and overlaps create edges.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const activity98HelpStyles = `
.activity98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.activity98-window {
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

.activity98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.activity98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  white-space: nowrap;
  pointer-events: none;
}

.activity98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
  z-index: 1;
}

.activity98-control {
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

.activity98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.activity98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.activity98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.activity98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.activity98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.activity98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.activity98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.activity98-toc-list li {
  margin: 0 0 8px;
}

.activity98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.activity98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.activity98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.activity98-section {
  margin: 0 0 22px;
}

.activity98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.activity98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.activity98-content p,
.activity98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.activity98-content p {
  margin: 0 0 10px;
}

.activity98-content ul,
.activity98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.activity98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.activity98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.activity98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .activity98-main {
    grid-template-columns: 1fr;
  }

  .activity98-toc {
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
    { id: 'bp-real-world', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'Greedy Workflow' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ActivitySelectionIntervalSchedulingPage(): JSX.Element {
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
    document.title = `Activity Selection (Interval Scheduling) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Activity Selection (Interval Scheduling)',
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
    <div className="activity98-help-page">
      <style>{activity98HelpStyles}</style>
      <div className="activity98-window" role="presentation">
        <header className="activity98-titlebar">
          <span className="activity98-title-text">Activity Selection (Interval Scheduling)</span>
          <div className="activity98-title-controls">
            <button className="activity98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="activity98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="activity98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`activity98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="activity98-main">
          <aside className="activity98-toc" aria-label="Table of contents">
            <h2 className="activity98-toc-title">Contents</h2>
            <ul className="activity98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="activity98-content">
            <h1 className="activity98-doc-title">Activity Selection (Interval Scheduling)</h1>
            <p>
              Interval scheduling picks the largest set of non-overlapping activities on a single resource. The greedy rule that
              always chooses the interval that finishes first leaves the most runway for future picks and is provably optimal.
            </p>
            <p>
              This document explains the exchange argument, practical implementation details, and extensions to weighted and
              multi-machine cases.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="activity98-section">
                  <h2 className="activity98-heading">Overview</h2>
                  <p>
                    Interval scheduling is the canonical example showing how a local greedy rule can be globally optimal. By
                    selecting the activity that frees the resource soonest, you maximize flexibility for the remaining timeline.
                  </p>
                  <p>
                    The same idea underlies room allocation, CPU task admission, and bandwidth reservation. Weighted and
                    multi-resource variants keep the structure but need extra machinery like DP or heaps.
                  </p>
                </section>
                <hr className="activity98-divider" />
                <section id="bp-history" className="activity98-section">
                  <h2 className="activity98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="activity98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="activity98-divider" />
                <section id="bp-real-world" className="activity98-section">
                  <h2 className="activity98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="activity98-divider" />
                <section id="bp-takeaways" className="activity98-section">
                  <h2 className="activity98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="activity98-section">
                  <h2 className="activity98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="activity98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-variants" className="activity98-section">
                  <h2 className="activity98-heading">Problem Variants</h2>
                  {problemVariants.map((item) => (
                    <div key={item.heading}>
                      <h3 className="activity98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="activity98-section">
                  <h2 className="activity98-heading">Greedy Workflow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Correctness hinges on the exchange argument: if an optimal schedule chooses a later-finishing activity instead
                    of the earliest-finishing one, swapping in the earlier finish never reduces the number of remaining compatible
                    intervals. Repeating this swap transforms any optimal schedule into the greedy one without shrinking it.
                  </p>
                </section>
                <section id="core-implementation" className="activity98-section">
                  <h2 className="activity98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="activity98-section">
                  <h2 className="activity98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Greedy excels because the decision depends only on the current end time. When value weights, setup costs, or
                    multiple resources enter, expect to pay more with DP, heaps, or approximation to preserve optimal or
                    near-optimal schedules.
                  </p>
                </section>
                <section id="core-advanced" className="activity98-section">
                  <h2 className="activity98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="activity98-section">
                  <h2 className="activity98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="activity98-section">
                  <h2 className="activity98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="activity98-section">
                <h2 className="activity98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="activity98-subheading">{example.title}</h3>
                    <div className="activity98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="activity98-section">
                <h2 className="activity98-heading">Glossary</h2>
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
