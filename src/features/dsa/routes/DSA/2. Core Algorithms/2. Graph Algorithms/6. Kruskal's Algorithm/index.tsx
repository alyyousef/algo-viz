import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Boruvka sets the stage (1926)',
    detail:
      'Otakar Boruvka published an algorithm for electrifying Moravia, showing how to pick cheapest edges per component to build a minimum-cost network.',
  },
  {
    title: 'Kruskal publishes his greedy algorithm (1956)',
    detail:
      'Joseph Kruskal formalized the sort-edges-then-union approach, proving it optimal via the cut and cycle properties.',
  },
  {
    title: 'Union-Find accelerates MSTs (1960s-1970s)',
    detail:
      'Disjoint-set forests with path compression and union by rank turned Kruskal into a practical near-linear tool after sorting.',
  },
  {
    title: 'Tarjan analyzes Union-Find (1975)',
    detail:
      'Robert Tarjan showed path compression and union by rank run in almost constant amortized time, making Kruskal effectively O(E log V) dominated by sorting.',
  },
  {
    title: 'Parallel and clustered MSTs (1990s to today)',
    detail:
      'Boruvka-Kruskal hybrids and batch-sorting variants adapt Kruskal to parallel hardware and clustering pipelines.',
  },
]

const mentalModels = [
  {
    title: 'Cheapest bridges between islands',
    detail:
      'Sort all possible bridges by cost. Add a bridge if it connects two different islands; skip it if it would create a loop. You stop when everyone is connected.',
  },
  {
    title: 'Cycle veto',
    detail:
      'The heaviest edge in any cycle is never needed. Sorting light-to-heavy ensures cycles are broken by refusing edges that close a loop.',
  },
  {
    title: 'Global order, local merges',
    detail:
      'A single global ordering of edges drives purely local decisions about connectivity. Union-Find keeps those connectivity checks constant-time in practice.',
  },
  {
    title: 'Forest to tree',
    detail:
      'Kruskal starts with every vertex as a tiny tree and merges them with the cheapest safe edges until only one tree remains.',
  },
]

const mechanics = [
  {
    heading: 'Prepare the edge list',
    bullets: [
      'Collect all edges as (u, v, w).',
      'Sort by non-decreasing weight. Buckets or radix sort help when weights are small integers.',
    ],
  },
  {
    heading: 'Initialize components',
    bullets: [
      'Make-set for each vertex in a Union-Find.',
      'Optionally tie-break equal weights by vertex id for deterministic output.',
    ],
  },
  {
    heading: 'Scan and union',
    bullets: [
      'For each edge in sorted order, find the roots of its endpoints.',
      'If roots differ, union them and accept the edge into the MST/forest.',
      'Stop after V - 1 edges are accepted for each connected component.',
    ],
  },
  {
    heading: 'Cycle and cut safety',
    bullets: [
      'Cycle property: in any cycle, drop the heaviest edge safely. Sorting ensures those heavy edges appear later and get skipped.',
      'Cut property: the lightest edge crossing any cut is always safe. Kruskal will eventually accept it when reached.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Edge list ready',
    detail:
      'If your data already comes as a list of weighted edges, Kruskal fits naturally.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'When E is near V, sorting is cheap and Union-Find dominates in speed.',
  },
  {
    title: 'Clustering by connectivity',
    detail:
      'Single-linkage clustering is Kruskal plus a cutoff on the heaviest edges.',
  },
  {
    title: 'Baseline cost audits',
    detail:
      'MST weight gives a minimal cost benchmark before adding redundancy.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'Kruskal minimizes total tree weight, not the distance between specific pairs.',
  },
]

const loopInvariants = [
  {
    title: 'Forest invariant',
    detail:
      'At every step, accepted edges form a forest that can be extended into some MST.',
  },
  {
    title: 'Cycle-free invariant',
    detail:
      'Union-Find guarantees no accepted edge creates a cycle.',
  },
  {
    title: 'Cut safety invariant',
    detail:
      'Any accepted edge is the lightest edge crossing some cut, so it is safe to include.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Edges sorted: (A-B 1), (B-C 2), (A-C 3), (C-D 4)',
    note: 'Kruskal will pick edges in ascending order if they do not form cycles.',
  },
  {
    step: 'Pick A-B (1)',
    state: 'Forest: {A-B} | {C} | {D}',
    note: 'No cycle, so include the edge.',
  },
  {
    step: 'Pick B-C (2)',
    state: 'Forest: {A-B-C} | {D}',
    note: 'Still no cycle, merge components.',
  },
  {
    step: 'Skip A-C (3)',
    state: 'Would form cycle A-B-C-A',
    note: 'Cycle property says the heaviest edge in a cycle is never needed.',
  },
  {
    step: 'Pick C-D (4)',
    state: 'MST complete with 3 edges',
    note: 'We now have V - 1 edges, so the MST is complete.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(E log E) for sorting; Union-Find adds O(E alpha(V)) (inverse Ackermann, effectively constant). With small integer weights and buckets, sorting can approach O(E).',
  },
  {
    title: 'Space',
    detail:
      'O(V) for Union-Find plus O(E) to hold/sort edges. A streaming variant can process edges in batches if memory is tight.',
  },
  {
    title: 'Early exit',
    detail:
      'Stop after V - 1 accepted edges per component. On sparse graphs this trims useless scans of heavy edges.',
  },
  {
    title: 'Determinism',
    detail:
      'Equal-weight edges can yield multiple valid MSTs. Stable sorting or tie-breaking by vertex id makes results reproducible.',
  },
]

const inputSensitivity = [
  {
    title: 'Disconnected graphs',
    detail:
      'Kruskal naturally returns a minimum spanning forest.',
  },
  {
    title: 'Duplicate weights',
    detail:
      'Multiple valid MSTs can exist; tests should compare total weight, not exact edge sets.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Sorting all edges can be expensive; Prim often wins on dense adjacency-driven graphs.',
  },
  {
    title: 'Small integer weights',
    detail:
      'Bucketed sorting drops the log factor and speeds up Kruskal substantially.',
  },
]

const performanceProfile = [
  {
    title: 'Sorting dominates',
    detail:
      'Most runtime is spent sorting edges; Union-Find is almost constant-time.',
  },
  {
    title: 'Union-Find quality',
    detail:
      'Path compression and union by rank are essential for near-linear behavior.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Edges must be held for sorting; consider external sorting on massive graphs.',
  },
  {
    title: 'Early termination',
    detail:
      'Once V - 1 edges are chosen, stop scanning to avoid heavy-edge overhead.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Kruskal',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Sparse graphs with edge list',
    notes: 'Simple with Union-Find, edge-driven.',
  },
  {
    algorithm: 'Prim',
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    bestFor: 'Dense graphs or adjacency access',
    notes: 'Grows from a seed, adjacency-driven.',
  },
  {
    algorithm: 'Boruvka',
    time: 'O(E log V)',
    space: 'O(V + E)',
    bestFor: 'Parallel settings',
    notes: 'Merges components in rounds.',
  },
  {
    algorithm: 'Reverse-delete',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Teaching cycle property',
    notes: 'Removes heavy edges if connectivity remains.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Laying minimal-cost fiber, power, or road backbones when costs are already tabulated as an edge list.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage clustering: run Kruskal, then cut the k - 1 largest edges of the MST to form k clusters.',
  },
  {
    context: 'Approximation baselines',
    detail:
      'MST cost bounds show up in TSP heuristics, Steiner tree approximations, and redundancy audits.',
  },
  {
    context: 'Graphics and games',
    detail:
      'Procedural map generation and level design use MSTs to ensure connectivity while removing loops from dungeon graphs.',
  },
  {
    context: 'Infrastructure audits',
    detail:
      'MSTs provide a minimal baseline before adding redundant edges for reliability.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bucketed Kruskal',
    detail:
      'Replace comparison sorting with buckets for small integer weights to remove log factors.',
  },
  {
    title: 'Boruvka-Kruskal hybrid',
    detail:
      'Use Boruvka rounds to shrink components, then finish with Kruskal on the contracted graph.',
  },
  {
    title: 'Streaming Kruskal',
    detail:
      'Sort edges externally and stream once through Union-Find to handle graphs bigger than memory.',
  },
  {
    title: 'Reverse-delete',
    detail:
      'Sort edges descending and remove if connectivity is preserved; illustrates the cycle property.',
  },
]

const examples = [
  {
    title: "Kruskal's with Union-Find (TypeScript-like pseudocode)",
    code: `function kruskal(vertices: number[], edges: [number, number, number][]): [number, number, number][] {
  edges.sort((a, b) => a[2] - b[2]); // sort by weight
  const uf = new UnionFind(vertices);
  const mst: [number, number, number][] = [];

  for (const [u, v, w] of edges) {
    if (uf.find(u) !== uf.find(v)) {
      uf.union(u, v);
      mst.push([u, v, w]);
      if (mst.length === vertices.length - 1) break; // early exit
    }
  }
  return mst;
}

class UnionFind {
  parent: Map<number, number>;
  rank: Map<number, number>;
  constructor(nodes: number[]) {
    this.parent = new Map(nodes.map((x) => [x, x]));
    this.rank = new Map(nodes.map((x) => [x, 0]));
  }
  find(x: number): number {
    const p = this.parent.get(x)!;
    if (p !== x) this.parent.set(x, this.find(p)); // path compression
    return this.parent.get(x)!;
  }
  union(a: number, b: number): void {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return;
    const raRank = this.rank.get(ra)!;
    const rbRank = this.rank.get(rb)!;
    if (raRank < rbRank) [ra, rb] = [rb, ra];
    this.parent.set(rb, ra);
    if (raRank === rbRank) this.rank.set(ra, raRank + 1);
  }
}`,
    explanation:
      'Sorting once and using Union-Find keeps cycle checks near-constant. Early exit avoids scanning the heaviest edges once the tree is complete.',
  },
  {
    title: 'Bucketed Kruskal for small integer weights',
    code: `function bucketedKruskal(vertices, edges, maxW):
    buckets = array of lists length maxW + 1
    for (u, v, w) in edges:
        buckets[w].append((u, v))
    uf = new UnionFind(vertices)
    mst = []
    for w from 0 to maxW:
        for (u, v) in buckets[w]:
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                mst.append((u, v, w))
                if len(mst) == len(vertices) - 1:
                    return mst
    return mst`,
    explanation:
      'Replacing comparison sort with buckets drops the log factor when weights are bounded, a common optimization in competitive programming and low-range cost graphs.',
  },
  {
    title: 'Early stop for k-clustering',
    code: `function kruskalKClusters(vertices, edges, k):
    sort edges by w ascending
    uf = new UnionFind(vertices)
    clusters = len(vertices)
    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            clusters -= 1
            if clusters == k:
                return`,
    explanation:
      'Stop once there are k components to get single-linkage clusters. The last accepted edge defines spacing between clusters.',
  },
]

const pitfalls = [
  'Omitting path compression or union by rank degrades performance to near O(E log V) on finds alone.',
  'Skipping early exit wastes scans on dense graphs after the MST is complete.',
  'Assuming connectivity: disconnected inputs produce a minimum spanning forest. Handle that if a single tree is expected.',
  'Unstable handling of equal weights can lead to nondeterministic forests; tie-break if reproducibility matters.',
  'Sorting edges from an adjacency matrix of a dense graph is expensive in memory and time; prefer Prim for dense adjacency-driven cases.',
  'Confusing MST with shortest path trees; MST does not minimize pairwise distances.',
]

const decisionGuidance = [
  'Edge list ready and graph is sparse: Kruskal is a strong choice.',
  'Dense or adjacency-driven graphs: Prim (with a binary or Fibonacci heap) often wins.',
  'Small integer weights: bucketed Kruskal trims the log factor.',
  'Disconnected graphs: Kruskal naturally yields a spanning forest without extra changes.',
  'Need parallelism: consider Boruvka or Boruvka-Kruskal hybrids for component-wise parallel edge picking.',
]

const implementationTips = [
  {
    title: 'Use Union-Find with compression',
    detail:
      'Path compression and union by rank keep find/union operations nearly constant.',
  },
  {
    title: 'Early exit',
    detail:
      'Stop after V - 1 accepted edges to avoid scanning heavy edges.',
  },
  {
    title: 'Stable tie-breaking',
    detail:
      'If weights tie, sort by (w, u, v) to keep output deterministic.',
  },
  {
    title: 'Prefer edge lists',
    detail:
      'Kruskal is edge-driven; avoid adjacency matrices on sparse graphs.',
  },
  {
    title: 'Handle forests',
    detail:
      'If connectivity is required, verify components after the run.',
  },
]

const advancedInsights = [
  {
    title: 'Cycle vs cut duality',
    detail:
      'Kruskal is often taught with the cycle property, but every acceptance also satisfies the cut property: the first time an edge crosses a cut, it is the lightest, so it is safe.',
  },
  {
    title: 'Union-Find amortized costs',
    detail:
      'With path compression and union by rank, total Union-Find cost is O((V + E) alpha(V)), effectively constant in practice.',
  },
  {
    title: 'Streaming and external memory',
    detail:
      'When edges do not fit in RAM, sort in runs and stream through once with Union-Find. Kruskal remains I/O-friendly because it requires only a single sorted pass.',
  },
  {
    title: 'Clustering linkage',
    detail:
      'Single-linkage clustering is exactly Kruskal with a cut: halt after forming k components or cut the k - 1 heaviest edges of the MST.',
  },
  {
    title: 'Replacement edges',
    detail:
      'For sensitivity analysis, replacing one MST edge with a non-tree edge forms a cycle; swapping the heaviest edge on that cycle adjusts the MST with minimal cost impact.',
  },
]

const takeaways = [
  "Kruskal's sorts edges globally and uses Union-Find to add only cycle-free edges, guaranteeing an MST in O(E log E).",
  'The algorithm is simple, deterministic with tie-breaks, and excels on sparse edge lists.',
  'Union-Find optimizations are essential; without them the performance degrades sharply.',
  'Use Kruskal when edge lists are ready and weights are sortable; pivot to Prim or Boruvka when density or parallelism demands it.',
  'References: Kruskal 1956, Tarjan Union-Find, and CLRS MST chapter.',
]

const glossary = [
  { term: 'Minimum spanning tree (MST)', definition: 'A cycle-free edge set connecting all vertices with minimum total weight.' },
  {
    term: 'Minimum spanning forest',
    definition: 'Kruskal output on disconnected graphs: one MST per connected component.',
  },
  {
    term: 'Union-Find (disjoint set union)',
    definition: 'Structure that tracks connected components with near-constant amortized find/union.',
  },
  { term: 'Path compression', definition: 'Union-Find optimization that flattens parent chains during find.' },
  { term: 'Union by rank', definition: 'Union-Find optimization that keeps trees shallow during union.' },
  { term: 'Cut property', definition: 'Lightest edge crossing any cut is safe to include in some MST.' },
  { term: 'Cycle property', definition: 'Heaviest edge in a cycle can be excluded without harming optimality.' },
  { term: 'Early exit', definition: 'Stop after choosing V - 1 edges per connected component.' },
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
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-apps', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-inputs', label: 'Input Sensitivity' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-variants', label: 'Variants and Extensions' },
    { id: 'core-tips', label: 'Implementation Tips' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-notes', label: 'Clustering Notes' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const kruskalHelpStyles = `
.kruskal98-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.kruskal98-window{width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040}
.kruskal98-titlebar{position:relative;display:flex;align-items:center;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.kruskal98-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px}
.kruskal98-controls{display:flex;gap:2px;margin-left:auto}
.kruskal98-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;cursor:pointer}
.kruskal98-tabs{display:flex;gap:1px;padding:6px 8px 0}
.kruskal98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer}
.kruskal98-tab.active{background:#fff;position:relative;top:1px}
.kruskal98-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr}
.kruskal98-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto}
.kruskal98-toc-title{font-size:12px;font-weight:700;margin:0 0 10px}
.kruskal98-toc-list{list-style:none;margin:0;padding:0}
.kruskal98-toc-list li{margin:0 0 8px}
.kruskal98-toc-list a{color:#000;text-decoration:none;font-size:12px}
.kruskal98-content{padding:14px 20px 20px;overflow:auto}
.kruskal98-doc-title{font-size:20px;font-weight:700;margin:0 0 12px}
.kruskal98-section{margin:0 0 20px}
.kruskal98-heading{font-size:16px;font-weight:700;margin:0 0 8px}
.kruskal98-subheading{font-size:13px;font-weight:700;margin:0 0 6px}
.kruskal98-content p,.kruskal98-content li,.kruskal98-content td,.kruskal98-content th{font-size:12px;line-height:1.5}
.kruskal98-content p{margin:0 0 10px}
.kruskal98-content ul,.kruskal98-content ol{margin:0 0 10px 20px;padding:0}
.kruskal98-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.kruskal98-table{width:100%;border-collapse:collapse;margin:0 0 10px}
.kruskal98-table th,.kruskal98-table td{text-align:left;border-bottom:1px solid #d0d0d0;padding:4px 6px;vertical-align:top}
.kruskal98-codebox{background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;padding:8px;margin:6px 0 10px}
.kruskal98-codebox code{font-family:"Courier New",Courier,monospace;font-size:12px;white-space:pre;display:block}
@media (max-width:900px){.kruskal98-main{grid-template-columns:1fr}.kruskal98-toc{border-right:none;border-bottom:1px solid #808080}}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function KruskalsAlgorithmPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Kruskal's Algorithm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: "Kruskal's Algorithm",
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    let parsedTasks: Array<{ id: string }>
    try {
      parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    } catch {
      parsedTasks = []
    }
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
    <div className="kruskal98-page">
      <style>{kruskalHelpStyles}</style>
      <div className="kruskal98-window" role="presentation">
        <header className="kruskal98-titlebar">
          <span className="kruskal98-title">Kruskal&apos;s Algorithm - Help</span>
          <div className="kruskal98-controls">
            <button className="kruskal98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="kruskal98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="kruskal98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`kruskal98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="kruskal98-main">
          <aside className="kruskal98-toc" aria-label="Table of contents">
            <h2 className="kruskal98-toc-title">Contents</h2>
            <ul className="kruskal98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="kruskal98-content">
            <h1 className="kruskal98-doc-title">Kruskal&apos;s Algorithm</h1>
            <p>
              Kruskal builds a minimum spanning tree by globally sorting edges and locally unioning components when a light edge
              connects them. The cycle and cut properties justify the greedy choices, while Union-Find keeps connectivity checks
              effectively constant time.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Overview</h2>
                  <p>
                    Kruskal is the global MST strategy: sort every edge light to heavy, then add an edge if it connects two different
                    components. Cycle edges are skipped automatically by Union-Find. The process halts after V - 1 accepted edges per
                    component, yielding an MST or a spanning forest for disconnected inputs.
                  </p>
                </section>
                <hr className="kruskal98-divider" />
                <section id="bp-history" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-mental" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-patterns" className="kruskal98-section">
                  <h2 className="kruskal98-heading">How to Think About Similar Problems</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-apps" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-takeaways" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mechanics" className="kruskal98-section">
                  <h2 className="kruskal98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="kruskal98-subheading">{block.heading}</h3>
                      <ul>{block.bullets.map((point) => <li key={point}>{point}</li>)}</ul>
                    </div>
                  ))}
                </section>
                <section id="core-invariants" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Loop Invariants (Why It Is Correct)</h2>
                  {loopInvariants.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-trace" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Worked Trace on a Tiny Graph</h2>
                  {stepTrace.map((item) => <p key={item.step}><strong>{item.step}:</strong> {item.state}. {item.note}</p>)}
                </section>
                <section id="core-complexity" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Complexity Analysis and Intuition</h2>
                  {complexityNotes.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-inputs" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-performance" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-compare" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Compare and Contrast</h2>
                  <table className="kruskal98-table">
                    <thead>
                      <tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Best for</th><th>Notes</th></tr>
                    </thead>
                    <tbody>
                      {comparisonTable.map((row) => (
                        <tr key={row.algorithm}>
                          <td>{row.algorithm}</td><td>{row.time}</td><td>{row.space}</td><td>{row.bestFor}</td><td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-variants" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Variants and Extensions</h2>
                  {variantsAndTweaks.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-tips" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-pitfalls" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-when" className="kruskal98-section">
                  <h2 className="kruskal98-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-advanced" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-practical" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="kruskal98-subheading">{example.title}</h3>
                      <div className="kruskal98-codebox"><code>{example.code.trim()}</code></div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-notes" className="kruskal98-section">
                  <h2 className="kruskal98-heading">Clustering and Baseline Notes</h2>
                  <p><strong>Single-linkage clustering:</strong> run Kruskal, then cut the k - 1 largest edges of the MST to form k clusters.</p>
                  <p><strong>Approximation baselines:</strong> MST cost bounds show up in TSP heuristics, Steiner tree approximations, and redundancy audits.</p>
                  <p><strong>Infrastructure audits:</strong> MSTs provide a minimal baseline before adding redundant edges for reliability.</p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="kruskal98-section">
                <h2 className="kruskal98-heading">Glossary</h2>
                {glossary.map((item) => <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>)}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
