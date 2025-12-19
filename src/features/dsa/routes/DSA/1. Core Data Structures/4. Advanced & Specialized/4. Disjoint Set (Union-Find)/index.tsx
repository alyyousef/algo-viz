import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus {
  outline: 1px dotted #000;
  outline-offset: 1px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMoments = [
  {
    title: 'Galler and Fischer formalize disjoint sets (1964)',
    detail:
      'They introduced union by rank and path compression, showing how to maintain merging sets with near-constant amortized time.',
  },
  {
    title: 'Tarjan proves inverse Ackermann bound (1975)',
    detail:
      'Robert Tarjan analyzed union-find with rank and compression to run in O(alpha(n)) amortized, effectively constant for any practical n.',
  },
  {
    title: "Kruskal's MST popularizes the structure (1956, adopted widely later)",
    detail:
      "Kruskal's algorithm relies on disjoint sets to test connectivity while adding edges in weight order, cementing union-find as a graph workhorse.",
  },
  {
    title: 'Offline dynamic connectivity (1990s-2000s)',
    detail:
      'Researchers used rollback-capable union-find to answer connectivity queries over time, enabling efficient offline algorithms for edge additions and deletions.',
  },
  {
    title: 'DSU on tree / small-to-large merges (2010s)',
    detail:
      'Competitive programming and systems engineering adopted size-biased merging on trees to maintain component statistics with tight constants.',
  },
]

const mentalModels = [
  {
    title: 'Club memberships',
    detail:
      'Each element belongs to a club identified by a leader. Union is two club presidents agreeing to merge their memberships under one leader.',
  },
  {
    title: 'Trees of delegates',
    detail:
      'Parents are delegates pointing toward the leader. Path compression asks each delegate to route directly to the leader, flattening bureaucracy.',
  },
  {
    title: 'Component IDs as passports',
    detail:
      "find(x) is stamping a passport with the component's ID. After compression, future stamps happen in O(1) because you go straight to the embassy.",
  },
  {
    title: 'Rank/size as a height budget',
    detail:
      'Union by rank or size keeps trees shallow by attaching the shorter tree under the taller one, preventing linked-list shaped worst cases.',
  },
]

const mechanics = [
  {
    heading: 'Core operations',
    bullets: [
      'make-set(x): initialize parent[x] = x and size[x] = 1 or rank[x] = 0.',
      'find(x): follow parents to the root; path compress by pointing nodes directly to the root on the way back.',
      'union(a, b): find leaders, then attach the smaller/rank-lower tree to the larger/higher one; update size or rank.',
    ],
  },
  {
    heading: 'Complexity intuition',
    bullets: [
      'With union by rank/size plus path compression, amortized time per operation is O(alpha(n)) where alpha is inverse Ackermann.',
      'alpha(n) < 5 for any realistic input (even up to 1e80), so performance is effectively constant-time.',
      'Space is O(n) for parent and one auxiliary array (rank or size).',
    ],
  },
  {
    heading: 'Variants',
    bullets: [
      'Union by size vs rank: size tracks node counts; rank approximates tree height. Both keep trees shallow.',
      'Rollback DSU: maintain a stack of changes so you can undo unions for offline dynamic connectivity or backtracking search.',
      'DSU with metadata: store component sums, min/max, or custom aggregates updated during union.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Amortized performance',
    detail:
      'm operations on n elements run in O(m alpha(n)); for m ~ n ~ 1e6, alpha(n) is about 4. That means a few pointer hops per operation in practice.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Two int arrays of length n (parent and rank/size). For n = 1e6 with 4-byte ints, about 8 MB. Add metadata arrays as needed.',
  },
  {
    title: 'Parallel and cache effects',
    detail:
      'Path compression improves locality for future finds. Heavy contention on shared parents can hurt parallel performance, so concurrent variants use disjoint sets with atomic CAS or batching.',
  },
]

const realWorld = [
  {
    context: 'Minimum spanning trees',
    detail:
      "Kruskal's algorithm uses union-find to skip edges that connect already-joined components, keeping MST construction at O(E log V) dominated by sorting.",
  },
  {
    context: 'Image processing',
    detail:
      'Connected-component labeling groups pixels into regions by unioning adjacent pixels that meet criteria, enabling blob detection and segmentation.',
  },
  {
    context: 'Networking and percolation',
    detail:
      'Union-find tracks connected clusters in simulations of percolation, social networks, or disjoint subnet detection without repeated graph traversals.',
  },
  {
    context: 'Compilers and constraint solvers',
    detail:
      'Type unification and congruence closure merge equivalent symbols. SMT solvers use union-find to maintain equivalence classes efficiently.',
  },
  {
    context: 'Dynamic sets in games',
    detail:
      "Territory control, guild merges, or region ownership can be tracked with union-find to answer 'same faction?' queries in near constant time.",
  },
]

const examples = [
  {
    title: 'Union-find with path compression and union by size',
    code: `function makeSet(n):
    parent = [0..n-1]
    size = [1]*n
    for i in 0..n-1: parent[i] = i
    return parent, size

function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  // path compression
    return parent[x]

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: return
    if size[ra] < size[rb]: swap(ra, rb)
    parent[rb] = ra
    size[ra] += size[rb]`,
    explanation:
      'Compression flattens trees over time; size-based attachment limits height growth. Together they deliver the inverse Ackermann bound.',
  },
  {
    title: "Kruskal's MST using union-find",
    code: `function kruskal(V, edges):
    sort edges by weight
    uf = makeSet(V)
    mst = []
    for (u, v, w) in edges:
        if find(u) != find(v):
            mst.append((u, v, w))
            union(u, v)
    return mst`,
    explanation:
      'Union-find ensures only edges that connect different components enter the MST. Complexity hinges on sorting; unions are near O(1).',
  },
  {
    title: 'Rollback union-find (outline)',
    code: `stack changes

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: push(changes, null); return
    if rank[ra] < rank[rb]: swap(ra, rb)
    push(changes, (rb, parent[rb], rank[ra]))
    parent[rb] = ra
    if rank[ra] == rank[rb]: rank[ra] += 1

function rollback():
    change = pop(changes)
    if change == null: return
    (node, oldParent, oldRank) = change
    parent[node] = oldParent
    rank[parent[node]] = oldRank`,
    explanation:
      'Rollback keeps a stack of modifications so time-travel queries can undo unions. Used in offline dynamic connectivity and backtracking search.',
  },
]

const pitfalls = [
  'Skipping path compression or union by size/rank degrades performance to near-linear in adversarial sequences.',
  'Mixing zero-based arrays with one-based input without careful translation leads to out-of-bounds or incorrect parents.',
  'Forgetting to initialize every element to parent[i] = i leaves phantom connections and incorrect components.',
  'Storing metadata per component but not updating it during union produces stale aggregates.',
  'In rollback DSU, forgetting to record no-op unions breaks stack alignment and corrupts later rollbacks.',
]

const decisionGuidance = [
  'Use union-find for connectivity queries where edges are added over time and deletions are rare or handled offline.',
  'Use BFS/DFS when the graph is small or fully known and you only need one-shot components; union-find shines when queries interleave with updates.',
  'Use union-find in MST (Kruskal) or clustering pipelines where you need to test component membership repeatedly.',
  'Use rollback or persistent variants when you need historical states or offline processing with edge deletions.',
  'Avoid union-find for weighted shortest paths or flows; it only tracks connectivity, not distances or capacities.',
]

const advancedInsights = [
  {
    title: 'DSU on tree / small-to-large',
    detail:
      'When aggregating data on trees, attach smaller child data structures into larger ones to keep total merges O(n log n) with low constants, inspired by union-by-size.',
  },
  {
    title: 'Parallel and lock-free variants',
    detail:
      'Concurrent union-find uses atomic compare-and-swap to compress paths without locks, or batches unions to reduce contention on hot parents.',
  },
  {
    title: 'Component metadata',
    detail:
      'Attach sums, counts, min/max, or custom monoids to roots; merge them during union to answer component value queries instantly.',
  },
  {
    title: 'Euler tour plus rollback for offline deletions',
    detail:
      'Process edge additions/removals over time with segment-tree-over-time plus rollback DSU to answer connectivity queries in O((n + q) log n).',
  },
]

const takeaways = [
  'Union-find with path compression and union by size/rank runs in near-constant amortized time for connectivity maintenance.',
  'It excels at dynamic connectivity, MST construction, and equivalence-class maintenance with minimal memory.',
  'Variants like rollback and metadata-aware DSU extend its reach to offline dynamic graphs and aggregated component queries.',
  'Performance collapses without compression or size-aware unions, so always enable both unless you have a proven reason not to.',
]

export default function DisjointSetPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Disjoint Set (Union-Find)</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Maintain dynamic connectivity with near-constant operations</div>
              <p className="win95-text">
                Disjoint sets answer a simple question fast: are two elements in the same component, and if not, merge their
                components. With path compression and union by size or rank, the data structure delivers almost O(1) amortized
                finds and unions, powering everything from MST construction to connected-component labeling.
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
                Graph algorithms repeatedly ask whether two nodes are already connected. Running a full traversal per query is
                wasteful. Union-find keeps a forest of shallow trees so each query or merge touches only a handful of pointers, no
                matter how many elements you track.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMoments.map((item) => (
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
            <legend>How it works: structure and operations</legend>
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
            <legend>Complexity analysis and performance intuition</legend>
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
                Inverse Ackermann growth means you can treat the cost as constant in benchmarks. Micro-optimizations focus on cache
                friendliness (iterative find, flattening) rather than asymptotics.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorld.map((item) => (
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
