import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Connected components in early graph theory',
    detail:
      'Union-find emerged as a practical way to group vertices into connected components without repeated full graph traversals.',
  },
  {
    title: 'Kruskal and MST adoption',
    detail:
      'Minimum spanning tree algorithms popularized union-find for cycle detection, making it a core building block in graph processing.',
  },
  {
    title: 'Path compression and union by rank',
    detail:
      'Two optimizations transformed union-find into an almost constant time structure, enabling massive connectivity workloads.',
  },
  {
    title: 'Modern large-scale analytics',
    detail:
      'Union-find is embedded in clustering, network connectivity, and image processing pipelines where dynamic merging is frequent.',
  },
]

const mentalModels = [
  {
    title: 'Forest of leaders',
    detail:
      'Each set is a tree with a representative root. Union merges roots; find climbs to the root and compresses the path.',
  },
  {
    title: 'Dynamic components',
    detail:
      'Think of union-find as maintaining connected components while edges arrive online.',
  },
  {
    title: 'Name tags',
    detail:
      'Every element points to a label. Find asks for the label, union relabels one group to match the other.',
  },
  {
    title: 'Islands merging',
    detail:
      'Each new edge or land cell can merge islands into a larger component.',
  },
]

const dsuFundamentals = [
  {
    heading: 'Make-set initialization',
    bullets: [
      'Each element starts as its own parent.',
      'Optionally track size or rank for balancing.',
      'Component count starts at n.',
    ],
  },
  {
    heading: 'Find with compression',
    bullets: [
      'Walk parent pointers to the root.',
      'Rewrite parents on the path to point directly to the root.',
      'Amortized time becomes almost constant.',
    ],
  },
  {
    heading: 'Union by size/rank',
    bullets: [
      'Attach the smaller tree under the larger root.',
      'Keeps depth low even under many unions.',
      'Works with size or rank arrays.',
    ],
  },
  {
    heading: 'Component metadata',
    bullets: [
      'Store size, min/max, or aggregate data at each root.',
      'Update metadata only when roots merge.',
      'Enables queries like largest component size.',
    ],
  },
  {
    heading: 'Component count tracking',
    bullets: [
      'Decrement count only when two different roots merge.',
      'Useful for online connectivity or island counting.',
      'Avoids full scans to compute number of groups.',
    ],
  },
  {
    heading: 'What DSU cannot do',
    bullets: [
      'No efficient deletions or split operations.',
      'Does not return actual paths or distances.',
      'Use dynamic connectivity or graph search when needed.',
    ],
  },
]

const coreConcepts = [
  {
    heading: 'Connectivity queries',
    bullets: [
      'Answer "are u and v in the same component?" in near O(1) time.',
      'Use find(u) == find(v) to test connectivity.',
      'Best when unions are frequent and deletions are rare.',
    ],
  },
  {
    heading: 'Cycle detection (undirected)',
    bullets: [
      'For each edge (u, v), if find(u) == find(v), a cycle exists.',
      'Works in streaming edge settings.',
      'Core step inside Kruskal to prevent cycles.',
    ],
  },
  {
    heading: 'Offline graph queries',
    bullets: [
      'Sort edges by weight and union as you process queries.',
      'Answer connectivity under thresholds efficiently.',
      'Works well when all edges are known upfront.',
    ],
  },
  {
    heading: 'Equivalence classes',
    bullets: [
      'Merge items known to be equal (variables, synonyms, accounts).',
      'Each root defines a class; find gives the class id.',
      'Check constraints by comparing roots.',
    ],
  },
  {
    heading: 'Grid and image labeling',
    bullets: [
      'Union adjacent pixels or cells to build connected regions.',
      'Used in blob detection, segmentation, and flood analysis.',
      'Avoids repeated BFS/DFS across large grids.',
    ],
  },
  {
    heading: 'Dynamic island counting',
    bullets: [
      'Activate cells over time and union with active neighbors.',
      'Track number of components as islands merge.',
      'Used in "Number of Islands II" style problems.',
    ],
  },
  {
    heading: 'Constraints and limits',
    bullets: [
      'Union-find does not support deletions efficiently.',
      'Not suited for fully dynamic connectivity without extra techniques.',
      'Use other structures when edges frequently disappear.',
    ],
  },
]

const modelingPatterns = [
  {
    title: 'Map objects to ids',
    detail:
      'Use a map from strings or objects to integer ids to feed DSU arrays.',
  },
  {
    title: 'Online edge arrival',
    detail:
      'Union endpoints as edges arrive to keep components current.',
  },
  {
    title: 'Offline threshold queries',
    detail:
      'Sort edges and queries by threshold; union edges as you advance.',
  },
  {
    title: 'Grid to graph',
    detail:
      'Flatten (r, c) into id = r * cols + c, union neighbors that are active.',
  },
  {
    title: 'Equivalence constraints',
    detail:
      'Use DSU to merge items known to be equal, then verify inequalities.',
  },
  {
    title: 'Parity constraints',
    detail:
      'Store parity to parent to model bipartite constraints and detect conflicts.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Amortized inverse Ackermann time per operation, effectively constant for all practical input sizes.',
  },
  {
    title: 'Amortized vs worst case',
    detail:
      'Single operations can still be longer, but the average over many operations is tiny.',
  },
  {
    title: 'Space cost',
    detail:
      'O(n) storage for parent and rank/size arrays.',
  },
  {
    title: 'Build cost',
    detail:
      'Initialization is O(n). Unions are very fast once data is seeded.',
  },
  {
    title: 'Limitations',
    detail:
      'Cannot delete edges or split sets efficiently without rebuilding or advanced techniques.',
  },
]

const realWorldUses = [
  {
    context: 'Minimum spanning trees',
    detail:
      'Kruskal\'s algorithm uses union-find to quickly detect cycles while adding edges.',
  },
  {
    context: 'Dynamic connectivity',
    detail:
      'As edges stream in, union-find tracks which nodes are connected without repeated searches.',
  },
  {
    context: 'Network clustering',
    detail:
      'Communities or clusters can be formed by unioning edges that meet similarity thresholds.',
  },
  {
    context: 'Image segmentation',
    detail:
      'Union adjacent pixels by color or intensity to label connected components.',
  },
  {
    context: 'Percolation and physics',
    detail:
      'Track connected regions in lattice simulations to detect phase transitions.',
  },
  {
    context: 'Account merging',
    detail:
      'Merge user accounts or profiles that share identifiers (emails, phone numbers).',
  },
  {
    context: 'Constraint solving',
    detail:
      'Merge equal variables or types, then check inequality constraints for contradictions.',
  },
  {
    context: 'Online island counting',
    detail:
      'Track how many islands exist as land cells are activated over time.',
  },
  {
    context: 'Social graph grouping',
    detail:
      'Union friendships to maintain community groups or connected friend circles.',
  },
]

const examples = [
  {
    title: 'Union-find core operations',
    code: `function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x]) // path compression
    return parent[x]

function union(a, b):
    ra = find(a)
    rb = find(b)
    if ra == rb: return
    if size[ra] < size[rb]:
        swap(ra, rb)
    parent[rb] = ra
    size[ra] += size[rb]`,
    explanation:
      'Union by size keeps trees shallow. Path compression flattens them, speeding up future finds.',
  },
  {
    title: 'Kruskal cycle check',
    code: `sort edges by weight
total = 0
for (u, v, w) in edges:
    if find(u) != find(v):
        union(u, v)
        total += w`,
    explanation:
      'Union-find ensures each edge added connects two different components, preventing cycles in the MST.',
  },
  {
    title: 'Grid connectivity (4-neighbor)',
    code: `for each cell (r, c):
    if cell is active:
        for each neighbor in [(r-1,c),(r,c-1)]:
            if neighbor is active:
                union(id(r,c), id(neighbor))`,
    explanation:
      'Only check upper and left neighbors to avoid duplicate unions while labeling connected components.',
  },
  {
    title: 'Account merging',
    code: `for each account:
    for each email in account:
        union(accountId, emailOwner[email])
        emailOwner[email] = accountId`,
    explanation:
      'Union accounts that share an identifier, then group by find(root) to merge.',
  },
  {
    title: 'Offline threshold connectivity',
    code: `sort edges by weight
sort queries by threshold
ptr = 0
for query in queries:
    while ptr < edges and edges[ptr].w <= query.threshold:
        union(edges[ptr].u, edges[ptr].v)
        ptr++
    answer = (find(query.u) == find(query.v))`,
    explanation:
      'Process queries in weight order to answer connectivity under varying thresholds efficiently.',
  },
  {
    title: 'Number of Islands II (dynamic)',
    code: `count = 0
for (r, c) in activations:
    if not active[r][c]:
        active[r][c] = true
        count += 1
        for neighbor in activeNeighbors(r, c):
            if find(id(r,c)) != find(id(neighbor)):
                union(id(r,c), id(neighbor))
                count -= 1`,
    explanation:
      'Each activation starts a new island, then unions with neighbors to merge islands and update the count.',
  },
  {
    title: 'Equality/inequality constraints',
    code: `for each equation a == b:
    union(a, b)
for each equation a != b:
    if find(a) == find(b):
        contradiction`,
    explanation:
      'Union all equalities first, then verify inequalities by checking if they share a root.',
  },
]

const pitfalls = [
  'Forgetting to initialize each node as its own parent.',
  'Skipping path compression or union by rank leads to slow trees.',
  'Using union-find for problems that need deletions or split operations.',
  'Assuming it gives distances or paths; it only answers connectivity.',
  'Mixing up zero-based and one-based indices in parent arrays.',
  'Updating size or rank on the wrong root after union.',
  'Reusing a stale mapping when elements are created on the fly.',
  'Applying DSU to directed reachability where connectivity is not symmetric.',
]

const solvingChecklist = [
  'Define the elements and map them to stable integer ids.',
  'Decide when unions happen (edges, equalities, activations).',
  'Track component metadata if needed (size, min/max, count).',
  'Choose offline sorting if queries involve thresholds or time.',
  'Verify constraints by comparing roots after unions.',
]

const testingChecklist = [
  'Single element and all elements isolated.',
  'Many unions that form one big component.',
  'Repeated union on same pair (should be no-op).',
  'Queries before any unions and after all unions.',
  'Dynamic activation order on grids.',
  'Large ids or sparse mappings (hash map usage).',
]

const decisionGuidance = [
  'Need fast connectivity checks with many unions: use union-find.',
  'Need to remove edges or support splits: use dynamic connectivity structures.',
  'Need actual paths or distances: pair with BFS/DFS or shortest path algorithms.',
  'Working with sorted edges and MST logic: union-find is the standard choice.',
  'Need connected component labels in grids or images: union-find is simple and fast.',
  'Need parity or bipartite constraints: use DSU with parity tracking.',
]

const advancedInsights = [
  {
    title: 'Offline connectivity with thresholds',
    detail:
      'Sort edges and queries by weight, union edges as you advance, and answer connectivity queries at thresholds in O((n + m) alpha(n)).',
  },
  {
    title: 'Union-find with rollback',
    detail:
      'Store history of parent changes to support backtracking in divide-and-conquer offline algorithms.',
  },
  {
    title: 'DSU with parity',
    detail:
      'Track parity to the root to support bipartite constraints and detect odd cycles.',
  },
  {
    title: 'Disjoint set union on tree edges',
    detail:
      'DSU-on-tree techniques reuse union-find ideas to process subtree queries efficiently.',
  },
  {
    title: 'Parallel unions',
    detail:
      'Batch unions and compress in stages for parallel processing on large graphs.',
  },
  {
    title: 'Temporal connectivity',
    detail:
      'Combine offline sorting with DSU rollback to answer queries over time windows.',
  },
]

const takeaways = [
  'Union-find is the fastest tool for dynamic connectivity with only unions.',
  'Path compression + union by rank give near-constant time operations.',
  'Used everywhere from MSTs to image segmentation and account merging.',
  'Not suited for deletions or path queries without extra algorithms.',
  'Think of it as a component tracker, not a full graph solver.',
  'Modeling choices (id mapping, thresholds, metadata) make or break solutions.',
]

const glossaryTerms = [
  {
    term: 'Disjoint Set Union (DSU)',
    definition:
      'A structure that maintains partitioned sets and supports find/union operations efficiently.',
  },
  {
    term: 'Representative (root)',
    definition:
      'The leader element of a component; all members eventually point to this root.',
  },
  {
    term: 'Find',
    definition:
      'Operation that returns the root of an element, used for connectivity checks.',
  },
  {
    term: 'Union',
    definition:
      'Operation that merges two components when their roots are different.',
  },
  {
    term: 'Path compression',
    definition:
      'Optimization that shortens parent chains by pointing visited nodes directly to the root.',
  },
  {
    term: 'Union by rank/size',
    definition:
      'Optimization that attaches smaller/shallower trees under larger/deeper roots to limit height.',
  },
  {
    term: 'Connected component',
    definition:
      'A set of vertices where each pair is connected through some undirected path.',
  },
  {
    term: 'Cycle detection',
    definition:
      'In undirected graphs, an edge creates a cycle if both endpoints already share the same root.',
  },
  {
    term: 'Component metadata',
    definition:
      'Extra root-level values such as size, min/max id, or aggregate statistics.',
  },
  {
    term: 'Offline query',
    definition:
      'A query answered after sorting/preprocessing all inputs rather than strictly in arrival order.',
  },
  {
    term: 'Inverse Ackermann function',
    definition:
      'Extremely slow-growing function used in DSU complexity, effectively constant in practice.',
  },
  {
    term: 'DSU limitation',
    definition:
      'Standard DSU cannot efficiently delete edges or split existing components.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.ufapp-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ufapp-window {
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

.ufapp-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ufapp-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.ufapp-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.ufapp-control {
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

.ufapp-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.ufapp-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.ufapp-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.ufapp-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.ufapp-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.ufapp-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.ufapp-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ufapp-toc-list li {
  margin: 0 0 8px;
}

.ufapp-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ufapp-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.ufapp-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.ufapp-section {
  margin: 0 0 20px;
}

.ufapp-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.ufapp-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.ufapp-content p,
.ufapp-content li,
.ufapp-content td,
.ufapp-content th {
  font-size: 12px;
  line-height: 1.5;
}

.ufapp-content p {
  margin: 0 0 10px;
}

.ufapp-content ul,
.ufapp-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ufapp-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 0 0 10px;
}

.ufapp-content th,
.ufapp-content td {
  border: 1px solid #b8b8b8;
  text-align: left;
  padding: 5px 6px;
}

.ufapp-content th {
  background: #efefef;
}

.ufapp-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ufapp-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.ufapp-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .ufapp-main {
    grid-template-columns: 1fr;
  }

  .ufapp-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'DSU Fundamentals' },
    { id: 'core-applications', label: 'Common Applications' },
    { id: 'core-modeling', label: 'Modeling Patterns' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-ops', label: 'Operation Summary' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-solving', label: 'Problem-Solving Checklist' },
    { id: 'core-testing', label: 'Testing and Edge Cases' },
    { id: 'core-decision', label: 'When To Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function UnionFindApplicationsPage(): JSX.Element {
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
    document.title = `Union-Find Applications (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Union-Find Applications',
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
    <div className="ufapp-help-page">
      <style>{win98HelpStyles}</style>
      <div className="ufapp-window" role="presentation">
        <header className="ufapp-titlebar">
          <span className="ufapp-title-text">Union-Find Applications</span>
          <div className="ufapp-title-controls">
            <button className="ufapp-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="ufapp-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="ufapp-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ufapp-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ufapp-main">
          <aside className="ufapp-toc" aria-label="Table of contents">
            <h2 className="ufapp-toc-title">Contents</h2>
            <ul className="ufapp-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="ufapp-content">
            <h1 className="ufapp-doc-title">Union-Find Applications</h1>
            <p>
              Union-find is a tiny data structure with enormous impact. It tracks connected components as edges appear, enabling
              fast cycle checks, clustering, region labeling, and offline connectivity queries without repeated full graph
              traversals.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ufapp-section">
                  <h2 className="ufapp-heading">Overview</h2>
                  <h3 className="ufapp-subheading">Practical uses of disjoint set union for connectivity problems</h3>
                  <p>
                    Union-find maintains a forest of sets. Each union merges two sets, and each find returns the leader of a set.
                    With path compression and union by rank, the structure becomes almost constant time, making it ideal for large
                    connectivity workloads where links only appear and rarely disappear. It powers MSTs, clustering, grid
                    labeling, constraint grouping, and dynamic island counts with a minimal, reliable API.
                  </p>
                </section>
                <hr className="ufapp-divider" />
                <section id="bp-history" className="ufapp-section">
                  <h2 className="ufapp-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="ufapp-divider" />
                <section id="bp-models" className="ufapp-section">
                  <h2 className="ufapp-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="ufapp-divider" />
                <section id="bp-applications" className="ufapp-section">
                  <h2 className="ufapp-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="ufapp-divider" />
                <section id="bp-takeaways" className="ufapp-section">
                  <h2 className="ufapp-heading">Key Takeaways</h2>
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
                <section id="core-fundamentals" className="ufapp-section">
                  <h2 className="ufapp-heading">DSU Fundamentals and Operations</h2>
                  {dsuFundamentals.map((item) => (
                    <div key={item.heading}>
                      <h3 className="ufapp-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-applications" className="ufapp-section">
                  <h2 className="ufapp-heading">How It Works: Common Applications</h2>
                  {coreConcepts.map((item) => (
                    <div key={item.heading}>
                      <h3 className="ufapp-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-modeling" className="ufapp-section">
                  <h2 className="ufapp-heading">Modeling Patterns and Recipes</h2>
                  {modelingPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="ufapp-section">
                  <h2 className="ufapp-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Union-find excels when connectivity only grows. If you need to delete edges or split sets, you must use more
                    advanced dynamic connectivity structures or rebuild periodically.
                  </p>
                </section>
                <section id="core-ops" className="ufapp-section">
                  <h2 className="ufapp-heading">Operation Summary</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Operation</th>
                        <th>Time</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Make-set (init)</td>
                        <td>O(n)</td>
                        <td>Each node starts as its own parent.</td>
                      </tr>
                      <tr>
                        <td>Find</td>
                        <td>~O(1)</td>
                        <td>Inverse Ackermann with path compression.</td>
                      </tr>
                      <tr>
                        <td>Union</td>
                        <td>~O(1)</td>
                        <td>Union by rank or size keeps trees flat.</td>
                      </tr>
                      <tr>
                        <td>Connectivity check</td>
                        <td>~O(1)</td>
                        <td>Compare find(u) and find(v).</td>
                      </tr>
                      <tr>
                        <td>Component size</td>
                        <td>~O(1)</td>
                        <td>Read size at the root after find.</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section id="core-pitfalls" className="ufapp-section">
                  <h2 className="ufapp-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-solving" className="ufapp-section">
                  <h2 className="ufapp-heading">DSU Problem-Solving Checklist</h2>
                  <ul>
                    {solvingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-testing" className="ufapp-section">
                  <h2 className="ufapp-heading">Testing and Edge Cases</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decision" className="ufapp-section">
                  <h2 className="ufapp-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="ufapp-section">
                  <h2 className="ufapp-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="ufapp-section">
                <h2 className="ufapp-heading">Practical Examples</h2>
                {examples.map((item) => (
                  <div key={item.title}>
                    <h3 className="ufapp-subheading">{item.title}</h3>
                    <div className="ufapp-codebox">
                      <code>{item.code.trim()}</code>
                    </div>
                    <p>{item.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ufapp-section">
                <h2 className="ufapp-heading">Glossary</h2>
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

