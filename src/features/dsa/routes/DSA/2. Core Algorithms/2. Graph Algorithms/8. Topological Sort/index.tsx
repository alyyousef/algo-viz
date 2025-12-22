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
    title: 'Dependency layering',
    detail:
      'Every edge u -> v says u must appear before v. Topological ordering is a schedule that respects all such prerequisites.',
  },
  {
    title: 'Peeling zero indegree',
    detail:
      'Nodes with no unmet prerequisites can be output now; remove them and repeat to peel layers of readiness.',
  },
  {
    title: 'DFS finishing order',
    detail:
      'In a DAG, reversing DFS finishing times gives a valid topological order because children finish before parents in the directed sense.',
  },
]

const mechanics = [
  {
    heading: "Kahn's algorithm (BFS style)",
    bullets: [
      'Compute indegree for every node; enqueue nodes with indegree 0.',
      'Pop from queue, append to order, decrement indegree of outgoing neighbors; enqueue any that drop to 0.',
      'If processed count < V at the end, a cycle exists.',
    ],
  },
  {
    heading: 'DFS finishing order',
    bullets: [
      'Run DFS; on exit from a node, push it onto a stack.',
      'After traversal, reverse the stack (or pop) to produce a topo order.',
      'If a back edge is found during DFS, the graph has a cycle and no topo order exists.',
    ],
  },
  {
    heading: 'Cycle detection',
    bullets: [
      'Kahn: leftover nodes (indegree > 0) imply a cycle.',
      'DFS: encountering a gray (in-progress) node indicates a back edge (cycle).',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Both Kahn and DFS-based methods run in O(V + E) time with O(V) space for indegree or stacks and visited state.',
  },
  {
    title: 'Ordering differences',
    detail:
      'Multiple valid orders exist; queue/stack ordering and neighbor order affect which one you see.',
  },
]

const realWorldUses = [
  {
    context: 'Build systems and CI',
    detail:
      'Order compilation or deployment steps based on dependency graphs (packages, modules, tasks).',
  },
  {
    context: 'Course scheduling',
    detail:
      'Lay out courses respecting prerequisites to find a valid term-by-term plan or detect impossibility.',
  },
  {
    context: 'Data pipelines',
    detail:
      'Schedule ETL stages so that inputs are ready before dependent transformations run.',
  },
  {
    context: 'Game logic and rendering',
    detail:
      'Resolve update/render order for scene graphs or systems with directional constraints.',
  },
]

const examples = [
  {
    title: "Kahn's algorithm",
    code: `function topoKahn(graph):
    indeg = { v: 0 for v in graph.vertices() }
    for u in graph.vertices():
        for v in graph.neighbors(u):
            indeg[v] += 1
    queue = [v for v in graph.vertices() if indeg[v] == 0]
    order = []

    while queue:
        u = queue.pop(0)  // use deque in practice
        order.append(u)
        for v in graph.neighbors(u):
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    if len(order) != graph.size():
        throw CycleDetected
    return order`,
    explanation:
      'Zero-indegree nodes are ready to output; removing them uncovers the next layer. Leftovers imply a cycle.',
  },
  {
    title: 'DFS-based topo sort',
    code: `function topoDFS(graph):
    visited = set()
    onstack = set()
    order = []

    function dfs(u):
        visited.add(u)
        onstack.add(u)
        for v in graph.neighbors(u):
            if v in onstack:
                throw CycleDetected
            if v not in visited:
                dfs(v)
        onstack.remove(u)
        order.append(u)

    for u in graph.vertices():
        if u not in visited:
            dfs(u)

    order.reverse()
    return order`,
    explanation:
      'Finishing times reversed yield a valid order. On-stack detection catches cycles early.',
  },
]

const pitfalls = [
  'Applying topo sort to graphs with cycles will fail; detect and report cycles.',
  'Using a normal queue instead of deque for Kahn can be slow in some languages.',
  'Forgetting to reverse the DFS finishing list yields an order that violates prerequisites.',
  'Not resetting or separating visitation state between components can miss nodes.',
]

const decisionGuidance = [
  "Need explicit cycle detection plus order: Kahn's algorithm is straightforward.",
  'Already running DFS for other tasks: reuse finishing times for ordering and cycle detection.',
  'Need stable or deterministic orders: control neighbor iteration and queue/stack policy.',
]

const takeaways = [
  'Topological sort orders DAG nodes so every edge points forward; it is impossible when cycles exist.',
  'Kahn peels zero-indegree layers; DFS reverses finishing times - both run in linear time.',
  'Cycle detection is integral: leftover indegree or back edges signal failure to order.',
]

export default function TopologicalSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Topological Sort</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Scheduling a DAG without breaking dependencies</div>
              <p className="win95-text">
                Topological sorting produces an ordering of directed acyclic graph nodes where every prerequisite precedes its
                dependents. Kahn's queue-based peeling and DFS finishing-order reversal both deliver linear-time solutions with
                built-in cycle detection.
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
                Many workflows are DAGs: builds, courses, pipelines. A topo order is any valid schedule. If no order exists, you have a
                cycle to break before progress can continue.
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
