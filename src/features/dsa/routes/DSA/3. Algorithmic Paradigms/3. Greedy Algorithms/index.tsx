import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const foundations = [
  {
    title: 'What a greedy algorithm is',
    detail:
      'A greedy algorithm builds a solution incrementally by repeatedly making a locally optimal choice. It never revisits earlier decisions, so correctness depends on proving each local choice can be part of some global optimum.',
  },
  {
    title: 'Greedy-choice property',
    detail:
      'There exists an optimal solution whose first decision is the greedy decision. Once you show this, you can safely lock in the greedy step and solve the remaining subproblem.',
  },
  {
    title: 'Optimal substructure (with monotonic choices)',
    detail:
      'After committing to the greedy choice, the rest of the problem has the same structure and constraints. The remaining subproblem does not require undoing the earlier decision.',
  },
  {
    title: 'Local decisions with global invariants',
    detail:
      'Greedy works when a global invariant (like a cut, a prefix property, or feasibility closure) makes local choices safe. The invariant is what you prove, not the algorithm itself.',
  },
]

const pillars = [
  {
    title: 'Greedy choice property',
    detail:
      'A locally best pick can be part of a global optimum. Exchange or cut arguments show your choice can replace the optimal one without losing quality.',
  },
  {
    title: 'Monotone progress',
    detail:
      'Each step only moves forward; you never need to undo choices. Sorting or a priority queue usually defines the next candidate to accept.',
  },
  {
    title: 'Compact state',
    detail:
      'You carry a tiny amount of information (current cost, deadline set, visited set) rather than a full search tree. That keeps the loop O(n log n) instead of exponential.',
  },
  {
    title: 'Proof-friendly structure',
    detail:
      'The structure of feasible solutions lets you prove correctness locally. If a choice can be swapped into any optimal answer, the greedy rule is safe.',
  },
]

const signals = [
  'Objective is additive or separable, so local gains stack without hidden future penalties.',
  'Feasibility behaves like a matroid or prefix-closed set: adding a valid choice does not force you to remove earlier picks.',
  'A stable sort order or priority queue emerges naturally (earliest finish time, lowest weight edge, smallest distance).',
  'Once chosen, a decision never needs to be revisited or undone.',
  'Exchange arguments feel straightforward: you can swap any optimal step with your greedy pick and stay optimal.',
  'After a greedy choice, the remaining problem has the same form and constraints.',
  'Small brute-force checks fail to find counterexamples against the greedy rule.',
]

const greedyLoop = [
  {
    title: 'Define the choice rule',
    detail:
      'Specify the metric that ranks candidates (finish time, weight, distance, value density). The rule must be consistent across steps.',
  },
  {
    title: 'Check feasibility',
    detail:
      'Accept a candidate only if it preserves constraints (non-overlap, acyclic, capacity). Otherwise skip and continue.',
  },
  {
    title: 'Commit and update state',
    detail:
      'Lock the choice and update the running state (current time, DSU, heap, remaining capacity). No backtracking.',
  },
  {
    title: 'Terminate cleanly',
    detail:
      'Stop when no candidates remain or the goal is satisfied. The accepted set is your solution.',
  },
]

const modelingChecklist = [
  'State the objective clearly (maximize count, minimize cost, minimize rooms, etc.).',
  'Define feasibility precisely (non-overlap, acyclic, capacity, deadlines).',
  'Describe the candidate set at each step and how it changes.',
  'Identify the ordering or priority metric that produces the greedy choice.',
  'Write the invariant you must preserve after each choice.',
  'Describe the subproblem left after a greedy choice (same form, smaller size).',
  'Decide the data structure that makes the greedy choice efficient.',
]

const patterns = [
  {
    title: 'Interval scheduling',
    detail:
      'Sort by earliest finish time and pick non-overlapping intervals to maximize the schedule size. The greedy stays ahead proof applies.',
  },
  {
    title: 'Interval partitioning',
    detail:
      'Assign each interval to the earliest finishing room using a min-heap of end times. This yields the minimum number of rooms.',
  },
  {
    title: 'Minimum spanning tree',
    detail:
      'Kruskal and Prim add the lightest safe edge while maintaining cut and cycle properties. The cut property guarantees safety.',
  },
  {
    title: 'Shortest paths without negatives',
    detail:
      'Dijkstra expands the closest unvisited node and relaxes edges; non-negative weights keep the invariant intact.',
  },
  {
    title: 'Greedy merging',
    detail: 'Huffman coding repeatedly merges the two smallest weights, producing an optimal prefix code.',
  },
  {
    title: 'Resource and capacity choices',
    detail:
      'Fractional knapsack by value density, job scheduling by deadline with a max-heap, and load balancing via earliest finish.',
  },
  {
    title: 'Edge filtering with safety checks',
    detail: 'Pick the best candidate edge or item that keeps the solution feasible, often using DSU or cycle checks.',
  },
]

const proofToolkit = [
  {
    title: 'Exchange argument',
    detail:
      'Swap a greedy choice into an optimal solution without worsening it, repeating until the solutions match.',
  },
  {
    title: 'Cut property',
    detail:
      'The lightest edge crossing any cut is safe, so taking it cannot prevent an optimal spanning tree.',
  },
  {
    title: 'Greedy stays ahead',
    detail:
      'After each step, the greedy partial solution is at least as good as any other partial solution of the same size.',
  },
  {
    title: 'Matroid structure',
    detail:
      'If feasible sets satisfy the exchange axiom, sorting by weight and picking feasible items is optimal.',
  },
  {
    title: 'Optimal substructure with monotone choice',
    detail:
      'After a greedy pick, the remaining problem is the same type and does not require revisiting earlier choices.',
  },
]

const workedExamples = [
  {
    title: 'Activity selection (maximize count)',
    steps: [
      'Sort activities by finishing time.',
      'Pick the earliest finishing activity; it leaves the most room for the rest.',
      'Skip any activity that overlaps the last chosen finish time.',
      'Continue in sorted order; the greedy schedule stays ahead of any optimal schedule.',
    ],
    why:
      'The exchange argument shows any optimal solution can be modified to include the earliest finish without reducing the total count.',
  },
  {
    title: 'Kruskal MST (minimum total weight)',
    steps: [
      'Sort all edges by weight.',
      'Add the smallest edge that does not form a cycle (use DSU).',
      'Repeat until you have n - 1 edges.',
      'Each added edge is the lightest crossing some cut, so it is safe.',
    ],
    why:
      'The cut property guarantees each chosen edge belongs to some MST, preserving optimality at every step.',
  },
  {
    title: 'Huffman coding (optimal prefix code)',
    steps: [
      'Create a min-heap of symbol frequencies.',
      'Pop the two least frequent nodes and merge them.',
      'Push the merged node back; repeat until one node remains.',
      'Assign 0/1 along tree edges to create codes.',
    ],
    why:
      'In an optimal prefix code, the two least frequent symbols can be placed at the deepest leaves and merged safely.',
  },
  {
    title: 'Dijkstra (non-negative shortest paths)',
    steps: [
      'Initialize distances, push the source into a min-heap.',
      'Extract the node with minimum tentative distance.',
      'Relax its outgoing edges and update neighbors.',
      'Finalized nodes never get a shorter path later.',
    ],
    why:
      'Non-negative edges ensure that once a node is chosen, its distance is minimal among all remaining paths.',
  },
]

const canonicalAlgorithms = [
  {
    title: 'Activity selection',
    detail:
      'Sort by earliest finish time and greedily accept the next compatible interval for the maximum number of activities.',
  },
  {
    title: 'Interval partitioning',
    detail:
      'Use a min-heap of end times to assign each interval to the earliest finishing room, minimizing rooms used.',
  },
  {
    title: 'Huffman coding',
    detail:
      'Merge the two least frequent symbols repeatedly to build an optimal prefix code tree with minimum expected length.',
  },
  {
    title: 'Minimum spanning tree',
    detail:
      'Kruskal sorts edges and uses a disjoint set to avoid cycles; Prim grows a tree by the cheapest frontier edge.',
  },
  {
    title: 'Dijkstra shortest paths',
    detail:
      'Pick the closest unvisited node and relax its edges; non-negative weights keep distances final.',
  },
  {
    title: 'Fractional knapsack',
    detail:
      'Sort by value density and take full items until capacity, then take a fraction of the next.',
  },
  {
    title: 'Deadline scheduling',
    detail:
      'Sort by deadline, keep a max-heap of durations, and drop the longest when you exceed the deadline.',
  },
  {
    title: 'Canonical coin systems',
    detail:
      'For specific coin sets (like US coins), repeatedly taking the largest coin yields an optimal count.',
  },
]

const complexityTable = [
  {
    pattern: 'Sort then scan',
    structure: 'Sort + linear pass',
    complexity: 'O(n log n)',
    note: 'Activity selection, interval scheduling.',
  },
  {
    pattern: 'Best-next selection',
    structure: 'Min/Max heap',
    complexity: 'O(n log n)',
    note: 'Huffman, interval partitioning, deadline scheduling.',
  },
  {
    pattern: 'Edge filtering',
    structure: 'Sort + DSU',
    complexity: 'O(m log m)',
    note: 'Kruskal MST (m edges).',
  },
  {
    pattern: 'Frontier expansion',
    structure: 'Min heap + adjacency list',
    complexity: 'O((n + m) log n)',
    note: 'Dijkstra on sparse graphs.',
  },
]

const failureCases = [
  {
    title: '0/1 knapsack',
    detail: 'Density greedy can miss the best combination. Use dynamic programming or branch and bound.',
  },
  {
    title: 'Non-canonical coin systems',
    detail:
      'Coins {1, 3, 4} for amount 6: greedy picks 4 + 1 + 1 (3 coins) but optimal is 3 + 3 (2 coins).',
  },
  {
    title: 'Negative edges in shortest paths',
    detail: 'Dijkstra can finalize too early; use Bellman-Ford or Johnson instead.',
  },
  {
    title: 'Weighted interval scheduling',
    detail: 'Earliest finish ignores weights; dynamic programming is required for the optimal total weight.',
  },
  {
    title: 'Global constraints that break monotonicity',
    detail: 'Local choices can block future feasibility; consider DP or search with pruning.',
  },
]

const implementationTemplate = [
  {
    title: 'Greedy template',
    detail:
      'Sort or prioritize candidates by your greedy key. Iterate, accept a candidate if it preserves feasibility, update state, and continue. No backtracking.',
  },
  {
    title: 'State to track',
    detail:
      'Keep only what you need to test feasibility and update the objective (current end time, DSU parent set, remaining capacity, or a heap of active items).',
  },
  {
    title: 'Tie-breaking matters',
    detail:
      'When multiple candidates tie on the greedy key, define a consistent tie-breaker to maintain determinism and simplify proofs.',
  },
  {
    title: 'Verification on small inputs',
    detail:
      'Brute-force or DP on small cases helps detect hidden constraints that break greedy choice.',
  },
]

const comparisons = [
  {
    title: 'Greedy vs dynamic programming',
    detail:
      'Greedy chooses one path; DP explores all subproblems. If greedy choice property is unclear or counterexamples appear, reach for DP.',
  },
  {
    title: 'Greedy vs divide & conquer',
    detail:
      'Divide & conquer splits into independent subproblems, while greedy makes a single irreversible choice to reduce the problem.',
  },
  {
    title: 'Greedy vs backtracking',
    detail:
      'Backtracking explores a search tree with pruning; greedy takes one branch based on a proven safe choice.',
  },
]

const hygiene = [
  'Write the invariant that every accepted choice keeps the set feasible; assert it in code when possible.',
  'Define tie-breakers explicitly (stable sort, consistent ordering) so the greedy rule is deterministic.',
  'Sort once, then treat the input as a stream; use a priority queue when the "best next" item changes over time.',
  'Prove correctness with an exchange or cut argument before trusting the heuristic.',
  'Watch for hidden global constraints (negative weights, quotas, dependencies) that break greedy choice.',
  'Test the greedy result against brute force or DP on tiny inputs to catch surprises early.',
  'Track the data structure costs; the greedy proof may be correct, but a slow DS can dominate runtime.',
]

export default function GreedyAlgorithmsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Greedy Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Local picks, global wins</div>
              <p className="win95-text">
                Greedy algorithms build a solution piece by piece, always taking the best-looking option according to a fixed rule.
                They never backtrack, so the correctness hinge is a proof that each local choice can be part of a global optimum.
                When that proof exists, greedy solutions are fast, clean, and often O(n log n) with simple data structures.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Foundations: what makes greedy work</legend>
            <div className="win95-grid win95-grid-2">
              {foundations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Greedy loop anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {greedyLoop.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Three pillars of a safe greedy</legend>
            <div className="win95-grid win95-grid-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="win95-panel">
                  <div className="win95-heading">{pillar.title}</div>
                  <p className="win95-text">{pillar.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem modeling checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {modelingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Signals a greedy fit</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Proof playbook</legend>
            <div className="win95-grid win95-grid-2">
              {proofToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked examples (step-by-step)</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <ol className="win95-list win95-list--numbered">
                    {example.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="win95-text">{example.why}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common greedy patterns</legend>
            <div className="win95-stack">
              {patterns.map((pattern) => (
                <div key={pattern.title} className="win95-panel">
                  <div className="win95-heading">{pattern.title}</div>
                  <p className="win95-text">{pattern.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Canonical algorithms in practice</legend>
            <div className="win95-grid win95-grid-2">
              {canonicalAlgorithms.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation template and pitfalls</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTemplate.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and data structures</legend>
            <table className="win95-table">
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Typical structure</th>
                  <th>Complexity</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row) => (
                  <tr key={row.pattern}>
                    <td>{row.pattern}</td>
                    <td>{row.structure}</td>
                    <td>{row.complexity}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Greedy in context</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Failure modes and counterexamples</legend>
            <div className="win95-grid win95-grid-2">
              {failureCases.map((item) => (
                <div key={item.title} className="win95-panel win95-panel--raised">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Hygiene before you ship</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {hygiene.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

