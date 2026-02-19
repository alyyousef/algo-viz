import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Edsger Dijkstra sketches the algorithm (1956)',
    detail:
      'While considering Dutch city routes, Dijkstra realized a greedy settle-order by rising distance would produce optimal paths for non-negative edges.',
  },
  {
    title: 'Formal publication in Numerische Mathematik (1959)',
    detail:
      'The paper proved correctness for single-source shortest paths and popularized the distance-label and relaxation language still used today.',
  },
  {
    title: "Dial's bucket optimization (1969)",
    detail:
      'Robert Dial replaced heaps with buckets for small integer weights, pushing the runtime toward linear on many practical graphs.',
  },
  {
    title: 'Fredman and Tarjan connect Fibonacci heaps (1984)',
    detail:
      'They showed that fast decrease-key operations drop the bound to O(E + V log V), influencing textbook presentations and contest implementations.',
  },
  {
    title: 'Networking era adoption (1990s)',
    detail:
      'Link-state routing protocols like OSPF and IS-IS embedded Dijkstra to recompute forwarding tables rapidly as topologies changed.',
  },
]

const mentalModels = [
  {
    title: 'Rising water',
    detail:
      'Imagine water filling terrain from the source. The first time water touches a node is the cheapest cost to that node; once wet, it never becomes cheaper.',
  },
  {
    title: 'IOU ledger',
    detail:
      'Every node holds an IOU for what it costs to reach it. The priority queue always pays off the smallest IOU next, guaranteeing no unpaid smaller debt remains.',
  },
  {
    title: 'Settled frontier',
    detail:
      'Settled nodes are paved; the frontier is gravel being compacted. Stepping back onto pavement cannot shorten a path because that pavement already follows the cheapest grade.',
  },
  {
    title: 'Weighted BFS',
    detail:
      'Swap BFS layers for a priority queue ordered by cumulative weight instead of hop count. Relaxation plays the same role as in BFS but respects edge costs.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Initialize all distances to infinity except the source at 0, then push the source into a min-priority queue.',
      'Extract the node with the smallest tentative distance. If the popped distance is larger than the recorded one, skip it as stale.',
      'For each outgoing edge (u, v, w), relax: if dist[u] + w < dist[v], update dist[v], set parent[v] = u, and push (dist[v], v) into the queue.',
      'Repeat until the queue is empty or a target node is extracted; that extraction finalizes its optimal cost.',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code and predictable constants.',
      'Fibonacci or pairing heap: better asymptotic decrease-key for dense graphs, higher constants in practice.',
      "Bucket queues (Dial, radix, 0-1 BFS): near-linear when weights are small integers or in {0,1}.",
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Non-negative edges are required. Negative weights break the settle-order guarantee.',
      'Settling at extract-min locks a node; no future path can improve it because all unsettled nodes are at least as far.',
      'Outdated heap entries are harmless if you verify dist on pop before relaxing neighbors.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Weighted shortest paths',
    detail:
      'Find cheapest routes when edges represent time, cost, or risk and are non-negative.',
  },
  {
    title: 'Single-source distance maps',
    detail:
      'Compute the best cost from one origin to all nodes, then reuse results for multiple queries.',
  },
  {
    title: 'Navigation and routing',
    detail:
      'When weights encode travel time or latency, Dijkstra delivers optimal paths without heuristics.',
  },
  {
    title: 'Not for negative edges',
    detail:
      'If any edge weight is negative, the greedy settle order is invalid; use Bellman-Ford or Johnson.',
  },
  {
    title: 'Multi-query optimization',
    detail:
      'If many sources are queried repeatedly, consider preprocessing or multi-level variants.',
  },
]

const loopInvariants = [
  {
    title: 'Settled invariant',
    detail:
      'When a node is extracted from the priority queue, its recorded distance is final and minimal among all remaining paths.',
  },
  {
    title: 'Upper-bound invariant',
    detail:
      'All recorded distances are upper bounds on the true shortest path; relaxations monotonically tighten them.',
  },
  {
    title: 'Frontier invariant',
    detail:
      'The priority queue always contains the next best candidate distances for unsettled nodes.',
  },
]

const stepTrace = [
  {
    step: 'Initialize',
    state: 'Source A at 0; others infinity. Queue: (A, 0)',
    note: 'We start with only the source settled.',
  },
  {
    step: 'Settle A',
    state: 'Relax A->B (2), A->C (5). Queue: (B, 2), (C, 5)',
    note: 'Shortest costs are tentative until popped.',
  },
  {
    step: 'Settle B',
    state: 'Relax B->C (1) => dist[C] = 3. Queue: (C, 3), (C, 5)',
    note: 'Stale entries remain but are ignored when popped.',
  },
  {
    step: 'Settle C',
    state: 'C popped with 3, finalize dist[C].',
    note: 'First time we pop a node is its optimal cost.',
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic core',
    detail:
      'Binary heap runs in O((V + E) log V); Fibonacci heap in O(E + V log V). With adjacency lists the work scales with actual edges.',
  },
  {
    title: 'Dense vs. sparse graphs',
    detail:
      'Adjacency matrices push runtime toward O(V^2) regardless of edge count, acceptable only when graphs are dense and V is moderate.',
  },
  {
    title: 'Integer weight shortcuts',
    detail:
      "Dial buckets achieve O(V + E + W) when weights are small non-negative integers and W is the maximum edge weight. 0-1 BFS specializes further to O(V + E).",
  },
  {
    title: 'Memory footprint',
    detail:
      'Distance and parent arrays cost O(V); the queue can hold up to O(E) entries when reinserting instead of decrease-key.',
  },
]

const inputSensitivity = [
  {
    title: 'Negative edges',
    detail:
      'Any negative edge breaks correctness; Dijkstra can return suboptimal paths.',
  },
  {
    title: 'Wide weight ranges',
    detail:
      'Large weights can cause integer overflow if distances are stored in small numeric types.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'Adjacency lists and heaps perform well; Dijkstra scales nearly linearly with edges.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Priority queues add overhead; O(V^2) array-based Dijkstra may be competitive.',
  },
]

const performanceProfile = [
  {
    title: 'Heap operations',
    detail:
      'Most runtime is spent in pop-min and push; choose a heap with good constants.',
  },
  {
    title: 'Decrease-key vs reinsertion',
    detail:
      'Reinsertion keeps code simple but increases heap size; decrease-key lowers queue growth at complexity cost.',
  },
  {
    title: 'Cache locality',
    detail:
      'Contiguous adjacency lists and compact node IDs reduce cache misses in large graphs.',
  },
  {
    title: 'Early exit',
    detail:
      'If only one target is needed, exit on first pop of that node to save work.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Dijkstra',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    bestFor: 'Non-negative weights',
    notes: 'Reliable for single-source shortest paths.',
  },
  {
    algorithm: 'BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Unit weights',
    notes: 'Simpler and faster when all weights are equal.',
  },
  {
    algorithm: '0-1 BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Weights 0 or 1',
    notes: 'Deque-based and faster than Dijkstra in this case.',
  },
  {
    algorithm: 'Bellman-Ford',
    time: 'O(VE)',
    space: 'O(V)',
    bestFor: 'Negative weights',
    notes: 'Slower but handles negatives and detects cycles.',
  },
]

const realWorldUses = [
  {
    context: 'Navigation and maps',
    detail:
      'Car GPS, delivery routing, and ride hailing compute fastest routes with Dijkstra or A* on road graphs where weights encode travel time.',
  },
  {
    context: 'Internet routing',
    detail:
      'OSPF and IS-IS routers run Dijkstra on link-state databases to rebuild forwarding tables whenever a link weight or topology change arrives.',
  },
  {
    context: 'Game AI and robotics',
    detail:
      'Pathfinding on weighted grids or navmeshes uses Dijkstra for cost-to-go tables, often combined with heuristics for real-time play.',
  },
  {
    context: 'Network reliability and QoS',
    detail:
      'Traffic engineering tools compute least-cost and k-shortest paths under latency or utilization weights to balance load safely.',
  },
  {
    context: 'Compilers and analysis',
    detail:
      'Dataflow and call graph analyses use Dijkstra when edge weights encode risk or frequency, revealing cheapest witnesses through code.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bidirectional Dijkstra',
    detail:
      'Run from source and target and meet in the middle to shrink explored states on undirected graphs.',
  },
  {
    title: "Dial's buckets",
    detail:
      'Bucket queues remove the log factor for small integer weights.',
  },
  {
    title: 'Radix heap',
    detail:
      'Exploits monotone keys to speed up integer-weight graphs.',
  },
  {
    title: 'A* overlay',
    detail:
      'Add a heuristic to focus search toward a goal while preserving optimality.',
  },
]

const examples = [
  {
    title: 'Standard Dijkstra with min-heap',
    code: `function dijkstra(graph, source):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    pq = new MinHeap()
    pq.push((0, source))

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue  // stale entry from an older relaxation

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist.get(v, infinity):
                dist[v] = dist[u] + w
                parent[v] = u
                pq.push((dist[v], v))

    return { dist, parent }`,
    explanation:
      'Reinserting instead of decrease-key keeps code simple; the stale check preserves correctness. Parent pointers enable path reconstruction.',
  },
  {
    title: 'Early exit when target is known',
    code: `function shortestPath(graph, source, target):
    dist = { source: 0 }
    parent = { source: null }
    pq = MinHeap([(0, source)])

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue
        if u == target:
            break  // first time we pop target is optimal

        for (v, w) in graph.neighbors(u):
            if d + w < dist.get(v, infinity):
                dist[v] = d + w
                parent[v] = u
                pq.push((dist[v], v))

    return reconstruct(parent, target)`,
    explanation:
      'Because the queue orders by cost, the first extraction of the target certifies its shortest path. Stopping here avoids needless work.',
  },
  {
    title: 'Path reconstruction',
    code: `function reconstruct(parent, target):
    path = []
    node = target
    while node is not null:
        path.push(node)
        node = parent[node]
    return reverse(path)`,
    explanation:
      'Parents collected during relaxations give the exact path at the end without another search.',
  },
  {
    title: "Dial's buckets for small integer weights",
    code: `function dial(graph, source, maxW):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    buckets = array of lists length (maxW * |V| + 1)
    idx = 0
    buckets[0].append(source)

    while some bucket is non-empty:
        while buckets[idx] is empty:
            idx += 1
        u = buckets[idx].pop()
        if idx != dist[u]:
            continue

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                buckets[dist[v]].append(v)

    return dist`,
    explanation:
      'When weights are bounded small integers, bucket indices act as exact keys and remove the log factor.',
  },
]

const pitfalls = [
  'Applying Dijkstra when any edge is negative yields wrong paths; use Bellman-Ford or Johnson in that case.',
  'Ignoring stale heap entries when using reinsertion wastes work or corrupts parents; always check the recorded distance on pop.',
  'Overflowing distance sums on large weights breaks comparisons; use 64-bit or bigint distances.',
  'Using adjacency matrices on sparse graphs inflates runtime and memory; prefer adjacency lists.',
  'Skipping parent tracking forces extra passes or prevents route reconstruction after the run.',
  'Assuming the first time a node is discovered is optimal; only extraction from the min-heap finalizes it.',
]

const decisionGuidance = [
  'Non-negative weighted edges and single-source queries: pick Dijkstra.',
  'Unit weights: use BFS for simpler O(V + E) time.',
  'Weights limited to 0 or 1: use 0-1 BFS with a deque.',
  'Negative weights present: use Bellman-Ford or Johnson (for many sources).',
  'Single target and a good heuristic: use A* to narrow the search.',
  'Many queries on a static graph: preprocess with contraction hierarchies or multi-level Dijkstra for faster responses.',
]

const implementationTips = [
  {
    title: 'Pick the right number type',
    detail:
      'Use 64-bit integers or bigints if weights and paths can be large.',
  },
  {
    title: 'Use adjacency lists',
    detail:
      'They avoid O(V^2) scans and keep runtime proportional to edges.',
  },
  {
    title: 'Prefer early exit',
    detail:
      'If you only need one destination, stop at the first pop of that node.',
  },
  {
    title: 'Handle stale heap entries',
    detail:
      'Skip nodes whose popped distance no longer matches dist[u].',
  },
  {
    title: 'Store parents for paths',
    detail:
      'Capture parent pointers on relaxation so paths are available without extra passes.',
  },
]

const advancedInsights = [
  {
    title: 'Bidirectional Dijkstra',
    detail:
      'Run forward from the source and backward from the target; meet-in-the-middle cuts explored nodes dramatically on large undirected graphs.',
  },
  {
    title: 'Potential-based reweighting',
    detail:
      'Johnson adds vertex potentials to eliminate negative edges, making Dijkstra applicable while preserving shortest paths after reweighting.',
  },
  {
    title: 'Heuristic overlays (A*)',
    detail:
      'Adding an admissible heuristic h(v) to the key (dist + h) keeps the settle-order optimal while focusing effort near the goal.',
  },
  {
    title: 'Cache-aware engineering',
    detail:
      'D-ary heaps reduce cache misses; radix heaps work well for monotone integer keys; contiguous adjacency layouts improve memory bandwidth.',
  },
  {
    title: 'Cut property intuition',
    detail:
      'The next settled node is always reached by the minimum-weight edge crossing the cut between settled and unsettled sets, mirroring the logic behind MST algorithms.',
  },
]

const takeaways = [
  'Dijkstra is weighted BFS with a min-priority frontier; non-negative edges make its greedy settling safe.',
  'Priority queue choice controls constants: binary heaps are dependable, buckets excel on bounded integers, Fibonacci heaps push asymptotics.',
  'Stale-entry checks or real decrease-key keep reinsertion strategies correct.',
  'Match the algorithm to the graph: BFS for unit weights, 0-1 BFS for {0,1}, Bellman-Ford for negatives, A* when a goal and heuristic exist.',
  'References: Dijkstra 1959, CLRS shortest paths, and routing protocol literature.',
]

const glossary = [
  { term: "Dijkstra's algorithm", definition: 'Single-source shortest-path algorithm for non-negative edge weights.' },
  { term: 'Relaxation', definition: 'Updating a neighbor distance when a shorter path through the current node is found.' },
  { term: 'Tentative distance', definition: 'Current best-known upper bound on shortest path from source to a node.' },
  { term: 'Settled node', definition: 'A node whose shortest path is finalized at extract-min time.' },
  { term: 'Decrease-key', definition: 'Priority queue operation to lower the key for an existing node.' },
  { term: 'Stale heap entry', definition: 'An outdated queue record that no longer matches current best distance.' },
  { term: 'Shortest-path tree', definition: 'Parent-pointer tree describing one optimal route from source to each reachable node.' },
  { term: "Dial's buckets", definition: 'Bucket queue method for small integer weights that can remove the log factor.' },
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-patterns', label: 'Problem Patterns' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-profile', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-uses', label: 'Real-World Uses' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-tips', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const dijkstra98Styles = `
.dijkstra98-page{min-height:100dvh;background:#c0c0c0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.dijkstra98-window{width:100%;min-height:100dvh;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;box-sizing:border-box;display:flex;flex-direction:column}
.dijkstra98-titlebar{position:relative;display:flex;align-items:center;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.dijkstra98-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px}
.dijkstra98-title-controls{display:flex;gap:2px;margin-left:auto}
.dijkstra98-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1}
.dijkstra98-tabs{display:flex;gap:1px;padding:6px 8px 0}
.dijkstra98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer}
.dijkstra98-tab.active{background:#fff;position:relative;top:1px}
.dijkstra98-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr}
.dijkstra98-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto}
.dijkstra98-toc-title{margin:0 0 10px;font-size:12px;font-weight:700}
.dijkstra98-toc-list{list-style:none;margin:0;padding:0}
.dijkstra98-toc-list li{margin:0 0 8px}
.dijkstra98-toc-list a{color:#000;text-decoration:none;font-size:12px}
.dijkstra98-content{padding:14px 20px 20px;overflow:auto}
.dijkstra98-doc-title{margin:0 0 12px;font-size:20px;font-weight:700}
.dijkstra98-section{margin:0 0 20px}
.dijkstra98-heading{margin:0 0 8px;font-size:16px;font-weight:700}
.dijkstra98-subheading{margin:0 0 6px;font-size:13px;font-weight:700}
.dijkstra98-content p,.dijkstra98-content li,.dijkstra98-content td,.dijkstra98-content th{font-size:12px;line-height:1.5}
.dijkstra98-content p{margin:0 0 10px}
.dijkstra98-content ul,.dijkstra98-content ol{margin:0 0 10px 20px;padding:0}
.dijkstra98-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.dijkstra98-table{width:100%;border-collapse:collapse;margin:0 0 10px}
.dijkstra98-table th,.dijkstra98-table td{border:1px solid #a0a0a0;padding:4px 6px;text-align:left;vertical-align:top}
.dijkstra98-state{font-family:"Courier New",Courier,monospace}
.dijkstra98-codebox{background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;padding:8px;margin:6px 0 10px}
.dijkstra98-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px}
@media (max-width:900px){.dijkstra98-main{grid-template-columns:1fr}.dijkstra98-toc{border-right:none;border-bottom:1px solid #808080}}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function DijkstrasPage(): JSX.Element {
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
    document.title = `Dijkstra's Algorithm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="dijkstra98-page">
      <style>{dijkstra98Styles}</style>
      <div className="dijkstra98-window" role="presentation">
        <header className="dijkstra98-titlebar">
          <span className="dijkstra98-title">Dijkstra&apos;s Algorithm</span>
          <div className="dijkstra98-title-controls">
            <button className="dijkstra98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="dijkstra98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="dijkstra98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dijkstra98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="dijkstra98-main">
          <aside className="dijkstra98-toc" aria-label="Table of contents">
            <h2 className="dijkstra98-toc-title">Contents</h2>
            <ul className="dijkstra98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="dijkstra98-content">
            <h1 className="dijkstra98-doc-title">Dijkstra&apos;s Algorithm</h1>
            <p>
              Dijkstra&apos;s algorithm is weighted BFS with discipline. It settles nodes in order of increasing cost using a priority queue,
              guaranteeing optimal paths in graphs whose edges never go negative. From road networks to link-state routers, it is the reliable
              workhorse for single-source shortest paths.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Overview</h2>
                  <p>
                    The algorithm asks: what is the cheapest way to reach every node when edges are non-negative? By always expanding the
                    lowest-cost unsettled node and relaxing its outgoing edges, it builds a shortest-path tree without backtracking. The
                    only risk is memory and heap overhead, not correctness, as long as weights stay non-negative.
                  </p>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="dijkstra98-divider" />
                <section id="bp-history" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Mechanics in Motion</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="dijkstra98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-patterns" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">How to Think About Similar Problems</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Loop Invariants (Why It Is Correct)</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Complexity Analysis and Performance Intuition</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Implementation choices dominate real speed: heaps balance clarity and efficiency, buckets win when weights are tiny
                    integers, and cache-aware layouts matter on billion-edge graphs more than minor asymptotic differences.
                  </p>
                </section>
                <section id="core-sensitivity" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-profile" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Compare and Contrast</h2>
                  <table className="dijkstra98-table">
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
                </section>
                <section id="core-uses" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Variants and Performance Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-tips" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Advanced Insights and Current Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-trace" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Worked Trace on a Tiny Graph</h2>
                  <ol>
                    {stepTrace.map((item) => (
                      <li key={item.step}>
                        <p><strong>{item.step}:</strong> {item.note}</p>
                        <p className="dijkstra98-state">{item.state}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="ex-code" className="dijkstra98-section">
                  <h2 className="dijkstra98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="dijkstra98-subheading">{example.title}</h3>
                      <div className="dijkstra98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dijkstra98-section">
                <h2 className="dijkstra98-heading">Glossary</h2>
                {glossary.map((item) => (
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
