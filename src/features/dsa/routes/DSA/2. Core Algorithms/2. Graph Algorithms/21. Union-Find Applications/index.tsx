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
]

const coreConcepts = [
  {
    heading: 'Connectivity queries',
    bullets: [
      'Answer “are u and v in the same component?” in near O(1) time.',
      'Use find(u) == find(v) to test connectivity.',
      'Works best when unions are common and deletions are rare.',
    ],
  },
  {
    heading: 'Union by rank/size',
    bullets: [
      'Always attach the smaller tree to the larger tree root.',
      'Keeps tree height low and reduces future find cost.',
      'Stores rank or size arrays for quick comparisons.',
    ],
  },
  {
    heading: 'Path compression',
    bullets: [
      'When finding a root, point every node on the path directly to the root.',
      'Greatly reduces future lookup cost.',
      'Combined with union by rank, yields inverse Ackermann time.',
    ],
  },
  {
    heading: 'Offline graph queries',
    bullets: [
      'Sort edges by weight and union as you process queries.',
      'Used for MST, connectivity under thresholds, and clustering.',
      'Works well when all edges are known upfront.',
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
    heading: 'Constraints and limits',
    bullets: [
      'Union-find does not support deletions efficiently.',
      'Not suited for fully dynamic connectivity without extra techniques.',
      'Use other structures when edges frequently disappear.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Amortized inverse Ackermann time per operation, effectively constant for all practical input sizes.',
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
      'Kruskal’s algorithm uses union-find to quickly detect cycles while adding edges.',
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
]

const pitfalls = [
  'Forgetting to initialize each node as its own parent.',
  'Skipping path compression or union by rank leads to slow trees.',
  'Using union-find for problems that need deletions or split operations.',
  'Assuming it gives distances or paths; it only answers connectivity.',
  'Mixing up zero-based and one-based indices in parent arrays.',
]

const decisionGuidance = [
  'Need fast connectivity checks with many unions: use union-find.',
  'Need to remove edges or support splits: use dynamic connectivity structures.',
  'Need actual paths or distances: pair with BFS/DFS or shortest path algorithms.',
  'Working with sorted edges and MST logic: union-find is the standard choice.',
  'Need connected component labels in grids or images: union-find is simple and fast.',
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
    title: 'Disjoint set union on tree edges',
    detail:
      'DSU-on-tree techniques reuse union-find ideas to process subtree queries efficiently.',
  },
  {
    title: 'Parallel unions',
    detail:
      'Batch unions and compress in stages for parallel processing on large graphs.',
  },
]

const takeaways = [
  'Union-find is the fastest tool for dynamic connectivity with only unions.',
  'Path compression + union by rank give near-constant time operations.',
  'Used everywhere from MSTs to image segmentation and account merging.',
  'Not suited for deletions or path queries without extra algorithms.',
  'Think of it as a component tracker, not a full graph solver.',
]

export default function UnionFindApplicationsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Union-Find Applications</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Practical uses of disjoint set union for connectivity problems</div>
              <p className="win95-text">
                Union-find is a tiny data structure with enormous impact. It tracks connected components as edges appear,
                enabling fast cycle checks, clustering, and region labeling without repeated full graph traversals.
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
                Union-find maintains a forest of sets. Each union merges two sets, and each find returns the leader of a set.
                With path compression and union by rank, the structure becomes almost constant time, making it ideal for large
                connectivity workloads.
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
            <legend>How it works: common applications</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
                Union-find excels when connectivity only grows. If you need to delete edges or split sets, you must use
                more advanced dynamic connectivity structures or rebuild periodically.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operation summary</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
