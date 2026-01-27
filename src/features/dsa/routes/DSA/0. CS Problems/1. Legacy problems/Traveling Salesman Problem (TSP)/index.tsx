import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

export default function TspPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'dp')
  const [stepIndex, setStepIndex] = useState(0)
  const [cityCount, setCityCount] = useState(5)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  const approxTours = useMemo(() => {
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
    return cityCount <= 10 ? factorial(cityCount - 1) : null
  }, [cityCount])

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Traveling Salesman Problem (TSP)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The canonical hard optimization puzzle</div>
              <p className="win95-text">
                The Traveling Salesman Problem asks for the shortest tour that visits every city once and returns to the start. It is
                a central NP-hard problem with deep theory and massive practical relevance. This page covers exact and approximate
                algorithms, heuristics, correctness insights, and a conceptual mind map.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {glossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Landscape</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmLandscape.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Exact Methods</legend>
            <div className="win95-grid win95-grid-2">
              {exactMethods.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formulations</legend>
            <div className="win95-grid win95-grid-2">
              {formulations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Approximation Algorithms</legend>
            <div className="win95-grid win95-grid-2">
              {approximationAlgorithms.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Heuristics & Metaheuristics</legend>
            <div className="win95-grid win95-grid-2">
              {heuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness & Guarantees</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity</legend>
            <div className="win95-grid win95-grid-2">
              {complexity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Lower Bounds</legend>
            <div className="win95-grid win95-grid-2">
              {lowerBounds.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tour Count Growth</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Number of distinct tours grows as (n-1)! / 2 for symmetric TSP. This shows why brute force is infeasible.
              </p>
              <div className="win95-grid win95-grid-2">
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Cities:</strong> {cityCount}</p>
                  <p className="win95-text">
                    <strong>Approx tours:</strong> {approxTours ?? 'Too large to compute'}
                  </p>
                </div>
                <div className="win95-grid win95-grid-3">
                  {[4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="win95-button"
                      onClick={() => setCityCount(value)}
                    >
                      {value} cities
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls & Counterexamples</legend>
            <div className="win95-grid win95-grid-2">
              {pitfallsAndCounterexamples.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive Timeline</legend>
            <div className="win95-panel">
              <div className="win95-heading">Algorithm Stepper</div>
              <p className="win95-text">
                Step through core ideas behind exact, approximation, and heuristic approaches.
              </p>
              <div className="win95-grid win95-grid-3">
                {timelineScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setStepIndex(0)
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                <p className="win95-text">{stepText}</p>
                <p className="win95-text win95-note">{selectedScenario?.summary ?? ''}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex(0)}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  BACK
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    if (canStepForward) {
                      setStepIndex((prev) => prev + 1)
                    }
                  }}
                >
                  STEP
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map (Concept Walkthrough)</legend>
            <div className="win95-grid win95-grid-2">
              {tspMindMap.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                <strong>Walkthrough:</strong> Start at TSP -&gt; Complexity, then branch into Exact vs Approx vs Heuristic solutions.
                Finish with Variants and Applications.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map Edges</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Why it connects</th>
                  </tr>
                </thead>
                <tbody>
                  {mindMapEdges.map((edge) => (
                    <tr key={`${edge.from}-${edge.to}`}>
                      <td>{edge.from}</td>
                      <td>{edge.to}</td>
                      <td>{edge.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Evaluation Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {commonPitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>FAQ</legend>
            <div className="win95-stack">
              {faq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
