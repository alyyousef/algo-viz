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

const historicalMilestones = [
  {
    title: 'Tarjan, Kosaraju, and the SCC toolkit (1970s)',
    detail:
      "Multiple linear-time SCC algorithms emerged: Kosaraju's two-pass DFS, Tarjan's one-pass low-link method, and later Gabow's stack-based approach. Together they cemented SCCs as a core graph primitive.",
  },
  {
    title: 'Cut/condense insight',
    detail:
      "Viewing SCCs as nodes of a DAG (the condensation graph) clarified why finishing times from one pass order SCCs for the next. This perspective underpins Kosaraju's correctness proof.",
  },
  {
    title: 'SCCs in compilers and systems',
    detail:
      'Dependency analysis, dead code elimination, circuit timing, and package managers all adopted SCC decompositions to collapse cycles into single units for scheduling and optimization.',
  },
]

const mentalModels = [
  {
    title: 'Finish order as a topological hint',
    detail:
      'A DFS finishing stack orders SCCs reverse-topologically: if there is a path from A to B in the condensation DAG, B finishes before A. Processing in that order on the reversed graph peels SCCs cleanly.',
  },
  {
    title: 'Turn sinks into sources',
    detail:
      'Reversing edges converts sink SCCs into sources. Starting DFS from the latest finisher ensures you expand exactly one SCC before any incoming edges can pull you elsewhere.',
  },
  {
    title: 'Two mirrors of the same walk',
    detail:
      'Pass one paints a map of where you can finish; pass two follows the mirrors of those paths, revealing mutually reachable groups.',
  },
]

const mechanics = [
  {
    heading: 'Pass 1: finishing order on G',
    bullets: [
      'Run DFS over all vertices; on exit, push the vertex onto a stack/list.',
      'Finishing order ensures that edges in the condensation DAG point from later to earlier finishes.',
    ],
  },
  {
    heading: 'Pass 2: discovery on G^T',
    bullets: [
      'Traverse the reversed graph. Pop vertices from the finish stack.',
      'For each unvisited vertex popped, run DFS/BFS on G^T to collect one SCC.',
      'Because sinks became sources, each search stays within a single SCC.',
    ],
  },
  {
    heading: 'Outputs',
    bullets: [
      'List of SCCs (each a vertex set).',
      'Optional condensation DAG by contracting SCCs and adding edges between components.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(V + E): two graph traversals. Sorting is not needed; the stack order emerges from DFS finishes.',
  },
  {
    title: 'Space',
    detail:
      'O(V + E) to store the graph; O(V) for visited flags and the finish stack. A reversed adjacency list may double storage unless generated on the fly.',
  },
  {
    title: 'Iterative robustness',
    detail:
      'Recursive DFS can overflow on deep graphs. Iterative stacks keep the same complexity with better safety in production code.',
  },
]

const realWorldUses = [
  {
    context: 'Package and build systems',
    detail:
      'Collapse dependency cycles into single nodes to schedule builds or updates. Many build tools and package managers run SCC detection to break strongly connected dependency chains.',
  },
  {
    context: 'Program analysis and compilers',
    detail:
      'SCCs enable strongly connected region scheduling, dead code elimination, and identifying loops in control-flow graphs.',
  },
  {
    context: 'Model checking and games',
    detail:
      'Closed sets of states (attractors, recurrent classes) are SCCs. Finding them is central to reachability, liveness, and parity-game solvers.',
  },
  {
    context: 'Clustering on directed data',
    detail:
      'In web graphs or citation networks, SCCs reveal tightly knit communities of mutual reachability.',
  },
]

const examples = [
  {
    title: "Kosaraju's algorithm (iterative-friendly pseudocode)",
    code: `function kosaraju(graph):
    order = []
    visited = set()

    # pass 1: record finish order
    for u in graph.vertices():
        if u not in visited:
            iterative_dfs_finish(graph, u, visited, order)

    visited.clear()
    sccs = []
    for u in reversed(order):
        if u not in visited:
            comp = []
            iterative_dfs_collect(graph.rev(), u, visited, comp)
            sccs.append(comp)
    return sccs

function iterative_dfs_finish(g, start, visited, order):
    stack = [(start, 0)]  # (node, next_index)
    visited.add(start)
    while stack:
        u, idx = stack.pop()
        if idx < len(g.neighbors(u)):
            v = g.neighbors(u)[idx]
            stack.append((u, idx + 1))
            if v not in visited:
                visited.add(v)
                stack.append((v, 0))
        else:
            order.append(u)  # finished

function iterative_dfs_collect(g_rev, start, visited, comp):
    stack = [start]
    visited.add(start)
    while stack:
        u = stack.pop()
        comp.append(u)
        for v in g_rev.neighbors(u):
            if v not in visited:
                visited.add(v)
                stack.append(v)`,
    explanation:
      'Finishing order from the first pass provides a reverse topological ordering of SCCs. Iterative DFS avoids recursion limits while preserving O(V + E) cost.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges in pass 2; using the original graph yields incorrect SCC grouping.',
  'Stack overflow from recursive DFS on large graphs; use iterative versions in production.',
  'Materializing the reversed graph can double memory; consider on-the-fly reverse adjacency iteration.',
  'Assuming uniqueness: multiple valid SCC orders exist; determinism may need vertex-id tie-breaks.',
]

const decisionGuidance = [
  'Need simple, linear-time SCCs and can afford two passes: use Kosaraju.',
  "Need single-pass SCCs or memory tightness: use Tarjan's algorithm.",
  'Graph is extremely deep or large: prefer iterative DFS to avoid recursion limits.',
  'Streaming edges sorted by tail/head: consider on-the-fly reverse iteration to avoid building g^T fully.',
]

const advancedInsights = [
  {
    title: 'Condensation DAG ordering',
    detail:
      'Finishing times produce a reverse topological order of the condensation graph. This is why processing in that order on g^T isolates SCCs.',
  },
  {
    title: 'Comparison to Tarjan',
    detail:
      'Tarjan computes low-link values in one pass with one stack. Kosaraju splits work into two clean passes; both are O(V + E), but Tarjan saves the reverse graph cost.',
  },
  {
    title: 'Edge-reversal shortcuts',
    detail:
      'If the graph stores in-edges alongside out-edges, pass 2 can iterate in-edges directly, avoiding explicit reversal and halving memory.',
  },
  {
    title: 'Parallel opportunities',
    detail:
      'Parallelization is tricky because pass 2 depends on pass 1 ordering, but building the reverse graph and the first DFS can be parallelized in preprocessing.',
  },
]

const takeaways = [
  "Kosaraju runs two DFS passes: finish order on G, discovery on G^T, to output SCCs in linear time.",
  'Union-Find is not needed; correctness rests on finish ordering and edge reversal.',
  'Iterative DFS avoids recursion issues; implicit reversal saves memory.',
  'Pick Tarjan for one-pass tightness, Kosaraju for clarity, and Gabow for another stack-based alternative.',
]

export default function KosarajusAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Kosaraju's Algorithm</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Two DFS passes to expose strongly connected components</div>
              <p className="win95-text">
                Kosaraju's algorithm finds strongly connected components with two DFS passes. The first records finishing order on the
                original graph; the second, on the reversed graph, peels components in reverse topological order of the condensation DAG.
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
                SCCs collapse a directed graph into a DAG. Kosaraju achieves this in O(V + E): one DFS to capture finishing order, and a
                second on the reversed graph to collect components. Sink components become sources after reversal, ensuring each search
                stays inside one SCC.
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
            <legend>How it works</legend>
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
            <legend>Complexity analysis</legend>
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
            <legend>Practical example</legend>
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
