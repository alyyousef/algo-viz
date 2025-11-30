import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'AVL trees debut (Adelson-Velsky and Landis, 1962)',
    detail:
      'The first self-balancing binary search tree, enforcing height difference of at most 1 between child subtrees to guarantee O(log n) operations.',
  },
  {
    title: 'Bayer and McCreight publish B-trees (1972)',
    detail:
      'Designed for magnetic disks, B-trees pack many keys per node to reduce I/O. Their fanout keeps height tiny, inspiring nearly every database index and filesystem.',
  },
  {
    title: 'Red-black trees formalized (Guibas and Sedgewick, 1978)',
    detail:
      'Red-black trees reframe Bayer’s symmetric binary B-trees with colors and simple rotation rules, balancing update cost with easy implementation.',
  },
  {
    title: '2-3-4 trees connect B-trees and red-black trees (late 1970s)',
    detail:
      'Viewing red-black trees as encoded 2-3-4 trees clarified correctness proofs and taught how black-height parity preserves balance.',
  },
  {
    title: 'B+ trees and bulk-loading (1980s-2000s)',
    detail:
      'B+ trees moved all payloads to leaves and linked them for fast range scans. Bulk-loading and buffer trees adapted them to streaming and log-structured workloads.',
  },
]

const mentalModels = [
  {
    title: 'Height as a performance contract',
    detail:
      'AVL enforces a tight contract on height; red-black relaxes it for cheaper updates; B-trees shrink height by widening nodes. Every rule exists to keep paths logarithmic.',
  },
  {
    title: 'Rotations as weight transfers',
    detail:
      'Tree rotations move weight between siblings the way you would rebalance a bookshelf. They preserve in-order sequence while adjusting local height.',
  },
  {
    title: 'Parity bookkeeping',
    detail:
      'Red-black colors encode a 2-3-4 tree. Black links are single edges; a red edge fuses two nodes. Keeping black-heights equal across siblings preserves balance.',
  },
  {
    title: 'B-tree as a page of sorted slots',
    detail:
      'A B-tree node is a disk page of sorted keys with child pointers between them. Splitting a full page is like moving overflow books to a new shelf and promoting a divider key upward.',
  },
]

const mechanics = [
  {
    heading: 'AVL essentials',
    bullets: [
      'Invariant: balance factor of each node (height(left) - height(right)) is -1, 0, or +1.',
      'Updates: single or double rotations (LL, RR, LR, RL) restore balance after inserts/deletes.',
      'Height bound: h ≤ 1.44 log2(n + 2), giving tighter search depth than red-black.',
    ],
  },
  {
    heading: 'Red-black essentials',
    bullets: [
      'Properties: roots and leaves are black; red nodes have black children; all root-to-leaf paths contain the same number of black nodes.',
      'Fix-up rules: recolor and rotate to resolve red-red violations after insert/delete. At most O(1) rotations per update.',
      'Height bound: h ≤ 2 log2(n + 1). Looser than AVL but cheaper rebalancing.',
    ],
  },
  {
    heading: 'B-tree essentials',
    bullets: [
      'Order t: each node has between t and 2t children (except root); keys are kept sorted with separators guiding search.',
      'Node split: when a node overflows, split around the median key and promote it to the parent. Merge/borrow on deletion.',
      'Height: O(log_t n); with fanout 256, a million keys fit in height 3 or 4, minimizing disk or cache misses.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time bounds',
    detail:
      'All guarantee O(log n) search, insert, and delete. AVL offers smaller constant height; red-black offers bounded rotations; B-trees minimize I/O with wide nodes.',
  },
  {
    title: 'Rotation costs',
    detail:
      'AVL may rotate up to O(log n) nodes on delete; red-black typically uses a constant number of rotations. B-trees split/merge nodes along a root-to-leaf path, also O(log n).',
  },
  {
    title: 'Cache and disk behavior',
    detail:
      'Binary trees are pointer-heavy and cache-unfriendly; B-trees and B+ trees pack keys contiguously so a single cache line or disk page yields many comparisons.',
  },
  {
    title: 'Memory footprint',
    detail:
      'AVL and red-black: one color/height byte plus two child pointers per node. B-trees: arrays of keys and child pointers sized to the block/page; overhead pays off by reducing height.',
  },
]

const realWorld = [
  {
    context: 'Language runtimes and standard libraries',
    detail:
      'C++ std::map, Java TreeMap, and Linux kernel rbtree use red-black trees for ordered maps and scheduling queues. AVL appears in some language symbol tables for faster lookups.',
  },
  {
    context: 'Databases and storage engines',
    detail:
      'B+ trees back PostgreSQL and InnoDB indexes; SQLite uses B-trees for tables and indexes; LMDB uses B+ trees in memory-mapped pages.',
  },
  {
    context: 'Filesystems',
    detail:
      'NTFS, XFS, APFS, and ext4 HTree variants rely on B-tree like structures to index directories and metadata with minimal disk seeks.',
  },
  {
    context: 'Compilers and tooling',
    detail:
      'Red-black and AVL trees maintain ordered symbol tables and interval trees for source maps and register allocation.',
  },
  {
    context: 'Networking and OS kernels',
    detail:
      'Route caches, process schedulers, and timer wheels leverage red-black trees for predictable log-time insertion and lookup under contention.',
  },
]

const examples = [
  {
    title: 'AVL rotation sketch (right rotation)',
    code: `function rotateRight(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    updateHeight(y)
    updateHeight(x)
    return x  // new subtree root

// Used in LL or LR cases after balance checks`,
    explanation:
      'Rotations preserve in-order traversal while shifting height from one side to the other. Double rotations (LR, RL) chain two single rotations.',
  },
  {
    title: 'Red-black insert fix-up (outline)',
    code: `insert node as red using BST insert
while parent(node) is red:
    if parent is left child:
        uncle = right sibling of parent
        if uncle is red: recolor parent, uncle black; grandparent red; node = grandparent
        else:
            if node is right child: node = parent; rotateLeft(node)
            parent(node).color = black; grandparent.color = red; rotateRight(grandparent)
    else: mirror cases
root.color = black`,
    explanation:
      'Recoloring handles red-red via 2-3-4 tree “split.” Rotations resolve structural violations. At most a constant number of rotations are needed.',
  },
  {
    title: 'B-tree search (order t)',
    code: `function search(node, key):
    i = 0
    while i < node.keys.length and key > node.keys[i]:
        i += 1
    if i < node.keys.length and key == node.keys[i]:
        return (node, i)
    if node.isLeaf: return null
    return search(node.children[i], key)`,
    explanation:
      'Each node acts like a small sorted array; you binary search or linear scan within it, then follow one child. Height stays tiny because each node fans out widely.',
  },
]

const pitfalls = [
  'Incorrectly updating heights or balance factors after AVL rotations leads to silent drift and future imbalances.',
  'Forgetting to recolor and fix red-red cases in red-black insert/delete causes property violations that may not surface until deep traversals.',
  'Choosing too small a B-tree order wastes space and I/O; too large increases in-node search cost. Tune fanout to page size and key width.',
  'Mixing payload storage between internal and leaf nodes in B-trees complicates range scans; B+ trees place payloads only in leaves for predictable iteration.',
  'Neglecting bulk-loading for sorted inserts into B+ trees causes repeated splits and fragmentation.',
]

const decisionGuidance = [
  'Pick AVL when read-heavy workloads demand minimal height and updates are not too frequent.',
  'Pick red-black as a general-purpose in-memory ordered map with balanced read/write performance and simple constant-rotation fixes.',
  'Pick B+ trees for disk or cache-aware indexes, range scans, and when fanout shrinks height dramatically.',
  'Pick treaps or skip lists when probabilistic balance is acceptable and implementation simplicity matters more than worst-case guarantees.',
  'If writes dominate and can be batched, consider log-structured merge trees instead of constantly rebalancing a B-tree.',
]

const advancedInsights = [
  {
    title: 'Order statistics and intervals',
    detail:
      'Augment nodes with subtree sizes to answer k-th element and rank queries in O(log n); store interval max endpoints to build interval trees on top of red-black or AVL bases.',
  },
  {
    title: 'Bulk-loading and buffer trees',
    detail:
      'Building B+ trees from sorted data achieves O(n) construction. Buffer trees batch writes at internal nodes to amortize I/O, useful for append-heavy workloads.',
  },
  {
    title: 'Relaxed balancing',
    detail:
      'Weak AVL and chromatic trees allow temporary violations resolved by background fixes, smoothing latency spikes for real-time systems.',
  },
  {
    title: 'Cache-aware layouts',
    detail:
      'Eytzinger or van Emde Boas layouts store complete binary trees in arrays to exploit spatial locality while preserving log-time search.',
  },
]

const takeaways = [
  'AVL, red-black, and B-tree families all enforce logarithmic height with different trade-offs: strictness vs rotation cost vs fanout.',
  'Red-black trees dominate general-purpose ordered maps; AVL offers faster lookups with potentially costlier updates.',
  'B+ trees win on disk and cache efficiency, especially for range scans and large fanout indexes.',
  'Match the tree to workload: memory vs disk, read vs write mix, need for range scans, and tolerance for probabilistic balance.',
]

export default function AdvancedTreesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Advanced Trees (AVL, Red-Black, B-Tree)"
      subtitle="Balanced structures tuned for guarantees and I/O efficiency"
      intro="Balanced trees enforce logarithmic height so lookups and updates stay predictable. AVL tightens height strictly, red-black eases balancing for cheaper updates, and B-tree families trade depth for wide fanout to minimize cache and disk misses. This page dissects how each works, when to pick them, and how production systems tune them."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Balanced trees solve the same problem with different levers: control height. AVL uses strict balance factors, red-black
          uses color parity, and B-trees widen nodes to slash depth. The right choice depends on whether your bottleneck is CPU
          rotations, cache locality, or disk I/O.
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

      <TopicSection heading="How it works: structure and operations">
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
          Heights differ subtly but matter: AVL height about 1.44 log2 n, red-black about 2 log2 n, B-tree height about log base
          fanout of n. Cache and I/O dominate constants, so choose structure with your memory hierarchy in mind.
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
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
