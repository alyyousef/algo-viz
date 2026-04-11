import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Pick the activity that ends earliest; it cannot block any better choice.',
  },
  {
    title: 'Scan and select compatible',
    detail: 'For each next interval in finish order, add it if its start is >= end of last chosen.',
  },
  {
    title: 'Track end time only',
    detail: 'You only need the end of the last accepted activity to test compatibility.',
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
    detail: 'Normalize intervals so start <= end; discard zero-length if undesired.',
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
    detail: 'Sorting is O(n log n), the greedy scan is O(n). Overall O(n log n).',
  },
  {
    title: 'Space complexity',
    detail: 'O(1) extra after sorting (or O(n) if you store selections).',
  },
  {
    title: 'Weighted variant',
    detail: 'With DP and binary search on p[i], runtime O(n log n) and memory O(n).',
  },
  {
    title: 'k-machine scheduling',
    detail: 'Using a heap of size k keeps time O(n log k) for maximizing count.',
  },
]

const realWorldUses = [
  {
    context: 'Conference room booking',
    detail: 'Assign as many meetings as possible to a single room without conflicts.',
  },
  {
    context: 'CPU single-core task admission',
    detail:
      'Select the most tasks that can run to completion on a dedicated core before deadlines.',
  },
  {
    context: 'Bandwidth reservation',
    detail: 'Schedule exclusive time windows on a link for data transfers.',
  },
  {
    context: 'Manufacturing machine slots',
    detail: 'Pack jobs on a single machine to maximize throughput when setup times are negligible.',
  },
  {
    context: 'Advertising slots',
    detail: 'Pick non-overlapping ads in a channel schedule to maximize count or value.',
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
    definition:
      'Selecting a maximum set of mutually compatible time intervals on a constrained resource.',
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
    definition:
      'Greedy rule that selects the compatible activity with the smallest finishing time.',
  },
  {
    term: 'Exchange argument',
    definition:
      'Proof method showing greedy choices can replace optimal choices without reducing solution quality.',
  },
  {
    term: 'Weighted interval scheduling',
    definition:
      'Variant where each interval has value and objective is maximum total value, solved with DP.',
  },
  {
    term: 'p[i]',
    definition:
      'Index of the last interval finishing before interval i starts, used in weighted DP transitions.',
  },
  {
    term: 'Interval partitioning',
    definition:
      'Assigning intervals to the minimum number of rooms/resources with no overlap per room.',
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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

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
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Activity Selection (Interval Scheduling)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Activity Selection (Interval Scheduling)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Activity Selection (Interval Scheduling)</h1>
      <p>
        Interval scheduling picks the largest set of non-overlapping activities on a single
        resource. The greedy rule that always chooses the interval that finishes first leaves the
        most runway for future picks and is provably optimal.
      </p>
      <p>
        This document explains the exchange argument, practical implementation details, and
        extensions to weighted and multi-machine cases.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Interval scheduling is the canonical example showing how a local greedy rule can be
              globally optimal. By selecting the activity that frees the resource soonest, you
              maximize flexibility for the remaining timeline.
            </p>
            <p>
              The same idea underlies room allocation, CPU task admission, and bandwidth
              reservation. Weighted and multi-resource variants keep the structure but need extra
              machinery like DP or heaps.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-real-world" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Problem Variants</h2>
            {problemVariants.map((item) => (
              <div key={item.heading}>
                <h3 className="bin98-subheading">{item.heading}</h3>
                <ul>
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Greedy Workflow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Correctness hinges on the exchange argument: if an optimal schedule chooses a
              later-finishing activity instead of the earliest-finishing one, swapping in the
              earlier finish never reduces the number of remaining compatible intervals. Repeating
              this swap transforms any optimal schedule into the greedy one without shrinking it.
            </p>
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Greedy excels because the decision depends only on the current end time. When value
              weights, setup costs, or multiple resources enter, expect to pay more with DP, heaps,
              or approximation to preserve optimal or near-optimal schedules.
            </p>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
