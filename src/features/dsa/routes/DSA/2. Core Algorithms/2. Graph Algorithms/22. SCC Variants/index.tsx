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
    title: 'SCCs formalized in graph theory',
    detail:
      'Strong connectivity became a core concept for directed graphs, defining regions of mutual reachability.',
  },
  {
    title: 'Multiple linear-time algorithms (1970s)',
    detail:
      'Kosaraju, Tarjan, and Gabow independently provided O(V + E) SCC algorithms with different traversal styles.',
  },
  {
    title: 'SCCs in compilers and solvers',
    detail:
      'Dependency cycles, control-flow loops, and implication graphs turned SCCs into a standard preprocessing step.',
  },
  {
    title: 'Large-scale SCC tooling',
    detail:
      'Modern systems use iterative and cache-aware SCC variants to process billion-edge graphs efficiently.',
  },
]

const mentalModels = [
  {
    title: 'Islands in a one-way sea',
    detail:
      'An SCC is a strongly connected island. You can reach any node inside, but travel between islands is one-way.',
  },
  {
    title: 'Collapse cycles into nodes',
    detail:
      'Replace each SCC with a single node to get a DAG. This reveals global structure clearly.',
  },
  {
    title: 'Two-phase peeling',
    detail:
      'Some variants first identify a promising root (by finishing time or stack rules), then peel off its SCC.',
  },
]

const variantCatalog = [
  {
    title: 'Kosaraju (two-pass)',
    detail:
      'Run DFS to compute finishing order, reverse the graph, then DFS in reverse finishing order to extract SCCs.',
  },
  {
    title: 'Tarjan (lowlink)',
    detail:
      'Single DFS with a stack. lowlink identifies SCC roots, popping nodes to emit components.',
  },
  {
    title: 'Gabow (path-based)',
    detail:
      'Uses two stacks to track roots and paths. Avoids explicit lowlink and performs well in practice.',
  },
  {
    title: 'Iterative DFS variants',
    detail:
      'Replace recursion with explicit stacks to avoid call depth limits on large graphs.',
  },
  {
    title: 'Forward-backward',
    detail:
      'Pick a pivot, compute forward and backward reachability to extract an SCC, repeat on remaining nodes.',
  },
  {
    title: 'Offline SCC with condensation',
    detail:
      'After SCC extraction, build the condensation DAG to support topo scheduling or reachability queries.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Kosaraju, Tarjan, and Gabow run in O(V + E). Forward-backward is also linear on average but depends on reachability costs.',
  },
  {
    title: 'Space cost',
    detail:
      'All variants are O(V + E) due to adjacency storage. Tarjan and Gabow add O(V) stack data.',
  },
  {
    title: 'Practical constants',
    detail:
      'Tarjan has a compact single pass, Kosaraju is simple but needs the reversed graph. Gabow often has small constants.',
  },
  {
    title: 'Recursion limits',
    detail:
      'Deep graphs can overflow recursion. Iterative variants or manual stacks avoid this.',
  },
]

const realWorldUses = [
  {
    context: '2-SAT solvers',
    detail:
      'SCCs on implication graphs detect contradictions and derive assignments by component ordering.',
  },
  {
    context: 'Deadlock detection',
    detail:
      'Wait-for graphs use SCCs to find cycles that represent deadlocks.',
  },
  {
    context: 'Dependency management',
    detail:
      'Package managers collapse mutual dependencies to schedule builds or updates safely.',
  },
  {
    context: 'Control-flow analysis',
    detail:
      'Compilers identify loops, recursion, and fixed points by SCC decomposition.',
  },
  {
    context: 'Web and social graphs',
    detail:
      'Strongly connected communities reveal tightly linked subgraphs for analysis and ranking.',
  },
  {
    context: 'Model checking',
    detail:
      'SCCs find recurrent states in automata and temporal logic verification.',
  },
]

const examples = [
  {
    title: 'Kosaraju core steps',
    code: `order = []
visited = set()
for v in V:
    if v not visited: dfs1(v) // push to order on exit

GT = reverse(G)
visited.clear()
for v in reverse(order):
    if v not visited:
        comp = dfs2(GT, v)
        sccs.append(comp)`,
    explanation:
      'First pass records finishing order. Second pass on the reversed graph peels SCCs in reverse topological order.',
  },
  {
    title: 'Tarjan lowlink skeleton',
    code: `dfs(v):
    index[v] = low[v] = timer++
    push v onto stack
    for each w in adj[v]:
        if index[w] is unset:
            dfs(w)
            low[v] = min(low[v], low[w])
        else if w in stack:
            low[v] = min(low[v], index[w])
    if low[v] == index[v]:
        pop until v to form one SCC`,
    explanation:
      'lowlink tracks the earliest reachable ancestor on the stack. When low equals index, v is an SCC root.',
  },
  {
    title: 'Gabow path-based idea',
    code: `dfs(v):
    pre[v] = timer++
    push v on stack S and stack P
    for w in adj[v]:
        if pre[w] not set: dfs(w)
        else if w on stack S:
            while pre[P.top] > pre[w]:
                P.pop()
    if P.top == v:
        P.pop()
        pop from S until v to form SCC`,
    explanation:
      'Two stacks track potential roots without explicit lowlink values.',
  },
  {
    title: 'Condensation DAG',
    code: `for each edge (u, v):
    if sccId[u] != sccId[v]:
        add edge sccId[u] -> sccId[v]`,
    explanation:
      'SCCs collapse cycles into nodes. The resulting condensation graph is always a DAG.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges for Kosaraju pass two.',
  'Not marking stack membership in Tarjan, causing lowlink to leak across SCCs.',
  'Using recursion on deep graphs without stack safeguards.',
  'Assuming SCCs are topologically sorted by discovery order.',
  'Treating SCCs like undirected components; direction matters.',
]

const decisionGuidance = [
  'Need the simplest linear-time SCCs: use Kosaraju.',
  'Need single-pass SCCs with tight memory: use Tarjan.',
  'Need an alternative with small constants: use Gabow.',
  'Need to avoid recursion depth issues: choose iterative DFS variants.',
  'Need condensation DAG for scheduling or reachability: build after SCCs.',
]

const advancedInsights = [
  {
    title: 'Iterative Kosaraju on large graphs',
    detail:
      'Use explicit stacks for DFS to avoid recursion and store finishing order without call stack limits.',
  },
  {
    title: 'Forward-backward SCC extraction',
    detail:
      'Pick a pivot, intersect forward and backward reachability to extract one SCC, then recurse on the remainder.',
  },
  {
    title: 'SCCs plus topo order',
    detail:
      'Condensation DAG ordering gives a clean schedule for downstream algorithms, from DP to constraint solving.',
  },
  {
    title: 'Memory-aware reversal',
    detail:
      'If reversing the graph is expensive, Tarjan or Gabow avoid storing G^T explicitly.',
  },
]

const takeaways = [
  'All classic SCC variants run in linear time but differ in style and memory needs.',
  'Kosaraju is the easiest to explain, Tarjan is the compact single-pass workhorse.',
  'Gabow is a strong practical alternative with a different stack discipline.',
  'Iterative variants are safer on huge graphs.',
  'SCCs are the gateway to condensation DAGs and cycle-aware reasoning.',
]

export default function SCCVariantsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">SCC Variants</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Tarjan, Kosaraju, Gabow, and modern SCC workflows</div>
              <p className="win95-text">
                Strongly connected components can be computed in multiple linear-time ways. Each variant trades memory,
                traversal style, and implementation complexity. This page compares the major SCC algorithms and the
                practical patterns built on top of them.
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
                SCC algorithms decompose a directed graph into maximal sets of mutual reachability. Once SCCs are known,
                the condensation graph is a DAG, enabling topological processing, cycle breaking, and dependency analysis.
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
            <legend>Variant catalog</legend>
            <div className="win95-grid win95-grid-3">
              {variantCatalog.map((item) => (
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
                Kosaraju is the simplest but needs the reversed graph. Tarjan is single pass and memory-light. Gabow
                avoids lowlink bookkeeping with a different stack discipline.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operation summary</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Passes</th>
                    <th>Extra storage</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kosaraju</td>
                    <td>2 DFS</td>
                    <td>Reversed graph</td>
                    <td>Simple, great for teaching and correctness.</td>
                  </tr>
                  <tr>
                    <td>Tarjan</td>
                    <td>1 DFS</td>
                    <td>Stack + arrays</td>
                    <td>Lowlink based, compact and fast.</td>
                  </tr>
                  <tr>
                    <td>Gabow</td>
                    <td>1 DFS</td>
                    <td>Two stacks</td>
                    <td>Path-based, avoids lowlink.</td>
                  </tr>
                  <tr>
                    <td>Forward-backward</td>
                    <td>Multiple reach</td>
                    <td>Reachability sets</td>
                    <td>Practical for huge graphs with pruning.</td>
                  </tr>
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
