import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function BitmaskDPTSPPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bitmask DP (TSP)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Exact traveling salesman with subset DP and binary masks</div>
              <p className="win95-text">
                Bitmask DP, also called the Held-Karp algorithm, solves the traveling salesman problem exactly by enumerating
                subsets of visited cities. It trades exponential time for optimality and is the go-to solution for small instances.
                This page explains the state, transitions, variants, and how to reconstruct the optimal tour.
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
                The key idea is to remember which cities have been visited (a bitmask) and where you are now (the endpoint).
                This captures enough information to extend the path optimally without rechecking all permutations.
                The DP builds solutions by subset size and guarantees exact optimality for small n.
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
            <legend>Definitions that matter</legend>
            <div className="win95-grid win95-grid-2">
              {keyDefinitions.map((block) => (
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
            <legend>End-to-end workflow</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: DP workflow</legend>
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
                Correctness idea: any optimal tour has a prefix that is itself optimal for its visited subset and endpoint.
                The DP enumerates all subsets, so it cannot miss the optimal path.
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
            <legend>Optimization ideas</legend>
            <div className="win95-grid win95-grid-2">
              {optimizationNotes.map((item) => (
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
                Bitmask DP is exact but exponential. Use it when you must be optimal and the problem size is small enough.
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
            <legend>Why it is correct (sketch)</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
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

