import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Otakar Boruvka electrifies Moravia (1926)',
    detail:
      'Boruvka devised a greedy edge-picking procedure to minimize the cost of rural power networks, introducing one of the earliest MST algorithms.',
  },
  {
    title: 'Kruskal and Prim formalize greedy spanning (1956-1957)',
    detail:
      'Joseph Kruskal proposed sorting edges by weight and building a forest; Robert Prim showed how to grow a tree outward with a priority queue.',
  },
  {
    title: 'Dijkstra generalizes Prim (1959)',
    detail:
      'Edsger Dijkstra independently described the same tree-growing method as Prim, tying it to his shortest-path framework and popularizing heap-based implementations.',
  },
  {
    title: 'Union-Find proves its worth (1964-1973)',
    detail:
      'Tarjan and colleagues analyzed disjoint sets with near-constant amortized operations, making Kruskal blazingly fast for sparse graphs.',
  },
  {
    title: 'Parallel and dynamic MSTs emerge (1980s-2010s)',
    detail:
      'Shiloach-Vishkin, Karger-Klein-Tarjan, and later dynamic algorithms allowed MST maintenance under edge updates and parallel hardware.',
  },
]

const mentalModels = [
  {
    title: 'Cheapest backbone',
    detail:
      'An MST is the lean skeleton that keeps every vertex connected with minimal total weight. Any extra edge is a muscle you can trim without breaking connectivity.',
  },
  {
    title: 'Cycle breaker',
    detail:
      'Within any cycle, the heaviest edge is never needed in a minimum spanning tree. Removing it is like dropping the priciest plank from a closed loop.',
  },
  {
    title: 'Growing coral',
    detail:
      'Prim grows a coral reef from a seed, always attaching the lightest nearby branch. Kruskal grows many tiny corals that fuse when a cheap bridge appears.',
  },
  {
    title: 'Global versus local cheapest edge',
    detail:
      'Kruskal picks the globally cheapest eligible edge; Boruvka lets every component pick its local cheapest edge simultaneously, a pattern that parallelizes well.',
  },
]

const mechanics = [
  {
    heading: 'Kruskal: sort then union',
    bullets: [
      'Sort all edges by non-decreasing weight.',
      'Initialize each vertex as its own component (Union-Find).',
      'Scan edges in order; add an edge if its endpoints are in different components, then union them.',
      'Stop after adding V - 1 edges or when all vertices share one component.',
    ],
  },
  {
    heading: 'Prim/Dijkstra style: grow a tree',
    bullets: [
      'Pick any start vertex; push its incident edges into a min-priority queue keyed by weight.',
      'Repeatedly extract the lightest edge that leads to an unvisited vertex; add that vertex and its outgoing edges to the queue.',
      'Continue until all vertices are visited; the chosen edges form the MST.',
      'Binary heap gives O((V + E) log V); Fibonacci or pairing heaps can lower the decrease-key cost on dense graphs.',
    ],
  },
  {
    heading: 'Boruvka: rounds of local minima',
    bullets: [
      'For each component, pick its cheapest outgoing edge and add them all at once.',
      'Components merge in batches, shrinking the graph quickly; repeat rounds until one component remains.',
      'Parallel-friendly because each component chooses independently within a round.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Cheapest connectivity',
    detail:
      'When the goal is to keep everything connected at minimum total cost, MSTs are the right abstraction.',
  },
  {
    title: 'Backbone before redundancy',
    detail:
      'Start with an MST as a baseline, then add extra edges for fault tolerance and capacity.',
  },
  {
    title: 'Clustering by cutting edges',
    detail:
      'Removing the heaviest edges of an MST yields single-linkage clusters and hierarchical structure.',
  },
  {
    title: 'Similarity graphs',
    detail:
      'MSTs capture the most economical connections in similarity graphs for segmentation or feature grouping.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'MSTs minimize total weight of a connecting tree, not the cost between any particular pair of nodes.',
  },
]

const loopInvariants = [
  {
    title: 'Cut property invariant',
    detail:
      'The lightest edge crossing any cut that separates the current tree from the rest is always safe to add.',
  },
  {
    title: 'Cycle property invariant',
    detail:
      'Within any cycle, the heaviest edge is never required in an MST.',
  },
  {
    title: 'Forest invariant (Kruskal)',
    detail:
      'At every step, the selected edges form a forest of components that can be extended to some MST.',
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
    title: 'Kruskal cost profile',
    detail:
      'Sorting dominates: O(E log E) time with Union-Find nearly constant. With integer weights and buckets, it approaches O(E). Memory is O(V + E).',
  },
  {
    title: 'Prim variants',
    detail:
      'With a binary heap and adjacency lists: O((V + E) log V). With a Fibonacci heap: O(E + V log V). With a simple array: O(V^2), acceptable for dense graphs.',
  },
  {
    title: 'Boruvka behavior',
    detail:
      'Each round halves the number of components in expectation; total time is O(E log V) with straightforward structures, often faster in practice on parallel hardware.',
  },
  {
    title: 'Edge cases',
    detail:
      'Disconnected graphs yield a minimum spanning forest. Duplicate edge weights are fine; any MST of minimum total weight is valid.',
  },
]

const inputSensitivity = [
  {
    title: 'Disconnected graphs',
    detail:
      'Algorithms return a minimum spanning forest, one MST per connected component.',
  },
  {
    title: 'Duplicate weights',
    detail:
      'Multiple valid MSTs can exist; do not assume uniqueness in tests.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Prim with an array-based priority queue can be competitive due to O(V^2) scanning.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'Kruskal with Union-Find tends to be fastest because edge sorting dominates.',
  },
]

const performanceProfile = [
  {
    title: 'Sorting cost',
    detail:
      'Kruskal spends most time sorting; for large E, sorting dominates everything else.',
  },
  {
    title: 'Union-Find efficiency',
    detail:
      'Path compression and union by rank make merges nearly constant amortized.',
  },
  {
    title: 'Priority queue overhead',
    detail:
      'Prim depends on heap operations; decrease-key efficiency can matter in dense graphs.',
  },
  {
    title: 'Parallel friendliness',
    detail:
      'Boruvka is easy to parallelize by letting each component choose its cheapest edge in a round.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Kruskal',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Sparse graphs with edge list',
    notes: 'Simple with Union-Find, easy to implement.',
  },
  {
    algorithm: 'Prim',
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    bestFor: 'Dense graphs or adjacency lists',
    notes: 'Grows a single tree from a start node.',
  },
  {
    algorithm: 'Boruvka',
    time: 'O(E log V)',
    space: 'O(V + E)',
    bestFor: 'Parallel or distributed settings',
    notes: 'Merges components in rounds.',
  },
  {
    algorithm: 'Prim (array)',
    time: 'O(V^2)',
    space: 'O(V^2)',
    bestFor: 'Very dense graphs',
    notes: 'No heap; simpler but heavy memory.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Telecom, fiber, and power grids use MSTs to plan cheapest backbone deployments before layering redundancy and capacity upgrades.',
  },
  {
    context: 'Approximation schemes',
    detail:
      'Metric traveling salesperson approximations (e.g., doubling tree tours) start from an MST to bound total tour cost.',
  },
  {
    context: 'Image segmentation',
    detail:
      'Minimum spanning forests over pixel similarity graphs underpin algorithms like Felzenszwalb-Huttenlocher for grouping coherent regions.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage hierarchical clustering cuts the longest edges of an MST to form clusters, revealing chaining structure in data.',
  },
  {
    context: 'Infrastructure audits',
    detail:
      'MSTs provide a cost baseline; edges outside the MST indicate redundancies that can be pruned or justified for reliability.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Reverse-delete algorithm',
    detail:
      'Sort edges by descending weight and remove them if the graph stays connected; illustrates the cycle property.',
  },
  {
    title: 'Randomized MST',
    detail:
      'Karger-Klein-Tarjan uses random sampling to reduce edges before building the MST, improving performance on huge graphs.',
  },
  {
    title: 'Hybrid Boruvka + Prim',
    detail:
      'Use Boruvka rounds to shrink components, then Prim to finish quickly on the contracted graph.',
  },
  {
    title: 'Dynamic MST',
    detail:
      'Maintain an MST under edge insertions/deletions with link-cut or Euler tour trees.',
  },
]

const examples = [
  {
    title: 'Kruskal with Union-Find',
    code: `function kruskal(vertices, edges):
    // edges: list of (u, v, w)
    sort edges by w ascending
    uf = new UnionFind(vertices)
    mst = []

    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
        if len(mst) == len(vertices) - 1:
            break

    return mst`,
    explanation:
      'Sorting once and doing near-constant Union-Find operations keeps Kruskal lean. Early exit after V - 1 edges avoids needless scans in dense graphs.',
  },
  {
    title: 'Prim with a min-heap',
    code: `function prim(graph, start):
    visited = set()
    mst = []
    pq = new MinHeap() // entries: (w, u, v) where v is outside the tree

    visited.add(start)
    for (v, w) in graph.neighbors(start):
        pq.push((w, start, v))

    while pq not empty and len(visited) < graph.size():
        (w, u, v) = pq.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                pq.push((wt, v, nxt))

    return mst`,
    explanation:
      'The heap always surfaces the cheapest edge crossing the cut between the tree and the remaining vertices, satisfying the cut property that keeps the tree minimal.',
  },
  {
    title: 'Boruvka rounds',
    code: `function boruvka(graph):
    uf = new UnionFind(graph.vertices)
    mst = []

    while uf.component_count() > 1:
        cheapest = map from component -> (u, v, w) default null
        for (u, v, w) in graph.edges:
            cu = uf.find(u); cv = uf.find(v)
            if cu == cv:
                continue
            if cheapest[cu] is null or w < cheapest[cu].w:
                cheapest[cu] = (u, v, w)
            if cheapest[cv] is null or w < cheapest[cv].w:
                cheapest[cv] = (u, v, w)
        for edge in cheapest.values():
            if edge is null:
                continue
            (u, v, w) = edge
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                mst.append(edge)

    return mst`,
    explanation:
      'Each component grabs its cheapest outgoing edge. Parallelizing the per-edge scan and per-component choice makes Boruvka attractive on large hardware.',
  },
  {
    title: 'Reverse-delete algorithm',
    code: `function reverseDelete(vertices, edges):
    sort edges by w descending
    graph = buildGraph(vertices, edges)

    for (u, v, w) in edges:
        graph.removeEdge(u, v)
        if not graph.isConnected(u, v):
            graph.addEdge(u, v, w)

    return graph.edges`,
    explanation:
      'Reverse-delete removes heavy edges that are not needed to keep connectivity, illustrating the cycle property in action.',
  },
]

const pitfalls = [
  'Feeding negative cycles into MST algorithms is fine; weights can be negative, but remember MST optimizes total weight, not shortest paths.',
  'Using an adjacency matrix with Kruskal wastes memory and time on sparse graphs; store edges explicitly.',
  'Forgetting early exit in Kruskal on dense graphs does unnecessary work after the tree is already complete.',
  'Implementing Prim without a visited check can add duplicate vertices and corrupt the tree.',
  'Assuming a unique MST when edge weights tie can cause brittle tests; multiple valid MSTs may exist.',
  'Confusing MST with shortest path trees; MST does not minimize pairwise distances.',
]

const decisionGuidance = [
  'Sparse graph with many edges already listed: use Kruskal with Union-Find.',
  'Dense graph or implicit adjacency lists: use Prim with a heap (or array for very dense, moderate-sized graphs).',
  'Small integer edge weights: consider bucketed Kruskal or a bucketed Prim variant.',
  'Need parallelism: Boruvka or hybrid Boruvka + Prim often scales better.',
  'Graph is disconnected: run the same algorithm; result is a minimum spanning forest.',
]

const implementationTips = [
  {
    title: 'Sort once, scan once',
    detail:
      'Kruskal can stop after V - 1 edges, which saves time on dense graphs.',
  },
  {
    title: 'Use Union-Find with path compression',
    detail:
      'It keeps find/union operations nearly constant amortized.',
  },
  {
    title: 'Track visited vertices in Prim',
    detail:
      'It prevents cycles and ensures the tree only grows outward.',
  },
  {
    title: 'Keep edges compact',
    detail:
      'Store edges in a flat list to improve sorting and cache locality.',
  },
  {
    title: 'Handle duplicates in tests',
    detail:
      'If weights tie, multiple MSTs are valid; compare total weight instead of exact edges.',
  },
]

const advancedInsights = [
  {
    title: 'Cut and cycle properties',
    detail:
      'Cut property: the lightest edge crossing any cut of the graph is safe to include. Cycle property: the heaviest edge in any cycle is unsafe. Both justify greedy steps.',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Boruvka rounds shrink components quickly, then Prim finishes on the contracted graph, combining fast convergence with low overhead.',
  },
  {
    title: 'Dynamic MST maintenance',
    detail:
      'Link-cut trees, Euler tour trees, and dynamic trees support edge insertions and deletions while maintaining an MST in polylogarithmic time per update.',
  },
  {
    title: 'Sensitivity analysis',
    detail:
      'Replacing one edge in the MST with a non-tree edge forms a cycle; swapping the heaviest edge on that cycle tests how cost changes under perturbations.',
  },
  {
    title: 'Parallel and external memory',
    detail:
      'PRAM-friendly Boruvka variants and external-memory MSTs reduce I/O or synchronize rounds to traverse billion-edge graphs efficiently.',
  },
]

const takeaways = [
  'Minimum spanning trees give the cheapest way to stay connected; they are backbones, not routes.',
  'Greedy stays safe because of cut and cycle properties; every chosen edge is locally optimal yet globally consistent.',
  'Choose Kruskal for edge-sorted workflows, Prim for adjacency-driven growth, and Boruvka or hybrids when parallelism or contraction speed matters.',
  'Union-Find and good priority queues turn the theory into practical, near-linear implementations on sparse graphs.',
  'References: Boruvka 1926, Kruskal 1956, Prim 1957, and CLRS MST chapter.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const glossaryTerms = [
  {
    term: 'Minimum Spanning Tree (MST)',
    definition:
      'A spanning tree that connects all vertices with no cycles and minimum total edge weight.',
  },
  {
    term: 'Minimum Spanning Forest',
    definition:
      'The result of MST algorithms on disconnected graphs: one minimum tree per connected component.',
  },
  {
    term: 'Cut Property',
    definition:
      'For any cut, the lightest edge crossing it is safe to include in an MST.',
  },
  {
    term: 'Cycle Property',
    definition:
      'For any cycle, the heaviest edge is not required in an MST.',
  },
  {
    term: 'Union-Find',
    definition:
      'A disjoint-set structure with near-constant amortized find/union used by Kruskal.',
  },
  {
    term: 'Kruskal',
    definition:
      'Edge-sorting greedy algorithm that adds the next lightest edge that does not form a cycle.',
  },
  {
    term: 'Prim',
    definition:
      'Tree-growing greedy algorithm that repeatedly adds the cheapest edge leaving the current tree.',
  },
  {
    term: 'Boruvka',
    definition:
      'Round-based MST algorithm where each component picks its cheapest outgoing edge and merges.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-invariants', label: 'Correctness Invariants' },
    { id: 'core-complexity', label: 'Complexity and Performance' },
    { id: 'core-input', label: 'Input Sensitivity' },
    { id: 'core-profile', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Algorithm Comparison' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Practical Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const win98MstHelpStyles = `
.mst98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.mst98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.mst98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.mst98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.mst98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.mst98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.mst98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.mst98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.mst98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.mst98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.mst98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.mst98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.mst98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mst98-toc-list li {
  margin: 0 0 8px;
}

.mst98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.mst98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.mst98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.mst98-section {
  margin: 0 0 20px;
}

.mst98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.mst98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.mst98-content p,
.mst98-content li,
.mst98-content td,
.mst98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.mst98-content p {
  margin: 0 0 10px;
}

.mst98-content ul,
.mst98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.mst98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.mst98-table-wrap {
  overflow-x: auto;
}

.mst98-table {
  width: 100%;
  border-collapse: collapse;
}

.mst98-table th,
.mst98-table td {
  border: 1px solid #a9a9a9;
  padding: 4px 6px;
  vertical-align: top;
}

.mst98-table th {
  background: #e5e5e5;
  text-align: left;
}

.mst98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.mst98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .mst98-main {
    grid-template-columns: 1fr;
  }

  .mst98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .mst98-title-text {
    font-size: 14px;
  }
}
`

export default function MinimumSpanningTreePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextTab = searchParams.get('tab')
    if (isTabId(nextTab) && nextTab !== activeTab) {
      setActiveTab(nextTab)
    }
  }, [activeTab, searchParams])

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Minimum Spanning Tree (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Minimum Spanning Tree',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }

    try {
      const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
      const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))
    } catch {
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify([minimizedTask]))
    }

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="mst98-help-page">
      <style>{win98MstHelpStyles}</style>
      <div className="mst98-window" role="presentation">
        <header className="mst98-titlebar">
          <span className="mst98-title-text">Minimum Spanning Tree</span>
          <div className="mst98-title-controls">
            <button className="mst98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="mst98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="mst98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`mst98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mst98-main">
          <aside className="mst98-toc" aria-label="Table of contents">
            <h2 className="mst98-toc-title">Contents</h2>
            <ul className="mst98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="mst98-content">
            <h1 className="mst98-doc-title">Minimum Spanning Tree</h1>
            <p>
              A minimum spanning tree keeps every vertex connected with the smallest possible total weight. The secret is the cut and
              cycle properties: pick the lightest edge that crosses a frontier, or drop the heaviest edge in a cycle, and you never hurt
              optimality. Kruskal, Prim, and Boruvka are greedy by design, but their guardrails make the greed safe.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="mst98-section">
                  <h2 className="mst98-heading">Overview</h2>
                  <p>
                    MSTs strip a weighted graph to its essential scaffold: no cycles, exactly V - 1 edges, and minimum cost to keep the
                    graph connected. They are perfect for designing cheap infrastructure, benchmarking redundancy, and seeding approximation
                    algorithms that need a low-cost baseline.
                  </p>
                </section>

                <hr className="mst98-divider" />

                <section id="bp-patterns" className="mst98-section">
                  <h2 className="mst98-heading">Problem Patterns</h2>
                  {problemPatterns.map((item) => (
                    <div key={item.title}>
                      <h3 className="mst98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-history" className="mst98-section">
                  <h2 className="mst98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="mst98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-applications" className="mst98-section">
                  <h2 className="mst98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-takeaways" className="mst98-section">
                  <h2 className="mst98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="mst98-section">
                  <h2 className="mst98-heading">Core Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="mst98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-mechanics" className="mst98-section">
                  <h2 className="mst98-heading">Mechanics</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="mst98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-invariants" className="mst98-section">
                  <h2 className="mst98-heading">Correctness Invariants</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="mst98-section">
                  <h2 className="mst98-heading">Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    In practice, sorting edges plus fast Union-Find often dominates. On dense graphs, Prim with a heap can edge ahead by
                    avoiding a full sort. When weights are small integers, bucketed approaches remove the log factors entirely.
                  </p>
                </section>

                <section id="core-input" className="mst98-section">
                  <h2 className="mst98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-profile" className="mst98-section">
                  <h2 className="mst98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="mst98-section">
                  <h2 className="mst98-heading">Algorithm Comparison</h2>
                  <div className="mst98-table-wrap">
                    <table className="mst98-table">
                      <thead>
                        <tr>
                          <th>Algorithm</th>
                          <th>Time</th>
                          <th>Space</th>
                          <th>Best for</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonTable.map((row) => (
                          <tr key={row.algorithm}>
                            <td>{row.algorithm}</td>
                            <td>{row.time}</td>
                            <td>{row.space}</td>
                            <td>{row.bestFor}</td>
                            <td>{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section id="core-variants" className="mst98-section">
                  <h2 className="mst98-heading">Variants and Performance Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-implementation" className="mst98-section">
                  <h2 className="mst98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-decision" className="mst98-section">
                  <h2 className="mst98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="mst98-section">
                  <h2 className="mst98-heading">Advanced Insights and Current Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="mst98-section">
                  <h2 className="mst98-heading">Common Pitfalls</h2>
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
                <section id="ex-trace" className="mst98-section">
                  <h2 className="mst98-heading">Worked Trace on a Tiny Graph</h2>
                  <ol>
                    {stepTrace.map((item) => (
                      <li key={item.step}>
                        <p><strong>{item.step}</strong></p>
                        <p><strong>State:</strong> {item.state}</p>
                        <p>{item.note}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="ex-code" className="mst98-section">
                  <h2 className="mst98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="mst98-subheading">{example.title}</h3>
                      <div className="mst98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="mst98-section">
                <h2 className="mst98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
