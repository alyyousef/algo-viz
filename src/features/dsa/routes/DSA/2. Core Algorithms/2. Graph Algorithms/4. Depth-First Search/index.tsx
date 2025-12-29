import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Mark node as visited; record entry time.',
      'For each neighbor: if unvisited, recurse/push; otherwise classify edge as back/forward/cross as needed.',
      'On return, record exit time; push to a finishing stack if building a topo order or SCC meta-graph.',
    ],
  },
  {
    heading: 'Iterative vs. recursive',
    bullets: [
      'Recursive DFS is concise but risks stack overflow on very deep graphs.',
      'Iterative DFS uses an explicit stack; push children manually to control order and avoid recursion limits.',
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
]

const pitfalls = [
  'Recursion depth overflow on large/deep graphs; switch to iterative.',
  'Forgetting to mark visited before recursion can cause exponential blowup on cyclic graphs.',
  'Assuming DFS finds shortest paths in edge count - it does not; use BFS for that.',
  'Using DFS finishing order as topo sort on graphs with cycles yields invalid orders; detect cycles first.',
]

const decisionGuidance = [
  'Need reachability, component labeling, or ordering tasks: use DFS.',
  'Need shortest hop paths: prefer BFS.',
  'Need weighted shortest paths: use Dijkstra or Bellman-Ford.',
  'Need SCCs, articulation points, bridges, or topo sort: DFS variants are the backbone.',
]

const takeaways = [
  'DFS dives deep, using a stack to remember the path; it runs in O(V + E) and excels at structural graph questions.',
  'Edge classifications and finishing times turn DFS into a multipurpose tool: topo sorts, SCCs, bridges, cycles.',
  'Control recursion depth with an explicit stack on large or adversarial inputs.',
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
