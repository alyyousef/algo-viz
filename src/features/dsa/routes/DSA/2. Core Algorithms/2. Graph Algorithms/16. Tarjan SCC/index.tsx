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
    title: 'Tarjan publishes the linear-time SCC algorithm (1972)',
    detail:
      'Robert Tarjan showed that strongly connected components can be found in one depth-first search using stack and lowlink values.',
  },
  {
    title: 'SCCs become a core graph primitive',
    detail:
      'Component condensation turns any directed graph into a DAG, enabling cycle detection and topological reasoning.',
  },
  {
    title: 'Compiler and program analysis adoption (1980s)',
    detail:
      'Control-flow graphs use SCCs to detect loops, recursion, and fixed points in dataflow analysis.',
  },
  {
    title: 'Modern large-scale graph analytics',
    detail:
      'Tarjan SCC remains a default for cycle structure in dependency graphs, social graphs, and knowledge graphs.',
  },
]

const mentalModels = [
  {
    title: 'Rubber bands and lowlink',
    detail:
      'Lowlink is the lowest discovery index reachable from a node by following edges and back edges. It snaps components together.',
  },
  {
    title: 'Stack as a live component',
    detail:
      'The stack holds the current DFS path plus any nodes that can still connect back. When a root is found, that segment pops off.',
  },
  {
    title: 'SCCs are islands of mutual reachability',
    detail:
      'Every node in an SCC can reach every other node. Outside edges only point forward to other components.',
  },
]

const coreMechanics = [
  {
    title: 'DFS with discovery index',
    detail:
      'Assign each node an index when first visited. This captures DFS order and anchors lowlink computation.',
  },
  {
    title: 'Lowlink propagation',
    detail:
      'Lowlink of a node is the minimum of its own index and the lowlinks of neighbors still on the stack.',
  },
  {
    title: 'Stack membership',
    detail:
      'Nodes are pushed when discovered and remain on the stack until their SCC is completed.',
  },
]

const keyStructures = [
  {
    title: 'Index counter',
    detail:
      'Monotonic counter that assigns discovery order to nodes during DFS.',
  },
  {
    title: 'Lowlink array',
    detail:
      'Stores the smallest index reachable from each node while staying within the current DFS stack.',
  },
  {
    title: 'Stack and onStack flag',
    detail:
      'Stack captures the active DFS region. The onStack flag guards which edges are eligible for lowlink updates.',
  },
  {
    title: 'Component list',
    detail:
      'When a root is found, pop nodes until the root to form one SCC.',
  },
]

const terminationRules = [
  {
    title: 'Root condition',
    detail:
      'If lowlink[v] == index[v], v is the root of an SCC. Pop until v to produce the component.',
  },
  {
    title: 'Full traversal',
    detail:
      'Run DFS from every unvisited node to cover disconnected graphs.',
  },
  {
    title: 'Directed edge handling',
    detail:
      'Only edges to nodes still on the stack affect lowlink; cross edges to finished nodes do not.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V + E) because each node and edge is processed once in the DFS.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V) for stacks, arrays, and recursion. The graph storage is O(V + E).',
  },
  {
    title: 'Recursion depth',
    detail:
      'Deep graphs can overflow recursion limits. Iterative DFS or tail recursion optimization may be required.',
  },
  {
    title: 'Component condensation',
    detail:
      'SCCs produce a DAG, which can be further processed with topological algorithms.',
  },
]

const realWorldUses = [
  {
    context: 'Dependency analysis',
    detail:
      'Package managers and build systems use SCCs to detect cycles and group mutually dependent modules.',
  },
  {
    context: 'Compiler optimization',
    detail:
      'Control-flow SCCs identify loops and recursion, guiding optimizations and fixed-point analyses.',
  },
  {
    context: '2-SAT solving',
    detail:
      'Implication graphs use SCCs to detect contradictions and to derive assignments.',
  },
  {
    context: 'Graph condensation',
    detail:
      'Condensing SCCs transforms a cyclic graph into a DAG for scheduling and reachability queries.',
  },
]

const examples = [
  {
    title: 'Tarjan SCC pseudocode',
    code: `global index = 0
stack = []

function strongConnect(v):
    index[v] = index
    lowlink[v] = index
    index += 1
    stack.push(v); onStack[v] = true

    for each w in adj[v]:
        if index[w] is undefined:
            strongConnect(w)
            lowlink[v] = min(lowlink[v], lowlink[w])
        else if onStack[w]:
            lowlink[v] = min(lowlink[v], index[w])

    if lowlink[v] == index[v]:
        component = []
        repeat:
            w = stack.pop()
            onStack[w] = false
            component.push(w)
        until w == v
        output component`,
    explanation:
      'The lowlink test detects the root of a component. Pop from the stack to emit the SCC in one shot.',
  },
  {
    title: 'Condensation graph idea',
    code: `// After finding SCCs:
// Each component becomes a node in a DAG.
// Add edges between components if any edge crosses SCCs.`,
    explanation:
      'Condensing SCCs removes cycles, enabling topological scheduling and reachability queries.',
  },
  {
    title: '2-SAT check',
    code: `// If x and not x are in the same SCC, unsatisfiable.
for each variable x:
    if scc(x) == scc(not x):
        return "unsat"`,
    explanation:
      'The SCC structure reveals contradictions in implication graphs.',
  },
]

const pitfalls = [
  'Updating lowlink with nodes that are not on the stack, which merges unrelated components.',
  'Forgetting to mark onStack when pushing or clearing when popping.',
  'Using index[w] instead of lowlink[w] after recursive calls.',
  'Skipping DFS starts for unvisited nodes in disconnected graphs.',
  'Stack overflow on deep graphs without an iterative DFS option.',
]

const decisionGuidance = [
  'You need strongly connected components in a directed graph.',
  'You want a linear-time algorithm with a single DFS pass.',
  'You need SCCs as a precursor for condensation or cycle analysis.',
  'You can manage recursion depth or implement iterative DFS.',
  'You want a standard, well-tested algorithm with clear invariants.',
]

const advancedInsights = [
  {
    title: 'Why lowlink works',
    detail:
      'Lowlink captures whether a node can reach an ancestor still on the stack. If not, that node is the root of an SCC.',
  },
  {
    title: 'Comparison to Kosaraju',
    detail:
      'Tarjan does it in one DFS with a stack, while Kosaraju runs two DFS passes and uses a transpose graph.',
  },
  {
    title: 'Iterative DFS variant',
    detail:
      'Replacing recursion with an explicit stack avoids call stack limits but requires careful state tracking.',
  },
  {
    title: 'Topological order of components',
    detail:
      'Tarjan emits components in reverse topological order of the condensation graph, which can be useful downstream.',
  },
]

const takeaways = [
  'Tarjan SCC finds strongly connected components in linear time with one DFS.',
  'Lowlink and the stack are the core invariants that keep components correct.',
  'SCCs collapse cycles into nodes, turning a directed graph into a DAG.',
  'Correctness depends on updating lowlink only for nodes still on the stack.',
  'It is a foundational tool in compilers, dependency analysis, and SAT solvers.',
]

const variantTable = [
  {
    variant: 'Tarjan SCC',
    graphType: 'Directed graphs',
    guarantee: 'All SCCs in O(V + E) time',
    useCase: 'Single-pass SCC extraction with stack',
  },
  {
    variant: 'Kosaraju',
    graphType: 'Directed graphs',
    guarantee: 'All SCCs in O(V + E) time',
    useCase: 'Two-pass DFS using transpose graph',
  },
  {
    variant: 'Gabow',
    graphType: 'Directed graphs',
    guarantee: 'All SCCs in O(V + E) time',
    useCase: 'Alternative stack-based SCC algorithm',
  },
]

export default function TarjanSCCPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Tarjan SCC</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Linear-time strongly connected components with one DFS</div>
              <p className="win95-text">
                Tarjan SCC finds all strongly connected components in a directed graph with a single depth-first search. It
                uses discovery indices, lowlink values, and a stack to identify when a set of nodes forms a mutually reachable
                component. The result is a clean, linear-time decomposition that turns any directed graph into a DAG of SCCs.
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
                A strongly connected component (SCC) is a set of nodes where every node can reach every other node. Tarjan
                SCC discovers these sets by tracking how far each DFS path can reach backward through edges still on the stack.
                When a node cannot reach an earlier ancestor, it marks the root of a component, and the stack is popped to emit
                that SCC.
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
                <li>Initialize index to 0 and clear the stack.</li>
                <li>For each unvisited node, run the DFS routine.</li>
                <li>Assign index and lowlink, then push the node on the stack.</li>
                <li>For each outgoing edge, recurse or update lowlink when a back edge exists.</li>
                <li>If lowlink equals index, the node is an SCC root.</li>
                <li>Pop nodes until the root to form a single component.</li>
                <li>Repeat until all nodes have been visited.</li>
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
                Correctness hinges on lowlink tracking the smallest discovery index reachable through nodes still on the stack.
                When lowlink[v] equals index[v], there is no back edge to an earlier node, so v is the root of an SCC.
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
                Tarjan SCC is optimal in time complexity and uses minimal extra memory. The main tradeoff is DFS recursion depth,
                which may require an iterative implementation for very large graphs.
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
