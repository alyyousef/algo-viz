import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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

const quickGlossary = [
  {
    term: 'Disjoint set',
    definition: 'A partition of elements into non-overlapping components.',
  },
  {
    term: 'Union-find',
    definition:
      'A data structure that supports fast component representative lookup and component merges.',
  },
  {
    term: 'Path compression',
    definition:
      'A find optimization that rewires traversed nodes directly to the component root.',
  },
  {
    term: 'Union by rank/size',
    definition: 'A merge rule that attaches shallower/smaller trees under larger ones.',
  },
  {
    term: 'Inverse Ackermann alpha(n)',
    definition:
      'A very slowly growing function that bounds amortized union-find complexity.',
  },
  {
    term: 'Rollback DSU',
    definition: 'A union-find variant that can undo merges to revisit earlier states.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'Structure and Operations' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-usage', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const unionFindHelpStyles = `
.uf98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.uf98-window {
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

.uf98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.uf98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.uf98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.uf98-control {
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

.uf98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.uf98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.uf98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.uf98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.uf98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.uf98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.uf98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.uf98-toc-list li {
  margin: 0 0 8px;
}

.uf98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.uf98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.uf98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.uf98-section {
  margin: 0 0 20px;
}

.uf98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.uf98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.uf98-content p,
.uf98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.uf98-content p {
  margin: 0 0 10px;
}

.uf98-content ul,
.uf98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.uf98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.uf98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.uf98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .uf98-main {
    grid-template-columns: 1fr;
  }

  .uf98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function DisjointSetPage(): JSX.Element {
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
    document.title = `Disjoint Set (Union-Find) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Disjoint Set (Union-Find)',
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
    <div className="uf98-help-page">
      <style>{unionFindHelpStyles}</style>
      <div className="uf98-window" role="presentation">
        <header className="uf98-titlebar">
          <span className="uf98-title-text">Disjoint Set (Union-Find)</span>
          <div className="uf98-title-controls">
            <button className="uf98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="uf98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="uf98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`uf98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="uf98-main">
          <aside className="uf98-toc" aria-label="Table of contents">
            <h2 className="uf98-toc-title">Contents</h2>
            <ul className="uf98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="uf98-content">
            <h1 className="uf98-doc-title">Disjoint Set (Union-Find)</h1>
            <p>
              Disjoint sets answer a simple question fast: are two elements in the same component, and if not, merge their
              components. With path compression and union by size or rank, the data structure delivers almost O(1) amortized
              finds and unions, powering everything from MST construction to connected-component labeling.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="uf98-section">
                  <h2 className="uf98-heading">Overview</h2>
                  <p>
                    Graph algorithms repeatedly ask whether two nodes are already connected. Running a full traversal per query is
                    wasteful. Union-find keeps a forest of shallow trees so each query or merge touches only a handful of
                    pointers, no matter how many elements you track.
                  </p>
                  <p>
                    The core operation pair is <strong>find</strong> for component identity and <strong>union</strong> for
                    component merging. The entire design goal is to make both operations cheap over long sequences.
                  </p>
                </section>

                <hr className="uf98-divider" />

                <section id="bp-history" className="uf98-section">
                  <h2 className="uf98-heading">Historical Context</h2>
                  {historicalMoments.map((item) => (
                    <div key={item.title}>
                      <h3 className="uf98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="uf98-divider" />

                <section id="bp-takeaways" className="uf98-section">
                  <h2 className="uf98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="uf98-section">
                  <h2 className="uf98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="uf98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-mechanics" className="uf98-section">
                  <h2 className="uf98-heading">Structure and Operations</h2>
                  {mechanics.map((item) => (
                    <div key={item.heading}>
                      <h3 className="uf98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-complexity" className="uf98-section">
                  <h2 className="uf98-heading">Complexity Notes</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Inverse Ackermann growth means you can treat operation cost as constant in most benchmarks. Micro-optimization
                    efforts usually target cache friendliness and branch behavior, not asymptotic bounds.
                  </p>
                </section>

                <section id="core-applications" className="uf98-section">
                  <h2 className="uf98-heading">Real-World Applications</h2>
                  {realWorld.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="uf98-section">
                  <h2 className="uf98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-usage" className="uf98-section">
                  <h2 className="uf98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="uf98-section">
                  <h2 className="uf98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="uf98-section">
                <h2 className="uf98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="uf98-subheading">{example.title}</h3>
                    <div className="uf98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="uf98-section">
                <h2 className="uf98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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
