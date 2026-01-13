import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1736: Euler and the Seven Bridges of Konigsberg',
    detail:
      'Euler showed that you cannot walk each bridge exactly once, creating the first graph theory proof and motivating Eulerian trails.',
  },
  {
    title: '1873: Hierholzer formalizes the construction',
    detail:
      'Hierholzer introduced a linear-time method to build Eulerian circuits by stitching cycles, still the standard approach today.',
  },
  {
    title: '1960s: Chinese Postman and routing research',
    detail:
      'Finding short routes that cover every edge inspired Eulerian augmentations and practical logistics algorithms.',
  },
  {
    title: '1990s: Genome assembly via de Bruijn graphs',
    detail:
      'DNA reads became edges in de Bruijn graphs, and Eulerian paths provided efficient reconstructions of long sequences.',
  },
]

const mentalModels = [
  {
    title: 'Edge coverage, not vertex coverage',
    detail:
      'Eulerian paths care about using every edge exactly once. Repeating vertices is fine as long as edges are not reused.',
  },
  {
    title: 'Odd degree means loose ends',
    detail:
      'In undirected graphs, every time you enter a vertex you must leave it. Odd-degree vertices create unmatched entrances or exits.',
  },
  {
    title: 'Balance sheets for directed graphs',
    detail:
      'In a directed graph, in-degree and out-degree must balance. A start vertex can have one extra outgoing edge, and an end vertex one extra incoming edge.',
  },
  {
    title: 'Cycle splicing',
    detail:
      'Hierholzer builds a tour by walking until stuck, then splicing smaller cycles into the main trail where they intersect.',
  },
]

const existenceConditions = [
  {
    heading: 'Undirected Eulerian cycle',
    bullets: [
      'Every vertex with non-zero degree has even degree.',
      'All vertices with non-zero degree belong to a single connected component.',
      'Isolated vertices are ignored; a graph with no edges is trivially Eulerian.',
    ],
  },
  {
    heading: 'Undirected Eulerian path',
    bullets: [
      'Exactly 0 or 2 vertices have odd degree.',
      'If 2 are odd, the path must start at one odd vertex and end at the other.',
      'All vertices with non-zero degree remain connected when ignoring isolated vertices.',
    ],
  },
  {
    heading: 'Directed Eulerian cycle',
    bullets: [
      'Every vertex with non-zero degree satisfies in-degree = out-degree.',
      'All non-zero-degree vertices are in one strongly connected component.',
      'A single directed cycle is the simplest valid example.',
    ],
  },
  {
    heading: 'Directed Eulerian path',
    bullets: [
      'Exactly one vertex has out-degree = in-degree + 1 (start).',
      'Exactly one vertex has in-degree = out-degree + 1 (end).',
      'All other non-zero-degree vertices are balanced and connected in the underlying undirected graph.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Choose a valid start',
    detail:
      'If a path (not cycle) exists, start at the odd-degree vertex (undirected) or the vertex with out = in + 1 (directed). Otherwise, start anywhere with edges.',
  },
  {
    title: 'Walk edges until you are stuck',
    detail:
      'Follow unused edges, removing them as you go. When you reach a vertex with no unused edges, you have closed a local trail.',
  },
  {
    title: 'Splice trails together',
    detail:
      'If the current tour contains a vertex with unused edges, restart a walk from that vertex and splice the new trail into the tour.',
  },
  {
    title: 'Output the reverse stack',
    detail:
      'Hierholzer uses a stack: pop vertices when stuck. The resulting list reversed is the Eulerian path or cycle.',
  },
]

const implementationNotes = [
  {
    title: 'Edge tracking',
    detail:
      'Use adjacency lists with explicit edge IDs or remove edges as you traverse to ensure each edge is consumed exactly once.',
  },
  {
    title: 'Multi-edges and self-loops',
    detail:
      'Allow duplicates in adjacency lists and track usage per edge. Self-loops count twice toward degree in undirected graphs.',
  },
  {
    title: 'Connectivity check',
    detail:
      'Run DFS or BFS on the undirected version to verify all non-zero-degree vertices are reachable before constructing the trail.',
  },
  {
    title: 'Iterative over recursive',
    detail:
      'Prefer an explicit stack to avoid recursion limits on large graphs and to match the classical Hierholzer flow.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Checking degrees is O(V). Connectivity check is O(V + E). Hierholzer constructs the tour in O(V + E).',
  },
  {
    title: 'Space cost',
    detail:
      'Adjacency lists plus an edge-used array require O(V + E). The output trail contains E + 1 vertices.',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Removing edges in-place is fast but mutates input; copying edges is safer but doubles memory. Choose based on constraints.',
  },
  {
    title: 'Edge ordering',
    detail:
      'Different adjacency ordering yields different valid tours. If you need lexicographic output, sort neighbors first.',
  },
]

const realWorldUses = [
  {
    context: 'Genome assembly (de Bruijn graphs)',
    detail:
      'Reads become edges between k-mers. An Eulerian path reconstructs a likely genome string by consuming every read once.',
  },
  {
    context: 'Street sweeping and snow plows',
    detail:
      'Municipal routing seeks to cover all streets. If a graph is not Eulerian, it can be augmented to approximate an Euler tour.',
  },
  {
    context: 'Network testing and traversal',
    detail:
      'Covering every link exactly once ensures comprehensive inspection of cables, circuits, or logical routes.',
  },
  {
    context: 'Puzzle and maze design',
    detail:
      'Designers check Eulerian properties to ensure a single-stroke puzzle is solvable without lifting a pen.',
  },
]

const examples = [
  {
    title: 'Detect Eulerian status in an undirected graph',
    code: `function eulerStatusUndirected(graph):
    if graph.edgeCount == 0:
        return "cycle" // empty graph is Eulerian

    visited = dfsIgnoringIsolated(graph)
    if visited != allNonZeroDegreeVertices:
        return "none"

    odd = countVerticesWhere(degree % 2 == 1)
    if odd == 0:
        return "cycle"
    if odd == 2:
        return "path"
    return "none"`,
    explanation:
      'The degree test determines whether a cycle or path is possible. Connectivity guarantees that a single trail can reach every edge.',
  },
  {
    title: "Hierholzer's algorithm (iterative)",
    code: `function eulerTrail(graph, start):
    stack = [start]
    path = []

    while stack not empty:
        v = stack[stack.length - 1]
        if v has unused edges:
            (v, u) = takeUnusedEdge(v)
            markUsed(v, u)
            stack.push(u)
        else:
            path.push(stack.pop())

    return reverse(path)`,
    explanation:
      'Vertices are added to the output only when you cannot go further. Reversing the pop order yields the valid Eulerian trail.',
  },
  {
    title: 'Start selection for directed graphs',
    code: `function pickStartDirected(graph):
    start = null
    for v in vertices:
        if outDegree(v) == inDegree(v) + 1:
            start = v
        else if outDegree(v) != inDegree(v):
            return null // violates Eulerian conditions
    if start == null:
        start = anyVertexWithEdges()
    return start`,
    explanation:
      'A directed Eulerian path has a unique start with one extra outgoing edge. If none exists, the graph must support a cycle.',
  },
]

const pitfalls = [
  'Ignoring isolated vertices when checking connectivity. Only vertices with non-zero degree matter.',
  'Counting self-loops wrong in undirected graphs; each loop contributes 2 to the degree.',
  'Assuming a valid Eulerian path implies unique ordering. Multiple tours can exist.',
  'Failing to handle multi-edges. Parallel edges must be tracked individually with IDs or counters.',
  'Picking the wrong start node for directed graphs, which can flip a valid trail into a dead end.',
]

const decisionGuidance = [
  'Use Eulerian checks when you must cover every edge exactly once or want to detect if such a route exists.',
  'Prefer Eulerian reasoning for traversal, routing, and reconstruction problems where edges represent tasks or observations.',
  'If you need to visit every vertex exactly once, you want Hamiltonian paths instead of Eulerian paths.',
  'When the graph is not Eulerian, consider Chinese Postman or edge duplication to make it traversable.',
  'For massive graphs, perform degree tests first; they are cheap and can skip costly traversals.',
]

const advancedInsights = [
  {
    title: 'Eulerian vs Hamiltonian contrast',
    detail:
      'Eulerian paths are easy to test and construct in linear time. Hamiltonian paths are NP-complete and far more complex.',
  },
  {
    title: 'De Bruijn graph reconstruction',
    detail:
      'A string can be reconstructed by an Eulerian path that visits every k-mer edge exactly once, which is why the algorithm scales to large genomes.',
  },
  {
    title: 'Edge augmentation strategies',
    detail:
      'To make a graph Eulerian, pair odd-degree vertices (undirected) or balance in/out degrees (directed) with minimum added cost.',
  },
  {
    title: 'Streaming-friendly construction',
    detail:
      'Hierholzer can run with adjacency iterators and edge counters, making it efficient for large sparse graphs without heavy recursion.',
  },
]

const takeaways = [
  'Eulerian paths and cycles are about edges: use every edge exactly once, revisit vertices as needed.',
  'Degree conditions plus connectivity tell you whether a trail exists, before you attempt to build it.',
  "Hierholzer's algorithm constructs the trail in linear time by splicing cycles.",
  'Directed graphs need in/out balance; undirected graphs need even degrees except possible endpoints.',
  'These ideas power routing, coverage, and reconstruction problems across science and engineering.',
]

export default function EulerianPathCyclePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Eulerian Path &amp; Cycle</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Cover every edge exactly once, with proofs, conditions, and construction</div>
              <p className="win95-text">
                Eulerian paths and cycles answer a deceptively simple question: can you traverse every edge in a graph exactly once?
                The answer depends on degrees, connectivity, and direction. This page explains the core definitions, gives precise
                existence conditions for undirected and directed graphs, and walks through the linear-time construction used in practice.
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
                An Eulerian trail is a walk that uses every edge exactly once. If it starts and ends at the same vertex, it is an
                Eulerian cycle. These structures are fast to detect and build, making them the practical sibling of Hamiltonian
                paths, which are much harder to compute.
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
            <legend>How it works: existence conditions</legend>
            <div className="win95-grid win95-grid-2">
              {existenceConditions.map((block) => (
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
            <legend>How it works: Hierholzer's algorithm</legend>
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
                Correctness idea: every time you enter a vertex via an unused edge, there must be a way to leave it, except at the
                trail endpoints. This ensures the local walk can be closed into a cycle or a path segment that can be spliced into the
                growing tour, covering all edges exactly once.
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
                Eulerian checks are cheap and deterministic. If the conditions fail, you can stop immediately; if they pass,
                Hierholzer builds the answer in one linear pass over the edges.
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

