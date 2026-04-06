import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'The Traveling Salesman Problem (TSP) asks for the shortest possible tour that visits each city exactly once and returns to the start.',
    notes:
      'It is a cornerstone NP-hard optimization problem with huge practical impact.',
  },
  {
    title: 'Why it matters',
    details:
      'TSP models routing, scheduling, circuit design, and logistics, where small improvements save major costs.',
    notes:
      'It is used to benchmark exact and heuristic optimization methods.',
  },
  {
    title: 'What it teaches',
    details:
      'Combinatorial explosion, approximation strategies, and tradeoffs between optimality and runtime.',
    notes:
      'It illustrates how algorithmic complexity shapes real-world systems.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'A set of n cities and a distance (or cost) between every pair of cities.',
  },
  {
    title: 'Output',
    detail:
      'A minimum-length Hamiltonian cycle that visits all cities exactly once.',
  },
  {
    title: 'Objective',
    detail:
      'Minimize total tour length.',
  },
  {
    title: 'Variants',
    detail:
      'Symmetric vs asymmetric distances, metric vs non-metric, Euclidean vs arbitrary.',
  },
]

const glossary = [
  { term: 'Tour', definition: 'A cycle that visits every city exactly once.' },
  { term: 'Hamiltonian cycle', definition: 'A cycle that includes every vertex exactly once.' },
  { term: 'Metric TSP', definition: 'Distances satisfy the triangle inequality.' },
  { term: 'Asymmetric TSP (ATSP)', definition: 'Distance from i to j may differ from j to i.' },
  { term: 'Approximation', definition: 'An algorithm that guarantees a tour within a factor of optimal.' },
  { term: 'Heuristic', definition: 'A fast method that often works well but lacks worst-case guarantees.' },
  { term: 'Branch and bound', definition: 'Exact search that prunes partial solutions using lower bounds.' },
  { term: 'Held-Karp', definition: 'A classic dynamic programming algorithm for exact TSP.' },
]

const algorithmLandscape = [
  {
    title: 'Exact algorithms',
    detail:
      'Branch and bound, dynamic programming (Held-Karp), and integer linear programming (ILP).',
  },
  {
    title: 'Approximation algorithms',
    detail:
      'Christofides (1.5-approx) for metric TSP; MST-based 2-approx.',
  },
  {
    title: 'Heuristics & metaheuristics',
    detail:
      'Nearest neighbor, 2-opt/3-opt, simulated annealing, genetic algorithms, ant colony optimization.',
  },
  {
    title: 'Special cases',
    detail:
      'Euclidean TSP allows geometric optimizations and strong practical solvers.',
  },
]

const complexity = [
  {
    title: 'NP-hard',
    detail:
      'TSP is NP-hard; exact solutions grow exponentially with n.',
  },
  {
    title: 'Exact DP',
    detail:
      'Held-Karp runs in O(n^2 2^n) time and O(n 2^n) space.',
  },
  {
    title: 'Lower bounds',
    detail:
      'MST and 1-tree bounds help prune search in branch-and-bound solvers.',
  },
  {
    title: 'Approximation limits',
    detail:
      'For non-metric TSP, no constant-factor approximation is known unless P=NP.',
  },
]

const exactMethods = [
  {
    title: 'Held-Karp DP',
    detail:
      'State: dp[subset][last] = shortest path that starts at 0, visits subset, ends at last.',
  },
  {
    title: 'Branch and bound',
    detail:
      'Explore tours while pruning partial paths using optimistic lower bounds.',
  },
  {
    title: 'ILP formulations',
    detail:
      'Binary variables x_ij with subtour elimination constraints enforce a valid tour.',
  },
  {
    title: 'Cutting planes',
    detail:
      'Iteratively add constraints to eliminate subtours found by relaxed ILP solutions.',
  },
  {
    title: '1-tree bounds',
    detail:
      'A 1-tree is an MST on n-1 nodes plus two edges to the start node; it yields strong lower bounds.',
  },
]

const approximationAlgorithms = [
  {
    title: 'MST 2-approx (metric)',
    detail:
      'Double an MST, take an Euler tour, then shortcut repeated vertices.',
  },
  {
    title: 'Christofides (1.5-approx)',
    detail:
      'MST + minimum perfect matching on odd-degree nodes + Euler tour + shortcut.',
  },
  {
    title: 'ATSP approximations',
    detail:
      'Approximation ratios are weaker; algorithms are more complex.',
  },
  {
    title: 'Double-tree variant',
    detail:
      'Preorder traversal of an MST yields a 2-approx in metric spaces.',
  },
]

const heuristics = [
  {
    title: 'Nearest neighbor',
    detail:
      'Repeatedly go to the closest unvisited city.',
  },
  {
    title: '2-opt / 3-opt',
    detail:
      'Iteratively improve a tour by swapping edges to reduce length.',
  },
  {
    title: 'Simulated annealing',
    detail:
      'Accept worse moves with a decaying probability to escape local minima.',
  },
  {
    title: 'Genetic algorithms',
    detail:
      'Evolve a population of tours using crossover and mutation.',
  },
  {
    title: 'Ant colony optimization',
    detail:
      'Probabilistic exploration guided by pheromone trails.',
  },
  {
    title: 'Lin-Kernighan (LK)',
    detail:
      'A powerful variable k-opt heuristic used in high-quality TSP solvers.',
  },
  {
    title: 'Greedy insertion',
    detail:
      'Build a tour by inserting each city where it increases length the least.',
  },
]

const correctnessInsights = [
  {
    title: 'Optimality of exact methods',
    detail:
      'DP and ILP methods guarantee optimal solutions but scale exponentially.',
  },
  {
    title: 'Approximation guarantees',
    detail:
      'Metric TSP admits constant-factor approximations; non-metric does not.',
  },
  {
    title: 'Heuristic tradeoffs',
    detail:
      'Heuristics trade guarantees for speed and practical quality.',
  },
  {
    title: 'Lower bounds matter',
    detail:
      'Bounds like MST or 1-tree quantify how far a heuristic is from optimal.',
  },
]

const variants = [
  {
    title: 'Symmetric vs asymmetric',
    detail:
      'Symmetric distances satisfy d(i,j)=d(j,i); asymmetric relaxes this.',
  },
  {
    title: 'Metric vs non-metric',
    detail:
      'Triangle inequality enables better approximations.',
  },
  {
    title: 'Euclidean TSP',
    detail:
      'Distances are geometric; specialized solvers can be very effective.',
  },
  {
    title: 'Prize-collecting TSP',
    detail:
      'You may skip some cities at a penalty.',
  },
  {
    title: 'Time windows',
    detail:
      'Each city must be visited within a time interval, adding scheduling constraints.',
  },
  {
    title: 'Vehicle routing (VRP)',
    detail:
      'Multiple tours with capacity constraints generalize TSP.',
  },
]

const applications = [
  {
    title: 'Logistics & routing',
    detail:
      'Delivery routes, warehouse picking paths, and vehicle routing variants.',
  },
  {
    title: 'Circuit design',
    detail:
      'PCB drilling paths and microchip wire routing.',
  },
  {
    title: 'Scheduling',
    detail:
      'Order of tasks with transition costs.',
  },
  {
    title: 'Bioinformatics',
    detail:
      'Genome sequencing and protein folding approximations.',
  },
  {
    title: 'Robotics',
    detail:
      'Efficient coverage paths for inspection and mapping.',
  },
]

const formulations = [
  {
    title: 'ILP subtour elimination',
    detail:
      'Minimize sum(dist[i][j] * x[i][j]) with degree constraints and subtour elimination constraints.',
  },
  {
    title: 'MTZ formulation',
    detail:
      'Miller-Tucker-Zemlin adds ordering variables to prevent subtours (weaker but simpler).',
  },
  {
    title: 'Flow-based formulation',
    detail:
      'Send one unit of flow through the tour to enforce connectivity.',
  },
  {
    title: 'Assignment relaxation',
    detail:
      'Solve assignment then cut subtours; yields a lower bound.',
  },
]

const lowerBounds = [
  {
    title: 'MST bound',
    detail:
      'Any tour contains a spanning tree, so MST weight is a lower bound for metric TSP.',
  },
  {
    title: '1-tree bound',
    detail:
      'Add two cheapest edges to a chosen root plus MST on remaining nodes.',
  },
  {
    title: 'LP relaxation',
    detail:
      'Relax integrality to get a fractional solution with a lower bound.',
  },
  {
    title: 'Held-Karp bound',
    detail:
      'A strengthened 1-tree bound used in powerful exact solvers.',
  },
]

const pitfallsAndCounterexamples = [
  {
    title: 'Nearest neighbor trap',
    detail:
      'A greedy tour can be arbitrarily worse than optimal on contrived instances.',
  },
  {
    title: 'Crossing edges',
    detail:
      'In Euclidean TSP, any optimal tour has no edge crossings; crossings are a counterexample to optimality.',
  },
  {
    title: 'Non-metric counterexample',
    detail:
      'If triangle inequality fails, shortcutting can increase cost; MST-based 2-approx fails.',
  },
  {
    title: 'ATSP asymmetry',
    detail:
      'Best symmetric heuristics can perform poorly when distances are asymmetric.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Assuming nearest neighbor is optimal',
    description:
      'Greedy tours can be far from optimal, especially in clustered data.',
  },
  {
    mistake: 'Ignoring triangle inequality',
    description:
      'Approximation guarantees rely on metric distances; without it, results can degrade.',
  },
  {
    mistake: 'Overlooking subtours',
    description:
      'ILP formulations need subtour elimination constraints to prevent invalid cycles.',
  },
  {
    mistake: 'Expecting scalability from exact methods',
    description:
      'Exact solvers can handle moderate n but still face exponential growth.',
  },
  {
    mistake: 'Using heuristics without validation',
    description:
      'Always benchmark with known lower bounds or smaller exact solutions.',
  },
]

const pseudocode = [
  {
    title: 'Held-Karp DP (outline)',
    code: `dp[mask][j] = min cost to start at 0, visit mask, end at j
dp[1<<0][0] = 0
for mask containing 0:
  for j in mask:
    dp[mask][j] = min_{i in mask, i!=j}(dp[mask without j][i] + dist[i][j])
answer = min_j(dp[all][j] + dist[j][0])`,
    explanation:
      'Exact but exponential: O(n^2 2^n).',
  },
  {
    title: '2-opt local search',
    code: `repeat until no improvement:
  for each pair of edges (a,b) and (c,d):
    if swapping reduces length:
      perform swap`,
    explanation:
      'A simple yet powerful heuristic for improving tours.',
  },
  {
    title: 'MST 2-approx (metric)',
    code: `build MST
double edges to form Euler tour
shortcut repeated vertices
return tour`,
    explanation:
      'Guarantees at most 2x optimal for metric TSP.',
  },
  {
    title: 'Christofides (metric)',
    code: `build MST
find odd-degree vertices
compute min perfect matching on odd vertices
combine to Eulerian multigraph
Euler tour + shortcut -> tour`,
    explanation:
      '1.5-approximation for metric TSP.',
  },
  {
    title: 'Greedy insertion',
    code: `start with small cycle
for each remaining city:
  insert where added length is minimal`,
    explanation:
      'A simple constructive heuristic with decent performance in practice.',
  },
]

const workedExamples = [
  {
    title: '4-city square (Euclidean)',
    code: `Cities: (0,0), (1,0), (1,1), (0,1)
Optimal tour length = 4`,
    explanation:
      'The perimeter tour is optimal; any crossing adds extra length.',
  },
  {
    title: 'Nearest neighbor trap',
    code: `Cluster A close together, Cluster B far away
Nearest neighbor can get stuck with a long final jump`,
    explanation:
      'Greedy choices can create expensive late edges.',
  },
  {
    title: '2-opt removes crossings',
    code: `If edges (a,b) and (c,d) cross:
swap to (a,c) and (b,d) to reduce length`,
    explanation:
      'In Euclidean TSP, removing crossings always improves or preserves length.',
  },
  {
    title: 'Non-metric failure',
    code: `d(A,C) > d(A,B) + d(B,C)
Shortcutting can increase total distance`,
    explanation:
      'Triangle inequality is crucial for shortcut-based approximations.',
  },
]

const timelineScenarios = [
  {
    id: 'dp',
    title: 'Held-Karp DP',
    steps: [
      'Initialize dp with only the start city.',
      'Expand subsets by adding one city at a time.',
      'Keep best cost ending at each city.',
      'Complete the tour by returning to start.',
    ],
    summary:
      'DP enumerates subsets to guarantee optimality.',
  },
  {
    id: 'christofides',
    title: 'Christofides (metric)',
    steps: [
      'Build MST of the cities.',
      'Find odd-degree vertices.',
      'Compute minimum perfect matching on odd vertices.',
      'Combine to make an Eulerian multigraph.',
      'Shortcut to a Hamiltonian tour.',
    ],
    summary:
      'A 1.5-approximation for metric TSP.',
  },
  {
    id: 'two-opt',
    title: '2-opt improvement',
    steps: [
      'Start with a tour.',
      'Pick two edges and swap endpoints.',
      'If tour length reduces, keep the swap.',
      'Repeat until no improvement.',
    ],
    summary:
      'Local search often yields strong solutions quickly.',
  },
  {
    id: 'branch-bound',
    title: 'Branch and bound',
    steps: [
      'Start with a partial tour.',
      'Compute a lower bound for completing it.',
      'If bound exceeds best tour, prune.',
      'Otherwise branch by choosing the next city.',
    ],
    summary:
      'Exact search becomes feasible by pruning large portions of the search tree.',
  },
]

const tspMindMap = [
  {
    id: 'root',
    title: 'TSP',
    detail:
      'Shortest tour visiting each city exactly once.',
  },
  {
    id: 'complexity',
    title: 'Complexity',
    detail:
      'NP-hard; exponential exact methods.',
  },
  {
    id: 'exact',
    title: 'Exact Methods',
    detail:
      'DP, branch and bound, ILP.',
  },
  {
    id: 'approx',
    title: 'Approximation',
    detail:
      'Christofides, MST 2-approx (metric).',
  },
  {
    id: 'heuristics',
    title: 'Heuristics',
    detail:
      'Nearest neighbor, 2-opt, metaheuristics.',
  },
  {
    id: 'variants',
    title: 'Variants',
    detail:
      'Metric, asymmetric, prize-collecting.',
  },
  {
    id: 'applications',
    title: 'Applications',
    detail:
      'Routing, circuits, scheduling.',
  },
  {
    id: 'bounds',
    title: 'Lower Bounds',
    detail:
      'MST, 1-tree, LP relaxation.',
  },
]

const mindMapEdges = [
  { from: 'TSP', to: 'Complexity', note: 'Defines difficulty' },
  { from: 'Complexity', to: 'Exact Methods', note: 'Optimal but slow' },
  { from: 'Complexity', to: 'Approximation', note: 'Guaranteed but not optimal' },
  { from: 'Complexity', to: 'Heuristics', note: 'Fast with no guarantee' },
  { from: 'Exact Methods', to: 'Lower Bounds', note: 'Pruning and quality checks' },
  { from: 'TSP', to: 'Variants', note: 'Changes constraints' },
  { from: 'TSP', to: 'Applications', note: 'Real-world usage' },
]

const evaluationChecklist = [
  {
    title: 'Metric assumption?',
    detail:
      'If distances satisfy triangle inequality, use metric-specific algorithms.',
  },
  {
    title: 'Need exact or approximate?',
    detail:
      'Exact solvers for small n; heuristics for large n.',
  },
  {
    title: 'Bound quality',
    detail:
      'Compare heuristic tours against MST/1-tree or LP bounds.',
  },
  {
    title: 'Time budget',
    detail:
      'TSP is exponential; set realistic time limits.',
  },
  {
    title: 'Instance structure',
    detail:
      'Euclidean instances are easier than arbitrary distance matrices.',
  },
  {
    title: 'Validation',
    detail:
      'Ensure the tour is a Hamiltonian cycle (visits each city exactly once).',
  },
]

const faq = [
  {
    question: 'Why is TSP so hard?',
    answer:
      'The number of tours grows factorially with n, making brute force infeasible.',
  },
  {
    question: 'Is TSP solved in practice?',
    answer:
      'Yes for many real-world sizes using advanced exact solvers and heuristics.',
  },
  {
    question: 'Is metric TSP easier?',
    answer:
      'It is still NP-hard, but good approximation guarantees exist.',
  },
  {
    question: 'Do heuristics always work well?',
    answer:
      'Not always; evaluate with lower bounds or small exact solutions.',
  },
  {
    question: 'What is the best known algorithm?',
    answer:
      'No single best algorithm; solvers combine ILP, cutting planes, and heuristics.',
  },
]

const keyTakeaways = [
  'TSP is NP-hard; exact solutions scale exponentially.',
  'Metric TSP admits strong approximations like Christofides.',
  'Heuristics provide fast, high-quality tours without guarantees.',
  'Lower bounds help measure solution quality.',
  'Practical solvers combine exact methods with heuristics.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tspHelpStyles = `
.tsp-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.tsp-help-window {
  width: 100%;
  min-height: 100dvh;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.tsp-help-titlebar {
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

.tsp-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.tsp-help-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  white-space: nowrap;
}

.tsp-help-control {
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
  font-family: inherit;
  cursor: pointer;
}

.tsp-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.tsp-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.tsp-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.tsp-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.tsp-help-toc {
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.tsp-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.tsp-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tsp-help-toc-list li {
  margin: 0 0 8px;
}

.tsp-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.tsp-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.tsp-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.tsp-help-section {
  margin: 0 0 22px;
}

.tsp-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.tsp-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.tsp-help-content p,
.tsp-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.tsp-help-content p {
  margin: 0 0 10px;
}

.tsp-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.tsp-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.tsp-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow-x: auto;
}

.tsp-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.tsp-help-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.tsp-help-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  padding: 4px 8px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.tsp-help-push.is-active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #b6b6b6;
}

.tsp-help-status {
  color: #202020;
}

@media (max-width: 900px) {
  .tsp-help-main {
    grid-template-columns: 1fr;
  }

  .tsp-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .tsp-help-title-text {
    position: static;
    transform: none;
    margin-right: 8px;
    font-size: 13px;
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
    { id: 'bp-importance', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-complexity', label: 'Complexity and Bounds' },
    { id: 'core-exact', label: 'Exact Methods' },
    { id: 'core-approx', label: 'Approximation' },
    { id: 'core-heuristics', label: 'Heuristics' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-checklist', label: 'Evaluation Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-growth', label: 'Tour Count Growth' },
    { id: 'ex-stepper', label: 'Algorithm Stepper' },
    { id: 'ex-mindmap', label: 'Concept Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function TspPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultScenario = timelineScenarios[0] ?? {
    id: 'fallback',
    title: 'No scenarios configured',
    steps: ['No steps available.'],
    summary: 'No summary available.',
  }
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [stepIndex, setStepIndex] = useState(0)
  const [cityCount, setCityCount] = useState(5)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? defaultScenario
  const stepText = selectedScenario.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = stepIndex < selectedScenario.steps.length - 1
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  const approxTours = useMemo(() => {
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
    if (cityCount > 10) {
      return null
    }
    return factorial(cityCount - 1) / 2
  }, [cityCount])

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Traveling Salesman Problem (TSP) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Traveling Salesman Problem (TSP)',
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
    <div className="tsp-help-page">
      <style>{tspHelpStyles}</style>
      <div className="tsp-help-window" role="presentation">
        <header className="tsp-help-titlebar">
          <span className="tsp-help-title-text">Traveling Salesman Problem (TSP)</span>
          <div className="tsp-help-title-controls">
            <button className="tsp-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="tsp-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="tsp-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tsp-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tsp-help-main">
          <aside className="tsp-help-toc" aria-label="Table of contents">
            <h2 className="tsp-help-toc-title">Contents</h2>
            <ul className="tsp-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="tsp-help-content">
            <h1 className="tsp-help-doc-title">Traveling Salesman Problem (TSP)</h1>
            <p>
              The Traveling Salesman Problem asks for the shortest tour that visits every city once and returns to the start. It is
              a central NP-hard problem with deep theory and massive practical relevance. This document keeps the full topic scope
              intact while reorganizing it into a Windows Help style reference.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="tsp-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                  <h3 className="tsp-help-subheading">Problem Setup</h3>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="tsp-help-divider" />

                <section id="bp-importance" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Why It Matters</h2>
                  <h3 className="tsp-help-subheading">Algorithm Landscape</h3>
                  {algorithmLandscape.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="tsp-help-subheading">Applications</h3>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="tsp-help-divider" />

                <section id="bp-takeaways" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-complexity" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Complexity and Bounds</h2>
                  {complexity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="tsp-help-subheading">Lower Bounds</h3>
                  {lowerBounds.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-exact" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Exact Methods</h2>
                  {exactMethods.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="tsp-help-subheading">Formulations</h3>
                  {formulations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-approx" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Approximation</h2>
                  {approximationAlgorithms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-heuristics" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Heuristics and Metaheuristics</h2>
                  {heuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-correctness" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Correctness and Guarantees</h2>
                  {correctnessInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variants" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Variants</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Pitfalls and Counterexamples</h2>
                  {pitfallsAndCounterexamples.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="tsp-help-subheading">Common Pitfalls</h3>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-checklist" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Evaluation Checklist</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-faq" className="tsp-help-section">
                  <h2 className="tsp-help-heading">FAQ</h2>
                  {faq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-pseudocode" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Pseudocode Reference</h2>
                  {pseudocode.map((item) => (
                    <div key={item.title}>
                      <h3 className="tsp-help-subheading">{item.title}</h3>
                      <div className="tsp-help-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-worked" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Worked Examples</h2>
                  {workedExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="tsp-help-subheading">{item.title}</h3>
                      <div className="tsp-help-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-growth" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Tour Count Growth</h2>
                  <p>Number of distinct tours grows as (n-1)! / 2 for symmetric TSP. This shows why brute force is infeasible.</p>
                  <p className="tsp-help-status">
                    <strong>Cities:</strong> {cityCount} <strong>Approx tours:</strong>{' '}
                    {approxTours === null ? 'Too large to compute' : approxTours.toLocaleString()}
                  </p>
                  <div className="tsp-help-inline-buttons">
                    {[4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`tsp-help-push ${cityCount === value ? 'is-active' : ''}`}
                        onClick={() => setCityCount(value)}
                        aria-pressed={cityCount === value}
                      >
                        {value} cities
                      </button>
                    ))}
                  </div>
                </section>

                <section id="ex-stepper" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Algorithm Stepper</h2>
                  <p>Step through core ideas behind exact, approximation, and heuristic approaches.</p>
                  <div className="tsp-help-inline-buttons">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className={`tsp-help-push ${selectedScenarioId === scenario.id ? 'is-active' : ''}`}
                        onClick={() => {
                          setSelectedScenarioId(scenario.id)
                          setStepIndex(0)
                        }}
                        aria-pressed={selectedScenarioId === scenario.id}
                      >
                        {scenario.title}
                      </button>
                    ))}
                  </div>
                  <p>
                    <strong>Selected:</strong> {selectedScenario.title}
                  </p>
                  <p>{stepText}</p>
                  <p>
                    <strong>Summary:</strong> {selectedScenario.summary}
                  </p>
                  <div className="tsp-help-inline-buttons">
                    <button type="button" className="tsp-help-push" onClick={() => setStepIndex(0)}>
                      Reset
                    </button>
                    <button
                      type="button"
                      className="tsp-help-push"
                      onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="tsp-help-push"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      Step
                    </button>
                  </div>
                </section>

                <section id="ex-mindmap" className="tsp-help-section">
                  <h2 className="tsp-help-heading">Concept Walkthrough</h2>
                  <p>
                    <strong>Walkthrough:</strong> Start at TSP -&gt; Complexity, then branch into Exact vs Approx vs Heuristic
                    solutions. Finish with Variants and Applications.
                  </p>
                  <h3 className="tsp-help-subheading">Nodes</h3>
                  {tspMindMap.map((item) => (
                    <p key={item.id}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="tsp-help-subheading">Connections</h3>
                  {mindMapEdges.map((edge) => (
                    <p key={`${edge.from}-${edge.to}`}>
                      <strong>
                        {edge.from} -&gt; {edge.to}:
                      </strong>{' '}
                      {edge.note}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="tsp-help-section">
                <h2 className="tsp-help-heading">Glossary</h2>
                {glossary.map((item) => (
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
