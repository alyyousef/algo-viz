import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1950s: Early production scheduling',
    detail: 'Operations research formalizes deadline and profit tradeoffs for machine jobs.',
  },
  {
    title: '1979: Moore-Hodgson rule for minimizing late jobs',
    detail: 'Removing the longest job when tardy shows how greedy swaps prove optimality.',
  },
  {
    title: 'Classic deadline-profit sequencing',
    detail:
      'Greedy by profit with a disjoint-set or slots emerges as the standard interview pattern.',
  },
  {
    title: 'Modern: Disjoint-set optimization',
    detail: 'Union-find slots reduce scheduling to near-linear time after sorting by profit.',
  },
]

const mentalModels = [
  {
    title: 'Newspaper ad slots',
    detail:
      'Each job wants a latest allowable slot before its deadline. Highest profit ads get the prime spots first.',
  },
  {
    title: 'Priority boarding',
    detail:
      'Jobs line up by profit, taking the latest open seat before departure to leave early seats for others.',
  },
  {
    title: 'Grid of days',
    detail:
      'Visualize deadlines on a timeline; placing high-value jobs as late as possible preserves earlier slots.',
  },
  {
    title: 'Exchange argument',
    detail:
      'If a lower profit job occupies a slot while a higher profit job fits, swapping increases total profit without breaking deadlines.',
  },
]

const problemVariants = [
  {
    heading: 'Max profit with deadlines (unit time)',
    bullets: [
      'Each job takes unit time and has a deadline and profit.',
      'Goal: maximize profit without missing deadlines.',
      'Greedy by profit with latest feasible slot is optimal.',
    ],
  },
  {
    heading: 'Minimize late jobs',
    bullets: [
      'Each job unit time; goal is min count late.',
      'Greedy by deadline; when late, drop the longest job.',
      'Moore-Hodgson algorithm proves optimality.',
    ],
  },
  {
    heading: 'Weighted with processing time',
    bullets: [
      'Jobs have durations > 1; unit-time greedy no longer works.',
      'Requires DP, branch-and-bound, or EDD with heuristics.',
      'Often framed as 1||sum wjUj variants in scheduling notation.',
    ],
  },
  {
    heading: 'Multiple machines',
    bullets: [
      'Jobs unit time across k identical machines.',
      'Greedy can extend using k slots per time.',
      'Union-find or heaps manage available capacity.',
    ],
  },
  {
    heading: 'Precedence constraints',
    bullets: [
      'Jobs must respect dependencies; simple greedy breaks.',
      'Topological ordering plus heuristics, or DP on DAG.',
      'Turns into more complex scheduling problems.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Sort jobs by profit descending',
    detail: 'Higher profit first so swaps always help or are neutral.',
  },
  {
    title: 'Track slots up to max deadline',
    detail: 'You only need slots 1..maxDeadline since jobs are unit length.',
  },
  {
    title: 'Place each job as late as possible',
    detail: 'Find the latest free slot before its deadline to preserve earlier slots for others.',
  },
  {
    title: 'Use union-find for speed',
    detail: 'parent[t] gives the latest free slot at or before t; union with t-1 after filling.',
  },
  {
    title: 'Sum accepted profits',
    detail: 'Accepted jobs form an optimal set; total profit is the greedy answer.',
  },
]

const implementationNotes = [
  {
    title: 'Slot search',
    detail:
      'Union-find or a boolean array with backward scan; union-find drops time to near O(n alpha(n)).',
  },
  {
    title: 'Deadlines and bounds',
    detail: 'Clamp deadlines above maxDeadline; ignore jobs with non-positive profit.',
  },
  {
    title: 'Stability and ties',
    detail: 'When profits tie, pick earlier deadlines first to avoid wasting late slots.',
  },
  {
    title: 'Zero or negative profit',
    detail: 'Skipping non-positive profit jobs simplifies logic and avoids reducing total profit.',
  },
  {
    title: '1-indexed time',
    detail:
      'Most formulations treat deadlines as 1-indexed integer slots; convert carefully from 0-based inputs.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail: 'Sorting O(n log n); union-find placement is near O(n alpha(n)). Overall O(n log n).',
  },
  {
    title: 'Space complexity',
    detail: 'O(n) for union-find parents or slot arrays up to max deadline.',
  },
  {
    title: 'Scalability',
    detail:
      'Handles large n when deadlines are modest; huge deadlines may need coordinate compression.',
  },
  {
    title: 'Limitations',
    detail: 'Non-unit durations, precedences, or unrelated machines invalidate the simple greedy.',
  },
]

const realWorldUses = [
  {
    context: 'Ad or promo placement',
    detail: 'Schedule limited slots before a launch date to maximize revenue.',
  },
  {
    context: 'Print/broadcast deadlines',
    detail: 'Pick the most valuable stories or segments given cutoff times.',
  },
  {
    context: 'Manufacturing quick-turn jobs',
    detail: 'Unit-time rush jobs on a machine with hard ship dates.',
  },
  {
    context: 'Patch or release trains',
    detail: 'Pick which fixes make a release window when build slots are limited.',
  },
  {
    context: 'Ticketed support queues',
    detail: 'Handle premium tickets first while meeting response SLAs.',
  },
]

const examples = [
  {
    title: 'Profit-first scheduling (pseudocode)',
    code: `function jobSequencing(jobs):
    // jobs: (profit, deadline), unit duration
    sort jobs by profit desc, then deadline asc
    maxD = max(deadline for job in jobs)
    parent = array(maxD + 1)
    for i in 0..maxD: parent[i] = i

    function find(x):
        if parent[x] == x: return x
        parent[x] = find(parent[x])
        return parent[x]

    total = 0
    for (p, d) in jobs:
        slot = find(min(d, maxD))
        if slot > 0:
            total += p
            parent[slot] = find(slot - 1)
    return total`,
    explanation:
      'Union-find tracks the latest open slot at or before each deadline, enabling near O(1) placement per job after sorting.',
  },
  {
    title: 'Exchange argument sketch',
    code: `Take the highest profit job that fits before its deadline.
If an optimal schedule omits it, swap it with any lower-profit job in a feasible slot before its deadline.
The swap keeps feasibility and increases or preserves profit.
Repeat to match the greedy picks.`,
    explanation:
      'Swapping lower-profit jobs out for higher-profit feasible jobs never hurts, so the greedy order attains optimal profit.',
  },
  {
    title: 'Minimize late jobs (Moore-Hodgson)',
    code: `sort jobs by deadline asc
currentTime = 0
maxHeap = empty
for job in jobs:
    currentTime += 1
    push job processing time into maxHeap
    if currentTime > job.deadline:
        longest = pop maxHeap
        currentTime -= longest
return jobs in heap as on-time set`,
    explanation:
      'When you go late, drop the longest job seen so far. The heap maintains the best on-time subset.',
  },
]

const pitfalls = [
  'Using earliest deadline first for max profit unit jobs loses value compared to profit-first greedy.',
  'Forgetting to place jobs as late as possible wastes early slots and can reduce the count of scheduled jobs.',
  'Applying this greedy when job durations exceed 1 without adjustment; it is no longer optimal.',
  'Missing coordinate compression when deadlines are huge leads to large, sparse slot arrays.',
  'Failing to convert 0-based times to 1-based deadlines causes off-by-one rejections.',
]

const decisionGuidance = [
  'Use profit-first greedy with latest feasible slot for unit-time jobs with deadlines and profits.',
  'Use Moore-Hodgson when minimizing the number of late jobs (unit duration).',
  'Switch to DP or ILP for non-unit durations or additional constraints.',
  'Use union-find when n is large; plain backward scan is fine for small inputs.',
  'Compress deadlines when they are large but sparse to keep memory small.',
]

const advancedInsights = [
  {
    title: 'Union-find as disjoint slot allocator',
    detail: 'Path compression makes the repeated "latest free slot" query almost constant time.',
  },
  {
    title: 'Upper bounds for branching',
    detail: 'The greedy profit can serve as a bound inside branch-and-bound for harder variants.',
  },
  {
    title: 'Relation to matroids',
    detail:
      'Unit-time deadline scheduling forms a matroid; greedy by weight is optimal on matroids.',
  },
  {
    title: 'Parallel machines',
    detail:
      'For k machines, treat each time step as k slots; union-find can merge groups or use k-ary heaps.',
  },
]

const takeaways = [
  'Sorting by profit and taking the latest feasible slot yields optimal profit for unit-time jobs with deadlines.',
  'Union-find makes placement fast; backward scans work for small inputs.',
  'Earliest-deadline-first is not the right rule for the profit version; it belongs to minimizing lateness.',
  'Non-unit durations or extra constraints require more than this greedy.',
  'Coordinate compression and clean indexing prevent slot misuse and off-by-one bugs.',
]

const quickGlossary = [
  {
    term: 'Job sequencing',
    definition:
      'Scheduling jobs with deadlines to optimize an objective such as total profit or on-time count.',
  },
  {
    term: 'Unit-time job',
    definition: 'A job that consumes exactly one slot of processing time.',
  },
  {
    term: 'Deadline',
    definition: 'Latest slot by which a job must finish to earn its profit or be counted on time.',
  },
  {
    term: 'Union-find slot allocator',
    definition:
      'Disjoint-set structure used to find the latest available slot at or before a deadline.',
  },
  {
    term: 'Exchange argument',
    definition:
      'Proof technique that swaps low-value choices for higher-value feasible choices to justify greedy optimality.',
  },
  {
    term: 'Moore-Hodgson algorithm',
    definition:
      'Deadline-ordered greedy that drops the longest job when tardy to minimize number of late jobs.',
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'Greedy Workflow' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function JobSequencingPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Job Sequencing',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Job Sequencing"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Job Sequencing</h1>
      <p>
        Greedy profit-first scheduling with deadlines. Job sequencing asks you to pick which
        unit-time jobs to run before their deadlines to maximize profit. The greedy rule is simple:
        schedule the most profitable jobs first, placing each in the latest open slot before its
        deadline. An exchange argument proves optimality, and a union-find turns placement into near
        O(1) operations after sorting. This page covers the rule, proofs, variants, and where it
        breaks.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Greedy job sequencing shows how ordering by profit and placing jobs as late as
              possible keeps maximal flexibility. It is optimal for unit-time jobs with deadlines
              and profits and is a staple interview problem. When job durations or constraints
              change, the problem morphs into harder scheduling where this greedy is only a bound or
              heuristic.
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
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Problem Variants</h2>
            {problemVariants.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Greedy Workflow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Correctness idea: if a schedule includes a lower profit job in a slot where a higher
              profit job could fit, swapping them increases profit without breaking deadlines. By
              repeatedly swapping, any optimal schedule can be rearranged to the greedy order,
              proving greedy optimality for unit-time jobs.
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
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
            <p>
              Sorting dominates runtime; union-find makes slot allocation fast. The greedy is exact
              only for unit-time jobs with deadlines and profits. Once durations grow or
              dependencies appear, move to DP or ILP and use the greedy value as a bound, not the
              answer.
            </p>
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
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
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
