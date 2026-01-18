import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'A* introduced by Hart, Nilsson, and Raphael (1968)',
    detail:
      'A* unified uniform-cost search and heuristic guidance, proving optimality when the heuristic is admissible and consistent.',
  },
  {
    title: 'Pathfinding in robotics and AI planning (1970s)',
    detail:
      'The algorithm became a default for navigation and planning tasks because it balances accuracy with speed.',
  },
  {
    title: 'Game development adoption (1990s)',
    detail:
      'Real-time games used A* on grids and navigation meshes, showing that heuristic search could scale to interactive workloads.',
  },
  {
    title: 'Modern variants and hybrid heuristics (2000s to now)',
    detail:
      'Techniques like weighted A*, hierarchical A*, and jump point search refined performance for large maps and routing.',
  },
]

const prerequisites = [
  {
    title: 'Graph with non-negative edge weights',
    detail:
      'A* assumes non-negative costs so that shorter paths remain valid during expansion.',
  },
  {
    title: 'Heuristic function h(n)',
    detail:
      'An estimate of the remaining cost to the goal. Quality of h determines speed.',
  },
  {
    title: 'State representation',
    detail:
      'Each node represents a state; neighbors and edge costs must be well-defined.',
  },
  {
    title: 'Start and goal nodes',
    detail:
      'A* solves a single-source single-target shortest path problem.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E), start s, goal t, edge costs, and a heuristic h(n).',
  },
  {
    title: 'Output',
    detail:
      'Shortest path from s to t and its total cost, or failure if unreachable.',
  },
  {
    title: 'Optional',
    detail:
      'Explored set, cost maps, and parent links for visualization and debugging.',
  },
]

const formalDefinitions = [
  {
    title: 'g(n)',
    detail:
      'Cost of the best-known path from start to node n.',
  },
  {
    title: 'h(n)',
    detail:
      'Heuristic estimate of the cost from n to the goal.',
  },
  {
    title: 'f(n)',
    detail:
      'Evaluation function f(n) = g(n) + h(n) used to rank nodes.',
  },
  {
    title: 'Admissible heuristic',
    detail:
      'h(n) never overestimates the true remaining cost.',
  },
  {
    title: 'Consistent heuristic',
    detail:
      'h(n) <= cost(n, n2) + h(n2) for every edge (n, n2).',
  },
]

const mentalModels = [
  {
    title: 'Best-first with a compass',
    detail:
      'A* follows the cheapest known path so far, but the heuristic acts like a compass pointing toward the goal.',
  },
  {
    title: 'g + h scoring',
    detail:
      'The score f(n) = g(n) + h(n) blends exact cost traveled with estimated cost remaining.',
  },
  {
    title: 'Optimism keeps it safe',
    detail:
      'If the heuristic never overestimates, A* will never miss the optimal path. It explores just enough to prove optimality.',
  },
]

const coreMechanics = [
  {
    title: 'Open and closed sets',
    detail:
      'Open contains frontier nodes ordered by lowest f score. Closed contains nodes already fully expanded.',
  },
  {
    title: 'Relax neighbors with g scores',
    detail:
      'When a cheaper path to a neighbor is found, update its g score, parent, and f score.',
  },
  {
    title: 'Goal test at expansion',
    detail:
      'The first time the goal is popped from the priority queue, the optimal path is known (with consistent heuristics).',
  },
]

const heuristicRules = [
  {
    title: 'Admissible',
    detail:
      'Never overestimates the true remaining cost. Guarantees optimal paths but may explore more.',
  },
  {
    title: 'Consistent (monotone)',
    detail:
      'Heuristic obeys the triangle inequality: h(n) <= cost(n, n2) + h(n2). Ensures no re-expansions.',
  },
  {
    title: 'Informed',
    detail:
      'Closer to the true distance yields fewer expansions. Good heuristics can reduce the search dramatically.',
  },
]

const keyStructures = [
  {
    title: 'Priority queue (min-heap)',
    detail:
      'Orders nodes by f = g + h, so the most promising node is expanded first.',
  },
  {
    title: 'Distance maps',
    detail:
      'Store g scores (best known cost from start). Used to decide whether a better path exists.',
  },
  {
    title: 'Parent pointers',
    detail:
      'Track how each node was reached. Needed to reconstruct the final path.',
  },
  {
    title: 'Closed set',
    detail:
      'Marks nodes already expanded to avoid redundant work when the heuristic is consistent.',
  },
]

const stepByStepFlow = [
  'Initialize open set with start, g(start) = 0, f(start) = h(start).',
  'Pop the node with the smallest f from the priority queue.',
  'If it is the goal, reconstruct the path by following parent pointers.',
  'For each neighbor, compute tentative g and relax if it improves the best known g.',
  'Update the neighbor f and parent, then push or decrease-key in the open set.',
  'Mark the current node closed and repeat until open is empty.',
]

const dataStructures = [
  {
    title: 'Priority queue with decrease-key',
    detail:
      'Supports efficient updates when a better path to an open node is found.',
  },
  {
    title: 'g-score map',
    detail:
      'Tracks best-known cost from start to each node.',
  },
  {
    title: 'f-score map',
    detail:
      'Stores g + h to avoid recomputation in the heap.',
  },
  {
    title: 'Parent map',
    detail:
      'Allows path reconstruction after reaching the goal.',
  },
  {
    title: 'Closed set',
    detail:
      'Prevents redundant expansions when heuristics are consistent.',
  },
]

const terminationRules = [
  {
    title: 'Goal popped from open set',
    detail:
      'With a consistent heuristic, the first time the goal is expanded, the path is optimal.',
  },
  {
    title: 'No path',
    detail:
      'If the open set becomes empty, the goal is unreachable from the start.',
  },
  {
    title: 'Weighted A*',
    detail:
      'When you inflate h by a weight, you trade optimality for speed and should stop at first goal pop.',
  },
]

const correctnessNotes = [
  {
    title: 'Admissibility implies optimality',
    detail:
      'If h never overestimates, A* will not skip the optimal path.',
  },
  {
    title: 'Consistency prevents re-openings',
    detail:
      'With a consistent h, once a node is closed its best path is final.',
  },
  {
    title: 'Goal pop is a proof',
    detail:
      'When the goal is popped, no cheaper path remains in the open set.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Worst-case is exponential in path length, but good heuristics dramatically reduce expansions.',
  },
  {
    title: 'Space complexity',
    detail:
      'A* stores all frontier nodes, so memory can be the limiting factor on large graphs.',
  },
  {
    title: 'Heuristic sensitivity',
    detail:
      'A small heuristic improves over Dijkstra. A near-perfect heuristic can make search almost linear in path length.',
  },
  {
    title: 'Consistency advantage',
    detail:
      'Consistent heuristics avoid re-opening nodes, reducing overhead and simplifying correctness.',
  },
]

const realWorldUses = [
  {
    context: 'Game AI pathfinding',
    detail:
      'A* is the standard for grid and navmesh pathfinding because it is fast and reliable with geometric heuristics.',
  },
  {
    context: 'Robotics navigation',
    detail:
      'Robots use A* to plan collision-free paths by combining map costs with heuristic distance to targets.',
  },
  {
    context: 'Logistics and routing',
    detail:
      'Route planning uses A* with travel-time heuristics or landmarks to speed up shortest path queries.',
  },
  {
    context: 'Puzzle solving',
    detail:
      'A* is a classic solver for sliding puzzles and planning tasks where good heuristics are known.',
  },
]

const examples = [
  {
    title: 'A* pseudocode',
    code: `function aStar(graph, start, goal, h):
    open = MinHeap((f=0, node=start))
    g = Map(start -> 0)
    parent = Map(start -> null)
    closed = Set()

    while open not empty:
        current = open.popMin()
        if current == goal: return reconstruct(parent, goal)
        if current in closed: continue
        closed.add(current)
        for each (neighbor, cost) in graph[current]:
            tentative = g[current] + cost
            if tentative < g.get(neighbor, Infinity):
                g[neighbor] = tentative
                parent[neighbor] = current
                f = tentative + h(neighbor)
                open.push((f, neighbor))

    return null`,
    explanation:
      'The priority queue orders nodes by f score. With an admissible heuristic, the first time you expand the goal, the path is optimal.',
  },
  {
    title: 'Grid heuristic choices',
    code: `Manhattan: |dx| + |dy| for 4-way grids
Euclidean: sqrt(dx^2 + dy^2) for continuous space
Octile: max(dx, dy) + (sqrt(2) - 1) * min(dx, dy) for 8-way grids`,
    explanation:
      'Match the heuristic to the movement model. Using the wrong heuristic makes A* less informed or even inadmissible.',
  },
  {
    title: 'Weighted A* for speed',
    code: `f(n) = g(n) + w * h(n)  // w > 1
// Larger w explores fewer nodes but may yield suboptimal paths.`,
    explanation:
      'Weighted A* sacrifices optimality to reduce search time, useful in real-time systems where speed matters more than perfect paths.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges (cost):
S-A:1, S-B:4, A-C:2, B-C:1, C-G:3
Heuristic h: h(S)=5, h(A)=4, h(B)=2, h(C)=2, h(G)=0

Start: g(S)=0 f(S)=5
Pop S -> relax A (g=1 f=5), B (g=4 f=6)
Pop A -> relax C (g=3 f=5)
Pop C -> relax G (g=6 f=6)
Pop B -> relax C via B (g=5) no improvement
Pop G -> done
Path: S-A-C-G cost 6`,
    explanation:
      'The heuristic guides the search toward C and G while still proving the optimal route.',
  },
]

const edgeCases = [
  'No path from start to goal: open set empties and returns failure.',
  'Zero-cost edges: still valid, but heuristics must remain admissible.',
  'Inconsistent heuristic: may need to re-open nodes when better paths appear.',
  'Multiple optimal paths: tie-breaking affects which path is returned.',
]

const pitfalls = [
  'Using a heuristic that overestimates, which breaks optimality guarantees.',
  'Forgetting to update a node in the open set when a shorter path is found.',
  'Using a closed set with an inconsistent heuristic, causing missed better paths.',
  'Ignoring edge costs on weighted graphs, effectively turning A* into greedy best-first.',
  'Letting the open set grow without bounds on huge graphs without pruning or hierarchy.',
]

const decisionGuidance = [
  'You need shortest paths and have a reasonable heuristic.',
  'The graph is too large for plain Dijkstra but you can estimate distance to goal.',
  'Optimality matters and negative edges are not involved.',
  'You can afford extra memory for the open set and parent tracking.',
  'You want tunable behavior through heuristics or weights.',
]

const implementationNotes = [
  {
    title: 'Tie-breaking',
    detail:
      'When f ties, prefer larger g to reduce zig-zag in grid maps.',
  },
  {
    title: 'Decrease-key workaround',
    detail:
      'If the heap lacks decrease-key, push duplicates and ignore stale entries.',
  },
  {
    title: 'Heuristic scaling',
    detail:
      'Weighted A* uses f = g + w*h. Pick w carefully to bound suboptimality.',
  },
  {
    title: 'Grid heuristics',
    detail:
      'Manhattan for 4-way, octile for 8-way, Euclidean for continuous movement.',
  },
]

const advancedInsights = [
  {
    title: 'Heuristic design matters most',
    detail:
      'A* performance lives or dies by h. Domain-specific heuristics or landmark-based estimates can cut expansions by orders of magnitude.',
  },
  {
    title: 'Consistency avoids re-openings',
    detail:
      'If h is consistent, once a node is closed it never needs revisiting. This simplifies implementation and boosts speed.',
  },
  {
    title: 'Hybrid with preprocessing',
    detail:
      'Combining A* with contraction hierarchies or hierarchical grids yields fast paths on huge graphs.',
  },
  {
    title: 'Tie-breaking strategies',
    detail:
      'When f scores tie, breaking by larger g can reduce path zig-zagging and improve performance in grids.',
  },
]

const variants = [
  {
    variant: 'A* with consistent heuristic',
    guarantee: 'Optimal and no node re-expansions',
    tradeoff: 'Requires careful heuristic design',
  },
  {
    variant: 'Weighted A*',
    guarantee: 'Bounded suboptimality (if w is fixed)',
    tradeoff: 'Faster but not always optimal',
  },
  {
    variant: 'IDA*',
    guarantee: 'Optimal with admissible h',
    tradeoff: 'Lower memory, more re-expansions',
  },
]

const takeaways = [
  'A* blends exact cost so far with heuristic guidance toward the goal.',
  'Admissible heuristics guarantee optimality; consistent heuristics simplify the algorithm.',
  'Performance scales with heuristic quality and open set size.',
  'Weighted A* trades optimality for speed when real-time response is required.',
  'A* is the default for shortest path in many practical domains.',
]

const variantTable = [
  {
    variant: 'A*',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Optimal with admissible heuristic',
    useCase: 'General pathfinding with good heuristics',
  },
  {
    variant: 'Weighted A*',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Bounded suboptimality',
    useCase: 'Real-time pathfinding where speed is critical',
  },
  {
    variant: 'Dijkstra (h = 0)',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Optimal without heuristic',
    useCase: 'Baseline shortest path when no heuristic exists',
  },
]

export default function AStarSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">A-Star Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Heuristic-guided shortest paths that stay optimal</div>
              <p className="win95-text">
                A* Search finds the shortest path by combining the cost already traveled with a heuristic estimate of the cost
                remaining. When the heuristic is admissible, it is both fast and optimal, making it the go-to algorithm for
                routing, games, robotics, and puzzle solving.
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
                A* sits between Dijkstra and greedy best-first search. Dijkstra explores in all directions with guaranteed
                optimality; greedy search rushes toward the goal but can miss the best path. A* mixes both: g(n) measures the
                path cost so far, while h(n) estimates the remaining cost. The sum f(n) guides the search to explore the most
                promising nodes first without sacrificing optimality.
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
            <legend>Heuristic rules of thumb</legend>
            <div className="win95-grid win95-grid-2">
              {heuristicRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                A heuristic that is optimistic but informative is the sweet spot. Overestimation speeds the search but risks
                missing the true shortest path.
              </p>
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
                If h is admissible and consistent, A* expands nodes in nondecreasing optimal path cost. That is why the first
                expansion of the goal yields the shortest path.
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
                A* trades memory for speed. It can be dramatically faster than Dijkstra, but it requires storing the frontier
                and heuristic metadata.
              </p>
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
            <legend>Variants and extensions</legend>
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
                  {variants.map((row) => (
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

