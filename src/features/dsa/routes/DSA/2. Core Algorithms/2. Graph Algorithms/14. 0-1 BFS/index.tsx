import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Dial style shortest paths for small integer weights',
    detail:
      'Dial’s algorithm showed that bounded integer weights allow faster queues than full Dijkstra. 0-1 BFS is the minimal case of that idea.',
  },
  {
    title: 'Deque-based optimization becomes popular (1990s)',
    detail:
      'Competitive programming and systems courses popularized 0-1 BFS as a practical speedup for graphs with only 0 or 1 edge weights.',
  },
  {
    title: 'Used in grid, maze, and routing puzzles',
    detail:
      'Problems with binary costs (free vs paid edges, open vs blocked) naturally fit the 0-1 model.',
  },
  {
    title: 'A specialized Dijkstra substitute',
    detail:
      '0-1 BFS delivers Dijkstra’s correctness for non-negative weights but with linear-time behavior on binary edges.',
  },
]

const mentalModels = [
  {
    title: 'Two-lane freeway',
    detail:
      'Edges of weight 0 are a fast lane. You jump to the front of the deque. Weight 1 edges go to the back.',
  },
  {
    title: 'Bucketed priorities',
    detail:
      'You only need two buckets for distance increments of 0 or 1. A deque simulates those buckets exactly.',
  },
  {
    title: 'Dijkstra with a simpler queue',
    detail:
      'The algorithm still expands nodes in nondecreasing distance order, but a deque replaces the priority queue.',
  },
]

const coreMechanics = [
  {
    title: 'Deque instead of heap',
    detail:
      'Pop from the front. When relaxing an edge, push front for weight 0 and push back for weight 1.',
  },
  {
    title: 'Distance relaxation',
    detail:
      'If dist[u] + w improves dist[v], update and enqueue v. This mirrors Dijkstra but with a binary-cost queue.',
  },
  {
    title: 'Monotone expansion',
    detail:
      'The deque ordering ensures nodes are processed in nondecreasing distance, preserving shortest path correctness.',
  },
]

const keyStructures = [
  {
    title: 'Deque',
    detail:
      'Supports push front and push back in O(1), which matches the binary weight behavior.',
  },
  {
    title: 'Distance array',
    detail:
      'Holds shortest known distance. Initialize with Infinity except the source.',
  },
  {
    title: 'Parent array',
    detail:
      'Track the predecessor edge for path reconstruction.',
  },
  {
    title: 'Visited or in-queue tracking',
    detail:
      'Not strictly required if you check dist improvements, but can reduce redundant enqueues.',
  },
]

const terminationRules = [
  {
    title: 'Deque empty',
    detail:
      'When the deque is empty, all reachable nodes have final distances.',
  },
  {
    title: 'Early goal stop',
    detail:
      'If you only need the distance to a goal, you can stop when the goal is popped from the deque.',
  },
  {
    title: 'Binary-weight requirement',
    detail:
      'Edge weights must be 0 or 1. Any other weights break the deque ordering guarantee.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V + E) because each edge relax is O(1) and each node is pushed a bounded number of times.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for graph storage plus distance and parent arrays.',
  },
  {
    title: 'Why it beats Dijkstra',
    detail:
      'No heap operations. The deque is linear-time for binary weights, so the log factor disappears.',
  },
  {
    title: 'Edge cases',
    detail:
      'Graphs with many 0 edges can cause many front pushes but still remain linear in total relaxations.',
  },
]

const realWorldUses = [
  {
    context: 'Maze and grid navigation',
    detail:
      'Grid problems with free steps and costly steps (like breaking walls) map directly to 0 and 1 edge weights.',
  },
  {
    context: 'Network routing with tolls',
    detail:
      'Binary cost edges model paid vs free links, where you want to minimize toll count.',
  },
  {
    context: 'String transformation puzzles',
    detail:
      'Edits with cost 0 or 1 (like flip vs swap) form a graph where 0-1 BFS finds minimal edits quickly.',
  },
  {
    context: 'Layered state graphs',
    detail:
      'State machines with optional transitions (free) and costly transitions (1) are a perfect fit.',
  },
]

const examples = [
  {
    title: '0-1 BFS pseudocode',
    code: `function zeroOneBfs(graph, source):
    dist = array(|V|, Infinity)
    parent = array(|V|, null)
    deque = Deque()
    dist[source] = 0
    deque.pushFront(source)

    while deque not empty:
        u = deque.popFront()
        for (v, w) in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                if w == 0:
                    deque.pushFront(v)
                else:
                    deque.pushBack(v)

    return dist, parent`,
    explanation:
      'The deque keeps nodes ordered by distance without a heap. Weight 0 edges get priority.',
  },
  {
    title: 'Binary grid example',
    code: `// 0 = open, 1 = wall to break
// Move cost is 0 for open, 1 for wall
grid = [
  0 1 0
  0 1 0
  0 0 0
]
// 0-1 BFS finds the minimal number of walls to break`,
    explanation:
      'Edges through free cells push to front, while breaking a wall pushes to back.',
  },
  {
    title: 'Convert to 0-1 graph',
    code: `// Edge weight is 0 if condition holds, else 1
if canReuseToken(u, v): weight = 0
else: weight = 1`,
    explanation:
      'Any decision that is binary can be modeled as 0 or 1, enabling fast shortest paths.',
  },
]

const pitfalls = [
  'Using weights other than 0 or 1. The deque ordering no longer preserves shortest paths.',
  'Forgetting to update parent when a shorter path is found.',
  'Stopping too early when the goal is first discovered rather than popped.',
  'Using a visited flag that prevents relaxation through a shorter path.',
  'Assuming the graph is undirected without adding reverse edges.',
]

const decisionGuidance = [
  'Edge weights are strictly 0 or 1.',
  'You want shortest paths faster than Dijkstra without heaps.',
  'You can afford O(V + E) memory and want linear-time performance.',
  'The graph is large and sparse with binary costs.',
  'You need reliable shortest paths, not just greedy approximations.',
]

const advancedInsights = [
  {
    title: 'Relation to Dijkstra',
    detail:
      '0-1 BFS is a specialized Dijkstra where the priority queue is replaced by a deque due to binary edge weights.',
  },
  {
    title: 'Dial’s algorithm generalization',
    detail:
      'For weights in 0..C, you can use C+1 buckets. 0-1 BFS is the C=1 case.',
  },
  {
    title: 'Path reconstruction detail',
    detail:
      'Because multiple relaxations can occur, only the last relaxation to a node should define its parent.',
  },
  {
    title: 'Multi-source variant',
    detail:
      'Initialize the deque with all sources at distance 0 to compute minimum distance to the nearest source.',
  },
]

const takeaways = [
  '0-1 BFS delivers shortest paths in linear time for binary-weight graphs.',
  'A deque is enough to maintain the correct expansion order.',
  'It is a practical drop-in replacement for Dijkstra when weights are 0 or 1.',
  'Correctness depends on monotone distances and strict relaxation checks.',
  'It pairs well with grid and state-space problems that have binary costs.',
]

const variantTable = [
  {
    variant: '0-1 BFS',
    graphType: 'Directed or undirected, weights in {0,1}',
    guarantee: 'Shortest paths by total weight',
    useCase: 'Binary cost routing, maze breaking, min toggles',
  },
  {
    variant: 'Dial’s algorithm',
    graphType: 'Integer weights in [0, C]',
    guarantee: 'Shortest paths by total weight',
    useCase: 'Small bounded weights with bucket queues',
  },
  {
    variant: 'Dijkstra',
    graphType: 'Non-negative weights',
    guarantee: 'Shortest paths by total weight',
    useCase: 'General weighted graphs without binary restriction',
  },
]

export default function Topic01BFSPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">0-1 BFS</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Shortest paths in binary-weight graphs with a deque</div>
              <p className="win95-text">
                0-1 BFS is a specialized shortest path algorithm for graphs whose edge weights are only 0 or 1. It replaces the
                priority queue of Dijkstra with a deque and still expands nodes in nondecreasing distance order. The result is
                the same optimal paths, but with linear-time performance.
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
                Many problems have edges that are either free (0) or cost one unit (1): breaking a wall, paying a toll, or
                toggling a bit. 0-1 BFS exploits this structure by using a deque. If traversing an edge adds zero cost, the next
                node should be processed immediately, so it goes to the front. If it adds one cost, it goes to the back. This
                simple rule keeps the queue ordered by distance without a heap.
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
                <li>Initialize distances to Infinity and set the source to 0.</li>
                <li>Push the source onto the front of the deque.</li>
                <li>Pop from the front and relax each outgoing edge.</li>
                <li>If the edge weight is 0, push the neighbor to the front.</li>
                <li>If the edge weight is 1, push the neighbor to the back.</li>
                <li>Repeat until the deque is empty or the goal is popped.</li>
                <li>Reconstruct the path using the parent array if needed.</li>
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
                The deque ordering preserves nondecreasing distance because any 0 edge keeps distance the same and any 1 edge
                increases it by one. This mimics Dijkstra’s greedy rule with a simpler data structure.
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
                0-1 BFS is a perfect fit when weights are binary. If weights drift beyond 0 or 1, switch to Dijkstra or a
                bucketed variant like Dial’s algorithm.
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

