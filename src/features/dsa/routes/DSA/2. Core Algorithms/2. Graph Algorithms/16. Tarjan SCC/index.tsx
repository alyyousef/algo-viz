import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const prerequisites = [
  {
    title: 'Directed graph',
    detail:
      'Tarjan SCC operates on directed graphs and finds mutually reachable components.',
  },
  {
    title: 'Depth-first search',
    detail:
      'You need a DFS traversal and a recursion or explicit stack to explore edges.',
  },
  {
    title: 'Stack discipline',
    detail:
      'Nodes remain on the stack until their component is finalized.',
  },
  {
    title: 'Discovery ordering',
    detail:
      'Each node gets a unique discovery index that anchors lowlink values.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Directed graph G(V, E), usually as adjacency lists.',
  },
  {
    title: 'Output',
    detail:
      'List of SCCs or a component ID per node.',
  },
  {
    title: 'Optional',
    detail:
      'Condensation DAG formed by contracting each SCC into a node.',
  },
]

const formalDefinitions = [
  {
    title: 'Index',
    detail:
      'Discovery time assigned to each node when first visited.',
  },
  {
    title: 'Lowlink',
    detail:
      'Smallest discovery index reachable from a node while staying in the current DFS stack.',
  },
  {
    title: 'Root condition',
    detail:
      'If lowlink[v] == index[v], v is the root of an SCC.',
  },
  {
    title: 'On-stack constraint',
    detail:
      'Only edges to nodes still on the stack can reduce lowlink.',
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

const stepByStepFlow = [
  'Initialize index counter to 0 and clear the stack.',
  'For each unvisited node, run strongConnect(node).',
  'Assign index and lowlink, then push the node on the stack.',
  'For each outgoing edge, recurse on unvisited neighbors and update lowlink.',
  'If a neighbor is on the stack, update lowlink with its index.',
  'When lowlink == index, pop the stack to emit one SCC.',
  'Repeat until all nodes have been visited.',
]

const dataStructures = [
  {
    title: 'Index array',
    detail:
      'Stores discovery order for each node.',
  },
  {
    title: 'Lowlink array',
    detail:
      'Stores the smallest reachable index within the current stack.',
  },
  {
    title: 'Stack and onStack flag',
    detail:
      'Track the active DFS path and which nodes can affect lowlink.',
  },
  {
    title: 'Component labels',
    detail:
      'Optional array mapping each node to its SCC ID.',
  },
]

const correctnessNotes = [
  {
    title: 'Lowlink invariant',
    detail:
      'Lowlink tracks reachability to earlier stack nodes, preventing cross-component merging.',
  },
  {
    title: 'Root extraction',
    detail:
      'When lowlink equals index, the stack segment up to that node is exactly one SCC.',
  },
  {
    title: 'Single-pass guarantee',
    detail:
      'Each edge is examined once during DFS, so SCCs are identified in linear time.',
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
  {
    title: 'Worked mini-example',
    code: `Edges:
1->2, 2->3, 3->1, 3->4, 4->5, 5->4

SCCs:
{1,2,3} and {4,5}`,
    explanation:
      'Tarjan groups the mutual cycles into two SCCs even though there is a one-way edge from 3 to 4.',
  },
]

const edgeCases = [
  'Isolated nodes form SCCs of size 1.',
  'Self-loops keep the node in its own SCC but do not change lowlink logic.',
  'Disconnected graphs require DFS from every unvisited node.',
  'Deep graphs may overflow recursion; use iterative DFS if needed.',
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

const implementationNotes = [
  {
    title: 'Iterative DFS',
    detail:
      'Avoid recursion limits by simulating DFS with an explicit stack and state.',
  },
  {
    title: 'Edge order',
    detail:
      'SCC order can vary; if determinism matters, fix neighbor ordering.',
  },
  {
    title: 'Component IDs',
    detail:
      'Assign IDs when popping the stack to build condensation graphs later.',
  },
  {
    title: 'Memory bounds',
    detail:
      'Arrays are O(V), so the method is memory efficient for large graphs.',
  },
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
                Correctness hinges on lowlink tracking the smallest discovery index reachable through nodes still on the stack.
                When lowlink[v] equals index[v], there is no back edge to an earlier node, so v is the root of an SCC.
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

