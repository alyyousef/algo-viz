import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
  font-size: 12px;
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
  outline-offset: 2px;
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
  font-size: 12px;
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

.win95-content {
  padding: 10px;
}

.win95-hero {
  margin-bottom: 10px;
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
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.win95-stack {
  display: flex;
  flex-direction: column;
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
    title: 'Arthur Cayley formalizes tree counting (1857)',
    detail:
      'Cayley used trees to model chemical structures and proved enumeration results, setting the stage for treating trees as mathematical objects rather than just drawings.',
  },
  {
    title: 'Adelson-Velsky and Landis invent AVL trees (1962)',
    detail:
      'They introduced self-balancing search trees to guarantee O(log n) lookup even as data evolved, solving the degeneration problem of naive binary search trees.',
  },
  {
    title: 'Bayer and McCreight publish B-trees (1972)',
    detail:
      'Designed for disks, B-trees minimize I/O by storing many keys per node. Almost every database index and file system directory structure descends from this idea.',
  },
  {
    title: 'Huffman coding popularizes optimal prefix trees (1952)',
    detail:
      'Huffman trees showed how greedy construction of a binary tree yields optimal variable-length codes, becoming a pillar of compression formats from DEFLATE to MP3.',
  },
  {
    title: 'Sleator and Tarjan analyze splay trees (1985)',
    detail:
      'They proved amortized O(log n) performance with a simple rotation heuristic, highlighting how access patterns can steer tree shape toward future efficiency.',
  },
]

const mentalModels = [
  {
    title: 'Branching budget',
    detail:
      'Each level doubles, triples, or expands by branching factor b. Height is roughly log base b of n, so keeping b high (as in B-trees) shrinks height and I/O.',
  },
  {
    title: 'Gravity toward leaves',
    detail:
      'Work sinks to leaves. In heaps the extreme element stays near the root, but updates bubble down. In tries, specificity increases as you descend.',
  },
  {
    title: 'Trail of decisions',
    detail:
      'Every edge is a question answered. BST left vs right, quadtree quadrant, KD-tree axis. A search path is a transcript of comparisons.',
  },
  {
    title: 'Shape as a performance contract',
    detail:
      'Balanced height is a promise: O(log n) paths. Break the contract and you pay O(n). Balancing algorithms are enforcement mechanisms for that promise.',
  },
]

const mechanics = [
  {
    heading: 'Structure',
    bullets: [
      'Nodes store payload plus links: left/right for binary, array of children for n-ary, edge labels for tries.',
      'Root is the entry point; leaves have no children; internal nodes route work.',
      'Parent pointers are optional but simplify upward navigation and deletions.',
    ],
  },
  {
    heading: 'Traversals',
    bullets: [
      'Depth-first: preorder (root-first), inorder (L-root-R for sorted BST output), postorder (children before parent for deletions or expression evaluation).',
      'Breadth-first: level-order using a queue; finds nearest targets and exposes shape level by level.',
      'Space trade-offs: recursion uses call stack; iterative DFS uses an explicit stack; Morris traversal uses temporary links for O(1) extra space.',
    ],
  },
  {
    heading: 'Rebalancing levers',
    bullets: [
      'Rotations (AVL, Red-Black, Treap, Splay) fix local height imbalances while preserving order.',
      'Node splitting and merging (B-trees, 2-3-4 trees) keep disk pages full and heights shallow.',
      'Heuristics like move-to-root or splaying adapt shape to workload locality.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Search, insert, delete',
    detail:
      'BST operations take O(h) where h is height. Balanced trees keep h ~ log2 n; unbalanced degenerate to O(n). On a million items, log2 n is about 20, so balanced height is the difference between 20 comparisons and one million.',
  },
  {
    title: 'Cache and I/O effects',
    detail:
      'Pointer-heavy binary trees suffer cache misses. B-trees pack many keys per node, turning random access into sequential page reads, which matters when disks are 10x to 100x slower than memory.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Each pointer is 8 bytes on 64-bit systems. A binary node with two pointers and a value often lands around 24-32 bytes. Tries can explode in size unless compressed (radix / Patricia tries).',
  },
  {
    title: 'Parallelism and locks',
    detail:
      'Fine-grained locking (hand-over-hand), optimistic reads, or lock-free trees reduce contention. Height reduction (higher branching factor) cuts critical sections.',
  },
]

const realWorld = [
  {
    context: 'File systems and OS internals',
    detail:
      'Linux ext4 uses HTree (hashed B-tree) for directories; NTFS uses B+ trees for metadata; page tables form multi-level trees for virtual memory translation.',
  },
  {
    context: 'Databases and search',
    detail:
      'B+ trees and LSM-tree components (with memtables organized as skip lists or trees) power range scans, indexes, and transactional lookups in systems like PostgreSQL and RocksDB.',
  },
  {
    context: 'Compilers and analytics',
    detail:
      'Abstract syntax trees model program structure; query planners traverse expression trees to reorder joins; columnar engines use segment trees for min/max pruning.',
  },
  {
    context: 'Graphics, games, and spatial data',
    detail:
      'Quadtrees, octrees, and BVH (bounding volume hierarchies) prune collision checks and ray intersections, enabling real-time rendering and physics.',
  },
  {
    context: 'Networking and security',
    detail:
      'Routing tables use tries over IP prefixes; Merkle trees provide tamper-evident audit trails in blockchains and transparency logs.',
  },
]

const examples = [
  {
    title: 'Traversal patterns in pseudocode',
    code: `// Iterative inorder traversal of a BST
function inorder(root):
    stack = []
    node = root
    while stack not empty or node != null:
        while node != null:
            stack.push(node)
            node = node.left
        node = stack.pop()
        visit(node.value)
        node = node.right

// Breadth-first traversal (level order)
function bfs(root):
    if root == null: return
    q = new Queue()
    q.enqueue(root)
    while q not empty:
        node = q.dequeue()
        visit(node.value)
        for child in node.children:
            q.enqueue(child)`,
    explanation:
      'Inorder yields sorted output for BSTs because it visits left subtree, node, then right subtree. BFS reveals structure level by level and finds the nearest match first.',
  },
  {
    title: 'Binary search tree insert and delete',
    code: `function insert(node, key):
    if node == null: return new Node(key)
    if key < node.key: node.left = insert(node.left, key)
    else if key > node.key: node.right = insert(node.right, key)
    // equal keys decide policy: reject, count duplicates, or store list
    return node  // without balancing, worst case height is n

function delete(node, key):
    if node == null: return null
    if key < node.key: node.left = delete(node.left, key)
    else if key > node.key: node.right = delete(node.right, key)
    else:
        if node.left == null: return node.right
        if node.right == null: return node.left
        // two children: swap with inorder successor
        successor = minNode(node.right)
        node.key = successor.key
        node.right = delete(node.right, successor.key)
    return node`,
    explanation:
      'BST correctness hinges on preserving the ordering invariant. Real systems wrap this with rotations (AVL, Red-Black) to restore height guarantees after updates.',
  },
  {
    title: 'Balanced vs unbalanced cost comparison',
    code: `// Hypothetical search counts
unbalanced_height = 1000000      // skewed list-like tree
balanced_height   = log2(1000000)  // ~20

// If a cache miss costs ~100 ns and a hit ~1 ns:
cost_unbalanced ~= 1000000 * 100 ns = 100 ms
cost_balanced   ~= 20 * 100 ns = 2 microseconds`,
    explanation:
      'Asymptotic notation hides constants, but the height gap dominates real latency. Balancing turns a perceptible pause into a microsecond-scale operation.',
  },
]

const pitfalls = [
  'Ignoring balance: a BST fed sorted data becomes a linked list. Use self-balancing variants or randomization.',
  'Forgetting invariants: one wrong rotation breaks ordering; always test insert-delete pairs and validate structure.',
  'Pointer-heavy implementations thrash caches; favor packed nodes or higher branching factors when memory bandwidth is the bottleneck.',
  'Tries without compression waste memory on sparse alphabets; use radix compression or hash edges.',
  'Misusing recursion on deep trees risks stack overflow; provide iterative variants or tail recursion elimination.',
]

const decisionGuidance = [
  'Need ordered range scans on disk: pick B+ trees or LSM trees depending on write vs read bias.',
  'Need fast min/max or scheduling: use a heap or priority queue backed by a binary heap or pairing heap.',
  'Need prefix lookups: tries or radix trees outperform hash tables for range and lexicographic queries.',
  'Need balanced general-purpose ordered map in memory: use AVL for tighter balance or Red-Black for cheaper rotations; in high-concurrency settings, consider skip lists or Bw-trees.',
  'Need mutable hierarchies with cheap snapshots: use persistent trees (path copying) so old versions remain accessible.',
]

const advancedInsights = [
  {
    title: 'Persistence and immutability',
    detail:
      'Functional languages rely on persistent trees (for example persistent red-black or finger trees) to give O(log n) updates while keeping historical versions alive, enabling time-travel debugging and optimistic concurrency.',
  },
  {
    title: 'Space optimization',
    detail:
      'Compressed tries (Patricia or radix), succinct trees (LOUDS), and arena allocation shrink pointer overhead. These techniques trade easy mutation for memory efficiency and better cache behavior.',
  },
  {
    title: 'Workload-aware shaping',
    detail:
      'Splay trees adapt to temporal locality; treaps use random priorities for expected balance; weight-balanced and scapegoat trees rebalance only when size ratios skew, reducing rotation churn on mixed workloads.',
  },
  {
    title: 'Parallel and lock-free variants',
    detail:
      'Concurrent B-trees, lock-free BSTs, and read-optimized index trees (Bw-tree, Masstree) separate logical structure from physical layout to avoid global locks while preserving order semantics.',
  },
  {
    title: 'Verification and testing',
    detail:
      'Property tests that assert BST invariants, heap order, or B-tree node size constraints catch subtle bugs. Tools like model checking or Coq proofs back high-assurance storage engines, such as verified B-trees in the FSCQ file system paper.',
  },
]

export default function TreesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Trees</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-hero">
            <div className="win95-subheading">Hierarchies that trade depth for speed, and shape for guarantees</div>
            <p className="win95-text">
              Trees turn hierarchy into a performance tool. By constraining graphs to be acyclic and rooted, we gain cheap
              pathfinding, ordered traversals, and predictable heights. From file systems to game engines and query planners,
              trees make decisions, compress space, and bound latency. This page grounds the concept with history, mechanics,
              complexity, and the engineering judgment needed to choose the right tree.
            </p>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A tree is the simplest way to impose hierarchy on relationships. It is a connected acyclic graph where a
                single root defines direction. That constraint is powerful: there is exactly one simple path between any two
                nodes, so traversals never face ambiguity. The height of the tree sets the cost of searches and updates, which
                is why balanced shapes are prized. Trees let us store order, locality, and hierarchy all at once, enabling fast
                lookups without the overhead of full graph machinery.
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
            <legend>How it works: structure, traversal, and balance</legend>
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
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Think of traversals as control over when you see a node relative to its children. That ordering is what makes
                trees versatile: you can generate sorted sequences, evaluate expressions, delete subtrees safely, or
                short-circuit searches based on partial information.
              </p>
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
                Asymptotic bounds assume unit-cost pointer follows, but real systems pay cache and disk penalties. Trees with
                higher branching factors collapse height, reducing cache misses and I/O. This is why B-trees dominate storage
                engines and why cache-aware van Emde Boas layouts boost traversal speed.
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
            <legend>Advanced insights and current frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
