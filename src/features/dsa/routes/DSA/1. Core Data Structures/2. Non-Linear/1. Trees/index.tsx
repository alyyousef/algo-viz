import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Insert / attach',
    detail:
      'Walk down from the root along child pointers until you find the right spot, then link the new node and update parent metadata (size, height, etc.).',
  },
  {
    title: 'Delete / prune',
    detail:
      'Remove a node by rewiring its parent to skip over it, rotating neighbors if needed to preserve balance, and filling the resulting hole with a successor/predecessor.',
  },
  {
    title: 'Traverse',
    detail:
      'Visit nodes in-order, pre-order, post-order, or level-order depending on whether you need sorted output, prefix summaries, or breadth-first stages.',
  },
  {
    title: 'Update metadata',
    detail:
      'Recompute heights, subtree sizes, or heap priorities on the path back to the root so any future decision sees fresh context.',
  },
]

const variants = [
  {
    title: 'Binary search tree',
    detail: 'Left children hold smaller keys, right children larger ones. Search, insert, and delete follow the binary decision path.',
  },
  {
    title: 'Balanced (AVL / red-black)',
    detail:
      'Extra bookkeeping keeps height logarithmic by rotating when one branch grows too fast, trading a little work on updates for predictably fast operations.',
  },
  {
    title: 'Heaps & priority queues',
    detail:
      'Implicit binary tree stored in an array; parent/child indexes drive heapify so you always extract the highest (or lowest) priority element.',
  },
  {
    title: 'Tries / prefix trees',
    detail:
      'N-ary tree keyed by characters or digits. Each level represents a symbol, making it fast to search for shared prefixes.',
  },
]

export default function TreesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Trees"
      subtitle="Hierarchies, recursion, and fast ordering"
      intro="Trees organize data around parent/child relationships. Rooted, recursive, and expressive, they power indexes, parsers, priority queues, and any structure that needs predictable branching."
    >
      <TopicSection heading="Tree anatomy">
        <p>
          A tree consists of nodes connected by edges, with one root and zero or more children per node.
          Leaves have no children, internal nodes split work, and the height determines how many hops you take during queries.
        </p>
        <p>
          The recursive shape means the same logic applies at every subtree: insert, delete, and traverse behave identically regardless of depth, provided you respect balancing invariants when necessary.
        </p>
      </TopicSection>

      <TopicSection heading="Core operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <article key={op.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{op.title}</h3>
              <p className="text-sm text-white/80">{op.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Variants & topologies">
        <div className="grid gap-3">
          {variants.map((variant) => (
            <article key={variant.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{variant.title}</p>
              <p className="text-sm text-white/80">{variant.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When trees win">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Index sorted data with O(log n) lookup using binary search trees, B-trees, or segment trees.</li>
          <li>Model hierarchical relationships such as UI components, file systems, or organization charts.</li>
          <li>Drive recursive algorithms like expression parsing, decision trees, and divide-and-conquer merges.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Decide if balancing (AVL, red-black, B-tree) is required for predictable depth.</li>
          <li>Choose between pointer-based nodes or flat arrays depending on memory access patterns.</li>
          <li>Ensure traversal helpers stay separate from mutation paths unless performance demands merging them.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
