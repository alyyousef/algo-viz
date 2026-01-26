import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

type Edge = {
  from: string
  to: string
  weight: number
}

type AlgorithmChoice = 'dijkstra' | 'bellman-ford'

type DistanceResult = {
  distances: Record<string, number>
  hasNegativeCycle: boolean
  isValid: boolean
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Shortest path problems ask for the minimum-cost path between nodes in a weighted graph.',
    notes:
      'Dijkstra solves graphs with non-negative weights; Bellman-Ford handles negative weights and detects negative cycles.',
  },
  {
    title: 'Why it matters',
    details:
      'Routing, navigation, scheduling, and optimization all reduce to shortest paths.',
    notes:
      'Choosing the right algorithm depends on edge weights, graph size, and whether negative cycles are possible.',
  },
  {
    title: 'What it teaches',
    details:
      'Greedy choice works when all edges are non-negative; relaxation works even with negative weights.',
    notes:
      'It highlights correctness conditions, complexity tradeoffs, and graph modeling decisions.',
  },
]

const historicalContext = [
  {
    title: '1956: Dijkstra',
    details:
      'Edsger Dijkstra introduced his algorithm for shortest paths with non-negative weights.',
    notes:
      'It is a textbook greedy algorithm with strong optimality guarantees.',
  },
  {
    title: '1958: Bellman-Ford',
    details:
      'Bellman-Ford uses repeated relaxations and can detect negative cycles.',
    notes:
      'It is slower but more general, and crucial when negative weights occur.',
  },
  {
    title: 'Modern systems',
    details:
      'Shortest paths power routing protocols, map services, and optimization toolchains.',
    notes:
      'Implementations often combine heuristics, preprocessing, and specialized data structures.',
  },
]

const quickGlossary = [
  {
    term: 'Weighted graph',
    definition: 'A graph where each edge has a numeric cost or weight.',
  },
  {
    term: 'Relaxation',
    definition: 'Updating a distance estimate when a shorter path is found.',
  },
  {
    term: 'Negative edge',
    definition: 'An edge with weight < 0, which can reduce path cost.',
  },
  {
    term: 'Negative cycle',
    definition: 'A cycle whose total weight is negative; shortest paths are undefined.',
  },
  {
    term: 'Priority queue',
    definition: 'A data structure used by Dijkstra to extract the smallest distance next.',
  },
  {
    term: 'Single-source shortest path',
    definition: 'Compute shortest distances from one source to all nodes.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail: 'A graph G = (V, E) with edge weights and a chosen source vertex s.',
  },
  {
    title: 'Question',
    detail: 'Find the minimum path cost from s to every vertex (or a specific target).',
  },
  {
    title: 'Constraints',
    detail: 'Dijkstra requires all weights >= 0; Bellman-Ford allows negative weights.',
  },
  {
    title: 'Output',
    detail: 'Distances and (optionally) predecessor pointers to reconstruct paths.',
  },
]

const keyClaims = [
  {
    title: 'Dijkstra is fast but limited',
    detail: 'It is correct only when all edge weights are non-negative.',
  },
  {
    title: 'Bellman-Ford is slower but robust',
    detail: 'It handles negative edges and detects negative cycles.',
  },
  {
    title: 'Relaxation is the core idea',
    detail: 'Both algorithms repeatedly improve distance estimates using edge relaxations.',
  },
  {
    title: 'Negative cycles break shortest paths',
    detail: 'If a reachable negative cycle exists, no shortest path is well-defined.',
  },
]

const algorithmLandscape = [
  {
    title: 'Dijkstra (greedy)',
    detail: 'Expands the closest unvisited node using a priority queue.',
  },
  {
    title: 'Bellman-Ford (relaxation)',
    detail: 'Relaxes all edges |V|-1 times and checks for negative cycles.',
  },
  {
    title: 'BFS (unweighted)',
    detail: 'If all weights are equal, BFS gives shortest paths in O(V+E).',
  },
  {
    title: 'A* (heuristic)',
    detail: 'Uses a heuristic to guide search; optimal if the heuristic is admissible.',
  },
]

const compareContrast = [
  {
    title: 'Dijkstra vs Bellman-Ford',
    detail: 'Dijkstra is faster but fails with negative weights; Bellman-Ford is slower but general.',
  },
  {
    title: 'Non-negative vs negative weights',
    detail: 'Negative weights invalidate Dijkstra because the greedy choice can be wrong.',
  },
  {
    title: 'Single-source vs all-pairs',
    detail: 'For all-pairs shortest paths, consider Floyd-Warshall or Johnson.',
  },
]

const complexityNotes = [
  {
    title: 'Dijkstra',
    detail: 'O((V+E) log V) with a binary heap; O(V^2) with arrays.',
  },
  {
    title: 'Bellman-Ford',
    detail: 'O(VE); slower but supports negative edges and cycle detection.',
  },
  {
    title: 'Space',
    detail: 'Both store distance arrays and predecessor pointers: O(V).',
  },
  {
    title: 'Practical note',
    detail: 'Dijkstra is usually preferred if you can guarantee non-negative weights.',
  },
]

const workedExamples = [
  {
    title: 'Non-negative graph',
    code: `Edges: A->B(4), A->C(2), C->B(1), B->D(5)
Shortest A->D: A->C->B->D cost 8`,
    explanation:
      'Dijkstra finds the correct path because all weights are non-negative.',
  },
  {
    title: 'Graph with negative edge',
    code: `Edges: A->B(2), B->C(-4), A->C(5)
Shortest A->C: A->B->C cost -2`,
    explanation:
      'Dijkstra can fail here; Bellman-Ford handles it correctly.',
  },
  {
    title: 'Negative cycle',
    code: `Cycle: X->Y(1), Y->Z(-3), Z->X(1)
Total cycle weight: -1`,
    explanation:
      'No shortest path exists because you can keep reducing total cost by looping.',
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
      'The greedy choice is correct only when all weights are non-negative.',
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
      'Relaxing all edges V-1 times guarantees shortest paths if no negative cycle exists.',
  },
]

const pitfalls = [
  {
    mistake: 'Running Dijkstra with negative edges',
    description: 'The greedy choice can be invalid, producing wrong distances.',
  },
  {
    mistake: 'Forgetting negative cycle checks',
    description: 'Bellman-Ford must perform a final pass to detect negative cycles.',
  },
  {
    mistake: 'Mixing directed and undirected edges',
    description: 'Direction matters; modeling errors can change the shortest path.',
  },
  {
    mistake: 'Assuming shortest path always exists',
    description: 'Disconnected nodes have distance INF; negative cycles make distances undefined.',
  },
]

const applications = [
  {
    title: 'Navigation and routing',
    detail: 'Road networks and internet routing use shortest path algorithms at scale.',
  },
  {
    title: 'Scheduling',
    detail: 'Project planning can be framed as shortest/longest path in DAGs.',
  },
  {
    title: 'Network analysis',
    detail: 'Centrality measures and influence often rely on shortest paths.',
  },
  {
    title: 'Game development',
    detail: 'Pathfinding uses shortest paths with heuristics such as A*.',
  },
]

const keyTakeaways = [
  'Dijkstra is fast and correct for non-negative edge weights.',
  'Bellman-Ford handles negative edges and detects negative cycles.',
  'Relaxation is the shared core concept for shortest path algorithms.',
  'Negative cycles mean no finite shortest path exists.',
  'Modeling choices (directed/undirected, weights) directly affect results.',
]

const nodes = ['A', 'B', 'C', 'D', 'E']

const baseEdges: Edge[] = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'C', to: 'B', weight: 1 },
  { from: 'B', to: 'D', weight: 5 },
  { from: 'C', to: 'D', weight: 8 },
  { from: 'C', to: 'E', weight: 10 },
  { from: 'D', to: 'E', weight: 2 },
]

const negativeEdge: Edge = { from: 'B', to: 'C', weight: -6 }

const computeDijkstra = (source: string, edges: Edge[], vertexList: string[]): DistanceResult => {
  if (edges.some((edge) => edge.weight < 0)) {
    return {
      distances: Object.fromEntries(vertexList.map((v) => [v, Number.POSITIVE_INFINITY])) as Record<string, number>,
      hasNegativeCycle: false,
      isValid: false,
    }
  }

  const distances: Record<string, number> = Object.fromEntries(
    vertexList.map((v) => [v, v === source ? 0 : Number.POSITIVE_INFINITY]),
  ) as Record<string, number>

  const visited = new Set<string>()

  for (let i = 0; i < vertexList.length; i += 1) {
    let candidate: string | null = null
    let bestDistance = Number.POSITIVE_INFINITY

    for (const node of vertexList) {
      if (!visited.has(node) && distances[node] < bestDistance) {
        bestDistance = distances[node]
        candidate = node
      }
    }

    if (!candidate) {
      break
    }

    visited.add(candidate)

    for (const edge of edges) {
      if (edge.from === candidate) {
        const alt = distances[candidate] + edge.weight
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt
        }
      }
    }
  }

  return {
    distances,
    hasNegativeCycle: false,
    isValid: true,
  }
}

const computeBellmanFord = (source: string, edges: Edge[], vertexList: string[]): DistanceResult => {
  const distances: Record<string, number> = Object.fromEntries(
    vertexList.map((v) => [v, v === source ? 0 : Number.POSITIVE_INFINITY]),
  ) as Record<string, number>

  for (let i = 0; i < vertexList.length - 1; i += 1) {
    let changed = false
    for (const edge of edges) {
      const current = distances[edge.from]
      if (current !== Number.POSITIVE_INFINITY && current + edge.weight < distances[edge.to]) {
        distances[edge.to] = current + edge.weight
        changed = true
      }
    }
    if (!changed) {
      break
    }
  }

  let hasNegativeCycle = false
  for (const edge of edges) {
    const current = distances[edge.from]
    if (current !== Number.POSITIVE_INFINITY && current + edge.weight < distances[edge.to]) {
      hasNegativeCycle = true
      break
    }
  }

  return {
    distances,
    hasNegativeCycle,
    isValid: true,
  }
}

export default function ShortestPathDijkstraBellmanFordPage(): JSX.Element {
  const [algorithm, setAlgorithm] = useState<AlgorithmChoice>('dijkstra')
  const [source, setSource] = useState('A')
  const [includeNegative, setIncludeNegative] = useState(false)

  const edges = includeNegative ? [...baseEdges, negativeEdge] : baseEdges

  const result = useMemo(() => {
    if (algorithm === 'dijkstra') {
      return computeDijkstra(source, edges, nodes)
    }
    return computeBellmanFord(source, edges, nodes)
  }, [algorithm, edges, source])

  const statusText = useMemo(() => {
    if (algorithm === 'dijkstra' && !result.isValid) {
      return 'Dijkstra cannot run: graph has a negative edge.'
    }
    if (result.hasNegativeCycle) {
      return 'Negative cycle detected: shortest paths are undefined.'
    }
    return 'Distances computed successfully.'
  }, [algorithm, result.hasNegativeCycle, result.isValid])

  const formattedDistance = (value: number) => (value === Number.POSITIVE_INFINITY ? 'INF' : value.toString())

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
              <div className="win95-subheading">Fast greedy shortest paths vs robust relaxation</div>
              <p className="win95-text">
                Dijkstra and Bellman-Ford solve the same problem under different constraints. Dijkstra is fast but requires non-negative
                weights. Bellman-Ford is slower but supports negative weights and detects negative cycles. This page compares their
                assumptions, complexity, and behavior.
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
            <legend>Interactive Shortest Path Explorer</legend>
            <div className="win95-stack">
              <div className="win95-panel">
                <div className="win95-heading">Graph Controls</div>
                <p className="win95-text">
                  Toggle a negative edge and pick an algorithm. Dijkstra will refuse to run when negative edges are present.
                </p>
                <div className="win95-grid win95-grid-2">
                  <button
                    type="button"
                    className="win95-button"
                    onClick={() => setAlgorithm('dijkstra')}
                  >
                    DIJKSTRA
                  </button>
                  <button
                    type="button"
                    className="win95-button"
                    onClick={() => setAlgorithm('bellman-ford')}
                  >
                    BELLMAN-FORD
                  </button>
                </div>
                <div className="win95-grid win95-grid-2">
                  {nodes.map((node) => (
                    <button
                      key={node}
                      type="button"
                      className="win95-button"
                      onClick={() => setSource(node)}
                    >
                      SOURCE: {node}
                    </button>
                  ))}
                </div>
                <div className="win95-grid win95-grid-2">
                  <button
                    type="button"
                    className="win95-button"
                    onClick={() => setIncludeNegative((prev) => !prev)}
                  >
                    {includeNegative ? 'REMOVE NEG EDGE' : 'ADD NEG EDGE'}
                  </button>
                  <div className="win95-panel win95-panel--raised">
                    <p className="win95-text"><strong>Algorithm:</strong> {algorithm === 'dijkstra' ? 'Dijkstra' : 'Bellman-Ford'}</p>
                    <p className="win95-text"><strong>Source:</strong> {source}</p>
                  </div>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Graph Summary</div>
                <p className="win95-text">Edges in the current graph:</p>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text">
                    {edges.map((edge) => `${edge.from}->${edge.to}(${edge.weight})`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Distance Table</div>
                <p className="win95-text">{statusText}</p>
                <div className="win95-grid win95-grid-2">
                  {nodes.map((node) => (
                    <div key={node} className="win95-panel win95-panel--raised">
                      <p className="win95-text"><strong>{node}:</strong> {formattedDistance(result.distances[node])}</p>
                    </div>
                  ))}
                </div>
              </div>
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
