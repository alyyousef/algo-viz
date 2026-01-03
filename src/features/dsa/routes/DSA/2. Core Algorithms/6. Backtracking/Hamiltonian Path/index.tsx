import type { JSX } from 'react'
import { Link } from 'react-router-dom'

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

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Hamilton introduces graph concepts (1857)',
    detail:
      'William Rowan Hamilton proposed the icosian game, which inspired what we now call Hamiltonian paths and cycles.',
  },
  {
    title: 'Dirac and Ore conditions (1950s)',
    detail:
      'Sufficient degree conditions for Hamiltonian cycles were discovered, giving strong structural hints but not a full solution.',
  },
  {
    title: 'NP-complete classification (1972)',
    detail:
      'The Hamiltonian path problem was among Karp’s original NP-complete problems.',
  },
  {
    title: 'Backtracking becomes standard (1970s+)',
    detail:
      'Depth-first search with pruning emerged as the go-to practical approach for exact solutions on moderate-sized graphs.',
  },
]

const mentalModels = [
  {
    title: 'Visiting every city once',
    detail:
      'Find a route that visits each city exactly one time without repeating. That is a Hamiltonian path.',
  },
  {
    title: 'Threading a needle',
    detail:
      'You are threading a single line through all nodes. Each new node must be a valid next stitch without tangling.',
  },
  {
    title: 'Lock-and-key constraints',
    detail:
      'Each node can be used once; once you pick it, it locks behind you. Backtracking is the key to reopen choices.',
  },
]

const coreConcepts = [
  {
    heading: 'Problem definition',
    bullets: [
      'Given a graph G(V, E), find a path that visits every vertex exactly once.',
      'In directed graphs, edges must respect direction.',
      'Hamiltonian cycle returns to the starting vertex; path does not.',
    ],
  },
  {
    heading: 'Backtracking idea',
    bullets: [
      'Grow a path one vertex at a time using depth-first search.',
      'Reject choices that revisit a vertex or break adjacency.',
      'If a path gets stuck, backtrack and try another branch.',
    ],
  },
  {
    heading: 'Why it is hard',
    bullets: [
      'The search space is factorial: up to n! permutations of vertices.',
      'Local choices can look valid but lead to dead ends later.',
      'No polynomial-time algorithm is known for arbitrary graphs.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Choose a start vertex',
    detail:
      'Pick any vertex to start (or loop over all start vertices if you need to detect existence without a fixed start).',
  },
  {
    title: 'Extend the path',
    detail:
      'Try adding a neighbor that has not been visited yet. Mark it visited and recurse.',
  },
  {
    title: 'Check completion',
    detail:
      'If the path length equals |V|, you found a Hamiltonian path. Return success.',
  },
  {
    title: 'Backtrack',
    detail:
      'If no neighbor works, unmark the last vertex and try the next option.',
  },
]

const pruningHeuristics = [
  {
    title: 'Degree pruning',
    detail:
      'Vertices with degree 0 or 1 in an undirected graph impose strong constraints. Early checks can rule out impossibility.',
  },
  {
    title: 'Connectivity checks',
    detail:
      'If the remaining unvisited vertices are disconnected, no completion is possible from the current partial path.',
  },
  {
    title: 'Ordering heuristics',
    detail:
      'Try neighbors with fewer unvisited connections first (fail-fast). This often prunes large parts of the tree.',
  },
  {
    title: 'Bitmask memoization',
    detail:
      'For n <= 20, memoize (vertex, visitedMask) to avoid repeated work. This is exponential but can be practical.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Worst case O(n!) for naive backtracking. Pruning can reduce practical runtime but not the worst-case bound.',
  },
  {
    title: 'Space cost',
    detail:
      'O(n) for recursion stack and visited tracking. Memoization raises space to O(n * 2^n).',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Exact solutions scale poorly. For large graphs, use heuristics or relaxations instead of exhaustive search.',
  },
]

const realWorldUses = [
  {
    context: 'Puzzle design and validation',
    detail:
      'Many puzzles require visiting each node or tile once. Hamiltonian paths help verify solvability.',
  },
  {
    context: 'Routing constraints',
    detail:
      'Certain routing problems constrain revisits or require unique visitation, making Hamiltonian paths a direct model.',
  },
  {
    context: 'DNA sequencing',
    detail:
      'Some formulations relate to ordering fragments with no repeats, though modern sequencing typically uses Eulerian paths.',
  },
  {
    context: 'Circuit testing',
    detail:
      'Visiting each component exactly once can model certain test traversal constraints.',
  },
]

const examples = [
  {
    title: 'Small graph example',
    code: `Graph (undirected):
  1: 2, 3
  2: 1, 3, 4
  3: 1, 2, 4
  4: 2, 3

One Hamiltonian path:
  1 -> 2 -> 4 -> 3`,
    explanation:
      'The path visits every vertex exactly once and follows existing edges.',
  },
  {
    title: 'Backtracking pseudocode',
    code: `function hamiltonianPath(graph, start):
    path = [start]
    visited = set(start)

    function dfs(v):
        if path.length == |V|: return true
        for u in neighbors(v):
            if u not in visited:
                visited.add(u)
                path.push(u)
                if dfs(u): return true
                path.pop()
                visited.remove(u)
        return false

    if dfs(start): return path
    return null`,
    explanation:
      'Depth-first search explores possibilities, undoing choices when a branch fails.',
  },
  {
    title: 'Directed graph note',
    code: `In a directed graph, only follow outgoing edges:
  neighbors(v) = outgoingNeighbors(v)
The path must respect edge directions at every step.`,
    explanation:
      'Hamiltonian paths in directed graphs are often harder; direction removes many possible moves.',
  },
]

const pitfalls = [
  'Forgetting to mark vertices as visited, leading to repeated nodes.',
  'Assuming a Hamiltonian cycle implies a path from a fixed start. The start might need to vary.',
  'Skipping early impossibility checks; this can waste massive time on doomed searches.',
  'Mixing up Hamiltonian path with Eulerian path (edge-based) concepts.',
  'Failing to handle directed graphs correctly (using undirected adjacency).',
]

const decisionGuidance = [
  'Use exact backtracking for small graphs or when correctness is mandatory.',
  'Add pruning heuristics if n is moderate and you need practical runtimes.',
  'Use memoized DP (bitmask) for n <= 20 when you need guaranteed optimality.',
  'For large graphs, switch to heuristics or approximation approaches.',
  'If you only need to know existence, stop at first found path.',
]

const advancedInsights = [
  {
    title: 'Sufficient conditions',
    detail:
      'Dirac and Ore conditions provide quick checks for Hamiltonian cycles in dense graphs.',
  },
  {
    title: 'Ordering by degree',
    detail:
      'Ordering neighbors by smallest degree first can reduce backtracking depth by failing fast.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'For some graphs, splitting vertices into two halves and combining partial paths can speed up search.',
  },
  {
    title: 'Conversion to SAT',
    detail:
      'Hamiltonian path can be encoded as a SAT problem, letting modern SAT solvers handle larger instances.',
  },
]

const takeaways = [
  'Hamiltonian Path is NP-complete, so exact solutions scale poorly.',
  'Backtracking is the canonical exact approach, with pruning to make it practical.',
  'Directed graphs and fixed start constraints make the search stricter.',
  'Confuse neither with Eulerian paths, which are edge-based and easier.',
]

export default function HamiltonianPathPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Hamiltonian Path</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking through graphs to visit each vertex exactly once</div>
              <p className="win95-text">
                Hamiltonian Path is a classic graph problem: find a route that visits every vertex exactly once. It is NP-complete,
                which makes backtracking the practical default for exact solutions. This page explains the intuition, algorithm,
                pruning strategies, and tradeoffs you need to implement it well.
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
                Hamiltonian paths model scenarios where each location must be visited exactly once. The difficulty comes from
                the global constraint: a choice that looks good locally might block completion later, which is why backtracking
                and pruning are essential.
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
            <legend>How it works: the backtracking approach</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
            <legend>Algorithm steps</legend>
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
                The invariant: every vertex appears at most once in the path. Backtracking enforces this by undoing a choice
                whenever no valid extension exists.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pruning and heuristics</legend>
            <div className="win95-grid win95-grid-2">
              {pruningHeuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel">
              <p className="win95-text">
                Even basic heuristics can shrink the search tree dramatically. Start with degree ordering and add memoization
                for smaller graphs when exactness matters.
              </p>
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
                Because the worst case is factorial, problem size is the main constraint. Pruning shifts the practical limit,
                but does not change the theoretical complexity.
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
            <legend>Hamiltonian vs Eulerian (quick intuition)</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>Hamiltonian path</th>
                    <th>Eulerian path</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Focus</td>
                    <td>Visits every vertex once</td>
                    <td>Traverses every edge once</td>
                  </tr>
                  <tr>
                    <td>Difficulty</td>
                    <td>NP-complete</td>
                    <td>Polynomial-time checks</td>
                  </tr>
                  <tr>
                    <td>Typical method</td>
                    <td>Backtracking / search</td>
                    <td>Degree rules + DFS</td>
                  </tr>
                </tbody>
              </table>
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
