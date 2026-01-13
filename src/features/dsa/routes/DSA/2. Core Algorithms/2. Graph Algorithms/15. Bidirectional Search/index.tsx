import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Meet-in-the-middle search in early AI (1960s to 1970s)',
    detail:
      'Researchers observed that expanding from both ends can cut depth in half. This idea became a standard tool when state spaces were too large for one-sided search.',
  },
  {
    title: 'Bidirectional BFS for unweighted shortest paths (1970s)',
    detail:
      'The algorithm gained traction in graph theory and AI as a fast way to find shortest paths in unweighted graphs, especially when branching factor is high.',
  },
  {
    title: 'Bidirectional Dijkstra for weighted routing (1990s)',
    detail:
      'Routing systems adopted dual priority queues to cut the search space on large weighted road networks, with formal termination conditions.',
  },
  {
    title: 'Modern navigation and social graphs (2000s to now)',
    detail:
      'Large-scale systems use bidirectional search, often with heuristics and pruning, to answer shortest-path and reachability queries interactively.',
  },
]

const mentalModels = [
  {
    title: 'Two waves that meet',
    detail:
      'Imagine ripples expanding from both the start and goal. The first place the waves intersect is where the path is stitched together.',
  },
  {
    title: 'Depth halving',
    detail:
      'If a path is length d, each side only needs to search about d/2 levels. For exponential branching, that means a dramatic reduction in explored nodes.',
  },
  {
    title: 'Balanced effort',
    detail:
      'You spend search budget where it matters. Expand the smaller frontier to keep both sides balanced and limit redundant exploration.',
  },
]

const coreMechanics = [
  {
    title: 'Two frontiers, two visited sets',
    detail:
      'Maintain a frontier from the start and one from the goal. Each expansion marks visited nodes, along with parent pointers for reconstruction.',
  },
  {
    title: 'Intersection as stopping signal',
    detail:
      'When a node is visited by both sides, a path exists through that meeting point. In unweighted graphs, the first meeting gives a shortest path.',
  },
  {
    title: 'Frontier selection',
    detail:
      'Expand the frontier with fewer nodes or lower total cost to reduce work. This keeps the search balanced and improves worst-case performance.',
  },
]

const keyStructures = [
  {
    title: 'Queues or priority queues',
    detail:
      'Use FIFO queues for unweighted graphs (bidirectional BFS) and min-heaps for weighted graphs (bidirectional Dijkstra).',
  },
  {
    title: 'Visited maps with parents',
    detail:
      'Track predecessor from each side. When frontiers meet, you can reconstruct the path by following parent links to the start and goal.',
  },
  {
    title: 'Distance maps',
    detail:
      'For weighted graphs, store best-known distances from both directions. These allow safe termination when no better path can appear.',
  },
  {
    title: 'Meeting point tracking',
    detail:
      'Keep the best meeting node and path length seen so far. This is essential for weighted variants where the first intersection is not always optimal.',
  },
]

const terminationRules = [
  {
    title: 'Unweighted graphs',
    detail:
      'Stop when the frontiers intersect. The path length is the depth from start to meeting plus depth from goal to meeting.',
  },
  {
    title: 'Weighted graphs',
    detail:
      'Stop when minDistStart + minDistGoal >= bestPathFound. This guarantees the current best meeting is optimal.',
  },
  {
    title: 'Directed graphs',
    detail:
      'Run the reverse search using incoming edges. The meeting still works, but you must respect edge directions on both sides.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'For branching factor b and shortest path length d, bidirectional BFS explores about O(b^(d/2)) per side instead of O(b^d).',
  },
  {
    title: 'Space complexity',
    detail:
      'Both visited sets must be stored, so memory is O(b^(d/2)) in the ideal case. This can still be heavy, but far less than one-sided search.',
  },
  {
    title: 'Overhead costs',
    detail:
      'Two frontiers and intersection checks add constant overhead, but the exponential savings usually dominate in large graphs.',
  },
  {
    title: 'Heuristic effects',
    detail:
      'Adding heuristics can reduce explored nodes further but complicates correctness. Bidirectional A* requires careful termination conditions.',
  },
]

const realWorldUses = [
  {
    context: 'Navigation and routing',
    detail:
      'Road networks are large but sparse. Bidirectional Dijkstra cuts query times for shortest path between two locations.',
  },
  {
    context: 'Social network queries',
    detail:
      'Finding degrees of separation between two users is a classic bidirectional BFS use case due to high branching factor.',
  },
  {
    context: 'Word ladder puzzles',
    detail:
      'Searching from both the start word and the target word halves the depth and speeds up dictionary lookups.',
  },
  {
    context: 'State-space planning',
    detail:
      'Robotics and planning tasks use bidirectional search to reduce search depth in large action spaces.',
  },
]

const examples = [
  {
    title: 'Bidirectional BFS for unweighted shortest path',
    code: `function biBfs(graph, start, goal):
    if start == goal: return [start]
    qStart = Queue([start])
    qGoal = Queue([goal])
    parentStart = Map(start -> null)
    parentGoal = Map(goal -> null)

    while qStart not empty and qGoal not empty:
        meet = expandOneLayer(graph, qStart, parentStart, parentGoal)
        if meet: return buildPath(meet, parentStart, parentGoal)
        meet = expandOneLayer(graph, qGoal, parentGoal, parentStart)
        if meet: return buildPath(meet, parentStart, parentGoal)

    return null`,
    explanation:
      'Each expansion checks if the newly visited node already exists in the opposite visited map. The first intersection yields a shortest path in unweighted graphs.',
  },
  {
    title: 'Bidirectional Dijkstra for weighted graphs',
    code: `function biDijkstra(graph, start, goal):
    pqStart = MinHeap((0, start))
    pqGoal = MinHeap((0, goal))
    distStart = Map(start -> 0)
    distGoal = Map(goal -> 0)
    best = Infinity
    meeting = null

    while pqStart and pqGoal:
        if pqStart.min + pqGoal.min >= best: break
        relaxOne(pqStart, distStart, distGoal, graph, (node) => {
            total = distStart[node] + distGoal.get(node, Infinity)
            if total < best: best = total; meeting = node
        })
        relaxOne(pqGoal, distGoal, distStart, graphReverse, (node) => {
            total = distGoal[node] + distStart.get(node, Infinity)
            if total < best: best = total; meeting = node
        })

    return reconstructPath(meeting, distStart, distGoal)`,
    explanation:
      'Weighted graphs need min-heaps and a termination condition based on current best path length. The first intersection is not always optimal.',
  },
  {
    title: 'Using balanced frontier expansion',
    code: `function balancedStep(frontierA, frontierB):
    if frontierA.size <= frontierB.size:
        return expand(frontierA)
    return expand(frontierB)`,
    explanation:
      'Expanding the smaller frontier keeps the two searches balanced and typically minimizes the total number of explored nodes.',
  },
]

const pitfalls = [
  'Stopping too early in weighted graphs. The first meeting is not guaranteed to be optimal without a proper termination rule.',
  'Forgetting to reverse edges in directed graphs. The backward search must follow incoming edges, not outgoing.',
  'Reconstructing the path incorrectly. Remember to reverse one side and avoid duplicating the meeting node.',
  'Using inconsistent visited checks. A node must be marked before you test for intersection to avoid missing early meetings.',
  'Mixing heuristic search without correct proofs. Bidirectional A* needs careful admissibility and consistent stopping criteria.',
]

const decisionGuidance = [
  'You need shortest paths in large unweighted graphs with high branching factor.',
  'You have a well-defined start and goal and can search backward from the goal.',
  'Memory can hold two visited sets, but full one-sided BFS is too expensive.',
  'You can afford extra bookkeeping for parent and distance maps.',
  'You need faster interactive queries, such as navigation or social graph lookups.',
]

const advancedInsights = [
  {
    title: 'Search direction strategy',
    detail:
      'Choosing the smaller frontier or lower minimum-cost frontier reduces total expansions. This is often more effective than strict alternation.',
  },
  {
    title: 'Meet-in-the-middle with heuristics',
    detail:
      'Bidirectional A* can be powerful but fragile. It requires consistent heuristics and a termination condition that guarantees optimality.',
  },
  {
    title: 'Graph preprocessing',
    detail:
      'Techniques like contraction hierarchies or landmark heuristics can be combined with bidirectional search to speed up routing queries.',
  },
  {
    title: 'Path stitching quality',
    detail:
      'In weighted graphs, the best meeting node may not be the first. Tracking the best total cost meeting preserves optimality.',
  },
]

const takeaways = [
  'Bidirectional search cuts depth in half, which can reduce explored nodes exponentially.',
  'The algorithm is most effective when both sides can expand symmetrically and meet near the middle.',
  'Unweighted graphs allow a clean stopping rule at the first intersection; weighted graphs require a cost-based termination check.',
  'Correct path reconstruction depends on parent maps from both directions.',
  'The extra bookkeeping is usually worth the speedup on large graphs.',
]

const variantTable = [
  {
    variant: 'Bidirectional BFS',
    graphType: 'Unweighted, undirected or directed with reverse edges',
    guarantee: 'Shortest path by edge count',
    useCase: 'Social graphs, word ladders, connectivity checks',
  },
  {
    variant: 'Bidirectional Dijkstra',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Shortest path by total weight',
    useCase: 'Routing, logistics, map navigation',
  },
  {
    variant: 'Bidirectional A*',
    graphType: 'Weighted with admissible heuristics',
    guarantee: 'Shortest path with careful termination',
    useCase: 'Games, robotics, path planning with heuristics',
  },
]

export default function BidirectionalSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bidirectional Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Meet in the middle to cut search depth and deliver faster paths</div>
              <p className="win95-text">
                Bidirectional search runs two coordinated searches: one from the start and one from the goal. By letting the
                frontiers meet in the middle, it reduces the exponential blowup that makes one-sided BFS or Dijkstra expensive
                on large graphs. This page explains the intuition, mechanics, variants, and the practical details that make the
                technique fast and correct.
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
                Bidirectional search is a meet-in-the-middle strategy for shortest path and reachability. Instead of exploring
                all nodes out to depth d from the start, it explores depth d/2 from both ends. When the two searches touch, the
                path is reconstructed by stitching together the two halves. This is especially powerful when branching factor is
                large and you have a single known target.
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
                <li>Initialize the start frontier and the goal frontier with their respective nodes.</li>
                <li>Create visited maps on each side to store parents and, if weighted, distances.</li>
                <li>Pick the frontier to expand (often the smaller or lower-cost one).</li>
                <li>Expand one layer of neighbors and mark each newly discovered node.</li>
                <li>After each expansion, check if any node appears in both visited maps.</li>
                <li>When an intersection is found, reconstruct the path by joining the two parent chains.</li>
                <li>For weighted graphs, stop only when the best possible remaining path cannot beat the best found.</li>
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
                The key correctness idea is that each side explores paths in nondecreasing order of length (BFS) or cost
                (Dijkstra). When the stop condition is satisfied, no shorter path can exist than the best meeting found so far.
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
                Bidirectional search trades a bit of overhead and memory for massive reductions in explored nodes. It is most
                valuable when the graph is large, the target is specific, and the branching factor is high.
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

