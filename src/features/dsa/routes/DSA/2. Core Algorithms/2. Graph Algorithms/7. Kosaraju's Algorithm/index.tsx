import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const prerequisites = [
  {
    title: 'Strong connectivity',
    detail:
      'A strongly connected component (SCC) is a maximal set of vertices where each vertex can reach every other vertex.',
  },
  {
    title: 'DFS finishing times',
    detail:
      'DFS records when a node is fully explored. Those finish times implicitly order SCCs in the condensation DAG.',
  },
  {
    title: 'Transpose graph G^T',
    detail:
      'Reversing all edges flips sources and sinks in the condensation graph, which is the key trick in pass two.',
  },
  {
    title: 'Condensation DAG',
    detail:
      'Contract every SCC into a single node. The resulting graph is acyclic and explains why the ordering works.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Directed graph G = (V, E), usually as an adjacency list; can be disconnected.',
  },
  {
    title: 'Output',
    detail:
      'List of SCCs (each is a vertex set). Optional: a condensation DAG or component ID per vertex.',
  },
  {
    title: 'Preprocessing',
    detail:
      'Either build the transpose graph explicitly or provide an iterator over incoming edges.',
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

const stepByStepFlow = [
  'Initialize visited flags and an empty finish list.',
  'Run DFS from every unvisited node in G; append each node to the finish list after exploring all neighbors.',
  'Build or access the transpose graph G^T.',
  'Clear visited flags, then iterate nodes in reverse finish order.',
  'For each unvisited node, run DFS on G^T to collect exactly one SCC.',
  'Record component IDs or component lists; optionally build the condensation DAG.',
]

const dataStructures = [
  {
    title: 'Finish list / stack',
    detail:
      'Stores vertices by DFS finish time. Processing in reverse order is the critical ordering guarantee.',
  },
  {
    title: 'Visited flags',
    detail:
      'Separate visited arrays for the two passes keep traversals independent and correct.',
  },
  {
    title: 'Transpose adjacency',
    detail:
      'Either an explicit reversed adjacency list or an in-edge iterator, both O(V + E).',
  },
  {
    title: 'Component labels',
    detail:
      'An array mapping vertex -> component ID enables fast SCC membership queries.',
  },
]

const correctnessNotes = [
  {
    title: 'Finish order respects condensation DAG',
    detail:
      'If there is an edge from SCC A to SCC B in G, all vertices in A finish after all vertices in B.',
  },
  {
    title: 'Transpose turns sinks into sources',
    detail:
      'In G^T, edges reverse so the last-finishing SCC becomes a source, isolating it for DFS.',
  },
  {
    title: 'Each pass isolates exactly one SCC',
    detail:
      'Starting from the latest finisher on G^T, DFS cannot leave its SCC, and will visit the entire SCC.',
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
  {
    title: 'Worked mini-example',
    code: `Graph:
1 -> 2 -> 3 -> 1   (cycle)
3 -> 4 -> 5 -> 4   (cycle)

Pass 1 (finish order, one possible):
finish: [2,1,3,5,4]

Pass 2 on G^T (reverse order):
start 4 => {4,5}
start 3 => {1,2,3}

SCCs: {4,5}, {1,2,3}`,
    explanation:
      'The exact finish order can vary, but reverse order always isolates sink components first on the transpose graph.',
  },
  {
    title: 'Recursive version (compact)',
    code: `function kosaraju_recursive(g):
    visited = set()
    order = []

    def dfs1(u):
        visited.add(u)
        for v in g.neighbors(u):
            if v not in visited: dfs1(v)
        order.append(u)

    def dfs2(u, comp):
        visited.add(u)
        comp.append(u)
        for v in gT.neighbors(u):
            if v not in visited: dfs2(v, comp)

    for u in g.vertices():
        if u not in visited: dfs1(u)

    gT = g.transpose()
    visited.clear()
    sccs = []
    for u in reversed(order):
        if u not in visited:
            comp = []
            dfs2(u, comp)
            sccs.append(comp)
    return sccs`,
    explanation:
      'The recursive version mirrors the textbook algorithm. It is concise but can overflow recursion limits on deep graphs.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges in pass 2; using the original graph yields incorrect SCC grouping.',
  'Stack overflow from recursive DFS on large graphs; use iterative versions in production.',
  'Materializing the reversed graph can double memory; consider on-the-fly reverse adjacency iteration.',
  'Assuming uniqueness: multiple valid SCC orders exist; determinism may need vertex-id tie-breaks.',
]

const edgeCases = [
  'Isolated vertices: each vertex is its own SCC.',
  'Self-loops: the vertex is still a valid SCC of size 1.',
  'Disconnected graphs: must start DFS from every unvisited vertex in pass 1.',
  'Large, deep graphs: recursion may overflow; iterative DFS is safer.',
]

const decisionGuidance = [
  'Need simple, linear-time SCCs and can afford two passes: use Kosaraju.',
  "Need single-pass SCCs or memory tightness: use Tarjan's algorithm.",
  'Graph is extremely deep or large: prefer iterative DFS to avoid recursion limits.',
  'Streaming edges sorted by tail/head: consider on-the-fly reverse iteration to avoid building g^T fully.',
]

const implementationNotes = [
  {
    title: 'Building G^T',
    detail:
      'If memory allows, precompute reverse adjacency for O(1) in-edges; otherwise keep incoming edges or reconstruct on demand.',
  },
  {
    title: 'Determinism',
    detail:
      'SCC order is not unique. If deterministic ordering matters, sort adjacency lists or process vertices in a fixed order.',
  },
  {
    title: 'Component IDs',
    detail:
      'Assign component IDs during pass 2 to enable quick SCC membership checks and to build the condensation DAG.',
  },
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

const variantTable = [
  {
    variant: 'Kosaraju',
    passes: 'Two DFS passes',
    memory: 'Needs transpose or in-edge access',
    useCase: 'Clear, simple SCC extraction',
  },
  {
    variant: 'Tarjan',
    passes: 'One DFS pass',
    memory: 'No transpose, lowlink + stack',
    useCase: 'Single-pass SCCs with strong invariants',
  },
  {
    variant: 'Gabow',
    passes: 'One DFS pass',
    memory: 'Two stacks',
    useCase: 'Alternative stack-based SCC algorithm',
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
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The finish order ensures that when you start DFS on the transpose graph, you can only reach vertices within the same SCC.
                This prevents cross-component leakage and guarantees every SCC is found exactly once.
              </p>
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
            <legend>Variants and alternatives</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Passes</th>
                    <th>Memory tradeoff</th>
                    <th>Typical use case</th>
                  </tr>
                </thead>
                <tbody>
                  {variantTable.map((row) => (
                    <tr key={row.variant}>
                      <td>{row.variant}</td>
                      <td>{row.passes}</td>
                      <td>{row.memory}</td>
                      <td>{row.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

