import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Bellman formalizes shortest paths as dynamic programming (1958)',
    detail:
      'Richard Bellman framed shortest paths as repeated relaxation of edges, showing that the best path with k edges can be built from best paths with k-1 edges.',
  },
  {
    title: 'Ford adapts the method for networks (1956 to 1959)',
    detail:
      'Lester Ford applied relaxation to transportation networks, leading to the algorithm now known as Bellman-Ford.',
  },
  {
    title: 'Negative weights and cycle detection become core strengths',
    detail:
      'Unlike Dijkstra, Bellman-Ford handles negative edges and can detect negative cycles, which makes it critical for constraint systems.',
  },
  {
    title: 'Routing protocols adopt distance-vector style (1980s)',
    detail:
      'Protocols like RIP used Bellman-Ford style updates, exchanging distance vectors between routers to converge on shortest paths.',
  },
]

const prerequisites = [
  {
    title: 'Directed weighted graph',
    detail:
      'Bellman-Ford works on directed graphs with positive, zero, or negative weights.',
  },
  {
    title: 'Single-source objective',
    detail:
      'Computes shortest paths from one source to all reachable nodes.',
  },
  {
    title: 'No negative cycles on shortest paths',
    detail:
      'If a reachable negative cycle exists, shortest paths are undefined.',
  },
  {
    title: 'Edge list access',
    detail:
      'The algorithm scans all edges repeatedly, so an explicit edge list is ideal.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights, source s, and optionally a target t.',
  },
  {
    title: 'Output',
    detail:
      'Shortest distances to all nodes and parent pointers for paths, or a negative cycle report.',
  },
  {
    title: 'Optional',
    detail:
      'A list of nodes affected by negative cycles for diagnostics.',
  },
]

const formalDefinitions = [
  {
    title: 'Relaxation',
    detail:
      'If dist[u] + w < dist[v], update dist[v] and parent[v] = u.',
  },
  {
    title: 'Path length bound',
    detail:
      'Any simple path has at most V-1 edges, so V-1 rounds suffice for shortest paths.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If any edge relaxes on round V, a reachable negative cycle exists.',
  },
  {
    title: 'Infinity guard',
    detail:
      'Never relax from dist[u] = Infinity to avoid overflow and false updates.',
  },
]

const mentalModels = [
  {
    title: 'Relaxation as tightening a belt',
    detail:
      'Each pass tightens distance estimates. If an edge offers a shorter path, the estimate shrinks until no edge can improve it.',
  },
  {
    title: 'Layered paths',
    detail:
      'After the i-th pass, all shortest paths that use at most i edges are correct. After V-1 passes, all simple paths are covered.',
  },
  {
    title: 'Negative cycles as endless discounts',
    detail:
      'A negative cycle is a loop that keeps reducing cost. If you can still improve after V-1 passes, there is no well-defined shortest path.',
  },
]

const coreMechanics = [
  {
    title: 'Initialize distances',
    detail:
      'Set the start distance to 0 and all others to infinity. Store parents for reconstruction.',
  },
  {
    title: 'Relax every edge V-1 times',
    detail:
      'For each edge (u, v, w), if dist[u] + w < dist[v], update dist[v] and parent[v].',
  },
  {
    title: 'Detect negative cycles',
    detail:
      'Run one more pass. If any distance can still be improved, a negative cycle is reachable from the source.',
  },
]

const keyStructures = [
  {
    title: 'Edge list',
    detail:
      'Bellman-Ford iterates over all edges each pass, so an explicit list of (u, v, w) is the simplest representation.',
  },
  {
    title: 'Distance array',
    detail:
      'Holds the best-known distance from the source to every node. Infinity marks unreachable nodes.',
  },
  {
    title: 'Parent array',
    detail:
      'Tracks the predecessor used to reach each node. This is required to reconstruct paths after relaxation completes.',
  },
  {
    title: 'Updated flag',
    detail:
      'If no distances change in a full pass, you can stop early because all shortest paths are already settled.',
  },
]

const stepByStepFlow = [
  'Initialize dist[source] = 0 and all other distances to Infinity.',
  'Repeat V-1 times: scan all edges and relax whenever possible.',
  'Track parents for nodes that improve to enable path reconstruction.',
  'If a full pass makes no updates, stop early.',
  'Run one extra pass to check if any edge can still relax.',
  'If a relax is possible, report a reachable negative cycle.',
  'Otherwise, return distances and paths.',
]

const dataStructures = [
  {
    title: 'Edge list',
    detail:
      'List of (u, v, w) edges for fast iteration each round.',
  },
  {
    title: 'Distance array',
    detail:
      'Best-known distances from the source; Infinity marks unreachable nodes.',
  },
  {
    title: 'Parent array',
    detail:
      'Tracks last predecessor for path reconstruction.',
  },
  {
    title: 'Updated flag',
    detail:
      'Enables early termination when no edges relax in a round.',
  },
]

const correctnessNotes = [
  {
    title: 'Inductive path guarantee',
    detail:
      'After i rounds, all shortest paths using at most i edges are correct.',
  },
  {
    title: 'Cycle-free bound',
    detail:
      'Shortest paths without negative cycles use at most V-1 edges.',
  },
  {
    title: 'Negative cycle witness',
    detail:
      'Any relax on the V-th round implies a reachable negative cycle.',
  },
]

const terminationRules = [
  {
    title: 'Early stop',
    detail:
      'If a full pass yields no updates, the algorithm can terminate early because all distances are optimal.',
  },
  {
    title: 'Negative cycle check',
    detail:
      'If any edge can still be relaxed after V-1 passes, the graph has a reachable negative cycle.',
  },
  {
    title: 'Disconnected nodes',
    detail:
      'Unreachable nodes remain at infinity and are not affected by negative cycles in other components.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(VE) in the worst case, since each of V-1 passes scans all E edges. This is slower than Dijkstra on large sparse graphs.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for storing edges and distance metadata. Distances themselves are O(V).',
  },
  {
    title: 'Early termination gain',
    detail:
      'If the graph has small diameter or few negative edges, early stop often reduces runtime significantly in practice.',
  },
  {
    title: 'Robustness tradeoff',
    detail:
      'Bellman-Ford trades speed for reliability under negative weights and for cycle detection, which many algorithms cannot provide.',
  },
]

const realWorldUses = [
  {
    context: 'Routing protocols',
    detail:
      'Distance-vector routing like RIP uses Bellman-Ford style updates to converge on shortest paths between routers.',
  },
  {
    context: 'Arbitrage detection',
    detail:
      'Currency exchange graphs can contain negative cycles after log-transforming rates, indicating risk-free profit loops.',
  },
  {
    context: 'Difference constraints',
    detail:
      'Scheduling problems can be expressed as inequalities. Bellman-Ford checks feasibility and derives minimal times.',
  },
  {
    context: 'Graph analytics with penalties',
    detail:
      'When edges represent costs with discounts or penalties, negative weights arise and Bellman-Ford remains valid.',
  },
]

const examples = [
  {
    title: 'Classic Bellman-Ford pseudocode',
    code: `function bellmanFord(vertices, edges, source):
    dist = array(|V|, Infinity)
    parent = array(|V|, null)
    dist[source] = 0

    for i in 1..|V|-1:
        updated = false
        for (u, v, w) in edges:
            if dist[u] != Infinity and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                updated = true
        if not updated: break

    for (u, v, w) in edges:
        if dist[u] != Infinity and dist[u] + w < dist[v]:
            return "negative cycle reachable"

    return dist, parent`,
    explanation:
      'The loop guarantees correct shortest paths for all nodes reachable by at most V-1 edges. A final pass tests for negative cycles.',
  },
  {
    title: 'Recovering a shortest path',
    code: `function buildPath(parent, target):
    path = []
    node = target
    while node != null:
        path.push(node)
        node = parent[node]
    return reverse(path)`,
    explanation:
      'Parents record the edge that last improved each node. Walking parents backward and reversing builds the path.',
  },
  {
    title: 'Difference constraints as a graph',
    code: `// Constraint: x_v - x_u <= w  => edge u -> v with weight w
edges = [
    (u, v, w1),
    (v, t, w2),
    (u, t, w3)
]
run bellmanFord to find shortest distances`,
    explanation:
      'If a negative cycle exists, the system is infeasible. Otherwise, distances give a valid assignment that satisfies all constraints.',
  },
]

const edgeCases = [
  'Unreachable nodes remain at Infinity.',
  'Negative cycle not reachable from the source does not affect results.',
  'Multiple edges between the same nodes should be treated separately.',
  'Undirected edges must be split into two directed edges.',
]

const pitfalls = [
  'Skipping the negative cycle check. Without it, you may report incorrect shortest paths.',
  'Using V passes instead of V-1 and then relying on the V-th pass for detection incorrectly.',
  'Overflowing when using large sentinel values for infinity. Guard against dist[u] + w when dist[u] is Infinity.',
  'Assuming parents always form a path. If a node is unreachable, its parent remains null.',
  'Mixing undirected edges without adding both directions. Bellman-Ford expects directed edges explicitly.',
]

const decisionGuidance = [
  'You need shortest paths with negative edge weights.',
  'You must detect negative cycles or infeasible constraints.',
  'The graph is small to medium, or you can tolerate O(VE) runtime.',
  "You want a reliable baseline or a subroutine for Johnson's algorithm.",
  'You can benefit from early termination in practice.',
]

const implementationNotes = [
  {
    title: 'Early stop is safe',
    detail:
      'If no updates occur in a full pass, all shortest paths are final.',
  },
  {
    title: 'Cycle extraction',
    detail:
      'To extract a negative cycle, follow parent pointers V times to enter the cycle.',
  },
  {
    title: 'Overflow protection',
    detail:
      'Use large sentinels and check dist[u] before adding weights.',
  },
  {
    title: 'Sparse optimization',
    detail:
      'SPFA can be faster on average but still has worst-case O(VE).',
  },
]

const advancedInsights = [
  {
    title: "Johnson's algorithm uses Bellman-Ford",
    detail:
      'Bellman-Ford computes a potential function to reweight edges and remove negative weights, enabling fast Dijkstra runs from every node.',
  },
  {
    title: 'Negative cycle localization',
    detail:
      'If a node relaxes on the V-th pass, it is part of or reachable from a negative cycle. Backtracking parents can help extract the cycle.',
  },
  {
    title: 'SPFA tradeoffs',
    detail:
      'The queue-based SPFA often runs faster on sparse graphs but still has worst-case O(VE) time and can degrade on adversarial inputs.',
  },
  {
    title: 'Edge ordering effects',
    detail:
      'Relaxing edges in topological-like order can reduce iterations. In practice, grouping edges by source improves cache locality.',
  },
]

const takeaways = [
  'Bellman-Ford is the go-to shortest path algorithm when negative edges are present.',
  'Relaxation over V-1 passes guarantees correct shortest paths on graphs without negative cycles.',
  'The algorithm detects negative cycles, enabling feasibility checks for constraint systems.',
  'Early termination and careful edge handling can improve runtime in real workloads.',
  'It trades speed for robustness and correctness in tricky graphs.',
]

const variantTable = [
  {
    variant: 'Bellman-Ford',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Shortest paths or negative cycle detection',
    useCase: 'General shortest paths with negative weights',
  },
  {
    variant: 'Bellman-Ford + early stop',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Same as Bellman-Ford, often faster',
    useCase: 'Practical graphs with small diameter',
  },
  {
    variant: 'SPFA',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Same as Bellman-Ford, but worst-case slow',
    useCase: 'Sparse graphs, incremental updates',
  },
]

export default function BellmanFordPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bellman-Ford</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Reliable shortest paths when negative edges appear</div>
              <p className="win95-text">
                Bellman-Ford computes shortest paths from a single source by repeatedly relaxing all edges. It is slower than
                Dijkstra, but it handles negative weights and detects negative cycles, making it a trusted baseline for
                constraint systems, routing, and graph analytics.
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
                Bellman-Ford is a dynamic programming shortest path algorithm that works on graphs with negative edges. It
                iteratively improves distance estimates by checking every edge. After V-1 passes, the shortest path to each
                reachable node is guaranteed to be correct, and an extra pass reveals any negative cycle.
              </p>
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
                {stepByStepFlow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
                The correctness guarantee comes from the fact that any shortest path without cycles has at most V-1 edges. Each
                pass guarantees correctness for paths with one more edge, so V-1 passes suffice unless a negative cycle exists.
              </p>
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
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Bellman-Ford is not the fastest for large graphs, but it is reliable in the presence of negative weights and
                can provide critical cycle detection that faster algorithms cannot.
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

