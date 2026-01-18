import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'All-pairs shortest paths',
    detail:
      'Floyd-Warshall computes the shortest distance between every pair of vertices in one unified dynamic program.',
  },
  {
    title: 'Dense graph friendly',
    detail:
      'Runs in O(V^3), making it practical when E is close to V^2 or when V is small to medium.',
  },
  {
    title: 'Negative edges allowed',
    detail:
      'Works with negative weights, but fails if any negative cycle exists. It can detect those cycles.',
  },
]

const historicalMilestones = [
  {
    title: '1956: Roy defines transitive closure',
    detail:
      'Bernard Roy described a dynamic programming approach for reachability that foreshadowed Floyd-Warshall.',
  },
  {
    title: '1959: Warshall formalizes the DP',
    detail:
      'Stephen Warshall presented a clean recursion for path closure, setting the stage for shortest paths.',
  },
  {
    title: '1962: Floyd adds weights',
    detail:
      'Robert Floyd extended the method to weighted shortest paths, yielding the algorithm used today.',
  },
  {
    title: 'Modern era: matrix-friendly APSP',
    detail:
      'Floyd-Warshall remains a go-to for dense graphs and for GPU or SIMD-accelerated variants.',
  },
]

const prerequisites = [
  {
    title: 'Weighted directed graph',
    detail:
      'Floyd-Warshall works on directed graphs and supports negative edges.',
  },
  {
    title: 'All-pairs objective',
    detail:
      'You want shortest paths between every pair of nodes, not a single source.',
  },
  {
    title: 'No negative cycles',
    detail:
      'If a negative cycle exists, shortest paths are undefined (but detectable).',
  },
  {
    title: 'Matrix representation',
    detail:
      'The algorithm is matrix-based; O(V^2) memory is required.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights, or a prebuilt adjacency matrix.',
  },
  {
    title: 'Output',
    detail:
      'Distance matrix for all pairs, plus optional next-hop for path reconstruction.',
  },
  {
    title: 'Optional',
    detail:
      'Negative cycle indicator and reachability (via Warshall variant).',
  },
]

const formalDefinitions = [
  {
    title: 'DP state',
    detail:
      'dist[k][i][j] is the shortest path from i to j using intermediates 1..k.',
  },
  {
    title: 'Recurrence',
    detail:
      'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for each k.',
  },
  {
    title: 'Initialization',
    detail:
      'dist[i][i] = 0, dist[i][j] = w(i, j) if edge exists, else Infinity.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If dist[v][v] < 0 after completion, a negative cycle is present.',
  },
]

const coreConcepts = [
  {
    title: 'Intermediate set DP',
    detail:
      'Define dist[k][i][j] as the shortest path from i to j using only intermediate vertices 1..k.',
  },
  {
    title: 'Relaxation via a middle vertex',
    detail:
      'At step k, decide whether going through k improves the path: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
  },
  {
    title: 'Matrix viewpoint',
    detail:
      'The algorithm is a triple nested loop over k, i, j; it is essentially min-plus matrix closure.',
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If any dist[v][v] becomes negative after processing, a negative cycle is present.',
  },
]

const mentalModels = [
  {
    title: 'Checkpoint routing',
    detail:
      'Each iteration adds one more allowed checkpoint. Paths can only use checkpoints up to k.',
  },
  {
    title: 'Spreadsheet minimizer',
    detail:
      'You repeatedly update a distance table by checking whether a new column-and-row pair improves any cell.',
  },
]

const howItWorks = [
  {
    step: '1. Initialize distance matrix',
    detail:
      'Set dist[i][j] to edge weight, 0 on diagonal, and Infinity if no edge exists.',
  },
  {
    step: '2. Iterate over intermediates',
    detail:
      'For each k, allow k as an intermediate and update all i, j pairs.',
  },
  {
    step: '3. Relax all pairs',
    detail:
      'If dist[i][k] + dist[k][j] beats dist[i][j], replace it.',
  },
  {
    step: '4. Detect negative cycles',
    detail:
      'After the loop, if any dist[v][v] < 0, shortest paths are undefined.',
  },
  {
    step: '5. Optional path reconstruction',
    detail:
      'Maintain a next matrix to rebuild actual paths, not just distances.',
  },
]

const stepByStepFlow = [
  'Initialize dist matrix with edge weights and 0 on the diagonal.',
  'Optionally initialize next[i][j] to j when an edge i->j exists.',
  'For k from 1..V, allow k as an intermediate vertex.',
  'For each i, j pair, attempt relaxation through k.',
  'Update dist (and next) if a shorter path is found.',
  'After all k, inspect dist[v][v] to detect negative cycles.',
]

const dataStructures = [
  {
    title: 'Distance matrix',
    detail:
      'Stores shortest distances between all pairs, updated in place.',
  },
  {
    title: 'Next matrix',
    detail:
      'Stores the next hop to reconstruct a path between any i, j pair.',
  },
  {
    title: 'Infinity sentinel',
    detail:
      'A large value marking missing edges; must guard against overflow on add.',
  },
  {
    title: 'Vertex ordering',
    detail:
      'The k outer loop defines which intermediates are allowed at each stage.',
  },
]

const correctnessNotes = [
  {
    title: 'Inductive DP proof',
    detail:
      'After processing k, dist[i][j] is optimal using intermediates only from 1..k.',
  },
  {
    title: 'In-place safety',
    detail:
      'Updates are safe because the recurrence only depends on k and prior values.',
  },
  {
    title: 'Negative cycle exposure',
    detail:
      'Any cycle with negative total weight will make dist[v][v] negative.',
  },
]

const matrixInsights = [
  {
    title: 'Infinity handling',
    detail:
      'Represent missing edges with a large sentinel and guard against overflow when adding dist[i][k] + dist[k][j].',
  },
  {
    title: 'Path reconstruction',
    detail:
      'Use next[i][j] to store the first hop from i to j. Update it when a shorter path is found.',
  },
  {
    title: 'Boolean variant',
    detail:
      'Replacing min-plus with logical OR/AND gives Warshall transitive closure for reachability.',
  },
  {
    title: 'In-place safety',
    detail:
      'You can update dist in place because the recurrence for k only depends on previous k values.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V^3) operations. Performance depends on cache locality and tight loops.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V^2) memory for the distance matrix, plus optional O(V^2) for next matrix.',
  },
  {
    title: 'When it wins',
    detail:
      'Small-to-medium dense graphs or when you need a complete distance matrix quickly.',
  },
  {
    title: 'When it loses',
    detail:
      'Large sparse graphs. Johnson or repeated Dijkstra usually wins for E near V.',
  },
]

const complexityTable = [
  {
    approach: 'Floyd-Warshall',
    time: 'O(V^3)',
    space: 'O(V^2)',
    note: 'Simple APSP with negative edges, great for dense graphs.',
  },
  {
    approach: 'Johnson',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Best for sparse graphs with negative edges.',
  },
  {
    approach: 'Repeated Dijkstra',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Only works with nonnegative weights.',
  },
]

const realWorldUses = [
  {
    context: 'Routing tables',
    detail:
      'Precompute shortest distances between every pair of routers in dense network cores.',
  },
  {
    context: 'Urban transit grids',
    detail:
      'Small city networks with many transfers benefit from all-pairs distance matrices.',
  },
  {
    context: 'Compiler optimization',
    detail:
      'Data-flow analysis uses transitive closure variants to compute reachability and dominance.',
  },
  {
    context: 'Game AI navigation',
    detail:
      'Static maps with small node counts can precompute all-pairs paths for instant lookup.',
  },
]

const examples = [
  {
    title: 'Floyd-Warshall core loop',
    code: `function floydWarshall(dist):
    n = number of vertices
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    explanation:
      'The triple loop is the entire algorithm. Start with direct edges; each k adds a new allowed waypoint.',
  },
  {
    title: 'Initialization with Infinity',
    code: `function initMatrix(graph):
    n = number of vertices
    dist = matrix(n, n, +infinity)
    for v in 0..n-1:
        dist[v][v] = 0
    for each edge (u, v, w):
        dist[u][v] = min(dist[u][v], w)
    return dist`,
    explanation:
      'Use Infinity for missing edges. Multiple edges keep the minimum weight.',
  },
  {
    title: 'Path reconstruction',
    code: `function buildNext(dist, graph):
    next = matrix(n, n, null)
    for each edge (u, v, w):
        if w < dist[u][v]:
            dist[u][v] = w
            next[u][v] = v
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    return next`,
    explanation:
      'The next matrix stores the first hop. If next[i][j] is null, no path exists.',
  },
  {
    title: 'Worked mini-example',
    code: `Graph:
1->2 (3), 2->3 (4), 1->3 (10), 3->1 (-8)

Initial dist[1][3] = 10
When k=2: dist[1][3] becomes 3+4 = 7
When k=3: dist[1][1] becomes -1 (negative cycle detected)

Result: shortest paths undefined due to negative cycle.`,
    explanation:
      'Floyd-Warshall not only finds shorter paths but also exposes negative cycles via diagonal entries.',
  },
]

const edgeCases = [
  'Disconnected nodes: dist remains Infinity and next is null.',
  'Multiple edges between nodes: keep the minimum weight at initialization.',
  'Self-loops: use min(0, w) on the diagonal.',
  'Negative cycle in a disconnected component still appears on its diagonal.',
]

const pitfalls = [
  'Forgetting to guard Infinity + Infinity, which can overflow and corrupt updates.',
  'Not checking dist[v][v] after the loop, missing negative cycles.',
  'Assuming the graph is sparse; O(V^3) becomes expensive quickly.',
  'Failing to initialize dist[i][i] = 0 causes incorrect paths.',
  'Storing large weights in 32-bit integers when sums may exceed the range.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on a dense graph: use Floyd-Warshall.',
  'Need all-pairs on a sparse graph: prefer Johnson or repeated Dijkstra.',
  'Need only reachability (not distances): use Warshall transitive closure.',
  'Need to detect negative cycles: Floyd-Warshall exposes them via dist[v][v] < 0.',
  'Need fast online queries on a fixed small graph: precompute once with Floyd-Warshall.',
]

const implementationNotes = [
  {
    title: 'Overflow guards',
    detail:
      'Skip relaxation when dist[i][k] or dist[k][j] is Infinity.',
  },
  {
    title: 'Path reconstruction',
    detail:
      'If next[i][j] is null, no path exists; otherwise iterate next hops to build the path.',
  },
  {
    title: 'Memory planning',
    detail:
      'V^2 space grows fast; consider Johnson for larger sparse graphs.',
  },
  {
    title: 'Loop order',
    detail:
      'Use k outermost to maintain correctness; i,j inner loops aid cache locality.',
  },
]

const variantTable = [
  {
    variant: 'Floyd-Warshall',
    guarantee: 'All-pairs shortest paths',
    tradeoff: 'O(V^3) time, O(V^2) memory',
  },
  {
    variant: 'Warshall (boolean)',
    guarantee: 'Transitive closure',
    tradeoff: 'Reachability only, no weights',
  },
  {
    variant: 'Johnson',
    guarantee: 'APSP with negative edges',
    tradeoff: 'Better for sparse graphs',
  },
]

const advancedInsights = [
  {
    title: 'Min-plus matrix multiplication',
    detail:
      'Floyd-Warshall is a closure under min-plus algebra, connecting it to matrix methods and GPU acceleration.',
  },
  {
    title: 'Bitset optimization',
    detail:
      'For transitive closure, bitsets can speed up the boolean variant with word-level parallelism.',
  },
  {
    title: 'Path counting',
    detail:
      'You can augment the DP to count shortest paths by tracking equal-distance alternatives.',
  },
  {
    title: 'Sparse tiling',
    detail:
      'Block the matrix to improve cache locality; this can deliver large speedups on modern CPUs.',
  },
]

const takeaways = [
  'Floyd-Warshall is the simplest APSP algorithm: a clean DP over intermediate vertices.',
  'It handles negative edges but fails with negative cycles, which it can detect.',
  'Best for dense graphs or when you want a full distance matrix for repeated queries.',
  'Path reconstruction is easy with a next-hop matrix, not just distances.',
]

export default function FloydWarshallPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Floyd-Warshall</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">
                A dynamic program for all-pairs shortest paths on dense graphs
              </div>
              <p className="win95-text">
                Floyd-Warshall computes shortest paths between every pair of vertices by gradually allowing more intermediate nodes.
                It is compact, reliable, and easy to implement. With O(V^3) time and O(V^2) space, it shines on dense graphs and small
                networks where a full distance matrix unlocks instant queries.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Prerequisites and definitions</legend>
            <div className="win95-grid win95-grid-2">
              {prerequisites.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Inputs and outputs</legend>
            <div className="win95-grid win95-grid-2">
              {inputsOutputs.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal concepts</legend>
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
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Core concepts</div>
                <div className="win95-stack">
                  {coreConcepts.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: step-by-step flow</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {stepByStepFlow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matrix mechanics</legend>
            <div className="win95-grid win95-grid-2">
              {matrixInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures and invariants</legend>
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
            <legend>Correctness sketch</legend>
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
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Floyd-Warshall is the APSP workhorse when the graph is dense or the vertex count is small enough to fit a full V^2
                distance table in memory.
              </p>
            </div>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Edge cases checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {edgeCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Variants and tradeoffs</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Guarantee</th>
                    <th>Tradeoff</th>
                  </tr>
                </thead>
                <tbody>
                  {variantTable.map((row) => (
                    <tr key={row.variant}>
                      <td>{row.variant}</td>
                      <td>{row.guarantee}</td>
                      <td>{row.tradeoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

