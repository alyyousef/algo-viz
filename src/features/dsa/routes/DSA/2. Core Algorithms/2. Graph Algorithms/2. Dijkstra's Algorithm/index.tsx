import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Edsger Dijkstra sketches the algorithm (1956)',
    detail:
      'While considering Dutch city routes, Dijkstra realized a greedy settle-order by rising distance would produce optimal paths for non-negative edges.',
  },
  {
    title: 'Formal publication in Numerische Mathematik (1959)',
    detail:
      'The paper proved correctness for single-source shortest paths and popularized the distance-label and relaxation language still used today.',
  },
  {
    title: "Dial's bucket optimization (1969)",
    detail:
      'Robert Dial replaced heaps with buckets for small integer weights, pushing the runtime toward linear on many practical graphs.',
  },
  {
    title: 'Fredman and Tarjan connect Fibonacci heaps (1984)',
    detail:
      'They showed that fast decrease-key operations drop the bound to O(E + V log V), influencing textbook presentations and contest implementations.',
  },
  {
    title: 'Networking era adoption (1990s)',
    detail:
      'Link-state routing protocols like OSPF and IS-IS embedded Dijkstra to recompute forwarding tables rapidly as topologies changed.',
  },
]

const mentalModels = [
  {
    title: 'Rising water',
    detail:
      'Imagine water filling terrain from the source. The first time water touches a node is the cheapest cost to that node; once wet, it never becomes cheaper.',
  },
  {
    title: 'IOU ledger',
    detail:
      'Every node holds an IOU for what it costs to reach it. The priority queue always pays off the smallest IOU next, guaranteeing no unpaid smaller debt remains.',
  },
  {
    title: 'Settled frontier',
    detail:
      'Settled nodes are paved; the frontier is gravel being compacted. Stepping back onto pavement cannot shorten a path because that pavement already follows the cheapest grade.',
  },
  {
    title: 'Weighted BFS',
    detail:
      'Swap BFS layers for a priority queue ordered by cumulative weight instead of hop count. Relaxation plays the same role as in BFS but respects edge costs.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Initialize all distances to infinity except the source at 0, then push the source into a min-priority queue.',
      'Extract the node with the smallest tentative distance. If the popped distance is larger than the recorded one, skip it as stale.',
      'For each outgoing edge (u, v, w), relax: if dist[u] + w < dist[v], update dist[v], set parent[v] = u, and push (dist[v], v) into the queue.',
      'Repeat until the queue is empty or a target node is extracted; that extraction finalizes its optimal cost.',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code and predictable constants.',
      'Fibonacci or pairing heap: better asymptotic decrease-key for dense graphs, higher constants in practice.',
      "Bucket queues (Dial, radix, 0-1 BFS): near-linear when weights are small integers or in {0,1}.",
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Non-negative edges are required. Negative weights break the settle-order guarantee.',
      'Settling at extract-min locks a node; no future path can improve it because all unsettled nodes are at least as far.',
      'Outdated heap entries are harmless if you verify dist on pop before relaxing neighbors.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Weighted shortest paths',
    detail:
      'Find cheapest routes when edges represent time, cost, or risk and are non-negative.',
  },
  {
    title: 'Single-source distance maps',
    detail:
      'Compute the best cost from one origin to all nodes, then reuse results for multiple queries.',
  },
  {
    title: 'Navigation and routing',
    detail:
      'When weights encode travel time or latency, Dijkstra delivers optimal paths without heuristics.',
  },
  {
    title: 'Not for negative edges',
    detail:
      'If any edge weight is negative, the greedy settle order is invalid; use Bellman-Ford or Johnson.',
  },
  {
    title: 'Multi-query optimization',
    detail:
      'If many sources are queried repeatedly, consider preprocessing or multi-level variants.',
  },
]

const loopInvariants = [
  {
    title: 'Settled invariant',
    detail:
      'When a node is extracted from the priority queue, its recorded distance is final and minimal among all remaining paths.',
  },
  {
    title: 'Upper-bound invariant',
    detail:
      'All recorded distances are upper bounds on the true shortest path; relaxations monotonically tighten them.',
  },
  {
    title: 'Frontier invariant',
    detail:
      'The priority queue always contains the next best candidate distances for unsettled nodes.',
  },
]

const stepTrace = [
  {
    step: 'Initialize',
    state: 'Source A at 0; others infinity. Queue: (A, 0)',
    note: 'We start with only the source settled.',
  },
  {
    step: 'Settle A',
    state: 'Relax A->B (2), A->C (5). Queue: (B, 2), (C, 5)',
    note: 'Shortest costs are tentative until popped.',
  },
  {
    step: 'Settle B',
    state: 'Relax B->C (1) => dist[C] = 3. Queue: (C, 3), (C, 5)',
    note: 'Stale entries remain but are ignored when popped.',
  },
  {
    step: 'Settle C',
    state: 'C popped with 3, finalize dist[C].',
    note: 'First time we pop a node is its optimal cost.',
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic core',
    detail:
      'Binary heap runs in O((V + E) log V); Fibonacci heap in O(E + V log V). With adjacency lists the work scales with actual edges.',
  },
  {
    title: 'Dense vs. sparse graphs',
    detail:
      'Adjacency matrices push runtime toward O(V^2) regardless of edge count, acceptable only when graphs are dense and V is moderate.',
  },
  {
    title: 'Integer weight shortcuts',
    detail:
      "Dial buckets achieve O(V + E + W) when weights are small non-negative integers and W is the maximum edge weight. 0-1 BFS specializes further to O(V + E).",
  },
  {
    title: 'Memory footprint',
    detail:
      'Distance and parent arrays cost O(V); the queue can hold up to O(E) entries when reinserting instead of decrease-key.',
  },
]

const inputSensitivity = [
  {
    title: 'Negative edges',
    detail:
      'Any negative edge breaks correctness; Dijkstra can return suboptimal paths.',
  },
  {
    title: 'Wide weight ranges',
    detail:
      'Large weights can cause integer overflow if distances are stored in small numeric types.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'Adjacency lists and heaps perform well; Dijkstra scales nearly linearly with edges.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Priority queues add overhead; O(V^2) array-based Dijkstra may be competitive.',
  },
]

const performanceProfile = [
  {
    title: 'Heap operations',
    detail:
      'Most runtime is spent in pop-min and push; choose a heap with good constants.',
  },
  {
    title: 'Decrease-key vs reinsertion',
    detail:
      'Reinsertion keeps code simple but increases heap size; decrease-key lowers queue growth at complexity cost.',
  },
  {
    title: 'Cache locality',
    detail:
      'Contiguous adjacency lists and compact node IDs reduce cache misses in large graphs.',
  },
  {
    title: 'Early exit',
    detail:
      'If only one target is needed, exit on first pop of that node to save work.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Dijkstra',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    bestFor: 'Non-negative weights',
    notes: 'Reliable for single-source shortest paths.',
  },
  {
    algorithm: 'BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Unit weights',
    notes: 'Simpler and faster when all weights are equal.',
  },
  {
    algorithm: '0-1 BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Weights 0 or 1',
    notes: 'Deque-based and faster than Dijkstra in this case.',
  },
  {
    algorithm: 'Bellman-Ford',
    time: 'O(VE)',
    space: 'O(V)',
    bestFor: 'Negative weights',
    notes: 'Slower but handles negatives and detects cycles.',
  },
]

const realWorldUses = [
  {
    context: 'Navigation and maps',
    detail:
      'Car GPS, delivery routing, and ride hailing compute fastest routes with Dijkstra or A* on road graphs where weights encode travel time.',
  },
  {
    context: 'Internet routing',
    detail:
      'OSPF and IS-IS routers run Dijkstra on link-state databases to rebuild forwarding tables whenever a link weight or topology change arrives.',
  },
  {
    context: 'Game AI and robotics',
    detail:
      'Pathfinding on weighted grids or navmeshes uses Dijkstra for cost-to-go tables, often combined with heuristics for real-time play.',
  },
  {
    context: 'Network reliability and QoS',
    detail:
      'Traffic engineering tools compute least-cost and k-shortest paths under latency or utilization weights to balance load safely.',
  },
  {
    context: 'Compilers and analysis',
    detail:
      'Dataflow and call graph analyses use Dijkstra when edge weights encode risk or frequency, revealing cheapest witnesses through code.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bidirectional Dijkstra',
    detail:
      'Run from source and target and meet in the middle to shrink explored states on undirected graphs.',
  },
  {
    title: "Dial's buckets",
    detail:
      'Bucket queues remove the log factor for small integer weights.',
  },
  {
    title: 'Radix heap',
    detail:
      'Exploits monotone keys to speed up integer-weight graphs.',
  },
  {
    title: 'A* overlay',
    detail:
      'Add a heuristic to focus search toward a goal while preserving optimality.',
  },
]

const examples = [
  {
    title: 'Standard Dijkstra with min-heap',
    code: `function dijkstra(graph, source):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    pq = new MinHeap()
    pq.push((0, source))

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue  // stale entry from an older relaxation

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist.get(v, infinity):
                dist[v] = dist[u] + w
                parent[v] = u
                pq.push((dist[v], v))

    return { dist, parent }`,
    explanation:
      'Reinserting instead of decrease-key keeps code simple; the stale check preserves correctness. Parent pointers enable path reconstruction.',
  },
  {
    title: 'Early exit when target is known',
    code: `function shortestPath(graph, source, target):
    dist = { source: 0 }
    parent = { source: null }
    pq = MinHeap([(0, source)])

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue
        if u == target:
            break  // first time we pop target is optimal

        for (v, w) in graph.neighbors(u):
            if d + w < dist.get(v, infinity):
                dist[v] = d + w
                parent[v] = u
                pq.push((dist[v], v))

    return reconstruct(parent, target)`,
    explanation:
      'Because the queue orders by cost, the first extraction of the target certifies its shortest path. Stopping here avoids needless work.',
  },
  {
    title: 'Path reconstruction',
    code: `function reconstruct(parent, target):
    path = []
    node = target
    while node is not null:
        path.push(node)
        node = parent[node]
    return reverse(path)`,
    explanation:
      'Parents collected during relaxations give the exact path at the end without another search.',
  },
  {
    title: "Dial's buckets for small integer weights",
    code: `function dial(graph, source, maxW):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    buckets = array of lists length (maxW * |V| + 1)
    idx = 0
    buckets[0].append(source)

    while some bucket is non-empty:
        while buckets[idx] is empty:
            idx += 1
        u = buckets[idx].pop()
        if idx != dist[u]:
            continue

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                buckets[dist[v]].append(v)

    return dist`,
    explanation:
      'When weights are bounded small integers, bucket indices act as exact keys and remove the log factor.',
  },
]

const pitfalls = [
  'Applying Dijkstra when any edge is negative yields wrong paths; use Bellman-Ford or Johnson in that case.',
  'Ignoring stale heap entries when using reinsertion wastes work or corrupts parents; always check the recorded distance on pop.',
  'Overflowing distance sums on large weights breaks comparisons; use 64-bit or bigint distances.',
  'Using adjacency matrices on sparse graphs inflates runtime and memory; prefer adjacency lists.',
  'Skipping parent tracking forces extra passes or prevents route reconstruction after the run.',
  'Assuming the first time a node is discovered is optimal; only extraction from the min-heap finalizes it.',
]

const decisionGuidance = [
  'Non-negative weighted edges and single-source queries: pick Dijkstra.',
  'Unit weights: use BFS for simpler O(V + E) time.',
  'Weights limited to 0 or 1: use 0-1 BFS with a deque.',
  'Negative weights present: use Bellman-Ford or Johnson (for many sources).',
  'Single target and a good heuristic: use A* to narrow the search.',
  'Many queries on a static graph: preprocess with contraction hierarchies or multi-level Dijkstra for faster responses.',
]

const implementationTips = [
  {
    title: 'Pick the right number type',
    detail:
      'Use 64-bit integers or bigints if weights and paths can be large.',
  },
  {
    title: 'Use adjacency lists',
    detail:
      'They avoid O(V^2) scans and keep runtime proportional to edges.',
  },
  {
    title: 'Prefer early exit',
    detail:
      'If you only need one destination, stop at the first pop of that node.',
  },
  {
    title: 'Handle stale heap entries',
    detail:
      'Skip nodes whose popped distance no longer matches dist[u].',
  },
  {
    title: 'Store parents for paths',
    detail:
      'Capture parent pointers on relaxation so paths are available without extra passes.',
  },
]

const advancedInsights = [
  {
    title: 'Bidirectional Dijkstra',
    detail:
      'Run forward from the source and backward from the target; meet-in-the-middle cuts explored nodes dramatically on large undirected graphs.',
  },
  {
    title: 'Potential-based reweighting',
    detail:
      'Johnson adds vertex potentials to eliminate negative edges, making Dijkstra applicable while preserving shortest paths after reweighting.',
  },
  {
    title: 'Heuristic overlays (A*)',
    detail:
      'Adding an admissible heuristic h(v) to the key (dist + h) keeps the settle-order optimal while focusing effort near the goal.',
  },
  {
    title: 'Cache-aware engineering',
    detail:
      'D-ary heaps reduce cache misses; radix heaps work well for monotone integer keys; contiguous adjacency layouts improve memory bandwidth.',
  },
  {
    title: 'Cut property intuition',
    detail:
      'The next settled node is always reached by the minimum-weight edge crossing the cut between settled and unsettled sets, mirroring the logic behind MST algorithms.',
  },
]

const takeaways = [
  'Dijkstra is weighted BFS with a min-priority frontier; non-negative edges make its greedy settling safe.',
  'Priority queue choice controls constants: binary heaps are dependable, buckets excel on bounded integers, Fibonacci heaps push asymptotics.',
  'Stale-entry checks or real decrease-key keep reinsertion strategies correct.',
  'Match the algorithm to the graph: BFS for unit weights, 0-1 BFS for {0,1}, Bellman-Ford for negatives, A* when a goal and heuristic exist.',
  'References: Dijkstra 1959, CLRS shortest paths, and routing protocol literature.',
]

export default function DijkstrasPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Dijkstra's Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Weighted shortest paths without regrets</div>
              <p className="win95-text">
                Dijkstra's algorithm is weighted BFS with discipline. It settles nodes in order of increasing cost using a priority queue,
                guaranteeing optimal paths in graphs whose edges never go negative. From road networks to link-state routers, it is the reliable
                workhorse for single-source shortest paths.
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
                The algorithm asks: what is the cheapest way to reach every node when edges are non-negative? By always expanding the
                lowest-cost unsettled node and relaxing its outgoing edges, it builds a shortest-path tree without backtracking. The
                only risk is memory and heap overhead, not correctness, as long as weights stay non-negative.
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
            <legend>How it works: mechanics in motion</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny graph</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
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
                Implementation choices dominate real speed: heaps balance clarity and efficiency, buckets win when weights are tiny
                integers, and cache-aware layouts matter on billion-edge graphs more than minor asymptotic differences.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Best for</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.bestFor}</td>
                      <td>{row.notes}</td>
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Advanced insights and current frontiers</legend>
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
            <div className="win95-panel win95-panel--raised">
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
