import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Trees"
      subtitle="Hierarchies that trade depth for speed, and shape for guarantees"
      intro="Trees turn hierarchy into a performance tool. By constraining graphs to be acyclic and rooted, we gain cheap pathfinding, ordered traversals, and predictable heights. From file systems to game engines and query planners, trees make decisions, compress space, and bound latency. This page grounds the concept with history, mechanics, complexity, and the engineering judgment needed to choose the right tree."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          A tree is the simplest way to impose hierarchy on relationships. It is a connected acyclic graph where a single root
          defines direction. That constraint is powerful: there is exactly one simple path between any two nodes, so traversals
          never face ambiguity. The height of the tree sets the cost of searches and updates, which is why balanced shapes are
          prized. Trees let us store order, locality, and hierarchy all at once, enabling fast lookups without the overhead of
          full graph machinery.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMoments.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: structure, traversal, and balance">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Think of traversals as control over when you see a node relative to its children. That ordering is what makes trees
          versatile: you can generate sorted sequences, evaluate expressions, delete subtrees safely, or short-circuit searches
          based on partial information.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Asymptotic bounds assume unit-cost pointer follows, but real systems pay cache and disk penalties. Trees with higher
          branching factors collapse height, reducing cache misses and I/O. This is why B-trees dominate storage engines and why
          cache-aware van Emde Boas layouts boost traversal speed.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorld.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Further reading: CLRS (Introduction to Algorithms) for fundamentals, Knuth Volume 1 for historical depth, GeeksforGeeks
          and LeetCode discussions for practice patterns, and Bayer-McCreight or Tarjan papers for original analyses.
        </p>
      </TopicSection>
    </TopicLayout>
  )
}
