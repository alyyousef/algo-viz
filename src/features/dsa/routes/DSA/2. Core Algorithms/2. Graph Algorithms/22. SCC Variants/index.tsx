import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const sccDefinitions = [
  {
    heading: 'Strongly connected component (SCC)',
    bullets: [
      'A maximal set of vertices where every vertex reaches every other.',
      'Defined only for directed graphs.',
      'Each node belongs to exactly one SCC.',
    ],
  },
  {
    heading: 'Condensation graph',
    bullets: [
      'Collapse each SCC into a single node.',
      'Edges go between SCCs if any original edge crosses them.',
      'The result is always a DAG.',
    ],
  },
  {
    heading: 'Component ordering',
    bullets: [
      'Topological order exists on the condensation DAG.',
      'Used for DP, scheduling, or dependency reasoning.',
      'Kosaraju outputs SCCs in reverse topo order.',
    ],
  },
  {
    heading: 'Reachability lens',
    bullets: [
      'Mutual reachability defines SCC boundaries.',
      'Forward and backward reachability intersect on SCCs.',
      'This is the basis for forward-backward algorithms.',
    ],
  },
]

const workflowSteps = [
  {
    title: 'Choose an SCC variant',
    detail:
      'Pick Kosaraju for simplicity, Tarjan for single pass, or Gabow for a stack-based alternative.',
  },
  {
    title: 'Run SCC extraction',
    detail:
      'Use DFS-based passes or path-based stacks to assign each vertex a component id.',
  },
  {
    title: 'Build condensation DAG',
    detail:
      'Create edges between SCCs when edges cross components, deduplicating parallel edges.',
  },
  {
    title: 'Post-process as needed',
    detail:
      'Toposort SCCs, compute source/sink counts, or run DP on the component DAG.',
  },
]

const variantTradeoffs = [
  {
    title: 'Kosaraju (two-pass)',
    detail:
      'Easiest to explain, but requires reversing edges and two DFS passes.',
  },
  {
    title: 'Tarjan (lowlink)',
    detail:
      'Single pass with a stack; no reversed graph needed but more bookkeeping.',
  },
  {
    title: 'Gabow (path-based)',
    detail:
      'Two stacks avoid lowlink arrays; often good constants in practice.',
  },
  {
    title: 'Iterative DFS',
    detail:
      'Avoid recursion limits on deep graphs by simulating DFS with explicit stacks.',
  },
  {
    title: 'Forward-backward',
    detail:
      'Uses reachability intersections; practical on large graphs but not worst-case tight.',
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
    title: 'Forward-backward caveat',
    detail:
      'Reachability-based variants can be fast on many graphs but do not guarantee tight worst-case bounds.',
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
  {
    context: 'Build systems and CI',
    detail:
      'Detect cyclic dependencies before scheduling build or test pipelines.',
  },
  {
    context: 'Program analysis',
    detail:
      'Call graphs and control-flow graphs use SCCs to identify recursion and loops.',
  },
  {
    context: 'Graph compression',
    detail:
      'Condensation DAGs reduce cyclic graphs into acyclic summaries for faster downstream queries.',
  },
]

const postProcessingPatterns = [
  {
    title: 'Condensation DAG + topo order',
    detail:
      'Toposort SCCs to schedule tasks, compute reachability, or run DP across components.',
  },
  {
    title: 'Source and sink SCCs',
    detail:
      'Count SCCs with zero indegree or outdegree to solve minimum edge additions problems.',
  },
  {
    title: '2-SAT assignment order',
    detail:
      'Assign variables by descending SCC order: higher order implies earlier false/true decisions.',
  },
  {
    title: 'Cycle breaking',
    detail:
      'Pick a representative edge per SCC to break cycles in scheduling or dependency graphs.',
  },
]

const correctnessSketch = [
  {
    title: 'Mutual reachability',
    detail:
      'Vertices belong to the same SCC iff they can reach each other in the directed graph.',
  },
  {
    title: 'Kosaraju order',
    detail:
      'Finishing times ensure that in G^T, each DFS from the next vertex hits exactly one SCC.',
  },
  {
    title: 'Tarjan lowlink',
    detail:
      'lowlink tracks the earliest stack vertex reachable; a root is detected when low == index.',
  },
  {
    title: 'Condensation DAG',
    detail:
      'SCCs have no cycles between them; otherwise they would merge into a larger SCC.',
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
  {
    title: '2-SAT contradiction check',
    code: `for each variable x:
    if sccId[x] == sccId[not x]:
        UNSAT`,
    explanation:
      'If a variable and its negation are in the same SCC, the formula is unsatisfiable.',
  },
  {
    title: 'Source and sink SCCs',
    code: `indeg = [0..C-1]
outdeg = [0..C-1]
for each edge (u, v):
    if sccId[u] != sccId[v]:
        outdeg[sccId[u]] += 1
        indeg[sccId[v]] += 1
sources = count indeg == 0
sinks = count outdeg == 0`,
    explanation:
      'Useful for problems like minimum edges to make the graph strongly connected.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges for Kosaraju pass two.',
  'Not marking stack membership in Tarjan, causing lowlink to leak across SCCs.',
  'Using recursion on deep graphs without stack safeguards.',
  'Assuming SCCs are topologically sorted by discovery order.',
  'Treating SCCs like undirected components; direction matters.',
  'Failing to reset visited arrays between passes in Kosaraju.',
  'Building condensation edges without deduping, which can bloat memory.',
  'Using forward-backward without careful pruning on adversarial graphs.',
]

const solvingChecklist = [
  'Clarify if the graph is directed and ensure edge directions are correct.',
  'Pick the SCC variant based on memory, recursion limits, and simplicity.',
  'Track component ids for every vertex after extraction.',
  'Build the condensation DAG if downstream logic needs ordering or DP.',
  'Deduplicate edges between components to keep the DAG small.',
]

const testingChecklist = [
  'Single node, no edges.',
  'One big cycle: all nodes in one SCC.',
  'Multiple SCCs connected in a chain.',
  'Graphs with self-loops only.',
  'Disconnected directed graph with isolated nodes.',
  'Very deep DFS paths to stress recursion limits.',
]

const decisionGuidance = [
  'Need the simplest linear-time SCCs: use Kosaraju.',
  'Need single-pass SCCs with tight memory: use Tarjan.',
  'Need an alternative with small constants: use Gabow.',
  'Need to avoid recursion depth issues: choose iterative DFS variants.',
  'Need condensation DAG for scheduling or reachability: build after SCCs.',
  'Need to avoid storing G^T: prefer Tarjan or Gabow.',
  'Need batched reachability with pruning: consider forward-backward.',
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
  {
    title: 'SCC DAG DP',
    detail:
      'Many problems reduce to dynamic programming on the condensation DAG after SCCs are computed.',
  },
  {
    title: 'Edge classification',
    detail:
      'Cross edges between SCCs define a partial order that can expose bottlenecks or dependency levels.',
  },
]

const takeaways = [
  'All classic SCC variants run in linear time but differ in style and memory needs.',
  'Kosaraju is the easiest to explain, Tarjan is the compact single-pass workhorse.',
  'Gabow is a strong practical alternative with a different stack discipline.',
  'Iterative variants are safer on huge graphs.',
  'SCCs are the gateway to condensation DAGs and cycle-aware reasoning.',
  'Post-processing on the SCC DAG powers many real-world workflows.',
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
                traversal style, and implementation complexity. This page compares the major SCC algorithms, how to choose
                between them, and how to use SCC output for condensation DAGs, 2-SAT, and dependency analysis.
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
            <legend>Definitions that matter</legend>
            <div className="win95-grid win95-grid-2">
              {sccDefinitions.map((block) => (
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
            <legend>End-to-end workflow</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((item) => (
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
            <legend>Variant selection cheatsheet</legend>
            <div className="win95-grid win95-grid-2">
              {variantTradeoffs.map((item) => (
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
            <legend>Post-processing patterns</legend>
            <div className="win95-grid win95-grid-2">
              {postProcessingPatterns.map((item) => (
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
            <legend>Why it is correct (sketch)</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>SCC problem-solving checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {solvingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
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

