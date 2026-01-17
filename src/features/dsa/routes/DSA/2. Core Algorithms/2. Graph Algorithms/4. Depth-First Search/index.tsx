import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Trémaux tree origins (19th century)',
    detail:
      'Early maze-solving strategies used depth-first exploration, later formalized as traversal trees for graphs.',
  },
  {
    title: 'Hopcroft-Tarjan DFS era (1970s)',
    detail:
      'Depth-first traversal enabled linear-time algorithms for SCCs, bridges, articulation points, and planarity testing.',
  },
  {
    title: 'Algorithmic tool of choice in textbooks',
    detail:
      'DFS became the canonical way to build discovery/finish times, edge classification, and topological ordering.',
  },
]

const mentalModels = [
  {
    title: 'Hand on the wall',
    detail:
      'Like walking a maze with one hand on the wall, DFS keeps pushing forward until it cannot, then backtracks to the last junction.',
  },
  {
    title: 'Call stack explorer',
    detail:
      'Recursion or an explicit stack records the return path. Each push dives deeper; each pop returns to an unfinished branch.',
  },
  {
    title: 'Time stamps',
    detail:
      'Entry and exit times give a natural ordering of edges: tree, back, forward, and cross, which power cycle detection and topological sorting.',
  },
  {
    title: 'Backtracking search',
    detail:
      'DFS explores a choice, commits, and backtracks on failure. This is the backbone of combinatorial search and constraint solving.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Mark node as visited; record entry time (discovery).',
      'For each neighbor: if unvisited, recurse/push; otherwise classify edge as back/forward/cross as needed.',
      'On return, record exit time; push to a finishing stack if building a topo order or SCC meta-graph.',
    ],
  },
  {
    heading: 'Iterative vs. recursive',
    bullets: [
      'Recursive DFS is concise but risks stack overflow on very deep graphs.',
      'Iterative DFS uses an explicit stack; push children manually to control order and avoid recursion limits.',
      'If you need entry/exit times iteratively, store a (node, state) pair to simulate recursion.',
    ],
  },
  {
    heading: 'Classification and utilities',
    bullets: [
      'Back edge to an ancestor signals a cycle in directed graphs.',
      'Finishing times reversed yield a topological order in DAGs.',
      'Edge types feed articulation point and bridge detection via low-link values.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Reachability and components',
    detail:
      'DFS finds all nodes in the same component; repeating DFS yields connected components.',
  },
  {
    title: 'Ordering problems',
    detail:
      'Topological ordering and dependency resolution use DFS finish times.',
  },
  {
    title: 'Cycle detection',
    detail:
      'Back edges in directed graphs indicate cycles quickly and cleanly.',
  },
  {
    title: 'Structural graph insights',
    detail:
      'Low-link values reveal bridges and articulation points in networks.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'DFS does not minimize hops or weights; use BFS or Dijkstra instead.',
  },
]

const loopInvariants = [
  {
    title: 'Stack path invariant',
    detail:
      'The recursion stack (or explicit stack) always represents a simple path from the start to the current node.',
  },
  {
    title: 'Discovery invariant',
    detail:
      'Once a node is marked visited, it will never be re-entered; all edges are processed exactly once from that node.',
  },
  {
    title: 'Finish-time invariant',
    detail:
      'A node finishes after all nodes in its DFS subtree have finished.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Graph: A-B, A-C, B-D, C-E; start = A',
    note: 'Push A, mark visited, record entry time.',
  },
  {
    step: 'Dive',
    state: 'A -> B -> D (dead end)',
    note: 'Backtrack after D has no unvisited neighbors.',
  },
  {
    step: 'Backtrack',
    state: 'Return to B, then A; next neighbor is C',
    note: 'DFS resumes at the last unfinished branch.',
  },
  {
    step: 'Finish',
    state: 'Visit C -> E, then unwind to finish all nodes',
    note: 'Finish times reflect subtree completion order.',
  },
]

const complexityNotes = [
  {
    title: 'Work and space',
    detail:
      'O(V + E) time with adjacency lists; O(V) memory for visited plus recursion/stack depth proportional to path length.',
  },
  {
    title: 'Ordering effects',
    detail:
      'Neighbor order changes traversal order but not complexity; it can matter for tie-breaking in applications like maze generation.',
  },
  {
    title: 'Sparse vs. dense',
    detail:
      'Adjacency lists keep DFS linear. Adjacency matrices push work toward O(V^2) regardless of E.',
  },
]

const inputSensitivity = [
  {
    title: 'Deep graphs',
    detail:
      'Very deep paths can overflow recursion stacks; iterative DFS avoids this.',
  },
  {
    title: 'High branching',
    detail:
      'DFS does not blow up memory like BFS, but it may explore irrelevant branches deeply.',
  },
  {
    title: 'Graph cycles',
    detail:
      'Visited marking prevents infinite loops; forgetting it causes exponential blowups.',
  },
  {
    title: 'Neighbor order',
    detail:
      'Traversal sequence depends on neighbor ordering, affecting deterministic outputs.',
  },
]

const performanceProfile = [
  {
    title: 'Memory footprint',
    detail:
      'Stores only the current path and visited set, making it memory-light compared to BFS.',
  },
  {
    title: 'Stack depth',
    detail:
      'Worst-case depth is V on a chain; choose iterative DFS if recursion limits are tight.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Linear neighbor scans are cache-friendly, but recursion may bounce between adjacency lists.',
  },
  {
    title: 'Early exits',
    detail:
      'When searching for a target, DFS can return as soon as it is found, which is useful when solutions are deep.',
  },
]

const comparisonTable = [
  {
    algorithm: 'DFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Structure, ordering',
    notes: 'Great for topo order, SCCs, and bridges.',
  },
  {
    algorithm: 'BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Shortest hops',
    notes: 'Layered expansion yields shortest unweighted paths.',
  },
  {
    algorithm: 'Dijkstra',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    bestFor: 'Weighted shortest paths',
    notes: 'Requires non-negative weights.',
  },
  {
    algorithm: 'IDDFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Deep solutions with memory limits',
    notes: 'Iterative deepening combines DFS space with BFS depth guarantees.',
  },
]

const realWorldUses = [
  {
    context: 'Topological sorting and cycle detection',
    detail:
      'DFS finishing times produce topo orders for DAGs and quickly expose back edges (cycles) in dependency graphs.',
  },
  {
    context: 'Strongly connected components',
    detail:
      'Kosaraju and Tarjan both rely on DFS passes to group vertices with mutual reachability.',
  },
  {
    context: 'Bridge and articulation points',
    detail:
      'Low-link DFS computes critical edges and nodes in networks (e.g., connectivity resilience).',
  },
  {
    context: 'Puzzle and state search',
    detail:
      'Depth-first backtracking drives Sudoku solvers, N-queens, and DFS-based SAT/constraint searches.',
  },
  {
    context: 'Compiler analysis',
    detail:
      'Control-flow and call-graph traversals rely on DFS ordering to find loops and dominance relations.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Iterative deepening DFS (IDDFS)',
    detail:
      'Run DFS with depth limits 0,1,2,... to get BFS-like depth guarantees with DFS memory usage.',
  },
  {
    title: 'Color marking',
    detail:
      'Use white/gray/black states to classify edges and detect cycles in directed graphs.',
  },
  {
    title: 'Tarjan low-link',
    detail:
      'Augment DFS with low-link values to extract SCCs, bridges, and articulation points.',
  },
  {
    title: 'Graph pruning',
    detail:
      'Stop exploring branches that violate constraints to accelerate backtracking search.',
  },
]

const examples = [
  {
    title: 'Iterative DFS',
    code: `function dfsIterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                stack.push(neighbor)
    return visited`,
    explanation:
      'Explicit stack avoids recursion depth limits and allows custom neighbor ordering (e.g., reverse to mimic recursive order).',
  },
  {
    title: 'Recursive DFS with finishing order',
    code: `function dfs(node):
    visited.add(node)
    for neigh in graph.neighbors(node):
        if neigh not in visited:
            dfs(neigh)
    finish.append(node)`,
    explanation:
      'Appending on exit records finishing order. Reversing finish yields a topological sort in DAGs.',
  },
  {
    title: 'DFS with colors for cycle detection',
    code: `function dfsCycle(u):
    color[u] = 'gray'
    for v in graph.neighbors(u):
        if color[v] == 'gray':
            return true // back edge
        if color[v] == 'white' and dfsCycle(v):
            return true
    color[u] = 'black'
    return false`,
    explanation:
      'Gray-to-gray edges indicate cycles in directed graphs; black nodes are fully explored.',
  },
  {
    title: 'Iterative DFS with entry/exit times',
    code: `function dfsTimes(start):
    stack = [(start, 'enter')]
    while stack:
        (node, state) = stack.pop()
        if state == 'enter':
            if node in visited: continue
            visited.add(node)
            entry[node] = timer++
            stack.push((node, 'exit'))
            for neigh in reverse(graph.neighbors(node)):
                if neigh not in visited:
                    stack.push((neigh, 'enter'))
        else:
            exit[node] = timer++`,
    explanation:
      'The explicit enter/exit states simulate recursion and give timestamps without risking stack overflow.',
  },
]

const pitfalls = [
  'Recursion depth overflow on large/deep graphs; switch to iterative.',
  'Forgetting to mark visited before recursion can cause exponential blowup on cyclic graphs.',
  'Assuming DFS finds shortest paths in edge count - it does not; use BFS for that.',
  'Using DFS finishing order as topo sort on graphs with cycles yields invalid orders; detect cycles first.',
  'Neighbor ordering affects output; tests should be robust to different but valid DFS traversals.',
]

const decisionGuidance = [
  'Need reachability, component labeling, or ordering tasks: use DFS.',
  'Need shortest hop paths: prefer BFS.',
  'Need weighted shortest paths: use Dijkstra or Bellman-Ford.',
  'Need SCCs, articulation points, bridges, or topo sort: DFS variants are the backbone.',
  'Need memory efficiency and can tolerate deep exploration: DFS is a strong default.',
]

const implementationTips = [
  {
    title: 'Mark on entry',
    detail:
      'Record visited as soon as you first see a node to prevent cycles.',
  },
  {
    title: 'Avoid recursion limits',
    detail:
      'Use an explicit stack for very deep or adversarial graphs.',
  },
  {
    title: 'Track timestamps',
    detail:
      'Entry/exit times enable edge classification and topological ordering.',
  },
  {
    title: 'Control neighbor order',
    detail:
      'If deterministic output matters, sort neighbors or push in reverse order.',
  },
  {
    title: 'Guard against disconnected graphs',
    detail:
      'Loop over all nodes to cover every component, not just the start node.',
  },
]

const advancedInsights = [
  {
    title: 'Low-link values',
    detail:
      'Tarjan-style DFS tracks the lowest reachable ancestor, enabling bridges, articulation points, and SCCs in linear time.',
  },
  {
    title: 'DFS tree structure',
    detail:
      'Tree edges define a DFS forest; back edges indicate cycles; forward/cross edges clarify reachability in directed graphs.',
  },
  {
    title: 'Iterative deepening',
    detail:
      'IDDFS blends DFS memory usage with BFS depth guarantees, useful in game trees and AI search.',
  },
  {
    title: 'Planarity testing',
    detail:
      'Linear-time planarity algorithms use DFS to build embedding constraints and detect crossings.',
  },
  {
    title: 'SCC condensation graphs',
    detail:
      'Compressing SCCs into a DAG reveals high-level structure and simplifies dependency analysis.',
  },
]

const takeaways = [
  'DFS dives deep, using a stack to remember the path; it runs in O(V + E) and excels at structural graph questions.',
  'Edge classifications and finishing times turn DFS into a multipurpose tool: topo sorts, SCCs, bridges, cycles.',
  'Control recursion depth with an explicit stack on large or adversarial inputs.',
  'References: Hopcroft-Tarjan, CLRS DFS chapter, and classic backtracking texts.',
]

export default function DepthFirstSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Depth-First Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking through the graph frontier</div>
              <p className="win95-text">
                Depth-first search explores by diving until it must backtrack. With O(V + E) work and a simple stack discipline, it
                powers topological sorts, cycle detection, articulation point finding, and SCC algorithms.
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
                DFS is the opposite of BFS: it commits to a branch until blocked, then rewinds. This behavior exposes ancestry
                relationships and finishing times that become the backbone of many graph analyses beyond mere reachability.
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
            <legend>Complexity analysis and intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
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
            <legend>Variants and extensions</legend>
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
