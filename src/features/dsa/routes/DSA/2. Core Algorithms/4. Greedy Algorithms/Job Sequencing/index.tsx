import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    detail: 'Greedy by profit with a disjoint-set or slots emerges as the standard interview pattern.',
  },
  {
    title: 'Modern: Disjoint-set optimization',
    detail: 'Union-find slots reduce scheduling to near-linear time after sorting by profit.',
  },
]

const mentalModels = [
  {
    title: 'Newspaper ad slots',
    detail: 'Each job wants a latest allowable slot before its deadline. Highest profit ads get the prime spots first.',
  },
  {
    title: 'Priority boarding',
    detail: 'Jobs line up by profit, taking the latest open seat before departure to leave early seats for others.',
  },
  {
    title: 'Grid of days',
    detail: 'Visualize deadlines on a timeline; placing high-value jobs as late as possible preserves earlier slots.',
  },
  {
    title: 'Exchange argument',
    detail: 'If a lower profit job occupies a slot while a higher profit job fits, swapping increases total profit without breaking deadlines.',
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
    detail: 'Union-find or a boolean array with backward scan; union-find drops time to near O(n alpha(n)).',
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
    detail: 'Most formulations treat deadlines as 1-indexed integer slots; convert carefully from 0-based inputs.',
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
    detail: 'Handles large n when deadlines are modest; huge deadlines may need coordinate compression.',
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
    detail: 'Unit-time deadline scheduling forms a matroid; greedy by weight is optimal on matroids.',
  },
  {
    title: 'Parallel machines',
    detail: 'For k machines, treat each time step as k slots; union-find can merge groups or use k-ary heaps.',
  },
]

const takeaways = [
  'Sorting by profit and taking the latest feasible slot yields optimal profit for unit-time jobs with deadlines.',
  'Union-find makes placement fast; backward scans work for small inputs.',
  'Earliest-deadline-first is not the right rule for the profit version; it belongs to minimizing lateness.',
  'Non-unit durations or extra constraints require more than this greedy.',
  'Coordinate compression and clean indexing prevent slot misuse and off-by-one bugs.',
]

export default function JobSequencingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Job Sequencing</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Greedy profit-first scheduling with deadlines</div>
              <p className="win95-text">
                Job sequencing asks you to pick which unit-time jobs to run before their deadlines to maximize profit. The greedy
                rule is simple: schedule the most profitable jobs first, placing each in the latest open slot before its deadline.
                An exchange argument proves optimality, and a union-find turns placement into near O(1) operations after sorting.
                This page covers the rule, proofs, variants, and where it breaks.
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
                Greedy job sequencing shows how ordering by profit and placing jobs as late as possible keeps maximal flexibility.
                It is optimal for unit-time jobs with deadlines and profits and is a staple interview problem. When job durations or
                constraints change, the problem morphs into harder scheduling where this greedy is only a bound or heuristic.
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
                Correctness idea: if a schedule includes a lower profit job in a slot where a higher profit job could fit, swapping
                them increases profit without breaking deadlines. By repeatedly swapping, any optimal schedule can be rearranged to
                the greedy order, proving greedy optimality for unit-time jobs.
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
                Sorting dominates runtime; union-find makes slot allocation fast. The greedy is exact only for unit-time jobs with
                deadlines and profits. Once durations grow or dependencies appear, move to DP or ILP and use the greedy value as a
                bound, not the answer.
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

