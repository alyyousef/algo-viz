import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const glossaryTerms = [
  {
    term: 'Greedy algorithm',
    definition:
      'An algorithm that builds a solution incrementally by always taking the locally best-looking valid choice.',
  },
  {
    term: 'Greedy-choice property',
    definition:
      'The condition that some optimal solution begins with the greedy decision.',
  },
  {
    term: 'Exchange argument',
    definition:
      'A proof technique showing a greedy choice can replace part of an optimal solution without making it worse.',
  },
  {
    term: 'Cut property',
    definition:
      'The MST fact that the lightest edge crossing any cut is safe to take.',
  },
  {
    term: 'Matroid',
    definition:
      'A structure of feasible sets with an exchange axiom that often makes greedy algorithms optimal.',
  },
  {
    term: 'Monotone progress',
    definition:
      'The property that accepted choices never need to be undone.',
  },
  {
    term: 'Feasibility',
    definition:
      'The constraint check that determines whether a candidate can be accepted safely.',
  },
  {
    term: 'Priority metric',
    definition:
      'The ordering rule, such as earliest finish or lowest weight, that decides the next greedy choice.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const greedyHelpStyles = `
.greedy-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.greedy-help-window {
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

.greedy-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.greedy-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.greedy-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.greedy-help-control {
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
  font-size: 11px;
  line-height: 1;
  padding: 0;
}
.greedy-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.greedy-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.greedy-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.greedy-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.greedy-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.greedy-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.greedy-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.greedy-help-toc-list li {
  margin: 0 0 8px;
}

.greedy-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.greedy-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.greedy-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.greedy-help-section {
  margin: 0 0 20px;
}

.greedy-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.greedy-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.greedy-help-content p,
.greedy-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.greedy-help-content p {
  margin: 0 0 10px;
}

.greedy-help-content ul,
.greedy-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.greedy-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

@media (max-width: 900px) {
  .greedy-help-main {
    grid-template-columns: 1fr;
  }

  .greedy-help-toc {
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

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-pillars', label: 'Pillars' },
    { id: 'bp-signals', label: 'Signals a Greedy Fit' },
  ],
  'core-concepts': [
    { id: 'core-loop', label: 'Greedy Loop' },
    { id: 'core-modeling', label: 'Modeling Checklist' },
    { id: 'core-proof', label: 'Proof Playbook' },
    { id: 'core-patterns', label: 'Common Patterns' },
    { id: 'core-canonical', label: 'Canonical Algorithms' },
    { id: 'core-implementation', label: 'Implementation Template' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-comparisons', label: 'Greedy in Context' },
    { id: 'core-failure', label: 'Failure Modes' },
    { id: 'core-hygiene', label: 'Hygiene' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GreedyAlgorithmsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Greedy Algorithms (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Greedy Algorithms',
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
    <div className="greedy-help-page">
      <style>{greedyHelpStyles}</style>
      <div className="greedy-help-window" role="presentation">
        <header className="greedy-help-titlebar">
          <span className="greedy-help-title">Greedy Algorithms</span>
          <div className="greedy-help-controls">
            <button className="greedy-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="greedy-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="greedy-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`greedy-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="greedy-help-main">
          <aside className="greedy-help-toc" aria-label="Table of contents">
            <h2 className="greedy-help-toc-title">Contents</h2>
            <ul className="greedy-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="greedy-help-content">
            <h1 className="greedy-help-doc-title">Greedy Algorithms</h1>
            <p>
              Greedy algorithms build a solution piece by piece, always taking the best-looking option according to a fixed rule.
              They never backtrack, so the correctness hinge is a proof that each local choice can be part of a global optimum.
              When that proof exists, greedy solutions are fast, clean, and often O(n log n) with simple data structures.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-foundations" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Foundations: What Makes Greedy Work</h2>
                  {foundations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="greedy-help-divider" />
                <section id="bp-pillars" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Three Pillars of a Safe Greedy</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="greedy-help-divider" />
                <section id="bp-signals" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Signals a Greedy Fit</h2>
                  <ul>
                    {signals.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-loop" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Greedy Loop Anatomy</h2>
                  {greedyLoop.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-modeling" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Problem Modeling Checklist</h2>
                  <ul>
                    {modelingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-proof" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Proof Playbook</h2>
                  {proofToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Common Greedy Patterns</h2>
                  {patterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-canonical" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Canonical Algorithms in Practice</h2>
                  {canonicalAlgorithms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Implementation Template and Pitfalls</h2>
                  {implementationTemplate.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Complexity and Data Structures</h2>
                  {complexityTable.map((row) => (
                    <div key={row.pattern}>
                      <h3 className="greedy-help-subheading">{row.pattern}</h3>
                      <p><strong>Typical structure:</strong> {row.structure}</p>
                      <p><strong>Complexity:</strong> {row.complexity}</p>
                      <p><strong>Notes:</strong> {row.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-comparisons" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Greedy in Context</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-failure" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Failure Modes and Counterexamples</h2>
                  {failureCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-hygiene" className="greedy-help-section">
                  <h2 className="greedy-help-heading">Hygiene Before You Ship</h2>
                  <ol>
                    {hygiene.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="examples-worked" className="greedy-help-section">
                <h2 className="greedy-help-heading">Worked Examples</h2>
                {workedExamples.map((example) => (
                  <div key={example.title}>
                    <h3 className="greedy-help-subheading">{example.title}</h3>
                    <ol>
                      {example.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <p>{example.why}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="greedy-help-section">
                <h2 className="greedy-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
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
