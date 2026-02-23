import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const history = [
  '1959: Stephen Warshall publishes the transitive closure algorithm using a triple loop over a boolean matrix.',
  '1962: Robert Floyd adapts the pattern to weighted graphs (min-plus semiring) for all-pairs shortest paths with negative edges allowed.',
  '1970s-1990s: Dynamic programming and matrix formulations popularize Floyd-Warshall in CS curricula (Knuth, Tarjan, CLRS).',
  'Modern practice: reused with alternative semirings (max-min for bottlenecks, min-times for reliability) and blocked for cache efficiency.',
]

const formalDefinition = [
  {
    title: 'Problem statement',
    detail:
      'Given a weighted directed graph, compute the shortest-path distance between every ordered pair of vertices.',
  },
  {
    title: 'DP state',
    detail:
      'Let dist[k][i][j] be the shortest path from i to j using only intermediate vertices from 0..k.',
  },
  {
    title: 'Transition',
    detail:
      'Either avoid k or route through k: dist[k][i][j] = min(dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j]).',
  },
  {
    title: 'Final answer',
    detail:
      'After k = V-1, dist[V-1][i][j] is the shortest distance for all pairs.',
  },
]

const mechanics = [
  {
    heading: 'Triple-loop dynamic programming',
    bullets: [
      'The k loop controls which intermediates are allowed. The i, j loops update all pairs for that k.',
      'In-place update works because each k-layer depends only on values from the same or previous k, not future k.',
      'This is a min-plus matrix closure. Swap min-plus for another semiring to solve related problems.',
    ],
  },
  {
    heading: 'Initialization',
    bullets: [
      'dist[i][i] = 0 for all i (zero-length paths).',
      'dist[i][j] = w(i, j) if edge exists, else infinity.',
      'next[i][j] = j for direct edges to enable path reconstruction.',
    ],
  },
  {
    heading: 'Negative cycles and detection',
    bullets: [
      'After all k, any dist[v][v] < 0 flags a reachable negative cycle.',
      'To mark all affected pairs, propagate: if dist[i][k] and dist[k][j] are finite and dist[k][k] < 0, then i to j is -infinity.',
      'Many APIs throw or mark pairs when negative cycles exist because no finite shortest path exists.',
    ],
  },
]

const invariants = [
  {
    title: 'Layered intermediates',
    detail:
      'After processing k, dist[i][j] is optimal among all paths whose intermediates are in 0..k.',
  },
  {
    title: 'Monotonic improvement',
    detail:
      'dist values never increase. Each update only improves or leaves them unchanged.',
  },
  {
    title: 'Diagonal meaning',
    detail:
      'dist[v][v] is the best cycle weight through v. A negative value means a negative cycle is reachable.',
  },
]

const algorithmSteps = [
  {
    title: 'Build dense matrix',
    detail:
      'Convert edge lists to a dense dist matrix. This keeps inner loops tight and cache-friendly.',
  },
  {
    title: 'Seed base distances',
    detail:
      'Set dist[i][i] = 0. Copy edge weights, set others to infinity.',
  },
  {
    title: 'Run k, i, j loops',
    detail:
      'For each k, update dist[i][j] using dist[i][k] + dist[k][j].',
  },
  {
    title: 'Optional: reconstruct paths',
    detail:
      'Use next[i][j] pointers to recover the actual path, not just the distance.',
  },
  {
    title: 'Check negative cycles',
    detail:
      'If any dist[v][v] < 0, no finite shortest path exists for some pairs.',
  },
]

const workedExample = [
  {
    title: 'Graph',
    detail:
      'Vertices: 0, 1, 2, 3. Edges: 0->1 (3), 0->2 (10), 1->2 (1), 2->3 (2), 1->3 (8).',
  },
  {
    title: 'Initial dist matrix',
    detail:
      '    0   1   2   3\n0   0   3  10  inf\n1  inf  0   1   8\n2  inf inf  0   2\n3  inf inf inf  0',
  },
  {
    title: 'Key update',
    detail:
      'When k = 1, dist[0][2] becomes 4 via 0->1->2, and dist[0][3] becomes 11 via 0->1->3.',
  },
  {
    title: 'After k = 2',
    detail:
      'dist[0][3] improves to 6 via 0->1->2->3 (3 + 1 + 2).',
  },
]

const pathReconstruction = [
  {
    title: 'Initialize next',
    detail:
      'If edge i->j exists, next[i][j] = j. If i == j, next[i][i] = i.',
  },
  {
    title: 'Update rule',
    detail:
      'When dist[i][j] improves via k, set next[i][j] = next[i][k].',
  },
  {
    title: 'Recover path',
    detail:
      'Start at i, repeatedly jump to next[i][j] until you reach j.',
  },
]

const negativeCycleHandling = [
  {
    title: 'Detect',
    detail:
      'If dist[v][v] < 0 after all k, there is a negative cycle reachable from v.',
  },
  {
    title: 'Propagate',
    detail:
      'For each k with dist[k][k] < 0, if dist[i][k] and dist[k][j] are finite, mark dist[i][j] as -infinity.',
  },
  {
    title: 'API choice',
    detail:
      'Either throw, return a flag, or mark affected pairs. Be explicit about what you return.',
  },
]

const variantComparison = [
  {
    heading: 'Min-plus (shortest paths)',
    bullets: [
      'Standard Floyd-Warshall: min over path sums.',
      'Allows negative edges but not negative cycles.',
    ],
  },
  {
    heading: 'Boolean (reachability)',
    bullets: [
      'Warshall transitive closure: OR over AND.',
      'Answers reachability queries in O(1) after preprocessing.',
    ],
  },
  {
    heading: 'Max-min (bottleneck)',
    bullets: [
      'Maximize the minimum edge capacity along a path.',
      'Used for widest path or bandwidth planning.',
    ],
  },
  {
    heading: 'Min-times (reliability)',
    bullets: [
      'Multiply probabilities along edges and minimize total failure (or maximize success in log space).',
      'Used in reliability or risk models.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(V^3) time, O(V^2) space. Great for dense graphs or when you need all-pairs answers reused many times.',
  },
  {
    title: 'Cache and blocking',
    detail:
      'k outermost with i, j inner is common. Blocking (tiling) the matrix improves locality on large V.',
  },
  {
    title: 'Alternatives by sparsity',
    detail:
      'On sparse graphs with non-negative weights, Johnson (one Bellman-Ford + V Dijkstra) is O(V E log V) and wins for large V.',
  },
]

const optimizationPlaybook = [
  {
    title: 'Skip useless rows',
    detail:
      'If dist[i][k] is infinity, no path i -> k exists, so you can skip the j loop for that i.',
  },
  {
    title: 'Use wide types',
    detail:
      'Avoid overflow by using 64-bit ints or bigints for large weights. Guard inf additions explicitly.',
  },
  {
    title: 'Blocked loops',
    detail:
      'Tile i and j to improve cache reuse, similar to blocked matrix multiplication.',
  },
]

const realWorldUses = [
  {
    context: 'Routing tables and simulators',
    detail: 'Small or simulated networks precompute all-pairs latencies and next hops for instant lookup.',
  },
  {
    context: 'Compilers and static analysis',
    detail: 'Transitive closure over dependency or precedence graphs; min-plus variants handle timing and cost constraints.',
  },
  {
    context: 'Graph analytics on dense data',
    detail: 'Betweenness centrality, diameter, and clustering on dense social or biological graphs often start from an all-pairs matrix.',
  },
  {
    context: 'Reliability and bottleneck paths',
    detail: 'Using max-min semiring finds widest bottleneck paths; min-times models reliability multiplication.',
  },
]

const examples = [
  {
    title: 'Standard Floyd-Warshall with path reconstruction',
    code: `function floydWarshall(n, adj):
    dist = copy(adj)
    next = matrix(n, n, null)
    for i in range(n):
        for j in range(n):
            if i == j: next[i][j] = i
            else if adj[i][j] < inf: next[i][j] = j

    for k in range(n):
        for i in range(n):
            if dist[i][k] == inf: continue
            for j in range(n):
                alt = dist[i][k] + dist[k][j]
                if alt < dist[i][j]:
                    dist[i][j] = alt
                    next[i][j] = next[i][k]

    for v in range(n):
        if dist[v][v] < 0: raise NegativeCycle

    return dist, next`,
    explanation:
      'Each k-layer authorizes vertex k as an intermediate. next lets you rebuild a path by walking i -> next[i][j] until j.',
  },
  {
    title: 'Negative cycle propagation',
    code: `function markNegativePairs(n, dist):
    for k in range(n):
        if dist[k][k] >= 0: continue
        for i in range(n):
            if dist[i][k] == inf: continue
            for j in range(n):
                if dist[k][j] == inf: continue
                dist[i][j] = -inf
    return dist`,
    explanation:
      'If a negative cycle is reachable from i and can reach j, there is no finite shortest path from i to j.',
  },
  {
    title: 'Boolean transitive closure (Warshall)',
    code: `function transitiveClosure(n, reach):
    for k in range(n):
        for i in range(n):
            if not reach[i][k]: continue
            for j in range(n):
                reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j])
    return reach`,
    explanation:
      'Same structure over the boolean semiring. Answers reachability queries in O(1) after O(V^3) preprocessing.',
  },
]

const pitfalls = [
  'Failing to set dist[i][i] = 0 breaks correctness and hides negative cycles.',
  'Updating next incorrectly (or not copying adjacency to dist) yields wrong reconstructions even if distances are right.',
  'Using adjacency lists directly hurts performance; convert to a dense matrix first for tight loops and cache locality.',
  'Integer overflow when adding infinities or large weights; guard with sentinel inf checks and wide integer types.',
  'Expecting it to scale to huge sparse graphs; past a few thousand nodes, O(V^3) dominates wall-clock and memory.',
]

const decisionGuidance = [
  'Dense or moderately sized graphs (hundreds to a few thousands), negative edges allowed, no negative cycles wanted: choose Floyd-Warshall.',
  'Sparse graphs, non-negative weights: choose Dijkstra per source or Johnson for all-pairs.',
  'Negative edges on sparse graphs: run Bellman-Ford per source or Johnson if all-pairs is needed.',
  'Reachability only: run the boolean version (Warshall) for transitive closure.',
  'Need widest or most reliable paths: swap in max-min or min-times semiring without changing the loop structure.',
]

const advancedInsights = [
  'Semiring view: replace min-plus with any associative combine/op pair to solve reachability, bottleneck, reliability, or precedence problems.',
  'Blocked variants mimic cache-friendly matrix multiply; crucial when V is large enough that naive triple loops thrash cache.',
  'Parallelization: k-outer loops can be tiled; inner i, j loops vectorize well on CPUs and map to GPU-style kernels.',
  'Path reconstruction: next[i][j] = next[i][k] when going through k ensures O(path length) recovery without storing parents per k.',
  'Negative cycle propagation: a second pass marking pairs that can reach and be reached from any vertex with dist[v][v] < 0 yields complete -infinity labeling.',
]

const miniFaq = [
  {
    question: 'Why is in-place update valid?',
    answer:
      'At step k you only rely on distances that already allow intermediates up to k. Using the current matrix preserves that invariant.',
  },
  {
    question: 'Do I need to store a 3D array?',
    answer:
      'No. The k dimension can be folded into a single 2D matrix because each layer depends only on the previous one.',
  },
  {
    question: 'Can Floyd-Warshall handle negative edges?',
    answer:
      'Yes, as long as there are no negative cycles. The diagonal test detects them.',
  },
  {
    question: 'When is it too slow?',
    answer:
      'If V is in the tens of thousands or the graph is very sparse, O(V^3) is usually too slow and memory-heavy.',
  },
]

const takeaways = [
  'Floyd-Warshall is the simplest all-pairs shortest path method with a clean DP recurrence.',
  'The k loop controls which intermediates are allowed, making correctness easy to reason about.',
  'Negative cycles are detectable via the diagonal and must be handled explicitly.',
  'Semiring swaps reuse the same triple-loop to solve many path problems.',
  'For sparse graphs, consider Johnson or repeated Dijkstra instead.',
]

const glossary = [
  {
    term: 'All-pairs shortest path (APSP)',
    definition:
      'The problem of finding shortest-path distances between every ordered pair of vertices.',
  },
  {
    term: 'Min-plus semiring',
    definition:
      'Path composition uses addition and path selection uses minimum, matching shortest path recurrence updates.',
  },
  {
    term: 'Intermediate vertex set',
    definition:
      'The subset of vertices allowed to appear strictly between source and destination in a path at DP step k.',
  },
  {
    term: 'Transitive closure',
    definition:
      'Reachability matrix indicating whether a path exists between each pair, computed by the boolean Warshall variant.',
  },
  {
    term: 'Negative cycle',
    definition:
      'A cycle whose total weight is negative; shortest paths through it are not finite.',
  },
  {
    term: 'Path reconstruction matrix (next)',
    definition:
      'A matrix storing the next hop from i toward j so full shortest paths can be rebuilt.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const fw98HelpStyles = `
.fw98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fw98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.fw98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.fw98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.fw98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.fw98-control {
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
  cursor: pointer;
}

.fw98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.fw98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.fw98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.fw98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.fw98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.fw98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.fw98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fw98-toc-list li {
  margin: 0 0 8px;
}

.fw98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.fw98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.fw98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.fw98-section {
  margin: 0 0 20px;
}

.fw98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.fw98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 12px 0 6px;
}

.fw98-content p,
.fw98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.fw98-content p {
  margin: 0 0 10px;
}

.fw98-content ul,
.fw98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.fw98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.fw98-preline {
  white-space: pre-line;
}

.fw98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.fw98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .fw98-main {
    grid-template-columns: 1fr;
  }

  .fw98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-definition', label: 'Formal Definition' },
    { id: 'bp-realworld', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-invariants', label: 'Core Invariants' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-reconstruction', label: 'Path Reconstruction' },
    { id: 'core-negative-cycles', label: 'Negative Cycles' },
    { id: 'core-variants', label: 'Variant Comparison' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-optimization', label: 'Optimization Playbook' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decisions', label: 'When To Use What' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Practical Examples' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-faq', label: 'Quick FAQ' },
  ],
}

export default function FloydWarshallPage(): JSX.Element {
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
    document.title = `Floyd-Warshall (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

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
    <div className="fw98-help-page">
      <style>{fw98HelpStyles}</style>
      <div className="fw98-window" role="presentation">
        <header className="fw98-titlebar">
          <span className="fw98-title-text">Floyd-Warshall</span>
          <div className="fw98-title-controls">
            <button className="fw98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="fw98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="fw98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`fw98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fw98-main">
          <aside className="fw98-toc" aria-label="Table of contents">
            <h2 className="fw98-toc-title">Contents</h2>
            <ul className="fw98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="fw98-content">
            <h1 className="fw98-doc-title">Floyd-Warshall</h1>
            <p>
              Floyd-Warshall is the canonical all-pairs shortest path algorithm for dense or medium-sized graphs. It builds a
              distance matrix by gradually allowing more intermediate vertices, handles negative edges, and exposes negative cycles.
            </p>
            <p>
              This reference keeps the full picture: recurrence, invariants, path reconstruction, semiring variants, complexity,
              optimization tactics, worked examples, and practical decision guidance.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="fw98-section">
                  <h2 className="fw98-heading">Overview</h2>
                  <p>
                    Instead of running single-source searches V times, Floyd-Warshall updates every pair in a dense matrix. At each
                    k, it checks whether routing through vertex k improves the best known path from i to j.
                  </p>
                  <p>
                    After k reaches the final vertex, the matrix contains all-pairs shortest distances. The same triple-loop skeleton
                    also solves reachability, bottleneck, and reliability variants by swapping operations.
                  </p>
                </section>
                <hr className="fw98-divider" />

                <section id="bp-history" className="fw98-section">
                  <h2 className="fw98-heading">Historical Context</h2>
                  <ul>
                    {history.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="fw98-divider" />

                <section id="bp-definition" className="fw98-section">
                  <h2 className="fw98-heading">Formal Definition</h2>
                  {formalDefinition.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="fw98-divider" />

                <section id="bp-realworld" className="fw98-section">
                  <h2 className="fw98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="fw98-divider" />

                <section id="bp-takeaways" className="fw98-section">
                  <h2 className="fw98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="fw98-section">
                  <h2 className="fw98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="fw98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-invariants" className="fw98-section">
                  <h2 className="fw98-heading">Core Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-steps" className="fw98-section">
                  <h2 className="fw98-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-reconstruction" className="fw98-section">
                  <h2 className="fw98-heading">Path Reconstruction</h2>
                  {pathReconstruction.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-negative-cycles" className="fw98-section">
                  <h2 className="fw98-heading">Negative Cycle Handling</h2>
                  {negativeCycleHandling.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variants" className="fw98-section">
                  <h2 className="fw98-heading">Variant Comparison</h2>
                  {variantComparison.map((block) => (
                    <div key={block.heading}>
                      <h3 className="fw98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-complexity" className="fw98-section">
                  <h2 className="fw98-heading">Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-optimization" className="fw98-section">
                  <h2 className="fw98-heading">Optimization Playbook</h2>
                  {optimizationPlaybook.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="fw98-section">
                  <h2 className="fw98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-decisions" className="fw98-section">
                  <h2 className="fw98-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="fw98-section">
                  <h2 className="fw98-heading">Advanced Insights</h2>
                  <ul>
                    {advancedInsights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="fw98-section">
                  <h2 className="fw98-heading">Worked Example</h2>
                  {workedExample.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p className="fw98-preline">{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-code" className="fw98-section">
                  <h2 className="fw98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="fw98-subheading">{example.title}</h3>
                      <div className="fw98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="fw98-section">
                  <h2 className="fw98-heading">Glossary</h2>
                  {glossary.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-faq" className="fw98-section">
                  <h2 className="fw98-heading">Quick FAQ</h2>
                  {miniFaq.map((item) => (
                    <div key={item.question}>
                      <h3 className="fw98-subheading">{item.question}</h3>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
