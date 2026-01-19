import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
                enabling fast cycle checks, clustering, region labeling, and offline connectivity queries without repeated
                full graph traversals.
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
                connectivity workloads where links only appear and rarely disappear. It powers MSTs, clustering, grid labeling,
                constraint grouping, and dynamic island counts with a minimal, reliable API.
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
            <legend>DSU fundamentals and operations</legend>
            <div className="win95-grid win95-grid-3">
              {dsuFundamentals.map((block) => (
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
            <legend>Modeling patterns and recipes</legend>
            <div className="win95-grid win95-grid-2">
              {modelingPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
                  <tr>
                    <td>Component size</td>
                    <td>~O(1)</td>
                    <td>Read size at the root after find.</td>
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
            <legend>DSU problem-solving checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {solvingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
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

