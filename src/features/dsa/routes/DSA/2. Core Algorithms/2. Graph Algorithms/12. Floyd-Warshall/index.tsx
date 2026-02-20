import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'All-pairs shortest paths',
    detail:
      'Floyd-Warshall computes the shortest distance between every pair of vertices in one unified dynamic program.',
  },
  {
    title: 'Dense graph friendly',
    detail:
      'Runs in O(V^3), making it practical when E is close to V^2 or when V is small to medium.',
  },
  {
    title: 'Negative edges allowed',
    detail:
      'Works with negative weights, but fails if any negative cycle exists. It can detect those cycles.',
  },
]

const historicalMilestones = [
  {
    title: '1956: Roy defines transitive closure',
    detail:
      'Bernard Roy described a dynamic programming approach for reachability that foreshadowed Floyd-Warshall.',
  },
  {
    title: '1959: Warshall formalizes the DP',
    detail:
      'Stephen Warshall presented a clean recursion for path closure, setting the stage for shortest paths.',
  },
  {
    title: '1962: Floyd adds weights',
    detail:
      'Robert Floyd extended the method to weighted shortest paths, yielding the algorithm used today.',
  },
  {
    title: 'Modern era: matrix-friendly APSP',
    detail:
      'Floyd-Warshall remains a go-to for dense graphs and for GPU or SIMD-accelerated variants.',
  },
]

const prerequisites = [
  {
    title: 'Weighted directed graph',
    detail:
      'Floyd-Warshall works on directed graphs and supports negative edges.',
  },
  {
    title: 'All-pairs objective',
    detail:
      'You want shortest paths between every pair of nodes, not a single source.',
  },
  {
    title: 'No negative cycles',
    detail:
      'If a negative cycle exists, shortest paths are undefined (but detectable).',
  },
  {
    title: 'Matrix representation',
    detail:
      'The algorithm is matrix-based; O(V^2) memory is required.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights, or a prebuilt adjacency matrix.',
  },
  {
    title: 'Output',
    detail:
      'Distance matrix for all pairs, plus optional next-hop for path reconstruction.',
  },
  {
    title: 'Optional',
    detail:
      'Negative cycle indicator and reachability (via Warshall variant).',
  },
]

const formalDefinitions = [
  {
    title: 'DP state',
    detail:
      'dist[k][i][j] is the shortest path from i to j using intermediates 1..k.',
  },
  {
    title: 'Recurrence',
    detail:
      'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for each k.',
  },
  {
    title: 'Initialization',
    detail:
      'dist[i][i] = 0, dist[i][j] = w(i, j) if edge exists, else Infinity.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If dist[v][v] < 0 after completion, a negative cycle is present.',
  },
]

const coreConcepts = [
  {
    title: 'Intermediate set DP',
    detail:
      'Define dist[k][i][j] as the shortest path from i to j using only intermediate vertices 1..k.',
  },
  {
    title: 'Relaxation via a middle vertex',
    detail:
      'At step k, decide whether going through k improves the path: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
  },
  {
    title: 'Matrix viewpoint',
    detail:
      'The algorithm is a triple nested loop over k, i, j; it is essentially min-plus matrix closure.',
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If any dist[v][v] becomes negative after processing, a negative cycle is present.',
  },
]

const mentalModels = [
  {
    title: 'Checkpoint routing',
    detail:
      'Each iteration adds one more allowed checkpoint. Paths can only use checkpoints up to k.',
  },
  {
    title: 'Spreadsheet minimizer',
    detail:
      'You repeatedly update a distance table by checking whether a new column-and-row pair improves any cell.',
  },
]

const howItWorks = [
  {
    step: '1. Initialize distance matrix',
    detail:
      'Set dist[i][j] to edge weight, 0 on diagonal, and Infinity if no edge exists.',
  },
  {
    step: '2. Iterate over intermediates',
    detail:
      'For each k, allow k as an intermediate and update all i, j pairs.',
  },
  {
    step: '3. Relax all pairs',
    detail:
      'If dist[i][k] + dist[k][j] beats dist[i][j], replace it.',
  },
  {
    step: '4. Detect negative cycles',
    detail:
      'After the loop, if any dist[v][v] < 0, shortest paths are undefined.',
  },
  {
    step: '5. Optional path reconstruction',
    detail:
      'Maintain a next matrix to rebuild actual paths, not just distances.',
  },
]

const stepByStepFlow = [
  'Initialize dist matrix with edge weights and 0 on the diagonal.',
  'Optionally initialize next[i][j] to j when an edge i->j exists.',
  'For k from 1..V, allow k as an intermediate vertex.',
  'For each i, j pair, attempt relaxation through k.',
  'Update dist (and next) if a shorter path is found.',
  'After all k, inspect dist[v][v] to detect negative cycles.',
]

const dataStructures = [
  {
    title: 'Distance matrix',
    detail:
      'Stores shortest distances between all pairs, updated in place.',
  },
  {
    title: 'Next matrix',
    detail:
      'Stores the next hop to reconstruct a path between any i, j pair.',
  },
  {
    title: 'Infinity sentinel',
    detail:
      'A large value marking missing edges; must guard against overflow on add.',
  },
  {
    title: 'Vertex ordering',
    detail:
      'The k outer loop defines which intermediates are allowed at each stage.',
  },
]

const correctnessNotes = [
  {
    title: 'Inductive DP proof',
    detail:
      'After processing k, dist[i][j] is optimal using intermediates only from 1..k.',
  },
  {
    title: 'In-place safety',
    detail:
      'Updates are safe because the recurrence only depends on k and prior values.',
  },
  {
    title: 'Negative cycle exposure',
    detail:
      'Any cycle with negative total weight will make dist[v][v] negative.',
  },
]

const matrixInsights = [
  {
    title: 'Infinity handling',
    detail:
      'Represent missing edges with a large sentinel and guard against overflow when adding dist[i][k] + dist[k][j].',
  },
  {
    title: 'Path reconstruction',
    detail:
      'Use next[i][j] to store the first hop from i to j. Update it when a shorter path is found.',
  },
  {
    title: 'Boolean variant',
    detail:
      'Replacing min-plus with logical OR/AND gives Warshall transitive closure for reachability.',
  },
  {
    title: 'In-place safety',
    detail:
      'You can update dist in place because the recurrence for k only depends on previous k values.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V^3) operations. Performance depends on cache locality and tight loops.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V^2) memory for the distance matrix, plus optional O(V^2) for next matrix.',
  },
  {
    title: 'When it wins',
    detail:
      'Small-to-medium dense graphs or when you need a complete distance matrix quickly.',
  },
  {
    title: 'When it loses',
    detail:
      'Large sparse graphs. Johnson or repeated Dijkstra usually wins for E near V.',
  },
]

const complexityTable = [
  {
    approach: 'Floyd-Warshall',
    time: 'O(V^3)',
    space: 'O(V^2)',
    note: 'Simple APSP with negative edges, great for dense graphs.',
  },
  {
    approach: 'Johnson',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Best for sparse graphs with negative edges.',
  },
  {
    approach: 'Repeated Dijkstra',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Only works with nonnegative weights.',
  },
]

const realWorldUses = [
  {
    context: 'Routing tables',
    detail:
      'Precompute shortest distances between every pair of routers in dense network cores.',
  },
  {
    context: 'Urban transit grids',
    detail:
      'Small city networks with many transfers benefit from all-pairs distance matrices.',
  },
  {
    context: 'Compiler optimization',
    detail:
      'Data-flow analysis uses transitive closure variants to compute reachability and dominance.',
  },
  {
    context: 'Game AI navigation',
    detail:
      'Static maps with small node counts can precompute all-pairs paths for instant lookup.',
  },
]

const examples = [
  {
    title: 'Floyd-Warshall core loop',
    code: `function floydWarshall(dist):
    n = number of vertices
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    explanation:
      'The triple loop is the entire algorithm. Start with direct edges; each k adds a new allowed waypoint.',
  },
  {
    title: 'Initialization with Infinity',
    code: `function initMatrix(graph):
    n = number of vertices
    dist = matrix(n, n, +infinity)
    for v in 0..n-1:
        dist[v][v] = 0
    for each edge (u, v, w):
        dist[u][v] = min(dist[u][v], w)
    return dist`,
    explanation:
      'Use Infinity for missing edges. Multiple edges keep the minimum weight.',
  },
  {
    title: 'Path reconstruction',
    code: `function buildNext(dist, graph):
    next = matrix(n, n, null)
    for each edge (u, v, w):
        if w < dist[u][v]:
            dist[u][v] = w
            next[u][v] = v
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    return next`,
    explanation:
      'The next matrix stores the first hop. If next[i][j] is null, no path exists.',
  },
  {
    title: 'Worked mini-example',
    code: `Graph:
1->2 (3), 2->3 (4), 1->3 (10), 3->1 (-8)

Initial dist[1][3] = 10
When k=2: dist[1][3] becomes 3+4 = 7
When k=3: dist[1][1] becomes -1 (negative cycle detected)

Result: shortest paths undefined due to negative cycle.`,
    explanation:
      'Floyd-Warshall not only finds shorter paths but also exposes negative cycles via diagonal entries.',
  },
]

const edgeCases = [
  'Disconnected nodes: dist remains Infinity and next is null.',
  'Multiple edges between nodes: keep the minimum weight at initialization.',
  'Self-loops: use min(0, w) on the diagonal.',
  'Negative cycle in a disconnected component still appears on its diagonal.',
]

const pitfalls = [
  'Forgetting to guard Infinity + Infinity, which can overflow and corrupt updates.',
  'Not checking dist[v][v] after the loop, missing negative cycles.',
  'Assuming the graph is sparse; O(V^3) becomes expensive quickly.',
  'Failing to initialize dist[i][i] = 0 causes incorrect paths.',
  'Storing large weights in 32-bit integers when sums may exceed the range.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on a dense graph: use Floyd-Warshall.',
  'Need all-pairs on a sparse graph: prefer Johnson or repeated Dijkstra.',
  'Need only reachability (not distances): use Warshall transitive closure.',
  'Need to detect negative cycles: Floyd-Warshall exposes them via dist[v][v] < 0.',
  'Need fast online queries on a fixed small graph: precompute once with Floyd-Warshall.',
]

const implementationNotes = [
  {
    title: 'Overflow guards',
    detail:
      'Skip relaxation when dist[i][k] or dist[k][j] is Infinity.',
  },
  {
    title: 'Path reconstruction',
    detail:
      'If next[i][j] is null, no path exists; otherwise iterate next hops to build the path.',
  },
  {
    title: 'Memory planning',
    detail:
      'V^2 space grows fast; consider Johnson for larger sparse graphs.',
  },
  {
    title: 'Loop order',
    detail:
      'Use k outermost to maintain correctness; i,j inner loops aid cache locality.',
  },
]

const variantTable = [
  {
    variant: 'Floyd-Warshall',
    guarantee: 'All-pairs shortest paths',
    tradeoff: 'O(V^3) time, O(V^2) memory',
  },
  {
    variant: 'Warshall (boolean)',
    guarantee: 'Transitive closure',
    tradeoff: 'Reachability only, no weights',
  },
  {
    variant: 'Johnson',
    guarantee: 'APSP with negative edges',
    tradeoff: 'Better for sparse graphs',
  },
]

const advancedInsights = [
  {
    title: 'Min-plus matrix multiplication',
    detail:
      'Floyd-Warshall is a closure under min-plus algebra, connecting it to matrix methods and GPU acceleration.',
  },
  {
    title: 'Bitset optimization',
    detail:
      'For transitive closure, bitsets can speed up the boolean variant with word-level parallelism.',
  },
  {
    title: 'Path counting',
    detail:
      'You can augment the DP to count shortest paths by tracking equal-distance alternatives.',
  },
  {
    title: 'Sparse tiling',
    detail:
      'Block the matrix to improve cache locality; this can deliver large speedups on modern CPUs.',
  },
]

const takeaways = [
  'Floyd-Warshall is the simplest APSP algorithm: a clean DP over intermediate vertices.',
  'It handles negative edges but fails with negative cycles, which it can detect.',
  'Best for dense graphs or when you want a full distance matrix for repeated queries.',
  'Path reconstruction is easy with a next-hop matrix, not just distances.',
]

const glossaryTerms = [
  { term: 'APSP', definition: 'All-pairs shortest paths: shortest distances between every source-target pair.' },
  { term: 'DP state', definition: 'Shortest distance with allowed intermediates up to index k.' },
  { term: 'Min-plus recurrence', definition: 'Update rule: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).' },
  { term: 'Distance matrix', definition: 'V x V table of current best path costs between all node pairs.' },
  { term: 'Next matrix', definition: 'First-hop table used to reconstruct actual shortest paths.' },
  { term: 'Infinity sentinel', definition: 'Large placeholder value used when no direct edge exists.' },
  { term: 'Negative cycle', definition: 'Cycle with total weight below zero; finite shortest paths are undefined.' },
  { term: 'Diagonal test', definition: 'If dist[v][v] < 0 after completion, a negative cycle exists.' },
  { term: 'Warshall variant', definition: 'Boolean closure form for reachability rather than weighted distances.' },
  { term: 'Min-plus algebra', definition: 'Matrix algebra replacing +/* with min/+ operations.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98FloydHelpStyles = `
.fw-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.fw-help-window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;background:#c0c0c0;width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;}
.fw-help-titlebar{position:relative;display:flex;align-items:center;min-height:22px;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.fw-help-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px;white-space:nowrap;}
.fw-help-controls{display:flex;gap:2px;margin-left:auto;}
.fw-help-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;}
.fw-help-tabs{display:flex;gap:1px;padding:6px 8px 0;}
.fw-help-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer;}
.fw-help-tab.active{background:#fff;position:relative;top:1px;}
.fw-help-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr;}
.fw-help-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto;}
.fw-help-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.fw-help-toc-list{list-style:none;margin:0;padding:0;}
.fw-help-toc-list li{margin:0 0 8px;}
.fw-help-toc-list a{color:#000;text-decoration:none;font-size:12px;}
.fw-help-content{padding:14px 20px 20px;overflow:auto;}
.fw-help-doc-title{margin:0 0 10px;font-size:20px;font-weight:700;}
.fw-help-content p,.fw-help-content li{font-size:12px;line-height:1.5;}
.fw-help-content p{margin:0 0 10px;}
.fw-help-content ul,.fw-help-content ol{margin:0 0 10px 20px;padding:0;}
.fw-help-section{margin:0 0 20px;}
.fw-help-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.fw-help-subheading{margin:0 0 6px;font-size:13px;font-weight:700;}
.fw-help-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0;}
.fw-help-codebox{margin:6px 0 10px;padding:8px;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;background:#f4f4f4;}
.fw-help-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;}
.fw-help-link{color:#000080;}
@media (max-width:900px){.fw-help-main{grid-template-columns:1fr;}.fw-help-toc{border-right:none;border-bottom:1px solid #808080;}}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-prerequisites', label: 'Prerequisites and Definitions' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-matrix', label: 'Matrix Mechanics' },
    { id: 'core-data', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-variants', label: 'Variants and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FloydWarshallPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Floyd-Warshall (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Floyd-Warshall',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="fw-help-page">
      <style>{win98FloydHelpStyles}</style>
      <div className="fw-help-window" role="presentation">
        <header className="fw-help-titlebar">
          <span className="fw-help-title">Floyd-Warshall - Help</span>
          <div className="fw-help-controls">
            <button className="fw-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="fw-help-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="fw-help-tabs" role="tablist" aria-label="Major sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`fw-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="fw-help-main">
          <aside className="fw-help-toc" aria-label="Table of contents">
            <h2 className="fw-help-toc-title">Contents</h2>
            <ul className="fw-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="fw-help-content">
            <h1 className="fw-help-doc-title">Floyd-Warshall</h1>
            <p>
              Floyd-Warshall computes shortest paths between every pair of vertices by gradually allowing more intermediate nodes.
              It is compact, reliable, and easy to implement. With O(V^3) time and O(V^2) space, it shines on dense graphs and small
              networks where a full distance matrix unlocks instant queries.
            </p>
            <p>
              <Link to="/algoViz" className="fw-help-link">
                Back to Catalog
              </Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="fw-help-section">
                  <h2 className="fw-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="fw-help-divider" />
                <section id="bp-prerequisites" className="fw-help-section">
                  <h2 className="fw-help-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="fw-help-divider" />
                <section id="bp-io" className="fw-help-section">
                  <h2 className="fw-help-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="fw-help-divider" />
                <section id="bp-formal" className="fw-help-section">
                  <h2 className="fw-help-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="fw-help-divider" />
                <section id="bp-history" className="fw-help-section">
                  <h2 className="fw-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="fw-help-divider" />
                <section id="bp-takeaways" className="fw-help-section">
                  <h2 className="fw-help-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-concepts" className="fw-help-section">
                  <h2 className="fw-help-heading">Core Concepts</h2>
                  {coreConcepts.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-models" className="fw-help-section">
                  <h2 className="fw-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-mechanics" className="fw-help-section">
                  <h2 className="fw-help-heading">How It Works</h2>
                  {howItWorks.map((item) => (
                    <p key={item.step}><strong>{item.step}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-flow" className="fw-help-section">
                  <h2 className="fw-help-heading">Step-by-Step Flow</h2>
                  <ol>{stepByStepFlow.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-matrix" className="fw-help-section">
                  <h2 className="fw-help-heading">Matrix Mechanics</h2>
                  {matrixInsights.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-data" className="fw-help-section">
                  <h2 className="fw-help-heading">Data Structures and Invariants</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-correctness" className="fw-help-section">
                  <h2 className="fw-help-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-complexity" className="fw-help-section">
                  <h2 className="fw-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>
                    Floyd-Warshall is the APSP workhorse when the graph is dense or the vertex count is small enough to fit a full V^2
                    distance table in memory.
                  </p>
                  <ul>
                    {complexityTable.map((row) => (
                      <li key={row.approach}>
                        <strong>{row.approach}:</strong> Time {row.time}, Space {row.space}. {row.note}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-applications" className="fw-help-section">
                  <h2 className="fw-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-edge-cases" className="fw-help-section">
                  <h2 className="fw-help-heading">Edge Cases Checklist</h2>
                  <ul>{edgeCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-pitfalls" className="fw-help-section">
                  <h2 className="fw-help-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-decision" className="fw-help-section">
                  <h2 className="fw-help-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-implementation" className="fw-help-section">
                  <h2 className="fw-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-variants" className="fw-help-section">
                  <h2 className="fw-help-heading">Variants and Tradeoffs</h2>
                  <ul>
                    {variantTable.map((row) => (
                      <li key={row.variant}><strong>{row.variant}:</strong> {row.guarantee}. Tradeoff: {row.tradeoff}.</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="fw-help-section">
                  <h2 className="fw-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="fw-help-section">
                <h2 className="fw-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="fw-help-subheading">{example.title}</h3>
                    <div className="fw-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="fw-help-section">
                <h2 className="fw-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

