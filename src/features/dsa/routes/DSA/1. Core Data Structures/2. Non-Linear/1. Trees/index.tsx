import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const terminology = [
  {
    term: 'Node, edge, root',
    detail:
      'Nodes store values. Edges connect parents to children. The root is the unique entry point; every other node has exactly one parent.',
  },
  {
    term: 'Leaf, internal node',
    detail:
      'Leaves have no children. Internal nodes route searches and aggregate information (sizes, sums, min/max).',
  },
  {
    term: 'Depth, height, level',
    detail:
      'Depth counts edges from root to a node. Height counts edges from a node to its deepest leaf. Level is depth + 1.',
  },
  {
    term: 'Subtree, ancestor, descendant',
    detail:
      'A subtree is a node plus all its descendants. Ancestors are nodes on the path to root; descendants are nodes below.',
  },
  {
    term: 'Degree and branching factor',
    detail:
      'Degree is the number of children for a node. Branching factor is the average degree and largely controls height.',
  },
  {
    term: 'Shapes',
    detail:
      'Full (0 or 2 children), perfect (all leaves same depth), complete (levels filled left-to-right), balanced (height near log n), degenerate (list-like).',
  },
]

const treeFamilies = [
  {
    title: 'Binary search tree (BST)',
    detail:
      'Ordered by key: left < node < right. Enables sorted traversals and range queries but needs balancing to avoid O(n).',
  },
  {
    title: 'Self-balancing BSTs',
    detail:
      'AVL, Red-Black, Treap, Splay, and Scapegoat trees enforce height guarantees via rotations or rebuilds.',
  },
  {
    title: 'Heaps and priority queues',
    detail:
      'Heap order (parent <= children for min-heap) supports fast min/max access and O(log n) inserts/removals.',
  },
  {
    title: 'Tries and radix trees',
    detail:
      'Edges labeled by characters or bits. Great for prefix, lexicographic, and range queries. Compress paths to save space.',
  },
  {
    title: 'Multiway and disk-friendly trees',
    detail:
      'B-trees and B+ trees store many keys per node to minimize disk I/O and enable fast range scans.',
  },
  {
    title: 'Range query structures',
    detail:
      'Segment trees and Fenwick trees maintain aggregates (sum, min, max) over intervals with log-time updates.',
  },
  {
    title: 'Spatial trees',
    detail:
      'KD-trees, quadtrees, octrees, and BVHs index points and volumes for fast geometric queries.',
  },
  {
    title: 'String and suffix trees',
    detail:
      'Suffix trees and suffix arrays support fast substring searches, pattern matching, and LCP queries.',
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

const traversalCheatSheet = [
  {
    title: 'Preorder',
    detail:
      'Visit node before children. Useful for copying trees, serializing structure, and prefix notation (expression trees).',
  },
  {
    title: 'Inorder',
    detail:
      'Left, node, right. Produces sorted order in BSTs and supports range queries by early stopping.',
  },
  {
    title: 'Postorder',
    detail:
      'Visit children before node. Ideal for safe deletion, freeing memory, and evaluating expression trees.',
  },
  {
    title: 'Level-order (BFS)',
    detail:
      'Visit nodes by depth. Finds nearest targets and supports width or level computations.',
  },
]

const balancingSnapshot = [
  {
    title: 'AVL',
    detail:
      'Strict balance (|bf| <= 1). More rotations on updates, slightly faster lookups due to tighter height bound.',
  },
  {
    title: 'Red-Black',
    detail:
      'Looser balance (black-height rules). Fewer rotations, great for frequent inserts/deletes and ordered maps.',
  },
  {
    title: 'Treap',
    detail:
      'BST by key + heap by random priority. Expected O(log n) without explicit balance bookkeeping.',
  },
  {
    title: 'Splay',
    detail:
      'Self-adjusting via splaying to root. Amortized O(log n), strong locality benefits, simple implementation.',
  },
  {
    title: 'B/B+ trees',
    detail:
      'High fanout, fewer levels. B+ keeps data in leaves for efficient range scans and sequential I/O.',
  },
  {
    title: 'Scapegoat/Weight-balanced',
    detail:
      'Rebuilds subtrees when size ratios drift. Fewer small rotations, good for batchy workloads.',
  },
]

const invariants = [
  {
    title: 'BST ordering',
    detail:
      'Left subtree keys are smaller, right subtree keys are larger. Every rotation must preserve this invariant.',
  },
  {
    title: 'Heap property',
    detail:
      'Every parent is <= (min-heap) or >= (max-heap) its children. Structure is usually complete for array storage.',
  },
  {
    title: 'AVL and Red-Black rules',
    detail:
      'AVL keeps balance factor in {-1,0,1}. Red-Black enforces black-height and no red-red edges for looser balance.',
  },
  {
    title: 'B-tree node sizes',
    detail:
      'Each node stores a range of keys (t-1 to 2t-1). Splits and merges maintain these bounds and keep height low.',
  },
  {
    title: 'Trie prefix paths',
    detail:
      'Every path from root to node spells a prefix. Terminal markers distinguish full keys from prefixes.',
  },
]

const storageLayouts = [
  {
    title: 'Pointer-based nodes',
    detail:
      'Flexible and easy to update but suffer cache misses. Best for mutable in-memory trees.',
  },
  {
    title: 'Array-backed heaps',
    detail:
      'Implicit tree layout in arrays: parent i, children 2i+1/2i+2. Great locality and minimal pointer overhead.',
  },
  {
    title: 'Packed arrays (B-trees)',
    detail:
      'Store many keys and child pointers in a node aligned to cache line or disk page for high throughput.',
  },
  {
    title: 'Van Emde Boas layout',
    detail:
      'Recursively layout subtrees to improve cache locality without changing logical structure.',
  },
  {
    title: 'Succinct trees',
    detail:
      'Bit-vector encodings (LOUDS, balanced parentheses) compress structure with rank/select support.',
  },
]

const operationsPlaybook = [
  {
    heading: 'Search and query',
    bullets: [
      'Path length equals height. Balanced trees guarantee O(log n) searches.',
      'In BSTs, inorder traversal yields sorted output; range queries prune whole subtrees.',
      'In tries, search cost depends on key length, not the number of keys.',
    ],
  },
  {
    heading: 'Insert and delete',
    bullets: [
      'BST insert/delete is O(h); balance with rotations or rebuilds to avoid degeneration.',
      'Heaps bubble up/down to restore order; deletes require swapping with last element.',
      'B-trees split on overflow and merge/borrow on underflow to keep node sizes bounded.',
    ],
  },
  {
    heading: 'Merge, split, and join',
    bullets: [
      'Treaps and AVL trees can join or split in O(log n) by key boundaries.',
      'B-trees and LSM trees batch merges to amortize write cost.',
      'Persistent trees share structure so snapshots are cheap and safe.',
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

const performanceNotes = [
  {
    title: 'Branching factor versus height',
    detail:
      'Doubling branching factor can drop height by a constant factor, which multiplies into cache and I/O savings.',
  },
  {
    title: 'Recursion cost',
    detail:
      'Recursive traversals are elegant but can overflow on deep trees. Iterative stacks or tail-call elimination mitigate this.',
  },
  {
    title: 'Mutation patterns',
    detail:
      'Many inserts in sorted order skew naive BSTs; randomized insert or periodic rebalancing avoids degeneration.',
  },
  {
    title: 'Hot paths',
    detail:
      'Keep frequently accessed metadata (size, height, balance) close to node data to reduce cache-line fetches.',
  },
]

const augmentationIdeas = [
  'Subtree size for order statistics (kth smallest, rank queries).',
  'Subtree sums/min/max for range queries and interval pruning.',
  'Parent pointers or Euler tours for LCA and subtree queries.',
  'Lazy propagation for segment trees to batch range updates.',
  'Binary lifting tables for fast ancestor jumps in O(log n).',
  'Heavy-light decomposition to reduce tree paths to log segments.',
  'Augment with min/max depth to detect imbalance or optimize pruning.',
  'Store subtree hashes for Merkle proofs and tamper detection.',
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
  {
    title: 'Lowest common ancestor (binary lifting)',
    code: `// Precompute up[k][v] = 2^k-th ancestor
function build_lca(root):
    dfs(root, parent = null):
        up[0][v] = parent
        depth[v] = depth[parent] + 1
        for k in 1..LOG:
            up[k][v] = up[k-1][ up[k-1][v] ]
        for child in v.children:
            dfs(child, v)

function lca(a, b):
    if depth[a] < depth[b]: swap(a, b)
    lift a up to depth[b]
    if a == b: return a
    for k from LOG down to 0:
        if up[k][a] != up[k][b]:
            a = up[k][a]
            b = up[k][b]
    return up[0][a]`,
    explanation:
      'Binary lifting answers LCA queries in O(log n) after O(n log n) preprocessing. It powers distance queries, subtree checks, and path aggregations.',
  },
  {
    title: 'B-tree split in a nutshell',
    code: `// Node with order t overflows when it has 2t keys
function insert_btree(node, key):
    if node is full:
        split node into left + right around middle key
        promote middle key to parent
        pick child (left/right) and continue insert
    if node is leaf:
        insert key into sorted position
    else:
        recurse into correct child`,
    explanation:
      'B-trees keep nodes within [t-1, 2t-1] keys. Splits and merges keep height small and nodes densely packed for disk I/O.',
  },
  {
    title: 'Segment tree range sum with lazy propagation',
    code: `function range_add(node, l, r, val):
    if node range fully inside [l, r]:
        node.sum += val * node.length
        node.lazy += val
        return
    push(node.lazy to children)
    recurse to children
    node.sum = left.sum + right.sum`,
    explanation:
      'Lazy propagation defers updates to keep range updates and queries both O(log n). The trick is storing pending deltas.',
  },
]

const pitfalls = [
  'Ignoring balance: a BST fed sorted data becomes a linked list. Use self-balancing variants or randomization.',
  'Forgetting invariants: one wrong rotation breaks ordering; always test insert-delete pairs and validate structure.',
  'Pointer-heavy implementations thrash caches; favor packed nodes or higher branching factors when memory bandwidth is the bottleneck.',
  'Tries without compression waste memory on sparse alphabets; use radix compression or hash edges.',
  'Misusing recursion on deep trees risks stack overflow; provide iterative variants or tail recursion elimination.',
  'Failing to define duplicate-key policy leads to subtle bugs; decide on counts, lists, or strict uniqueness.',
  'Confusing height and depth causes off-by-one errors in balancing and complexity estimates.',
  'Overlooking memory reclamation in persistent trees can leak space; use reference counting or arenas.',
  'Mixing inclusive/exclusive ranges in segment trees yields silent off-by-one errors.',
]

const decisionGuidance = [
  'Need ordered range scans on disk: pick B+ trees or LSM trees depending on write vs read bias.',
  'Need fast min/max or scheduling: use a heap or priority queue backed by a binary heap or pairing heap.',
  'Need prefix lookups: tries or radix trees outperform hash tables for range and lexicographic queries.',
  'Need balanced general-purpose ordered map in memory: use AVL for tighter balance or Red-Black for cheaper rotations; in high-concurrency settings, consider skip lists or Bw-trees.',
  'Need mutable hierarchies with cheap snapshots: use persistent trees (path copying) so old versions remain accessible.',
  'Need geometric proximity queries: use KD-trees for points, quadtrees or octrees for spatial partitioning.',
  'Need interval aggregates: choose segment trees for generic operations or Fenwick for prefix sums.',
  'Need heavy write throughput with eventual compaction: consider LSM trees with memtable trees and SSTables.',
  'Need lexicographic range scans with prefixes: use tries or B+ trees depending on key length and storage.',
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

const testingChecklist = [
  'Verify ordering: inorder traversal is sorted for BSTs.',
  'Validate balance constraints (AVL bf, RB colors, B-tree key bounds).',
  'Round-trip inserts and deletes on random data and sorted data.',
  'Check structure invariants after every rotation or split/merge.',
  'Property tests: rank/select consistency with subtree sizes.',
  'Fuzz range queries with brute-force baseline for segment trees.',
]

const practicePrompts = [
  'Implement a BST with parent pointers and iterative traversals.',
  'Add subtree sizes and support kth-smallest queries.',
  'Build a trie with path compression and compare memory usage.',
  'Implement an LRU cache with a tree-backed ordered map and benchmark.',
  'Write a segment tree with range add and range min queries.',
  'Build an interval tree and test overlap queries against brute force.',
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
            <legend>Terminology that unlocks the rest</legend>
            <div className="win95-grid win95-grid-2">
              {terminology.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Major tree families</legend>
            <div className="win95-grid win95-grid-2">
              {treeFamilies.map((item) => (
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
            <div className="win95-grid win95-grid-2">
              {traversalCheatSheet.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Balancing approaches at a glance</legend>
            <div className="win95-grid win95-grid-2">
              {balancingSnapshot.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Invariants that keep trees correct</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Storage layouts and memory behavior</legend>
            <div className="win95-grid win95-grid-2">
              {storageLayouts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operations playbook</legend>
            <div className="win95-grid win95-grid-3">
              {operationsPlaybook.map((block) => (
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
                Asymptotic bounds assume unit-cost pointer follows, but real systems pay cache and disk penalties. Trees with
                higher branching factors collapse height, reducing cache misses and I/O. This is why B-trees dominate storage
                engines and why cache-aware van Emde Boas layouts boost traversal speed.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance considerations in practice</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Augmentations that add power</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {augmentationIdeas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Testing checklist</legend>
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
            <legend>Practice and build challenges</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

