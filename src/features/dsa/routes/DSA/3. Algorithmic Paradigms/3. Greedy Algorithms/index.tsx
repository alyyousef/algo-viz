import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}
`

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
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Local picks, global wins</div>
              <p className="win95-text">
                Greedy algorithms commit to the best-looking option at each step and never revisit previous choices. When the greedy
                choice property holds, that simple loop delivers optimal answers with minimal state.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

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
