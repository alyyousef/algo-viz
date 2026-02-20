import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'All-pairs on sparse graphs',
    detail:
      'Johnson runs one Bellman-Ford plus V Dijkstra passes, beating Floyd-Warshall when edges are far fewer than V^2.',
  },
  {
    title: 'Negative edges, no negative cycles',
    detail:
      'It tolerates negative weights by reweighting them to nonnegative values while preserving shortest paths.',
  },
  {
    title: 'Reusable single-source core',
    detail:
      'After reweighting, you can plug in any fast Dijkstra implementation and reuse it for every source.',
  },
]

const historicalMilestones = [
  {
    title: '1958: Bellman-Ford handles negatives',
    detail:
      'Dynamic relaxation across edges lets single-source shortest paths work even with negative weights.',
  },
  {
    title: '1959: Dijkstra unlocks speed',
    detail:
      'Greedy selection yields fast shortest paths when all edge weights are nonnegative.',
  },
  {
    title: '1962: Floyd-Warshall for all pairs',
    detail:
      'A clean O(V^3) dynamic program solved APSP but struggled with large sparse graphs.',
  },
  {
    title: '1977: Johnson merges the best of both',
    detail:
      'Reweighting + Dijkstra enables APSP on sparse graphs with negative edges, avoiding cubic time.',
  },
]

const prerequisites = [
  {
    title: 'Directed weighted graph',
    detail:
      'Johnson works on directed graphs with possible negative edges and no negative cycles.',
  },
  {
    title: 'All-pairs objective',
    detail:
      'Designed for APSP on sparse graphs where V runs of Dijkstra are feasible.',
  },
  {
    title: 'Edge list + adjacency list',
    detail:
      'Bellman-Ford benefits from an edge list; Dijkstra benefits from adjacency lists.',
  },
  {
    title: 'Nonnegative Dijkstra requirement',
    detail:
      'Reweighting must produce nonnegative edges before any Dijkstra run.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights. Optionally choose a subset of sources.',
  },
  {
    title: 'Output',
    detail:
      'All-pairs shortest path distances (or selected rows), or negative cycle report.',
  },
  {
    title: 'Optional',
    detail:
      'Parent pointers for reconstructing paths per source.',
  },
]

const formalDefinitions = [
  {
    title: 'Potential h(v)',
    detail:
      'Shortest distance from super-source s* to v computed by Bellman-Ford.',
  },
  {
    title: 'Reweighted edge',
    detail:
      "w'(u, v) = w(u, v) + h(u) - h(v), guaranteed to be nonnegative.",
  },
  {
    title: 'Distance recovery',
    detail:
      "d(u, v) = d'(u, v) - h(u) + h(v).",
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If Bellman-Ford relaxes on the V-th pass, shortest paths are undefined.',
  },
]

const coreConcepts = [
  {
    title: 'Potential function h(v)',
    detail:
      'Bellman-Ford on a super-source computes potentials h(v) used to shift edge weights without changing shortest paths.',
  },
  {
    title: 'Edge reweighting',
    detail:
      "Each edge (u, v) becomes w'(u, v) = w(u, v) + h(u) - h(v). This guarantees nonnegative weights.",
  },
  {
    title: 'Distance recovery',
    detail:
      "Run Dijkstra on the reweighted graph to get d'. Convert back: d(u, v) = d'(u, v) - h(u) + h(v).",
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If Bellman-Ford finds a negative cycle, no finite shortest paths exist and Johnson must stop.',
  },
]

const mentalModels = [
  {
    title: 'Terrain leveling',
    detail:
      'Potentials act like raising or lowering the ground so every downhill edge disappears, yet relative path lengths stay the same.',
  },
  {
    title: 'Tax and rebate',
    detail:
      'Add a tax h(u) when leaving u and rebate h(v) when arriving at v. Total path cost is unchanged.',
  },
]

const pipelineSteps = [
  {
    step: '1. Add a super-source',
    detail: 'Connect a new node s* to every vertex with edge weight 0.',
  },
  {
    step: '2. Run Bellman-Ford',
    detail: 'Compute h(v) shortest distances from s*. Detect any negative cycle.',
  },
  {
    step: '3. Reweight edges',
    detail: "Shift every edge using w'(u, v) = w(u, v) + h(u) - h(v).",
  },
  {
    step: '4. Run Dijkstra per source',
    detail: 'Use Dijkstra from every vertex on the nonnegative reweighted graph.',
  },
  {
    step: '5. Recover original distances',
    detail: "Convert d' back to true distances using d(u, v) = d'(u, v) - h(u) + h(v).",
  },
]

const stepByStepFlow = [
  'Add a super-source s* with 0-weight edges to every vertex.',
  'Run Bellman-Ford from s* to compute potentials h(v).',
  'If a negative cycle is detected, abort and report it.',
  "Reweight all edges using w'(u, v) = w(u, v) + h(u) - h(v).",
  'Run Dijkstra from each source to compute d\'(u, v).',
  'Recover original distances using d(u, v) = d\'(u, v) - h(u) + h(v).',
]

const dataStructures = [
  {
    title: 'Edge list',
    detail:
      'Needed for Bellman-Ford relaxation over all edges.',
  },
  {
    title: 'Adjacency list',
    detail:
      'Used by Dijkstra for efficient neighbor iteration.',
  },
  {
    title: 'Potential array h',
    detail:
      'Stores Bellman-Ford distances from s* for reweighting.',
  },
  {
    title: 'Distance table',
    detail:
      'All-pairs distances stored as V rows or computed on demand.',
  },
]

const correctnessNotes = [
  {
    title: 'Nonnegativity guarantee',
    detail:
      "Bellman-Ford ensures h(v) <= h(u) + w(u, v), so w'(u, v) >= 0.",
  },
  {
    title: 'Path order preserved',
    detail:
      'All paths between the same endpoints shift by the same constant.',
  },
  {
    title: 'Negative cycle stop',
    detail:
      'Any negative cycle makes shortest paths undefined, so Johnson must terminate.',
  },
]

const reweightingDetails = [
  {
    title: 'Why weights become nonnegative',
    detail:
      "Because h(v) is a shortest distance from s*, Bellman-Ford guarantees h(v) <= h(u) + w(u, v). Rearranging gives w'(u, v) >= 0.",
  },
  {
    title: 'Why paths are preserved',
    detail:
      'Every path cost shifts by h(source) - h(target), so the relative ordering of paths between the same endpoints is unchanged.',
  },
  {
    title: 'What breaks the algorithm',
    detail:
      'A negative cycle means distances are not well-defined. Bellman-Ford detects this before any Dijkstra runs.',
  },
  {
    title: 'Directed and undirected graphs',
    detail:
      'Johnson works for directed graphs. For undirected graphs with negative edges, a negative cycle exists immediately.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Bellman-Ford is O(VE). Dijkstra repeated V times is O(VE log V) with a binary heap.',
  },
  {
    title: 'Space complexity',
    detail:
      'Store the graph plus distance table: O(V + E) for adjacency lists and O(V^2) for all-pairs results.',
  },
  {
    title: 'When it wins',
    detail:
      'Sparse graphs (E near V) make Johnson faster than Floyd-Warshall. Dense graphs favor O(V^3).',
  },
  {
    title: 'Priority queue choice',
    detail:
      'Fibonacci heaps reduce Dijkstra to O(E + V log V) but are complex; binary heaps win in practice.',
  },
]

const complexityTable = [
  {
    approach: 'Johnson (Bellman-Ford + Dijkstra)',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Best for sparse graphs with possible negative edges.',
  },
  {
    approach: 'Floyd-Warshall',
    time: 'O(V^3)',
    space: 'O(V^2)',
    note: 'Simple and cache friendly on dense graphs.',
  },
  {
    approach: 'Repeated Dijkstra (no negatives)',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Same as Johnson without the reweighting step.',
  },
]

const realWorldUses = [
  {
    context: 'Routing with penalties',
    detail:
      'Model tolls or discounts as negative edges, but avoid negative cycles so shortest paths remain meaningful.',
  },
  {
    context: 'Graph analytics pipelines',
    detail:
      'Precompute all-pairs distances for recommendations or clustering on sparse, directed graphs.',
  },
  {
    context: 'Timetable networks',
    detail:
      'Transfers with credits (negative edges) can be handled safely while still finding cheapest routes.',
  },
  {
    context: 'Constraint graphs',
    detail:
      'Difference constraints reduce to shortest paths; Johnson enables fast multi-source queries after reweighting.',
  },
]

const edgeCases = [
  'Disconnected vertices: super-source ensures finite potentials, but unreachable pairs remain Infinity after Dijkstra.',
  'Undirected negative edge: immediately implies a negative cycle and must be rejected.',
  'Multiple edges: reweight each edge separately; keep minimum when storing adjacency.',
  'Large graphs: storing full V^2 matrix may be too expensive; compute rows lazily.',
]

const examples = [
  {
    title: "Johnson's algorithm (high level)",
    code: `function johnson(graph):
    add superSource s* with 0 edges to all vertices
    h = bellmanFord(graph + s*, s*)
    if h has negative cycle: error
    for each edge (u, v):
        w'(u, v) = w(u, v) + h[u] - h[v]
    for each vertex s:
        d' = dijkstra(graph', s)
        for each vertex v:
            d[s][v] = d'[v] - h[s] + h[v]
    return d`,
    explanation:
      'The potentials h remove all negative edges. Dijkstra then runs safely for each source and distances are shifted back.',
  },
  {
    title: 'Bellman-Ford to compute potentials',
    code: `function bellmanFord(graph, source):
    dist = array(V, +infinity)
    dist[source] = 0
    repeat V - 1 times:
        for each edge (u, v, w):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for each edge (u, v, w):
        if dist[u] + w < dist[v]:
            return NEGATIVE_CYCLE
    return dist`,
    explanation:
      'A final relaxation pass detects negative cycles. These make shortest paths undefined.',
  },
  {
    title: 'Reweighting and recovery',
    code: `// After computing h
for each edge (u, v, w):
    wPrime = w + h[u] - h[v]  // nonnegative

// After Dijkstra from source s
for each vertex v:
    originalDist = distPrime[v] - h[s] + h[v]`,
    explanation:
      'Reweighting preserves path ordering, and the recovery formula restores true distances.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges:
1->2 (2), 2->3 (-5), 1->3 (4)

Add s* with 0 edges, run Bellman-Ford:
h(1)=0, h(2)=0, h(3)=-5

Reweight:
w'(1,2)=2, w'(2,3)=0, w'(1,3)=9

Dijkstra from 1 gives d'(1,3)=2
Recover: d(1,3)=2 - h(1) + h(3) = -3`,
    explanation:
      'Reweighting removes negative edges, but recovered distances preserve original shortest paths.',
  },
]

const pitfalls = [
  'Skipping the negative cycle check. If a negative cycle exists, Johnson must terminate immediately.',
  'Using Dijkstra on the original graph. It only works after reweighting produces nonnegative edges.',
  'Forgetting to add the super-source with zero edges, leading to incorrect potentials for disconnected vertices.',
  'Mixing adjacency matrix and list assumptions; Johnson is tuned for sparse adjacency lists.',
  'Storing all-pairs results for huge graphs without a memory plan; O(V^2) can dominate.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on sparse graphs with some negative edges: choose Johnson.',
  'Need all-pairs on dense graphs: Floyd-Warshall is simpler and often faster in practice.',
  'Need only one or few sources: run Bellman-Ford (if negatives) or Dijkstra (if nonnegative).',
  'Need repeated queries after a fixed graph: precompute Johnson once and reuse the distance table.',
  'Need to detect negative cycles: Bellman-Ford already gives the answer, no need for Johnson.',
]

const implementationNotes = [
  {
    title: 'Super-source wiring',
    detail:
      'Add s* edges to every vertex with weight 0 so all h values are defined.',
  },
  {
    title: 'Dijkstra optimization',
    detail:
      'Binary heap is typically fastest in practice; decrease-key can be emulated with lazy deletes.',
  },
  {
    title: 'Memory strategy',
    detail:
      'Store only required source rows if you do not need a full APSP table.',
  },
  {
    title: 'Infinity handling',
    detail:
      'Keep Infinity when a node is unreachable from a given source.',
  },
]

const variantTable = [
  {
    variant: "Johnson's Algorithm",
    guarantee: 'APSP with negative edges (no negative cycles)',
    tradeoff: 'O(VE log V) time, needs Bellman-Ford',
  },
  {
    variant: 'Repeated Dijkstra',
    guarantee: 'APSP with nonnegative edges',
    tradeoff: 'Same time but no negative edges allowed',
  },
  {
    variant: 'Floyd-Warshall',
    guarantee: 'APSP for dense graphs',
    tradeoff: 'O(V^3) time, O(V^2) memory',
  },
]

const advancedInsights = [
  {
    title: 'Potential reuse',
    detail:
      'If the graph changes slightly, incremental updates to h can sometimes avoid rerunning full Bellman-Ford.',
  },
  {
    title: 'Sparse priority queues',
    detail:
      'Pairing heaps or radix heaps can be faster than binary heaps when edge weights are small integers.',
  },
  {
    title: 'Hybrid APSP strategies',
    detail:
      'Some systems run Johnson for sparse regions and Floyd-Warshall for dense subgraphs to balance time and memory.',
  },
  {
    title: 'Matrix output compression',
    detail:
      'When only a subset of sources is queried, store rows lazily to avoid allocating the full V^2 table.',
  },
]

const takeaways = [
  'Johnson turns negative edges into nonnegative ones without changing shortest paths.',
  'A single Bellman-Ford pass plus V Dijkstra runs delivers fast all-pairs results on sparse graphs.',
  'Negative cycles stop everything; detect them early and report clearly.',
  'Performance depends on priority queues and graph sparsity more than on the reweighting math.',
]

const glossaryTerms = [
  { term: 'APSP', definition: 'All-pairs shortest paths over every source-target pair.' },
  { term: 'Potential h(v)', definition: 'Bellman-Ford distance from super-source to v used for reweighting.' },
  { term: 'Reweighted edge', definition: "w'(u,v)=w(u,v)+h(u)-h(v), guaranteed nonnegative." },
  { term: 'Super-source', definition: 'Added vertex with zero-weight edges to all vertices.' },
  { term: 'Distance recovery', definition: "d(u,v)=d'(u,v)-h(u)+h(v) after Dijkstra on reweighted graph." },
  { term: 'Negative cycle', definition: 'Cycle with negative total weight; shortest paths become undefined.' },
  { term: 'Bellman-Ford pass', definition: 'Edge-relaxation rounds used to compute potentials and cycle detection.' },
  { term: 'Dijkstra phase', definition: 'Per-source shortest path run on nonnegative reweighted edges.' },
  { term: 'Sparse graph regime', definition: 'When E is much smaller than V^2, where Johnson tends to win.' },
  { term: 'Lazy row materialization', definition: 'Store only queried source rows to avoid full V^2 allocation.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98JohnsonHelpStyles = `
.john-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.john-help-window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;background:#c0c0c0;width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;}
.john-help-titlebar{position:relative;display:flex;align-items:center;min-height:22px;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.john-help-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px;white-space:nowrap;}
.john-help-controls{display:flex;gap:2px;margin-left:auto;}
.john-help-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;}
.john-help-tabs{display:flex;gap:1px;padding:6px 8px 0;}
.john-help-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer;}
.john-help-tab.active{background:#fff;position:relative;top:1px;}
.john-help-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr;}
.john-help-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto;}
.john-help-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.john-help-toc-list{list-style:none;margin:0;padding:0;}
.john-help-toc-list li{margin:0 0 8px;}
.john-help-toc-list a{color:#000;text-decoration:none;font-size:12px;}
.john-help-content{padding:14px 20px 20px;overflow:auto;}
.john-help-doc-title{margin:0 0 10px;font-size:20px;font-weight:700;}
.john-help-content p,.john-help-content li{font-size:12px;line-height:1.5;}
.john-help-content p{margin:0 0 10px;}
.john-help-content ul,.john-help-content ol{margin:0 0 10px 20px;padding:0;}
.john-help-section{margin:0 0 20px;}
.john-help-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.john-help-subheading{margin:0 0 6px;font-size:13px;font-weight:700;}
.john-help-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0;}
.john-help-codebox{margin:6px 0 10px;padding:8px;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;background:#f4f4f4;}
.john-help-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;}
.john-help-link{color:#000080;}
@media (max-width:900px){.john-help-main{grid-template-columns:1fr;}.john-help-toc{border-right:none;border-bottom:1px solid #808080;}}
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
    { id: 'core-concepts-overview', label: 'Core Concepts' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-pipeline', label: 'Johnson Pipeline' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-reweighting', label: 'Reweighting Details' },
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

export default function JohnsonSAlgorithmPage(): JSX.Element {
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
    document.title = `Johnson's Algorithm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: "Johnson's Algorithm",
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
    <div className="john-help-page">
      <style>{win98JohnsonHelpStyles}</style>
      <div className="john-help-window" role="presentation">
        <header className="john-help-titlebar">
          <span className="john-help-title">Johnson&apos;s Algorithm - Help</span>
          <div className="john-help-controls">
            <button className="john-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="john-help-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="john-help-tabs" role="tablist" aria-label="Major sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`john-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="john-help-main">
          <aside className="john-help-toc" aria-label="Table of contents">
            <h2 className="john-help-toc-title">Contents</h2>
            <ul className="john-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="john-help-content">
            <h1 className="john-help-doc-title">Johnson&apos;s Algorithm</h1>
            <p>
              Johnson&apos;s Algorithm blends Bellman-Ford and Dijkstra to solve all-pairs shortest paths efficiently on sparse graphs.
              It uses a potential function to reweight edges so every Dijkstra run is safe, then shifts distances back to the original
              weights. The result is a practical APSP method that stays fast without giving up correctness on negative edges.
            </p>
            <p>
              <Link to="/algoViz" className="john-help-link">
                Back to Catalog
              </Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="john-help-section">
                  <h2 className="john-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="john-help-divider" />
                <section id="bp-prerequisites" className="john-help-section">
                  <h2 className="john-help-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="john-help-divider" />
                <section id="bp-io" className="john-help-section">
                  <h2 className="john-help-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="john-help-divider" />
                <section id="bp-formal" className="john-help-section">
                  <h2 className="john-help-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="john-help-divider" />
                <section id="bp-history" className="john-help-section">
                  <h2 className="john-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="john-help-divider" />
                <section id="bp-takeaways" className="john-help-section">
                  <h2 className="john-help-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-concepts-overview" className="john-help-section">
                  <h2 className="john-help-heading">Core Concepts</h2>
                  {coreConcepts.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-models" className="john-help-section">
                  <h2 className="john-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-pipeline" className="john-help-section">
                  <h2 className="john-help-heading">How It Works: Johnson Pipeline</h2>
                  {pipelineSteps.map((item) => (
                    <p key={item.step}><strong>{item.step}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-flow" className="john-help-section">
                  <h2 className="john-help-heading">How It Works: Step-by-Step Flow</h2>
                  <ol>{stepByStepFlow.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-reweighting" className="john-help-section">
                  <h2 className="john-help-heading">How It Works: Reweighting Details</h2>
                  {reweightingDetails.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-data" className="john-help-section">
                  <h2 className="john-help-heading">Data Structures and Invariants</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-correctness" className="john-help-section">
                  <h2 className="john-help-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-complexity" className="john-help-section">
                  <h2 className="john-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>
                    Johnson&apos;s advantage grows as the graph gets sparser. If E is close to V^2, the overhead of running Dijkstra V times
                    can outweigh Floyd-Warshall&apos;s simplicity.
                  </p>
                  <ul>
                    {complexityTable.map((row) => (
                      <li key={row.approach}>
                        <strong>{row.approach}:</strong> Time {row.time}, Space {row.space}. {row.note}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-applications" className="john-help-section">
                  <h2 className="john-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-edge-cases" className="john-help-section">
                  <h2 className="john-help-heading">Edge Cases Checklist</h2>
                  <ul>{edgeCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-pitfalls" className="john-help-section">
                  <h2 className="john-help-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-decision" className="john-help-section">
                  <h2 className="john-help-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-implementation" className="john-help-section">
                  <h2 className="john-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-variants" className="john-help-section">
                  <h2 className="john-help-heading">Variants and Tradeoffs</h2>
                  <ul>
                    {variantTable.map((row) => (
                      <li key={row.variant}><strong>{row.variant}:</strong> {row.guarantee}. Tradeoff: {row.tradeoff}.</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="john-help-section">
                  <h2 className="john-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="john-help-section">
                <h2 className="john-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="john-help-subheading">{example.title}</h3>
                    <div className="john-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="john-help-section">
                <h2 className="john-help-heading">Glossary</h2>
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

