import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'Assign a color (label) to every vertex so that adjacent vertices never share the same color.',
    notes:
      'It is a classic constraint satisfaction problem with a clean graph-theory formulation.',
  },
  {
    title: 'Why it matters',
    details:
      'It models conflicts: two things that cannot share a resource must receive different colors.',
    notes:
      'Scheduling, register allocation, frequency assignment, and timetabling all reduce to coloring.',
  },
  {
    title: 'What it asks',
    details:
      'The decision version asks if k colors are enough; the optimization version seeks the minimum k.',
    notes:
      'The minimum k is the chromatic number, written chi(G).',
  },
]

const historicalContext = [
  {
    title: '1850s: Map coloring puzzle',
    details:
      'The question of coloring maps so that neighboring regions differ gave the earliest popular motivation.',
    notes:
      'This eventually became the Four Color Theorem for planar graphs.',
  },
  {
    title: 'Early 1900s: Graph theory formalizes coloring',
    details:
      'Vertices and edges gave a clean mathematical model for adjacency and conflict constraints.',
    notes:
      'Graph coloring became a core topic alongside matchings and connectivity.',
  },
  {
    title: '1970s: Complexity theory classifies it',
    details:
      'The k-coloring decision problem was shown to be NP-complete for k >= 3.',
    notes:
      'This established that exact solutions scale poorly in the worst case.',
  },
  {
    title: '1990s+: Heuristics and SAT/ILP solvers',
    details:
      'Modern solvers use branch-and-bound, DSATUR, and reductions to SAT or ILP.',
    notes:
      'These tools solve many real instances quickly even though the worst case is exponential.',
  },
]

const quickGlossary = [
  {
    term: 'Proper coloring',
    definition: 'An assignment of colors to vertices where every edge has different colors at its ends.',
  },
  {
    term: 'Chromatic number chi(G)',
    definition: 'The smallest number of colors needed to properly color the graph.',
  },
  {
    term: 'k-coloring',
    definition: 'A proper coloring that uses at most k colors.',
  },
  {
    term: 'Clique',
    definition: 'A set of vertices where every pair is adjacent. A clique of size w needs w colors.',
  },
  {
    term: 'Bipartite graph',
    definition: 'A graph with no odd cycles; it is 2-colorable.',
  },
  {
    term: 'Greedy coloring',
    definition: 'Color vertices one by one, giving each the smallest available color.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'A graph G = (V, E). Typically undirected, simple (no loops, no parallel edges) unless stated otherwise.',
  },
  {
    title: 'Output',
    detail:
      'A color assignment for each vertex, or a proof that no assignment exists for a given k.',
  },
  {
    title: 'Constraints',
    detail:
      'For every edge (u, v), color[u] != color[v]. All other constraints are optional variants.',
  },
  {
    title: 'Decision version',
    detail:
      'Given k, determine whether a valid k-coloring exists.',
  },
]

const notation = [
  {
    title: 'n and m',
    detail:
      'n = |V| is the number of vertices, m = |E| is the number of edges.',
  },
  {
    title: 'Adjacency',
    detail:
      'Adj(u) is the set of neighbors of u. A conflict exists if any neighbor has the same color.',
  },
  {
    title: 'Degree delta',
    detail:
      'delta is the maximum degree in the graph. A simple upper bound is chi(G) <= delta + 1.',
  },
  {
    title: 'Clique number omega',
    detail:
      'omega is the size of the largest clique. A lower bound is chi(G) >= omega.',
  },
]

const boundsAndFacts = [
  {
    title: 'Trivial bounds',
    detail:
      '1 <= chi(G) <= n. Complete graphs use n colors; empty graphs use 1 color.',
  },
  {
    title: 'Degree bound',
    detail:
      'chi(G) <= delta + 1 for any simple graph. Many graphs need far fewer.',
  },
  {
    title: 'Clique bound',
    detail:
      'chi(G) >= omega because all vertices in a clique must be distinct colors.',
  },
  {
    title: 'Bipartite test',
    detail:
      'If the graph is bipartite (no odd cycle), then chi(G) = 2 unless the graph has no edges.',
  },
]

const algorithmLandscape = [
  {
    title: 'Exact search',
    detail:
      'Backtracking and branch-and-bound explore colorings and prune impossible partial assignments.',
  },
  {
    title: 'Greedy heuristics',
    detail:
      'Fast and simple; quality depends heavily on vertex ordering and tie-breaking.',
  },
  {
    title: 'DSATUR',
    detail:
      'Chooses the next vertex with the highest saturation (number of distinct neighbor colors).',
  },
  {
    title: 'SAT/ILP reductions',
    detail:
      'Encode coloring as boolean or integer constraints and use a solver for optimal k.',
  },
  {
    title: 'Approximation/Metaheuristics',
    detail:
      'Tabu search, simulated annealing, and genetic algorithms trade optimality for speed.',
  },
]

const greedySteps = [
  'Choose a vertex order (simple order, degree order, or degeneracy order).',
  'For each vertex in order, collect colors used by its neighbors.',
  'Assign the smallest color not used by any neighbor.',
  'If all k colors are blocked, greedy fails for that k but may succeed with a different order.',
]

const backtrackingSteps = [
  'Pick the next uncolored vertex (often the most constrained first).',
  'Try each color from 1..k that does not conflict with neighbors.',
  'Assign a color and recurse.',
  'If all colors fail, unassign and backtrack to the previous vertex.',
]

const dsaturSteps = [
  'Start with all vertices uncolored; saturation of a vertex is the number of distinct neighbor colors.',
  'Pick the uncolored vertex with maximum saturation; break ties by highest degree.',
  'Assign the smallest available color that does not conflict with neighbors.',
  'Update saturation of its neighbors and repeat until all vertices are colored.',
]

const dataStructures = [
  {
    title: 'Adjacency list or matrix',
    detail:
      'Lists are space efficient for sparse graphs; matrices give O(1) adjacency checks.',
  },
  {
    title: 'Color array',
    detail:
      'color[v] stores the assigned color or 0 for uncolored.',
  },
  {
    title: 'Forbidden color cache',
    detail:
      'A boolean array or bitset per vertex can speed up neighbor color checks.',
  },
  {
    title: 'Ordering structures',
    detail:
      'Priority queues or buckets help select the next vertex under DSATUR or degree heuristics.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'All colored vertices always satisfy the constraint that adjacent colors differ.',
  },
  {
    title: 'Soundness',
    detail:
      'A solution is returned only after all vertices are colored without conflicts.',
  },
  {
    title: 'Completeness (backtracking)',
    detail:
      'Backtracking explores all possible assignments consistent with constraints, so it finds a solution if one exists.',
  },
  {
    title: 'Greedy limitation',
    detail:
      'Greedy coloring is correct when it succeeds but can use more colors than optimal.',
  },
]

const complexityNotes = [
  {
    title: 'Decision complexity',
    detail:
      'k-coloring is NP-complete for k >= 3, so worst-case time is exponential.',
  },
  {
    title: 'Greedy time',
    detail:
      'O(n + m) with adjacency lists if you track used colors efficiently.',
  },
  {
    title: 'Backtracking time',
    detail:
      'Worst case is O(k^n), but pruning and ordering can dramatically cut search.',
  },
  {
    title: 'Space',
    detail:
      'O(n + m) for the graph plus O(n) for colors and recursion stack.',
  },
]

const edgeCases = [
  {
    title: 'Disconnected graphs',
    detail:
      'Each component can be colored independently, but the same color set is shared across components.',
  },
  {
    title: 'Self-loops',
    detail:
      'A self-loop makes a graph uncolorable for any finite k because a vertex conflicts with itself.',
  },
  {
    title: 'Isolated vertices',
    detail:
      'Vertices with no edges can take any color and do not affect the minimum k.',
  },
  {
    title: 'Odd cycle',
    detail:
      'An odd cycle requires at least 3 colors. This is the minimal non-bipartite structure.',
  },
]

const practicalHeuristics = [
  {
    title: 'Order by degree',
    detail:
      'Color high-degree vertices first to reduce branching later.',
  },
  {
    title: 'MRV (most constrained)',
    detail:
      'Pick the vertex with the fewest available colors to force early failure or progress.',
  },
  {
    title: 'Forward checking',
    detail:
      'After assigning a color, remove that color from neighbors and detect dead ends early.',
  },
  {
    title: 'Symmetry breaking',
    detail:
      'Fix the color of one vertex to reduce equivalent permutations of color labels.',
  },
]

const variants = [
  {
    title: 'Chromatic number search',
    detail:
      'Solve the decision problem for k from a lower bound upward until the first success.',
  },
  {
    title: 'List coloring',
    detail:
      'Each vertex has its own allowed color list; constraints are per-vertex domains.',
  },
  {
    title: 'Edge coloring',
    detail:
      'Edges are colored so adjacent edges differ. This is a different problem with its own bounds.',
  },
  {
    title: 'Total coloring',
    detail:
      'Both vertices and edges are colored so all adjacent or incident items differ.',
  },
  {
    title: 'Planar graph coloring',
    detail:
      'Planar graphs can always be colored with at most four colors (Four Color Theorem).',
  },
]

const compareContrast = [
  {
    title: 'Coloring vs bipartite test',
    detail:
      'If k = 2, coloring reduces to checking for an odd cycle using BFS/DFS.',
  },
  {
    title: 'Coloring vs clique finding',
    detail:
      'Cliques provide lower bounds; a large clique proves that fewer colors are impossible.',
  },
  {
    title: 'Coloring vs independent set',
    detail:
      'A k-coloring partitions vertices into k independent sets. Maximizing an independent set helps bound k.',
  },
  {
    title: 'Vertex vs edge coloring',
    detail:
      'Vertex coloring prohibits same colors on adjacent vertices; edge coloring prohibits same colors on adjacent edges.',
  },
]

const realWorldConnections = [
  {
    title: 'Register allocation (compilers)',
    detail:
      'Variables that interfere cannot share registers. Colors represent registers.',
  },
  {
    title: 'Timetabling',
    detail:
      'Courses that share students cannot use the same time slot. Colors are time slots.',
  },
  {
    title: 'Frequency assignment',
    detail:
      'Transmitters that are geographically close must use different frequencies.',
  },
  {
    title: 'Task scheduling',
    detail:
      'Conflicting tasks cannot run at the same time on a shared resource.',
  },
  {
    title: 'Constraint programming',
    detail:
      'Coloring is a canonical example used to benchmark CSP solvers.',
  },
]

const workedExamples = [
  {
    title: 'Triangle (K3)',
    code: `Vertices: A, B, C
Edges: AB, BC, CA
Lower bound: clique size = 3
Therefore chi(G) = 3 (needs three colors)`,
    explanation:
      'A triangle is the smallest complete graph that forces 3 colors.',
  },
  {
    title: 'Square (C4)',
    code: `Vertices: A, B, C, D
Edges: AB, BC, CD, DA
Coloring: A=1, B=2, C=1, D=2
Therefore chi(G) = 2`,
    explanation:
      'An even cycle is bipartite, so 2 colors suffice.',
  },
  {
    title: 'Square with diagonal (A-C)',
    code: `Edges: AB, BC, CD, DA, AC
One valid coloring:
A=1, B=2, C=3, D=2
Thus chi(G) = 3`,
    explanation:
      'The diagonal creates a triangle, so 2 colors are impossible.',
  },
]

const pseudocode = [
  {
    title: 'Greedy coloring (simple)',
    code: `order = vertexOrdering(G)
for v in order:
  used = colorsOfNeighbors(v)
  color[v] = smallestPositiveNotIn(used)
return color`,
    explanation:
      'Greedy is fast and easy, but the number of colors depends on ordering.',
  },
  {
    title: 'Backtracking decision (k colors)',
    code: `function color(v):
  if v == n: return true
  for c in 1..k:
    if canUse(v, c):
      color[v] = c
      if color(v + 1): return true
      color[v] = 0
  return false`,
    explanation:
      'Backtracking is complete: it finds a k-coloring if one exists.',
  },
  {
    title: 'DSATUR sketch',
    code: `while uncolored vertices exist:
  pick v with max saturation (tie: max degree)
  assign smallest available color to v
  update saturation of neighbors`,
    explanation:
      'DSATUR prioritizes hard vertices early and often uses near-optimal colors.',
  },
]

const evaluationChecklist = [
  {
    title: 'Correctness',
    detail:
      'Every edge must connect two different colors. Validate by scanning all edges.',
  },
  {
    title: 'Color count',
    detail:
      'Report the number of distinct colors used and compare to lower/upper bounds.',
  },
  {
    title: 'Determinism',
    detail:
      'If using heuristics, confirm whether results are stable under the same input.',
  },
  {
    title: 'Performance',
    detail:
      'Measure runtime as graph size increases. Note when exponential blowups appear.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming greedy is optimal',
    description:
      'Greedy can use more colors than necessary; different orderings can change the answer.',
  },
  {
    mistake: 'Confusing edge coloring with vertex coloring',
    description:
      'Edge coloring is a different problem with different bounds and algorithms.',
  },
  {
    mistake: 'Ignoring self-loops',
    description:
      'A single self-loop makes the graph impossible to color under standard rules.',
  },
  {
    mistake: 'Not enforcing constraints on every step',
    description:
      'Skipping neighbor checks can accept invalid colorings and corrupt results.',
  },
]

const keyTakeaways = [
  'Graph coloring assigns labels so adjacent vertices never match, modeling conflict constraints.',
  'The decision problem is NP-complete for k >= 3, so exact algorithms can be exponential.',
  'Lower bounds (cliques) and upper bounds (degree or greedy) guide search for chi(G).',
  'Good ordering and pruning often matter more than raw CPU speed for exact search.',
  'Many practical problems are coloring problems in disguise, especially scheduling and allocation.',
]

export default function GraphColoringLegacyPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Graph Coloring</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Coloring vertices to avoid conflicts, from theory to practice</div>
              <p className="win95-text">
                Graph coloring is the problem of assigning labels to vertices so that adjacent vertices never share the same label.
                It is a foundational model for constraint satisfaction and scheduling. The decision version asks whether k colors are
                enough; the optimization version seeks the smallest k, the chromatic number. This page focuses on vertex coloring,
                not edge coloring.
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
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
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
            <legend>Notation and Basic Facts</legend>
            <div className="win95-grid win95-grid-2">
              {notation.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Bounds are your compass: cliques provide lower bounds, degree provides upper bounds, and bipartite checks
                can instantly certify that two colors are enough.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Bounds and Key Properties</legend>
            <div className="win95-grid win95-grid-2">
              {boundsAndFacts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Greedy Coloring (Fast Heuristic)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {greedySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Backtracking (Exact Decision for k)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {backtrackingSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>DSATUR (Saturation Heuristic)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {dsaturSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data Structures Used</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why the Algorithms Work</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Scaling</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge Cases and Conventions</legend>
            <div className="win95-grid win95-grid-2">
              {edgeCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical Heuristics</legend>
            <div className="win95-grid win95-grid-2">
              {practicalHeuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Heuristics do not change worst-case complexity, but they reduce the branching factor and
                often make real instances easy.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and Extensions</legend>
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
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {compareContrast.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-World Connections</legend>
            <div className="win95-grid win95-grid-3">
              {realWorldConnections.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate an Implementation</legend>
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
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
