import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Shortest path problems ask for minimum-cost paths in weighted graphs, typically from a single source to all nodes.',
    notes:
      'Dijkstra handles non-negative weights; Bellman-Ford handles negative weights and detects negative cycles.',
  },
  {
    title: 'Why it matters',
    details:
      'Routing, navigation, scheduling, and optimization rely on shortest paths as a core primitive.',
    notes:
      'The choice of algorithm depends on graph structure, weight constraints, and required guarantees.',
  },
  {
    title: 'What it teaches',
    details:
      'Greedy correctness conditions (Dijkstra) versus relaxation-based convergence (Bellman-Ford).',
    notes:
      'It formalizes when shortest paths are well-defined and when they are not (negative cycles).',
  },
]

const historicalContext = [
  {
    title: '1956: Dijkstra',
    details:
      'Introduced a greedy algorithm for single-source shortest paths with non-negative weights.',
    notes:
      'It is optimal due to a monotonicity property of non-negative edge weights.',
  },
  {
    title: '1958: Bellman-Ford',
    details:
      'Introduced a relaxation-based algorithm that tolerates negative edges and detects negative cycles.',
    notes:
      'It became a standard tool in network routing and theoretical proofs.',
  },
  {
    title: 'Modern era',
    details:
      'Shortest-path algorithms power web-scale routing, logistics optimization, and graph analytics.',
    notes:
      'Research focuses on heuristics, preprocessing, and specialized graph families.',
  },
]

const quickGlossary = [
  {
    term: 'Weighted graph',
    definition: 'A graph where each edge has an associated numeric cost.',
  },
  {
    term: 'Path length',
    definition: 'The sum of edge weights along a path.',
  },
  {
    term: 'Relaxation',
    definition: 'Updating a distance estimate when a shorter path is discovered.',
  },
  {
    term: 'Negative cycle',
    definition: 'A cycle whose total weight is negative; shortest paths are undefined.',
  },
  {
    term: 'Single-source shortest path',
    definition: 'Compute distances from one source to all vertices.',
  },
  {
    term: 'Shortest path tree',
    definition: 'A predecessor structure that encodes shortest paths from the source.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail: 'Graph G=(V,E), weight function w:E->R, and a source vertex s.',
  },
  {
    title: 'Task',
    detail: 'Compute dist[v] = shortest path length from s to v for all v in V.',
  },
  {
    title: 'Well-definedness',
    detail: 'If a reachable negative cycle exists, shortest path lengths are undefined.',
  },
  {
    title: 'Output',
    detail: 'Distances and (optionally) predecessors to reconstruct paths.',
  },
]

const formalDefinitions = [
  {
    title: 'Distance function',
    detail:
      'dist[v] = min over all s->v paths of sum of edge weights (or INF if unreachable).',
  },
  {
    title: 'Triangle inequality under relaxation',
    detail:
      'For any edge (u,v), a valid solution must satisfy dist[v] <= dist[u] + w(u,v).',
  },
  {
    title: 'Shortest path optimality condition',
    detail:
      'A distance labeling is correct iff all reachable nodes satisfy all relaxations and dist[s]=0.',
  },
  {
    title: 'Negative cycle criterion',
    detail:
      'If any edge can still relax after |V|-1 iterations, a negative cycle is reachable.',
  },
]

const keyClaims = [
  {
    title: 'Dijkstra is correct iff all weights are non-negative',
    detail: 'The greedy choice assumes distances only increase along unexplored edges.',
  },
  {
    title: 'Bellman-Ford is correct with negative edges',
    detail: 'Repeated relaxation converges in |V|-1 rounds if no negative cycles exist.',
  },
  {
    title: 'Negative cycles break the model',
    detail: 'You can reduce total cost without bound by looping, so no shortest path exists.',
  },
  {
    title: 'Relaxation is the shared core idea',
    detail: 'Both algorithms repeatedly enforce dist[v] <= dist[u] + w(u,v).',
  },
]

const algorithmLandscape = [
  {
    title: 'Dijkstra (greedy)',
    detail: 'Uses a priority queue to repeatedly finalize the next closest vertex.',
  },
  {
    title: 'Bellman-Ford (relaxation)',
    detail: 'Relaxes all edges for |V|-1 iterations and checks for negative cycles.',
  },
  {
    title: 'BFS (unweighted)',
    detail: 'If all edges have equal weight, BFS yields shortest paths in O(V+E).',
  },
  {
    title: 'A* (heuristic)',
    detail: 'Guided by a heuristic; optimal if the heuristic is admissible.',
  },
]

const correctnessSketches = [
  {
    title: 'Dijkstra correctness sketch',
    detail:
      'When a vertex u is extracted with minimum tentative distance, any alternative path to u must be at least as long because all edge weights are non-negative. Thus dist[u] is final.',
  },
  {
    title: 'Bellman-Ford convergence sketch',
    detail:
      'Any shortest path has at most |V|-1 edges. After k iterations, all shortest paths with at most k edges are found. Therefore after |V|-1 iterations all shortest paths are found, unless a negative cycle exists.',
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If a relaxation is still possible after |V|-1 passes, then some path can be improved indefinitely, implying a reachable negative cycle.',
  },
]

const complexityNotes = [
  {
    title: 'Dijkstra',
    detail: 'O((V+E) log V) with a binary heap; O(V^2) with arrays.',
  },
  {
    title: 'Bellman-Ford',
    detail: 'O(VE) time; O(V) space for distances and predecessors.',
  },
  {
    title: 'Dense vs sparse graphs',
    detail: 'Dijkstra with a heap is best on sparse graphs; array-based Dijkstra may be OK on dense graphs.',
  },
  {
    title: 'Practical note',
    detail: 'If negative edges are impossible by model, Dijkstra is almost always preferable.',
  },
]

const variants = [
  {
    title: 'All-pairs shortest paths',
    detail: 'Floyd-Warshall (O(V^3)) or Johnson (reweight + Dijkstra).',
  },
  {
    title: 'DAG shortest paths',
    detail: 'Topological order + relaxation solves in O(V+E), even with negative edges.',
  },
  {
    title: '0-1 BFS',
    detail: 'If edge weights are 0 or 1, a deque-based BFS runs in O(V+E).',
  },
  {
    title: 'Multi-source',
    detail: 'Add a super-source connected to all sources with zero-weight edges.',
  },
]

const workedExamples = [
  {
    title: 'Non-negative graph',
    code: `Edges: A->B(4), A->C(2), C->B(1), B->D(5)
Shortest A->D: A->C->B->D cost 8`,
    explanation:
      'Dijkstra is correct here because all weights are non-negative.',
  },
  {
    title: 'Graph with negative edge',
    code: `Edges: A->B(2), B->C(-4), A->C(5)
Shortest A->C: A->B->C cost -2`,
    explanation:
      'Bellman-Ford handles this correctly; Dijkstra may fail.',
  },
  {
    title: 'Negative cycle',
    code: `Cycle: X->Y(1), Y->Z(-3), Z->X(1)
Total cycle weight: -1`,
    explanation:
      'Shortest paths are undefined since the cycle can reduce cost indefinitely.',
  },
]

const pseudocode = [
  {
    title: 'Dijkstra (simplified)',
    code: `dist[s]=0; others=INF
repeat V times:
  pick unvisited node u with smallest dist
  mark u visited
  for each edge u->v:
    if dist[u] + w(u,v) < dist[v]:
      dist[v] = dist[u] + w(u,v)`,
    explanation:
      'The greedy choice is correct only with non-negative weights.',
  },
  {
    title: 'Bellman-Ford',
    code: `dist[s]=0; others=INF
repeat V-1 times:
  for each edge u->v:
    relax u->v
one more pass:
  if any edge relaxes -> negative cycle`,
    explanation:
      'Repeated relaxation guarantees optimal distances if no negative cycle exists.',
  },
]

const pitfalls = [
  {
    mistake: 'Using Dijkstra with negative edges',
    description: 'The greedy choice fails because shorter paths can appear later.',
  },
  {
    mistake: 'Skipping the negative cycle check',
    description: 'Bellman-Ford must perform a final pass to detect negative cycles.',
  },
  {
    mistake: 'Incorrect modeling of direction',
    description: 'Treating directed edges as undirected changes the problem.',
  },
  {
    mistake: 'Assuming connectivity',
    description: 'Unreachable nodes should remain INF; they are not errors.',
  },
]

const applications = [
  {
    title: 'Navigation and routing',
    detail: 'Road networks, logistics, and packet routing use shortest paths at scale.',
  },
  {
    title: 'Project scheduling',
    detail: 'Critical path methods are shortest/longest path problems on DAGs.',
  },
  {
    title: 'Network analysis',
    detail: 'Centrality and influence metrics rely on shortest paths.',
  },
  {
    title: 'Game development',
    detail: 'Pathfinding frequently uses Dijkstra or A* on weighted grids.',
  },
]

const keyTakeaways = [
  'Dijkstra is fast and correct for non-negative weights; Bellman-Ford is slower but more general.',
  'Relaxation is the fundamental operation shared by both algorithms.',
  'Negative cycles make shortest paths undefined and must be detected.',
  'Algorithm choice is a modeling decision based on weight constraints.',
  'Special graph families admit faster specialized solutions.',
]

export default function ShortestPathDijkstraBellmanFordPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Shortest Path (Dijkstra-Bellman-Ford)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Formal shortest path theory with Dijkstra and Bellman-Ford</div>
              <p className="win95-text">
                This page presents the shortest path problem in a more academic style: precise definitions, correctness conditions,
                proof sketches, and complexity analysis. The focus is on Dijkstra and Bellman-Ford as canonical algorithms with
                contrasting assumptions and guarantees.
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
            <legend>Formal Definitions</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinitions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
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
            <legend>Correctness Sketches</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessSketches.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity Notes</legend>
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
