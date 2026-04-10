import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Tarjan SCC operates on directed graphs and finds mutually reachable components.',
  },
  {
    title: 'Depth-first search',
    detail: 'You need a DFS traversal and a recursion or explicit stack to explore edges.',
  },
  {
    title: 'Stack discipline',
    detail: 'Nodes remain on the stack until their component is finalized.',
  },
  {
    title: 'Discovery ordering',
    detail: 'Each node gets a unique discovery index that anchors lowlink values.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail: 'Directed graph G(V, E), usually as adjacency lists.',
  },
  {
    title: 'Output',
    detail: 'List of SCCs or a component ID per node.',
  },
  {
    title: 'Optional',
    detail: 'Condensation DAG formed by contracting each SCC into a node.',
  },
]

const formalDefinitions = [
  {
    title: 'Index',
    detail: 'Discovery time assigned to each node when first visited.',
  },
  {
    title: 'Lowlink',
    detail:
      'Smallest discovery index reachable from a node while staying in the current DFS stack.',
  },
  {
    title: 'Root condition',
    detail: 'If lowlink[v] == index[v], v is the root of an SCC.',
  },
  {
    title: 'On-stack constraint',
    detail: 'Only edges to nodes still on the stack can reduce lowlink.',
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
    detail: 'Monotonic counter that assigns discovery order to nodes during DFS.',
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
    detail: 'When a root is found, pop nodes until the root to form one SCC.',
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
    detail: 'Stores discovery order for each node.',
  },
  {
    title: 'Lowlink array',
    detail: 'Stores the smallest reachable index within the current stack.',
  },
  {
    title: 'Stack and onStack flag',
    detail: 'Track the active DFS path and which nodes can affect lowlink.',
  },
  {
    title: 'Component labels',
    detail: 'Optional array mapping each node to its SCC ID.',
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
    detail: 'When lowlink equals index, the stack segment up to that node is exactly one SCC.',
  },
  {
    title: 'Single-pass guarantee',
    detail: 'Each edge is examined once during DFS, so SCCs are identified in linear time.',
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
    detail: 'Run DFS from every unvisited node to cover disconnected graphs.',
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
    detail: 'O(V + E) because each node and edge is processed once in the DFS.',
  },
  {
    title: 'Space complexity',
    detail: 'O(V) for stacks, arrays, and recursion. The graph storage is O(V + E).',
  },
  {
    title: 'Recursion depth',
    detail:
      'Deep graphs can overflow recursion limits. Iterative DFS or tail recursion optimization may be required.',
  },
  {
    title: 'Component condensation',
    detail: 'SCCs produce a DAG, which can be further processed with topological algorithms.',
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
    detail: 'Implication graphs use SCCs to detect contradictions and to derive assignments.',
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
    explanation: 'The SCC structure reveals contradictions in implication graphs.',
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
    detail: 'Avoid recursion limits by simulating DFS with an explicit stack and state.',
  },
  {
    title: 'Edge order',
    detail: 'SCC order can vary; if determinism matters, fix neighbor ordering.',
  },
  {
    title: 'Component IDs',
    detail: 'Assign IDs when popping the stack to build condensation graphs later.',
  },
  {
    title: 'Memory bounds',
    detail: 'Arrays are O(V), so the method is memory efficient for large graphs.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-prerequisites', label: 'Prerequisites' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-when', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Core Mechanics' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-key-structures', label: 'Key Structures' },
    { id: 'core-data-structures', label: 'Data Structures' },
    { id: 'core-termination', label: 'Termination Rules' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Real-World Applications' },
    { id: 'ex-edge-cases', label: 'Edge Cases' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Core Terms' },
    { id: 'glossary-variants', label: 'Variants and Guarantees' },
  ],
}

export default function TarjanSCCPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Tarjan SCC',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Tarjan SCC"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Tarjan SCC</h1>
      <p>
        Tarjan SCC finds all strongly connected components in a directed graph with a single
        depth-first search using discovery indices, lowlink values, and a stack.
      </p>
      <p>
        <Link to="/algoViz">Back to catalog</Link>
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              A strongly connected component (SCC) is a set of nodes where every node can reach
              every other node. Tarjan detects SCC roots by comparing lowlink and discovery index,
              then pops exactly one component from the stack.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="bp-prerequisites" className="bin98-section">
            <h2 className="bin98-heading">Prerequisites</h2>
            {prerequisites.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-io" className="bin98-section">
            <h2 className="bin98-heading">Inputs and Outputs</h2>
            {inputsOutputs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-formal" className="bin98-section">
            <h2 className="bin98-heading">Formal Concepts</h2>
            {formalDefinitions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">Core Mechanics</h2>
            {coreMechanics.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Flow</h2>
            <ol>
              {stepByStepFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-key-structures" className="bin98-section">
            <h2 className="bin98-heading">Key Structures and Invariants</h2>
            {keyStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-data-structures" className="bin98-section">
            <h2 className="bin98-heading">Data Structures</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-termination" className="bin98-section">
            <h2 className="bin98-heading">Termination Rules</h2>
            {terminationRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Notes</h2>
            <p>
              Correctness hinges on lowlink tracking the smallest discovery index reachable through
              nodes still on the stack. When lowlink[v] equals index[v], v is an SCC root and
              popping until v yields exactly that component.
            </p>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="ex-edge-cases" className="bin98-section">
            <h2 className="bin98-heading">Edge Cases Checklist</h2>
            <ul>
              {edgeCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <>
          <section id="glossary-terms" className="bin98-section">
            <h2 className="bin98-heading">Core Terms</h2>
            {formalDefinitions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              <strong>Discovery index:</strong> DFS visit number assigned when a node is first seen.
            </p>
            <p>
              <strong>SCC root:</strong> Node where lowlink equals index and component popping
              begins.
            </p>
            <p>
              <strong>Condensation DAG:</strong> DAG formed by contracting each SCC into one
              super-node.
            </p>
          </section>
          <section id="glossary-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Guarantees</h2>
            {variantTable.map((item) => (
              <p key={item.variant}>
                <strong>{item.variant}:</strong> {item.graphType}. <strong>Guarantee:</strong>{' '}
                {item.guarantee}. <strong>Typical use case:</strong> {item.useCase}.
              </p>
            ))}
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
