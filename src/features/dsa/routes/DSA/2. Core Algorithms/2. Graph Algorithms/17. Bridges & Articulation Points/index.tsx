import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early DFS theory formalizes cut vertices and bridges (1970s)',
    detail:
      'Graph theory formalized articulation points (cut vertices) and bridges (cut edges), showing how removal disconnects components.',
  },
  {
    title: 'Tarjan introduces lowlink framework (1972)',
    detail:
      'The same lowlink ideas used for SCCs also identify bridges and articulation points in undirected graphs in linear time.',
  },
  {
    title: 'Network reliability and fault tolerance (1980s)',
    detail:
      'Infrastructure networks adopted bridge and cut-vertex analysis to identify single points of failure.',
  },
  {
    title: 'Modern dependency and infrastructure analysis',
    detail:
      'Today, these algorithms power resilience checks in distributed systems, code dependency graphs, and transportation networks.',
  },
]

const prerequisites = [
  {
    title: 'Undirected graph',
    detail:
      'Bridge and articulation definitions apply to undirected graphs. Directed graphs require different notions.',
  },
  {
    title: 'Depth-first search',
    detail: 'The algorithm is a DFS with discovery times and lowlink values.',
  },
  {
    title: 'No parallel-edge ambiguity',
    detail: 'If parallel edges exist, track edge IDs to avoid false bridges.',
  },
  {
    title: 'Connected or disconnected',
    detail: 'The graph can be disconnected; DFS must start from every unvisited node.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail: 'Undirected graph G(V, E), typically as adjacency lists with edge IDs.',
  },
  {
    title: 'Output',
    detail: 'Set of bridges and articulation points (or boolean flags per node).',
  },
  {
    title: 'Optional',
    detail: 'Biconnected components or a block-cut tree derived from the results.',
  },
]

const formalDefinitions = [
  {
    title: 'Discovery time disc[v]',
    detail: 'Time when v is first visited during DFS.',
  },
  {
    title: 'Lowlink low[v]',
    detail: 'Minimum discovery time reachable from v using tree edges plus at most one back edge.',
  },
  {
    title: 'Bridge',
    detail: 'Edge (u, v) is a bridge if low[v] > disc[u] for a DFS tree edge.',
  },
  {
    title: 'Articulation point',
    detail: 'Node u is a cut vertex if removing it increases connected components.',
  },
]

const mentalModels = [
  {
    title: 'Single point of failure',
    detail:
      'A bridge or articulation point is the only way to keep two parts of the graph connected. Remove it and the graph splits.',
  },
  {
    title: 'Back edges as safety ropes',
    detail:
      'Back edges create alternative routes. If a subtree has no back edge to ancestors, its connecting edge is a bridge.',
  },
  {
    title: 'Discovery time stamps',
    detail:
      'DFS timestamps tell you who came first. Lowlink tells you how far back a subtree can reach.',
  },
]

const coreMechanics = [
  {
    title: 'DFS traversal with parent tracking',
    detail: 'Run DFS, track parent of each node, and assign discovery time for each visit.',
  },
  {
    title: 'Lowlink computation',
    detail:
      'Lowlink[v] is the smallest discovery time reachable from v using tree edges and at most one back edge.',
  },
  {
    title: 'Bridge test',
    detail:
      'Edge (u, v) is a bridge if lowlink[v] > disc[u]. There is no back edge from v or its subtree to u or ancestors.',
  },
]

const stepByStepFlow = [
  'Initialize disc and low to -1, parent to -1, time = 0.',
  'For each unvisited node, run DFS to cover all components.',
  'On entry to u: set disc[u] = low[u] = time++.',
  'For each neighbor v: if unvisited, recurse and update low[u].',
  'If low[v] > disc[u], mark edge (u, v) as a bridge.',
  'If u is non-root and low[v] >= disc[u], mark u as articulation.',
  'If u is root and has more than one child, mark u as articulation.',
]

const dataStructures = [
  {
    title: 'disc and low arrays',
    detail: 'Track discovery time and lowest reachable ancestor.',
  },
  {
    title: 'parent array',
    detail: 'Distinguishes tree edges from back edges.',
  },
  {
    title: 'bridge list',
    detail: 'Collects critical edges identified by the lowlink test.',
  },
  {
    title: 'articulation flags',
    detail: 'Marks vertices that satisfy the cut-vertex rules.',
  },
]

const correctnessNotes = [
  {
    title: 'Bridge criterion',
    detail: 'If a child subtree cannot reach u or above, the connecting edge is the only link.',
  },
  {
    title: 'Articulation criterion',
    detail: 'If a child subtree cannot reach above u, removing u disconnects that subtree.',
  },
  {
    title: 'Root special case',
    detail: 'Root is a cut vertex only if it has at least two DFS children.',
  },
]

const keyStructures = [
  {
    title: 'Discovery time array',
    detail: 'Stores the order nodes are visited. This is the baseline for lowlink comparisons.',
  },
  {
    title: 'Lowlink array',
    detail: 'Tracks the earliest reachable ancestor through tree and back edges.',
  },
  {
    title: 'Parent array',
    detail: 'Distinguishes tree edges from back edges and supports articulation point tests.',
  },
  {
    title: 'Articulation flags',
    detail: 'Mark nodes that satisfy articulation rules during DFS.',
  },
]

const terminationRules = [
  {
    title: 'Articulation root rule',
    detail:
      'A root is an articulation point if it has more than one DFS child (independent subtrees).',
  },
  {
    title: 'Articulation non-root rule',
    detail: 'A non-root u is an articulation point if any child v has lowlink[v] >= disc[u].',
  },
  {
    title: 'Bridge rule',
    detail: 'Edge (u, v) is a bridge if lowlink[v] > disc[u].',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail: 'O(V + E) because DFS visits each vertex and edge once.',
  },
  {
    title: 'Space complexity',
    detail: 'O(V + E) for the graph plus O(V) for arrays and recursion stack.',
  },
  {
    title: 'Recursion depth',
    detail: 'Deep graphs can overflow call stacks. Consider iterative DFS for large inputs.',
  },
  {
    title: 'Undirected requirement',
    detail:
      'Bridge and articulation definitions apply to undirected graphs. Directed graphs require different notions.',
  },
]

const realWorldUses = [
  {
    context: 'Network reliability',
    detail:
      'Identify routers or links whose failure disconnects service, guiding redundancy planning.',
  },
  {
    context: 'Power grid and transportation',
    detail:
      'Spot critical substations or roads that are single points of failure in infrastructure networks.',
  },
  {
    context: 'Software dependency graphs',
    detail: 'Find modules or packages that, if removed, break build or runtime connectivity.',
  },
  {
    context: 'Social graph resilience',
    detail: 'Detect influencers or bridges between communities; their removal splits the network.',
  },
]

const examples = [
  {
    title: 'Bridge and articulation DFS pseudocode',
    code: `time = 0
function dfs(u):
    disc[u] = low[u] = time++
    childCount = 0
    for v in adj[u]:
        if disc[v] == -1:
            parent[v] = u
            childCount += 1
            dfs(v)
            low[u] = min(low[u], low[v])
            if low[v] > disc[u]: mark edge (u,v) as bridge
            if parent[u] != -1 and low[v] >= disc[u]: mark u as articulation
        else if v != parent[u]:
            low[u] = min(low[u], disc[v])
    if parent[u] == -1 and childCount > 1: mark u as articulation`,
    explanation:
      'The lowlink comparisons identify bridges and articulation points in one DFS pass.',
  },
  {
    title: 'Bridge detection intuition',
    code: `// If subtree cannot reach ancestor, edge is critical
if low[child] > disc[parent]:
    edge (parent, child) is a bridge`,
    explanation:
      'No back edge from the child subtree to the parent or above means the edge is the only connection.',
  },
  {
    title: 'Articulation point intuition',
    code: `// If child subtree cannot reach above u, u is critical
if low[child] >= disc[u] and u is not root:
    u is an articulation point`,
    explanation:
      'The subtree is stuck below u, so removing u disconnects that subtree from the rest of the graph.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges:
1-2, 2-3, 3-4, 2-4, 4-5

Bridges: (4,5)
Articulation points: 4`,
    explanation: 'The cycle 2-3-4 protects those edges, but node 4 is the only connector to 5.',
  },
  {
    title: 'Root articulation rule',
    code: `// Root with two DFS children is a cut vertex
if parent[u] == -1 and childCount > 1:
    articulation[u] = true`,
    explanation: 'The root has no parent, so only multiple child subtrees cause disconnection.',
  },
]

const edgeCases = [
  'Single node: no bridges, no articulation points.',
  'Two nodes with one edge: the edge is a bridge; both nodes are articulation points only if removing one disconnects.',
  'Parallel edges: no bridge if a second edge preserves connectivity.',
  'Disconnected graph: run DFS from every unvisited node.',
]

const pitfalls = [
  'Forgetting the root special case for articulation points.',
  'Treating back edges to parent as valid lowlink updates (they should be ignored).',
  'Using low[child] instead of disc[child] for back edge updates.',
  'Assuming the graph is connected and skipping DFS from unvisited nodes.',
  'Applying the algorithm to directed graphs without adapting the definition.',
]

const decisionGuidance = [
  'You need to identify single points of failure in an undirected graph.',
  'You want bridge edges and articulation vertices in linear time.',
  'The graph is large and you need a single-pass algorithm.',
  'You can manage DFS recursion or use an iterative alternative.',
  'You need connectivity resilience metrics for networks or systems.',
]

const implementationNotes = [
  {
    title: 'Edge IDs for multigraphs',
    detail: 'Use edge IDs to distinguish parallel edges and avoid false bridge detection.',
  },
  {
    title: 'Iterative DFS',
    detail: 'For large graphs, replace recursion with an explicit stack and state.',
  },
  {
    title: 'Parent edge handling',
    detail: 'Ignore the immediate parent edge when processing back edges.',
  },
  {
    title: 'Component outputs',
    detail: 'Bridges partition the graph into edge-biconnected components.',
  },
]

const advancedInsights = [
  {
    title: 'Blocks and block-cut tree',
    detail:
      'Articulation points split the graph into biconnected components. The block-cut tree shows how components connect.',
  },
  {
    title: 'Edge-biconnected components',
    detail:
      'Removing all bridges partitions the graph into components with no bridges; these are edge-biconnected components.',
  },
  {
    title: 'Multi-edge handling',
    detail:
      'Parallel edges can prevent a bridge because a second edge provides an alternate route. Track edges, not just vertices.',
  },
  {
    title: 'Iterative DFS option',
    detail:
      'To avoid recursion limits, simulate DFS with an explicit stack while preserving lowlink updates.',
  },
]

const takeaways = [
  'Bridges and articulation points reveal critical connectivity structure.',
  'One DFS with lowlink values finds both in linear time.',
  'Root and non-root articulation rules differ and must be handled carefully.',
  'The algorithm assumes undirected graphs and correct back edge handling.',
  'The results power resilience analysis across networks and systems.',
]

const variantTable = [
  {
    variant: 'Tarjan bridge/articulation',
    graphType: 'Undirected',
    guarantee: 'All bridges and cut vertices in O(V + E)',
    useCase: 'Single-pass DFS with lowlink',
  },
  {
    variant: 'Biconnected components',
    graphType: 'Undirected',
    guarantee: 'Blocks and articulation points',
    useCase: 'Block-cut tree construction',
  },
  {
    variant: 'Naive removal test',
    graphType: 'Undirected',
    guarantee: 'Correct but slow',
    useCase: 'Small graphs or teaching',
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

export default function BridgesArticulationPointsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Bridges &amp; Articulation Points',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Bridges &amp; Articulation Points"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Bridges &amp; Articulation Points</h1>
      <p>
        Bridges and articulation points expose where an undirected graph will break if a link or
        vertex is removed. A single DFS with lowlink values identifies both in linear time.
      </p>
      <p>
        <Link to="/algoViz">Back to catalog</Link>
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              A bridge is an edge whose removal increases connected components. An articulation
              point is a vertex whose removal does the same. Lowlink tells whether a subtree has any
              route back to earlier ancestors.
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
              If a child subtree cannot reach above its parent, the connecting edge is a bridge. If
              it cannot reach above a non-root parent vertex, that parent becomes an articulation
              point.
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
              <strong>Back edge:</strong> Edge from a node to an already discovered ancestor in DFS.
            </p>
            <p>
              <strong>Cut vertex:</strong> Another name for articulation point.
            </p>
            <p>
              <strong>Block-cut tree:</strong> Tree structure connecting biconnected blocks through
              articulation points.
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
