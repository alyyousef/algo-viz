import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
  'Assuming greedy works for weighted intervals—it does not without additional structure.',
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

export default function ActivitySelectionIntervalSchedulingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Activity Selection (Interval Scheduling)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Earliest-finish-first scheduling with provable optimality</div>
              <p className="win95-text">
                Interval scheduling picks the largest set of non-overlapping activities on a single resource. The greedy rule
                that always chooses the interval that finishes first leaves the most runway for future picks and is provably optimal.
                This page explains the exchange argument, practical implementation details, and extensions to weighted and multi-machine cases.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Interval scheduling is the canonical example showing how a local greedy rule can be globally optimal. By selecting
                the activity that frees the resource soonest, you maximize flexibility for the remaining timeline. The same idea
                underlies room allocation, CPU task admission, and bandwidth reservation. Weighted and multi-resource variants keep
                the structure but need extra machinery like DP or heaps.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: problem variants</legend>
            <div className="win95-grid win95-grid-3">
              {problemVariants.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: greedy workflow</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Correctness hinges on the exchange argument: if an optimal schedule chooses a later-finishing activity instead of
                the earliest-finishing one, swapping in the earlier finish never reduces the number of remaining compatible
                intervals. Repeating this swap transforms any optimal schedule into the greedy one without shrinking it.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Greedy excels because the decision depends only on the current end time. When value weights, setup costs, or
                multiple resources enter, expect to pay more with DP, heaps, or approximation to preserve optimal or near-optimal schedules.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

