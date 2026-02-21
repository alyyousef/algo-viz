import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1930: TSP formalized as a combinatorial problem',
    detail:
      'The traveling salesman problem became a canonical benchmark for optimization, motivating exact and approximate methods.',
  },
  {
    title: '1962: Held-Karp dynamic programming',
    detail:
      'Held and Karp introduced the subset DP that cuts the brute force search to O(n^2 2^n).',
  },
  {
    title: '1970s: Branch and bound and cutting planes',
    detail:
      'Exact solvers improved by combining DP ideas with linear programming and pruning.',
  },
  {
    title: '1990s: Heuristics and approximation',
    detail:
      'Large-scale routing relied on heuristics like 2-opt and Christofides for near optimal tours.',
  },
]

const mentalModels = [
  {
    title: 'Visited set as a bitmask',
    detail:
      'A bitmask is a compact checklist. Bit i is 1 if city i has been visited, 0 otherwise.',
  },
  {
    title: 'Last city matters',
    detail:
      'Knowing which cities are visited is not enough. You must also know your current city to price the next move.',
  },
  {
    title: 'Build by extension',
    detail:
      'A tour is built by extending a shorter path with one extra city, reusing the best cost so far.',
  },
  {
    title: 'Return to start',
    detail:
      'The DP computes best paths that end at every city. The final tour adds the cost to return to the start.',
  },
  {
    title: 'Subset frontier',
    detail:
      'Each mask represents a frontier of partial tours that share the same visited set.',
  },
]

const keyDefinitions = [
  {
    heading: 'State',
    bullets: [
      'dp[mask][i] = best cost to start at s, visit mask, end at i.',
      'mask is a subset of visited cities encoded as bits.',
      'i is the last city in the partial tour.',
    ],
  },
  {
    heading: 'Transition',
    bullets: [
      'dp[mask][i] = min over j in mask: dp[mask ^ (1<<i)][j] + dist[j][i].',
      'Only valid if i is in mask and start is in mask.',
      'Represents adding city i last.',
    ],
  },
  {
    heading: 'Base case',
    bullets: [
      'dp[1<<s][s] = 0.',
      'All other dp values start as INF.',
      'Ensures paths begin at the fixed start.',
    ],
  },
  {
    heading: 'Tour cost',
    bullets: [
      'Cycle TSP adds dist[i][s] to return to start.',
      'Path TSP takes min over endpoints without return.',
      'Fixed end uses the chosen endpoint only.',
    ],
  },
]

const problemVariants = [
  {
    heading: 'Classic TSP (cycle)',
    bullets: [
      'Visit all cities once and return to start.',
      'Objective: minimize total tour length.',
      'DP answer adds return edge to start.',
    ],
  },
  {
    heading: 'Path TSP (no return)',
    bullets: [
      'Visit all cities once without returning.',
      'Useful for open routes or deliveries.',
      'Answer is min over all endpoints.',
    ],
  },
  {
    heading: 'Fixed start and end',
    bullets: [
      'Start at s, finish at t.',
      'DP transitions same, but end is fixed.',
      'Return edge is not added.',
    ],
  },
  {
    heading: 'Asymmetric TSP',
    bullets: [
      'Distance from i to j differs from j to i.',
      'DP still works with directed costs.',
      'Common in real road networks.',
    ],
  },
  {
    heading: 'Metric TSP',
    bullets: [
      'Distances satisfy triangle inequality.',
      'Enables approximation guarantees.',
      'DP still exact but costly.',
    ],
  },
]

const workflowSteps = [
  {
    title: 'Choose start and variant',
    detail:
      'Decide whether you need a cycle, a path, or a fixed end.',
  },
  {
    title: 'Encode subsets as bitmasks',
    detail:
      'Use n-bit masks; ensure the start bit is always included.',
  },
  {
    title: 'Fill dp by mask size',
    detail:
      'Iterate masks in increasing size to ensure predecessors are ready.',
  },
  {
    title: 'Recover the tour',
    detail:
      'Store parent pointers to rebuild the optimal order of cities.',
  },
]

const algorithmSteps = [
  {
    title: 'Index cities and choose a start',
    detail:
      'Fix a start city, usually 0, and represent subsets as bitmasks over n cities.',
  },
  {
    title: 'Define DP state',
    detail:
      'dp[mask][i] = minimum cost to start at 0, visit exactly mask, and end at city i.',
  },
  {
    title: 'Initialize base case',
    detail:
      'dp[1 << 0][0] = 0, and all other states are INF.',
  },
  {
    title: 'Transition by adding a city',
    detail:
      'For each mask and endpoint i, try coming from j in mask: dp[mask][i] = min(dp[mask ^ (1<<i)][j] + dist[j][i]).',
  },
  {
    title: 'Close the tour',
    detail:
      'For fullMask, answer is min over i of dp[fullMask][i] + dist[i][0] (for cycle).',
  },
]

const implementationNotes = [
  {
    title: 'Iterate masks carefully',
    detail:
      'Skip masks that do not include the start bit. This halves the work and avoids invalid states.',
  },
  {
    title: 'INF guard',
    detail:
      'Use a large sentinel. If dp is INF, skip transitions to avoid overflow.',
  },
  {
    title: 'Parent reconstruction',
    detail:
      'Store parent[mask][i] to rebuild the optimal tour in reverse.',
  },
  {
    title: 'Iterate by subset size',
    detail:
      'Loop masks by popcount to ensure transitions use smaller subsets.',
  },
  {
    title: 'Space optimization',
    detail:
      'dp has size 2^n * n. For n > 20, memory can be heavy. Consider pruning or meet-in-the-middle.',
  },
  {
    title: 'Distance matrix',
    detail:
      'Precompute dist[i][j] for O(1) transitions. For Euclidean cases, compute once.',
  },
]

const optimizationNotes = [
  {
    title: 'Meet-in-the-middle',
    detail:
      'Split cities into halves and merge path costs to reduce memory, at the cost of extra logic.',
  },
  {
    title: 'Pruning with bounds',
    detail:
      'Use lower bounds (MST, 1-tree, or min outgoing edges) to cut states in search variants.',
  },
  {
    title: 'Cache locality',
    detail:
      'Iterate masks in increasing order and keep dp in contiguous arrays for speed.',
  },
  {
    title: 'Symmetry reduction',
    detail:
      'Fix the start city to remove rotational symmetry and reduce states by a factor of n.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Held-Karp runs in O(n^2 2^n), a big improvement over O(n!).',
  },
  {
    title: 'Space cost',
    detail:
      'Memory is O(n 2^n) for the dp table.',
  },
  {
    title: 'Scaling limits',
    detail:
      'In practice, exact bitmask DP handles about n <= 20 to 22 on typical hardware.',
  },
  {
    title: 'Heuristic alternatives',
    detail:
      'For larger n, use 2-opt, simulated annealing, or Christofides for approximate tours.',
  },
]

const realWorldUses = [
  {
    context: 'Route planning with few stops',
    detail:
      'Small delivery or service routes can be solved exactly with bitmask DP.',
  },
  {
    context: 'PCB drilling and CNC paths',
    detail:
      'Tool heads must visit a set of points once with minimal travel.',
  },
  {
    context: 'Robotics and inspection',
    detail:
      'Robot visits to waypoints in a facility, where the count is small but precision matters.',
  },
  {
    context: 'Genome assembly ordering',
    detail:
      'Ordering a small set of fragments by overlap can be modeled as TSP variants.',
  },
  {
    context: 'Batch job sequencing',
    detail:
      'Small sets of tasks with setup costs can be optimized exactly.',
  },
  {
    context: 'Warehouse picking',
    detail:
      'Optimal paths through a small number of pick locations when exactness matters.',
  },
]

const correctnessSketch = [
  {
    title: 'Optimal substructure',
    detail:
      'An optimal tour contains an optimal prefix for its visited set and endpoint.',
  },
  {
    title: 'Subset completeness',
    detail:
      'All subsets are enumerated, so the optimal tour cannot be missed.',
  },
  {
    title: 'Fixed start',
    detail:
      'Pinning the start removes rotational duplicates without changing the optimum.',
  },
  {
    title: 'Return edge',
    detail:
      'For cycles, the last step back to start completes the Hamiltonian tour.',
  },
]

const examples = [
  {
    title: 'Held-Karp DP (pseudocode)',
    code: `function tspBitmask(dist):
    n = len(dist)
    INF = 10^15
    dp = array(1<<n, n, INF)
    dp[1<<0][0] = 0

    for mask in 0..(1<<n)-1:
        if (mask & 1) == 0: continue
        for i in 0..n-1:
            if (mask & (1<<i)) == 0: continue
            prev = mask ^ (1<<i)
            if prev == 0: continue
            for j in 0..n-1:
                if (prev & (1<<j)) == 0: continue
                dp[mask][i] = min(dp[mask][i], dp[prev][j] + dist[j][i])

    full = (1<<n) - 1
    ans = INF
    for i in 1..n-1:
        ans = min(ans, dp[full][i] + dist[i][0])
    return ans`,
    explanation:
      'The dp state tracks the cheapest path to each endpoint for every visited subset. The final step returns to start.',
  },
  {
    title: 'Path TSP (no return)',
    code: `function tspPath(dist, start):
    n = len(dist)
    dp = array(1<<n, n, INF)
    dp[1<<start][start] = 0
    for mask in 0..(1<<n)-1:
        if (mask & (1<<start)) == 0: continue
        for i in 0..n-1:
            if (mask & (1<<i)) == 0: continue
            prev = mask ^ (1<<i)
            if prev == 0: continue
            for j in 0..n-1:
                if (prev & (1<<j)) == 0: continue
                dp[mask][i] = min(dp[mask][i], dp[prev][j] + dist[j][i])
    full = (1<<n) - 1
    return min(dp[full][i] for i in 0..n-1)`,
    explanation:
      'Skip the return edge. This version finds the cheapest Hamiltonian path starting at a fixed node.',
  },
  {
    title: 'Mask intuition',
    code: `n = 5
mask = 0b10110
// visited cities: 1, 2, 4
// end at city i to complete dp[mask][i]`,
    explanation:
      'Bits track visited cities. The mask makes subset enumeration efficient and compact.',
  },
  {
    title: 'Path reconstruction',
    code: `mask = full
end = argmin_i dp[full][i] + dist[i][0]
tour = []
while mask != 0:
    tour.append(end)
    prev = parent[mask][end]
    mask = mask ^ (1<<end)
    end = prev
tour.reverse()`,
    explanation:
      'Track parent pointers to rebuild the optimal route after computing costs.',
  },
]

const pitfalls = [
  'Forgetting to include the start city in every mask, leading to invalid states.',
  'Mixing path and cycle variants by incorrectly adding the return edge.',
  'Overflowing costs when INF is too small or using 32-bit ints.',
  'Assuming symmetry when the distance matrix is asymmetric.',
  'Using bitmask DP for n too large; it grows exponentially.',
  'Iterating masks without checking the start bit, which wastes work and breaks logic.',
  'Skipping parent pointers when you need the actual tour, not just its cost.',
]

const implementationChecklist = [
  'Fix the start city to remove rotational symmetry.',
  'Use a flat dp array sized (1<<n) * n.',
  'Skip masks that do not include the start bit.',
  'Guard transitions when dp[prev][j] is INF.',
  'Store parent pointers if a tour is required.',
]

const testingChecklist = [
  'n = 1 and n = 2 trivial cases.',
  'Asymmetric distances to ensure directionality is respected.',
  'Path vs cycle variants with known answers.',
  'Disconnected or INF edges to confirm unreachable handling.',
  'Random small n compared to brute force permutations.',
]

const decisionGuidance = [
  'Use bitmask DP when n is small and you need the exact optimal tour.',
  'If n is above 22, switch to heuristics or approximation algorithms.',
  'For asymmetric costs, keep directed distances and do not assume symmetry.',
  'If you only need a path, use the path variant to avoid the return edge.',
  'If distances are Euclidean and n is large, use Christofides or local search.',
  'If you need the actual route, store parents during DP.',
]

const advancedInsights = [
  {
    title: 'Meet-in-the-middle',
    detail:
      'Split the set of cities into two halves to reduce memory, at the cost of more complex merging.',
  },
  {
    title: 'Bitset iteration tricks',
    detail:
      'Iterate submasks efficiently with sub = (sub - 1) & mask to explore subsets.',
  },
  {
    title: 'Lower bounds for pruning',
    detail:
      'Add MST or 1-tree lower bounds to prune states when combining DP with branch and bound.',
  },
  {
    title: 'Tour reconstruction',
    detail:
      'Store parent pointers in dp to rebuild the optimal tour path after computing costs.',
  },
]

const takeaways = [
  'Bitmask DP solves TSP exactly by enumerating subsets.',
  'dp[mask][i] encodes the cheapest path to i with visited mask.',
  'The algorithm scales as O(n^2 2^n), practical up to about 20 cities.',
  'Variants are easy to adapt: path, cycle, fixed endpoints, asymmetric costs.',
  'For large n, use heuristics or approximation algorithms instead.',
]

const glossaryTerms = [
  {
    term: 'Bitmask',
    definition: 'An integer whose binary bits encode which cities are included in a subset.',
  },
  {
    term: 'Held-Karp',
    definition: 'The classic O(n^2 2^n) dynamic programming algorithm for exact TSP.',
  },
  {
    term: 'State dp[mask][i]',
    definition: 'Best cost to visit cities in mask and finish at city i from the chosen start.',
  },
  {
    term: 'Transition',
    definition: 'Update by adding one endpoint city from a smaller subset state.',
  },
  {
    term: 'Full mask',
    definition: 'The subset where all n cities are visited: (1<<n) - 1.',
  },
  {
    term: 'Path TSP',
    definition: 'Visit all cities once without returning to start.',
  },
  {
    term: 'Cycle TSP',
    definition: 'Visit all cities and return to the starting city.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bitmaskHelpStyles = `
.bitmask-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bitmask-window {
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

.bitmask-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bitmask-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.bitmask-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.bitmask-control {
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
}

.bitmask-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.bitmask-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.bitmask-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bitmask-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.bitmask-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.bitmask-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.bitmask-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bitmask-toc-list li {
  margin: 0 0 8px;
}

.bitmask-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bitmask-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.bitmask-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.bitmask-section {
  margin: 0 0 20px;
}

.bitmask-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.bitmask-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.bitmask-content p,
.bitmask-content li {
  font-size: 12px;
  line-height: 1.5;
}

.bitmask-content p {
  margin: 0 0 10px;
}

.bitmask-content ul,
.bitmask-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bitmask-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.bitmask-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.bitmask-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .bitmask-main {
    grid-template-columns: 1fr;
  }

  .bitmask-toc {
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
    { id: 'bp-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-definitions', label: 'Definitions' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'End-to-End Workflow' },
    { id: 'core-algorithm', label: 'DP Workflow' },
    { id: 'core-implementation-notes', label: 'Implementation Notes' },
    { id: 'core-optimization', label: 'Optimization Ideas' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-implementation-checklist', label: 'Implementation Checklist' },
    { id: 'core-testing', label: 'Testing and Edge Cases' },
    { id: 'core-decision', label: 'When To Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BitmaskDPTSPPage(): JSX.Element {
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
    document.title = `Bitmask DP (TSP) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Bitmask DP (TSP)',
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
    <div className="bitmask-help-page">
      <style>{bitmaskHelpStyles}</style>
      <div className="bitmask-window" role="presentation">
        <header className="bitmask-titlebar">
          <span className="bitmask-title-text">Bitmask DP (TSP)</span>
          <div className="bitmask-title-controls">
            <button className="bitmask-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bitmask-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="bitmask-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bitmask-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bitmask-main">
          <aside className="bitmask-toc" aria-label="Table of contents">
            <h2 className="bitmask-toc-title">Contents</h2>
            <ul className="bitmask-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bitmask-content">
            <h1 className="bitmask-doc-title">Bitmask DP (TSP)</h1>
            <p>
              Bitmask DP, also called the Held-Karp algorithm, solves the traveling salesman problem exactly by enumerating
              subsets of visited cities. It trades exponential time for optimality and is the go-to solution for small instances.
              This page explains the state, transitions, variants, and how to reconstruct the optimal tour.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bitmask-section">
                  <h2 className="bitmask-heading">Overview</h2>
                  <p>
                    The key idea is to remember which cities have been visited (a bitmask) and where you are now (the endpoint).
                    This captures enough information to extend the path optimally without rechecking all permutations.
                  </p>
                  <p>
                    The DP builds solutions by subset size and guarantees exact optimality for small n.
                  </p>
                </section>
                <hr className="bitmask-divider" />
                <section id="bp-history" className="bitmask-section">
                  <h2 className="bitmask-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bitmask-divider" />
                <section id="bp-models" className="bitmask-section">
                  <h2 className="bitmask-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bitmask-divider" />
                <section id="bp-complexity" className="bitmask-section">
                  <h2 className="bitmask-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bitmask-divider" />
                <section id="bp-applications" className="bitmask-section">
                  <h2 className="bitmask-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bitmask-divider" />
                <section id="bp-takeaways" className="bitmask-section">
                  <h2 className="bitmask-heading">Key Takeaways</h2>
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
                <section id="core-definitions" className="bitmask-section">
                  <h2 className="bitmask-heading">Definitions That Matter</h2>
                  {keyDefinitions.map((block) => (
                    <div key={block.heading}>
                      <h3 className="bitmask-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-variants" className="bitmask-section">
                  <h2 className="bitmask-heading">Problem Variants</h2>
                  {problemVariants.map((block) => (
                    <div key={block.heading}>
                      <h3 className="bitmask-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="bitmask-section">
                  <h2 className="bitmask-heading">End-to-End Workflow</h2>
                  <ol>
                    {workflowSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="core-algorithm" className="bitmask-section">
                  <h2 className="bitmask-heading">DP Workflow</h2>
                  <ol>
                    {algorithmSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="core-implementation-notes" className="bitmask-section">
                  <h2 className="bitmask-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-optimization" className="bitmask-section">
                  <h2 className="bitmask-heading">Optimization Ideas</h2>
                  {optimizationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="bitmask-section">
                  <h2 className="bitmask-heading">Why It Is Correct (Sketch)</h2>
                  {correctnessSketch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="bitmask-section">
                  <h2 className="bitmask-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation-checklist" className="bitmask-section">
                  <h2 className="bitmask-heading">Implementation Checklist</h2>
                  <ul>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-testing" className="bitmask-section">
                  <h2 className="bitmask-heading">Testing and Edge Cases</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decision" className="bitmask-section">
                  <h2 className="bitmask-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="bitmask-section">
                  <h2 className="bitmask-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="bitmask-section">
                <h2 className="bitmask-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="bitmask-subheading">{example.title}</h3>
                    <div className="bitmask-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bitmask-section">
                <h2 className="bitmask-heading">Glossary</h2>
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
