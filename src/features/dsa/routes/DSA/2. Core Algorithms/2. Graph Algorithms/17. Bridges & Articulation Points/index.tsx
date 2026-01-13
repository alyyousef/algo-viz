import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Early DFS theory formalizes cut vertices and bridges (1970s)',
    detail:
      'Graph theory formalized articulation points (cut vertices) and bridges (cut edges), showing how removal disconnects components.',
  },
  {
    title: 'Tarjan introduces lowlink framework (1972)',
    detail:
      'The same lowlink ideas used for SCCs also identify bridges and articulation points in undirected graphs in linear time.',
  },
  {
    title: 'Network reliability and fault tolerance (1980s)',
    detail:
      'Infrastructure networks adopted bridge and cut-vertex analysis to identify single points of failure.',
  },
  {
    title: 'Modern dependency and infrastructure analysis',
    detail:
      'Today, these algorithms power resilience checks in distributed systems, code dependency graphs, and transportation networks.',
  },
]

const mentalModels = [
  {
    title: 'Single point of failure',
    detail:
      'A bridge or articulation point is the only way to keep two parts of the graph connected. Remove it and the graph splits.',
  },
  {
    title: 'Back edges as safety ropes',
    detail:
      'Back edges create alternative routes. If a subtree has no back edge to ancestors, its connecting edge is a bridge.',
  },
  {
    title: 'Discovery time stamps',
    detail:
      'DFS timestamps tell you who came first. Lowlink tells you how far back a subtree can reach.',
  },
]

const coreMechanics = [
  {
    title: 'DFS traversal with parent tracking',
    detail:
      'Run DFS, track parent of each node, and assign discovery time for each visit.',
  },
  {
    title: 'Lowlink computation',
    detail:
      'Lowlink[v] is the smallest discovery time reachable from v using tree edges and at most one back edge.',
  },
  {
    title: 'Bridge test',
    detail:
      'Edge (u, v) is a bridge if lowlink[v] > disc[u]. There is no back edge from v or its subtree to u or ancestors.',
  },
]

const keyStructures = [
  {
    title: 'Discovery time array',
    detail:
      'Stores the order nodes are visited. This is the baseline for lowlink comparisons.',
  },
  {
    title: 'Lowlink array',
    detail:
      'Tracks the earliest reachable ancestor through tree and back edges.',
  },
  {
    title: 'Parent array',
    detail:
      'Distinguishes tree edges from back edges and supports articulation point tests.',
  },
  {
    title: 'Articulation flags',
    detail:
      'Mark nodes that satisfy articulation rules during DFS.',
  },
]

const terminationRules = [
  {
    title: 'Articulation root rule',
    detail:
      'A root is an articulation point if it has more than one DFS child (independent subtrees).',
  },
  {
    title: 'Articulation non-root rule',
    detail:
      'A non-root u is an articulation point if any child v has lowlink[v] >= disc[u].',
  },
  {
    title: 'Bridge rule',
    detail:
      'Edge (u, v) is a bridge if lowlink[v] > disc[u].',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V + E) because DFS visits each vertex and edge once.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for the graph plus O(V) for arrays and recursion stack.',
  },
  {
    title: 'Recursion depth',
    detail:
      'Deep graphs can overflow call stacks. Consider iterative DFS for large inputs.',
  },
  {
    title: 'Undirected requirement',
    detail:
      'Bridge and articulation definitions apply to undirected graphs. Directed graphs require different notions.',
  },
]

const realWorldUses = [
  {
    context: 'Network reliability',
    detail:
      'Identify routers or links whose failure disconnects service, guiding redundancy planning.',
  },
  {
    context: 'Power grid and transportation',
    detail:
      'Spot critical substations or roads that are single points of failure in infrastructure networks.',
  },
  {
    context: 'Software dependency graphs',
    detail:
      'Find modules or packages that, if removed, break build or runtime connectivity.',
  },
  {
    context: 'Social graph resilience',
    detail:
      'Detect influencers or bridges between communities; their removal splits the network.',
  },
]

const examples = [
  {
    title: 'Bridge and articulation DFS pseudocode',
    code: `time = 0
function dfs(u):
    disc[u] = low[u] = time++
    childCount = 0
    for v in adj[u]:
        if disc[v] == -1:
            parent[v] = u
            childCount += 1
            dfs(v)
            low[u] = min(low[u], low[v])
            if low[v] > disc[u]: mark edge (u,v) as bridge
            if parent[u] != -1 and low[v] >= disc[u]: mark u as articulation
        else if v != parent[u]:
            low[u] = min(low[u], disc[v])
    if parent[u] == -1 and childCount > 1: mark u as articulation`,
    explanation:
      'The lowlink comparisons identify bridges and articulation points in one DFS pass.',
  },
  {
    title: 'Bridge detection intuition',
    code: `// If subtree cannot reach ancestor, edge is critical
if low[child] > disc[parent]:
    edge (parent, child) is a bridge`,
    explanation:
      'No back edge from the child subtree to the parent or above means the edge is the only connection.',
  },
  {
    title: 'Articulation point intuition',
    code: `// If child subtree cannot reach above u, u is critical
if low[child] >= disc[u] and u is not root:
    u is an articulation point`,
    explanation:
      'The subtree is stuck below u, so removing u disconnects that subtree from the rest of the graph.',
  },
]

const pitfalls = [
  'Forgetting the root special case for articulation points.',
  'Treating back edges to parent as valid lowlink updates (they should be ignored).',
  'Using low[child] instead of disc[child] for back edge updates.',
  'Assuming the graph is connected and skipping DFS from unvisited nodes.',
  'Applying the algorithm to directed graphs without adapting the definition.',
]

const decisionGuidance = [
  'You need to identify single points of failure in an undirected graph.',
  'You want bridge edges and articulation vertices in linear time.',
  'The graph is large and you need a single-pass algorithm.',
  'You can manage DFS recursion or use an iterative alternative.',
  'You need connectivity resilience metrics for networks or systems.',
]

const advancedInsights = [
  {
    title: 'Blocks and block-cut tree',
    detail:
      'Articulation points split the graph into biconnected components. The block-cut tree shows how components connect.',
  },
  {
    title: 'Edge-biconnected components',
    detail:
      'Removing all bridges partitions the graph into components with no bridges; these are edge-biconnected components.',
  },
  {
    title: 'Multi-edge handling',
    detail:
      'Parallel edges can prevent a bridge because a second edge provides an alternate route. Track edges, not just vertices.',
  },
  {
    title: 'Iterative DFS option',
    detail:
      'To avoid recursion limits, simulate DFS with an explicit stack while preserving lowlink updates.',
  },
]

const takeaways = [
  'Bridges and articulation points reveal critical connectivity structure.',
  'One DFS with lowlink values finds both in linear time.',
  'Root and non-root articulation rules differ and must be handled carefully.',
  'The algorithm assumes undirected graphs and correct back edge handling.',
  'The results power resilience analysis across networks and systems.',
]

const variantTable = [
  {
    variant: 'Tarjan bridge/articulation',
    graphType: 'Undirected',
    guarantee: 'All bridges and cut vertices in O(V + E)',
    useCase: 'Single-pass DFS with lowlink',
  },
  {
    variant: 'Biconnected components',
    graphType: 'Undirected',
    guarantee: 'Blocks and articulation points',
    useCase: 'Block-cut tree construction',
  },
  {
    variant: 'Naive removal test',
    graphType: 'Undirected',
    guarantee: 'Correct but slow',
    useCase: 'Small graphs or teaching',
  },
]

export default function BridgesArticulationPointsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bridges & Articulation Points</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Find the single points of failure in undirected graphs</div>
              <p className="win95-text">
                Bridges and articulation points expose where an undirected graph will break if a link or vertex is removed.
                The classic DFS lowlink technique finds both in linear time. This page covers the intuition, the rules, and how
                to implement them reliably.
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
                A bridge is an edge whose removal increases the number of connected components. An articulation point is a
                vertex whose removal does the same. These concepts reveal the fragility of a network: bridges are critical
                links, articulation points are critical junctions. DFS lowlink values detect whether a subtree has an alternate
                path back to earlier nodes, which is the key to both tests.
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
            <legend>How it works: core mechanics</legend>
            <div className="win95-grid win95-grid-3">
              {coreMechanics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: step-by-step flow</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                <li>Initialize discovery and lowlink arrays to -1.</li>
                <li>Run DFS from each unvisited node to cover all components.</li>
                <li>Assign discovery time and push recursion into neighbors.</li>
                <li>Update lowlink using child lowlink and back edges.</li>
                <li>Mark bridges when lowlink[child] &gt; disc[parent].</li>
                <li>Mark articulation points using root and non-root rules.</li>
                <li>Collect bridges and cut vertices as results.</li>
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures and invariants</legend>
            <div className="win95-grid win95-grid-2">
              {keyStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Termination rules and correctness</legend>
            <div className="win95-grid win95-grid-2">
              {terminationRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Lowlink measures the earliest reachable ancestor. When a subtree cannot reach above its parent, the connecting
                edge is a bridge. When a subtree cannot reach above a node, that node becomes an articulation point.
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
                The algorithm is optimal in time complexity, but requires careful handling of back edges and root cases to
                avoid false positives.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and guarantees</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Graph type</th>
                    <th>Guarantee</th>
                    <th>Typical use case</th>
                  </tr>
                </thead>
                <tbody>
                  {variantTable.map((row) => (
                    <tr key={row.variant}>
                      <td>{row.variant}</td>
                      <td>{row.graphType}</td>
                      <td>{row.guarantee}</td>
                      <td>{row.useCase}</td>
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

